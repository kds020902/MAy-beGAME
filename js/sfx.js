/*
 * 오푸스덜스 — 효과음
 * 녹음된 효과음(Kenney Impact Sounds · RPG Audio · Interface Sounds, CC0)을 쓰고,
 * 불러오지 못한 환경에서는 WebAudio 합성음으로 대신한다. 브라우저 정책상 첫 입력 뒤에 소리가 난다.
 *   SFX.play(name, { vol })
 *     전투: 'clash' 합 · 'swing' 휘두름 · 'slash' / 'pierce' / 'blunt' 종류별 적중 · 'heavy' 강타
 *           'guard' 방어 · 'evade' 회피 · 'slide' 밀려남
 *     그 외: 'card' · 'draw' · 'click' · 'coin' · 'heal' · 'potion' · 'win' · 'lose' · 'boss'
 *   SFX.muted / SFX.setMuted(bool)
 */
(function (root) {
  'use strict';
  let ctx = null;
  let master = null;   // 합성음 버스
  let sampleBus = null; // 녹음 효과음 버스
  let muted = false;
  const BASE = root.FFD_SFX_BASE || 'assets/sfx/';
  // file:// 로 열면 fetch 가 막혀 있으므로 <audio> 요소로 재생한다
  const useElements = root.location && root.location.protocol === 'file:';

  function ensure() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
    sampleBus = ctx.createGain();
    sampleBus.gain.value = 0.6;
    sampleBus.connect(ctx.destination);
    loadAll();
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


  // ───────── 녹음 효과음 ─────────
  // 파일 이름 → 디코딩된 버퍼(또는 <audio> 원본)
  const FILES = ['clash1', 'clash2', 'clash3', 'slash1', 'slash2', 'slash3', 'pierce1', 'pierce2', 'pierce3',
    'blunt1', 'blunt2', 'blunt3', 'crunch1', 'crunch2', 'guard1', 'guard2', 'guard3', 'whoosh1', 'whoosh2', 'whoosh3',
    'slide1', 'slide2', 'slide3', 'card1', 'card2', 'card3', 'draw1', 'draw2', 'coin1', 'coin2', 'glass1', 'glass2',
    'bell1', 'click1', 'click2'];
  const buffers = {};
  let loading = false;
  function loadAll() {
    if (loading) return;
    loading = true;
    FILES.forEach(name => {
      const url = BASE + name + '.mp3';
      if (useElements) {
        const a = new Audio();
        a.preload = 'auto';
        a.src = url;
        a.addEventListener('canplaythrough', () => { buffers[name] = a; }, { once: true });
        return;
      }
      fetch(url).then(r => (r.ok ? r.arrayBuffer() : Promise.reject(r.status)))
        .then(ab => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)))
        .then(buf => { buffers[name] = buf; })
        .catch(() => { /* 없으면 합성음으로 */ });
    });
  }
  const pickOne = list => list[Math.floor(Math.random() * list.length)];
  // 녹음 효과음 하나 재생. 성공하면 true
  function sample(names, o) {
    o = o || {};
    const ready = names.filter(n => buffers[n]);
    if (!ready.length) return false;
    const name = pickOne(ready);
    const rate = (o.rate || 1) * (1 + (Math.random() - 0.5) * 0.12); // 매번 조금씩 다른 높이
    const vol = Math.max(0, Math.min(1.5, (o.gain == null ? 1 : o.gain)));
    const delay = o.delay || 0;
    const buf = buffers[name];
    if (buf instanceof AudioBuffer) {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = rate;
      const g = ctx.createGain();
      g.gain.value = vol;
      src.connect(g).connect(sampleBus);
      src.start(ctx.currentTime + delay);
      return true;
    }
    const play = () => {
      const a = buf.cloneNode();
      a.preservesPitch = false;
      a.mozPreservesPitch = false;
      a.webkitPreservesPitch = false;
      a.playbackRate = rate;
      a.volume = Math.min(1, vol * 0.6);
      a.play().catch(() => {});
    };
    if (delay) setTimeout(play, delay * 1000); else play();
    return true;
  }

  // 효과음 정의: 녹음이 있으면 녹음(필요하면 합성음을 살짝 섞는다), 없으면 합성음
  const SAMPLED = {
    clash(v) {
      if (!sample(['clash1', 'clash2', 'clash3'], { gain: 0.9 * v })) return false;
      noise(0.06, 0.18 * v, 3200); // 불꽃 튀는 고음
      return true;
    },
    swing(v) { return sample(['whoosh1', 'whoosh2', 'whoosh3'], { gain: 0.55 * v, rate: 1.35 }); },
    slash(v) {
      if (!sample(['slash1', 'slash2', 'slash3'], { gain: 0.9 * v })) return false;
      sample(['blunt1', 'blunt2', 'blunt3'], { gain: 0.3 * v, rate: 1.35 }); // 베는 소리에 무게를 더한다
      return true;
    },
    pierce(v) {
      if (!sample(['pierce1', 'pierce2', 'pierce3'], { gain: 0.85 * v, rate: 1.2 })) return false;
      sample(['slash3'], { gain: 0.35 * v, rate: 1.6 });
      return true;
    },
    blunt(v) { return sample(['blunt1', 'blunt2', 'blunt3'], { gain: 0.95 * v, rate: 0.95 }); },
    hit(v) { return SAMPLED.blunt(v); },
    heavy(v) {
      if (!sample(['blunt1', 'blunt2', 'blunt3'], { gain: 1.0 * v, rate: 0.78 })) return false;
      sample(['crunch1', 'crunch2'], { gain: 0.55 * v });
      tone('sine', 70, 32, 0.32, 0.35 * v); // 묵직한 저음
      return true;
    },
    guard(v) { return sample(['guard1', 'guard2', 'guard3'], { gain: 0.8 * v }); },
    evade(v) { return sample(['whoosh1', 'whoosh2', 'whoosh3'], { gain: 0.7 * v, rate: 1.7 }); },
    slide(v) {
      // 발이 바닥을 긁으며 밀려나는 소리: 짧은 마찰음을 두 번
      if (!sample(['slide1', 'slide2', 'slide3'], { gain: 0.55 * v, rate: 0.8 })) return false;
      sample(['slide1', 'slide2', 'slide3'], { gain: 0.4 * v, rate: 0.72, delay: 0.075 });
      return true;
    },
    card(v) { return sample(['card1', 'card2', 'card3'], { gain: 0.45 * v, rate: 1.15 }); },
    draw(v) { return sample(['draw1', 'draw2'], { gain: 0.5 * v, rate: 1.1 }); },
    click(v) { return sample(['click1', 'click2'], { gain: 0.45 * v }); },
    coin(v) { return sample(['coin1', 'coin2'], { gain: 0.9 * v }); },
    potion(v) {
      if (!sample(['glass1', 'glass2'], { gain: 0.6 * v })) return false;
      tone('sine', 400, 700, 0.12, 0.1 * v, 0.05);
      return true;
    },
    boss(v) {
      if (!sample(['bell1'], { gain: 0.9 * v, rate: 0.7 })) return false;
      tone('sawtooth', 70, 50, 0.9, 0.2 * v);
      return true;
    },
  };

  // ───────── 합성음 (녹음이 없을 때, 또는 음악적인 효과) ─────────
  const SOUNDS = {
    clash() { noise(0.12, 0.5, 2400); tone('square', 900, 300, 0.09, 0.18); tone('sawtooth', 1400, 500, 0.12, 0.1, 0.02); },
    slash() { noise(0.1, 0.45, 1800); tone('triangle', 260, 80, 0.12, 0.3); },
    pierce() { noise(0.07, 0.4, 2600); tone('triangle', 320, 90, 0.1, 0.3); },
    blunt() { noise(0.12, 0.5); tone('triangle', 160, 50, 0.16, 0.4); },
    swing() { noise(0.12, 0.12, 1200); },
    slide() { noise(0.16, 0.18, 500); },
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
    play(name, opts) {
      if (muted) return;
      const v = (opts && opts.vol != null) ? opts.vol : 1;
      try {
        if (!ensure()) return;
        if (SAMPLED[name] && SAMPLED[name](v)) return;
        if (SOUNDS[name]) SOUNDS[name](v);
      } catch (e) { /* 오디오 불가 환경 */ }
    },
    unlock() { try { ensure(); } catch (e) { /* 무시 */ } },
    // 불러온 녹음 효과음 수 (확인용)
    get loaded() { return Object.keys(buffers).length; },
  };
  root.SFX = SFX;
})(window);
