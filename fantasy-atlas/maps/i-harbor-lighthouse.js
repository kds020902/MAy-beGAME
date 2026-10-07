// 곶의 등대(하위 지도, 2배 해상도) — 갈매기 항구 곶 끝 빨강·흰 줄무늬 등대의 단면. 1층 기름 창고와 등대지기 일지 방(책상·침대·난로),
// 벽에 박힌 돌계단이 나선으로 돌아 북서쪽 반을 덮은 등실(회전 렌즈·태엽 상자·망원경·안개 종)로 오른다.
// 남동쪽 벽은 잘라 낮췄다 (마을). 세부: 쇠테 두른 통, 테 있는 궤짝, 다리·머리판 있는 침대, 쇠살 등롱, 동자와 손잡이 난간
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 88, G = 20, C = 64;
  const RI = 20.8, RO = 24;                            // 안쪽 바닥 반지름 · 벽 바깥 반지름
  const DF = G + 20, TOP = G + 36;                     // 등실 바닥 · 벽 꼭대기
  MAPS.push({
    id: 'harbor-lighthouse', cat: 'village', sub: true, parent: 'harbor', name: '곶의 등대', en: 'Gull Harbor · Cape Lighthouse', color: '#d04a3a', seed: 1132, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    spawn: [65, G + 1, 76],
    desc: '항구 곶 끝에 선 빨강·흰 줄무늬 등대 속. 1층에는 등불 기름통과 등대지기의 일지 책상, 좁은 침대와 무쇠 난로가 있고, 벽에 박힌 돌계단을 나선으로 돌아 오르면 꼭대기 등실에서 커다란 렌즈가 태엽 힘으로 천천히 돈다. 안개 낀 날에는 종을 울려 배들을 부른다.',
    info: { title: '장소 정보', en: 'CAPE LIGHTHOUSE', rows: [['1층', '기름 창고 · 등대지기 일지 방'], ['꼭대기', '회전 렌즈 · 태엽 상자 · 망원경 · 안개 종'], ['소문', '밤마다 등대지기가 바다를 향해 노래한다']] },
    sky: ['#ffd8b0', '#5a6aa8', '#ffe8c0'], stars: false,
    hemi: ['#fff0e0', '#3a4a6a', 0.62], sun: ['#ffe0c0', 0.66, [-0.4, 1, -0.5]],
    night: { sky: ['#1e2a48', '#060a18', '#d8a060'], stars: true, hemi: ['#a8b8d8', '#101420', 0.42], sun: ['#c8d4ff', 0.26, [-0.4, 1, -0.5]], haze: '#1a2234' },
    liquid: ['#1f5a80', '#3a86b0', '#eaf8ff'], liqSpeed: 0.9,
    fog: { start: 0.82, floor: G - 24, depth: 12, haze: [16, 0.12, 12], hazeColor: '#e8d8c8' },
    camY: 2, zoom: 1.35,
    particles: [
      { n: 100, colors: ['#fff6d8', '#ffffff'], mode: 'drift', speed: 0.16, wind: 0.1, area: [C, C, 18], y0: G + 2, y1: G + 34, glow: true },
      { n: 40, colors: ['#fff0b0', '#ffe890'], mode: 'wisp', speed: 1.2, size: 2, area: [57.5, 57.5, 6], y0: DF + 4, y1: DF + 16, glow: true },
    ],
    blocks: {
      grass: { c: '#7a5a3a', top: '#7aa84a', v: 0.08 }, grass2: { c: '#7a5a3a', top: '#8ab85a', v: 0.08 }, dirt: { c: '#7a5a3a', v: 0.08 },
      rock: { c: '#6e6e78', v: 0.06, pat: 'stone' }, cliff: { c: '#7e7a78', v: 0.06, pat: 'big' }, sand: { c: '#c8b080', top: '#ecd8a4', v: 0.05 },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cobble2: { c: '#7e7a72', top: '#9a968c', v: 0.06 }, cobbleJ: { c: '#6a665e', top: '#76726a', v: 0.04 },
      found: { c: '#8a8680', v: 0.05, pat: 'stone' }, rockDk: { c: '#4e4e58', v: 0.06, pat: 'stone' }, sill: { c: '#b8b2a6', v: 0.04 },
      stripeR: { c: '#d04a3a', v: 0.03 }, stripeW: { c: '#f4f0e8', v: 0.02 }, wallI: { c: '#ece6d8', v: 0.03 },
      flag: { c: '#9a968c', top: '#b4b0a6', v: 0.04 }, flagJ: { c: '#76726a', top: '#86827a', v: 0.03 }, step: { c: '#a8a49a', top: '#c0bcb2', v: 0.04 }, stepE: { c: '#8a867e', top: '#9a968c', v: 0.03 },
      deck: { c: '#8a6440', top: '#a87a4c', v: 0.05, pat: 'plank' }, joist: { c: '#5a4030', v: 0.04 },
      plank: { c: '#9a6a40', v: 0.06, pat: 'plank' }, wood: { c: '#5a4030', v: 0.05 }, iron: { c: '#3a3a42', v: 0.03 }, ironDk: { c: '#2a2a30', v: 0.03 }, brass: { c: '#c8a048', v: 0.04 }, copper: { c: '#b8683a', v: 0.04 },
      glass: { c: '#c8e4f0', v: 0.02 }, lens: { c: '#ffe890', night: true, day: '#c8e0ec' }, flameL: { c: '#fff4c0', glow: true }, ember: { c: '#ff7a2a', glow: true }, lampG: { c: '#ffe0a0', glow: true },
      win: { c: '#ffd890', night: true, day: '#bfe0f4' }, door: { c: '#3a5a7a', v: 0.03, pat: 'plank' }, doorDk: { c: '#2a4258', v: 0.03 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      crate: { c: '#a07a4a', v: 0.05, pat: 'plank' }, crateEdge: { c: '#6e5030', v: 0.04 }, rope: { c: '#c8b890', v: 0.04 }, net: { c: '#8a8a70', v: 0.1 },
      bed: { c: '#f0e8d8', v: 0.02 }, quilt: { c: '#3a6a9a', v: 0.04, pat: 'check', alt: '#e8e0d0' }, rug: { c: '#a84a3a', top: '#b85a44', v: 0.05, pat: 'check', alt: '#d8c8a0' }, rugE: { c: '#d8c8a0', top: '#e0d0a8', v: 0.03 },
      book: { c: '#7a2a2a', v: 0.04 }, book2: { c: '#2a4a6a', v: 0.04 }, book3: { c: '#3a6a3a', v: 0.04 }, paper: { c: '#f4ecd8', v: 0.02 }, mapB: { c: '#5a8ab0', v: 0.04 }, mapS: { c: '#e0cc98', v: 0.04 }, bell: { c: '#c8a050', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      const rad = (x, z) => Math.hypot(x - C, z - C);
      const barrel = (x, y, z, ht, r) => {
        const R = Math.ceil(r);
        for (let k = 0; k < ht; k++) {
          const rr = k >= 1 && k <= ht - 2 ? r : r - 0.4;
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            w.set(x + dx, y + k, z + dz, k === ht - 1 ? (outer ? B.cask : B.caskTop) : ((k === 1 || k === ht - 2) && outer) ? B.iron : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2));
          }
        }
      };
      const crate = (x, y, z, s) => { for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) { const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1); w.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate); } };
      // ── 바깥: 곶의 풀밭과 바위, 둘레 바다 ──
      MH.terrain(w, {
        floor: G - 24,
        height: (x, z) => { const r = rad(x, z) / 2, n = w.noise.fbm(x * 0.06, z * 0.06, 2); return r < 15 ? G - 1 : r < 21 ? G - 1 - (r - 15) * 1.8 + n * 3 : G - 16 + n * 6; },
        surface: (x, z, y) => y >= G - 1 ? (hash3(x >> 1, 1, z >> 1) > 0.5 ? B.grass2 : B.grass) : y >= G - 10 ? B.cliff : B.sand,
        under: (x, z, y, dep) => dep < 4 && y >= G - 4 ? B.dirt : B.cliff,
      });
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (w.hm[x + W * z] < G - 10) w.liquid(x, z, G - 10);
      for (let z = C + 24; z <= C + 35; z++) for (let x = C - 2; x <= C + 5; x++) w.set(x, G - 1, z, (z % 3 === 2 || (x + ((z / 3 | 0) & 1) * 2) % 4 === 3) ? B.cobbleJ : (hash3(x >> 2, z / 3 | 0, 2) > 0.5 ? B.cobble : B.cobble2));
      for (let a = 0; a < 168; a++) {
        const t = a / 168 * Math.PI * 2, x = Math.round(C + Math.cos(t) * 26.4), z = Math.round(C + Math.sin(t) * 26.4);
        if (Math.abs(x - C - 1.5) <= 4 && z > C) continue;
        w.set(x, G, z, (a >> 2) % 3 ? B.found : B.rockDk); if ((a >> 1) % 2) w.set(x, G + 1, z, B.sill);
      }

      // ── 바닥과 원통 벽: 북서쪽 반은 꼭대기 등실까지, 남동쪽 반은 낮게 ──
      for (let z = C - 25; z <= C + 25; z++) for (let x = C - 25; x <= C + 25; x++) {
        const dx = x - C, dz = z - C, r = Math.hypot(dx, dz);
        if (r > RO) continue;
        const sec = Math.floor((Math.atan2(dz, dx) + Math.PI) * 8 / Math.PI), ring = Math.floor(r / 6);
        w.set(x, G, z, r <= 6.4 ? (r > 5.4 ? B.rugE : B.rug) : (r > RI ? B.found : (Math.abs(r - ring * 6) < 0.5 ? B.flagJ : ((sec + ring) % 2 ? B.flag : B.step))));
        if (r <= RI) continue;
        const s = (dx + dz) / (r * Math.SQRT2);
        const top = s < 0.05 ? TOP : s < 0.4 ? Math.round(TOP - (s - 0.05) / 0.35 * (TOP - G - 6)) : G + 4;
        const outer = r > 22.2;
        for (let y = G + 1; y <= top; y++) {
          let b = outer ? (Math.floor((y - G - 1) / 10) % 2 ? B.stripeR : B.stripeW) : (y <= G + 2 ? B.found : B.wallI);
          if (y > DF && y < TOP - 2 && s < 0.2) b = (Math.round(Math.atan2(dz, dx) * 12) % 3 === 0 || y <= DF + 2 || y === DF + 9) ? B.iron : B.glass;
          if (y >= TOP - 3 && y <= TOP - 2 && s < 0.2) b = B.iron;
          if (y >= TOP - 1) b = B.stripeR;
          if (y >= top - 1 && top <= G + 6) b = B.sill;
          w.set(x, y, z, b);
        }
      }
      // 아래층 작은 창(북서쪽 벽): 창살과 창턱
      for (const t of [-2.3, -1.6, -0.95]) {
        const ax = Math.cos(t), az = Math.sin(t), along = Math.abs(ax) > 0.7;
        for (let y = G + 7; y <= G + 13; y++) for (let k = -2; k <= 1; k++) {
          const x = Math.round(C + ax * 21.8) + (along ? 0 : k), z = Math.round(C + az * 21.8) + (along ? k : 0);
          for (let q = -2; q <= 2; q++) { const xx = x + (along ? q : 0), zz = z + (along ? 0 : q); if (rad(xx, zz) > RI) w.set(xx, y, zz, y === G + 7 || y === G + 13 ? B.sill : (k === -1 && y !== G + 10) || y === G + 10 ? B.wood : B.win); }
        }
      }
      lights.push({ name: 'sunW', p: [C - 12, G + 10, C - 12], c: '#fff4d8', i: 0.5, d: 28, srcR: 8 });

      // ── 남쪽 문: 돌 문틀, 상인방, 벽 등롱 ──
      for (let z = C + 19; z <= C + 25; z++) {
        for (let x = C; x <= C + 3; x++) if (rad(x, z) > RI) w.box(x, G + 1, z, x, G + 9, z, 0);
        for (const x of [C - 2, C - 1, C + 4, C + 5]) if (rad(x, z) > 22 && rad(x, z) <= RO) w.box(x, G + 1, z, x, G + 11, z, B.found);
      }
      for (let x = C - 2; x <= C + 5; x++) for (let z = C + 19; z <= C + 25; z++) if (rad(x, z) > 22 && rad(x, z) <= RO) { w.set(x, G + 10, z, B.found); w.set(x, G + 11, z, B.sill); }
      w.box(C + 6, G + 9, C + 25, C + 6, G + 9, C + 26, B.iron); w.box(C + 6, G + 6, C + 26, C + 6, G + 8, C + 26, B.lampG); w.set(C + 6, G + 5, C + 26, B.iron);
      lights.push({ name: 'doorLamp', p: [C + 6.5, G + 7, C + 26.5], c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [C + 1, G + 1, C + 19], h: 9, hit: [C, G + 1, C + 18, C + 3, G + 9, C + 22], name: '밖으로 나가기', goto: 'harbor', hint: '등대 문을 나서 바닷바람 부는 곶으로 나가요' }));

      // ── 벽에 박힌 나선 돌계단: 남동쪽 문 옆에서 시작해 동쪽을 돌아 북서쪽 등실로(한 단 1칸) ──
      const A0 = 1.25, A1 = -0.95;
      for (let z = C - 22; z <= C + 22; z++) for (let x = C - 22; x <= C + 22; x++) {
        const dx = x - C, dz = z - C, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
        if (r < 16.8 || r > RI || a > A0 || a < A1) continue;
        const f = (A0 - a) / (A0 - A1) * 20, k = Math.min(19, Math.floor(f));
        w.box(x, k < 2 ? G + 1 : G + k, z, x, G + 1 + k, z, f - k < 0.12 && k > 0 ? B.stepE : B.step);
      }
      // ── 등실 바닥(북서쪽 반): 마루와 장선, 동자 난간 ──
      const isDeck = (x, z) => rad(x, z) <= RI && (x - C) + (z - C) < -2;
      for (let z = C - 22; z <= C + 22; z++) for (let x = C - 22; x <= C + 22; x++) if (isDeck(x, z)) { w.set(x, DF, z, B.deck); if ((x - z) % 6 === 0) w.set(x, DF - 1, z, B.joist); }
      for (let z = C - 22; z <= C + 22; z++) for (let x = C - 22; x <= C + 22; x++) {
        if (!isDeck(x, z)) continue;
        const edge = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => rad(x + a, z + b) <= RI && !isDeck(x + a, z + b));
        if (!edge || Math.hypot(x - 75, z - 48.8) < 7) continue;
        w.set(x, DF + 4, z, B.wood);
        if ((x + z) % 3 === 0) w.box(x, DF + 1, z, x, DF + 3, z, (x + z) % 9 === 0 ? B.brass : B.iron);
      }
      for (const [x, z] of [[C - 2, C - 2], [C - 10, C + 6], [C + 6, C - 10]]) if (rad(x, z) <= RI) w.box(x, G + 1, z, x + 1, DF - 1, z + 1, B.wood);

      // ── 회전 렌즈(부품)와 받침, 태엽 상자와 손잡이(부품) ──
      const LX = 57, LZ = 57;
      w.box(LX - 3, DF + 1, LZ - 3, LX + 3, DF + 2, LZ + 3, B.found); w.box(LX - 2, DF + 3, LZ - 2, LX + 2, DF + 4, LZ + 2, B.iron);
      const lens = w.prop({ name: 'lens', pivot: [LX + 0.5, DF + 10, LZ + 0.5], axis: 'y', speed: 0.3 });
      for (let y = DF + 5; y <= DF + 15; y++) for (let dz = -5; dz <= 5; dz++) for (let dx = -5; dx <= 5; dx++) {
        const r = Math.hypot(dx, dz), Rr = y === DF + 5 || y === DF + 15 ? 3.6 : 4.6; if (r > Rr) continue;
        const ring = r > 2.8;
        if (y === DF + 5 || y === DF + 15) lens.set(LX + dx, y, LZ + dz, ring ? B.brass : B.iron);
        else if (ring) lens.set(LX + dx, y, LZ + dz, ((Math.round(Math.atan2(dz, dx) * 4) % 2 === 0 && (y === DF + 10 || y === DF + 9)) || y === DF + 7 || y === DF + 13) ? B.brass : B.lens);
        else lens.set(LX + dx, y, LZ + dz, B.flameL);
      }
      lens.box(LX, DF + 16, LZ, LX, DF + 17, LZ, B.iron);
      lights.push({ name: 'lamp', p: [LX + 0.5, DF + 10, LZ + 0.5], c: '#fff0b0', i: 1.1, d: 52, flicker: 0.05, srcR: 4 });
      acts.push({
        name: '등불 점화', hint: '렌즈 속 심지에 불이 붙어 등실이 눈부시게 밝아지고 불빛이 바다로 뻗어요', hit: [LX - 5, DF + 1, LZ - 5, LX + 5, DF + 15, LZ + 5],
        run: async a => {
          a.flash('lamp', 4, 5); a.glow(1.6, 4.5);
          for (let k = 0; k < 12; k++) { const t = k * 0.52; a.burst([LX + 0.5 + Math.cos(t) * 7, DF + 10, LZ + 0.5 + Math.sin(t) * 7], { n: 10, colors: ['#fff6c8', '#ffe890', '#ffffff'], speed: 5, up: 0.8, life: 1, gravity: 0, spread: 0.8, flat: true }); await a.wait(0.3); }
        },
      });
      const KX = 66, KZ = 50;
      w.box(KX, DF + 1, KZ, KX + 3, DF + 4, KZ + 3, B.brass); w.box(KX, DF + 5, KZ, KX + 3, DF + 6, KZ + 3, B.wood);
      w.box(KX + 4, DF + 3, KZ, KX + 4, DF + 4, KZ + 1, B.iron); w.box(KX + 1, DF + 1, KZ - 2, KX + 2, DF + 3, KZ - 1, B.iron);
      const crank = w.prop({ name: 'crank', pivot: [KX - 1, DF + 5, KZ + 2] });
      crank.box(KX - 2, DF + 4, KZ + 1, KX - 1, DF + 5, KZ + 2, B.iron); crank.box(KX - 2, DF + 6, KZ + 1, KX - 2, DF + 8, KZ + 2, B.iron); crank.box(KX - 4, DF + 8, KZ + 1, KX - 3, DF + 9, KZ + 2, B.wood);
      acts.push({
        name: '렌즈 태엽 감기', hint: '태엽 손잡이를 돌려 감으면 커다란 렌즈가 빠르게 돌며 빛줄기를 흩뿌려요', hit: [KX - 4, DF + 1, KZ, KX + 4, DF + 9, KZ + 3],
        run: async a => {
          for (let k = 1; k <= 3; k++) await a.turn('crank', [Math.PI * 2 * k, 0, 0], 0.6);
          a.unwind && a.unwind('crank');
          a.spin('lens', 8, 4); a.flash('lamp', 2.5, 4);
          for (let k = 0; k < 8; k++) { a.burst([LX + 0.5, DF + 10, LZ + 0.5], { n: 14, colors: ['#fff6c8', '#ffe890'], speed: 8, up: 0.4, life: 0.8, gravity: 0, spread: 1.2, flat: true }); await a.wait(0.45); }
        },
      });

      // ── 망원경(부품, 서쪽 유리창을 향함, 세발 받침)과 안개 종(부품) ──
      const TX = 48, TZ = 62;
      for (const [x, z] of [[TX - 1, TZ], [TX + 2, TZ - 2], [TX + 2, TZ + 3]]) w.line(x, DF + 1, z, TX + 1, DF + 5, TZ + 0.5, B.wood);
      w.box(TX, DF + 5, TZ, TX + 1, DF + 5, TZ + 1, B.brass);
      const tel = w.prop({ name: 'telescope', pivot: [TX + 1, DF + 7, TZ + 1] });
      tel.box(TX - 3, DF + 6, TZ, TX + 5, DF + 7, TZ + 1, B.brass); tel.box(TX - 4, DF + 6, TZ, TX - 4, DF + 7, TZ + 1, B.iron);
      tel.box(TX + 6, DF + 6, TZ, TX + 7, DF + 7, TZ + 1, B.wood); tel.box(TX + 1, DF + 8, TZ, TX + 1, DF + 8, TZ + 1, B.iron);
      acts.push({
        name: '망원경으로 배 찾기', hint: '망원경이 수평선을 훑다가 돌아오는 고깃배의 돛을 찾아 반짝여요', hit: [TX - 4, DF + 1, TZ - 2, TX + 7, DF + 8, TZ + 3],
        run: async a => {
          await a.turn('telescope', [0, 1, 0.08], 1.2); await a.turn('telescope', [0, -1, 0.08], 1.8); await a.turn('telescope', [0, 0.2, 0.05], 0.9);
          for (let k = 0; k < 5; k++) { a.burst([TX - 16, DF + 8, TZ + 4], { n: 10, colors: ['#ffffff', '#fff6c8', '#d8f0ff'], speed: 2, up: 1, life: 1, gravity: 0, spread: 1.2 }); await a.wait(0.35); }
          await a.turn('telescope', [0, 0, 0], 0.8);
        },
      });
      const BX = 60, BZ = 48;
      w.box(BX + 3, DF + 1, BZ - 2, BX + 4, DF + 12, BZ - 1, B.wood); w.box(BX - 1, DF + 12, BZ - 2, BX + 4, DF + 13, BZ - 1, B.wood); w.box(BX, DF + 11, BZ - 1, BX, DF + 11, BZ, B.iron);
      w.line(BX + 3, DF + 8, BZ - 2, BX, DF + 12, BZ - 2, B.wood);
      const fbell = w.prop({ name: 'fbell', pivot: [BX + 0.5, DF + 11.5, BZ + 0.5], axis: 'x' });
      fbell.set(BX, DF + 10, BZ, B.iron); fbell.ellipsoid(BX, DF + 7, BZ, 2.4, 2.8, 2.4, B.bell, (dx, dy, dz, d) => dy <= 1 || d > 0.5);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) for (let dy = -2; dy <= 0; dy++) fbell.set(BX + dx, DF + 7 + dy, BZ + dz, 0);
      fbell.box(BX, DF + 4, BZ, BX, DF + 6, BZ, B.iron);
      acts.push({
        name: '안개 종 울리기', hint: '안개 종이 크게 흔들리며 뎅 뎅 울려 바다 멀리까지 소리가 퍼져요', hit: [BX - 3, DF + 1, BZ - 2, BX + 4, DF + 13, BZ + 3],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('fbell', [0.7, 0, 0], 0.4);
            a.burst([BX + 0.5, DF + 7, BZ + 0.5], { n: 22, colors: ['#ffffff', '#e8eef8', '#ffe9a0'], speed: 10, up: 0.6, life: 1.3, gravity: 0, spread: 3.2, flat: true });
            await a.turn('fbell', [-0.7, 0, 0], 0.4);
          }
          await a.turn('fbell', [0, 0, 0], 0.5);
        },
      });

      // ── 1층 동쪽: 기름 창고(쇠테 두른 통, 테 있는 궤짝, 그물과 밧줄, 기름 깡통 부품과 깔때기) ──
      for (const [x, z, st] of [[74, 58, 2], [78, 62, 2], [73, 64, 1], [77, 67, 1]]) for (let q = 0; q < st; q++) barrel(x, G + 1 + q * 6, z, 6, 1.8);
      crate(72, G + 1, 70, 4); crate(76, G + 1, 70, 4); crate(76, G + 5, 70, 3);
      w.box(73, G + 1, 75, 76, G + 1, 77, B.net); w.box(74, G + 2, 76, 75, G + 2, 76, B.net);
      for (let k = 0; k < 2; k++) w.ring(70, 76, G + 1 + k, 0.8, 2.2 - k * 0.5, B.rope);
      const can = w.prop({ name: 'oilcan', pivot: [73, G + 5, 71] });
      can.box(72, G + 5, 70, 73, G + 7, 71, B.copper); can.box(72, G + 8, 70, 72, G + 8, 70, B.brass); can.box(71, G + 6, 70, 71, G + 7, 70, B.brass); can.set(74, G + 7, 70, B.iron);
      w.box(68, G + 1, 70, 69, G + 2, 71, B.iron); w.box(67, G + 3, 69, 70, G + 3, 72, B.brass); w.box(68, G + 4, 70, 69, G + 4, 71, B.brass);
      acts.push({
        name: '기름 붓기', hint: '기름 깡통이 기울며 황금빛 등불 기름이 깔때기로 쪼르륵 흘러들어요', hit: [67, G + 1, 69, 75, G + 8, 73],
        run: async a => {
          await a.turn('oilcan', [0, 0, 1.1], 0.8);
          for (let k = 0; k < 8; k++) { a.burst([69.2, G + 6, 71], { n: 10, colors: ['#e8b840', '#ffd070', '#c88a20'], speed: 0.8, up: -0.6, life: 0.7, gravity: 16, spread: 0.3 }); await a.wait(0.25); }
          await a.turn('oilcan', [0, 0, 0], 0.7);
        },
      });

      // ── 1층 서쪽·북쪽: 등대지기 일지 방(책상과 일지 부품, 항구 지도, 책장, 침대, 난로와 주전자 부품) ──
      const DXs = 52, DZs = 76;
      for (const [x, z] of [[DXs, DZs], [DXs + 5, DZs], [DXs, DZs + 3], [DXs + 5, DZs + 3]]) w.box(x, G + 1, z, x, G + 3, z, B.wood);
      w.box(DXs, G + 4, DZs, DXs + 5, G + 4, DZs + 3, B.plank); w.box(DXs + 1, G + 2, DZs + 3, DXs + 4, G + 3, DZs + 3, B.wood);
      for (const [x, z] of [[DXs + 2, DZs - 3], [DXs + 3, DZs - 3], [DXs + 2, DZs - 2], [DXs + 3, DZs - 2]]) w.box(x, G + 1, z, x, G + 2, z, B.wood);
      w.box(DXs + 2, G + 3, DZs - 3, DXs + 3, G + 3, DZs - 2, B.plank); w.box(DXs + 2, G + 4, DZs - 4, DXs + 3, G + 7, DZs - 4, B.wood);
      w.box(DXs, G + 5, DZs + 3, DXs, G + 6, DZs + 3, B.lampG); w.box(DXs + 4, G + 5, DZs + 2, DXs + 5, G + 6, DZs + 3, B.book2); w.box(DXs + 1, G + 5, DZs + 2, DXs + 2, G + 5, DZs + 3, B.paper);
      lights.push({ name: 'desk', p: [DXs + 0.5, G + 7, DZs + 3.5], c: '#ffd890', i: 0.6, d: 18, flicker: 0.1, srcR: 3 });
      const book = w.prop({ name: 'logbook', pivot: [DXs + 4, G + 5, DZs + 0.5] });
      book.box(DXs + 1, G + 5, DZs, DXs + 4, G + 5, DZs + 1, B.book); book.box(DXs + 2, G + 5, DZs, DXs + 3, G + 5, DZs, B.paper);
      acts.push({
        name: '항해 일지 펼치기', hint: '등대지기의 두꺼운 항해 일지가 펼쳐지며 지나간 배들의 이름이 적힌 책장이 팔랑팔랑 넘어가요', hit: [DXs, G + 1, DZs, DXs + 5, G + 7, DZs + 3],
        run: async a => {
          await a.tween('logbook', { off: [0, 3.2, 0], rot: [0, 0, -0.6] }, 0.7);
          for (let k = 0; k < 8; k++) { a.burst([DXs + 3, G + 10, DZs + 1], { n: 6, colors: ['#f4ecd8', '#ffffff', '#e0cc98'], speed: 2.8, up: 3.2, life: 1.4, gravity: 0.8, spread: 1, flat: true }); await a.wait(0.3); }
          await a.tween('logbook', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.7);
        },
      });
      // 바다 지도(서쪽 벽): 나무 테 안에 바다와 뭍
      for (let z = C - 8; z <= C + 7; z++) for (let y = G + 5; y <= G + 14; y++) {
        const x = Math.round(C - Math.sqrt(Math.max(0, 22 * 22 - (z - C) * (z - C))));
        if (rad(x, z) <= RI) continue;
        const edge = y === G + 5 || y === G + 14 || z === C - 8 || z === C + 7;
        const land = Math.sin(z * 0.5) * 2 + Math.cos(y * 0.7) * 1.5 + (z - C) * 0.3 > 1.2;
        w.set(x, y, z, edge ? B.wood : land ? B.mapS : B.mapB);
      }
      // 책장(북서쪽 벽을 따라 둥글게): 칸마다 다른 색 책
      for (let a = 0; a < 52; a++) {
        const t = -2.15 + a * 0.015;
        for (const rr of [19.4, 20.2]) {
          const x = Math.round(C + Math.cos(t) * rr), z = Math.round(C + Math.sin(t) * rr);
          if (rad(x, z) > RI) continue;
          for (let y = G + 1; y <= G + 9; y++) w.set(x, y, z, y === G + 1 || y === G + 5 || y === G + 9 ? B.wood : rr > 20 ? B.wood : [B.book, B.book2, B.book3][(a + y) % 3]);
        }
      }
      // 침대: 다리, 머리판·발판, 요와 누비이불, 베개
      for (const [x, z] of [[58, 46], [67, 46], [58, 49], [67, 49]]) w.box(x, G + 1, z, x, G + 2, z, B.wood);
      w.box(58, G + 3, 46, 67, G + 3, 49, B.wood); w.box(59, G + 4, 46, 67, G + 4, 49, B.bed); w.box(61, G + 5, 46, 67, G + 5, 49, B.quilt); w.box(59, G + 5, 47, 60, G + 5, 48, B.bed);
      w.box(58, G + 3, 46, 58, G + 7, 49, B.wood); w.box(67, G + 3, 46, 67, G + 5, 49, B.wood);
      // 궤짝(쇠테·놋 자물쇠)과 밧줄
      w.box(46, G + 1, 62, 49, G + 4, 67, B.wood); for (const z of [63, 66]) w.box(46, G + 1, z, 49, G + 4, z, B.iron); w.box(46, G + 5, 62, 49, G + 5, 67, B.plank); w.set(49, G + 3, 64, B.brass);
      for (let k = 0; k < 2; k++) w.ring(52, 60, G + 1 + k, 0.8, 2.2 - k * 0.5, B.rope);
      // 무쇠 난로: 불 창, 연통, 주전자(부품)
      const SX = 46, SZ = 72;
      w.box(SX, G + 1, SZ - 2, SX + 3, G + 4, SZ + 1, B.iron); w.box(SX - 1, G + 5, SZ - 3, SX + 4, G + 5, SZ + 2, B.ironDk);
      w.box(SX + 3, G + 1, SZ - 1, SX + 3, G + 2, SZ, B.ember); w.box(SX, G + 6, SZ - 2, SX + 1, DF - 3, SZ - 1, B.iron);
      for (let y = G + 10; y < DF - 3; y += 6) w.box(SX - 1, y, SZ - 3, SX + 2, y, SZ, B.ironDk);
      lights.push({ name: 'stove', p: [SX + 3.5, G + 3, SZ + 0.5], c: '#ff9a4a', i: 0.7, d: 18, flicker: 0.25, srcR: 3 });
      const ket = w.prop({ name: 'kettle', pivot: [SX + 3, G + 6, SZ + 1] });
      ket.box(SX + 2, G + 6, SZ, SX + 3, G + 7, SZ + 1, B.copper); ket.box(SX + 2, G + 8, SZ, SX + 3, G + 8, SZ + 1, B.iron); ket.box(SX + 4, G + 7, SZ, SX + 4, G + 7, SZ + 1, B.copper); ket.set(SX + 2, G + 9, SZ, B.iron);
      acts.push({
        name: '주전자 끓이기', hint: '무쇠 난로 위 주전자가 들썩이며 하얀 김을 뿜어요', hit: [SX, G + 1, SZ - 2, SX + 4, G + 9, SZ + 1],
        run: async a => {
          for (let k = 0; k < 4; k++) { await a.move('kettle', [0, 3.4, 0], 0.18); a.burst([SX + 5, G + 9, SZ + 1], { n: 16, colors: ['#ffffff', '#e8e8e8', '#d8d8d8'], speed: 2, up: 6, life: 1.8, gravity: -1.2, spread: 1.2 }); await a.move('kettle', [0, 0, 0], 0.22); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '곶의 등대', note: '렌즈와 나선 계단', p: [C, TOP + 10, C] });
      return { lights, landmarks, acts };
    },
  });
})();
