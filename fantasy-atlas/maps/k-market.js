// 대시장 — 계단식 두 광장, 상인 길드 종탑, 지붕 덮인 시장, 이층 분수, 동쪽 장인 골목(대장간 · 계량소) (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 128;
  const { KP, DAY, block, doorLights } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'market', cat: 'kingdom', name: '대시장', en: 'Grand Market', color: '#e8a050', seed: 201, base: 22, size: [W, D, Hh],
    desc: '왕도의 모든 길이 모이는 대시장. 새벽에 종탑의 종이 울리면 천 개의 노점이 문을 연다. 아랫광장 동쪽 장인 골목에서는 대장간 쇠망치 소리와 계량소의 큰 저울이 하루 종일 바쁘다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 남문 안쪽'], ['명물', '상인 길드 종탑 · 이층 분수'], ['장인 골목', '대장간 · 계량소의 큰 저울'], ['소문', '길드장은 금화 한 닢도 잊지 않는다']] },
    fog: { start: 0.78, floor: 12, depth: 10 },
    camY: -9, zoom: 1.15,
    particles: [
      { n: 30, colors: ['#9a9aa8', '#e8e8f0'], mode: 'wisp', speed: 1.1, size: 2, y0: 52, glow: false },
      { n: 80, colors: ['#fff4d0'], mode: 'drift', speed: 0.3, y0: 26, y1: 80, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f09030', v: 0.05 }, melon: { c: '#5a9a3a', v: 0.07 }, bread: { c: '#c8904a', v: 0.07 },
      clothR: { c: '#c03a5a', v: 0.02 }, clothB: { c: '#3a7ac0', v: 0.02 }, clothY: { c: '#e8c850', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothG: { c: '#3a8a5a', v: 0.02 },
      pot: { c: '#b8683a', v: 0.07 }, fish: { c: '#b8c8d0', v: 0.07 }, bell: { c: '#c8a050', v: 0.05 }, waterB: { c: '#5aa0d8', v: 0.03 }, face: { c: '#f4f0e0', v: 0.02 },
      ember: { c: '#ff7a2a', glow: true }, coal: { c: '#2a2a30', v: 0.06 }, soot: { c: '#4a4448', v: 0.05, pat: 'stone' }, sack: { c: '#d8c49a', v: 0.06 }, coin: { c: '#f4d060', v: 0.04 },
      pigeon: { c: '#9a9aa8', v: 0.04 }, pigeonN: { c: '#5a7a8a', v: 0.04 }, beakP: { c: '#e8a080', v: 0.03 }, leather: { c: '#7a4a2a', v: 0.05 }, planter: { c: '#a85a3a', v: 0.05 },
    }),
    build(w) {
      const B = w.id, n = w.noise, base = w.base, UP = base + 6, LO = base + 2;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => base + 3 + (80 - z) * 0.05 + n.fbm(x * 0.04, z * 0.04) * 0.8,
        surface: () => B.cobble, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock,
      });
      // 윗광장(길드 앞) · 아랫광장(노점) · 동쪽 장인 골목
      MH.flatten(w, 27, 28, 148, 69, UP, B.slab, B.found);
      MH.flatten(w, 26, 72, 160, 128, LO, B.cobble, B.found);
      for (let z = 70; z <= 71; z++) for (let x = 26; x <= 148; x++) MH.setH(w, x, z, LO, B.cobble2, B.found);
      for (let x = 27; x <= 148; x++) { if (x > 62 && x < 86) continue; w.box(x, LO + 1, 70, x, UP, 70, B.whiteDk); w.set(x, UP + 1, 70, B.trim); if (x % 3 === 0) w.set(x, UP + 2, 70, B.trim); if (x % 6 === 0) w.set(x, LO + 3, 71, B.found); }
      for (let s = 0; s < 4; s++) w.box(63, UP - s, 69 + s, 85, UP - s, 69 + s, s % 2 ? B.trim : B.whiteDk);
      for (const px of [61, 87]) { w.box(px - 1, LO + 1, 69, px + 1, UP + 4, 71, B.white); w.box(px - 1, UP + 5, 69, px + 1, UP + 5, 71, B.trim); w.box(px, UP + 6, 70, px, UP + 7, 70, B.gold); }
      for (let z = 74; z < 128; z++) for (let x = 28; x < 124; x++) if (((x >> 2) + (z >> 2)) % 2 === 0 && MH.g(w, x, z) === LO) MH.paint(w, x, z, B.cobble2);
      // 윗광장 바닥 무늬: 종탑 축을 따라 흰 띠
      for (let z = 54; z <= 68; z++) for (let x = 70; x <= 78; x++) MH.paint(w, x, z, (x === 70 || x === 78) ? B.whiteDk : B.trim);
      const lights = [], acts = [], landmarks = [];

      // ── 둘레의 도시 블록 ──
      doorLights(lights, block(w, B, 40, 3, 112, 14, 's', { seed: 1, floors: [3, 2, 3] }), 3);
      doorLights(lights, block(w, B, 26, 16, 150, 27, 's', { seed: 6, floors: [2, 3, 2], y: UP }), 4);
      doorLights(lights, block(w, B, 12, 30, 24, 130, 'e', { seed: 2 }), 3);
      doorLights(lights, block(w, B, 124, 30, 137, 68, 'w', { seed: 3, y: UP }), 3);
      block(w, B, 14, 132, 70, 143, 'n', { seed: 4 }); block(w, B, 82, 132, 144, 143, 'n', { seed: 5 });
      // ── 상인 길드 회관 ──
      const g0 = UP + 1, GX0 = 40, GX1 = 108, GZ0 = 34, GZ1 = 52;
      w.box(GX0, g0, GZ0, GX1, g0 + 19, GZ1, B.plasterY);
      w.box(GX0, g0, GZ0, GX1, g0, GZ1, B.found);
      for (let x = GX0; x <= GX1; x += 5) { w.box(x, g0, GZ1 + 1, x, g0 + 6, GZ1 + 3, B.white); w.box(x - 1, g0 + 6, GZ1 + 3, x + 1, g0 + 6, GZ1 + 3, B.trim); w.box(x, g0, GZ1 + 3, x, g0, GZ1 + 3, B.found); w.box(x, g0, GZ1, x, g0 + 19, GZ1, B.frame); }
      w.box(GX0, g0 + 7, GZ1 + 1, GX1, g0 + 7, GZ1 + 3, B.whiteDk); w.box(GX0, g0 + 8, GZ1 + 3, GX1, g0 + 8, GZ1 + 3, B.trim);
      for (let x = GX0 + 1; x <= GX1 - 1; x += 2) w.set(x, g0 + 8, GZ1 + 2, B.iron);   // 회랑 지붕 난간
      for (let x = GX0 + 2; x <= GX1 - 3; x += 5) {
        const door = ((x - GX0 - 2) / 5) % 2 === 0;
        w.box(x, g0 + 1, GZ1, x + 1, g0 + 5, GZ1, door ? B.door : B.win);
        if (door) { w.box(x - 1, g0 + 6, GZ1, x + 2, g0 + 6, GZ1, B.gold); } else w.box(x, g0 + 1, GZ1 + 1, x + 1, g0 + 1, GZ1 + 1, B.found);
        for (const fy of [g0 + 9, g0 + 15]) { w.box(x, fy, GZ1, x + 1, fy + 3, GZ1, B.win); w.box(x - 1, fy + 4, GZ1, x + 2, fy + 4, GZ1, B.frame); w.box(x - 1, fy, GZ1, x - 1, fy + 3, GZ1, B.shutG); w.box(x + 2, fy, GZ1, x + 2, fy + 3, GZ1, B.shutG); w.box(x, fy - 1, GZ1 + 1, x + 1, fy - 1, GZ1 + 1, B.found); }
        w.box(x, g0 + 9, GZ1 + 1, x + 1, g0 + 9, GZ1 + 1, (x >> 1) % 2 ? B.flowerR : B.flowerY);
      }
      for (const y of [g0 + 7, g0 + 13, g0 + 19]) w.walls(GX0, y, GZ0, GX1, y, GZ1, B.frame);
      for (const x of [GX0, GX1]) for (let y = g0 + 1; y <= g0 + 19; y += 2) { w.set(x, y, GZ1, B.found); w.set(x, y, GZ0, B.found); }
      // 동·서 박공벽 창
      for (const x of [GX0, GX1]) for (const z of [GZ0 + 4, GZ0 + 9, GZ0 + 14]) { w.box(x, g0 + 10, z, x, g0 + 12, z + 1, B.win); w.box(x, g0 + 13, z - 1, x, g0 + 13, z + 2, B.frame); }
      const gpk = MH.roof(w, GX0 - 1, GX1 + 1, GZ0 - 1, GZ1 + 1, g0 + 20, { b: B.roofR, eave: B.eave, ridge: B.trim, pitch: 1, gable: B.plasterY, gwin: B.win, axis: 'x' });
      for (const dx of [48, 60, 86, 98]) { w.box(dx, g0 + 21, GZ1 - 1, dx + 3, g0 + 24, GZ1 + 1, B.plasterY); w.box(dx + 1, g0 + 22, GZ1 + 1, dx + 2, g0 + 23, GZ1 + 1, B.win); w.box(dx, g0 + 21, GZ1 + 1, dx + 3, g0 + 21, GZ1 + 1, B.trim); MH.roof(w, dx - 1, dx + 4, GZ1 - 3, GZ1 + 2, g0 + 25, { b: B.roofR, eave: B.eave, ridge: B.trim, axis: 'z' }); }
      // 굴뚝 넷
      for (const cx of [46, 56, 92, 102]) { w.box(cx, g0 + 20, GZ0 + 4, cx + 1, gpk + 3, GZ0 + 5, B.found); w.box(cx - 1, gpk + 4, GZ0 + 3, cx + 2, gpk + 4, GZ0 + 6, B.trim); w.set(cx, gpk + 5, GZ0 + 4, B.iron); }
      // 회랑 기둥의 길드 문장판(금빛 저울 무늬)
      for (const bx of [52, 64, 84, 96]) { w.box(bx - 1, g0 + 10, GZ1 + 1, bx + 1, g0 + 14, GZ1 + 1, B.frame); w.box(bx, g0 + 11, GZ1 + 2, bx, g0 + 13, GZ1 + 2, B.gold); w.set(bx - 1, g0 + 11, GZ1 + 2, B.gold); w.set(bx + 1, g0 + 11, GZ1 + 2, B.gold); w.set(bx, g0 + 14, GZ1 + 2, B.bell); }
      // 종탑: 시계와 속이 빈 종루
      const BX = 70, BZ = 38, TH = 48;
      w.box(BX, g0, BZ, BX + 8, g0 + TH, BZ + 8, B.white);
      for (const [cx, cz] of [[BX - 1, BZ - 1], [BX + 9, BZ - 1], [BX - 1, BZ + 9], [BX + 9, BZ + 9]]) { w.box(cx, g0 + 20, cz, cx, g0 + 34, cz, B.whiteDk); w.box(cx, g0 + 35, cz, cx, g0 + 37, cz, B.trim); w.set(cx, g0 + 38, cz, B.gold); }
      for (const y of [g0 + 22, g0 + 34]) w.walls(BX - 1, y, BZ - 1, BX + 9, y, BZ + 9, B.whiteDk);
      // 종루 아래 발코니 난간
      for (let x = BX - 2; x <= BX + 10; x++) for (const z of [BZ - 2, BZ + 10]) { w.set(x, g0 + 35, z, B.whiteDk); if (x % 2 === 0) w.set(x, g0 + 36, z, B.iron); }
      for (let z = BZ - 2; z <= BZ + 10; z++) for (const x of [BX - 2, BX + 10]) { w.set(x, g0 + 35, z, B.whiteDk); if (z % 2 === 0) w.set(x, g0 + 36, z, B.iron); }
      // 탑 몸통의 좁은 창
      for (const y of [g0 + 24, g0 + 30]) { w.box(BX + 3, y, BZ - 0, BX + 5, y + 2, BZ - 0, B.win); w.box(BX + 9, y, BZ + 3, BX + 9, y + 2, BZ + 5, B.win); w.box(BX - 0, y, BZ + 3, BX - 0, y + 2, BZ + 5, B.win); }
      for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const d = Math.hypot(u, v); if (d > 3.4) continue; w.set(BX + 4 + u, g0 + 28 + v, BZ + 9, d > 2.6 ? B.gold : B.face); }
      for (const [u, v] of [[0, 3], [0, -3], [3, 0], [-3, 0]]) w.set(BX + 4 + u, g0 + 28 + v, BZ + 9, B.iron);
      // 시곗바늘(부품): 판 앞에 따로 달아 돌린다
      const hands = w.prop({ name: 'hands', pivot: [BX + 4.5, g0 + 28.5, BZ + 10.5], axis: 'z', speed: -0.03 });
      hands.box(BX + 4, g0 + 28, BZ + 10, BX + 4, g0 + 31, BZ + 10, B.iron); hands.box(BX + 5, g0 + 28, BZ + 10, BX + 6, g0 + 28, BZ + 10, B.iron); hands.set(BX + 4, g0 + 28, BZ + 10, B.gold);
      acts.push({
        name: '길드 시계', hint: '시곗바늘이 빙글빙글 돌아 정오를 가리키고 금빛이 반짝여요', hit: [BX + 1, g0 + 25, BZ + 9, BX + 7, g0 + 31, BZ + 10],
        run: async a => {
          await a.turn('hands', [0, 0, -Math.PI * 4], 2.6); a.unwind('hands');
          for (let k = 0; k < 3; k++) { a.burst([BX + 4.5, g0 + 28.5, BZ + 11], { n: 24, colors: ['#ffe8a0', '#e8c04a', '#ffffff'], speed: 4, up: 2, life: 1.3, gravity: 1, spread: 2.5 }); await a.turn('hands', [0, 0, -0.3], 0.25); await a.turn('hands', [0, 0, 0], 0.25); }
        },
      });
      w.box(BX + 1, g0 + 38, BZ, BX + 7, g0 + 45, BZ + 8, 0); w.box(BX, g0 + 38, BZ + 1, BX + 8, g0 + 45, BZ + 7, 0);
      w.box(BX + 1, g0 + 37, BZ + 1, BX + 7, g0 + 37, BZ + 7, B.whiteDk);
      for (const x of [BX, BX + 8]) for (const z of [BZ, BZ + 8]) w.box(x, g0 + 38, z, x, g0 + 45, z, B.white);
      for (const x of [BX, BX + 8]) for (let z = BZ + 1; z <= BZ + 7; z++) if (z % 2) w.set(x, g0 + 38, z, B.trim);
      for (const z of [BZ, BZ + 8]) for (let x = BX + 1; x <= BX + 7; x++) if (x % 2) w.set(x, g0 + 38, z, B.trim);
      w.box(BX, g0 + 46, BZ, BX + 8, g0 + TH, BZ + 8, B.white); w.box(BX, g0 + 45, BZ + 4, BX + 8, g0 + 45, BZ + 4, B.wood);
      w.walls(BX - 1, g0 + TH + 1, BZ - 1, BX + 9, g0 + TH + 2, BZ + 9, B.trim);
      for (const [cx, cz] of [[BX - 1, BZ - 1], [BX + 9, BZ - 1], [BX - 1, BZ + 9], [BX + 9, BZ + 9]]) w.set(cx, g0 + TH + 3, cz, B.gold);
      const bt = MH.pyramid(w, BX - 1, BZ - 1, BX + 9, BZ + 9, g0 + TH + 3, B.roofB, 3, B.eave);
      w.box(BX + 4, bt, BZ + 4, BX + 4, bt + 4, BZ + 4, B.gold); w.box(BX + 3, bt + 5, BZ + 4, BX + 5, bt + 5, BZ + 4, B.gold); w.box(BX + 4, bt + 5, BZ + 3, BX + 4, bt + 5, BZ + 5, B.gold); w.set(BX + 4, bt + 6, BZ + 4, B.gold);
      const bell = w.prop({ name: 'bell', pivot: [BX + 4.5, g0 + 45, BZ + 4.5], axis: 'x' });
      bell.box(BX + 4, g0 + 43, BZ + 4, BX + 4, g0 + 44, BZ + 4, B.iron);
      bell.ellipsoid(BX + 4, g0 + 41, BZ + 4, 2.4, 2.4, 2.4, B.bell, (dx, dy) => dy >= -2); bell.set(BX + 4, g0 + 38, BZ + 4, B.iron);
      acts.push({
        name: '길드 종탑', hint: '장을 여는 새벽 종이 울리고 비둘기가 날아올라요', hit: [BX, g0 + 38, BZ, BX + 8, g0 + 45, BZ + 8],
        run: async a => {
          for (let k = 0; k < 5; k++) { await a.turn('bell', [0.45, 0, 0], 0.38); a.burst([BX + 4.5, g0 + 48, BZ + 4.5], { n: 16, colors: ['#e8e8f0', '#9a9aa8'], speed: 10, up: 3, life: 2.2, gravity: -0.5, spread: 4, flat: true }); await a.turn('bell', [-0.45, 0, 0], 0.38); }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '상인 길드 종탑', note: '새벽 종이 장을 연다', p: [BX + 4.5, bt + 10, BZ + 4.5], tag: 'GUILD' });
      // ── 지붕 덮인 시장(목조 회랑) ──
      const MX0 = 34, MX1 = 56, MZ0 = 80, MZ1 = 120;
      for (let z = MZ0; z <= MZ1; z += 5) for (const x of [MX0, MX0 + 11, MX1]) { w.box(x, LO + 1, z, x, LO + 9, z, B.wood); w.box(x, LO + 1, z, x, LO + 1, z, B.found); if (x !== MX0 + 11) { w.line(x, LO + 7, z, x + (x === MX0 ? 2 : -2), LO + 9, z, B.wood); } }
      w.walls(MX0, LO + 10, MZ0, MX1, LO + 10, MZ1, B.frame);
      for (let z = MZ0; z <= MZ1; z += 5) w.box(MX0, LO + 10, z, MX1, LO + 10, z, B.frame);
      const mpk = MH.roof(w, MX0 - 1, MX1 + 1, MZ0 - 1, MZ1 + 1, LO + 11, { b: B.roofBr, eave: B.eave, ridge: B.frame, pitch: 1, gable: null, axis: 'z' });
      // 용마루 환기창(작은 지붕)
      for (let z = MZ0 + 6; z <= MZ1 - 6; z += 12) { w.box(MX0 + 9, mpk - 1, z, MX0 + 13, mpk + 1, z + 3, B.wood); w.box(MX0 + 10, mpk, z, MX0 + 12, mpk, z + 3, B.eave); MH.roof(w, MX0 + 8, MX0 + 14, z - 1, z + 4, mpk + 2, { b: B.roofBr, eave: B.eave, ridge: B.frame, axis: 'z' }); }
      const goods = [[B.apple, B.orange], [B.bread, B.bread], [B.melon, B.apple], [B.fish, B.crate], [B.clothR, B.clothB], [B.pot, B.clothY]];
      let gi = 0;
      for (let z = MZ0 + 2; z <= MZ1 - 4; z += 5) for (const x of [MX0 + 2, MX1 - 6]) {
        const gd = goods[(gi++) % goods.length];
        w.box(x, LO + 1, z, x + 4, LO + 2, z + 2, B.plank);
        for (let q = 0; q <= 4; q++) { w.set(x + q, LO + 3, z + (q % 2), gd[q % 2]); if (q % 2) w.set(x + q, LO + 3, z + 2, gd[0]); }
        w.set(x + 2, LO + 8, z + 1, B.lampG);
      }
      lights.push({ p: [MX0 + 4.5, LO + 8, MZ0 + 18.5], c: '#ffd890', i: 1, d: 16, flicker: 0.1, night: true });
      lights.push({ p: [MX1 - 3.5, LO + 8, MZ0 + 28.5], c: '#ffd890', i: 1, d: 16, flicker: 0.1, night: true });
      landmarks.push({ name: '지붕 덮인 시장', note: '과일 · 빵 · 생선 노점', p: [45.5, LO + 26, 100] });
      // ── 이층 분수 ──
      const FX = 92, FZ = 100;
      for (let z = FZ - 13; z <= FZ + 13; z++) for (let x = FX - 13; x <= FX + 13; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 12.6) continue;
        if (d > 11.6) { w.set(x, LO + 1, z, B.whiteDk); continue; }
        if (d > 10.4) { w.set(x, LO + 1, z, B.white); w.set(x, LO + 2, z, B.trim); continue; }
        MH.setH(w, x, z, LO - 2, B.whiteDk, B.found); w.liquid(x, z, LO);
      }
      w.cyl(FX, FZ, LO - 1, LO + 6, 1.6, B.white); w.cyl(FX, FZ, LO + 7, LO + 7, 5.2, B.white); w.ring(FX, FZ, LO + 8, 4, 5.2, B.trim); w.cyl(FX, FZ, LO + 8, LO + 8, 4, B.waterB);
      w.cyl(FX, FZ, LO + 9, LO + 14, 1, B.white); w.cyl(FX, FZ, LO + 15, LO + 15, 2.6, B.white); w.ring(FX, FZ, LO + 16, 1.6, 2.6, B.trim);
      w.box(FX, LO + 16, FZ, FX, LO + 21, FZ, B.gold); w.box(FX - 1, LO + 19, FZ, FX + 1, LO + 19, FZ, B.gold); w.box(FX, LO + 19, FZ - 1, FX, LO + 19, FZ + 1, B.gold); w.set(FX, LO + 22, FZ, B.gold);
      for (let a = 0; a < 8; a++) { const x = Math.round(FX + Math.cos(a * 0.785) * 11), z = Math.round(FZ + Math.sin(a * 0.785) * 11); w.set(x, LO + 3, z, B.gold); }
      // 위 접시 둘레의 물 뿜는 금빛 머리 넷
      for (const [dx, dz] of [[5, 0], [-5, 0], [0, 5], [0, -5]]) { w.set(FX + dx, LO + 8, FZ + dz, B.gold); w.set(FX + Math.sign(dx) * 6, LO + 8, FZ + Math.sign(dz) * 6, 0); }
      acts.push({
        name: '이층 분수', hint: '물줄기가 높이 솟구쳐요', hit: [FX - 5, LO + 1, FZ - 5, FX + 5, LO + 22, FZ + 5],
        run: async a => { for (let k = 0; k < 9; k++) { a.burst([FX + 0.5, LO + 21, FZ + 0.5], { n: 46, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 6, up: 13, life: 1.9, gravity: 12, spread: 1 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '이층 분수', note: '왕도에서 가장 큰 분수', p: [FX + 0.5, LO + 30, FZ + 0.5] });
      // ── 노점 줄 ──
      const aw = [[B.clothR, B.clothW], [B.clothB, B.clothW], [B.clothG, B.clothW], [B.clothY, B.clothW]];
      [[62, 76], [70, 76], [108, 76], [62, 114], [70, 114], [108, 116], [110, 94], [64, 94], [78, 116], [100, 76], [64, 122]].forEach(([sx, sz], k) => {
        const [a1, a2] = aw[k % aw.length];
        MH.stall(w, sx, sz, { sx: 6, sz: 5, m: { post: B.wood, counter: B.plank, a1, a2, goods: goods[k % goods.length].concat([B.crate]), crate: B.crate } });
      });
      // ── 도르래가 달린 상인의 집: 짐은 줄에 매달려 오르내린다 ──
      const hh = MH.houseX(w, { x: 110, z: 80, sx: 9, sz: 12, floors: 4, fh: 6, face: 'w', jetty: true, studs: true, y: LO,
        m: { found: B.found, wall: B.plasterB, frame: B.frame, win: B.win, shutter: B.shutB, sill: B.found, door: B.door, roof: B.roofB, eave: B.eave, ridge: B.trim, lamp: B.lampG, flower: B.flowerR, chimney: B.found } });
      const beamY = hh.top - 1, HXX = 105, HZZ = 90;
      w.box(108, beamY - 5, HZZ - 1, 108, beamY - 2, HZZ + 1, B.door);
      w.box(HXX, beamY, HZZ, 109, beamY, HZZ, B.wood); w.set(HXX, beamY - 1, HZZ, B.iron);
      const crateTop = LO + 3, rLen = beamY - 1 - crateTop - 1;
      MH.rope(w, 'hrope', HXX, beamY - 2, HZZ, rLen, B.rope);
      const hoist = w.prop({ name: 'hoist', pivot: [HXX + 0.5, LO + 1, HZZ + 0.5] });
      hoist.box(HXX - 1, LO + 1, HZZ - 1, HXX + 1, crateTop, HZZ + 1, B.crate); hoist.set(HXX, crateTop + 1, HZZ, B.iron);
      acts.push({
        name: '짐 도르래', hint: '밧줄이 감기며 상자를 다락 문까지 끌어올려요', hit: [HXX - 1, LO + 1, HZZ - 1, HXX + 1, crateTop + 2, HZZ + 1],
        run: async a => {
          const up = beamY - 8 - (LO + 1);
          await Promise.all([a.move('hoist', [0, up, 0], 3.2, t => t), a.rope('hrope', rLen, rLen - up, 3.2, t => t)]);
          await a.wait(1);
          await Promise.all([a.move('hoist', [0, 0, 0], 2.6, t => t), a.rope('hrope', rLen, rLen, 2.6, t => t)]);
        },
      });
      // 등불 줄(깃발 대신 작은 등과 리본), 가로등, 나무, 상자
      MH.garland(w, [34, UP + 14, 71], [60, UP + 14, 71], B.rope, [B.lampG, B.clothY, B.clothR], 3);
      MH.garland(w, [88, UP + 14, 71], [114, UP + 14, 71], B.rope, [B.lampG, B.clothY, B.clothR], 3);
      for (const px of [34, 60, 88, 114]) { w.box(px, LO + 1, 71, px, UP + 14, 71, B.wood); w.set(px, UP + 15, 71, B.gold); }
      for (const [lx, lz] of [[60, 76], [88, 76], [60, 118], [88, 118], [40, 64], [108, 64], [84, 66], [122, 100]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      for (const [tx, tz] of [[40, 60], [108, 60], [32, 36], [116, 34]]) MH.tree(w, tx, UP + 1, tz, { kind: 'oak', h: 9, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 4 });
      // 윗광장 벤치와 꽃 화분
      for (const [bx, bz] of [[46, 62], [56, 62], [92, 62], [102, 62]]) { w.box(bx, UP + 1, bz, bx + 3, UP + 1, bz, B.plank); w.box(bx, UP + 2, bz - 1, bx + 3, UP + 2, bz - 1, B.plank); w.set(bx, UP + 1, bz - 1, B.iron); w.set(bx + 3, UP + 1, bz - 1, B.iron); }
      for (const [px, pz] of [[52, 66], [66, 58], [82, 58], [96, 66], [44, 56], [104, 56]]) { w.box(px - 1, UP + 1, pz - 1, px + 1, UP + 2, pz + 1, B.planter); for (const [dx, dz] of [[-1, -1], [1, 0], [0, 1], [0, 0], [-1, 1], [1, -1]]) w.set(px + dx, UP + 3, pz + dz, (dx + dz) % 2 ? B.flowerR : B.hedge); w.set(px, UP + 4, pz, B.flowerY); }
      // ── 회랑 간판(부품): 기둥에서 내민 쇠팔에 매달려 흔들린다 ──
      const signs = [[49, B.apple], [59, B.bread], [89, B.fish], [99, B.pot]];
      signs.forEach(([sx, em], k) => {
        w.box(sx, g0 + 5, GZ1 + 4, sx, g0 + 5, GZ1 + 6, B.iron);
        const p = w.prop({ name: 'sign' + k, pivot: [sx + 0.5, g0 + 5, GZ1 + 6.5], axis: 'x', rock: 0.05, rockSpeed: 1.3, phase: k });
        p.set(sx, g0 + 4, GZ1 + 6, B.iron); p.box(sx - 1, g0 + 1, GZ1 + 6, sx + 1, g0 + 3, GZ1 + 6, B.plank); p.box(sx - 1, g0 + 3, GZ1 + 6, sx + 1, g0 + 3, GZ1 + 6, B.frame); p.set(sx, g0 + 2, GZ1 + 6, em);
      });
      acts.push({
        name: '상점 간판', hint: '돌풍이 불어 회랑의 간판들이 삐걱삐걱 흔들려요', hit: [48, g0 + 1, GZ1 + 4, 100, g0 + 5, GZ1 + 6],
        run: async a => {
          a.wind(3, 3.4);
          for (const amp of [0.7, 0.55, 0.4, 0.22]) { await Promise.all(signs.map((s, k) => a.turn('sign' + k, [amp * (k % 2 ? -1 : 1), 0, 0], 0.4))); await Promise.all(signs.map((s, k) => a.turn('sign' + k, [-amp * (k % 2 ? -1 : 1), 0, 0], 0.4))); }
          await Promise.all(signs.map((s, k) => a.turn('sign' + k, [0, 0, 0], 0.4)));
        },
      });
      // ── 길드 회관 창불: 아래층부터 차례로 불이 켜진다 ──
      lights.push({ name: 'guild', p: [74.5, g0 + 11, GZ1 + 2], c: '#ffd890', i: 1.2, d: 34, flicker: 0.1 });
      acts.push({
        name: '길드 회관 창불', hint: '회관 창마다 아래층부터 차례로 등불이 켜져요', hit: [GX0, g0 + 9, GZ1, GX1, g0 + 18, GZ1 + 1],
        run: async a => {
          a.flash('guild', 4, 4.5);
          const o = { n: 7, colors: ['#ffd890', '#fff0c0'], speed: 0.6, up: 0.6, life: 1, gravity: 0, spread: 0.6 };
          for (const fy of [g0 + 1, g0 + 9, g0 + 15]) { for (let x = GX0 + 2; x <= GX1 - 3; x += 5) if (fy !== g0 + 1 || ((x - GX0 - 2) / 5) % 2) a.burst([x + 1, fy + 2, GZ1 + 1.5], o); await a.wait(0.6); }
          for (const dx of [48, 60, 86, 98]) a.burst([dx + 2, g0 + 23, GZ1 + 2], o);
          await a.wait(0.8);
        },
      });
      // ── 짐마차(부품): 아랫광장을 가로질러 오간다 ──
      const CY = LO + 1, CZc = 84;
      const cart = w.prop({ name: 'cart', pivot: [62.5, CY, CZc + 0.5] });
      cart.box(60, CY + 1, CZc - 1, 64, CY + 1, CZc + 1, B.plank); cart.box(60, CY + 2, CZc - 1, 60, CY + 2, CZc + 1, B.wood); cart.box(64, CY + 2, CZc - 1, 64, CY + 2, CZc + 1, B.wood);
      for (const x of [61, 63]) for (const z of [CZc - 2, CZc + 2]) { cart.box(x, CY, z, x, CY + 1, z, B.iron); }
      cart.box(65, CY + 1, CZc, 67, CY + 1, CZc, B.wood); cart.box(61, CY + 2, CZc - 1, 62, CY + 3, CZc, B.barrel); cart.set(63, CY + 2, CZc + 1, B.crate); cart.set(61, CY + 2, CZc + 1, B.melon); cart.set(62, CY + 2, CZc + 1, B.apple); cart.set(63, CY + 2, CZc, B.orange);
      acts.push({
        name: '짐마차', hint: '과일과 술통을 실은 짐마차가 아랫광장을 돌아 장인 골목을 지나 남문 쪽으로 달려 나가요', hit: [60, CY, CZc - 2, 67, CY + 3, CZc + 2],
        run: async a => {
          const dust = async (pts) => { for (const [x, z] of pts) { a.burst([x, CY + 0.5, z], { n: 10, colors: ['#c8c0b0', '#a8a49c'], speed: 2, up: 1, life: 0.8, gravity: 2, spread: 2, flat: true }); await a.wait(0.7); } };
          await Promise.all([
            a.drive('cart', [[13.5, 0, 0], [13.5, 0, 20], [13.5, 0, 41], [60, 0, 41], [118, 0, 41]], 11, { fwd: '+x', back: 1.0 }),
            dust([[66, 84.5], [76, 86], [76, 96], [76, 108], [76, 120], [84, 125.5], [100, 125.5], [116, 125.5], [132, 125.5], [148, 125.5]]),
          ]);
        },
      });
      // ── 장터 불꽃놀이 ──
      acts.push({
        name: '장터 불꽃놀이', hint: '분수 위 하늘로 장날을 축하하는 불꽃이 터져요', hit: [FX - 2, LO + 16, FZ - 2, FX + 2, LO + 22, FZ + 2],
        run: async a => {
          const sets = [['#ff6a5a', '#ffe0a0'], ['#6ad0ff', '#ffffff'], ['#ffe060', '#ff9a3a'], ['#c08aff', '#ffd0f0'], ['#7aff9a', '#ffffff']];
          for (let k = 0; k < 7; k++) {
            const x = FX + 0.5 + [-16, 10, -4, 18, -12, 4, 0][k], z = FZ + 0.5 + [-14, -10, 6, -2, 2, -20, -8][k];
            a.burst([x, LO + 22, z], { n: 10, colors: ['#ffe8a0'], speed: 0.4, up: 18, life: 0.9, gravity: 4, spread: 0.3 });
            await a.wait(0.6);
            a.burst([x, LO + 42, z], { n: 80, colors: sets[k % sets.length], speed: 14, up: 2, life: 1.6, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });

      // ══ 새 구역: 동쪽 장인 골목 ══
      // 골목 바닥: 짙은 판석 길과 배수 홈
      for (let z = 72; z <= 128; z++) for (let x = 124; x <= 160; x++) MH.paint(w, x, z, (x === 124 || x === 160) ? B.found : ((x + (z >> 1)) % 5 === 0 ? B.cobble : B.cobble2));
      for (let z = 72; z <= 128; z++) if (z % 3 === 0) MH.paint(w, 146, z, B.iron);
      // ── 대장간: 남쪽으로 활짝 열린 돌 대장간, 큰 굴뚝, 바깥 쇠망치 ──
      const FG0 = 126, FG1 = 144, FZ0 = 74, FZ1 = 90;
      w.box(FG0, LO, FZ0, FG1, LO, FZ1, B.soot);
      w.box(FG0, LO + 1, FZ0, FG1, LO + 9, FZ0, B.rockDk); w.box(FG0, LO + 1, FZ0, FG0, LO + 9, FZ1, B.rock); w.box(FG1, LO + 1, FZ0, FG1, LO + 9, FZ1, B.rock);
      for (const x of [FG0, FG1]) for (let z = FZ0; z <= FZ1; z += 4) w.box(x, LO + 1, z, x, LO + 9, z, B.found);
      for (const x of [FG0, FG0 + 6, FG0 + 12, FG1]) w.box(x, LO + 1, FZ1, x, LO + 9, FZ1, B.wood);
      w.box(FG0, LO + 9, FZ1, FG1, LO + 9, FZ1, B.wood); w.box(FG0, LO + 10, FZ0, FG1, LO + 10, FZ1, B.frame);
      w.box(FG0, LO + 4, FZ0 + 6, FG0, LO + 6, FZ0 + 9, B.win); w.box(FG0, LO + 3, FZ0 + 5, FG0, LO + 3, FZ0 + 10, B.found);   // 서쪽 창
      w.box(FG0, LO + 1, FZ0 + 12, FG0, LO + 5, FZ0 + 13, B.door);
      const fpk = MH.roof(w, FG0 - 1, FG1 + 1, FZ0 - 1, FZ1 + 2, LO + 11, { b: B.roofR, eave: B.eave, ridge: B.trim, pitch: 1, gable: B.plaster, gwin: B.win, axis: 'z' });
      // 화덕과 큰 굴뚝
      w.box(FG1 - 7, LO + 1, FZ0 + 1, FG1 - 1, LO + 3, FZ0 + 6, B.found); w.box(FG1 - 6, LO + 3, FZ0 + 2, FG1 - 2, LO + 3, FZ0 + 5, B.ember); w.box(FG1 - 6, LO + 4, FZ0 + 2, FG1 - 2, LO + 4, FZ0 + 2, B.coal);
      w.box(FG1 - 7, LO + 7, FZ0 + 1, FG1 - 1, LO + 8, FZ0 + 6, B.soot);
      w.box(FG1 - 5, LO + 9, FZ0 + 1, FG1 - 2, fpk + 6, FZ0 + 4, B.soot); w.box(FG1 - 6, fpk + 7, FZ0, FG1 - 1, fpk + 7, FZ0 + 5, B.found); w.box(FG1 - 5, fpk + 7, FZ0 + 1, FG1 - 2, fpk + 7, FZ0 + 4, B.coal);
      // 풀무, 물통, 연장 걸이, 쇠붙이 더미
      w.box(FG1 - 10, LO + 1, FZ0 + 2, FG1 - 8, LO + 2, FZ0 + 4, B.leather); w.box(FG1 - 9, LO + 3, FZ0 + 3, FG1 - 9, LO + 4, FZ0 + 3, B.wood);
      w.box(FG0 + 2, LO + 1, FZ1 - 3, FG0 + 3, LO + 2, FZ1 - 2, B.barrel); w.box(FG0 + 2, LO + 3, FZ1 - 3, FG0 + 3, LO + 3, FZ1 - 2, B.waterB);
      for (let z = FZ0 + 2; z <= FZ0 + 10; z += 2) { w.set(FG0 + 1, LO + 6, z, B.iron); w.set(FG0 + 1, LO + 5, z, z % 4 ? B.iron : B.wood); }
      for (let x = FG0 + 2; x <= FG0 + 9; x += 3) w.set(x, LO + 7, FZ0 + 1, B.iron);
      w.box(FG0 + 6, LO + 1, FZ0 + 2, FG0 + 9, LO + 1, FZ0 + 4, B.iron); w.box(FG0 + 7, LO + 2, FZ0 + 3, FG0 + 8, LO + 2, FZ0 + 3, B.coal);
      // 바깥 쇠망치 틀: 모루와 물레 축으로 떨어지는 큰 망치
      const AX = 148, AZ = 95;
      w.box(AX - 2, LO + 1, AZ - 2, AX + 7, LO + 1, AZ + 2, B.found);
      w.box(AX, LO + 2, AZ, AX + 1, LO + 2, AZ, B.iron); w.box(AX - 1, LO + 3, AZ, AX + 2, LO + 3, AZ, B.iron); w.set(AX - 2, LO + 3, AZ, B.iron);
      for (const z of [AZ - 1, AZ + 1]) w.box(AX + 6, LO + 2, z, AX + 6, LO + 8, z, B.wood);
      w.box(AX + 6, LO + 6, AZ - 1, AX + 6, LO + 6, AZ + 1, B.iron);
      const ham = w.prop({ name: 'hammer', pivot: [AX + 6.5, LO + 6.5, AZ + 0.5], axis: 'z' });
      ham.box(AX + 2, LO + 6, AZ, AX + 5, LO + 6, AZ, B.wood); ham.box(AX, LO + 5, AZ, AX + 1, LO + 7, AZ, B.iron);
      w.box(AX + 3, LO + 4, AZ, AX + 3, LO + 4, AZ, B.ember);   // 달군 쇳조각
      lights.push({ name: 'forge', p: [FG1 - 4, LO + 5, FZ0 + 4], c: '#ff8a3a', i: 1.4, d: 22, flicker: 0.35 });
      acts.push({
        name: '대장간 쇠망치', hint: '풀무가 불을 키우고 큰 쇠망치가 모루를 내리쳐 불티가 튀어요', hit: [AX - 2, LO + 2, AZ - 1, AX + 6, LO + 8, AZ + 1],
        run: async a => {
          a.flash('forge', 4, 5.5);
          for (let k = 0; k < 6; k++) {
            await a.turn('hammer', [0, 0, -0.75], 0.4);
            await a.turn('hammer', [0, 0, 0.05], 0.12);
            a.burst([AX + 1, LO + 4.5, AZ + 0.5], { n: 26, colors: ['#ffe060', '#ff9a3a', '#ffffff'], speed: 7, up: 4, life: 0.8, gravity: 9, spread: 0.6 });
            if (k % 2 === 0) a.burst([FG1 - 3.5, fpk + 8, FZ0 + 2.5], { n: 10, colors: ['#5a5458', '#8a8488', '#c8c0c0'], speed: 0.7, up: 4, life: 2.6, gravity: -0.6, spread: 0.8 });
            await a.wait(0.2);
          }
          await a.turn('hammer', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '대장간', note: '쇠망치 소리가 끊이지 않는 곳', p: [FG0 + 9, fpk + 12, FZ0 + 8], tag: 'FORGE' });
      // ── 계량소: 기둥만 선 열린 정자, 한가운데 길드의 큰 저울 ──
      const QX0 = 126, QX1 = 144, QZ0 = 100, QZ1 = 118, QC = 135, QZc = 109;
      w.box(QX0, LO + 1, QZ0, QX1, LO + 1, QZ1, B.slab);
      for (let x = QX0; x <= QX1; x++) for (const z of [QZ0, QZ1]) w.set(x, LO + 1, z, B.found);
      for (let z = QZ0; z <= QZ1; z++) for (const x of [QX0, QX1]) w.set(x, LO + 1, z, B.found);
      for (const x of [QX0 + 1, QX0 + 6, QX1 - 6, QX1 - 1]) for (const z of [QZ0 + 1, QZ1 - 1]) { w.box(x, LO + 2, z, x, LO + 19, z, B.white); w.set(x, LO + 2, z, B.found); w.box(x - 1, LO + 19, z - 1, x + 1, LO + 19, z + 1, B.trim); }
      for (const z of [QZ0 + 6, QZ1 - 6]) for (const x of [QX0 + 1, QX1 - 1]) { w.box(x, LO + 2, z, x, LO + 19, z, B.white); w.set(x, LO + 2, z, B.found); }
      w.walls(QX0, LO + 20, QZ0, QX1, LO + 20, QZ1, B.whiteDk); w.walls(QX0, LO + 21, QZ0, QX1, LO + 21, QZ1, B.trim);
      const qpk = MH.hipRoof(w, QX0 - 1, QX1 + 1, QZ0 - 1, QZ1 + 1, LO + 22, B.roofG, 1, B.eave);
      w.box(QC, qpk, QZc, QC, qpk + 2, QZc, B.gold); w.set(QC, qpk + 3, QZc, B.coin);
      // 큰 저울: 기둥과 가로대(부품), 양쪽 접시
      w.box(QC - 1, LO + 2, QZc - 1, QC + 1, LO + 3, QZc + 1, B.found); w.box(QC, LO + 4, QZc, QC, LO + 10, QZc, B.iron); w.set(QC, LO + 11, QZc, B.gold);
      const beam = w.prop({ name: 'scale', pivot: [QC + 0.5, LO + 10.5, QZc + 0.5], axis: 'z' });
      beam.box(QC - 7, LO + 10, QZc, QC - 1, LO + 10, QZc, B.gold); beam.box(QC + 1, LO + 10, QZc, QC + 7, LO + 10, QZc, B.gold);
      for (const sx of [-1, 1]) {
        const px = QC + sx * 7;
        beam.box(px, LO + 6, QZc, px, LO + 9, QZc, B.iron);
        beam.box(px - 1, LO + 5, QZc - 1, px + 1, LO + 5, QZc + 1, B.bell);
        if (sx < 0) { beam.set(px, LO + 6 + 0, QZc - 1, B.sack); beam.set(px - 1, LO + 6, QZc + 1, B.sack); }
        else { beam.set(px, LO + 6, QZc + 1, B.coin); beam.set(px + 1, LO + 6, QZc - 1, B.coin); }
      }
      // 곡물 자루와 돈궤
      for (const [sx, sz] of [[QX0 + 3, QZ0 + 3], [QX0 + 4, QZ0 + 4], [QX0 + 3, QZ1 - 4], [QX1 - 4, QZ0 + 3]]) { w.box(sx, LO + 2, sz, sx, LO + 3, sz, B.sack); }
      w.box(QX1 - 4, LO + 2, QZ1 - 4, QX1 - 3, LO + 3, QZ1 - 3, B.wood); w.box(QX1 - 4, LO + 4, QZ1 - 4, QX1 - 3, LO + 4, QZ1 - 3, B.iron); w.set(QX1 - 4, LO + 3, QZ1 - 2, B.gold);
      acts.push({
        name: '계량소 저울', hint: '곡물 자루와 금화를 올리자 큰 저울이 기우뚱거리다 수평을 잡아요', hit: [QC - 8, LO + 5, QZc - 1, QC + 8, LO + 11, QZc + 1],
        run: async a => {
          const coins = s => a.burst([QC + 0.5 + s * 7, LO + 8, QZc + 0.5], { n: 18, colors: ['#ffe060', '#f4d060', '#ffffff'], speed: 2, up: 3, life: 1.1, gravity: 9, spread: 1 });
          coins(1); await a.turn('scale', [0, 0, -0.32], 0.9);
          await a.wait(0.4);
          a.burst([QC + 0.5 - 7, LO + 8, QZc + 0.5], { n: 14, colors: ['#e8d8a8', '#c8b088'], speed: 1.5, up: 2, life: 1, gravity: 8, spread: 1 });
          await a.turn('scale', [0, 0, 0.24], 0.9);
          for (const t of [-0.14, 0.08, -0.04, 0]) await a.turn('scale', [0, 0, t], 0.5);
          a.burst([QC + 0.5, LO + 12, QZc + 0.5], { n: 30, colors: ['#ffe8a0', '#ffffff'], speed: 4, up: 3, life: 1.2, gravity: 1, spread: 2 });
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '계량소', note: '길드의 큰 저울로 무게를 단다', p: [QC + 0.5, qpk + 8, QZc + 0.5] });
      // 장인 골목 소품: 수레바퀴 더미, 장작, 등불
      for (const [x, z] of [[128, 95], [129, 96], [146, 120], [150, 121]]) w.set(x, LO + 1, z, B.crate);
      w.box(150, LO + 1, 76, 153, LO + 3, 86, B.wood); for (let z = 76; z <= 86; z += 2) w.set(152, LO + 4, z, B.bark);
      for (const [x, z] of [[127, 120], [131, 121]]) { w.box(x, LO + 1, z, x, LO + 2, z, B.barrel); }
      for (const [lx, lz] of [[125, 92], [146, 92], [125, 119], [158, 100]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });

      // ── 비둘기 떼(부품): 윗광장 종탑 앞에 모여 있다가 탑을 한 바퀴 돈다 ──
      const PGX = 74, PGZ = 62, pgy = UP + 1, PC = [BX + 4.5, g0 + 44, BZ + 4.5], pigeons = [];
      [[0, 0, 0.3], [3, 2, 1.7], [-3, 1, 3.1], [1, 4, 4.4], [-2, -2, 5.6]].forEach(([dx, dz, th0], k) => {
        const x = PGX + dx, z = PGZ + dz, p = w.prop({ name: 'pigeon' + k, pivot: [x + 0.5, pgy, z + 0.5] });
        p.box(x - 1, pgy, z, x, pgy, z, B.pigeon); p.set(x + 1, pgy + 1, z, B.pigeonN); p.set(x + 2, pgy + 1, z, B.beakP); p.set(x - 2, pgy + 1, z, B.pigeonN);
        pigeons.push({ k, x, z, th0 });
      });
      acts.push({
        name: '비둘기 떼', hint: '종탑 앞에서 모이를 쪼던 비둘기들이 한꺼번에 날아올라 탑을 크게 돌고 북쪽 하늘로 사라져요', hit: [PGX - 5, pgy, PGZ - 3, PGX + 4, pgy + 2, PGZ + 5],
        run: async a => {
          a.burst([PGX + 0.5, pgy + 1, PGZ + 1.5], { n: 20, colors: ['#e8d8a8', '#c8b088'], speed: 3, up: 2, life: 0.8, gravity: 6, spread: 3, flat: true });
          await Promise.all(pigeons.map(async g => {
            const R = 16 + g.k, pts = [[0, 5, 0]], s0 = [g.x + 0.5, pgy, g.z + 0.5];
            for (let i = 0; i <= 30; i++) { const t = g.th0 + i / 15 * Math.PI, y = PC[1] + 4 * Math.sin(i / 30 * Math.PI * 2 + g.k); pts.push([PC[0] + R * Math.cos(t) - s0[0], y - s0[1], PC[2] + R * Math.sin(t) - s0[2]]); }
            const L = pts[pts.length - 1];
            pts.push([L[0] - 30, L[1] + 8, L[2] - 40], [L[0] - 70, L[1] + 14, -s0[2] - 30]);
            await a.wait(g.k * 0.25);
            await a.drive('pigeon' + g.k, pts, 11, { fwd: '+x', back: 1.0 });
          }));
        },
      });

      for (let i = 0; i < 50; i++) { const x = w.ri(58, 120), z = w.ri(74, 126), g = MH.g(w, x, z); if (g === LO && !w.get(x, g + 1, z) && !w.get(x, g + 3, z) && MH.dist(x, z, FX, FZ) > 14 && MH.dist(x, z, HXX, HZZ) > 4 && (z < CZc - 4 || z > CZc + 4) && z < 121 && (z < 80 || x < 72 || x > 81)) { w.set(x, g + 1, z, w.pick([B.crate, B.barrel, B.crate])); if (w.chance(0.3)) w.set(x, g + 2, z, B.crate); } }
      return { lights, landmarks, acts };
    },
  }));
})();
