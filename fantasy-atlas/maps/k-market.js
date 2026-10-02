// 대시장 — 계단식 두 광장, 상인 길드 종탑, 지붕 덮인 시장, 이층 분수 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const { KP, DAY, block, doorLights } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'market', cat: 'kingdom', name: '대시장', en: 'Grand Market', color: '#e8a050', seed: 201, base: 22,
    desc: '왕도의 모든 길이 모이는 대시장. 새벽에 종탑의 종이 울리면 천 개의 노점이 문을 연다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 남문 안쪽'], ['명물', '상인 길드 종탑 · 이층 분수'], ['소문', '길드장은 금화 한 닢도 잊지 않는다']] },
    fog: { start: 0.76, floor: 12, depth: 10 },
    camY: 10,
    particles: [
      { n: 22, colors: ['#9a9aa8', '#e8e8f0'], mode: 'wisp', speed: 1.1, size: 2, y0: 46, glow: false },
      { n: 60, colors: ['#fff4d0'], mode: 'drift', speed: 0.3, y0: 26, y1: 70, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f09030', v: 0.05 }, melon: { c: '#5a9a3a', v: 0.07 }, bread: { c: '#c8904a', v: 0.07 },
      clothR: { c: '#c03a5a', v: 0.02 }, clothB: { c: '#3a7ac0', v: 0.02 }, clothY: { c: '#e8c850', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothG: { c: '#3a8a5a', v: 0.02 },
      pot: { c: '#b8683a', v: 0.07 }, fish: { c: '#b8c8d0', v: 0.07 }, bell: { c: '#c8a050', v: 0.05 }, waterB: { c: '#5aa0d8', v: 0.03 }, face: { c: '#f4f0e0', v: 0.02 },
    }),
    build(w) {
      const B = w.id, n = w.noise, base = w.base, UP = base + 6, LO = base + 2;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => base + 3 + (66 - z) * 0.06 + n.fbm(x * 0.04, z * 0.04) * 1.5,
        surface: () => B.cobble, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock,
      });
      MH.flatten(w, 24, 16, 104, 55, UP, B.slab, B.found);
      MH.flatten(w, 18, 58, 110, 108, LO, B.cobble, B.found);
      for (let z = 56; z <= 57; z++) for (let x = 18; x <= 110; x++) MH.setH(w, x, z, LO, B.cobble2, B.found);
      for (let x = 24; x <= 104; x++) { if (x > 52 && x < 76) continue; w.box(x, LO + 1, 56, x, UP, 56, B.whiteDk); w.set(x, UP + 1, 56, B.trim); if (x % 3 === 0) w.set(x, UP + 2, 56, B.trim); }
      for (let s = 0; s < 4; s++) w.box(53, UP - s, 55 + s, 75, UP - s, 55 + s, s % 2 ? B.trim : B.whiteDk);
      for (const px of [51, 77]) { w.box(px - 1, LO + 1, 55, px + 1, UP + 4, 57, B.white); w.box(px, UP + 5, 56, px, UP + 6, 56, B.gold); }
      for (let z = 60; z < 108; z++) for (let x = 20; x < 110; x++) if (((x >> 2) + (z >> 2)) % 2 === 0 && MH.g(w, x, z) === LO) MH.paint(w, x, z, B.cobble2);
      const lights = [], acts = [], landmarks = [];

      // ── 둘레의 도시 블록 ──
      doorLights(lights, block(w, B, 6, 3, 122, 12, 's', { seed: 1, floors: [3, 2, 3] }), 3);
      doorLights(lights, block(w, B, 3, 18, 15, 116, 'e', { seed: 2 }), 3);
      doorLights(lights, block(w, B, 114, 18, 125, 116, 'w', { seed: 3 }), 3);
      block(w, B, 6, 114, 58, 124, 'n', { seed: 4 }); block(w, B, 70, 114, 122, 124, 'n', { seed: 5 });
      // ── 상인 길드 회관 ──
      const g0 = UP + 1, GX0 = 34, GX1 = 94, GZ0 = 20, GZ1 = 38;
      w.box(GX0, g0, GZ0, GX1, g0 + 19, GZ1, B.plasterY);
      for (let x = GX0; x <= GX1; x += 5) { w.box(x, g0, GZ1 + 1, x, g0 + 6, GZ1 + 3, B.white); w.box(x - 1, g0 + 6, GZ1 + 3, x + 1, g0 + 6, GZ1 + 3, B.trim); w.box(x, g0, GZ1, x, g0 + 19, GZ1, B.frame); }
      w.box(GX0, g0 + 7, GZ1 + 1, GX1, g0 + 7, GZ1 + 3, B.whiteDk); w.box(GX0, g0 + 8, GZ1 + 3, GX1, g0 + 8, GZ1 + 3, B.trim);
      for (let x = GX0 + 2; x <= GX1 - 3; x += 5) {
        w.box(x, g0 + 1, GZ1, x + 1, g0 + 5, GZ1, x % 10 === 6 ? B.door : B.win);
        for (const fy of [g0 + 9, g0 + 15]) { w.box(x, fy, GZ1, x + 1, fy + 3, GZ1, B.win); w.box(x - 1, fy + 4, GZ1, x + 2, fy + 4, GZ1, B.frame); w.box(x, fy - 1, GZ1 + 1, x + 1, fy - 1, GZ1 + 1, B.found); }
        w.box(x, g0 + 9, GZ1 + 1, x + 1, g0 + 9, GZ1 + 1, B.flowerR);
      }
      for (const y of [g0 + 7, g0 + 13, g0 + 19]) w.walls(GX0, y, GZ0, GX1, y, GZ1, B.frame);
      MH.roof(w, GX0 - 1, GX1 + 1, GZ0 - 1, GZ1 + 1, g0 + 20, { b: B.roofR, eave: B.eave, ridge: B.trim, pitch: 1, gable: B.plasterY, gwin: B.win, axis: 'x' });
      for (const dx of [40, 50, 76, 86]) { w.box(dx, g0 + 21, GZ1 - 1, dx + 3, g0 + 24, GZ1 + 1, B.plasterY); w.box(dx + 1, g0 + 22, GZ1 + 1, dx + 2, g0 + 23, GZ1 + 1, B.win); MH.roof(w, dx - 1, dx + 4, GZ1 - 3, GZ1 + 2, g0 + 25, { b: B.roofR, axis: 'z' }); }
      for (const bx of [44, 56, 72, 84]) { w.box(bx, g0 + 9, GZ1 + 4, bx + 1, g0 + 17, GZ1 + 4, B.banner); w.set(bx, g0 + 13, GZ1 + 5, B.gold); w.box(bx, g0 + 18, GZ1 + 1, bx + 1, g0 + 18, GZ1 + 4, B.wood); }
      // 종탑: 시계와 속이 빈 종루
      const BX = 60, BZ = 24, TH = 46;
      w.box(BX, g0, BZ, BX + 8, g0 + TH, BZ + 8, B.white);
      for (const [cx, cz] of [[BX - 1, BZ - 1], [BX + 9, BZ - 1], [BX - 1, BZ + 9], [BX + 9, BZ + 9]]) w.box(cx, g0 + 20, cz, cx, g0 + 34, cz, B.whiteDk);
      for (const y of [g0 + 22, g0 + 34]) w.walls(BX - 1, y, BZ - 1, BX + 9, y, BZ + 9, B.whiteDk);
      for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const d = Math.hypot(u, v); if (d > 3.4) continue; w.set(BX + 4 + u, g0 + 28 + v, BZ + 9, d > 2.6 ? B.gold : ((u === 0 && v >= 0 && v <= 2) || (v === 0 && u >= 0 && u <= 1)) ? B.iron : B.face); }
      w.box(BX + 1, g0 + 36, BZ, BX + 7, g0 + 43, BZ + 8, 0); w.box(BX, g0 + 36, BZ + 1, BX + 8, g0 + 43, BZ + 7, 0);
      w.box(BX + 1, g0 + 35, BZ + 1, BX + 7, g0 + 35, BZ + 7, B.whiteDk);
      for (const x of [BX, BX + 8]) for (const z of [BZ, BZ + 8]) w.box(x, g0 + 36, z, x, g0 + 43, z, B.white);
      w.box(BX, g0 + 44, BZ, BX + 8, g0 + TH, BZ + 8, B.white); w.box(BX, g0 + 43, BZ + 4, BX + 8, g0 + 43, BZ + 4, B.wood);
      w.walls(BX - 1, g0 + TH + 1, BZ - 1, BX + 9, g0 + TH + 2, BZ + 9, B.trim);
      const bt = MH.pyramid(w, BX - 1, BZ - 1, BX + 9, BZ + 9, g0 + TH + 3, B.roofB, 3, B.eave);
      w.box(BX + 4, bt, BZ + 4, BX + 4, bt + 4, BZ + 4, B.gold); w.box(BX + 5, bt + 2, BZ + 4, BX + 7, bt + 4, BZ + 4, B.banner);
      const bell = w.prop({ name: 'bell', pivot: [BX + 4.5, g0 + 43, BZ + 4.5], axis: 'x' });
      bell.box(BX + 4, g0 + 41, BZ + 4, BX + 4, g0 + 42, BZ + 4, B.iron);
      bell.ellipsoid(BX + 4, g0 + 39, BZ + 4, 2.4, 2.4, 2.4, B.bell, (dx, dy) => dy >= -2); bell.set(BX + 4, g0 + 36, BZ + 4, B.iron);
      acts.push({
        name: '길드 종탑', hint: '장을 여는 새벽 종이 울리고 비둘기가 날아올라요', hit: [BX, g0 + 36, BZ, BX + 8, g0 + 43, BZ + 8],
        run: async a => {
          for (let k = 0; k < 5; k++) { await a.turn('bell', [0.45, 0, 0], 0.38); a.burst([BX + 4.5, g0 + 46, BZ + 4.5], { n: 16, colors: ['#e8e8f0', '#9a9aa8'], speed: 10, up: 3, life: 2.2, gravity: -0.5, spread: 4, flat: true }); await a.turn('bell', [-0.45, 0, 0], 0.38); }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '상인 길드 종탑', note: '새벽 종이 장을 연다', p: [BX + 4.5, bt + 8, BZ + 4.5], tag: 'GUILD' });
      // ── 지붕 덮인 시장(목조 회랑) ──
      const MX0 = 24, MX1 = 46, MZ0 = 66, MZ1 = 100;
      for (let z = MZ0; z <= MZ1; z += 5) for (const x of [MX0, MX0 + 11, MX1]) { if (z > MZ1) continue; w.box(x, LO + 1, z, x, LO + 9, z, B.wood); w.box(x, LO + 1, z, x, LO + 1, z, B.found); if (x !== MX0 + 11) { w.line(x, LO + 7, z, x + (x === MX0 ? 2 : -2), LO + 9, z, B.wood); } }
      w.walls(MX0, LO + 10, MZ0, MX1, LO + 10, MZ1, B.frame);
      MH.roof(w, MX0 - 1, MX1 + 1, MZ0 - 1, MZ1 + 1, LO + 11, { b: B.roofBr, eave: B.eave, ridge: B.frame, pitch: 1, gable: null, axis: 'z' });
      const goods = [[B.apple, B.orange], [B.bread, B.bread], [B.melon, B.apple], [B.fish, B.crate], [B.clothR, B.clothB], [B.pot, B.clothY]];
      let gi = 0;
      for (let z = MZ0 + 2; z <= MZ1 - 4; z += 5) for (const x of [MX0 + 2, MX1 - 6]) {
        const gd = goods[(gi++) % goods.length];
        w.box(x, LO + 1, z, x + 4, LO + 2, z + 2, B.plank);
        for (let q = 0; q <= 4; q++) { w.set(x + q, LO + 3, z + (q % 2), gd[q % 2]); if (q % 2) w.set(x + q, LO + 3, z + 2, gd[0]); }
        w.set(x + 2, LO + 8, z + 1, B.lampG);
      }
      lights.push({ p: [MX0 + 4.5, LO + 8, MZ0 + 18.5], c: '#ffd890', i: 1, d: 16, flicker: 0.1, night: true });
      lights.push({ p: [MX1 - 3.5, LO + 8, MZ0 + 13.5], c: '#ffd890', i: 1, d: 16, flicker: 0.1, night: true });
      landmarks.push({ name: '지붕 덮인 시장', note: '과일 · 빵 · 생선 노점', p: [35.5, LO + 24, 83.5] });
      // ── 이층 분수 ──
      const FX = 80, FZ = 84;
      for (let z = FZ - 11; z <= FZ + 11; z++) for (let x = FX - 11; x <= FX + 11; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 10.4) continue;
        if (d > 9) { w.set(x, LO + 1, z, B.white); w.set(x, LO + 2, z, B.trim); continue; }
        MH.setH(w, x, z, LO - 2, B.whiteDk, B.found); w.liquid(x, z, LO);
      }
      w.cyl(FX, FZ, LO - 1, LO + 6, 1.6, B.white); w.cyl(FX, FZ, LO + 7, LO + 7, 4.6, B.white); w.ring(FX, FZ, LO + 8, 3.4, 4.6, B.trim); w.cyl(FX, FZ, LO + 8, LO + 8, 3.4, B.waterB);
      w.cyl(FX, FZ, LO + 9, LO + 13, 1, B.white); w.cyl(FX, FZ, LO + 14, LO + 14, 2.4, B.white); w.ring(FX, FZ, LO + 15, 1.4, 2.4, B.trim);
      w.box(FX, LO + 15, FZ, FX, LO + 20, FZ, B.gold); w.box(FX - 1, LO + 18, FZ, FX + 1, LO + 18, FZ, B.gold); w.set(FX, LO + 21, FZ, B.gold);
      for (let a = 0; a < 8; a++) { const x = Math.round(FX + Math.cos(a * 0.785) * 9.6), z = Math.round(FZ + Math.sin(a * 0.785) * 9.6); w.set(x, LO + 3, z, B.gold); }
      acts.push({
        name: '이층 분수', hint: '물줄기가 높이 솟구쳐요', hit: [FX - 5, LO + 1, FZ - 5, FX + 5, LO + 21, FZ + 5],
        run: async a => { for (let k = 0; k < 9; k++) { a.burst([FX + 0.5, LO + 20, FZ + 0.5], { n: 46, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 6, up: 13, life: 1.9, gravity: 12, spread: 1 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '이층 분수', note: '왕도에서 가장 큰 분수', p: [FX + 0.5, LO + 28, FZ + 0.5] });
      // ── 노점 줄 ──
      const aw = [[B.clothR, B.clothW], [B.clothB, B.clothW], [B.clothG, B.clothW], [B.clothY, B.clothW]];
      [[52, 62], [60, 62], [98, 62], [52, 100], [60, 100], [98, 100], [100, 80], [54, 80], [68, 100], [90, 62]].forEach(([sx, sz], k) => {
        const [a1, a2] = aw[k % aw.length];
        MH.stall(w, sx, sz, { sx: 6, sz: 5, m: { post: B.wood, counter: B.plank, a1, a2, goods: goods[k % goods.length].concat([B.crate]), crate: B.crate } });
      });
      // ── 도르래가 달린 상인의 집: 짐은 줄에 매달려 오르내린다 ──
      const hh = MH.houseX(w, { x: 100, z: 66, sx: 9, sz: 12, floors: 4, fh: 6, face: 'w', jetty: true, studs: true, y: LO,
        m: { found: B.found, wall: B.plasterB, frame: B.frame, win: B.win, shutter: B.shutB, sill: B.found, door: B.door, roof: B.roofB, eave: B.eave, ridge: B.trim, lamp: B.lampG } });
      const beamY = hh.top - 1, HXX = 95, HZZ = 76;
      w.box(98, beamY - 5, HZZ - 1, 98, beamY - 2, HZZ + 1, B.door);
      w.box(HXX, beamY, HZZ, 99, beamY, HZZ, B.wood); w.set(HXX, beamY - 1, HZZ, B.iron);
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
      // 거리 깃발 줄, 가로등, 나무, 상자
      MH.garland(w, [24, UP + 14, 57], [50, UP + 14, 57], B.rope, [B.banner, B.clothY, B.bannerR], 3);
      MH.garland(w, [78, UP + 14, 57], [104, UP + 14, 57], B.rope, [B.banner, B.clothY, B.bannerR], 3);
      for (const px of [24, 50, 78, 104]) w.box(px, UP + 1, 57, px, UP + 14, 57, B.wood);
      for (const [lx, lz] of [[50, 62], [78, 62], [50, 104], [78, 104], [30, 50], [98, 50], [64, 50]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      for (const [tx, tz] of [[30, 46], [98, 46], [28, 22], [100, 22]]) MH.tree(w, tx, UP + 1, tz, { kind: 'oak', h: 9, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 4 });
      for (let i = 0; i < 40; i++) { const x = w.ri(48, 108), z = w.ri(60, 106), g = MH.g(w, x, z); if (g === LO && !w.get(x, g + 1, z) && !w.get(x, g + 3, z) && MH.dist(x, z, FX, FZ) > 12 && MH.dist(x, z, HXX, HZZ) > 4) { w.set(x, g + 1, z, w.pick([B.crate, B.barrel, B.crate])); if (w.chance(0.3)) w.set(x, g + 2, z, B.crate); } }
      return { lights, landmarks, acts };
    },
  }));
})();
