// 곶의 등대(하위 지도) — 갈매기 항구 곶 끝 빨강·흰 줄무늬 등대의 단면. 1층 기름 창고와 등대지기 일지 방(책상·침대·난로),
// 벽에 박힌 돌계단이 나선으로 돌아 북서쪽 반을 덮은 등실(회전 렌즈·태엽 상자·망원경·안개 종)로 오른다.
// 남동쪽 벽은 잘라 낮췄다 (마을)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 44, G = 10, C = 32;
  const RI = 10.4, RO = 12;                            // 안쪽 바닥 반지름 · 벽 바깥 반지름
  const DF = G + 10, TOP = G + 18;                     // 등실 바닥 · 벽 꼭대기
  MAPS.push({
    id: 'harbor-lighthouse', cat: 'village', sub: true, parent: 'harbor', name: '곶의 등대', en: 'Gull Harbor · Cape Lighthouse', color: '#d04a3a', seed: 1132, base: G, time: 'day', size: [W, D, Hh],
    spawn: [32, G + 1, 39],
    desc: '항구 곶 끝에 선 빨강·흰 줄무늬 등대 속. 1층에는 등불 기름통과 등대지기의 일지 책상, 좁은 침대와 무쇠 난로가 있고, 벽에 박힌 돌계단을 나선으로 돌아 오르면 꼭대기 등실에서 커다란 렌즈가 태엽 힘으로 천천히 돈다. 안개 낀 날에는 종을 울려 배들을 부른다.',
    info: { title: '장소 정보', en: 'CAPE LIGHTHOUSE', rows: [['1층', '기름 창고 · 등대지기 일지 방'], ['꼭대기', '회전 렌즈 · 태엽 상자 · 망원경 · 안개 종'], ['소문', '밤마다 등대지기가 바다를 향해 노래한다']] },
    sky: ['#ffd8b0', '#5a6aa8', '#ffe8c0'], stars: false,
    hemi: ['#fff0e0', '#3a4a6a', 0.62], sun: ['#ffe0c0', 0.66, [-0.4, 1, -0.5]],
    night: { sky: ['#1e2a48', '#060a18', '#d8a060'], stars: true, hemi: ['#a8b8d8', '#101420', 0.42], sun: ['#c8d4ff', 0.26, [-0.4, 1, -0.5]], haze: '#1a2234' },
    liquid: ['#1f5a80', '#3a86b0', '#eaf8ff'], liqSpeed: 0.9,
    fog: { start: 0.82, floor: G - 12, depth: 6, haze: [8, 0.12, 6], hazeColor: '#e8d8c8' },
    camY: 1, zoom: 1.35,
    particles: [
      { n: 80, colors: ['#fff6d8', '#ffffff'], mode: 'drift', speed: 0.08, wind: 0.05, area: [C, C, 9], y0: G + 1, y1: G + 17, glow: true },
      { n: 30, colors: ['#fff0b0', '#ffe890'], mode: 'wisp', speed: 0.6, size: 2, area: [28.5, 28.5, 3], y0: DF + 2, y1: DF + 8, glow: true },
    ],
    blocks: {
      grass: { c: '#7a5a3a', top: '#7aa84a', v: 0.08 }, grass2: { c: '#7a5a3a', top: '#8ab85a', v: 0.08 }, dirt: { c: '#7a5a3a', v: 0.08 },
      rock: { c: '#6e6e78', v: 0.06, pat: 'stone' }, cliff: { c: '#7e7a78', v: 0.06, pat: 'big' }, sand: { c: '#c8b080', top: '#ecd8a4', v: 0.05 }, cobble: { c: '#8a8680', top: '#a8a49a', v: 0.1, pat: 'stone' },
      found: { c: '#8a8680', v: 0.05, pat: 'stone' }, rockDk: { c: '#4e4e58', v: 0.06, pat: 'stone' }, stripeR: { c: '#d04a3a', v: 0.03 }, stripeW: { c: '#f4f0e8', v: 0.02 }, wallI: { c: '#ece6d8', v: 0.03 },
      flag: { c: '#9a968c', top: '#b4b0a6', v: 0.05, pat: 'stone' }, step: { c: '#a8a49a', top: '#c0bcb2', v: 0.04 }, deck: { c: '#8a6440', top: '#a87a4c', v: 0.05, pat: 'plank' },
      plank: { c: '#9a6a40', v: 0.08, pat: 'plank' }, wood: { c: '#5a4030', v: 0.05 }, iron: { c: '#3a3a42', v: 0.03 }, brass: { c: '#c8a048', v: 0.04 }, copper: { c: '#b8683a', v: 0.04 },
      glass: { c: '#c8e4f0', v: 0.02 }, lens: { c: '#ffe890', night: true, day: '#c8e0ec' }, flameL: { c: '#fff4c0', glow: true }, ember: { c: '#ff7a2a', glow: true }, lampG: { c: '#ffe0a0', glow: true },
      win: { c: '#ffd890', night: true, day: '#bfe0f4' }, door: { c: '#3a5a7a', v: 0.03, pat: 'plank' },
      barrel: { c: '#8a5a30', v: 0.08, pat: 'log' }, crate: { c: '#a07a4a', v: 0.08, pat: 'plank' }, rope: { c: '#c8b890', v: 0.04 }, net: { c: '#8a8a70', v: 0.1 },
      bed: { c: '#f0e8d8', v: 0.02 }, quilt: { c: '#3a6a9a', v: 0.04, pat: 'check', alt: '#e8e0d0' }, rug: { c: '#a84a3a', top: '#b85a44', v: 0.05, pat: 'check', alt: '#d8c8a0' },
      book: { c: '#7a2a2a', v: 0.04 }, book2: { c: '#2a4a6a', v: 0.04 }, paper: { c: '#f4ecd8', v: 0.02 }, mapB: { c: '#5a8ab0', v: 0.04 }, mapS: { c: '#e0cc98', v: 0.04 }, bell: { c: '#c8a050', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      const rad = (x, z) => Math.hypot(x - C, z - C);
      // ── 바깥: 곶의 풀밭과 바위, 둘레 바다 ──
      MH.terrain(w, {
        floor: G - 12,
        height: (x, z) => { const r = rad(x, z), n = w.noise.fbm(x * 0.12, z * 0.12, 2); return r < 15 ? G - 1 : r < 21 ? G - 1 - (r - 15) * 0.9 + n * 1.5 : G - 8 + n * 3; },
        surface: (x, z, y) => y >= G - 1 ? (hash3(x, 1, z) > 0.5 ? B.grass2 : B.grass) : y >= G - 5 ? B.cliff : B.sand,
        under: (x, z, y, dep) => dep < 2 && y >= G - 2 ? B.dirt : B.cliff,
      });
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (w.hm[x + W * z] < G - 5) w.liquid(x, z, G - 5);
      for (let z = C + 12; z <= C + 17; z++) for (let x = C - 1; x <= C + 2; x++) w.set(x, G - 1, z, B.cobble);
      for (let a = 0; a < 48; a++) { const t = a / 48 * Math.PI * 2, x = Math.round(C + Math.cos(t) * 13.2), z = Math.round(C + Math.sin(t) * 13.2); if (Math.abs(x - C - 0.5) > 2 || z < C) w.set(x, G, z, a % 3 ? B.found : B.rockDk); }

      // ── 바닥과 원통 벽: 북서쪽 반은 꼭대기 등실까지, 남동쪽 반은 두 단 ──
      for (let z = C - 13; z <= C + 13; z++) for (let x = C - 13; x <= C + 13; x++) {
        const dx = x - C, dz = z - C, r = Math.hypot(dx, dz);
        if (r > RO) continue;
        w.set(x, G, z, r <= 3.2 ? B.rug : (r > RI ? B.found : ((Math.floor(Math.atan2(dz, dx) * 4) + Math.floor(r / 3)) % 2 ? B.flag : B.step)));
        if (r <= RI) continue;
        const s = (dx + dz) / (r * Math.SQRT2);
        const top = s < 0.05 ? TOP : s < 0.4 ? Math.round(TOP - (s - 0.05) / 0.35 * (TOP - G - 3)) : G + 2;
        const outer = r > 11.1;
        for (let y = G + 1; y <= top; y++) {
          let b = outer ? (Math.floor((y - G - 1) / 5) % 2 ? B.stripeR : B.stripeW) : B.wallI;
          if (y > DF && y < TOP - 1 && s < 0.2) b = (Math.round(Math.atan2(dz, dx) * 6) % 2 === 0 || y === DF + 1) ? B.iron : B.glass;
          if (y === TOP - 1 && s < 0.2) b = B.iron;
          if (y === TOP) b = B.stripeR;
          if (y === top && top <= G + 3) b = B.found;
          w.set(x, y, z, b);
        }
      }
      // 아래층 작은 창(북서쪽 벽)
      for (const t of [-2.3, -1.6, -0.95]) for (let y = G + 4; y <= G + 6; y++) for (let k = -1; k <= 0; k++) {
        const x = Math.round(C + Math.cos(t) * 10.9) + (Math.abs(Math.cos(t)) > 0.7 ? 0 : k), z = Math.round(C + Math.sin(t) * 10.9) + (Math.abs(Math.cos(t)) > 0.7 ? k : 0);
        if (rad(x, z) > RI) w.set(x, y, z, B.win);
      }
      lights.push({ name: 'sunW', p: [C - 6, G + 5, C - 6], c: '#fff4d8', i: 0.5, d: 14, srcR: 4 });

      // ── 남쪽 문 ──
      for (let z = C + 10; z <= C + 12; z++) {
        for (const x of [C, C + 1]) if (rad(x, z) > RI) w.box(x, G + 1, z, x, G + 4, z, 0);
        for (const x of [C - 1, C + 2]) if (rad(x, z) > RI && rad(x, z) <= RO) w.box(x, G + 1, z, x, G + 5, z, B.found);
      }
      for (let x = C - 1; x <= C + 2; x++) for (let z = C + 10; z <= C + 12; z++) if (rad(x, z) > RI && rad(x, z) <= RO) w.set(x, G + 5, z, B.found);
      w.set(C + 3, G + 4, C + 13, B.lampG); w.set(C + 3, G + 5, C + 13, B.iron);
      lights.push({ name: 'doorLamp', p: [C + 3.5, G + 4, C + 13.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [C, G + 1, C + 11], h: 4, hit: [C, G + 1, C + 10, C + 1, G + 4, C + 11], name: '밖으로 나가기', goto: 'harbor', hint: '등대 문을 나서 바닷바람 부는 곶으로 나가요' }));

      // ── 벽에 박힌 나선 돌계단: 남동쪽 문 옆에서 시작해 동쪽을 돌아 북서쪽 등실로 ──
      const A0 = 1.25, A1 = -0.95;
      for (let z = C - 11; z <= C + 11; z++) for (let x = C - 11; x <= C + 11; x++) {
        const dx = x - C, dz = z - C, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
        if (r < 8.4 || r > RI || a > A0 || a < A1) continue;
        const k = Math.min(9, Math.floor((A0 - a) / (A0 - A1) * 10));
        w.box(x, k < 2 ? G + 1 : G + k, z, x, G + 1 + k, z, B.step);
      }
      // ── 등실 바닥(북서쪽 반)과 난간 ──
      const isDeck = (x, z) => rad(x, z) <= RI && (x - C) + (z - C) < -1;
      for (let z = C - 11; z <= C + 11; z++) for (let x = C - 11; x <= C + 11; x++) if (isDeck(x, z)) w.set(x, DF, z, B.deck);
      for (let z = C - 11; z <= C + 11; z++) for (let x = C - 11; x <= C + 11; x++) {
        if (!isDeck(x, z)) continue;
        const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => rad(x + a, z + b) <= RI && !isDeck(x + a, z + b));
        if (!edge || Math.hypot(x - 37.5, z - 24.4) < 3.5) continue;
        w.set(x, DF + 1, z, (x + z) % 3 ? B.iron : B.brass);
      }
      for (const [x, z] of [[C - 1, C - 1], [C - 5, C + 3], [C + 3, C - 5]]) if (rad(x, z) <= RI) w.box(x, G + 1, z, x, DF - 1, z, B.wood);

      // ── 회전 렌즈(부품)와 받침, 태엽 상자와 손잡이(부품) ──
      const LX = 28, LZ = 28;
      w.box(LX - 1, DF + 1, LZ - 1, LX + 1, DF + 2, LZ + 1, B.found);
      const lens = w.prop({ name: 'lens', pivot: [LX + 0.5, DF + 5, LZ + 0.5], axis: 'y', speed: 0.3 });
      for (let y = DF + 3; y <= DF + 7; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const r = Math.hypot(dx, dz); if (r > 2.3) continue;
        const ring = r > 1.4;
        if (y === DF + 3 || y === DF + 7) lens.set(LX + dx, y, LZ + dz, ring ? B.brass : B.iron);
        else if (ring) lens.set(LX + dx, y, LZ + dz, (Math.round(Math.atan2(dz, dx) * 2) % 2 === 0 && y === DF + 5) ? B.brass : B.lens);
        else lens.set(LX + dx, y, LZ + dz, B.flameL);
      }
      lights.push({ name: 'lamp', p: [LX + 0.5, DF + 5, LZ + 0.5], c: '#fff0b0', i: 1.1, d: 26, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '등불 점화', hint: '렌즈 속 심지에 불이 붙어 등실이 눈부시게 밝아지고 불빛이 바다로 뻗어요', hit: [LX - 2, DF + 1, LZ - 2, LX + 2, DF + 7, LZ + 2],
        run: async a => {
          a.flash('lamp', 4, 5); a.glow(1.6, 4.5);
          for (let k = 0; k < 12; k++) { const t = k * 0.52; a.burst([LX + 0.5 + Math.cos(t) * 3.5, DF + 5, LZ + 0.5 + Math.sin(t) * 3.5], { n: 10, colors: ['#fff6c8', '#ffe890', '#ffffff'], speed: 2.5, up: 0.4, life: 1, gravity: 0, spread: 0.4, flat: true }); await a.wait(0.3); }
        },
      });
      const KX = 34, KZ = 25;
      w.box(KX - 1, DF + 1, KZ, KX, DF + 2, KZ + 1, B.brass); w.box(KX - 1, DF + 3, KZ, KX, DF + 3, KZ + 1, B.wood);
      w.set(KX - 2, DF + 2, KZ, B.iron); w.set(KX - 3, DF + 2, KZ - 1, B.iron);
      const crank = w.prop({ name: 'crank', pivot: [KX + 1.5, DF + 2.5, KZ + 0.5] });
      crank.set(KX + 1, DF + 2, KZ, B.iron); crank.box(KX + 1, DF + 3, KZ, KX + 1, DF + 4, KZ, B.iron); crank.set(KX + 2, DF + 4, KZ, B.wood);
      acts.push({
        name: '렌즈 태엽 감기', hint: '태엽 손잡이를 돌려 감으면 커다란 렌즈가 빠르게 돌며 빛줄기를 흩뿌려요', hit: [KX - 1, DF + 1, KZ, KX + 2, DF + 4, KZ + 1],
        run: async a => {
          for (let k = 1; k <= 3; k++) await a.turn('crank', [Math.PI * 2 * k, 0, 0], 0.6);
          a.unwind && a.unwind('crank');
          a.spin('lens', 8, 4); a.flash('lamp', 2.5, 4);
          for (let k = 0; k < 8; k++) { a.burst([LX + 0.5, DF + 5, LZ + 0.5], { n: 14, colors: ['#fff6c8', '#ffe890'], speed: 4, up: 0.2, life: 0.8, gravity: 0, spread: 0.6, flat: true }); await a.wait(0.45); }
        },
      });

      // ── 망원경(부품, 서쪽 유리창을 향함)과 안개 종(부품) ──
      const TX = 24, TZ = 31;
      for (const [x, z] of [[TX, TZ], [TX + 1, TZ - 1], [TX + 1, TZ + 1]]) w.box(x, DF + 1, z, x, DF + 2, z, B.wood);
      const tel = w.prop({ name: 'telescope', pivot: [TX + 0.5, DF + 3.5, TZ + 0.5] });
      tel.box(TX - 2, DF + 3, TZ, TX + 2, DF + 3, TZ, B.brass); tel.set(TX - 2, DF + 3, TZ, B.iron); tel.set(TX + 2, DF + 3, TZ, B.wood);
      acts.push({
        name: '망원경으로 배 찾기', hint: '망원경이 수평선을 훑다가 돌아오는 고깃배의 돛을 찾아 반짝여요', hit: [TX - 2, DF + 1, TZ - 1, TX + 2, DF + 4, TZ + 1],
        run: async a => {
          await a.turn('telescope', [0, 1, 0.08], 1.2); await a.turn('telescope', [0, -1, 0.08], 1.8); await a.turn('telescope', [0, 0.2, 0.05], 0.9);
          for (let k = 0; k < 5; k++) { a.burst([TX - 8, DF + 4, TZ + 2], { n: 10, colors: ['#ffffff', '#fff6c8', '#d8f0ff'], speed: 1, up: 0.5, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.35); }
          await a.turn('telescope', [0, 0, 0], 0.8);
        },
      });
      const BX = 30, BZ = 23;
      w.box(BX + 1, DF + 1, BZ - 1, BX + 1, DF + 6, BZ - 1, B.wood); w.box(BX, DF + 6, BZ - 1, BX + 1, DF + 6, BZ - 1, B.wood); w.box(BX, DF + 6, BZ, BX, DF + 6, BZ, B.iron);
      const fbell = w.prop({ name: 'fbell', pivot: [BX + 0.5, DF + 5.5, BZ + 0.5], axis: 'x' });
      fbell.set(BX, DF + 5, BZ, B.iron); fbell.ellipsoid(BX, DF + 3.4, BZ, 1.1, 1.4, 1.1, B.bell, (dx, dy) => dy <= 1); fbell.set(BX, DF + 2, BZ, B.iron);
      acts.push({
        name: '안개 종 울리기', hint: '안개 종이 크게 흔들리며 뎅 뎅 울려 바다 멀리까지 소리가 퍼져요', hit: [BX - 1, DF + 1, BZ - 1, BX + 1, DF + 6, BZ + 1],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('fbell', [0.7, 0, 0], 0.4);
            a.burst([BX + 0.5, DF + 3.5, BZ + 0.5], { n: 22, colors: ['#ffffff', '#e8eef8', '#ffe9a0'], speed: 5, up: 0.3, life: 1.3, gravity: 0, spread: 1.6, flat: true });
            await a.turn('fbell', [-0.7, 0, 0], 0.4);
          }
          await a.turn('fbell', [0, 0, 0], 0.5);
        },
      });

      // ── 1층 동쪽: 기름 창고(통, 궤짝, 기름 깡통 부품) ──
      for (const [x, z, h] of [[38, 31, 2], [39, 32, 2], [38, 33, 1], [37, 30, 1], [39, 30, 1]]) w.box(x, G + 1, z, x, G + h, z, B.barrel);
      w.box(36, G + 1, 35, 37, G + 1, 36, B.crate); w.box(38, G + 1, 35, 38, G + 2, 35, B.crate); w.set(37, G + 1, 37, B.net); w.set(36, G + 1, 37, B.rope);
      const can = w.prop({ name: 'oilcan', pivot: [36.5, G + 2, 35.5] });
      can.box(36, G + 2, 35, 36, G + 3, 35, B.copper); can.set(36, G + 4, 35, B.brass); can.set(35, G + 3, 35, B.brass);
      w.box(34, G + 1, 35, 34, G + 1, 35, B.iron); w.set(34, G + 2, 35, B.brass);
      acts.push({
        name: '기름 붓기', hint: '기름 깡통이 기울며 황금빛 등불 기름이 깔때기로 쪼르륵 흘러들어요', hit: [34, G + 1, 35, 37, G + 4, 36],
        run: async a => {
          await a.turn('oilcan', [0, 0, 1.1], 0.8);
          for (let k = 0; k < 8; k++) { a.burst([34.6, G + 3, 35.5], { n: 10, colors: ['#e8b840', '#ffd070', '#c88a20'], speed: 0.4, up: -0.3, life: 0.7, gravity: 8, spread: 0.15 }); await a.wait(0.25); }
          await a.turn('oilcan', [0, 0, 0], 0.7);
        },
      });

      // ── 1층 서쪽·북쪽: 등대지기 일지 방(책상과 일지 부품, 항구 지도, 책장, 침대, 난로와 주전자 부품) ──
      const DXs = 26, DZs = 39;
      w.box(DXs, G + 1, DZs, DXs + 2, G + 1, DZs + 1, B.wood); w.box(DXs, G + 2, DZs, DXs + 2, G + 2, DZs + 1, B.plank);
      w.set(DXs + 1, G + 1, DZs - 2, B.wood); w.box(DXs + 1, G + 1, DZs - 3, DXs + 1, G + 3, DZs - 3, B.wood);
      w.set(DXs, G + 3, DZs + 1, B.lampG); w.set(DXs + 2, G + 3, DZs + 1, B.book2); w.set(DXs + 1, G + 3, DZs + 1, B.paper);
      w.box(23, G + 1, 31, 24, G + 1, 33, B.copper); w.box(23, G + 2, 31, 24, G + 2, 33, B.wood); w.set(24, G + 2, 32, B.brass); w.box(25, G + 1, 30, 25, G + 1, 31, B.rope);
      lights.push({ name: 'desk', p: [DXs + 0.5, G + 3.5, DZs + 1.5], c: '#ffd890', i: 0.6, d: 9, flicker: 0.1, srcR: 2 });
      const book = w.prop({ name: 'logbook', pivot: [DXs + 2, G + 3, DZs + 0.5] });
      book.box(DXs + 1, G + 3, DZs, DXs + 2, G + 3, DZs, B.book);
      acts.push({
        name: '항해 일지 펼치기', hint: '등대지기의 두꺼운 항해 일지가 펼쳐지며 지나간 배들의 이름이 적힌 책장이 팔랑팔랑 넘어가요', hit: [DXs, G + 1, DZs, DXs + 2, G + 4, DZs + 1],
        run: async a => {
          await a.tween('logbook', { off: [0, 1.6, 0], rot: [0, 0, -0.6] }, 0.7);
          for (let k = 0; k < 8; k++) { a.burst([DXs + 1.5, G + 5, DZs + 0.5], { n: 6, colors: ['#f4ecd8', '#ffffff', '#e0cc98'], speed: 1.4, up: 1.6, life: 1.4, gravity: 0.4, spread: 0.5, flat: true }); await a.wait(0.3); }
          await a.tween('logbook', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.7);
        },
      });
      for (let z = C - 4; z <= C + 3; z++) for (let y = G + 3; y <= G + 7; y++) { const x = Math.round(C - Math.sqrt(Math.max(0, 11.0 * 11.0 - (z - C) * (z - C)))); if (rad(x, z) > RI) w.set(x, y, z, (y === G + 3 || y === G + 7 || z === C - 4 || z === C + 3) ? B.wood : ((x * 3 + y * 5 + z * 7) % 4 ? B.mapB : B.mapS)); }
      for (let a = 0; a < 26; a++) {
        const t = -2.15 + a * 0.03, x = Math.round(C + Math.cos(t) * 9.8), z = Math.round(C + Math.sin(t) * 9.8);
        if (rad(x, z) > RI) continue;
        for (let y = G + 1; y <= G + 4; y++) w.set(x, y, z, y === G + 1 || y === G + 4 ? B.wood : ((x + y + z) % 3 ? B.book : B.book2));
      }
      w.box(29, G + 1, 23, 33, G + 1, 24, B.wood); w.box(30, G + 2, 23, 33, G + 2, 24, B.quilt); w.box(29, G + 2, 23, 29, G + 2, 24, B.bed); w.box(29, G + 1, 23, 29, G + 3, 23, B.wood);
      const SX = 23, SZ = 36;
      w.box(SX, G + 1, SZ - 1, SX + 1, G + 2, SZ, B.iron); w.set(SX + 1, G + 1, SZ, B.ember); w.box(SX, G + 3, SZ - 1, SX, DF - 2, SZ - 1, B.iron);
      lights.push({ name: 'stove', p: [SX + 1.5, G + 1.5, SZ + 0.5], c: '#ff9a4a', i: 0.7, d: 9, flicker: 0.25, srcR: 2 });
      const ket = w.prop({ name: 'kettle', pivot: [SX + 1.5, G + 3, SZ + 0.5] });
      ket.set(SX + 1, G + 3, SZ, B.copper); ket.set(SX + 1, G + 4, SZ, B.iron); ket.set(SX + 2, G + 3, SZ, B.copper);
      acts.push({
        name: '주전자 끓이기', hint: '무쇠 난로 위 주전자가 들썩이며 하얀 김을 뿜어요', hit: [SX, G + 1, SZ - 1, SX + 2, G + 4, SZ],
        run: async a => {
          for (let k = 0; k < 4; k++) { await a.move('kettle', [0, 1.7, 0], 0.18); a.burst([SX + 2.5, G + 4.5, SZ + 0.5], { n: 16, colors: ['#ffffff', '#e8e8e8', '#d8d8d8'], speed: 1, up: 3, life: 1.8, gravity: -0.6, spread: 0.6 }); await a.move('kettle', [0, 0, 0], 0.22); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '곶의 등대', note: '렌즈와 나선 계단', p: [C, TOP + 5, C] });
      return { lights, landmarks, acts };
    },
  });
})();
