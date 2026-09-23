import smartClinicImage from '../assets/smartclinic.png'
import verdanaImage from '../assets/leofora.png'
import speaksparkenglishImage from '../assets/speaksparkenglish.png'    


const githubBase = 'https://github.com/Pradeep479182'

export const projects = [
  {
    id: 'smart-clinic',
    name: 'Smart Clinic',
    label: '01 / healthcare platform',
    summary: 'A focused clinic experience that makes appointments and patient information easier to manage.',
    details: 'Smart Clinic brings patient discovery, appointment scheduling, and clinic workflows into one clear interface. The experience is designed around fast decisions for patients and staff, with responsive views that stay useful on smaller screens.',
    technologies: ['React', 'JavaScript', 'CSS', 'REST API'],
    image: smartClinicImage,
    codeUrl: `${githubBase}/smart-clinic`,
    liveUrl: '',
  },
  {
    id: 'verdana',
    name: 'Verdana',
    label: '02 / plant vase studio',
    summary: 'A warm, animated studio website for a handcrafted plant vase brand rooted in natural materials.',
    details: 'Verdana presents a small-batch vase collection through an immersive hero, animated botanical illustration, product hover states, an interactive making process, testimonials, and a newsletter signup. The experience pairs organic motion with a calm editorial layout so the craft remains the focus.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Pure CSS animations'],
    image: verdanaImage,
    codeUrl: `${githubBase}/plant-vase-website`,
    liveUrl: 'https://leofora.netlify.app/',
  },
  {
    id: 'speaksparkenglish',
    name: 'SpeakSparkEnglish',
    label: '03 / language learning platform',
    summary: 'A language learning platform that helps users improve their English skills through interactive lessons and exercises.',
    details: 'Speak Spark English offers a variety of lessons, quizzes, and interactive exercises designed to enhance vocabulary, grammar, and conversational skills. The platform provides personalized feedback and tracks progress over time.',
    technologies: ['React', 'JavaScript', 'CSS', 'REST API'],
    image: speaksparkenglishImage,
    codeUrl: `${githubBase}/speaksparkenglish`,
    liveUrl: 'https://speaksparkenglish.netlify.app/',
  }
]
