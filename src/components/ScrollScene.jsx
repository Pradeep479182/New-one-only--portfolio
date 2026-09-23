import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ScrollScene({ children, className = '' }) {
  const sceneRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  })
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]), { stiffness: 90, damping: 24 })
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -22]), { stiffness: 90, damping: 24 })
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]), { stiffness: 90, damping: 24 })

  return (
    <motion.div
      ref={sceneRef}
      className={`scroll-scene ${className}`}
      style={reduceMotion ? undefined : { rotateX, y: translateY, scale }}
    >
      {children}
    </motion.div>
  )
}