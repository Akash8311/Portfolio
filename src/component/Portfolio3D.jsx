// import React, { useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Stars, OrbitControls, Float, Html } from '@react-three/drei';
// import { motion, AnimatePresence } from 'framer-motion';
// import * as THREE from 'three';

// /* ─── Design tokens ─────────────────────────────────────────────────── */
// const C = {
//   cyan:    '#00f5ff',
//   blue:    '#3b82f6',
//   purple:  '#a855f7',
//   pink:    '#ec4899',
//   green:   '#00ff88',
//   amber:   '#f59e0b',
//   bg:      '#020409',
//   surface: 'rgba(255,255,255,0.04)',
//   border:  'rgba(0,245,255,0.18)',
//   text:    '#e2e8f0',
//   muted:   '#64748b',
// };

// const glow = (color, size = 20) => `0 0 ${size}px ${color}55, 0 0 ${size * 2}px ${color}22`;

// /* ─── Global styles ─────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

//   body { font-family: 'Space Grotesk', sans-serif; }

//   @keyframes orbit-spin { to { transform: rotate(360deg); } }
//   @keyframes pulse-ring {
//     0%   { transform: scale(1);   opacity: 0.8; }
//     100% { transform: scale(2.2); opacity: 0; }
//   }
//   @keyframes holo-flicker {
//     0%,100% { opacity: 1; }
//     92%      { opacity: 0.95; }
//     93%      { opacity: 0.7; }
//     94%      { opacity: 1; }
//   }
//   @keyframes neon-drift {
//     0%,100% { text-shadow: 0 0 10px #00f5ff, 0 0 30px #00f5ff44; }
//     50%      { text-shadow: 0 0 20px #00f5ff, 0 0 60px #00f5ff66, 0 0 100px #00f5ff22; }
//   }
//   @keyframes data-stream {
//     0%   { transform: translateY(-100%); opacity: 0; }
//     10%  { opacity: 1; }
//     90%  { opacity: 1; }
//     100% { transform: translateY(100vh); opacity: 0; }
//   }
//   @keyframes rotate-border {
//     to { background-position: 200% center; }
//   }
//   @keyframes shimmer {
//     0%   { background-position: -200% center; }
//     100% { background-position:  200% center; }
//   }
//   @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
//   @keyframes float-up { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
// `;

// function StyleInjector() {
//   useEffect(() => {
//     const el = document.createElement('style');
//     el.textContent = GLOBAL_CSS;
//     document.head.appendChild(el);
//     return () => el.remove();
//   }, []);
//   return null;
// }

// /* ─── Data stream (decorative) ───────────────────────────────────────── */
// const DataStream = ({ left }) => {
//   const chars = '01アイウエオカキクケコサシスセソ'.split('');
//   const col = Array.from({ length: 20 }, (_, i) => ({
//     id: i, char: chars[Math.floor(Math.random() * chars.length)],
//     delay: Math.random() * 3, dur: Math.random() * 4 + 3,
//     opacity: Math.random() * 0.4 + 0.1,
//   }));

//   return (
//     <div style={{ position: 'absolute', [left ? 'left' : 'right']: 0, top: 0, bottom: 0, width: 80, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
//       {col.map(c => (
//         <div key={c.id} style={{
//           position: 'absolute',
//           top: `${Math.random() * 100}%`,
//           left: `${(c.id / 20) * 100}%`,
//           color: C.cyan,
//           fontSize: 11,
//           opacity: c.opacity,
//           fontFamily: 'JetBrains Mono, monospace',
//           animation: `data-stream ${c.dur}s ${c.delay}s linear infinite`,
//           textShadow: `0 0 6px ${C.cyan}`,
//         }}>{c.char}</div>
//       ))}
//     </div>
//   );
// };

// /* ─── 3D: Rotating Core ─────────────────────────────────────────────── */
// const RotatingCore = () => {
//   const outer = useRef();
//   const inner = useRef();
//   const ring1 = useRef();
//   const ring2 = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (outer.current) { outer.current.rotation.x += 0.003; outer.current.rotation.y += 0.005; }
//     if (inner.current) { inner.current.rotation.x -= 0.007; inner.current.rotation.z += 0.004; }
//     if (ring1.current) { ring1.current.rotation.z = t * 0.6; }
//     if (ring2.current) { ring2.current.rotation.x = t * 0.4; ring2.current.rotation.y = t * 0.3; }
//   });

//   return (
//     <group>
//       {/* Outer geodesic wireframe */}
//       <mesh ref={outer}>
//         <icosahedronGeometry args={[1.6, 4]} />
//         <meshStandardMaterial emissive="#00f5ff" emissiveIntensity={0.9} wireframe color="#00f5ff" transparent opacity={0.7} />
//         <pointLight intensity={3} distance={80} color="#00f5ff" />
//       </mesh>

//       {/* Inner solid core */}
//       <mesh ref={inner} scale={0.6}>
//         <icosahedronGeometry args={[1, 2]} />
//         <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.2} metalness={0.9} roughness={0.1} />
//         <pointLight intensity={2} distance={40} color="#00ff88" />
//       </mesh>

//       {/* Orbit ring 1 */}
//       <mesh ref={ring1}>
//         <torusGeometry args={[2.8, 0.03, 8, 100]} />
//         <meshStandardMaterial color={C.cyan} emissive={C.cyan} emissiveIntensity={0.6} />
//       </mesh>

//       {/* Orbit ring 2 */}
//       <mesh ref={ring2}>
//         <torusGeometry args={[3.4, 0.02, 8, 100]} />
//         <meshStandardMaterial color={C.purple} emissive={C.purple} emissiveIntensity={0.5} />
//       </mesh>
//     </group>
//   );
// };

// /* ─── 3D: Floating Connection Lines ─────────────────────────────────── */
// const ConnectionLine = ({ from, to }) => {
//   const ref = useRef();
//   useEffect(() => {
//     if (!ref.current) return;
//     const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
//     ref.current.setFromPoints(points);
//   }, [from, to]);

//   return (
//     <line>
//       <bufferGeometry ref={ref} />
//       <lineBasicMaterial color={C.cyan} transparent opacity={0.15} />
//     </line>
//   );
// };

// /* ─── 3D: Project Card ──────────────────────────────────────────────── */
// const ProjectCard3D = ({ position, project, index }) => {
//   const [hovered, setHovered] = useState(false);
//   const colors = [C.cyan, C.blue, C.purple, C.pink, C.green, C.amber];
//   const c = colors[index % colors.length];

//   return (
//     <Float speed={1 + index * 0.25} rotationIntensity={0.3} floatIntensity={0.8} position={position}>
//       <group>
//         {/* Card mesh */}
//         <mesh
//           onPointerEnter={() => setHovered(true)}
//           onPointerLeave={() => setHovered(false)}
//         >
//           <boxGeometry args={[2.4, 2.8, 0.15]} />
//           <meshStandardMaterial
//             color={hovered ? c : '#0a0f1e'}
//             emissive={hovered ? c : '#00274d'}
//             emissiveIntensity={hovered ? 0.5 : 0.15}
//             metalness={0.9}
//             roughness={0.1}
//             transparent
//             opacity={0.92}
//           />
//         </mesh>

//         {/* Glow rim */}
//         {hovered && (
//           <mesh>
//             <boxGeometry args={[2.5, 2.9, 0.12]} />
//             <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.3} transparent opacity={0.2} />
//           </mesh>
//         )}

//         {/* HTML overlay */}
//         <Html distanceFactor={1.4} position={[0, 0, 0.12]} style={{ pointerEvents: 'auto' }}>
//           <div style={{
//             width: 180,
//             padding: '16px 14px',
//             background: hovered ? `linear-gradient(135deg, ${c}22, rgba(2,4,9,0.95))` : 'rgba(2,4,9,0.88)',
//             backdropFilter: 'blur(16px)',
//             borderRadius: 12,
//             border: `1px solid ${hovered ? c : 'rgba(0,245,255,0.2)'}`,
//             boxShadow: hovered ? glow(c, 20) : 'none',
//             transition: 'all 0.3s ease',
//             animation: 'holo-flicker 8s ease-in-out infinite',
//           }}>
//             {/* Header */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: hovered ? 10 : 4 }}>
//               <div style={{
//                 width: 8, height: 8, borderRadius: '50%', background: c,
//                 boxShadow: `0 0 8px ${c}`, flexShrink: 0,
//                 animation: 'blink 2s ease-in-out infinite',
//               }} />
//               <h3 style={{
//                 fontSize: 14, fontWeight: 700, color: hovered ? c : C.text,
//                 fontFamily: 'Space Grotesk, sans-serif',
//                 textShadow: hovered ? `0 0 12px ${c}88` : 'none',
//                 transition: 'all 0.3s',
//               }}>{project.name}</h3>
//             </div>

//             <AnimatePresence>
//               {hovered && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 8 }}
//                   transition={{ duration: 0.25 }}
//                 >
//                   <p style={{
//                     fontSize: 12, color: '#94a3b8', lineHeight: 1.5,
//                     marginBottom: 12, fontFamily: 'Space Grotesk, sans-serif',
//                   }}>{project.description}</p>

//                   <div style={{ display: 'flex', gap: 8 }}>
//                     {project.link && project.link !== '#' && (
//                       <a
//                         href={project.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{
//                           flex: 1, padding: '7px 0', textAlign: 'center',
//                           background: c, color: '#000',
//                           borderRadius: 7, fontSize: 11, fontWeight: 700,
//                           textDecoration: 'none',
//                           fontFamily: 'Space Grotesk, sans-serif',
//                           letterSpacing: '0.03em',
//                           boxShadow: glow(c, 12),
//                         }}
//                         onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
//                         onMouseLeave={e => e.currentTarget.style.filter = 'none'}
//                       >
//                         Visit →
//                       </a>
//                     )}
//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         style={{
//                           flex: 1, padding: '7px 0', textAlign: 'center',
//                           background: 'rgba(255,255,255,0.06)', color: '#cbd5e1',
//                           border: '1px solid rgba(255,255,255,0.12)',
//                           borderRadius: 7, fontSize: 11, fontWeight: 600,
//                           textDecoration: 'none',
//                           fontFamily: 'Space Grotesk, sans-serif',
//                         }}
//                       >
//                         Code
//                       </a>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Tag */}
//             {!hovered && (
//               <div style={{
//                 fontSize: 10, color: c, fontFamily: 'JetBrains Mono, monospace',
//                 letterSpacing: '0.06em', marginTop: 4,
//               }}>[hover to explore]</div>
//             )}
//           </div>
//         </Html>
//       </group>
//     </Float>
//   );
// };

// /* ─── 3D: Scene ─────────────────────────────────────────────────────── */
// const Scene3D = () => {
//   const projects = [
//     { name: 'NovaExam',       description: 'Online exam portal with real-time grading & auto-scoring',   link: 'https://novaexam.vercel.app',           position: [7, 4, -1] },
//     { name: 'AI Resume',      description: 'Intelligent resume generator powered by AI algorithms',       link: 'https://ai-resume-amber-beta.vercel.app', position: [-7, 4, -1] },
//     { name: 'NovaMart',       description: 'Full-featured e-commerce with cart, auth & payments',        link: '#',                                       position: [0, -6.5, 0] },
//     { name: 'Image Search',   description: 'Advanced image search engine with filter pipeline',          link: '#',                                       position: [7, -3, 1] },
//     { name: 'Age Calculator', description: 'Interactive age calculation with animated results',          link: '#',                                       position: [-7, -3, 1] },
//   ];

//   // Orbital particles
//   const particles = Array.from({ length: 200 }, (_, i) => {
//     const theta = (i / 200) * Math.PI * 2;
//     const phi = Math.acos(2 * Math.random() - 1);
//     const r = 12 + Math.random() * 8;
//     return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)];
//   });

//   return (
//     <>
//       <Stars radius={120} depth={60} count={7000} factor={4} saturation={0.3} fade speed={0.5} />

//       {/* Ambient particle cloud */}
//       {particles.map((p, i) => (
//         <mesh key={i} position={p}>
//           <sphereGeometry args={[0.03, 4, 4]} />
//           <meshStandardMaterial color={i % 3 === 0 ? C.cyan : i % 3 === 1 ? C.purple : C.blue} emissive={C.cyan} emissiveIntensity={0.5} />
//         </mesh>
//       ))}

//       <RotatingCore />

//       {/* Connections from core to cards */}
//       {projects.map((p, i) => (
//         <ConnectionLine key={i} from={[0, 0, 0]} to={p.position} />
//       ))}

//       {projects.map((project, index) => (
//         <ProjectCard3D key={index} project={project} position={project.position} index={index} />
//       ))}

//       <OrbitControls
//         autoRotate autoRotateSpeed={0.4}
//         enableZoom enablePan
//         minDistance={12} maxDistance={90}
//         makeDefault
//       />

//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
//       <pointLight position={[-10, -10, -10]} intensity={0.4} color={C.purple} />
//       <pointLight position={[10, -5, 10]} intensity={0.3} color={C.blue} />
//     </>
//   );
// };

// /* ─── Overlay: Typing hook ──────────────────────────────────────────── */
// function useTyping(text, speed = 30, delay = 0) {
//   const [displayed, setDisplayed] = useState('');
//   useEffect(() => {
//     const t = setTimeout(() => {
//       let i = 0;
//       const iv = setInterval(() => {
//         i++;
//         setDisplayed(text.slice(0, i));
//         if (i >= text.length) clearInterval(iv);
//       }, speed);
//       return () => clearInterval(iv);
//     }, delay);
//     return () => clearTimeout(t);
//   }, [text, speed, delay]);
//   return displayed;
// }

// /* ─── Overlay: Sidebar panel ────────────────────────────────────────── */
// const SidePanel = ({ children, side, style = {} }) => (
//   <motion.div
//     initial={{ x: side === 'left' ? -320 : 320, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 80 }}
//     style={{
//       position: 'absolute',
//       [side]: 0,
//       top: '50%',
//       transform: 'translateY(-50%)',
//       padding: 20,
//       zIndex: 20,
//       pointerEvents: 'auto',
//       ...style,
//     }}
//   >
//     <div style={{
//       background: 'rgba(2,4,9,0.78)',
//       backdropFilter: 'blur(24px)',
//       border: `1px solid ${C.border}`,
//       borderRadius: 18,
//       padding: 22,
//       width: 260,
//       boxShadow: `0 0 40px rgba(0,245,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)`,
//     }}>
//       {children}
//     </div>
//   </motion.div>
// );

// /* ─── Overlay: Stat mini ────────────────────────────────────────────── */
// const MiniStat = ({ value, label, color = C.cyan }) => (
//   <div style={{
//     display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//     padding: '10px 14px',
//     background: `${color}0a`,
//     border: `1px solid ${color}22`,
//     borderRadius: 10,
//   }}>
//     <span style={{ fontSize: 12, color: C.muted, fontFamily: 'Space Grotesk, sans-serif' }}>{label}</span>
//     <span style={{
//       fontSize: 15, fontWeight: 700, color,
//       fontFamily: 'JetBrains Mono, monospace',
//       textShadow: `0 0 10px ${color}88`,
//     }}>{value}</span>
//   </div>
// );

// /* ─── Overlay: Tech badge ────────────────────────────────────────────── */
// const TechBadge = ({ name, index }) => {
//   const [hov, setHov] = useState(false);
//   return (
//     <motion.div
//       initial={{ x: -40, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ delay: 0.6 + index * 0.08 }}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         padding: '8px 12px',
//         background: hov ? `${C.cyan}1a` : `${C.cyan}0a`,
//         border: `1px solid ${hov ? C.cyan : C.border}`,
//         borderRadius: 8,
//         color: hov ? C.cyan : '#94a3b8',
//         fontSize: 12,
//         fontFamily: 'JetBrains Mono, monospace',
//         cursor: 'default',
//         transition: 'all 0.2s ease',
//         boxShadow: hov ? glow(C.cyan, 12) : 'none',
//         transform: hov ? 'translateX(4px)' : 'none',
//       }}
//     >
//       {name}
//     </motion.div>
//   );
// };

// /* ─── Overlay: Header ─────────────────────────────────────────────────── */
// const Header3D = () => {
//   const tagline = useTyping('Crafting scalable web applications & interactive experiences.', 28, 500);

//   return (
//     <motion.header
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 70 }}
//       style={{
//         position: 'absolute', top: 0, left: 0, right: 0,
//         padding: '24px 32px',
//         zIndex: 20,
//         pointerEvents: 'auto',
//         background: 'linear-gradient(180deg, rgba(2,4,9,0.85) 0%, transparent 100%)',
//         backdropFilter: 'blur(8px)',
//         borderBottom: `1px solid ${C.border}`,
//       }}
//     >
//       <div style={{ maxWidth: 900 }}>
//         {/* Name */}
//         <h1 style={{
//           fontFamily: 'Space Grotesk, sans-serif',
//           fontSize: 'clamp(28px, 4vw, 52px)',
//           fontWeight: 800,
//           background: `linear-gradient(120deg, ${C.cyan}, ${C.blue} 50%, ${C.purple})`,
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           backgroundClip: 'text',
//           backgroundSize: '200% auto',
//           animation: 'shimmer 4s linear infinite',
//           marginBottom: 4,
//           lineHeight: 1.1,
//         }}>
//           Akash Maity
//         </h1>

//         {/* Role */}
//         <p style={{
//           fontFamily: 'JetBrains Mono, monospace',
//           fontSize: 15, color: C.cyan,
//           marginBottom: 6,
//           textShadow: `0 0 15px ${C.cyan}66`,
//           animation: 'neon-drift 4s ease-in-out infinite',
//         }}>
//           &gt; Full Stack Developer
//         </p>

//         {/* Typing tagline */}
//         <p style={{
//           fontFamily: 'Space Grotesk, sans-serif',
//           fontSize: 13, color: C.muted,
//           maxWidth: 520,
//           lineHeight: 1.5,
//         }}>
//           {tagline}
//           <span style={{ color: C.cyan, animation: 'blink 1s step-start infinite' }}>|</span>
//         </p>
//       </div>
//     </motion.header>
//   );
// };

// /* ─── Overlay: UI ─────────────────────────────────────────────────────── */
// const OverlayUI = () => {
//   const techStack = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'];
//   const [activeTime, setActiveTime] = useState(0);

//   useEffect(() => {
//     const iv = setInterval(() => setActiveTime(t => t + 1), 1000);
//     return () => clearInterval(iv);
//   }, []);

//   const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

//   return (
//     <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
//       <DataStream left />
//       <DataStream />

//       <Header3D />

//       {/* Left panel */}
//       <SidePanel side="left" style={{ top: '52%' }}>
//         {/* Session HUD */}
//         <div style={{
//           padding: '10px 14px',
//           background: `${C.green}0d`,
//           border: `1px solid ${C.green}30`,
//           borderRadius: 10,
//           marginBottom: 16,
//           display: 'flex', alignItems: 'center', gap: 10,
//         }}>
//           <div style={{
//             width: 8, height: 8, borderRadius: '50%',
//             background: C.green, boxShadow: glow(C.green, 8),
//             animation: 'blink 2s ease-in-out infinite',
//           }} />
//           <span style={{ fontSize: 12, color: C.green, fontFamily: 'JetBrains Mono, monospace' }}>
//             Session {fmt(activeTime)}
//           </span>
//         </div>

//         <p style={{
//           fontSize: 11, color: C.muted, letterSpacing: '0.1em',
//           textTransform: 'uppercase', marginBottom: 12,
//           fontFamily: 'JetBrains Mono, monospace',
//         }}>// Tech Stack</p>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
//           {techStack.map((t, i) => <TechBadge key={t} name={t} index={i} />)}
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//           <SocialBtn href="https://www.linkedin.com/in/akash-maity-aa917b38a" color={C.blue} label="LinkedIn 💼" />
//           <SocialBtn href="https://github.com/Akash8311" color="#e2e8f0" label="GitHub 🔗" />
//           <SocialBtn href="mailto:akash@example.com" color={C.cyan} label="Email ✉️" />
//         </div>
//       </SidePanel>

//       {/* Right panel */}
//       <SidePanel side="right" style={{ top: '52%' }}>
//         <p style={{
//           fontSize: 11, color: C.muted, letterSpacing: '0.1em',
//           textTransform: 'uppercase', marginBottom: 16,
//           fontFamily: 'JetBrains Mono, monospace',
//         }}>// Profile</p>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
//           <MiniStat value="BCA" label="Degree" color={C.cyan} />
//           <MiniStat value="JIS Univ." label="College" color={C.blue} />
//           <MiniStat value="Intern" label="@ Prasarnet" color={C.purple} />
//           <MiniStat value="5+" label="Projects" color={C.pink} />
//           <MiniStat value="10+" label="Tech Skills" color={C.green} />
//         </div>

//         <div style={{
//           padding: '14px',
//           background: `${C.cyan}08`,
//           border: `1px solid ${C.border}`,
//           borderRadius: 12,
//         }}>
//           <p style={{ fontSize: 11, color: C.cyan, fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>
//             // Focus
//           </p>
//           <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, fontFamily: 'Space Grotesk, sans-serif' }}>
//             Building scalable web applications with modern stack & pixel-perfect UX.
//           </p>
//         </div>
//       </SidePanel>

//       {/* Bottom HUD */}
//       <motion.div
//         initial={{ y: 80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, delay: 0.7 }}
//         style={{
//           position: 'absolute', bottom: 0, left: 0, right: 0,
//           padding: '16px 32px',
//           background: 'linear-gradient(0deg, rgba(2,4,9,0.9) 0%, transparent 100%)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32,
//           pointerEvents: 'auto',
//           zIndex: 20,
//         }}
//       >
//         <ControlHint icon="🖱️" label="Drag" sub="to rotate" />
//         <ControlHint icon="🔍" label="Scroll" sub="to zoom" />
//         <ControlHint icon="👆" label="Hover" sub="cards for details" />

//         <div style={{
//           position: 'absolute', right: 32,
//           display: 'flex', gap: 6,
//         }}>
//           {['red', 'amber', 'green'].map((c, i) => (
//             <div key={i} style={{
//               width: 10, height: 10, borderRadius: '50%',
//               background: c === 'red' ? '#ef4444' : c === 'amber' ? '#f59e0b' : '#22c55e',
//               boxShadow: `0 0 8px ${c === 'red' ? '#ef4444' : c === 'amber' ? '#f59e0b' : '#22c55e'}`,
//             }} />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// function ControlHint({ icon, label, sub }) {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>
//       <div style={{ fontSize: 12, fontWeight: 600, color: C.text, fontFamily: 'Space Grotesk, sans-serif' }}>{label}</div>
//       <div style={{ fontSize: 10, color: C.muted, fontFamily: 'JetBrains Mono, monospace' }}>{sub}</div>
//     </div>
//   );
// }

// function SocialBtn({ href, color, label }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         display: 'block', padding: '11px 16px', textAlign: 'center',
//         background: hov ? `${color}22` : `${color}0d`,
//         border: `1px solid ${hov ? color : C.border}`,
//         borderRadius: 10,
//         color: hov ? color : '#94a3b8',
//         fontSize: 13, fontWeight: 600,
//         textDecoration: 'none',
//         fontFamily: 'Space Grotesk, sans-serif',
//         transition: 'all 0.2s ease',
//         boxShadow: hov ? glow(color, 15) : 'none',
//         transform: hov ? 'translateX(4px)' : 'none',
//       }}
//     >
//       {label}
//     </a>
//   );
// }

// /* ─── Main export ─────────────────────────────────────────────────────── */
// export default function Portfolio3D() {
//   return (
//     <>
//       <StyleInjector />
//       <div style={{ width: '100%', height: '100vh', background: C.bg, overflow: 'hidden', position: 'relative' }}>
//         <Canvas
//           camera={{ position: [0, 0, 28], fov: 70 }}
//           style={{ width: '100%', height: '100%' }}
//           gl={{ antialias: true, alpha: false }}
//         >
//           <Scene3D />
//         </Canvas>
//         <OverlayUI />
//       </div>
//     </>
//   );
// }