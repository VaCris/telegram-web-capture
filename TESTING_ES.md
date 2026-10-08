# Guía de Pruebas — Telegram Media Downloader

<div align="center">

🇺🇸 [English](TESTING.md) · 🇪🇸 **Español**

</div>

Esta guía explica cómo verificar manualmente el comportamiento actual de la extensión.

## Tests automatizados

El content script tiene una suite de tests con jsdom que cubre el comportamiento de los selectores:

```bash
npm install
npm test
```

Ejecútala tras cualquier cambio en `content/content.js` y antes de las pruebas manuales.

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

## Prueba del popup

1. Pulsa el icono de la extensión en la barra de herramientas.
2. En Telegram Web el punto de estado debe ponerse en verde ("Telegram Web abierto"); en cualquier otro sitio permanece rojo.
3. Desactiva el interruptor, abre el visor multimedia y comprueba que los botones ocultos siguen ocultos.
4. Reactívalo y comprueba que los botones ocultos se vuelven visibles.
5. Pulsa **Abrir Telegram** — debe abrirse una pestaña con Telegram Web.

## Resultado esperado

| Comportamiento | Resultado esperado |
| --- | --- |
| El visor multimedia se abre | El medio seleccionado aparece en el visor de Telegram |
| Control de descarga | El botón nativo de Telegram es visible |
| Clic en descargar | Telegram gestiona la descarga normalmente |
| Visor de Stories | Los controles nativos ocultos se hacen visibles |
| Popup en Telegram | Punto de estado en verde, interruptor activado |
| Interruptor apagado | Los botones ocultos del visor permanecen ocultos |

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
7. Si Telegram cambió estos elementos, actualiza los selectores en `content/content.js`.

## Alcance actual del runtime

El `manifest.json` actual registra un único content script para Telegram Web. La extensión no tiene service worker de fondo, ni popup, y no solicita permisos más allá de las coincidencias del content script.

## Cuando Telegram cambie su interfaz

El punto principal de mantenimiento será `content/content.js`, especialmente los selectores utilizados por:

- `scan()`
- `unhideButtons()`

Después de modificarlos, vuelve a probar tanto el visor multimedia como Stories.
