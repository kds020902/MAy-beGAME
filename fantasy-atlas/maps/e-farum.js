// 무너지는 파름 아즈라 · 말리케스의 결투장 — 대교 옆 축복에서 계단을 오르면, 깊은 구덩이로 둘러싸인 둥근 결투장 (메인 보스: 흑검 말리케스)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 160;
  const RX = 84, RZ = 80;                                   // 원형 결투장 한가운데
  MAPS.push({
    id: 'farum', cat: 'lands', name: '무너지는 파름 아즈라', en: 'Crumbling Farum Azula · Maliketh', color: '#c8a870', seed: 947, base: 64, time: 'day', size: [W, D, Hh],
    desc: '대교 옆 축복에서 계단을 오르면, 시간 너머의 폭풍 한가운데 깊은 구덩이에 둘러싸인 둥근 결투장이 나온다. 짧은 다리를 건너면 죽음의 룬을 지키는 흑검 말리케스가 기다린다.',
    monsters: { normal: ['파름 아즈라의 수인', '땅 잃은 기사', '파름 아즈라의 용'], mid: '용나무 파수병', boss: '흑검 말리케스' },
    sky: ['#d8c098', '#4e4e5a', '#ffe6b0'], stars: false,
    hemi: ['#fff0d8', '#4a4236', 0.64], sun: ['#fff0d0', 0.74, [0.4, 1, 0.55]],
    night: { sky: ['#8a7458', '#24242e', '#e8c890'], stars: true, hemi: ['#e0d0b8', '#2a241c', 0.52], sun: ['#ffe8c8', 0.52, [0.4, 1, 0.55]], haze: '#5a5040' },
    liquid: ['#6a7a88', '#9ab0c0', '#e8f4ff'], liqSpeed: 0.4,
    fog: { start: 0.8, floor: 40, depth: 18, haze: [56, 0.28, 14], hazeColor: '#c8b494', top: 148, topDepth: 12 },
    camY: 8, zoom: 1.25,
    particles: [
      { n: 620, colors: ['#a49a8c', '#c8bea8', '#7e786e', '#e8dcc0'], mode: 'vortex', center: [RX, RZ], r0: 56, r1: 94, rise: 1.6, spin: 0.45, jit: 4, y0: 22, y1: 152, glow: false },
      { n: 280, colors: ['#8a8070', '#b0a690'], mode: 'vortex', center: [RX, RZ], r0: 64, r1: 100, rise: 0.5, spin: 0.2, jit: 6, y0: 30, y1: 130, glow: false, size: 2 },
      { n: 220, colors: ['#e8dcc0', '#c8b494'], mode: 'drift', speed: 0.7, wind: 1.2, y0: 50, y1: 140, glow: false },
    ],
    blocks: {
      rock: { c: '#8a7e6c', v: 0.07, pat: 'big' }, rockDk: { c: '#665c4e', v: 0.07, pat: 'stone' }, soil: { c: '#7a6c58', top: '#a2926e', v: 0.08 }, grassD: { c: '#7a6c58', top: '#b0a272', v: 0.1 },
      stone: { c: '#c6b69a', v: 0.05, pat: 'brick' }, stoneDk: { c: '#9c8c72', v: 0.05, pat: 'brick' }, trim: { c: '#e0d4b8', v: 0.03 }, pave: { c: '#b4a484', top: '#c8b898', v: 0.05, pat: 'check', alt: '#bcac8c' },
      floorA: { c: '#4a443e', top: '#5a524a', v: 0.05 }, floorB: { c: '#3e3832', top: '#4c4540', v: 0.05 }, floorL: { c: '#6e6456', top: '#857868', v: 0.04 }, gold: { c: '#c8a860', v: 0.05 },
      roof: { c: '#7e6e5a', v: 0.05, pat: 'tile' }, statue: { c: '#8e867a', v: 0.06, pat: 'stone' }, statueDk: { c: '#6e665c', v: 0.06 },
      cloud: { c: '#9e968a', v: 0.08 }, cloud2: { c: '#c4bcac', v: 0.06 }, cloudDk: { c: '#6e6a62', v: 0.08 },
      bolt: { c: '#fff4c8', glow: true }, bolt2: { c: '#ffd060', glow: true },
      drag: { c: '#5c5a5c', v: 0.08, pat: 'stone' }, dragB: { c: '#7c7268', v: 0.07 }, dragW: { c: '#4a4644', v: 0.09 }, dragBone: { c: '#8e867c', v: 0.06 }, dragEye: { c: '#ffb040', glow: true },
      dflame: { c: '#d0201a', glow: true }, dflame2: { c: '#ff5a3a', glow: true }, blade: { c: '#1c1416', v: 0.03 }, bladeEdge: { c: '#ff3a2a', glow: true }, dark: { c: '#1c1012', v: 0.03 },
      win: { c: '#ffd890', night: true, day: '#4a4440' }, glass: { c: '#ffe0a0', glow: true }, candle: { c: '#ffd8a8', glow: true }, wax: { c: '#e8dcc8', v: 0.03 },
      grace: { c: '#ffe9a0', glow: true }, fogG: { c: '#fff0c8', glow: true }, iron: { c: '#3a3634', v: 0.03 }, wood: { c: '#5e4a36', v: 0.06, pat: 'plank' },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, AF = base, TAU = Math.PI * 2;
      w.hm = new Int16Array(W * D); w.slope = new Float32Array(W * D);   // 땅이 없다: 하늘에 뜬 덩어리만 짓는다
      const lights = [], acts = [], landmarks = [];
      const RP = 30, RW0 = 40, RW1 = 46;                     // 결투장 반지름 · 구덩이 바깥 · 바깥벽 끝
      const camA = Math.atan2(0.73, 0.68), backF = th => 0.5 - 0.5 * Math.cos(th - camA);
      const ca = Math.cos(camA), sa = Math.sin(camA);
      const isl = (x, y, z, rx, rz, dep, salt) => LB.island(w, x, y, z, rx, rz, dep, { rock: B.rock, under: B.rockDk, soil: B.soil, salt, rough: 0.4, top: (xx, zz) => hash3(xx, 1, zz) > 0.7 ? B.grassD : B.soil });
      // 한 칸 기둥: bot~top을 바위로 채우고 윗면을 깐다
      const col = (x, z, top, bot, topB) => {
        if (x < 0 || z < 0 || x >= W || z >= D) return;
        for (let y = bot; y < top; y++) w.set(x, y, z, top - y < 3 ? B.stoneDk : ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock));
        w.set(x, top, z, topB);
        const i = x + W * z; if (top > w.hm[i]) w.hm[i] = top;
      };
      // 결투장 바닥: 어두운 돌에 금빛 동심원과 방사선, 가운데 문장
      const floorB = (r, th) => {
        if (r < 2.2) return B.gold;
        if (r < 3.4) return B.dark;
        for (const rr of [8, 16, 24]) if (Math.abs(r - rr) < 0.55) return B.gold;
        if (r > RP - 1.2) return B.floorL;
        if (r > 4 && r < 24 && Math.abs(Math.sin(th * 8)) < 0.045 * (14 / r)) return B.gold;
        return ((Math.floor((th + Math.PI) / (TAU / 32)) + Math.floor(r / 4)) & 1) ? B.floorA : B.floorB;
      };

      // ── 원형 결투장, 둘레 구덩이, 바깥 턱과 벽 ──
      for (let z = RZ - RW1 - 3; z <= RZ + RW1 + 3; z++) for (let x = RX - RW1 - 3; x <= RX + RW1 + 3; x++) {
        const dx = x - RX, dz = z - RZ, r = Math.hypot(dx, dz), th = Math.atan2(dz, dx);
        if (r <= RP) col(x, z, AF, Math.round(AF - 34 + Math.pow(r / RP, 2) * 20 + n.fbm(x * 0.1, z * 0.1, 2) * 5), floorB(r, th));
        else if (r > RW0 && r <= RW1 + 1.5) col(x, z, AF, Math.round(AF - 24 + n.fbm(x * 0.1, z * 0.1, 2) * 6 + (r - RW0) * 0.8), r < RW0 + 2 ? B.pave : B.stoneDk);
      }
      // 구덩이 둘레 테두리(결투장 끝)
      for (let k = 0; k < 600; k++) { const a = k / 600 * TAU; w.set(Math.round(RX + Math.cos(a) * (RP + 0.2)), AF, Math.round(RZ + Math.sin(a) * (RP + 0.2)), B.trim); }
      // 짧은 다리: 바깥 문에서 결투장으로(구덩이를 건넌다)
      const onBridge = (x, z) => { const dx = x - RX, dz = z - RZ, al = dx * ca + dz * sa, ac = -dx * sa + dz * ca; return al > RP - 2 && al < RW0 + 3 && Math.abs(ac) <= 3.2; };
      for (let z = RZ; z <= RZ + RW1; z++) for (let x = RX; x <= RX + RW1; x++) if (onBridge(x, z)) {
        const ac = Math.abs(-(x - RX) * sa + (z - RZ) * ca);
        col(x, z, AF, AF - 4, B.pave);
        if (ac > 2.5) w.set(x, AF + 1, z, (x + z) % 3 ? B.stone : B.trim);
      }
      // 바깥 벽: 시점 쪽은 무너져 낮고 맞은편은 높다. 안쪽 면에 두 단 아치(아래는 벽감, 위는 창)와 벽기둥
      const wallTop = th => AF + 8 + 28 * Math.pow(backF(th), 1.3) + n.fbm(th * 6 + 2, 1.3, 2) * 7;
      const AW = 14, candles = [];
      for (let z = RZ - RW1 - 1; z <= RZ + RW1 + 1; z++) for (let x = RX - RW1 - 1; x <= RX + RW1 + 1; x++) {
        const dx = x - RX, dz = z - RZ, r = Math.hypot(dx, dz); if (r < RW0 + 1.6 || r > RW1) continue;
        const th = Math.atan2(dz, dx), u = th * 44, uc = Math.round(u / AW) * AW, du = u - uc;
        const dth = Math.abs(((th - camA + Math.PI * 3) % TAU) - Math.PI);       // 입구 방향에서 벌어진 각
        let top = Math.round(wallTop(th));
        if (dth < 0.17) top = Math.max(top, AF + 22);                               // 입구 문틀
        const pil = Math.abs(Math.abs(du) - AW / 2) < 1;
        if (r < RW0 + 2.4 && !pil) continue;                                        // 벽기둥만 한 칸 안으로 나온다
        for (let y = AF + 1; y <= top; y++) {
          let b = (y - AF) % 8 === 0 ? B.trim : (pil ? B.trim : B.stone);
          if (!pil && r < 43.6) {
            if (LB.inArch(du, y - AF - 1, 3.2, 11, 'round')) b = r < 42.9 ? 0 : B.dark;
            else if (LB.inArch(du, y - AF - 16, 2.2, 9, 'round')) b = B.win;
          }
          if (dth < 0.1 && y <= AF + 15) b = 0;                                       // 입구
          if (b) w.set(x, y, z, b);
        }
      }
      LB.crumble(w, RX - RW1, AF + 6, RZ - RW1, RX + RW1, AF + 40, RZ + RW1, 0.12, 2, 7);
      // 벽감 앞 바깥 턱마다 촛불
      for (let uc = -Math.PI * 44; uc < Math.PI * 44; uc += AW) {
        const th = Math.round(uc / AW) * AW / 44, dth = Math.abs(((th - camA + Math.PI * 3) % TAU) - Math.PI);
        if (dth < 1.6 || dth > Math.PI - 0.25) continue;               // 시점 맞은편 절반에만
        const x = Math.round(RX + Math.cos(th) * 41), z = Math.round(RZ + Math.sin(th) * 41);
        w.set(x, AF + 1, z, B.wax); w.set(x, AF + 2, z, B.candle); candles.push([x, z]);
      }
      lights.push({ name: 'candles', p: [RX - 30.5, AF + 4, RZ - 30.5], c: '#ffc070', i: 0.35, d: 30, flicker: 0.4, srcR: 18 });
      lights.push({ name: 'candles', p: [RX + 30.5, AF + 4, RZ - 30.5], c: '#ffc070', i: 0.35, d: 30, flicker: 0.4, srcR: 18 });
      acts.push({
        name: '벽감의 촛불', hint: '구덩이 너머 벽감마다 촛불이 차례로 타올라요', hit: [RX - 33, AF + 1, RZ - 33, RX - 28, AF + 6, RZ - 28],
        run: async a => { a.flash('candles', 4, 4.6); for (const [x, z] of candles.slice().sort((p, q) => Math.atan2(p[1] - RZ, p[0] - RX) - Math.atan2(q[1] - RZ, q[0] - RX))) { a.burst([x + 0.5, AF + 3, z + 0.5], { n: 12, colors: ['#ffd8a8', '#ffb070'], speed: 0.8, up: 4, life: 1, gravity: -0.4, spread: 0.4 }); await a.wait(0.12); } },
      });
      // 부서진 돔 갈빗대: 맞은편 벽 위에서 결투장 쪽으로 뻗다가 끊겼다
      for (let k = 0; k < 4; k++) {
        const th = camA + Math.PI + (k - 1.5) * 0.42, x0 = RX + Math.cos(th) * 44, z0 = RZ + Math.sin(th) * 44, y0 = wallTop(th) - 1, f = 0.42 + (k % 2) * 0.16;
        LB.tube(w, [[x0, y0, z0], [RX + Math.cos(th) * 44 * (1 - f * 0.5), y0 + 9, RZ + Math.sin(th) * 44 * (1 - f * 0.5)], [RX + Math.cos(th) * 44 * (1 - f), y0 + 12, RZ + Math.sin(th) * 44 * (1 - f)]], t => 2 - t * 0.6, (x, y, z, t, dy) => dy > 0 ? B.trim : B.stone);
      }

      // ── 결투장 기둥: 둘레에 열 개, 몇은 부러졌다(투사체를 막는 엄폐물) ──
      const pillars = [];
      for (let k = 0; k < 10; k++) {
        const th = camA + (k + 0.5) / 10 * TAU, x = Math.round(RX + Math.cos(th) * 24), z = Math.round(RZ + Math.sin(th) * 24), h = [20, 13, 20, 20, 9, 20, 20, 15, 20, 20][k];
        w.cyl(x, z, AF + 1, AF + 2, 2.6, B.stoneDk);
        for (let y = AF + 3; y < AF + 3 + h; y++) w.cyl(x, z, y, y, 1.8, (y - AF) % 6 === 0 ? B.trim : B.stone);
        if (h >= 20) { w.cyl(x, z, AF + 3 + h, AF + 4 + h, 2.6, B.trim); w.set(x, AF + 5 + h, z, B.gold); }
        else LB.crumble(w, x - 2, AF + h - 1, z - 2, x + 2, AF + h + 3, z + 2, 0.4, 2, k);
        pillars.push([x, z, AF + 3 + h]);
      }
      // 쓰러진 기둥 토막
      LB.tube(w, [[RX - 12, AF + 2.4, RZ + 14], [RX - 4, AF + 2.4, RZ + 19]], 1.8, B.stone);

      // ── 흑검과 운명의 죽음 ──
      const bladeP = w.prop({ name: 'blade', pivot: [RX + 0.5, AF + 1, RZ + 0.5], scl0: [0, 0, 0], clipOK: 10 });
      for (let y = 0; y < 26; y++) {
        const wd = y < 4 ? 0 : (y < 22 ? 1 : (y < 25 ? 0.5 : 0));
        for (let s = -1; s <= 1; s++) if (Math.abs(s) <= wd) bladeP.set(RX + s, AF + 1 + y, RZ, Math.abs(s) === 1 && y > 4 ? B.bladeEdge : B.blade);
      }
      bladeP.box(RX - 3, AF + 4, RZ, RX + 3, AF + 4, RZ, B.blade); bladeP.box(RX, AF + 1, RZ, RX, AF + 3, RZ, B.gold);
      lights.push({ name: 'death', p: [RX + 0.5, AF + 8, RZ + 0.5], c: '#ff3020', i: 0.05, d: 60, flicker: 0.3, srcR: 30 });
      acts.push({
        name: '흑검', hint: '결투장 한가운데 문장에서 붉은 날을 두른 흑검이 솟아올라요', hit: [RX - 2, AF, RZ - 2, RX + 2, AF + 2, RZ + 2],
        run: async a => {
          a.flash('death', 14, 5); a.glow(1.5, 5);
          await a.tween('blade', { scl: [1, 1, 1] }, 1.2);
          for (let k = 0; k < 6; k++) { a.burst([RX + 0.5, AF + 6 + k * 3, RZ + 0.5], { n: 20, colors: ['#ff3a2a', '#1c1416', '#ff8a5a'], speed: 2, up: 3, life: 1.4, gravity: -0.2, spread: 1.4 }); await a.wait(0.3); }
          await a.wait(1); await a.tween('blade', { scl: [0, 0, 0] }, 1);
        },
      });
      acts.push({
        name: '운명의 죽음', hint: '봉인되었던 운명의 죽음이 검붉은 불꽃의 고리가 되어 결투장에 번져요', hit: [RX + 6, AF, RZ - 4, RX + 10, AF + 2, RZ],
        run: async a => {
          a.flash('death', 18, 4.4); a.glow(1.6, 4.4);
          for (let r = 4; r <= RP; r += 3) { for (let q = 0; q < 18; q++) { const t = q / 18 * TAU + r * 0.2; a.burst([RX + 0.5 + Math.cos(t) * r, AF + 1.5, RZ + 0.5 + Math.sin(t) * r], { n: 7, colors: ['#d0201a', '#1c1012', '#ff5a3a'], speed: 1.2, up: 4, life: 1.1, gravity: -0.6, spread: 0.8 }); } await a.wait(0.18); }
          await a.wait(0.8);
        },
      });
      landmarks.push({ name: '말리케스의 결투장', note: '보스 · 흑검 말리케스', p: [RX + 0.5, AF + 30, RZ + 0.5], boss: true });

      // ── 맞은편의 거대한 문(부품 문짝 둘) — 열리면 금빛이 쏟아진다 ──
      const bth = camA + Math.PI, bx = Math.cos(bth), bz = Math.sin(bth), DX = Math.round(RX + bx * 44), DZ = Math.round(RZ + bz * 44);
      // 문 자리를 뚫고 뒤를 금빛으로
      for (let r = 41; r <= 47; r += 0.5) for (let s = -6.5; s <= 6.5; s += 0.5) {
        const x = Math.round(RX + bx * r - bz * s), z = Math.round(RZ + bz * r + bx * s);
        for (let y = AF + 1; y <= AF + 23; y++) if (LB.inArch(s, y - AF - 1, 6, 22, 'round')) w.set(x, y, z, r >= 46 ? B.glass : 0);
      }
      const doorL = w.prop({ name: 'doorL', pivot: [RX + bx * 42.5 - bz * 6, AF + 1, RZ + bz * 42.5 + bx * 6] }), doorR = w.prop({ name: 'doorR', pivot: [RX + bx * 42.5 + bz * 6, AF + 1, RZ + bz * 42.5 - bx * 6] });
      for (let s = -6; s <= 6; s += 0.5) for (let y = AF + 1; y <= AF + 22; y++) {
        if (!LB.inArch(s, y - AF - 1, 6, 22, 'round')) continue;
        const x = Math.round(RX + bx * 42.5 - bz * s), z = Math.round(RZ + bz * 42.5 + bx * s);
        (s < 0 ? doorL : doorR).set(x, y, z, (y - AF) % 6 === 0 || Math.abs(Math.abs(s) - 3) < 0.3 ? B.gold : B.wood);
      }
      lights.push({ name: 'door', p: [RX + bx * 47 + 0.5, AF + 10, RZ + bz * 47 + 0.5], c: '#ffd890', i: 0.4, d: 40, flicker: 0.05, srcR: 6 });
      acts.push({
        name: '거대한 문', hint: '결투장 맞은편 거대한 문이 열리며 금빛이 쏟아져 들어와요', hit: [DX - 4, AF + 1, DZ - 4, DX + 4, AF + 20, DZ + 4],
        run: async a => {
          a.flash('door', 6, 5.4);
          await Promise.all([a.turn('doorL', [0, 1.3, 0], 2), a.turn('doorR', [0, -1.3, 0], 2)]);
          for (let k = 0; k < 6; k++) { a.burst([RX + bx * 41 + 0.5, AF + 4 + k * 2, RZ + bz * 41 + 0.5], { n: 26, colors: ['#ffe9a0', '#fff6d0', '#ffd060'], speed: 3, up: 1, life: 2, gravity: -0.2, spread: 4, flat: true }); await a.wait(0.25); }
          await a.wait(1.2);
          await Promise.all([a.turn('doorL', [0, 0, 0], 1.8), a.turn('doorR', [0, 0, 0], 1.8)]);
        },
      });

      // ── 입구: 안개문, 어두운 통로, 대교 옆 축복 테라스, 대교로 내려가는 계단 ──
      const gx0 = RX + ca * 44, gz0 = RZ + sa * 44;
      for (let s = -3; s <= 3; s++) for (let y = AF + 1; y <= AF + 12; y++) { const x = Math.round(gx0 - sa * s), z = Math.round(gz0 + ca * s); if (hash3(x, y, z) > 0.6) w.set(x, y, z, B.fogG); }
      lights.push({ name: 'fog', p: [gx0 + ca * 3, AF + 6, gz0 + sa * 3], c: '#fff0c8', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '결투장 입구를 막은 금빛 안개가 일렁이며 흩날려요', hit: [Math.round(gx0) - 3, AF + 1, Math.round(gz0) - 3, Math.round(gx0) + 3, AF + 12, Math.round(gz0) + 3],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([gx0 + 0.5, AF + 2 + k * 1.3, gz0 + 0.5], { n: 22, colors: ['#fff0c8', '#ffffff', '#ffd060'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 4, flat: true }); await a.wait(0.18); } },
      });
      // 통로와 테라스
      const TPX = Math.round(RX + ca * 64), TPZ = Math.round(RZ + sa * 64);
      for (let z = RZ; z <= TPZ + 16; z++) for (let x = RX; x <= TPX + 16; x++) {
        const dx = x - RX, dz = z - RZ, al = dx * ca + dz * sa, ac = -dx * sa + dz * ca, dt = Math.hypot(x - TPX, z - TPZ);
        const corridor = al > RW1 - 1 && al < 64 && Math.abs(ac) <= 6;
        if (!corridor && dt > 13) continue;
        if (Math.hypot(dx, dz) <= RW1 + 1) continue;
        col(x, z, AF, Math.round(AF - 18 + Math.min(dt, 20) * 0.3 + n.fbm(x * 0.1, z * 0.1, 2) * 4), corridor && dt > 12 ? B.floorL : B.pave);
        if (corridor && Math.abs(ac) > 5 && dt > 12) { const h = 5 + (hash3(x, 3, z) * 6 | 0); w.box(x, AF + 1, z, x, AF + h, z, (al | 0) % 6 === 0 ? B.trim : B.stoneDk); }
      }
      LB.crumble(w, RX + 40, AF + 3, RZ + 40, TPX + 4, AF + 12, TPZ + 4, 0.25, 2, 11);
      const [grx, grz] = [TPX - 4, TPZ + 5], gp = LB.grace(w, grx, AF, grz, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      acts.push(LB.graceAct({ at: gp, to: [RX + 0.5, AF + 3, RZ + 0.5], arc: 18, steps: 28, hint: '대교 옆 축복이 통로 너머 결투장을 가리켜요' }));
      landmarks.push({ name: '대교 옆', note: '결투장으로 오르는 축복', p: [gp[0], gp[1] + 14, gp[2]] });
      // 대교: 테라스 남쪽에서 계단을 내려가 폭풍 속으로 휘어 나간다(난간, 아치 교각)
      const BY = AF - 6, S0 = TPZ + 12;
      for (let k = 0; k <= 7; k++) { const z = S0 + k, y = AF - Math.round(6 * k / 7); for (let x = TPX - 6; x <= TPX + 6; x++) col(x, z, y, y - 4, Math.abs(x - TPX) === 6 ? B.trim : B.pave); for (const x of [TPX - 6, TPX + 6]) w.set(x, y + 1, z, B.stone); }   // 떠 있는 계단(아래를 채우지 않는다)
      const bpts = [[TPX, S0 + 7], [TPX + 3, S0 + 22], [TPX + 10, S0 + 36], [TPX + 20, D + 6]];
      const BC = LB.curve(bpts.map(p => [p[0], 0, p[1]]), 0.5); let acc = 0;
      const bcell = new Map();
      BC.forEach((p, i) => {
        if (i) acc += Math.hypot(p[0] - BC[i - 1][0], p[2] - BC[i - 1][2]);
        for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) {
          const x = Math.round(p[0] + dx), z = Math.round(p[2] + dz), d = Math.hypot(x - p[0], z - p[2]); if (d > 6.2) continue;
          const k = x + 1000 * z, o = bcell.get(k); if (!o || d < o[0]) bcell.set(k, [d, acc]);
        }
      });
      for (const [k, [d, s]] of bcell) {
        const x = k % 1000, z = (k / 1000) | 0; if (x < 0 || z < 0 || x >= W || z >= D || MH.g(w, x, z) >= AF) continue;
        const fr = (s % 18) / 18, bot = BY - 3 - Math.round((1 - Math.sin(fr * Math.PI)) * 7);
        col(x, z, BY, bot, d > 5.2 ? B.trim : B.pave);
        if (d > 5.2) { w.set(x, BY + 1, z, B.stone); if (Math.round(s) % 6 === 0) { w.box(x, BY + 1, z, x, BY + 3, z, B.stoneDk); w.set(x, BY + 4, z, B.trim); } }
        if (fr < 0.08 || fr > 0.92) for (let y = BY - 40; y < bot; y++) w.set(x, y, z, (y % 6 === 0) ? B.trim : B.stoneDk);    // 교각
      }
      landmarks.push({ name: '대교', note: '폭풍 속으로 휘어 가는 큰 다리', p: [TPX + 6, BY + 14, S0 + 30] });

      // ── 시간 너머의 폭풍: 결투장을 둘러싼 회오리 구름띠(부품) ──
      // 시점 쪽을 가리지 않게 맞은편 절반에만 두르고, 돌지 않고 천천히 흔들린다
      const vortex = (name, r0, r1, y0, y1, salt) => {
        const pr = w.prop({ name, pivot: [RX + 0.5, base, RZ + 0.5], rock: 0.08, rockSpeed: 0.25, clipOK: 99999 });
        for (let y = y0; y <= y1; y += 2) {
          const t = (y - y0) / (y1 - y0), r = r0 + (r1 - r0) * Math.pow(t, 1.25);
          for (let k = 0; k < 7; k++) {
            const a0 = k * TAU / 7 + y * 0.07 + salt;
            for (let s = 0; s < 1.4; s += 0.04) {
              const a = a0 + s, rr = r + Math.sin(s * 3 + k) * 2.4 - s * 1.2;
              const x = Math.round(RX + Math.cos(a) * rr), z = Math.round(RZ + Math.sin(a) * rr);
              if (backF(a) < 0.62) continue;
              if (hash3(x, y, z) > 0.36) for (let q = 0; q < 2; q++) pr.set(x, y + q, z, hash3(x, y + 1, z) > 0.6 ? B.cloud2 : (s > 1 ? B.cloudDk : B.cloud));
            }
          }
        }
      };
      vortex('storm', 64, 82, base - 40, Hh - 8, 0);
      acts.push({
        name: '시간 너머의 폭풍', hint: '결투장을 둘러싼 폭풍이 거세게 휘몰아치며 하늘 곳곳에 번개가 쳐요', hit: [RX - 5, AF + 20, RZ - 46, RX + 5, AF + 34, RZ - 40],
        run: async a => { a.wind(3.2, 5.2); a.spin('storm', 5, 5.2); for (let k = 0; k < 6; k++) { a.lightning(0.6 + (k % 2) * 0.6); await a.wait(0.6 + (k % 3) * 0.25); } },
      });
      // 번개(부품, 평소엔 숨김): 폭풍에서 기둥 하나로
      const TT = [pillars[2][0] + 0.5, pillars[2][2] + 2, pillars[2][1] + 0.5];
      const bolt = w.prop({ name: 'bolt', pivot: TT, scl0: [0, 0, 0], clipOK: 400 });
      let prev = [RX - 30, Hh - 14, RZ - 60];
      for (let k = 1; k <= 10; k++) { const t = k / 10, p = LB.lerp3(prev, TT, k === 10 ? 1 : 0.16 + t * 0.1); if (k < 10) { p[0] += (hash3(k, 1, 4) - 0.5) * 8; p[1] += (hash3(k, 2, 4) - 0.5) * 6; p[2] += (hash3(k, 3, 4) - 0.5) * 8; } LB.tube(bolt, [prev, p], 0.55, k % 2 ? B.bolt : B.bolt2); prev = p; }
      lights.push({ name: 'strike', p: [TT[0], TT[1] + 1, TT[2]], c: '#fff0c0', i: 0.02, d: 60, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '낙뢰', hint: '폭풍에서 내리친 번개가 결투장 기둥에 떨어져요', hit: [Math.round(TT[0]) - 3, Math.round(TT[1]) - 12, Math.round(TT[2]) - 3, Math.round(TT[0]) + 3, Math.round(TT[1]), Math.round(TT[2]) + 3],
        run: async a => { for (let k = 0; k < 3; k++) { a.tween('bolt', { scl: [1, 1, 1] }, 0.04); a.lightning(1.2); a.flash('strike', 70, 0.25); a.burst(TT, { n: 50, colors: ['#fff4c8', '#ffd060', '#ffffff'], speed: 8, up: 3, life: 0.9, gravity: 4, spread: 2 }); await a.wait(0.2); await a.tween('bolt', { scl: [0, 0, 0] }, 0.05); await a.wait(0.5 + k * 0.2); } },
      });

      // ── 무너짐과 역행: 바깥 벽 한 토막이 구덩이로 떨어졌다가 시간을 거슬러 되붙는다(부품) ──
      const cth = camA + Math.PI * 0.62, chunks = [];
      for (let k = 0; k < 5; k++) {
        const nm = 'chunk' + k, th0 = cth + (k - 2) * 0.05, x = Math.round(RX + Math.cos(th0) * 44), z = Math.round(RZ + Math.sin(th0) * 44), top = Math.round(wallTop(th0)), y0 = top + 1;
        const pr = w.prop({ name: nm, pivot: [x + 0.5, y0 + 2, z + 0.5] });
        pr.box(x - 1, y0, z - 1, x + 1, y0 + 4 + (k % 2) * 2, z + 1, k % 2 ? B.stoneDk : B.stone); pr.set(x, y0 + 5 + (k % 2) * 2, z, B.trim);
        chunks.push([nm, x, y0, z]);
      }
      acts.push({
        name: '붕괴와 역행', hint: '바깥 벽 꼭대기가 구덩이로 무너져 내렸다가 시간을 거슬러 되돌아와요', hit: [chunks[2][1] - 4, chunks[2][2] - 2, chunks[2][3] - 4, chunks[2][1] + 4, chunks[2][2] + 8, chunks[2][3] + 4],
        run: async a => {
          a.burst([chunks[2][1] + 0.5, chunks[2][2] + 3, chunks[2][3] + 0.5], { n: 50, colors: ['#c6b69a', '#9c8c72', '#e0d4b8'], speed: 5, up: 2, life: 1.6, gravity: 3, spread: 4 });
          const inX = RX - chunks[2][1], inZ = RZ - chunks[2][3], il = Math.hypot(inX, inZ);
          await Promise.all(chunks.map(([nm], k) => a.tween(nm, { off: [inX / il * (7 + k), -26 - k * 4, inZ / il * (7 + k)], rot: [0.5 * (k % 3 - 1), k * 0.6, 0.4 * (k % 2 ? 1 : -1)] }, 1.4, t => t * t)));
          await a.wait(1);
          a.glow(1.6, 2);
          await Promise.all(chunks.map(([nm]) => a.tween(nm, { off: [0, 0, 0], rot: [0, 0, 0] }, 1.8, t => t * t * (3 - 2 * t))));
          a.burst([chunks[2][1] + 0.5, chunks[2][2] + 3, chunks[2][3] + 0.5], { n: 40, colors: ['#ffe9a0', '#ffffff'], speed: 3, up: 1, life: 1.2, gravity: 0, spread: 6 });
        },
      });

      // ── 폭풍을 도는 고룡(부품: 결투장 한가운데를 축으로 공전), 섬 위에 엎드린 고룡의 주검 ──
      const orb = w.prop({ name: 'dragon', pivot: [RX + 0.5, base, RZ + 0.5], speed: 0.13, bob: 3, bobSpeed: 0.6, clipOK: 99999 });
      LB.dragon(orb, { x: RX + 70, y: base + 44, z: RZ, dir: Math.PI / 2, s: 0.9, pose: 'fly', wingUp: 5, span: 26, torn: 0.3, m: { body: B.drag, belly: B.dragB, bone: B.dragBone, wing: B.dragW, horn: B.dragBone, eye: B.dragEye, spike: B.dragBone } });
      acts.push({
        name: '고룡의 비행', hint: '폭풍을 도는 고룡이 날갯짓을 빨리하며 붉은 번개를 흩뿌려요', hit: [RX - 3, AF + 26, RZ - 47, RX + 3, AF + 34, RZ - 41],
        run: async a => { a.spin('dragon', 3.5, 4); for (let k = 0; k < 6; k++) { a.lightning(0.5); const ang = k * 1.1; a.burst([RX + Math.cos(ang) * 70, base + 44, RZ + Math.sin(ang) * 70], { n: 30, colors: ['#ff6a3a', '#ffd060', '#ffffff'], speed: 6, up: 1, life: 0.9, gravity: 2, spread: 3 }); await a.wait(0.6); } },
      });
      isl(146, base + 2, 56, 11, 9, 14, 7);
      LB.dragon(w, { x: 146, y: base + 9, z: 56, dir: Math.PI * 0.85, s: 0.7, pose: 'draped', wingUp: 9, span: 15, neckUp: 12, torn: 0.35, headPitch: -0.2, m: { body: B.drag, belly: B.dragB, bone: B.dragBone, wing: B.dragW, horn: B.dragBone, eye: B.dragEye, spike: B.dragBone } });
      landmarks.push({ name: '고룡의 주검', note: '폐허 위에 엎드린 파름 아즈라의 용', p: [146.5, base + 30, 56.5] });

      // ── 떠 있는 부스러기: 바위섬과 부서진 계단·아치, 천천히 떠도는 조각(부품) ──
      const debris = [[26, base + 18, 126, 7], [30, base - 8, 40, 6], [120, base + 36, 22, 6], [158, base - 6, 100, 7], [40, base + 30, 164, 5], [150, base + 26, 150, 5], [14, base + 2, 84, 5]];
      debris.forEach(([x, y, z, r], k) => {
        isl(x, y, z, r, r * 0.8, r * 1.4, 10 + k);
        const kind = k % 3;
        if (kind === 0) { for (let s = 0; s < 6; s++) w.box(x - 2 + s, y + 1 + s, z - 2, x - 2 + s, y + 1 + s, z + 1, B.stone); }
        else if (kind === 1) { for (let zz = z - 3; zz <= z + 3; zz++) for (let yy = y + 1; yy <= y + 9; yy++) if (!LB.inArch(zz - z, yy - y - 1, 2, 6, 'round')) w.set(x, yy, zz, B.stone); LB.crumble(w, x - 1, y + 5, z - 4, x + 1, y + 10, z + 4, 0.3, 2, k); }
        else { w.box(x, y + 1, z, x + 1, y + 7 + (k % 5), z + 1, B.stone); w.box(x - 1, y + 1, z - 1, x + 2, y + 1, z + 2, B.stoneDk); }
      });
      const floats = [];
      for (let k = 0; k < 6; k++) {
        const a = k * 1.05 + 0.4, r = 56 + (k % 3) * 6, x = Math.round(RX + Math.cos(a) * r), z = Math.round(RZ + Math.sin(a) * r), y = base + 6 + (k % 4) * 8;
        if (x < 8 || z < 8 || x > W - 9 || z > D - 9) continue;
        const nm = 'float' + k, pr = w.prop({ name: nm, pivot: [x + 0.5, y, z + 0.5], bob: 1.6, bobSpeed: 0.4 + k * 0.07, rock: 0.05, rockSpeed: 0.3, phase: k, axis: 'y' });
        pr.ellipsoid(x, y, z, 2.6, 1.8, 2.2, B.rock); pr.box(x - 1, y + 1, z - 1, x + 1, y + 2, z + 1, B.stone);
        floats.push([nm, x, y, z]);
      }
      acts.push({
        name: '떠도는 조각', hint: '폭풍 속을 떠도는 돌 조각들이 크게 솟았다 가라앉아요', hit: [floats[0][1] - 3, floats[0][2] - 2, floats[0][3] - 3, floats[0][1] + 3, floats[0][2] + 3, floats[0][3] + 3],
        run: async a => { await Promise.all(floats.map(([nm], k) => a.move(nm, [0, 7 + k, 0], 1.6))); await a.wait(0.6); await Promise.all(floats.map(([nm]) => a.move(nm, [0, 0, 0], 1.8))); },
      });
      return { lights, landmarks, acts };
    },
  });
})();
