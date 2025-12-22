import React from "react";
import ButtonCard from "./ButtonCard.jsx";

export default function Menu() {
  return (
    <div className="menu-wrap">
      <header className="menu-title">Menu</header>
      <div className="cards-row">
        <ButtonCard title="Lihat Stok Buah" />
        <ButtonCard title="Lihat Daftar Buah" />
        <ButtonCard title="Lihat Daftar Pesanan" />
      </div>
    </div>
  );
}
