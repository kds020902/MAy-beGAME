// 서리 왕좌 — 빙하 계곡 꼭대기의 얼음 성채와 얼어붙은 폭포 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'frost', cat: 'dungeon', name: '서리 왕좌', en: 'Frost Throne', color: '#7cc4e0', seed: 71, base: 20, time: 'day',
    desc: '영원한 겨울에 갇힌 옛 왕국. 얼어붙은 기사들은 아직도 왕을 지킨다.',
    monsters: { normal: ['얼어붙은 망자', '서리 늑대', '창백한 기사'], mid: '서리 기사단장', boss: '겨울의 왕' },
    sky: ['#1c2c48', '#34507a', '#86aed4'], stars: false,
    hemi: ['#e0f0ff', '#34414f', 0.66], sun: ['#f0f8ff', 0.78, [0.4, 1, 0.6]],
    night: { sky: ['#070c18', '#0e1a30', '#2a4a78'], stars: true, hemi: ['#8ab0e0', '#141c28', 0.46], sun: ['#b0d0ff', 0.4, [0.4, 1, 0.6]], haze: '#2a3a54' },
    liquid: ['#8cc8e0', '#b4e2f2', '#ffffff'], liqSpeed: 0.05,
    fog: { start: 0.7, floor: 12, depth: 10, haze: [24, 0.22, 8], hazeColor: '#b8cce0' },
    camY: 16,
    particles: [
      { n: 900, colors: ['#ffffff', '#dfefff', '#b8d8f0'], mode: 'fall', speed: 0.8, wind: 1.2, y0: 14, y1: 104, glow: false },
      { n: 40, colors: ['#9fe8ff', '#e0f8ff'], mode: 'wisp', speed: 0.4, size: 2, y0: 50 },
    ],
    blocks: {
      snow: { c: '#9aa8b8', top: '#e8f0f6', v: 0.04 }, snow2: { c: '#9aa8b8', top: '#d2deea', v: 0.05 },
      rock: { c: '#58606e', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4250', v: 0.06, pat: 'stone' }, cliff: { c: '#6a7484', v: 0.06, pat: 'big' },
      ice: { c: '#86c4e0', top: '#b4e2f2', v: 0.05 }, iceDk: { c: '#5a9ab8', top: '#6aa8c8', v: 0.05 }, icicle: { c: '#c8ecfa', v: 0.03 },
      castle: { c: '#aab6c6', v: 0.05, pat: 'brick' }, castleDk: { c: '#7c889a', v: 0.05, pat: 'brick' }, trim: { c: '#d4dde8', v: 0.03 },
      roofI: { c: '#4a78a8', v: 0.05, pat: 'tile' }, roofIdk: { c: '#34588a', v: 0.04 }, gold: { c: '#e0c060', v: 0.06 },
      carpet: { c: '#2a4a8a', v: 0.03 }, iron: { c: '#3a3e48', v: 0.03 }, banner: { c: '#2c4c8c', v: 0.03 },
      pine: { c: '#2a4a44', v: 0.1 }, pineDk: { c: '#1f3834', v: 0.1 }, trunk: { c: '#3a2e2a', v: 0.05 },
      glowIce: { c: '#9fe8ff', glow: true }, blueFire: { c: '#6ad0ff', glow: true }, crown: { c: '#ffe08a', glow: true },
      win: { c: '#9fe8ff', night: true, day: '#5a88b0' },
      flag: { c: '#7c889a', top: '#a8b4c4', v: 0.06, pat: 'stone' }, trail: { c: '#9aa8b8', top: '#c4ceda', v: 0.06 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, MX = 64;
      const dxOf = (x, z) => Math.abs(x - MX + Math.sin(z * 0.045) * 5);
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const u = z / 127, dx = dxOf(x, z);
          let hh = (1 - u) * 16 + MH.sstep(73, 65, z) * 11;
          hh += Math.min(32, Math.pow(Math.max(0, dx - 20), 1.2) * 0.5) + n.ridge(x * 0.04, z * 0.04, 4) * 8 * MH.sstep(16, 40, dx);
          if (z > 96) hh -= MH.sstep(96, 112, z) * 7 * Math.max(0, 1 - dx / 34);
          return base + hh + n.fbm(x * 0.06, z * 0.06) * 1.6;
        },
        surface: (x, z, y, s) => {
          const dx = dxOf(x, z);
          if (s >= 3) return B.cliff;
          if (dx < 14 && z > 50 && z < 102) return n.ridge(x * 0.14, z * 0.07, 2) > 0.86 ? B.iceDk : B.ice;
          return n.fbm(x * 0.16, z * 0.16, 2) > 0.58 ? B.snow2 : B.snow;
        },
        under: (x, z, y, dep, s) => dep < 1 && s < 3 ? B.snow : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, base + 1, (x, z) => z > 94);
      const lights = [], acts = [], landmarks = [];

      // ── 얼어붙은 폭포 ──
      const fallTop = MH.g(w, MX, 62), fallBot = MH.g(w, MX, 78);
      for (let x = 55; x <= 73; x++) for (let z = 62; z <= 77; z++) {
        const g = MH.g(w, x, z);
        if (g <= fallBot) continue;
        w.set(x, g, z, (x * 3 + z) % 7 === 0 ? B.glowIce : B.icicle);
        if (hash3(x, 1, z) > 0.4) w.set(x, g + 1, z, B.icicle);
        if (w.slope[x + W * z] >= 3) for (let y = g - 1; y > fallBot; y--) if (hash3(x, y, z) > 0.35 && !w.get(x, y, z + 1)) w.set(x, y, z + 1, (x + y) % 6 === 0 ? B.glowIce : B.icicle);
      }
      const shards = w.prop({ name: 'shards', pivot: [MX + 0.5, fallBot, 80] });
      for (let i = 0; i < 16; i++) {
        const sx = 56 + i, sz = 79 + (i % 3), g = MH.g(w, sx, sz), h = w.ri(3, 8);
        for (let q = 1; q <= h; q++) if (!w.get(sx, g + q, sz)) shards.set(sx, g + q, sz, q > h - 2 ? B.glowIce : B.icicle);
      }
      lights.push({ name: 'falls', p: [MX + 0.5, fallBot + 5, 80], c: '#9fe8ff', i: 0.9, d: 24, flicker: 0.05, srcR: 7 });
      acts.push({
        name: '얼어붙은 폭포', hint: '얼음이 갈라지며 파편이 튀어요', hit: [55, fallBot, 72, 73, fallTop + 1, 82],
        run: async a => {
          a.flash('falls', 4, 2.6);
          for (let k = 0; k < 4; k++) { await a.move('shards', [0, 1, 0], 0.09); await a.move('shards', [0, 0, 0], 0.09); }
          await a.turn('shards', [0.24, 0, 0], 0.22);
          for (let k = 0; k < 3; k++) { a.burst([MX + 0.5, fallBot + 6 + k * 2, 79], { n: 50, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 10, up: 3, life: 1.8, gravity: 6, spread: 7 }); await a.wait(0.3); }
          await a.turn('shards', [0, 0, 0], 0.9);
        },
      });
      landmarks.push({ name: '얼어붙은 폭포', note: '빙하가 멈춘 자리', p: [MX + 0.5, fallTop + 9, 70.5] });
      landmarks.push({ name: '서리 호수', note: '서리 늑대 무리의 사냥터', p: [60.5, base + 9, 112.5] });

      // ── 얼음 성채 ──
      const L = MH.g(w, 64, 53) + 1;
      MH.flatten(w, 34, 4, 94, 52, L, B.snow, B.rock);
      const m = { wall: B.castle, band: B.castleDk, cren: B.trim, walk: B.castleDk };
      MH.wall(w, [[38, 10], [90, 10], [90, 46], [71, 46]], { m, h: 12, t: 2, y: L, buttress: true });
      MH.wall(w, [[57, 46], [38, 46], [38, 10]], { m, h: 12, t: 2, y: L, buttress: true });
      const tm = { wall: B.castle, band: B.castleDk, win: B.win, cren: B.trim, roof: B.roofI, eave: B.roofIdk, finial: B.glowIce, flag: B.banner };
      for (const [tx, tz] of [[38, 10], [90, 10], [38, 46], [90, 46]]) MH.tower(w, { cx: tx, cz: tz, y0: L + 1, h: 22, r: 4.5, m: tm, step: 0.36 });
      for (const tx of [57, 71]) MH.tower(w, { cx: tx, cz: 47, y0: L + 1, h: 19, r: 3.5, m: Object.assign({}, tm, { flag: null }), step: 0.36 });
      // 성문과 쇠창살(부품)
      // 성문 누각: 문 위로 쇠창살이 다 들어갈 만큼 벽을 두되, 안뜰 너머 왕좌를 가리지 않을 높이로
      w.box(58, L + 1, 45, 70, L + 17, 48, B.castle);
      w.box(60, L + 1, 45, 68, L + 8, 48, 0);
      w.box(59, L + 9, 49, 69, L + 9, 49, B.trim); w.box(60, L + 10, 49, 68, L + 13, 49, B.banner); w.box(64, L + 11, 49, 64, L + 12, 49, B.gold);
      w.walls(57, L + 18, 44, 71, L + 18, 49, B.trim);
      for (let x = 58; x <= 70; x += 2) w.set(x, L + 19, 49, B.trim);
      const gate = w.prop({ name: 'gate', pivot: [64.5, L + 1, 48] });
      for (let x = 60; x <= 68; x++) for (let y = L + 1; y <= L + 8; y++) if (x % 2 === 0 || (y - L) % 3 === 1) gate.set(x, y, 47, B.iron);
      for (const bx of [56, 72]) { const g = MH.g(w, bx, 52); w.box(bx, g + 1, 52, bx, g + 4, 52, B.iron); w.box(bx, g + 5, 52, bx, g + 6, 52, B.blueFire); lights.push({ p: [bx + 0.5, g + 6, 52.5], c: '#6ad0ff', i: 1, d: 14, flicker: 0.3 }); }
      acts.push({
        name: '얼음 성문', hint: '쇠창살이 올라가고 다시 내려와요', hit: [60, L + 1, 45, 68, L + 8, 48],
        run: async a => { await a.move('gate', [0, 8.2, 0], 2.4); await a.wait(2); await a.move('gate', [0, 0, 0], 1.2, t => t * t); a.burst([64.5, L + 1, 48], { n: 36, colors: ['#ffffff', '#dfefff'], speed: 6, up: 1, life: 1, gravity: 2, spread: 5, flat: true }); },
      });
      landmarks.push({ name: '얼음 성문', note: '중간 보스 · 서리 기사단장', p: [64.5, L + 26, 47.5], mid: true });
      // 왕좌의 방: 앞이 트인 기둥 회랑
      const hx0 = 48, hx1 = 80, hz0 = 16, hz1 = 35, HH = 20;
      w.box(hx0, L + 1, hz0, hx1, L + HH, hz1, B.castle);
      w.box(hx0 + 1, L + 1, hz0 + 1, hx1 - 1, L + HH - 1, hz1, 0);
      for (let x = hx0 + 2; x <= hx1 - 2; x += 4) { w.box(x, L + 1, hz1, x, L + 16, hz1, B.trim); w.box(x - 1, L + 1, hz1, x + 1, L + 1, hz1, B.castleDk); w.box(x - 1, L + 16, hz1, x + 1, L + 16, hz1, B.castleDk); }
      w.box(hx0, L + 17, hz1, hx1, L + 17, hz1, B.castle); w.box(hx0, L + 17, hz1 + 1, hx1, L + 17, hz1 + 1, B.trim);
      for (let z = hz0 + 3; z <= hz1 - 3; z += 4) for (const x of [hx0, hx1]) { w.box(x, L + 5, z, x, L + 15, z + 1, B.win); w.box(x, L + 16, z, x, L + 16, z + 1, B.trim); }
      for (let z = hz0 + 2; z <= hz1 - 2; z += 5) for (const [bx, dx] of [[hx0, -1], [hx1, 1]]) w.box(bx + dx, L + 1, z, bx + dx, L + 14, z, B.castleDk);
      MH.roof(w, hx0 - 1, hx1 + 1, hz0 - 1, hz1 + 2, L + HH + 1, { b: B.roofI, eave: B.roofIdk, ridge: B.trim, pitch: 1, gable: B.castle, axis: 'x' });
      // 앞쪽 지붕은 무너져 왕좌가 하늘 아래 드러난다: 깨진 끝에 고드름, 바닥엔 쌓인 눈
      for (let z = 20; z <= hz1 + 2; z++) for (let x = hx0 - 1; x <= hx1 + 1; x++) {
        if ((x - hx0 < 2 || hx1 - x < 2) && hash3(x, 3, z) > 0.3 + (z - 20) * 0.04) continue;
        for (let y = L + HH; y <= L + HH + 16; y++) if (y > L + HH || (x > hx0 && x < hx1 && z < hz1)) w.set(x, y, z, 0);
      }
      for (let x = hx0 + 1; x < hx1; x++) { let y = L + HH + 16; while (y > L + HH && !w.get(x, y, 19)) y--; const k = 1 + Math.floor(hash3(x, 5, 27) * 4); for (let q = 1; q <= k; q++) if (!w.get(x, y - q, 19)) w.set(x, y - q, 19, q === k ? B.glowIce : B.icicle); }
      for (let i = 0; i < 70; i++) { const x = w.ri(hx0 + 1, hx1 - 1), z = w.ri(24, hz1); if (x < 61 || x > 67) w.fill(x, L + 1, z, B.snow2); }
      for (let z = hz0 + 5; z <= hz1 + 8; z++) for (let x = 61; x <= 67; x++) w.set(x, L, z, (x === 61 || x === 67) ? B.gold : B.carpet);
      for (let s = 0; s < 4; s++) w.box(55 + s, L + 1 + s, hz0 + 1, 73 - s, L + 1 + s, hz0 + 6 - s, s % 2 ? B.trim : B.castleDk);
      const ty = L + 5;
      w.box(61, ty, hz0 + 1, 67, ty + 1, hz0 + 3, B.glowIce); w.box(61, ty + 2, hz0 + 1, 67, ty + 11, hz0 + 1, B.ice);
      w.box(61, ty + 2, hz0 + 2, 61, ty + 5, hz0 + 3, B.ice); w.box(67, ty + 2, hz0 + 2, 67, ty + 5, hz0 + 3, B.ice);
      for (const [sx, h] of [[61, 14], [62, 16], [63, 18], [64, 21], [65, 18], [66, 16], [67, 14], [60, 12], [68, 12], [59, 9], [69, 9]]) w.box(sx, ty + 2, hz0 + 1, sx, ty + h, hz0 + 1, B.glowIce);
      w.box(62, ty + 2, hz0 + 2, 66, ty + 2, hz0 + 3, B.carpet);
      w.box(63, ty + 3, hz0 + 2, 65, ty + 3, hz0 + 2, B.crown); for (const x of [63, 64, 65]) if (x !== 64) w.set(x, ty + 4, hz0 + 2, B.crown); w.box(64, ty + 4, hz0 + 2, 64, ty + 5, hz0 + 2, B.crown);
      for (const bx of [54, 74]) { w.box(bx, L + 1, hz1 - 4, bx, L + 4, hz1 - 4, B.iron); w.box(bx - 1, L + 5, hz1 - 5, bx + 1, L + 5, hz1 - 3, B.iron); w.box(bx, L + 6, hz1 - 4, bx, L + 7, hz1 - 4, B.blueFire); lights.push({ p: [bx + 0.5, L + 8, hz1 - 3.5], c: '#6ad0ff', i: 1.1, d: 16, flicker: 0.3 }); }
      lights.push({ name: 'throne', p: [64.5, ty + 7, hz0 + 4.5], c: '#80d8ff', i: 1.5, d: 26, flicker: 0.05 });
      acts.push({
        name: '겨울 왕좌', hint: '왕관이 타오르고 눈보라가 몰아쳐요', hit: [59, ty, hz0 + 1, 69, ty + 14, hz0 + 4],
        run: async a => {
          a.flash('throne', 4, 3.6); a.glow(1.7, 3.6);
          for (let k = 0; k < 6; k++) { a.burst([64.5, ty + 5, hz0 + 4], { n: 50, colors: ['#ffffff', '#c8ecfa', '#ffe08a'], speed: 14, up: 2, life: 2, gravity: 0.5, spread: 2, flat: true }); await a.wait(0.4); }
        },
      });
      landmarks.push({ name: '겨울의 왕좌', note: '보스 · 겨울의 왕', p: [64.5, L + 36, 25.5], boss: true });
      MH.tower(w, { cx: 64, cz: 9, y0: L + 1, h: 30, r: 5, m: tm, step: 0.34 });
      // ── 성문에서 호숫가까지: 눈길과 폭포 옆 돌계단 ──
      MH.path(w, [[64.5, 53], [57, 58], [47.5, 62]], 2.2, B.trail);
      const sTop = MH.g(w, 47, 62), sBot = MH.g(w, 47, 82);
      MH.flight(w, { name: '폭포 옆 계단', axis: 'z', c: 47, half: 3, a: 63, b: 80, ha: sTop, hb: sBot, step: B.flag, edge: B.castleDk, fill: B.rock, rail: B.castleDk, post: B.castle, postGap: 4,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.blueFire); if (k === 8 && x > 47) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#6ad0ff', i: 0.9, d: 14, flicker: 0.3 }); } });
      MH.path(w, [[47.5, 81], [48.5, 88], [52, 93]], 2.2, B.trail);
      const onTrail = (x, z) => (x > 40 && x < 55 && z > 55 && z < 96) || MH.polyDist(x, z, [[64.5, 53], [57, 58], [47.5, 62]]) < 4;
      // ── 빙하 위 얼음다리와 얼음 가시 ──
      for (let i = 0; i < 26; i++) {
        const x = w.ri(50, 78), z = w.ri(84, 100), g = MH.g(w, x, z);
        if (g < 0 || onTrail(x, z) || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
        const h = w.ri(4, 12);
        MH.cone(w, x, z, g + 1, w.r(1.2, 2.4), B.ice, 2.2 / h);
        w.set(x, g + h, z, B.glowIce);
      }
      // ── 전나무 숲 ──
      for (let i = 0; i < 90; i++) {
        const x = w.ri(3, 124), z = w.ri(40, 124), g = MH.g(w, x, z);
        if (g < 0 || dxOf(x, z) < 17 || onTrail(x, z) || w.slope[x + W * z] > 1 || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
        MH.tree(w, x, g + 1, z, { kind: 'pine', h: w.ri(12, 20), bark: B.trunk, leaves: [B.pine, B.pine, B.pineDk], snow: B.snow, r: w.r(3.2, 4.6) });
      }
      // ── 무너진 망루 ──
      const RX = 22, RZ = 80, rg = MH.g(w, RX, RZ) + 1;
      MH.flatten(w, RX - 5, RZ - 5, RX + 5, RZ + 5, rg - 1, B.snow2, B.rock);
      MH.tower(w, { cx: RX, cz: RZ, y0: rg, h: 18, r: 4, m: { wall: B.castleDk, band: B.castle, win: B.iron } });
      for (let i = 0; i < 70; i++) { const a = w.r(0, 6.28), rr = w.r(0, 5); w.set(RX + Math.round(Math.cos(a) * rr), rg + 18 - w.ri(0, 7), RZ + Math.round(Math.sin(a) * rr), 0); }
      for (let i = 0; i < 20; i++) { const x = RX + w.ri(-8, 8), z = RZ + w.ri(-8, 8), g = MH.g(w, x, z); if (!w.get(x, g + 1, z)) w.set(x, g + 1, z, B.castleDk); }
      landmarks.push({ name: '무너진 망루', note: '창백한 기사들의 순찰로', p: [RX + 0.5, rg + 24, RZ + 0.5] });
      MH.scatter(w, 500, (x, g, z, b) => { if (b === B.snow && w.chance(0.3)) w.set(x, g + 1, z, B.snow2); });
      return { lights, landmarks, acts };
    },
  });
})();
