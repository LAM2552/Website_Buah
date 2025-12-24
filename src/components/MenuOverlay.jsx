import React from 'react'
import { Link } from 'react-router-dom'
import './MenuOverlay.css'

export default function MenuOverlay({ visible, onClose, items = [] }){
  if(!visible) return null
  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-panel" onClick={e => e.stopPropagation()}>
        <button className="menu-close" onClick={onClose}>×</button>
        <h2 className="menu-title">Menu</h2>
        <div className="menu-buttons">
          {items.map(i => (
            <Link key={i.path} to={i.path} className="menu-large-button" onClick={onClose}>
              {i.name === 'Daftar Buah' ? 'Lihat Daftar Buah' : i.name === 'Stok Buah' ? 'Lihat Stok Buah' : i.name === 'Daftar Pesanan' ? 'Lihat Daftar Pesanan' : i.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
