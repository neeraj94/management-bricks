const API_BASE = ''

const handleResponse = async (response) => {
  if (!response.ok) {
    let message = 'Request failed'
    try {
      const data = await response.json()
      message = data.message || message
    } catch (error) {
      message = await response.text()
    }
    throw new Error(message)
  }
  if (response.status === 204) {
    return null
  }
  return response.json()
}

export const login = (payload) => {
  return fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(handleResponse)
}

export const signup = (payload) => {
  return fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(handleResponse)
}

export const getUsers = () => fetch(`${API_BASE}/api/users`).then(handleResponse)

export const getRoles = () => fetch(`${API_BASE}/api/roles`).then(handleResponse)

export const getInvoices = () => fetch(`${API_BASE}/api/invoices`).then(handleResponse)

export const getDashboardMetrics = () => fetch(`${API_BASE}/api/dashboard/metrics`).then(handleResponse)

export const getRecentActivities = () => fetch(`${API_BASE}/api/dashboard/activities`).then(handleResponse)

export const getHomeHighlights = () => fetch(`${API_BASE}/api/home/highlights`).then(handleResponse)
