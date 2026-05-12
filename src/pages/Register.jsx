import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUser, addUser, setCurrentUser } from '../lib/auth'
import './Register.css'

export default function Register() {
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Username dan password wajib diisi')
      return
    }
    if (password !== confirm) {
      setError('Password dan konfirmasi tidak cocok')
      return
    }
    if (findUser(username)) {
      setError('Username sudah terdaftar')
      return
    }

    addUser({ username, password })
    setCurrentUser({ username })
    nav('/dashboard')
  }

  return (
    <div className="center-wrap">
      <div className="card form-card">
        <h2>Registrasi</h2>
        {error && <div className="form-error">{error}</div>}
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Masukkan Username" />

          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />

          <label>Konfirmasi</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Konfirmasi Password" />

          <div className="form-actions">
            <button className="btn btn-green" type="submit">Registrasi</button>
          </div>
        </form>
      </div>
    </div>
  )
}
