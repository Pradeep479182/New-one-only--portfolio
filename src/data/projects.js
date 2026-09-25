import smartClinicImage from '../assets/smartclinic.png'
import verdanaImage from '../assets/leofora.png'
import speaksparkenglishImage from '../assets/speaksparkenglish.png'    
import SmartTripPlannerImage from '../assets/Smart Trip Planner.png'
import ModernWeatherappImage from '../assets/Weatherapp.png'
import caravoidgameImage from '../assets/Car game.png'

const githubBase = 'https://github.com/Pradeep479182'

export const projects = [
  {
    id: 'smart-clinic',
    name: 'Smart Clinic',
    label: '01 / healthcare platform',
    summary: 'Group Project: Smart Clinic is a healthcare platform that streamlines patient discovery, appointment scheduling, and clinic workflows into a single interface.',
    details: 'Smart Clinic brings patient discovery, appointment scheduling, and clinic workflows into one clear interface. The experience is designed around fast decisions for patients and staff, with responsive views that stay useful on smaller screens.',
    keyFeatures: ['Patient and clinic discovery', 'Appointment scheduling flow', 'Responsive staff and patient views'],
    technologies: ['React', 'JavaScript', 'CSS', 'REST API'],
    image: smartClinicImage,
    codeUrl: `${githubBase}/smart-clinic`,
    liveUrl: '',
  },

  {
    id: 'speaksparkenglish',
    name: 'SpeakSparkEnglish',
    label: '02 / language learning platform',
    summary: 'A language learning platform that helps users improve their English skills through interactive lessons and exercises.',
    details: 'Speak Spark English offers a variety of lessons, quizzes, and interactive exercises designed to enhance vocabulary, grammar, and conversational skills. The platform provides personalized feedback and tracks progress over time.',
    keyFeatures: ['Interactive lessons and quizzes', 'Vocabulary and grammar practice', 'Progress tracking and feedback'],
    technologies: ['React', 'JavaScript', 'CSS', 'REST API'],
    image: speaksparkenglishImage,
    codeUrl: `${githubBase}/speaksparkenglish`,
    liveUrl: 'https://speaksparkenglish.netlify.app/',
  },
  
  {
    id: 'Smart-Trip-Planner',
    name: 'Smart-Trip-Planner',
    label: '03 / Smart-Trip-Planner',
    summary: 'Smart Trip Planner is a full-stack travel app for destination discovery, AI trip planning, 3D exploration, and GPS tracking.',
    details: 'Smart Trip Planner is a full-stack web application that brings together destination discovery, real-world place information, AI-powered itinerary generation, 3D interactive visualization, and live GPS tracking into one unified platform.',
    keyFeatures: ['AI-powered itinerary generation', '3D destination exploration', 'Live GPS trip tracking'],
    technologies: ['React', 'Node.js', 'Express.js', 'TypeScript '],
    image: SmartTripPlannerImage,
    codeUrl: `${githubBase}/Smart-Trip-Planner`,
  },

  {
  
    id: 'verdana',
    name: 'Verdana',
    label: '04 / plant vase studio',
    summary: 'A warm, animated studio website for a handcrafted plant vase brand rooted in natural materials.',
    details: 'Verdana presents a small-batch vase collection through an immersive hero, animated botanical illustration, product hover states, an interactive making process, testimonials, and a newsletter signup. The experience pairs organic motion with a calm editorial layout so the craft remains the focus.',
    keyFeatures: ['Animated botanical illustration', 'Interactive making process', 'Product hover states and newsletter signup'],
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Pure CSS animations'],
    image: verdanaImage,
    codeUrl: `${githubBase}/plant-vase-website`,
    liveUrl: 'https://leofora.netlify.app/',
  },
 {
    id: 'Modern-Weatherapp',
    name: 'Modern-Weatherapp',
    label: '05 / Modern-Weatherapp',
    summary: 'Modern Weather App is a React + TypeScript + Vite application that provides real-time weather information with a modern, responsive interface.',
    details: 'Modern Weather App is a responsive weather application built with React, TypeScript, and Vite. It allows users to search for locations and view real-time weather information through a clean and modern interface.',
    keyFeatures: ['Location search', 'Real-time weather information', 'Responsive weather dashboard'],
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Pure CSS animations'],
    image: ModernWeatherappImage,
    codeUrl: `${githubBase}/Modern-Weatherapp`,
    liveUrl:'https://modernweater.netlify.app/'
  },
  {
    id:'car-avoid-game',
    name:'car-avoid-game',
    label: '06 / Modern-Weatherapp',
    summary: 'Car Avoid Game is a web game where players control a car, avoid incoming obstacles, and try to achieve a high score.',
    details: 'Car Avoid Game is an interactive browser-based game built with React and Vite. Players control a car, avoid incoming vehicles or obstacles, and try to survive as long as possible while achieving a high score. The game provides a simple, responsive, and engaging gameplay experience with smooth controls and real-time score tracking.',
    keyFeatures: ['Keyboard and touch-friendly controls', 'Obstacle avoidance gameplay', 'Real-time score tracking'],
    technologies: ['React', 'TypeScript', 'Vite','Pure CSS animations'],
    image: caravoidgameImage,
    codeUrl: `${githubBase}/car-avoid-game`,
    liveUrl:'https://car-avoid-game.netlify.app/'
  }


]
