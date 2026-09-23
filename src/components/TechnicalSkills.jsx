import SectionTitle from './SectionTitle'
import SkillCard from './SkillCard'
import { skills } from '../data/skills'

export default function TechnicalSkills() {
  return <section id="skills" className="section technical-skills-section"><div className="page-width"><SectionTitle eyebrow="02 / technical skills" title="Technical Skills" intro="A practical toolkit for building reliable, expressive digital products." /><div className="technical-skill-groups">{['Frontend', 'Backend', 'Database', 'Tools'].map((category) => <div className="technical-skill-group" key={category}><h3>{category}</h3><div className="technical-skills-grid">{skills.filter((skill) => skill.category === category).map((skill, index) => <SkillCard skill={skill} index={index} key={skill.name} />)}</div></div>)}</div></div></section>
}
