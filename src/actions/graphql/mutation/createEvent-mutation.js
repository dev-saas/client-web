import gql from 'graphql-tag'
import { useMutation } from './'

const createEventMutation = gql`
  mutation($event: EventInput!) {
    newEvent: createEvent(eventInput: $event) {
      _id
      title
      description
      date
      price
      creator {
        uid
      }
    }
  }
`

export default function useCreateEvent () {
  const [mutate, loading] = useMutation(createEventMutation)

  async function newEvent (event) {
    const { newEvent } = await mutate({ event })
    return newEvent
  }

  return [newEvent, loading]
}
