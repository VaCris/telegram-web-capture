# Historial de cambios

<div align="center">

🇺🇸 [English](CHANGELOG.md) · 🇪🇸 **Español**

</div>

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) y el proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-10-08

### Añadido
- Popup en la barra de herramientas: estado de la pestaña activa, interruptor on/off persistido en `chrome.storage` y acceso directo a Abrir Telegram (localizado EN/ES).
- Localización del manifest mediante el sistema `_locales` de Chrome (inglés por defecto, español incluido).
- Banderas SVG en el selector de idioma de la landing page, generadas con la biblioteca [flag-icons](https://github.com/lipis/flag-icons).
- Suite de tests con jsdom para el content script (`npm test`) que cubre el visor multimedia, el visor de Stories y el comportamiento del observer.
- Script de empaquetado (`npm run package`) que genera un zip de release limpio con solo los archivos de la extensión (16 KB en lugar del peso completo del repositorio).

### Cambiado
- La landing page detecta automáticamente el idioma del navegador en la primera visita: navegadores en español obtienen español sin hacer clic, el resto obtiene inglés; una elección manual guardada en `localStorage` siempre tiene prioridad.
- El intervalo de sondeo de 500 ms se sustituyó por un `MutationObserver` con debounce: las descargas aparecen al instante y el script no tiene coste en reposo.
- Se vuelve a hacer visible todo botón oculto del visor: la comprobación anterior del icono de descarga (`\uE95E`) ya no coincide con los iconos que Telegram Web envía actualmente, por lo que una comprobación más estrecha dejaba el botón oculto.
- La landing page realiza preconnect al CDN jsDelivr que sirve flag-icons.
- Eliminados el service worker muerto `background/` y el `content.css` sin uso; el popup sin uso anterior se reconvirtió en el popup funcional de la barra de herramientas descrito arriba.
- Permisos reducidos a `activeTab` (estado de la pestaña en el popup) y `storage` (interruptor on/off) — sin `host_permissions`.
- Eliminado el listener huérfano de mensajes del popup en el content script.

## [1.0.2] - 2026-08-08

### Añadido
- README completo en español e inglés con instalación, uso y estructura del proyecto.
- Guía de pruebas (`TESTING.md`) para verificar manualmente el comportamiento de la extensión.
- Licencia Apache 2.0 con requisito explícito de atribución.
- Topics del repositorio para mejorar su descubrimiento en GitHub.
- Capturas promocionales para la documentación y la landing page.
- Landing page con características principales e instrucciones de instalación.

### Cambiado
- Regeneración de los iconos PNG desde el SVG fuente en resoluciones correctas (16×16, 48×48 y 128×128) con RGBA completo.
- Limpieza del SVG del icono para que la flecha de descarga sea completamente visible sobre el fondo azul.
- El content script ahora apunta explícitamente tanto al visor multimedia como al visor de Stories.

### Corregido
- Inconsistencias entre las etiquetas de la interfaz del popup y el comportamiento real de la extensión.

## [1.0.1] - 2026-08-07

### Cambiado
- Se añadió la cláusula de atribución a la licencia Apache 2.0.
- Se actualizó el README para aclarar el uso y las funciones disponibles.

## [1.0.0] - 2026-08-06

### Añadido
- Commit inicial de la extensión Telegram Media Downloader para Chrome.
- Extensión Manifest V3 que hace visible el botón nativo de descarga en el visor multimedia y en el visor de Stories de Telegram Web.
