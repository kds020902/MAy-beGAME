// 물레방앗간(하위 지도) — 물레방아 마을 동쪽 강변의 2층 방앗간 안. 서쪽 벽을 뚫고 들어온 물레 굴대와 큰 나무 톱니바퀴,
// 나무 받침 위의 맷돌 두 짝과 곡물 깔때기, 북쪽 처마 밑 자루 창고와 그 위 곡물 다락(자루 도르래 구멍), 동남쪽 방앗간지기 방.
// 남·동쪽 벽은 아랫단 돌벽 높이로 잘라 낮췄다 (마을)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 68, Hh = 44, G = 10;
  const X0 = 20, X1 = 49, Z0 = 20, Z1 = 45;          // 벽(바깥 둘레)
  const LF = G + 8;                                   // 다락 바닥(서는 높이 LF+1)
  MAPS.push({
    id: 'millbrook-mill', cat: 'village', sub: true, parent: 'millbrook', name: '물레방앗간', en: 'Millbrook · Watermill', color: '#d8c49a', seed: 1011, base: G, time: 'day', size: [W, D, Hh],
    spawn: [46, G + 1, 33],
    desc: '강물이 돌리는 물레방아의 굴대가 서쪽 벽을 뚫고 들어와 큰 나무 톱니바퀴를 돌리고, 나무 받침 위 맷돌 두 짝이 밀을 고운 가루로 빻는다. 북쪽 처마 밑에는 밀가루 자루가 쌓여 있고, 그 위 곡물 다락에서는 도르래로 자루를 끌어올린다. 방앗간지기의 작은 방과 다락의 고양이가 있다.',
    info: { title: '장소 정보', en: 'WATERMILL', rows: [['1층', '맷돌방 · 자루 창고 · 방앗간지기 방'], ['2층', '곡물 다락 · 자루 도르래'], ['자랑', '강물이 돌리는 맷돌과 고운 밀가루']] },
    sky: ['#f4ead4', '#c8b490', '#fff4dc'], stars: false,
    hemi: ['#fff6e8', '#6a5a40', 0.66], sun: ['#fff2d8', 0.62, [-0.5, 1, -0.35]],
    night: { sky: ['#30282a', '#100c10', '#c08050'], stars: false, hemi: ['#c8b8a0', '#1a1410', 0.42], sun: ['#ffd8a8', 0.24, [-0.5, 1, -0.35]], haze: '#2a2420' },
    liquid: ['#2a6a9a', '#4a9ad0', '#e0f6ff'], liqSpeed: 1,
    fog: { start: 0.9, floor: G - 8, depth: 6, haze: [8, 0.1, 6], hazeColor: '#ece0c8' },
    camY: -2, zoom: 1.5,
    particles: [
      { n: 120, colors: ['#ffffff', '#f4ecd8', '#fff6d8'], mode: 'drift', speed: 0.1, wind: 0.06, area: [34, 32, 13], y0: G + 1, y1: G + 14, glow: true },
      { n: 50, colors: ['#ffffff', '#efe6d0'], mode: 'fall', speed: 0.15, area: [33.5, 31.5, 3], y0: G + 3, y1: G + 10, glow: false },
      { n: 16, colors: ['#ff9a3a', '#ffd070'], mode: 'rise', speed: 0.3, area: [46.5, 42.5, 0.6], y0: G + 2, y1: G + 5, glow: true },
    ],
    blocks: {
      grass: { c: '#6b4a30', top: '#6fae4a', v: 0.08 }, grass2: { c: '#6b4a30', top: '#86bc52', v: 0.08 }, dirt: { c: '#6b4a30', v: 0.08 }, rock: { c: '#7a7a80', v: 0.06, pat: 'stone' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.1, pat: 'stone' }, path: { c: '#6b4a30', top: '#c8b48a', v: 0.1 }, flower: { c: '#e86a8a', v: 0.06 }, flower2: { c: '#f0e060', v: 0.06 },
      found: { c: '#8a8a88', v: 0.06, pat: 'stone' }, stoneDk: { c: '#6a6a6a', v: 0.06, pat: 'stone' }, plaster: { c: '#efe4c8', v: 0.03 }, frame: { c: '#5a3a24', v: 0.05 },
      floorW: { c: '#8a6440', top: '#b08a5a', v: 0.05, pat: 'plank' }, flag: { c: '#8e8a82', top: '#a8a49a', v: 0.06, pat: 'floor' }, plank: { c: '#9a6a40', v: 0.08, pat: 'plank' }, wood: { c: '#6a4428', v: 0.05 },
      door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, win: { c: '#ffd890', night: true, day: '#bfe4f4' }, shutter: { c: '#3a6a4a', v: 0.03, pat: 'plank' },
      mstone: { c: '#b8b4ac', top: '#cac6be', v: 0.05, pat: 'stone' }, mstoneDk: { c: '#9a968e', v: 0.05, pat: 'stone' }, iron: { c: '#4a4a52', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 },
      sack: { c: '#e8dcc0', v: 0.04 }, sack2: { c: '#d8c8a0', v: 0.05 }, flour: { c: '#f8f4ea', v: 0.02 }, wheat: { c: '#d8b84a', v: 0.1 }, hay: { c: '#dcb456', v: 0.08 },
      cask: { c: '#8a5a30', v: 0.08, pat: 'log' }, brass: { c: '#c8a048', v: 0.04 }, mesh: { c: '#d8ccb0', v: 0.08 },
      bed: { c: '#ece4d4', v: 0.02 }, quilt: { c: '#7a9a5a', v: 0.05 }, rug: { c: '#a85a3a', v: 0.05 }, book: { c: '#8a3a3a', v: 0.04 }, pot: { c: '#3a3a3e', v: 0.03 },
      lampG: { c: '#ffe0a0', glow: true }, ember: { c: '#ff8a3a', glow: true }, flame: { c: '#ffd070', glow: true },
      catO: { c: '#e09048', v: 0.04 }, catW: { c: '#f4ece0', v: 0.02 }, catE: { c: '#3a5a2a', v: 0.02 }, pink: { c: '#e8a0a0', v: 0.02 },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      // ── 바깥: 방앗간 둘레 풀밭과 동쪽 문 앞 자갈길 ──
      MH.terrain(w, { floor: G - 8, height: () => G - 1, surface: (x, z) => hash3(x, 1, z) > 0.55 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      for (let x = X1 + 1; x < W - 2; x++) for (let z = 30; z <= 35; z++) w.set(x, G - 1, z, (x + z) % 5 ? B.cobble : B.path);
      for (let k = 0; k < 60; k++) { const x = (hash3(k, 2, 9) * W) | 0, z = (hash3(k, 3, 9) * D) | 0; if (x >= X0 - 1 && x <= X1 + 2 && z >= Z0 - 1 && z <= Z1 + 1) continue; if (w.get(x, G - 1, z) === B.cobble || w.get(x, G - 1, z) === B.path) continue; w.set(x, G, z, k % 3 ? B.grass2 : (k % 2 ? B.flower : B.flower2)); }

      // ── 바닥: 널마루, 맷돌 둘레는 돌 바닥 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, B.floorW);
      for (let z = 26; z <= 37; z++) for (let x = 24; x <= 39; x++) w.set(x, G, z, B.flag);

      // ── 벽: 북·서쪽은 아랫단 돌벽 + 회벽과 목골, 남·동쪽은 돌벽 두 단만 ──
      const HT = G + 15;
      for (let y = G + 1; y <= HT; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z0, y <= G + 2 ? ((x + y) % 3 ? B.found : B.stoneDk) : (x % 3 === 0 || y === LF || y === HT ? B.frame : B.plaster));
        for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, y <= G + 2 ? ((z + y) % 3 ? B.found : B.stoneDk) : (z % 3 === 0 || y === LF || y === HT ? B.frame : B.plaster));
      }
      for (let y = G + 1; y <= G + 2; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z1, (x + y) % 3 ? B.found : B.stoneDk);
        for (let z = Z0; z <= Z1; z++) w.set(X1, y, z, (z + y) % 3 ? B.found : B.stoneDk);
      }
      for (let x = X0; x <= X1; x++) w.set(x, G + 3, Z1, B.wood);
      for (let z = Z0; z <= Z1; z++) w.set(X1, G + 3, z, B.wood);
      for (let y = G + 1; y <= G + 4; y++) w.set(X1, y, Z1, B.frame);
      // 북쪽 다락 창(셔터 창은 부품), 서쪽 아래층 창
      const winN = (x0, y0) => { w.box(x0, y0, Z0, x0 + 1, y0 + 2, Z0, B.win); w.box(x0 - 1, y0 - 1, Z0, x0 + 2, y0 - 1, Z0, B.wood); w.box(x0 - 1, y0 + 3, Z0, x0 + 2, y0 + 3, Z0, B.frame); };
      winN(25, LF + 2); winN(44, LF + 2); winN(38, LF + 2);
      const winW = (z0, y0) => { w.box(X0, y0, z0, X0, y0 + 2, z0 + 1, B.win); w.box(X0, y0 - 1, z0 - 1, X0, y0 - 1, z0 + 2, B.wood); w.box(X0, y0 + 3, z0 - 1, X0, y0 + 3, z0 + 2, B.frame); };
      winW(35, G + 4); winW(41, LF + 2); winW(25, LF + 2);
      lights.push({ name: 'sunW', p: [X0 + 2.5, G + 5, 36], c: '#fff4d8', i: 0.7, d: 14, srcR: 3 });

      // ── 동쪽 문: 문틀과 안쪽으로 열린 문짝 ──
      const DZ = 32;
      w.box(X1, G + 1, DZ, X1, G + 4, DZ + 1, 0); w.box(X1, G + 3, DZ - 1, X1, G + 3, DZ + 2, 0);
      for (const z of [DZ - 1, DZ + 2]) w.box(X1, G + 1, z, X1, G + 5, z, B.frame);
      w.box(X1, G + 5, DZ - 1, X1, G + 5, DZ + 2, B.frame);
      w.box(X1 - 2, G + 1, DZ - 2, X1 - 1, G + 4, DZ - 2, B.door);
      w.set(X1 + 1, G + 4, DZ - 2, B.lampG); w.set(X1 + 1, G + 5, DZ - 2, B.iron);
      lights.push({ name: 'doorLamp', p: [X1 + 1.5, G + 4, DZ - 1.5], c: '#ffd890', i: 0.7, d: 10, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [X1, G + 1, DZ], h: 4, hit: [X1 - 1, G + 1, DZ, X1, G + 4, DZ + 1], name: '밖으로 나가기', goto: 'millbrook', hint: '문을 열고 물레방아가 도는 마을로 나가요' }));

      // ── 다락(북쪽 띠)과 서쪽 벽을 따라 오르는 계단 · 다락 복도 ──
      w.box(X0 + 1, LF, Z0 + 1, X1 - 1, LF, Z0 + 7, B.floorW);
      for (let x = X0 + 4; x <= X1 - 1; x += 6) w.box(x, G + 1, Z0 + 7, x, LF - 1, Z0 + 7, B.frame);
      w.box(X0 + 1, LF - 1, Z0 + 7, X1 - 1, LF - 1, Z0 + 7, B.frame);
      for (let x = X0 + 4; x <= X1 - 1; x++) w.set(x, LF + 1, Z0 + 7, x % 3 === 0 ? B.frame : B.wood);
      for (let x = X0 + 4; x <= X1 - 1; x += 3) w.set(x, LF + 2, Z0 + 7, B.frame);
      w.box(X0 + 1, LF, Z0 + 8, X0 + 2, LF, 36, B.floorW);                       // 서쪽 다락 복도
      for (let z = Z0 + 8; z <= 36; z++) w.set(X0 + 3, LF + 1, z, z % 3 === 0 ? B.frame : B.wood);
      for (let k = 0; k < 8; k++) w.box(X0 + 1, G + 1, Z1 - 1 - k, X0 + 2, G + 1 + k, Z1 - 1 - k, B.plank);   // 계단: z44(G+1) → z37(G+8)
      for (let z = 37; z <= 40; z++) w.set(X0 + 3, G + 1 + (Z1 - 1 - z) + 1, z, B.wood);
      w.box(X0 + 3, G + 1, 37, X0 + 3, LF - 1, 37, B.frame);

      // ── 물레 굴대와 큰 나무 톱니바퀴(부품) ──
      const GZ = 31, GY = G + 5, GX = 26;
      w.box(X0 - 3, GY, GZ, GX - 2, GY, GZ, B.wood); w.set(X0, GY, GZ, B.iron);
      w.box(GX + 2, G + 1, GZ - 1, GX + 3, GY - 1, GZ + 1, B.found); w.set(GX + 2, GY, GZ, B.iron);
      for (const dz of [-3, 3]) w.box(X0 - 2, G - 1, GZ + dz, X0 - 2, GY + 1, GZ + dz, B.wood);
      w.box(X0 - 6, G - 1, GZ - 2, X0 - 3, G - 1, GZ + 2, 0); w.box(X0 - 6, G - 2, GZ - 2, X0 - 3, G - 2, GZ + 2, B.rock);
      for (let z = GZ - 2; z <= GZ + 2; z++) for (let x = X0 - 6; x <= X0 - 3; x++) w.liquid(x, z, G - 1);
      const gear = w.prop({ name: 'gear', pivot: [GX + 0.5, GY + 0.5, GZ + 0.5], axis: 'x', speed: 0.35 });
      for (let dy = -4; dy <= 4; dy++) for (let dz = -4; dz <= 4; dz++) {
        const r = Math.hypot(dy, dz);
        if (r > 3.6) continue;
        const rim = r > 2.6, spoke = (dy === 0 || dz === 0) && r > 0.9;
        if (rim) { gear.set(GX, GY + dy, GZ + dz, B.wood); if ((dy * 7 + dz * 3 + 40) % 3 === 0) gear.set(GX + 1, GY + dy, GZ + dz, B.plank); }
        else if (spoke) gear.set(GX, GY + dy, GZ + dz, B.plank);
      }
      gear.box(GX - 1, GY, GZ, GX + 1, GY, GZ, B.iron);

      // ── 맷돌 받침(나무 단), 아랫돌, 윗돌(부품), 곡물 깔때기 ──
      const MX = 33, MZ = 31, PT = G + 3;
      w.box(30, G + 1, 28, 37, PT, 34, B.plank);
      for (const [x, z] of [[30, 28], [37, 28], [30, 34], [37, 34]]) w.box(x, G + 1, z, x, PT, z, B.wood);
      for (let z = 29; z <= 31; z++) { w.box(38, G + 1, z, 38, G + 2, z, B.plank); w.set(39, G + 1, z, B.plank); }   // 오르는 디딤
      w.cyl(MX, MZ, PT + 1, PT + 1, 2.7, B.mstoneDk);
      w.ring(MX, MZ, PT + 1, 2.7, 3.5, B.wood);
      const runner = w.prop({ name: 'runner', pivot: [MX + 0.5, PT + 2.5, MZ + 0.5], axis: 'y', speed: 0.25 });
      runner.cyl(MX, MZ, PT + 2, PT + 2, 2.7, B.mstone);
      runner.set(MX, PT + 2, MZ, 0);
      for (const [dx, dz] of [[2, 0], [-2, 0]]) runner.set(MX + dx, PT + 3, MZ + dz, B.iron);
      for (const [x, z] of [[MX - 2, MZ - 3], [MX + 2, MZ - 3]]) w.box(x, PT + 1, z, x, PT + 6, z, B.wood);
      w.set(MX, PT + 4, MZ - 1, B.plank);
      for (let k = 1; k <= 2; k++) for (let dz = -k; dz <= k; dz++) for (let dx = -k; dx <= k; dx++) w.set(MX + dx, PT + 4 + k, MZ - 1 + dz, Math.max(Math.abs(dx), Math.abs(dz)) === k ? B.plank : B.wheat);
      w.box(MX - 2, PT + 6, MZ - 3, MX + 2, PT + 6, MZ - 3, B.wood);
      w.line(MX, PT + 7, MZ - 3, MX, LF + 1, Z0 + 7, B.plank);                       // 다락에서 내려오는 곡물 홈통
      // 가루 받는 홈과 자루
      w.box(37, PT - 1, 32, 38, PT - 1, 32, B.wood); w.set(38, PT - 2, 32, B.wood);
      w.box(38, G + 1, 33, 39, G + 2, 34, B.sack); w.set(38, G + 3, 33, B.flour);
      lights.push({ name: 'millLamp', p: [MX + 0.5, LF - 1, Z0 + 7.5], c: '#ffe0a0', i: 0.9, d: 15, flicker: 0.08 });
      w.set(MX, LF - 1, Z0 + 8, B.iron); w.set(MX, LF - 2, Z0 + 8, B.lampG);
      acts.push({
        name: '맷돌 돌리기', hint: '윗돌이 힘차게 돌며 고운 밀가루가 하얗게 피어올라요', hit: [30, PT, 28, 37, PT + 3, 34],
        run: async a => {
          a.spin('runner', 9, 4.5); a.spin('gear', 6, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([MX + 0.5 + Math.cos(k) * 3, PT + 2.5, MZ + 0.5 + Math.sin(k) * 3], { n: 22, colors: ['#ffffff', '#f4ecd8', '#fff8e8'], speed: 2.4, up: 1.6, life: 1.6, gravity: 0.2, spread: 1.2 }); await a.wait(0.45); }
        },
      });
      acts.push({
        name: '굴대 톱니바퀴', hint: '강물이 세게 밀려와 굴대가 빨라지고 나무 톱니바퀴가 덜컹덜컹 돌아요', hit: [GX - 1, G + 1, GZ - 4, GX + 1, GY + 4, GZ + 4],
        run: async a => {
          a.spin('gear', 10, 4);
          for (let k = 0; k < 7; k++) { a.burst([X0 + 1, GY + 0.5, GZ + 0.5], { n: 18, colors: ['#d8f0ff', '#8ac8f0', '#ffffff'], speed: 3, up: 1, life: 0.9, gravity: 6, spread: 0.6 }); a.burst([GX + 1.5, GY + 4, GZ + 0.5], { n: 6, colors: ['#c8a070', '#e8d8b8'], speed: 2, up: 2, life: 0.8, gravity: 4, spread: 1 }); await a.wait(0.5); }
        },
      });

      // ── 밀가루 체질 틀(부품): 다리 위에서 좌우로 흔든다 ──
      const SX = 31, SZ = 39;
      for (const [x, z] of [[SX, SZ], [SX + 4, SZ], [SX, SZ + 2], [SX + 4, SZ + 2]]) w.box(x, G + 1, z, x, G + 2, z, B.wood);
      w.box(SX + 1, G + 1, SZ + 1, SX + 3, G + 1, SZ + 1, B.flour);
      const sieve = w.prop({ name: 'sieve', pivot: [SX + 2.5, G + 3.5, SZ + 1.5] });
      sieve.walls(SX - 1, G + 3, SZ, SX + 5, G + 3, SZ + 2, B.plank); sieve.box(SX, G + 3, SZ + 1, SX + 4, G + 3, SZ + 1, B.mesh);
      sieve.box(SX - 2, G + 3, SZ + 1, SX - 2, G + 3, SZ + 1, B.wood);
      acts.push({
        name: '밀가루 체질', hint: '체가 앞뒤로 흔들리며 밀가루가 눈처럼 체 아래로 내려앉아요', hit: [SX - 2, G + 1, SZ, SX + 5, G + 4, SZ + 2],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.move('sieve', [k % 2 ? -2 : 2, 0, 0], 0.3);
            a.burst([SX + 2.5, G + 2.6, SZ + 1.5], { n: 26, colors: ['#ffffff', '#f8f4ea', '#efe6d0'], speed: 0.8, up: -0.5, life: 1.4, gravity: 1, spread: 2 });
          }
          await a.move('sieve', [0, 0, 0], 0.4);
        },
      });

      // ── 큰 저울(부품: 저울대와 접시) ──
      const KX = 43, KZ = 34;
      w.box(KX, G + 1, KZ, KX, G + 5, KZ, B.wood); w.box(KX - 1, G + 1, KZ, KX + 1, G + 1, KZ, B.wood); w.set(KX, G + 7, KZ, B.brass);
      const scale = w.prop({ name: 'scale', pivot: [KX + 0.5, G + 6.5, KZ + 0.5] });
      scale.box(KX - 3, G + 6, KZ, KX + 3, G + 6, KZ, B.brass);
      for (const s of [-1, 1]) {
        const px = KX + s * 3;
        scale.box(px, G + 4, KZ, px, G + 5, KZ, B.iron);
        scale.box(px - 1, G + 3, KZ - 1, px + 1, G + 3, KZ + 1, B.brass);
      }
      scale.box(KX - 4, G + 4, KZ, KX - 2, G + 5, KZ, 0); scale.box(KX - 3, G + 4, KZ, KX - 3, G + 5, KZ, B.iron);
      scale.box(KX - 4, G + 4, KZ - 1, KX - 2, G + 5, KZ + 1, 0); scale.box(KX - 3, G + 4, KZ, KX - 3, G + 5, KZ, B.iron);
      scale.set(KX - 3, G + 4, KZ - 1, B.sack); scale.set(KX - 2, G + 4, KZ, B.sack);
      scale.set(KX + 3, G + 4, KZ - 1, B.iron); scale.set(KX + 2, G + 4, KZ + 1, B.iron);
      acts.push({
        name: '큰 저울', hint: '밀가루 자루와 추를 올린 큰 저울이 기우뚱거리다 반듯하게 맞춰져요', hit: [KX - 1, G + 1, KZ - 1, KX + 1, G + 7, KZ + 1],
        run: async a => {
          await a.turn('scale', [0, 0, 0.5], 0.7); await a.turn('scale', [0, 0, -0.42], 0.9); await a.turn('scale', [0, 0, 0.24], 0.8); await a.turn('scale', [0, 0, -0.1], 0.6);
          a.burst([KX - 2.5, G + 5, KZ + 0.5], { n: 14, colors: ['#ffffff', '#f4ecd8'], speed: 1.5, up: 1.5, life: 1, gravity: 1, spread: 0.8 });
          await a.turn('scale', [0, 0, 0], 0.6);
          a.burst([KX + 0.5, G + 8, KZ + 0.5], { n: 16, colors: ['#ffe9a0', '#ffffff'], speed: 1.6, up: 2, life: 0.9, gravity: -0.4, spread: 0.5 });
        },
      });

      // ── 자루 창고(다락 아래 북쪽): 자루 더미, 통, 빗자루 ──
      for (let x = 37; x <= 47; x++) for (let z = Z0 + 1; z <= Z0 + 4; z++) {
        const h = 1 + ((hash3(x, 3, z) * 3) | 0) - (z === Z0 + 4 ? 1 : 0);
        for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, (x + y + z) % 3 ? B.sack : B.sack2);
      }
      for (const [x, z] of [[22, 22], [24, 22], [22, 24]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.cask);
      w.box(28, G + 1, 21, 29, G + 3, 22, B.hay);

      // ── 다락: 곡물 궤짝, 자루, 도르래 구멍과 자루(부품), 셔터 창(부품), 고양이(부품) ──
      for (const x of [22, 26]) { w.walls(x, LF + 1, Z0 + 1, x + 3, LF + 2, Z0 + 3, B.plank); w.box(x + 1, LF + 2, Z0 + 2, x + 2, LF + 2, Z0 + 2, B.wheat); }
      for (let x = 35; x <= 41; x++) for (let z = Z0 + 1; z <= Z0 + 2; z++) { w.set(x, LF + 1, z, (x + z) % 3 ? B.sack : B.sack2); if ((x * 3 + z) % 4 === 0) w.set(x, LF + 2, z, B.sack); }
      const HX = 45, HZ = Z0 + 8;
      for (let x = HX - 1; x <= HX + 2; x++) w.set(x, LF + 1, Z0 + 7, 0);
      for (const x of [HX - 1, HX + 2]) w.box(x, LF + 1, Z0 + 6, x, LF + 6, Z0 + 6, B.frame);
      w.box(HX - 1, LF + 6, Z0 + 6, HX + 2, LF + 6, Z0 + 6, B.wood); w.box(HX, LF + 6, Z0 + 7, HX, LF + 6, HZ, B.wood); w.line(HX, LF + 3, Z0 + 6, HX, LF + 5, HZ - 1, B.wood);
      w.set(HX, LF + 5, HZ, B.iron);
      const hdrop = (LF + 3) - (G + 3), hrope = MH.rope(w, 'hrope', HX, LF + 4, HZ, 1 + (LF + 4) - (G + 4), B.rope);
      const hsack = w.prop({ name: 'hsack', pivot: [HX + 1, G + 2, HZ + 1] });
      hsack.box(HX, G + 1, HZ, HX + 1, G + 3, HZ + 1, B.sack); hsack.set(HX, G + 3, HZ, B.rope);
      hrope.set(HX, G + 3, HZ, 0);
      acts.push({
        name: '자루 도르래', hint: '도르래가 끼익 돌며 밀가루 자루가 다락 난간까지 끌려 올라가요', hit: [HX - 1, G + 1, HZ - 2, HX + 2, LF + 6, HZ + 1],
        run: async a => {
          const L0 = 1 + (LF + 4) - (G + 4);
          await Promise.all([a.move('hsack', [0, hdrop, 0], 2.4, t => t), a.rope('hrope', L0, Math.max(1, L0 - hdrop), 2.4, t => t)]);
          a.burst([HX + 1, LF + 1.5, HZ + 1], { n: 30, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], speed: 2.5, up: 1.5, life: 1.3, gravity: 1, spread: 1.4 });
          await a.wait(1);
          await Promise.all([a.move('hsack', [0, 0, 0], 2.2, t => t), a.rope('hrope', L0, L0, 2.2, t => t)]);
        },
      });
      // 셔터 창: 다락 북쪽 벽 x30..33
      const WX0 = 30;
      w.box(WX0, LF + 2, Z0, WX0 + 3, LF + 4, Z0, B.win); w.box(WX0 - 1, LF + 1, Z0, WX0 + 4, LF + 1, Z0, B.wood); w.box(WX0 - 1, LF + 5, Z0, WX0 + 4, LF + 5, Z0, B.frame);
      const shutL = w.prop({ name: 'shutL', pivot: [WX0, LF + 3, Z0 + 1] }), shutR = w.prop({ name: 'shutR', pivot: [WX0 + 4, LF + 3, Z0 + 1] });
      shutL.box(WX0, LF + 2, Z0 + 1, WX0 + 1, LF + 4, Z0 + 1, B.shutter); shutR.box(WX0 + 2, LF + 2, Z0 + 1, WX0 + 3, LF + 4, Z0 + 1, B.shutter);
      lights.push({ name: 'loftSun', p: [WX0 + 2, LF + 3, Z0 + 2.5], c: '#fff4d0', i: 0.2, d: 14, srcR: 3 });
      acts.push({
        name: '다락 창 열기', hint: '다락 덧창이 활짝 열리며 햇살과 함께 밀가루 먼지가 반짝여요', hit: [WX0 - 1, LF + 1, Z0 + 1, WX0 + 4, LF + 5, Z0 + 2],
        run: async a => {
          await Promise.all([a.turn('shutL', [0, 1.5, 0], 1), a.turn('shutR', [0, -1.5, 0], 1)]);
          a.flash('loftSun', 5, 3.5); a.glow(1.4, 3);
          for (let k = 0; k < 6; k++) { a.burst([WX0 + 2, LF + 3 - k * 0.8, Z0 + 2 + k], { n: 16, colors: ['#fff6d8', '#ffffff', '#ffe9a0'], speed: 0.6, up: -0.4, life: 1.8, gravity: 0.3, spread: 1.6 }); await a.wait(0.4); }
          await a.wait(0.6);
          await Promise.all([a.turn('shutL', [0, 0, 0], 1), a.turn('shutR', [0, 0, 0], 1)]);
        },
      });
      // 고양이: 다락 자루 위에 웅크린 얼룩 고양이
      const CX = 37, CZ = Z0 + 4, CY = LF + 1;
      const cat = w.prop({ name: 'cat', pivot: [CX + 1, CY, CZ + 0.5] });
      cat.box(CX, CY, CZ, CX + 2, CY, CZ, B.catO); cat.set(CX + 1, CY, CZ, B.catW);
      cat.box(CX + 3, CY, CZ, CX + 3, CY + 1, CZ, B.catO); cat.set(CX + 3, CY + 2, CZ, B.catO); cat.set(CX + 4, CY + 1, CZ, B.pink);
      cat.set(CX - 1, CY, CZ, B.catO); cat.set(CX - 1, CY + 1, CZ, B.catO); cat.set(CX - 1, CY + 2, CZ, B.catW);
      acts.push({
        name: '방앗간 고양이', hint: '다락 고양이가 생쥐를 쫓아 폴짝 뛰었다가 밀가루를 뒤집어쓰고 재채기해요', hit: [CX - 1, CY, CZ - 1, CX + 4, CY + 3, CZ + 1],
        run: async a => {
          await a.move('cat', [-3, 2.5, 0.5], 0.35); await a.move('cat', [-6, 0, 1], 0.35);
          a.burst([CX - 5, CY + 1, CZ + 1.5], { n: 40, colors: ['#ffffff', '#f8f4ea', '#efe6d0'], speed: 3, up: 2, life: 1.4, gravity: 1, spread: 1.4 });
          await a.wait(0.8);
          for (let k = 0; k < 2; k++) { await a.move('cat', [-6, 0.6, 1], 0.12); a.burst([CX - 4.5, CY + 1.5, CZ + 1.5], { n: 18, colors: ['#ffffff', '#f4ecd8'], speed: 2.2, up: 1, life: 0.8, gravity: 0.6, spread: 0.6 }); await a.move('cat', [-6, 0, 1], 0.12); await a.wait(0.4); }
          await a.move('cat', [-3, 2.5, 0.5], 0.35); await a.move('cat', [0, 0, 0], 0.35);
        },
      });

      // ── 방앗간지기 방(남동쪽): 낮은 칸막이, 침대, 작은 화덕, 탁자와 책 ──
      const RX = 39, RZ = 37;
      for (let x = RX; x <= X1 - 1; x++) if (x < 42 || x > 43) w.box(x, G + 1, RZ, x, G + 2, RZ, x % 3 === 0 ? B.frame : B.plank);
      for (let z = RZ; z <= Z1 - 1; z++) w.box(RX, G + 1, z, RX, G + 2, z, z % 3 === 0 ? B.frame : B.plank);
      w.box(RX + 1, G + 1, Z1 - 3, RX + 4, G + 1, Z1 - 1, B.wood); w.box(RX + 1, G + 2, Z1 - 3, RX + 3, G + 2, Z1 - 1, B.quilt); w.box(RX + 4, G + 2, Z1 - 3, RX + 4, G + 2, Z1 - 1, B.bed); w.box(RX + 1, G + 2, Z1 - 3, RX + 1, G + 3, Z1 - 1, B.wood);
      w.box(RX + 2, G + 1, RZ + 1, RX + 4, G + 1, RZ + 2, B.rug);
      w.box(X1 - 3, G + 1, Z1 - 3, X1 - 1, G + 2, Z1 - 1, B.found); w.set(X1 - 2, G + 2, Z1 - 2, B.ember); w.set(X1 - 2, G + 3, Z1 - 2, B.pot); w.box(X1 - 3, G + 3, Z1 - 1, X1 - 1, G + 5, Z1 - 1, B.found);
      lights.push({ name: 'stove', p: [X1 - 1.5, G + 3, Z1 - 1.5], c: '#ff9a4a', i: 0.8, d: 9, flicker: 0.25 });
      w.box(X1 - 3, G + 1, RZ + 2, X1 - 2, G + 1, RZ + 3, B.wood); w.set(X1 - 3, G + 2, RZ + 2, B.book); w.set(X1 - 2, G + 2, RZ + 3, B.flame);
      w.set(X1 - 4, G + 1, RZ + 3, B.plank);

      // 문 옆 밀가루 자루 더미와 통
      for (const [x, z, h] of [[47, 26, 2], [47, 25, 1], [46, 25, 1], [47, 36, 1], [46, 36, 1]]) w.box(x, G + 1, z, x, G + h, z, B.sack);
      w.box(41, G + 1, 30, 42, G + 2, 31, B.cask);
      landmarks.push({ name: '물레방앗간', note: '맷돌과 곡물 다락', p: [MX + 0.5, LF + 8, MZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
