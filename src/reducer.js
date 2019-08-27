import React, { createContext, useReducer, useContext } from 'react'

const StateContext = createContext()

export function StateProvider ({ children, store }) {
  return (
    <StateContext.Provider value={useReducer(store.reducer, store.initialState)}>
      {children}
    </StateContext.Provider>
  )
}

export const useGlobalState = () => useContext(StateContext)
