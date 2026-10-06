// 갈매기 항구 — 언덕 비탈의 마을, 돌 안벽과 부두, 곶 끝의 등대, 서쪽 후미의 조선소 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 112;
  const K = W / 128;
  MAPS.push({
    id: 'harbor', cat: 'village', name: '갈매기 항구', en: 'Gull Harbor', color: '#5ab0d0', seed: 113, base: 22, time: 'day', size: [W, D, Hh],
    desc: '언덕 비탈에 흰 집들이 층층이 들어선 항구. 어부들은 새벽마다 곶의 등대를 보고 바다로 나가고, 서쪽 후미 조선소에서는 새 배가 바다로 미끄러져 나간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '어부와 선원, 배 목수 100여 명'], ['특산물', '훈제 청어 · 구름 진주 · 참나무 어선'], ['소문', '밤마다 등대지기가 바다를 향해 노래한다']] },
    sky: ['#ffc48a', '#4e5c9c', '#ffe0a0'], stars: false,
    hemi: ['#ffe8d0', '#3a4a6a', 0.56], sun: ['#ffd0a0', 0.8, [0.6, 0.8, 0.5]],
    liquid: ['#1f5a80', '#3a86b0', '#eaf8ff'], liqSpeed: 0.9,
    fog: { box: [84, 84, 84, 86], start: 0.8, floor: 12, depth: 10 },
    camY: 4, zoom: 1.05,
    particles: [
      { n: 140, colors: ['#ffffff', '#d8f0ff'], mode: 'drift', speed: 0.5, y0: 24, y1: 60, glow: false },
      { n: 26, colors: ['#ffffff'], mode: 'wisp', speed: 1.4, size: 2, y0: 46, glow: false },
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
      timber: { c: '#b8875a', v: 0.06, pat: 'log' }, rib: { c: '#c89a68', v: 0.05 }, hullN: { c: '#3a7a6a', v: 0.04, pat: 'plank' }, tar: { c: '#1e1a18', v: 0.02 }, ember: { c: '#ff8a3a', glow: true },
      sawdust: { c: '#d8c090', v: 0.08 }, shingle: { c: '#6a7a8a', v: 0.05, pat: 'tile' },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sea = base;
      const coastZ = x => 94.5 + (n.fbm(x * 0.03 / K, 5, 3) - 0.5) * 13;
      const head = (x, z) => MH.segDist(x, z, 137, 87, 148, 131);
      const cove = (x, z) => MH.dist(x, z, 34, 102) < 23.6;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          let k = coastZ(x) - z;                       // 양수면 육지
          const hd = head(x, z);
          if (hd < 10.5) k = Math.max(k, 10.5 - hd);
          const land = base + 2 + Math.max(0, k) * 0.34 / K + n.fbm(x * 0.05 / K, z * 0.05 / K) * 2;
          const t = cove(x, z) ? MH.sstep(-10.5, 10.5, k) : MH.sstep(-1.3, 3.3, k);
          return MH.lerp(sea - 7 + n.fbm(x * 0.08, z * 0.08) * 2, land, t);
        },
        surface: (x, z, y, s) => y <= sea + 1 ? B.sand : s >= 3 ? B.cliff : n.fbm(x * 0.08, z * 0.08, 2) > 0.57 ? B.grass2 : B.grass,
        under: (x, z, y, dep, s) => dep < 2 && s < 3 && y > sea ? B.dirt : (y % 4 === 0 ? B.rockDk : B.cliff),
      });
      const lights = [], acts = [], landmarks = [];
      // ── 돌 안벽: 동서로 곧게, 바다 쪽 끝단은 큰 돌, 계단 둘 ──
      const QZ0 = 97, QZ1 = 104, QX0 = 52, QX1 = 129;
      for (let z = QZ0 - 3; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) MH.setH(w, x, z, sea + 2, z >= QZ1 - 1 ? B.quay : ((x + z) % 5 ? B.cobble : B.quay), B.quay);
      for (let z = QZ1 + 1; z < D; z++) for (let x = 39; x <= 134; x++) if (head(x, z) > 13 && !cove(x, z) && MH.g(w, x, z) > sea - 6) MH.setH(w, x, z, sea - 6, B.sand, B.rockDk);
      MH.water(w, sea);
      for (let x = QX0 + 2; x <= QX1 - 2; x += 6) { w.box(x, sea + 3, QZ1, x, sea + 3, QZ1, B.iron); w.set(x, sea + 4, QZ1, B.rockDk); }
      // 안벽 물 쪽 계단(바다로 내려가는 돌계단)
      for (const sx of [64, 98]) for (let k = 0; k < 3; k++) w.box(sx, sea + 1 - k, QZ1 + 1 + k, sx + 2, sea + 1 - k, QZ1 + 1 + k, B.quay);
      // 나무 선착장 둘(남쪽으로)
      const piers = [[73, 76], [105, 108]];
      for (const [x0, x1] of piers) for (let z = QZ1 + 1; z <= 134; z++) for (let x = x0; x <= x1; x++) {
        w.set(x, sea + 2, z, B.plank);
        if ((x === x0 || x === x1) && z % 4 === 0) { for (let y = MH.g(w, x, z) + 1; y <= sea + 1; y++) w.set(x, y, z, B.post); w.set(x, sea + 3, z, B.post); w.set(x, sea + 4, z, B.post); }
        else if ((x === x0 || x === x1) && z % 2 === 0) w.set(x, sea + 3, z, B.rope);
      }
      for (const [x0, x1] of piers) {
        w.box(x0 + 1, sea + 3, 134, x0 + 1, sea + 6, 134, B.post); w.set(x0 + 1, sea + 7, 134, B.lamp); lights.push({ p: [x0 + 1.5, sea + 7, 134.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
        // 선착장 위 짐: 통·상자·감긴 밧줄
        w.set(x0, sea + 3, 112, B.barrel); w.set(x0, sea + 4, 112, B.barrel); w.set(x0, sea + 3, 113, B.barrel); w.box(x1, sea + 3, 120, x1, sea + 4, 121, B.crate); w.set(x1 - 1, sea + 3, 127, B.rope); w.set(x1, sea + 3, 127, B.rope);
      }
      landmarks.push({ name: '선착장', note: '두 줄로 뻗은 나무 부두', p: [90.5, sea + 13, 121] });

      // ── 배: 흘수선 아래가 물에 잠기게 놓는다 ──
      const SM = { hull: B.hull, keel: B.hullB, deck: B.deck, rail: B.hull, mast: B.mast, sail: B.sail, cargo: B.crate };
      const b1 = w.prop({ name: 'b1', pivot: [88.5, sea + 1, 113.5], axis: 'x', rock: 0.05, rockSpeed: 1.1, bob: 0.2, bobSpeed: 1.3 });
      MH.ship(b1, 82, sea + 1, 113, 13, SM, { mast: 13 });
      const b2 = w.prop({ name: 'b2', pivot: [89.5, sea + 1, 126.5], axis: 'x', rock: 0.06, rockSpeed: 0.9, bob: 0.2, bobSpeed: 1.1, phase: 2 });
      MH.ship(b2, 83, sea + 1, 126, 13, Object.assign({}, SM, { sail: B.stripeR }), { mast: 12 });
      // 출항하는 어선: 동쪽 선착장 바깥에 매여 있다(돛대 끝 깃발 없음)
      const FXs = 120, FZs = 123;
      const fb = w.prop({ name: 'fisher', pivot: [FXs + 0.5, sea + 1, FZs + 0.5], axis: 'x', rock: 0.05, rockSpeed: 1, bob: 0.25, bobSpeed: 1.2, phase: 1 });
      MH.ship(fb, FXs - 7, sea + 1, FZs, 13, Object.assign({}, SM, { sail: B.stripeW, cargo: B.net }), { mast: 13 });
      const route = [[FXs, FZs], [121, 130], [116, 138], [108, 143], [98, 146], [86, 148], [74, 149], [63, 152], [56, 158], [52, 165]];
      MH.routeOK(w, route, 4, '어선 출항 경로');
      const out = route.slice(1).map(p => [p[0] - FXs, 0, p[1] - FZs]).concat([[49 - FXs, 0, 174 - FZs]]);
      acts.push({
        name: '어선 출항', hint: '어선이 뱃머리를 돌려 먼바다로 나가고, 다음 어선이 부두에 들어와요', hit: [FXs - 8, sea, FZs - 3, FXs + 8, sea + 14, FZs + 3],
        run: async a => {
          await a.drive('fisher', out, 10, { fwd: '+x', back: 1.0 });
        },
      });
      // 거룻배(정박)와 부두 기중기: 줄은 늘고 줄어든다
      const BGX = 112, BGZ = 108;
      w.box(BGX, sea, BGZ, BGX + 12, sea, BGZ + 3, B.hullB); w.walls(BGX, sea + 1, BGZ, BGX + 12, sea + 1, BGZ + 3, B.hull);
      w.box(BGX + 1, sea + 1, BGZ + 1, BGX + 3, sea + 1, BGZ + 2, B.crate); w.set(BGX + 9, sea + 1, BGZ + 1, B.barrel); w.set(BGX + 10, sea + 1, BGZ + 2, B.barrel);
      const CX = 119, CZ = 99, cg = sea + 3, ARM = cg + 14;
      w.box(CX - 2, cg, CZ - 2, CX + 2, cg, CZ + 2, B.found); w.box(CX - 1, cg + 1, CZ - 1, CX + 1, cg + 1, CZ + 1, B.found);
      w.box(CX, cg + 2, CZ, CX, ARM, CZ, B.post); w.line(CX - 2, cg + 1, CZ, CX, cg + 7, CZ, B.post); w.line(CX + 2, cg + 1, CZ, CX, cg + 7, CZ, B.post);
      w.box(CX, ARM, CZ - 3, CX, ARM, CZ + 10, B.post); w.line(CX, ARM - 6, CZ, CX, ARM, CZ + 6, B.post); w.box(CX, ARM + 1, CZ + 10, CX, ARM + 1, CZ + 10, B.iron);
      w.box(CX - 1, ARM - 2, CZ - 3, CX + 1, ARM - 1, CZ - 2, B.found); w.set(CX - 1, cg + 2, CZ, B.iron); w.set(CX + 1, cg + 2, CZ, B.iron);
      MH.rope(w, 'crope', CX, ARM - 1, CZ + 10, 4, B.rope);
      const load = w.prop({ name: 'load', pivot: [CX + 0.5, ARM - 6, CZ + 10.5] });
      load.box(CX - 1, ARM - 7, CZ + 9, CX + 1, ARM - 5, CZ + 11, B.crate); load.set(CX, ARM - 5, CZ + 10, B.iron);
      acts.push({
        name: '부두 기중기', hint: '밧줄이 풀려 짐을 거룻배에 내려요', hit: [CX - 1, cg, CZ - 1, CX + 1, ARM + 1, CZ + 11],
        run: async a => {
          const drop = (ARM - 7) - (sea + 2);
          await Promise.all([a.move('load', [0, -drop, 0], 2.4, t => t), a.rope('crope', 4, 4 + drop, 2.4, t => t)]);
          await a.wait(0.9);
          await Promise.all([a.move('load', [0, 0, 0], 2.6, t => t), a.rope('crope', 4, 4, 2.6, t => t)]);
        },
      });
      // ── 곶의 등대 ──
      const LX = 146, LZ = 124, lg = MH.g(w, LX, LZ) + 1;
      MH.flatten(w, LX - 8, LZ - 8, LX + 8, LZ + 8, lg - 1, B.cobble, B.cliff);
      for (let a = 0; a < 40; a++) { const x = Math.round(LX + Math.cos(a * 0.157) * 8), z = Math.round(LZ + Math.sin(a * 0.157) * 8); w.set(x, lg, z, a % 3 ? B.found : B.rockDk); }
      const LH = 34;
      for (let y = lg; y < lg + LH; y++) w.cyl(LX, LZ, y, y, 5 - (y - lg) * 0.045, Math.floor((y - lg) / 5) % 2 ? B.stripeR : B.stripeW);
      w.cyl(LX, LZ, lg, lg + 1, 5.8, B.found); w.ring(LX, LZ, lg + 2, 4.6, 5.4, B.rockDk);
      for (let y = lg + 6; y < lg + LH - 4; y += 7) { w.box(LX, y, LZ + 4, LX, y + 1, LZ + 4, B.win); w.set(LX, y + 2, LZ + 4, B.frame); w.box(LX - 4, y + 3, LZ, LX - 4, y + 4, LZ, B.win); w.set(LX - 4, y + 5, LZ, B.frame); }
      w.box(LX, lg, LZ + 5, LX, lg + 3, LZ + 5, B.door); w.set(LX, lg + 4, LZ + 5, B.frame);
      const T = lg + LH;
      w.ring(LX, LZ, T, 0, 5.8, B.post); w.ring(LX, LZ, T + 1, 4.8, 5.8, B.iron);
      w.cyl(LX, LZ, T + 1, T + 4, 2.6, B.lens); w.cyl(LX, LZ, T + 1, T + 4, 1.4, B.found);
      for (const [dx, dz] of [[2, 2], [-2, 2], [2, -2], [-2, -2], [3, 0], [-3, 0], [0, 3], [0, -3]]) w.box(LX + dx, T + 1, LZ + dz, LX + dx, T + 4, LZ + dz, B.iron);
      w.ring(LX, LZ, T + 5, 0, 3.6, B.post);
      const cap = MH.dome(w, LX, T + 6, LZ, 3.2, B.roofR, null);
      w.box(LX, cap, LZ, LX, cap + 3, LZ, B.iron); w.set(LX, cap + 4, LZ, B.bell);
      const beam = w.prop({ name: 'beam', pivot: [LX + 0.5, T + 2.5, LZ + 0.5], axis: 'y', speed: 0.9 });
      for (let s = 4; s <= 14; s++) { beam.box(LX + s, T + 2, LZ, LX + s, T + 3, LZ, B.beam); beam.box(LX - s, T + 2, LZ, LX - s, T + 3, LZ, B.beam); if (s > 8) { beam.set(LX + s, T + 2, LZ + 1, B.beam); beam.set(LX - s, T + 2, LZ - 1, B.beam); } }
      lights.push({ name: 'light', p: [LX + 0.5, T + 3, LZ + 0.5], c: '#fff0b0', i: 1.8, d: 40, flicker: 0.05 });
      const keeper = MH.houseX(w, { x: LX - 13, z: LZ - 18, sx: 9, sz: 8, fh: 5, face: 's', m: { found: B.found, wall: B.wallW, quoin: B.found, win: B.win, shutter: B.shutter, sill: B.found, flower: B.flower, door: B.door, roof: B.roofR, eave: B.roofDk, chimney: B.found, lamp: B.lamp } });
      acts.push({
        name: '등대', hint: '불빛이 밝아지며 빠르게 돌아요(밤에 더 잘 보여요)', hit: [LX - 6, T - 4, LZ - 6, LX + 6, T + 8, LZ + 6],
        run: async a => {
          a.flash('light', 3, 4.5); a.glow(1.6, 4.5); a.spin('beam', 5, 4.5);
          for (let k = 0; k < 15; k++) {
            for (const j of [0, 1]) { const t = Math.PI * (0.5 + (k * 2 + j) / 30); a.burst([LX + 0.5 + Math.cos(t) * 7, T + 2 + (k % 3), LZ + 0.5 - Math.sin(t) * 7], { n: 8, colors: ['#fff6c8', '#ffe890', '#ffffff'], speed: 2, up: 0.5, life: 0.9, gravity: 0, spread: 0.5, flat: true }); }
            if (k % 3 === 0) a.burst([LX + 0.5, cap + 4, LZ + 0.5], { n: 14, colors: ['#ffe890', '#fff6c8'], speed: 1.5, up: 3, life: 1.2, gravity: -0.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '곶의 등대', note: '돌아가는 불빛이 배를 부른다', p: [LX + 0.5, cap + 8, LZ + 0.5], tag: 'LIGHT' });
      // 등대 문 → 하위 지도(등대 안). 탑 몸통이 꽉 차 있어 돌아오면 문 앞 자갈 위에 선다
      acts.push(OR.goAct({ at: [LX, lg, LZ + 6], h: 4, hit: [LX, lg, LZ + 5, LX, lg + 3, LZ + 6], name: '곶의 등대 안으로', goto: 'harbor-lighthouse', hint: '줄무늬 등대의 문을 열고 나선 계단이 도는 등대 안으로 들어가요' }));

      // ── 생선 시장(기둥 회랑) ──
      const MX = 56, MZ = 84;
      const mg = sea + 3;
      MH.flatten(w, MX - 2, MZ - 2, MX + 22, MZ + 11, mg - 1, B.cobble, B.quay);
      for (let x = MX; x <= MX + 20; x += 5) for (const z of [MZ, MZ + 9]) { w.box(x, mg, z, x, mg + 7, z, B.wallW); w.box(x, mg, z, x, mg, z, B.found); w.set(x, mg + 7, z, B.found); }
      w.walls(MX, mg + 8, MZ, MX + 20, mg + 8, MZ + 9, B.frame);
      for (let x = MX; x <= MX + 20; x++) if (x % 5) for (const z of [MZ, MZ + 9]) w.set(x, mg + 7, z, (x % 5 === 1 || x % 5 === 4) ? B.frame : 0);
      MH.roof(w, MX - 1, MX + 21, MZ - 1, MZ + 10, mg + 9, { b: B.roofB, eave: B.roofDk, ridge: B.stripeW, axis: 'x' });
      for (let x = MX + 2; x <= MX + 17; x += 3) { w.box(x, mg, MZ + 3, x + 1, mg + 1, MZ + 6, B.crate); w.box(x, mg + 2, MZ + 4, x + 1, mg + 2, MZ + 5, B.fish); }
      for (const [bx, bz] of [[MX + 23, MZ + 3], [MX + 23, MZ + 5], [MX + 24, MZ + 4], [MX - 3, MZ + 6]]) { w.set(bx, mg, bz, B.barrel); if (bx === MX + 23) w.set(bx, mg + 1, bz, B.barrel); }
      w.set(MX + 10, mg + 7, MZ + 10, B.lamp); lights.push({ p: [MX + 10.5, mg + 7, MZ + 10.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      landmarks.push({ name: '생선 시장', note: '아침마다 청어 경매', p: [MX + 10.5, mg + 18, MZ + 4.5] });
      // ── 비탈의 집들, 계단 골목, 교회 ──
      const walls = [B.wallW, B.wallB, B.wallW, B.wallY];
      const lanes = [[[39, 6], [45, 47], [58, 74], [64, 95]], [[113, 8], [102, 45], [92, 74], [95, 95]]];
      for (const l of lanes) MH.path(w, l, 2, B.cobble, B.found);
      let k = 0;
      const chim = [], chimAll = [];
      for (let z = 12; z <= 80; z += 15) for (let x = 8; x <= 130; x += 17) {
        const hx = x + w.ri(-2, 2), hz = z + w.ri(-1, 1), sx = w.ri(10, 12), sz = w.ri(8, 10);
        if (coastZ(hx + 5) - (hz + sz) < 7 || head(hx, hz) < 15 || lanes.some(l => MH.polyDist(hx + 5, hz + 4, l) < 9) || (hx > 44 && hx < 84 && hz > 66) || (hx > 64 && hx < 96 && hz < 46 && hz > 20) || (hx < 58 && hz + sz > 56)) continue;
        const h = MH.houseX(w, { x: hx, z: hz, sx, sz, floors: 1 + (k % 3 === 0 ? 1 : 0), fh: 5, face: 's', pitch: 1, dormers: k % 4 === 1 ? 1 : 0, balcony: k % 5 === 3 ? 1 : 0,
          m: { found: B.found, wall: walls[k % 4], frame: k % 2 ? null : B.found, quoin: B.found, win: B.win, shutter: B.shutter, sill: B.found, flower: B.flower, door: B.door, roof: k % 3 === 1 ? B.roofR : B.roofB, eave: B.roofDk, ridge: B.stripeW, chimney: k % 2 ? B.found : null, lamp: B.lamp, rail: B.iron } });
        if (h.chimney && chim.length < 3) chim.push(h.chimney);
        if (h.chimney) chimAll.push(h.chimney);
        if (k % 3 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 1.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
        // 앞마당 낮은 돌담과 화분
        for (let x2 = h.x0 - 1; x2 <= h.x1 + 1; x2++) { const z2 = h.z1 + 3, g = MH.g(w, x2, z2); if (Math.abs(x2 - h.door[0]) <= 1 || g < 0 || w.get(x2, g + 1, z2) || g > h.y + 1) continue; w.set(x2, g + 1, z2, (x2 === h.x0 - 1 || x2 === h.x1 + 1) ? B.found : B.wallW); if (hash3(x2, 3, z2) > 0.7) w.set(x2, g + 2, z2, B.flower); }
        k++;
      }
      const CHX = 73, CHZ = 27;
      const ch = MH.house(w, { x: CHX, z: CHZ, sx: 17, sz: 10, fh: 10, face: 's', pitch: 1, m: { found: B.found, wall: B.wallW, frame: B.found, win: B.win, door: B.door, roof: B.roofB, eave: B.roofDk, ridge: B.stripeW } });
      for (let x = CHX + 2; x <= CHX + 14; x += 4) { w.box(x, ch.y + 1, CHZ + 10, x, ch.y + 7, CHZ + 10, B.found); }
      const st = MH.tower(w, { cx: CHX + 3, cz: CHZ + 4, y0: ch.y, h: 30, r: 3, square: true, m: { wall: B.wallW, band: B.found, win: B.win, roof: B.roofB, eave: B.roofDk, finial: B.bell }, pitch: 3 });
      MH.flatten(w, CHX - 2, CHZ + 11, CHX + 18, CHZ + 16, ch.y, B.cobble, B.found);
      landmarks.push({ name: '언덕 위 마을', note: '푸른 지붕의 흰 집과 종탑', p: [CHX + 3.5, st + 4, CHZ + 4.5] });
      // 교회 문 → 하위 지도(언덕 위 교회 안). 문 안쪽 한 칸을 막아 돌아올 때 바깥 문 앞에 서게 한다
      { const [cx, cy, cz] = ch.door;
        w.box(cx - 1, cy, cz - 1, cx + 2, cy + 4, cz - 1, B.wallW);
        acts.push(OR.goAct({ at: [cx, cy, cz + 1], h: 4, hit: [cx, cy, cz, cx + 1, cy + 3, cz + 1], name: '언덕 위 교회 안으로', goto: 'harbor-chapel', hint: '흰 교회 문을 열고 봉헌 배 모형이 매달린 본당으로 들어가요' })); }
      // ── 모래톱: 건조대, 엎어 둔 거룻배, 바위 ──
      for (const [rx, rz] of [[40, 90], [46, 93]]) { const g = MH.g(w, rx, rz); if (g < sea) continue; w.box(rx, g + 1, rz, rx, g + 6, rz, B.post); w.box(rx + 5, g + 1, rz, rx + 5, g + 6, rz, B.post); w.box(rx, g + 6, rz, rx + 5, g + 6, rz, B.rope); for (let q = 1; q <= 4; q++) { w.set(rx + q, g + 5, rz, B.fish); if (q % 2) w.set(rx + q, g + 4, rz, B.fish); } }
      for (let i = 0; i < 16; i++) { const x = w.ri(4, 40), z = w.ri(110, 160), g = MH.g(w, x, z); if (x > 12 && x < 36) continue; if (g >= sea - 4 && g <= sea + 1) MH.rock(w, x, g, z, w.r(1.5, 3.2), B.rock, null); }
      for (let i = 0; i < 46; i++) {
        const x = w.ri(2, W - 3), z = w.ri(2, 80), g = MH.g(w, x, z);
        if (g < sea + 3 || w.get(x, g + 1, z) || w.get(x, g, z) === B.cobble) continue;
        if (x < 60 && z > 54) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(6, 9), bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 3.2 });
      }
      for (const [lx, lz] of [[66, 100], [92, 100], [126, 101]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.post, glow: B.lamp, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 12, flicker: 0.1, night: true });
      // ── 큰 파도 ──
      acts.push({
        name: '큰 파도', hint: '큰 너울이 밀려와 배들이 크게 출렁이고 안벽에 물보라가 튀어요', hit: [81, sea - 1, 110, 98, sea + 14, 130],
        run: async a => {
          a.spin('b1', 6, 4); a.spin('b2', 6, 4); a.spin('fisher', 5, 4); a.wind(2.5, 4);
          for (let k = 0; k < 8; k++) {
            for (let x = QX0 + 4 + (k % 2) * 7; x <= QX1 - 4; x += 14) if (x < 72 || (x > 77 && x < 104) || x > 109) a.burst([x + 0.5, sea + 1, QZ1 + 1.5], { n: 12, colors: ['#ffffff', '#eaf8ff', '#a8d8f0'], speed: 2.5, up: 6, life: 1, gravity: 12, spread: 1.5 });
            await a.wait(0.5);
          }
        },
      });
      // ── 종 부표 ──
      const BX = 92, BZB = 140;
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
      // ── 그물 기둥 ──
      const NX = 68, NZ = QZ1 + 3, ny = sea + 3, NA = ny + 10;
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
      // ── 갈매기 떼 ──
      const gulls = [[74.5, sea + 4, 133], [106.5, sea + 4, 133], [MX + 10.5, mg + 15, MZ + 4.5], [90.5, sea + 4, 104.5]];
      acts.push({
        name: '갈매기 떼', hint: '갈매기들이 끼룩끼룩 울며 한꺼번에 날아올라요', hit: [73, sea + 2, 126, 108, sea + 6, 134],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            for (const p of gulls) a.burst([p[0] + (k % 3 - 1) * 2, p[1], p[2]], { n: 8, colors: ['#ffffff', '#f4f4f0', '#8a8a92'], speed: 5, up: 4, life: 3, gravity: -0.6, spread: 1.5, flat: true });
            await a.wait(0.4);
          }
        },
      });

      // ══ 새 구역: 서쪽 후미의 조선소 ══
      // 선대(진수대): 뭍에서 물속까지 경사진 널판 길
      const SLX = 24, SLZ0 = 76, SLZ1 = 112;
      const slopeY = z => Math.round(MH.lerp(sea + 3, sea - 3, Math.max(0, Math.min(1, (z - SLZ0 - 10) / (SLZ1 - SLZ0 - 10)))));
      for (let z = SLZ0; z <= SLZ1; z++) {
        const y = slopeY(z);
        for (let x = SLX - 4; x <= SLX + 4; x++) {
          const g = MH.g(w, x, z), edge = Math.abs(x - SLX) === 4;
          if (y >= sea) { MH.setH(w, x, z, y - 1, B.sand, B.sand); w.set(x, y, z, edge ? B.post : (Math.abs(x - SLX) === 2 ? B.timber : B.plank)); }
          else { if (g > y - 1) MH.setH(w, x, z, y - 1, B.sand, B.sand); w.set(x, y, z, Math.abs(x - SLX) === 2 ? B.timber : 0); w.liquid(x, z, sea); for (let yy = y + 1; yy <= sea; yy++) w.set(x, yy, z, 0); }
          if (edge && z % 4 === 0 && y >= sea) w.box(x, y + 1, z, x, y + 2, z, B.post);
        }
      }
      // 진수할 새 배(부품): 선대 위 받침에 올라 있다, 뱃머리가 바다(+z)
      const ny0 = sea + 6, nz0 = SLZ0 + 3, NL = 13;
      for (let z = SLZ0 + 1; z <= SLZ0 + 15; z += 3) for (const x of [SLX - 3, SLX + 3]) w.box(x, slopeY(z) + 1, z, x, ny0 - 3, z, B.timber);
      const nb = w.prop({ name: 'newboat', pivot: [SLX + 0.5, ny0, nz0 + NL / 2], axis: 'z', bob: 0, rock: 0 });
      for (let s = 0; s < NL; s++) {
        const t = s / (NL - 1), hw = Math.max(0, Math.round(2.4 * Math.sin(Math.PI * Math.min(1, t * 1.5 + 0.15))));
        for (let q = -hw; q <= hw; q++) {
          nb.set(SLX + q, ny0 - 1, nz0 + s, B.hullB);
          nb.set(SLX + q, ny0, nz0 + s, Math.abs(q) === hw ? B.hullN : B.deck);
          if (Math.abs(q) === hw) { nb.set(SLX + q, ny0 + 1, nz0 + s, B.hullN); nb.set(SLX + q, ny0 + 2, nz0 + s, B.stripeW); }
        }
        nb.set(SLX, ny0 - 2, nz0 + s, B.post);
      }
      nb.set(SLX, ny0 + 1, nz0 + NL, B.hullN); nb.set(SLX, ny0 + 2, nz0 + NL + 1, B.hullN);
      nb.box(SLX, ny0 + 1, nz0 + 7, SLX, ny0 + 10, nz0 + 7, B.mast); nb.box(SLX - 3, ny0 + 9, nz0 + 7, SLX + 3, ny0 + 9, nz0 + 7, B.mast);
      nb.box(SLX - 1, ny0 + 1, nz0 + 2, SLX + 1, ny0 + 2, nz0 + 3, B.crate); nb.set(SLX, ny0 + 3, nz0 + 2, B.barrel);
      MH.routeOK(w, [[SLX, nz0 + 30], [SLX, D - 1]], 3, '진수 경로');
      const dLaunch = 46, yLaunch = sea + 1 - ny0;
      acts.push({
        name: '진수식', hint: '받침목이 빠지고 새 배가 선대를 미끄러져 바다로 나아가요', hit: [SLX - 4, ny0 - 2, nz0, SLX + 4, ny0 + 10, nz0 + NL + 1],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([SLX + 0.5, ny0 + 4, nz0 + 6], { n: 30, colors: ['#ffd8e8', '#fff080', '#ffffff', '#a8d8f0'], speed: 5, up: 6, life: 1.6, gravity: 5, spread: 2 }); await a.wait(0.4); }
          await a.tween('newboat', { off: [0, yLaunch, 22], rot: [0.06, 0, 0] }, 2.6, t => t * t);
          for (let k = 0; k < 3; k++) { a.burst([SLX + 0.5, sea + 1, nz0 + 26 + k], { n: 30, colors: ['#ffffff', '#eaf8ff', '#a8d8f0'], speed: 4, up: 6, life: 1.1, gravity: 10, spread: 3 }); await a.wait(0.2); }
          await a.tween('newboat', { rot: [0, 0, 0] }, 0.4);
          await a.drive('newboat', [[0, yLaunch, dLaunch], [0, yLaunch, D + 24 - nz0]], 5, { fwd: '+z', back: 1.0 });
        },
      });
      // 짓고 있는 배의 뼈대: 용골과 늑골, 비계
      const RX0 = 36, RZ0 = 70, RL = 16, rg = Math.max(MH.g(w, RX0 + 8, RZ0), sea + 1);
      MH.flatten(w, RX0 - 4, RZ0 - 5, RX0 + RL + 4, RZ0 + 5, rg, B.sand, B.sand);
      for (let x = RX0; x <= RX0 + RL; x += 4) w.box(x, rg + 1, RZ0 - 1, x, rg + 1, RZ0 + 1, B.timber);
      w.box(RX0, rg + 2, RZ0, RX0 + RL, rg + 2, RZ0, B.timber); w.box(RX0 + RL + 1, rg + 3, RZ0, RX0 + RL + 1, rg + 8, RZ0, B.timber); w.box(RX0 - 1, rg + 3, RZ0, RX0 - 1, rg + 7, RZ0, B.timber);
      for (let x = RX0 + 1; x <= RX0 + RL; x += 2) {
        const t = (x - RX0) / RL, R = 3.6 * Math.sin(Math.PI * Math.min(1, t * 1.3 + 0.1)) + 0.6;
        for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.12) { const dz = Math.round(Math.sin(a) * R), dy = Math.round(-Math.cos(a) * R * 1.3) + Math.round(R * 1.3); w.set(x, rg + 2 + dy, RZ0 + dz, B.rib); }
        if (x < RX0 + 9) for (const sd of [-1, 1]) for (let dy = 0; dy <= 2; dy++) w.set(x, rg + 3 + dy, RZ0 + sd * Math.round(R * 0.95), B.hullN);
      }
      for (const z of [RZ0 - 5, RZ0 + 5]) { for (let x = RX0; x <= RX0 + RL; x += 5) w.box(x, rg + 1, z, x, rg + 8, z, B.post); w.box(RX0, rg + 6, z, RX0 + RL, rg + 6, z, B.plank); }
      for (let x = RX0 - 2; x <= RX0 + RL + 2; x++) for (let z = RZ0 - 6; z <= RZ0 + 6; z++) if (hash3(x, 7, z) > 0.86 && !w.get(x, rg + 1, z)) w.set(x, rg + 1, z, B.sawdust);
      // 목재 더미와 톱질 모탕
      for (let q = 0; q < 3; q++) w.box(RX0 + 2, rg + 1 + q, RZ0 + 8 + q % 2, RX0 + 11 - q, rg + 1 + q, RZ0 + 9 + q % 2, B.timber);
      for (const x of [RX0 + 14, RX0 + 17]) { w.set(x, rg + 1, RZ0 + 8, B.post); w.set(x, rg + 1, RZ0 + 10, B.post); w.box(x, rg + 2, RZ0 + 8, x, rg + 2, RZ0 + 10, B.plank); }
      w.box(RX0 + 13, rg + 3, RZ0 + 9, RX0 + 18, rg + 3, RZ0 + 9, B.timber);
      landmarks.push({ name: '서쪽 조선소', note: '참나무 어선을 짓는 배 목수들의 작업장', p: [RX0 + 8, rg + 16, RZ0], tag: 'YARD' });
      // 배 목수 작업장(널빤지 헛간)과 타르 솥
      const shed = MH.houseX(w, { x: 8, z: 62, sx: 12, sz: 9, fh: 6, face: 'e', pitch: 1, m: { found: B.found, wall: B.plank, frame: B.post, win: B.win, shutter: B.shutter, door: B.door, roof: B.shingle, eave: B.roofDk, ridge: B.post, chimney: B.found, lamp: B.lamp } });
      lights.push({ p: [shed.door[0] + 1.5, shed.door[1] + 3, shed.door[2] + 0.5], c: '#ffd890', i: 0.9, d: 11, flicker: 0.1, night: true });
      const TX = 15, TZ = 84, tg = Math.max(MH.g(w, TX, TZ), sea + 1);
      MH.flatten(w, TX - 3, TZ - 3, TX + 3, TZ + 3, tg, B.sand, B.sand);
      w.ring(TX, TZ, tg + 1, 1.6, 2.6, B.rockDk); w.set(TX, tg + 1, TZ, B.ember); w.set(TX + 1, tg + 1, TZ, B.ember);
      w.cyl(TX, TZ, tg + 2, tg + 3, 1.6, B.iron); w.cyl(TX, TZ, tg + 3, tg + 3, 0.9, B.tar);
      for (const dx of [-2, 2]) w.box(TX + dx, tg + 1, TZ, TX + dx, tg + 6, TZ, B.post); w.box(TX - 2, tg + 6, TZ, TX + 2, tg + 6, TZ, B.post);
      const lid = w.prop({ name: 'tarlid', pivot: [TX + 0.5, tg + 4, TZ + 0.5] });
      lid.cyl(TX, TZ, tg + 4, tg + 4, 1.6, B.iron); lid.set(TX, tg + 5, TZ, B.post);
      lights.push({ name: 'tar', p: [TX + 0.5, tg + 2, TZ + 0.5], c: '#ff8a3a', i: 0.5, d: 10, flicker: 0.3 });
      acts.push({
        name: '타르 솥', hint: '솥뚜껑이 들썩이며 끓는 타르에서 검은 연기와 불티가 솟아요', hit: [TX - 2, tg + 1, TZ - 2, TX + 2, tg + 6, TZ + 2],
        run: async a => {
          a.flash('tar', 4, 4);
          for (let k = 0; k < 6; k++) {
            await a.tween('tarlid', { off: [0, 1.5, 0], rot: [k % 2 ? 0.3 : -0.3, 0, 0.2] }, 0.25);
            a.burst([TX + 0.5, tg + 5, TZ + 0.5], { n: 22, colors: ['#2a2420', '#4a423a', '#6a625a'], speed: 1.2, up: 5, life: 2.6, gravity: -0.6, spread: 0.8 });
            a.burst([TX + 0.5, tg + 4, TZ + 0.5], { n: 10, colors: ['#ff8a3a', '#ffd070'], speed: 2.5, up: 4, life: 0.8, gravity: 6, spread: 0.6 });
            await a.tween('tarlid', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.25);
            await a.wait(0.2);
          }
        },
      });

      // 바닷가 풀과 꽃
      MH.scatter(w, 1600, (x, g, z, b) => { if ((b === B.grass || b === B.grass2) && w.chance(0.12)) w.set(x, g + 1, z, w.chance(0.75) ? B.leaf2 : B.flower); });
      // ── 훈제 청어 ──
      const smk = chimAll.slice().sort((p, q) => q[2] - p[2]).slice(0, 3);
      acts.push({
        name: '훈제 굴뚝', hint: '청어를 훈제하느라 굴뚝마다 짙은 연기가 뭉게뭉게 올라요', hit: [Math.floor(smk[0][0]) - 1, Math.floor(smk[0][1]) - 4, Math.floor(smk[0][2]) - 1, Math.floor(smk[0][0]) + 2, Math.floor(smk[0][1]), Math.floor(smk[0][2]) + 2],
        run: async a => {
          for (let k = 0; k < 9; k++) { for (const c of smk) a.burst([c[0], c[1], c[2]], { n: 14, colors: ['#d8d4cc', '#b8b4ac', '#9a968e', '#ffd8a0'], speed: 1.2, up: 4, life: 3, gravity: -0.4, spread: 0.8 }); await a.wait(0.4); }
        },
      });
      const smoke = chim.concat(shed.chimney ? [shed.chimney] : []).map(c => ({ n: 26, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 0.6, area: [c[0], c[2], 0.6], y0: c[1], y1: c[1] + 18, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
