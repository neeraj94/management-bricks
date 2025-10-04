import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="page" style={{ alignItems: 'center', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '420px' }}>
        <h1 className="page__title" style={{ fontSize: '2.5rem' }}>
          404
        </h1>
        <p style={{ color: '#475569' }}>We could not find the page you were looking for.</p>
        <Link className="button button--primary" to="/app/home">
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
