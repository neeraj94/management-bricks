import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'

const AdminLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
