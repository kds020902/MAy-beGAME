// 화덕의 저택 본관(하위 지도) — 헤스티아 파밀리아 홈 안. 가운데 체크무늬 현관 홀과 2층으로 오르는 계단,
// 서쪽 거실의 큰 화덕 벽난로와 긴 붉은 소파, 동쪽 식당·부엌, 2층 회랑의 벨의 방과 헤스티아의 방. 남·동쪽 벽은 잘라 낮췄다 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 112, D = 72, Hh = 48, G = 12;
  MAPS.push({
    id: 'hestia-manor', cat: 'orario', sub: true, parent: 'hestia', name: '화덕의 저택 본관', en: 'Hestia Familia · Hearth Mansion Hall', color: '#f0a050', seed: 11031, base: G, time: 'day', size: [W, D, Hh],
    spawn: [56, G + 1, 46],
    desc: '전쟁유희에서 얻은 「화덕의 저택」 안. 쌍여닫이문을 열면 체크무늬 현관 홀과 2층 회랑으로 오르는 계단이 나오고, 서쪽 거실에는 이름 그대로 큰 화덕 벽난로가 타오른다. 동쪽은 단원들이 다 함께 둘러앉는 긴 식탁과 부엌, 2층에는 벨의 방과 헤스티아의 방이 있다.',
    info: { title: '장소 정보', en: 'HEARTH MANSION', rows: [['1층', '현관 홀 · 거실(화덕) · 식당과 부엌'], ['2층 회랑', '벨의 방 · 헤스티아의 방'], ['자랑', '거실의 큰 화덕과 긴 소파']] },
    sky: ['#f4e4cc', '#c8a880', '#fff4e0'], stars: false,
    hemi: ['#fff4e4', '#6a5440', 0.66], sun: ['#fff0d8', 0.62, [0.45, 1, 0.6]],
    night: { sky: ['#3a2c28', '#141010', '#c87a48'], stars: false, hemi: ['#d8b898', '#1c1410', 0.46], sun: ['#ffd0a0', 0.3, [0.45, 1, 0.6]], haze: '#2c2420' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.3,
    fog: { start: 0.9, floor: G - 6, depth: 6, haze: [8, 0.12, 6], hazeColor: '#e8dcc8' },
    camY: -8, zoom: 1.2,
    particles: [
      { n: 90, colors: ['#fff6d8', '#ffffff', '#f0e0c0'], mode: 'drift', speed: 0.12, wind: 0.08, area: [56, 32, 36], y0: G + 2, y1: G + 15, glow: true },
      { n: 40, colors: ['#ff9a3a', '#ffd070', '#ff6a1a'], mode: 'rise', speed: 0.5, area: [17, 37.5, 1.5], y0: G + 2, y1: G + 8, glow: true },
      { n: 24, colors: ['#e8e4dc', '#ffffff'], mode: 'rise', speed: 0.3, area: [88.5, 14.5, 1], y0: G + 5, y1: G + 12, glow: false, size: 2 },
    ],
    blocks: Object.assign(OR.blocks(), {
      mBase: { c: '#a8604a', v: 0.05, pat: 'brick' }, mWall: { c: '#e8dcc0', v: 0.04, pat: 'big' }, mTrim: { c: '#f6efe0', v: 0.02 }, mPil: { c: '#d8caa8', v: 0.03 },
      wain: { c: '#7a5232', v: 0.04, pat: 'plank' }, floorW: { c: '#8a6440', top: '#a87a4c', v: 0.05, pat: 'plank' }, floorK: { c: '#c8bca4', top: '#d8ccb4', v: 0.03, pat: 'check', alt: '#a89a82' },
      hallF: { c: '#d8ccb0', top: '#e6dcc4', v: 0.03, pat: 'check', alt: '#9a7a5a' }, runner: { c: '#a83a3a', v: 0.04 }, runnerE: { c: '#d8b048', v: 0.03 },
      rug: { c: '#b85a3a', v: 0.05, pat: 'check', alt: '#a84a32' }, rugE: { c: '#e8c870', v: 0.04 },
      plank: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' }, dark: { c: '#4a3426', v: 0.04 },
      sofa: { c: '#a83a3a', v: 0.04 }, sofaC: { c: '#c85a4a', v: 0.03 }, bed: { c: '#ece4d4', v: 0.02 }, blanketB: { c: '#4a6ab8', v: 0.04 }, blanketP: { c: '#e88aa8', v: 0.04 }, pillow: { c: '#ffffff', v: 0.01 },
      bookR: { c: '#8a3a3a', v: 0.04 }, bookB: { c: '#3a4a8a', v: 0.04 }, bookG: { c: '#3a6a4a', v: 0.04 }, bookY: { c: '#c8a040', v: 0.04 },
      lampW: { c: '#ffd890', glow: true }, candle: { c: '#fff0c0', glow: true }, fire: { c: '#ff8a2a', glow: true }, fireY: { c: '#ffd060', glow: true }, ember: { c: '#d84a1a', glow: true },
      hearthS: { c: '#8a6a58', v: 0.06, pat: 'brick' }, soot: { c: '#2a2220', v: 0.03 },
      clock: { c: '#f8f6f0', v: 0.02 }, hand: { c: '#2a2a2e', v: 0.02 }, case: { c: '#5a3a24', v: 0.04 },
      linen: { c: '#f4f0e6', v: 0.02 }, plate: { c: '#ffffff', v: 0.01 }, food: { c: '#d8803a', v: 0.06 }, foodG: { c: '#6aa04a', v: 0.06 }, potato: { c: '#f0c860', v: 0.06 }, crate: { c: '#a8784a', v: 0.05, pat: 'plank' },
      copper: { c: '#c87a48', v: 0.04 }, jar: { c: '#c8d8c8', v: 0.03 }, counter: { c: '#c8c0b0', top: '#e0d8c8', v: 0.03 }, glass: { c: '#a8c8dc', v: 0.03 },
      plant: { c: '#4a8a3a', v: 0.08 }, pot: { c: '#b86a48', v: 0.05 }, frameP: { c: '#6a9ac8', v: 0.05 }, frameG: { c: '#7aa04a', v: 0.05 },
      glyph: { c: '#ffd860', glow: true }, glyphB: { c: '#8ad0ff', glow: true },
    }),
    build(w) {
      const B = w.id;
      const X0 = 14, X1 = 98, Z0 = 12, Z1 = 52, TOP = G + 17, FY = G + 8;    // 벽 · 2층 회랑 바닥
      const LX1 = 43, HX0 = 45, HX1 = 67, DX0 = 69;                          // 거실 | 홀 | 식당·부엌
      const DCX = 56;                                                         // 문 가운데
      const S = (x, y, z, b) => w.set(x, y, z, b);
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 2, z) > 0.9 ? B.leafL : B.grass, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바깥: 앞 돌길과 계단, 생울타리, 마석등 ──
      for (let z = Z1 + 1; z < D; z++) for (let x = DCX - 4; x <= DCX + 4; x++) S(x, G, z, Math.abs(x - DCX) === 4 ? B.mTrim : B.paveL);
      for (let x = X0; x <= X1; x++) if (Math.abs(x - DCX) > 6) S(x, G + 1, Z1 + 4, B.hedge);
      for (const x of [DCX - 7, DCX + 7]) OR.lamp(w, B, x, Z1 + 3, 4);
      for (let k = 0; k < 18; k++) { const x = 4 + (hash3(k, 3, 1) * 104 | 0), z = Z1 + 6 + (hash3(k, 4, 1) * 12 | 0); if (Math.abs(x - DCX) > 6) S(x, G + 1, z, [B.flowerP, B.flowerW, B.flowerY][k % 3]); }

      // ── 바닥: 거실·식당은 널마루, 홀은 체크무늬 돌, 부엌은 타일 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) {
        let b = B.floorW;
        if (x >= HX0 && x <= HX1) b = B.hallF;
        if (x >= DX0 && z <= Z0 + 8) b = B.floorK;
        S(x, G, z, b);
      }
      for (let z = Z0 + 4; z < Z1; z++) for (let x = DCX - 2; x <= DCX + 2; x++) S(x, G, z, Math.abs(x - DCX) === 2 ? B.runnerE : B.runner);   // 붉은 깔개(문 → 계단)

      // ── 벽: 북·서쪽은 2층 높이(징두리 판자, 크림 벽, 층 띠, 창), 남·동쪽은 낮게 ──
      for (let y = G + 1; y <= TOP; y++) {
        for (let x = X0; x <= X1; x++) {
          const u = x - X0;
          let b = y <= G + 3 ? B.wain : (y === FY || y === TOP ? B.mTrim : (y === TOP - 1 ? B.mPil : B.mWall));
          if (u % 8 === 0) b = y === TOP ? B.mTrim : B.mPil;
          const lower = y >= G + 3 && y <= G + 6, upper = y >= FY + 3 && y <= FY + 6;
          if (u % 8 >= 3 && u % 8 <= 5 && ((upper) || (lower && ((x > HX0 + 8 && x < HX1 - 4) || (x > DX0 && x < 84))))) b = u % 8 === 4 && (y === G + 5 || y === FY + 5) ? B.mTrim : B.win;
          S(x, y, Z0, b);
        }
        for (let z = Z0; z <= Z1; z++) {
          const u = z - Z0;
          let b = y <= G + 3 ? B.wain : (y === FY || y === TOP ? B.mTrim : (y === TOP - 1 ? B.mPil : B.mWall));
          if (u % 8 === 0) b = y === TOP ? B.mTrim : B.mPil;
          const lower = y >= G + 3 && y <= G + 6, upper = y >= FY + 3 && y <= FY + 6;
          if (u % 8 >= 3 && u % 8 <= 5 && ((upper && z < 24) || (lower && (z > 42 || (z > 24 && z < 31))))) b = B.win;
          S(X0, y, z, b);
        }
      }
      for (let y = G + 1; y <= G + 3; y++) {
        for (let x = X0; x <= X1; x++) S(x, y, Z1, y === G + 3 ? B.mTrim : B.mBase);
        for (let z = Z0; z <= Z1; z++) S(X1, y, z, y === G + 3 ? B.mTrim : B.mBase);
      }
      for (let x = X0; x <= X1; x += 8) { S(x, G + 4, Z1, B.mPil); }
      for (let z = Z0; z <= Z1; z += 8) { S(X1, G + 4, z, B.mPil); }
      // 쌍여닫이문(닫힌 문짝, 기둥과 상인방, 문 위 반달창)
      for (let x = DCX - 3; x <= DCX + 3; x++) for (let y = G + 1; y <= G + 7; y++) {
        const edge = Math.abs(x - DCX) === 3 || y === G + 6;
        S(x, y, Z1, edge ? (y === G + 6 ? B.mTrim : B.mPil) : (y === G + 7 ? (Math.abs(x - DCX) <= 1 ? B.win : B.mTrim) : (x === DCX ? B.dark : (y === G + 3 ? B.gold : B.door))));
      }
      S(DCX - 1, G + 3, Z1, B.gold); S(DCX + 1, G + 3, Z1, B.gold);
      acts.push(OR.goAct({ at: [DCX, G + 1, Z1 - 1], name: '밖으로 나가기', goto: 'hestia', hint: '쌍여닫이문을 열고 분수가 있는 앞정원으로 나가요', hit: [DCX - 2, G + 1, Z1 - 1, DCX + 2, G + 5, Z1] }));
      // 홀 쪽 기둥 줄(거실·식당과 나눈다)
      for (const px of [X0 + 30, HX1 + 1]) {
        for (let z = Z0 + 13; z < Z1; z += 6) { w.box(px, G + 1, z, px, G + 7, z, B.mPil); S(px, G + 8, z, B.mTrim); }
        w.box(px, G + 9, Z0 + 13, px, G + 9, Z1 - 1, B.plank);
      }

      // ── 2층 회랑(북서쪽): 널마루, 난간, 벨의 방과 헤스티아의 방 ──
      w.box(X0 + 1, FY, Z0 + 1, LX1 + 1, FY, Z0 + 12, B.floorW);
      for (const [x, z] of [[X0 + 10, Z0 + 12], [X0 + 20, Z0 + 12], [LX1 + 1, Z0 + 12]]) w.box(x, G + 1, z, x, FY - 1, z, B.mPil);
      for (let x = X0 + 1; x <= LX1 + 1; x++) { S(x, FY + 1, Z0 + 12, x % 2 ? B.plank : 0); S(x, FY + 2, Z0 + 12, B.dark); S(x, FY - 1, Z0 + 12, B.mTrim); }
      for (let z = Z0 + 4; z <= Z0 + 12; z++) { S(LX1 + 1, FY + 1, z, z % 2 ? B.plank : 0); S(LX1 + 1, FY + 2, z, B.dark); S(LX1 + 1, FY - 1, z, B.mTrim); }
      // 계단: 홀 북쪽 벽을 따라 동쪽(아래)에서 서쪽(위)으로
      for (let k = 0; k < 8; k++) { const x = HX0 + 7 - k; w.box(x, G + 1, Z0 + 1, x, G + 1 + k, Z0 + 3, B.plank); S(x, G + 1 + k, Z0 + 4, B.mTrim); }
      for (let k = 0; k < 8; k += 2) { const x = HX0 + 7 - k; w.box(x, G + 2 + k, Z0 + 4, x, G + 3 + k, Z0 + 4, B.dark); }
      for (let k = 0; k < 8; k++) S(HX0 + 7 - k, G + 4 + k, Z0 + 4, B.dark);
      // 벨의 방(서쪽): 침대, 작은 책상과 책, 문패
      const BX0 = X0 + 1, BX1 = X0 + 15, RX0 = X0 + 17, RX1 = LX1;
      w.box(BX0 + 1, FY + 1, Z0 + 2, BX0 + 3, FY + 1, Z0 + 6, B.plank); w.box(BX0 + 1, FY + 2, Z0 + 3, BX0 + 3, FY + 2, Z0 + 6, B.blanketB); w.box(BX0 + 1, FY + 2, Z0 + 2, BX0 + 3, FY + 2, Z0 + 2, B.pillow); w.box(BX0 + 1, FY + 2, Z0 + 1, BX0 + 3, FY + 2, Z0 + 1, B.plank);
      w.box(BX1 - 5, FY + 1, Z0 + 1, BX1 - 2, FY + 2, Z0 + 1, B.plank); S(BX1 - 5, FY + 3, Z0 + 1, B.bookR); S(BX1 - 4, FY + 3, Z0 + 1, B.bookB); S(BX1 - 2, FY + 3, Z0 + 1, B.lampW);
      S(BX1 - 3, FY + 1, Z0 + 3, B.plank);
      w.box(BX0, FY + 1, Z0 + 9, BX0, FY + 4, Z0 + 11, B.plank); for (let z = Z0 + 9; z <= Z0 + 11; z++) for (const y of [FY + 2, FY + 4]) S(BX0 + 1, y, z, [B.bookR, B.bookG, B.bookY][z % 3]);
      // 방 사이 칸막이와 문패
      w.box(BX1 + 1, FY + 1, Z0 + 1, BX1 + 1, FY + 4, Z0 + 7, B.mWall); w.box(BX1 + 1, FY + 5, Z0 + 1, BX1 + 1, FY + 5, Z0 + 7, B.mTrim);
      S(BX1 + 1, FY + 3, Z0 + 7, B.door); S(BX1 + 1, FY + 3, Z0 + 6, B.gold);
      // 벨의 방 덧창(부품): 북쪽 창 안쪽 두 짝
      const SWX = X0 + 3;
      const shL = w.prop({ name: 'shutL', pivot: [SWX, FY + 3, Z0 + 1.5] }), shR = w.prop({ name: 'shutR', pivot: [SWX + 4, FY + 3, Z0 + 1.5] });
      for (let y = FY + 3; y <= FY + 6; y++) { shL.box(SWX, y, Z0 + 1, SWX + 1, y, Z0 + 1, y === FY + 4 ? B.dark : B.shutter); shR.box(SWX + 2, y, Z0 + 1, SWX + 3, y, Z0 + 1, y === FY + 4 ? B.dark : B.shutter); }
      lights.push({ name: 'bellWin', p: [SWX + 2, FY + 5, Z0 + 2.5], c: '#fff4d8', i: 0.4, d: 18, flicker: 0.05, srcR: 4 });
      S(BX1 - 2, FY + 3, Z0 + 1, B.lampW);
      acts.push({
        name: '벨의 방', hint: '2층 벨의 방 덧창이 활짝 열리며 아침 햇살과 빛 알갱이가 쏟아져 들어와요', hit: [SWX, FY + 3, Z0 + 1, SWX + 4, FY + 6, Z0 + 2],
        run: async a => {
          await Promise.all([a.turn('shutL', [0, -1.5, 0], 0.8), a.turn('shutR', [0, 1.5, 0], 0.8)]);
          a.flash('bellWin', 6, 4); a.glow(1.4, 3);
          for (let k = 0; k < 8; k++) { a.burst([SWX + 2, FY + 5, Z0 + 3], { n: 14, colors: ['#fff6d8', '#ffffff', '#ffe9a0'], speed: 1.2, up: -0.5, life: 1.8, gravity: 0.4, spread: 1.6 }); await a.wait(0.3); }
          await a.wait(0.8);
          await Promise.all([a.turn('shutL', [0, 0, 0], 0.8), a.turn('shutR', [0, 0, 0], 0.8)]);
        },
      });
      // 헤스티아의 방(동쪽): 큰 침대, 거울 경대, 스테이터스를 새기는 자리
      w.box(RX0 + 1, FY + 1, Z0 + 1, RX0 + 5, FY + 1, Z0 + 6, B.plank); w.box(RX0 + 1, FY + 2, Z0 + 3, RX0 + 5, FY + 2, Z0 + 6, B.blanketP); w.box(RX0 + 1, FY + 2, Z0 + 2, RX0 + 5, FY + 2, Z0 + 2, B.pillow); w.box(RX0 + 1, FY + 2, Z0 + 1, RX0 + 5, FY + 4, Z0 + 1, B.plank); S(RX0 + 3, FY + 4, Z0 + 1, B.gold);
      w.box(RX1 - 4, FY + 1, Z0 + 1, RX1 - 1, FY + 2, Z0 + 1, B.plank); w.box(RX1 - 3, FY + 3, Z0 + 1, RX1 - 2, FY + 5, Z0 + 1, B.glass); S(RX1 - 4, FY + 3, Z0 + 1, B.flowerP); S(RX1 - 1, FY + 3, Z0 + 1, B.candle);
      w.box(RX0 + 1, FY + 1, Z0 + 9, RX0 + 3, FY + 1, Z0 + 10, B.blanketB);                                    // 바닥 방석
      const gly = w.prop({ name: 'glyph', pivot: [RX0 + 3.5, FY + 3, Z0 + 4.5], axis: 'y' });
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d = Math.hypot(dx, dz); if (d <= 2.3 && d > 1.2) gly.set(RX0 + 3 + dx, FY + 3, Z0 + 4 + dz, (dx + dz) & 1 ? B.glyph : B.glyphB); }
      gly.set(RX0 + 3, FY + 3, Z0 + 4, B.glyph);
      lights.push({ name: 'status', p: [RX0 + 3.5, FY + 4, Z0 + 4.5], c: '#ffd860', i: 0.35, d: 14, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '스테이터스 갱신', hint: '헤스티아의 방 침대 위로 신성문자가 금빛으로 떠올라 빙글빙글 돌며 스테이터스가 새겨져요', hit: [RX0 + 1, FY + 1, Z0 + 2, RX0 + 5, FY + 4, Z0 + 6],
        run: async a => {
          a.flash('status', 7, 5); a.glow(1.5, 4);
          await a.move('glyph', [0, 3, 0], 0.8);
          await a.spin('glyph', 6, 2.4);
          for (let k = 0; k < 6; k++) { a.burst([RX0 + 3.5, FY + 7, Z0 + 4.5], { n: 16, colors: ['#ffd860', '#8ad0ff', '#ffffff'], speed: 1.6, up: 2, life: 1.2, gravity: -0.4, spread: 1.4 }); await a.wait(0.25); }
          await a.move('glyph', [0, 0, 0], 0.8);
        },
      });

      // ── 거실(서쪽): 큰 화덕 벽난로, 긴 붉은 소파, 낮은 탁자와 감자튀김 상자, 양탄자, 책장 ──
      const HZ = 37;                                                     // 벽난로 가운데 z
      w.box(X0 + 1, G + 1, HZ - 5, X0 + 3, TOP, HZ + 5, B.hearthS);
      w.box(X0 + 2, G + 1, HZ - 3, X0 + 3, G + 4, HZ + 3, 0); w.box(X0 + 1, G + 1, HZ - 3, X0 + 1, G + 4, HZ + 3, B.soot);
      w.box(X0 + 1, G, HZ - 5, X0 + 5, G, HZ + 5, B.mBase);
      w.box(X0 + 4, G + 5, HZ - 6, X0 + 4, G + 5, HZ + 6, B.mTrim); w.box(X0 + 3, G + 4, HZ - 4, X0 + 3, G + 4, HZ + 4, B.mTrim);
      for (const z of [HZ - 4, HZ + 4]) w.box(X0 + 3, G + 1, z, X0 + 3, G + 4, z, B.mPil);
      S(X0 + 4, G + 6, HZ - 5, B.candle); S(X0 + 4, G + 6, HZ + 5, B.candle); S(X0 + 4, G + 6, HZ - 2, B.potato); S(X0 + 4, G + 6, HZ + 2, B.gold); S(X0 + 4, G + 6, HZ, B.clock);
      for (let dz = -2; dz <= 2; dz++) for (let dy = -2; dy <= 2; dy++) if (Math.hypot(dz, dy) <= 2.4) S(X0 + 4, G + 10 + dy, HZ + dz, Math.hypot(dz, dy) > 1.5 ? B.gold : (dy >= 0 ? B.fire : B.fireY));   // 불꽃 문장
      w.box(X0 + 2, G + 1, HZ - 2, X0 + 2, G + 1, HZ + 2, B.dark); S(X0 + 2, G + 2, HZ - 1, B.fire); S(X0 + 2, G + 2, HZ, B.fireY); S(X0 + 2, G + 2, HZ + 1, B.fire); S(X0 + 2, G + 3, HZ, B.fire);
      S(X0 + 3, G + 1, HZ - 2, B.ember); S(X0 + 3, G + 1, HZ + 2, B.ember);
      const flame = w.prop({ name: 'flame', pivot: [X0 + 2.5, G + 2, HZ + 0.5], clipOK: 2 });
      flame.set(X0 + 2, G + 3, HZ - 1, B.fireY); flame.set(X0 + 2, G + 3, HZ + 1, B.fireY); flame.set(X0 + 2, G + 4, HZ, B.fireY); flame.set(X0 + 3, G + 2, HZ, B.fire);
      lights.push({ name: 'hearth', p: [X0 + 4, G + 3, HZ + 0.5], c: '#ff9a4a', i: 0.8, d: 26, flicker: 0.45, srcR: 3 });
      acts.push({
        name: '화덕 불 지피기', hint: '거실 큰 화덕에 장작을 넣자 불길이 확 솟고 굴뚝 위로 불똥이 튀어 올라요', hit: [X0 + 1, G + 1, HZ - 4, X0 + 4, G + 5, HZ + 4],
        run: async a => {
          a.flash('hearth', 7, 5); a.glow(1.5, 4);
          await a.tween('flame', { off: [2.2, 1.4, 0], scl: [1.6, 2.4, 1.6] }, 0.5);
          for (let k = 0; k < 10; k++) { a.burst([X0 + 5.5, G + 3, HZ + 0.5], { n: 16, colors: ['#ff8a2a', '#ffd060', '#ff5a1a'], speed: 2, up: 3, life: 1, gravity: -0.6, spread: 1 }); if (k % 2) a.burst([X0 + 3.5, TOP + 2, HZ + 0.5], { n: 10, colors: ['#ffb040', '#ffe08a'], speed: 1, up: 3, life: 1.4, gravity: -0.3, spread: 0.8 }); await a.wait(0.25); }
          await a.tween('flame', { off: [0, 0, 0], scl: [1, 1, 1] }, 0.8);
        },
      });
      // 양탄자, 소파, 낮은 탁자
      for (let z = HZ - 7; z <= HZ + 7; z++) for (let x = X0 + 6; x <= X0 + 18; x++) S(x, G, z, (x === X0 + 6 || x === X0 + 18 || z === HZ - 7 || z === HZ + 7) ? B.rugE : B.rug);
      const SFX = X0 + 14;
      w.box(SFX, G + 1, HZ - 5, SFX, G + 1, HZ + 5, B.sofa); w.box(SFX + 1, G + 1, HZ - 5, SFX + 1, G + 3, HZ + 5, B.sofa);
      w.box(SFX, G + 2, HZ - 5, SFX, G + 2, HZ - 5, B.sofa); w.box(SFX, G + 2, HZ + 5, SFX, G + 2, HZ + 5, B.sofa); S(SFX + 1, G + 4, HZ - 5, B.dark); S(SFX + 1, G + 4, HZ + 5, B.dark);
      const cush = w.prop({ name: 'cushions', pivot: [SFX + 0.5, G + 2, HZ + 0.5] });
      for (const dz of [-3, 0, 3]) { cush.box(SFX, G + 2, HZ + dz - 1, SFX, G + 2, HZ + dz, B.sofaC); }
      cush.set(SFX, G + 3, HZ + 3, B.blanketB);
      w.box(X0 + 8, G + 1, HZ - 2, X0 + 10, G + 1, HZ + 2, B.plank);
      w.box(X0 + 9, G + 2, HZ - 1, X0 + 9, G + 2, HZ, B.crate); S(X0 + 9, G + 3, HZ - 1, B.potato); S(X0 + 9, G + 3, HZ, B.potato); S(X0 + 8, G + 2, HZ + 2, B.plate); S(X0 + 10, G + 2, HZ + 1, B.copper);
      acts.push({
        name: '헤스티아 소파', hint: '긴 붉은 소파에 털썩 앉자 쿠션들이 통통 튀어 오르며 빙글 돌아요', hit: [SFX, G + 1, HZ - 5, SFX + 1, G + 4, HZ + 5],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.tween('cushions', { off: [-0.5, 2.4, 0], rot: [0.3 * (k - 1), 0, 0.4] }, 0.35); await a.tween('cushions', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.35); a.burst([SFX + 0.5, G + 3, HZ + 0.5], { n: 12, colors: ['#ffffff', '#f0e0c0', '#e88aa8'], speed: 1.6, up: 2, life: 0.9, gravity: 2, spread: 2.4 }); }
        },
      });
      // 안락의자 둘, 책장(회랑 밑 북쪽 벽), 화분, 등
      for (const z of [HZ - 9, HZ + 9]) { w.box(X0 + 9, G + 1, z, X0 + 10, G + 1, z, B.sofa); w.box(X0 + 9, G + 2, z + (z < HZ ? -1 : 1), X0 + 10, G + 3, z + (z < HZ ? -1 : 1), B.sofa); }
      for (let x = X0 + 2; x <= LX1 - 2; x++) {
        if (x === X0 + 10 || x === X0 + 20) continue;
        w.box(x, G + 1, Z0 + 1, x, G + 6, Z0 + 1, B.plank);
        for (const y of [G + 2, G + 4, G + 6]) if (hash3(x, y, 9) > 0.15) S(x, y, Z0 + 1, [B.bookR, B.bookB, B.bookG, B.bookY][(hash3(x, y, 3) * 4) | 0]);
      }
      for (const [x, z] of [[X0 + 2, Z1 - 2], [LX1 - 1, Z1 - 2], [X0 + 2, Z0 + 14], [HX0 + 1, Z1 - 2], [HX1 - 1, Z1 - 2], [X1 - 2, Z1 - 2]]) { S(x, G + 1, z, B.pot); w.box(x, G + 2, z, x, G + 3, z, B.plant); }
      w.box(LX1 - 1, G + 1, HZ, LX1 - 1, G + 5, HZ, B.iron); S(LX1 - 1, G + 6, HZ, B.lampW);
      lights.push({ name: 'living', p: [LX1 - 0.5, G + 6, HZ + 0.5], c: '#ffd890', i: 0.4, d: 18, flicker: 0.1, srcR: 2 });

      // ── 현관 홀: 우산꽂이, 외투 걸이, 벽 문장, 큰 괘종시계 ──
      w.box(HX0 + 1, G + 1, Z1 - 4, HX0 + 1, G + 5, Z1 - 4, B.dark); S(HX0 + 1, G + 6, Z1 - 4, B.dark); S(HX0 + 2, G + 5, Z1 - 4, B.cloth); S(HX0, G + 5, Z1 - 4, B.blanketB);
      S(HX1 - 1, G + 1, Z1 - 4, B.copper); S(HX1 - 1, G + 2, Z1 - 4, B.dark);
      for (let dz = -2; dz <= 2; dz++) for (let dy = -2; dy <= 2; dy++) if (Math.hypot(dz, dy) <= 2.4) S(HX0 + 14 + dz, G + 12 + dy, Z0 + 1, Math.hypot(dz, dy) > 1.5 ? B.gold : (dy > 0 ? B.fire : B.mTrim));
      S(HX0 + 14, G + 9, Z0 + 1, B.gold);
      const CKX = HX1 - 2, CKZ = Z0 + 1;
      w.box(CKX - 1, G + 1, CKZ, CKX + 1, G + 9, CKZ, B.case); w.box(CKX - 1, G + 1, CKZ + 1, CKX + 1, G + 1, CKZ + 1, B.case);
      for (const x of [CKX - 1, CKX + 1]) w.box(x, G + 2, CKZ + 1, x, G + 5, CKZ + 1, B.case);
      w.box(CKX - 1, G + 6, CKZ + 1, CKX + 1, G + 8, CKZ + 1, B.case); S(CKX, G + 7, CKZ + 2, B.clock); S(CKX, G + 10, CKZ, B.gold);
      const pend = w.prop({ name: 'pendulum', pivot: [CKX + 0.5, G + 6, CKZ + 1.5], axis: 'z' });
      pend.box(CKX, G + 3, CKZ + 1, CKX, G + 5, CKZ + 1, B.iron); pend.set(CKX, G + 2, CKZ + 1, B.gold);
      const cbell = w.prop({ name: 'cbell', pivot: [CKX + 0.5, G + 10, CKZ + 0.5], axis: 'x' }); cbell.set(CKX, G + 11, CKZ, B.gold); cbell.set(CKX, G + 12, CKZ, B.iron);
      acts.push({
        name: '시계 종', hint: '현관 홀 괘종시계의 추가 흔들리고 꼭대기 종이 저녁 식사 시간을 알려요', hit: [CKX - 1, G + 1, CKZ, CKX + 1, G + 12, CKZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.turn('pendulum', [0, 0, 0.6], 0.35), a.turn('cbell', [0.5, 0, 0], 0.35)]);
            a.burst([CKX + 0.5, G + 12, CKZ + 1], { n: 16, colors: ['#ffe9a0', '#ffffff'], speed: 3, up: 1, life: 1, gravity: 0, spread: 1, flat: true });
            await Promise.all([a.turn('pendulum', [0, 0, -0.6], 0.35), a.turn('cbell', [-0.5, 0, 0], 0.35)]);
          }
          await Promise.all([a.turn('pendulum', [0, 0, 0], 0.3), a.turn('cbell', [0, 0, 0], 0.3)]);
        },
      });
      for (const x of [HX0 + 3, HX1 - 3]) { w.box(x, G + 1, Z1 - 10, x, G + 4, Z1 - 10, B.iron); S(x, G + 5, Z1 - 10, B.lampW); }
      lights.push({ name: 'hall', p: [DCX + 0.5, G + 5, Z1 - 9.5], c: '#ffe0a8', i: 0.4, d: 24, flicker: 0.08, srcR: 12 });

      // ── 식당: 긴 식탁과 의자, 촛대, 뚜껑 덮인 큰 접시 ──
      const TX0 = DX0 + 5, TX1 = X1 - 6, TZ = 33;
      for (const [x, z] of [[TX0, TZ - 1], [TX1, TZ - 1], [TX0, TZ + 1], [TX1, TZ + 1]]) w.box(x, G + 1, z, x, G + 2, z, B.dark);
      w.box(TX0, G + 3, TZ - 1, TX1, G + 3, TZ + 1, B.linen); w.box(TX0 + 1, G + 3, TZ, TX1 - 1, G + 3, TZ, B.runner);
      for (let x = TX0 + 1; x <= TX1 - 1; x += 3) {
        for (const s of [-1, 1]) { const z = TZ + s * 3; S(x, G + 1, z, B.plank); w.box(x, G + 2, z + s, x, G + 3, z + s, B.plank); S(x, G + 1, z + s, B.plank); S(x, G + 4, TZ + s, B.plate); }
        if ((x - TX0) % 6 === 1) S(x + 1, G + 4, TZ, (x % 4) ? B.food : B.foodG);
      }
      for (const x of [TX0 + 3, TX1 - 3]) { S(x, G + 4, TZ, B.gold); S(x, G + 5, TZ, B.candle); }
      for (const z of [TZ - 1, TZ + 1]) { S(TX0 - 2, G + 1, z, B.plank); w.box(TX0 - 3, G + 2, z, TX0 - 3, G + 3, z, B.plank); S(TX0 - 3, G + 1, z, B.plank); }
      lights.push({ name: 'dining', p: [(TX0 + TX1) / 2 + 0.5, G + 6, TZ + 0.5], c: '#ffd090', i: 0.5, d: 26, flicker: 0.2, srcR: 10 });
      const CLX = (TX0 + TX1) >> 1;
      w.box(CLX - 1, G + 4, TZ, CLX + 1, G + 4, TZ, B.food); S(CLX, G + 4, TZ - 1, B.potato); S(CLX, G + 4, TZ + 1, B.foodG);
      const lid = w.prop({ name: 'cloche', pivot: [CLX + 0.5, G + 5, TZ + 0.5] });
      lid.box(CLX - 1, G + 5, TZ - 1, CLX + 1, G + 5, TZ + 1, B.ironW); lid.set(CLX, G + 6, TZ, B.gold);
      acts.push({
        name: '저녁 식사', hint: '긴 식탁 가운데 큰 접시의 뚜껑이 열리며 김이 피어오르고 촛불이 환해져요', hit: [CLX - 2, G + 3, TZ - 1, CLX + 2, G + 7, TZ + 1],
        run: async a => {
          a.flash('dining', 5, 4);
          await a.tween('cloche', { off: [0, 4, 0], rot: [0, 1.2, 0.3] }, 0.8);
          for (let k = 0; k < 8; k++) { a.burst([CLX + 0.5, G + 5, TZ + 0.5], { n: 12, colors: ['#ffffff', '#f0ece4', '#ffe8c0'], speed: 0.6, up: 3, life: 1.6, gravity: -0.4, spread: 1.2 }); await a.wait(0.3); }
          await a.tween('cloche', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.7);
        },
      });

      // ── 부엌(북동쪽): 조리대, 개수대, 벽돌 오븐과 굴뚝, 냄비 선반, 감자 상자 ──
      w.box(DX0 + 1, G + 1, Z0 + 1, X1 - 1, G + 2, Z0 + 2, B.plank); w.box(DX0 + 1, G + 3, Z0 + 1, X1 - 1, G + 3, Z0 + 2, B.counter);
      for (let x = DX0 + 7; x <= DX0 + 9; x++) { S(x, G + 3, Z0 + 2, 0); w.liquid(x, Z0 + 2, G + 3); }
      S(DX0 + 8, G + 4, Z0 + 1, B.iron); S(DX0 + 8, G + 5, Z0 + 1, B.iron);
      const OVX = X1 - 10;
      w.box(OVX - 2, G + 1, Z0 + 1, OVX + 2, G + 5, Z0 + 3, B.hearthS); w.box(OVX - 1, G + 2, Z0 + 3, OVX + 1, G + 3, Z0 + 3, 0); w.box(OVX - 1, G + 2, Z0 + 2, OVX + 1, G + 2, Z0 + 2, B.fire); S(OVX, G + 3, Z0 + 2, B.fireY);
      w.box(OVX - 1, G + 6, Z0 + 1, OVX + 1, TOP + 2, Z0 + 2, B.hearthS);
      w.box(OVX - 1, G + 6, Z0 + 3, OVX + 1, G + 6, Z0 + 3, B.copper); S(OVX, G + 7, Z0 + 3, B.copper);                                       // 냄비
      lights.push({ name: 'kitchen', p: [OVX + 0.5, G + 3, Z0 + 4.5], c: '#ff9a4a', i: 0.55, d: 18, flicker: 0.4, srcR: 3 });
      for (let x = DX0 + 1; x <= OVX - 4; x++) for (const y of [G + 7, G + 9]) { S(x, y, Z0 + 1, B.plank); if (hash3(x, y, 5) > 0.35) S(x, y + 1, Z0 + 1, [B.copper, B.jar, B.potato, B.plate][(hash3(x, y, 7) * 4) | 0]); }
      for (const [x, z] of [[X1 - 2, Z0 + 6], [X1 - 2, Z0 + 8], [X1 - 4, Z0 + 6]]) { w.box(x, G + 1, z, x, G + 2, z, B.crate); S(x, G + 3, z, B.potato); }
      w.box(DX0 + 8, G + 1, Z0 + 6, DX0 + 14, G + 2, Z0 + 7, B.plank); w.box(DX0 + 8, G + 3, Z0 + 6, DX0 + 14, G + 3, Z0 + 7, B.counter);
      S(DX0 + 9, G + 4, Z0 + 6, B.food); S(DX0 + 11, G + 4, Z0 + 7, B.foodG); S(DX0 + 13, G + 4, Z0 + 6, B.potato);
      acts.push({
        name: '부엌 오븐', hint: '부엌 벽돌 오븐에 불이 활활 붙고 냄비에서 김이 뭉게뭉게 올라와요', hit: [OVX - 2, G + 1, Z0 + 1, OVX + 2, G + 7, Z0 + 4],
        run: async a => { a.flash('kitchen', 6, 4); for (let k = 0; k < 10; k++) { a.burst([OVX + 0.5, G + 8, Z0 + 3.5], { n: 10, colors: ['#ffffff', '#e8e4dc'], speed: 0.5, up: 3, life: 1.8, gravity: -0.4, spread: 0.8 }); a.burst([OVX + 0.5, G + 3, Z0 + 4], { n: 8, colors: ['#ff8a2a', '#ffd060'], speed: 1.4, up: 1.5, life: 0.7, gravity: 1, spread: 0.6 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '큰 화덕', note: '거실 · 저택의 이름이 된 벽난로', p: [X0 + 3, G + 14, HZ + 0.5] });
      landmarks.push({ name: '2층 회랑', note: '벨의 방 · 헤스티아의 방', p: [X0 + 16, FY + 9, Z0 + 6] });
      return { lights, landmarks, acts };
    },
  });
})();
