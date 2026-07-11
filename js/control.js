import { createSync, isFirebaseConfigured } from "./sync.js";

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

function readTimeForm() {
  return {
    enabled: $("t-enabled").checked,
    value: $("t-value").value || "04:56",
    dateText: $("t-date").value || "",
    setAt: Date.now(),
  };
}

function fillForms(cfg) {
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

const last = localStorage.getItem(LS_LAST);
if (last) {
  $("sessionCode").value = last;
  connect(last);
} else {
  log("Ingresa el código de sesión que muestra el celular y presiona Conectar.");
}
