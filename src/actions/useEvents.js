import { useGlobalState } from '../reducer'
import { types } from './store/event-store'
import {
  useUpdateEventMutation,
  useCreateEventMutation
} from './graphql/mutation'
import { useGetEventsQuery } from './graphql/query'
import {
  useNewEventSubscription,
  useUpdateEventSubscription
} from './graphql/subscription'

export default function useEvents () {
  const [{ events }, dispatch] = useGlobalState()
  const [CreateEvent, loadingNewEvent] = useCreateEventMutation()
  const [UpdateEvent, loadingUpdateEvent] = useUpdateEventMutation()
  const [FetchEvents, loadingEvents] = useGetEventsQuery()

  useNewEventSubscription(event =>
    dispatch({
      type: types.NEW_EVENT,
      payload: event
    })
  )

  useUpdateEventSubscription(event =>
    dispatch({
      type: types.UPDATE_EVENT,
      payload: event
    })
  )

  const newEvent = async event => {
    const newEvent = await CreateEvent(event)
    dispatch({
      type: types.NEW_EVENT,
      payload: newEvent
    })
    return newEvent
  }

  const updateEvent = async event => {
    const updatedEvent = await UpdateEvent(event)
    dispatch({
      type: types.UPDATE_EVENT,
      payload: updatedEvent
    })
    return updatedEvent
  }

  const fetchEvents = async () => {
    const events = await FetchEvents()
    dispatch({
      type: types.SET_EVENTS,
      payload: events
    })
  }

  const loadMoreEvents = async () => {
    const events = await FetchEvents()
    dispatch({
      type: types.ADD_MANY_EVENTS,
      payload: events
    })
  }

  return {
    events,
    CreateEvent: newEvent,
    fetchEvents,
    loadingEvents,
    loadingNewEvent,
    UpdateEvent: updateEvent,
    loadingUpdateEvent,
    loadMoreEvents
  }
}
