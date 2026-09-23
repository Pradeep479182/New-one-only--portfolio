import { GitFork, Star } from 'lucide-react'

export default function GitHubProjectStats({ repository }) {
  return <span className="project-stats"><span><Star size={14} /> {repository.stargazers_count}</span><span><GitFork size={14} /> {repository.forks_count}</span></span>
}
