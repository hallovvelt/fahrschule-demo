"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"

// Başlangıç ders yapısı (Terminler sayfasındakiyle aynı yapıda olmalı)
interface Ders {
  id: number
  tarih: string
  saat: string
  dersAdi: string
  kontenjan: number
  fiyat: string
}

export default function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)

  // Eyaletler (State Yönetimi)
  const [dersler, setDersler] = useState<Ders[]>([])
  
  // Yeni ders ekleme form elemanları
  const [yeniTarih, setYeniTarih] = useState("")
  const [yeniSaat, setYeniSaat] = useState("")
  const [yeniAd, setYeniAd] = useState("")
  const [yeniKontenjan, setYeniKontenjan] = useState(5)
  const [yeniFiyat, setYeniFiyat] = useState("")

  // Sayfa açıldığında ortak hafızadan (localStorage) verileri çekiyoruz
  useEffect(() => {
    const hafizadakiDersler = localStorage.getItem("fahrschule_terminler")
    if (hafizadakiDersler) {
      setDersler(JSON.parse(hafizadakiDersler))
    }
  }, [])

  // DÜKKAN SAHİBİNİN YENİ DERS EKLEME MOTORU
  const hocaDersEkle = (e: React.FormEvent) => {
    e.preventDefault()

    const yeniDers: Ders = {
      id: Date.now(), // Benzersiz bir ID üretmek için zamanı kullanıyoruz
      tarih: yeniTarih,
      saat: yeniSaat,
      dersAdi: yeniAd,
      kontenjan: Number(yeniKontenjan),
      fiyat: yeniFiyat || "Gratis"
    }

    const guncelDersler = [...dersler, yeniDers]
    
    // Hem ekrandaki listeyi güncelliyoruz hem de ortak hafızaya yazıyoruz!
    setDersler(guncelDersler)
    localStorage.setItem("fahrschule_terminler", JSON.stringify(guncelDersler))

    // Formu temizliyoruz
    setYeniTarih("")
    setYeniSaat("")
    setYeniAd("")
    setYeniFiyat("")
  }

  // DÜKKAN SAHİBİNİN DERSİ SİLME MOTORU
  const hocaDersSil = (id: number) => {
    const guncelDersler = dersler.filter(ders => ders.id !== id)
    setDersler(guncelDersler)
    localStorage.setItem("fahrschule_terminler", JSON.stringify(guncelDersler))
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-red-500">Fahrschule Lahr — Admin Panel</h1>
          <p className="text-gray-400 text-sm">Dükkan Sahibi Yönetim Paneli Motoru</p>
        </div>
        <Link href={`/${locale}/terminler`} className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm transition">
          {locale === "tr" ? "Canlı Randevu Sayfasına Git →" : "Zur Live-Termine-Seite →"}
        </Link>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: YENİ DERS EKLEME FORMU */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold text-gray-200 mb-4">
            {locale === "tr" ? "Yeni Ders Aç" : "Neuen Kurs Erstellen"}
          </h2>
          
          <form onSubmit={hocaDersEkle} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Tarih (Örn: Montag, 1. Juni)</label>
              <input type="text" required value={yeniTarih} onChange={e => setYeniTarih(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500" placeholder="Mittwoch, 27. Mai 2026" />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Saat (Örn: 18:30)</label>
              <input type="text" required value={yeniSaat} onChange={e => setYeniSaat(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500" placeholder="10:00" />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase">Ders / Kurs Adı</label>
              <input type="text" required value={yeniAd} onChange={e => setYeniAd(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500" placeholder="Theorie - Thema 5" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase">Kontenjan</label>
                <input type="number" required value={yeniKontenjan} onChange={e => setYeniKontenjan(Number(e.target.value))} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase">Fiyat</label>
                <input type="text" value={yeniFiyat} onChange={e => setYeniFiyat(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-500" placeholder="95€ veya Gratis" />
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-bold transition mt-2">
              {locale === "tr" ? "Dersi Listeye Ekle" : "Kurs Hinzufügen"}
            </button>
          </form>
        </div>

        {/* SAĞ TARAF: MEVCUT DERSLER VE KONTENJAN DURUMLARI */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-200 mb-2">
            {locale === "tr" ? "Mevcut Ders Durumları" : "Aktuelle Kurse & Status"}
          </h2>

          {dersler.length === 0 ? (
            <p className="text-gray-500">Henüz açılmış bir ders yok.</p>
          ) : (
            dersler.map((ders) => (
              <div key={ders.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <span className="text-sm text-red-400 font-mono block">{ders.tarih} — {ders.saat}</span>
                  <h3 className="text-base font-medium text-gray-200">{ders.dersAdi}</h3>
                  <span className="text-xs text-gray-500 mt-1 block">Fiyat: {ders.fiyat}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Kalan Yer</span>
                    <span className={`font-bold ${ders.kontenjan === 0 ? "text-red-500" : "text-green-500"}`}>
                      {ders.kontenjan} Plätze
                    </span>
                  </div>
                  
                  <button onClick={() => hocaDersSil(ders.id)} className="bg-neutral-800 hover:bg-red-900/40 text-gray-400 hover:text-red-500 p-2 rounded-lg transition text-sm">
                    {locale === "tr" ? "Sil" : "Löschen"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}