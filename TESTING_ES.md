# Guía de Pruebas — Telegram Media Downloader

<div align="center">

🇺🇸 [English](TESTING.md) · 🇪🇸 **Español**

</div>

Esta guía explica cómo verificar manualmente el comportamiento actual de la extensión.

## Prueba rápida

1. **Carga la extensión**
   - Abre Chrome y entra a `chrome://extensions/`.
   - Activa **Modo desarrollador**.
   - Haz clic en **Cargar extensión sin empaquetar**.
   - Selecciona la carpeta `telegram-web-capture`.
2. **Confirma la instalación**
   - Verifica que **Telegram Media Downloader** aparezca en la lista de extensiones.
3. **Abre Telegram Web**
   - Entra a [web.telegram.org](https://web.telegram.org) e inicia sesión.
4. **Abre el visor multimedia**
   - Abre una imagen, video, audio o documento desde un chat, canal o grupo.
5. **Verifica el botón de descarga**
   - El botón de descarga nativo de Telegram debe quedar visible en el visor en lugar de permanecer oculto.
6. **Prueba la descarga**
   - Haz clic en el botón nativo de descarga.
   - Telegram debe gestionar la descarga mediante su flujo normal del navegador.

## Prueba en Stories

1. Abre una Story.
2. Verifica que el visor de Stories se abra correctamente.
3. Confirma que el control nativo de descarga sea visible cuando Telegram lo incluya en el visor.

## Resultado esperado

| Comportamiento | Resultado esperado |
| --- | --- |
| El visor multimedia se abre | El medio seleccionado aparece en el visor de Telegram |
| Control de descarga | El botón nativo de Telegram es visible |
| Clic en descargar | Telegram gestiona la descarga normalmente |
| Visor de Stories | Los controles nativos ocultos se hacen visibles |

## Solución de problemas

### El botón de descarga no aparece

- Confirma que utilizas `web.telegram.org`, `webk.telegram.org` o `webz.telegram.org`.
- Abre el contenido dentro del visor de Telegram; la extensión actúa sobre los controles del visor.
- Recarga Telegram Web y vuelve a abrir el contenido.
- Verifica que la extensión esté habilitada en `chrome://extensions/`.
- Telegram puede haber cambiado su estructura DOM. Revisa los selectores utilizados por `content/content.js`.

## Depuración

1. Abre Telegram Web.
2. Presiona **F12** para abrir DevTools.
3. Entra a la pestaña **Elements**.
4. Abre el visor multimedia de Telegram.
5. Comprueba la existencia de:
   - `.media-viewer-whole`
   - `.media-viewer-buttons`
   - `button.btn-icon.hide`
6. Para Stories, revisa `#stories-viewer`.
7. Si Telegram cambió estos elementos, actualiza `scanMediaViewer()` o `scanStories()` en `content/content.js`.

## Alcance actual del runtime

El `manifest.json` actual registra el content script y el CSS para Telegram Web. Aunque el repositorio todavía contiene código dentro de `background/` y `popup/`, esos componentes no están registrados actualmente en el manifest y no deben considerarse parte activa del runtime al ejecutar estas pruebas.

## Cuando Telegram cambie su interfaz

El punto principal de mantenimiento será `content/content.js`, especialmente los selectores utilizados por:

- `scanMediaViewer()`
- `scanStories()`

Después de modificarlos, vuelve a probar tanto el visor multimedia como Stories.
