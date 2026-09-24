import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Code2, X } from 'lucide-react'
import { getFallbackProjectImage, getProjectImage } from '../services/projectImages'

export default function ProjectCard({ project, index, activeIndex = 0, onActivate, onSwipe, onDetailsChange, carousel = false }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const gestureStart = useRef(null)
  const suppressClick = useRef(false)
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 })

  const closeDetails = useCallback(() => {
    onDetailsChange?.(false)
    setDetailsOpen(false)
  }, [onDetailsChange])

  useEffect(() => {
    if (!detailsOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') closeDetails() }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [closeDetails, detailsOpen])

  const openDetails = () => {
    onDetailsChange?.(true)
    onActivate?.(index)
    setDetailsOpen(true)
  }

  const image = getProjectImage(project)
  const imageFallback = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src = getFallbackProjectImage(project)
  }

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetTilt = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') gestureStart.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (gestureStart.current === null) return
    const delta = event.clientX - gestureStart.current
    gestureStart.current = null
    if (Math.abs(delta) < 45) return
    suppressClick.current = true
    onSwipe?.(delta < 0 ? 1 : -1)
    window.setTimeout(() => { suppressClick.current = false }, 0)
  }

  const offset = index - activeIndex
  const distance = Math.min(Math.abs(offset), 3)
  const cardMotion = carousel ? {
    x: `${offset * 76}%`,
    y: offset === 0 ? 0 : Math.min(distance * 18, 54),
    scale: offset === 0 ? 1 : Math.max(.68, 1 - distance * .12),
    rotateY: offset * -16,
    opacity: distance > 2 ? .25 : 1,
  } : undefined

  return <>
    <motion.article className={`project-card${carousel ? ' carousel-card' : ''}${index === activeIndex ? ' is-active' : ''}`} initial={carousel || reduceMotion ? false : { opacity: 0, y: 42, scale: .92, rotateX: 8 }} whileInView={carousel || reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, rotateX: 0 }} animate={cardMotion} viewport={{ once: true, amount: .2, margin: '-40px' }} transition={carousel ? (reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 24, mass: .8 }) : { delay: index * .09, duration: .68, ease: [0.22, 1, 0.36, 1] }} whileHover={carousel ? { y: offset === 0 ? -8 : 0, scale: offset === 0 ? 1.015 : cardMotion.scale } : { y: -7 }} style={{ rotateX, rotateY: carousel ? undefined : rotateY, transformPerspective: 1000 }} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerMove={handlePointerMove} onPointerLeave={resetTilt} onClick={() => { if (suppressClick.current) return; openDetails() }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetails() } }} role="button" tabIndex="0" aria-label={`View details for ${project.name}`}>
      <div className="project-thumbnail"><img src={image} alt={`${project.name} project preview`} onError={imageFallback} /><div className="project-thumbnail-overlay" /><span>{project.label.split(' / ')[0]}</span></div>
      <div className="project-body"><div className="project-top"><span className="project-type">{project.label.split(' / ')[1]}</span><span className="project-detail-link">View details <ArrowUpRight size={14} /></span></div><h3>{project.name}</h3><p>{project.summary}</p><div className="project-topics">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><button type="button" onClick={(event) => { event.stopPropagation(); openDetails() }}>View Details <ArrowUpRight size={15} /></button></div></div>
    </motion.article>
    <AnimatePresence>{detailsOpen && <div className="project-modal-backdrop" role="presentation" onClick={closeDetails}><motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby={`project-modal-title-${project.id}`} initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .22 }} onClick={(event) => event.stopPropagation()}><button className="project-modal-close" type="button" onClick={closeDetails} aria-label="Close project details"><X size={18} /></button><img src={image} alt={`${project.name} preview`} className="project-modal-image" onError={imageFallback} /><div className="project-modal-content"><span className="eyebrow">{project.label}</span><h2 id={`project-modal-title-${project.id}`}>{project.name}</h2><p className="project-modal-summary">{project.summary}</p><div className="project-modal-section"><h3>Project details</h3><p>{project.details}</p></div><div className="project-modal-section"><h3>Technologies</h3><div className="project-topics project-modal-topics">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="project-modal-actions"><a className="button" href={project.codeUrl} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> View Code</a>{project.liveUrl && <a className="button button--ghost" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16} /> Live Demo</a>}</div></div></motion.div></div>}</AnimatePresence>
  </>
}
