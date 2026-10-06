// 수로 지구 — 운하 격자, 도개교와 갑문, 벽돌 창고와 좁고 높은 운하 집, 남쪽 수상 시장 선착장 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 112;
  const { KP, DAY, block, doorLights } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'canal', cat: 'kingdom', name: '수로 지구', en: 'Canal Ward', color: '#5aa8c8', seed: 227, base: 20, size: [W, D, Hh],
    desc: '왕도의 물길이 모이는 수로 지구. 곤돌라가 창고와 창고 사이를 오가며 짐을 나른다. 남쪽 물길 끝의 둥근 선착장에는 아침마다 과일과 꽃을 실은 배들이 모여 물 위의 장이 선다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 동쪽 저지대'], ['명물', '도개교 · 갑문 · 곤돌라'], ['수상 시장', '둥근 선착장 · 등탑 · 뱃사공 쉼터'], ['소문', '갑문지기는 물속 도시로 가는 길을 안다']] },
    fog: { start: 0.8, floor: 10, depth: 10, haze: [20, 0.12, 5], hazeColor: '#d8e8f0' },
    camY: -16, zoom: 1.12,
    particles: [
      { n: 26, colors: ['#ffffff', '#d8e8f0'], mode: 'wisp', speed: 1.2, size: 2, y0: 44, glow: false },
      { n: 80, colors: ['#e8f8ff'], mode: 'drift', speed: 0.3, y0: 22, y1: 60, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      brick: { c: '#9a5a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' }, roofDk: { c: '#4a4a5a', v: 0.04, pat: 'tile' },
      quay: { c: '#a8a49c', v: 0.05, pat: 'big' }, gond: { c: '#24242c', v: 0.03 }, cush: { c: '#a02a34', v: 0.02 }, hull: { c: '#5a4030', v: 0.05, pat: 'plank' },
      swan: { c: '#f8f8f4', v: 0.02 }, beak: { c: '#f08a30', v: 0.03 }, cygnet: { c: '#a8a8a4', v: 0.04 }, lantern: { c: '#ffb860', glow: true }, paddle: { c: '#7a5a3a', v: 0.05, pat: 'plank' },
      apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f09030', v: 0.05 }, melon: { c: '#5a9a3a', v: 0.07 }, clothR: { c: '#c03a5a', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothB: { c: '#3a7ac0', v: 0.02 },
      redBand: { c: '#c03a34', v: 0.03 }, beacon: { c: '#fff0b0', glow: true }, fishS: { c: '#c8d8e0', v: 0.05 }, fishG: { c: '#e8a040', v: 0.05 },
    }),
    build(w) {
      const B = w.id, base = w.base, G = base + 4, WL = base + 1;
      MH.terrain(w, { floor: 4, height: () => G, surface: () => B.cobble, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const CZ0 = 78, CZ1 = 87, BAX = 100, BAZ = 122;
      const basin = (x, z) => ((x - BAX) / 22.5) ** 4 + ((z - BAZ) / 10.5) ** 4 <= 1;
      const canal = (x, z) => (z >= CZ0 && z <= CZ1) || (x >= 48 && x <= 54 && z < CZ0) || (x >= 94 && x <= 100 && z > CZ1) || basin(x, z);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (canal(x, z)) { MH.setH(w, x, z, base - 3, B.rockDk, B.rock); for (let y = base - 2; y <= G; y++) w.set(x, y, z, 0); w.liquid(x, z, WL); }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (canal(x, z)) continue;
        if (canal(x + 1, z) || canal(x - 1, z) || canal(x, z + 1) || canal(x, z - 1)) { MH.paint(w, x, z, B.quay); for (let y = base - 3; y < G; y++) w.set(x, y, z, (y + x + z) % 5 === 0 ? B.white : B.whiteDk); if ((x + z) % 7 === 0) { w.set(x, G + 1, z, B.iron); } }
      }
      // 둑길 무늬: 운하를 따라 판석 두 줄
      for (let x = 0; x < W; x++) for (const z of [CZ0 - 2, CZ1 + 2]) if (!canal(x, z)) MH.paint(w, x, z, (x % 4) ? B.slab : B.cobble2);
      const lights = [], acts = [], landmarks = [];

      // ── 벽돌 창고(큰 운하 북쪽) ──
      const WXS = [60, 78, 110];
      const whs = WXS.map(x0 => {
        const z0 = 60;
        const h = MH.house(w, { x: x0, z: z0, sx: 15, sz: 14, floors: 3, fh: 7, face: 's', pitch: 1, winGap: 4, y: G,
          m: { found: B.found, wall: B.brick, frame: B.brickDk, win: B.win, door: B.plank, roof: B.roofDk, eave: B.eave, ridge: B.brickDk, lamp: B.lampG } });
        for (let f = 1; f < 3; f++) { w.box(x0 + 6, G + 2 + f * 7, z0 + 13, x0 + 8, G + 6 + f * 7, z0 + 13, B.plank); w.box(x0 + 5, G + 7 + f * 7, z0 + 13, x0 + 9, G + 7 + f * 7, z0 + 13, B.brickDk); }
        w.box(x0 + 7, h.top - 2, z0 + 14, x0 + 7, h.top - 2, z0 + 15, B.wood);
        // 창고 이름띠와 벽돌 띠, 지붕 환기창
        for (let x = x0; x <= x0 + 14; x++) { w.set(x, G + 8, z0 + 14, B.brickDk); w.set(x, G + 15, z0 + 14, B.brickDk); }
        w.box(x0 + 4, G + 22, z0 + 13, x0 + 10, G + 22, z0 + 13, B.white);
        w.box(x0 + 12, h.top, z0 + 3, x0 + 13, h.peak + 2, z0 + 4, B.brickDk); w.box(x0 + 11, h.peak + 3, z0 + 2, x0 + 14, h.peak + 3, z0 + 5, B.found);
        return h;
      });
      doorLights(lights, whs, 1);
      // 거룻배(정박)
      const BGX = 76, BGZ = 79;
      w.box(BGX, WL, BGZ, BGX + 13, WL, BGZ + 3, B.brickDk); w.walls(BGX, WL + 1, BGZ, BGX + 13, WL + 1, BGZ + 3, B.hull);
      w.box(BGX + 2, WL + 1, BGZ + 1, BGX + 4, WL + 2, BGZ + 2, B.crate); w.set(BGX + 11, WL + 1, BGZ + 1, B.barrel); w.set(BGX + 11, WL + 1, BGZ + 2, B.barrel);
      // 창고 기중기: 밧줄이 감기며 짐이 올라간다
      const CX = 84, CZ = 76, ARM = G + 15;
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
      landmarks.push({ name: '창고 부두', note: '기중기로 짐을 내리는 곳', p: [85.5, whs[1].peak + 6, 67] });
      // ── 운하 남쪽의 좁고 높은 집들(계단 박공) ──
      const walls = [B.plaster, B.plasterB, B.plasterY, B.plasterP, B.brick];
      let k = 0;
      const south = [];
      for (let x = 4; x < 160; x += 10) {
        if (x + 8 >= 93 && x <= 101) { x = 92; continue; }
        const h = MH.houseX(w, { x, z: 91, sx: 9, sz: 11, floors: 2 + (k % 2), fh: 6, face: 'n', pitch: 2, axis: 'z', y: G,
          m: { found: B.found, wall: walls[k % walls.length], frame: B.trim, win: B.win, shutter: k % 2 ? B.shutG : B.shutB, sill: B.trim, flower: k % 3 ? B.flowerR : null, door: B.door, roof: k % 2 ? B.roofR : B.roofDk, eave: B.eave, ridge: B.trim, lamp: B.lampG } });
        for (let s = 0; s < 5; s++) w.box(x + s, h.top + s * 2, 91, x + 8 - s, h.top + s * 2 + 1, 91, walls[k % walls.length]);
        w.box(x + 4, h.top + 10, 91, x + 4, h.top + 11, 91, B.trim);   // 박공 꼭대기 장식
        w.box(x + 3, h.top + 2, 90, x + 5, h.top + 2, 90, B.trim);      // 박공창 아래 돌출 처마
        w.set(x + 4, h.top + 4, 90, B.win);
        south.push(h); k++;
      }
      doorLights(lights, south, 3);
      doorLights(lights, block(w, B, 12, 60, 44, 72, 's', { seed: 7, y: G }), 3);
      block(w, B, 12, 26, 44, 38, 's', { seed: 9, y: G }); block(w, B, 60, 26, 160, 38, 's', { seed: 11, y: G });
      block(w, B, 128, 60, 160, 72, 's', { seed: 17, y: G });
      block(w, B, 8, 112, 60, 124, 'n', { seed: 13, y: G }); block(w, B, 128, 110, 160, 122, 'n', { seed: 15, y: G });
      block(w, B, 8, 140, 58, 152, 'n', { seed: 19, y: G }); block(w, B, 138, 140, 162, 152, 'n', { seed: 21, y: G });
      // 선착장 남쪽 광장: 낮은 노점과 화단(물가가 잘 보이도록 낮게)
      for (let z = 137; z <= 160; z++) for (let x = 60; x <= 136; x++) if (!canal(x, z)) MH.paint(w, x, z, ((x >> 2) + (z >> 2)) % 2 ? B.cobble : B.cobble2);
      const aw = [[B.clothR, B.clothW], [B.clothB, B.clothW]], sg = [[B.apple, B.orange, B.crate], [B.melon, B.apple, B.crate], [B.flowerR, B.flowerY, B.crate]];
      [[66, 142], [76, 142], [108, 142], [118, 142], [128, 142]].forEach(([sx, sz], k) => MH.stall(w, sx, sz, { sx: 6, sz: 5, m: { post: B.wood, counter: B.plank, a1: aw[k % 2][0], a2: aw[k % 2][1], goods: sg[k % 3], crate: B.crate } }));
      for (const [hx, hz] of [[64, 154], [84, 154], [112, 154], [132, 154]]) { w.box(hx, G + 1, hz, hx + 8, G + 1, hz + 2, B.found); for (let x = hx; x <= hx + 8; x++) w.set(x, G + 2, hz + 1, (x % 3) ? B.hedge : B.flowerY); }
      // ── 아치 돌다리 ──
      const bm = { deck: B.cobble, parapet: B.whiteDk, arch: B.white, cap: B.trim };
      MH.bridge(w, [28, CZ0 - 3], [28, CZ1 + 3], G, { width: 7, rise: 3, arch: true, archH: 5, m: bm });
      MH.bridge(w, [124, CZ0 - 3], [124, CZ1 + 3], G, { width: 7, rise: 3, arch: true, archH: 5, m: bm });
      MH.bridge(w, [45, 48], [57, 48], G, { width: 5, rise: 2, arch: true, archH: 4, m: bm });
      for (const bx of [24, 120]) for (const z of [CZ0 - 4, CZ1 + 4]) { w.box(bx, G + 1, z, bx, G + 5, z, B.iron); w.set(bx, G + 6, z, B.lampG); w.box(bx + 8, G + 1, z, bx + 8, G + 5, z, B.iron); w.set(bx + 8, G + 6, z, B.lampG); }
      landmarks.push({ name: '아치 돌다리', note: '흰 돌로 쌓은 운하 다리', p: [28.5, G + 11, 82.5] });
      // ── 도개교: 다리탑 사이의 두 상판이 들린다 ──
      const DX = 67;
      for (const [z0, z1] of [[CZ0 - 5, CZ0 - 2], [CZ1 + 2, CZ1 + 5]]) for (const x0 of [DX - 6, DX + 4]) {
        w.box(x0, G + 1, z0, x0 + 2, G + 12, z1, B.white); w.walls(x0 - 1, G + 12, z0 - 1, x0 + 3, G + 12, z1 + 1, B.whiteDk);
        for (let y = G + 2; y <= G + 10; y += 4) w.walls(x0, y, z0, x0 + 2, y, z1, B.whiteDk);
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
      // 곤돌라(뱃머리 +x)
      const gondola = (name, x, z, phase) => {
        const p = w.prop({ name, pivot: [x + 0.5, WL + 1, z + 0.5], axis: 'x', rock: 0.05, rockSpeed: 0.9, bob: 0.18, bobSpeed: 1.2, phase });
        for (let i = -5; i <= 5; i++) { p.set(x + i, WL, z, B.gond); p.set(x + i, WL, z + 1, B.gond); if (Math.abs(i) >= 4) { p.set(x + i, WL + 1, z, B.gond); p.set(x + i, WL + 1, z + 1, B.gond); } }
        p.box(x + 6, WL + 1, z, x + 6, WL + 3, z, B.gold); p.box(x - 6, WL + 1, z + 1, x - 6, WL + 2, z + 1, B.gold);
        p.box(x - 1, WL + 1, z, x, WL + 1, z + 1, B.cush); p.set(x + 2, WL + 1, z, B.crate);
      };
      const GA = [36, 84];
      gondola('gondA', GA[0], GA[1], 0); gondola('gondB', 113, 80, 1.5);
      MH.routeOK(w, [[GA[0], GA[1] + 0.5], [97, GA[1] + 0.5], [97.5, 124], [97.5, 167]], 1, '곤돌라 뱃길');
      acts.push({
        name: '도개교', hint: '다리가 들리고 곤돌라가 지나가 남쪽 물길로 빠져나가요', hit: [DX - 3, G, CZ0, DX + 3, G + 2, CZ1],
        run: async a => {
          await Promise.all([a.turn('leafN', [-1.2, 0, 0], 2.4), a.turn('leafS', [1.2, 0, 0], 2.4)]);
          const go = a.drive('gondA', [[20, 0, 0], [40, 0, 0], [61, 0, 0.5], [61.5, 0, 12], [61.5, 0, 38], [61.5, 0, 92]], 13, { fwd: '+x', back: 1.0 });
          await a.wait(5);
          await Promise.all([go, a.turn('leafN', [0, 0, 0], 2.2), a.turn('leafS', [0, 0, 0], 2.2)]);
        },
      });
      landmarks.push({ name: '도개교', note: '배가 지나갈 때만 들린다', p: [DX + 0.5, G + 22, 82.5], tag: 'CANAL' });
      // ── 갑문: 두 문짝이 물길 쪽으로 열린다 ──
      const LX = 106;
      for (const z of [CZ0 - 1, CZ1 + 1]) { w.box(LX - 1, base - 3, z, LX + 1, G + 4, z, B.white); w.box(LX - 1, G + 5, z, LX + 1, G + 5, z, B.trim); }
      w.box(LX, G + 6, CZ0 - 1, LX, G + 6, CZ1 + 1, B.wood); w.box(LX, G + 5, CZ0 - 1, LX, G + 5, CZ0 - 1, B.wood);
      // 갑문지기 오두막과 손잡이 바퀴
      w.box(LX - 3, G + 1, CZ0 - 7, LX + 3, G + 5, CZ0 - 3, B.plasterB); w.box(LX, G + 1, CZ0 - 3, LX, G + 3, CZ0 - 3, B.door); w.set(LX - 2, G + 3, CZ0 - 3, B.win); w.set(LX + 2, G + 3, CZ0 - 3, B.win);
      MH.roof(w, LX - 4, LX + 4, CZ0 - 8, CZ0 - 2, G + 6, { b: B.roofB, eave: B.eave, ridge: B.trim, axis: 'x' });
      for (const z of [CZ1 + 3]) { w.box(LX, G + 1, z, LX, G + 3, z, B.iron); w.ring(LX, z, G + 4, 0.6, 1.6, B.iron); }
      const gN = w.prop({ name: 'gateN', pivot: [LX + 0.5, WL, CZ0] });
      const gS = w.prop({ name: 'gateS', pivot: [LX + 0.5, WL, CZ1 + 1] });
      for (let z = CZ0; z <= CZ1; z++) for (let y = base - 2; y <= G; y++) (z <= (CZ0 + CZ1) / 2 ? gN : gS).set(LX, y, z, (y - base) % 3 === 0 ? B.iron : B.plank);
      for (let z = CZ0; z <= CZ1; z++) { const g = z <= (CZ0 + CZ1) / 2 ? gN : gS; g.set(LX, G + 2, z, B.wood); g.set(LX, G + 1, z, z % 2 === 0 || z === CZ0 || z === CZ1 ? B.iron : B.plank); }
      acts.push({
        name: '갑문', hint: '문짝이 열리며 물살이 쏟아져요', hit: [LX - 1, base, CZ0, LX + 1, G + 1, CZ1],
        run: async a => {
          await Promise.all([a.turn('gateN', [0, 1.35, 0], 2), a.turn('gateS', [0, -1.35, 0], 2)]);
          for (let q = 0; q < 6; q++) { a.burst([LX + 3, WL + 1, 82.5], { n: 34, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 6, up: 3, life: 1.2, gravity: 8, spread: 4, flat: true }); a.burst([LX + 2, G + 5, 82.5], { n: 20, colors: ['#ffffff', '#e0f4ff'], speed: 3, up: 6, life: 1.2, gravity: 9, spread: 3 }); await a.wait(0.4); }
          await Promise.all([a.turn('gateN', [0, 0, 0], 1.8), a.turn('gateS', [0, 0, 0], 1.8)]);
        },
      });
      landmarks.push({ name: '갑문', note: '운하의 물높이를 다루는 문', p: [LX + 0.5, G + 12, 82.5] });
      // ── 갈매기 떼(부품): 창고 지붕에 앉아 있다가 운하 위를 맴돌고 북쪽 하늘로 날아간다 ──
      const GC = [96, G + 34, 72], gulls = [];
      [[67, 0.2], [84, 2.3], [117, 4.3]].forEach(([gx, th0], k) => {
        const gz = 66, gy = w.top(gx, gz) + 1, p = w.prop({ name: 'gull' + k, pivot: [gx + 0.5, gy, gz + 0.5] });
        p.box(gx - 1, gy, gz, gx + 1, gy, gz, B.swan); p.set(gx + 2, gy, gz, B.beak); p.set(gx - 2, gy, gz, B.cygnet);
        p.box(gx, gy, gz - 2, gx, gy, gz - 1, B.swan); p.box(gx, gy, gz + 1, gx, gy, gz + 2, B.swan); p.set(gx, gy + 1, gz - 3, B.cygnet); p.set(gx, gy + 1, gz + 3, B.cygnet);
        gulls.push({ k, gx, gy, gz, th0 });
      });
      acts.push({
        name: '갈매기 떼', hint: '창고 지붕에 앉아 있던 갈매기들이 날아올라 운하 위를 크게 맴돌다 북쪽 하늘로 날아가요', hit: [65, gulls[0].gy - 1, 63, 87, gulls[0].gy + 2, 69],
        run: async a => {
          a.wind(2, 6);
          await Promise.all(gulls.map(async g => {
            const R = 20, pts = [[0, 4, 0]], s0 = [g.gx + 0.5, g.gy, g.gz + 0.5];
            for (let i = 0; i <= 36; i++) { const t = g.th0 + i / 18 * Math.PI, y = GC[1] - 6 * Math.cos(i / 36 * Math.PI * 2 + g.k); pts.push([GC[0] + R * Math.cos(t) - s0[0], y - s0[1], GC[2] + R * Math.sin(t) - s0[2]]); }
            const L = pts[pts.length - 1];
            pts.push([L[0] - 10, L[1] + 6, L[2] - 40], [L[0] - 20, L[1] + 10, -s0[2] - 30]);
            await a.wait(g.k * 0.4);
            await a.drive('gull' + g.k, pts, 13, { fwd: '+x', back: 1.0 });
          }));
        },
      });
      // ── 백조 가족(부품): 남쪽 물길을 따라 선착장을 지나 남쪽 끝으로 헤엄쳐 간다 ──
      const SWX = 97, SWZ = 104;
      MH.routeOK(w, [[SWX + 0.5, SWZ], [SWX - 2.5, SWZ + 12], [SWX - 2.5, SWZ + 20], [SWX + 0.5, SWZ + 28], [SWX + 0.5, 167]], 1.4, '백조 물길');
      const swans = w.prop({ name: 'swans', pivot: [SWX + 0.5, WL, SWZ + 0.5], bob: 0.12, bobSpeed: 1.5 });
      swans.box(SWX, WL, SWZ - 1, SWX + 1, WL, SWZ + 2, B.swan); swans.box(SWX, WL + 1, SWZ, SWX + 1, WL + 1, SWZ + 2, B.swan); swans.set(SWX, WL + 2, SWZ + 2, B.swan);
      swans.box(SWX, WL + 1, SWZ - 2, SWX, WL + 3, SWZ - 2, B.swan); swans.set(SWX, WL + 3, SWZ - 3, B.swan); swans.set(SWX, WL + 3, SWZ - 4, B.beak);
      for (const [dx, dz] of [[-1, 4], [2, 5]]) { swans.set(SWX + dx, WL, SWZ + dz, B.cygnet); swans.set(SWX + dx, WL + 1, SWZ + dz - 1, B.cygnet); }
      acts.push({
        name: '백조 가족', hint: '백조 가족이 남쪽 물길을 따라 선착장을 가로질러 남쪽 물길 끝으로 헤엄쳐 가요', hit: [SWX - 2, WL, SWZ - 4, SWX + 3, WL + 4, SWZ + 6],
        run: async a => {
          const rip = async pts => { for (const [x, z] of pts) { a.burst([x, WL + 1, z], { n: 6, colors: ['#e0f4ff', '#ffffff'], speed: 1.2, up: 0.5, life: 0.8, gravity: 2, spread: 1, flat: true }); await a.wait(0.7); } };
          await Promise.all([
            a.drive('swans', [[0, 0, 6], [-3, 0, 12], [-3, 0, 20], [0, 0, 28], [0, 0, 44], [0, 0, 70]], 14, { fwd: '-z', back: 1.0 }),
            rip([[97.5, 110], [96, 114], [94.5, 120], [95, 126], [97.5, 132], [97.5, 140], [97.5, 148], [97.5, 156]]),
          ]);
        },
      });
      // ── 물등 띄우기(부품): 운하에 등불이 퍼지며 하늘로 떠오른다 ──
      const LZ = 80, LXc = 50;
      const lan = w.prop({ name: 'lanterns', pivot: [LXc + 0.5, WL, LZ + 0.5], scl0: [0.001, 0.001, 0.001], bob: 0.1, bobSpeed: 1.1 });
      for (const [dx, dz] of [[-12, 0], [-8, 2], [-4, -1], [0, 1], [4, -1], [8, 2], [12, 0], [-6, 4], [6, 4]]) { lan.set(LXc + dx, WL, LZ + dz, B.paddle); lan.set(LXc + dx, WL + 1, LZ + dz, B.lantern); }
      lights.push({ name: 'lanterns', p: [LXc + 0.5, WL + 2, LZ + 1.5], c: '#ffb860', i: 1.2, d: 22, flicker: 0.2, srcR: 6 });
      acts.push({
        name: '풍등 띄우기', hint: '운하 위에 등불이 하나둘 켜지더니 지붕 너머 하늘로 두둥실 떠올라요', hit: [LXc - 12, WL, LZ - 1, LXc + 12, WL + 2, LZ + 4],
        run: async a => {
          a.flash('lanterns', 3, 9); a.glow(1.6, 9);
          await a.tween('lanterns', { scl: [1, 1, 1] }, 1.6);
          const glimmer = async () => { for (let k = 0; k < 3; k++) { a.burst([LXc + 0.5 + (k % 5 - 2) * 5 + k * 0.6, WL + 2, LZ + 1 + (k % 3)], { n: 6, colors: ['#ffd890', '#fff0c0'], speed: 0.6, up: 2, life: 1.4, gravity: -0.4, spread: 0.8 }); await a.wait(0.5); } };
          await Promise.all([a.move('lanterns', [4, 0, 0], 1.6, t => t), glimmer()]);
          await a.move('lanterns', [10, 30, -4], 6, t => t * t);
          await a.tween('lanterns', { scl: [0.001, 0.001, 0.001] }, 1.2);
          await a.move('lanterns', [0, 0, 0], 0.05);
        },
      });
      // ── 창고 하역문(부품): 세 창고의 2층 문이 차례로 열린다 ──
      const doors = [];
      whs.forEach((h, k) => {
        const x0 = WXS[k], dz = 74, y0 = G + 9;
        const L = w.prop({ name: 'whL' + k, pivot: [x0 + 6, y0, dz + 0.5] }), R = w.prop({ name: 'whR' + k, pivot: [x0 + 9, y0, dz + 0.5] });
        L.box(x0 + 6, y0, dz, x0 + 6, y0 + 4, dz, B.door); R.box(x0 + 7, y0, dz, x0 + 8, y0 + 4, dz, B.door); R.box(x0 + 7, y0 + 2, dz, x0 + 8, y0 + 2, dz, B.iron); L.set(x0 + 6, y0 + 2, dz, B.iron);
        doors.push([x0, k]);
      });
      acts.push({
        name: '창고 하역문', hint: '세 창고의 하역문이 차례로 열리고 먼지와 비둘기가 쏟아져 나와요', hit: [66, G + 9, 73, 86, G + 13, 74],
        run: async a => {
          for (const [x0, k] of doors) { a.turn('whL' + k, [0, -1.5, 0], 1); a.turn('whR' + k, [0, 1.5, 0], 1); await a.wait(0.5); a.burst([x0 + 7.5, G + 11, 76], { n: 16, colors: ['#e8e8f0', '#9a9aa8', '#c8b8a0'], speed: 5, up: 4, life: 1.8, gravity: -0.4, spread: 2 }); }
          await a.wait(2.2);
          await Promise.all(doors.flatMap(([x0, k]) => [a.turn('whL' + k, [0, 0, 0], 1.2), a.turn('whR' + k, [0, 0, 0], 1.2)]));
        },
      });
      // ── 물레방아(부품): 북쪽 물길 서쪽 둑 ──
      const MWZ = 66, MWY = WL + 2;
      w.box(45, MWY, MWZ, 47, MWY, MWZ, B.iron);
      const wheel = w.prop({ name: 'wheel', pivot: [49.5, MWY + 0.5, MWZ + 0.5], axis: 'x', speed: 0.5 });
      for (let v = -5; v <= 5; v++) for (let u = -5; u <= 5; u++) {
        const d = Math.hypot(u, v);
        if (d > 5.4) continue;
        const rim = d > 4.4, spoke = (u === 0 || v === 0 || Math.abs(u) === Math.abs(v)) && d < 4.6;
        if (!rim && !spoke) continue;
        for (const x of [48, 50]) wheel.set(x, MWY + v, MWZ + u, rim && (u + v) % 2 === 0 ? B.paddle : B.wood);
        if (rim && (Math.abs(u) + Math.abs(v)) % 3 === 0) wheel.set(49, MWY + v, MWZ + u, B.paddle);
      }
      wheel.box(48, MWY, MWZ, 50, MWY, MWZ, B.iron);
      acts.push({
        name: '물레방아', hint: '물레방아가 빠르게 돌며 물보라를 튀겨요', hit: [48, MWY - 5, MWZ - 5, 50, MWY + 5, MWZ + 5],
        run: async a => {
          const spray = async () => { for (let k = 0; k < 10; k++) { a.burst([49.5, MWY + 4, MWZ + 4], { n: 14, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 3, up: 3, life: 1, gravity: 9, spread: 1.5 }); a.burst([49.5, WL + 1, MWZ - 3], { n: 10, colors: ['#e0f4ff', '#ffffff'], speed: 3, up: 1, life: 0.8, gravity: 6, spread: 2, flat: true }); await a.wait(0.4); } };
          await Promise.all([a.spin('wheel', 6, 4), spray()]);
        },
      });

      // ══ 새 구역: 남쪽 수상 시장 선착장 ══
      // 둥근 선착장 둘레: 계단 부두와 쇠고리
      for (let z = 108; z <= 136; z++) for (let x = 74; x <= 126; x++) if (!canal(x, z) && !(x >= 94 && x <= 100)) { const near = basin(x + 2, z) || basin(x - 2, z) || basin(x, z + 2) || basin(x, z - 2); if (near) MH.paint(w, x, z, (x + z) % 3 ? B.slab : B.quay); }
      // 뱃사공 쉼터: 기둥 정자와 긴 의자
      const PX0 = 64, PX1 = 75, PZ0 = 113, PZ1 = 123;
      w.box(PX0, G + 1, PZ0, PX1, G + 1, PZ1, B.plank);
      for (const x of [PX0, PX1]) for (const z of [PZ0, PZ1, Math.floor((PZ0 + PZ1) / 2)]) { w.box(x, G + 2, z, x, G + 9, z, B.wood); w.set(x, G + 2, z, B.found); }
      w.walls(PX0, G + 10, PZ0, PX1, G + 10, PZ1, B.frame);
      MH.roof(w, PX0 - 1, PX1 + 1, PZ0 - 1, PZ1 + 1, G + 11, { b: B.roofR, eave: B.eave, ridge: B.trim, axis: 'z' });
      for (const z of [PZ0 + 2, PZ1 - 2]) { w.box(PX0 + 2, G + 2, z, PX1 - 2, G + 2, z, B.plank); }
      w.box(PX0 + 4, G + 2, PZ0 + 4, PX0 + 7, G + 3, PZ0 + 6, B.wood); w.set(PX0 + 5, G + 4, PZ0 + 5, B.lampG);
      for (const z of [PZ0 + 1, PZ1 - 1]) w.box(PX1, G + 2, z, PX1, G + 3, z, B.rope);
      lights.push({ p: [PX0 + 5.5, G + 4, PZ0 + 5.5], c: '#ffd890', i: 1, d: 14, flicker: 0.1, night: true });
      landmarks.push({ name: '뱃사공 쉼터', note: '노를 쉬는 정자', p: [PX0 + 6, G + 22, PZ0 + 5] });
      // 정박한 장배 셋: 과일 · 꽃 · 천을 싣고 줄무늬 차양
      const marketBoat = (p, x, z, goods, a1) => {
        for (let i = -4; i <= 4; i++) for (let dz = 0; dz <= 2; dz++) { p.set(x + i, WL, z + dz, B.hull); if (Math.abs(i) === 4 || dz !== 1) p.set(x + i, WL + 1, z + dz, B.hull); }
        p.set(x + 5, WL + 1, z + 1, B.hull); p.set(x + 5, WL + 2, z + 1, B.gold); p.set(x - 5, WL + 1, z + 1, B.hull);
        for (let i = -3; i <= 2; i++) p.set(x + i, WL + 1, z + 1, goods[(i + 3) % goods.length]);
        for (const i of [-3, 2]) for (const dz of [0, 2]) p.box(x + i, WL + 2, z + dz, x + i, WL + 4, z + dz, B.wood);
        for (let i = -3; i <= 2; i++) for (let dz = 0; dz <= 2; dz++) p.set(x + i, WL + 5, z + dz, (i & 1) ? a1 : B.clothW);
      };
      marketBoat(w, 86, 115, [B.melon, B.apple, B.melon], B.clothB);
      marketBoat(w, 112, 126, [B.flowerR, B.flowerY, B.flowerW], B.clothR);
      marketBoat(w, 113, 116, [B.crate, B.barrel, B.crate], B.clothB);
      const mb = w.prop({ name: 'mboat', pivot: [88.5, WL + 1, 126.5], axis: 'x', rock: 0.04, rockSpeed: 0.8, bob: 0.15, bobSpeed: 1.1 });
      marketBoat(mb, 88, 125, [B.apple, B.orange, B.apple], B.clothR);
      MH.routeOK(w, [[88.5, 126.5], [97.5, 126.5], [97.5, 167]], 1.5, '장배 뱃길');
      acts.push({
        name: '수상 시장 배', hint: '과일을 가득 실은 장배가 선착장을 떠나 남쪽 물길로 노 저어 나가요', hit: [83, WL, 125, 93, WL + 5, 127],
        run: async a => {
          const wake = async () => { for (const [x, z] of [[90, 126], [94, 126.5], [97.5, 130], [97.5, 136], [97.5, 142], [97.5, 148], [97.5, 154]]) { a.burst([x, WL + 1, z], { n: 8, colors: ['#e0f4ff', '#ffffff'], speed: 1.5, up: 0.5, life: 0.9, gravity: 2, spread: 1, flat: true }); await a.wait(0.9); } };
          await Promise.all([a.drive('mboat', [[5, 0, 0], [9, 0, 2], [9, 0, 12], [9, 0, 30], [9, 0, 50]], 9, { fwd: '+x', back: 1.0 }), wake()]);
        },
      });
      landmarks.push({ name: '수상 시장', note: '배 위에 서는 아침 장', p: [100, G + 16, 121], tag: 'MARKET' });
      // 선착장 등탑: 잔교 끝의 붉은 띠 등탑(부품: 도는 등갓)
      for (let z = 124; z <= 133; z++) for (let x = 103; x <= 105; x++) { w.set(x, G, z, B.plank); if ((z % 3 === 0) && x !== 104) w.box(x, base - 3, z, x, G - 1, z, B.wood); }
      for (let z = 124; z <= 133; z++) for (const x of [103, 105]) if (z % 2 === 0) w.set(x, G + 1, z, B.rope);
      const TX = 104, TZ = 121, ty0 = G;
      w.cyl(TX, TZ, base - 3, ty0, 2.6, B.found);
      for (let y = ty0 + 1; y <= ty0 + 16; y++) w.cyl(TX, TZ, y, y, 1.9, Math.floor((y - ty0) / 4) % 2 ? B.redBand : B.white);
      w.cyl(TX, TZ, ty0 + 17, ty0 + 17, 2.8, B.whiteDk); w.ring(TX, TZ, ty0 + 18, 2, 2.8, B.iron);
      w.box(TX, ty0 + 5, TZ + 2, TX, ty0 + 6, TZ + 2, B.win); w.box(TX, ty0 + 11, TZ + 2, TX, ty0 + 12, TZ + 2, B.win); w.box(TX, ty0 + 1, TZ + 2, TX, ty0 + 3, TZ + 2, B.door);
      w.box(TX, ty0 + 18, TZ, TX, ty0 + 20, TZ, B.beacon);
      for (const [dx, dz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) w.box(TX + dx, ty0 + 18, TZ + dz, TX + dx, ty0 + 21, TZ + dz, B.iron);
      w.cyl(TX, TZ, ty0 + 22, ty0 + 22, 1.8, B.roofR); w.set(TX, ty0 + 23, TZ, B.roofR); w.set(TX, ty0 + 24, TZ, B.gold);
      const lamp = w.prop({ name: 'beam', pivot: [TX + 0.5, ty0 + 19, TZ + 0.5], speed: 0.4 });
      lamp.box(TX - 1, ty0 + 19, TZ, TX - 1, ty0 + 20, TZ, B.gold); lamp.box(TX + 1, ty0 + 19, TZ, TX + 1, ty0 + 20, TZ, B.iron);
      lights.push({ name: 'beacon', p: [TX + 0.5, ty0 + 19, TZ + 0.5], c: '#fff0b0', i: 1.6, d: 34, flicker: 0.05 });
      acts.push({
        name: '선착장 등탑', hint: '등탑의 등갓이 빙글빙글 돌며 선착장 위로 밝은 빛을 비춰요', hit: [TX - 2, ty0 + 17, TZ - 2, TX + 2, ty0 + 22, TZ + 2],
        run: async a => {
          a.flash('beacon', 4, 4.5);
          const glints = async () => { for (let k = 0; k < 8; k++) { const t = k * 0.8; a.burst([TX + 0.5 + Math.cos(t) * 6, ty0 + 19, TZ + 0.5 + Math.sin(t) * 6], { n: 10, colors: ['#fff0b0', '#ffffff'], speed: 1, up: 0.5, life: 0.8, gravity: 0, spread: 1 }); await a.wait(0.5); } };
          await Promise.all([a.spin('beam', 12, 4.5), glints()]);
        },
      });
      landmarks.push({ name: '선착장 등탑', note: '붉은 띠 등탑', p: [TX + 0.5, ty0 + 30, TZ + 0.5] });
      // 물고기 뛰기(부품): 선착장 물속에서 물고기들이 연달아 뛰어오른다
      const fishes = [[84, 122, B.fishS], [90, 119, B.fishG], [108, 113, B.fishS], [112, 121, B.fishG]];
      fishes.forEach(([fx, fz, b], k) => {
        const p = w.prop({ name: 'fish' + k, pivot: [fx + 0.5, WL, fz + 0.5], scl0: [0.001, 0.001, 0.001] });
        p.box(fx - 1, WL, fz, fx, WL, fz, b); p.set(fx + 1, WL, fz, b); p.set(fx - 2, WL + 1, fz, b);
      });
      acts.push({
        name: '물고기 뛰기', hint: '선착장 물속에서 은빛 · 금빛 물고기가 차례로 펄쩍 뛰어올라요', hit: [82, WL, 112, 116, WL + 6, 125],
        run: async a => {
          for (let r = 0; r < 2; r++) for (const [k, [fx, fz]] of fishes.entries()) {
            a.burst([fx + 0.5, WL + 1, fz + 0.5], { n: 14, colors: ['#e0f4ff', '#ffffff', '#8ac0f0'], speed: 2, up: 3, life: 0.8, gravity: 9, spread: 0.6 });
            a.tween('fish' + k, { scl: [1, 1, 1] }, 0.05);
            await a.tween('fish' + k, { off: [2, 8, 0], rot: [0, 0, 0.6] }, 0.45);
            await a.tween('fish' + k, { off: [4, 0, 0], rot: [0, 0, -0.6] }, 0.45);
            a.burst([fx + 4.5, WL + 1, fz + 0.5], { n: 12, colors: ['#e0f4ff', '#ffffff'], speed: 2, up: 2, life: 0.7, gravity: 9, spread: 0.6 });
            await a.tween('fish' + k, { scl: [0.001, 0.001, 0.001], off: [0, 0, 0], rot: [0, 0, 0] }, 0.05);
          }
        },
      });

      // ── 가로수와 가로등 ──
      for (let x = 16; x < 164; x += 14) for (const z of [CZ0 - 3, CZ1 + 2]) { if (canal(x, z) || w.get(x, G + 1, z) || w.get(x, G + 3, z) || Math.abs(x - DX) < 9 || Math.abs(x - 28) < 6 || Math.abs(x - 124) < 6 || Math.abs(x - LX) < 5 || (z < CZ0 && doors.some(([x0]) => Math.abs(x - x0 - 7) < 5))) continue; MH.tree(w, x, G + 1, z, { kind: 'oak', h: 6, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 2.8, branches: 3, spread: 2 }); }
      for (const [lx, lz] of [[40, CZ0 - 2], [58, CZ1 + 2], [76, CZ1 + 2], [100, CZ0 - 2], [118, CZ1 + 2], [46, 42], [80, 132], [122, 112]]) if (!canal(lx, lz) && !w.get(lx, G + 1, lz)) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      // 부두 소품: 상자 · 통 · 밧줄 더미
      for (const [x, z] of [[78, 108], [79, 108], [118, 108], [120, 135], [82, 136], [76, 134]]) if (!canal(x, z) && !w.get(x, G + 1, z)) { w.set(x, G + 1, z, (x + z) % 2 ? B.crate : B.barrel); }
      return { lights, landmarks, acts };
    },
  }));
})();
