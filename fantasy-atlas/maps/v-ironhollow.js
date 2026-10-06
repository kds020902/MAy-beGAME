// 무쇠골 — 거대한 산벽의 광산, 절벽 선반 위 드워프 마을, 용암 협곡과 철교, 협곡 남쪽 제련소 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 128;
  const K = W / 128;
  MAPS.push({
    id: 'ironhollow', cat: 'village', name: '무쇠골', en: 'Ironhollow', color: '#e08a3a', seed: 127, base: 24, time: 'night', size: [W, D, Hh],
    desc: '산을 파고 들어간 드워프 광산 마을. 망치 소리가 그치는 날은 일 년에 단 하루뿐이다. 캐낸 광석은 철교를 건너 협곡 남쪽 제련소의 용광로로 간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '드워프 장인 80여 명'], ['특산물', '미스릴 도끼 · 흑맥주 · 세공 보석'], ['소문', '가장 깊은 갱도에서 누군가 망치를 두드린다']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.64], sun: ['#ffc890', 0.7, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.6], sun: ['#ffe8d0', 0.78, [0.4, 1, 0.6]], haze: '#c89060' },
    liquid: ['#8a1a0a', '#ff5a1a', '#ffe08a'], liqSpeed: 0.6, liqGlow: true,
    fog: { box: [84, 92, 90, 96], start: 0.8, floor: 8, depth: 10, haze: [18, 0.3, 8], hazeColor: '#7a3a1a' },
    camY: 2, zoom: 1.0,
    particles: [
      { n: 210, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 1, area: [84, 123, 50], y0: 14, y1: 60 },
      { n: 200, colors: ['#8a7a70', '#6a5c54'], mode: 'drift', speed: 0.4, y0: 34, y1: 100, glow: false },
    ],
    blocks: {
      rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' }, gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 },
      cliff: { c: '#6e6660', v: 0.07, pat: 'big' }, cliffDk: { c: '#4a4440', v: 0.07, pat: 'big' }, basalt: { c: '#2e2826', v: 0.06, pat: 'stone' },
      granite: { c: '#8a8078', v: 0.05, pat: 'big' }, graniteDk: { c: '#5e564e', v: 0.05, pat: 'brick' }, slate: { c: '#3a3a44', v: 0.04, pat: 'tile' },
      bronze: { c: '#c08a3a', v: 0.06 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, timber: { c: '#6a4428', v: 0.06, pat: 'log' },
      plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, coal: { c: '#141010', v: 0 }, ore: { c: '#e8c040', v: 0.1 }, oreB: { c: '#5ab0e0', v: 0.1 },
      rail: { c: '#7a7a82', v: 0.03 }, sleeper: { c: '#5a3a24', v: 0.05 }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' },
      rope: { c: '#b8a080', v: 0.04 }, leather: { c: '#6a3a24', v: 0.05 }, pave: { c: '#6a625a', top: '#847a70', v: 0.06, pat: 'stone' },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, rune: { c: '#ffd070', glow: true }, fireY: { c: '#ffe090', glow: true },
      brick: { c: '#7a4a3a', v: 0.05, pat: 'brick' }, slag: { c: '#3a3238', v: 0.08 }, gem: { c: '#c86ae8', glow: true }, gemB: { c: '#6ae8d8', glow: true }, molten: { c: '#ffb04a', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, L = base + 8;
      const CL = x => 52.5 + (n.fbm(x * 0.045 / K, 3, 2) - 0.5) * 13;
      const ZP = 107.6, ZS = 139;                                  // 고원 남쪽 끝, 협곡 남쪽 끝
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const cz = CL(x);
          let hh;
          if (z < cz) hh = 8 + Math.min(56, (cz - z) * 2.4) + n.ridge(x * 0.045 / K, z * 0.045 / K, 4) * 9;
          else if (z < ZP) hh = 8 + n.fbm(x * 0.06 / K, z * 0.06 / K) * 1.5;
          else if (z < ZS) hh = MH.lerp(8, -16, MH.sstep(ZP, ZP + 5, z)) + MH.lerp(0, 22, MH.sstep(ZS - 5, ZS, z));
          else hh = 6 + n.fbm(x * 0.06 / K, z * 0.06 / K) * 3;
          return base + hh;
        },
        surface: (x, z, y, s) => s >= 3 ? (y < base ? B.basalt : B.cliff) : y > L + 4 ? B.rock : B.gravel,
        under: (x, z, y, dep, s) => y < base - 4 ? B.basalt : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 6 === 0 ? B.cliffDk : B.cliff),
      });
      const LAVA = base - 13;
      MH.water(w, LAVA, (x, z) => z > 105 && z < 142);
      MH.flatten(w, 5, 58, 163, 106, L, B.gravel, B.rock);
      MH.flatten(w, 3, 145, 165, D - 1, L, B.gravel, B.rock);
      for (let i = 0; i < 170; i++) { const x = w.ri(2, W - 3), z = w.ri(2, 50), g = MH.g(w, x, z); if (g > L + 6 && w.slope[x + W * z] < 7) w.set(x, g, z, w.chance(0.4) ? B.oreB : B.ore); }
      const lights = [], acts = [], landmarks = [];
      lights.push({ p: [52, LAVA + 2, 123], c: '#ff5a1a', i: 1.6, d: 36, flicker: 0.2, liquid: true });
      lights.push({ p: [121, LAVA + 2, 123], c: '#ff5a1a', i: 1.6, d: 36, flicker: 0.2, liquid: true });
      // 고원 길: 넓적돌 포장
      MH.path(w, [[20, 82], [60, 82], [100, 86], [128, 86], [150, 72]], 2.2, B.pave);
      MH.path(w, [[45, 74], [45, 82]], 1.6, B.pave);

      // ── 광산 입구 ──
      const MX = 71;
      let cz = 52; while (cz < 79 && MH.g(w, MX, cz) > L + 2) cz++;
      const T0 = 8;
      w.box(MX - 4, L + 1, T0, MX + 4, L + 9, cz, 0);
      w.box(MX - 4, L + 1, T0, MX + 4, L + 9, T0, B.coal);
      w.box(MX - 4, L, T0, MX + 4, L, cz, B.graniteDk);
      for (let z = T0 + 3; z <= cz; z += 5) { w.box(MX - 4, L + 1, z, MX - 4, L + 8, z, B.timber); w.box(MX + 4, L + 1, z, MX + 4, L + 8, z, B.timber); w.box(MX - 4, L + 9, z, MX + 4, L + 9, z, B.timber); if (z % 10 === 1) w.set(MX - 3, L + 7, z, B.fireY); }
      for (let x = MX - 9; x <= MX + 9; x++) for (let y = L + 1; y <= L + 17; y++) {
        const inside = Math.abs(x - MX) <= 4 && y <= L + 9 - Math.max(0, Math.abs(x - MX) - 2);
        if (!inside) w.set(x, y, cz, (Math.abs(x - MX) >= 8 || y >= L + 15 || (y === L + 11)) ? B.granite : B.graniteDk);
        if (!inside && Math.abs(x - MX) >= 8) w.set(x, y, cz + 1, (y % 3) ? B.granite : B.graniteDk);
      }
      // 문 테두리 청동 띠와 룬
      for (let x = MX - 5; x <= MX + 5; x++) { const y = L + 10 - Math.max(0, Math.abs(x - MX) - 3); if (Math.abs(x - MX) >= 5 || y > L + 10) continue; w.set(x, y, cz + 1, B.bronze); }
      for (let y = L + 1; y <= L + 7; y++) for (const x of [MX - 5, MX + 5]) w.set(x, y, cz + 1, y % 2 ? B.bronze : B.graniteDk);
      for (let x = MX - 6; x <= MX + 6; x += 2) w.set(x, L + 12, cz + 1, B.rune);
      w.box(MX - 1, L + 14, cz + 1, MX + 1, L + 16, cz + 1, B.bronze); w.set(MX, L + 15, cz + 1, B.gold);
      for (let x = MX - 9; x <= MX + 9; x++) w.set(x, L + 18, cz + 1, x % 2 ? B.granite : B.graniteDk);
      for (const bx of [MX - 11, MX + 11]) { w.box(bx - 1, L + 1, cz + 1, bx + 1, L + 1, cz + 3, B.graniteDk); w.box(bx, L + 2, cz + 2, bx, L + 6, cz + 2, B.iron); w.box(bx - 1, L + 7, cz + 1, bx + 1, L + 7, cz + 3, B.iron); w.box(bx, L + 8, cz + 2, bx, L + 9, cz + 2, B.fireY); lights.push({ name: 'mine', p: [bx + 0.5, L + 9, cz + 2.5], c: '#ffb050', i: 1.2, d: 16, flicker: 0.25 }); }
      // 갱도 앞 광석 더미와 빈 광차
      w.ellipsoid(MX - 15, L + 1, cz + 6, 3, 2, 3, B.gravel, (dx, dy) => dy >= 0); for (const [dx, dz] of [[0, 0], [1, 1], [-1, 1]]) w.set(MX - 15 + dx, L + 3, cz + 6 + dz, B.ore);
      w.ellipsoid(MX + 15, L + 1, cz + 6, 3, 2, 2.5, B.coal, (dx, dy) => dy >= 0);
      // 선로(갱도 안에서 협곡 철교 너머 남쪽 제련소를 지나 지도 밖까지)
      for (let z = 140; z < D; z++) for (let x = MX - 4; x <= MX + 4; x++) MH.setH(w, x, z, L, B.gravel, B.rock);
      for (let z = T0 + 1; z < D; z++) {
        if (z % 2 === 0) w.box(MX - 3, L, z, MX + 3, L, z, B.sleeper);
        w.set(MX - 2, L, z, B.rail); w.set(MX + 2, L, z, B.rail);
      }
      // 협곡 철교(트러스)
      for (let z = 106; z <= 142; z++) {
        w.box(MX - 4, L - 1, z, MX + 4, L - 1, z, B.plank);
        for (const x of [MX - 4, MX + 4]) { w.set(x, L, z, B.timber); if (z % 3 === 0) { w.set(x, L + 1, z, B.timber); w.set(x, L + 2, z, B.timber); } else w.set(x, L + 2, z, B.timber); }
        if (z % 6 === 0) for (const x of [MX - 4, MX + 4]) {
          const bottom = Math.max(MH.g(w, x, z), LAVA - 3);
          for (let y = bottom; y < L - 1; y++) w.set(x, y, z, B.timber);
          if (z + 6 <= 142) { w.line(x, L - 2, z, x, bottom + 3, z + 6, B.timber); w.line(x, L - 2, z + 6, x, bottom + 3, z, B.timber); }
          w.box(MX - 4, L - 2, z, MX + 4, L - 2, z, B.timber);
        }
        if (z % 12 === 0) { w.set(MX - 4, L + 3, z, B.iron); w.set(MX - 4, L + 4, z, B.fireY); }
      }
      // 광차(부품): 선로 위에 얹힌다
      const CZ0 = 74;
      const cart = w.prop({ name: 'cart', pivot: [MX + 0.5, L + 1, CZ0 + 0.5] });
      cart.box(MX - 2, L + 2, CZ0 - 3, MX + 2, L + 2, CZ0 + 3, B.iron); cart.walls(MX - 2, L + 3, CZ0 - 3, MX + 2, L + 4, CZ0 + 3, B.iron);
      for (let z = CZ0 - 3; z <= CZ0 + 3; z += 3) for (const x of [MX - 2, MX + 2]) cart.set(x, L + 4, z, B.bronze);
      cart.box(MX - 1, L + 4, CZ0 - 2, MX + 1, L + 5, CZ0 + 2, B.ore); cart.set(MX, L + 6, CZ0, B.oreB); cart.set(MX - 1, L + 6, CZ0 + 1, B.ore);
      for (const [x, z] of [[MX - 2, CZ0 - 2], [MX + 2, CZ0 - 2], [MX - 2, CZ0 + 2], [MX + 2, CZ0 + 2]]) cart.set(x, L + 1, z, B.coal);
      cart.set(MX, L + 3, CZ0 + 4, B.iron); cart.set(MX, L + 3, CZ0 - 4, B.iron);
      const cartRoute = [10, 20, 30, 40, 50, 60, 70, 80, 90, D + 12 - CZ0].map(dz => [0, 0, dz]);
      acts.push({
        name: '광차', hint: '광석을 가득 실은 광차가 철교를 건너 제련소 너머로 달려가요', hit: [MX - 2, L + 1, CZ0 - 3, MX + 2, L + 6, CZ0 + 3],
        run: async a => {
          a.flash('mine', 2, 3);
          a.burst([MX + 0.5, L + 6, CZ0 + 0.5], { n: 28, colors: ['#e8c040', '#ffe090'], speed: 4, up: 4, life: 1.2, gravity: 8, spread: 2 });
          await a.drive('cart', cartRoute, 9, { fwd: '+z', back: 1.0 });
        },
      });
      landmarks.push({ name: '광산 입구', note: '산속 깊이 이어진 갱도', p: [MX + 0.5, L + 24, cz + 0.5], tag: 'MINE' });
      landmarks.push({ name: '협곡 철교', note: '용암 위를 건너는 선로', p: [MX + 0.5, L + 9, 124.5] });

      // ── 절벽 주거지 ──
      const dwell = (dx, dy) => {
        let z = 79; while (z > 4 && MH.g(w, dx, z) < dy + 8) z--;
        const fz = z + 1;
        w.box(dx - 4, dy + 1, fz - 5, dx + 4, dy + 7, fz, 0);
        w.box(dx - 4, dy + 1, fz - 5, dx + 4, dy + 7, fz - 5, B.graniteDk);
        for (let x = dx - 5; x <= dx + 5; x++) for (let y = dy; y <= dy + 9; y++) if (Math.abs(x - dx) === 5 || y >= dy + 8 || y === dy) w.set(x, y, fz, (y === dy + 8 && x % 2) ? B.graniteDk : B.granite);
        w.box(dx - 1, dy + 1, fz - 4, dx + 1, dy + 5, fz - 4, B.bronze); w.set(dx, dy + 6, fz - 4, B.bronze); w.set(dx, dy + 3, fz - 4, B.gold);
        w.box(dx - 3, dy + 4, fz - 4, dx - 3, dy + 5, fz - 4, B.win); w.box(dx + 3, dy + 4, fz - 4, dx + 3, dy + 5, fz - 4, B.win);
        w.box(dx - 4, dy, fz + 1, dx + 4, dy, fz + 4, B.plank);
        for (let x = dx - 4; x <= dx + 4; x += 2) { w.set(x, dy + 1, fz + 4, B.timber); w.set(x, dy + 2, fz + 4, B.timber); }
        w.box(dx - 4, dy + 2, fz + 4, dx + 4, dy + 2, fz + 4, B.timber);
        for (const x of [dx - 4, dx + 4]) w.line(x, dy - 1, fz + 4, x, dy - 5, fz, B.timber);
        // 처마 등과 굴뚝 관, 술통
        w.set(dx + 4, dy + 7, fz + 1, B.iron); w.set(dx + 4, dy + 6, fz + 1, B.fireY);
        w.box(dx - 3, dy + 10, fz - 1, dx - 3, dy + 13, fz - 1, B.iron);
        w.set(dx + 3, dy + 1, fz + 2, B.barrel);
        return [dx, dy, fz];
      };
      const homes = [dwell(26, L + 12), dwell(45, L + 24), dwell(97, L + 14), dwell(123, L + 26), dwell(142, L + 12), dwell(110, L + 36)];
      homes.forEach(([x, y, z], k) => { if (k % 2 === 0) lights.push({ p: [x - 2.5, y + 5, z - 3], c: '#ffb050', i: 0.9, d: 10, flicker: 0.2, night: true }); });
      // 절벽 계단 두 줄
      const flight = (x0, y0, nSteps) => { for (let i = 0; i < nSteps; i++) { const x = x0 + i, y = y0 + i; let z = 79; while (z > 4 && MH.g(w, x, z) < y + 3) z--; w.box(x, y, z + 1, x, y, z + 3, B.granite); w.box(x, y + 1, z + 1, x, y + 4, z + 3, 0); if (i % 3 === 0) w.set(x, y + 1, z + 4, B.iron); } };
      flight(31, L + 1, 12); flight(37, L + 13, 12);
      // ── 절벽 승강기 ──
      const EX = 152, top = L + 26;
      let sz = 79; while (sz > 4 && MH.g(w, EX, sz) < top) sz--;
      w.box(EX - 5, top, sz - 6, EX + 5, top, sz, B.plank); w.box(EX - 5, top + 1, sz - 6, EX + 5, top + 6, sz, 0);
      w.box(EX - 5, top + 1, sz - 6, EX + 5, top + 6, sz - 6, B.graniteDk); w.box(EX - 1, top + 1, sz - 5, EX + 1, top + 4, sz - 5, B.bronze);
      for (const [x, z] of [[EX - 4, sz - 5], [EX - 3, sz - 5], [EX - 4, sz - 4], [EX + 4, sz - 5]]) w.set(x, top + 1, z, B.barrel);
      const Z0 = sz + 1, Z1 = sz + 6, TOPB = top + 10;
      for (let z = Z0; z <= 60; z++) for (let x = EX - 4; x <= EX + 4; x++) { MH.setH(w, x, z, L, B.gravel, B.rock); for (let y = L + 1; y <= TOPB + 8; y++) w.set(x, y, z, 0); }
      for (const [x, z] of [[EX - 3, Z0], [EX + 3, Z0], [EX - 3, Z1], [EX + 3, Z1]]) w.box(x, L + 1, z, x, TOPB, z, B.timber);
      for (let y = L + 8; y <= TOPB; y += 8) { w.box(EX - 3, y, Z0, EX + 3, y, Z0, B.timber); w.box(EX - 3, y, Z1, EX + 3, y, Z1, B.timber); w.box(EX - 3, y, Z0, EX - 3, y, Z1, B.timber); w.box(EX + 3, y, Z0, EX + 3, y, Z1, B.timber); }
      for (let y = L + 8; y <= TOPB; y++) if ((y - L) % 8 === 0) { for (let x = EX - 2; x <= EX + 2; x++) for (let z = Z0 + 1; z <= Z1 - 1; z++) w.set(x, y, z, 0); }
      w.box(EX - 4, TOPB + 1, Z0 + 2, EX + 4, TOPB + 1, Z0 + 3, B.timber);
      const pul = w.prop({ name: 'pulley', pivot: [EX + 0.5, TOPB + 4.5, Z0 + 3], axis: 'z' });
      MH.ringProp(pul, EX, TOPB + 4, Z0 + 2, 2, 'xy', B.bronze, B.iron, 4); pul.set(EX, TOPB + 4, Z0 + 2, B.iron);
      const cy0 = L + 1, cageTop = cy0 + 6, ropeLen = TOPB + 1 - cageTop - 1;
      MH.rope(w, 'lrope', EX, TOPB, Z0 + 3, ropeLen, B.rope);
      const cage = w.prop({ name: 'lift', pivot: [EX + 0.5, cy0, Z0 + 3] });
      cage.box(EX - 2, cy0, Z0 + 1, EX + 2, cy0, Z1 - 1, B.plank);
      for (const [x, z] of [[EX - 2, Z0 + 1], [EX + 2, Z0 + 1], [EX - 2, Z1 - 1], [EX + 2, Z1 - 1]]) cage.box(x, cy0 + 1, z, x, cy0 + 5, z, B.iron);
      cage.box(EX - 2, cageTop, Z0 + 1, EX + 2, cageTop, Z1 - 1, B.iron); cage.set(EX - 1, cy0 + 1, Z0 + 2, B.barrel); cage.set(EX + 1, cy0 + 1, Z0 + 3, B.barrel); cage.set(EX - 1, cy0 + 2, Z0 + 2, B.barrel);
      acts.push({
        name: '절벽 승강기', hint: '쇠우리가 윗선반까지 올라갔다 내려와요', hit: [EX - 3, L + 1, Z0, EX + 3, L + 8, Z1],
        run: async a => {
          const up = top + 1 - cy0;
          await Promise.all([a.move('lift', [0, up, 0], 4.5, t => t), a.rope('lrope', ropeLen, ropeLen - up, 4.5, t => t), a.turn('pulley', [0, 0, 9], 4.5, t => t)]);
          await a.wait(1.2);
          await Promise.all([a.move('lift', [0, 0, 0], 4, t => t), a.rope('lrope', ropeLen, ropeLen, 4, t => t), a.turn('pulley', [0, 0, 0], 4, t => t)]);
        },
      });
      landmarks.push({ name: '절벽 승강기', note: '윗선반의 창고로 가는 길', p: [EX + 0.5, TOPB + 10, Z0 + 3] });

      // ── 대장간, 풀무, 굴뚝 ──
      const FX = 102, FZ = 68;
      const forge = MH.house(w, { x: FX, z: FZ, sx: 19, sz: 15, fh: 9, face: 'w', roof: 'hip', pitch: 1, y: L,
        m: { found: B.graniteDk, wall: B.granite, frame: B.graniteDk, win: B.win, door: B.bronze, roof: B.slate, eave: B.iron } });
      w.box(FX + 14, L + 1, FZ + 1, FX + 17, forge.peak + 12, FZ + 4, B.graniteDk); w.box(FX + 15, forge.peak + 10, FZ + 2, FX + 16, forge.peak + 12, FZ + 3, 0);
      w.walls(FX + 13, forge.peak + 13, FZ, FX + 18, forge.peak + 13, FZ + 5, B.granite);
      for (let y = L + 4; y <= forge.peak + 10; y += 5) w.walls(FX + 13, y, FZ, FX + 18, y, FZ + 5, B.bronze);
      // 화덕(집 앞 서쪽): 돌 아궁이 속 불, 지붕 차양
      w.box(FX - 6, L + 1, FZ + 2, FX - 3, L + 5, FZ + 7, B.graniteDk); w.box(FX - 6, L + 2, FZ + 3, FX - 5, L + 4, FZ + 6, 0);
      w.box(FX - 4, L + 2, FZ + 3, FX - 4, L + 3, FZ + 6, B.ember); w.box(FX - 5, L + 2, FZ + 4, FX - 5, L + 2, FZ + 5, B.ember);
      w.box(FX - 5, L + 6, FZ + 4, FX - 4, L + 12, FZ + 5, B.graniteDk);
      w.box(FX - 11, L + 1, FZ + 4, FX - 10, L + 2, FZ + 5, B.iron); w.box(FX - 12, L + 3, FZ + 4, FX - 9, L + 3, FZ + 5, B.iron);
      // 담금질 물통과 무기 걸이
      w.box(FX - 12, L + 1, FZ, FX - 9, L + 2, FZ + 1, B.timber); w.box(FX - 11, L + 2, FZ, FX - 10, L + 2, FZ + 1, B.basalt);
      for (let x = FX - 3; x <= FX - 1; x++) { w.set(x, L + 1, FZ - 2, B.timber); w.set(x, L + 4, FZ - 2, B.timber); w.box(x, L + 2, FZ - 2, x, L + 3, FZ - 2, x % 2 ? B.iron : B.bronze); }
      const bz = FZ + 10;
      w.box(FX - 8, L + 1, bz, FX - 8, L + 2, bz + 2, B.timber); w.box(FX - 14, L + 1, bz, FX - 14, L + 2, bz + 2, B.timber);
      const bel = w.prop({ name: 'bellows', pivot: [FX - 8, L + 4, bz + 1.5], axis: 'z' });
      bel.box(FX - 14, L + 3, bz, FX - 8, L + 3, bz + 2, B.plank); bel.box(FX - 14, L + 6, bz, FX - 8, L + 6, bz + 2, B.plank);
      bel.box(FX - 13, L + 4, bz, FX - 9, L + 5, bz + 2, B.leather); bel.box(FX - 7, L + 4, bz + 1, FX - 6, L + 4, bz + 1, B.iron);
      lights.push({ name: 'forge', p: [FX - 5, L + 3, FZ + 5], c: '#ff7a2a', i: 1.7, d: 20, flicker: 0.35 });
      acts.push({
        name: '대장간 풀무', hint: '풀무질에 화덕이 불꽃을 뿜어요', hit: [FX - 14, L + 1, bz, FX - 6, L + 7, bz + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.tween('bellows', { rot: [0, 0, 0.2], scl: [1, 0.6, 1] }, 0.38);
            a.flash('forge', 3, 0.5);
            a.burst([FX - 5, L + 4, FZ + 5], { n: 44, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], speed: 5, up: 7, life: 1.3, gravity: 2, spread: 1.5 });
            await a.tween('bellows', { rot: [0, 0, 0], scl: [1, 1, 1] }, 0.38);
          }
        },
      });
      landmarks.push({ name: '대장간', note: '밤낮으로 달아오른 화덕', p: [FX + 9.5, forge.peak + 20, FZ + 7], tag: 'FORGE' });
      // 대장간 안으로: 서쪽 청동 문(x102, z75..76). 문 바로 안쪽 한 줄은 막아 돌아올 때 문 밖에 선다
      w.box(FX + 1, L + 1, forge.door[2] - 1, FX + 1, L + 8, forge.door[2] + 2, B.granite);
      acts.push(OR.goAct({ at: [FX - 1, L + 1, forge.door[2]], h: 5, name: '대장간 안으로', goto: 'ironhollow-forge', hint: '청동 문을 밀고 들어가 큰 화덕과 모루, 무기 진열실을 구경해요', hit: [FX, L + 1, forge.door[2], FX, L + 4, forge.door[2] + 1] }));
      // 절벽에서 흘러 협곡으로 떨어지는 용암 수로
      const lavaPath = [[134, 39], [136, 60], [135, 87], [136, 110]];
      for (let z = 0; z < D; z++) for (let x = 118; x < 152; x++) {
        if (MH.polyDist(x, z, lavaPath) > 2) continue;
        const g = MH.g(w, x, z);
        if (g < base - 10) continue;
        MH.setH(w, x, z, g - 1, B.basalt, B.basalt); w.liquid(x, z, g);
      }
      lights.push({ name: 'chan', p: [135.5, L + 1, 79], c: '#ff5a1a', i: 1.2, d: 16, flicker: 0.2, liquid: true });
      for (const zb of [74, 97]) {
        w.box(129, L + 1, zb - 1, 142, L + 1, zb + 1, B.graniteDk);
        for (let x = 130; x <= 141; x++) for (const zz of [zb - 2, zb + 2]) { w.set(x, L + 1, zz, B.graniteDk); w.set(x, L + 2, zz, x % 2 ? B.iron : B.graniteDk); }
      }
      // ── 드워프 돌집과 주점 ──
      const hm = { found: B.graniteDk, wall: B.granite, frame: B.graniteDk, quoin: B.graniteDk, win: B.win, door: B.bronze, roof: B.slate, eave: B.iron, ridge: B.bronze, chimney: B.graniteDk };
      const hs = [[13, 66, 12, 10, 'e'], [16, 87, 11, 10, 'e'], [39, 89, 12, 9, 'n'], [87, 92, 11, 9, 'n']].map(([x, z, sx, sz2, face]) => MH.houseX(w, { x, z, sx, sz: sz2, fh: 6, face, roof: 'hip', pitch: 1, y: L, m: hm }));
      const tav = MH.houseX(w, { x: 37, z: 60, sx: 16, sz: 11, floors: 2, fh: 6, face: 's', pitch: 1, dormers: 2, y: L, m: Object.assign({}, hm, { frame: B.timber, lamp: B.win }) });
      // 주점 간판: 쇠 팔에 매단 널빤지(술잔 무늬)
      const sgx = tav.x0 + 3, sgz = tav.z1 + 1;
      w.box(sgx, tav.y + 9, sgz, sgx + 3, tav.y + 9, sgz, B.iron); w.box(sgx + 3, tav.y + 9, sgz + 1, sgx + 3, tav.y + 9, sgz + 2, B.iron);
      w.box(sgx + 2, tav.y + 6, sgz + 2, sgx + 4, tav.y + 8, sgz + 2, B.plank); w.set(sgx + 3, tav.y + 7, sgz + 2, B.gold);
      for (const [bx, bz2] of [[34, 76], [35, 76], [34, 77], [59, 76], [55, 74], [56, 74]]) { w.set(bx, L + 1, bz2, B.barrel); if (bx === 34) w.set(bx, L + 2, bz2, B.barrel); }
      // 주점 앞 긴 탁자와 의자
      for (const z of [76, 79]) { w.box(42, L + 2, z, 48, L + 2, z, B.plank); w.set(42, L + 1, z, B.timber); w.set(48, L + 1, z, B.timber); w.box(42, L + 1, z - 1, 48, L + 1, z - 1, B.timber); }
      lights.push({ p: [tav.door[0] + 0.5, tav.door[1] + 3, tav.door[2] + 1.5], c: '#ffb050', i: 1, d: 12, flicker: 0.15, night: true });
      landmarks.push({ name: '돌망치 주점', note: '흑맥주가 끊이지 않는 곳', p: [45.5, tav.peak + 6, 66] });
      // 주점 안으로: 남쪽 청동 문(x44..45, z70). 문 바로 안쪽 한 줄은 막아 돌아올 때 문 밖에 선다
      w.box(tav.door[0] - 1, tav.y + 1, tav.door[2] - 1, tav.door[0] + 2, tav.y + 8, tav.door[2] - 1, B.granite);
      acts.push(OR.goAct({ at: [tav.door[0], tav.y + 1, tav.door[2] + 1], h: 5, name: '돌망치 주점 안으로', goto: 'ironhollow-tavern', hint: '청동 문을 열고 들어가 긴 돌탁자와 흑맥주 바, 벽난로 곁에 앉아 봐요', hit: [tav.door[0], tav.y + 1, tav.door[2], tav.door[0] + 1, tav.y + 4, tav.door[2]] }));
      for (const [bx, bz2] of [[58, 100], [89, 103], [24, 102], [123, 100], [62, 150], [80, 150]]) { w.box(bx, L + 1, bz2, bx, L + 4, bz2, B.iron); w.box(bx - 1, L + 5, bz2, bx + 1, L + 5, bz2, B.iron); w.set(bx, L + 6, bz2, B.fireY); lights.push({ p: [bx + 0.5, L + 7, bz2 + 0.5], c: '#ffb050', i: 0.8, d: 11, flicker: 0.3 }); }
      // 고원 가장자리 쇠 난간(협곡 쪽)
      for (let x = 6; x < 162; x++) { if (Math.abs(x - MX) <= 5) continue; const z = 106; if (MH.g(w, x, z) !== L) continue; w.set(x, L + 1, z, x % 4 === 0 ? B.graniteDk : B.iron); if (x % 4 === 0) w.set(x, L + 2, z, B.graniteDk); }
      // ── 광산 문의 룬 ──
      acts.push({
        name: '룬 각인', hint: '광산 입구의 룬이 차례로 타오르며 금빛 불티를 뿌려요', hit: [MX - 7, L + 11, cz, MX + 7, L + 16, cz + 1],
        run: async a => {
          a.flash('mine', 3, 4.5); a.glow(1.8, 4.5);
          for (let x = MX - 6; x <= MX + 6; x += 2) { a.burst([x + 0.5, L + 12.5, cz + 1.8], { n: 16, colors: ['#ffd070', '#ffe8a0', '#ff9a3a'], speed: 1.5, up: 1.5, life: 1.2, gravity: -0.5, spread: 0.4 }); await a.wait(0.3); }
          for (let k = 0; k < 3; k++) { a.burst([MX + 0.5, L + 15.5, cz + 2], { n: 40, colors: ['#e8c040', '#ffd070', '#ffffff'], speed: 6, up: 2, life: 1.4, gravity: 4, spread: 1 }); await a.wait(0.5); }
        },
      });
      // ── 물레망치 ──
      const TX = 110, TZ = 93, TY = L + 6;
      for (const z of [TZ - 2, TZ + 2]) { w.box(TX, L + 1, z, TX, TY + 2, z, B.timber); w.box(TX - 1, L + 1, z, TX + 1, L + 1, z, B.graniteDk); }
      w.box(TX, TY + 3, TZ - 2, TX, TY + 3, TZ + 2, B.timber); for (const z of [TZ - 1, TZ + 1]) w.set(TX, TY, z, B.iron);
      w.box(TX - 5, L + 1, TZ - 1, TX - 3, L + 1, TZ + 1, B.graniteDk); w.box(TX - 5, L + 2, TZ - 1, TX - 4, L + 2, TZ + 1, B.iron);
      const th = w.prop({ name: 'thammer', pivot: [TX + 0.5, TY + 0.5, TZ + 0.5], axis: 'z' });
      th.box(TX - 6, TY, TZ, TX + 6, TY, TZ, B.timber); th.box(TX - 5, TY - 2, TZ - 1, TX - 4, TY - 1, TZ + 1, B.iron); th.box(TX + 5, TY - 1, TZ, TX + 6, TY + 1, TZ, B.bronze);
      lights.push({ name: 'anvil', p: [TX - 4, L + 3, TZ + 2], c: '#ffb050', i: 0.4, d: 12, flicker: 0.3, srcR: 9 });
      acts.push({
        name: '물레망치', hint: '커다란 망치가 들렸다가 모루를 쾅쾅 내리쳐요', hit: [TX - 6, L + 1, TZ - 2, TX + 6, TY + 3, TZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('thammer', [0, 0, -0.5], 0.55);
            await a.turn('thammer', [0, 0, 0.2], 0.16, t => t * t);
            a.flash('anvil', 6, 0.3);
            a.burst([TX - 4, L + 3, TZ + 1.5], { n: 40, colors: ['#ffe08a', '#ffb04a', '#ff6a2a', '#ffffff'], speed: 7, up: 4, life: 0.8, gravity: 9, spread: 0.6, flat: true });
            await a.wait(0.25);
          }
          await a.turn('thammer', [0, 0, 0], 0.5);
        },
      });
      // ── 용암 분출 ──
      const GX = 96, GZ2 = 118;
      lights.push({ name: 'geyser', p: [GX, LAVA + 2, GZ2], c: '#ff6a2a', i: 0.8, d: 34, flicker: 0.3, liquid: true });
      acts.push({
        name: '용암 분출', hint: '협곡 바닥 용암이 끓어올라 불기둥이 치솟아요', hit: [GX - 7, LAVA, GZ2 - 4, GX + 7, LAVA + 10, GZ2 + 4],
        run: async a => {
          a.flash('geyser', 5, 4); a.lightning(0.4);
          for (let k = 0; k < 8; k++) {
            a.burst([GX + (k % 3 - 1) * 2, LAVA + 1, GZ2 - 1 + (k % 2) * 2], { n: 50, colors: ['#ff5a1a', '#ffb04a', '#ffe08a', '#8a1a0a'], speed: 3, up: 24, life: 2, gravity: 14, spread: 1.4 });
            if (k % 2) a.burst([GX, L + 1, GZ2], { n: 24, colors: ['#ff5a1a', '#ffb04a', '#ffe08a'], speed: 4, up: 6, life: 1.4, gravity: 10, spread: 2 });
            await a.wait(0.4);
          }
          a.burst([GX, LAVA + 8, GZ2], { n: 60, colors: ['#5a504a', '#8a7a70'], speed: 2, up: 6, life: 2.6, gravity: -0.6, spread: 3 });
        },
      });
      // ── 용암 수로 수문 ──
      const GZ = 87;
      for (const x of [132, 139]) w.box(x, L + 1, GZ, x, L + 9, GZ, B.graniteDk);
      w.box(132, L + 10, GZ, 139, L + 10, GZ, B.iron); w.set(135, L + 9, GZ, B.bronze); w.set(136, L + 9, GZ, B.bronze);
      const gate = w.prop({ name: 'lgate', pivot: [136, L + 1, GZ + 0.5] });
      for (let x = 133; x <= 138; x++) for (let y = L; y <= L + 4; y++) if (!w.get(x, y, GZ)) gate.set(x, y, GZ, y === L + 4 || x === 133 || x === 138 ? B.bronze : B.iron);
      acts.push({
        name: '용암 수문', hint: '쇠 수문이 올라가면 막혔던 용암이 불꽃을 튀기며 쏟아져요', hit: [132, L, GZ - 1, 139, L + 10, GZ + 1],
        run: async a => {
          await a.move('lgate', [0, 4, 0], 1.6);
          a.flash('chan', 3, 3.2);
          for (let k = 0; k < 7; k++) { a.burst([135.5, L + 1, GZ + 1.5 + k % 3], { n: 30, colors: ['#ff5a1a', '#ffb04a', '#ffe08a'], speed: 3, up: 4, life: 1, gravity: 9, spread: 1.4 }); await a.wait(0.4); }
          await a.move('lgate', [0, 0, 0], 1.4);
          a.burst([135.5, L + 1, GZ + 1], { n: 30, colors: ['#8a7a70', '#ff9a3a'], speed: 2, up: 3, life: 1.4, gravity: 1, spread: 1.5 });
        },
      });
      // ── 교대 종 ──
      const KX = 116, KZ = 102, ky = L + 11;
      for (const x of [KX - 3, KX + 3]) { w.box(x, L + 1, KZ, x, ky, KZ, B.timber); w.box(x - 1, L + 1, KZ - 1, x + 1, L + 1, KZ + 1, B.graniteDk); }
      w.box(KX - 4, ky + 1, KZ, KX + 4, ky + 1, KZ, B.timber); w.box(KX - 3, ky + 2, KZ, KX + 3, ky + 2, KZ, B.slate);
      const bell = w.prop({ name: 'kbell', pivot: [KX + 0.5, ky + 0.5, KZ + 0.5], axis: 'z' });
      bell.box(KX, ky - 1, KZ, KX, ky, KZ, B.iron); bell.cyl(KX, KZ, ky - 4, ky - 2, 1.2, B.bronze); bell.cyl(KX, KZ, ky - 6, ky - 5, 1.9, B.bronze); bell.set(KX, ky - 7, KZ, B.gold);
      acts.push({
        name: '교대 종', hint: '청동 종이 크게 흔들리며 교대 시간을 알려요', hit: [KX - 3, L + 1, KZ - 2, KX + 3, ky + 2, KZ + 2],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.turn('kbell', [0, 0, k % 2 ? -0.7 : 0.7], 0.45);
            a.burst([KX + 0.5, ky - 5, KZ + 0.5], { n: 26, colors: ['#ffd070', '#e8c040', '#fff0c0'], speed: 7, up: 0.3, life: 0.7, gravity: 0, spread: 0.6, flat: true });
          }
          await a.turn('kbell', [0, 0, 0], 0.6);
        },
      });

      // ══ 새 구역: 협곡 남쪽 제련소와 보석 세공소 ══
      MH.path(w, [[MX + 5, 150], [96, 150], [118, 156]], 2, B.pave);
      MH.path(w, [[MX - 5, 152], [52, 156]], 1.6, B.pave);
      // 용광로: 벽돌 띠를 두른 둥근 돌 탑, 꼭대기에서 불이 넘실댄다
      const FCX = 106, FCZ = 156, FH = 22;
      MH.flatten(w, FCX - 24, FCZ - 9, FCX + 22, D - 1, L, B.gravel, B.rock);
      for (let y = L + 1; y <= L + FH; y++) { const r = y < L + 6 ? 6.2 : 6.2 - (y - L - 6) * 0.12; w.cyl(FCX, FCZ, y, y, r, (y - L) % 5 === 0 ? B.bronze : ((y - L) % 5 === 1 ? B.graniteDk : B.brick)); }
      w.cyl(FCX, FCZ, L + 1, L + 2, 7.2, B.graniteDk);
      w.ring(FCX, FCZ, L + FH + 1, 2.6, 4.6, B.graniteDk); w.cyl(FCX, FCZ, L + FH, L + FH + 1, 2.6, B.molten); w.cyl(FCX, FCZ, L + FH + 2, L + FH + 2, 1.4, B.ember);
      for (const [dx, dz] of [[4, 4], [-4, 4], [4, -4], [-4, -4]]) w.box(FCX + dx, L + FH + 2, FCZ + dz, FCX + dx, L + FH + 4, FCZ + dz, B.iron);
      // 출탕구: 남서쪽으로 열린 아궁이와 쇳물 홈
      w.box(FCX - 6, L + 1, FCZ + 1, FCX - 4, L + 4, FCZ + 3, 0); w.box(FCX - 5, L + 1, FCZ + 2, FCX - 4, L + 2, FCZ + 2, B.molten);
      w.box(FCX - 7, L + 5, FCZ, FCX - 5, L + 5, FCZ + 4, B.bronze);
      // 원료 투입 경사로(동쪽, 목조)
      for (let i = 0; i <= 16; i++) { const x = FCX + 21 - i, y = L + 2 + Math.round(i * (FH - 2) / 16); w.box(x, y, FCZ - 1, x, y, FCZ + 1, B.plank); if (i % 4 === 0) w.box(x, L + 1, FCZ - 1, x, y - 1, FCZ - 1, B.timber); if (i % 4 === 0) w.box(x, L + 1, FCZ + 1, x, y - 1, FCZ + 1, B.timber); w.set(x, y + 1, FCZ + 1, i % 2 ? B.iron : B.timber); }
      lights.push({ name: 'smelt', p: [FCX + 0.5, L + FH + 3, FCZ + 0.5], c: '#ff8a3a', i: 1.4, d: 26, flicker: 0.3 });
      landmarks.push({ name: '남쪽 제련소', note: '광석을 녹이는 큰 용광로', p: [FCX + 0.5, L + FH + 10, FCZ + 0.5], tag: 'SMELT' });
      // 도가니 받침대와 거푸집 줄(용광로 앞 남쪽)
      const GX0 = FCX - 15, GZc = FCZ + 2, gy = L + 9;
      for (const x of [GX0 - 3, GX0 + 3]) { w.box(x, L + 1, GZc, x, gy + 2, GZc, B.timber); w.box(x - 1, L + 1, GZc - 1, x + 1, L + 1, GZc + 1, B.graniteDk); }
      w.box(GX0 - 4, gy + 3, GZc, GX0 + 4, gy + 3, GZc, B.timber);
      const cru = w.prop({ name: 'crucible', pivot: [GX0 + 0.5, gy + 0.5, GZc + 0.5], axis: 'x' });
      cru.box(GX0 - 2, gy, GZc, GX0 + 2, gy, GZc, B.iron);
      cru.cyl(GX0, GZc, gy - 4, gy - 4, 1.4, B.iron); cru.cyl(GX0, GZc, gy - 3, gy - 1, 2.2, B.iron); cru.cyl(GX0, GZc, gy - 1, gy - 1, 1.3, B.molten); cru.set(GX0, gy - 1, GZc + 3, B.iron);
      const moldZ = GZc + 5;
      for (let x = GX0 - 6; x <= GX0 + 6; x += 3) { w.walls(x, L + 1, moldZ, x + 1, L + 1, moldZ + 2, B.iron); w.set(x, L + 1, moldZ + 1, B.molten); }
      lights.push({ name: 'pour', p: [GX0 + 0.5, L + 2, moldZ + 1], c: '#ffb04a', i: 0.5, d: 12, flicker: 0.3 });
      acts.push({
        name: '용광로 쇳물', hint: '도가니가 기울어 시뻘건 쇳물을 거푸집에 부어요', hit: [GX0 - 3, gy - 5, GZc - 3, GX0 + 3, gy + 3, GZc + 3],
        run: async a => {
          a.flash('smelt', 3, 5); a.glow(1.4, 5);
          await a.turn('crucible', [1.1, 0, 0], 1.2);
          a.flash('pour', 6, 3);
          for (let k = 0; k < 8; k++) {
            a.burst([GX0 + 0.5, gy - 1, GZc + 3.5], { n: 26, colors: ['#ffe08a', '#ffb04a', '#ff6a2a'], speed: 0.8, up: 0.5, life: 0.8, gravity: 12, spread: 0.6 });
            a.burst([GX0 + 0.5 + (k % 5 - 2) * 3, L + 2, moldZ + 1], { n: 18, colors: ['#ffe08a', '#ffb04a', '#ffffff'], speed: 4, up: 3, life: 0.7, gravity: 9, spread: 0.6 });
            await a.wait(0.35);
          }
          a.burst([GX0 + 0.5, L + 3, moldZ + 1], { n: 40, colors: ['#8a7a70', '#6a5c54'], speed: 1.5, up: 4, life: 2.4, gravity: -0.5, spread: 3 });
          await a.turn('crucible', [0, 0, 0], 1.2);
        },
      });
      // 광석·석탄 더미와 쇠똥(슬래그) 언덕
      w.ellipsoid(FCX + 14, L + 1, FCZ - 6, 4, 3, 3, B.coal, (dx, dy) => dy >= 0);
      w.ellipsoid(FCX + 14, L + 1, FCZ + 6, 3.5, 2.6, 3, B.gravel, (dx, dy) => dy >= 0); for (let q = 0; q < 8; q++) w.set(FCX + 12 + q % 4, L + 3 + (q > 4 ? 1 : 0), FCZ + 5 + (q >> 2), q % 3 ? B.ore : B.oreB);
      w.ellipsoid(FCX - 2, L + 1, D - 4, 5, 3, 3, B.slag, (dx, dy) => dy >= 0);
      for (let x = FCX + 3; x <= FCX + 8; x++) for (let z = FCZ + 8; z <= FCZ + 9; z++) w.box(x, L + 1, z, x, L + 1 + ((x + z) % 2), z, B.iron);
      // 보석 세공소: 돌집, 앞에 진열대와 숫돌
      const gem = MH.houseX(w, { x: 32, z: 145, sx: 14, sz: 9, fh: 6, face: 's', roof: 'hip', pitch: 1, y: L, m: Object.assign({}, hm, { frame: B.bronze, chimney: B.graniteDk }) });
      for (let x = gem.x0 + 1; x <= gem.x1 - 1; x += 3) { w.set(x, L + 1, gem.z1 + 2, B.timber); w.set(x, L + 2, gem.z1 + 2, B.plank); w.set(x, L + 3, gem.z1 + 2, [B.gem, B.gemB, B.ore, B.oreB][x % 4]); }
      lights.push({ p: [gem.door[0] + 0.5, gem.door[1] + 3, gem.door[2] + 1.5], c: '#c890ff', i: 0.8, d: 10, flicker: 0.1 });
      const SGX = 54, SGZ = 160, sgy = L + 5;
      for (const z of [SGZ - 2, SGZ + 2]) { w.box(SGX, L + 1, z, SGX, sgy - 1, z, B.timber); w.box(SGX - 1, L + 1, z, SGX + 1, L + 1, z, B.graniteDk); }
      w.box(SGX - 7, L + 1, SGZ - 1, SGX - 6, L + 2, SGZ + 1, B.timber); w.box(SGX - 7, L + 3, SGZ - 1, SGX - 6, L + 3, SGZ + 1, B.basalt);
      const wheel = w.prop({ name: 'grind', pivot: [SGX + 0.5, sgy + 0.5, SGZ + 0.5], axis: 'z' });
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const r = Math.hypot(dx, dy); if (r > 3.6) continue; for (const z of [SGZ - 1, SGZ, SGZ + 1]) if (z === SGZ || r < 3) wheel.set(SGX + dx, sgy + dy, z, r < 1 ? B.iron : ((Math.atan2(dy, dx) * 2 + 10) | 0) % 2 ? B.granite : B.graniteDk); }
      wheel.box(SGX, sgy, SGZ - 2, SGX, sgy, SGZ + 2, B.iron);
      landmarks.push({ name: '보석 세공소', note: '갓 캐낸 원석을 숫돌로 깎는 곳', p: [gem.x0 + 7, gem.peak + 7, gem.z0 + 4] });
      acts.push({
        name: '숫돌 세공', hint: '커다란 숫돌이 윙윙 돌며 원석 가루와 불티가 반짝여요', hit: [SGX - 4, L + 1, SGZ - 2, SGX + 4, sgy + 4, SGZ + 2],
        run: async a => {
          a.spin('grind', 8, 4.5);
          for (let k = 0; k < 10; k++) {
            a.burst([SGX + 0.5 + 3.6, sgy + 0.5, SGZ + 0.5], { n: 16, colors: ['#ffe08a', '#ffffff', '#c86ae8', '#6ae8d8'], speed: 6, up: 2, life: 0.7, gravity: 6, spread: 0.4, flat: true });
            await a.wait(0.4);
          }
        },
      });

      const smoke = [...hs, tav, gem].filter(h => h.chimney).slice(0, 4).map(h => ({ n: 30, colors: ['#6a605a', '#8a8078'], mode: 'rise', speed: 0.6, area: [h.chimney[0], h.chimney[2], 0.6], y0: h.chimney[1], y1: h.chimney[1] + 22, glow: false }));
      smoke.push({ n: 50, colors: ['#5a504a', '#8a7a70'], mode: 'rise', speed: 0.9, area: [FX + 16, FZ + 3, 1], y0: forge.peak + 13, y1: forge.peak + 40, glow: false });
      smoke.push({ n: 60, colors: ['#4a403a', '#6a5c54', '#ff9a4a'], mode: 'rise', speed: 1, area: [FCX + 0.5, FCZ + 0.5, 1.5], y0: L + FH + 3, y1: L + FH + 34, glow: false });
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
