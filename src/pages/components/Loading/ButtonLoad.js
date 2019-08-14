import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function AdornedButton ({ children, loading, ...rest }) {
  return (
    <Button {...rest}>
      {loading ? <CircularProgress size={24} /> : <>{children}</>}
    </Button>
  )
}
