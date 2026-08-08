# Telegram Media Downloader

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Manifest](https://img.shields.io/badge/Manifest%20V3-Chrome%20Extension-orange)](manifest.json)
[![Version](https://img.shields.io/badge/version-1.0.2-blue)](https://github.com/VaCris/telegram-web-capture/releases)
[![GitHub Stars](https://img.shields.io/github/stars/VaCris/telegram-web-capture?style=social)](https://github.com/VaCris/telegram-web-capture/stargazers)
[![GitHub Release](https://img.shields.io/github/v/release/VaCris/telegram-web-capture)](https://github.com/VaCris/telegram-web-capture/releases)

Una extensión de Chrome que **muestra el botón de descarga nativo de Telegram** cuando abres el visor multimedia y las Stories en Telegram Web. Sin capturar ni almacenar medios: simplemente hace visible el botón que Telegram ya oculta, para que descargues **directamente** con el propio sistema de Telegram.

---

## Tabla de contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Cómo funciona](#cómo-funciona)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo](#desarrollo)
- [Compatibilidad](#compatibilidad)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Características

- **Muestra el botón de descarga nativo** en el visor multimedia de Telegram Web.
- **Funciona en Stories** — también muestra el botón dentro del visor de Stories.
- **Todos los tipos de medio** — videos, audios, imágenes y documentos.
- **Sin captura ni almacenamiento** — no intercepta ni guarda los medios; descargas directamente del CDN de Telegram.
- **Sin configuración** — instala y funciona.
- **Manifest V3** — construido sobre la plataforma moderna de extensiones de Chrome.
- **Ligero** — un content script mínimo que revisa el DOM cada 500 ms.

Las capturas de pantalla paso a paso se muestran en la sección de [Uso](#uso).

---

## Instalación

### Opción A — Desde el release (recomendado)

1. Descarga el [último release](https://github.com/VaCris/telegram-web-capture/releases) en la sección de **Assets**.
2. Descarga el archivo `telegram-web-capture-1.0.2.zip`.
3. Extrae el ZIP a una carpeta en tu computadora.
4. Abre Chrome y navega a `chrome://extensions/`.
5. Activa **"Modo desarrollador"** (esquina superior derecha).
6. Haz clic en **"Cargar extensión sin empaquetar"**.
7. Selecciona la carpeta que extraíste en el paso 3.
8. La extensión aparecerá en tu barra de herramientas.

### Opción B — Desde el código fuente (desarrollo)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/VaCris/telegram-web-capture.git
   ```
2. Abre Chrome en `chrome://extensions/`.
3. Activa **Modo desarrollador**.
4. Haz clic en **Cargar extensión sin empaquetar** y selecciona la carpeta `telegram-web-capture`.

> **Edge / Brave / Opera** — estos navegadores también soportan extensiones de Chrome. Activa la opción de extensiones desbloqueadas y sigue los mismos pasos.

---

## Uso

1. Abre [Telegram Web](https://web.telegram.org) e inicia sesión.
2. Navega a un chat, canal o grupo.
3. **Visualizar el video** — abre o reproduce un video, imagen, audio o documento para que aparezca el visor multimedia.
4. **Saldrán los botones** — la extensión hará visible el botón de descarga nativo de Telegram (icono de 💾) en la barra del visor.
5. **Comienza a descargar** — haz clic en el botón de descarga y el archivo se descargará directamente a tu carpeta de descargas.

### En las Stories

1. Abre una Story haciendo clic en su miniatura.
2. **Saldrán los botones** — el botón de descarga también será visible en el visor de Stories.
3. **Comienza a descargar** — haz clic para guardar el contenido de la Story.

---

## Cómo funciona

Telegram Web ya incluye un botón de descarga nativo en su visor multimedia y en el visor de Stories, pero lo oculta mediante la clase CSS `hide` (es decir, `display: none`).

Esta extensión inyecta un **content script** (`content/content.js`) que revisa periódicamente el DOM en busca de:

- El contenedor `.media-viewer-whole` y dentro de él los botones en `.media-viewer-buttons`
- El visor de Stories (`#stories-viewer`)

Cuando encuentra botones con la clase `hide`, **la elimina**, haciendo visible el botón de descarga real de Telegram.

Como reutiliza el mecanismo de descarga nativo de Telegram:

- ❌ No se hace ingeniería inversa de APIs privadas.
- ❌ No se interceptan peticiones para capturar medios.
- ❌ No se almacenan los archivos localmente.
- ✅ Es una solución de código abierto y respetuosa con la privacidad.

---

## Estructura del proyecto

```
telegram-web-capture/
├── manifest.json              # Configuración de la extensión (MV3)
├── background/
│   └── background.js          # Service worker para resolver URLs de CDN
├── content/
│   ├── content.js             # Content script: muestra el botón de descarga
│   └── content.css            # Estilos para elementos inyectados
├── popup/
│   ├── popup.html             # Interfaz de la extensión
│   ├── popup.css              # Estilos de la interfaz
│   └── popup.js               # Lógica de la interfaz
├── icons/
│   ├── icon.svg               # Icono fuente (vector)
│   ├── icon16.png             # 16×16  (barra de herramientas)
│   ├── icon48.png             # 48×48  (gestor de extensiones)
│   └── icon128.png            # 128×128 (Chrome Web Store)
├── docs/
│   ├── index.html             # Landing page
│   ├── style.css              # Estilos de la landing page
│   ├── script.js              # Lógica de la landing page
│   ├── assets/                # Iconos para la landing page
│   └── screenshots/           # Carpeta para capturas de pantalla
├── README.md                  # Este archivo
├── TESTING.md                 # Guía de pruebas manuales
├── CHANGELOG.md               # Historial de cambios
├── .gitignore                 # Archivos ignorados por git
└── LICENSE                    # Licencia Apache 2.0
```

---

## Desarrollo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/VaCris/telegram-web-capture.git
   cd telegram-web-capture
   ```
2. Carga la extensión sin empaquetar en `chrome://extensions/` (ver [Instalación](#instalación)).
3. Haz cambios en los archivos de `content/`, `background/` o `popup/`.
4. Recarga la extensión desde `chrome://extensions/` pulsando el botón de recargar.

### Generar el ZIP de release

Para crear el paquete ZIP listo para cargar como extensión sin empaquetar:

```bash
zip -r telegram-web-capture-1.0.2.zip \
    manifest.json \
    background/ \
    content/ \
    popup/ \
    icons/ \
    README.md \
    LICENSE
```

---

## Compatibilidad

| Navegador | Estado |
|-----------|--------|
| Google Chrome (desktop) | ✅ Compatible |
| Microsoft Edge (Chromium) | ✅ Compatible |
| Brave (desktop) | ✅ Compatible |
| Opera (desktop) | ✅ Compatible* |
| Firefox | ❌ No compatible (MV3 / diferencias WebExtensions) |

\* Opera requiere [la extensión "Install Chrome Extensions"](https://addons.opera.com/en/extensions/details/install-chrome-extensions/).

---

## Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Abre un *issue* describiendo el problema o la mejora.
2. Haz *fork* del repositorio y crea una rama con tu cambio.
3. Abre un *pull request* describiendo los cambios.

### Notas para contribuidores

- Telegram Web cambia su estructura DOM regularmente. Si la extensión deja de funcionar, revisa y actualiza los selectores en `content/content.js` (`scanMediaViewer` y `scanStories`).
- Mantén el manifest en `manifest_version: 3`.
- Sigue el estilo de código existente (sin transpilador, ES6+).

---

## Licencia

Esta obra está licenciada bajo la **Apache License 2.0** — consulta [LICENSE](LICENSE) para más detalles.

### Requisito de atribución

Como se especifica en la licencia, **cualquier fork, obra derivada o redistribución de este software debe incluir una atribución destacada** al autor original:

> Original work by Bryan Alexander Vidal Crispin
> https://github.com/VaCris/telegram-web-capture

Esta atribución debe ser visible en:
- El README.md o documentación similar del proyecto.
- Cualquier distribución publicada (GitHub releases, npm, etc.).
- Las cabeceras de los archivos fuente modificados.

---

*Desarrollado y mantenido por [Bryan Alexander Vidal Crispin](https://github.com/VaCris).*

**Landing page:** https://vacris.github.io/telegram-web-capture/
