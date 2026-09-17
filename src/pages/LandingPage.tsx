import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  MessageCircle,
  MoonStar,
  PencilLine,
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

const developers = [
  {
    name: "Dev 1",
    username: "ghaniymadea___",
    url: "https://www.instagram.com/ghaniymadea___/",
  },
  {
    name: "Dev 2",
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
        <div className="brand-wrap">
          <img src="/logo.jpeg" alt="Logo Ramadhan Digital" className="brand-logo" />
          <span>Ramadhan Digital</span>
        </div>

        <a
          className="primary-button"
          href={developers[0].url}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={17} />
          Hubungi Developer
          <ArrowRight size={17} />
        </a>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Platform Pesantren Ramadhan</span>
            <h1>Ramadhan Digital</h1>
            <p>
              Solusi digital untuk mengelola ibadah, hafalan, dan kegiatan santri
              selama bulan Ramadhan dengan lebih terstruktur, mudah dipantau, dan
              lebih efektif.
            </p>

            <div className="hero-actions">
              <a
                className="primary-button hero-cta"
                href={developers[1].url}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                Hubungi Developer via Instagram
              </a>
            </div>

            <ul className="hero-badges" aria-label="Keunggulan utama">
              <li>Digital</li>
              <li>Efektif</li>
              <li>Terstruktur</li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="device-shell">
              <img src="/Beranda.jpg" alt="Mockup aplikasi Ramadhan Digital" />
            </div>
          </div>
        </section>

        <section className="feature-section" id="fitur">
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

        <section className="showcase-section" aria-labelledby="showcase-title">
          <div className="section-header compact-header">
            <span className="section-mark" />
            <h2 id="showcase-title">Tampilan & Statistik</h2>
          </div>

          <div className="stats-grid">
            {analytics.map((image, index) => (
              <figure key={image} className="stat-card">
                <img src={image} alt={`Statistik Ramadhan Digital ${index + 1}`} />
              </figure>
            ))}
          </div>
        </section>

        <section className="developers-section">
          <div className="section-header compact-header">
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
                <div>
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
