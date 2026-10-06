// 은빛잎 마을 — 두 단의 고대 숲, 달빛 폭포와 연못, 거목 위 엘프 마을, 동남쪽 이슬 포도원과 언덕 술 창고 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 128;
  MAPS.push({
    id: 'silverleaf', cat: 'village', name: '은빛잎 마을', en: 'Silverleaf', color: '#7ad0a0', seed: 139, base: 22, time: 'night', size: [W, D, Hh],
    desc: '천 년 된 거목 위에 지은 엘프 마을. 해가 지면 가지마다 등불이 켜지고 흔들다리가 노래한다. 동남쪽 이슬 포도원에서는 밤마다 포도알이 은빛으로 빛나고, 언덕 속 달샘 술 창고에서 이슬 포도주가 익어 간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '숲 엘프 40여 명'], ['특산물', '은잎 활 · 이슬 포도주'], ['명소', '달빛 폭포 · 이슬 포도원 · 달샘 술 창고'], ['소문', '거목의 나이를 아는 이는 장로뿐']] },
    sky: ['#2c3c64', '#0e1630', '#8ad8c8'], stars: true,
    hemi: ['#c8f0e8', '#1a2a2a', 0.68], sun: ['#d0e8ff', 0.58, [0.45, 1, 0.5]],
    day: { sky: ['#d8f0e8', '#6aa8c0', '#f0ffe8'], stars: false, hemi: ['#f4fff8', '#3a4a3a', 0.6], sun: ['#fff8e0', 0.74, [0.45, 1, 0.5]], haze: '#b8d8d0' },
    liquid: ['#1a4a5a', '#3a8a9a', '#c8fff0'], liqSpeed: 0.8,
    fog: { box: [86, 86, 88, 88], start: 0.78, floor: 14, depth: 10, haze: [30, 0.26, 6], hazeColor: '#3e5e6e' },
    camY: -10, zoom: 1.0,
    particles: [
      { n: 170, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], mode: 'wisp', speed: 0.7, size: 2, y0: 26 },
      { n: 170, colors: ['#a8d8b8', '#d8f0e0'], mode: 'drift', speed: 0.25, y0: 30, y1: 104, glow: false },
    ],
    blocks: {
      moss: { c: '#4a3a2e', top: '#4a7a4a', v: 0.1 }, moss2: { c: '#4a3a2e', top: '#5a8a52', v: 0.1 }, fern: { c: '#3a6a3a', v: 0.1 },
      dirt: { c: '#4a3a2e', v: 0.08 }, rock: { c: '#5a6a6a', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4646', v: 0.06, pat: 'stone' }, cliff: { c: '#6a7a78', v: 0.06, pat: 'big' },
      bark: { c: '#7a6a58', v: 0.07 }, barkDk: { c: '#54483c', v: 0.07 },
      leafS: { c: '#8ab8a0', v: 0.09 }, leafT: { c: '#5a9a88', v: 0.09 }, leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 },
      plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, rope: { c: '#c8b890', v: 0.04 }, hut: { c: '#dccca4', v: 0.04 }, hutRoof: { c: '#5a8a6a', v: 0.06, pat: 'tile' },
      door: { c: '#4a3a2e', v: 0.03, pat: 'plank' }, stoneW: { c: '#b0b8b0', v: 0.06 }, target: { c: '#e8e0d0', v: 0.03 }, targetR: { c: '#c04a3a', v: 0.03 },
      flower: { c: '#c8a0ff', v: 0.05 }, flower2: { c: '#ffffff', v: 0.03 },
      pathS: { c: '#4a3a2e', top: '#8a948c', v: 0.08, pat: 'stone' }, vsoil: { c: '#4a3a2e', top: '#5a4632', v: 0.08 },
      mush: { c: '#d8d0c0', top: '#c04a4a', v: 0.05 }, mushG: { c: '#9ae8f0', glow: true },
      barrel: { c: '#8a6a44', v: 0.06, pat: 'log' }, hoop: { c: '#3a3a3e', v: 0.03 },
      grape: { c: '#b890ff', night: true, day: '#6a4aa8' },
      lamp: { c: '#9affd8', night: true, day: '#8ab0a0' }, lamp2: { c: '#ffe08a', night: true, day: '#c8b880' }, win: { c: '#ffe8a8', night: true, day: '#a8c8c0' },
      glowF: { c: '#b8f8ff', glow: true }, moon: { c: '#e0f8ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, UP = base + 14;
      const sX = z => 84 + Math.sin(z * 0.046) * 6.5;
      const EDGE = x => 76 + (n.fbm(x * 0.03, 7, 2) - 0.5) * 15;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => base + MH.sstep(EDGE(x) + 2, EDGE(x) - 1, z) * 14 + n.fbm(x * 0.038, z * 0.038) * 2.5 + n.ridge(x * 0.03, z * 0.03, 3) * 1.5,
        surface: (x, z, y, s) => s >= 3 ? B.cliff : n.fbm(x * 0.085, z * 0.085 + 5, 2) > 0.55 ? B.moss2 : B.moss,
        under: (x, z, y, dep, s) => dep < 2 && s < 3 ? B.dirt : (y % 4 === 0 ? B.rockDk : B.rock),
      });
      const upPts = []; for (let z = -4; z <= 76; z += 4) upPts.push([sX(z), z]);
      MH.river(w, upPts, 3.5, UP + 1, B.rockDk, null);
      const PX = 84, PZ = 100;
      for (let z = 74; z < 127; z++) for (let x = 58; x < 112; x++) {
        const d = MH.dist(x, z, PX, PZ) + (n.vn(x * 0.19, z * 0.19) - 0.5) * 4;
        if (d > 15.5 || MH.g(w, x, z) > UP - 3) continue;
        MH.setH(w, x, z, base - 3, B.rockDk, B.rock);
        for (let y = base - 2; y <= base + 1; y++) w.set(x, y, z, 0);
        w.liquid(x, z, base + 1);
      }
      const dnPts = []; for (let z = 110; z <= 172; z += 4) dnPts.push([sX(z) + 4, z]);
      MH.river(w, dnPts, 3.2, base + 1, B.rockDk, null);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const lights = [], acts = [], landmarks = [];
      // 폭포 아래 달돌(연못 가운데 바위 위)
      w.box(PX - 1, base - 2, PZ + 4, PX + 1, base + 2, PZ + 6, B.rock); w.box(PX, base + 3, PZ + 5, PX, base + 5, PZ + 5, B.moon);
      w.set(PX - 1, base + 3, PZ + 5, B.leafW); w.set(PX + 1, base + 3, PZ + 4, B.fern); w.set(PX, base + 6, PZ + 5, B.leafW);
      for (let dz = 4; dz <= 6; dz++) for (let dx = -1; dx <= 1; dx++) w.liquid(PX + dx, PZ + dz, -1);
      lights.push({ name: 'lamp', p: [PX + 0.5, base + 7, PZ + 5.5], c: '#9af0ff', i: 1.1, d: 22, flicker: 0.05 });
      landmarks.push({ name: '달빛 폭포', note: '윗숲에서 떨어지는 은빛 물줄기', p: [PX + 0.5, UP + 10, 79.5] });
      // 연못 징검돌(남서쪽 물가)
      for (const [x, z] of [[73, 111], [75, 113], [77, 115], [79, 116]]) if (wet(x, z)) { w.box(x, base, z, x + 1, base + 1, z, B.stoneW); w.liquid(x, z, -1); w.liquid(x + 1, z, -1); }

      // ── 거목과 발판, 오두막, 나선 계단 ──
      const trees = [[50, 42, 48, 5.4], [129, 37, 42, 4.8], [34, 123, 42, 5], [131, 115, 44, 5.2]];
      const plats = [];
      trees.forEach(([tx, tz, h, r], ti) => {
        const g = MH.g(w, tx, tz) + 1;
        MH.tree(w, tx, g, tz, { kind: 'giant', h, trunkR: r, bark: B.bark, barkDk: B.barkDk, leaves: [B.leafW, B.leafS, B.leafD, B.leafT], r: 10.5, spread: 14, branches: 6 });
        // 뿌리 둘레 이끼 바위와 버섯
        for (let k = 0; k < 7; k++) { const a = k * 0.9 + ti, x = Math.round(tx + Math.cos(a) * (r + 2)), z = Math.round(tz + Math.sin(a) * (r + 2)), gg = MH.g(w, x, z); if (!w.get(x, gg + 1, z) && !wet(x, z)) w.set(x, gg + 1, z, k % 3 ? B.mush : B.mushG); }
        [Math.round(g + h * 0.36), Math.round(g + h * 0.64)].forEach((py, li) => {
          const pr = r + 8 - li * 1.5, R = Math.ceil(pr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz);
            if (d > pr) continue;
            w.fill(tx + dx, py, tz + dz, B.plank);
            if (d > pr - 0.9) {
              // 기둥 사이로 밧줄 난간
              const post = Math.round((Math.atan2(dz, dx) + Math.PI) * pr / 3) % 2 === 0 && hash3(tx + dx, py, tz + dz) > 0.55;
              w.fill(tx + dx, py + 2, tz + dz, post ? B.barkDk : B.rope);
              if (post) { w.fill(tx + dx, py + 1, tz + dz, B.barkDk); w.fill(tx + dx, py + 3, tz + dz, B.leafW); }
            } else if (d > pr - 1.9) w.fill(tx + dx, py - 1, tz + dz, B.barkDk);
          }
          // 발판 밑 버팀대
          for (let k = 0; k < 6; k++) { const aa = k * 1.047 + li * 0.5; w.line(tx + Math.cos(aa) * r, py - 7, tz + Math.sin(aa) * r, tx + Math.cos(aa) * (pr - 1.5), py - 1, tz + Math.sin(aa) * (pr - 1.5), B.barkDk, 0.5); }
          const hr = li ? 2.7 : 3.2, a = ti * 2.1 + li * 2.6, hx = Math.round(tx + Math.cos(a) * (r + 1.4 + hr)), hz = Math.round(tz + Math.sin(a) * (r + 1.4 + hr));
          w.cyl(hx, hz, py + 1, py + 6, hr, B.hut);
          w.ring(hx, hz, py + 1, hr - 0.9, hr + 0.4, B.barkDk); w.ring(hx, hz, py + 6, hr - 0.9, hr + 0.4, B.barkDk);
          for (let k = 0; k < 4; k++) {
            const aa = a + 0.8 + k * 1.57, wx = Math.round(hx + Math.cos(aa) * hr), wz = Math.round(hz + Math.sin(aa) * hr);
            w.box(wx, py + 3, wz, wx, py + 4, wz, B.win); w.set(wx, py + 5, wz, B.barkDk);
            const sx = Math.round(hx + Math.cos(aa) * (hr + 1)), sz = Math.round(hz + Math.sin(aa) * (hr + 1));
            if (!w.get(sx, py + 2, sz)) { w.set(sx, py + 2, sz, B.plank); if (k % 2) w.set(sx, py + 3, sz, B.flower); }
          }
          const ddx = Math.round(hx + Math.cos(a) * hr), ddz = Math.round(hz + Math.sin(a) * hr);
          w.box(ddx, py + 1, ddz, ddx, py + 3, ddz, B.door); w.set(ddx, py + 4, ddz, B.barkDk);
          const lx0 = Math.round(hx + Math.cos(a + 0.5) * (hr + 0.6)), lz0 = Math.round(hz + Math.sin(a + 0.5) * (hr + 0.6));
          if (!w.get(lx0, py + 4, lz0)) w.set(lx0, py + 4, lz0, B.lamp2);
          const rt = MH.cone(w, hx, hz, py + 7, hr + 1.4, B.hutRoof, 0.5, B.leafD);
          w.set(hx, rt, hz, B.barkDk); w.set(hx, rt + 1, hz, B.lamp);
          for (let k = 0; k < 4; k++) {
            const aa = a + 1.2 + k * 1.4, lx = Math.round(tx + Math.cos(aa) * (pr - 0.5)), lz = Math.round(tz + Math.sin(aa) * (pr - 0.5));
            w.set(lx, py - 1, lz, B.rope); w.set(lx, py - 2, lz, li ? B.lamp2 : B.lamp);
            if (k === 0) lights.push({ name: 'lamp', p: [lx + 0.5, py - 2, lz + 0.5], c: li ? '#ffd880' : '#8affd0', i: 1, d: 16, flicker: 0.1 });
          }
          plats.push({ tx, tz, py, pr, g, r });
        });
        const top = Math.round(g + h * 0.36);
        for (let i = 0; i < (top - g) * 2; i++) {
          const a = i * 0.25 + ti, y = g + Math.floor(i / 2);
          for (const rr of [r + 1.2, r + 2.2]) w.fill(Math.round(tx + Math.cos(a) * rr), y, Math.round(tz + Math.sin(a) * rr), B.plank);
          if (i % 4 === 0) { w.fill(Math.round(tx + Math.cos(a) * (r + 3)), y + 1, Math.round(tz + Math.sin(a) * (r + 3)), B.rope); w.fill(Math.round(tx + Math.cos(a) * (r + 3)), y + 2, Math.round(tz + Math.sin(a) * (r + 3)), B.rope); }
          if (i % 16 === 8) w.fill(Math.round(tx + Math.cos(a) * (r + 3)), y + 3, Math.round(tz + Math.sin(a) * (r + 3)), B.lamp2);
        }
      });
      // 흔들다리: 발판 가장자리 바깥에서 시작해 겹치지 않게
      const bridge = (p, a, b, sag) => {
        const nn = Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2]) * 2), dx = b[0] - a[0], dz = b[2] - a[2], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len;
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[2] + dz * t, y = Math.round(a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag);
          for (const k of [-1, 0, 1]) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); if (!w.get(bx, y, bz)) p.set(bx, y, bz, i % 4 === 0 ? B.bark : B.plank); }
          for (const k of [-2, 2]) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); if (!w.get(bx, y + 2, bz)) p.set(bx, y + 2, bz, B.rope); if (i % 3 === 0 && !w.get(bx, y + 1, bz)) p.set(bx, y + 1, bz, B.rope); }
          if (i % 6 === 3 && !w.get(Math.round(x), y - 1, Math.round(z))) p.set(Math.round(x), y - 1, Math.round(z), B.lamp2);
        }
        return [a[0] + dx / 2, (a[1] + b[1]) / 2 - sag, a[2] + dz / 2];
      };
      const edge = (p, q) => { const dx = q.tx - p.tx, dz = q.tz - p.tz, d = Math.hypot(dx, dz); return [[p.tx + dx / d * (p.pr + 1), p.py, p.tz + dz / d * (p.pr + 1)], [q.tx - dx / d * (q.pr + 1), q.py, q.tz - dz / d * (q.pr + 1)]]; };
      const [a1, b1] = edge(plats[1], plats[3]);
      const sway = w.prop({ name: 'sway', pivot: [(a1[0] + b1[0]) / 2, Math.max(a1[1], b1[1]) + 2, (a1[2] + b1[2]) / 2], axis: Math.abs(b1[0] - a1[0]) > Math.abs(b1[2] - a1[2]) ? 'x' : 'z', rock: 0.03, rockSpeed: 1.4, clipOK: 8 });
      const midS = bridge(sway, a1, b1, 5);
      const [a2, b2] = edge(plats[5], plats[7]); bridge(w, a2, b2, 5);
      const [a3, b3] = edge(plats[4], plats[6]); bridge(w, a3, b3, 4);
      const [a4, b4] = edge(plats[0], plats[4]); bridge(w, a4, b4, 4);
      acts.push({
        name: '흔들다리', hint: '거목 사이 다리가 크게 출렁여요', hit: [Math.round(midS[0]) - 5, Math.round(midS[1]) - 1, Math.round(midS[2]) - 5, Math.round(midS[0]) + 5, Math.round(midS[1]) + 4, Math.round(midS[2]) + 5],
        run: async a => { await a.spin('sway', 7, 3.2); },
      });
      landmarks.push({ name: '흔들다리', note: '윗숲 거목을 잇는 밧줄 다리', p: [midS[0], midS[1] + 9, midS[2]] });
      landmarks.push({ name: '장로의 거목', note: '가장 오래된 나무 위의 회의장', p: [50.5, plats[1].py + 30, 42.5], tag: 'ELDER' });
      // 장로의 거목 회의장 입구: 아랫단 오두막 동쪽 문 앞 작은 현관 발판(밧줄 난간), 문에 들어가는 상호작용
      {
        const E = plats[0], hr = 3.2, ehx = Math.round(E.tx + E.r + 1.4 + hr), edx = Math.round(ehx + hr), edz = E.tz, ey = E.py;
        for (let z = edz - 4; z <= edz + 4; z++) for (let x = edx - 1; x <= edx + 3; x++) {
          if (Math.hypot(x - ehx, z - edz) < hr + 0.3) continue;
          for (let y = ey + 1; y <= ey + 3; y++) { const b = w.get(x, y, z); if (b === B.rope || b === B.leafW || (b === B.barkDk && y > ey + 1)) w.set(x, y, z, 0); }
          if (x > edx) { w.set(x, ey, z, B.plank); if (x === edx + 3 || Math.abs(z - edz) === 4) { const post = (x === edx + 3 && Math.abs(z - edz) % 4 === 0) || (Math.abs(z - edz) === 4 && x === edx + 3); w.set(x, ey + 2, z, post ? B.barkDk : B.rope); if (post) { w.set(x, ey + 1, z, B.barkDk); w.set(x, ey + 3, z, B.lamp2); } } }
          if (x > edx) w.set(x, ey - 1, z, B.barkDk);
        }
        w.line(edx + 3, ey - 1, edz, E.tx + E.r, ey - 6, edz, B.barkDk, 0.5);
        w.set(edx, ey + 4, edz, B.lamp2);
        acts.push({ name: '장로의 거목 회의장 안으로', hint: '오두막 문을 열고 거목 줄기 속 둥근 회의장으로 들어가요', goto: 'silverleaf-elder', hit: [edx, ey + 1, edz, edx, ey + 3, edz],
          run: async a => {
            a.burst([edx + 0.5, ey + 3, edz + 0.5], { n: 30, colors: ['#ffe9a0', '#ffffff', '#9affd8'], speed: 2, up: 2, life: 1, gravity: -0.4, spread: 1.4 });
            // 반딧불이 거목 둘레를 감아 꼭대기까지 솟으며 장로에게 손님을 알린다
            for (let k = 0; k < 10; k++) { const t = k * 0.7, rr = 19 + k * 0.4; a.burst([E.tx + 0.5 + Math.cos(t) * rr, ey + 6 + k * 4, E.tz + 0.5 + Math.sin(t) * rr], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 1.2, up: 2, life: 1.6, gravity: -0.4, spread: 1.2 }); await a.wait(0.08); }
            await a.wait(0.4);
          } });
      }
      // 승강 바구니(아래 서쪽 거목): 가지에서 내려온 밧줄이 줄어든다
      const T = plats[4], bx = T.tx, bzz = T.tz + Math.round(T.pr) + 3, bg = MH.g(w, bx, bzz) + 1, beamY = T.py + 8;
      MH.flatten(w, bx - 3, bzz - 2, bx + 3, bzz + 3, bg - 1, B.pathS, B.dirt);
      w.line(T.tx, beamY, T.tz + 2, bx, beamY, bzz, B.bark, 0.6); w.set(bx, beamY - 1, bzz, B.barkDk);
      const bTop = bg + 4, rLen = beamY - 1 - bTop;
      MH.rope(w, 'brope', bx, beamY - 2, bzz, rLen - 1, B.rope);
      const basket = w.prop({ name: 'basket', pivot: [bx + 0.5, bg, bzz + 0.5] });
      basket.box(bx - 1, bg, bzz - 1, bx + 1, bg, bzz + 1, B.plank); basket.walls(bx - 1, bg + 1, bzz - 1, bx + 1, bg + 2, bzz + 1, B.hut);
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) basket.box(bx + dx, bg + 3, bzz + dz, bx + dx, bTop - 1, bzz + dz, B.rope);
      basket.box(bx - 1, bTop, bzz - 1, bx + 1, bTop, bzz + 1, B.rope); basket.set(bx, bg + 1, bzz, B.lamp2);
      // 바구니 곁 짐 상자
      w.box(bx + 3, bg, bzz + 1, bx + 3, bg + 1, bzz + 2, B.barrel); w.set(bx + 3, bg + 2, bzz + 1, B.flower);
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
      const MXX = 60, MZZ = 129, mg = MH.g(w, MXX, MZZ);
      const fieldL = [[97, 118], [96, 136], [103, 140], [110, 132], [106, 122], [114, 141]];
      MH.flatten(w, MXX - 10, MZZ - 10, MXX + 10, MZZ + 10, mg, B.moss2, B.dirt);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, x = Math.round(MXX + Math.cos(a) * 8.5), z = Math.round(MZZ + Math.sin(a) * 8.5); w.box(x, mg + 1, z, x, mg + 4 + (k % 2) * 3, z, B.stoneW); w.set(x, mg + 1, z, B.rock); if (k % 2) { w.set(x, mg + 8, z, B.lamp); } else w.set(x, mg + 5, z, B.leafW); }
      MH.circle(w, MXX, MZZ, 5, B.pathS, 2); MH.circle(w, MXX, MZZ, 3, B.stoneW);
      w.box(MXX - 1, mg + 1, MZZ - 1, MXX + 1, mg + 1, MZZ + 1, B.rock); w.box(MXX - 1, mg + 2, MZZ - 1, MXX + 1, mg + 2, MZZ + 1, B.stoneW); w.box(MXX, mg + 3, MZZ, MXX, mg + 4, MZZ, B.moon);
      for (const [dx, dz] of [[-2, 0], [2, 0], [0, -2], [0, 2]]) w.set(MXX + dx, mg + 1, MZZ + dz, B.flower2);
      lights.push({ name: 'lamp', p: [MXX + 0.5, mg + 5, MZZ + 0.5], c: '#e0f8ff', i: 1, d: 16, flicker: 0.05 });
      acts.push({
        name: '등불 점등', hint: '숲 전체의 등불이 밝아지고 반딧불이 날아올라요', hit: [MXX - 2, mg + 1, MZZ - 2, MXX + 2, mg + 5, MZZ + 2],
        run: async a => {
          a.flash('lamp', 3, 4.4); a.glow(1.7, 4.4);
          for (let k = 0; k < 6; k++) a.burst([MXX + 0.5 + Math.cos(k * 1.05) * 5, mg + 2, MZZ + 0.5 + Math.sin(k * 1.05) * 5], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 1.4, up: 2.4, life: 3.2, gravity: -0.35, spread: 1.5 });
          // 반딧불은 줄기 속이 아니라 발판 바깥 둘레에서 솟는다
          for (const [x, z] of fieldL) for (let k = 0; k < 6; k++) a.burst([x + 1.5 + (k % 2) * 1.5, MH.g(w, x, z) + 3 + k * 1.2, z + 0.5 - (k % 2)], { n: 12, colors: ['#ffe08a', '#c8ff9a', '#8affe0'], speed: 1.4, up: 2, life: 3, gravity: -0.35, spread: 1.4 });
          for (let k = 0; k < 12; k++) { const t = k / 12 * Math.PI * 2; a.burst([MXX + 0.5 + Math.cos(t) * 8.5, mg + 9, MZZ + 0.5 + Math.sin(t) * 8.5], { n: 8, colors: ['#9affd8', '#e0f8ff'], speed: 1, up: 1.5, life: 2.4, gravity: -0.3, spread: 0.6 }); }
          for (const p of plats) { for (let k = 0; k < 3; k++) { const ang = k * 2.1 + p.py * 0.3; a.burst([p.tx + 0.5 + Math.cos(ang) * (p.pr + 0.8), p.py + 1, p.tz + 0.5 + Math.sin(ang) * (p.pr + 0.8)], { n: 10, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 1.6, up: 2, life: 3, gravity: -0.3, spread: 1.6 }); } await a.wait(0.25); }
        },
      });
      landmarks.push({ name: '달맞이 제단', note: '선돌이 둘러싼 은빛 돌', p: [MXX + 0.5, mg + 14, MZZ + 0.5] });
      // ── 활터(동쪽) ──
      for (const [tx, tz] of [[155, 71], [155, 81], [154, 92]]) {
        const g = MH.g(w, tx, tz);
        w.box(tx, g + 1, tz, tx, g + 4, tz, B.barkDk); w.box(tx + 1, g + 1, tz - 2, tx + 1, g + 4, tz - 2, B.barkDk); w.box(tx + 1, g + 1, tz + 2, tx + 1, g + 4, tz + 2, B.barkDk);
        for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const d = Math.hypot(dy, dz); if (d <= 3.2) w.set(tx, g + 8 + dy, tz + dz, d < 1 ? B.targetR : d < 2.2 ? B.target : B.targetR); }
        w.box(tx + 1, g + 5, tz - 2, tx + 1, g + 5, tz + 2, B.barkDk);
      }
      // 사대: 나무 마루와 화살 통
      const shg = MH.g(w, 130, 82);
      MH.flatten(w, 127, 76, 133, 88, shg, B.pathS, B.dirt);
      for (let z = 76; z <= 88; z += 3) { w.box(127, shg + 1, z, 127, shg + 3, z, B.barkDk); w.set(127, shg + 4, z, z === 82 ? B.lamp2 : B.leafW); }
      w.box(127, shg + 3, 76, 127, shg + 3, 88, B.plank);
      for (const z of [78, 84, 87]) { w.box(129, shg + 1, z, 129, shg + 2, z, B.barrel); w.set(129, shg + 3, z, B.leafW); }
      // 연습용 과녁(부품): 활터 앞쪽 풀밭, 화살을 맞으면 빙글 돈다
      const tgt = { x: 142, z: 89 }; tgt.y = MH.g(w, tgt.x, tgt.z) + 8;
      w.box(tgt.x, tgt.y - 7, tgt.z, tgt.x, tgt.y - 4, tgt.z, B.barkDk);
      const tp = w.prop({ name: 'target', pivot: [tgt.x + 0.5, tgt.y + 0.5, tgt.z + 0.5], axis: 'y' });
      for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const d = Math.hypot(dy, dz); if (d <= 3.2) tp.set(tgt.x, tgt.y + dy, tgt.z + dz, d < 1 ? B.targetR : d < 2.2 ? B.target : B.targetR); }
      acts.push({
        name: '과녁 맞히기', hint: '은잎 화살이 과녁 한가운데 꽂히자 과녁이 빙글 돌아요', hit: [tgt.x - 1, tgt.y - 3, tgt.z - 3, tgt.x + 1, tgt.y + 3, tgt.z + 3],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.burst([tgt.x - 9, tgt.y + 1, tgt.z + 0.5], { n: 6, colors: ['#e0f8ff', '#c8e8d8'], speed: 9, up: 0.2, life: 0.5, gravity: 0, spread: 0.2, flat: true });
            await a.wait(0.35);
            a.burst([tgt.x + 1.2, tgt.y + 0.5, tgt.z + 0.5], { n: 22, colors: ['#ffffff', '#ffe08a', '#c04a3a'], speed: 4, up: 2, life: 0.7, gravity: 6, spread: 0.5 });
            await a.wait(0.3);
          }
          await a.turn('target', [0, Math.PI * 4, 0], 2.2);
          a.unwind('target');
        },
      });
      landmarks.push({ name: '활터', note: '은잎 활 시험장', p: [154.5, UP + 5, 81.5] });

      // ── 새 구역: 이슬 포도원과 달샘 술 창고(동남쪽 아랫숲) ──
      const VX0 = 118, VX1 = 163, VZ0 = 134, VZ1 = 163, vg = MH.g(w, 140, 148);
      for (let z = VZ0 - 6; z <= VZ1; z++) for (let x = VX0; x <= VX1; x++) if (!wet(x, z)) MH.setH(w, x, z, vg, B.moss2, B.dirt);
      MH.retain(w, VX0, VZ0 - 6, VX1, VZ1, B.rock, B.stoneW);
      // 술 창고 언덕
      const HX = 155, HZ = 119, HR = 12;
      for (let z = HZ - HR; z <= HZ + HR; z++) for (let x = HX - HR; x <= HX + HR; x++) {
        const d = MH.dist(x, z, HX, HZ) + (n.vn(x * 0.3, z * 0.3) - 0.5) * 1.5;
        if (d > HR || x >= W || z >= D) continue;
        const h = vg + Math.round(10 * Math.sqrt(Math.max(0, 1 - (d / HR) ** 2))), g = MH.g(w, x, z);
        if (h > g) MH.setH(w, x, z, h, d < HR - 2 ? B.moss2 : B.moss, B.dirt);
      }
      // 앞마당을 파내고 석조 문간
      const FZ0 = 128;
      for (let z = FZ0 + 1; z <= VZ0 - 1; z++) for (let x = 149; x <= 160; x++) { MH.setH(w, x, z, vg, B.pathS, B.dirt); for (let y = vg + 1; y <= vg + 14; y++) w.set(x, y, z, 0); }
      for (const x of [148, 161]) for (let z = FZ0 + 1; z <= VZ0 - 2; z++) { const hh = Math.max(vg + 1, MH.g(w, x, z)); w.box(x, vg + 1, z, x, hh, z, B.rock); w.set(x, hh + 1, z, B.stoneW); }
      w.box(149, vg + 1, FZ0, 160, vg + 8, FZ0, B.stoneW); w.box(149, vg + 9, FZ0, 160, vg + 9, FZ0, B.rock);
      for (let x = 149; x <= 160; x += 2) w.set(x, vg + 10, FZ0, B.leafD);
      for (let z = 120; z < FZ0; z++) for (let x = 151; x <= 158; x++) for (let y = vg + 1; y <= vg + 6; y++) w.set(x, y, z, 0);
      w.box(151, vg + 7, 120, 158, vg + 7, FZ0 - 1, B.rock); w.box(150, vg + 1, 120, 150, vg + 6, FZ0 - 1, B.rock); w.box(159, vg + 1, 120, 159, vg + 6, FZ0 - 1, B.rock); w.box(151, vg + 1, 119, 158, vg + 6, 119, B.rock);
      for (let z = 120; z < FZ0; z++) for (let x = 151; x <= 158; x++) w.set(x, vg, z, B.pathS);
      // 문틀: 아치 위는 돌, 문짝 자리는 비운다
      for (let x = 152; x <= 157; x++) for (let y = vg + 1; y <= vg + 5; y++) w.set(x, y, FZ0, 0);
      for (const x of [153, 154, 155, 156]) w.set(x, vg + 6, FZ0, 0);
      w.box(151, vg + 1, FZ0 + 1, 151, vg + 7, FZ0 + 1, B.rock); w.box(158, vg + 1, FZ0 + 1, 158, vg + 7, FZ0 + 1, B.rock); w.box(151, vg + 8, FZ0 + 1, 158, vg + 8, FZ0 + 1, B.rock);
      w.set(154, vg + 9, FZ0 + 1, B.moon); w.set(155, vg + 9, FZ0 + 1, B.moon);
      // 창고 안: 술통 더미와 등불
      for (const x of [151, 157]) for (let z = 121; z <= 126; z += 2) { w.box(x, vg + 1, z, x + 1, vg + 2, z, B.barrel); w.set(x, vg + 1, z + 1, B.hoop); }
      w.box(153, vg + 1, 120, 156, vg + 3, 120, B.barrel); w.set(154, vg + 5, 121, B.lamp2); w.set(155, vg + 5, 121, B.lamp2);
      lights.push({ name: 'cellar', p: [155, vg + 4, 123], c: '#ffd890', i: 1.2, d: 14, flicker: 0.15 });
      // 문짝(부품 두 쪽): 바깥으로 열린다
      const doorL = w.prop({ name: 'cdoorL', pivot: [152, vg + 1, FZ0 + 1], axis: 'y' });
      const doorR = w.prop({ name: 'cdoorR', pivot: [158, vg + 1, FZ0 + 1], axis: 'y' });
      doorL.box(152, vg + 1, FZ0, 154, vg + 5, FZ0, B.door); doorL.box(153, vg + 6, FZ0, 154, vg + 6, FZ0, B.door); doorL.box(152, vg + 2, FZ0, 154, vg + 2, FZ0, B.hoop); doorL.box(152, vg + 4, FZ0, 154, vg + 4, FZ0, B.hoop);
      doorR.box(155, vg + 1, FZ0, 157, vg + 5, FZ0, B.door); doorR.box(155, vg + 6, FZ0, 156, vg + 6, FZ0, B.door); doorR.box(155, vg + 2, FZ0, 157, vg + 2, FZ0, B.hoop); doorR.box(155, vg + 4, FZ0, 157, vg + 4, FZ0, B.hoop);
      // 문 앞 술통과 등롱 기둥
      for (const [x, z] of [[149, 131], [160, 130], [160, 132]]) { w.box(x, vg + 1, z, x, vg + 2, z, B.barrel); w.set(x, vg + 3, z, B.hoop); }
      for (const x of [150, 159]) { w.box(x, vg + 1, FZ0 + 2, x, vg + 4, FZ0 + 2, B.barkDk); w.set(x, vg + 5, FZ0 + 2, B.lamp2); }
      lights.push({ p: [150.5, vg + 5, FZ0 + 2.5], c: '#ffd880', i: 0.9, d: 12, flicker: 0.12, night: true });
      acts.push({
        name: '술 창고 문', hint: '언덕 속 술 창고 문이 활짝 열리며 이슬 포도주 향과 금빛 반딧불이 쏟아져요', hit: [151, vg + 1, FZ0 - 1, 158, vg + 7, FZ0 + 2],
        run: async a => {
          await Promise.all([a.turn('cdoorL', [0, -1.35, 0], 1.4), a.turn('cdoorR', [0, 1.35, 0], 1.4)]);
          a.flash('cellar', 3, 3.4);
          for (let k = 0; k < 7; k++) { a.burst([154.5 + (k % 3) - 1, vg + 3, FZ0 + 1.5], { n: 14, colors: ['#ffe08a', '#c8a0ff', '#fff4c8'], speed: 1.6, up: 2.6, life: 2.6, gravity: -0.4, spread: 1.4 }); await a.wait(0.35); }
          await a.wait(0.8);
          await Promise.all([a.turn('cdoorL', [0, 0, 0], 1.4), a.turn('cdoorR', [0, 0, 0], 1.4)]);
        },
      });
      landmarks.push({ name: '달샘 술 창고', note: '언덕 속에서 이슬 포도주가 익는 저장고', p: [154.5, vg + 18, 124.5] });
      // 술 창고 안으로: 문짝을 열고 언덕 속 깊은 저장고(하위 지도)로 내려간다. 돌아오면 문 앞마당에 선다
      acts.push({
        name: '달샘 술 창고 안으로', hint: '문짝을 활짝 열고 언덕 속 깊은 통 저장실과 달빛 샘물 숙성 굴로 들어가요', goto: 'silverleaf-cellar', hit: [151, vg + 1, 120, 158, vg + 6, FZ0 + 1],
        run: async a => {
          await Promise.all([a.turn('cdoorL', [0, -1.35, 0], 1), a.turn('cdoorR', [0, 1.35, 0], 1)]);
          a.flash('cellar', 2.5, 1.4);
          a.burst([154.5, vg + 3, FZ0 + 1.5], { n: 30, colors: ['#ffe9a0', '#c8a0ff', '#ffffff'], speed: 2, up: 2, life: 1, gravity: -0.4, spread: 1.6 });
          await a.wait(0.7);
        },
      });
      // 포도 시렁: 기둥·밧줄·덩굴, 밤에 빛나는 이슬 포도
      const rows = [138, 143, 153, 158];
      rows.forEach((rz, ri) => {
        for (let x = 122; x <= 162; x++) {
          if (MH.dist(x, rz, 141, 148) < 7) continue;
          const post = (x - 122) % 5 === 0;
          if (post) { w.box(x, vg + 1, rz, x, vg + 5, rz, B.barkDk); if ((x + ri) % 10 === 2) w.set(x, vg + 6, rz, B.lamp2); }
          else w.set(x, vg + 5, rz, B.rope);
          w.set(x, vg, rz, B.vsoil); w.set(x, vg, rz - 1, B.vsoil); w.set(x, vg, rz + 1, B.vsoil);
          const hh = hash3(x, ri, rz);
          if (!post) { w.box(x, vg + 2, rz, x, vg + 4, rz, hh > 0.5 ? B.leafT : B.leafD); if (hh > 0.3) w.set(x, vg + 1, rz, B.leafD); if (hh > 0.45) w.set(x, vg + 6, rz, B.leafS); }
          if (!post && (x + ri) % 3 === 0) for (const s of [-1, 1]) if (hash3(x, s, rz) > 0.3) { w.set(x, vg + 3, rz + s, B.grape); if (hash3(s, x, rz) > 0.5) w.set(x, vg + 2, rz + s, B.grape); }
        }
      });
      lights.push({ name: 'vine', p: [132.5, vg + 6, 143.5], c: '#c8a0ff', i: 1, d: 18, flicker: 0.1 });
      w.set(132, vg + 6, 143, B.lamp2);
      lights.push({ name: 'vine', p: [152.5, vg + 6, 153.5], c: '#c8a0ff', i: 1, d: 18, flicker: 0.1 });
      w.set(152, vg + 6, 153, B.lamp2);
      // 가운데 돌길과 둘레 울타리
      for (let x = VX0; x <= VX1; x++) for (let z = 147; z <= 149; z++) if (MH.dist(x, z, 141, 148) > 4.6) w.set(x, vg, z, B.pathS);
      for (let z = FZ0 + 1; z <= 147; z++) for (let x = 153; x <= 156; x++) w.set(x, vg, z, B.pathS);
      MH.fence(w, [[VX0, VZ0 - 4], [VX0, 145]], B.barkDk, B.rope); MH.fence(w, [[VX0, 151], [VX0, VZ1 - 1], [VX1, VZ1 - 1]], B.barkDk, B.rope);
      // 포도 바구니와 수확 수레
      for (const [x, z] of [[126, 150], [134, 151], [148, 145], [160, 150]]) { w.box(x, vg + 1, z, x + 1, vg + 1, z, B.plank); w.set(x, vg + 2, z, B.grape); w.set(x + 1, vg + 2, z, B.grape); }
      acts.push({
        name: '이슬 거두기', hint: '시렁마다 이슬 포도가 차례로 빛나며 은빛 이슬방울이 날아올라요', hit: [126, vg + 1, 136, 146, vg + 6, 145],
        run: async a => {
          a.flash('vine', 2.6, 4.2);
          for (let i = 0; i < 7; i++) {
            for (const rz of rows.slice(0, 2)) a.burst([123.5 + i * 4, vg + 3.5, rz + 0.5], { n: 10, colors: ['#c8a0ff', '#e0f8ff', '#8affe0'], speed: 1.2, up: 2.6, life: 2.4, gravity: -0.4, spread: 1.4 });
            await a.wait(0.3);
          }
          a.burst([141.5, vg + 6, 148.5], { n: 40, colors: ['#e0f8ff', '#c8a0ff'], speed: 2.4, up: 3, life: 2, gravity: -0.2, spread: 2 });
        },
      });
      landmarks.push({ name: '이슬 포도원', note: '밤이면 포도알이 은빛으로 빛나는 덩굴 시렁', p: [134.5, vg + 14, 152.5] });
      // 달샘 분수: 돌 수반 가운데 달돌 구슬이 떠오른다
      const FX = 141, FZc = 148;
      for (let z = FZc - 5; z <= FZc + 5; z++) for (let x = FX - 5; x <= FX + 5; x++) {
        const d = MH.dist(x, z, FX, FZc);
        if (d > 4.6) continue;
        if (d > 3.4) { w.set(x, vg, z, B.pathS); w.box(x, vg + 1, z, x, vg + 2, z, B.stoneW); }
        else { MH.setH(w, x, z, vg - 1, B.rockDk, B.rock); w.set(x, vg, z, 0); w.set(x, vg + 1, z, 0); w.liquid(x, z, vg + 1); }
      }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; w.set(Math.round(FX + Math.cos(a) * 4), vg + 3, Math.round(FZc + Math.sin(a) * 4), k % 2 ? B.leafW : B.stoneW); }
      w.box(FX, vg - 1, FZc, FX, vg + 3, FZc, B.stoneW); w.liquid(FX, FZc, -1); w.set(FX, vg + 4, FZc, B.glowF);
      const orb = w.prop({ name: 'moonorb', pivot: [FX + 0.5, vg + 7.5, FZc + 0.5], axis: 'y', bob: 0.25, bobSpeed: 1.2 });
      orb.box(FX - 1, vg + 7, FZc, FX + 1, vg + 7, FZc, B.moon); orb.box(FX, vg + 6, FZc, FX, vg + 8, FZc, B.moon); orb.box(FX, vg + 7, FZc - 1, FX, vg + 7, FZc + 1, B.moon);
      orb.set(FX + 2, vg + 7, FZc, B.leafW); orb.set(FX - 2, vg + 7, FZc, B.leafW);
      lights.push({ name: 'well', p: [FX + 0.5, vg + 6, FZc + 0.5], c: '#b8f8ff', i: 1.2, d: 16, flicker: 0.05 });
      acts.push({
        name: '달샘 분수', hint: '수반 위 달돌 구슬이 떠올라 돌자 물줄기가 은빛으로 솟구쳐요', hit: [FX - 4, vg + 1, FZc - 4, FX + 4, vg + 9, FZc + 4],
        run: async a => {
          a.flash('well', 3, 4);
          a.tween('moonorb', { off: [0, 5, 0], rot: [0, Math.PI * 4, 0] }, 2.4);
          for (let k = 0; k < 8; k++) { a.burst([FX + 0.5, vg + 4, FZc + 0.5], { n: 26, colors: ['#ffffff', '#b8f8ff', '#8affe0'], speed: 2.2, up: 8, life: 1.4, gravity: 9, spread: 0.6 }); await a.wait(0.35); }
          a.burst([FX + 0.5, vg + 12, FZc + 0.5], { n: 40, colors: ['#e0f8ff', '#c8a0ff', '#ffffff'], speed: 4, up: 1, life: 1.8, gravity: 0.5, spread: 1 });
          await a.tween('moonorb', { off: [0, 0, 0], rot: [0, Math.PI * 4, 0] }, 1.8);
          a.unwind('moonorb');
        },
      });
      landmarks.push({ name: '달샘', note: '포도원 한가운데 달빛을 머금은 샘', p: [FX + 0.5, vg + 13, FZc + 0.5] });

      // ── 땅 위의 길: 이끼 돌길과 돌 등롱 ──
      const trail = (pts, wd) => {
        const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
        for (let z = Math.min(...zs) - wd - 1; z <= Math.max(...zs) + wd + 1; z++) for (let x = Math.min(...xs) - wd - 1; x <= Math.max(...xs) + wd + 1; x++) {
          if (wet(x, z) || MH.g(w, x, z) < 0) continue;
          const d = MH.polyDist(x + 0.5, z + 0.5, pts);
          if (d <= wd && hash3(x, 7, z) > 0.12) MH.paint(w, x, z, B.pathS);
        }
      };
      const slamp = (x, z) => { const g = MH.g(w, x, z); if (g < 0 || w.get(x, g + 1, z)) return; w.set(x, g + 1, z, B.rock); w.box(x, g + 2, z, x, g + 3, z, B.stoneW); w.set(x, g + 4, z, B.lamp); w.set(x, g + 5, z, B.stoneW); };
      trail([[58, 97], [60, 110], [60, 119]], 1.4);
      trail([[67, 133], [80, 140], [83, 146]], 1.4);
      trail([[97, 146], [110, 147], [VX0, 148]], 1.4);
      MH.bridge(w, [79, 146], [101, 146], Math.max(MH.g(w, 79, 146), MH.g(w, 101, 146)) + 1, { m: { deck: B.plank, parapet: B.barkDk }, width: 3, rise: 7 });   // 잎배가 밑으로 지나가는 무지개 다리
      for (const [x, z] of [[62, 110], [70, 137], [78, 141], [104, 144], [114, 150]]) slamp(x, z);
      // ── 바위, 작은 나무, 고사리, 꽃 ──
      const clearOf = (x, z) => MH.polyDist(x, z, dnPts) > 8 && trees.every(([tx, tz, h, r]) => MH.dist(x, z, tx, tz) > r + 11) && MH.dist(x, z, MXX, MZZ) > 12 && MH.dist(x, z, bx, bzz) > 5 && !(x > VX0 - 3 && z > VZ0 - 8) && MH.dist(x, z, HX, HZ) > HR + 1 && !(x > 124 && x < 135 && z > 74 && z < 90);
      for (let i = 0; i < 40; i++) { const x = w.ri(4, W - 5), z = w.ri(4, D - 5), g = MH.g(w, x, z); if (g > base && !wet(x, z) && !w.get(x, g + 1, z) && clearOf(x, z)) MH.rock(w, x, g, z, w.r(1.5, 3.6), B.rock, B.moss2, B.rockDk); }
      for (let i = 0; i < 30; i++) { const x = w.ri(4, W - 5), z = w.ri(4, D - 5), g = MH.g(w, x, z); if (g > base && !wet(x, z) && !w.get(x, g + 1, z) && clearOf(x, z)) MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(9, 14), bark: B.bark, leaves: [B.leafW, B.leafS, B.leafD], r: 4.2 }); }
      MH.scatter(w, 3400, (x, g, z, b) => { if (b === B.pathS || b === B.vsoil || (x > VX0 && z > VZ0 - 6)) return; if (w.chance(0.3) && MH.dist(x, z, bx, bzz) > 3) w.set(x, g + 1, z, w.chance(0.55) ? B.fern : w.chance(0.25) ? B.glowF : w.chance(0.2) ? B.mush : w.pick([B.flower, B.flower2])); });
      // 윗숲 개울을 건너는 나무다리, 폭포 옆 절벽을 내려가는 돌계단
      const bzc = 34, bxc = Math.round(sX(bzc));
      MH.bridge(w, [bxc - 8, bzc], [bxc + 8, bzc], UP + 2, { m: { deck: B.plank, parapet: B.barkDk }, width: 3, rise: 1 });
      slamp(bxc - 10, bzc + 2); slamp(bxc + 10, bzc - 2);
      const cTop = MH.g(w, 58, 74), cBot = MH.g(w, 58, 96);
      MH.flight(w, { name: '절벽 돌계단', axis: 'z', c: 58, half: 2, a: 75, b: 95, ha: cTop, hb: cBot, step: B.stoneW, edge: B.rockDk, fill: B.rock, rail: B.plank, post: B.barkDk, postGap: 5,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.lamp); if (k === 5 && x > 58) lights.push({ p: [x + 0.5, y + 0.5, z + 0.5], c: '#8affd0', i: 0.8, d: 12, flicker: 0.1, night: true }); } });
      // ── 동쪽 풀밭 등롱(등불 점등 때 함께 밝아진다): 거목 그늘 밖이라 잘 보인다 ──
      for (const [x, z] of fieldL) { const g = MH.g(w, x, z); w.box(x, g + 1, z, x, g + 4, z, B.barkDk); w.set(x + 1, g + 4, z, B.barkDk); w.set(x + 1, g + 3, z, B.lamp2); w.set(x, g + 5, z, B.leafW); }
      // ── 폭포 물보라와 무지개 ──
      const FWX = Math.round(sX(79)), FWZ = 84;
      acts.push({
        name: '폭포 무지개', hint: '폭포 물보라가 피어오르며 연못 위에 무지개가 걸려요', hit: [FWX - 4, base, FWZ - 6, FWX + 4, UP + 2, FWZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) { a.burst([FWX + 0.5, base + 2, FWZ + 1], { n: 44, colors: ['#ffffff', '#e0f8ff', '#b8e8f0'], speed: 4, up: 5, life: 1.6, gravity: 3, spread: 3 }); a.burst([FWX + 0.5, UP + 1, FWZ - 5], { n: 14, colors: ['#ffffff', '#d8f0ff'], speed: 1.5, up: 1, life: 1.2, gravity: 8, spread: 1.5 }); await a.wait(0.35); }
          const bow = ['#ff6a6a', '#ffb05a', '#ffe86a', '#8aff8a', '#6ac8ff', '#a88aff'];
          for (let i = 0; i <= 18; i++) {
            const t = i / 18, x = FWX - 12 + t * 24, y = base + 3 + Math.sin(t * Math.PI) * 16;
            bow.forEach((c, j) => a.burst([x, y - j * 0.8, FWZ + 5], { n: 3, colors: [c], speed: 0.1, up: 0.05, life: 2.6, gravity: 0, spread: 0.2 }));
            await a.wait(0.06);
          }
          await a.wait(1.5);
        },
      });
      // ── 연못 잎배: 등불을 단 잎사귀 배가 연못을 빠져나가 아랫개울을 따라 숲 밖으로 흘러간다 ──
      const lr = [[77, 109], [82, 111], [87, 111], [91, 109], [93, 107], [90, 110], [86, 112], [83, 117]];
      for (let z = 126; z <= 166; z += 10) lr.push([Math.round(sX(z) + 4), z]);
      MH.routeOK(w, lr, 1, '잎배 경로');
      lr.push([Math.round(sX(174) + 4), 174]);
      const LBX = lr[0][0], LBZ = lr[0][1], LY = base + 1;
      const lb = w.prop({ name: 'leafboat', pivot: [LBX + 0.5, LY, LBZ + 0.5], axis: 'x', bob: 0.12, bobSpeed: 1.6, rock: 0.04, rockSpeed: 1.2 });
      lb.box(LBX - 2, LY, LBZ - 1, LBX + 2, LY, LBZ + 1, B.leafT); lb.set(LBX + 3, LY, LBZ, B.leafT); lb.set(LBX - 3, LY, LBZ, B.leafT);
      lb.walls(LBX - 2, LY + 1, LBZ - 1, LBX + 2, LY + 1, LBZ + 1, B.leafS); lb.set(LBX + 3, LY + 1, LBZ, B.leafW); lb.set(LBX + 4, LY + 2, LBZ, B.leafW);
      lb.box(LBX - 1, LY + 2, LBZ, LBX - 1, LY + 5, LBZ, B.barkDk); lb.set(LBX, LY + 5, LBZ, B.barkDk); lb.set(LBX, LY + 4, LBZ, B.lamp2); lb.set(LBX + 1, LY + 2, LBZ, B.flower);
      const lDrive = lr.slice(1).map(([x, z]) => [x - LBX, 0, z - LBZ]);
      acts.push({
        name: '연못 잎배', hint: '등불을 단 잎사귀 배가 연못을 빠져나가 아랫개울을 따라 숲 밖으로 흘러가요', hit: [LBX - 3, LY, LBZ - 1, LBX + 4, LY + 5, LBZ + 1],
        run: async a => {
          a.burst([LBX + 0.5, LY + 4, LBZ + 0.5], { n: 16, colors: ['#ffe08a', '#c8ff9a', '#8affe0'], speed: 1, up: 1.5, life: 2, gravity: -0.3, spread: 1 });
          await a.drive('leafboat', lDrive, 11, { fwd: '+x', back: 1.0 });
        },
      });
      // ── 은방울 풍경: 제단 곁 나무틀에 매단 풍경이 바람에 흔들린다 ──
      const CX = 72, CZ = 134, cg = MH.g(w, CX, CZ);
      for (const z of [CZ - 3, CZ + 3]) { w.box(CX, cg + 1, z, CX, cg + 10, z, B.barkDk); w.set(CX, cg + 1, z, B.rock); }
      w.box(CX, cg + 11, CZ - 4, CX, cg + 11, CZ + 4, B.bark); w.set(CX, cg + 12, CZ, B.leafW); w.set(CX, cg + 12, CZ - 4, B.leafW); w.set(CX, cg + 12, CZ + 4, B.leafW);
      const ch = w.prop({ name: 'chimes', pivot: [CX + 0.5, cg + 11, CZ + 0.5], axis: 'z' });
      for (let dz = -2; dz <= 2; dz++) { ch.box(CX, cg + 7 - Math.abs(dz), CZ + dz, CX, cg + 10, CZ + dz, dz % 2 ? B.stoneW : B.rope); ch.set(CX, cg + 6 - Math.abs(dz), CZ + dz, B.moon); }
      acts.push({
        name: '은방울 풍경', hint: '바람이 불면 제단 곁 풍경이 흔들리며 맑은 소리와 빛을 뿌려요', hit: [CX - 1, cg + 1, CZ - 4, CX + 1, cg + 12, CZ + 4],
        run: async a => {
          a.wind(3, 4);
          for (let k = 0; k < 6; k++) {
            await a.turn('chimes', [0, 0, k % 2 ? -0.6 : 0.6], 0.5);
            a.burst([CX + 0.5, cg + 5, CZ + 0.5], { n: 16, colors: ['#e0f8ff', '#b8f8ff', '#ffffff'], speed: 2.5, up: 1.5, life: 1.4, gravity: -0.4, spread: 0.6 });
          }
          await a.turn('chimes', [0, 0, 0], 0.7);
        },
      });
      // ── 은어 뛰기: 아랫개울에서 은빛 물고기들이 차례로 튀어 오른다 ──
      const fish = [[86.5, 131], [89.5, 141], [91.5, 155], [84.5, 123]];
      acts.push({
        name: '은어 뛰기', hint: '아랫개울에서 은빛 물고기들이 물을 차고 튀어 올라요', hit: [80, base, 120, 96, base + 4, 158],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            const [x, z] = fish[k % 4];
            a.burst([x, base + 1.5, z], { n: 4, colors: ['#e8f0f8', '#c8d8e8', '#a8c0d0'], speed: 2, up: 7, life: 1.1, gravity: 13, spread: 0.3 });
            a.burst([x, base + 1.2, z], { n: 14, colors: ['#ffffff', '#d8f0ff'], speed: 2.5, up: 2.5, life: 0.7, gravity: 9, spread: 0.8 });
            await a.wait(0.45);
          }
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
