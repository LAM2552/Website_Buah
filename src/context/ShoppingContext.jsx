import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { DoublyLinkedList } from '../lib/DoublyLinkedList'

const ShoppingContext = createContext(null)
const STORAGE_KEY = 'shopping_cart_v1'

export function ShoppingProvider({ children }) {
    const dllRef = useRef(new DoublyLinkedList())
    const [cartItems, setCartItems] = useState([])

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            dllRef.current.loadFromArray(data)
            setCartItems(dllRef.current.toArray())
        } catch (e) {
            console.error('Failed to load cart from localStorage:', e)
        }
    }, [])

    // Save to localStorage when cart changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    }, [cartItems])

    function addToCart(fruit, quantity) {
        const item = {
            fruitId: fruit.id,
            fruitName: fruit.name,
            pricePerKg: fruit.price,
            quantity: quantity,
            subtotal: fruit.price * quantity,
            addedAt: new Date().toISOString()
        }
        dllRef.current.insertLast(item)
        setCartItems(dllRef.current.toArray())
        return item
    }

    function removeFromCart(id) {
        dllRef.current.removeById(id)
        setCartItems(dllRef.current.toArray())
    }

    function updateCartItem(id, patch) {
        dllRef.current.update(id, patch)
        setCartItems(dllRef.current.toArray())
    }

    function clearCart() {
        dllRef.current.clear()
        setCartItems([])
    }

    function getCartSize() {
        return dllRef.current.getSize()
    }

    // Traverse forward (for demonstration)
    function traverseForward(callback) {
        dllRef.current.traverseForward(callback)
    }

    // Traverse backward (for demonstration)
    function traverseBackward(callback) {
        dllRef.current.traverseBackward(callback)
    }

    return (
        <ShoppingContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItem,
            clearCart,
            getCartSize,
            traverseForward,
            traverseBackward
        }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export function useShopping() {
    const ctx = useContext(ShoppingContext)
    if (!ctx) throw new Error('useShopping must be used within ShoppingProvider')
    return ctx
}
