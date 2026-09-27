# Historial de cambios

<div align="center">

🇺🇸 [English](CHANGELOG.md) · 🇪🇸 **Español**

</div>

Todos los cambios relevantes de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) y el proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
