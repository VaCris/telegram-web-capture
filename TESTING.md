# Guía de Pruebas — Telegram Media Downloader

Esta guía describe cómo verificar manualmente que la extensión funciona correctamente.

## Prueba rápida

1. **Cargar la extensión:**
   - Abre Chrome y navega a `chrome://extensions/`.
   - Activa **"Modo desarrollador"** (esquina superior derecha).
   - Haz clic en **"Cargar extensión sin empaquetar"**.
   - Selecciona la carpeta `telegram-web-capture`.
2. **Confirmar instalación:**
   - La extensión "Telegram Media Downloader" debe aparecer en la cuadrícula de extensiones.
   - Opcionalmente, fíjala a la barra de herramientas haciendo clic en el icono de la pastilla.
3. **Navegar a Telegram Web:**
   - Abre [web.telegram.org](https://web.telegram.org) e inicia sesión.
4. **Abrir el visor multimedia:**
   - Haz clic en cualquier **video**, **imagen**, **audio** o **documento** en un chat, canal o grupo.
   - Debe abrirse el visor multimedia de Telegram (overlay oscuro con el medio centrado).
5. **Verificar el botón de descarga:**
   - En la esquina inferior derecha del visor (o en la barra de herramientas del visor) deberías ver el **botón de descarga nativo de Telegram** (un icono de flecha ↓ / disco).
   - El botón **debe estar visible** y **no oculto**.
6. **Probar la descarga:**
   - Haz clic en el botón de descarga.
   - El archivo debe comenzar a descargarse automáticamente a tu carpeta de descargas predeterminada.

## Prueba en Stories

1. Abre una **Story** (haz clic en una miniatura de story en la parte superior).
2. El visor de Stories se abre.
3. El **botón de descarga nativo también debe estar visible** en el visor de Stories.

## Qué está probando

| Comportamiento | Resultado esperado |
|---|---|
| Visor multimedia se abre | El medio se muestra en un overlay |
| Botón de descarga visible | El botón nativo de Telegram aparece (no está oculto por `hide`) |
| Click en descargar | El archivo se descarga vía el CDN de Telegram |
| Stories viewer | El botón de descarga también es visible |

## Solución de problemas

### El botón de descarga no aparece

- ✅ Verifica que estés en **web.telegram.org**, **webk.telegram.org** o **webz.telegram.org** (no en la app de escritorio).
- ✅ Abre el **visor multimedia** haciendo clic en un medio — el botón solo existe dentro del visor.
- ✅ **Recarga la página** de Telegram Web (F5) y vuelve a abrir el visor.
- ✅ Asegúrate de que la extensión esté **activada** en `chrome://extensions/`.
- ✅ Telegram Web puede actualizar su estructura DOM. Si el botón deja de aparecer, revisa la consola (ver abajo) y verifica los selectores en `content/content.js`.

### Las descargas no funcionan

- ✅ Telegram maneja la descarga nativamente — la extensión no interfiere con el proceso de descarga.
- ✅ Si el navegador bloquea la descarga, verifica que estés en una pestaña **activa** de Telegram Web.

## Debugging

1. **Abrir la consola de la extensión:**
   - Ve a `chrome://extensions/`.
   - Haz clic en **"Detalles"** de la extensión "Telegram Media Downloader".
   - Haz clic en "Ver vistas de la extensión" → "Service Worker" para ver logs del `background.js`.
2. **Ver logs del content script:**
   - Abre Telegram Web.
   - Presiona **F12** para abrir DevTools.
   - Ve a la pestaña **Console**.
   - Busca mensajes con `[TG Downloader]`.
3. **Verificar selectores CSS:**
   - En DevTools (F12), abre la pestaña **Elements**.
   - Abre el visor multimedia reproduciendo o haciendo clic en un medio.
   - Busca el contenedor `.media-viewer-whole`.
   - Dentro, verifica que exista `.media-viewer-buttons` con botones que tengan la clase `hide`.
   - Si los selectores han cambiado, actualiza `scanMediaViewer()` y `scanStories()` en `content/content.js`.
4. **Verificar detección de CDN:**
   - La lógica de resolución de URLs de CDN está en `background/background.js` (regex `CDN_RE`).
   - Añade nuevos patrones si Telegram cambia sus dominios de CDN.

## Ajustes necesarios

Si la extensión deja de funcionar debido a actualizaciones de Telegram Web:

1. **Selectores CSS en `content/content.js`:**
   - Telegram Web cambia sus clases CSS regularmente.
   - Actualiza los selectores en `scanMediaViewer()` y `scanStories()`.
2. **Detección de CDN en `background/background.js`:**
   - Verifica que las URLs de Telegram coincidan con `CDN_RE`.
   - Añade nuevos patrones si es necesario.
