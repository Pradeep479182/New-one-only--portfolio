import SectionTitle from './SectionTitle'
import TechnicalSkillsCanvas from './TechnicalSkillsCanvas'
import { skills } from '../data/skills'

export default function TechnicalSkills() {
  return <section id="skills" className="section technical-skills-section"><div className="page-width"><SectionTitle eyebrow="02 / technical skills" title="Technical Skills" intro="A practical toolkit for building reliable, expressive digital products." /><div className="skills-category-rail">{['Frontend', 'Backend', 'Database', 'Tools'].map((category) => <span key={category}>{category}<small>{skills.filter((skill) => skill.category === category).length} technologies</small></span>)}</div><TechnicalSkillsCanvas skills={skills} /></div></section>
}
