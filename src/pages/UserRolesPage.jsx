import React, { useEffect, useState } from 'react'
import * as api from '../services/api'

const UserRolesPage = () => {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    let mounted = true
    api
      .getRoles()
      .then((data) => {
        if (mounted) {
          setRoles(data)
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
          <h1 className="page__title">Roles & permissions</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Keep teams secure with least-privilege access policies and auditable permission sets.</p>
        </div>
        <button type="button" className="button button--primary">
          Add role
        </button>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {roles.map((role) => (
          <div key={role.name} className="card">
            <div className="section-header">
              <h2 className="section-header__title">{role.name}</h2>
              <span className="badge badge--success">{role.members} members</span>
            </div>
            <p style={{ color: '#475569' }}>{role.description}</p>
            <div style={{ marginTop: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Permissions</h3>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#475569', lineHeight: 1.7 }}>
                {role.permissions.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserRolesPage
