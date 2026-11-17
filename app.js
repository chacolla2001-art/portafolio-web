// Detalles de la página. Todo es opcional: sin JavaScript el contenido se ve igual.
const raiz = document.documentElement
const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches
// «#captura» deja la página quieta y completa, para sacar capturas de pantalla.
// También queda quieta si se abre en una pestaña en segundo plano, donde el navegador pausa las animaciones.
const quieto = menosMovimiento || location.hash === '#captura' || document.hidden
if (location.hash === '#captura') raiz.classList.add('quieto')

// Aparición suave al entrar en pantalla
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
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
  porVer.forEach((e) => ojo.observe(e))
}

// Borde de la navegación al desplazarse
const nav = document.querySelector('.nav')
const alDesplazar = () => nav.classList.toggle('con-borde', scrollY > 8)
addEventListener('scroll', alDesplazar, { passive: true })
alDesplazar()
