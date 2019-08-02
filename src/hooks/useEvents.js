import {
  useMutation,
  useQuery,
  useSubscription,
  usePagination,
  useGlobalState
} from './'

import { types } from '../store/reducer/events-reducer'

const { NEW_EVENT, SET_EVENTS, UPDATE_EVENT } = types

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

const updateEventMutation = `
mutation ($event: UpdateEventInput!) {
  updatedEvent: updateEvent(event: $event) {
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

const newEventSubscription = `
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
`

const updateEventSubscription = `
  subscription {
    updatedEvent {
      _id
      title
      description
      price
      date
      creator {
        _id
        email
      }
    }
  }
`

export default function useEvents() {
  const [{ events }, dispatch] = useGlobalState()
  const [loadingNewEvent, CreateEvent] = useMutation(createEventMutation)
  const [loadingUpdateEvent, UpdateEvent] = useMutation(
    updateEventMutation
  )
  const [loadingEvents, FetchEvents] = useQuery(eventsQuery)
  const { page, setPageInfo } = usePagination()

  useSubscription(newEventSubscription, ({ data }) => {
    const { newEvent } = data

    dispatch({
      type: NEW_EVENT,
      payload: newEvent
    })
  })

  useSubscription(updateEventSubscription, ({ data }) => {
    const { updatedEvent } = data

    dispatch({
      type: UPDATE_EVENT,
      payload: updatedEvent
    })
  })

  const newEvent = async event => {
    const { newEvent } = await CreateEvent(event)

    dispatch({
      type: NEW_EVENT,
      payload: newEvent
    })

    return newEvent
  }

  const updateEvent = async event => {
    const { updatedEvent } = await UpdateEvent({ event })

    dispatch({
      type: UPDATE_EVENT,
      payload: updatedEvent
    })

    return updatedEvent
  }

  const fetchEvents = async () => {
    const { getEvents } = await FetchEvents(page())

    if (!getEvents.edges[0]) return

    setPageInfo(getEvents.pageInfo)

    dispatch({
      type: SET_EVENTS,
      payload: getEvents.edges
    })
  }

  return {
    events,
    CreateEvent: newEvent,
    fetchEvents,
    loadingEvents,
    loadingNewEvent,
    UpdateEvent: updateEvent,
    loadingUpdateEvent
  }
}
