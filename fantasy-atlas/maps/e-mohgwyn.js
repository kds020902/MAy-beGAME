// 모그윈 왕조 · 고치의 방 — 왕조 영묘 꼭대기, 묘비 늘어선 넓은 단과 계단 위 거대한 골반뼈에 안긴 미켈라의 고치 (메인 보스: 피의 군주 모그)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  const CX = 96, CZ = 38;                                   // 고치 자리(북쪽 계단 위)
  MAPS.push({
    id: 'mohgwyn', cat: 'lands', name: '모그윈 왕조', en: 'Mohgwyn Palace · Cocoon of the Empyrean', color: '#d0303a', seed: 727, base: 30, time: 'night', size: [W, D, Hh],
    desc: '왕조 영묘 중턱에서 승강기를 타고 오르면 피에 젖은 넓은 단이 나오고, 양옆으로 묘비가 늘어서 있다. 계단 위 거대한 골반뼈 속에 미켈라의 고치가 잠들어 있고, 피의 군주 모그가 그 앞을 지킨다.',
    monsters: { normal: ['피의 귀족', '백금 인간', '출혈 망자개'], mid: '혈병의 큰 갈가마귀', boss: '피의 군주 모그' },
    sky: ['#3a1638', '#07040e', '#a8203a'], stars: true,
    hemi: ['#d8a0b0', '#2a0c14', 0.56], sun: ['#ffb0b8', 0.5, [0.45, 1, 0.6]],
    day: { sky: ['#7a2a40', '#2a0c26', '#ff6a6a'], stars: true, hemi: ['#ffc8d0', '#3a141c', 0.64], sun: ['#ffd0d0', 0.62, [0.45, 1, 0.6]], haze: '#5a1a28' },
    liquid: ['#4a0610', '#9a0e1e', '#ff5a6a'], liqSpeed: 0.35,
    fog: { start: 0.78, floor: 5, depth: 8, haze: [30, 0.25, 10], hazeColor: '#4a0e1c' },
    camY: 26, zoom: 1.2,
    particles: [
      { n: 520, colors: ['#ff4a5a', '#c8202e', '#ff9aa4'], mode: 'drift', speed: 0.3, y0: 14, y1: 110, glow: true },
      { n: 140, colors: ['#ffe0e8', '#ffb0c0'], mode: 'wisp', speed: 0.3, size: 2, area: [CX, CZ + 24, 40], y0: 62 },
    ],
    blocks: {
      rock: { c: '#3e2e34', v: 0.07, pat: 'big' }, rockDk: { c: '#2a1e24', v: 0.06, pat: 'stone' }, rockR: { c: '#5e3034', v: 0.07, pat: 'stone' }, mud: { c: '#3a2224', top: '#4a1c20', v: 0.1 },
      stone: { c: '#8a7c7a', v: 0.05, pat: 'brick' }, stoneDk: { c: '#62565a', v: 0.05, pat: 'brick' }, stoneR: { c: '#7a5452', v: 0.05, pat: 'brick' }, trim: { c: '#b4a69c', v: 0.03 },
      pave: { c: '#5a4a4c', top: '#6e5a58', v: 0.06, pat: 'stone' }, pave2: { c: '#4e3e40', top: '#5e4c4c', v: 0.06 }, paveL: { c: '#7a6a64', top: '#8e7c74', v: 0.05, pat: 'check', alt: '#84726c' },
      grave: { c: '#b4aaa2', v: 0.05 }, graveDk: { c: '#8a8078', v: 0.05 }, col: { c: '#9a8e88', v: 0.04 }, colDk: { c: '#746a66', v: 0.04 },
      blood: { c: '#8a0c18', v: 0.05 }, bloodfall: { c: '#d8202e', glow: true }, crack: { c: '#ff3a3a', glow: true }, bloodDk: { c: '#5a0810', v: 0.05 },
      boneR: { c: '#c49484', v: 0.06, pat: 'big' }, boneRd: { c: '#9a6a5e', v: 0.06 },
      cocoon: { c: '#e6d6ce', v: 0.06, pat: 'big' }, cocoonDk: { c: '#c4aea6', v: 0.06 }, cocoonR: { c: '#a8484e', v: 0.05 }, vein: { c: '#b8485a', v: 0.04 }, heart: { c: '#ff4060', glow: true },
      arm: { c: '#efe6dc', v: 0.03 }, goldL: { c: '#ffe08a', glow: true },
      veil: { c: '#a89c96', v: 0.04 }, veilDk: { c: '#7e7470', v: 0.04 },
      fire: { c: '#ff4a3a', glow: true }, fire2: { c: '#ff8a5a', glow: true }, candle: { c: '#ffd8a8', glow: true }, wax: { c: '#e8dcc8', v: 0.03 },
      iron: { c: '#2e282c', v: 0.03 }, wood: { c: '#4a3430', v: 0.06, pat: 'plank' }, win: { c: '#ff6a5a', night: true, day: '#3a2a30' }, voidB: { c: '#140a0e', v: 0.02 },
      fogG: { c: '#fff0d0', glow: true }, grace: { c: '#ffe9a0', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const LK = base - 22, L0 = LK + 8, ML = base + 4, AF = base + 22, TF = AF + 8;   // 호수 · 기단 · 중턱 · 결투장 · 고치 단
      // 왕조 영묘의 층층 단: [x0, z0, x1, z1]
      const T0 = [36, 6, 156, 186], T1 = [44, 10, 148, 180], T2 = [52, 12, 140, 150], T3 = [58, 12, 134, 58];
      const inR = (r, x, z) => x >= r[0] && x <= r[2] && z >= r[1] && z <= r[3];
      MH.terrain(w, {
        floor: LK - 6,
        height: (x, z) => {
          if (inR(T3, x, z)) return TF;
          if (inR(T2, x, z)) return AF;
          if (inR(T1, x, z)) return ML;
          if (inR(T0, x, z)) return L0;
          // 피의 호수 바닥과 바위섬
          let h = LK - 3 + n.fbm(x * 0.05, z * 0.05) * 2;
          for (const [ix, iz, ir, ih] of [[18, 44, 8, 24], [172, 70, 7, 32], [22, 150, 6, 16], [170, 150, 9, 26], [100, 191, 7, 10], [16, 100, 5, 12]]) {
            const d = Math.hypot(x - ix, z - iz) + n.fbm(x * 0.2, z * 0.2, 2) * 3;
            if (d < ir) h = Math.max(h, LK + ih * Math.pow(1 - d / ir, 0.7));
          }
          return h;
        },
        surface: (x, z, y, s) => inR(T0, x, z) ? (y >= AF ? (((x >> 3) + (z >> 3)) & 1 ? B.pave : B.pave2) : B.pave2) : (s >= 3 ? B.rockR : B.mud),
        under: (x, z, y, dep) => {
          if (!inR(T0, x, z)) return dep < 2 ? B.rock : B.rockDk;
          if (y % 6 === 0) return B.trim;
          if (hash3(x >> 1, y >> 1, z >> 1) > 0.86) return B.stoneR;
          return y % 12 < 6 ? B.stone : B.stoneDk;
        },
      });
      MH.water(w, LK, (x, z) => !inR(T0, x, z));
      const lights = [], acts = [], landmarks = [];

      // ── 영묘 겉벽: 층마다 아치 회랑, 붉은 창, 벽기둥, 난간 ──
      const faceArches = (r, y0, h, gap, a, fill) => {
        for (let z = r[1] + gap; z <= r[3] - gap; z += gap) {
          LB.arch(w, { axis: 'z', c: r[2], u0: z, y0, a, h, kind: 'round', fill, frame: B.trim, depth: 2, dir: -1 });
          LB.arch(w, { axis: 'z', c: r[0], u0: z, y0, a, h, kind: 'round', fill, frame: B.trim, depth: 2, dir: 1 });
        }
        for (let x = r[0] + gap; x <= r[2] - gap; x += gap) {
          LB.arch(w, { axis: 'x', c: r[3], u0: x, y0, a, h, kind: 'round', fill, frame: B.trim, depth: 2, dir: -1 });
          LB.arch(w, { axis: 'x', c: r[1], u0: x, y0, a, h, kind: 'round', fill, frame: B.trim, depth: 2, dir: 1 });
        }
      };
      faceArches(T1, L0 + 2, 11, 8, 2, B.voidB);
      faceArches(T2, ML + 3, 10, 11, 1.2, B.win);
      // 벽기둥(결투장 단의 동·서·남쪽 겉벽)
      for (let z = T2[1] + 5; z <= T2[3] - 4; z += 11) for (const [x, dx] of [[T2[2] + 1, 1], [T2[0] - 1, -1]]) { w.box(x, ML + 1, z - 1, x + dx, AF - 1, z + 1, B.stoneDk); w.box(x, AF, z - 1, x + dx, AF, z + 1, B.trim); }
      for (let x = T2[0] + 5; x <= T2[2] - 4; x += 11) { if (Math.abs(x - 96) < 8) continue; w.box(x - 1, ML + 1, T2[3] + 1, x + 1, AF - 1, T2[3] + 1, B.stoneDk); w.box(x - 1, AF, T2[3] + 1, x + 1, AF, T2[3] + 1, B.trim); }
      // 난간: 중턱 단 둘레와 결투장 단 둘레(남쪽 가운데 승강기 자리는 비운다)
      const parapet = (r, y, skip) => {
        for (let x = r[0]; x <= r[2]; x++) for (const z of [r[1], r[3]]) if (!skip(x, z) && MH.g(w, x, z) === y) { w.set(x, y + 1, z, (x & 3) ? B.stone : B.stoneDk); if (!(x & 3)) w.set(x, y + 2, z, B.trim); }
        for (let z = r[1]; z <= r[3]; z++) for (const x of [r[0], r[2]]) if (!skip(x, z) && MH.g(w, x, z) === y) { w.set(x, y + 1, z, (z & 3) ? B.stone : B.stoneDk); if (!(z & 3)) w.set(x, y + 2, z, B.trim); }
      };
      parapet(T1, ML, () => false);
      parapet(T2, AF, (x, z) => z === T2[3] && Math.abs(x - 96) <= 5);

      // ── 결투장 바닥: 가운데 길, 의식의 원, 핏물 고랑과 웅덩이, 붉게 빛나는 금 ──
      const A0 = 71, A1 = T2[3];                                 // 결투장 남북 범위(계단 앞 ~ 남쪽 끝)
      const RX = 96, RZ = 108;                                   // 의식의 원 중심
      for (let z = A0; z <= A1; z++) for (let x = T2[0] + 1; x <= T2[2] - 1; x++) {
        let b = ((x >> 3) + (z >> 3)) & 1 ? B.pave : B.pave2;
        if ((x - 4) % 12 === 0 || (z - 2) % 12 === 0) b = B.stoneDk;
        if (Math.abs(x - 96) <= 7) b = B.paveL;
        const d = Math.hypot(x - RX, z - RZ);
        if (Math.abs(d - 16) < 0.6 || Math.abs(d - 10) < 0.5) b = B.trim;
        if (d < 10 && Math.abs(Math.sin(Math.atan2(z - RZ, x - RX) * 4)) < 0.06 * (10 / Math.max(d, 1))) b = B.trim;
        w.set(x, AF, z, b);
      }
      // 핏물: 가운데 길 양옆 고랑, 의식의 원 둘레 고랑, 웅덩이들
      const bloodAt = (x, z) => { if (MH.g(w, x, z) !== AF) return; MH.setH(w, x, z, AF - 1, B.blood, B.stoneDk); w.liquid(x, z, AF); };
      for (let z = A0 + 1; z <= A1 - 3; z++) for (const x of [88, 104]) bloodAt(x, z);
      for (let k = 0; k < 220; k++) { const a = k / 220 * Math.PI * 2; bloodAt(Math.round(RX + Math.cos(a) * 13), Math.round(RZ + Math.sin(a) * 13)); }
      const pools = [[RX, RZ, 4.6], [82, 130, 3.4], [110, 134, 3.6], [80, 88, 2.8], [112, 86, 3], [96, 142, 2.6]];
      for (const [px, pz, pr] of pools) for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) if (Math.hypot(dx, dz) + n.fbm((px + dx) * 0.3, (pz + dz) * 0.3, 2) * 1.2 <= pr) bloodAt(px + dx, pz + dz);
      // 붉게 빛나는 금
      for (let k = 0; k < 16; k++) {
        let x = w.ri(58, 134), z = w.ri(A0 + 4, A1 - 4), dir = w.r(0, Math.PI * 2);
        for (let s = 0; s < 24; s++) { if (x < 54 || x > 138 || z < A0 + 1 || z > A1 - 1) break; if (MH.g(w, x, z) === AF) w.set(x, AF, z, B.crack); dir += w.r(-0.6, 0.6); x += Math.round(Math.cos(dir)); z += Math.round(Math.sin(dir)); }
      }
      lights.push({ name: 'nihil', p: [RX + 0.5, AF + 10, RZ + 0.5], c: '#ff3040', i: 0.12, d: 80, flicker: 0.2, srcR: 40 });

      // ── 양옆 묘비 줄(장애물), 촛불 ──
      const graveCandles = [];
      for (const side of [-1, 1]) for (let row = 0; row < 2; row++) for (let k = 0; k < 8; k++) {
        const x = 96 + side * (22 + row * 9), z = 78 + k * 9 + row * 4;
        if (hash3(x, k, 3) < 0.12 || z > A1 - 4) continue;                       // 빠진 자리
        const h = 4 + (hash3(x, k, 5) * 3 | 0), lean = hash3(x, k, 7) > 0.8 ? side : 0;
        w.box(x - 1, AF + 1, z - 2, x + 1, AF + 1, z + 2, B.graveDk);              // 받침돌
        for (let y = 0; y < h; y++) w.box(x + (y > h - 3 ? lean : 0), AF + 2 + y, z - 1, x + (y > h - 3 ? lean : 0), AF + 2 + y, z + 1, y === h - 1 ? B.graveDk : B.grave);
        w.set(x + lean, AF + 2 + h, z, B.grave);                                     // 둥근 머리
        if (hash3(x, k, 9) > 0.55) { const cz = z + (k % 2 ? 2 : -2); w.set(x - side, AF + 2, cz, B.wax); w.set(x - side, AF + 3, cz, B.candle); graveCandles.push([x - side, AF + 3, cz]); }
      }
      lights.push({ name: 'candles', p: [70.5, AF + 4, 110.5], c: '#ffb070', i: 0.35, d: 26, flicker: 0.45, srcR: 30 });
      lights.push({ name: 'candles', p: [122.5, AF + 4, 110.5], c: '#ffb070', i: 0.35, d: 26, flicker: 0.45, srcR: 30 });
      acts.push({
        name: '묘비의 촛불', hint: '양옆 묘비 앞 촛불이 줄지어 차례로 타올라요', hit: [72, AF + 1, 104, 78, AF + 8, 112],
        run: async a => { a.flash('candles', 4, 5); for (const p of graveCandles.slice().sort((p, q) => p[2] - q[2])) { a.burst([p[0] + 0.5, p[1] + 1, p[2] + 0.5], { n: 10, colors: ['#ffd8a8', '#ffb070', '#ff6a3a'], speed: 0.8, up: 4, life: 1, gravity: -0.4, spread: 0.4 }); await a.wait(0.09); } },
      });

      // ── 거대한 홈 파인 돌기둥: 결투장 양쪽 가장자리, 몇은 부러졌다 ──
      const column = (x, z, h, broken, y0) => {
        w.cyl(x, z, y0 + 1, y0 + 2, 4.8, B.colDk); w.cyl(x, z, y0 + 3, y0 + 3, 4.2, B.trim);
        for (let y = y0 + 4; y < y0 + 4 + h; y++) for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) {
          const d = Math.hypot(dx, dz); if (d > 3.7) continue;
          const fl = Math.abs(Math.sin(Math.atan2(dz, dx) * 8));
          if (d > 2.9 && fl < 0.35) continue;                                      // 세로 홈
          w.set(x + dx, y, z + dz, (y - y0) % 9 === 0 ? B.colDk : B.col);
        }
        const top = y0 + 4 + h;
        if (broken) LB.crumble(w, x - 4, top - 6, z - 4, x + 4, top, z + 4, 0.45, 3, x + z);
        else { w.cyl(x, z, top, top + 1, 4.6, B.trim); w.box(x - 5, top + 2, z - 5, x + 5, top + 3, z + 5, B.colDk); }
        return top;
      };
      const cols = [[58, 80, 34, 0], [58, 102, 18, 1], [58, 124, 34, 0], [58, 144, 24, 1], [134, 80, 26, 1], [134, 102, 34, 0], [134, 124, 14, 1], [134, 144, 34, 0], [64, 19, 34, 0], [128, 19, 34, 0]];
      cols.forEach(([x, z, h, br]) => column(x, z, h, br, MH.g(w, x, z)));
      // 부러져 쓰러진 기둥 토막
      for (const [z0, z1] of [[111, 117], [120, 127]]) LB.tube(w, [[122.5, AF + 3.8, z0], [122.5, AF + 3.8, z1]], 2.8, (x, y, z, t, dy, d) => d > 0.82 && hash3(x, y, z) > 0.6 ? B.colDk : B.col);

      // ── 고치 단으로 오르는 넓은 계단, 단 앞벽의 촛불 벽감 ──
      const stairPosts = [];
      MH.flight(w, { name: '고치 계단', axis: 'z', c: 96, half: 22, a: A0 - 1, b: T3[3], ha: AF, hb: TF, step: B.paveL, edge: B.trim, fill: B.stone, rail: B.stoneDk, post: B.stone, postGap: 4, onPost: (x, y, z) => { w.set(x, y, z, B.candle); stairPosts.push([x, y, z]); } });
      for (let x = T3[0] + 3; x <= T3[2] - 3; x += 6) {
        if (Math.abs(x - 96) <= 24) continue;
        w.box(x - 1, AF + 2, T3[3], x + 1, AF + 5, T3[3], B.voidB); w.set(x, AF + 2, T3[3], B.wax); w.set(x, AF + 3, T3[3], B.candle);
      }

      // ── 고치 단: 거대한 골반뼈 요람과 미켈라의 고치 ──
      for (let z = T3[1] + 1; z <= T3[3] - 1; z++) for (let x = T3[0] + 1; x <= T3[2] - 1; x++) {
        const d = Math.hypot(x - CX, z - CZ);
        w.set(x, TF, z, Math.abs(d - 18) < 0.6 || Math.abs(d - 13) < 0.5 ? B.trim : (Math.abs(x - 96) <= 5 && z > CZ ? B.paveL : (((x >> 2) + (z >> 2)) & 1 ? B.pave : B.pave2)));
      }
      // 골반뼈: 양쪽 엉덩뼈 날개, 뒤쪽 엉치뼈, 골반 테, 앞쪽 두덩 아치
      for (const s of [-1, 1]) w.ellipsoid(CX + s * 13, TF + 12, CZ, 8, 13, 11, B.boneR, (dx, dy, dz, d) => d > 0.8 && dx * s > -3 && dy > -12 && !(dz > 2 && dy > 1));
      for (let y = 0; y < 20; y++) { const hw = Math.round(6 - y * 0.22), zz = CZ - 10 - Math.round(y * 0.3); w.box(CX - hw, TF + 1 + y, zz - 1, CX + hw, TF + 1 + y, zz, y % 4 === 3 ? B.boneRd : B.boneR); }
      for (let k = 0; k < 4; k++) for (const s of [-1, 1]) w.set(CX + s * 2, TF + 3 + k * 4, CZ - 11 - Math.round((2 + k * 4) * 0.3), B.voidB);
      for (let k = 0; k < 140; k++) { const a = k / 140 * Math.PI * 2; w.sphere(Math.round(CX + Math.cos(a) * 12.5), TF + 5, Math.round(CZ + Math.sin(a) * 10), 1.4, B.boneR); }
      LB.tube(w, [[CX - 10, TF + 1, CZ + 10], [CX - 5, TF + 5, CZ + 12], [CX, TF + 6, CZ + 12], [CX + 5, TF + 5, CZ + 12], [CX + 10, TF + 1, CZ + 10]], 1.5, B.boneR);
      for (const s of [-1, 1]) { LB.tube(w, [[CX + s * 7, TF + 1, CZ + 11], [CX + s * 11, TF + 3, CZ + 9], [CX + s * 12, TF + 1, CZ + 5]], 1.2, B.boneRd); w.ellipsoid(CX + s * 18, TF + 3, CZ + 1, 3, 2.6, 3, B.boneRd); }
      // 고치(부품): 창백한 알 모양, 핏자국과 핏줄, 심장처럼 빛나는 금, 늘어진 마른 팔 — 뼈와 겹치는 칸은 비운다
      const CY = TF + 13, coc = w.prop({ name: 'cocoon', pivot: [CX + 0.5, TF + 2, CZ + 0.5], clipOK: 60 });
      coc.ellipsoid(CX, CY, CZ, 9, 12.5, 9, B.cocoon, (dx, dy, dz, d) => {
        const x = CX + dx, y = CY + dy, z = CZ + dz;
        if (w.get(x, y, z)) return false;
        const vein = Math.abs(Math.sin(dx * 0.9 + dy * 0.35) + Math.cos(dz * 0.8 - dy * 0.3)) < 0.18;
        const stain = n.fbm(x * 0.25, y * 0.2 + z * 0.25, 2) > 0.62 || dy < -7;
        coc.set(x, y, z, d > 0.8 && hash3(x, y, z) > 0.985 ? B.heart : (vein ? B.vein : (stain ? B.cocoonR : (dy < -8 ? B.cocoonDk : B.cocoon))));
        return false;
      });
      coc.box(CX + 7, CY - 1, CZ + 4, CX + 8, CY + 1, CZ + 5, B.heart);
      const armPts = [[CX + 5, CY + 7, CZ + 6], [CX + 8.5, CY + 5, CZ + 9.5], [CX + 11, CY - 1, CZ + 11.5], [CX + 11.5, CY - 6, CZ + 12]];
      LB.tube(coc, armPts, t => 1.05 - t * 0.35, B.arm, { under: true });
      for (const [fx, fz] of [[-0.8, 0.4], [0, 0.8], [0.8, 0.3]]) { LB.tube(coc, [armPts[3], [CX + 11.5 + fx, CY - 8.5, CZ + 12 + fz]], 0.5, B.arm); coc.set(Math.round(CX + 11.5 + fx), CY - 9, Math.round(CZ + 12 + fz), B.goldL); }
      lights.push({ name: 'cocoon', p: [CX + 10, CY, CZ + 7.5], c: '#ff5070', i: 1.1, d: 28, flicker: 0.1, srcR: 6 });
      lights.push({ name: 'arm', p: [CX + 12, CY - 8, CZ + 13.5], c: '#ffe08a', i: 0.3, d: 12, flicker: 0.1, srcR: 4 });
      acts.push({
        name: '미켈라의 고치', hint: '골반뼈에 안긴 고치가 심장처럼 고동치며 붉은 빛을 뿜어요', hit: [CX - 8, TF + 2, CZ - 8, CX + 8, CY + 11, CZ + 8],
        run: async a => {
          a.flash('cocoon', 3.5, 5);
          for (let k = 0; k < 4; k++) {
            await a.tween('cocoon', { scl: [1.1, 1.08, 1.1] }, 0.18); a.glow(1.6, 0.3);
            a.burst([CX + 9, CY, CZ + 5.5], { n: 22, colors: ['#ff4060', '#c8202e', '#ff9aa4'], speed: 2, up: 2, life: 1.2, gravity: 4, spread: 1.5 });
            await a.tween('cocoon', { scl: [1, 1, 1] }, 0.42);
            await a.wait(0.35);
          }
        },
      });
      acts.push({
        name: '미켈라의 마른 팔', hint: '고치 밖으로 늘어진 마른 팔에서 금빛이 피어올라요', hit: [CX + 8, CY - 9, CZ + 8, CX + 13, CY + 7, CZ + 14],
        run: async a => {
          a.flash('arm', 8, 4); a.glow(1.4, 4);
          for (let k = 0; k < 10; k++) { const p = armPts[k % 4]; a.burst([p[0] + 0.5, p[1], p[2] + 0.5], { n: 14, colors: ['#ffe9a0', '#fff6d0', '#ffd060'], speed: 0.8, up: 3, life: 2.2, gravity: -0.5, spread: 1.2 }); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '미켈라의 고치', note: '보스 · 피의 군주 모그', p: [CX + 0.5, CY + 22, CZ + 0.5], boss: true });

      // ── 고치를 둘러싼 다리 없는 고대 왕조 석상 여덟(베일 쓴 모습) ──
      const statueCandles = [];
      for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
        const x = CX + s * 26, z = CZ - 14 + k * 9, f = -s;                      // f: 고치 쪽을 본다
        w.box(x - 2, TF + 1, z - 2, x + 2, TF + 2, z + 2, B.stoneDk); w.box(x - 2, TF + 3, z - 2, x + 2, TF + 3, z + 2, B.trim);
        for (let y = 0; y < 10; y++) w.cyl(x, z, TF + 4 + y, TF + 4 + y, 2.5 - y * 0.08, y % 3 ? B.veil : B.veilDk);
        w.box(x - 1, TF + 14, z - 3, x + 1, TF + 15, z + 3, B.veil);
        w.ellipsoid(x, TF + 17, z, 1.7, 2.1, 1.7, B.veil);
        w.set(x + f, TF + 17, z, B.voidB); w.set(x + f * 2, TF + 17, z, 0);
        for (let y = 0; y < 7; y++) w.box(x + f * 2, TF + 15 - y, z - (y < 4 ? 1 : 0), x + f * 2, TF + 15 - y, z + (y < 4 ? 1 : 0), B.veilDk);
        for (const dz of [-1, 1]) { w.set(x + f * 3, TF + 1, z + dz, B.wax); w.set(x + f * 3, TF + 2, z + dz, B.candle); }
        statueCandles.push([x + f * 3, TF + 2, z]);
      }
      lights.push({ name: 'statue', p: [CX - 23.5, TF + 4, CZ + 0.5], c: '#ffb070', i: 0.3, d: 22, flicker: 0.4, srcR: 16 });
      lights.push({ name: 'statue', p: [CX + 24.5, TF + 4, CZ + 0.5], c: '#ffb070', i: 0.3, d: 22, flicker: 0.4, srcR: 16 });
      acts.push({
        name: '고대 왕조의 석상', hint: '고치를 둘러싼 석상 여덟의 발치에서 촛불이 차례로 타올라요', hit: [CX + 23, TF + 1, CZ + 4, CX + 29, TF + 18, CZ + 10],
        run: async a => { a.flash('statue', 5, 4.4); for (let k = 0; k < 4; k++) for (const s of [0, 4]) { const p = statueCandles[s + k]; a.burst([p[0] + 0.5, p[1] + 1, p[2] + 0.5], { n: 22, colors: ['#ffd8a8', '#ffb070', '#ff4a3a'], speed: 1.2, up: 6, life: 1.4, gravity: -0.3, spread: 1 }); await a.wait(0.35); } },
      });
      // 뒤쪽 무너진 벽(안개 속 배경)
      for (let x = T2[0]; x <= T2[2]; x++) { const top = TF + 14 + Math.round(n.fbm(x * 0.15, 3.3, 2) * 14); w.box(x, MH.g(w, x, T2[1]) + 1, T2[1], x, top, T2[1] + 2, (x % 9 === 0) ? B.stoneDk : B.stone); }
      for (let x = T2[0] + 8; x <= T2[2] - 8; x += 12) LB.arch(w, { axis: 'x', c: T2[1] + 2, u0: x, y0: TF + 2, a: 3, h: 14, kind: 'round', fill: B.voidB, frame: B.trim, depth: 2, dir: -1 });

      // ── 3단계: 셋, 둘, 하나… 무(無) — 피가 고리처럼 퍼진다 / 피의 불꽃 / 피의 의식 ──
      acts.push({
        name: '셋, 둘, 하나… 무', hint: '의식의 원에서 핏빛 파동이 세 번 퍼져 나가요', hit: [RX - 5, AF - 1, RZ - 5, RX + 5, AF + 2, RZ + 5],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.flash('nihil', 14, 0.9); a.glow(1.8, 0.9);
            for (let r = 0; r < 4; r++) {
              const R = 6 + r * 9;
              for (let q = 0; q < 16; q++) { const t = q / 16 * Math.PI * 2; a.burst([RX + 0.5 + Math.cos(t) * R, AF + 1.5, RZ + 0.5 + Math.sin(t) * R], { n: 8, colors: ['#ff2a3a', '#a80e1e', '#ff8a9a'], speed: 3, up: 2, life: 0.9, gravity: 4, spread: 1.4, flat: true }); }
              await a.wait(0.14);
            }
            await a.wait(0.6);
          }
        },
      });
      const flames = [];
      for (let k = 0; k < 6; k++) {
        const t = k / 6 * Math.PI * 2 + 0.26, name = 'bflame' + k, pr = w.prop({ name, pivot: [RX + 0.5, AF + 1, RZ + 0.5], scl0: [0, 0, 0] });
        for (let s = 3; s <= 26; s++) {
          const x = Math.round(RX + Math.cos(t) * s + Math.sin(s * 0.5) * 1.2), z = Math.round(RZ + Math.sin(t) * s), g = MH.g(w, x, z);
          if ((g !== AF && g !== AF - 1) || w.get(x, AF + 1, z) || w.get(x, AF + 2, z)) continue;
          const h = 1 + (hash3(x, k, z) * 3 | 0);
          for (let y = 1; y <= h; y++) pr.set(x, AF + y, z, y === h ? B.fire2 : B.fire);
        }
        flames.push(name);
      }
      acts.push({
        name: '피의 불꽃', hint: '의식의 원에서 바닥을 따라 피의 불꽃이 여섯 갈래로 번져요', hit: [RX - 12, AF, RZ - 12, RX - 6, AF + 3, RZ - 6],
        run: async a => {
          a.flash('nihil', 10, 4.4); a.glow(1.6, 4.4);
          for (const f of flames) { a.tween(f, { scl: [1, 1, 1] }, 0.5); await a.wait(0.2); }
          for (let k = 0; k < 6; k++) { a.burst([RX + 0.5, AF + 2, RZ + 0.5], { n: 30, colors: ['#ff4a3a', '#ff8a5a', '#c8202e'], speed: 6, up: 3, life: 1.2, gravity: 1, spread: 3, flat: true }); await a.wait(0.3); }
          await a.wait(1.2);
          for (const f of flames) a.tween(f, { scl: [0, 0, 0] }, 0.8);
          await a.wait(0.9);
        },
      });
      acts.push({
        name: '피의 의식', hint: '웅덩이마다 피가 솟구치고 하늘에서 핏방울이 쏟아져요', hit: [pools[1][0] - 3, AF - 1, pools[1][1] - 3, pools[1][0] + 3, AF + 2, pools[1][1] + 3],
        run: async a => {
          a.flash('nihil', 8, 4); a.flash('cocoon', 3, 4);
          for (let r = 0; r < 4; r++) {
            for (const [px, pz] of pools) a.burst([px + 0.5, AF + 1, pz + 0.5], { n: 26, colors: ['#ff2a3a', '#a80e1e', '#ff8a9a'], speed: 1.5, up: 10, life: 1.4, gravity: 8, spread: 1.5 });
            for (let q = 0; q < 6; q++) a.burst([60 + q * 14 + r * 3, 110, 80 + ((q * 37 + r * 19) % 70)], { n: 16, colors: ['#c8202e', '#ff4a5a'], speed: 0.5, up: -2, life: 3, gravity: 12, spread: 6 });
            await a.wait(0.6);
          }
        },
      });

      // ── 핏물 고랑: 계단 아래에서 의식의 원까지 피가 흘러내린다 ──
      acts.push({
        name: '피의 공물', hint: '계단 아래 고랑을 따라 공물의 피가 의식의 원으로 흘러들어요', hit: [86, AF - 1, A0 + 2, 90, AF + 2, A0 + 8],
        run: async a => {
          a.flash('nihil', 5, 3.4);
          for (let z = A0 + 2; z <= RZ - 10; z += 2) { for (const x of [88, 104]) a.burst([x + 0.5, AF + 0.6, z + 0.5], { n: 8, colors: ['#ff2a3a', '#d8202e'], speed: 0.6, up: 0.8, life: 0.8, gravity: 2, spread: 0.4 }); await a.wait(0.08); }
          for (let q = 0; q < 24; q++) { const t = q / 24 * Math.PI * 2; a.burst([RX + 0.5 + Math.cos(t) * 13, AF + 0.6, RZ + 0.5 + Math.sin(t) * 13], { n: 6, colors: ['#ff2a3a', '#d8202e'], speed: 0.6, up: 1, life: 0.9, gravity: 2, spread: 0.4 }); await a.wait(0.04); }
        },
      });

      // ── 남쪽: 왕조 영묘 중턱의 축복, 승강기, 안개문 ──
      const LX0 = 93, LX1 = 99, LZ0 = 151, LZ1 = 156;
      for (let z = LZ0; z <= LZ1; z++) for (let x = LX0; x <= LX1; x++) MH.setH(w, x, z, ML - 1, B.stoneDk, B.stoneDk);
      for (const [x, z] of [[LX0 - 1, LZ1 + 1], [LX1 + 1, LZ1 + 1]]) { w.box(x, ML + 1, z, x, AF + 8, z, B.stoneDk); w.set(x, AF + 9, z, B.trim); }
      for (const x of [LX0 - 1, LX1 + 1]) w.box(x, AF + 6, LZ0, x, AF + 7, LZ1 + 1, B.iron);
      w.box(LX0 - 1, AF + 8, LZ0, LX1 + 1, AF + 8, LZ0 + 1, B.iron);
      w.box(96, AF + 9, LZ0 + 1, 96, AF + 11, LZ0 + 1, B.iron);
      const pulley = w.prop({ name: 'pulley', pivot: [96.5, AF + 12.5, LZ0 + 0.5], axis: 'z' });
      for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; pulley.set(Math.round(96 + Math.cos(a) * 2.2), Math.round(AF + 12 + Math.sin(a) * 2.2), LZ0, B.iron); }
      pulley.set(96, AF + 12, LZ0, B.wood);
      const lift = w.prop({ name: 'lift', pivot: [96.5, ML, (LZ0 + LZ1) / 2 + 0.5], clipOK: 10 });
      lift.box(LX0, ML, LZ0, LX1, ML, LZ1, B.wood); lift.walls(LX0, ML, LZ0, LX1, ML, LZ1, B.iron);
      lift.box(LX1, ML + 1, LZ1, LX1, ML + 3, LZ1, B.iron); lift.set(LX1, ML + 4, LZ1, B.candle);
      lights.push({ name: 'lift', p: [LX1 + 0.5, ML + 4, LZ1 + 0.5], c: '#ffb070', i: 0.4, d: 14, flicker: 0.3 });
      acts.push({
        name: '영묘 승강기', hint: '중턱에서 보스방 입구까지 승강판이 올라갔다 내려와요', hit: [LX0, ML, LZ0, LX1, ML + 4, LZ1],
        run: async a => {
          const up = a.move('lift', [0, AF - ML, 0], 3.4); a.turn('pulley', [0, 0, 6], 3.4); await up;
          a.burst([96.5, AF + 1, LZ0 + 1], { n: 20, colors: ['#ffd8a8', '#ffffff'], speed: 2, up: 1, life: 1, gravity: 2, spread: 3, flat: true });
          await a.wait(1.6);
          const dn = a.move('lift', [0, 0, 0], 3.4); a.turn('pulley', [0, 0, 0], 3.4); await dn;
        },
      });
      // 안개문: 결투장 남쪽 가장자리
      for (const x of [LX0 - 1, LX1 + 1]) { w.box(x, AF + 1, T2[3] - 1, x, AF + 9, T2[3], B.stone); w.set(x, AF + 10, T2[3], B.trim); }
      w.box(LX0 - 1, AF + 10, T2[3] - 1, LX1 + 1, AF + 11, T2[3], B.stone);
      for (let x = LX0; x <= LX1; x++) for (let y = AF + 1; y <= AF + 9; y++) if (hash3(x, y, 13) > 0.6) w.set(x, y, T2[3] - 1, B.fogG);
      lights.push({ name: 'fog', p: [96.5, AF + 5, T2[3] + 1.5], c: '#fff0d0', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '고치의 방 입구를 막은 안개가 일렁이며 흩날려요', hit: [LX0, AF + 1, T2[3] - 2, LX1, AF + 9, T2[3]],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([96.5, AF + 2 + k, T2[3] - 0.5], { n: 22, colors: ['#fff0d0', '#ffffff', '#ffb0b8'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 4, flat: true }); await a.wait(0.18); } },
      });
      // 중턱의 축복과 촛불, 피의 제단
      const gp = LB.grace(w, 82, ML, 165, B.grace);
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, x = Math.round(82 + Math.cos(a) * 4), z = Math.round(165 + Math.sin(a) * 4); w.set(x, ML + 1, z, B.wax); w.set(x, ML + 2, z, k % 3 ? B.candle : B.wax); }
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      acts.push(LB.graceAct({ at: gp, to: [CX + 0.5, CY + 12, CZ + 0.5], arc: 26, steps: 30, hint: '왕조 영묘 중턱의 축복이 계단 위 고치를 가리켜요' }));
      landmarks.push({ name: '왕조 영묘 중턱', note: '승강기 앞의 축복', p: [gp[0], gp[1] + 14, gp[2]] });
      w.box(106, ML + 1, 160, 112, ML + 2, 166, B.stoneDk); w.box(107, ML + 3, 161, 111, ML + 3, 165, B.blood); w.set(109, ML + 4, 163, B.crack);
      landmarks.push({ name: '고치의 방', note: '묘비가 늘어선 영묘 꼭대기', p: [RX + 0.5, AF + 30, RZ + 0.5] });

      // ── 영묘 겉벽을 흘러내리는 핏물 폭포와 피의 호수 ──
      const falls = [];
      for (const z of [86, 108]) {
        w.box(T2[2] + 1, AF - 2, z - 1, T2[2] + 3, AF - 1, z + 1, B.stoneDk);                    // 토출구
        for (let y = ML + 1; y <= AF - 3; y++) w.box(T2[2] + 2, y, z - 1, T2[2] + 2, y, z, hash3(y, z, 1) > 0.25 ? B.bloodfall : B.blood);
        for (let x = T2[2] + 2; x <= T1[2]; x++) { MH.setH(w, x, z, ML - 1, B.blood, B.stoneDk); MH.setH(w, x, z - 1, ML - 1, B.blood, B.stoneDk); w.liquid(x, z, ML); w.liquid(x, z - 1, ML); }
        for (let y = L0 + 1; y <= ML - 1; y++) w.box(T1[2] + 1, y, z - 1, T1[2] + 1, y, z, hash3(y, z, 2) > 0.25 ? B.bloodfall : B.blood);
        for (let x = T1[2] + 1; x <= T0[2]; x++) for (const zz of [z - 1, z]) { MH.setH(w, x, zz, L0 - 1, B.blood, B.stoneDk); w.liquid(x, zz, L0); }
        for (let y = LK; y <= L0; y++) w.box(T0[2] + 1, y, z - 1, T0[2] + 1, y, z, hash3(y, z, 3) > 0.25 ? B.bloodfall : B.blood);
        falls.push([T0[2] + 1.5, LK + 1, z]);
      }
      lights.push({ name: 'lake', p: [T0[2] + 6, LK + 6, 110], c: '#ff3a4a', i: 0.6, d: 50, flicker: 0.3, srcR: 30 });
      acts.push({
        name: '피의 호수', hint: '핏물 폭포가 거세지며 피의 호수에 핏빛 물보라가 일어요', hit: [T0[2] - 1, LK, 84, T0[2] + 3, LK + 8, 88],
        run: async a => {
          a.flash('lake', 4, 4); a.glow(1.5, 4);
          for (let k = 0; k < 12; k++) {
            for (const [x, y, z] of falls) a.burst([x + 1, y, z], { n: 20, colors: ['#ff2a3a', '#a80e1e', '#ff8a9a'], speed: 3, up: 5, life: 1.2, gravity: 8, spread: 2 });
            a.burst([T0[2] + 8 + (k * 7) % 20, LK + 1, 70 + (k * 23) % 80], { n: 14, colors: ['#ff4a5a', '#c8202e'], speed: 1, up: 4, life: 1, gravity: 8, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '피의 호수', note: '모그윈 궁을 둘러싼 피', p: [T0[2] + 12, LK + 14, 110] });

      // ── 중턱 단 동·서쪽: 작은 묘실들과 촛대 ──
      for (const x0 of [T1[0] + 1, T1[2] - 6]) for (let z = 30; z <= 140; z += 22) {
        w.box(x0, ML + 1, z, x0 + 5, ML + 6, z + 5, B.stone); w.box(x0, ML + 7, z, x0 + 5, ML + 7, z + 5, B.trim); MH.pyramid(w, x0, z, x0 + 5, z + 5, ML + 8, B.stoneDk, 1);
        const dx = x0 < 96 ? x0 + 5 : x0; LB.arch(w, { axis: 'z', c: dx, u0: z + 2.5, y0: ML + 1, a: 1, h: 4, kind: 'round', fill: B.voidB, frame: B.trim });
      }
      return { lights, landmarks, acts };
    },
  });
})();
