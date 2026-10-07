// 무쇠골 광산(하위 지도) — 광산 입구 갱도를 광차로 달려 들어온 산속 깊은 곳. 북쪽 바위벽의 갱도에서 레일이 나와
// 완충 멈춤목 앞 종착장에서 끝나고, 동쪽으로 갱목을 짠 갱도가 빛나는 광맥 막장과 수정 동굴, 승강기 수직갱으로 이어진다.
// 남쪽엔 광석 선별대와 용광로로 내려가는 광석 슈트, 서남쪽엔 맑은 지하 물웅덩이와 두레박. 남·동쪽 바위는 잘라 낮췄다
// (160칸, 고해상도 2배 · 1칸 ≈ 25cm: 비스듬한 지층 띠, 벽을 타고 흐르는 광맥, 육각 기둥 수정, 2칸 두께 갱목 틀, 침목 위 레일)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 112, G = 28;
  MAPS.push({
    id: 'ironhollow-mine', cat: 'village', sub: true, parent: 'ironhollow', name: '무쇠골 광산', en: 'Ironhollow · The Deep Mine', color: '#e8c040', seed: 1273, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '무쇠골 광산 입구에서 광차로 한참을 달려 들어온 산속 깊은 갱도. 바위벽을 타고 금빛·푸른빛 광맥이 흐르고, 동쪽 동굴에는 사람 키보다 큰 수정이 숨 쉬듯 빛난다. 쇠우리 승강기는 더 깊은 수직갱으로 내려가고, 골라낸 광석은 슈트를 타고 아래 용광로로 떨어진다.',
    info: { title: '장소 정보', en: 'THE DEEP MINE', rows: [['종착장', '레일 · 완충 멈춤목 · 광차'], ['막장', '빛나는 광맥 · 곡괭이 · 수정 동굴'], ['작업장', '승강기 수직갱 · 광석 선별대 · 광석 슈트 · 지하 물웅덩이']] },
    sky: ['#20160f', '#0c0806', '#5a3a24'], stars: false,
    hemi: ['#e8d0b8', '#1a1410', 0.56], sun: ['#ffc890', 0.5, [0.4, 1, 0.6]],
    day: { sky: ['#4a3626', '#1a120c', '#8a6040'], stars: false, hemi: ['#f0e0d0', '#2a2018', 0.62], sun: ['#ffe8d0', 0.62, [0.4, 1, 0.6]], haze: '#6a4a34' },
    liquid: ['#123a46', '#2e7a88', '#c8f0f8'], liqSpeed: 0.25,
    fog: { start: 0.92, floor: G - 28, depth: 12, haze: [12, 0.14, 12], hazeColor: '#3a2618' },
    camY: 4, zoom: 1.5,
    particles: [
      { n: 90, colors: ['#8a7a70', '#6a5c54', '#a89888'], mode: 'drift', speed: 0.3, wind: 0.2, area: [80, 80, 60], y0: G + 2, y1: G + 26, glow: false },
      { n: 70, colors: ['#7ae8ff', '#c890ff', '#ffffff'], mode: 'rise', speed: 0.4, area: [132, 33, 12], y0: G + 2, y1: G + 30 },
      { n: 40, colors: ['#ffd070', '#ffe8a0'], mode: 'rise', speed: 0.3, area: [88, 28, 18], y0: G + 4, y1: G + 26 },
    ],
    blocks: {
      rk1: { c: '#5e5450', v: 0.07, pat: 'big' }, rk2: { c: '#4a423e', v: 0.07, pat: 'big' }, rk3: { c: '#6c6056', v: 0.07, pat: 'big' }, rkR: { c: '#6e5244', v: 0.07, pat: 'big' }, basalt: { c: '#2e2826', v: 0.06, pat: 'stone' },
      rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' }, gravel: { c: '#5a504a', top: '#746a62', v: 0.12 }, scree: { c: '#5a504a', top: '#82786e', v: 0.14 }, grit: { c: '#3e3632', top: '#4a423c', v: 0.12 },
      mud: { c: '#4a3e34', top: '#5a4a3c', v: 0.08 }, sand: { c: '#8a7a62', top: '#9a8a70', v: 0.08 }, pebble: { c: '#6a625a', top: '#7e766c', v: 0.16 }, weed: { c: '#2e4a40', top: '#3a5e4e', v: 0.1 }, silt: { c: '#3a3632', top: '#423c36', v: 0.06 },
      drip: { c: '#8a8278', v: 0.06 }, dripDk: { c: '#6a625a', v: 0.06 },
      graniteDk: { c: '#5e564e', v: 0.05 }, cap: { c: '#a49a8e', v: 0.04 },
      bronze: { c: '#c08a3a', v: 0.06 }, bronzeDk: { c: '#94652a', v: 0.05 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#26262c', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 },
      timber: { c: '#6a4428', v: 0.06, pat: 'log' }, timberDk: { c: '#4e321e', v: 0.05 }, plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, rope: { c: '#b8a080', v: 0.04 },
      coal: { c: '#141010', v: 0 }, coal2: { c: '#241c1a', v: 0.04 }, ore: { c: '#e8c040', v: 0.1 }, oreB: { c: '#5ab0e0', v: 0.1 },
      rail: { c: '#8a8a92', v: 0.03 }, sleeper: { c: '#5a3a24', v: 0.05 }, crate: { c: '#9a7048', v: 0.05, pat: 'plank' }, crateEdge: { c: '#6a4a2e', v: 0.04 },
      veinG: { c: '#ffc848', glow: true }, veinB: { c: '#5ad8ff', glow: true }, crysB: { c: '#7ae8ff', glow: true }, crysV: { c: '#c890ff', glow: true }, crysW: { c: '#e8fcff', glow: true },
      fireY: { c: '#ffe090', glow: true }, ember: { c: '#ff7a2a', glow: true }, molten: { c: '#ffb04a', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const lights = [], acts = [], landmarks = [];
      const RX = 40, CZ = 62;                                        // 레일 가운데 x, 광차가 쉬는 자리 z

      // ───────── 바위와 빈 곳(방·갱도) ─────────
      const ell = (x, z, cx, cz, rx, rz) => (Math.hypot((x - cx) / rx, (z - cz) / rz) - 1) * Math.min(rx, rz);
      const cap = (x, z, ax, az, bx, bz, r) => MH.segDist(x, z, ax, az, bx, bz) - r;
      const POOL = [42, 118, 23, 24];
      const rooms = (x, z) => Math.min(
        ell(x, z, 42, 56, 17, 26), cap(x, z, 40, 34, 40, 44, 12),             // 종착장
        cap(x, z, 54, 56, 120, 56, 8),                                         // 갱목 갱도
        ell(x, z, 88, 33, 24, 12), ell(x, z, 132, 33, 16, 15),                 // 광맥 막장, 수정 동굴
        ell(x, z, 132, 79, 17, 17),                                            // 승강기 방
        ell(x, z, 94, 110, 24, 20), cap(x, z, 94, 62, 94, 92, 8),              // 선별장
        ell(x, z, ...POOL), cap(x, z, 42, 80, 42, 98, 9), cap(x, z, 60, 118, 74, 112, 7),   // 물웅덩이
        ell(x, z, 124, 128, 10, 9), cap(x, z, 110, 120, 122, 126, 7), cap(x, z, 120, 94, 120, 124, 8));   // 슈트와 구멍
      const forced = (x, z) => (x >= 28 && x <= 52 && z >= 30 && z <= 80) || (x >= 54 && x <= 120 && Math.abs(z - 56) <= 7);
      const tunnelRock = (x, z) => z < 30 && Math.abs(x - RX) < 15;
      const sdN = (x, z) => rooms(x, z) + (n.fbm(x * 0.07, z * 0.07, 3) - 0.5) * 7;
      const poolP = (x, z) => Math.hypot((x - POOL[0]) / POOL[2], (z - POOL[1]) / POOL[3]);
      // 바위 속살: 비스듬히 기운 지층 띠(두께·색이 제각각)
      let sx_ = -1, sz_ = -1, so_ = 0;
      const strata = (x, z, y) => {
        if (x !== sx_ || z !== sz_) { sx_ = x; sz_ = z; so_ = x * 0.13 + z * 0.05 + n.fbm(x * 0.03, z * 0.03, 2) * 18; }
        if (y < 10 + hash3(x >> 3, 1, z >> 3) * 4) return B.basalt;
        const r = hash3(Math.floor((y + so_) / 4), 23, 5);
        return r < 0.42 ? B.rk1 : r < 0.66 ? B.rk2 : r < 0.84 ? B.rk3 : B.rkR;
      };
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const sd = sdN(x, z), open = !tunnelRock(x, z) && (forced(x, z) || sd < 0);
          if (open) {
            const p = poolP(x, z);
            if (p < 0.95) return G - Math.round(8 * MH.sstep(0.95, 0.35, p) + (n.fbm(x * 0.12, z * 0.12, 2) - 0.5) * 2 * MH.sstep(0.9, 0.5, p));
            if (forced(x, z)) return G;
            // 벽 밑 너덜: 벽 가까이 1~2칸 쌓인 돌무더기(곳곳에만)
            return G + Math.max(0, Math.round((sd + 3) * 0.8 * MH.sstep(0.42, 0.6, n.fbm(x * 0.09, z * 0.09 + 5, 2))));
          }
          let top = G + 12 + n.fbm(x * 0.05, z * 0.05, 3) * 9 + 26 * MH.sstep(26, 4, z) + 20 * MH.sstep(22, 4, x);
          top = MH.lerp(top, G + 6 + n.fbm(x * 0.2, z * 0.2, 2) * 3, Math.max(MH.sstep(128, 141, z), MH.sstep(142, 152, x)));
          if (tunnelRock(x, z)) top = Math.max(top, G + 30);
          if (x >= 52 && x <= 122 && Math.abs(z - 56) <= 13) top = Math.max(top, G + 18);   // 갱도 들보가 걸치는 양쪽 바위
          return Math.max(G + 8, Math.round(top + Math.min(3, sd * 0.4)));
        },
        surface: (x, z, y, s) => {
          if (y < G) {
            if (y >= G - 2) return hash3(x >> 1, 2, z >> 1) > 0.75 ? B.pebble : B.sand;
            if (y >= G - 5) { const v = n.fbm(x * 0.15, z * 0.15 + 9, 2); return v > 0.58 ? B.weed : v < 0.38 ? B.pebble : B.sand; }
            return n.fbm(x * 0.2, z * 0.2, 2) > 0.6 ? B.weed : B.silt;
          }
          if (y <= G + 2) {
            if (y > G) return B.scree;
            const v = n.fbm(x * 0.08, z * 0.08, 3);
            if (poolP(x, z) < 1.25 && v > 0.45) return B.mud;
            return v < 0.36 ? B.grit : v > 0.64 ? B.scree : B.gravel;
          }
          if (s >= 3) return strata(x, z, y);
          return n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.scree : B.rock;
        },
        under: (x, z, y) => strata(x, z, y),
      });
      MH.water(w, G - 1, (x, z) => poolP(x, z) < 1);

      // ───────── 벽을 타고 흐르는 광맥(빛나는 금빛·푸른빛 줄기와 둘레의 광석 알갱이) ─────────
      const solidRock = id => id === B.rk1 || id === B.rk2 || id === B.rk3 || id === B.rkR || id === B.rock || id === B.scree;
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const top = MH.g(w, x, z); if (top <= G + 2) continue;
        const rich = (z < 50 && x > 60) ? 1 : (z < 70 && x > 54) ? 0.5 : 0, blue = x > 112 || hash3(x >> 4, 3, z >> 4) > 0.8;
        if (!rich && hash3(x >> 3, 4, z >> 3) < 0.85) continue;
        for (let y = G + 1; y <= Math.min(top - 1, G + 34); y++) {
          if (!solidRock(w.get(x, y, z))) continue;
          if (w.get(x + 1, y, z) && w.get(x - 1, y, z) && w.get(x, y, z + 1) && w.get(x, y, z - 1)) continue;
          const t = x * 0.55 + y * 0.9 - z * 0.35 + n.fbm(x * 0.04, z * 0.04 + y * 0.03, 2) * 16, f = Math.abs(((t / 11) % 1 + 1) % 1 - 0.5);
          if (f < 0.05 && n.fbm(x * 0.1 + y * 0.05, z * 0.1, 2) > 0.62 - rich * 0.16) S(x, y, z, blue ? B.veinB : B.veinG);
          else if (f < 0.11 && hash3(x >> 1, y >> 1, z >> 1) > 0.9 - rich * 0.25) S(x, y, z, blue ? B.oreB : B.ore);
        }
      }

      // ───────── 레일 갱도(북쪽 바위 속, 안쪽은 어둠)와 갱목 문틀 ─────────
      const inT = (dx, y) => Math.abs(dx) <= 8 && y >= G + 1 && (y <= G + 12 || dx * dx + (y - G - 12) * (y - G - 12) <= 72.25);
      for (let z = 4; z <= 29; z++) for (let x = RX - 9; x <= RX + 9; x++) for (let y = G + 1; y <= G + 22; y++) if (inT(x - RX, y)) S(x, y, z, 0);
      for (let x = RX - 9; x <= RX + 9; x++) for (let y = G + 1; y <= G + 22; y++) if (inT(x - RX, y)) S(x, y, 3, B.coal);
      for (let z = 4; z <= 29; z++) for (let x = RX - 8; x <= RX + 8; x++) S(x, G, z, hash3(x >> 1, 4, z >> 1) < 0.9 - z / 30 ? B.coal2 : B.graniteDk);
      for (const z of [8, 18]) {
        for (const x of [RX - 8, RX - 7, RX + 7, RX + 8]) w.box(x, G + 1, z, x, G + 18, z + 1, B.timber);
        w.box(RX - 8, G + 19, z, RX + 8, G + 20, z + 1, B.timber);
        for (const s of [-1, 1]) w.box(RX + s * 6, G + 17, z, RX + s * 6, G + 18, z + 1, B.timberDk);
      }
      // 문틀: 굵은 기둥 둘과 이중 상인방, 까치발, 양쪽 등
      for (const x0 of [RX - 11, RX + 10]) w.box(x0, G + 1, 30, x0 + 1, G + 22, 31, B.timber);
      w.box(RX - 12, G + 21, 30, RX + 12, G + 23, 31, B.timber); w.box(RX - 12, G + 24, 30, RX + 12, G + 24, 31, B.timberDk);
      for (const s of [-1, 1]) w.line(RX + s * 9, G + 20, 31, RX + s * 6, G + 23, 31, B.timberDk);
      for (const x of [RX - 11, RX + 11]) { S(x, G + 16, 32, B.iron); S(x, G + 15, 32, B.fireY); S(x, G + 14, 32, B.fireY); S(x, G + 13, 32, B.ironDk); }
      lights.push({ name: 'portal', p: [RX + 0.5, G + 15, 33], c: '#ffb050', i: 0.9, d: 34, flicker: 0.2, srcR: 12 });

      // ───────── 종착장: 침목 위 레일, 완충 멈춤목, 광차 ─────────
      for (let z = 30; z <= 80; z++) for (let x = RX - 8; x <= RX + 8; x++) if (MH.g(w, x, z) === G && (Math.abs(x - RX) <= 6 || hash3(x >> 1, 6, z >> 1) > 0.5)) S(x, G, z, B.grit);
      for (let z = 4; z <= 73; z++) {
        if (z % 4 < 2) w.box(RX - 6, G, z, RX + 6, G, z, B.sleeper);
        S(RX - 4, G + 1, z, B.rail); S(RX + 4, G + 1, z, B.rail);
      }
      // 완충 멈춤목: 기둥 둘, 굵은 가로 들보와 쇠 완충판, 뒤로 버틴 빗버팀, 뒤에 쌓은 모래 둔덕
      for (const x0 of [RX - 7, RX + 6]) w.box(x0, G + 1, 75, x0 + 1, G + 8, 76, B.timber);
      w.box(RX - 8, G + 4, 74, RX + 8, G + 6, 75, B.timber);
      for (const x of [RX - 5, RX + 5]) { w.box(x - 1, G + 3, 73, x + 1, G + 5, 73, B.iron); S(x, G + 4, 72, B.bronzeDk); }
      for (const x of [RX - 6, RX + 6]) w.line(x, G + 6, 77, x, G + 1, 81, B.timber, 0.6);
      w.ellipsoid(RX, G, 80, 9, 3, 3, B.sand, (dx, dy) => dy >= 0);
      for (const x of [RX - 7, RX + 7]) { S(x, G + 9, 75, B.iron); S(x, G + 10, 75, B.fireY); S(x, G + 11, 75, B.iron); }
      lights.push({ name: 'terminal', p: [RX + 0.5, G + 12, 74], c: '#ffb050', i: 0.8, d: 30, flicker: 0.2, srcR: 8 });
      // 광차(부품): 레일 위 바퀴, 쇠 차체와 청동 모서리, 차체 높이까지 고르게 채운 광석(올라설 수 있게 평평)
      const cart = w.prop({ name: 'cart', pivot: [RX + 0.5, G + 2, CZ + 0.5] });
      for (const x of [RX - 4, RX + 4]) for (const zc of [CZ - 4, CZ + 4]) { for (let dy = 0; dy <= 2; dy++) cart.set(x, G + 2 + dy, zc, B.coal2); cart.set(x, G + 3, zc - 1, B.coal2); cart.set(x, G + 3, zc + 1, B.coal2); cart.set(x, G + 3, zc, B.iron); }
      cart.box(RX - 3, G + 3, CZ - 4, RX + 3, G + 3, CZ - 4, B.ironDk); cart.box(RX - 3, G + 3, CZ + 4, RX + 3, G + 3, CZ + 4, B.ironDk);
      cart.box(RX - 5, G + 5, CZ - 6, RX + 5, G + 5, CZ + 6, B.iron);
      cart.walls(RX - 5, G + 6, CZ - 6, RX + 5, G + 9, CZ + 6, B.iron);
      for (const x of [RX - 5, RX + 5]) for (const z of [CZ - 6, CZ + 6]) cart.box(x, G + 5, z, x, G + 10, z, B.bronze);
      for (let z = CZ - 6; z <= CZ + 6; z++) { cart.set(RX - 5, G + 10, z, B.bronze); cart.set(RX + 5, G + 10, z, B.bronze); }
      for (let x = RX - 5; x <= RX + 5; x++) { cart.set(x, G + 10, CZ - 6, B.bronze); cart.set(x, G + 10, CZ + 6, B.bronze); }
      for (let z = CZ - 5; z <= CZ + 5; z++) for (let x = RX - 4; x <= RX + 4; x++) {
        const hq = hash3(x >> 1, 9, z >> 1);
        for (let y = G + 6; y <= G + 9; y++) cart.set(x, y, z, y === G + 9 ? (hq > 0.72 ? B.oreB : hq > 0.3 ? B.ore : B.gravel) : B.gravel);
      }
      for (const z of [CZ - 7, CZ + 7]) { cart.set(RX, G + 4, z, B.iron); cart.set(RX, G + 4, z + (z < CZ ? -1 : 1), B.ironDk); }
      // 종착장 둘레: 광석 상자, 연장 걸이
      const crate = (x, y, z, s) => { for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) { const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1); S(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate); } };
      for (const [x, z, s] of [[52, 40, 5], [52, 46, 4], [53, 41, 0]]) if (s) crate(x, G + 1, z, s);
      crate(52, G + 6, 41, 3);
      for (const [x, z] of [[52, 40], [52, 46]]) for (let dx = 1; dx <= 2; dx++) S(x + dx, G + (z === 40 ? 9 : 5), z + 1, dx & 1 ? B.ore : B.oreB);
      w.box(26, G + 9, 64, 26, G + 10, 76, B.timber);
      for (let z = 65; z <= 75; z += 3) { w.box(27, G + 2, z, 27, G + 9, z, B.timber); w.box(27, G + 2, z, 27, G + 3, z + 1, B.iron); }

      // ───────── 갱목 갱도(종착장 → 동쪽): 두께 2칸 기둥과 들보, 까치발, 벽 널판, 걸린 등, 좁은 선로 ─────────
      for (let x = 58; x <= 118; x++) {
        if (x % 4 < 2) w.box(x, G, 52, x, G, 60, B.sleeper);
        S(x, G + 1, 53, B.rail); S(x, G + 1, 59, B.rail);
      }
      for (let x = 60; x <= 116; x += 8) {
        for (const z of [46, 47, 65, 66]) w.box(x, G + 1, z, x + 1, G + 14, z, B.timber);
        w.box(x, G + 15, 45, x + 1, G + 16, 67, B.timber);
        for (const z of [48, 64]) w.box(x, G + 13, z, x + 1, G + 14, z, B.timberDk);
        if (x < 116) for (const z of [45, 67]) w.box(x + 2, G + 3, z, x + 7, G + 13, z, (x >> 3) & 1 ? B.plank : B.timberDk);
        if (x === 68 || x === 92) { S(x, G + 14, 56, B.iron); S(x, G + 13, 56, B.iron); S(x, G + 12, 56, B.fireY); S(x, G + 11, 56, B.fireY); S(x, G + 10, 56, B.ironDk); }
      }
      lights.push({ name: 'gallery', p: [68.5, G + 11, 56.5], c: '#ffb050', i: 0.7, d: 26, flicker: 0.25 });
      lights.push({ name: 'gallery2', p: [92.5, G + 11, 56.5], c: '#ffb050', i: 0.7, d: 26, flicker: 0.25 });

      // ───────── 광맥 막장: 빛나는 광석 바위와 받침대에 꽂힌 곡괭이(부품) ─────────
      const OX = 88, OZ = 25;
      w.ellipsoid(OX, G + 1, OZ, 5, 4, 3.5, B.rk2, (dx, dy) => dy >= -1);
      for (let dz = -3; dz <= 3; dz++) for (let dx = -5; dx <= 5; dx++) for (let dy = 0; dy <= 4; dy++) {
        const id = w.get(OX + dx, G + 1 + dy, OZ + dz);
        if (id === B.rk2 && hash3(OX + dx, dy, OZ + dz) > 0.62) S(OX + dx, G + 1 + dy, OZ + dz, (dx + dy) % 3 ? B.veinG : B.ore);
      }
      // 부서진 광석 더미
      for (let dz = -3; dz <= 3; dz++) for (let dx = -4; dx <= 4; dx++) {
        const hh = Math.round(2.2 - Math.hypot(dx, dz * 1.3) * 0.6 + hash3(dx, 5, dz));
        for (let y = 1; y <= hh; y++) S(OX - 10 + dx, G + y, OZ + 8 + dz, y === hh ? (hash3(dx, y, dz) > 0.6 ? B.ore : B.gravel) : B.gravel);
      }
      const PZ = OZ + 10;
      w.box(OX - 2, G + 1, PZ - 1, OX + 2, G + 2, PZ + 1, B.graniteDk);
      for (const x of [OX - 2, OX + 2]) w.box(x, G + 3, PZ, x, G + 5, PZ, B.timber);
      S(OX - 1, G + 4, PZ, B.iron); S(OX + 1, G + 4, PZ, B.iron);
      const pick = w.prop({ name: 'pickaxe', pivot: [OX + 0.5, G + 4.5, PZ + 0.5], axis: 'x' });
      pick.box(OX, G + 4, PZ, OX, G + 12, PZ, B.timber); pick.set(OX, G + 5, PZ, B.timberDk);
      pick.box(OX, G + 13, PZ - 4, OX, G + 13, PZ + 3, B.steel); pick.box(OX, G + 12, PZ - 1, OX, G + 14, PZ + 1, B.iron);
      pick.set(OX, G + 12, PZ - 4, B.steel); pick.set(OX, G + 12, PZ + 3, B.steel);
      lights.push({ name: 'vein', p: [OX + 0.5, G + 8, OZ + 0.5], c: '#ffc848', i: 0.8, d: 36, flicker: 0.1, srcR: 6 });
      landmarks.push({ name: '빛나는 광맥', note: '금빛·푸른빛 광맥이 흐르는 막장', p: [OX, G + 40, 22], tag: 'VEIN' });

      // ───────── 수정 동굴: 육각 기둥 수정 무리(가운데 큰 무리는 부품) ─────────
      const crystal = (T, x, y, z, h, r, lx, lz, core) => {
        for (let k = 0; k < h; k++) {
          const t = k / h, rr = t < 0.7 ? r : r * (1 - t) / 0.3 + 0.3, cx = Math.round(x + lx * k), cz = Math.round(z + lz * k), R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (Math.abs(dx) + Math.abs(dz) * 0.58 <= rr + 0.2 && Math.abs(dz) <= rr) T.set(cx + dx, y + k, cz + dz, k >= h - 2 ? B.crysW : ((dx + dz + k) % 5 === 0 ? B.crysW : core));
        }
      };
      const CX = 132, CZc = 32;
      const crys = w.prop({ name: 'crystal', pivot: [CX + 0.5, G + 1, CZc + 0.5] });
      w.ellipsoid(CX, G, CZc, 5, 2, 5, B.rk2, (dx, dy) => dy >= 0);
      crystal(crys, CX, G + 3, CZc, 18, 2.4, 0, 0, B.crysB);
      crystal(crys, CX - 3, G + 2, CZc + 2, 12, 1.6, -0.25, 0.15, B.crysV);
      crystal(crys, CX + 3, G + 2, CZc - 2, 13, 1.6, 0.22, -0.18, B.crysB);
      crystal(crys, CX + 2, G + 2, CZc + 3, 9, 1.2, 0.2, 0.25, B.crysV);
      crystal(crys, CX - 3, G + 2, CZc - 3, 8, 1.1, -0.2, -0.25, B.crysB);
      // 둘레 바닥과 벽의 작은 무리
      for (let i = 0, made = 0; i < 400 && made < 18; i++) {
        const a = w.r(0, Math.PI * 2), rr = w.r(8, 16), x = Math.round(CX + Math.cos(a) * rr), z = Math.round(CZc + Math.sin(a) * rr);
        const gg = MH.g(w, x, z); if (gg < G || gg > G + 2 || w.get(x, gg + 1, z)) continue;
        const k = w.ri(2, 4), core = made % 3 ? B.crysB : B.crysV;
        for (let q = 0; q < k; q++) crystal(w, x + w.ri(-1, 1), gg + 1, z + w.ri(-1, 1), w.ri(4, 9), w.r(0.8, 1.4), Math.cos(a) * w.r(-0.1, 0.35), Math.sin(a) * w.r(-0.1, 0.35), core);
        made++;
      }
      lights.push({ name: 'crystal', p: [CX + 0.5, G + 12, CZc + 0.5], c: '#8ae0ff', i: 1, d: 40, flicker: 0.05, srcR: 6 });
      landmarks.push({ name: '수정 동굴', note: '숨 쉬듯 빛나는 큰 수정', p: [CX, G + 36, CZc], tag: 'CRYSTAL' });

      // ───────── 승강기 수직갱: 갱목 머리틀, 도르래, 밧줄, 쇠우리(부품) ─────────
      const LX = 132, LZ = 79, SX0 = 126, SX1 = 138, SZ0 = 73, SZ1 = 85;
      for (let z = SZ0 - 2; z <= SZ1 + 2; z++) for (let x = SX0 - 2; x <= SX1 + 2; x++) MH.setH(w, x, z, G, (x + z) % 3 ? B.plank : B.timberDk, B.rk2);
      for (let z = SZ0; z <= SZ1; z++) for (let x = SX0; x <= SX1; x++) MH.setH(w, x, z, 4, B.basalt, B.basalt);
      for (let y = 6; y < G; y++) for (let z = SZ0 - 1; z <= SZ1 + 1; z++) for (let x = SX0 - 1; x <= SX1 + 1; x++) {
        if (x >= SX0 && x <= SX1 && z >= SZ0 && z <= SZ1) continue;
        const corner = (x === SX0 - 1 || x === SX1 + 1) && (z === SZ0 - 1 || z === SZ1 + 1);
        if (corner || y % 5 === 0) S(x, y, z, B.timber);
      }
      for (const [x, z] of [[SX0 - 2, SZ0 - 2], [SX1 + 1, SZ0 - 2], [SX0 - 2, SZ1 + 1], [SX1 + 1, SZ1 + 1]]) w.box(x, G + 1, z, x + 1, G + 40, z + 1, B.timber);
      for (const y of [G + 18, G + 30, G + 40]) w.walls(SX0 - 2, y, SZ0 - 2, SX1 + 2, y, SZ1 + 2, B.timber);
      for (const x of [SX0 - 2, SX1 + 2]) { w.line(x, G + 19, SZ0 - 1, x, G + 29, SZ1, B.timberDk); w.line(x, G + 19, SZ1, x, G + 29, SZ0 - 1, B.timberDk); }
      for (const z of [LZ - 3, LZ + 3]) w.box(SX0 - 2, G + 41, z, SX1 + 2, G + 41, z, B.timber);
      w.box(SX0 - 2, G + 41, LZ, LX - 1, G + 41, LZ, B.timber); w.box(LX + 1, G + 41, LZ, SX1 + 2, G + 41, LZ, B.timber);
      for (const x of [LX - 1, LX + 1]) w.box(x, G + 42, LZ, x, G + 47, LZ, B.timber);
      // 둘레 난간(서쪽은 타는 곳이라 비운다)
      for (let x = SX0 - 1; x <= SX1 + 2; x++) for (const z of [SZ0 - 3, SZ1 + 3]) { S(x, G + 4, z, B.timber); if (x % 3 === 0) w.box(x, G + 1, z, x, G + 3, z, B.timber); }
      for (let z = SZ0 - 3; z <= SZ1 + 3; z++) { S(SX1 + 3, G + 4, z, B.timber); if (z % 3 === 0) w.box(SX1 + 3, G + 1, z, SX1 + 3, G + 3, z, B.timber); }
      const sheave = w.prop({ name: 'sheave', pivot: [LX + 0.5, G + 47.5, LZ + 0.5], axis: 'x' });
      MH.ringProp(sheave, LX, G + 47, LZ, 5, 'yz', B.bronze, B.iron, 6); MH.ringProp(sheave, LX, G + 47, LZ, 4, 'yz', B.bronzeDk);
      for (let k = -3; k <= 3; k++) { sheave.set(LX, G + 47 + k, LZ, B.iron); sheave.set(LX, G + 47, LZ + k, B.iron); }
      const cy0 = G, cageTop = G + 12, ropeTop = G + 41, ropeLen = ropeTop - cageTop;
      MH.rope(w, 'srope', LX, ropeTop, LZ, ropeLen, B.rope);
      const cage = w.prop({ name: 'minelift', pivot: [LX + 0.5, cy0, LZ + 0.5] });
      cage.box(LX - 4, cy0, LZ - 4, LX + 4, cy0, LZ + 4, B.plank);
      for (const [x, z] of [[LX - 4, LZ - 4], [LX + 4, LZ - 4], [LX - 4, LZ + 4], [LX + 4, LZ + 4]]) cage.box(x, cy0 + 1, z, x, cageTop - 1, z, B.iron);
      for (let k = -4; k <= 4; k += 2) { for (const z of [LZ - 4, LZ + 4]) cage.box(LX + k, cy0 + 1, z, LX + k, cy0 + 5, z, B.iron); cage.box(LX + 4, cy0 + 1, LZ + k, LX + 4, cy0 + 5, LZ + k, B.iron); }
      for (let k = -4; k <= 4; k++) { for (const z of [LZ - 4, LZ + 4]) cage.set(LX + k, cy0 + 5, z, B.bronze); cage.set(LX + 4, cy0 + 5, LZ + k, B.bronze); }
      cage.walls(LX - 4, cageTop, LZ - 4, LX + 4, cageTop, LZ + 4, B.iron); cage.box(LX - 1, cageTop, LZ - 1, LX + 1, cageTop, LZ + 1, B.bronze);
      for (const s of [-1, 1]) { S(SX0 - 3, G + 16, LZ + s * 6, B.iron); S(SX0 - 3, G + 15, LZ + s * 6, B.fireY); S(SX0 - 3, G + 14, LZ + s * 6, B.ironDk); }
      lights.push({ name: 'lift', p: [SX0 - 3, G + 15, LZ + 0.5], c: '#ffb050', i: 0.8, d: 30, flicker: 0.2, srcR: 8 });
      landmarks.push({ name: '승강기 수직갱', note: '더 깊은 갱도로 내려가는 쇠우리', p: [LX, G + 58, LZ] });

      // ───────── 지하 물웅덩이: 종유석 기둥, 물가 빛 수정, 두레박(부품) ─────────
      const stal = (x, z, h, r) => {
        const gg = MH.g(w, x, z);
        for (let k = 0; k < h; k++) { const rr = r * Math.pow(1 - k / h, 0.8) + 0.3; w.cyl(x, z, gg + 1 + k, gg + 1 + k, rr, k < h * 0.3 ? B.dripDk : B.drip); }
      };
      const KEEPOUT = [[28, 0, 54, 84], [54, 44, 122, 68], [116, 64, 146, 94], [76, 94, 124, 140], [50, 106, 64, 130], [78, 16, 98, 42], [122, 22, 142, 42]];
      const kept = (x, z) => KEEPOUT.some(([a, b, c, d]) => x >= a - 3 && x <= c + 3 && z >= b - 3 && z <= d + 3);
      for (let i = 0, made = 0; i < 900 && made < 26; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), gg = MH.g(w, x, z);
        if (gg < G - 1 || gg > G + 2 || kept(x, z) || w.get(x, gg + 1, z)) continue;
        let near = 0; for (const [dx, dz] of [[4, 0], [-4, 0], [0, 4], [0, -4]]) if (MH.g(w, x + dx, z + dz) > G + 6) near++;
        if (!near) continue;
        stal(x, z, w.ri(5, 14), w.r(1.2, 2.4)); made++;
      }
      for (const [x, z] of [[24, 106], [22, 124], [30, 138]]) { const gg = MH.g(w, x, z); crystal(w, x, gg + 1, z, w.ri(4, 6), 1, 0.15, 0, B.crysB); }
      lights.push({ name: 'pool', p: [26, G + 4, 120], c: '#7ae8ff', i: 0.6, d: 34, flicker: 0.05, srcR: 6 });
      const WX = 56, WZ = 118, wy = G + 12;
      for (const z of [WZ - 6, WZ + 6]) {
        const gg = MH.g(w, WX, z);
        w.box(WX, gg + 1, z, WX, wy - 1, z, B.timber); w.box(WX + 1, gg + 1, z, WX + 1, wy - 1, z, B.timber);
        w.line(WX + 1, gg + 1, z, WX + 7, Math.max(G, MH.g(w, WX + 7, z)) + 1, z, B.timberDk);
        w.box(WX, wy, z, WX + 1, wy, z, B.timberDk);
      }
      const wl = w.prop({ name: 'windlass', pivot: [WX + 0.5, wy + 1.5, WZ + 0.5], axis: 'z' });
      for (let z = WZ - 5; z <= WZ + 5; z++) { wl.box(WX, wy + 1, z, WX + 1, wy + 2, z, z % 3 ? B.timber : B.iron); }
      wl.box(WX, wy + 1, WZ + 6, WX + 1, wy + 2, WZ + 6, B.iron); wl.box(WX + 2, wy + 3, WZ + 7, WX + 2, wy + 5, WZ + 7, B.iron); wl.set(WX + 3, wy + 5, WZ + 7, B.timber);
      const bropeLen = 3, bTop = wy;
      MH.rope(w, 'brope', WX - 1, bTop, WZ, bropeLen, B.rope);
      const bucket = w.prop({ name: 'bucket', pivot: [WX - 0.5, wy - 3, WZ + 0.5] });
      for (let y = wy - 8; y <= wy - 4; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const edge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
        if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
        if (!edge && y > wy - 8) continue;
        bucket.set(WX - 1 + dx, y, WZ + dz, (y === wy - 7 || y === wy - 4) ? B.iron : B.plank);
      }
      bucket.box(WX - 3, wy - 3, WZ, WX + 1, wy - 3, WZ, B.iron);
      landmarks.push({ name: '지하 물웅덩이', note: '바닥까지 비치는 맑은 물', p: [40, G + 24, 118] });

      // ───────── 광석 선별대와 슈트: 흔들리는 쇠 체(부품), 아래 광석 통, 깔때기, 비탈 슈트, 용광로로 떨어지는 구멍 ─────────
      const TX0 = 82, TX1 = 98, TZ0 = 102, TZ1 = 110;
      for (const [x, z] of [[TX0, TZ0], [TX1 - 1, TZ0], [TX0, TZ1 - 1], [TX1 - 1, TZ1 - 1]]) w.box(x, G + 1, z, x + 1, G + 7, z + 1, B.timber);
      w.walls(TX0, G + 7, TZ0, TX1, G + 7, TZ1, B.timber);
      const sieve = w.prop({ name: 'sieve', pivot: [(TX0 + TX1) / 2 + 0.5, G + 8, (TZ0 + TZ1) / 2 + 0.5] });
      for (let z = TZ0 + 1; z <= TZ1 - 1; z++) for (let x = TX0 + 1; x <= TX1 - 1; x++) sieve.set(x, G + 8, z, (x % 2) ? B.iron : B.ironDk);
      sieve.walls(TX0 + 1, G + 9, TZ0 + 1, TX1 - 1, G + 9, TZ1 - 1, B.bronze);
      for (let z = TZ0 + 2; z <= TZ1 - 2; z++) for (let x = TX0 + 2; x <= TX1 - 2; x++) { const hq = hash3(x >> 1, 11, z >> 1); if (hq > 0.45) sieve.set(x, G + 9, z, hq > 0.8 ? B.oreB : hq > 0.6 ? B.ore : B.gravel); }
      for (const [x0, b] of [[TX0 + 2, B.ore], [TX0 + 10, B.oreB]]) {
        w.walls(x0, G + 1, TZ0 + 2, x0 + 5, G + 3, TZ1 - 2, B.plank);
        w.box(x0 + 1, G + 1, TZ0 + 3, x0 + 4, G + 2, TZ1 - 3, B.gravel);
        for (let z = TZ0 + 3; z <= TZ1 - 3; z++) for (let x = x0 + 1; x <= x0 + 4; x++) if (hash3(x, 12, z) > 0.4) S(x, G + 3, z, b);
      }
      lights.push({ name: 'sort', p: [TX1 + 3.5, G + 12, TZ0 - 2], c: '#ffb050', i: 0.7, d: 28, flicker: 0.2, srcR: 4 });
      w.box(TX1 + 3, G + 1, TZ0 - 3, TX1 + 3, G + 13, TZ0 - 3, B.timber); w.box(TX1 + 3, G + 14, TZ0 - 3, TX1 + 4, G + 14, TZ0 - 3, B.iron);
      S(TX1 + 4, G + 13, TZ0 - 2, B.iron); S(TX1 + 4, G + 12, TZ0 - 2, B.fireY); S(TX1 + 4, G + 11, TZ0 - 2, B.ironDk);
      // 슈트: 깔때기(판자 상자) → 남쪽으로 내려가는 쇠 홈통 → 바닥 구멍(아래 용광로 불빛)
      const UX = 120, HZ = 100, HY = G + 16, EZ = 124, EY = G + 3, HX = 122, HZc = 131;
      w.walls(UX - 4, HY, HZ - 4, UX + 4, HY + 2, HZ + 2, B.plank); w.walls(UX - 4, HY + 3, HZ - 4, UX + 4, HY + 3, HZ + 2, B.timberDk); w.box(UX - 2, HY - 1, HZ - 2, UX + 2, HY - 1, HZ + 2, B.plank);
      w.box(UX - 2, HY, HZ + 2, UX + 2, HY + 1, HZ + 2, 0);
      for (const [x, z] of [[UX - 4, HZ - 4], [UX + 4, HZ - 4], [UX - 4, HZ + 2], [UX + 4, HZ + 2]]) w.box(x, G + 1, z, x, HY - 1, z, B.timber);
      for (let z = HZ + 3; z <= EZ; z++) {
        const y = Math.round(HY - 1 - (z - HZ - 3) * (HY - 1 - EY) / (EZ - HZ - 3));
        w.box(UX - 2, y, z, UX + 2, y, z, B.iron); w.box(UX - 2, y - 1, z, UX + 2, y - 1, z, B.ironDk);
        for (const x of [UX - 3, UX + 3]) { S(x, y, z, B.iron); S(x, y + 1, z, B.iron); }
        if ((z - HZ) % 6 === 0) for (const x of [UX - 3, UX + 3]) w.box(x, MH.g(w, x, z) + 1, z, x, y - 1, z, B.timber);
      }
      for (let z = -6; z <= 6; z++) for (let x = -6; x <= 6; x++) {
        const d = Math.hypot(x, z); if (d > 6.4) continue;
        if (d <= 4.6) MH.setH(w, HX + x, HZc + z, 6, B.molten, B.basalt);
        else MH.setH(w, HX + x, HZc + z, G, (Math.round(Math.atan2(z, x) * 4) & 1) ? B.iron : B.ironDk, B.basalt);
      }
      for (let z = -5; z <= 5; z++) for (let x = -5; x <= 5; x++) { const d = Math.hypot(x, z); if (d > 4.6 && d <= 5.6) for (let y = 7; y < G; y++) S(HX + x, y, HZc + z, y < 12 ? B.ember : (y % 4 ? B.basalt : B.graniteDk)); }
      for (let z = -4; z <= 4; z++) for (let x = -4; x <= 4; x++) if (Math.hypot(x, z) <= 4.6 && hash3(x, 13, z) > 0.55) S(HX + x, 7, HZc + z, B.ember);
      lights.push({ name: 'chute', p: [HX + 0.5, 12, HZc + 0.5], c: '#ff7a2a', i: 1.2, d: 40, flicker: 0.3, srcR: 6 });
      const orec = w.prop({ name: 'orechunk', pivot: [UX + 0.5, HY + 1, HZ - 1 + 0.5] });
      for (const [dx, dz, b] of [[-2, -2, B.ore], [1, -1, B.oreB], [-1, 1, B.ore]]) orec.box(UX + dx, HY, HZ - 1 + dz, UX + dx + 1, HY + 1, HZ + dz, b);

      // ───── 상호작용 ─────
      const outRoute = [-6, -12, -18, -24, -32, -40, -50].map(dz => [0, 0, dz]);
      acts.push({
        name: '광차 타고 밖으로', hint: '광차에 올라타 레일을 따라 어두운 갱도를 거슬러 무쇠골 광산 입구로 나가요', ride: 'cart', goto: 'ironhollow',
        hit: [RX - 5, G + 2, CZ - 7, RX + 5, G + 12, CZ + 7],
        run: async a => {
          a.flash('portal', 2.5, 2.5);
          a.burst([RX + 0.5, G + 12, CZ + 0.5], { n: 24, colors: ['#e8c040', '#ffe090'], speed: 6, up: 6, life: 1.1, gravity: 14, spread: 3 });
          await a.drive('cart', outRoute, 6, { fwd: '-z' });
        },
      });
      acts.push({
        name: '곡괭이질', hint: '곡괭이가 빛나는 광석 바위를 깡! 깡! 내리찍을 때마다 금빛 광석 조각이 튀어요', hit: [OX - 6, G + 1, OZ - 4, OX + 6, G + 15, PZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('pickaxe', [0.35, 0, 0], 0.4);
            await a.turn('pickaxe', [-1.35, 0, 0], 0.22, t => t * t);
            a.flash('vein', 4, 0.3);
            a.burst([OX + 0.5, G + 5, OZ + 2], { n: 30, colors: ['#ffc848', '#e8c040', '#ffffff', '#5ad8ff'], speed: 10, up: 8, life: 0.8, gravity: 18, spread: 1.2 });
            await a.wait(0.2);
          }
          await a.turn('pickaxe', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '수정 울림', hint: '큰 수정 무리가 떠올라 천천히 돌며 푸른빛을 뿜고, 동굴 가득 빛 가루가 흩날려요', hit: [CX - 6, G + 1, CZc - 6, CX + 6, G + 22, CZc + 6],
        run: async a => {
          a.flash('crystal', 4, 5); a.glow(1.8, 5);
          await a.tween('crystal', { off: [0, 3, 0], scl: [1.08, 1.08, 1.08] }, 1.2);
          for (let k = 0; k < 6; k++) { a.burst([CX + 0.5, G + 14, CZc + 0.5], { n: 26, colors: ['#7ae8ff', '#c890ff', '#ffffff'], speed: 4, up: 3, life: 1.6, gravity: -0.8, spread: 4 }); await a.wait(0.4); }
          await a.tween('crystal', { off: [0, 0, 0], scl: [1, 1, 1] }, 1.2);
        },
      });
      acts.push({
        name: '승강기 수직갱', hint: '쇠우리 승강기가 도르래 소리와 함께 깊은 수직갱 아래로 내려갔다 올라와요', hit: [SX0, G + 1, SZ0, SX1, G + 13, SZ1],
        run: async a => {
          const dn = 16;
          await Promise.all([a.move('minelift', [0, -dn, 0], 4, t => t), a.rope('srope', ropeLen, ropeLen + dn, 4, t => t), a.turn('sheave', [-8, 0, 0], 4, t => t)]);
          await a.wait(1.2);
          await Promise.all([a.move('minelift', [0, 0, 0], 4, t => t), a.rope('srope', ropeLen, ropeLen, 4, t => t), a.turn('sheave', [0, 0, 0], 4, t => t)]);
        },
      });
      acts.push({
        name: '두레박 물 긷기', hint: '물레가 돌며 두레박이 맑은 물웅덩이에 풍덩 잠겼다가 물을 떠 올려요', hit: [WX - 4, G - 2, WZ - 7, WX + 3, wy + 6, WZ + 7],
        run: async a => {
          const dn = 8;
          await Promise.all([a.move('bucket', [0, -dn, 0], 1.6), a.rope('brope', bropeLen, bropeLen + dn, 1.6), a.turn('windlass', [0, 0, 6], 1.6)]);
          for (let k = 0; k < 3; k++) { a.burst([WX - 0.5, G, WZ + 0.5], { n: 22, colors: ['#c8f0f8', '#7ac8d8', '#ffffff'], speed: 4, up: 6, life: 0.8, gravity: 16, spread: 2.4 }); await a.wait(0.3); }
          await Promise.all([a.move('bucket', [0, 0, 0], 2), a.rope('brope', bropeLen, bropeLen, 2), a.turn('windlass', [0, 0, 0], 2)]);
          a.burst([WX - 0.5, wy - 8, WZ + 0.5], { n: 14, colors: ['#c8f0f8', '#7ac8d8'], speed: 1, up: 0, life: 0.8, gravity: 14, spread: 1.2 });
        },
      });
      acts.push({
        name: '광석 선별대', hint: '쇠 체가 덜컹덜컹 흔들리며 금빛 광석과 푸른 광석이 아래 통으로 갈려 떨어져요', hit: [TX0, G + 1, TZ0, TX1, G + 11, TZ1],
        run: async a => {
          a.flash('sort', 2, 3);
          for (let k = 0; k < 6; k++) {
            await a.move('sieve', [k % 2 ? -1.5 : 1.5, 0.8, 0], 0.18);
            a.burst([TX0 + 5, G + 7, (TZ0 + TZ1) / 2 + 0.5], { n: 10, colors: ['#e8c040', '#ffe090'], speed: 1.4, up: 0.5, life: 0.6, gravity: 20, spread: 1.6 });
            a.burst([TX0 + 13, G + 7, (TZ0 + TZ1) / 2 + 0.5], { n: 10, colors: ['#5ab0e0', '#a8e0f0'], speed: 1.4, up: 0.5, life: 0.6, gravity: 20, spread: 1.6 });
          }
          await a.move('sieve', [0, 0, 0], 0.2);
        },
      });
      acts.push({
        name: '광석 슈트', hint: '골라낸 광석이 깔때기에서 쇠 홈통을 타고 굴러 내려가 용광로로 이어진 불빛 구멍 속으로 떨어져요', hit: [UX - 5, G + 1, HZ - 5, UX + 5, HY + 6, EZ],
        run: async a => {
          await a.path('orechunk', [[0, 0, 4], [0, (EY - HY) / 2, (EZ - HZ) / 2 + 2], [0, EY - HY + 1, EZ - HZ + 1], [HX - UX, G - 3 - HY, HZc - HZ - 1]], 2.4);
          a.burst([HX + 0.5, G - 2, HZc + 0.5], { n: 20, colors: ['#e8c040', '#5ab0e0'], speed: 3, up: 3, life: 0.6, gravity: 18, spread: 1.4 });
          a.flash('chute', 4, 2);
          for (let k = 0; k < 4; k++) { a.burst([HX + 0.5, G + 1, HZc + 0.5], { n: 26, colors: ['#ff7a2a', '#ffb04a', '#ffe08a'], speed: 5, up: 14, life: 1.2, gravity: 12, spread: 3 }); await a.wait(0.35); }
          await a.respawn('orechunk', 0.8);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
