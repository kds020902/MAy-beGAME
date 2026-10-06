// 잿빛 묘지 — 안개 낀 계단식 묘역 언덕과 정상의 고딕 납골당, 동쪽 고지의 화장터와 지하묘지 입구 (160칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 128, K = 1.25;
  MAPS.push({
    id: 'ashen', cat: 'dungeon', name: '잿빛 묘지', en: 'Ashen Cemetery', color: '#9aa0a6', seed: 11, base: 24, time: 'night', size: [W, D, Hh],
    desc: '끝나지 않는 장례가 이어지는 묘지. 굶주린 망자들이 산 자의 온기를 찾아 기어 나온다. 납골당 옆 동쪽 고지의 화장터 굴뚝에서는 밤낮없이 재가 쏟아져 묘지를 잿빛으로 덮고, 그 아래 뼈 아치 너머로 지하묘지가 입을 벌리고 있다.',
    info: { title: '장소 정보', en: 'ASHEN CEMETERY', rows: [['자리', '안개 낀 언덕 · 협곡 서쪽'], ['정상', '뼈의 납골당과 해골 첨탑'], ['동쪽 고지', '잿빛 화장터 · 해골 지하묘지 입구']] },
    monsters: { normal: ['구울', '해골 병사', '울부짖는 망령', '재의 망령'], mid: '무덤지기', boss: '뼈의 군주' },
    sky: ['#17151c', '#3b3844', '#5d5866'], stars: true,
    hemi: ['#a8adc2', '#2a2622', 0.72], sun: ['#d0d8ee', 0.78, [0.55, 1, 0.4]],
    day: { sky: ['#b8bcc4', '#7c8290', '#d8d8dc'], stars: false, hemi: ['#e8eaf0', '#4a4640', 0.6], sun: ['#f0ece0', 0.62, [0.55, 1, 0.4]], haze: '#a8aab2' },
    liquid: ['#1f2a26', '#34463e', '#8fb89a'], liqSpeed: 0.5,
    fog: { start: 0.72, floor: 18, depth: 10, haze: [32, 0.34, 7], hazeColor: '#66646f' },
    camY: 2, zoom: 1.05,
    particles: [
      { n: 760, colors: ['#8e8a86', '#6d6a68', '#b0aaa2'], mode: 'fall', speed: 0.6, y0: 24, y1: 110, glow: false },
      { n: 50, colors: ['#8dffba', '#c9ffd9'], mode: 'wisp', speed: 0.5, size: 2, y0: 34 },
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
      // 새 재질: 바닥 판석, 녹슨 쇠, 화장터 벽돌·그을음·불씨, 시든 꽃
      flagS: { c: '#5e5f67', top: '#71727a', v: 0.05, pat: 'check', alt: '#64656d' }, rust: { c: '#5a3a2a', v: 0.06 },
      brickR: { c: '#6a5048', v: 0.05, pat: 'brick' }, soot: { c: '#1a1818', v: 0.03 }, ember: { c: '#ff8a3a', glow: true }, ember2: { c: '#ffd070', glow: true },
      coal: { c: '#222022', v: 0.08 }, urn: { c: '#7a6a5a', v: 0.05 }, wither: { c: '#6a3a4a', v: 0.08 }, cinder: { c: '#3a3634', top: '#5a5450', v: 0.1 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      // 원래 128칸 설계를 1.25배로 넓힌다: 지형식은 원래 좌표(o)로 계산
      const ravineO = [[100, -4], [106, 42], [98, 80], [112, 132]];
      const ravine = ravineO.map(([x, z]) => [Math.round(x * K), Math.round(z * K)]);
      const zoneO = (x, z) => x > 6 && x < 92 && z > 50;
      const zone = (x, z) => zoneO(x / K, z / K);
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const ox = x / K, oz = z / K;
          const u = Math.min(1, Math.max(0, ((132 - oz) * 0.62 + (128 - ox) * 0.38) / 122));
          let hh = Math.pow(u, 1.25) * 26;
          if (zoneO(ox, oz)) hh = Math.floor(hh / 5) * 5 + Math.max(0, (hh % 5) - 4.2) * 5;
          if (oz < 52 && ox > 22 && ox < 80) hh = Math.max(hh, 24);
          const rd = MH.polyDist(ox, oz, ravineO);
          if (rd < 10) hh -= Math.pow(1 - rd / 10, 1.4) * (hh + 7);
          return base + hh + n.fbm(ox * 0.05, oz * 0.05) * 2.2 - 1;
        },
        surface: (x, z, y, s) => {
          if (s >= 3) return zone(x, z) ? B.wallB : B.rock;
          const f = n.fbm(x * 0.08 + 20, z * 0.08, 2);
          return f > 0.6 ? B.deadgrass : f < 0.38 ? B.ash2 : B.ash;
        },
        under: (x, z, y, dep, s) => s >= 3 && zone(x, z) ? B.wallB : dep < 3 ? B.soil : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, base - 1, (x, z) => MH.polyDist(x, z, ravine) < 7.5);
      const lights = [], acts = [], landmarks = [];

      // ── 굽이치는 참배로(계단) ──
      const route = [[105, 155], [98, 132], [58, 128], [50, 105], [90, 92], [62, 88]];
      const hs = route.map(([x, z]) => MH.g(w, x, z));
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let best = 9, bt = 0, bi = 0;
        for (let i = 0; i < route.length - 1; i++) {
          const [ax, az] = route[i], [bx, bz] = route[i + 1], dx = bx - ax, dz = bz - az;
          const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)));
          const d = Math.hypot(x - ax - dx * t, z - az - dz * t);
          if (d < best) { best = d; bt = t; bi = i; }
        }
        if (best > 5) continue;
        // 가장자리 연석, 가운데 판석, 군데군데 깨진 돌
        const top = best > 4 ? B.rockDk : best > 3.2 ? B.trim : hash3(x, 3, z) > 0.9 ? B.ash2 : B.path;
        MH.setH(w, x, z, Math.round(MH.lerp(hs[bi], hs[bi + 1], bt)), top, B.rock);
      }
      const nearRoute = (x, z, r) => MH.polyDist(x, z, route) < (r || 7);
      // 길가의 초록 불 등롱(받침돌·기둥·갓·매단 등)
      for (let i = 0; i < route.length - 1; i++) for (const t of [0.22, 0.55, 0.85]) {
        const x = Math.round(MH.lerp(route[i][0], route[i + 1][0], t)) + 6, z = Math.round(MH.lerp(route[i][1], route[i + 1][1], t));
        const g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || w.get(x + 1, g + 5, z)) continue;
        w.set(x, g + 1, z, B.wallBd); w.box(x, g + 2, z, x, g + 6, z, B.iron); w.set(x + 1, g + 6, z, B.iron); w.set(x, g + 7, z, B.iron);
        w.set(x + 1, g + 5, z, B.gfire);
        if ((i + Math.round(t * 3)) % 2 === 0) lights.push({ p: [x + 1.5, g + 5, z + 0.5], c: '#6dffa0', i: 0.8, d: 12, flicker: 0.35 });
      }

      // ── 정상: 뼈의 납골당 ──
      const mid = 62, x0 = mid - 14, x1 = mid + 14, z0 = 23, z1 = 45, WH = 18;
      const py = MH.maxG(w, mid - 16, z0 - 2, mid + 16, z1 + 2) + 1;
      // 광장: 체크 판석과 가장자리 띠돌
      for (let z = 10; z <= 62; z++) for (let x = 33; x <= 92; x++) MH.setH(w, x, z, py - 1, (x === 33 || x === 92 || z === 10 || z === 62) ? B.wallBd : (Math.abs(x - mid) <= 3 && z > z1) ? B.path : B.flagS, B.rock);
      const wy = py;
      w.box(x0 - 2, wy, z0 - 2, x1 + 2, wy, z1 + 2, B.wallBd);
      w.box(x0, wy + 1, z0, x1, wy + WH, z1, B.wallB);
      w.box(x0 + 1, wy + 1, z0 + 1, x1 - 1, wy + WH - 1, z1 - 1, B.dark);
      // 굽돌(아래 두 단)과 띠돌림
      w.walls(x0 - 1, wy + 1, z0 - 1, x1 + 1, wy + 2, z1 + 1, B.wallBd); w.box(mid - 5, wy + 1, z1 + 1, mid + 5, wy + 2, z1 + 1, 0);
      for (const y of [wy + 6, wy + 12, wy + WH]) w.walls(x0, y, z0, x1, y, z1, B.trim);
      for (let z = z0 + 2; z <= z1 - 2; z += 5) for (const [bx, dx] of [[x0, -1], [x1, 1]]) {
        for (let k = 1; k <= 3; k++) w.box(bx + dx * k, wy + 1, z, bx + dx * k, wy + 16 - k * 4, z + 1, B.wallBd);
        w.box(bx + dx, wy + 13, z, bx + dx, wy + 20, z + 1, B.wallBd); w.box(bx + dx, wy + 21, z, bx + dx, wy + 22, z, B.trim);
        // 버팀벽 꼭대기 작은 뾰족탑과 뼈 꼭지
        w.box(bx + dx, wy + 23, z, bx + dx, wy + 24, z + 1, B.roof); w.set(bx + dx, wy + 25, z, B.bone);
        w.set(bx + dx * 2, wy + 9, z, B.trim); w.set(bx + dx * 3, wy + 5, z, B.trim);
      }
      // 길쭉한 창: 테두리, 가운데 창살, 아래 창턱, 위 뾰족 머리
      for (let z = z0 + 4; z <= z1 - 4; z += 5) for (const [x, dx] of [[x0, -1], [x1, 1]]) {
        w.box(x, wy + 5, z, x, wy + 14, z + 1, B.gglass);
        for (let y = wy + 6; y <= wy + 13; y += 3) w.box(x, y, z, x, y, z + 1, B.iron);
        w.box(x + dx, wy + 4, z - 1, x + dx, wy + 4, z + 2, B.trim);
        w.box(x, wy + 15, z, x, wy + 15, z + 1, B.trim); w.set(x, wy + 16, z, B.trim);
      }
      // 정면: 뾰족 아치 문(겹아치), 원형 창, 쌍첨탑
      const dx0 = mid - 4, dx1 = mid + 4, fz = z1;
      const archTop = x => wy + 12 - Math.pow(Math.abs(x - mid) / 4.5, 2) * 4;
      for (let x = dx0 - 2; x <= dx1 + 2; x++) for (let y = wy + 1; y <= wy + 15; y++) {
        if (y <= archTop(x)) {
          if (x < dx0 || x > dx1) w.set(x, y, fz, B.trim);
          else { w.set(x, y, fz, 0); w.set(x, y, fz - 1, (Math.abs(x - mid) <= 2 && y <= wy + 7 && (x + y) % 2 === 0) ? B.soul : B.dark); }
        }
        else if (y <= archTop(x) + 1) w.set(x, y, fz, B.trim);
        else if (y <= archTop(x) + 2 && Math.abs(x - mid) <= 6) w.set(x, y, fz + 1, B.wallBd);
      }
      for (const s of [-1, 1]) { w.box(mid + s * 6, wy + 1, fz + 1, mid + s * 6, wy + 11, fz + 1, B.trim); w.set(mid + s * 6, wy + 12, fz + 1, B.bone); }
      // 문 위 해골 장식줄
      for (let x = mid - 3; x <= mid + 3; x += 2) { w.set(x, wy + 15, fz + 1, B.bone); w.set(x, wy + 14, fz + 1, B.dark); }
      for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) {
        const r = Math.hypot(x, y);
        if (r > 5.2) continue;
        const spoke = Math.abs(Math.sin(Math.atan2(y, x) * 4)) < 0.26 && r > 1.4;
        w.set(mid + x, wy + 22 + y, fz + 1, r > 4.2 || spoke ? B.trim : B.gglass);
      }
      MH.roof(w, x0 - 1, x1 + 1, z0 - 1, z1 + 1, wy + WH + 1, { b: B.roof, eave: B.roofE, ridge: B.wallBd, pitch: 1, gable: B.wallB, axis: 'z' });
      // 지붕 용마루의 쇠 가시 장식
      for (let z = z0; z <= z1; z += 2) { const t = w.top(mid, z); if (t > wy + WH) w.set(mid, t + 1, z, B.iron); }
      for (const tx of [x0 + 2, x1 - 2]) {
        w.box(tx - 2, wy + 1, fz - 1, tx + 2, wy + 28, fz + 2, B.wallB);
        for (const y of [wy + 12, wy + 20, wy + 28]) w.walls(tx - 3, y, fz - 2, tx + 3, y, fz + 3, B.trim);
        w.box(tx, wy + 14, fz + 2, tx, wy + 18, fz + 2, B.gglass); w.box(tx, wy + 22, fz + 2, tx, wy + 26, fz + 2, B.dark);
        w.set(tx, wy + 19, fz + 2, B.trim); w.set(tx, wy + 27, fz + 2, B.trim);
        for (const [cx, cz] of [[tx - 3, fz + 3], [tx + 3, fz + 3]]) { w.box(cx, wy + 29, cz, cx, wy + 31, cz, B.wallBd); w.set(cx, wy + 32, cz, B.iron); }
        const t = MH.pyramid(w, tx - 2, fz - 1, tx + 2, fz + 2, wy + 29, B.roof, 3, B.roofE);
        w.box(tx, t, fz, tx, t + 2, fz, B.iron); w.set(tx - 1, t + 1, fz, B.iron); w.set(tx + 1, t + 1, fz, B.iron);
      }
      // 뒤쪽 종루 첨탑과 해골 장식
      const sz0 = z0 + 3, sz1 = z0 + 11, scz = z0 + 7;
      w.box(mid - 4, wy + WH, sz0, mid + 4, wy + 40, sz1, B.wallB);
      for (const y of [wy + 32, wy + 33, wy + 34, wy + 35]) { w.box(mid - 3, y, sz0, mid + 3, y, sz0, B.dark); w.box(mid - 3, y, sz1, mid + 3, y, sz1, B.dark); w.box(mid - 4, y, sz0 + 1, mid - 4, y, sz1 - 1, B.dark); w.box(mid + 4, y, sz0 + 1, mid + 4, y, sz1 - 1, B.dark); }
      for (const y of [wy + 26, wy + 31, wy + 36]) w.walls(mid - 5, y, sz0 - 1, mid + 5, y, sz1 + 1, B.trim);
      for (const s of [-2, 2]) w.box(mid + s, wy + 27, sz1, mid + s, wy + 29, sz1, B.gglass);
      w.walls(mid - 5, wy + 40, sz0 - 1, mid + 5, wy + 41, sz1 + 1, B.trim);
      for (const [cx, cz] of [[mid - 5, sz0 - 1], [mid + 5, sz0 - 1], [mid - 5, sz1 + 1], [mid + 5, sz1 + 1]]) { w.box(cx, wy + 42, cz, cx, wy + 44, cz, B.wallBd); w.set(cx, wy + 45, cz, B.bone); }
      const sTop = MH.pyramid(w, mid - 4, sz0, mid + 4, sz1, wy + 42, B.roof, 3, B.roofE);
      w.box(mid, sTop, scz, mid, sTop + 1, scz, B.bone); w.box(mid - 1, sTop + 2, scz, mid + 1, sTop + 4, scz, B.bone); w.set(mid - 1, sTop + 3, scz + 1, B.dark); w.set(mid + 1, sTop + 3, scz + 1, B.dark);
      // 문짝(부품): 벽 앞면에 달려 바깥으로 열린다
      const doorL = w.prop({ name: 'doorL', pivot: [dx0, wy + 1, fz + 1] });
      const doorR = w.prop({ name: 'doorR', pivot: [dx1 + 1, wy + 1, fz + 1] });
      for (let x = dx0; x <= dx1; x++) for (let y = wy + 1; y <= wy + 12; y++) {
        if (y > archTop(x) || x === mid) continue;
        (x < mid ? doorL : doorR).set(x, y, fz + 1, (y === wy + 5 || y === wy + 9 || x === dx0 || x === dx1 || Math.abs(x - mid) === 1) ? B.iron : B.coffin);
      }
      lights.push({ name: 'crypt', p: [mid + 0.5, wy + 4, fz + 0.5], c: '#60ff98', i: 0.35, d: 24, flicker: 0.2 });
      // 넓은 계단, 화로, 천사상
      for (let s = 0; s < 7; s++) w.box(mid - 8 - s, wy - s, fz + 4 + s, mid + 8 + s, wy - s, fz + 4 + s, s % 2 ? B.path : B.wallBd);
      MH.footing(w, mid - 16, fz + 4, mid + 16, fz + 11, wy - 6, B.rock);
      // 기단에서 묘역 참배로까지 내려가는 큰 돌계단(난간 기둥마다 초록 불)
      const plaza = MH.g(w, mid, 62), foot = MH.g(w, mid, 88);
      MH.flight(w, { name: '납골당 계단', axis: 'z', c: mid, half: 6, a: 63, b: 82, ha: plaza - 1, hb: foot, step: B.path, edge: B.wallBd, fill: B.wallBd, rail: B.trim, post: B.wallBd, postGap: 5,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.gfire); if (k % 10 === 0) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#6dffa0', i: 0.9, d: 12, flicker: 0.35 }); } });
      MH.retain(w, 33, 10, 92, 62, B.wallBd, B.trim);
      // 광장 가장자리 난간: 기둥마다 돌 항아리
      for (let x = 34; x <= 91; x++) if (x < mid - 7 || x > mid + 7) {
        w.set(x, plaza + 1, 62, B.trim);
        if (x % 5 === 0) { w.set(x, plaza + 2, 62, B.wallBd); w.set(x, plaza + 3, 62, B.urn); }
      }
      for (const fx of [mid - 10, mid + 10]) {
        w.box(fx, wy + 1, fz + 4, fx, wy + 4, fz + 4, B.iron); w.box(fx - 1, wy + 5, fz + 3, fx + 1, wy + 5, fz + 5, B.iron);
        w.box(fx, wy + 6, fz + 4, fx, wy + 8, fz + 4, B.gfire); w.set(fx - 1, wy + 6, fz + 4, B.gfire); w.set(fx + 1, wy + 6, fz + 4, B.gfire);
        for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) w.set(fx + a, wy + 1, fz + 4 + b, B.iron);
        lights.push({ p: [fx + 0.5, wy + 8, fz + 4.5], c: '#6dffa0', i: 1.5, d: 20, flicker: 0.35 });
      }
      const angel = (ax, az) => {
        const g = MH.g(w, ax, az) + 1;
        w.box(ax - 2, g, az - 2, ax + 2, g + 3, az + 2, B.wallBd); w.walls(ax - 2, g + 3, az - 2, ax + 2, g + 3, az + 2, B.trim); w.walls(ax - 3, g, az - 3, ax + 3, g, az + 3, B.wallBd);
        w.box(ax - 1, g + 4, az, ax + 1, g + 9, az, B.marble); w.box(ax, g + 10, az, ax, g + 11, az, B.marble);
        for (const s of [-1, 1]) { w.line(ax + s, g + 9, az - 1, ax + s * 4, g + 12, az - 1, B.marble); w.line(ax + s * 4, g + 12, az - 1, ax + s * 3, g + 6, az - 1, B.marble); w.box(ax + s * 2, g + 7, az - 1, ax + s * 3, g + 10, az - 1, B.marble); }
        w.box(ax, g + 5, az + 1, ax, g + 8, az + 1, B.marble); w.set(ax, g + 4, az + 2, B.wither);
      };
      angel(mid - 20, fz + 10); angel(mid + 20, fz + 10);
      // 광장 뒤쪽: 무너진 기둥 줄과 오래된 석관들
      for (const [cx, cz, h] of [[38, 16, 9], [38, 26, 4], [38, 36, 7], [86, 16, 6], [86, 26, 10], [86, 36, 3]]) {
        w.box(cx - 1, wy, cz - 1, cx + 1, wy, cz + 1, B.wallBd); w.box(cx, wy + 1, cz, cx, wy + h, cz, B.marble);
        if (h > 8) w.box(cx - 1, wy + h + 1, cz - 1, cx + 1, wy + h + 1, cz + 1, B.trim); else w.set(cx + 1, wy, cz + 2, B.marble);
      }
      for (const [sx, sz] of [[42, 52], [80, 52], [42, 14], [80, 14]]) {
        w.box(sx - 1, wy, sz - 2, sx + 1, wy + 1, sz + 2, B.slab); w.box(sx - 1, wy + 2, sz - 2, sx + 1, wy + 2, sz + 2, B.trim);
        w.box(sx, wy + 3, sz - 1, sx, wy + 3, sz + 1, B.bone);
      }
      // 광장의 평석 무덤 줄과 쇠 등, 마른 관목
      for (let z = 14; z <= 56; z += 7) for (let x = 36; x <= 89; x += 5) {
        if (x > 42 && x < 82) continue;
        if (Math.abs(x - 38) < 3 && [16, 26, 36].some(c => Math.abs(z - c) < 4)) continue;
        if (Math.abs(x - 86) < 3 && [16, 26, 36].some(c => Math.abs(z - c) < 4)) continue;
        if ([[42, 52], [80, 52], [42, 14], [80, 14]].some(([a2, b2]) => Math.abs(x - a2) < 3 && Math.abs(z - b2) < 4)) continue;
        if (w.get(x, wy, z) || w.get(x, wy, z + 3)) continue;
        const tb = hash3(x, 4, z) > 0.5 ? B.tomb : B.tombDk;
        w.box(x - 1, wy, z, x + 1, wy, z + 3, tb); w.set(x, wy, z + 1, B.trim);
        if (hash3(x, 6, z) > 0.55) { w.box(x, wy + 1, z - 1, x, wy + 3, z - 1, tb); w.box(x - 1, wy + 2, z - 1, x + 1, wy + 2, z - 1, tb); }
        if (hash3(x, 7, z) > 0.8) w.set(x + 1, wy + 1, z + 2, B.candle);
      }
      // 축대 바깥면 버팀 기둥(갓돌 얹음)
      const pil = (x, z) => { const g = MH.g(w, x, z); if (g < 0 || g > py - 4) return; w.box(x, g + 1, z, x, py - 1, z, B.wallBd); w.set(x, py, z, B.trim); };
      for (let x = 36; x <= 90; x += 6) if (Math.abs(x - mid) > 8) pil(x, 63);
      for (let z = 12; z <= 60; z += 6) { if (Math.abs(z - 30) > 3) pil(93, z); pil(32, z); }
      for (let i = 0; i < 40; i++) {
        const bx = w.ri(mid - 20, mid + 20), bz = w.ri(fz + 3, fz + 12);
        let by = 110; while (by > 0 && !w.get(bx, by, bz)) by--;
        const tb = w.get(bx, by, bz);
        if (tb === B.path || tb === B.wallBd || tb === B.flagS) w.set(bx, by + 1, bz, w.chance(0.2) ? B.dark : B.bone);
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
      landmarks.push({ name: '뼈의 납골당', note: '보스 · 뼈의 군주', p: [mid + 0.5, sTop + 9, scz + 0.5], boss: true });

      // ── 계단식 묘역: 묘비, 봉분, 가족 납골묘, 쇠울타리 무덤 ──
      const graves = [];
      for (let z = 68; z <= 148; z += 8) for (let x = 12; x <= 114; x += 7) {
        const gx = x + w.ri(-1, 1), gz = z + w.ri(-1, 0);
        if (nearRoute(gx, gz) || nearRoute(gx, gz + 6) || MH.polyDist(gx, gz, ravine) < 16 || (Math.abs(gx - mid) < 13 && gz > 55 && gz < 90)) continue;
        const g = MH.g(w, gx, gz);
        let flat = true;
        for (let dz = -1; dz <= 6; dz++) for (let dx = -2; dx <= 2; dx++) if (MH.g(w, gx + dx, gz + dz) !== g) flat = false;
        if (flat) graves.push([gx, gz, g]);
      }
      const used = [], tombG = graves.reduce((b, q) => Math.hypot(q[0] - 40, q[1] - 98) < Math.hypot(b[0] - 40, b[1] - 98) ? q : b, graves[0]);
      graves.forEach(([gx, gz, g], k) => {
        const kind = k % 8, tb = hash3(gx, 1, gz) > 0.6 ? B.tombMoss : hash3(gx, 2, gz) > 0.5 ? B.tomb : B.tombDk;
        if ((kind === 7 && used.length < 4 && gx > 16 && gx < 106) || gx === tombG[0] && gz === tombG[1]) {
          // 가족 납골묘: 작은 돌집(굽돌, 기둥, 박공 해골)
          w.box(gx - 2, g + 1, gz, gx + 2, g + 6, gz + 5, B.wallBd); w.box(gx - 1, g + 1, gz + 5, gx + 1, g + 4, gz + 5, B.dark); w.box(gx, g + 1, gz + 5, gx, g + 4, gz + 5, B.iron);
          w.walls(gx - 3, g + 1, gz - 1, gx + 3, g + 1, gz + 6, B.trim); w.box(gx - 1, g + 1, gz + 6, gx + 1, g + 1, gz + 6, 0);
          for (const s of [-2, 2]) w.box(gx + s, g + 1, gz + 6, gx + s, g + 6, gz + 6, B.trim);
          MH.roof(w, gx - 3, gx + 3, gz - 1, gz + 7, g + 7, { b: B.roof, eave: B.roofE, gable: B.wallBd, axis: 'z' });
          w.set(gx, g + 7, gz + 7, B.bone); used.push([gx, gz, g]);
          return;
        }
        if (kind === 0 || kind === 3) { w.box(gx - 1, g + 1, gz, gx + 1, g + 4, gz, tb); w.set(gx, g + 5, gz, tb); w.box(gx - 2, g + 1, gz, gx + 2, g + 1, gz, B.tombDk); }
        else if (kind === 1 || kind === 5) { w.box(gx, g + 1, gz, gx, g + 7, gz, tb); w.box(gx - 2, g + 5, gz, gx + 2, g + 5, gz, tb); w.box(gx - 1, g + 1, gz, gx + 1, g + 1, gz, B.tombDk); }
        else if (kind === 2) { w.box(gx - 1, g + 1, gz - 1, gx + 1, g + 2, gz + 1, B.tombDk); w.box(gx, g + 3, gz, gx, g + 9, gz, tb); w.set(gx, g + 10, gz, B.trim); }
        else if (kind === 4) { w.box(gx - 1, g + 1, gz, gx + 1, g + 1, gz + 5, tb); w.box(gx, g + 2, gz + 1, gx, g + 2, gz + 3, B.trim); }
        else if (kind === 6) {
          // 쇠울타리를 두른 무덤과 작은 십자가
          for (let dz = -1; dz <= 6; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dx) === 2 || dz === -1 || dz === 6) { w.set(gx + dx, g + 1, gz + dz, B.iron); if ((dx + dz) % 2 === 0) w.set(gx + dx, g + 2, gz + dz, B.rust); }
          w.box(gx, g + 1, gz, gx, g + 5, gz, tb); w.box(gx - 1, g + 4, gz, gx + 1, g + 4, gz, tb);
        }
        else { w.box(gx - 1, g + 1, gz, gx + 1, g + 3, gz, tb); w.set(gx - 1, g + 4, gz, tb); }
        if (kind !== 4) {
          if (k % 9 === 4) {
            for (let dz = 1; dz <= 5; dz++) for (let dx = -1; dx <= 1; dx++) { w.set(gx + dx, g, gz + dz, 0); w.set(gx + dx, g - 1, gz + dz, 0); }
            w.box(gx - 1, g - 2, gz + 1, gx + 1, g - 2, gz + 5, B.coffin);
            w.box(gx + 2, g + 1, gz + 1, gx + 3, g + 1, gz + 4, B.mound); w.box(gx + 2, g + 2, gz + 2, gx + 2, g + 2, gz + 3, B.mound);
            w.set(gx + 3, g + 2, gz + 1, B.wood);
          } else if (kind !== 6) w.box(gx - 1, g + 1, gz + 1, gx + 1, g + 1, gz + 5, B.mound);
          else w.box(gx - 1, g + 1, gz + 1, gx + 1, g + 1, gz + 5, B.mound);
        }
        if (k % 5 === 2) w.set(gx + 2, g + 2, gz, B.candle);
        if (k % 7 === 3) { w.set(gx + 1, g + 2, gz + 1, B.wither); w.set(gx - 1, g + 2, gz + 2, B.wither); }
      });
      landmarks.push({ name: '파헤쳐진 묘역', note: '구울 · 해골 병사 출몰', p: [38.5, MH.g(w, 38, 118) + 9, 118.5] });

      // ── 뚜껑이 움직이는 관 ──
      const cx = 28, cz = 108, cg = MH.g(w, cx, cz);
      MH.flatten(w, cx - 4, cz - 3, cx + 5, cz + 8, cg, B.ash, B.soil);
      w.box(cx - 1, cg + 1, cz, cx + 1, cg + 2, cz + 6, B.coffin); w.box(cx, cg + 2, cz + 1, cx, cg + 2, cz + 5, B.soul);
      w.box(cx - 3, cg + 1, cz - 2, cx + 3, cg + 1, cz - 2, B.tombDk); w.box(cx - 1, cg + 2, cz - 2, cx + 1, cg + 5, cz - 2, B.tomb); w.set(cx, cg + 6, cz - 2, B.tomb);
      for (const [a, b] of [[-3, 1], [3, 1], [-3, 6], [3, 6]]) { w.box(cx + a, cg + 1, cz + b, cx + a, cg + 2, cz + b, B.iron); w.set(cx + a, cg + 3, cz + b, B.candle); }
      w.box(cx + 3, cg + 1, cz + 3, cx + 4, cg + 1, cz + 4, B.mound); w.set(cx + 4, cg + 2, cz + 3, B.wood);
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

      // ── 무덤지기의 오두막과 헛간, 장작더미·수레·우물 ──
      const hx = 90, hz = 105;
      const hy = MH.maxG(w, hx - 2, hz - 2, hx + 14, hz + 12) + 1;
      MH.flatten(w, hx - 6, hz - 5, hx + 17, hz + 16, hy - 1, B.ash2, B.soil);
      MH.retain(w, hx - 6, hz - 5, hx + 17, hz + 16, B.rockDk, B.wallBd);
      const hm = { found: B.rockDk, wall: B.plank, frame: B.wood, win: B.warm, shutter: B.bark, sill: B.wood, door: B.coffin, roof: B.thatch, eave: B.roofE, ridge: B.wood, chimney: B.wallBd, lamp: B.warm };
      const hut = MH.houseX(w, { x: hx, z: hz, sx: 12, sz: 9, floors: 2, fh: 5, face: 'w', pitch: 1, studs: true, jetty: true, dormers: 1, m: hm });
      lights.push({ p: [hx - 1.5, hy + 5, hz + 4.5], c: '#ffb85a', i: 1.3, d: 14, flicker: 0.25, night: true });
      MH.house(w, { x: hx + 2, z: hz + 11, sx: 7, sz: 4, fh: 4, face: 'w', m: { found: B.rockDk, wall: B.plank, frame: B.wood, door: B.coffin, roof: B.thatch, eave: B.roofE } });
      // 처마 밑 장작더미, 삽 걸이, 관 짜는 판자 더미
      w.box(hx + 12, hy, hz + 1, hx + 13, hy + 2, hz + 7, B.wood); for (let z = hz + 1; z <= hz + 7; z += 2) w.set(hx + 13, hy + 2, z, B.bark);
      w.box(hx - 4, hy, hz + 9, hx - 4, hy + 4, hz + 9, B.wood); w.set(hx - 4, hy + 5, hz + 9, B.iron); w.set(hx - 4, hy + 6, hz + 9, B.iron);
      w.box(hx - 5, hy, hz, hx - 3, hy, hz + 1, B.wood); w.set(hx - 4, hy + 1, hz, B.soil); w.set(hx - 5, hy, hz + 2, B.wood);
      w.box(hx + 10, hy, hz + 11, hx + 11, hy, hz + 14, B.lid); w.box(hx + 10, hy + 1, hz + 11, hx + 11, hy + 1, hz + 13, B.coffin);
      // 수레(바퀴 둘)와 빈 관
      w.box(hx - 4, hy + 1, hz - 3, hx - 1, hy + 1, hz - 2, B.plank); w.set(hx - 4, hy + 2, hz - 3, B.plank); w.set(hx - 1, hy + 2, hz - 2, B.plank);
      w.box(hx - 3, hy, hz - 4, hx - 2, hy, hz - 4, B.barkDk); w.box(hx - 3, hy, hz - 1, hx - 2, hy, hz - 1, B.barkDk); w.box(hx - 6, hy + 1, hz - 3, hx - 5, hy + 1, hz - 3, B.wood);
      // 우물
      const wx = hx + 15, wz = hz + 2;
      w.ring(wx, wz, hy, 0.9, 2.2, B.wallBd); w.ring(wx, wz, hy + 1, 0.9, 2.2, B.wallBd); w.set(wx, hy, wz, B.dark);
      for (const s of [-2, 2]) w.box(wx + s, hy + 2, wz, wx + s, hy + 5, wz, B.wood);
      w.box(wx - 2, hy + 6, wz, wx + 2, hy + 6, wz, B.wood); w.set(wx, hy + 5, wz, B.iron); w.set(wx, hy + 4, wz, B.iron);
      landmarks.push({ name: '무덤지기의 오두막', note: '중간 보스 · 무덤지기', p: [hx + 6, hut.peak + 6, hz + 4.5], mid: true });

      // ── 종탑 예배당과 흔들리는 종 ──
      const tx = 22, tz = 75, tg = MH.maxG(w, tx - 5, tz - 5, tx + 5, tz + 16) + 1;
      MH.flatten(w, tx - 7, tz - 6, tx + 7, tz + 19, tg - 1, B.path, B.rock);
      MH.retain(w, tx - 7, tz - 6, tx + 7, tz + 19, B.wallBd, B.trim);
      MH.house(w, { x: tx - 4, z: tz + 4, sx: 9, sz: 12, fh: 8, face: 's', pitch: 2, axis: 'z', m: { found: B.rockDk, wall: B.wallB, frame: B.wallBd, win: B.gglass, sill: B.trim, door: B.coffin, roof: B.roof, eave: B.roofE, ridge: B.wallBd } });
      const tTop = MH.tower(w, { cx: tx, cz: tz, y0: tg, h: 26, r: 3.5, square: true, m: { wall: B.wallB, band: B.wallBd, roof: B.roof, eave: B.roofE, finial: B.iron }, pitch: 3 });
      const by = tg + 18;
      w.box(tx - 3, by, tz - 2, tx + 3, by + 5, tz + 2, 0); w.box(tx - 2, by, tz - 3, tx + 2, by + 5, tz + 3, 0);
      w.box(tx - 3, by - 1, tz - 3, tx + 3, by - 1, tz + 3, B.wallBd);
      for (const [px, pz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) w.box(tx + px, by, tz + pz, tx + px, by + 5, tz + pz, B.wallB);
      w.box(tx - 2, by + 5, tz, tx + 2, by + 5, tz, B.wood);
      // 예배당 앞 작은 쇠 등과 묘석 두 줄
      for (const s of [-3, 3]) { const lg = MH.g(w, tx + s, tz + 18); w.box(tx + s, lg + 1, tz + 18, tx + s, lg + 3, tz + 18, B.iron); w.set(tx + s, lg + 4, tz + 18, B.candle); }
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
      const gz = 150, gxm = 105;
      for (const px of [gxm - 7, gxm + 7]) {
        const g = MH.g(w, px, gz) + 1;
        w.box(px - 2, g - 1, gz - 2, px + 2, g, gz + 2, B.wallBd);
        w.box(px - 1, g, gz - 1, px + 1, g + 9, gz + 1, B.wallBd); w.walls(px - 2, g + 10, gz - 2, px + 2, g + 10, gz + 2, B.trim);
        w.box(px - 1, g + 4, gz - 1, px + 1, g + 4, gz + 1, B.trim);
        w.box(px, g + 11, gz, px, g + 12, gz, B.gfire);
        lights.push({ p: [px + 0.5, g + 12, gz + 0.5], c: '#6dffa0', i: 1, d: 14, flicker: 0.4 });
      }
      const gg = MH.g(w, gxm, gz) + 1;
      for (let x = gxm - 6; x <= gxm + 6; x++) { const ah = Math.round(9 - Math.pow((x - gxm) / 6, 2) * 3); w.set(x, gg + ah, gz, B.iron); if (x % 2 === 0) w.box(x, gg + 6, gz, x, gg + ah, gz, B.iron); }
      w.box(gxm - 1, gg + 9, gz, gxm + 1, gg + 11, gz, B.bone); w.set(gxm - 1, gg + 10, gz + 1, B.dark); w.set(gxm + 1, gg + 10, gz + 1, B.dark);
      MH.fence(w, [[10, 150], [gxm - 9, 150]], B.iron, B.iron);
      MH.fence(w, [[gxm + 9, 150], [120, 145]], B.iron, B.iron);
      // ── 협곡 위 나무다리 ──
      const bx0 = 112, bx1 = 145, bz0 = 62, bgy = MH.g(w, bx0, bz0 + 1), egy = MH.g(w, bx1, bz0 + 1);
      for (let x = bx0; x <= bx1; x++) for (const dz of [0, 1, 2, 3]) {
        const t = (x - bx0) / (bx1 - bx0), yy = Math.round(bgy + (egy - bgy) * t - Math.sin(t * Math.PI) * 2);
        w.set(x, yy, bz0 + dz, B.plank);
        if ((dz === 0 || dz === 3) && x % 3 === 0) { w.set(x, yy + 1, bz0 + dz, B.wood); w.set(x, yy + 2, bz0 + dz, B.wood); }
        if ((dz === 0 || dz === 3) && x % 3 !== 0) w.set(x, yy + 2, bz0 + dz, B.rust);
        if ((dz === 0 || dz === 3) && x % 8 === 0) for (let y = MH.g(w, x, bz0 + dz) + 1; y < yy; y++) w.set(x, y, bz0 + dz, B.wood);
      }

      // ══ 새 구역: 동쪽 고지의 잿빛 화장터 마당 ══
      const CX0 = 97, CX1 = 119, CZ0 = 6, CZ1 = 52;
      const cy = MH.g(w, 108, 30);
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) MH.setH(w, x, z, cy, hash3(x, 5, z) > 0.8 ? B.ash2 : B.cinder, B.rock);
      MH.skirt(w, CX0, CZ0, CX1, CZ1, cy, { R: 8, rate: 1.4, noise: (x, z) => n.fbm(x * 0.2, z * 0.2) * 3, surf: () => B.ash2, fill: B.rock, skip: (x, z) => x < 96 });
      MH.retain(w, CX0, CZ0, CX1, CZ1, B.wallBd, B.trim);
      // 광장에서 화장터로 내려가는 옆 계단
      MH.flight(w, { name: '화장터 계단', axis: 'x', c: 30, half: 2, a: 89, b: 101, ha: plaza - 1, hb: cy, step: B.path, edge: B.wallBd, fill: B.wallBd, rail: B.iron, post: B.wallBd, postGap: 4 });
      for (let x = 92; x <= 96; x++) for (let z = 28; z <= 32; z++) if (MH.g(w, x, z) >= 0) { /* 계단 옆 축대 */ }
      // 화장터 본채: 붉은 벽돌, 굽돌, 슬레이트 지붕
      const kx0 = 101, kx1 = 115, kz0 = 9, kz1 = 21, ky = cy;
      w.box(kx0 - 1, ky, kz0 - 1, kx1 + 1, ky, kz1 + 1, B.wallBd);
      w.box(kx0, ky + 1, kz0, kx1, ky + 10, kz1, B.brickR);
      w.box(kx0 + 1, ky + 1, kz0 + 1, kx1 - 1, ky + 9, kz1 - 1, B.dark);
      w.walls(kx0, ky + 1, kz0, kx1, ky + 1, kz1, B.wallBd);
      for (const y of [ky + 6, ky + 10]) w.walls(kx0, y, kz0, kx1, y, kz1, B.trim);
      for (const [px, pz] of [[kx0, kz0], [kx1, kz0], [kx0, kz1], [kx1, kz1]]) w.box(px, ky + 1, pz, px, ky + 10, pz, B.wallBd);
      // 옆벽 높은 창(그을린 창살)
      for (let z = kz0 + 3; z <= kz1 - 3; z += 4) { w.box(kx1, ky + 3, z, kx1, ky + 8, z, B.warm); w.set(kx1, ky + 5, z, B.iron); w.set(kx1 + 1, ky + 2, z, B.trim); w.set(kx1, ky + 9, z, B.trim); }
      MH.roof(w, kx0 - 1, kx1 + 1, kz0 - 1, kz1 + 1, ky + 11, { b: B.roof, eave: B.roofE, ridge: B.soot, pitch: 1, gable: B.brickR, axis: 'x' });
      // 앞면(남쪽): 커다란 화장로 아궁이 — 아치, 쇠문 둘, 안쪽 불씨
      const fmx = 108, ffz = kz1;
      for (let x = fmx - 4; x <= fmx + 4; x++) for (let y = ky + 1; y <= ky + 9; y++) {
        const at = ky + 6 - Math.pow(Math.abs(x - fmx) / 3.2, 2) * 2;
        if (Math.abs(x - fmx) <= 3 && y <= at) { w.set(x, y, ffz, 0); w.set(x, y, ffz - 1, y <= ky + 2 ? (hash3(x, y, 1) > 0.4 ? B.ember : B.ember2) : B.soot); w.set(x, y, ffz - 2, B.ember); }
        else if (y <= at + 1.5 && y > ky) w.set(x, y, ffz + 1, B.wallBd);
      }
      for (let x = fmx - 3; x <= fmx + 3; x++) w.set(x, ky + 1, ffz - 1, B.coal);
      w.box(fmx - 5, ky, ffz + 1, fmx + 5, ky, ffz + 3, B.wallBd);
      const fdL = w.prop({ name: 'furL', pivot: [fmx - 3, ky + 1, ffz + 0.5] }), fdR = w.prop({ name: 'furR', pivot: [fmx + 4, ky + 1, ffz + 0.5] });
      for (let x = fmx - 3; x <= fmx + 3; x++) for (let y = ky + 1; y <= ky + 6; y++) {
        const at = ky + 6 - Math.pow(Math.abs(x - fmx) / 3.2, 2) * 2;
        if (y > at) continue;
        (x <= fmx ? fdL : fdR).set(x, y, ffz, (y === ky + 2 || y === ky + 5 || x === fmx - 3 || x === fmx + 3) ? B.rust : B.iron);
      }
      lights.push({ name: 'furnace', p: [fmx + 0.5, ky + 2, ffz + 1], c: '#ff9a40', i: 0.25, d: 16, flicker: 0.4 });
      // 높은 굴뚝: 띠돌림, 그을린 꼭대기
      const chx = 112, chz = 12, chTop = ky + 34;
      w.box(chx - 2, ky + 1, chz - 2, chx + 2, ky + 4, chz + 2, B.wallBd);
      w.box(chx - 1, ky + 5, chz - 1, chx + 1, chTop, chz + 1, B.brickR);
      for (let y = ky + 12; y < chTop; y += 7) w.walls(chx - 2, y, chz - 2, chx + 2, y, chz + 2, B.trim);
      w.walls(chx - 2, chTop - 2, chz - 2, chx + 2, chTop, chz + 2, B.soot); w.set(chx, chTop, chz, B.ember); w.set(chx, chTop - 1, chz, B.ember2);
      lights.push({ name: 'chim', p: [chx + 0.5, chTop + 1, chz + 0.5], c: '#ff8a3a', i: 0.6, d: 14, flicker: 0.5 });
      // 마당 소품: 석탄 더미, 손수레, 재 항아리 선반, 장작
      w.ellipsoid(103, cy + 1, 27, 2.5, 1.6, 2, B.coal, (dx, dy) => dy >= 0);
      w.box(113, cy + 1, 25, 116, cy + 1, 26, B.plank); w.set(113, cy + 2, 25, B.plank); w.set(116, cy + 2, 26, B.plank); w.set(114, cy + 1, 24, B.barkDk); w.set(114, cy + 1, 27, B.barkDk);
      w.box(117, cy + 1, 10, 118, cy + 3, 18, B.wood); for (let z = 10; z <= 18; z += 2) w.set(118, cy + 3, z, B.bark);
      // 납골 벽감(서쪽 벽): 칸마다 재 항아리
      for (let z = 34; z <= 50; z++) for (let y = cy + 1; y <= cy + 7; y++) {
        const cell = (z - 34) % 3 !== 0 && (y - cy - 1) % 3 !== 0;
        w.set(98, y, z, B.wallBd); w.set(99, y, z, cell ? B.dark : B.trim);
        if (cell && (z + y) % 3 === 0) w.set(99, y, z, B.urn);
        if (cell && (z * 7 + y) % 11 === 0) w.set(99, y, z, B.candle);
      }
      w.box(98, cy + 8, 33, 100, cy + 8, 51, B.roof); w.box(99, cy + 9, 33, 99, cy + 9, 51, B.roofE);
      landmarks.push({ name: '잿빛 화장터', note: '묘지에 내리는 재의 근원 · 재의 망령', p: [chx + 0.5, chTop + 6, chz + 0.5] });

      // ── 해골 지하묘지 입구: 흙둔덕 속 뼈 아치, 내려가는 계단, 쇠창살(부품) ──
      const qx = 108, qz = 40;   // 입구 정면 z
      w.box(qx - 6, cy - 4, qz - 9, qx + 6, cy + 5, qz - 1, B.mound);
      for (let x = qx - 6; x <= qx + 6; x++) for (let z = qz - 9; z <= qz - 1; z++) if (hash3(x, 9, z) > 0.55) w.set(x, cy + 6, z, B.deadgrass);
      for (let z = qz; z <= qz + 7; z++) {
        const dep = Math.min(5, Math.ceil((qz + 7 - z) * 0.75));
        for (let x = qx - 2; x <= qx + 2; x++) {
          for (let y = cy - dep + 1; y <= cy; y++) w.set(x, y, z, 0);
          w.set(x, cy - dep, z, B.path);
        }
        for (const s of [-3, 3]) { for (let y = cy - dep; y <= cy; y++) w.set(qx + s, y, z, B.wallBd); w.set(qx + s, cy + 1, z, z % 2 ? B.trim : B.bone); }
      }
      // 뼈 아치(해골 줄)와 어두운 입구
      const qy = cy - 5;
      for (let x = qx - 4; x <= qx + 4; x++) for (let y = qy; y <= cy + 6; y++) {
        const ax = Math.abs(x - qx), top = qy + 6 - Math.pow(ax / 2.6, 2) * 2;
        if (ax <= 2 && y <= top) { w.set(x, y, qz - 1, B.dark); w.set(x, y, qz - 2, B.dark); }
        else if (y <= top + 1.6) w.set(x, y, qz - 1, (x + y) % 2 ? B.bone : B.trim);
      }
      for (let x = qx - 3; x <= qx + 3; x += 2) { w.set(x, cy + 3, qz - 1, B.bone); w.set(x, cy + 2, qz - 1, B.dark); }
      w.box(qx - 1, cy + 4, qz - 1, qx + 1, cy + 5, qz - 1, B.bone); w.set(qx - 1, cy + 4, qz, B.dark); w.set(qx + 1, cy + 4, qz, B.dark);
      const gate = w.prop({ name: 'grate', pivot: [qx + 0.5, qy, qz + 0.5] });
      for (let x = qx - 2; x <= qx + 2; x++) for (let y = qy + 1; y <= qy + 5; y++) if (x % 2 === 0 || (y - qy) % 2 === 1) gate.set(x, y, qz, (y === qy + 1) ? B.rust : B.iron);
      for (const s of [-2, 2]) w.set(qx + s, qy + 2, qz - 2, B.soul);
      lights.push({ name: 'cata', p: [qx + 0.5, qy + 2, qz - 1], c: '#60ff98', i: 0.2, d: 16, flicker: 0.3 });
      landmarks.push({ name: '해골 지하묘지 입구', note: '뼈로 쌓은 아치 · 아래로 끝없는 회랑', p: [qx + 0.5, cy + 14, qz - 4] });

      // ── 뼈 풍경: 죽은 나무 틀에 매단 뼈 줄 넷(부품) ──
      const chimeX0 = 112, chimeZ = 46, ctop = cy + 11;
      for (const px of [chimeX0 - 1, chimeX0 + 9]) { w.box(px, cy + 1, chimeZ, px, ctop, chimeZ, B.barkDk); w.set(px, cy + 1, chimeZ + 1, B.barkDk); }
      w.box(chimeX0 - 2, ctop, chimeZ, chimeX0 + 10, ctop, chimeZ, B.bark); w.set(chimeX0 - 2, ctop + 1, chimeZ, B.crow);
      const chimes = [];
      for (let k = 0; k < 4; k++) {
        const x = chimeX0 + 1 + k * 2, len = 4 + (k % 2) * 2, nm = 'chime' + k;
        const p = w.prop({ name: nm, pivot: [x + 0.5, ctop, chimeZ + 0.5], axis: 'z' });
        for (let q = 1; q <= len; q++) p.set(x, ctop - q, chimeZ, q === len ? B.bone : (q % 2 ? B.iron : B.bone));
        p.set(x, ctop - len - 1, chimeZ, B.bone);
        chimes.push(nm);
      }

      // ── 죽은 나무, 바위, 풀 ──
      for (const [tx2, tz2] of [[12, 55], [20, 138], [50, 145], [75, 100], [145, 108], [10, 98], [82, 75], [148, 20], [40, 118], [110, 135], [18, 30], [150, 70], [8, 12], [26, 8], [128, 150], [64, 152]]) {
        const g = MH.g(w, tx2, tz2);
        if (g > 0 && !w.get(tx2, g + 1, tz2) && w.liq[tx2 + W * tz2] < 0) MH.tree(w, tx2, g + 1, tz2, { kind: 'dead', h: w.ri(13, 21), bark: B.bark, barkDk: B.barkDk, spread: 7, trunkR: 1.4 });
      }
      MH.scatter(w, 1500, (x, g, z, b) => { if (b === B.deadgrass && w.chance(0.5)) w.set(x, g + 1, z, B.deadgrass); else if (b === B.ash && w.chance(0.05)) w.set(x, g + 1, z, B.bone); else if (b === B.deadgrass && w.chance(0.04)) w.set(x, g + 1, z, B.wither); });
      for (let i = 0; i < 30; i++) { const x = w.ri(120, 156), z = w.ri(4, 156), g = MH.g(w, x, z); if (g > base && w.liq[x + W * z] < 0) MH.rock(w, x, g, z, w.r(1.5, 3.6), B.rockM, B.deadgrass); }

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
      const crows = [], CTX = 75, CTZ = 100, ctg = MH.g(w, CTX, CTZ);
      const perch = [];
      for (let z = CTZ - 7; z <= CTZ + 7; z++) for (let x = CTX - 7; x <= CTX + 7; x++) { const t = w.top(x, z); if (t > ctg + 6) perch.push([x, t, z]); }
      perch.sort((p, q) => q[1] - p[1]);
      for (const [x, t, z] of perch) {
        if (crows.length >= 4 || crows.some(c => Math.abs(c[0] - x) + Math.abs(c[2] - z) < 3)) continue;
        if (w.get(x, t + 1, z) || w.get(x, t + 2, z) || w.get(x, t + 1, z - 1) || w.get(x, t + 2, z + 1)) continue;
        const nm = 'crow' + crows.length, cp = w.prop({ name: nm, pivot: [x + 0.5, t + 1, z + 0.5] });
        cp.set(x, t + 1, z, B.crow); cp.set(x, t + 1, z - 1, B.crow); cp.set(x, t + 2, z, B.crow); cp.set(x, t + 2, z + 1, B.gfire);
        crows.push([x, t, z, nm]);
      }
      if (crows.length) acts.push({
        name: '까마귀 떼', hint: '죽은 나무의 까마귀들이 깍깍 날아올라 묘역을 한 바퀴 돌아요', hit: [CTX - 7, crows[0][1] - 4, CTZ - 7, CTX + 7, crows[0][1] + 3, CTZ + 7],
        run: async a => {
          for (const [x, t, z] of crows) a.burst([x + 0.5, t + 1.5, z + 0.5], { n: 14, colors: ['#141218', '#2a2630', '#4a4650'], speed: 4, up: 3, life: 1.6, gravity: 2, spread: 1 });
          // 진행 방향으로 머리를 돌리며 묘역 위를 돌다 북서쪽 하늘 너머로 사라지고, 다시 가지에 나타난다
          await Promise.all(crows.map(([, , , nm], k) => a.drive(nm, [[2 + k, 6, 8], [14, 12 + k, 6], [18, 15, -8 + k], [4, 18, -22], [-14 - k * 2, 20 + k, -30], [-40 - k * 3, 24, -70], [-60 - k * 3, 28, -112]], 6 + k * 0.3, { fwd: '+z', back: 1.0 })));
        },
      });

      // ── 혼불 행렬: 아래 묘역부터 납골당까지 무덤마다 혼불이 솟는다 ──
      const souls = graves.filter(([x, z]) => x > 18 && x < 120 && z < 140).sort((p, q) => q[1] - p[1]).filter((p, k) => k % 2 === 0).slice(0, 28);
      if (souls.length) acts.push({
        name: '혼불 행렬', hint: '아래 묘역부터 무덤마다 혼불이 솟아 납골당까지 이어져요', hit: [souls[0][0] - 3, souls[0][2] + 1, souls[0][1] - 1, souls[0][0] + 3, souls[0][2] + 6, souls[0][1] + 6],
        run: async a => {
          a.glow(1.8, 5);
          for (const [x, z, g] of souls) { a.burst([x + 0.5, g + 5, z + 3.5], { n: 16, colors: ['#8dffba', '#70ffa8', '#ffffff'], speed: 1.2, up: 5, life: 1.8, gravity: -0.5, spread: 0.6 }); await a.wait(0.14); }
          a.flash('crypt', 9, 2.2);
          a.burst([mid + 0.5, wy + 5, fz + 3], { n: 70, colors: ['#8dffba', '#c9ffd9', '#50e890'], speed: 5, up: 6, life: 2.4, gravity: -0.6, spread: 3 });
          await a.wait(1.6);
        },
      });

      // ── 해골 첨탑: 번개가 내리치고 해골 눈에서 초록 불길이 쏟아진다 ──
      w.set(mid - 1, sTop + 3, scz + 1, B.soul); w.set(mid + 1, sTop + 3, scz + 1, B.soul);
      lights.push({ name: 'skull', p: [mid + 0.5, sTop + 3, scz + 2], c: '#70ffa8', i: 0.01, d: 30, flicker: 0.2 });
      acts.push({
        name: '해골 첨탑', hint: '첨탑 꼭대기 해골에 번개가 내리치고 눈에서 초록 불길이 쏟아져요', hit: [mid - 2, sTop, scz - 1, mid + 2, sTop + 5, scz + 2],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.lightning(1 + k * 0.3); a.flash('skull', 300, 0.5);
            a.burst([mid + 0.5, sTop + 6, scz + 0.5], { n: 40, colors: ['#ffffff', '#c9ffd9', '#8dffba'], speed: 9, up: 2, life: 0.8, gravity: 3, spread: 1.5 });
            await a.wait(0.7);
          }
          a.flash('skull', 160, 3); a.glow(1.7, 3);
          for (let k = 0; k < 6; k++) { for (const ex of [mid - 0.5, mid + 1.5]) a.burst([ex, sTop + 3.5, scz + 2], { n: 14, colors: ['#70ffa8', '#8dffba', '#d9d1bd'], speed: 2.5, up: 1, life: 1.8, gravity: -0.8, spread: 0.4 }); await a.wait(0.4); }
        },
      });

      // ── 망자의 나룻배(부품): 초록 등불을 단 빈 배가 협곡 물길을 따라 내려온다 ──
      const FX = 127, FZ = 76, fy = base - 1;
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
          // 뱃머리(+z, 등불 쪽)를 물길 방향으로 돌리며 협곡을 따라 남쪽 끝 안개 너머까지 흘러간다
          await a.drive('boat', [[-1, 0, 5], [-2, 0, 10], [-3, 0, 14], [-4, 0, 18], [-5, 0, 22], [-5, 0, 26], [-4, 0, 31], [-3, 0, 36], [-1, 0, 42], [13, 0, 92]], 9, { fwd: '+z', back: 1.0 });
        },
      });

      // ══ 새 상호작용 ══
      // 화장로: 쇠문이 열리며 불길이 쏟아지고 굴뚝에서 재 기둥이 치솟는다
      acts.push({
        name: '화장로', hint: '화장터 아궁이 쇠문이 열리며 불길이 쏟아지고 굴뚝에서 재 기둥이 치솟아요', hit: [fmx - 4, ky + 1, ffz - 1, fmx + 4, ky + 7, ffz + 2],
        run: async a => {
          a.flash('furnace', 12, 5); a.flash('chim', 5, 5);
          await Promise.all([a.turn('furL', [0, -1.9, 0], 1.2), a.turn('furR', [0, 1.9, 0], 1.2)]);
          for (let k = 0; k < 6; k++) {
            a.burst([fmx + 0.5, ky + 3, ffz + 2], { n: 40, colors: ['#ffd070', '#ff8a3a', '#ff5a2a'], speed: 5, up: 3, life: 1.4, gravity: -0.5, spread: 2 });
            a.burst([chx + 0.5, chTop + 1, chz + 0.5], { n: 50, colors: ['#8e8a86', '#6d6a68', '#ff8a3a', '#b0aaa2'], speed: 2, up: 9, life: 3.2, gravity: -0.3, spread: 1.4 });
            await a.wait(0.45);
          }
          await a.wait(0.8);
          await Promise.all([a.turn('furL', [0, 0, 0], 1.2), a.turn('furR', [0, 0, 0], 1.2)]);
        },
      });
      // 지하묘지 쇠창살: 창살이 올라가고 초록 안개와 혼불이 계단을 타고 흘러나온다
      acts.push({
        name: '지하묘지 쇠창살', hint: '뼈 아치의 쇠창살이 덜컹 올라가고 초록 안개가 계단을 타고 흘러나와요', hit: [qx - 3, qy, qz - 1, qx + 3, cy + 3, qz + 2],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.move('grate', [0, 0.5, 0], 0.12); await a.move('grate', [0, 0, 0], 0.1); }
          a.flash('cata', 30, 5);
          await a.move('grate', [0, 5.5, 0], 1.6);
          for (let k = 0; k < 6; k++) {
            a.burst([qx + 0.5, qy + 2, qz + 1 + k], { n: 26, colors: ['#8dffba', '#50e890', '#c9ffd9'], speed: 2.5, up: 1.5, life: 2.4, gravity: -0.2, spread: 1.6, flat: true });
            await a.wait(0.35);
          }
          a.burst([qx + 0.5, cy + 3, qz + 7], { n: 50, colors: ['#70ffa8', '#ffffff'], speed: 3, up: 6, life: 2.2, gravity: -0.6, spread: 2 });
          await a.wait(1.2);
          await a.move('grate', [0, 0, 0], 0.5);
          a.burst([qx + 0.5, qy, qz + 1], { n: 24, colors: ['#5a3a2a', '#8e8a86'], speed: 4, up: 1, life: 0.8, gravity: 4, spread: 1.5, flat: true });
        },
      });
      // 뼈 풍경: 바람에 뼈 줄이 번갈아 흔들리며 달그락거리고 재가 휘날린다
      acts.push({
        name: '뼈 풍경', hint: '죽은 나무 틀에 매단 뼈 줄이 바람에 번갈아 흔들리며 달그락거려요', hit: [chimeX0, ctop - 7, chimeZ - 1, chimeX0 + 7, ctop, chimeZ + 1],
        run: async a => {
          a.wind(2.4, 3.6);
          for (let k = 0; k < 5; k++) {
            await Promise.all(chimes.map((nm, i) => a.turn(nm, [0, 0, ((k + i) % 2 ? 0.5 : -0.5) * (1 - k * 0.12)], 0.32)));
            a.burst([chimeX0 + 4, ctop - 4, chimeZ + 0.5], { n: 16, colors: ['#d9d1bd', '#8e8a86', '#b0aaa2'], speed: 6, up: 1, life: 1.6, gravity: 0.4, spread: 3, flat: true });
          }
          await Promise.all(chimes.map(nm => a.turn(nm, [0, 0, 0], 0.5)));
        },
      });

      const smoke = [];
      if (hut.chimney) smoke.push({ n: 40, colors: ['#6a6670', '#8a8690'], mode: 'rise', speed: 0.6, area: [hut.chimney[0], hut.chimney[2], 0.6], y0: hut.chimney[1], y1: hut.chimney[1] + 20, glow: false });
      smoke.push({ n: 90, colors: ['#6d6a68', '#8e8a86', '#4a4648'], mode: 'rise', speed: 0.7, area: [chx + 0.5, chz + 0.5, 1.2], y0: chTop + 1, y1: chTop + 30, glow: false });
      smoke.push({ n: 24, colors: ['#ffb060', '#ff7a2a'], mode: 'rise', speed: 1, area: [chx + 0.5, chz + 0.5, 0.8], y0: chTop + 1, y1: chTop + 10 });
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
