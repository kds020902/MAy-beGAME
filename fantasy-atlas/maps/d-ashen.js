// 잿빛 묘지 — 안개 낀 계단식 묘역 언덕과 정상의 고딕 납골당 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'ashen', cat: 'dungeon', name: '잿빛 묘지', en: 'Ashen Cemetery', color: '#9aa0a6', seed: 11, base: 24, time: 'night',
    desc: '끝나지 않는 장례가 이어지는 묘지. 굶주린 망자들이 산 자의 온기를 찾아 기어 나온다.',
    monsters: { normal: ['구울', '해골 병사', '울부짖는 망령'], mid: '무덤지기', boss: '뼈의 군주' },
    sky: ['#17151c', '#3b3844', '#5d5866'], stars: true,
    hemi: ['#a8adc2', '#2a2622', 0.72], sun: ['#d0d8ee', 0.78, [0.55, 1, 0.4]],
    day: { sky: ['#b8bcc4', '#7c8290', '#d8d8dc'], stars: false, hemi: ['#e8eaf0', '#4a4640', 0.6], sun: ['#f0ece0', 0.62, [0.55, 1, 0.4]], haze: '#a8aab2' },
    liquid: ['#1f2a26', '#34463e', '#8fb89a'], liqSpeed: 0.5,
    fog: { start: 0.7, floor: 18, depth: 10, haze: [30, 0.36, 7], hazeColor: '#66646f' },
    camY: 10,
    particles: [
      { n: 620, colors: ['#8e8a86', '#6d6a68', '#b0aaa2'], mode: 'fall', speed: 0.6, y0: 24, y1: 96, glow: false },
      { n: 40, colors: ['#8dffba', '#c9ffd9'], mode: 'wisp', speed: 0.5, size: 2, y0: 34 },
    ],
    blocks: {
      ash: { c: '#4c4643', top: '#76716c', v: 0.08 }, ash2: { c: '#4c4643', top: '#68635f', v: 0.08 },
      deadgrass: { c: '#4c4643', top: '#66654a', v: 0.1 }, soil: { c: '#3b302a', v: 0.08 },
      rock: { c: '#56555c', v: 0.06, pat: 'stone' }, rockDk: { c: '#3e3d44', v: 0.06, pat: 'stone' }, rockM: { c: '#4a4a50', v: 0.06, pat: 'big' },
      wallB: { c: '#74727a', v: 0.05, pat: 'brick' }, wallBd: { c: '#56545c', v: 0.05, pat: 'brick' }, trim: { c: '#8a8890', v: 0.04 },
      path: { c: '#55565e', top: '#6a6b72', v: 0.1, pat: 'stone' }, roof: { c: '#2c2a33', v: 0.04, pat: 'tile' }, roofE: { c: '#1d1b22', v: 0.03 },
      marble: { c: '#9a9aa2', v: 0.05 }, bone: { c: '#d9d1bd', v: 0.05 }, dark: { c: '#0c0a0e', v: 0 },
      iron: { c: '#24242b', v: 0.03 }, wood: { c: '#4a3526', v: 0.06 }, plank: { c: '#5c4331', v: 0.08, pat: 'plank' },
      thatch: { c: '#4a4238', v: 0.08, pat: 'tile' }, tomb: { c: '#8a8b92', v: 0.08 }, tombDk: { c: '#6c6d74', v: 0.08 },
      tombMoss: { c: '#5e6a5a', v: 0.1 }, mound: { c: '#43372f', top: '#4f433a', v: 0.08 },
      bark: { c: '#2c2522', v: 0.06 }, barkDk: { c: '#1c1716', v: 0.05 }, coffin: { c: '#3a2a22', v: 0.05, pat: 'plank' }, lid: { c: '#4d3829', v: 0.05, pat: 'plank' },
      bell: { c: '#a8823a', v: 0.06 }, crow: { c: '#141218', v: 0.03 }, slab: { c: '#7a7a82', v: 0.06, pat: 'big' },
      gfire: { c: '#8dffb0', glow: true }, gglass: { c: '#50e890', night: true, day: '#2a4a3c' }, warm: { c: '#ffc46e', night: true, day: '#4a4038' },
      candle: { c: '#fff0c4', glow: true }, soul: { c: '#70ffa8', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const ravine = [[100, -4], [106, 42], [98, 80], [112, 132]];
      const zone = (x, z) => x > 6 && x < 92 && z > 50;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const u = Math.min(1, Math.max(0, ((132 - z) * 0.62 + (128 - x) * 0.38) / 122));
          let hh = Math.pow(u, 1.25) * 26;
          if (zone(x, z)) hh = Math.floor(hh / 5) * 5 + Math.max(0, (hh % 5) - 4.2) * 5;
          if (z < 52 && x > 22 && x < 80) hh = Math.max(hh, 24);
          const rd = MH.polyDist(x, z, ravine);
          if (rd < 10) hh -= Math.pow(1 - rd / 10, 1.4) * (hh + 7);
          return base + hh + n.fbm(x * 0.05, z * 0.05) * 2.2 - 1;
        },
        surface: (x, z, y, s) => {
          if (s >= 3) return zone(x, z) ? B.wallB : B.rock;
          const f = n.fbm(x * 0.1 + 20, z * 0.1, 2);
          return f > 0.6 ? B.deadgrass : f < 0.38 ? B.ash2 : B.ash;
        },
        under: (x, z, y, dep, s) => s >= 3 && zone(x, z) ? B.wallB : dep < 3 ? B.soil : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, base - 1, (x, z) => MH.polyDist(x, z, ravine) < 6);
      const lights = [], acts = [], landmarks = [];

      // ── 굽이치는 참배로(계단) ──
      const route = [[84, 124], [78, 106], [46, 102], [40, 84], [72, 74], [50, 70]];
      const hs = route.map(([x, z]) => MH.g(w, x, z));
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let best = 9, bt = 0, bi = 0;
        for (let i = 0; i < route.length - 1; i++) {
          const [ax, az] = route[i], [bx, bz] = route[i + 1], dx = bx - ax, dz = bz - az;
          const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)));
          const d = Math.hypot(x - ax - dx * t, z - az - dz * t);
          if (d < best) { best = d; bt = t; bi = i; }
        }
        if (best > 4.2) continue;
        MH.setH(w, x, z, Math.round(MH.lerp(hs[bi], hs[bi + 1], bt)), best > 3.2 ? B.rockDk : B.path, B.rock);
      }
      const nearRoute = (x, z, r) => MH.polyDist(x, z, route) < (r || 6);
      // 길가의 초록 불 등롱
      for (let i = 0; i < route.length - 1; i++) for (const t of [0.3, 0.75]) {
        const x = Math.round(MH.lerp(route[i][0], route[i + 1][0], t)) + 5, z = Math.round(MH.lerp(route[i][1], route[i + 1][1], t));
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z)) continue;
        w.box(x, g + 1, z, x, g + 5, z, B.iron); w.set(x + 1, g + 5, z, B.iron); w.set(x + 1, g + 4, z, B.gfire);
        if ((i + (t > 0.5 ? 1 : 0)) % 2 === 0) lights.push({ p: [x + 1.5, g + 4, z + 0.5], c: '#6dffa0', i: 0.8, d: 12, flicker: 0.35 });
      }

      // ── 정상: 뼈의 납골당 ──
      const py = MH.maxG(w, 34, 12, 66, 38) + 1;
      MH.flatten(w, 26, 8, 74, 50, py - 1, B.path, B.rock);
      const x0 = 36, x1 = 64, z0 = 14, z1 = 36, wy = py, WH = 18;
      w.box(x0 - 2, wy, z0 - 2, x1 + 2, wy, z1 + 2, B.wallBd);
      w.box(x0, wy + 1, z0, x1, wy + WH, z1, B.wallB);
      w.box(x0 + 1, wy + 1, z0 + 1, x1 - 1, wy + WH - 1, z1 - 1, B.dark);
      for (const y of [wy + 6, wy + 12, wy + WH]) w.walls(x0, y, z0, x1, y, z1, B.trim);
      for (let z = z0 + 2; z <= z1 - 2; z += 5) for (const [bx, dx] of [[x0, -1], [x1, 1]]) {
        for (let k = 1; k <= 3; k++) w.box(bx + dx * k, wy + 1, z, bx + dx * k, wy + 16 - k * 4, z + 1, B.wallBd);
        w.box(bx + dx, wy + 13, z, bx + dx, wy + 20, z + 1, B.wallBd); w.box(bx + dx, wy + 21, z, bx + dx, wy + 22, z, B.trim);
      }
      for (let z = z0 + 4; z <= z1 - 4; z += 5) for (const x of [x0, x1]) { w.box(x, wy + 5, z, x, wy + 14, z + 1, B.gglass); w.box(x, wy + 15, z, x, wy + 15, z + 1, B.trim); }
      // 정면: 뾰족 아치 문, 원형 창, 쌍첨탑
      const dx0 = 46, dx1 = 54, mid = 50, fz = z1;
      const archTop = x => wy + 12 - Math.pow(Math.abs(x - mid) / 4.5, 2) * 4;
      for (let x = dx0 - 1; x <= dx1 + 1; x++) for (let y = wy + 1; y <= wy + 14; y++) {
        if (y <= archTop(x)) {
          if (x < dx0 || x > dx1) w.set(x, y, fz, B.trim);
          else { w.set(x, y, fz, 0); w.set(x, y, fz - 1, (Math.abs(x - mid) <= 2 && y <= wy + 7 && (x + y) % 2 === 0) ? B.soul : B.dark); }
        }
        else if (y <= archTop(x) + 1) w.set(x, y, fz, B.trim);
      }
      for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) {
        const r = Math.hypot(x, y);
        if (r > 5.2) continue;
        const spoke = Math.abs(Math.sin(Math.atan2(y, x) * 4)) < 0.26 && r > 1.4;
        w.set(mid + x, wy + 22 + y, fz + 1, r > 4.2 || spoke ? B.trim : B.gglass);
      }
      MH.roof(w, x0 - 1, x1 + 1, z0 - 1, z1 + 1, wy + WH + 1, { b: B.roof, eave: B.roofE, ridge: B.wallBd, pitch: 1, gable: B.wallB, axis: 'z' });
      for (const tx of [x0 + 2, x1 - 2]) {
        w.box(tx - 2, wy + 1, fz - 1, tx + 2, wy + 28, fz + 2, B.wallB);
        for (const y of [wy + 12, wy + 20, wy + 28]) w.walls(tx - 3, y, fz - 2, tx + 3, y, fz + 3, B.trim);
        w.box(tx, wy + 14, fz + 2, tx, wy + 18, fz + 2, B.gglass); w.box(tx, wy + 22, fz + 2, tx, wy + 26, fz + 2, B.dark);
        const t = MH.pyramid(w, tx - 2, fz - 1, tx + 2, fz + 2, wy + 29, B.roof, 3, B.roofE);
        w.box(tx, t, fz, tx, t + 2, fz, B.iron);
      }
      // 뒤쪽 종루 첨탑과 해골 장식
      w.box(46, wy + WH, 17, 54, wy + 40, 25, B.wallB);
      for (const y of [wy + 32, wy + 33, wy + 34, wy + 35]) { w.box(47, y, 17, 53, y, 17, B.dark); w.box(47, y, 25, 53, y, 25, B.dark); w.box(46, y, 18, 46, y, 24, B.dark); w.box(54, y, 18, 54, y, 24, B.dark); }
      w.walls(45, wy + 40, 16, 55, wy + 41, 26, B.trim);
      const sTop = MH.pyramid(w, 46, 17, 54, 25, wy + 42, B.roof, 3, B.roofE);
      w.box(50, sTop, 21, 50, sTop + 1, 21, B.bone); w.box(49, sTop + 2, 21, 51, sTop + 4, 21, B.bone); w.set(49, sTop + 3, 22, B.dark); w.set(51, sTop + 3, 22, B.dark);
      // 문짝(부품): 벽 앞면에 달려 바깥으로 열린다
      const doorL = w.prop({ name: 'doorL', pivot: [dx0, wy + 1, fz + 1] });
      const doorR = w.prop({ name: 'doorR', pivot: [dx1 + 1, wy + 1, fz + 1] });
      for (let x = dx0; x <= dx1; x++) for (let y = wy + 1; y <= wy + 12; y++) {
        if (y > archTop(x) || x === mid) continue;
        (x < mid ? doorL : doorR).set(x, y, fz + 1, (y === wy + 5 || y === wy + 9 || x === dx0 || x === dx1 || Math.abs(x - mid) === 1) ? B.iron : B.coffin);
      }
      lights.push({ name: 'crypt', p: [mid + 0.5, wy + 4, fz + 0.5], c: '#60ff98', i: 0.35, d: 24, flicker: 0.2 });
      // 넓은 계단, 화로, 천사상
      for (let s = 0; s < 7; s++) w.box(42 - s, wy - s, fz + 4 + s, 58 + s, wy - s, fz + 4 + s, s % 2 ? B.path : B.wallBd);
      MH.footing(w, 34, fz + 4, 66, fz + 11, wy - 6, B.rock);
      // 기단에서 묘역 참배로까지 내려가는 큰 돌계단(난간 기둥마다 초록 불)
      const plaza = MH.g(w, 50, 50), foot = MH.g(w, 50, 70);
      MH.flight(w, { name: '납골당 계단', axis: 'z', c: 50, half: 6, a: 51, b: 66, ha: plaza - 1, hb: foot, step: B.path, edge: B.wallBd, fill: B.wallBd, rail: B.trim, post: B.wallBd, postGap: 5,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.gfire); if (k % 10 === 0) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#6dffa0', i: 0.9, d: 12, flicker: 0.35 }); } });
      MH.retain(w, 26, 8, 74, 50, B.wallBd, B.trim);
      for (let x = 27; x <= 73; x++) if (x < 43 || x > 57) { w.set(x, plaza + 1, 50, B.trim); if (x % 4 === 0) w.set(x, plaza + 2, 50, B.trim); }
      for (const fx of [40, 60]) {
        w.box(fx, wy + 1, fz + 4, fx, wy + 4, fz + 4, B.iron); w.box(fx - 1, wy + 5, fz + 3, fx + 1, wy + 5, fz + 5, B.iron);
        w.box(fx, wy + 6, fz + 4, fx, wy + 8, fz + 4, B.gfire); w.set(fx - 1, wy + 6, fz + 4, B.gfire); w.set(fx + 1, wy + 6, fz + 4, B.gfire);
        lights.push({ p: [fx + 0.5, wy + 8, fz + 4.5], c: '#6dffa0', i: 1.5, d: 20, flicker: 0.35 });
      }
      const angel = (ax, az) => {
        const g = MH.g(w, ax, az) + 1;
        w.box(ax - 2, g, az - 2, ax + 2, g + 3, az + 2, B.wallBd); w.walls(ax - 2, g + 3, az - 2, ax + 2, g + 3, az + 2, B.trim);
        w.box(ax - 1, g + 4, az, ax + 1, g + 9, az, B.marble); w.box(ax, g + 10, az, ax, g + 11, az, B.marble);
        for (const s of [-1, 1]) { w.line(ax + s, g + 9, az - 1, ax + s * 4, g + 12, az - 1, B.marble); w.line(ax + s * 4, g + 12, az - 1, ax + s * 3, g + 6, az - 1, B.marble); w.box(ax + s * 2, g + 7, az - 1, ax + s * 3, g + 10, az - 1, B.marble); }
        w.box(ax, g + 5, az + 1, ax, g + 8, az + 1, B.marble);
      };
      angel(30, fz + 10); angel(70, fz + 10);
      for (let i = 0; i < 60; i++) {
        const bx = w.ri(30, 70), bz = w.ri(fz + 3, fz + 12);
        let by = 90; while (by > 0 && !w.get(bx, by, bz)) by--;
        const tb = w.get(bx, by, bz);
        if (tb === B.path || tb === B.wallBd) w.set(bx, by + 1, bz, w.chance(0.2) ? B.dark : B.bone);
      }
      acts.push({
        name: '납골당 대문', hint: '문이 열리고 초록 불빛이 새어 나와요', hit: [dx0, wy + 1, fz, dx1, wy + 12, fz + 2],
        run: async a => {
          a.flash('crypt', 9, 5);
          await Promise.all([a.turn('doorL', [0, -1.75, 0], 2), a.turn('doorR', [0, 1.75, 0], 2)]);
          for (let k = 0; k < 4; k++) { a.burst([mid + 0.5, wy + 5, fz + 2], { n: 34, colors: ['#8dffba', '#c9ffd9', '#50e890'], speed: 5, up: 3, life: 2.6, gravity: -1, spread: 3 }); await a.wait(0.5); }
          await a.wait(1.4);
          await Promise.all([a.turn('doorL', [0, 0, 0], 1.8), a.turn('doorR', [0, 0, 0], 1.8)]);
        },
      });
      landmarks.push({ name: '뼈의 납골당', note: '보스 · 뼈의 군주', p: [50.5, sTop + 9, 21.5], boss: true });

      // ── 계단식 묘역: 묘비, 봉분, 가족 납골묘 ──
      const graves = [];
      for (let z = 54; z <= 118; z += 8) for (let x = 10; x <= 90; x += 7) {
        const gx = x + w.ri(-1, 1), gz = z + w.ri(-1, 0);
        if (nearRoute(gx, gz) || nearRoute(gx, gz + 6) || MH.polyDist(gx, gz, ravine) < 13 || (Math.abs(gx - 50) < 11 && gz > 44 && gz < 70)) continue;
        const g = MH.g(w, gx, gz);
        let flat = true;
        for (let dz = -1; dz <= 6; dz++) for (let dx = -2; dx <= 2; dx++) if (MH.g(w, gx + dx, gz + dz) !== g) flat = false;
        if (flat) graves.push([gx, gz, g]);
      }
      const used = [], tombG = graves.reduce((b, q) => Math.hypot(q[0] - 32, q[1] - 78) < Math.hypot(b[0] - 32, b[1] - 78) ? q : b, graves[0]);
      graves.forEach(([gx, gz, g], k) => {
        const kind = k % 8, tb = hash3(gx, 1, gz) > 0.6 ? B.tombMoss : hash3(gx, 2, gz) > 0.5 ? B.tomb : B.tombDk;
        if ((kind === 7 && used.length < 3 && gx > 14 && gx < 84) || gx === tombG[0] && gz === tombG[1]) {
          // 가족 납골묘: 작은 돌집
          w.box(gx - 2, g + 1, gz, gx + 2, g + 6, gz + 5, B.wallBd); w.box(gx - 1, g + 1, gz + 5, gx + 1, g + 4, gz + 5, B.dark); w.box(gx, g + 1, gz + 5, gx, g + 4, gz + 5, B.iron);
          MH.roof(w, gx - 3, gx + 3, gz - 1, gz + 6, g + 7, { b: B.roof, eave: B.roofE, gable: B.wallBd, axis: 'z' });
          w.set(gx, g + 6, gz + 6, B.bone); used.push([gx, gz, g]);
          return;
        }
        if (kind === 0 || kind === 3) { w.box(gx - 1, g + 1, gz, gx + 1, g + 4, gz, tb); w.set(gx, g + 5, gz, tb); w.box(gx - 2, g + 1, gz, gx + 2, g + 1, gz, B.tombDk); }
        else if (kind === 1 || kind === 5) { w.box(gx, g + 1, gz, gx, g + 7, gz, tb); w.box(gx - 2, g + 5, gz, gx + 2, g + 5, gz, tb); w.box(gx - 1, g + 1, gz, gx + 1, g + 1, gz, B.tombDk); }
        else if (kind === 2) { w.box(gx - 1, g + 1, gz - 1, gx + 1, g + 2, gz + 1, B.tombDk); w.box(gx, g + 3, gz, gx, g + 9, gz, tb); w.set(gx, g + 10, gz, B.trim); }
        else if (kind === 4) { w.box(gx - 1, g + 1, gz, gx + 1, g + 1, gz + 5, tb); w.box(gx, g + 2, gz + 1, gx, g + 2, gz + 3, B.trim); }
        else { w.box(gx - 1, g + 1, gz, gx + 1, g + 3, gz, tb); w.set(gx - 1, g + 4, gz, tb); }
        if (kind !== 4) {
          if (k % 9 === 4) {
            for (let dz = 1; dz <= 5; dz++) for (let dx = -1; dx <= 1; dx++) { w.set(gx + dx, g, gz + dz, 0); w.set(gx + dx, g - 1, gz + dz, 0); }
            w.box(gx - 1, g - 2, gz + 1, gx + 1, g - 2, gz + 5, B.coffin);
            w.box(gx + 2, g + 1, gz + 1, gx + 3, g + 1, gz + 4, B.mound); w.box(gx + 2, g + 2, gz + 2, gx + 2, g + 2, gz + 3, B.mound);
          } else w.box(gx - 1, g + 1, gz + 1, gx + 1, g + 1, gz + 5, B.mound);
        }
        if (k % 5 === 2) w.set(gx + 2, g + 2, gz, B.candle);
      });
      landmarks.push({ name: '파헤쳐진 묘역', note: '구울 · 해골 병사 출몰', p: [30.5, MH.g(w, 30, 94) + 9, 94.5] });

      // ── 뚜껑이 움직이는 관 ──
      const cx = 22, cz = 86, cg = MH.g(w, cx, cz);
      MH.flatten(w, cx - 4, cz - 3, cx + 5, cz + 8, cg, B.ash, B.soil);
      w.box(cx - 1, cg + 1, cz, cx + 1, cg + 2, cz + 6, B.coffin); w.box(cx, cg + 2, cz + 1, cx, cg + 2, cz + 5, B.soul);
      w.box(cx - 3, cg + 1, cz - 2, cx + 3, cg + 1, cz - 2, B.tombDk); w.box(cx - 1, cg + 2, cz - 2, cx + 1, cg + 5, cz - 2, B.tomb); w.set(cx, cg + 6, cz - 2, B.tomb);
      const lid = w.prop({ name: 'lid', pivot: [cx + 2, cg + 3, cz + 3.5] });
      lid.box(cx - 1, cg + 3, cz, cx + 1, cg + 3, cz + 6, B.lid); lid.box(cx, cg + 4, cz + 1, cx, cg + 4, cz + 4, B.bone); lid.box(cx - 1, cg + 4, cz + 2, cx + 1, cg + 4, cz + 2, B.bone);
      lights.push({ name: 'coffin', p: [cx + 0.5, cg + 3, cz + 3.5], c: '#60ff98', i: 0.01, d: 14, flicker: 0.3 });
      acts.push({
        name: '열린 관', hint: '뚜껑이 들썩이다 밀려나고 혼불이 솟아요', hit: [cx - 1, cg + 1, cz, cx + 1, cg + 4, cz + 6],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.move('lid', [0, 0.5, 0], 0.18); await a.move('lid', [0, 0, 0], 0.16); }
          a.flash('coffin', 260, 3.6);
          await a.tween('lid', { off: [3.6, -1.6, 0], rot: [0, 0, -0.95] }, 1.1);
          a.burst([cx + 0.5, cg + 3, cz + 3.5], { n: 60, colors: ['#8dffba', '#70ffa8', '#d9d1bd'], speed: 3, up: 5, life: 2.4, gravity: -0.4, spread: 1.5 });
          await a.wait(2.4);
          await a.tween('lid', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.2);
        },
      });

      // ── 무덤지기의 오두막과 헛간 ──
      const hx = 72, hz = 84;
      const hy = MH.maxG(w, hx - 2, hz - 2, hx + 14, hz + 12) + 1;
      MH.flatten(w, hx - 5, hz - 5, hx + 17, hz + 15, hy - 1, B.ash2, B.soil);
      const hm = { found: B.rockDk, wall: B.plank, frame: B.wood, win: B.warm, shutter: B.bark, sill: B.wood, door: B.coffin, roof: B.thatch, eave: B.roofE, ridge: B.wood, chimney: B.wallBd, lamp: B.warm };
      const hut = MH.houseX(w, { x: hx, z: hz, sx: 12, sz: 9, floors: 2, fh: 5, face: 'w', pitch: 1, studs: true, jetty: true, dormers: 0, m: hm });
      lights.push({ p: [hx - 1.5, hy + 5, hz + 4.5], c: '#ffb85a', i: 1.3, d: 14, flicker: 0.25, night: true });
      MH.house(w, { x: hx + 2, z: hz + 11, sx: 7, sz: 4, fh: 4, face: 'w', m: { found: B.rockDk, wall: B.plank, frame: B.wood, door: B.coffin, roof: B.thatch, eave: B.roofE } });
      w.box(hx - 4, hy, hz + 9, hx - 4, hy + 4, hz + 9, B.wood); w.set(hx - 4, hy + 5, hz + 9, B.iron); w.set(hx - 4, hy + 6, hz + 9, B.iron);
      w.box(hx - 5, hy, hz, hx - 3, hy, hz + 1, B.wood); w.set(hx - 4, hy + 1, hz, B.soil); w.set(hx - 5, hy - 0, hz + 2, B.wood);
      landmarks.push({ name: '무덤지기의 오두막', note: '중간 보스 · 무덤지기', p: [hx + 6, hut.peak + 6, hz + 4.5], mid: true });

      // ── 종탑 예배당과 흔들리는 종 ──
      const tx = 18, tz = 60, tg = MH.maxG(w, tx - 5, tz - 5, tx + 5, tz + 16) + 1;
      MH.flatten(w, tx - 6, tz - 6, tx + 6, tz + 18, tg - 1, B.path, B.rock);
      MH.house(w, { x: tx - 4, z: tz + 4, sx: 9, sz: 12, fh: 8, face: 's', pitch: 2, axis: 'z', m: { found: B.rockDk, wall: B.wallB, frame: B.wallBd, win: B.gglass, door: B.coffin, roof: B.roof, eave: B.roofE, ridge: B.wallBd } });
      const tTop = MH.tower(w, { cx: tx, cz: tz, y0: tg, h: 26, r: 3.5, square: true, m: { wall: B.wallB, band: B.wallBd, roof: B.roof, eave: B.roofE, finial: B.iron }, pitch: 3 });
      const by = tg + 18;
      w.box(tx - 3, by, tz - 2, tx + 3, by + 5, tz + 2, 0); w.box(tx - 2, by, tz - 3, tx + 2, by + 5, tz + 3, 0);
      w.box(tx - 3, by - 1, tz - 3, tx + 3, by - 1, tz + 3, B.wallBd);
      for (const [px, pz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) w.box(tx + px, by, tz + pz, tx + px, by + 5, tz + pz, B.wallB);
      w.box(tx - 2, by + 5, tz, tx + 2, by + 5, tz, B.wood);
      const bell = w.prop({ name: 'bell', pivot: [tx + 0.5, by + 5, tz + 0.5], axis: 'x' });
      bell.set(tx, by + 4, tz, B.iron); bell.ellipsoid(tx, by + 2, tz, 1.6, 1.8, 1.6, B.bell, (dx, dy) => dy >= -1); bell.set(tx, by, tz, B.iron);
      acts.push({
        name: '종탑의 종', hint: '녹슨 종이 울리고 재가 흩날려요', hit: [tx - 3, by, tz - 3, tx + 3, by + 5, tz + 3],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.turn('bell', [0.5, 0, 0], 0.35);
            a.burst([tx + 0.5, by + 3, tz + 0.5], { n: 18, colors: ['#8e8a86', '#b0aaa2'], speed: 7, up: 1, life: 1.8, gravity: 0.6, spread: 3, flat: true });
            await a.turn('bell', [-0.5, 0, 0], 0.35);
          }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '울지 않는 종탑', note: '울부짖는 망령이 깃든 종', p: [tx + 0.5, tTop + 4, tz + 0.5] });

      // ── 아래쪽 정문: 돌기둥, 철 아치, 울타리 ──
      const gz = 120, gxm = 84;
      for (const px of [gxm - 6, gxm + 6]) {
        const g = MH.g(w, px, gz) + 1;
        w.box(px - 1, g, gz - 1, px + 1, g + 9, gz + 1, B.wallBd); w.walls(px - 2, g + 10, gz - 2, px + 2, g + 10, gz + 2, B.trim);
        w.box(px, g + 11, gz, px, g + 12, gz, B.gfire);
        lights.push({ p: [px + 0.5, g + 12, gz + 0.5], c: '#6dffa0', i: 1, d: 14, flicker: 0.4 });
      }
      const gg = MH.g(w, gxm, gz) + 1;
      for (let x = gxm - 5; x <= gxm + 5; x++) { const ah = Math.round(9 - Math.pow((x - gxm) / 5, 2) * 3); w.set(x, gg + ah, gz, B.iron); if (x % 2 === 0) w.box(x, gg + 6, gz, x, gg + ah, gz, B.iron); }
      MH.fence(w, [[8, 120], [gxm - 8, 120]], B.iron, B.iron);
      MH.fence(w, [[gxm + 8, 120], [94, 116]], B.iron, B.iron);
      // ── 협곡 위 나무다리 ──
      const bgy = MH.g(w, 90, 50), egy = MH.g(w, 116, 51);
      for (let x = 90; x <= 116; x++) for (const dz of [0, 1, 2, 3]) {
        const t = (x - 90) / 26, yy = Math.round(bgy + (egy - bgy) * t - Math.sin(t * Math.PI) * 2);
        w.set(x, yy, 50 + dz, B.plank);
        if ((dz === 0 || dz === 3) && x % 3 === 0) { w.set(x, yy + 1, 50 + dz, B.wood); w.set(x, yy + 2, 50 + dz, B.wood); }
        if ((dz === 0 || dz === 3) && x % 8 === 0) for (let y = MH.g(w, x, 50 + dz) + 1; y < yy; y++) w.set(x, y, 50 + dz, B.wood);
      }
      // ── 죽은 나무, 바위, 풀 ──
      for (const [tx2, tz2] of [[10, 44], [16, 110], [40, 116], [60, 80], [92, 28], [116, 86], [80, 40], [8, 78], [66, 60], [118, 16], [32, 94], [88, 108], [14, 24], [120, 56]]) {
        const g = MH.g(w, tx2, tz2);
        if (g > 0 && !w.get(tx2, g + 1, tz2) && w.liq[tx2 + W * tz2] < 0) MH.tree(w, tx2, g + 1, tz2, { kind: 'dead', h: w.ri(12, 19), bark: B.bark, barkDk: B.barkDk, spread: 6, trunkR: 1.3 });
      }
      MH.scatter(w, 900, (x, g, z, b) => { if (b === B.deadgrass && w.chance(0.5)) w.set(x, g + 1, z, B.deadgrass); else if (b === B.ash && w.chance(0.05)) w.set(x, g + 1, z, B.bone); });
      for (let i = 0; i < 22; i++) { const x = w.ri(94, 124), z = w.ri(4, 124), g = MH.g(w, x, z); if (g > base && w.liq[x + W * z] < 0) MH.rock(w, x, g, z, w.r(1.5, 3.4), B.rockM, B.deadgrass); }

      // ── 가족 납골묘의 석문(부품): 옆으로 밀려나며 혼불이 새어 나온다 ──
      const tomb = used.find(([x, z]) => x === tombG[0] && z === tombG[1]);
      if (tomb) {
        const [mx, mz, mg] = tomb;
        w.box(mx - 1, mg + 1, mz + 5, mx + 1, mg + 3, mz + 5, B.soul); w.box(mx - 1, mg + 4, mz + 5, mx + 1, mg + 4, mz + 5, B.dark);
        const slab = w.prop({ name: 'slab', pivot: [mx + 0.5, mg + 1, mz + 6.5] });
        slab.box(mx - 1, mg + 1, mz + 6, mx + 1, mg + 4, mz + 6, B.slab); slab.set(mx, mg + 3, mz + 6, B.bone);
        lights.push({ name: 'tomb', p: [mx + 0.5, mg + 2.5, mz + 6.5], c: '#60ff98', i: 0.01, d: 14, flicker: 0.3 });
        acts.push({
          name: '납골묘 석문', hint: '가족 납골묘의 돌문이 옆으로 밀려나며 혼불이 새어 나와요', hit: [mx - 2, mg + 1, mz + 4, mx + 2, mg + 5, mz + 7],
          run: async a => {
            for (let k = 0; k < 3; k++) { await a.move('slab', [0.3, 0, 0], 0.08); await a.move('slab', [0, 0, 0], 0.08); }
            a.flash('tomb', 220, 4);
            await a.tween('slab', { off: [3.2, 0, 0.6], rot: [0, -0.2, 0] }, 1.4);
            for (let k = 0; k < 4; k++) { a.burst([mx + 0.5, mg + 2.5, mz + 6.5], { n: 30, colors: ['#8dffba', '#70ffa8', '#c9ffd9'], speed: 3, up: 4, life: 2.4, gravity: -0.6, spread: 1.2 }); await a.wait(0.4); }
            await a.wait(1);
            await a.tween('slab', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.4);
          },
        });
      }

      // ── 죽은 나무의 까마귀 떼(부품) ──
      const crows = [], CTX = 60, CTZ = 80, ctg = MH.g(w, CTX, CTZ);
      const perch = [];
      for (let z = CTZ - 6; z <= CTZ + 6; z++) for (let x = CTX - 6; x <= CTX + 6; x++) { const t = w.top(x, z); if (t > ctg + 6) perch.push([x, t, z]); }
      perch.sort((p, q) => q[1] - p[1]);
      for (const [x, t, z] of perch) {
        if (crows.length >= 4 || crows.some(c => Math.abs(c[0] - x) + Math.abs(c[2] - z) < 3)) continue;
        if (w.get(x, t + 1, z) || w.get(x, t + 2, z) || w.get(x, t + 1, z - 1) || w.get(x, t + 2, z + 1)) continue;
        const nm = 'crow' + crows.length, cp = w.prop({ name: nm, pivot: [x + 0.5, t + 1, z + 0.5] });
        cp.set(x, t + 1, z, B.crow); cp.set(x, t + 1, z - 1, B.crow); cp.set(x, t + 2, z, B.crow); cp.set(x, t + 2, z + 1, B.gfire);
        crows.push([x, t, z, nm]);
      }
      if (crows.length) acts.push({
        name: '까마귀 떼', hint: '죽은 나무의 까마귀들이 깍깍 날아올라 묘역을 한 바퀴 돌아요', hit: [CTX - 6, crows[0][1] - 4, CTZ - 6, CTX + 6, crows[0][1] + 3, CTZ + 6],
        run: async a => {
          for (const [x, t, z] of crows) a.burst([x + 0.5, t + 1.5, z + 0.5], { n: 14, colors: ['#141218', '#2a2630', '#4a4650'], speed: 4, up: 3, life: 1.6, gravity: 2, spread: 1 });
          await Promise.all(crows.map(([, , , nm], k) => a.path(nm, [[3 + k, 6, 6, 0.6], [12, 12 + k, 2, 1.6], [8, 15, -10 + k, 3], [-6 - k, 12, -6, 4.4], [-4, 6 + k, 6, 5.6], [0, 0, 0, 6.28]], 5 + k * 0.3)));
          crows.forEach(([, , , nm]) => a.unwind(nm));
        },
      });

      // ── 혼불 행렬: 아래 묘역부터 납골당까지 무덤마다 혼불이 솟는다 ──
      const souls = graves.filter(([x, z]) => x > 14 && x < 96 && z < 112).sort((p, q) => q[1] - p[1]).filter((p, k) => k % 2 === 0).slice(0, 24);
      if (souls.length) acts.push({
        name: '혼불 행렬', hint: '아래 묘역부터 무덤마다 혼불이 솟아 납골당까지 이어져요', hit: [souls[0][0] - 3, souls[0][2] + 1, souls[0][1] - 1, souls[0][0] + 3, souls[0][2] + 6, souls[0][1] + 6],
        run: async a => {
          a.glow(1.8, 5);
          for (const [x, z, g] of souls) { a.burst([x + 0.5, g + 5, z + 3.5], { n: 16, colors: ['#8dffba', '#70ffa8', '#ffffff'], speed: 1.2, up: 5, life: 1.8, gravity: -0.5, spread: 0.6 }); await a.wait(0.16); }
          a.flash('crypt', 9, 2.2);
          a.burst([mid + 0.5, wy + 5, fz + 3], { n: 70, colors: ['#8dffba', '#c9ffd9', '#50e890'], speed: 5, up: 6, life: 2.4, gravity: -0.6, spread: 3 });
          await a.wait(1.6);
        },
      });

      // ── 해골 첨탑: 번개가 내리치고 해골 눈에서 초록 불길이 쏟아진다 ──
      w.set(49, sTop + 3, 22, B.soul); w.set(51, sTop + 3, 22, B.soul);
      lights.push({ name: 'skull', p: [50.5, sTop + 3, 23], c: '#70ffa8', i: 0.01, d: 30, flicker: 0.2 });
      acts.push({
        name: '해골 첨탑', hint: '첨탑 꼭대기 해골에 번개가 내리치고 눈에서 초록 불길이 쏟아져요', hit: [48, sTop, 20, 52, sTop + 5, 23],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.lightning(1 + k * 0.3); a.flash('skull', 300, 0.5);
            a.burst([50.5, sTop + 6, 21.5], { n: 40, colors: ['#ffffff', '#c9ffd9', '#8dffba'], speed: 9, up: 2, life: 0.8, gravity: 3, spread: 1.5 });
            await a.wait(0.7);
          }
          a.flash('skull', 160, 3); a.glow(1.7, 3);
          for (let k = 0; k < 6; k++) { for (const ex of [49.5, 51.5]) a.burst([ex, sTop + 3.5, 23], { n: 14, colors: ['#70ffa8', '#8dffba', '#d9d1bd'], speed: 2.5, up: 1, life: 1.8, gravity: -0.8, spread: 0.4 }); await a.wait(0.4); }
        },
      });

      // ── 망자의 나룻배(부품): 초록 등불을 단 빈 배가 협곡 물길을 따라 내려온다 ──
      const FX = 102, FZ = 62, fy = base - 1;
      const boat = w.prop({ name: 'boat', pivot: [FX + 0.5, fy, FZ + 0.5] });
      boat.box(FX - 1, fy, FZ - 3, FX + 1, fy, FZ + 3, B.coffin);
      for (const s of [-2, 2]) boat.box(FX + s, fy + 1, FZ - 3, FX + s, fy + 1, FZ + 3, B.wood);
      boat.box(FX - 1, fy + 1, FZ - 4, FX + 1, fy + 1, FZ - 4, B.wood); boat.box(FX - 1, fy + 1, FZ + 4, FX + 1, fy + 2, FZ + 4, B.wood);
      boat.box(FX, fy + 3, FZ + 4, FX, fy + 6, FZ + 4, B.iron); boat.set(FX, fy + 6, FZ + 5, B.iron); boat.set(FX, fy + 5, FZ + 5, B.gfire);
      boat.set(FX, fy + 1, FZ, B.bone); boat.set(FX, fy + 1, FZ - 1, B.bone);
      acts.push({
        name: '망자의 나룻배', hint: '초록 등불을 단 빈 나룻배가 협곡 물길을 따라 미끄러져 내려와요', hit: [FX - 2, fy, FZ - 4, FX + 2, fy + 6, FZ + 5],
        run: async a => {
          a.burst([FX + 0.5, fy + 5, FZ + 5.5], { n: 30, colors: ['#8dffba', '#c9ffd9'], speed: 2, up: 2, life: 2, gravity: -0.3, spread: 1 });
          await a.path('boat', [[-2, 0, 10, -0.1], [-3, 0, 18, 0], [-1, 0, 26, 0.25]], 4.5);
          for (let k = 0; k < 3; k++) { a.burst([FX - 0.5, fy + 1, FZ + 31], { n: 18, colors: ['#8fb89a', '#34463e', '#c9ffd9'], speed: 3, up: 2, life: 1.2, gravity: 3, spread: 2, flat: true }); await a.wait(0.4); }
          await a.path('boat', [[-3, 0, 16, 0], [0, 0, 0, 0]], 3.8);
        },
      });
      const smoke = hut.chimney ? [{ n: 40, colors: ['#6a6670', '#8a8690'], mode: 'rise', speed: 0.6, area: [hut.chimney[0], hut.chimney[2], 0.6], y0: hut.chimney[1], y1: hut.chimney[1] + 20, glow: false }] : [];
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
