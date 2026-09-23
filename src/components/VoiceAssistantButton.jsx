import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const introSummary = 'Hello, I am Pradeep Rakavi. I am a software engineering student and developer who builds meaningful digital experiences through thoughtful design and clean, efficient code.'

export default function VoiceAssistantButton() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

  useEffect(() => () => {
    if (supported) window.speechSynthesis.cancel()
  }, [supported])

  const toggleSpeech = () => {
    if (!supported) return
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find((item) => /zira|samantha|victoria|karen|google uk english female|female/i.test(item.name)) || voices.find((item) => /^en(-|_)/i.test(item.lang))
    const utterance = new window.SpeechSynthesisUtterance(introSummary)
    if (voice) utterance.voice = voice
    utterance.lang = voice?.lang || 'en-US'
    utterance.rate = 0.95
    utterance.pitch = 1.15
    utterance.volume = 1
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.resume()
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  return <button className="button button--voice" type="button" onClick={toggleSpeech} disabled={!supported} aria-label={isSpeaking ? 'Stop voice assistant' : 'Start voice assistant'} title={supported ? 'Listen to portfolio introduction' : 'Speech is not supported in this browser'}><span>{isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}</span>{supported ? (isSpeaking ? 'Stop voice' : 'Listen to intro') : 'Voice unavailable'}</button>
}
