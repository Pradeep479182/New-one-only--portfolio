import { motion } from 'framer-motion'

export default function ProjectSkeleton({ index }) {
  return <motion.article className="project-card project-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * .08 }}><div className="skeleton-art" /><div className="skeleton-body"><span /><span /><span /><span /></div></motion.article>
}
