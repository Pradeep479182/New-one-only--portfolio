import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const GITHUB_USERNAME = 'Pradeep479182'

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)

  return <section id="projects" className="section projects-section page-width"><SectionTitle eyebrow="03 / selected work" title="A few things I&apos;ve built." intro="A handpicked set of projects, with the thinking and technology behind each one." />
    <div className="project-carousel" aria-label="Project carousel"><div className="project-carousel-track">{projects.map((project, index) => <ProjectCard project={project} index={index} activeIndex={activeIndex} onActivate={setActiveIndex} carousel key={project.id} />)}</div><div className="project-carousel-dots" aria-label="Select project">{projects.map((project, index) => <button type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show ${project.name}`} aria-current={index === activeIndex ? 'true' : undefined} key={project.id} />)}</div></div>
    <div className="projects-footer"><a className="button button--ghost" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">View GitHub Profile <ArrowUpRight size={16} /></a></div>
  </section>
}
