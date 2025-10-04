import React from 'react'

const StatusPill = ({ status }) => {
  const normalized = status?.toLowerCase() ?? ''
  const isActive = normalized === 'active' || normalized === 'paid'
  return <span className={`status-pill ${isActive ? 'status-pill--active' : 'status-pill--inactive'}`}>{status}</span>
}

export default StatusPill
