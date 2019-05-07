import React from 'react'
import { Error } from '../..'

import { Button, Modal } from 'react-bootstrap'

const Action = ({
  onConfirm,
  onHide,
  cancelText,
  confirmText,
  error,
  submit
}) => (
  <Modal.Footer>
    <Error message={error} />
    <React.Fragment>
      {onHide && (
        <Button variant='outline-secondary' onClick={onHide}>
          {cancelText || 'Cancel'}
        </Button>
      )}
      {onConfirm && (
        <Button variant='primary' onClick={onConfirm}>
          {confirmText || 'Confirm'}
        </Button>
      )}
      {submit && (
        <Button variant='primary' type='submit'>
          {confirmText || 'Confirm'}
        </Button>
      )}
    </React.Fragment>
  </Modal.Footer>
)

export default Action
