import React from 'react'
import { useAuth } from '../context/AuthContext'

const TopBar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="top-bar">
      <div className="top-bar__search">
        <span role="img" aria-hidden>
          🔍
        </span>
        <input placeholder="Search within your admin workspace" />
      </div>
      <div className="top-bar__user">
        <div className="avatar" style={{ background: user?.avatarColor || '#2563eb' }}>
          {user?.fullName?.[0] ?? '?'}
        </div>
        <div>
          <div style={{ fontWeight: 600 }}>{user?.fullName}</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{user?.role}</div>
        </div>
        <button type="button" className="button button--ghost" onClick={logout}>
          Log out
        </button>
      </div>
    </header>
  )
}

export default TopBar
