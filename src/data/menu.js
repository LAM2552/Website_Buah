const menu = [
  {
    title: 'Dashboard',
    description: 'Lihat daftar pesanan (read-only)',
    items: [
      { name: 'Pesanan', path: '/dashboard', queueView: true }
    ]
  },
  {
    title: 'Menu',
    description: 'Kelola daftar buah, stok, dan operasi pesanan',
    items: [
      { name: 'Daftar Buah', path: '/daftar-buah' },
      { name: 'Daftar Pesanan', path: '/daftar-pesanan' },
      { name: 'Stok Buah', path: '/stok-buah' }
    ]
  }
]

export default menu
