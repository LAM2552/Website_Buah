import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useOrderQueue } from '../context/OrderQueueContext'
import './DaftarPesanan.css'

export default function DaftarPesanan() {
  const { items, remove, update } = useOrderQueue()

  function handleComplete(id) {
    update(id, { status: 'processed' })
  }

  function handleDelete(id) {
    remove(id)
  }

  return (
    <DefaultLayout title="Daftar Pesanan">
      <div className="card">
        <h3>Daftar Pesanan (Antrian)</h3>
        <p className="info-text">Pesanan hanya dapat ditambahkan melalui halaman <strong>Belanja</strong></p>

        <div className="orders">
          <div className="order-box">
            {items.length === 0 && <div><em>Tidak ada pesanan</em></div>}
            {items.map((o, idx) => (
              <div key={o.id} className="order-item">
                <div className="order-title">
                  {idx + 1}. {o.fruitName || o.customer}
                  <small style={{ color: '#666', marginLeft: 8 }}>
                    {o.status === 'pending' ? 'Menunggu' : o.status === 'processed' ? 'Selesai' : o.status}
                  </small>
                </div>
                <div className="order-note">{o.note}</div>
                {o.subtotal && (
                  <div className="order-subtotal">
                    Subtotal: <strong>Rp {o.subtotal.toLocaleString('id-ID')}</strong>
                  </div>
                )}
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  {o.status !== 'processed' && (
                    <button className="btn btn-green btn-small" onClick={() => handleComplete(o.id)}>
                      Selesaikan Pesanan
                    </button>
                  )}
                  <button className="btn btn-small btn-danger" onClick={() => handleDelete(o.id)}>
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
