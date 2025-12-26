import React, { useEffect } from 'react'
import { setCurrentUser } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function DevLogin(){
  const nav = useNavigate()
  useEffect(() => {
    if (!(import.meta.env && import.meta.env.DEV)) {
      // don't run in production
      nav('/')
      return
    }
    setCurrentUser({ username: 'dev' })
    nav('/dashboard')
  }, [nav])

  return (
    <div style={{ padding: 40 }}>
      <h3>Dev login helper</h3>
      <p>Logging in as <strong>dev</strong> and redirecting to <code>/dashboard</code>...</p>
    </div>
  )
}