// 무쇠골 — 거대한 산벽의 광산, 절벽 선반 위 드워프 마을, 용암 협곡과 철교 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'ironhollow', cat: 'village', name: '무쇠골', en: 'Ironhollow', color: '#e08a3a', seed: 127, base: 24, time: 'night',
    desc: '산을 파고 들어간 드워프 광산 마을. 망치 소리가 그치는 날은 일 년에 단 하루뿐이다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '드워프 장인 60여 명'], ['특산물', '미스릴 도끼 · 흑맥주'], ['소문', '가장 깊은 갱도에서 누군가 망치를 두드린다']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.64], sun: ['#ffc890', 0.7, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.6], sun: ['#ffe8d0', 0.78, [0.4, 1, 0.6]], haze: '#c89060' },
    liquid: ['#8a1a0a', '#ff5a1a', '#ffe08a'], liqSpeed: 0.6, liqGlow: true,
    fog: { box: [67, 64, 67, 64], start: 0.76, floor: 8, depth: 10, haze: [18, 0.3, 8], hazeColor: '#7a3a1a' },
    camY: 12,
    particles: [
      { n: 160, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 1, area: [64, 94, 38], y0: 14, y1: 56 },
      { n: 150, colors: ['#8a7a70', '#6a5c54'], mode: 'drift', speed: 0.4, y0: 34, y1: 84, glow: false },
    ],
    blocks: {
      rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' }, gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 },
      cliff: { c: '#6e6660', v: 0.07, pat: 'big' }, cliffDk: { c: '#4a4440', v: 0.07, pat: 'big' }, basalt: { c: '#2e2826', v: 0.06, pat: 'stone' },
      granite: { c: '#8a8078', v: 0.05, pat: 'big' }, graniteDk: { c: '#5e564e', v: 0.05, pat: 'brick' }, slate: { c: '#3a3a44', v: 0.04, pat: 'tile' },
      bronze: { c: '#c08a3a', v: 0.06 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, timber: { c: '#6a4428', v: 0.06, pat: 'log' },
      plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, coal: { c: '#141010', v: 0 }, ore: { c: '#e8c040', v: 0.1 }, oreB: { c: '#5ab0e0', v: 0.1 },
      rail: { c: '#7a7a82', v: 0.03 }, sleeper: { c: '#5a3a24', v: 0.05 }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' }, banner: { c: '#a03a2a', v: 0.03 },
      rope: { c: '#b8a080', v: 0.04 }, leather: { c: '#6a3a24', v: 0.05 },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, rune: { c: '#ffd070', glow: true }, fireY: { c: '#ffe090', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, L = base + 8;
      const CL = x => 40 + (n.fbm(x * 0.045, 3, 2) - 0.5) * 10;
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => {
          const cz = CL(x);
          let hh;
          if (z < cz) hh = 8 + Math.min(56, (cz - z) * 2.4) + n.ridge(x * 0.045, z * 0.045, 4) * 9;
          else if (z < 82) hh = 8 + n.fbm(x * 0.06, z * 0.06) * 1.5;
          else if (z < 106) hh = MH.lerp(8, -16, MH.sstep(82, 86, z)) + MH.lerp(0, 22, MH.sstep(102, 106, z));
          else hh = 6 + n.fbm(x * 0.06, z * 0.06) * 3;
          return base + hh;
        },
        surface: (x, z, y, s) => s >= 3 ? (y < base ? B.basalt : B.cliff) : y > L + 4 ? B.rock : B.gravel,
        under: (x, z, y, dep, s) => y < base - 4 ? B.basalt : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 6 === 0 ? B.cliffDk : B.cliff),
      });
      const LAVA = base - 13;
      MH.water(w, LAVA, (x, z) => z > 80 && z < 108);
      MH.flatten(w, 4, 44, 124, 81, L, B.gravel, B.rock);
      for (let i = 0; i < 110; i++) { const x = w.ri(2, 125), z = w.ri(2, 38), g = MH.g(w, x, z); if (g > L + 6 && w.slope[x + W * z] < 7) w.set(x, g, z, w.chance(0.4) ? B.oreB : B.ore); }
      const lights = [], acts = [], landmarks = [];
      lights.push({ p: [40, LAVA + 2, 94], c: '#ff5a1a', i: 1.6, d: 30, flicker: 0.2, liquid: true });
      lights.push({ p: [92, LAVA + 2, 94], c: '#ff5a1a', i: 1.6, d: 30, flicker: 0.2, liquid: true });

      // ── 광산 입구 ──
      const MX = 54;
      let cz = 40; while (cz < 60 && MH.g(w, MX, cz) > L + 2) cz++;
      const T0 = 6;
      w.box(MX - 4, L + 1, T0, MX + 4, L + 9, cz, 0);
      w.box(MX - 4, L + 1, T0, MX + 4, L + 9, T0, B.coal);
      w.box(MX - 4, L, T0, MX + 4, L, cz, B.graniteDk);
      for (let z = T0 + 3; z <= cz; z += 5) { w.box(MX - 4, L + 1, z, MX - 4, L + 8, z, B.timber); w.box(MX + 4, L + 1, z, MX + 4, L + 8, z, B.timber); w.box(MX - 4, L + 9, z, MX + 4, L + 9, z, B.timber); if (z % 10 === 1) w.set(MX - 3, L + 7, z, B.fireY); }
      for (let x = MX - 8; x <= MX + 8; x++) for (let y = L + 1; y <= L + 15; y++) {
        const inside = Math.abs(x - MX) <= 4 && y <= L + 9 - Math.max(0, Math.abs(x - MX) - 2);
        if (!inside) w.set(x, y, cz, (Math.abs(x - MX) >= 7 || y >= L + 13 || (y === L + 11)) ? B.granite : B.graniteDk);
      }
      for (let x = MX - 5; x <= MX + 5; x += 2) w.set(x, L + 12, cz + 1, B.rune);
      w.box(MX - 1, L + 14, cz + 1, MX + 1, L + 16, cz + 1, B.bronze); w.set(MX, L + 15, cz + 1, B.gold);
      for (const bx of [MX - 9, MX + 9]) { w.box(bx - 1, L + 1, cz + 1, bx + 1, L + 1, cz + 3, B.graniteDk); w.box(bx, L + 2, cz + 2, bx, L + 6, cz + 2, B.iron); w.box(bx - 1, L + 7, cz + 1, bx + 1, L + 7, cz + 3, B.iron); w.box(bx, L + 8, cz + 2, bx, L + 9, cz + 2, B.fireY); lights.push({ name: 'mine', p: [bx + 0.5, L + 9, cz + 2.5], c: '#ffb050', i: 1.2, d: 16, flicker: 0.25 }); }
      // 선로(갱도 안에서 협곡 철교 너머까지)
      for (let z = T0 + 1; z <= 110; z++) {
        if (z % 2 === 0) w.box(MX - 3, L, z, MX + 3, L, z, B.sleeper);
        w.set(MX - 2, L, z, B.rail); w.set(MX + 2, L, z, B.rail);
      }
      // 협곡 철교(트러스)
      for (let z = 81; z <= 108; z++) {
        w.box(MX - 4, L - 1, z, MX + 4, L - 1, z, B.plank);
        for (const x of [MX - 4, MX + 4]) { w.set(x, L, z, B.timber); if (z % 3 === 0) { w.set(x, L + 1, z, B.timber); w.set(x, L + 2, z, B.timber); } else w.set(x, L + 2, z, B.timber); }
        if (z % 6 === 0) for (const x of [MX - 4, MX + 4]) {
          const bottom = Math.max(MH.g(w, x, z), LAVA - 3);
          for (let y = bottom; y < L - 1; y++) w.set(x, y, z, B.timber);
          if (z + 6 <= 108) { w.line(x, L - 2, z, x, bottom + 3, z + 6, B.timber); w.line(x, L - 2, z + 6, x, bottom + 3, z, B.timber); }
        }
      }
      // 광차(부품): 선로 위에 얹힌다
      const CZ0 = 56;
      const cart = w.prop({ name: 'cart', pivot: [MX + 0.5, L + 1, CZ0 + 0.5] });
      cart.box(MX - 2, L + 2, CZ0 - 3, MX + 2, L + 2, CZ0 + 3, B.iron); cart.walls(MX - 2, L + 3, CZ0 - 3, MX + 2, L + 4, CZ0 + 3, B.iron);
      cart.box(MX - 1, L + 4, CZ0 - 2, MX + 1, L + 5, CZ0 + 2, B.ore); cart.set(MX, L + 6, CZ0, B.oreB); cart.set(MX - 1, L + 6, CZ0 + 1, B.ore);
      for (const [x, z] of [[MX - 2, CZ0 - 2], [MX + 2, CZ0 - 2], [MX - 2, CZ0 + 2], [MX + 2, CZ0 + 2]]) cart.set(x, L + 1, z, B.coal);
      acts.push({
        name: '광차', hint: '광차가 갱도 안으로 들어갔다가 광석을 싣고 나와요', hit: [MX - 2, L + 1, CZ0 - 3, MX + 2, L + 6, CZ0 + 3],
        run: async a => {
          const deep = -(CZ0 - T0 - 5);
          a.flash('mine', 2, 8);
          await a.path('cart', [[0, 0, -10], [0, 0, deep]], 4);
          await a.wait(1.2);
          a.burst([MX + 0.5, L + 5, T0 + 6], { n: 30, colors: ['#e8c040', '#5ab0e0', '#ffe090'], speed: 3, up: 3, life: 1.2, gravity: 6, spread: 2 });
          await a.path('cart', [[0, 0, -10], [0, 0, 0]], 4);
          a.burst([MX + 0.5, L + 6, CZ0 + 0.5], { n: 28, colors: ['#e8c040', '#ffe090'], speed: 4, up: 4, life: 1.2, gravity: 8, spread: 2 });
        },
      });
      landmarks.push({ name: '광산 입구', note: '산속 깊이 이어진 갱도', p: [MX + 0.5, L + 22, cz + 0.5], tag: 'MINE' });
      landmarks.push({ name: '협곡 철교', note: '용암 위를 건너는 선로', p: [MX + 0.5, L + 8, 95.5] });

      // ── 절벽 주거지 ──
      const dwell = (dx, dy) => {
        let z = 60; while (z > 4 && MH.g(w, dx, z) < dy + 8) z--;
        const fz = z + 1;
        w.box(dx - 4, dy + 1, fz - 5, dx + 4, dy + 7, fz, 0);
        w.box(dx - 4, dy + 1, fz - 5, dx + 4, dy + 7, fz - 5, B.graniteDk);
        for (let x = dx - 5; x <= dx + 5; x++) for (let y = dy; y <= dy + 9; y++) if (Math.abs(x - dx) === 5 || y >= dy + 8 || y === dy) w.set(x, y, fz, B.granite);
        w.box(dx - 1, dy + 1, fz - 4, dx + 1, dy + 5, fz - 4, B.bronze); w.set(dx, dy + 6, fz - 4, B.bronze);
        w.box(dx - 3, dy + 4, fz - 4, dx - 3, dy + 5, fz - 4, B.win); w.box(dx + 3, dy + 4, fz - 4, dx + 3, dy + 5, fz - 4, B.win);
        w.box(dx - 4, dy, fz + 1, dx + 4, dy, fz + 4, B.plank);
        for (let x = dx - 4; x <= dx + 4; x += 2) { w.set(x, dy + 1, fz + 4, B.timber); w.set(x, dy + 2, fz + 4, B.timber); }
        for (const x of [dx - 4, dx + 4]) w.line(x, dy - 1, fz + 4, x, dy - 5, fz, B.timber);
        return [dx, dy, fz];
      };
      const homes = [dwell(20, L + 12), dwell(34, L + 24), dwell(74, L + 14), dwell(94, L + 26), dwell(108, L + 12), dwell(84, L + 36)];
      homes.forEach(([x, y, z], k) => { if (k % 2 === 0) lights.push({ p: [x - 2.5, y + 5, z - 3], c: '#ffb050', i: 0.9, d: 10, flicker: 0.2, night: true }); });
      for (let i = 0; i < 12; i++) { const x = 24 + i, y = L + 1 + i; let z = 60; while (z > 4 && MH.g(w, x, z) < y + 3) z--; w.box(x, y, z + 1, x, y, z + 3, B.granite); w.box(x, y + 1, z + 1, x, y + 4, z + 3, 0); }
      // ── 절벽 승강기: 네 기둥 승강로 안에서 쇠우리가 오르내리고 밧줄은 줄어든다 ──
      const EX = 116, top = L + 26;
      let sz = 60; while (sz > 4 && MH.g(w, EX, sz) < top) sz--;
      w.box(EX - 5, top, sz - 6, EX + 5, top, sz, B.plank); w.box(EX - 5, top + 1, sz - 6, EX + 5, top + 6, sz, 0);
      w.box(EX - 5, top + 1, sz - 6, EX + 5, top + 6, sz - 6, B.graniteDk); w.box(EX - 1, top + 1, sz - 5, EX + 1, top + 4, sz - 5, B.bronze);
      const Z0 = sz + 1, Z1 = sz + 6, TOPB = top + 10;
      // 승강로를 절벽에서 수직으로 파낸다
      for (let z = Z0; z <= 46; z++) for (let x = EX - 4; x <= EX + 4; x++) { MH.setH(w, x, z, L, B.gravel, B.rock); for (let y = L + 1; y <= TOPB + 8; y++) w.set(x, y, z, 0); }
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
      const FX = 78, FZ = 52;
      const forge = MH.house(w, { x: FX, z: FZ, sx: 17, sz: 14, fh: 9, face: 'w', roof: 'hip', pitch: 1, y: L,
        m: { found: B.graniteDk, wall: B.granite, frame: B.graniteDk, win: B.win, door: B.bronze, roof: B.slate, eave: B.iron } });
      w.box(FX + 12, L + 1, FZ + 1, FX + 15, forge.peak + 12, FZ + 4, B.graniteDk); w.box(FX + 13, forge.peak + 10, FZ + 2, FX + 14, forge.peak + 12, FZ + 3, 0);
      w.walls(FX + 11, forge.peak + 13, FZ, FX + 16, forge.peak + 13, FZ + 5, B.granite);
      // 화덕(집 앞 서쪽): 돌 아궁이 속 불
      w.box(FX - 6, L + 1, FZ + 2, FX - 3, L + 5, FZ + 7, B.graniteDk); w.box(FX - 6, L + 2, FZ + 3, FX - 5, L + 4, FZ + 6, 0);
      w.box(FX - 4, L + 2, FZ + 3, FX - 4, L + 3, FZ + 6, B.ember); w.box(FX - 5, L + 2, FZ + 4, FX - 5, L + 2, FZ + 5, B.ember);
      w.box(FX - 5, L + 6, FZ + 4, FX - 4, L + 12, FZ + 5, B.graniteDk);
      w.box(FX - 11, L + 1, FZ + 4, FX - 10, L + 2, FZ + 5, B.iron); w.box(FX - 12, L + 3, FZ + 4, FX - 9, L + 3, FZ + 5, B.iron);
      // 풀무: 아궁이 옆 빈 자리
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
      landmarks.push({ name: '대장간', note: '밤낮으로 달아오른 화덕', p: [FX + 8.5, forge.peak + 20, FZ + 7], tag: 'FORGE' });
      // 절벽에서 흘러 협곡으로 떨어지는 용암 수로
      const lavaPath = [[102, 30], [104, 46], [103, 66], [104, 84]];
      for (let z = 0; z < D; z++) for (let x = 90; x < 116; x++) {
        if (MH.polyDist(x, z, lavaPath) > 1.8) continue;
        const g = MH.g(w, x, z);
        if (g < base - 10) continue;
        MH.setH(w, x, z, g - 1, B.basalt, B.basalt); w.liquid(x, z, g);
      }
      lights.push({ p: [103.5, L + 1, 60], c: '#ff5a1a', i: 1.2, d: 16, flicker: 0.2, liquid: true });
      // 용암 수로를 건너는 돌다리 두 곳(동쪽 승강기 쪽과 마을을 잇는다)
      for (const zb of [56, 74]) {
        w.box(99, L + 1, zb - 1, 108, L + 1, zb + 1, B.graniteDk);
        for (let x = 100; x <= 107; x++) for (const zz of [zb - 2, zb + 2]) { w.set(x, L + 1, zz, B.graniteDk); w.set(x, L + 2, zz, x % 2 ? B.iron : B.graniteDk); }
      }
      // ── 드워프 돌집과 주점 ──
      const hm = { found: B.graniteDk, wall: B.granite, frame: B.graniteDk, quoin: B.graniteDk, win: B.win, door: B.bronze, roof: B.slate, eave: B.iron, ridge: B.bronze, chimney: B.graniteDk };
      const hs = [[10, 50, 11, 9, 'e'], [12, 66, 10, 9, 'e'], [30, 68, 11, 8, 'n'], [66, 70, 10, 8, 'n']].map(([x, z, sx, sz2, face]) => MH.houseX(w, { x, z, sx, sz: sz2, fh: 6, face, roof: 'hip', pitch: 1, y: L, m: hm }));
      const tav = MH.houseX(w, { x: 28, z: 46, sx: 15, sz: 10, floors: 2, fh: 6, face: 's', pitch: 1, dormers: 2, y: L, m: Object.assign({}, hm, { frame: B.timber, lamp: B.win }) });
      w.box(35, tav.y + 8, 56, 36, tav.y + 11, 56, B.banner); w.set(35, tav.y + 9, 57, B.gold);
      for (const [bx, bz2] of [[26, 58], [27, 58], [26, 59], [45, 58]]) { w.set(bx, L + 1, bz2, B.barrel); if (bx === 26) w.set(bx, L + 2, bz2, B.barrel); }
      lights.push({ p: [tav.door[0] + 0.5, tav.door[1] + 3, tav.door[2] + 1.5], c: '#ffb050', i: 1, d: 12, flicker: 0.15, night: true });
      landmarks.push({ name: '돌망치 주점', note: '흑맥주가 끊이지 않는 곳', p: [35.5, tav.peak + 6, 51] });
      for (const [bx, bz2] of [[44, 76], [68, 78], [18, 78], [94, 76]]) { w.box(bx, L + 1, bz2, bx, L + 4, bz2, B.iron); w.box(bx - 1, L + 5, bz2, bx + 1, L + 5, bz2, B.iron); w.set(bx, L + 6, bz2, B.fireY); lights.push({ p: [bx + 0.5, L + 7, bz2 + 0.5], c: '#ffb050', i: 0.8, d: 11, flicker: 0.3 }); }
      const smoke = [...hs, tav].filter(h => h.chimney).slice(0, 3).map(h => ({ n: 30, colors: ['#6a605a', '#8a8078'], mode: 'rise', speed: 0.6, area: [h.chimney[0], h.chimney[2], 0.6], y0: h.chimney[1], y1: h.chimney[1] + 22, glow: false }));
      smoke.push({ n: 50, colors: ['#5a504a', '#8a7a70'], mode: 'rise', speed: 0.9, area: [FX + 14, FZ + 3, 1], y0: forge.peak + 13, y1: forge.peak + 40, glow: false });
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
