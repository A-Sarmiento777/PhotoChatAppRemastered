import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastPosted({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} />
    </div>
  )
}
