// Genera index.html (español) y en.html (inglés) a partir de una sola plantilla.
// Uso: node construir.mjs
import { writeFileSync } from 'node:fs'

const GH = 'https://github.com/chacolla2001-art'
const PAGINAS = 'https://chacolla2001-art.github.io'
const CORREO = 'chacolla43@gmail.com'
const LINKEDIN = 'https://linkedin.com/in/pedro-chacolla-b18918359'

const ICONOS = {
  carrito: '<path d="M3 4h2l2.4 11h10.2L20 7H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  codigo: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14"/>',
  rayo: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  billetera: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 15h2"/>',
  caja: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  ayuda: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
  pulso: '<path d="M2 12h4l3-8 4 16 3-8h6"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  externo: '<path d="M7 17L17 7M9 7h8v8"/>',
  correo: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>',
  lugar: '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  birrete: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c2 2 10 2 12 0v-4.5"/>',
  mundo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
}
const icono = (n, clase = '') => `<svg class="icono ${clase}" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[n]}</svg>`
const GITHUB = '<svg class="icono lleno" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>'

// Datos comunes de los proyectos (lo que no cambia con el idioma)
const DEMOS = [
  { id: 'caja-pos', icono: 'carrito', c1: '#22c55e', c2: '#14b8a6', demo: `${PAGINAS}/caja-pos/#demo`, alto: 800, etiquetas: ['JavaScript', 'HTML', 'CSS', 'node:test'] },
  { id: 'reservas', icono: 'calendario', c1: '#a78bfa', c2: '#f472b6', demo: `${PAGINAS}/reservas/#demo`, alto: 800, etiquetas: ['JavaScript', 'HTML', 'CSS', 'node:test'] },
  { id: 'tablero-ventas', icono: 'grafico', c1: '#38bdf8', c2: '#818cf8', demo: `${PAGINAS}/tablero-ventas/`, alto: 900, etiquetas: ['JavaScript', 'SVG', 'CSV', 'node:test'] },
]
const BACKENDS = [
  { id: 'billetera-api', icono: 'billetera', c1: '#fbbf24', c2: '#f97316', ancho: 1280, alto: 900, etiquetas: ['Python', 'FastAPI', 'SQLAlchemy', 'pytest', 'Docker'] },
  { id: 'inventario-spring', icono: 'caja', c1: '#fb923c', c2: '#f43f5e', ancho: 1280, alto: 860, etiquetas: ['Java 21', 'Spring Boot', 'JPA', 'JUnit', 'Maven'] },
  { id: 'mesa-de-ayuda', icono: 'ayuda', c1: '#22d3ee', c2: '#3b82f6', ancho: 1280, alto: 1000, etiquetas: ['TypeScript', 'Node.js', 'Express', 'SQLite'] },
  { id: 'monitor-red', icono: 'pulso', c1: '#a3e635', c2: '#22c55e', ancho: 1100, alto: 560, etiquetas: ['TypeScript', 'Node.js', 'CLI'] },
]
const TECNOLOGIAS = ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'Java', 'Spring Boot', 'SQL', 'SQLite', 'HTML', 'CSS', 'SVG', 'Git', 'Docker', 'pytest', 'JUnit']

const TEXTOS = {
  es: {
    archivo: 'index.html',
    otro: { archivo: 'en.html', codigo: 'EN', lang: 'en' },
    titulo: 'Pedro Chacolla · Desarrollador de software',
    descripcion: 'Pedro Chacolla, desarrollador de software en La Paz, Bolivia. Sistemas para negocios (punto de venta, agenda de citas, tableros de ventas) y APIs con Python, Java y TypeScript. Demos en vivo.',
    menu: [['#demos', 'Demos'], ['#backends', 'Backends'], ['#servicios', 'Servicios'], ['#contacto', 'Contacto']],
    estado: 'Disponible para proyectos y contratación',
    nombre: 'Pedro Chacolla · Desarrollador de software',
    titular: 'Construyo software para',
    frases: ['cobrar sin errores', 'agendar sin choques', 'entender tus ventas', 'automatizar tareas'],
    resumen: 'Sistemas para negocios y APIs con pruebas automatizadas. Puedes abrir las demos y usarlas ahora mismo, sin instalar nada. Trabajo desde La Paz, Bolivia, en español e inglés.',
    verDemos: 'Ver demos en vivo',
    escribeme: 'Escríbeme',
    cifras: [[7, 'proyectos publicados'], [87, 'pruebas automatizadas'], [3, 'demos en vivo'], [2, 'idiomas de trabajo']],
    demosTitulo: ['Demos en vivo', 'Pruébalos antes de escribirme', 'Tres aplicaciones que funcionan en el navegador con datos de ejemplo. Ábrelas, vende, agenda una cita o carga tu propio archivo de ventas.'],
    enVivo: 'Demo en vivo',
    abrirDemo: 'Abrir la demo',
    codigo: 'Código',
    verCodigo: 'Ver código',
    backendsTitulo: ['Backends y herramientas', 'Lo que no se ve, bien hecho', 'APIs y herramientas con reglas de negocio claras, pruebas y documentación para ponerlas en marcha.'],
    proyectos: {
      'caja-pos': { nombre: 'Caja — punto de venta', alt: 'Pantalla de venta con catálogo, carrito y cobro', que: 'Para tiendas pequeñas: cobra, descuenta el stock, imprime el ticket y cierra el día.', puntos: ['Carrito con descuento y pago en efectivo, QR o tarjeta, con cálculo del cambio.', 'Nunca vende más de lo que hay y avisa qué productos reponer.', 'Reporte del día y exportación de ventas a Excel (CSV).'] },
      reservas: { nombre: 'Reservas — agenda de citas', alt: 'Agenda semanal con el formulario de nueva cita', que: 'Para peluquerías, consultorios y talleres: muestra solo los horarios realmente libres.', puntos: ['Dos citas no pueden superponerse; una cancelada libera su espacio.', 'Recordatorio por WhatsApp con el mensaje ya redactado.', 'Resumen del día: citas, ingreso esperado y ocupación.'] },
      'tablero-ventas': { nombre: 'Tablero de ventas', alt: 'Tablero con indicadores, línea de ingresos y gráficos', que: 'Convierte un archivo de ventas en indicadores y gráficos que se entienden de un vistazo.', puntos: ['Ingresos, ventas y promedio frente al periodo anterior.', 'Gráficos SVG hechos a mano, sin librerías.', 'Carga tu propio CSV: se lee en tu navegador y no se envía a ningún lado.'] },
      'billetera-api': { nombre: 'Billetera API', alt: 'Documentación interactiva de la Billetera API', que: 'API de una billetera digital con transferencias entre cuentas.', puntos: ['Dinero en centavos enteros: sin errores de redondeo.', 'Idempotencia: un reintento nunca cobra dos veces.', 'Límite diario y bloqueo de filas en orden fijo.'] },
      'inventario-spring': { nombre: 'Inventario', alt: 'Panel web del inventario', que: 'API y panel web de inventario: entradas, salidas, ajustes por conteo y kardex.', puntos: ['Alertas de stock mínimo y valorización.', 'Bloqueo optimista para cambios simultáneos.', 'Pruebas unitarias y de integración.'] },
      'mesa-de-ayuda': { nombre: 'Mesa de ayuda', alt: 'Panel de la mesa de ayuda', que: 'Sistema de tickets de soporte con plazos por prioridad, roles y métricas.', puntos: ['Flujo de estados controlado e historial de cambios.', 'Tickets vencidos y porcentaje resuelto a tiempo.', 'Contraseñas con scrypt y sesiones con vencimiento.'] },
      'monitor-red': { nombre: 'Monitor de servicios', alt: 'Página de estado del monitor', que: 'Herramienta de línea de comandos que avisa cuando un sitio o servicio deja de responder.', puntos: ['Estado arriba, lento o caído, con reintentos.', 'Disponibilidad calculada desde el historial.', 'Página HTML de estado lista para compartir.'] },
    },
    serviciosTitulo: ['Servicios', 'Qué puedo hacer por ti', 'Trabajos pequeños y concretos, con precio cerrado y fecha de entrega.'],
    servicios: [
      ['carrito', '#22c55e', '#14b8a6', 'Sistemas para tu negocio', 'Caja, inventario, agenda de citas o registro de clientes, adaptados a cómo trabajas hoy con planillas o WhatsApp.'],
      ['grafico', '#38bdf8', '#818cf8', 'Tableros y reportes', 'Tus planillas de Excel convertidas en indicadores y gráficos claros para decidir más rápido.'],
      ['codigo', '#fbbf24', '#f97316', 'APIs y backends', 'APIs REST con Python (FastAPI), Java (Spring Boot) o Node.js: validación, base de datos, pruebas y documentación.'],
      ['rayo', '#a78bfa', '#f472b6', 'Automatización y mejoras', 'Scripts que ahorran horas, corrección de errores y pruebas automatizadas para código que ya existe.'],
    ],
    pasosTitulo: ['Cómo trabajo', 'Claro desde el primer mensaje', ''],
    pasos: [
      ['Me cuentas qué necesitas', 'Un mensaje con el problema basta. Pregunto lo necesario para entenderlo.'],
      ['Propuesta clara', 'Alcance, plazo y precio por escrito, antes de empezar.'],
      ['Avances que puedes ver', 'Te comparto una demo que puedes abrir y probar mientras avanzo.'],
      ['Entrega completa', 'Código con pruebas, instrucciones de uso y ajustes finales.'],
    ],
    sobreTitulo: ['Sobre mí', 'Trabajo bien terminado'],
    sobre: [
      'Soy egresado de Ingeniería de Sistemas de la Universidad Privada del Valle (Univalle), en La Paz. Me gusta el software que se entiende, probado y documentado, y la comunicación directa sobre plazos y avances.',
      'Trabajo con asistentes de inteligencia artificial para avanzar más rápido, y reviso y pruebo cada entrega antes de enviarla.',
    ],
    datos: [['lugar', 'La Paz, Bolivia (UTC−4)'], ['birrete', 'Ingeniería de Sistemas, Univalle'], ['mundo', 'Español nativo · Inglés C1']],
    cierre: ['¿Tienes un proyecto?', 'Cuéntame qué necesitas y te respondo en menos de 24 horas con una propuesta clara: alcance, plazo y precio.'],
    asunto: 'Proyecto',
    pie: 'Hecho a mano con HTML, CSS y JavaScript.',
    codigoDelSitio: 'Código de este sitio',
  },
  en: {
    archivo: 'en.html',
    otro: { archivo: 'index.html', codigo: 'ES', lang: 'es' },
    titulo: 'Pedro Chacolla · Software Developer',
    descripcion: 'Pedro Chacolla, software developer in La Paz, Bolivia. Business apps (point of sale, appointment booking, sales dashboards) and APIs with Python, Java and TypeScript. Live demos.',
    menu: [['#demos', 'Demos'], ['#backends', 'Backends'], ['#servicios', 'Services'], ['#contacto', 'Contact']],
    estado: 'Available for projects and hiring',
    nombre: 'Pedro Chacolla · Software Developer',
    titular: 'I build software to',
    frases: ['sell without errors', 'book without clashes', 'understand your sales', 'automate busywork'],
    resumen: 'Business apps and APIs with automated tests. You can open the demos and use them right now, nothing to install. I work from La Paz, Bolivia, in English and Spanish.',
    verDemos: 'See live demos',
    escribeme: 'Email me',
    cifras: [[7, 'published projects'], [87, 'automated tests'], [3, 'live demos'], [2, 'working languages']],
    demosTitulo: ['Live demos', 'Try them before you write', 'Three apps that run in the browser with sample data. Open them, make a sale, book an appointment or load your own sales file.'],
    enVivo: 'Live demo',
    abrirDemo: 'Open the demo',
    codigo: 'Code',
    verCodigo: 'View code',
    backendsTitulo: ['Backends and tools', 'The part you do not see, done right', 'APIs and tools with clear business rules, tests and documentation to get them running.'],
    proyectos: {
      'caja-pos': { nombre: 'Caja — point of sale', alt: 'Point-of-sale screen with catalog, cart and checkout', que: 'For small shops: take payments, track stock, print the receipt and close the day.', puntos: ['Cart with discounts and cash, QR or card payments, with change calculation.', 'Never sells more than what is in stock and flags items to reorder.', 'Daily report and sales export to Excel (CSV).'] },
      reservas: { nombre: 'Reservas — appointment booking', alt: 'Weekly agenda with the new-appointment form', que: 'For salons, clinics and workshops: it only offers the slots that are really free.', puntos: ['Two appointments can never overlap; a cancelled one frees its slot.', 'WhatsApp reminder with the message already written.', 'Daily summary: appointments, expected revenue and occupancy.'] },
      'tablero-ventas': { nombre: 'Sales dashboard', alt: 'Dashboard with KPIs, revenue line and charts', que: 'Turns a sales file into KPIs and charts you can read at a glance.', puntos: ['Revenue, sales and average versus the previous period.', 'Hand-built SVG charts, no libraries.', 'Load your own CSV: it is read in your browser and never uploaded.'] },
      'billetera-api': { nombre: 'Wallet API', alt: 'Interactive documentation of the Wallet API', que: 'A digital wallet API with transfers between accounts.', puntos: ['Money as integer cents: no rounding errors.', 'Idempotency: a retry never charges twice.', 'Daily limit and row locking in a fixed order.'] },
      'inventario-spring': { nombre: 'Inventory', alt: 'Inventory web panel', que: 'Inventory API and web panel: stock in, stock out, count adjustments and ledger.', puntos: ['Low-stock alerts and inventory valuation.', 'Optimistic locking for concurrent changes.', 'Unit and integration tests.'] },
      'mesa-de-ayuda': { nombre: 'Help desk', alt: 'Help desk panel', que: 'Support ticketing with deadlines by priority, roles and metrics.', puntos: ['Controlled status flow and change history.', 'Overdue tickets and share resolved on time.', 'Passwords hashed with scrypt and expiring sessions.'] },
      'monitor-red': { nombre: 'Service monitor', alt: 'Monitor status page', que: 'A command-line tool that tells you when a site or service stops responding.', puntos: ['Up, slow or down status, with retries.', 'Availability calculated from history.', 'HTML status page ready to share.'] },
    },
    serviciosTitulo: ['Services', 'What I can do for you', 'Small, well-defined jobs with a fixed price and a delivery date.'],
    servicios: [
      ['carrito', '#22c55e', '#14b8a6', 'Apps for your business', 'Point of sale, inventory, appointment booking or customer records, adapted to how you work today with spreadsheets or WhatsApp.'],
      ['grafico', '#38bdf8', '#818cf8', 'Dashboards and reports', 'Your Excel sheets turned into clear KPIs and charts so you can decide faster.'],
      ['codigo', '#fbbf24', '#f97316', 'APIs and backends', 'REST APIs with Python (FastAPI), Java (Spring Boot) or Node.js: validation, database, tests and documentation.'],
      ['rayo', '#a78bfa', '#f472b6', 'Automation and fixes', 'Scripts that save hours, bug fixes and automated tests for code that already exists.'],
    ],
    pasosTitulo: ['How I work', 'Clear from the first message', ''],
    pasos: [
      ['You tell me what you need', 'One message with the problem is enough. I ask what I need to understand it.'],
      ['A clear proposal', 'Scope, timeline and price in writing, before I start.'],
      ['Progress you can see', 'I share a demo you can open and try while I work.'],
      ['Complete delivery', 'Code with tests, usage instructions and final adjustments.'],
    ],
    sobreTitulo: ['About me', 'Work that is properly finished'],
    sobre: [
      'I completed the Systems Engineering coursework at Universidad Privada del Valle (Univalle) in La Paz. I like software that is easy to understand, tested and documented, and direct communication about deadlines and progress.',
      'I work with AI assistants to move faster, and I review and test every delivery before sending it.',
    ],
    datos: [['lugar', 'La Paz, Bolivia (UTC−4)'], ['birrete', 'Systems Engineering, Univalle'], ['mundo', 'Native Spanish · English C1']],
    cierre: ['Have a project?', 'Tell me what you need and I will reply within 24 hours with a clear proposal: scope, timeline and price.'],
    asunto: 'Project',
    pie: 'Hand-made with HTML, CSS and JavaScript.',
    codigoDelSitio: 'Source of this site',
  },
}

const estilo = (p) => `style="--c1:${p.c1};--c2:${p.c2}"`
const lista = (puntos) => `<ul>${puntos.map((x) => `<li>${x}</li>`).join('')}</ul>`
const etiquetas = (e) => `<div class="etiquetas">${e.map((x) => `<span>${x}</span>`).join('')}</div>`
const titulo = ([sobre, h2, p]) => `<div class="titulo ver"><small>${sobre}</small><h2>${h2}</h2>${p ? `<p>${p}</p>` : ''}</div>`

function pagina(lang) {
  const t = TEXTOS[lang]
  const correo = `mailto:${CORREO}?subject=${encodeURIComponent(t.asunto)}`

  const demos = DEMOS.map((p, i) => {
    const x = t.proyectos[p.id]
    return `
      <article class="tarjeta proyecto demo ver" ${estilo(p)}>
        <a class="marco" href="${p.demo}" target="_blank" rel="noopener" aria-label="${t.abrirDemo}: ${x.nombre}">
          <div class="barra"><i></i><i></i><i></i><span>${p.demo.replace('https://', '').replace('#demo', '')}</span></div>
          <img src="img/${p.id}.png" alt="${x.alt}" width="1280" height="${p.alto}"${i ? ' loading="lazy"' : ''}>
        </a>
        <div>
          <span class="sello"><i></i>${t.enVivo}</span>
          <h3><span class="insignia">${icono(p.icono)}</span>${x.nombre}</h3>
          <p class="que">${x.que}</p>
          ${lista(x.puntos)}
          ${etiquetas(p.etiquetas)}
          <div class="acciones">
            <a class="boton color" href="${p.demo}" target="_blank" rel="noopener">${t.abrirDemo} ${icono('externo')}</a>
            <a class="boton" href="${GH}/${p.id}" target="_blank" rel="noopener">${GITHUB} ${t.codigo}</a>
          </div>
        </div>
      </article>`
  }).join('')

  const backends = BACKENDS.map((p, i) => {
    const x = t.proyectos[p.id]
    return `
        <article class="tarjeta proyecto ver" style="--c1:${p.c1};--c2:${p.c2};--i:${i % 2}">
          <div class="imagen"><img src="img/${p.id}.png" alt="${x.alt}" width="${p.ancho}" height="${p.alto}" loading="lazy"></div>
          <div class="cuerpo">
            <h3><span class="insignia">${icono(p.icono)}</span>${x.nombre}</h3>
            <p class="que">${x.que}</p>
            ${lista(x.puntos)}
            ${etiquetas(p.etiquetas)}
            <div class="acciones"><a class="boton chico" href="${GH}/${p.id}" target="_blank" rel="noopener">${GITHUB} ${t.verCodigo}</a></div>
          </div>
        </article>`
  }).join('')

  const servicios = t.servicios.map(([ic, c1, c2, nombre, texto], i) => `
        <div class="tarjeta servicio ver" style="--c1:${c1};--c2:${c2};--i:${i}">
          <span class="insignia">${icono(ic)}</span>
          <h3>${nombre}</h3>
          <p>${texto}</p>
        </div>`).join('')

  const pasos = t.pasos.map(([nombre, texto], i) => `
        <div class="paso ver" style="--i:${i}"><h3>${nombre}</h3><p>${texto}</p></div>`).join('')

  const cinta = [...TECNOLOGIAS, ...TECNOLOGIAS].map((x) => `<span>${x}</span>`).join('')
  const vitrina = DEMOS.map((p) => `
        <a class="marco" href="${p.demo}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
          <div class="barra"><i></i><i></i><i></i><span>${t.proyectos[p.id].nombre}</span></div>
          <img src="img/${p.id}.png" alt="" width="1280" height="${p.alto}">
        </a>`).join('')

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.titulo}</title>
<meta name="description" content="${t.descripcion}">
<meta name="theme-color" content="#070b16">
<meta property="og:type" content="website">
<meta property="og:title" content="${t.titulo}">
<meta property="og:description" content="${t.descripcion}">
<meta property="og:image" content="${PAGINAS}/portafolio-web/img/tablero-ventas.png">
<link rel="alternate" hreflang="${t.otro.lang}" href="${t.otro.archivo}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%237c5cff'/%3E%3Cstop offset='1' stop-color='%2322d3ee'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='9' fill='url(%23g)'/%3E%3Ctext x='16' y='21.5' text-anchor='middle' font-family='Arial' font-weight='700' font-size='14' fill='white'%3EPC%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="estilos.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<div class="fondo" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="progreso" aria-hidden="true"></div>

<header class="nav">
  <div class="contenedor">
    <a class="marca" href="#"><b>PC</b>Pedro Chacolla</a>
    <nav>${t.menu.map(([h, x]) => `<a href="${h}">${x}</a>`).join('')}</nav>
    <div class="idioma"><b>${lang.toUpperCase()}</b><a href="${t.otro.archivo}" lang="${t.otro.lang}">${t.otro.codigo}</a></div>
  </div>
</header>

<main>
  <section class="portada">
    <div class="contenedor dupla">
      <div>
        <span class="estado ver"><i></i>${t.estado}</span>
        <p class="nombre ver" style="--i:1">${t.nombre}</p>
        <h1 class="ver" style="--i:2">${t.titular} <span class="rota" data-frases='${JSON.stringify(t.frases)}'><span>${t.frases[0]}</span></span></h1>
        <p class="resumen ver" style="--i:3">${t.resumen}</p>
        <div class="botones ver" style="--i:4">
          <a class="boton principal" href="#demos">${t.verDemos} ${icono('flecha', 'mueve')}</a>
          <a class="boton" href="${correo}">${icono('correo')} ${t.escribeme}</a>
        </div>
        <div class="redes ver" style="--i:5">
          <a href="${GH}" target="_blank" rel="noopener" aria-label="GitHub">${GITHUB}</a>
          <a href="${LINKEDIN}" target="_blank" rel="noopener" aria-label="LinkedIn">${icono('linkedin')}</a>
          <a href="${correo}" aria-label="${t.escribeme}">${icono('correo')}</a>
        </div>
      </div>
      <div class="vitrina ver" style="--i:3">${vitrina}
      </div>
    </div>
    <div class="contenedor">
      <div class="cifras">${t.cifras.map(([n, x], i) => `
        <div class="cifra ver" style="--i:${i}"><b data-contar="${n}">${n}</b><span>${x}</span></div>`).join('')}
      </div>
    </div>
    <div class="cinta" aria-hidden="true"><div>${cinta}</div></div>
  </section>

  <section id="demos">
    <div class="contenedor">
      ${titulo(t.demosTitulo)}${demos}
    </div>
  </section>

  <section id="backends">
    <div class="contenedor">
      ${titulo(t.backendsTitulo)}
      <div class="rejilla">${backends}
      </div>
    </div>
  </section>

  <section id="servicios">
    <div class="contenedor">
      ${titulo(t.serviciosTitulo)}
      <div class="servicios">${servicios}
      </div>
    </div>
  </section>

  <section>
    <div class="contenedor">
      ${titulo(t.pasosTitulo)}
      <div class="pasos">${pasos}
      </div>
    </div>
  </section>

  <section>
    <div class="contenedor">
      ${titulo(t.sobreTitulo)}
      <div class="sobre">
        <div class="texto ver">${t.sobre.map((p) => `<p>${p}</p>`).join('')}</div>
        <div class="tarjeta datos ver" style="--i:1">${t.datos.map(([ic, x]) => `
          <p>${icono(ic)} ${x}</p>`).join('')}
          <p>${icono('correo')} <a href="${correo}">${CORREO}</a></p>
        </div>
      </div>
    </div>
  </section>

  <div class="contenedor" id="contacto">
    <div class="cierre ver">
      <h2>${t.cierre[0]}</h2>
      <p>${t.cierre[1]}</p>
      <div class="botones">
        <a class="boton principal" href="${correo}">${icono('correo')} ${CORREO}</a>
        <a class="boton" href="${LINKEDIN}" target="_blank" rel="noopener">${icono('linkedin')} LinkedIn</a>
      </div>
    </div>
  </div>
</main>

<footer>
  <div class="contenedor">
    <span>© 2026 Pedro Abad Chacolla Espinoza · ${t.pie}</span>
    <a href="${GH}/portafolio-web" target="_blank" rel="noopener">${t.codigoDelSitio}</a>
  </div>
</footer>
<script type="module" src="app.js"></script>
</body>
</html>
`
}

for (const lang of Object.keys(TEXTOS)) {
  writeFileSync(new URL(TEXTOS[lang].archivo, import.meta.url), pagina(lang))
  console.log('Generado', TEXTOS[lang].archivo)
}
