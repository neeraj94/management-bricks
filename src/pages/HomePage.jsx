import React, { useEffect, useState } from 'react'
import * as api from '../services/api'

const HomePage = () => {
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    let mounted = true
    api
      .getHomeHighlights()
      .then((data) => {
        if (mounted) {
          setHighlights(data)
        }
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="page">
      <h1 className="page__title">Welcome to your control center</h1>
      <p style={{ margin: 0, color: '#64748b', maxWidth: '640px' }}>
        Get instant access to workforce analytics, financial insights, and billing operations without switching tools. Use the quick actions below to jump directly into your most important workflows.
      </p>

      <div className="grid grid--three">
        {highlights.map((item) => (
          <div key={item.id} className="card">
            <div className="section-header">
              <div>
                <p className="card__title">{item.category}</p>
                <p className="card__value" style={{ fontSize: '1.5rem' }}>
                  {item.value}
                </p>
              </div>
              <span style={{ fontSize: '1.8rem' }} aria-hidden>
                {item.icon}
              </span>
            </div>
            <p style={{ marginTop: '12px', color: '#475569' }}>{item.description}</p>
            <button type="button" className="button button--ghost" style={{ marginTop: '18px' }}>
              {item.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
