// ============================================================================
// CAPA DE SINCRONIZACIÓN
// Expone un único objeto `Sync` usado tanto por index.html (dispositivo)
// como por control.html (control remoto).
//
// Si Firebase está configurado (ver firebase-config.js) sincroniza en tiempo
// real vía Realtime Database → funciona entre dos dispositivos distintos,
// en cualquier lugar con internet.
//
// Si NO está configurado, cae a un modo local basado en localStorage +
// evento "storage", que solo sincroniza entre pestañas/ventanas del MISMO
// navegador. Sirve para probar todo el flujo antes de configurar Firebase.
// ============================================================================

import { FIREBASE_CONFIG, isFirebaseConfigured } from "./firebase-config.js?v=5";

const LS_PREFIX = "pn_sim_";

// Lista de apps por defecto. El panel de control puede reordenarlas,
// renombrarlas, cambiarles el globo de notificaciones (badge), decidir
// cuáles van en el inicio/dock, y agregar apps propias con emoji.
const DEFAULT_APPS = [
  { id: "phone", label: "Teléfono", icon: "phone", emoji: "", color: "#2fbf59", badge: 0, home: false, dock: true },
  { id: "message", label: "Mensajes", icon: "message", emoji: "", color: "#3b82f6", badge: 0, home: false, dock: true },
  { id: "camera", label: "Cámara", icon: "camera", emoji: "", color: "#6b7280", badge: 0, home: false, dock: true },
  { id: "clock", label: "Reloj", icon: "clock", emoji: "", color: "#374151", badge: 0, home: false, dock: true },
  { id: "chat", label: "WhatsApp", icon: "chat", emoji: "", color: "#25D366", badge: 0, home: true, dock: false },
  { id: "social", label: "Instagram", icon: "social", emoji: "", color: "#d63076", badge: 0, home: true, dock: false },
  { id: "play", label: "YouTube", icon: "play", emoji: "", color: "#e02f2f", badge: 0, home: true, dock: false },
  { id: "settings", label: "Ajustes", icon: "settings", emoji: "", color: "#5f6368", badge: 0, home: true, dock: false },
  { id: "gallery", label: "Fotos", icon: "gallery", emoji: "", color: "#f59e0b", badge: 0, home: true, dock: false },
  { id: "browser", label: "Navegador", icon: "browser", emoji: "", color: "#4285f4", badge: 0, home: true, dock: false },
  { id: "calculator", label: "Calculadora", icon: "calculator", emoji: "", color: "#4b5563", badge: 0, home: true, dock: false },
  { id: "calendar", label: "Calendario", icon: "calendar", emoji: "", color: "#1a73e8", badge: 0, home: true, dock: false },
  { id: "maps", label: "Mapas", icon: "maps", emoji: "", color: "#34a853", badge: 0, home: true, dock: false },
  { id: "mail", label: "Correo", icon: "mail", emoji: "", color: "#ea4335", badge: 0, home: true, dock: false },
  { id: "store", label: "Tienda", icon: "store", emoji: "", color: "#0f9d58", badge: 0, home: true, dock: false },
  { id: "playstore", label: "Play Store", icon: "playstore", emoji: "", color: "#ffffff", badge: 2, home: true, dock: false },
  { id: "googlefolder", label: "Google", icon: "folder", emoji: "", color: "#26282e", badge: 1, home: true, dock: false,
    folderColors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"] },
];

const DEFAULT_CONFIG = {
  device: { carrier: "Entel", battery: 84, signal: 4, wifi: true },
  // Hora falsa: cuando enabled=true, TODOS los relojes del simulador
  // (status bar, bloqueo, inicio, alarma) muestran esta hora, que sigue
  // avanzando sola desde el momento en que se aplicó (setAt).
  time: { enabled: false, value: "04:56", dateText: "", setAt: 0 },
  wallpaperUrl: "",
  iconStyle: { shape: "rounded", theme: "color" },
  apps: DEFAULT_APPS,
  home: {
    wallpaperPreset: "gradient", // "gradient" | "dark" (se ignora si wallpaperUrl tiene valor)
    showClockWidget: false,
    showSearchBar: true,
    showPageDots: true,
    navStyle: "gesture", // "gesture" | "buttons"
  },
  weather: {
    enabled: true,
    temp: 31,
    unit: "°",
    condition: "Posibles tormentas cerca de la 1 p. m.",
    city: "Santiago",
    icon: "storm", // sun | cloud | rain | storm | snow
  },
  contact: {
    name: "Mamá",
    number: "+56 9 1234 5678",
    photoUrl: "",
    ringtone: "clasico",
  },
  alarm: {
    time: "07:00",
    label: "Despertar",
    sound: "clasico",
    snoozeMin: 9,
    enabled: true,
  },
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

class LocalBackend {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.configKey = `${LS_PREFIX}${sessionId}_config`;
    this.commandKey = `${LS_PREFIX}${sessionId}_command`;
    this._configHandlers = [];
    this._commandHandlers = [];
    window.addEventListener("storage", (e) => {
      if (e.key === this.configKey && e.newValue) {
        this._configHandlers.forEach((cb) => cb(JSON.parse(e.newValue)));
      }
      if (e.key === this.commandKey && e.newValue) {
        this._commandHandlers.forEach((cb) => cb(JSON.parse(e.newValue)));
      }
    });
  }

  get mode() {
    return "local";
  }

  getConfig() {
    const raw = localStorage.getItem(this.configKey);
    return raw ? JSON.parse(raw) : structuredClone(DEFAULT_CONFIG);
  }

  setConfig(partial) {
    const merged = deepMerge(this.getConfig(), partial);
    localStorage.setItem(this.configKey, JSON.stringify(merged));
    // localStorage "storage" event no dispara en la misma pestaña que escribe,
    // así que notificamos manualmente a los listeners locales también.
    this._configHandlers.forEach((cb) => cb(merged));
    return merged;
  }

  onConfigChange(cb) {
    this._configHandlers.push(cb);
    cb(this.getConfig());
  }

  sendCommand(type, payload = {}) {
    const cmd = { id: uid(), type, payload, ts: Date.now() };
    localStorage.setItem(this.commandKey, JSON.stringify(cmd));
    this._commandHandlers.forEach((h) => h(cmd));
    return cmd;
  }

  onCommand(cb) {
    this._commandHandlers.push(cb);
  }
}

class FirebaseBackend {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this._configHandlers = [];
    this._commandHandlers = [];
    // Si Firebase no carga (sin internet, red del set bloqueada), degradamos
    // a modo local en vez de dejar el simulador mudo.
    this._ready = this._init().catch((e) => {
      console.warn("Firebase no disponible; usando modo local:", e?.message || e);
      this._fallback = new LocalBackend(this.sessionId);
      this._configHandlers.forEach((cb) => this._fallback.onConfigChange(cb));
      this._commandHandlers.forEach((cb) => this._fallback.onCommand(cb));
    });
  }

  get mode() {
    return this._fallback ? "local" : "firebase";
  }

  async _init() {
    const { initializeApp } = await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
    );
    const {
      getDatabase,
      ref,
      onValue,
      set,
      update,
      push,
      get,
    } = await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"
    );
    const app = initializeApp(FIREBASE_CONFIG);
    const db = getDatabase(app);
    this._dbApi = { ref, onValue, set, update, push, get };
    this.db = db;
    this.configRef = ref(db, `sessions/${this.sessionId}/config`);
    this.commandRef = ref(db, `sessions/${this.sessionId}/lastCommand`);

    const snap = await get(this.configRef);
    if (!snap.exists()) {
      await set(this.configRef, DEFAULT_CONFIG);
    }

    onValue(this.configRef, (s) => {
      const val = s.val();
      if (val) this._configHandlers.forEach((cb) => cb(val));
    });

    let lastSeenTs = Date.now();
    onValue(this.commandRef, (s) => {
      const val = s.val();
      if (val && val.ts > lastSeenTs - 1) {
        lastSeenTs = val.ts;
        this._commandHandlers.forEach((cb) => cb(val));
      }
    });
  }

  async getConfig() {
    await this._ready;
    if (this._fallback) return this._fallback.getConfig();
    const snap = await this._dbApi.get(this.configRef);
    return snap.val() || structuredClone(DEFAULT_CONFIG);
  }

  async setConfig(partial) {
    await this._ready;
    if (this._fallback) return this._fallback.setConfig(partial);
    await this._dbApi.update(this.configRef, flattenForUpdate(partial));
  }

  onConfigChange(cb) {
    if (this._fallback) return this._fallback.onConfigChange(cb);
    this._configHandlers.push(cb);
    this._ready.then(() => {
      if (this._fallback) return; // el catch de _init ya re-registró el handler
      this._dbApi.get(this.configRef).then((s) => {
        if (s.val()) cb(s.val());
      });
    });
  }

  async sendCommand(type, payload = {}) {
    await this._ready;
    if (this._fallback) return this._fallback.sendCommand(type, payload);
    const cmd = { id: uid(), type, payload, ts: Date.now() };
    await this._dbApi.set(this.commandRef, cmd);
    return cmd;
  }

  onCommand(cb) {
    if (this._fallback) return this._fallback.onCommand(cb);
    this._commandHandlers.push(cb);
  }
}

function deepMerge(base, patch) {
  const out = structuredClone(base);
  for (const k of Object.keys(patch)) {
    if (
      patch[k] &&
      typeof patch[k] === "object" &&
      !Array.isArray(patch[k]) &&
      out[k] &&
      typeof out[k] === "object"
    ) {
      out[k] = deepMerge(out[k], patch[k]);
    } else {
      out[k] = patch[k];
    }
  }
  return out;
}

// Convierte un objeto anidado en rutas planas para Firebase `update()`,
// evitando pisar campos hermanos que no vinieron en el patch.
function flattenForUpdate(obj, prefix = "") {
  const out = {};
  for (const k of Object.keys(obj)) {
    const path = prefix ? `${prefix}/${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flattenForUpdate(v, path));
    } else {
      out[path] = v;
    }
  }
  return out;
}

export function getSessionId() {
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get("s");
  if (fromUrl) {
    localStorage.setItem(`${LS_PREFIX}session`, fromUrl);
    return fromUrl;
  }
  let id = localStorage.getItem(`${LS_PREFIX}session`);
  if (!id) {
    id = Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem(`${LS_PREFIX}session`, id);
  }
  return id;
}

export function setSessionId(id) {
  localStorage.setItem(`${LS_PREFIX}session`, id);
}

export function createSync(sessionId) {
  return isFirebaseConfigured()
    ? new FirebaseBackend(sessionId)
    : new LocalBackend(sessionId);
}

export { DEFAULT_CONFIG, DEFAULT_APPS, isFirebaseConfigured };
