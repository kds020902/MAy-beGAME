/*
 * 오푸스덜스 — 효과음
 * 외부 파일 없이 WebAudio 로 합성한다. 브라우저 정책상 첫 입력 뒤에 소리가 난다.
 *   SFX.play('clash' | 'hit' | 'heavy' | 'guard' | 'evade' | 'card' | 'draw' | 'click' | 'coin' | 'heal' | 'win' | 'lose' | 'boss' | 'potion')
 *   SFX.muted / SFX.setMuted(bool)
 */
(function (root) {
  'use strict';
  let ctx = null;
  let master = null;
  let muted = false;

  function ensure() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
    return true;
  }

  // 기본 음: 파형, 시작/끝 주파수, 길이, 음량
  function tone(type, f0, f1, dur, vol, delay) {
    const t = ctx.currentTime + (delay || 0);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
  // 잡음: 타격감, 금속음
  function noise(dur, vol, hp, delay) {
    const t = ctx.currentTime + (delay || 0);
    const n = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = hp ? 'highpass' : 'lowpass';
    f.frequency.value = hp || 900;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t);
  }

  const SOUNDS = {
    clash() { noise(0.12, 0.5, 2400); tone('square', 900, 300, 0.09, 0.18); tone('sawtooth', 1400, 500, 0.12, 0.1, 0.02); },
    hit() { noise(0.1, 0.45); tone('triangle', 200, 60, 0.14, 0.35); },
    heavy() { noise(0.18, 0.6); tone('triangle', 120, 35, 0.26, 0.5); tone('sine', 60, 30, 0.3, 0.4); },
    guard() { tone('sine', 700, 1100, 0.12, 0.2); tone('triangle', 500, 900, 0.16, 0.15, 0.03); },
    evade() { tone('sine', 300, 1200, 0.16, 0.15); },
    card() { noise(0.05, 0.25, 3000); tone('sine', 500, 650, 0.06, 0.12); },
    draw() { noise(0.04, 0.2, 2500); },
    click() { tone('sine', 600, 480, 0.05, 0.12); },
    coin() { tone('sine', 1400, 1400, 0.08, 0.15); tone('sine', 1900, 1900, 0.12, 0.12, 0.06); },
    heal() { tone('sine', 500, 900, 0.25, 0.14); tone('sine', 750, 1200, 0.3, 0.1, 0.08); },
    potion() { tone('sine', 400, 700, 0.1, 0.14); noise(0.08, 0.15, 1800, 0.05); },
    win() { [523, 659, 784, 1047].forEach((f, i) => tone('triangle', f, f, 0.35, 0.18, i * 0.11)); },
    lose() { [330, 262, 196, 147].forEach((f, i) => tone('sawtooth', f, f * 0.9, 0.4, 0.14, i * 0.16)); },
    boss() { tone('sawtooth', 70, 50, 0.9, 0.3); tone('sawtooth', 105, 75, 0.9, 0.2, 0.02); noise(0.5, 0.3, null, 0.1); },
  };

  const SFX = {
    get muted() { return muted; },
    setMuted(v) { muted = !!v; },
    play(name) {
      if (muted || !SOUNDS[name]) return;
      try { if (ensure()) SOUNDS[name](); } catch (e) { /* 오디오 불가 환경 */ }
    },
    unlock() { try { ensure(); } catch (e) { /* 무시 */ } },
  };
  root.SFX = SFX;
})(window);
