// 피의 성당 — 절벽 고원 위의 고딕 대성당과 핏빛 폭포 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'cathedral', cat: 'dungeon', name: '피의 성당', en: 'Cathedral of Blood', color: '#c0444a', seed: 37, base: 24, time: 'night',
    desc: '신 대신 피를 섬기게 된 성당. 기도 소리는 비명으로 바뀌었다.',
    monsters: { normal: ['광신도', '가고일', '흡혈 사제'], mid: '심문관', boss: '타락한 대주교' },
    sky: ['#1c080c', '#3a0e18', '#8a2230'], stars: false,
    hemi: ['#d8a8b0', '#2a1216', 0.64], sun: ['#ffd0c8', 0.74, [0.5, 1, 0.55]],
    day: { sky: ['#e8c0b0', '#9a5a5a', '#ffd8c0'], stars: false, hemi: ['#f8e0d8', '#4a3030', 0.6], sun: ['#ffe0d0', 0.72, [0.5, 1, 0.55]], haze: '#c89088' },
    liquid: ['#3a0810', '#7c1420', '#ff6072'], liqSpeed: 0.5,
    fog: { start: 0.72, floor: 16, depth: 10, haze: [26, 0.32, 8], hazeColor: '#4a1a24' },
    camY: 16,
    particles: [
      { n: 280, colors: ['#ff5a6a', '#c02a3a', '#ff9aa0'], mode: 'drift', speed: 0.35, y0: 36, y1: 96 },
      { n: 80, colors: ['#ffb04a', '#ff7a2a'], mode: 'rise', speed: 1.2, area: [32, 88, 2.5], y0: 40, y1: 64 },
    ],
    blocks: {
      cliff: { c: '#4a3f45', v: 0.06, pat: 'big' }, rock: { c: '#3d3439', v: 0.06, pat: 'stone' }, rockDk: { c: '#2a2226', v: 0.06, pat: 'stone' },
      ground: { c: '#3d3439', top: '#4d4247', v: 0.1 }, bmoss: { c: '#3d3439', top: '#5a2a30', v: 0.1 }, soil: { c: '#2e2226', v: 0.08 },
      cobble: { c: '#4a3f45', top: '#5a4e52', v: 0.1, pat: 'stone' }, flag: { c: '#5a4e52', top: '#6a5e60', v: 0.05, pat: 'check', alt: '#4e4448' },
      wall: { c: '#7e7274', v: 0.05, pat: 'brick' }, wallDk: { c: '#5e5256', v: 0.05, pat: 'brick' }, trim: { c: '#9e928c', v: 0.04 },
      roof: { c: '#2a1f27', v: 0.04, pat: 'tile' }, roofR: { c: '#5a1c24', v: 0.05 }, gold: { c: '#c9a24a', v: 0.06 },
      dark: { c: '#120c0f', v: 0 }, iron: { c: '#241d22', v: 0.03 }, wood: { c: '#3d2a22', v: 0.06, pat: 'log' }, plank: { c: '#4d3528', v: 0.08, pat: 'plank' },
      garg: { c: '#5e585c', v: 0.06 }, bark: { c: '#2a2024', v: 0.05 }, bell: { c: '#8a6a3a', v: 0.06 }, bone: { c: '#d0c8b4', v: 0.05 }, rope: { c: '#6a5a4a', v: 0.04 },
      glassR: { c: '#ff3e52', glow: true }, glassP: { c: '#b848d8', glow: true }, glassG: { c: '#ffb85a', glow: true },
      candle: { c: '#ffe2a0', glow: true }, fire: { c: '#ff8a3a', glow: true }, fire2: { c: '#ffd060', glow: true }, reye: { c: '#ff3040', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, M = 56;
      const gorge = [[112, -4], [106, 56], [116, 132]];
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const qx = Math.abs(x - M) / 40, qz = Math.abs(z - 54) / 45;
          const e = Math.pow(Math.pow(qx, 4) + Math.pow(qz, 4), 0.25) + (n.fbm(x * 0.08, z * 0.08, 3) - 0.5) * 0.1;
          let hh = MH.sstep(1.04, 0.94, e) * 12 + n.fbm(x * 0.05, z * 0.05) * 2;
          const rd = MH.polyDist(x, z, gorge);
          if (rd < 11) hh -= Math.pow(1 - rd / 11, 1.2) * (hh + 9);
          return base + hh;
        },
        surface: (x, z, y, s) => s >= 3 ? B.cliff : n.fbm(x * 0.11 + 9, z * 0.11, 2) > 0.58 ? B.bmoss : B.ground,
        under: (x, z, y, dep, s) => s >= 2 || dep > 2 ? ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 4 === 0 ? B.rockDk : B.cliff) : B.soil,
      });
      const lights = [], acts = [], landmarks = [];
      const P = base + 12, Y = P + 1;
      MH.flatten(w, 20, 12, 92, 96, P, B.flag, B.rock);
      // 고원 둘레를 깎아지른 벽 대신 바위 비탈 자락으로
      MH.skirt(w, 20, 12, 92, 96, P, { R: 12, rate: 1.25, noise: (x, z) => n.fbm(x * 0.17 + 3, z * 0.17, 2) * 4 - 1, surf: (x, z, h) => h > base + 4 ? B.cliff : B.ground, fill: B.rock, skip: (x, z) => MH.polyDist(x, z, gorge) < 5 });
      for (let i = 0; i < 46; i++) { const x = w.ri(8, 104), z = w.ri(2, 110), g = MH.g(w, x, z); if (x > 19 && x < 93 && z > 11 && z < 97) continue; if (g > base + 1 && g < P - 2 && Math.abs(x - M) > 8 && MH.polyDist(x, z, gorge) > 6) MH.rock(w, x, g, z, w.r(1.3, 2.6), B.cliff, B.bmoss); }

      // ── 대성당 몸체 ──
      w.box(43, Y, 28, 69, Y + 13, 76, B.wall);          // 측랑
      w.box(49, Y, 28, 63, Y + 27, 76, B.wall);          // 신랑
      w.box(30, Y, 40, 82, Y + 27, 52, B.wall);          // 익랑
      for (let dz = -12; dz <= 0; dz++) for (let dx = -12; dx <= 12; dx++) if (dx * dx + dz * dz <= 144) w.box(M + dx, Y, 28 + dz, M + dx, Y + 27, 28 + dz, B.wall);
      for (const y of [Y + 13, Y + 27]) { w.walls(43, y, 28, 69, y, 76, B.trim); w.walls(30, y, 40, 82, y, 52, B.trim); }
      for (let x = 41; x <= 48; x++) for (let z = 27; z <= 77; z++) { w.set(x, Y + 14 + (x - 41), z, x === 41 ? B.roofR : B.roof); w.set(112 - x, Y + 14 + (x - 41), z, x === 41 ? B.roofR : B.roof); }
      MH.roof(w, 48, 64, 27, 77, Y + 28, { b: B.roof, eave: B.roofR, ridge: B.roofR, pitch: 2, gable: B.wall, axis: 'z' });
      MH.roof(w, 29, 83, 39, 53, Y + 28, { b: B.roof, eave: B.roofR, ridge: B.roofR, pitch: 2, gable: B.wall, axis: 'x' });
      MH.cone(w, M, 26, Y + 28, 13.5, B.roof, 0.42, B.roofR);
      // 교차부 첨탑
      w.box(53, Y + 40, 43, 59, Y + 48, 49, B.wallDk);
      for (const [x, z] of [[53, 46], [59, 46], [56, 43], [56, 49]]) w.box(x, Y + 42, z, x, Y + 46, z, B.glassR);
      const fl = MH.pyramid(w, 53, 43, 59, 49, Y + 49, B.roofR, 4);
      w.box(M, fl, 46, M, fl + 4, 46, B.gold); w.box(M - 1, fl + 2, 46, M + 1, fl + 2, 46, B.gold);
      // 버팀벽, 작은 첨탑, 공중 버팀벽
      for (const z of [30, 35, 56, 61, 66, 71]) for (const [px, dir] of [[39, -1], [73, 1]]) {
        w.box(px, Y, z, px + dir, Y + 20, z + 1, B.wallDk); w.box(px + dir * 2, Y, z, px + dir * 2, Y + 10, z + 1, B.wallDk);
        MH.cone(w, px, z, Y + 21, 1.4, B.roofR, 0.45);
        const cx = dir < 0 ? 49 : 63;
        w.line(px, Y + 20, z, cx, Y + 25, z, B.wallDk, 0.6); w.line(px, Y + 20, z + 1, cx, Y + 25, z + 1, B.wallDk, 0.6);
      }
      // 창
      for (const z of [32, 33, 58, 59, 63, 64, 68, 69]) for (const x of [43, 69]) { w.box(x, Y + 3, z, x, Y + 11, z, (z % 2) ? B.glassR : B.glassP); }
      for (let z = 30; z <= 74; z += 4) { if (z > 38 && z < 54) continue; for (const x of [49, 63]) { w.box(x, Y + 17, z, x, Y + 25, z + 1, B.glassR); w.box(x, Y + 26, z, x, Y + 26, z + 1, B.trim); } }
      const rose = (cx, cy, cz, r, plane) => {
        for (let v = -Math.ceil(r); v <= Math.ceil(r); v++) for (let u = -Math.ceil(r); u <= Math.ceil(r); u++) {
          const d = Math.hypot(u, v);
          if (d > r + 0.3) continue;
          const ang = Math.atan2(v, u), spoke = Math.abs(Math.sin(ang * 6)) < 0.2 && d > 1.6;
          const b = d > r - 0.8 ? B.trim : spoke ? B.iron : d < 1.7 ? B.glassG : (d > r * 0.6 ? B.glassR : B.glassP);
          if (plane === 'z') w.set(cx + u, cy + v, cz, b); else w.set(cx, cy + v, cz + u, b);
        }
      };
      rose(30, Y + 18, 46, 5, 'x'); rose(82, Y + 18, 46, 5, 'x');
      for (let a = 0.25; a < Math.PI - 0.15; a += 0.36) { const x = Math.round(M + Math.cos(a) * 12), z = Math.round(28 - Math.sin(a) * 12); w.box(x, Y + 5, z, x, Y + 20, z, B.glassP); }
      // ── 정면 쌍탑 ──
      const tops = [];
      for (const tx of [36, 67]) {
        w.box(tx, Y, 68, tx + 9, Y + 44, 77, B.wall);
        for (const [cx, cz] of [[tx - 1, 78], [tx + 10, 78], [tx - 1, 67], [tx + 10, 67]]) { w.box(cx, Y, cz, cx, Y + 32, cz, B.wallDk); w.box(cx, Y, cz, cx + (cx < tx ? -1 : 1) * 0, Y + 16, cz, B.wallDk); }
        for (const y of [Y + 13, Y + 27, Y + 33]) w.walls(tx - 1, y, 67, tx + 10, y, 78, B.trim);
        w.box(tx + 3, Y + 15, 78, tx + 6, Y + 24, 78, B.glassP); w.box(tx + 4, Y + 25, 78, tx + 5, Y + 25, 78, B.glassP);
        w.box(tx + 3, Y + 1, 78, tx + 6, Y + 7, 78, B.dark); w.box(tx + 2, Y + 8, 78, tx + 7, Y + 8, 78, B.trim);
        // 종루: 속을 비우고 네 기둥만 남긴다
        w.box(tx + 1, Y + 35, 68, tx + 8, Y + 42, 77, 0); w.box(tx, Y + 35, 69, tx + 9, Y + 42, 76, 0);
        w.box(tx + 1, Y + 34, 69, tx + 8, Y + 34, 76, B.wallDk);
        for (const x of [tx, tx + 9]) for (const z of [68, 77]) w.box(x, Y + 35, z, x, Y + 42, z, B.wall);
        w.box(tx, Y + 43, 68, tx + 9, Y + 44, 77, B.wall);
        w.walls(tx - 1, Y + 45, 67, tx + 10, Y + 46, 78, B.trim);
        for (const [cx, cz] of [[tx - 1, 67], [tx + 10, 67], [tx - 1, 78], [tx + 10, 78]]) { w.box(cx, Y + 47, cz, cx, Y + 50, cz, B.wallDk); w.set(cx, Y + 51, cz, B.roofR); }
        const st = MH.pyramid(w, tx, 68, tx + 9, 77, Y + 47, B.roof, 3, B.roofR);
        w.box(tx + 4, st, 72, tx + 5, st + 5, 73, B.gold); w.box(tx + 3, st + 3, 72, tx + 6, st + 3, 73, B.gold);
        tops.push(st + 6);
      }
      // 정면 벽, 장미창, 세 개의 문
      w.box(46, Y, 77, 66, Y + 31, 77, B.wall);
      MH.roof(w, 46, 66, 77, 77, Y + 30, { b: B.wall, pitch: 2, axis: 'z' });
      rose(M, Y + 21, 78, 7, 'z');
      for (let x = 51; x <= 61; x++) for (let y = Y; y <= Y + 14; y++) {
        const top = Y + 12 - Math.pow(Math.abs(x - M) / 5, 2) * 4;
        if (y <= top) w.set(x, y, 78, Math.abs(x - M) >= 4 ? B.trim : B.dark);
        else if (y <= top + 1) w.set(x, y, 78, B.trim);
      }
      for (let s = 0; s < 4; s++) w.box(48 - s, P - s, 79 + s, 64 + s, P - s, 79 + s, B.trim);
      for (const cx of [50, 62]) { w.box(cx, Y, 80, cx, Y + 3, 80, B.iron); w.set(cx, Y + 4, 80, B.candle); w.set(cx - 1, Y + 3, 80, B.candle); w.set(cx + 1, Y + 3, 80, B.candle); }
      lights.push({ name: 'rose', p: [M + 0.5, Y + 21, 80], c: '#ff3a4c', i: 1.3, d: 30, flicker: 0.06 });
      lights.push({ p: [28, Y + 18, 46.5], c: '#c050e0', i: 1.1, d: 20, flicker: 0.05 });
      lights.push({ p: [84, Y + 18, 46.5], c: '#ff3a4c', i: 1.1, d: 20, flicker: 0.05 });
      lights.push({ p: [M + 0.5, Y + 4, 81], c: '#ffd0a0', i: 0.8, d: 12, flicker: 0.3, srcR: 7 });
      // 서쪽 탑의 대종(부품) — 비운 종루 가운데에 매단다
      w.box(37, Y + 42, 72, 44, Y + 42, 72, B.wood);
      const bell = w.prop({ name: 'bell', pivot: [41, Y + 42, 72.5], axis: 'z' });
      bell.box(40, Y + 40, 72, 41, Y + 41, 72, B.iron);
      bell.ellipsoid(40.5, Y + 38, 72, 2.4, 2.4, 2.4, B.bell, (dx, dy) => dy >= -2); bell.box(40, Y + 35, 72, 41, Y + 35, 72, B.iron);
      acts.push({
        name: '서쪽 탑의 대종', hint: '종이 울리고 붉은 먼지가 흩날려요', hit: [37, Y + 35, 69, 44, Y + 42, 76],
        run: async a => {
          a.flash('rose', 1.6, 3.4);
          for (let k = 0; k < 4; k++) {
            await a.turn('bell', [0, 0, 0.45], 0.42);
            a.burst([41, Y + 38, 72.5], { n: 30, colors: ['#ff5a6a', '#ff9aa0', '#c02a3a'], speed: 9, up: 1, life: 2.4, gravity: 0.3, spread: 4, flat: true });
            await a.turn('bell', [0, 0, -0.45], 0.42);
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '장미창', hint: '핏빛 스테인드글라스가 타오르듯 빛나요', hit: [48, Y + 13, 77, 64, Y + 29, 79],
        run: async a => {
          a.flash('rose', 5, 3.2); a.glow(1.8, 3.2);
          for (let k = 0; k < 5; k++) { a.burst([M + 0.5, Y + 21, 80], { n: 24, colors: ['#ff3e52', '#ffb85a', '#b848d8'], speed: 6, up: 0.5, life: 2, gravity: -0.4, spread: 7 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '핏빛 대성당', note: '보스 · 타락한 대주교', p: [M + 0.5, Math.max(...tops) + 5, 72.5], boss: true });

      // ── 광장: 피의 샘, 절벽으로 흐르는 핏물 ──
      for (let z = 80; z <= 96; z++) for (let x = 22; x <= 90; x++) if (MH.g(w, x, z) === P) MH.paint(w, x, z, B.cobble);
      const FX = M, FZ = 89;
      for (let z = FZ - 7; z <= FZ + 7; z++) for (let x = FX - 7; x <= FX + 7; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 6.8) continue;
        if (d > 5.6) { w.set(x, P + 1, z, B.trim); if ((x + z) % 2) w.set(x, P + 2, z, B.trim); continue; }
        MH.setH(w, x, z, P - 2, B.rock, B.rock); w.liquid(x, z, P - 1);
      }
      w.box(FX, P - 1, FZ, FX, P + 5, FZ, B.trim); w.cyl(FX, FZ, P + 6, P + 6, 2.4, B.trim);
      w.box(FX, P + 7, FZ, FX, P + 11, FZ, B.garg);
      for (const s of [-1, 1]) { w.line(FX + s, P + 10, FZ, FX + s * 5, P + 14, FZ, B.garg); w.box(FX + s * 2, P + 9, FZ, FX + s * 3, P + 11, FZ, B.garg); }
      w.set(FX, P + 12, FZ, B.garg); w.set(FX, P + 11, FZ + 1, B.reye);
      lights.push({ p: [FX + 0.5, P + 9, FZ + 1.5], c: '#ff3040', i: 1.3, d: 18, flicker: 0.1 });
      let edgeX = FX + 7;
      while (edgeX < 110 && MH.g(w, edgeX, FZ) >= P - 1) edgeX++;
      for (let x = FX + 6; x < edgeX; x++) for (const dz of [0, 1]) { MH.setH(w, x, FZ + dz, P - 2, B.rock, B.rock); w.liquid(x, FZ + dz, P - 1); }
      MH.river(w, [[edgeX, FZ], [108, 94]], 1.8, base - 1, B.rockDk);
      MH.river(w, gorge, 3.6, base - 3, B.rockDk);
      landmarks.push({ name: '피의 샘', note: '절벽 아래로 떨어지는 핏물', p: [FX + 0.5, P + 19, FZ + 0.5] });
      // ── 가고일 회랑(고원 동쪽 끝) ──
      let gcount = 0;
      for (let z = 22; z <= 78; z += 8) {
        let gx = 96; while (gx > 60 && MH.g(w, gx, z) !== P) gx--;
        gx -= 2;
        if (MH.g(w, gx, z) !== P) continue;
        w.box(gx - 1, P + 1, z - 1, gx + 1, P + 1, z + 1, B.wallDk); w.box(gx, P + 2, z, gx, P + 8, z, B.trim); w.box(gx - 1, P + 8, z - 1, gx + 1, P + 8, z + 1, B.wallDk);
        w.box(gx, P + 9, z, gx, P + 11, z, B.garg); w.box(gx + 1, P + 9, z, gx + 2, P + 10, z, B.garg); w.set(gx + 2, P + 11, z, B.reye);
        for (const s of [-1, 1]) { w.set(gx, P + 11, z + s, B.garg); w.set(gx - 1, P + 12, z + s * 2, B.garg); w.set(gx - 1, P + 11, z + s * 2, B.garg); }
        gcount++;
      }
      landmarks.push({ name: '가고일 회랑', note: '가고일 · 광신도 출몰', p: [90.5, P + 18, 46.5] });

      // ── 심문관의 화형대와 교수대 ──
      const IX = 27, IZ = 83;
      w.box(IX, P + 1, IZ, IX + 10, P + 2, IZ + 10, B.plank);
      for (const [px, pz] of [[IX, IZ], [IX + 10, IZ], [IX, IZ + 10], [IX + 10, IZ + 10]]) w.box(px, P + 1, pz, px, P + 4, pz, B.wood);
      w.box(IX + 11, P + 1, IZ + 4, IX + 12, P + 1, IZ + 6, B.plank); w.box(IX + 13, P + 1 - 1, IZ + 4, IX + 13, P, IZ + 6, B.plank);
      w.box(IX + 5, P + 3, IZ + 5, IX + 5, P + 14, IZ + 5, B.wood); w.box(IX + 3, P + 12, IZ + 5, IX + 7, P + 12, IZ + 5, B.wood);
      for (let i = 0; i < 30; i++) { const a = w.r(0, 6.28), r = w.r(0.8, 3.2); w.fill(Math.round(IX + 5 + Math.cos(a) * r), P + 3 + w.ri(0, 1), Math.round(IZ + 5 + Math.sin(a) * r), w.chance(0.55) ? B.wood : B.fire); }
      w.set(IX + 4, P + 5, IZ + 5, B.fire); w.set(IX + 6, P + 4, IZ + 5, B.fire2); w.set(IX + 5, P + 5, IZ + 6, B.fire);
      lights.push({ name: 'pyre', p: [IX + 5.5, P + 6, IZ + 5.5], c: '#ff8a30', i: 1.7, d: 20, flicker: 0.45 });
      const gxp = IX - 4, gzp = IZ + 2;
      w.box(gxp, P + 1, gzp, gxp, P + 16, gzp, B.wood); w.box(gxp, P + 16, gzp, gxp + 5, P + 16, gzp, B.wood); w.line(gxp, P + 12, gzp, gxp + 3, P + 16, gzp, B.wood);
      const cage = w.prop({ name: 'cage', pivot: [gxp + 5.5, P + 16, gzp + 0.5], axis: 'x', rock: 0.07, rockSpeed: 0.9 });
      cage.box(gxp + 5, P + 13, gzp, gxp + 5, P + 15, gzp, B.iron);
      cage.walls(gxp + 4, P + 8, gzp - 1, gxp + 6, P + 12, gzp + 1, B.iron); cage.box(gxp + 4, P + 12, gzp - 1, gxp + 6, P + 12, gzp + 1, B.iron); cage.box(gxp + 4, P + 7, gzp - 1, gxp + 6, P + 7, gzp + 1, B.iron);
      for (let y = P + 9; y <= P + 11; y++) { cage.set(gxp + 5, y, gzp - 1, 0); cage.set(gxp + 5, y, gzp + 1, 0); cage.set(gxp + 4, y, gzp, 0); cage.set(gxp + 6, y, gzp, 0); }
      cage.set(gxp + 5, P + 8, gzp, B.bone);
      acts.push({
        name: '화형대', hint: '불길이 치솟고 쇠우리가 흔들려요', hit: [IX, P + 1, IZ, IX + 10, P + 9, IZ + 10],
        run: async a => {
          a.flash('pyre', 3.5, 3); a.spin('cage', 3.5, 3);
          for (let k = 0; k < 6; k++) { a.burst([IX + 5.5, P + 5, IZ + 5.5], { n: 34, colors: ['#ffb04a', '#ff7a2a', '#ffd060'], speed: 3, up: 8, life: 1.8, gravity: 1, spread: 2.5 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '심문관의 화형대', note: '중간 보스 · 심문관', p: [IX + 5.5, P + 23, IZ + 5.5], mid: true });

      // ── 순례자의 대계단(남쪽 비탈) → 아래 참배로 ──
      const SZ0 = 97, footZ = 110, footH = MH.g(w, M, footZ + 3);
      MH.flight(w, { name: '순례자 계단', axis: 'z', c: M, half: 5, a: SZ0, b: footZ, ha: P - 1, hb: footH, step: B.cobble, edge: B.trim, fill: B.rock, rail: B.iron, post: B.wallDk, postGap: 4,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.candle); if (k % 8 === 0 && x < M) lights.push({ p: [M + 0.5, y, z + 0.5], c: '#ffd0a0', i: 0.8, d: 14, flicker: 0.3, srcR: 7 }); } });
      MH.path(w, [[M + 0.5, footZ], [M + 0.5, 127]], 2.6, B.cobble, B.ground);
      for (let z = footZ + 4; z <= 125; z += 5) for (const x of [M - 4, M + 4]) { const g = MH.g(w, x, z); w.box(x, g + 1, z, x, g + 3, z, B.iron); w.set(x, g + 4, z, B.candle); }
      landmarks.push({ name: '순례자의 대계단', note: '촛불을 따라 오르는 길', p: [M + 0.5, P + 3, SZ0 + 6] });
      // ── 아래 땅: 죽은 나무, 부서진 기둥 ──
      for (let i = 0; i < 26; i++) {
        const tx = w.ri(4, 123), tz = w.ri(4, 123), gy = MH.g(w, tx, tz);
        if (gy < base - 2 || gy > base + 3 || w.liq[tx + W * tz] >= 0 || w.get(tx, gy + 1, tz) || Math.abs(tx - M) < 9) continue;
        if (i % 3) MH.tree(w, tx, gy + 1, tz, { kind: 'dead', h: w.ri(10, 16), bark: B.bark, spread: 5, trunkR: 1.2 });
        else { const hh = w.ri(3, 11); w.box(tx, gy + 1, tz, tx + 1, gy + hh, tz + 1, B.trim); w.box(tx - 1, gy + 1, tz - 1, tx + 2, gy + 1, tz + 2, B.wallDk); }
      }
      return { lights, landmarks, acts };
    },
  });
})();
