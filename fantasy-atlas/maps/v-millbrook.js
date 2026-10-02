// 물레방아 마을 — 두 언덕 사이 강 계곡, 보와 물레방앗간, 언덕 위 풍차 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'millbrook', cat: 'village', name: '물레방아 마을', en: 'Millbrook', color: '#8fc46a', seed: 101, base: 22, time: 'day',
    desc: '강물이 물레방아를 돌리는 평화로운 마을. 장날이면 이웃 마을 사람들까지 밀가루를 사러 온다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '농부와 방앗간지기 120여 명'], ['특산물', '고운 밀가루 · 사과주'], ['소문', '강 상류에서 물의 정령을 봤다는 이야기']] },
    sky: ['#d6eef8', '#5c9ad6', '#fff4d2'], stars: false,
    hemi: ['#ffffff', '#5a6a40', 0.54], sun: ['#fff2d8', 0.74, [0.5, 1, 0.4]],
    liquid: ['#2a6a9a', '#4a9ad0', '#e0f6ff'], liqSpeed: 1,
    fog: { start: 0.78, floor: 12, depth: 10 },
    particles: [
      { n: 90, colors: ['#ffffff', '#fff4a0'], mode: 'drift', speed: 0.3, y0: 26, y1: 60, glow: false },
      { n: 26, colors: ['#ffd0e8', '#fff080'], mode: 'wisp', speed: 1, size: 2, y0: 26, glow: false },
    ],
    blocks: {
      grass: { c: '#6b4a30', top: '#6fae4a', v: 0.08 }, grass2: { c: '#6b4a30', top: '#86bc52', v: 0.08 }, grass3: { c: '#6b4a30', top: '#5a9a40', v: 0.08 },
      dirt: { c: '#6b4a30', v: 0.08 }, rock: { c: '#7a7a80', v: 0.06, pat: 'stone' }, rockDk: { c: '#5a5a62', v: 0.06, pat: 'stone' },
      path: { c: '#6b4a30', top: '#c8b48a', v: 0.1 }, cobble: { c: '#8a8680', top: '#a8a49a', v: 0.1, pat: 'stone' }, soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 },
      plaster: { c: '#efe4c8', v: 0.03 }, plaster2: { c: '#e8d8c0', v: 0.03 }, frame: { c: '#5a3a24', v: 0.05 }, thatch: { c: '#c8a050', v: 0.08, pat: 'tile' },
      tile: { c: '#b04a3a', v: 0.06, pat: 'tile' }, tileDk: { c: '#7a3028', v: 0.05 }, found: { c: '#8a8a88', v: 0.06, pat: 'stone' },
      door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, shutter: { c: '#3a6a4a', v: 0.03 }, shutter2: { c: '#8a3a2a', v: 0.03 },
      win: { c: '#ffd890', night: true, day: '#9ad4f0' }, lamp: { c: '#ffe6a8', night: true, day: '#d8d0b0' },
      wheat: { c: '#d8b84a', v: 0.1 }, cabbage: { c: '#5aa040', v: 0.1 }, lavender: { c: '#8a6ac8', v: 0.08 }, hay: { c: '#dcb456', v: 0.08 },
      plank: { c: '#9a6a40', v: 0.08, pat: 'plank' }, wood: { c: '#6a4428', v: 0.05 }, bark: { c: '#5a3a24', v: 0.06 }, birch: { c: '#e8e4d8', v: 0.05 },
      leaf: { c: '#4a8a3a', v: 0.1 }, leaf2: { c: '#6aaa48', v: 0.1 }, leafDk: { c: '#3a6a30', v: 0.08 }, apple: { c: '#d8403a', v: 0.05 },
      hedge: { c: '#3e7a36', v: 0.1 }, flower: { c: '#e86a8a', v: 0.06 }, flower2: { c: '#f0e060', v: 0.06 }, flower3: { c: '#ffffff', v: 0.03 },
      sail: { c: '#f0ead8', v: 0.03 }, iron: { c: '#4a4a52', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 }, barnR: { c: '#a83a2a', v: 0.05, pat: 'plank' }, sign: { c: '#d8a83a', v: 0.04 },
      foam2: { c: '#a8d8f0', v: 0.06 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const rX = z => 66 + Math.sin(z * 0.05) * 7;
      const UPL = base;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const d = Math.abs(x - rX(z));
          let hh = Math.pow(d, 1.1) * 0.1 + Math.max(0, 18 - MH.dist(x, z, 24, 56) * 0.5) + Math.max(0, 10 - MH.dist(x, z, 116, 24) * 0.4);
          hh += 2.5 * Math.max(0, Math.min(1, (72 - z) / 24));
          return base + hh + n.fbm(x * 0.04, z * 0.04) * 3;
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : (() => { const f = n.fbm(x * 0.11 + 7, z * 0.11, 2); return f > 0.6 ? B.grass2 : f < 0.38 ? B.grass3 : B.grass; })(),
        under: (x, z, y, dep, s) => dep < 3 && s < 3 ? B.dirt : B.rock,
      });
      const lights = [], acts = [], landmarks = [];
      const riv = [];
      for (let z = -4; z <= 132; z += 4) riv.push([rX(z), z]);
      MH.river(w, riv, 5.4, UPL, B.rockDk, B.path);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;

      // ── 물레방앗간(동쪽 강변)과 물레방아 ──
      const mz = 40, mrx = Math.round(rX(mz));
      const millX = mrx + 9;
      const my = MH.maxG(w, millX - 1, mz - 8, millX + 15, mz + 8) + 1;
      MH.flatten(w, millX - 2, mz - 9, millX + 17, mz + 9, my - 1, B.cobble, B.rock);
      const mm = { found: B.found, wall: B.plaster, frame: B.frame, quoin: B.found, win: B.win, shutter: B.shutter, sill: B.wood, door: B.door, roof: B.thatch, eave: B.tileDk, ridge: B.frame, chimney: B.found, lamp: B.lamp, flower: B.flower };
      const mill = MH.houseX(w, { x: millX, z: mz - 7, sx: 14, sz: 13, floors: 2, fh: 6, face: 'e', studs: true, pitch: 1, dormers: 2, y: my - 1, m: mm });
      lights.push({ p: [millX + 15, my + 4, mz], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      // 물레방아: 강 한가운데 바퀴 아랫부분만 물에 잠기고, 굴대가 방앗간 벽까지 이어진다
      const WR = 8, wy = UPL + WR - 1, wx = mrx + 2;
      w.box(wx + 3, wy, mz, millX, wy, mz, B.wood);
      for (const dz of [-1, 1]) w.box(millX - 2, my - 1, mz + dz * 2, millX - 2, wy - 1, mz + dz * 2, B.wood);
      const wheel = w.prop({ name: 'wheel', pivot: [wx, wy + 0.5, mz + 0.5], axis: 'x', speed: -0.7 });
      for (let dy = -WR - 1; dy <= WR + 1; dy++) for (let dz = -WR - 1; dz <= WR + 1; dz++) {
        const r = Math.hypot(dy, dz);
        if (r > WR + 0.4) continue;
        const rim = r > WR - 1.2, spoke = (dy === 0 || dz === 0 || Math.abs(dy) === Math.abs(dz)) && r > 1;
        if (rim || spoke || r < 1.5) for (const x of [wx - 1, wx, wx + 1]) { if (spoke && !rim && x === wx) continue; wheel.set(x, wy + dy, mz + dz, r < 1.5 ? B.iron : rim ? B.plank : B.wood); }
      }
      for (let a = 0; a < 16; a++) { const ang = a / 16 * Math.PI * 2; for (const x of [wx - 1, wx, wx + 1]) wheel.set(x, wy + Math.round(Math.sin(ang) * (WR + 1)), mz + Math.round(Math.cos(ang) * (WR + 1)), B.wood); }
      wheel.box(wx - 2, wy, mz, wx + 2, wy, mz, B.iron);
      acts.push({
        name: '물레방아', hint: '물살이 세지며 물레방아가 빠르게 돌아요', hit: [wx - 2, wy - WR - 1, mz - WR - 1, wx + 2, wy + WR + 1, mz + WR + 1],
        run: async a => {
          a.spin('wheel', 4, 4.5);
          for (let k = 0; k < 7; k++) { a.burst([wx, UPL + 1, mz + 0.5], { n: 26, colors: ['#ffffff', '#d8f0ff', '#8ac8f0'], speed: 4, up: 4, life: 1, gravity: 9, spread: 4 }); await a.wait(0.6); }
        },
      });
      landmarks.push({ name: '물레방앗간', note: '강물이 돌리는 큰 바퀴', p: [millX + 7, mill.peak + 7, mz], tag: 'MILL' });

      // ── 아치 돌다리 ──
      const bz = 88, brx = rX(bz), by = Math.max(MH.g(w, Math.round(brx - 12), bz), MH.g(w, Math.round(brx + 12), bz)) + 1;
      MH.bridge(w, [brx - 12, bz], [brx + 12, bz], by, { width: 5, rise: 3, arch: true, archH: 6, m: { deck: B.cobble, parapet: B.rock, arch: B.rockDk, cap: B.found } });
      landmarks.push({ name: '아치 돌다리', note: '마을과 밀밭을 잇는 다리', p: [brx, by + 10, bz + 0.5] });
      // ── 마을: 동쪽 강변의 골목과 집 ──
      const lane = [[brx + 13, bz + 1], [96, 86], [102, 70], [98, 52], [millX + 8, mz + 10]];
      MH.path(w, lane, 2, B.cobble, B.path);
      MH.path(w, [[brx - 13, bz], [40, 86], [26, 78], [24, 64]], 1.6, B.path);
      const hm = k => ({ found: B.found, wall: k % 2 ? B.plaster2 : B.plaster, frame: B.frame, quoin: k % 3 === 0 ? B.found : null, win: B.win, shutter: k % 2 ? B.shutter : B.shutter2, sill: B.wood, flower: B.flower, door: B.door,
        roof: k % 2 ? B.thatch : B.tile, eave: B.tileDk, ridge: B.frame, chimney: k % 2 ? B.found : null, lamp: B.lamp });
      const houses = [[82, 96, 11, 9, 'n'], [115, 93, 10, 9, 'w'], [110, 76, 10, 11, 'w'], [84, 62, 11, 9, 'e'], [108, 56, 11, 9, 'w'], [86, 110, 10, 9, 'n'], [102, 110, 11, 9, 'n']];
      const smokes = [];
      houses.forEach(([x, z, sx, sz, face], k) => {
        const h = MH.houseX(w, { x, z, sx, sz, floors: k % 3 === 0 ? 1 : 2, fh: 6, face, jetty: k % 2 === 1, studs: true, dormers: k % 3 === 1 ? 1 : 0, m: hm(k) });
        if (h.chimney && smokes.length < 2) smokes.push(h.chimney);
        if (k % 2 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      });
      // 여관(삼층, 간판)
      const inn = MH.houseX(w, { x: 88, z: 74, sx: 13, sz: 9, floors: 3, fh: 6, face: 's', jetty: true, studs: true, balcony: 2, dormers: 2, m: hm(1) });
      w.box(94, inn.y + 5, 84, 94, inn.y + 5, 86, B.wood); w.box(94, inn.y + 3, 86, 94, inn.y + 4, 86, B.sign);
      lights.push({ p: [inn.door[0] + 0.5, inn.door[1] + 3, inn.door[2] + 1.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      // 광장과 우물: 두레박과 밧줄은 부품
      const SX = 98, SZ = 88, sg = MH.g(w, SX, SZ);
      for (let z = SZ - 7; z <= SZ + 7; z++) for (let x = SX - 7; x <= SX + 7; x++) if (MH.dist(x, z, SX, SZ) < 7.5 && !w.get(x, MH.g(w, x, z) + 2, z)) MH.setH(w, x, z, sg, B.cobble, B.rock);
      w.ring(SX, SZ, sg + 1, 1.6, 3, B.found); w.ring(SX, SZ, sg + 2, 1.6, 3, B.found);
      w.cyl(SX, SZ, sg - 9, sg, 1.6, 0);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { w.set(SX + dx, sg - 10, SZ + dz, B.rockDk); w.hm[SX + dx + W * (SZ + dz)] = sg - 10; w.liquid(SX + dx, SZ + dz, sg - 8); }
      for (const px of [SX - 3, SX + 3]) w.box(px, sg + 3, SZ, px, sg + 8, SZ, B.wood);
      w.box(SX - 3, sg + 8, SZ, SX + 3, sg + 8, SZ, B.wood); w.box(SX - 1, sg + 8, SZ, SX + 1, sg + 8, SZ, B.iron);
      MH.roof(w, SX - 4, SX + 4, SZ - 2, SZ + 2, sg + 9, { b: B.tile, eave: B.tileDk, axis: 'x' });
      MH.rope(w, 'wrope', SX, sg + 7, SZ, 3, B.rope);
      const bucket = w.prop({ name: 'bucket', pivot: [SX + 0.5, sg + 4, SZ + 0.5] });
      bucket.box(SX - 1, sg + 3, SZ - 1, SX + 1, sg + 4, SZ + 1, B.wood); bucket.walls(SX - 1, sg + 4, SZ - 1, SX + 1, sg + 4, SZ + 1, B.iron); bucket.set(SX, sg + 4, SZ, B.water || B.wood);
      // 물통: 길어 올린 물을 우물 남쪽 나무 물통에 붓는다
      w.box(SX - 2, sg + 1, SZ + 4, SX + 2, sg + 2, SZ + 6, B.wood); w.box(SX - 1, sg + 2, SZ + 5, SX + 1, sg + 2, SZ + 5, B.water || B.foam2);
      acts.push({
        name: '우물 두레박', hint: '두레박이 물을 길어 올려 물통에 부어요', hit: [SX - 3, sg + 1, SZ - 3, SX + 3, sg + 9, SZ + 7],
        run: async a => {
          await Promise.all([a.move('bucket', [0, -8, 0], 1.1, t => t), a.rope('wrope', 3, 11, 1.1, t => t)]);
          a.burst([SX + 0.5, sg - 5, SZ + 0.5], { n: 18, colors: ['#e0f6ff', '#8ac8f0'], speed: 2, up: 3, life: 0.8, gravity: 7, spread: 1 });
          await a.wait(0.4);
          await Promise.all([a.move('bucket', [0, 0, 0], 1.3, t => t), a.rope('wrope', 3, 3, 1.3, t => t)]);
          // 밧줄에서 내려 물통 위로 옮겨 기울여 붓고 제자리로
          await a.move('bucket', [0, 1, 4], 0.9);
          await a.turn('bucket', [0.9, 0, 0], 0.6);
          for (let k = 0; k < 4; k++) { a.burst([SX + 0.5, sg + 4, SZ + 5.5], { n: 22, colors: ['#e0f6ff', '#8ac8f0', '#ffffff'], speed: 2, up: 1, life: 0.8, gravity: 9, spread: 1.2 }); await a.wait(0.35); }
          await a.turn('bucket', [0, 0, 0], 0.6);
          await a.move('bucket', [0, 0, 0], 0.9);
        },
      });
      MH.tree(w, SX + 6, sg + 1, SZ - 6, { kind: 'oak', h: 11, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 4.6, trunkR: 1.3 });
      for (const [lx, lz] of [[SX - 6, SZ + 5], [SX + 5, SZ + 6]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 12, flicker: 0.05, night: true });
      landmarks.push({ name: '우물 광장', note: '장날이면 노점이 선다', p: [SX + 0.5, sg + 16, SZ + 0.5] });

      // ── 서쪽 언덕: 풍차 ──
      const WX = 24, WZ = 56, wg = MH.g(w, WX, WZ) + 1;
      MH.flatten(w, WX - 7, WZ - 7, WX + 7, WZ + 8, wg - 1, B.path, B.dirt);
      // 풍차 터 둘레를 완만한 풀 언덕으로 메우고, 마을 길을 터까지 다시 잇는다
      MH.skirt(w, WX - 7, WZ - 7, WX + 7, WZ + 8, wg - 1, { R: 10, rate: 0.95, noise: (x, z) => n.fbm(x * 0.2, z * 0.2 + 5, 2) * 1.6 - 0.4, surf: (x, z) => n.fbm(x * 0.11 + 7, z * 0.11, 2) > 0.6 ? B.grass2 : B.grass, fill: B.dirt });
      MH.path(w, [[26, 78], [24, 64]], 1.6, B.path);
      for (let y = wg; y < wg + 22; y++) w.cyl(WX, WZ, y, y, 5 - (y - wg) * 0.09, (y - wg) % 6 === 5 ? B.frame : B.plaster);
      w.cyl(WX, WZ, wg, wg + 1, 5.6, B.found);
      for (let y = wg + 4; y < wg + 20; y += 6) { w.box(WX + 4, y, WZ, WX + 4, y + 1, WZ, B.win); w.box(WX - 4, y, WZ, WX - 4, y + 1, WZ, B.win); w.box(WX, y, WZ - 4, WX, y + 1, WZ - 4, B.win); }
      w.box(WX, wg, WZ + 5, WX, wg + 3, WZ + 5, B.door); w.set(WX - 1, wg + 3, WZ + 6, B.lamp);
      lights.push({ p: [WX - 0.5, wg + 3, WZ + 6.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      w.ring(WX, WZ, wg + 9, 4.2, 6.2, B.plank); for (let a = 0; a < 12; a++) w.set(Math.round(WX + Math.cos(a * 0.52) * 6), wg + 10, Math.round(WZ + Math.sin(a * 0.52) * 6), B.wood);
      const cap = MH.cone(w, WX, WZ, wg + 22, 4.6, B.thatch, 0.42, B.tileDk);
      const hy = wg + 19;
      w.box(WX, hy, WZ + 3, WX, hy, WZ + 6, B.wood);
      const blades = w.prop({ name: 'blades', pivot: [WX + 0.5, hy + 0.5, WZ + 7.5], axis: 'z', speed: 0.5 });
      for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) for (let s = 1; s <= 14; s++) {
        blades.set(WX + dx * s, hy + dy * s, WZ + 7, B.wood);
        if (s >= 3) for (let q = 1; q <= 4; q++) blades.set(WX + dx * s - dy * q, hy + dy * s + dx * q, WZ + 7, (s % 3 === 0 || q === 4) ? B.wood : B.sail);
      }
      blades.box(WX - 1, hy - 1, WZ + 7, WX + 1, hy + 1, WZ + 7, B.iron); blades.set(WX, hy, WZ + 8, B.iron);
      acts.push({
        name: '풍차', hint: '바람을 받아 날개가 힘차게 돌아요', hit: [WX - 14, hy - 14, WZ + 6, WX + 14, hy + 14, WZ + 8],
        run: async a => { a.spin('blades', 6, 4.5); for (let k = 0; k < 5; k++) { a.burst([WX + 0.5, hy, WZ + 8], { n: 14, colors: ['#fff4d0', '#e8d8a0'], speed: 11, up: 1, life: 1.2, gravity: 0, spread: 8, flat: true }); await a.wait(0.8); } },
      });
      landmarks.push({ name: '풍차 언덕', note: '밀밭을 내려다보는 풍차', p: [WX + 0.5, cap + 6, WZ + 0.5] });
      // ── 조각보 밭, 산울타리, 붉은 헛간 ──
      const crops = [B.wheat, B.cabbage, B.lavender, B.wheat];
      const westPath = [[brx - 13, bz], [40, 86], [26, 78], [24, 64]];
      for (let fz = 72; fz < 120; fz += 13) for (let fx = 6; fx < 50; fx += 15) {
        const crop = crops[((fx / 15) + (fz / 13)) % 4 | 0];
        for (let z = fz; z < fz + 10; z++) for (let x = fx; x < fx + 12; x++) {
          const g = MH.g(w, x, z);
          if (g < base || wet(x, z) || MH.polyDist(x, z, westPath) < 3) continue;
          w.set(x, g, z, B.soil);
          if ((z - fz) % 2 === 0) { w.set(x, g + 1, z, crop); if (crop === B.wheat && hash3(x, 2, z) > 0.5) w.set(x, g + 2, z, crop); }
        }
        for (let x = fx - 1; x <= fx + 12; x++) for (const z of [fz - 1, fz + 10]) { const g = MH.g(w, x, z); if (g > 0 && !w.get(x, g + 1, z) && MH.polyDist(x, z, westPath) > 3) { w.set(x, g + 1, z, B.hedge); if (hash3(x, 1, z) > 0.5) w.set(x, g + 2, z, B.hedge); } }
      }
      MH.house(w, { x: 38, z: 96, sx: 12, sz: 9, fh: 8, face: 'e', m: { found: B.found, wall: B.barnR, frame: B.sail, door: B.sail, roof: B.tile, eave: B.tileDk, ridge: B.sail } });
      for (const [hx, hz] of [[34, 108], [36, 111], [52, 100]]) { const g = MH.g(w, hx, hz); w.box(hx, g + 1, hz, hx + 2, g + 2, hz + 1, B.hay); w.box(hx, g + 3, hz, hx + 1, g + 3, hz + 1, B.hay); }
      // ── 숲, 과수, 들꽃 ──
      for (let i = 0; i < 70; i++) {
        const x = w.ri(2, 125), z = w.ri(2, 125), g = MH.g(w, x, z), gb = w.get(x, g, z);
        if (g < base || wet(x, z) || w.get(x, g + 1, z) || gb === B.soil || gb === B.cobble || gb === B.path) continue;
        if ((x > 76 && z > 46) || (x < 56 && z > 66) || MH.dist(x, z, WX, WZ) < 16 || MH.dist(x, z, millX + 7, mz) < 18 || Math.abs(x - rX(z)) < 8) continue;
        if (z < 40) MH.tree(w, x, g + 1, z, { kind: 'pine', h: w.ri(13, 20), bark: B.bark, leaves: [B.leaf, B.leafDk, B.leafDk], r: 4 });
        else MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 10), bark: i % 4 === 0 ? B.birch : B.bark, barkDk: i % 4 === 0 ? B.frame : null, leaves: [B.leaf2, B.leaf, B.leafDk, i % 5 === 0 ? B.apple : null], r: w.r(3.2, 4.4) });
      }
      MH.scatter(w, 1600, (x, g, z, b) => { if ((b === B.grass || b === B.grass2 || b === B.grass3) && w.chance(0.18)) w.set(x, g + 1, z, w.chance(0.7) ? B.grass3 : w.pick([B.flower, B.flower2, B.flower3])); });

      // ── 방앗간 박공의 자루 도르래: 다락에서 밀가루 자루를 내린다 ──
      const HX = millX + 17, HZ = mz - 4, HY = my + 13;
      w.box(millX + 14, HY + 1, HZ, HX, HY + 1, HZ, B.wood); w.line(millX + 14, HY - 3, HZ, millX + 16, HY, HZ, B.wood); w.set(HX, HY, HZ, B.iron);
      w.box(HX - 1, my, HZ - 1, HX, my, HZ + 1, B.plank);
      MH.rope(w, 'srope', HX, HY - 1, HZ, 2, B.rope);
      const sack = w.prop({ name: 'sack', pivot: [HX + 0.5, HY - 3, HZ + 0.5] });
      sack.box(HX - 1, HY - 6, HZ - 1, HX, HY - 4, HZ + 1, B.sail); sack.box(HX - 1, HY - 3, HZ, HX, HY - 3, HZ, B.rope);
      const sDrop = (HY - 6) - (my + 1);
      acts.push({
        name: '자루 도르래', hint: '방앗간 다락에서 밀가루 자루가 내려와요', hit: [millX + 14, my + 1, HZ - 1, HX, HY + 1, HZ + 1],
        run: async a => {
          await Promise.all([a.move('sack', [0, -sDrop, 0], 2.2, t => t), a.rope('srope', 2, 2 + sDrop, 2.2, t => t)]);
          for (let k = 0; k < 3; k++) { a.burst([HX, my + 2, HZ + 0.5], { n: 30, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], speed: 3, up: 2, life: 1.4, gravity: 1, spread: 1.5 }); await a.wait(0.35); }
          await a.wait(0.6);
          await Promise.all([a.move('sack', [0, 0, 0], 2.4, t => t), a.rope('srope', 2, 2, 2.4, t => t)]);
        },
      });
      // ── 붉은 헛간의 큰 문짝(동쪽): 양쪽으로 열리면 건초가 날린다 ──
      const BDX = 49, BY = 28, BZ = 99;
      w.box(BDX, BY + 1, BZ, BDX, BY + 5, BZ + 3, 0);
      const bdL = w.prop({ name: 'bdoorL', pivot: [BDX + 1, BY + 1, BZ] }), bdR = w.prop({ name: 'bdoorR', pivot: [BDX + 1, BY + 1, BZ + 4] });
      for (const [p, z0] of [[bdL, BZ], [bdR, BZ + 2]]) { p.box(BDX, BY + 1, z0, BDX, BY + 5, z0 + 1, B.barnR); p.line(BDX, BY + 1, z0, BDX, BY + 5, z0 + 1, B.sail); p.box(BDX, BY + 5, z0, BDX, BY + 5, z0 + 1, B.sail); }
      acts.push({
        name: '헛간 문', hint: '붉은 헛간의 큰 문이 활짝 열리고 건초가 날려요', hit: [BDX - 1, BY + 1, BZ, BDX + 1, BY + 5, BZ + 3],
        run: async a => {
          await Promise.all([a.turn('bdoorL', [0, 1.5, 0], 1.3), a.turn('bdoorR', [0, -1.5, 0], 1.3)]);
          for (let k = 0; k < 4; k++) { a.burst([BDX + 2, BY + 3, BZ + 2], { n: 26, colors: ['#dcb456', '#e8c870', '#c8a050'], speed: 5, up: 3, life: 1.6, gravity: 2, spread: 1.2 }); await a.wait(0.4); }
          await a.wait(1);
          await Promise.all([a.turn('bdoorL', [0, 0, 0], 1.2), a.turn('bdoorR', [0, 0, 0], 1.2)]);
        },
      });
      // ── 나룻배: 다리 아래쪽 강물을 따라 내려갔다가 노 저어 돌아온다 ──
      const RZ = 104, RX = Math.round(rX(RZ + 3));
      const boat = w.prop({ name: 'rowboat', pivot: [RX + 0.5, UPL, RZ + 3.5], bob: 0.15, bobSpeed: 1.4, rock: 0.04, rockSpeed: 1.1, axis: 'z' });
      boat.box(RX - 1, UPL, RZ + 1, RX + 1, UPL, RZ + 5, B.wood); boat.set(RX, UPL, RZ, B.wood); boat.set(RX, UPL, RZ + 6, B.wood);
      boat.walls(RX - 1, UPL + 1, RZ + 1, RX + 1, UPL + 1, RZ + 5, B.plank); boat.set(RX, UPL + 1, RZ, B.plank); boat.set(RX, UPL + 2, RZ + 6, B.plank);
      boat.box(RX - 1, UPL + 1, RZ + 3, RX + 1, UPL + 1, RZ + 3, B.wood); boat.box(RX, UPL + 2, RZ + 2, RX, UPL + 2, RZ + 2, B.hay);
      boat.box(RX, UPL + 2, RZ + 5, RX, UPL + 4, RZ + 5, B.wood); boat.set(RX, UPL + 4, RZ + 6, B.lamp);
      for (const s of [-1, 1]) boat.line(RX + s * 2, UPL + 2, RZ + 3, RX + s * 4, UPL, RZ + 4, B.wood);
      const rDown = [0, 6, 12].map(dz => [rX(RZ + 3 + dz) - rX(RZ + 3), 0, dz]);
      acts.push({
        name: '나룻배', hint: '나룻배가 강물을 따라 내려갔다가 노 저어 돌아와요', hit: [RX - 4, UPL, RZ, RX + 4, UPL + 4, RZ + 6],
        run: async a => {
          for (let k = 0; k < 3; k++) a.burst([RX + 0.5 + (k - 1) * 3, UPL + 1, RZ + 4], { n: 10, colors: ['#ffffff', '#d8f0ff'], speed: 2, up: 1.5, life: 0.8, gravity: 6, spread: 0.6 });
          await a.path('rowboat', rDown, 4.5);
          await a.wait(0.6);
          for (let k = 0; k < 2; k++) { a.burst([RX + rDown[2][0] + 0.5, UPL + 1, RZ + 15], { n: 18, colors: ['#ffffff', '#d8f0ff', '#8ac8f0'], speed: 3, up: 2, life: 0.9, gravity: 7, spread: 3 }); await a.wait(0.3); }
          await a.path('rowboat', [rDown[1], [0, 0, 0]], 4);
        },
      });
      // ── 우물가 사과나무: 흔들면 사과와 잎이 우수수 떨어진다 ──
      const AX = SX + 6, AZ = SZ - 6;
      acts.push({
        name: '사과나무', hint: '바람에 우물가 사과나무가 흔들려 사과와 잎이 떨어져요', hit: [AX - 4, sg + 4, AZ - 4, AX + 4, sg + 16, AZ + 4],
        run: async a => {
          a.wind(3, 3.5);
          for (let k = 0; k < 7; k++) {
            // 잎 덩어리 남쪽 바깥 둘레와 꼭대기에서 떨어진다(속에서 터지면 가려진다)
            const ang = 0.9 + (k % 4) * 0.35;
            a.burst([AX + 0.5 + Math.cos(ang) * 6, sg + 9 + (k % 3), AZ + 0.5 + Math.sin(ang) * 6], { n: 14, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 2.5, up: 1, life: 2.4, gravity: 1.2, spread: 1.5 });
            a.burst([AX + 0.5 + Math.cos(ang + 0.3) * 6, sg + 8, AZ + 0.5 + Math.sin(ang + 0.3) * 6], { n: 6, colors: ['#d8403a', '#c03028'], speed: 0.6, up: 0.5, life: 0.9, gravity: 14, spread: 1.2 });
            if (k % 2 === 0) a.burst([AX + 0.5, sg + 18, AZ + 0.5], { n: 16, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 3, up: 2, life: 2.6, gravity: 0.8, spread: 3, flat: true });
            await a.wait(0.45);
          }
        },
      });
      // ── 라벤더 밭: 바람이 지나가며 보랏빛 꽃잎과 벌이 날아오른다 ──
      const lavs = [[41, 115], [26, 76], [11, 89]];
      acts.push({
        name: '라벤더 바람', hint: '바람이 밭을 쓸고 지나가며 보랏빛 꽃잎이 흩날려요', hit: [36, MH.g(w, 41, 115) + 1, 111, 47, MH.g(w, 41, 115) + 3, 120],
        run: async a => {
          a.wind(4, 4);
          for (let k = 0; k < 8; k++) {
            for (const [lx, lz] of lavs) a.burst([lx + (k % 4 - 1.5) * 2.5, MH.g(w, lx, lz) + 2, lz + (k % 3 - 1) * 2.5], { n: 16, colors: ['#8a6ac8', '#b89ae8', '#e0d0ff', '#fff080'], speed: 3.5, up: 2.5, life: 2.4, gravity: -0.2, spread: 3, flat: true });
            await a.wait(0.4);
          }
        },
      });
      const smoke = smokes.concat(mill.chimney ? [mill.chimney] : []).map(c => ({ n: 30, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 0.6, area: [c[0], c[2], 0.6], y0: c[1], y1: c[1] + 20, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
