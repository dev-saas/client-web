import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
})

export default function SimpleCard ({ children }) {
  const classes = useStyles()

  return <Card className={classes.card}>{children}</Card>
}
