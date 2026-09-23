import { motion } from 'framer-motion'
import EducationCard from './EducationCard'

export default function Timeline({ items }) {
  return <div className="education-timeline"><motion.div className="education-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.2, ease: 'easeOut' }} />{items.map((item, index) => <div className="education-entry" key={item.qualification}><motion.span className="education-node" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: index * .16 + .2, type: 'spring', stiffness: 180, damping: 18 }} /><EducationCard item={item} index={index} /></div>)}</div>
}
