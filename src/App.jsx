import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1];
const viewport = { once: true, amount: 0.22, margin: '0px 0px -8% 0px' };
const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } }
};

function SafeImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`safe-image ${failed ? 'image-failed' : ''} ${className}`}>
      <div className="image-fallback" aria-hidden="true"><i className="bi bi-steering-wheel"></i></div>
      {!failed ? <img src={src} alt={alt} onError={() => setFailed(true)} /> : null}
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const item = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: easeOut } };
  const close = () => setOpen(false);
  return (
    <motion.header className="site-header" {...item}>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <div className="nav-shell">
        <a className="brand" href="#startseite" onClick={close} aria-label="Ritterbex Startseite">
          <span className="brand-mark"><i className="bi bi-steering-wheel"></i></span>
          <span><strong>Ritterbex</strong><small>Ferienfahrschule</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#startseite">Startseite</a><a href="#kurse">Kurse &amp; Ablauf</a><a href="#fahrzeuge">Fahrzeuge</a><a href="#standort">Standort</a><a href="#aktuelles">Aktuelles</a><a href="#kontakt">Kontakt</a>
        </nav>
        <motion.button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label="Menü öffnen" onClick={() => setOpen(!open)} animate={reduced ? undefined : { rotate: open ? 90 : 0, scale: open ? [1, 0.92, 1] : 1 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
          <i className={open ? 'bi bi-x-lg' : 'bi bi-list'}></i>
        </motion.button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile Navigation" initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: reduced ? 0.2 : 0.28, ease: reduced ? 'linear' : easeOut }}>
            <a href="#startseite" onClick={close}>Startseite</a><a href="#kurse" onClick={close}>Kurse &amp; Ablauf</a><a href="#fahrzeuge" onClick={close}>Fahrzeuge</a><a href="#standort" onClick={close}>Standort</a><a href="#aktuelles" onClick={close}>Aktuelles</a><a href="#kontakt" onClick={close}>Kontakt</a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 12]);
  const textY = useTransform(scrollYProgress, [0.55, 1], [0, reduced ? 0 : -10]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 1], [1, reduced ? 1 : 0.88]);
  const laneOpacity = useTransform(scrollYProgress, [0.2, 0.8], [reduced ? 1 : 0.2, 1]);
  return (
    <section id="startseite" className="hero section" ref={ref}>
      <motion.div className="hero-mesh" aria-hidden="true"></motion.div>
      <motion.div className="yellow-band" aria-hidden="true" initial={reduced ? { opacity: 0 } : { scaleX: 0 }} animate={reduced ? { opacity: 1 } : { scaleX: 1 }} transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.12, ease: reduced ? 'linear' : easeOut }}></motion.div>
      <motion.div className="hero-lane" aria-hidden="true" style={{ opacity: laneOpacity }}></motion.div>
      <motion.div className="container hero-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0.2 : 0.4, ease: reduced ? 'linear' : easeOut }}>
        <motion.div className="hero-copy" style={{ y: textY, opacity: textOpacity }}>
          <motion.p className="eyebrow" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.45, ease: reduced ? 'linear' : 'easeOut' }}><i className="bi bi-lightning-charge"></i> Ferienfahrschule in Kleve</motion.p>
          <h1 aria-label="Fahren lernen. Schnell. Sicher. Strukturiert.">
            <motion.span initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.08, ease: reduced ? 'linear' : easeOut }}>Fahren lernen.</motion.span>
            <motion.span initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.135, ease: reduced ? 'linear' : easeOut }}> Schnell.</motion.span>
            <motion.span initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.19, ease: reduced ? 'linear' : easeOut }}> Sicher.</motion.span>
            <motion.span initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.245, ease: reduced ? 'linear' : easeOut }}> Strukturiert.</motion.span>
          </h1>
          <motion.div className="headline-underline" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.3, ease: 'easeOut' }}></motion.div>
          <motion.p className="hero-intro" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.45, delay: reduced ? 0 : 0.2 }}>Seit 2007 setzen wir in unserer Fahrschule in Kleve auf kleine Gruppen, individuelle Betreuung und moderne Fahrzeuge.</motion.p>
          <motion.div className="button-row" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.4, delay: reduced ? 0 : 0.32 }}>
            <motion.a className="button button-primary hero-primary" href="#kontakt" whileHover={reduced ? undefined : { scale: 1.04, y: -2, backgroundColor: '#FFD43B', boxShadow: '0 12px 28px rgba(255,198,10,0.38)' }} whileTap={reduced ? undefined : { scale: 0.97 }} transition={{ type: 'spring', stiffness: 420, damping: 24, mass: 0.7 }}><i className="bi bi-lightning-charge"></i> Jetzt anfragen <i className="bi bi-arrow-right"></i></motion.a>
            <motion.a className="button button-secondary" href="#kurse" whileHover={reduced ? undefined : { scale: 1.025, y: -2, borderColor: '#2DBE60', backgroundColor: 'rgba(45,190,96,0.08)' }} whileTap={reduced ? undefined : { scale: 0.97 }}><i className="bi bi-steering-wheel"></i> Mehr erfahren</motion.a>
          </motion.div>
        </motion.div>
        <motion.div className="hero-visual" initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} whileHover={reduced ? undefined : { x: [2, -2, 2], y: -3, scale: 1.015, borderColor: 'rgba(255,198,10,0.95)', boxShadow: '0 24px 60px rgba(255,198,10,0.24)' }} transition={{ duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : 0.18, ease: reduced ? 'linear' : easeOut }} style={{ y: imageY }}>
          <motion.div className="hero-image-clip" initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: 'ellipse(34% 40% at 58% 52%)', scale: 1.05 }} animate={{ opacity: 1, clipPath: 'ellipse(56% 58% at 50% 50%)', scale: 1 }} transition={{ duration: reduced ? 0.2 : 0.8, ease: reduced ? 'linear' : easeOut }}>
            <SafeImage src="https://ferienfahrschule-ritterbex.de/wp-content/uploads/2026/04/Fahrzeug-2-1-1024x642.jpg" alt="Ein Fahrzeug der Ferienfahrschule Ritterbex GmbH" className="hero-image" />
          </motion.div>
          <span className="visual-badge"><i className="bi bi-shield-check"></i> Persönlich begleitet</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text, icon }) {
  return (
    <motion.header className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
      <p className="eyebrow"><i className={`bi ${icon}`}></i> {eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.header>
  );
}

function StepCard({ number, icon, title, text }) {
  const reduced = useReducedMotion();
  return (
    <motion.article className="step-card" variants={fadeUp} whileHover={reduced ? undefined : { y: -7, scale: 1.018, borderColor: 'rgba(255,198,10,0.85)', backgroundColor: '#FFFDF4', boxShadow: '0 18px 38px rgba(255,198,10,0.18)' }} transition={{ duration: 0.28, ease: 'easeOut' }}>
      <span className="step-number">{number}</span>
      <motion.i className={`bi ${icon} step-icon`} whileHover={reduced ? undefined : { y: -3, rotate: -6, scale: 1.12 }}></motion.i>
      <h3>{title}</h3><p>{text}</p>
    </motion.article>
  );
}

function HolidayLogic({ detailed = false }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useTransform(scrollYProgress, [0.1, 0.85], [reduced ? 1 : 0, 1]);
  return (
    <section className={`section timeline-section ${detailed ? 'detailed-road' : ''}`} ref={ref}>
      <div className="container container-1200">
        <SectionHeading eyebrow={detailed ? 'Kurse & Ablauf' : 'Unsere Ferienlogik'} title={detailed ? 'Der Weg zum Führerschein' : 'Eine klare Strecke in vier Etappen'} text="Struktur macht den Weg übersichtlich und gibt dir von Anfang an Orientierung." icon={detailed ? 'bi-map' : 'bi-flag'} />
        <div className="road-wrap">
          <div className="road-base" aria-hidden="true"></div><motion.div className="road-progress" aria-hidden="true" style={{ scaleX: progress }}></motion.div>
          <motion.div className="steps-grid" initial="hidden" whileInView="visible" viewport={viewport} transition={{ staggerChildren: reduced ? 0 : detailed ? 0.11 : 0.1 }}>
            <StepCard number="01" icon={detailed ? 'bi-1-circle' : 'bi-flag'} title="Anmeldung" text="Wir besprechen deinen Weg persönlich und klären, welche Führerscheinklasse zu dir passt." />
            <StepCard number="02" icon={detailed ? 'bi-2-circle' : 'bi-journal-check'} title="Theorie" text="Strukturierter Unterricht bereitet dich verständlich auf die theoretische Prüfung vor." />
            <StepCard number="03" icon={detailed ? 'bi-3-circle' : 'bi-car-front'} title="Praxis" text="Mit individueller Unterstützung sammelst du Fahrpraxis und entwickelst Sicherheit." />
            <StepCard number="04" icon={detailed ? 'bi-4-circle' : 'bi-patch-check'} title="Prüfung" text="Gemeinsam arbeitest du auf deine Prüfungen und deinen Führerschein hin." />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LocationIntro() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -8, reduced ? 0 : 8]);
  return (
    <section className="section location-intro" ref={ref}>
      <div className="location-blob" aria-hidden="true"></div>
      <div className="container container-1200 split-grid">
        <motion.div className="collage" initial={reduced ? { opacity: 0 } : { opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} whileHover={reduced ? undefined : { y: -5, scale: 1.012, borderColor: 'rgba(255,198,10,0.72)', boxShadow: '0 24px 52px rgba(47,52,55,0.18)' }} transition={{ duration: reduced ? 0.2 : 0.65, ease: reduced ? 'linear' : easeOut }}>
          <motion.div style={{ y: imageY }} className="location-image-reveal" initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0 round 18px)' }} whileInView={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0 round 18px)' }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.7, ease: reduced ? 'linear' : easeOut }}>
            <SafeImage src="https://ferienfahrschule-ritterbex.de/wp-content/uploads/2026/04/Laden-2.png" alt="Büro der Ferienfahrschule Ritterbex" className="location-image" />
          </motion.div>
          <motion.div className="overlap-card" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, rotate: 2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.2 }}><i className="bi bi-door-open"></i><strong>Mitten in Kleve</strong><span>Gut erreichbar mit Bus und Bahn.</span></motion.div>
        </motion.div>
        <motion.div className="location-copy" initial={reduced ? { opacity: 0 } : { opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.65, delay: reduced ? 0 : 0.08, ease: reduced ? 'linear' : easeOut }}>
          <p className="eyebrow"><i className="bi bi-geo-alt"></i> Standort &amp; Räume</p><h2>Ein Blick in unser Büro</h2>
          <p>Du findest uns zentral am Brücktor 7-9 in Kleve, nur wenige Gehminuten vom Bahnhof entfernt.</p>
          <div className="detail-list"><div><i className="bi bi-geo-alt"></i><span><strong>Adresse</strong>Dieter Ritterbex Ferienfahrschule GmbH<br />Brücktor 7-9, 47533 Kleve</span></div><div><i className="bi bi-door-open"></i><span><strong>Anmeldung</strong>Komm vorbei oder frage vorab persönlich bei uns an.</span></div></div>
          <motion.a className="button button-dark" href="#standort" whileHover={reduced ? undefined : { y: -2, scale: 1.035, backgroundColor: '#222628', boxShadow: '0 12px 26px rgba(45,190,96,0.24)' }} whileTap={reduced ? undefined : { scale: 0.97 }}>Standort ansehen <i className="bi bi-arrow-right"></i></motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function VehicleFeature() {
  const reduced = useReducedMotion();
  return (
    <section className="section vehicle-feature">
      <div className="container container-960">
        <SectionHeading eyebrow="Fahrzeuge" title="Sicher unterwegs" text="Moderne, gepflegte Fahrzeuge sorgen für eine angenehme und komfortable Lernumgebung." icon="bi-car-front" />
        <motion.article className="vehicle-card" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.25 }} whileHover={reduced ? undefined : { y: -8, scale: 1.018, borderColor: '#2DBE60', boxShadow: '0 24px 54px rgba(45,190,96,0.20)' }} transition={{ duration: reduced ? 0.2 : 0.6, ease: reduced ? 'linear' : easeOut }}>
          <div className="vehicle-media"><motion.div whileHover={reduced ? undefined : { scale: 1.075, x: 4, filter: 'brightness(1.03) saturate(1.07)' }} transition={{ duration: 0.5 }}><SafeImage src="https://ferienfahrschule-ritterbex.de/wp-content/uploads/2026/04/Fahrzeug-2-1-1024x642.jpg" alt="Fahrzeug der Ferienfahrschule Ritterbex" className="vehicle-image" /></motion.div></div>
          <motion.div className="vehicle-caption" initial={{ opacity: 0, y: reduced ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.4, delay: reduced ? 0 : 0.18 }}><div><i className="bi bi-shield-check"></i><span><strong>Modern, gepflegt, komfortabel</strong>Ein freundlicher Begleiter auf deinem Weg zum Führerschein.</span></div><a href="#fahrzeuge" aria-label="Mehr über unsere Fahrzeuge">Mehr ansehen <i className="bi bi-arrow-right"></i></a></motion.div>
        </motion.article>
      </div>
    </section>
  );
}

function NewsCard({ label, title, text }) {
  const reduced = useReducedMotion();
  return (
    <motion.article className="news-card" variants={fadeUp} whileHover={reduced ? undefined : { y: -6, scale: 1.015, backgroundColor: '#FFFDF4', borderColor: 'rgba(255,198,10,0.75)', boxShadow: '0 18px 36px rgba(47,52,55,0.14)' }} transition={{ duration: 0.26 }}>
      <div className="news-meta"><span><i className="bi bi-calendar-event"></i> Hinweis</span><em>{label}</em></div><i className="bi bi-megaphone news-icon"></i><h3>{title}</h3><p>{text}</p>
    </motion.article>
  );
}

function News({ all = false }) {
  const reduced = useReducedMotion();
  return (
    <section className={`section news-section ${all ? 'all-news' : ''}`}>
      <div className="container container-1200">
        <SectionHeading eyebrow="Aktuelles" title={all ? 'Alle Beiträge' : 'News & Hinweise'} text="Wichtige Themen rund um deinen Weg zum Führerschein auf einen Blick." icon="bi-megaphone" />
        <div className="dash-divider" aria-hidden="true"></div>
        <motion.div className="news-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ staggerChildren: reduced ? 0 : 0.09 }}>
          <NewsCard label="B196" title="Die Schlüsselzahl für deine Freiheit lautet B196" text="Entdecke den Einstieg in die Welt auf zwei Rädern und sprich mit uns über deinen Weg." />
          <NewsCard label="Führerscheinklassen" title="Deine Klasse, dein Weg" text="Von Auto über Motorrad bis Anhänger bieten wir verschiedene Führerscheinklassen an." />
          <NewsCard label="Beratung" title="Bereit loszufahren?" text="Melde dich an oder ruf uns an. Wir beraten dich gerne persönlich zu deinem Führerschein in Kleve." />
        </motion.div>
        {!all ? <motion.a className="button button-secondary centered-button" href="#aktuelles" whileHover={reduced ? undefined : { scale: 1.035, y: -2, borderColor: '#FFC60A', backgroundColor: 'rgba(255,198,10,0.14)', boxShadow: '0 10px 22px rgba(255,198,10,0.18)' }} whileTap={reduced ? undefined : { scale: 0.97 }}>Alle Beiträge <i className="bi bi-arrow-right"></i></motion.a> : null}
      </div>
    </section>
  );
}

function FAQItem({ question, answer, open, onClick }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={`faq-item ${open ? 'open' : ''}`} variants={fadeUp}>
      <motion.button type="button" className="faq-trigger" onClick={onClick} aria-expanded={open} whileHover={reduced ? undefined : { x: 4, scale: 1.005, backgroundColor: 'rgba(255,198,10,0.10)', boxShadow: 'inset 3px 0 0 #FFC60A' }} whileTap={reduced ? undefined : { scale: 0.99 }}><span><i className="bi bi-question-circle"></i>{question}</span><motion.i className="bi bi-caret-down-fill" animate={reduced ? undefined : { rotate: open ? 180 : 0, scale: open ? 1.08 : 1 }} transition={{ duration: 0.28, ease: easeOut }}></motion.i></motion.button>
      <AnimatePresence initial={false}>
        {open ? <motion.div className="faq-answer" initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0, y: -6 }} animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0, y: -6 }} transition={{ duration: reduced ? 0 : 0.3, ease: easeOut }}><p>{answer}</p></motion.div> : null}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section className="section faq-section"><div className="container container-960"><SectionHeading eyebrow="FAQ" title="Häufige Fragen" text="Die wichtigsten Grundlagen kurz erklärt." icon="bi-question-circle" /><motion.div className="faq-list" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ staggerChildren: reduced ? 0 : 0.065 }}>
      <FAQItem question="Welche Führerscheinklassen bietet ihr an?" answer="Wir bieten die Klassen B, BF 17, B197, Mofa, B196, A1, A2, A, B96 und BE an." open={open === 0} onClick={() => setOpen(open === 0 ? -1 : 0)} />
      <FAQItem question="Wo finde ich die Fahrschule?" answer="Du findest uns am Brücktor 7-9 in 47533 Kleve, nur wenige Gehminuten vom Bahnhof entfernt." open={open === 1} onClick={() => setOpen(open === 1 ? -1 : 1)} />
      <FAQItem question="Unterstützt ihr auch bei Sprachproblemen?" answer="Ja. Wir unterstützen Fahrschüler bei Sprachproblemen professionell und kompetent. Wir sprechen auch Englisch." open={open === 2} onClick={() => setOpen(open === 2 ? -1 : 2)} />
    </motion.div></div></section>
  );
}

function CTABand() {
  const reduced = useReducedMotion();
  return (
    <section className="section cta-section"><motion.div className="container container-1200 cta-band" initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: 0.96 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true, amount: 0.3 }} whileHover={reduced ? undefined : { y: -3, borderColor: 'rgba(255,198,10,0.65)', backgroundColor: '#292E31', boxShadow: '0 20px 44px rgba(47,52,55,0.26)' }} transition={{ duration: reduced ? 0.2 : 0.5, ease: reduced ? 'linear' : easeOut }}>
      <motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ delay: reduced ? 0 : 0.1 }}><p className="eyebrow inverted"><i className="bi bi-envelope-paper"></i> Jetzt anfragen</p><h2>Bereit loszufahren?</h2><p>Melde dich jetzt an oder ruf uns an. Wir beraten dich gerne persönlich.</p></motion.div>
      <motion.a className="button button-primary cta-button" href="#kontakt" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewport} whileHover={reduced ? undefined : { scale: 1.045, y: -2, backgroundColor: '#FFD43B', boxShadow: '0 0 0 5px rgba(255,198,10,0.16), 0 14px 34px rgba(255,198,10,0.38)' }} whileTap={reduced ? undefined : { scale: 0.97 }} transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 360, damping: 20, mass: 0.8, delay: 0.18 }}><i className="bi bi-envelope-paper"></i> Unverbindlich anfragen <i className="bi bi-arrow-right"></i></motion.a>
    </motion.div></section>
  );
}

function CourseHero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -6, reduced ? 0 : 8]);
  return (
    <section id="kurse" className="section course-hero" ref={ref}><div className="container container-1200 split-grid">
      <motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.55, ease: reduced ? 'linear' : easeOut }}><p className="eyebrow"><i className="bi bi-map"></i> Kurse &amp; Ablauf</p><h2>Was bedeutet Ferienfahrschule?</h2><div className="headline-underline short"></div><p>Wenn der Führerschein so schnell wie möglich her soll, begleiten wir dich mit strukturierten Kursen und individueller Betreuung.</p><p>Gemeinsam klären wir Erwartungen und deinen persönlichen Weg – verständlich, direkt und auf Augenhöhe.</p><motion.a className="button button-primary" href="#kontakt" whileHover={reduced ? undefined : { scale: 1.035, y: -2, backgroundColor: '#FFD43B', boxShadow: '0 12px 28px rgba(255,198,10,0.36)' }} whileTap={reduced ? undefined : { scale: 0.97 }}><i className="bi bi-flag"></i> Persönlich beraten lassen</motion.a></motion.div>
      <motion.div className="course-visual" style={{ y }} initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.97 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={viewport} whileHover={reduced ? undefined : { y: -6, scale: 1.018, borderColor: '#FFC60A', backgroundColor: '#FFFDF4', boxShadow: '0 22px 46px rgba(255,198,10,0.18)' }} transition={{ duration: reduced ? 0.2 : 0.65, delay: reduced ? 0 : 0.08, ease: reduced ? 'linear' : easeOut }}><motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.04, clipPath: 'inset(8% 8% 8% 8% round 24px)' }} whileInView={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)' }} viewport={viewport} whileHover={reduced ? undefined : { scale: 1.055, y: -3, filter: 'saturate(1.05)' }} transition={{ duration: reduced ? 0.2 : 0.7 }}><SafeImage src="https://ferienfahrschule-ritterbex.de/wp-content/themes/niederrhein-morgenlicht/assets/design-preview-3-hero.png" alt="Fahrzeug der Ferienfahrschule Ritterbex" className="course-image" /></motion.div></motion.div>
    </div></section>
  );
}

function Gallery() {
  const reduced = useReducedMotion();
  return (
    <section id="fahrzeuge" className="section gallery-section"><div className="container container-960"><SectionHeading eyebrow="Galerie" title="Unsere Fahrzeuge" text="Sauber, modern und freundlich – ein angenehmer Ort zum Lernen." icon="bi-images" />
      <motion.div className="gallery-frame" tabIndex="0" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewport} whileHover={reduced ? undefined : { y: -6, scale: 1.012, borderColor: '#2DBE60', boxShadow: '0 24px 56px rgba(45,190,96,0.18)' }} transition={{ duration: reduced ? 0.2 : 0.65, ease: reduced ? 'linear' : easeOut }}>
        <motion.div drag={reduced ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={reduced ? 0 : 0.08} whileDrag={reduced ? undefined : { scale: 0.985 }} whileHover={reduced ? undefined : { scale: 1.065, y: -2, filter: 'saturate(1.06)' }} transition={{ duration: 0.5 }}><SafeImage src="https://ferienfahrschule-ritterbex.de/wp-content/uploads/2026/04/Fahrzeug-2-1-1024x642.jpg" alt="Weißes Fahrschulfahrzeug der Ferienfahrschule Ritterbex" className="gallery-image" /></motion.div>
        <div className="gallery-caption"><span><i className="bi bi-car-front"></i><strong>Unser Fahrschulfahrzeug</strong></span><span className="gallery-indicator" aria-label="Bild 1 von 1"></span></div>
      </motion.div>
    </div></section>
  );
}

function LocationGallery() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const leftY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -6, reduced ? 0 : 8]);
  const rightY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 8, reduced ? 0 : -6]);
  return (
    <section id="standort" className="section location-gallery" ref={ref}><div className="container container-1200"><SectionHeading eyebrow="Standort" title="Büro & Anmeldung" text="Komm vorbei oder frage uns vorab an – wir beraten dich gerne persönlich." icon="bi-geo-alt" /><div className="photo-grid">
      <motion.article className="photo-card" initial={reduced ? { opacity: 0 } : { opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} whileHover={reduced ? undefined : { y: -7, scale: 1.016, borderColor: 'rgba(255,198,10,0.82)', backgroundColor: '#FFFDF5', boxShadow: '0 22px 46px rgba(47,52,55,0.17)' }} transition={{ duration: reduced ? 0.2 : 0.6, ease: reduced ? 'linear' : easeOut }}><motion.div style={{ y: leftY }} initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0 round 10px)' }} whileInView={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0 round 10px)' }} viewport={viewport} transition={{ duration: reduced ? 0.2 : 0.7 }}><SafeImage src="https://ferienfahrschule-ritterbex.de/wp-content/uploads/2026/04/Laden-1.png" alt="Außenansicht der Ferienfahrschule Ritterbex" className="photo-image" /></motion.div><div className="photo-caption"><i className="bi bi-geo-alt"></i><span><strong>Mitten in Kleve</strong>Brücktor 7-9, 47533 Kleve</span></div></motion.article>
      <motion.article className="photo-card alternate" initial={reduced ? { opacity: 0 } : { opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} whileHover={reduced ? undefined : { y: -7, scale: 1.016, borderColor: 'rgba(255,198,10,0.82)', backgroundColor: '#FFFDF5', boxShadow: '0 22px 46px rgba(47,52,55,0.17)' }} transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.1, ease: reduced ? 'linear' : easeOut }}><motion.div style={{ y: rightY }}><div className="office-fallback"><i className="bi bi-people"></i><strong>Persönliche Beratung</strong><span>Freundlich, kompetent und auf Augenhöhe.</span></div></motion.div><div className="photo-caption"><i className="bi bi-people"></i><span><strong>Anmeldung & Beratung</strong>Komm vorbei oder schreibe uns.</span></div></motion.article>
    </div><motion.a className="button button-dark centered-button" href="#kontakt" whileHover={reduced ? undefined : { scale: 1.035, y: -2, backgroundColor: '#25292B', borderColor: '#2DBE60', boxShadow: '0 12px 26px rgba(45,190,96,0.22)' }} whileTap={reduced ? undefined : { scale: 0.97 }}>Kontakt aufnehmen <i className="bi bi-arrow-right"></i></motion.a></div></section>
  );
}

function Contact() {
  const reduced = useReducedMotion();
  return (
    <section id="kontakt" className="section contact-section"><div className="container container-960 contact-grid">
      <motion.div className="contact-details" initial={reduced ? { opacity: 0 } : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduced ? 0.2 : 0.55, ease: reduced ? 'linear' : easeOut }}><p className="eyebrow"><i className="bi bi-envelope-paper-heart"></i> Kontakt</p><h2>Lass uns über deinen Weg sprechen.</h2><p>Schreibe uns, ruf an oder komm in unserer Fahrschule in Kleve vorbei.</p>
        <motion.a className="contact-item" href="https://wa.me/4928216696154" target="_blank" rel="noreferrer" whileHover={reduced ? undefined : { x: 4, backgroundColor: 'rgba(255,198,10,0.10)', borderColor: 'rgba(255,198,10,0.55)', boxShadow: '0 7px 16px rgba(47,52,55,0.06)' }}><i className="bi bi-whatsapp"></i><span><strong>WhatsApp</strong>Schreib mit uns</span></motion.a>
        <motion.a className="contact-item" href="tel:4928216696154" whileHover={reduced ? undefined : { x: 4, backgroundColor: 'rgba(255,198,10,0.10)', borderColor: 'rgba(255,198,10,0.55)', boxShadow: '0 7px 16px rgba(47,52,55,0.06)' }}><i className="bi bi-telephone"></i><span><strong>Telefon</strong>02821 / 6696154</span></motion.a>
        <motion.a className="contact-item" href="mailto:d.ritterbex@web.de" whileHover={reduced ? undefined : { x: 4, backgroundColor: 'rgba(255,198,10,0.10)', borderColor: 'rgba(255,198,10,0.55)', boxShadow: '0 7px 16px rgba(47,52,55,0.06)' }}><i className="bi bi-envelope"></i><span><strong>E-Mail</strong>d.ritterbex@web.de</span></motion.a>
      </motion.div>
      <motion.form className="contact-form" action="mailto:d.ritterbex@web.de" method="post" encType="text/plain" initial={reduced ? { opacity: 0 } : { opacity: 0, x: 28, scale: 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }} whileHover={reduced ? undefined : { y: -4, scale: 1.008, borderColor: 'rgba(255,198,10,0.62)', backgroundColor: '#FFFDF7', boxShadow: '0 20px 44px rgba(47,52,55,0.15)' }} transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.08, ease: reduced ? 'linear' : easeOut }}>
        <div className="field-row"><label>Name<input type="text" name="Name" autoComplete="name" required /></label><label>E-Mail<input type="email" name="E-Mail" autoComplete="email" required /></label></div>
        <label>Telefon<input type="tel" name="Telefon" autoComplete="tel" /></label><label>Nachricht<textarea name="Nachricht" rows="5" required></textarea></label>
        <label className="checkbox-label"><input type="checkbox" required /><span>Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden.</span></label>
        <motion.button type="submit" className="button button-primary submit-button" whileHover={reduced ? undefined : { scale: 1.04, y: -2, backgroundColor: '#FFD43B', borderColor: '#2DBE60', boxShadow: '0 13px 30px rgba(255,198,10,0.38)' }} whileTap={reduced ? undefined : { scale: 0.97 }} transition={{ type: 'spring', stiffness: 420, damping: 24, mass: 0.7 }}>Anfrage senden <i className="bi bi-send"></i></motion.button>
      </motion.form>
    </div></section>
  );
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><strong>Dieter Ritterbex Ferienfahrschule GmbH</strong><span>Brücktor 7-9 · 47533 Kleve</span></div><div className="footer-links"><a href="tel:4928216696154">Anrufen</a><a href="https://wa.me/4928216696154" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.instagram.com/ferienfahrschuleritterbex/" target="_blank" rel="noreferrer">Instagram</a></div></div></footer>;
}

export default function App() {
  return (
    <><Navigation /><main id="main"><Hero /><HolidayLogic /><LocationIntro /><VehicleFeature /><News /><FAQ /><CTABand /><CourseHero /><HolidayLogic detailed /><Gallery /><LocationGallery /><div id="aktuelles"><News all /></div><Contact /></main><Footer /></>
  );
}
