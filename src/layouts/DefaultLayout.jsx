
import Sidebar from '../components/Sidebar'
import { getCurrentUser, logout } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function DefaultLayout({ children, title = 'Dashboard' }){
  const user = getCurrentUser()
  const nav = useNavigate()
  function handleLogout(){
    logout()
    nav('/')
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content">
        <div className="content-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1>{title}</h1>
            <hr style={{ flex: 1 }} />
          </div>
          <div>
            {user && title !== 'Dashboard' && <button className="dashboard-logout" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
        <div className="content-body">{children}</div>
      </div>
    </div>
  )
}
