import React, { createContext, useReducer, useContext } from 'react'
import { initialState, reducer } from './actions/store'

const StateContext = createContext()

export function StateProvider ({ children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  )
}

export const useGlobalState = () => useContext(StateContext)
