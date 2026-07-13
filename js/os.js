// ============================================================================
// NÚCLEO DEL SISTEMA OPERATIVO SIMULADO
// Maneja: lock screen, home screen, cajón de apps, status bar, gestos,
// apertura/cierre de apps (ventanas a pantalla completa).
// ============================================================================

export const ICONS = {
  phone: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/></svg>`,
  message: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M4 4h16a1 1 0 011 1v12a1 1 0 01-1 1H8l-4.6 3.4A.5.5 0 013 21V5a1 1 0 011-1z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M9 3h6l1.2 2H20a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h3.8L9 3zm3 15a5 5 0 100-10 5 5 0 000 10z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 5v5.4l4 2.4-.75 1.3L11 13V7h1.75z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M19.4 13a7.6 7.6 0 000-2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 00-1.7-1L14.9 3h-3.8l-.4 2.6a7.5 7.5 0 00-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 000 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h3.8l.4-2.6a7.5 7.5 0 001.7-1l2.4 1 2-3.4-2-1.6zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm2 13h12l-3.8-5-2.7 3.4L9 12z"/></svg>`,
  browser: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 8h-3a15 15 0 00-1.2-5.3A8 8 0 0118.9 10zM12 4.1c.8 1.1 1.7 3 2 5.9h-4c.3-2.9 1.2-4.8 2-5.9zM4.1 12a8 8 0 01.9-2h3.1a17 17 0 000 4H5A8 8 0 014.1 12zm1 4h3a15 15 0 001.2 5.3A8 8 0 015.1 16zm3-6H5.1a8 8 0 011.2-2 8 8 0 011.8-1.3A17 17 0 008.1 10zM12 19.9c-.8-1.1-1.7-3-2-5.9h4c-.3 2.9-1.2 4.8-2 5.9zm2.1-7.9h-4.2a15 15 0 010-4h4.2a15 15 0 010 4zm.7 7.2A15 15 0 0016 13.3h3a8 8 0 01-1.2 5.3 8 8 0 01-3 1.7zM16 10a17 17 0 00-.9-3.3 8 8 0 013.8 3.3H16z"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zm1 3v3h8V5H8zm0 5v2h2v-2H8zm3 0v2h2v-2h-2zm3 0v2h2v-2h-2zM8 13v2h2v-2H8zm3 0v2h2v-2h-2zm3 0v6h2v-6h-2zM8 17v2h2v-2H8zm3 0v2h2v-2h-2z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M7 2v2H5a1 1 0 00-1 1v3h16V5a1 1 0 00-1-1h-2V2h-2v2H9V2H7zM4 10v10a1 1 0 001 1h14a1 1 0 001-1V10H4z"/></svg>`,
  maps: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.7A2.7 2.7 0 1112 6.3a2.7 2.7 0 010 5.4z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 8l8-6H4z"/></svg>`,
  store: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M4 4h16l1 5H3l1-5zm-1 7h18v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9zm5 2v4h2v-4H8zm6 0v4h2v-4h-2z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3zm4.4 12.4c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-3.1-.7-2.6-1.1-4.2-3.7-4.3-3.9-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.1.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.2.4-.3.6-.2l1.9.9c.2.1.4.2.4.3.1.2.1.5-.2.8z"/></svg>`,
  social: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.3" fill="#fff" stroke="none"/></svg>`,
  play: `<svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"><path d="M4 7.5A3.5 3.5 0 017.5 4h9A3.5 3.5 0 0120 7.5v9a3.5 3.5 0 01-3.5 3.5h-9A3.5 3.5 0 014 16.5v-9zM10 8.5v7l6-3.5-6-3.5z"/></svg>`,
  exit: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M10 17l-1.4-1.4 2.6-2.6H4v-2h7.2L8.6 8.4 10 7l5 5-5 5zM19 4h-7v2h7v12h-7v2h7a2 2 0 002-2V6a2 2 0 00-2-2z"/></svg>`,
  micOn: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11h-2z"/></svg>`,
  keypad: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>`,
  speaker: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a3.5 3.5 0 00-2-3.2v6.3a3.5 3.5 0 002-3.1z"/></svg>`,
  addcall: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 5v6H6v2h6v6h2v-6h6v-2h-6V5z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11z"/></svg>`,
  more: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
  signal: (bars) => {
    let bs = "";
    for (let i = 0; i < 4; i++) {
      const h = 4 + i * 3;
      const on = i < bars;
      bs += `<rect x="${i * 5}" y="${14 - h}" width="3.5" height="${h}" rx="1" fill="${on ? '#fff' : 'rgba(255,255,255,.35)'}"/>`;
    }
    return `<svg viewBox="0 0 20 14" width="18" height="13">${bs}</svg>`;
  },
  wifi: `<svg viewBox="0 0 24 18" width="18" height="14" fill="#fff"><path d="M12 15.5a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM7.8 10.6a6 6 0 018.4 0l-1.4 1.5a4 4 0 00-5.6 0l-1.4-1.5zM4.6 7.4a10.5 10.5 0 0114.8 0l-1.4 1.5a8.5 8.5 0 00-12 0L4.6 7.4z"/></svg>`,
  battery: (pct) => `<svg viewBox="0 0 26 14" width="24" height="13"><rect x="1" y="1.5" width="21" height="11" rx="2.5" stroke="#fff" stroke-opacity=".6" fill="none"/><rect x="23" y="5" width="2" height="4" rx="1" fill="#fff" fill-opacity=".6"/><rect x="2.5" y="3" width="${17 * (pct / 100)}" height="8" rx="1.3" fill="${pct <= 15 ? '#f28b82' : '#fff'}"/></svg>`,
  // Íconos del panel de ajustes rápidos (referencia: One UI Design Kit)
  qsWifi: `<svg viewBox="0 0 24 18" width="22" height="17" fill="currentColor"><path d="M12 15.5a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM7.8 10.6a6 6 0 018.4 0l-1.4 1.5a4 4 0 00-5.6 0l-1.4-1.5zM4.6 7.4a10.5 10.5 0 0114.8 0l-1.4 1.5a8.5 8.5 0 00-12 0L4.6 7.4z"/></svg>`,
  qsBluetooth: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10-5 4V3l5 4L7 17"/></svg>`,
  qsFlight: `<svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor"><path d="M2 16l20-6-2-2-7 1-5-6-2 .5 3 6.5-6 1.5-2-1.5-1.5.5L2 14z"/></svg>`,
  qsFlashlight: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9 2h6v4l-2 2v12l-1 2-1-2V8L9 6z"/></svg>`,
  qsRotate: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M18 8a6 6 0 10-11 3.5" stroke-linecap="round" fill="none"/><path d="M8.5 8.5L7 11.5l3.3.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  qsDnd: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-5 9h10v2H7v-2z"/></svg>`,
  // Buscador de Google (decorativo) y app "Play Store"
  googleG: `<svg viewBox="0 0 48 48" width="22" height="22"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h11.8c-.5 2.7-2.1 5-4.4 6.6v5.4h7.1c4.2-3.9 6.6-9.6 6.6-16.5z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.4c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.6C8.1 40.9 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.8 28.4c-.4-1.3-.7-2.7-.7-4.4s.2-3 .7-4.4v-5.6H4.5C3 16.9 2 20.3 2 24s1 7.1 2.5 10l7.3-5.6z"/><path fill="#EA4335" d="M24 10.9c3.2 0 6 1.1 8.3 3.3l6.2-6.2C34.9 4.4 29.9 2 24 2 15.4 2 8.1 7.1 4.5 14l7.3 5.6c1.7-5.2 6.5-9 12.2-9.7z"/></svg>`,
  gsSparkle: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#5f6368"><path d="M11 2l1.6 5.4L18 9l-5.4 1.6L11 16l-1.6-5.4L4 9l5.4-1.6L11 2zm7.5 9l.8 2.7L22 14.5l-2.7.8-.8 2.7-.8-2.7L15 14.5l2.7-.8.8-2.7z"/></svg>`,
  gsMic: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#5f6368"><path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-2.1A7 7 0 0019 12h-2z"/></svg>`,
  gsLens: `<svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M12 2a10 10 0 00-8.7 5H12z"/><path fill="#EA4335" d="M3.3 7a10 10 0 000 10L8.2 12z"/><path fill="#FBBC05" d="M3.3 17a10 10 0 008.7 5v-5z"/><path fill="#34A853" d="M12 22a10 10 0 008.7-5H12z"/><circle cx="12" cy="12" r="4.2" fill="#fff"/><circle cx="12" cy="12" r="3" fill="#5f6368"/></svg>`,
  playstore: `<svg viewBox="0 0 24 24" width="26" height="26"><defs><linearGradient id="psA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00E4FF"/><stop offset="1" stop-color="#00B0FF"/></linearGradient><linearGradient id="psB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD800"/><stop offset="1" stop-color="#FFA000"/></linearGradient></defs><path fill="url(#psA)" d="M4 3.5v17c0 .4.2.7.5.9L14 12 4.5 2.6c-.3.2-.5.5-.5.9z"/><path fill="#00F076" d="M14 12L4.5 2.6c.2-.1.5-.1.8 0l11 6.2L14 12z"/><path fill="#FF3A44" d="M14 12l2.3 3.2-11 6.2c-.3.1-.6.1-.8 0L14 12z"/><path fill="url(#psB)" d="M16.3 8.8L14 12l2.3 3.2 3.9-2.2c.6-.3.6-1.2 0-1.6l-3.9-2.6z"/></svg>`,
};

const APPS = [
  { id: "phone", label: "Teléfono", icon: "phone", color: "#2fbf59", home: false, dock: true },
  { id: "message", label: "Mensajes", icon: "message", color: "#3b82f6", home: false, dock: true },
  { id: "camera", label: "Cámara", icon: "camera", color: "#6b7280", home: false, dock: true },
  { id: "clock", label: "Reloj", icon: "clock", color: "#374151", home: false, dock: true },
  { id: "settings", label: "Ajustes", icon: "settings", color: "#5f6368", home: true, dock: false },
  { id: "gallery", label: "Fotos", icon: "gallery", color: "#f59e0b", home: true, dock: false },
  { id: "browser", label: "Navegador", icon: "browser", color: "#4285f4", home: true, dock: false },
  { id: "calculator", label: "Calculadora", icon: "calculator", color: "#4b5563", home: true, dock: false },
  { id: "calendar", label: "Calendario", icon: "calendar", color: "#1a73e8", home: true, dock: false },
  { id: "maps", label: "Mapas", icon: "maps", color: "#34a853", home: true, dock: false },
  { id: "mail", label: "Correo", icon: "mail", color: "#ea4335", home: true, dock: false },
  { id: "store", label: "Tienda", icon: "store", color: "#0f9d58", home: true, dock: false },
];

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html != null) e.innerHTML = html;
  return e;
}

function fmtTime(d) {
  return d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false });
}
function fmtDate(d) {
  return d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
}

export class OS {
  constructor(root, { onExit, onLaunch } = {}) {
    this.root = root;
    this.onExit = onExit || (() => {});
    this.onLaunch = onLaunch || (() => {});
    this.state = "lock"; // lock | home | drawer
    this.config = null;
    this._build();
    this._tickClock();
    setInterval(() => this._tickClock(), 1000 * 15);
    setInterval(() => this._tickSeconds(), 1000);
  }

  _build() {
    this.root.innerHTML = `
      <div class="statusbar">
        <span class="sb-time"></span>
        <span class="sb-right">
          <span class="sb-signal"></span>
          <span class="sb-wifi"></span>
          <span class="battery-pct"></span>
          <span class="sb-battery"></span>
        </span>
      </div>
      <div id="lockscreen" class="pane">
        <div class="lock-clock"></div>
        <div class="lock-date"></div>
        <div class="lock-hint">
          <span>Deslice hacia arriba para abrir</span>
        </div>
      </div>
      <div id="homescreen" class="pane">
        <div class="home-top">
          <div class="home-widget"><div class="w-time"></div><div class="w-date"></div></div>
          <div class="weather-widget">
            <div class="ww-icon"></div>
            <div>
              <div class="ww-temp"></div>
              <div class="ww-cond"></div>
              <div class="ww-city"></div>
            </div>
          </div>
          <div class="google-searchbar">
            ${ICONS.googleG}
            <div class="gs-icons">${ICONS.gsSparkle}${ICONS.gsMic}${ICONS.gsLens}</div>
          </div>
        </div>
        <div class="app-grid"></div>
        <div class="page-dots"><span class="active"></span><span></span><span></span></div>
        <div class="dock"></div>
        <div class="nav-buttons">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><rect x="3" y="6" width="18" height="2.2" rx="1"/><rect x="3" y="11" width="18" height="2.2" rx="1"/><rect x="3" y="16" width="18" height="2.2" rx="1"/></svg>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/></svg>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
        </div>
      </div>
      <div id="appdrawer" class="pane">
        <div class="drawer-search">🔍 Buscar en el teléfono</div>
        <div class="drawer-grid"></div>
      </div>
      <div id="app-root"></div>
      <div class="gesture-pill"></div>
      <div id="shade">
        <div class="shade-panel">
          <div class="shade-handle"></div>
          <div class="shade-qs-grid"></div>
          <div class="shade-slider-row">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" opacity=".7"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5v2m0 16v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M2 12h2m16 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <input type="range" min="1" max="100" value="80" class="shade-brightness">
          </div>
          <div class="shade-noti-header">
            <span>Notificaciones</span>
            <button class="shade-clear">Borrar todo</button>
          </div>
          <div class="shade-noti-list"></div>
        </div>
      </div>
    `;
    this.$statusbar = this.root.querySelector(".statusbar");
    this.$lock = this.root.querySelector("#lockscreen");
    this.$home = this.root.querySelector("#homescreen");
    this.$drawer = this.root.querySelector("#appdrawer");
    this.$appRoot = this.root.querySelector("#app-root");
    this.$homeGrid = this.root.querySelector(".app-grid");
    this.$dock = this.root.querySelector(".dock");
    this.$drawerGrid = this.root.querySelector(".drawer-grid");
    this.$weather = this.root.querySelector(".weather-widget");
    this.$searchbar = this.root.querySelector(".google-searchbar");
    this.$pageDots = this.root.querySelector(".page-dots");
    this.$navButtons = this.root.querySelector(".nav-buttons");
    this.$homeClockWidget = this.root.querySelector("#homescreen .home-widget");
    this.$shade = this.root.querySelector("#shade");
    this.$shadeQsGrid = this.root.querySelector(".shade-qs-grid");
    this.$shadeNotiList = this.root.querySelector(".shade-noti-list");
    this._notifications = [];
    this._qs = {
      wifi: true, bluetooth: false, flight: false,
      flashlight: false, rotate: false, dnd: false,
    };

    this._renderAll();
    this._renderQsGrid();
    this._renderNotiList();
    this._bindGestures();
    this._bindShade();
  }

  _renderQsGrid() {
    const TILES = [
      ["wifi", "qsWifi", "Wi-Fi"],
      ["bluetooth", "qsBluetooth", "Bluetooth"],
      ["flight", "qsFlight", "Modo avión"],
      ["flashlight", "qsFlashlight", "Linterna"],
      ["rotate", "qsRotate", "Auto-rotar"],
      ["dnd", "qsDnd", "No molestar"],
    ];
    this.$shadeQsGrid.innerHTML = "";
    TILES.forEach(([key, icon, label]) => {
      const tile = el("div", `shade-qs-tile${this._qs[key] ? " active" : ""}`);
      tile.innerHTML = `<div class="shade-qs-circle">${ICONS[icon]}</div><span class="qs-label">${label}</span>`;
      tile.addEventListener("click", () => {
        this._qs[key] = !this._qs[key];
        this._renderQsGrid();
      });
      this.$shadeQsGrid.appendChild(tile);
    });
  }

  _renderNotiList() {
    this.$shadeNotiList.innerHTML = "";
    if (!this._notifications.length) {
      this.$shadeNotiList.innerHTML = `<div class="shade-empty">Sin notificaciones</div>`;
      return;
    }
    this._notifications.slice().reverse().forEach((n) => {
      const card = el("div", "shade-noti-card");
      card.innerHTML = `
        <div class="sn-icon">${n.emoji || "🔔"}</div>
        <div class="sn-body">
          <div class="sn-app"><span>${n.app || "Notificación"}</span><span>ahora</span></div>
          ${n.title ? `<div class="sn-title">${n.title}</div>` : ""}
          ${n.text ? `<div class="sn-text">${n.text}</div>` : ""}
        </div>`;
      this.$shadeNotiList.appendChild(card);
    });
  }

  _bindShade() {
    this.$shade.addEventListener("click", (e) => {
      if (e.target === this.$shade) this.closeShade();
    });
    this.root.querySelector(".shade-clear").addEventListener("click", () => {
      this._notifications = [];
      this._renderNotiList();
    });
  }

  openShade() { this.$shade.classList.add("open"); }
  closeShade() { this.$shade.classList.remove("open"); }

  // Apps activas: las de la config (editables desde el panel) o las de fábrica.
  _appsList() {
    const list = this.config?.apps;
    return Array.isArray(list) && list.length ? list : APPS;
  }

  _iconNode(app) {
    const wrap = el("div", "app-icon-wrap");
    wrap.dataset.app = app.id;
    const badge = Number(app.badge) > 0
      ? `<span class="app-badge">${app.badge > 99 ? "99+" : app.badge}</span>`
      : "";
    let iconHtml;
    if (app.icon === "folder") {
      // Carpeta decorativa: grilla 2x2 de colores (ej. la carpeta "Google")
      const colors = app.folderColors || ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
      iconHtml = `<div class="app-icon folder-icon" style="background:${app.color || "#1f1f22"}">${colors
        .map((c) => `<span style="background:${c}"></span>`).join("")}</div>`;
    } else {
      const glyph = app.emoji
        ? `<span style="font-size:27px;line-height:1;">${app.emoji}</span>`
        : (ICONS[app.icon] || `<span style="font-size:22px;font-weight:700;">${(app.label || "?")[0].toUpperCase()}</span>`);
      iconHtml = `<div class="app-icon" style="background:${app.color || "#4b5563"}">${glyph}</div>`;
    }
    wrap.innerHTML = `${iconHtml}${badge}<div class="app-label">${app.label}</div>`;
    wrap.addEventListener("click", (e) => this._ripple(e, wrap) && this.launchApp(app.id, wrap));
    return wrap;
  }

  _renderIcons(container, list) {
    container.innerHTML = "";
    list.forEach((app) => container.appendChild(this._iconNode(app)));
  }

  _renderAll() {
    const apps = this._appsList();
    this._renderIcons(this.$homeGrid, apps.filter((a) => a.home && !a.dock));
    this._renderIcons(this.$dock, apps.filter((a) => a.dock).slice(0, 4));
    this._renderDrawer(apps);
  }

  _renderDrawer(apps = this._appsList()) {
    this.$drawerGrid.innerHTML = "";
    apps.forEach((app) => this.$drawerGrid.appendChild(this._iconNode(app)));
    const exit = el("div", "app-icon-wrap exit-icon");
    exit.innerHTML = `<div class="app-icon">${ICONS.exit}</div><div class="app-label">Salir del simulador</div>`;
    exit.addEventListener("click", () => this.onExit());
    this.$drawerGrid.appendChild(exit);
  }

  _ripple(e, container) {
    const r = document.createElement("span");
    r.className = "ripple";
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.left = (e.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2 + "px";
    r.style.top = (e.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2 + "px";
    container.style.position = "relative";
    container.appendChild(r);
    setTimeout(() => r.remove(), 500);
    return true;
  }

  applyConfig(cfg) {
    this.config = cfg;
    const d = cfg.device || {};
    this.$statusbar.querySelector(".sb-signal").innerHTML = ICONS.signal(d.signal ?? 4);
    this.$statusbar.querySelector(".sb-wifi").innerHTML = d.wifi ? ICONS.wifi : "";
    this.$statusbar.querySelector(".sb-battery").innerHTML = ICONS.battery(d.battery ?? 80);
    this.$statusbar.querySelector(".battery-pct").textContent = `${d.battery ?? 80}%`;

    // Fondo de pantalla: URL propia, o uno de los degradados prediseñados.
    const home = cfg.home || {};
    this.$home.classList.remove("wallpaper-gradient");
    if (cfg.wallpaperUrl) {
      this.$home.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.55)), url("${cfg.wallpaperUrl}")`;
      this.$home.style.backgroundSize = "cover";
      this.$home.style.backgroundPosition = "center";
    } else {
      this.$home.style.backgroundImage = "";
      if (home.wallpaperPreset === "gradient") this.$home.classList.add("wallpaper-gradient");
    }

    // Widgets y layout de la pantalla de inicio
    this.$homeClockWidget.classList.toggle("hidden", !home.showClockWidget);
    this.$searchbar.classList.toggle("show", home.showSearchBar !== false);
    this.$pageDots.classList.toggle("show", home.showPageDots !== false);
    const buttons = home.navStyle === "buttons";
    this.$navButtons.classList.toggle("show", buttons);
    this.root.classList.toggle("nav-buttons-mode", buttons);

    const w = cfg.weather || {};
    this.$weather.classList.toggle("show", !!w.enabled);
    if (w.enabled) {
      const WEATHER_EMOJI = { sun: "☀️", cloud: "☁️", rain: "🌧️", storm: "⛈️", snow: "❄️" };
      this.$weather.querySelector(".ww-icon").textContent = WEATHER_EMOJI[w.icon] || "☁️";
      this.$weather.querySelector(".ww-temp").textContent = `${w.temp ?? 20}${w.unit || "°"}`;
      this.$weather.querySelector(".ww-cond").textContent = w.condition || "";
      this.$weather.querySelector(".ww-city").textContent = w.city || "";
    }

    // Estilo de íconos: forma y tema (de color / oscuro tipo tema One UI)
    const is = cfg.iconStyle || {};
    this.root.classList.remove("icon-shape-circle", "icon-shape-square", "icon-shape-rounded");
    this.root.classList.add(`icon-shape-${is.shape || "rounded"}`);
    this.root.classList.toggle("icons-dark", is.theme === "dark");
    this._renderAll();
    this._tickClock();
  }

  // Notificación heads-up (cae desde arriba, como Android). Configurable:
  // nombre de app, emoji/inicial, título, texto. Se cierra sola o al tocarla.
  showNotification({ app = "Mensajes", emoji = "💬", title = "", text = "" } = {}) {
    this._notifications.push({ app, emoji, title, text, ts: Date.now() });
    this._renderNotiList();
    this.root.querySelector(".heads-up")?.remove();
    const node = el("div", "heads-up");
    node.innerHTML = `
      <div class="hu-icon">${emoji || (app[0] || "•").toUpperCase()}</div>
      <div class="hu-text">
        <div class="hu-app">${app} · ahora</div>
        ${title ? `<div class="hu-title">${title}</div>` : ""}
        ${text ? `<div class="hu-sub">${text}</div>` : ""}
      </div>`;
    this.root.appendChild(node);
    const close = () => {
      node.style.transition = "transform .3s cubic-bezier(.2,0,0,1), opacity .3s";
      node.style.transform = "translateY(-130%)";
      node.style.opacity = "0";
      setTimeout(() => node.remove(), 320);
    };
    node.addEventListener("click", close);
    setTimeout(() => { if (node.isConnected) close(); }, 6500);
  }

  // Fuente única de la hora para TODO el simulador. Si el panel de control
  // fijó una hora falsa, se calcula desde ese punto y sigue corriendo sola
  // (para que durante la toma el reloj avance con naturalidad).
  getNow() {
    const t = this.config?.time;
    if (t && t.enabled && t.value) {
      const [h, m] = String(t.value).split(":").map(Number);
      const base = new Date();
      base.setHours(h || 0, m || 0, 0, 0);
      const elapsed = t.setAt ? Math.max(0, Date.now() - t.setAt) : 0;
      return new Date(base.getTime() + elapsed);
    }
    return new Date();
  }

  // Fecha en texto: si el panel fijó una fecha, se muestra tal cual.
  getDateText() {
    const t = this.config?.time;
    if (t && t.enabled && t.dateText) return t.dateText;
    return fmtDate(this.getNow());
  }

  _tickClock() {
    const now = this.getNow();
    const t = fmtTime(now);
    const dt = this.getDateText();
    this.$statusbar.querySelector(".sb-time").textContent = t;
    this.$lock.querySelector(".lock-clock").textContent = t;
    this.$lock.querySelector(".lock-date").textContent = dt;
    this.$home.querySelector(".w-time").textContent = t;
    this.$home.querySelector(".w-date").textContent = dt;
  }
  _tickSeconds() {
    // hora se actualiza cada 15s arriba; acá solo mantenemos el reloj "vivo"
    // sin parpadeo innecesario en pantalla (Android tampoco muestra segundos).
  }

  goLock() {
    this.state = "lock";
    this.$lock.classList.remove("hidden");
    this.$drawer.classList.remove("open");
    this.closeShade();
  }
  goHome() {
    this.state = "home";
    this.$lock.classList.add("hidden");
    this.$drawer.classList.remove("open");
    this.closeApp();
    this.closeShade();
  }
  goDrawer() {
    this.state = "drawer";
    this.$drawer.classList.add("open");
    this.closeShade();
  }

  launchApp(id, fromEl) {
    const app = this._appsList().find((a) => a.id === id);
    this.onLaunch(id, fromEl, app?.label);
  }

  showAppWindow(node, fromEl) {
    this.$appRoot.appendChild(node);
    if (fromEl) {
      const r = fromEl.getBoundingClientRect();
      const sr = this.root.getBoundingClientRect();
      node.style.transformOrigin = `${r.left - sr.left + r.width / 2}px ${r.top - sr.top + r.height / 2}px`;
    }
    requestAnimationFrame(() => node.classList.add("open"));
  }

  closeApp() {
    this.$appRoot.querySelectorAll(".app-window").forEach((n) => n.classList.remove("open"));
    setTimeout(() => {
      this.$appRoot.innerHTML = "";
    }, 320);
  }

  // -------- Gestos táctiles -------------------------------------------
  // El gesto se resuelve DURANTE el movimiento (pointermove), no al soltar:
  // así responde aunque el navegador se trague el pointerup (pasa en varios
  // Android reales) y se siente inmediato, como el launcher de verdad.
  _bindGestures() {
    let startY = null, startX = null, startedOn = null, consumed = false;
    const THRESH = 45;

    const down = (e) => {
      startX = e.clientX; startY = e.clientY; consumed = false;
      // Deslizar hacia abajo empezando en la barra de estado (arriba de
      // todo) abre el panel de notificaciones, sin importar la pantalla.
      startedOn = e.clientY <= 34 ? "statusbar"
        : e.target.closest("#lockscreen") ? "lock"
        : e.target.closest("#appdrawer") ? "drawer"
        : e.target.closest("#homescreen") ? "home"
        : null;
    };
    const move = (e) => {
      if (startY == null || consumed || !startedOn) return;
      const dy = e.clientY - startY;
      const dx = e.clientX - startX;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > THRESH) {
        consumed = true;
        if (dy < 0) {
          if (startedOn === "lock") this.goHome();
          else if (startedOn === "home") this.goDrawer();
        } else {
          if (startedOn === "statusbar") this.openShade();
          else if (startedOn === "drawer") this.goHome();
        }
      }
    };
    const end = () => { startY = null; startedOn = null; };

    this.root.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);

    // El navegador móvil no debe hacer scroll/zoom/refresh con los dedos:
    // solo las listas internas (cajón de apps, alarmas) pueden desplazarse.
    document.addEventListener("touchmove", (e) => {
      if (!e.target.closest(".drawer-grid, .alarm-list, .shade-panel")) e.preventDefault();
    }, { passive: false });

    this.$drawer.addEventListener("click", (e) => {
      if (e.target === this.$drawer) this.goHome();
    });
  }
}

export { APPS };
