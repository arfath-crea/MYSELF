'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'Mathesis',
    blurb: 'A student-focused educational website designed to make learning more effective, with future plans for AI-powered study assistance and productivity tools.',
    tags: ['Web Development', 'Education', 'Python/JavaScript']
  },
  {
    title: 'Developer Portfolio',
    blurb: 'A polished personal portfolio built with modern web technologies to present projects, skills, and professional goals clearly.',
    tags: ['Next.js', 'React', '3D UI']
  },
  {
    title: 'Learning Path',
    blurb: 'A practical, project-based development journey focused on Java, Python, SQL, web development, Git, and software engineering fundamentals.',
    tags: ['Java', 'Python', 'SQL']
  }
];

const skills = ['Python', 'Java', 'SQL', 'JavaScript', 'Git & GitHub', 'Linux (Ubuntu)', 'REST APIs', 'Web Development', 'Software Engineering principles', 'Basic Cybersecurity concepts'];

function FloatingScene() {
  const groupRef = useRef(null);
  let scene = null;

  try {
    ({ scene } = useGLTF('/models/scene.glb'));
  } catch (error) {
    scene = null;
  }

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {scene ? (
        <primitive object={scene} scale={1.2} position={[0, -0.4, 0]} />
      ) : (
        <mesh position={[0, -0.4, 0]}>
          <torusKnotGeometry args={[0.8, 0.24, 160, 16]} />
          <meshPhysicalMaterial color="#8b5cf6" roughness={0.25} metalness={0.25} transmission={0.35} thickness={0.6} />
        </mesh>
      )}
    </group>
  );
}

function Blocks() {
  return (
    <>
      <Float speed={2.8} rotationIntensity={0.35} floatIntensity={1.2}>
        <mesh position={[-2.4, 0.6, 0]} castShadow>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshPhysicalMaterial color="#8b5cf6" roughness={0.25} metalness={0.2} transmission={0.4} thickness={0.6} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.9}>
        <mesh position={[2.2, 0.2, 0]} castShadow>
          <boxGeometry args={[1.4, 0.8, 1.4]} />
          <meshPhysicalMaterial color="#22d3ee" roughness={0.2} metalness={0.25} transmission={0.35} thickness={0.5} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh position={[0, -1.3, 1.4]} castShadow>
          <boxGeometry args={[1.6, 0.8, 0.6]} />
          <meshPhysicalMaterial color="#f59e0b" roughness={0.18} metalness={0.3} transmission={0.3} thickness={0.5} />
        </mesh>
      </Float>
    </>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to('.orbital-card', {
        y: -8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      ScrollTrigger.create({
        trigger: '.portfolio-grid',
        start: 'top 85%',
        once: true,
        animation: gsap.from('.portfolio-card', {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out'
        })
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={heroRef} className="min-h-screen overflow-hidden px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6 lg:p-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/30 px-4 py-3 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">M. ARFATH</p>
            <p className="text-sm text-slate-300">Aspiring Software Engineer • Student Developer</p>
          </div>
          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
        </header>

        <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Building toward software engineering internships and full-time roles
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                I’m M. Arfath, a Computer Science student building practical software skills through projects and hands-on learning.
              </h1>
              <p className="max-w-xl text-lg text-slate-300 sm:text-xl">
                I’m focused on becoming a software engineer by strengthening my foundation in Python, Java, SQL, web development, and real-world problem solving.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-white px-5 py-3 font-medium text-slate-900 transition hover:scale-105">See my work</a>
              <a href="#contact" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 font-medium text-slate-100 transition hover:bg-white/20">Let&apos;s talk</a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['19', 'Years old'],
                ['2nd', 'Year B.Sc. CS'],
                ['100%', 'Projects with purpose']
              ].map(([value, label]) => (
                <div key={label} className="rounded-[20px] border border-white/10 bg-slate-950/30 px-4 py-3">
                  <p className="text-xl font-semibold text-white">{value}</p>
                  <p className="text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="orbital-card relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/40 p-3 shadow-[0_0_80px_rgba(34,211,238,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_35%)]" />
            <div className="relative h-[460px] rounded-[24px] border border-white/10">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <color attach="background" args={['#060816']} />
                <fog attach="fog" args={['#060816', 6, 18]} />
                <ambientLight intensity={0.55} />
                <directionalLight position={[3, 5, 2]} intensity={1.6} color="#ffffff" />
                <pointLight position={[-2, 2, 2]} intensity={2.2} color="#7c3aed" />
                <pointLight position={[2, -1, 2]} intensity={1.8} color="#22d3ee" />
                <Suspense fallback={null}>
                  <FloatingScene />
                  <Blocks />
                </Suspense>
                <Stars radius={80} depth={50} count={1600} factor={4} saturation={0} fade speed={1.4} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
              </Canvas>
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-grid grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="portfolio-card rounded-[24px] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
              <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{project.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section id="about" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="portfolio-card rounded-[24px] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">About</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">I’m learning by building real applications and strengthening my software engineering foundation.</h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              I’m currently studying Java, Python, SQL, statistics, microprocessors, and computer science fundamentals while developing projects that solve real user needs.
            </p>
          </div>
          <div className="portfolio-card rounded-[24px] border border-white/10 bg-slate-950/35 p-6 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Toolkit</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="portfolio-card rounded-[28px] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Let&apos;s connect and build something meaningful together.</h2>
              <p className="mt-2 text-slate-300">I&apos;m open to learning opportunities, collaboration, and conversations around software development and practical project building.</p>
            </div>
            <a href="mailto:marfath817@gmail.com" className="rounded-full bg-white px-5 py-3 font-medium text-slate-900 transition hover:scale-105">
              marfath817@gmail.com
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
