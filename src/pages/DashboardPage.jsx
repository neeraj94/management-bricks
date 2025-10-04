import React, { useEffect, useState } from 'react'
import MetricCard from '../components/MetricCard'
import * as api from '../services/api'

const DashboardPage = () => {
  const [metrics, setMetrics] = useState(null)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    let mounted = true
    api
      .getDashboardMetrics()
      .then((data) => {
        if (mounted) {
          setMetrics(data)
        }
      })
      .catch(() => {})
    api
      .getRecentActivities()
      .then((data) => {
        if (mounted) {
          setActivities(data)
        }
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="page">
      <header className="section-header">
        <div>
          <h1 className="page__title">Executive overview</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Track your workforce, financial health, and operations at a glance.</p>
        </div>
        <div className="actions">
          <button type="button" className="button button--ghost">
            Export report
          </button>
          <button type="button" className="button button--primary">
            Create workflow
          </button>
        </div>
      </header>

      <section className="grid grid--three">
        <MetricCard title="Active users" value={metrics ? metrics.activeUsers : '…'} trend={metrics ? metrics.usersGrowth : null} trendLabel="vs last month" icon="👤" />
        <MetricCard title="Monthly revenue" value={metrics ? metrics.monthlyRevenue : '…'} trend={metrics ? metrics.revenueGrowth : null} trendLabel="vs last month" icon="💰" />
        <MetricCard title="Open invoices" value={metrics ? metrics.openInvoices : '…'} trend={metrics ? -metrics.overdueDelta : null} trendLabel="overdue change" icon="📄" />
      </section>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div className="section-header">
            <h2 className="section-header__title">Revenue performance</h2>
            <span className="badge badge--success">▲ 8.4% vs last quarter</span>
          </div>
          <p style={{ color: '#475569' }}>
            Revenue trends stay positive with recurring subscriptions driving consistent growth. Monitor invoice collection closely to keep overdue balances under 5%.
          </p>
          <img src="/assets/revenue-chart.svg" alt="Revenue chart placeholder" style={{ width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
        </div>
        <div className="card">
          <h2 className="section-header__title">Latest activity</h2>
          <div className="timeline">
            {activities.map((item) => (
              <div key={item.id} className="timeline__item">
                <div className="timeline__dot" />
                <div className="timeline__content">
                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{item.description}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>{item.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
