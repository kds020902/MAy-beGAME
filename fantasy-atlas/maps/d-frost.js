// 서리 왕좌 — 빙하 계곡 꼭대기의 얼음 성채와 얼어붙은 폭포, 폭포 동쪽 단의 기사단 묘역과 서리 영묘 (160칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 128, K = 1.25;
  const s = v => Math.round(v * K);
  MAPS.push({
    id: 'frost', cat: 'dungeon', name: '서리 왕좌', en: 'Frost Throne', color: '#7cc4e0', seed: 71, base: 20, time: 'day', size: [W, D, Hh],
    desc: '영원한 겨울에 갇힌 옛 왕국. 얼어붙은 기사들은 아직도 왕을 지킨다. 폭포 동쪽 단에는 쓰러진 기사들이 묻힌 묘역과 옛 기사단장들의 얼음관을 모신 서리 영묘가 눈에 덮여 있다.',
    info: { title: '장소 정보', en: 'FROST THRONE', rows: [['생김새', '빙하 계곡 꼭대기의 얼음 성채'], ['명소', '겨울 왕좌 · 얼어붙은 폭포 · 기사단 묘역'], ['주의', '묘역의 혼불이 오르면 얼음관이 열림']] },
    monsters: { normal: ['얼어붙은 망자', '서리 늑대', '창백한 기사', '묘역의 혼불'], mid: '서리 기사단장', boss: '겨울의 왕' },
    sky: ['#1c2c48', '#34507a', '#86aed4'], stars: false,
    hemi: ['#e0f0ff', '#34414f', 0.66], sun: ['#f0f8ff', 0.78, [0.4, 1, 0.6]],
    night: { sky: ['#070c18', '#0e1a30', '#2a4a78'], stars: true, hemi: ['#8ab0e0', '#141c28', 0.46], sun: ['#b0d0ff', 0.4, [0.4, 1, 0.6]], haze: '#2a3a54' },
    liquid: ['#8cc8e0', '#b4e2f2', '#ffffff'], liqSpeed: 0.05,
    fog: { start: 0.72, floor: 12, depth: 10, haze: [30, 0.22, 8], hazeColor: '#b8cce0' },
    camY: 20,
    particles: [
      { n: 1100, colors: ['#ffffff', '#dfefff', '#b8d8f0'], mode: 'fall', speed: 0.8, wind: 1.2, y0: 18, y1: 124, glow: false },
      { n: 60, colors: ['#9fe8ff', '#e0f8ff'], mode: 'wisp', speed: 0.4, size: 2, y0: 62 },
    ],
    blocks: {
      snow: { c: '#9aa8b8', top: '#e8f0f6', v: 0.04 }, snow2: { c: '#9aa8b8', top: '#d2deea', v: 0.05 },
      rock: { c: '#58606e', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4250', v: 0.06, pat: 'stone' }, cliff: { c: '#6a7484', v: 0.06, pat: 'big' },
      ice: { c: '#86c4e0', top: '#b4e2f2', v: 0.05 }, iceDk: { c: '#5a9ab8', top: '#6aa8c8', v: 0.05 }, icicle: { c: '#c8ecfa', v: 0.03 },
      castle: { c: '#aab6c6', v: 0.05, pat: 'brick' }, castleDk: { c: '#7c889a', v: 0.05, pat: 'brick' }, trim: { c: '#d4dde8', v: 0.03 },
      roofI: { c: '#4a78a8', v: 0.05, pat: 'tile' }, roofIdk: { c: '#34588a', v: 0.04 }, gold: { c: '#e0c060', v: 0.06 },
      carpet: { c: '#2a4a8a', v: 0.03 }, iron: { c: '#3a3e48', v: 0.03 }, wood: { c: '#6a5040', v: 0.05, pat: 'plank' },
      pine: { c: '#2a4a44', v: 0.1 }, pineDk: { c: '#1f3834', v: 0.1 }, trunk: { c: '#3a2e2a', v: 0.05 },
      glowIce: { c: '#9fe8ff', glow: true }, blueFire: { c: '#6ad0ff', glow: true }, crown: { c: '#ffe08a', glow: true },
      win: { c: '#9fe8ff', night: true, day: '#5a88b0' },
      flag: { c: '#7c889a', top: '#a8b4c4', v: 0.06, pat: 'stone' }, trail: { c: '#9aa8b8', top: '#c4ceda', v: 0.06 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, MX = s(64);
      // 원래 128칸 지형을 1.25배로: 좌표를 줄여 옛 함수에 넣고 높이를 키운다
      const dx0 = (xo, zo) => Math.abs(xo - 64 + Math.sin(zo * 0.045) * 5);
      const dxOf = (x, z) => dx0(x / K, z / K) * K;
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const xo = x / K, zo = z / K, u = zo / 127, dx = dx0(xo, zo);
          let hh = (1 - u) * 16 + MH.sstep(73, 65, zo) * 11;
          hh += Math.min(32, Math.pow(Math.max(0, dx - 20), 1.2) * 0.5) + n.ridge(xo * 0.04, zo * 0.04, 4) * 8 * MH.sstep(16, 40, dx);
          if (zo > 96) hh -= MH.sstep(96, 112, zo) * 7 * Math.max(0, 1 - dx / 34);
          return base + K * (hh + n.fbm(xo * 0.06, zo * 0.06) * 1.6);
        },
        surface: (x, z, y, sl) => {
          const xo = x / K, zo = z / K, dx = dx0(xo, zo);
          if (sl >= 3) return B.cliff;
          if (dx < 14 && zo > 50 && zo < 102) return n.ridge(xo * 0.14, zo * 0.07, 2) > 0.86 ? B.iceDk : B.ice;
          return n.fbm(x * 0.13, z * 0.13, 2) > 0.58 ? B.snow2 : B.snow;
        },
        under: (x, z, y, dep, sl) => dep < 1 && sl < 3 ? B.snow : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, base + 1, (x, z) => z > s(94));
      const lights = [], acts = [], landmarks = [];

      // ── 얼어붙은 폭포 ──
      const fallTop = MH.g(w, MX, s(62)), fallBot = MH.g(w, MX, s(78));
      for (let x = s(55); x <= s(73); x++) for (let z = s(62); z <= s(78) - 1; z++) {
        const g = MH.g(w, x, z);
        if (g <= fallBot) continue;
        w.set(x, g, z, (x * 3 + z) % 7 === 0 ? B.glowIce : B.icicle);
        if (hash3(x, 1, z) > 0.4) w.set(x, g + 1, z, B.icicle);
        if (w.slope[x + W * z] >= 3) for (let y = g - 1; y > fallBot; y--) if (hash3(x, y, z) > 0.35 && !w.get(x, y, z + 1)) w.set(x, y, z + 1, (x + y) % 6 === 0 ? B.glowIce : B.icicle);
      }
      const shards = w.prop({ name: 'shards', pivot: [MX + 0.5, fallBot, 100] });
      for (let i = 0; i < 20; i++) {
        const sx = 70 + i, sz = 99 + (i % 3), g = MH.g(w, sx, sz), h = w.ri(4, 10);
        for (let q = 1; q <= h; q++) if (!w.get(sx, g + q, sz)) shards.set(sx, g + q, sz, q > h - 2 ? B.glowIce : B.icicle);
      }
      lights.push({ name: 'falls', p: [MX + 0.5, fallBot + 6, 100], c: '#9fe8ff', i: 0.9, d: 30, flicker: 0.05, srcR: 9 });
      acts.push({
        name: '얼어붙은 폭포', hint: '얼음이 갈라지며 파편이 튀어요', hit: [69, fallBot, 90, 91, fallTop + 1, 103],
        run: async a => {
          a.flash('falls', 4, 2.6);
          for (let k = 0; k < 4; k++) { await a.move('shards', [0, 1, 0], 0.09); await a.move('shards', [0, 0, 0], 0.09); }
          await a.turn('shards', [0.24, 0, 0], 0.22);
          for (let k = 0; k < 3; k++) { a.burst([MX + 0.5, fallBot + 7 + k * 2, 99], { n: 50, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 11, up: 3, life: 1.8, gravity: 6, spread: 9 }); await a.wait(0.3); }
          await a.turn('shards', [0, 0, 0], 0.9);
        },
      });
      landmarks.push({ name: '얼어붙은 폭포', note: '빙하가 멈춘 자리', p: [MX + 0.5, fallTop + 11, 88] });
      landmarks.push({ name: '서리 호수', note: '서리 늑대 무리의 사냥터', p: [75.5, base + 11, 140.5] });

      // ── 얼음 성채 ──
      const L = MH.g(w, 80, 66) + 1;
      MH.flatten(w, s(34), s(4), s(94), s(52), L, B.snow, B.rock);
      const m = { wall: B.castle, band: B.castleDk, cren: B.trim, walk: B.castleDk };
      MH.wall(w, [[48, 12], [112, 12], [112, 57], [89, 57]], { m, h: 15, t: 3, y: L, buttress: true });
      MH.wall(w, [[71, 57], [48, 57], [48, 12]], { m, h: 15, t: 3, y: L, buttress: true });
      const tm = { wall: B.castle, band: B.castleDk, win: B.win, cren: B.trim, roof: B.roofI, eave: B.roofIdk, finial: B.glowIce };
      for (const [tx, tz] of [[48, 12], [112, 12], [48, 57], [112, 57]]) MH.tower(w, { cx: tx, cz: tz, y0: L + 1, h: 27, r: 5.6, m: tm, step: 0.36 });
      for (const tx of [71, 89]) MH.tower(w, { cx: tx, cz: 59, y0: L + 1, h: 24, r: 4.4, m: tm, step: 0.36 });
      // 바깥벽 화살구멍, 처마 밑 고드름, 벽 밑 눈더미
      const faceZ = (x, y, z0) => { let z = z0; while (z > z0 - 8 && !w.get(x, y, z)) z--; return z; };
      const faceX = (z, y, x0) => { let x = x0; while (x > x0 - 8 && !w.get(x, y, z)) x--; return x; };
      for (let x = 50; x <= 110; x++) {
        if (x > 64 && x < 96) continue;
        const fz = faceZ(x, L + 7, 63);
        if (fz <= 55) continue;
        if (x % 6 === 2) w.box(x, L + 6, fz, x, L + 8, fz, B.iron);
        const iz = faceZ(x, L + 12, 63);
        if (iz > 55 && hash3(x, 2, 9) > 0.4) { const k = 1 + Math.floor(hash3(x, 4, 9) * 3); for (let q = 0; q < k; q++) if (!w.get(x, L + 11 - q, iz + 1)) w.set(x, L + 11 - q, iz + 1, q === k - 1 ? B.glowIce : B.icicle); }
        if (!w.get(x, L + 1, fz + 1)) { w.set(x, L + 1, fz + 1, B.snow2); if (hash3(x, 6, 1) > 0.5) w.set(x, L + 2, fz + 1, B.snow); }
      }
      for (let z = 18; z <= 52; z++) {
        const fx = faceX(z, L + 7, 118);
        if (fx <= 110) continue;
        if (z % 6 === 3) w.box(fx, L + 6, z, fx, L + 8, z, B.iron);
        if (hash3(z, 2, 7) > 0.4) for (let q = 0; q < 1 + Math.floor(hash3(z, 4, 7) * 3); q++) if (!w.get(fx + 1, L + 11 - q, z)) w.set(fx + 1, L + 11 - q, z, B.icicle);
        if (!w.get(fx + 1, L + 1, z)) w.set(fx + 1, L + 1, z, B.snow2);
      }
      // 성문 누각: 문 위로 쇠창살이 다 들어갈 만큼 벽을 두되, 안뜰 너머 왕좌를 가리지 않을 높이로
      w.box(72, L + 1, 56, 88, L + 21, 60, B.castle);
      w.box(75, L + 1, 56, 85, L + 10, 60, 0);
      for (let x = 76; x <= 84; x++) w.set(x, L + 11, 60, 0);
      w.box(74, L + 11, 61, 86, L + 11, 61, B.trim); w.box(76, L + 12, 61, 84, L + 12, 61, B.castleDk);
      for (const bx of [72, 87]) { w.box(bx, L + 1, 61, bx + 1, L + 18, 61, B.castleDk); w.box(bx, L + 19, 61, bx + 1, L + 19, 62, B.trim); w.set(bx + (bx < 80 ? 1 : 0), L + 14, 62, B.iron); w.set(bx + (bx < 80 ? 1 : 0), L + 15, 62, B.blueFire); }
      for (let x = 72; x <= 88; x++) { w.set(x, L + 20, 61, B.castleDk); if (x % 2 === 0) w.set(x, L + 19, 61, B.castleDk); }
      w.walls(71, L + 22, 55, 89, L + 22, 61, B.trim);
      for (let x = 72; x <= 88; x += 2) { w.set(x, L + 23, 61, B.trim); w.set(x, L + 23, 55, B.trim); }
      for (let x = 77; x <= 83; x++) w.set(x, L + 17, 61, x === 80 ? B.glowIce : B.trim);
      const gate = w.prop({ name: 'gate', pivot: [80.5, L + 1, 61.5] });
      for (let x = 75; x <= 85; x++) for (let y = L + 1; y <= L + 10; y++) if ((x % 2 === 0 || (y - L) % 3 === 1) && !w.get(x, y, 61)) gate.set(x, y, 61, y === L + 1 && x % 2 === 0 ? B.trim : B.iron);
      for (const bx of [69, 91]) { const g = MH.g(w, bx, 65); w.box(bx - 1, g + 1, 64, bx + 1, g + 1, 66, B.castleDk); w.box(bx, g + 2, 65, bx, g + 5, 65, B.iron); w.box(bx - 1, g + 6, 64, bx + 1, g + 6, 66, B.iron); w.box(bx, g + 7, 65, bx, g + 8, 65, B.blueFire); lights.push({ p: [bx + 0.5, g + 8, 65.5], c: '#6ad0ff', i: 1, d: 18, flicker: 0.3 }); }
      // 성문 앞 얼어붙은 보급 상자
      for (const [cx, cz, hh] of [[64, 63, 2], [66, 66, 1], [95, 63, 2], [97, 61, 1]]) { const g = MH.g(w, cx, cz); w.box(cx, g + 1, cz, cx + 1, g + hh, cz + 1, B.wood); w.box(cx, g + hh + 1, cz, cx + 1, g + hh + 1, cz + 1, B.snow); w.set(cx, g + 1, cz + 1, B.iron); }
      acts.push({
        name: '얼음 성문', hint: '쇠창살이 올라가고 다시 내려와요', hit: [75, L + 1, 56, 85, L + 10, 62],
        run: async a => { await a.move('gate', [0, 10.5, 0], 2.4); await a.wait(2); await a.move('gate', [0, 0, 0], 1.2, t => t * t); a.burst([80.5, L + 1, 62.5], { n: 40, colors: ['#ffffff', '#dfefff'], speed: 7, up: 1, life: 1, gravity: 2, spread: 6, flat: true }); },
      });
      landmarks.push({ name: '얼음 성문', note: '중간 보스 · 서리 기사단장', p: [80.5, L + 32, 59], mid: true });
      // 왕좌의 방: 앞이 트인 기둥 회랑
      const hx0 = 60, hx1 = 100, hz0 = 20, hz1 = 44, HH = 25;
      w.box(hx0, L + 1, hz0, hx1, L + HH, hz1, B.castle);
      w.box(hx0 + 1, L + 1, hz0 + 1, hx1 - 1, L + HH - 1, hz1, 0);
      w.box(hx0, L + 1, hz0, hx1, L + 2, hz1, B.castleDk); w.box(hx0 + 1, L + 1, hz0 + 1, hx1 - 1, L + 2, hz1, 0);
      for (let x = hx0 + 2; x <= hx1 - 2; x += 5) {
        w.box(x, L + 1, hz1, x, L + 20, hz1, B.trim);
        w.box(x - 1, L + 1, hz1, x + 1, L + 2, hz1, B.castleDk); w.box(x - 1, L + 19, hz1, x + 1, L + 20, hz1, B.castleDk);
        for (let y = L + 5; y < L + 19; y += 4) w.set(x, y, hz1 + 1, B.castleDk);
      }
      w.box(hx0, L + 21, hz1, hx1, L + 21, hz1, B.castle); w.box(hx0, L + 21, hz1 + 1, hx1, L + 21, hz1 + 1, B.trim);
      for (let x = hx0 + 4; x <= hx1 - 4; x += 5) w.set(x, L + 22, hz1 + 1, B.glowIce);
      for (let z = hz0 + 3; z <= hz1 - 3; z += 5) for (const [x, dx] of [[hx0, -1], [hx1, 1]]) {
        w.box(x, L + 6, z, x, L + 19, z + 1, B.win); w.box(x + dx, L + 20, z - 1, x + dx, L + 20, z + 2, B.trim); w.box(x + dx, L + 5, z - 1, x + dx, L + 5, z + 2, B.trim);
        w.box(x + dx, L + 6, z - 1, x + dx, L + 19, z - 1, B.castleDk); w.box(x + dx, L + 6, z + 2, x + dx, L + 19, z + 2, B.castleDk);
      }
      for (let z = hz0 + 1; z <= hz1 - 1; z += 5) for (const [bx, dx] of [[hx0, -1], [hx1, 1]]) {
        w.box(bx + dx * 2, L + 1, z, bx + dx * 2, L + 17, z, B.castleDk); w.box(bx + dx * 3, L + 1, z, bx + dx * 3, L + 9, z, B.castleDk);
        w.box(bx + dx * 2, L + 18, z, bx + dx * 2, L + 19, z, B.trim); w.set(bx + dx * 2, L + 20, z, B.glowIce);
      }
      MH.roof(w, hx0 - 1, hx1 + 1, hz0 - 1, hz1 + 2, L + HH + 1, { b: B.roofI, eave: B.roofIdk, ridge: B.trim, pitch: 1, gable: B.castle, axis: 'x' });
      // 앞쪽 지붕은 무너져 왕좌가 하늘 아래 드러난다: 깨진 끝에 고드름, 바닥엔 쌓인 눈
      for (let z = 25; z <= hz1 + 2; z++) for (let x = hx0 - 1; x <= hx1 + 1; x++) {
        if ((x - hx0 < 2 || hx1 - x < 2) && hash3(x, 3, z) > 0.3 + (z - 25) * 0.032) continue;
        for (let y = L + HH; y <= L + HH + 20; y++) if (y > L + HH || (x > hx0 && x < hx1 && z < hz1)) w.set(x, y, z, 0);
      }
      const icl = [];
      for (let x = hx0 + 1; x < hx1; x++) {
        let y = L + HH + 20; while (y > L + HH && !w.get(x, y, 24)) y--;
        // 몇 개는 떨어지는 고드름(부품)으로: 더 길고 굵다
        const big = (x - hx0) % 6 === 3, k = big ? 8 : 1 + Math.floor(hash3(x, 5, 27) * 5), tw = big ? w.prop({ name: 'icl' + x, pivot: [x + 0.5, y, 24.5] }) : w;
        for (let q = 1; q <= k; q++) if (!w.get(x, y - q, 24)) tw.set(x, y - q, 24, q === k ? B.glowIce : B.icicle);
        if (big) { for (let q = 1; q <= 3; q++) tw.set(x, y - q, 25, B.icicle); icl.push(['icl' + x, x, y - k]); }
      }
      for (let i = 0; i < 110; i++) { const x = w.ri(hx0 + 1, hx1 - 1), z = w.ri(30, hz1); if (x < 76 || x > 84) w.fill(x, L + 1, z, B.snow2); }
      for (let z = hz0 + 6; z <= hz1 + 12; z++) for (let x = 76; x <= 84; x++) w.set(x, L, z, (x === 76 || x === 84) ? B.gold : ((z % 6 === 0 && x === 80) ? B.glowIce : B.carpet));
      for (let st = 0; st < 5; st++) w.box(69 + st, L + 1 + st, hz0 + 1, 91 - st, L + 1 + st, hz0 + 8 - st, st % 2 ? B.trim : B.castleDk);
      const ty = L + 6;
      w.box(77, ty, hz0 + 1, 83, ty + 1, hz0 + 4, B.glowIce); w.box(77, ty + 2, hz0 + 1, 83, ty + 14, hz0 + 1, B.ice);
      w.box(77, ty + 2, hz0 + 2, 77, ty + 6, hz0 + 4, B.ice); w.box(83, ty + 2, hz0 + 2, 83, ty + 6, hz0 + 4, B.ice);
      w.set(77, ty + 7, hz0 + 4, B.glowIce); w.set(83, ty + 7, hz0 + 4, B.glowIce);
      for (const [sx, h] of [[77, 17], [78, 20], [79, 22], [80, 26], [81, 22], [82, 20], [83, 17], [76, 15], [84, 15], [75, 11], [85, 11], [74, 8], [86, 8]]) w.box(sx, ty + 2, hz0 + 1, sx, ty + h, hz0 + 1, B.glowIce);
      w.box(78, ty + 2, hz0 + 2, 82, ty + 2, hz0 + 4, B.carpet); w.box(78, ty + 3, hz0 + 2, 82, ty + 9, hz0 + 2, B.carpet);
      w.box(79, ty + 3, hz0 + 3, 81, ty + 3, hz0 + 3, B.crown); w.set(79, ty + 4, hz0 + 3, B.crown); w.set(81, ty + 4, hz0 + 3, B.crown); w.box(80, ty + 4, hz0 + 3, 80, ty + 5, hz0 + 3, B.crown);
      for (const bx of [67, 93]) { w.box(bx, L + 1, hz1 - 5, bx, L + 5, hz1 - 5, B.iron); w.box(bx - 1, L + 6, hz1 - 6, bx + 1, L + 6, hz1 - 4, B.iron); w.box(bx, L + 7, hz1 - 5, bx, L + 8, hz1 - 5, B.blueFire); lights.push({ p: [bx + 0.5, L + 9, hz1 - 4.5], c: '#6ad0ff', i: 1.1, d: 20, flicker: 0.3 }); }
      lights.push({ name: 'throne', p: [80.5, ty + 8, hz0 + 5.5], c: '#80d8ff', i: 1.5, d: 32, flicker: 0.05 });
      acts.push({
        name: '겨울 왕좌', hint: '왕관이 타오르고 눈보라가 몰아쳐요', hit: [74, ty, hz0 + 1, 86, ty + 17, hz0 + 5],
        run: async a => {
          a.flash('throne', 4, 3.6); a.glow(1.7, 3.6);
          for (let k = 0; k < 6; k++) { a.burst([80.5, ty + 6, hz0 + 5], { n: 50, colors: ['#ffffff', '#c8ecfa', '#ffe08a'], speed: 16, up: 2, life: 2, gravity: 0.5, spread: 2.5, flat: true }); await a.wait(0.4); }
        },
      });
      landmarks.push({ name: '겨울의 왕좌', note: '보스 · 겨울의 왕', p: [80.5, L + 45, 32], boss: true });
      MH.tower(w, { cx: 80, cz: 11, y0: L + 1, h: 37, r: 6.25, m: tm, step: 0.34 });
      // ── 성문에서 호숫가까지: 눈길과 폭포 옆 돌계단 ──
      const path1 = [[80.5, 66], [71, 72.5], [59.5, 77.5]];
      MH.path(w, path1, 2.75, B.trail);
      const sTop = MH.g(w, 59, 77), sBot = MH.g(w, 59, 102);
      MH.flight(w, { name: '폭포 옆 계단', axis: 'z', c: 59, half: 4, a: 79, b: 100, ha: sTop, hb: sBot, step: B.flag, edge: B.castleDk, fill: B.rock, rail: B.castleDk, post: B.castle, postGap: 5,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.blueFire); if (k === 10 && x > 59) lights.push({ p: [x + 0.5, y + 1, z + 0.5], c: '#6ad0ff', i: 0.9, d: 18, flicker: 0.3 }); } });
      MH.path(w, [[59.5, 101], [60.5, 110], [65, 116]], 2.75, B.trail);

      // ── 기사단 묘역(새 구역): 폭포 동쪽 단, 쇠울타리 안의 묘비와 얼음관, 서리 영묘 ──
      const GX0 = 102, GX1 = 130, GZ0 = 70, GZ1 = 98, GL = MH.g(w, 112, 86);
      const inGrave = (x, z) => x >= GX0 - 4 && x <= GX1 + 4 && z >= GZ0 - 4 && z <= GZ1 + 4;
      const path2 = [[84, 66], [95, 73], [102, 84.5]];
      MH.path(w, path2, 1.8, B.trail);
      MH.flatten(w, GX0, GZ0, GX1, GZ1, GL, B.snow, B.rock);
      MH.retain(w, GX0, GZ0, GX1, GZ1, B.castleDk, B.trim);
      for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) if (n.fbm(x * 0.2, z * 0.2, 2) > 0.55) MH.paint(w, x, z, B.snow2);
      for (let x = GX0; x <= 117; x++) for (let z = 83; z <= 85; z++) MH.paint(w, x, z, (x + z) % 3 ? B.flag : B.trail);
      // 쇠울타리(서쪽에 출입구)
      MH.fence(w, [[GX0, 82], [GX0, GZ0], [GX1, GZ0], [GX1, GZ1], [GX0, GZ1], [GX0, 87]], B.iron, B.iron);
      for (const gz of [82, 87]) { w.box(GX0, GL + 1, gz, GX0, GL + 6, gz, B.castleDk); w.set(GX0, GL + 7, gz, B.trim); w.set(GX0, GL + 8, gz, B.blueFire); }
      w.box(GX0, GL + 8, 83, GX0, GL + 8, 86, B.iron); w.set(GX0, GL + 9, 84, B.iron); w.set(GX0, GL + 9, 85, B.iron);
      // 서리 영묘
      const M0 = 108, M1 = 123, MZ0 = 71, MZ1 = 81, MC = 115.5;
      w.box(M0 - 1, GL + 1, MZ0 - 1, M1 + 1, GL + 1, MZ1 + 1, B.castleDk);
      w.box(110, GL + 1, MZ1 + 2, 121, GL + 1, MZ1 + 3, B.flag);
      w.box(M0, GL + 2, MZ0, M1, GL + 13, MZ1, B.castle); w.box(M0 + 1, GL + 2, MZ0 + 1, M1 - 1, GL + 12, MZ1 - 1, 0);
      w.walls(M0, GL + 13, MZ0, M1, GL + 13, MZ1, B.trim); w.walls(M0, GL + 7, MZ0, M1, GL + 7, MZ1, B.castleDk);
      for (const px of [M0, M0 + 3, M1 - 3, M1]) { w.box(px, GL + 2, MZ1 + 1, px, GL + 12, MZ1 + 1, B.trim); w.box(px, GL + 2, MZ1 + 1, px, GL + 2, MZ1 + 2, B.castleDk); w.box(px, GL + 12, MZ1 + 1, px, GL + 12, MZ1 + 2, B.castleDk); }
      for (const z of [74, 78]) for (const x of [M0, M1]) w.box(x, GL + 4, z, x, GL + 10, z, B.win);
      MH.roof(w, M0 - 1, M1 + 1, MZ0 - 1, MZ1 + 2, GL + 14, { b: B.roofI, eave: B.roofIdk, ridge: B.trim, pitch: 1, gable: B.castle, axis: 'z', gwin: B.glowIce });
      const mpk = GL + 14 + 9;
      w.box(115, mpk - 1, MZ1 + 2, 116, mpk + 2, MZ1 + 2, B.glowIce); w.box(114, mpk + 1, MZ1 + 2, 117, mpk + 1, MZ1 + 2, B.glowIce);
      // 영묘 안: 빛나는 얼음관
      w.box(113, GL + 2, 73, 118, GL + 3, 76, B.ice); w.box(114, GL + 4, 74, 117, GL + 4, 75, B.glowIce); w.box(MC - 0.5, GL + 2, 72, MC + 0.5, GL + 8, 72, B.glowIce);
      // 문간과 두 짝 문(부품)
      const dop = (x, y) => y <= GL + 8 || (y === GL + 9 && x > 113 && x < 118);
      for (let y = GL + 2; y <= GL + 9; y++) for (let x = 113; x <= 118; x++) if (dop(x, y)) w.set(x, y, MZ1, 0);
      for (let y = GL + 2; y <= GL + 10; y++) { w.set(112, y, MZ1 + 1, B.castleDk); w.set(119, y, MZ1 + 1, B.castleDk); }
      w.box(112, GL + 10, MZ1 + 1, 119, GL + 10, MZ1 + 1, B.castleDk); w.box(114, GL + 11, MZ1 + 1, 117, GL + 11, MZ1 + 1, B.gold);
      const mdL = w.prop({ name: 'mdoorL', pivot: [113, GL + 2, MZ1 + 1] }), mdR = w.prop({ name: 'mdoorR', pivot: [119, GL + 2, MZ1 + 1] });
      for (let y = GL + 2; y <= GL + 9; y++) for (let x = 113; x <= 118; x++) if (dop(x, y)) (x <= 115 ? mdL : mdR).set(x, y, MZ1, (y - GL) % 3 === 0 || x === 113 || x === 118 ? B.iron : (x === 115 || x === 116) && y === GL + 5 ? B.gold : B.roofIdk);
      lights.push({ name: 'tomb', p: [MC, GL + 6, 76], c: '#9fe8ff', i: 0.6, d: 20, flicker: 0.1 });
      // 묘비와 칼 무덤
      const graves = [];
      for (const gz of [89, 95]) for (const gx of [105, 110, 121, 126]) {
        const k = graves.length, broken = k === 2 || k === 7;
        w.box(gx - 1, GL + 1, gz, gx + 1, broken ? GL + 2 : GL + 3, gz, B.castleDk);
        if (!broken) { w.set(gx, GL + 4, gz, B.castleDk); w.set(gx - 1, GL + 4, gz, B.snow); w.set(gx + 1, GL + 4, gz, B.snow); w.set(gx, GL + 5, gz, B.snow); w.set(gx, GL + 2, gz + 1, k % 3 ? B.trim : B.gold); }
        else { w.set(gx + 2, GL + 1, gz + 1, B.castleDk); w.set(gx + 2, GL + 1, gz + 2, B.castleDk); }
        w.box(gx - 1, GL + 1, gz + 2, gx + 1, GL + 1, gz + 4, B.snow2);
        if (k % 2 === 0) { w.box(gx, GL + 2, gz + 3, gx, GL + 4, gz + 3, B.iron); w.box(gx - 1, GL + 5, gz + 3, gx + 1, GL + 5, gz + 3, B.gold); w.set(gx, GL + 6, gz + 3, B.iron); w.set(gx, GL + 7, gz + 3, B.gold); }
        graves.push([gx, gz + 3]);
      }
      // 등불 기둥
      for (const [lx, lz] of [[116, 91], [116, 97], [104, 76], [127, 76]]) { const g = MH.g(w, lx, lz); w.box(lx, g + 1, lz, lx, g + 5, lz, B.iron); w.set(lx, g + 6, lz, B.blueFire); w.set(lx, g + 7, lz, B.iron); }
      lights.push({ name: 'grave', p: [116, GL + 7, 92], c: '#7ad8ff', i: 0.6, d: 26, flicker: 0.25 });
      // 얼음관 두 개(뚜껑은 부품)
      const coffins = [];
      for (const cx of [104, 126]) {
        w.box(cx - 1, GL + 1, 77, cx + 1, GL + 2, 82, B.ice); w.box(cx, GL + 2, 78, cx, GL + 2, 81, B.glowIce);
        w.box(cx - 1, GL + 1, 76, cx + 1, GL + 1, 76, B.castleDk); w.box(cx - 1, GL + 1, 83, cx + 1, GL + 1, 83, B.castleDk);
        const nm = 'lid' + coffins.length, p = w.prop({ name: nm, pivot: [cx + (cx < 116 ? -1 : 2), GL + 3, 79.5], axis: 'z' });
        p.box(cx - 1, GL + 3, 77, cx + 1, GL + 3, 82, B.iceDk); p.box(cx, GL + 3, 78, cx, GL + 3, 81, B.trim); p.set(cx, GL + 4, 79, B.gold); p.set(cx, GL + 4, 80, B.gold);
        coffins.push([cx, nm]);
      }
      landmarks.push({ name: '기사단 묘역', note: '새 구역 · 얼어붙은 망자들이 잠든 곳', p: [116, GL + 18, 92] });
      landmarks.push({ name: '서리 영묘', note: '옛 기사단장들의 얼음관', p: [MC, GL + 31, 76] });
      acts.push({
        name: '서리 영묘의 문', hint: '영묘의 두 문짝이 바깥으로 열리고 안에서 푸른 냉기가 쏟아져 나와요', hit: [113, GL + 2, MZ1 - 1, 118, GL + 9, MZ1 + 2],
        run: async a => {
          a.flash('tomb', 6, 5);
          await Promise.all([a.turn('mdoorL', [0, -1.3, 0], 1.3), a.turn('mdoorR', [0, 1.3, 0], 1.3)]);
          for (let k = 0; k < 7; k++) { a.burst([MC, GL + 3, MZ1 + 1], { n: 30, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 4, up: 0.5, life: 1.8, gravity: 0.4, spread: 2, flat: true }); await a.wait(0.3); }
          await a.wait(0.8);
          await Promise.all([a.turn('mdoorL', [0, 0, 0], 1.1), a.turn('mdoorR', [0, 0, 0], 1.1)]);
        },
      });
      acts.push({
        name: '열리는 얼음관', hint: '묘역의 얼음관 뚜껑이 들썩 들리며 옆으로 젖혀지고 서리가 뿜어져 나와요', hit: [103, GL + 1, 76, 105, GL + 4, 83],
        run: async a => {
          for (const [, nm] of coffins) for (let k = 0; k < 3; k++) { await a.move(nm, [0, 0.4, 0], 0.07); await a.move(nm, [0, 0, 0], 0.07); }
          await Promise.all(coffins.map(([cx, nm]) => a.tween(nm, { off: [0, 1, 0], rot: [0, 0, cx < 116 ? 1.2 : -1.2] }, 0.8)));
          for (let k = 0; k < 4; k++) { for (const [cx] of coffins) a.burst([cx + 0.5, GL + 3, 80], { n: 22, colors: ['#ffffff', '#9fe8ff', '#c8ecfa'], speed: 3, up: 6, life: 1.4, gravity: -0.3, spread: 1.5 }); await a.wait(0.35); }
          await a.wait(0.6);
          await Promise.all(coffins.map(([, nm]) => a.tween(nm, { off: [0, 0, 0], rot: [0, 0, 0] }, 1)));
        },
      });
      acts.push({
        name: '묘역의 혼불', hint: '무덤마다 푸른 혼불이 하나씩 피어올라 묘역 위를 맴돌아요', hit: [104, GL + 1, 88, 128, GL + 7, 99],
        run: async a => {
          a.flash('grave', 5, 5); a.glow(1.5, 5);
          for (const [gx, gz] of graves) { a.burst([gx + 0.5, GL + 2, gz + 0.5], { n: 20, colors: ['#6ad0ff', '#9fe8ff', '#ffffff'], speed: 1, up: 4, life: 2, gravity: -0.6, spread: 0.8 }); await a.wait(0.3); }
          for (let k = 0; k < 16; k++) { const t = k / 16 * Math.PI * 2; a.burst([116 + Math.cos(t) * 11, GL + 9 + Math.sin(k) * 1.5, 92 + Math.sin(t) * 6], { n: 6, colors: ['#9fe8ff', '#e0f8ff'], speed: 0.5, up: 0.5, life: 1.2, gravity: 0, spread: 0.4 }); await a.wait(0.08); }
          await a.wait(0.8);
        },
      });

      const onTrail = (x, z) => (x > 50 && x < 69 && z > 69 && z < 120) || MH.polyDist(x, z, path1) < 5 || MH.polyDist(x, z, path2) < 4 || inGrave(x, z);
      // ── 빙하 위 얼음다리와 얼음 가시 ──
      for (let i = 0; i < 40; i++) {
        const x = w.ri(62, 98), z = w.ri(105, 125), g = MH.g(w, x, z);
        if (g < 0 || onTrail(x, z) || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
        const h = w.ri(5, 15);
        MH.cone(w, x, z, g + 1, w.r(1.5, 3), B.ice, 2.8 / h);
        w.set(x, g + h, z, B.glowIce);
      }
      // ── 전나무 숲 ──
      for (let i = 0; i < 130; i++) {
        const x = w.ri(4, W - 5), z = w.ri(50, D - 5), g = MH.g(w, x, z);
        if (g < 0 || dxOf(x, z) < 21 || onTrail(x, z) || (x > 96 && x < 140 && z > 64 && z < 116) || w.slope[x + W * z] > 1 || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
        MH.tree(w, x, g + 1, z, { kind: 'pine', h: w.ri(15, 25), bark: B.trunk, leaves: [B.pine, B.pine, B.pineDk], snow: B.snow, r: w.r(4, 5.75) });
      }
      // ── 무너진 망루 ──
      const RX = s(22), RZ = s(80), rg = MH.g(w, RX, RZ) + 1;
      MH.flatten(w, RX - 6, RZ - 6, RX + 6, RZ + 6, rg - 1, B.snow2, B.rock);
      MH.tower(w, { cx: RX, cz: RZ, y0: rg, h: 22, r: 5, m: { wall: B.castleDk, band: B.castle, win: B.iron } });
      for (let i = 0; i < 100; i++) { const a = w.r(0, 6.28), rr = w.r(0, 6); w.set(RX + Math.round(Math.cos(a) * rr), rg + 22 - w.ri(0, 9), RZ + Math.round(Math.sin(a) * rr), 0); }
      for (let i = 0; i < 28; i++) { const x = RX + w.ri(-10, 10), z = RZ + w.ri(-10, 10), g = MH.g(w, x, z); if (!w.get(x, g + 1, z)) { w.set(x, g + 1, z, B.castleDk); if (i % 3 === 0) w.set(x, g + 2, z, B.snow); } }
      landmarks.push({ name: '무너진 망루', note: '창백한 기사들의 순찰로', p: [RX + 0.5, rg + 30, RZ + 0.5] });
      // ── 고드름 낙하: 무너진 지붕 끝의 큰 고드름이 왕좌의 방 바닥에 떨어져 부서진다 ──
      if (icl.length) acts.push({
        name: '고드름 낙하', hint: '무너진 지붕 끝 큰 고드름들이 떨어져 왕좌의 방 바닥에 부서졌다가 다시 맺혀요', hit: [hx0 + 2, icl[0][2] - 1, 23, hx1 - 2, L + HH, 26],
        run: async a => {
          for (let k = 0; k < 4; k++) { await Promise.all(icl.map(([nm]) => a.move(nm, [0.2 * (k % 2 ? 1 : -1), 0, 0], 0.07))); }
          for (const [nm, x, y] of icl) {
            const drop = y - L - 1;
            await a.move(nm, [0, -drop, 1], 0.45, t => t * t);
            a.burst([x + 0.5, L + 1.5, 25.5], { n: 36, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 8, up: 3, life: 1.2, gravity: 6, spread: 2 });
            a.tween(nm, { scl: [0, 0, 0] }, 0.1);
            await a.wait(0.25);
          }
          await a.wait(0.6);
          await Promise.all(icl.map(([nm]) => a.respawn(nm, 1.0)));
        },
      });

      // ── 망루의 봉화: 무너진 망루 꼭대기에 푸른 불길이 치솟는다 ──
      let bt = rg + 22; while (bt > rg && !w.get(RX, bt, RZ)) bt--;
      w.box(RX - 1, bt + 1, RZ - 1, RX + 1, bt + 1, RZ + 1, B.iron); w.set(RX, bt + 2, RZ, B.blueFire);
      lights.push({ name: 'beacon', p: [RX + 0.5, bt + 3, RZ + 0.5], c: '#6ad0ff', i: 0.5, d: 36, flicker: 0.4 });
      acts.push({
        name: '망루의 봉화', hint: '무너진 망루 꼭대기에 푸른 봉화가 치솟아 계곡을 비춰요', hit: [RX - 2, bt, RZ - 2, RX + 2, bt + 3, RZ + 2],
        run: async a => {
          a.flash('beacon', 8, 5); a.glow(1.5, 5);
          for (let k = 0; k < 12; k++) { a.burst([RX + 0.5, bt + 2.5, RZ + 0.5], { n: 26, colors: ['#6ad0ff', '#9fe8ff', '#ffffff'], speed: 2, up: 10, life: 1.4, gravity: -0.5, spread: 1.2 }); await a.wait(0.35); }
        },
      });

      // ── 서리 호수의 유빙(부품): 얼음이 갈라지며 얼음판이 기울었다 가라앉는다 ──
      const IX = s(60), IZ = s(107), iy = base + 2;
      const floe = w.prop({ name: 'floe', pivot: [IX + 0.5, iy, IZ + 0.5] });
      for (let dz = -4; dz <= 4; dz++) for (let dx = -5; dx <= 5; dx++) if (Math.abs(dx) + Math.abs(dz) * 1.3 <= 6.5 && !w.get(IX + dx, iy, IZ + dz)) floe.set(IX + dx, iy, IZ + dz, hash3(dx, 4, dz) > 0.75 ? B.iceDk : B.ice);
      floe.set(IX - 1, iy + 1, IZ, B.snow2); floe.set(IX + 2, iy + 1, IZ + 1, B.snow2); floe.set(IX + 3, iy + 1, IZ - 1, B.snow2);
      acts.push({
        name: '갈라지는 유빙', hint: '서리 호수의 얼음판이 쩍 갈라지며 기울었다가 물보라와 함께 가라앉고, 새 얼음판이 스르륵 떠올라요', hit: [IX - 5, iy, IZ - 4, IX + 5, iy + 1, IZ + 4],
        run: async a => {
          for (let k = 0; k < 5; k++) { a.burst([IX + 0.5 + (k - 2) * 2.5, iy + 1, IZ + 0.5 + (k % 2) * 2 - 1], { n: 14, colors: ['#ffffff', '#b4e2f2'], speed: 3, up: 1, life: 0.7, gravity: 4, spread: 0.6, flat: true }); await a.wait(0.12); }
          await a.tween('floe', { off: [0, 2, 0], rot: [0.55, 0, 0.25] }, 0.6);
          await a.wait(0.4);
          await a.tween('floe', { off: [0, -4, 0], rot: [0.2, 0, 0.1] }, 0.9, t => t * t);
          for (let k = 0; k < 3; k++) { a.burst([IX + 0.5, iy + 1, IZ + 0.5], { n: 40, colors: ['#ffffff', '#b4e2f2', '#8cc8e0'], speed: 6, up: 5, life: 1.3, gravity: 7, spread: 3.5 }); await a.wait(0.25); }
          await a.wait(0.6);
          await a.respawn('floe', 1.2);
        },
      });

      // ── 눈 털어내는 전나무(부품): 바람에 크게 흔들리며 눈 더미를 쏟는다 ──
      let pine = null;
      for (let z = 72; z <= 125 && !pine; z += 2) for (let x = 138; x >= 22 && !pine; x -= 2) {
        const g = MH.g(w, x, z);
        if (g < 0 || w.slope[x + W * z] > 2 || w.liq[x + W * z] >= 0 || onTrail(x, z) || Math.hypot(x - 80, z - 65) < 22) continue;
        let free = true;
        for (let y = g + 1; y <= g + 24 && free; y++) for (let dz = -5; dz <= 5 && free; dz++) for (let dx = -5; dx <= 5; dx++) if (w.get(x + dx, y, z + dz)) { free = false; break; }
        if (free) pine = [x, g, z];
      }
      if (pine) {
        const [px, pg, pz] = pine;
        const pp = w.prop({ name: 'pine', pivot: [px + 0.5, pg + 1, pz + 0.5], axis: 'z' });
        const ptop = MH.tree(pp, px, pg + 1, pz, { kind: 'pine', h: 21, bark: B.trunk, leaves: [B.pine, B.pine, B.pineDk], snow: B.snow, r: 5 });
        acts.push({
          name: '흔들리는 전나무', hint: '큰 전나무가 찬바람에 휘청이며 가지 위 눈을 우수수 쏟아내요', hit: [px - 5, pg + 1, pz - 5, px + 5, ptop, pz + 5],
          run: async a => {
            a.wind(3, 3);
            for (let k = 0; k < 4; k++) {
              await a.turn('pine', [0.12, 0, k % 2 ? 0.14 : -0.14], 0.35);
              a.burst([px + 0.5, pg + 10 + k * 2.5, pz + 0.5], { n: 50, colors: ['#ffffff', '#e8f0f6', '#dfefff'], speed: 4, up: 1, life: 2, gravity: 3, spread: 5 });
            }
            await a.turn('pine', [0, 0, 0], 0.8);
          },
        });
      }

      // ── 오로라: 성채 위 하늘에 푸른 빛의 장막이 일렁인다 ──
      acts.push({
        name: '오로라', hint: '성채 위 하늘에 푸르고 초록빛 오로라가 장막처럼 일렁여요', hit: [70, L + 35, 32, 90, L + 42, 40],
        run: async a => {
          a.glow(1.6, 6); a.flash('throne', 2, 6);
          for (let r = 0; r < 3; r++) for (let k = 0; k <= 16; k++) {
            const x = 37 + k * 5.25, z = 37 + Math.sin(k * 0.6 + r) * 7.5, y = Math.min(w.H - 6, L + 42 + Math.sin(k * 0.4 + r * 1.3) * 4);
            a.burst([x, y, z], { n: 12, colors: r % 2 ? ['#7affc8', '#9fe8ff', '#c8ffe8'] : ['#9fe8ff', '#b088ff', '#e0f8ff'], speed: 0.7, up: -2, life: 2.2, gravity: 0.6, spread: 1.5 });
            await a.wait(0.07);
          }
          await a.wait(1.4);
        },
      });
      MH.scatter(w, 780, (x, g, z, b) => { if (b === B.snow && w.chance(0.3)) w.set(x, g + 1, z, B.snow2); });
      return { lights, landmarks, acts };
    },
  });
})();
