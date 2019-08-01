import React, { useState, useEffect } from 'react'
import { findInArrayById } from '../helper/array-utils'
import { Modal, EventList } from '../components'
import { Formik, Form } from 'formik'
import { object, string, number } from 'yup'
import { Input, TextArea, Action } from '../components/Form'
import { Button, Card } from 'react-bootstrap'
import {
  useInfiniteScroll,
  useNotification,
  useAuth,
  useMutation,
  useEvents
} from '../hooks'

const validationEvent = object().shape({
  title: string().required(),
  price: number().required(),
  description: string().required(),
  date: string().required()
})

const EventsPage = props => {
  const { events, CreateEvent, UpdateEvent, fetchEvents } = useEvents()
  const [creating, setCreating] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const [loadingBooking, mutateBooking] = useMutation(`
mutation BookEvent($id: ID!) {
  bookEvent(eventId: $id) {
    _id
    createdAt
    updatedAt
  }
}
`)

  const [error, setError] = useState()
  const { sendNotification } = useNotification()
  const { userId } = useAuth()

  useInfiniteScroll(fetchEvents)

  const startCreateEventHandler = () => {
    setError()
    setCreating(true)
  }

  const modalConfirmHandler = async (values, { setSubmitting }) => {
    try {
      const newEvent = await CreateEvent(values)
      setCreating(false)
      sendNotification(`Event ${newEvent.title} created`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const modalConfirmUpdateHandler = async (event, { setSubmitting }) => {
    try {
      const updatedEvent = await UpdateEvent(event)
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
    setUpdating(findInArrayById(events, eventId))
  }

  const modalCancelHandler = () => {
    setError()
    setCreating(false)
    setSelectedEvent(null)
    setUpdating(null)
  }

  const showDetailHandler = eventId => {
    setError()
    setSelectedEvent(findInArrayById(events, eventId))
  }

  const bookEventHandler = async () => {
    try {
      await mutateBooking({ id: selectedEvent._id })
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
        events={events}
        onDetail={showDetailHandler}
        onEdit={editHandler}
      />
    </React.Fragment>
  )
}

export default EventsPage
