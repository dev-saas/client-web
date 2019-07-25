import React from 'react'

export default React.createContext({
  sendNotification: message => {},
  notifications: [],
  sendWarning: message => {},
  warnings: [],
  sendError: message => {},
  errors: []
})
