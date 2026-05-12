import Navbar from "./components/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-6xl font-black text-white mb-4">Fahrschule <span className="text-blue-500">Lahr</span></h1>
        <p className="text-xl text-gray-400 mb-12 max-w-xl">Dein Weg zum Führerschein — schnell, sicher und modern.</p>
        <div className="flex gap-6">
          <Link href="/hizmetler" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors">
            Leistungen ansehen
          </Link>
          <Link href="/iletisim" className="border border-white hover:border-blue-500 hover:text-blue-500 text-white font-bold px-8 py-4 rounded-full transition-colors">
            Kontakt aufnehmen
          </Link>
        </div>
      </main>
    </>
  )
}