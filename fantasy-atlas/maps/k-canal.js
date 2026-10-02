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
      swan: { c: '#f8f8f4', v: 0.02 }, beak: { c: '#f08a30', v: 0.03 }, cygnet: { c: '#a8a8a4', v: 0.04 }, lantern: { c: '#ffb860', glow: true }, paddle: { c: '#7a5a3a', v: 0.05, pat: 'plank' },
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
      for (let z = CZ0; z <= CZ1; z++) { const g = z <= (CZ0 + CZ1) / 2 ? gN : gS; g.set(LX, G + 2, z, B.wood); g.set(LX, G + 1, z, z % 2 === 0 || z === CZ0 || z === CZ1 ? B.iron : B.plank); }   // 문짝 위 난간
      acts.push({
        name: '갑문', hint: '문짝이 열리며 물살이 쏟아져요', hit: [LX - 1, base, CZ0, LX + 1, G + 1, CZ1],
        run: async a => {
          await Promise.all([a.turn('gateN', [0, 1.35, 0], 2), a.turn('gateS', [0, -1.35, 0], 2)]);
          for (let q = 0; q < 6; q++) { a.burst([LX + 3, WL + 1, 62.5], { n: 34, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 6, up: 3, life: 1.2, gravity: 8, spread: 4, flat: true }); a.burst([LX + 2, G + 5, 62.5], { n: 20, colors: ['#ffffff', '#e0f4ff'], speed: 3, up: 6, life: 1.2, gravity: 9, spread: 3 }); await a.wait(0.4); }
          await Promise.all([a.turn('gateN', [0, 0, 0], 1.8), a.turn('gateS', [0, 0, 0], 1.8)]);
        },
      });
      landmarks.push({ name: '갑문', note: '운하의 물높이를 다루는 문', p: [LX + 0.5, G + 12, 62.5] });
      // ── 갈매기 떼(부품): 창고 지붕에 앉아 있다가 날아올라 운하 위를 맴돈다 ──
      const GC = [76, G + 34, 52], gulls = [];
      [[57, 0.2], [74, 2.3], [107, 4.3]].forEach(([gx, th0], k) => {
        const gz = 46, gy = w.top(gx, gz) + 1, p = w.prop({ name: 'gull' + k, pivot: [gx + 0.5, gy, gz + 0.5] });
        p.box(gx - 1, gy, gz, gx + 1, gy, gz, B.swan); p.set(gx + 2, gy, gz, B.beak); p.set(gx - 2, gy, gz, B.cygnet);
        p.box(gx, gy, gz - 2, gx, gy, gz - 1, B.swan); p.box(gx, gy, gz + 1, gx, gy, gz + 2, B.swan); p.set(gx, gy + 1, gz - 3, B.cygnet); p.set(gx, gy + 1, gz + 3, B.cygnet);
        gulls.push({ k, gx, gy, gz, th0 });
      });
      acts.push({
        name: '갈매기 떼', hint: '창고 지붕에 앉아 있던 갈매기들이 날아올라 운하 위를 크게 맴돌아요', hit: [55, gulls[0].gy - 1, 43, 77, gulls[0].gy + 2, 49],
        run: async a => {
          a.wind(2, 6);
          await Promise.all(gulls.map(async g => {
            const R = 18, pts = [], s0 = [g.gx + 0.5, g.gy, g.gz + 0.5];
            for (let i = 0; i <= 36; i++) { const t = g.th0 + i / 18 * Math.PI, y = GC[1] - 6 * Math.cos(i / 36 * Math.PI * 2 + g.k); pts.push([GC[0] + R * Math.cos(t) - s0[0], y - s0[1], GC[2] + R * Math.sin(t) - s0[2], -t - Math.PI / 2]); }
            await a.wait(g.k * 0.4);
            await a.move('gull' + g.k, [0, 4, 0], 0.6);
            await a.path('gull' + g.k, pts, 9);
            await a.path('gull' + g.k, [[0, 4, 0, -g.th0 - Math.PI / 2 - Math.PI * 2]], 1.8);
            a.unwind('gull' + g.k); await a.turn('gull' + g.k, [0, 0, 0], 0.5); await a.move('gull' + g.k, [0, 0, 0], 0.5);
          }));
        },
      });
      // ── 백조 가족(부품): 남쪽 물길에서 큰 운하까지 헤엄쳐 나왔다 돌아간다 ──
      const SWX = 87, SWZ = 84;
      MH.routeOK(w, [[SWX + 0.5, SWZ], [SWX + 0.5, 63]], 1.4, '백조 물길');
      const swans = w.prop({ name: 'swans', pivot: [SWX + 0.5, WL, SWZ + 0.5], bob: 0.12, bobSpeed: 1.5 });
      swans.box(SWX, WL, SWZ - 1, SWX + 1, WL, SWZ + 2, B.swan); swans.box(SWX, WL + 1, SWZ, SWX + 1, WL + 1, SWZ + 2, B.swan); swans.set(SWX, WL + 2, SWZ + 2, B.swan);
      swans.box(SWX, WL + 1, SWZ - 2, SWX, WL + 3, SWZ - 2, B.swan); swans.set(SWX, WL + 3, SWZ - 3, B.swan); swans.set(SWX, WL + 3, SWZ - 4, B.beak);
      for (const [dx, dz] of [[-1, 4], [2, 5]]) { swans.set(SWX + dx, WL, SWZ + dz, B.cygnet); swans.set(SWX + dx, WL + 1, SWZ + dz - 1, B.cygnet); }
      acts.push({
        name: '백조 가족', hint: '백조 가족이 남쪽 물길을 따라 큰 운하까지 헤엄쳐 나왔다가 돌아가요', hit: [SWX - 2, WL, SWZ - 4, SWX + 3, WL + 4, SWZ + 6],
        run: async a => {
          const rip = async (z0, dz) => { for (let k = 0; k < 8; k++) { a.burst([SWX + 1, WL + 1, z0 + dz * k], { n: 6, colors: ['#e0f4ff', '#ffffff'], speed: 1.2, up: 0.5, life: 0.8, gravity: 2, spread: 1, flat: true }); await a.wait(0.6); } };
          await Promise.all([a.move('swans', [0, 0, -19], 4.5, t => t), rip(SWZ + 2, -2.5)]);
          await a.turn('swans', [0, Math.PI, 0], 1.6);
          for (let k = 0; k < 4; k++) { a.burst([SWX + 0.5, WL + 4, 64], { n: 14, colors: ['#ffffff', '#f8f8f4'], speed: 3, up: 4, life: 1.4, gravity: 2, spread: 2 }); await a.wait(0.3); }
          await Promise.all([a.move('swans', [0, 0, 0], 4.5, t => t), rip(64, 2.5)]);
          await a.turn('swans', [0, 0, 0], 1.6);
        },
      });
      // ── 물등 띄우기(부품): 운하에 등불이 퍼지며 떠내려간다 ──
      const LZ = 60, LXc = 40;
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
        const x0 = h.x0 != null ? h.x0 : [50, 68, 100][k], dz = 54, y0 = G + 9;
        const L = w.prop({ name: 'whL' + k, pivot: [x0 + 6, y0, dz + 0.5] }), R = w.prop({ name: 'whR' + k, pivot: [x0 + 9, y0, dz + 0.5] });
        L.box(x0 + 6, y0, dz, x0 + 6, y0 + 4, dz, B.door); R.box(x0 + 7, y0, dz, x0 + 8, y0 + 4, dz, B.door); R.box(x0 + 7, y0 + 2, dz, x0 + 8, y0 + 2, dz, B.iron); L.set(x0 + 6, y0 + 2, dz, B.iron);
        doors.push([x0, k]);
      });
      acts.push({
        name: '창고 하역문', hint: '세 창고의 하역문이 차례로 열리고 먼지와 비둘기가 쏟아져 나와요', hit: [56, G + 9, 53, 76, G + 13, 54],
        run: async a => {
          for (const [x0, k] of doors) { a.turn('whL' + k, [0, -1.5, 0], 1); a.turn('whR' + k, [0, 1.5, 0], 1); await a.wait(0.5); a.burst([x0 + 7.5, G + 11, 56], { n: 16, colors: ['#e8e8f0', '#9a9aa8', '#c8b8a0'], speed: 5, up: 4, life: 1.8, gravity: -0.4, spread: 2 }); }
          await a.wait(2.2);
          await Promise.all(doors.flatMap(([x0, k]) => [a.turn('whL' + k, [0, 0, 0], 1.2), a.turn('whR' + k, [0, 0, 0], 1.2)]));
        },
      });
      // ── 물레방아(부품): 북쪽 물길 서쪽 둑 ──
      const MWZ = 46, MWY = WL + 2;
      w.box(35, MWY, MWZ, 37, MWY, MWZ, B.iron);
      const wheel = w.prop({ name: 'wheel', pivot: [38.5 + 1, MWY + 0.5, MWZ + 0.5], axis: 'x', speed: 0.5 });
      for (let v = -5; v <= 5; v++) for (let u = -5; u <= 5; u++) {
        const d = Math.hypot(u, v);
        if (d > 5.4) continue;
        const rim = d > 4.4, spoke = (u === 0 || v === 0 || Math.abs(u) === Math.abs(v)) && d < 4.6;
        if (!rim && !spoke) continue;
        for (const x of [38, 40]) wheel.set(x, MWY + v, MWZ + u, rim && (u + v) % 2 === 0 ? B.paddle : B.wood);
        if (rim && (Math.abs(u) + Math.abs(v)) % 3 === 0) wheel.set(39, MWY + v, MWZ + u, B.paddle);
      }
      wheel.box(38, MWY, MWZ, 40, MWY, MWZ, B.iron);
      acts.push({
        name: '물레방아', hint: '물레방아가 빠르게 돌며 물보라를 튀겨요', hit: [38, MWY - 5, MWZ - 5, 40, MWY + 5, MWZ + 5],
        run: async a => {
          const spray = async () => { for (let k = 0; k < 10; k++) { a.burst([39.5, MWY + 4, MWZ + 4], { n: 14, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 3, up: 3, life: 1, gravity: 9, spread: 1.5 }); a.burst([39.5, WL + 1, MWZ - 3], { n: 10, colors: ['#e0f4ff', '#ffffff'], speed: 3, up: 1, life: 0.8, gravity: 6, spread: 2, flat: true }); await a.wait(0.4); } };
          await Promise.all([a.spin('wheel', 6, 4), spray()]);
        },
      });
      // ── 가로수와 가로등 ──
      for (let x = 6; x < 124; x += 14) for (const z of [CZ0 - 3, CZ1 + 2]) { if (canal(x, z) || w.get(x, G + 1, z) || w.get(x, G + 3, z) || Math.abs(x - DX) < 9 || Math.abs(x - 18) < 6 || Math.abs(x - 114) < 6 || (z < CZ0 && doors.some(([x0]) => Math.abs(x - x0 - 7) < 5))) continue; MH.tree(w, x, G + 1, z, { kind: 'oak', h: 6, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 2.8, branches: 3, spread: 2 }); }
      for (const [lx, lz] of [[30, CZ0 - 2], [48, CZ1 + 2], [66, CZ1 + 2], [90, CZ0 - 2], [108, CZ1 + 2], [36, 22], [92, 96]]) if (!canal(lx, lz) && !w.get(lx, G + 1, lz)) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      return { lights, landmarks, acts };
    },
  }));
})();
