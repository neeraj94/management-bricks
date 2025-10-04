import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
  const { signup } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'Administrator' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.fullName || !form.email || !form.password) {
      setError('Every field is required before creating your workspace user.')
      return
    }

    setLoading(true)
    try {
      await signup(form)
    } catch (err) {
      setError(err.message || 'We were unable to create your account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card">
      <h1>Create your admin account</h1>
      <p>Sign up to start managing people, permissions, and billing from a single panel.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} placeholder="Alex Johnson" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />
        </div>
        <div className="form-field">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={form.role} onChange={handleChange}>
            <option>Administrator</option>
            <option>Finance Manager</option>
            <option>People Operations</option>
            <option>Viewer</option>
          </select>
        </div>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="button button--primary" disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p style={{ marginTop: '24px' }}>
        Already managing things?{' '}
        <Link className="link" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
