import React, { createContext, useReducer, useContext } from 'react'
import store from './actions/store'
const StateContext = createContext()
export function StateProvider ({ children }) {
  return (
    <StateContext.Provider
      value={useReducer(store.reducer, store.initialState)}>
      {children}
    </StateContext.Provider>
  )
}

export const useGlobalState = () => useContext(StateContext)
