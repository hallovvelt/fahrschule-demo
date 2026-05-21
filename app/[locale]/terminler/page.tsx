"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"

// 1. ADIM: Sürücü kursunun açtığı örnek ders listesi (Mock Data)
const ILK_DERSLER = [
  {
    id: 1,
    tarih: "Mittwoch, 27. Mai 2026",
    saat: "10:00",
    dersAdi: "Intensivkurs Auto-Führerschein - Klasse B",
    kontenjan: 0, // Dolu
    fiyat: "95€"
  },
  {
    id: 2,
    tarih: "Donnerstag, 4. Juni 2026",
    saat: "11:00",
    dersAdi: "Theorieunterricht - Thema 3: Rechtliche Rahmenbedingungen",
    kontenjan: 5, // Boş yer var
    fiyat: "Gratis"
  },
  {
    id: 3,
    tarih: "Donnerstag, 11. Juni 2026",
    saat: "11:00",
    dersAdi: "Intensivkurs Motorrad-Führerschein - Klasse A",
    kontenjan: 2, // Boş yer var
    fiyat: "120€"
  }
]

// 2. ADIM: Çoklu Dil Sözlüğü (Almanca ve Türkçe)
const icerik = {
  de: {
    baslik: "Termine & Reservierung",
    altbaslik: "Wählen Sie einen passenden Kurs und reservieren Sie Ihren Platz.",
    tarihDers: "Datum & Kurs",
    status: "Verfügbarkeit",
    preis: "Preis",
    dolu: "AUSGEBUCHT",
    rezervasyonYap: "RESERVIEREN",
    formBaslik: "Anmeldung für",
    isim: "Ihr Name",
    eposta: "Ihre E-Mail",
    onayla: "Jetzt Buchen",
    basarili: "Erfolgreich reserviert! Wir senden Ihnen eine E-Mail."
  },
  tr: {
    baslik: "Randevular & Rezervasyon",
    altbaslik: "Uygun bir kurs seçin ve yerinizi hemen ayırtın.",
    tarihDers: "Tarih & Ders",
    status: "Kontenjan",
    preis: "Fiyat",
    dolu: "DOLU",
    rezervasyonYap: "REZERVASYON YAP",
    formBaslik: "Kayıt Formu:",
    isim: "Adınız Soyadınız",
    eposta: "E-Posta Adresiniz",
    onayla: "Şimdi Rezervasyon Yap",
    basarili: "Rezervasyon başarıyla yapıldı! E-posta adresinizi kontrol edin."
  }
}

export default function TerminlerPage({ params }: { params: Promise<{ locale: string }> }) {
  // URL'den dili alıyoruz (tr veya de)
  const { locale } = use(params)
  const d = locale === "tr" ? icerik.tr : icerik.de

  // Eyaletler (State Yönetimi) - Motorun dişlileri burada dönüyor
  const [dersler, setDersler] = useState<typeof ILK_DERSLER>([])
  const [secilenDers, setSecilenDers] = useState<typeof ILK_DERSLER[0] | null>(null)
  const [musteriIsim, setMusteriIsim] = useState("")
  const [musteriEposta, setMusteriEposta] = useState("")
  const [bildirim, setBildirim] = useState("")

  // MOTORUN HAFIZA DİŞLİSİ: Sayfa ilk açıldığında tarayıcı hafızasına bakar
  useEffect(() => {
    const hafizadakiDersler = localStorage.getItem("fahrschule_terminler")
    if (hafizadakiDersler) {
      setDersler(JSON.parse(hafizadakiDersler))
    } else {
      // Eğer hafıza bomboşsa, ilk başta hazırladığımız örnek dersleri yükle ve hafızaya yaz
      setDersler(ILK_DERSLER)
      localStorage.setItem("fahrschule_terminler", JSON.stringify(ILK_DERSLER))
    }
  }, [])

  // Rezervasyon onaylandığında çalışan fonksiyon (Geliştirilmiş Hafızalı Backend Mantığı)
  const hocaRezervasyonYap = (e: React.FormEvent) => {
    e.preventDefault()

    if (!secilenDers) return

    // Seçilen dersin kontenjanını 1 azaltıyoruz
    const guncelDersler = dersler.map((ders) => {
      if (ders.id === secilenDers.id && ders.kontenjan > 0) {
        return { ...ders, kontenjan: ders.kontenjan - 1 }
      }
      return ders
    })

    // Güncellenmiş ders listesini hem ekrana basıyoruz hem de tarayıcı hafızasına kalıcı kaydediyoruz
    setDersler(guncelDersler)
    localStorage.setItem("fahrschule_terminler", JSON.stringify(guncelDersler))

    setBildirim(d.basarili)
    setSecilenDers(null) // Form modali kapatılıyor
    setMusteriIsim("")
    setMusteriEposta("")

    // 5 saniye sonra başarı bildirimini ekrandan kaldırıyoruz
    setTimeout(() => setBildirim(""), 5000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      {/* Geri Dön Butonu */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link href={`/${locale}`} className="text-blue-500 hover:underline">
          ← {locale === "tr" ? "Ana Sayfaya Dön" : "Zurück zur Startseite"}
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">{d.baslik}</h1>
        <p className="text-gray-400 mb-8">{d.altbaslik}</p>

        {/* Başarı Mesajı Kutusu */}
        {bildirim && (
          <div className="bg-green-600 text-white p-4 rounded-xl mb-6 font-semibold animate-pulse">
            {bildirim}
          </div>
        )}

        {/* DERS LİSTESİ MOTORU */}
        <div className="space-y-4">
          {dersler.map((ders) => (
            <div
              key={ders.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between transition hover:border-neutral-700"
            >
              {/* Sol Taraf: Tarih ve Ders Bilgisi */}
              <div className="mb-4 md:mb-0">
                <span className="text-blue-400 font-bold block mb-1">
                  {ders.tarih} - {ders.saat}
                </span>
                <h3 className="text-lg font-medium text-gray-200">{ders.dersAdi}</h3>
              </div>

              {/* Sağ Taraf: Durum, Fiyat ve Buton */}
              <div className="flex items-center justify-between md:justify-end space-x-6">
                <div className="text-sm">
                  <span className="text-gray-500 block">{d.status}</span>
                  <span className={ders.kontenjan === 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
                    {ders.kontenjan === 0 ? d.dolu : `${ders.kontenjan} Plätze`}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-gray-500 block">{d.preis}</span>
                  <span className="font-semibold text-gray-300">{ders.fiyat}</span>
                </div>

                {ders.kontenjan === 0 ? (
                  <button disabled className="bg-neutral-800 text-neutral-600 px-4 py-2 rounded-lg font-bold cursor-not-allowed">
                    {d.dolu}
                  </button>
                ) : (
                  <button
                    onClick={() => setSecilenDers(ders)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition"
                  >
                    {d.rezervasyonYap}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* REZERVASYON FORMU MODAL (Açılır Pencere) */}
        {secilenDers && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-md w-full relative">
              <button
                onClick={() => setSecilenDers(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-blue-500 mb-1">{d.formBaslik}</h2>
              <p className="text-sm text-gray-400 mb-4">{secilenDers.dersAdi}</p>

              <form onSubmit={hocaRezervasyonYap} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">{d.isim}</label>
                  <input
                    type="text"
                    required
                    value={musteriIsim}
                    onChange={(e) => setMusteriIsim(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">{d.eposta}</label>
                  <input
                    type="email"
                    required
                    value={musteriEposta}
                    onChange={(e) => setMusteriEposta(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition mt-2">
                  {d.onayla}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}