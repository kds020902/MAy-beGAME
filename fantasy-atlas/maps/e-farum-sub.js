// 파름 아즈라 대교(하위 지도) — 대교 옆 축복이 있는 노대에서 계단을 올라 대교 한복판에 서면, 다리는 동쪽으로 내려가 둥근 탑과 신전으로,
// 서북쪽으로는 얕은 계단을 이루며 올라가 말리케스의 결투장(두 단 아치를 두른 원형 대전) 문 앞 안개문에 닿는다.
// 노대: 승강기를 타고 올라오는 신전 꼭대기, 돌벽 통로에 횃불 두 쌍과 축복, 남쪽으로 난간 두른 발코니가 폭풍을 내려다본다.
// 대교: 넓은 판석 바닥, 동자 기둥 난간, 아치 교각. 오르막 중턱에 용의 나무 파수병이 지킨다. (무너지는 파름 아즈라의 하위 지도)
// 방위 메모: 게임 속에서는 결투장이 대교의 남쪽 오르막 끝이지만, 기본 시점(남동쪽)에서 결투장이 화면 위쪽에 오도록 오르막을 서북쪽으로 돌려 놓았다.
// 좌표: +x 동쪽, +z 남쪽. 기본 시점에서 보면 노대와 축복이 앞, 대교가 가운데를 가로지르고, 결투장 벽이 뒤.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 150;
  MAPS.push({
    id: 'farum-sub', cat: 'lands', sub: true, parent: 'farum', name: '파름 아즈라 대교', en: 'The Great Bridge · Beside the Great Bridge', color: '#c8b090', seed: 997, base: 56, time: 'day', size: [W, D, Hh],
    desc: '무너지는 파름 아즈라 꼭대기 가까이, 승강기를 타고 오르면 돌벽 통로에 횃불이 타는 대교 옆 축복이 나온다. 남쪽 노대는 시간 너머의 폭풍을 내려다보고, 북쪽 계단을 오르면 난간 두른 넓은 대교 한복판이다. 다리는 한쪽으로 둥근 탑과 신전으로 내려가고, 다른 쪽으로는 얕은 계단을 이루며 올라가 용의 나무 파수병을 지나 말리케스의 결투장 안개문에 닿는다.',
    info: { title: '장소 정보', en: 'BESIDE THE GREAT BRIDGE', rows: [['축복', '대교 옆 · 횃불 통로'], ['노대', '남쪽 발코니 · 승강기'], ['대교', '판석 바닥 · 동자 난간 · 아치 교각'], ['파수병', '오르막 중턱 · 용의 나무 파수병'], ['결투장', '서북쪽 끝 · 안개문']] },
    monsters: { normal: ['파름 아즈라의 수인', '파름 아즈라의 용'], mid: '용의 나무 파수병', boss: '흑검 말리케스(결투장)' },
    sky: ['#d8c098', '#4e4e5a', '#ffe6b0'], stars: false,
    hemi: ['#fff0d8', '#4a4236', 0.64], sun: ['#fff0d0', 0.74, [0.4, 1, 0.55]],
    night: { sky: ['#8a7458', '#24242e', '#e8c890'], stars: true, hemi: ['#e0d0b8', '#2a241c', 0.52], sun: ['#ffe8c8', 0.52, [0.4, 1, 0.55]], haze: '#5a5040' },
    liquid: ['#6a7a88', '#9ab0c0', '#e8f4ff'], liqSpeed: 0.4,
    fog: { start: 0.8, floor: 22, depth: 16, haze: [40, 0.24, 14], hazeColor: '#c8b494', top: 144, topDepth: 10 },
    camY: -2, zoom: 1.3,
    particles: [
      { n: 560, colors: ['#a49a8c', '#c8bea8', '#7e786e', '#e8dcc0'], mode: 'vortex', center: [96, 96], r0: 70, r1: 104, rise: 1.4, spin: 0.4, jit: 5, y0: 10, y1: 146, glow: false },
      { n: 260, colors: ['#e8dcc0', '#c8b494'], mode: 'drift', speed: 0.7, wind: 1.2, y0: 40, y1: 140, glow: false },
      { n: 60, colors: ['#ff5a3a', '#ffb040'], mode: 'drift', speed: 0.3, wind: 0.5, y0: 60, y1: 100, glow: true },
    ],
    blocks: {
      rock: { c: '#8a7e6c', v: 0.07, pat: 'big' }, rockDk: { c: '#665c4e', v: 0.07, pat: 'stone' }, soil: { c: '#7a6c58', top: '#a2926e', v: 0.08 },
      stone: { c: '#b4a080', v: 0.05, pat: 'brick' }, stoneDk: { c: '#8c7a60', v: 0.05, pat: 'brick' }, trim: { c: '#d8c8a4', v: 0.03 }, pave: { c: '#a89878', top: '#b4a484', v: 0.05, pat: 'check', alt: '#ac9c7c' },
      paveDk: { c: '#8e806a', top: '#968870', v: 0.05 }, block: { c: '#9c8a6c', v: 0.06, pat: 'brick' }, relief: { c: '#9a8462', v: 0.06, pat: 'stone' }, reliefL: { c: '#c4ae84', v: 0.05 },
      floorA: { c: '#4a443e', top: '#5a524a', v: 0.05 }, dark: { c: '#1c1012', v: 0.03 }, leaf: { c: '#a8582e', v: 0.12 }, leaf2: { c: '#c87a3a', v: 0.12 }, bark: { c: '#4a3a2c', v: 0.06 },
      cloud: { c: '#9e968a', v: 0.08 }, cloud2: { c: '#c4bcac', v: 0.06 }, cloudDk: { c: '#6e6a62', v: 0.08 }, twist: { c: '#e4ddd0', v: 0.05 },
      bolt: { c: '#ff4a2a', glow: true }, bolt2: { c: '#ffb090', glow: true },
      win: { c: '#ffd890', night: true, day: '#4a4440' }, grace: { c: '#ffe9a0', glow: true }, fogG: { c: '#fff0c8', glow: true }, torch: { c: '#ffa040', glow: true }, iron: { c: '#3a3634', v: 0.03 },
      tower: { c: '#e2dccc', v: 0.04, pat: 'brick' }, towerDk: { c: '#bcb4a2', v: 0.04 },
      // 이정표(OR.signpost)용
      stoneG: { c: '#6e6456', v: 0.05 }, timber: { c: '#4a3a2c', v: 0.05 }, door: { c: '#6a5440', v: 0.05, pat: 'plank' }, gold: { c: '#ffd060', glow: true }, mlamp: { c: '#ffd890', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, AF = base, TAU = Math.PI * 2;
      w.hm = new Int16Array(W * D); w.slope = new Float32Array(W * D);   // 땅이 없다: 폭풍 위에 뜬 다리와 건물만 짓는다
      const lights = [], acts = [], landmarks = [];
      const col = (x, z, top, bot, topB, side) => {
        if (x < 0 || z < 0 || x >= W || z >= D) return;
        for (let y = bot; y < top; y++) w.set(x, y, z, side || (top - y < 3 ? B.stoneDk : ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock)));
        w.set(x, top, z, topB);
        const i = x + W * z; if (top > w.hm[i]) w.hm[i] = top;
      };
      const isl = (x, y, z, rx, rz, dep, salt) => LB.island(w, x, y, z, rx, rz, dep, { rock: B.rock, under: B.rockDk, soil: B.soil, salt, rough: 0.4, top: () => B.paveDk });

      // ══ 대교: 동쪽(낮은 끝, 둥근 탑과 신전)에서 서북쪽(높은 끝, 결투장 안개문)으로 얕은 계단을 이루며 오른다 ══
      const bpts = [[W + 6, 128], [150, 108], [104, 88], [62, 68], [30, 50]];
      const BC = LB.curve(bpts.map(p => [p[0], 0, p[1]]), 0.5); let acc = 0;
      BC.forEach((p, i) => { if (i) acc += Math.hypot(p[0] - BC[i - 1][0], p[2] - BC[i - 1][2]); p.push(acc); });
      const BL = acc, BH = s => AF - 6 + Math.floor(s / 7);                              // 일곱 칸마다 한 단
      const at = s => BC.find(p => p[3] >= s) || BC[BC.length - 1];
      const bcell = new Map();
      BC.forEach(p => {
        for (let dz = -8; dz <= 8; dz++) for (let dx = -8; dx <= 8; dx++) {
          const x = Math.round(p[0] + dx), z = Math.round(p[2] + dz), d = Math.hypot(x - p[0], z - p[2]); if (d > 7.6) continue;
          const k = x + 1000 * z, o = bcell.get(k); if (!o || d < o[0]) bcell.set(k, [d, p[3]]);
        }
      });
      const SM = 92;                                                                   // 노대 계단이 닿는 한복판
      const rails = [];
      for (const [k, [d, s]] of bcell) {
        const x = k % 1000, z = (k / 1000) | 0; if (x < 0 || z < 0 || x >= W || z >= D) continue;
        const y = BH(s), fr = (s % 26) / 26, bot = y - 3 - Math.round((1 - Math.sin(fr * Math.PI)) * 9);
        const crack = n.ridge(x * 0.08, z * 0.08, 2) > 0.94;
        col(x, z, y, bot, d > 6.6 ? B.trim : (crack ? B.paveDk : (Math.floor(s) % 7 === 6 ? B.stoneDk : B.pave)), B.block);
        if (d > 6.6) {
          const post = Math.round(s) % 9 === 0, sideS = (() => { const p = at(s); return (x - p[0]) * -0.43 + (z - p[2]) * 0.9 > 0; })();
          if (sideS && Math.abs(s - SM) < 4) continue;                                // 노대 계단 입구
          if (s > 120 && s < 128 && sideS) continue;                                  // 무너진 난간 자리(부품으로 따로 짓는다)
          w.set(x, y + 1, z, post ? B.stoneDk : ((Math.round(s) & 1) ? B.stone : B.trim)); w.set(x, y + 2, z, B.trim);
          if (post) { w.set(x, y + 2, z, B.stoneDk); w.set(x, y + 3, z, B.trim); }
        }
        if (fr < 0.06 || fr > 0.94) for (let yy = y - 52; yy < bot; yy++) w.set(x, yy, z, (yy % 6 === 0) ? B.trim : B.stoneDk);    // 교각
      }
      landmarks.push({ name: '대교', note: '난간 두른 판석 다리 · 동쪽은 둥근 탑, 서북쪽은 결투장', p: [at(60)[0], BH(60) + 16, at(60)[2]] });

      // ══ 노대: 대교 남쪽 아래, 신전 꼭대기의 돌벽 통로(축복과 횃불)와 남쪽 발코니(승강기) ══
      const pm = at(SM), DY = BH(SM), TY = DY - 12;                                    // 대교 바닥 · 노대 바닥
      const SX = Math.round(pm[0]), SZ0 = Math.round(pm[2]) + 5, SZ1 = SZ0 + (DY - TY);  // 계단: 대교에서 남쪽으로 한 칸에 한 단씩 내려간다
      const RX0 = SX - 9, RX1 = SX + 9, RZ0 = SZ1 + 1, RZ1 = RZ0 + 14;                // 축복 통로(방)
      const BX0 = SX - 16, BX1 = SX + 14, BZ0 = RZ1 + 1, BZ1 = BZ0 + 11;              // 발코니
      // 아래를 받치는 신전 몸채(창 두 줄), 아래로 갈수록 바위
      for (let z = SZ0 - 1; z <= BZ1 + 1; z++) for (let x = BX0 - 1; x <= BX1 + 1; x++) {
        const edge = x === BX0 - 1 || x === BX1 + 1 || z === BZ1 + 1 || (z < RZ0 && (x < SX - 4 || x > SX + 4));
        if (z < RZ0 && (x < SX - 5 || x > SX + 5)) continue;
        const bot = TY - 34 - Math.round(n.fbm(x * 0.1, z * 0.1, 2) * 8);
        for (let y = bot; y < TY; y++) {
          const v = TY - y, wn = edge && v > 4 && v < 28 && (v % 10 > 4) && (((x + z) >> 1) % 3 === 0);
          w.set(x, y, z, wn ? B.win : (v > 22 ? B.rock : (v % 9 === 0 ? B.trim : B.stoneDk)));
        }
        col(x, z, TY, TY - 1, z >= BZ0 ? (((x + z) & 1) ? B.pave : B.paveDk) : B.pave);
      }
      // 계단(양옆 돌벽, 위는 둥근 아치 문)
      for (let z = SZ0; z <= SZ1; z++) {
        const y = DY - (z - SZ0);
        for (let x = SX - 3; x <= SX + 3; x++) col(x, z, y, TY - 2, Math.abs(x - SX) === 3 ? B.trim : B.paveDk, B.block);
        for (const x of [SX - 4, SX + 4]) for (let yy = TY; yy <= y + 6; yy++) w.set(x, yy, z, (yy - TY) % 6 === 0 ? B.trim : B.block);
      }
      // 축복 통로: 두꺼운 돌벽(위는 무너져 열렸다), 모서리 기둥, 횃불 두 쌍
      for (let z = RZ0; z <= RZ1; z++) for (let x = RX0; x <= RX1; x++) {
        const wall = x <= RX0 + 1 || x >= RX1 - 1 || z === RZ0 || z === RZ1;
        if (!wall) continue;
        const pil = (x <= RX0 + 1 || x >= RX1 - 1) && (z - RZ0) % 7 === 0;
        const top = TY + 10 + Math.round(n.fbm(x * 0.3, z * 0.3, 2) * 4) - (x > SX + 2 && z > RZ0 + 3 ? 6 : 0);
        for (let y = TY + 1; y <= top; y++) {
          const v = y - TY;
          if (z === RZ0 && LB.inArch(x - SX, v - 1, 3, 8, 'round')) continue;          // 북쪽 문: 계단으로
          if (z === RZ1 && LB.inArch(x - SX, v - 1, 3, 8, 'round')) continue;          // 남쪽 문: 발코니로
          w.set(x, y, z, pil ? B.reliefL : (v % 5 === 0 ? B.trim : B.block));
        }
      }
      LB.crumble(w, RX0, TY + 7, RZ0, RX1, TY + 16, RZ1, 0.3, 2, 5);
      for (let z = RZ0 + 1; z < RZ1; z++) for (let x = RX0 + 2; x <= RX1 - 2; x++) w.set(x, TY, z, ((x + z) & 1) ? B.pave : B.paveDk);
      const torches = [];
      for (const x of [RX0 + 2, RX1 - 2]) for (const z of [RZ0 + 3, RZ0 + 10]) { w.set(x, TY + 5, z, B.iron); w.set(x, TY + 6, z, B.torch); torches.push([x, TY + 6, z]); }
      lights.push({ name: 'torch', p: [SX + 0.5, TY + 6, (RZ0 + RZ1) / 2 + 0.5], c: '#ffa040', i: 0.5, d: 16, flicker: 0.5, srcR: 9 });
      const gp = LB.grace(w, SX, TY, Math.round((RZ0 + RZ1) / 2), B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      // 발코니 난간(남·동·서), 모서리에 화분 같은 돌단지와 붉은 잎 나무 한 그루
      for (let z = BZ0; z <= BZ1; z++) for (let x = BX0; x <= BX1; x++) {
        if (!(x === BX0 || x === BX1 || z === BZ1)) continue;
        const post = (x + z) % 5 === 0;
        w.set(x, TY + 1, z, post ? B.stoneDk : ((x + z) & 1 ? B.stone : B.trim)); w.set(x, TY + 2, z, B.trim);
        if (post) w.set(x, TY + 3, z, B.trim);
      }
      { const tx = BX1 - 4, tz = BZ1 - 3; w.box(tx - 1, TY + 1, tz - 1, tx + 1, TY + 2, tz + 1, B.stoneDk); MH.tree(w, tx, TY + 3, tz, { kind: 'oak', h: 6, bark: B.bark, leaves: [B.leaf, B.leaf2, B.leaf], r: 3, spread: 2.4, branches: 3 }); }
      // 승강기: 발코니 서쪽 끝의 네모난 우물, 판은 부품으로 오르내린다
      // 승강기: 발코니 서쪽 바깥, 신전 벽에 붙은 쇠 틀 승강로. 판은 부품으로 오르내린다
      const LX = BX0 - 4, LZ = BZ0 + 5;
      for (let z = LZ - 2; z <= LZ + 2; z++) w.set(BX0, TY + 1, z, 0), w.set(BX0, TY + 2, z, 0);          // 난간 틈
      for (const qz of [-3, 3]) for (let y = TY - 32; y <= TY + 7; y++) w.set(LX - 3, y, LZ + qz, (y - TY) % 8 === 0 ? B.trim : B.iron);   // 바깥 기둥 두 개
      for (let x = LX - 3; x <= BX0 - 1; x++) for (const qz of [-3, 3]) w.set(x, TY + 8, LZ + qz, B.iron);
      const lift = w.prop({ name: 'lift', pivot: [LX + 0.5, TY, LZ + 0.5] });
      lift.box(LX - 2, TY, LZ - 2, LX + 2, TY, LZ + 2, B.iron); lift.box(LX - 1, TY, LZ - 1, LX + 1, TY, LZ + 1, B.relief);
      for (const [qx, qz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) lift.box(LX + qx, TY + 1, LZ + qz, LX + qx, TY + 5, LZ + qz, B.iron);   // 승강기 틀
      for (const q of [-2, 2]) { lift.box(LX - 2, TY + 6, LZ + q, LX + 2, TY + 6, LZ + q, B.iron); lift.box(LX + q, TY + 6, LZ - 2, LX + q, TY + 6, LZ + 2, B.iron); }
      acts.push({
        name: '노대의 승강기', hint: '발코니 서쪽 승강기 판이 신전 아래로 내려갔다가 다시 올라와요. 대교 옆 축복으로 오는 길이에요', hit: [LX - 2, TY + 1, LZ - 2, LX + 2, TY + 7, LZ + 2],
        run: async a => { await a.tween('lift', { off: [0, -26, 0] }, 2.2, t => t * t * (3 - 2 * t)); await a.wait(0.6); await a.tween('lift', { off: [0, 0, 0] }, 2.2, t => t * t * (3 - 2 * t)); a.burst([LX + 0.5, TY + 1.5, LZ + 0.5], { n: 20, colors: ['#c8b494', '#e8dcc0'], speed: 1.5, up: 1, life: 0.9, gravity: 1, spread: 2.5, flat: true }); },
      });
      acts.push({
        name: '통로의 횃불', hint: '축복 통로 양쪽 벽의 횃불 네 개가 차례로 확 타올라요', hit: [RX0, TY + 3, RZ0 + 1, RX0 + 3, TY + 8, RZ0 + 5],
        run: async a => { a.flash('torch', 4, 3); for (let r = 0; r < 2; r++) for (const [x, y, z] of torches) { a.burst([x + 0.5, y + 0.8, z + 0.5], { n: 16, colors: ['#ffa040', '#ffd060', '#ff6020'], speed: 1, up: 3, life: 0.9, gravity: -0.4, spread: 0.4 }); await a.wait(0.22); } },
      });

      // ══ 서북쪽 끝: 말리케스의 결투장 바깥벽(두 단 아치를 두른 원형 대전)과 안개문 ══
      const ACX = -16, ACZ = 6, AR = 64, gate = at(BL - 2), GY = BH(BL - 2);
      const gth = Math.atan2(gate[2] - ACZ, gate[0] - ACX);
      for (let z = 0; z < 96; z++) for (let x = 0; x < 110; x++) {
        const dx = x - ACX, dz = z - ACZ, r = Math.hypot(dx, dz); if (r < AR - 2 || r > AR + 3) continue;
        const th = Math.atan2(dz, dx), u = (th - gth) * AR, AW = 12, uc = Math.round(u / AW) * AW, du = u - uc;
        const pil = Math.abs(Math.abs(du) - AW / 2) < 1, top = GY + 34 + Math.round(n.fbm(th * 9, 3, 2) * 10) - (Math.abs(u) > 60 ? 10 : 0);
        for (let y = GY - 30; y <= top; y++) {
          const v = y - GY;
          let b = v % 8 === 0 ? B.trim : (pil ? B.reliefL : B.stone);
          if (v < 0) b = v % 6 === 0 ? B.trim : B.stoneDk;
          else if (!pil && r > AR + 1) {
            if (LB.inArch(du, v - 1, 3.4, 13, 'round')) b = B.stoneDk;
            else if (LB.inArch(du, v - 17, 2.6, 10, 'round')) b = B.relief;
          }
          if (Math.abs(u) < 5 && LB.inArch(u, v - 1, 4.5, 15, 'round')) b = 0;       // 문
          if (b) w.set(x, y, z, b);
        }
        const i = x + W * z; if (top > w.hm[i]) w.hm[i] = top;
      }
      LB.crumble(w, 0, GY + 26, 0, 110, GY + 48, 96, 0.14, 2, 7);
      // 문틀과 안개문
      const gfx = Math.cos(gth), gfz = Math.sin(gth);
      for (let s = -4; s <= 4; s++) for (let y = GY + 1; y <= GY + 15; y++) {
        const x = Math.round(gate[0] - gfx * 1 - gfz * s), z = Math.round(gate[2] - gfz * 1 + gfx * s);
        if (Math.abs(s) === 4 || y === GY + 15) { w.set(x, y, z, B.reliefL); continue; }
        if (hash3(x, y, z) > 0.5) w.set(x, y, z, B.fogG);
      }
      lights.push({ name: 'fog', p: [gate[0] + 0.5, GY + 7, gate[2] + 0.5], c: '#fff0c8', i: 0.6, d: 16, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '대교 꼭대기, 말리케스의 결투장 문을 막은 금빛 안개가 일렁여요', hit: [Math.round(gate[0]) - 4, GY + 1, Math.round(gate[2]) - 4, Math.round(gate[0]) + 4, GY + 14, Math.round(gate[2]) + 4],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([gate[0] + 0.5, GY + 2 + k * 1.5, gate[2] + 0.5], { n: 22, colors: ['#fff0c8', '#ffffff', '#ffd060'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 4, flat: true }); await a.wait(0.18); } },
      });
      landmarks.push({ name: '말리케스의 결투장', note: '대교 꼭대기 · 안개문 너머 둥근 대전', p: [gate[0] - 6, GY + 50, gate[2] - 6], boss: true });
      acts.push(LB.graceAct({ name: '대교 옆 축복', at: gp, to: [gate[0] + 0.5, GY + 6, gate[2] + 0.5], arc: 22, steps: 34, hint: '노대 통로의 축복이 계단 위 대교를 따라 결투장 안개문을 가리켜요' }));
      landmarks.push({ name: '대교 옆', note: '축복 · 횃불 통로와 남쪽 노대', p: [gp[0], gp[1] + 16, gp[2]] });
      {
        const q = at(BL - 22), sx = Math.round(q[0] + 0.43 * 4.5), sz = Math.round(q[2] - 0.9 * 4.5);
        const sp = OR.signpost(w, B, sx, sz, { dir: [-1, -1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '말리케스의 결투장으로', goto: 'farum', hint: '대교 꼭대기 안개문을 지나 짐승 사제가 죽음의 룬을 지키는 둥근 대전, 말리케스의 결투장으로 가요' }));
        landmarks.push({ name: '결투장으로', note: '무너지는 파름 아즈라 · 말리케스의 결투장', p: [sx + 0.5, sp[1] + 14, sz + 0.5] });
      }

      // ══ 용의 나무 파수병: 오르막 중턱(대교 위 붉은 번개 자리) ══
      const SP = at(140), SY = BH(140), TT = [SP[0] + 0.5, SY + 1, SP[2] + 0.5];
      for (let k = 0; k < 14; k++) { const a = k * 2.4, r = 2 + (k % 4); w.set(Math.round(SP[0] + Math.cos(a) * r), SY, Math.round(SP[2] + Math.sin(a) * r), B.paveDk); }   // 그을린 판석
      const bolt = w.prop({ name: 'bolt', pivot: TT, scl0: [0, 0, 0], clipOK: 400 });
      let prev = [SP[0] - 20, Hh - 10, SP[2] - 30];
      for (let k = 1; k <= 10; k++) { const t = k / 10, p = LB.lerp3(prev, TT, k === 10 ? 1 : 0.16 + t * 0.1); if (k < 10) { p[0] += (hash3(k, 1, 6) - 0.5) * 8; p[1] += (hash3(k, 2, 6) - 0.5) * 6; p[2] += (hash3(k, 3, 6) - 0.5) * 8; } LB.tube(bolt, [prev, p], 0.55, k % 2 ? B.bolt : B.bolt2); prev = p; }
      lights.push({ name: 'strike', p: [TT[0], TT[1] + 2, TT[2]], c: '#ff5030', i: 0.02, d: 50, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '용의 나무 파수병', hint: '오르막 중턱을 지키는 용의 나무 파수병이 철퇴에 붉은 번개를 불러 대교 판석을 내리쳐요', hit: [Math.round(TT[0]) - 4, SY, Math.round(TT[2]) - 4, Math.round(TT[0]) + 4, SY + 4, Math.round(TT[2]) + 4],
        run: async a => { for (let k = 0; k < 3; k++) { a.tween('bolt', { scl: [1, 1, 1] }, 0.04); a.lightning(1); a.flash('strike', 70, 0.25); a.burst(TT, { n: 60, colors: ['#ff4a2a', '#ffb090', '#ffffff'], speed: 7, up: 3, life: 0.9, gravity: 5, spread: 2, flat: true }); await a.wait(0.2); await a.tween('bolt', { scl: [0, 0, 0] }, 0.05); await a.wait(0.5 + k * 0.2); } },
      });
      landmarks.push({ name: '용의 나무 파수병', note: '대교 오르막을 지키는 기마 파수병 · 붉은 번개 철퇴', p: [TT[0], SY + 18, TT[2]], boss: true });

      // ══ 무너지는 난간(부품): 오르막 남쪽 난간 한 토막이 폭풍 속으로 떨어졌다가 시간을 거슬러 되붙는다 ══
      const chunks = [];
      for (let k = 0; k < 4; k++) {
        const s = 121 + k * 2, p = at(s), y = BH(s), x = Math.round(p[0] - 0.43 * 7), z = Math.round(p[2] + 0.9 * 7), nm = 'rail' + k;
        const pr = w.prop({ name: nm, pivot: [x + 0.5, y + 1, z + 0.5] });
        pr.box(x - 1, y + 1, z, x, y + 1, z, k & 1 ? B.stone : B.trim); pr.box(x - 1, y + 2, z, x, y + 2, z, B.trim); if (k === 1) pr.set(x, y + 3, z, B.trim);
        chunks.push([nm, x, y, z]);
      }
      acts.push({
        name: '무너지는 난간', hint: '오르막 난간 한 토막이 폭풍 속으로 떨어져 내렸다가 시간을 거슬러 제자리로 돌아와요', hit: [chunks[1][1] - 3, chunks[1][2], chunks[1][3] - 3, chunks[1][1] + 3, chunks[1][2] + 4, chunks[1][3] + 3],
        run: async a => {
          a.burst([chunks[1][1] + 0.5, chunks[1][2] + 2, chunks[1][3] + 0.5], { n: 40, colors: ['#c6b69a', '#9c8c72', '#e0d4b8'], speed: 4, up: 2, life: 1.4, gravity: 3, spread: 3 });
          await Promise.all(chunks.map(([nm], k) => a.tween(nm, { off: [-2 - k, -30 - k * 4, 6 + k * 2], rot: [0.6 * (k % 2 ? 1 : -1), k * 0.5, 0.3] }, 1.4, t => t * t)));
          await a.wait(0.9); a.glow(1.5, 2);
          await Promise.all(chunks.map(([nm]) => a.tween(nm, { off: [0, 0, 0], rot: [0, 0, 0] }, 1.8, t => t * t * (3 - 2 * t))));
        },
      });

      // ══ 동쪽 낮은 끝: 대교 북쪽의 둥근 탑(옛 군주의 탈리스만 상자)과 신전 지붕 ══
      {
        const p = at(26), tx = Math.round(p[0] + 0.43 * 16), tz = Math.round(p[2] - 0.9 * 16), ty = BH(26);
        for (let z = tz - 9; z <= tz + 9; z++) for (let x = tx - 9; x <= tx + 9; x++) if (Math.hypot(x - tx, z - tz) < 9) col(x, z, ty, ty - 30 - Math.round(n.fbm(x * 0.2, z * 0.2, 2) * 6), B.pave);
        for (let y = ty + 1; y < ty + 26; y++) w.cyl(tx, tz, y, y, 6, (y - ty) % 7 === 0 ? B.towerDk : B.tower, 4.8);
        for (let k = 0; k < 6; k++) { const a = k / 6 * TAU, x = Math.round(tx + Math.cos(a) * 6), z = Math.round(tz + Math.sin(a) * 6); w.box(x, ty + 8, z, x, ty + 11, z, B.dark); w.box(x, ty + 17, z, x, ty + 20, z, B.dark); }
        for (let y = 0; y <= 6; y++) w.cyl(tx, tz, ty + 26 + y, ty + 26 + y, Math.sqrt(Math.max(0, 49 - y * y * 1.2)), B.towerDk);
        // 다리와 탑 사이 짧은 디딤
        const q = at(26); for (let t = 0; t <= 1; t += 0.05) { const x = Math.round(q[0] + (tx - q[0]) * t), z = Math.round(q[2] + (tz - q[2]) * t); for (let o = -2; o <= 2; o++) col(x + o, z, ty, ty - 3, B.paveDk); }
        landmarks.push({ name: '둥근 탑', note: '대교 아래쪽 끝 · 옛 군주의 탈리스만', p: [tx + 0.5, ty + 44, tz + 0.5] });
      }

      // ══ 시간 너머의 폭풍: 뒤쪽 구름띠(부품)와 남서쪽 흰 회오리(부품) ══
      const camA = Math.atan2(0.73, 0.68), backF = th => 0.5 - 0.5 * Math.cos(th - camA);
      const storm = w.prop({ name: 'storm', pivot: [96.5, base, 96.5], rock: 0.06, rockSpeed: 0.2, clipOK: 99999 });
      for (let y = base - 30; y <= Hh - 8; y += 2) {
        const t = (y - base + 30) / (Hh - base + 22), r = 70 + 14 * Math.pow(t, 1.25);
        for (let k = 0; k < 7; k++) {
          const a0 = k * TAU / 7 + y * 0.06;
          for (let s = 0; s < 1.4; s += 0.035) {
            const a = a0 + s, rr = r + Math.sin(s * 3 + k) * 2.4, x = Math.round(96 + Math.cos(a) * rr), z = Math.round(96 + Math.sin(a) * rr);
            if (backF(a) < 0.66 || hash3(x, y, z) < 0.38 || Math.hypot(x - ACX, z - ACZ) < AR + 14) continue;      // 결투장 벽 앞은 비운다
            for (let q = 0; q < 2; q++) storm.set(x, y + q, z, hash3(x, y + 1, z) > 0.6 ? B.cloud2 : (s > 1 ? B.cloudDk : B.cloud));
          }
        }
      }
      const TWX = 52, TWZ = 128;
      const tw = w.prop({ name: 'twister', pivot: [TWX + 0.5, base, TWZ + 0.5], clipOK: 99999 });
      for (let y = base - 24; y <= Hh - 6; y++) {
        const t = (y - base + 24) / (Hh - base + 18), r = 1.6 + Math.pow(t, 2.2) * 13, cx = TWX + Math.sin(t * 4) * 3, cz = TWZ + Math.cos(t * 3) * 2;
        for (let k = 0; k < 40; k++) {
          const a = k / 40 * TAU + y * 0.3, rr = r * (0.7 + 0.3 * hash3(k, y, 5));
          if (hash3(k, y, 9) < 0.45) continue;
          tw.set(Math.round(cx + Math.cos(a) * rr), y, Math.round(cz + Math.sin(a) * rr), hash3(k, y, 3) > 0.5 ? B.twist : B.cloud2);
        }
      }
      const twY = base + 48;
      acts.push({
        name: '시간 너머의 폭풍', hint: '대교 남쪽 아래 흰 회오리가 휘몰아치고 폭풍 하늘 곳곳에 번개가 쳐요', hit: [TWX - 4, twY - 6, TWZ - 4, TWX + 4, twY + 6, TWZ + 4],
        run: async a => { a.wind(3.2, 5.2); a.spin('twister', 6, 5.2); a.spin('storm', 4, 5.2); for (let k = 0; k < 6; k++) { a.lightning(0.6 + (k % 2) * 0.6); await a.wait(0.6 + (k % 3) * 0.25); } },
      });
      landmarks.push({ name: '흰 회오리', note: '시간 너머의 폭풍', p: [TWX + 0.5, twY + 30, TWZ + 0.5] });

      // ══ 떠 있는 부스러기: 바위섬과 부서진 아치, 천천히 떠도는 조각(부품) ══
      const debris = [[150, base + 30, 30, 6], [176, base - 2, 176, 6], [96, base - 20, 170, 7], [150, base + 40, 160, 5], [20, base + 50, 120, 5]];
      debris.forEach(([x, y, z, r], k) => {
        isl(x, y, z, r, r * 0.8, r * 1.4, 10 + k);
        if (k % 2 === 0) { for (let zz = z - 3; zz <= z + 3; zz++) for (let yy = y + 1; yy <= y + 9; yy++) if (!LB.inArch(zz - z, yy - y - 1, 2, 6, 'round')) w.set(x, yy, zz, B.stone); LB.crumble(w, x - 1, y + 5, z - 4, x + 1, y + 10, z + 4, 0.3, 2, k); }
        else { w.box(x, y + 1, z, x + 1, y + 7 + (k % 5), z + 1, B.stone); w.box(x - 1, y + 1, z - 1, x + 2, y + 1, z + 2, B.stoneDk); }
      });
      for (let k = 0; k < 5; k++) {
        const x = [126, 60, 170, 40, 120][k], z = [150, 120, 70, 20, 30][k], y = base + 8 + (k % 3) * 10;
        { let hit = false; for (let yy = y - 3; yy <= y + 6 && !hit; yy++) for (let zz = z - 4; zz <= z + 4 && !hit; zz++) for (let xx = x - 4; xx <= x + 4; xx++) if (w.get(xx, yy, zz)) { hit = true; break; } if (hit) continue; }
        const pr = w.prop({ name: 'float' + k, pivot: [x + 0.5, y, z + 0.5], bob: 1.6, bobSpeed: 0.4 + k * 0.07, rock: 0.05, rockSpeed: 0.3, phase: k, axis: 'y' });
        pr.ellipsoid(x, y, z, 2.6, 1.8, 2.2, B.rock); pr.box(x - 1, y + 1, z - 1, x + 1, y + 2, z + 1, B.stone);
      }
      return { lights, landmarks, acts };
    },
  });
})();
