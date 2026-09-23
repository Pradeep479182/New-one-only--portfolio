const customProjectImages = {}

const technologyThemes = {
  react: ['#182b4a', '#61dafb'],
  python: ['#182e3e', '#ffd343'],
  csharp: ['#2a1d3d', '#b179d8'],
  javascript: ['#3b3218', '#f7df1e'],
  typescript: ['#182d48', '#3178c6'],
  html: ['#3c2019', '#e34f26'],
  css: ['#182b45', '#1572b6'],
  default: ['#1a1d3b', '#a18bff'],
}

function fallbackImage(repository) {
  const key = (repository.language || repository.technologies?.[0] || '').toLowerCase()
  const [background, accent] = technologyThemes[key] || technologyThemes.default
  const label = repository.language || repository.technologies?.[0] || 'OPEN SOURCE'
  const name = String(repository.name || repository.id || 'PROJECT').toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><defs><linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#080912"/></linearGradient></defs><rect width="1200" height="675" fill="url(#background)"/><circle cx="950" cy="145" r="180" fill="none" stroke="${accent}" stroke-opacity=".28" stroke-width="2"/><circle cx="950" cy="145" r="110" fill="none" stroke="${accent}" stroke-opacity=".5" stroke-width="2"/><circle cx="950" cy="145" r="7" fill="${accent}"/><path d="M0 520C230 390 380 610 630 470S980 350 1200 460" fill="none" stroke="${accent}" stroke-opacity=".35" stroke-width="2"/><text x="72" y="555" fill="#f4f3fb" font-family="monospace" font-size="28" letter-spacing="5">${label.toUpperCase()}</text><text x="74" y="595" fill="${accent}" font-family="monospace" font-size="13" letter-spacing="3">GITHUB PROJECT / ${name}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function getProjectImage(repository) {
  return customProjectImages[repository.name] || repository.image || fallbackImage(repository)
}

export function getFallbackProjectImage(repository) {
  return fallbackImage(repository)
}
