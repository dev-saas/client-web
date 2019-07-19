import { createContext } from 'react'

export default createContext({
  query: options => {},
  mutate: options => {},
  subscribe: ({ subscription, callback }) => {}
})
