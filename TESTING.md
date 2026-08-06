# Guía de Pruebas - Telegram Media Downloader

## Prueba Rápida

1. **Cargar la extensión:**
   - Abre Chrome y ve a `chrome://extensions/`
   - Activa "Modo desarrollador"
   - Haz clic en "Cargar extensión sin empaquetar"
   - Selecciona la carpeta `telegram-video-downloader`

2. **Verificar permisos:**
   - La extensión debe pedir permiso para acceder a `web.telegram.org`
   - Acepta los permisos

3. **Probar en Telegram Web:**
   - Ve a https://web.telegram.org
   - Inicia sesión (si no lo has hecho)
   - Navega a un canal o grupo con videos/imágenes

4. **Verificar detección de recursos:**
   - Haz clic en el ícono de la extensión
   - Debe mostrar "X recursos capturados"
   - Los recursos deben aparecer en la lista

5. **Probar descarga individual:**
   - Haz clic en el botón de descarga junto a un recurso
   - El archivo debe descargarse a tu carpeta de descargas

6. **Probar descarga por lotes:**
   - Haz clic en "Descargar todo"
   - Todos los recursos deben descargarse

## Solución de Problemas

### La extensión no detecta recursos
- Verifica que estés en `web.telegram.org` (no en la app de escritorio)
- Recarga la página de Telegram
- Revisa la consola del navegador (F12) para errores

### Los botones de descarga no aparecen
- Telegram Web actualiza su estructura regularmente
- Los selectores CSS pueden necesitar ajustes
- Revisa la consola para ver si hay errores de selección

### Las descargas no funcionan
- Verifica que la extensión tenga permisos de descarga
- Revisa que el archivo no esté siendo bloqueado por Chrome
- Algunos archivos pueden necesitar nombre personalizado

## Debugging

1. **Abrir consola de la extensión:**
   - Ve a `chrome://extensions/`
   - Haz clic en "Detalles" de tu extensión
   - Haz clic en "Ver vistas de la extensión"
   - Selecciona "Service Worker" para ver logs del background

2. **Ver logs del content script:**
   - Abre Telegram Web
   - Presiona F12 para abrir DevTools
   - Ve a la pestaña "Console"
   - Busca mensajes con `[TG Downloader]`

3. **Probar selectores CSS:**
   - En DevTools, ve a la pestaña "Elements"
   - Busca elementos de video/audio/imagen
   - Verifica que los selectores en `content.js` coincidan

## Ajustes Necesarios

Si la extensión no funciona correctamente, puede que necesites ajustar:

1. **Selectores CSS en `content.js`:**
   - Telegram Web cambia sus clases CSS regularmente
   - Actualiza los selectores en `scanMediaViewer()` y `scanStories()`

2. **Detección de CDN:**
   - Verifica que las URLs de Telegram coincidan con `CDN_RE` en `background.js`
   - Añade nuevos patrones si es necesario

3. **Estilos CSS:**
   - Ajusta `content/content.css` para que los botones se vean bien
   - Modifica colores o posiciones según sea necesario
