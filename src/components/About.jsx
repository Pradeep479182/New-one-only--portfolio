import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles, Volume2, VolumeX } from 'lucide-react'
import SectionTitle from './SectionTitle'
const aboutSummary = 'A software engineering student who likes turning complicated ideas into clear, useful products. My work lives at the intersection of engineering, design, and intelligent systems. I care about the tiny details that make technology feel human. I am currently studying a BEng Honours in Software Engineering top-up at London Metropolitan University through ESOFT Metro Campus.'

export default function About() {
	const statementRef = useRef(null)
	const reduceMotion = useReducedMotion()
	const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start end', 'end start'] })
	const statementX = useSpring(useTransform(scrollYProgress, [0, .42, .58, 1], ['-18%', '0%', '0%', '18%']), { stiffness: 80, damping: 24 })
	const statementBlur = useTransform(scrollYProgress, [0, .42, .58, 1], ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'])
	const statementOpacity = useTransform(scrollYProgress, [0, .28, .5, .72, 1], [.35, .8, 1, .8, .35])
	const statementScale = useSpring(useTransform(scrollYProgress, [0, .5, 1], [.96, 1, .96]), { stiffness: 80, damping: 24 })
	const factBlur = useTransform(scrollYProgress, [0, .38, .62, 1], ['blur(7px)', 'blur(0px)', 'blur(0px)', 'blur(7px)'])
	const factOneX = useSpring(useTransform(scrollYProgress, [0, .42, .58, 1], ['-24%', '0%', '0%', '24%']), { stiffness: 100, damping: 26 })
	const factTwoX = useSpring(useTransform(scrollYProgress, [0, .42, .58, 1], ['20%', '0%', '0%', '-20%']), { stiffness: 100, damping: 26 })
	const factThreeX = useSpring(useTransform(scrollYProgress, [0, .42, .58, 1], ['-18%', '0%', '0%', '18%']), { stiffness: 100, damping: 26 })
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [voices, setVoices] = useState([])
	const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

	useEffect(() => {
		if (!speechSupported) return undefined
		const updateVoices = () => setVoices(window.speechSynthesis.getVoices())
		updateVoices()
		window.speechSynthesis.addEventListener('voiceschanged', updateVoices)
		return () => {
			window.speechSynthesis.cancel()
			window.speechSynthesis.removeEventListener('voiceschanged', updateVoices)
		}
	}, [speechSupported])

	const toggleSummarySpeech = () => {
		if (!speechSupported) return
		if (isSpeaking) {
			window.speechSynthesis.cancel()
			setIsSpeaking(false)
			return
		}
		const utterance = new window.SpeechSynthesisUtterance(aboutSummary)
		const availableVoices = voices.length ? voices : window.speechSynthesis.getVoices()
		const preferredVoice = availableVoices.find((voice) => /zira|samantha|victoria|karen|google uk english female|female/i.test(voice.name)) || availableVoices.find((voice) => /^en(-|_)/i.test(voice.lang))
		if (preferredVoice) utterance.voice = preferredVoice
		utterance.lang = preferredVoice?.lang || 'en-US'
		utterance.rate = 0.95
		utterance.pitch = 1.15
		utterance.volume = 1
		utterance.onstart = () => setIsSpeaking(true)
		utterance.onend = () => setIsSpeaking(false)
		utterance.onerror = () => setIsSpeaking(false)
		window.speechSynthesis.cancel()
		window.speechSynthesis.resume()
		window.speechSynthesis.speak(utterance)
		setIsSpeaking(true)
	}

	return <section id="about" className="section about-section page-width"><SectionTitle eyebrow="01 / about" title={<>Curious by nature.<br />Precise by craft.</>} intro="A software engineering student who likes turning complicated ideas into clear, useful products." /><div className="about-grid"><motion.div ref={statementRef} className="about-statement" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><Sparkles size={20} className="accent-icon" /><motion.p className="about-statement-motion" style={reduceMotion ? undefined : { x: statementX, filter: statementBlur, opacity: statementOpacity, scale: statementScale }}>My work lives at the intersection of <strong>engineering, design, and intelligent systems.</strong> I care about the tiny details that make technology feel human.</motion.p><div className="about-actions"><a className="text-link" href="mailto:pradeeprakavi@gmail.com">More about my journey <ArrowUpRight size={15} /></a><button className="voice-summary-button" type="button" onClick={toggleSummarySpeech} disabled={!speechSupported} aria-label={isSpeaking ? 'Stop About summary' : 'Listen to About summary'} title={speechSupported ? (isSpeaking ? 'Stop summary' : 'Listen to summary') : 'Speech is not supported in this browser'}><span className="voice-summary-icon">{isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}</span>{speechSupported ? (isSpeaking ? 'Stop summary' : 'Listen to summary') : 'Voice unavailable'}</button></div></motion.div><div className="about-facts"><motion.div style={reduceMotion ? undefined : { x: factOneX, filter: factBlur }}><span>currently</span><strong>BEng (Hons) in Software Engineering (Top-up)</strong><small>London Metropolitan University, ESOFT Metro Campus</small></motion.div><motion.div style={reduceMotion ? undefined : { x: factTwoX, filter: factBlur }}><span>focus</span><strong>Full-stack products</strong><small>React, Next.js, APIs & AI experiences</small></motion.div><motion.div style={reduceMotion ? undefined : { x: factThreeX, filter: factBlur }}><span>approach</span><strong>Thoughtful by default</strong><small>Accessible, fast, and made to last</small></motion.div></div></div></section>
}
