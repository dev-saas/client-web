import gql from 'graphql-tag'
import { useMutation } from './'

const cancelBookingMutation = gql`
  mutation($id: ID!) {
    event: cancelBooking(bookingId: $id) {
      _id
      title
    }
  }
`

export default function useCreateEvent () {
  const [mutate, loading] = useMutation(cancelBookingMutation)

  async function cancelBooking (id) {
    const { event } = await mutate({ id })
    return event
  }

  return [cancelBooking, loading]
}
