import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Code2, X } from 'lucide-react'
import { getFallbackProjectImage, getProjectImage } from '../services/projectImages'

export default function ProjectCard({ project, index }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 })

  useEffect(() => {
    if (!detailsOpen) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setDetailsOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [detailsOpen])

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

  return <>
    <motion.article className="project-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: index * .07, duration: .55 }} whileHover={{ y: -7 }} style={{ rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={handlePointerMove} onPointerLeave={resetTilt} onClick={() => setDetailsOpen(true)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setDetailsOpen(true) } }} role="button" tabIndex="0" aria-label={`View details for ${project.name}`}>
      <div className="project-thumbnail"><img src={image} alt={`${project.name} project preview`} onError={imageFallback} /><div className="project-thumbnail-overlay" /><span>{project.label.split(' / ')[0]}</span></div>
      <div className="project-body"><div className="project-top"><span className="project-type">{project.label.split(' / ')[1]}</span><span className="project-detail-link">View details <ArrowUpRight size={14} /></span></div><h3>{project.name}</h3><p>{project.summary}</p><div className="project-topics">{project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><button type="button" onClick={(event) => { event.stopPropagation(); setDetailsOpen(true) }}>View Details <ArrowUpRight size={15} /></button></div></div>
    </motion.article>
    <AnimatePresence>{detailsOpen && <div className="project-modal-backdrop" role="presentation" onClick={() => setDetailsOpen(false)}><motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby={`project-modal-title-${project.id}`} initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .22 }} onClick={(event) => event.stopPropagation()}><button className="project-modal-close" type="button" onClick={() => setDetailsOpen(false)} aria-label="Close project details"><X size={18} /></button><img src={image} alt={`${project.name} preview`} className="project-modal-image" onError={imageFallback} /><div className="project-modal-content"><span className="eyebrow">{project.label}</span><h2 id={`project-modal-title-${project.id}`}>{project.name}</h2><p className="project-modal-summary">{project.summary}</p><div className="project-modal-section"><h3>Project details</h3><p>{project.details}</p></div><div className="project-modal-section"><h3>Technologies</h3><div className="project-topics project-modal-topics">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="project-modal-actions"><a className="button" href={project.codeUrl} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> View Code</a>{project.liveUrl && <a className="button button--ghost" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={16} /> Live Demo</a>}</div></div></motion.div></div>}</AnimatePresence>
  </>
}
