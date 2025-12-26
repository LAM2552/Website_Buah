import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../lib/auth'
import menu from '../data/menu'
import MenuOverlay from './MenuOverlay'
import logo from '../assets/logo.png'

export default function Sidebar() {
  const user = getCurrentUser()
  const nav = useNavigate()
  const [menuOpen, setMenuOpen] = useState({})
  const [overlayOpen, setOverlayOpen] = useState(false)

  // Auto-open menu overlay if URL contains ?menu=1 (developer helper)
  React.useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search)
      if (p.get('menu') === '1') setOverlayOpen(true)
    } catch (e) { }
  }, [])

  function handleLogout() {
    logout()
    nav('/')
  }

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Fresh Fruits" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      </div>
      <nav className="nav">
        {menu.map((section) => (
          <div key={section.title} className="nav-section">
            <div className="nav-item menu-item">
              <button onClick={() => {
                if (section.title === 'Menu') setOverlayOpen(true)
                else setMenuOpen({ ...menuOpen, [section.title]: !menuOpen[section.title] })
              }} className="menu-button">{section.title}</button>
              {section.title !== 'Menu' && menuOpen[section.title] && (
                <div className="submenu">
                  {section.items.map(i => (
                    <NavLink key={i.path} to={i.path} className={({ isActive }) => isActive ? 'nav-subitem active' : 'nav-subitem'}>{i.name}</NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <NavLink to="/belanja" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Belanja</NavLink>
      </nav>

      {/* Menu overlay (centered) */}
      <MenuOverlay visible={overlayOpen} onClose={() => setOverlayOpen(false)} items={(menu.find(s => s.title === 'Menu') || {}).items} />
      {user && (
        <div style={{ marginTop: 18, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ color: '#fff', fontSize: 14, padding: '8px 12px' }}>Signed in as <strong>{user.username}</strong></div>
        </div>
      )}
    </aside>
  )
}
