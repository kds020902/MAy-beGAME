// 상인 길드 회관(하위 지도) — 대시장 윗광장 북쪽 길드 회관 1층. 가운데 대회의장과 긴 회의 탁자, 서쪽 경매장, 동쪽 장부실과 금고, 북쪽 종탑 아래 시계 기계실 (대시장의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 남쪽·동쪽 바깥벽은 낮게 잘라 기본 시점(남동쪽)에서 방 안이 보인다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const { KP } = window.KINGDOM;
  const W = 104, D = 88, Hh = 64;
  MAPS.push({
    id: 'market-guildhall', cat: 'kingdom', sub: true, parent: 'market', name: '상인 길드 회관', en: 'Merchants\' Guildhall', color: '#e8a050', seed: 2011, base: 22, time: 'day', size: [W, D, Hh],
    desc: '대시장 윗광장 북쪽, 종탑을 얹은 상인 길드 회관의 1층. 가운데 대회의장에는 길드장들이 둘러앉는 긴 탁자와 금빛 저울 문장이 있고, 서쪽 경매장에서는 망치 소리와 함께 값이 매겨진다. 동쪽에는 장부실과 두꺼운 쇠문의 금고, 북쪽 종탑 아래에는 큰 톱니바퀴가 맞물려 도는 시계 기계실이 있다.',
    info: { title: '장소 정보', en: 'GUILDHALL', rows: [['위치', '대시장 윗광장 북쪽'], ['방', '대회의장 · 경매장 · 장부실 · 금고 · 시계 기계실'], ['명물', '금빛 저울 문장 · 경매 망치 · 쇠문 금고'], ['소문', '길드장은 금화 한 닢도 잊지 않는다']] },
    sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false,
    hemi: ['#fff4e8', '#5a4a3a', 0.6], sun: ['#fff0d8', 0.74, [0.45, 1, 0.55]],
    night: { sky: ['#283048', '#080a16', '#d8a068'], stars: true, hemi: ['#c8c0d8', '#201a18', 0.46], sun: ['#d0d8ff', 0.34, [0.45, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.6,
    fog: { start: 0.92, floor: 10, depth: 8 },
    camY: -4, zoom: 1.75,
    particles: [
      { n: 110, colors: ['#fff4d0', '#ffffff'], mode: 'drift', speed: 0.12, area: [52, 42, 36], y0: 24, y1: 38, glow: false },
      { n: 30, colors: ['#ffe08a', '#f4d060'], mode: 'drift', speed: 0.2, area: [80, 56, 6], y0: 24, y1: 30, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      parq: { c: '#8a5a34', top: '#a06c40', v: 0.05, pat: 'plank' }, parq2: { c: '#7a4e2c', top: '#8c5e36', v: 0.05, pat: 'plank' },
      marb: { c: '#d8ccb4', top: '#e4d8bc', v: 0.03, pat: 'check', alt: '#a88e68' }, vault: { c: '#6a6a72', v: 0.05, pat: 'brick' },
      table: { c: '#6a3e22', v: 0.05, pat: 'plank' }, chair: { c: '#4a2e1c', v: 0.04 }, cushion: { c: '#3a7a5a', v: 0.03 }, cushR: { c: '#a02a34', v: 0.03 },
      rug: { c: '#a02a34', top: '#a82c36', v: 0.03 }, rugG: { c: '#2e6a4a', top: '#34724e', v: 0.03 }, rugB: { c: '#c8a050', top: '#d0a850', v: 0.03 },
      shelf: { c: '#5a3a24', v: 0.04 }, ledR: { c: '#7a2a24', v: 0.05 }, ledG: { c: '#2a5a3a', v: 0.05 }, ledB: { c: '#2a3a6a', v: 0.05 }, ledY: { c: '#a8823a', v: 0.05 },
      paper: { c: '#f4ecd8', v: 0.02 }, ink: { c: '#1a1a2a', v: 0.01 }, wax: { c: '#b02030', v: 0.03 }, brass: { c: '#d8a84a', v: 0.05 }, bell: { c: '#c8a050', v: 0.05 },
      coin: { c: '#ffd860', glow: true }, gem: { c: '#5ac8ff', glow: true }, gemR: { c: '#ff3a5a', glow: true }, candle: { c: '#ffe2a0', glow: true }, steel: { c: '#aab0bc', v: 0.04 },
      vase: { c: '#3a7ab0', v: 0.05 }, porc: { c: '#f4f0e8', v: 0.02 }, sack: { c: '#d8c49a', v: 0.06 }, chest: { c: '#6a4428', v: 0.05, pat: 'plank' },
      face: { c: '#f4f0e0', v: 0.02 }, dark: { c: '#2a2420', v: 0.02 },
    }),
    build(w) {
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: 2, height: () => G, surface: (x, z) => ((x >> 2) + (z >> 2)) % 2 ? B.slab : B.cobble, under: (x, z, y, dep) => dep < 2 ? B.found : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 14, X1 = 90, Z0 = 18, Z1 = 66, TALL = G + 13, LOW = G + 2, IN = G + 6;
      // ── 바닥: 경매장·장부실은 쪽마루, 대회의장은 대리석 격자 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const hall = x >= 39 && x <= 65;
        w.set(x, G, z, hall ? B.marb : ((x + (z >> 1)) % 4 === 0 ? B.parq2 : B.parq));
      }
      // ── 바깥벽: 북·서는 높게(목골 노란 회벽, 큰 창), 남·동은 낮게 ──
      const wallM = (x, y, z) => (y === G + 1 || y === TALL || (y - G) % 6 === 0) ? B.frame : (x % 6 === 0 || z % 6 === 0) && (x === X0 || z === Z0) ? B.frame : B.plasterY;
      for (let y = G + 1; y <= TALL; y++) { for (let x = X0; x <= X1; x++) w.set(x, y, Z0, wallM(x, y, Z0)); for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, wallM(X0, y, z)); }
      w.box(X0, G + 1, Z0 + 1, X1, TALL, Z0 + 1, B.found); w.box(X0 + 1, G + 1, Z0, X0 + 1, TALL, Z1, B.found);
      w.box(X1 - 1, G + 1, Z0, X1, LOW, Z1, B.plasterY); w.box(X0, G + 1, Z1 - 1, X1, LOW, Z1, B.plasterY);
      w.box(X1 - 1, LOW, Z0, X1, LOW, Z1, B.frame); w.box(X0, LOW, Z1 - 1, X1, LOW, Z1, B.frame);
      for (let x = X0; x <= X1; x += 4) w.set(x, LOW + 1, Z1, B.found);
      for (let z = Z0; z <= Z1; z += 4) w.set(X1, LOW + 1, z, B.found);
      for (let x = X0; x <= X1; x++) w.set(x, TALL + 1, Z0, x % 2 ? B.trim : B.roofR);
      for (let z = Z0; z <= Z1; z++) w.set(X0, TALL + 1, z, z % 2 ? B.trim : B.roofR);
      // 큰 창(북·서 벽): 햇빛이 드는 유리
      for (const x of [20, 28, 74, 82]) { w.box(x, G + 4, Z0, x + 2, G + 10, Z0 + 1, B.win); w.box(x - 1, G + 3, Z0 + 2, x + 3, G + 3, Z0 + 2, B.found); w.box(x - 1, G + 11, Z0 + 1, x + 3, G + 11, Z0 + 1, B.frame); }
      for (const z of [28, 40, 52]) { w.box(X0, G + 4, z, X0 + 1, G + 10, z + 2, B.win); w.box(X0 + 2, G + 3, z - 1, X0 + 2, G + 3, z + 3, B.found); }

      // ── 칸막이 벽 ──
      const iw = (x0, z0, x1, z1) => { w.box(x0, G + 1, z0, x1, IN, z1, B.plasterY); w.box(x0, G + 1, z0, x1, G + 1, z1, B.frame); w.box(x0, IN, z0, x1, IN, z1, B.frame); };
      const gapW = (x0, z0, x1, z1) => { w.box(x0, G + 1, z0, x1, G + 4, z1, 0); };
      iw(37, Z0 + 2, 38, Z1 - 2);  gapW(37, 30, 38, 32); gapW(37, 52, 38, 54);     // 경매장 | 대회의장
      iw(66, Z0 + 2, 67, 46);      gapW(66, 38, 67, 40);                            // 대회의장 | 장부실
      iw(68, 45, X1 - 2, 46);                                                       // 장부실 | 금고 앞
      iw(39, 29, 65, 30);          gapW(51, 29, 53, 30);                            // 기계실 | 대회의장
      for (const [x0, z0, x1, z1] of [[37, 29, 38, 33], [37, 51, 38, 55], [66, 37, 67, 41], [50, 29, 54, 30]]) {
        const alongZ = z1 - z0 > x1 - x0;
        if (alongZ) { w.box(x0, G + 5, z0 + 1, x1, G + 5, z1 - 1, B.trim); } else { w.box(x0 + 1, G + 5, z0, x1 - 1, G + 5, z1, B.trim); }
      }

      // ── 남쪽 정문(대회의장 축): 대시장 윗광장으로 ──
      const DX0 = 51, DX1 = 53;
      w.box(DX0, G + 1, Z1 - 1, DX1, LOW + 1, Z1, 0);
      w.box(DX0, G + 1, Z1, DX1, G + 5, Z1, B.door); w.box(DX0 + 1, G + 1, Z1, DX0 + 1, G + 5, Z1, B.frame);
      for (const x of [DX0 - 1, DX1 + 1]) { w.box(x, G + 1, Z1 - 1, x, G + 6, Z1, B.white); w.set(x, G + 7, Z1, B.gold); }
      w.box(DX0 - 1, G + 6, Z1, DX1 + 1, G + 6, Z1, B.trim); w.set(DX0 + 1, G + 7, Z1, B.bell);
      for (let z = 56; z <= 64; z++) for (let x = DX0 - 1; x <= DX1 + 1; x++) w.set(x, G, z, x === DX0 - 1 || x === DX1 + 1 ? B.rugB : B.rug);
      acts.push(OR.goAct({ at: [DX0 + 1, G + 1, Z1 - 3], h: 4, name: '대시장으로 나가기', goto: 'market', hint: '정문을 밀고 나가 종탑 아래 회랑을 지나 대시장 윗광장으로 나가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 5, Z1] }));

      // ── 대회의장: 긴 회의 탁자, 의자, 촛대, 금빛 저울 문장 ──
      for (let z = 34; z <= 58; z++) for (let x = 45; x <= 59; x++) w.set(x, G, z, (x === 45 || x === 59 || z === 34 || z === 58) ? B.rugB : B.rugG);
      w.box(49, G + 1, 37, 55, G + 2, 55, B.table); w.box(50, G + 1, 38, 54, G + 1, 54, 0);
      for (let z = 38; z <= 54; z += 3) for (const [x, bx] of [[47, 46], [57, 58]]) { w.set(x, G + 1, z, B.cushion); w.set(bx, G + 1, z, B.chair); w.set(bx, G + 2, z, B.chair); w.set(bx, G + 3, z, B.chair); }
      w.box(51, G + 1, 35, 53, G + 1, 35, B.cushR); w.box(51, G + 2, 34, 53, G + 5, 34, B.cushR); w.box(51, G + 6, 34, 53, G + 6, 34, B.gold); w.set(52, G + 7, 34, B.gold);
      const tcand = [];
      for (let z = 39; z <= 53; z += 7) { w.set(52, G + 3, z, B.gold); w.set(52, G + 4, z, B.candle); tcand.push(z); }
      for (let z = 40; z <= 52; z += 3) { w.set(50, G + 3, z, B.paper); w.set(54, G + 3, z + 1, B.paper); }
      w.set(50, G + 3, 44, B.ink); w.set(54, G + 3, 48, B.coin);
      for (const [x, z] of [[44, 34], [60, 34], [44, 58], [60, 58]]) { w.box(x, G + 1, z, x, G + 6, z, B.brass); w.box(x - 1, G + 6, z, x + 1, G + 6, z, B.brass); w.box(x, G + 6, z - 1, x, G + 6, z + 1, B.brass); for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1], [0, 0]]) w.set(x + dx, G + 7, z + dz, B.candle); }
      lights.push({ name: 'council', p: [52.5, G + 6, 46.5], c: '#ffd890', i: 1.2, d: 22, flicker: 0.15 });
      lights.push({ p: [44.5, G + 8, 34.5], c: '#ffd890', i: 0.8, d: 14, flicker: 0.2 });
      lights.push({ p: [60.5, G + 8, 58.5], c: '#ffd890', i: 0.8, d: 14, flicker: 0.2 });
      // 금빛 저울 문장(기계실 벽 위 높은 판)
      w.box(45, IN + 1, 29, 59, G + 12, 30, B.plasterY); w.box(45, G + 12, 29, 59, G + 12, 30, B.frame); w.box(45, IN + 1, 29, 45, G + 12, 30, B.frame); w.box(59, IN + 1, 29, 59, G + 12, 30, B.frame);
      w.box(47, G + 7, 31, 57, G + 11, 31, B.frame); w.box(48, G + 8, 31, 56, G + 10, 31, B.cushion);
      w.box(52, G + 7, 32, 52, G + 11, 32, B.gold); w.box(48, G + 11, 32, 56, G + 11, 32, B.gold);
      for (const x of [48, 56]) { w.set(x, G + 10, 32, B.gold); w.box(x - 1, G + 9, 32, x + 1, G + 9, 32, B.gold); }
      w.box(50, G + 7, 32, 54, G + 7, 32, B.gold);
      // 금빛 저울(대회의장 남쪽 받침대): 접시가 기우뚱거린다
      const SX = 52, SZ = 61;
      w.box(SX - 1, G + 1, SZ - 1, SX + 1, G + 1, SZ + 1, B.found); w.box(SX, G + 2, SZ, SX, G + 5, SZ, B.gold); w.set(SX, G + 6, SZ, B.gold);
      const beam = w.prop({ name: 'scaleB', pivot: [SX + 0.5, G + 6.5, SZ + 0.5], axis: 'z' });
      beam.box(SX - 4, G + 7, SZ, SX + 4, G + 7, SZ, B.gold);
      for (const dx of [-4, 4]) { beam.box(SX + dx, G + 5, SZ, SX + dx, G + 6, SZ, B.iron); beam.box(SX + dx - 1, G + 4, SZ - 1, SX + dx + 1, G + 4, SZ + 1, B.brass); }
      beam.set(SX - 4, G + 5, SZ, B.coin); beam.set(SX + 4, G + 5, SZ, B.sack);
      landmarks.push({ name: '대회의장', note: '긴 회의 탁자와 금빛 저울 문장', p: [52.5, G + 18, 46.5], tag: 'GUILD' });

      // ── 경매장(서쪽): 경매대와 망치, 의자 줄, 경매 물건 ──
      w.box(20, G + 1, 21, 34, G + 1, 26, B.parq2); w.box(20, G + 1, 27, 34, G + 1, 27, B.frame);
      w.box(25, G + 2, 23, 29, G + 4, 24, B.table); w.box(25, G + 5, 23, 29, G + 5, 24, B.frame); w.box(26, G + 3, 25, 28, G + 3, 25, B.gold);
      w.set(26, G + 6, 23, B.paper); w.set(28, G + 6, 24, B.brass);
      const gavel = w.prop({ name: 'gavel', pivot: [27.5, G + 6, 24.5], axis: 'x' });
      gavel.box(27, G + 6, 24, 27, G + 6, 25, B.wood); gavel.box(27, G + 6, 26, 27, G + 7, 26, B.table);
      w.box(22, G + 2, 21, 22, G + 7, 21, B.brass); w.box(32, G + 2, 21, 32, G + 7, 21, B.brass); w.set(22, G + 8, 21, B.candle); w.set(32, G + 8, 21, B.candle);
      lights.push({ name: 'auction', p: [27.5, G + 8, 22.5], c: '#ffd890', i: 1, d: 16, flicker: 0.15, srcR: 6 });
      for (let z = 32; z <= 58; z += 4) for (const x0 of [18, 29]) { w.box(x0, G + 1, z, x0 + 6, G + 1, z, B.chair); w.box(x0, G + 2, z + 1, x0 + 6, G + 2, z + 1, B.chair); for (let x = x0; x <= x0 + 6; x += 2) w.set(x, G + 1, z + 1, B.chair); w.box(x0 + 1, G + 2, z, x0 + 5, G + 2, z, 0); }
      for (let z = 30; z <= 62; z++) for (const x of [26, 27]) w.set(x, G, z, B.rug);
      // 경매 물건: 도자기 꽃병, 말아 둔 융단, 보석함, 갑옷 대신 은 촛대 한 쌍
      const lot = (x, z) => { w.box(x - 1, G + 1, z - 1, x + 1, G + 2, z + 1, B.found); w.set(x, G + 3, z, B.trim); };
      lot(17 + 2, 22 + 2); w.box(19, G + 4, 24, 19, G + 6, 24, B.vase); w.set(19, G + 7, 24, B.porc);
      lot(35 - 1, 24); w.box(33, G + 4, 23, 35, G + 4, 25, B.chest); w.set(34, G + 5, 24, B.coin); w.set(33, G + 5, 24, B.gem);
      w.box(17, G + 1, 60, 17, G + 1, 64, B.rug); w.box(18, G + 1, 60, 18, G + 1, 64, B.rugB); w.box(17, G + 2, 60, 18, G + 2, 64, B.rug);
      w.box(32, G + 1, 62, 35, G + 2, 63, B.crate); w.set(33, G + 3, 62, B.steel); w.set(34, G + 3, 63, B.vase);
      landmarks.push({ name: '경매장', note: '경매대와 망치', p: [27.5, G + 16, 40.5] });

      // ── 시계 기계실(북쪽 가운데, 종탑 아래): 맞물린 톱니바퀴, 추, 종과 밧줄 ──
      const gear = (p, cx, cy, cz, r, teeth) => {
        for (let dy = -r - 1; dy <= r + 1; dy++) for (let dx = -r - 1; dx <= r + 1; dx++) {
          const d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
          const tooth = d > r - 0.4 && d <= r + 1 && Math.floor((a + Math.PI) / (Math.PI * 2) * teeth * 2) % 2 === 0;
          if (d <= r - 0.4 && (d > r - 1.6 || d < 1.2 || Math.abs(dx) < 0.6 || Math.abs(dy) < 0.6)) p.set(cx + dx, cy + dy, cz, d < 1.2 ? B.steel : B.brass);
          else if (tooth) p.set(cx + dx, cy + dy, cz, B.brass);
        }
      };
      const g1 = w.prop({ name: 'gear1', pivot: [44.5, G + 7.5, 22.5], axis: 'z' }); gear(g1, 44, G + 7, 22, 4, 10);
      const g2 = w.prop({ name: 'gear2', pivot: [51.5, G + 9.5, 22.5], axis: 'z' }); gear(g2, 51, G + 9, 22, 2, 6);
      w.box(44, G + 7, 21, 44, G + 7, 21, B.iron); w.box(51, G + 9, 21, 51, G + 9, 21, B.iron); w.box(44, G + 1, 21, 44, G + 2, 21, B.iron);
      w.box(41, G + 1, 21, 47, G + 1, 23, B.found);
      // 시계판 뒷면(북벽 높은 곳)과 추
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dy); if (d <= 3.4) w.set(58 + dx, G + 9 + dy, Z0 + 2, d > 2.6 ? B.gold : B.face); }
      const hands = w.prop({ name: 'hands', pivot: [58.5, G + 9.5, Z0 + 3.5], axis: 'z' });
      hands.box(58, G + 9, Z0 + 3, 58, G + 11, Z0 + 3, B.iron); hands.box(59, G + 9, Z0 + 3, 60, G + 9, Z0 + 3, B.iron);
      w.box(55, G + 13, 22, 61, G + 13, 22, B.wood);
      const pend = w.prop({ name: 'pend', pivot: [58.5, G + 13, 23.5], axis: 'z' });
      pend.box(58, G + 4, 23, 58, G + 12, 23, B.iron); pend.box(57, G + 2, 23, 59, G + 4, 23, B.brass); pend.set(58, G + 3, 23, B.gold);
      for (const x of [62, 63]) { w.box(x, G + 6, 22, x, G + 12, 22, B.iron); w.box(x, G + 3, 22, x, G + 5, 22, B.found); }
      // 종(종루 들보에 매단 작은 새벽 종)과 종 밧줄
      w.box(40, G + 8, 25, 40, G + 16, 25, B.frame); w.box(48, G + 8, 25, 48, G + 16, 25, B.frame); w.box(40, G + 16, 25, 48, G + 16, 25, B.frame); w.box(40, IN, 25, 40, G + 7, 25, B.frame); w.box(48, G + 1, 25, 48, G + 7, 25, B.frame);
      w.box(40, G + 1, 25, 40, G + 7, 25, B.frame);
      const gbell = w.prop({ name: 'gbell', pivot: [44.5, G + 15.5, 25.5], axis: 'x' });
      gbell.set(44, G + 15, 25, B.iron); gbell.ellipsoid(44, G + 13, 25, 1.6, 1.8, 1.6, B.bell, (dx, dy) => dy >= -1); gbell.set(44, G + 11, 25, B.iron);
      const brope = w.prop({ name: 'brope', pivot: [46.5, G + 15, 26.5] });
      brope.box(46, G + 3, 26, 46, G + 14, 26, B.rope); brope.set(46, G + 2, 26, B.cushR);
      w.set(46, G + 15, 26, B.iron);
      lights.push({ p: [56.5, G + 6, 25.5], c: '#ffd890', i: 0.7, d: 12, flicker: 0.1 });
      w.set(56, G + 5, 27, B.candle); w.set(56, G + 4, 27, B.iron);
      for (const [x, z] of [[62, 26], [63, 27], [41, 27]]) w.box(x, G + 1, z, x, G + 1, z, B.crate);
      landmarks.push({ name: '시계 기계실', note: '종탑 아래 맞물린 톱니바퀴', p: [50.5, G + 20, 23.5] });

      // ── 장부실(동쪽 북): 장부 서가, 계산 탁자, 도장 책상 ──
      const leds = [B.ledR, B.ledG, B.ledB, B.ledY];
      const lshelf = (x0, x1, z, h) => { for (let x = x0; x <= x1; x++) for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, (y - G) % 2 === 0 || x === x0 || x === x1 || y === G + h ? B.shelf : leds[(hash3(x, y, z) * 4) | 0]); };
      lshelf(69, 87, Z0 + 2, 8); lshelf(72, 85, 27, 5); lshelf(72, 85, 28, 5); lshelf(72, 85, 33, 5); lshelf(72, 85, 34, 5);
      w.box(73, G + 1, 39, 84, G + 2, 42, B.table); w.box(74, G + 1, 40, 83, G + 1, 41, 0);
      for (let x = 74; x <= 83; x += 3) { w.set(x, G + 3, 40, B.paper); w.set(x + 1, G + 3, 41, leds[x % 4]); w.set(x, G + 1, 43, B.chair); w.set(x, G + 2, 43, B.chair); }
      for (const [x, z] of [[76, 40], [80, 41], [82, 40]]) w.set(x, G + 4, z, B.coin);
      // 도장 책상(문 옆)
      w.box(69, G + 1, 35, 71, G + 2, 36, B.table); w.set(69, G + 3, 35, B.ink); w.set(70, G + 3, 36, B.paper); w.set(71, G + 3, 36, B.paper); w.set(71, G + 3, 35, B.wax);
      const stamp = w.prop({ name: 'stamp', pivot: [70.5, G + 3, 35.5] });
      stamp.set(70, G + 3, 35, B.brass); stamp.set(70, G + 4, 35, B.wood); stamp.set(70, G + 5, 35, B.gold);
      w.box(87, G + 1, 30, 87, G + 3, 31, B.chest); w.box(87, G + 1, 38, 87, G + 2, 40, B.sack);
      w.box(69, G + 1, 43, 69, G + 4, 43, B.brass); w.set(69, G + 5, 43, B.candle);
      lights.push({ name: 'ledger', p: [70.5, G + 6, 40.5], c: '#ffd890', i: 0.9, d: 14, flicker: 0.15 });
      landmarks.push({ name: '장부실', note: '길드의 모든 거래가 적힌 장부', p: [78.5, G + 16, 32.5] });

      // ── 금고(동쪽 남): 두꺼운 돌벽과 둥근 쇠문 ──
      const VX0 = 74, VX1 = 87, VZ0 = 49, VZ1 = 63;
      w.box(VX0, G + 1, VZ0, VX1, G + 7, VZ1, B.vault); w.box(VX0 + 2, G + 1, VZ0 + 2, VX1 - 2, G + 7, VZ1 - 2, 0);
      w.walls(VX0, G + 7, VZ0, VX1, G + 7, VZ1, B.iron); w.walls(VX0 + 1, G + 7, VZ0 + 1, VX1 - 1, G + 7, VZ1 - 1, B.iron); w.box(VX0, G + 4, VZ0, VX1, G + 4, VZ0, B.iron);
      for (let x = VX0; x <= VX1; x += 3) for (const z of [VZ0, VZ1]) w.set(x, G + 8, z, B.steel);
      w.box(VX0 + 2, G, VZ0 + 2, VX1 - 2, G, VZ1 - 2, B.found);
      // 쇠문 자리(서쪽 면)
      const VDZ = 56;
      w.box(VX0, G + 1, VDZ - 2, VX0 + 1, G + 5, VDZ + 2, 0);
      for (let dy = 0; dy <= 5; dy++) for (const dz of [-3, 3]) w.set(VX0 - 1, G + 1 + dy, VDZ + dz, B.iron);
      w.box(VX0 - 1, G + 6, VDZ - 3, VX0 - 1, G + 6, VDZ + 3, B.iron);
      const vdoor = w.prop({ name: 'vdoor', pivot: [VX0, G + 1, VDZ - 2] });
      for (let dz = -2; dz <= 2; dz++) for (let dy = 0; dy <= 4; dy++) { const r = Math.hypot(dz, dy - 2); vdoor.set(VX0, G + 1 + dy, VDZ + dz, r < 1 ? B.gold : (r > 2.2 ? B.iron : B.steel)); }
      for (const [dz, dy] of [[0, 2], [-1, 2], [1, 2], [0, 1], [0, 3]]) vdoor.set(VX0 - 1, G + 1 + dy, VDZ + dz, dz === 0 && dy === 2 ? B.gold : B.brass);
      // 금고 안: 금화 더미, 자루, 보석함
      for (let i = 0; i < 420; i++) { const x = w.ri(VX0 + 3, VX1 - 3), z = w.ri(VZ0 + 3, VZ1 - 3); if (x < VX0 + 5 && Math.abs(z - VDZ) < 3) continue; let y = G + 1; while (w.get(x, y, z)) y++; if (y < G + 4) w.set(x, y, z, hash3(x, y, z) > 0.75 ? B.coin : B.gold); }
      for (const [x, z] of [[84, 52], [84, 60], [80, 61]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.chest); w.set(x, G + 3, z, B.coin); }
      w.set(83, G + 4, 56, B.gem); w.set(81, G + 3, 53, B.gemR); w.set(78, G + 3, 59, B.gem);
      lights.push({ name: 'vault', p: [80.5, G + 5, 56.5], c: '#ffd070', i: 0.9, d: 16, flicker: 0.05 });
      w.box(70, G + 1, 50, 71, G + 1, 51, B.sack); w.box(70, G + 1, 62, 71, G + 2, 63, B.crate);
      landmarks.push({ name: '길드 금고', note: '둥근 쇠문 너머 금화 더미', p: [80.5, G + 14, 56.5] });

      // ── 상호작용 ──
      acts.push({
        name: '경매 망치', hint: '경매대 망치가 탕탕탕 세 번 내려치자 낙찰을 알리는 금화가 튀어 올라요', hit: [24, G + 1, 22, 30, G + 7, 26],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.tween('gavel', { off: [0, 2, 0], rot: [-0.9, 0, 0] }, 0.35); await a.tween('gavel', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.15, t => t * t); a.burst([27.5, G + 6.5, 25.5], { n: 14, colors: ['#ffd860', '#ffffff'], speed: 3, up: 3, life: 0.8, gravity: 3, spread: 1 }); await a.wait(0.25); }
          a.flash('auction', 2.4, 1.5); a.burst([27.5, G + 9, 24.5], { n: 40, colors: ['#ffd860', '#ffe8a0', '#ffffff'], speed: 4, up: 4, life: 1.4, gravity: 3, spread: 2 });
          await a.wait(1);
        },
      });
      acts.push({
        name: '장부 도장', hint: '길드 도장이 장부 위로 쿵 내려앉고 붉은 인주가 번져요', hit: [69, G + 1, 35, 71, G + 5, 36],
        run: async a => {
          for (let k = 0; k < 2; k++) {
            await a.tween('stamp', { off: [0, 2.4, 1], rot: [0, 0.5, 0] }, 0.45);
            await a.tween('stamp', { off: [k ? 1 : 0, 0, 1], rot: [0, 0, 0] }, 0.2, t => t * t);
            a.burst([70.5 + k, G + 3.5, 36.5], { n: 18, colors: ['#b02030', '#ff5a6a', '#ffe8a0'], speed: 2.5, up: 1.5, life: 0.7, gravity: 2, spread: 0.8 });
            await a.wait(0.3);
          }
          a.flash('ledger', 2, 1); await a.tween('stamp', { off: [0, 0, 0] }, 0.5);
        },
      });
      acts.push({
        name: '금고 열기', hint: '손잡이를 돌리자 둥근 쇠문이 묵직하게 열리고 금화 더미가 번쩍여요', hit: [VX0 - 2, G + 1, VDZ - 3, VX0 + 1, G + 6, VDZ + 3],
        run: async a => {
          await a.turn('vdoor', [0, 1.6, 0], 2.2);
          a.flash('vault', 4, 4); a.glow(1.5, 3);
          for (let k = 0; k < 6; k++) { a.burst([80.5, G + 4, 56.5], { n: 26, colors: ['#ffd860', '#ffffff', '#5ac8ff', '#ff3a5a'], speed: 3, up: 4, life: 1.4, gravity: 2.5, spread: 2.5 }); await a.wait(0.45); }
          await a.wait(0.8); await a.turn('vdoor', [0, 0, 0], 2);
        },
      });
      acts.push({
        name: '시계 태엽 감기', hint: '태엽을 감자 큰 톱니바퀴와 작은 톱니가 맞물려 돌고 추가 흔들리며 시곗바늘이 빙글 돌아요', hit: [40, G + 1, 20, 62, G + 13, 24],
        run: async a => {
          const swing = async () => { for (const amp of [0.5, 0.45, 0.4, 0.3]) { await a.turn('pend', [0, 0, amp], 0.5); await a.turn('pend', [0, 0, -amp], 0.5); } await a.turn('pend', [0, 0, 0], 0.4); };
          await Promise.all([a.turn('gear1', [0, 0, Math.PI * 2], 4.4, t => t), a.turn('gear2', [0, 0, -Math.PI * 4], 4.4, t => t), a.turn('hands', [0, 0, -Math.PI * 4], 4.4), swing()]);
          a.unwind('gear1'); a.unwind('gear2'); a.unwind('hands');
          a.burst([58.5, G + 9.5, Z0 + 4], { n: 24, colors: ['#ffe8a0', '#ffd860', '#ffffff'], speed: 3, up: 2, life: 1, gravity: 1, spread: 2 });
        },
      });
      acts.push({
        name: '새벽 종 울리기', hint: '종 밧줄을 당기자 들보에 매단 새벽 종이 댕댕 울려 장이 열림을 알려요', hit: [40, G + 1, 24, 48, G + 16, 27],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.move('brope', [0, -2, 0], 0.3), a.turn('gbell', [0.6, 0, 0], 0.35)]);
            a.burst([44.5, G + 17, 25.5], { n: 18, colors: ['#ffffff', '#ffe8a0'], speed: 6, up: 1, life: 1.1, gravity: 0, spread: 2, flat: true });
            await Promise.all([a.move('brope', [0, 0, 0], 0.3), a.turn('gbell', [-0.6, 0, 0], 0.35)]);
          }
          await a.turn('gbell', [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '회의 촛불', hint: '회의가 열리자 탁자 위 촛불과 네 귀퉁이 큰 촛대가 차례로 환하게 타올라요', hit: [49, G + 1, 37, 55, G + 4, 55],
        run: async a => {
          a.flash('council', 3, 4.5); a.glow(1.4, 4);
          for (const z of tcand) { a.burst([52.5, G + 5, z + 0.5], { n: 14, colors: ['#ffe2a0', '#ffb04a', '#ffffff'], speed: 1, up: 2.5, life: 1, gravity: -0.5, spread: 0.5 }); await a.wait(0.3); }
          for (const [x, z] of [[44, 34], [60, 34], [60, 58], [44, 58]]) { a.burst([x + 0.5, G + 8, z + 0.5], { n: 20, colors: ['#ffe2a0', '#ffb04a', '#ffffff'], speed: 1.4, up: 3, life: 1.1, gravity: -0.5, spread: 1 }); await a.wait(0.35); }
        },
      });
      acts.push({
        name: '금빛 저울', hint: '길드 문장의 금빛 저울에 금화와 곡식 자루를 올리자 접시가 기우뚱거리다 수평을 잡아요', hit: [SX - 5, G + 1, SZ - 1, SX + 5, G + 8, SZ + 1],
        run: async a => {
          for (const amp of [0.4, -0.3, 0.2, -0.12, 0.05]) await a.turn('scaleB', [0, 0, amp], 0.45);
          await a.turn('scaleB', [0, 0, 0], 0.4);
          a.burst([SX + 0.5, G + 8, SZ + 0.5], { n: 22, colors: ['#ffd860', '#ffffff'], speed: 2, up: 2, life: 1, gravity: 0.5, spread: 1.5 });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
