import SectionTitle from './SectionTitle'
import Timeline from './Timeline'
import { education } from '../data/education'

export default function Education() {
  return <section id="education" className="section education-section"><div className="page-width"><SectionTitle eyebrow="04 / education" title="The foundation underneath." intro="A growing academic path shaped around software engineering and the work I want to build." /><Timeline items={education} /></div></section>
}
