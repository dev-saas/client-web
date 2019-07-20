import React from 'react'

import './EventItem.css'

import { useAuth } from '../../../../hooks'
import { Button } from 'react-bootstrap'

const eventItem = ({ event, onEdit, onDetail }) => {
  const { userId } = useAuth()
  return (
    <li className='events__list-item'>
      <div>
        <h1>{event.title}</h1>
        <h2>
          ${event.price} - {new Date(event.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId === event.creator._id ? (
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
