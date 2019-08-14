import gql from 'graphql-tag'
import { useSubscription } from './'

const newEventSubscription = gql`
  subscription {
    newEvent {
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

export default function useNewEventSubscription (callback) {
  useSubscription(newEventSubscription, ({ data }) =>
    callback(data.newEvent)
  )
}
