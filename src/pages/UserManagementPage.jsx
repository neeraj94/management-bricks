import React, { useEffect, useState } from 'react'
import StatusPill from '../components/StatusPill'
import * as api from '../services/api'

const UserManagementPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    let mounted = true
    api
      .getUsers()
      .then((data) => {
        if (mounted) {
          setUsers(data)
        }
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <h1 className="page__title">User management</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Monitor access levels, onboarding, and engagement across your organization.</p>
        </div>
        <button type="button" className="button button--primary">
          Invite teammate
        </button>
      </div>
      <div className="card">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="avatar" style={{ background: user.avatarColor }}>
                        {user.fullName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{user.fullName}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <StatusPill status={user.status} />
                  </td>
                  <td>{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage
