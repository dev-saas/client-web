import React, { useState, useEffect } from 'react'

import { Modal, EventList } from '../components'
import { Formik, Form } from 'formik'
import { object, string, number } from 'yup'
import { Input, TextArea, Action } from '../components/Form'
import { Button, Card } from 'react-bootstrap'
import {
  useInfiniteScroll,
  useGraphQL,
  useList,
  useNotification,
  useAuth
} from '../hooks'

const validationEvent = object().shape({
  title: string().required(),
  price: number().required(),
  description: string().required(),
  date: string().required()
})

const EventsPage = props => {
  const [creating, setCreating] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [updating, setUpdating] = useState(null)

  const [error, setError] = useState()
  const { sendNotification, sendError } = useNotification()
  const { userId } = useAuth()
  const { query, mutate, subscribe } = useGraphQL()
  const { page, setPageInfo } = useInfiniteScroll(() => {
    fetchEvents()
  })

  const { list, addArray, add, update, get } = useList()

  const s1 = subscribe({
    subscription: `
      subscription {
        newEvent {
          _id
          title
          description
          price
          date
          creator {
            _id
          }
        }
      }
    `,
    callback: {
      next({ data }) {
        const { newEvent } = data
        if (userId !== newEvent.creator._id) {
          add(newEvent)
        }
      },
      error(value) {
        sendError(value)
      }
    }
  })

  const s2 = subscribe({
    subscription: `
      subscription {
        updatedEvent {
          _id
          title
          description
          price
          date
        }
      }
    `,
    callback: {
      next({ data }) {
        const updatedEvent = get(data.updatedEvent._id)
        if (!updatedEvent) return
        if (updatedEvent.creator._id !== userId) {
          update(data.updatedEvent)
        }
      },
      error(value) {
        sendError(value)
      }
    }
  })

  useEffect(() => {
    fetchEvents()
    return () => {
      s1.unsubscribe()
      s2.unsubscribe()
    }
  }, [])

  const startCreateEventHandler = () => {
    setError()
    setCreating(true)
  }

  const modalConfirmHandler = async (values, { setSubmitting }) => {
    const createEventMutation = `
      mutation ($title: String!, $description: String!, $price: Float!, $date: DateTime!) {
        newEvent: createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
          _id
          title
          description
          date
          price
          creator {
            _id
          }
        }
      }
    `

    try {
      const { newEvent } = await mutate({
        mutation: createEventMutation,
        variables: values
      })
      add(newEvent)
      setCreating(false)
      sendNotification(`Event ${newEvent.title} created`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const modalConfirmUpdateHandler = async (event, { setSubmitting }) => {
    const updateEventMutation = `
      mutation ($event: UpdateEventInput!) {
        updatedEvent: updateEvent(event: $event) {
          _id
          title
          description
          date
          price
        }
      }
    `
    try {
      const { updatedEvent } = await mutate({
        mutation: updateEventMutation,
        variables: { event }
      })
      update(updatedEvent)
      setUpdating(null)
      sendNotification(`Event ${updatedEvent.title} updated`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const editHandler = eventId => {
    setError()
    setUpdating(get(eventId))
  }

  const modalCancelHandler = () => {
    setError()
    setCreating(false)
    setSelectedEvent(null)
    setUpdating(null)
  }

  const fetchEvents = async () => {
    const eventsQuery = `
      query ($page: PageInput) {
        getEvents (page: $page) {
          pageInfo {
            hasNextPage
            cursor
          }
          edges {
          _id
          title
          description
          date
          price
          creator {
            _id
            email
          }
        }
      }
    }
    `
    try {
      const { getEvents } = await query({
        query: eventsQuery,
        variables: {
          ...page()
        },
        fetchPolicy: 'no-cache'
      })
      if (!getEvents.edges[0]) return
      setPageInfo(getEvents.pageInfo)
      addArray(getEvents.edges)
    } catch (err) {
      console.log(err)
    }
  }

  const showDetailHandler = eventId => {
    setError()
    setSelectedEvent(get(eventId))
  }

  const bookEventHandler = async () => {
    const bookEventMutation = `
      mutation BookEvent($id: ID!) {
        bookEvent(eventId: $id) {
          _id
          createdAt
          updatedAt
        }
      }
    `
    try {
      await mutate({
        mutation: bookEventMutation,
        variables: { id: selectedEvent._id }
      })
      sendNotification(`Event ${selectedEvent.title} booked`)
      setSelectedEvent(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <React.Fragment>
      <Modal title='Add Event' show={creating}>
        <Formik
          initialValues={{
            title: '',
            price: '',
            date: new Date().toISOString().slice(0, -5),
            description: ''
          }}
          onSubmit={modalConfirmHandler}
          validationSchema={validationEvent}>
          {formikProps => (
            <Form id='createForm'>
              <Input
                formikKey='title'
                label='Title'
                type='text'
                formikProps={formikProps}
              />
              <Input
                formikKey='price'
                label='Price'
                type='number'
                formikProps={formikProps}
              />
              <Input
                formikKey='date'
                label='Date'
                type='datetime-local'
                formikProps={formikProps}
              />
              <TextArea
                formikKey='description'
                rows='4'
                label='Description'
                formikProps={formikProps}
              />
              <Action
                onHide={modalCancelHandler}
                confirmText='Create'
                submit
                error={error}
              />
            </Form>
          )}
        </Formik>
      </Modal>
      {updating && (
        <Modal title='Update Event' show={!!updating}>
          <Formik
            initialValues={{
              _id: updating._id,
              title: updating.title,
              price: updating.price,
              date: new Date(updating.date).toISOString().slice(0, -5),
              description: updating.description
            }}
            onSubmit={modalConfirmUpdateHandler}
            validationSchema={validationEvent}>
            {formikProps => (
              <Form id='updateForm'>
                <Input
                  formikKey='title'
                  label='Title'
                  type='text'
                  formikProps={formikProps}
                />
                <Input
                  formikKey='price'
                  label='Price'
                  type='number'
                  formikProps={formikProps}
                />
                <Input
                  formikKey='date'
                  label='Date'
                  type='datetime-local'
                  formikProps={formikProps}
                />
                <TextArea
                  formikKey='description'
                  rows='4'
                  label='Description'
                  formikProps={formikProps}
                />
                <Action
                  onHide={modalCancelHandler}
                  confirmText='Save'
                  submit
                  error={error}
                />
              </Form>
            )}
          </Formik>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          show={selectedEvent}
          title={selectedEvent.title}
          onHide={modalCancelHandler}
          onConfirm={userId && bookEventHandler}
          cancelText={!userId && 'Close'}
          confirmText={userId && 'Book'}
          error={error}>
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{' '}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {userId && (
        <Card className='text-center'>
          <Card.Body>
            <Card.Title>Share your own Events!</Card.Title>
            <Button variant='primary' onClick={startCreateEventHandler}>
              Create Event
            </Button>
          </Card.Body>
        </Card>
      )}
      <EventList
        events={list}
        onDetail={showDetailHandler}
        onEdit={editHandler}
      />
    </React.Fragment>
  )
}

export default EventsPage
