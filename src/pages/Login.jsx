import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { findUser, setCurrentUser } from '../lib/auth'
import './Login.css'

export default function Login() {
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const user = findUser(username)
    if (!user) {
      setError('Akun tidak ditemukan. Silakan registrasi dulu.')
      return
    }
    if (user.password !== password) {
      setError('Password salah')
      return
    }

    setCurrentUser({ username: user.username })
    nav('/dashboard')
  }

  return (
    <div className="center-wrap">
      <div className="card form-card">
        <h2>Login</h2>
        {error && <div className="form-error">{error}</div>}
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Masukkan Username" />

          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />

          <div className="form-actions">
            <button className="btn btn-green" type="submit">Login</button>
          </div>
        </form>

        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <small>Belum punya akun? <Link to="/register">Registrasi</Link></small>
        </div>
      </div>
    </div>
  )
}
