// 성수 버팀목 에브레펠 · 성수 뿌리 밑 — 축복에서 계단을 내려가면 펼쳐지는 뿌리 동굴, 가운데 얕은 물웅덩이 (메인 보스: 미켈라의 칼날 말레니아)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 160;
  const CX = 96, CZ = 88;                                   // 동굴방 한가운데(물웅덩이)
  MAPS.push({
    id: 'elphael', cat: 'lands', name: '성수 버팀목 에브레펠', en: 'Elphael · Haligtree Roots', color: '#e0a040', seed: 839, base: 30, time: 'day', size: [W, D, Hh],
    desc: '성수 뿌리의 축복에서 계단을 내려가면 거대한 뿌리가 성당처럼 엉킨 동굴이 나온다. 위에서 내리는 빛줄기 아래 얕은 물웅덩이에서 미켈라의 칼날이 오라비를 기다린다.',
    monsters: { normal: ['성수의 병사', '귀부기사', '부패의 권속'], mid: '부패한 화신', boss: '미켈라의 칼날 말레니아' },
    sky: ['#d8d0bc', '#5e6670', '#fff0c8'], stars: false,
    hemi: ['#f4ecdc', '#4a4438', 0.6], sun: ['#fff0d4', 0.66, [0.4, 1, 0.55]],
    night: { sky: ['#2a2a34', '#0a0c14', '#c8a050'], stars: true, hemi: ['#a8b0c8', '#1a1814', 0.46], sun: ['#e0d8c0', 0.36, [0.4, 1, 0.55]], haze: '#2a2a30' },
    liquid: ['#4a5a5e', '#8aa2a6', '#eef8f4'], liqSpeed: 0.15,
    fog: { start: 0.8, floor: 18, depth: 10, haze: [36, 0.3, 8], hazeColor: '#e8e0cc', top: 128, topDepth: 24 },
    camY: 20, zoom: 1.2,
    particles: [
      { n: 320, colors: ['#fff6d8', '#ffe8a0', '#ffffff'], mode: 'fall', speed: 0.22, wind: 0, area: [CX, CZ, 7], y0: 30, y1: 150, glow: true },
      { n: 520, colors: ['#e8c050', '#d8a030', '#f6dc80'], mode: 'fall', speed: 0.3, wind: 0.3, y0: 30, y1: 150, glow: false },
      { n: 240, colors: ['#ffffff', '#f2eee0'], mode: 'wisp', speed: 0.3, size: 2, area: [CX, CZ, 46], y0: 31 },
      { n: 90, colors: ['#ff5a3a', '#ff8a5a', '#d8402a'], mode: 'drift', speed: 0.25, area: [CX - 34, CZ + 12, 16], y0: 30, y1: 52, glow: true },
    ],
    blocks: {
      root: { c: '#d8d0c0', v: 0.07, pat: 'big' }, root2: { c: '#c2b8a4', v: 0.07, pat: 'big' }, rootDk: { c: '#958a78', v: 0.07, pat: 'stone' }, rootSh: { c: '#5e564c', v: 0.05 },
      mud: { c: '#5a5244', top: '#6e664e', v: 0.1 }, mudDk: { c: '#463e34', top: '#544a3c', v: 0.08 }, moss: { c: '#5a6040', top: '#7a8450', v: 0.1 }, leafG: { c: '#c8982e', top: '#e2b848', v: 0.12 },
      rock: { c: '#6e6862', v: 0.06, pat: 'big' }, rockDk: { c: '#4e4844', v: 0.06, pat: 'stone' },
      stone: { c: '#bca47e', v: 0.05, pat: 'brick' }, stoneDk: { c: '#8e7856', v: 0.05, pat: 'brick' }, trim: { c: '#dccca4', v: 0.03 }, pave: { c: '#a8946e', top: '#c0ac84', v: 0.06, pat: 'stone' }, gold: { c: '#d8b048', v: 0.05 },
      rot: { c: '#e0502a', glow: true }, rotDk: { c: '#6a2a1e', v: 0.06 }, rotMoss: { c: '#6a3426', top: '#94442e', v: 0.1 },
      petal: { c: '#d83434', v: 0.05 }, petalLt: { c: '#ff6a5a', v: 0.04 }, core: { c: '#ffd070', glow: true }, stem: { c: '#3e5a2c', v: 0.06 },
      sap: { c: '#ffd870', glow: true }, vine: { c: '#a89c84', v: 0.06 }, fogG: { c: '#fff4d8', glow: true }, grace: { c: '#ffe9a0', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const AF = base, R = 50, LD = AF + 12;                          // 바닥 · 동굴방 반지름 · 축복 턱
      const camA = Math.atan2(0.73, 0.68);                             // 기본 시점이 있는 쪽(남동)
      const backF = th => 0.5 - 0.5 * Math.cos(th - camA);            // 0 시점 쪽 ~ 1 맞은편
      const pier = (x, z) => Math.abs(x - 96) <= 10 && z >= CZ + R + 12;
      MH.terrain(w, {
        floor: AF - 26,
        height: (x, z) => {
          if (pier(x, z)) return LD;
          const r = Math.hypot(x - CX, z - CZ);
          if (r <= R + 1) return AF + Math.round(n.fbm(x * 0.07, z * 0.07, 2) * 1.4 + Math.max(0, r - R + 8) * 0.3);
          if (r <= R + 12) return AF + 3 + Math.round(n.fbm(x * 0.1, z * 0.1, 2) * 2);
          return AF - 22 + n.fbm(x * 0.05, z * 0.05, 2) * 4;            // 뿌리 밖은 어둠 속으로 꺼진다
        },
        surface: (x, z, y) => y <= AF - 10 ? B.rockDk : (y >= LD ? B.pave : (n.fbm(x * 0.09, z * 0.09, 2) > 0.6 ? B.moss : (hash3(x, 1, z) > 0.8 ? B.mudDk : B.mud))),
        under: (x, z, y, dep) => pier(x, z) ? ((y % 5 === 0) ? B.trim : B.stone) : (dep < 2 ? B.mudDk : (y % 4 === 0 ? B.rockDk : B.rock)),
      });
      const lights = [], acts = [], landmarks = [];

      // ── 가운데 얕은 물웅덩이(깊이 한 칸) ──
      for (let z = CZ - 26; z <= CZ + 26; z++) for (let x = CX - 26; x <= CX + 26; x++) {
        const d = Math.hypot(x - CX, z - CZ) + n.fbm(x * 0.12, z * 0.12, 2) * 4 - 2;
        if (d > 21) continue;
        MH.setH(w, x, z, AF - 1, d < 15 ? B.mudDk : B.mud, B.mudDk);
        w.liquid(x, z, AF);
      }

      // ── 뿌리 벽: 두 갈래로 꼬여 오르는 창백한 뿌리가 성당처럼 엉킨다. 시점 쪽은 낮고, 맞은편은 하늘 끝까지 ──
      const NA = 720, TAU = Math.PI * 2, topA = new Float32Array(NA), stA = new Float32Array(NA), bkA = new Float32Array(NA);
      for (let k = 0; k < NA; k++) { const th = k / NA * TAU - Math.PI; bkA[k] = backF(th); topA[k] = AF + 9 + 94 * Math.pow(bkA[k], 3) + n.fbm(th * 2.2 + 3, 1.7, 2) * 12 + (n.fbm(th * 11 + 7, 0.3, 2) - 0.5) * 22 * bkA[k]; }
      const ring = [];
      for (let z = CZ - R - 16; z <= CZ + R + 16; z++) for (let x = CX - R - 16; x <= CX + R + 16; x++) {
        if (x < 0 || z < 0 || x >= W || z >= D) continue;
        const r = Math.hypot(x - CX, z - CZ); if (r < R - 7 || r > R + 15) continue;
        if (Math.abs(x - 96) <= 9 && z > CZ + R - 9) continue;                // 계단 자리는 비운다
        ring.push([x, z, r, ((Math.atan2(z - CZ, x - CX) + Math.PI) / TAU * NA | 0) % NA]);
      }
      for (let y = AF - 2; y < Hh - 2; y++) {
        const tw = y * 0.085;
        for (let k = 0; k < NA; k++) { const th = k / NA * TAU - Math.PI, s1 = Math.abs(Math.sin(th * 14 + tw + n.fbm(th * 4, y * 0.02, 2) * 2.5)), s2 = Math.abs(Math.sin(th * 19 - tw * 1.2 + 1.7 + n.fbm(th * 3 + 5, y * 0.025, 2) * 2.2)) * 0.86; stA[k] = y <= topA[k] ? Math.max(s1, s2) : 0; }
        const flare = Math.max(0, AF + 7 - y) * 0.7;
        for (const [x, z, r, k] of ring) {
          const st = stA[k]; if (st < (y < AF + 8 ? 0.4 : 0.52)) continue;
          const ri = R + 1 + (1 - st) * 4 - flare, th = 4 + bkA[k] * 5;
          if (r < ri || r > ri + th) continue;
          w.set(x, y, z, (y < AF + 3 && hash3(x, y, z) > 0.5) || (y < AF + 40 && hash3(x >> 2, y >> 2, z >> 2) > 0.93) ? B.moss : (st > 0.82 ? (hash3(x >> 1, y >> 2, z >> 1) > 0.75 ? B.root2 : B.root) : (st > 0.62 ? B.root2 : (r > ri + th - 1.5 ? B.rootSh : B.rootDk))));
        }
      }
      landmarks.push({ name: '뿌리의 성당', note: '성수의 뿌리가 엉킨 벽', p: [CX - 34, AF + 70, CZ - 38] });
      // 금빛 수액이 차오르는 뿌리(부품, 평소엔 숨김): 맞은편 벽 안쪽을 따라
      const veins = w.prop({ name: 'veins', pivot: [CX + 0.5, AF, CZ - R + 2], scl0: [0, 0, 0], clipOK: 99999 });
      for (let q = 0; q < 9; q++) {
        const th = camA + Math.PI + (q - 4) * 0.2, x0 = CX + Math.cos(th) * (R - 0.5), z0 = CZ + Math.sin(th) * (R - 0.5), x1 = CX + Math.cos(th + 0.25) * (R + 0.5), z1 = CZ + Math.sin(th + 0.25) * (R + 0.5);
        LB.tube(veins, [[x0, AF + 1, z0], [(x0 + x1) / 2, AF + 30, (z0 + z1) / 2], [x1, AF + 64, z1]], t => 0.8 - t * 0.3, B.sap);
      }
      lights.push({ name: 'roots', p: [CX - 30.5, AF + 18, CZ - 36.5], c: '#ffd870', i: 0.05, d: 60, flicker: 0.2, srcR: 40 });
      acts.push({
        name: '뿌리의 맥동', hint: '맞은편 뿌리 벽을 따라 금빛 수액이 위로 차올라요', hit: [CX - 40, AF + 1, CZ - 44, CX - 30, AF + 16, CZ - 36],
        run: async a => { a.flash('roots', 14, 4.4); a.glow(1.5, 4.4); await a.tween('veins', { scl: [1, 1, 1] }, 1.4); for (let k = 0; k < 6; k++) { a.burst([CX - 34 + k * 3, AF + 10 + k * 8, CZ - 40 + k], { n: 18, colors: ['#ffd870', '#ffe9a0'], speed: 1, up: 2, life: 1.6, gravity: -0.3, spread: 2 }); await a.wait(0.3); } await a.wait(1); await a.tween('veins', { scl: [0, 0, 0] }, 1.2); },
      });

      // ── 동굴 위를 가로지르는 거대한 뿌리 아치와 늘어진 잔뿌리(부품) ──
      // 아치는 화면 좌우(북동↔남서)로 높이 가로지른다(시점 쪽으로 내려와 웅덩이를 가리지 않게)
      const arches = [
        [[CX + 29, AF + 22, CZ - 45], [CX + 10, AF + 64, CZ - 26], [CX - 8, AF + 78, CZ - 8], [CX - 26, AF + 64, CZ + 10], [CX - 45, AF + 22, CZ + 29]],
        [[CX + 2, AF + 58, CZ - 53], [CX - 12, AF + 88, CZ - 40], [CX - 26, AF + 96, CZ - 26], [CX - 40, AF + 88, CZ - 12], [CX - 53, AF + 58, CZ + 2]],
      ];
      const hangs = [];
      arches.forEach((pts, ai) => {
        const C = LB.tube(w, pts, t => 4.6 - t * 1.8, (x, y, z, t, dy, d) => d > 0.85 ? (dy > 0 ? B.root : B.rootDk) : B.root2);
        [0.32, 0.5, 0.68].forEach((f, j) => {
          const p = C[Math.round(f * (C.length - 1))], L = 12 + (j * 7 + ai * 5) % 14, name = 'hang' + ai + j;
          const pr = w.prop({ name, pivot: [p[0], p[1] - 3, p[2]], axis: j % 2 ? 'x' : 'z', rock: 0.05, rockSpeed: 0.5 + j * 0.15, phase: ai + j, clipOK: 40 });
          LB.tube(pr, [[p[0], p[1] - 3, p[2]], [p[0] + 1.5, p[1] - 3 - L * 0.5, p[2] - 1], [p[0] + 0.5, p[1] - 3 - L, p[2] + 0.5]], t => 0.9 - t * 0.4, B.vine, { under: true });
          hangs.push([name, p[0], p[1] - 3 - L, p[2]]);
        });
      });
      acts.push({
        name: '늘어진 잔뿌리', hint: '뿌리 아치에 늘어진 잔뿌리가 흔들리며 물방울이 웅덩이로 떨어져요', hit: [Math.round(hangs[1][1]) - 2, Math.round(hangs[1][2]), Math.round(hangs[1][3]) - 2, Math.round(hangs[1][1]) + 2, Math.round(hangs[1][2]) + 10, Math.round(hangs[1][3]) + 2],
        run: async a => {
          await Promise.all(hangs.map(([nm], k) => (async () => { for (let q = 0; q < 2; q++) { await a.turn(nm, k % 2 ? [0.32, 0, 0] : [0, 0, 0.32], 0.7); await a.turn(nm, k % 2 ? [-0.28, 0, 0] : [0, 0, -0.28], 0.8); } await a.turn(nm, [0, 0, 0], 0.6); })()));
          for (const [, x, y, z] of hangs) a.burst([x, y, z], { n: 10, colors: ['#eef8f4', '#ffffff', '#cfe8ec'], speed: 0.4, up: 0, life: 1.6, gravity: 12, spread: 0.6 });
        },
      });

      // ── 바닥: 뿌리 줄기, 금빛 낙엽, 부패의 꽃밭(서쪽) ──
      for (let k = 0; k < 18; k++) {
        const th = k / 18 * TAU + 0.2, r0 = R + 2, r1 = 25 + (k % 3) * 2;
        if (Math.cos(th - Math.PI / 2) > 0.9) continue;                        // 계단 앞은 비운다
        const P = r => [CX + Math.cos(th) * r, AF + 0.4, CZ + Math.sin(th) * r];
        const a0 = P(r0), a1 = P((r0 + r1) / 2), a2 = P(r1);
        a1[0] += Math.sin(k * 1.7) * 3; a1[2] += Math.cos(k * 1.3) * 3;
        LB.tube(w, [a0, a1, a2], t => 2.2 - t * 1.4, (x, y, z, t, dy) => dy > 0 ? B.root2 : B.rootDk);
      }
      MH.scatter(w, 1600, (x, g, z, b) => { const r = Math.hypot(x - CX, z - CZ); if (r > 22 && r < R && (b === B.mud || b === B.moss || b === B.mudDk) && w.chance(0.35)) w.set(x, g, z, B.leafG); });
      const rotSpots = [];
      for (let i = 0; i < 260; i++) {
        const a = w.r(0, TAU), rr = Math.sqrt(w.r(0, 1)) * 16, x = Math.round(CX - 34 + Math.cos(a) * rr), z = Math.round(CZ + 12 + Math.sin(a) * rr), g = MH.g(w, x, z);
        if (w.liq[x + W * z] >= 0 || w.get(x, g + 1, z)) continue;
        w.set(x, g, z, B.rotMoss);
        if (i % 3 === 0) { w.set(x, g + 1, z, i % 2 ? B.rot : B.petalLt); if (i % 9 === 0) rotSpots.push([x, g + 1, z]); }
      }
      lights.push({ name: 'rot', p: [CX - 33.5, AF + 3, CZ + 12.5], c: '#ff5a3a', i: 0.35, d: 22, flicker: 0.3, srcR: 16 });
      acts.push({
        name: '부패의 꽃밭', hint: '서쪽 진홍 꽃밭에서 부패의 홀씨가 피어올라요', hit: [CX - 38, AF, CZ + 8, CX - 30, AF + 3, CZ + 16],
        run: async a => { a.flash('rot', 4, 4); for (let k = 0; k < 3; k++) { for (const p of rotSpots) a.burst([p[0] + 0.5, p[1] + 1, p[2] + 0.5], { n: 6, colors: ['#ff5a3a', '#ff9a6a', '#d8402a'], speed: 0.6, up: 2.4, life: 2, gravity: -0.3, spread: 0.6 }); await a.wait(0.7); } },
      });

      // ── 빛줄기와 물결 ──
      lights.push({ name: 'shaft', p: [CX + 0.5, AF + 26, CZ + 0.5], c: '#fff0c8', i: 0.9, d: 64, flicker: 0.05, srcR: 30 });
      acts.push({
        name: '내리는 빛줄기', hint: '동굴 꼭대기에서 웅덩이로 내리는 빛줄기가 환해지며 빛 알갱이가 쏟아져요', hit: [CX - 3, AF, CZ - 3, CX + 3, AF + 2, CZ + 3],
        run: async a => { a.flash('shaft', 2.4, 5); a.glow(1.6, 5); for (let k = 0; k < 14; k++) { a.burst([CX + 0.5, AF + 60 - k * 2, CZ + 0.5], { n: 26, colors: ['#fff6d8', '#ffe8a0', '#ffffff'], speed: 1.4, up: -3, life: 2.6, gravity: 2, spread: 5 }); await a.wait(0.25); } },
      });
      acts.push({
        name: '웅덩이의 물결', hint: '얕은 물웅덩이에 동그란 물결이 번져 나가요', hit: [CX + 8, AF - 1, CZ + 6, CX + 14, AF + 1, CZ + 12],
        run: async a => { for (let r = 2; r <= 18; r += 2) { for (let q = 0; q < 20; q++) { const t = q / 20 * TAU; a.burst([CX + 11.5 + Math.cos(t) * r * 0.6, AF + 0.6, CZ + 9.5 + Math.sin(t) * r * 0.6], { n: 3, colors: ['#eef8f4', '#cfe8ec'], speed: 0.4, up: 0.6, life: 0.7, gravity: 1, spread: 0.3 }); } await a.wait(0.14); } },
      });

      // ── 2단계: 진홍 아에오니아(부품) — 웅덩이 한가운데서 거대한 꽃이 솟아 핀다 ──
      const ay = AF;
      const stem = w.prop({ name: 'aeStem', pivot: [CX + 0.5, ay, CZ + 0.5], scl0: [0, 0, 0] });
      stem.box(CX - 1, ay + 1, CZ - 1, CX + 1, ay + 3, CZ + 1, B.stem); stem.sphere(CX, ay + 5, CZ, 2.6, B.core);
      const petals = [];
      for (let k = 0; k < 6; k++) {
        const a = k * Math.PI / 3, nm = 'petal' + k;
        const pr = w.prop({ name: nm, pivot: [CX + 0.5 + Math.cos(a) * 2.5, ay + 3, CZ + 0.5 + Math.sin(a) * 2.5], scl0: [0, 0, 0], clipOK: 20 });
        for (let l = 0; l < 13; l++) {
          const wd = Math.sin((l + 1) / 14 * Math.PI) * 3.4, h = l * 1.2;
          for (let s = -wd; s <= wd; s += 0.5) {
            const x = CX + Math.cos(a) * 2.5 + Math.cos(a) * 0.45 * l - Math.sin(a) * s, z = CZ + Math.sin(a) * 2.5 + Math.sin(a) * 0.45 * l + Math.cos(a) * s;
            pr.set(Math.round(x), Math.round(ay + 3 + h), Math.round(z), Math.abs(s) > wd - 0.8 || l > 10 ? B.petalLt : B.petal);
          }
        }
        petals.push([nm, a]);
      }
      lights.push({ name: 'aeonia', p: [CX + 0.5, AF + 8, CZ + 0.5], c: '#ff5a3a', i: 0.05, d: 50, flicker: 0.15, srcR: 30 });
      acts.push({
        name: '진홍 아에오니아', hint: '웅덩이 한가운데서 거대한 붉은 꽃이 솟아 활짝 피며 부패가 터져요', hit: [CX - 4, AF - 1, CZ - 4, CX + 4, AF + 3, CZ + 4],
        run: async a => {
          a.flash('aeonia', 20, 7); a.glow(1.6, 7);
          a.burst([CX + 0.5, AF + 1, CZ + 0.5], { n: 60, colors: ['#ff4a2a', '#ff9a6a', '#ffffff'], speed: 6, up: 3, life: 1.4, gravity: 3, spread: 4, flat: true });
          await Promise.all([a.tween('aeStem', { scl: [1, 1, 1] }, 0.9), ...petals.map(([nm]) => a.tween(nm, { scl: [1, 1, 1] }, 0.9))]);
          await Promise.all(petals.map(([nm, ang]) => a.turn(nm, [Math.sin(ang) * 1.05, 0, -Math.cos(ang) * 1.05], 1.4)));
          for (let k = 0; k < 6; k++) { a.burst([CX + 0.5, AF + 8, CZ + 0.5], { n: 60, colors: ['#ff4a2a', '#ff9a6a', '#ffd070'], speed: 8, up: 4, life: 2.6, gravity: 0.5, spread: 4 }); await a.wait(0.35); }
          await a.wait(0.8);
          await Promise.all(petals.map(([nm]) => a.turn(nm, [0, 0, 0], 1.4)));
          await Promise.all([a.tween('aeStem', { scl: [0, 0, 0] }, 0.8), ...petals.map(([nm]) => a.tween(nm, { scl: [0, 0, 0] }, 0.8))]);
        },
      });
      acts.push({
        name: '부패의 안개', hint: '웅덩이 위로 진홍빛 부패의 안개가 낮게 깔리며 번져요', hit: [CX - 14, AF - 1, CZ - 12, CX - 8, AF + 1, CZ - 6],
        run: async a => { a.flash('aeonia', 8, 4); a.wind(1.8, 4); for (let r = 4; r <= 40; r += 4) { for (let q = 0; q < 14; q++) { const t = q / 14 * TAU + r; a.burst([CX + 0.5 + Math.cos(t) * r, AF + 1, CZ + 0.5 + Math.sin(t) * r], { n: 8, colors: ['#ff6a4a', '#d8402a', '#ffb090'], speed: 1.6, up: 0.6, life: 2.4, gravity: -0.1, spread: 2, flat: true }); } await a.wait(0.22); } },
      });
      acts.push({
        name: '물새 난무', hint: '웅덩이 동쪽에서 칼날 같은 깃털이 세 번 휘몰아쳐요', hit: [CX + 16, AF, CZ - 6, CX + 22, AF + 2, CZ],
        run: async a => {
          a.wind(2.6, 4);
          for (let wv = 0; wv < 3; wv++) {
            for (let k = 0; k < 18; k++) { const t = k / 18 * TAU * 1.5 + wv * 1.2, rr = 3 + k * 0.5 + wv * 1.5; a.burst([CX + 19.5 + Math.cos(t) * rr, AF + 2 + k * 0.6, CZ - 2.5 + Math.sin(t) * rr], { n: 8, colors: ['#ffffff', '#f2eee0', '#ff4a4a'], speed: 5, up: 1, life: 0.7, gravity: 0, spread: 0.6 }); await a.wait(0.035); }
            await a.wait(0.45);
          }
        },
      });
      landmarks.push({ name: '성수 뿌리 밑', note: '보스 · 미켈라의 칼날 말레니아', p: [CX + 0.5, AF + 30, CZ + 0.5], boss: true });

      // ── 남쪽: 성수 뿌리의 축복과 내려가는 계단, 안개문 ──
      const S0 = CZ + R - 2, S1 = CZ + R + 12;
      MH.flight(w, { name: '뿌리 계단', axis: 'z', c: 96, half: 6, a: S0, b: S1, ha: AF, hb: LD, step: B.pave, edge: B.trim, fill: B.stone, rail: B.stoneDk, post: B.stone, postGap: 4 });
      for (let x = 90; x <= 102; x++) for (let y = AF + 1; y <= AF + 10; y++) if (hash3(x, y, 21) > 0.62) w.set(x, y, S0 - 1, B.fogG);
      lights.push({ name: 'fog', p: [96.5, AF + 5, S0 + 0.5], c: '#fff4d8', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '계단 아래 동굴방 입구의 안개가 일렁이며 흩날려요', hit: [90, AF + 1, S0 - 2, 102, AF + 10, S0],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([96.5, AF + 2 + k, S0 - 0.5], { n: 22, colors: ['#fff4d8', '#ffffff', '#ffe9a0'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 5, flat: true }); await a.wait(0.18); } },
      });
      // 축복 턱: 무너진 아치와 금빛 난간
      for (const x of [86, 106]) { w.box(x - 1, LD + 1, S1 + 2, x + 1, LD + 16, S1 + 4, B.stone); w.box(x - 2, LD + 1, S1 + 1, x + 2, LD + 2, S1 + 5, B.stoneDk); w.box(x - 1, LD + 17, S1 + 2, x + 1, LD + 17, S1 + 4, B.trim); }
      LB.tube(w, [[86, LD + 17, S1 + 3], [92, LD + 22, S1 + 3], [96, LD + 23, S1 + 3]], 1.4, B.stone);
      LB.crumble(w, 84, LD + 12, S1 + 1, 108, LD + 26, S1 + 5, 0.3, 2, 3);
      for (let z = S1 + 1; z <= D - 1; z++) for (const x of [86, 106]) if (MH.g(w, x, z) === LD) { w.set(x, LD + 1, z, z % 4 ? B.stone : B.stoneDk); if (z % 4 === 0) w.set(x, LD + 2, z, B.gold); }
      // 다리 밑을 아치로 뚫는다
      for (let z = S1 + 8; z <= D - 6; z += 9) LB.arch(w, { axis: 'z', c: 106, u0: z, y0: AF - 24, a: 3, h: 28, kind: 'pointed', fill: 0, frame: B.trim, depth: 21, dir: -1 });
      const gp = LB.grace(w, 100, LD, S1 + 8, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      acts.push(LB.graceAct({ at: gp, to: [CX + 0.5, AF + 3, CZ + 0.5], arc: 16, steps: 26, hint: '성수 뿌리의 축복이 계단 아래 동굴방을 가리켜요' }));
      landmarks.push({ name: '성수 뿌리', note: '계단 위의 축복', p: [gp[0], gp[1] + 14, gp[2]] });

      // ── 위에서 쏟아지는 금빛 낙엽 ──
      acts.push({
        name: '성수의 낙엽', hint: '뿌리 틈으로 성수의 금빛 잎이 한꺼번에 쏟아져 내려요', hit: [CX - 48, AF + 2, CZ - 6, CX - 44, AF + 10, CZ],
        run: async a => { a.wind(2.4, 4); for (let k = 0; k < 9; k++) { a.burst([CX - 40 + k * 10, 120 - (k % 3) * 8, CZ - 30 + (k % 4) * 14], { n: 40, colors: ['#e8c050', '#d8a030', '#f6dc80'], speed: 5, up: -1, life: 3.4, gravity: 2.2, spread: 9, flat: true }); await a.wait(0.35); } },
      });
      return { lights, landmarks, acts };
    },
  });
})();
