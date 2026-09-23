const API_URL = 'https://api.github.com'

export async function getRepositories(username, { excludedRepositories = [] } = {}) {
  const repositories = []
  let page = 1

  while (true) {
    const response = await fetch(`${API_URL}/users/${encodeURIComponent(username)}/repos?type=all&sort=updated&direction=desc&per_page=100&page=${page}`)
    if (!response.ok) throw new Error(`GitHub repositories request failed: ${response.status}`)
    const batch = await response.json()
    repositories.push(...batch)
    if (batch.length < 100) break
    page += 1
  }

  const excluded = new Set(excludedRepositories)
  return repositories
    .filter((repository) => !repository.fork && !repository.archived && repository.size > 0 && !excluded.has(repository.name))
    .sort((first, second) => new Date(second.updated_at) - new Date(first.updated_at))
}
