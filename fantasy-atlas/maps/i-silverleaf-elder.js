// 장로의 거목 회의장(하위 지도, HD 144칸 · 1칸 ≈ 25cm) — 은빛잎 마을 가장 오래된 거목의 줄기 속. 나이테와 갈라진 결이 남은 둥근 바닥,
// 뿌리 의자 고리와 은잎 둥근 탁자, 벽을 따라 도는 나선 계단(디딤판·난간 기둥)과 윗단 장로의 서재(회랑), 책등이 낱낱이 보이는 서가와 두루마리 칸,
// 달빛 수정 등, 높은 벽의 별빛 천창. 남동쪽(카메라 쪽) 벽은 낮게 잘랐다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 128, G = 20, C = 72, R = 42;
  MAPS.push({
    id: 'silverleaf-elder', cat: 'village', sub: true, parent: 'silverleaf', name: '장로의 거목 회의장', en: 'Silverleaf · Elder\'s Council Hall', color: '#8ad8b0', seed: 1391, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '천 년 된 거목의 줄기 속을 둥글게 비워 만든 회의장. 바닥에는 나이테가 그대로 남아 있고, 뿌리를 깎은 의자 여덟 개가 은잎 둥근 탁자를 둘러싼다. 벽을 따라 나선 계단이 윗단 장로의 서재로 오르고, 높은 벽의 둥근 천창으로 별빛이 든다.',
    info: { title: '장소 정보', en: 'ELDER HALL', rows: [['자리', '장로의 거목 아랫단 발판 오두막 안'], ['회의', '보름마다 뿌리 의자 여덟 자리'], ['윗단', '장로의 서재 · 두루마리 서가'], ['소문', '거목의 나이를 아는 이는 장로뿐']] },
    sky: ['#24304e', '#0c1226', '#8ad8c8'], stars: true,
    hemi: ['#d8f0e8', '#2a2a22', 0.62], sun: ['#d8e8ff', 0.5, [0.45, 1, 0.55]],
    day: { sky: ['#d8eee4', '#7aa8b8', '#f4ffe8'], stars: false, hemi: ['#f8fff4', '#4a4434', 0.62], sun: ['#fff4dc', 0.66, [0.45, 1, 0.55]], haze: '#c0d8cc' },
    fog: { start: 0.86, floor: G - 8, depth: 12, haze: [16, 0.18, 12], hazeColor: '#3a5048' },
    camY: 8, zoom: 1.3,
    particles: [
      { n: 90, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], mode: 'wisp', speed: 1, size: 2, area: [C, C, 34], y0: G + 4, y1: G + 44 },
      { n: 80, colors: ['#e8dcc0', '#c8d8c8'], mode: 'drift', speed: 0.24, wind: 0.1, area: [C, C, 36], y0: G + 2, y1: G + 48, glow: false },
    ],
    blocks: {
      moss: { c: '#3a2e24', top: '#3e5e44', v: 0.1 }, dirt: { c: '#3a2e24', v: 0.08 },
      bark: { c: '#7a6a58', v: 0.07, pat: 'log' }, barkDk: { c: '#54483c', v: 0.07 }, heart: { c: '#a88660', v: 0.05, pat: 'log' }, heartDk: { c: '#86684a', v: 0.05, pat: 'log' },
      ringA: { c: '#9a7a52', top: '#c09a68', v: 0.03 }, ringB: { c: '#9a7a52', top: '#a8845a', v: 0.03 }, ringC: { c: '#8a6c48', top: '#94744e', v: 0.03 }, pith: { c: '#6a5038', top: '#7a5c40', v: 0.04 },
      root: { c: '#6a5644', v: 0.06 }, rootL: { c: '#84705a', v: 0.06 }, plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, plankDk: { c: '#8a6a44', v: 0.06 }, rope: { c: '#c8b890', v: 0.04 },
      door: { c: '#4a3a2e', v: 0.03, pat: 'plank' }, iron: { c: '#4a4a50', v: 0.03 }, brass: { c: '#e0c060', v: 0.02 },
      leafS: { c: '#8ab8a0', v: 0.09 }, leafT: { c: '#5a9a88', v: 0.09 }, leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 },
      silver: { c: '#c8d4d4', v: 0.03 }, silverL: { c: '#d8fff0', glow: true }, moss2: { c: '#4a6a3a', v: 0.1 },
      scroll: { c: '#efe4c4', v: 0.03 }, tie: { c: '#a8403a', v: 0.03 }, bookG: { c: '#3a6a4a', v: 0.04 }, bookB: { c: '#3a4a7a', v: 0.04 }, bookR: { c: '#7a3a3a', v: 0.04 }, bookT: { c: '#a8885a', v: 0.04 },
      cush: { c: '#4a7a6a', v: 0.04 }, cushL: { c: '#5e9080', v: 0.04 }, rug: { c: '#2e5a52', v: 0.04, pat: 'check', alt: '#3a6a60' },
      crystal: { c: '#b8f8ff', glow: true }, lamp2: { c: '#ffe08a', glow: true }, mushG: { c: '#9ae8f0', glow: true }, flower: { c: '#c8a0ff', v: 0.05 }, mushStem: { c: '#e8e0d0', v: 0.03 },
      nightW: { c: '#1a2850', v: 0.02 }, star: { c: '#f0f8ff', glow: true }, gold: { c: '#e8c860', v: 0.04 }, string: { c: '#f4f0d8', glow: true },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 1, 1, z >> 1) > 0.8 ? B.moss2 : B.moss, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.barkDk });
      const lights = [], acts = [], landmarks = [];
      const deg = Math.PI / 180;
      const pol = (x, z) => { const dx = x - C, dz = z - C; return [Math.hypot(dx, dz), ((Math.atan2(dz, dx) / deg) + 360) % 360]; };
      const at = (r, th) => [Math.round(C + Math.cos(th * deg) * r), Math.round(C + Math.sin(th * deg) * r)];
      const back = th => { const s = Math.cos(th * deg) + Math.sin(th * deg); return s < 0.2; };   // 카메라 반대편(북서쪽 반)
      const TOP = G + 54, GY = G + 24;                                                            // 벽 꼭대기 · 윗단 회랑 바닥
      const SQ = C - R - 8, EQ = C + R + 8;

      // ── 바닥: 나이테와 방사상 갈라짐 ──
      const cracks = [18, 97, 151, 236, 302];
      for (let z = SQ; z <= EQ; z++) for (let x = SQ; x <= EQ; x++) {
        const [r, th] = pol(x, z);
        if (r > R + 0.4) continue;
        const ring = Math.floor(r / 3.4);
        let b = r < 3.2 ? B.pith : (ring % 2 ? B.ringA : (ring % 5 === 2 ? B.ringC : B.ringB));
        for (const c of cracks) if (r > 4 && r < 10 + (c % 7) * 2.6 && Math.abs(((th - c + 540) % 360) - 180) * deg * r < 0.6) b = B.pith;
        w.set(x, G, z, b);
        w.set(x, G - 1, z, B.heartDk);
      }
      // ── 줄기 벽: 안쪽 속살(세로 결), 바깥 껍질. 뒤쪽 반은 높고 앞쪽 반은 낮게(6칸) ──
      for (let z = SQ; z <= EQ; z++) for (let x = SQ; x <= EQ; x++) {
        const [r, th] = pol(x, z);
        if (r <= R + 0.4 || r > R + 6) continue;
        const hb = back(th), top = hb ? TOP - Math.round(hash3(x >> 2, 9, z >> 2) * 4) : G + 6;
        const inner = r < R + 2.6, band = Math.round(th * 0.7);
        for (let y = G; y <= top; y++) {
          let b = inner ? ((band + (y >> 3)) % 5 === 0 ? B.heartDk : B.heart) : (hash3(band >> 1, y >> 2, 7) > 0.8 ? B.barkDk : B.bark);
          if (!hb && y >= top - 1) b = B.barkDk;
          w.set(x, y, z, b);
        }
        if (!hb && r > R + 3.2 && hash3(x >> 1, 3, z >> 1) > 0.55) w.set(x, G + 7, z, hash3(x >> 1, 4, z >> 1) > 0.5 ? B.leafD : B.moss2);
        if (hb && r > R + 3.2) { const hh = hash3(x >> 1, 5, z >> 1); if (hh > 0.4) { w.set(x, top + 1, z, hh > 0.7 ? B.leafT : B.leafS); if (hh > 0.62) w.set(x, top + 2, z, B.leafS); } }
      }
      // 벽 아래 빛버섯과 이끼, 높은 벽의 잎 띠
      for (let k = 0; k < 96; k++) {
        const th = k * 3.75 + 2, [x, z] = at(R - 0.8, th);
        if (w.get(x, G + 1, z)) continue;
        const h = hash3(k, 5, 1);
        if (h > 0.76) { w.set(x, G + 1, z, B.mushStem); w.set(x, G + 2, z, B.mushG); if (h > 0.88) w.set(x, G + 3, z, B.mushG); }
        else if (h > 0.45) { w.set(x, G + 1, z, B.moss2); const [x2, z2] = at(R - 1.8, th); if (!w.get(x2, G + 1, z2)) w.set(x2, G + 1, z2, B.moss2); }
      }
      for (let th = 0; th < 360; th += 1) if (back(th)) { const [x, z] = at(R + 0.4, th); for (const y of [G + 20, TOP - 6]) { const b = (th >> 2) % 3 ? B.leafT : B.leafW; w.set(x, y, z, b); w.set(x, y + 1, z, b); if (hash3(th >> 1, y, 3) > 0.55) { w.set(x, y - 1, z, B.leafS); w.set(x, y - 2, z, B.leafS); } } }

      // ── 동쪽 문(밖으로): 낮은 벽에 문틀만 높게, 판자문·쇠띠·손잡이 ──
      const DX = C + R, DZ = C - 2;
      for (let z = DZ - 3; z <= DZ + 6; z++) for (let x = DX; x <= DX + 5; x++) for (let y = G + 1; y <= G + 12; y++) {
        const open = z >= DZ && z <= DZ + 3 && y <= G + 9;
        const jamb = z <= DZ - 2 || z >= DZ + 5 || y >= G + 10;
        if (open) { w.set(x, y, z, x === DX + 1 ? ((y === G + 3 || y === G + 7) ? B.iron : B.door) : 0); continue; }
        if (jamb) { if (!(y >= G + 11 && (z === DZ - 3 || z === DZ + 6))) w.set(x, y, z, B.barkDk); }
        else w.set(x, y, z, B.barkDk);
      }
      w.set(DX, G + 5, DZ + 2, B.brass);
      w.box(DX - 1, G + 4, DZ - 2, DX - 1, G + 5, DZ - 2, B.lamp2); w.box(DX - 1, G + 4, DZ + 5, DX - 1, G + 5, DZ + 5, B.lamp2); w.set(DX - 1, G + 6, DZ - 2, B.iron); w.set(DX - 1, G + 6, DZ + 5, B.iron);
      for (let z = DZ - 3; z <= DZ + 6; z++) { w.set(DX + 2, G + 13, z, z % 2 ? B.leafW : B.leafS); w.set(DX + 3, G + 13, z, B.leafS); }
      w.box(DX - 7, G, DZ - 1, DX - 1, G, DZ + 4, B.rug);
      lights.push({ name: 'door', p: [DX - 1.5, G + 5, DZ + 2], c: '#ffd890', i: 0.6, d: 20, flicker: 0.12 });
      acts.push(OR.goAct({ at: [DX - 2, G + 1, DZ + 2], name: '밖으로 나가기', goto: 'silverleaf', hint: '동쪽 문을 열고 장로의 거목 아랫단 발판으로 나가요', hit: [DX - 2, G + 1, DZ, DX, G + 9, DZ + 3], h: 8 }));

      // ── 나선 계단: 북동쪽 벽을 따라 300°에서 250°까지 24단, 윗단 회랑으로 ──
      const S0 = 300, S1 = 250, NS = 24;
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const [r, th] = pol(x, z);
        if (r > R + 0.4 || r < R - 7.2 || th > S0 || th < S1) continue;
        const step = Math.min(NS - 1, Math.floor((S0 - th) / (S0 - S1) * NS)), ty = G + 1 + step;
        for (let y = G + 1; y <= ty; y++) w.set(x, y, z, y === ty ? (r < R - 6.4 ? B.plankDk : B.plank) : (y === ty - 1 ? B.plankDk : B.heartDk));
        if (r < R - 6.2) { const post = step % 4 === 1; if (post) w.box(x, ty + 1, z, x, ty + 4, z, B.barkDk); else w.set(x, ty + 4, z, B.rope); }
      }
      for (let i = 1; i < NS; i += 8) { const th = S0 - (i + 0.5) * (S0 - S1) / NS, [x, z] = at(R - 6.8, th); w.set(x, G + 6 + i, z, B.iron); w.box(x, G + 7 + i, z, x, G + 8 + i, z, B.lamp2); }
      lights.push({ name: 'stair', p: [at(R - 6, 275)[0] + 0.5, G + 18, at(R - 6, 275)[1] + 0.5], c: '#ffd890', i: 0.6, d: 24, flicker: 0.1, srcR: 6 });

      // ── 윗단 회랑(장로의 서재): 135°~252°, 바닥 GY ──
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const [r, th] = pol(x, z);
        if (r > R + 0.4 || r < R - 13 || th < 135 || th > 253) continue;
        w.set(x, GY, z, ((x + z) % 5 === 0) ? B.plankDk : B.plank); w.set(x, GY - 1, z, B.heartDk);
        if (r < R - 11.4) {
          for (let y = GY + 1; y <= GY + 5; y++) w.set(x, y, z, 0);
          const post = Math.round(th) % 9 < 1;
          if (post) w.box(x, GY + 1, z, x, GY + 5, z, B.barkDk); else { w.set(x, GY + 5, z, B.rope); w.set(x, GY + 3, z, B.rope); }
        }
      }
      for (const th of [140, 170, 200, 230]) { const [x, z] = at(R - 12, th); w.box(x, G + 1, z, x + 1, GY - 2, z + 1, B.root); w.box(x - 1, G + 1, z - 1, x + 2, G + 2, z + 2, B.rootL); w.set(x, GY + 6, z, B.leafW); }
      // 서재: 책등이 보이는 서가(칸판 세 단), 책상, 수정 등, 방석
      const BOOKS = [B.bookG, B.bookB, B.bookR, B.bookT];
      for (let th = 140; th <= 246; th += 0.6) {
        if (th > 212 && th < 238) continue;                                            // 천창 아래는 비운다
        const [x, z] = at(R - 1.2, th), [x2, z2] = at(R - 2.8, th);
        for (let y = GY + 1; y <= GY + 12; y++) w.set(x, y, z, B.heartDk);
        for (const y0 of [GY + 1, GY + 5, GY + 9]) {
          if (w.get(x2, y0, z2)) continue;
          const bk = Math.floor(th / 0.9), h = hash3(bk, y0, 7), ht = h > 0.3 ? 3 : 2;
          for (let y = y0; y < y0 + ht; y++) w.set(x2, y, z2, BOOKS[(h * 40 | 0) % 4]);
        }
        for (const y of [GY + 4, GY + 8, GY + 12]) w.set(x2, y, z2, B.heart);
      }
      const [sx, sz] = at(R - 6.8, 192);
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.box(sx + dx, GY + 1, sz + dz, sx + dx, GY + 3, sz + dz, B.root);
      w.box(sx - 2, GY + 4, sz - 2, sx + 2, GY + 4, sz + 2, B.plank);
      w.box(sx - 1, GY + 5, sz, sx + 1, GY + 5, sz, B.scroll); w.set(sx - 1, GY + 5, sz, B.tie); w.box(sx + 2, GY + 5, sz, sx + 2, GY + 6, sz, B.crystal); w.box(sx - 2, GY + 5, sz + 1, sx - 1, GY + 5, sz + 2, B.bookB);
      { const [cx2, cz2] = at(R - 10, 196); w.box(cx2, GY + 1, cz2, cx2 + 1, GY + 1, cz2 + 1, B.cush); }
      lights.push({ name: 'study', p: [sx + 2.5, GY + 7, sz + 0.5], c: '#b8f8ff', i: 0.8, d: 28, flicker: 0.06 });

      // ── 별빛 천창: 225° 높은 벽의 둥근 창(덧문 두 짝은 부품) ──
      const WT = 225, WY = GY + 18, WR = 6.8;
      const tg = [-Math.sin(WT * deg), Math.cos(WT * deg)];
      const shutL = w.prop({ name: 'shutL', pivot: [C + Math.cos(WT * deg) * (R - 2), WY, C + Math.sin(WT * deg) * (R - 2)] });
      const shutR = w.prop({ name: 'shutR', pivot: [C + Math.cos(WT * deg) * (R - 2), WY, C + Math.sin(WT * deg) * (R - 2)] });
      for (let z = SQ; z <= C; z++) for (let x = SQ; x <= C; x++) {
        const [r, th] = pol(x, z);
        if (r < R - 2.4 || r > R + 6) continue;
        const u = (th - WT) * deg * R;
        for (let y = WY - 10; y <= WY + 10; y++) {
          const d = Math.hypot(u, y - WY);
          if (d > WR + 2.4) continue;
          if (r >= R - 0.4) { w.set(x, y, z, d > WR ? B.barkDk : (r > R + 4 ? (hash3(x, y, z) > 0.8 ? B.star : B.nightW) : (Math.abs(u) < 0.5 || Math.abs(y - WY) < 0.5 ? B.barkDk : 0))); continue; }
          if (d <= WR + 0.8 && r < R - 1) (u < 0 ? shutL : shutR).set(x, y, z, Math.abs(u) < 1.2 || d > WR - 0.6 || Math.abs(y - WY) < 0.5 ? B.barkDk : B.plank);
        }
      }
      lights.push({ name: 'star', p: [C + Math.cos(WT * deg) * (R - 6), WY, C + Math.sin(WT * deg) * (R - 6)], c: '#c8e0ff', i: 0.5, d: 44, flicker: 0.02, srcR: 10 });
      acts.push({
        name: '별빛 천창 열기', hint: '서재 위 둥근 천창의 덧문이 양쪽으로 밀려나며 별빛이 회의장에 쏟아져요', hit: [at(R - 4, WT)[0] - 6, WY - 8, at(R - 4, WT)[1] - 6, at(R - 4, WT)[0] + 6, WY + 8, at(R - 4, WT)[1] + 6],
        run: async a => {
          await Promise.all([a.move('shutL', [-tg[0] * 8, 0, -tg[1] * 8], 1.6), a.move('shutR', [tg[0] * 8, 0, tg[1] * 8], 1.6)]);
          a.flash('star', 5, 4); a.glow(1.4, 4);
          for (let k = 0; k < 8; k++) { a.burst([C + Math.cos(WT * deg) * (R - 8 - k * 3.2) + 0.5, WY - k * 2.4, C + Math.sin(WT * deg) * (R - 8 - k * 3.2) + 0.5], { n: 14, colors: ['#f0f8ff', '#c8e0ff', '#fff8d8'], speed: 1.6, up: -1.2, life: 2.2, gravity: 0.8, spread: 3.2 }); await a.wait(0.3); }
          await a.wait(1.2);
          await Promise.all([a.move('shutL', [0, 0, 0], 1.4), a.move('shutR', [0, 0, 0], 1.4)]);
        },
      });

      // ── 가운데: 은잎 둥근 탁자와 뿌리 의자 여덟 ──
      for (let z = C - 8; z <= C + 8; z++) for (let x = C - 8; x <= C + 8; x++) {
        const r = Math.hypot(x - C, z - C), a = Math.atan2(z - C, x - C);
        if (r <= 3) w.box(x, G + 1, z, x, G + 3, z, (Math.round(a * 3) & 1) ? B.root : B.rootL);
        if (r <= 4.4 && r > 3) w.set(x, G + 1, z, B.root);
        if (r <= 7.2) w.set(x, G + 4, z, r > 6.2 ? B.heartDk : (r < 2 ? B.silverL : ((Math.round(a * 2.6) & 1) ? B.silver : B.heart)));
      }
      for (let k = 0; k < 8; k++) {
        const th = k * 45 + 22.5, [x, z] = at(13.2, th), [bx, bz] = at(15.6, th);
        w.box(x - 1, G + 1, z - 1, x + 1, G + 2, z + 1, B.root); w.box(x - 1, G + 3, z - 1, x + 1, G + 3, z + 1, B.cush); w.set(x, G + 3, z, B.cushL);
        w.box(bx, G + 1, bz, bx, G + 7, bz, B.root); w.box(bx - 1, G + 1, bz - 1, bx + 1, G + 2, bz + 1, B.root); w.set(bx, G + 8, bz, k % 2 ? B.leafW : B.rootL);
      }
      for (let z = C - 21; z <= C + 21; z++) for (let x = C - 21; x <= C + 21; x++) { const r = Math.hypot(x - C, z - C); if (r > 18 && r <= 20.4 && !w.get(x, G + 1, z)) w.set(x, G, z, B.rug); }
      // 떠 있는 달빛 수정(부품, 둥실)
      const orb = w.prop({ name: 'orb', pivot: [C + 0.5, G + 18, C + 0.5], bob: 0.7, bobSpeed: 0.8 });
      for (let dy = -3; dy <= 3; dy++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dx) + Math.abs(dz) + Math.abs(dy) * 0.7 <= 2.2) orb.set(C + dx, G + 18 + dy, C + dz, B.crystal);
      orb.box(C, G + 22, C, C, G + 23, C, B.crystal); orb.box(C, G + 13, C, C, G + 14, C, B.crystal);
      lights.push({ name: 'council', p: [C + 0.5, G + 18, C + 0.5], c: '#b8f8ff', i: 1.1, d: 60, flicker: 0.05, srcR: 6 });
      landmarks.push({ name: '은잎 둥근 탁자', note: '뿌리 의자 여덟 자리', p: [C + 0.5, G + 28, C + 0.5] });

      // 달빛 수정 등: 뿌리 받침 위 수정 넷
      const lampsP = [];
      for (const th of [80, 160, 330, 20]) {
        const [x, z] = at(26, th);
        w.box(x, G + 1, z, x, G + 6, z, B.root); w.box(x - 2, G + 1, z, x - 1, G + 2, z, B.rootL); w.box(x, G + 1, z + 1, x, G + 3, z + 2, B.rootL); w.box(x + 1, G + 1, z - 1, x + 1, G + 1, z - 2, B.root);
        w.box(x, G + 7, z, x, G + 9, z, B.crystal); w.set(x - 1, G + 7, z, B.crystal); w.set(x, G + 7, z - 1, B.crystal); w.set(x, G + 10, z, B.leafW); w.set(x + 1, G + 10, z, B.leafW);
        lampsP.push([x + 0.5, G + 9, z + 0.5]);
      }
      lights.push({ name: 'lamps', p: lampsP[0], c: '#9af0ff', i: 0.6, d: 28, flicker: 0.08 });
      lights.push({ name: 'lamps', p: lampsP[1], c: '#9af0ff', i: 0.6, d: 28, flicker: 0.08 });
      acts.push({
        name: '회의 등불 켜기', hint: '달빛 수정 등과 떠 있는 수정이 차례로 밝아지며 회의가 시작돼요', hit: [C - 8, G + 1, C - 8, C + 8, G + 6, C + 8],
        run: async a => {
          for (const p of lampsP) { a.burst(p, { n: 16, colors: ['#b8f8ff', '#ffffff', '#8affe0'], speed: 2.8, up: 4, life: 1.6, gravity: -0.6, spread: 1.6 }); await a.wait(0.35); }
          a.flash('lamps', 3, 3.6); a.flash('council', 3, 3.6); a.glow(1.5, 3.6);
          for (let k = 0; k < 8; k++) { const th = k * 45 + 22.5; a.burst([C + 0.5 + Math.cos(th * deg) * 13.2, G + 6, C + 0.5 + Math.sin(th * deg) * 13.2], { n: 8, colors: ['#d8fff0', '#ffe08a'], speed: 1.6, up: 4.8, life: 2, gravity: -0.6, spread: 1.2 }); await a.wait(0.15); }
          await a.wait(1.2);
        },
      });

      // 두루마리 펼치기: 탁자 위 두루마리(부품)가 길게 풀리며 빛 글자가 떠오른다
      const scroll = w.prop({ name: 'scroll', pivot: [C + 0.5, G + 5, C + 4], scl0: [1, 1, 0.34] });
      scroll.box(C - 1, G + 5, C - 2, C + 1, G + 5, C + 3, B.scroll); scroll.box(C - 1, G + 5, C - 2, C + 1, G + 5, C - 2, B.tie); scroll.box(C - 1, G + 5, C + 3, C + 1, G + 5, C + 3, B.tie);
      scroll.set(C - 2, G + 5, C - 2, B.gold); scroll.set(C + 2, G + 5, C - 2, B.gold); scroll.set(C - 2, G + 5, C + 3, B.gold); scroll.set(C + 2, G + 5, C + 3, B.gold);
      // 아래 서가: 회랑 밑 두루마리 칸(둥근 끝과 끈)
      for (let th = 150; th <= 244; th += 0.6) {
        const [x, z] = at(R - 1.2, th), [x2, z2] = at(R - 3, th);
        for (let y = G + 1; y <= G + 16; y++) w.set(x, y, z, B.heartDk);
        for (const y of [G + 1, G + 5, G + 9, G + 13]) {
          if (w.get(x2, y, z2)) continue;
          const roll = Math.floor(th / 1.2), h = hash3(roll, y, 5);
          w.set(x2, y, z2, B.scroll); w.set(x2, y + 1, z2, h > 0.75 ? B.tie : B.scroll); if (h > 0.4) w.set(x2, y + 2, z2, B.scroll);
        }
        for (const y of [G + 4, G + 8, G + 12, G + 16]) if (!w.get(x2, y, z2)) w.set(x2, y, z2, B.heart);
      }
      acts.push({
        name: '두루마리 펼치기', hint: '탁자 위 두루마리가 길게 풀리고 옛 엘프 글자가 빛으로 떠올라요', hit: [C - 2, G + 4, C - 4, C + 2, G + 8, C + 6],
        run: async a => {
          await a.tween('scroll', { scl: [1, 1, 1.6] }, 1.2);
          for (let k = 0; k < 6; k++) { a.burst([C + 0.5, G + 8 + k * 1.2, C + 0.5 + ((k % 3) - 1) * 2], { n: 10, colors: ['#d8fff0', '#ffe08a', '#ffffff'], speed: 1.2, up: 3.2, life: 2, gravity: -0.8, spread: 1.2 }); await a.wait(0.3); }
          for (let k = 0; k < 5; k++) { const [x, z] = at(R - 5, 160 + k * 18); a.burst([x + 0.5, G + 10, z + 0.5], { n: 6, colors: ['#efe4c4', '#ffe08a'], speed: 2, up: 2.8, life: 1.6, gravity: 0.4, spread: 1.6 }); }
          await a.wait(1.4);
          await a.tween('scroll', { scl: [1, 1, 0.34] }, 1);
        },
      });

      // 장로의 하프: 회랑 위 서재 곁(받침, 기둥, 목, 줄 넷)
      const [hx, hz] = at(R - 6.4, 150);
      const harp = w.prop({ name: 'harp', pivot: [hx + 0.5, GY + 1, hz + 2.5], axis: 'z' });
      const hs = (x, y, z, b) => { if (!w.get(x, y, z)) harp.set(x, y, z, b); };
      for (let z = hz - 1; z <= hz + 5; z++) hs(hx, GY + 1, z, B.gold);
      for (let y = GY + 2; y <= GY + 12; y++) hs(hx, y, hz, B.gold);
      for (let k = 1; k <= 6; k++) hs(hx, GY + 12 - Math.round(k * 0.9), hz + k, B.gold);
      hs(hx, GY + 7, hz + 6, B.gold); hs(hx, GY + 6, hz + 6, B.gold); hs(hx, GY + 13, hz, B.gold);
      for (let k = 1; k <= 5; k++) for (let y = GY + 2; y <= GY + 11 - Math.round(k * 0.9); y++) hs(hx, y, hz + k, B.string);
      acts.push({
        name: '장로의 하프', hint: '서재 곁 금빛 하프가 둥실 떠올라 저절로 울리며 은빛 음표가 회랑을 따라 흘러요', hit: [hx - 2, GY + 1, hz - 2, hx + 2, GY + 12, hz + 6],
        run: async a => {
          await a.move('harp', [0, 4, 0], 0.8);
          for (let k = 0; k < 6; k++) {
            await a.turn('harp', [0, 0, 0.22], 0.2);
            a.burst([hx + 0.5, GY + 10, hz + 3], { n: 8, colors: ['#f4f0d8', '#d8fff0', '#ffe08a'], speed: 3.2, up: 2.4, life: 1.8, gravity: -0.6, spread: 1.2 });
            const [x, z] = at(R - 8, 160 + k * 14); a.burst([x + 0.5, GY + 6, z + 0.5], { n: 6, colors: ['#f4f0d8', '#c8e0ff'], speed: 1.2, up: 2, life: 1.4, gravity: -0.4, spread: 0.8 });
            await a.turn('harp', [0, 0, -0.22], 0.2);
          }
          await a.turn('harp', [0, 0, 0], 0.3);
          await a.move('harp', [0, 0, 0], 0.8);
        },
      });

      // 나뭇잎 바람: 벽 잎 띠에서 은잎이 소용돌이친다
      acts.push({
        name: '나뭇잎 바람', hint: '줄기 속으로 바람이 불어 들며 은잎이 회의장을 한 바퀴 휘감아요', hit: [at(R - 4, 110)[0] - 4, G + 1, at(R - 4, 110)[1] - 4, at(R - 4, 110)[0] + 4, G + 8, at(R - 4, 110)[1] + 4],
        run: async a => {
          a.wind(2.5, 3.6);
          for (let k = 0; k < 16; k++) { const th = k * 22.5, r = 30 - k; a.burst([C + 0.5 + Math.cos(th * deg) * r, G + 6 + k * 1.2, C + 0.5 + Math.sin(th * deg) * r], { n: 10, colors: ['#c8e8d8', '#8ab8a0', '#d8fff0'], speed: 4, up: 2, life: 1.8, gravity: 0.6, spread: 2, flat: true }); await a.wait(0.16); }
        },
      });
      // 굵은 뿌리(바닥 위를 기어 나온 낮은 턱)
      for (const th of [110, 175]) for (let r = R; r >= R - 10; r -= 0.5) {
        const t = th + (R - r) * 1, [x, z] = at(r, t), thick = r > R - 4 ? 1 : 0;
        for (let q = -thick; q <= thick; q++) { const [x2, z2] = at(r, t + q * 1.6); w.set(x2, G + 1, z2, r > R - 4 ? B.root : B.rootL); }
        if (r > R - 2.4) { w.set(x, G + 2, z, B.root); w.set(x, G + 3, z, B.root); }
        else if (r > R - 6) w.set(x, G + 2, z, B.root);
      }
      // 반딧불 부르기: 벽 아래 빛버섯에서 반딧불이 솟는다
      const [fx, fz] = at(R - 4, 45);
      for (const [dx, dz, ht] of [[0, 0, 3], [2, 0, 2], [0, -2, 2], [1, 2, 1]]) { w.box(fx + dx, G + 1, fz + dz, fx + dx, G + ht, fz + dz, B.mushStem); for (const [ex, ez] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(fx + dx + ex, G + ht + 1, fz + dz + ez, B.mushG); }
      w.set(fx - 2, G + 1, fz - 2, B.flower); w.set(fx - 3, G + 1, fz, B.flower);
      acts.push({
        name: '반딧불 부르기', hint: '벽 아래 빛버섯을 두드리면 반딧불이 떼 지어 천창까지 날아올라요', hit: [fx - 4, G + 1, fz - 4, fx + 4, G + 6, fz + 4],
        run: async a => {
          a.glow(1.3, 4);
          for (let k = 0; k < 10; k++) { const th = 45 + k * 32; a.burst([C + 0.5 + Math.cos(th * deg) * (R - 6), G + 4 + k * 3.2, C + 0.5 + Math.sin(th * deg) * (R - 6)], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 2.4, up: 4.4, life: 2.6, gravity: -0.7, spread: 2.8 }); await a.wait(0.25); }
        },
      });
      landmarks.push({ name: '장로의 서재', note: '나선 계단 위 윗단 회랑', p: [sx + 0.5, GY + 20, sz + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
