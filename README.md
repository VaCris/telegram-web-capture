# Telegram Media Downloader

Una extensión de Chrome para descargar videos, audios, imágenes y documentos de Telegram Web.

## Características

- Descarga individual de videos, audios, imágenes y documentos
- Descarga por lotes (batch) de todos los recursos capturados
- Interfaz simple y limpia
- Detecta automáticamente los recursos multimedia en Telegram Web

## Instalación

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa "Modo desarrollador" (esquina superior derecha)
3. Haz clic en "Cargar extensión sin empaquetar"
4. Selecciona la carpeta `telegram-web-capture`
5. La extensión aparecerá en tu barra de herramientas

## Uso

1. Ve a [Telegram Web](https://web.telegram.org)
2. Navega por tus chats, canales o grupos
3. Los recursos multimedia se capturarán automáticamente
4. Haz clic en el ícono de la extensión para ver los recursos capturados
5. Descarga individualmente o en lote

## Estructura del proyecto

```
telegram-web-capture/
├── manifest.json          # Configuración de la extensión
├── content/
│   ├── content.js         # Script que se inyecta en Telegram Web
│   └── content.css        # Estilos para los botones inyectados
├── background/
│   └── background.js      # Script de fondo para manejar descargas
├── popup/
│   ├── popup.html         # Interfaz de la extensión
│   ├── popup.css          # Estilos de la interfaz
│   └── popup.js           # Lógica de la interfaz
└── icons/
    ├── icon.svg           # Icono fuente
    ├── icon16.png         # Icono 16x16 (reemplazar)
    ├── icon48.png         # Icono 48x48 (reemplazar)
    └── icon128.png        # Icono 128x128 (reemplazar)
```

## Notas

- Esta extensión funciona únicamente en Telegram Web (web.telegram.org)
- Los iconos PNG son placeholders - reemplázalos con iconos reales
- La extensión requiere permisos para acceder a web.telegram.org

## Solución de problemas

- Si no aparecen recursos, verifica que estés en web.telegram.org
- Recarga la página si la extensión no detecta nuevos recursos
- Revisa la consola del navegador para ver errores
