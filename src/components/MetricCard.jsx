import React from 'react'

const MetricCard = ({ title, value, trend, trendLabel, icon }) => {
  return (
    <div className="card">
      <div className="section-header">
        <div>
          <p className="card__title">{title}</p>
          <p className="card__value">{value}</p>
        </div>
        <span style={{ fontSize: '1.8rem' }} aria-hidden>
          {icon}
        </span>
      </div>
      {trend !== undefined && trend !== null && (
        <div className={`badge ${trend > 0 ? 'badge--success' : 'badge--warning'}`}>
          {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
          <span style={{ fontWeight: 500 }}>{trendLabel}</span>
        </div>
      )}
    </div>
  )
}

export default MetricCard
