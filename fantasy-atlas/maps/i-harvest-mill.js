// 연못가 물레방앗간(하위 지도) — 황금들녘 서쪽 연못 물길 곁의 2층 방앗간. 남쪽 문으로 들어서면 동쪽에 맷돌방(굴대·톱니바퀴·맷돌),
// 바깥 물길에서 물레가 돌고, 서쪽은 빵 화덕과 반죽 통이 있는 방앗간 부엌, 북쪽 벽 위로 곡물 다락(계단 · 포대 도르래). 남·동쪽 벽은 잘라 낮췄다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 48, G = 10;
  MAPS.push({
    id: 'harvest-mill', cat: 'village', sub: true, parent: 'harvest', name: '연못가 물레방앗간', en: 'Harvest Hollow · Pondside Watermill', color: '#9a9088', seed: 1512, base: G, time: 'day', size: [W, D, Hh],
    desc: '연못에서 끌어온 물길이 물레를 돌리고, 굴대와 톱니바퀴가 맷돌을 돌려 햇밀을 빻는 방앗간. 맷돌방 옆 부엌에서는 갓 빻은 밀가루로 반죽을 치대 화덕에 빵을 굽고, 계단 위 곡물 다락에는 밀 포대가 천장까지 쌓여 있다.',
    info: { title: '장소 정보', en: 'WATERMILL', rows: [['맷돌방', '물레 굴대 · 톱니바퀴 · 맷돌 · 밀가루 체'], ['부엌', '빵 화덕 · 반죽 통 · 햇밀 빵'], ['다락', '밀 포대 · 포대 도르래']] },
    sky: ['#fbd29a', '#a8b8c0', '#ffe4a8'], stars: false,
    hemi: ['#fff0d8', '#4a3a2a', 0.62], sun: ['#ffe0b0', 0.72, [0.6, 0.9, 0.45]],
    night: { sky: ['#283048', '#0a0a18', '#c88a48'], stars: true, hemi: ['#b0b8d0', '#181410', 0.42], sun: ['#c8d0ff', 0.3, [0.6, 0.9, 0.45]], haze: '#262a34' },
    liquid: ['#3a5a4a', '#5a8a6a', '#f0f0d0'], liqSpeed: 0.9,
    fog: { start: 0.92, floor: G - 14, depth: 6, haze: [6, 0.12, 6], hazeColor: '#e8d8b8' },
    camY: 2, zoom: 1.8,
    particles: [
      { n: 110, colors: ['#ffffff', '#f8f4ea', '#f0e8d0'], mode: 'drift', speed: 0.1, wind: 0.1, area: [36, 30, 12], y0: G + 1, y1: G + 12, glow: true },
      { n: 30, colors: ['#ffffff', '#d8f0ff'], mode: 'rise', speed: 0.6, area: [53, 30, 3], y0: G - 1, y1: G + 6, glow: false },
    ],
    blocks: {
      grass: { c: '#6a4a30', top: '#9aa04a', v: 0.09 }, grass2: { c: '#6a4a30', top: '#b0a048', v: 0.09 }, dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' },
      path: { c: '#6a4a30', top: '#c8a878', v: 0.1 }, flag: { c: '#8a8278', top: '#aaa298', v: 0.06, pat: 'stone' }, boards: { c: '#7a5a3a', top: '#a07a4e', v: 0.05, pat: 'plank' },
      millS: { c: '#9a9088', v: 0.05, pat: 'stone' }, millSd: { c: '#7e766e', v: 0.05, pat: 'brick' }, plaster: { c: '#f0e0c0', v: 0.03 }, frame: { c: '#6a4428', v: 0.05 }, found: { c: '#8a8070', v: 0.05, pat: 'stone' },
      win: { c: '#ffd890', night: true, day: '#a8c8d0' }, shutter: { c: '#6a8a3a', v: 0.03 }, door: { c: '#4a2e1c', v: 0.03, pat: 'plank' },
      log: { c: '#5a3a24', v: 0.06, pat: 'log' }, cart: { c: '#8a6a40', v: 0.08, pat: 'plank' }, crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, iron: { c: '#3a3a40', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 },
      stone: { c: '#b0a89e', v: 0.05, pat: 'stone' }, stoneD: { c: '#8a8278', v: 0.05 }, sack: { c: '#d8c8a0', v: 0.05 }, sack2: { c: '#c8b48a', v: 0.05 }, flour: { c: '#f8f4ea', v: 0.02 }, wheat: { c: '#e0bc50', v: 0.1 },
      brick: { c: '#a85a3a', v: 0.05, pat: 'brick' }, brickD: { c: '#7a3e2a', v: 0.05, pat: 'brick' }, fire: { c: '#ff9a3a', glow: true }, fire2: { c: '#ffd060', glow: true }, coal: { c: '#2a1c18', v: 0.05 },
      bread: { c: '#c8843a', v: 0.06 }, breadL: { c: '#e0a858', v: 0.05 }, dough: { c: '#f0e2c4', v: 0.03 }, pot: { c: '#b86a40', v: 0.05 }, jar: { c: '#6a8a9a', v: 0.04 }, cloth: { c: '#e8dcc8', v: 0.03 }, check: { c: '#c84a3a', v: 0.03, pat: 'check', alt: '#f0e8d8' },
      reed: { c: '#8a8a4a', v: 0.08 }, lily: { c: '#4a8a3a', v: 0.06 }, leafY: { c: '#e8b83a', v: 0.1 }, leafG: { c: '#7a8a3a', v: 0.1 }, leafO: { c: '#e08a2a', v: 0.1 }, bark: { c: '#5a3a24', v: 0.06 },
      lamp: { c: '#ffd890', glow: true }, herb: { c: '#5a7a3a', v: 0.08 }, pumpkin: { c: '#e8801a', v: 0.07 }, apple: { c: '#c8302a', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 16, X1 = 47, Z0 = 18, Z1 = 43, TOP = G + 13, LY = G + 7;   // 벽 선, 벽 높이, 다락 바닥
      const DX0 = 30, DX1 = 32;                                               // 남쪽 문
      const inR = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      const CHX0 = 51, CHX1 = 55, WL = G - 1;                                 // 동쪽 바깥 물길
      MH.terrain(w, { floor: G - 8, height: () => G, surface: (x, z) => hash3(x, 1, z) > 0.7 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 물길: 북쪽 연못에서 남쪽으로, 돌 둑과 갈대 ──
      for (let z = 0; z < D; z++) for (let x = CHX0 - 1; x <= CHX1 + 1; x++) {
        const bank = x === CHX0 - 1 || x === CHX1 + 1;
        for (let y = G - 4; y <= G; y++) S(x, y, z, bank ? (y === G ? B.millSd : B.rock) : (y <= G - 4 ? B.rock : 0));
        if (!bank) w.liquid(x, z, WL);
      }
      for (let k = 0; k < 18; k++) { const z = (k * 7 + 3) % D, x = k % 2 ? CHX1 + 2 : CHX0 - 2; if (z > 14 && z < 46) continue; S(x, G + 1, z, B.reed); S(x, G + 2, z, B.reed); }
      for (const [x, z] of [[52, 8], [54, 52], [53, 58]]) S(x, WL, z, B.lily);
      MH.tree(w, 58, G + 1, 10, { kind: 'willow', h: 11, bark: B.bark, leaves: [B.leafY, B.leafG, B.leafO], r: 5, trunkR: 1.2 });

      // ── 바닥: 맷돌방은 돌판, 부엌은 널마루, 문 앞은 흙길 ──
      const KX = 27;                                                           // 부엌(서) | 맷돌방(동) 경계
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) S(x, G, z, x < KX ? B.boards : (hash3(x, 2, z) > 0.85 ? B.stoneD : B.flag));
      for (let z = Z1 + 1; z < D - 4; z++) for (let x = DX0 - 1; x <= DX1 + 1; x++) S(x, G, z, hash3(x, 5, z) > 0.8 ? B.grass : B.path);

      // ── 벽: 북·서는 높고(돌 아랫단, 회벽에 나무 샛기둥, 창과 녹색 덧창), 동·남은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x === X1 || z === Z1, corner = (x === X0 || x === X1) && (z === Z0 || z === Z1);
        const a = (x === X0 || x === X1) ? z : x;
        if (low) {
          for (let y = G + 1; y <= G + 2; y++) S(x, y, z, corner || a % 4 === 0 ? B.frame : B.millS);
          if (corner || a % 8 === 0) S(x, G + 3, z, B.frame);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) {
          let b = y <= G + 3 ? B.millS : (corner ? B.millSd : (a % 4 === 0 || y === LY || y === TOP ? B.frame : B.plaster));
          if (corner && (y - G) % 2) b = B.found;
          S(x, y, z, b);
        }
      }
      for (const x of [31, 39, 43]) { w.box(x, G + 9, Z0, x + 1, G + 11, Z0, B.win); S(x - 1, G + 10, Z0 + 0, B.frame); }
      for (const z of [26, 34]) { w.box(X0, G + 4, z, X0, G + 6, z + 1, B.win); S(X0 + 1, G + 3, z, B.frame); S(X0 + 1, G + 3, z + 1, B.frame); }
      // 남쪽 문: 문틀, 안쪽으로 열린 문짝
      for (let x = DX0; x <= DX1; x++) for (let y = G + 1; y <= G + 3; y++) S(x, y, Z1, 0);
      for (const x of [DX0 - 1, DX1 + 1]) w.box(x, G + 1, Z1, x, G + 5, Z1, B.frame);
      w.box(DX0 - 1, G + 5, Z1, DX1 + 1, G + 5, Z1, B.frame); S(DX0 - 1, G + 6, Z1, B.lamp);
      w.box(DX1 + 2, G + 1, Z1 - 3, DX1 + 2, G + 4, Z1 - 1, B.door);
      for (let x = DX0; x <= DX1; x++) S(x, G, Z1, B.flag);

      // ── 맷돌방: 바깥 물레(부품, 계속 돈다) → 굴대 → 톱니바퀴(부품) → 맷돌(부품 위돌) ──
      const AZ = 30, AY = G + 3, WX = 53, WR = 5;
      w.box(45, AY, AZ, CHX0 - 1, AY, AZ, B.log);
      for (const x of [CHX0 - 1, CHX1 + 1]) w.box(x, G + 1, AZ, x, AY, AZ, B.millSd);
      w.box(CHX1 + 1, AY, AZ, CHX1 + 1, AY, AZ, B.log);
      const wheel = w.prop({ name: 'waterwheel', pivot: [WX + 0.5, AY + 0.5, AZ + 0.5], axis: 'x', speed: 0.35 });
      for (const x of [WX - 1, WX + 1]) { MH.ringProp(wheel, x, AY, AZ, WR, 'yz', B.log); MH.ringProp(wheel, x, AY, AZ, WR - 1.6, 'yz', B.cart); }
      for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; wheel.line(WX, AY, AZ, WX, AY + Math.sin(t) * WR, AZ + Math.cos(t) * WR, B.log); wheel.line(WX - 1, AY + Math.sin(t) * (WR - 0.4), AZ + Math.cos(t) * (WR - 0.4), WX + 1, AY + Math.sin(t) * (WR - 0.4), AZ + Math.cos(t) * (WR - 0.4), B.cart); }
      wheel.box(WX - 1, AY, AZ, WX + 1, AY, AZ, B.iron);
      // 수문(부품): 물레 위쪽 물길을 가로지르는 널판
      const SGZ = 21;
      for (const x of [CHX0 - 1, CHX1 + 1]) w.box(x, G + 1, SGZ, x, G + 5, SGZ, B.log);
      w.box(CHX0 - 1, G + 5, SGZ, CHX1 + 1, G + 5, SGZ, B.log);
      const sluice = w.prop({ name: 'sluice', pivot: [53, G + 1, SGZ + 0.5] });
      sluice.box(CHX0, G - 3, SGZ, CHX1, G + 1, SGZ, B.cart); sluice.box(53, G + 2, SGZ, 53, G + 4, SGZ, B.iron);
      // 안쪽 굴대와 톱니바퀴
      S(43, AY, AZ, B.log);
      const gear = w.prop({ name: 'gear', pivot: [44.5, AY + 0.5, AZ + 0.5], axis: 'x', speed: 0.35 });
      MH.ringProp(gear, 44, AY, AZ, 2, 'yz', B.cart, B.iron, 8); for (const [dy, dz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) gear.set(44, AY + dy, AZ + dz, B.log);
      gear.set(44, AY, AZ, B.iron);
      for (const z of [AZ - 3, AZ + 3]) w.box(45, G + 1, z, 45, AY + 1, z, B.log);
      // 맷돌 받침(나무 틀), 아래돌, 위돌(부품), 깔때기, 밀가루 홈과 통
      const MX = 38, MZ = 30;
      w.box(MX - 3, G + 1, MZ - 3, MX + 3, G + 3, MZ + 3, B.cart); w.walls(MX - 3, G + 1, MZ - 3, MX + 3, G + 3, MZ + 3, B.log);
      w.box(MX - 3, G + 3, MZ - 3, MX + 3, G + 3, MZ + 3, B.boards);
      w.box(MX + 4, AY, MZ, 42, AY, MZ, B.log);
      w.cyl(MX, MZ, G + 4, G + 4, 2.6, B.stoneD);
      const runner = w.prop({ name: 'runner', pivot: [MX + 0.5, G + 5, MZ + 0.5], axis: 'y' });
      runner.cyl(MX, MZ, G + 5, G + 5, 2.6, B.stone); runner.set(MX, G + 5, MZ, B.iron); runner.set(MX + 2, G + 5, MZ, B.stoneD); runner.set(MX - 2, G + 5, MZ, B.stoneD);
      for (const [x, z] of [[MX - 2, MZ - 2], [MX + 2, MZ - 2]]) w.box(x, G + 6, z, x, G + 9, z, B.log);
      w.box(MX - 2, G + 10, MZ - 2, MX + 2, G + 10, MZ - 2, B.log);
      w.box(MX - 1, G + 8, MZ - 1, MX + 1, G + 9, MZ + 1, B.crate); S(MX, G + 9, MZ, B.wheat); S(MX, G + 7, MZ, B.crate);
      w.box(MX, G + 3, MZ + 4, MX, G + 3, MZ + 5, B.cart); S(MX, G + 2, MZ + 5, B.cart);
      w.box(MX - 1, G + 1, MZ + 6, MX + 1, G + 1, MZ + 7, B.crate); w.box(MX - 1, G + 2, MZ + 6, MX + 1, G + 2, MZ + 7, B.flour);
      landmarks.push({ name: '맷돌방', note: '물레 굴대 · 톱니바퀴 · 맷돌', p: [41, G + 14, 30] });
      landmarks.push({ name: '물레', note: '물길을 받아 도는 바깥 물레', p: [WX + 0.5, AY + 11, AZ + 0.5] });

      // 밀가루 체: 체 받침과 흔드는 체(부품), 아래 밀가루 통
      const SX = 42, SZ = 38;
      w.box(SX - 1, G + 1, SZ, SX + 2, G + 1, SZ + 1, B.crate); w.box(SX, G + 1, SZ, SX + 1, G + 1, SZ + 1, B.flour);
      for (const [x, z] of [[SX - 1, SZ - 1], [SX + 2, SZ - 1], [SX - 1, SZ + 2], [SX + 2, SZ + 2]]) w.box(x, G + 1, z, x, G + 3, z, B.log);
      const sieve = w.prop({ name: 'sieve', pivot: [SX + 1, G + 3.5, SZ + 1] });
      sieve.walls(SX, G + 3, SZ, SX + 1, G + 3, SZ + 1, B.cart); sieve.box(SX, G + 4, SZ - 1, SX + 1, G + 4, SZ - 1, B.cart); sieve.box(SX, G + 4, SZ + 2, SX + 1, G + 4, SZ + 2, B.cart);
      // 맷돌방 밀가루 포대 더미
      for (const [x, z, h] of [[45, 40, 3], [46, 40, 2], [45, 41, 2], [46, 41, 3], [44, 42, 1], [46, 37, 2], [46, 36, 1]]) for (let y = G + 1; y < G + 1 + h; y++) S(x, y, z, (x + y + z) % 2 ? B.sack : B.sack2);

      // ── 곡물 다락: 북쪽 벽을 따라 z 19..25, 서쪽 계단으로 오른다 ──
      const LX0 = 24;
      for (let z = Z0 + 1; z <= 25; z++) for (let x = LX0; x <= X1 - 1; x++) S(x, LY, z, B.boards);
      for (const x of [LX0, 30, 36, 42, X1 - 1]) w.box(x, G + 1, 25, x, LY - 1, 25, B.log);
      w.box(LX0, LY - 1, 25, X1 - 1, LY - 1, 25, B.log);
      for (let x = LX0 + 4; x <= X1 - 1; x++) { if (x === 32) continue; S(x, LY + 1, 25, x % 3 === 0 ? B.log : B.cart); if (x % 3 === 0) S(x, LY + 2, 25, B.log); }
      // 계단: 부엌과 맷돌방 사이에서 북쪽으로 올라 다락 서쪽 끝에 닿는다
      for (let k = 1; k <= 7; k++) { const z = 33 - k; w.box(LX0, G + 1, z, LX0 + 2, G + k, z, k % 2 ? B.boards : B.cart); S(LX0 + 3, G + k + 1, z, B.log); }
      for (let y = G + 1; y <= G + 8; y++) S(LX0 + 3, y, 32, B.log);
      // 다락 위 밀 포대와 곡물 통, 다락 아래 반죽 재료와 통
      for (let z = 19; z <= 23; z++) for (let x = 28; x <= 46; x++) {
        if (x >= 33 && x <= 35) continue;
        const h = Math.round(1 + 2.2 * hash3(x >> 1, 3, z >> 1)) - (z === 23 ? 1 : 0);
        for (let y = LY + 1; y <= LY + h; y++) S(x, y, z, (x + y + z) % 3 ? B.sack : B.sack2);
      }
      w.box(33, LY + 1, 19, 35, LY + 3, 20, B.crate); w.box(34, LY + 3, 19, 34, LY + 3, 20, B.wheat);
      // 포대 도르래: 다락 앞 들보 끝에서 밧줄로 포대를 내린다(부품)
      const HPX = 32, HPZ = 27, HPY = TOP - 1;
      w.box(HPX, HPY, Z0 + 1, HPX, HPY, HPZ, B.log); S(HPX, HPY - 1, HPZ, B.iron);
      const RL = HPY - 2 - (LY + 2);
      const hrope = w.prop({ name: 'hrope', pivot: [HPX + 0.5, HPY - 1, HPZ + 0.5] });
      hrope.box(HPX, LY + 3, HPZ, HPX, HPY - 2, HPZ, B.rope);
      const hsack = w.prop({ name: 'hsack', pivot: [HPX + 0.5, LY + 1, HPZ + 0.5] });
      hsack.box(HPX, LY + 1, HPZ, HPX, LY + 2, HPZ, B.sack); hsack.set(HPX + 1, LY + 1, HPZ, B.sack2);
      w.box(HPX - 1, G + 1, HPZ - 1, HPX + 1, G + 1, HPZ, B.crate); S(HPX + 2, G + 1, HPZ, B.sack);
      // 다락 아래: 밀 통과 포대
      for (const x of [29, 33]) { w.cyl(x, 21, G + 1, G + 3, 1.3, B.cart); S(x, G + 3, 21, B.wheat); }
      for (const [x, z] of [[37, 20], [38, 20], [37, 21], [40, 20], [41, 21]]) { S(x, G + 1, z, B.sack); S(x, G + 2, z, B.sack2); }

      // ── 부엌(서쪽): 벽돌 빵 화덕과 굴뚝, 반죽 통, 빵 탁자, 선반 ──
      const OX = 20, OZ = 21;
      w.ellipsoid(OX, G + 1, OZ, 3.4, 4.2, 3, B.brick, (dx, dy) => dy >= 0);
      w.ellipsoid(OX, G + 1, OZ, 2.2, 3, 1.8, 0, (dx, dy) => dy >= 1);
      w.box(OX - 3, G + 1, OZ - 3, OX + 3, G + 1, OZ + 3, B.brickD);
      w.box(OX - 1, G + 2, OZ + 2, OX + 1, G + 3, OZ + 3, 0); S(OX, G + 4, OZ + 3, 0);
      w.box(OX - 1, G + 2, OZ - 1, OX + 1, G + 2, OZ - 1, B.coal); S(OX - 1, G + 2, OZ, B.coal); S(OX + 1, G + 2, OZ, B.coal); S(OX - 1, G + 3, OZ - 1, B.fire); S(OX + 1, G + 3, OZ - 1, B.fire2); S(OX, G + 3, OZ - 1, B.fire);
      w.box(OX - 1, G + 6, Z0 + 1, OX + 1, TOP + 2, Z0 + 2, B.brickD); S(OX, TOP + 3, Z0 + 1, 0);
      lights.push({ name: 'oven', p: [OX + 0.5, G + 3, OZ + 2.5], c: '#ff9a3a', i: 1.1, d: 16, flicker: 0.3, srcR: 3 });
      const peel = w.prop({ name: 'peel', pivot: [OX + 0.5, G + 3, OZ + 1.5] });
      peel.box(OX, G + 2, OZ, OX, G + 2, OZ + 1, B.cart); peel.set(OX, G + 3, OZ, B.bread); peel.set(OX, G + 3, OZ + 1, B.breadL); peel.box(OX, G + 2, OZ + 2, OX, G + 2, OZ + 2, B.log);
      // 반죽 통(부품: 반죽이 부푼다)
      w.box(17, G + 1, 30, 19, G + 2, 34, B.cart); w.box(18, G + 2, 31, 18, G + 2, 33, 0);
      const dough = w.prop({ name: 'dough', pivot: [18.5, G + 2, 32.5] }); dough.box(18, G + 2, 31, 18, G + 2, 33, B.dough);
      for (const z of [30, 34]) S(17, G + 3, z, B.log);
      // 빵 탁자: 체크 보, 빵 덩이, 밀가루 단지
      w.box(21, G + 1, 36, 21, G + 2, 36, B.log); w.box(25, G + 1, 36, 25, G + 2, 36, B.log); w.box(21, G + 1, 40, 21, G + 2, 40, B.log); w.box(25, G + 1, 40, 25, G + 2, 40, B.log);
      w.box(21, G + 3, 36, 25, G + 3, 40, B.check);
      for (const [x, z, b] of [[22, 37, B.bread], [23, 37, B.breadL], [24, 38, B.bread], [22, 39, B.breadL], [24, 40, B.pot], [23, 39, B.flour]]) S(x, G + 4, z, b);
      for (const [x, z] of [[20, 38], [26, 38], [23, 35], [23, 41]]) S(x, G + 1, z, B.log);
      // 서쪽 벽 선반: 단지, 빵, 말린 허브
      for (const y of [G + 4, G + 7]) { w.box(X0 + 1, y, 36, X0 + 1, y, 41, B.cart); for (let z = 36; z <= 41; z++) S(X0 + 1, y + 1, z, [B.jar, B.pot, B.bread, B.jar, B.flour, B.pot][(z + y) % 6]); }
      for (let z = 27; z <= 33; z += 2) { S(X0 + 1, G + 8, z, B.rope); S(X0 + 1, G + 7, z, B.herb); }
      w.box(X0 + 1, G + 1, 24, X0 + 2, G + 2, 26, B.crate); S(X0 + 1, G + 3, 24, B.pumpkin); S(X0 + 2, G + 3, 26, B.apple);
      // 부엌 등
      S(26, G + 5, 36, B.lamp); w.box(26, G + 1, 35, 26, G + 4, 35, B.log); S(26, G + 5, 35, B.log);
      lights.push({ name: 'kitchen', p: [26.5, G + 5, 36.5], c: '#ffd890', i: 0.6, d: 14, flicker: 0.12, srcR: 3 });
      landmarks.push({ name: '방앗간 부엌', note: '빵 화덕 · 반죽 통 · 햇밀 빵', p: [21, G + 14, 30] });
      landmarks.push({ name: '곡물 다락', note: '밀 포대 · 포대 도르래', p: [37, LY + 10, 22] });

      // 맷돌방 등과 문간 등
      S(44, G + 6, 25, B.lamp);
      lights.push({ name: 'millroom', p: [44.5, G + 6, 26], c: '#ffd890', i: 0.6, d: 16, flicker: 0.1, srcR: 3 });
      lights.push({ name: 'flour', p: [MX + 0.5, G + 6, MZ + 0.5], c: '#fff4e0', i: 0, d: 12, flicker: 0, srcR: 3 });
      S(MX + 2, G + 6, MZ - 1, B.lamp);
      lights.push({ name: 'porch', p: [DX0 - 0.5, G + 6, Z1 + 0.5], c: '#ffd890', i: 0.6, d: 10, flicker: 0.1, night: true });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [DX0 + 1, G + 1, Z1], h: 5, name: '밖으로 나가기', goto: 'harvest', hint: '문을 나서 연못가 물길 옆 황금들녘으로 돌아가요', hit: [DX0, G + 1, Z1, DX1, G + 4, Z1] }));
      acts.push({
        name: '수문 열기', hint: '수문 널판을 들어 올리면 물살이 쏟아져 물레와 톱니바퀴가 힘차게 돌아요', hit: [CHX0 - 1, G + 1, SGZ - 1, CHX1 + 1, G + 5, SGZ + 1],
        run: async a => {
          await a.move('sluice', [0, 4, 0], 1);
          const sp = Promise.all([a.spin('waterwheel', 6, 4.5), a.spin('gear', 6, 4.5)]);
          for (let k = 0; k < 9; k++) {
            a.burst([53.5, G + 0.5, SGZ + 1.5], { n: 16, colors: ['#ffffff', '#d8f0ff', '#a8d0c0'], speed: 2.5, up: 1.5, life: 0.8, gravity: 6, spread: 1.6 });
            if (k % 2) a.burst([WX + 0.5, G, AZ + 0.5 + (k % 4 === 1 ? 4 : -4)], { n: 14, colors: ['#ffffff', '#d8f0ff'], speed: 3, up: 4, life: 0.9, gravity: 9, spread: 1.2 });
            await a.wait(0.45);
          }
          await sp; await a.move('sluice', [0, 0, 0], 1.2);
        },
      });
      acts.push({
        name: '맷돌 돌리기', hint: '위 맷돌이 드르륵 돌며 햇밀을 빻고, 홈을 타고 하얀 밀가루가 흘러내려요', hit: [MX - 3, G + 1, MZ - 3, MX + 3, G + 9, MZ + 3],
        run: async a => {
          const sp = a.spin('runner', 1, 4.2);
          a.flash('flour', 3, 4);
          for (let k = 0; k < 10; k++) {
            a.burst([MX + 0.5, G + 9.5, MZ + 0.5], { n: 6, colors: ['#e0bc50', '#f0d070'], speed: 0.3, up: -1, life: 0.6, gravity: 6, spread: 0.3 });
            a.burst([MX + 0.5, G + 2.8, MZ + 5.5], { n: 12, colors: ['#ffffff', '#f8f4ea', '#f0e8d0'], speed: 1, up: 1, life: 1.6, gravity: 0.6, spread: 0.8 });
            await a.wait(0.4);
          }
          await sp;
        },
      });
      acts.push({
        name: '밀가루 체질', hint: '체를 탈탈 흔들 때마다 고운 밀가루가 눈처럼 통 안으로 내려앉아요', hit: [SX - 1, G + 1, SZ - 1, SX + 2, G + 4, SZ + 2],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.move('sieve', [k % 2 ? 0.9 : -0.9, 0.2, 0], 0.16);
            a.burst([SX + 1, G + 3, SZ + 1], { n: 14, colors: ['#ffffff', '#f8f4ea'], speed: 0.6, up: 0.2, life: 1.4, gravity: 1.2, spread: 0.8 });
            a.burst([SX + 1, G + 5, SZ + 1], { n: 6, colors: ['#ffffff', '#f0e8d0'], speed: 0.8, up: 1, life: 1.6, gravity: -0.2, spread: 1 });
          }
          await a.move('sieve', [0, 0, 0], 0.2);
          await a.move('sieve', [0, 1.8, 0], 0.3); await a.move('sieve', [0, 0, 0], 0.3);
        },
      });
      acts.push({
        name: '햇밀 빵 굽기', hint: '화덕 불이 확 일고, 나무 삽에 올린 노릇노릇한 햇밀 빵이 김을 내며 나와요', hit: [OX - 3, G + 1, OZ - 3, OX + 3, G + 5, OZ + 4],
        run: async a => {
          a.flash('oven', 4, 2.5); a.glow(1.3, 2.5);
          for (let k = 0; k < 4; k++) { a.burst([OX + 0.5, G + 3, OZ + 3.5], { n: 12, colors: ['#ff9a3a', '#ffd060', '#ffffff'], speed: 1.5, up: 2, life: 0.8, gravity: -0.5, spread: 0.6 }); await a.wait(0.3); }
          await a.move('peel', [0, 0, 4], 1.1);
          for (let k = 0; k < 6; k++) { a.burst([OX + 0.5, G + 4, OZ + 5], { n: 6, colors: ['#ffffff', '#f0e8d8'], speed: 0.4, up: 1.4, life: 1.6, gravity: -0.4, spread: 0.4 }); await a.wait(0.35); }
          await a.move('peel', [0, 0, 0], 1);
        },
      });
      acts.push({
        name: '다락 포대 내리기', hint: '도르래 밧줄이 풀리며 곡물 다락의 밀 포대가 아래층 맷돌방으로 스르르 내려와요', hit: [HPX - 1, G + 1, HPZ - 1, HPX + 1, LY + 3, HPZ + 1],
        run: async a => {
          const dn = LY - G - 1;
          await Promise.all([a.move('hsack', [0, -dn, 0], 2.4), a.rope('hrope', RL, RL + dn, 2.4)]);
          a.burst([HPX + 0.5, G + 2.2, HPZ + 0.5], { n: 16, colors: ['#f8f4ea', '#d8c8a0'], speed: 1.6, up: 0.6, life: 0.8, gravity: 2, spread: 0.8, flat: true });
          await a.wait(1.2);
          await Promise.all([a.move('hsack', [0, 0, 0], 2), a.rope('hrope', RL, RL, 2)]);
        },
      });
      acts.push({
        name: '반죽 통', hint: '반죽 통 속 햇밀 반죽이 몽글몽글 부풀어 올라 통 밖으로 넘칠 듯해요', hit: [17, G + 1, 30, 19, G + 4, 34],
        run: async a => {
          await a.tween('dough', { scl: [1.8, 5.5, 1.3] }, 2);
          for (let k = 0; k < 4; k++) { a.burst([18.5, G + 5, 32.5], { n: 8, colors: ['#f0e2c4', '#ffffff'], speed: 0.6, up: 1, life: 1, gravity: 0.6, spread: 0.6 }); await a.wait(0.3); }
          await a.tween('dough', { scl: [1, 1, 1] }, 1.2);
          a.burst([18.5, G + 3, 32.5], { n: 14, colors: ['#ffffff', '#f8f4ea'], speed: 1.4, up: 1.4, life: 1.2, gravity: 1, spread: 1 });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
