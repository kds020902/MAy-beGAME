// 상인 길드 회관(하위 지도) — 대시장 윗광장 북쪽 길드 회관 1층. 가운데 대회의장과 긴 회의 탁자, 서쪽 경매장, 동쪽 장부실과 금고, 북쪽 종탑 아래 시계 기계실 (대시장의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 남쪽·동쪽 바깥벽은 낮게 잘라 기본 시점(남동쪽)에서 방 안이 보인다.
// 2배 해상도(1칸 ≈ 25cm), playerScale 2: 쪽마루 결, 대리석 격자, 들보와 샛기둥, 창살 있는 큰 창, 다리·등받이 있는 의자, 촛대, 책등이 보이는 장부 서가, 톱니바퀴.
(function () {
  'use strict';
  const { hash3 } = VX;
  const { KP } = window.KINGDOM;
  const W = 208, D = 176, Hh = 128, G = 44;
  MAPS.push({
    id: 'market-guildhall', cat: 'kingdom', sub: true, parent: 'market', name: '상인 길드 회관', en: 'Merchants\' Guildhall', color: '#e8a050', seed: 2011, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '대시장 윗광장 북쪽, 종탑을 얹은 상인 길드 회관의 1층. 가운데 대회의장에는 길드장들이 둘러앉는 긴 탁자와 금빛 저울 문장이 있고, 서쪽 경매장에서는 망치 소리와 함께 값이 매겨진다. 동쪽에는 장부실과 두꺼운 쇠문의 금고, 북쪽 종탑 아래에는 큰 톱니바퀴가 맞물려 도는 시계 기계실이 있다.',
    info: { title: '장소 정보', en: 'GUILDHALL', rows: [['위치', '대시장 윗광장 북쪽'], ['방', '대회의장 · 경매장 · 장부실 · 금고 · 시계 기계실'], ['명물', '금빛 저울 문장 · 경매 망치 · 쇠문 금고'], ['소문', '길드장은 금화 한 닢도 잊지 않는다']] },
    sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false,
    hemi: ['#fff4e8', '#5a4a3a', 0.6], sun: ['#fff0d8', 0.74, [0.45, 1, 0.55]],
    night: { sky: ['#283048', '#080a16', '#d8a068'], stars: true, hemi: ['#c8c0d8', '#201a18', 0.46], sun: ['#d0d8ff', 0.34, [0.45, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.6,
    fog: { start: 0.92, floor: 20, depth: 16 },
    camY: -8, zoom: 1.75,
    particles: [
      { n: 110, colors: ['#fff4d0', '#ffffff'], mode: 'drift', speed: 0.24, area: [104, 84, 72], y0: G + 4, y1: G + 32, glow: false },
      { n: 30, colors: ['#ffe08a', '#f4d060'], mode: 'drift', speed: 0.4, area: [160, 112, 12], y0: G + 4, y1: G + 16, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      parq: { c: '#8a5a34', top: '#a06c40', v: 0.03 }, parq2: { c: '#7a4e2c', top: '#8c5e36', v: 0.03 }, parqJ: { c: '#5a3a20', top: '#6a4426', v: 0.02 },
      marb: { c: '#d8ccb4', top: '#e4d8bc', v: 0.02 }, marb2: { c: '#a88e68', top: '#b49a72', v: 0.02 }, vault: { c: '#6a6a72', v: 0.05, pat: 'brick' },
      table: { c: '#6a3e22', top: '#7a4a2a', v: 0.03 }, tableDk: { c: '#4e2c18', v: 0.03 }, chair: { c: '#4a2e1c', v: 0.03 }, cushion: { c: '#3a7a5a', v: 0.03 }, cushR: { c: '#a02a34', v: 0.03 },
      rug: { c: '#a02a34', top: '#a82c36', v: 0.02 }, rugG: { c: '#2e6a4a', top: '#34724e', v: 0.02 }, rugB: { c: '#c8a050', top: '#d0a850', v: 0.02 },
      shelf: { c: '#5a3a24', v: 0.04 }, ledR: { c: '#7a2a24', v: 0.05 }, ledG: { c: '#2a5a3a', v: 0.05 }, ledB: { c: '#2a3a6a', v: 0.05 }, ledY: { c: '#a8823a', v: 0.05 },
      paper: { c: '#f4ecd8', v: 0.02 }, ink: { c: '#1a1a2a', v: 0.01 }, wax: { c: '#b02030', v: 0.03 }, brass: { c: '#d8a84a', v: 0.05 }, bell: { c: '#c8a050', v: 0.05 }, bellDk: { c: '#a07a34', v: 0.05 },
      coin: { c: '#ffd860', glow: true }, gem: { c: '#5ac8ff', glow: true }, gemR: { c: '#ff3a5a', glow: true }, candle: { c: '#ffe2a0', glow: true }, wick: { c: '#f4ecd8', v: 0.02 }, steel: { c: '#aab0bc', v: 0.04 },
      vase: { c: '#3a7ab0', v: 0.05 }, porc: { c: '#f4f0e8', v: 0.02 }, sack: { c: '#d8c49a', v: 0.06 }, chest: { c: '#6a4428', v: 0.05, pat: 'plank' },
      face: { c: '#f4f0e0', v: 0.02 }, dark: { c: '#2a2420', v: 0.02 },
      frameDk: { c: '#46301e', v: 0.04 }, mullion: { c: '#ece4d0', v: 0.02 }, ironDk: { c: '#33333a', v: 0.03 }, sill: { c: '#b0aaa0', v: 0.04 }, mortar: { c: '#a49c8c', v: 0.04 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: 4, height: () => G, surface: (x, z) => ((x >> 3) + (z >> 3)) % 2 ? B.slab : B.cobble, under: (x, z, y, dep) => dep < 4 ? B.found : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 28, X1 = 181, Z0 = 36, Z1 = 133, TALL = G + 26, LOW = G + 4, IN = G + 12;
      // ── 바닥: 경매장·장부실은 쪽마루(4칸 판, 결 엇갈림), 대회의장은 대리석 격자 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const hall = x >= 78 && x <= 131;
        if (hall) { w.set(x, G, z, ((x >> 2) + (z >> 2)) % 2 ? B.marb : B.marb2); continue; }
        const row = z >> 1, off = (row % 3) * 3;
        w.set(x, G, z, (x + off) % 9 === 0 ? B.parqJ : row % 2 ? B.parq : B.parq2);
      }
      // ── 바깥벽: 북·서는 높게(목골 노란 회벽, 큰 창), 남·동은 낮게 ──
      const wallM = (x, y, z) => {
        const r = y - G;
        if (r <= 2 || r === 25 || r === 26 || r === 12 || r === 13) return B.frame;
        const u = z === Z0 || z === Z0 + 1 ? x : z;
        return (u % 12 === 0 || u % 12 === 1) ? B.frame : B.plasterY;
      };
      w.box(X0, G + 1, Z0, X1, TALL, Z0 + 1, B.found); w.box(X0, G + 1, Z0, X0 + 1, TALL, Z1, B.found);
      for (let y = G + 1; y <= TALL; y++) { for (let x = X0 + 2; x <= X1; x++) w.set(x, y, Z0 + 2, wallM(x, y, Z0)); for (let z = Z0 + 2; z <= Z1; z++) w.set(X0 + 2, y, z, wallM(X0, y, z)); }
      for (let x = X0 + 3; x <= X1; x++) { w.set(x, G + 1, Z0 + 3, B.frameDk); w.set(x, TALL, Z0 + 3, B.frame); }
      for (let z = Z0 + 3; z <= Z1; z++) { w.set(X0 + 3, G + 1, z, B.frameDk); w.set(X0 + 3, TALL, z, B.frame); }
      w.box(X1 - 2, G + 1, Z0, X1, LOW, Z1, B.plasterY); w.box(X0, G + 1, Z1 - 2, X1, LOW, Z1, B.plasterY);
      w.box(X1 - 2, LOW, Z0, X1, LOW, Z1, B.frame); w.box(X0, LOW, Z1 - 2, X1, LOW, Z1, B.frame); w.box(X1 - 2, G + 1, Z0, X1, G + 1, Z1, B.frameDk); w.box(X0, G + 1, Z1 - 2, X1, G + 1, Z1, B.frameDk);
      for (let x = X0; x <= X1; x += 8) w.box(x, LOW + 1, Z1 - 1, x + 1, LOW + 2, Z1, B.found);
      for (let z = Z0; z <= Z1; z += 8) w.box(X1 - 1, LOW + 1, z, X1, LOW + 2, z + 1, B.found);
      for (let x = X0; x <= X1; x++) { w.set(x, TALL + 1, Z0, x % 4 < 2 ? B.trim : B.roofR); w.set(x, TALL + 1, Z0 + 1, B.trim); }
      for (let z = Z0; z <= Z1; z++) { w.set(X0, TALL + 1, z, z % 4 < 2 ? B.trim : B.roofR); w.set(X0 + 1, TALL + 1, z, B.trim); }
      // 큰 창(북·서 벽): 창살 격자, 안쪽 창턱, 위 창틀
      const bigWin = (sx, sz, ax) => {   // ax: 'x'면 북벽(가로), 'z'면 서벽
        for (let r = 0; r < 14; r++) for (let c = 0; c < 6; c++) {
          const x = ax === 'x' ? sx + c : X0, z = ax === 'x' ? Z0 : sz + c;
          const b = (c === 2 || c === 3 || r === 4 || r === 9 || r === 13) ? B.mullion : B.win;
          for (let d = 0; d < 3; d++) w.set(ax === 'x' ? x : X0 + d, G + 7 + r, ax === 'x' ? Z0 + d : z, d === 0 ? b : 0);
        }
        for (let c = -2; c <= 7; c++) { const x = ax === 'x' ? sx + c : X0 + 3, z = ax === 'x' ? Z0 + 3 : sz + c; w.set(x, G + 6, z, B.found); w.set(ax === 'x' ? x : X0 + 2, G + 6, ax === 'x' ? Z0 + 2 : z, B.found); }
        for (let c = -1; c <= 6; c++) { const x = ax === 'x' ? sx + c : X0 + 3, z = ax === 'x' ? Z0 + 3 : sz + c; w.set(x, G + 21, z, B.frame); w.set(x, G + 22, z, B.frameDk); }
      };
      for (const x of [40, 56, 148, 164]) bigWin(x, 0, 'x');
      for (const z of [56, 80, 104]) bigWin(0, z, 'z');

      // ── 칸막이 벽(들보·샛기둥) ──
      const iw = (x0, z0, x1, z1) => {
        w.box(x0, G + 1, z0, x1, IN, z1, B.plasterY); w.box(x0, G + 1, z0, x1, G + 2, z1, B.frameDk); w.box(x0, IN - 1, z0, x1, IN, z1, B.frame);
        const alongZ = z1 - z0 > x1 - x0;
        if (alongZ) { for (let z = z0; z <= z1; z += 8) w.box(x0, G + 3, z, x1, IN - 2, z, B.frame); }
        else for (let x = x0; x <= x1; x += 8) w.box(x, G + 3, z0, x, IN - 2, z1, B.frame);
      };
      const gapW = (x0, z0, x1, z1) => {
        w.box(x0, G + 1, z0, x1, G + 9, z1, 0);
        const alongZ = z1 - z0 > x1 - x0;
        if (alongZ) { w.box(x0, G + 10, z0 - 1, x1, G + 10, z1 + 1, B.trim); w.box(x0, G + 1, z0 - 1, x1, G + 10, z0 - 1, B.frameDk); w.box(x0, G + 1, z1 + 1, x1, G + 10, z1 + 1, B.frameDk); }
        else { w.box(x0 - 1, G + 10, z0, x1 + 1, G + 10, z1, B.trim); w.box(x0 - 1, G + 1, z0, x0 - 1, G + 10, z1, B.frameDk); w.box(x1 + 1, G + 1, z0, x1 + 1, G + 10, z1, B.frameDk); }
      };
      iw(74, Z0 + 4, 77, Z1 - 4);   gapW(74, 60, 77, 65); gapW(74, 104, 77, 109);      // 경매장 | 대회의장
      iw(132, Z0 + 4, 135, 93);     gapW(132, 76, 135, 81);                            // 대회의장 | 장부실
      iw(136, 90, X1 - 3, 93);                                                         // 장부실 | 금고 앞
      iw(78, 58, 131, 61);          gapW(102, 58, 107, 61);                            // 기계실 | 대회의장

      // ── 남쪽 정문(대회의장 축): 대시장 윗광장으로 ──
      const DX0 = 102, DX1 = 107;
      w.box(DX0, G + 1, Z1 - 2, DX1, LOW + 4, Z1, 0);
      for (let y = G + 1; y <= G + 10; y++) for (let x = DX0; x <= DX1; x++) w.set(x, y, Z1, (x === DX0 || x === DX1 || x === DX0 + 2 || x === DX0 + 3 || y === G + 1 || y === G + 10 || y === G + 5) ? B.frame : B.door);
      w.set(DX0 + 1, G + 5, Z1 - 1, B.gold); w.set(DX1 - 1, G + 5, Z1 - 1, B.gold);
      for (const x of [DX0 - 2, DX1 + 1]) { w.box(x, G + 1, Z1 - 2, x + 1, G + 12, Z1, B.white); w.box(x, G + 13, Z1 - 1, x + 1, G + 14, Z1, B.gold); }
      w.box(DX0 - 2, G + 12, Z1, DX1 + 2, G + 12, Z1, B.trim); w.box(DX0 + 2, G + 13, Z1, DX0 + 3, G + 14, Z1, B.bell);
      for (let z = 112; z <= 130; z++) for (let x = DX0 - 2; x <= DX1 + 2; x++) w.set(x, G, z, x <= DX0 - 1 || x >= DX1 + 1 ? B.rugB : (z % 6 === 0 ? B.rugB : B.rug));
      acts.push(OR.goAct({ at: [DX0 + 3, G + 1, Z1 - 6], h: 8, name: '대시장으로 나가기', goto: 'market', hint: '정문을 밀고 나가 종탑 아래 회랑을 지나 대시장 윗광장으로 나가요', hit: [DX0, G + 1, Z1 - 2, DX1, G + 10, Z1] }));

      // ── 대회의장: 긴 회의 탁자(다리·테두리), 등받이 의자, 촛대, 금빛 저울 문장 ──
      for (let z = 68; z <= 117; z++) for (let x = 90; x <= 119; x++) w.set(x, G, z, (x <= 91 || x >= 118 || z <= 69 || z >= 116) ? B.rugB : ((x + z) % 12 === 0 ? B.rugB : B.rugG));
      const TX0 = 98, TX1 = 111, TZ0 = 74, TZ1 = 111, TY = G + 5;
      w.box(TX0, TY, TZ0, TX1, TY, TZ1, B.table); w.box(TX0 - 1, TY, TZ0 - 1, TX1 + 1, TY, TZ0 - 1, B.tableDk); w.box(TX0 - 1, TY, TZ1 + 1, TX1 + 1, TY, TZ1 + 1, B.tableDk);
      w.box(TX0 - 1, TY, TZ0, TX0 - 1, TY, TZ1, B.tableDk); w.box(TX1 + 1, TY, TZ0, TX1 + 1, TY, TZ1, B.tableDk);
      w.box(TX0, TY - 1, TZ0, TX1, TY - 1, TZ0, B.tableDk); w.box(TX0, TY - 1, TZ1, TX1, TY - 1, TZ1, B.tableDk); w.box(TX0, TY - 1, TZ0, TX0, TY - 1, TZ1, B.tableDk); w.box(TX1, TY - 1, TZ0, TX1, TY - 1, TZ1, B.tableDk);
      for (const x of [TX0, TX1]) for (const z of [TZ0, TZ0 + 18, TZ1]) w.box(x, G + 1, z, x, TY - 2, z, B.tableDk);
      const chair = (x, z, dir) => {   // dir: 탁자 쪽 방향(+1 동, -1 서)
        w.box(x - 1, G + 3, z - 1, x + 1, G + 3, z + 1, B.cushion);
        for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) w.box(x + dx, G + 1, z + dz, x + dx, G + 2, z + dz, B.chair);
        const bx = x - dir * 2;
        w.box(bx, G + 1, z - 1, bx, G + 8, z - 1, B.chair); w.box(bx, G + 1, z + 1, bx, G + 8, z + 1, B.chair); w.box(bx, G + 5, z, bx, G + 7, z, B.cushion); w.set(bx, G + 8, z, B.chair); w.set(bx, G + 9, z, B.gold);
      };
      for (let z = 77; z <= 108; z += 6) { chair(TX0 - 4, z, 1); chair(TX1 + 4, z, -1); }
      // 길드장 의자(북쪽 끝): 높은 붉은 등받이와 금빛 꼭대기
      w.box(102, G + 1, 70, 107, G + 3, 72, B.chair); w.box(102, G + 3, 70, 107, G + 3, 72, B.cushR);
      w.box(102, G + 4, 68, 107, G + 12, 69, B.chair); w.box(103, G + 5, 69, 106, G + 11, 69, B.cushR); w.box(102, G + 13, 68, 107, G + 13, 69, B.gold); w.box(104, G + 14, 68, 105, G + 15, 69, B.gold);
      for (const x of [101, 108]) w.box(x, G + 1, 70, x, G + 6, 72, B.chair);
      const tcand = [];
      for (let z = 80; z <= 106; z += 13) { w.box(104, TY + 1, z, 105, TY + 1, z + 1, B.gold); w.box(104, TY + 2, z, 104, TY + 4, z, B.gold); w.set(104, TY + 5, z, B.wick); w.set(104, TY + 6, z, B.candle); tcand.push(z); }
      for (let z = 78; z <= 108; z += 6) { w.box(100, TY + 1, z, 101, TY + 1, z + 2, B.paper); w.box(108, TY + 1, z + 2, 109, TY + 1, z + 4, B.paper); }
      w.set(101, TY + 2, 88, B.ink); w.set(100, TY + 2, 88, B.wick); w.box(108, TY + 2, 96, 109, TY + 2, 97, B.coin);
      // 네 귀퉁이 큰 촛대: 받침, 기둥, 팔 넷, 초
      const candelabra = (x, z) => {
        w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z + 1, B.brass); w.box(x, G + 2, z, x, G + 12, z, B.brass); w.set(x, G + 6, z, B.gold);
        for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { w.set(x + dx, G + 11, z + dz, B.brass); w.set(x + dx * 2, G + 12, z + dz * 2, B.brass); w.set(x + dx * 2, G + 13, z + dz * 2, B.wick); w.set(x + dx * 2, G + 14, z + dz * 2, B.candle); }
        w.set(x, G + 13, z, B.wick); w.set(x, G + 14, z, B.wick); w.set(x, G + 15, z, B.candle);
      };
      for (const [x, z] of [[88, 68], [120, 68], [88, 117], [120, 117]]) candelabra(x, z);
      lights.push({ name: 'council', p: [105, G + 12, 93], c: '#ffd890', i: 1.2, d: 44, flicker: 0.15 });
      lights.push({ p: [88.5, G + 15, 68.5], c: '#ffd890', i: 0.8, d: 28, flicker: 0.2 });
      lights.push({ p: [120.5, G + 15, 117.5], c: '#ffd890', i: 0.8, d: 28, flicker: 0.2 });
      // 금빛 저울 문장(기계실 벽 위 높은 판)
      w.box(90, IN + 1, 58, 119, G + 24, 61, B.plasterY); w.box(90, G + 24, 58, 119, G + 25, 61, B.frame); w.box(90, IN + 1, 58, 91, G + 24, 61, B.frame); w.box(118, IN + 1, 58, 119, G + 24, 61, B.frame);
      w.box(94, G + 13, 62, 115, G + 23, 62, B.frame); w.box(96, G + 15, 62, 113, G + 21, 62, B.cushion);
      w.box(104, G + 14, 63, 105, G + 22, 63, B.gold); w.box(97, G + 22, 63, 112, G + 22, 63, B.gold); w.box(103, G + 14, 63, 106, G + 14, 63, B.gold);
      for (const x of [98, 111]) { w.box(x, G + 18, 63, x, G + 21, 63, B.gold); w.box(x - 2, G + 17, 63, x + 2, G + 17, 63, B.gold); w.box(x - 1, G + 16, 63, x + 1, G + 16, 63, B.gold); }
      // 금빛 저울(대회의장 남쪽 받침대): 접시가 기우뚱거린다
      const SX = 104, SZ = 122;
      w.box(SX - 2, G + 1, SZ - 2, SX + 3, G + 2, SZ + 3, B.found); w.box(SX - 1, G + 3, SZ - 1, SX + 2, G + 3, SZ + 2, B.trim);
      w.box(SX, G + 4, SZ, SX + 1, G + 11, SZ + 1, B.gold); w.box(SX, G + 12, SZ, SX + 1, G + 12, SZ + 1, B.brass);
      const beam = w.prop({ name: 'scaleB', pivot: [SX + 1, G + 14, SZ + 1], axis: 'z' });
      beam.box(SX - 8, G + 13, SZ, SX + 9, G + 14, SZ + 1, B.gold); beam.box(SX, G + 15, SZ, SX + 1, G + 16, SZ + 1, B.gold);
      for (const px of [SX - 8, SX + 9]) {
        beam.box(px, G + 9, SZ, px, G + 12, SZ + 1, B.iron);
        for (let dz = -2; dz <= 3; dz++) for (let dx = -2; dx <= 2; dx++) { if (Math.abs(dx) === 2 && (dz === -2 || dz === 3)) continue; beam.set(px + dx, G + 7, SZ + dz, B.brass); if (Math.abs(dx) === 2 || dz === -2 || dz === 3) beam.set(px + dx, G + 8, SZ + dz, B.brass); }
      }
      beam.box(SX - 9, G + 8, SZ, SX - 7, G + 8, SZ + 1, B.coin); beam.box(SX + 8, G + 8, SZ, SX + 10, G + 9, SZ + 1, B.sack);
      landmarks.push({ name: '대회의장', note: '긴 회의 탁자와 금빛 저울 문장', p: [105, G + 36, 93], tag: 'GUILD' });

      // ── 경매장(서쪽): 경매대와 망치, 의자 줄, 경매 물건 ──
      w.box(40, G + 1, 42, 68, G + 2, 53, B.parq2); w.box(40, G + 1, 54, 68, G + 2, 55, B.frame); for (let x = 40; x <= 68; x += 4) w.box(x, G + 1, 55, x, G + 2, 55, B.frameDk);
      w.box(50, G + 3, 46, 59, G + 8, 49, B.table); w.box(49, G + 9, 45, 60, G + 9, 50, B.tableDk); w.box(51, G + 4, 50, 58, G + 7, 50, B.tableDk); w.box(52, G + 5, 50, 57, G + 6, 50, B.gold);
      w.box(52, G + 10, 46, 53, G + 10, 47, B.paper); w.box(56, G + 10, 48, 57, G + 10, 49, B.brass);
      const gavel = w.prop({ name: 'gavel', pivot: [55, G + 11, 49], axis: 'x' });
      gavel.box(54, G + 11, 48, 55, G + 11, 51, B.wood); gavel.box(54, G + 11, 52, 55, G + 13, 53, B.table); gavel.box(54, G + 10, 52, 55, G + 10, 53, B.brass);
      for (const x of [44, 64]) { w.box(x - 1, G + 3, 42, x + 1, G + 3, 44, B.brass); w.box(x, G + 4, 43, x, G + 14, 43, B.brass); w.set(x, G + 15, 43, B.wick); w.set(x, G + 16, 43, B.candle); }
      lights.push({ name: 'auction', p: [55, G + 16, 45], c: '#ffd890', i: 1, d: 32, flicker: 0.15, srcR: 12 });
      for (let z = 64; z <= 116; z += 8) for (const x0 of [36, 58]) {   // 의자 줄: 다리, 앉는 판, 등받이
        for (let x = x0; x <= x0 + 13; x++) { w.set(x, G + 3, z, B.chair); w.set(x, G + 3, z + 1, B.chair); if ((x - x0) % 3 !== 1) w.box(x, G + 7, z + 2, x, G + 7, z + 2, B.chair); }
        for (let x = x0; x <= x0 + 13; x += 3) { w.box(x, G + 1, z, x, G + 2, z, B.chair); w.box(x, G + 1, z + 2, x, G + 6, z + 2, B.chair); }
        for (let x = x0 + 1; x <= x0 + 12; x += 3) w.box(x, G + 4, z, x + 1, G + 4, z + 1, B.cushR);
      }
      for (let z = 60; z <= 124; z++) for (const x of [52, 53, 54, 55]) w.set(x, G, z, x === 52 || x === 55 ? B.rugB : B.rug);
      // 경매 물건: 도자기 꽃병, 보석함, 말아 둔 융단, 상자
      const lot = (x, z) => { w.box(x - 2, G + 1, z - 2, x + 3, G + 4, z + 3, B.found); w.box(x - 2, G + 5, z - 2, x + 3, G + 5, z + 3, B.trim); };
      lot(38, 48); for (let y = G + 6; y <= G + 13; y++) { const r = y < G + 8 ? 1.4 : y < G + 11 ? 2.2 : 1.2; for (let dz = -2; dz <= 3; dz++) for (let dx = -2; dx <= 3; dx++) if (Math.hypot(dx - 0.5, dz - 0.5) <= r) w.set(38 + dx, y, 48 + dz, (y === G + 9) ? B.porc : B.vase); } w.box(38, G + 14, 48, 39, G + 14, 49, B.porc);
      lot(68, 48); w.box(66, G + 6, 46, 71, G + 8, 51, B.chest); w.box(66, G + 9, 46, 71, G + 9, 51, B.tableDk); w.box(68, G + 7, 52, 69, G + 7, 52, B.gold); w.box(67, G + 10, 47, 68, G + 10, 48, B.coin); w.set(70, G + 10, 49, B.gem);
      for (let z = 120; z <= 128; z++) for (let y = G + 1; y <= G + 4; y++) for (let x = 34; x <= 37; x++) if (Math.hypot(x - 35.5, y - G - 2.5) <= 2.1) w.set(x, y, z, z === 120 || z === 128 ? B.rugB : ((x + y) % 2 ? B.rug : B.rugB));
      for (const [x, z] of [[64, 124], [68, 124], [66, 120]]) w.box(x, G + 1, z, x + 3, G + 4, z + 3, B.crate);
      w.box(65, G + 5, 125, 66, G + 6, 126, B.steel); w.box(69, G + 5, 125, 70, G + 7, 126, B.vase);
      landmarks.push({ name: '경매장', note: '경매대와 망치', p: [55, G + 32, 81] });

      // ── 시계 기계실(북쪽 가운데, 종탑 아래): 맞물린 톱니바퀴, 추, 종과 밧줄 ──
      const gear = (p, cx, cy, cz, r, teeth, depth) => {
        for (let dy = -r - 2; dy <= r + 2; dy++) for (let dx = -r - 2; dx <= r + 2; dx++) {
          const d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
          const tooth = d > r - 0.5 && d <= r + 1.8 && Math.floor((a + Math.PI) / (Math.PI * 2) * teeth * 2) % 2 === 0;
          let b = 0;
          if (d <= r - 0.5 && (d > r - 2.6 || d < 2.4 || Math.abs(dx) < 1 || Math.abs(dy) < 1 || Math.abs(dx - dy) < 0.8 || Math.abs(dx + dy) < 0.8)) b = d < 1.2 ? B.steel : d < 2.4 ? B.brass : B.bell;
          else if (tooth) b = B.brass;
          if (b) for (let k = 0; k < depth; k++) p.set(cx + dx, cy + dy, cz + k, b);
        }
      };
      const g1 = w.prop({ name: 'gear1', pivot: [88.5, G + 15.5, 45], axis: 'z' }); gear(g1, 88, G + 15, 44, 8, 14, 2);
      const g2 = w.prop({ name: 'gear2', pivot: [102.5, G + 19.5, 45], axis: 'z' }); gear(g2, 102, G + 19, 44, 4, 8, 2);
      w.box(88, G + 15, 41, 88, G + 15, 43, B.iron); w.box(102, G + 19, 41, 102, G + 19, 43, B.iron);
      w.box(87, G + 1, 42, 89, G + 4, 43, B.iron);
      w.box(82, G + 1, 41, 95, G + 2, 47, B.found);
      // 시계판 뒷면(북벽 높은 곳)과 추
      for (let dy = -7; dy <= 7; dy++) for (let dx = -7; dx <= 7; dx++) { const d = Math.hypot(dx, dy); if (d <= 7) w.set(116 + dx, G + 19 + dy, Z0 + 3, d > 5.6 ? B.gold : (d > 4.2 && d < 5 && (dx === 0 || dy === 0)) ? B.iron : B.face); }
      const hands = w.prop({ name: 'hands', pivot: [116.5, G + 19.5, Z0 + 4.5], axis: 'z' });
      hands.box(116, G + 19, Z0 + 4, 116, G + 24, Z0 + 4, B.iron); hands.box(117, G + 19, Z0 + 4, 119, G + 19, Z0 + 4, B.iron); hands.set(116, G + 19, Z0 + 4, B.gold);
      w.box(110, G + 26, 44, 122, G + 26, 45, B.wood);
      const pend = w.prop({ name: 'pend', pivot: [116.5, G + 26, 47.5], axis: 'z' });
      pend.box(116, G + 8, 47, 116, G + 25, 47, B.iron); pend.box(114, G + 3, 46, 119, G + 7, 48, B.brass); pend.box(115, G + 4, 46, 118, G + 6, 46, B.gold);
      for (const x of [124, 127]) { w.box(x, G + 12, 44, x, G + 25, 44, B.iron); w.box(x - 1, G + 6, 43, x + 1, G + 11, 45, B.found); }
      // 종(종루 들보에 매단 작은 새벽 종)과 종 밧줄
      for (const x of [80, 96]) w.box(x, G + 1, 50, x + 1, G + 33, 51, B.frame);
      w.box(80, G + 32, 50, 97, G + 33, 51, B.frame); w.line(82, G + 28, 50, 86, G + 32, 50, B.frame); w.line(95, G + 28, 50, 91, G + 32, 50, B.frame);
      const gbell = w.prop({ name: 'gbell', pivot: [88.5, G + 31.5, 51], axis: 'x' });
      gbell.box(88, G + 29, 50, 89, G + 31, 51, B.iron);
      [3.6, 3.4, 3.0, 2.8, 2.7, 2.6, 2.3, 1.6].forEach((r, k) => { const y = G + 21 + k; for (let dz = -4; dz <= 5; dz++) for (let dx = -4; dx <= 5; dx++) { const d = Math.hypot(dx - 0.5, dz - 0.5); if (d <= r && (k >= 6 || d > r - 1.3)) gbell.set(88 + dx, y, 50 + dz, k <= 1 ? B.bellDk : B.bell); } });
      gbell.box(88, G + 20, 50, 89, G + 21, 51, B.iron);
      const brope = w.prop({ name: 'brope', pivot: [92.5, G + 30, 53.5] });
      brope.box(92, G + 6, 53, 92, G + 29, 53, B.rope); brope.box(92, G + 3, 53, 92, G + 5, 53, B.cushR); brope.set(92, G + 2, 53, B.gold);
      w.set(92, G + 30, 53, B.iron); w.box(92, G + 31, 51, 92, G + 31, 53, B.iron);
      lights.push({ p: [112.5, G + 11, 51.5], c: '#ffd890', i: 0.7, d: 24, flicker: 0.1 });
      w.box(112, G + 1, 53, 113, G + 8, 54, B.iron); w.set(112, G + 9, 54, B.wick); w.set(112, G + 10, 54, B.candle);
      for (const [x, z] of [[124, 52], [126, 54], [82, 54]]) w.box(x, G + 1, z, x + 3, G + 4, z + 3, B.crate);
      landmarks.push({ name: '시계 기계실', note: '종탑 아래 맞물린 톱니바퀴', p: [101, G + 40, 47] });

      // ── 장부실(동쪽 북): 책등이 보이는 장부 서가, 계산 탁자, 도장 책상 ──
      const leds = [B.ledR, B.ledG, B.ledB, B.ledY];
      const lshelf = (x0, x1, z, h) => {   // 칸마다 높이가 다른 책등
        for (let x = x0; x <= x1; x++) for (let y = G + 1; y <= G + h; y++) {
          const r = (y - G - 1) % 4, side = x === x0 || x === x1 || y === G + h || y === G + 1;
          if (side || r === 0) { w.set(x, y, z, B.shelf); continue; }
          const book = hash3(x, (y - G - 1) >> 2, z), top = book > 0.7 ? 3 : book > 0.25 ? 2 : 1;
          w.set(x, y, z, r <= top && book > 0.08 ? leds[(book * 40 | 0) % 4] : B.dark);
        }
      };
      lshelf(138, 175, Z0 + 3, 17); lshelf(138, 175, Z0 + 4, 17);
      for (const z of [54, 55, 66, 67]) lshelf(144, 170, z, 11);
      w.box(146, TY, 78, 168, TY, 85, B.table); w.box(146, TY - 1, 78, 168, TY - 1, 78, B.tableDk); w.box(146, TY - 1, 85, 168, TY - 1, 85, B.tableDk);
      for (const x of [146, 168]) for (const z of [78, 85]) w.box(x, G + 1, z, x, TY - 2, z, B.tableDk);
      for (let x = 148; x <= 166; x += 6) {
        w.box(x, TY + 1, 80, x + 2, TY + 1, 82, B.paper); w.box(x + 3, TY + 1, 82, x + 3, TY + 2, 83, leds[x % 4]);
        w.box(x, G + 3, 88, x + 2, G + 3, 89, B.chair); for (const dx of [0, 2]) w.box(x + dx, G + 1, 88, x + dx, G + 2, 89, B.chair);
      }
      for (const [x, z] of [[152, 80], [160, 83], [164, 80]]) { w.set(x, TY + 2, z, B.coin); w.set(x, TY + 3, z, B.coin); }
      // 도장 책상(문 옆)
      w.box(138, TY, 70, 143, TY, 73, B.table); for (const [x, z] of [[138, 70], [143, 70], [138, 73], [143, 73]]) w.box(x, G + 1, z, x, TY - 1, z, B.tableDk);
      w.set(138, TY + 1, 70, B.ink); w.box(140, TY + 1, 72, 143, TY + 1, 73, B.paper); w.box(142, TY + 1, 70, 143, TY + 1, 71, B.wax);
      const stamp = w.prop({ name: 'stamp', pivot: [141, TY + 1, 71] });
      stamp.box(140, TY + 1, 70, 141, TY + 1, 71, B.brass); stamp.box(140, TY + 2, 70, 141, TY + 3, 71, B.wood); stamp.box(140, TY + 4, 70, 141, TY + 4, 71, B.gold);
      w.box(173, G + 1, 60, 175, G + 6, 63, B.chest); w.box(173, G + 7, 60, 175, G + 7, 63, B.tableDk);
      for (const z of [76, 79]) for (let y = G + 1; y <= G + 4; y++) w.box(174, y, z, 176, y, z + 2, y === G + 4 ? B.rope : B.sack);
      w.box(138, G + 1, 86, 139, G + 1, 87, B.brass); w.box(138, G + 2, 86, 138, G + 9, 86, B.brass); w.set(138, G + 10, 86, B.wick); w.set(138, G + 11, 86, B.candle);
      lights.push({ name: 'ledger', p: [139, G + 12, 85], c: '#ffd890', i: 0.9, d: 28, flicker: 0.15 });
      landmarks.push({ name: '장부실', note: '길드의 모든 거래가 적힌 장부', p: [157, G + 32, 65] });

      // ── 금고(동쪽 남): 두꺼운 돌벽과 둥근 쇠문 ──
      const VX0 = 148, VX1 = 175, VZ0 = 98, VZ1 = 127;
      w.box(VX0, G + 1, VZ0, VX1, G + 14, VZ1, B.vault); w.box(VX0 + 3, G + 1, VZ0 + 3, VX1 - 3, G + 14, VZ1 - 3, 0);
      w.walls(VX0, G + 14, VZ0, VX1, G + 14, VZ1, B.iron); w.walls(VX0 + 1, G + 14, VZ0 + 1, VX1 - 1, G + 14, VZ1 - 1, B.ironDk); w.walls(VX0, G + 8, VZ0, VX1, G + 8, VZ1, B.iron);
      for (let x = VX0; x <= VX1; x += 4) for (const z of [VZ0, VZ1]) { w.set(x, G + 15, z, B.steel); w.set(x, G + 8, z, B.steel); }
      for (let z = VZ0; z <= VZ1; z += 4) w.set(VX1, G + 15, z, B.steel);
      w.box(VX0 + 3, G, VZ0 + 3, VX1 - 3, G, VZ1 - 3, B.found);
      // 쇠문 자리(서쪽 면): 둥근 문틀과 둥근 쇠문(바퀴 손잡이)
      const VDZ = 112, DR = 5.4, DCY = G + 6.5;
      for (let z = VDZ - 7; z <= VDZ + 7; z++) for (let y = G + 1; y <= G + 13; y++) {
        const r = Math.hypot(z - VDZ, y - DCY);
        if (r <= DR) for (let x = VX0; x <= VX0 + 2; x++) w.set(x, y, z, 0);
        else if (r <= DR + 1.3) w.set(VX0 - 1, y, z, B.iron);
      }
      const vdoor = w.prop({ name: 'vdoor', pivot: [VX0, G + 1, VDZ - 5] });
      for (let z = VDZ - 5; z <= VDZ + 5; z++) for (let y = G + 1; y <= G + 12; y++) {
        const r = Math.hypot(z - VDZ, y - DCY); if (r > DR) continue;
        vdoor.set(VX0, y, z, r < 1.5 ? B.gold : r > DR - 1 ? B.iron : B.steel); vdoor.set(VX0 + 1, y, z, B.iron);
        if (r > 2.6 && r < 3.4) vdoor.set(VX0 - 1, y, z, B.brass);
      }
      for (const [dz, dy] of [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-2, 0], [2, 0], [0, -2], [0, 2]]) vdoor.set(VX0 - 1, Math.round(DCY + dy), VDZ + dz, dz === 0 && dy === 0 ? B.gold : B.brass);
      // 금고 안: 금화 더미, 자루, 보석함
      for (let i = 0; i < 1600; i++) { const x = w.ri(VX0 + 4, VX1 - 4), z = w.ri(VZ0 + 4, VZ1 - 4); if (x < VX0 + 10 && Math.abs(z - VDZ) < 6) continue; let y = G + 1; while (w.get(x, y, z)) y++; if (y < G + 7) w.set(x, y, z, hash3(x, y, z) > 0.75 ? B.coin : B.gold); }
      for (const [x, z] of [[168, 104], [168, 118], [160, 120]]) { w.box(x, G + 1, z, x + 3, G + 4, z + 2, B.chest); w.box(x, G + 5, z, x + 3, G + 5, z + 2, B.tableDk); w.box(x + 1, G + 6, z + 1, x + 2, G + 6, z + 1, B.coin); }
      w.set(166, G + 8, 112, B.gem); w.set(162, G + 6, 106, B.gemR); w.set(156, G + 6, 118, B.gem);
      lights.push({ name: 'vault', p: [161, G + 10, 113], c: '#ffd070', i: 0.9, d: 32, flicker: 0.05 });
      for (let y = G + 1; y <= G + 3; y++) w.box(140, y, 100, 142, y, 102, y === G + 3 ? B.rope : B.sack);
      w.box(140, G + 1, 124, 143, G + 4, 127, B.crate);
      landmarks.push({ name: '길드 금고', note: '둥근 쇠문 너머 금화 더미', p: [161, G + 28, 113] });

      // ── 상호작용 ──
      acts.push({
        name: '경매 망치', hint: '경매대 망치가 탕탕탕 세 번 내려치자 낙찰을 알리는 금화가 튀어 올라요', hit: [48, G + 1, 44, 60, G + 14, 53],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.tween('gavel', { off: [0, 4, 0], rot: [-0.9, 0, 0] }, 0.35); await a.tween('gavel', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.15, t => t * t); a.burst([55, G + 11, 53], { n: 14, colors: ['#ffd860', '#ffffff'], speed: 6, up: 6, life: 0.8, gravity: 6, spread: 2 }); await a.wait(0.25); }
          a.flash('auction', 2.4, 1.5); a.burst([55, G + 18, 49], { n: 40, colors: ['#ffd860', '#ffe8a0', '#ffffff'], speed: 8, up: 8, life: 1.4, gravity: 6, spread: 4 });
          await a.wait(1);
        },
      });
      acts.push({
        name: '장부 도장', hint: '길드 도장이 장부 위로 쿵 내려앉고 붉은 인주가 번져요', hit: [138, G + 1, 70, 143, TY + 5, 73],
        run: async a => {
          for (let k = 0; k < 2; k++) {
            await a.tween('stamp', { off: [0, 4.8, 2], rot: [0, 0.5, 0] }, 0.45);
            await a.tween('stamp', { off: [k ? 2 : 0, 0, 2], rot: [0, 0, 0] }, 0.2, t => t * t);
            a.burst([141 + k * 2, TY + 2, 73], { n: 18, colors: ['#b02030', '#ff5a6a', '#ffe8a0'], speed: 5, up: 3, life: 0.7, gravity: 4, spread: 1.6 });
            await a.wait(0.3);
          }
          a.flash('ledger', 2, 1); await a.tween('stamp', { off: [0, 0, 0] }, 0.5);
        },
      });
      acts.push({
        name: '금고 열기', hint: '손잡이를 돌리자 둥근 쇠문이 묵직하게 열리고 금화 더미가 번쩍여요', hit: [VX0 - 4, G + 1, VDZ - 6, VX0 + 2, G + 12, VDZ + 6],
        run: async a => {
          await a.turn('vdoor', [0, 1.6, 0], 2.2);
          a.flash('vault', 4, 4); a.glow(1.5, 3);
          for (let k = 0; k < 6; k++) { a.burst([161, G + 8, 113], { n: 26, colors: ['#ffd860', '#ffffff', '#5ac8ff', '#ff3a5a'], speed: 6, up: 8, life: 1.4, gravity: 5, spread: 5 }); await a.wait(0.45); }
          await a.wait(0.8); await a.turn('vdoor', [0, 0, 0], 2);
        },
      });
      acts.push({
        name: '시계 태엽 감기', hint: '태엽을 감자 큰 톱니바퀴와 작은 톱니가 맞물려 돌고 추가 흔들리며 시곗바늘이 빙글 돌아요', hit: [80, G + 1, 40, 124, G + 26, 48],
        run: async a => {
          const swing = async () => { for (const amp of [0.5, 0.45, 0.4, 0.3]) { await a.turn('pend', [0, 0, amp], 0.5); await a.turn('pend', [0, 0, -amp], 0.5); } await a.turn('pend', [0, 0, 0], 0.4); };
          await Promise.all([a.turn('gear1', [0, 0, Math.PI * 2], 4.4, t => t), a.turn('gear2', [0, 0, -Math.PI * 4], 4.4, t => t), a.turn('hands', [0, 0, -Math.PI * 4], 4.4), swing()]);
          a.unwind('gear1'); a.unwind('gear2'); a.unwind('hands');
          a.burst([116.5, G + 19.5, Z0 + 6], { n: 24, colors: ['#ffe8a0', '#ffd860', '#ffffff'], speed: 6, up: 4, life: 1, gravity: 2, spread: 4 });
        },
      });
      acts.push({
        name: '새벽 종 울리기', hint: '종 밧줄을 당기자 들보에 매단 새벽 종이 댕댕 울려 장이 열림을 알려요', hit: [80, G + 1, 49, 97, G + 33, 55],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.move('brope', [0, -4, 0], 0.3), a.turn('gbell', [0.6, 0, 0], 0.35)]);
            a.burst([88.5, G + 34, 51], { n: 18, colors: ['#ffffff', '#ffe8a0'], speed: 12, up: 2, life: 1.1, gravity: 0, spread: 4, flat: true });
            await Promise.all([a.move('brope', [0, 0, 0], 0.3), a.turn('gbell', [-0.6, 0, 0], 0.35)]);
          }
          await a.turn('gbell', [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '회의 촛불', hint: '회의가 열리자 탁자 위 촛불과 네 귀퉁이 큰 촛대가 차례로 환하게 타올라요', hit: [TX0, G + 1, TZ0, TX1, TY + 6, TZ1],
        run: async a => {
          a.flash('council', 3, 4.5); a.glow(1.4, 4);
          for (const z of tcand) { a.burst([104.5, TY + 7, z + 0.5], { n: 14, colors: ['#ffe2a0', '#ffb04a', '#ffffff'], speed: 2, up: 5, life: 1, gravity: -1, spread: 1 }); await a.wait(0.3); }
          for (const [x, z] of [[88, 68], [120, 68], [120, 117], [88, 117]]) { a.burst([x + 0.5, G + 16, z + 0.5], { n: 20, colors: ['#ffe2a0', '#ffb04a', '#ffffff'], speed: 2.8, up: 6, life: 1.1, gravity: -1, spread: 2 }); await a.wait(0.35); }
        },
      });
      acts.push({
        name: '금빛 저울', hint: '길드 문장의 금빛 저울에 금화와 곡식 자루를 올리자 접시가 기우뚱거리다 수평을 잡아요', hit: [SX - 10, G + 1, SZ - 2, SX + 11, G + 16, SZ + 3],
        run: async a => {
          for (const amp of [0.4, -0.3, 0.2, -0.12, 0.05]) await a.turn('scaleB', [0, 0, amp], 0.45);
          await a.turn('scaleB', [0, 0, 0], 0.4);
          a.burst([SX + 1, G + 16, SZ + 1], { n: 22, colors: ['#ffd860', '#ffffff'], speed: 4, up: 4, life: 1, gravity: 1, spread: 3 });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
