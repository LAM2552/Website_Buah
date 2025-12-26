import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SuccessNotification.css'

export default function SuccessNotification({ visible, onClose }) {
    const navigate = useNavigate()

    if (!visible) return null

    function handleDashboard() {
        onClose()
        navigate('/dashboard')
    }

    return (
        <div className="success-overlay">
            <div className="success-modal">
                <h2>Pesanan Anda</h2>
                <p className="subtitle">Terkirim</p>
                <p className="success-text">Sukses!</p>

                <button className="btn-dashboard" onClick={handleDashboard}>
                    Dashboard
                </button>
            </div>
        </div>
    )
}
