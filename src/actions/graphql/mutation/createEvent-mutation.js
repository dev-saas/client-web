import gql from 'graphql-tag'
import { useMutation } from './'

const selectionSet = `_id
        title
        description
        date
        price
        owner {
          uid
        }`

export default function useCreateEvent (selecationSet) {
  const createEventMutation = gql`
    mutation($event: EventInput!) {
      newEvent: createEvent(eventInput: $event) {
        ${selectionSet}
      }
    }
  `

  console.log(createEventMutation)
  const [mutate, loading] = useMutation(createEventMutation)

  async function newEvent (event) {
    const { newEvent } = await mutate({ event })
    return newEvent
  }

  return [newEvent, loading]
}
