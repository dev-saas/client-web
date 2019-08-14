import React from 'react'
import { Spinner } from '../'

const Loading = ({ loading, children }) =>
  loading ? <Spinner /> : <>{children}</>

export default Loading
