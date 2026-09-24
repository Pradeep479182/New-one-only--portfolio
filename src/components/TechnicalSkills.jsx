import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import TechnicalSkillsCanvas from './TechnicalSkillsCanvas'
import { skills } from '../data/skills'

export default function TechnicalSkills() {
  return <section id="skills" className="section technical-skills-section"><div className="page-width"><SectionTitle eyebrow="02 / technical skills" title="Technical Skills" intro="A practical toolkit for building reliable, expressive digital products." /><motion.div className="skills-category-rail" initial={{ opacity: 0, rotateX: 12, y: 24 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}>{['Frontend', 'Backend', 'Database', 'Tools'].map((category, index) => <motion.span key={category} initial={{ opacity: 0, z: -30 }} whileInView={{ opacity: 1, z: 0 }} viewport={{ once: true }} transition={{ delay: index * .08, duration: .5 }}>{category}<small>{skills.filter((skill) => skill.category === category).length} technologies</small></motion.span>)}</motion.div><TechnicalSkillsCanvas skills={skills} /></div></section>
}
