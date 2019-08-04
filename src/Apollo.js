import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTION,
  options: { reconnect: true }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    token: localStorage.getItem('token'),
    recaptcha: localStorage.getItem('recaptcha')
  }
}))

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
}

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  defaultOptions
})

export default client
