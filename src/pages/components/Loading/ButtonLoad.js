import React from 'react'
import { CircularProgress, Button } from '@material-ui/core'

export function ButtonLoad ({ children, loading, ...rest }) {
  return (
    <Button {...rest}>
      {loading ? <CircularProgress size={24} /> : <>{children}</>}
    </Button>
  )
}
