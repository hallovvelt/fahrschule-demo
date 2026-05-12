import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-500">Fahrschule Lahr</h1>
      <div className="flex gap-8">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <Link href="/hizmetler" className="hover:text-blue-400 transition-colors">Leistungen</Link>
        <Link href="/iletisim" className="hover:text-blue-400 transition-colors">Kontakt</Link>
      </div>
    </nav>
  )
}