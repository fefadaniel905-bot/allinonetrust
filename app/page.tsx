"use client";
import { useState } from "react";

const BUSINESSES = [
  { id: 1, name: "Windhoek Kapana Corner", category: "Food", location: "Windhoek", phone: "264811234567" },
  { id: 2, name: "Swakop Tailor Studio", category: "Fashion", location: "Swakopmund", phone: "264819876543" },
  { id: 3, name: "Oshakati Phone Hub", category: "Tech", location: "Oshakati", phone: "264815551234" },
  { id: 4, name: "Katima Beauty Bar", category: "Beauty", location: "Katutura", phone: "264812223344" },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const filtered = BUSINESSES.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>Allinonetrust</h1>
      <p style={{ color: "#666" }}>One place for all Namibian businesses. Search, browse, WhatsApp.</p>
      
      <input 
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search e.g. Kapana, Fashion, Windhoek..."
        style={{ width: "100%", padding: 14, fontSize: 16, margin: "20px 0", borderRadius: 8, border: "1px solid #ddd" }}
      />

      {filtered.map(b => (
        <div key={b.id} style={{ background: "white", padding: 16, borderRadius: 12, marginBottom: 12, border: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: 0 }}>{b.name}</h3>
              <p style={{ margin: "4px 0", color: "#888", fontSize: 14 }}>{b.category} • {b.location}</p>
            </div>
            <a 
              href={`https://wa.me/${b.phone}?text=Hi%20${b.name}%2C%20I%20found%20you%20on%20Allinonetrust`}
              target="_blank"
              style={{ background: "#25D366", color: "white", padding: "10px 14px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      ))}
      <p style={{ textAlign: "center", color: "#aaa", marginTop: 30, fontSize: 12 }}>Namibian version of Booking.com model • No app needed</p>
    </div>
  )
}
