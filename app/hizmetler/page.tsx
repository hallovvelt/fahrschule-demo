import Navbar from "../components/Navbar"

const hizmetler = [
  { id: 1, baslik: "Klasse B", aciklama: "PKW Führerschein" },
  { id: 2, baslik: "Klasse A", aciklama: "Motorrad Führerschein" },
  { id: 3, baslik: "Klasse C", aciklama: "LKW Führerschein" },
]

export default function Hizmetler() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-20 px-8">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-12">
          Unsere Leistungen
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {hizmetler.map((hizmet) => (
            <div key={hizmet.id} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-700 hover:border-blue-500 transition-colors">
              <h2 className="text-2xl font-bold text-blue-400">{hizmet.baslik}</h2>
              <p className="text-gray-400 mt-2">{hizmet.aciklama}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}