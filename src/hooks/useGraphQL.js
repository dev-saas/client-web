import { useContext } from 'react'
import { GraphQLContext } from '../context'

export default function useGraphQL() {
  const { query, mutate, subscribe } = useContext(GraphQLContext)

  return {
    query,
    mutate,
    subscribe
  }
}
