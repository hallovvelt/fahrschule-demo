import Navbar from "./components/Navbar"
import Link from "next/link"

const icerik = {
  de: {
    baslik: "Fahrschule",
    altbaslik: "Dein Weg zum Führerschein — schnell, sicher und modern.",
    btn1: "Leistungen ansehen",
    btn2: "Kontakt aufnehmen",
  },
  tr: {
    baslik: "Fahrschule",
    altbaslik: "Ehliyetine giden yol — hızlı, güvenli ve modern.",
    btn1: "Hizmetleri gör",
    btn2: "İletişime geç",
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dil = locale === "tr" ? icerik.tr : icerik.de

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
    </>
  )
}