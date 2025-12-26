import React, { createContext, useContext, useEffect, useState } from 'react'

const OrderQueueContext = createContext(null)
const STORAGE_KEY = 'order_queue_v1'

export function OrderQueueProvider({ children }){
  const [items, setItems] = useState(() => {
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch(e){ return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function enqueue(order){
    setItems(prev => [...prev, { id: Date.now().toString(), status: 'pending', ...order }])
  }

  function dequeue(){
    setItems(prev => prev.slice(1))
  }

  function remove(id){
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function update(id, patch){
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i))
  }

  function processNext(){
    // mark first item as processed then dequeue
    setItems(prev => {
      if(prev.length === 0) return prev
      const [first, ...rest] = prev
      const updated = [{ ...first, status: 'processed' }, ...rest]
      return updated.slice(1)
    })
  }

  function clear(){ setItems([]) }

  function toArray(){ return items }

  return (
    <OrderQueueContext.Provider value={{ items, enqueue, dequeue, remove, update, processNext, clear, toArray }}>
      {children}
    </OrderQueueContext.Provider>
  )
}

export function useOrderQueue(){
  const ctx = useContext(OrderQueueContext)
  if(!ctx) throw new Error('useOrderQueue must be used within OrderQueueProvider')
  return ctx
}
