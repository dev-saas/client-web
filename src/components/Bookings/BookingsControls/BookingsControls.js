import React from 'react'

import './BookingsControls.css'
import { Button } from 'react-bootstrap'

const bookingsControl = props => {
  return (
    <div className='bookings-control'>
      <Button
        variant='secondary'
        className={props.activeOutputType === 'list' && 'active'}
        onClick={props.onChange.bind(this, 'list')}
      >
        List
      </Button>
      <Button
        variant='secondary'
        className={props.activeOutputType === 'chart' && 'active'}
        onClick={props.onChange.bind(this, 'chart')}
      >
        Chart
      </Button>
    </div>
  )
}

export default bookingsControl
