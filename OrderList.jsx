import React from 'react'

export default function OrderList({ orders = [] }) {
  return (
    <div className="table-wrap">
      <table className="orders-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Pesanan</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="3" className="empty">Tidak ada pesanan</td></tr>
          ) : (
            orders.map((o, idx) => (
              <tr key={o.id}>
                <td>{idx + 1}</td>
                <td>{o.name}</td>
                <td>{o.item}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
