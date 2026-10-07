// 무쇠골 금광산(하위 지도) — 무쇠골 광산의 승강기 수직갱을 타고 내려온 한 층 아래 갱도.
// 서북쪽 승강기 도착장(높은 갱목 머리틀 속 쇠우리)에서 동서로 곧은 선로 갱도가 뻗고, 동북쪽 막장엔 석영 띠를 따라
// 금맥이 번쩍인다. 서남쪽엔 바위틈에서 솟는 물길과 사금 홈통(체·사금 접시), 가운데 방엔 금괴를 붓는 작은 화로,
// 동쪽엔 금괴·금 덩이가 쌓인 창고, 동남쪽엔 더 깊은 오리하르콘 광산으로 내려가는 두 번째 수직갱.
// (160칸, 고해상도 2배 · 1칸 ≈ 25cm, playerScale 2)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 128, G = 28;
  MAPS.push({
    id: 'ironhollow-goldmine', cat: 'village', sub: true, parent: 'ironhollow', name: '금광산', en: 'Ironhollow · The Gold Mine', color: '#ffc848', seed: 1291, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    spawn: [32, G + 1, 46],
    desc: '무쇠골 광산의 쇠우리 승강기를 타고 한참 내려온 금광. 하얀 석영 띠를 따라 금맥이 번쩍이고, 바위틈에서 솟는 물길에선 광부들이 체와 접시로 사금을 일며, 작은 화로에선 녹인 금을 틀에 부어 금괴를 만든다. 동남쪽 수직갱은 더 깊은 오리하르콘 광산으로 이어진다.',
    info: { title: '장소 정보', en: 'THE GOLD MINE', rows: [['도착장', '승강기 머리틀 · 쇠우리 · 선로 갱도'], ['막장', '석영 띠 금맥 · 곡괭이 · 광차'], ['작업장', '사금 물길 · 금괴 화로 · 금 창고 · 아래층 수직갱']] },
    sky: ['#22180c', '#0c0804', '#6a4a20'], stars: false,
    hemi: ['#f0d8b0', '#1a140c', 0.56], sun: ['#ffd090', 0.5, [0.4, 1, 0.6]],
    day: { sky: ['#4e3a20', '#1a120a', '#8a6a34'], stars: false, hemi: ['#f4e4c8', '#2a2014', 0.62], sun: ['#ffe8c8', 0.62, [0.4, 1, 0.6]], haze: '#6a5030' },
    liquid: ['#183a3a', '#3a7a74', '#d8f0e8'], liqSpeed: 0.45,
    fog: { start: 0.92, floor: G - 28, depth: 12, haze: [12, 0.14, 12], hazeColor: '#3a2a14' },
    camY: 4, zoom: 1.5,
    particles: [
      { n: 80, colors: ['#8a7a68', '#6a5c4c', '#a89878'], mode: 'drift', speed: 0.3, wind: 0.2, area: [80, 80, 60], y0: G + 2, y1: G + 26, glow: false },
      { n: 60, colors: ['#ffd860', '#fff0a0', '#ffffff'], mode: 'rise', speed: 0.3, area: [116, 26, 20], y0: G + 2, y1: G + 26 },
      { n: 30, colors: ['#ff9a3a', '#ffd070'], mode: 'rise', speed: 0.6, area: [78, 100, 6], y0: G + 8, y1: G + 30 },
      { n: 30, colors: ['#ffe080', '#d8f0e8'], mode: 'drift', speed: 0.2, wind: 0.3, area: [30, 104, 16], y0: G, y1: G + 6 },
    ],
    blocks: {
      rk1: { c: '#6a5a4a', v: 0.07, pat: 'big' }, rk2: { c: '#54483c', v: 0.07, pat: 'big' }, rk3: { c: '#7a6a56', v: 0.07, pat: 'big' }, rkR: { c: '#7a5a3e', v: 0.07, pat: 'big' }, basalt: { c: '#2e2822', v: 0.06, pat: 'stone' },
      rock: { c: '#5e5244', top: '#6e6250', v: 0.1, pat: 'stone' }, gravel: { c: '#5e5446', top: '#786c5a', v: 0.12 }, scree: { c: '#5e5446', top: '#867a64', v: 0.14 }, grit: { c: '#40362c', top: '#4c4236', v: 0.12 },
      sand: { c: '#9a8662', top: '#ab9670', v: 0.08 }, pebble: { c: '#6e6456', top: '#82786a', v: 0.16 }, silt: { c: '#4a4036', top: '#54483c', v: 0.06 }, mud: { c: '#4e4032', top: '#5c4c3a', v: 0.08 },
      quartz: { c: '#d8d0c0', v: 0.06 }, quartzDk: { c: '#a8a090', v: 0.06 },
      graniteDk: { c: '#5e564a', v: 0.05 }, brick: { c: '#8a5a40', v: 0.06, pat: 'brick' }, brickDk: { c: '#5e3c2c', v: 0.05, pat: 'brick' }, slab: { c: '#7a7266', v: 0.05, pat: 'floor' },
      bronze: { c: '#c08a3a', v: 0.06 }, bronzeDk: { c: '#94652a', v: 0.05 }, iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#26262c', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 },
      timber: { c: '#6a4428', v: 0.06, pat: 'log' }, timberDk: { c: '#4e321e', v: 0.05 }, plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, rope: { c: '#b8a080', v: 0.04 }, leather: { c: '#6a3a24', v: 0.05 },
      rail: { c: '#8a8a92', v: 0.03 }, sleeper: { c: '#5a3a24', v: 0.05 }, crate: { c: '#9a7048', v: 0.05, pat: 'plank' }, crateEdge: { c: '#6a4a2e', v: 0.04 },
      gold: { c: '#e8b830', v: 0.08 }, ingot: { c: '#f0c840', v: 0.03 }, nug: { c: '#d8a828', v: 0.12 },
      veinG: { c: '#ffd050', glow: true }, glint: { c: '#fff2a8', glow: true }, flake: { c: '#ffe070', glow: true },
      fireY: { c: '#ffe090', glow: true }, ember: { c: '#ff7a2a', glow: true }, molten: { c: '#ffb04a', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const lights = [], acts = [], landmarks = [];
      const RZ = 60;                                                   // 선로 갱도 가운데 z

      // ───────── 바위와 빈 곳(방·갱도) ─────────
      const ell = (x, z, cx, cz, rx, rz) => (Math.hypot((x - cx) / rx, (z - cz) / rz) - 1) * Math.min(rx, rz);
      const cap = (x, z, ax, az, bx, bz, r) => MH.segDist(x, z, ax, az, bx, bz) - r;
      // 사금 물길: 서쪽 바위틈 → 곧은 홈통 구간 → 남동쪽 웅덩이
      const CH = [[0, 100], [36, 100], [46, 112], [54, 124]], POOL = [58, 126, 10, 8];
      const chD = (x, z) => { let d = 1e9; for (let i = 0; i < CH.length - 1; i++) d = Math.min(d, MH.segDist(x, z, CH[i][0], CH[i][1], CH[i + 1][0], CH[i + 1][1])); return d + (n.fbm(x * 0.15, z * 0.15 + 3, 2) - 0.5) * 2.2; };
      const poolP = (x, z) => Math.hypot((x - POOL[0]) / POOL[2], (z - POOL[1]) / POOL[3]) + (n.fbm(x * 0.2, z * 0.2, 2) - 0.5) * 0.25;
      const rooms = (x, z) => Math.min(
        ell(x, z, 30, 32, 21, 19), cap(x, z, 30, 44, 32, 60, 9),                // 승강기 도착장
        cap(x, z, 24, RZ, 132, RZ, 10),                                        // 선로 갱도
        ell(x, z, 116, 28, 26, 15), cap(x, z, 116, 38, 116, 54, 10),           // 금맥 막장
        ell(x, z, 34, 108, 30, 17), cap(x, z, 20, 70, 24, 92, 8), ell(x, z, 58, 122, 15, 13),   // 사금 물길 방과 웅덩이
        ell(x, z, 80, 98, 22, 16), cap(x, z, 80, 62, 80, 86, 9), cap(x, z, 56, 104, 64, 100, 9),   // 화로 방
        ell(x, z, 122, 98, 17, 14), cap(x, z, 98, 98, 108, 98, 8),             // 금 창고
        ell(x, z, 134, 132, 17, 15), cap(x, z, 126, 108, 132, 120, 9));        // 아래층 수직갱
      const forced = (x, z) => (x >= 12 && x <= 48 && z >= 16 && z <= 50) || (x >= 24 && x <= 130 && Math.abs(z - RZ) <= 9) ||
        (x >= 108 && x <= 136 && z >= 88 && z <= 108) || (x >= 122 && x <= 146 && z >= 120 && z <= 142) || (x >= 66 && x <= 96 && z >= 88 && z <= 108) || (x >= 52 && x <= 64 && z >= 108 && z <= 118);
      const sdN = (x, z) => rooms(x, z) + (n.fbm(x * 0.07, z * 0.07, 3) - 0.5) * 7;
      let sx_ = -1, sz_ = -1, so_ = 0;
      const strata = (x, z, y) => {
        if (x !== sx_ || z !== sz_) { sx_ = x; sz_ = z; so_ = x * 0.11 + z * 0.06 + n.fbm(x * 0.03, z * 0.03, 2) * 18; }
        if (y < 10 + hash3(x >> 3, 1, z >> 3) * 4) return B.basalt;
        const r = hash3(Math.floor((y + so_) / 4), 29, 7);
        return r < 0.4 ? B.rk1 : r < 0.64 ? B.rk2 : r < 0.84 ? B.rk3 : B.rkR;
      };
      const isOpen = (x, z) => forced(x, z) || sdN(x, z) < 0 || chD(x, z) < 5;
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          if (isOpen(x, z)) {
            const p = poolP(x, z), c = chD(x, z);
            if (p < 1) return G - 2 - Math.round(4 * MH.sstep(1, 0.3, p));
            if (c < 4.2) return G - 1 - Math.round(2.6 * MH.sstep(4.2, 1, c) + (n.fbm(x * 0.2, z * 0.2, 2) - 0.5) * 1.2);
            if (forced(x, z)) return G;
            const sd = sdN(x, z);
            return G + Math.max(0, Math.round((sd + 3) * 0.8 * MH.sstep(0.42, 0.6, n.fbm(x * 0.09, z * 0.09 + 5, 2))));
          }
          const sd = sdN(x, z);
          let top = G + 12 + n.fbm(x * 0.05, z * 0.05, 3) * 10 + 24 * MH.sstep(24, 4, z) + 18 * MH.sstep(22, 4, x);
          top = MH.lerp(top, G + 6 + n.fbm(x * 0.2, z * 0.2, 2) * 3, Math.max(MH.sstep(140, 152, z), MH.sstep(148, 156, x)));
          if (x >= 22 && x <= 134 && Math.abs(z - RZ) <= 14) top = Math.max(top, G + 18);   // 갱도 들보가 걸치는 양쪽 바위
          return Math.max(G + 8, Math.round(top + Math.min(3, sd * 0.4)));
        },
        surface: (x, z, y, s) => {
          if (y < G) {
            const v = n.fbm(x * 0.15, z * 0.15 + 9, 2);
            if (y >= G - 2) return v > 0.6 ? B.pebble : B.sand;
            return v > 0.55 ? B.pebble : v < 0.4 ? B.silt : B.sand;
          }
          if (y <= G + 2) {
            if (y > G) return B.scree;
            const v = n.fbm(x * 0.08, z * 0.08, 3);
            if (chD(x, z) < 7 && v > 0.42) return B.sand;
            return v < 0.36 ? B.grit : v > 0.64 ? B.scree : B.gravel;
          }
          if (s >= 3) return strata(x, z, y);
          return n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.scree : B.rock;
        },
        under: (x, z, y) => strata(x, z, y),
      });
      // 물바닥의 사금: 반짝이는 금 알갱이가 무리로(물이 맑아 보인다)
      for (let z = 2; z < D - 2; z++) for (let x = 0; x < W - 2; x++) {
        const g = MH.g(w, x, z); if (g >= G - 1) continue;
        if (n.fbm(x * 0.18, z * 0.18 + 21, 2) > 0.6 && hash3(x, 31, z) > 0.55) S(x, g, z, B.flake);
        else if (hash3(x >> 1, 32, z >> 1) > 0.9) S(x, g, z, B.pebble);
      }
      MH.water(w, G - 1, (x, z) => chD(x, z) < 4.2 || poolP(x, z) < 1);

      // ───────── 금맥: 석영 띠를 따라 번쩍이는 금줄기(막장과 갱도 북벽은 진하게) ─────────
      const solidRock = id => id === B.rk1 || id === B.rk2 || id === B.rk3 || id === B.rkR || id === B.rock || id === B.scree;
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const top = MH.g(w, x, z); if (top <= G + 2) continue;
        const rich = Math.hypot(x - 116, (z - 28) * 1.4) < 36 ? 1 : (Math.abs(z - RZ) < 16 && x > 60) ? 0.55 : 0;
        if (!rich && hash3(x >> 3, 4, z >> 3) < 0.8) continue;
        for (let y = G + 1; y <= Math.min(top - 1, G + 36); y++) {
          if (!solidRock(w.get(x, y, z))) continue;
          if (w.get(x + 1, y, z) && w.get(x - 1, y, z) && w.get(x, y, z + 1) && w.get(x, y, z - 1)) continue;
          const t = x * 0.5 + y * 0.95 - z * 0.4 + n.fbm(x * 0.04, z * 0.04 + y * 0.03, 2) * 18, f = Math.abs(((t / 12) % 1 + 1) % 1 - 0.5);
          const hq = hash3(x >> 1, y >> 1, z >> 1);
          if (f < 0.045 && n.fbm(x * 0.1 + y * 0.05, z * 0.1, 2) > 0.6 - rich * 0.2) S(x, y, z, hq > 0.5 ? B.veinG : B.gold);
          else if (f < 0.1 && n.fbm(x * 0.06, z * 0.06 + y * 0.04, 2) > 0.5 - rich * 0.15) S(x, y, z, hq > 0.93 - rich * 0.08 ? B.glint : hq > 0.5 ? B.quartz : B.quartzDk);
        }
      }

      // ───────── 쇠우리 승강기 ─────────
      const CR = 6;
      const makeCage = (name, cx, cz, y0, open) => {
        const c = w.prop({ name, pivot: [cx + 0.5, y0, cz + 0.5] }), top = y0 + 12;
        c.box(cx - CR, y0, cz - CR, cx + CR, y0, cz + CR, B.plank);
        for (let k = -CR; k <= CR; k += 3) c.box(cx - CR, y0, cz + k, cx + CR, y0, cz + k, B.timberDk);
        for (const [x, z] of [[cx - CR, cz - CR], [cx + CR, cz - CR], [cx - CR, cz + CR], [cx + CR, cz + CR]]) c.box(x, y0 + 1, z, x, top - 1, z, B.iron);
        const sides = { '-x': [-1, 0], '+x': [1, 0], '-z': [0, -1], '+z': [0, 1] };
        for (const sk in sides) {
          if (sk === open) continue;
          const [sx, sz] = sides[sk];
          for (let k = -CR; k <= CR; k++) {
            const x = sx ? cx + sx * CR : cx + k, z = sz ? cz + sz * CR : cz + k;
            if (k % 2 === 0) c.box(x, y0 + 1, z, x, y0 + 5, z, B.iron);
            c.set(x, y0 + 5, z, B.bronze);
          }
        }
        c.walls(cx - CR, top, cz - CR, cx + CR, top, cz + CR, B.iron);
        for (let k = -CR + 2; k <= CR - 2; k += 4) c.box(cx + k, top, cz - CR, cx + k, top, cz + CR, B.iron);
        c.box(cx - 1, top, cz - 1, cx + 1, top, cz + 1, B.bronze);
        return top;
      };
      const lamp = (x, y, z) => { S(x, y + 2, z, B.iron); S(x, y + 1, z, B.fireY); S(x, y, z, B.fireY); S(x, y - 1, z, B.ironDk); };

      // ───────── 서북쪽 도착장: 높은 갱목 머리틀 속 쇠우리(위층으로 올라가는 승강기) ─────────
      const LX = 28, LZ = 28, UP = 24;
      for (let z = LZ - CR; z <= LZ + CR; z++) for (let x = LX - CR; x <= LX + CR; x++) MH.setH(w, x, z, G - 1, B.slab, B.rk2);
      for (let z = LZ - CR - 3; z <= LZ + CR + 6; z++) for (let x = LX - CR - 3; x <= LX + CR + 3; x++) if (MH.g(w, x, z) === G && (x < LX - CR || x > LX + CR || z < LZ - CR || z > LZ + CR)) S(x, G, z, (x + z) % 3 ? B.plank : B.timberDk);
      const TP = G + 52;
      for (const [x, z] of [[LX - CR - 2, LZ - CR - 2], [LX + CR + 1, LZ - CR - 2], [LX - CR - 2, LZ + CR + 1], [LX + CR + 1, LZ + CR + 1]]) w.box(x, G + 1, z, x + 1, TP, z + 1, B.timber);
      for (const y of [G + 16, G + 30, G + 44, TP]) {
        for (const z of [LZ - CR - 2, LZ + CR + 2]) w.box(LX - CR - 2, y, z, LX + CR + 2, y, z, B.timber);
        for (const x of [LX - CR - 2, LX + CR + 2]) w.box(x, y, LZ - CR - 2, x, y, LZ + CR + 2, B.timber);
      }
      // 뒤(북)와 서쪽 면 X자 버팀(앞쪽은 타는 곳이라 비운다)
      for (const [y0, y1] of [[G + 17, G + 29], [G + 31, G + 43]]) {
        w.line(LX - CR - 1, y0, LZ - CR - 2, LX + CR + 1, y1, LZ - CR - 2, B.timberDk); w.line(LX - CR - 1, y1, LZ - CR - 2, LX + CR + 1, y0, LZ - CR - 2, B.timberDk);
        w.line(LX - CR - 2, y0, LZ - CR - 1, LX - CR - 2, y1, LZ + CR + 1, B.timberDk); w.line(LX - CR - 2, y1, LZ - CR - 1, LX - CR - 2, y0, LZ + CR + 1, B.timberDk);
      }
      for (const z of [LZ - 3, LZ + 3]) w.box(LX - CR - 2, TP + 1, z, LX + CR + 2, TP + 1, z, B.timber);
      w.box(LX - CR - 2, TP + 1, LZ, LX - 1, TP + 1, LZ, B.timber); w.box(LX + 1, TP + 1, LZ, LX + CR + 2, TP + 1, LZ, B.timber);
      for (const x of [LX - 1, LX + 1]) w.box(x, TP + 2, LZ, x, TP + 7, LZ, B.timber);
      const sheaveU = w.prop({ name: 'upsheave', pivot: [LX + 0.5, TP + 7.5, LZ + 0.5], axis: 'x' });
      MH.ringProp(sheaveU, LX, TP + 7, LZ, 5, 'yz', B.bronze, B.iron, 6); MH.ringProp(sheaveU, LX, TP + 7, LZ, 4, 'yz', B.bronzeDk);
      for (let k = -3; k <= 3; k++) { sheaveU.set(LX, TP + 7 + k, LZ, B.iron); sheaveU.set(LX, TP + 7, LZ + k, B.iron); }
      const upTop = makeCage('goldlift', LX, LZ, G, '+z');
      const uRopeTop = TP, uRopeLen = uRopeTop - upTop;
      MH.rope(w, 'uprope', LX, uRopeTop, LZ, uRopeLen, B.rope);
      // 도착장 등과 연장 걸이, 광석 상자
      for (const x of [LX - CR - 3, LX + CR + 3]) lamp(x, G + 14, LZ + CR + 3);
      lights.push({ name: 'landing', p: [LX + 0.5, G + 15, LZ + CR + 4], c: '#ffb050', i: 0.85, d: 32, flicker: 0.2, srcR: 10 });
      const crate = (x, y, z, s) => { for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) { const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1); S(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate); } };
      crate(42, G + 1, 24, 5); crate(43, G + 1, 30, 4); crate(42, G + 6, 25, 3);

      // ───────── 선로 갱도: 2칸 두께 갱목 틀, 침목 위 레일, 끝 멈춤목 ─────────
      for (let x = 26; x <= 128; x++) {
        if (x % 4 < 2) w.box(x, G, RZ - 6, x, G, RZ + 6, B.sleeper);
        S(x, G + 1, RZ - 4, B.rail); S(x, G + 1, RZ + 4, B.rail);
      }
      for (let x = 36; x <= 124; x += 11) {
        for (const z of [RZ - 9, RZ - 8, RZ + 8, RZ + 9]) w.box(x, G + 1, z, x + 1, G + 15, z, B.timber);
        w.box(x, G + 16, RZ - 10, x + 1, G + 17, RZ + 10, B.timber);
        for (const z of [RZ - 7, RZ + 7]) w.box(x, G + 14, z, x + 1, G + 15, z, B.timberDk);
        if (x < 120) for (const z of [RZ - 10, RZ + 10]) {
          const gap = z < RZ ? [[22, 42], [104, 128]] : [[70, 92]];
          for (let xx = x + 2; xx <= x + 10; xx++) if (!gap.some(([a0, a1]) => xx >= a0 && xx <= a1)) w.box(xx, G + 3, z, xx, G + 13, z, (x * 7 >> 3) & 1 ? B.plank : B.timberDk);
        }
      }
      for (const x of [58, 102]) { S(x, G + 15, RZ, B.iron); lamp(x, G + 12, RZ); }
      lights.push({ name: 'gallery', p: [58.5, G + 12, RZ + 0.5], c: '#ffb050', i: 0.7, d: 26, flicker: 0.25 });
      lights.push({ name: 'gallery2', p: [102.5, G + 12, RZ + 0.5], c: '#ffb050', i: 0.7, d: 26, flicker: 0.25 });
      // 동쪽 끝 멈춤목
      for (const z of [RZ - 6, RZ + 5]) w.box(129, G + 1, z, 130, G + 7, z + 1, B.timber);
      w.box(128, G + 4, RZ - 7, 129, G + 6, RZ + 7, B.timber);
      // 광차(부품): 레일 위, 금 덩이를 가득 실었다(위는 평평)
      const CXc = 46;
      const cart = w.prop({ name: 'goldcart', pivot: [CXc + 0.5, G + 2, RZ + 0.5] });
      for (const z of [RZ - 4, RZ + 4]) for (const xc of [CXc - 4, CXc + 4]) { for (let dy = 0; dy <= 2; dy++) cart.set(xc, G + 2 + dy, z, B.ironDk); cart.set(xc - 1, G + 3, z, B.ironDk); cart.set(xc + 1, G + 3, z, B.ironDk); cart.set(xc, G + 3, z, B.iron); }
      cart.box(CXc - 6, G + 5, RZ - 5, CXc + 6, G + 5, RZ + 5, B.iron);
      cart.walls(CXc - 6, G + 6, RZ - 5, CXc + 6, G + 9, RZ + 5, B.iron);
      for (const x of [CXc - 6, CXc + 6]) for (const z of [RZ - 5, RZ + 5]) cart.box(x, G + 5, z, x, G + 10, z, B.bronze);
      cart.walls(CXc - 6, G + 10, RZ - 5, CXc + 6, G + 10, RZ + 5, B.bronze);
      for (let z = RZ - 4; z <= RZ + 4; z++) for (let x = CXc - 5; x <= CXc + 5; x++) {
        const hq = hash3(x >> 1, 9, z >> 1);
        for (let y = G + 6; y <= G + 9; y++) cart.set(x, y, z, y === G + 9 ? (hq > 0.8 ? B.glint : hq > 0.35 ? B.nug : B.gravel) : B.gravel);
      }

      // ───────── 금맥 막장: 석영·금 바위 덩이와 받침대에 꽂힌 곡괭이(부품) ─────────
      const OX = 116, OZ = 20;
      w.ellipsoid(OX, G + 1, OZ, 7, 5, 4, B.quartzDk, (dx, dy) => dy >= -1);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -7; dx <= 7; dx++) for (let dy = 0; dy <= 5; dy++) {
        const id = w.get(OX + dx, G + 1 + dy, OZ + dz); if (id !== B.quartzDk) continue;
        const hq = hash3(OX + dx, dy, OZ + dz);
        S(OX + dx, G + 1 + dy, OZ + dz, hq > 0.7 ? B.veinG : hq > 0.55 ? B.gold : hq > 0.3 ? B.quartz : B.quartzDk);
      }
      for (let dz = -3; dz <= 3; dz++) for (let dx = -4; dx <= 4; dx++) {
        const hh = Math.round(2.2 - Math.hypot(dx, dz * 1.3) * 0.6 + hash3(dx, 5, dz));
        for (let y = 1; y <= hh; y++) S(OX - 13 + dx, G + y, OZ + 9 + dz, y === hh ? (hash3(dx, y, dz) > 0.6 ? B.nug : B.quartz) : B.gravel);
      }
      const PZ = OZ + 10;
      w.box(OX - 2, G + 1, PZ - 1, OX + 2, G + 2, PZ + 1, B.graniteDk);
      for (const x of [OX - 2, OX + 2]) w.box(x, G + 3, PZ, x, G + 5, PZ, B.timber);
      S(OX - 1, G + 4, PZ, B.iron); S(OX + 1, G + 4, PZ, B.iron);
      const pick = w.prop({ name: 'goldpick', pivot: [OX + 0.5, G + 4.5, PZ + 0.5], axis: 'x' });
      pick.box(OX, G + 4, PZ, OX, G + 12, PZ, B.timber); pick.set(OX, G + 5, PZ, B.timberDk);
      pick.box(OX, G + 13, PZ - 4, OX, G + 13, PZ + 3, B.steel); pick.box(OX, G + 12, PZ - 1, OX, G + 14, PZ + 1, B.iron);
      pick.set(OX, G + 12, PZ - 4, B.steel); pick.set(OX, G + 12, PZ + 3, B.steel);
      lamp(OX + 10, G + 10, OZ + 12); S(OX + 10, G + 13, OZ + 11, B.iron);
      lights.push({ name: 'vein', p: [OX + 0.5, G + 8, OZ + 2], c: '#ffd050', i: 0.9, d: 38, flicker: 0.1, srcR: 6 });
      landmarks.push({ name: '금맥 막장', note: '석영 띠를 따라 번쩍이는 금맥', p: [OX, G + 40, OZ + 4], tag: 'GOLD' });

      // ───────── 사금 물길: 바위틈 샘, 판자 홈통(턱 막대), 체 걸이, 사금 접시(부품) ─────────
      // 서쪽 바위틈에서 물이 솟는 자리
      const SX0 = 12, SX1 = 30;                                          // 홈통 구간(물길이 x축으로 곧다)
      for (let x = SX0; x <= SX1; x++) {
        for (const z of [92, 93, 94, 95, 105, 106, 107, 108]) if (MH.g(w, x, z) < G) { MH.setH(w, x, z, G, B.sand, B.sand); w.liq[x + W * z] = -1; }
        for (let z = 97; z <= 103; z++) { MH.setH(w, x, z, G - 3, B.plank, B.sand); w.liquid(x, z, G - 1); }
        if (x % 3 === 0) w.box(x, G - 2, 97, x, G - 2, 103, B.timberDk);       // 사금이 걸리는 턱 막대
        else if (hash3(x, 33, 0) > 0.4) S(x, G - 2, 98 + (x % 5), B.flake);
        for (const z of [96, 104]) { w.box(x, G - 2, z, x, G + 1, z, B.plank); S(x, G + 2, z, B.timberDk); }
      }
      for (let x = SX0; x <= SX1; x += 6) for (const z of [95, 105]) w.box(x, G + 1, z, x, G + 3, z, B.timber);
      // 체 걸이: 둥근 체 셋이 기둥에 기대어 있다
      w.box(10, G + 1, 108, 10, G + 9, 108, B.timber); w.box(20, G + 1, 108, 20, G + 9, 108, B.timber); w.box(10, G + 10, 108, 20, G + 10, 108, B.timber);
      for (const cx of [12, 15, 18]) {
        for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2; S(cx + Math.round(Math.cos(t) * 1.4), G + 6 + Math.round(Math.sin(t) * 2.2), 109, B.plank); }
        for (let y = G + 5; y <= G + 7; y++) S(cx, y, 109, B.steel);
        S(cx, G + 9, 109, B.rope);
      }
      // 사금 접시 받침(물가 돌판)과 접시(부품)
      const PX = 58, PZp = 113, PDZ = 10;
      w.box(PX - 3, G + 1, PZp - 2, PX + 3, G + 1, PZp + 2, B.graniteDk);
      const pan = w.prop({ name: 'goldpan', pivot: [PX + 0.5, G + 2.5, PZp + 0.5] });
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
        const d = Math.hypot(dx, dz); if (d > 3.3) continue;
        if (d > 2.4) pan.set(PX + dx, G + 3, PZp + dz, B.ironDk);
        else if (d > 1.6) pan.set(PX + dx, G + 2, PZp + dz, B.steel);
        else pan.set(PX + dx, G + 2, PZp + dz, hash3(dx, 34, dz) > 0.55 ? B.flake : B.sand);
      }
      lamp(34, G + 6, 92); w.box(34, G + 1, 92, 34, G + 4, 92, B.timber);
      lights.push({ name: 'sluice', p: [34.5, G + 7, 93.5], c: '#ffc070', i: 0.7, d: 30, flicker: 0.2, srcR: 4 });
      lights.push({ name: 'flake', p: [20.5, G - 1, 100.5], c: '#ffe070', i: 0.4, d: 18, flicker: 0.05, liquid: true });
      landmarks.push({ name: '사금 물길', note: '맑은 물바닥에 금 알갱이가 반짝인다', p: [24, G + 22, 100] });

      // ───────── 금괴 화로: 벽돌 화로와 굴뚝, 풀무(부품), 기울어지는 도가니(부품), 금괴 틀 ─────────
      const FX = 76, FZ = 102;
      w.box(FX - 4, G + 1, FZ - 4, FX + 4, G + 7, FZ + 4, B.brick);
      w.ellipsoid(FX, G + 8, FZ, 4, 3, 4, B.brickDk, (dx, dy) => dy >= 0);
      w.box(FX - 3, G + 1, FZ - 3, FX + 3, G + 6, FZ + 3, 0);
      w.box(FX - 3, G + 1, FZ - 3, FX + 3, G + 1, FZ + 3, B.ember); w.box(FX - 2, G + 2, FZ - 2, FX + 2, G + 2, FZ + 2, B.molten);
      w.box(FX - 1, G + 2, FZ - 4, FX + 1, G + 4, FZ - 4, 0); S(FX, G + 5, FZ - 4, B.brickDk);
      w.cyl(FX, FZ + 1, G + 9, G + 26, 1.6, B.brickDk); w.cyl(FX, FZ + 1, G + 27, G + 27, 2.2, B.iron); S(FX, G + 27, FZ + 1, 0); S(FX, G + 26, FZ + 1, B.ember);
      lights.push({ name: 'furnace', p: [FX + 0.5, G + 4, FZ - 6], c: '#ff9a3a', i: 1.1, d: 34, flicker: 0.35, srcR: 4 });
      // 풀무: 서쪽 옆의 가죽 주머니, 손잡이를 누르면 납작해진다
      const bel = w.prop({ name: 'bellows', pivot: [FX - 8.5, G + 2, FZ + 0.5] });
      w.box(FX - 10, G + 1, FZ - 2, FX - 7, G + 1, FZ + 2, B.timberDk);
      bel.box(FX - 10, G + 2, FZ - 2, FX - 7, G + 4, FZ + 2, B.leather); bel.box(FX - 10, G + 5, FZ - 2, FX - 7, G + 5, FZ + 2, B.plank);
      bel.box(FX - 9, G + 6, FZ, FX - 8, G + 9, FZ, B.timber); bel.box(FX - 6, G + 3, FZ, FX - 5, G + 3, FZ, B.iron);
      // 도가니 받침(쇠기둥 둘)과 도가니
      const KX = FX + 9, KZ = FZ - 2, KY = G + 5;
      for (const z of [KZ - 3, KZ + 3]) { w.box(KX, G + 1, z, KX, KY + 2, z, B.iron); S(KX, KY + 3, z, B.ironDk); }
      const cru = w.prop({ name: 'crucible', pivot: [KX + 0.5, KY + 2.5, KZ + 0.5], axis: 'z' });
      for (let y = KY; y <= KY + 3; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
        if (y === KY + 3 && !dx && !dz) { cru.set(KX, y, KZ, B.molten); continue; }
        cru.set(KX + dx, y, KZ + dz, (y === KY + 3) ? B.ironDk : (y === KY ? B.ironDk : B.graniteDk));
      }
      cru.set(KX + 2, KY + 3, KZ, B.ironDk);
      for (const z of [KZ - 2, KZ + 2]) cru.set(KX, KY + 2, z, B.iron);
      // 금괴 틀: 돌판 위 쇠 틀에 반짝이는 금괴가 줄지어
      w.box(KX + 3, G + 1, KZ - 2, KX + 12, G + 2, KZ + 2, B.graniteDk);
      for (let x = KX + 3; x <= KX + 12; x++) for (let z = KZ - 2; z <= KZ + 2; z++) S(x, G + 3, z, (x - KX) % 3 === 0 || Math.abs(z - KZ) === 2 ? B.iron : ((x + z) % 4 ? B.ingot : B.molten));

      // ───────── 금 창고: 금괴 선반, 금 덩이 무더기, 궤짝, 저울(부품) ─────────
      const WX0 = 110, WX1 = 134, WZ0 = 89, WZ1 = 107;
      for (let z = WZ0; z <= WZ1; z++) for (let x = WX0; x <= WX1; x++) if (MH.g(w, x, z) === G) S(x, G, z, B.slab);
      // 북벽 선반 셋(쌓인 금괴)
      for (const x0 of [WX0 + 1, WX0 + 9, WX0 + 17]) {
        for (const x of [x0, x0 + 6]) w.box(x, G + 1, WZ0, x, G + 12, WZ0 + 2, B.timber);
        for (const y of [G + 4, G + 8, G + 12]) {
          w.box(x0, y, WZ0, x0 + 6, y, WZ0 + 2, B.plank);
          if (y < G + 12) for (let x = x0 + 1; x <= x0 + 5; x++) { S(x, y + 1, WZ0 + 1, B.ingot); if (x % 2) S(x, y + 2, WZ0 + 1, (x + y) % 3 ? B.ingot : B.glint); }
        }
      }
      // 금 덩이 무더기 셋
      for (const [cx, cz, r, h] of [[WX0 + 4, WZ1 - 4, 4, 3.5], [WX0 + 12, WZ1 - 1, 3.5, 3], [WX1 - 3, WZ0 + 8, 3, 2.5]]) {
        w.ellipsoid(cx, G, cz, r, h, r, B.nug, (dx, dy, dz) => {
          if (dy < 1) return false;
          const hq = hash3(cx + dx, dy, cz + dz);
          if (hq > 0.86) S(cx + dx, G + dy, cz + dz, B.glint); else if (hq > 0.5) S(cx + dx, G + dy, cz + dz, B.gold); else return true;
          return false;
        });
      }
      // 쇠띠 궤짝
      for (const [x, z] of [[WX1 - 4, WZ0 + 13]]) { w.box(x, G + 1, z, x + 3, G + 3, z + 2, B.plank); w.box(x, G + 4, z, x + 3, G + 4, z + 2, B.ironDk); for (const xx of [x, x + 3]) w.box(xx, G + 1, z, xx, G + 4, z + 2, B.iron); S(x + 1, G + 3, z - 1, B.bronze); }
      crate(WX0 + 1, G + 1, WZ0 + 5, 4); crate(WX0 + 1, G + 5, WZ0 + 6, 3);
      // 저울: 돌 받침 위 기둥과 가로대(부품), 양쪽 접시
      const SCX = 122, SCZ = 99;
      w.box(SCX - 2, G + 1, SCZ - 2, SCX + 2, G + 2, SCZ + 2, B.graniteDk);
      w.box(SCX, G + 3, SCZ, SCX, G + 10, SCZ, B.bronzeDk); S(SCX, G + 11, SCZ, B.bronze);
      const beam = w.prop({ name: 'scalebeam', pivot: [SCX + 0.5, G + 12.5, SCZ + 0.5], axis: 'z' });
      beam.box(SCX - 6, G + 12, SCZ, SCX + 6, G + 12, SCZ, B.bronze); beam.box(SCX, G + 13, SCZ, SCX, G + 14, SCZ, B.bronze);
      for (const s of [-1, 1]) {
        beam.box(SCX + s * 6, G + 8, SCZ, SCX + s * 6, G + 11, SCZ, B.rope);
        beam.box(SCX + s * 6 - 2, G + 7, SCZ - 2, SCX + s * 6 + 2, G + 7, SCZ + 2, B.bronzeDk);
        beam.set(SCX + s * 6, G + 8, SCZ + 1, s < 0 ? B.ingot : B.nug); beam.set(SCX + s * 6 - 1, G + 8, SCZ, s < 0 ? B.ingot : B.glint);
      }
      w.box(WX0 + 13, G + 1, WZ0 + 5, WX0 + 13, G + 13, WZ0 + 5, B.timber); w.box(WX0 + 13, G + 14, WZ0 + 4, WX0 + 13, G + 14, WZ0 + 5, B.iron); lamp(WX0 + 13, G + 11, WZ0 + 4);
      lights.push({ name: 'store', p: [WX0 + 13.5, G + 12, WZ0 + 5.5], c: '#ffc060', i: 0.85, d: 32, flicker: 0.15, srcR: 4 });
      landmarks.push({ name: '금 창고', note: '금괴와 금 덩이가 쌓인 창고', p: [122, G + 30, 98], tag: 'VAULT' });

      // ───────── 동남쪽 아래층 수직갱: 수직갱 구멍, 짧은 머리틀, 쇠우리(부품) ─────────
      const DX = 134, DZ = 132, DN = 20;
      const QX0 = DX - CR, QX1 = DX + CR, QZ0 = DZ - CR, QZ1 = DZ + CR;
      for (let z = QZ0 - 2; z <= QZ1 + 2; z++) for (let x = QX0 - 2; x <= QX1 + 2; x++) MH.setH(w, x, z, G, (x + z) % 3 ? B.plank : B.timberDk, B.rk2);
      for (let z = QZ0; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) MH.setH(w, x, z, 4, B.basalt, B.basalt);
      for (let y = 6; y < G; y++) for (let z = QZ0 - 1; z <= QZ1 + 1; z++) for (let x = QX0 - 1; x <= QX1 + 1; x++) {
        if (x >= QX0 && x <= QX1 && z >= QZ0 && z <= QZ1) continue;
        const corner = (x === QX0 - 1 || x === QX1 + 1) && (z === QZ0 - 1 || z === QZ1 + 1);
        if (corner || y % 5 === 0) S(x, y, z, B.timber);
      }
      const DT = G + 34;
      for (const [x, z] of [[QX0 - 2, QZ0 - 2], [QX1 + 1, QZ0 - 2], [QX0 - 2, QZ1 + 1], [QX1 + 1, QZ1 + 1]]) w.box(x, G + 1, z, x + 1, DT, z + 1, B.timber);
      for (const y of [G + 18, DT]) w.walls(QX0 - 2, y, QZ0 - 2, QX1 + 2, y, QZ1 + 2, B.timber);
      for (const x of [QX0 - 2, QX1 + 2]) { w.line(x, G + 19, QZ0 - 1, x, DT - 1, QZ1, B.timberDk); w.line(x, G + 19, QZ1, x, DT - 1, QZ0 - 1, B.timberDk); }
      for (const z of [DZ - 3, DZ + 3]) w.box(QX0 - 2, DT + 1, z, QX1 + 2, DT + 1, z, B.timber);
      w.box(QX0 - 2, DT + 1, DZ, DX - 1, DT + 1, DZ, B.timber); w.box(DX + 1, DT + 1, DZ, QX1 + 2, DT + 1, DZ, B.timber);
      for (const x of [DX - 1, DX + 1]) w.box(x, DT + 2, DZ, x, DT + 7, DZ, B.timber);
      const sheaveD = w.prop({ name: 'downsheave', pivot: [DX + 0.5, DT + 7.5, DZ + 0.5], axis: 'x' });
      MH.ringProp(sheaveD, DX, DT + 7, DZ, 5, 'yz', B.bronze, B.iron, 6); MH.ringProp(sheaveD, DX, DT + 7, DZ, 4, 'yz', B.bronzeDk);
      for (let k = -3; k <= 3; k++) { sheaveD.set(DX, DT + 7 + k, DZ, B.iron); sheaveD.set(DX, DT + 7, DZ + k, B.iron); }
      const dnTop = makeCage('deeplift', DX, DZ, G, '-z');
      const dRopeLen = DT - dnTop;
      MH.rope(w, 'downrope', DX, DT, DZ, dRopeLen, B.rope);
      // 남·동 난간(북쪽은 타는 곳)
      for (let x = QX0 - 3; x <= QX1 + 3; x++) { S(x, G + 4, QZ1 + 3, B.timber); if (x % 3 === 0) w.box(x, G + 1, QZ1 + 3, x, G + 3, QZ1 + 3, B.timber); }
      for (let z = QZ0 - 3; z <= QZ1 + 3; z++) { S(QX1 + 3, G + 4, z, B.timber); if (z % 3 === 0) w.box(QX1 + 3, G + 1, z, QX1 + 3, G + 3, z, B.timber); }
      for (const s of [-1, 1]) lamp(DX + s * 8, G + 14, QZ0 - 3);
      lights.push({ name: 'deep', p: [DX + 0.5, G + 15, QZ0 - 3], c: '#ffb050', i: 0.8, d: 30, flicker: 0.2, srcR: 9 });

      // ───────── 바닥의 크고 작은 바위(묻힌 것 포함), 벽 밑 종유석 기둥 ─────────
      const KEEP = [[8, 10, 50, 52], [22, 48, 132, 72], [96, 6, 136, 36], [4, 90, 40, 116], [60, 88, 100, 114], [106, 86, 140, 110], [118, 114, 150, 148]];
      const kept = (x, z) => KEEP.some(([a, b, c, d]) => x >= a - 2 && x <= c + 2 && z >= b - 2 && z <= d + 2);
      for (let i = 0, made = 0; i < 900 && made < 22; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), gg = MH.g(w, x, z);
        if (gg !== G || kept(x, z) || w.get(x, gg + 1, z) || chD(x, z) < 7) continue;
        let near = 0; for (const [dx, dz] of [[4, 0], [-4, 0], [0, 4], [0, -4]]) if (MH.g(w, x + dx, z + dz) > G + 6) near++;
        if (near) { const h = w.ri(5, 12), r = w.r(1.2, 2.2); for (let k = 0; k < h; k++) w.cyl(x, z, gg + 1 + k, gg + 1 + k, r * Math.pow(1 - k / h, 0.8) + 0.3, k < h * 0.3 ? B.rk2 : B.rk3); }
        else MH.rock(w, x, gg, z, w.r(1.2, 2.4), hash3(x, 5, z) > 0.5 ? B.rock : B.rk3);
        made++;
      }

      // ───── 상호작용 ─────
      const ease = t => t * t * (3 - 2 * t);
      acts.push({
        name: '승강기 타고 위로', hint: '쇠우리 승강기에 올라타면 머리틀 도르래가 끼익 돌며 위층 무쇠골 광산으로 올라가요', ride: 'goldlift', goto: 'ironhollow-mine',
        hit: [LX - CR, G + 1, LZ - CR, LX + CR, G + 13, LZ + CR],
        run: async a => {
          a.flash('landing', 2.2, 1);
          a.burst([LX + 0.5, G + 1, LZ + 0.5], { n: 20, colors: ['#8a7a68', '#a89878'], speed: 3, up: 2, life: 1, gravity: 6, spread: 5 });
          await a.wait(0.3);
          await Promise.all([a.move('goldlift', [0, UP, 0], 5, ease), a.rope('uprope', uRopeLen, uRopeLen - UP, 5, ease), a.turn('upsheave', [10, 0, 0], 5, ease)]);
        },
      });
      acts.push({
        name: '승강기 타고 아래로', hint: '쇠우리 승강기에 올라타면 깊은 수직갱 아래 푸른빛 오리하르콘 광산으로 내려가요', ride: 'deeplift', goto: 'ironhollow-orichalcum',
        hit: [QX0, G + 1, QZ0, QX1, G + 13, QZ1],
        run: async a => {
          a.flash('deep', 2.5, 1.2);
          a.burst([DX + 0.5, DT + 4, DZ + 0.5], { n: 18, colors: ['#8a7a68', '#b8a080'], speed: 2, up: 1, life: 1.2, gravity: 4, spread: 2 });
          await a.wait(0.4);
          await Promise.all([a.move('deeplift', [0, -DN, 0], 4.5, ease), a.rope('downrope', dRopeLen, dRopeLen + DN, 4.5, ease), a.turn('downsheave', [-10, 0, 0], 4.5, ease)]);
          a.burst([DX + 0.5, G - DN + 2, DZ + 0.5], { n: 22, colors: ['#5ad8d0', '#8a7a68'], speed: 3, up: 4, life: 1, gravity: 6, spread: 4 });
        },
      });
      acts.push({
        name: '금맥 캐기', hint: '곡괭이가 석영 띠의 금맥 바위를 깡! 깡! 내리찍을 때마다 금빛 조각이 번쩍이며 튀어요', hit: [OX - 8, G + 1, OZ - 5, OX + 8, G + 15, PZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('goldpick', [0.35, 0, 0], 0.4);
            await a.turn('goldpick', [-1.35, 0, 0], 0.22, t => t * t);
            a.flash('vein', 4, 0.3);
            a.burst([OX + 0.5, G + 5, OZ + 4], { n: 30, colors: ['#ffd050', '#fff2a8', '#ffffff', '#d8d0c0'], speed: 10, up: 8, life: 0.8, gravity: 18, spread: 1.2 });
            await a.wait(0.2);
          }
          await a.turn('goldpick', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '사금 접시 일기', hint: '사금 접시가 물길에 잠겨 빙글빙글 돌며 모래를 씻어 내고, 바닥에 금 알갱이가 반짝 남아요', hit: [PX - 4, G - 3, PZp - 4, PX + 4, G + 6, PZp + PDZ + 3],
        run: async a => {
          await a.move('goldpan', [0, -3, PDZ], 0.9);
          for (let k = 0; k < 4; k++) {
            await a.turn('goldpan', [0.18, k * 1.6 + 0.8, 0.12], 0.35);
            a.burst([PX + 0.5, G - 1, PZp + PDZ + 0.5], { n: 14, colors: ['#d8f0e8', '#9a8662', '#ffffff'], speed: 3, up: 3, life: 0.6, gravity: 14, spread: 2.4 });
            await a.turn('goldpan', [-0.18, k * 1.6 + 1.6, -0.12], 0.35);
          }
          await a.turn('goldpan', [0, 6.4, 0], 0.3);
          await a.move('goldpan', [0, 0, 0], 0.9);
          a.unwind('goldpan'); await a.turn('goldpan', [0, 0, 0], 0.2);
          a.flash('flake', 3, 1.2);
          a.burst([PX + 0.5, G + 3, PZp + 0.5], { n: 26, colors: ['#ffe070', '#fff2a8', '#ffffff'], speed: 2, up: 4, life: 1.2, gravity: 2, spread: 1.4 });
        },
      });
      acts.push({
        name: '금괴 붓기', hint: '풀무가 훅훅 바람을 넣으면 화로가 달아오르고, 도가니가 기울어 녹은 금을 틀에 부어 금괴가 돼요', hit: [FX - 11, G + 1, FZ - 6, KX + 12, G + 12, FZ + 5],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.tween('bellows', { scl: [1, 0.55, 1] }, 0.3); a.flash('furnace', 2.6, 0.2);
            a.burst([FX + 0.5, G + 4, FZ - 4.5], { n: 16, colors: ['#ff7a2a', '#ffb04a', '#ffe08a'], speed: 4, up: 4, life: 0.7, gravity: -2, spread: 1.4 });
            await a.tween('bellows', { scl: [1, 1, 1] }, 0.35);
          }
          await a.turn('crucible', [0, 0, -1.5], 1.1);
          for (let k = 0; k < 6; k++) { a.burst([KX + 3.5, G + 4, KZ + 0.5], { n: 12, colors: ['#ffb04a', '#ffe08a', '#ff7a2a'], speed: 1.2, up: 0.5, life: 0.5, gravity: 18, spread: 0.6 }); await a.wait(0.25); }
          a.burst([KX + 7, G + 4, KZ + 0.5], { n: 30, colors: ['#ffd050', '#fff2a8'], speed: 3, up: 5, life: 1, gravity: 4, spread: 4 });
          await a.turn('crucible', [0, 0, 0], 1);
        },
      });
      acts.push({
        name: '광차 밀기', hint: '금 덩이를 가득 실은 광차가 덜컹덜컹 레일을 따라 금맥 막장 쪽 끝까지 달렸다 돌아와요', hit: [CXc - 7, G + 2, RZ - 6, CXc + 7, G + 12, RZ + 6],
        run: async a => {
          a.flash('gallery', 2, 1);
          await a.drive('goldcart', [[20, 0, 0], [46, 0, 0], [72, 0, 0]], 5, { fwd: '+x' });
          a.burst([CXc + 72.5, G + 11, RZ + 0.5], { n: 22, colors: ['#ffd050', '#d8a828', '#fff2a8'], speed: 5, up: 6, life: 0.9, gravity: 14, spread: 3 });
          await a.wait(0.5);
          await a.drive('goldcart', [[46, 0, 0], [20, 0, 0], [0, 0, 0]], 5, { fwd: '+x' });
          a.unwind('goldcart'); await a.turn('goldcart', [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '금 저울 달기', hint: '창고 저울에 금괴와 금 덩이를 올리면 가로대가 이리저리 기울다가 딱 맞게 멈춰요', hit: [SCX - 9, G + 1, SCZ - 3, SCX + 9, G + 16, SCZ + 3],
        run: async a => {
          a.flash('store', 2, 2.4);
          for (const r of [0.38, -0.3, 0.2, -0.12, 0.05]) await a.turn('scalebeam', [0, 0, r], 0.5);
          await a.turn('scalebeam', [0, 0, 0], 0.4);
          a.burst([SCX + 0.5, G + 9, SCZ + 0.5], { n: 24, colors: ['#ffd050', '#fff2a8', '#ffffff'], speed: 2, up: 4, life: 1, gravity: 1, spread: 5 });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
