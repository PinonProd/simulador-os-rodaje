# Simulador de Sistema Operativo (utilería de rodaje)

App web (HTML + CSS + JS puro, sin frameworks) que simula la interfaz básica
de Android — pantalla de bloqueo, inicio, cajón de aplicaciones, llamada
entrante y alarma — para usar como utilería en pantalla durante grabaciones
(ej: un personaje que recibe una llamada, o le suena la alarma).

No es una app nativa: se abre en el navegador del celular. Agregada a la
pantalla de inicio (ver abajo), pierde la barra de direcciones y se ve como
una app real. El cajón de aplicaciones tiene un ícono discreto **"Salir del
simulador"** al final de la grilla para que el equipo pueda salir sin que se
note en cámara.

## Archivos

- `index.html` — pantalla del celular (la que sale en cámara).
- `control.html` — panel de control remoto (para el director/asistente, en
  otro celular, tablet o notebook).
- `js/`, `css/` — lógica y estilos.
- `js/firebase-config.js` — credenciales para el control remoto entre dos
  dispositivos distintos (ver más abajo).

## Uso rápido (sin configurar nada)

1. Abre `index.html` en el celular que será la utilería.
2. Abre `control.html` en **otra pestaña del mismo navegador/computador**
   (por ahora, sin Firebase configurado, solo sincroniza así — ver sección
   "Control remoto real" para usar dos dispositivos distintos).
3. En ambas pantallas usa el mismo **código de sesión**.
4. En el panel de control: completa el contacto (nombre, foto, tono) y
   presiona **"Llamar ahora"**. En `index.html` debería aparecer la llamada
   entrante a pantalla completa, encima de cualquier pantalla (bloqueo,
   inicio, cajón).
5. Lo mismo para la alarma con **"Sonar alarma ahora"**.

## Uso durante el rodaje (pantalla que sale en cámara)

- Abre `index.html` en el navegador del celular.
- Menú del navegador → **"Agregar a pantalla de inicio"** (Chrome/Safari).
  Al abrirlo desde el ícono en el home, se abre a pantalla completa sin
  barra de direcciones — no se nota que es un sitio web.
- La primera vez pedirá un **código de sesión**: cualquier código sirve si
  vas a controlarlo desde el mismo dispositivo o si configuraste Firebase.
  Este código queda guardado en el celular, no hay que reingresarlo cada vez.
- Para salir del simulador (ajustar algo, terminar el rodaje): desliza hacia
  arriba desde el inicio para abrir el cajón de aplicaciones y toca el
  ícono **"Salir del simulador"** al final de la grilla.

## Publicación en GitHub Pages (automática)

Este repo es **público**, así que las credenciales reales de Firebase nunca
se guardan en el código ni en el historial de git — viven solo como un
**Secret de GitHub Actions** y se inyectan justo antes de publicar.

Configuración (una sola vez):

1. **Settings → Pages → Build and deployment → Source:** elegir
   **"GitHub Actions"**.
2. **Settings → Secrets and variables → Actions → New repository secret:**
   - Name: `FIREBASE_CONFIG_JS`
   - Value: pega el contenido completo de tu `js/firebase-config.js` real
     (el bloque `export const FIREBASE_CONFIG = {...}` con tus credenciales).
3. Cualquier `git push` a `main` dispara el workflow
   `.github/workflows/deploy-pages.yml`, que reemplaza `js/firebase-config.js`
   por el valor del secret y publica el sitio en GitHub Pages.
4. La URL pública queda en **Settings → Pages** (arriba, una vez que corre
   el primer deploy) — algo como `https://pinonprod.github.io/simulador-os-rodaje/`.

Si el secret no está configurado, igual se publica (con el archivo de
placeholders), pero el control remoto solo funcionará entre pestañas del
mismo navegador — ver "Uso rápido" más arriba.

## Configurar el proyecto Firebase desde cero

Para control remoto real, en cualquier lugar con internet, hay que conectar
un backend gratuito de Firebase (Google, plan Spark, sin tarjeta):

1. Ve a https://console.firebase.google.com/ → **Agregar proyecto**
   (ej: `pinon-simulador-os`).
2. Dentro del proyecto: **Compilación → Realtime Database → Crear base de
   datos** → cualquier región → modo de prueba.
3. **Configuración del proyecto** (ícono de tuerca) → **Tus apps** → ícono
   `</>` (Web) → registra la app (no hace falta Hosting).
4. Copia el objeto `firebaseConfig` que te muestra Firebase.
5. Úsalo para armar el Secret `FIREBASE_CONFIG_JS` (ver sección de arriba) o,
   para pruebas locales, pégalo directo en tu copia local de
   `js/firebase-config.js`, reemplazando los valores `"YOUR_..."`
   (ese archivo local nunca se sube, solo vive en tu computador).
6. En Realtime Database → pestaña **Reglas**, reemplaza por:

   ```json
   {
     "rules": {
       "sessions": {
         "$sessionId": { ".read": true, ".write": true }
       }
     }
   }
   ```

   Publica los cambios.

Con eso, `index.html` y `control.html` sincronizan en tiempo real por
internet mientras usen el mismo código de sesión — pueden estar en
cualquier lugar, cada uno en su propio celular o notebook.

### Cómo saber en qué modo está corriendo

Ambas páginas muestran el modo activo:
- `index.html`: en la pantalla de configuración/salida, debajo del botón.
- `control.html`: junto al título, arriba a la derecha.

### Compartir el link al celular sin tipear el código

`control.html` muestra un link tipo `index.html?s=CÓDIGO` una vez conectado
— compártelo (o conviértelo en QR con cualquier generador) y al abrirlo en
el celular entra directo a esa sesión, sin pantalla de configuración.

## Qué incluye esta primera versión

- Sistema operativo básico: pantalla de bloqueo (reloj/fecha en vivo),
  pantalla de inicio (grilla de apps + dock), cajón de aplicaciones, barra
  de estado (hora, señal, wifi, batería — todo configurable desde el panel).
- App **Teléfono**: llamada entrante configurable (nombre, foto, número,
  tono), pantalla en llamada con cronómetro, colgar/rechazar/contestar.
- App **Reloj**: alarmas creadas a mano en el propio celular (para que salga
  en cámara el personaje configurándola) + disparo instantáneo por control
  remoto (sin esperar la hora real), pantalla de alarma con posponer/detener.
- El resto de los íconos (Mensajes, Cámara, Ajustes, etc.) abren una
  pantalla genérica — están ahí para que el cajón de apps se vea completo y
  real, pero no tienen funcionalidad (se puede ampliar a futuro).

## Ideas para siguientes etapas

- Mensajes de texto simulados (conversación configurable).
- Notificaciones tipo heads-up para otros eventos.
- Subida de fotos/sonidos propios en vez de solo URL.
- Generador de QR integrado en `control.html`.
