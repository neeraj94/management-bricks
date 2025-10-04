import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/app/home', icon: '🏠', label: 'Home' },
  { to: '/app/dashboard', icon: '📊', label: 'Dashboards' },
  { to: '/app/users', icon: '👥', label: 'User Management' },
  { to: '/app/roles', icon: '🛡️', label: 'User Roles' },
  { to: '/app/invoices', icon: '🧾', label: 'Invoices' }
]

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span role="img" aria-label="Bricks">🧱</span>
        Management Bricks
      </div>
      <nav className="sidebar__nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              ['sidebar__link', isActive ? 'sidebar__link--active' : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            <span aria-hidden>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
