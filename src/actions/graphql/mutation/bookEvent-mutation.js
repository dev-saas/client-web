import gql from 'graphql-tag'
import { useMutation } from './'

const bookEventMutation = gql`
  mutation BookEvent($id: ID!) {
    bookEvent(eventId: $id) {
      _id
      createdAt
      updatedAt
    }
  }
`

export default function useCreateEvent () {
  const [mutate, loading] = useMutation(bookEventMutation)

  async function bookEvent (id) {
    const { bookEvent } = await mutate({ id })
    return bookEvent
  }

  return [bookEvent, loading]
}
