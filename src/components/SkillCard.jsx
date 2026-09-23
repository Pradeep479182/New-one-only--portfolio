import { motion } from 'framer-motion'

export default function SkillCard({ skill, index }) {
  const Icon = skill.icon
  return <motion.article className="tech-skill-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: index * .045, duration: .45 }} whileHover={{ y: -5, scale: 1.025 }}>
    <Icon className="tech-skill-icon" style={{ color: skill.color }} aria-hidden="true" />
    <div><h3>{skill.name}</h3><span>{skill.category}</span></div>
  </motion.article>
}
