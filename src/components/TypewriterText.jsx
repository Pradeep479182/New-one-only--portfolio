import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function TypewriterText({ text, typingSpeed = 105, startDelay = 0, showCursor = true }) {
  const reduceMotion = useReducedMotion()
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    if (reduceMotion) return undefined
    let character = 0
    let typingTimer
    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        character += 1
        setVisibleText(text.slice(0, character))
        if (character >= text.length) window.clearInterval(typingTimer)
      }, typingSpeed)
    }, startDelay)
    return () => { window.clearTimeout(startTimer); window.clearInterval(typingTimer) }
  }, [reduceMotion, startDelay, text, typingSpeed])

  const displayedText = reduceMotion ? text : visibleText
  const finished = displayedText.length === text.length
  return <span className="typewriter-text">{[...displayedText].map((character, index) => index >= 17 && index < 28 ? <em key={`${character}-${index}`}>{character}</em> : <span key={`${character}-${index}`}>{character}</span>)}{showCursor && !finished && <span className="typewriter-cursor" aria-hidden="true">|</span>}</span>
}
