// 쇄빙선 조타실(하위 지도) — 「보레아스」 9층 함교 내부. tarkov.dev 평면도를 그대로 옮겼다: 배를 가로지르는 긴 방, 가운데는 들어가고 바깥 날개는 앞으로 나온 앞 창벽,
// 창 밑을 따라 늘어선 조종대와 검은 의자, 해도대, 가운데 조타대, 뒤쪽 해도실(긴 나무 해도대와 모니터 줄), 바깥 날개 갑판과 난간
// 단면 보기: 지붕은 없고, 카메라 쪽(남·동) 벽은 창턱 높이로 낮췄다. 여기서는 뱃머리가 북쪽(창벽이 뒤쪽)이다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 76, Hh = 64;
  MAPS.push({
    id: 'icebreaker-in', cat: 'tarkov', sub: true, parent: 'icebreaker', name: '쇄빙선 조타실', en: 'Icebreaker · Boreas Bridge', color: '#6a9ac0', seed: 653, base: 30, time: 'night', size: [W, D, Hh],
    desc: '「보레아스」 9층 조타실. 배 폭만큼 긴 방의 앞 창 밑으로 조종대와 검은 의자가 늘어서고, 가운데 조타대 앞으로 눈보라 치는 앞갑판이 내려다보인다. 뒤쪽 해도실에는 긴 나무 해도대와 모니터가 줄지어 있고, 바닥에는 서류가 흩어져 있다. 이 그림은 뱃머리를 북쪽(창벽)으로 두고 지붕과 남·동쪽 벽을 걷어 낸 단면이다.',
    info: { title: '장소 정보', en: 'BRIDGE · LEVEL 9', rows: [['층', '9층 · 조타실'], ['앞 창벽', '조종대 · 검은 의자 · 해도대 · 조타대'], ['해도실', '긴 나무 해도대 · 모니터 줄 · 계단 문'], ['날개', '양 끝 조종석 묶음 · 바깥 날개 갑판과 탐조등'], ['단면', '뱃머리는 북쪽 · 지붕과 남·동 벽을 걷어 냄']] },
    sky: ['#1a2638', '#05080f', '#2c4462'], stars: true,
    hemi: ['#b0c4e0', '#1a1e26', 0.62], sun: ['#c0d4f4', 0.45, [0.4, 1, 0.6]],
    day: { sky: ['#a8b4c0', '#6a7c90', '#dce4ea'], stars: false, hemi: ['#e8f0f8', '#4a5462', 0.66], sun: ['#f0f4ff', 0.6, [0.4, 1, 0.6]], haze: '#b8c6d4' },
    fog: { box: [72, 38, 92, 70], start: 0.92, floor: 14, depth: 10, haze: [30, 0.2, 8], hazeColor: '#2a3a50' },
    camY: -6, zoom: 1.9,
    particles: [
      { n: 500, colors: ['#ffffff', '#e4eef8', '#c0d4e8'], mode: 'fall', speed: 0.9, wind: 1.6, y0: 28, y1: 62, glow: false },
    ],
    blocks: {
      floorB: { c: '#9a8a72', top: '#a8987e', v: 0.04, pat: 'floor' }, floorD: { c: '#8a7c66', top: '#958670', v: 0.04 },
      wallI: { c: '#c4c8c4', v: 0.03, pat: 'big' }, wallT: { c: '#8a9096', v: 0.02 }, sWall: { c: '#a8b0b8', v: 0.03, pat: 'big' }, sRoof: { c: '#4a5056', top: '#c4d0da', v: 0.03 },
      mull: { c: '#2a2e34', v: 0.02 }, glassI: { c: '#3a5a78', night: true, day: '#2a4652' }, sill: { c: '#7a5a3a', v: 0.03 },
      deckO: { c: '#4a5250', top: '#5a6460', v: 0.04, pat: 'floor' }, snowD: { c: '#b4c2ce', top: '#e4ecf2', v: 0.04 }, rail: { c: '#9aa0a6', v: 0.03 }, iron: { c: '#2c3036', v: 0.03 },
      cons: { c: '#c8ccc8', top: '#b0b6b4', v: 0.03 }, consD: { c: '#8a9094', v: 0.03 }, scr: { c: '#5ae0c8', glow: true }, scrB: { c: '#4a9aff', glow: true }, scrK: { c: '#1a2228', v: 0.02 },
      btnR: { c: '#ff4a3a', glow: true }, btnG: { c: '#4aff6a', glow: true }, btnY: { c: '#ffd24a', glow: true },
      chair: { c: '#1e2024', v: 0.03 }, chairL: { c: '#34383e', v: 0.03 }, wood: { c: '#c8a878', top: '#d4b688', v: 0.04, pat: 'plank' }, woodD: { c: '#8a6a46', v: 0.04 },
      bookR: { c: '#8a2a2a', v: 0.04 }, bookG: { c: '#2a6a3a', v: 0.04 }, paper: { c: '#e8e8e0', v: 0.02 }, extR: { c: '#c82a24', v: 0.03 },
      doorM: { c: '#d8dcd8', v: 0.02 }, doorF: { c: '#6a7076', v: 0.02 }, exitG: { c: '#3ad06a', glow: true },
      lampC: { c: '#f0f6ff', glow: true }, redL: { c: '#ff3a2a', glow: true }, beamL: { c: '#cfeeff', glow: true }, navW: { c: '#ffffff', glow: true },
      // 이정표(오라리오와 같은 방식)
      stoneG: { c: '#6a7078', v: 0.04 }, timber: { c: '#3a4048', v: 0.03 }, door: { c: '#d8b030', v: 0.03 }, gold: { c: '#3ad06a', v: 0.03 }, mlamp: { c: '#fff0c0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base;
      const lights = [], acts = [], landmarks = [];
      w.hm = new Int16Array(W * D).fill(G);
      // ── 평면도(tarkov.dev 렌더, 픽셀) → 복셀: 9px = 1칸, 평면도를 180° 돌려 앞(뱃머리)을 북쪽으로 ──
      const X0 = 12, ZW = 20;
      const PU = u => X0 + (1240 - u) / 9, PV = v => ZW + (365 - v) / 9;
      const POLY = [[160, 365], [345, 365], [395, 320], [1005, 320], [1055, 365], [1240, 365], [1240, 240], [1060, 165], [885, 165], [885, 40], [510, 40], [510, 165], [340, 165], [160, 240]].map(([u, v]) => [PU(u), PV(v)]);
      const pip = (px, pz) => { let c = false; for (let i = 0, j = POLY.length - 1; i < POLY.length; j = i++) { const [xi, zi] = POLY[i], [xj, zj] = POLY[j]; if ((zi > pz) !== (zj > pz) && px < (xj - xi) * (pz - zi) / (zj - zi) + xi) c = !c; } return c; };
      const IN = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) IN[x + W * z] = pip(x + 0.5, z + 0.5) ? 1 : 0;
      const inR = (x, z) => x >= 0 && z >= 0 && x < W && z < D && IN[x + W * z] === 1;
      const alcove = (x, z) => x >= PU(895) && x <= PU(500) && z >= PV(170);
      const P = (u, v) => [Math.round(PU(u)), Math.round(PV(v))];

      // ── 아래 층 덩어리(8층 지붕)와 바깥 날개 갑판 ──
      const isDeck = (x, z) => (z >= 13 && z <= 34 && x >= 5 && x <= 138) || (z >= 13 && z <= 44 && (x <= 11 || x >= 132));
      const RF = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { let k = 0; for (let dz = -4; dz <= 4 && !k; dz++) for (let dx = -4; dx <= 4; dx++) if (inR(x + dx, z + dz)) { k = 1; break; } RF[x + W * z] = k; }
      const isRoof = (x, z) => x >= 0 && z >= 0 && x < W && z < D && RF[x + W * z] === 1;
      const solid = (x, z) => isDeck(x, z) || isRoof(x, z);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const deck = isDeck(x, z), roof = isRoof(x, z);
        if (!deck && !roof && !inR(x, z)) continue;
        for (let y = G - 8; y < G; y++) w.set(x, y, z, B.sWall);
        w.set(x, G, z, inR(x, z) ? (hash3(x, 1, z) > 0.93 ? B.floorD : B.floorB) : (w.noise.fbm(x * 0.12, z * 0.12) > 0.5 || hash3(x, 3, z) > 0.85 ? B.snowD : B.deckO));
      }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {                       // 바깥 가장자리 난간, 아래층 창
        if (!solid(x, z) || inR(x, z)) continue;
        const edge = !solid(x + 1, z) || !solid(x - 1, z) || !solid(x, z - 1) || !solid(x, z + 1);
        if (!edge) continue;
        if (x % 3 === 0 || z % 3 === 0) w.set(x, G + 1, z, B.rail); w.set(x, G + 2, z, B.rail);
        if ((x + z) % 4 < 2) w.set(x, G - 4, z, B.glassI);
      }

      // ── 벽: 방 둘레. 북·서쪽 벽은 천장 높이(창 띠), 남·동쪽 벽은 창턱 높이로 낮춘 단면 ──
      const WH = 11, WIN0 = 4, WIN1 = 9;
      const BRK = [55, 59];                                                           // 깨진 창
      for (let z = 1; z < D - 1; z++) for (let x = 1; x < W - 1; x++) {
        if (inR(x, z)) continue;
        let adj = false; for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (inR(x + dx, z + dz)) adj = true;
        if (!adj) continue;
        const low = inR(x, z - 1) || inR(x - 1, z) || (inR(x - 1, z - 1) && !inR(x + 1, z + 1));
        const al = alcove(x, z) || (z >= PV(170) - 1 && x >= PU(895) - 1 && x <= PU(500) + 1);
        const h = low ? 2 : WH;
        for (let y = G + 1; y <= G + h; y++) {
          let b = y === G + h ? B.wallT : B.wallI;
          if (!low && !al && y >= G + WIN0 && y <= G + WIN1) b = (y === G + WIN0 || y === G + WIN1 || (x + z) % 5 === 0) ? B.mull : B.glassI;
          if (!low && !al && y === G + WIN0 - 1) b = B.sill;
          if (!low && z < 30 && x >= BRK[0] && x <= BRK[1] && y > G + WIN0 && y < G + WIN1 && hash3(x, y, 2) > 0.3) b = 0;
          w.set(x, y, z, b);
        }
        if (low) w.set(x, G + 2, z, al ? B.wallT : B.sill);
      }
      for (let x = BRK[0] - 1; x <= BRK[1] + 2; x++) for (let z = 26; z <= 29; z++) if (inR(x, z) && hash3(x, 5, z) > 0.35) w.set(x, G + 1, z, B.snowD);   // 깨진 창으로 들어온 눈

      // ── 가구: 조종대(회색, 위에 화면·단추), 검은 의자, 해도대, 해도실 ──
      const bx = (x0, y0, z0, x1, y1, z1, b) => w.box(Math.min(x0, x1), y0, Math.min(z0, z1), Math.max(x0, x1), y1, Math.max(z0, z1), b);
      const consoleRow = (xa, za, xb, zb, face) => {                                  // face: 화면이 보는 쪽(+1 남, -1 북)
        const x0 = Math.min(xa, xb), x1 = Math.max(xa, xb), z0 = Math.min(za, zb), z1 = Math.max(za, zb);
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          if (!inR(x, z)) continue;
          w.box(x, G + 1, z, x, G + 2, z, B.cons);
          const front = face > 0 ? z === z1 : z === z0;
          if (front) w.set(x, G + 3, z, hash3(x, 7, z) > 0.55 ? (hash3(x, 8, z) > 0.5 ? B.scr : B.scrB) : B.scrK);
          else if (hash3(x, 9, z) > 0.7) w.set(x, G + 3, z, [B.btnR, B.btnG, B.btnY][(hash3(x, 4, z) * 3) | 0]);
          else w.set(x, G + 3, z, B.consD);
        }
      };
      const chair = (t, x, z, tall) => {                                             // 의자: 뒤쪽 등받이(남쪽), 앞은 북쪽 창
        t.set(x, G + 1, z, B.iron); t.box(x - 1, G + 2, z - 1, x, G + 2, z, B.chair);
        t.box(x - 1, G + 3, z + 1, x, G + (tall ? 6 : 5), z + 1, B.chair); t.set(x - 2, G + 3, z, B.chairL); t.set(x + 1, G + 3, z, B.chairL);
      };
      // 왼쪽 날개 묶음
      { const [a0, c0] = P(205, 355), [a1, c1] = P(340, 330); consoleRow(a0, c0, a1, c1, 1); consoleRow(a1, c1 + 1, a1 + 3, c1 + 4, 1); }
      for (const [u, v] of [[222, 295], [282, 290]]) { const [x, z] = P(u, v); chair(w, x, z, false); }
      // 해도대(책 더미)
      { const [xa, z0] = P(410, 320), [xb, z1] = P(460, 285), x0 = Math.min(xa, xb), x1 = Math.max(xa, xb);
        w.box(x0, G + 1, z0, x1, G + 2, z1, B.woodD); w.box(x0, G + 3, z0, x1, G + 3, z1, B.wood);
        for (const [dx, dz, b] of [[1, 1, B.bookR], [2, 2, B.bookG], [3, 1, B.bookR], [1, 3, B.bookG], [3, 3, B.paper]]) w.set(x0 + dx, G + 4, z0 + dz, b); }
      // 가운데 앞 창 밑 조종대들
      { const [a0, c0] = P(460, 320), [a1, c1] = P(600, 296); consoleRow(a0, c0, a1, c1, 1); }
      { const [a0, c0] = P(650, 320), [a1, c1] = P(730, 296); consoleRow(a0, c0, a1, c1, 1); }
      { const [a0, c0] = P(905, 320), [a1, c1] = P(1005, 290); consoleRow(a0, c0, a1, c1, 1); }
      // 오른쪽 날개 묶음
      { const [a0, c0] = P(1030, 355), [a1, c1] = P(1195, 330); consoleRow(a0, c0, a1, c1, 1); consoleRow(a0, c1 + 1, a0 - 3, c1 + 4, 1); }
      for (const [u, v] of [[1120, 290], [1180, 288]]) { const [x, z] = P(u, v); chair(w, x, z, false); }
      { const [x, z] = P(1035, 290); chair(w, x, z, false); }
      { const [x, z] = P(365, 290); chair(w, x, z, false); }
      // 해도실: 긴 나무 해도대, 그 뒤 모니터 줄, 의자 둘, 계단 문, 소화기
      { const [b0, c0] = P(555, 185), [b1, c1] = P(905, 165), a0 = Math.min(b0, b1), a1 = Math.max(b0, b1);
        w.box(a0, G + 1, c0, a1, G + 2, c1, B.woodD); w.box(a0, G + 3, c0, a1, G + 3, c1, B.wood);
        for (let x = a0 + 2; x < a1; x += 5) w.set(x, G + 4, c0 + 1, hash3(x, 1, 1) > 0.5 ? B.paper : B.bookG); }
      { const [b0, c0] = P(590, 160), [b1, c1] = P(810, 130), a0 = Math.min(b0, b1), a1 = Math.max(b0, b1);
        for (let z = c0; z <= c1; z++) for (let x = a0; x <= a1; x++) { w.box(x, G + 1, z, x, G + 3, z, B.cons); w.set(x, G + 4, z, z === c0 && x % 4 !== 0 ? (hash3(x, 2, z) > 0.4 ? B.scr : B.scrB) : B.consD); }
        for (let x = a0 + 1; x < a1; x += 4) w.box(x, G + 5, c1, x + 2, G + 6, c1, B.scrK); }
      for (const [u, v] of [[650, 112], [700, 112]]) { const [x, z] = P(u, v); w.set(x, G + 1, z, B.iron); w.box(x - 1, G + 2, z - 1, x, G + 2, z, B.chair); w.box(x - 1, G + 3, z + 1, x, G + 5, z + 1, B.chair); }
      { const [x0, z] = P(750, 40); w.box(x0, G + 1, z, x0 + 3, G + 2, z, B.doorF); w.set(x0 + 1, G + 2, z, B.exitG); }
      { const [x, z] = P(912, 52); w.box(x, G + 1, z, x, G + 2, z, B.extR); }
      for (const [u, v] of [[455, 165], [935, 165]]) { const [x, z] = P(u, v); w.box(x, G + 1, z + 1, x + 2, G + 2, z + 1, B.doorF); }
      // 흩어진 서류
      for (let k = 0; k < 34; k++) { const x = w.ri(14, 130), z = w.ri(22, 54); if (inR(x, z) && !w.get(x, G + 1, z)) w.set(x, G + 1, z, k % 9 === 0 ? B.bookR : B.paper); }
      lights.push({ name: 'room', p: [52.5, G + 9, 33.5], c: '#e8f0ff', i: 0.55, d: 44, flicker: 0.05, srcR: 40 });
      lights.push({ name: 'room2', p: [96.5, G + 9, 33.5], c: '#e8f0ff', i: 0.5, d: 44, flicker: 0.05, srcR: 40 });
      lights.push({ name: 'screens', p: [72.5, G + 5, 28.5], c: '#5ae0c8', i: 0.45, d: 30, flicker: 0.1, srcR: 30 });
      lights.push({ name: 'alcove', p: [72.5, G + 7, 47.5], c: '#ffe8c0', i: 0.45, d: 22, flicker: 0.05, srcR: 12 });
      landmarks.push({ name: '조타실', note: '9층 · 앞 창 밑 조종대와 검은 의자 줄', p: [72.5, G + 16, 30], tag: 'BRIDGE' });
      landmarks.push({ name: '해도실', note: '긴 나무 해도대와 모니터 줄 · 계단 문', p: [72.5, G + 12, 50] });

      // ════ 상호작용 ════
      // 이정표: 해도실 계단 문 옆, 밖(앞갑판)으로
      { const [x, z] = P(800, 60); const sp = OR.signpost(w, B, x, z, { dir: [1, 0], h: 6, boards: 1 });
        acts.push(OR.goAct({ at: sp, name: '앞갑판으로 내려가기', goto: 'icebreaker', hint: '해도실 계단을 내려가 눈 덮인 앞갑판과 얼음판으로 나가요' })); }
      { const [x, z] = P(640, 60); const sp = OR.signpost(w, B, x, z, { dir: [-1, 0], h: 6, boards: 1 });
        acts.push(OR.goAct({ at: sp, name: '3층 체육관으로 내려가기', goto: 'icebreaker-gym', hint: '계단을 여섯 층 내려가 웨지가 버티는 3층 체육관으로 가요' })); }
      // 가운데 조타대: 작은 조타륜(부품)과 키 큰 의자
      const [HX, HZ] = P(690, 300);
      const wheel = w.prop({ name: 'wheel', pivot: [HX + 0.5, G + 6.5, HZ + 0.5], axis: 'z', speed: 0.01 });
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const r = Math.hypot(dx, dy); if ((r > 1.5 && r < 2.6) || (r < 1.5 && (dx === 0 || dy === 0))) wheel.set(HX + dx, G + 6 + dy, HZ, r < 0.5 ? B.iron : B.woodD); }
      { const [x, z] = P(690, 262); chair(w, x, z, true); }
      acts.push({
        name: '조타륜', hint: '가운데 조타대의 조타륜을 힘껏 돌리자 조종대 화면이 일제히 깜박여요', hit: [HX - 3, G + 2, HZ - 1, HX + 3, G + 8, HZ + 1],
        run: async a => { a.flash('screens', 4, 3); a.glow(2, 3); await a.turn('wheel', [0, 0, 3.2], 1.4); await a.turn('wheel', [0, 0, -1.2], 1.2); await a.turn('wheel', [0, 0, 0], 0.8); },
      });
      // 레이더 화면: 큰 조종대 위 둥근 화면과 도는 빛줄(부품)
      const [RX, RZ] = P(955, 300);
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.hypot(dx, dz) < 2.6) w.set(RX + dx, G + 3, RZ + dz, Math.hypot(dx, dz) > 1.8 ? B.iron : B.scrK);
      const sweep = w.prop({ name: 'sweep', pivot: [RX + 0.5, G + 4, RZ + 0.5], speed: 1.2 });
      sweep.box(RX, G + 4, RZ, RX + 2, G + 4, RZ, B.scr);
      acts.push({
        name: '레이더 화면', hint: '큰 조종대의 둥근 레이더 화면이 빠르게 돌며 초록 점들이 반짝여요', hit: [RX - 3, G + 2, RZ - 3, RX + 3, G + 6, RZ + 3],
        run: async a => {
          a.flash('screens', 5, 4);
          for (let k = 0; k < 6; k++) a.burst([RX + 0.5 + Math.cos(k) * 1.5, G + 4.5, RZ + 0.5 + Math.sin(k) * 1.5], { n: 4, colors: ['#5ae0c8', '#aaffe8'], speed: 0.3, up: 0.6, life: 1.2, gravity: 0, spread: 0.2 });
          await a.spin('sweep', 6, 4);
        },
      });
      // 경보등: 앞 창벽 위 붉은 경광등(부품)
      const AL = [[40, 25], [104, 25]];
      AL.forEach(([x, z], k) => {
        w.set(x, G + WH, z - 1, B.iron);
        const b = w.prop({ name: 'beacon' + k, pivot: [x + 0.5, G + WH + 1.5, z - 0.5], speed: 0.01 });
        b.set(x, G + WH + 1, z - 1, B.redL); b.set(x, G + WH + 2, z - 1, B.iron); b.set(x + 1, G + WH + 1, z - 1, B.iron);
      });
      lights.push({ name: 'alarm', p: [72.5, G + WH + 1, 24.5], c: '#ff3a2a', i: 0.2, d: 60, flicker: 0.3, srcR: 34 });
      acts.push({
        name: '경보', hint: '창벽 위 붉은 경광등이 돌며 조타실 안이 붉게 번쩍여요', hit: [38, G + WH - 1, 22, 42, G + WH + 3, 26],
        run: async a => { a.flash('alarm', 8, 5); a.flash('room', 0.3, 5); a.flash('room2', 0.3, 5); a.spin('beacon0', 900, 5); await a.spin('beacon1', 900, 5); },
      });
      // 바깥 날개 탐조등(서쪽 날개 끝 갑판): 빛줄기가 펼쳐져 눈보라 속을 훑는다
      const SX = 8, SZ = 17;
      w.box(SX, G + 1, SZ, SX, G + 3, SZ, B.iron); w.set(SX, G + 4, SZ, B.navW);
      lights.push({ name: 'search', p: [SX + 0.5, G + 4.5, SZ + 0.5], c: '#e8f6ff', i: 0.4, d: 30, flicker: 0.05, srcR: 3 });
      const beam = w.prop({ name: 'beam', pivot: [SX + 0.5, G + 4.5, SZ + 0.5], scl0: [0, 0, 0] });
      for (let s = 1.5; s < 40; s += 0.5) {
        const cx = SX + 0.5 + s * 0.35, cy = G + 4.5 + s * 0.12, cz = SZ + 0.5 - s * 0.93, r = 0.3 + s * 0.07, R = Math.ceil(r);
        if (cz < 1) break;
        for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy + dz * dz > r * r) continue;
          const x = Math.round(cx + dx), y = Math.round(cy + dy), z = Math.round(cz + dz);
          if (w.get(x, y, z) || hash3(x, y, z) < 0.5) continue;
          beam.set(x, y, z, B.beamL);
        }
      }
      acts.push({
        name: '날개 탐조등', hint: '서쪽 날개 갑판의 탐조등이 켜지며 뱃머리 쪽 눈보라 속을 훑어요', hit: [SX - 2, G + 1, SZ - 2, SX + 2, G + 5, SZ + 2],
        run: async a => {
          a.flash('search', 6, 7);
          await a.tween('beam', { scl: [1, 1, 1] }, 0.7);
          await a.turn('beam', [0, -0.5, 0], 2); await a.turn('beam', [0, 0.2, 0], 2.4);
          await a.turn('beam', [0, 0, 0], 1); await a.tween('beam', { scl: [0, 0, 0] }, 0.5);
        },
      });
      // 깨진 창: 눈보라가 들이치며 서류가 날린다
      acts.push({
        name: '깨진 창 눈보라', hint: '깨진 앞 창으로 눈보라가 들이치며 바닥의 서류가 조타실 안으로 흩날려요', hit: [BRK[0], G + 4, 22, BRK[1], G + 9, 26],
        run: async a => {
          a.wind(3, 5);
          for (let k = 0; k < 12; k++) {
            a.burst([BRK[0] + 2.5, G + 6, 24], { n: 20, colors: ['#ffffff', '#e4eef8', '#c0d4e8'], speed: 3, up: 0.5, life: 1.6, gravity: 1.5, spread: 1.4 });
            if (k % 3 === 0) a.burst([BRK[0] + 1, G + 2, 30], { n: 8, colors: ['#e8e8e0', '#ffffff'], speed: 2, up: 3, life: 1.8, gravity: 1, spread: 2, flat: true });
            await a.wait(0.35);
          }
        },
      });
      // 의자 돌리기: 왼쪽 조종대 앞 의자(부품)
      const [CXc, CZc] = P(590, 268);
      const ch = w.prop({ name: 'chair', pivot: [CXc + 0.5, G + 1, CZc + 0.5], speed: 0.01 });
      chair(ch, CXc, CZc, false);
      acts.push({
        name: '빙글 의자', hint: '조종대 앞 검은 의자가 빙글빙글 돌아요', hit: [CXc - 2, G + 1, CZc - 1, CXc + 2, G + 5, CZc + 2],
        run: async a => { await a.spin('chair', 500, 2.4); a.unwind('chair'); },
      });
      return { lights, landmarks, acts };
    },
  });
})();
