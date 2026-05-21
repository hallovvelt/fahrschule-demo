"use client"
import Navbar from "../components/Navbar"
import { useState, use } from "react"

export default function Iletisim({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const [gonderildi, setGonderildi] = useState(false)

  const icerik = {
    de: {
      baslik: "Kontakt",
      altbaslik: "Schreib uns direkt auf WhatsApp!",
      ad: "Ihr Name",
      email: "Ihre E-Mail",
      mesaj: "Ihre Nachricht",
      gonder: "Absenden",
      tesekkur: "Vielen Dank! Wir melden uns bald.",
    },
    tr: {
      baslik: "İletişim",
      altbaslik: "Bize WhatsApp'tan yazın!",
      ad: "Adınız",
      email: "E-posta",
      mesaj: "Mesajınız",
      gonder: "Gönder",
      tesekkur: "Teşekkürler! En kısa sürede döneceğiz.",
    }
  }

  const dil = locale === "tr" ? icerik.tr : icerik.de

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGonderildi(true)
  }

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-black text-white pt-20 px-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">{dil.baslik}</h1>
        <p className="text-gray-400 mb-12">{dil.altbaslik}</p>

        <a href="https://wa.me/491234567890" target="_blank" className="bg-green-500 hover:bg-green-400 text-white text-xl font-bold px-10 py-5 rounded-full transition-colors mb-12">
          💬 WhatsApp
        </a>

        {gonderildi ? (
          <p className="text-green-400 text-xl font-bold">{dil.tesekkur}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
            <input type="text" placeholder={dil.ad} required className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-600 focus:border-blue-500 outline-none" />
            <input type="email" placeholder={dil.email} required className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-600 focus:border-blue-500 outline-none" />
            <textarea placeholder={dil.mesaj} required rows={5} className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-600 focus:border-blue-500 outline-none resize-none" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
              {dil.gonder}
            </button>
          </form>
        )}
      </main>
    </>
  )
}