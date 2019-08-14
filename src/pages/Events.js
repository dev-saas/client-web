import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import { Modal, EventList } from './components'
import { object, string, number } from 'yup'
import { Action } from './components/Form'
import { useInfiniteScroll } from './hooks'
import { useBookings, useEvents, useAuth } from '../actions'
import Input from './components/Form/Input'

const validationEvent = object().shape({
  title: string().required('Titulo obrigatório'),
  price: number().required('Preço obrigatório'),
  description: string().required('Descrição obrigatória'),
  date: string().required('Data obrigatória')
})

export default function EventsPage () {
  const {
    events,
    CreateEvent,
    UpdateEvent,
    fetchEvents,
    loadMoreEvents,
    loadingNewEvent,
    loadingUpdateEvent
  } = useEvents()

  const [creating, setCreating] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [updating, setUpdating] = useState(null)
  const { bookEvent, isbookingEvent } = useBookings()

  useEffect(() => {
    fetchEvents()
  }, [])

  const [error, setError] = useState()
  const {
    user: { logged }
  } = useAuth()

  useInfiniteScroll(loadMoreEvents)

  const startCreateEventHandler = () => {
    setError()
    setCreating(true)
  }

  const modalConfirmHandler = async (values, { setSubmitting }) => {
    try {
      const newEvent = await CreateEvent(values)
      setCreating(false)
      // sendNotification(`Event ${newEvent.title} created`)
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
      // sendNotification(`Event ${updatedEvent.title} updated`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const editHandler = eventId => {
    setError()
    setUpdating(events.find(({ _id }) => _id === eventId))
  }

  const modalCancelHandler = () => {
    setError()
    setCreating(false)
    setSelectedEvent(null)
    setUpdating(null)
  }

  const showDetailHandler = eventId => {
    setError()
    setSelectedEvent(events.find(({ _id }) => _id === eventId))
  }

  const bookEventHandler = async () => {
    try {
      await bookEvent(selectedEvent._id)
      // sendNotification(`Event ${selectedEvent.title} booked`)
      setSelectedEvent(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <React.Fragment>
      <Modal title="Add Event" show={creating} loading={loadingNewEvent}>
        <Formik
          initialValues={{
            title: '',
            price: '',
            date: new Date().toISOString().slice(0, -5),
            description: ''
          }}
          onSubmit={modalConfirmHandler}
          validationSchema={validationEvent}
          render={() => (
            <Form id="createForm">
              <Input name="title" label="Title" type="text" />
              <Input name="price" label="Price" type="number" />
              <Input name="date" label="Date" type="datetime-local" />
              <Input
                name="description"
                multiline
                rowsMax="4"
                label="Description"
              />
              <Action
                onHide={modalCancelHandler}
                confirmText="Create"
                submit
                error={error}
              />
            </Form>
          )}
        />
      </Modal>
      {updating && (
        <Modal
          title="Update Event"
          show={!!updating}
          loading={loadingUpdateEvent}>
          <Formik
            initialValues={{
              _id: updating._id,
              title: updating.title,
              price: updating.price,
              date: new Date(updating.date).toISOString().slice(0, -5),
              description: updating.description
            }}
            onSubmit={modalConfirmUpdateHandler}
            validationSchema={validationEvent}
            render={() => (
              <Form id="updateForm">
                <Input name="title" label="Title" type="text" />
                <Input name="price" label="Price" type="number" />
                <Input name="date" label="Date" type="datetime-local" />
                <Input
                  name="description"
                  multiline
                  rowsMax="4"
                  label="Description"
                />
                <Action
                  onHide={modalCancelHandler}
                  confirmText="Save"
                  submit
                  error={error}
                />
              </Form>
            )}
          />
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          show={selectedEvent}
          title={selectedEvent.title}
          onHide={modalCancelHandler}
          onConfirm={logged && bookEventHandler}
          cancelText={!logged && 'Close'}
          confirmText={logged && 'Book'}
          error={error}
          loading={isbookingEvent}>
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{' '}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {logged && (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Share your own Events!</Card.Title>
            <Button variant="primary" onClick={startCreateEventHandler}>
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
