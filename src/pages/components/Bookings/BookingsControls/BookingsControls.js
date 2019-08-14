import React from 'react'

import './BookingsControls.css'
import { Button } from '@material-ui/core'

const BookingsControls = ({ activeOutputType, onChange }) => {
  return (
    <div className="bookings-control">
      <Button
        variant="secondary"
        className={activeOutputType === 'list' && 'active'}
        onClick={() => onChange('list')}>
        List
      </Button>
      <Button
        variant="secondary"
        className={activeOutputType === 'chart' && 'active'}
        onClick={() => onChange('chart')}>
        Chart
      </Button>
    </div>
  )
}

export default BookingsControls
