import React, { createContext, useReducer } from 'react'
import { initialState, mainReducer } from './mainReducer'

export const StateContext = createContext()

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(mainReducer, initialState)}>
    {children}
  </StateContext.Provider>
)
