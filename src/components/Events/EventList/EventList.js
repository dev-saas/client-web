import React from 'react'

import EventItem from './EventItem/EventItem'
import './EventList.css'

const eventList = ({ events, ...rest }) => (
  <ul className="event__list">
    {events.map(event => (
      <EventItem key={event._id} event={event} {...rest} />
    ))}
  </ul>
)

export default eventList
