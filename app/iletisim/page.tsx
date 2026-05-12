import Navbar from "../components/Navbar"

export default function Iletisim() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-20 px-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Kontakt</h1>
        <p className="text-gray-400 mb-12">Schreib uns direkt auf WhatsApp!</p>
        <a href="https://wa.me/491234567890" target="_blank" className="bg-green-500 hover:bg-green-400 text-white text-xl font-bold px-10 py-5 rounded-full transition-colors">
          WhatsApp schreiben
        </a>
        <div className="mt-12 w-full max-w-3xl rounded-2xl overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.123456789!2d7.8676!3d48.3396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLahr!5e0!3m2!1sde!2sde!4v1234567890"
    width="100%"
    height="400"
    style={{border: 0}}
    allowFullScreen
    loading="lazy"
  />
</div>
      </main>
    </>
  )
}