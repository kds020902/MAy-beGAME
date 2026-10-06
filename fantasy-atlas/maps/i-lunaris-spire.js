// 달의 첨탑 안(하위 지도) — 월광 첨탑 가운데 섬의 흰 첨탑 속. 둥근 1층 달빛 홀과 가운데 달빛 우물, 벽을 감아 오르는 계단,
// 북쪽 반원 중이층(초승달 방)의 초승달 축과 은 거울, 별가루 그릇, 중이층 아래 달 기록 서가. 남동쪽 벽은 잘라 낮췄다 (64칸)
(function () {
  'use strict';
  const W = 64, D = 64, Hh = 64, G = 12;
  MAPS.push({
    id: 'lunaris-spire', cat: 'magic', sub: true, parent: 'lunaris', name: '달의 첨탑 안', en: 'Lunaris · Inside the Moon Spire', color: '#bff0ff', seed: 3531, base: G, time: 'night', size: [W, D, Hh],
    desc: '달빛을 모으는 흰 첨탑의 속. 둥근 홀 가운데 달빛 우물이 은은히 빛나고, 벽을 감아 오르는 계단 끝 초승달 방에서는 꼭대기 초승달과 이어진 축이 천천히 돈다. 은 거울은 달빛을 우물로 되돌려 보낸다.',
    info: { title: '장소 정보', en: 'MOON SPIRE', rows: [['쓰임', '월광 사제단의 달빛 홀'], ['1층', '달빛 우물 · 달 기록 서가'], ['위층', '초승달 방 · 은 거울 · 별가루 그릇'], ['주의', '우물물은 마시지 말 것']] },
    sky: ['#14304a', '#04080e', '#9adcf0'], stars: true,
    hemi: ['#a8c8e0', '#0a1420', 0.4], sun: ['#c8e0ff', 0.3, [0.45, 1, 0.5]],
    day: { sky: ['#c8e4f0', '#5a8ab0', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.58], sun: ['#fff8ec', 0.7, [0.45, 1, 0.5]] },
    liquid: ['#2a6a9a', '#8af0ff', '#ffffff'], liqSpeed: 0.3, liqGlow: true,
    fog: { start: 0.94, floor: G - 6, depth: 6, haze: [6, 0.16, 6], hazeColor: '#2a5a6a' },
    camY: 3, zoom: 1.2,
    particles: [
      { n: 50, colors: ['#9af8f0', '#e0ffff', '#ffffff'], mode: 'rise', speed: 0.35, area: [32.5, 32.5, 3], y0: G + 1, y1: G + 26, glow: true },
      { n: 70, colors: ['#e0f0ff', '#c8e8ff', '#fff6d8'], mode: 'drift', speed: 0.12, area: [32, 32, 11], y0: G + 2, y1: G + 28, glow: true },
    ],
    blocks: {
      moss: { c: '#3a4a50', top: '#4a7a7a', v: 0.1 }, dirt: { c: '#3a4a50', v: 0.08 }, rock: { c: '#7a8494', v: 0.06, pat: 'big' }, path: { c: '#2a3a44', top: '#5a6a78', v: 0.05, pat: 'stone' },
      marble: { c: '#d4dce6', v: 0.04, pat: 'big' }, marbleDk: { c: '#b8c4d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f8fa', v: 0.02 }, silver: { c: '#c8d4e0', v: 0.04 },
      floor: { c: '#9aa6b8', top: '#aab6c8', v: 0.04, pat: 'check', alt: '#8e9aae' }, floorB: { c: '#5a6a9a', top: '#6a7ab0', v: 0.03 }, rug: { c: '#3a4a7a', v: 0.04, pat: 'check', alt: '#44558a' },
      win: { c: '#5a9ab8', glow: true }, lamp: { c: '#c8fff4', glow: true }, crysT: { c: '#7af0e0', glow: true }, crysP: { c: '#d0f8ff', glow: true }, crysV: { c: '#c8a8ff', glow: true },
      rune: { c: '#8af0ff', glow: true }, mirror: { c: '#eef8ff', glow: true }, door: { c: '#4a5a6a', v: 0.03, pat: 'plank' }, plank: { c: '#8a9098', v: 0.05, pat: 'plank' }, wood: { c: '#6a5a50', v: 0.05, pat: 'plank' },
      book1: { c: '#5a7ac8', v: 0.05 }, book2: { c: '#c87a9a', v: 0.05 }, book3: { c: '#d8c88a', v: 0.05 }, page: { c: '#f4f0e0', glow: true }, scroll: { c: '#efe6cc', v: 0.03 }, roofB: { c: '#5a6a9a', v: 0.04, pat: 'tile' },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => VX.hash3(x >> 1, 5, z >> 1) > 0.7 ? B.moss : B.path, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const C = 32, R = 12, TOP = G + 26, LOW = G + 2, MZ = G + 12;
      const dist = (x, z) => Math.hypot(x - C, z - C), ang = (x, z) => { let a = Math.atan2(z - C, x - C) * 180 / Math.PI; return a < 0 ? a + 360 : a; };
      const back = (x, z) => (x - C) + (z - C) < 1;

      // ── 받침과 바닥: 흰 대리석 바깥 단, 안쪽 바둑 대리석, 룬 고리와 방사선 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = dist(x, z);
        if (d <= R + 3.5) S(x, G, z, d > R + 0.5 ? B.marbleDk : B.floor);
      }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; for (let r = 5; r <= 10; r++) S(Math.round(C + Math.cos(a) * r), G, Math.round(C + Math.sin(a) * r), B.silver); }
      MH.circle(w, C, C, 6, B.trim); MH.circle(w, C, C, 9.5, B.floorB);

      // ── 둥근 벽: 북서쪽 반은 높고(창·은 기둥), 남동쪽 반은 낮다 ──
      for (let z = C - R - 1; z <= C + R + 1; z++) for (let x = C - R - 1; x <= C + R + 1; x++) {
        const d = dist(x, z); if (d <= R - 0.5 || d > R + 0.6) continue;
        const a = ang(x, z), bk = back(x, z), top = bk ? TOP : LOW;
        for (let y = G + 1; y <= top; y++) {
          let b = B.marble;
          if (y === G + 1 || (bk && (y === MZ || y === TOP || y === G + 20))) b = B.marbleDk;
          if (bk && Math.round(a) % 30 === 0) b = B.silver;
          if (!bk && y === top) b = B.trim;
          S(x, y, z, b);
        }
      }
      // 높은 창(달빛 유리): 뒤쪽 반에 30°마다
      for (let k = 0; k < 12; k++) {
        const a = (k * 30 + 15) * Math.PI / 180, x = Math.round(C + Math.cos(a) * (R + 0.2)), z = Math.round(C + Math.sin(a) * (R + 0.2));
        if (!back(x, z)) continue;
        for (const [y0, y1] of [[G + 4, G + 9], [G + 15, G + 18], [G + 21, G + 24]]) { w.box(x, y0, z, x, y1, z, B.win); S(x, y1 + 1, z, B.trim); S(x, y0 - 1, z, B.trim); }
      }
      for (let k = 0; k < 360; k += 3) { const a = k * Math.PI / 180, x = Math.round(C + Math.cos(a) * (R + 1.2)), z = Math.round(C + Math.sin(a) * (R + 1.2)); if (back(x, z)) S(x, TOP + 1, z, k % 9 ? B.trim : B.crysP); }

      // ── 정문(남쪽, 안쪽): 둥근 아치 문틀, 판자 문짝 ──
      for (let x = 30; x <= 34; x++) for (let y = G + 1; y <= G + 6; y++) {
        for (let z = 43; z <= 45; z++) if (dist(x, z) > R - 0.5) S(x, y, z, 0);
        const edge = x === 30 || x === 34 || y === G + 6 || (y === G + 5 && (x === 31 || x === 33));
        S(x, y, 44, edge ? B.trim : B.door);
      }
      S(32, G + 7, 44, B.crysP); S(29, G + 3, 44, B.lamp); S(35, G + 3, 44, B.lamp);
      for (const x of [29, 35]) { S(x, G + 1, 44, B.marbleDk); S(x, G + 2, 44, B.marble); }
      acts.push(OR.goAct({ at: [32, G + 1, 43], h: 6, hit: [31, G + 1, 43, 33, G + 4, 44], name: '밖으로 나가기', goto: 'lunaris', hint: '흰 문을 열고 나가 달의 첨탑 앞 섬길로 돌아가요' }));
      lights.push({ name: 'door', p: [32.5, G + 5, 42.5], c: '#c8fff4', i: 0.6, d: 12, flicker: 0.05, srcR: 4 });

      // ── 달빛 우물(가운데): 대리석 테두리, 빛나는 물, 떠 있는 달 수정(부품) ──
      for (let z = C - 5; z <= C + 5; z++) for (let x = C - 5; x <= C + 5; x++) {
        const d = dist(x, z);
        if (d > 4.6) continue;
        if (d > 3.4) { S(x, G + 1, z, B.marbleDk); S(x, G + 2, z, d > 4 ? B.trim : B.marble); continue; }
        S(x, G, z, 0); S(x, G - 1, z, 0); S(x, G - 2, z, (x + z) % 3 ? B.marbleDk : B.crysT); w.liquid(x, z, G + 1);
      }
      for (const [dx, dz] of [[-4, 0], [4, 0], [0, -4], [0, 4]]) S(C + dx, G + 3, C + dz, B.crysT);
      const wc = w.prop({ name: 'wcrys', pivot: [C + 0.5, G + 7, C + 0.5], axis: 'y', speed: 0.6, bob: 0.4, bobSpeed: 1.1 });
      for (let y = -2; y <= 2; y++) { const r = 2 - Math.abs(y); for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) if (Math.abs(dx) + Math.abs(dz) <= r) wc.set(C + dx, G + 7 + y, C + dz, Math.abs(dx) + Math.abs(dz) === r ? B.crysP : B.rune); }
      lights.push({ name: 'well', p: [C + 0.5, G + 3, C + 0.5], c: '#8af0ff', i: 1.4, d: 22, flicker: 0.06, srcR: 5 });
      acts.push({
        name: '달빛 우물', hint: '우물물이 환히 빛나고 달 수정이 높이 떠오르며 빛 방울이 솟아올라요', hit: [C - 4, G + 1, C - 4, C + 4, G + 9, C + 4],
        run: async a => {
          a.flash('well', 3, 5); a.glow(1.6, 5); a.spin('wcrys', 6, 5);
          await a.move('wcrys', [0, 7, 0], 1.6);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5, G + 2, C + 0.5], { n: 20, colors: ['#8af0ff', '#e0ffff', '#ffffff'], speed: 3, up: 6, life: 1.6, gravity: 1.5, spread: 2.5 }); await a.wait(0.4); }
          await a.move('wcrys', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '달빛 우물', note: '달빛이 고이는 홀 가운데 우물', p: [C + 0.5, G + 13, C + 0.5] });

      // ── 벽을 감아 오르는 계단(남서 → 서 → 북서), 계단 등 ──
      const A0 = 115, A1 = 205, NST = 12, stepA = (A1 - A0) / NST;
      const stepTop = [];
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const d = dist(x, z), a = ang(x, z);
        if (d < 8.4 || d > R - 0.5 || a < A0 || a >= A1) continue;
        const k = Math.floor((a - A0) / stepA), top = G + 1 + k;
        for (let y = G + 1; y <= top; y++) S(x, y, z, y === top ? (d > 10.6 ? B.marbleDk : B.marble) : B.marbleDk);
        stepTop[k] = top;
      }
      const stairLamps = [];
      for (let k = 0; k < NST; k += 2) {
        const a = (A0 + (k + 0.5) * stepA) * Math.PI / 180, x = Math.round(C + Math.cos(a) * (R + 0.1)), z = Math.round(C + Math.sin(a) * (R + 0.1));
        if (!back(x, z)) continue;
        S(x, G + 4 + k, z, B.lamp); stairLamps.push([x + 0.5, G + 4 + k, z + 0.5]);
      }
      lights.push({ name: 'stair', p: [C - 9.5, G + 8, C + 0.5], c: '#c8fff4', i: 0.6, d: 16, flicker: 0.05, srcR: 6 });
      acts.push({
        name: '빛 계단', hint: '계단 등이 아래부터 차례로 켜지며 초승달 방으로 오르는 길을 비춰요', hit: [C - 12, G + 1, C - 6, C - 6, G + 13, C + 11],
        run: async a => {
          a.flash('stair', 3, 4.5);
          for (let k = 0; k < NST; k++) {
            const an = (A0 + (k + 0.5) * stepA) * Math.PI / 180;
            a.burst([C + Math.cos(an) * 10 + 0.5, G + 2.5 + k, C + Math.sin(an) * 10 + 0.5], { n: 10, colors: ['#c8fff4', '#ffffff'], speed: 1, up: 2, life: 1.2, gravity: -0.4, spread: 1 });
            await a.wait(0.3);
          }
        },
      });

      // ── 북쪽 반원 중이층(초승달 방): 바닥판, 은 난간, 받침 기둥 ──
      const MZE = C - 5;
      for (let z = C - R; z <= MZE; z++) for (let x = C - R; x <= C + R; x++) {
        const d = dist(x, z); if (d > R - 0.5) continue;
        S(x, MZ, z, z === MZE ? B.trim : (d < 6 ? B.floorB : B.floor));
        if (z === MZE && x > C - 6) S(x, MZ + 1, z, x % 2 ? B.silver : B.trim);
      }
      for (const x of [C - 4, C + 4, C + 9]) w.box(x, G + 1, MZE, x, MZ - 1, MZE, B.marble);
      MH.circle(w, C, C - 8, 3, B.rune);

      // 초승달 축(부품): 은 축 위에서 도는 커다란 초승달
      const MX = C, MZc = C - 8;
      w.box(MX, MZ + 1, MZc, MX, MZ + 3, MZc, B.silver); S(MX, MZ + 4, MZc, B.trim);
      w.box(MX - 1, MZ + 1, MZc - 1, MX + 1, MZ + 1, MZc + 1, B.marbleDk);
      const moon = w.prop({ name: 'moon', pivot: [MX + 0.5, MZ + 10, MZc + 0.5], axis: 'y', speed: 0.3 });
      moon.box(MX, MZ + 5, MZc, MX, MZ + 9, MZc, B.silver);
      for (let a = -2.3; a <= 2.3; a += 0.07) {
        const co = Math.cos(a), si = Math.sin(a);
        for (const rr of [5.2, 4.4, 3.6]) if (rr > 5 || Math.abs(a) < 1.5 || (rr > 4 && Math.abs(a) < 1.9)) moon.set(Math.round(MX - co * rr + 2), Math.round(MZ + 10 + si * rr), MZc, B.crysP);
      }
      lights.push({ name: 'moon', p: [MX + 0.5, MZ + 10, MZc + 0.5], c: '#d0f8ff', i: 1.4, d: 24, flicker: 0.05, srcR: 6 });
      acts.push({
        name: '초승달 돌리기', hint: '초승달 축이 빠르게 돌며 꼭대기 초승달과 함께 달빛을 방 안에 흩뿌려요', hit: [MX - 5, MZ + 1, MZc - 3, MX + 7, MZ + 15, MZc + 3],
        run: async a => {
          a.flash('moon', 3, 4.5); a.glow(1.5, 4.5); a.spin('moon', 10, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([MX + 0.5, MZ + 10, MZc + 0.5], { n: 22, colors: ['#d0f8ff', '#ffffff', '#7af0e0'], speed: 7, up: 1, life: 1.8, gravity: 1.2, spread: 3 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '초승달 방', note: '꼭대기 초승달과 이어진 축', p: [MX + 0.5, MZ + 19, MZc + 0.5] });

      // 은 거울(부품): 중이층 서쪽, 우물을 향해 선 둥근 거울
      const RX = C - 7, RZ = C - 7;
      w.box(RX, MZ + 1, RZ - 2, RX, MZ + 1, RZ + 2, B.marbleDk);
      const mirror = w.prop({ name: 'mirror', pivot: [RX + 0.5, MZ + 4, RZ + 0.5], axis: 'y', rot0: [0, -0.6, 0] });
      for (let v = -2; v <= 2; v++) for (let u = -2; u <= 2; u++) { const d = Math.hypot(u, v * 0.8); if (d > 2.5) continue; mirror.set(RX, MZ + 4 + v, RZ + u, d > 1.7 ? B.silver : B.mirror); }
      mirror.set(RX, MZ + 2, RZ, B.silver); mirror.set(RX, MZ + 7, RZ, B.crysP);
      lights.push({ name: 'mirror', p: [RX + 1.5, MZ + 4, RZ + 0.5], c: '#eef8ff', i: 0.8, d: 14, flicker: 0.04, srcR: 4 });
      acts.push({
        name: '은 거울', hint: '은 거울이 돌아서 달빛을 받아 우물 쪽으로 빛줄기를 되쏘아요', hit: [RX - 1, MZ + 1, RZ - 3, RX + 2, MZ + 8, RZ + 3],
        run: async a => {
          await a.turn('mirror', [0, 0.5, 0], 1.2);
          a.flash('mirror', 4, 3.5); a.flash('well', 2.5, 3.5);
          for (let k = 0; k < 10; k++) { const t = k / 9; a.burst([RX + 1 + (C - RX) * t, MZ + 4 - (MZ + 2 - G) * t, RZ + 0.5 + (C - RZ) * t], { n: 8, colors: ['#ffffff', '#d0f8ff'], speed: 0.6, up: 0.2, life: 1, gravity: 0, spread: 0.4 }); await a.wait(0.12); }
          a.burst([C + 0.5, G + 2, C + 0.5], { n: 30, colors: ['#ffffff', '#8af0ff'], speed: 5, up: 3, life: 1.4, gravity: 1, spread: 2 });
          await a.wait(1.2); await a.turn('mirror', [0, -0.6, 0], 1.2);
        },
      });

      // 별가루 그릇(부품: 떠오르는 별가루), 중이층 동쪽
      const SX = C + 6, SZ = C - 8;
      w.box(SX, MZ + 1, SZ, SX, MZ + 2, SZ, B.silver); w.box(SX - 1, MZ + 3, SZ - 1, SX + 1, MZ + 3, SZ + 1, B.silver); S(SX, MZ + 3, SZ, B.crysV);
      const dust = w.prop({ name: 'dust', pivot: [SX + 0.5, MZ + 5, SZ + 0.5], axis: 'y', speed: 0.9, bob: 0.3, bobSpeed: 1.4 });
      for (const [dx, dy, dz] of [[0, 4, 0], [1, 5, 0], [-1, 5, 1], [0, 6, -1], [1, 6, 1], [-1, 7, 0], [0, 7, 1]]) dust.set(SX + dx, MZ + dy, SZ + dz, (dx + dy) % 2 ? B.crysP : B.crysV);
      lights.push({ name: 'dust', p: [SX + 0.5, MZ + 5, SZ + 0.5], c: '#d8c8ff', i: 0.8, d: 12, flicker: 0.2, srcR: 3 });
      acts.push({
        name: '별가루', hint: '은 그릇의 별가루가 떠올라 소용돌이치다가 홀 위로 반짝이며 흩날려요', hit: [SX - 2, MZ + 1, SZ - 2, SX + 2, MZ + 8, SZ + 2],
        run: async a => {
          a.flash('dust', 3, 4); a.spin('dust', 6, 4);
          await a.move('dust', [-3, 5, 6], 1.6);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5 + (k % 3 - 1) * 4, MZ + 10, C + 0.5 + (k % 2) * 3], { n: 16, colors: ['#ffffff', '#d8c8ff', '#fff6d8'], speed: 1.5, up: 0, life: 2.4, gravity: 0.8, spread: 3 }); await a.wait(0.35); }
          await a.move('dust', [0, 0, 0], 1.4);
        },
      });

      // ── 중이층 아래: 달 기록 서가(두루마리가 떠오른다, 부품), 의자와 깔개 ──
      for (let x = C - 3; x <= C + 7; x++) {
        const z = C - 10; if (dist(x, z) > R - 0.6) continue;
        for (const y of [G + 1, G + 4, G + 7]) S(x, y, z, B.wood);
        for (const y of [G + 2, G + 5, G + 8]) S(x, y, z, [B.scroll, B.book1, B.book2, B.book3][(x + y) % 4]);
        if (x === C - 3 || x === C + 7) w.box(x, G + 1, z, x, MZ - 1, z, B.wood);
      }
      const scr = w.prop({ name: 'scrolls' });
      for (const [x, y] of [[C, G + 5], [C + 3, G + 2], [C + 5, G + 8]]) { scr.box(x, y, C - 9, x + 1, y, C - 9, B.scroll); scr.set(x + 2, y, C - 9, B.page); }
      for (let z = C - 6; z <= C - 4; z++) for (let x = C - 3; x <= C + 4; x++) S(x, G, z, B.rug);
      w.box(C - 2, G + 1, C - 7, C - 2, G + 1, C - 7, B.wood); w.box(C + 3, G + 1, C - 7, C + 3, G + 1, C - 7, B.wood);
      S(C + 6, G + 1, C - 6, B.wood); S(C + 6, G + 2, C - 6, B.lamp);
      lights.push({ name: 'shelf', p: [C + 6.5, G + 3, C - 5.5], c: '#c8fff4', i: 0.6, d: 12, flicker: 0.08, srcR: 3 });
      acts.push({
        name: '달 기록 펼치기', hint: '서가의 달 기록 두루마리들이 빠져나와 떠오르며 빛나는 글자를 펼쳐 보여요', hit: [C - 3, G + 1, C - 10, C + 7, G + 9, C - 6],
        run: async a => {
          a.flash('shelf', 3, 4);
          await a.move('scrolls', [0, 3, 5], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([C + 2.5 + (k % 3) * 2 - 2, G + 8, C - 3.5], { n: 12, colors: ['#f4f0e0', '#c8fff4', '#ffffff'], speed: 1.5, up: 1, life: 1.4, gravity: -0.2, spread: 1.5 }); await a.wait(0.4); }
          await a.move('scrolls', [0, 0, 0], 1.6);
        },
      });

      // 둥근 화분과 벤치(홀 남동쪽), 은 등대
      for (const a of [30, 60]) { const r = a * Math.PI / 180, x = Math.round(C + Math.cos(r) * 9.5), z = Math.round(C + Math.sin(r) * 9.5); S(x, G + 1, z, B.marbleDk); S(x, G + 2, z, B.crysT); }
      for (let k = 0; k < 3; k++) S(C + 8 + k, G + 1, C + 3, B.wood);
      lights.push({ name: 'hall', p: [C + 8.5, G + 3, C + 6.5], c: '#7af0e0', i: 0.6, d: 12, flicker: 0.1, srcR: 4 });
      return { lights, landmarks, acts };
    },
  });
})();
