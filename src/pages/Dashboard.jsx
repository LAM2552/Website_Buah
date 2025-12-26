import React, { useEffect } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { isAuthenticated } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
import { useOrderQueue } from '../context/OrderQueueContext'
import './Dashboard.css'

export default function Dashboard() {
  const nav = useNavigate()
  const { items: orders } = useOrderQueue()

  useEffect(() => {
    if (!isAuthenticated()) nav('/login')
  }, [nav])

  // Queue view - peek at orders without modifying
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const processedOrders = orders.filter(o => o.status === 'processed')

  return (
    <DefaultLayout>
      <div className="card">
        <h3>Pesanan Anda</h3>
        <p className="queue-info">Total dalam antrian: <strong>{orders.length}</strong> pesanan</p>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <p>Belum ada pesanan. Silakan belanja terlebih dahulu.</p>
          </div>
        ) : (
          <div className="orders">
            {/* Queue View - FIFO order display */}
            {orders.map((order, index) => (
              <div key={order.id} className={`order-box ${order.status === 'processed' ? 'processed' : ''}`}>
                <div className="order-item">
                  <div className="order-header">
                    <span className="order-number">#{index + 1}</span>
                    <span className={`order-status ${order.status}`}>
                      {order.status === 'pending' ? 'Menunggu' : 'Diproses'}
                    </span>
                  </div>
                  <div className="order-title">{order.fruitName || order.customer}</div>
                  <div className="order-note">{order.note}</div>
                  {order.subtotal && (
                    <div className="order-subtotal">
                      Subtotal: <strong>Rp {order.subtotal.toLocaleString('id-ID')}</strong>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}
