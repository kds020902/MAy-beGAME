// 황금들녘 — 구릉의 조각보 밭, 언덕 위 수확제 광장, 연못가 물레방앗간과 벌통 언덕 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 112;
  MAPS.push({
    id: 'harvest', cat: 'village', name: '황금들녘', en: 'Harvest Hollow', color: '#e0a040', seed: 151, base: 22, time: 'day', size: [W, D, Hh],
    desc: '가을걷이가 끝나면 사흘 밤낮 축제가 열리는 농촌 마을. 모닥불 주위로 온 마을이 춤을 춘다. 서쪽 연못가에는 물레방앗간이 햇밀을 빻고, 그 곁 벌통 언덕에서는 가을 꿀을 거둔다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '농부 가족 30여 호'], ['특산물', '호박 파이 · 사과주 · 메밀꿀'], ['명소', '수확제 광장 · 물레방앗간 · 벌통 언덕'], ['소문', '축제 마지막 밤에는 허수아비가 춤을 춘다']] },
    sky: ['#fbd29a', '#6a4a7c', '#ffe4a8'], stars: false,
    hemi: ['#ffe8c8', '#5a3a20', 0.56], sun: ['#ffd0a0', 0.78, [0.6, 0.8, 0.45]],
    liquid: ['#3a5a4a', '#5a8a6a', '#f0f0d0'], liqSpeed: 0.6,
    fog: { start: 0.8, floor: 12, depth: 10, haze: [28, 0.16, 6], hazeColor: '#f0c890' },
    camY: -6, zoom: 1.05,
    particles: [
      { n: 320, colors: ['#e07a2a', '#c84a2a', '#f0b83a'], mode: 'fall', speed: 0.3, wind: 0.8, y0: 22, y1: 74, glow: false },
      { n: 80, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], mode: 'rise', speed: 1.3, area: [84, 79, 3], y0: 38, y1: 66 },
    ],
    blocks: {
      grass: { c: '#6a4a30', top: '#9aa04a', v: 0.09 }, grass2: { c: '#6a4a30', top: '#b0a048', v: 0.09 }, grass3: { c: '#6a4a30', top: '#8a9a44', v: 0.09 },
      dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' }, path: { c: '#6a4a30', top: '#c8a878', v: 0.1 }, pathE: { c: '#6a4a30', top: '#b0905e', v: 0.1 },
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
      crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, sack: { c: '#d8c8a0', v: 0.05 }, millS: { c: '#9a9088', v: 0.05 }, flour: { c: '#f8f4ea', v: 0.02 },
      hive: { c: '#e8c060', v: 0.05, pat: 'plank' }, hiveR: { c: '#8a5a2a', v: 0.04 }, honey: { c: '#ffb020', glow: true },
      duck: { c: '#f4f0e4', v: 0.03 }, duckG: { c: '#2a7a4a', v: 0.04 }, beak: { c: '#f0a020', v: 0.03 }, lily: { c: '#4a8a3a', v: 0.06 },
      fire: { c: '#ff9a3a', glow: true }, fire2: { c: '#ffd060', glow: true },
      lampY: { c: '#ffe08a', night: true, day: '#e8c860' }, lampR: { c: '#ff7a5a', night: true, day: '#d86a50' },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, SX = 84, SZ = 79, PX = 31, PZ = 128;
      const dr = [[42, 121], [35, 125], [29, 130], [28, 135]];               // 오리 길
      const MX0 = 34, MZ0 = 95, MSX = 10, MSZ = 9, CHX = 47;          // 물레방앗간과 물길
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => base + 2 + n.fbm(x * 0.0213, z * 0.0213, 4) * 13 + Math.max(0, 8 - MH.dist(x, z, SX, SZ) * 0.137) - Math.max(0, 6 - MH.dist(x, z, PX, PZ) * 0.274),
        surface: (x, z, y, s) => s >= 3 ? B.rock : (() => { const f = n.fbm(x * 0.07 + 3, z * 0.07, 2); return f > 0.6 ? B.grass2 : f < 0.4 ? B.grass3 : B.grass; })(),
        under: (x, z, y, dep, s) => dep < 3 && s < 3 ? B.dirt : B.rock,
      });
      const lvl = MH.g(w, PX, PZ) + 4;
      MH.water(w, lvl, (x, z) => MH.dist(x, z, PX, PZ) < 18.4);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const lights = [], acts = [], landmarks = [];
      const roads = [[[SX, SZ], [62, 104], [56, 140], [44, 168]], [[SX, SZ], [123, 66], [168, 55]], [[SX, SZ], [89, 37], [79, 0]], [[SX, SZ], [110, 123], [123, 168]]];
      const nearRoad = (x, z) => roads.some(r => MH.polyDist(x, z, r) < 4.2);
      const nearMill = (x, z) => x > 22 && x < 80 && z > 84 && z < 126;
      // ── 조각보 밭 ──
      const crops = [[B.wheat], [B.stubble], [B.pumpkin], [null], [B.wheat]];
      for (let fz = 4; fz < 162; fz += 22) for (let fx = 4; fx < 162; fx += 25) {
        const cx = fx + 10, cz = fz + 9;
        if (MH.dist(cx, cz, SX, SZ) < 39 || MH.dist(cx, cz, PX, PZ) < 26 || (fx > 110 && fz < 52) || (fx > 110 && fz > 78 && fz < 118) || nearMill(cx, cz)) continue;
        const [crop] = crops[(fx * 3 + fz) % 5];
        for (let z = fz; z < fz + 18; z++) for (let x = fx; x < fx + 21; x++) {
          const g = MH.g(w, x, z);
          if (g < 0 || nearRoad(x, z) || wet(x, z) || nearMill(x, z)) continue;
          w.set(x, g, z, B.soil);
          if (crop === B.pumpkin) { if ((x + z * 3) % 5 === 0) { w.set(x, g + 1, z, B.pumpkin); w.set(x, g + 2, z, B.stem); } else if ((x + z) % 2 === 0) w.set(x, g + 1, z, B.leafG); }
          else if (crop && (z - fz) % 2 === 0) { w.set(x, g + 1, z, crop); if (crop === B.wheat && hash3(x, 1, z) > 0.5) w.set(x, g + 2, z, crop); }
        }
        for (let x = fx - 1; x <= fx + 21; x++) for (const z of [fz - 1, fz + 18]) { const g = MH.g(w, x, z); if (g > 0 && !nearRoad(x, z) && !wet(x, z) && !nearMill(x, z) && !w.get(x, g + 1, z)) { w.set(x, g + 1, z, B.hedge); if (hash3(x, 3, z) > 0.4) w.set(x, g + 2, z, B.hedge); } }
        if (crop === B.stubble) for (const [ox, oz] of [[6, 6], [14, 11]]) { const g = MH.g(w, fx + ox, fz + oz); if (nearRoad(fx + ox, fz + oz)) continue; w.cyl(fx + ox, fz + oz, g + 1, g + 3, 1.8, B.hay); w.cyl(fx + ox, fz + oz, g + 4, g + 4, 1, B.hay); }
      }
      for (const r of roads) MH.path(w, r, 2.6, B.path, B.pathE);
      // ── 수확제 광장 ──
      const sg = MH.g(w, SX, SZ);
      for (let z = SZ - 24; z <= SZ + 24; z++) for (let x = SX - 24; x <= SX + 24; x++) { const d = MH.dist(x, z, SX, SZ); if (d < 24.5) MH.setH(w, x, z, sg, d < 19.6 ? B.cobble : d < 20.6 ? B.found : B.path, B.dirt); }
      MH.skirt(w, SX - 17, SZ - 17, SX + 17, SZ + 17, sg, { R: 12, rate: 0.6, surf: () => B.grass, fill: B.dirt });
      w.ring(SX, SZ, sg + 1, 5.6, 7, B.rock); w.ring(SX, SZ, sg + 2, 6, 7, B.found);
      for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; w.line(SX + Math.cos(a) * 5, sg + 1, SZ + Math.sin(a) * 5, SX + Math.cos(a) * 0.8, sg + 10, SZ + Math.sin(a) * 0.8, B.log); }
      w.box(SX - 1, sg + 1, SZ - 1, SX + 1, sg + 5, SZ + 1, B.fire); w.box(SX, sg + 6, SZ, SX, sg + 11, SZ, B.fire2); w.set(SX - 1, sg + 6, SZ, B.fire); w.set(SX, sg + 6, SZ + 1, B.fire); w.set(SX + 1, sg + 7, SZ, B.fire);
      // 장작 더미와 통나무 의자
      for (const [x, z] of [[SX + 9, SZ + 2], [SX - 9, SZ - 2], [SX + 2, SZ - 9]]) { w.box(x - 1, sg + 1, z, x + 1, sg + 1, z, B.log); }
      w.box(SX + 5, sg + 1, SZ + 8, SX + 7, sg + 2, SZ + 9, B.log); w.box(SX + 6, sg + 3, SZ + 8, SX + 6, sg + 3, SZ + 9, B.log);
      lights.push({ name: 'fire', p: [SX + 0.5, sg + 9, SZ + 0.5], c: '#ff9a40', i: 2.2, d: 36, flicker: 0.4 });
      acts.push({
        name: '수확제 모닥불', hint: '장작을 던지면 불길이 치솟아요', hit: [SX - 5, sg + 1, SZ - 5, SX + 5, sg + 11, SZ + 5],
        run: async a => { a.flash('fire', 3, 3.2); for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, sg + 10, SZ + 0.5], { n: 50, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3.4, up: 11, life: 1.8, gravity: 1.5, spread: 2.8 }); await a.wait(0.45); } },
      });
      // 메이폴(부품): 받침은 월드에, 기둥과 리본이 돈다
      const MPX = SX + 13, MPZ = SZ - 12;
      w.cyl(MPX, MPZ, sg + 1, sg + 1, 2, B.rock);
      const pole = w.prop({ name: 'maypole', pivot: [MPX + 0.5, sg + 2, MPZ + 0.5], axis: 'y', speed: 0.25 });
      pole.box(MPX, sg + 2, MPZ, MPX, sg + 27, MPZ, B.barnW); pole.set(MPX, sg + 28, MPZ, B.tentY);
      pole.cyl(MPX, MPZ, sg + 25, sg + 25, 2.2, B.hedge); pole.ring(MPX, MPZ, sg + 24, 1.4, 2.4, B.leafO);
      [B.rib1, B.rib2, B.rib3, B.rib4, B.rib1, B.rib2, B.rib3, B.rib4].forEach((rb, k) => { const a = k / 8 * Math.PI * 2; pole.line(MPX + Math.cos(a) * 1.8, sg + 24, MPZ + Math.sin(a) * 1.8, MPX + Math.cos(a) * 9, sg + 4, MPZ + Math.sin(a) * 9, rb); });
      acts.push({ name: '메이폴', hint: '리본이 빙글빙글 돌아요', hit: [MPX - 2, sg + 1, MPZ - 2, MPX + 2, sg + 28, MPZ + 2], run: async a => { await a.spin('maypole', 10, 3.8); } });
      // 불꽃놀이 발사대
      const FWX = SX - 14, FWZ = SZ + 14;
      w.box(FWX - 3, sg + 1, FWZ - 1, FWX + 3, sg + 1, FWZ + 1, B.log); w.box(FWX - 3, sg + 2, FWZ + 1, FWX + 3, sg + 2, FWZ + 1, B.crate);
      for (const [dx, c] of [[-2, B.rib1], [-1, B.rib3], [0, B.rib2], [1, B.rib4], [2, B.rib1]]) { w.box(FWX + dx, sg + 2, FWZ, FWX + dx, sg + 5, FWZ, c); w.set(FWX + dx, sg + 6, FWZ, B.cloth); }
      acts.push({
        name: '불꽃놀이', hint: '축제 하늘에 불꽃이 터져요(밤에 더 예뻐요)', hit: [FWX - 3, sg + 1, FWZ - 1, FWX + 3, sg + 6, FWZ + 1],
        run: async a => {
          const sets = [['#ff5a5a', '#ffd0d0'], ['#ffe060', '#ffffff'], ['#6ab0ff', '#d0e8ff'], ['#a0ff7a', '#ffe060'], ['#ff7ae0', '#ffffff'], ['#ffb04a', '#ffe8a0']];
          for (let k = 0; k < 6; k++) {
            const tx = FWX + (k - 2.5) * 10, tz = FWZ - 8 + (k % 2) * 10, ty = sg + 44 + (k % 3) * 7;
            a.burst([FWX + (k % 5) - 2 + 0.5, sg + 6, FWZ + 0.5], { n: 12, colors: ['#ffe8a0'], speed: 0.5, up: 22, life: 1.1, gravity: 4, spread: 0.3 });
            await a.wait(0.9);
            a.burst([tx, ty, tz], { n: 110, colors: sets[k], speed: 20, up: 2, life: 1.7, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      // 축제 천막(줄무늬 원뿔 + 꼭대기 장식 기둥), 긴 식탁
      const tent = (cx, cz, r, c1, c2) => {
        const g = sg + 1;
        let k = 0;
        for (let rr = r; rr > 0.4; rr -= 0.4, k++) {
          const R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz);
            if (d > rr || (k < 6 && d < rr - 1.1)) continue;
            const seg = Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 6));
            w.set(cx + dx, g + k, cz + dz, k === 6 ? B.tentY : seg % 2 ? c1 : c2);
          }
        }
        // 처마 술 장식(물결 테두리)
        for (let a = 0; a < Math.PI * 2; a += 0.5 / r) { const x = Math.round(cx + Math.cos(a) * (r + 0.4)), z = Math.round(cz + Math.sin(a) * (r + 0.4)); if (!w.get(x, g + 5, z) && Math.round(a * r) % 2 === 0) w.set(x, g + 5, z, c1); }
        w.box(cx, g + k, cz, cx, g + k + 2, cz, B.log); w.set(cx, g + k + 3, cz, B.lampY);
        w.box(cx - 1, g, cz + Math.ceil(r) - 1, cx + 1, g + 3, cz + Math.ceil(r), 0);
        w.box(cx - 2, g, cz + Math.ceil(r), cx - 2, g + 3, cz + Math.ceil(r), B.log); w.box(cx + 2, g, cz + Math.ceil(r), cx + 2, g + 3, cz + Math.ceil(r), B.log);
        return g + k + 4;
      };
      const t1 = tent(SX - 16, SZ - 10, 7.5, B.tentR, B.tentW);
      tent(SX + 16, SZ + 10, 7, B.tentY, B.tentW); tent(SX - 3, SZ + 17, 6.5, B.tentB, B.tentW);
      for (const tz of [SZ - 18, SZ - 14]) { w.box(SX - 5, sg + 2, tz, SX + 5, sg + 2, tz, B.cloth); for (const x of [SX - 5, SX, SX + 5]) w.set(x, sg + 1, tz, B.log); for (let x = SX - 4; x <= SX + 4; x += 2) w.set(x, sg + 3, tz, (x + tz) % 4 ? B.pie : B.pumpkin); for (const dz of [-1, 1]) w.box(SX - 4, sg + 1, tz + dz, SX + 4, sg + 1, tz + dz, B.cart); }
      // 호박 더미와 짚단(광장 가장자리)
      for (const [x, z] of [[SX + 20, SZ - 4], [SX - 20, SZ + 5], [SX + 6, SZ + 20]]) { w.cyl(x, z, sg + 1, sg + 1, 2, B.pumpkin); w.set(x, sg + 2, z, B.pumpkin); w.set(x, sg + 3, z, B.stem); w.box(x + 3, sg + 1, z, x + 4, sg + 2, z + 1, B.hay); }
      // 등불 가랜드(밤에 켜진다)
      const posts = [];
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2, px = Math.round(SX + Math.cos(a) * 21.5), pz = Math.round(SZ + Math.sin(a) * 21.5), g = MH.g(w, px, pz); w.set(px, g + 1, pz, B.found); w.box(px, g + 2, pz, px, g + 12, pz, B.log); w.set(px, g + 13, pz, B.lampY); posts.push([px, g + 12, pz]); if (i % 3 === 0) lights.push({ p: [px + 0.5, g + 13, pz + 0.5], c: '#ffd070', i: 1, d: 16, flicker: 0.1, night: true }); }
      for (let i = 0; i < 12; i++) MH.garland(w, posts[i], posts[(i + 1) % 12], B.rope, [B.lampY, B.lampR], 2);
      landmarks.push({ name: '수확제 광장', note: '사흘 밤낮 꺼지지 않는 불', p: [SX + 0.5, sg + 24, SZ + 0.5], tag: 'FEST' });
      landmarks.push({ name: '축제 천막', note: '인형극과 점쟁이 천막', p: [SX - 15.5, t1 + 3, SZ - 9.5] });
      // ── 마을 집과 붉은 헛간 ──
      const hm = { found: B.found, wall: B.plaster, frame: B.frame, quoin: B.found, win: B.win, shutter: B.shutter, sill: B.frame, flower: B.leafR, door: B.door, roof: B.roofO, eave: B.roofE, ridge: B.frame, chimney: B.found, lamp: B.lampY };
      const chim = [];
      [[SX - 47, SZ - 18, 12, 10, 'e'], [SX + 31, SZ - 34, 12, 10, 's'], [SX + 34, SZ + 24, 13, 10, 'w'], [SX - 50, SZ - 2, 12, 10, 'e'], [SX - 8, SZ - 50, 14, 10, 's'], [SX - 31, SZ - 42, 12, 9, 's']].forEach(([x, z, sx, sz, face], k) => {
        const h = MH.houseX(w, { x, z, sx, sz, floors: k % 2 ? 2 : 1, fh: 6, face, studs: true, jetty: k % 2 === 1, dormers: k % 3 === 0 ? 1 : 0, m: Object.assign({}, hm, { roof: k % 2 ? B.roofBr : B.roofO }) });
        if (h.chimney && chim.length < 3) chim.push(h.chimney);
        if (k % 2 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
        // 집 둘레: 장작더미, 물통, 꽃 화분, 작은 텃밭 울타리
        const gx = face === 'e' ? h.x1 + 3 : face === 'w' ? h.x0 - 3 : h.x0 + 1, gz = face === 's' ? h.z1 + 3 : h.z0 + 1;
        const gy = MH.g(w, gx, gz);
        if (!w.get(gx, gy + 1, gz)) { w.box(gx, gy + 1, gz, gx, gy + 2, gz + 1, B.log); w.set(gx, gy + 3, gz, B.crate); }
        const bx = h.x1 + 2, bz = h.z1 - 1, by = MH.g(w, bx, bz);
        if (!w.get(bx, by + 1, bz)) { w.set(bx, by + 1, bz, B.crate); w.set(bx, by + 2, bz, k % 2 ? B.pumpkin : B.apple); }
      });
      const barn = MH.house(w, { x: 123, z: 87, sx: 22, sz: 16, fh: 12, face: 'w', pitch: 1, m: { found: B.found, wall: B.barnR, frame: B.barnW, win: B.win, door: B.barnW, roof: B.roofBr, eave: B.roofE, ridge: B.barnW } });
      w.box(122, barn.y + 1, 91, 122, barn.y + 9, 98, B.barnW); w.box(122, barn.y + 1, 92, 122, barn.y + 8, 97, B.door);
      for (let k = 0; k < 6; k++) { w.set(122, barn.y + 2 + k, 92 + k, B.barnW); w.set(122, barn.y + 2 + k, 97 - k, B.barnW); }
      w.box(122, barn.y + 10, 94, 122, barn.y + 11, 95, B.win);
      for (const [hx, hz] of [[116, 110], [119, 114], [113, 105], [150, 108]]) { const g = MH.g(w, hx, hz); w.cyl(hx, hz, g + 1, g + 3, 2.2, B.hay); w.cyl(hx, hz, g + 4, g + 4, 1.2, B.hay); }
      const cg = MH.g(w, 113, 94); w.box(109, cg + 2, 92, 117, cg + 2, 97, B.cart); w.walls(109, cg + 3, 92, 117, cg + 3, 97, B.cart); w.box(110, cg + 3, 93, 116, cg + 4, 96, B.pumpkin); for (const [x, z] of [[109, 92], [117, 97], [109, 97], [117, 92]]) w.set(x, cg + 1, z, B.log);
      // 헛간 앞 울타리 마당
      MH.fence(w, [[119, 104], [119, 112], [146, 112], [146, 104]], B.log, B.cart);
      landmarks.push({ name: '붉은 헛간', note: '겨울 곡식을 쌓아 두는 곳', p: [134, barn.peak + 6, 95] });
      // 헛간 안으로: 서쪽 두 쪽 큰 문(x122, z92..97)
      acts.push(OR.goAct({ at: [121, barn.y + 1, 94], h: 3, name: '붉은 헛간 안으로', goto: 'harvest-barn', hint: '두 쪽 큰 문을 밀고 들어가 탈곡 마당과 건초 다락이 있는 헛간 안을 구경해요', hit: [122, barn.y + 1, 92, 122, barn.y + 8, 97] }));
      // ── 허수아비(호박밭) ──
      const scx = 131, scz = 139, scg = MH.g(w, scx, scz);
      // 기둥 아랫부분만 땅에 박히고, 윗몸(부품)은 바람에 빙글 돈다
      w.box(scx, scg + 1, scz, scx, scg + 4, scz, B.log);
      const sc = w.prop({ name: 'scarecrow', pivot: [scx + 0.5, scg + 5, scz + 0.5], axis: 'y' });
      sc.box(scx, scg + 5, scz, scx, scg + 10, scz, B.log); sc.box(scx - 4, scg + 8, scz, scx + 4, scg + 8, scz, B.log);
      sc.box(scx - 1, scg + 5, scz, scx + 1, scg + 8, scz, B.shirt); sc.box(scx - 3, scg + 8, scz, scx + 3, scg + 8, scz, B.shirt);
      sc.box(scx - 1, scg + 10, scz, scx + 1, scg + 11, scz, B.pumpkin); sc.box(scx - 1, scg + 12, scz, scx + 1, scg + 12, scz, B.straw); sc.set(scx - 4, scg + 7, scz, B.straw); sc.set(scx + 4, scg + 7, scz, B.straw);
      acts.push({
        name: '허수아비', hint: '허수아비가 빙글 돌자 호박밭의 까마귀들이 놀라 날아가요', hit: [scx - 4, scg + 1, scz - 1, scx + 4, scg + 12, scz + 1],
        run: async a => {
          a.turn('scarecrow', [0, Math.PI * 4, 0], 2.6);
          for (let k = 0; k < 6; k++) { const ang = k * 1.05; a.burst([scx + 0.5 + Math.cos(ang) * 5, scg + 2, scz + 0.5 + Math.sin(ang) * 5], { n: 6, colors: ['#1a1a20', '#2a2a34', '#3a3a44'], speed: 4, up: 5, life: 2.4, gravity: -0.8, spread: 1 }); await a.wait(0.3); }
          await a.wait(0.8);
          a.unwind('scarecrow');
          a.burst([scx + 0.5, scg + 9, scz + 0.5], { n: 18, colors: ['#e0c070', '#dcb456'], speed: 2.5, up: 1, life: 1.6, gravity: 2, spread: 1.5 });
        },
      });
      landmarks.push({ name: '호박밭', note: '허수아비가 지키는 밭', p: [scx + 0.5, scg + 18, scz + 0.5] });
      // ── 사과 과수원 ──
      for (let z = 14; z <= 46; z += 10) for (let x = 118; x <= 158; x += 10) {
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || nearRoad(x, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: 7, bark: B.bark, leaves: [w.pick([B.leafY, B.leafO]), B.leafO, B.leafR, B.apple], r: 4, branches: 3, spread: 3 });
        if (hash3(x, 5, z) > 0.5) { w.set(x + 3, g + 1, z + 2, B.apple); w.set(x + 2, g + 1, z + 3, B.crate); }
      }
      landmarks.push({ name: '사과 과수원', note: '사과주의 재료가 자라는 곳', p: [138.5, base + 24, 30.5] });

      // ── 새 구역: 연못가 물레방앗간과 벌통 언덕 ──
      // 연못에서 북쪽으로 물길을 끌어 방앗간 동쪽 벽 옆 물레 아래로 흐르게 한다
      MH.river(w, [[CHX, MZ0 - 3], [CHX, MZ0 + 10], [CHX - 2, PZ - 12]], 2.4, lvl, B.rock, B.pathE);
      const mill = MH.houseX(w, { x: MX0, z: MZ0, sx: MSX, sz: MSZ, floors: 2, fh: 6, face: 's', studs: true, jetty: true, dormers: 1, m: Object.assign({}, hm, { wall: B.millS, roof: B.roofBr, quoin: B.rock }) });
      if (mill.chimney) chim.push(mill.chimney);
      lights.push({ p: [mill.door[0] + 0.5, mill.door[1] + 3, mill.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      // 굴대 받침과 물레(부품): 축은 x, 연못 물에 바퀴 아래가 잠긴다
      const WZ = MZ0 + 4, WY = lvl + 3, WR = 5;
      w.box(MX0 + MSX, WY - 1, WZ, MX0 + MSX + 4, WY - 1, WZ, B.log);
      w.box(CHX + 3, lvl - 2, WZ, CHX + 3, WY - 2, WZ, B.found); w.set(CHX + 3, WY - 1, WZ, B.log);
      const wheel = w.prop({ name: 'millwheel', pivot: [CHX + 0.5, WY + 0.5, WZ + 0.5], axis: 'x', speed: 0.35, clipOK: 14 });
      for (const x of [CHX - 1, CHX + 1]) { MH.ringProp(wheel, x, WY, WZ, WR, 'yz', B.log); MH.ringProp(wheel, x, WY, WZ, WR - 1.6, 'yz', B.cart); }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; wheel.line(CHX, WY, WZ, CHX, WY + Math.sin(a) * WR, WZ + Math.cos(a) * WR, B.log); wheel.line(CHX - 1, WY + Math.sin(a) * (WR - 0.4), WZ + Math.cos(a) * (WR - 0.4), CHX + 1, WY + Math.sin(a) * (WR - 0.4), WZ + Math.cos(a) * (WR - 0.4), B.cart); }
      wheel.box(CHX - 1, WY, WZ, CHX + 1, WY, WZ, B.found);
      // 방앗간 앞: 밀가루 포대, 맷돌, 짐수레
      const my = mill.y;
      for (const [x, z] of [[MX0 + 1, MZ0 + MSZ + 2], [MX0 + 2, MZ0 + MSZ + 2], [MX0 + 1, MZ0 + MSZ + 3], [MX0 + 8, MZ0 + MSZ + 2]]) { const g = MH.g(w, x, z); w.set(x, g + 1, z, B.sack); if (hash3(x, 2, z) > 0.4) w.set(x, g + 2, z, B.sack); }
      const sgx = MX0 + 6, sgz = MZ0 + MSZ + 4, sgg = MH.g(w, sgx, sgz);
      w.cyl(sgx, sgz, sgg + 1, sgg + 1, 1.8, B.millS); w.set(sgx, sgg + 1, sgz, B.found); w.set(sgx, sgg + 2, sgz, B.flour);
      // 둑 위 버드나무와 갈대, 연잎
      const wg = MH.g(w, 18, 112); MH.tree(w, 18, wg + 1, 112, { kind: 'willow', h: 13, bark: B.bark, leaves: [B.leafY, B.leafG, B.leafO], r: 6, trunkR: 1.4 });
      for (let k = 0; k < 14; k++) { const a = k * 0.9, x = Math.round(PX + Math.cos(a) * (6 + (k % 4) * 2.5)), z = Math.round(PZ + Math.sin(a) * (6 + (k % 4) * 2.5)); if (wet(x, z) && MH.dist(x, z, CHX, WZ) > 9 && MH.polyDist(x, z, dr) > 3.5) w.set(x, lvl, z, B.lily); }
      landmarks.push({ name: '물레방앗간', note: '연못 물길로 물레를 돌려 햇밀을 빻는 곳', p: [MX0 + 5, mill.peak + 8, MZ0 + 4.5], tag: 'MILL' });
      // 방앗간 안으로: 남쪽 문(x38..39, z103). 문 바로 안쪽 한 줄은 막아 돌아올 때 문 밖에 선다
      w.box(mill.door[0] - 1, my + 1, mill.door[2] - 1, mill.door[0] + 2, my + 8, mill.door[2] - 1, B.millS);
      acts.push(OR.goAct({ at: [mill.door[0], my + 1, mill.door[2] + 2], h: 3, name: '물레방앗간 안으로', goto: 'harvest-mill', hint: '문을 열고 들어가 맷돌방과 빵 굽는 부엌, 곡물 다락을 구경해요', hit: [mill.door[0], my + 1, mill.door[2], mill.door[0] + 1, my + 4, mill.door[2]] }));
      acts.push({
        name: '물레방아', hint: '수문을 열면 물살에 물레가 힘차게 돌고 방앗간에서 밀가루가 폴폴 날려요', hit: [CHX - 1, WY - WR, WZ - WR, CHX + 1, WY + WR, WZ + WR],
        run: async a => {
          const sp = a.spin('millwheel', 9, 4.4);
          for (let k = 0; k < 8; k++) {
            a.burst([CHX + 0.5, lvl + 1, WZ + 0.5 + (k % 2 ? 3 : -3)], { n: 18, colors: ['#ffffff', '#d8f0ff', '#a8d0c0'], speed: 3, up: 4, life: 0.9, gravity: 9, spread: 1.2 });
            if (k % 2) a.burst([mill.door[0] + 0.5, my + 3, MZ0 + MSZ + 1.5], { n: 16, colors: ['#ffffff', '#f8f4ea', '#e8e0d0'], speed: 1.4, up: 1.6, life: 1.8, gravity: -0.2, spread: 1.4 });
            await a.wait(0.5);
          }
          await sp;
        },
      });
      // 벌통 언덕: 방앗간 동쪽 낮은 둔덕 위 벌통 줄과 꽃밭
      const HXc = 71, HZc = 116, hg = MH.g(w, HXc, HZc);
      MH.flatten(w, HXc - 5, HZc - 6, HXc + 5, HZc + 6, hg, B.grass2, B.dirt);
      MH.fence(w, [[HXc - 6, HZc - 7], [HXc + 6, HZc - 7], [HXc + 6, HZc + 7]], B.log, B.cart);
      const hives = [];
      for (const [dx, dz] of [[-3, -3], [1, -3], [-3, 1], [1, 1], [-3, 5]]) {
        const x = HXc + dx, z = HZc + dz;
        w.box(x, hg + 1, z, x + 1, hg + 1, z + 1, B.log);
        w.box(x, hg + 2, z, x + 1, hg + 4, z + 1, B.hive); w.box(x, hg + 3, z, x + 1, hg + 3, z + 1, B.hiveR);
        w.box(x, hg + 5, z, x + 1, hg + 5, z + 1, B.roofE); w.set(x + 1, hg + 2, z + 1, B.honey);
        hives.push([x + 1, hg + 3, z + 1]);
      }
      for (let z = HZc - 5; z <= HZc + 6; z++) for (let x = HXc + 3; x <= HXc + 5; x++) if (!w.get(x, hg + 1, z) && hash3(x, 4, z) > 0.3) w.set(x, hg + 1, z, w.pick([B.rib3, B.leafY, B.rib1, B.hedge]));
      // 꿀 항아리 선반(밤에 은은히 빛난다)
      w.box(HXc - 5, hg + 1, HZc + 5, HXc - 5, hg + 3, HZc + 6, B.crate); w.set(HXc - 5, hg + 4, HZc + 5, B.honey); w.set(HXc - 5, hg + 4, HZc + 6, B.honey);
      lights.push({ name: 'hive', p: [HXc - 4.5, hg + 5, HZc + 5.5], c: '#ffc050', i: 0.9, d: 12, flicker: 0.15 });
      // 뚜껑 열리는 큰 벌통(부품)
      const BHX = HXc + 1, BHZ = HZc + 5;
      w.box(BHX, hg + 1, BHZ, BHX + 1, hg + 1, BHZ + 1, B.log); w.box(BHX, hg + 2, BHZ, BHX + 1, hg + 4, BHZ + 1, B.hive); w.box(BHX, hg + 3, BHZ, BHX + 1, hg + 3, BHZ + 1, B.hiveR); w.set(BHX + 1, hg + 2, BHZ + 1, B.honey);
      const lid = w.prop({ name: 'hivelid', pivot: [BHX, hg + 5, BHZ + 1], axis: 'x' });
      lid.box(BHX, hg + 5, BHZ, BHX + 1, hg + 5, BHZ + 1, B.roofE); lid.set(BHX, hg + 6, BHZ, B.hiveR);
      acts.push({
        name: '꿀벌 떼', hint: '벌통 뚜껑을 열자 꿀벌 떼가 윙윙 날아올라 꽃밭을 한 바퀴 돌아요', hit: [HXc - 4, hg + 1, HZc - 4, HXc + 3, hg + 6, HZc + 7],
        run: async a => {
          await a.turn('hivelid', [0, 0, 1.2], 0.6);
          a.flash('hive', 2.4, 3.5);
          for (let k = 0; k < 18; k++) {
            const t = k / 18 * Math.PI * 2, r = 3 + k * 0.25;
            a.burst([HXc + 0.5 + Math.cos(t) * r, hg + 4 + Math.sin(k * 0.7) * 1.5 + k * 0.15, HZc + 0.5 + Math.sin(t) * r], { n: 8, colors: ['#ffd020', '#2a2018', '#ffe880'], speed: 1.6, up: 0.8, life: 1.2, gravity: 0, spread: 0.6 });
            if (k % 6 === 0) for (const h of hives) a.burst([h[0], h[1] + 1, h[2]], { n: 6, colors: ['#ffd020', '#2a2018'], speed: 1.2, up: 1.2, life: 1, gravity: 0, spread: 0.5 });
            await a.wait(0.18);
          }
          await a.turn('hivelid', [0, 0, 0], 0.6);
        },
      });
      landmarks.push({ name: '벌통 언덕', note: '메밀꽃 꿀을 거두는 벌통 줄', p: [HXc + 0.5, hg + 12, HZc + 0.5] });
      // 연못 오리 가족: 연잎 사이를 가로질러 헤엄친다
      MH.routeOK(w, dr, 1, '오리 길');
      const DX = dr[0][0], DZ = dr[0][1], DY = lvl + 1;
      const duck = w.prop({ name: 'ducks', pivot: [DX + 0.5, DY, DZ + 0.5], axis: 'x', bob: 0.1, bobSpeed: 2 });
      for (const [ox, oz, s] of [[0, 0, 1], [-3, 1, 0], [-5, -1, 0]]) {
        duck.box(DX + ox - s, DY, DZ + oz, DX + ox + 1, DY, DZ + oz, B.duck);
        if (s) duck.box(DX + ox - 1, DY, DZ + oz - 1, DX + ox, DY, DZ + oz + 1, B.duck);
        duck.set(DX + ox + 1, DY + 1, DZ + oz, s ? B.duckG : B.duck); duck.set(DX + ox + 2, DY + 1, DZ + oz, B.beak);
      }
      // 헤엄쳐 건넌 뒤 날아올라 서쪽 하늘 너머로 사라진다
      const dDrive = dr.slice(1).map(([x, z]) => [x - DX, 0, z - DZ]).concat([[27 - DX, 5, 134 - DZ], [-16 - DX, 20, 142 - DZ]]);
      acts.push({
        name: '연못 오리', hint: '오리 가족이 연잎 사이로 연못을 가로질러 헤엄치다 날아올라 서쪽 하늘로 떠나요', hit: [DX - 6, DY, DZ - 2, DX + 3, DY + 2, DZ + 2],
        run: async a => {
          const pr = a.drive('ducks', dDrive, 9, { fwd: '+x', back: 1.0 });
          for (let k = 0; k < 4; k++) { const p = dr[k]; a.burst([p[0] + 0.5, DY + 0.3, p[1] + 0.5], { n: 10, colors: ['#ffffff', '#d8f0e0'], speed: 1.2, up: 0.6, life: 0.8, gravity: 2, spread: 1, flat: true }); await a.wait(1); }
          a.burst([28.5, DY + 2, 134.5], { n: 24, colors: ['#ffffff', '#d8f0e0', '#f4f0e4'], speed: 2.5, up: 2, life: 1, gravity: 4, spread: 1.5 });
          await pr;
        },
      });

      // ── 연못가 갈대, 낙엽, 나무 ──
      MH.scatter(w, 2300, (x, g, z, b) => {
        if ((wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1)) && w.chance(0.5) && MH.dist(x, z, CHX, WZ) > 7) w.box(x, g + 1, z, x, g + 3, z, B.reed);
        else if ((b === B.grass || b === B.grass2 || b === B.grass3) && w.chance(0.12)) w.set(x, g + 1, z, w.pick([B.leafO, B.leafR, B.leafY, B.grass3]));
      });
      for (let i = 0; i < 36; i++) {
        const x = w.ri(3, W - 4), z = w.ri(3, D - 4), g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || w.get(x, g, z) === B.soil || nearRoad(x, z) || nearMill(x, z) || MH.dist(x, z, SX, SZ) < 29 || wet(x, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(8, 12), bark: B.bark, leaves: [w.pick([B.leafY, B.leafO, B.leafR]), B.leafO, B.leafR], r: w.r(3.8, 5) });
      }
      // 길가 가로등
      for (const [x, z] of [[73, 95], [100, 103], [106, 60], [86, 52], [60, 120], [140, 61]]) { if (w.get(x, MH.g(w, x, z) + 1, z)) continue; const p = MH.lamp(w, x, z, { h: 6, dir: 'x', m: { found: B.found, post: B.log, glow: B.lampY } }); }
      // ── 사과주 압착기: 나사가 돌며 내려가 사과즙이 흘러나온다 ──
      const CPX = SX - 14, CPZ = SZ + 4;
      w.cyl(CPX, CPZ, sg + 1, sg + 2, 2.2, B.log); w.cyl(CPX, CPZ, sg + 2, sg + 2, 1.2, B.apple);
      w.box(CPX, sg + 1, CPZ + 3, CPX, sg + 1, CPZ + 3, B.cart); w.set(CPX, sg + 2, CPZ + 3, B.pie);
      for (const x of [CPX - 3, CPX + 3]) w.box(x, sg + 1, CPZ, x, sg + 10, CPZ, B.log);
      w.box(CPX - 3, sg + 11, CPZ, CPX + 3, sg + 11, CPZ, B.log);
      for (const [x, z] of [[CPX - 4, CPZ + 2], [CPX + 4, CPZ + 2]]) { w.box(x, sg + 1, z, x, sg + 2, z, B.crate); w.set(x, sg + 3, z, B.apple); }
      const press = w.prop({ name: 'press', pivot: [CPX + 0.5, sg + 6, CPZ + 0.5], axis: 'y' });
      press.box(CPX, sg + 5, CPZ, CPX, sg + 10, CPZ, B.rock); press.cyl(CPX, CPZ, sg + 4, sg + 4, 1.5, B.cart);
      press.box(CPX - 2, sg + 8, CPZ, CPX + 2, sg + 8, CPZ, B.log); press.box(CPX, sg + 8, CPZ - 2, CPX, sg + 8, CPZ + 2, B.log);
      acts.push({
        name: '사과주 압착기', hint: '나사를 돌려 누르면 사과즙이 쭉 흘러나와요', hit: [CPX - 3, sg + 1, CPZ - 2, CPX + 3, sg + 11, CPZ + 3],
        run: async a => {
          await a.tween('press', { off: [0, -1.5, 0], rot: [0, Math.PI * 3, 0] }, 2.4, t => t);
          for (let k = 0; k < 6; k++) { a.burst([CPX + 0.5, sg + 2.5, CPZ + 3.5], { n: 16, colors: ['#e8a83a', '#f0c860', '#c8702a'], speed: 1, up: 1, life: 0.8, gravity: 10, spread: 0.3 }); a.burst([CPX + 0.5, sg + 3, CPZ + 0.5], { n: 8, colors: ['#c8302a', '#e8b83a'], speed: 2.5, up: 2, life: 0.6, gravity: 8, spread: 1.2 }); await a.wait(0.35); }
          await a.tween('press', { off: [0, 0, 0], rot: [0, 0, 0] }, 2, t => t);
        },
      });
      // ── 호박 수레: 남쪽 길에서 호박을 싣고 광장 앞까지 온다 ──
      const route = [[115, 138], [110, 122], [101, 107]];
      const WX = route[0][0], WZc = route[0][1], wy = MH.maxG(w, WX - 2, WZc - 5, WX + 2, WZc + 2);
      const cart = w.prop({ name: 'pcart', pivot: [WX + 0.5, wy + 1, WZc + 0.5] });
      cart.box(WX - 1, wy + 2, WZc - 2, WX + 1, wy + 2, WZc + 2, B.cart); cart.walls(WX - 1, wy + 3, WZc - 2, WX + 1, wy + 3, WZc + 2, B.cart);
      cart.box(WX - 1, wy + 3, WZc - 1, WX + 1, wy + 4, WZc + 1, B.pumpkin); cart.set(WX, wy + 5, WZc, B.pumpkin); cart.set(WX, wy + 6, WZc, B.stem);
      for (const [dx, dz] of [[-2, -1], [2, -1], [-2, 1], [2, 1]]) cart.box(WX + dx, wy + 1, WZc + dz, WX + dx, wy + 2, WZc + dz, B.log);
      cart.box(WX, wy + 2, WZc - 4, WX, wy + 2, WZc - 3, B.log); cart.box(WX - 1, wy + 2, WZc - 5, WX + 1, wy + 2, WZc - 5, B.log);
      // 광장 앞에서 호박을 내려놓고 동쪽 큰길을 따라 들녘 밖으로 떠난다
      const far = [[106, 99], [110, 88], [116, 72], [123, 66], [145, 61], [166, 56], [178, 53]];
      const cDrive = route.slice(1).concat(far).map(([x, z]) => { const gx = Math.min(W - 1, x), gz = Math.min(D - 1, z); return [x - WX, MH.g(w, gx, gz) - wy, z - WZc]; });
      acts.push({
        name: '호박 수레', hint: '호박을 가득 실은 수레가 광장 앞에 들렀다가 동쪽 큰길을 따라 들녘 밖으로 떠나요', hit: [WX - 2, wy + 1, WZc - 5, WX + 2, wy + 6, WZc + 2],
        run: async a => {
          await a.drive('pcart', cDrive.slice(0, 2), 4, { fwd: '-z' });
          for (let k = 0; k < 3; k++) { a.burst([route[2][0] + 0.5, MH.g(w, route[2][0], route[2][1]) + 5, route[2][1] + 0.5], { n: 14, colors: ['#e8801a', '#ffb04a', '#4a7a2a'], speed: 2.5, up: 4, life: 1, gravity: 8, spread: 1 }); await a.wait(0.35); }
          await a.drive('pcart', cDrive.slice(2), 8, { fwd: '-z', back: 1.0 });
        },
      });
      // ── 헛간 지붕 풍향 닭: 바람을 받아 빙글빙글 ──
      const VX0 = 133, VZ0 = 95;
      w.box(VX0, barn.peak, VZ0, VX0, barn.peak + 2, VZ0, B.log);
      const vane = w.prop({ name: 'vane', pivot: [VX0 + 0.5, barn.peak + 3, VZ0 + 0.5], axis: 'y', speed: 0.3 });
      vane.box(VX0 - 3, barn.peak + 3, VZ0, VX0 + 3, barn.peak + 3, VZ0, B.log); vane.box(VX0 - 4, barn.peak + 3, VZ0, VX0 - 4, barn.peak + 5, VZ0, B.tentY); vane.set(VX0 + 4, barn.peak + 3, VZ0, B.tentY);
      vane.box(VX0 - 1, barn.peak + 4, VZ0, VX0 + 1, barn.peak + 5, VZ0, B.rib1); vane.set(VX0 + 1, barn.peak + 6, VZ0, B.rib1); vane.set(VX0 + 2, barn.peak + 5, VZ0, B.tentY); vane.set(VX0 - 2, barn.peak + 6, VZ0, B.rib3);
      acts.push({
        name: '풍향 닭', hint: '헛간 지붕의 풍향 닭이 세찬 가을바람에 빙글빙글 돌아요', hit: [VX0 - 4, barn.peak, VZ0 - 1, VX0 + 4, barn.peak + 6, VZ0 + 1],
        run: async a => {
          a.wind(4, 3.5);
          a.spin('vane', 14, 3.5);
          for (let k = 0; k < 5; k++) { a.burst([VX0 + 0.5, barn.peak + 5, VZ0 + 0.5], { n: 12, colors: ['#e07a2a', '#c84a2a', '#f0b83a'], speed: 6, up: 1, life: 1.6, gravity: 0.5, spread: 1.5, flat: true }); await a.wait(0.6); }
        },
      });
      // ── 낙엽 회오리: 길가에서 단풍잎이 소용돌이치며 솟는다 ──
      const LX = 70, LZ = 100, lgY = MH.g(w, LX, LZ);
      acts.push({
        name: '낙엽 회오리', hint: '가을바람이 길가 낙엽을 휘감아 회오리로 올려요', hit: [LX - 3, lgY, LZ - 3, LX + 3, lgY + 4, LZ + 3],
        run: async a => {
          a.wind(5, 4);
          for (let k = 0; k < 24; k++) {
            const ang = k * 0.75, r = 1 + k * 0.2;
            a.burst([LX + 0.5 + Math.cos(ang) * r, lgY + 1 + k * 0.65, LZ + 0.5 + Math.sin(ang) * r], { n: 9, colors: ['#e07a2a', '#c84a2a', '#f0b83a', '#e8b83a'], speed: 2.5, up: 1.5, life: 1.8, gravity: -0.3, spread: 0.6, flat: true });
            await a.wait(0.14);
          }
        },
      });
      const smoke = chim.map(c => ({ n: 26, colors: ['#e8dcd0', '#c8bcb0'], mode: 'rise', speed: 0.6, area: [c[0], c[2], 0.6], y0: c[1], y1: c[1] + 18, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
