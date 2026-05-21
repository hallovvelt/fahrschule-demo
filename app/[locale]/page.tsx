"use client"
import Navbar from "./components/Navbar"
import Link from "next/link"
import { useEffect, useState, use } from "react"

const icerik = {
  de: {
    baslik: "Fahrschule",
    altbaslik: "Dein Weg zum Führerschein — schnell, sicher und modern.",
    btn1: "Leistungen ansehen",
    btn2: "Kontakt aufnehmen",
    cerez: "Wir verwenden Cookies für eine bessere Erfahrung.",
    kabul: "Akzeptieren",
  },
  tr: {
    baslik: "Fahrschule",
    altbaslik: "Ehliyetine giden yol — hızlı, güvenli ve modern.",
    btn1: "Hizmetleri gör",
    btn2: "İletişime geç",
    cerez: "Daha iyi deneyim için çerez kullanıyoruz.",
    kabul: "Kabul Et",
  }
}

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const dil = locale === "tr" ? icerik.tr : icerik.de
  const [cerezGoster, setCerezGoster] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCerezGoster(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-6xl font-black text-white mb-4">
          {dil.baslik} <span className="text-blue-500">Lahr</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-xl">{dil.altbaslik}</p>
        <div className="flex gap-6">
          <Link href={`/${locale}/hizmetler`} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors">
            {dil.btn1}
          </Link>
          <Link href={`/${locale}/iletisim`} className="border border-white hover:border-blue-500 hover:text-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors">
            {dil.btn2}
          </Link>
        </div>
      </main>

      {cerezGoster && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-zinc-800 border border-zinc-600 rounded-2xl p-6 shadow-2xl">
          <p className="text-white text-sm mb-4">🍪 {dil.cerez}</p>
          <button
            onClick={() => setCerezGoster(false)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2 rounded-full transition-colors"
          >
            {dil.kabul}
          </button>
        </div>
      )}
    </>
  )
}