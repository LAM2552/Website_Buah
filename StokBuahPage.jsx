import { useState } from 'react'
import FruitItem from '../components/FruitItem'
import '../styles/StokBuahPage.css'

function StokBuahPage() {
  const [fruits, setFruits] = useState([
    { id: 1, name: 'Mangga', quantity: 20, unit: 'kg' },
    { id: 2, name: 'Alpukat', quantity: 20, unit: 'kg' },
    { id: 3, name: 'Durian', quantity: 20, unit: 'kg' },
    { id: 4, name: 'Pisang', quantity: 20, unit: 'kg' },
  ])

  return (
    <div className="stok-buah-container">
      <div className="stok-buah-card">
        <div className="stok-buah-header">
          <button className="back-button">
            <span className="back-arrow">←</span>
          </button>
          <h1 className="stok-buah-title">Stok Buah</h1>
        </div>

        <div className="fruits-list">
          {fruits.map((fruit) => (
            <FruitItem key={fruit.id} fruit={fruit} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StokBuahPage
