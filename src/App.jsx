/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StokBuah from './pages/StokBuah'
import DaftarBuah from './pages/DaftarBuah'
import DaftarPesanan from './pages/DaftarPesanan'
import Belanja from './pages/Belanja'

export default function App() {
  return (
    <BrowserRouter>
      <div className="top-bar" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/daftar-buah" element={<DaftarBuah />} />
        <Route path="/stok-buah" element={<StokBuah />} />
        <Route path="/belanja" element={<Belanja />} />
        <Route path="/daftar-pesanan" element={<DaftarPesanan />} />
      </Routes>
    </BrowserRouter>
  )
}
