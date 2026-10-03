// 성수 버팀목 에브레펠 · 성수 뿌리 밑 — 동쪽 지하 납골당(성수 뿌리 축복)에서 계단을 내려가 안개문을 지나면, 서쪽으로 둥근 뿌리 동굴(보스방)이 펼쳐진다.
// 바닥은 하얀 꽃밭과 발목 높이의 얕은 물, 둘레는 창백한 거대 뿌리 벽, 북쪽 거목 밑동 앞 돌 의자에서 말레니아가 기다린다. 서쪽엔 싸움 뒤 남는 진홍 꽃과 축복.
// 납골당 동쪽 끝 승강기 옆 이정표로 위쪽 미켈라의 성수(하위 지도)로 간다. (메인 보스: 미켈라의 칼날 말레니아)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 둥근 보스방이 가운데, 뒤(북서)로 뿌리 벽과 거목이 높이 솟고, 오른쪽(동)에 납골당이 붙는다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 160;
  const CX = 86, CZ = 98, R = 44;                            // 둥근 보스방 한가운데 · 반지름
  const TX = 82, TZ = 49;                                   // 북쪽 거목 밑동
  MAPS.push({
    id: 'elphael', cat: 'lands', name: '성수 버팀목 에브레펠', en: 'Elphael · Haligtree Roots', color: '#e0a040', seed: 839, base: 30, time: 'night', size: [W, D, Hh],
    desc: '에브레펠 맨 밑, 촛불 켠 납골당의 성수 뿌리 축복에서 계단을 내려가 안개문을 지나면 성수의 뿌리 밑 둥근 동굴이 나온다. 하얀 꽃이 뒤덮인 바닥에 발목까지 얕은 물이 고였고, 창백한 거대 뿌리가 벽과 둥근 천장을 이룬다. 북쪽 거목 밑동의 돌 의자에서 미켈라의 칼날 말레니아가 오라비를 기다린다.',
    monsters: { normal: ['성수의 병사', '성수의 기사', '부패의 권속'], mid: '부패한 화신', boss: '미켈라의 칼날 말레니아' },
    sky: ['#1c2028', '#06080c', '#4a5a6a'], stars: false,
    hemi: ['#a8b8cc', '#2a2620', 0.56], sun: ['#c8d4e4', 0.42, [0.35, 1, 0.5]],
    day: { sky: ['#5a6470', '#1e242c', '#a8b4c0'], stars: false, hemi: ['#dce4ee', '#4a4438', 0.64], sun: ['#eef2f8', 0.62, [0.35, 1, 0.5]], haze: '#4a525c' },
    liquid: ['#32424a', '#5e7880', '#d8eaee'], liqSpeed: 0.12,
    fog: { start: 0.82, floor: 16, depth: 12, haze: [34, 0.22, 10], hazeColor: '#2a3038' },
    camY: -12, zoom: 1.8,
    particles: [
      { n: 260, colors: ['#e8eef4', '#ffffff', '#c8d8e4'], mode: 'fall', speed: 0.18, wind: 0, area: [CX - 4, CZ - 8, 30], y0: 34, y1: 140, glow: true },
      { n: 260, colors: ['#e8c050', '#d8a030', '#f6dc80'], mode: 'fall', speed: 0.3, wind: 0.2, area: [TX + 2, TZ + 18, 14], y0: 34, y1: 90, glow: false },
      { n: 300, colors: ['#ffffff', '#eef2f4'], mode: 'wisp', speed: 0.25, size: 2, area: [CX, CZ, 40], y0: 31 },
      { n: 70, colors: ['#ff5a3a', '#ff8a5a', '#d8402a'], mode: 'drift', speed: 0.22, area: [CX - 40, CZ, 10], y0: 31, y1: 50, glow: true },
    ],
    blocks: {
      root: { c: '#cfc6b0', v: 0.07, pat: 'big' }, root2: { c: '#b8ae98', v: 0.07, pat: 'big' }, rootDk: { c: '#8e8472', v: 0.07, pat: 'stone' }, rootSh: { c: '#5a5248', v: 0.05 },
      soil: { c: '#3a362e', top: '#46423a', v: 0.1 }, soilDk: { c: '#2c2a24', top: '#36332c', v: 0.08 }, moss: { c: '#3e4434', top: '#525a40', v: 0.1 },
      dust: { c: '#a8a49a', top: '#d4d2ca', v: 0.06 }, flowerW: { c: '#f2f0e8', v: 0.04 }, flowerL: { c: '#d8d0e0', v: 0.04 }, bud: { c: '#9aa080', v: 0.05 },
      rock: { c: '#55524c', v: 0.06, pat: 'big' }, rockDk: { c: '#3c3a36', v: 0.06, pat: 'stone' },
      stone: { c: '#bca47e', v: 0.05, pat: 'brick' }, stoneDk: { c: '#8e7856', v: 0.05, pat: 'brick' }, trim: { c: '#dccca4', v: 0.03 }, pave: { c: '#9a8866', top: '#b09c78', v: 0.06, pat: 'stone' },
      slab: { c: '#c8b48c', v: 0.04 }, relief: { c: '#7e6a4c', v: 0.04 }, coffin: { c: '#d4c8b0', v: 0.04, pat: 'stone' }, iron: { c: '#2e2c2a', v: 0.03 },
      candle: { c: '#fff0c0', glow: true }, wax: { c: '#ece4d0', v: 0.03 },
      leafG: { c: '#d8a830', v: 0.1 }, leafG2: { c: '#f0c848', v: 0.08 }, bark: { c: '#857a66', v: 0.06, pat: 'log' }, bark2: { c: '#a69c86', v: 0.06, pat: 'log' }, barkDk: { c: '#5e5444', v: 0.06, pat: 'log' },
      chairS: { c: '#a8a294', v: 0.04, pat: 'stone' }, chairD: { c: '#7a7468', v: 0.04 }, blade: { c: '#e8d08a', glow: true },
      rot: { c: '#e0502a', glow: true }, rotDk: { c: '#6a2a1e', v: 0.06 }, rotMoss: { c: '#5a2e24', top: '#843c2a', v: 0.1 },
      petal: { c: '#c8402c', v: 0.05 }, petalLt: { c: '#ec7454', v: 0.04 }, core: { c: '#ffb070', glow: true }, stem: { c: '#3e4a2c', v: 0.06 },
      wing: { c: '#b8302a', v: 0.06 }, wingLt: { c: '#ff7a50', glow: true },
      vine: { c: '#a89c84', v: 0.06 }, fogG: { c: '#eef4f8', glow: true }, grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#8e7856', v: 0.05 }, timber: { c: '#4a3c2c', v: 0.05 }, door: { c: '#6a5638', v: 0.05, pat: 'plank' }, gold: { c: '#ffd070', glow: true }, mlamp: { c: '#ffe0a0', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, TAU = Math.PI * 2;
      const AF = base, LD = AF + 12;                                  // 보스방 바닥 · 납골당 바닥
      const HX0 = 146, HX1 = 184, HZ0 = 66, HZ1 = 102, SZ = 84;          // 납골당 네모 · 계단 가운데 줄
      const ST0 = 130, ST1 = 145;                                       // 계단(서쪽 아래 → 동쪽 위)
      const camA = Math.atan2(0.73, 0.68);                              // 기본 시점이 있는 쪽(남동)
      const backF = th => 0.5 - 0.5 * Math.cos(th - camA);             // 0 시점 쪽 ~ 1 맞은편
      const hall = (x, z) => x >= HX0 && x <= HX1 && z >= HZ0 && z <= HZ1;
      const corridor = (x, z) => x >= CX + R - 8 && x < HX0 && Math.abs(z - SZ) <= 7;
      const rA = (x, z) => Math.hypot(x - CX, z - CZ) + (n.fbm(x * 0.05, z * 0.05, 2) - 0.5) * 6;
      MH.terrain(w, {
        floor: AF - 24,
        height: (x, z) => {
          if (hall(x, z)) return LD;
          if (corridor(x, z)) return AF;
          const r = rA(x, z);
          if (r <= R + 1) return AF + Math.round(n.fbm(x * 0.07, z * 0.07, 2) * 1.2 + Math.max(0, r - R + 7) * 0.35);
          if (r <= R + 12) return AF + 3 + Math.round(n.fbm(x * 0.1, z * 0.1, 2) * 2);
          return AF - 22 + n.fbm(x * 0.05, z * 0.05, 2) * 4;            // 뿌리 밖은 어둠 속으로 꺼진다
        },
        surface: (x, z, y) => {
          if (y <= AF - 10) return B.rockDk;
          if (hall(x, z)) return B.pave;
          const r = rA(x, z);
          if (r > R - 7) return n.fbm(x * 0.2, z * 0.2, 2) > 0.45 ? B.dust : B.soil;   // 뿌리 발치는 창백한 뿌리 먼지
          return n.fbm(x * 0.09, z * 0.09, 2) > 0.62 ? B.moss : (hash3(x, 1, z) > 0.8 ? B.soilDk : B.soil);
        },
        under: (x, z, y, dep) => hall(x, z) ? (y < AF - 2 ? (y % 4 === 0 ? B.rockDk : B.rock) : ((y % 5 === 0) ? B.trim : B.stone)) : (dep < 2 ? B.soilDk : (y % 4 === 0 ? B.rockDk : B.rock)),
      });
      const lights = [], acts = [], landmarks = [];
      const gAt = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const fly = async (a, from, to, arc, steps, colors, nn) => {
        for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); }
      };

      // ══ 얕은 물: 가운데에서 남쪽으로 넓게, 꽃 둔덕 사이로 손가락처럼 번진다 ══
      const PX = CX - 2, PZ = CZ + 6;
      const inPool = (x, z) => {
        const a = Math.atan2(z - PZ, x - PX), d = Math.hypot((x - PX) / 1.35, (z - PZ) * 1.05);
        if (n.fbm(x * 0.11 + 9, z * 0.11, 2) > 0.68) return false;                        // 물 속 꽃 둔덕
        return d < 15 + n.fbm(Math.cos(a) * 1.6 + 3, Math.sin(a) * 1.6, 2) * 14 - 4 + (n.fbm(x * 0.15, z * 0.15, 2) - 0.5) * 8;
      };
      for (let z = CZ - R; z <= CZ + R; z++) for (let x = CX - R; x <= CX + R; x++) {
        if (rA(x, z) > R - 8 || !inPool(x, z)) continue;
        MH.setH(w, x, z, AF - 1, n.fbm(x * 0.2, z * 0.2, 2) > 0.55 ? B.soilDk : B.soil, B.soilDk);
        w.liquid(x, z, AF);
      }

      // ══ 북쪽 거목 밑동: 뿌리 버팀벽이 바닥으로 퍼지고, 줄기는 천장 너머로 ══
      const TR = 13;
      for (let y = AF - 2; y < Hh - 4; y++) {
        const flare = Math.max(0, AF + 14 - y) * 0.5, rr = TR + flare + Math.sin(y * 0.11) * 0.8, Rr = Math.ceil(rr) + 3;
        for (let dz = -Rr; dz <= Rr; dz++) for (let dx = -Rr; dx <= Rr; dx++) {
          const a = Math.atan2(dz, dx), d = Math.hypot(dx, dz), ridge = Math.abs(Math.sin(a * 7 + y * 0.06)) * 2.2;
          if (d > rr + ridge - 1.2 || d < rr - 5) continue;
          w.set(TX + dx, y, TZ + dz, ridge > 1.7 ? B.bark2 : (ridge > 0.9 ? B.bark : B.barkDk));
        }
      }
      // 버팀 뿌리: 밑동에서 사방(주로 남쪽)으로 바닥을 기어 나온다
      for (let k = 0; k < 9; k++) {
        const a = Math.PI * 0.5 + (k - 4) * 0.32, L = 18 + (k % 3) * 5;
        if (Math.abs(a - Math.atan2(TZ + TR + 7 - TZ, 2)) < 0.5) continue;      // 의자 앞은 비운다
        const p0 = [TX + Math.cos(a) * (TR - 1), AF + 10, TZ + Math.sin(a) * (TR - 1)], p1 = [TX + Math.cos(a) * (TR + L * 0.5), AF + 3, TZ + Math.sin(a) * (TR + L * 0.5)], p2 = [TX + Math.cos(a + 0.1) * (TR + L), AF + 0.5, TZ + Math.sin(a + 0.1) * (TR + L)];
        LB.tube(w, [p0, p1, p2], t => 3.4 - t * 2.4, (x, y, z, t, dy) => dy > 0 ? (hash3(x, y, z) > 0.86 ? B.dust : B.root) : B.rootDk);
      }
      landmarks.push({ name: '성수의 밑동', note: '말레니아가 기다리던 거목 뿌리', p: [TX + 0.5, AF + 62, TZ + 0.5] });

      // ══ 뿌리 벽: 두 갈래로 꼬여 오르는 창백한 뿌리. 시점 쪽은 낮고, 맞은편은 천장까지 ══
      const NA = 720, topA = new Float32Array(NA), stA = new Float32Array(NA), bkA = new Float32Array(NA);
      for (let k = 0; k < NA; k++) { const th = k / NA * TAU - Math.PI; bkA[k] = backF(th); topA[k] = AF + 7 + 96 * Math.pow(bkA[k], 2.6) + n.fbm(th * 2.2 + 3, 1.7, 2) * 10 + (n.fbm(th * 11 + 7, 0.3, 2) - 0.5) * 24 * bkA[k]; }
      const FX = ST0 - 2, ring = [];
      for (let z = CZ - R - 16; z <= CZ + R + 16; z++) for (let x = CX - R - 16; x <= CX + R + 16; x++) {
        if (x < 0 || z < 0 || x >= W || z >= D) continue;
        const r = Math.hypot(x - CX, z - CZ); if (r < R - 7 || r > R + 15) continue;
        if (x >= FX - 6 && Math.abs(z - SZ) <= 5) continue;
        if (Math.hypot(x - TX, z - TZ) < 19) continue;                           // 거목 밑동은 벽 앞으로 드러난다                  // 안개문 자리는 비운다
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
          w.set(x, y, z, (y < AF + 4 && hash3(x, y, z) > 0.55) ? B.dust : (st > 0.82 ? (hash3(x >> 1, y >> 2, z >> 1) > 0.75 ? B.root2 : B.root) : (st > 0.62 ? B.root2 : (r > ri + th - 1.5 ? B.rootSh : B.rootDk))));
        }
      }

      // ══ 뿌리 천장: 뒤쪽 벽과 거목에서 뻗은 뿌리가 둥근 천장처럼 엉킨다 + 늘어진 잔뿌리(부품) ══
      const hangs = [], VC = [CX - 6, AF + 92, CZ - 18];
      for (let k = 0; k < 11; k++) {
        const th = camA + Math.PI + (k - 5) * 0.27, rr = R + 3, sx = CX + Math.cos(th) * rr, sz = CZ + Math.sin(th) * rr, sy = AF + 46 + (k % 3) * 9;
        const mid = [(sx + VC[0]) / 2 + Math.sin(k * 2.1) * 6, VC[1] + 4 + (k % 2) * 5, (sz + VC[2]) / 2 + Math.cos(k * 1.7) * 6];
        const end = [VC[0] + (sx - VC[0]) * -0.25 + Math.sin(k) * 8, VC[1] - 6 - (k % 4) * 3, VC[2] + (sz - VC[2]) * -0.25 + Math.cos(k) * 8];
        const C = LB.tube(w, [[sx, sy, sz], mid, end], t => 3.2 - t * 1.8, (x, y, z, t, dy, d) => d > 0.8 ? (dy > 0 ? B.root : B.rootDk) : B.root2);
        if (k % 2 === 0) {
          const p = C[C.length - 3], L = 14 + (k * 5) % 12, name = 'hang' + hangs.length;
          const pr = w.prop({ name, pivot: [p[0], p[1] - 2, p[2]], axis: k % 4 ? 'x' : 'z', rock: 0.05, rockSpeed: 0.5 + k * 0.05, phase: k, clipOK: 40 });
          LB.tube(pr, [[p[0], p[1] - 2, p[2]], [p[0] + 1.5, p[1] - 2 - L * 0.5, p[2] - 1], [p[0] + 0.5, p[1] - 2 - L, p[2] + 0.5]], t => 0.9 - t * 0.4, B.vine, { under: true });
          hangs.push([name, p[0], p[1] - 2 - L, p[2]]);
        }
      }
      // 거목 줄기에서 천장으로 뻗는 굵은 가지 뿌리 둘
      LB.tube(w, [[TX - 6, AF + 70, TZ + 8], [TX - 20, AF + 86, TZ + 30], [VC[0] - 14, VC[1] + 2, VC[2] + 22]], t => 4.5 - t * 2.5, (x, y, z, t, dy) => dy > 0 ? B.root : B.rootDk);
      LB.tube(w, [[TX + 8, AF + 76, TZ + 6], [TX + 22, AF + 90, TZ + 16], [CX + 30, AF + 80, CZ - 30]], t => 4 - t * 2, (x, y, z, t, dy) => dy > 0 ? B.root : B.rootDk);
      const hh = hangs[1];
      acts.push({
        name: '늘어진 잔뿌리', hint: '뿌리 천장에 늘어진 잔뿌리가 흔들리며 물방울과 흰 꽃잎이 떨어져요', hit: [Math.round(hh[1]) - 2, Math.round(hh[2]), Math.round(hh[3]) - 2, Math.round(hh[1]) + 2, Math.round(hh[2]) + 10, Math.round(hh[3]) + 2],
        run: async a => {
          await Promise.all(hangs.map(([nm], k) => (async () => { for (let q = 0; q < 2; q++) { await a.turn(nm, k % 2 ? [0.32, 0, 0] : [0, 0, 0.32], 0.7); await a.turn(nm, k % 2 ? [-0.28, 0, 0] : [0, 0, -0.28], 0.8); } await a.turn(nm, [0, 0, 0], 0.6); })()));
          for (const [, x, y, z] of hangs) a.burst([x, y, z], { n: 12, colors: ['#eef8f4', '#ffffff', '#cfe8ec'], speed: 0.4, up: 0, life: 1.6, gravity: 12, spread: 0.6 });
        },
      });

      // ══ 바닥: 하얀 꽃밭(물 밖), 꽃 사이 싹 ══
      for (let z = CZ - R; z <= CZ + R; z++) for (let x = CX - R; x <= CX + R; x++) {
        const r = rA(x, z); if (r > R - 2) continue;
        if (w.liq[x + W * z] >= 0) continue;
        const g = MH.g(w, x, z); if (w.get(x, g + 1, z)) continue;
        const hz = hash3(x, 21, z), dens = 0.5 - Math.max(0, r - R + 12) * 0.03;
        if (hz < dens * 0.82) w.set(x, g + 1, z, hz < 0.05 ? B.flowerL : B.flowerW);
        else if (hz < dens) w.set(x, g + 1, z, B.bud);
      }

      // ══ 1. 말레니아의 의자: 거목 밑동 앞 돌 의자, 위로 금빛 잎 가지 ══
      const KX = TX + 2, KZ = TZ + TR + 6, kg = MH.maxG(w, KX - 3, KZ - 3, KX + 3, KZ + 3);
      MH.flatten(w, KX - 4, KZ - 3, KX + 4, KZ + 4, kg, B.dust, B.soil);
      for (let x = KX - 4; x <= KX + 4; x++) for (let z = KZ - 3; z <= KZ + 4; z++) for (let y = kg + 1; y <= kg + 16; y++) w.set(x, y, z, 0);
      w.box(KX - 2, kg + 1, KZ - 1, KX + 2, kg + 2, KZ + 2, B.chairS);                    // 자리
      w.box(KX - 2, kg + 3, KZ - 2, KX + 2, kg + 9, KZ - 2, B.chairS);                    // 등받이
      for (let y = kg + 4; y <= kg + 8; y++) for (const x of [KX - 1, KX + 1]) w.set(x, y, KZ - 2, B.chairD);   // 등받이 홈
      w.box(KX - 1, kg + 10, KZ - 2, KX + 1, kg + 10, KZ - 2, B.chairS); w.set(KX, kg + 11, KZ - 2, B.chairS);   // 뾰족 머리
      for (const s of [-1, 1]) { w.box(KX + s * 3, kg + 1, KZ - 2, KX + s * 3, kg + 4, KZ - 2, B.chairD); w.box(KX + s * 3, kg + 4, KZ - 1, KX + s * 3, kg + 4, KZ + 2, B.chairS); w.box(KX + s * 3, kg + 1, KZ + 2, KX + s * 3, kg + 3, KZ + 2, B.chairD); }
      // 의자에 기대 둔 칼(부품): 가늘고 휜 금빛 칼날
      const bladeP = w.prop({ name: 'blade', pivot: [KX + 4.5, kg + 1, KZ + 1.5], clipOK: 6 });
      for (let k = 0; k <= 12; k++) { const t = k / 12; bladeP.set(Math.round(KX + 4 + Math.sin(t * 1.2) * 1.2 - t * 0.6), kg + 1 + k, KZ + 1, k < 2 ? B.iron : B.blade); }
      // 금빛 잎 가지: 거목에서 의자 위로
      const gb = LB.tube(w, [[TX - 6, AF + 32, TZ + 9], [KX - 7, AF + 26, KZ - 2], [KX - 13, AF + 22, KZ + 2], [KX - 19, AF + 18, KZ + 3]], t => 1.6 - t * 1, B.bark);
      gb.forEach((p, i) => { if (i > 8 && i % 4 === 1) { const tw = [p[0] + Math.sin(i) * 3, p[1] - 2 - (i % 3), p[2] + Math.cos(i) * 3]; LB.tube(w, [p, tw], 0.5, B.bark); for (let q = 0; q < 9; q++) { const lx = Math.round(tw[0] + Math.sin(q * 2.3 + i) * 2), ly = Math.round(tw[1] - (q % 3)), lz = Math.round(tw[2] + Math.cos(q * 1.7 + i) * 2); if (!w.get(lx, ly, lz)) w.set(lx, ly, lz, q % 3 ? B.leafG : B.leafG2); } } });
      lights.push({ name: 'throne', p: [KX + 0.5, kg + 8, KZ + 2.5], c: '#ffe0a0', i: 0.35, d: 22, flicker: 0.1, srcR: 9 });
      landmarks.push({ name: '미켈라의 칼날 말레니아', note: '보스 · 거목 밑동의 돌 의자에서 오라비를 기다린다', p: [KX + 0.5, kg + 34, KZ + 0.5], boss: true });
      acts.push({
        name: '오래 꿈꾸던 자리', hint: '거목 밑동의 돌 의자 위로 금빛 잎이 쏟아지고, 의자에 기대 둔 의수 칼이 빛나요. 말레니아가 일어서는 자리예요', hit: [KX - 3, kg + 1, KZ - 3, KX + 5, kg + 11, KZ + 3],
        run: async a => {
          a.flash('throne', 6, 4);
          for (let k = 0; k < 8; k++) { const p = gb[Math.round((0.4 + k / 7 * 0.6) * (gb.length - 1))]; a.burst([p[0] + 0.5, p[1] - 1, p[2] + 0.5], { n: 24, colors: ['#f0c848', '#d8a830', '#fff0a0'], speed: 1.5, up: 0, life: 3, gravity: 1.6, spread: 3 }); await a.wait(0.15); }
          await a.tween('blade', { off: [0, 1.5, 0], rot: [0, 0, -0.25] }, 0.6);
          a.burst([KX + 4.5, kg + 10, KZ + 1.5], { n: 40, colors: ['#ffffff', '#ffe9a0', '#e8d08a'], speed: 3, up: 1, life: 0.8, gravity: 0, spread: 1.2 });
          await a.wait(1);
          await a.tween('blade', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6);
        },
      });

      // ══ 2. 물새 난무: 물 위로 칼날 깃털이 세 번 휘몰아친다 ══
      const WX = CX + 8, WZ = CZ + 4;
      acts.push({
        name: '물새 난무', hint: '얕은 물 위로 뛰어오른 칼날이 깃털처럼 세 번 휘몰아치고 물보라가 일어요', hit: [WX - 3, AF - 1, WZ - 3, WX + 3, AF + 2, WZ + 3],
        run: async a => {
          a.wind(2.6, 4);
          for (let wv = 0; wv < 3; wv++) {
            for (let k = 0; k < 18; k++) { const t = k / 18 * TAU * 1.5 + wv * 1.2, rr = 3 + k * 0.5 + wv * 1.5; a.burst([WX + 0.5 + Math.cos(t) * rr, AF + 2 + k * 0.6, WZ + 0.5 + Math.sin(t) * rr], { n: 8, colors: ['#ffffff', '#f2eee0', '#ff4a4a'], speed: 5, up: 1, life: 0.7, gravity: 0, spread: 0.6 }); await a.wait(0.035); }
            a.burst([WX + 0.5, AF + 0.6, WZ + 0.5], { n: 50, colors: ['#d8eaee', '#ffffff', '#8aa8b0'], speed: 6, up: 3, life: 0.9, gravity: 9, spread: 3, flat: true });
            await a.wait(0.45);
          }
        },
      });

      // ══ 3. 진홍 아에오니아(부품): 물 한가운데서 거대한 꽃이 솟아 피고 부패가 터진다 ══
      const AX = PX - 6, AZ = PZ + 2, ay = AF;
      const stem = w.prop({ name: 'aeStem', pivot: [AX + 0.5, ay, AZ + 0.5], scl0: [0, 0, 0] });
      stem.box(AX - 1, ay + 1, AZ - 1, AX + 1, ay + 3, AZ + 1, B.stem); stem.sphere(AX, ay + 5, AZ, 2.6, B.core);
      const petals = [];
      for (let k = 0; k < 6; k++) {
        const a = k * Math.PI / 3, nm = 'petal' + k;
        const pr = w.prop({ name: nm, pivot: [AX + 0.5 + Math.cos(a) * 2.5, ay + 3, AZ + 0.5 + Math.sin(a) * 2.5], scl0: [0, 0, 0], clipOK: 20 });
        for (let l = 0; l < 13; l++) {
          const wd = Math.sin((l + 1) / 14 * Math.PI) * 3.4, h = l * 1.2;
          for (let s = -wd; s <= wd; s += 0.5) {
            const x = AX + Math.cos(a) * 2.5 + Math.cos(a) * 0.45 * l - Math.sin(a) * s, z = AZ + Math.sin(a) * 2.5 + Math.sin(a) * 0.45 * l + Math.cos(a) * s;
            pr.set(Math.round(x), Math.round(ay + 3 + h), Math.round(z), Math.abs(s) > wd - 0.8 || l > 10 ? B.petalLt : B.petal);
          }
        }
        petals.push([nm, a]);
      }
      lights.push({ name: 'aeonia', p: [AX + 0.5, AF + 8, AZ + 0.5], c: '#ff5a3a', i: 0.05, d: 50, flicker: 0.15, srcR: 30 });
      acts.push({
        name: '진홍 아에오니아', hint: '물 한가운데서 거대한 붉은 꽃이 솟아 활짝 피고, 진홍 부패가 터져 번져요', hit: [AX - 4, AF - 1, AZ - 4, AX + 4, AF + 3, AZ + 4],
        run: async a => {
          a.flash('aeonia', 20, 7); a.glow(1.6, 7);
          a.burst([AX + 0.5, AF + 1, AZ + 0.5], { n: 60, colors: ['#ff4a2a', '#ff9a6a', '#ffffff'], speed: 6, up: 3, life: 1.4, gravity: 3, spread: 4, flat: true });
          await Promise.all([a.tween('aeStem', { scl: [1, 1, 1] }, 0.9), ...petals.map(([nm]) => a.tween(nm, { scl: [1, 1, 1] }, 0.9))]);
          await Promise.all(petals.map(([nm, ang]) => a.turn(nm, [Math.sin(ang) * 1.05, 0, -Math.cos(ang) * 1.05], 1.4)));
          for (let k = 0; k < 6; k++) { a.burst([AX + 0.5, AF + 8, AZ + 0.5], { n: 60, colors: ['#ff4a2a', '#ff9a6a', '#ffd070'], speed: 8, up: 4, life: 2.6, gravity: 0.5, spread: 4 }); await a.wait(0.35); }
          for (let r = 4; r <= 28; r += 4) { for (let q = 0; q < 12; q++) { const t = q / 12 * TAU + r; a.burst([AX + 0.5 + Math.cos(t) * r, AF + 1, AZ + 0.5 + Math.sin(t) * r], { n: 6, colors: ['#ff6a4a', '#d8402a', '#ffb090'], speed: 1.4, up: 0.6, life: 2, gravity: -0.1, spread: 2, flat: true }); } await a.wait(0.15); }
          await Promise.all(petals.map(([nm]) => a.turn(nm, [0, 0, 0], 1.2)));
          await Promise.all([a.tween('aeStem', { scl: [0, 0, 0] }, 0.8), ...petals.map(([nm]) => a.tween(nm, { scl: [0, 0, 0] }, 0.8))]);
        },
      });

      // ══ 4. 부패의 여신(2단계, 부품): 의자 앞에서 진홍 부패의 날개가 펼쳐지고 나비가 흩어진다 ══
      const GX = KX - 18, GZ = KZ + 12, gg = gAt(GX, GZ), GY = gg + 12;
      const wingsP = w.prop({ name: 'wings', pivot: [GX + 0.5, GY, GZ + 0.5], scl0: [0, 0, 0], clipOK: 60 });
      for (const s of [-1, 1]) for (let u = 1; u <= 20; u++) {
        const top = Math.sin(u / 20 * Math.PI * 0.9) * 9 + 3 - u * 0.15, bot = -Math.sin(u / 20 * Math.PI) * 7 - 1;
        for (let v = bot; v <= top; v += 0.7) {
          const hh2 = hash3(u * s + 40, Math.round(v * 3), 7);
          if (hh2 < 0.25 + u / 60) continue;
          const x = Math.round(GX + s * u * 0.72), z = Math.round(GZ - s * u * 0.68 + 2), y = Math.round(GY + v + u * 0.25);
          wingsP.set(x, y, z, hh2 > 0.9 ? B.wingLt : (v > top - 1.5 || hh2 > 0.75 ? B.petalLt : B.wing));
        }
      }
      wingsP.cyl(GX, GZ, gg + 1, GY + 1, 1.2, B.rot);
      lights.push({ name: 'goddess', p: [GX + 0.5, GY + 2, GZ + 0.5], c: '#ff5a3a', i: 0.04, d: 46, flicker: 0.2, srcR: 24 });
      acts.push({
        name: '부패의 여신', hint: '의자 앞에서 진홍 부패의 기둥이 솟고 거대한 꽃잎 날개가 펼쳐지며 나비가 흩어져요(2단계)', hit: [GX - 3, gg, GZ - 3, GX + 3, gg + 3, GZ + 3],
        run: async a => {
          a.flash('goddess', 22, 6); a.glow(1.5, 6);
          for (let k = 0; k < 10; k++) { a.burst([GX + 0.5, gg + 1 + k * 1.4, GZ + 0.5], { n: 20, colors: ['#ff4a2a', '#ff9a6a', '#ffd070'], speed: 1.2, up: 6, life: 1.4, gravity: -0.3, spread: 1 }); await a.wait(0.06); }
          await a.tween('wings', { scl: [1, 1, 1] }, 1.2);
          for (let k = 0; k < 8; k++) { a.burst([GX + 0.5 + (k % 2 ? 10 : -10), GY + 4, GZ + 0.5 + (k % 2 ? -8 : 8)], { n: 30, colors: ['#ff6a4a', '#ffb090', '#1a1416', '#ffffff'], speed: 3, up: 2, life: 2.4, gravity: -0.2, spread: 6 }); await a.wait(0.3); }
          await a.wait(0.6);
          await a.tween('wings', { scl: [0, 0, 0] }, 1);
        },
      });

      // ══ 5. 말레니아의 꽃과 축복(서쪽, 싸움 뒤): 붉은 꽃잎이 휘어 감긴 꽃 · 미켈라의 바늘 ══
      const MX = CX - 34, MZ = CZ - 2, mg = gAt(MX, MZ);
      for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) if (Math.hypot(dx, dz) < 6.5 && w.liq[MX + dx + W * (MZ + dz)] < 0) { MH.paint(w, MX + dx, MZ + dz, B.rotMoss); w.set(MX + dx, gAt(MX + dx, MZ + dz) + 1, MZ + dz, 0); }
      const bloomTips = [];
      for (let k = 0; k < 14; k++) {
        const a = k / 14 * TAU + (k % 2) * 0.2, L = 5 + (k % 3) * 1.5, ca = Math.cos(a), sa = Math.sin(a);
        const pts = [[MX + ca * 0.8, mg + 1, MZ + sa * 0.8], [MX + ca * L * 0.45, mg + 3 + L * 0.5, MZ + sa * L * 0.45], [MX + ca * L * 0.9, mg + 2 + L * 0.8, MZ + sa * L * 0.9], [MX + ca * L * 1.05, mg + 1 + L * 0.55, MZ + sa * L * 1.05]];
        LB.tube(w, pts, t => 1.2 - t * 0.6, (x, y, z, t) => t > 0.75 ? B.petalLt : B.petal);
        bloomTips.push(pts[2]);
      }
      w.sphere(MX, mg + 2, MZ, 1.6, B.core);
      const mgp = LB.grace(w, MX + 5, gAt(MX + 5, MZ + 6), MZ + 6, B.grace);
      lights.push({ name: 'grace2', p: mgp, c: '#ffe08a', i: 0.8, d: 10, flicker: 0.1 });
      lights.push({ name: 'bloom', p: [MX + 0.5, mg + 4, MZ + 0.5], c: '#ff6a4a', i: 0.35, d: 18, flicker: 0.2, srcR: 5 });
      acts.push({
        name: '말레니아의 꽃', hint: '싸움이 끝난 자리에 남은 진홍 꽃이 빛나며 꽃잎마다 부패의 홀씨가 피어오르고, 곁에 축복이 피어나요', hit: [MX - 4, mg, MZ - 4, MX + 4, mg + 8, MZ + 4],
        run: async a => {
          a.flash('bloom', 6, 4); a.flash('grace2', 4, 4);
          for (let q = 0; q < 3; q++) { for (const p of bloomTips) a.burst([p[0] + 0.5, p[1] + 0.5, p[2] + 0.5], { n: 6, colors: ['#ff5a3a', '#ff9a6a', '#ffd070'], speed: 0.6, up: 2.4, life: 2, gravity: -0.3, spread: 0.6 }); await a.wait(0.6); }
          a.burst(mgp, { n: 40, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 2, up: 3, life: 1.6, gravity: -0.6, spread: 1.2 });
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '말레니아의 꽃', note: '싸움 뒤 남는 꽃 · 부패의 여신 말레니아 축복', p: [MX + 0.5, mg + 18, MZ + 0.5] });

      // ══ 6. 흰 꽃밭의 물결: 물가를 걸으면 물결과 흰 꽃잎이 번진다 ══
      const RX = CX + 16, RZ = CZ + 22;
      acts.push({
        name: '흰 꽃과 얕은 물', hint: '발목까지 차는 얕은 물에 동그란 물결이 번지고, 물가의 하얀 꽃잎이 날려 물 위에 떠요', hit: [RX - 3, AF - 1, RZ - 3, RX + 3, AF + 2, RZ + 3],
        run: async a => {
          for (let r = 2; r <= 20; r += 2) { for (let q = 0; q < 20; q++) { const t = q / 20 * TAU; a.burst([RX + 0.5 + Math.cos(t) * r * 0.7, AF + 0.6, RZ + 0.5 + Math.sin(t) * r * 0.7], { n: 3, colors: ['#eef8f4', '#cfe8ec', '#ffffff'], speed: 0.4, up: 0.6, life: 0.8, gravity: 1, spread: 0.3 }); } await a.wait(0.14); }
          a.wind(1.6, 3);
          a.burst([RX + 0.5, AF + 3, RZ + 0.5], { n: 80, colors: ['#ffffff', '#f2f0e8', '#d8d0e0'], speed: 3, up: 2, life: 3, gravity: 0.4, spread: 8 });
          await a.wait(1.2);
        },
      });

      // ══ 동쪽: 안개문 · 계단 · 납골당(성수 뿌리 축복) ══
      // 안개문: 뿌리 벽에 끼운 돌 아치
      for (let z = SZ - 7; z <= SZ + 7; z++) for (let x = FX - 2; x <= FX + 1; x++) for (let y = AF - 2; y <= AF + 16; y++) w.set(x, y, z, (y + (z & 1)) % 4 ? B.stone : B.stoneDk);
      LB.arch(w, { axis: 'z', c: FX - 2, u0: SZ, y0: AF + 1, a: 4, h: 11, kind: 'pointed', fill: 0, frame: B.trim, depth: 4 });
      for (let z = SZ - 4; z <= SZ + 4; z++) for (let y = AF + 1; y <= AF + 11; y++) if (LB.inArch(z - SZ, y - AF - 1, 4, 11, 'pointed')) for (const fx of [FX - 2, FX + 1]) if (hash3(z, y, 21 + fx) > 0.45) w.set(fx, y, z, B.fogG);
      lights.push({ name: 'fog', p: [FX - 1.5, AF + 5, SZ + 0.5], c: '#eef4f8', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '계단 아래 뿌리 벽에 낸 돌 아치의 안개가 일렁여요. 지나면 말레니아의 방이에요', hit: [FX - 3, AF + 1, SZ - 4, FX + 2, AF + 11, SZ + 4],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([FX + 2.5, AF + 2 + k, SZ + 0.5], { n: 22, colors: ['#eef4f8', '#ffffff', '#c8d8e4'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 5, flat: true }); await a.wait(0.18); } },
      });
      // 계단: 서쪽 안개문(아래)에서 동쪽 납골당(위)으로
      MH.flight(w, { name: '뿌리 계단', axis: 'x', c: SZ, half: 5, a: ST0, b: ST1, ha: AF, hb: LD, step: B.pave, edge: B.trim, fill: B.stone, rail: B.stoneDk, post: B.stone, postGap: 4 });
      for (let x = ST0; x <= ST1; x++) for (const z of [SZ - 7, SZ + 7]) { const g = MH.g(w, x, SZ); for (let y = AF - 2; y <= g + 3; y++) w.set(x, y, z, y > g ? B.stoneDk : B.stone); }
      // 납골당 벽: 북·동쪽은 높고 아치 무늬, 남쪽은 낮게(시점 쪽)
      for (let x = HX0; x <= HX1; x++) for (let z = HZ0; z <= HZ1; z++) {
        const edge = x === HX0 || x === HX1 || z === HZ0 || z === HZ1; if (!edge) continue;
        if (x === HX0 && Math.abs(z - SZ) <= 5) continue;                          // 계단 입구
        const tall = z === HZ0 || x === HX1, top = tall ? LD + 18 : LD + 3;
        for (let y = AF - 2; y <= top; y++) w.set(x, y, z, y <= LD ? B.stone : (y === top ? B.trim : ((x + z) % 6 === 0 ? B.stoneDk : B.stone)));
      }
      for (let u = HX0 + 4; u <= HX1 - 4; u += 6) LB.arch(w, { axis: 'x', c: HZ0, u0: u, y0: LD + 2, a: 2, h: 11, kind: 'pointed', fill: B.stoneDk, frame: B.trim });
      for (let u = HZ0 + 4; u <= HZ1 - 4; u += 6) LB.arch(w, { axis: 'z', c: HX1, u0: u, y0: LD + 2, a: 2, h: 11, kind: 'pointed', fill: B.stoneDk, frame: B.trim });
      // 기둥과 뿌리: 기둥 두 줄, 천장을 뚫고 내려온 뿌리가 감긴다
      const cols = [];
      for (const cz of [HZ0 + 9, HZ1 - 9]) for (let cx = HX0 + 9; cx <= HX1 - 6; cx += 9) { w.box(cx - 1, LD + 1, cz - 1, cx + 1, LD + 14, cz + 1, B.stone); w.box(cx - 1, LD + 1, cz - 1, cx + 1, LD + 1, cz + 1, B.trim); w.box(cx - 1, LD + 14, cz - 1, cx + 1, LD + 14, cz + 1, B.trim); cols.push([cx, cz]); }
      cols.forEach(([cx, cz], k) => { if (k % 2) return; LB.tube(w, [[cx + 2, LD + 26, cz - 3], [cx + 2, LD + 12, cz + 1], [cx + 3, LD + 4, cz + 2], [cx + 6, LD + 0.5, cz + 4]], t => 1.4 - t * 0.6, (x, y, z, t, dy) => dy > 0 ? B.root : B.rootDk); });
      // 바닥 무덤 석판(나무 부조)과 돌 관, 촛불 무더기
      const candles = [];
      const slab = (x0, z0) => {
        for (let x = x0; x <= x0 + 3; x++) for (let z = z0; z <= z0 + 6; z++) w.set(x, LD, z, (x === x0 || x === x0 + 3 || z === z0 || z === z0 + 6) ? B.trim : (((x - x0 === 1 || x - x0 === 2) && z - z0 > 1) || (z - z0 === 2) ? B.relief : B.slab));
      };
      [[152, 76], [160, 90], [168, 76], [176, 90]].forEach(([x, z]) => slab(x, z));
      const coffin = (x, z) => { w.box(x, LD + 1, z, x + 2, LD + 2, z + 5, B.coffin); w.box(x, LD + 3, z + 1, x + 2, LD + 3, z + 4, B.wax); w.set(x + 1, LD + 4, z + 1, B.coffin); };
      coffin(172, 70); coffin(156, 95);
      const candleAt = (x, z) => { const g = MH.g(w, x, z); w.set(x, g + 1, z, B.wax); w.set(x, g + 2, z, B.candle); candles.push([x, g + 2, z]); };
      [[150, 78], [151, 80], [158, 94], [165, 74], [170, 96], [176, 74], [180, 92], [163, 86], [149, 90], [174, 84]].forEach(([x, z]) => candleAt(x, z));
      lights.push({ name: 'crypt', p: [165.5, LD + 3, 84.5], c: '#ffc070', i: 0.5, d: 30, flicker: 0.3, srcR: 10 });
      acts.push({
        name: '납골당의 촛불', hint: '성수 뿌리 납골당의 무덤 석판 곁 촛불이 하나씩 타오르고 관 위의 뿌리가 드러나요', hit: [161, LD, 83, 166, LD + 3, 88],
        run: async a => { a.flash('crypt', 3, 4); for (const c of candles) { a.burst([c[0] + 0.5, c[1] + 0.8, c[2] + 0.5], { n: 14, colors: ['#fff0c0', '#ffd070', '#ffffff'], speed: 0.6, up: 2.5, life: 1.2, gravity: -0.6, spread: 0.4 }); await a.wait(0.18); } },
      });
      // 축복: 계단 꼭대기
      const gp = LB.grace(w, ST1 + 3, LD, SZ + 3, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      acts.push(LB.graceAct({ name: '성수 뿌리 축복', at: gp, to: [KX + 0.5, kg + 4, KZ + 0.5], arc: 22, steps: 30, hint: '계단 꼭대기 성수 뿌리 축복이 안개문 너머 거목 밑동의 돌 의자를 가리켜요' }));
      landmarks.push({ name: '성수 뿌리', note: '계단 위 납골당의 축복', p: [gp[0], gp[1] + 16, gp[2]] });
      // 승강기(에브레펠 위로) 와 이정표
      const LX = HX1 - 5, LZ = HZ0 + 6;
      for (let y = LD + 1; y <= LD + 30; y++) for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) w.set(LX + dx, y, LZ + dz, B.iron);
      w.box(LX - 2, LD + 1, LZ - 2, LX + 2, LD + 1, LZ + 2, B.stoneDk); w.box(LX - 3, LD + 30, LZ - 3, LX + 3, LD + 30, LZ + 3, B.iron);
      {
        const sx = LX - 6, sz = LZ + 8, sp = OR.signpost(w, B, sx, sz, { dir: [0, -1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '미켈라의 성수로', goto: 'elphael-sub', hint: '납골당 승강기를 타고 에브레펠을 거슬러 올라, 거대한 가지 위 성수 마을 광장으로 가요' }));
        landmarks.push({ name: '승강기', note: '에브레펠 · 미켈라의 성수로', p: [LX + 0.5, LD + 36, LZ + 0.5] });
      }
      return { lights, landmarks, acts };
    },
  });
})();
