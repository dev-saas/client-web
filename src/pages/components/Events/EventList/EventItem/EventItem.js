import React from 'react'
import './EventItem.css'
import { useAuth } from '../../../../../actions'
import { Button } from '@material-ui/core'

function eventItem ({ event, onEdit, onDetail }) {
  const {
    user: { uid }
  } = useAuth()

  return (
    <li className="events__list-item">
      <div>
        <h1>{event.title}</h1>
        <h2>
          ${event.price} - {new Date(event.date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {uid === event.owner.uid ? (
          <Button variant="primary" onClick={() => onEdit(event._id)}>
            Edit
          </Button>
        ) : (
          <Button variant="primary" onClick={() => onDetail(event._id)}>
            View Details
          </Button>
        )}
      </div>
    </li>
  )
}

export default eventItem
