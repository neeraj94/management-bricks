import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Please fill out your email and password to continue.')
      return
    }

    setLoading(true)
    try {
      await login(form)
    } catch (err) {
      setError(err.message || 'Unable to sign you in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card">
      <h1>Welcome back</h1>
      <p>Enter your credentials to access the Management Bricks console.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} placeholder="Enter your password" />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="button button--primary" disabled={loading} style={{ width: '100%', marginTop: '8px' }}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p style={{ marginTop: '24px' }}>
        Need an account?{' '}
        <Link className="link" to="/signup">
          Create one
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
