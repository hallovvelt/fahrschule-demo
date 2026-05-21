import Link from "next/link"

export default function Navbar({ locale }: { locale: string }) {
  const dilerDe = locale === "de"

  return (
    <nav className="bg-zinc-900 text-white px-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-500">Fahrschule Lahr</h1>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8">
            <Link href={`/${locale}`} className="hover:text-blue-400 transition-colors">
              {dilerDe ? "Home" : "Anasayfa"}
            </Link>
            <Link href={`/${locale}/hizmetler`} className="hover:text-blue-400 transition-colors">
              {dilerDe ? "Leistungen" : "Hizmetler"}
            </Link>
            <Link href={`/${locale}/iletisim`} className="hover:text-blue-400 transition-colors">
              {dilerDe ? "Kontakt" : "İletişim"}
            </Link>
            <Link href={`/${locale}/terminler`} className="hover:text-blue-500 transition">
              {locale === "tr" ? "Randevu" : "Termine"}
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href={`/de`} className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${locale === "de" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}>
              DE
            </Link>
            <Link href={`/tr`} className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${locale === "tr" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}>
              TR
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}