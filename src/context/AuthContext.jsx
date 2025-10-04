import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('mb-admin-user')
    const storedToken = localStorage.getItem('mb-admin-token')

    if (storedUser && storedToken) {
      try {
        const parsed = JSON.parse(storedUser)
        setUser(parsed)
        setToken(storedToken)
      } catch (error) {
        localStorage.removeItem('mb-admin-user')
        localStorage.removeItem('mb-admin-token')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (credentials) => {
    const response = await api.login(credentials)
    setUser(response.user)
    setToken(response.token)
    localStorage.setItem('mb-admin-user', JSON.stringify(response.user))
    localStorage.setItem('mb-admin-token', response.token)
    navigate('/app/dashboard')
  }, [navigate])

  const signup = useCallback(async (payload) => {
    const response = await api.signup(payload)
    setUser(response.user)
    setToken(response.token)
    localStorage.setItem('mb-admin-user', JSON.stringify(response.user))
    localStorage.setItem('mb-admin-token', response.token)
    navigate('/app/home')
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('mb-admin-user')
    localStorage.removeItem('mb-admin-token')
    navigate('/login')
  }, [navigate])

  const value = useMemo(() => ({ user, token, login, signup, logout, loading }), [user, token, login, signup, logout, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
