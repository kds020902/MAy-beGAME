// 피의 성당 — 절벽 고원 위의 고딕 대성당과 핏빛 폭포, 서쪽 고원의 참회의 수도원 회랑 (160칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 120;
  MAPS.push({
    id: 'cathedral', cat: 'dungeon', name: '피의 성당', en: 'Cathedral of Blood', color: '#c0444a', seed: 37, base: 24, time: 'night', size: [W, D, Hh],
    desc: '신 대신 피를 섬기게 된 성당. 기도 소리는 비명으로 바뀌었다. 성당 서쪽 고원에는 수도사들이 참회하던 회랑이 남아, 안뜰 우물에서는 지금도 물 대신 피가 길어 올려진다.',
    info: { title: '장소 정보', en: 'CATHEDRAL OF BLOOD', rows: [['자리', '절벽 고원 · 동쪽은 핏빛 협곡'], ['정면', '쌍탑과 장미창 · 피의 샘 광장'], ['서쪽 고원', '참회의 수도원 회랑 · 피 우물']] },
    monsters: { normal: ['광신도', '가고일', '흡혈 사제', '참회하는 망령'], mid: '심문관', boss: '타락한 대주교' },
    sky: ['#1c080c', '#3a0e18', '#8a2230'], stars: false,
    hemi: ['#d8a8b0', '#2a1216', 0.64], sun: ['#ffd0c8', 0.74, [0.5, 1, 0.55]],
    day: { sky: ['#e8c0b0', '#9a5a5a', '#ffd8c0'], stars: false, hemi: ['#f8e0d8', '#4a3030', 0.6], sun: ['#ffe0d0', 0.72, [0.5, 1, 0.55]], haze: '#c89088' },
    liquid: ['#3a0810', '#7c1420', '#ff6072'], liqSpeed: 0.5,
    fog: { start: 0.72, floor: 16, depth: 10, haze: [26, 0.32, 8], hazeColor: '#4a1a24' },
    camY: 6, zoom: 1.15,
    particles: [
      { n: 400, colors: ['#ff5a6a', '#c02a3a', '#ff9aa0'], mode: 'drift', speed: 0.35, y0: 36, y1: 96 },
      { n: 80, colors: ['#ffb04a', '#ff7a2a'], mode: 'rise', speed: 1.2, area: [48, 100, 2.5], y0: 40, y1: 64 },
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
      candle: { c: '#ffe2a0', glow: true }, bolt: { c: '#fff0f0', glow: true }, door: { c: '#4a2420', v: 0.06, pat: 'plank' }, fire: { c: '#ff8a3a', glow: true }, fire2: { c: '#ffd060', glow: true }, reye: { c: '#ff3040', glow: true },
      // 새 재질: 회랑 바닥, 붉은 장미, 성배, 가시 철
      cloF: { c: '#5a4e52', top: '#6e6264', v: 0.05, pat: 'check', alt: '#5e5458' }, roseF: { c: '#a01828', v: 0.08 }, leafD: { c: '#2a3a26', v: 0.08 }, grass: { c: '#3d3439', top: '#4a3a34', v: 0.1 },
      lamp: { c: '#ffb070', night: true, day: '#5a4a40' }, blood: { c: '#c01a2a', glow: true },
    },
    build(w) {
      // 원래 128칸 설계를 동쪽으로 16칸, 남쪽으로 12칸 옮겨 놓고, 비는 서쪽 고원에 수도원 회랑을 새로 세운다
      const B = w.id, n = w.noise, base = w.base, M = 72, CZ = 66;
      const gorge = [[128, -5], [122, 68], [134, 165]];
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const qx = Math.abs(x - M) / 40, qz = Math.abs(z - CZ) / 45;
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
      // 서쪽 확장 고원(수도원)을 먼저, 본 고원을 나중에 다듬는다
      const QX0 = 4, QX1 = 37, QZ0 = 60, QZ1 = 108;
      MH.flatten(w, QX0, QZ0, QX1, QZ1, P, B.grass, B.rock);
      MH.flatten(w, 36, 24, 108, 108, P, B.flag, B.rock);
      const skirtO = { R: 12, rate: 1.25, noise: (x, z) => n.fbm(x * 0.17 + 3, z * 0.17, 2) * 4 - 1, surf: (x, z, h) => h > base + 4 ? B.cliff : B.ground, fill: B.rock, skip: (x, z) => MH.polyDist(x, z, gorge) < 5 };
      MH.skirt(w, 36, 24, 108, 108, P, skirtO);
      MH.skirt(w, QX0, QZ0, QX1, QZ1, P, skirtO);
      for (let i = 0; i < 70; i++) {
        const x = w.ri(6, 136), z = w.ri(2, 140), g = MH.g(w, x, z);
        if (x > 33 && x < 111 && z > 21 && z < 111) continue;
        if (x < 40 && z > 57 && z < 111) continue;
        if (g > base + 1 && g < P - 2 && Math.abs(x - M) > 8 && MH.polyDist(x, z, gorge) > 6) MH.rock(w, x, g, z, w.r(1.3, 2.8), B.cliff, B.bmoss);
      }

      // ── 대성당 몸체 ──
      w.box(59, Y, 40, 85, Y + 13, 88, B.wall);          // 측랑
      w.box(65, Y, 40, 79, Y + 27, 88, B.wall);          // 신랑
      w.box(46, Y, 52, 98, Y + 27, 64, B.wall);          // 익랑
      for (let dz = -12; dz <= 0; dz++) for (let dx = -12; dx <= 12; dx++) if (dx * dx + dz * dz <= 144) w.box(M + dx, Y, 40 + dz, M + dx, Y + 27, 40 + dz, B.wall);
      // 굽돌(바닥 두 단)
      w.walls(58, Y, 39, 86, Y + 1, 89, B.wallDk); w.walls(45, Y, 51, 99, Y + 1, 65, B.wallDk);
      for (const y of [Y + 13, Y + 27]) { w.walls(59, y, 40, 85, y, 88, B.trim); w.walls(46, y, 52, 98, y, 64, B.trim); }
      w.walls(46, Y + 7, 52, 98, Y + 7, 64, B.trim);
      for (let x = 57; x <= 64; x++) for (let z = 39; z <= 89; z++) { w.set(x, Y + 14 + (x - 57), z, x === 57 ? B.roofR : B.roof); w.set(144 - x, Y + 14 + (x - 57), z, x === 57 ? B.roofR : B.roof); }
      MH.roof(w, 64, 80, 39, 89, Y + 28, { b: B.roof, eave: B.roofR, ridge: B.roofR, pitch: 2, gable: B.wall, axis: 'z' });
      MH.roof(w, 45, 99, 51, 65, Y + 28, { b: B.roof, eave: B.roofR, ridge: B.roofR, pitch: 2, gable: B.wall, axis: 'x' });
      MH.cone(w, M, 38, Y + 28, 13.5, B.roof, 0.42, B.roofR);
      // 용마루 쇠 장식(뾰족 창살)
      for (let z = 40; z <= 88; z += 2) { const t = w.top(M, z); if (t > Y + 30 && !(z > 52 && z < 64)) { w.set(M, t + 1, z, B.iron); if (z % 4 === 0) w.set(M, t + 2, z, B.iron); } }
      for (let x = 46; x <= 98; x += 2) { const t = w.top(x, 58); if (t > Y + 30 && (x < 65 || x > 79)) w.set(x, t + 1, 58, B.iron); }
      // 교차부 첨탑
      w.box(69, Y + 40, 55, 75, Y + 48, 61, B.wallDk);
      for (const [x, z] of [[69, 58], [75, 58], [72, 55], [72, 61]]) w.box(x, Y + 42, z, x, Y + 46, z, B.glassR);
      w.walls(68, Y + 40, 54, 76, Y + 40, 62, B.trim); w.walls(68, Y + 48, 54, 76, Y + 48, 62, B.trim);
      for (const [x, z] of [[68, 54], [76, 54], [68, 62], [76, 62]]) { w.box(x, Y + 49, z, x, Y + 51, z, B.wallDk); w.set(x, Y + 52, z, B.gold); }
      const fl = MH.pyramid(w, 69, 55, 75, 61, Y + 49, B.roofR, 4);
      w.box(M, fl, 58, M, fl + 4, 58, B.gold); w.box(M - 1, fl + 2, 58, M + 1, fl + 2, 58, B.gold);
      // 버팀벽, 작은 첨탑(금 꼭지), 공중 버팀벽, 물받이 가고일
      for (const z of [42, 47, 68, 73, 78, 83]) for (const [px, dir] of [[55, -1], [89, 1]]) {
        w.box(px, Y, z, px + dir, Y + 20, z + 1, B.wallDk); w.box(px + dir * 2, Y, z, px + dir * 2, Y + 10, z + 1, B.wallDk);
        w.box(px + dir * 2, Y + 11, z, px + dir * 2, Y + 11, z + 1, B.trim); w.box(px - dir, Y + 6, z, px - dir, Y + 6, z + 1, B.trim);
        MH.cone(w, px, z, Y + 21, 1.4, B.roofR, 0.45);
        w.set(px, w.top(px, z) + 1, z, B.gold);
        const cx = dir < 0 ? 65 : 79;
        w.line(px, Y + 20, z, cx, Y + 25, z, B.wallDk, 0.6); w.line(px, Y + 20, z + 1, cx, Y + 25, z + 1, B.wallDk, 0.6);
        w.set(px + dir * 3, Y + 9, z, B.garg); w.set(px + dir * 4, Y + 9, z, B.garg); w.set(px + dir * 4, Y + 10, z, B.reye);
      }
      // 창: 테두리 머리돌과 창턱
      for (const z of [44, 45, 70, 71, 75, 76, 80, 81]) for (const [x, dx] of [[59, -1], [85, 1]]) {
        w.box(x, Y + 3, z, x, Y + 11, z, (z % 2) ? B.glassR : B.glassP); w.set(x, Y + 7, z, B.iron);
        w.set(x + dx, Y + 2, z, B.trim); w.set(x, Y + 12, z, B.trim);
      }
      for (let z = 42; z <= 86; z += 4) { if (z > 50 && z < 66) continue; for (const x of [65, 79]) { w.box(x, Y + 17, z, x, Y + 25, z + 1, B.glassR); w.box(x, Y + 26, z, x, Y + 26, z + 1, B.trim); w.box(x, Y + 21, z, x, Y + 21, z + 1, B.iron); } }
      const rose = (cx, cy, cz, r, plane) => {
        for (let v = -Math.ceil(r); v <= Math.ceil(r); v++) for (let u = -Math.ceil(r); u <= Math.ceil(r); u++) {
          const d = Math.hypot(u, v);
          if (d > r + 0.3) continue;
          const ang = Math.atan2(v, u), spoke = Math.abs(Math.sin(ang * 6)) < 0.2 && d > 1.6;
          const b = d > r - 0.8 ? B.trim : spoke ? B.iron : d < 1.7 ? B.glassG : (d > r * 0.6 ? B.glassR : B.glassP);
          if (plane === 'z') w.set(cx + u, cy + v, cz, b); else w.set(cx, cy + v, cz + u, b);
        }
      };
      rose(46, Y + 18, 58, 5, 'x'); rose(98, Y + 18, 58, 5, 'x');
      // 익랑 끝 정면의 뾰족 아치 창 둘
      for (const [x, s2] of [[46, -1], [98, 1]]) for (const z of [54, 62]) { w.box(x, Y + 3, z, x, Y + 9, z, B.glassP); w.set(x, Y + 10, z, B.trim); w.set(x + s2, Y + 2, z, B.trim); }
      for (let a = 0.25; a < Math.PI - 0.15; a += 0.36) { const x = Math.round(M + Math.cos(a) * 12), z = Math.round(40 - Math.sin(a) * 12); w.box(x, Y + 5, z, x, Y + 20, z, B.glassP); }
      // ── 정면 쌍탑 ──
      const tops = [];
      for (const tx of [52, 83]) {
        w.box(tx, Y, 80, tx + 9, Y + 44, 89, B.wall);
        for (const [cx, cz] of [[tx - 1, 90], [tx + 10, 90], [tx - 1, 79], [tx + 10, 79]]) { w.box(cx, Y, cz, cx, Y + 32, cz, B.wallDk); for (let y = Y + 8; y <= Y + 32; y += 8) w.set(cx, y, cz, B.trim); }
        for (const y of [Y + 13, Y + 27, Y + 33]) w.walls(tx - 1, y, 79, tx + 10, y, 90, B.trim);
        w.box(tx + 3, Y + 15, 90, tx + 6, Y + 24, 90, B.glassP); w.box(tx + 4, Y + 25, 90, tx + 5, Y + 25, 90, B.glassP);
        w.box(tx + 3, Y + 19, 90, tx + 6, Y + 19, 90, B.iron); w.box(tx + 2, Y + 26, 90, tx + 7, Y + 26, 90, B.trim);
        w.box(tx + 3, Y + 1, 90, tx + 6, Y + 7, 90, B.dark); w.box(tx + 2, Y + 8, 90, tx + 7, Y + 8, 90, B.trim);
        // 탑 옆면(동·서)에도 좁은 창
        for (const x of [tx, tx + 9]) for (const z of [83, 86]) w.box(x, Y + 16, z, x, Y + 23, z, B.glassR);
        // 종루: 속을 비우고 네 기둥만 남긴다
        w.box(tx + 1, Y + 35, 80, tx + 8, Y + 42, 89, 0); w.box(tx, Y + 35, 81, tx + 9, Y + 42, 88, 0);
        w.box(tx + 1, Y + 34, 81, tx + 8, Y + 34, 88, B.wallDk);
        for (const x of [tx, tx + 9]) for (const z of [80, 89]) w.box(x, Y + 35, z, x, Y + 42, z, B.wall);
        w.box(tx, Y + 43, 80, tx + 9, Y + 44, 89, B.wall);
        w.walls(tx - 1, Y + 45, 79, tx + 10, Y + 46, 90, B.trim);
        for (const [cx, cz] of [[tx - 1, 79], [tx + 10, 79], [tx - 1, 90], [tx + 10, 90]]) { w.box(cx, Y + 47, cz, cx, Y + 50, cz, B.wallDk); w.set(cx, Y + 51, cz, B.roofR); w.set(cx, Y + 52, cz, B.gold); }
        const st = MH.pyramid(w, tx, 80, tx + 9, 89, Y + 47, B.roof, 3, B.roofR);
        w.box(tx + 4, st, 84, tx + 5, st + 5, 85, B.gold); w.box(tx + 3, st + 3, 84, tx + 6, st + 3, 85, B.gold);
        tops.push(st + 6);
      }
      // 정면 벽, 장미창, 세 개의 문
      w.box(62, Y, 89, 82, Y + 31, 89, B.wall);
      MH.roof(w, 62, 82, 89, 89, Y + 30, { b: B.wall, pitch: 2, axis: 'z' });
      rose(M, Y + 21, 90, 7, 'z');
      for (let x = 64; x <= 80; x++) w.set(x, Y + 13, 90, B.trim);
      for (let x = 66; x <= 78; x += 2) { w.set(x, Y + 30 - Math.abs(x - M), 90, B.candle); }
      for (let x = 67; x <= 77; x++) for (let y = Y; y <= Y + 14; y++) {
        const top = Y + 12 - Math.pow(Math.abs(x - M) / 5, 2) * 4;
        if (y <= top) w.set(x, y, 90, Math.abs(x - M) >= 4 ? B.trim : B.dark);
        else if (y <= top + 1) w.set(x, y, 90, B.trim);
      }
      for (let s = 0; s < 4; s++) w.box(64 - s, P - s, 91 + s, 80 + s, P - s, 91 + s, B.trim);
      for (const cx of [66, 78]) { w.box(cx, Y, 92, cx, Y + 3, 92, B.iron); w.set(cx, Y + 4, 92, B.candle); w.set(cx - 1, Y + 3, 92, B.candle); w.set(cx + 1, Y + 3, 92, B.candle); }
      lights.push({ name: 'rose', p: [M + 0.5, Y + 21, 92], c: '#ff3a4c', i: 1.3, d: 30, flicker: 0.06 });
      lights.push({ p: [44, Y + 18, 58.5], c: '#c050e0', i: 1.1, d: 20, flicker: 0.05 });
      lights.push({ p: [100, Y + 18, 58.5], c: '#ff3a4c', i: 1.1, d: 20, flicker: 0.05 });
      lights.push({ p: [M + 0.5, Y + 4, 93], c: '#ffd0a0', i: 0.8, d: 12, flicker: 0.3, srcR: 7 });
      // 서쪽 탑의 대종(부품) — 비운 종루 가운데에 매단다
      w.box(53, Y + 42, 84, 60, Y + 42, 84, B.wood);
      const bell = w.prop({ name: 'bell', pivot: [57, Y + 42, 84.5], axis: 'z' });
      bell.box(56, Y + 40, 84, 57, Y + 41, 84, B.iron);
      bell.ellipsoid(56.5, Y + 38, 84, 2.4, 2.4, 2.4, B.bell, (dx, dy) => dy >= -2); bell.box(56, Y + 35, 84, 57, Y + 35, 84, B.iron);
      acts.push({
        name: '서쪽 탑의 대종', hint: '종이 울리고 붉은 먼지가 흩날려요', hit: [53, Y + 35, 81, 60, Y + 42, 88],
        run: async a => {
          a.flash('rose', 1.6, 3.4);
          for (let k = 0; k < 4; k++) {
            await a.turn('bell', [0, 0, 0.45], 0.42);
            a.burst([57, Y + 38, 84.5], { n: 30, colors: ['#ff5a6a', '#ff9aa0', '#c02a3a'], speed: 9, up: 1, life: 2.4, gravity: 0.3, spread: 4, flat: true });
            await a.turn('bell', [0, 0, -0.45], 0.42);
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '장미창', hint: '핏빛 스테인드글라스가 타오르듯 빛나요', hit: [64, Y + 13, 89, 80, Y + 29, 91],
        run: async a => {
          a.flash('rose', 5, 3.2); a.glow(1.8, 3.2);
          for (let k = 0; k < 5; k++) { a.burst([M + 0.5, Y + 21, 92], { n: 24, colors: ['#ff3e52', '#ffb85a', '#b848d8'], speed: 6, up: 0.5, life: 2, gravity: -0.4, spread: 7 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '핏빛 대성당', note: '보스 · 타락한 대주교', p: [M + 0.5, Math.max(...tops) + 5, 84.5], boss: true });

      // ── 광장: 피의 샘, 절벽으로 흐르는 핏물, 쇠 등 ──
      for (let z = 92; z <= 108; z++) for (let x = 38; x <= 106; x++) if (MH.g(w, x, z) === P) MH.paint(w, x, z, (Math.abs(x - M) <= 2 || z === 100) ? B.flag : B.cobble);
      const FX = M, FZ = 101;
      for (let z = FZ - 7; z <= FZ + 7; z++) for (let x = FX - 7; x <= FX + 7; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 6.8) continue;
        if (d > 5.6) { w.set(x, P + 1, z, B.trim); if ((x + z) % 2) w.set(x, P + 2, z, B.trim); continue; }
        MH.setH(w, x, z, P - 2, B.rock, B.rock); w.liquid(x, z, P - 1);
      }
      w.box(FX, P - 1, FZ, FX, P + 5, FZ, B.trim); w.cyl(FX, FZ, P + 6, P + 6, 2.4, B.trim); w.ring(FX, FZ, P + 7, 1.6, 2.5, B.trim);
      w.box(FX, P + 7, FZ, FX, P + 11, FZ, B.garg);
      for (const s of [-1, 1]) { w.line(FX + s, P + 10, FZ, FX + s * 5, P + 14, FZ, B.garg); w.box(FX + s * 2, P + 9, FZ, FX + s * 3, P + 11, FZ, B.garg); }
      w.set(FX, P + 12, FZ, B.garg); w.set(FX, P + 11, FZ + 1, B.reye);
      lights.push({ name: 'font', p: [FX + 0.5, P + 9, FZ + 1.5], c: '#ff3040', i: 1.3, d: 18, flicker: 0.1 });
      let edgeX = FX + 7;
      while (edgeX < 126 && MH.g(w, edgeX, FZ) >= P - 1) edgeX++;
      for (let x = FX + 6; x < edgeX; x++) for (const dz of [0, 1]) { MH.setH(w, x, FZ + dz, P - 2, B.rock, B.rock); w.liquid(x, FZ + dz, P - 1); }
      MH.river(w, [[edgeX, FZ], [124, 106]], 1.8, base - 1, B.rockDk);
      MH.river(w, gorge, 3.6, base - 3, B.rockDk);
      // 광장 쇠 등과 돌 벤치
      for (const [lx, lz] of [[50, 96], [94, 96], [50, 106], [94, 106]]) {
        w.box(lx, P + 1, lz, lx, P + 6, lz, B.iron); w.set(lx, P + 7, lz, B.lamp); w.set(lx, P + 8, lz, B.iron); w.set(lx - 1, P + 7, lz, B.iron); w.set(lx + 1, P + 7, lz, B.iron);
        lights.push({ p: [lx + 0.5, P + 7, lz + 0.5], c: '#ffb070', i: 0.9, d: 12, flicker: 0.2, night: true });
      }
      for (const bx of [58, 84]) { w.box(bx - 2, P + 1, 104, bx + 2, P + 1, 104, B.trim); w.set(bx - 2, P + 1, 105, B.wallDk); w.set(bx + 2, P + 1, 105, B.wallDk); }
      landmarks.push({ name: '피의 샘', note: '절벽 아래로 떨어지는 핏물', p: [FX + 0.5, P + 19, FZ + 0.5] });
      // ── 가고일 회랑(고원 동쪽 끝) ──
      let gargAt = null;
      for (let z = 34; z <= 90; z += 8) {
        let gx = 112; while (gx > 76 && MH.g(w, gx, z) !== P) gx--;
        gx -= 2;
        if (MH.g(w, gx, z) !== P) continue;
        w.box(gx - 1, P + 1, z - 1, gx + 1, P + 1, z + 1, B.wallDk); w.box(gx, P + 2, z, gx, P + 8, z, B.trim); w.box(gx - 1, P + 8, z - 1, gx + 1, P + 8, z + 1, B.wallDk);
        w.set(gx, P + 4, z + 1, B.wallDk); w.set(gx + 1, P + 4, z, B.wallDk);
        // z=82의 가고일은 날아오르는 부품
        const gw = z === 82 ? w.prop({ name: 'garg', pivot: [gx + 0.5, P + 9, z + 0.5] }) : w;
        if (z === 82) gargAt = [gx, z];
        gw.box(gx, P + 9, z, gx, P + 11, z, B.garg); gw.box(gx + 1, P + 9, z, gx + 2, P + 10, z, B.garg); gw.set(gx + 2, P + 11, z, B.reye);
        for (const s of [-1, 1]) { gw.set(gx, P + 11, z + s, B.garg); gw.set(gx - 1, P + 12, z + s * 2, B.garg); gw.set(gx - 1, P + 11, z + s * 2, B.garg); }
      }
      landmarks.push({ name: '가고일 회랑', note: '가고일 · 광신도 출몰', p: [106.5, P + 18, 58.5] });

      // ── 심문관의 화형대와 교수대 ──
      const IX = 43, IZ = 95;
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
      const stairC = [], SZ0 = 109, footZ = 122, footH = MH.g(w, M, footZ + 3);
      MH.flight(w, { name: '순례자 계단', axis: 'z', c: M, half: 5, a: SZ0, b: footZ, ha: P - 1, hb: footH, step: B.cobble, edge: B.trim, fill: B.rock, rail: B.iron, post: B.wallDk, postGap: 4,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.candle); stairC.push([x, y, z]); if (k % 8 === 0 && x < M) lights.push({ p: [M + 0.5, y, z + 0.5], c: '#ffd0a0', i: 0.8, d: 14, flicker: 0.3, srcR: 7 }); } });
      MH.path(w, [[M + 0.5, footZ], [M + 0.5, 159]], 2.6, B.cobble, B.ground);
      for (let z = footZ + 4; z <= 155; z += 5) for (const x of [M - 4, M + 4]) { const g = MH.g(w, x, z); w.box(x, g + 1, z, x, g + 3, z, B.iron); w.set(x, g + 4, z, B.candle); }
      landmarks.push({ name: '순례자의 대계단', note: '촛불을 따라 오르는 길', p: [M + 0.5, P + 3, SZ0 + 6] });
      // ── 아래 땅: 죽은 나무, 부서진 기둥 ──
      for (let i = 0; i < 44; i++) {
        const tx = w.ri(4, 155), tz = w.ri(4, 155), gy = MH.g(w, tx, tz);
        if (gy < base - 2 || gy > base + 3 || w.liq[tx + W * tz] >= 0 || w.get(tx, gy + 1, tz) || Math.abs(tx - M) < 9) continue;
        if (i % 3) MH.tree(w, tx, gy + 1, tz, { kind: 'dead', h: w.ri(10, 16), bark: B.bark, spread: 5, trunkR: 1.2 });
        else { const hh = w.ri(3, 11); w.box(tx, gy + 1, tz, tx + 1, gy + hh, tz + 1, B.trim); w.box(tx - 1, gy + 1, tz - 1, tx + 2, gy + 1, tz + 2, B.wallDk); }
      }
      // ── 정문(부품 문짝 둘): 바깥으로 열리며 붉은 안개가 쏟아진다 ──
      const archY = x => Y + 12 - Math.pow(Math.abs(x - M) / 5, 2) * 4;
      const gL = w.prop({ name: 'gateL', pivot: [69, Y, 91] }), gR = w.prop({ name: 'gateR', pivot: [76, Y, 91] });
      for (let x = 69; x <= 75; x++) for (let y = Y; y <= archY(x); y++) (x <= 72 ? gL : gR).set(x, y, 91, (y === Y + 3 || y === Y + 7 || x === 72 || x === 73) ? B.iron : B.door);
      gL.set(71, Y + 5, 92, B.gold); gR.set(74, Y + 5, 92, B.gold);
      lights.push({ name: 'nave', p: [M + 0.5, Y + 4, 92.5], c: '#ff4050', i: 0.01, d: 22, flicker: 0.3, srcR: 7 });
      acts.push({
        name: '성당 정문', hint: '육중한 정문이 바깥으로 열리며 붉은 안개가 쏟아져 나와요', hit: [68, Y, 90, 76, Y + 11, 92],
        run: async a => {
          a.flash('nave', 260, 5);
          await Promise.all([a.turn('gateL', [0, -1.5, 0], 2.2), a.turn('gateR', [0, 1.5, 0], 2.2)]);
          for (let k = 0; k < 5; k++) { a.burst([M + 0.5, Y + 3, 93], { n: 34, colors: ['#ff5a6a', '#c02a3a', '#4a1a24'], speed: 5, up: 1, life: 2.4, gravity: 0.3, spread: 4, flat: true }); await a.wait(0.4); }
          await a.wait(1);
          await Promise.all([a.turn('gateL', [0, 0, 0], 1.8), a.turn('gateR', [0, 0, 0], 1.8)]);
        },
      });

      // ── 가고일의 비상: 회랑의 가고일 하나가 깨어나 성당 위를 지나 서쪽 하늘 너머로 날아가고, 다시 받침에 나타난다 ──
      if (gargAt) {
        const [gx, gz] = gargAt;
        acts.push({
          name: '가고일의 비상', hint: '회랑의 가고일이 눈을 붉히며 날아올라 성당 위를 넘어 서쪽 하늘로 사라져요', hit: [gx - 2, P + 8, gz - 2, gx + 3, P + 13, gz + 2],
          run: async a => {
            for (let k = 0; k < 3; k++) { await a.move('garg', [0, 0.6, 0], 0.1); await a.move('garg', [0, 0, 0], 0.1); }
            a.burst([gx + 2.5, P + 11.5, gz + 0.5], { n: 30, colors: ['#ff3040', '#5e585c', '#9e928c'], speed: 5, up: 3, life: 1.4, gravity: 3, spread: 1.5 });
            // 머리(+x, 붉은 눈 쪽)를 진행 방향으로 돌린다
            await a.drive('garg', [[3, 6, 2], [4, 12, 8], [-4, 18, 12], [-16, 22, 6], [-30, 24, -4], [-46, 26, -16], [-62, 27, -24], [-124, 30, -40]], 7, { fwd: '+x', back: 1.0 });
            a.burst([gx + 0.5, P + 9, gz + 0.5], { n: 30, colors: ['#9e928c', '#5e585c'], speed: 5, up: 1, life: 1, gravity: 4, spread: 2, flat: true });
          },
        });
      }

      // ── 피의 샘: 가고일 상의 입에서 핏물이 솟구친다 ──
      acts.push({
        name: '피의 샘', hint: '샘 한가운데 가고일 상이 핏물을 높이 뿜어 올려요', hit: [FX - 6, P - 1, FZ - 6, FX + 6, P + 12, FZ + 6],
        run: async a => {
          a.flash('font', 4, 4);
          for (let k = 0; k < 8; k++) {
            a.burst([FX + 0.5, P + 12, FZ + 1.5], { n: 40, colors: ['#ff3e52', '#c02a3a', '#7c1420'], speed: 4, up: 12, life: 2, gravity: 9, spread: 0.8 });
            const t = k * 0.8;
            a.burst([FX + 0.5 + Math.cos(t) * 4.5, P + 0.5, FZ + 0.5 + Math.sin(t) * 4.5], { n: 16, colors: ['#ff6072', '#7c1420'], speed: 3, up: 3, life: 0.8, gravity: 6, spread: 1 });
            await a.wait(0.35);
          }
        },
      });

      // ── 광장의 낙뢰(부품 번개, 평소엔 숨김) ──
      const TT = [88.5, P + 1, 97.5];
      const bolt = w.prop({ name: 'bolt', pivot: TT, scl0: [0, 0, 0] });
      let prev = [108, w.H - 3, 112];
      for (let k = 1; k <= 7; k++) {
        const p = [prev[0] + (TT[0] - prev[0]) * (k === 7 ? 1 : 0.3), prev[1] + (TT[1] - prev[1]) * (k === 7 ? 1 : 0.3), prev[2] + (TT[2] - prev[2]) * (k === 7 ? 1 : 0.3)];
        if (k < 7) { p[0] += (hash3(k, 1, 7) - 0.5) * 5; p[2] += (hash3(k, 3, 7) - 0.5) * 5; }
        bolt.line(prev[0], prev[1], prev[2], p[0], p[1], p[2], B.bolt); prev = p;
      }
      lights.push({ name: 'strike', p: [TT[0], TT[1] + 1, TT[2]], c: '#ffd8d8', i: 0.01, d: 50, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '광장의 낙뢰', hint: '핏빛 하늘에서 번개가 성당 앞 광장에 내리꽂혀 불똥이 튀어요', hit: [85, P, 94, 92, P + 4, 101],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.tween('bolt', { scl: [1, 1, 1] }, 0.05); a.lightning(1.3); a.flash('strike', 200, 0.3);
            a.burst(TT, { n: 50, colors: ['#ffffff', '#ffd060', '#ff5a6a'], speed: 9, up: 3, life: 1, gravity: 4, spread: 2 });
            await a.wait(0.22); await a.tween('bolt', { scl: [0, 0, 0] }, 0.05); await a.wait(0.5 + k * 0.25);
          }
          a.glow(1.8, 2); a.flash('rose', 3, 2);
          a.burst([TT[0], P + 1.5, TT[2]], { n: 40, colors: ['#ff3e52', '#ffb85a', '#3d3439'], speed: 6, up: 1, life: 1.6, gravity: 2, spread: 2, flat: true });
          await a.wait(1.2);
        },
      });

      // ── 순례자의 촛불: 계단 촛불이 아래부터 차례로 크게 타오른다 ──
      const cand = stairC.filter(([, , z]) => z <= 124).sort((p, q) => q[2] - p[2] || p[0] - q[0]).concat([[66, Y + 4, 92], [78, Y + 4, 92]]);
      if (cand.length) acts.push({
        name: '순례자의 촛불', hint: '대계단 난간의 촛불이 아래에서부터 차례로 타오르며 성당을 가리켜요', hit: [M - 7, cand[0][1] - 1, cand[0][2] - 2, M + 7, cand[0][1] + 3, cand[0][2] + 2],
        run: async a => {
          for (const [x, y, z] of cand) { a.burst([x + 0.5, y + 1, z + 0.5], { n: 14, colors: ['#ffe2a0', '#ffb04a', '#ff7a2a'], speed: 0.8, up: 5, life: 1.2, gravity: -0.4, spread: 0.3 }); await a.wait(0.1); }
          a.flash('nave', 120, 2); a.flash('rose', 4, 2.4); a.glow(1.6, 2.4);
          a.burst([M + 0.5, Y + 21, 92], { n: 50, colors: ['#ff3e52', '#ffb85a', '#b848d8'], speed: 6, up: 0.5, life: 2, gravity: -0.3, spread: 6 });
          await a.wait(2);
        },
      });

      // ══ 새 구역: 서쪽 고원의 참회의 수도원 회랑 ══
      const CX0 = 8, CX1 = 33, CZ0 = 70, CZ1 = 101, RH = 7;
      // 바깥벽(남·동쪽은 낮은 벽, 북·서쪽은 높은 벽)
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        const edge = x === CX0 || x === CX1 || z === CZ0 || z === CZ1;
        const walk = x < CX0 + 4 || x > CX1 - 4 || z < CZ0 + 4 || z > CZ1 - 4;
        MH.paint(w, x, z, walk ? B.cloF : (hash3(x, 1, z) > 0.7 ? B.bmoss : B.grass));
        if (!edge) continue;
        const low = z === CZ1 || x === CX1;
        w.box(x, P + 1, z, x, P + (low ? 3 : RH), z, B.wall);
        if (!low && (x + z) % 5 === 0) w.box(x, P + 3, z, x, P + 5, z, B.dark);
        if (low) w.set(x, P + 4, z, B.trim);
      }
      // 회랑 입구(동쪽 낮은 벽, 화형대 쪽)와 철문(부품)
      const EZ = 86;
      w.box(CX1, P + 1, EZ - 2, CX1, P + 4, EZ + 2, 0);
      for (const s2 of [-3, 3]) { w.box(CX1, P + 1, EZ + s2, CX1, P + 7, EZ + s2, B.wallDk); w.set(CX1, P + 8, EZ + s2, B.gold); }
      for (let z = EZ - 3; z <= EZ + 3; z++) w.set(CX1, P + 7 + (Math.abs(z - EZ) < 2 ? 1 : 0), z, B.trim);
      const cgL = w.prop({ name: 'cgateL', pivot: [CX1 + 0.5, P + 1, EZ - 2] }), cgR = w.prop({ name: 'cgateR', pivot: [CX1 + 0.5, P + 1, EZ + 3] });
      for (let z = EZ - 2; z <= EZ + 2; z++) for (let y = P + 1; y <= P + 5; y++) {
        if (z === EZ && y > P + 4) continue;
        const b = (y === P + 1 || y === P + 4 || z === EZ - 2 || z === EZ + 2) ? B.iron : ((z + y) % 2 ? B.iron : 0);
        if (b) (z < EZ || (z === EZ && y % 2) ? cgL : cgR).set(CX1, y, z, b);
      }
      for (let x = CX1 + 1; x <= 42; x++) for (let z = EZ - 1; z <= EZ + 1; z++) if (MH.g(w, x, z) === P) MH.paint(w, x, z, B.cloF);
      // 안쪽 아케이드: 기둥과 뾰족 아치, 안쪽으로 기운 지붕
      const IX0 = CX0 + 4, IX1 = CX1 - 4, IZ0 = CZ0 + 4, IZ1 = CZ1 - 4;
      for (let z = IZ0; z <= IZ1; z++) for (let x = IX0; x <= IX1; x++) {
        if (x !== IX0 && x !== IX1 && z !== IZ0 && z !== IZ1) continue;
        const u = (x === IX0 || x === IX1) ? z - IZ0 : x - IX0, col = u % 3 === 0;
        if (col) { w.box(x, P + 1, z, x, P + 5, z, B.trim); w.set(x, P + 1, z, B.wallDk); }
        else w.set(x, P + 5, z, B.wall);
        if (!col && u % 3 === 1) w.set(x, P + 4, z, B.trim);
        if (!col && u % 3 === 2) w.set(x, P + 4, z, B.trim);
      }
      // 기운 지붕: 바깥벽(높이 RH) → 아케이드(높이 6)
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        const dIn = Math.min(x - CX0, CX1 - x, z - CZ0, CZ1 - z);
        if (dIn > 4) continue;
        const sideLow = (x > CX1 - 5 && dIn === CX1 - x) || (z > CZ1 - 5 && dIn === CZ1 - z);
        const y = sideLow ? P + 6 : P + RH + 1 - Math.round(dIn * 0.5);
        if (x === CX1 && Math.abs(z - EZ) <= 3) continue;
        w.set(x, y, z, dIn === 4 ? B.roofR : B.roof);
      }
      // 안뜰: 장미 화단과 피 우물
      const WX = Math.round((IX0 + IX1) / 2), WZ = Math.round((IZ0 + IZ1) / 2);
      for (let z = IZ0 + 1; z < IZ1; z++) for (let x = IX0 + 1; x < IX1; x++) {
        const d = Math.hypot(x - WX, z - WZ);
        if (d < 4.5) MH.paint(w, x, z, B.cloF);
        else if (Math.abs(x - WX) <= 1 || Math.abs(z - WZ) <= 1) MH.paint(w, x, z, B.cloF);
        else if (hash3(x, 2, z) > 0.45) { w.set(x, P + 1, z, B.leafD); if (hash3(x, 3, z) > 0.55) w.set(x, P + 2, z, B.roseF); }
      }
      w.ring(WX, WZ, P + 1, 1.5, 3.1, B.wallDk); w.ring(WX, WZ, P + 2, 1.5, 3.1, B.trim);
      for (let z = WZ - 1; z <= WZ + 1; z++) for (let x = WX - 1; x <= WX + 1; x++) { MH.setH(w, x, z, P - 3, B.rock, B.rock); w.liquid(x, z, P - 1); }
      w.ring(WX, WZ, P, 1.5, 3.1, B.wallDk);
      for (const [px, pz] of [[WX - 3, WZ], [WX + 3, WZ]]) w.box(px, P + 3, pz, px, P + 8, pz, B.wood);
      w.box(WX - 3, P + 9, WZ, WX + 3, P + 9, WZ, B.wood); w.set(WX - 4, P + 9, WZ, B.iron); w.set(WX - 4, P + 8, WZ, B.iron);
      for (let x = WX - 2; x <= WX + 2; x++) for (const dz of [-1, 1]) w.set(x, P + 10, WZ + dz, B.roofR);
      w.box(WX - 2, P + 11, WZ, WX + 2, P + 11, WZ, B.roofR);
      MH.rope(w, 'wrope', WX, P + 8, WZ, 2, B.rope);
      const pail = w.prop({ name: 'pail', pivot: [WX + 0.5, P + 6, WZ + 0.5] });
      pail.box(WX, P + 5, WZ, WX, P + 6, WZ, B.wood); pail.set(WX, P + 7, WZ, B.iron);
      lights.push({ name: 'well', p: [WX + 0.5, P, WZ + 0.5], c: '#ff3040', i: 0.4, d: 12, flicker: 0.2, liquid: true });
      // 성배 제단(안뜰 북쪽 회랑 앞)
      const AX = WX, AZ = IZ0 + 2;
      w.box(AX - 2, P + 1, AZ - 1, AX + 2, P + 2, AZ + 1, B.trim); w.box(AX - 2, P + 3, AZ - 1, AX + 2, P + 3, AZ + 1, B.wallDk);
      w.set(AX, P + 4, AZ, B.gold); w.set(AX, P + 5, AZ, B.gold); w.box(AX - 1, P + 6, AZ, AX + 1, P + 6, AZ, B.gold); w.set(AX, P + 6, AZ, B.blood);
      for (const s2 of [-2, 2]) { w.set(AX + s2, P + 4, AZ, B.iron); w.set(AX + s2, P + 5, AZ, B.candle); }
      w.box(AX - 1, P + 3, AZ + 2, AX + 1, P + 3, AZ + 2, B.roofR);
      lights.push({ name: 'chalice', p: [AX + 0.5, P + 7, AZ + 0.5], c: '#ff3a4c', i: 0.5, d: 14, flicker: 0.2 });
      // 고해실 첨탑(북서 모서리): 사각 탑과 뾰족 지붕, 붉은 등
      const KX = CX0 + 2, KZ = CZ0 + 2;
      w.box(KX - 3, P + 1, KZ - 3, KX + 3, P + 22, KZ + 3, B.wall);
      for (const y of [P + 8, P + 15, P + 22]) w.walls(KX - 4, y, KZ - 4, KX + 4, y, KZ + 4, B.trim);
      for (const [dx, dz] of [[3, 0], [0, 3]]) { w.box(KX + dx, P + 10, KZ + dz, KX + dx, P + 13, KZ + dz, B.glassR); w.box(KX + dx, P + 17, KZ + dz, KX + dx, P + 20, KZ + dz, B.lamp); }
      const kt = MH.pyramid(w, KX - 3, KZ - 3, KX + 3, KZ + 3, P + 23, B.roof, 3, B.roofR);
      w.box(KX, kt, KZ, KX, kt + 3, KZ, B.gold); w.box(KX - 1, kt + 2, KZ, KX + 1, kt + 2, KZ, B.gold);
      lights.push({ p: [KX + 3.5, P + 18, KZ + 0.5], c: '#ffb070', i: 0.8, d: 14, flicker: 0.25, night: true });
      // 회랑 바깥: 수도사 묘지(작은 십자 묘비)
      for (let z = CZ1 + 3; z <= QZ1 - 1; z += 3) for (let x = CX0 + 1; x <= CX1 - 1; x += 4) {
        if (MH.g(w, x, z) !== P) continue;
        w.box(x, P + 1, z, x, P + 3, z, B.trim); w.box(x - 1, P + 2, z, x + 1, P + 2, z, B.trim); w.set(x, P + 1, z + 1, B.bmoss);
      }
      landmarks.push({ name: '참회의 수도원 회랑', note: '참회하는 망령이 맴도는 안뜰', p: [WX + 0.5, P + 20, WZ + 0.5] });
      landmarks.push({ name: '고해실 첨탑', note: '밤마다 붉은 등이 켜진다', p: [KX + 0.5, kt + 8, KZ + 0.5] });
      acts.push({
        name: '참회의 우물', hint: '두레박이 우물 속으로 내려갔다 피를 가득 길어 올려요', hit: [WX - 3, P + 1, WZ - 3, WX + 3, P + 11, WZ + 3],
        run: async a => {
          await Promise.all([a.rope('wrope', 2, 9, 1.6), a.move('pail', [0, -7, 0], 1.6)]);
          a.flash('well', 8, 2.6);
          for (let k = 0; k < 3; k++) { a.burst([WX + 0.5, P - 0.5, WZ + 0.5], { n: 24, colors: ['#ff3e52', '#7c1420', '#c02a3a'], speed: 3, up: 4, life: 1, gravity: 7, spread: 0.8 }); await a.wait(0.35); }
          await Promise.all([a.rope('wrope', 2, 2, 2), a.move('pail', [0, 0, 0], 2)]);
          for (let k = 0; k < 4; k++) { a.burst([WX + 0.5, P + 5, WZ + 0.5], { n: 12, colors: ['#ff3e52', '#7c1420'], speed: 1, up: 0.5, life: 1, gravity: 8, spread: 0.3 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '피의 성배', hint: '제단의 금 성배에서 피가 넘쳐흘러 촛불이 붉게 타올라요', hit: [AX - 2, P + 1, AZ - 1, AX + 2, P + 7, AZ + 2],
        run: async a => {
          a.flash('chalice', 8, 3.4); a.glow(1.5, 3.4);
          for (let k = 0; k < 7; k++) {
            a.burst([AX + 0.5, P + 7, AZ + 0.5], { n: 22, colors: ['#ff3e52', '#c02a3a', '#ffb85a'], speed: 1.6, up: 3, life: 1.4, gravity: 5, spread: 0.6 });
            for (const s2 of [-2, 2]) a.burst([AX + s2 + 0.5, P + 6, AZ + 0.5], { n: 6, colors: ['#ff6a3a', '#ffe2a0'], speed: 0.6, up: 3, life: 0.8, gravity: -0.4, spread: 0.2 });
            await a.wait(0.4);
          }
          a.burst([AX + 0.5, P + 1.5, AZ + 2.5], { n: 40, colors: ['#7c1420', '#ff3e52'], speed: 3, up: 0.5, life: 1.6, gravity: 2, spread: 2, flat: true });
          await a.wait(0.8);
        },
      });
      acts.push({
        name: '회랑 철문', hint: '수도원 회랑의 녹슨 철문이 삐걱 열리며 참회하는 망령의 붉은 숨이 새어 나와요', hit: [CX1 - 1, P + 1, EZ - 3, CX1 + 1, P + 6, EZ + 3],
        run: async a => {
          await Promise.all([a.turn('cgateL', [0, 1.4, 0], 1.8), a.turn('cgateR', [0, -1.4, 0], 1.8)]);
          for (let k = 0; k < 5; k++) { a.burst([CX1 + 1.5, P + 3, EZ + 0.5], { n: 26, colors: ['#ff9aa0', '#c02a3a', '#4a1a24'], speed: 3, up: 2, life: 2.2, gravity: -0.3, spread: 1.5 }); await a.wait(0.4); }
          await a.wait(0.8);
          await Promise.all([a.turn('cgateL', [0, 0, 0], 1.5), a.turn('cgateR', [0, 0, 0], 1.5)]);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
