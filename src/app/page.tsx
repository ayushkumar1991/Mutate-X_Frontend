/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import React, { useState, useEffect, useRef, type FC, type ComponentType } from "react";
import {
  ChevronRight, Dna, Brain, Shield, Zap, Globe, Search, BarChart3,
  Cpu, Microscope, Building2, Rocket, FlaskConical, BookText, Code, Settings,
  Twitter, Github, Linkedin, Mail
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, animate, useScroll, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";

// ------------------ SCROLL PROGRESS BAR ------------------
const ScrollProgressBar: FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    return (
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-[100]"
        style={{ scaleX }}
      />
    );
};

// ------------------ INTERACTIVE MOUSE CURSOR GLOW ------------------
const CursorGlow: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 300, damping: 50, mass: 0.5 }),
    y: useSpring(mouse.y, { stiffness: 300, damping: 50, mass: 0.5 })
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouse.x.set(e.clientX);
    mouse.y.set(e.clientY);
  };

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        background: useTransform(
          [smoothMouse.x, smoothMouse.y],
          ([x, y]) => `radial-gradient(600px at ${x}px ${y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
        )
      }}
    />
  );
};

// ------------------ FINAL VERSION: GENETIC SEQUENCER ANIMATION ------------------
const GeneSequencer: FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);

  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0.5, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0.5, { stiffness: 100, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  if (!hasMounted) {
    return <div className="h-[500px]" />;
  }

  return (
    <motion.div
      className="h-[500px] w-full"
      style={{ perspective: "2500px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      >
        {/* Layer 1: Data Matrix Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div key={`matrix-col-${i}`} className="absolute h-full w-px bg-blue-500/30" style={{ left: `${(i / 30) * 100}%` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}/>
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.div key={`matrix-row-${i}`} className="absolute w-full h-px bg-purple-500/30" style={{ top: `${(i / 15) * 100}%` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}/>
          ))}
        </div>

        {/* Layer 2: Vertically Rotating DNA Helix */}
        <motion.div
            className="absolute inset-0 flex justify-center items-center"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear'}}
        >
            {[...Array(12)].map((_, i) => (
                <div key={`rung-${i}`} className="absolute w-[100px] h-px bg-gradient-to-r from-cyan-500/50 via-white/70 to-purple-500/50"
                    style={{
                        transform: `translateY(${-140 + i * 24}px) rotateY(${i*30}deg) translateZ(0px) translateX(-50%)`
                    }}
                />
            ))}
            <div className="absolute w-px h-[280px] bg-cyan-500/50" style={{ transform: 'translateX(-50px) translateY(-140px)'}}/>
            <div className="absolute w-px h-[280px] bg-purple-500/50" style={{ transform: 'translateX(50px) translateY(-140px)'}}/>
        </motion.div>

        {/* Layer 3: Dynamic Arcing Light Trails & Central Pulse */}
        <div className="absolute inset-0 flex justify-center items-center" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
                className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-60 blur-lg"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`arc-trail-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-l-transparent border-r-transparent"
                    style={{
                        width: `${120 + i * 50}px`,
                        height: `${120 + i * 50}px`,
                        borderColor: `rgba(59, 130, 246, ${0.4 - i * 0.05})`,
                        borderTopColor: `rgba(168, 85, 247, ${0.6 - i * 0.08})`,
                        borderBottomColor: `rgba(6, 182, 212, ${0.6 - i * 0.08})`,
                    }}
                    animate={{ rotateZ: [i % 2 === 0 ? 0 : 360, i % 2 === 0 ? 360 : 0] }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.4
                    }}
                />
            ))}
        </div>

        {/* Layer 4: Floating Data Particles */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_12px_#06b6d4]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0],
                        x: (Math.random() - 0.5) * 350,
                        y: (Math.random() - 0.5) * 350,
                        z: (Math.random() - 0.5) * 350,
                    }}
                    transition={{
                        duration: Math.random() * 4 + 4,
                        repeat: Infinity,
                        delay: Math.random() * 6,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};


// ------------------ ANIMATED NUMBER FOR STATS ------------------
const AnimatedNumber: FC<{ value: number; isPercentage?: boolean }> = ({ value, isPercentage = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); }
    }, { threshold: 0.5 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = isPercentage
              ? `${latest.toFixed(1)}%`
              : latest < 1 ? `<${latest.toFixed(0)}s` : latest.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, isPercentage]);

  const initialText = isPercentage ? "0.0%" : value < 1 ? "<1s" : "0";

  return <span ref={ref}>{initialText}</span>;
};

// ------------------ BACKGROUND PARTICLE SYSTEM ------------------
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; color: string;
}

const ParticleSystem: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Particle[] = [];
    const particleCount = 50;
    const colors: string[] = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]!,
      });
    }
    let animationId: number;
    const animateFn = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.x += particle.vx; particle.y += particle.vy;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        ctx.save();
        ctx.globalAlpha = particle.opacity; ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10; ctx.shadowColor = particle.color;
        ctx.beginPath(); ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill(); ctx.restore();
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x; const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = ((100 - distance) / 100) * 0.1;
              ctx.strokeStyle = particle.color; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y); ctx.stroke();
              ctx.restore();
            }
          }
        });
      });
      animationId = requestAnimationFrame(animateFn);
    };
    animateFn();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ mixBlendMode: "screen" }} />;
};


// ------------------ NEW ATTRACTIVE HEADER ------------------
const Header3D: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };
  
  const onMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
  }

  const rotateX = useTransform(mouseY, [-100, 100], [-15, 15]);
  const rotateY = useTransform(mouseX, [-100, 100], [15, -15]);
  const springConfig = { stiffness: 300, damping: 30 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 10);
    });
  }, [scrollY]);
  
  const navItems = ["Home", "Features", "Pricing", "About"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 z-50 w-full transition-all duration-300"
    >
        <motion.div
            className="absolute inset-0 border-b"
            animate={{
                backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.7)" : "rgba(15, 23, 42, 0)",
                borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
            }}
            style={{
                backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        />
      <div className="relative container mx-auto flex items-center justify-between px-6 py-4">
        <motion.a 
            href="/" 
            className="flex items-center gap-3"
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ perspective: "1000px" }}
        >
          <motion.div style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformStyle: "preserve-3d" }}>
            <Dna size={32} className="text-blue-400 drop-shadow-lg" />
          </motion.div>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
            Mutate-X
          </span>
        </motion.a>
        <nav 
            className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 p-1"
            onMouseLeave={() => setHoveredLink(null)}
        >
          {navItems.map((item) => (
            <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative text-slate-200 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-white"
                onMouseEnter={() => setHoveredLink(item)}
            >
              {hoveredLink === item && (
                  <motion.div
                    layoutId="nav-spotlight"
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
              )}
              <span className="relative z-10">{item}</span>
            </a>
          ))}
        </nav>
        <motion.a
          href="/verification?redirect=/dashboard"
          className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white"
          whileHover={{ 
            scale: 1.05,
            boxShadow: [ "0px 0px 20px rgba(99, 102, 241, 0.5)", "0px 0px 35px rgba(99, 102, 241, 0.7)", "0px 0px 20px rgba(99, 102, 241, 0.5)" ]
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        >
          Go to Dashboard
        </motion.a>
      </div>
    </motion.header>
  );
};

// ------------------ FEATURE CARD ------------------
interface FeatureCard3DProps {
  icon: ComponentType<{ size: number, className: string }>;
  title: string; description: string; accent?: "blue" | "purple" | "green" | "orange";
}

const FeatureCard3D: FC<FeatureCard3DProps> = ({ icon: Icon, title, description, accent = "blue" }) => {
  const accentColors = {
    blue: "from-blue-600/20 border-blue-500/30 hover:border-blue-400/60 shadow-blue-500/20",
    purple: "from-purple-600/20 border-purple-500/30 hover:border-purple-400/60 shadow-purple-500/20",
    green: "from-green-600/20 border-green-500/30 hover:border-green-400/60 shadow-green-500/20",
    orange: "from-orange-600/20 border-orange-500/30 hover:border-orange-400/60 shadow-orange-500/20"
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl bg-gradient-to-br ${accentColors[accent]} border backdrop-blur-sm group cursor-pointer transform-gpu perspective-1000`}
      whileHover={{ y: -10, scale: 1.03, rotateX: 5, rotateY: 5, boxShadow: `0 25px 50px -12px var(--tw-shadow-color)` }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-transform duration-300 group-hover:scale-110">
          <Icon size={24} className="text-white drop-shadow-lg" />
        </div>
        <h3 className="font-semibold text-white text-lg">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      </div>
    </motion.div>
  );
};

// ------------------ STAT CARD ------------------
interface StatCard3DProps {
  number: number; label: string; accent?: "blue" | "purple" | "green" | "orange";
  isPercentage?: boolean;
}

const StatCard3D: FC<StatCard3DProps> = ({ number, label, accent = "blue", isPercentage }) => {
    const accentColors = {
      blue: "text-blue-400", purple: "text-purple-400",
      green: "text-green-400", orange: "text-orange-400"
    };

    return (
      <div className="group relative text-center p-6 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/40 transition-all duration-300 transform hover:scale-105 overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 group-hover:animate-[shimmer_2s_infinite]" />

        <div className={`relative text-4xl font-bold ${accentColors[accent]} mb-2 drop-shadow-lg`}>
          {label === "Analysis Time" ? "<1s" : <AnimatedNumber value={number} isPercentage={isPercentage} />}
        </div>
        <div className="relative text-gray-400">{label}</div>
      </div>
    );
};


// ------------------ DNA SEQUENCE ------------------
const DNASequence3D: FC = () => {
    const [sequence, setSequence] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const bases = ["A", "T", "G", "C"];
    const baseColors: Record<string, string> = { A: "text-red-400", T: "text-blue-400", G: "text-green-400", C: "text-yellow-400" };

    useEffect(() => {
      const generateSequence = () => { setSequence(Array.from({ length: 60 }, () => bases[Math.floor(Math.random() * 4)]).join('')); };
      generateSequence();
      const interval = setInterval(generateSequence, 4000);
      const highlightInterval = setInterval(() => { setHighlightIndex(prev => (prev + 1) % 60); }, 100);
      return () => { clearInterval(interval); clearInterval(highlightInterval); };
    }, []);

    return (
      <div className="relative mb-8 p-6 bg-black/40 rounded-xl border border-gray-700/50 backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-green-600/5 animate-pulse"></div>
        <div className="relative font-mono text-base tracking-wider flex flex-wrap justify-center gap-1">
          {sequence.split('').map((base, index) => (
            <span key={index}
              className={`inline-block transition-all duration-300 transform ${baseColors[base]} ${highlightIndex === index ? 'scale-125 text-white shadow-lg animate-pulse' : 'hover:scale-110'}`}
              style={{ transform: `translateZ(${highlightIndex === index ? '20px' : '0'})`, textShadow: highlightIndex === index ? '0 0 20px currentColor' : '0 0 10px currentColor' }}>
              {base}
            </span>
          ))}
        </div>
      </div>
    );
};

// ------------------ FOOTER ------------------
const GenovaAILogo: FC = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L28.1244 9V23L16 30L3.87564 23V9L16 2Z" stroke="url(#logo-gradient-outer)" strokeWidth="1.5"/>
      <path d="M10 12C12 10 18 10 20 12C22 14 22 18 20 20C18 22 12 22 10 20C8 18 8 14 10 12Z" stroke="url(#logo-gradient-inner)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 20C12 22 18 22 20 20C22 18 22 14 20 12C18 10 12 10 10 12" stroke="url(#logo-gradient-inner)" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="2 2"/>
      <defs>
        <linearGradient id="logo-gradient-outer" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8"/><stop offset="1" stopColor="#84cc16"/>
        </linearGradient>
        <linearGradient id="logo-gradient-inner" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ee7b7"/><stop offset="1" stopColor="#facc15"/>
        </linearGradient>
      </defs>
    </svg>
  );

  const Footer3D: FC = () => (
    <footer className="relative mt-24 overflow-hidden bg-slate-950/90 backdrop-blur-3xl border-t border-emerald-500/20 shadow-[0_-15px_60px_-15px_rgba(16,185,129,0.15)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke-width=\'0.7\' stroke=\'rgba(74, 222, 128, 0.1)\'%3E%3Cpath d=\'M0 .5 L32 .5 M.5 0 L.5 32\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', animation: 'gridScroll 80s linear infinite' }} />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_15%_15%,rgba(52,211,153,0.1),transparent),radial-gradient(40%_40%_at_85%_75%,rgba(251,191,36,0.1),transparent),linear-gradient(to_right,transparent,rgba(74,222,128,0.08),transparent)] [background-size:8px_100%] animate-[dataGlow_10s_linear_infinite]" />
      </div>
      <style jsx>{`
        @keyframes gridScroll { to { background-position: 1024px 512px; } }
        @keyframes dataGlow { 0% { background-position: 0 0; } 100% { background-position: 100% 0; } }
        @keyframes shimmer { 100% { transform: translateX(100%) skewX(-12deg); } }
      `}</style>
      <div className="relative container mx-auto grid gap-16 px-6 py-20 text-sm text-gray-300 md:grid-cols-12">
        <div className="md:col-span-4">
           <div className="mb-5 flex items-center gap-3"> <GenovaAILogo /> <span className="text-2xl font-extrabold text-white tracking-wider">Mutate-X</span> </div>
           <p className="max-w-prose leading-relaxed text-gray-400 font-light"> Harnessing advanced AI to decode the language of life, transforming genomic data into actionable biological insights. </p>
           <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a href="https://twitter.com" aria-label="Follow on X/Twitter" whileHover={{ y: -4, scale: 1.1 }} transition={{type: 'spring', stiffness: 300}} className="group h-10 w-10 flex justify-center items-center rounded-xl bg-white/5 border border-white/10 text-emerald-300 hover:bg-emerald-600/80 hover:border-emerald-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-emerald-500/30"><Twitter className="h-5 w-5" /></motion.a>
            <motion.a href="https://github.com" aria-label="On GitHub" whileHover={{ y: -4, scale: 1.1 }} transition={{type: 'spring', stiffness: 300}} className="group h-10 w-10 flex justify-center items-center rounded-xl bg-white/5 border border-white/10 text-emerald-300 hover:bg-slate-700/80 hover:border-slate-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-slate-600/30"><Github className="h-5 w-5" /></motion.a>
            <motion.a href="https://linkedin.com" aria-label="On LinkedIn" whileHover={{ y: -4, scale: 1.1 }} transition={{type: 'spring', stiffness: 300}} className="group h-10 w-10 flex justify-center items-center rounded-xl bg-white/5 border border-white/10 text-emerald-300 hover:bg-blue-600/80 hover:border-blue-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-blue-600/30"><Linkedin className="h-5 w-5" /></motion.a>
            <motion.a href="mailto:info@example.com" whileHover={{ y: -4, scale: 1.05 }} transition={{type: 'spring', stiffness: 300}} className="group h-10 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 text-emerald-300 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-lime-500 hover:border-emerald-400 hover:text-white transition-all duration-300 shadow-md hover:shadow-emerald-500/30"><Mail className="h-5 w-5" /> <span className="text-xs font-semibold">Inquire</span></motion.a>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-10 md:col-span-5 md:grid-cols-3">
          {/* Your Footer Links Here */}
        </div>
        <div className="md:col-span-3">
           <h4 className="mb-5 font-bold text-white uppercase tracking-wider">Stay Connected</h4>
           <p className="text-gray-400 mb-6 font-light">Join our newsletter for breakthrough insights and platform updates.</p>
           <form onSubmit={(e) => e.preventDefault()} className="rounded-xl border border-white/10 p-2 transition-all duration-300 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-lg">
             <div className="flex items-center">
              <input id="newsletter" type="email" placeholder="your.lab@institution.com" className="w-full bg-transparent px-3 py-2.5 text-slate-200 placeholder:text-slate-500 outline-none text-base" required />
              <button type="submit" className="rounded-lg bg-gradient-to-br from-emerald-500 to-lime-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-emerald-400 hover:to-lime-400 hover:shadow-[0_0_25px_rgba(74,222,128,0.6)] focus:outline-none"> Subscribe </button>
             </div>
           </form>
        </div>
      </div>
      <div className="relative border-t border-emerald-500/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-6 py-6 text-xs text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Mutate-X Technologies Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="transition hover:text-emerald-300">Privacy Policy</a>
            <a href="/terms-of-service" className="transition hover:text-emerald-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );

// ------------------ MAIN LANDING PAGE ------------------
export default function DNAHeroPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading period for assets and animations
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // For cascading text animation
  const sentence = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.035, delayChildren: 0.3 } } };
  const letter = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
  const line1 = "Precision DNA Variant";
  const line2 = "Analysis using AI";


  return (
    <AnimatePresence>
        {isLoading ? (
            <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Loader />
            </motion.div>
        ) : (
            <motion.div
                key="page-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative"
            >
                <ScrollProgressBar />
                <CursorGlow />
                <ParticleSystem />
                <div className="absolute top-0 left-0 h-screen w-full bg-gradient-to-b from-slate-900 via-blue-950/50 to-purple-950/80"></div>
                
                <Header3D />

                <main className="relative z-10">
                    <div className="container mx-auto px-6 pt-36 sm:pt-44 pb-32">
                    {/* ---- HERO SECTION ---- */}
                    <div className="relative text-center max-w-6xl mx-auto">
                        
                        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-full h-[500px] z-0">
                           <GeneSequencer />
                        </div>

                        <motion.div
                          className="relative z-10"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-300 mb-10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                          >
                            <Cpu size={18} className="animate-[spin_8s_linear_infinite]" />
                            <span>Powered by Evo2 Large Language Model</span>
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          </motion.div>

                          <motion.h1
                            variants={sentence}
                            initial="hidden"
                            animate="visible"
                            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
                          >
                            {line1.split("").map((char, index) => (
                                <motion.span key={char + "-" + index} variants={letter} style={{display: 'inline-block', whiteSpace: 'pre'}}>
                                    {char}
                                </motion.span>
                            ))}
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                              {line2.split("").map((char, index) => (
                                <motion.span key={char + "-" + index} variants={letter} style={{display: 'inline-block', whiteSpace: 'pre'}}>
                                    {char}
                                </motion.span>
                              ))}
                            </span>
                          </motion.h1>

                          <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
                          >
                            Predict the pathogenicity of genetic mutations with state-of-the-art machine learning.
                          </motion.p>
                          
                          <motion.div variants={itemVariants}>
                              <DNASequence3D />
                          </motion.div>

                          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                            <motion.a
                              href="/dashboard"
                              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg flex items-center gap-3 group"
                              whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(99, 102, 241, 0.6)" }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <span>Start Analysis</span>
                              <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                  <ChevronRight size={22} />
                              </motion.div>
                            </motion.a>
                            <motion.button
                              className="px-10 py-5 bg-white/10 border border-white/20 rounded-xl font-semibold text-lg backdrop-blur-sm"
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              View Demo
                            </motion.button>
                          </motion.div>

                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                          >
                            <motion.div variants={itemVariants}><StatCard3D number={99.2} label="Accuracy" accent="blue" isPercentage /></motion.div>
                            <motion.div variants={itemVariants}><StatCard3D number={1} label="Analysis Time" accent="purple" /></motion.div>
                            <motion.div variants={itemVariants}><StatCard3D number={100} label="H100 GPU Powered" accent="green" /></motion.div>
                            <motion.div variants={itemVariants}><StatCard3D number={24} label="24/7 Available" accent="orange" /></motion.div>
                          </motion.div>
                        </motion.div>
                    </div>
                    </div>

                    {/* ---- FEATURES SECTION ---- */}
                    <motion.div
                      id="features"
                      className="container mx-auto px-6 pb-32"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={containerVariants}
                    >
                      <motion.div variants={itemVariants} className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                          Comprehensive Genetic Analysis Suite
                        </h2>
                        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                          Everything you need to analyze genetic variants and predict their clinical significance.
                        </p>
                      </motion.div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <motion.div variants={itemVariants}><FeatureCard3D icon={Brain} title="AI-Powered Predictions" description="Advanced Evo2 model analyzes mutations with state-of-the-art accuracy for pathogenicity prediction" accent="blue" /></motion.div>
                        <motion.div variants={itemVariants}><FeatureCard3D icon={Shield} title="ClinVar Integration" description="Compare AI predictions against established clinical classifications from the ClinVar database" accent="purple" /></motion.div>
                        <motion.div variants={itemVariants}><FeatureCard3D icon={Search} title="Gene Explorer" description="Browse chromosomes, search specific genes like BRCA1, and explore reference genome sequences" accent="green" /></motion.div>
                        <motion.div variants={itemVariants}><FeatureCard3D icon={Globe} title="Multiple Assemblies" description="Support for different genome assemblies including hg38 with comprehensive coverage" accent="orange" /></motion.div>
                        <motion.div variants={itemVariants}><FeatureCard3D icon={Zap} title="GPU Acceleration" description="Lightning-fast analysis powered by H100 GPUs deployed on Modal's serverless infrastructure" accent="blue" /></motion.div>
                        <motion.div variants={itemVariants}><FeatureCard3D icon={BarChart3} title="Confidence Scoring" description="Get detailed confidence estimates for each prediction with comprehensive analysis metrics" accent="purple" /></motion.div>
                      </div>
                    </motion.div>
                </main>

                <Footer3D />
            </motion.div>
        )}
    </AnimatePresence>
  );
}