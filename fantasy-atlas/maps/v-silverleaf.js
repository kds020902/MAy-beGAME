// 은빛잎 마을 — 두 단의 고대 숲, 달빛 폭포와 연못, 거목 위 엘프 마을 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'silverleaf', cat: 'village', name: '은빛잎 마을', en: 'Silverleaf', color: '#7ad0a0', seed: 139, base: 22, time: 'night',
    desc: '천 년 된 거목 위에 지은 엘프 마을. 해가 지면 가지마다 등불이 켜지고 흔들다리가 노래한다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '숲 엘프 40여 명'], ['특산물', '은잎 활 · 이슬 포도주'], ['소문', '거목의 나이를 아는 이는 장로뿐']] },
    sky: ['#2c3c64', '#0e1630', '#8ad8c8'], stars: true,
    hemi: ['#c8f0e8', '#1a2a2a', 0.68], sun: ['#d0e8ff', 0.58, [0.45, 1, 0.5]],
    day: { sky: ['#d8f0e8', '#6aa8c0', '#f0ffe8'], stars: false, hemi: ['#f4fff8', '#3a4a3a', 0.6], sun: ['#fff8e0', 0.74, [0.45, 1, 0.5]], haze: '#b8d8d0' },
    liquid: ['#1a4a5a', '#3a8a9a', '#c8fff0'], liqSpeed: 0.8,
    fog: { start: 0.74, floor: 14, depth: 10, haze: [26, 0.28, 6], hazeColor: '#3e5e6e' },
    camY: 14,
    particles: [
      { n: 120, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], mode: 'wisp', speed: 0.7, size: 2, y0: 26 },
      { n: 130, colors: ['#a8d8b8', '#d8f0e0'], mode: 'drift', speed: 0.25, y0: 30, y1: 92, glow: false },
    ],
    blocks: {
      moss: { c: '#4a3a2e', top: '#4a7a4a', v: 0.1 }, moss2: { c: '#4a3a2e', top: '#5a8a52', v: 0.1 }, fern: { c: '#3a6a3a', v: 0.1 },
      dirt: { c: '#4a3a2e', v: 0.08 }, rock: { c: '#5a6a6a', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4646', v: 0.06, pat: 'stone' }, cliff: { c: '#6a7a78', v: 0.06, pat: 'big' },
      bark: { c: '#7a6a58', v: 0.07 }, barkDk: { c: '#54483c', v: 0.07 },
      leafS: { c: '#8ab8a0', v: 0.09 }, leafT: { c: '#5a9a88', v: 0.09 }, leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 },
      plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, rope: { c: '#c8b890', v: 0.04 }, hut: { c: '#dccca4', v: 0.04 }, hutRoof: { c: '#5a8a6a', v: 0.06, pat: 'tile' },
      door: { c: '#4a3a2e', v: 0.03, pat: 'plank' }, stoneW: { c: '#b0b8b0', v: 0.06 }, target: { c: '#e8e0d0', v: 0.03 }, targetR: { c: '#c04a3a', v: 0.03 },
      flower: { c: '#c8a0ff', v: 0.05 }, flower2: { c: '#ffffff', v: 0.03 },
      lamp: { c: '#9affd8', night: true, day: '#8ab0a0' }, lamp2: { c: '#ffe08a', night: true, day: '#c8b880' }, win: { c: '#ffe8a8', night: true, day: '#a8c8c0' },
      glowF: { c: '#b8f8ff', glow: true }, moon: { c: '#e0f8ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, UP = base + 14;
      const sX = z => 64 + Math.sin(z * 0.06) * 5;
      const EDGE = x => 58 + (n.fbm(x * 0.04, 7, 2) - 0.5) * 12;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => base + MH.sstep(EDGE(x) + 2, EDGE(x) - 1, z) * 14 + n.fbm(x * 0.05, z * 0.05) * 2.5 + n.ridge(x * 0.04, z * 0.04, 3) * 1.5,
        surface: (x, z, y, s) => s >= 3 ? B.cliff : n.fbm(x * 0.11, z * 0.11 + 5, 2) > 0.55 ? B.moss2 : B.moss,
        under: (x, z, y, dep, s) => dep < 2 && s < 3 ? B.dirt : (y % 4 === 0 ? B.rockDk : B.rock),
      });
      const upPts = []; for (let z = -4; z <= 58; z += 4) upPts.push([sX(z), z]);
      MH.river(w, upPts, 3, UP + 1, B.rockDk, null);
      const PX = 64, PZ = 76;
      for (let z = 56; z < 96; z++) for (let x = 44; x < 86; x++) {
        const d = MH.dist(x, z, PX, PZ) + (n.vn(x * 0.25, z * 0.25) - 0.5) * 4;
        if (d > 12 || MH.g(w, x, z) > UP - 3) continue;
        MH.setH(w, x, z, base - 3, B.rockDk, B.rock);
        for (let y = base - 2; y <= base + 1; y++) w.set(x, y, z, 0);
        w.liquid(x, z, base + 1);
      }
      const dnPts = []; for (let z = 84; z <= 132; z += 4) dnPts.push([sX(z) + 3, z]);
      MH.river(w, dnPts, 2.8, base + 1, B.rockDk, null);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const lights = [], acts = [], landmarks = [];
      // 폭포 아래 달돌(연못 가운데 바위 위)
      w.box(PX - 1, base - 2, PZ + 3, PX + 1, base + 2, PZ + 5, B.rock); w.box(PX, base + 3, PZ + 4, PX, base + 5, PZ + 4, B.moon);
      for (let dz = 3; dz <= 5; dz++) for (let dx = -1; dx <= 1; dx++) w.liquid(PX + dx, PZ + dz, -1);
      lights.push({ name: 'lamp', p: [PX + 0.5, base + 6, PZ + 4.5], c: '#9af0ff', i: 1.1, d: 20, flicker: 0.05 });
      landmarks.push({ name: '달빛 폭포', note: '윗숲에서 떨어지는 은빛 물줄기', p: [PX + 0.5, UP + 9, 60.5] });

      // ── 거목과 발판, 오두막, 나선 계단 ──
      const trees = [[38, 32, 42, 4.8], [98, 28, 36, 4.2], [26, 94, 36, 4.4], [100, 88, 38, 4.6]];
      const plats = [];
      trees.forEach(([tx, tz, h, r], ti) => {
        const g = MH.g(w, tx, tz) + 1;
        MH.tree(w, tx, g, tz, { kind: 'giant', h, trunkR: r, bark: B.bark, barkDk: B.barkDk, leaves: [B.leafW, B.leafS, B.leafD, B.leafT], r: 9, spread: 12, branches: 6 });
        [Math.round(g + h * 0.36), Math.round(g + h * 0.64)].forEach((py, li) => {
          const pr = r + 6 - li;
          for (let dz = -Math.ceil(pr); dz <= Math.ceil(pr); dz++) for (let dx = -Math.ceil(pr); dx <= Math.ceil(pr); dx++) {
            const d = Math.hypot(dx, dz);
            if (d > pr) continue;
            w.fill(tx + dx, py, tz + dz, B.plank);
            if (d > pr - 0.9 && (dx + dz) % 2 === 0) { w.fill(tx + dx, py + 1, tz + dz, B.rope); w.fill(tx + dx, py + 2, tz + dz, B.rope); }
            if (d > pr - 2 && d <= pr - 1 && hash3(tx + dx, py, tz + dz) > 0.6) w.fill(tx + dx, py - 1, tz + dz, B.barkDk);
          }
          const a = ti * 2.1 + li * 2.6, hx = Math.round(tx + Math.cos(a) * (r + 3)), hz = Math.round(tz + Math.sin(a) * (r + 3));
          w.cyl(hx, hz, py + 1, py + 5, 2.6, B.hut);
          for (let k = 0; k < 4; k++) { const aa = a + 0.8 + k * 1.57; w.box(Math.round(hx + Math.cos(aa) * 2.4), py + 3, Math.round(hz + Math.sin(aa) * 2.4), Math.round(hx + Math.cos(aa) * 2.4), py + 4, Math.round(hz + Math.sin(aa) * 2.4), B.win); }
          const ddx = Math.round(hx + Math.cos(a) * 2.6), ddz = Math.round(hz + Math.sin(a) * 2.6);
          w.box(ddx, py + 1, ddz, ddx, py + 3, ddz, B.door);
          const rt = MH.cone(w, hx, hz, py + 6, 4, B.hutRoof, 0.5, B.leafD);
          w.set(hx, rt, hz, B.lamp);
          for (let k = 0; k < 4; k++) {
            const aa = a + 1.2 + k * 1.4, lx = Math.round(tx + Math.cos(aa) * (pr - 0.5)), lz = Math.round(tz + Math.sin(aa) * (pr - 0.5));
            w.set(lx, py - 1, lz, B.rope); w.set(lx, py - 2, lz, li ? B.lamp2 : B.lamp);
            if (k === 0) lights.push({ name: 'lamp', p: [lx + 0.5, py - 2, lz + 0.5], c: li ? '#ffd880' : '#8affd0', i: 1, d: 15, flicker: 0.1, night: true });
          }
          plats.push({ tx, tz, py, pr, g, r });
        });
        const top = Math.round(g + h * 0.36);
        for (let i = 0; i < (top - g) * 2; i++) {
          const a = i * 0.28 + ti, y = g + Math.floor(i / 2);
          for (const rr of [r + 1.2, r + 2.2]) w.fill(Math.round(tx + Math.cos(a) * rr), y, Math.round(tz + Math.sin(a) * rr), B.plank);
          if (i % 4 === 0) w.fill(Math.round(tx + Math.cos(a) * (r + 3)), y + 1, Math.round(tz + Math.sin(a) * (r + 3)), B.rope);
        }
      });
      // 흔들다리: 발판 가장자리 바깥에서 시작해 겹치지 않게
      const bridge = (p, a, b, sag) => {
        const nn = Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2]) * 2), dx = b[0] - a[0], dz = b[2] - a[2], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len;
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[2] + dz * t, y = Math.round(a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag);
          for (const k of [-1, 0, 1]) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); if (!w.get(bx, y, bz)) p.set(bx, y, bz, B.plank); }
          for (const k of [-2, 2]) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); if (!w.get(bx, y + 2, bz)) p.set(bx, y + 2, bz, B.rope); if (i % 3 === 0 && !w.get(bx, y + 1, bz)) p.set(bx, y + 1, bz, B.rope); }
          if (i % 6 === 3 && !w.get(Math.round(x), y - 1, Math.round(z))) p.set(Math.round(x), y - 1, Math.round(z), B.lamp2);
        }
        return [a[0] + dx / 2, (a[1] + b[1]) / 2 - sag, a[2] + dz / 2];
      };
      const edge = (p, q) => { const dx = q.tx - p.tx, dz = q.tz - p.tz, d = Math.hypot(dx, dz); return [[p.tx + dx / d * (p.pr + 1), p.py, p.tz + dz / d * (p.pr + 1)], [q.tx - dx / d * (q.pr + 1), q.py, q.tz - dz / d * (q.pr + 1)]]; };
      const [a1, b1] = edge(plats[1], plats[3]);
      const sway = w.prop({ name: 'sway', pivot: [(a1[0] + b1[0]) / 2, Math.max(a1[1], b1[1]) + 2, (a1[2] + b1[2]) / 2], axis: Math.abs(b1[0] - a1[0]) > Math.abs(b1[2] - a1[2]) ? 'x' : 'z', rock: 0.03, rockSpeed: 1.4, clipOK: 6 });
      const midS = bridge(sway, a1, b1, 4);
      const [a2, b2] = edge(plats[5], plats[7]); bridge(w, a2, b2, 4);
      const [a3, b3] = edge(plats[4], plats[6]); bridge(w, a3, b3, 3);
      const [a4, b4] = edge(plats[0], plats[4]); bridge(w, a4, b4, 3);
      acts.push({
        name: '흔들다리', hint: '거목 사이 다리가 크게 출렁여요', hit: [Math.round(midS[0]) - 4, Math.round(midS[1]) - 1, Math.round(midS[2]) - 4, Math.round(midS[0]) + 4, Math.round(midS[1]) + 4, Math.round(midS[2]) + 4],
        run: async a => { await a.spin('sway', 7, 3.2); },
      });
      landmarks.push({ name: '흔들다리', note: '윗숲 거목을 잇는 밧줄 다리', p: [midS[0], midS[1] + 8, midS[2]] });
      landmarks.push({ name: '장로의 거목', note: '가장 오래된 나무 위의 회의장', p: [38.5, plats[1].py + 26, 32.5], tag: 'ELDER' });
      // 승강 바구니(아래 서쪽 거목): 가지에서 내려온 밧줄이 줄어든다
      const T = plats[4], bx = T.tx, bzz = T.tz + Math.round(T.pr) + 3, bg = MH.g(w, bx, bzz) + 1, beamY = T.py + 8;
      MH.flatten(w, bx - 2, bzz - 2, bx + 2, bzz + 2, bg - 1, B.moss2, B.dirt);
      w.line(T.tx, beamY, T.tz + 2, bx, beamY, bzz, B.bark, 0.6); w.set(bx, beamY - 1, bzz, B.barkDk);
      const bTop = bg + 4, rLen = beamY - 1 - bTop;
      MH.rope(w, 'brope', bx, beamY - 2, bzz, rLen - 1, B.rope);
      const basket = w.prop({ name: 'basket', pivot: [bx + 0.5, bg, bzz + 0.5] });
      basket.box(bx - 1, bg, bzz - 1, bx + 1, bg, bzz + 1, B.plank); basket.walls(bx - 1, bg + 1, bzz - 1, bx + 1, bg + 2, bzz + 1, B.hut);
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) basket.box(bx + dx, bg + 3, bzz + dz, bx + dx, bTop - 1, bzz + dz, B.rope);
      basket.box(bx - 1, bTop, bzz - 1, bx + 1, bTop, bzz + 1, B.rope); basket.set(bx, bg + 1, bzz, B.lamp2);
      acts.push({
        name: '승강 바구니', hint: '밧줄이 감기며 바구니가 발판까지 올라가요', hit: [bx - 1, bg, bzz - 1, bx + 1, bTop, bzz + 1],
        run: async a => {
          const up = T.py + 1 - bg;
          await Promise.all([a.move('basket', [0, up, 0], 3.6, t => t), a.rope('brope', rLen - 1, rLen - 1 - up, 3.6, t => t)]);
          await a.wait(1);
          await Promise.all([a.move('basket', [0, 0, 0], 3.2, t => t), a.rope('brope', rLen - 1, rLen - 1, 3.2, t => t)]);
        },
      });
      // ── 달맞이 돌 제단(연못 남서쪽) ──
      const MXX = 46, MZZ = 98, mg = MH.g(w, MXX, MZZ);
      MH.flatten(w, MXX - 8, MZZ - 8, MXX + 8, MZZ + 8, mg, B.moss2, B.dirt);
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, x = Math.round(MXX + Math.cos(a) * 7), z = Math.round(MZZ + Math.sin(a) * 7); w.box(x, mg + 1, z, x, mg + 4 + (k % 2) * 3, z, B.stoneW); if (k % 2) w.set(x, mg + 8, z, B.lamp); }
      MH.circle(w, MXX, MZZ, 4, B.stoneW);
      w.box(MXX - 1, mg + 1, MZZ - 1, MXX + 1, mg + 2, MZZ + 1, B.stoneW); w.box(MXX, mg + 3, MZZ, MXX, mg + 4, MZZ, B.moon);
      lights.push({ name: 'lamp', p: [MXX + 0.5, mg + 5, MZZ + 0.5], c: '#e0f8ff', i: 1, d: 14, flicker: 0.05 });
      acts.push({
        name: '등불 점등', hint: '숲 전체의 등불이 밝아지고 반딧불이 날아올라요', hit: [MXX - 2, mg + 1, MZZ - 2, MXX + 2, mg + 5, MZZ + 2],
        run: async a => {
          a.flash('lamp', 3, 4.4); a.glow(1.7, 4.4);
          for (let k = 0; k < 6; k++) a.burst([MXX + 0.5 + Math.cos(k * 1.05) * 5, mg + 2, MZZ + 0.5 + Math.sin(k * 1.05) * 5], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 1.4, up: 2.4, life: 3.2, gravity: -0.35, spread: 1.5 });
          // 반딧불은 줄기 속이 아니라 발판 바깥 둘레에서 솟는다
          for (const p of plats) { for (let k = 0; k < 3; k++) { const ang = k * 2.1 + p.py * 0.3; a.burst([p.tx + 0.5 + Math.cos(ang) * (p.pr + 0.8), p.py + 1, p.tz + 0.5 + Math.sin(ang) * (p.pr + 0.8)], { n: 10, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 1.6, up: 2, life: 3, gravity: -0.3, spread: 1.6 }); } await a.wait(0.25); }
        },
      });
      landmarks.push({ name: '달맞이 제단', note: '선돌이 둘러싼 은빛 돌', p: [MXX + 0.5, mg + 13, MZZ + 0.5] });
      // ── 활터(동쪽) ──
      for (const [tx, tz] of [[118, 54], [118, 62], [117, 70]]) {
        const g = MH.g(w, tx, tz);
        w.box(tx, g + 1, tz, tx, g + 4, tz, B.barkDk);
        for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const d = Math.hypot(dy, dz); if (d <= 3.2) w.set(tx, g + 8 + dy, tz + dz, d < 1 ? B.targetR : d < 2.2 ? B.target : B.targetR); }
      }
      landmarks.push({ name: '활터', note: '은잎 활 시험장', p: [117.5, UP + 4, 62.5] });
      // ── 바위, 작은 나무, 고사리, 꽃 ──
      const clearOf = (x, z) => trees.every(([tx, tz, h, r]) => MH.dist(x, z, tx, tz) > r + 9) && MH.dist(x, z, MXX, MZZ) > 10 && MH.dist(x, z, bx, bzz) > 4;
      for (let i = 0; i < 30; i++) { const x = w.ri(4, 123), z = w.ri(4, 123), g = MH.g(w, x, z); if (g > base && !wet(x, z) && !w.get(x, g + 1, z) && clearOf(x, z)) MH.rock(w, x, g, z, w.r(1.5, 3.4), B.rock, B.moss2, B.rockDk); }
      for (let i = 0; i < 26; i++) { const x = w.ri(4, 123), z = w.ri(4, 123), g = MH.g(w, x, z); if (g > base && !wet(x, z) && !w.get(x, g + 1, z) && clearOf(x, z)) MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(8, 13), bark: B.bark, leaves: [B.leafW, B.leafS, B.leafD], r: 3.8 }); }
      MH.scatter(w, 2000, (x, g, z, b) => { if (w.chance(0.3) && MH.dist(x, z, bx, bzz) > 3) w.set(x, g + 1, z, w.chance(0.6) ? B.fern : w.chance(0.3) ? B.glowF : w.pick([B.flower, B.flower2])); });
      // ── 땅 위의 길: 윗숲 개울을 건너는 나무다리, 폭포 옆 절벽을 내려가는 돌계단 ──
      const bzc = 26, bxc = Math.round(sX(bzc));
      MH.bridge(w, [bxc - 7, bzc], [bxc + 7, bzc], UP + 2, { m: { deck: B.plank, parapet: B.barkDk }, width: 3, rise: 1 });
      const cTop = MH.g(w, 44, 56), cBot = MH.g(w, 44, 73);
      MH.flight(w, { name: '절벽 돌계단', axis: 'z', c: 44, half: 2, a: 57, b: 72, ha: cTop, hb: cBot, step: B.stoneW, edge: B.rockDk, fill: B.rock, rail: B.plank, post: B.barkDk, postGap: 5,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.lamp); if (k === 5 && x > 44) lights.push({ p: [x + 0.5, y + 0.5, z + 0.5], c: '#8affd0', i: 0.8, d: 12, flicker: 0.1, night: true }); } });
      return { lights, landmarks, acts };
    },
  });
})();
