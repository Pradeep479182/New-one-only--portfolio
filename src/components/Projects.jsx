import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const GITHUB_USERNAME = 'Pradeep479182'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const moveTo = (direction) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + projects.length) % projects.length)
  }

  useEffect(() => {
    if (reduceMotion || autoplayPaused || projects.length < 2) return undefined
    const autoplay = window.setInterval(() => {
      moveTo(1)
    }, 3800)
    return () => window.clearInterval(autoplay)
  }, [autoplayPaused, reduceMotion])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return
      if (event.key === 'ArrowLeft') moveTo(-1)
      if (event.key === 'ArrowRight') moveTo(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return <section id="projects" className={`section projects-section page-width${detailsOpen ? ' projects-section--details-open' : ''}`}><SectionTitle eyebrow="03 / selected work" title="A few things I&apos;ve built." intro="A handpicked set of projects, with the thinking and technology behind each one." />
    <div className="project-carousel" aria-label="Project carousel"><button type="button" className="project-carousel-arrow project-carousel-arrow--prev" onClick={() => moveTo(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button><div className="project-carousel-track">{projects.map((project, index) => <ProjectCard project={project} index={index} activeIndex={activeIndex} onActivate={setActiveIndex} onSwipe={moveTo} onDetailsChange={(open) => { setAutoplayPaused(open); setDetailsOpen(open) }} carousel key={project.id} />)}</div><button type="button" className="project-carousel-arrow project-carousel-arrow--next" onClick={() => moveTo(1)} aria-label="Next project"><ArrowRight size={18} /></button><div className="project-carousel-dots" aria-label="Select project">{projects.map((project, index) => <button type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show ${project.name}`} aria-current={index === activeIndex ? 'true' : undefined} key={project.id} />)}</div></div>
    <div className="projects-footer"><a className="button button--ghost" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">View GitHub Profile <ArrowUpRight size={16} /></a></div>
  </section>
}
