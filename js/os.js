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
};

const APPS = [
  { id: "phone", label: "Teléfono", icon: "phone", color: "#2fbf59" },
  { id: "message", label: "Mensajes", icon: "message", color: "#3b82f6" },
  { id: "camera", label: "Cámara", icon: "camera", color: "#6b7280" },
  { id: "clock", label: "Reloj", icon: "clock", color: "#374151" },
  { id: "settings", label: "Ajustes", icon: "settings", color: "#5f6368" },
  { id: "gallery", label: "Fotos", icon: "gallery", color: "#f59e0b" },
  { id: "browser", label: "Navegador", icon: "browser", color: "#4285f4" },
  { id: "calculator", label: "Calculadora", icon: "calculator", color: "#4b5563" },
  { id: "calendar", label: "Calendario", icon: "calendar", color: "#1a73e8" },
  { id: "maps", label: "Mapas", icon: "maps", color: "#34a853" },
  { id: "mail", label: "Correo", icon: "mail", color: "#ea4335" },
  { id: "store", label: "Tienda", icon: "store", color: "#0f9d58" },
];
const DOCK_IDS = ["phone", "message", "camera", "clock"];

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
        <div class="home-widget"><div class="w-time"></div><div class="w-date"></div></div>
        <div class="app-grid"></div>
        <div class="dock"></div>
      </div>
      <div id="appdrawer" class="pane">
        <div class="drawer-search">🔍 Buscar en el teléfono</div>
        <div class="drawer-grid"></div>
      </div>
      <div id="app-root"></div>
      <div class="gesture-pill"></div>
    `;
    this.$statusbar = this.root.querySelector(".statusbar");
    this.$lock = this.root.querySelector("#lockscreen");
    this.$home = this.root.querySelector("#homescreen");
    this.$drawer = this.root.querySelector("#appdrawer");
    this.$appRoot = this.root.querySelector("#app-root");
    this.$homeGrid = this.root.querySelector(".app-grid");
    this.$dock = this.root.querySelector(".dock");
    this.$drawerGrid = this.root.querySelector(".drawer-grid");

    this._renderIcons(this.$homeGrid, APPS.filter((a) => !DOCK_IDS.includes(a.id)));
    this._renderIcons(this.$dock, APPS.filter((a) => DOCK_IDS.includes(a.id)));
    this._renderDrawer();
    this._bindGestures();
  }

  _iconNode(app) {
    const wrap = el("div", "app-icon-wrap");
    wrap.dataset.app = app.id;
    wrap.innerHTML = `<div class="app-icon" style="background:${app.color}">${ICONS[app.icon]}</div><div class="app-label">${app.label}</div>`;
    wrap.addEventListener("click", (e) => this._ripple(e, wrap) && this.launchApp(app.id, wrap));
    return wrap;
  }

  _renderIcons(container, list) {
    container.innerHTML = "";
    list.forEach((app) => container.appendChild(this._iconNode(app)));
  }

  _renderDrawer() {
    this.$drawerGrid.innerHTML = "";
    APPS.forEach((app) => this.$drawerGrid.appendChild(this._iconNode(app)));
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
    if (cfg.wallpaperUrl) {
      this.$home.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.55)), url("${cfg.wallpaperUrl}")`;
      this.$home.style.backgroundSize = "cover";
      this.$home.style.backgroundPosition = "center";
    }
  }

  _tickClock() {
    const now = new Date();
    const t = fmtTime(now);
    const dt = fmtDate(now);
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
  }
  goHome() {
    this.state = "home";
    this.$lock.classList.add("hidden");
    this.$drawer.classList.remove("open");
    this.closeApp();
  }
  goDrawer() {
    this.state = "drawer";
    this.$drawer.classList.add("open");
  }

  launchApp(id, fromEl) {
    this.onLaunch(id, fromEl);
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
      startedOn = e.target.closest("#lockscreen") ? "lock"
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
          if (startedOn === "drawer") this.goHome();
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
      if (!e.target.closest(".drawer-grid, .alarm-list")) e.preventDefault();
    }, { passive: false });

    this.$drawer.addEventListener("click", (e) => {
      if (e.target === this.$drawer) this.goHome();
    });
  }
}

export { APPS };
