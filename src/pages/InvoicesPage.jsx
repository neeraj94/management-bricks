import React, { useEffect, useMemo, useState } from 'react'
import StatusPill from '../components/StatusPill'
import * as api from '../services/api'

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    let mounted = true
    api
      .getInvoices()
      .then((data) => {
        if (mounted) {
          setInvoices(data)
        }
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const filteredInvoices = useMemo(() => {
    if (filter === 'All') {
      return invoices
    }
    return invoices.filter((invoice) => invoice.status === filter)
  }, [invoices, filter])

  return (
    <div className="page">
      <div className="section-header">
        <div>
          <h1 className="page__title">Invoices</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Keep accounts receivable current and spot at-risk revenue quickly.</p>
        </div>
        <div className="actions">
          <select className="button button--ghost" value={filter} onChange={(event) => setFilter(event.target.value)} style={{ cursor: 'pointer' }}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
          <button type="button" className="button button--primary">
            New invoice
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Issued on</th>
                <th>Due date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.number}</td>
                  <td>{invoice.customer}</td>
                  <td>
                    <StatusPill status={invoice.status} />
                  </td>
                  <td>{invoice.issuedOn}</td>
                  <td>{invoice.dueOn}</td>
                  <td>${invoice.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InvoicesPage
