import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Code2, MoveRight } from 'lucide-react'
import TypewriterText from './TypewriterText'

export default function CinematicHero() {
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1200], [-22, 22]), { stiffness: 42, damping: 30 })
  const parallaxY = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [-18, 18]), { stiffness: 40, damping: 28 })

  useEffect(() => {
    if (reduceMotion) return undefined
    const move = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY, reduceMotion])

  return <section id="home" className="hero-section">
    <motion.div
      className="hero-backdrop"
      aria-hidden="true"
      style={{ x: parallaxX, y: parallaxY, scale: reduceMotion ? 1 : 1.08 }}
      initial={{ opacity: reduceMotion ? 1 : 0.85, scale: reduceMotion ? 1 : 1.12 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 2.8, ease: 'easeOut' }}
    />
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-light" aria-hidden="true" />
    <div className="hero-layout page-width">
      <div className="hero-content">
        <motion.div className="hero-kicker" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}><Code2 size={14} /> software engineer</motion.div>
        <motion.h1 className="hero-name" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}>Pradeepan Rakavi</motion.h1>
        <motion.p className="hero-role" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }}>Software Engineer</motion.p>
        <motion.p className="hero-copy hero-typewriter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}><TypewriterText text="Building meaningful digital experiences by transforming creative ideas into modern, user-focused, and innovative digital solutions through thoughtful design and clean, efficient code." typingSpeed={90} startDelay={900} showCursor /></motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .82 }}><a className="button button--primary" href="#projects">View my work <ArrowUpRight size={16} /></a><a className="button button--ghost" href="#contact">Let&apos;s talk <MoveRight size={16} /></a></motion.div>
      </div>
    </div>
    <div className="hero-meta page-width"><span>01 / 07</span><span>Trincomalee, Sri Lanka <i className="live-dot" /></span></div>
    <a className="scroll-cue" href="#about"><span>scroll to explore</span><ArrowDown size={15} /></a>
  </section>
}
