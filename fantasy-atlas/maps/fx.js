// fx.js — 날씨(바람·비·폭풍·눈·눈보라·재·모래바람)와 셰이더 모드(부드러운 빛 번짐·틈새 그늘·색보정·햇빛·물 반짝임·부드러운 그림자)
// app.js가 FX.init(손잡이)로 한 번 부르고, 매 프레임 fx.frame(dt, t, view)를 부른다. 이 파일이 없어도 app.js는 그대로 돈다.
// 날씨 입자는 층마다 THREE.Points/LineSegments 하나: 위치는 정점 셰이더가 시간으로 계산하고(입자별 JS 없음),
// 카메라 둘레 상자 안에서 감아 돌아(wrap) 어디를 보든 밀도가 같다. 지형 높이 지도(텍스처)로 땅·지붕 아래는 숨긴다.
(function () {
  'use strict';
  const KEY = 'f5map2.';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(KEY + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) { /* 저장소 없음 */ } },
  };

  // ───── 날씨 종류 ─────
  const ORDER = [null, 'clear', 'wind', 'rain', 'storm', 'snow', 'blizzard', 'ash', 'sand'];
  const NAME = { clear: '맑음', wind: '바람', rain: '비', storm: '폭풍', snow: '눈', blizzard: '눈보라', ash: '재', sand: '모래바람' };
  // 지도별 기본 날씨(없으면 아래 추측)
  const DEFAULTS = {
    ashen: 'rain', forest: 'clear', cathedral: 'clear', abyss: 'clear', frost: 'blizzard',
    millbrook: 'wind', harbor: 'wind', ironhollow: 'ash', silverleaf: 'clear', harvest: 'wind',
    market: 'clear', elmrow: 'clear', canal: 'clear', castlegate: 'clear', innerkeep: 'clear',
    academy: 'clear', alembic: 'clear', stellaris: 'clear', cogspire: 'clear', lunaris: 'clear',
    leyndell: 'wind', 'leyndell-sub': 'clear', flamepeak: 'blizzard', 'flamepeak-forge': 'ash',
    mohgwyn: 'clear', 'mohgwyn-sub': 'clear', elphael: 'clear', 'elphael-sub': 'snow', farum: 'storm', 'farum-sub': 'storm',
    babel: 'clear', mistress: 'clear', hestia: 'clear', 'hestia-church': 'clear', loki: 'clear', freya: 'clear',
    lexos: 'rain', 'lexos-in': 'clear', groundzero: 'ash', 'groundzero-in': 'clear',
    icebreaker: 'snow', 'icebreaker-in': 'clear', 'icebreaker-gym': 'clear',
    woods: 'rain', 'woods-in': 'clear', interchange: 'wind', 'interchange-in': 'clear',
  };
  function defaultFor(def) {
    if (DEFAULTS[def.id]) return DEFAULTS[def.id];
    const am = window.AUDIO_MAP && window.AUDIO_MAP[def.id];
    if (am && am.indoor) return 'clear';
    const s = ((def.name || '') + ' ' + (def.en || '') + ' ' + def.id).toLowerCase();
    if (/frost|ice|snow|서리|얼음|눈/.test(s)) return 'snow';
    if (/lava|volcan|ash|forge|용암|화산|재/.test(s)) return 'ash';
    if (/storm|폭풍/.test(s)) return 'storm';
    if (/harbor|coast|cliff|항구|해안/.test(s)) return 'wind';
    return 'clear';
  }

  // 층 = [종류, 개수]. fog = [색, 세기, 가까운 거리, 먼 거리], sky = [색, 섞는 비율], sun = 햇빛 남는 비율
  const T = {
    clear: { layers: [], wind: 1, gust: 0.2, fall: 0, dim: 1, sky: null, fog: null, windBase: 1, sun: 1, amb: [] },
    wind: { layers: [['debris', 3200], ['streak', 800]], wind: 10, gust: 0.65, dim: 1, sky: null, fog: null, windBase: 2.0, sun: 1, amb: ['mountain_wind'] },
    rain: { layers: [['rain', 6500], ['splash', 1800]], wind: 3, gust: 0.3, fall: 34, dim: 0.8, sky: ['#59626d', 0.55], fog: ['#78838e', 0.32, 18, 110], windBase: 1.25, sun: 0.12, amb: ['storm@0.5'] },
    storm: { layers: [['rain', 11000], ['splash', 2800], ['streak', 240]], wind: 11, gust: 0.85, fall: 46, dim: 0.62, sky: ['#262c34', 0.78], fog: ['#46505a', 0.42, 12, 90], windBase: 2.4, sun: 0, lightning: [2.5, 8], amb: ['storm'] },
    snow: { layers: [['snow', 5500]], wind: 1.6, gust: 0.3, fall: 2.6, dim: 0.97, sky: ['#cdd5dd', 0.35], fog: ['#dfe6ec', 0.22, 24, 120], windBase: 1, sun: 0.5, amb: ['snow_wind@0.4'] },
    blizzard: { layers: [['snow', 12000], ['streak', 700]], wind: 16, gust: 0.9, fall: 7, dim: 0.9, sky: ['#d8e0e8', 0.7], fog: ['#e6edf3', 0.62, 6, 62], windBase: 2.6, sun: 0.1, amb: ['snow_wind'] },
    ash: { layers: [['ash', 6500], ['ember', 900]], wind: 2.2, gust: 0.4, fall: 1.6, dim: 0.86, sky: ['#4a3430', 0.45], fog: ['#5a4038', 0.26, 20, 110], windBase: 1.2, sun: 0.6, amb: ['lava@0.3', 'mountain_wind@0.4'] },
    sand: { layers: [['dust', 7000], ['streak', 420], ['debris', 500]], wind: 13, gust: 0.7, fall: 0, dim: 0.86, sky: ['#c8a878', 0.65], fog: ['#c4a272', 0.45, 8, 80], windBase: 2.2, sun: 0.3, amb: ['mountain_wind'] },
  };
  const PAL = {
    rain: ['#b4c4d8', '#9fb0c6', '#c8d4e2'], splash: ['#dce8f4', '#b8c8da'], snow: ['#ffffff', '#eef4fa', '#d4e0ec'],
    ash: ['#3e3a38', '#5a5552', '#c8c2bc', '#a8a29c', '#2a2826'], ember: ['#ff8a3a', '#ffb04a', '#ffd070', '#ff6a2a'],
    dust: ['#d8bc88', '#c8a878', '#e8d4a8'], streak: ['#f4f8fa', '#e2ecf2', '#ffffff'], leaves: ['#7aa04a', '#a8c060', '#c8a050', '#e8d8a0', '#5a8a3a'],
  };

  // ───── 정점 셰이더(층 종류마다 MODE) ─────
  const VS = `
    uniform float uT; uniform vec3 uC; uniform vec3 uB; uniform vec3 uOff; uniform vec3 uVel; uniform float uDen;
    uniform sampler2D uHM; uniform vec4 uHMI; uniform float uSize; uniform float uPS; uniform float uPersp; uniform vec3 uTint;
    uniform float uLen; uniform float uH; uniform float uRate; uniform float uSway;
    attribute vec4 rnd; attribute vec3 col; attribute float e;
    varying vec3 vC;
    float ground(vec3 p){
      vec2 q = vec2(p.x + uHMI.x * 0.5, p.z + uHMI.y * 0.5) / uHMI.xy;
      if (q.x < 0.0 || q.y < 0.0 || q.x >= 1.0 || q.y >= 1.0) return -1e4;
      float r = texture2D(uHM, q).r;
      return r < 0.5 / 255.0 ? -1e4 : r * 255.0 - uHMI.z;   // 빈 기둥(허공)에는 내리지 않는다
    }
    vec3 wrapv(vec3 p){ return uC + mod(p - uC + 0.5 * uB, uB) - 0.5 * uB; }
    void main(){
      vC = col * uTint;
      float k = 0.8 + 0.1 * floor(rnd.w * 5.0);
      float big = fract(rnd.w * 3.31);
      gl_PointSize = 1.0;
      if (fract(rnd.w * 7.31 + rnd.x * 3.1) > uDen) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      vec3 p; float g;
    #if MODE == 1
      p = wrapv(rnd.xyz * uB + uOff * k);
      g = ground(p);
      if (p.y < g || g < -1e3) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      if (e > 0.5) p -= normalize(uVel) * uLen * (0.6 + 0.8 * fract(rnd.w * 13.7));
    #elif MODE == 2
      p = rnd.xyz * uB + uOff * k;
      p.x += sin(uT * 1.1 + rnd.w * 40.0) * uSway; p.z += cos(uT * 0.9 + rnd.w * 31.0) * uSway;
      p = wrapv(p);
      g = ground(p);
      if (p.y < g || g < -1e3) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
    #elif MODE == 3
      float cyc = uT * uRate + rnd.w * 17.0, ci = floor(cyc), ph = fract(cyc);
      if (ph > 0.24) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      p = wrapv(vec3(fract(rnd.x + ci * 0.6180339) * uB.x, uC.y, fract(rnd.z + ci * 0.7548777) * uB.z));
      g = ground(p);
      if (g < -1e3) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      p.y = g + 0.06 + ph * 0.8;
      big = ph > 0.1 ? 1.0 : 0.0;
      vC = mix(vC, vec3(1.0), 0.25 * (1.0 - big));
    #elif MODE == 4
      float cyc = uT * uRate + rnd.w * 23.0, ph = fract(cyc);
      if (ph > 0.45) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      p = wrapv(rnd.xyz * uB + uOff * k);
      g = ground(p);
      if (g < -1e3) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      p.y = max(g, uC.y - uB.y * 0.5) + 0.6 + rnd.y * uH;
      if (e > 0.5) p -= normalize(vec3(uVel.x, 0.0, uVel.z) + 1e-4) * uLen * sin(ph / 0.45 * 3.14159) * (0.5 + rnd.z);
    #elif MODE == 5
      p = wrapv(rnd.xyz * uB + uOff * k);
      g = ground(p);
      if (g < -1e3) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      p.y = g + 0.25 + rnd.y * uH + abs(sin(uT * 2.7 * k + rnd.w * 50.0)) * 1.4;
    #else
      p = rnd.xyz * uB + uOff * k;
      p.x += sin(uT * 0.8 + rnd.w * 30.0) * 1.5; p.z += cos(uT * 0.7 + rnd.w * 21.0) * 1.5;
      p = wrapv(p);
      g = ground(p);
      if (p.y < g || g < -1e3) { gl_Position = vec4(0.0, 0.0, -2.0, 1.0); return; }
      vC *= 0.75 + 0.25 * sin(uT * 7.0 + rnd.w * 60.0);
    #endif
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      float s = uSize * (big > 0.82 ? 2.0 : 1.0);
      gl_PointSize = uPersp > 0.5 ? clamp(s * uPS / max(0.5, -mv.z), 1.0, 4.0) : s;
    }`;
  const FS = 'uniform float uA; varying vec3 vC; void main(){ gl_FragColor = vec4(vC, uA); }';
  const MODES = { rain: 1, snow: 2, ash: 2, dust: 2, splash: 3, streak: 4, debris: 5, ember: 6 };
  const LINE = { rain: true, streak: true };

  window.FX = {
    // h = { renderer, scene, post, sun, hemi, litMat, A, flash, state, effTime, cur(), play(), viewHalf(), setWind(v) }
    init(h) {
      const THREE = window.THREE, post = h.post, scene = h.scene, renderer = h.renderer;
      const $ = s => document.querySelector(s);
      const coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
      const lowPower = coarse || (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
      const S = { weather: store.get('weather', null), shader: store.get('shader', !lowPower) };
      if (S.weather && !T[S.weather]) S.weather = null;

      // 지형 높이 지도(지도마다 한 번)
      const hmCache = new WeakMap();
      function heightMap(m) {
        if (hmCache.has(m)) return hmCache.get(m);
        const W = m.W, D = m.D, H = m.H, occ = m.occ, liq = m.liq;
        const data = new Uint8Array(W * D * 4);
        let lo = 1e9, hi = -1e9;
        for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
          let y = H - 1;
          for (; y >= 0; y--) if (occ[x + W * (z + D * y)]) break;
          let top = y + 1;
          const lv = liq ? liq[x + W * z] : -1;
          if (lv >= 0 && lv + 0.8 > top) top = lv + 1;
          top = Math.max(0, Math.min(255, top));
          data[(x + W * z) * 4] = top;
          if (top > 0) { lo = Math.min(lo, top); hi = Math.max(hi, top); }
        }
        const tex = new THREE.DataTexture(data, W, D, THREE.RGBAFormat);
        tex.magFilter = tex.minFilter = THREE.NearestFilter;
        tex.needsUpdate = true;
        if (lo > hi) { lo = m.base; hi = m.base; }
        const r = { tex, lo: lo - m.base, hi: hi - m.base, W, D, base: m.base };
        hmCache.set(m, r);
        return r;
      }

      // ───── 층 ─────
      const layers = {};
      const dummyHM = new THREE.DataTexture(new Uint8Array(4), 1, 1, THREE.RGBAFormat);
      function makeLayer(kind, N) {
        const line = !!LINE[kind], V = line ? N * 2 : N;
        const rnd = new Float32Array(V * 4), col = new Float32Array(V * 3), e = new Float32Array(V), pos = new Float32Array(V * 3);
        const rand = VXrand(kind.length * 977 + N);
        const pal = PAL[kind] || PAL.leaves, c = new THREE.Color();
        for (let i = 0; i < N; i++) {
          const r = [rand(), rand(), rand(), rand()];
          c.set(pal[Math.floor(rand() * pal.length)]);
          for (let j = 0; j < (line ? 2 : 1); j++) {
            const v = line ? i * 2 + j : i;
            rnd.set(r, v * 4); col[v * 3] = c.r; col[v * 3 + 1] = c.g; col[v * 3 + 2] = c.b; e[v] = j;
          }
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        g.setAttribute('rnd', new THREE.BufferAttribute(rnd, 4));
        g.setAttribute('col', new THREE.BufferAttribute(col, 3));
        g.setAttribute('e', new THREE.BufferAttribute(e, 1));
        const u = {
          uT: { value: 0 }, uC: { value: new THREE.Vector3() }, uB: { value: new THREE.Vector3(100, 60, 100) }, uOff: { value: new THREE.Vector3() },
          uVel: { value: new THREE.Vector3(0, -1, 0) }, uDen: { value: 0 }, uHM: { value: dummyHM }, uHMI: { value: new THREE.Vector4(1, 1, 0, 0) },
          uSize: { value: 1 }, uPS: { value: 100 }, uPersp: { value: 0 }, uTint: { value: new THREE.Color(1, 1, 1) },
          uLen: { value: 1.6 }, uH: { value: 6 }, uRate: { value: 1 }, uSway: { value: 0.8 }, uA: { value: kind === 'ember' ? 0.75 : 0.85 },
        };
        const mat = new THREE.ShaderMaterial({ uniforms: u, vertexShader: VS, fragmentShader: FS, defines: { MODE: MODES[kind] } });
        const obj = line ? new THREE.LineSegments(g, mat) : new THREE.Points(g, mat);
        obj.frustumCulled = false; obj.visible = false; obj.renderOrder = 2;
        scene.add(obj);
        return { kind, N, obj, u, off: new THREE.Vector3(), den: 0, want: 0, pal: null };
      }
      function VXrand(seed) { return window.VX && VX.mulberry ? VX.mulberry(seed) : Math.random; }
      function layer(kind, N) {
        let L = layers[kind];
        if (L && L.N < N) { scene.remove(L.obj); L.obj.geometry.dispose(); L.obj.material.dispose(); L = null; }
        if (!L) L = layers[kind] = makeLayer(kind, N);
        return L;
      }
      // 바람 잎사귀 색: 지도의 떠다니는 입자 색을 빌린다
      function setPalette(L, colors) {
        const key = colors.join(',');
        if (L.pal === key) return;
        L.pal = key;
        const a = L.obj.geometry.attributes.col, c = new THREE.Color(), rand = VXrand(31);
        const per = LINE[L.kind] ? 2 : 1;
        for (let i = 0; i < L.N; i++) { c.set(colors[Math.floor(rand() * colors.length)]); for (let j = 0; j < per; j++) { const v = i * per + j; a.array[v * 3] = c.r; a.array[v * 3 + 1] = c.g; a.array[v * 3 + 2] = c.b; } }
        a.needsUpdate = true;
      }

      // 번개 줄기
      const boltPos = new Float32Array(24 * 3);
      const boltGeo = new THREE.BufferGeometry();
      boltGeo.setAttribute('position', new THREE.BufferAttribute(boltPos, 3));
      const bolt = new THREE.LineSegments(boltGeo, new THREE.ShaderMaterial({
        vertexShader: 'void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: 'void main(){ gl_FragColor = vec4(0.92, 0.95, 1.0, 0.75); }',
      }));
      bolt.frustumCulled = false; bolt.visible = false;
      scene.add(bolt);
      function strike(c, B, top, bottom) {
        let x = c.x + (Math.random() - 0.5) * B.x * 0.8, z = c.z + (Math.random() - 0.5) * B.z * 0.8, y = top;
        const step = (top - bottom) / 12;
        for (let i = 0; i < 12; i++) {
          const nx = x + (Math.random() - 0.5) * 4, nz = z + (Math.random() - 0.5) * 4, ny = y - step * (0.7 + Math.random() * 0.6);
          boltPos.set([x, y, z, nx, ny, nz], i * 6);
          x = nx; y = ny; z = nz;
        }
        boltGeo.attributes.position.needsUpdate = true;
        bolt.visible = true;
      }

      // ───── 상태 ─────
      let lastMap = null, lastTime = null, lastType = null, kind = 'clear', amt = 0, typeT = null, nextBolt = 3, boltT = 0, indoor = 0, indoorT = 0, lastAud = '';
      const wdir = new THREE.Vector2(1, 0);
      let gustPh = 0;
      const tmpV = new THREE.Vector3(), cVec = new THREE.Vector3(), bVec = new THREE.Vector3(), sunV = new THREE.Vector3(), col = new THREE.Color(), col2 = new THREE.Color();

      function resolved() { const m = h.cur(); return S.weather || (m ? defaultFor(m.def) : 'clear'); }

      // ───── 셰이더 모드 ─────
      function applyShader() {
        post.setEnhanced(S.shader);
        // 그림자: 켜면 PCF(부드러운 가장자리), 끄면 원래의 기본 그림자
        const type = S.shader ? THREE.PCFShadowMap : THREE.BasicShadowMap;
        if (renderer.shadowMap.type !== type) {
          renderer.shadowMap.type = type;
          h.sun.shadow.radius = S.shader ? 2.2 : 1;
          if (h.sun.shadow.map) { h.sun.shadow.map.dispose(); h.sun.shadow.map = null; }
          h.litMat.needsUpdate = true;
          scene.traverse(o => { if (o.material && o.material.isMeshLambertMaterial) o.material.needsUpdate = true; });
        }
        syncUI();
      }

      // ───── UI ─────
      let wBtn = null, sBtn = null;
      function syncUI() {
        const m = h.cur();
        if (wBtn) {
          wBtn.textContent = '날씨: ' + (S.weather ? NAME[S.weather] : '기본(' + NAME[m ? defaultFor(m.def) : 'clear'] + ')');
          wBtn.setAttribute('aria-pressed', String(!!S.weather));
        }
        if (sBtn) sBtn.setAttribute('aria-pressed', String(S.shader));
      }
      (function ui() {
        const tg = document.querySelector('#opts [aria-label="시간"]');
        if (!tg) return;
        const g = document.createElement('div');
        g.className = 'grp'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', '날씨와 셰이더');
        wBtn = document.createElement('button');
        wBtn.type = 'button'; wBtn.className = 'px-btn lbl-sm'; wBtn.id = 'wx';
        wBtn.title = '날씨 바꾸기: 기본 → 맑음 → 바람 → 비 → 폭풍 → 눈 → 눈보라 → 재 → 모래바람';
        wBtn.addEventListener('click', () => { const i = ORDER.indexOf(S.weather); S.weather = ORDER[(i + 1) % ORDER.length]; store.set('weather', S.weather); syncUI(); });
        sBtn = document.createElement('button');
        sBtn.type = 'button'; sBtn.className = 'px-btn lbl-sm'; sBtn.id = 'shd'; sBtn.textContent = '셰이더';
        sBtn.title = '셰이더 모드: 부드러운 빛 번짐·그늘·색보정·햇빛·물 반짝임·부드러운 그림자';
        sBtn.addEventListener('click', () => { S.shader = !S.shader; store.set('shader', S.shader); applyShader(); });
        g.append(wBtn, sBtn);
        tg.after(g);
      })();

      // 소리(있으면): 날씨에 맞는 환경음 열쇠를 알린다
      function audio(type, k, ind) {
        const p = T[type] || T.clear;
        const detail = { type, amb: p.amb, intensity: k, indoor: ind };
        const sig = type + '|' + Math.round(k * 4) + '|' + (ind ? 1 : 0);
        if (sig === lastAud) return;
        lastAud = sig;
        try { window.dispatchEvent(new CustomEvent('atlas:weather', { detail })); } catch (e) { /* 옛 브라우저 */ }
        try { const au = window.ATLAS_AUDIO || window.AUDIO_ENGINE; if (au && typeof au.setWeather === 'function') au.setWeather(detail); } catch (e) { /* 소리 없음 */ }
      }

      applyShader();

      // ───── 매 프레임 ─────
      function frame(dt, t, view) {
        const m = h.cur();
        if (!m) return;
        const u = post.u, persp = !!view.isPerspectiveCamera, night = h.effTime() === 'night';
        if (m !== lastMap) {
          lastMap = m;
          let hs = 0; for (const ch of m.def.id) hs = (hs * 31 + ch.charCodeAt(0)) | 0;
          const a = ((hs >>> 0) % 628) / 100;
          wdir.set(Math.cos(a), Math.sin(a));
          syncUI();
        }
        // 날씨 바꾸기: 지금 것을 걷어 내고(0.6초) 새것을 들인다(1.5초)
        const want = resolved();
        if (want !== kind) { amt = Math.max(0, amt - dt / 0.6); if (amt <= 0) { kind = want; syncUI(); } }
        else amt = Math.min(1, amt + dt / 1.5);
        const P = T[kind] || T.clear;
        const hm = heightMap(m);

        // 실내(놀이 모드에서 머리 위가 막힘)면 비·눈을 크게 줄인다
        const pl = h.play();
        indoorT = 0;
        if (pl.on) {
          const W = m.W, D = m.D, H = m.H, x = Math.floor(pl.p[0]), z = Math.floor(pl.p[2]);
          if (x >= 0 && z >= 0 && x < W && z < D) for (let y = Math.floor(pl.p[1]) + 2; y < H; y++) if (m.occ[x + W * (z + D * y)]) { indoorT = 1; break; }
        }
        indoor += (indoorT - indoor) * Math.min(1, dt * 3);
        const k = amt * (1 - indoor * 0.75);

        // 바람(돌풍): 세기가 천천히 오르내린다
        gustPh += dt;
        const gust = 1 + P.gust * (0.5 * Math.sin(gustPh * 0.7) + 0.35 * Math.sin(gustPh * 1.9 + 1.3) + 0.15 * Math.sin(gustPh * 4.3));
        const ws = (P.wind || 0) * Math.max(0.15, gust);
        h.setWind(1 + (P.windBase - 1) * amt * Math.max(0.5, gust));

        // 상자: 정사영은 화면에 보이는 땅을, 원근은 카메라 둘레를
        const st = h.state, center = cVec, B = bVec;
        const maxSide = Math.max(m.W, m.D) * 1.35;
        if (persp) {
          center.copy(view.position); B.set(64, 44, 64); center.y += 8;
        } else {
          const vh = h.viewHalf() / Math.max(0.05, st.zoom), hw = vh * (st.rtW / st.rtH);
          const side = Math.max(30, Math.min(maxSide, hw * 2.1));
          center.set(st.target.x, 0, st.target.z);
          const lo = hm.lo - 3, hi = hm.hi + 30;
          center.y = (lo + hi) / 2; B.set(side, hi - lo, side);
        }
        const tint = col.setRGB(1, 1, 1);
        if (night) tint.setRGB(0.5, 0.56, 0.7);
        const pxS = st.rtH / (2 * Math.tan(((view.fov || 60) * Math.PI / 180) / 2));
        const used = {};
        if (kind !== 'clear') for (const [lk, n0] of P.layers) {
          const N = n0;
          const L = layer(lk, N), U = L.u;
          used[lk] = true;
          L.obj.visible = k > 0.001;
          // 정점 셰이더가 쓰는 시간·이동량(감아 돌아도 이어지게 상자 10배마다 접는다)
          let vx = wdir.x * ws, vz = wdir.y * ws, vy = 0;
          let den = 1, len = 1.6, size = 1, hgt = 6, rate = 1, sway = 0.8, ps = 0.12;
          if (lk === 'rain') { vy = -P.fall; vx *= 1; vz *= 1; len = persp ? 1.4 : 2.4; }
          else if (lk === 'snow') { vy = -P.fall; sway = kind === 'blizzard' ? 1.6 : 0.9; ps = 0.1; }
          else if (lk === 'ash') { vy = -P.fall; sway = 1.2; vx *= 0.6; vz *= 0.6; ps = 0.08; }
          else if (lk === 'dust') { vy = -0.4; sway = 0.6; vx *= 1.2; vz *= 1.2; ps = 0.08; }
          else if (lk === 'ember') { vy = 2.4; vx *= 0.3; vz *= 0.3; ps = 0.07; }
          else if (lk === 'splash') { rate = 2.2; ps = 0.06; }
          else if (lk === 'streak') { setPalette(L, kind === 'sand' ? PAL.dust : PAL.streak); vx *= 1.4; vz *= 1.4; len = (kind === 'blizzard' ? 6 : 5) * (persp ? 1 : 1.6); hgt = kind === 'storm' ? 10 : 7; rate = 0.6; }
          else if (lk === 'debris') { vx *= 1.1; vz *= 1.1; hgt = 3; ps = 0.1; size = 1; setPalette(L, debrisColors(m, kind)); }
          L.off.x += vx * dt; L.off.y += vy * dt; L.off.z += vz * dt;
          L.off.x %= B.x * 10; L.off.y %= B.y * 10; L.off.z %= B.z * 10;
          U.uT.value = t % 1000; U.uC.value.copy(center); U.uB.value.copy(B); U.uOff.value.copy(L.off); U.uVel.value.set(vx, vy || -0.001, vz);
          // 덜 보이는 시점(멀리 내려다볼 때)은 그대로, 1인칭은 상자가 작으니 개수를 줄인다
          if (persp) den = lk === 'rain' || lk === 'snow' ? 0.8 : 0.7;
          U.uDen.value = den * k;
          U.uHM.value = hm.tex; U.uHMI.value.set(hm.W, hm.D, hm.base, 1);
          U.uSize.value = size; U.uPersp.value = persp ? 1 : 0; U.uPS.value = pxS * ps;
          U.uLen.value = len; U.uH.value = hgt; U.uRate.value = rate; U.uSway.value = sway;
          U.uTint.value.copy(tint);
          if (lk === 'ember') U.uTint.value.setRGB(1, 1, 1);
        }
        for (const lk in layers) if (!used[lk]) layers[lk].obj.visible = false;

        // 번개
        const fl = h.flash;
        if (P.lightning && amt > 0.5 && !indoorT) {
          nextBolt -= dt;
          if (nextBolt <= 0) {
            nextBolt = P.lightning[0] + Math.random() * (P.lightning[1] - P.lightning[0]);
            h.A.lightning(0.8 + Math.random() * 0.7);
            strike(center, B, center.y + B.y / 2, Math.max(hm.lo, center.y - B.y / 2));
            boltT = 0.18;
            if (Math.random() < 0.4) setTimeout(() => { h.A.lightning(0.6); boltT = 0.12; }, 160);
          }
        }
        boltT -= dt;
        bolt.visible = boltT > 0;

        // 후처리: 날씨 안개·하늘·어둡게·번개
        const kk = amt * (1 - indoor * 0.6);
        if (P.fog && kk > 0) {
          col2.set(P.fog[0]); if (night) col2.multiplyScalar(0.32);
          u.wxFog.value.set(col2.r, col2.g, col2.b, P.fog[1] * kk);
          u.wxRange.value.set(P.fog[2] * (persp ? 0.6 : 2.2), P.fog[3] * (persp ? 0.7 : 1.5));
        } else u.wxFog.value.w = 0;
        if (P.sky && amt > 0) {
          col2.set(P.sky[0]); if (night) col2.multiplyScalar(0.3);
          u.wxSky.value.set(col2.r, col2.g, col2.b, P.sky[1] * amt);
        } else u.wxSky.value.w = 0;
        u.wxDim.value = 1 - (1 - P.dim) * kk;
        u.wxFlash.value = P.lightning ? Math.min(0.9, (fl.v || 0) * 0.5) : 0;
        if (persp) u.wxFocus.value.copy(view.position); else u.wxFocus.value.set(st.target.x, st.target.y, st.target.z);

        // 셰이더 모드 값
        sunV.copy(h.sun.position).normalize();
        const sunK = (night ? 0.35 : 1) * (1 - (1 - P.sun) * amt);
        if (S.shader) {
          u.persp.value = persp ? 1 : 0; u.zNear.value = view.near; u.zFar.value = view.far;
          if (persp) u.eye.value.set(view.position.x, view.position.y, view.position.z, 1);
          else { view.getWorldDirection(tmpV); u.eye.value.set(-tmpV.x, -tmpV.y, -tmpV.z, 0); }
          u.sunDir.value.copy(sunV);
          col2.copy(h.sun.color); if (night) col2.lerp(col.setRGB(0.6, 0.7, 1), 0.5);
          u.sunCol.value.copy(col2).multiplyScalar(sunK);
          u.scatK.value = (persp ? 0.55 : 0.12) * sunK;
          // 해의 화면 위치(원근은 카메라 앞일 때만)
          const sp = tmpV.copy(persp ? view.position : st.target).addScaledVector(sunV, persp ? 400 : 300).project(view);
          const front = persp ? view.getWorldDirection(new THREE.Vector3()).dot(sunV) > 0 : true;
          u.sunUV.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5, front && sunV.y > -0.05 ? sunK * (persp ? 1 : 0.45) : 0);
          u.aoK.value = persp ? 0.3 : 0.38;
          u.bloomK.value = night ? 1.1 : 0.75;
          post.bu.litK.value = night ? 0.45 : 0.15;
          // 색보정: 낮은 따뜻하게, 밤은 차갑게, 궂은 날씨는 채도를 낮춘다
          const wet = (kind === 'rain' || kind === 'storm' || kind === 'blizzard' || kind === 'sand') ? amt : 0;
          if (night) { u.gGain.value.set(0.94, 0.98, 1.08); u.gLift.value.set(0.0, 0.006, 0.022); }
          else if (kind === 'ash' && amt > 0) { u.gGain.value.set(1.08, 0.98, 0.9); u.gLift.value.set(0.018, 0.004, 0); }
          else { u.gGain.value.set(1.05 - wet * 0.07, 1.01, 0.95 + wet * 0.08); u.gLift.value.set(0.01, 0.005, wet * 0.012); }
          u.gSat.value = 1.1 - wet * 0.22; u.gCon.value = 1.06 + (night ? 0.02 : 0);
          u.vig.value = 0.2 + wet * 0.1 + (night ? 0.06 : 0);
        }
        if (m.liquid) {
          const lu = m.liquid.material.uniforms;
          if (lu.uEnh) {
            lu.uEnh.value = S.shader ? 1 : 0;
            if (S.shader) {
              if (persp) lu.uEye.value.set(view.position.x, view.position.y, view.position.z, 1);
              else lu.uEye.value.copy(u.eye.value);
              lu.uSun.value.copy(sunV); lu.uSunC.value.copy(h.sun.color).multiplyScalar(sunK);
              lu.uSkyC.value.copy(u.sky1.value).lerp(u.sky0.value, 0.4);
              lu.uGlint.value = night ? 0.4 : 1 - 0.6 * (kind === 'rain' || kind === 'storm' ? amt : 0);
            }
          }
        }
        audio(kind, amt, indoorT === 1);
        if (kind !== lastType) { lastType = kind; }
      }
      function debrisColors(m, kind) {
        if (kind === 'sand') return PAL.dust;
        const ps = (m.def.particles || []).filter(p => p.mode === 'drift' || p.mode === 'fall');
        const cs = [].concat(...ps.map(p => p.colors || []));
        return cs.length && !(m.def.id === 'millbrook' || m.def.id === 'harbor') ? PAL.leaves.slice(0, 3).concat(cs.slice(0, 4)) : PAL.leaves;
      }

      const api = {
        frame,
        get weather() { return kind; }, get amount() { return amt; },
        setWeather(w) { S.weather = w && T[w] ? w : null; store.set('weather', S.weather); syncUI(); },
        setShader(on) { S.shader = !!on; store.set('shader', S.shader); applyShader(); },
        get shader() { return S.shader; },
        // 검사용: 날씨를 기다리지 않고 바로 바꾼다
        snap(w) { if (w !== undefined) api.setWeather(w); kind = resolved(); amt = 1; syncUI(); },
        defaults: DEFAULTS, defaultFor,
      };
      window.FX.api = api;
      return api;
    },
  };
})();
