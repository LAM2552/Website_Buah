import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const nav = useNavigate()
  return (
    <div className="center-wrap">
      <div className="card welcome">
        <h1>Selamat Datang</h1>
        <p>Silakan masuk atau daftar untuk mulai berbelanja.</p>

        <div className="welcome-actions">
          <button className="btn btn-blue btn-small" onClick={() => nav('/login')}>Login</button>
          <button className="btn btn-green btn-large" onClick={() => nav('/register')}>Registrasi</button>
        </div>
      </div>
    </div>
  )
}
