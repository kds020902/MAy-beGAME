// 천문대 언덕 — 구름바다 위 바위 봉우리, 정상의 대망원경, 혼천의 광장, 유성 구덩이 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'stellaris', cat: 'magic', name: '천문대 언덕', en: 'Stellaris Hill', color: '#6ab0ff', seed: 327, base: 22, time: 'night',
    desc: '아르카나에서 별에 가장 가까운 봉우리. 광장의 혼천의는 별의 움직임에 맞춰 스스로 돈다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '점성술사 회당'], ['명물', '밤에만 열리는 별빛 시장'], ['주의', '혼천의가 멈추면 불길한 징조']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#a0c0ff', '#0a1020', 0.6], sun: ['#c0d8ff', 0.52, [0.45, 1, 0.5]],
    day: { sky: ['#dcecf8', '#5a90d8', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5060', 0.6], sun: ['#fff6e4', 0.8, [0.45, 1, 0.5]], haze: '#e8f0f8' },
    liquid: ['#0a1a4a', '#1a3a8a', '#ffffff'], liqSpeed: 0.5,
    fog: { start: 0.74, floor: 14, depth: 10, haze: [30, 0.55, 8], hazeColor: '#1a2848' },
    camY: 18,
    particles: [
      { n: 160, colors: ['#ffffff', '#b8d0ff'], mode: 'drift', speed: 0.2, y0: 40, y1: 100 },
      { n: 40, colors: ['#ffc080', '#ffe0b0'], mode: 'rise', speed: 0.6, area: [100, 98, 3], y0: 30, y1: 50 },
    ],
    blocks: {
      grass: { c: '#3a3a44', top: '#3a5a5a', v: 0.1 }, grass2: { c: '#3a3a44', top: '#34504e', v: 0.1 },
      dirt: { c: '#3a3a44', v: 0.08 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, rockDk: { c: '#2e3246', v: 0.06, pat: 'stone' }, rockM: { c: '#4a3a3a', v: 0.1 },
      path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' }, marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 },
      roofN: { c: '#1a2a5a', v: 0.05, pat: 'tile' }, silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 },
      door: { c: '#1a1a2a', v: 0.02, pat: 'plank' }, bark: { c: '#3a3a44', v: 0.06 }, leaf: { c: '#2a4a5a', v: 0.1 }, leaf2: { c: '#3a6a70', v: 0.1 },
      win: { c: '#b8d0ff', night: true, day: '#7a90b8' }, lamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' },
      starG: { c: '#fff8d0', glow: true }, starB: { c: '#8ab8ff', glow: true }, meteor: { c: '#ffb86a', glow: true }, lens: { c: '#a0d8ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, SX = 64, SZ = 40;
      const terr = z => z < 62 ? 30 : z < 100 ? 18 : 6;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const d = Math.hypot((x - 64) * 0.9, z - 64);
          const peak = MH.sstep(62, 36, d) * (terr(z) + (z < 62 ? 0 : MH.sstep(30, 0, Math.abs(x - 64)) * 0));
          const step = z < 62 ? MH.sstep(64, 58, z) : 1;
          return base + Math.max(0, MH.sstep(60, 40, d) * terr(z)) + n.fbm(x * 0.05, z * 0.05) * 3 + n.ridge(x * 0.04, z * 0.04, 3) * 3;
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : n.fbm(x * 0.11, z * 0.11, 2) > 0.55 ? B.grass2 : B.grass,
        under: (x, z, y, dep, s) => dep < 2 && s < 3 ? B.dirt : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      const lights = [], acts = [], landmarks = [];
      // ── 정상: 대천문대(원형 기단과 옥상의 대망원경) ──
      const oy = MH.maxG(w, SX - 14, SZ - 14, SX + 14, SZ + 14);
      MH.flatten(w, SX - 18, SZ - 18, SX + 18, SZ + 18, oy, B.path, B.rock);
      const Y = oy + 1;
      w.cyl(SX, SZ, Y, Y + 1, 15, B.marbleDk);
      w.cyl(SX, SZ, Y + 2, Y + 13, 13, B.marble);
      for (let a = 0; a < 16; a++) { const ang = a / 16 * Math.PI * 2, x = Math.round(SX + Math.cos(ang) * 12.8), z = Math.round(SZ + Math.sin(ang) * 12.8); w.box(x, Y + 5, z, x, Y + 10, z, a % 2 ? B.win : B.marbleDk); }
      w.ring(SX, SZ, Y + 8, 13, 13.8, B.trim); w.cyl(SX, SZ, Y + 14, Y + 14, 14, B.marbleDk); w.ring(SX, SZ, Y + 15, 13, 14, B.trim);
      for (let a = 0; a < 24; a += 2) { const ang = a / 24 * Math.PI * 2; w.set(Math.round(SX + Math.cos(ang) * 13.5), Y + 16, Math.round(SZ + Math.sin(ang) * 13.5), B.trim); }
      w.box(SX - 2, Y + 2, SZ + 13, SX + 2, Y + 8, SZ + 13, B.door); w.box(SX - 3, Y + 9, SZ + 13, SX + 3, Y + 9, SZ + 14, B.brass);
      for (let s = 0; s < 3; s++) w.box(SX - 4 - s, Y + 1 - s + 1 - 1, SZ + 15 + s, SX + 4 + s, Y + 1 - s + 1 - 1, SZ + 15 + s, B.marbleDk);
      for (const lx of [SX - 5, SX + 5]) { w.box(lx, Y + 2, SZ + 14, lx, Y + 6, SZ + 14, B.iron); w.set(lx, Y + 7, SZ + 14, B.lamp); lights.push({ p: [lx + 0.5, Y + 7, SZ + 14.5], c: '#d0e0ff', i: 1, d: 14, flicker: 0.05, night: true }); }
      // 망원경 받침(월드)과 경통(부품, 수평으로 돈다)
      const MY = Y + 15;
      w.cyl(SX, SZ, MY, MY + 1, 4, B.brassDk); w.cyl(SX, SZ, MY + 2, MY + 5, 2, B.iron);
      const scope = w.prop({ name: 'scope', pivot: [SX + 0.5, MY + 9.5, SZ + 0.5], axis: 'y', speed: 0.05, clipOK: 6 });
      for (let t = -0.35; t <= 1.0001; t += 0.02) {
        const z = SZ + t * 19 * 0.78, y = MY + 9 + t * 19 * 0.62;
        scope.sphere(SX, Math.round(y), Math.round(z), t < 0 ? 2.4 : 2.0, t > 0.9 ? B.brassDk : (Math.round(t * 50) % 12 === 0 ? B.brassDk : B.brass));
      }
      const tipZ = Math.round(SZ + 19 * 0.78), tipY = Math.round(MY + 9 + 19 * 0.62);
      scope.cyl(SX, tipZ + 1, tipY, tipY, 1, B.lens); scope.set(SX, tipY + 1, tipZ + 1, B.lens); scope.set(SX, tipY - 1, tipZ + 1, B.lens);
      // 경통을 받치는 멍에(경통과 함께 돈다)
      scope.box(SX - 3, MY + 6, SZ, SX + 3, MY + 6, SZ, B.brassDk);
      for (const dx of [-3, 3]) scope.box(SX + dx, MY + 6, SZ, SX + dx, MY + 10, SZ, B.brassDk);
      scope.box(SX - 3, MY + 9, SZ, SX + 3, MY + 9, SZ, B.iron);
      lights.push({ name: 'scope', p: [SX + 0.5, MY + 12, SZ + 3], c: '#a0d8ff', i: 1.2, d: 20, flicker: 0.05, srcR: 24 });
      acts.push({
        name: '대망원경', hint: '경통이 밤하늘을 따라 한 바퀴 돌아요', hit: [SX - 5, MY, SZ - 5, SX + 5, MY + 22, SZ + 16],
        run: async a => {
          a.flash('scope', 3, 6);
          await a.turn('scope', [0, 2.1, 0], 2.6); a.burst([SX + 12, tipY + 4, SZ - 6], { n: 30, colors: ['#ffffff', '#a0d8ff'], speed: 3, up: 1, life: 2, gravity: 0, spread: 5 });
          await a.wait(0.8);
          await a.turn('scope', [0, 4.4, 0], 2.8); a.burst([SX - 12, tipY + 4, SZ - 6], { n: 30, colors: ['#ffffff', '#fff8d0'], speed: 3, up: 1, life: 2, gravity: 0, spread: 5 });
          await a.wait(0.8);
          await a.turn('scope', [0, 6.283, 0], 2.4); a.unwind('scope');
        },
      });
      landmarks.push({ name: '대천문대', note: '옥상에서 도는 황동 대망원경', p: [SX + 0.5, tipY + 8, SZ + 0.5], tag: 'OBSERV' });
      // ── 정상에서 광장까지 큰 계단 ──
      const PZ = 84, py = MH.g(w, 64, PZ);
      MH.flatten(w, 44, 70, 84, 98, py, B.path, B.rock);
      for (let z = SZ + 18, y = oy; z < 72 && y > py; z++, y -= (z % 2 ? 1 : 1)) { for (let x = SX - 4; x <= SX + 4; x++) { MH.setH(w, x, z, Math.max(py, y), (x === SX - 4 || x === SX + 4) ? B.marbleDk : B.path, B.rock); } if (z % 6 === 0) for (const x of [SX - 5, SX + 5]) { const g = MH.g(w, x, z); w.box(x, g + 1, z, x, g + 4, z, B.marbleDk); w.set(x, g + 5, z, B.lamp); } }
      lights.push({ p: [SX - 4.5, MH.g(w, SX - 5, 60) + 5, 60.5], c: '#d0e0ff', i: 0.9, d: 12, flicker: 0.05, night: true });
      // ── 혼천의 광장 ──
      for (let z = 70; z <= 98; z++) for (let x = 44; x <= 84; x++) if (MH.dist(x, z, 64, PZ) < 13.5) MH.paint(w, x, z, B.marbleDk);
      MH.circle(w, 64, PZ, 12, B.trim);
      const stars = [[48, 74], [51, 76], [54, 74], [56, 78], [53, 81], [74, 73], [78, 76], [76, 80], [72, 82], [49, 92], [52, 95], [57, 94], [73, 94], [78, 91], [70, 96], [46, 84], [82, 84]];
      for (const [sx, sz] of stars) MH.paint(w, sx, sz, hash3(sx, 1, sz) > 0.5 ? B.starG : B.starB);
      for (let i = 0; i < stars.length - 1; i++) if (i % 5 !== 4 && Math.hypot(stars[i][0] - stars[i + 1][0], stars[i][1] - stars[i + 1][1]) < 6) { const [ax, az] = stars[i], [bx, bz] = stars[i + 1]; const nn = Math.ceil(Math.hypot(bx - ax, bz - az)); for (let s = 1; s < nn; s++) MH.paint(w, Math.round(MH.lerp(ax, bx, s / nn)), Math.round(MH.lerp(az, bz, s / nn)), B.silver); }
      w.cyl(64, PZ, py + 1, py + 2, 3, B.marble); w.cyl(64, PZ, py + 3, py + 3, 2, B.marbleDk); w.box(64, py + 4, PZ, 64, py + 5, PZ, B.brass);
      const ay = py + 15;
      w.box(64, py + 6, PZ, 64, ay - 3, PZ, B.brass);
      w.sphere(64, ay, PZ, 1.8, B.starG);
      const rA = w.prop({ name: 'ringA', pivot: [64.5, ay + 0.5, PZ + 0.5], axis: 'y', speed: 0.25 }); MH.ringProp(rA, 64, ay, PZ, 9, 'xz', B.brass, B.starB, 8);
      const rB = w.prop({ name: 'ringB', pivot: [64.5, ay + 0.5, PZ + 0.5], axis: 'y', speed: -0.4, clipOK: 2 }); MH.ringProp(rB, 64, ay, PZ, 7.5, 'xy', B.brass, B.starG, 6);
      const rC = w.prop({ name: 'ringC', pivot: [64.5, ay + 0.5, PZ + 0.5], axis: 'y', speed: 0.7, clipOK: 2 }); MH.ringProp(rC, 64, ay, PZ, 6, 'yz', B.silver, B.starB, 4);
      lights.push({ name: 'arm', p: [64.5, ay, PZ + 0.5], c: '#fff0c0', i: 1.3, d: 18, flicker: 0.05 });
      acts.push({
        name: '혼천의', hint: '세 고리가 빠르게 돌며 별빛을 뿌려요', hit: [55, py + 5, PZ - 9, 73, ay + 9, PZ + 9],
        run: async a => { a.flash('arm', 3, 4.5); a.spin('ringA', 8, 4.5); a.spin('ringB', 8, 4.5); a.spin('ringC', 8, 4.5); for (let k = 0; k < 9; k++) { a.burst([64.5, ay, PZ + 0.5], { n: 24, colors: ['#fff8d0', '#8ab8ff', '#ffffff'], speed: 9, up: 2, life: 1.8, gravity: 0.5, spread: 1 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '혼천의 광장', note: '세 고리가 스스로 도는 혼천의', p: [64.5, ay + 12, PZ + 0.5] });
      landmarks.push({ name: '별자리 정원', note: '바닥에 박힌 별 지도', p: [50.5, py + 5, 93.5] });
      // ── 유성 구덩이 ──
      const MXX = 100, MZZ = 98, my = MH.g(w, MXX, MZZ);
      for (let z = MZZ - 9; z <= MZZ + 9; z++) for (let x = MXX - 9; x <= MXX + 9; x++) {
        const d = MH.dist(x, z, MXX, MZZ), g = MH.g(w, x, z);
        if (g < 0 || d > 7.5) { if (d <= 9 && d > 7.5 && hash3(x, 2, z) > 0.4) w.set(x, g + 1, z, B.rockM); continue; }
        const dep = Math.round((7.5 - d) * 0.7);
        MH.setH(w, x, z, my - dep, d < 3 ? B.rockM : B.dirt, B.rock);
      }
      w.sphere(MXX, my - 4, MZZ, 2.4, B.meteor, (dx, dy) => dy >= -1); w.sphere(MXX, my - 5, MZZ, 2.6, B.rockM, (dx, dy) => dy < -1);
      for (let i = 0; i < 7; i++) { const a = i * 0.9 + 0.3; for (let s = 3; s <= 8; s++) if (hash3(i, s, 3) > 0.25) MH.paint(w, Math.round(MXX + Math.cos(a + s * 0.06) * s), Math.round(MZZ + Math.sin(a + s * 0.06) * s), B.meteor); }
      lights.push({ name: 'meteor', p: [MXX + 0.5, my - 1, MZZ + 0.5], c: '#ffa050', i: 1.6, d: 18, flicker: 0.2 });
      acts.push({
        name: '유성 구덩이', hint: '하늘에서 별똥별이 쏟아져 구덩이에 떨어져요', hit: [MXX - 7, my - 5, MZZ - 7, MXX + 7, my + 2, MZZ + 7],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            a.burst([MXX - 14 + k * 3, my + 46, MZZ - 12], { n: 26, colors: ['#ffe0a0', '#ffffff', '#ffb86a'], speed: 1, up: -22, life: 1.2, gravity: 14, spread: 1 });
            await a.wait(0.75);
            a.flash('meteor', 4, 0.5);
            a.burst([MXX + 0.5, my - 2, MZZ + 0.5], { n: 50, colors: ['#ffb86a', '#ffe0a0', '#ff7a3a'], speed: 9, up: 7, life: 1.3, gravity: 9, spread: 2 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '유성 구덩이', note: '아직 식지 않은 별 조각', p: [MXX + 0.5, my + 9, MZZ + 0.5] });
      // ── 점성술사의 집(돔 지붕)과 관측 탑 ──
      const hm = { found: B.marbleDk, wall: B.marble, frame: B.marbleDk, quoin: B.trim, win: B.win, sill: B.trim, door: B.door, roof: B.roofN, eave: B.iron, lamp: B.lamp };
      for (const [x, z, face] of [[22, 78, 'e'], [26, 96, 'e'], [40, 108, 'n'], [74, 108, 'n'], [96, 70, 'w']]) {
        const h = MH.house(w, { x, z, sx: 9, sz: 9, fh: 6, face, roof: 'flat', m: hm });
        w.cyl(x + 4, z + 4, h.top + 1, h.top + 2, 3.6, B.marbleDk); const dt = MH.dome(w, x + 4, h.top + 3, z + 4, 3.8, B.roofN, B.silver); w.set(x + 4, dt, z + 4, B.silver);
        lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#d0e0ff', i: 0.8, d: 10, flicker: 0.05, night: true });
      }
      for (const [tx, tz] of [[24, 50], [104, 46]]) {
        const g = MH.g(w, tx, tz) + 1;
        const t = MH.tower(w, { cx: tx, cz: tz, y0: g, h: 18, r: 3, m: { wall: B.marble, band: B.marbleDk, win: B.win, cren: B.trim } });
        w.line(tx, t, tz, tx + 4, t + 5, tz + 3, B.brass, 0.8); w.set(tx + 5, t + 6, tz + 4, B.lens);
      }
      // 선돌과 나무
      for (let i = 0; i < 9; i++) { const a = i * 0.7, x = Math.round(64 + Math.cos(a) * 17), z = Math.round(PZ + Math.sin(a) * 15), g = MH.g(w, x, z); if (g === py && !w.get(x, g + 1, z) && Math.abs(x - 64) > 6) { w.box(x, g + 1, z, x, g + 5 + (i % 3), z, B.marbleDk); w.set(x, g + 3, z, i % 2 ? B.starG : B.starB); } }
      for (let i = 0; i < 26; i++) { const x = w.ri(6, 122), z = w.ri(6, 122), g = MH.g(w, x, z); if (g > base + 1 && w.slope[x + W * z] < 2 && !w.get(x, g + 1, z) && w.get(x, g, z) !== B.path && w.get(x, g, z) !== B.marbleDk && MH.dist(x, z, SX, SZ) > 20 && MH.dist(x, z, MXX, MZZ) > 11 && MH.dist(x, z, 64, PZ) > 16) MH.tree(w, x, g + 1, z, { kind: 'pine', h: w.ri(9, 15), bark: B.bark, leaves: [B.leaf2, B.leaf, B.leaf], r: 3.2 }); }
      return { lights, landmarks, acts };
    },
  });
})();
