# 🚀 DevOrbit — Geliştirici Çalışma İstasyonu & Dashboard

DevOrbit; geliştiricilerin GitHub aktivitelerini takip edebildiği, günlük sprint görevlerini yönetebildiği ve derin odaklanma (Pomodoro) seansları yapabildiği modern bir React panelidir.

---

## ✨ Özellikler

- **🌐 Canlı GitHub Entegrasyonu:** GitHub REST API kullanılarak kullanıcı profili, repo sayısı, takipçi sayıları ve son güncellenen projeler anlık olarak listelenir.
- **📝 Görev Panosu (CRUD):** 
  - Görev oluşturma (Create), listeleme (Read), durum güncelleme (Update) ve silme (Delete).
  - Öncelik belirleme (Düşük, Orta, Yüksek).
  - **Kalıcı Hafıza:** Sayfa yenilendiğinde verilerin kaybolmaması için `LocalStorage` entegrasyonu.
- **⏱️ Derin Odak Modu (Pomodoro):** 25 dakikalık çalışma sprintlerini yöneten zamanlayıcı.
- **📖 Geliştirici Not Defteri (DevLog):** Gün içinde çözülen bug'ları ve alınan notları tarayıcı hafızasında saklayan hızlı kayıt alanı.
- **🎨 Modern Arayüz:** Tailwind CSS ile tasarlanmış, duyarlı (responsive) ve koyu tema (dark mode) odaklı kullanıcı deneyimi.

---

## 🛠️ Kullanılan Teknolojiler

- **Kütüphane:** [React](https://react.dev/)
- **Derleme Aracı:** [Vite](https://vitejs.dev/)
- **Stil & Tasarım:** [Tailwind CSS](https://tailwindcss.com/)
- **İkon Paketi:** [Lucide React](https://lucide.dev/)
- **Durum & Yaşam Döngüsü:** `useState`, `useEffect` Hook'ları
- **Veri Kalıcılığı:** Tarayıcı `LocalStorage` API

---

## 💻 Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için:

1. Depoyu klonlayın:
   ```bash
   git clone [https://github.com/Sn_Sevda/devorbit.git](https://github.com/Sn_Sevda/devorbit.git)