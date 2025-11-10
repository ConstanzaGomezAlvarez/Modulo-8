<template>
  <div>
    <a class="skip-link" href="#main">Saltar al contenido</a>
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <img :src="avatarUrl" alt="Avatar de Constanza Gómez" class="avatar"/>
          <div>
            <h1>Constanza Gómez Álvarez</h1>
            <p class="subtitle">Desarrolladora Front-End | Experiencia en UX y gestión interdisciplinaria</p>
          </div>
        </div>
        <button class="nav-toggle" :aria-expanded="navOpen.toString()" aria-controls="primary-navigation" @click="toggleNav" :aria-label="navOpen ? 'Cerrar menú' : 'Abrir menú'">
          <span class="hamburger" aria-hidden="true"></span>
        </button>
        <nav id="primary-navigation" class="main-nav" :data-visible="navOpen.toString()" aria-label="Menú principal">
          <a href="#proyectos" @click="onNavLink">Proyectos</a>
          <a href="#sobre-mi" @click="onNavLink">Sobre mí</a>
          <a href="#contacto" @click="onNavLink">Contacto</a>
        </nav>
      </div>
    </header>

    <main id="main">
      <section class="hero">
        <div class="container">
          <div class="hero-inner">
            <div class="hero-copy">
              <h2>Interfaces limpias, intuitivas y profesionales</h2>
              <p>Desarrollo soluciones digitales con foco en la experiencia del usuario, la accesibilidad y la estética minimalista.</p>
              <a class="cta" href="#proyectos" @click.prevent="scrollTo('#proyectos')">Ver proyectos</a>
            </div>
            <div class="hero-illustration" aria-hidden="true">
              <picture>
                <source type="image/avif" :srcset="`${heroAvif1600} 1600w, ${heroAvif1200} 1200w, ${heroAvif800} 800w, ${heroAvif480} 480w`" sizes="(min-width:1100px) 420px, 100vw">
                <source type="image/webp" :srcset="`${heroWebp1600} 1600w, ${heroWebp1200} 1200w, ${heroWebp800} 800w, ${heroWebp480} 480w`" sizes="(min-width:1100px) 420px, 100vw">
                <img class="hero-fallback" :src="heroJpg800" :srcset="`${heroJpg1600} 1600w, ${heroJpg1200} 1200w, ${heroJpg800} 800w, ${heroJpg480} 480w`" sizes="(min-width:1100px) 420px, 100vw" loading="lazy" decoding="async" alt="Ilustración de desarrollo web" />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section id="proyectos" class="container proyectos">
        <h3>Proyectos destacados</h3>
        <div class="grid">
          <article class="card">
            <img :src="project1Url" alt="Proyecto VerdeModa" />
            <h4>Tienda VerdeModa</h4>
            <p>Diseño web responsivo para una tienda de productos naturales, con carrito de compras y validaciones en JavaScript.</p>
            <div class="tags">HTML • CSS • JavaScript</div>
            <a href="proyecto-1.html" class="btn">Ver detalles</a>
          </article>
        </div>
      </section>

      <section id="sobre-mi" class="container sobre-mi">
        <h3>Sobre mí</h3>
        <p>Desarrolladora Front-End con estudios en diseño y desarrollo de interfaces web funcionales, accesibles y centradas en el usuario. Profesional con más de cinco años de trayectoria en áreas de alta exigencia clínica, docencia y atención al cliente, con una sólida capacidad analítica, trabajo colaborativo y orientación a la mejora continua.</p>
        <ul class="skills">
          <li>HTML semántico &amp; ARIA</li>
          <li>CSS moderno (Flexbox, Grid, SASS)</li>
          <li>JavaScript (ES6+, Fetch)</li>
          <li>Frameworks: Vue.js / React (básico)</li>
          <li>Git / GitHub</li>
          <li>Accesibilidad &amp; performance (WCAG)</li>
        </ul>
      </section>

      <section id="contacto" class="container contacto">
        <h3>Contacto</h3>
        <form id="contactForm" aria-labelledby="contactFormTitle" novalidate @submit.prevent="handleSubmit">
          <h4 id="contactFormTitle" class="form-title">Envíame un mensaje</h4>

          <div class="field">
            <label for="name">Nombre</label>
            <input id="name" name="name" v-model="form.name" required minlength="2" :class="{'invalid': errors.name}" aria-describedby="nameError" />
            <div id="nameError" class="error-message" aria-live="polite">{{ errors.name || '' }}</div>
          </div>

          <div class="field">
            <label for="email">Correo</label>
            <input id="email" name="email" type="email" v-model="form.email" required :class="{'invalid': errors.email}" aria-describedby="emailError" />
            <div id="emailError" class="error-message" aria-live="polite">{{ errors.email || '' }}</div>
          </div>

          <div class="field">
            <label for="message">Mensaje</label>
            <textarea id="message" name="message" rows="4" v-model="form.message" :class="{'invalid': errors.message}" aria-describedby="messageError"></textarea>
            <div id="messageError" class="error-message" aria-live="polite">{{ errors.message || '' }}</div>
          </div>

          <button type="submit" class="btn">Enviar mensaje</button>
        </form>
        <div class="info-contacto">
          <p>📍 Santiago, Chile</p>
          <p>✉️ <a href="mailto:constanza.gomez@usach.cl">constanza.gomez@usach.cl</a></p>
          <p>📞 +56 9 4924 9095</p>
          <p>🔗 LinkedIn: <a class="link-with-icon" href="https://www.linkedin.com/in/constanza-gómez-álvarez-11109a224" target="_blank" rel="noopener noreferrer">
              <svg class="icon icon-linkedin" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><title>LinkedIn</title><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.072-.021-2.451-1.495-2.451-1.496 0-1.724 1.168-1.724 2.379v4.572h-3v-9h2.881v1.233h.041c.401-.76 1.379-1.56 2.84-1.56 3.039 0 3.602 2.001 3.602 4.6v5.727z"/></svg>
              Constanza Gómez Álvarez
            </a></p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container">
        <small>© {{ year }} Constanza Gómez Álvarez — Portafolio profesional — <a href="https://www.linkedin.com/in/constanza-gómez-álvarez-11109a224" target="_blank" rel="noopener noreferrer">LinkedIn</a></small>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import avatarUrl from './assets/images/avatar.svg'
import project1Url from './assets/projects/project1-screenshot.svg'
import heroWebp1600 from './assets/images/optimized/hero-1600.webp'
import heroWebp1200 from './assets/images/optimized/hero-1200.webp'
import heroWebp800 from './assets/images/optimized/hero-800.webp'
import heroWebp480 from './assets/images/optimized/hero-480.webp'
import heroAvif1600 from './assets/images/optimized/hero-1600.avif'
import heroAvif1200 from './assets/images/optimized/hero-1200.avif'
import heroAvif800 from './assets/images/optimized/hero-800.avif'
import heroAvif480 from './assets/images/optimized/hero-480.avif'
import heroJpg1600 from './assets/images/optimized/hero-1600.jpg'
import heroJpg1200 from './assets/images/optimized/hero-1200.jpg'
import heroJpg800 from './assets/images/optimized/hero-800.jpg'
import heroJpg480 from './assets/images/optimized/hero-480.jpg'

export default {
  name: 'App',
  setup() {
    const navOpen = ref(false)
    const year = ref(new Date().getFullYear())
  // heroSrc removed (we use optimized variants via <picture>)

    const form = reactive({ name: '', email: '', message: '' })
    const errors = reactive({ name: '', email: '', message: '' })

    function toggleNav() {
      navOpen.value = !navOpen.value
    }
    function onNavLink() {
      navOpen.value = false
    }
    function scrollTo(sel) {
      const el = document.querySelector(sel)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    function validate() {
      let ok = true
      errors.name = ''
      errors.email = ''
      errors.message = ''
      if (!form.name || form.name.trim().length < 2) { errors.name = 'Por favor ingresa tu nombre (2+ caracteres)'; ok = false }
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Correo inválido'; ok = false }
      if (!form.message || form.message.trim().length < 6) { errors.message = 'Escribe un mensaje (6+ caracteres)'; ok = false }
      return ok
    }

    function handleSubmit() {
      if (!validate()) return
      // Aquí podrías enviar a una API o servicio. Por ahora solo limpiamos y mostramos alerta simple.
      alert('Mensaje enviado — (simulado)')
      form.name = ''
      form.email = ''
      form.message = ''
    }

    onMounted(() => {
      // hero animation: play once per visitor
      const key = 'heroAnimationShown_v1'
      const shown = localStorage.getItem(key)
      if (!shown) {
        setTimeout(() => document.body.classList.add('is-loaded'), 80)
        localStorage.setItem(key, '1')
      } else {
        document.body.classList.add('no-anim')
      }
    })

    return { navOpen, toggleNav, onNavLink, scrollTo, year, form, errors, handleSubmit, avatarUrl, project1Url,
      heroWebp1600, heroWebp1200, heroWebp800, heroWebp480,
      heroAvif1600, heroAvif1200, heroAvif800, heroAvif480,
      heroJpg1600, heroJpg1200, heroJpg800, heroJpg480 }
  }
}
</script>
