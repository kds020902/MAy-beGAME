// 황금들녘 — 구릉의 조각보 밭, 언덕 위 수확제 광장 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'harvest', cat: 'village', name: '황금들녘', en: 'Harvest Hollow', color: '#e0a040', seed: 151, base: 22, time: 'day',
    desc: '가을걷이가 끝나면 사흘 밤낮 축제가 열리는 농촌 마을. 모닥불 주위로 온 마을이 춤을 춘다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '농부 가족 30여 호'], ['특산물', '호박 파이 · 사과주'], ['소문', '축제 마지막 밤에는 허수아비가 춤을 춘다']] },
    sky: ['#fbd29a', '#6a4a7c', '#ffe4a8'], stars: false,
    hemi: ['#ffe8c8', '#5a3a20', 0.56], sun: ['#ffd0a0', 0.78, [0.6, 0.8, 0.45]],
    liquid: ['#3a5a4a', '#5a8a6a', '#f0f0d0'], liqSpeed: 0.6,
    fog: { start: 0.78, floor: 12, depth: 10, haze: [24, 0.16, 6], hazeColor: '#f0c890' },
    particles: [
      { n: 240, colors: ['#e07a2a', '#c84a2a', '#f0b83a'], mode: 'fall', speed: 0.3, wind: 0.8, y0: 22, y1: 66, glow: false },
      { n: 70, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], mode: 'rise', speed: 1.3, area: [64, 60, 2.5], y0: 36, y1: 62 },
    ],
    blocks: {
      grass: { c: '#6a4a30', top: '#9aa04a', v: 0.09 }, grass2: { c: '#6a4a30', top: '#b0a048', v: 0.09 }, grass3: { c: '#6a4a30', top: '#8a9a44', v: 0.09 },
      dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' }, path: { c: '#6a4a30', top: '#c8a878', v: 0.1 },
      soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, wheat: { c: '#e0bc50', v: 0.1 }, stubble: { c: '#c8a860', v: 0.1 }, cobble: { c: '#8a8070', top: '#a89a88', v: 0.1, pat: 'stone' },
      plaster: { c: '#f0e0c0', v: 0.03 }, frame: { c: '#6a4428', v: 0.05 }, roofO: { c: '#c8702a', v: 0.06, pat: 'tile' }, roofBr: { c: '#8a4a2a', v: 0.06, pat: 'tile' }, roofE: { c: '#5a3018', v: 0.04 },
      barnR: { c: '#a83a2a', v: 0.05, pat: 'plank' }, barnW: { c: '#e8e0d0', v: 0.03 }, found: { c: '#8a8070', v: 0.05, pat: 'stone' },
      door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, shutter: { c: '#6a8a3a', v: 0.03 },
      win: { c: '#ffd890', night: true, day: '#a8c8d0' },
      pumpkin: { c: '#e8801a', v: 0.07 }, stem: { c: '#4a7a2a', v: 0.06 }, bark: { c: '#5a3a24', v: 0.06 },
      leafO: { c: '#e08a2a', v: 0.1 }, leafR: { c: '#c04a2a', v: 0.1 }, leafY: { c: '#e8b83a', v: 0.1 }, leafG: { c: '#7a8a3a', v: 0.1 }, apple: { c: '#c8302a', v: 0.05 },
      hay: { c: '#dcb456', v: 0.08 }, log: { c: '#5a3a24', v: 0.06, pat: 'log' }, cart: { c: '#8a6a40', v: 0.08, pat: 'plank' }, hedge: { c: '#5a7a30', v: 0.1 },
      tentR: { c: '#c83a3a', v: 0.03 }, tentW: { c: '#f4ecd8', v: 0.02 }, tentY: { c: '#e8c040', v: 0.03 }, tentB: { c: '#3a6ab0', v: 0.03 },
      rope: { c: '#8a6a4a', v: 0.04 }, rib1: { c: '#d84a4a', v: 0.03 }, rib2: { c: '#4a7ad8', v: 0.03 }, rib3: { c: '#e8d040', v: 0.03 }, rib4: { c: '#4aa84a', v: 0.03 },
      shirt: { c: '#6a8ac0', v: 0.04 }, straw: { c: '#e0c070', v: 0.06 }, reed: { c: '#8a8a4a', v: 0.08 }, pie: { c: '#c8843a', v: 0.06 }, cloth: { c: '#f4ecd8', v: 0.02 },
      fire: { c: '#ff9a3a', glow: true }, fire2: { c: '#ffd060', glow: true },
      lampY: { c: '#ffe08a', night: true, day: '#e8c860' }, lampR: { c: '#ff7a5a', night: true, day: '#d86a50' },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, SX = 64, SZ = 60, PX = 24, PZ = 100;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => base + 2 + n.fbm(x * 0.028, z * 0.028, 4) * 13 + Math.max(0, 8 - MH.dist(x, z, SX, SZ) * 0.18) - Math.max(0, 6 - MH.dist(x, z, PX, PZ) * 0.36),
        surface: (x, z, y, s) => s >= 3 ? B.rock : (() => { const f = n.fbm(x * 0.09 + 3, z * 0.09, 2); return f > 0.6 ? B.grass2 : f < 0.4 ? B.grass3 : B.grass; })(),
        under: (x, z, y, dep, s) => dep < 3 && s < 3 ? B.dirt : B.rock,
      });
      MH.water(w, MH.g(w, PX, PZ) + 4, (x, z) => MH.dist(x, z, PX, PZ) < 14);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const lights = [], acts = [], landmarks = [];
      const roads = [[[SX, SZ], [42, 84], [26, 124]], [[SX, SZ], [94, 50], [126, 42]], [[SX, SZ], [68, 28], [60, 0]], [[SX, SZ], [84, 94], [94, 128]]];
      const nearRoad = (x, z) => roads.some(r => MH.polyDist(x, z, r) < 3.4);
      // ── 조각보 밭 ──
      const crops = [[B.wheat], [B.stubble], [B.pumpkin], [null], [B.wheat]];
      for (let fz = 3; fz < 124; fz += 17) for (let fx = 3; fx < 124; fx += 19) {
        if (MH.dist(fx + 8, fz + 7, SX, SZ) < 30 || MH.dist(fx + 8, fz + 7, PX, PZ) < 18 || (fx > 84 && fz < 40) || (fx > 84 && fz > 62 && fz < 88)) continue;
        const [crop] = crops[(fx * 3 + fz) % 5];
        for (let z = fz; z < fz + 14; z++) for (let x = fx; x < fx + 16; x++) {
          const g = MH.g(w, x, z);
          if (g < 0 || nearRoad(x, z) || wet(x, z)) continue;
          w.set(x, g, z, B.soil);
          if (crop === B.pumpkin) { if ((x + z * 3) % 5 === 0) { w.set(x, g + 1, z, B.pumpkin); w.set(x, g + 2, z, B.stem); } else if ((x + z) % 2 === 0) w.set(x, g + 1, z, B.leafG); }
          else if (crop && (z - fz) % 2 === 0) { w.set(x, g + 1, z, crop); if (crop === B.wheat && hash3(x, 1, z) > 0.5) w.set(x, g + 2, z, crop); }
        }
        for (let x = fx - 1; x <= fx + 16; x++) for (const z of [fz - 1, fz + 14]) { const g = MH.g(w, x, z); if (g > 0 && !nearRoad(x, z) && !wet(x, z) && !w.get(x, g + 1, z)) { w.set(x, g + 1, z, B.hedge); if (hash3(x, 3, z) > 0.4) w.set(x, g + 2, z, B.hedge); } }
        if (crop === B.stubble) { const g = MH.g(w, fx + 8, fz + 7); w.cyl(fx + 8, fz + 7, g + 1, g + 3, 1.8, B.hay); w.cyl(fx + 8, fz + 7, g + 4, g + 4, 1, B.hay); }
      }
      for (const r of roads) MH.path(w, r, 2, B.path);
      // ── 수확제 광장 ──
      const sg = MH.g(w, SX, SZ);
      for (let z = SZ - 18; z <= SZ + 18; z++) for (let x = SX - 18; x <= SX + 18; x++) if (MH.dist(x, z, SX, SZ) < 18.5) MH.setH(w, x, z, sg, MH.dist(x, z, SX, SZ) < 15 ? B.cobble : B.path, B.dirt);
      w.ring(SX, SZ, sg + 1, 4.6, 6, B.rock);
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; w.line(SX + Math.cos(a) * 4, sg + 1, SZ + Math.sin(a) * 4, SX + Math.cos(a) * 0.8, sg + 8, SZ + Math.sin(a) * 0.8, B.log); }
      w.box(SX - 1, sg + 1, SZ - 1, SX + 1, sg + 4, SZ + 1, B.fire); w.box(SX, sg + 5, SZ, SX, sg + 9, SZ, B.fire2); w.set(SX - 1, sg + 5, SZ, B.fire); w.set(SX, sg + 5, SZ + 1, B.fire);
      lights.push({ name: 'fire', p: [SX + 0.5, sg + 8, SZ + 0.5], c: '#ff9a40', i: 2.2, d: 32, flicker: 0.4 });
      acts.push({
        name: '수확제 모닥불', hint: '장작을 던지면 불길이 치솟아요', hit: [SX - 4, sg + 1, SZ - 4, SX + 4, sg + 9, SZ + 4],
        run: async a => { a.flash('fire', 3, 3.2); for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, sg + 8, SZ + 0.5], { n: 46, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3, up: 10, life: 1.8, gravity: 1.5, spread: 2.5 }); await a.wait(0.45); } },
      });
      // 메이폴(부품): 받침은 월드에, 기둥과 리본이 돈다
      const MPX = SX + 10, MPZ = SZ - 9;
      w.cyl(MPX, MPZ, sg + 1, sg + 1, 1.6, B.rock);
      const pole = w.prop({ name: 'maypole', pivot: [MPX + 0.5, sg + 2, MPZ + 0.5], axis: 'y', speed: 0.25 });
      pole.box(MPX, sg + 2, MPZ, MPX, sg + 22, MPZ, B.barnW); pole.set(MPX, sg + 23, MPZ, B.tentY);
      pole.cyl(MPX, MPZ, sg + 20, sg + 20, 2, B.hedge);
      [B.rib1, B.rib2, B.rib3, B.rib4, B.rib1, B.rib2, B.rib3, B.rib4].forEach((rb, k) => { const a = k / 8 * Math.PI * 2; pole.line(MPX + Math.cos(a) * 1.5, sg + 19, MPZ + Math.sin(a) * 1.5, MPX + Math.cos(a) * 7, sg + 4, MPZ + Math.sin(a) * 7, rb); });
      acts.push({ name: '메이폴', hint: '리본이 빙글빙글 돌아요', hit: [MPX - 2, sg + 1, MPZ - 2, MPX + 2, sg + 23, MPZ + 2], run: async a => { await a.spin('maypole', 10, 3.8); } });
      // 불꽃놀이 발사대
      const FWX = SX - 11, FWZ = SZ + 11;
      w.box(FWX - 2, sg + 1, FWZ - 1, FWX + 2, sg + 1, FWZ + 1, B.log);
      for (const [dx, c] of [[-2, B.rib1], [-1, B.rib3], [0, B.rib2], [1, B.rib4], [2, B.rib1]]) w.box(FWX + dx, sg + 2, FWZ, FWX + dx, sg + 5, FWZ, c);
      acts.push({
        name: '불꽃놀이', hint: '축제 하늘에 불꽃이 터져요(밤에 더 예뻐요)', hit: [FWX - 2, sg + 1, FWZ - 1, FWX + 2, sg + 5, FWZ + 1],
        run: async a => {
          const sets = [['#ff5a5a', '#ffd0d0'], ['#ffe060', '#ffffff'], ['#6ab0ff', '#d0e8ff'], ['#a0ff7a', '#ffe060'], ['#ff7ae0', '#ffffff'], ['#ffb04a', '#ffe8a0']];
          for (let k = 0; k < 6; k++) {
            const tx = FWX + (k - 2.5) * 8, tz = FWZ - 6 + (k % 2) * 8, ty = sg + 40 + (k % 3) * 6;
            a.burst([FWX + (k % 5) - 2 + 0.5, sg + 5, FWZ + 0.5], { n: 12, colors: ['#ffe8a0'], speed: 0.5, up: 20, life: 1.1, gravity: 4, spread: 0.3 });
            await a.wait(0.9);
            a.burst([tx, ty, tz], { n: 100, colors: sets[k], speed: 18, up: 2, life: 1.7, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      // 축제 천막, 긴 식탁, 무대
      const tent = (cx, cz, r, c1, c2) => {
        const g = sg + 1;
        let k = 0;
        for (let rr = r; rr > 0.4; rr -= 0.4, k++) {
          const R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz);
            if (d > rr || (k < 5 && d < rr - 1.1)) continue;
            const seg = Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 6));
            w.set(cx + dx, g + k, cz + dz, seg % 2 ? c1 : c2);
          }
        }
        w.box(cx, g + k, cz, cx, g + k + 4, cz, B.log); w.box(cx + 1, g + k + 2, cz, cx + 3, g + k + 4, cz, c1);
        w.box(cx - 1, g, cz + Math.ceil(r) - 1, cx + 1, g + 3, cz + Math.ceil(r), 0);
        return g + k + 5;
      };
      const t1 = tent(SX - 12, SZ - 8, 6, B.tentR, B.tentW);
      tent(SX + 12, SZ + 8, 5.4, B.tentY, B.tentW); tent(SX - 2, SZ + 13, 5, B.tentB, B.tentW);
      for (const tz of [SZ - 14, SZ - 11]) { w.box(SX - 4, sg + 2, tz, SX + 4, sg + 2, tz, B.cloth); for (const x of [SX - 4, SX, SX + 4]) w.set(x, sg + 1, tz, B.log); for (let x = SX - 3; x <= SX + 3; x += 2) w.set(x, sg + 3, tz, (x + tz) % 4 ? B.pie : B.pumpkin); }
      // 등불 가랜드(밤에 켜진다)
      const posts = [];
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.2, px = Math.round(SX + Math.cos(a) * 16.5), pz = Math.round(SZ + Math.sin(a) * 16.5), g = MH.g(w, px, pz); w.box(px, g + 1, pz, px, g + 11, pz, B.log); w.set(px, g + 12, pz, B.lampY); posts.push([px, g + 11, pz]); if (i % 3 === 0) lights.push({ p: [px + 0.5, g + 12, pz + 0.5], c: '#ffd070', i: 1, d: 14, flicker: 0.1, night: true }); }
      for (let i = 0; i < 10; i++) MH.garland(w, posts[i], posts[(i + 1) % 10], B.rope, [B.lampY, B.lampR], 2);
      landmarks.push({ name: '수확제 광장', note: '사흘 밤낮 꺼지지 않는 불', p: [SX + 0.5, sg + 20, SZ + 0.5], tag: 'FEST' });
      landmarks.push({ name: '축제 천막', note: '인형극과 점쟁이 천막', p: [SX - 11.5, t1 + 3, SZ - 7.5] });
      // ── 마을 집과 붉은 헛간 ──
      const hm = { found: B.found, wall: B.plaster, frame: B.frame, quoin: B.found, win: B.win, shutter: B.shutter, sill: B.frame, flower: B.leafR, door: B.door, roof: B.roofO, eave: B.roofE, ridge: B.frame, chimney: B.found, lamp: B.lampY };
      const chim = [];
      [[SX - 36, SZ - 14, 11, 9, 'e'], [SX + 24, SZ - 26, 10, 9, 's'], [SX + 26, SZ + 18, 11, 9, 'w'], [SX - 32, SZ + 14, 10, 9, 'e'], [SX - 6, SZ - 38, 12, 9, 's'], [SX - 24, SZ - 32, 10, 8, 's']].forEach(([x, z, sx, sz, face], k) => {
        const h = MH.houseX(w, { x, z, sx, sz, floors: k % 2 ? 2 : 1, fh: 6, face, studs: true, jetty: k % 2 === 1, dormers: k % 3 === 0 ? 1 : 0, m: Object.assign({}, hm, { roof: k % 2 ? B.roofBr : B.roofO }) });
        if (h.chimney && chim.length < 2) chim.push(h.chimney);
        if (k % 2 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      });
      const barn = MH.house(w, { x: 94, z: 66, sx: 18, sz: 13, fh: 10, face: 'w', pitch: 1, m: { found: B.found, wall: B.barnR, frame: B.barnW, win: B.win, door: B.barnW, roof: B.roofBr, eave: B.roofE, ridge: B.barnW } });
      w.box(93, barn.y + 1, 70, 93, barn.y + 7, 75, B.barnW); w.box(93, barn.y + 1, 71, 93, barn.y + 6, 74, B.door);
      for (const [hx, hz] of [[88, 84], [91, 87], [86, 80], [114, 82]]) { const g = MH.g(w, hx, hz); w.cyl(hx, hz, g + 1, g + 3, 1.8, B.hay); w.cyl(hx, hz, g + 4, g + 4, 1, B.hay); }
      const cg = MH.g(w, 86, 72); w.box(83, cg + 2, 70, 89, cg + 2, 74, B.cart); w.walls(83, cg + 3, 70, 89, cg + 3, 74, B.cart); w.box(84, cg + 3, 71, 88, cg + 4, 73, B.pumpkin); for (const [x, z] of [[83, 70], [89, 74], [83, 74], [89, 70]]) w.set(x, cg + 1, z, B.log);
      landmarks.push({ name: '붉은 헛간', note: '겨울 곡식을 쌓아 두는 곳', p: [103, barn.peak + 5, 72.5] });
      // ── 허수아비(호박밭) ──
      const scx = 100, scz = 106, scg = MH.g(w, scx, scz);
      w.box(scx, scg + 1, scz, scx, scg + 10, scz, B.log); w.box(scx - 4, scg + 8, scz, scx + 4, scg + 8, scz, B.log);
      w.box(scx - 1, scg + 5, scz, scx + 1, scg + 8, scz, B.shirt); w.box(scx - 3, scg + 8, scz, scx + 3, scg + 8, scz, B.shirt);
      w.box(scx - 1, scg + 10, scz, scx + 1, scg + 11, scz, B.pumpkin); w.box(scx - 1, scg + 12, scz, scx + 1, scg + 12, scz, B.straw); w.set(scx - 4, scg + 7, scz, B.straw); w.set(scx + 4, scg + 7, scz, B.straw);
      landmarks.push({ name: '호박밭', note: '허수아비가 지키는 밭', p: [scx + 0.5, scg + 18, scz + 0.5] });
      // ── 사과 과수원 ──
      for (let z = 10; z <= 36; z += 9) for (let x = 90; x <= 120; x += 9) {
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: 6, bark: B.bark, leaves: [w.pick([B.leafY, B.leafO]), B.leafO, B.leafR, B.apple], r: 3.6, branches: 3, spread: 3 });
      }
      landmarks.push({ name: '사과 과수원', note: '사과주의 재료가 자라는 곳', p: [104.5, base + 22, 22.5] });
      // ── 연못, 버드나무, 갈대, 낙엽 ──
      const wg = MH.g(w, 38, 94); MH.tree(w, 38, wg + 1, 94, { kind: 'willow', h: 12, bark: B.bark, leaves: [B.leafY, B.leafG, B.leafO], r: 5.4, trunkR: 1.3 });
      MH.scatter(w, 1300, (x, g, z, b) => {
        if ((wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1)) && w.chance(0.5)) w.box(x, g + 1, z, x, g + 3, z, B.reed);
        else if ((b === B.grass || b === B.grass2 || b === B.grass3) && w.chance(0.12)) w.set(x, g + 1, z, w.pick([B.leafO, B.leafR, B.leafY, B.grass3]));
      });
      for (let i = 0; i < 28; i++) {
        const x = w.ri(2, 125), z = w.ri(2, 125), g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || w.get(x, g, z) === B.soil || nearRoad(x, z) || MH.dist(x, z, SX, SZ) < 22 || wet(x, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 11), bark: B.bark, leaves: [w.pick([B.leafY, B.leafO, B.leafR]), B.leafO, B.leafR], r: w.r(3.4, 4.6) });
      }
      const smoke = chim.map(c => ({ n: 26, colors: ['#e8dcd0', '#c8bcb0'], mode: 'rise', speed: 0.6, area: [c[0], c[2], 0.6], y0: c[1], y1: c[1] + 18, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
