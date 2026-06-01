/* ============================================================
   LP-VIP CONSTRUTORA — Sections
   ============================================================ */

/* ----- Header ----- */
const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <Container>
        <div className="header-inner">
          <a href="#" className="header-logo" aria-label="VIP Construtora">
            <img src="assets/LOGO-COR02-VIP.png" alt="VIP Construtora" style={{ height: "100px", objectFit: "cover", width: "120px" }} />
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="header-phone">
            <span className="ic"><LpIcon.whatsapp size={18} /></span>
            <span className="header-phone-text">
              <small>Fale com a gente</small>
              <strong>(88) 99260-0715</strong>
            </span>
          </a>
        </div>
      </Container>
    </header>);
};

/* ----- Founders ----- */
const FOUNDERS = [
  { photo: "assets/germano.png", name: "Germano", role: "Sócio-fundador", pos: "center 28%" },
  { photo: "assets/vivian.png", name: "Vivian", role: "Sócia-fundadora", pos: "center 18%" },
];

const Founders = () => (
  <div className="founders">
    {FOUNDERS.map((f) => (
      <figure key={f.name} className="founder-card">
        <figcaption className="founder-name">{f.name}</figcaption>
        <div className="founder-photo">
          <img src={f.photo} alt={`${f.name}, ${f.role} da VIP Construtora`} style={{ objectPosition: f.pos }} />
        </div>
        <span className="founder-role">{f.role}</span>
      </figure>
    ))}
  </div>
);

/* ----- Hero ----- */
const Hero = () =>
  <section className="hero" data-screen-label="01 Hero">
    <div className="hero-photo">
      <img src="assets/hero-bg.png" alt="Fachada de uma casa moderna entregue pela VIP Construtora" />
    </div>
    <Container>
      <div className="hero-inner">
        <div className="hero-body">
          <h1 className="hero-headline">
            A casa própria que você sempre quis está <em>mais perto</em> do que você imagina.
          </h1>
          <div className="hero-ctas">
            <WAButton>Quero realizar meu sonho</WAButton>
          </div>
        </div>
        <Founders />
      </div>
    </Container>
  </section>;

/* ----- Video carousel (reusable) ----- */
const VideoCarousel = ({ items }) => {
  const scrollerRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const updateNav = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    const cards = el.querySelectorAll(".delivery-card");
    if (cards.length) {
      const cardW = cards[0].getBoundingClientRect().width + 22;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.min(items.length - 1, Math.max(0, idx)));
    }
  }, [items.length]);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateNav();
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".delivery-card");
    if (!cards.length) return;
    const cardW = cards[0].getBoundingClientRect().width + 22;
    el.scrollBy({ left: dir * cardW, behavior: "smooth" });
  };

  const goToIdx = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".delivery-card");
    if (!cards[i]) return;
    const cardW = cards[0].getBoundingClientRect().width + 22;
    el.scrollTo({ left: i * cardW, behavior: "smooth" });
  };

  return (
    <div className="vcar">
      <div className="vcar-nav">
        <button className={"car-btn" + (canPrev ? "" : " is-disabled")} onClick={() => scrollByCard(-1)} aria-label="Vídeo anterior" disabled={!canPrev}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button className={"car-btn" + (canNext ? "" : " is-disabled")} onClick={() => scrollByCard(1)} aria-label="Próximo vídeo" disabled={!canNext}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>

      <div className="deliveries-scroller" ref={scrollerRef}>
        {items.map((d, i) =>
          <article key={i} className="delivery-card">
            <div className="delivery-thumb">
              <img src={d.poster} alt={`Entrega — ${d.family}`} />
              <button className="delivery-play" aria-label={`Assistir entrega da ${d.family}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </button>
              <span className="delivery-duration">{d.duration}</span>
              <span className="delivery-tag">Vídeo</span>
            </div>
            <div className="delivery-meta">
              <strong>{d.family}</strong>
              <span className="delivery-city"><LpIcon.pin size={13} /> {d.city}</span>
              <span className="delivery-project">{d.project}</span>
            </div>
          </article>
        )}
      </div>

      <div className="deliveries-dots" role="tablist" aria-label="Selecionar vídeo">
        {items.map((_, i) =>
          <button key={i} className={"car-dot" + (i === activeIdx ? " is-active" : "")} onClick={() => goToIdx(i)} aria-label={`Ir para vídeo ${i + 1}`} role="tab" aria-selected={i === activeIdx} />
        )}
      </div>
    </div>
  );
};

/* ----- Solution / How it works (title + text + video carousel) ----- */
const DELIVERIES = [
  { poster: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=80", family: "Família Souza", city: "Quixeramobim — CE", project: "Casa entregue em Mar/2025", duration: "1:24" },
  { poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80", family: "Família Ferreira", city: "Senador Pompeu — CE", project: "Casa entregue em Nov/2024", duration: "2:08" },
  { poster: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=900&q=80", family: "Família Lima", city: "Boa Viagem — CE", project: "Casa entregue em Ago/2024", duration: "1:47" },
  { poster: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80", family: "Família Santos", city: "Mombaça — CE", project: "Casa entregue em Mai/2024", duration: "2:32" },
  { poster: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80", family: "Família Oliveira", city: "Banabuiú — CE", project: "Casa entregue em Fev/2024", duration: "1:58" },
  { poster: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=900&q=80", family: "Família Costa", city: "Quixeramobim — CE", project: "Casa entregue em Out/2023", duration: "2:15" },
];

const Solution = () =>
  <section className="solution" id="como-funciona" data-screen-label="02 Como funciona">
    <Container>
      <div className="solution-head">
        <Eyebrow onDark>Como a gente trabalha</Eyebrow>
        <h2 className="h2">A gente não vende obra. A gente <em>realiza sonhos.</em></h2>
        <p className="lead">
          Cuidamos do processo, da documentação, do financiamento e da obra — pra que você só precise se preocupar em escolher onde vai colocar o seu sofá.
        </p>
      </div>
      <VideoCarousel items={DELIVERIES} />
    </Container>
  </section>;

/* ----- Testimonials ----- */
const TESTIMONIALS = [
{
  text: "Eu achei que nunca ia conseguir ter minha casa. Mas o atendimento foi tão humano que eu fui me tranquilizando. Hoje tenho o meu cantinho e não troco por nada.",
  name: "Maria das Dores",
  city: "Quixeramobim — CE",
  initials: "MD"
},
{
  text: "Eles explicaram tudo direitinho, sem pressão. Fui atendido como se fosse da família. Não esperava tanta atenção pra quem tava começando do zero.",
  name: "José Ferreira",
  city: "Senador Pompeu — CE",
  initials: "JF"
},
{
  text: "Minha família inteira ficou feliz quando a gente mudou. Vale cada esforço. E foi mais fácil do que eu imaginava — eu adiei isso por anos à toa.",
  name: "Ana Lúcia Souza",
  city: "Boa Viagem — CE",
  initials: "AS"
}];

const Testimonials = () =>
  <section className="testimonials" data-screen-label="03 Depoimentos">
    <Container>
      <div className="testimonials-head">
        <div>
          <Eyebrow>Histórias reais</Eyebrow>
          <h2 className="h2">Famílias da região <em>já têm a chave na mão.</em></h2>
        </div>
        <div className="testimonials-headline-stat">
          <div className="n"><span className="star">✱</span>+200</div>
          <div className="l">famílias da região já realizaram o sonho da casa própria com a gente.</div>
        </div>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) =>
          <div key={i} className="testi">
            <div className="testi-quote-mark">“</div>
            <p className="testi-text">{t.text}</p>
            <Stars5 />
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div className="testi-meta">
                <strong>{t.name}</strong>
                <span>{t.city}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  </section>;

/* ----- Footer ----- */
const Footer = () =>
  <footer className="site-footer" data-screen-label="04 Rodapé">
    <Container>
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="assets/logo-white.png" alt="VIP Construtora" />
          <p>
            Construtora regional do interior do Ceará. Realizando o sonho da casa própria com atendimento humano, honesto e sem pressão.
          </p>
        </div>
        <div className="footer-col">
          <h5>Fale com a gente</h5>
          <ul>
            <li><span className="ic"><LpIcon.whatsapp size={14} /></span><a href={WA_LINK} target="_blank" rel="noopener noreferrer">(88) 99260-0715</a></li>
            <li><span className="ic"><LpIcon.mail size={14} /></span><a href="mailto:contato@vipconstrutora.com.br">contato@vipconstrutora.com.br</a></li>
            <li><span className="ic"><LpIcon.instagram size={14} /></span><a href="https://instagram.com/vipconstrutora_" target="_blank" rel="noopener noreferrer">@vipconstrutora_</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Atendemos</h5>
          <ul>
            <li><span className="ic"><LpIcon.pin size={14} /></span>Quixeramobim — CE</li>
            <li><span className="ic"><LpIcon.pin size={14} /></span>Senador Pompeu — CE</li>
            <li><span className="ic"><LpIcon.pin size={14} /></span>Boa Viagem · Mombaça · Banabuiú</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 VIP Construtora · Todos os direitos reservados.</span>
        <span>CNPJ 00.000.000/0001-00</span>
      </div>
    </Container>
  </footer>;

/* ----- Floating WhatsApp ----- */
const FloatingWA = () =>
  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="fab-wa" aria-label="Falar no WhatsApp">
    <span className="fab-wa-pulse" aria-hidden="true"></span>
    <span className="fab-wa-ic"><LpIcon.whatsapp size={22} /></span>
    <span className="fab-wa-text">
      <small>Vem conversar</small>
      <strong>WhatsApp</strong>
    </span>
  </a>;

Object.assign(window, {
  Header, Hero, Founders, VideoCarousel, Solution,
  Testimonials, Footer, FloatingWA
});
