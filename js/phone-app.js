// ============================================================================
// APP TELÉFONO — llamada entrante / en curso, 100% configurable por control
// remoto (nombre, foto, número, tono). Se muestra a pantalla completa por
// encima de cualquier pantalla (bloqueo, inicio, cajón) igual que Android.
// ============================================================================

import { ICONS } from "./os.js?v=4";
import { playRingtone, stopAll } from "./sound.js?v=4";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export class PhoneApp {
  constructor(os, getConfig) {
    this.os = os;
    this.getConfig = getConfig;
    this.active = false;
    this.timer = null;
  }

  // Ícono "Teléfono" tocado a mano en el propio celular: pantalla simple,
  // sin funcionalidad real de marcar (esto es un simulador de utilería).
  open(fromEl) {
    const node = document.createElement("div");
    node.className = "app-window";
    node.innerHTML = `
      <div class="statusbar" style="position:relative;height:56px;"></div>
      <div style="padding: 40px 24px; text-align:center; opacity:.55; font-size:14px;">
        Sin llamadas recientes
      </div>`;
    this.os.showAppWindow(node, fromEl);
    node.addEventListener("click", () => this.os.closeApp());
  }

  incomingCall(overridePayload = {}) {
    if (this.active) return;
    this.active = true;
    const cfg = this.getConfig();
    const contact = { ...cfg.contact, ...overridePayload };
    playRingtone(contact.ringtone || "clasico");

    const node = document.createElement("div");
    node.className = "app-window open";
    node.innerHTML = `
      <div class="call-screen">
        ${contact.photoUrl
          ? `<div class="call-avatar" style="background-image:url('${contact.photoUrl}')"></div>`
          : `<div class="call-avatar">${initials(contact.name)}</div>`}
        <div class="call-name">${contact.name || "Desconocido"}</div>
        <div class="call-sub">${contact.number || "Móvil"} · llamando…</div>
        <div class="call-actions">
          <button class="call-btn decline" aria-label="Rechazar">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" style="transform:rotate(135deg)">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/>
            </svg>
          </button>
          <button class="call-btn accept" aria-label="Contestar">${ICONS.phone}</button>
        </div>
        <div class="call-hint">Toque para responder o rechazar</div>
      </div>`;
    this.os.$appRoot.appendChild(node);
    node.querySelector(".decline").addEventListener("click", () => this.endCall());
    node.querySelector(".accept").addEventListener("click", () => this._answer(node, contact));
    this._ringingNode = node;
  }

  _answer(ringingNode, contact) {
    stopAll();
    ringingNode.remove();

    const node = document.createElement("div");
    node.className = "app-window open";
    const opts = [
      ["keypad", "Teclado"],
      ["micOn", "Silenciar"],
      ["speaker", "Altavoz"],
      ["addcall", "Añadir"],
      ["video", "Video"],
      ["more", "Más"],
    ];
    node.innerHTML = `
      <div class="incall-screen">
        ${contact.photoUrl
          ? `<div class="call-avatar" style="background-image:url('${contact.photoUrl}')"></div>`
          : `<div class="call-avatar">${initials(contact.name)}</div>`}
        <div class="call-name">${contact.name || "Desconocido"}</div>
        <div class="incall-timer">00:00</div>
        <div class="incall-grid">
          ${opts.map(([icon, label]) => `
            <div class="incall-opt" data-opt="${icon}">
              <div class="circ">${ICONS[icon]}</div><span>${label}</span>
            </div>`).join("")}
        </div>
        <div class="end-call-wrap">
          <button class="call-btn decline" aria-label="Terminar llamada">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" style="transform:rotate(135deg)">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"/>
            </svg>
          </button>
        </div>
      </div>`;
    this.os.$appRoot.appendChild(node);
    node.querySelectorAll(".incall-opt").forEach((o) =>
      o.addEventListener("click", () => o.classList.toggle("active"))
    );
    node.querySelector(".decline").addEventListener("click", () => this.endCall());

    let secs = 0;
    const timerEl = node.querySelector(".incall-timer");
    this.timer = setInterval(() => {
      secs++;
      const m = String(Math.floor(secs / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      timerEl.textContent = `${m}:${s}`;
    }, 1000);
    this._inCallNode = node;
  }

  endCall() {
    stopAll();
    clearInterval(this.timer);
    this.timer = null;
    this._ringingNode?.remove();
    this._inCallNode?.remove();
    this._ringingNode = null;
    this._inCallNode = null;
    this.active = false;
  }
}
