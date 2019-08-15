import gql from 'graphql-tag'
import { useMutation } from './'

const updateEventMutation = gql`
  mutation($event: UpdateEventInput!) {
    updatedEvent: updateEvent(event: $event) {
      _id
      title
      description
      date
      price
      owner {
        uid
      }
    }
  }
`

export default function useCreateEvent () {
  const [mutate, loading] = useMutation(updateEventMutation)

  async function updateEvent (event) {
    const { updatedEvent } = await mutate({ event })
    return updatedEvent
  }

  return [updateEvent, loading]
}
