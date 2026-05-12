import React, { useEffect } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { isAuthenticated } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
import { useOrderQueue } from '../context/OrderQueueContext'
import { useFruitQueue } from '../context/FruitQueueContext'
import fruitBanner from '../assets/fruit-banner.png'
import './Dashboard.css'

export default function Dashboard() {
  const nav = useNavigate()
  const { items: orders } = useOrderQueue()
  const { items: fruits } = useFruitQueue()

  useEffect(() => {
    if (!isAuthenticated()) nav('/login')
  }, [nav])

  // Queue view - peek at orders without modifying
  const pendingOrders = orders.filter(o => o.status === 'pending')

  // Calculate stats
  const totalOrders = orders.length
  const totalFruits = fruits.length
  const totalStock = fruits.reduce((sum, f) => sum + f.stock, 0)

  return (
    <DefaultLayout>
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <img src={fruitBanner} alt="Fresh Tropical Fruits" className="hero-image" />
        <div className="hero-overlay">
          <h1>Selamat Datang! 🍎</h1>
          <p>Kelola toko buah Anda dengan mudah</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">Total Pesanan</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <span className="stat-value">{pendingOrders.length}</span>
            <span className="stat-label">Menunggu Diproses</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍇</div>
          <div className="stat-info">
            <span className="stat-value">{totalFruits}</span>
            <span className="stat-label">Jenis Buah</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <span className="stat-value">{totalStock}</span>
            <span className="stat-label">Total Stok</span>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="card orders-card">
        <div className="card-header">
          <h3>📋 Pesanan Terbaru</h3>
          <span className="badge">{orders.length} pesanan</span>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">🛍️</div>
            <p>Belum ada pesanan.</p>
            <button className="btn btn-green" onClick={() => nav('/belanja')}>
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.slice(0, 5).map((order, index) => (
              <div key={order.id} className={`order-item ${order.status}`}>
                <div className="order-left">
                  <span className="order-number">#{index + 1}</span>
                  <div className="order-details">
                    <div className="order-title">{order.fruitName || order.customer}</div>
                    <div className="order-note">{order.note}</div>
                  </div>
                </div>
                <div className="order-right">
                  {order.subtotal && (
                    <span className="order-price">
                      Rp {order.subtotal.toLocaleString('id-ID')}
                    </span>
                  )}
                  <span className={`status-badge ${order.status}`}>
                    {order.status === 'pending' ? 'Menunggu' : 'Selesai'}
                  </span>
                </div>
              </div>
            ))}
            {orders.length > 5 && (
              <div className="view-more">
                <button className="btn btn-small" onClick={() => nav('/daftar-pesanan')}>
                  Lihat Semua ({orders.length - 5} lainnya)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>⚡ Aksi Cepat</h3>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => nav('/belanja')}>
            <span className="action-icon">🛒</span>
            <span>Belanja</span>
          </button>
          <button className="action-btn" onClick={() => nav('/daftar-buah')}>
            <span className="action-icon">🍎</span>
            <span>Kelola Buah</span>
          </button>
          <button className="action-btn" onClick={() => nav('/daftar-pesanan')}>
            <span className="action-icon">📦</span>
            <span>Lihat Pesanan</span>
          </button>
        </div>
      </div>
    </DefaultLayout>
  )
}
