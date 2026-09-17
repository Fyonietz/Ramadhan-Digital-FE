import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  FileText,
  LineChart,
  MessageCircle,
  MoonStar,
  PencilLine,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BookOpenText,
    title: "Al-Qur'an Digital",
    description: "Membantu siswa membaca dan mempelajari Al-Qur'an secara digital.",
  },
  {
    icon: PencilLine,
    title: "Setoran Hafalan",
    description: "Mencatat dan memantau perkembangan setoran hafalan siswa.",
  },
  {
    icon: MoonStar,
    title: "Ibadah & Dzikir",
    description: "Mencatat aktivitas ibadah harian dan menyediakan bacaan dzikir.",
  },
  {
    icon: CalendarDays,
    title: "Kegiatan Ramadhan",
    description: "Mengelola dan mengikuti berbagai kegiatan Pesantren Ramadhan.",
  },
];

const analyticsFeatures = [
  {
    icon: BarChart3,
    title: "Grafik Visual Interaktif",
    description:
      "Semua aktivitas ibadah, hafalan, dan kegiatan tersaji dalam grafik yang mudah dipahami.",
  },
  {
    icon: FileText,
    title: "Rekapitulasi Otomatis",
    description:
      "Data siswa, ibadah, dan kehadiran diformat otomatis untuk laporan instan tanpa rekap manual.",
  },
  {
    icon: LineChart,
    title: "Monitoring Trend Aktivitas",
    description:
      "Pantau perkembangan ibadah dan kegiatan santri secara real-time agar intervensi lebih tepat.",
  },
];

const highlights = [
  "Rekapitulasi & grafik otomatis untuk ibadah, hafalan, dan kegiatan ramadhan",
  "Dashboard santri dan pengelola terintegrasi dengan akses modern",
  "Keamanan data santri terjaga dengan struktur sistem yang rapi",
];

const developers = [
  {
    name: "Developer Mobile",
    username: "ghaniymadea___",
    url: "https://www.instagram.com/ghaniymadea___/",
  },
  {
    name: "Developer Backend",
    username: "mhdfarhannn____",
    url: "https://www.instagram.com/mhdfarhannn____?stkn=N3kyamIwb3Jqa2dx",
  },
];

const analytics = [
  "/Statistik Ibadah Sunnah.png",
  "/Statistik Kehadiran.png",
  "/Statistik Ibadah Wajib.png",
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-header__inner">
          <div className="brand-wrap">
            <img src="/logo.jpeg" alt="Logo Ramadhan Digital" className="brand-logo" />
            <div className="brand-copy">
              <p className="brand-name">Ramadhan Digital</p>
              <p className="brand-subtitle">Platform Pesantren Ramadhan</p>
            </div>
          </div>

          <nav className="main-nav" aria-label="Navigasi utama">
            <a href="#fitur-utama">Fitur Utama</a>
            <a href="#preview-grafik">Visual Grafik</a>
            <a href="#rekap-grafik">Analytics</a>
            <a href="#kontak">Kontak</a>
          </nav>

          <a
            className="primary-button landing-header__cta"
            href={developers[0].url}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            Hubungi Developer
          </a>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-glow" aria-hidden="true" />

          <div className="hero-copy">
            <span className="eyebrow">
              <ShieldCheck size={14} />
              Platform Pesantren Ramadhan
            </span>

            <h1>Kelola Ibadah & Kegiatan Ramadhan Lebih Terstruktur.</h1>
            <p>
              Solusi digital untuk mengelola ibadah, hafalan, dan kegiatan santri
              selama bulan Ramadhan dengan lebih mudah dipantau, lebih efektif,
              dan lebih terintegrasi.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button hero-button"
                onClick={() =>
                  document.getElementById("fitur-utama")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Jelajahi Fitur Utama
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="secondary-button hero-button"
                onClick={() =>
                  document.getElementById("preview-grafik")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Lihat Grafik
              </button>
            </div>

            <ul className="hero-badges" aria-label="Keunggulan utama">
              {highlights.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="device-shell">
              <div className="device-notch" aria-hidden="true" />
              <img src="/Beranda.jpg" alt="Mockup aplikasi Ramadhan Digital" />
            </div>
          </div>
        </section>

        <section className="feature-section" id="fitur-utama">
          <div className="section-header">
            <span className="section-mark" />
            <h2>Fitur Unggulan</h2>
          </div>

          <div className="feature-grid">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="feature-card">
                <div className="feature-icon-wrap">
                  <Icon size={28} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="showcase-section" id="preview-grafik">
          <div className="section-header">
            <span className="section-mark" />
            <h2>Tampilan & Statistik</h2>
          </div>

          <div className="stats-grid">
            {analytics.map((image, index) => (
              <figure key={image} className="stat-card">
                <img src={image} alt={`Statistik Ramadhan Digital ${index + 1}`} />
              </figure>
            ))}
          </div>
        </section>

        <section className="analytics-section" id="rekap-grafik">
          <div className="section-header">
            <span className="section-mark" />
            <h2>Rekapitulasi & Analytics</h2>
          </div>

          <div className="analytics-grid">
            {analyticsFeatures.map(({ icon: Icon, title, description }) => (
              <article key={title} className="analytics-card">
                <div className="analytics-icon">
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="developers-section" id="kontak">
          <div className="section-header">
            <span className="section-mark" />
            <h2>Hubungi Developer</h2>
          </div>

          <div className="developer-grid">
            {developers.map((developer) => (
              <a
                key={developer.username}
                className="developer-card"
                href={developer.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="developer-avatar">
                  <MessageCircle size={22} />
                </div>
                <div className="developer-meta">
                  <strong>{developer.name}</strong>
                  <span>@{developer.username}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
