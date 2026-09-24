import { motion, useReducedMotion } from 'framer-motion'

export default function LoadingScreen() {
  const reduceMotion = useReducedMotion()

  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} role="status" aria-label="Loading portfolio">
    <div className="loading-scene">
      <motion.div className="loading-orbit loading-orbit--outer" animate={reduceMotion ? undefined : { rotateZ: 360, rotateX: 62 }} transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="loading-orbit loading-orbit--inner" animate={reduceMotion ? undefined : { rotateZ: -360, rotateY: 62 }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="loading-core" animate={reduceMotion ? undefined : { rotateY: 360, rotateX: 360 }} transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}>PR</motion.div>
    </div>
    <div className="loading-label"><span>Pradeep Rakavi</span><small>Loading portfolio</small></div>
    <div className="loading-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.15, ease: 'easeInOut' }} /></div>
  </motion.div>
}
