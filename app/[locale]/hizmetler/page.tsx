import Navbar from "../components/Navbar"

const icerik = {
  de: {
    baslik: "Unsere Leistungen",
    hizmetler: [
      { id: 1, baslik: "Klasse B", aciklama: "PKW Führerschein" },
      { id: 2, baslik: "Klasse A", aciklama: "Motorrad Führerschein" },
      { id: 3, baslik: "Klasse C", aciklama: "LKW Führerschein" },
    ]
  },
  tr: {
    baslik: "Hizmetlerimiz",
    hizmetler: [
      { id: 1, baslik: "B Sınıfı", aciklama: "Otomobil Ehliyeti" },
      { id: 2, baslik: "A Sınıfı", aciklama: "Motosiklet Ehliyeti" },
      { id: 3, baslik: "C Sınıfı", aciklama: "Kamyon Ehliyeti" },
    ]
  }
}

export default async function Hizmetler({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dil = locale === "tr" ? icerik.tr : icerik.de

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-black text-white pt-20 px-8">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-12">{dil.baslik}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {dil.hizmetler.map((hizmet) => (
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