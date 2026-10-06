// 물레방아 마을 — 두 언덕 사이 강 계곡, 물레방앗간, 언덕 위 풍차, 북동쪽 사과 과수원과 사과주 저장고 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 112;
  const K = W / 128;
  MAPS.push({
    id: 'millbrook', cat: 'village', name: '물레방아 마을', en: 'Millbrook', color: '#8fc46a', seed: 101, base: 22, time: 'day', size: [W, D, Hh],
    desc: '강물이 물레방아를 돌리는 평화로운 마을. 장날이면 이웃 마을 사람들까지 밀가루를 사러 오고, 북동쪽 언덕 과수원에서는 사과주가 익어 간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '농부와 방앗간지기 120여 명'], ['특산물', '고운 밀가루 · 사과주 · 들꽃 꿀'], ['소문', '강 상류에서 물의 정령을 봤다는 이야기']] },
    sky: ['#d6eef8', '#5c9ad6', '#fff4d2'], stars: false,
    hemi: ['#ffffff', '#5a6a40', 0.54], sun: ['#fff2d8', 0.74, [0.5, 1, 0.4]],
    liquid: ['#2a6a9a', '#4a9ad0', '#e0f6ff'], liqSpeed: 1,
    fog: { box: [84, 84, 84, 86], start: 0.8, floor: 12, depth: 10 },
    camY: 4, zoom: 1.05,
    particles: [
      { n: 130, colors: ['#ffffff', '#fff4a0'], mode: 'drift', speed: 0.3, y0: 26, y1: 64, glow: false },
      { n: 40, colors: ['#ffd0e8', '#fff080'], mode: 'wisp', speed: 1, size: 2, y0: 26, glow: false },
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
      reed: { c: '#5a8a3a', v: 0.12 }, reedTop: { c: '#8a6a3a', v: 0.08 }, picket: { c: '#ece4d0', v: 0.03 }, stoneDk: { c: '#6a6a6a', v: 0.06, pat: 'stone' },
      awnR: { c: '#c84a3a', v: 0.03 }, awnG: { c: '#4a8a5a', v: 0.03 }, cask: { c: '#8a5a30', v: 0.08, pat: 'log' }, hive: { c: '#d8b060', v: 0.06, pat: 'log' }, hiveDk: { c: '#b08a40', v: 0.05 },
      hole: { c: '#2a2018', v: 0.02 }, sack: { c: '#e8dcc0', v: 0.04 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const rX = z => 87 + Math.sin(z * 0.038) * 9;
      const UPL = base;
      const WX = 32, WZ = 74, NEX = 152, NEZ = 32;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const d = Math.abs(x - rX(z)) / K;
          let hh = Math.pow(d, 1.1) * 0.1 + Math.max(0, 18 - MH.dist(x, z, WX, WZ) * 0.5 / K) + Math.max(0, 10 - MH.dist(x, z, NEX, NEZ) * 0.4 / K);
          hh += 2.5 * Math.max(0, Math.min(1, (94 - z) / 31.5));
          return base + hh + n.fbm(x * 0.04 / K, z * 0.04 / K) * 3;
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : (() => { const f = n.fbm(x * 0.09 + 7, z * 0.09, 2); return f > 0.6 ? B.grass2 : f < 0.38 ? B.grass3 : B.grass; })(),
        under: (x, z, y, dep, s) => dep < 3 && s < 3 ? B.dirt : B.rock,
      });
      const lights = [], acts = [], landmarks = [];
      const riv = [];
      for (let z = -4; z <= D + 4; z += 4) riv.push([rX(z), z]);
      MH.river(w, riv, 6.6, UPL, B.rockDk, B.path);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      // 강가 갈대와 물가 돌
      for (let z = 1; z < D - 1; z++) for (let x = 1; x < W - 1; x++) {
        if (wet(x, z)) continue;
        if (!(wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1) || wet(x, z - 1))) continue;
        const g = MH.g(w, x, z), h = hash3(x, 5, z);
        if (g > UPL + 3 || w.get(x, g + 1, z)) continue;
        if (h > 0.72) { w.set(x, g + 1, z, B.reed); w.set(x, g + 2, z, h > 0.86 ? B.reedTop : B.reed); if (h > 0.93) w.set(x, g + 3, z, B.reedTop); }
        else if (h < 0.08) w.set(x, g + 1, z, B.rock);
      }

      // ── 물레방앗간(동쪽 강변)과 물레방아 ──
      const mz = 52, mrx = Math.round(rX(mz));
      const millX = mrx + 11;
      const my = MH.maxG(w, millX - 1, mz - 9, millX + 18, mz + 9) + 1;
      MH.flatten(w, millX - 2, mz - 14, millX + 21, mz + 11, my - 1, B.cobble, B.rock);
      MH.skirt(w, millX - 2, mz - 14, millX + 21, mz + 11, my - 1, { R: 6, rate: 1, surf: () => B.grass, fill: B.dirt, skip: (x, z) => x < millX - 2 });
      const mm = { found: B.found, wall: B.plaster, frame: B.frame, quoin: B.found, win: B.win, shutter: B.shutter, sill: B.wood, door: B.door, roof: B.thatch, eave: B.tileDk, ridge: B.frame, chimney: B.found, lamp: B.lamp, flower: B.flower };
      const mill = MH.houseX(w, { x: millX, z: mz - 7, sx: 16, sz: 15, floors: 2, fh: 6, face: 'e', studs: true, pitch: 1, dormers: 2, y: my - 1, m: mm });
      // 아랫단 돌 벽(문 자리는 남긴다)
      for (let y = my; y <= my + 1; y++) for (let z = mz - 7; z <= mz + 7; z++) for (let x = millX; x <= millX + 15; x++) {
        if (x !== millX && x !== millX + 15 && z !== mz - 7 && z !== mz + 7) continue;
        if (x === millX + 15 && z >= mz - 1 && z <= mz + 2) continue;
        w.set(x, y, z, (x + z + y) % 3 ? B.found : B.stoneDk);
      }
      lights.push({ p: [millX + 17, my + 4, mz], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      // 방앗간 문 → 하위 지도(물레방앗간 안). 문 안쪽 한 칸을 막아 돌아올 때 바깥 문 앞에 서게 한다
      w.box(millX + 14, my, mz - 1, millX + 14, my + 4, mz + 2, B.plaster);
      acts.push(OR.goAct({ at: [millX + 16, my, mz], h: 5, hit: [millX + 15, my, mz, millX + 16, my + 3, mz + 1], name: '물레방앗간 안으로', goto: 'millbrook-mill', hint: '삐걱이는 문을 열고 맷돌이 도는 방앗간 안으로 들어가요' }));
      // 북쪽 처마 헛간: 밀가루 자루와 장작
      for (let dz = 0; dz <= 5; dz++) w.box(millX + 1, my + 7 - Math.ceil(dz / 2), mz - 8 - dz, millX + 12, my + 7 - Math.ceil(dz / 2), mz - 8 - dz, dz === 5 ? B.tileDk : B.thatch);
      for (const x of [millX + 1, millX + 6, millX + 12]) w.box(x, my, mz - 13, x, my + 3, mz - 13, B.wood);
      for (let x = millX + 2; x <= millX + 6; x++) for (let z = mz - 11; z <= mz - 9; z++) { w.set(x, my, z, B.sack); if ((x + z) % 2) w.set(x, my + 1, z, B.sack); }
      w.box(millX + 8, my, mz - 11, millX + 11, my + 1, mz - 9, B.bark); for (let x = millX + 8; x <= millX + 11; x++) w.set(x, my + 2, mz - 10, B.plank);
      // 물레방아: 강 한가운데 바퀴 아랫부분만 물에 잠기고, 굴대가 돌 받침을 지나 방앗간 벽까지 이어진다
      const WR = 9, wy = UPL + WR - 1, wx = mrx + 3;
      w.box(wx + 3, UPL - 3, mz - 1, wx + 4, wy - 1, mz + 1, B.found); w.box(wx + 3, wy - 1, mz - 1, wx + 4, wy - 1, mz + 1, B.stoneDk);
      w.box(wx + 3, wy, mz, millX, wy, mz, B.wood);
      for (const dz of [-1, 1]) w.box(millX - 2, my - 1, mz + dz * 2, millX - 2, wy - 1, mz + dz * 2, B.wood);
      const wheel = w.prop({ name: 'wheel', pivot: [wx, wy + 0.5, mz + 0.5], axis: 'x', speed: -0.7 });
      for (let dy = -WR - 1; dy <= WR + 1; dy++) for (let dz = -WR - 1; dz <= WR + 1; dz++) {
        const r = Math.hypot(dy, dz);
        if (r > WR + 0.4) continue;
        const rim = r > WR - 1.2, spoke = (dy === 0 || dz === 0 || Math.abs(dy) === Math.abs(dz)) && r > 1;
        if (rim || spoke || r < 1.5) for (const x of [wx - 1, wx, wx + 1]) { if (spoke && !rim && x === wx) continue; wheel.set(x, wy + dy, mz + dz, r < 1.5 ? B.iron : rim ? (x === wx ? B.wood : B.plank) : B.wood); }
      }
      for (let a = 0; a < 18; a++) { const ang = a / 18 * Math.PI * 2; for (const x of [wx - 1, wx, wx + 1]) wheel.set(x, wy + Math.round(Math.sin(ang) * (WR + 1)), mz + Math.round(Math.cos(ang) * (WR + 1)), B.wood); }
      wheel.box(wx - 2, wy, mz, wx + 2, wy, mz, B.iron);
      acts.push({
        name: '물레방아', hint: '물살이 세지며 물레방아가 빠르게 돌아요', hit: [wx - 2, wy - WR - 1, mz - WR - 1, wx + 2, wy + WR + 1, mz + WR + 1],
        run: async a => {
          a.spin('wheel', 4, 4.5);
          for (let k = 0; k < 7; k++) { a.burst([wx, UPL + 1, mz + 0.5], { n: 26, colors: ['#ffffff', '#d8f0ff', '#8ac8f0'], speed: 4, up: 4, life: 1, gravity: 9, spread: 4 }); await a.wait(0.6); }
        },
      });
      landmarks.push({ name: '물레방앗간', note: '강물이 돌리는 큰 바퀴', p: [millX + 8, mill.peak + 7, mz], tag: 'MILL' });

      // ── 아치 돌다리 ──
      const bz = 116, brx = rX(bz), by = Math.max(MH.g(w, Math.round(brx - 15), bz), MH.g(w, Math.round(brx + 15), bz)) + 1;
      MH.bridge(w, [brx - 15, bz], [brx + 15, bz], by, { width: 7, rise: 3, arch: true, archH: 7, m: { deck: B.cobble, parapet: B.rock, arch: B.rockDk, cap: B.found } });
      landmarks.push({ name: '아치 돌다리', note: '마을과 밀밭을 잇는 다리', p: [brx, by + 11, bz + 0.5] });
      const lampM = { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 5 };
      for (const [lx, lz] of [[Math.round(brx + 17), bz - 5], [Math.round(brx - 17), bz + 5]]) lights.push({ p: MH.lamp(w, lx, lz, lampM), c: '#ffe0a0', i: 0.9, d: 11, flicker: 0.05, night: true });
      // ── 마을: 동쪽 강변의 골목과 집 ──
      const lane = [[brx + 16, bz + 1], [126, 113], [134, 92], [129, 68], [millX + 18, mz + 4]];
      MH.path(w, lane, 2.4, B.cobble, B.path);
      const westPath = [[brx - 16, bz], [52, 113], [34, 102], [32, 84]];
      MH.path(w, westPath, 2, B.path);
      const hm = k => ({ found: B.found, wall: k % 2 ? B.plaster2 : B.plaster, frame: B.frame, quoin: k % 3 === 0 ? B.found : null, win: B.win, shutter: k % 2 ? B.shutter : B.shutter2, sill: B.wood, flower: B.flower, door: B.door,
        roof: k % 2 ? B.thatch : B.tile, eave: B.tileDk, ridge: B.frame, chimney: k % 2 ? B.found : null, lamp: B.lamp });
      const houses = [[108, 126, 12, 10, 'n'], [151, 122, 12, 10, 'w'], [144, 100, 12, 12, 'w'], [110, 81, 12, 10, 'e'], [142, 73, 12, 10, 'w'], [113, 144, 12, 10, 'n'], [134, 144, 12, 10, 'n']];
      const smokes = [];
      houses.forEach(([x, z, sx, sz, face], k) => {
        const h = MH.houseX(w, { x, z, sx, sz, floors: k % 3 === 0 ? 1 : 2, fh: 6, face, jetty: k % 2 === 1, studs: true, dormers: k % 3 === 1 ? 1 : 0, m: hm(k) });
        if (h.chimney && smokes.length < 2) smokes.push(h.chimney);
        if (k % 2 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
        // 문 앞 꽃화분과 디딤돌
        const [dx, dy, dz] = h.door, fo = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0] }[face];
        for (const sd of [-2, 3]) { const px = dx + (fo[1] ? sd : fo[0]), pz = dz + (fo[0] ? sd : fo[1]); if (!w.get(px, dy, pz)) { w.set(px, dy, pz, B.wood); w.set(px, dy + 1, pz, k % 2 ? B.flower : B.flower2); } }
      });
      // 텃밭 둘: 흰 울타리 안에 양배추 이랑
      const picket = (x0, z0, x1, z1) => {
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const g = MH.g(w, x, z), edge = x === x0 || x === x1 || z === z0 || z === z1;
          if (g < 0 || w.get(x, g + 1, z) || wet(x, z)) continue;
          if (edge) { if ((x === x0 || x === x1) && z === Math.floor((z0 + z1) / 2)) continue; w.set(x, g + 1, z, B.picket); if ((x + z) % 2 === 0) w.set(x, g + 2, z, B.picket); }
          else { w.set(x, g, z, B.soil); if ((z - z0) % 2 === 0) w.set(x, g + 1, z, (x + z) % 5 ? B.cabbage : B.flower2); }
        }
      };
      picket(98, 80, 107, 90); picket(157, 98, 165, 110);
      // 여관(삼층, 매단 간판)
      const inn = MH.houseX(w, { x: 112, z: 97, sx: 14, sz: 10, floors: 3, fh: 6, face: 's', jetty: true, studs: true, balcony: 2, dormers: 2, m: hm(1) });
      const sgx = inn.x0 + 2, sgz = inn.z1 + 1;
      w.box(sgx, inn.y + 6, sgz, sgx, inn.y + 6, sgz + 3, B.wood); w.set(sgx, inn.y + 5, sgz + 3, B.iron);
      w.box(sgx, inn.y + 2, sgz + 2, sgx, inn.y + 4, sgz + 4, B.sign); w.set(sgx, inn.y + 3, sgz + 3, B.frame);
      for (const [bx, bz2] of [[inn.x1 - 2, inn.z1 + 2], [inn.x1 - 1, inn.z1 + 2], [inn.x1 - 2, inn.z1 + 3]]) { const g = MH.g(w, bx, bz2); if (!w.get(bx, g + 1, bz2)) w.set(bx, g + 1, bz2, B.cask); }
      lights.push({ p: [inn.door[0] + 0.5, inn.door[1] + 3, inn.door[2] + 1.5], c: '#ffd890', i: 1, d: 12, flicker: 0.1, night: true });
      // 여관 문 → 하위 지도(여관 안). 문 안쪽 한 칸을 막아 돌아올 때 바깥 문 앞에 서게 한다
      { const [ix, iy, iz] = inn.door;
        w.box(ix - 1, iy, iz - 1, ix + 2, iy + 4, iz - 1, B.plaster2);
        acts.push(OR.goAct({ at: [ix, iy, iz + 1], h: 3, hit: [ix, iy, iz, ix + 1, iy + 3, iz + 1], name: '여관 안으로', goto: 'millbrook-inn', hint: '간판 아래 문을 열고 벽난로가 타는 여관 주점으로 들어가요' })); }
      // 광장과 우물: 두레박과 밧줄은 부품
      const SX = 129, SZ = 116, sg = MH.g(w, SX, SZ);
      for (let z = SZ - 10; z <= SZ + 10; z++) for (let x = SX - 10; x <= SX + 10; x++) { const d = MH.dist(x, z, SX, SZ); if (d < 9.5 && !w.get(x, MH.g(w, x, z) + 2, z)) MH.setH(w, x, z, sg, d > 8.5 ? B.found : ((x + z) % 4 ? B.cobble : B.stoneDk), B.rock); }
      w.ring(SX, SZ, sg + 1, 1.6, 3, B.found); w.ring(SX, SZ, sg + 2, 1.6, 3, B.found);
      w.cyl(SX, SZ, sg - 9, sg, 1.6, 0);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { w.set(SX + dx, sg - 10, SZ + dz, B.rockDk); w.hm[SX + dx + W * (SZ + dz)] = sg - 10; w.liquid(SX + dx, SZ + dz, sg - 8); }
      for (const px of [SX - 3, SX + 3]) w.box(px, sg + 3, SZ, px, sg + 8, SZ, B.wood);
      w.box(SX - 3, sg + 8, SZ, SX + 3, sg + 8, SZ, B.wood); w.box(SX - 1, sg + 8, SZ, SX + 1, sg + 8, SZ, B.iron);
      MH.roof(w, SX - 4, SX + 4, SZ - 2, SZ + 2, sg + 9, { b: B.tile, eave: B.tileDk, axis: 'x' });
      MH.rope(w, 'wrope', SX, sg + 7, SZ, 3, B.rope);
      const bucket = w.prop({ name: 'bucket', pivot: [SX + 0.5, sg + 4, SZ + 0.5] });
      bucket.box(SX - 1, sg + 3, SZ - 1, SX + 1, sg + 4, SZ + 1, B.wood); bucket.walls(SX - 1, sg + 4, SZ - 1, SX + 1, sg + 4, SZ + 1, B.iron); bucket.set(SX, sg + 4, SZ, B.foam2);
      // 물통: 길어 올린 물을 우물 남쪽 나무 물통에 붓는다
      w.box(SX - 2, sg + 1, SZ + 4, SX + 2, sg + 2, SZ + 6, B.wood); w.box(SX - 1, sg + 2, SZ + 5, SX + 1, sg + 2, SZ + 5, B.foam2);
      acts.push({
        name: '우물 두레박', hint: '두레박이 물을 길어 올려 물통에 부어요', hit: [SX - 3, sg + 1, SZ - 3, SX + 3, sg + 9, SZ + 7],
        run: async a => {
          await Promise.all([a.move('bucket', [0, -8, 0], 1.1, t => t), a.rope('wrope', 3, 11, 1.1, t => t)]);
          a.burst([SX + 0.5, sg - 5, SZ + 0.5], { n: 18, colors: ['#e0f6ff', '#8ac8f0'], speed: 2, up: 3, life: 0.8, gravity: 7, spread: 1 });
          await a.wait(0.4);
          await Promise.all([a.move('bucket', [0, 0, 0], 1.3, t => t), a.rope('wrope', 3, 3, 1.3, t => t)]);
          await a.move('bucket', [0, 1, 4], 0.9);
          await a.turn('bucket', [0.9, 0, 0], 0.6);
          for (let k = 0; k < 4; k++) { a.burst([SX + 0.5, sg + 4, SZ + 5.5], { n: 22, colors: ['#e0f6ff', '#8ac8f0', '#ffffff'], speed: 2, up: 1, life: 0.8, gravity: 9, spread: 1.2 }); await a.wait(0.35); }
          await a.turn('bucket', [0, 0, 0], 0.6);
          await a.move('bucket', [0, 0, 0], 0.9);
        },
      });
      // 장터 노점 둘과 긴 의자
      const stM = { post: B.wood, counter: B.plank, goods: [B.apple, B.wheat, B.cabbage, B.sack, B.lavender], crate: B.plank };
      MH.stall(w, SX - 9, SZ - 3, { sx: 5, sz: 4, m: Object.assign({ a1: B.awnR, a2: B.flower3 }, stM) });
      MH.stall(w, SX + 4, SZ + 1, { sx: 5, sz: 4, m: Object.assign({ a1: B.awnG, a2: B.flower3 }, stM) });
      w.box(SX - 4, sg + 1, SZ - 7, SX - 1, sg + 1, SZ - 7, B.plank); for (const x of [SX - 4, SX - 1]) w.set(x, sg + 1, SZ - 6, B.wood);
      MH.tree(w, SX + 7, sg + 1, SZ - 7, { kind: 'oak', h: 11, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk, B.apple], r: 4.6, trunkR: 1.3 });
      for (const [lx, lz] of [[SX - 8, SZ + 6], [SX + 6, SZ + 8], [131, 84], [124, 64]]) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 12, flicker: 0.05, night: true });
      landmarks.push({ name: '우물 광장', note: '장날이면 노점이 선다', p: [SX + 0.5, sg + 16, SZ + 0.5] });

      // ── 서쪽 언덕: 풍차 ──
      const wg = MH.g(w, WX, WZ) + 1;
      MH.flatten(w, WX - 9, WZ - 9, WX + 9, WZ + 10, wg - 1, B.path, B.dirt);
      MH.skirt(w, WX - 9, WZ - 9, WX + 9, WZ + 10, wg - 1, { R: 12, rate: 0.95, noise: (x, z) => n.fbm(x * 0.15, z * 0.15 + 5, 2) * 1.6 - 0.4, surf: (x, z) => n.fbm(x * 0.09 + 7, z * 0.09, 2) > 0.6 ? B.grass2 : B.grass, fill: B.dirt });
      MH.path(w, [[34, 102], [32, 84]], 2, B.path);
      const TH = 26;
      for (let y = wg; y < wg + TH; y++) w.cyl(WX, WZ, y, y, 6 - (y - wg) * 0.08, (y - wg) % 6 === 5 ? B.frame : B.plaster);
      w.cyl(WX, WZ, wg, wg + 1, 6.8, B.found); w.ring(WX, WZ, wg + 2, 5.2, 6.4, B.stoneDk);
      for (let y = wg + 5; y < wg + 24; y += 6) for (const [dx, dz] of [[5, 0], [-5, 0], [0, -5]]) { const r = Math.round(6 - (y - wg) * 0.08) - 1, px = WX + Math.sign(dx) * r, pz = WZ + Math.sign(dz) * r; w.box(px, y, pz, px, y + 1, pz, B.win); w.set(px, y + 2, pz, B.frame); }
      w.box(WX, wg, WZ + 6, WX + 1, wg + 3, WZ + 6, B.door); w.box(WX - 1, wg + 4, WZ + 6, WX + 2, wg + 4, WZ + 6, B.frame); w.set(WX - 1, wg + 3, WZ + 7, B.lamp);
      for (let k = 0; k < 3; k++) w.box(WX - 1, wg - 1 - k + 1, WZ + 7 + k, WX + 2, wg - 1 - k + 1, WZ + 7 + k, B.found);
      lights.push({ p: [WX - 0.5, wg + 3, WZ + 7.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      // 둘레 회랑과 난간
      w.ring(WX, WZ, wg + 10, 5.2, 7.6, B.plank);
      for (let a = 0; a < 20; a++) { const x = Math.round(WX + Math.cos(a * 0.314) * 7.2), z = Math.round(WZ + Math.sin(a * 0.314) * 7.2); w.set(x, wg + 11, z, B.wood); if (a % 2 === 0) w.set(x, wg + 12, z, B.wood); }
      for (let a = 0; a < 6; a++) { const x = Math.round(WX + Math.cos(a * 1.047 + 0.5) * 6.6), z = Math.round(WZ + Math.sin(a * 1.047 + 0.5) * 6.6); w.line(x, wg + 9, z, Math.round(WX + Math.cos(a * 1.047 + 0.5) * 5.4), wg + 6, Math.round(WZ + Math.sin(a * 1.047 + 0.5) * 5.4), B.wood); }
      const cap = MH.cone(w, WX, WZ, wg + TH, 5.4, B.thatch, 0.4, B.tileDk);
      w.set(WX, cap, WZ, B.iron); w.set(WX, cap + 1, WZ, B.iron);
      // 풍차 아래 맷돌과 자루
      w.cyl(WX + 8, WZ - 6, wg, wg, 1.8, B.stoneDk); w.set(WX + 8, wg, WZ - 6, B.wood);
      for (const [sx2, sz2] of [[WX - 7, WZ + 3], [WX - 7, WZ + 4], [WX - 8, WZ + 3]]) w.set(sx2, wg, sz2, B.sack);
      w.set(WX - 7, wg + 1, WZ + 3, B.sack);
      const hy = wg + 23;
      w.box(WX, hy, WZ + 3, WX, hy, WZ + 7, B.wood);
      const blades = w.prop({ name: 'blades', pivot: [WX + 0.5, hy + 0.5, WZ + 8.5], axis: 'z', speed: 0.5 });
      for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) for (let s = 1; s <= 16; s++) {
        blades.set(WX + dx * s, hy + dy * s, WZ + 8, B.wood);
        if (s >= 3) for (let q = 1; q <= 4; q++) blades.set(WX + dx * s - dy * q, hy + dy * s + dx * q, WZ + 8, (s % 3 === 0 || q === 4) ? B.wood : B.sail);
      }
      blades.box(WX - 1, hy - 1, WZ + 8, WX + 1, hy + 1, WZ + 8, B.iron); blades.set(WX, hy, WZ + 9, B.iron);
      acts.push({
        name: '풍차', hint: '바람을 받아 날개가 힘차게 돌아요', hit: [WX - 16, hy - 16, WZ + 7, WX + 16, hy + 16, WZ + 9],
        run: async a => { a.spin('blades', 6, 4.5); for (let k = 0; k < 5; k++) { a.burst([WX + 0.5, hy, WZ + 9], { n: 14, colors: ['#fff4d0', '#e8d8a0'], speed: 11, up: 1, life: 1.2, gravity: 0, spread: 8, flat: true }); await a.wait(0.8); } },
      });
      landmarks.push({ name: '풍차 언덕', note: '밀밭을 내려다보는 풍차', p: [WX + 0.5, cap + 6, WZ + 0.5] });

      // ── 조각보 밭, 산울타리, 붉은 헛간 ──
      const crops = [B.wheat, B.cabbage, B.lavender, B.wheat];
      const BRX0 = 49, BRX1 = 64, BRZ0 = 125, BRZ1 = 136;
      const lavs = [];
      for (let fz = 95; fz < 160; fz += 17) for (let fx = 8; fx < 68; fx += 19) {
        const crop = crops[((fx / 19 | 0) + (fz / 17 | 0)) % 4];
        let cnt = 0;
        for (let z = fz; z < fz + 13; z++) for (let x = fx; x < fx + 15; x++) {
          const g = MH.g(w, x, z);
          if (g < base || wet(x, z) || MH.polyDist(x, z, westPath) < 3.5 || (x >= BRX0 - 2 && x <= BRX1 + 6 && z >= BRZ0 - 2 && z <= BRZ1 + 2)) continue;
          w.set(x, g, z, B.soil); cnt++;
          if ((z - fz) % 2 === 0) { w.set(x, g + 1, z, crop); if (crop === B.wheat && hash3(x, 2, z) > 0.5) w.set(x, g + 2, z, crop); if (crop === B.lavender && hash3(x, 3, z) > 0.7) w.set(x, g + 2, z, B.lavender); }
        }
        if (crop === B.lavender && cnt > 60) lavs.push([fx + 7, fz + 6]);
        for (let x = fx - 1; x <= fx + 15; x++) for (const z of [fz - 1, fz + 13]) { const g = MH.g(w, x, z); if (g > 0 && !wet(x, z) && !w.get(x, g + 1, z) && MH.polyDist(x, z, westPath) > 3.5) { w.set(x, g + 1, z, B.hedge); if (hash3(x, 1, z) > 0.5) w.set(x, g + 2, z, B.hedge); } }
      }
      const barn = MH.house(w, { x: 50, z: 126, sx: 14, sz: 10, fh: 9, face: 'e', m: { found: B.found, wall: B.barnR, frame: B.sail, door: B.sail, roof: B.tile, eave: B.tileDk, ridge: B.sail } });
      // 건초 다락 문과 도르래 들보
      w.box(barn.x1, barn.y + 11, barn.z0 + 4, barn.x1, barn.y + 13, barn.z0 + 5, B.hay); w.box(barn.x1 + 1, barn.y + 15, barn.z0 + 4, barn.x1 + 3, barn.y + 15, barn.z0 + 4, B.wood);
      for (const [hx, hz] of [[45, 142], [47, 146], [68, 131], [70, 140]]) { const g = MH.g(w, hx, hz); if (wet(hx, hz)) continue; w.box(hx, g + 1, hz, hx + 2, g + 2, hz + 1, B.hay); w.box(hx, g + 3, hz, hx + 1, g + 3, hz + 1, B.hay); }
      // 짐수레(헛간 앞)
      { const cx = barn.x1 + 4, cz0 = barn.z0 - 4, g = MH.g(w, cx, cz0 + 2);
        w.box(cx - 1, g + 2, cz0, cx + 1, g + 2, cz0 + 5, B.plank); w.walls(cx - 1, g + 3, cz0, cx + 1, g + 3, cz0 + 5, B.wood);
        w.box(cx - 1, g + 4, cz0 + 1, cx + 1, g + 4, cz0 + 4, B.hay); w.box(cx, g + 5, cz0 + 2, cx, g + 5, cz0 + 3, B.hay);
        for (const sx2 of [cx - 2, cx + 2]) { w.box(sx2, g + 1, cz0 + 2, sx2, g + 3, cz0 + 2, B.wood); w.set(sx2, g + 2, cz0 + 1, B.wood); w.set(sx2, g + 2, cz0 + 3, B.wood); w.set(sx2, g + 2, cz0 + 2, B.iron); }
        w.line(cx - 1, g + 2, cz0 - 1, cx - 1, g + 1, cz0 - 4, B.wood); w.line(cx + 1, g + 2, cz0 - 1, cx + 1, g + 1, cz0 - 4, B.wood); }
      // ── 숲, 들꽃 ──
      for (let i = 0; i < 120; i++) {
        const x = w.ri(2, W - 3), z = w.ri(2, D - 3), g = MH.g(w, x, z), gb = w.get(x, g, z);
        if (g < base || wet(x, z) || w.get(x, g + 1, z) || gb === B.soil || gb === B.cobble || gb === B.path) continue;
        if ((x > 100 && z > 60) || (x > 116 && z < 66) || (x < 74 && z > 87) || MH.dist(x, z, WX, WZ) < 21 || MH.dist(x, z, millX + 8, mz) < 24 || Math.abs(x - rX(z)) < 10.5) continue;
        if (z < 52) MH.tree(w, x, g + 1, z, { kind: 'pine', h: w.ri(13, 21), bark: B.bark, leaves: [B.leaf, B.leafDk, B.leafDk], r: 4 });
        else MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 10), bark: i % 4 === 0 ? B.birch : B.bark, barkDk: i % 4 === 0 ? B.frame : null, leaves: [B.leaf2, B.leaf, B.leafDk, i % 5 === 0 ? B.apple : null], r: w.r(3.2, 4.4) });
      }

      // ── 방앗간 박공의 자루 도르래: 다락에서 밀가루 자루를 내린다 ──
      const MX1 = millX + 15, HX = millX + 19, HZ = mz - 4, HY = my + 13;
      w.box(MX1, HY - 2, HZ, MX1, HY, HZ, B.door);
      w.box(MX1 + 1, HY + 1, HZ, HX, HY + 1, HZ, B.wood); w.line(MX1 + 1, HY - 3, HZ, MX1 + 3, HY, HZ, B.wood); w.set(HX, HY, HZ, B.iron);
      w.box(HX - 1, my, HZ - 1, HX, my, HZ + 1, B.plank);
      MH.rope(w, 'srope', HX, HY - 1, HZ, 2, B.rope);
      const sack = w.prop({ name: 'sack', pivot: [HX + 0.5, HY - 3, HZ + 0.5] });
      sack.box(HX - 1, HY - 6, HZ - 1, HX, HY - 4, HZ + 1, B.sail); sack.box(HX - 1, HY - 3, HZ, HX, HY - 3, HZ, B.rope);
      const sDrop = (HY - 6) - (my + 1);
      acts.push({
        name: '자루 도르래', hint: '방앗간 다락에서 밀가루 자루가 내려와요', hit: [MX1 + 1, my + 1, HZ - 1, HX, HY + 1, HZ + 1],
        run: async a => {
          await Promise.all([a.move('sack', [0, -sDrop, 0], 2.2, t => t), a.rope('srope', 2, 2 + sDrop, 2.2, t => t)]);
          for (let k = 0; k < 3; k++) { a.burst([HX, my + 2, HZ + 0.5], { n: 30, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], speed: 3, up: 2, life: 1.4, gravity: 1, spread: 1.5 }); await a.wait(0.35); }
          await a.wait(0.6);
          await Promise.all([a.move('sack', [0, 0, 0], 2.4, t => t), a.rope('srope', 2, 2, 2.4, t => t)]);
        },
      });
      // ── 붉은 헛간의 큰 문짝(동쪽): 양쪽으로 열리면 건초가 날린다 ──
      const BDX = barn.x1, BY = barn.y, BZ = Math.floor((barn.z0 + barn.z1) / 2) - 1;
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
      // ── 나룻배: 나루터에서 강물을 따라 내려가고, 다음 배가 다시 나루터에 나타난다 ──
      const RZ = 122, RX = Math.round(rX(RZ + 3));
      // 동쪽 강가 나루터(작은 널판 부두)
      { const jy = UPL + 1, jx0 = Math.round(rX(RZ + 3) + 5);
        for (let x = jx0; x <= jx0 + 6; x++) for (let z = RZ + 2; z <= RZ + 4; z++) { w.set(x, jy, z, B.plank); }
        for (const x of [jx0, jx0 + 3]) for (const z of [RZ + 2, RZ + 4]) for (let y = MH.g(w, x, z) + 1; y < jy; y++) w.set(x, y, z, B.wood);
        w.box(jx0, jy + 1, RZ + 1, jx0, jy + 2, RZ + 1, B.wood); w.set(jx0, jy + 3, RZ + 1, B.rope); }
      const boat = w.prop({ name: 'rowboat', pivot: [RX + 0.5, UPL, RZ + 3.5], bob: 0.15, bobSpeed: 1.4, rock: 0.04, rockSpeed: 1.1, axis: 'z' });
      boat.box(RX - 1, UPL, RZ + 1, RX + 1, UPL, RZ + 5, B.wood); boat.set(RX, UPL, RZ, B.wood); boat.set(RX, UPL, RZ + 6, B.wood);
      boat.walls(RX - 1, UPL + 1, RZ + 1, RX + 1, UPL + 1, RZ + 5, B.plank); boat.set(RX, UPL + 1, RZ, B.plank); boat.set(RX, UPL + 2, RZ + 6, B.plank);
      boat.box(RX - 1, UPL + 1, RZ + 3, RX + 1, UPL + 1, RZ + 3, B.wood); boat.box(RX, UPL + 2, RZ + 2, RX, UPL + 2, RZ + 2, B.hay);
      boat.box(RX, UPL + 2, RZ + 5, RX, UPL + 4, RZ + 5, B.wood); boat.set(RX, UPL + 4, RZ + 6, B.lamp);
      for (const s of [-1, 1]) boat.line(RX + s * 2, UPL + 2, RZ + 3, RX + s * 4, UPL, RZ + 4, B.wood);
      const rDown = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 48].map(dz => [rX(RZ + 3 + dz) - rX(RZ + 3), 0, dz]);
      acts.push({
        name: '나룻배', hint: '나룻배가 강물을 따라 마을 밖으로 내려가고, 다음 배가 나루터에 들어와요', hit: [RX - 4, UPL, RZ, RX + 4, UPL + 4, RZ + 6],
        run: async a => {
          for (let k = 0; k < 3; k++) a.burst([RX + 0.5 + (k - 1) * 3, UPL + 1, RZ + 4], { n: 10, colors: ['#ffffff', '#d8f0ff'], speed: 2, up: 1.5, life: 0.8, gravity: 6, spread: 0.6 });
          await a.drive('rowboat', rDown, 8, { fwd: '+z', back: 1.0 });
        },
      });
      // ── 우물가 사과나무: 흔들면 사과와 잎이 우수수 떨어진다 ──
      const AX = SX + 7, AZ = SZ - 7;
      acts.push({
        name: '사과나무', hint: '바람에 우물가 사과나무가 흔들려 사과와 잎이 떨어져요', hit: [AX - 4, sg + 4, AZ - 4, AX + 4, sg + 16, AZ + 4],
        run: async a => {
          a.wind(3, 3.5);
          for (let k = 0; k < 7; k++) {
            const ang = 0.9 + (k % 4) * 0.35;
            a.burst([AX + 0.5 + Math.cos(ang) * 6, sg + 9 + (k % 3), AZ + 0.5 + Math.sin(ang) * 6], { n: 14, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 2.5, up: 1, life: 2.4, gravity: 1.2, spread: 1.5 });
            a.burst([AX + 0.5 + Math.cos(ang + 0.3) * 6, sg + 8, AZ + 0.5 + Math.sin(ang + 0.3) * 6], { n: 6, colors: ['#d8403a', '#c03028'], speed: 0.6, up: 0.5, life: 0.9, gravity: 14, spread: 1.2 });
            if (k % 2 === 0) a.burst([AX + 0.5, sg + 18, AZ + 0.5], { n: 16, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 3, up: 2, life: 2.6, gravity: 0.8, spread: 3, flat: true });
            await a.wait(0.45);
          }
        },
      });
      // ── 라벤더 밭: 바람이 지나가며 보랏빛 꽃잎과 벌이 날아오른다 ──
      const L0 = lavs[0] || [30, 120], lg0 = MH.g(w, L0[0], L0[1]);
      acts.push({
        name: '라벤더 바람', hint: '바람이 밭을 쓸고 지나가며 보랏빛 꽃잎이 흩날려요', hit: [L0[0] - 6, lg0 + 1, L0[1] - 5, L0[0] + 6, lg0 + 3, L0[1] + 5],
        run: async a => {
          a.wind(4, 4);
          for (let k = 0; k < 8; k++) {
            for (const [lx, lz] of lavs) a.burst([lx + (k % 4 - 1.5) * 3, MH.g(w, lx, lz) + 2, lz + (k % 3 - 1) * 3], { n: 16, colors: ['#8a6ac8', '#b89ae8', '#e0d0ff', '#fff080'], speed: 3.5, up: 2.5, life: 2.4, gravity: -0.2, spread: 3, flat: true });
            await a.wait(0.4);
          }
        },
      });

      // ══ 새 구역: 북동쪽 언덕의 사과 과수원 · 양봉장 · 사과주 저장고 · 비둘기 탑 ══
      MH.path(w, [[millX + 18, mz + 4], [130, 46], [137, 36], [137, 26]], 1.6, B.path);
      // 사과주 저장고: 돌 아래층 위에 목조 이층
      const cid = MH.houseX(w, { x: 131, z: 13, sx: 14, sz: 10, floors: 2, fh: 6, face: 's', studs: true, pitch: 1, dormers: 1,
        m: { found: B.found, wall: B.plaster2, frame: B.frame, quoin: B.found, win: B.win, shutter: B.shutter2, sill: B.wood, flower: B.flower, door: B.door, roof: B.tile, eave: B.tileDk, ridge: B.frame, chimney: B.found, lamp: B.lamp } });
      for (let y = cid.y + 1; y <= cid.y + 6; y++) for (let x = cid.x0; x <= cid.x1; x++) for (const z of [cid.z0, cid.z1]) {
        const cur = w.get(x, y, z); if (cur === B.plaster2 || cur === B.frame) w.set(x, y, z, (x + y) % 3 ? B.found : B.stoneDk);
      }
      for (let y = cid.y + 1; y <= cid.y + 6; y++) for (let z = cid.z0; z <= cid.z1; z++) for (const x of [cid.x0, cid.x1]) {
        const cur = w.get(x, y, z); if (cur === B.plaster2 || cur === B.frame) w.set(x, y, z, (z + y) % 3 ? B.found : B.stoneDk);
      }
      const PY = cid.y;
      MH.flatten(w, 127, cid.z1 + 2, 150, 38, PY, B.cobble, B.rock);
      MH.skirt(w, 127, cid.z1 + 2, 150, 38, PY, { R: 7, rate: 1, surf: () => B.grass, fill: B.dirt });
      // 문 앞 통 더미와 사과 바구니
      for (const [bx, bz2, hgt] of [[cid.x0 + 1, cid.z1 + 2, 2], [cid.x0 + 2, cid.z1 + 2, 1], [cid.x0 + 1, cid.z1 + 3, 1], [cid.x1 - 1, cid.z1 + 2, 1]]) w.box(bx, PY + 1, bz2, bx, PY + hgt, bz2, B.cask);
      for (const [bx, bz2] of [[cid.x0 + 4, cid.z1 + 3], [cid.x0 + 5, cid.z1 + 3]]) { w.set(bx, PY + 1, bz2, B.plank); w.set(bx, PY + 2, bz2, B.apple); }
      lights.push({ p: [cid.door[0] + 0.5, cid.door[1] + 3, cid.door[2] + 1.5], c: '#ffd890', i: 0.9, d: 11, flicker: 0.1, night: true });
      landmarks.push({ name: '사과주 저장고', note: '땅속 저장고에서 사과주가 익는다', p: [cid.x0 + 7, cid.peak + 6, cid.z0 + 5], tag: 'CIDER' });
      // 땅속 저장고 들창: 두 쪽 문이 열리면 사과주 통이 굴러 나온다
      const CX0 = 140, CX1 = 145, CZ0 = cid.z1 + 4, CZ1 = CZ0 + 2;
      for (let x = CX0 - 1; x <= CX1 + 1; x++) for (let z = CZ0 - 1; z <= CZ1 + 1; z++) w.box(x, PY - 5, z, x, PY, z, (x < CX0 || x > CX1 || z < CZ0 || z > CZ1) ? B.found : 0);
      w.box(CX0, PY - 5, CZ0, CX1, PY - 5, CZ1, B.plank);
      w.box(CX0 - 1, PY + 1, CZ0 - 1, CX1 + 1, PY + 1, CZ0 - 1, B.stoneDk);
      const hdL = w.prop({ name: 'hatchL', pivot: [CX0, PY + 1, CZ0 + 1.5], axis: 'z' }), hdR = w.prop({ name: 'hatchR', pivot: [CX1 + 1, PY + 1, CZ0 + 1.5], axis: 'z' });
      hdL.box(CX0, PY, CZ0, CX0 + 2, PY, CZ1, B.door); hdL.set(CX0 + 2, PY, CZ0 + 1, B.iron);
      hdR.box(CX1 - 2, PY, CZ0, CX1, PY, CZ1, B.door); hdR.set(CX1 - 2, PY, CZ0 + 1, B.iron);
      const ccx = CX0 + 1, ccy = PY - 3, ccz = CZ0 + 1;
      const cask = w.prop({ name: 'cask', pivot: [ccx + 2, ccy + 0.5, ccz + 0.5] });
      for (let x = ccx; x <= ccx + 3; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
        if (Math.abs(dy) === 1 && Math.abs(dz) === 1) continue;
        cask.set(x, ccy + dy, ccz + dz, (x === ccx || x === ccx + 3) ? (dy === 0 && dz === 0 ? B.wood : B.iron) : B.cask);
      }
      const rollZ = 38 - CZ1 - 1;
      acts.push({
        name: '사과주 통', hint: '저장고 들창이 열리고 사과주 통이 언덕길로 굴러 나와요', hit: [CX0 - 1, PY, CZ0 - 1, CX1 + 1, PY + 4, CZ1 + 1],
        run: async a => {
          await Promise.all([a.turn('hatchL', [0, 0, 1.6], 1), a.turn('hatchR', [0, 0, -1.6], 1)]);
          await a.move('cask', [0, 4, 0], 1.1);
          a.burst([ccx + 2, PY + 2, ccz + 0.5], { n: 20, colors: ['#e8c870', '#d8a050', '#fff0c0'], speed: 2, up: 3, life: 1.2, gravity: 4, spread: 1.5 });
          await a.tween('cask', { off: [0, 4, rollZ], rot: [rollZ / 1.4, 0, 0] }, 2.4, t => t);
          a.burst([ccx + 2, PY + 2, ccz + rollZ + 1], { n: 24, colors: ['#e8c870', '#d8403a', '#fff0c0'], speed: 3, up: 3, life: 1.2, gravity: 6, spread: 1.5 });
          await a.respawn('cask', 1.0);
          await Promise.all([a.turn('hatchL', [0, 0, 0], 0.9), a.turn('hatchR', [0, 0, 0], 0.9)]);
        },
      });
      // 과수원: 줄지어 선 작은 사과나무, 사다리와 바구니
      const orchard = [];
      for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
        const x = 133 + c * 9 + (r % 2) * 4, z = 44 + r * 8;
        if (x > W - 5) continue;
        const g = MH.g(w, x, z);
        if (g < base || w.get(x, g + 1, z)) continue;
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dx) + Math.abs(dz) <= 3 && w.get(x + dx, MH.g(w, x + dx, z + dz), z + dz) !== B.cobble) MH.paint(w, x + dx, z + dz, B.grass3);
        const top = MH.tree(w, x, g + 1, z, { kind: 'oak', h: 6, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk, B.apple], r: 2.9, spread: 2.6, branches: 3 });
        for (let q = 0; q < 14; q++) { const ax = x + Math.round(Math.cos(q * 2.4) * 3.3), az = z + Math.round(Math.sin(q * 2.4) * 3.3), ay = g + 5 + (q % 4); if (w.get(ax, ay, az) === B.leaf || w.get(ax, ay, az) === B.leaf2 || w.get(ax, ay, az) === B.leafDk) w.set(ax, ay, az, B.apple); }
        orchard.push([x, g, z, top]);
      }
      if (orchard[1]) { const [x, g, z] = orchard[1]; w.line(x + 3, g + 1, z + 3, x + 2, g + 6, z + 2, B.wood); w.line(x + 4, g + 1, z + 2, x + 3, g + 6, z + 1, B.wood); w.box(x - 3, g + 1, z + 3, x - 2, g + 1, z + 3, B.plank); w.set(x - 3, g + 2, z + 3, B.apple); w.set(x - 2, g + 2, z + 3, B.apple); }
      landmarks.push({ name: '사과 과수원', note: '꿀벌이 꽃가루를 나르는 언덕 과수원', p: [148, MH.g(w, 148, 50) + 14, 50] });
      // 양봉장: 꽃밭 사이 다섯 벌통, 뚜껑은 부품
      const hives = [[134, 59], [139, 60], [144, 59], [149, 60], [154, 59]];
      const hiveTop = [];
      hives.forEach(([hx, hz], i) => {
        const g = MH.maxG(w, hx - 1, hz - 1, hx + 3, hz + 3);
        MH.flatten(w, hx - 2, hz - 2, hx + 4, hz + 4, g, B.grass2, B.dirt);
        for (const [lx, lz] of [[hx, hz], [hx + 2, hz], [hx, hz + 2], [hx + 2, hz + 2]]) w.set(lx, g + 1, lz, B.wood);
        for (let y = g + 2; y <= g + 5; y++) w.box(hx, y, hz, hx + 2, y, hz + 2, y % 2 ? B.hive : B.hiveDk);
        w.set(hx + 1, g + 2, hz + 3, B.plank); w.set(hx + 1, g + 2, hz + 2, B.hole);
        const lid = w.prop({ name: 'hlid' + i, pivot: [hx + 1.5, g + 6, hz + 1.5] });
        lid.box(hx - 1, g + 6, hz - 1, hx + 3, g + 6, hz + 3, B.wood); lid.box(hx, g + 7, hz, hx + 2, g + 7, hz + 2, B.tileDk); lid.set(hx + 1, g + 8, hz + 1, B.tileDk);
        hiveTop.push([hx + 1.5, g + 7, hz + 1.5]);
        for (let q = 0; q < 6; q++) { const fx = hx - 1 + (q * 3) % 6, fz = hz + 4 + (q % 2); const fg = MH.g(w, fx, fz); if (fg > 0 && !w.get(fx, fg + 1, fz)) w.set(fx, fg + 1, fz, [B.lavender, B.flower2, B.flower, B.flower3][q % 4]); }
      });
      acts.push({
        name: '양봉 벌통', hint: '벌통 뚜껑이 들썩이고 금빛 꿀벌 떼가 날아올라요', hit: [132, hiveTop[0][1] - 6, 57, 158, hiveTop[0][1] + 3, 64],
        run: async a => {
          hives.forEach((_, i) => a.tween('hlid' + i, { off: [0, 2, 0], rot: [i % 2 ? 0.35 : -0.35, 0, 0.2] }, 0.6));
          await a.wait(0.6);
          for (let k = 0; k < 8; k++) {
            for (const p of hiveTop) a.burst([p[0], p[1] + 1, p[2]], { n: 10, colors: ['#ffd23a', '#2a2018', '#ffe890'], speed: 3, up: 2.5, life: 2, gravity: -0.3, spread: 1.5, flat: k % 2 === 0 });
            await a.wait(0.4);
          }
          await Promise.all(hives.map((_, i) => a.tween('hlid' + i, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6)));
        },
      });
      // 비둘기 탑: 둥근 돌탑과 지붕 꼭대기 작은 정자(부품)
      const DX = 122, DZ = 30, dg = MH.g(w, DX, DZ) + 1;
      MH.flatten(w, DX - 5, DZ - 5, DX + 5, DZ + 5, dg - 1, B.path, B.dirt);
      for (let y = dg; y < dg + 11; y++) w.cyl(DX, DZ, y, y, 3.6, (y - dg) % 4 === 3 ? B.found : B.plaster);
      w.cyl(DX, DZ, dg, dg, 4.2, B.found);
      for (const yy of [dg + 5, dg + 8]) for (let a = 0; a < 8; a++) {
        const ang = a / 8 * Math.PI * 2 + (yy - dg) * 0.2, x = Math.round(DX + Math.cos(ang) * 3.4), z = Math.round(DZ + Math.sin(ang) * 3.4);
        w.set(x, yy, z, B.hole); w.set(Math.round(DX + Math.cos(ang) * 4.4), yy - 1, Math.round(DZ + Math.sin(ang) * 4.4), B.wood);
      }
      w.box(DX, dg, DZ + 3, DX, dg + 2, DZ + 3, B.door);
      const dtop = MH.cone(w, DX, DZ, dg + 11, 5, B.tile, 0.6, B.tileDk);
      const cup = w.prop({ name: 'dcupola', pivot: [DX + 0.5, dtop, DZ + 0.5] });
      cup.box(DX - 1, dtop, DZ - 1, DX + 1, dtop, DZ + 1, B.wood);
      for (const [cx, cz] of [[DX - 1, DZ - 1], [DX + 1, DZ - 1], [DX - 1, DZ + 1], [DX + 1, DZ + 1]]) cup.set(cx, dtop + 1, cz, B.wood);
      cup.box(DX - 2, dtop + 2, DZ - 2, DX + 2, dtop + 2, DZ + 2, B.tile); cup.box(DX - 1, dtop + 3, DZ - 1, DX + 1, dtop + 3, DZ + 1, B.tile); cup.set(DX, dtop + 4, DZ, B.iron);
      acts.push({
        name: '비둘기 탑', hint: '꼭대기 정자가 들리며 흰 비둘기 떼가 날아올라 한 바퀴 돌아요', hit: [DX - 5, dg, DZ - 5, DX + 5, dtop + 4, DZ + 5],
        run: async a => {
          await a.move('dcupola', [0, 2.5, 0], 0.6);
          for (let k = 0; k < 10; k++) {
            const ang = k * 0.63;
            a.burst([DX + 0.5 + Math.cos(ang) * 4, dtop + 2 + (k % 3), DZ + 0.5 + Math.sin(ang) * 4], { n: 10, colors: ['#ffffff', '#e8e8f0', '#b8b8c8'], speed: 4, up: 3, life: 2.6, gravity: -0.4, spread: 1.2, flat: true });
            await a.wait(0.35);
          }
          await a.move('dcupola', [0, 0, 0], 0.8);
        },
      });
      landmarks.push({ name: '비둘기 탑', note: '편지를 나르는 흰 비둘기', p: [DX + 0.5, dtop + 7, DZ + 0.5] });

      MH.scatter(w, 2800, (x, g, z, b) => { if ((b === B.grass || b === B.grass2 || b === B.grass3) && w.chance(0.18)) w.set(x, g + 1, z, w.chance(0.7) ? B.grass3 : w.pick([B.flower, B.flower2, B.flower3])); });
      const smoke = smokes.concat(mill.chimney ? [mill.chimney] : [], cid.chimney ? [cid.chimney] : []).map(c => ({ n: 30, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 0.6, area: [c[0], c[2], 0.6], y0: c[1], y1: c[1] + 20, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
