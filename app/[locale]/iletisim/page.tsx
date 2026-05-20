import Navbar from "../components/Navbar"

export default async function Iletisim({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-black text-white pt-20 px-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">
          {locale === "tr" ? "İletişim" : "Kontakt"}
        </h1>
        <p className="text-gray-400 mb-12">
          {locale === "tr" ? "Bize WhatsApp'tan yazın!" : "Schreib uns direkt auf WhatsApp!"}
        </p>
        <a href="https://wa.me/491234567890" target="_blank" className="bg-green-500 hover:bg-green-400 text-white text-xl font-bold px-10 py-5 rounded-full transition-colors">
          💬 WhatsApp
        </a>
      </main>
    </>
  )
}