// Animaciones de la página. Todo es opcional: sin JavaScript el contenido se ve igual.
const raiz = document.documentElement
const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches
// «#captura» deja la página quieta y completa, para sacar capturas de pantalla.
const quieto = menosMovimiento || location.hash === '#captura'
if (location.hash === '#captura') raiz.classList.add('quieto')

// Aparición al entrar en pantalla
const porVer = document.querySelectorAll('.ver')
if (quieto || !('IntersectionObserver' in window)) {
  porVer.forEach((e) => e.classList.add('visto'))
} else {
  const ojo = new IntersectionObserver((entradas) => {
    for (const { isIntersecting, target } of entradas) {
      if (!isIntersecting) continue
      target.classList.add('visto')
      ojo.unobserve(target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  porVer.forEach((e) => ojo.observe(e))
}

// Cifras que cuentan hasta su valor
function contar(el) {
  const meta = Number(el.dataset.contar)
  if (quieto) { el.textContent = meta; return }
  const inicio = performance.now()
  const dura = 1100
  const paso = (ahora) => {
    const t = Math.min(1, (ahora - inicio) / dura)
    el.textContent = Math.round(meta * (1 - (1 - t) ** 3))
    if (t < 1) requestAnimationFrame(paso)
  }
  requestAnimationFrame(paso)
}
const cifras = document.querySelectorAll('[data-contar]')
if ('IntersectionObserver' in window && !quieto) {
  const ojoCifras = new IntersectionObserver((entradas) => {
    for (const { isIntersecting, target } of entradas) {
      if (!isIntersecting) continue
      contar(target)
      ojoCifras.unobserve(target)
    }
  }, { threshold: 0.6 })
  cifras.forEach((c) => ojoCifras.observe(c))
} else {
  cifras.forEach(contar)
}

// Frase que rota en el titular
const rota = document.querySelector('.rota')
if (rota && !quieto) {
  const frases = JSON.parse(rota.dataset.frases)
  const palabra = rota.querySelector('span')
  let i = 0
  setInterval(() => {
    palabra.classList.add('sale')
    setTimeout(() => {
      i = (i + 1) % frases.length
      palabra.textContent = frases[i]
      palabra.classList.remove('sale')
      palabra.classList.add('entra')
      requestAnimationFrame(() => requestAnimationFrame(() => palabra.classList.remove('entra')))
    }, 350)
  }, 2600)
}

// Barra de progreso y borde de la navegación
const progreso = document.querySelector('.progreso')
const nav = document.querySelector('.nav')
let pendiente = false
function alDesplazar() {
  pendiente = false
  const alto = raiz.scrollHeight - innerHeight
  progreso.style.transform = `scaleX(${alto > 0 ? scrollY / alto : 0})`
  nav.classList.toggle('con-borde', scrollY > 8)
}
addEventListener('scroll', () => {
  if (pendiente) return
  pendiente = true
  requestAnimationFrame(alDesplazar)
}, { passive: true })
alDesplazar()

// Foco de luz que sigue al cursor dentro de cada tarjeta
if (matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.tarjeta').forEach((t) => {
    t.addEventListener('pointermove', (e) => {
      const r = t.getBoundingClientRect()
      t.style.setProperty('--mx', `${e.clientX - r.left}px`)
      t.style.setProperty('--my', `${e.clientY - r.top}px`)
    })
  })
}
