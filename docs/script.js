/* Telegram Media Downloader — Landing Page Script (bilingual) */
(function() {
  'use strict';

  /* ===== Translations ===== */
  var translations = {
    en: {
      "brand": "TG Downloader",
      "nav.features": "Features",
      "nav.demo": "Demo",
      "nav.how": "How it works",
      "nav.install": "Install",
      "nav.download": "Download",
      "nav.source": "Source",
      "nav.releases": "Releases",
      "nav.testing": "Testing",
      "nav.changelog": "Changelog",
      "nav.license": "License",
      "hero.title": "Telegram Media Downloader",
      "hero.subtitle": "Unhide the native download button in Telegram Web's media viewer and Stories. Download videos, photos, audio and documents directly — no media capture, no local storage.",
      "hero.cta": "Download v1.0.2",
      "hero.github": "GitHub",
      "features.title": "Features",
      "features.subtitle": "Simple in concept, solid in practice.",
      "features.1.title": "Unhide Native Download",
      "features.1.desc": "Telegram Web already has a download button — it just hides it. This extension removes the CSS <code>hide</code> class so the real button reappears.",
      "features.2.title": "All Media Types",
      "features.2.desc": "Works with videos, photos, audio files and documents — any media you can open in the Telegram Web viewer.",
      "features.3.title": "Stories Support",
      "features.3.desc": "The download button is also unhidden inside the Stories viewer, so you can save story media too.",
      "features.4.title": "Privacy First",
      "features.4.desc": "No media is intercepted, captured or stored locally. You download directly from Telegram's own CDN via their native button.",
      "features.5.title": "Lightweight",
      "features.5.desc": "A minimal content script runs every 500 ms. No heavy frameworks, no background noise.",
      "features.6.title": "Zero Setup",
      "features.6.desc": "Install and it just works. No options, no configuration, no permissions beyond web.telegram.org.",
      "demo.title": "See it in action",
      "demo.subtitle": "Three screenshots, three steps — the entire flow from opening a file to downloading it.",
      "demo.1.caption": "Open any media to launch the Telegram Web viewer.",
      "demo.2.caption": "The native download button is now visible.",
      "demo.3.caption": "Click to download — Telegram handles the rest.",
      "how.title": "How it works",
      "how.subtitle": "Three simple steps — that's all it takes.",
      "how.1.title": "Install",
      "how.1.desc": "Load the extension in Chrome via <code>chrome://extensions/</code> as an unpacked extension.",
      "how.2.title": "Open Telegram",
      "how.2.desc": "Navigate to <a href=\"https://web.telegram.org\" target=\"_blank\" rel=\"noopener\">web.telegram.org</a> and open any media in the viewer.",
      "how.3.title": "Download",
      "how.3.desc": "Click the now-visible native download button. Telegram handles the download via its CDN.",
      "install.title": "Installation",
      "install.1": "Download the latest release. Grab the ZIP from the <a href=\"#download\">Download</a> section or the <a href=\"https://github.com/VaCris/telegram-web-capture/releases\">GitHub releases</a> page.",
      "install.2": "Extract the ZIP to a folder on your computer.",
      "install.3": "Open Chrome, go to <code>chrome://extensions/</code>, enable <em>Developer mode</em>, click <em>Load unpacked</em> and select the extracted folder.",
      "install.4": "Open <a href=\"https://web.telegram.org\" target=\"_blank\" rel=\"noopener\">web.telegram.org</a>, open any media and the download button will appear.",
      "download.title": "v1.0.2 Release",
      "download.subtitle": "Download the ready-to-load Chrome extension package (ZIP). Compatible with Chrome, Edge, Brave and Opera.",
      "download.btn": "Download extension ZIP",
      "float.cta": "Download now",
      "footer.attribution": "Licensed under the <a href=\"https://github.com/VaCris/telegram-web-capture/blob/main/LICENSE\">Apache License 2.0</a>, which requires prominent attribution to the original author.",
      "footer.credit": "Original work by <a href=\"https://github.com/VaCris\">Bryan Alexander Vidal Crispin</a> · <a href=\"https://github.com/VaCris/telegram-web-capture\">github.com/VaCris/telegram-web-capture</a>"
    },
    es: {
      "brand": "TG Downloader",
      "nav.features": "Características",
      "nav.demo": "Demo",
      "nav.how": "Cómo funciona",
      "nav.install": "Instalación",
      "nav.download": "Descargar",
      "nav.source": "Código fuente",
      "nav.releases": "Releases",
      "nav.testing": "Pruebas",
      "nav.changelog": "Changelog",
      "nav.license": "Licencia",
      "hero.title": "Telegram Media Downloader",
      "hero.subtitle": "Muestra el botón de descarga nativo de Telegram en el visor multimedia y en las Stories. Descarga videos, fotos, audios y documentos directamente — sin capturar ni almacenar medios localmente.",
      "hero.cta": "Descargar v1.0.2",
      "hero.github": "GitHub",
      "features.title": "Características",
      "features.subtitle": "Simple en concepto, sólido en practica.",
      "features.1.title": "Mostrar descarga nativa",
      "features.1.desc": "Telegram Web ya tiene un botón de descarga — simplemente lo oculta. Esta extensión elimina la clase CSS <code>hide</code> para que el botón real reaparezca.",
      "features.2.title": "Todos los tipos de medio",
      "features.2.desc": "Funciona con videos, fotos, audios y documentos — cualquier medio que puedas abrir en el visor de Telegram Web.",
      "features.3.title": "Soporte de Stories",
      "features.3.desc": "El botón de descarga también se muestra dentro del visor de Stories, para que puedas guardar esas publicaciones también.",
      "features.4.title": "Privacidad primero",
      "features.4.desc": "Ningún medio es interceptado, capturado o almacenado localmente. Descargas directamente del CDN de Telegram usando su propio botón.",
      "features.5.title": "Ligero",
      "features.5.desc": "Un content script minimal corre cada 500 ms. Sin frameworks pesados, sin ruido de fondo.",
      "features.6.title": "Sin configuración",
      "features.6.desc": "Instálala y funciona. Sin opciones, sin configuración, sin permisos más allá de web.telegram.org.",
      "demo.title": "Ver en acción",
      "demo.subtitle": "Tres capturas, tres pasos — el flujo completo desde abrir un archivo hasta descargarlo.",
      "demo.1.caption": "Abre cualquier medio para lanzar el visor de Telegram Web.",
      "demo.2.caption": "El botón de descarga nativo ahora es visible.",
      "demo.3.caption": "Haz clic para descargar — Telegram maneja el resto.",
      "how.title": "Cómo funciona",
      "how.subtitle": "Tres pasos sencillos — eso es todo.",
      "how.1.title": "Instalar",
      "how.1.desc": "Carga la extensión en Chrome mediante <code>chrome://extensions/</code> como extensión sin empaquetar.",
      "how.2.title": "Abrir Telegram",
      "how.2.desc": "Navega a <a href=\"https://web.telegram.org\" target=\"_blank\" rel=\"noopener\">web.telegram.org</a> y abre cualquier medio en el visor.",
      "how.3.title": "Descargar",
      "how.3.desc": "Haz clic en el botón de descarga nativo ahora visible. Telegram maneja la descarga vía su CDN.",
      "install.title": "Instalación",
      "install.1": "Descarga el último release. Consigue el ZIP desde la sección <a href=\"#download\">Descargar</a> o en la página de <a href=\"https://github.com/VaCris/telegram-web-capture/releases\">releases de GitHub</a>.",
      "install.2": "Extrae el ZIP a una carpeta en tu computadora.",
      "install.3": "Abre Chrome, ve a <code>chrome://extensions/</code>, activa el <em>Modo desarrollador</em>, haz clic en <em>Cargar extensión sin empaquetar</em> y selecciona la carpeta extraída.",
      "install.4": "Abre <a href=\"https://web.telegram.org\" target=\"_blank\" rel=\"noopener\">web.telegram.org</a>, abre cualquier medio y el botón de descarga aparecerá.",
      "download.title": "Release v1.0.2",
      "download.subtitle": "Descarga el paquete de extensión para Chrome (ZIP), listo para cargar. Compatible con Chrome, Edge, Brave y Opera.",
      "download.btn": "Descargar extensión ZIP",
      "float.cta": "Descargar ahora",
      "footer.attribution": "Licenciado bajo la <a href=\"https://github.com/VaCris/telegram-web-capture/blob/main/LICENSE\">Apache License 2.0</a>, que requiere atribución destacada al autor original.",
      "footer.credit": "Trabajo original de <a href=\"https://github.com/VaCris\">Bryan Alexander Vidal Crispin</a> · <a href=\"https://github.com/VaCris/telegram-web-capture\">github.com/VaCris/telegram-web-capture</a>"
    }
  };

  var currentLang = localStorage.getItem('tgLang') || 'en';
  var translatable = document.querySelectorAll('[data-key]');

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tgLang', lang);
    document.documentElement.lang = lang;

    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Translate all elements
    translatable.forEach(function(el) {
      var key = el.getAttribute('data-key');
      var text = translations[lang][key];
      if (text) {
        el.innerHTML = text;
      }
    });
  }

  // Language button events
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setLanguage(btn.dataset.lang);
    });
  });

  /* ===== Mobile menu ===== */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
      });
    });
  }

  /* ===== Active nav on scroll ===== */
  var sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        var id = entry.target.getAttribute('id');
        var navLink = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (navLink) {
          navLink.classList.toggle('active', entry.isIntersecting);
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(function(section) { observer.observe(section); });
  }

  /* ===== Scroll reveal ===== */
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  /* ===== Floating CTA ===== */
  var floatCta = document.getElementById('floatCta');
  if (floatCta && 'IntersectionObserver' in window) {
    // Show the floating CTA when the user scrolls past the hero
    var downloadSection = document.getElementById('download');
    if (downloadSection) {
      var floatObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          floatCta.classList.toggle('show', !entry.isIntersecting);
        });
      }, { threshold: 0 });
      floatObserver.observe(downloadSection);
    }

    // Smooth scroll to the download section
    floatCta.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById('download');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ===== Parallax background ===== */
  var parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    var onScroll = function() {
      var scrollY = window.scrollY;
      parallaxBg.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ===== Nav scroll state ===== */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onNavScroll = function() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  // Initialize
  setLanguage(currentLang);
})();
