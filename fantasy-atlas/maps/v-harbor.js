// 갈매기 항구 — 언덕 비탈의 마을, 돌 안벽과 부두, 곶 끝의 등대 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'harbor', cat: 'village', name: '갈매기 항구', en: 'Gull Harbor', color: '#5ab0d0', seed: 113, base: 22, time: 'day',
    desc: '언덕 비탈에 흰 집들이 층층이 들어선 항구. 어부들은 새벽마다 곶의 등대를 보고 바다로 나간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '어부와 선원 80여 명'], ['특산물', '훈제 청어 · 구름 진주'], ['소문', '밤마다 등대지기가 바다를 향해 노래한다']] },
    sky: ['#ffc48a', '#4e5c9c', '#ffe0a0'], stars: false,
    hemi: ['#ffe8d0', '#3a4a6a', 0.56], sun: ['#ffd0a0', 0.8, [0.6, 0.8, 0.5]],
    liquid: ['#1f5a80', '#3a86b0', '#eaf8ff'], liqSpeed: 0.9,
    fog: { start: 0.76, floor: 12, depth: 10 },
    particles: [
      { n: 100, colors: ['#ffffff', '#d8f0ff'], mode: 'drift', speed: 0.5, y0: 24, y1: 56, glow: false },
      { n: 18, colors: ['#ffffff'], mode: 'wisp', speed: 1.4, size: 2, y0: 46, glow: false },
    ],
    blocks: {
      grass: { c: '#7a5a3a', top: '#7aa84a', v: 0.08 }, grass2: { c: '#7a5a3a', top: '#8ab85a', v: 0.08 },
      sand: { c: '#c8b080', top: '#ecd8a4', v: 0.05 }, dirt: { c: '#7a5a3a', v: 0.08 },
      rock: { c: '#6e6e78', v: 0.06, pat: 'stone' }, rockDk: { c: '#4e4e58', v: 0.06, pat: 'stone' }, cliff: { c: '#7e7a78', v: 0.06, pat: 'big' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.1, pat: 'stone' }, quay: { c: '#8e8a84', v: 0.05, pat: 'big' },
      wallW: { c: '#f2eee4', v: 0.03 }, wallB: { c: '#a8c8dc', v: 0.03 }, wallY: { c: '#f0dca0', v: 0.03 }, frame: { c: '#5a4030', v: 0.05 },
      roofB: { c: '#3a6a9a', v: 0.05, pat: 'tile' }, roofR: { c: '#b0503a', v: 0.05, pat: 'tile' }, roofDk: { c: '#2a4a6a', v: 0.04 }, found: { c: '#8a8680', v: 0.05, pat: 'stone' },
      door: { c: '#3a5a7a', v: 0.03, pat: 'plank' }, shutter: { c: '#3a7ab0', v: 0.03 },
      win: { c: '#ffd890', night: true, day: '#a8d8f0' }, lamp: { c: '#fff0a0', night: true, day: '#d8d0b0' },
      lens: { c: '#ffe890', night: true, day: '#c8d8e0' }, beam: { c: '#fff6c8', night: true, day: '#000000' },
      stripeR: { c: '#d04a3a', v: 0.03 }, stripeW: { c: '#f4f0e8', v: 0.02 }, plank: { c: '#9a6a40', v: 0.08, pat: 'plank' }, post: { c: '#4a3020', v: 0.05 },
      hull: { c: '#7a4a2a', v: 0.06, pat: 'plank' }, hullB: { c: '#2a4a6a', v: 0.04 }, deck: { c: '#b08a5a', v: 0.06, pat: 'plank' }, sail: { c: '#f0ead8', v: 0.03 }, mast: { c: '#5a3a24', v: 0.04 },
      net: { c: '#8a8a70', v: 0.1 }, fish: { c: '#b8c8d0', v: 0.08 }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' }, crate: { c: '#a07a4a', v: 0.08, pat: 'plank' },
      rope: { c: '#c8b890', v: 0.04 }, iron: { c: '#4a4a52', v: 0.03 }, bark: { c: '#5a3a24', v: 0.05 }, leaf: { c: '#4a8a3a', v: 0.1 }, leaf2: { c: '#6aaa48', v: 0.1 }, leafDk: { c: '#3a6a30', v: 0.08 },
      flower: { c: '#e86a8a', v: 0.05 }, bell: { c: '#c8a050', v: 0.05 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sea = base;
      const coastZ = x => 72 + (n.fbm(x * 0.03, 5, 3) - 0.5) * 10;
      const head = (x, z) => MH.segDist(x, z, 104, 66, 113, 100);
      const cove = (x, z) => MH.dist(x, z, 26, 78) < 18;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          let k = coastZ(x) - z;                       // 양수면 육지
          const hd = head(x, z);
          if (hd < 8) k = Math.max(k, 8 - hd);
          const land = base + 2 + Math.max(0, k) * 0.34 + n.fbm(x * 0.05, z * 0.05) * 2;
          const t = cove(x, z) ? MH.sstep(-8, 8, k) : MH.sstep(-1, 2.5, k);
          return MH.lerp(sea - 7 + n.fbm(x * 0.08, z * 0.08) * 2, land, t);
        },
        surface: (x, z, y, s) => y <= sea + 1 ? B.sand : s >= 3 ? B.cliff : n.fbm(x * 0.1, z * 0.1, 2) > 0.57 ? B.grass2 : B.grass,
        under: (x, z, y, dep, s) => dep < 2 && s < 3 && y > sea ? B.dirt : (y % 4 === 0 ? B.rockDk : B.cliff),
      });
      const lights = [], acts = [], landmarks = [];
      // ── 돌 안벽: 동서로 곧게 ──
      const QZ0 = 74, QZ1 = 79, QX0 = 40, QX1 = 98;
      for (let z = QZ0 - 3; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) MH.setH(w, x, z, sea + 2, z >= QZ1 - 1 ? B.quay : B.cobble, B.quay);
      // 안벽 앞 바다를 충분히 깊게 판다(배가 바닥에 닿지 않도록)
      for (let z = QZ1 + 1; z < D; z++) for (let x = 30; x <= 102; x++) if (head(x, z) > 10 && !cove(x, z) && MH.g(w, x, z) > sea - 6) MH.setH(w, x, z, sea - 6, B.sand, B.rockDk);
      MH.water(w, sea);
      for (let x = QX0 + 2; x <= QX1 - 2; x += 6) { w.box(x, sea + 3, QZ1, x, sea + 4, QZ1, B.iron); }
      // 나무 선착장 둘(남쪽으로)
      const piers = [[56, 58], [80, 82]];
      for (const [x0, x1] of piers) for (let z = QZ1 + 1; z <= 102; z++) for (let x = x0; x <= x1; x++) {
        w.set(x, sea + 2, z, B.plank);
        if ((x === x0 || x === x1) && z % 4 === 0) { for (let y = MH.g(w, x, z) + 1; y <= sea + 1; y++) w.set(x, y, z, B.post); w.set(x, sea + 3, z, B.post); }
      }
      for (const [x0] of piers) { w.box(x0 + 1, sea + 3, 102, x0 + 1, sea + 6, 102, B.post); w.set(x0 + 1, sea + 7, 102, B.lamp); lights.push({ p: [x0 + 1.5, sea + 7, 102.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true }); }
      landmarks.push({ name: '선착장', note: '두 줄로 뻗은 나무 부두', p: [69.5, sea + 12, 92.5] });

      // ── 배: 흘수선 아래가 물에 잠기게 놓는다 ──
      const SM = { hull: B.hull, keel: B.hullB, deck: B.deck, rail: B.hull, mast: B.mast, sail: B.sail, cargo: B.crate };
      const b1 = w.prop({ name: 'b1', pivot: [67.5, sea + 1, 86.5], axis: 'x', rock: 0.05, rockSpeed: 1.1, bob: 0.2, bobSpeed: 1.3 });
      MH.ship(b1, 62, sea + 1, 86, 11, SM, { mast: 11 });
      const b2 = w.prop({ name: 'b2', pivot: [68.5, sea + 1, 96.5], axis: 'x', rock: 0.06, rockSpeed: 0.9, bob: 0.2, bobSpeed: 1.1, phase: 2 });
      MH.ship(b2, 63, sea + 1, 96, 11, Object.assign({}, SM, { sail: B.stripeR }), { mast: 10 });
      // 출항하는 어선: 동쪽 선착장 바깥에 매여 있다
      const FXs = 92, FZs = 94;
      const fb = w.prop({ name: 'fisher', pivot: [FXs + 0.5, sea + 1, FZs + 0.5], axis: 'x', rock: 0.05, rockSpeed: 1, bob: 0.25, bobSpeed: 1.2, phase: 1 });
      MH.ship(fb, FXs - 6, sea + 1, FZs, 13, Object.assign({}, SM, { sail: B.stripeW, flag: B.stripeR, cargo: B.net }), { mast: 13 });
      const route = [[FXs, FZs], [96, 106], [84, 118], [60, 120], [40, 112], [48, 106]];
      MH.routeOK(w, route, 4, '어선 출항 경로');
      const out = MH.relPath(route, 0), back = MH.relPath(route.slice().reverse(), out[out.length - 1][3] + Math.PI);
      acts.push({
        name: '어선 출항', hint: '어선이 바다를 한 바퀴 돌고 돌아와요', hit: [FXs - 7, sea, FZs - 3, FXs + 8, sea + 14, FZs + 3],
        run: async a => {
          await a.path('fisher', out, 9);
          await a.wait(0.6);
          const home = route[0], end = route[route.length - 1];
          await a.path('fisher', back.map(p => [p[0] + end[0] - home[0], 0, p[2] + end[1] - home[1], p[3]]), 9);
          a.unwind('fisher'); await a.turn('fisher', [0, 0, 0], 1.2);
        },
      });
      // 거룻배(정박)와 부두 기중기: 줄은 늘고 줄어든다
      const BGX = 86, BGZ = 82;
      w.box(BGX, sea, BGZ, BGX + 10, sea, BGZ + 3, B.hullB); w.walls(BGX, sea + 1, BGZ, BGX + 10, sea + 1, BGZ + 3, B.hull);
      w.box(BGX + 1, sea + 1, BGZ + 1, BGX + 3, sea + 1, BGZ + 2, B.crate); w.set(BGX + 8, sea + 1, BGZ + 1, B.barrel);
      const CX = 91, CZ = 76, cg = sea + 3, ARM = cg + 13;
      w.box(CX - 1, cg, CZ - 1, CX + 1, cg, CZ + 1, B.found);
      w.box(CX, cg + 1, CZ, CX, ARM, CZ, B.post); w.line(CX - 2, cg + 1, CZ, CX, cg + 7, CZ, B.post); w.line(CX + 2, cg + 1, CZ, CX, cg + 7, CZ, B.post);
      w.box(CX, ARM, CZ - 2, CX, ARM, CZ + 8, B.post); w.line(CX, ARM - 5, CZ, CX, ARM, CZ + 5, B.post); w.box(CX, ARM + 1, CZ + 8, CX, ARM + 1, CZ + 8, B.iron);
      MH.rope(w, 'crope', CX, ARM - 1, CZ + 8, 4, B.rope);
      const load = w.prop({ name: 'load', pivot: [CX + 0.5, ARM - 6, CZ + 8.5] });
      load.box(CX - 1, ARM - 7, CZ + 7, CX + 1, ARM - 5, CZ + 9, B.crate); load.set(CX, ARM - 5, CZ + 8, B.iron);
      acts.push({
        name: '부두 기중기', hint: '밧줄이 풀려 짐을 거룻배에 내려요', hit: [CX - 1, cg, CZ - 1, CX + 1, ARM + 1, CZ + 9],
        run: async a => {
          const drop = (ARM - 7) - (sea + 2);
          await Promise.all([a.move('load', [0, -drop, 0], 2.4, t => t), a.rope('crope', 4, 4 + drop, 2.4, t => t)]);
          await a.wait(0.9);
          await Promise.all([a.move('load', [0, 0, 0], 2.6, t => t), a.rope('crope', 4, 4, 2.6, t => t)]);
        },
      });
      // ── 곶의 등대 ──
      const LX = 112, LZ = 96, lg = MH.g(w, LX, LZ) + 1;
      MH.flatten(w, LX - 6, LZ - 6, LX + 6, LZ + 6, lg - 1, B.cobble, B.cliff);
      for (let y = lg; y < lg + 32; y++) w.cyl(LX, LZ, y, y, 4.4 - (y - lg) * 0.045, Math.floor((y - lg) / 5) % 2 ? B.stripeR : B.stripeW);
      w.cyl(LX, LZ, lg, lg + 1, 5.2, B.found);
      for (let y = lg + 6; y < lg + 28; y += 7) { w.box(LX, y, LZ + 4, LX, y + 1, LZ + 4, B.win); w.box(LX - 4, y + 3, LZ, LX - 4, y + 4, LZ, B.win); }
      w.box(LX, lg, LZ + 4, LX, lg + 3, LZ + 4, B.door); w.box(LX, lg + 1, LZ + 5, LX, lg + 1, LZ + 5, 0);
      w.ring(LX, LZ, lg + 32, 0, 5.4, B.post); w.ring(LX, LZ, lg + 33, 4.4, 5.4, B.iron);
      w.cyl(LX, LZ, lg + 33, lg + 36, 2.6, B.lens); w.cyl(LX, LZ, lg + 33, lg + 36, 1.4, B.found);
      for (const [dx, dz] of [[2, 2], [-2, 2], [2, -2], [-2, -2], [3, 0], [-3, 0], [0, 3], [0, -3]]) w.box(LX + dx, lg + 33, LZ + dz, LX + dx, lg + 36, LZ + dz, B.iron);
      w.ring(LX, LZ, lg + 37, 0, 3.6, B.post);
      const cap = MH.dome(w, LX, lg + 38, LZ, 3.2, B.roofR, null);
      w.box(LX, cap, LZ, LX, cap + 3, LZ, B.iron);
      const beam = w.prop({ name: 'beam', pivot: [LX + 0.5, lg + 34.5, LZ + 0.5], axis: 'y', speed: 0.9 });
      for (let s = 4; s <= 13; s++) { beam.box(LX + s, lg + 34, LZ, LX + s, lg + 35, LZ, B.beam); beam.box(LX - s, lg + 34, LZ, LX - s, lg + 35, LZ, B.beam); if (s > 7) { beam.set(LX + s, lg + 34, LZ + 1, B.beam); beam.set(LX - s, lg + 34, LZ - 1, B.beam); } }
      // 낮에도 약하게(0.3배) 켜져 있어 점등 연출이 낮에도 보인다
      lights.push({ name: 'light', p: [LX + 0.5, lg + 35, LZ + 0.5], c: '#fff0b0', i: 1.8, d: 36, flicker: 0.05 });
      const keeper = MH.house(w, { x: LX - 10, z: LZ - 14, sx: 8, sz: 7, fh: 5, face: 's', m: { found: B.found, wall: B.wallW, win: B.win, shutter: B.shutter, door: B.door, roof: B.roofR, eave: B.roofDk, chimney: B.found, lamp: B.lamp } });
      acts.push({
        name: '등대', hint: '불빛이 밝아지며 빠르게 돌아요(밤에 더 잘 보여요)', hit: [LX - 5, lg + 28, LZ - 5, LX + 5, lg + 40, LZ + 5],
        run: async a => {
          a.flash('light', 3, 4.5); a.glow(1.6, 4.5); a.spin('beam', 5, 4.5);
          // 등롱 둘레로 빛살이 번지고, 돔 위로 불티가 솟는다(낮에도 보이도록 육지 쪽 둘레를 따라)
          for (let k = 0; k < 15; k++) {
            for (const j of [0, 1]) { const t = Math.PI * (0.5 + (k * 2 + j) / 30); a.burst([LX + 0.5 + Math.cos(t) * 6.5, lg + 34 + (k % 3), LZ + 0.5 - Math.sin(t) * 6.5], { n: 8, colors: ['#fff6c8', '#ffe890', '#ffffff'], speed: 2, up: 0.5, life: 0.9, gravity: 0, spread: 0.5, flat: true }); }
            if (k % 3 === 0) a.burst([LX + 0.5, cap + 4, LZ + 0.5], { n: 14, colors: ['#ffe890', '#fff6c8'], speed: 1.5, up: 3, life: 1.2, gravity: -0.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '곶의 등대', note: '돌아가는 불빛이 배를 부른다', p: [LX + 0.5, cap + 7, LZ + 0.5], tag: 'LIGHT' });

      // ── 생선 시장(기둥 회랑) ──
      const MX = 42, MZ = 66;
      const mg = sea + 3;
      MH.flatten(w, MX - 1, MZ - 1, MX + 15, MZ + 8, mg - 1, B.cobble, B.quay);
      for (let x = MX; x <= MX + 14; x += 7) for (const z of [MZ, MZ + 7]) { w.box(x, mg, z, x, mg + 7, z, B.wallW); w.box(x, mg, z, x, mg, z, B.found); }
      w.walls(MX, mg + 8, MZ, MX + 14, mg + 8, MZ + 7, B.frame);
      MH.roof(w, MX - 1, MX + 15, MZ - 1, MZ + 8, mg + 9, { b: B.roofB, eave: B.roofDk, ridge: B.stripeW, axis: 'x' });
      for (let x = MX + 2; x <= MX + 12; x += 3) { w.box(x, mg, MZ + 2, x + 1, mg + 1, MZ + 5, B.crate); w.box(x, mg + 2, MZ + 3, x + 1, mg + 2, MZ + 4, B.fish); }
      for (const [bx, bz] of [[MX + 17, MZ + 3], [MX + 17, MZ + 5], [MX + 18, MZ + 4]]) { w.set(bx, mg, bz, B.barrel); if (bx === MX + 17) w.set(bx, mg + 1, bz, B.barrel); }
      w.set(MX + 7, mg + 7, MZ + 8, B.lamp); lights.push({ p: [MX + 7.5, mg + 7, MZ + 8.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      landmarks.push({ name: '생선 시장', note: '아침마다 청어 경매', p: [MX + 7.5, mg + 17, MZ + 3.5] });
      // ── 비탈의 집들, 계단 골목, 교회 ──
      const walls = [B.wallW, B.wallB, B.wallW, B.wallY];
      const lanes = [[[30, 6], [34, 36], [44, 56], [50, 72]], [[86, 8], [78, 34], [70, 56], [72, 72]]];
      for (const l of lanes) MH.path(w, l, 1.6, B.cobble);
      let k = 0;
      const chim = [], chimAll = [];
      for (let z = 10; z <= 60; z += 13) for (let x = 8; x <= 98; x += 14) {
        const hx = x + w.ri(-2, 2), hz = z + w.ri(-1, 1);
        if (coastZ(hx + 5) - (hz + 9) < 6 || head(hx, hz) < 12 || lanes.some(l => MH.polyDist(hx + 5, hz + 4, l) < 8) || (hx > 36 && hx < 60 && hz > 52)) continue;
        const h = MH.houseX(w, { x: hx, z: hz, sx: w.ri(9, 11), sz: w.ri(7, 9), floors: 1 + (k % 3 === 0 ? 1 : 0), fh: 5, face: 's', pitch: 1, dormers: k % 4 === 1 ? 1 : 0,
          m: { found: B.found, wall: walls[k % 4], quoin: B.found, win: B.win, shutter: B.shutter, sill: B.found, flower: B.flower, door: B.door, roof: k % 3 === 1 ? B.roofR : B.roofB, eave: B.roofDk, ridge: B.stripeW, chimney: k % 2 ? B.found : null, lamp: B.lamp } });
        if (h.chimney && chim.length < 3) chim.push(h.chimney);
        if (h.chimney) chimAll.push(h.chimney);
        if (k % 3 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 1.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
        k++;
      }
      const CHX = 56, CHZ = 22;
      const ch = MH.house(w, { x: CHX, z: CHZ, sx: 15, sz: 9, fh: 9, face: 's', pitch: 1, m: { found: B.found, wall: B.wallW, frame: B.found, win: B.win, door: B.door, roof: B.roofB, eave: B.roofDk, ridge: B.stripeW } });
      const st = MH.tower(w, { cx: CHX + 3, cz: CHZ + 4, y0: ch.y, h: 26, r: 3, square: true, m: { wall: B.wallW, band: B.found, win: B.win, roof: B.roofB, eave: B.roofDk, finial: B.bell }, pitch: 3 });
      landmarks.push({ name: '언덕 위 마을', note: '푸른 지붕의 흰 집과 종탑', p: [CHX + 3.5, st + 4, CHZ + 4.5] });
      // ── 모래톱: 건조대, 엎어 둔 거룻배, 바위 ──
      for (const [rx, rz] of [[20, 70], [27, 73]]) { const g = MH.g(w, rx, rz); w.box(rx, g + 1, rz, rx, g + 6, rz, B.post); w.box(rx + 5, g + 1, rz, rx + 5, g + 6, rz, B.post); w.box(rx, g + 6, rz, rx + 5, g + 6, rz, B.rope); for (let q = 1; q <= 4; q++) { w.set(rx + q, g + 5, rz, B.fish); if (q % 2) w.set(rx + q, g + 4, rz, B.fish); } }
      { const g = MH.g(w, 34, 72); w.box(32, g + 1, 71, 37, g + 1, 73, B.hull); w.box(33, g + 2, 72, 36, g + 2, 72, B.hull); w.set(39, g + 1, 72, B.net); w.set(39, g + 2, 72, B.net); }
      for (let i = 0; i < 14; i++) { const x = w.ri(6, 40), z = w.ri(84, 116), g = MH.g(w, x, z); if (g >= sea - 4 && g <= sea + 1) MH.rock(w, x, g, z, w.r(1.5, 3.2), B.rock, null); }
      for (let i = 0; i < 30; i++) {
        const x = w.ri(2, 125), z = w.ri(2, 62), g = MH.g(w, x, z);
        if (g < sea + 3 || w.get(x, g + 1, z) || w.get(x, g, z) === B.cobble) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(6, 9), bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 3.2 });
      }
      for (const [lx, lz] of [[50, 76], [74, 76], [96, 76]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.post, glow: B.lamp, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 12, flicker: 0.1, night: true });
      // ── 큰 파도: 정박한 배들이 크게 출렁이고 안벽에 물보라가 친다 ──
      acts.push({
        name: '큰 파도', hint: '큰 너울이 밀려와 배들이 크게 출렁이고 안벽에 물보라가 튀어요', hit: [62, sea - 1, 84, 75, sea + 12, 99],
        run: async a => {
          a.spin('b1', 6, 4); a.spin('b2', 6, 4); a.spin('fisher', 5, 4); a.wind(2.5, 4);
          for (let k = 0; k < 8; k++) {
            for (let x = QX0 + 4 + (k % 2) * 6; x <= QX1 - 4; x += 12) if (x < 55 || (x > 59 && x < 79) || x > 83) a.burst([x + 0.5, sea + 1, QZ1 + 1.5], { n: 12, colors: ['#ffffff', '#eaf8ff', '#a8d8f0'], speed: 2.5, up: 6, life: 1, gravity: 12, spread: 1.5 });
            await a.wait(0.5);
          }
        },
      });
      // ── 종 부표: 항구 어귀에서 흔들리며 종을 울린다 ──
      const BX = 70, BZB = 105;
      const buoy = w.prop({ name: 'buoy', pivot: [BX + 0.5, sea, BZB + 0.5], axis: 'x', rock: 0.08, rockSpeed: 1.3, bob: 0.25, bobSpeed: 1.5, phase: 0.7 });
      buoy.cyl(BX, BZB, sea, sea, 2, B.stripeR); buoy.cyl(BX, BZB, sea + 1, sea + 1, 2, B.stripeW); buoy.cyl(BX, BZB, sea + 2, sea + 2, 1.5, B.stripeR);
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) buoy.box(BX + dx, sea + 3, BZB + dz, BX + dx, sea + 6, BZB + dz, B.iron);
      buoy.box(BX - 1, sea + 7, BZB - 1, BX + 1, sea + 7, BZB + 1, B.stripeR); buoy.set(BX, sea + 8, BZB, B.lamp);
      buoy.box(BX, sea + 4, BZB, BX, sea + 6, BZB, B.bell);
      acts.push({
        name: '종 부표', hint: '항구 어귀의 부표가 흔들리며 땡그랑 종을 울려요', hit: [BX - 2, sea, BZB - 2, BX + 2, sea + 8, BZB + 2],
        run: async a => {
          for (let k = 0; k < 6; k++) { a.turn('buoy', [k % 2 ? -0.32 : 0.32, 0, k % 3 ? 0.12 : -0.12], 0.6); a.burst([BX + 0.5, sea + 6, BZB + 0.5], { n: 22, colors: ['#ffe08a', '#fff6c8', '#c8a050'], speed: 5, up: 0.5, life: 0.8, gravity: 0, spread: 0.6, flat: true }); a.burst([BX + 0.5, sea + 1, BZB + 0.5], { n: 10, colors: ['#ffffff', '#d8f0ff'], speed: 2, up: 3, life: 0.7, gravity: 9, spread: 2 }); await a.wait(0.65); }
          await a.turn('buoy', [0, 0, 0], 0.8);
        },
      });
      // ── 그물 기둥: 안벽 끝에서 물속 그물을 끌어올리면 물고기가 펄떡인다 ──
      const NX = 52, NZ = 81, ny = sea + 3, NA = ny + 10;
      w.box(NX - 1, ny, NZ - 5, NX + 1, ny, NZ - 3, B.found); w.box(NX, ny + 1, NZ - 4, NX, NA, NZ - 4, B.post);
      w.box(NX, NA, NZ - 4, NX, NA, NZ, B.post); w.line(NX, NA - 4, NZ - 4, NX, NA - 1, NZ - 1, B.post); w.set(NX, NA + 1, NZ, B.iron);
      w.box(NX - 1, ny, NZ - 6, NX - 1, ny + 1, NZ - 6, B.barrel); w.set(NX + 1, ny, NZ - 6, B.crate);
      const nTop = sea, nLen = NA - 1 - nTop;
      MH.rope(w, 'nrope', NX, NA - 1, NZ, nLen, B.rope);
      const net = w.prop({ name: 'net', pivot: [NX + 0.5, nTop, NZ + 0.5] });
      net.box(NX - 1, sea - 2, NZ - 1, NX + 1, sea - 2, NZ + 1, B.net); net.walls(NX - 1, sea - 1, NZ - 1, NX + 1, sea, NZ + 1, B.net);
      net.set(NX, sea - 1, NZ, B.fish); net.set(NX, sea, NZ, B.fish); net.set(NX - 1, sea + 1, NZ, B.rope); net.set(NX + 1, sea + 1, NZ, B.rope); net.set(NX, sea + 1, NZ, B.iron);
      const nUp = 7;
      acts.push({
        name: '그물 올리기', hint: '안벽 기둥이 물속 그물을 끌어올리자 물고기가 펄떡여요', hit: [NX - 1, ny, NZ - 6, NX + 1, NA + 1, NZ + 1],
        run: async a => {
          a.burst([NX + 0.5, sea + 1, NZ + 0.5], { n: 20, colors: ['#ffffff', '#d8f0ff'], speed: 2, up: 3, life: 0.8, gravity: 9, spread: 1.5 });
          await Promise.all([a.move('net', [0, nUp, 0], 2.4, t => t), a.rope('nrope', nLen, nLen - nUp, 2.4, t => t)]);
          for (let k = 0; k < 6; k++) {
            a.burst([NX + 0.5, sea + nUp + 1, NZ + 0.5], { n: 4, colors: ['#b8c8d0', '#e8f0f8', '#8aa0b0'], speed: 2.5, up: 5, life: 0.9, gravity: 14, spread: 0.8 });
            a.burst([NX + 0.5, sea + nUp - 2, NZ + 0.5], { n: 14, colors: ['#ffffff', '#d8f0ff', '#8ac8f0'], speed: 1.5, up: 0.5, life: 0.8, gravity: 10, spread: 1.2 });
            await a.wait(0.4);
          }
          await Promise.all([a.move('net', [0, 0, 0], 2.2, t => t), a.rope('nrope', nLen, nLen, 2.2, t => t)]);
          a.burst([NX + 0.5, sea + 1, NZ + 0.5], { n: 24, colors: ['#ffffff', '#d8f0ff'], speed: 2.5, up: 3, life: 0.8, gravity: 9, spread: 1.5 });
        },
      });
      // ── 갈매기 떼: 선착장 끝과 시장 지붕에서 한꺼번에 날아오른다 ──
      const gulls = [[57.5, sea + 4, 101], [81.5, sea + 4, 101], [MX + 7.5, mg + 15, MZ + 3.5], [69.5, sea + 4, 79.5]];
      acts.push({
        name: '갈매기 떼', hint: '갈매기들이 끼룩끼룩 울며 한꺼번에 날아올라요', hit: [56, sea + 2, 96, 82, sea + 6, 102],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            for (const p of gulls) a.burst([p[0] + (k % 3 - 1) * 2, p[1], p[2]], { n: 8, colors: ['#ffffff', '#f4f4f0', '#8a8a92'], speed: 5, up: 4, life: 3, gravity: -0.6, spread: 1.5, flat: true });
            await a.wait(0.4);
          }
        },
      });
      // ── 훈제 청어: 굴뚝마다 짙은 연기가 뭉게뭉게 오른다 ──
      // 안개에 덜 묻히도록 바다 쪽(남쪽) 굴뚝 셋
      const smk = chimAll.slice().sort((p, q) => q[2] - p[2]).slice(0, 3);
      acts.push({
        name: '훈제 굴뚝', hint: '청어를 훈제하느라 굴뚝마다 짙은 연기가 뭉게뭉게 올라요', hit: [Math.floor(smk[0][0]) - 1, Math.floor(smk[0][1]) - 4, Math.floor(smk[0][2]) - 1, Math.floor(smk[0][0]) + 2, Math.floor(smk[0][1]), Math.floor(smk[0][2]) + 2],
        run: async a => {
          for (let k = 0; k < 9; k++) { for (const c of smk) a.burst([c[0], c[1], c[2]], { n: 14, colors: ['#d8d4cc', '#b8b4ac', '#9a968e', '#ffd8a0'], speed: 1.2, up: 4, life: 3, gravity: -0.4, spread: 0.8 }); await a.wait(0.4); }
        },
      });
      const smoke = chim.map(c => ({ n: 26, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 0.6, area: [c[0], c[2], 0.6], y0: c[1], y1: c[1] + 18, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
