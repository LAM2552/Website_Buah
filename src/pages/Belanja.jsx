import React, { useState } from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useFruitQueue } from '../context/FruitQueueContext'
import { useOrderQueue } from '../context/OrderQueueContext'
import { useShopping } from '../context/ShoppingContext'
import ConfirmPurchaseModal from '../components/ConfirmPurchaseModal'
import SuccessNotification from '../components/SuccessNotification'
import './Belanja.css'

export default function Belanja() {
    const { items: fruits } = useFruitQueue()
    const { enqueue: addOrder } = useOrderQueue()
    const { addToCart } = useShopping()

    const [selectedFruit, setSelectedFruit] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)

    // Generate price options (1-5 kg)
    const priceOptions = [1, 2, 3, 4, 5]

    function handleFruitClick(fruit) {
        setSelectedFruit(fruit)
    }

    function handlePriceClick(kg) {
        setSelectedQuantity(kg)
        setShowConfirm(true)
    }

    function handleConfirmPurchase(quantity) {
        if (!selectedFruit) return

        // Add to cart using Double Linked List
        const cartItem = addToCart(selectedFruit, quantity)

        // Also add to order queue
        addOrder({
            customer: 'User',
            note: `${quantity} kg ${selectedFruit.name}`,
            fruitId: selectedFruit.id,
            fruitName: selectedFruit.name,
            quantity: quantity,
            subtotal: selectedFruit.price * quantity
        })

        setShowConfirm(false)
        setShowSuccess(true)
    }

    function handleCancelConfirm() {
        setShowConfirm(false)
    }

    function handleCloseSuccess() {
        setShowSuccess(false)
        setSelectedFruit(null)
    }

    return (
        <DefaultLayout title="Belanja">
            <div className="belanja-container">
                <div className="card">
                    <div className="fruit-selection">
                        <h3>Pilih Buah</h3>
                        {fruits.length === 0 ? (
                            <div className="empty-state">
                                <p>Tidak ada buah tersedia</p>
                            </div>
                        ) : (
                            <div className="fruit-grid">
                                {fruits.map(fruit => (
                                    <div
                                        key={fruit.id}
                                        className={`fruit-card ${selectedFruit?.id === fruit.id ? 'selected' : ''}`}
                                        onClick={() => handleFruitClick(fruit)}
                                    >
                                        <div className="fruit-name">{fruit.name}</div>
                                        <div className="fruit-price">Rp {fruit.price.toLocaleString('id-ID')}/kg</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedFruit && (
                        <div className="price-panel">
                            <h3>Harga {selectedFruit.name}</h3>
                            <div className="price-list">
                                {priceOptions.map(kg => (
                                    <div
                                        key={kg}
                                        className="price-row"
                                        onClick={() => handlePriceClick(kg)}
                                    >
                                        <span className="kg">{kg} kg</span>
                                        <span className="total-price">
                                            Rp {(selectedFruit.price * kg).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmPurchaseModal
                visible={showConfirm}
                fruit={selectedFruit}
                initialQuantity={selectedQuantity}
                onConfirm={handleConfirmPurchase}
                onCancel={handleCancelConfirm}
            />

            <SuccessNotification
                visible={showSuccess}
                onClose={handleCloseSuccess}
            />
        </DefaultLayout>
    )
}
