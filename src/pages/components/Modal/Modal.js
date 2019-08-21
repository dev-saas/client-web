import React from 'react'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4)
  }
}))

const modal = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <Modal
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <div className={classes.paper}>{children}</div>
    </Modal>
  )
}

export default modal
