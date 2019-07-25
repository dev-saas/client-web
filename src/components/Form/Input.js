import React from 'react'
import { useField } from 'formik'
import { TextField } from '@material-ui/core'

const Input = ({ name, ...rest }) => {
  const [field, meta] = useField(name)
  const { error, touched } = meta
  return (
    <TextField
      {...field}
      error={touched && error}
      helperText={touched && error}
      name={name}
      {...rest}
    />
  )
}

export default Input
