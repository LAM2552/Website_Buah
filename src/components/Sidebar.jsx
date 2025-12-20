import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../lib/auth'
export default function Sidebar() {
  const user = getCurrentUser()
  const nav = useNavigate()

  function handleLogout(){
    logout()
    nav('/')
  }

  return (
    <aside className="sidebar">
      <div className="logo">LOGO</div>
      <nav className="nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>Dashboard</NavLink>
        <NavLink to="#" className="nav-item">Menu</NavLink>
        <NavLink to="#" className="nav-item">Belanja</NavLink>
      </nav>
      <div style={{ marginTop: 18, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {user && <div style={{ color:'#fff', fontSize:14, padding: '8px 12px' }}>Signed in as <strong>{user.username}</strong></div>}
        <button className="btn btn-logout" onClick={handleLogout} style={{ margin:12, background:'#444' }}>Logout</button>
      </div>
    </aside>
  )
}
