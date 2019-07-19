import React, { useState } from 'react'

import { LoadContext } from '../context'

const LoadProvider = props => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoadContext.Provider>
  )
}

export default LoadProvider
