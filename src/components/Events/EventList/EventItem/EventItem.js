import React from 'react'

import './EventItem.css'

import { useStyle } from '../../../../hooks'
import { useAuth } from '../../../../hooks/api'
import { Button } from 'react-bootstrap'

const eventItem = ({ event, onEdit, onDetail }) => {
  const {
    user: { id }
  } = useAuth()
  const { styles } = useStyle()

  return (
    <li className='events__list-item'>
      <div>
        <h1 style={styles.text}>{event.title}</h1>
        <h2 style={styles.text2}>
          ${event.price} - {new Date(event.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {id === event.creator._id ? (
          <Button
            variant='primary'
            onClick={onEdit.bind(this, event._id)}>
            Edit
          </Button>
        ) : (
          <Button
            variant='primary'
            onClick={onDetail.bind(this, event._id)}>
            View Details
          </Button>
        )}
      </div>
    </li>
  )
}

export default eventItem
