import React from 'react'
import { Action } from '../Form'
import { Modal } from 'react-bootstrap'
import { Loading } from '../'
const modal = ({ title, children, loading, ...rest }) => (
  <Modal {...rest} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Loading loading={loading}>
    <Modal.Body>{children}</Modal.Body>
      <Action {...rest} />
    </Loading>
  </Modal>
)

export default modal
