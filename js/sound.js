// ============================================================================
// SONIDOS — generados con Web Audio API (osciladores), sin archivos externos.
// Expone play/stop para "tono de llamada" y "alarma", con varias variantes.
// ============================================================================

let ctx = null;
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

class LoopingTone {
  constructor(patternFn) {
    this.patternFn = patternFn;
    this._stopped = true;
    this._timer = null;
  }

  start() {
    this._stopped = false;
    const loop = () => {
      if (this._stopped) return;
      const duration = this.patternFn(getCtx());
      this._timer = setTimeout(loop, duration);
    };
    loop();
  }

  stop() {
    this._stopped = true;
    clearTimeout(this._timer);
  }
}

function tone(c, freq, startAt, dur, gainPeak = 0.18, type = "sine") {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(c.destination);
  const t0 = c.currentTime + startAt;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(gainPeak, t0 + 0.02);
  gain.gain.linearRampToValueAtTime(0, t0 + dur);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

// --- Tonos de llamada (ringtones) ---------------------------------------
const RINGTONES = {
  clasico(c) {
    // Dos tonos alternados estilo "ring-ring" clásico de teléfono.
    tone(c, 950, 0, 0.4, 0.16);
    tone(c, 1050, 0.4, 0.4, 0.16);
    return 2000;
  },
  marimba(c) {
    [0, 0.15, 0.3, 0.55].forEach((t, i) =>
      tone(c, [523, 659, 784, 659][i], t, 0.3, 0.14, "triangle")
    );
    return 1800;
  },
  suave(c) {
    tone(c, 440, 0, 0.6, 0.12, "sine");
    tone(c, 660, 0.6, 0.6, 0.12, "sine");
    return 2200;
  },
};

// --- Sonidos de alarma ----------------------------------------------------
const ALARMS = {
  clasico(c) {
    for (let i = 0; i < 4; i++) tone(c, 880, i * 0.22, 0.15, 0.2, "square");
    return 1400;
  },
  suave(c) {
    tone(c, 523, 0, 0.5, 0.15, "sine");
    tone(c, 659, 0.5, 0.5, 0.15, "sine");
    return 1600;
  },
  urgente(c) {
    for (let i = 0; i < 6; i++) tone(c, 1200, i * 0.12, 0.08, 0.22, "square");
    return 900;
  },
};

let current = null;

export function playRingtone(name = "clasico") {
  stopAll();
  const fn = RINGTONES[name] || RINGTONES.clasico;
  current = new LoopingTone(fn);
  current.start();
}

export function playAlarm(name = "clasico") {
  stopAll();
  const fn = ALARMS[name] || ALARMS.clasico;
  current = new LoopingTone(fn);
  current.start();
}

export function stopAll() {
  if (current) {
    current.stop();
    current = null;
  }
}

// "Ding" corto de notificación (no en bucle, no interrumpe llamada/alarma)
export function playDing() {
  const c = getCtx();
  tone(c, 880, 0, 0.12, 0.16, "sine");
  tone(c, 1318, 0.1, 0.28, 0.13, "sine");
}

export const RINGTONE_NAMES = Object.keys(RINGTONES);
export const ALARM_SOUND_NAMES = Object.keys(ALARMS);
