import React, { useState, useEffect } from 'react'
import './ConfirmPurchaseModal.css'

export default function ConfirmPurchaseModal({
    visible,
    fruit,
    initialQuantity = 1,
    onConfirm,
    onCancel
}) {
    const [quantity, setQuantity] = useState(initialQuantity)

    useEffect(() => {
        setQuantity(initialQuantity)
    }, [initialQuantity, visible])

    if (!visible || !fruit) return null

    const subtotal = fruit.price * quantity

    function handleQuantityChange(e) {
        const val = parseInt(e.target.value, 10)
        if (!isNaN(val) && val > 0) {
            setQuantity(val)
        }
    }

    function handleConfirm() {
        onConfirm(quantity)
    }

    return (
        <div className="confirm-overlay" onClick={onCancel}>
            <div className="confirm-modal" onClick={e => e.stopPropagation()}>
                <h2>Apakah Anda Yakin?</h2>
                <p className="subtitle">Ingin Membeli Buah</p>

                <div className="quantity-row">
                    <label>Jumlah:</label>
                    <input
                        type="number"
                        className="quantity-input"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                    <span>kg</span>
                </div>

                <p className="subtotal">
                    Subtotal: <strong>Rp {subtotal.toLocaleString('id-ID')}</strong>
                </p>

                <div className="confirm-buttons">
                    <button className="btn-confirm btn-yes" onClick={handleConfirm}>
                        Ya
                    </button>
                    <button className="btn-confirm btn-no" onClick={onCancel}>
                        Tidak
                    </button>
                </div>
            </div>
        </div>
    )
}
