// app.js — 장면 구성, 카메라, 입자, 라벨, 상호작용, UI
(function () {
  'use strict';
  // 지금 보이는 지도의 크기(지도를 바꿀 때마다 갱신)
  let W = VX.W, D = VX.D, H = VX.H;
  const $ = s => document.querySelector(s);
  const stage = $('#stage'), canvas = $('#view'), pins = $('#pins'), tip = $('#tip');
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem('f5map2.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('f5map2.' + k, JSON.stringify(v)); } catch (e) { /* 저장소 없음 */ } },
  };

  // ───── 소리: 전체·음악·환경음·효과음 버스, 지연 로딩·해독 캐시, 첫 입력에 깨우기 ─────
  // window.AUDIO(audio/manifest.js)가 없거나 열쇠·파일이 없으면 조용히 넘어간다(절대 throw하지 않음)
  const SND = (function () {
    const KINDS = ['bgm', 'amb', 'sfx'];
    const DEF = { bgm: 0.35, amb: 0.5, sfx: 0.8, mute: false };
    const vol = Object.assign({}, DEF);
    (function () { const s = store.get('audio', null); if (s && typeof s === 'object') for (const k in DEF) if (typeof s[k] === typeof DEF[k]) vol[k] = s[k]; })();
    const log = [];
    const note = o => { o.t = Math.round(performance.now()); log.push(o); if (log.length > 400) log.splice(0, log.length - 400); };
    const lib = kind => { const A = window.AUDIO; return A && A[kind] && typeof A[kind] === 'object' ? A[kind] : {}; };
    function urlOf(kind, key) {
      let u = key ? lib(kind)[key] : null;
      if (Array.isArray(u)) u = u.length ? u[Math.floor(Math.random() * u.length)] : null;
      return typeof u === 'string' && u ? u : null;
    }
    const clamp01 = x => Math.max(0, Math.min(1, x));
    const AC = window.AudioContext || window.webkitAudioContext;
    let ctx = null, master = null, unlocked = false, panOK = false, live = 0;
    const bus = {};
    function ensure() {
      if (ctx || !AC) return ctx;
      try { ctx = new AC(); } catch (e) { ctx = null; return null; }
      master = ctx.createGain(); master.connect(ctx.destination);
      KINDS.forEach(k => { bus[k] = ctx.createGain(); bus[k].connect(master); });
      panOK = typeof ctx.createStereoPanner === 'function';
      applyVol();
      return ctx;
    }
    const lvl = kind => vol.mute ? 0 : vol[kind];
    function applyVol() {
      voices.forEach(v => { if (v.el) v.el.volume = clamp01(v.cur * lvl(v.kind)); });
      if (!ctx) return;
      const now = ctx.currentTime;
      try {
        master.gain.setTargetAtTime(vol.mute ? 0 : 1, now, 0.04);
        KINDS.forEach(k => bus[k].gain.setTargetAtTime(vol[k], now, 0.04));
      } catch (e) { /* 무시 */ }
    }

    // 파일 → ArrayBuffer: fetch가 안 되는 file:// 에서는 XHR, 그것도 안 되면 <audio> 요소로 재생
    function fetchAB(url) {
      const xhr = () => new Promise((res, rej) => {
        try {
          const x = new XMLHttpRequest();
          x.open('GET', url); x.responseType = 'arraybuffer';
          x.onload = () => (x.status === 200 || (x.status === 0 && x.response && x.response.byteLength)) ? res(x.response) : rej(new Error('xhr ' + x.status));
          x.onerror = () => rej(new Error('xhr'));
          x.send();
        } catch (e) { rej(e); }
      });
      if (!window.fetch || location.protocol === 'file:') return xhr();
      return fetch(url).then(r => { if (!r.ok) { const e = new Error('http ' + r.status); e.http = true; throw e; } return r.arrayBuffer(); })
        .catch(e => { if (e && e.http) throw e; return xhr(); });
    }
    function decode(ab) {
      return new Promise((res, rej) => {
        try { const p = ctx.decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); } catch (e) { rej(e); }
      });
    }
    const bufs = new Map();   // url → { p, b: AudioBuffer | 'el' | null | undefined(로딩 중), kind, at }
    function load(url, kind) {
      let e = bufs.get(url);
      if (e) { e.at = performance.now(); return e.p; }
      e = { b: undefined, kind, at: performance.now() };
      e.p = fetchAB(url).then(decode).then(b => (e.b = b), err => {
        e.b = location.protocol === 'file:' ? 'el' : null;
        if (!e.b) note({ type: 'err', url, msg: String((err && err.message) || err) });
        return e.b;
      });
      bufs.set(url, e);
      evict();
      return e.p;
    }
    // 해독한 음악은 커서(2분 스테레오 ≈ 40MB) 쓰지 않는 것부터 버린다
    function evict() {
      const used = new Set(voices.filter(v => !v.dead).map(v => v.url));
      for (const [kind, max] of [['bgm', 3], ['amb', 10]]) {
        const all = [...bufs.entries()].filter(([, e]) => e.kind === kind);
        let n = all.length;
        all.filter(([u, e]) => !used.has(u) && e.b !== undefined).sort((p, q) => p[1].at - q[1].at).forEach(([u]) => { if (n > max) { bufs.delete(u); n--; } });
      }
    }

    // 반복 재생(음악·환경음): 목표 크기 tgt로 fade초 동안 천천히 오르내린다
    const voices = [];
    function startLoop(kind, key, url, tgt, fade) {
      const v = { kind, key, url, cur: 0, tgt, fade, src: null, g: null, el: null, dead: false, last: -1 };
      voices.push(v);
      load(url, kind).then(b => {
        if (v.dead || v.tgt <= 0) { v.dead = true; return; }
        try {
          if (b && b !== 'el') {
            const s = ctx.createBufferSource(); s.buffer = b; s.loop = true;
            const g = ctx.createGain(); g.gain.value = 0; s.connect(g); g.connect(bus[kind]);
            s.start(0, 0);   // 고리 이음매가 미리 섞여 있어 처음부터 loop로 튼다
            v.src = s; v.g = g;
          } else if (b === 'el') {
            const el = new Audio(url); el.loop = true; el.volume = 0;
            const p = el.play(); if (p && p.catch) p.catch(() => {});
            v.el = el;
          } else { v.dead = true; return; }
          note({ type: kind, key, url });
        } catch (e) { v.dead = true; }
      });
      return v;
    }
    function stopVoice(v) {
      v.dead = true;
      try { if (v.src) v.src.stop(); } catch (e) { /* 이미 멈춤 */ }
      try { if (v.g) v.g.disconnect(); } catch (e) { /* 무시 */ }
      try { if (v.el) v.el.pause(); } catch (e) { /* 무시 */ }
    }
    function tick(dt) {
      for (let i = voices.length - 1; i >= 0; i--) {
        const v = voices[i];
        if (v.src || v.el || v.tgt === 0) {
          const s = dt / v.fade;
          v.cur = v.cur < v.tgt ? Math.min(v.tgt, v.cur + s) : Math.max(v.tgt, v.cur - s);
        }
        if ((v.tgt === 0 && v.cur <= 0) || (v.dead && !v.src && !v.el)) { stopVoice(v); voices.splice(i, 1); continue; }
        if (Math.abs(v.cur - v.last) > 0.001) {
          v.last = v.cur;
          if (v.g) v.g.gain.value = v.cur;
          if (v.el) v.el.volume = clamp01(v.cur * lvl(v.kind));
        }
      }
    }
    let want = { bgm: null, amb: [] };
    function scene(w) { want = w; if (unlocked) sync(); }
    function sync() {
      if (!ctx) return;
      // 음악: 같은 곡이면 그대로(멀어지던 중이면 되살림), 다르면 2.5초 동안 엇갈려 바꾼다
      const burl = want.bgm ? urlOf('bgm', want.bgm) : null;
      let keep = null;
      voices.forEach(v => {
        if (v.kind !== 'bgm' || v.dead) return;
        if (!keep && burl && v.key === want.bgm) { keep = v; v.tgt = 1; v.fade = 2.5; } else { v.tgt = 0; v.fade = 2.5; }
      });
      if (burl && !keep) startLoop('bgm', want.bgm, burl, 1, 2.5);
      // 환경음 층
      const wantA = {};
      (want.amb || []).forEach(l => { if (l && l.k && urlOf('amb', l.k)) wantA[l.k] = Math.max(wantA[l.k] || 0, l.v); });
      const have = {};
      voices.forEach(v => {
        if (v.kind !== 'amb' || v.dead) return;
        if (wantA[v.key] != null && !have[v.key]) { have[v.key] = 1; v.tgt = wantA[v.key]; v.fade = 2.2; } else { v.tgt = 0; v.fade = 2.2; }
      });
      for (const k in wantA) if (!have[k]) startLoop('amb', k, urlOf('amb', k), wantA[k], 2.2);
    }
    const lastAt = {};
    function sfx(key, o) {
      o = o || {};
      if (!unlocked || !ctx) return;
      const g0 = o.vol == null ? 1 : o.vol;
      if (!(g0 >= 0.01)) return;
      const nowMs = performance.now();
      if (o.gap && lastAt[key] && nowMs - lastAt[key] < o.gap * 1000) return;
      const url = urlOf('sfx', key);
      if (!url) { note({ type: 'miss', key }); return; }
      lastAt[key] = nowMs;
      if (live > 28) return;
      load(url, 'sfx').then(b => {
        if (performance.now() - nowMs > 1500) return;   // 너무 늦게 도착한 소리는 버린다
        try {
          if (b && b !== 'el') {
            const s = ctx.createBufferSource(); s.buffer = b;
            s.playbackRate.value = o.rate || (0.95 + Math.random() * 0.1);
            const g = ctx.createGain(); g.gain.value = g0;
            s.connect(g);
            let out = g;
            if (panOK && o.pan) { const p = ctx.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, o.pan)); g.connect(p); out = p; }
            out.connect(bus.sfx);
            live++; s.onended = () => { live--; try { out.disconnect(); g.disconnect(); } catch (e) { /* 무시 */ } };
            s.start(ctx.currentTime + (o.delay || 0));
          } else if (b === 'el') {
            const el = new Audio(url); el.volume = clamp01(g0 * lvl('sfx'));
            const p = el.play(); if (p && p.catch) p.catch(() => {});
          } else return;
          note({ type: 'sfx', key, url, vol: Math.round(g0 * 100) / 100, pan: Math.round((o.pan || 0) * 100) / 100 });
        } catch (e) { /* 무시 */ }
      });
    }
    const PRE = ['jump', 'djump', 'land', 'step_grass', 'step_stone', 'step_wood', 'step_snow', 'splash', 'swim', 'ui_click', 'ui_open', 'discover', 'travel', 'interact'];
    const urlsOf = k => { const u = lib('sfx')[k]; return (Array.isArray(u) ? u : [u]).filter(x => typeof x === 'string' && x); };
    // 자주 쓰는 소리는 바로, 나머지 효과음(작은 파일)은 조금 뒤 하나씩 천천히 받아 둔다
    function preload() {
      PRE.forEach(k => urlsOf(k).forEach(x => load(x, 'sfx')));
      const rest = [];
      for (const k in lib('sfx')) if (!PRE.includes(k)) urlsOf(k).forEach(x => rest.push(x));
      let i = 0;
      const next = () => { if (i < rest.length) { load(rest[i++], 'sfx'); setTimeout(next, 80); } };
      setTimeout(next, 1500);
    }
    // 자동 재생 정책: 첫 클릭·키 입력 때 AudioContext를 만들고 깨운다
    function unlock() {
      if (!ensure()) return;
      if (ctx.state !== 'running') { try { const p = ctx.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) { /* 무시 */ } }
      if (!unlocked) { unlocked = true; note({ type: 'unlock', state: ctx.state }); preload(); sync(); }
    }
    ['pointerdown', 'keydown', 'touchend', 'click'].forEach(t => window.addEventListener(t, unlock, true));
    function setVol(k, v) {
      if (k === 'mute') vol.mute = !!v; else if (KINDS.includes(k)) vol[k] = clamp01(+v || 0); else return;
      store.set('audio', vol); applyVol();
    }
    return {
      scene, sfx, tick, unlock, setVol, vol, log,
      has: (kind, key) => !!urlOf(kind, key),
      state: () => ({
        ctx: ctx ? ctx.state : null, unlocked, vol: Object.assign({}, vol), bufs: bufs.size,
        bgm: voices.filter(v => v.kind === 'bgm' && v.tgt > 0 && !v.dead).map(v => v.key),
        amb: voices.filter(v => v.kind === 'amb' && v.tgt > 0 && !v.dead).map(v => v.key + '@' + Math.round(v.tgt * 100) / 100),
        playing: voices.filter(v => v.src || v.el).map(v => v.kind + ':' + v.key + ':' + Math.round(v.cur * 100) / 100),
      }),
    };
  })();

  // ───── 렌더러 ─────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  const post = new VX.PostFX(renderer);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 800);
  const litMat = VX.litMaterial();
  const glowMat = VX.glowMaterial();
  const niteMat = VX.niteMaterial();
  const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
  const sun = new THREE.DirectionalLight(0xffffff, 0.7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -96, right: 96, top: 96, bottom: -96, near: 1, far: 420 });
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.04;
  scene.add(hemi, sun, sun.target);

  const state = {
    idx: -1, cat: null, lastInCat: {},
    yaw: 0.75, yawT: 0.75, pitch: 0.6, pitchT: 0.6, zoom: 1, zoomT: 1,
    target: new THREE.Vector3(0, 6, 0), targetT: new THREE.Vector3(0, 6, 0),
    auto: store.get('auto', !reduced), px: store.get('px', 2), time: store.get('time', null), labels: store.get('labels', true), dither: store.get('dither', true),
    rtW: 4, rtH: 4, cssW: 4, cssH: 4,
  };

  // ───── 순간 입자(상호작용 효과) ─────
  const BN = 600;
  const bPos = new Float32Array(BN * 3).fill(-9999), bCol = new Float32Array(BN * 3), bVel = new Float32Array(BN * 3), bLife = new Float32Array(BN);
  const bGeo = new THREE.BufferGeometry();
  bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
  bGeo.setAttribute('color', new THREE.BufferAttribute(bCol, 3));
  const bPts = new THREE.Points(bGeo, VX.pointsMaterial(2, true));
  bPts.frustumCulled = false;
  scene.add(bPts);
  let bNext = 0;
  const tmpC = new THREE.Color();
  function spawnBurst(p, o) {
    const n = o.n || 40, base = cur ? cur.base : 24;
    for (let i = 0; i < n; i++) {
      const k = bNext; bNext = (bNext + 1) % BN;
      const a = Math.random() * Math.PI * 2, s = (o.spread || 1) * Math.random();
      bPos[k * 3] = p[0] - W / 2 + Math.cos(a) * s; bPos[k * 3 + 1] = p[1] - base + Math.random() * (o.h || 0); bPos[k * 3 + 2] = p[2] - D / 2 + Math.sin(a) * s;
      const sp = o.speed || 4;
      bVel[k * 3] = Math.cos(a) * sp * Math.random() * (o.flat ? 1 : 0.6);
      bVel[k * 3 + 1] = (o.up != null ? o.up : 3) * (0.5 + Math.random());
      bVel[k * 3 + 2] = Math.sin(a) * sp * Math.random() * (o.flat ? 1 : 0.6);
      bLife[k] = (o.life || 1.6) * (0.6 + Math.random() * 0.6);
      tmpC.set(o.colors[i % o.colors.length]);
      bCol[k * 3] = tmpC.r; bCol[k * 3 + 1] = tmpC.g; bCol[k * 3 + 2] = tmpC.b;
      bVel[k * 3 + 1] += 0;
      bPts.userData.g = o.gravity != null ? o.gravity : 3;
    }
    bGeo.attributes.color.needsUpdate = true;
  }
  function stepBurst(dt) {
    const g = bPts.userData.g || 3;
    for (let k = 0; k < BN; k++) {
      if (bLife[k] <= 0) continue;
      bLife[k] -= dt;
      if (bLife[k] <= 0) { bPos[k * 3 + 1] = -9999; continue; }
      bVel[k * 3 + 1] -= g * dt;
      bPos[k * 3] += bVel[k * 3] * dt; bPos[k * 3 + 1] += bVel[k * 3 + 1] * dt; bPos[k * 3 + 2] += bVel[k * 3 + 2] * dt;
    }
    bGeo.attributes.position.needsUpdate = true;
  }

  // ───── 지도 만들기 ─────
  const cache = new Map();
  let cur = null;

  function makeParticles(cfg, def, base) {
    const N = cfg.n, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), ph = new Float32Array(N);
    const c = new THREE.Color(), area = cfg.area;
    const y0 = cfg.y0 != null ? cfg.y0 : base - 2, y1 = cfg.y1 != null ? cfg.y1 : base + 46;
    const seed = VX.mulberry(N * 7 + def.seed);
    const spawn = (i, fresh) => {
      let x, z;
      if (area) { const a = seed() * Math.PI * 2, r = Math.sqrt(seed()) * area[2]; x = area[0] + Math.cos(a) * r; z = area[1] + Math.sin(a) * r; }
      else { x = 4 + seed() * (W - 8); z = 4 + seed() * (D - 8); }
      pos[i * 3] = x; pos[i * 3 + 2] = z;
      pos[i * 3 + 1] = fresh ? y0 + seed() * (y1 - y0) : (cfg.mode === 'fall' ? y1 : y0);
    };
    for (let i = 0; i < N; i++) {
      spawn(i, true);
      c.set(cfg.colors[i % cfg.colors.length]);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      ph[i] = seed() * 100;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const glow = cfg.glow != null ? cfg.glow : (cfg.mode === 'wisp' || cfg.mode === 'rise');
    const pts = new THREE.Points(g, VX.pointsMaterial(cfg.size || 1, glow));
    pts.frustumCulled = false;
    pts.userData.step = (dt, t) => {
      const sp = (cfg.speed || 1) * windMul;
      for (let i = 0; i < N; i++) {
        const k = i * 3, p = ph[i];
        if (cfg.mode === 'fall') {
          pos[k + 1] -= dt * sp * 3.2;
          pos[k] += Math.sin(t * 0.7 + p) * dt * 0.9 + (cfg.wind || 0) * dt;
          pos[k + 2] += Math.cos(t * 0.5 + p) * dt * 0.7;
          if (pos[k + 1] < y0) spawn(i, false);
        } else if (cfg.mode === 'rise') {
          pos[k + 1] += dt * sp * 2.2;
          pos[k] += Math.sin(t * 1.3 + p) * dt * 0.6 + (cfg.wind || 0) * dt;
          if (pos[k + 1] > y1) spawn(i, false);
        } else if (cfg.mode === 'vortex') {
          // 회오리: 중심을 돌며 천천히 오르고, 위로 갈수록 반지름이 넓어진다
          const c = cfg.center;
          pos[k + 1] += dt * (cfg.rise || 1.5) * windMul;
          if (pos[k + 1] > y1) pos[k + 1] = y0 + (pos[k + 1] - y1);
          const hh = Math.max(0, (pos[k + 1] - y0) / (y1 - y0));
          const r = cfg.r0 + (cfg.r1 - cfg.r0) * Math.pow(hh, 1.3) + Math.sin(p * 3.1) * (cfg.jit || 2);
          const a = p + vortT * (cfg.spin || 0.6) * (1.25 - hh * 0.55);
          pos[k] = c[0] + Math.cos(a) * r; pos[k + 2] = c[1] + Math.sin(a) * r;
        } else if (cfg.mode === 'wisp') {
          pos[k] += Math.sin(t * 0.6 * sp + p) * dt * 2;
          pos[k + 2] += Math.cos(t * 0.45 * sp + p * 1.3) * dt * 2;
          pos[k + 1] = y0 + (p % 7) + Math.sin(t * 0.8 + p) * 2.5;
        } else {
          pos[k] += (Math.sin(t * 0.3 * sp + p) * 1.4 + (cfg.wind || 0)) * dt * sp;
          pos[k + 1] += Math.cos(t * 0.4 * sp + p * 2) * dt * sp * 0.9 + dt * 0.15;
          pos[k + 2] += Math.cos(t * 0.35 * sp + p) * dt * sp * 1.4;
          if (pos[k + 1] > y1 || pos[k] < 0 || pos[k] > W) spawn(i, true);
        }
      }
      g.attributes.position.needsUpdate = true;
    };
    return pts;
  }

  const LIGHTS = 16;
  function build(i) {
    if (cache.has(i)) { const e = cache.get(i); cache.delete(i); cache.set(i, e); return e; }
    const def = MAPS[i];
    const sz = def.size || [VX.W, VX.D, VX.H];
    W = sz[0]; D = sz[1]; H = sz[2];
    const w = new VX.World(def.blocks, def.seed, null, sz);
    w.base = def.base || 24;
    const info = def.build(w) || {};
    const base = w.base;
    const geo = VX.buildGeometry(w);
    const group = new THREE.Group();
    group.position.set(-W / 2, -base, -D / 2);
    const lit = new THREE.Mesh(geo.lit, litMat);
    lit.castShadow = true; lit.receiveShadow = true;
    group.add(lit);
    const disposables = [geo.lit];
    if (geo.glow) { group.add(new THREE.Mesh(geo.glow, glowMat)); disposables.push(geo.glow); }
    if (geo.nite) { group.add(new THREE.Mesh(geo.nite, niteMat)); disposables.push(geo.nite); }
    const props = {};
    (w.props || []).forEach((pr, k) => {
      const g2 = VX.buildGeometry(pr.w);
      const o = pr.o, pv = o.pivot || [W / 2, base, D / 2];
      const piv = new THREE.Group(), inner = new THREE.Group();
      piv.position.set(pv[0], pv[1], pv[2]);
      inner.position.set(-pv[0], -pv[1], -pv[2]);
      if (g2.lit.attributes.position.count) { const m = new THREE.Mesh(g2.lit, litMat); m.castShadow = true; m.receiveShadow = true; inner.add(m); }
      if (g2.glow) inner.add(new THREE.Mesh(g2.glow, glowMat));
      if (g2.nite) inner.add(new THREE.Mesh(g2.nite, niteMat));
      disposables.push(g2.lit); if (g2.glow) disposables.push(g2.glow); if (g2.nite) disposables.push(g2.nite);
      piv.add(inner); group.add(piv);
      piv.userData = { o, base: pv.slice(), off: (o.off0 || [0, 0, 0]).slice(), rot: (o.rot0 || [0, 0, 0]).slice(), scl: (o.scl0 || [1, 1, 1]).slice(), ang: 0, mul: 1, mulT: 1, samp: surfaceSamples(pr.w, pv, 60), vw: pr.w };
      props[o.name || ('p' + k)] = piv;
    });
    const liquid = VX.buildLiquid(w, def.liquid, def.liqSpeed, def.liqGlow);
    if (liquid) { group.add(liquid); disposables.push(liquid.geometry, liquid.material); }
    // 점광원은 지도당 LIGHTS개까지: 상호작용에 쓰는 것(이름 있는 것)과 밝은 것 먼저
    const picked = (info.lights || []).slice().sort((p1, p2) => ((p2.name ? 1 : 0) - (p1.name ? 1 : 0)) || (p2.i * p2.d - p1.i * p1.d)).slice(0, Math.min(def.maxLights || LIGHTS, LIGHTS));
    const lights = picked.map((L, k) => {
      const pl = new THREE.PointLight(L.c, L.i, L.d, 1.2);
      pl.position.set(L.p[0], L.p[1], L.p[2]);
      pl.userData = { base: L.i, fl: L.flicker || 0, ph: k * 1.7, mul: 1, mulT: 1, name: L.name, night: !!L.night };
      group.add(pl);
      return pl;
    });
    // 지도마다 점광원 수를 같게 채운다(수가 바뀌면 three.js가 셰이더를 통째로 다시 컴파일해 지도 전환이 1초쯤 늦어진다)
    while (lights.length < LIGHTS) { const pl = new THREE.PointLight(0x000000, 0, 1, 1.2); pl.position.set(0, -500, 0); pl.userData = { base: 0, fl: 0, ph: 0, mul: 1, mulT: 1, name: null, night: false }; group.add(pl); lights.push(pl); }
    const particles = (def.particles || []).concat(info.particles || []).map(p => makeParticles(p, def, base));
    particles.forEach(p => { group.add(p); disposables.push(p.geometry, p.material); });
    const toWorld = p => new THREE.Vector3(p[0] - W / 2, p[1] - base, p[2] - D / 2);
    const landmarks = (info.landmarks || []).map(l => Object.assign({}, l, { world: toWorld(l.p) }));
    const acts = (info.acts || []).map(a => Object.assign({}, a, {
      box: new THREE.Box3(toWorld([a.hit[0], a.hit[1], a.hit[2]]), toWorld([a.hit[3] + 1, a.hit[4] + 1, a.hit[5] + 1])),
      world: toWorld([(a.hit[0] + a.hit[3] + 1) / 2, a.hit[4] + 2, (a.hit[2] + a.hit[5] + 1) / 2]), busy: false,
    }));
    classifyProps(props, acts);
    const f = def.fog || {};
    const fog = {
      box: [(f.box ? f.box[0] : W / 2) - W / 2, (f.box ? f.box[1] : D / 2) - D / 2, f.box ? f.box[2] : W / 2, f.box ? f.box[3] : D / 2],
      start: f.start != null ? f.start : 0.74, floor: (f.floor != null ? f.floor : base - 8) - base, depth: f.depth || 10,
      haze: f.haze ? [f.haze[0] - base, f.haze[1], f.haze[2]] : null, hazeColor: f.hazeColor,
      top: f.top != null ? f.top - base : 1e4, topDepth: f.topDepth || 18,
    };
    let verts = 0;
    disposables.forEach(d => { if (d.attributes && d.attributes.position) verts += d.attributes.position.count; });
    const entry = { i, def, base, group, liquid, lights, particles, landmarks, props, acts, fog, disposables, occ: w.data, liq: w.liq, W, D, H, verts, stepT: stepTypes(w), pass: passSet(w), ids: w.id };
    cache.set(i, entry);
    // 캐시는 4개까지, 큰 지도가 많으면 정점 합계와 칸 수(고해상도 지도 1개 ≈ 2,500만 칸)로도 줄인다
    const total = () => { let n = 0; cache.forEach(e => { n += e.verts; }); return n; };
    const cells = () => { let n = 0; cache.forEach(e => { n += e.W * e.D * e.H; }); return n; };
    while (cache.size > 4 || (cache.size > 2 && (total() > 4.2e6 || cells() > 6e7))) {
      const [oldI, old] = cache.entries().next().value;
      if (cur && old === cur) { cache.delete(oldI); cache.set(oldI, old); break; }
      old.disposables.forEach(d => d.dispose && d.dispose());
      cache.delete(oldI);
    }
    return entry;
  }

  const loading = $('#loading');
  function show(i, instant) {
    if (i === state.idx && cur) return;
    if (!cache.has(i)) {
      loading.hidden = false;
      loading.textContent = MAPS[i].name + ' 지도를 그리는 중';
      setTimeout(() => { apply(i, instant); loading.hidden = true; }, 30);
    } else apply(i, instant);
  }
  function apply(i, instant) {
    const m = build(i);
    W = m.W; D = m.D; H = m.H;
    const sh = Math.max(W, D) * 0.75, sc = sun.shadow.camera;
    if (sc.right !== sh) { sc.left = -sh; sc.right = sh; sc.top = sh; sc.bottom = -sh; sc.far = 300 + sh * 1.3; sc.updateProjectionMatrix(); }
    if (cur) scene.remove(cur.group);
    const fromId = cur && cur !== m ? cur.def.id : null;
    cur = m;
    state.idx = i;
    scene.add(m.group);
    const def = m.def;
    applyTime();
    state.targetT.set(0, def.camY != null ? def.camY : 6, 0); state.zoomT = def.zoom || 1;
    if (def.pitch) state.pitchT = def.pitch;
    if (instant) { state.target.copy(state.targetT); state.zoom = state.zoomT; state.pitch = state.pitchT; }
    store.set('map', def.id);
    try { history.replaceState(null, '', '#' + def.id); } catch (e) { /* 샌드박스 */ }
    if (def.cat !== state.cat) { state.cat = def.cat; renderTabs(); }
    if (!def.sub) state.lastInCat[def.cat] = i;
    renderInfo();
    hideTip();
    if (play.on) spawnPlayer(fromId);
    audioScene();
  }

  // ───── 낮과 밤 ─────
  const mixHex = (a, b, t) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), t).getHexString();
  function preset(def, time) {
    const native = def.time || 'day';
    const own = { sky: def.sky, hemi: def.hemi, sun: def.sun, stars: def.stars, haze: def.fog && def.fog.hazeColor };
    if (def[time]) return Object.assign({}, own, def[time]);
    if (time === native) return own;
    const dir = def.sun[2];
    if (time === 'night') return {
      sky: [mixHex('#0b0f1c', def.color, 0.12), '#04060d', mixHex('#1c2a52', def.color, 0.25)], stars: true,
      hemi: ['#94a4d4', mixHex(def.hemi[1], '#000000', 0.4), def.hemi[2] * 0.82], sun: ['#b4c2f0', 0.46, dir], haze: own.haze && mixHex(own.haze, '#0a0e1a', 0.7),
    };
    return {
      sky: [mixHex('#dcecf6', def.color, 0.1), '#5e94d0', '#fff4dc'], stars: false,
      hemi: ['#ffffff', mixHex(def.hemi[1], '#6a6a50', 0.5), 0.58], sun: ['#fff2dc', 0.8, dir], haze: own.haze && mixHex(own.haze, '#e8eef4', 0.6),
    };
  }
  function effTime() { return state.time || (cur && cur.def.time) || 'day'; }
  function applyTime() {
    if (!cur) return;
    const def = cur.def, t = effTime(), pr = preset(def, t);
    hemi.color.set(pr.hemi[0]); hemi.groundColor.set(pr.hemi[1]); hemi.intensity = pr.hemi[2];
    sun.color.set(pr.sun[0]); sun.intensity = pr.sun[1];
    lightBase.hemi = pr.hemi[2]; lightBase.sun = pr.sun[1];
    sun.position.set(pr.sun[2][0], pr.sun[2][1], pr.sun[2][2]).normalize().multiplyScalar(180);
    post.setSky(pr.sky[0], pr.sky[1], pr.sky[2], pr.stars);
    post.setFog(Object.assign({}, cur.fog, pr.haze ? { hazeColor: pr.haze } : {}));
    niteMat.uniforms.uNight.value = t === 'night' ? 1 : 0;
    $('#tauto').setAttribute('aria-pressed', String(state.time == null));
    $('#tday').setAttribute('aria-pressed', String(state.time === 'day'));
    $('#tnight').setAttribute('aria-pressed', String(state.time === 'night'));
    $('#tauto').textContent = '기본(' + (def.time === 'night' ? '밤' : '낮') + ')';
    audioScene();
  }

  // ───── 상호작용 API ─────
  const lightBase = { hemi: 0.6, sun: 0.7 }, flash = { v: 0 };
  let windMul = 1, windT = 1, vortT = 0, windBase = 1;   // windBase: 날씨(fx.js)가 정하는 바탕 바람
  const tweens = [], fades = [];
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const A = {
    wait: s => new Promise(r => setTimeout(r, s * 1000)),
    tween(name, to, dur, ez) {
      const p = cur && cur.props[name];
      if (!p) return Promise.resolve();
      const st = p.userData;
      return new Promise(res => tweens.push({ st, from: { off: st.off.slice(), rot: st.rot.slice(), scl: st.scl.slice() }, to, t: 0, dur: dur || 1, ez: ez || ease, res, map: cur }));
    },
    move(name, off, dur, ez) { return A.tween(name, { off }, dur, ez); },
    turn(name, rot, dur, ez) { return A.tween(name, { rot }, dur, ez); },
    // 끝까지 간 부품을 처음 자리로 순간 이동시키고 투명에서 스르륵 나타나게 한다
    respawn(name, dur) {
      const p = cur && cur.props[name];
      if (!p) return Promise.resolve();
      const u = p.userData, o = u.o;
      u.respawns = (u.respawns || 0) + 1;   // 타고 있던 정령을 내려 주는 신호
      for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].st === u) { const tw = tweens.splice(i, 1)[0]; tw.res(); }
      u.off = (o.off0 || [0, 0, 0]).slice(); u.rot = (o.rot0 || [0, 0, 0]).slice(); u.scl = (o.scl0 || [1, 1, 1]).slice();
      const lit = [], other = [];
      p.traverse(m => { if (m.isMesh) (m.material === litMat || (m.userData.fade && m.material === m.userData.fade) ? lit : other).push(m); });
      lit.forEach(m => { if (!m.userData.fade) { m.userData.fade = VX.litMaterial(litMat.clone()); m.userData.fade.transparent = true; m.userData.fade.depthWrite = false; } m.userData.fade.opacity = 0; m.material = m.userData.fade; });
      other.forEach(m => { m.visible = false; });
      return new Promise(res => fades.push({ lit, other, t: 0, dur: dur || 0.9, res, map: cur }));
    },
    // 누적된 회전을 ±180° 안으로 접어 제자리에서 빙글 돌지 않게 한다
    unwind(name) { const p = cur && cur.props[name]; if (p) for (let q = 0; q < 3; q++) p.userData.rot[q] = ((p.userData.rot[q] + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; },
    // 밧줄 길이: 원래 길이 len0을 len으로(위쪽 도르래에 고정된 채 늘고 준다)
    rope(name, len0, len, dur, ez) { return A.tween(name, { scl: [1, len / len0, 1] }, dur, ez); },
    async path(name, pts, dur) {
      const p = cur && cur.props[name];
      if (!p) return;
      let last = p.userData.off.slice(), total = 0;
      const segs = pts.map(q => { const l = Math.hypot(q[0] - last[0], q[1] - last[1], q[2] - last[2]); last = q; total += l; return l; });
      for (let k = 0; k < pts.length; k++) await A.tween(name, { off: pts[k], rot: pts[k][3] != null ? [0, pts[k][3], 0] : undefined }, dur * segs[k] / (total || 1), t => t);
    },
    // 길을 따라 달리기: 진행 방향으로 머리를 돌리며 점들을 지나고, back 시간이 있으면 끝에서 처음 자리에 스르륵 나타난다
    // fwd: 부품이 처음 놓였을 때 앞이 향하는 쪽('+x' '-x' '+z' '-z')
    async drive(name, pts, dur, o) {
      const p = cur && cur.props[name];
      if (!p) return;
      o = o || {};
      const F = { '+x': [1, 0], '-x': [-1, 0], '+z': [0, 1], '-z': [0, -1] }[o.fwd || '+z'] || [0, 1];
      const base = Math.atan2(F[0], F[1]), u = p.userData;
      let last = u.off.slice(), total = 0;
      const segs = pts.map(q => { const l = Math.hypot(q[0] - last[0], q[1] - last[1], q[2] - last[2]); last = q; total += l; return l; });
      let prev = u.off.slice();
      for (let k = 0; k < pts.length; k++) {
        const q = pts[k], dx = q[0] - prev[0], dz = q[2] - prev[2], d = dur * segs[k] / (total || 1);
        if (Math.hypot(dx, dz) > 0.01) {
          A.unwind(name);
          let yaw = Math.atan2(dx, dz) - base, cy = u.rot[1];
          yaw = cy + ((((yaw - cy) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
          const tt = Math.min(0.35, d * 0.3);
          if (Math.abs(yaw - cy) > 0.05) await A.tween(name, { rot: [u.rot[0], yaw, u.rot[2]] }, tt);
          await A.tween(name, { off: q.slice(0, 3) }, Math.max(0.05, d - (Math.abs(yaw - cy) > 0.05 ? tt : 0)), t => t);
        } else await A.tween(name, { off: q.slice(0, 3) }, d, t => t);
        prev = q;
      }
      if (o.back) await A.respawn(name, o.back);
    },
    spin(name, mul, dur) {
      const p = cur && cur.props[name];
      if (!p) return Promise.resolve();
      p.userData.mulT = mul;
      return A.wait(dur).then(() => { p.userData.mulT = 1; });
    },
    flash(name, mul, dur) {
      const ls = cur ? cur.lights.filter(l => name == null || l.userData.name === name) : [];
      ls.forEach(l => { l.userData.mulT = mul; });
      return A.wait(dur).then(() => ls.forEach(l => { l.userData.mulT = 1; }));
    },
    burst(p, o) { spawnBurst(p, o); },
    glow(mul, dur) { glowMat.uniforms.uBoost.value = mul; return A.wait(dur).then(() => { glowMat.uniforms.uBoost.value = 1; }); },
    // 하늘 전체가 번쩍(번개)
    lightning(k) {
      flash.v = Math.max(flash.v, k || 1);
      SND.sfx('thunder', { vol: Math.min(1, 0.45 + (k || 1) * 0.35), gap: 0.7, delay: 0.12 + Math.random() * 0.3 });
    },
    // 입자 바람·회오리 세기를 잠시 바꾼다
    wind(mul, dur) { windT = mul; return A.wait(dur).then(() => { windT = 1; }); },
  };
  async function runAct(a, fromList) {
    if (a.busy || !cur) return;
    const map = cur;
    a.busy = true; syncActs();
    actSound(a, fromList);
    // 놀이 모드에선 카메라가 정령을 따라가므로 동작 카메라는 쓰지 않는다
    if (!play.on) showAct(a, map, fromList);
    // 탈것 이름이면 drive를 시작할 때 엔진 소리(동작 시작 소리로 이미 냈으면 생략)
    const AA = Object.create(A);
    AA.drive = (n, pts, dur, o) => {
      if (VEHICLE.test(a.name) && !(a.sndKeys || []).includes('engine')) sfxAt('engine', actCenter(a), 0.8, { gap: 1.5 });
      return A.drive(n, pts, dur, o);
    };
    try { await a.run(AA); } catch (e) { /* 지도를 바꾸면 중단 */ }
    a.busy = false; if (cur === map) syncActs();
    if (a.goto && cur === map) travel(a.goto);
  }
  // 장소 이동: 잠깐 어두워졌다가 다른 지도로
  async function travel(id) {
    const i = MAPS.findIndex(m => m.id === id);
    if (i < 0) return;
    const fade = $('#fade');
    fade.classList.add('on');
    SND.sfx('travel', { vol: 0.8 });
    play.lock = true;
    await A.wait(0.4);
    show(i);
    const t0 = performance.now();
    while (state.idx !== i && performance.now() - t0 < 9000) await A.wait(0.05);
    await A.wait(0.15);
    play.lock = false;
    fade.classList.remove('on');
  }

  // ───── 소리 고르기: 지도 → 음악·환경음, 동작 → 효과음, 블록 → 발소리 ─────
  const CAT_SND = {
    dungeon: { amb: ['cave'], bgm: 'dungeon' }, village: { amb: ['field_birds', 'town@0.4'], bgm: 'village' },
    kingdom: { amb: ['town'], bgm: 'kingdom' }, magic: { amb: ['magic_hum'], bgm: 'magic' },
    lands: { amb: ['mountain_wind'], bgm: 'lands' }, orario: { amb: ['town'], bgm: 'orario' }, tarkov: { amb: ['city_ruin'], bgm: 'tarkov' },
  };
  const layer = s => { const m = String(s).split('@'); const v = m[1] != null ? parseFloat(m[1]) : 1; return { k: m[0], v: isFinite(v) ? Math.max(0, Math.min(1, v)) : 1 }; };
  const listOf = x => Array.isArray(x) ? x : typeof x === 'string' && x ? [x] : null;
  let weather = {};
  window.ATLAS_AUDIO = {
    setWeather(d) {
      try {
        const nd = d && typeof d === 'object' ? { type: d.type, amb: d.amb, intensity: d.intensity, indoor: !!d.indoor } : {};
        if (JSON.stringify(nd) === JSON.stringify(weather)) return;
        weather = nd; audioScene();
      } catch (e) { /* 무시 */ }
    },
    sfx: (k, o) => SND.sfx(k, o), state: () => SND.state(),
  };
  function audioScene() {
    try {
      if (!cur) return;
      const def = cur.def, cd = CAT_SND[def.cat] || CAT_SND.dungeon;
      const AM = window.AUDIO_MAP, e = (AM && typeof AM === 'object' && AM[def.id]) || {};
      let ls = (listOf(e.amb) || cd.amb).map(layer);
      if (effTime() === 'night') {
        // 밤: 새소리는 빼고, 바깥 지도엔 풀벌레를 더한다
        const birds = ls.some(l => l.k === 'field_birds' || l.k === 'forest');
        ls = ls.filter(l => l.k !== 'field_birds');
        const extra = listOf(e.night);
        if (extra) ls = ls.concat(extra.map(layer));
        else if (birds && !e.indoor) ls.push({ k: 'night_insects', v: 0.6 });
      }
      // 날씨(fx.js): 지도 환경음 위에 비·눈·폭풍 층을 얹는다(실내면 먹먹하게 작게)
      const wl = listOf(weather.amb);
      if (wl) {
        const k = isFinite(+weather.intensity) && weather.intensity != null ? Math.max(0, Math.min(1, +weather.intensity)) : 1;
        const m = k * (weather.indoor || e.indoor ? 0.35 : 1);
        if (m > 0.01) ls = ls.concat(wl.map(layer).map(l => ({ k: l.k, v: l.v * m })));
      }
      const atlasMul = play.on ? 1 : 0.55;   // 지도 보기에서는 환경음을 조금 낮춘다
      const bgm = [e.bgm, cd.bgm].find(k => k && SND.has('bgm', k)) || e.bgm || cd.bgm;
      SND.scene({ bgm, amb: ls.map(l => ({ k: l.k, v: l.v * atlasMul })) });
    } catch (er) { /* 소리 없이 계속 */ }
  }
  function stepTypes(w) {
    const out = new Uint8Array(w.blocks.length);
    for (const n in w.id) {
      const id = w.id[n], b = w.blocks[id];
      let k = 0;
      if (/snow|frost|icicle|^ice|Ice/.test(n)) k = 3;
      else if (/plank|wood|deck|timber|log(?!o)|beam|bark|root|crate|barrel|board|bridge|hull|trunk|shelf|desk|table|bench|pallet|sleeper/i.test(n)) k = 2;
      else if (/grass|leaf|moss|fern|hedge|needle|flower|wheat|hay|lichen|vine|straw|stubble|mud|soil|dirt|sawdust|petal|sand|ash|lily|reed|fung|mush|carpet|rug|^mat|turf|briar|ivy|mound|sprout|lotus|cabbage|lavender|fur/i.test(n)) k = 1;
      else if (b && b._t && !/roof|wall|glass|win|trim|plate|copper|patina|verd|teal|iron|steel|metal|rune|crys/i.test(n) && b._t[1] > b._t[0] * 1.15 && b._t[1] > b._t[2] * 1.1) k = 1;
      out[id] = k;
    }
    return out;
  }
  // 동작 이름(없으면 설명)의 낱말로 효과음을 고른다. [정규식, 열쇠들, 크기]
  const VEHICLE = /트럭|차량|자동차|택시|크루저|열차|기관차|비행선|호버|고카트|시동|엔진|광차|마차|하늘배/;
  const ACT_SFX = [
    [/경보|사이렌/, ['alarm'], 0.8],
    [/뱃고동/, ['horn'], 1],
    [/안개문|차원문|축복|혼불|도깨비불|원소|왕좌/, ['magic', 'sparkle'], 0.8],
    [/폭발|화재|탱크|불꽃놀이|축포|섬광탄|밤하늘 불꽃/, ['explosion'], 1],
    [/번개|낙뢰|폭풍/, ['thunder'], 1],
    [/기관총|저격|NSV|AGS|PKM/, ['gunshot_distant'], 0.9],
    [/차단기|레버|스위치|정전|전원/, ['lever'], 0.8],
    [/갑문|수문/, ['door_metal', 'water_pour'], 0.85],
    [/화로|화덕|봉화|횃불|용광로|화장로|모닥불|벽난로|용암|쇳물|화형|신호탄/, ['fire'], 0.9],
    [/종(?!이)|풍경/, ['bell'], 0.9],
    [/(대문|정문|석문|성문|철문|하역문|미닫이문|여닫이문|회전문|셔터|창살|게이트|철망|문 열기|[^개]문$|영묘의 문|무덤 문|지하실|해치)/, ['door'], 0.9],
    [/(^|\s)관$|얼음관|석상|조각상/, ['door_stone'], 0.8],
    [/사슬|도개교|쇠우리|승강기|엘리베이터|기중기|크레인|도르래|두레박|닻|양묘기/, ['gate_chain'], 0.85],
    [/컴퓨터|하드 드라이브|무전기|레이더|화면|조타륜/, ['lever'], 0.8],
    [/망치|모루|대장간|해머|숫돌|풀무/, ['anvil'], 0.9],
    [/점등|조명|불빛|창불|등불|등롱|투광등|탐조등|마석등|간판|등탑|등대|LED|로고|글자/, ['sparkle'], 0.7],
    [/까마귀/, ['crow'], 0.9],
    [/새|비둘기|갈매기|박쥐|부엉이|가고일|오리|백조|꿀벌|고룡|날개|물새/, ['bird_flap'], 0.85],
    [/쇄빙/, ['engine', 'explosion'], 0.7],
    [VEHICLE, ['engine'], 0.85],
    [/톱 |컨베이어|에스컬레이터|가동|팬$/, ['engine'], 0.6],
    [/마차|수레|그네|풍차|풍향계|풍향 닭|물레(?!방아)|빨랫줄|흔들다리|바구니|의자|오르골|저울|시계|망원경|들어 올리/, ['creak'], 0.8],
    [/불|굴뚝|연기|가마(?!솥)/, ['fire'], 0.85],
    [/상자|보물|은닉처|의료품/, ['chest'], 0.9],
    [/솥|증류|물약|사과주|술|성배|방울/, ['bubble'], 0.8],
    [/물고기|은어|파도|진수|뛰기/, ['splash'], 0.9],
    [/물|분수|샘|우물|폭포|물결|수로|목욕탕|펌프|나룻배|잎배|(^|\s)배( |$)|연못|호수|어선|부표|그물/, ['water_pour'], 0.85],
    [/책|서고|서책|금서/, ['book'], 0.9],
    [/유리|스테인드|장미창|거울|창의 햇살/, ['glass'], 0.8],
    [/마법|룬|소환|수정|빛|오로라|별|달|혜성|유성|마력|영혼|성검|봉인|후광|고치|은빛|광채|공명|현자|호문쿨루스|마나|신들|여신|치유/, ['magic', 'sparkle'], 0.8],
    [/가스|바람|회오리|소용돌이|눈보라|휘장|깃발|잎비|꽃잎|낙엽|덩굴|담쟁이|덮개/, ['wind_gust'], 0.8],
    [/무너|붕괴|굴러|낙하|부서|갈라|바위 비|발자국/, ['explosion'], 0.55],
    [/훈련|난전|결투|대결|검|칼|과녁|바벨|농구|쇠고리|족쇄|가시|철/, ['metal_hit'], 0.8],
    [/시장|노점|동전|금화|만찬|잔치/, ['coins'], 0.8],
  ];
  function doorKey(s) { return /철|쇠|셔터|게이트|철망|KIBA|회전문|보안/.test(s) ? 'door_metal' : /석|돌|얼음|바위|무덤|영묘|납골/.test(s) ? 'door_stone' : 'door_wood'; }
  function actSfx(a) {
    const own = listOf(a.sfx);
    if (own) return own.map(k => [k, 1]);
    for (const txt of [a.name || '', a.hint || '']) {
      for (const [re, ks, v] of ACT_SFX) if (re.test(txt)) return ks.map(k => [k === 'door' ? doorKey(txt) : k, v]);
    }
    return [['interact', 0.8]];
  }
  const actCenter = a => a.box.getCenter(new THREE.Vector3());
  // 듣는 자리(놀이 모드: 정령, 지도 보기: 카메라 중심)에서 멀수록 작게, 화면 가로 위치로 살짝 좌우
  const sndV = new THREE.Vector3();
  function sfxAt(key, w, vol, o) {
    try {
      if (!cur) return;
      const L = play.on ? toW(play.p) : state.target, d = w.distanceTo(L);
      const R = play.on ? 12 : Math.max(10, viewHalf() / Math.max(0.3, state.zoom) * 0.6);
      let g = (vol == null ? 1 : vol) / (1 + (d / R) * (d / R));
      if (!play.on) g = Math.max(g, 0.15 * (vol == null ? 1 : vol));
      sndV.copy(w).project(play.on && play.tp ? pcam : cam);
      const pan = sndV.z > 1 ? 0 : Math.max(-0.7, Math.min(0.7, sndV.x * 0.7));
      SND.sfx(key, Object.assign({ vol: g, pan }, o));
    } catch (e) { /* 무시 */ }
  }
  function actSound(a, near) {
    try {
      if (a.goto) return;   // 길 안내는 이동 소리(travel)로
      const ks = actSfx(a), c = actCenter(a);
      a.sndKeys = ks.map(k => k[0]);
      ks.forEach(([k, v], i) => {
        const f = () => { if (near && !play.on) SND.sfx(k, { vol: v }); else sfxAt(k, c, v); };
        if (i) setTimeout(f, 140 * i); else f();
      });
    } catch (e) { /* 무시 */ }
  }

  // ───── 동작 카메라: 움직일 부품이 가려지면 잘 보이는 쪽으로 돌고, 움직임 전체가 화면에 들어오게 ─────
  function surfaceSamples(pw, pv, max) {
    const all = [];
    for (const [i] of pw.data) {
      const x = i % W, z = Math.floor(i / W) % D, y = Math.floor(i / (W * D));
      if (!pw.get(x + 1, y, z) || !pw.get(x - 1, y, z) || !pw.get(x, y + 1, z) || !pw.get(x, y - 1, z) || !pw.get(x, y, z + 1) || !pw.get(x, y, z - 1)) all.push([x + 0.5 - pv[0], y + 0.5 - pv[1], z + 0.5 - pv[2]]);
    }
    if (all.length <= max) return all;
    const out = [], step = all.length / max;
    for (let k = 0; k < max; k++) out.push(all[Math.floor(k * step)]);
    return out;
  }
  function solid(m, x, y, z, see) {
    if (x < 0 || z < 0 || y < 0 || x >= W || z >= D || y >= H) return false;
    const b = m.occ[x + W * (z + D * y)];
    if (b) return !(see && m.pass && m.pass[b]);   // see: 놀이 모드 시선은 풀·잎을 지나간다
    const lv = m.liq[x + W * z];
    return lv >= 0 && y <= lv;
  }
  // 복셀 DDA: p(복셀 좌표)에서 d 방향으로 처음 막히는 거리. 격자 밖에서 시작하면 상자 입구부터 잰다
  function march(m, p, d, see) {
    let t0 = 0;
    for (let q = 0; q < 3; q++) {
      const hi = [W, H, D][q];
      if (Math.abs(d[q]) < 1e-9) { if (p[q] < 0 || p[q] >= hi) return Infinity; continue; }
      const a = (0 - p[q]) / d[q], b = (hi - p[q]) / d[q];
      t0 = Math.max(t0, Math.min(a, b));
    }
    const q0 = [p[0] + d[0] * t0, p[1] + d[1] * t0, p[2] + d[2] * t0];
    let x = Math.floor(q0[0] + d[0] * 1e-4), y = Math.floor(q0[1] + d[1] * 1e-4), z = Math.floor(q0[2] + d[2] * 1e-4);
    const sx = Math.sign(d[0]), sy = Math.sign(d[1]), sz = Math.sign(d[2]);
    const dx = sx ? Math.abs(1 / d[0]) : Infinity, dy = sy ? Math.abs(1 / d[1]) : Infinity, dz = sz ? Math.abs(1 / d[2]) : Infinity;
    let tx = sx ? t0 + (sx > 0 ? x + 1 - q0[0] : q0[0] - x) * dx : Infinity;
    let ty = sy ? t0 + (sy > 0 ? y + 1 - q0[1] : q0[1] - y) * dy : Infinity;
    let tz = sz ? t0 + (sz > 0 ? z + 1 - q0[2] : q0[2] - z) * dz : Infinity;
    let t = t0;
    for (let n = 0; n < 700; n++) {
      if (x < -1 || z < -1 || y < -1 || x > W || z > D || y > H) return Infinity;
      if (solid(m, x, y, z, see)) return t;
      if (tx < ty && tx < tz) { t = tx; x += sx; tx += dx; } else if (ty < tz) { t = ty; y += sy; ty += dy; } else { t = tz; z += sz; tz += dz; }
    }
    return Infinity;
  }
  const camDir = (yaw, pitch) => [Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch), Math.cos(pitch) * Math.cos(yaw)];
  // 상호작용을 가상 시간으로 미리 돌려 부품이 지나갈 자리를 모은다(실제 장면은 건드리지 않는다)
  const mc = new MessageChannel(), mcq = [];
  mc.port1.onmessage = () => { const r = mcq.shift(); if (r) r(); };
  const macro = () => new Promise(r => { mcq.push(r); mc.port2.postMessage(0); });
  async function planAct(a, map) {
    if (a.plan) return a.plan;
    let now = 0, done = false;
    const timers = [], st = {}, seen = {}, bursts = [];
    for (const n in map.props) { const u = map.props[n].userData; st[n] = { off: (u.o.off0 || [0, 0, 0]).slice(), rot: (u.o.rot0 || [0, 0, 0]).slice(), scl: (u.o.scl0 || [1, 1, 1]).slice() }; }
    const later = s => new Promise(r => timers.push({ t: now + (s || 0), r }));
    const mix = (p, q, k) => p.map((v, i) => v + (q[i] - v) * k);
    const note = (n, s) => (seen[n] = seen[n] || []).push({ off: s.off.slice(), rot: s.rot.slice(), scl: s.scl.slice() });
    const R = {
      wait: later,
      tween(n, to, dur) {
        const p = st[n];
        if (!p) return Promise.resolve();
        const e = { off: to.off || p.off, rot: to.rot || p.rot, scl: to.scl || p.scl };
        for (const k of [0, 0.5, 1]) note(n, { off: mix(p.off, e.off, k), rot: mix(p.rot, e.rot, k), scl: mix(p.scl, e.scl, k) });
        return later(dur || 1).then(() => { if (to.off) p.off = to.off.slice(); if (to.rot) p.rot = to.rot.slice(); if (to.scl) p.scl = to.scl.slice(); });
      },
      move: (n, off, d) => R.tween(n, { off }, d), turn: (n, rot, d) => R.tween(n, { rot }, d),
      respawn(n, d) { const p = st[n], o = map.props[n] && map.props[n].userData.o; if (p && o) { p.off = (o.off0 || [0, 0, 0]).slice(); p.rot = (o.rot0 || [0, 0, 0]).slice(); p.scl = (o.scl0 || [1, 1, 1]).slice(); note(n, p); } return later(d || 0.9); },
      unwind() {}, rope: (n, l0, l, d) => R.tween(n, { scl: [1, l / l0, 1] }, d),
      async path(n, pts, dur) { for (const q of pts) await R.tween(n, { off: q.slice(0, 3) }, dur / pts.length); },
      async drive(n, pts, dur, o) { for (const q of pts) await R.tween(n, { off: q.slice(0, 3) }, dur / pts.length); if (o && o.back) await R.respawn(n, o.back); },
      spin(n, m, d) { if (st[n]) note(n, st[n]); return later(d); },
      flash: (n, m, d) => later(d), glow: (m, d) => later(d), lightning() {}, wind: (m, d) => later(d),
      burst(p) { bursts.push(p); },
    };
    Promise.resolve().then(() => a.run(R)).then(() => { done = true; }, () => { done = true; });
    for (let g = 0; g < 600 && !done; g++) {
      await macro();
      if (done || !timers.length) break;
      timers.sort((p, q) => p.t - q.t);
      const tm = timers.shift(); now = tm.t; tm.r();
    }
    const pts = [];
    const rot = (v, r) => {
      let [x, y, z] = v, c = Math.cos(r[2]), s = Math.sin(r[2]);
      [x, y] = [x * c - y * s, x * s + y * c]; c = Math.cos(r[1]); s = Math.sin(r[1]);
      [x, z] = [x * c + z * s, -x * s + z * c]; c = Math.cos(r[0]); s = Math.sin(r[0]);
      return [x, y * c - z * s, y * s + z * c];
    };
    for (const n in seen) {
      const u = map.props[n].userData, pv = u.base;
      for (const s of seen[n]) for (const v of u.samp) {
        const q = rot([v[0] * s.scl[0], v[1] * s.scl[1], v[2] * s.scl[2]], s.rot);
        pts.push([pv[0] + s.off[0] + q[0], pv[1] + s.off[1] + q[1], pv[2] + s.off[2] + q[2]]);
      }
    }
    for (const b of bursts) for (let k = 0; k < 4; k++) pts.push([b[0], b[1] + 0.5 + k, b[2]]);
    if (!pts.length) { const h = a.hit; pts.push([(h[0] + h[3] + 1) / 2, (h[1] + h[4] + 1) / 2, (h[2] + h[5] + 1) / 2]); }
    const step = Math.max(1, Math.floor(pts.length / 260));
    a.plan = pts.filter((p, k) => k % step === 0);
    return a.plan;
  }
  function viewScore(map, pts, yaw, pitch) {
    const d = camDir(yaw, pitch);
    let s = 0;
    for (const p of pts) if (march(map, p, d) === Infinity) s++;
    return s / pts.length;
  }
  // 화면 축: 오른쪽(xa)과 위쪽(ya). 카메라는 d 방향에서 내려다본다
  function screenAxes(yaw, pitch) {
    const d = camDir(yaw, pitch), xa = [Math.cos(yaw), 0, -Math.sin(yaw)];
    return { d, xa, ya: [d[1] * xa[2] - d[2] * xa[1], d[2] * xa[0] - d[0] * xa[2], d[0] * xa[1] - d[1] * xa[0]] };
  }
  async function showAct(a, map, fromList) {
    const pts = await planAct(a, map);
    if (cur !== map || !pts.length) return;
    // 1) 방향: 지금 시점에서 잘 보이면 그대로, 가리면 가장 덜 돌아도 잘 보이는 쪽으로
    let yaw = state.yawT, pitch = state.pitchT;
    const cands = [];
    for (const dp of [0, 0.22, -0.2]) for (const k of [0, 1, -1, 2, -2, 3, -3, 4]) {
      const p2 = Math.max(0.3, Math.min(1.2, pitch + dp));
      cands.push({ yaw: yaw + k * Math.PI / 4, pitch: p2, cost: Math.abs(k) + Math.abs(p2 - pitch) * 5 });
    }
    cands.forEach(c => { c.s = viewScore(map, pts, c.yaw, c.pitch); });
    const best = Math.max(...cands.map(c => c.s)), now = cands[0];
    if (!(now.s >= 0.55 && now.s >= best * 0.8) && best > now.s + 0.12) {
      const ok = cands.filter(c => c.s >= best * 0.85).sort((p, q) => p.cost - q.cost)[0];
      yaw = ok.yaw; pitch = ok.pitch;
    }
    const rel = p => [p[0] - W / 2, p[1] - map.base, p[2] - D / 2];
    // 패널·아래 막대가 가리지 않는 빈 화면(px, 화면 가운데 기준)
    const fr = freeRect(), vh = viewHalf(), wpp0 = 2 * vh / state.zoomT / state.cssH;
    // 2) 지금 화면에서 움직임이 빈 화면 밖으로 나가는지(직접 누른 경우엔 필요할 때만 옮긴다)
    const s0 = screenAxes(state.yawT, state.pitchT), tg = state.targetT;
    const outside = pts.some(p => {
      const c = rel(p), v = [c[0] - tg.x, c[1] - tg.y, c[2] - tg.z];
      const px = (v[0] * s0.xa[0] + v[2] * s0.xa[2]) / wpp0, py = -(v[0] * s0.ya[0] + v[1] * s0.ya[1] + v[2] * s0.ya[2]) / wpp0;
      return px < fr.x0 + 12 || px > fr.x1 - 12 || py < fr.y0 + 12 || py > fr.y1 - 12;
    });
    const turned = yaw !== state.yawT || pitch !== state.pitchT;
    if (!fromList && !turned && !outside) return;
    // 3) 틀: 고른 방향에서 움직임 전체의 화면 투영 범위를 빈 화면 가운데에 맞춘다
    const { d, xa, ya } = screenAxes(yaw, pitch);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, dd = 0;
    for (const p of pts) {
      const c = rel(p), sx = c[0] * xa[0] + c[2] * xa[2], sy = c[0] * ya[0] + c[1] * ya[1] + c[2] * ya[2];
      x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy); dd += c[0] * d[0] + c[1] * d[1] + c[2] * d[2];
    }
    dd /= pts.length;
    const hx = Math.max(4, (x1 - x0) / 2) * 1.3 + 3, hy = Math.max(4, (y1 - y0) / 2) * 1.3 + 3;
    const fit = Math.min((fr.x1 - fr.x0) * vh / (state.cssH * hx), (fr.y1 - fr.y0) * vh / (state.cssH * hy));
    const zoom = fromList ? Math.max(1.1, Math.min(2.4, fit)) : Math.min(state.zoomT, Math.max(0.8, fit));
    const wpp = 2 * vh / zoom / state.cssH, mx = (fr.x0 + fr.x1) / 2, my = (fr.y0 + fr.y1) / 2;
    const cx = (x0 + x1) / 2 - mx * wpp, cy = (y0 + y1) / 2 + my * wpp;
    state.yawT = yaw; state.pitchT = pitch; state.zoomT = zoom;
    state.targetT.set(xa[0] * cx + ya[0] * cy + d[0] * dd, ya[1] * cy + d[1] * dd, xa[2] * cx + ya[2] * cy + d[2] * dd);
  }
  function freeRect() {
    const r = stage.getBoundingClientRect(), cxs = r.left + state.cssW / 2, cys = r.top + state.cssH / 2;
    let x0 = r.left, x1 = r.left + state.cssW, y0 = r.top, y1 = r.top + state.cssH;
    const pn = $('#panel'), bt = $('#bottom');
    if (pn && getComputedStyle(pn).display !== 'none') {
      const q = pn.getBoundingClientRect();
      if (q.left > cxs) x1 = Math.min(x1, q.left - 8); else if (q.top > cys) y1 = Math.min(y1, q.top - 8);
    }
    if (bt) { const q = bt.getBoundingClientRect(); if (q.top > cys) y1 = Math.min(y1, q.top - 4); }
    const ti = $('#title');
    if (ti && isSheet()) { const q = ti.getBoundingClientRect(); if (q.bottom < cys) y0 = Math.max(y0, q.bottom + 4); }
    return { x0: x0 - cxs, x1: x1 - cxs, y0: y0 - cys, y1: y1 - cys };
  }

  // ───── UI ─────
  const CATS = [
    { id: 'dungeon', name: '던전', eyebrow: 'Fate Five Dungeon · Region Atlas' },
    { id: 'village', name: '마을', eyebrow: 'Fate Five · Village Atlas' },
    { id: 'kingdom', name: '왕국', eyebrow: 'Argent Kingdom · Royal Capital' },
    { id: 'magic', name: '마법도시', eyebrow: 'Arcana · City of Magic' },
    { id: 'lands', name: '틈새의 땅', eyebrow: 'The Lands Between · Elden Ring Fan Atlas' },
    { id: 'orario', name: '오라리오', eyebrow: 'Orario · DanMachi Fan Atlas' },
    { id: 'tarkov', name: '타르코프', eyebrow: 'Tarkov · Escape from Tarkov Fan Atlas' },
  ];
  MAPS.forEach(m => { m.cat = m.cat || 'dungeon'; });
  const catMaps = id => MAPS.map((m, i) => i).filter(i => MAPS[i].cat === id && !MAPS[i].sub);
  const cats = $('#cats'), tabs = $('#tabs');
  CATS.forEach(c => {
    if (!catMaps(c.id).length) return;
    const b = document.createElement('button');
    b.className = 'cat'; b.id = 'cat-' + c.id; b.type = 'button';
    b.innerHTML = `${c.name}<span class="cn">${catMaps(c.id).length}</span>`;
    b.addEventListener('click', () => show(state.lastInCat[c.id] != null ? state.lastInCat[c.id] : catMaps(c.id)[0]));
    cats.appendChild(b);
  });
  function renderTabs() {
    cats.querySelectorAll('.cat').forEach(b => b.setAttribute('aria-pressed', String(b.id === 'cat-' + state.cat)));
    tabs.innerHTML = '';
    catMaps(state.cat).forEach((i, k) => {
      const m = MAPS[i], b = document.createElement('button');
      b.className = 'tab'; b.id = 'tab-' + m.id; b.type = 'button'; b.dataset.idx = i;
      b.style.setProperty('--c', m.color);
      b.innerHTML = `<span class="gem" aria-hidden="true"></span><span class="tn">${m.name}</span><span class="tk">${k + 1}</span>`;
      b.addEventListener('click', () => show(i));
      tabs.appendChild(b);
    });
  }
  // 가로로 넘치는 줄에서 고른 버튼이 보이게 (scrollIntoView는 화면 전체를 밀 수 있어 직접 계산)
  function scrollInto(row, el) {
    const l = el.offsetLeft - row.offsetLeft, r = l + el.offsetWidth;
    if (l < row.scrollLeft) row.scrollLeft = l - 8;
    else if (r > row.scrollLeft + row.clientWidth) row.scrollLeft = r - row.clientWidth + 8;
  }
  // 휴대폰에서 정보 시트·보기 설정 닫기
  const isSheet = () => getComputedStyle($('#sheet-toggle')).display !== 'none';
  function closeSheet() {
    $('#panel').classList.remove('open'); $('#sheet-toggle').setAttribute('aria-expanded', 'false');
  }
  function closeOpts() { $('#ctrl').classList.remove('more'); $('#more').setAttribute('aria-expanded', 'false'); }
  function renderInfo() {
    const def = cur.def;
    document.documentElement.style.setProperty('--region', def.color);
    $('#eyebrow').textContent = CATS.find(c => c.id === def.cat).eyebrow;
    $('#en').textContent = def.en;
    $('#name').textContent = def.name;
    $('#desc').textContent = def.desc;
    tabs.querySelectorAll('.tab').forEach(b => {
      const on = +b.dataset.idx === state.idx || (def.parent != null && MAPS[+b.dataset.idx].id === def.parent);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) scrollInto(tabs, b);
    });
    const cb = $('#cat-' + def.cat); if (cb) scrollInto(cats, cb);
    const list = $('#places');
    list.innerHTML = ''; pins.innerHTML = '';
    cur.landmarks.forEach((l, k) => {
      const tag = l.boss ? '<span class="tag boss">BOSS</span>' : l.mid ? '<span class="tag mid">MID</span>' : l.tag ? `<span class="tag key">${l.tag}</span>` : '';
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" class="place" id="place-${k}"><span class="pn">${l.name}${tag}</span><span class="pnote">${l.note}</span></button>`;
      li.firstChild.addEventListener('click', () => { if (isSheet()) closeSheet(); focusOn(l.world); });
      list.appendChild(li);
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.className = 'pin' + (l.boss ? ' is-boss' : l.mid ? ' is-mid' : l.tag ? ' is-key' : '');
      pin.innerHTML = `<span class="pl">${l.name}</span><span class="stem" aria-hidden="true"></span>`;
      pin.addEventListener('click', () => focusOn(l.world));
      pins.appendChild(pin);
      l.el = pin;
    });
    const actList = $('#acts');
    actList.innerHTML = '';
    cur.acts.forEach((a, k) => {
      const li = document.createElement('li');
      li.innerHTML = `<button type="button" class="act${a.goto ? ' go' : ''}" id="act-${k}"><span class="an">${a.name}</span><span class="ah">${a.hint}</span></button>`;
      li.firstChild.addEventListener('click', () => { if (isSheet()) closeSheet(); runAct(a, true); });
      actList.appendChild(li);
      const mk = document.createElement('button');
      mk.type = 'button'; mk.className = 'actpin' + (a.goto ? ' go' : ''); mk.setAttribute('aria-label', a.name);
      mk.innerHTML = '<span aria-hidden="true"></span>';
      mk.addEventListener('click', () => runAct(a));
      mk.addEventListener('pointerenter', ev => showTip(a, ev.clientX, ev.clientY));
      mk.addEventListener('pointerleave', hideTip);
      pins.appendChild(mk);
      a.el = mk;
    });
    $('#acts-sec').hidden = !cur.acts.length;
    const mo = def.monsters;
    const info = mo
      ? { title: '출몰 몬스터', en: 'BESTIARY', rows: [['일반', mo.normal.join(' · ')], ['중간 보스', mo.mid, 'mid'], ['보스', mo.boss, 'boss']] }
      : def.info;
    $('#info-title').textContent = info.title;
    $('#info-en').textContent = info.en;
    $('#mobs').innerHTML = info.rows.map(([k, v, tone]) => `<li><span class="mk ${tone || ''}">${k}</span><span>${v}</span></li>`).join('');
    syncActs();
    syncDisc();
  }
  function syncActs() {
    if (!cur) return;
    cur.acts.forEach((a, k) => {
      const b = document.getElementById('act-' + k);
      if (b) b.setAttribute('aria-busy', a.busy ? 'true' : 'false');
      if (a.el) a.el.classList.toggle('busy', a.busy);
    });
  }
  function focusOn(v, z) {
    state.targetT.set(v.x, v.y - 8, v.z);
    state.zoomT = z || 2;
    state.auto = false; syncToggles();
  }
  function showTip(a, x, y) {
    const r = stage.getBoundingClientRect();
    tip.innerHTML = `<b>${a.name}</b><span>${a.busy ? '움직이는 중' : a.hint}</span>`;
    tip.hidden = false;
    tip.style.transform = `translate(${Math.round(x - r.left + 14)}px, ${Math.round(y - r.top + 14)}px)`;
  }
  function hideTip() { tip.hidden = true; }

  function syncToggles() {
    $('#auto').setAttribute('aria-pressed', state.auto);
    $('#lbl').setAttribute('aria-pressed', state.labels);
    $('#dth').setAttribute('aria-pressed', state.dither);
    document.querySelectorAll('.pxb').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.px === state.px)));
    pins.hidden = !state.labels;
    post.u.dither.value = state.dither ? 1 : 0;
    post.u.levels.value = state.dither ? 20 : 40;
    store.set('auto', state.auto); store.set('labels', state.labels); store.set('dither', state.dither); store.set('px', state.px);
  }
  $('#auto').addEventListener('click', () => { state.auto = !state.auto; syncToggles(); });
  $('#tauto').addEventListener('click', () => { state.time = null; store.set('time', null); applyTime(); });
  $('#tday').addEventListener('click', () => { state.time = 'day'; store.set('time', 'day'); applyTime(); });
  $('#tnight').addEventListener('click', () => { state.time = 'night'; store.set('time', 'night'); applyTime(); });
  $('#lbl').addEventListener('click', () => { state.labels = !state.labels; syncToggles(); });
  $('#dth').addEventListener('click', () => { state.dither = !state.dither; syncToggles(); });
  document.querySelectorAll('.pxb').forEach(b => b.addEventListener('click', () => { state.px = +b.dataset.px; syncToggles(); resize(); }));
  $('#rl').addEventListener('click', () => { state.yawT -= Math.PI / 4; });
  $('#rr').addEventListener('click', () => { state.yawT += Math.PI / 4; });
  $('#zi').addEventListener('click', () => { state.zoomT = Math.min(6, state.zoomT * 1.3); });
  $('#zo').addEventListener('click', () => { state.zoomT = Math.max(0.6, state.zoomT / 1.3); });
  $('#home').addEventListener('click', resetView);
  // 전체 화면: 허용되지 않는 환경(일부 앱 화면 등)에선 조용히 넘어간다
  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  $('#fs').addEventListener('click', () => {
    try {
      if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else { const r = document.documentElement, f = r.requestFullscreen || r.webkitRequestFullscreen; const q = f && f.call(r); if (q && q.catch) q.catch(() => {}); }
    } catch (e) { /* 무시 */ }
  });
  const syncFs = () => { $('#fs').setAttribute('aria-pressed', String(!!fsEl())); setTimeout(resize, 60); };
  document.addEventListener('fullscreenchange', syncFs); document.addEventListener('webkitfullscreenchange', syncFs);
  if (!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen)) $('#fs').hidden = true;
  $('#sheet-toggle').addEventListener('click', () => {
    const open = $('#panel').classList.toggle('open');
    $('#sheet-toggle').setAttribute('aria-expanded', open);
    if (open) closeOpts();
  });
  $('#more').addEventListener('click', () => {
    const open = $('#ctrl').classList.toggle('more');
    $('#more').setAttribute('aria-expanded', open);
    if (open && isSheet()) closeSheet();
  });
  // ───── 소리 조절 창 · 크레딧 · 단추 소리 ─────
  const sndBtn = $('#snd'), sndPop = $('#sndpop');
  function syncSnd() {
    const v = SND.vol;
    ['bgm', 'amb', 'sfx'].forEach(k => {
      const r = $('#vol-' + k), o = $('#vol-' + k + '-o');
      if (r) r.value = String(Math.round(v[k] * 100));
      if (o) o.textContent = String(Math.round(v[k] * 100));
    });
    const m = $('#vol-mute'); if (m) m.setAttribute('aria-pressed', String(v.mute));
    if (sndBtn) { sndBtn.textContent = v.mute ? '🔇' : '🔊'; sndBtn.classList.toggle('muted', v.mute); sndBtn.setAttribute('aria-label', v.mute ? '소리 설정(음소거됨)' : '소리 설정'); }
  }
  function closeSnd() { if (sndPop && !sndPop.hidden) { sndPop.hidden = true; sndBtn.setAttribute('aria-expanded', 'false'); } }
  const toggleMute = () => { SND.setVol('mute', !SND.vol.mute); syncSnd(); };
  if (sndBtn && sndPop) {
    sndBtn.addEventListener('click', () => {
      sndPop.hidden = !sndPop.hidden;
      sndBtn.setAttribute('aria-expanded', String(!sndPop.hidden));
      const A0 = window.AUDIO; $('#snd-note').hidden = !!(A0 && (A0.bgm || A0.sfx || A0.amb));
      if (!sndPop.hidden) { closeOpts(); if (isSheet()) closeSheet(); }
    });
    ['bgm', 'amb', 'sfx'].forEach(k => {
      const r = $('#vol-' + k);
      if (!r) return;
      r.addEventListener('input', () => { SND.setVol(k, +r.value / 100); syncSnd(); });
      if (k === 'sfx') r.addEventListener('change', () => SND.sfx('ui_click', { vol: 0.8 }));
    });
    $('#vol-mute').addEventListener('click', toggleMute);
    document.addEventListener('pointerdown', e => { if (!e.target.closest('#sndw')) closeSnd(); }, true);
  }
  syncSnd();
  function renderCredits() {
    const A0 = window.AUDIO, cr = A0 && Array.isArray(A0.credits) ? A0.credits.filter(c => c && typeof c === 'object') : [];
    const sec = $('#credits-sec'), ul = $('#credits');
    if (!sec || !ul) return;
    sec.hidden = !cr.length;
    const esc = x => String(x == null ? '' : x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    ul.innerHTML = cr.map(c => {
      const t = esc(c.title || c.file || '?'), u = typeof c.url === 'string' && /^https?:\/\//.test(c.url) ? c.url : null;
      return `<li>${u ? `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${t}</a>` : t}${c.author ? ' · ' + esc(c.author) : ''}${c.license ? ' · ' + esc(c.license) : ''}</li>`;
    }).join('');
  }
  renderCredits();
  $('#credits-btn').addEventListener('click', () => {
    const ul = $('#credits'); ul.hidden = !ul.hidden;
    $('#credits-btn').setAttribute('aria-expanded', String(!ul.hidden));
  });
  // 단추 소리: 창을 여닫는 단추는 ui_open, 나머지는 ui_click(동작·놀이 단추는 제 소리가 따로 있음)
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.matches('.act, .actpin, #prompt, #bjump, #bact, #bview, #vol-mute')) { if (b.id === 'vol-mute') SND.sfx('ui_click', { vol: 0.7 }); return; }
    SND.sfx(b.matches('#sheet-toggle, #more, #snd, #credits-btn') ? 'ui_open' : 'ui_click', { vol: 0.6, gap: 0.05 });
  });
  function resetView() {
    if (play.on) { respawn(); return; }
    const def = cur.def;
    state.targetT.set(0, def.camY != null ? def.camY : 6, 0); state.zoomT = def.zoom || 1; state.pitchT = def.pitch || 0.6;
  }
  window.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input,textarea')) return;
    // 한글 입력 상태에서도 되도록 놀이 키는 e.code로 본다
    if (e.code === 'KeyG' && !e.ctrlKey && !e.metaKey && !e.altKey) { setPlay(!play.on); e.preventDefault(); return; }
    if (e.code === 'KeyM' && !e.ctrlKey && !e.metaKey && !e.altKey) { toggleMute(); e.preventDefault(); return; }
    if (play.on) { if (playKey(e, true)) e.preventDefault(); return; }
    const k = e.key.toLowerCase(), list = catMaps(state.cat);
    if (k === 'q') state.yawT -= Math.PI / 4;
    else if (k === 'e') state.yawT += Math.PI / 4;
    else if (k === '+' || k === '=') state.zoomT = Math.min(6, state.zoomT * 1.3);
    else if (k === '-') state.zoomT = Math.max(0.6, state.zoomT / 1.3);
    else if (k === 'r') resetView();
    else if (k.length === 1 && k >= '1' && k <= '9' && list[+k - 1] != null) show(list[+k - 1]);
    else if (k === 'arrowright' || k === 'arrowleft') { const p = list.indexOf(state.idx); show(list[(p + (k === 'arrowright' ? 1 : -1) + list.length) % list.length]); }
    else if (k === 'arrowup' || k === 'arrowdown') {
      const avail = CATS.filter(c => catMaps(c.id).length), ci = avail.findIndex(c => c.id === state.cat);
      const next = avail[(ci + (k === 'arrowdown' ? 1 : -1) + avail.length) % avail.length];
      show(state.lastInCat[next.id] != null ? state.lastInCat[next.id] : catMaps(next.id)[0]);
    } else return;
    e.preventDefault();
  });

  // ───── 포인터: 드래그 회전 · 우클릭/두 손가락 이동 · 휠/핀치 확대 · 클릭 상호작용 ─────
  const ptrs = new Map(), ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), hitV = new THREE.Vector3();
  let dragMode = null, lastPinch = 0, downAt = null, hover = null;
  function pick(cx, cy) {
    if (!cur || !cur.acts.length) return null;
    const r = stage.getBoundingClientRect();
    ndc.set(((cx - r.left) / state.cssW) * 2 - 1, -((cy - r.top) / state.cssH) * 2 + 1);
    ray.setFromCamera(ndc, cam);
    const o = ray.ray.origin, dir = ray.ray.direction;
    const tw = march(cur, [o.x + W / 2, o.y + cur.base, o.z + D / 2], [dir.x, dir.y, dir.z]);
    const wp = isFinite(tw) ? o.clone().addScaledVector(dir, tw + 0.01) : null;
    let best = null, bd = Infinity;
    for (const a of cur.acts) {
      if (!ray.ray.intersectBox(a.box, hitV)) continue;
      const d = hitV.distanceTo(o);
      const inBox = wp && wp.x >= a.box.min.x - 1.5 && wp.x <= a.box.max.x + 1.5 && wp.y >= a.box.min.y - 1.5 && wp.y <= a.box.max.y + 1.5 && wp.z >= a.box.min.z - 1.5 && wp.z <= a.box.max.z + 1.5;
      if (wp && d > tw + 0.75 && !inBox) continue;
      if (d < bd) { bd = d; best = a; }
    }
    return best;
  }
  stage.addEventListener('contextmenu', e => e.preventDefault());
  stage.addEventListener('pointerdown', e => {
    if (e.target.closest('.pin, .actpin')) return;
    if (e.pointerType === 'touch') setTouch();
    if (play.on && play.tp && e.pointerType === 'mouse') { if (document.pointerLockElement) return; lockPointer(); }
    closeOpts(); closeSnd(); if (isSheet()) closeSheet();
    try { stage.setPointerCapture(e.pointerId); } catch (er) { /* 마우스 잠금 중엔 붙잡기 불가 */ }
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragMode = play.on ? (ptrs.size === 2 ? 'pinch' : 'rot') : (e.button === 2 || e.shiftKey || ptrs.size === 2) ? 'pan' : 'rot';
    downAt = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; lastPinch = Math.hypot(a.x - b.x, a.y - b.y); }
  });
  stage.addEventListener('pointermove', e => {
    const p = ptrs.get(e.pointerId);
    if (!p) {
      if (e.pointerType === 'mouse' && !play.on) {
        hover = pick(e.clientX, e.clientY);
        stage.classList.toggle('can-act', !!hover);
        if (hover) showTip(hover, e.clientX, e.clientY); else hideTip();
      }
      return;
    }
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (downAt) downAt.moved += Math.abs(dx) + Math.abs(dy);
    if (downAt && downAt.moved > 4) { stage.classList.add('grab'); hideTip(); }
    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()], dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (lastPinch) { if (play.on) zoomPlay(lastPinch / dist); else state.zoomT = Math.max(0.6, Math.min(6, state.zoomT * dist / lastPinch)); }
      lastPinch = dist; if (!play.on) pan(dx * 0.5, dy * 0.5);
      return;
    }
    if (dragMode === 'pan') pan(dx, dy);
    else {
      state.yawT -= dx * 0.008;
      const pl = pitchLim();
      state.pitchT = Math.max(pl[0], Math.min(pl[1], state.pitchT + dy * 0.005));
      if (Math.abs(dx) > 1 && !play.on) { state.auto = false; syncToggles(); }
    }
  });
  const up = e => {
    const wasClick = downAt && downAt.moved < 5 && performance.now() - downAt.t < 450 && ptrs.size === 1 && e.button !== 2;
    ptrs.delete(e.pointerId);
    if (!ptrs.size) { dragMode = null; stage.classList.remove('grab'); }
    lastPinch = 0;
    if (wasClick && e.type === 'pointerup' && !play.on) { const a = pick(e.clientX, e.clientY); if (a) runAct(a); }
    downAt = null;
  };
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  stage.addEventListener('pointerleave', () => { if (!ptrs.size) { hideTip(); stage.classList.remove('can-act'); } });
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    if (play.on) zoomPlay(Math.exp(e.deltaY * 0.0012));
    else state.zoomT = Math.max(0.6, Math.min(6, state.zoomT * Math.exp(-e.deltaY * 0.0012)));
  }, { passive: false });
  function pan(dx, dy) {
    const s = (2 * viewHalf() / state.zoom) / state.cssH;
    const right = new THREE.Vector3(Math.cos(state.yaw), 0, -Math.sin(state.yaw));
    const fwd = new THREE.Vector3(-Math.sin(state.yaw), 0, -Math.cos(state.yaw));
    state.targetT.addScaledVector(right, -dx * s).addScaledVector(fwd, dy * s / Math.sin(state.pitch));
    state.targetT.x = Math.max(-W / 2, Math.min(W / 2, state.targetT.x));
    state.targetT.z = Math.max(-D / 2, Math.min(D / 2, state.targetT.z));
  }

  // ───── 놀이 모드: 도깨비불 정령이 되어 지도 안을 걸어 다닌다 ─────
  // 좌표는 복셀 단위(p = 발 위치). 충돌은 지도 점유 배열(cur.occ)을 한 칸씩 바로 읽는다
  // 사람 크기: 지도는 대략 2칸 = 1m(탁자·계산대 윗면 2칸, 집 문 4칸, 한 층 5칸). 서면 3.4칸(1.7m), 낮은 문(3칸)에선 2.85칸으로 웅크린다.
  // 폭 0.9칸(1칸 통로도 지남), 눈높이 3.15칸(≈1.6m). 걷기 2.8칸/초(1.4m/s), 달리기 8칸/초(4m/s), 점프 ≈1.1칸, 2단 점프 ≈1.3칸 더
  const PL0 = { r: 0.45, h: 3.4, hStand: 3.4, hCrouch: 2.85, eyeStand: 3.15, eyeCrouch: 2.6, walk: 2.8, run: 8, jump: 7.6, jump2: 8.2, grav: 26, reach: 2.6 };
  const PL = Object.assign({}, PL0);
  // 지도 배율(def.playerScale): 고해상도 지도(1칸 ≈ 25cm)는 2 → 키·폭·속도·점프·중력·팔 길이·카메라 거리를 모두 곱한다
  let PS = 1;
  function applyScale(k) {
    k = k > 0 ? k : 1;
    if (k === PS) return;
    for (const n in PL0) PL[n] = PL0[n] * k;
    play.tpDist *= k / PS; play.tpCur = play.tpDist;
    PS = k;
    pLight.distance = 14 * k;
  }
  const play = {
    on: false, tp: false, lock: false, p: [0, 0, 0], v: [0, 0, 0], ground: false, swim: false, face: 0, faceT: 0, stepVis: 0,
    keys: {}, joy: { x: 0, y: 0, id: null }, near: null, home: null, tpDist: 6, tpCur: 6, eyeS: 3.15, hS: 3.4, saved: null, spawns: {}, view: 'iso', jumpQ: false, air: 0, unlockAt: 0,
    disc: store.get('disc', {}), toastT: 0, cut: 1e5, props: null, ignore: [], ride: null, lastSafe: null,
    wasGround: false, wasWet: false, fallTop: 0, stepAcc: 1, swimAcc: 1,
  };
  const app = $('#app'), promptEl = $('#prompt'), toastEl = $('#toast'), playBtn = $('#play');
  // 정령 모양: 복셀 메셔를 그대로 써서 지도와 같은 결로 만든다
  const avatar = new THREE.Group(), avBody = new THREE.Group(), avFlame = new THREE.Group();
  (function makeAvatar() {
    // 사람 키(약 3.5칸)의 등불 정령: 아래는 불꽃 자락, 위로 갈수록 가늘어지는 몸, 꼭대기에 두건 쓴 얼굴(눈은 눈높이쯤), 머리 위 작은 불꽃
    const S = 0.27;
    const mesh = (grp, defs, sz, fill, off) => {
      const w = new VX.World(defs, 3, null, sz);
      w.base = 0; fill(w, w.id);
      const g = VX.buildGeometry(w);
      [[g.lit, litMat], [g.glow, glowMat]].forEach(([geo, mat]) => {
        if (!geo || !geo.attributes.position.count) return;
        const m = new THREE.Mesh(geo, mat);
        m.position.set(off[0], off[1], off[2]); m.castShadow = true;
        grp.add(m);
      });
    };
    mesh(avBody, {
      low: { c: '#ff9a44', top: '#ffc060', bot: '#e0702e', glow: true, v: 0.05 }, body: { c: '#ffd468', top: '#fff0b4', bot: '#ffb050', glow: true, v: 0.04 },
      hood: { c: '#ffb84e', top: '#ffe08a', bot: '#ff9a44', glow: true, v: 0.04 }, face: { c: '#fff4d8', glow: true, v: 0.01 },
      eye: { c: '#24141e', v: 0 }, cheek: { c: '#ff9a86', glow: true, v: 0 },
    }, [7, 7, 13], (w, B) => {
      const disc = (y, r, b, keep) => { for (let z = 0; z < 7; z++) for (let x = 0; x < 7; x++) { const dx = x - 3, dz = z - 3; if (dx * dx + dz * dz <= r * r && (!keep || keep(dx, dz))) w.set(x, y, z, b); } };
      disc(0, 2.5, B.low, (dx, dz) => dx * dx + dz * dz < 4 || (dx + dz) % 2 !== 0);   // 자락 끝은 불꽃 혀처럼 들쭉날쭉
      disc(1, 2.5, B.low);
      for (let y = 2; y <= 6; y++) disc(y, 2.3 - (y - 2) * 0.12, B.body);
      disc(7, 1.6, B.body);
      w.ellipsoid(3, 10, 3, 2.4, 2.6, 2.4, B.hood);
      for (let y = 9; y <= 11; y++) for (let x = 2; x <= 4; x++) w.set(x, y, 5, B.face);
      w.box(2, 12, 5, 4, 12, 5, B.hood); w.set(1, 11, 5, B.hood); w.set(5, 11, 5, B.hood);   // 두건 챙
      w.set(2, 10, 5, B.eye); w.set(4, 10, 5, B.eye);
      w.set(2, 9, 5, B.cheek); w.set(4, 9, 5, B.cheek);
    }, [-3.5, 0, -3.5]);
    mesh(avFlame, {
      f0: { c: '#ff6a2a', top: '#ff8a3a', glow: true, v: 0.06 }, f1: { c: '#ffa040', glow: true, v: 0.05 },
      f2: { c: '#ffd860', glow: true, v: 0 }, f3: { c: '#fff6c8', glow: true, v: 0 },
    }, [5, 5, 5], (w, B) => {
      w.box(1, 0, 1, 3, 0, 3, B.f0);
      w.set(2, 1, 1, B.f1); w.set(1, 1, 2, B.f1); w.set(3, 1, 2, B.f1); w.set(2, 1, 3, B.f1); w.set(2, 1, 2, B.f2);
      w.set(2, 2, 2, B.f2); w.set(2, 2, 1, B.f1);
      w.set(2, 3, 1, B.f3);
    }, [-2.5, 0, -2.5]);
    avFlame.position.set(0, 12.6, -0.3);
    avBody.add(avFlame);
    avBody.scale.setScalar(S);
    avatar.add(avBody);
    avatar.visible = false;
  })();
  // 정령을 따라다니는 빛(지도 조명 수와 별개로 늘 장면에 있어 셰이더를 다시 만들지 않는다)
  const pLight = new THREE.PointLight(0xffc070, 0, 14, 1.2);
  scene.add(avatar, pLight);
  // 지붕 걷어내기: 정령이 가려지면 머리 위 천장 높이에서 위쪽을 잘라 낸다(수평 절단면 하나를 늘 켜 두고 높이만 바꿔 셰이더를 다시 만들지 않는다)
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e5);
  renderer.clippingPlanes = [clip];
  [glowMat, niteMat].forEach(m => {
    m.clipping = true;
    m.vertexShader = '#include <clipping_planes_pars_vertex>\n' + m.vertexShader.replace(/gl_Position = projectionMatrix \* modelViewMatrix \* vec4\(position,1.0\);/, 'vec4 mvPosition = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mvPosition;\n#include <clipping_planes_vertex>\n');
    m.fragmentShader = '#include <clipping_planes_pars_fragment>\n' + m.fragmentShader.replace('void main(){', 'void main(){\n#include <clipping_planes_fragment>\n');
  });
  const pcam = new THREE.PerspectiveCamera(62, 1, 0.2, 600);
  const TP_RANGE = 900;   // 원근 깊이로 외곽선을 잡을 때 쓰는 배율(가까운 곳만 또렷이)

  // 칸 조회: 바깥 테두리는 벽, 위아래 밖은 빈칸
  function pSolid(x, y, z) {
    if (x < 0 || z < 0 || x >= W || z >= D) return true;
    if (y < 0 || y >= H) return false;
    const b = cur.occ[x + W * (z + D * y)];
    return b !== 0 && !cur.pass[b];
  }
  // 지나갈 수 있는 풀·잎·꽃 블록(지도 블록 이름으로 고른다). 땅으로 쓰는 grass*·moss, 산울타리·덤불, 큰 버섯 줄기는 단단하게 둔다
  const PASS_K = /^(leaf|birchL|fir|pine|needle|flower|lavender|iris|lily|petal|rose|wheat|cabbage|herb|reed|fern|vine|ivy|plant$|veg$|grape|berry)/;
  function passSet(w) {
    const f = new Uint8Array(w.blocks.length);
    for (const k in w.id) { const b = w.blocks[w.id[k]]; if (PASS_K.test(k) && !b.night && !(/^rose/.test(k) && b.glow)) f[w.id[k]] = 1; }
    return f;
  }
  // 몸이 풀·잎 속에 있는지(조금 느려지고 사각사각)
  function inFoliage() {
    const p = play.p, x0 = Math.floor(p[0] - PL.r), x1 = Math.floor(p[0] + PL.r), z0 = Math.floor(p[2] - PL.r), z1 = Math.floor(p[2] + PL.r);
    const y0 = Math.max(0, Math.floor(p[1] + 1e-4)), y1 = Math.min(H - 1, Math.floor(p[1] + PL.h - 1e-4));
    for (let y = y0; y <= y1; y++) for (let z = Math.max(0, z0); z <= Math.min(D - 1, z1); z++) for (let x = Math.max(0, x0); x <= Math.min(W - 1, x1); x++) {
      const b = cur.occ[x + W * (z + D * y)]; if (b && cur.pass[b]) return true;
    }
    return false;
  }
  const liqAt = (x, z) => (x < 0 || z < 0 || x >= W || z >= D) ? -1 : cur.liq[x + W * z];
  function worldHit(x, y, z) {
    const x0 = Math.floor(x - PL.r), x1 = Math.floor(x + PL.r), z0 = Math.floor(z - PL.r), z1 = Math.floor(z + PL.r);
    const y0 = Math.floor(y + 1e-4), y1 = Math.floor(y + PL.h - 1e-4);
    for (let yy = y0; yy <= y1; yy++) for (let zz = z0; zz <= z1; zz++) for (let xx = x0; xx <= x1; xx++) if (pSolid(xx, yy, zz)) return true;
    return false;
  }
  const boxHit = (x, y, z) => worldHit(x, y, z) || !!propHit(x, y, z);

  // ───── 움직이는 부품 충돌·타기 ─────
  // 문·대문·셔터·창살(닫혀 있으면 막고, 열리면 비켜 남)과 탈것(승강기·배·빗자루·수레·비행선)만 단단하다.
  // o.ghost로 빼고 o.solid로 넣을 수 있다. 부품의 복셀 집합(희소 Map)을 그대로 쓰고, 정령 상자의 표본 점을
  // 부품 행렬의 역행렬로 부품 자리로 옮겨 한 칸씩 본다(가까운 부품만, 점 27개)
  const DOOR_N = /door|gate|shut|^port$|portc|hatch|grate|^leaf[NS]$|bridge|^boom$|flap/i;
  const RIDE_N = /lift|basket|boat|skiff|ferry|gond|raft|floe|cart|wagon|coach|airship|broom|^float\d|hover|loco|truck|carriage|kart|^ural$|^el\d$|^b[12]$|fisher/i;
  const NOSOLID = /lid|rope|chain|pulley|bell|orb|beam|bolt/i;
  const DOOR_K = /문|셔터|창살|게이트|차단기|door|gate/i;
  const RIDE_K = /승강|엘리베이터|리프트|빗자루|나룻배|돛배|조각배|어선|(^|\s)배|보트|곤돌라|뗏목|마차|수레|짐차|비행선|기관차|열차|호버|트럭|카트|바구니|유빙/;
  function classifyProps(props, acts) {
    for (const n in props) {
      const u = props[n].userData, o = u.o;
      let x0 = 1e9, y0 = 1e9, z0 = 1e9, x1 = -1e9, y1 = -1e9, z1 = -1e9, cnt = 0;
      const PW = u.vw.W, PD = u.vw.D;
      for (const [i] of u.vw.data) {
        const x = i % PW, z = Math.floor(i / PW) % PD, y = Math.floor(i / (PW * PD));
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); z0 = Math.min(z0, z); z1 = Math.max(z1, z); cnt++;
      }
      u.c = [(x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2, (z0 + z1 + 1) / 2];
      u.R = Math.hypot(x1 - x0 + 1, y1 - y0 + 1, z1 - z0 + 1) / 2;
      u.acts = [];
      u.solid = !o.ghost && cnt >= 4 && (!!o.solid || (!NOSOLID.test(n) && (DOOR_N.test(n) || RIDE_N.test(n))));
    }
    // 동작 이름이 문·탈것이면 그 동작이 움직이는 부품(코드 안 따옴표 이름)도 단단하게
    for (const a of acts) {
      let src = ''; try { src = String(a.run); } catch (e) { /* 무시 */ }
      const names = new Set(); src.replace(/['"`]([A-Za-z_]\w*)['"`]/g, (m0, q) => { if (props[q]) names.add(q); return m0; });
      const door = DOOR_K.test(a.name), ride = RIDE_K.test(a.name + ' ' + (a.hint || ''));
      names.forEach(q => {
        const u = props[q].userData;
        u.acts.push(a);
        if (!u.o.ghost && (door || ride) && !NOSOLID.test(q) && u.vw.data.size >= 6) u.solid = true;
      });
    }
  }
  const tmpV3 = new THREE.Vector3();
  // 이번 걸음에 볼 부품: 단단하고, 보이고(크기 0 아님), 정령 가까이
  function nearProps() {
    const out = [], p = play.p;
    for (const n in cur.props) {
      const pv = cur.props[n], u = pv.userData;
      if (!u.solid) continue;
      const sc = pv.scale;
      if (Math.abs(sc.x) < 0.05 || Math.abs(sc.y) < 0.05 || Math.abs(sc.z) < 0.05) continue;
      pv.updateMatrix();
      tmpV3.set(u.c[0] - u.base[0], u.c[1] - u.base[1], u.c[2] - u.base[2]).applyMatrix4(pv.matrix);
      if (Math.hypot(tmpV3.x - p[0], tmpV3.y - p[1] - 0.75, tmpV3.z - p[2]) > u.R * Math.max(sc.x, sc.y, sc.z) + 4) continue;
      u.inv = (u.inv || new THREE.Matrix4()).copy(pv.matrix).invert();
      out.push(pv);
    }
    return out;
  }
  // 점(복셀 좌표)이 부품 복셀 안인지
  function propPt(u, x, y, z) {
    const e = u.inv.elements, b = u.base;
    const lx = e[0] * x + e[4] * y + e[8] * z + e[12] + b[0], ly = e[1] * x + e[5] * y + e[9] * z + e[13] + b[1], lz = e[2] * x + e[6] * y + e[10] * z + e[14] + b[2];
    return u.vw.get(Math.floor(lx), Math.floor(ly), Math.floor(lz)) !== 0;
  }
  const SX = [-1, 0, 1];
  function propBox(pv, x, y, z, ys) {
    const u = pv.userData;
    for (const fy of ys) for (const fx of SX) for (const fz of SX) if (propPt(u, x + fx * PL.r, y + fy, z + fz * PL.r)) return true;
    return false;
  }
  // 몸 표본 높이(칸보다 촘촘하게 5단) — 웅크리면 다시 잰다
  const BODY_Y = [0.05, 0, 0, 0, 0], FEET_Y = [-0.08];
  function setH(h) { PL.h = h; for (let k = 1; k < 4; k++) BODY_Y[k] = h * k / 4; BODY_Y[4] = h - 0.05; }
  setH(PL.hStand);
  function propHit(x, y, z) {
    if (!play.props) return null;
    for (const pv of play.props) if (!play.ignore.includes(pv) && propBox(pv, x, y, z, BODY_Y)) return pv;
    return null;
  }
  function propUnder() {
    const p = play.p;
    if (!play.props) return null;
    for (const pv of play.props) if (!play.ignore.includes(pv) && propBox(pv, p[0], p[1], p[2], FEET_Y)) return pv;
    return null;
  }
  const dM = new THREE.Matrix4();
  // 타고 있는 부품이 지난 걸음 뒤로 움직인 만큼(이동 + 회전) 정령도 옮긴다. 맵 밖으로 나가거나 순간 이동(되돌아오기)하면 내려 준다
  function carry() {
    const pv = play.ride, p = play.p;
    if (!pv || !pv.userData.prevM) return;
    const u = pv.userData;
    pv.updateMatrix();
    dM.copy(u.prevM).invert().premultiply(pv.matrix);
    tmpV3.set(p[0], p[1], p[2]).applyMatrix4(dM);
    const jump = Math.hypot(tmpV3.x - p[0], tmpV3.y - p[1], tmpV3.z - p[2]);
    const sc = pv.scale;
    // 되돌아오기(A.respawn)로 순간 이동했거나, 맵 밖으로 나가거나, 사라지면 내려 준다
    if (u.respawns !== u.ridSeen || jump > 16 || tmpV3.x < 1.5 || tmpV3.z < 1.5 || tmpV3.x > W - 1.5 || tmpV3.z > D - 1.5 || tmpV3.y < 0 || Math.abs(sc.x * sc.y * sc.z) < 0.01) { dropOff(); return; }
    p[0] = tmpV3.x; p[1] = tmpV3.y; p[2] = tmpV3.z;
    // 방향: x축 단위 벡터가 돈 만큼 몸도 돈다
    const e = dM.elements, yaw = Math.atan2(-e[2], e[0]);
    if (Math.abs(yaw) > 1e-5) { play.face += yaw; play.faceT += yaw; }
  }
  // 내릴 자리: 마지막으로 딛은 맨땅, 없으면 부품이 처음 놓인 자리 둘레에서 설 곳, 그것도 없으면 출발점
  function dropOff() {
    const pv = play.ride;
    play.ride = null;
    let s = play.lastSafe;
    if (!s && pv) { const c = pv.userData.c; s = standAround(c[0], c[1], c[2]); }
    s = s || play.home;
    if (!s) return;
    placeAt(s, play.face);
    toast('내렸어요');
    spawnBurst([s[0], s[1] + 0.5, s[2]], { n: 18, colors: ['#ffe9a0', '#ffffff'], speed: 1.8, up: 1.6, life: 0.7, gravity: -0.3, spread: 0.6 });
  }
  const colTop = (x, z) => { for (let y = H - 1; y >= 0; y--) { const b = cur.occ[x + W * (z + D * y)]; if (b && !cur.pass[b]) return y; } return -1; };
  // (x,z) 열에서 발 높이 y 근처(가까운 순)에 설 수 있는 자리
  function standNear(x, z, y, span) {
    if (x < 1 || z < 1 || x >= W - 1 || z >= D - 1) return -1;
    for (let k = 0; k <= span * 2; k++) {
      const yy = y + (k & 1 ? (k + 1) >> 1 : -(k >> 1));
      if (yy < 1 || yy >= H - 2) continue;
      if (pSolid(x, yy - 1, z) && liqAt(x, z) < yy) {
        // 몸 폭(배율 2면 1.8칸)이 닿는 칸 모두 비어 있어야 선다
        const r = PL.r - 0.5, x0 = Math.floor(x + 0.5 - PL.r), x1 = Math.floor(x + 0.5 + PL.r), z0 = Math.floor(z + 0.5 - PL.r), z1 = Math.floor(z + 0.5 + PL.r);
        let ok = r < 0 || (x0 >= 0 && z0 >= 0 && x1 < W && z1 < D);
        for (let c = 0; c < Math.ceil(PL.hCrouch) && ok; c++) for (let zz = z0; zz <= z1 && ok; zz++) for (let xx = x0; xx <= x1 && ok; xx++) if (pSolid(xx, yy + c, zz)) ok = false;
        if (ok) return yy;
      }
    }
    return -1;
  }
  // 기본 출발점: def.spawn, 없으면 가운데부터 나선으로 돌며 땅 높이의 평평한 바깥 자리
  function mapSpawn(m) {
    if (m.spawn) return m.spawn;
    const id = m.def.id;
    if (play.spawns[id]) return (m.spawn = play.spawns[id]);
    let s = null;
    if (m.def.spawn) s = [m.def.spawn[0] + 0.5, m.def.spawn[1], m.def.spawn[2] + 0.5];
    const cx = Math.floor(W / 2), cz = Math.floor(D / 2), R = Math.max(W, D) / 2;
    const ok = (x, z, strict) => {
      if (x < 3 || z < 3 || x >= W - 3 || z >= D - 3 || liqAt(x, z) >= 0) return false;
      const t = colTop(x, z);
      if (t < 0 || t >= H - 3) return false;
      if (!strict) return true;
      if (t < m.base - 4 * PS || t > m.base + 5 * PS) return false;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { if (liqAt(x + dx, z + dz) >= 0 || Math.abs(colTop(x + dx, z + dz) - t) > 1) return false; }
      return true;
    };
    for (let pass = 0; pass < 2 && !s; pass++) {
      for (let r = 0; r < R && !s; r++) for (let dz = -r; dz <= r && !s; dz++) for (let dx = -r; dx <= r && !s; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== r) continue;
        const x = cx + dx, z = cz + dz;
        if (ok(x, z, pass === 0)) s = [x + 0.5, colTop(x, z) + 1, z + 0.5];
      }
    }
    s = s || [cx + 0.5, H - 4, cz + 0.5];
    play.spawns[id] = m.spawn = s;
    return s;
  }
  // 상호작용 상자 곁에 설 자리(안쪽 고리부터)
  function standAround(cx, cy, cz) {
    const X = Math.floor(cx), Z = Math.floor(cz), Y = Math.floor(cy);
    for (let d = 1; d <= 12 * PS; d++) for (let dz = -d; dz <= d; dz++) for (let dx = -d; dx <= d; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dz)) !== d) continue;
      const y = standNear(X + dx, Z + dz, Y, 8 * PS);
      if (y >= 0) return [X + dx + 0.5, y, Z + dz + 0.5];
    }
    return null;
  }
  function besideBox(h) {
    const cx = (h[0] + h[3] + 1) / 2, cz = (h[2] + h[5] + 1) / 2;
    for (let d = 1; d <= 8 * PS; d++) {
      let best = null, bs = Infinity;
      for (let z = h[2] - d; z <= h[5] + d; z++) for (let x = h[0] - d; x <= h[3] + d; x++) {
        if (x !== h[0] - d && x !== h[3] + d && z !== h[2] - d && z !== h[5] + d) continue;
        const y = standNear(x, z, h[1], 6 * PS);
        if (y < 0) continue;
        const sc = Math.abs(y - h[1]) * 2 + Math.hypot(x + 0.5 - W / 2, z + 0.5 - D / 2) * 0.02;
        if (sc < bs) { bs = sc; best = [x + 0.5, y, z + 0.5, Math.atan2(cx - x - 0.5, cz - z - 0.5)]; }
      }
      if (best) return best;
    }
    return null;
  }
  function placeAt(s, face) {
    applyScale(cur.def.playerScale);
    play.p = [s[0], s[1], s[2]]; play.v = [0, 0, 0]; play.stepVis = 0; play.ground = false;
    play.ride = null; play.lastSafe = worldHit(s[0], s[1] - 0.05, s[2]) && !worldHit(s[0], s[1], s[2]) ? [s[0], s[1], s[2]] : null;
    play.props = null; play.ignore = [];
    play.fallTop = s[1]; play.wasGround = true; play.wasWet = false;
    play.face = play.faceT = face != null ? face : Math.atan2(W / 2 - s[0], D / 2 - s[2]);
    const w = toW(play.p);
    setH(PL.hStand); play.eyeS = PL.eyeStand; play.hS = PL.hStand;
    state.targetT.set(w.x, w.y + play.eyeS, w.z); state.target.copy(state.targetT);
    play.tpCur = play.tpDist;
  }
  const toW = p => new THREE.Vector3(p[0] - W / 2, p[1] - cur.base, p[2] - D / 2);
  function spawnPlayer(fromId) {
    applyScale(cur.def.playerScale);
    let s = null;
    if (fromId) { const a = cur.acts.find(q => q.goto === fromId); if (a) s = besideBox(a.hit); }
    const home = mapSpawn(cur);
    play.home = s || home;
    placeAt(play.home, s ? s[3] : null);
    if (!play.tp) { state.zoomT = state.zoom = playZoom(); }
    play.near = null; syncPrompt();
  }
  function respawn() {
    if (!cur || !play.home) return;
    play.ride = null;
    placeAt(play.home, play.home[3]);
    spawnBurst([play.p[0], play.p[1] + 0.6, play.p[2]], { n: 26, colors: ['#ffe9a0', '#ffc860', '#ffffff'], speed: 2, up: 2, life: 0.9, gravity: -0.5, spread: 0.8 });
  }
  const playZoom = () => viewHalf() / (11 * PS);
  function zoomPlay(f) {
    if (play.tp) play.tpDist = Math.max(2.5 * PS, Math.min(14 * PS, play.tpDist * f));
    else state.zoomT = Math.max(viewHalf() / 80, Math.min(viewHalf() / 7, state.zoomT / f));
  }

  function setPlay(on) {
    if (!cur || on === play.on) return;
    play.on = on;
    app.classList.toggle('playing', on);
    playBtn.textContent = on ? '지도 보기' : '들어가기';
    playBtn.setAttribute('aria-pressed', String(on));
    play.keys = {}; joyReset();
    if (on) {
      play.saved = { target: state.targetT.clone(), zoom: state.zoomT, pitch: state.pitchT };
      state.pitchT = Math.max(0.45, Math.min(0.8, state.pitchT));
      hideTip(); closeOpts(); if (isSheet()) closeSheet();
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      avatar.visible = true;
      spawnPlayer(null);
    } else {
      setView('iso', true);
      const s = play.saved;
      if (s) { state.targetT.copy(s.target); state.zoomT = s.zoom; state.pitchT = s.pitch; }
      avatar.visible = false; pLight.intensity = 0;
      play.near = null; syncPrompt();
    }
    syncDisc();
    audioScene();
  }
  // 시점: 2.5D(정사영) → 1인칭 → 3인칭 뒤 → 3인칭 앞. 원근 시점은 바라보는 방향 L = -camDir(yaw, pitch)
  const VIEWS = ['iso', 'fp', 'tpb', 'tpf'], VNAME = { iso: '2.5D', fp: '1인칭', tpb: '3인칭 뒤', tpf: '3인칭 앞' };
  const pitchLim = () => !play.on || play.view === 'iso' ? [0.3, 1.2] : play.view === 'fp' ? [-1.553, 1.553] : [-1.2, 1.45];
  function setView(v, quiet) {
    if (play.view === v) return;
    const was = play.view;
    play.view = v; play.tp = v !== 'iso';
    app.dataset.view = v;
    $('#bview').setAttribute('aria-pressed', String(play.tp));
    if (v === 'iso') { unlock(); state.pitchT = 0.6; if (play.on) state.zoomT = playZoom(); }
    else {
      if (was === 'iso') state.pitchT = v === 'fp' ? 0.1 : 0.3;
      state.yaw = state.yawT; state.pitch = state.pitchT = Math.max(pitchLim()[0], Math.min(pitchLim()[1], state.pitchT));
      play.tpCur = play.tpDist;
    }
    if (!quiet) toast(VNAME[v]);
  }
  const setTP = on => setView(on ? 'tpb' : 'iso');
  const cycleView = () => setView(VIEWS[(VIEWS.indexOf(play.view) + 1) % VIEWS.length]);
  // 마우스 잠금(원근 시점에서 클릭): 머리 없는 브라우저나 샌드박스에선 거절될 수 있어 조용히 넘긴다
  function lockPointer() {
    try { const r = stage.requestPointerLock && stage.requestPointerLock(); if (r && r.catch) r.catch(() => {}); } catch (e) { /* 잠금 불가 */ }
  }
  function unlock() { try { if (document.pointerLockElement) document.exitPointerLock(); } catch (e) { /* 무시 */ } }
  document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement) play.unlockAt = performance.now(); app.classList.toggle('locked', !!document.pointerLockElement); });
  document.addEventListener('mousemove', e => {
    if (!play.on || document.pointerLockElement !== stage) return;
    const pl = pitchLim();
    state.yawT -= e.movementX * 0.0026; state.yaw = state.yawT;
    state.pitchT = Math.max(pl[0], Math.min(pl[1], state.pitchT + e.movementY * 0.0026)); state.pitch = state.pitchT;
  });
  function interact() {
    const a = play.near;
    if (!a || a.busy || play.lock) return false;
    runAct(a);
    return true;
  }
  const MOVEKEYS = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'ShiftLeft', 'ShiftRight']);
  function playKey(e, down) {
    const c = e.code;
    if (MOVEKEYS.has(c)) {
      if (down) { if (c === 'Space' && !e.repeat) play.jumpQ = true; play.keys[c] = true; } else delete play.keys[c];
      return true;
    }
    if (!down) return false;
    if (c === 'KeyE') { if (!interact() && !play.tp) state.yawT += Math.PI / 4; }
    else if (c === 'KeyF' || c === 'Enter') interact();
    else if (c === 'KeyQ') state.yawT -= Math.PI / 4;
    else if (c === 'KeyV' || c === 'F5') cycleView();
    else if (c === 'KeyR') respawn();
    // 첫 Esc는 마우스 잠금만 푼다(브라우저가 먼저 풀었으면 그 직후 Esc도 무시)
    else if (c === 'Escape') { if (document.pointerLockElement) unlock(); else if (performance.now() - play.unlockAt > 400) setPlay(false); }
    else if (c === 'Equal' || c === 'NumpadAdd') zoomPlay(1 / 1.25);
    else if (c === 'Minus' || c === 'NumpadSubtract') zoomPlay(1.25);
    else return false;
    return true;
  }
  window.addEventListener('keyup', e => { if (play.on && playKey(e, false)) e.preventDefault(); else delete play.keys[e.code]; });
  window.addEventListener('blur', () => { play.keys = {}; });
  playBtn.addEventListener('click', () => setPlay(!play.on));
  promptEl.addEventListener('click', () => interact());

  // 휴대폰: 왼쪽 가상 조이스틱, 오른쪽 점프·상호작용·시점 단추
  function setTouch() { app.classList.add('touch'); }
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) setTouch();
  const joy = $('#joy'), knob = $('#joy-k');
  function joyReset() { play.joy.x = play.joy.y = 0; play.joy.id = null; knob.style.transform = ''; }
  function joyMove(e) {
    const r = joy.getBoundingClientRect(), R = r.width / 2;
    let dx = (e.clientX - r.left - R) / R, dy = (e.clientY - r.top - R) / R;
    const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; }
    play.joy.x = dx; play.joy.y = dy;
    knob.style.transform = `translate(${Math.round(dx * R * 0.6)}px, ${Math.round(dy * R * 0.6)}px)`;
  }
  joy.addEventListener('pointerdown', e => { e.preventDefault(); setTouch(); joy.setPointerCapture(e.pointerId); play.joy.id = e.pointerId; joyMove(e); });
  joy.addEventListener('pointermove', e => { if (e.pointerId === play.joy.id) joyMove(e); });
  ['pointerup', 'pointercancel'].forEach(t => joy.addEventListener(t, e => { if (e.pointerId === play.joy.id) joyReset(); }));
  const hold = (el, code) => {
    el.addEventListener('pointerdown', e => { e.preventDefault(); if (code === 'Space') play.jumpQ = true; play.keys[code] = true; });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => el.addEventListener(t, () => { delete play.keys[code]; }));
  };
  hold($('#bjump'), 'Space');
  $('#bact').addEventListener('click', () => interact());
  $('#bview').addEventListener('click', () => cycleView());

  // 상호작용 안내: 가장 가까운 상호작용 상자(3칸 안)
  function syncPrompt() {
    const a = play.near;
    promptEl.hidden = !a;
    $('#bact').disabled = !a;
    if (!a) return;
    const txt = (a.busy ? '움직이는 중' : a.hint);
    if (promptEl.dataset.k !== a.name + a.busy) {
      promptEl.dataset.k = a.name + a.busy;
      promptEl.innerHTML = `<b><kbd>E</kbd> · ${a.name}</b><span>${txt}</span>`;
      promptEl.classList.toggle('go', !!a.goto);
    }
  }
  // 발견: 처음 12칸 안에 들어온 장소
  function found() { const id = cur.def.id; return (play.disc[id] = play.disc[id] || []); }
  function syncDisc() {
    if (!cur) return;
    const f = found(), n = cur.landmarks.filter(l => f.includes(l.name)).length, all = cur.landmarks.length;
    const el = $('#disc');
    el.textContent = `발견 ${n}/${all}`;
    el.hidden = !(play.on || n) || !all;
    $('#hud-disc').textContent = all ? `발견 ${n}/${all}` : '';
    cur.landmarks.forEach((l, k) => {
      const has = f.includes(l.name);
      if (l.el) l.el.classList.toggle('unfound', !has);
      const b = document.getElementById('place-' + k); if (b) b.classList.toggle('found', has);
    });
  }
  function toast(s) {
    toastEl.textContent = s; toastEl.hidden = false; toastEl.classList.remove('out');
    play.toastT = 2.6;
  }

  // 한 걸음: 입력 → 속도 → 축마다 나눠 움직이며 칸과 부딪힘(한 칸은 저절로 오른다)
  function moveH(q, d) {
    const p = play.p, old = p[q];
    p[q] += d;
    if (!boxHit(p[0], p[1], p[2])) return;
    // 낮은 문틀: 웅크려서 지나간다
    const h0 = PL.h;
    if (h0 > PL.hCrouch) { setH(PL.hCrouch); if (!boxHit(p[0], p[1], p[2])) return; }
    // 한 칸 오르기(땅·물에서, 그리고 점프 중에도 — 점프 + 한 칸으로 두 칸 턱을 오른다)
    if (play.ground || play.swim || play.v[1] > -4) {
      const lim = (play.swim ? 1.35 : 1.05) * PS;
      for (const hh of h0 > PL.hCrouch ? [PL.hStand, PL.hCrouch] : [PL.hCrouch]) {
        setH(hh);
        for (let ny = Math.floor(p[1] + 1e-4) + 1; ny - p[1] <= lim; ny++) {
          if (!boxHit(p[0], ny, p[2])) { play.stepVis -= ny - p[1]; p[1] = ny; return; }
        }
      }
    }
    setH(h0);
    p[q] = old;
  }
  function moveV(d) {
    const p = play.p, old = p[1];
    p[1] += d;
    if (!boxHit(p[0], p[1], p[2])) return;
    if (worldHit(p[0], p[1], p[2])) p[1] = d < 0 ? Math.floor(p[1] + 1e-4) + 1 : Math.floor(p[1] + PL.h) - PL.h - 1e-3;
    else {
      // 부품 윗면·아랫면은 칸 경계가 아니니 옛 자리와 새 자리 사이를 반씩 좁혀 닿는 곳을 찾는다
      let lo = old, hi = p[1];
      for (let k = 0; k < 7; k++) { const m = (lo + hi) / 2; if (boxHit(p[0], m, p[2])) hi = m; else lo = m; }
      p[1] = boxHit(p[0], lo, p[2]) ? old : lo;
    }
    play.v[1] = 0;
  }
  function stepPlay(dt) {
    const p = play.p, v = play.v, K = play.keys;
    // 움직이는 부품: 타고 있으면 같이 옮기고, 지금 몸과 겹친 부품(닫히며 덮친 문 등)은 빠져나갈 때까지 무시
    play.props = nearProps(); play.ignore = [];
    carry();
    if (!play.props) play.props = nearProps();
    // 부품이 몸을 살짝 파고들면(흔들리는 배·올라오는 승강기) 위로 올려 태우고, 깊이 덮치면(닫히는 문) 빠져나갈 때까지 무시
    for (const pv of play.props) {
      if (!propBox(pv, p[0], p[1], p[2], BODY_Y)) continue;
      const lim = (pv === play.ride ? 1.5 : 0.75) * PS;
      let k = 0.125 * PS; while (k <= lim && propBox(pv, p[0], p[1] + k, p[2], BODY_Y)) k += 0.125 * PS;
      if (k <= lim && !worldHit(p[0], p[1] + k, p[2])) { p[1] += k; if (play.v[1] < 0) play.v[1] = 0; } else play.ignore.push(pv);
    }
    // 웅크렸으면 일어설 수 있는지 보고, 끼었으면 먼저 웅크려 본다
    if (PL.h < PL.hStand) { setH(PL.hStand); if (boxHit(p[0], p[1], p[2])) setH(PL.hCrouch); }
    else if (boxHit(p[0], p[1], p[2])) { setH(PL.hCrouch); if (boxHit(p[0], p[1], p[2])) setH(PL.hStand); }
    // 끼었으면 위로 빼고, 안 되면 처음 자리로(타고 있었으면 마지막 안전한 땅으로)
    if (boxHit(p[0], p[1], p[2])) {
      let k = 1; while (k <= 4 * PS && boxHit(p[0], p[1] + k, p[2])) k++;
      if (k <= 4 * PS) p[1] = Math.floor(p[1]) + k; else { if (play.ride) dropOff(); else respawn(); return; }
    }
    let ix = 0, iz = 0;
    if (!play.lock) {
      ix = (K.KeyD || K.ArrowRight ? 1 : 0) - (K.KeyA || K.ArrowLeft ? 1 : 0) + play.joy.x;
      iz = (K.KeyW || K.ArrowUp ? 1 : 0) - (K.KeyS || K.ArrowDown ? 1 : 0) - play.joy.y;
    }
    const il = Math.hypot(ix, iz); if (il > 1) { ix /= il; iz /= il; }
    const sy = Math.sin(state.yaw), cy = Math.cos(state.yaw);
    const mx = ix * cy - iz * sy, mz = -ix * sy - iz * cy;
    const run = K.ShiftLeft || K.ShiftRight || Math.hypot(play.joy.x, play.joy.y) > 0.92;
    // 물: 얕으면 걸어서 건너고, 깊으면 떠서 천천히 헤엄친다. 빛나는 액체(용암·쇳물)는 처음 자리로
    const lv = liqAt(Math.floor(p[0]), Math.floor(p[2])), depth = lv >= 0 ? lv + 0.8 - p[1] : -1;
    if (depth > 0.4 * PS && cur.def.liqGlow) { respawn(); return; }
    play.swim = depth > 1.9 * PS;   // 가슴 넘게 깊으면 헤엄
    const leafy = inFoliage();
    const sp = (run ? PL.run : PL.walk) * (play.swim ? 0.6 : depth > 0.3 * PS ? 0.75 : 1) * (leafy ? 0.85 : 1);
    const acc = Math.min(1, dt * (play.ground || play.swim ? 14 : 5));
    v[0] += (mx * sp - v[0]) * acc; v[2] += (mz * sp - v[2]) * acc;
    if (play.tp) play.faceT = state.yaw + Math.PI;   // 원근 시점: 바라보는 쪽으로 몸을 돌린다
    else if (Math.abs(mx) + Math.abs(mz) > 0.05) play.faceT = Math.atan2(mx, mz);
    if (play.ground) play.air = 0;
    if (!play.lock && (K.Space || play.jumpQ)) {
      if (play.ground) { v[1] = PL.jump; play.ground = false; play.air = 1; SND.sfx('jump', { vol: 0.55 }); }
      else if (play.swim) v[1] = Math.max(v[1], 3 * PS);
      else if (play.jumpQ && play.air < 2) {
        // 2단 점프: 발밑에 반짝이 한 줌
        v[1] = PL.jump2; play.air = 2; SND.sfx('djump', { vol: 0.6 });
        spawnBurst([p[0], p[1] + 0.1, p[2]], { n: 22, colors: ['#fff4c4', '#ffd468', '#ffffff', '#ffa04a'], speed: 2.4, up: -0.6, life: 0.6, gravity: 1.5, spread: 0.5, flat: true });
      }
    }
    play.jumpQ = false;
    if (play.swim) { v[1] += (-PL.grav * 0.15 + (depth - 2.3 * PS) * 7) * dt; v[1] *= Math.pow(0.15, dt); }
    else v[1] = Math.max(-30 * PS, v[1] - PL.grav * dt);
    const n = Math.max(1, Math.ceil(Math.max(Math.abs(v[0]), Math.abs(v[1]), Math.abs(v[2])) * dt / (0.25 * PS)));
    for (let i = 0; i < n; i++) { moveH(0, v[0] * dt / n); moveH(2, v[2] * dt / n); moveV(v[1] * dt / n); }
    const under = v[1] <= 0.01 ? propUnder() : null;
    play.ground = v[1] <= 0.01 && (worldHit(p[0], p[1] - 0.05, p[2]) || !!under);
    if (p[1] < -3) { if (play.ride || play.lastSafe) dropOff(); else respawn(); return; }
    // 발밑이 부품이면 탄다(다음 걸음에 그 부품이 움직인 만큼 따라감)
    play.ride = under;
    if (under) { const u = under.userData; under.updateMatrix(); u.prevM = (u.prevM || new THREE.Matrix4()).copy(under.matrix); u.ridSeen = u.respawns; }
    else if (play.ground && depth <= 0.1 && worldHit(p[0], p[1] - 0.05, p[2])) play.lastSafe = p.slice();
    footAudio(dt, depth, run);
    // 풀·잎을 헤치고 가면 가끔 사각사각
    if (leafy) { play.rustle = (play.rustle || 0) + Math.hypot(v[0], v[2]) * dt; if (play.rustle > 2.2) { play.rustle = 0; SND.sfx('step_grass', { vol: 0.22, rate: 1.15 + Math.random() * 0.2, gap: 0.3 }); } } else play.rustle = 1.6;
    play.stepVis *= Math.pow(0.0005, dt);
    let da = play.faceT - play.face; da = ((da + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
    play.face += da * Math.min(1, dt * 12);
    // 몸: 둥실 떠서 흔들리고, 달리면 앞으로 기운다. 불꽃은 일렁인다
    const w = toW(p), bob = reduced ? 0 : Math.sin(t * 3.2) * 0.06 * PS, spd = Math.hypot(v[0], v[2]);
    const ek = Math.min(1, dt * 10);
    play.hS += (PL.h - play.hS) * ek; play.eyeS += ((PL.h < PL.hStand ? PL.eyeCrouch : PL.eyeStand) - play.eyeS) * ek;
    avatar.position.set(w.x, w.y + play.stepVis + 0.08 * PS + bob, w.z);
    avatar.rotation.y = play.face;
    avatar.scale.set(PS, PS * play.hS / PL.hStand, PS);   // 웅크리면 납작
    avBody.rotation.x = Math.min(0.12, spd * 0.012 / PS);
    avFlame.scale.set(1 + Math.sin(t * 11) * 0.08, 1 + Math.sin(t * 13) * 0.16 + Math.sin(t * 7.3) * 0.1, 1);
    avFlame.rotation.z = Math.sin(t * 5) * 0.12; avFlame.rotation.x = -Math.min(0.4, spd * 0.05);
    pLight.position.set(w.x, w.y + play.stepVis + play.hS * 0.6, w.z);
    pLight.intensity = (effTime() === 'night' ? 1.7 : 0.45) * (1 + Math.sin(t * 9) * 0.06 + Math.sin(t * 23) * 0.04);
    state.targetT.set(w.x, w.y + play.stepVis + play.eyeS, w.z);   // 카메라 목표 = 눈높이
    // 가까운 상호작용
    // 팔 닿는 거리(가슴 높이에서 약 1.3m)
    const cx = p[0], cyy = p[1] + PL.h * 0.6, cz = p[2];
    let best = null, bd = PL.reach;
    for (const a of cur.acts) {
      const h = a.hit;
      const dx = Math.max(h[0] - cx, 0, cx - h[3] - 1), dy = Math.max(h[1] - cyy, 0, cyy - h[4] - 1), dz = Math.max(h[2] - cz, 0, cz - h[5] - 1);
      const d = Math.hypot(dx, dy, dz);
      if (d <= bd) { bd = d; best = a; }
    }
    if (play.view === 'fp') { const ai = aimAct(); if (ai) best = ai; }
    if (!best && play.ride && play.ride.userData.acts.length) best = play.ride.userData.acts[0];
    if (best !== play.near || (best && promptEl.dataset.k !== best.name + best.busy)) { play.near = best; syncPrompt(); }
    // 발견
    const f = found();
    for (const l of cur.landmarks) {
      if (f.includes(l.name)) continue;
      if (Math.hypot(l.p[0] - cx, l.p[2] - cz) <= 12 * PS && Math.abs(l.p[1] - cyy) <= 18 * PS) {
        f.push(l.name); store.set('disc', play.disc); toast('발견: ' + l.name); syncDisc(); SND.sfx('discover', { vol: 0.75, gap: 0.6 });
      }
    }
    if (play.toastT > 0) { play.toastT -= dt; if (play.toastT <= 0.4) toastEl.classList.add('out'); if (play.toastT <= 0) toastEl.hidden = true; }
  }
  // 발소리·착지·물소리: 발밑 블록 이름으로 풀·돌·나무·눈을 고르고, 걷는 속도만큼 자주 낸다
  const STEPK = ['step_stone', 'step_grass', 'step_wood', 'step_snow'];
  function stepKey() {
    const p = play.p, y = Math.floor(p[1] - 0.05);
    if (y < 0 || y >= H || !cur.stepT) return STEPK[0];
    for (const [ox, oz] of [[0, 0], [-PL.r, -PL.r], [PL.r, -PL.r], [-PL.r, PL.r], [PL.r, PL.r]]) {
      const x = Math.floor(p[0] + ox), z = Math.floor(p[2] + oz);
      if (x < 0 || z < 0 || x >= W || z >= D) continue;
      const id = cur.occ[x + W * (z + D * y)];
      if (id) return STEPK[cur.stepT[id] || 0];
    }
    return STEPK[0];
  }
  function footAudio(dt, depth, run) {
    const p = play.p, v = play.v, spd = Math.hypot(v[0], v[2]) / PS, wet = depth > 0.4 * PS;
    if (wet && !play.wasWet) SND.sfx('splash', { vol: Math.min(1, 0.4 + Math.max(0, play.fallTop - p[1]) / PS * 0.12), gap: 0.25 });
    play.wasWet = wet;
    if (play.swim) {
      play.fallTop = p[1]; play.stepAcc = 1.2;
      if (spd > 0.6) { play.swimAcc += spd * dt; if (play.swimAcc >= 2.3) { play.swimAcc = 0; SND.sfx('swim', { vol: 0.45 }); } } else play.swimAcc = 1.6;
    } else if (!play.ground) play.fallTop = Math.max(play.fallTop, p[1]);
    else {
      if (!play.wasGround) {
        const drop = (play.fallTop - p[1]) / PS;
        if (drop > 1.5 && !wet) SND.sfx('land', { vol: Math.min(1, 0.4 + drop * 0.06) });
        else if (drop > 0.3) SND.sfx(depth > 0.1 * PS ? 'splash' : stepKey(), { vol: 0.3 });
        play.stepAcc = 0;
      }
      play.fallTop = p[1];
      if (spd > 0.8) {
        play.stepAcc += spd * dt;
        if (play.stepAcc >= 1.75) {
          play.stepAcc = 0;
          SND.sfx(depth > 0.1 * PS ? 'splash' : stepKey(), { vol: (depth > 0.1 * PS ? 0.22 : run ? 0.42 : 0.32), rate: 0.9 + Math.random() * 0.2 });
        }
      } else play.stepAcc = 1.2;
    }
    play.wasGround = play.ground;
  }
  // 2.5D: 정령이 지붕·벽에 가리면 머리 위 천장(없으면 머리 위 4칸)부터 위를 잘라 안이 보이게 한다
  function updateCut() {
    const p = play.p, d = camDir(state.yaw, state.pitch);
    let hid = false;
    for (const hy of [0.6 * PS, PL.h - 0.25 * PS]) { const tt = march(cur, [p[0], p[1] + hy, p[2]], d); if (tt < 120 * PS && tt * d[1] > PL.h + 0.3 * PS - hy) hid = true; }
    let cut = 1e5;
    if (hid) {
      const x = Math.floor(p[0]), z = Math.floor(p[2]), y0 = Math.floor(p[1] + 1e-4);
      cut = y0 + Math.round(6 * PS);
      for (let y = y0 + Math.ceil(PL.h); y <= y0 + 16 * PS; y++) if (pSolid(x, y, z)) { cut = y; break; }
      cut -= cur.base;
    }
    play.cut = cut;
    clip.constant = cut;
  }
  // 원근 시점: 1인칭은 눈높이에서 앞을, 3인칭 뒤·앞은 정령을 바라보며 벽에 막히면 당겨 온다
  function updateTP(dt) {
    const head = state.target.clone();
    const c = camDir(state.yaw, state.pitch), fp = play.view === 'fp';
    // 3인칭 뒤: 오른쪽 어깨 너머(0.8칸 옆, 머리보다 살짝 위)
    if (play.view === 'tpb') { const sh = 0.8 * PS; head.x += Math.cos(state.yaw) * sh; head.z -= Math.sin(state.yaw) * sh; head.y += 0.25 * PS; }
    pcam.aspect = state.rtW / state.rtH;
    pcam.near = fp ? 0.1 : 0.2;
    if (fp) {
      pcam.position.copy(head);
      pcam.lookAt(head.x - c[0], head.y - c[1], head.z - c[2]);
      avatar.visible = false;
    } else {
      const d = play.view === 'tpf' ? [-c[0], -c[1], -c[2]] : c;
      const hit = march(cur, [head.x + W / 2, head.y + cur.base, head.z + D / 2], d, true);
      const want = Math.max(0.5 * PS, Math.min(play.tpDist, hit - 0.4 * PS));
      play.tpCur = want < play.tpCur ? want : play.tpCur + (want - play.tpCur) * Math.min(1, dt * 4);
      pcam.position.set(head.x + d[0] * play.tpCur, head.y + d[1] * play.tpCur, head.z + d[2] * play.tpCur);
      pcam.lookAt(head);
      avatar.visible = play.tpCur > 1.2 * PS;
    }
    pcam.updateProjectionMatrix(); pcam.updateMatrixWorld();
  }
  // 1인칭 겨냥: 십자선 방향 6칸 안, 지형에 가리지 않은 상호작용 상자
  function aimAct() {
    const c = camDir(state.yaw, state.pitch), d = [-c[0], -c[1], -c[2]];
    const o = [pcam.position.x + W / 2, pcam.position.y + cur.base, pcam.position.z + D / 2];
    const wall = march(cur, o, d, true);
    let best = null, bt = 6 * PS;
    for (const a of cur.acts) {
      const h = a.hit;
      let t0 = 0, t1 = Infinity;
      for (let q = 0; q < 3; q++) {
        const lo = h[q], hi = h[q + 3] + 1;
        if (Math.abs(d[q]) < 1e-9) { if (o[q] < lo || o[q] > hi) { t0 = Infinity; break; } continue; }
        let ta = (lo - o[q]) / d[q], tb = (hi - o[q]) / d[q];
        if (ta > tb) [ta, tb] = [tb, ta];
        t0 = Math.max(t0, ta); t1 = Math.min(t1, tb);
      }
      if (t0 <= t1 && t0 <= bt && t0 <= wall + 0.75) { bt = t0; best = a; }
    }
    return best;
  }
  // 원근 카메라도 같은 픽셀 후처리를 거친다(깊이 배율만 바꿔서)
  function renderView(c) {
    if (c === cam) { post.u.outline.value = 1; post.render(scene, cam, t); return; }
    const u = post.u;
    // 원근 깊이는 선형이 아니라 외곽선 검출이 맞지 않으니 원근 시점에선 외곽선을 끈다(디더·안개·빛 번짐은 그대로)
    u.outline.value = 0;
    u.uT.value = t; u.range.value = TP_RANGE;
    u.invVP.value.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse).invert();
    post.draw(scene, c);
  }

  // ───── 크기: 도트 한 칸이 기기 픽셀 정수배가 되도록 ─────
  // 휴대폰 세로는 좌우가 잘리지 않게 조금 물리고, 가로(낮은 화면)는 조금 당긴다
  function viewHalf() {
    if (state.cssW < 720) return W * Math.max(0.86, 0.44 * state.cssH / state.cssW);
    return W * (state.cssH < 520 ? 0.62 : 0.72);
  }
  function resize() {
    const r = stage.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    const dev = Math.max(1, Math.round(state.px * dpr));
    state.rtW = Math.max(16, Math.ceil(r.width * dpr / dev));
    state.rtH = Math.max(16, Math.ceil(r.height * dpr / dev));
    state.cssW = state.rtW * dev / dpr; state.cssH = state.rtH * dev / dpr;
    renderer.setSize(state.rtW, state.rtH, false);
    canvas.style.width = state.cssW + 'px';
    canvas.style.height = state.cssH + 'px';
    post.setSize(state.rtW, state.rtH);
  }
  window.addEventListener('resize', resize);

  // ───── 루프 ─────
  const tmp = new THREE.Vector3(), compass = $('#compass-needle');
  const AX = { x: 0, y: 1, z: 2 };
  let last = performance.now(), t = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now; t += dt;
    SND.tick(Math.min(0.5, Math.max(0, (now - (frame.prevNow || now)) / 1000))); frame.prevNow = now;
    // 상호작용이 움직이는 동안엔 자동 회전을 잠시 멈춘다
    if (state.auto && !play.on && !dragMode && !(cur && cur.acts.some(a => a.busy))) state.yawT += dt * 0.07;
    if (play.on && cur) stepPlay(dt);
    const k = 1 - Math.pow(0.0015, dt);
    const kl = play.on && play.tp ? 1 - Math.pow(1e-7, dt) : k;
    state.yaw += (state.yawT - state.yaw) * kl;
    state.pitch += (state.pitchT - state.pitch) * kl;
    state.zoom += (state.zoomT - state.zoom) * k;
    state.target.lerp(state.targetT, play.on ? 1 - Math.pow(play.tp ? 1e-6 : 2e-5, dt) : k);
    const aspect = state.rtW / state.rtH, vh = viewHalf();
    cam.left = -vh * aspect; cam.right = vh * aspect; cam.top = vh; cam.bottom = -vh;
    cam.zoom = state.zoom;
    cam.position.set(
      state.target.x + Math.cos(state.pitch) * Math.sin(state.yaw) * 340,
      state.target.y + Math.sin(state.pitch) * 340,
      state.target.z + Math.cos(state.pitch) * Math.cos(state.yaw) * 340);
    cam.lookAt(state.target);
    if (play.on && cur && !play.tp) updateCut(); else clip.constant = 1e5;
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();
    if (play.on && cur && play.tp) updateTP(dt);
    const view = play.on && play.tp ? pcam : cam;

    for (let i = tweens.length - 1; i >= 0; i--) {
      const tw = tweens[i];
      tw.t += dt / tw.dur;
      const e = tw.ez(Math.min(1, tw.t));
      if (tw.to.off) for (let q = 0; q < 3; q++) tw.st.off[q] = tw.from.off[q] + (tw.to.off[q] - tw.from.off[q]) * e;
      if (tw.to.rot) for (let q = 0; q < 3; q++) tw.st.rot[q] = tw.from.rot[q] + (tw.to.rot[q] - tw.from.rot[q]) * e;
      if (tw.to.scl) for (let q = 0; q < 3; q++) tw.st.scl[q] = tw.from.scl[q] + (tw.to.scl[q] - tw.from.scl[q]) * e;
      if (tw.t >= 1 || tw.map !== cur) { tweens.splice(i, 1); tw.res(); }
    }
    for (let i = fades.length - 1; i >= 0; i--) {
      const f = fades[i];
      f.t += dt / f.dur;
      const k = Math.min(1, f.t), done = k >= 1 || f.map !== cur;
      f.lit.forEach(m => { m.userData.fade.opacity = k * k * (3 - 2 * k); if (done) m.material = litMat; });
      if (done) { f.other.forEach(m => { m.visible = true; }); fades.splice(i, 1); f.res(); }
    }
    windMul += (windT * windBase - windMul) * Math.min(1, dt * 1.5);
    vortT += dt * windMul;
    if (flash.v > 0.001 || hemi.intensity !== lightBase.hemi) {
      flash.v *= Math.pow(0.002, dt);
      hemi.intensity = lightBase.hemi * (1 + flash.v * 2.2); sun.intensity = lightBase.sun * (1 + flash.v * 1.2);
      if (flash.v < 0.001) { flash.v = 0; hemi.intensity = lightBase.hemi; sun.intensity = lightBase.sun; }
    }
    if (cur) {
      if (cur.liquid) cur.liquid.material.uniforms.uT.value = t;
      cur.lights.forEach(L => {
        const u = L.userData;
        u.mul += (u.mulT - u.mul) * Math.min(1, dt * 4);
        const tf = effTime() === 'night' ? 1 : (u.night ? 0 : 0.3);
        L.intensity = tf * u.base * u.mul * (1 + u.fl * (Math.sin(t * 9 + u.ph) * 0.5 + Math.sin(t * 23.7 + u.ph * 2) * 0.3 + Math.sin(t * 3.1 + u.ph) * 0.2));
      });
      if (!reduced) cur.particles.forEach(p => p.userData.step(dt, t));
      for (const name in cur.props) {
        const p = cur.props[name], u = p.userData, o = u.o, ph = o.phase || 0;
        u.mul += (u.mulT - u.mul) * Math.min(1, dt * 2);
        if (!reduced) u.ang += (o.speed || 0) * u.mul * dt;
        const rk = o.rock && !reduced ? Math.sin(t * (o.rockSpeed || 1) + ph) * o.rock * u.mul : 0;
        const ax = AX[o.axis || 'y'];
        p.rotation.set(u.rot[0] + (ax === 0 ? u.ang + rk : 0), u.rot[1] + (ax === 1 ? u.ang + rk : 0), u.rot[2] + (ax === 2 ? u.ang + rk : 0));
        const bob = o.bob && !reduced ? Math.sin(t * (o.bobSpeed || 1) + ph) * o.bob : 0;
        p.position.set(u.base[0] + u.off[0], u.base[1] + u.off[1] + bob, u.base[2] + u.off[2]);
        p.scale.set(u.scl[0], u.scl[1], u.scl[2]);
      }
      compass.style.transform = `rotate(${state.yaw}rad)`;
      if (state.labels) {
        const place = (v, el, dy) => {
          tmp.copy(v).project(view);
          const x = (tmp.x + 1) / 2 * state.cssW, y = (1 - tmp.y) / 2 * state.cssH;
          el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y + (dy || 0))}px)`;
          el.style.visibility = tmp.x > -1.05 && tmp.x < 1.05 && tmp.y > -1.05 && tmp.y < 1.05 && tmp.z < 1 ? 'visible' : 'hidden';
        };
        cur.landmarks.forEach(l => place(l.world, l.el));
        if (!play.on) cur.acts.forEach(a => place(a.world, a.el));
      }
    }
    stepBurst(dt);
    if (fx) fx.frame(dt, t, view);
    renderView(view);
    requestAnimationFrame(frame);
  }

  // 디버그·검사용 손잡이
  window.__atlas = {
    state, cam, show: i => show(i, true), cur: () => cur, run: k => cur && runAct(cur.acts[k]), travel: id => travel(id), MAPS, freeRect,
    // 놀이 모드 손잡이
    play: on => setPlay(on !== false), tp: on => setTP(on !== false), view: v => setView(v), cycleView, lockPointer, get keys() { return play.keys; }, interact,
    ride: () => play.ride && Object.keys(cur.props).find(n => cur.props[n] === play.ride),
    dbg: () => ({ h: PL.h, eye: play.eyeS, hS: play.hS, PL }),
    passKeys: () => cur ? Object.keys(cur.ids).filter(k => cur.pass[cur.ids[k]]) : [],
    // 검사용: 풀·잎 통과를 잠시 끈다(예전처럼 막히는지 비교)
    passOff: off => { if (!cur) return; if (off) { cur.pass0 = cur.pass0 || cur.pass; cur.pass = new Uint8Array(cur.pass.length); } else if (cur.pass0) cur.pass = cur.pass0; },
    // 검사용: 바닥 바로 위(발 높이)에 key 블록이 n칸 넘게 뭉친 곳 찾기
    findFoliage: (re, minH, maxGap) => { const m = cur, R = new RegExp(re), ids = Object.keys(m.ids).filter(k => R.test(k) && m.pass[m.ids[k]]).map(k => m.ids[k]); const out = [];
      for (let z = 6; z < D - 6; z++) for (let x = 6; x < W - 6; x++) for (let y = H - 2; y > 1; y--) { const b = m.occ[x + W * (z + D * y)]; if (!b) continue;
        if (ids.includes(b)) { let yy = y; while (yy > 0 && ids.includes(m.occ[x + W * (z + D * (yy - 1))])) yy--; let g = yy - 1; while (g > 0 && !m.occ[x + W * (z + D * g)]) g--;
          const under = m.occ[x + W * (z + D * g)]; if (under && !m.pass[under] && y - yy + 1 >= (minH || 1) && yy - g - 1 <= (maxGap || 0)) out.push([x, g + 1, z, y - yy + 1, yy - g - 1]); }
        break; }
      return out; },
    solidProps: () => cur ? Object.keys(cur.props).filter(n => cur.props[n].userData.solid) : [],
    player: () => ({ on: play.on, tp: play.tp, view: play.view, yaw: state.yaw, pitch: state.pitch, air: play.air, locked: !!document.pointerLockElement, p: play.p.slice(), v: play.v.slice(), ground: play.ground, swim: play.swim, near: play.near && play.near.name, home: play.home && play.home.slice(), disc: cur ? found().length : 0, map: cur && cur.def.id }),
    key: (code, down) => { if (down) { if (code === 'Space' && !play.keys.Space) play.jumpQ = true; play.keys[code] = true; } else delete play.keys[code]; },
    tpTo: (x, y, z) => placeAt([x, y, z]), standNear, besideBox, mapSpawn: () => mapSpawn(cur),
    // 느린 기기(소프트웨어 GL) 검사용: 물리를 1/60초씩 sec초만큼 돌린다
    // 소리 검사용
    get audioLog() { return SND.log; }, audio: () => SND.state(), sfx: (k, o) => SND.sfx(k, o), actSfx: a => actSfx(a),
    step: sec => { let top = -Infinity; for (let i = 0; i < Math.round(sec * 60); i++) if (play.on && cur) { stepPlay(1 / 60); top = Math.max(top, play.p[1]); } return top; },
  };

  // 날씨·셰이더 모드(fx.js, 없으면 건너뜀)
  const fx = window.FX ? FX.init({ renderer, scene, post, sun, hemi, litMat, A, flash, state, effTime, viewHalf, cur: () => cur, play: () => play, setWind: v => { windBase = v; } }) : null;

  // ───── 시작 ─────
  resize();
  syncToggles();
  const want = (location.hash || '').slice(1) || store.get('map', MAPS[0].id);
  const startIdx = Math.max(0, MAPS.findIndex(m => m.id === want));
  loading.textContent = MAPS[startIdx].name + ' 지도를 그리는 중';
  setTimeout(() => { apply(startIdx, true); loading.hidden = true; requestAnimationFrame(frame); }, 30);
})();
