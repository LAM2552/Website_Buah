import React, { createContext, useContext, useEffect, useState } from 'react'

const FruitQueueContext = createContext(null)
const STORAGE_KEY = 'fruit_queue_v1'

export function FruitQueueProvider({ children }){
  const [items, setItems] = useState(() => {
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch(e){ return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function enqueue(item){
    setItems(prev => [...prev, { id: Date.now().toString(), ...item }])
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

  function clear(){ setItems([]) }

  function toArray(){ return items }

  return (
    <FruitQueueContext.Provider value={{ items, enqueue, dequeue, remove, update, clear, toArray }}>
      {children}
    </FruitQueueContext.Provider>
  )
}

export function useFruitQueue(){
  const ctx = useContext(FruitQueueContext)
  if(!ctx) throw new Error('useFruitQueue must be used within FruitQueueProvider')
  return ctx
}
