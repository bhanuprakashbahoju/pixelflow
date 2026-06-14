// Page sections
const { useEffect: uE, useRef: uR, useState: uS } = React;

// ---------- Brand mark ----------
function BrandMark() {
  return (
    <span className="mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <rect className="a" x="2" y="2" width="9" height="9" rx="1.5" />
        <rect className="a" x="2" y="13" width="9" height="9" rx="1.5" />
        <rect className="b" x="13" y="2" width="9" height="9" rx="1.5" />
        <rect className="a" x="13" y="13" width="9" height="9" rx="1.5" />
      </svg>
    </span>
  );
}

// ---------- Nav ----------
function Nav() {
  const [scrolled, setScrolled] = uS(false);
  uE(() => {
    const on = () => setScrolled(window.scrollY > 32);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand">
        <BrandMark />
        <span className="name">PixelFlow<em> ⁄ Solutions</em></span>
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#studio">Studio</a>
      </div>
      <a href="#contact" className="nav-cta">
        Start a project
        <svg className="arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </a>
    </nav>
  );
}

// ---------- Hero ----------
function Hero() {
  const heroRef = uR(null);
  uE(() => {
    const id = setTimeout(() => heroRef.current && heroRef.current.classList.add("is-in"), 60);
    return () => clearTimeout(id);
  }, []);
  const ctaRef = useMagnetic(0.25);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="hero-meta">
        <div className="left">
          <span className="eyebrow"><span className="pulse" />Available · Q3 ⁄ 2026 — two slots</span>
        </div>
        <div className="right">
          <span className="eyebrow"><span className="dot" />Studio ⁄ Est. 2018</span>
        </div>
      </div>

      <h1>
        <SplitWords baseDelay={0} text="We engineer" />
        <SplitWords baseDelay={2} text="software that" />
        <span className="line">
          <span className="word serif" style={{ "--i": 4 }}>moves&nbsp;</span>
          <span className="word" style={{ "--i": 5 }}>like&nbsp;</span>
          <span className="word" style={{ "--i": 6 }}>it&nbsp;</span>
          <span className="word" style={{ "--i": 7 }}>thinks.</span>
        </span>
      </h1>

      <div className="hero-sub">
        <p className="lede">
          PixelFlow is a London product studio building interfaces,
          platforms and brand systems for ambitious teams — <span className="em">from Series-A start-ups to FTSE estates.</span>
        </p>
        <div className="actions">
          <a href="#work" className="ghost-link">
            See selected work
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
          </a>
          <div style={{ display: "inline-block" }}>
            <a href="#contact" className="cta" ref={ctaRef}>
              <svg className="arc" viewBox="0 0 200 200">
                <defs>
                  <path id="arcpath" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                </defs>
                <text>
                  <textPath href="#arcpath" startOffset="0">
                    Start a project • Start a project • Start a project •&nbsp;
                  </textPath>
                </text>
              </svg>
              <span className="inner">
                <svg className="arrow-big" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <span className="scroll-cue">Scroll</span>
    </header>
  );
}

// ---------- Marquee ----------
function Marquee() {
  const items = [
    { t: "Product engineering" },
    { t: "Design systems" },
    { t: "AI integration", em: true },
    { t: "Interaction design" },
    { t: "Brand systems" },
    { t: "Platform architecture" },
    { t: "Motion & 3D", em: true },
  ];

  const sequence = [...items, ...items];
  return (
    <div className="marquee" id="services-top">
      <div className="marquee-track">
        {sequence.map((it, i) =>
          <span key={i} className="marquee-item">
            <span className={it.em ? "serif" : ""}>{it.t}</span>
            <span className="sep" />
          </span>
        )}
      </div>
    </div>
  );
}

// ---------- Services ----------
const SERVICES = [
  {
    n: "01",
    name: "Product engineering",
    desc: "Full-stack web and mobile builds — from greenfield MVPs to platform replatforms. TypeScript everywhere, observable from day one.",
    tags: ["React", "Next.js", "Swift", "Kotlin", "tRPC"]
  },
  {
    n: "02",
    name: "Design systems",
    desc: "Componentised, themable libraries with motion, accessibility and dark mode wired in. Tokens, docs, governance.",
    tags: ["Figma", "Tokens", "Storybook"]
  },
  {
    n: "03",
    name: "Brand & identity",
    desc: "Naming, marks, typography, voice. Built to live across screen, print and motion without falling apart.",
    tags: ["Identity", "Wordmark", "Voice"]
  },
  {
    n: "04",
    name: "AI integration",
    desc: "Retrieval, agents, evals. We embed LLM features into existing products without turning the UX into a wizard.",
    tags: ["LLM", "RAG", "Evals"]
  },
  {
    n: "05",
    name: "Platform & infra",
    desc: "Migration off legacy, monorepo set-up, CI ⁄ CD, observability. Built so the next engineer thanks you.",
    tags: ["AWS", "Vercel", "Postgres"]
  },
];

function Services() {
  return (
    <section className="section" id="services">
      <div className="section-id"><span className="tag">02 ⁄ Services</span><span>Capabilities</span></div>
      <div className="section-head">
        <h2><Reveal>What we <span className="serif">do</span>.</Reveal></h2>
        <Reveal className="desc" delay={1}>
          A small, senior team that ships. We work as an extension of yours —
          embedded in your tooling, your standups, your roadmap. No
          handovers, no offshoring.
        </Reveal>
      </div>

      <div className="services">
        {SERVICES.map((s, i) =>
          <Reveal key={s.n} className="svc-row" delay={Math.min(4, i % 4 + 1)}>
            <div className="svc-num">{s.n}</div>
            <div className="svc-name">{s.name}</div>
            <div className="svc-desc">{s.desc}</div>
            <div className="svc-tags">{s.tags.map((t) => <span className="svc-tag" key={t}>{t}</span>)}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ---------- Work / Capabilities visualization ----------
function GridViz() {
  return (
    <div className="grid-viz">
      <svg viewBox="0 0 400 220" preserveAspectRatio="none">
        <defs>
          <pattern id="gp" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="gg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.0" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="url(#gp)" />
        <path d="M 0 180 Q 80 60, 160 120 T 320 80 T 400 60" fill="none" stroke="var(--accent)" strokeWidth="1.4">
          <animate attributeName="d"
            values="M 0 180 Q 80 60, 160 120 T 320 80 T 400 60;M 0 160 Q 80 100, 160 60 T 320 120 T 400 90;M 0 180 Q 80 60, 160 120 T 320 80 T 400 60"
            dur="9s" repeatCount="indefinite" />
        </path>
        <path d="M 0 180 Q 80 60, 160 120 T 320 80 T 400 60 L 400 220 L 0 220 Z" fill="url(#gg)">
          <animate attributeName="d"
            values="M 0 180 Q 80 60, 160 120 T 320 80 T 400 60 L 400 220 L 0 220 Z;M 0 160 Q 80 100, 160 60 T 320 120 T 400 90 L 400 220 L 0 220 Z;M 0 180 Q 80 60, 160 120 T 320 80 T 400 60 L 400 220 L 0 220 Z"
            dur="9s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

function BarsViz() {
  const heights = [22, 38, 32, 56, 48, 70, 64, 86, 78, 92];
  return (
    <div className="chart-bars">
      {heights.map((h, i) =>
        <div key={i}
          className={`bar ${i >= 7 ? "acc" : ""}`}
          style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />
      )}
    </div>
  );
}

function DotsViz() {
  const cells = 14 * 8;
  const ons = new Set([
    18, 19, 33, 34, 48, 62, 63, 76, 77, 78, 92, 93, 49, 50, 35,
    20, 21, 6, 64, 65, 79, 94, 51, 36, 22,
  ]);
  return (
    <div className="dots-viz">
      {Array.from({ length: cells }).map((_, i) =>
        <span key={i} className={`d ${ons.has(i) ? "on" : ""}`}
          style={{ animationDelay: `${i % 9 * 120}ms` }} />
      )}
    </div>
  );
}

function CodeViz() {
  const lines = [
    { c: <><span className="kw">const</span> pipeline = compose(</> },
    { c: <>&nbsp;&nbsp;observe(<span className="kw">'edge'</span>),</> },
    { c: <>&nbsp;&nbsp;cache({"{" } ttl: 60 {"}"}),</>, acc: true },
    { c: <>&nbsp;&nbsp;route(<span className="kw">request</span>),</> },
    { c: <>);</> },
  ];

  return (
    <div className="code-viz">
      {lines.map((l, i) =>
        <span key={i}
          className={`ln ${l.acc ? "acc" : ""}`}
          style={{ animationDelay: `${300 + i * 140}ms` }}>
          {l.c}
        </span>
      )}
    </div>
  );
}

function FlowViz() {
  const steps = ["Intake", "Parse", "Enrich", "Route", "Output"];
  return (
    <div className="grid-viz">
      <svg viewBox="0 0 520 180" preserveAspectRatio="none">
        <defs>
          <pattern id="fp" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.5" />
          </pattern>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="var(--accent)" fillOpacity="0.55" />
          </marker>
        </defs>
        <rect width="520" height="180" fill="url(#fp)" />

        {/* connector lines */}
        {steps.slice(0, -1).map((_, i) => {
          const x1 = 56 + i * 102 + 42;
          const x2 = 56 + (i + 1) * 102 - 2;
          const y = 90;
          return (
            <g key={"line" + i}>
              <line x1={x1} y1={y} x2={x2} y2={y}
                stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5"
                strokeDasharray="4 3" />
              {/* traveling pulse */}
              <circle r="3.5" fill="var(--accent)" fillOpacity="0.9">
                <animateMotion
                  path={`M ${x1} ${y} L ${x2} ${y}`}
                  dur={`${1.4 + i * 0.3}s`}
                  begin={`${i * 0.55}s`}
                  repeatCount="indefinite"
                  calcMode="linear" />
                <animate attributeName="opacity"
                  values="0;1;1;0" keyTimes="0;0.05;0.9;1"
                  dur={`${1.4 + i * 0.3}s`}
                  begin={`${i * 0.55}s`}
                  repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* step boxes */}
        {steps.map((label, i) => {
          const x = 56 + i * 102;
          const y = 68;
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;
          return (
            <g key={"step" + i}>
              <rect x={x} y={y} width="42" height="44" rx="8"
                fill={isLast ? "var(--accent)" : "var(--surface)"}
                fillOpacity={isLast ? "1" : "1"}
                stroke={isLast ? "var(--accent)" : "currentColor"}
                strokeOpacity={isLast ? "0.5" : "0.22"}
                strokeWidth="1">
                {isLast && (
                  <animate attributeName="fillOpacity"
                    values="0.75;1;0.75" dur="2.4s" repeatCount="indefinite" />
                )}
              </rect>
              {/* icon dot(s) */}
              {isFirst ? (
                <>
                  <circle cx={x + 21} cy={y + 16} r="4" fill="currentColor" fillOpacity="0.35" />
                  <rect x={x + 10} y={y + 26} width="22" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
                </>
              ) : isLast ? (
                <>
                  <path d={`M ${x+14} ${y+22} L ${x+19} ${y+28} L ${x+30} ${y+16}`}
                    fill="none" stroke="var(--accent-ink)" strokeWidth="2.4"
                    strokeLinecap="round" strokeLinejoin="round" />
                </>
              ) : (
                <>
                  <circle cx={x + 21} cy={y + 18} r="5" fill="var(--accent)" fillOpacity="0.25" />
                  <circle cx={x + 21} cy={y + 18} r="2.5" fill="var(--accent)" fillOpacity="0.7" />
                </>
              )}
              <text x={x + 21} y={y + 58}
                textAnchor="middle"
                fontFamily="var(--mono)" fontSize="8.5" letterSpacing="0.5"
                fill="currentColor" fillOpacity={isLast ? "1" : "0.5"}>
                {label}
              </text>
            </g>
          );
        })}

        {/* "before" label */}
        <text x="57" y="38" fontFamily="var(--mono)" fontSize="8" letterSpacing="1.5"
          fill="currentColor" fillOpacity="0.35" textAnchor="middle">MANUAL</text>
        <line x1="57" y1="42" x2="57" y2="64" stroke="currentColor" strokeOpacity="0.2"
          strokeWidth="1" strokeDasharray="2 2" />

        {/* "after" label */}
        <text x="463" y="38" fontFamily="var(--mono)" fontSize="8" letterSpacing="1.5"
          fill="var(--accent)" fillOpacity="0.8" textAnchor="middle">AI-DRIVEN</text>
        <line x1="463" y1="42" x2="463" y2="64" stroke="var(--accent)" strokeOpacity="0.4"
          strokeWidth="1" strokeDasharray="2 2" />

        {/* throughput bar */}
        <rect x="48" y="138" width="424" height="4" rx="2" fill="currentColor" fillOpacity="0.08" />
        <rect x="48" y="138" width="0" height="4" rx="2" fill="var(--accent)" fillOpacity="0.7">
          <animate attributeName="width" values="0;297;297" keyTimes="0;0.6;1"
            dur="2.8s" repeatCount="indefinite" begin="0.5s" />
        </rect>
        <text x="48" y="155" fontFamily="var(--mono)" fontSize="7.5" fill="currentColor" fillOpacity="0.4">0%</text>
        <text x="472" y="155" fontFamily="var(--mono)" fontSize="7.5" fill="var(--accent)" fillOpacity="0.7">70% faster</text>
      </svg>
    </div>
  );
}

function NetworkViz() {
  const nodes = [
    { cx: 90,  cy: 70,  r: 5 },
    { cx: 350, cy: 50,  r: 5 },
    { cx: 380, cy: 175, r: 5 },
    { cx: 60,  cy: 185, r: 5 },
  ];
  const cx = 220, cy = 120;
  return (
    <div className="grid-viz">
      <svg viewBox="0 0 440 240" preserveAspectRatio="none">
        <defs>
          <pattern id="np" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="440" height="240" fill="url(#np)" />
        <g fill="none" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 4">
          <ellipse cx={cx} cy={cy} rx="170" ry="75" />
          <ellipse cx={cx} cy={cy} rx="110" ry="48" />
        </g>
        {nodes.map((n, i) =>
          <line key={i} x1={cx} y1={cy} x2={n.cx} y2={n.cy}
                stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.8" />
        )}
        {nodes.map((n, i) =>
          <circle key={"p" + i} r="2.5" fill="var(--accent)">
            <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite"
              path={`M ${cx} ${cy} L ${n.cx} ${n.cy}`} />
            <animate attributeName="opacity"
              values="0;1;1;0" keyTimes="0;0.1;0.9;1"
              dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        )}
        {nodes.map((n, i) =>
          <g key={"n" + i}>
            <circle cx={n.cx} cy={n.cy} r={n.r + 6} fill="var(--accent)" fillOpacity="0.12" />
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="currentColor" />
          </g>
        )}
        <circle cx={cx} cy={cy} r="14" fill="var(--accent)" fillOpacity="0.18" />
        <circle cx={cx} cy={cy} r="7" fill="var(--accent)">
          <animate attributeName="r" values="7;9;7" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

const CASES = [
  {
    span: 5,
    sector: "Retail ⁄ AI",
    title: "Conversational stylist for a heritage retailer",
    desc: "RAG over 18 years of product copy + a tasteful agent. Now does 22% of customer-service volume.",
    viz: <DotsViz />,
  },
  {
    span: 7,
    sector: "Infrastructure",
    title: "Edge runtime + observability stack for a logistics group",
    desc: "Moved 14M daily events off a creaking VM cluster onto a typed, observable, multi-region edge platform — without a freeze week.",
    viz: <CodeViz />,
  },
  {
    span: 12,
    sector: "Fintech ⁄ Mobile",
    title: "Treasury platform for a London-based neobank",
    desc: "Rebuilt a 4-year-old internal tool into a real-time treasury dashboard. 11× faster reconciliation, 40% smaller engineering team.",
    viz: <GridViz />,
  },
  {
    span: 12,
    sector: "AI ⁄ Workflow",
    title: "AI workflow integration for a manual-process business",
    desc: "Replaced a heavily manual ops pipeline with an AI-driven workflow — cutting processing time by 70% and measurably increasing output value across every stage.",
    viz: <FlowViz />,
  },
];

function Work() {
  return (
    <section className="section" id="work" style={{ paddingTop: 40 }}>
      <div className="section-id"><span className="tag">03 ⁄ Work</span><span>Selected engagements</span></div>
      <div className="section-head">
        <h2><Reveal>Recent <span className="serif">flows</span>.</Reveal></h2>
        <Reveal className="desc" delay={1}>
          Four pieces from the last eighteen months. Names withheld on
          request; specifics happily shared over coffee in Wembley.
        </Reveal>
      </div>
      <div className="cap-grid">
        {CASES.map((c, i) =>
          <Reveal key={i} className={`cap cap-${c.span}`} delay={i % 4 + 1}>
            <div>
              <span className="corner">{c.sector}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
            <div className="cap-viz">{c.viz}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ---------- Process ----------
const STEPS = [
  { n: "01", t: "Discover", d: "Workshops, audits, stakeholder mapping. We leave with a hypothesis worth testing.", w: "Week 01–02" },
  { n: "02", t: "Define", d: "Strategy doc, success metrics, a sketch of the system. The shortest path to value.", w: "Week 02–03" },
  { n: "03", t: "Design", d: "From low-fi storyboards to production-ready Figma — tested with real users, not vibes.", w: "Week 03–08" },
  { n: "04", t: "Ship", d: "Engineering in your repo, your standups, your dashboards. Then a clean, documented handover.", w: "Week 06–14" },
];

function Process() {
  return (
    <section className="section" id="process">
      <div className="section-id"><span className="tag">04 ⁄ Process</span><span>How we work</span></div>
      <div className="section-head">
        <h2><Reveal>A repeatable <span className="serif">cadence</span>.</Reveal></h2>
        <Reveal className="desc" delay={1}>
          Four-phase engagement. Most projects run 10–14 weeks. We bill
          weekly, scope tightly, and never use the word "synergy".
        </Reveal>
      </div>
      <div className="process">
        {STEPS.map((s, i) =>
          <Reveal key={s.n} className="step" delay={i % 4 + 1}>
            <div className="n">{s.n} ⁄ Phase</div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
            <div className="week">{s.w}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ---------- Numbers ----------
function Numbers() {
  return (
    <div className="numbers shell" style={{ padding: 0 }}>
      <Reveal className="cell" delay={1}>
        <div className="value"><CountUp end={48} /><span className="unit">products shipped</span></div>
        <div className="label">Since 2018</div>
      </Reveal>
      <Reveal className="cell" delay={2}>
        <div className="value"><CountUp end={11} /><span className="unit">avg. team</span></div>
        <div className="label">Senior engineers ⁄ designers</div>
      </Reveal>
      <Reveal className="cell" delay={3}>
        <div className="value"><CountUp end={97} suffix="%" /></div>
        <div className="label">Repeat ⁄ referral clients</div>
      </Reveal>
      <Reveal className="cell" delay={4}>
        <div className="value">£<CountUp end={210} suffix="M" /></div>
        <div className="label">Raised by clients post-launch</div>
      </Reveal>
    </div>
  );
}

// ---------- London ----------
function London() {
  return (
    <section className="section" id="studio">
      <div className="section-id"><span className="tag">05 ⁄ Studio</span><span>51.5535° N, 0.2963° W</span></div>
      <div className="london">
        <div className="london-text">
          <h3>
            <Reveal>
              A small studio in <span className="serif">Wembley</span>,
              built around the idea that good software still takes&nbsp;
              <span className="serif">craft</span>.
            </Reveal>
          </h3>
          <Reveal delay={1} as="p">
            We're based on Westbury Avenue in Wembley. Eleven of us, full-time.
            No juniors on a project unless paired with a principal. No agency
            layer between you and the people doing the work.
          </Reveal>
          <Reveal delay={2} as="p">
            We mostly work with teams in the UK and Europe, occasionally
            North America. The kettle is always on.
          </Reveal>
          <div className="london-meta">
            <Reveal delay={1}>
              <div className="k">Studio</div>
              <div className="v">12 Westbury Avenue<br />Wembley HA0 4JX</div>
            </Reveal>
            <Reveal delay={2}>
              <div className="k">Hours</div>
              <div className="v">Mon–Thu, 09:00–18:00<br />Fridays, by appointment</div>
            </Reveal>
            <Reveal delay={3}>
              <div className="k">Nearest tube</div>
              <div className="v">Wembley Central · Stonebridge Park</div>
            </Reveal>
            <Reveal delay={4}>
              <div className="k">General</div>
              <div className="v">pixelflowsolutionsltd@gmail.com<br />+44 7376 911101</div>
            </Reveal>
          </div>
        </div>
        <Reveal className="map" delay={2}>
          <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="mp" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="400" height="360" fill="url(#mp)" />
            {/* abstract North Circular / A406 */}
            <path d="M -20 200 C 60 190, 120 210, 200 195 S 340 185, 420 200" fill="none" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="14" strokeLinecap="round" />
            <path d="M -20 200 C 60 190, 120 210, 200 195 S 340 185, 420 200" fill="none" stroke="var(--accent)" strokeOpacity="1" strokeWidth="1" />
            {/* roads */}
            <g stroke="currentColor" strokeOpacity="0.25" fill="none">
              <path d="M 50 0 L 50 360" />
              <path d="M 160 0 L 155 360" />
              <path d="M 260 0 L 265 360" />
              <path d="M 370 0 L 375 360" />
              <path d="M 0 100 L 400 95" />
              <path d="M 0 270 L 400 275" />
              <path d="M 0 330 L 400 335" />
            </g>
            {/* district outlines */}
            <g stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.6" fill="none">
              <path d="M 100 50 L 240 45 L 250 175 L 120 185 Z" />
              <path d="M 260 60 L 380 70 L 370 190 L 265 180 Z" />
            </g>
            <text x="140" y="110" fontFamily="var(--mono)" fontSize="9" letterSpacing="2" fill="currentColor" opacity="0.5">WEMBLEY</text>
            <text x="275" y="130" fontFamily="var(--mono)" fontSize="9" letterSpacing="2" fill="currentColor" opacity="0.5">HARROW</text>
            <text x="40" y="310" fontFamily="var(--mono)" fontSize="9" letterSpacing="2" fill="currentColor" opacity="0.5">EALING</text>
          </svg>
          <div className="marker" style={{ left: "44%", top: "38%" }} />
          <div className="label" style={{ left: "44%", top: "38%" }}>PixelFlow ⁄ HQ</div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-id" style={{ justifyContent: "center" }}>
        <span className="tag">06 ⁄ Contact</span><span>Let&apos;s make something</span>
      </div>
      <h2>
        <Reveal>
          <span className="sans">Let&apos;s build </span>
          something <br />
          worth&nbsp;<span className="sans">shipping.</span>
        </Reveal>
      </h2>
      <Reveal delay={1}>
        <a href="mailto:pixelflowsolutionsltd@gmail.com" className="email">
          pixelflowsolutionsltd@gmail.com →
        </a>
      </Reveal>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  const time = useLondonTime();
  return (
    <footer>
      <div className="foot">
        <div>
          <div className="big">
            PixelFlow<br /><span className="serif">Solutions Ltd.</span>
          </div>
          <p style={{ color: "var(--ink-soft)", fontSize: 13, lineHeight: 1.5, marginTop: 16, maxWidth: "32ch" }}>
            An independent product studio in East London.
            Building since 2018.
          </p>
        </div>
        <div>
          <h5>Studio</h5>
          <ul>
            <li><a href="#studio">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#">Journal</a></li>
            <li><a href="#">Careers · 2</a></li>
          </ul>
        </div>
        <div>
          <h5>Services</h5>
          <ul>
            <li><a href="#services">Product engineering</a></li>
            <li><a href="#services">Design systems</a></li>
            <li><a href="#services">Brand &amp; identity</a></li>
            <li><a href="#services">AI integration</a></li>
            <li><a href="#services">Platform &amp; infra</a></li>
          </ul>
        </div>
        <div>
          <h5>Elsewhere</h5>
          <ul>
            <li><a href="#">Read.cv</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Dribbble</a></li>
            <li><a href="mailto:pixelflowsolutionsltd@gmail.com">pixelflowsolutionsltd@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-base">
        <span>© 2018 — 2026 · PixelFlow Solutions Ltd · Co. 11420988</span>
        <span className="clock"><span className="pulse" />London · {time} BST</span>
        <span>12 Westbury Avenue · Wembley HA0 4JX</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Marquee, Services, Work, Process, Numbers, London, Contact, Footer });
