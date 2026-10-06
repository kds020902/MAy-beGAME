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

  // ───── 렌더러 ─────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  const post = new VX.PostFX(renderer);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 800);
  const litMat = new THREE.MeshLambertMaterial({ vertexColors: true });
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
      piv.userData = { o, base: pv.slice(), off: (o.off0 || [0, 0, 0]).slice(), rot: (o.rot0 || [0, 0, 0]).slice(), scl: (o.scl0 || [1, 1, 1]).slice(), ang: 0, mul: 1, mulT: 1, samp: surfaceSamples(pr.w, pv, 60) };
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
    const f = def.fog || {};
    const fog = {
      box: [(f.box ? f.box[0] : W / 2) - W / 2, (f.box ? f.box[1] : D / 2) - D / 2, f.box ? f.box[2] : W / 2, f.box ? f.box[3] : D / 2],
      start: f.start != null ? f.start : 0.74, floor: (f.floor != null ? f.floor : base - 8) - base, depth: f.depth || 10,
      haze: f.haze ? [f.haze[0] - base, f.haze[1], f.haze[2]] : null, hazeColor: f.hazeColor,
      top: f.top != null ? f.top - base : 1e4, topDepth: f.topDepth || 18,
    };
    let verts = 0;
    disposables.forEach(d => { if (d.attributes && d.attributes.position) verts += d.attributes.position.count; });
    const entry = { i, def, base, group, liquid, lights, particles, landmarks, props, acts, fog, disposables, occ: w.data, liq: w.liq, W, D, H, verts };
    cache.set(i, entry);
    // 캐시는 4개까지, 큰 지도가 많으면 정점 합계로도 줄인다
    const total = () => { let n = 0; cache.forEach(e => { n += e.verts; }); return n; };
    while (cache.size > 4 || (cache.size > 2 && total() > 4.2e6)) {
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
  }

  // ───── 상호작용 API ─────
  const lightBase = { hemi: 0.6, sun: 0.7 }, flash = { v: 0 };
  let windMul = 1, windT = 1, vortT = 0;
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
      for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].st === u) { const tw = tweens.splice(i, 1)[0]; tw.res(); }
      u.off = (o.off0 || [0, 0, 0]).slice(); u.rot = (o.rot0 || [0, 0, 0]).slice(); u.scl = (o.scl0 || [1, 1, 1]).slice();
      const lit = [], other = [];
      p.traverse(m => { if (m.isMesh) (m.material === litMat || (m.userData.fade && m.material === m.userData.fade) ? lit : other).push(m); });
      lit.forEach(m => { if (!m.userData.fade) { m.userData.fade = litMat.clone(); m.userData.fade.transparent = true; m.userData.fade.depthWrite = false; } m.userData.fade.opacity = 0; m.material = m.userData.fade; });
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
    lightning(k) { flash.v = Math.max(flash.v, k || 1); },
    // 입자 바람·회오리 세기를 잠시 바꾼다
    wind(mul, dur) { windT = mul; return A.wait(dur).then(() => { windT = 1; }); },
  };
  async function runAct(a, fromList) {
    if (a.busy || !cur) return;
    const map = cur;
    a.busy = true; syncActs();
    showAct(a, map, fromList);
    try { await a.run(A); } catch (e) { /* 지도를 바꾸면 중단 */ }
    a.busy = false; if (cur === map) syncActs();
    if (a.goto && cur === map) travel(a.goto);
  }
  // 장소 이동: 잠깐 어두워졌다가 다른 지도로
  async function travel(id) {
    const i = MAPS.findIndex(m => m.id === id);
    if (i < 0) return;
    const fade = $('#fade');
    fade.classList.add('on');
    await A.wait(0.4);
    show(i);
    const t0 = performance.now();
    while (state.idx !== i && performance.now() - t0 < 9000) await A.wait(0.05);
    await A.wait(0.15);
    fade.classList.remove('on');
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
  function solid(m, x, y, z) {
    if (x < 0 || z < 0 || y < 0 || x >= W || z >= D || y >= H) return false;
    if (m.occ[x + W * (z + D * y)]) return true;
    const lv = m.liq[x + W * z];
    return lv >= 0 && y <= lv;
  }
  // 복셀 DDA: p(복셀 좌표)에서 d 방향으로 처음 막히는 거리. 격자 밖에서 시작하면 상자 입구부터 잰다
  function march(m, p, d) {
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
      if (solid(m, x, y, z)) return t;
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
  function resetView() {
    const def = cur.def;
    state.targetT.set(0, def.camY != null ? def.camY : 6, 0); state.zoomT = def.zoom || 1; state.pitchT = def.pitch || 0.6;
  }
  window.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input,textarea')) return;
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
    closeOpts(); if (isSheet()) closeSheet();
    stage.setPointerCapture(e.pointerId);
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragMode = (e.button === 2 || e.shiftKey || ptrs.size === 2) ? 'pan' : 'rot';
    downAt = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; lastPinch = Math.hypot(a.x - b.x, a.y - b.y); }
  });
  stage.addEventListener('pointermove', e => {
    const p = ptrs.get(e.pointerId);
    if (!p) {
      if (e.pointerType === 'mouse') {
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
      if (lastPinch) state.zoomT = Math.max(0.6, Math.min(6, state.zoomT * dist / lastPinch));
      lastPinch = dist; pan(dx * 0.5, dy * 0.5);
      return;
    }
    if (dragMode === 'pan') pan(dx, dy);
    else {
      state.yawT -= dx * 0.008;
      state.pitchT = Math.max(0.3, Math.min(1.2, state.pitchT + dy * 0.005));
      if (Math.abs(dx) > 1) { state.auto = false; syncToggles(); }
    }
  });
  const up = e => {
    const wasClick = downAt && downAt.moved < 5 && performance.now() - downAt.t < 450 && ptrs.size === 1 && e.button !== 2;
    ptrs.delete(e.pointerId);
    if (!ptrs.size) { dragMode = null; stage.classList.remove('grab'); }
    lastPinch = 0;
    if (wasClick && e.type === 'pointerup') { const a = pick(e.clientX, e.clientY); if (a) runAct(a); }
    downAt = null;
  };
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);
  stage.addEventListener('pointerleave', () => { if (!ptrs.size) { hideTip(); stage.classList.remove('can-act'); } });
  stage.addEventListener('wheel', e => {
    e.preventDefault();
    state.zoomT = Math.max(0.6, Math.min(6, state.zoomT * Math.exp(-e.deltaY * 0.0012)));
  }, { passive: false });
  function pan(dx, dy) {
    const s = (2 * viewHalf() / state.zoom) / state.cssH;
    const right = new THREE.Vector3(Math.cos(state.yaw), 0, -Math.sin(state.yaw));
    const fwd = new THREE.Vector3(-Math.sin(state.yaw), 0, -Math.cos(state.yaw));
    state.targetT.addScaledVector(right, -dx * s).addScaledVector(fwd, dy * s / Math.sin(state.pitch));
    state.targetT.x = Math.max(-W / 2, Math.min(W / 2, state.targetT.x));
    state.targetT.z = Math.max(-D / 2, Math.min(D / 2, state.targetT.z));
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
    // 상호작용이 움직이는 동안엔 자동 회전을 잠시 멈춘다
    if (state.auto && !dragMode && !(cur && cur.acts.some(a => a.busy))) state.yawT += dt * 0.07;
    const k = 1 - Math.pow(0.0015, dt);
    state.yaw += (state.yawT - state.yaw) * k;
    state.pitch += (state.pitchT - state.pitch) * k;
    state.zoom += (state.zoomT - state.zoom) * k;
    state.target.lerp(state.targetT, k);
    const aspect = state.rtW / state.rtH, vh = viewHalf();
    cam.left = -vh * aspect; cam.right = vh * aspect; cam.top = vh; cam.bottom = -vh;
    cam.zoom = state.zoom;
    cam.position.set(
      state.target.x + Math.cos(state.pitch) * Math.sin(state.yaw) * 340,
      state.target.y + Math.sin(state.pitch) * 340,
      state.target.z + Math.cos(state.pitch) * Math.cos(state.yaw) * 340);
    cam.lookAt(state.target);
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();

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
    windMul += (windT - windMul) * Math.min(1, dt * 1.5);
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
          tmp.copy(v).project(cam);
          const x = (tmp.x + 1) / 2 * state.cssW, y = (1 - tmp.y) / 2 * state.cssH;
          el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y + (dy || 0))}px)`;
          el.style.visibility = tmp.x > -1.05 && tmp.x < 1.05 && tmp.y > -1.05 && tmp.y < 1.05 ? 'visible' : 'hidden';
        };
        cur.landmarks.forEach(l => place(l.world, l.el));
        cur.acts.forEach(a => place(a.world, a.el));
      }
    }
    stepBurst(dt);
    post.render(scene, cam, t);
    requestAnimationFrame(frame);
  }

  // 디버그·검사용 손잡이
  window.__atlas = { state, cam, show: i => show(i, true), cur: () => cur, run: k => cur && runAct(cur.acts[k]), travel: id => travel(id), MAPS, freeRect };

  // ───── 시작 ─────
  resize();
  syncToggles();
  const want = (location.hash || '').slice(1) || store.get('map', MAPS[0].id);
  const startIdx = Math.max(0, MAPS.findIndex(m => m.id === want));
  loading.textContent = MAPS[startIdx].name + ' 지도를 그리는 중';
  setTimeout(() => { apply(startIdx, true); loading.hidden = true; requestAnimationFrame(frame); }, 30);
})();
