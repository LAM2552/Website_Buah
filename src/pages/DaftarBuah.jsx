import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useFruitQueue } from '../context/FruitQueueContext'
import './DaftarBuah.css'

export default function DaftarBuah(){
  const { items, enqueue, remove, update } = useFruitQueue()
  const [name, setName] = useState('')
  const [stock, setStock] = useState(0)
  const [price, setPrice] = useState(0)

  function handleAdd(e){
    e.preventDefault()
    if(!name) return
    enqueue({ name, stock: Number(stock), price: Number(price) })
    setName(''); setStock(0); setPrice(0)
  }

  return (
    <DefaultLayout title="Daftar Buah">
      <div className="card">
        <h3>Tambah Buah</h3>
        <form className="form-grid" onSubmit={handleAdd}>
          <label>Nama Buah</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Apel" />

          <label>Stok</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} />

          <label>Harga</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

          <div className="form-actions">
            <button className="btn btn-green" type="submit">Tambah</button>
          </div>
        </form>

        <hr style={{ margin: '1.4rem 0' }} />

        <h3>Daftar Buah</h3>
        <div className="fruit-list">
          <table>
            <thead>
              <tr><th>Nama</th><th>Stok</th><th>Harga</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={4}><em>Tidak ada buah</em></td></tr>}
              {items.map(i => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.stock}</td>
                  <td>Rp {i.price}</td>
                  <td>
                    <button className="btn btn-small" onClick={() => remove(i.id)}>Hapus</button>
                    <button className="btn btn-small" onClick={() => update(i.id, { stock: i.stock + 1 })} style={{ marginLeft:8 }}>Tambah Stok</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  )
}
