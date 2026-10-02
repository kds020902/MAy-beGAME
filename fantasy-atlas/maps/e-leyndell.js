// 도읍 로데일 · 엘데의 왕좌 — 황금 나무 밑동 앞 원형 테라스, 가시로 봉인된 문과 왕좌 (메인 보스: 축복왕 모르고트)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  MAPS.push({
    id: 'leyndell', cat: 'lands', name: '도읍 로데일', en: 'Leyndell · Elden Throne', color: '#e0b84a', seed: 501, base: 52, time: 'day', size: [W, D, Hh],
    desc: '여왕의 규방에서 계단을 오르면 황금 나무 밑동 앞 원형 테라스가 펼쳐진다. 가시로 봉인된 문 앞 엘데의 왕좌를 축복왕이 지킨다.',
    monsters: { normal: ['로데일 기사', '신탁의 사자', '황금 나무의 화신'], mid: '첫 왕 고드프리(분신)', boss: '축복왕 모르고트' },
    sky: ['#f4dca6', '#8aa0c4', '#fff0c4'], stars: false,
    hemi: ['#fff4dc', '#5a5038', 0.62], sun: ['#fff0d0', 0.8, [0.45, 1, 0.6]],
    night: { sky: ['#3a3040', '#0b0d1a', '#e8c070'], stars: true, hemi: ['#c8b4a0', '#201a14', 0.5], sun: ['#ffe0a0', 0.42, [0.45, 1, 0.6]], haze: '#3a3028' },
    liquid: ['#5a8aa0', '#8ac0d0', '#e8ffff'], liqSpeed: 0.6,
    fog: { start: 0.78, floor: 18, depth: 12, haze: [30, 0.3, 14], hazeColor: '#e8d8b0', top: 124, topDepth: 18 },
    camY: 8, zoom: 1.25,
    particles: [
      { n: 1200, colors: ['#ffd25a', '#f0b040', '#ffe9a0', '#e89a30'], mode: 'fall', speed: 0.45, wind: 0.4, y0: 20, y1: 140, glow: true },
      { n: 220, colors: ['#fff0b0', '#ffd870'], mode: 'rise', speed: 0.5, area: [96, 40, 24], y0: 52, y1: 140, glow: true },
    ],
    blocks: {
      grass: { c: '#5e5434', top: '#8e8a4a', v: 0.1 }, soil: { c: '#5a4a34', v: 0.08 }, rock: { c: '#8a8070', v: 0.06, pat: 'big' }, rockDk: { c: '#6c6458', v: 0.06, pat: 'stone' },
      pave: { c: '#b8ae98', top: '#d2c9b0', v: 0.05, pat: 'check', alt: '#c4baa2' }, pave2: { c: '#a89e88', top: '#beb49c', v: 0.06, pat: 'stone' }, litter: { c: '#d8a830', top: '#f0c040', v: 0.12 },
      lime: { c: '#d8ceb4', v: 0.04, pat: 'brick' }, limeDk: { c: '#b4a88e', v: 0.05, pat: 'brick' }, limeLt: { c: '#ece4cc', v: 0.03 }, trim: { c: '#f2ead2', v: 0.02 },
      wallS: { c: '#c8bea4', v: 0.05, pat: 'big' }, wallSd: { c: '#a89c84', v: 0.05, pat: 'big' },
      gold: { c: '#d8b048', v: 0.05 }, goldDk: { c: '#a8842c', v: 0.05 }, domeG: { c: '#d8ac44', v: 0.05, pat: 'tile' },
      slate: { c: '#56606c', v: 0.05, pat: 'tile' }, slateDk: { c: '#3e4652', v: 0.04 },
      win: { c: '#ffd890', night: true, day: '#5a5a62' }, glassG: { c: '#ffd070', glow: true },
      wood: { c: '#6a4c30', v: 0.06, pat: 'plank' }, iron: { c: '#3a3a40', v: 0.03 }, door: { c: '#7a5a34', v: 0.04, pat: 'plank' },
      erd: { c: '#ffd25a', glow: true }, erd2: { c: '#f2b440', glow: true }, erdBark: { c: '#bfa064', v: 0.08, pat: 'big' }, erdBarkDk: { c: '#8e7448', v: 0.08 }, erdPale: { c: '#d8ccaa', v: 0.07 },
      leafG: { c: '#d8a830', top: '#f2c850', v: 0.1 }, leafO: { c: '#c8882a', top: '#e8a440', v: 0.1 }, bark: { c: '#5a4632', v: 0.06 },
      thorn: { c: '#3e3020', v: 0.06 }, thornDk: { c: '#2a2016', v: 0.05 }, fogG: { c: '#ffeeb0', glow: true },
      fire: { c: '#ffb050', glow: true }, grace: { c: '#ffe9a0', glow: true }, throne: { c: '#c8a24a', v: 0.04 }, throneDk: { c: '#8a6a2a', v: 0.04 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const FL = base, LOW = base - 30, QL = base - 14;            // 테라스 · 아랫도시 · 규방 마당
      const CX = 96, CZ = 100, R = 42;                             // 원형 테라스
      const TX = 96, TZ = 6, TR = 50;                              // 황금 나무 밑동(북쪽 밖까지 이어진다)
      const inTer = (x, z) => Math.hypot(x - CX, z - CZ) <= R;
      const inQ = (x, z) => x >= 64 && x <= 128 && z >= 152 && z <= 190;
      MH.terrain(w, {
        floor: LOW - 6,
        height: (x, z) => {
          if (inTer(x, z)) return FL;
          if (inQ(x, z)) return QL;
          if (Math.hypot(x - TX, z - TZ) < TR + 6) return FL;
          return LOW + n.fbm(x * 0.05, z * 0.05) * 2;
        },
        surface: (x, z, y) => y >= FL ? B.pave : (y >= QL ? B.pave2 : (n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.grass : B.pave2)),
        under: (x, z, y, dep) => dep < 2 ? B.soil : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      const lights = [], acts = [], landmarks = [];

      // ── 테라스: 받침 축대, 금빛 동심원 바닥, 낙엽, 창백한 석판, 난간 ──
      for (let dz = -R - 1; dz <= R + 1; dz++) for (let dx = -R - 1; dx <= R + 1; dx++) {
        const d = Math.hypot(dx, dz), x = CX + dx, z = CZ + dz;
        if (d > R + 0.5) continue;
        const ang = Math.atan2(dz, dx);
        let b = ((dx + dz) & 3) === 0 ? B.pave2 : B.pave;
        for (const rr of [10, 20, 30, 40]) if (Math.abs(d - rr) < 0.55) b = B.gold;
        if (d > 6 && d < 40 && Math.abs(Math.sin(ang * 6)) < 0.025 * (40 / d)) b = B.goldDk;
        if (d > 32 && hash3(x, 7, z) > 0.72) b = B.litter;
        w.set(x, FL, z, b);
        if (d > R - 1.2) for (let y = LOW; y < FL; y++) w.set(x, y, z, (y - LOW) % 8 === 0 ? B.wallSd : B.wallS);
      }
      // 축대 버팀벽
      for (let k = 0; k < 28; k++) { const a = k / 28 * Math.PI * 2; if (Math.sin(a) < -0.45) continue; const x = Math.round(CX + Math.cos(a) * (R + 1.5)), z = Math.round(CZ + Math.sin(a) * (R + 1.5)); w.box(x - 1, LOW, z - 1, x + 1, FL - 4, z + 1, B.wallSd); MH.cone(w, x, z, FL - 3, 1.6, B.limeDk, 0.6); }
      // 창백한 석판(무덤돌처럼 놓인 흰 돌)
      for (let k = 0; k < 10; k++) {
        const a = Math.PI * 0.15 + k * 0.6, rr = 30 + (k % 3) * 2, x = Math.round(CX + Math.cos(a) * rr), z = Math.round(CZ + Math.sin(a) * rr);
        if (z < CZ - 30) continue;
        const along = Math.abs(Math.cos(a)) > 0.7;
        w.box(x - (along ? 1 : 2), FL + 1, z - (along ? 2 : 1), x + (along ? 1 : 2), FL + 2 + (k % 2), z + (along ? 2 : 1), B.limeLt);
      }
      // 난간(북쪽 나무와 남쪽 입구는 뚫린다)
      for (let k = 0; k < 440; k++) {
        const a = k / 440 * Math.PI * 2, x = Math.round(CX + Math.cos(a) * R), z = Math.round(CZ + Math.sin(a) * R);
        if (z < CZ - 30) continue;
        if (Math.abs(x - CX) <= 6 && z > CZ) continue;
        w.set(x, FL + 1, z, k % 6 === 0 ? B.limeDk : B.limeLt); w.set(x, FL + 2, z, B.trim);
        if (k % 12 === 0) { w.set(x, FL + 3, z, B.limeDk); w.set(x, FL + 4, z, B.gold); }
      }
      // 화로 여섯(테라스 둘레)
      const braziers = [];
      for (let k = 0; k < 6; k++) { const a = Math.PI * 0.08 + k * Math.PI * 0.168, x = Math.round(CX + Math.cos(a) * 36), z = Math.round(CZ + Math.sin(a) * 36); w.box(x, FL + 1, z, x, FL + 3, z, B.limeDk); w.box(x - 1, FL + 4, z - 1, x + 1, FL + 4, z + 1, B.iron); w.set(x, FL + 5, z, B.fire); braziers.push([x, z]); }
      lights.push({ name: 'brazier', p: [CX + 0.5, FL + 4, CZ + 30], c: '#ffb860', i: 0.25, d: 30, flicker: 0.3, srcR: 9 });
      acts.push({
        name: '테라스 화로', hint: '테라스 둘레 화로가 차례로 타오르며 금빛 불꽃이 튀어요', hit: [braziers[2][0] - 2, FL + 1, braziers[2][1] - 2, braziers[2][0] + 2, FL + 6, braziers[2][1] + 2],
        run: async a => { a.flash('brazier', 8, 4); for (const [x, z] of braziers) { a.burst([x + 0.5, FL + 6, z + 0.5], { n: 26, colors: ['#ffb04a', '#ffe08a', '#ff7a2a'], speed: 1.6, up: 8, life: 1.4, gravity: 1, spread: 0.7 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '엘데의 왕좌 테라스', note: '보스 · 축복왕 모르고트', p: [CX + 0.5, FL + 22, CZ + 0.5], boss: true });

      // ── 황금 나무 밑동: 세로로 홈 파인 거대한 뿌리 기둥 벽 ──
      const ANG = 900, flT = new Float32Array(ANG), nzT = new Float32Array(ANG), TAU = Math.PI * 2;
      for (let y = LOW; y < Hh; y++) {
        const shrink = Math.max(0, (y - FL) * 0.04), rBase = TR - shrink + Math.max(0, (FL + 6 - y) * 0.6), wob = Math.sin(y * 0.05) * 0.4;
        for (let k = 0; k < ANG; k++) { const ang = k / ANG * TAU - Math.PI, jit = n.fbm(ang * 5 + 3, 7.5, 2) * 2.2; flT[k] = Math.pow(Math.abs(Math.sin(ang * 13 + wob + jit)), 0.5) * (3 + n.fbm(ang * 9, 2.5, 2) * 3.4); nzT[k] = n.fbm(ang * 3 + 11, y * 0.03, 2) * 3; }
        const rOut = rBase + 10, rIn2 = (rBase - 5) * (rBase - 5);
        for (let dz = -6; dz <= Math.ceil(rOut); dz++) {
          const z = TZ + dz; if (z < 0 || z >= D) continue;
          const xr = Math.ceil(Math.sqrt(Math.max(0, rOut * rOut - dz * dz)));
          for (let dx = -xr; dx <= xr; dx++) {
            const x = TX + dx; if (x < 0 || x >= W) continue;
            const d2 = dx * dx + dz * dz; if (d2 < rIn2) continue;
            const d = Math.sqrt(d2), k = ((Math.atan2(dz, dx) + Math.PI) / TAU * ANG | 0) % ANG;
            const flute = flT[k], rr = rBase + flute + nzT[k];
            if (d > rr || d < rr - 4.5) continue;
            const groove = flute < 1.0;
            w.set(x, y, z, groove ? (hash3(x, y >> 1, z) > 0.4 ? B.erd : B.erd2) : (flute > 4.4 ? B.erdPale : (flute < 2.2 || hash3(x >> 1, y >> 2, z) > 0.7 ? B.erdBarkDk : B.erdBark)));
          }
        }
      }
      // 가시로 봉인된 문(남쪽 면의 뾰족 아치) — 안쪽은 금빛
      const faceZ = TZ + TR - 1;
      LB.arch(w, { axis: 'x', c: faceZ - 6, u0: TX, y0: FL + 1, a: 9, h: 34, kind: 'pointed', fill: B.erd, frame: B.erdPale, depth: 12 });
      for (let y = FL + 1; y <= FL + 36; y++) for (let u = -10; u <= 10; u++) if (LB.inArch(u, y - FL - 1, 9, 34, 'pointed')) for (let k = 0; k < 5; k++) w.set(TX + u, y, faceZ + 1 + k, 0);
      const thorns = w.prop({ name: 'thorns', pivot: [TX + 0.5, FL + 1, faceZ + 3.5], clipOK: 80 });
      for (let k = 0; k < 40; k++) {
        const x0 = TX - 8 + hash3(k, 1, 3) * 16, y0 = FL + 1 + hash3(k, 5, 3) * 3, x1 = TX - 8 + hash3(k, 2, 9) * 16, y1 = FL + 6 + hash3(k, 8, 1) * 28;
        if (!LB.inArch(x1 - TX, y1 - FL - 1, 9, 34, 'pointed')) continue;
        LB.tube(thorns, [[x0, y0, faceZ + 2], [(x0 + x1) / 2 + (hash3(k, 4, 4) - 0.5) * 6, (y0 + y1) / 2, faceZ + 3 + hash3(k, 3, 3) * 2], [x1, y1, faceZ + 2]], t => 1.1 - t * 0.5, k % 3 ? B.thorn : B.thornDk);
      }
      lights.push({ name: 'seal', p: [TX + 0.5, FL + 12, faceZ + 4], c: '#ffd870', i: 1.2, d: 40, flicker: 0.05, srcR: 8 });
      acts.push({
        name: '가시 봉인', hint: '문을 막은 가시가 땅속으로 물러나고 황금빛이 쏟아져 나와요', hit: [TX - 9, FL + 1, faceZ + 1, TX + 9, FL + 30, faceZ + 6],
        run: async a => {
          a.flash('seal', 4, 6.4); a.glow(1.8, 6.4);
          await a.move('thorns', [0, -38, 0], 2.8);
          for (let k = 0; k < 8; k++) { a.burst([TX + 0.5, FL + 6 + k * 3, faceZ + 4], { n: 30, colors: ['#ffe9a0', '#ffd25a', '#ffffff'], speed: 5, up: 2, life: 2, gravity: -0.3, spread: 6, flat: true }); await a.wait(0.25); }
          await a.wait(1.2);
          await a.move('thorns', [0, 0, 0], 2.4);
        },
      });
      landmarks.push({ name: '황금 나무', note: '가시로 봉인된 밑동의 문', p: [TX + 0.5, FL + 60, faceZ - 2] });

      // ── 엘데의 왕좌: 문 앞 다섯 단 위의 금빛 의자 ──
      const DZ0 = CZ - R + 8;                       // 봉인된 문 바로 앞
      for (let s = 0; s < 5; s++) w.box(TX - 9 + s, FL + 1 + s, DZ0 - 4 + s, TX + 9 - s, FL + 1 + s, DZ0 + 6 - s, s % 2 ? B.gold : B.limeLt);
      const ty = FL + 6, tz = DZ0 - 1;
      w.box(TX - 2, ty, tz, TX + 2, ty + 1, tz + 2, B.throne);                       // 좌석
      w.box(TX - 2, ty + 2, tz - 1, TX + 2, ty + 11, tz - 1, B.throne);              // 등받이
      w.box(TX - 1, ty + 12, tz - 1, TX + 1, ty + 13, tz - 1, B.gold); w.set(TX, ty + 14, tz - 1, B.gold);
      for (const s of [-1, 1]) { w.box(TX + s * 3, ty, tz - 1, TX + s * 3, ty + 4, tz + 2, B.throneDk); w.set(TX + s * 3, ty + 5, tz + 2, B.gold); }
      for (const s of [-1, 1]) { w.box(TX + s * 6, ty - 1, tz + 3, TX + s * 6, ty + 1, tz + 3, B.limeDk); w.set(TX + s * 6, ty + 2, tz + 3, B.fire); }
      lights.push({ name: 'throne', p: [TX + 0.5, ty + 6, tz + 3], c: '#ffd870', i: 1.3, d: 24, flicker: 0.05, srcR: 9 });
      acts.push({
        name: '엘데의 왕좌', hint: '왕좌가 빛나며 하늘로 빛기둥이 솟아요', hit: [TX - 3, ty, tz - 1, TX + 3, ty + 14, tz + 2],
        run: async a => { a.flash('throne', 3.5, 4.6); a.glow(1.5, 4.6); for (let k = 0; k < 9; k++) { a.burst([TX + 0.5, ty + 3, tz + 1], { n: 30, colors: ['#ffe9a0', '#fff6d0', '#ffd25a'], speed: 1, up: 16, life: 2.4, gravity: -0.5, spread: 1.2 }); await a.wait(0.3); } },
      });

      // ── 거대한 뿌리: 서쪽에서 테라스를 넘어 아랫도시로 내리꽂힌다(금빛 핏줄은 부품) ──
      const rootPts = [[TX - 38, FL + 34, faceZ - 10], [TX - 50, FL + 30, CZ - 24], [TX - 52, FL + 18, CZ + 6], [TX - 66, FL + 2, CZ + 30], [TX - 80, LOW - 2, CZ + 52]];
      LB.tube(w, rootPts, t => 6.4 - t * 3.6, (x, y, z, t, dy, d) => d > 0.88 && hash3(x, y, z) > 0.78 ? B.erdPale : (dy > 0 ? B.erdBark : B.erdBarkDk));
      const rootPts2 = [[TX + 40, FL + 28, faceZ - 8], [TX + 54, FL + 20, CZ - 16], [TX + 64, FL + 6, CZ + 6], [TX + 78, LOW - 2, CZ + 18]];
      LB.tube(w, rootPts2, t => 5.4 - t * 3, (x, y, z, t, dy) => dy > 0 ? B.erdBark : B.erdBarkDk);
      const veins = w.prop({ name: 'veins', pivot: [TX - 52, FL + 18, CZ + 6], scl0: [0, 0, 0], clipOK: 99999 });
      LB.tube(veins, rootPts.map(p => [p[0], p[1] + 5.2, p[2]]), t => 0.9 - t * 0.3, B.erd);
      acts.push({
        name: '금빛 뿌리', hint: '거대한 뿌리를 따라 금빛 핏줄이 차오르며 빛나요', hit: [TX - 56, FL + 12, CZ, TX - 48, FL + 26, CZ + 12],
        run: async a => { await a.tween('veins', { scl: [1, 1, 1] }, 0.9); a.glow(1.5, 3); for (let k = 0; k < 5; k++) { const p = rootPts[k]; a.burst([p[0], p[1] + 6, p[2]], { n: 18, colors: ['#ffe9a0', '#ffd25a'], speed: 1.4, up: 3, life: 1.6, gravity: -0.3, spread: 2 }); await a.wait(0.3); } await a.wait(1.6); await a.tween('veins', { scl: [0, 0, 0] }, 1); },
      });
      acts.push({
        name: '황금 나무의 잎비', hint: '황금 나무가 환하게 빛나며 금빛 잎이 쏟아져요', hit: [TX + 14, FL + 2, faceZ - 4, TX + 22, FL + 20, faceZ + 2],
        run: async a => { a.glow(1.6, 4.6); a.wind(2.6, 4.6); for (let k = 0; k < 10; k++) { a.burst([CX - 30 + k * 6, 120 + (k % 3) * 5, CZ - 20 + (k % 4) * 10], { n: 40, colors: ['#ffd25a', '#ffe9a0', '#f0b040'], speed: 6, up: -1, life: 3.2, gravity: 2.2, spread: 10, flat: true }); await a.wait(0.4); } },
      });

      // ── 남쪽 입구: 안개문, 규방으로 내려가는 큰 계단, 여왕의 규방 ──
      const GZ = CZ + R + 1;
      MH.flight(w, { name: '규방 계단', axis: 'z', c: CX, half: 5, a: GZ, b: GZ + 15, ha: FL, hb: QL, step: B.pave, edge: B.trim, fill: B.wallS, rail: B.limeLt, post: B.limeDk, postGap: 5,
        onPost: (x, y, z) => w.set(x, y, z, B.fire) });
      for (const x of [CX - 7, CX + 7]) { w.box(x - 1, FL + 1, GZ - 2, x + 1, FL + 14, GZ, B.lime); w.box(x - 1, FL + 15, GZ - 2, x + 1, FL + 15, GZ, B.trim); w.set(x, FL + 16, GZ - 1, B.gold); }
      w.box(CX - 7, FL + 13, GZ - 1, CX + 7, FL + 14, GZ - 1, B.lime);
      // 안개문(금빛 아지랑이)
      for (let x = CX - 5; x <= CX + 5; x++) for (let y = FL + 1; y <= FL + 12; y++) if (hash3(x, y, 9) > 0.62) w.set(x, y, GZ - 1, B.fogG);
      lights.push({ name: 'fog', p: [CX + 0.5, FL + 6, GZ + 1], c: '#ffe8a0', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '보스방 입구의 금빛 안개가 일렁이며 흩날려요', hit: [CX - 5, FL + 1, GZ - 2, CX + 5, FL + 12, GZ],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, FL + 2 + k * 1.4, GZ - 0.5], { n: 22, colors: ['#ffeeb0', '#ffffff', '#ffd25a'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 5, flat: true }); await a.wait(0.18); } },
      });
      // 여왕의 규방(아래 마당의 궁전)
      const QZ0 = 160, QZ1 = 186, QX0 = 70, QX1 = 122;
      w.box(QX0, QL + 1, QZ0, QX1, QL + 18, QZ1, B.lime); w.box(QX0 + 1, QL + 1, QZ0 + 1, QX1 - 1, QL + 17, QZ1 - 1, 0);
      for (const y of [QL + 9, QL + 18]) w.walls(QX0, y, QZ0, QX1, y, QZ1, B.trim);
      for (let x = QX0 + 4; x <= QX1 - 4; x += 6) { LB.arch(w, { axis: 'x', c: QZ0, u0: x, y0: QL + 2, a: 1.5, h: 6, kind: 'round', fill: B.win, frame: B.limeLt }); LB.arch(w, { axis: 'x', c: QZ0, u0: x, y0: QL + 11, a: 1.2, h: 5, kind: 'round', fill: B.win, frame: B.limeLt }); }
      MH.roof(w, QX0 - 1, QX1 + 1, QZ0 - 1, QZ1 + 1, QL + 19, { b: B.slate, eave: B.slateDk, ridge: B.gold, pitch: 1, gable: B.lime, axis: 'x' });
      const qd = LB.dome(w, CX, QL + 30, (QZ0 + QZ1) >> 1, 8, B.domeG, { ribs: 10, rib: B.gold, lantern: B.limeLt, tip: B.gold });
      w.cyl(CX, (QZ0 + QZ1) >> 1, QL + 19, QL + 29, 7.5, B.lime);
      // 규방 문짝(부품): 북쪽 정면, 바깥으로 열린다
      const qdL = w.prop({ name: 'qdoorL', pivot: [CX - 3, QL + 1, QZ0 - 0.5] }), qdR = w.prop({ name: 'qdoorR', pivot: [CX + 4, QL + 1, QZ0 - 0.5] });
      for (let x = CX - 3; x <= CX + 3; x++) for (let y = QL + 1; y <= QL + 8; y++) { w.set(x, y, QZ0, 0); (x <= CX ? qdL : qdR).set(x, y, QZ0 - 1, y === QL + 4 || x === CX - 3 || x === CX + 3 ? B.gold : B.door); }
      for (let x = CX - 3; x <= CX + 3; x++) w.set(x, QL + 9, QZ0, B.gold);
      acts.push({
        name: '여왕의 규방', hint: '규방의 금장 문이 활짝 열리며 안쪽 빛이 새어 나와요', hit: [CX - 3, QL + 1, QZ0 - 2, CX + 3, QL + 8, QZ0],
        run: async a => { await Promise.all([a.turn('qdoorL', [0, -1.5, 0], 1.8), a.turn('qdoorR', [0, 1.5, 0], 1.8)]); a.burst([CX + 0.5, QL + 4, QZ0 - 1], { n: 30, colors: ['#ffe9a0', '#fff6d0'], speed: 2, up: 2, life: 1.6, gravity: -0.3, spread: 3 }); await a.wait(2); await Promise.all([a.turn('qdoorL', [0, 0, 0], 1.6), a.turn('qdoorR', [0, 0, 0], 1.6)]); },
      });
      const gp = LB.grace(w, CX + 8, QL, QZ0 - 6, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push(LB.graceAct({ at: gp, to: [TX + 0.5, ty + 6, tz + 1], arc: 18, steps: 22, hint: '여왕의 규방 축복이 엘데의 왕좌를 가리켜요' }));
      landmarks.push({ name: '여왕의 규방', note: '왕좌로 오르는 마지막 축복', p: [CX + 0.5, qd + 8, (QZ0 + QZ1) / 2] });

      // ── 테라스 아래 도읍: 지붕들, 대성당의 금빛 돔 ──
      const hm = { found: B.wallSd, wall: B.lime, frame: B.limeDk, win: B.win, sill: B.trim, door: B.door, roof: B.slate, eave: B.slateDk, ridge: B.gold, chimney: B.limeDk, quoin: B.limeLt };
      const placed = [];
      for (let i = 0; i < 140 && placed.length < 34; i++) {
        const x = w.ri(4, W - 16), z = w.ri(30, D - 14), sx = w.ri(8, 12), sz = w.ri(7, 10);
        const ok = [[x, z], [x + sx, z], [x, z + sz], [x + sx, z + sz]].every(([px, pz]) => Math.hypot(px - CX, pz - CZ) > R + 5 && Math.hypot(px - TX, pz - TZ) > TR + 10 && !inQ(px, pz) && !(Math.abs(px - CX) < 9 && pz > GZ - 2));
        if (!ok || placed.some(([a0, b0, a1, b1]) => x < a1 + 2 && x + sx > a0 - 2 && z < b1 + 2 && z + sz > b0 - 2)) continue;
        const h = MH.houseX(w, { x, z, sx, sz, floors: 2 + (i % 2), fh: 6, face: 's', pitch: 2, y: LOW, m: hm });
        if (i % 5 === 0) LB.dome(w, x + (sx >> 1), h.peak - 1, z + (sz >> 1), 3.4, B.domeG, { ribs: 8, rib: B.gold, lantern: B.limeLt, tip: B.gold });
        placed.push([x, z, x + sx, z + sz]);
      }
      const SDX = 166, SDZ = 70;
      w.cyl(SDX, SDZ, LOW + 1, LOW + 26, 9, B.lime); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5, x = Math.round(SDX + Math.cos(a) * 9), z = Math.round(SDZ + Math.sin(a) * 9); w.box(x, LOW + 16, z, x, LOW + 22, z, B.glassG); }
      const sdTop = LB.dome(w, SDX, LOW + 27, SDZ, 10, B.domeG, { ribs: 12, rib: B.gold, sy: 1.1, lantern: B.limeLt, tip: B.gold });
      landmarks.push({ name: '황금 나무의 대성당', note: '테라스 아래로 보이는 금빛 돔', p: [SDX + 0.5, sdTop + 6, SDZ + 0.5] });
      for (let i = 0; i < 40; i++) {
        const x = w.ri(3, W - 4), z = w.ri(3, D - 4), g = MH.g(w, x, z);
        if (g > LOW + 3 || w.get(x, g + 1, z) || Math.hypot(x - CX, z - CZ) < R + 4 || inQ(x, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(7, 11), bark: B.bark, leaves: [B.leafG, B.leafO, B.leafO], r: w.r(3, 4.2), spread: 3.2, branches: 4 });
      }
      return { lights, landmarks, acts };
    },
  });
})();
