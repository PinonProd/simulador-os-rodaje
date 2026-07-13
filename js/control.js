import { createSync, isFirebaseConfigured, DEFAULT_APPS } from "./sync.js?v=5";

const $ = (id) => document.getElementById(id);
const LS_LAST = "pn_ctrl_last_session";

let sync = null;

function log(msg) {
  const line = document.createElement("div");
  const t = new Date().toLocaleTimeString("es-CL", { hour12: false });
  line.innerHTML = `<span>${t}</span> — ${msg}`;
  $("log").prepend(line);
}

function readContactForm() {
  return {
    name: $("c-name").value || "Desconocido",
    number: $("c-number").value,
    photoUrl: $("c-photo").value,
    ringtone: $("c-ringtone").value,
  };
}
function readAlarmForm() {
  return {
    time: $("a-time").value || "07:00",
    label: $("a-label").value || "Alarma",
    sound: $("a-sound").value,
    snoozeMin: Number($("a-snooze").value) || 9,
  };
}
function readDeviceForm() {
  return {
    battery: Number($("d-battery").value) || 84,
    signal: Number($("d-signal").value) || 4,
    wifi: $("d-wifi").checked,
  };
}

function readHomeForm() {
  return {
    wallpaperPreset: $("h-wallpaper-preset").value,
    navStyle: $("h-nav-style").value,
    showClockWidget: $("h-show-clock").checked,
    showSearchBar: $("h-show-search").checked,
    showPageDots: $("h-show-dots").checked,
  };
}
function readWeatherForm() {
  return {
    enabled: $("w-enabled").checked,
    temp: Number($("w-temp").value) || 20,
    unit: "°",
    icon: $("w-icon").value,
    condition: $("w-condition").value,
    city: $("w-city").value,
  };
}

function readTimeForm() {
  return {
    enabled: $("t-enabled").checked,
    value: $("t-value").value || "04:56",
    dateText: $("t-date").value || "",
    setAt: Date.now(),
  };
}

// ---- Editor de apps -------------------------------------------------------
let appsList = structuredClone(DEFAULT_APPS);

function renderAppsEditor() {
  const box = $("appsEditor");
  box.innerHTML = `
    <div class="app-row header">
      <span></span><span></span><span>Nombre</span><span>Emoji</span><span>Globo</span>
      <span style="justify-self:center;">Inicio</span><span style="justify-self:center;">Dock</span><span></span>
    </div>`;
  appsList.forEach((app, i) => {
    const row = document.createElement("div");
    row.className = "app-row";
    row.innerHTML = `
      <button class="mini up" title="Subir">▲</button>
      <button class="mini down" title="Bajar">▼</button>
      <input type="text" class="f-label" value="${(app.label || "").replace(/"/g, "&quot;")}">
      <input type="text" class="f-emoji" value="${app.emoji || ""}" maxlength="4" placeholder="auto">
      <input type="number" class="f-badge" value="${app.badge || 0}" min="0" max="999">
      <input type="checkbox" class="f-home" ${app.home ? "checked" : ""}>
      <input type="checkbox" class="f-dock" ${app.dock ? "checked" : ""}>
      <button class="mini del" title="Eliminar">✕</button>`;
    row.querySelector(".up").addEventListener("click", () => {
      if (i === 0) return;
      [appsList[i - 1], appsList[i]] = [appsList[i], appsList[i - 1]];
      renderAppsEditor();
    });
    row.querySelector(".down").addEventListener("click", () => {
      if (i === appsList.length - 1) return;
      [appsList[i + 1], appsList[i]] = [appsList[i], appsList[i + 1]];
      renderAppsEditor();
    });
    row.querySelector(".del").addEventListener("click", () => {
      appsList.splice(i, 1);
      renderAppsEditor();
    });
    row.querySelector(".f-label").addEventListener("input", (e) => { app.label = e.target.value; });
    row.querySelector(".f-emoji").addEventListener("input", (e) => { app.emoji = e.target.value; });
    row.querySelector(".f-badge").addEventListener("input", (e) => { app.badge = Number(e.target.value) || 0; });
    row.querySelector(".f-home").addEventListener("change", (e) => { app.home = e.target.checked; });
    row.querySelector(".f-dock").addEventListener("change", (e) => { app.dock = e.target.checked; });
    box.appendChild(row);
  });
}

function fillForms(cfg) {
  if (Array.isArray(cfg.apps) && cfg.apps.length) {
    appsList = structuredClone(cfg.apps);
    renderAppsEditor();
  }
  if (cfg.iconStyle) {
    $("i-shape").value = cfg.iconStyle.shape || "rounded";
    $("i-theme").value = cfg.iconStyle.theme || "color";
  }
  if (cfg.time) {
    $("t-enabled").checked = !!cfg.time.enabled;
    $("t-value").value = cfg.time.value || "04:56";
    $("t-date").value = cfg.time.dateText || "";
  }
  if (cfg.contact) {
    $("c-name").value = cfg.contact.name || "";
    $("c-number").value = cfg.contact.number || "";
    $("c-photo").value = cfg.contact.photoUrl || "";
    $("c-ringtone").value = cfg.contact.ringtone || "clasico";
  }
  if (cfg.alarm) {
    $("a-time").value = cfg.alarm.time || "07:00";
    $("a-label").value = cfg.alarm.label || "";
    $("a-sound").value = cfg.alarm.sound || "clasico";
    $("a-snooze").value = cfg.alarm.snoozeMin || 9;
  }
  if (cfg.device) {
    $("d-battery").value = cfg.device.battery ?? 84;
    $("d-signal").value = cfg.device.signal ?? 4;
    $("d-wifi").checked = !!cfg.device.wifi;
  }
  if (cfg.home) {
    $("h-wallpaper-preset").value = cfg.home.wallpaperPreset || "gradient";
    $("h-nav-style").value = cfg.home.navStyle || "gesture";
    $("h-show-clock").checked = !!cfg.home.showClockWidget;
    $("h-show-search").checked = cfg.home.showSearchBar !== false;
    $("h-show-dots").checked = cfg.home.showPageDots !== false;
  }
  if (cfg.weather) {
    $("w-enabled").checked = !!cfg.weather.enabled;
    $("w-temp").value = cfg.weather.temp ?? 31;
    $("w-icon").value = cfg.weather.icon || "storm";
    $("w-condition").value = cfg.weather.condition || "";
    $("w-city").value = cfg.weather.city || "";
  }
  $("d-wallpaper").value = cfg.wallpaperUrl || "";
}

function connect(sessionId) {
  sessionId = sessionId.trim().toUpperCase();
  if (!sessionId) return;
  localStorage.setItem(LS_LAST, sessionId);
  sync = createSync(sessionId);

  const mode = isFirebaseConfigured() ? "remoto (Firebase)" : "local (mismo navegador)";
  $("statusLabel").innerHTML = `conectado a <b>${sessionId}</b> · modo ${mode}`;

  const deviceUrl = new URL("index.html", window.location.href);
  deviceUrl.searchParams.set("s", sessionId);
  $("deviceLink").textContent = deviceUrl.toString();

  sync.onConfigChange((cfg) => fillForms(cfg));
  log(`Conectado a la sesión <b>${sessionId}</b>.`);
}

$("connectBtn").addEventListener("click", () => connect($("sessionCode").value));

$("copyLink").addEventListener("click", async () => {
  const text = $("deviceLink").textContent;
  if (!text || text.startsWith("El link")) return;
  await navigator.clipboard.writeText(text);
  log("Link del dispositivo copiado al portapapeles.");
});

$("sendNotify").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  const payload = {
    app: $("n-app").value || "Mensajes",
    emoji: $("n-emoji").value || "💬",
    title: $("n-title").value || "",
    text: $("n-text").value || "",
    sound: $("n-sound").checked,
  };
  sync.sendCommand("notify", payload);
  log(`Notificación enviada: <b>${payload.app}</b>${payload.title ? " — " + payload.title : ""}.`);
});

$("saveIconStyle").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ iconStyle: { shape: $("i-shape").value, theme: $("i-theme").value } });
  log("Estilo de íconos aplicado.");
});

$("saveApps").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ apps: appsList });
  log(`Apps guardadas (${appsList.length}).`);
});

$("addApp").addEventListener("click", () => {
  appsList.push({
    id: `custom-${Date.now()}`,
    label: "Nueva app", icon: "", emoji: "⭐", color: "#4b5563",
    badge: 0, home: true, dock: false,
  });
  renderAppsEditor();
});

$("saveHome").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ home: readHomeForm() });
  log("Pantalla de inicio guardada.");
});

$("saveWeather").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ weather: readWeatherForm() });
  log("Widget de clima guardado.");
});

$("applyTime").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  const t = readTimeForm();
  sync.setConfig({ time: t });
  log(t.enabled
    ? `Hora falsa aplicada: <b>${t.value}</b>${t.dateText ? ` (${t.dateText})` : ""}.`
    : "Hora falsa desactivada: el celular vuelve a la hora real.");
});

$("saveContact").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ contact: readContactForm() });
  log("Contacto guardado.");
});
$("saveAlarm").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ alarm: readAlarmForm() });
  log("Configuración de alarma guardada.");
});
$("saveDevice").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.setConfig({ device: readDeviceForm(), wallpaperUrl: $("d-wallpaper").value });
  log("Estado del dispositivo guardado.");
});

$("callNow").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.sendCommand("incoming_call", readContactForm());
  log("Comando enviado: <b>llamada entrante</b>.");
});
$("endCall").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.sendCommand("end_call");
  log("Comando enviado: <b>terminar llamada</b>.");
});
$("fireAlarm").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.sendCommand("fire_alarm", readAlarmForm());
  log("Comando enviado: <b>sonar alarma</b>.");
});
$("dismissAlarm").addEventListener("click", () => {
  if (!sync) return log("Conéctate primero a una sesión.");
  sync.sendCommand("dismiss_alarm");
  log("Comando enviado: <b>detener alarma</b>.");
});

renderAppsEditor();

const last = localStorage.getItem(LS_LAST);
if (last) {
  $("sessionCode").value = last;
  connect(last);
} else {
  log("Ingresa el código de sesión que muestra el celular y presiona Conectar.");
}
