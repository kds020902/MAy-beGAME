// 수로 지구 — 운하 격자, 도개교와 갑문, 벽돌 창고와 좁고 높은 운하 집 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const { KP, DAY, block, doorLights } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'canal', cat: 'kingdom', name: '수로 지구', en: 'Canal Ward', color: '#5aa8c8', seed: 227, base: 20,
    desc: '왕도의 물길이 모이는 수로 지구. 곤돌라가 창고와 창고 사이를 오가며 짐을 나른다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 동쪽 저지대'], ['명물', '도개교 · 갑문 · 곤돌라'], ['소문', '갑문지기는 물속 도시로 가는 길을 안다']] },
    fog: { start: 0.78, floor: 10, depth: 10, haze: [20, 0.12, 5], hazeColor: '#d8e8f0' },
    particles: [
      { n: 20, colors: ['#ffffff', '#d8e8f0'], mode: 'wisp', speed: 1.2, size: 2, y0: 40, glow: false },
      { n: 60, colors: ['#e8f8ff'], mode: 'drift', speed: 0.3, y0: 22, y1: 56, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      brick: { c: '#9a5a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' }, roofDk: { c: '#4a4a5a', v: 0.04, pat: 'tile' },
      quay: { c: '#a8a49c', v: 0.05, pat: 'big' }, gond: { c: '#24242c', v: 0.03 }, cush: { c: '#a02a34', v: 0.02 }, hull: { c: '#5a4030', v: 0.05, pat: 'plank' },
    }),
    build(w) {
      const B = w.id, base = w.base, G = base + 4, WL = base + 1;
      MH.terrain(w, { floor: 4, height: () => G, surface: () => B.cobble, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const CZ0 = 58, CZ1 = 67;
      const canal = (x, z) => (z >= CZ0 && z <= CZ1) || (x >= 38 && x <= 44 && z < CZ0) || (x >= 84 && x <= 90 && z > CZ1);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (canal(x, z)) { MH.setH(w, x, z, base - 3, B.rockDk, B.rock); for (let y = base - 2; y <= G; y++) w.set(x, y, z, 0); w.liquid(x, z, WL); }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (canal(x, z)) continue;
        if (canal(x + 1, z) || canal(x - 1, z) || canal(x, z + 1) || canal(x, z - 1)) { MH.paint(w, x, z, B.quay); for (let y = base - 3; y < G; y++) w.set(x, y, z, B.whiteDk); if ((x + z) % 7 === 0) w.set(x, G + 1, z, B.iron); }
      }
      const lights = [], acts = [], landmarks = [];

      // ── 벽돌 창고(큰 운하 북쪽) ──
      const whs = [[50, 40], [68, 40], [100, 40]].map(([x0, z0]) => {
        const h = MH.house(w, { x: x0, z: z0, sx: 15, sz: 14, floors: 3, fh: 7, face: 's', pitch: 1, winGap: 4, y: G,
          m: { found: B.found, wall: B.brick, frame: B.brickDk, win: B.win, door: B.plank, roof: B.roofDk, eave: B.eave, ridge: B.brickDk, lamp: B.lampG } });
        for (let f = 1; f < 3; f++) { w.box(x0 + 6, G + 2 + f * 7, z0 + 13, x0 + 8, G + 6 + f * 7, z0 + 13, B.plank); w.box(x0 + 5, G + 7 + f * 7, z0 + 13, x0 + 9, G + 7 + f * 7, z0 + 13, B.brickDk); }
        w.box(x0 + 7, h.top - 2, z0 + 14, x0 + 7, h.top - 2, z0 + 15, B.wood);
        return h;
      });
      doorLights(lights, whs, 1);
      // 거룻배(정박)
      const BGX = 66, BGZ = 59;
      w.box(BGX, WL, BGZ, BGX + 13, WL, BGZ + 3, B.brickDk); w.walls(BGX, WL + 1, BGZ, BGX + 13, WL + 1, BGZ + 3, B.hull);
      w.box(BGX + 2, WL + 1, BGZ + 1, BGX + 4, WL + 2, BGZ + 2, B.crate); w.set(BGX + 11, WL + 1, BGZ + 1, B.barrel); w.set(BGX + 11, WL + 1, BGZ + 2, B.barrel);
      // 창고 기중기: 밧줄이 감기며 짐이 올라간다
      const CX = 74, CZ = 56, ARM = G + 15;
      w.box(CX - 1, G + 1, CZ - 1, CX + 1, G + 1, CZ + 1, B.found); w.box(CX, G + 2, CZ, CX, ARM, CZ, B.wood);
      w.line(CX - 2, G + 2, CZ, CX, G + 8, CZ, B.wood); w.line(CX + 2, G + 2, CZ, CX, G + 8, CZ, B.wood);
      w.box(CX, ARM, CZ - 2, CX, ARM, CZ + 5, B.wood); w.line(CX, ARM - 5, CZ, CX, ARM, CZ + 4, B.wood); w.set(CX, ARM + 1, CZ + 5, B.iron);
      const restTop = WL + 4, rLen = ARM - 1 - restTop;
      MH.rope(w, 'crope', CX, ARM - 1, CZ + 5, rLen, B.rope);
      const load = w.prop({ name: 'load', pivot: [CX + 0.5, WL + 2, CZ + 5.5] });
      load.box(CX - 1, WL + 2, CZ + 4, CX + 1, restTop - 1, CZ + 6, B.crate); load.set(CX, restTop, CZ + 5, B.iron);
      acts.push({
        name: '창고 기중기', hint: '밧줄이 감기며 거룻배의 짐이 올라가요', hit: [CX - 1, G + 1, CZ - 1, CX + 1, ARM + 1, CZ + 6],
        run: async a => {
          const up = 8;
          await Promise.all([a.move('load', [0, up, 0], 2.6, t => t), a.rope('crope', rLen, rLen - up, 2.6, t => t)]);
          await a.wait(0.9);
          await Promise.all([a.move('load', [0, 0, 0], 2.4, t => t), a.rope('crope', rLen, rLen, 2.4, t => t)]);
        },
      });
      landmarks.push({ name: '창고 부두', note: '기중기로 짐을 내리는 곳', p: [75.5, whs[1].peak + 6, 47] });
      // ── 운하 남쪽의 좁고 높은 집들(계단 박공) ──
      const walls = [B.plaster, B.plasterB, B.plasterY, B.plasterP, B.brick];
      let k = 0;
      const south = [];
      for (let x = 2; x < 120; x += 10) {
        if (x + 8 >= 84 && x <= 90) { x = 82; continue; }
        const h = MH.houseX(w, { x, z: 71, sx: 9, sz: 11, floors: 3 + (k % 2), fh: 6, face: 'n', pitch: 2, axis: 'z', y: G,
          m: { found: B.found, wall: walls[k % walls.length], frame: B.trim, win: B.win, shutter: k % 2 ? B.shutG : B.shutB, sill: B.trim, flower: k % 3 ? B.flowerR : null, door: B.door, roof: k % 2 ? B.roofR : B.roofDk, eave: B.eave, ridge: B.trim, lamp: B.lampG } });
        for (let s = 0; s < 5; s++) w.box(x + s, h.top + s * 2, 71, x + 8 - s, h.top + s * 2 + 1, 71, walls[k % walls.length]);
        south.push(h); k++;
      }
      doorLights(lights, south, 3);
      doorLights(lights, block(w, B, 2, 40, 34, 52, 's', { seed: 7, y: G }), 3);
      block(w, B, 2, 6, 34, 18, 's', { seed: 9, y: G }); block(w, B, 50, 6, 124, 18, 's', { seed: 11, y: G });
      block(w, B, 2, 96, 80, 108, 'n', { seed: 13, y: G }); block(w, B, 96, 96, 124, 108, 'n', { seed: 15, y: G });
      // ── 아치 돌다리 ──
      const bm = { deck: B.cobble, parapet: B.whiteDk, arch: B.white, cap: B.trim };
      MH.bridge(w, [18, CZ0 - 3], [18, CZ1 + 3], G, { width: 7, rise: 3, arch: true, archH: 5, m: bm });
      MH.bridge(w, [114, CZ0 - 3], [114, CZ1 + 3], G, { width: 7, rise: 3, arch: true, archH: 5, m: bm });
      MH.bridge(w, [35, 28], [47, 28], G, { width: 5, rise: 2, arch: true, archH: 4, m: bm });
      MH.bridge(w, [81, 90], [93, 90], G, { width: 5, rise: 2, arch: true, archH: 4, m: bm });
      landmarks.push({ name: '아치 돌다리', note: '흰 돌로 쌓은 운하 다리', p: [18.5, G + 11, 62.5] });
      // ── 도개교: 다리탑 사이의 두 상판이 들린다 ──
      const DX = 57;
      for (const [z0, z1] of [[CZ0 - 5, CZ0 - 2], [CZ1 + 2, CZ1 + 5]]) for (const x0 of [DX - 6, DX + 4]) {
        w.box(x0, G + 1, z0, x0 + 2, G + 12, z1, B.white); w.walls(x0 - 1, G + 12, z0 - 1, x0 + 3, G + 12, z1 + 1, B.whiteDk);
        MH.pyramid(w, x0 - 1, z0 - 1, x0 + 3, z1 + 1, G + 13, B.roofB, 2, B.eave);
        w.set(x0 + 1, G + 8, z0 === CZ0 - 5 ? z1 + 1 : z0 - 1, B.lampG);
      }
      lights.push({ p: [DX - 4.5, G + 8, CZ0 - 1], c: '#ffd890', i: 1, d: 13, flicker: 0.05, night: true });
      lights.push({ p: [DX + 5.5, G + 8, CZ1 + 1.5], c: '#ffd890', i: 1, d: 13, flicker: 0.05, night: true });
      const leafN = w.prop({ name: 'leafN', pivot: [DX + 0.5, G + 0.5, CZ0], axis: 'x' });
      const leafS = w.prop({ name: 'leafS', pivot: [DX + 0.5, G + 0.5, CZ1 + 1], axis: 'x' });
      for (let z = CZ0; z <= CZ1; z++) for (let x = DX - 3; x <= DX + 3; x++) {
        const p = z <= (CZ0 + CZ1) / 2 ? leafN : leafS;
        p.set(x, G, z, B.plank);
        if (Math.abs(x - DX) === 3) { p.set(x, G + 1, z, B.iron); if (z % 2) p.set(x, G + 2, z, B.iron); }
      }
      // 곤돌라(뱃머리 +x): 남쪽 물길로 다닌다
      const gondola = (name, x, z, phase) => {
        const p = w.prop({ name, pivot: [x + 0.5, WL + 1, z + 0.5], axis: 'x', rock: 0.05, rockSpeed: 0.9, bob: 0.18, bobSpeed: 1.2, phase });
        for (let i = -5; i <= 5; i++) { p.set(x + i, WL, z, B.gond); p.set(x + i, WL, z + 1, B.gond); if (Math.abs(i) >= 4) { p.set(x + i, WL + 1, z, B.gond); p.set(x + i, WL + 1, z + 1, B.gond); } }
        p.box(x + 6, WL + 1, z, x + 6, WL + 3, z, B.gold); p.box(x - 6, WL + 1, z + 1, x - 6, WL + 2, z + 1, B.gold);
        p.box(x - 1, WL + 1, z, x, WL + 1, z + 1, B.cush); p.set(x + 2, WL + 1, z, B.crate);
      };
      const GA = [26, 64];
      gondola('gondA', GA[0], GA[1], 0); gondola('gondB', 103, 60, 1.5);
      MH.routeOK(w, [[GA[0], GA[1] + 0.5], [80, GA[1] + 0.5]], 1, '곤돌라 뱃길');
      acts.push({
        name: '도개교', hint: '다리가 들리고 곤돌라가 지나갔다 돌아와요', hit: [DX - 3, G, CZ0, DX + 3, G + 2, CZ1],
        run: async a => {
          await Promise.all([a.turn('leafN', [-1.2, 0, 0], 2.4), a.turn('leafS', [1.2, 0, 0], 2.4)]);
          await a.move('gondA', [50, 0, 0], 6, t => t);
          await a.wait(0.6);
          await a.move('gondA', [0, 0, 0], 6, t => t);
          await Promise.all([a.turn('leafN', [0, 0, 0], 2.2), a.turn('leafS', [0, 0, 0], 2.2)]);
        },
      });
      landmarks.push({ name: '도개교', note: '배가 지나갈 때만 들린다', p: [DX + 0.5, G + 22, 62.5], tag: 'CANAL' });
      // ── 갑문: 두 문짝이 물길 쪽으로 열린다 ──
      const LX = 96;
      for (const z of [CZ0 - 1, CZ1 + 1]) { w.box(LX - 1, base - 3, z, LX + 1, G + 4, z, B.white); w.box(LX - 1, G + 5, z, LX + 1, G + 5, z, B.trim); }
      w.box(LX, G + 6, CZ0 - 1, LX, G + 6, CZ1 + 1, B.wood); w.box(LX, G + 5, CZ0 - 1, LX, G + 5, CZ0 - 1, B.wood);
      const gN = w.prop({ name: 'gateN', pivot: [LX + 0.5, WL, CZ0] });
      const gS = w.prop({ name: 'gateS', pivot: [LX + 0.5, WL, CZ1 + 1] });
      for (let z = CZ0; z <= CZ1; z++) for (let y = base - 2; y <= G; y++) (z <= (CZ0 + CZ1) / 2 ? gN : gS).set(LX, y, z, (y - base) % 3 === 0 ? B.iron : B.plank);
      acts.push({
        name: '갑문', hint: '문짝이 열리며 물살이 쏟아져요', hit: [LX - 1, base, CZ0, LX + 1, G + 1, CZ1],
        run: async a => {
          await Promise.all([a.turn('gateN', [0, 1.35, 0], 2), a.turn('gateS', [0, -1.35, 0], 2)]);
          for (let q = 0; q < 6; q++) { a.burst([LX + 3, WL + 1, 62.5], { n: 34, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 6, up: 3, life: 1.2, gravity: 8, spread: 4, flat: true }); await a.wait(0.4); }
          await Promise.all([a.turn('gateN', [0, 0, 0], 1.8), a.turn('gateS', [0, 0, 0], 1.8)]);
        },
      });
      landmarks.push({ name: '갑문', note: '운하의 물높이를 다루는 문', p: [LX + 0.5, G + 12, 62.5] });
      // ── 가로수와 가로등 ──
      for (let x = 6; x < 124; x += 14) for (const z of [CZ0 - 3, CZ1 + 2]) { if (canal(x, z) || w.get(x, G + 1, z) || w.get(x, G + 3, z) || Math.abs(x - DX) < 9 || Math.abs(x - 18) < 6 || Math.abs(x - 114) < 6) continue; MH.tree(w, x, G + 1, z, { kind: 'oak', h: 6, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 2.8, branches: 3, spread: 2 }); }
      for (const [lx, lz] of [[30, CZ0 - 2], [48, CZ1 + 2], [66, CZ1 + 2], [90, CZ0 - 2], [108, CZ1 + 2], [36, 22], [92, 96]]) if (!canal(lx, lz) && !w.get(lx, G + 1, lz)) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      return { lights, landmarks, acts };
    },
  }));
})();
