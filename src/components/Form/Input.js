import React from 'react'

import { TextField } from '@material-ui/core'

const Input = ({ formikProps, formikKey, ...rest }) => {
  return (
    <TextField
      onChange={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      value={formikProps.values[formikKey]}
      error={
        formikProps.errors[formikKey] && formikProps.touched[formikKey]
      }
      helperText={
        formikProps.touched[formikKey] && formikProps.errors[formikKey]
      }
      {...rest}
    />
  )
}

export default Input
