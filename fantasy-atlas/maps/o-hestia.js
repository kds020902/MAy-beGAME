// 헤스티아 파밀리아 홈 — 화덕의 저택(옛 아폴론 저택): 철책 안 앞정원과 분수, 안뜰, 대장간, 나무 목욕탕 (오라리오). 옛 홈은 이정표로 이동
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  MAPS.push({
    id: 'hestia', cat: 'orario', name: '헤스티아 파밀리아 홈', en: 'Hestia Familia · Hearth Mansion', color: '#f0a050', seed: 1103, base: 30, time: 'day', size: [W, D, Hh],
    desc: '전쟁유희에서 이겨 얻은 3층 저택 「화덕의 저택」. 큰 철책 안에 꽃과 나무가 있는 앞정원과 안뜰이 있고, 고쳐 지으며 대장간과 큰 나무 목욕탕을 들였다. 길가 이정표를 따라가면 처음 살던 버려진 교회가 나온다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['지금의 홈', '화덕의 저택 · 3층'], ['처음의 홈', '버려진 교회의 P자 지하실'], ['문장', '불꽃과 종']] },
    sky: ['#d8ecf8', '#6aa0d0', '#fff6e0'], stars: false,
    hemi: ['#fff8ec', '#5a5444', 0.62], sun: ['#fff4e0', 0.78, [0.45, 1, 0.6]],
    night: { sky: ['#2c3050', '#0a0a18', '#e8a868'], stars: true, hemi: ['#c0b8d0', '#1c1814', 0.46], sun: ['#d8e0ff', 0.34, [0.45, 1, 0.6]], haze: '#2a2a36' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.5,
    fog: { start: 0.8, floor: 14, depth: 8, haze: [36, 0.16, 8], hazeColor: '#e8e4d8' },
    camY: 14, zoom: 1.35,
    particles: [
      { n: 120, colors: ['#ffffff', '#f0e8ff', '#ffe0e8'], mode: 'drift', speed: 0.35, wind: 0.4, area: [96, 104, 34], y0: 32, y1: 48, glow: false },
      { n: 70, colors: ['#ffffff', '#e8eef4'], mode: 'rise', speed: 0.3, area: [60, 91, 3], y0: 42, y1: 70, glow: false, size: 2 },
    ],
    blocks: Object.assign(OR.blocks(), {
      mBase: { c: '#a8604a', v: 0.05, pat: 'brick' }, mWall: { c: '#e8dcc0', v: 0.04, pat: 'big' }, mTrim: { c: '#f6efe0', v: 0.02 }, mPil: { c: '#d8caa8', v: 0.03 }, mFlat: { c: '#8a8478', top: '#9a948a', v: 0.04 },
      clock: { c: '#f8f6f0', v: 0.02 }, hand: { c: '#2a2a2e', v: 0.02 },
      chStone: { c: '#c8c4b8', v: 0.06, pat: 'stone' }, chStone2: { c: '#a8a49a', v: 0.06, pat: 'brick' }, chRoof: { c: '#7a3a44', v: 0.05, pat: 'tile' }, ivy: { c: '#4a7a3a', v: 0.1 }, ruin: { c: '#b8b0a0', v: 0.06, pat: 'big' },
      plank: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' }, sofa: { c: '#a83a3a', v: 0.04 }, bed: { c: '#ece4d4', v: 0.02 }, bookR: { c: '#8a3a3a', v: 0.04 }, bookB: { c: '#3a4a8a', v: 0.04 }, lampW: { c: '#ffd890', glow: true },
      anvil: { c: '#3a3a40', v: 0.03 }, forge: { c: '#ff8a3a', glow: true }, cedar: { c: '#b07a4a', v: 0.05, pat: 'plank' }, cedarDk: { c: '#8a5a34', v: 0.05 },
    }),
    build(w) {
      const B = w.id, n = w.noise, G = w.base;
      const MX0 = 56, MX1 = 136, MZ0 = 50, MZ1 = 70, CX = 96;          // 본관
      const FX0 = 44, FX1 = 148, FZ0 = 22, FZ1 = 136;                 // 철책
      const RZ0 = 142, RZ1 = 152;                                      // 저택 앞 길(동서)
      MH.terrain(w, { floor: G - 8, height: () => G, surface: () => B.grass, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];
      const inFence = (x, z) => x > FX0 && x < FX1 && z > FZ0 && z < FZ1;
      // 바닥: 철책 안 잔디와 길, 밖은 돌길·벽돌길
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b;
        if (inFence(x, z)) b = (Math.abs(x - CX) <= 3 && z > MZ1 && z < FZ1) ? B.paveL : B.grass;
        else if (z >= RZ0 && z <= RZ1) b = (z === RZ0 || z === RZ1) ? B.curb : B.brick;
        else b = hash3(x, 1, z) > 0.85 ? B.stoneG : B.pave;
        w.set(x, G, z, b);
      }

      // ── 본관: 붉은 1층 띠, 크림빛 2·3층, 벽기둥과 창 줄, 가운데 현관 칸(시계), 양옆 동(아치 망루와 가는 첨탑) ──
      const FH = 6, TOPM = G + 1 + FH * 3;                      // 지붕 높이
      const bay = x => x >= CX - 6 && x <= CX + 6, wing = x => x <= MX0 + 16 || x >= MX1 - 16;
      for (let x = MX0; x <= MX1; x++) {
        const out = bay(x) || wing(x) ? 2 : 0, z1 = MZ1 + out, top = wing(x) ? TOPM + 7 : TOPM;
        for (let y = G + 1; y <= top; y++) for (let z = MZ0; z <= z1; z++) {
          const edge = x === MX0 || x === MX1 || z === MZ0 || z === z1 || (out && (x === CX - 6 || x === CX + 6 || x === MX0 + 16 || x === MX1 - 16));
          if (!edge && y < top) continue;
          let b = y <= G + FH ? B.mBase : B.mWall;
          if ((y - G - 1) % FH === 0 && y > G + 1) b = B.mTrim;
          if (y === top) b = B.mFlat;
          const lx = (x - MX0) % 8;
          if (z === z1 && (lx === 0) && y < top) b = B.mPil;
          // 창: 층마다 길쭉한 창(앞·뒤·옆)
          if (y < top && (y - G - 1) % FH >= 2 && (y - G - 1) % FH <= 4) {
            if ((z === z1 || z === MZ0) && (lx === 3 || lx === 4 || lx === 5) && lx !== 0 && !(bay(x) && y <= G + FH && Math.abs(x - CX) <= 2)) b = (lx === 4) ? B.mTrim : B.win;
            if ((x === MX0 || x === MX1) && (z - MZ0) % 6 >= 2 && (z - MZ0) % 6 <= 3) b = B.win;
          }
          w.set(x, y, z, b);
        }
        for (let z = MZ0; z <= z1; z++) w.set(x, top + 1, z, (z === MZ0 || z === z1 || x === MX0 || x === MX1) ? B.mTrim : 0);   // 난간
      }
      // 현관: 쌍여닫이문과 계단, 위의 큰 창, 꼭대기 박공과 시계
      const DZ = MZ1 + 2;
      w.box(CX - 2, G + 1, DZ, CX + 2, G + 5, DZ, B.door); w.box(CX - 3, G + 6, DZ, CX + 3, G + 6, DZ, B.mTrim); w.box(CX - 3, G + 1, DZ, CX - 3, G + 5, DZ, B.mPil); w.box(CX + 3, G + 1, DZ, CX + 3, G + 5, DZ, B.mPil);
      for (let s = 1; s <= 2; s++) w.box(CX - 4 - s, G + 1 - s + 1 - 1, DZ + s, CX + 4 + s, G, DZ + s, B.mTrim);
      w.box(CX - 1, G + 8, DZ, CX + 1, G + 11, DZ, B.win); w.box(CX - 2, G + 12, DZ, CX + 2, G + 12, DZ, B.mTrim);
      for (let y = 0; y <= 4; y++) w.box(CX - 6 + y, TOPM + 1 + y, DZ, CX + 6 - y, TOPM + 1 + y, DZ, y === 0 ? B.mTrim : B.mWall);   // 박공
      const KY = G + 15;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dy); if (d <= 3.3) w.set(CX + dx, KY + dy, DZ + 1, d > 2.6 ? B.gold : B.clock); }
      const hH = w.prop({ name: 'hourHand', pivot: [CX + 0.5, KY + 0.5, DZ + 2.5], axis: 'z' }); hH.box(CX, KY, DZ + 2, CX, KY + 1, DZ + 2, B.hand);
      const mH = w.prop({ name: 'minHand', pivot: [CX + 0.5, KY + 0.5, DZ + 2.5], axis: 'z' }); mH.set(CX + 1, KY, DZ + 2, B.hand); mH.set(CX + 2, KY, DZ + 2, B.hand);
      acts.push({
        name: '저택 시계', hint: '현관 위 둥근 시계의 바늘이 빙글빙글 돌아 종이 울려요', hit: [CX - 3, KY - 3, DZ, CX + 3, KY + 3, DZ + 2],
        run: async a => { await Promise.all([a.turn('minHand', [0, 0, Math.PI * 4], 2.4), a.turn('hourHand', [0, 0, Math.PI / 3], 2.4)]); a.unwind('minHand'); a.unwind('hourHand'); a.burst([CX + 0.5, KY + 4, DZ + 2], { n: 20, colors: ['#ffe9a0', '#ffffff'], speed: 2.4, up: 1, life: 1, gravity: 0, spread: 1, flat: true }); await a.wait(0.6); await Promise.all([a.turn('minHand', [0, 0, 0], 0.6), a.turn('hourHand', [0, 0, 0], 0.6)]); },
      });
      // 양옆 동 지붕: 세 아치 망루와 가는 첨탑 두 개
      const towers = [];
      for (const [x0, x1] of [[MX0, MX0 + 16], [MX1 - 16, MX1]]) {
        const y0 = TOPM + 8, zc = MZ0 + 6, cx = (x0 + x1) >> 1;
        w.box(x0 + 3, y0, zc - 4, x1 - 3, y0 + 7, zc + 4, B.mWall); w.box(x0 + 4, y0, zc - 3, x1 - 4, y0 + 6, zc + 3, 0);
        for (const ax of [cx - 4, cx, cx + 4]) LB.arch(w, { axis: 'x', c: zc + 4, u0: ax, y0, a: 1.2, h: 5, kind: 'round', fill: 0, frame: B.mTrim });
        w.box(x0 + 3, y0 + 8, zc - 4, x1 - 3, y0 + 8, zc + 4, B.mTrim);
        for (const sx of [x0 + 3, x1 - 3]) { w.box(sx, y0 + 9, zc + 4, sx, y0 + 18, zc + 4, B.mTrim); w.set(sx, y0 + 19, zc + 4, B.gold); }
        towers.push([cx, y0 + 4, zc]);
      }
      // 뒤 날개(ㄷ자)와 안뜰, 회랑
      const IZ0 = 28, IX0 = MX0 + 10, IX1 = MX1 - 10;
      for (const [x0, x1, z0, z1] of [[MX0, MX0 + 9, IZ0, MZ0 - 1], [MX1 - 9, MX1, IZ0, MZ0 - 1], [MX0, MX1, IZ0 - 6, IZ0 - 1]]) {
        for (let y = G + 1; y <= G + FH * 2; y++) w.walls(x0, y, z0, x1, y, z1, y <= G + FH ? B.mBase : ((y - G - 1) % FH === 0 ? B.mTrim : B.mWall));
        for (let x = x0 + 2; x <= x1 - 2; x += 3) for (const z of [z0, z1]) for (const yy of [G + 3, G + 9]) w.box(x, yy, z, x, yy + 2, z, B.win);
        for (let z = z0 + 2; z <= z1 - 2; z += 3) for (const x of [x0, x1]) for (const yy of [G + 3, G + 9]) w.box(x, yy, z, x, yy + 2, z, B.win);
        w.box(x0, G + FH * 2 + 1, z0, x1, G + FH * 2 + 1, z1, B.mFlat);
      }
      for (let z = IZ0; z < MZ0; z++) for (let x = IX0; x <= IX1; x++) w.set(x, G, z, (x === IX0 + 2 || x === IX1 - 2 || z === IZ0 + 2 || z === MZ0 - 3) ? B.paveL : (hash3(x, 6, z) > 0.9 ? B.flowerY : B.grass));
      for (let x = IX0 + 2; x <= IX1 - 2; x += 4) { w.box(x, G + 1, MZ0 - 2, x, G + 5, MZ0 - 2, B.mTrim); w.box(x, G + 6, MZ0 - 3, x, G + 6, MZ0 - 1, B.mTrim); }
      w.box(IX0 + 2, G + 6, MZ0 - 3, IX1 - 2, G + 6, MZ0 - 1, B.mFlat);
      OR.tree(w, B, (IX0 + IX1) >> 1, (IZ0 + MZ0) >> 1, { h: 8, r: 3.6 });
      landmarks.push({ name: '화덕의 저택', note: '헤스티아 파밀리아의 지금 홈', p: [CX + 0.5, TOPM + 24, (MZ0 + MZ1) / 2], boss: true });
      // 화덕의 불: 저택 창마다 따뜻한 불빛
      lights.push({ name: 'hearth', p: [CX + 0.5, G + 4, DZ + 2.5], c: '#ffb860', i: 0.3, d: 26, flicker: 0.3, srcR: 30 });
      acts.push({
        name: '화덕의 불', hint: '저택 안 화덕에 불이 지펴지며 창마다 따뜻한 불빛이 번져요', hit: [CX - 2, G + 1, DZ, CX + 2, G + 5, DZ + 3],
        run: async a => { a.flash('hearth', 6, 4); a.glow(1.4, 4); for (let k = 0; k < 10; k++) { const x = MX0 + 4 + k * 8; a.burst([x + 0.5, G + 4 + (k % 3) * FH, MZ1 + 3.5], { n: 12, colors: ['#ffb860', '#ffe0a0', '#ff7a2a'], speed: 0.8, up: 2, life: 1.2, gravity: -0.3, spread: 0.8 }); await a.wait(0.2); } },
      });

      // ── 앞정원: 가운데 길, 둥근 분수와 반달 꽃밭, 생울타리와 나무, 흰 철책과 철문 ──
      const fp = OR.fountain(w, CX, 104, 5.4, B.mTrim, B.stoneG, { h: 5, bowl: 2, top: B.mTrim });
      for (let dz = -12; dz <= 12; dz++) for (let dx = -12; dx <= 12; dx++) { const d = Math.hypot(dx, dz); if (d > 7 && d < 11 && dz > -2 && Math.abs(dx) > 3) { w.set(CX + dx, G, 104 + dz, B.soil); w.set(CX + dx, G + 1, 104 + dz, hash3(dx, 1, dz) > 0.35 ? B.flowerP : B.flowerW); } }
      acts.push({
        name: '정원 분수', hint: '앞정원 한가운데 분수가 물을 높이 뿜어 올려요', hit: [CX - 5, G, 99, CX + 5, G + 7, 109],
        run: async a => { for (let k = 0; k < 10; k++) { a.burst(fp, { n: 22, colors: ['#e8f8ff', '#8ac0d8', '#ffffff'], speed: 1.8, up: 7, life: 1.4, gravity: 9, spread: 0.6 }); await a.wait(0.3); } },
      });
      acts.push({
        name: '보랏빛 꽃밭', hint: '분수를 두른 반달 꽃밭에서 꽃잎이 바람에 흩날려요', hit: [CX + 6, G, 106, CX + 10, G + 2, 112],
        run: async a => { a.wind(2, 3); for (let k = 0; k < 10; k++) { const t = k * 0.6; a.burst([CX + Math.cos(t) * 9, G + 2, 104 + Math.abs(Math.sin(t)) * 9], { n: 12, colors: ['#9a5ab8', '#f4f0e8', '#c890e0'], speed: 2, up: 2, life: 2, gravity: 0.5, spread: 1.4, flat: true }); await a.wait(0.2); } },
      });
      for (let x = FX0 + 4; x < FX1 - 3; x += 7) for (const z of [FZ0 + 3, FZ1 - 4]) { if (Math.abs(x - CX) < 8 || (z === FZ0 + 3 && x > MX0 - 4 && x < MX1 + 4)) continue; OR.tree(w, B, x, z, { h: 7, r: 3 }); }
      for (let z = MZ1 + 8; z < FZ1 - 8; z += 7) for (const x of [FX0 + 4, FX1 - 4]) OR.tree(w, B, x, z, { h: 7, r: 3 });
      for (let x = CX - 30; x <= CX + 30; x++) if (Math.abs(x - CX) > 4) for (const z of [MZ1 + 6]) w.set(x, G + 1, z, B.hedge);
      OR.fence(w, [[FX0, FZ0], [FX1, FZ0], [FX1, FZ1], [FX0, FZ1], [FX0, FZ0]], 5, B.ironW, B.ironW, B.gold, (x, z) => z === FZ1 && Math.abs(x - CX) <= 6);
      // 철문(부품 문짝 둘): 둥근 꼭대기의 흰 철문
      for (const gx of [CX - 7, CX + 7]) { w.box(gx, G + 1, FZ1, gx, G + 8, FZ1, B.mTrim); w.set(gx, G + 9, FZ1, B.gold); }
      const gL = w.prop({ name: 'gateL', pivot: [CX - 6, G + 1, FZ1 + 0.5] }), gR = w.prop({ name: 'gateR', pivot: [CX + 7, G + 1, FZ1 + 0.5] });
      for (let x = CX - 6; x <= CX + 6; x++) {
        const t = Math.abs(x - CX) / 6, hgt = Math.round(6 + Math.cos(t * Math.PI / 2) * 2);
        for (let y = G + 1; y <= G + hgt; y++) { if (!(x % 2 === 0 || y === G + 1 || y === G + 4 || y === G + hgt)) continue; (x < CX ? gL : (x > CX ? gR : gL)).set(x, y, FZ1, y === G + hgt && x % 2 === 0 ? B.gold : B.ironW); }
      }
      acts.push({
        name: '저택 정문', hint: '둥근 꼭대기의 흰 철문이 양쪽으로 활짝 열려요', hit: [CX - 6, G + 1, FZ1, CX + 6, G + 8, FZ1 + 1],
        run: async a => { await Promise.all([a.turn('gateL', [0, 1.5, 0], 1.6), a.turn('gateR', [0, -1.5, 0], 1.6)]); await a.wait(1.6); await Promise.all([a.turn('gateL', [0, 0, 0], 1.4), a.turn('gateR', [0, 0, 0], 1.4)]); },
      });

      // ── 옆마당: 대장간(동쪽)과 큰 나무 목욕탕(서쪽) ──
      const SMX = 126, SMZ = 86;
      w.box(SMX, G + 1, SMZ, SMX + 12, G + 7, SMZ + 10, B.chStone2); w.box(SMX + 1, G + 1, SMZ + 1, SMX + 11, G + 6, SMZ + 9, 0);
      w.box(SMX + 1, G + 1, SMZ + 10, SMX + 11, G + 5, SMZ + 10, 0);                                          // 앞이 트인 작업장
      MH.roof(w, SMX - 1, SMX + 13, SMZ - 1, SMZ + 11, G + 8, { b: B.roofB, eave: B.roofDk, ridge: B.roofDk, pitch: 1, gable: B.chStone2, axis: 'x' });
      w.box(SMX + 2, G + 1, SMZ + 2, SMX + 5, G + 3, SMZ + 4, B.stoneG); w.box(SMX + 3, G + 2, SMZ + 3, SMX + 4, G + 3, SMZ + 4, B.forge);
      for (let y = G + 4; y <= G + 16; y++) w.box(SMX + 3, y, SMZ + 2, SMX + 4, y, SMZ + 3, B.chimney);
      w.box(SMX + 8, G + 1, SMZ + 13, SMX + 8, G + 2, SMZ + 13, B.anvil); w.box(SMX + 7, G + 3, SMZ + 13, SMX + 9, G + 3, SMZ + 13, B.anvil);
      lights.push({ name: 'forge', p: [SMX + 4, G + 3, SMZ + 6], c: '#ff9a4a', i: 0.6, d: 16, flicker: 0.5, srcR: 4 });
      acts.push({
        name: '웰프의 대장간', hint: '옆마당 대장간 화로가 달아오르고 모루 위로 불똥이 튀어요', hit: [SMX + 6, G + 1, SMZ + 11, SMX + 10, G + 4, SMZ + 15],
        run: async a => { a.flash('forge', 5, 4); for (let k = 0; k < 10; k++) { a.burst([SMX + 8.5, G + 4, SMZ + 13.5], { n: 16, colors: ['#ffb040', '#ffe08a', '#ff6a1a'], speed: 4, up: 3, life: 0.6, gravity: 8, spread: 0.8 }); if (k % 2) a.burst([SMX + 4, G + 17, SMZ + 3], { n: 8, colors: ['#bcb8b0', '#e8e4dc'], speed: 0.5, up: 3, life: 2, gravity: -0.3, spread: 0.6 }); await a.wait(0.3); } },
      });
      const BHX = 52, BHZ = 84;
      w.box(BHX, G + 1, BHZ, BHX + 16, G + 7, BHZ + 14, B.cedar); w.box(BHX + 1, G + 1, BHZ + 1, BHX + 15, G + 6, BHZ + 13, 0);
      for (let x = BHX + 2; x <= BHX + 14; x += 4) w.box(x, G + 3, BHZ + 14, x + 1, G + 5, BHZ + 14, B.win);
      MH.roof(w, BHX - 1, BHX + 17, BHZ - 1, BHZ + 15, G + 8, { b: B.roofB, eave: B.roofDk, ridge: B.cedarDk, pitch: 1, gable: B.cedar, axis: 'x' });
      for (let x = BHX + 3; x <= BHX + 13; x++) for (let z = BHZ + 3; z <= BHZ + 10; z++) { const edge = x === BHX + 3 || x === BHX + 13 || z === BHZ + 3 || z === BHZ + 10; w.set(x, G + 1, z, edge ? B.cedarDk : 0); if (edge) w.set(x, G + 2, z, B.cedarDk); else { w.set(x, G, z, B.cedar); w.liquid(x, z, G + 1); } }
      for (const x of [BHX + 6, BHX + 10]) w.box(x, G + 9, BHZ + 7, x, G + 19, BHZ + 7, B.cedarDk);
      acts.push({
        name: '큰 나무 목욕탕', hint: '고쳐 지으며 들인 나무 목욕탕에서 뜨거운 김이 뭉게뭉게 올라와요', hit: [BHX + 4, G + 15, BHZ + 5, BHX + 12, G + 20, BHZ + 9],
        run: async a => { for (let k = 0; k < 12; k++) { for (const x of [BHX + 6, BHX + 10]) a.burst([x + 0.5, G + 20, BHZ + 7.5], { n: 12, colors: ['#ffffff', '#e8eef4', '#f4f8fc'], speed: 0.8, up: 3, life: 2.4, gravity: -0.5, spread: 1.2 }); await a.wait(0.3); } },
      });

      // ── 저택 앞 길가 이정표: 옛 홈(버려진 교회)과 중앙 광장(바벨)으로 ──
      const sp1 = OR.signpost(w, B, CX - 16, FZ1 + 4, { dir: [-1, 0], boards: 2 }), sp2 = OR.signpost(w, B, CX + 16, FZ1 + 4, { dir: [1, 0], boards: 1 });
      acts.push(OR.goAct({ at: sp1, name: '옛 홈 · 버려진 교회로', goto: 'hestia-church', hint: '길 건너 옛 동네의 버려진 교회로 가요. 헤스티아와 벨이 처음 살던 숨은 지하실이 있어요' }));
      acts.push(OR.goAct({ at: sp2, name: '중앙 광장 · 바벨로', goto: 'babel', hint: '큰길을 따라 오라리오 한가운데 중앙 광장과 바벨로 가요' }));
      // ── 저택 밖 시가지와 가로등 ──
      const placed = [[FX0 - 2, FZ0 - 2, FX1 + 2, FZ1 + 2]];
      OR.fill(w, B, { placed, x0: 3, z0: 3, x1: W - 4, z1: D - 4, tries: 600, floors: [2, 3], ok: (x, z) => x > 2 && z > 2 && x < W - 3 && z < D - 3 && !(z >= RZ0 - 1 && z <= RZ1 + 1), face: (x, z) => z > RZ1 ? 'n' : (z < FZ0 ? 's' : (x < FX0 ? 'e' : 'w')) });
      for (let x = 8; x < W - 6; x += 14) for (const z of [RZ0 - 2, RZ1 + 2]) if (Math.abs(x - CX) > 20) OR.lamp(w, B, x, z, 5);
      return { lights, landmarks, acts };
    },
  });
})();
