import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useFruitQueue } from '../context/FruitQueueContext'
import './StokBuah.css'

export default function StokBuah(){
  const { items } = useFruitQueue()

  return (
    <DefaultLayout title="Stok Buah">
      <div className="card">
        <h3>Stok Buah</h3>
        <div className="stock-list">
          <table>
            <thead>
              <tr>
                <th>Nama Buah</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={2}><em>Tidak ada buah</em></td></tr>
              )}
              {items.map(i => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  )
}
