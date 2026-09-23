import { motion } from 'framer-motion'
export default function SectionTitle({ eyebrow, title, intro }) { return <motion.div className="section-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{intro && <p>{intro}</p>}</motion.div> }
