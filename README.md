# Telegram Media Downloader

Una extensión de Chrome para descargar videos, audios, imágenes y documentos de Telegram Web.

## Características

- Muestra el botón de descarga nativo de Telegram Web en el visor multimedia
- Funciona en videos, audios, imágenes y documentos del visor
- También funciona dentro de Stories
- Interfaz simple y limpia
- No requiere configuración adicional

## Instalación

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa "Modo desarrollador" (esquina superior derecha)
3. Haz clic en "Cargar extensión sin empaquetar"
4. Selecciona la carpeta `telegram-web-capture`
5. La extensión aparecerá en tu barra de herramientas

## Uso

1. Ve a [Telegram Web](https://web.telegram.org)
2. Navega por tus chats, canales o grupos
3. Abre o reproduce el video/imagen/audio para que aparezca el visor multimedia
4. La extensión mostrará automáticamente el ícono de descarga nativo de Telegram en el visor
5. Usa ese ícono para descargar el archivo directamente

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

- Esta extensión funciona únicamente en Telegram Web (web.telegram.org, webk.telegram.org, webz.telegram.org)
- La extensión solo muestra el botón de descarga nativo en el visor multimedia y en Stories
- No captura ni almacena medios para descarga posterior
- La extensión requiere permisos para acceder a web.telegram.org

## Solución de problemas

- Si no aparece el ícono de descarga, verifica que estés en web.telegram.org
- Asegúrate de abrir el visor multimedia reproduciendo o haciendo clic en el archivo
- Recarga la página si la extensión no detecta el visor
- Revisa la consola del navegador para ver errores
