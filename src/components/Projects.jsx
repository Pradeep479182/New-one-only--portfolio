import { ArrowUpRight } from 'lucide-react'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const GITHUB_USERNAME = 'Pradeep479182'

export default function Projects() {
  return <section id="projects" className="section projects-section page-width"><SectionTitle eyebrow="03 / selected work" title="A few things I&apos;ve built." intro="A handpicked set of projects, with the thinking and technology behind each one." />
    <div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
    <div className="projects-footer"><a className="button button--ghost" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">View GitHub Profile <ArrowUpRight size={16} /></a></div>
  </section>
}
