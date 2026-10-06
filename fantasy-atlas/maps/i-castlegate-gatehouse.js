// 성문 문루(하위 지도) — 왕성 앞 광장 정문 쌍탑 사이 문루의 속. 가운데 성문 통로와 쇠창살, 서쪽 수비대 초소, 동쪽 쇠창살 감기 방, 북쪽 위 망루 통로 (왕성 앞 광장의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 남쪽·동쪽 벽은 낮게 잘라 기본 시점(남동쪽)에서 방 안이 보인다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const { KP } = window.KINGDOM;
  const W = 96, D = 96, Hh = 72;
  MAPS.push({
    id: 'castlegate-gatehouse', cat: 'kingdom', sub: true, parent: 'castlegate', name: '성문 문루', en: 'Castle Gatehouse', color: '#c8d4ee', seed: 2391, base: 20, time: 'night', size: [W, D, Hh],
    desc: '왕성 정문 쌍탑 사이 문루의 속. 가운데로 성문 통로가 지나고 머리 위에 쇠창살이 걸려 있다. 서쪽은 화로가 타는 수비대 초소, 동쪽은 쇠창살과 도개교를 감는 큰 윈치 방이고, 계단을 오르면 화살구멍과 봉화 화로가 있는 망루 통로가 북쪽 벽을 따라 이어진다.',
    info: { title: '장소 정보', en: 'GATEHOUSE', rows: [['위치', '왕성 앞 광장 정문 문루'], ['아래층', '성문 통로 · 수비대 초소 · 쇠창살 감기 방'], ['위층', '망루 통로 · 화살구멍 · 봉화 화로'], ['소문', '쇠창살 윈치는 근위대 셋이 함께 돌려야 겨우 움직인다']] },
    sky: ['#26304a', '#0c0e1a', '#6a5a78'], stars: true,
    hemi: ['#d8d0e8', '#2a2430', 0.52], sun: ['#c8d0f8', 0.4, [0.5, 1, 0.55]],
    day: { sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false, hemi: ['#ffffff', '#5a5a60', 0.6], sun: ['#fff4e0', 0.74, [0.5, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.6,
    fog: { start: 0.9, floor: 6, depth: 6 },
    camY: -6, zoom: 1.65,
    particles: [
      { n: 70, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.15, area: [48, 48, 30], y0: 22, y1: 36, glow: false },
      { n: 40, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], mode: 'rise', speed: 0.8, area: [71, 25, 3], y0: 32, y1: 46, glow: true },
      { n: 24, colors: ['#ffb04a', '#ff7a2a'], mode: 'rise', speed: 0.5, area: [22, 51, 2], y0: 22, y1: 30, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      slabD: { c: '#9a968e', top: '#b4b0a6', v: 0.05, pat: 'check', alt: '#a8a49a' }, flag: { c: '#8a867e', top: '#a29e94', v: 0.08, pat: 'stone' },
      dark: { c: '#16141a', v: 0 }, chain: { c: '#3a3a44', v: 0.03 }, steel: { c: '#aab0bc', v: 0.04 }, brass: { c: '#d8a84a', v: 0.05 },
      hearth: { c: '#5a5660', v: 0.06, pat: 'brick' }, fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ff6a1a', glow: true }, candle: { c: '#ffe2a0', glow: true },
      table: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, bench: { c: '#5a3a24', v: 0.04 }, mug: { c: '#c8b8a0', v: 0.03 }, ale: { c: '#d89a3a', v: 0.03 },
      blanket: { c: '#3a4a8a', v: 0.03 }, straw: { c: '#d8c07a', v: 0.08 }, card: { c: '#f4f0e6', v: 0.02 }, die: { c: '#f6f2ea', v: 0.01 },
      rug: { c: '#2a4a9a', top: '#30509e', v: 0.03 }, coal: { c: '#2a2a30', v: 0.06 }, shield: { c: '#2a4a9a', v: 0.03 }, leather: { c: '#7a4a2a', v: 0.05 },
      chest: { c: '#6a4428', v: 0.05, pat: 'plank' }, waterB: { c: '#5aa0d8', v: 0.03 },
    }),
    build(w) {
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: 2, height: () => G, surface: (x, z) => hash3(x, 2, z) > 0.8 ? B.cobble2 : B.cobble, under: (x, z, y, dep) => dep < 2 ? B.found : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 18, X1 = 78, Z0 = 20, Z1 = 74;        // 문루 바깥벽
      const PX0 = 42, PX1 = 54, MIDX = 48;              // 성문 통로
      const GH = G + 8;                                  // 망루 통로 바닥 높이
      const TALL = G + 17, LOW = G + 3;

      // ── 바닥: 초소·윈치 방은 체크 석판, 통로는 자갈과 푸른 행렬 길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        let b = ((x >> 1) + (z >> 1)) % 2 ? B.slab : B.slabD;
        if (x >= PX0 && x <= PX1) b = (x === PX0 || x === PX1) ? B.gold : (x === MIDX ? B.carpet : B.flag);
        w.set(x, G, z, b);
      }
      for (let z = Z1 + 1; z < D - 4; z++) for (let x = PX0 - 1; x <= PX1 + 1; x++) w.set(x, G, z, (x === PX0 - 1 || x === PX1 + 1) ? B.whiteDk : (x === MIDX ? B.carpet : B.flag));

      // ── 바깥벽: 북·서는 높고(화살구멍), 남·동은 낮게 잘라 속을 보인다 ──
      w.box(X0, G + 1, Z0, X1, TALL, Z0 + 1, B.white);
      w.box(X0, G + 1, Z0, X0 + 1, TALL, Z1, B.white);
      w.box(X1 - 1, G + 1, Z0 + 2, X1, LOW, Z1, B.white);
      w.box(X0, G + 1, Z1 - 1, X1, LOW, Z1, B.white);
      for (const y of [G + 1, G + 9, TALL]) { w.box(X0, y, Z0, X1, y, Z0 + 1, B.whiteDk); w.box(X0, y, Z0, X0 + 1, y, Z1, B.whiteDk); }
      for (let x = X0; x <= X1; x++) { w.set(x, LOW + 1, Z1, x % 3 === 0 ? B.trim : 0); w.set(x, LOW, Z1, B.whiteDk); }
      for (let z = Z0 + 2; z <= Z1; z++) { w.set(X1, LOW + 1, z, z % 3 === 0 ? B.trim : 0); w.set(X1, LOW, z, B.whiteDk); }
      for (let x = X0; x <= X1; x += 2) w.set(x, TALL + 1, Z0, B.trim);
      for (let z = Z0; z <= Z1; z += 2) w.set(X0, TALL + 1, z, B.trim);
      // 남쪽 벽의 성문 아치(바깥 도개교 쪽)와 북쪽 큰 문짝
      w.box(PX0, G + 1, Z1 - 1, PX1, LOW + 1, Z1, 0);
      for (const x of [PX0 - 1, PX1 + 1]) { w.box(x, G + 1, Z1 - 1, x, G + 12, Z1, B.whiteDk); w.set(x, G + 13, Z1, B.gold); }
      w.box(PX0 - 1, G + 12, Z1, PX1 + 1, G + 13, Z1, B.trim); w.box(MIDX - 1, G + 13, Z1, MIDX + 1, G + 14, Z1, B.gold);
      w.box(PX0, G + 1, Z0 + 2, PX1, GH - 1, Z0 + 2, B.door);
      for (let x = PX0; x <= PX1; x += 2) w.box(x, G + 1, Z0 + 2, x, GH - 1, Z0 + 2, B.wood);
      for (const y of [G + 2, G + 6]) w.box(PX0, y, Z0 + 3, PX1, y, Z0 + 3, B.iron);
      w.box(MIDX, G + 1, Z0 + 3, MIDX, GH - 1, Z0 + 3, B.iron);
      // 북벽 화살구멍(망루 통로 높이)
      const slits = [26, 34, 62, 70];
      for (const x of slits) { w.box(x, GH + 2, Z0, x, GH + 6, Z0 + 1, B.dark); w.set(x, GH + 7, Z0 + 1, B.trim); w.set(x, GH + 1, Z0 + 2, B.whiteDk); }
      for (const x of [30, 66]) for (const y of [G + 3]) { w.box(x, y, Z0, x, y + 3, Z0 + 1, B.dark); }

      // ── 통로 양옆 칸막이 벽(안쪽 벽) ──
      const inner = x0 => {
        w.box(x0, G + 1, Z0 + 2, x0 + 1, G + 5, Z1 - 2, B.white); w.box(x0, G + 1, Z0 + 2, x0 + 1, G + 1, Z1 - 2, B.whiteDk); w.box(x0, G + 5, Z0 + 2, x0 + 1, G + 5, Z1 - 2, B.trim);
        for (let z = Z0 + 3; z <= Z1 - 2; z += 2) w.set(x0 + (x0 < MIDX ? 0 : 1), G + 6, z, B.trim);
        w.box(x0, G + 1, Z0 + 2, x0 + 1, GH - 1, 30, B.white); w.box(x0, G + 1, 43, x0 + 1, GH - 1, 47, B.white); w.box(x0, GH - 1, 43, x0 + 1, GH - 1, 47, B.trim);
      };
      inner(PX0 - 2); inner(PX1 + 1);
      // 칸막이 문(통로 ↔ 초소, 통로 ↔ 윈치 방)
      for (const x0 of [PX0 - 2, PX1 + 1]) {
        w.box(x0, G + 1, 58, x0 + 1, G + 4, 60, 0);
        w.box(x0, G + 5, 57, x0 + 1, G + 5, 61, B.trim); w.box(x0, G + 1, 57, x0 + 1, G + 4, 57, B.whiteDk); w.box(x0, G + 1, 61, x0 + 1, G + 4, 61, B.whiteDk);
      }
      // 쇠창살 홈: 통로를 가로지르는 두 겹 돌 들보
      for (const z of [44, 46]) { w.box(PX0 - 2, GH - 1, z, PX1 + 2, GH + 1, z, B.whiteDk); w.box(PX0, GH - 2, z, PX1, GH - 2, z, B.trim); }
      w.box(PX0 - 2, GH + 2, 44, PX1 + 2, GH + 2, 46, B.trim);
      // 쇠창살(부품): 처음엔 들보 위로 걷혀 있다
      const port = w.prop({ name: 'port', pivot: [MIDX + 0.5, G + 1, 45.5], off0: [0, 9, 0] });
      for (let x = PX0; x <= PX1; x++) for (let y = G + 1; y <= GH - 3; y++) if (x % 2 === 0 || (y - G) % 3 === 1) port.set(x, y, 45, B.iron);
      for (let x = PX0; x <= PX1; x += 2) port.set(x, G + 1, 45, B.gold);
      // 통로 벽 등잔
      for (const [x, z] of [[PX0, 34], [PX1, 34], [PX0, 66], [PX1, 66]]) { w.set(x, G + 6, z, B.iron); w.set(x, G + 7, z, B.candle); }
      lights.push({ p: [PX0 + 1.5, G + 7, 34.5], c: '#ffd890', i: 0.9, d: 18, flicker: 0.15 });
      lights.push({ p: [PX1 - 0.5, G + 7, 66.5], c: '#ffd890', i: 0.9, d: 18, flicker: 0.15 });

      // ── 망루 통로(북쪽 위층): 서쪽 계단으로 올라 통로 위 다리를 건너 동쪽 봉화대까지 ──
      w.box(X0 + 2, GH, Z0 + 2, X1 - 2, GH, 30, B.plank);
      w.box(X0 + 2, GH - 1, 30, X1 - 2, GH - 1, 30, B.whiteDk);
      for (let x = X0 + 2; x <= X1 - 2; x++) { if (x >= 22 && x <= 24) continue; w.set(x, GH + 1, 30, x % 3 === 0 ? B.trim : B.iron); if (x % 3 === 0) w.set(x, GH + 2, 30, B.gold); }
      for (const x of [PX0 - 1, PX1 + 1]) { w.box(x, G + 1, 30, x, GH - 1, 30, B.white); }
      // 계단(초소 서쪽 벽을 따라 북쪽으로 오른다)
      for (let s = 1; s <= 8; s++) { const z = 39 - s; w.box(22, G + 1, z, 24, G + s, z, B.whiteDk); w.box(22, G + s, z, 24, G + s, z, s % 2 ? B.slab : B.trim); }
      for (let s = 1; s <= 8; s++) { w.set(25, G + s + 1, 39 - s, B.iron); }
      w.box(25, G + 1, 31, 25, G + 9, 31, B.iron);
      // 위층 아래 창고: 통, 상자, 화살 다발
      for (const [x, z] of [[27, 23], [29, 23], [27, 25], [31, 23]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.barrel);
      for (const [x, z] of [[34, 23], [36, 23], [34, 26]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate);
      for (const [x, z] of [[60, 23], [62, 23], [64, 23], [60, 26]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, (x + z) % 4 ? B.crate : B.barrel);
      for (const x of [68, 70, 72]) { w.box(x, G + 1, 24, x, G + 3, 24, B.wood); w.set(x, G + 4, 24, B.steel); }

      // ── 수비대 초소(서쪽): 화로, 경비 탁자, 이층 침상, 창 걸이 ──
      // 화로(서쪽 벽)
      w.box(X0 + 2, G + 1, 47, X0 + 3, G + 8, 55, B.hearth); w.box(X0 + 3, G + 1, 49, X0 + 3, G + 4, 53, 0);
      w.box(X0 + 3, G + 1, 49, X0 + 3, G + 1, 53, B.coal); w.box(X0 + 3, G + 2, 50, X0 + 3, G + 3, 52, B.fire); w.set(X0 + 3, G + 4, 51, B.ember);
      w.box(X0 + 4, G + 5, 47, X0 + 4, G + 5, 55, B.trim); w.box(X0 + 2, G + 9, 48, X0 + 3, TALL, 54, B.hearth);
      w.box(X0 + 4, G + 1, 48, X0 + 4, G + 1, 48, B.iron); w.box(X0 + 4, G + 1, 54, X0 + 4, G + 1, 54, B.iron);
      w.box(X0 + 4, G + 6, 50, X0 + 4, G + 8, 52, B.shield); w.set(X0 + 4, G + 7, 51, B.gold); w.set(X0 + 4, G + 8, 51, B.gold);   // 왕실 문장 방패
      lights.push({ name: 'hearth', p: [X0 + 5, G + 3, 51.5], c: '#ff9a40', i: 1.5, d: 20, flicker: 0.35 });
      // 융단과 경비 탁자, 의자, 술잔
      for (let z = 46; z <= 58; z++) for (let x = 26; x <= 36; x++) w.set(x, G, z, (x === 26 || x === 36 || z === 46 || z === 58) ? B.gold : B.rug);
      w.box(28, G + 1, 49, 34, G + 2, 55, B.table); w.box(29, G + 1, 50, 33, G + 1, 54, 0);
      for (const z of [50, 52, 54]) { w.set(27, G + 1, z, B.bench); w.set(35, G + 1, z, B.bench); }
      for (const x of [29, 31, 33]) { w.set(x, G + 1, 48, B.bench); w.set(x, G + 1, 56, B.bench); }
      for (const [x, z] of [[29, 50], [33, 54], [30, 54]]) { w.set(x, G + 3, z, B.mug); }
      w.set(33, G + 3, 50, B.ale); w.box(31, G + 3, 50, 32, G + 3, 50, B.card); w.set(29, G + 3, 53, B.card);
      w.box(31, G + 3, 55, 31, G + 4, 55, B.gold); w.set(31, G + 5, 55, B.candle);
      lights.push({ p: [31.5, G + 6, 52.5], c: '#ffd890', i: 0.9, d: 14, flicker: 0.2 });
      // 주사위(부품 셋)
      const dice = [[30, 52], [32, 52], [31, 53]];
      dice.forEach(([x, z], k) => { const p = w.prop({ name: 'die' + k, pivot: [x + 0.5, G + 3.5, z + 0.5] }); p.set(x, G + 3, z, B.die); });
      // 이층 침상(남서쪽)
      for (const z0 of [62, 67]) {
        w.box(X0 + 2, G + 1, z0, X0 + 6, G + 1, z0 + 3, B.wood); w.box(X0 + 2, G + 2, z0, X0 + 6, G + 2, z0 + 3, B.straw); w.box(X0 + 3, G + 2, z0 + 1, X0 + 6, G + 2, z0 + 2, B.blanket);
        w.box(X0 + 2, G + 5, z0, X0 + 6, G + 5, z0 + 3, B.wood); w.box(X0 + 3, G + 6, z0 + 1, X0 + 6, G + 6, z0 + 2, B.blanket); w.set(X0 + 2, G + 6, z0 + 1, B.straw);
        for (const [x, z] of [[X0 + 2, z0], [X0 + 6, z0], [X0 + 2, z0 + 3], [X0 + 6, z0 + 3]]) w.box(x, G + 1, z, x, G + 6, z, B.wood);
      }
      // 침상 발치 궤짝, 물통, 장작 더미, 열쇠 걸이
      for (const z of [63, 68]) { w.box(X0 + 7, G + 1, z, X0 + 8, G + 1, z + 1, B.chest); w.box(X0 + 7, G + 2, z, X0 + 8, G + 2, z + 1, B.wood); w.set(X0 + 8, G + 2, z, B.gold); }
      w.cyl(25, 44, G + 1, G + 2, 1, B.barrel); w.set(25, G + 3, 44, B.waterB);
      for (let z = 56; z <= 58; z++) w.box(X0 + 2, G + 1, z, X0 + 3, G + 1 + (z % 2), z, B.wood);
      w.box(PX0 - 3, G + 3, 62, PX0 - 3, G + 3, 66, B.wood); for (const z of [62, 64, 66]) w.set(PX0 - 4, G + 2, z, B.gold);
      // 투구 선반(서쪽 벽)
      w.box(X0 + 2, G + 5, 40, X0 + 2, G + 5, 45, B.wood);
      for (const z of [40, 42, 44]) { w.set(X0 + 3, G + 6, z, B.steel); w.set(X0 + 3, G + 7, z, B.steel); }
      // 창 걸이(칸막이 벽 쪽): 창 다섯 자루(부품)
      w.box(PX0 - 3, G + 1, 40, PX0 - 3, G + 1, 50, B.wood); w.box(PX0 - 3, G + 5, 40, PX0 - 3, G + 5, 50, B.wood);
      const spears = w.prop({ name: 'spears', pivot: [PX0 - 3.5, G + 2, 45.5] });
      for (let z = 41; z <= 49; z += 2) { spears.box(PX0 - 4, G + 2, z, PX0 - 4, G + 7, z, B.wood); spears.set(PX0 - 4, G + 8, z, B.steel); spears.set(PX0 - 4, G + 9, z, B.steel); }
      // 나팔 거치대(망루 통로 서쪽)
      w.box(30, GH + 1, 24, 30, GH + 4, 24, B.wood); w.box(29, GH + 1, 23, 31, GH + 1, 25, B.whiteDk);
      const horn = w.prop({ name: 'horn', pivot: [30.5, GH + 5, 24.5] });
      horn.box(28, GH + 5, 24, 32, GH + 5, 24, B.brass); horn.box(33, GH + 4, 24, 33, GH + 6, 24, B.brass); horn.set(27, GH + 5, 24, B.gold); horn.set(30, GH + 6, 24, B.leather);
      // 화살구멍 덧문(부품): 안쪽에서 옆으로 밀어 연다
      slits.forEach((x, k) => { const p = w.prop({ name: 'shut' + k, pivot: [x + 0.5, GH + 4, Z0 + 2.5] }); p.box(x, GH + 2, Z0 + 2, x, GH + 6, Z0 + 2, B.door); p.set(x, GH + 4, Z0 + 2, B.iron); });

      // ── 쇠창살 감기 방(동쪽): 큰 윈치 북과 바퀴, 도개교 사슬 감개 ──
      const WZ = 46, WY = G + 4;
      for (const x of [58, 73]) { w.box(x, G + 1, WZ - 1, x, WY + 1, WZ + 1, B.wood); w.box(x, G + 1, WZ - 2, x, G + 1, WZ + 2, B.whiteDk); w.set(x, WY + 2, WZ, B.iron); }
      const winch = w.prop({ name: 'winch', pivot: [65.5, WY + 0.5, WZ + 0.5], axis: 'x' });
      for (let x = 60; x <= 71; x++) for (let dz = -2; dz <= 2; dz++) for (let dy = -2; dy <= 2; dy++) {
        const r = Math.hypot(dz, dy); if (r > 2.3) continue;
        winch.set(x, WY + dy, WZ + dz, r < 1.2 ? B.wood : ((x + Math.round(Math.atan2(dy, dz) * 2)) % 2 ? B.chain : B.iron));
      }
      for (const x of [59, 72]) for (let dz = -4; dz <= 4; dz++) for (let dy = -4; dy <= 4; dy++) {
        const r = Math.hypot(dz, dy); if (r > 4.3 || WY + dy < G + 1) continue;
        if (r > 3.3 || dz === 0 || dy === 0) winch.set(x, WY + dy, WZ + dz, r > 3.3 ? B.wood : B.plank);
      }
      for (const x of [59, 72]) for (const [dz, dy] of [[0, 5], [5, 0], [0, -5], [-5, 0]]) if (WY + dy >= G + 1) winch.set(x, WY + dy, WZ + dz, B.wood);
      // 쇠사슬: 북에서 들보를 넘어 쇠창살로
      w.line(65, WY + 3, WZ, 60, GH + 3, WZ, B.chain); w.box(PX1 + 1, GH + 3, WZ, 59, GH + 3, WZ, B.chain); w.box(PX0, GH + 3, WZ - 1, PX1, GH + 3, WZ - 1, B.chain);
      w.box(PX1 + 1, GH, WZ, PX1 + 2, GH + 2, WZ, B.iron);
      lights.push({ p: [65.5, G + 8, 40.5], c: '#ffd890', i: 0.8, d: 16, flicker: 0.15 });
      w.box(65, G + 1, 38, 65, G + 6, 38, B.iron); w.set(65, G + 7, 38, B.candle); w.box(64, G + 1, 37, 66, G + 1, 39, B.whiteDk);
      // 도개교 사슬 감개(세운 캡스턴)
      const CX = 66, CZ = 62;
      w.cyl(CX, CZ, G + 1, G + 1, 2.2, B.whiteDk);
      const cap = w.prop({ name: 'capstan', pivot: [CX + 0.5, G + 2, CZ + 0.5] });
      cap.cyl(CX, CZ, G + 2, G + 5, 1.2, B.wood); cap.cyl(CX, CZ, G + 6, G + 6, 1.6, B.iron); cap.set(CX, G + 7, CZ, B.gold);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let s = 2; s <= 5; s++) cap.set(CX + dx * s, G + 4, CZ + dz * s, s === 5 ? B.iron : B.wood);
      for (let k = 0; k < 10; k++) { const a = k * 0.63; cap.set(Math.round(CX + Math.cos(a) * 1.6), G + 2 + (k % 3), Math.round(CZ + Math.sin(a) * 1.6), B.chain); }
      w.box(CX, G + 2, CZ + 6, CX, G + 2, Z1 - 2, B.chain); w.box(CX, G + 1, Z1 - 2, CX, LOW, Z1 - 2, B.iron);
      // 사슬 더미, 기름통, 공구
      for (const [x, z] of [[74, 54], [74, 56], [73, 55]]) w.set(x, G + 1, z, B.chain);
      w.box(60, G + 1, 66, 61, G + 2, 67, B.barrel); w.box(60, G + 1, 69, 62, G + 1, 70, B.crate); w.set(61, G + 2, 69, B.iron);

      // ── 봉화대(망루 통로 동쪽 끝) ──
      const BX = 71, BZ = 25;
      w.box(BX - 3, GH + 1, BZ - 3, BX + 3, GH + 1, BZ + 3, B.whiteDk); w.cyl(BX, BZ, GH + 2, GH + 3, 1.2, B.iron);
      w.cyl(BX, BZ, GH + 4, GH + 4, 2.6, B.iron); w.ring(BX, BZ, GH + 5, 1.6, 2.6, B.iron);
      w.cyl(BX, BZ, GH + 5, GH + 5, 1.6, B.coal); w.cyl(BX, BZ, GH + 6, GH + 6, 1.2, B.fire); w.set(BX, GH + 7, BZ, B.ember);
      lights.push({ name: 'beacon', p: [BX + 0.5, GH + 8, BZ + 0.5], c: '#ff9a3a', i: 1.4, d: 26, flicker: 0.4 });
      landmarks.push({ name: '봉화대', note: '망루 통로 끝의 봉화 화로', p: [BX + 0.5, GH + 14, BZ + 0.5] });
      landmarks.push({ name: '쇠창살 윈치', note: '쇠창살을 감아올리는 큰 북', p: [65.5, G + 14, WZ + 0.5] });
      landmarks.push({ name: '수비대 초소', note: '화로와 경비 탁자, 침상', p: [30.5, G + 14, 52.5] });

      // ── 남쪽 출입문(초소): 왕성 앞 광장으로 ──
      const DX0 = 29, DX1 = 31;
      w.box(DX0, G + 1, Z1 - 1, DX1, LOW + 1, Z1, 0);
      w.box(DX0, G + 1, Z1, DX1, G + 5, Z1, B.door); w.box(DX0 + 1, G + 1, Z1, DX0 + 1, G + 5, Z1, B.wood); w.set(DX1, G + 3, Z1 - 1, B.iron);
      for (const x of [DX0 - 1, DX1 + 1]) w.box(x, G + 1, Z1 - 1, x, G + 6, Z1, B.trim);
      w.box(DX0 - 1, G + 6, Z1 - 1, DX1 + 1, G + 7, Z1, B.whiteDk); w.set(DX0 + 1, G + 7, Z1, B.gold);
      w.set(DX1 + 2, G + 5, Z1 - 2, B.iron); w.set(DX1 + 2, G + 6, Z1 - 2, B.candle);
      lights.push({ p: [DX1 + 2.5, G + 6, Z1 - 1.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.15 });
      acts.push(OR.goAct({ at: [DX0 + 1, G + 1, Z1 - 3], h: 4, name: '성문 광장으로 나가기', goto: 'castlegate', hint: '쪽문을 열고 성문 통로를 지나 선왕 석상이 늘어선 왕성 앞 광장으로 나가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 5, Z1] }));

      // ── 상호작용 ──
      acts.push({
        name: '쇠창살 감기', hint: '윈치 북을 풀자 쇠창살이 통로로 쿵 내려앉았다가 사슬이 감기며 다시 올라가요', hit: [58, G + 1, WZ - 4, 73, WY + 4, WZ + 4],
        run: async a => {
          await Promise.all([a.move('port', [0, 0, 0], 1.2, t => t * t), a.turn('winch', [-Math.PI * 2, 0, 0], 1.2)]);
          a.burst([MIDX + 0.5, G + 1.2, 45.5], { n: 40, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 1, gravity: 3, spread: 6, flat: true });
          await a.wait(1.4);
          await Promise.all([a.move('port', [0, 9, 0], 3, t => t), a.turn('winch', [0, 0, 0], 3, t => t)]);
          a.burst([65.5, WY + 3, WZ + 0.5], { n: 16, colors: ['#ffe8a0', '#ffffff'], speed: 2, up: 2, life: 0.8, gravity: 1, spread: 2 });
        },
      });
      acts.push({
        name: '도개교 사슬 감개', hint: '캡스턴이 빙글빙글 돌며 도개교 사슬을 감아요', hit: [CX - 5, G + 1, CZ - 5, CX + 5, G + 7, CZ + 5],
        run: async a => {
          await a.turn('capstan', [0, Math.PI * 3, 0], 3.2); a.unwind('capstan');
          for (let k = 0; k < 4; k++) { a.burst([CX + 0.5, G + 2.5, Z1 - 3], { n: 10, colors: ['#8a8a94', '#d8d4ca'], speed: 2, up: 1, life: 0.8, gravity: 2, spread: 1.5 }); await a.wait(0.25); }
          await a.turn('capstan', [0, -Math.PI * 0.5, 0], 1); await a.turn('capstan', [0, 0, 0], 0.8);
        },
      });
      acts.push({
        name: '경비 교대 나팔', hint: '거치대의 놋쇠 나팔이 들려 올라 교대를 알리는 소리가 문루에 울려 퍼져요', hit: [27, GH + 1, 22, 33, GH + 6, 26],
        run: async a => {
          await a.tween('horn', { off: [0, 2.5, 0], rot: [0, 0, 0.5] }, 0.8);
          for (let k = 0; k < 4; k++) { a.burst([34, GH + 9, 24.5], { n: 18, colors: ['#ffe8a0', '#ffffff', '#d8a84a'], speed: 6, up: 1, life: 1, gravity: 0, spread: 1, flat: true }); await a.wait(0.45); }
          await a.tween('horn', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.9);
        },
      });
      acts.push({
        name: '봉화 올리기', hint: '봉화 화로에 기름을 붓자 불길이 높이 치솟아 밤하늘로 불티가 날아올라요', hit: [BX - 3, GH + 1, BZ - 3, BX + 3, GH + 7, BZ + 3],
        run: async a => {
          a.flash('beacon', 4, 4.5); a.glow(1.5, 4);
          for (let k = 0; k < 9; k++) { a.burst([BX + 0.5, GH + 7, BZ + 0.5], { n: 34, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3, up: 9, life: 1.6, gravity: -1, spread: 1.6 }); await a.wait(0.45); }
        },
      });
      acts.push({
        name: '화살구멍 엿보기', hint: '화살구멍 덧문이 차례로 밀려 열리며 바깥 달빛이 가늘게 새어 들어와요', hit: [24, GH + 1, Z0 + 2, 72, GH + 6, Z0 + 3],
        run: async a => {
          for (let k = 0; k < slits.length; k++) { a.move('shut' + k, [2, 0, 0], 0.6); await a.wait(0.3); }
          await a.wait(0.4);
          for (let q = 0; q < 6; q++) { slits.forEach(x => a.burst([x + 0.5, GH + 4, Z0 + 3 + q], { n: 5, colors: ['#e8f0ff', '#c8d8ff'], speed: 0.4, up: 0.2, life: 1.2, gravity: 0.3, spread: 0.6 })); await a.wait(0.3); }
          await a.wait(0.6);
          await Promise.all(slits.map((x, k) => a.move('shut' + k, [0, 0, 0], 0.7)));
        },
      });
      acts.push({
        name: '창 걸이 점검', hint: '걸이에 세운 창 다섯 자루가 들썩 올라갔다 철컥 내려앉아요', hit: [PX0 - 4, G + 1, 40, PX0 - 3, G + 9, 50],
        run: async a => {
          for (let k = 0; k < 2; k++) { await a.move('spears', [0, 2, 0], 0.35); await a.move('spears', [0, 0, 0], 0.25); a.burst([PX0 - 3.5, G + 9, 45.5], { n: 14, colors: ['#ffffff', '#aab0bc'], speed: 3, up: 1, life: 0.6, gravity: 2, spread: 4 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '주사위 놀이', hint: '경비 탁자 위 주사위 세 알이 높이 튀어 올라 빙글 돌다 떨어져요', hit: [28, G + 1, 49, 34, G + 4, 55],
        run: async a => {
          await Promise.all(dice.map((d, k) => a.tween('die' + k, { off: [0, 3 + k * 0.6, 0], rot: [Math.PI * (2 + k), Math.PI * 1.5, 0] }, 0.6)));
          await Promise.all(dice.map((d, k) => a.tween('die' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.5, t => t * t)));
          a.burst([31.5, G + 3.5, 52.5], { n: 16, colors: ['#ffe8a0', '#ffffff'], speed: 2, up: 1.5, life: 0.8, gravity: 1, spread: 1.5 });
          a.flash('hearth', 1.8, 1);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
