import React, { useEffect } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { isAuthenticated } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard(){
  const nav = useNavigate()
  useEffect(() => {
    if(!isAuthenticated()) nav('/login')
  }, [nav])

  const orders = [
    {  }
  ]

  return (
    <DefaultLayout>
      <div className="card">
        <h3>Pesanan Anda</h3>
        <div className="orders">
          <div className="order-box">
            {orders.map(o => (
              <div key={o.id} className="order-item">
                <div className="order-title">{o.title}</div>
                <div className="order-note">{o.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
