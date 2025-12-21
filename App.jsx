import React, { useState } from 'react'
import OrderList from './components/OrderList'
import './index.css'

export default function App() {
  const [orders, setOrders] = useState([
    { id: 1, name: 'John Doe', item: 'Mangga - 2 kg' },
    { id: 2, name: 'Jane Smith', item: 'Apel - 3 kg' }
  ])

  function handlePop() {
    setOrders(prev => prev.slice(0, prev.length - 1))
  }

  function handleClear() {
    if (!orders.length) return
    if (confirm('Hapus semua pesanan?')) setOrders([])
  }

  return (
    <div className="app-bg">
      <div className="card">
        <div className="card-header">
          <button className="back-btn">← Kembali</button>
          <h2 className="title">Daftar Pesanan</h2>
          <div style={{width:80}} />
        </div>

        <OrderList orders={orders} />

        <div className="card-actions">
          <button className="btn pop" onClick={handlePop} disabled={!orders.length}>Pop</button>
          <button className="btn delete" onClick={handleClear} disabled={!orders.length}>Hapus</button>
        </div>
      </div>
    </div>
  )
}
