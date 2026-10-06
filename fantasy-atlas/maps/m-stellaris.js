// 천문대 언덕 — 구름바다 위 바위 봉우리, 정상의 대망원경, 혼천의 광장, 유성 구덩이 (168칸으로 확장: 남쪽 아랫단 별빛 시장 추가)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 140;
  MAPS.push({
    id: 'stellaris', cat: 'magic', name: '천문대 언덕', en: 'Stellaris Hill', color: '#6ab0ff', seed: 327, base: 22, time: 'night', size: [W, D, Hh],
    desc: '아르카나에서 별에 가장 가까운 봉우리. 광장의 혼천의는 별의 움직임에 맞춰 스스로 돈다. 남쪽 아랫단에서는 밤에만 별빛 시장이 열려, 달시계 아래로 별가루와 점괘를 판다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '점성술사 회당'], ['명물', '밤에만 열리는 별빛 시장 · 달시계'], ['주의', '혼천의가 멈추면 불길한 징조']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#a0c0ff', '#0a1020', 0.6], sun: ['#c0d8ff', 0.52, [0.45, 1, 0.5]],
    day: { sky: ['#dcecf8', '#5a90d8', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5060', 0.6], sun: ['#fff6e4', 0.8, [0.45, 1, 0.5]], haze: '#e8f0f8' },
    liquid: ['#0a1a4a', '#1a3a8a', '#ffffff'], liqSpeed: 0.5,
    fog: { start: 0.84, floor: 14, depth: 10, haze: [34, 0.55, 8], hazeColor: '#1a2848' },
    camY: -12, zoom: 1.05,
    particles: [
      { n: 200, colors: ['#ffffff', '#b8d0ff'], mode: 'drift', speed: 0.2, y0: 44, y1: 128 },
      { n: 40, colors: ['#ffc080', '#ffe0b0'], mode: 'rise', speed: 0.6, area: [131, 128, 4], y0: 30, y1: 56 },
      { n: 30, colors: ['#fff8d0', '#8ab8ff'], mode: 'rise', speed: 0.3, area: [84, 147, 14], y0: 32, y1: 60 },
    ],
    blocks: {
      grass: { c: '#3a3a44', top: '#3a5a5a', v: 0.1 }, grass2: { c: '#3a3a44', top: '#34504e', v: 0.1 },
      dirt: { c: '#3a3a44', v: 0.08 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, rockDk: { c: '#2e3246', v: 0.06, pat: 'stone' }, rockM: { c: '#4a3a3a', v: 0.1 },
      path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' }, marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 },
      roofN: { c: '#1a2a5a', v: 0.05, pat: 'tile' }, silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 },
      door: { c: '#1a1a2a', v: 0.02, pat: 'plank' }, bark: { c: '#3a3a44', v: 0.06 }, leaf: { c: '#2a4a5a', v: 0.1 }, leaf2: { c: '#3a6a70', v: 0.1 },
      win: { c: '#b8d0ff', night: true, day: '#7a90b8' }, lamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' },
      starG: { c: '#fff8d0', glow: true }, starB: { c: '#8ab8ff', glow: true }, meteor: { c: '#ffb86a', glow: true }, lens: { c: '#a0d8ff', glow: true },
      cloth1: { c: '#2a3a8a', v: 0.04 }, cloth2: { c: '#d8dcf0', v: 0.03 }, cloth3: { c: '#5a3a8a', v: 0.04 }, wood: { c: '#4a3a3a', v: 0.05, pat: 'plank' }, lanternB: { c: '#ffd890', glow: true }, moon: { c: '#f0f0ff', glow: true }, orbG: { c: '#c0a0ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, SX = 84, SZ = 52;
      const terr = z => z < 81 ? 39 : z < 131 ? 24 : 8;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const d = Math.hypot((x - 84) * 0.9, z - 84);
          return base + Math.max(0, MH.sstep(79, 52, d) * terr(z)) + n.fbm(x * 0.038, z * 0.038) * 4 + n.ridge(x * 0.03, z * 0.03, 3) * 4;
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : n.fbm(x * 0.085, z * 0.085, 2) > 0.55 ? B.grass2 : B.grass,
        under: (x, z, y, dep, s) => dep < 2 && s < 3 ? B.dirt : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      const lights = [], acts = [], landmarks = [];
      // ── 정상: 대천문대(원형 기단과 옥상의 대망원경) ──
      const oy = MH.maxG(w, SX - 18, SZ - 18, SX + 18, SZ + 18);
      MH.flatten(w, SX - 23, SZ - 23, SX + 23, SZ + 23, oy, B.path, B.rock);
      for (let z = SZ - 23; z <= SZ + 23; z++) for (let x = SX - 23; x <= SX + 23; x++) { const d = MH.dist(x, z, SX, SZ); if (d > 20 && d < 23 && (x + z) % 2 === 0) MH.paint(w, x, z, B.marbleDk); }
      MH.retain(w, SX - 23, SZ - 23, SX + 23, SZ + 23, B.marbleDk, B.trim);
      const Y = oy + 1;
      w.cyl(SX, SZ, Y, Y + 1, 19.5, B.marbleDk); w.ring(SX, SZ, Y + 1, 18.5, 19.5, B.trim);
      w.cyl(SX, SZ, Y + 2, Y + 17, 17, B.marble);
      for (let a = 0; a < 20; a++) {
        const ang = a / 20 * Math.PI * 2, x = Math.round(SX + Math.cos(ang) * 16.8), z = Math.round(SZ + Math.sin(ang) * 16.8);
        if (a % 2) { w.box(x, Y + 6, z, x, Y + 12, z, B.win); w.set(x, Y + 5, z, B.trim); w.set(x, Y + 13, z, B.brass); }
        else { const px = Math.round(SX + Math.cos(ang) * 17.6), pz = Math.round(SZ + Math.sin(ang) * 17.6); w.box(px, Y + 2, pz, px, Y + 16, pz, B.marbleDk); w.set(px, Y + 17, pz, B.trim); }
      }
      w.ring(SX, SZ, Y + 10, 17, 17.8, B.trim); w.ring(SX, SZ, Y + 4, 17, 17.8, B.marbleDk); w.cyl(SX, SZ, Y + 18, Y + 18, 18.4, B.marbleDk); w.ring(SX, SZ, Y + 19, 17.2, 18.4, B.trim);
      for (let a = 0; a < 36; a += 2) { const ang = a / 36 * Math.PI * 2; w.set(Math.round(SX + Math.cos(ang) * 17.8), Y + 20, Math.round(SZ + Math.sin(ang) * 17.8), B.trim); }
      // 옥상 안쪽 별자리 원판
      MH.circle; for (let a = 0; a < 6.28; a += 0.05) w.set(Math.round(SX + Math.cos(a) * 12), Y + 18, Math.round(SZ + Math.sin(a) * 12), B.silver);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; w.set(Math.round(SX + Math.cos(a) * 10), Y + 18, Math.round(SZ + Math.sin(a) * 10), k % 3 ? B.starB : B.starG); }
      // 정문: 황동 처마, 기둥, 계단, 등불
      w.box(SX - 3, Y + 2, SZ + 17, SX + 3, Y + 10, SZ + 17, B.door); w.box(SX - 4, Y + 11, SZ + 17, SX + 4, Y + 11, SZ + 19, B.brass); w.box(SX - 3, Y + 12, SZ + 18, SX + 3, Y + 12, SZ + 18, B.brassDk); w.set(SX, Y + 13, SZ + 18, B.starG);
      for (const bx of [SX - 4, SX + 4]) w.box(bx, Y + 2, SZ + 18, bx, Y + 10, SZ + 18, B.trim);
      for (let s = 0; s < 3; s++) w.box(SX - 5 - s, Y + 1 - s, SZ + 19 + s, SX + 5 + s, Y + 1 - s, SZ + 19 + s, s % 2 ? B.marble : B.marbleDk);
      for (const lx of [SX - 7, SX + 7]) { w.box(lx, Y + 1, SZ + 19, lx, Y + 7, SZ + 19, B.iron); w.set(lx, Y + 8, SZ + 19, B.lamp); w.set(lx, Y + 9, SZ + 19, B.iron); }
      lights.push({ p: [SX + 0.5, Y + 8, SZ + 20], c: '#d0e0ff', i: 1.1, d: 16, flicker: 0.05, night: true, srcR: 8 });
      // 망원경 받침(월드)과 경통(부품, 수평으로 돈다)
      const MY = Y + 19;
      w.cyl(SX, SZ, MY, MY + 1, 5.2, B.brassDk); w.ring(SX, SZ, MY + 1, 4.2, 5.2, B.brass); w.cyl(SX, SZ, MY + 2, MY + 6, 2.6, B.iron);
      const scope = w.prop({ name: 'scope', pivot: [SX + 0.5, MY + 12.5, SZ + 0.5], axis: 'y', speed: 0.05, clipOK: 8 });
      const L = 25;
      for (let t = -0.35; t <= 1.0001; t += 0.015) {
        const z = SZ + t * L * 0.78, y = MY + 12 + t * L * 0.62;
        scope.sphere(SX, Math.round(y), Math.round(z), t < 0 ? 3 : 2.5 - t * 0.3, t > 0.9 ? B.brassDk : (Math.round(t * 60) % 12 === 0 ? B.brassDk : B.brass));
      }
      const tipZ = Math.round(SZ + L * 0.78), tipY = Math.round(MY + 12 + L * 0.62);
      scope.cyl(SX, tipZ + 1, tipY, tipY, 1, B.lens); scope.set(SX, tipY + 1, tipZ + 1, B.lens); scope.set(SX, tipY - 1, tipZ + 1, B.lens);
      const fy = Math.round(MY + 12 + 0.55 * L * 0.62), fz = Math.round(SZ + 0.55 * L * 0.78);
      scope.line(SX + 2, fy + 2, fz - 2, SX + 2, fy + 3, fz + 3, B.brassDk, 0.6); scope.set(SX + 2, fy + 3, fz + 4, B.lens);
      // 경통을 받치는 멍에
      scope.box(SX - 4, MY + 8, SZ, SX + 4, MY + 8, SZ, B.brassDk);
      for (const dx of [-4, 4]) scope.box(SX + dx, MY + 8, SZ, SX + dx, MY + 13, SZ, B.brassDk);
      scope.box(SX - 4, MY + 12, SZ, SX + 4, MY + 12, SZ, B.iron);
      lights.push({ name: 'scope', p: [SX + 0.5, MY + 15, SZ + 4], c: '#a0d8ff', i: 1.2, d: 22, flicker: 0.05, srcR: 30 });
      acts.push({
        name: '대망원경', hint: '경통이 밤하늘을 따라 한 바퀴 돌아요', hit: [SX - 6, MY, SZ - 6, SX + 6, MY + 28, SZ + 21],
        run: async a => {
          a.flash('scope', 3, 6);
          await a.turn('scope', [0, 2.1, 0], 2.6); a.burst([SX + 16, tipY + 5, SZ - 8], { n: 30, colors: ['#ffffff', '#a0d8ff'], speed: 3, up: 1, life: 2, gravity: 0, spread: 6 });
          await a.wait(0.8);
          await a.turn('scope', [0, 4.4, 0], 2.8); a.burst([SX - 16, tipY + 5, SZ - 8], { n: 30, colors: ['#ffffff', '#fff8d0'], speed: 3, up: 1, life: 2, gravity: 0, spread: 6 });
          await a.wait(0.8);
          await a.turn('scope', [0, 6.283, 0], 2.4); a.unwind('scope');
        },
      });
      landmarks.push({ name: '대천문대', note: '옥상에서 도는 황동 대망원경', p: [SX + 0.5, tipY + 10, SZ + 0.5], tag: 'OBSERV' });
      // ── 정상에서 광장까지 큰 계단(층계참마다 등주) ──
      const PZ = 110, py = MH.g(w, 84, PZ);
      MH.flatten(w, 58, 92, 110, 128, py, B.path, B.rock);
      for (let z = SZ + 23, y = oy; z < 94 && y > py; z++, y--) { for (let x = SX - 5; x <= SX + 5; x++) { MH.setH(w, x, z, Math.max(py, y), (x === SX - 5 || x === SX + 5) ? B.marbleDk : (z % 2 ? B.path : B.marble), B.rock); for (let q = 1; q <= 6; q++) w.set(x, Math.max(py, y) + q, z, 0); } if (z % 5 === 0) for (const x of [SX - 6, SX + 6]) { const g = MH.g(w, x, z); w.box(x, g + 1, z, x, g + 5, z, B.marbleDk); w.set(x, g + 6, z, B.lamp); w.set(x, g + 7, z, B.trim); } }
      lights.push({ p: [SX - 5.5, MH.g(w, SX - 6, 80) + 6, 80.5], c: '#d0e0ff', i: 0.9, d: 13, flicker: 0.05, night: true });
      // ── 혼천의 광장 ──
      for (let z = 92; z <= 128; z++) for (let x = 58; x <= 110; x++) { const d = MH.dist(x, z, 84, PZ); if (d < 17.7) MH.paint(w, x, z, d > 16.5 ? B.marble : B.marbleDk); }
      MH.circle(w, 84, PZ, 15.5, B.trim); MH.circle(w, 84, PZ, 6, B.silver);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; for (let r = 7; r <= 15; r++) if (r % 2) MH.paint(w, Math.round(84 + Math.cos(a) * r), Math.round(PZ + Math.sin(a) * r), B.silver); }
      const stars = [[63, 97], [67, 100], [71, 97], [73, 102], [70, 106], [97, 96], [102, 100], [100, 105], [94, 108], [64, 121], [68, 125], [75, 123], [96, 123], [102, 119], [92, 126], [60, 110], [108, 110]];
      for (const [sx, sz] of stars) { MH.paint(w, sx, sz, hash3(sx, 1, sz) > 0.5 ? B.starG : B.starB); MH.paint(w, sx + 1, sz, B.starB); }
      for (let i = 0; i < stars.length - 1; i++) if (i % 5 !== 4 && Math.hypot(stars[i][0] - stars[i + 1][0], stars[i][1] - stars[i + 1][1]) < 8) { const [ax, az] = stars[i], [bx, bz] = stars[i + 1]; const nn = Math.ceil(Math.hypot(bx - ax, bz - az)); for (let s = 1; s < nn; s++) MH.paint(w, Math.round(MH.lerp(ax, bx, s / nn)), Math.round(MH.lerp(az, bz, s / nn)), B.silver); }
      w.cyl(84, PZ, py + 1, py + 2, 4, B.marble); w.ring(84, PZ, py + 2, 3, 4, B.trim); w.cyl(84, PZ, py + 3, py + 4, 2.6, B.marbleDk); w.box(84, py + 5, PZ, 84, py + 6, PZ, B.brass);
      const ay = py + 20;
      w.box(84, py + 7, PZ, 84, ay - 3, PZ, B.brass);
      w.sphere(84, ay, PZ, 2.3, B.starG);
      const rA = w.prop({ name: 'ringA', pivot: [84.5, ay + 0.5, PZ + 0.5], axis: 'y', speed: 0.25 }); MH.ringProp(rA, 84, ay, PZ, 12, 'xz', B.brass, B.starB, 12);
      const rB = w.prop({ name: 'ringB', pivot: [84.5, ay + 0.5, PZ + 0.5], axis: 'y', speed: -0.4, clipOK: 4 }); MH.ringProp(rB, 84, ay, PZ, 10, 'xy', B.brass, B.starG, 8);
      const rC = w.prop({ name: 'ringC', pivot: [84.5, ay + 0.5, PZ + 0.5], axis: 'y', speed: 0.7, clipOK: 4 }); MH.ringProp(rC, 84, ay, PZ, 8, 'yz', B.silver, B.starB, 6);
      lights.push({ name: 'arm', p: [84.5, ay, PZ + 0.5], c: '#fff0c0', i: 1.3, d: 20, flicker: 0.05 });
      acts.push({
        name: '혼천의', hint: '세 고리가 빠르게 돌며 별빛을 뿌려요', hit: [72, py + 6, PZ - 12, 96, ay + 12, PZ + 12],
        run: async a => { a.flash('arm', 3, 4.5); a.spin('ringA', 8, 4.5); a.spin('ringB', 8, 4.5); a.spin('ringC', 8, 4.5); for (let k = 0; k < 9; k++) { a.burst([84.5, ay, PZ + 0.5], { n: 24, colors: ['#fff8d0', '#8ab8ff', '#ffffff'], speed: 10, up: 2, life: 1.8, gravity: 0.5, spread: 1 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '혼천의 광장', note: '세 고리가 스스로 도는 혼천의', p: [84.5, ay + 15, PZ + 0.5] });
      landmarks.push({ name: '별자리 정원', note: '바닥에 박힌 별 지도', p: [66.5, py + 6, 122.5] });
      // 광장 둘레 벤치와 화분
      for (const [bx, bz] of [[62, 100], [104, 100], [62, 118], [104, 118]]) { if (MH.g(w, bx, bz) !== py) continue; w.box(bx, py + 1, bz, bx, py + 1, bz + 2, B.wood); w.set(bx, py + 1, bz, B.iron); w.set(bx, py + 1, bz + 2, B.iron); w.box(bx + 1, py + 1, bz + 4, bx + 1, py + 1, bz + 4, B.marbleDk); w.set(bx + 1, py + 2, bz + 4, B.leaf2); }
      // ── 유성 구덩이 ──
      const MXX = 131, MZZ = 128, my = MH.g(w, MXX, MZZ);
      for (let z = MZZ - 12; z <= MZZ + 12; z++) for (let x = MXX - 12; x <= MXX + 12; x++) {
        const d = MH.dist(x, z, MXX, MZZ), g = MH.g(w, x, z);
        if (g < 0 || d > 10) { if (d <= 12 && d > 10 && hash3(x, 2, z) > 0.4) { w.set(x, g + 1, z, B.rockM); if (hash3(x, 4, z) > 0.8) w.set(x, g + 2, z, B.rockM); } continue; }
        const dep = Math.round((10 - d) * 0.7);
        MH.setH(w, x, z, my - dep, d < 4 ? B.rockM : B.dirt, B.rock);
      }
      w.sphere(MXX, my - 5, MZZ, 3, B.meteor, (dx, dy) => dy >= -1); w.sphere(MXX, my - 6, MZZ, 3.4, B.rockM, (dx, dy) => dy < -1);
      for (let i = 0; i < 9; i++) { const a = i * 0.7 + 0.3; for (let s = 4; s <= 11; s++) if (hash3(i, s, 3) > 0.25) MH.paint(w, Math.round(MXX + Math.cos(a + s * 0.05) * s), Math.round(MZZ + Math.sin(a + s * 0.05) * s), B.meteor); }
      for (const [dx, dz] of [[6, -3], [-5, 5], [2, 7]]) { const g = MH.g(w, MXX + dx, MZZ + dz); w.box(MXX + dx, g + 1, MZZ + dz, MXX + dx, g + 2, MZZ + dz, B.meteor); }
      // 구덩이 둘레의 관측용 밧줄 울타리
      for (let a = 0; a < 6.28; a += 0.26) { const x = Math.round(MXX + Math.cos(a) * 13), z = Math.round(MZZ + Math.sin(a) * 13), g = MH.g(w, x, z); if (g < 0 || w.get(x, g + 1, z)) continue; if (Math.round(a / 0.26) % 3 === 0) w.box(x, g + 1, z, x, g + 2, z, B.wood); }
      lights.push({ name: 'meteor', p: [MXX + 0.5, my - 1, MZZ + 0.5], c: '#ffa050', i: 1.6, d: 20, flicker: 0.2 });
      acts.push({
        name: '유성 구덩이', hint: '하늘에서 별똥별이 쏟아져 구덩이에 떨어져요', hit: [MXX - 9, my - 6, MZZ - 9, MXX + 9, my + 2, MZZ + 9],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            a.burst([MXX - 18 + k * 4, my + 56, MZZ - 16], { n: 26, colors: ['#ffe0a0', '#ffffff', '#ffb86a'], speed: 1, up: -24, life: 1.3, gravity: 14, spread: 1 });
            await a.wait(0.8);
            a.flash('meteor', 4, 0.5);
            a.burst([MXX + 0.5, my - 2, MZZ + 0.5], { n: 50, colors: ['#ffb86a', '#ffe0a0', '#ff7a3a'], speed: 10, up: 8, life: 1.3, gravity: 9, spread: 2 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '유성 구덩이', note: '아직 식지 않은 별 조각', p: [MXX + 0.5, my + 11, MZZ + 0.5] });
      // ── 점성술사의 집(돔 지붕)과 관측 탑 ──
      const hm = { found: B.marbleDk, wall: B.marble, frame: B.marbleDk, quoin: B.trim, win: B.win, sill: B.trim, door: B.door, roof: B.roofN, eave: B.iron, lamp: B.lamp };
      const domes = [];
      for (const [x, z, face] of [[28, 100, 'e'], [32, 124, 'e'], [36, 144, 'e'], [120, 146, 'n'], [128, 90, 'w']]) {
        const h = MH.house(w, { x, z, sx: 11, sz: 11, fh: 7, face, roof: 'flat', m: hm });
        w.cyl(x + 5, z + 5, h.top + 1, h.top + 2, 4.6, B.marbleDk); w.ring(x + 5, z + 5, h.top + 2, 3.8, 4.8, B.trim);
        const dt = MH.dome(w, x + 5, h.top + 3, z + 5, 4.8, B.roofN, B.silver);
        for (let a = 0; a < 4; a++) for (let t = 0.2; t < 1.4; t += 0.1) w.set(Math.round(x + 5 + Math.cos(a * 1.57) * Math.cos(t) * 5), Math.round(h.top + 3 + Math.sin(t) * 5), Math.round(z + 5 + Math.sin(a * 1.57) * Math.cos(t) * 5), B.silver);
        w.set(x + 5, dt, z + 5, B.silver); domes.push([x + 5, dt, z + 5]);
        if (domes.length <= 3) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#d0e0ff', i: 0.8, d: 11, flicker: 0.05, night: true });
      }
      const tTop = [];
      for (const [tx, tz] of [[31, 66], [136, 60]]) {
        const g = MH.g(w, tx, tz) + 1;
        const t = MH.tower(w, { cx: tx, cz: tz, y0: g, h: 24, r: 3.8, m: { wall: B.marble, band: B.marbleDk, win: B.win, cren: B.trim } });
        tTop.push(t);
        if (tx < 84) { w.line(tx, t, tz, tx + 5, t + 6, tz + 4, B.brass, 0.8); w.set(tx + 6, t + 7, tz + 5, B.lens); continue; }
        // 동쪽 탑의 망원경은 부품(수평으로 돈다)
        w.box(tx, t - 1, tz, tx, t, tz, B.iron);
        const ts = w.prop({ name: 'tscope', pivot: [tx + 0.5, t + 1, tz + 0.5], axis: 'y' });
        ts.line(tx, t + 1, tz, tx + 5, t + 7, tz + 4, B.brass, 0.8); ts.set(tx + 6, t + 8, tz + 5, B.lens); ts.set(tx, t + 1, tz, B.brassDk);
        lights.push({ name: 'tscope', p: [tx + 4.5, t + 6, tz + 3.5], c: '#a0d8ff', i: 1.1, d: 18, flicker: 0.05 });
      }
      // 선돌과 나무
      const menh = w.prop({ name: 'menhirs', pivot: [84.5, py + 1, PZ + 0.5], axis: 'y' }), mPts = [];
      for (let i = 0; i < 10; i++) { const a = i * 0.63, x = Math.round(84 + Math.cos(a) * 22), z = Math.round(PZ + Math.sin(a) * 15), g = MH.g(w, x, z); if (g === py && !w.get(x, g + 1, z) && Math.abs(x - 84) > 8) { menh.box(x, g + 1, z, x, g + 6 + (i % 3), z, B.marbleDk); menh.set(x, g + 4, z, i % 2 ? B.starG : B.starB); menh.set(x, g + 7 + (i % 3), z, B.trim); mPts.push([x + 0.5, g + 3, z + 0.5]); } }
      for (let i = 0; i < 40; i++) { const x = w.ri(8, 160), z = w.ri(8, 160), g = MH.g(w, x, z); if (g > base + 1 && w.slope[x + W * z] < 2 && !w.get(x, g + 1, z) && w.get(x, g, z) !== B.path && w.get(x, g, z) !== B.marbleDk && MH.dist(x, z, SX, SZ) > 26 && MH.dist(x, z, MXX, MZZ) > 15 && MH.dist(x, z, 84, PZ) > 21 && !(z > 134 && x > 56 && x < 116)) MH.tree(w, x, g + 1, z, { kind: 'pine', h: w.ri(11, 18), bark: B.bark, leaves: [B.leaf2, B.leaf, B.leaf], r: 3.8 }); }
      for (let i = 0; i < 180; i++) { const x = w.ri(2, W - 3), z = w.ri(2, D - 3), g = MH.g(w, x, z); if (g < 0 || w.get(x, g + 1, z) || (w.get(x, g, z) !== B.grass && w.get(x, g, z) !== B.grass2)) continue; const r = hash3(x, 6, z); if (r > 0.94) MH.rock(w, x, g + 1, z, 1.3, B.rock, B.grass2); else w.set(x, g + 1, z, r > 0.85 ? B.starB : B.leaf2); }
      // ── 동쪽 관측 탑: 작은 망원경이 하늘을 훑는다 ──
      const ET = tTop[1];
      acts.push({
        name: '관측 탑', hint: '동쪽 탑의 망원경이 하늘을 훑으며 별을 찾아요', hit: [131, ET - 7, 55, 143, ET + 9, 66],
        run: async a => {
          a.flash('tscope', 3, 6);
          await a.turn('tscope', [0, 1.6, 0], 1.4); a.burst([136 + 6, ET + 14, 60 - 7], { n: 24, colors: ['#ffffff', '#a0d8ff'], speed: 3, up: 1, life: 1.6, gravity: 0, spread: 4 });
          await a.wait(0.5);
          await a.turn('tscope', [0, 3.6, 0], 1.4); a.burst([136 - 7, ET + 14, 60 - 4], { n: 24, colors: ['#ffffff', '#fff8d0'], speed: 3, up: 1, life: 1.6, gravity: 0, spread: 4 });
          await a.wait(0.5);
          await a.turn('tscope', [0, 6.283, 0], 1.6); a.unwind('tscope');
          a.burst([136 + 7, ET + 10, 60 + 6], { n: 30, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 4, up: 1, life: 1.8, gravity: 0, spread: 3 });
        },
      });
      // ── 점성술사의 집(남동쪽): 돔에서 망원경(부품, 평소엔 안에 숨음)이 솟아 돈다 ──
      const [DX, DT, DZ] = domes[3];
      const dscope = w.prop({ name: 'dscope', pivot: [DX + 0.5, DT + 1, DZ + 0.5], axis: 'y', off0: [0, -10, 0] });
      dscope.line(DX, DT + 1, DZ, DX + 3, DT + 10, DZ + 3, B.brass, 0.9); dscope.box(DX, DT + 1, DZ, DX, DT + 2, DZ, B.brassDk); dscope.set(DX + 3, DT + 11, DZ + 3, B.lens); dscope.set(DX + 4, DT + 10, DZ + 3, B.lens);
      acts.push({
        name: '돔 망원경', hint: '점성술사의 돔에서 망원경이 솟아올라 빙 돌아요', hit: [DX - 5, DT - 6, DZ - 5, DX + 5, DT + 2, DZ + 5],
        run: async a => {
          a.burst([DX + 0.5, DT + 1, DZ + 0.5], { n: 24, colors: ['#c8d4e0', '#ffffff'], speed: 3, up: 2, life: 1, gravity: 3, spread: 2 });
          await a.move('dscope', [0, 0, 0], 1.6);
          await a.turn('dscope', [0, 6.283, 0], 3.6);
          a.unwind('dscope');
          for (let k = 0; k < 3; k++) { a.burst([DX + 4, DT + 14, DZ + 4], { n: 24, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 3, up: 2, life: 1.6, gravity: 0, spread: 3 }); await a.wait(0.4); }
          await a.move('dscope', [0, -10, 0], 1.4);
        },
      });
      // ── 별자리 정원: 바닥의 별이 떠올라 하늘에 큰 별자리(부품, 평소엔 숨김)를 그린다 ──
      const CGX = 68, CGZ = 115, CGY = py + 40, U = Math.SQRT1_2;
      const cst = w.prop({ name: 'cstars', pivot: [CGX + 0.5, py + 1, CGZ + 0.5], scl0: [0, 0, 0] });
      const dip = [[-20, 1], [-13, 4], [-6, 5], [0, 2], [1, -4], [10, -5], [12, 2]].map(([u, v]) => [Math.round(CGX + u * U), CGY + v, Math.round(CGZ - u * U)]);
      for (let i = 0; i < dip.length - 1; i++) { const [ax2, ay2, az] = dip[i], [bx, by2, bz] = dip[i + 1 === 7 ? 3 : i + 1]; cst.line(ax2, ay2, az, bx, by2, bz, B.silver, 0); }
      cst.line(dip[6][0], dip[6][1], dip[6][2], dip[3][0], dip[3][1], dip[3][2], B.silver, 0);
      for (const [x, y, z] of dip) { cst.box(x - 1, y, z, x + 1, y, z, B.starG); cst.box(x, y - 1, z, x, y + 1, z, B.starG); cst.set(x, y, z - 1, B.starB); cst.set(x, y, z + 1, B.starB); }
      acts.push({
        name: '별자리 승천', hint: '바닥의 별들이 하늘로 떠올라 커다란 별자리를 그려요', hit: [58, py, 115, 76, py + 3, 127],
        run: async a => {
          a.glow(1.7, 7);
          for (let k = 0; k < 4; k++) a.burst([CGX + 0.5 - k * 2, py + 1, CGZ + 6.5 + k], { n: 20, colors: ['#fff8d0', '#8ab8ff'], speed: 1, up: 12, life: 1.6, gravity: 0, spread: 2 });
          await a.tween('cstars', { scl: [1, 1, 1] }, 2.4);
          for (const p of dip) { a.burst([p[0] + 0.5, p[1] + 0.5, p[2] + 0.5], { n: 18, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 4, up: 0, life: 1.6, gravity: 0, spread: 1 }); await a.wait(0.25); }
          await a.wait(1.8);
          await a.tween('cstars', { scl: [0, 0, 0] }, 1.8);
        },
      });
      // ── 혜성: 서쪽 탑에서 부르면 하늘을 가로지른다(부품, 평소엔 숨김) ──
      const C0 = [40, base + 82, 126], C1 = [128, base + 74, 38];
      const comet = w.prop({ name: 'comet', pivot: [C0[0] + 0.5, C0[1] + 0.5, C0[2] + 0.5], scl0: [0, 0, 0] });
      comet.sphere(C0[0], C0[1], C0[2], 2.8, B.starG);
      for (let s = 1; s <= 20; s++) { const r = 2.5 - s * 0.12, x = Math.round(C0[0] - s * 0.72), y = Math.round(C0[1] + s * 0.15), z = Math.round(C0[2] + s * 0.72); if (r > 0.5) comet.sphere(x, y, z, r, s < 7 ? B.starG : B.starB); else comet.set(x, y, z, B.starB); }
      const cOff = t => [(C1[0] - C0[0]) * t, (C1[1] - C0[1]) * t, (C1[2] - C0[2]) * t];
      acts.push({
        name: '혜성', hint: '서쪽 탑에서 부르면 꼬리 긴 혜성이 하늘을 가로질러 지평선 너머로 사라져요', hit: [25, tTop[0] - 7, 60, 38, tTop[0] + 8, 72],
        run: async a => {
          a.burst([31.5, tTop[0] + 2, 66.5], { n: 30, colors: ['#8ab8ff', '#ffffff'], speed: 1, up: 16, life: 1.4, gravity: 0, spread: 1 });
          await a.tween('comet', { scl: [1, 1, 1] }, 0.6);
          for (let k = 1; k <= 6; k++) { const o = cOff(k / 6); await a.move('comet', o, 0.9, t => t); a.burst([C0[0] + o[0] - 2, C0[1] + o[1], C0[2] + o[2] + 2], { n: 24, colors: ['#fff8d0', '#8ab8ff', '#ffffff'], speed: 1.5, up: -1, life: 1.6, gravity: 2, spread: 2 }); }
          a.lightning(0.3);
          await a.move('comet', cOff(1.75), 1.2, t => t);
          await a.respawn('comet', 1.0);
        },
      });
      // ── 선돌 공명: 광장 둘레의 선돌이 떠올라 광장을 한 바퀴 돈다 ──
      acts.push({
        name: '선돌 공명', hint: '광장 둘레의 선돌들이 떠올라 광장을 한 바퀴 돌아요', hit: [100, py + 1, 94, 108, py + 10, 126],
        run: async a => {
          a.glow(1.6, 7);
          for (const p of mPts) a.burst([p[0], py + 1, p[2]], { n: 14, colors: ['#c8d0e0', '#8a94a8'], speed: 2, up: 2, life: 0.8, gravity: 6, spread: 1, flat: true });
          await a.move('menhirs', [0, 5, 0], 1.2);
          a.turn('menhirs', [0, 6.283, 0], 4.2);
          for (let k = 0; k < 7; k++) { a.burst([84.5, py + 9, PZ + 0.5], { n: 24, colors: ['#fff8d0', '#8ab8ff'], speed: 11, up: 0, life: 1.6, gravity: 0, spread: 1, flat: true }); await a.wait(0.6); }
          a.unwind('menhirs');
          await a.move('menhirs', [0, 0, 0], 1.2);
        },
      });
      // ── 새 구역: 남쪽 아랫단의 별빛 시장 — 천막 노점, 별 등불 줄, 달시계, 점성 천막 ──
      const MKX = 86, MKZ = 148, mky = MH.g(w, MKX, MKZ);
      MH.flatten(w, 60, 136, 112, 160, mky, B.path, B.rock);
      MH.retain(w, 60, 136, 112, 160, B.marbleDk, B.trim);
      for (let z = 136; z <= 160; z++) for (let x = 60; x <= 112; x++) if ((x + z * 3) % 9 === 0) MH.paint(w, x, z, B.marbleDk); else if (hash3(x, 21, z) > 0.985) MH.paint(w, x, z, B.starB);
      // 광장에서 시장으로 내려가는 계단
      MH.flight(w, { axis: 'z', c: 84, half: 2, a: 123, b: 142, ha: py, hb: mky, step: B.path, edge: B.marbleDk, rail: B.trim, post: B.marbleDk, postGap: 3 });
      const tents = [[62, 138, 0], [72, 138, 1], [98, 138, 2], [106, 138, 0], [62, 152, 1], [104, 152, 2]];
      const cl = [[B.cloth1, B.cloth2], [B.cloth3, B.cloth2], [B.cloth1, B.cloth3]], goodsS = [[B.starG, B.lens, B.silver], [B.starB, B.brass, B.lanternB], [B.moon, B.starG, B.cloth3]];
      for (const [x, z, k] of tents) MH.stall(w, x, z, { sx: 6, sz: 5, m: { post: B.wood, counter: B.wood, a1: cl[k][0], a2: cl[k][1], goods: goodsS[k], crate: B.brassDk } });
      // 별 등불 줄
      MH.garland(w, [62, mky + 9, 144], [110, mky + 9, 144], B.iron, [B.lanternB, B.starG, B.starB], 3);
      MH.garland(w, [62, mky + 9, 158], [110, mky + 9, 158], B.iron, [B.lanternB, B.starB], 3);
      for (const x of [61, 111]) for (const z of [144, 158]) { w.box(x, mky + 1, z, x, mky + 9, z, B.wood); w.set(x, mky + 10, z, B.lanternB); }
      lights.push({ name: 'mkt', p: [86.5, mky + 7, 144.5], c: '#ffd890', i: 1.2, d: 22, flicker: 0.12, srcR: 6 });
      // 달시계: 둥근 단, 시각 눈금, 해시계 바늘(부품), 위에 뜬 달 원반
      const MDX = 86, MDZ = 152;
      w.cyl(MDX, MDZ, mky + 1, mky + 1, 6.5, B.marbleDk); w.cyl(MDX, MDZ, mky + 2, mky + 2, 5.5, B.marble); w.ring(MDX, MDZ, mky + 2, 4.8, 5.6, B.trim);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; w.set(Math.round(MDX + Math.cos(a) * 5), mky + 3, Math.round(MDZ + Math.sin(a) * 5), k % 3 ? B.silver : B.starG); }
      w.box(MDX, mky + 3, MDZ, MDX, mky + 9, MDZ, B.brass); w.set(MDX, mky + 3, MDZ, B.brassDk);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const r = Math.hypot(dx, dy); if (r <= 3.2 && !(dx > 0 && Math.hypot(dx - 1.6, dy) < 2.6)) w.set(MDX + dx, mky + 14 + dy, MDZ, B.moon); }
      w.box(MDX, mky + 10, MDZ, MDX, mky + 10, MDZ, B.brassDk);
      const hand = w.prop({ name: 'hand', pivot: [MDX + 0.5, mky + 3.5, MDZ + 0.5], axis: 'y', speed: 0.08 });
      hand.box(MDX + 1, mky + 3, MDZ, MDX + 4, mky + 3, MDZ, B.brassDk); hand.set(MDX + 4, mky + 4, MDZ, B.starG); hand.box(MDX - 2, mky + 3, MDZ, MDX - 1, mky + 3, MDZ, B.brassDk);
      lights.push({ name: 'moondial', p: [MDX + 0.5, mky + 14, MDZ + 0.5], c: '#e0e8ff', i: 1.2, d: 18, flicker: 0.05 });
      acts.push({
        name: '달시계', hint: '달시계 바늘이 빙글 돌고 위에 뜬 초승달이 환하게 빛나요', hit: [MDX - 6, mky + 1, MDZ - 6, MDX + 6, mky + 17, MDZ + 6],
        run: async a => {
          a.flash('moondial', 4, 5); a.glow(1.6, 5);
          await a.turn('hand', [0, 6.283 * 2, 0], 3.2, t => t * t * (3 - 2 * t));
          a.unwind('hand');
          for (let k = 0; k < 3; k++) { a.burst([MDX + 0.5, mky + 14, MDZ + 0.5], { n: 40, colors: ['#ffffff', '#e0e8ff', '#fff8d0'], speed: 8, up: 1, life: 1.4, gravity: 0, spread: 2 }); await a.wait(0.4); }
        },
      });
      landmarks.push({ name: '별빛 시장', note: '밤에만 열리는 별가루 노점 거리', p: [86.5, mky + 22, 141.5], tag: 'MARKET' });
      // 하늘로 띄우는 별 등불(부품): 날아오른 뒤 다시 노점 위에 나타난다
      const lanPos = [[66, 147], [76, 147], [96, 147], [106, 147], [79, 146]];
      lanPos.forEach(([x, z], k) => {
        const p = w.prop({ name: 'lan' + k, pivot: [x + 0.5, mky + 6, z + 0.5], bob: 0.3, bobSpeed: 1 + k * 0.1, phase: k });
        p.box(x, mky + 5, z, x, mky + 6, z, B.lanternB); p.set(x, mky + 7, z, B.cloth2); p.set(x, mky + 4, z, B.wood);
        w.set(x, mky + 1, z, B.wood); w.set(x, mky + 2, z, B.wood); w.set(x, mky + 3, z, B.brassDk);
      });
      acts.push({
        name: '별 등불 띄우기', hint: '시장의 별 등불들이 하나씩 밤하늘로 날아올라요', hit: [64, mky + 1, 138, 108, mky + 8, 159],
        run: async a => {
          a.flash('mkt', 2.4, 7);
          const go = async k => { const [x, z] = lanPos[k]; await a.path('lan' + k, [[-2 + k, 12, 2], [2 - k, 26, -4], [-4 + k * 2, 44, -10]], 4.5); a.burst([x - 4 + k * 2 + 0.5, mky + 50, z - 10 + 0.5], { n: 16, colors: ['#ffd890', '#fff8d0'], speed: 3, up: 1, life: 1.4, gravity: 0, spread: 1 }); await a.respawn('lan' + k, 1.0); };
          const all = [];
          for (let k = 0; k < lanPos.length; k++) { all.push(go(k)); await a.wait(0.5); }
          await Promise.all(all);
        },
      });
      // 점성 천막: 원뿔 천막 안 받침 위 수정구와 그 둘레를 도는 작은 별들(부품)
      const OTX = 72, OTZ = 153;
      for (let y = 0; y < 10; y++) { const r = 5.4 - y * 0.5; w.ring(OTX, OTZ, mky + 1 + y, Math.max(0, r - 1), r, y % 3 === 2 ? B.cloth2 : B.cloth3); }
      w.set(OTX, mky + 11, OTZ, B.starG);
      w.box(OTX + 3, mky + 1, OTZ - 1, OTX + 5, mky + 4, OTZ + 1, 0); w.box(OTX - 1, mky + 1, OTZ + 3, OTX + 1, mky + 4, OTZ + 5, 0);
      w.box(OTX, mky + 1, OTZ, OTX, mky + 2, OTZ, B.brassDk); w.sphere(OTX, mky + 4, OTZ, 1.5, B.orbG);
      lights.push({ name: 'orb', p: [OTX + 0.5, mky + 4, OTZ + 0.5], c: '#c0a0ff', i: 1.2, d: 14, flicker: 0.1 });
      const orbit = w.prop({ name: 'fstars', pivot: [OTX + 0.5, mky + 7, OTZ + 0.5], axis: 'y', speed: 0.3, scl0: [0, 0, 0] });
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, x = Math.round(OTX + Math.cos(a) * 8), z = Math.round(OTZ + Math.sin(a) * 8); orbit.set(x, mky + 13 + (k % 2), z, k % 2 ? B.starB : B.starG); orbit.set(x, mky + 12 + (k % 2), z, B.starB); }
      acts.push({
        name: '점성 수정구', hint: '점성 천막의 수정구가 빛나며 별들이 천막 위를 돌아요', hit: [OTX - 5, mky + 1, OTZ - 5, OTX + 5, mky + 11, OTZ + 5],
        run: async a => {
          a.flash('orb', 4, 6); a.glow(1.5, 6);
          await a.tween('fstars', { scl: [1, 1, 1] }, 1);
          a.spin('fstars', 6, 4);
          for (let k = 0; k < 6; k++) { a.burst([OTX + 0.5, mky + 12, OTZ + 0.5], { n: 20, colors: ['#c0a0ff', '#ffffff', '#fff8d0'], speed: 3, up: 5, life: 1.4, gravity: 0, spread: 1 }); await a.wait(0.6); }
          await a.tween('fstars', { scl: [0, 0, 0] }, 1);
        },
      });
      landmarks.push({ name: '점성 천막', note: '수정구로 별점을 봐 주는 천막', p: [OTX + 0.5, mky + 18, OTZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
