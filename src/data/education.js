import hndCertificate from '../assets/Hnd certificate .pdf'
import diplomaCertificate from '../assets/Diploma certificate.pdf'
import hndPageOne from '../assets/Hnd/Cerificate first page.png'
import hndPageTwo from '../assets/Hnd/Second page.png'
import hndPageThree from '../assets/Hnd/Thired page.png'
import diplomaPageOne from '../assets/Diploma/First Page.png'
import diplomaPageTwo from '../assets/Diploma/Second Page.png'

export const education = [
  {
    institution: 'ESOFT Metro Campus',
    institutionUrl: 'https://esoft.lk/',
    qualification: 'Diploma in Information and Communication Technology',
    badge: 'Certification',
    description: 'Developing core knowledge across programming, databases, networking, and digital systems.',
    duration: 'Completed',
    certificateUrl: diplomaCertificate,
    previewPages: [diplomaPageOne, diplomaPageTwo],
  },
  {
    institution: 'ESOFT Metro Campus',
    institutionUrl: 'https://esoft.lk/',
    qualification: 'Higher National Diploma (HND) in Computing',
    badge: 'Certification',
    description: 'Building a practical foundation in software engineering, systems thinking, and product development.',
    duration: 'Completed',
    certificateUrl: hndCertificate,
    previewPages: [hndPageOne, hndPageTwo, hndPageThree],
  },
 
  {
    institution: 'ESOFT Metro Campus',
    institutionUrl: 'https://esoft.lk/',
    qualification: 'BEng (Hons) in Software Engineering (Top-up)',
    qualificationUrl: 'https://esoft.lk/esoft-courses/beng-hons-in-software-engineering-top-up-london-met-university-uk/',
    description: 'A 1-year British degree program awarded by London Metropolitan University (UK).',
    universityUrl: 'https://www.londonmet.ac.uk/courses/undergraduate/software-engineering-top-up---beng-hons/',
    duration: 'Present(2026)',
  },
]
