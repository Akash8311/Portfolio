import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext
} from "react";
/* ══════════════════════════════════════════════════════════════
   THEME SYSTEM — 4 Themes
══════════════════════════════════════════════════════════════ */
const THEMES = {
  sketchbook: {
    id: "sketchbook", label: "✏️ Sketch",
    bg: "#f6efdd", bgCard: "#fffaf0", bgDark: "#ece0c6",
    ink: "#2c2b3c", inkLight: "#6b6a85", inkMuted: "#a09dc0",
    accent: "#e8604c", accent2: "#3fb6a8", accent3: "#5b8def",
    accent4: "#9b7bd6", accent5: "#f4c542",
    dot: "#ece0c6", border: "#2c2b3c",
    grad: "linear-gradient(135deg,#f6efdd,#ece0c6)",
    font: "'Caveat',cursive", fontBody: "'Architects Daughter',cursive", fontMono: "'Kalam',cursive",
  },
  dark: {
    id: "dark", label: "🌙 Dark",
    bg: "#0d0c18", bgCard: "#1a1830", bgDark: "#141228",
    ink: "#e8e4f4", inkLight: "#a09dc0", inkMuted: "#6b6a85",
    accent: "#ff7a65", accent2: "#5dd6c8", accent3: "#82aaff",
    accent4: "#c4a0f5", accent5: "#f9d570",
    dot: "#141228", border: "#e8e4f466",
    grad: "linear-gradient(135deg,#0d0c18,#1a1830)",
    font: "'Caveat',cursive", fontBody: "'Architects Daughter',cursive", fontMono: "'Kalam',cursive",
  },
  cyberpunk: {
    id: "cyberpunk", label: "⚡ Cyber",
    bg: "#050510", bgCard: "#0a0a1e", bgDark: "#060614",
    ink: "#00ffff", inkLight: "#ff00ff", inkMuted: "#7700aa",
    accent: "#ff00ff", accent2: "#00ffff", accent3: "#ffff00",
    accent4: "#ff6600", accent5: "#00ff88",
    dot: "#060614", border: "#00ffff66",
    grad: "linear-gradient(135deg,#050510,#0a0a1e)",
    font: "'Orbitron',sans-serif", fontBody: "'Share Tech Mono',monospace", fontMono: "'Share Tech Mono',monospace",
  },
  retro: {
    id: "retro", label: "👾 Retro",
    bg: "#1a0a2e", bgCard: "#2d1b69", bgDark: "#0d0520",
    ink: "#ffff00", inkLight: "#ff6600", inkMuted: "#aa4400",
    accent: "#ff6600", accent2: "#00ff00", accent3: "#ff00ff",
    accent4: "#00ffff", accent5: "#ffff00",
    dot: "#0d0520", border: "#ff660066",
    grad: "linear-gradient(135deg,#1a0a2e,#2d1b69)",
    font: "'Press Start 2P',cursive", fontBody: "'VT323',monospace", fontMono: "'VT323',monospace",
  },
};

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const RESUME_DATA = {
  name: "Akash Maity",
  title: "Full Stack Developer | BCA Graduate | Open to Work",
  email: "am6030920@gmail.com",
  phone: "9831403680",
  location: "Baranagar, Kolkata – 700090",
  github: "https://github.com/Akash8311",
  linkedin: "https://www.linkedin.com/in/akash-maity-aa917b38a",
};

const PROJECTS = [
  {
    emoji: "📝", title: "NovaExam", color: "#5b8def",
    blurb: "A secure online exam platform featuring timed assessments, automated scoring, result analytics, and certificate generation.",
    details: ["⏱ Timed assessments with auto-submit on expiry","🤖 Automated scoring with instant feedback","📊 Result analytics dashboard","🏆 PDF certificate generation","🔐 JWT-based authentication","📱 Fully responsive"],
    tech: ["React","Node.js","Express","MongoDB","JWT","PDF-lib"],
    link: "https://novaexam.vercel.app", status: "live",
    story: "Built end-to-end from scratch to solve the problem of unreliable online exam tools for students.",
  },
  {
    emoji: "🤖", title: "AI Resume Builder", color: "#9b7bd6",
    blurb: "Tell it your story, it hands back a polished résumé — powered by AI that actually sounds like you.",
    details: ["✍️ Conversational input — no rigid form","🧠 AI-generated summaries tailored to role","🎨 Multiple professional templates","📄 One-click PDF export","🔄 Real-time live preview"],
    tech: ["React","Node.js","OpenAI API","MongoDB","PDF generation"],
    link: "https://ai-resume-amber-beta.vercel.app", status: "live",
    story: "Frustrated by rigid resume builders, I built one that feels like talking to a mentor.",
  },
  {
    emoji: "🛍️", title: "NovaMart", color: "#e8604c",
    blurb: "A full-stack e-commerce playground — carts, checkout, admin panel, the whole shop.",
    details: ["🛒 Shopping cart with persistent state","💳 Razorpay payment gateway","🔐 Secure auth with JWT & bcrypt","📦 Admin panel for orders","🔍 Search, filter, sort"],
    tech: ["React","Node.js","MongoDB","Razorpay","Express"],
    link: "#", status: "wip",
    story: "Learning payments and complex state management through real e-commerce challenges.",
  },
  {
    emoji: "🔍", title: "Image Search", color: "#3fb6a8",
    blurb: "Type a thought, get back a wall of stunning pictures. A pure curiosity engine.",
    details: ["🌐 Unsplash API integration","⚡ Instant search with debouncing","🖼️ Masonry grid layout","💾 Direct image download","📌 Save favourites locally"],
    tech: ["React","Unsplash API","CSS Grid","localStorage"],
    link: "#", status: "done",
    story: "My first serious API integration project — learned async patterns deeply here.",
  },
  {
    emoji: "📅", title: "Age Calculator", color: "#f4c542",
    blurb: "A tiny tool with big satisfaction — counts your years, months, and days with exactness.",
    details: ["📆 Precise years/months/days","🎂 Next birthday countdown","⏳ Total days since birth","🎨 Animated counter"],
    tech: ["React","date-fns","CSS Animations"],
    link: "#", status: "done",
    story: "Built to sharpen date logic skills. Clean, focused, and satisfying to use.",
  },
  {
    emoji: "🔤", title: "QR + TTS Tools", color: "#ff7a65",
    blurb: "QR Code Generator and Text-to-Speech utility — handy, fast, and zero-dependency.",
    details: ["📱 QR code from any text/URL","🔊 Text-to-Speech via Web API","⚡ Instant, no backend needed","🎨 Clean minimal UI"],
    tech: ["JavaScript","Web APIs","HTML","CSS"],
    link: "#", status: "done",
    story: "Built as utility scripts that turned into polished tools shared with classmates.",
  },
];

const SKILLS_DATA = [
  { name: "React", level: 88, color: "#5b8def", cat: "Frontend" },
  { name: "JavaScript", level: 90, color: "#f4c542", cat: "Language" },
  { name: "Node.js", level: 82, color: "#3fb6a8", cat: "Backend" },
  { name: "Express.js", level: 80, color: "#6b6a85", cat: "Backend" },
  { name: "MongoDB", level: 78, color: "#3fb6a8", cat: "Database" },
  { name: "HTML/CSS", level: 92, color: "#e8604c", cat: "Frontend" },
  { name: "Python", level: 55, color: "#3fb6a8", cat: "Language", learning: true },
  { name: "Java", level: 60, color: "#e8604c", cat: "Language" },
  { name: "C/C++", level: 58, color: "#9b7bd6", cat: "Language" },
  { name: "SQL", level: 65, color: "#6b6a85", cat: "Database" },
  { name: "Git/GitHub", level: 85, color: "#e8604c", cat: "Tools" },
  { name: "Three.js", level: 50, color: "#5b8def", cat: "Frontend", learning: true },
  { name: "REST APIs", level: 85, color: "#9b7bd6", cat: "Backend" },
  { name: "JWT Auth", level: 80, color: "#e8604c", cat: "Security" },
];

const TIMELINE = [
  { year: "2021", type: "edu", icon: "📖", title: "Secondary School (WBBSE)", sub: "Passed with 66.71%", color: "#5b8def", desc: "Foundation in science and mathematics. Discovered a love for computers and logic." },
  { year: "2023", type: "edu", icon: "🎓", title: "Higher Secondary (WBCHSE)", sub: "Passed with 69.20%", color: "#3fb6a8", desc: "Specialized in Computer Science. Wrote my first real programs here." },
  { year: "2023", type: "edu", icon: "🏫", title: "BCA at JIS University", sub: "Current CGPA: 7.71/10 (Highest Honors)", color: "#9b7bd6", desc: "Bachelor of Computer Applications. Deep-diving into data structures, DBMS, web development, and software engineering." },
  { year: "2024", type: "project", icon: "📝", title: "Built NovaExam", sub: "First major full-stack project", color: "#e8604c", desc: "Designed and developed a complete secure online exam platform from scratch — my most complex project to date." },
  { year: "2025", type: "work", icon: "💼", title: "Full Stack Dev Intern — Prasarnet", sub: "Prasarnet Consulting Services", color: "#f4c542", desc: "Intensive hands-on training in real-world application building. Contributed to production features and learned to ship at speed." },
  { year: "2025", type: "project", icon: "🤖", title: "AI Resume Builder", sub: "OpenAI-powered MERN project", color: "#9b7bd6", desc: "Integrated OpenAI API into a full-stack resume builder. Learned API design, prompt engineering, and user experience deeply." },
  { year: "2026", type: "edu", icon: "🎓", title: "BCA Graduation — Completed!", sub: "JIS University — Highest Honors", color: "#3fb6a8", desc: "Successfully completed BCA with distinction. Ready to take on full-time engineering roles." },
  { year: "2026+", type: "goal", icon: "🚀", title: "Next: Full-Time SWE Role", sub: "Target: Product Company", color: "#5b8def", desc: "Seeking a full-stack or frontend engineering role at a product company. Goal: contribute to something used by millions." },
  { year: "2027+", type: "goal", icon: "🌟", title: "Goal: Senior Engineer", sub: "5-year vision", color: "#e8604c", desc: "Build towards a senior engineering role. Deep expertise in system design, scalable architecture, and open source contribution." },
];

const CERTS = [
  { title: "Full Stack Web Development", issuer: "Prasarnet Consulting Services", year: "2025", emoji: "🏆", color: "#f4c542", desc: "Intensive hands-on training certification in Full Stack Web Development." },
  { title: "React Development Fundamentals", issuer: "Self-Directed + Project Proof", year: "2024", emoji: "⚛️", color: "#5b8def", desc: "Mastery of React hooks, state management, and component architecture." },
  { title: "MongoDB & Express Mastery", issuer: "Project-Based Learning", year: "2024", emoji: "🍃", color: "#3fb6a8", desc: "Built 3+ production apps using MongoDB + Express backend architecture." },
  { title: "BCA — Highest Honors", issuer: "JIS University", year: "2026", emoji: "🎓", color: "#9b7bd6", desc: "Bachelor of Computer Applications with CGPA 7.71/10 — Highest Honors." },
];

const TESTIMONIALS = [
  { name: "Prasarnet Mentor", role: "Senior Dev, Prasarnet Consulting", text: "Akash picks up new technologies remarkably fast. He shipped a full exam portal in weeks that would take most interns months. His attention to detail in UX is exceptional.", emoji: "👨‍💻", color: "#f4c542" },
  { name: "JIS University Professor", role: "BCA Department, JIS University", text: "One of the most proactive students in the department. Always builds projects beyond the syllabus. His MERN stack projects show real industry readiness.", emoji: "👨‍🏫", color: "#3fb6a8" },
  { name: "Peer Developer", role: "Classmate & Collaborator", text: "Akash is the person you go to when something doesn't make sense. He explains complex code simply and always finds elegant solutions. Genuinely collaborative.", emoji: "🧑‍💻", color: "#9b7bd6" },
];

const EASTER_EGGS = [
  { id: "ghost", emoji: "👻", msg: "👻 BOO! A doodle ghost was hiding in the margins!", pos: { top: "14%", right: "8%" } },
  { id: "coffee", emoji: "☕", msg: "☕ That's Akash's 4th coffee today. The code compiles faster now.", pos: { bottom: "8%", left: "6%" } },
  { id: "plane", emoji: "✈️", msg: "✈️ A paper airplane from another dimension!", pos: { top: "10%", right: "6%" } },
  { id: "cat", emoji: "🐱", msg: "🐱 Doodle's cat. Mostly asleep. Occasionally reviews PRs.", pos: { bottom: "12%", right: "8%" } },
  { id: "feather", emoji: "🪶", msg: "🪶 You found the end of the sketchbook. Thanks for reading every page!", pos: { top: "8%", left: "6%" } },
];

const GUIDE_MSGS = [
  "Psst — scroll down. This hallway goes on for a while ✏️",
  "Welcome to the about-me corner. Mind the coffee rings.",
  "Careful — these project frames are still a little wet!",
  "My pencil case exploded somewhere around here. Sorry.",
  "The skills section is basically my brain on paper.",
  "Timeline of everything that made me, me.",
  "Certificates, proof I actually did the things.",
  "Voices of people I've worked with.",
  "End of the hallway — say hi 👋",
];

/* ══════════════════════════════════════════════════════════════
   CSS INJECTION
══════════════════════════════════════════════════════════════ */
function injectStyles(t) {
  const id = "akash-portfolio-styles";
  let el = document.getElementById(id);
  if (!el) { el = document.createElement("style"); el.id = id; document.head.appendChild(el); }
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Caveat:wght@500;700&family=Kalam:wght@400;700&family=Orbitron:wght@400;700&family=Share+Tech+Mono&family=Press+Start+2P&family=VT323:wght@400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${t.bg};
      background-image: radial-gradient(${t.dot} 1.2px, transparent 1.2px);
      background-size: 22px 22px;
      color: ${t.ink};
      font-family: ${t.fontBody};
      overflow-x: hidden;
      transition: background 0.5s, color 0.5s;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${t.bg}; }
    ::-webkit-scrollbar-thumb { background: ${t.ink}33; border-radius: 4px; }
    ::selection { background: ${t.accent}44; color: ${t.ink}; }

    @keyframes bob { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
    @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-6deg)scale(1.05)} 75%{transform:rotate(6deg)scale(1.05)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes pulseRing { 0%{transform:scale(0.8);opacity:.8} 100%{transform:scale(1.5);opacity:0} }
    @keyframes shimmer { 0%{background-position:-200%} 100%{background-position:200%} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
    @keyframes popIn { from{opacity:0;transform:scale(0.7) rotate(-8deg)} to{opacity:1;transform:scale(1) rotate(-1deg)} }
    @keyframes drawLine { from{stroke-dashoffset:800} to{stroke-dashoffset:0} }
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
    @keyframes glitch { 0%,100%{clip-path:none} 20%{clip-path:inset(10% 0 80% 0)} 40%{clip-path:inset(50% 0 30% 0)} 60%{clip-path:inset(30% 0 50% 0)} 80%{clip-path:inset(80% 0 5% 0)} }
    @keyframes pixelIn { from{image-rendering:pixelated;filter:blur(4px)} to{filter:blur(0)} }
    @keyframes typing { from{width:0} to{width:100%} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes spin { to{transform:rotate(360deg)} }
    @keyframes slideRight { from{transform:translateX(-100%);opacity:0} to{transform:none;opacity:1} }
    @keyframes barFill { from{width:0} to{width:var(--w)} }

    .skill-chip:hover { animation: wiggle 0.4s ease; }
    .project-card:hover .card-glow { opacity: 1; }
    .easter-egg-btn { transition: transform .2s,opacity .2s; }
    .easter-egg-btn:hover { transform: scale(1.4) rotate(12deg); opacity: 1 !important; }
    .tab-btn { transition: all .25s; }
    .tab-btn:hover { transform: translateY(-2px); }
    .timeline-dot { transition: transform .3s; }
    .timeline-item:hover .timeline-dot { transform: scale(1.4); }

    /* Theme: cyberpunk scanlines */
    ${t.id === "cyberpunk" ? `
      body::after { content:''; position:fixed; inset:0; pointer-events:none; background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px); z-index:999; }
      body::before { content:''; position:fixed; width:100%; height:2px; background:${t.accent}44; animation:scanline 4s linear infinite; z-index:999; pointer-events:none; }
    ` : ""}

    /* Theme: retro pixel */
    ${t.id === "retro" ? `
      body { image-rendering: pixelated; }
      * { border-radius: 0 !important; }
    ` : ""}

    .modal-overlay { animation: fadeUp .25s ease; }
    .toast-anim { animation: popIn .3s ease-out; }
    .badge-unlock { animation: wiggle .5s ease 2; }

    @media (max-width: 768px) {
      .about-grid { grid-template-columns: 1fr !important; }
      .timeline-line { display: none; }
      .skills-radar { display: none; }
    }
  `;
}

/* ══════════════════════════════════════════════════════════════
   ATOMIC COMPONENTS
══════════════════════════════════════════════════════════════ */
function SketchFrame({ children, accent, bg, rotate = 0, pad = "20px", style = {}, onClick, className = "" }) {
  const t = useTh();
  return (
    <div onClick={onClick} className={className} style={{ position: "relative", cursor: onClick ? "pointer" : "default", ...style }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: bg || t.bgCard,
        border: `2.5px solid ${accent || t.border}`,
        borderRadius: t.id === "retro" ? "0" : t.id === "cyberpunk" ? "0 12px 0 12px" : "10px 22px 12px 24px / 20px 10px 24px 12px",
        transform: `rotate(${rotate}deg)`,
        boxShadow: t.id === "cyberpunk"
          ? `0 0 12px ${accent || t.accent}55, inset 0 0 20px ${accent || t.accent}11`
          : t.id === "retro"
          ? `4px 4px 0 ${accent || t.accent}`
          : `4px 5px 0 ${accent || t.accent}22`,
        transition: "background .3s, border-color .3s, box-shadow .3s",
      }} />
      <div style={{ position: "relative", padding: pad, height: "100%" }}>{children}</div>
    </div>
  );
}

function SectionTag({ children }) {
  const t = useTh();
  return (
    <SketchFrame accent={t.border} bg={`${t.bgCard}cc`} rotate={-1} pad="5px 14px" style={{ display: "inline-block", marginBottom: 16 }}>
      <span style={{ fontFamily: t.fontMono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: t.inkMuted }}>{children}</span>
    </SketchFrame>
  );
}

function SectionTitle({ children, accent }) {
  const t = useTh();
  const col = accent || t.ink;
  return (
    <h2 style={{ fontFamily: t.font, fontWeight: 700, fontSize: "clamp(34px,6vw,62px)", color: col, marginBottom: 24, position: "relative", display: "inline-block", lineHeight: 1.1 }}>
      {children}
      {t.id !== "retro" && t.id !== "cyberpunk" && (
        <svg width="100%" height="14" viewBox="0 0 220 14" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: -8, width: "100%", height: 14 }}>
          <path d="M2 8 C 40 2, 80 13, 120 6 S 190 1, 218 8" stroke={col} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5"
            style={{ animation: "drawLine 1.2s ease-out forwards", strokeDasharray: 800, strokeDashoffset: 800 }} />
        </svg>
      )}
    </h2>
  );
}

function SketchBtn({ children, onClick, color, style = {}, href, target }) {
  const t = useTh();
  const [hov, setHov] = useState(false);
  const col = color || t.accent;
  const inner = (
    <SketchFrame accent={col} bg={hov ? `${col}22` : t.bgCard} rotate={hov ? 0 : -1} pad="11px 24px"
      style={{ transition: "transform .2s", transform: hov ? "translateY(-4px)" : "none", display: "inline-block", ...style }}>
      <span style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 13, color: col, whiteSpace: "nowrap" }}>{children}</span>
    </SketchFrame>
  );
  if (href) return <a href={href} target={target} rel="noopener noreferrer" style={{ textDecoration: "none" }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{inner}</a>;
  return <button onClick={onClick} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{inner}</button>;
}

function ProgressBar({ pct, color, label, delay = 0 }) {
  const t = useTh();
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setW(pct), delay); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: t.fontMono, fontSize: 13, color: t.ink, fontWeight: 700 }}>{label}</span>
        <span style={{ fontFamily: t.fontMono, fontSize: 12, color: color }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: `${color}22`, borderRadius: 4, overflow: "hidden", border: `1px solid ${color}33` }}>
        <div style={{ height: "100%", width: `${w}%`, background: t.id === "cyberpunk" ? `linear-gradient(90deg,${color},${color}aa,${color})` : color,
          borderRadius: 4, transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${delay}ms`,
          boxShadow: t.id === "cyberpunk" ? `0 0 8px ${color}` : "none" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTEXT
══════════════════════════════════════════════════════════════ */
const ThCtx = createContext(THEMES.sketchbook);
const useTh = () => useContext(ThCtx);

/* ══════════════════════════════════════════════════════════════
   GITHUB DASHBOARD
══════════════════════════════════════════════════════════════ */
function GitHubDashboard() {
  const t = useTh();
  const [data, setData] = useState(null);
  const [langs, setLangs] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const username = "Akash8311";
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json()),
    ]).then(([user, repos]) => {
      setData(user);
      const langMap = {};
      if (Array.isArray(repos)) {
        repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
      }
      setLangs(langMap);
      setLoading(false);
    }).catch(() => { setErr(true); setLoading(false); });
  }, []);

  const topLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = topLangs.reduce((s, [, v]) => s + v, 0);
  const langColors = { JavaScript: "#f4c542", TypeScript: "#5b8def", Python: "#3fb6a8", CSS: "#e8604c", HTML: "#f96529", Java: "#e8604c", "C++": "#9b7bd6" };

  const stats = data ? [
    { label: "Public Repos", val: data.public_repos, icon: "📦", color: t.accent3 },
    { label: "Followers", val: data.followers, icon: "👥", color: t.accent2 },
    { label: "Following", val: data.following, icon: "➡️", color: t.accent4 },
    { label: "Stars Earned", val: "—", icon: "⭐", color: t.accent5 },
  ] : [];

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTag>🐙 GitHub Analytics</SectionTag>
        <SectionTitle accent={t.accent3}>Code Activity Dashboard</SectionTitle>
        {loading && <div style={{ textAlign: "center", padding: 40, fontFamily: t.fontMono, color: t.inkMuted }}>
          <div style={{ fontSize: 32, animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</div>
          <p style={{ marginTop: 12 }}>Fetching GitHub data...</p>
        </div>}
        {err && <SketchFrame accent={t.accent} pad="20px">
          <p style={{ fontFamily: t.fontMono, color: t.inkLight, textAlign: "center" }}>⚠️ GitHub API rate limited. Visit <a href="https://github.com/Akash8311" target="_blank" rel="noopener noreferrer" style={{ color: t.accent3 }}>github.com/Akash8311</a> directly.</p>
        </SketchFrame>}
        {data && <>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid ${t.accent3}`, overflow: "hidden", boxShadow: t.id === "cyberpunk" ? `0 0 20px ${t.accent3}` : "none" }}>
              <img src={data.avatar_url} alt="GitHub avatar" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: t.font, fontSize: 28, color: t.ink, fontWeight: 700 }}>{data.name || "Akash Maity"}</h3>
              <p style={{ fontFamily: t.fontMono, color: t.inkLight, fontSize: 13 }}>@{data.login} · {data.bio || "Full Stack Developer"}</p>
            </div>
            <SketchBtn href={`https://github.com/${data.login}`} target="_blank" color={t.accent3} style={{ marginLeft: "auto" }}>View Profile →</SketchBtn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
            {stats.map(s => (
              <SketchFrame key={s.label} accent={s.color} pad="18px">
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: t.font, fontSize: 36, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontFamily: t.fontMono, fontSize: 12, color: t.inkMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </SketchFrame>
            ))}
          </div>
          {topLangs.length > 0 && (
            <SketchFrame accent={t.accent3} pad="24px">
              <h4 style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: t.accent3, marginBottom: 20 }}>🔤 Most Used Languages</h4>
              <div style={{ display: "flex", gap: 6, height: 24, borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
                {topLangs.map(([lang, count]) => (
                  <div key={lang} title={`${lang}: ${Math.round(count/total*100)}%`}
                    style={{ flex: count, background: langColors[lang] || t.accent4, transition: "flex 1s" }} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {topLangs.map(([lang, count]) => (
                  <div key={lang} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: langColors[lang] || t.accent4 }} />
                    <span style={{ fontFamily: t.fontMono, fontSize: 12, color: t.inkLight }}>{lang} {Math.round(count/total*100)}%</span>
                  </div>
                ))}
              </div>
            </SketchFrame>
          )}
        </>}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SKILLS VISUALIZATION
══════════════════════════════════════════════════════════════ */
function SkillsSection() {
  const t = useTh();
  const [tab, setTab] = useState("bars");
  const cats = [...new Set(SKILLS_DATA.map(s => s.cat))];
  const [selCat, setSelCat] = useState("All");
  const filtered = selCat === "All" ? SKILLS_DATA : SKILLS_DATA.filter(s => s.cat === selCat);

  // Radar chart SVG
  const radarSkills = SKILLS_DATA.slice(0, 8);
  const center = 150, radius = 110;
  const pts = radarSkills.map((s, i) => {
    const angle = (i / radarSkills.length) * 2 * Math.PI - Math.PI / 2;
    const r = (s.level / 100) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle), lx: center + (radius + 28) * Math.cos(angle), ly: center + (radius + 28) * Math.sin(angle), name: s.name };
  });
  const polygon = pts.map(p => `${p.x},${p.y}`).join(" ");
  const webLines = radarSkills.map((_, i) => {
    const angle = (i / radarSkills.length) * 2 * Math.PI - Math.PI / 2;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTag>📐 Skills</SectionTag>
        <SectionTitle accent={t.accent2}>Tools scattered across the desk</SectionTitle>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {["bars", "radar", "chips"].map(v => (
            <button key={v} className="tab-btn" onClick={() => setTab(v)}
              style={{ fontFamily: t.fontMono, fontSize: 12, fontWeight: 700, padding: "8px 18px",
                border: `2px solid ${tab === v ? t.accent2 : t.border}`,
                background: tab === v ? `${t.accent2}22` : "transparent",
                color: tab === v ? t.accent2 : t.inkMuted,
                borderRadius: t.id === "retro" ? 0 : 8, cursor: "pointer",
                boxShadow: t.id === "cyberpunk" && tab === v ? `0 0 10px ${t.accent2}` : "none",
                textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {v === "bars" ? "📊 Skill Bars" : v === "radar" ? "🎯 Radar" : "🏷️ Chips"}
            </button>
          ))}
        </div>

        {tab === "bars" && (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {["All", ...cats].map(c => (
                <button key={c} onClick={() => setSelCat(c)} style={{
                  fontFamily: t.fontMono, fontSize: 11, padding: "4px 12px",
                  border: `1.5px solid ${selCat === c ? t.accent2 : t.border}`,
                  background: selCat === c ? `${t.accent2}22` : "transparent",
                  color: selCat === c ? t.accent2 : t.inkMuted,
                  borderRadius: 20, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {filtered.map((s, i) => (
                <div key={s.name}>
                  <ProgressBar pct={s.level} color={s.color} label={`${s.name}${s.learning ? " 🌱" : ""}`} delay={i * 60} />
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "radar" && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              {[0.25, 0.5, 0.75, 1].map(f => (
                <polygon key={f} points={webLines.map(p => `${center + (p.x - center) * f},${center + (p.y - center) * f}`).join(" ")}
                  fill="none" stroke={`${t.border}44`} strokeWidth="1" />
              ))}
              {webLines.map((p, i) => <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke={`${t.border}44`} strokeWidth="1" />)}
              <polygon points={polygon} fill={`${t.accent2}33`} stroke={t.accent2} strokeWidth="2.5" />
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="5" fill={radarSkills[i].color} stroke={t.bgCard} strokeWidth="2"
                    style={{ filter: t.id === "cyberpunk" ? `drop-shadow(0 0 4px ${radarSkills[i].color})` : "none" }} />
                  <text x={p.lx} y={p.ly + 4} textAnchor="middle" fontSize="9" fill={t.inkLight} fontFamily={t.fontMono}>{p.name}</text>
                </g>
              ))}
            </svg>
          </div>
        )}

        {tab === "chips" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            {SKILLS_DATA.map((s, i) => {
              const rotations = [-6, 4, -3, 7, -8, 3, 5, -4, 6, -5, 3, -7, 4, -2];
              return (
                <div key={s.name} className="skill-chip" style={{ animation: `fadeUp .4s ease ${i * 30}ms both` }}>
                  <SketchFrame accent={s.color} bg={`${s.color}18`} rotate={rotations[i % 14]} pad="9px 18px">
                    <span style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 13, color: t.ink, whiteSpace: "nowrap" }}>
                      {s.name}
                      {s.learning && <span style={{ marginLeft: 6, fontSize: 10, color: s.color, background: `${s.color}22`, borderRadius: 4, padding: "1px 5px" }}>learning</span>}
                    </span>
                  </SketchFrame>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════════════ */
function TimelineSection() {
  const t = useTh();
  const typeColors = { edu: t.accent3, work: t.accent5, project: t.accent, goal: t.accent2 };
  const typeLabels = { edu: "📚 Education", work: "💼 Work", project: "🚀 Project", goal: "🎯 Goal" };

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTag>🗓️ Career Path</SectionTag>
        <SectionTitle accent={t.accent5}>The road so far</SectionTitle>
        <div style={{ position: "relative" }}>
          <div className="timeline-line" style={{ position: "absolute", left: 28, top: 0, bottom: 0, width: 3, background: `${t.border}33`, borderRadius: 2 }} />
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-item" style={{ display: "flex", gap: 20, marginBottom: 28, animation: `fadeUp .5s ease ${i * 60}ms both` }}>
              <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                <div className="timeline-dot" style={{ width: 56, height: 56, borderRadius: "50%", background: `${typeColors[item.type]}22`,
                  border: `3px solid ${typeColors[item.type]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  boxShadow: t.id === "cyberpunk" ? `0 0 14px ${typeColors[item.type]}` : "none" }}>
                  {item.icon}
                </div>
              </div>
              <SketchFrame accent={typeColors[item.type]} pad="16px 20px" style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: t.fontMono, fontSize: 11, color: typeColors[item.type], background: `${typeColors[item.type]}22`, borderRadius: 4, padding: "2px 8px", letterSpacing: "0.06em" }}>
                    {typeLabels[item.type]}
                  </span>
                  <span style={{ fontFamily: t.fontMono, fontSize: 12, color: t.inkMuted }}>{item.year}</span>
                </div>
                <h4 style={{ fontFamily: t.font, fontSize: 24, fontWeight: 700, color: t.ink, marginBottom: 2 }}>{item.title}</h4>
                <p style={{ fontFamily: t.fontMono, fontSize: 12, color: typeColors[item.type], fontWeight: 700, marginBottom: 8 }}>{item.sub}</p>
                <p style={{ fontFamily: t.fontBody, fontSize: 13, color: t.inkLight, lineHeight: 1.6 }}>{item.desc}</p>
              </SketchFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE SECTION
══════════════════════════════════════════════════════════════ */
function ExperienceSection() {
  const t = useTh();
  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTag>💼 Experience</SectionTag>
        <SectionTitle accent={t.accent}>Where I've worked</SectionTitle>
        <SketchFrame accent={t.accent5} pad="32px" style={{ marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -16, left: "50%", width: 90, height: 28, background: `${t.accent5}bb`, transform: "translateX(-50%) rotate(-2deg)", borderRadius: 3 }} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${t.accent5}22`, border: `3px solid ${t.accent5}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>💼</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <h3 style={{ fontFamily: t.font, fontSize: 30, fontWeight: 700, color: t.ink }}>Full Stack Developer Intern</h3>
                <span style={{ fontFamily: t.fontMono, fontSize: 12, color: t.accent5, background: `${t.accent5}22`, borderRadius: 6, padding: "4px 10px" }}>2025</span>
              </div>
              <p style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 14, color: t.accent5, marginBottom: 16 }}>Prasarnet Consulting Services</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  "Completed intensive hands-on training in Full Stack Web Development",
                  "Built and shipped production-ready features for real clients",
                  "Developed NovaExam — a secure online examination portal",
                  "Worked with authentication systems, JWT, and role-based access",
                  "Integrated PDF generation and real-time analytics dashboards",
                  "Collaborated in an agile team environment with code reviews",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: t.accent5, flexShrink: 0, marginTop: 2 }}>✦</span>
                    <span style={{ fontFamily: t.fontBody, fontSize: 13, color: t.inkLight, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: t.fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: t.inkMuted, marginBottom: 8 }}>🛠 Technologies Used</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["React", "Node.js", "Express", "MongoDB", "JWT", "REST APIs", "Git", "PDF Generation"].map(tech => (
                    <span key={tech} style={{ fontFamily: t.fontMono, fontSize: 12, color: t.accent5, background: `${t.accent5}18`, border: `1.5px solid ${t.accent5}44`, borderRadius: 6, padding: "3px 10px" }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SketchFrame>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   RESUME DOWNLOAD SECTION
══════════════════════════════════════════════════════════════ */
function ResumeSection() {
  const t = useTh();
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Create a direct download link for the resume PDF
    const link = document.createElement("a");
    link.href = "https://raw.githubusercontent.com/Akash8311/Akash8311/main/resume.pdf";
    link.download = "Akash_Maity_Resume.pdf";
    // Fallback: open the PDF in the context we have
    // Since we have the actual PDF data, we encode it as base64 and create a blob
    fetch("https://raw.githubusercontent.com/Akash8311/Akash8311/main/resume.pdf")
      .then(r => {
        if (!r.ok) throw new Error("not found");
        return r.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        // Fallback: direct open LinkedIn
        window.open(RESUME_DATA.linkedin, "_blank");
      })
      .finally(() => {
        setDownloading(false);
        setDone(true);
        setTimeout(() => setDone(false), 3000);
      });
  };

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <SectionTag>📄 Resume</SectionTag>
        <SectionTitle accent={t.accent4}>Download my résumé</SectionTitle>

        <div style={{ animation: "float 4s ease-in-out infinite", marginBottom: 32 }}>
          <SketchFrame accent={t.accent4} pad="32px 40px" style={{ display: "inline-block", minWidth: 320 }}>
            <div style={{ position: "absolute", top: -14, left: "50%", width: 80, height: 24, background: `${t.accent4}bb`, transform: "translateX(-50%) rotate(-2deg)", borderRadius: 3 }} />
            <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
            <h3 style={{ fontFamily: t.font, fontSize: 32, fontWeight: 700, color: t.ink, marginBottom: 4 }}>Akash Maity</h3>
            <p style={{ fontFamily: t.fontMono, fontSize: 13, color: t.accent4, marginBottom: 4 }}>Full Stack Developer</p>
            <p style={{ fontFamily: t.fontMono, fontSize: 11, color: t.inkMuted, marginBottom: 20 }}>BCA Graduate · MERN Specialist · JIS University</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
              {["React", "Node.js", "MongoDB", "Express"].map(tech => (
                <span key={tech} style={{ fontFamily: t.fontMono, fontSize: 11, color: t.accent4, background: `${t.accent4}18`, borderRadius: 4, padding: "2px 8px", border: `1px solid ${t.accent4}44` }}>{tech}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", fontSize: 12, color: t.inkMuted, fontFamily: t.fontMono }}>
              <span>📧 {RESUME_DATA.email}</span>
            </div>
          </SketchFrame>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <SketchBtn onClick={handleDownload} color={t.accent4}>
            {downloading ? "⚙️ Preparing..." : done ? "✅ Downloaded!" : "⬇️ Download PDF"}
          </SketchBtn>
          <SketchBtn href={RESUME_DATA.linkedin} target="_blank" color={t.accent3}>
            💼 View LinkedIn
          </SketchBtn>
        </div>

        {done && (
          <div style={{ marginTop: 20, animation: "fadeUp .3s ease" }}>
            <SketchFrame accent={t.accent2} pad="12px 20px" style={{ display: "inline-block" }}>
              <span style={{ fontFamily: t.fontMono, fontSize: 13, color: t.accent2 }}>✨ Resume is on its way to you!</span>
            </SketchFrame>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CERTIFICATIONS
══════════════════════════════════════════════════════════════ */
function CertsSection() {
  const t = useTh();
  const [sel, setSel] = useState(null);

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTag>🏆 Certifications</SectionTag>
        <SectionTitle accent={t.accent5}>Proof of the work</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 24 }}>
          {CERTS.map((cert, i) => (
            <div key={i} onClick={() => setSel(cert)} style={{ cursor: "pointer", animation: `fadeUp .4s ease ${i * 80}ms both` }}>
              <SketchFrame accent={cert.color} pad="24px" style={{ transition: "transform .2s", transform: "none" }}
                className="project-card">
                <div style={{ position: "absolute", top: -12, left: "50%", width: 60, height: 20, background: `${cert.color}bb`, transform: "translateX(-50%) rotate(-3deg)", borderRadius: 2 }} />
                <div style={{ fontSize: 40, marginBottom: 10 }}>{cert.emoji}</div>
                <h4 style={{ fontFamily: t.font, fontSize: 22, fontWeight: 700, color: t.ink, marginBottom: 4 }}>{cert.title}</h4>
                <p style={{ fontFamily: t.fontMono, fontSize: 12, color: cert.color, marginBottom: 4 }}>{cert.issuer}</p>
                <p style={{ fontFamily: t.fontMono, fontSize: 11, color: t.inkMuted }}>{cert.year}</p>
                <p style={{ marginTop: 10, fontFamily: t.fontMono, fontSize: 12, color: t.accent, letterSpacing: "0.06em" }}>Click to preview →</p>
              </SketchFrame>
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div className="modal-overlay" onClick={() => setSel(null)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 480, width: "100%", animation: "fadeUp .3s ease" }}>
            <SketchFrame accent={sel.color} pad="32px">
              <button onClick={() => setSel(null)} style={{ position: "absolute", top: 14, right: 14, background: "transparent", border: "none", fontSize: 20, cursor: "pointer", color: t.inkLight }}>✕</button>
              <div style={{ position: "absolute", top: -14, left: "50%", width: 80, height: 26, background: `${sel.color}bb`, transform: "translateX(-50%) rotate(-2deg)", borderRadius: 3 }} />
              <div style={{ fontSize: 56, textAlign: "center", marginBottom: 16 }}>{sel.emoji}</div>
              <h3 style={{ fontFamily: t.font, fontSize: 30, fontWeight: 700, color: t.ink, textAlign: "center", marginBottom: 6 }}>{sel.title}</h3>
              <p style={{ fontFamily: t.fontMono, fontSize: 13, color: sel.color, textAlign: "center", marginBottom: 8 }}>{sel.issuer}</p>
              <p style={{ fontFamily: t.fontMono, fontSize: 12, color: t.inkMuted, textAlign: "center", marginBottom: 16 }}>Issued: {sel.year}</p>
              <p style={{ fontFamily: t.fontBody, fontSize: 14, color: t.inkLight, lineHeight: 1.7, textAlign: "center" }}>{sel.desc}</p>
            </SketchFrame>
          </div>
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   AI PORTFOLIO ASSISTANT
══════════════════════════════════════════════════════════════ */
function AIAssistant({ onClose }) {
  const t = useTh();
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hey! I'm Akash's AI assistant 👋 Ask me anything about his skills, projects, experience, or how to get in touch!" }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const SYSTEM = `You are Akash Maity's friendly portfolio assistant. You help visitors learn about Akash.
FACTS about Akash:
- Name: Akash Maity, Full Stack Developer, BCA Graduate (JIS University, CGPA 7.71, Highest Honors, 2023-2026)
- Location: Baranagar, Kolkata, West Bengal, India
- Email: am6030920@gmail.com, Phone: 9831403680
- GitHub: github.com/Akash8311, LinkedIn: linkedin.com/in/akash-maity-aa917b38a
- Skills: React, Node.js, Express, MongoDB, JavaScript, JWT, REST APIs, Python (learning), Java, C++, SQL, Git, Docker, Three.js
- Experience: Full Stack Developer Intern at Prasarnet Consulting Services (2025) — built NovaExam, production features, JWT auth systems
- Projects: NovaExam (live exam platform), AI Resume Builder (OpenAI + MERN), NovaMart (e-commerce), Image Search (Unsplash API), Age Calculator, Portfolio
- Currently learning: Python (scripting, automation, ML)
- Personality: Creative, curious, coffee-fueled developer who treats every project like a sketchbook page
- Open to: Full-time SWE roles, freelance, collaboration
Keep answers friendly, concise, and enthusiastic. Use emojis occasionally.`;

  const send = async () => {
    if (!inp.trim() || loading) return;
    const userMsg = inp.trim();
    setInp("");
    setMsgs(m => [...m, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM,
          messages: [...msgs.filter(m => m.role !== "assistant" || msgs.indexOf(m) > 0).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })), { role: "user", content: userMsg }],
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Hmm, I had trouble with that. Try asking something else!";
      setMsgs(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMsgs(m => [...m, { role: "assistant", text: "Oops! My connection hiccuped. Try again?" }]);
    }
    setLoading(false);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 400, height: 520, display: "flex", flexDirection: "column", animation: "fadeUp .3s ease" }}>
        <SketchFrame accent={t.accent4} pad="0" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `2px solid ${t.accent4}33`, display: "flex", justifyContent: "space-between", alignItems: "center", background: `${t.accent4}11` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🤖</span>
              <div>
                <div style={{ fontFamily: t.font, fontSize: 18, fontWeight: 700, color: t.ink }}>Ask Akash's AI</div>
                <div style={{ fontFamily: t.fontMono, fontSize: 10, color: t.accent4 }}>● Online</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: t.inkMuted }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "10px 14px",
                  background: m.role === "user" ? `${t.accent4}22` : `${t.bgDark}`,
                  border: `1.5px solid ${m.role === "user" ? t.accent4 : t.border}44`,
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px" }}>
                  <p style={{ fontFamily: t.fontBody, fontSize: 13, color: t.ink, lineHeight: 1.5, margin: 0 }}>{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "8px 14px" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent4, animation: `bob .8s ease ${i * 0.15}s infinite` }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: `2px solid ${t.border}22`, display: "flex", gap: 8 }}>
            <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask me anything..." style={{ flex: 1, background: `${t.bgDark}`, border: `1.5px solid ${t.border}44`, borderRadius: 8, padding: "8px 12px",
                fontFamily: t.fontBody, fontSize: 13, color: t.ink, outline: "none" }} />
            <button onClick={send} style={{ padding: "8px 14px", background: t.accent4, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16 }}>➤</button>
          </div>
        </SketchFrame>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════════ */
function ContactSection() {
  const t = useTh();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "err"

  const handleSend = async () => {
    if (!form.name || !form.email || !form.msg) { setStatus("err"); setTimeout(() => setStatus(null), 3000); return; }
    setStatus("sending");
    // Simulate send (EmailJS requires keys)
    await new Promise(r => setTimeout(r, 1600));
    setStatus("ok");
    setForm({ name: "", email: "", msg: "" });
    setTimeout(() => setStatus(null), 4000);
  };

  const field = (key, placeholder, multiline = false) => {
    const Tag = multiline ? "textarea" : "input";
    return (
      <Tag value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder} rows={multiline ? 4 : undefined}
        style={{ width: "100%", background: `${t.bgDark}`, border: `2px solid ${status === "err" && !form[key] ? t.accent : t.border}44`,
          borderRadius: t.id === "retro" ? 0 : 8, padding: "12px 16px", fontFamily: t.fontBody, fontSize: 14, color: t.ink,
          outline: "none", resize: multiline ? "vertical" : "none", marginBottom: 14,
          transition: "border-color .2s", boxShadow: t.id === "cyberpunk" ? `inset 0 0 8px ${t.accent3}11` : "none",
          ":focus": { borderColor: t.accent3 } }} />
    );
  };

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <SectionTag>📬 Contact</SectionTag>
        <SectionTitle accent={t.accent}>Let's doodle something together</SectionTitle>
        <p style={{ fontFamily: t.fontBody, fontSize: 15, color: t.inkLight, marginBottom: 32, lineHeight: 1.7 }}>
          Got a project, an idea, or just want to talk code? Drop a message — I reply within 24 hours.
        </p>
        <SketchFrame accent={t.accent} pad="32px">
          {field("name", "Your name ✏️")}
          {field("email", "your@email.com 📧")}
          {field("msg", "What's on your mind? 💭", true)}
          <SketchBtn onClick={handleSend} color={t.accent} style={{ width: "100%" }}>
            {status === "sending" ? "⚙️ Sending..." : status === "ok" ? "✅ Message Sent!" : status === "err" ? "⚠️ Please fill all fields" : "📤 Send Message"}
          </SketchBtn>
          {status === "ok" && (
            <div style={{ marginTop: 16, animation: "fadeUp .3s ease" }}>
              <p style={{ fontFamily: t.fontBody, fontSize: 14, color: t.accent2 }}>🎉 Got it! I'll get back to you soon.</p>
            </div>
          )}
        </SketchFrame>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <SketchBtn href={`mailto:${RESUME_DATA.email}`} color={t.accent}>✉️ {RESUME_DATA.email}</SketchBtn>
          <SketchBtn href={`tel:${RESUME_DATA.phone}`} color={t.accent2}>📞 {RESUME_DATA.phone}</SketchBtn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const t = useTh();
  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTag>💬 Testimonials</SectionTag>
        <SectionTitle accent={t.accent2}>What people say</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
          {TESTIMONIALS.map((tm, i) => (
            <div key={i} style={{ animation: `fadeUp .5s ease ${i * 100}ms both` }}>
              <SketchFrame accent={tm.color} pad="24px" rotate={[-2, 1, -1][i]}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{tm.emoji}</div>
                <p style={{ fontFamily: t.fontBody, fontSize: 14, color: t.ink, lineHeight: 1.75, fontStyle: "italic", marginBottom: 16 }}>"{tm.text}"</p>
                <div style={{ borderTop: `1.5px dashed ${tm.color}55`, paddingTop: 12 }}>
                  <p style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 13, color: t.ink }}>{tm.name}</p>
                  <p style={{ fontFamily: t.fontMono, fontSize: 11, color: tm.color }}>{tm.role}</p>
                </div>
              </SketchFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════════════════ */
function ProjectsSection({ onOpen }) {
  const t = useTh();
  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionTag>🖼️ Projects</SectionTag>
          <SectionTitle accent={t.ink}>Frames hung along the way</SectionTitle>
          <p style={{ fontFamily: t.fontBody, color: t.inkLight, fontSize: 15, maxWidth: 460, margin: "0 auto" }}>Click any frame — see features, tech stack, and the story behind it.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 28 }}>
          {PROJECTS.map((p, i) => {
            const statusLabel = { live: "🟢 Live", wip: "🟡 WIP", done: "✅ Done" };
            return (
              <div key={p.title} className="project-card" onClick={() => onOpen(p)}
                style={{ cursor: "pointer", animation: `fadeUp .5s ease ${i * 70}ms both`, transition: "transform .25s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                <SketchFrame accent={p.color} pad="22px" rotate={i % 2 === 0 ? -2 : 2}>
                  <div style={{ position: "absolute", top: -12, left: "50%", width: 60, height: 20, background: `${p.color}bb`, transform: "translateX(-50%) rotate(-3deg)", borderRadius: 2 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 40 }}>{p.emoji}</span>
                    <span style={{ fontFamily: t.fontMono, fontSize: 11, color: p.color, background: `${p.color}18`, border: `1.5px solid ${p.color}44`, borderRadius: 6, padding: "2px 7px" }}>
                      {statusLabel[p.status] || "📍 Here"}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: t.font, fontSize: 26, fontWeight: 700, color: t.ink, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontFamily: t.fontBody, fontSize: 13, color: t.inkLight, lineHeight: 1.6, marginBottom: 12 }}>{p.blurb}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                    {p.tech.slice(0, 3).map(tc => (
                      <span key={tc} style={{ fontFamily: t.fontMono, fontSize: 11, color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}44`, borderRadius: 4, padding: "2px 7px" }}>{tc}</span>
                    ))}
                    {p.tech.length > 3 && <span style={{ fontFamily: t.fontMono, fontSize: 11, color: t.inkMuted }}>+{p.tech.length - 3}</span>}
                  </div>
                  <span style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 12, color: p.color }}>Tap to explore ✦</span>
                  {t.id === "cyberpunk" && <div className="card-glow" style={{ position: "absolute", inset: -2, borderRadius: 12, boxShadow: `0 0 20px ${p.color}55`, opacity: 0, transition: "opacity .3s", pointerEvents: "none" }} />}
                </SketchFrame>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project: p, onClose }) {
  const t = useTh();
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  const statusLabel = { live: "🟢 Live", wip: "🟡 Work in Progress", done: "✅ Complete" };
  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
        <SketchFrame accent={p.color} pad="32px">
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "transparent", border: "none", fontSize: 20, cursor: "pointer", color: t.inkLight }}>✕</button>
          <div style={{ position: "absolute", top: -14, left: "50%", width: 80, height: 26, background: `${p.color}bb`, transform: "translateX(-50%) rotate(-2deg)", borderRadius: 3 }} />
          <div style={{ fontSize: 50, marginBottom: 8 }}>{p.emoji}</div>
          <h3 style={{ fontFamily: t.font, fontSize: 36, fontWeight: 700, color: t.ink, marginBottom: 4 }}>{p.title}</h3>
          <span style={{ fontFamily: t.fontMono, fontSize: 12, color: p.color }}>{statusLabel[p.status]}</span>
          <p style={{ fontFamily: t.fontBody, fontSize: 14, color: t.inkLight, lineHeight: 1.7, margin: "14px 0" }}>{p.blurb}</p>
          {p.story && (
            <div style={{ background: `${p.color}12`, border: `1.5px solid ${p.color}33`, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
              <p style={{ fontFamily: t.fontMono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: p.color, marginBottom: 6 }}>📖 Story</p>
              <p style={{ fontFamily: t.fontBody, fontSize: 13, color: t.ink, lineHeight: 1.6, margin: 0 }}>{p.story}</p>
            </div>
          )}
          <div style={{ background: `${p.color}10`, border: `1.5px solid ${p.color}33`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
            <p style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: p.color, margin: "0 0 10px" }}>✦ Features</p>
            {p.details.map((d, i) => <p key={i} style={{ fontFamily: t.fontBody, fontSize: 13, color: t.ink, margin: "0 0 6px", lineHeight: 1.5 }}>{d}</p>)}
          </div>
          <p style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: t.inkMuted, marginBottom: 8 }}>🛠 Stack</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
            {p.tech.map(tc => <span key={tc} style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 12, color: p.color, background: `${p.color}18`, border: `1.5px solid ${p.color}55`, borderRadius: 5, padding: "3px 10px" }}>{tc}</span>)}
          </div>
          {p.link !== "#" && <SketchBtn href={p.link} target="_blank" color={p.color}>Visit Project →</SketchBtn>}
        </SketchFrame>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   EASTER EGG + BADGES
══════════════════════════════════════════════════════════════ */
const BADGES = [
  { id: "ghost", emoji: "👻", label: "Ghost Hunter", desc: "Found the doodle ghost!" },
  { id: "coffee", emoji: "☕", label: "Coffee Buddy", desc: "Discovered Akash's fuel source." },
  { id: "plane", emoji: "✈️", label: "Explorer", desc: "Caught a paper airplane mid-flight!" },
  { id: "cat", emoji: "🐱", label: "Cat Whisperer", desc: "Woke up the judgy cat." },
  { id: "feather", emoji: "🪶", label: "Full Sketchbook", desc: "Read every single page." },
];

function EasterEggLayer({ onFound }) {
  return (
    <>
      {EASTER_EGGS.map(eg => (
        <button key={eg.id} className="easter-egg-btn" onClick={() => onFound(eg.id, eg.msg)}
          aria-label="Hidden easter egg" style={{ position: "fixed", border: "none", background: "transparent",
            fontSize: 28, cursor: "pointer", opacity: 0.4, lineHeight: 1, zIndex: 50,
            animation: "float 4s ease-in-out infinite", ...eg.pos }}>
          {eg.emoji}
        </button>
      ))}
    </>
  );
}

function BadgesModal({ found, onClose }) {
  const t = useTh();
  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 350, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 440, width: "100%", animation: "fadeUp .3s ease" }}>
        <SketchFrame accent={t.accent4} pad="28px">
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "transparent", border: "none", fontSize: 20, cursor: "pointer", color: t.inkLight }}>✕</button>
          <h3 style={{ fontFamily: t.font, fontSize: 30, fontWeight: 700, color: t.ink, marginBottom: 4 }}>🏅 Secret Badges</h3>
          <p style={{ fontFamily: t.fontMono, fontSize: 12, color: t.inkMuted, marginBottom: 20 }}>{found.size}/{BADGES.length} unlocked — keep exploring!</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {BADGES.map(b => {
              const unlocked = found.has(b.id);
              return (
                <div key={b.id} style={{ display: "flex", gap: 14, alignItems: "center", opacity: unlocked ? 1 : 0.35, filter: unlocked ? "none" : "grayscale(1)" }}>
                  <span style={{ fontSize: 28 }}>{unlocked ? b.emoji : "🔒"}</span>
                  <div>
                    <p style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 13, color: unlocked ? t.ink : t.inkMuted }}>{b.label}</p>
                    <p style={{ fontFamily: t.fontBody, fontSize: 12, color: t.inkLight }}>{unlocked ? b.desc : "Hidden..."}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SketchFrame>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GUIDE CHARACTER
══════════════════════════════════════════════════════════════ */
function GuideChar({ message }) {
  const t = useTh();
  const pupL = useRef(null), pupR = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const h = e => { mouse.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 }; };
    window.addEventListener("mousemove", h);
    let raf;
    const loop = () => {
      [pupL, pupR].forEach(r => { if (r.current) r.current.setAttribute("transform", `translate(${mouse.current.x * 3},${mouse.current.y * 3})`); });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", h); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, pointerEvents: "none" }}>
      <SketchFrame accent={t.border} bg={t.bgCard} rotate={-1} pad="10px 14px" style={{ maxWidth: 200 }}>
        <p style={{ margin: 0, fontFamily: t.fontBody, fontSize: 12, color: t.ink, lineHeight: 1.5 }}>{message}</p>
      </SketchFrame>
      <div style={{ animation: "bob 2.6s ease-in-out infinite" }}>
        <svg width="80" height="112" viewBox="0 0 90 120">
          <rect x="25" y="10" width="40" height="80" rx="6" fill={t.accent5} stroke={t.ink} strokeWidth="3" />
          <rect x="25" y="0" width="40" height="14" rx="4" fill={t.accent} stroke={t.ink} strokeWidth="3" />
          <path d="M30 90 L60 90 L45 116 Z" fill={t.bg} stroke={t.ink} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="45" cy="106" r="3" fill={t.ink} />
          <circle cx="36" cy="42" r="8" fill="#fff" stroke={t.ink} strokeWidth="2" />
          <circle cx="54" cy="42" r="8" fill="#fff" stroke={t.ink} strokeWidth="2" />
          <g ref={pupL}><circle cx="36" cy="42" r="3.5" fill={t.ink} /></g>
          <g ref={pupR}><circle cx="54" cy="42" r="3.5" fill={t.ink} /></g>
          <line x1="25" y1="56" x2="8" y2="70" stroke={t.ink} strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="56" x2="82" y2="40" stroke={t.ink} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   THEME SWITCHER
══════════════════════════════════════════════════════════════ */
function ThemeSwitcher({ current, onChange }) {
  const t = THEMES[current];
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", top: 16, right: 16, zIndex: 100 }}>
      <button onClick={() => setOpen(o => !o)} style={{ fontFamily: t.fontMono, fontWeight: 700, fontSize: 12, padding: "10px 16px",
        background: t.bgCard, border: `2.5px solid ${t.border}`, borderRadius: 10, cursor: "pointer", color: t.ink,
        boxShadow: t.id === "cyberpunk" ? `0 0 12px ${t.accent}` : "none" }}>
        {t.label} ▾
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 6, background: t.bgCard, border: `2px solid ${t.border}44`, borderRadius: 10, overflow: "hidden", minWidth: 140, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {Object.values(THEMES).map(th => (
            <button key={th.id} onClick={() => { onChange(th.id); setOpen(false); }} style={{ display: "block", width: "100%", padding: "10px 16px",
              background: th.id === current ? `${t.accent}22` : "transparent", border: "none", textAlign: "left",
              fontFamily: th.fontMono, fontSize: 12, color: t.ink, cursor: "pointer" }}>
              {th.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISITOR COUNTER (localStorage-based)
══════════════════════════════════════════════════════════════ */
function useVisitorCount() {
  const [count, setCount] = useState(0);
  const [returning, setReturning] = useState(false);
  useEffect(() => {
    try {
      const key = "akash_portfolio_visits";
      const prev = parseInt(localStorage.getItem(key) || "0", 10);
      const newCount = prev + 1;
      localStorage.setItem(key, String(newCount));
      setCount(newCount + 1247); // seed with base count
      setReturning(prev > 0);
    } catch {}
  }, []);
  return { count, returning };
}

/* ══════════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════════ */
function HeroSection({ visitors }) {
  const t = useTh();
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer", "MERN Specialist", "BCA Graduate", "Curious Builder"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    const type = () => {
      const role = roles[roleIdx.current];
      if (!deleting.current) {
        if (charIdx.current < role.length) {
          setTyped(role.slice(0, ++charIdx.current));
          timeout = setTimeout(type, 75);
        } else {
          timeout = setTimeout(() => { deleting.current = true; type(); }, 2200);
        }
      } else {
        if (charIdx.current > 0) {
          setTyped(role.slice(0, --charIdx.current));
          timeout = setTimeout(type, 35);
        } else {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
          timeout = setTimeout(type, 300);
        }
      }
    };
    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", position: "relative", zIndex: 5 }}>
      {/* Visitor badge */}
      {visitors.count > 0 && (
        <div style={{ position: "absolute", top: 16, left: 16, animation: "fadeUp .5s ease .3s both" }}>
          <SketchFrame accent={t.accent2} pad="6px 14px">
            <span style={{ fontFamily: t.fontMono, fontSize: 11, color: t.accent2 }}>
              {visitors.returning ? "👋 Welcome back!" : "✨ Visitor"} #{visitors.count.toLocaleString()}
            </span>
          </SketchFrame>
        </div>
      )}

      <div style={{ animation: "fadeUp .6s ease .1s both" }}>
        <SketchFrame accent={t.border} bg={`${t.bgCard}cc`} rotate={-1} pad="5px 14px" style={{ display: "inline-block", marginBottom: 16 }}>
          <span style={{ fontFamily: t.fontMono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: t.inkMuted }}>✏️ welcome to my sketchbook</span>
        </SketchFrame>
      </div>

      <h1 style={{ fontFamily: t.font, fontWeight: 700, fontSize: "clamp(48px,11vw,120px)", color: t.ink, lineHeight: 1.05, margin: "0 0 12px", animation: "fadeUp .6s ease .25s both" }}>
        Hi, I'm Akash Maity{" "}
        <span style={{ display: "inline-block", animation: "wiggle 3s ease-in-out infinite" }}>👋</span>
      </h1>

      <div style={{ fontFamily: t.font, fontSize: "clamp(20px,4vw,36px)", color: t.accent, minHeight: 48, marginBottom: 16, animation: "fadeUp .6s ease .4s both" }}>
        {typed}<span style={{ animation: "blink 1s infinite" }}>|</span>
      </div>

      <p style={{ fontFamily: t.fontBody, fontSize: "clamp(14px,2vw,18px)", color: t.inkLight, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8, animation: "fadeUp .6s ease .55s both" }}>
        Full-stack developer who treats every project like a page in a sketchbook —
        a little messy, a little weird, always made with care.
      </p>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48, animation: "fadeUp .6s ease .7s both" }}>
        <SketchBtn href={RESUME_DATA.github} target="_blank" color={t.ink}>GitHub 🐙</SketchBtn>
        <SketchBtn href={RESUME_DATA.linkedin} target="_blank" color={t.accent3}>LinkedIn 💼</SketchBtn>
        <SketchBtn href={`mailto:${RESUME_DATA.email}`} color={t.accent}>Say hi ✉️</SketchBtn>
      </div>

      <div style={{ animation: "float 2.5s ease-in-out infinite", opacity: 0.6 }}>
        <p style={{ fontFamily: t.fontMono, color: t.inkMuted, fontSize: 12, letterSpacing: "0.1em" }}>walk down the hallway ↓</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════════════════ */
function AboutSection() {
  const t = useTh();
  const facts = [
    { icon: "📚", title: "Education", text: "BCA at JIS University — 7.71 CGPA, Highest Honors. Graduated 2026.", color: t.accent5 + "33" },
    { icon: "💼", title: "Currently", text: "Full Stack Dev Intern at Prasarnet — breaking and fixing things in production.", color: t.accent3 + "33" },
    { icon: "🐍", title: "Learning", text: "Deep diving into Python — scripting, automation & a little ML curiosity.", color: t.accent2 + "33" },
    { icon: "🎯", title: "Chasing", text: "Clean architecture, user-focused design, and the perfect cup of coffee.", color: t.accent + "33" },
  ];

  return (
    <section style={{ padding: "80px 24px", position: "relative", zIndex: 5 }}>
      <div className="about-grid" style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 48, alignItems: "start" }}>
        <div>
          <SectionTag>page two — about me</SectionTag>
          <SectionTitle accent={t.ink}>The "who is this guy" page</SectionTitle>
          <SketchFrame accent={t.accent3} bg={`${t.accent3}10`} pad="20px 24px" style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: t.ink, margin: 0, fontFamily: t.fontBody }}>
              <strong style={{ fontFamily: t.font, fontSize: 22, color: t.accent3 }}>Full-Stack Developer</strong> specializing in the <strong>MERN stack</strong> — React, Node.js, Express, MongoDB. I build things end-to-end, from auth systems and REST APIs to polished UIs.
            </p>
          </SketchFrame>
          <SketchFrame accent={t.accent4} bg={`${t.accent4}10`} pad="20px 24px" style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: t.ink, margin: 0, fontFamily: t.fontBody }}>
              Built <strong>NovaExam</strong> — a secure online exam platform with timed assessments, automated scoring, analytics, and certificate generation. All from scratch, end to end, solo.
            </p>
          </SketchFrame>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: t.inkLight, fontFamily: t.fontBody }}>
            Passionate about solving real-world problems through clean architecture and user-focused design. Currently completing my BCA at JIS University with a 7.71 CGPA — Highest Honors.
          </p>

          {/* Python learning badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 24, padding: "14px 22px",
            background: `linear-gradient(135deg,${t.accent2}22,${t.accent3}22)`,
            border: `2.5px solid ${t.accent2}`, borderRadius: t.id === "retro" ? 0 : 16,
            animation: "float 5s ease-in-out infinite", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,transparent,${t.accent2}18,transparent)`, backgroundSize: "200%", animation: "shimmer 3s linear infinite" }} />
            <span style={{ fontSize: 26, position: "relative" }}>🐍</span>
            <div style={{ position: "relative" }}>
              <p style={{ margin: 0, fontFamily: t.fontMono, fontWeight: 700, fontSize: 11, color: t.accent2, letterSpacing: "0.08em", textTransform: "uppercase" }}>Currently Learning</p>
              <p style={{ margin: 0, fontFamily: t.font, fontWeight: 700, fontSize: 20, color: t.ink }}>Python — scripting, automation & ML</p>
            </div>
            <div style={{ position: "relative", width: 10, height: 10 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: t.accent2, animation: "pulseRing 1.8s ease-out infinite" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: t.accent2 }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {facts.map((f, i) => (
            <div key={f.title} style={{ animation: `fadeUp .5s ease ${i * 80}ms both` }}>
              <SketchFrame accent={t.border} bg={f.color} pad="16px 18px" rotate={[-2, 1.5, -1, 2.5][i]}>
                <p style={{ fontFamily: t.fontMono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: t.ink, marginBottom: 6 }}>{f.icon} {f.title}</p>
                <p style={{ fontFamily: t.fontBody, fontSize: 14, color: t.ink, lineHeight: 1.6, margin: 0 }}>{f.text}</p>
              </SketchFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════ */
export default function AkashPortfolio() {
  const [themeId, setThemeId] = useState("sketchbook");
  const theme = THEMES[themeId];

  const [activeSection, setActiveSection] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [foundEggs, setFoundEggs] = useState(new Set());
  const [showBadges, setShowBadges] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const sectionRefs = useRef([]);
  const visitors = useVisitorCount();

  // Inject styles whenever theme changes
  useEffect(() => { injectStyles(theme); }, [theme]);

  // Scroll tracking
  useEffect(() => {
    const h = () => {
      const mid = window.innerHeight / 2;
      let active = 0;
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) active = i;
      });
      setActiveSection(active);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const setRef = i => el => { sectionRefs.current[i] = el; };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleEggFound = (id, msg) => {
    if (!foundEggs.has(id)) {
      const next = new Set(foundEggs);
      next.add(id);
      setFoundEggs(next);
      showToast(msg);
      if (next.size === BADGES.length) {
        setTimeout(() => showToast("🏆 YOU FOUND ALL EASTER EGGS! You're a true explorer!"), 3200);
      }
    } else {
      showToast(msg);
    }
  };

  return (
    <ThCtx.Provider value={theme}>
      <ThemeSwitcher current={themeId} onChange={setThemeId} />

      {/* Theme-specific font imports */}
      {(themeId === "cyberpunk" || themeId === "retro") && (
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Share+Tech+Mono&family=Press+Start+2P&family=VT323&display=swap');`}</style>
      )}

      {/* Cyberpunk extra accent line */}
      {themeId === "cyberpunk" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${theme.accent},${theme.accent2},${theme.accent3},${theme.accent})`, zIndex: 200 }} />
      )}

      <EasterEggLayer onFound={handleEggFound} />
      <GuideChar message={GUIDE_MSGS[Math.min(activeSection, GUIDE_MSGS.length - 1)]} />

      {/* Toast */}
      {toast && (
        <div className="toast-anim" style={{ position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)", zIndex: 200, maxWidth: "90vw" }}>
          <SketchFrame accent={theme.accent4} bg={theme.bgCard} rotate={-1} pad="12px 22px">
            <p style={{ margin: 0, fontFamily: theme.fontBody, fontSize: 14, color: theme.ink, whiteSpace: "nowrap" }}>{toast}</p>
          </SketchFrame>
        </div>
      )}

      {/* Badges button */}
      <button onClick={() => setShowBadges(true)} style={{ position: "fixed", bottom: 16, left: 16, zIndex: 60,
        background: theme.bgCard, border: `2px solid ${theme.border}`, borderRadius: theme.id === "retro" ? 0 : 10,
        padding: "8px 14px", cursor: "pointer", fontFamily: theme.fontMono, fontSize: 12, color: theme.ink,
        boxShadow: theme.id === "cyberpunk" ? `0 0 10px ${theme.accent4}` : "none" }}>
        🏅 Badges ({foundEggs.size}/{BADGES.length})
      </button>

      {/* AI assistant button */}
      <button onClick={() => setShowAI(true)} style={{ position: "fixed", bottom: 56, left: 16, zIndex: 60,
        background: theme.bgCard, border: `2px solid ${theme.accent4}`, borderRadius: theme.id === "retro" ? 0 : 10,
        padding: "8px 14px", cursor: "pointer", fontFamily: theme.fontMono, fontSize: 12, color: theme.accent4,
        boxShadow: theme.id === "cyberpunk" ? `0 0 10px ${theme.accent4}` : "none", marginTop: 4 }}>
        🤖 Ask AI
      </button>

      {showBadges && <BadgesModal found={foundEggs} onClose={() => setShowBadges(false)} />}
      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}

      <main>
        <div ref={setRef(0)}><HeroSection visitors={visitors} /></div>
        <div ref={setRef(1)}><AboutSection /></div>
        <div ref={setRef(2)}><ExperienceSection /></div>
        <div ref={setRef(3)}><ProjectsSection onOpen={setOpenProject} /></div>
        <div ref={setRef(4)}><SkillsSection /></div>
        <div ref={setRef(5)}><TimelineSection /></div>
        <div ref={setRef(6)}><CertsSection /></div>
        <div ref={setRef(7)}><GitHubDashboard /></div>
        <div ref={setRef(8)}><TestimonialsSection /></div>
        <div ref={setRef(9)}><ResumeSection /></div>
        <div ref={setRef(10)}><ContactSection /></div>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "40px 24px 80px", position: "relative", zIndex: 5 }}>
          <p style={{ fontFamily: theme.fontMono, color: theme.inkMuted, fontSize: 12 }}>
            Made with ✏️ + ☕ by Akash Maity · {new Date().getFullYear()}
          </p>
          <p style={{ fontFamily: theme.fontMono, color: theme.inkMuted, fontSize: 11, marginTop: 6 }}>
            React · Three.js (Sketchbook hallway) · Framer Motion · CSS · Lots of coffee
          </p>
        </footer>
      </main>
    </ThCtx.Provider>
  );
}