import React from 'react'
import { Fragment } from '../'
import { Action } from '../Form'
import { Modal } from 'react-bootstrap'

const modal = ({ title, children, isLoading, ...rest }) => (
  <Modal {...rest} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Fragment isLoading={isLoading}>
      <Action {...rest} />
    </Fragment>
  </Modal>
)

export default modal
