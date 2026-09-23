import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { renderToStaticMarkup } from 'react-dom/server'

function makeLogoSource(skill) {
  const markup = renderToStaticMarkup(<skill.icon color={skill.color} />)
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
}

export default function TechnicalSkillsCanvas({ skills }) {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const stateRef = useRef({ items: [], width: 0, height: 0, offset: 0, targetOffset: 0, paused: false, visible: false, dragging: false, pointerX: 0, hovered: -1, hitboxes: [] })
  const [tooltip, setTooltip] = useState(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return undefined
    const context = canvas.getContext('2d')
    const state = stateRef.current
    let resizeObserver
    let intersectionObserver

    const items = skills.map((skill) => ({ skill, image: new Image(), loaded: false }))
    items.forEach((item) => {
      item.image.onload = () => { item.loaded = true }
      item.image.src = makeLogoSource(item.skill)
    })
    state.items = items

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.width = bounds.width
      state.height = bounds.height
      canvas.width = Math.round(bounds.width * dpr)
      canvas.height = Math.round(bounds.height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time) => {
      const width = state.width
      const height = state.height
      if (!width || !height) return
      const center = width / 2
      const spacing = Math.max(118, Math.min(168, width * .18))
      const cycle = items.length * spacing
      const motionSpeed = Math.min(0.028, Math.max(0.014, width / 70000))
      if (!state.paused && state.visible && !state.dragging && !reduceMotion) state.targetOffset -= motionSpeed * (time - (state.lastTime || time))
      state.lastTime = time
      state.offset += (state.targetOffset - state.offset) * (reduceMotion ? 1 : .12)
      context.clearRect(0, 0, width, height)
      context.save()
      context.translate(0, height * .03)
      context.strokeStyle = 'rgba(161,139,255,.12)'
      context.lineWidth = 1
      context.beginPath()
      context.moveTo(0, height * .7)
      context.lineTo(width, height * .7)
      context.stroke()
      state.hitboxes = []

      items.forEach((item, itemIndex) => {
        let x = center + itemIndex * spacing + state.offset
        x = ((x - center + cycle / 2) % cycle + cycle) % cycle - cycle / 2 + center
        const distance = Math.abs(x - center) / (spacing * 2.8)
        const depth = Math.max(0, Math.cos(Math.min(distance, 1.5) * Math.PI / 2))
        const scale = .68 + depth * .34
        const size = 72 * scale
        const y = height * .37 + (1 - depth) * 22
        const alpha = Math.max(.24, .35 + depth * .65)
        const isHovered = itemIndex === state.hovered
        const cardWidth = Math.max(104, size + 42)
        const cardHeight = 150 * scale
        state.hitboxes.push({ itemIndex, x: x - cardWidth / 2, y: y - 45, width: cardWidth, height: cardHeight })

        context.save()
        context.globalAlpha = isHovered ? 1 : alpha
        context.filter = depth < .38 ? `blur(${Math.round((1 - depth) * 2.2)}px)` : 'none'
        const badgeX = x - cardWidth / 2
        const badgeY = y - 45
        const badgeGradient = context.createLinearGradient(badgeX, badgeY, badgeX + cardWidth, badgeY + cardHeight)
        badgeGradient.addColorStop(0, depth > .7 ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.06)')
        badgeGradient.addColorStop(.55, 'rgba(255,255,255,.035)')
        badgeGradient.addColorStop(1, 'rgba(91,78,166,.12)')
        context.fillStyle = badgeGradient
        context.strokeStyle = depth > .7 ? 'rgba(185,174,255,.52)' : 'rgba(255,255,255,.1)'
        roundedRect(context, x - cardWidth / 2, y - 45, cardWidth, cardHeight, 16)
        context.fill()
        context.stroke()
        context.globalAlpha = isHovered ? 1 : alpha * .48
        context.fillStyle = 'rgba(91,78,166,.3)'
        roundedRect(context, badgeX + 3, badgeY + 6, cardWidth - 6, cardHeight - 6, 14)
        context.fill()
        context.globalAlpha = isHovered ? 1 : alpha
        context.fillStyle = 'rgba(255,255,255,.16)'
        roundedRect(context, badgeX + 1, badgeY + 1, cardWidth - 2, cardHeight * .36, 15)
        context.fill()
        context.shadowColor = depth > .7 ? 'rgba(161,139,255,.24)' : 'transparent'
        context.shadowBlur = depth > .7 ? 28 : 0
        if (item.loaded) {
          const logoX = x - size / 2
          const logoY = y - 21
          context.globalAlpha = isHovered ? .32 : alpha * .22
          context.filter = depth < .38 ? `blur(${Math.round((1 - depth) * 2.2)}px)` : 'blur(1px)'
          context.drawImage(item.image, logoX + 3, logoY + 5, size, size)
          context.globalAlpha = isHovered ? 1 : alpha
          context.filter = depth < .38 ? `blur(${Math.round((1 - depth) * 2.2)}px)` : 'none'
          context.drawImage(item.image, logoX, logoY, size, size)
        }
        context.shadowBlur = 0
        context.textAlign = 'center'
        context.font = `${depth > .7 ? 600 : 500} ${Math.max(10, 12 * scale)}px Manrope, sans-serif`
        context.fillStyle = depth > .7 ? '#f2efff' : '#b5b3c3'
        context.fillText(item.skill.name, x, y + 57 * scale)
        context.font = `${Math.max(8, 9 * scale)}px DM Mono, monospace`
        context.fillStyle = depth > .7 ? '#a99aff' : '#77798c'
        context.fillText(item.skill.category.toUpperCase(), x, y + 75 * scale)
        context.restore()
      })
      context.restore()
    }

    const animate = (time) => {
      draw(time)
      frameRef.current = window.requestAnimationFrame(animate)
    }
    const setPointer = (event) => {
      const bounds = canvas.getBoundingClientRect()
      const x = event.clientX - bounds.left
      state.pointerX = x
      const hit = state.hitboxes.find((box) => x >= box.x && x <= box.x + box.width && event.clientY - bounds.top >= box.y && event.clientY - bounds.top <= box.y + box.height)
      const nextHovered = hit ? hit.itemIndex : -1
      if (nextHovered !== state.hovered) {
        state.hovered = nextHovered
        setTooltip(hit ? { name: items[hit.itemIndex].skill.name, x: x / bounds.width * 100, y: (hit.y - 8) / bounds.height * 100 } : null)
      }
    }
    const pointerDown = (event) => { state.dragging = true; state.pointerX = event.clientX; canvas.setPointerCapture?.(event.pointerId) }
    const pointerMove = (event) => {
      if (state.dragging) {
        const delta = event.clientX - state.pointerX
        state.targetOffset += delta
        state.offset += delta
        state.pointerX = event.clientX
      }
      setPointer(event)
    }
    const pointerUp = (event) => { state.dragging = false; canvas.releasePointerCapture?.(event.pointerId) }
    const click = () => {
      if (state.hovered < 0) return
      const center = widthFor(state.width) / 2
      const spacing = Math.max(118, Math.min(168, state.width * .18))
      const cycle = items.length * spacing
      let x = center + state.hovered * spacing + state.offset
      x = ((x - center + cycle / 2) % cycle + cycle) % cycle - cycle / 2 + center
      state.targetOffset += center - x
    }
    const widthFor = (width) => width || canvas.clientWidth
    const enter = () => { state.paused = true }
    const leave = () => { state.paused = false; state.hovered = -1; setTooltip(null) }
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    intersectionObserver = new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting }, { threshold: .05 })
    intersectionObserver.observe(section)
    canvas.addEventListener('pointermove', pointerMove)
    canvas.addEventListener('pointerdown', pointerDown)
    canvas.addEventListener('pointerup', pointerUp)
    canvas.addEventListener('pointercancel', pointerUp)
    canvas.addEventListener('click', click)
    canvas.addEventListener('pointerenter', enter)
    canvas.addEventListener('pointerleave', leave)
    resize()
    state.visible = true
    frameRef.current = window.requestAnimationFrame(animate)
    return () => {
      window.cancelAnimationFrame(frameRef.current)
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerdown', pointerDown)
      canvas.removeEventListener('pointerup', pointerUp)
      canvas.removeEventListener('pointercancel', pointerUp)
      canvas.removeEventListener('click', click)
      canvas.removeEventListener('pointerenter', enter)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [reduceMotion, skills])

  return <div className="skills-carousel" ref={sectionRef}><canvas ref={canvasRef} aria-label="Interactive 3D technical skills carousel" role="img" />{tooltip && <div className="skills-tooltip" style={{ left: `${tooltip.x}%`, top: `${tooltip.y}%` }}>{tooltip.name}</div>}<div className="skills-carousel-hint">Drag to explore · Hover to pause</div></div>
}