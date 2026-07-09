// ============================================================================
// CONFIGURACIÓN DE FIREBASE — control remoto entre dos dispositivos distintos
// ============================================================================
//
// Este archivo NO contiene las credenciales reales a propósito: este repo es
// público, y las credenciales reales solo viven como un "Secret" de GitHub
// Actions (Settings → Secrets and variables → Actions → FIREBASE_CONFIG_JS).
// El workflow `.github/workflows/deploy-pages.yml` sobreescribe este archivo
// con el valor real justo antes de publicar en GitHub Pages — así nunca queda
// commiteado ni buscable en el historial de git.
//
// Mientras estos valores digan "YOUR_..." (como al clonar el repo, o en
// desarrollo local) el simulador funciona en MODO LOCAL: solo se sincroniza
// entre pestañas del MISMO navegador (sirve para probar index.html y
// control.html en dos pestañas del mismo computador).
//
// Para reconfigurar el proyecto Firebase desde cero, ver el paso a paso en
// README.md.

export const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export function isFirebaseConfigured() {
  return !Object.values(FIREBASE_CONFIG).some((v) => String(v).startsWith("YOUR_"));
}
