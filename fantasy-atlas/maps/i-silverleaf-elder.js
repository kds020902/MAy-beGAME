// 장로의 거목 회의장(하위 지도) — 은빛잎 마을 가장 오래된 거목의 줄기 속. 나이테 무늬 둥근 바닥, 뿌리 의자 고리와 은잎 둥근 탁자,
// 벽을 따라 도는 나선 계단과 윗단 장로의 서재(회랑), 두루마리 서가, 달빛 수정 등, 높은 벽의 별빛 천창. 남동쪽(카메라 쪽) 벽은 낮게 잘랐다 (72칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 72, Hh = 64, G = 10, C = 36, R = 21;
  MAPS.push({
    id: 'silverleaf-elder', cat: 'village', sub: true, parent: 'silverleaf', name: '장로의 거목 회의장', en: 'Silverleaf · Elder\'s Council Hall', color: '#8ad8b0', seed: 1391, base: G, time: 'night', size: [W, D, Hh],
    desc: '천 년 된 거목의 줄기 속을 둥글게 비워 만든 회의장. 바닥에는 나이테가 그대로 남아 있고, 뿌리를 깎은 의자 여덟 개가 은잎 둥근 탁자를 둘러싼다. 벽을 따라 나선 계단이 윗단 장로의 서재로 오르고, 높은 벽의 둥근 천창으로 별빛이 든다.',
    info: { title: '장소 정보', en: 'ELDER HALL', rows: [['자리', '장로의 거목 아랫단 발판 오두막 안'], ['회의', '보름마다 뿌리 의자 여덟 자리'], ['윗단', '장로의 서재 · 두루마리 서가'], ['소문', '거목의 나이를 아는 이는 장로뿐']] },
    sky: ['#24304e', '#0c1226', '#8ad8c8'], stars: true,
    hemi: ['#d8f0e8', '#2a2a22', 0.62], sun: ['#d8e8ff', 0.5, [0.45, 1, 0.55]],
    day: { sky: ['#d8eee4', '#7aa8b8', '#f4ffe8'], stars: false, hemi: ['#f8fff4', '#4a4434', 0.62], sun: ['#fff4dc', 0.66, [0.45, 1, 0.55]], haze: '#c0d8cc' },
    fog: { start: 0.86, floor: G - 4, depth: 6, haze: [8, 0.18, 6], hazeColor: '#3a5048' },
    camY: 4, zoom: 1.3,
    particles: [
      { n: 70, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], mode: 'wisp', speed: 0.5, size: 2, area: [C, C, 17], y0: G + 2, y1: G + 22 },
      { n: 60, colors: ['#e8dcc0', '#c8d8c8'], mode: 'drift', speed: 0.12, wind: 0.05, area: [C, C, 18], y0: G + 1, y1: G + 24, glow: false },
    ],
    blocks: {
      moss: { c: '#3a2e24', top: '#3e5e44', v: 0.1 }, dirt: { c: '#3a2e24', v: 0.08 },
      bark: { c: '#7a6a58', v: 0.07, pat: 'log' }, barkDk: { c: '#54483c', v: 0.07 }, heart: { c: '#a88660', v: 0.05, pat: 'log' }, heartDk: { c: '#86684a', v: 0.05, pat: 'log' },
      ringA: { c: '#9a7a52', top: '#c09a68', v: 0.03 }, ringB: { c: '#9a7a52', top: '#a8845a', v: 0.03 }, pith: { c: '#6a5038', top: '#7a5c40', v: 0.04 },
      root: { c: '#6a5644', v: 0.06 }, rootL: { c: '#84705a', v: 0.06 }, plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, rope: { c: '#c8b890', v: 0.04 },
      door: { c: '#4a3a2e', v: 0.03, pat: 'plank' }, iron: { c: '#4a4a50', v: 0.03 },
      leafS: { c: '#8ab8a0', v: 0.09 }, leafT: { c: '#5a9a88', v: 0.09 }, leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 },
      silver: { c: '#c8d4d4', v: 0.03 }, silverL: { c: '#d8fff0', glow: true }, moss2: { c: '#4a6a3a', v: 0.1 },
      scroll: { c: '#efe4c4', v: 0.03 }, tie: { c: '#a8403a', v: 0.03 }, bookG: { c: '#3a6a4a', v: 0.04 }, bookB: { c: '#3a4a7a', v: 0.04 }, bookR: { c: '#7a3a3a', v: 0.04 },
      cush: { c: '#4a7a6a', v: 0.04 }, rug: { c: '#2e5a52', v: 0.04, pat: 'check', alt: '#3a6a60' },
      crystal: { c: '#b8f8ff', glow: true }, lamp2: { c: '#ffe08a', glow: true }, mushG: { c: '#9ae8f0', glow: true }, flower: { c: '#c8a0ff', v: 0.05 },
      nightW: { c: '#1a2850', v: 0.02 }, star: { c: '#f0f8ff', glow: true }, gold: { c: '#e8c860', v: 0.04 }, string: { c: '#f4f0d8', glow: true },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 1, z) > 0.8 ? B.moss2 : B.moss, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.barkDk });
      const lights = [], acts = [], landmarks = [];
      const deg = Math.PI / 180;
      const pol = (x, z) => { const dx = x - C, dz = z - C; return [Math.hypot(dx, dz), ((Math.atan2(dz, dx) / deg) + 360) % 360]; };
      const at = (r, th) => [Math.round(C + Math.cos(th * deg) * r), Math.round(C + Math.sin(th * deg) * r)];
      const back = th => { const s = Math.cos(th * deg) + Math.sin(th * deg); return s < 0.2; };   // 카메라 반대편(북서쪽 반)
      const TOP = G + 27, GY = G + 12;                                                            // 벽 꼭대기 · 윗단 회랑 바닥

      // ── 바닥: 나이테 그대로 ──
      for (let z = C - R - 4; z <= C + R + 4; z++) for (let x = C - R - 4; x <= C + R + 4; x++) {
        const [r] = pol(x, z);
        if (r > R + 0.2) continue;
        w.set(x, G, z, r < 1.6 ? B.pith : (Math.floor(r / 1.7) % 2 ? B.ringA : B.ringB));
        w.set(x, G - 1, z, B.heartDk);
      }
      // ── 줄기 벽: 안쪽 속살, 바깥 껍질. 뒤쪽 반은 높고 앞쪽 반은 낮게(3칸) ──
      for (let z = C - R - 4; z <= C + R + 4; z++) for (let x = C - R - 4; x <= C + R + 4; x++) {
        const [r, th] = pol(x, z);
        if (r <= R + 0.2 || r > R + 3) continue;
        const hb = back(th), top = hb ? TOP - Math.round(hash3(x >> 1, 9, z >> 1) * 2) : G + 3;
        for (let y = G; y <= top; y++) {
          const inner = r < R + 1.3;
          let b = inner ? ((Math.round(th * 0.35) + (y >> 2)) % 5 === 0 ? B.heartDk : B.heart) : (hash3(x, y >> 1, z) > 0.85 ? B.barkDk : B.bark);
          if (!hb && y === top) b = B.barkDk;
          w.set(x, y, z, b);
        }
        if (!hb && r > R + 1.6 && hash3(x, 3, z) > 0.55) w.set(x, G + 4, z, hash3(x, 4, z) > 0.5 ? B.leafD : B.moss2);
        if (hb && r > R + 1.6) for (let y = TOP - 1; y <= TOP + 1; y++) if (hash3(x, y, z) > 0.5) w.set(x, y + 1, z, hash3(x, y + 7, z) > 0.4 ? B.leafT : B.leafS);
      }
      // 벽 아래 빛버섯과 이끼, 높은 벽의 잎 띠
      for (let k = 0; k < 64; k++) {
        const th = k * 5.625 + 2, [x, z] = at(R - 0.4, th);
        if (w.get(x, G + 1, z)) continue;
        const h = hash3(k, 5, 1);
        if (h > 0.72) w.set(x, G + 1, z, B.mushG); else if (h > 0.45) w.set(x, G + 1, z, B.moss2);
      }
      for (let th = 0; th < 360; th += 2) if (back(th)) { const [x, z] = at(R + 0.2, th); for (const y of [G + 10, TOP - 3]) { w.set(x, y, z, (th >> 1) % 3 ? B.leafT : B.leafW); if (hash3(th, y, 3) > 0.6) w.set(x, y - 1, z, B.leafS); } }

      // ── 동쪽 문(밖으로): 낮은 벽에 문틀만 높게 ──
      const DX = C + R, DZ = C - 1;
      for (let z = DZ - 2; z <= DZ + 3; z++) for (let x = DX; x <= DX + 2; x++) for (let y = G + 1; y <= G + 6; y++) {
        const jamb = z === DZ - 2 || z === DZ + 3 || y >= G + 5;
        if (z >= DZ - 1 && z <= DZ + 2 && y === G + 4) { w.set(x, y, z, B.barkDk); continue; }
        if (jamb) { if (!(y === G + 6 && (z === DZ - 2 || z === DZ + 3))) w.set(x, y, z, B.barkDk); }
        else if (z >= DZ && z <= DZ + 1 && y <= G + 3) w.set(x, y, z, x === DX ? B.door : B.barkDk);
      }
      w.set(DX, G + 2, DZ - 1, B.lamp2); w.set(DX, G + 2, DZ + 2, B.lamp2);
      for (let z = DZ - 2; z <= DZ + 3; z++) w.set(DX + 1, G + 7, z, z % 2 ? B.leafW : B.leafS);
      w.box(DX - 3, G, DZ - 1, DX - 1, G, DZ + 2, B.rug);
      lights.push({ name: 'door', p: [DX - 0.5, G + 3, DZ + 1], c: '#ffd890', i: 0.6, d: 10, flicker: 0.12 });
      acts.push(OR.goAct({ at: [DX - 1, G + 1, DZ], name: '밖으로 나가기', goto: 'silverleaf', hint: '동쪽 문을 열고 장로의 거목 아랫단 발판으로 나가요', hit: [DX - 1, G + 1, DZ, DX, G + 3, DZ + 1], h: 3 }));

      // ── 나선 계단: 북동쪽 벽을 따라 300°에서 250°까지 12단, 윗단 회랑으로 ──
      const S0 = 300, S1 = 250, NS = 12;
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const [r, th] = pol(x, z);
        if (r > R + 0.2 || r < R - 3.6 || th > S0 || th < S1) continue;
        const step = Math.min(NS - 1, Math.floor((S0 - th) / (S0 - S1) * NS));
        for (let y = G + 1; y <= G + 1 + step; y++) w.set(x, y, z, y === G + 1 + step ? B.plank : B.heartDk);
        if (r < R - 2.8) w.set(x, G + 2 + step, z, step % 3 === 1 ? B.barkDk : 0);
      }
      for (let i = 1; i < NS; i += 3) { const th = S0 - (i + 0.5) * (S0 - S1) / NS, [x, z] = at(R - 3.4, th); w.set(x, G + 3 + i, z, B.rope); w.set(x, G + 4 + i, z, B.lamp2); }
      lights.push({ name: 'stair', p: [at(R - 3, 275)[0] + 0.5, G + 9, at(R - 3, 275)[1] + 0.5], c: '#ffd890', i: 0.6, d: 12, flicker: 0.1 });

      // ── 윗단 회랑(장로의 서재): 135°~252°, 바닥 GY ──
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const [r, th] = pol(x, z);
        if (r > R + 0.2 || r < R - 6.5 || th < 135 || th > 253) continue;
        w.set(x, GY, z, B.plank); w.set(x, GY - 1, z, B.heartDk);
        if (r < R - 5.6) { w.set(x, GY + 1, z, 0); w.set(x, GY + 2, z, Math.round(th) % 9 < 2 ? B.barkDk : B.rope); if (Math.round(th) % 9 < 2) w.set(x, GY + 1, z, B.barkDk); }
      }
      for (const th of [140, 170, 200, 230]) { const [x, z] = at(R - 6, th); w.box(x, G + 1, z, x, GY - 2, z, B.root); w.set(x, GY + 3, z, B.leafW); }
      // 서재: 서가, 책상, 수정 등, 방석
      for (let th = 140; th <= 246; th += 1.2) {
        const [x, z] = at(R - 0.6, th), [x2, z2] = at(R - 1.4, th);
        if (th > 212 && th < 238) continue;                                          // 천창 아래는 비운다
        for (let y = GY + 1; y <= GY + 6; y++) w.set(x, y, z, B.heartDk);
        for (const y of [GY + 1, GY + 3, GY + 5]) { if (w.get(x2, y, z2)) continue; const h = hash3(x2, y, z2); w.set(x2, y, z2, h > 0.66 ? B.bookG : h > 0.33 ? B.bookB : B.bookR); }
        w.set(x2, GY + 2, z2, B.heart); w.set(x2, GY + 4, z2, B.heart); w.set(x2, GY + 6, z2, B.heart);
      }
      const [sx, sz] = at(R - 3.4, 192);
      w.box(sx - 1, GY + 1, sz - 1, sx + 1, GY + 1, sz + 1, B.root); w.box(sx - 1, GY + 2, sz - 1, sx + 1, GY + 2, sz + 1, B.plank);
      w.set(sx, GY + 3, sz, B.scroll); w.set(sx + 1, GY + 3, sz, B.crystal); w.set(sx - 1, GY + 3, sz + 1, B.bookB);
      { const [cx2, cz2] = at(R - 5, 196); w.set(cx2, GY + 1, cz2, B.cush); }
      lights.push({ name: 'study', p: [sx + 1.5, GY + 4, sz + 0.5], c: '#b8f8ff', i: 0.8, d: 14, flicker: 0.06 });

      // ── 별빛 천창: 225° 높은 벽의 둥근 창(덧문 두 짝은 부품) ──
      const WT = 225, WY = GY + 9, WR = 3.4;
      const tg = [-Math.sin(WT * deg), Math.cos(WT * deg)];
      const shutL = w.prop({ name: 'shutL', pivot: [C + Math.cos(WT * deg) * (R - 1), WY, C + Math.sin(WT * deg) * (R - 1)] });
      const shutR = w.prop({ name: 'shutR', pivot: [C + Math.cos(WT * deg) * (R - 1), WY, C + Math.sin(WT * deg) * (R - 1)] });
      for (let z = C - R - 4; z <= C; z++) for (let x = C - R - 4; x <= C; x++) {
        const [r, th] = pol(x, z);
        if (r < R - 1.2 || r > R + 3) continue;
        const u = (th - WT) * deg * R;
        for (let y = WY - 5; y <= WY + 5; y++) {
          const d = Math.hypot(u, y - WY);
          if (d > WR + 1.2) continue;
          if (r >= R - 0.2) { w.set(x, y, z, d > WR ? B.barkDk : (r > R + 2 ? (hash3(x, y, z) > 0.8 ? B.star : B.nightW) : 0)); continue; }
          if (d <= WR + 0.4 && r < R - 0.5) (u < 0 ? shutL : shutR).set(x, y, z, Math.abs(u) < 0.6 || d > WR - 0.3 ? B.barkDk : B.plank);
        }
      }
      lights.push({ name: 'star', p: [C + Math.cos(WT * deg) * (R - 3), WY, C + Math.sin(WT * deg) * (R - 3)], c: '#c8e0ff', i: 0.5, d: 22, flicker: 0.02, srcR: 5 });
      acts.push({
        name: '별빛 천창 열기', hint: '서재 위 둥근 천창의 덧문이 양쪽으로 밀려나며 별빛이 회의장에 쏟아져요', hit: [at(R - 2, WT)[0] - 3, WY - 4, at(R - 2, WT)[1] - 3, at(R - 2, WT)[0] + 3, WY + 4, at(R - 2, WT)[1] + 3],
        run: async a => {
          await Promise.all([a.move('shutL', [-tg[0] * 4, 0, -tg[1] * 4], 1.6), a.move('shutR', [tg[0] * 4, 0, tg[1] * 4], 1.6)]);
          a.flash('star', 5, 4); a.glow(1.4, 4);
          for (let k = 0; k < 8; k++) { a.burst([C + Math.cos(WT * deg) * (R - 4 - k * 1.6) + 0.5, WY - k * 1.2, C + Math.sin(WT * deg) * (R - 4 - k * 1.6) + 0.5], { n: 14, colors: ['#f0f8ff', '#c8e0ff', '#fff8d8'], speed: 0.8, up: -0.6, life: 2.2, gravity: 0.4, spread: 1.6 }); await a.wait(0.3); }
          await a.wait(1.2);
          await Promise.all([a.move('shutL', [0, 0, 0], 1.4), a.move('shutR', [0, 0, 0], 1.4)]);
        },
      });

      // ── 가운데: 은잎 둥근 탁자와 뿌리 의자 여덟 ──
      for (let z = C - 4; z <= C + 4; z++) for (let x = C - 4; x <= C + 4; x++) {
        const r = Math.hypot(x - C, z - C);
        if (r <= 1.5) w.set(x, G + 1, z, B.root);
        if (r <= 3.6) w.set(x, G + 2, z, r > 3 ? B.heartDk : (r < 1 ? B.silverL : ((Math.round(Math.atan2(z - C, x - C) * 2.6) & 1) ? B.silver : B.heart)));
      }
      for (let k = 0; k < 8; k++) {
        const th = k * 45 + 22.5, [x, z] = at(6.6, th), [bx, bz] = at(7.8, th);
        w.set(x, G + 1, z, B.root); w.set(x, G + 2, z, B.cush);
        w.box(bx, G + 1, bz, bx, G + 3, bz, B.root); w.set(bx, G + 4, bz, k % 2 ? B.leafW : B.rootL);
      }
      for (let z = C - 10; z <= C + 10; z++) for (let x = C - 10; x <= C + 10; x++) { const r = Math.hypot(x - C, z - C); if (r > 9 && r <= 10.2 && !w.get(x, G + 1, z)) w.set(x, G, z, B.rug); }
      // 떠 있는 달빛 수정(부품, 둥실)
      const orb = w.prop({ name: 'orb', pivot: [C + 0.5, G + 9, C + 0.5], bob: 0.35, bobSpeed: 0.8 });
      orb.set(C, G + 9, C, B.crystal); orb.set(C, G + 10, C, B.crystal); orb.set(C, G + 8, C, B.crystal);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) orb.set(C + dx, G + 9, C + dz, B.crystal);
      lights.push({ name: 'council', p: [C + 0.5, G + 9, C + 0.5], c: '#b8f8ff', i: 1.1, d: 30, flicker: 0.05, srcR: 3 });
      landmarks.push({ name: '은잎 둥근 탁자', note: '뿌리 의자 여덟 자리', p: [C + 0.5, G + 14, C + 0.5] });

      // 달빛 수정 등: 뿌리 받침 위 수정 넷
      const lampsP = [];
      for (const th of [80, 160, 330, 20]) {
        const [x, z] = at(13, th);
        w.box(x, G + 1, z, x, G + 3, z, B.root); w.set(x - 1, G + 1, z, B.rootL); w.set(x, G + 1, z + 1, B.rootL);
        w.set(x, G + 4, z, B.crystal); w.set(x, G + 5, z, B.leafW);
        lampsP.push([x + 0.5, G + 5, z + 0.5]);
      }
      lights.push({ name: 'lamps', p: lampsP[0], c: '#9af0ff', i: 0.6, d: 14, flicker: 0.08 });
      lights.push({ name: 'lamps', p: lampsP[1], c: '#9af0ff', i: 0.6, d: 14, flicker: 0.08 });
      acts.push({
        name: '회의 등불 켜기', hint: '달빛 수정 등과 떠 있는 수정이 차례로 밝아지며 회의가 시작돼요', hit: [C - 4, G + 1, C - 4, C + 4, G + 3, C + 4],
        run: async a => {
          for (const p of lampsP) { a.burst(p, { n: 16, colors: ['#b8f8ff', '#ffffff', '#8affe0'], speed: 1.4, up: 2, life: 1.6, gravity: -0.3, spread: 0.8 }); await a.wait(0.35); }
          a.flash('lamps', 3, 3.6); a.flash('council', 3, 3.6); a.glow(1.5, 3.6);
          for (let k = 0; k < 8; k++) { const th = k * 45 + 22.5; a.burst([C + 0.5 + Math.cos(th * deg) * 6.6, G + 3, C + 0.5 + Math.sin(th * deg) * 6.6], { n: 8, colors: ['#d8fff0', '#ffe08a'], speed: 0.8, up: 2.4, life: 2, gravity: -0.3, spread: 0.6 }); await a.wait(0.15); }
          await a.wait(1.2);
        },
      });

      // 두루마리 펼치기: 탁자 위 두루마리(부품)가 길게 풀리며 빛 글자가 떠오른다
      const scroll = w.prop({ name: 'scroll', pivot: [C + 0.5, G + 3, C + 2.5], scl0: [1, 1, 0.34] });
      scroll.box(C, G + 3, C - 1, C, G + 3, C + 2, B.scroll); scroll.set(C, G + 3, C - 1, B.tie); scroll.set(C, G + 3, C + 2, B.tie);
      // 아래 서가: 회랑 밑 두루마리 칸
      for (let th = 150; th <= 244; th += 1.2) {
        const [x, z] = at(R - 0.6, th), [x2, z2] = at(R - 1.5, th);
        for (let y = G + 1; y <= G + 8; y++) w.set(x, y, z, B.heartDk);
        for (const y of [G + 1, G + 3, G + 5, G + 7]) { if (w.get(x2, y, z2)) continue; w.set(x2, y, z2, hash3(x2, y, z2) > 0.25 ? B.scroll : B.tie); }
        for (const y of [G + 2, G + 4, G + 6, G + 8]) if (!w.get(x2, y, z2)) w.set(x2, y, z2, B.heart);
      }
      acts.push({
        name: '두루마리 펼치기', hint: '탁자 위 두루마리가 길게 풀리고 옛 엘프 글자가 빛으로 떠올라요', hit: [C - 1, G + 2, C - 2, C + 1, G + 4, C + 3],
        run: async a => {
          await a.tween('scroll', { scl: [1, 1, 1.6] }, 1.2);
          for (let k = 0; k < 6; k++) { a.burst([C + 0.5, G + 4 + k * 0.6, C + 0.5 + (k % 3) - 1], { n: 10, colors: ['#d8fff0', '#ffe08a', '#ffffff'], speed: 0.6, up: 1.6, life: 2, gravity: -0.4, spread: 0.6 }); await a.wait(0.3); }
          for (let k = 0; k < 5; k++) { const [x, z] = at(R - 2.5, 160 + k * 18); a.burst([x + 0.5, G + 5, z + 0.5], { n: 6, colors: ['#efe4c4', '#ffe08a'], speed: 1, up: 1.4, life: 1.6, gravity: 0.2, spread: 0.8 }); }
          await a.wait(1.4);
          await a.tween('scroll', { scl: [1, 1, 0.34] }, 1);
        },
      });

      // 장로의 하프: 회랑 위 서재 곁
      const [hx, hz] = at(R - 3.2, 150);
      const harp = w.prop({ name: 'harp', pivot: [hx + 0.5, GY + 1, hz + 0.5], axis: 'z' });
      const hs = (x, y, z, b) => { if (!w.get(x, y, z)) harp.set(x, y, z, b); };
      for (let z = hz; z <= hz + 2; z++) hs(hx, GY + 1, z, B.gold);
      for (let y = GY + 2; y <= GY + 6; y++) hs(hx, y, hz, B.gold);
      hs(hx, GY + 6, hz + 1, B.gold); hs(hx, GY + 5, hz + 2, B.gold); hs(hx, GY + 4, hz + 3, B.gold);
      for (let k = 1; k <= 2; k++) for (let y = GY + 2; y <= GY + 4 + (k === 1 ? 1 : 0); y++) hs(hx, y, hz + k, B.string);
      acts.push({
        name: '장로의 하프', hint: '서재 곁 금빛 하프가 둥실 떠올라 저절로 울리며 은빛 음표가 회랑을 따라 흘러요', hit: [hx - 1, GY + 1, hz - 1, hx + 1, GY + 6, hz + 3],
        run: async a => {
          await a.move('harp', [0, 2, 0], 0.8);
          for (let k = 0; k < 6; k++) {
            await a.turn('harp', [0, 0, 0.22], 0.2);
            a.burst([hx + 0.5, GY + 5, hz + 1.5], { n: 8, colors: ['#f4f0d8', '#d8fff0', '#ffe08a'], speed: 1.6, up: 1.2, life: 1.8, gravity: -0.3, spread: 0.6 });
            const [x, z] = at(R - 4, 160 + k * 14); a.burst([x + 0.5, GY + 3, z + 0.5], { n: 6, colors: ['#f4f0d8', '#c8e0ff'], speed: 0.6, up: 1, life: 1.4, gravity: -0.2, spread: 0.4 });
            await a.turn('harp', [0, 0, -0.22], 0.2);
          }
          await a.turn('harp', [0, 0, 0], 0.3);
          await a.move('harp', [0, 0, 0], 0.8);
        },
      });

      // 나뭇잎 바람: 벽 잎 띠에서 은잎이 소용돌이친다
      acts.push({
        name: '나뭇잎 바람', hint: '줄기 속으로 바람이 불어 들며 은잎이 회의장을 한 바퀴 휘감아요', hit: [at(R - 2, 110)[0] - 2, G + 1, at(R - 2, 110)[1] - 2, at(R - 2, 110)[0] + 2, G + 4, at(R - 2, 110)[1] + 2],
        run: async a => {
          a.wind(2.5, 3.6);
          for (let k = 0; k < 16; k++) { const th = k * 22.5, r = 15 - k * 0.5; a.burst([C + 0.5 + Math.cos(th * deg) * r, G + 3 + k * 0.6, C + 0.5 + Math.sin(th * deg) * r], { n: 10, colors: ['#c8e8d8', '#8ab8a0', '#d8fff0'], speed: 2, up: 1, life: 1.8, gravity: 0.3, spread: 1, flat: true }); await a.wait(0.16); }
        },
      });
      // 굵은 뿌리(바닥 위를 기어 나온 낮은 턱)
      for (const th of [110, 175]) for (let r = R; r >= R - 5; r -= 0.5) {
        const t = th + (R - r) * 2, [x, z] = at(r, t);
        w.set(x, G + 1, z, r > R - 2 ? B.root : B.rootL);
        if (r > R - 1.2) w.set(x, G + 2, z, B.root);
      }
      // 반딧불 부르기: 벽 아래 빛버섯에서 반딧불이 솟는다
      const [fx, fz] = at(R - 2, 45);
      w.set(fx, G + 1, fz, B.mushG); w.set(fx + 1, G + 1, fz, B.mushG); w.set(fx, G + 1, fz - 1, B.flower);
      acts.push({
        name: '반딧불 부르기', hint: '벽 아래 빛버섯을 두드리면 반딧불이 떼 지어 천창까지 날아올라요', hit: [fx - 2, G + 1, fz - 2, fx + 2, G + 3, fz + 2],
        run: async a => {
          a.glow(1.3, 4);
          for (let k = 0; k < 10; k++) { const th = 45 + k * 32; a.burst([C + 0.5 + Math.cos(th * deg) * (R - 3), G + 2 + k * 1.6, C + 0.5 + Math.sin(th * deg) * (R - 3)], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 1.2, up: 2.2, life: 2.6, gravity: -0.35, spread: 1.4 }); await a.wait(0.25); }
        },
      });
      landmarks.push({ name: '장로의 서재', note: '나선 계단 위 윗단 회랑', p: [sx + 0.5, GY + 10, sz + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
