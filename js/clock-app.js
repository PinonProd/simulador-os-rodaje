// ============================================================================
// APP RELOJ — alarmas: crear/editar/activar en el propio celular (para que
// se vea al personaje configurando una alarma en cámara) + disparo instantáneo
// vía control remoto (para no tener que esperar la hora real en el rodaje).
// ============================================================================

import { playAlarm, stopAll } from "./sound.js?v=3";

const LS_ALARMS = "pn_sim_alarms";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function loadAlarms() {
  try {
    return JSON.parse(localStorage.getItem(LS_ALARMS)) || [];
  } catch {
    return [];
  }
}
function saveAlarms(list) {
  localStorage.setItem(LS_ALARMS, JSON.stringify(list));
}
function fmtNice(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "a. m." : "p. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return { big: `${h12}:${String(m).padStart(2, "0")}`, period };
}

export class ClockApp {
  constructor(os, getConfig) {
    this.os = os;
    this.getConfig = getConfig;
    this.alarms = loadAlarms();
    this.firing = false;
    this._lastCheckedMinute = null;
    setInterval(() => this._checkAlarms(), 15000);
  }

  open(fromEl) {
    const node = document.createElement("div");
    node.className = "app-window";
    node.innerHTML = `
      <div class="clock-app">
        <div class="clock-header"><span>Alarmas</span><div class="add-btn">+</div></div>
        <div class="alarm-list"></div>
      </div>
      <div class="editor-sheet"></div>
    `;
    this.os.showAppWindow(node, fromEl);
    this._node = node;
    this._renderList();
    node.querySelector(".add-btn").addEventListener("click", () => this._openEditor());

    const backHint = document.createElement("div");
    backHint.style.cssText = "position:absolute;top:0;left:0;right:0;height:46px;";
    backHint.addEventListener("dblclick", () => this.os.closeApp());
    node.appendChild(backHint);
  }

  _renderList() {
    const list = this._node.querySelector(".alarm-list");
    if (!this.alarms.length) {
      list.innerHTML = `<div class="alarm-empty">Sin alarmas. Toca "+" para crear una.</div>`;
      return;
    }
    list.innerHTML = "";
    this.alarms
      .slice()
      .sort((a, b) => a.time.localeCompare(b.time))
      .forEach((alarm) => {
        const { big, period } = fmtNice(alarm.time);
        const row = document.createElement("div");
        row.className = `alarm-row${alarm.enabled ? "" : " disabled"}`;
        row.innerHTML = `
          <div>
            <div class="a-time">${big} <span style="font-size:15px;">${period}</span></div>
            <div class="a-label">${alarm.label || "Alarma"}</div>
          </div>
          <div class="switch ${alarm.enabled ? "on" : ""}"><div class="knob"></div></div>
        `;
        row.querySelector(".switch").addEventListener("click", (e) => {
          e.stopPropagation();
          alarm.enabled = !alarm.enabled;
          saveAlarms(this.alarms);
          this._renderList();
        });
        row.addEventListener("click", () => this._openEditor(alarm));
        list.appendChild(row);
      });
  }

  _openEditor(alarm) {
    const sheet = this._node.querySelector(".editor-sheet");
    const isNew = !alarm;
    const draft = alarm ? { ...alarm } : { id: uid(), time: "07:00", label: "Despertar", sound: "clasico", enabled: true };
    sheet.innerHTML = `
      <h3>${isNew ? "Nueva alarma" : "Editar alarma"}</h3>
      <div class="editor-row"><label>Hora</label><input type="time" value="${draft.time}" class="f-time"></div>
      <div class="editor-row"><label>Etiqueta</label><input type="text" value="${draft.label}" class="f-label"></div>
      <div class="editor-row"><label>Sonido</label>
        <select class="f-sound">
          <option value="clasico" ${draft.sound === "clasico" ? "selected" : ""}>Clásico</option>
          <option value="suave" ${draft.sound === "suave" ? "selected" : ""}>Suave</option>
          <option value="urgente" ${draft.sound === "urgente" ? "selected" : ""}>Urgente</option>
        </select>
      </div>
      <div class="editor-actions">
        ${!isNew ? '<button class="del">Eliminar</button>' : "<span></span>"}
        <button class="cancel">Cancelar</button>
        <button class="save">Guardar</button>
      </div>
    `;
    sheet.classList.add("open");
    sheet.querySelector(".cancel").addEventListener("click", () => sheet.classList.remove("open"));
    sheet.querySelector(".save").addEventListener("click", () => {
      draft.time = sheet.querySelector(".f-time").value || draft.time;
      draft.label = sheet.querySelector(".f-label").value || "Alarma";
      draft.sound = sheet.querySelector(".f-sound").value;
      const idx = this.alarms.findIndex((a) => a.id === draft.id);
      if (idx >= 0) this.alarms[idx] = draft;
      else this.alarms.push(draft);
      saveAlarms(this.alarms);
      this._renderList();
      sheet.classList.remove("open");
    });
    sheet.querySelector(".del")?.addEventListener("click", () => {
      this.alarms = this.alarms.filter((a) => a.id !== draft.id);
      saveAlarms(this.alarms);
      this._renderList();
      sheet.classList.remove("open");
    });
  }

  _checkAlarms() {
    if (this.firing) return;
    // Usa la hora del simulador (puede ser la falsa fijada desde el panel):
    // si en la ficción son las 04:56 y el personaje puso alarma a las 05:00,
    // debe sonar a las 05:00 ficticias, no a la hora real.
    const now = this.os.getNow();
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    if (hhmm === this._lastCheckedMinute) return;
    this._lastCheckedMinute = hhmm;
    const due = this.alarms.find((a) => a.enabled && a.time === hhmm);
    if (due) this.fire(due);
  }

  // Disparo instantáneo (botón del actor tocando "listo" en un ensayo, o
  // comando remoto desde control.html) — no depende de la hora real.
  fire(overridePayload = {}) {
    if (this.firing) return;
    this.firing = true;
    const cfg = this.getConfig();
    const alarm = { ...cfg.alarm, ...overridePayload };
    playAlarm(alarm.sound || "clasico");

    const now = this.os.getNow();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    let snoozeMin = Number(alarm.snoozeMin) || 5;

    const node = document.createElement("div");
    node.className = "app-window open";
    node.style.zIndex = "800"; // sobre la status bar: la alarma ocupa todo, como One UI
    node.innerHTML = `
      <div class="alarm-fire-screen">
        <div class="af-clock"><div>${hh}</div><div>${mm}</div></div>
        <div class="af-date">${this.os.getDateText()}</div>
        <div class="af-label">${alarm.label || "Alarma"}</div>
        <button class="af-dismiss" aria-label="Detener">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
        <div class="af-bottom">
          <button class="af-adj minus">−</button>
          <button class="af-snooze">Aplazar ${snoozeMin} min</button>
          <button class="af-adj plus">+</button>
        </div>
      </div>`;
    this.os.$appRoot.appendChild(node);
    node.querySelector(".af-dismiss").addEventListener("click", () => this.dismiss());
    node.querySelector(".af-snooze").addEventListener("click", () =>
      this.snooze({ ...alarm, snoozeMin })
    );
    const snoozeBtn = node.querySelector(".af-snooze");
    node.querySelector(".af-adj.minus").addEventListener("click", () => {
      snoozeMin = Math.max(5, snoozeMin - 5);
      snoozeBtn.textContent = `Aplazar ${snoozeMin} min`;
    });
    node.querySelector(".af-adj.plus").addEventListener("click", () => {
      snoozeMin = Math.min(30, snoozeMin + 5);
      snoozeBtn.textContent = `Aplazar ${snoozeMin} min`;
    });
    this._fireNode = node;
  }

  dismiss() {
    stopAll();
    this._fireNode?.remove();
    this._fireNode = null;
    this.firing = false;
  }

  snooze(alarm) {
    stopAll();
    this._fireNode?.remove();
    this._fireNode = null;
    this.firing = false;
    const mins = alarm.snoozeMin || 5;
    setTimeout(() => this.fire(alarm), mins * 60000);
  }
}
