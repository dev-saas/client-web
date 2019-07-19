import React from 'react'
import { Action } from '../Form'
import { Modal } from 'react-bootstrap'

const modal = ({ title, children, ...rest }) => (
  <Modal {...rest} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Action {...rest} />
  </Modal>
)

export default modal
