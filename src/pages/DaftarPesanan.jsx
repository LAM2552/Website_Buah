import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useOrderQueue } from '../context/OrderQueueContext'
import './DaftarPesanan.css'

export default function DaftarPesanan(){
  const { items, enqueue, dequeue, remove, update, processNext } = useOrderQueue()
  const [customer, setCustomer] = useState('')
  const [note, setNote] = useState('')

  function handleAdd(e){
    e.preventDefault()
    if(!customer) return
    enqueue({ customer, note })
    setCustomer(''); setNote('')
  }

  return (
    <DefaultLayout title="Daftar Pesanan">
      <div className="card">
        <h3>Tambahkan Pesanan</h3>
        <form className="form-grid" onSubmit={handleAdd}>
          <label>Nama Pelanggan</label>
          <input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Nama" />

          <label>Catatan</label>
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="Ringkasan pesanan" />

          <div className="form-actions">
            <button className="btn btn-blue" type="submit">Tambah Pesanan</button>
          </div>
        </form>

        <hr style={{ margin: '1.4rem 0' }} />

        <h3>Daftar Pesanan (Antrian)</h3>
        <div className="orders">
          <div className="order-box">
            {items.length === 0 && <div><em>Tidak ada pesanan</em></div>}
            {items.map((o, idx) => (
              <div key={o.id} className="order-item">
                <div className="order-title">{idx + 1}. {o.customer} <small style={{ color:'#666', marginLeft:8 }}>{o.status}</small></div>
                <div className="order-note">{o.note}</div>
                <div style={{ marginTop:8 }}>
                  <button className="btn btn-small" onClick={() => update(o.id, { status: 'cancelled' })}>Batal</button>
                  <button className="btn btn-small" style={{ marginLeft: 8 }} onClick={() => update(o.id, { status: 'processing' })}>Proses</button>
                  <button className="btn btn-small" style={{ marginLeft: 8 }} onClick={() => processNext()}>Selesaikan & Next</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
