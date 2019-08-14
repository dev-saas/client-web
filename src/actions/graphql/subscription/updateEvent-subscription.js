import gql from 'graphql-tag'
import { useSubscription } from './'

const updateEventSubscription = gql`
  subscription {
    updatedEvent {
      _id
      title
      description
      price
      date
      creator {
        uid
      }
    }
  }
`

export default function useUpdateEventSubscription (callback) {
  useSubscription(updateEventSubscription, ({ data }) =>
    callback(data.updatedEvent)
  )
}
