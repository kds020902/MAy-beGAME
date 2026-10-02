// 성 내부 — 지붕을 걷어 낸 왕성 본관: 알현실, 현관 홀, 연회장과 주방, 서고, 보물고, 무기고 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const { KP } = window.KINGDOM;
  MAPS.push({
    id: 'innerkeep', cat: 'kingdom', name: '성 내부', en: 'Inner Keep', color: '#e8c04a', seed: 251, base: 22, time: 'night',
    desc: '지붕을 걷어 내고 들여다본 왕성 본관. 알현실의 붉은 융단이 왕좌까지 곧게 뻗어 있다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕성 본관 1층'], ['명물', '알현실 · 왕실 서고 · 보물고'], ['소문', '보물고 열쇠는 왕관 안쪽에 숨겨져 있다']] },
    sky: ['#2a2238', '#0e0c18', '#5a4468'], stars: true,
    hemi: ['#d8c8e8', '#2a2030', 0.5], sun: ['#c8c0f0', 0.42, [0.5, 1, 0.55]],
    day: { sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false, hemi: ['#ffffff', '#5a5a60', 0.62], sun: ['#fff4e0', 0.8, [0.5, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
    fog: { start: 0.8, floor: 12, depth: 10 },
    camY: 6,
    particles: [{ n: 110, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.2, y0: 26, y1: 50, glow: false }],
    blocks: Object.assign({}, KP, {
      tile: { c: '#9a9aa4', top: '#c4c0cc', v: 0.04, pat: 'check', alt: '#8a8694' }, marble: { c: '#e8e4ec', top: '#f0ecf2', v: 0.03, pat: 'check', alt: '#3a3848' },
      plankF: { c: '#7a5434', top: '#946a44', v: 0.06, pat: 'plank' }, kfloor: { c: '#8a8680', top: '#a09a90', v: 0.08, pat: 'stone' },
      cut: { c: '#32303c', v: 0.02 }, carpet: { c: '#a02a34', top: '#a82c36', v: 0.03 }, carpetG: { c: '#d8a83a', top: '#e0b040', v: 0.03 }, cushion: { c: '#3a5ab0', v: 0.03 },
      table: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, chair: { c: '#4a2e1c', v: 0.04 }, plate: { c: '#f4f0e8', v: 0.02 }, cloth: { c: '#f0ece0', v: 0.02 },
      food: { c: '#c86a2a', v: 0.1 }, food2: { c: '#8aa83a', v: 0.08 }, wine: { c: '#6a1a2a', v: 0.03 },
      book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a7a', v: 0.05 }, book3: { c: '#3a6a3a', v: 0.05 }, book4: { c: '#8a6a2a', v: 0.05 }, shelf: { c: '#5a3a24', v: 0.04 },
      globe: { c: '#3a7ab0', v: 0.1 }, chest: { c: '#6a4428', v: 0.05, pat: 'plank' }, steel: { c: '#aab0bc', v: 0.04 }, hearth: { c: '#5a5660', v: 0.06, pat: 'brick' },
      glassR: { c: '#ff5a6a', glow: true }, glassB: { c: '#6aa8ff', glow: true }, glassY: { c: '#ffd070', glow: true },
      candle: { c: '#ffe2a0', glow: true }, fire: { c: '#ff9a3a', glow: true }, gemR: { c: '#ff3a5a', glow: true }, gemB: { c: '#5ac8ff', glow: true }, coin: { c: '#ffd860', glow: true },
    }),
    build(w) {
      const B = w.id, base = w.base, F = base + 2, Y = F + 1, WH = 10;
      MH.terrain(w, { floor: 4, height: () => base + 1, surface: (x, z) => hash3(x, 1, z) > 0.5 ? B.grass : B.grass2, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const X0 = 14, X1 = 114, Z0 = 12, Z1 = 112;
      MH.flatten(w, X0 - 3, Z0 - 3, X1 + 3, Z1 + 3, F, B.tile, B.found);
      const lights = [], acts = [], landmarks = [];
      const floor = (x0, z0, x1, z1, b) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) w.set(x, F, z, b); };
      const wall = (x0, z0, x1, z1, h) => { w.box(x0, Y, z0, x1, Y + (h || WH) - 1, z1, B.white); w.box(x0, Y + (h || WH) - 1, z0, x1, Y + (h || WH) - 1, z1, B.cut); w.box(x0, Y, z0, x1, Y, z1, B.whiteDk); };
      const gap = (x0, z0, x1, z1, h) => w.box(x0, Y, z0, x1, Y + (h || 7), z1, 0);
      const candelabra = (x, z, lit) => { w.box(x, Y, z, x, Y + 5, z, B.gold); w.box(x - 1, Y + 5, z, x + 1, Y + 5, z, B.gold); w.set(x, Y + 6, z, B.candle); w.set(x - 1, Y + 6, z, B.candle); w.set(x + 1, Y + 6, z, B.candle); if (lit) lights.push({ name: lit === true ? undefined : lit, p: [x + 0.5, Y + 7, z + 0.5], c: '#ffd890', i: 1.3, d: 18, flicker: 0.2 }); };
      // ── 바깥벽과 칸막이 ──
      wall(X0, Z0, X1, Z0 + 1); wall(X0, Z1 - 1, X1, Z1); wall(X0, Z0, X0 + 1, Z1); wall(X1 - 1, Z0, X1, Z1);
      wall(39, Z0, 40, Z1); wall(88, Z0, 89, Z1);            // 서·동 익랑을 가르는 벽
      wall(40, 60, 88, 61);                                   // 알현실 / 현관 홀
      wall(X0, 70, 39, 71); wall(89, 62, X1, 63); wall(89, 90, X1, 91);
      gap(60, Z1 - 1, 68, Z1, 8);                             // 정문
      gap(39, 40, 40, 44); gap(39, 84, 40, 88); gap(88, 34, 89, 38); gap(88, 74, 89, 78); gap(88, 98, 89, 102); gap(24, 70, 29, 71);
      // 모서리 탑(나선 계단)
      for (const [tx, tz] of [[X0, Z0], [X1, Z0], [X0, Z1], [X1, Z1]]) {
        w.cyl(tx, tz, Y, Y + WH + 2, 5.4, B.white); w.cyl(tx, tz, Y, Y + WH + 2, 4, 0); w.cyl(tx, tz, F, F, 4, B.kfloor);
        w.ring(tx, tz, Y + WH + 2, 4, 5.4, B.cut);
        for (let i = 0; i < 26; i++) { const a = i * 0.5; w.set(Math.round(tx + Math.cos(a) * 2.6), Y + Math.floor(i / 2), Math.round(tz + Math.sin(a) * 2.6), B.found); }
        w.box(tx, Y, tz, tx, Y + 12, tz, B.found);
      }
      // ── 알현실 ──
      floor(41, 14, 87, 59, B.marble);
      for (let z = 22; z <= 59; z++) for (let x = 61; x <= 67; x++) w.set(x, F, z, (x === 61 || x === 67) ? B.carpetG : B.carpet);
      for (let s = 0; s < 4; s++) w.box(52 + s, Y + s, 14, 76 - s, Y + s, 21 - s, s % 2 ? B.gold : B.white);
      const ty = Y + 4;
      w.box(61, ty, 14, 67, ty, 17, B.gold); w.box(61, ty + 1, 14, 67, ty + 9, 14, B.gold); w.box(62, ty + 1, 15, 66, ty + 1, 16, B.cushion);
      w.box(61, ty + 1, 15, 61, ty + 3, 16, B.gold); w.box(67, ty + 1, 15, 67, ty + 3, 16, B.gold);
      for (const [sx, h] of [[61, 11], [62, 12], [63, 13], [64, 15], [65, 13], [66, 12], [67, 11]]) w.box(sx, ty + 10, 14, sx, ty + h, 14, B.gold);
      w.set(64, ty + 12, 15, B.gemR); w.box(63, ty + 2, 15, 65, ty + 2, 15, B.gold); w.set(64, ty + 3, 15, B.gold);
      for (const px of [56, 72]) { w.box(px, ty - 1, 15, px, ty + 11, 15, B.whiteDk); w.box(px, ty + 5, 16, px, ty + 11, 16, B.banner); }
      w.box(56, ty + 12, 15, 72, ty + 12, 16, B.banner);
      for (const x of [48, 80]) for (let z = 24; z <= 56; z += 8) {
        w.cyl(x, z, Y, Y + 8, 1.5, B.white); w.cyl(x, z, Y, Y, 2.2, B.whiteDk); w.cyl(x, z, Y + 9, Y + 9, 2.2, B.gold); w.cyl(x, z, Y + 10, Y + 10, 1.5, B.cut);
        w.box(x + (x < 64 ? 2 : -2), Y + 4, z, x + (x < 64 ? 2 : -2), Y + 8, z, x % 16 === 0 ? B.banner : B.bannerR);
      }
      for (const [gx, gc] of [[46, B.glassR], [52, B.glassB], [76, B.glassB], [82, B.glassR]]) { w.box(gx, Y + 2, Z0 + 1, gx + 2, Y + 8, Z0 + 1, gc); w.box(gx + 1, Y + 2, Z0 + 1, gx + 1, Y + 8, Z0 + 1, B.cut); }
      w.box(63, Y + 15, Z0 + 1, 65, Y + 15, Z0 + 1, B.white);
      candelabra(56, 24, 'throne'); candelabra(72, 24, 'throne'); candelabra(44, 40, true); candelabra(84, 40, true); candelabra(56, 56, false); candelabra(72, 56, false);
      // 알현실 대문(부품): 남쪽 현관 홀 쪽으로 열린다
      gap(60, 60, 67, 61, 9);
      w.box(59, Y, 60, 59, Y + 10, 61, B.gold); w.box(68, Y, 60, 68, Y + 10, 61, B.gold); w.box(59, Y + 10, 60, 68, Y + 10, 61, B.gold);
      const dL = w.prop({ name: 'tdoorL', pivot: [60, Y, 61.5] }), dR = w.prop({ name: 'tdoorR', pivot: [68, Y, 61.5] });
      for (let y = Y; y <= Y + 9; y++) for (let x = 60; x <= 67; x++) (x < 64 ? dL : dR).set(x, y, 61, (y === Y + 3 || y === Y + 7 || x === 63 || x === 64) ? B.gold : B.door);
      acts.push({
        name: '알현실 대문', hint: '금장 대문이 현관 홀 쪽으로 활짝 열려요', hit: [60, Y, 60, 67, Y + 9, 62],
        run: async a => {
          a.flash('throne', 2.2, 5);
          await Promise.all([a.turn('tdoorL', [0, -1.5, 0], 2.2), a.turn('tdoorR', [0, 1.5, 0], 2.2)]);
          a.burst([64.5, ty + 8, 16], { n: 40, colors: ['#ffd860', '#ffffff', '#ffe2a0'], speed: 4, up: 3, life: 2, gravity: 1, spread: 3 });
          await a.wait(2.6);
          await Promise.all([a.turn('tdoorL', [0, 0, 0], 2), a.turn('tdoorR', [0, 0, 0], 2)]);
        },
      });
      landmarks.push({ name: '알현실', note: '왕좌와 스테인드글라스', p: [64.5, ty + 20, 16.5], tag: 'THRONE' });
      // ── 현관 홀: 큰 계단(잘린 중이층으로) ──
      floor(41, 62, 87, 109, B.marble);
      for (let z = 62; z <= 109; z++) for (let x = 61; x <= 67; x++) w.set(x, F, z, (x === 61 || x === 67) ? B.carpetG : B.carpet);
      for (const sx of [42, 78]) for (let s = 0; s < 9; s++) { w.box(sx, Y + s, 74 + s, sx + 8, Y + s, 74 + s, B.white); w.box(sx + 2, Y + s, 74 + s, sx + 6, Y + s, 74 + s, B.carpet); MH.footing(w, sx, 74 + s, sx + 8, 74 + s, Y + s, B.whiteDk); w.set(sx, Y + s + 1, 74 + s, B.gold); w.set(sx + 8, Y + s + 1, 74 + s, B.gold); }
      for (const sx of [42, 78]) { w.box(sx, Y, 83, sx + 8, Y + 8, 92, B.whiteDk); w.box(sx, Y + 9, 83, sx + 8, Y + 9, 92, B.cut); w.box(sx + 1, Y + 9, 83, sx + 7, Y + 9, 90, B.carpet); }
      candelabra(56, 66, true); candelabra(72, 66, true); candelabra(56, 106, false); candelabra(72, 106, false);
      for (const [px, pz] of [[46, 104], [82, 104], [46, 66], [82, 66]]) { w.cyl(px, pz, Y, Y + 1, 1.4, B.whiteDk); MH.leafBlob(w, px, Y + 4, pz, 2.4, 2.4, 2.4, [B.leaf2, B.leaf, B.leafDk]); w.box(px, Y + 2, pz, px, Y + 3, pz, B.bark); }
      for (const bx of [50, 78]) w.box(bx, Y + 3, Z1 - 2, bx, Y + 8, Z1 - 2, B.banner);
      landmarks.push({ name: '현관 홀', note: '두 갈래 큰 계단과 붉은 융단', p: [64.5, Y + 14, 86.5] });
      // ── 서쪽: 연회장과 주방 ──
      floor(16, 14, 38, 69, B.plankF); floor(16, 72, 38, 110, B.kfloor);
      for (const tx of [21, 31]) {
        w.box(tx, Y, 22, tx + 2, Y, 60, B.table); w.box(tx, Y + 1, 22, tx + 2, Y + 1, 60, B.cloth);
        for (let z = 23; z <= 59; z += 3) { w.set(tx - 1, Y, z, B.chair); w.set(tx - 1, Y + 1, z, B.chair); w.set(tx + 3, Y, z, B.chair); w.set(tx + 3, Y + 1, z, B.chair); w.set(tx, Y + 2, z, B.plate); w.set(tx + 2, Y + 2, z, B.plate); w.set(tx + 1, Y + 2, z, [B.food, B.wine, B.food2][(z / 3 | 0) % 3]); }
        for (const z of [30, 42, 54]) { w.box(tx + 1, Y + 2, z + 1, tx + 1, Y + 3, z + 1, B.gold); w.set(tx + 1, Y + 4, z + 1, B.candle); }
        lights.push({ p: [tx + 1.5, Y + 5, 43.5], c: '#ffd890', i: 1, d: 16, flicker: 0.2 });
      }
      // 큰 벽난로(서쪽 벽)
      w.box(16, Y, 34, 18, Y + 9, 48, B.hearth); w.box(17, Y, 37, 18, Y + 5, 45, 0); w.box(16, Y + 10, 36, 17, Y + 14, 46, B.hearth); w.box(16, Y + 14, 36, 17, Y + 14, 46, B.cut);
      w.box(17, Y, 38, 17, Y + 1, 44, B.wood); w.box(17, Y + 1, 39, 17, Y + 3, 43, B.fire); w.set(17, Y + 4, 41, B.candle); w.box(19, Y + 6, 36, 19, Y + 6, 46, B.gold);
      lights.push({ name: 'hearth', p: [19, Y + 3, 41.5], c: '#ff9a40', i: 1.8, d: 22, flicker: 0.35 });
      acts.push({
        name: '연회장 벽난로', hint: '장작이 타오르며 불꽃이 튀어요', hit: [16, Y, 36, 19, Y + 9, 46],
        run: async a => { a.flash('hearth', 2.6, 3); for (let k = 0; k < 6; k++) { a.burst([19, Y + 3, 41.5], { n: 30, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3, up: 5, life: 1.3, gravity: 3, spread: 2 }); await a.wait(0.45); } },
      });
      landmarks.push({ name: '연회장', note: '긴 식탁 두 줄과 큰 벽난로', p: [27.5, Y + 12, 42.5] });
      // 주방: 화덕, 조리대, 통, 매단 냄비
      w.box(16, Y, 98, 18, Y + 6, 108, B.hearth); w.box(17, Y + 1, 100, 18, Y + 3, 102, 0); w.box(17, Y + 1, 104, 18, Y + 3, 106, 0); w.set(17, Y + 1, 101, B.fire); w.set(17, Y + 1, 105, B.fire);
      lights.push({ p: [19, Y + 2, 103.5], c: '#ff9a40', i: 1.2, d: 14, flicker: 0.3 });
      w.box(24, Y, 80, 32, Y + 1, 84, B.table); for (let x = 24; x <= 32; x += 2) w.set(x, Y + 2, 82, [B.food, B.food2, B.plate][x % 3]);
      w.box(24, Y, 94, 32, Y + 1, 98, B.table); w.set(26, Y + 2, 96, B.food2); w.set(30, Y + 2, 96, B.food);
      for (const [bx, bz] of [[36, 74], [36, 76], [35, 75], [36, 108], [34, 108], [36, 106]]) { w.set(bx, Y, bz, B.barrel); w.set(bx, Y + 1, bz, B.barrel); }
      for (let x = 22; x <= 34; x += 3) { w.set(x, Y + 8, 73, B.iron); w.set(x, Y + 7, 73, B.iron); w.set(x, Y + 6, 73, x % 2 ? B.steel : B.gold); }
      landmarks.push({ name: '주방', note: '화덕 두 개와 조리대', p: [27.5, Y + 10, 92.5] });
      // ── 동쪽: 왕실 서고, 보물고, 무기고 ──
      floor(90, 14, 112, 61, B.plankF); floor(90, 64, 112, 89, B.tile); floor(90, 92, 112, 110, B.kfloor);
      const books = [B.book1, B.book2, B.book3, B.book4];
      const shelfRow = (x0, x1, z) => { for (let x = x0; x <= x1; x++) for (let y = Y; y <= Y + 7; y++) w.set(x, y, z, (y - Y) % 2 === 1 || x === x0 || x === x1 ? B.shelf : books[(hash3(x, y, z) * 4) | 0]); };
      shelfRow(92, 111, 15); for (const z of [24, 32, 40, 48]) shelfRow(96, 108, z);
      for (let z = 16; z <= 58; z += 2) for (let y = Y; y <= Y + 7; y++) if (z < 33 || z > 39) w.set(112, y, z, (y - Y) % 2 === 1 ? B.shelf : books[(hash3(1, y, z) * 4) | 0]);
      for (let y = Y; y <= Y + 7; y++) { w.set(94, y, 25, B.wood); if (y % 2) w.set(95, y, 25, B.wood); }
      w.box(98, Y, 54, 106, Y, 57, B.table); w.set(100, Y + 1, 55, B.book2); w.set(104, Y + 1, 56, B.book1); w.box(102, Y + 1, 55, 102, Y + 2, 55, B.gold); w.set(102, Y + 3, 55, B.candle);
      w.box(93, Y, 56, 93, Y + 1, 56, B.wood); w.sphere(93, Y + 3, 56, 1.5, B.globe);
      lights.push({ p: [102.5, Y + 4, 55.5], c: '#ffe0a0', i: 1.1, d: 16, flicker: 0.15 });
      landmarks.push({ name: '왕실 서고', note: '왕국의 연대기가 잠든 서가', p: [102.5, Y + 14, 36.5] });
      // 보물고: 금화 더미, 보석, 뚜껑이 열리는 상자
      for (let i = 0; i < 140; i++) { const x = w.ri(92, 111), z = w.ri(66, 80); let y = Y; while (w.get(x, y, z)) y++; if (y < Y + 4 && MH.dist(x, z, 101, 84) > 4) w.set(x, y, z, hash3(x, y, z) > 0.85 ? B.coin : B.gold); }
      w.set(96, Y + 3, 70, B.gemR); w.set(106, Y + 2, 72, B.gemB); w.set(100, Y + 3, 68, B.gemB); w.set(109, Y + 3, 76, B.gemR);
      const CXX = 101, CZZ = 84;
      w.box(CXX - 3, Y, CZZ - 1, CXX + 3, Y + 2, CZZ + 2, B.chest); w.box(CXX - 3, Y, CZZ - 1, CXX - 3, Y + 2, CZZ + 2, B.gold); w.box(CXX + 3, Y, CZZ - 1, CXX + 3, Y + 2, CZZ + 2, B.gold); w.box(CXX, Y, CZZ + 2, CXX, Y + 2, CZZ + 2, B.gold);
      w.box(CXX - 2, Y + 2, CZZ, CXX + 2, Y + 2, CZZ + 1, B.coin);
      const lid = w.prop({ name: 'clid', pivot: [CXX + 0.5, Y + 3, CZZ - 1], axis: 'x' });
      lid.box(CXX - 3, Y + 3, CZZ - 1, CXX + 3, Y + 3, CZZ + 2, B.chest); lid.box(CXX - 2, Y + 4, CZZ, CXX + 2, Y + 4, CZZ + 1, B.chest);
      lid.box(CXX - 3, Y + 3, CZZ - 1, CXX - 3, Y + 3, CZZ + 2, B.gold); lid.box(CXX + 3, Y + 3, CZZ - 1, CXX + 3, Y + 3, CZZ + 2, B.gold); lid.set(CXX, Y + 3, CZZ + 2, B.gold);
      lights.push({ name: 'gold', p: [CXX + 0.5, Y + 4, CZZ + 0.5], c: '#ffd070', i: 0.9, d: 14, flicker: 0.05 });
      w.box(88, Y, 74, 89, Y + 7, 78, 0); w.box(88, Y + 8, 74, 89, Y + 8, 78, B.iron); for (const z of [74, 78]) w.box(88, Y, z, 89, Y + 7, z, B.iron);
      acts.push({
        name: '보물 상자', hint: '뚜껑이 열리고 금빛이 쏟아져요', hit: [CXX - 3, Y, CZZ - 1, CXX + 3, Y + 4, CZZ + 2],
        run: async a => {
          await a.turn('clid', [-1.25, 0, 0], 1);
          a.flash('gold', 4, 3); a.glow(1.6, 3);
          for (let k = 0; k < 5; k++) { a.burst([CXX + 0.5, Y + 4, CZZ + 1], { n: 30, colors: ['#ffd860', '#ffffff', '#ff3a5a', '#5ac8ff'], speed: 3, up: 5, life: 1.6, gravity: 3, spread: 2 }); await a.wait(0.5); }
          await a.turn('clid', [0, 0, 0], 0.9);
        },
      });
      landmarks.push({ name: '보물고', note: '금화 더미와 보석함', p: [101.5, Y + 12, 76.5] });
      // 무기고: 창 걸이, 방패 벽, 갑옷 상자
      for (let x = 94; x <= 110; x += 4) { w.box(x, Y, 108, x, Y + 1, 108, B.wood); w.box(x, Y + 2, 108, x, Y + 7, 108, B.steel); w.set(x, Y + 8, 108, B.iron); }
      for (let z = 94; z <= 106; z += 4) { w.box(112, Y + 3, z, 112, Y + 5, z + 1, z % 8 === 6 ? B.banner : B.bannerR); w.set(112, Y + 4, z, B.gold); }
      w.box(94, Y, 96, 96, Y + 1, 98, B.chest); w.box(102, Y, 96, 104, Y + 1, 98, B.chest); w.box(98, Y, 102, 100, Y, 104, B.steel);
      candelabra(100, 94, true);
      landmarks.push({ name: '무기고', note: '창과 방패가 늘어선 방', p: [102.5, Y + 12, 100.5] });
      // 바깥 뜰: 산울타리와 횃불
      for (const [x, z] of [[58, 116], [70, 116]]) { w.box(x, Y, z, x, Y + 4, z, B.iron); w.set(x, Y + 5, z, B.fire); lights.push({ p: [x + 0.5, Y + 6, z + 0.5], c: '#ffb050', i: 1.1, d: 14, flicker: 0.3 }); }
      for (let x = 20; x <= 108; x += 3) { if (x > 54 && x < 74) continue; w.set(x, F + 1, 118, B.hedge); w.set(x + 1, F + 1, 118, B.hedge); if (x % 2) w.set(x, F + 2, 118, B.hedge); }
      return { lights, landmarks, acts };
    },
  });
})();
