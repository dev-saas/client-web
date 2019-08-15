import gql from 'graphql-tag'
import { useMutation } from './'

const cancelBookingMutation = gql`
  mutation($id: ID!) {
    cancelBooking(bookingId: $id)
  }
`

export default function useCreateEvent () {
  const [mutate, loading] = useMutation(cancelBookingMutation)

  function cancelBooking (id) {
    return mutate({ id })
  }

  return [cancelBooking, loading]
}
