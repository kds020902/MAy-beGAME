// 달의 첨탑 안(하위 지도, 2배 해상도) — 월광 첨탑 가운데 섬의 흰 첨탑 속. 둥근 1층 달빛 홀과 가운데 달빛 우물, 벽을 감아 오르는 계단,
// 북쪽 반원 중이층(초승달 방)의 초승달 축과 은 거울, 별가루 그릇, 중이층 아래 달 기록 서가. 남동쪽 벽은 잘라 낮췄다 (128칸)
// 세부: 두 겹 벽과 줄눈·은 기둥띠, 창틀·창살·창턱 있는 높은 창, 계단식 아치 문틀과 쌍여닫이 판자문, 쇠시리 두른 우물 테,
// 장선 받친 중이층과 난간동자, 칸막이·선반 있는 서가와 낱권 책, 등받이 의자와 깔개. playerScale 2 (사람 키 6.8칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 128, G = 24;
  MAPS.push({
    id: 'lunaris-spire', cat: 'magic', sub: true, parent: 'lunaris', name: '달의 첨탑 안', en: 'Lunaris · Inside the Moon Spire', color: '#bff0ff', seed: 3531, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '달빛을 모으는 흰 첨탑의 속. 둥근 홀 가운데 달빛 우물이 은은히 빛나고, 벽을 감아 오르는 계단 끝 초승달 방에서는 꼭대기 초승달과 이어진 축이 천천히 돈다. 은 거울은 달빛을 우물로 되돌려 보낸다.',
    info: { title: '장소 정보', en: 'MOON SPIRE', rows: [['쓰임', '월광 사제단의 달빛 홀'], ['1층', '달빛 우물 · 달 기록 서가'], ['위층', '초승달 방 · 은 거울 · 별가루 그릇'], ['주의', '우물물은 마시지 말 것']] },
    sky: ['#14304a', '#04080e', '#9adcf0'], stars: true,
    hemi: ['#a8c8e0', '#0a1420', 0.4], sun: ['#c8e0ff', 0.3, [0.45, 1, 0.5]],
    day: { sky: ['#c8e4f0', '#5a8ab0', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.58], sun: ['#fff8ec', 0.7, [0.45, 1, 0.5]] },
    liquid: ['#2a6a9a', '#8af0ff', '#ffffff'], liqSpeed: 0.3, liqGlow: true,
    fog: { start: 0.94, floor: G - 12, depth: 12, haze: [12, 0.16, 12], hazeColor: '#2a5a6a' },
    camY: 6, zoom: 1.2,
    particles: [
      { n: 80, colors: ['#9af8f0', '#e0ffff', '#ffffff'], mode: 'rise', speed: 0.7, area: [64.5, 64.5, 6], y0: G + 2, y1: G + 52, glow: true },
      { n: 110, colors: ['#e0f0ff', '#c8e8ff', '#fff6d8'], mode: 'drift', speed: 0.24, area: [64, 64, 22], y0: G + 4, y1: G + 56, glow: true },
    ],
    blocks: {
      moss: { c: '#3a4a50', top: '#4a7a7a', v: 0.1 }, dirt: { c: '#3a4a50', v: 0.08 }, rock: { c: '#7a8494', v: 0.06, pat: 'big' }, path: { c: '#2a3a44', top: '#5a6a78', v: 0.05, pat: 'stone' },
      marble: { c: '#d4dce6', v: 0.04, pat: 'big' }, marbleDk: { c: '#b8c4d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f8fa', v: 0.02 }, silver: { c: '#c8d4e0', v: 0.04 },
      floor: { c: '#9aa6b8', top: '#aab6c8', v: 0.04, pat: 'check', alt: '#8e9aae' }, floorB: { c: '#5a6a9a', top: '#6a7ab0', v: 0.03 }, rug: { c: '#3a4a7a', v: 0.04, pat: 'check', alt: '#44558a' },
      win: { c: '#5a9ab8', glow: true }, lamp: { c: '#c8fff4', glow: true }, crysT: { c: '#7af0e0', glow: true }, crysP: { c: '#d0f8ff', glow: true }, crysV: { c: '#c8a8ff', glow: true },
      rune: { c: '#8af0ff', glow: true }, mirror: { c: '#eef8ff', glow: true }, door: { c: '#4a5a6a', v: 0.03, pat: 'plank' }, plank: { c: '#8a9098', v: 0.05, pat: 'plank' }, wood: { c: '#6a5a50', v: 0.05, pat: 'plank' },
      book1: { c: '#5a7ac8', v: 0.05 }, book2: { c: '#c87a9a', v: 0.05 }, book3: { c: '#d8c88a', v: 0.05 }, page: { c: '#f4f0e0', glow: true }, scroll: { c: '#efe6cc', v: 0.03 }, roofB: { c: '#5a6a9a', v: 0.04, pat: 'tile' },
      // 2배 해상도 세부용
      marbleJ: { c: '#9aa6b4', v: 0.03 }, doorDk: { c: '#36444f', v: 0.03 }, woodDk: { c: '#4e4038', v: 0.04 }, book4: { c: '#6a9a8a', v: 0.05 }, book5: { c: '#8a5ab0', v: 0.05 },
      cushion: { c: '#5a6aa8', v: 0.03 }, rugE: { c: '#c8b880', v: 0.03 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 2, 5, z >> 2) > 0.7 ? B.moss : B.path, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const C = 64, R = 24, TOP = G + 52, LOW = G + 4, MZ = G + 24;
      const dist = (x, z) => Math.hypot(x - C, z - C), ang = (x, z) => { let a = Math.atan2(z - C, x - C) * 180 / Math.PI; return a < 0 ? a + 360 : a; };
      const back = (x, z) => (x - C) + (z - C) < 2;
      const BK = [B.book1, B.book2, B.book3, B.book4, B.book5];

      // ── 받침과 바닥: 흰 대리석 바깥 단, 안쪽 바둑 대리석, 은 방사선과 고리 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = dist(x, z);
        if (d <= R + 7) S(x, G, z, d > R + 1 ? (d > R + 6 ? B.trim : B.marbleDk) : B.floor);
      }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; for (let r = 10; r <= 20; r += 0.5) for (const o of [-0.5, 0.5]) S(Math.round(C + Math.cos(a) * r - Math.sin(a) * o), G, Math.round(C + Math.sin(a) * r + Math.cos(a) * o), B.silver); }
      MH.circle(w, C, C, 12, B.trim, 2); MH.circle(w, C, C, 19, B.floorB, 2); MH.circle(w, C, C, 21.5, B.marbleJ);

      // ── 둥근 벽(두 겹): 북서쪽 반은 높고(창·은 기둥띠), 남동쪽 반은 낮다 ──
      for (let z = C - R - 2; z <= C + R + 2; z++) for (let x = C - R - 2; x <= C + R + 2; x++) {
        const d = dist(x, z); if (d <= R - 1 || d > R + 1.2) continue;
        const a = ang(x, z), bk = back(x, z), top = bk ? TOP : LOW;
        for (let y = G + 1; y <= top; y++) {
          let b = (y - G) % 6 === 0 ? B.marbleJ : B.marble;
          if (y <= G + 2 || (bk && (y === MZ || y === MZ + 1 || y === TOP || y === G + 40))) b = B.marbleDk;
          if (bk && Math.abs(((a + 360) % 30) - 0) < 3 && y > G + 2) b = B.silver;
          if (!bk && y === top) b = B.trim;
          S(x, y, z, b);
        }
      }
      // 높은 창(달빛 유리): 뒤쪽 반에 30°마다, 창틀·가운데 창살·가로 창살·창턱
      for (let k = 0; k < 12; k++) {
        const a = (k * 30 + 15) * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
        if (!back(Math.round(C + ca * R), Math.round(C + sa * R))) continue;
        for (const [y0, y1] of [[G + 8, G + 19], [G + 29, G + 37], [G + 43, G + 49]]) {
          for (let t = -2; t <= 2; t++) for (let y = y0 - 1; y <= y1 + 1; y++) {
            const edge = Math.abs(t) === 2 || y === y0 - 1 || y === y1 + 1;
            for (const rr of [R - 0.6, R + 0.2, R + 1]) {
              const x = Math.round(C + ca * rr - sa * t), z = Math.round(C + sa * rr + ca * t);
              S(x, y, z, edge ? B.trim : (t === 0 || y === Math.round(y0 + (y1 - y0) * 0.6)) ? B.silver : B.win);
            }
          }
          for (let t = -3; t <= 3; t++) S(Math.round(C + ca * (R - 1.6) - sa * t), y0 - 1, Math.round(C + sa * (R - 1.6) + ca * t), B.marbleDk);
          S(Math.round(C + ca * (R - 1.6)), y1 + 2, Math.round(C + sa * (R - 1.6)), B.crysP);
        }
      }
      for (let k = 0; k < 360; k += 1.5) { const a = k * Math.PI / 180, x = Math.round(C + Math.cos(a) * (R + 2)), z = Math.round(C + Math.sin(a) * (R + 2)); if (back(x, z)) { S(x, TOP, z, B.marbleDk); S(x, TOP + 1, z, B.trim); if (k % 9 === 0) S(x, TOP + 2, z, B.crysP); } }

      // ── 정문(남쪽, 안쪽): 계단식 아치 문틀, 쌍여닫이 판자문(징·손잡이), 벽등 ──
      const DZ = C + R;
      for (let x = C - 5; x <= C + 5; x++) for (let y = G + 1; y <= G + 15; y++) {
        for (let z = DZ - 2; z <= DZ + 2; z++) if (dist(x, z) > R - 1) S(x, y, z, 0);
        const t = Math.abs(x - C), archTop = G + 11 + Math.round(3 - t * 0.8);
        if (t === 5 || y > archTop) { S(x, y, DZ, y === G + 15 || t === 5 && y <= G + 2 ? B.marbleDk : B.trim); continue; }
        S(x, y, DZ, x === C ? B.doorDk : ((y - G) % 4 === 0 ? B.woodDk : B.door));
        if ((y === G + 3 || y === G + 8) && t === 3) S(x, y, DZ - 1, B.silver);
      }
      for (const x of [C - 1, C + 1]) S(x, G + 6, DZ - 1, B.silver);
      S(C, G + 15, DZ - 1, B.crysP); S(C, G + 16, DZ, B.crysP);
      for (const x of [C - 7, C + 7]) { w.box(x, G + 1, DZ - 1, x, G + 2, DZ + 1, B.marbleDk); w.box(x, G + 3, DZ, x, G + 6, DZ, B.marble); S(x, G + 7, DZ - 1, B.silver); w.box(x, G + 8, DZ - 1, x, G + 9, DZ - 1, B.lamp); S(x, G + 10, DZ - 1, B.trim); }
      acts.push(OR.goAct({ at: [C, G + 1, DZ - 3], h: 12, hit: [C - 3, G + 1, DZ - 2, C + 3, G + 10, DZ], name: '밖으로 나가기', goto: 'lunaris', hint: '흰 문을 열고 나가 달의 첨탑 앞 섬길로 돌아가요' }));
      lights.push({ name: 'door', p: [C + 0.5, G + 10, DZ - 2.5], c: '#c8fff4', i: 0.6, d: 24, flicker: 0.05, srcR: 8 });

      // ── 달빛 우물(가운데): 쇠시리 두른 대리석 테, 빛나는 물, 떠 있는 달 수정(부품) ──
      for (let z = C - 10; z <= C + 10; z++) for (let x = C - 10; x <= C + 10; x++) {
        const d = dist(x, z);
        if (d > 9.2) continue;
        if (d > 6.8) {
          S(x, G + 1, z, B.marbleDk); S(x, G + 2, z, d > 8.4 ? B.marbleJ : B.marbleDk);
          S(x, G + 3, z, B.marble); if (d <= 8.6) S(x, G + 4, z, d > 7.8 ? B.trim : B.marble);
          continue;
        }
        for (let y = G - 4; y <= G; y++) S(x, y, z, 0);
        S(x, G - 5, z, (Math.round(Math.atan2(z - C, x - C) * 3 + d) % 3) ? B.marbleDk : B.crysT); w.liquid(x, z, G + 2);
      }
      for (const [dx, dz] of [[-8, 0], [8, 0], [0, -8], [0, 8]]) { S(C + dx, G + 5, C + dz, B.silver); w.box(C + dx, G + 6, C + dz, C + dx, G + 7, C + dz, B.crysT); }
      const wc = w.prop({ name: 'wcrys', pivot: [C + 0.5, G + 14, C + 0.5], axis: 'y', speed: 0.6, bob: 0.8, bobSpeed: 1.1 });
      for (let y = -4; y <= 4; y++) { const r = 4 - Math.abs(y); for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const m = Math.abs(dx) + Math.abs(dz); if (m <= r) wc.set(C + dx, G + 14 + y, C + dz, m >= r - 1 ? B.crysP : B.rune); } }
      lights.push({ name: 'well', p: [C + 0.5, G + 6, C + 0.5], c: '#8af0ff', i: 1.4, d: 44, flicker: 0.06, srcR: 10 });
      acts.push({
        name: '달빛 우물', hint: '우물물이 환히 빛나고 달 수정이 높이 떠오르며 빛 방울이 솟아올라요', hit: [C - 8, G + 1, C - 8, C + 8, G + 18, C + 8],
        run: async a => {
          a.flash('well', 3, 5); a.glow(1.6, 5); a.spin('wcrys', 6, 5);
          await a.move('wcrys', [0, 14, 0], 1.6);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5, G + 4, C + 0.5], { n: 20, colors: ['#8af0ff', '#e0ffff', '#ffffff'], speed: 6, up: 12, life: 1.6, gravity: 3, spread: 5 }); await a.wait(0.4); }
          await a.move('wcrys', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '달빛 우물', note: '달빛이 고이는 홀 가운데 우물', p: [C + 0.5, G + 26, C + 0.5] });

      // ── 벽을 감아 오르는 계단(남서 → 서 → 북서, 한 단 1칸), 계단 등 ──
      const A0 = 115, A1 = 205, NST = 24, stepA = (A1 - A0) / NST;
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const d = dist(x, z), a = ang(x, z);
        if (d < 16.8 || d > R - 0.9 || a < A0 || a >= A1) continue;
        const k = Math.floor((a - A0) / stepA), top = G + 1 + k;
        for (let y = G + 1; y <= top; y++) S(x, y, z, y === top ? (d < 17.8 ? B.trim : (d > 22 ? B.marbleDk : B.marble)) : ((y - G) % 6 === 0 ? B.marbleJ : B.marbleDk));
      }
      // 계단 끝 층계참: 마지막 단과 중이층 사이를 메운다
      for (let z = C - R; z <= C; z++) for (let x = C - R; x <= C; x++) {
        const d = dist(x, z), a = ang(x, z);
        if (d < 16.8 || d > R - 0.9 || a < A1 || a > A1 + 20 || z <= C - 10) continue;
        for (let y = G + 1; y <= MZ; y++) S(x, y, z, y === MZ ? B.marble : ((y - G) % 6 === 0 ? B.marbleJ : B.marbleDk));
      }
      // 계단 안쪽 옆벽(디딤판 높이까지)과 난간동자·손잡이
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const d = dist(x, z), a = ang(x, z);
        if (d < 15.8 || d >= 16.8 || a < A0 + 1 || a >= A1) continue;
        const k = Math.floor((a - A0) / stepA);
        w.box(x, G + 1, z, x, G + 1 + k, z, B.marbleDk); S(x, G + 1 + k, z, B.trim);
        if ((x + z) % 2 === 0) w.box(x, G + 2 + k, z, x, G + 3 + k, z, B.silver);
        S(x, G + 4 + k, z, B.trim);
      }
      for (let k = 1; k < NST; k += 4) {
        const a = (A0 + (k + 0.5) * stepA) * Math.PI / 180, x = Math.round(C + Math.cos(a) * (R - 1.2)), z = Math.round(C + Math.sin(a) * (R - 1.2));
        S(x, G + 8 + k, z, B.silver); S(x, G + 9 + k, z, B.lamp); S(x, G + 10 + k, z, B.lamp); S(x, G + 11 + k, z, B.silver);
      }
      lights.push({ name: 'stair', p: [C - 19.5, G + 16, C + 0.5], c: '#c8fff4', i: 0.6, d: 32, flicker: 0.05, srcR: 12 });
      acts.push({
        name: '빛 계단', hint: '계단 등이 아래부터 차례로 켜지며 초승달 방으로 오르는 길을 비춰요', hit: [C - 24, G + 1, C - 12, C - 12, G + 26, C + 22],
        run: async a => {
          a.flash('stair', 3, 4.5);
          for (let k = 0; k < NST; k += 2) {
            const an = (A0 + (k + 0.5) * stepA) * Math.PI / 180;
            a.burst([C + Math.cos(an) * 20 + 0.5, G + 4 + k, C + Math.sin(an) * 20 + 0.5], { n: 10, colors: ['#c8fff4', '#ffffff'], speed: 2, up: 4, life: 1.2, gravity: -0.8, spread: 2 });
            await a.wait(0.3);
          }
        },
      });

      // ── 북쪽 반원 중이층(초승달 방): 장선 받친 바닥판, 난간동자와 손잡이, 받침 기둥 ──
      const MZE = C - 10;
      for (let z = C - R; z <= MZE; z++) for (let x = C - R; x <= C + R; x++) {
        const d = dist(x, z); if (d > R - 0.9) continue;
        S(x, MZ, z, z >= MZE - 1 ? B.trim : (d < 12 ? B.floorB : B.floor));
        if ((x - C) % 4 === 0 || z === MZE) S(x, MZ - 1, z, B.woodDk);
        if (z === MZE && x > C - 14) { if (x % 2 === 0) w.box(x, MZ + 1, z, x, MZ + 3, z, B.silver); S(x, MZ + 4, z, B.trim); }
      }
      for (const x of [C - 8, C + 8, C + 18]) {
        w.box(x - 1, G + 1, MZE - 1, x + 1, G + 2, MZE + 1, B.marbleDk);
        for (let y = G + 3; y <= MZ - 3; y++) { S(x, y, MZE, B.marble); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) S(x + dx, y, MZE + dz, y % 4 === 0 ? B.marbleJ : B.marble); }
        w.box(x - 1, MZ - 2, MZE - 1, x + 1, MZ - 1, MZE + 1, B.trim);
      }
      MH.circle(w, C, C - 16, 6, B.rune);
      for (let z = C - 23; z < MZE; z++) for (let x = C - 22; x <= C + 22; x++) { const d = Math.hypot(x - C, z - (C - 16)); if (d > 5.4 && d < 6.6) S(x, MZ, z, B.rune); }

      // 초승달 축(부품): 은 축 위에서 도는 커다란 초승달
      const MX = C, MZc = C - 16;
      w.box(MX - 2, MZ + 1, MZc - 2, MX + 2, MZ + 2, MZc + 2, B.marbleDk); w.box(MX - 1, MZ + 3, MZc - 1, MX + 1, MZ + 3, MZc + 1, B.trim);
      w.box(MX, MZ + 4, MZc, MX, MZ + 7, MZc, B.silver); S(MX, MZ + 8, MZc, B.trim);
      const moon = w.prop({ name: 'moon', pivot: [MX + 0.5, MZ + 20, MZc + 0.5], axis: 'y', speed: 0.3 });
      moon.box(MX, MZ + 9, MZc, MX, MZ + 18, MZc, B.silver);
      for (let a = -2.3; a <= 2.3; a += 0.035) {
        const co = Math.cos(a), si = Math.sin(a);
        for (const rr of [10.4, 9.6, 8.8, 8, 7.2]) if (rr > 10 || Math.abs(a) < 1.5 || (rr > 8 && Math.abs(a) < 1.9)) moon.set(Math.round(MX - co * rr + 4), Math.round(MZ + 20 + si * rr), MZc, rr > 10 ? B.silver : B.crysP);
      }
      lights.push({ name: 'moon', p: [MX + 0.5, MZ + 20, MZc + 0.5], c: '#d0f8ff', i: 1.4, d: 48, flicker: 0.05, srcR: 12 });
      acts.push({
        name: '초승달 돌리기', hint: '초승달 축이 빠르게 돌며 꼭대기 초승달과 함께 달빛을 방 안에 흩뿌려요', hit: [MX - 10, MZ + 1, MZc - 6, MX + 14, MZ + 30, MZc + 6],
        run: async a => {
          a.flash('moon', 3, 4.5); a.glow(1.5, 4.5); a.spin('moon', 10, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([MX + 0.5, MZ + 20, MZc + 0.5], { n: 22, colors: ['#d0f8ff', '#ffffff', '#7af0e0'], speed: 14, up: 2, life: 1.8, gravity: 2.4, spread: 6 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '초승달 방', note: '꼭대기 초승달과 이어진 축', p: [MX + 0.5, MZ + 38, MZc + 0.5] });

      // 은 거울(부품): 중이층 서쪽, 우물을 향해 선 둥근 거울
      const RX = C - 11, RZ = C - 15;
      w.box(RX - 1, MZ + 1, RZ - 4, RX + 1, MZ + 2, RZ + 4, B.marbleDk); w.box(RX, MZ + 3, RZ - 3, RX, MZ + 3, RZ + 3, B.trim);
      const mirror = w.prop({ name: 'mirror', pivot: [RX + 0.5, MZ + 9, RZ + 0.5], axis: 'y', rot0: [0, -0.6, 0] });
      for (let v = -5; v <= 5; v++) for (let u = -5; u <= 5; u++) { const d = Math.hypot(u, v * 0.8); if (d > 5) continue; mirror.set(RX, MZ + 9 + v, RZ + u, d > 3.9 ? B.silver : B.mirror); if (d > 3 && Math.abs(u) < 5) mirror.set(RX - 1, MZ + 9 + v, RZ + u, B.silver); }
      mirror.box(RX, MZ + 4, RZ, RX, MZ + 5, RZ, B.silver); mirror.box(RX, MZ + 15, RZ, RX, MZ + 16, RZ, B.crysP);
      lights.push({ name: 'mirror', p: [RX + 2.5, MZ + 9, RZ + 0.5], c: '#eef8ff', i: 0.8, d: 28, flicker: 0.04, srcR: 6 });
      acts.push({
        name: '은 거울', hint: '은 거울이 돌아서 달빛을 받아 우물 쪽으로 빛줄기를 되쏘아요', hit: [RX - 2, MZ + 1, RZ - 6, RX + 3, MZ + 16, RZ + 6],
        run: async a => {
          await a.turn('mirror', [0, 0.5, 0], 1.2);
          a.flash('mirror', 4, 3.5); a.flash('well', 2.5, 3.5);
          for (let k = 0; k < 10; k++) { const t = k / 9; a.burst([RX + 2 + (C - RX) * t, MZ + 9 - (MZ + 5 - G) * t, RZ + 0.5 + (C - RZ) * t], { n: 8, colors: ['#ffffff', '#d0f8ff'], speed: 1.2, up: 0.4, life: 1, gravity: 0, spread: 0.8 }); await a.wait(0.12); }
          a.burst([C + 0.5, G + 4, C + 0.5], { n: 30, colors: ['#ffffff', '#8af0ff'], speed: 10, up: 6, life: 1.4, gravity: 2, spread: 4 });
          await a.wait(1.2); await a.turn('mirror', [0, -0.6, 0], 1.2);
        },
      });

      // 별가루 그릇(부품: 떠오르는 별가루), 중이층 동쪽
      const SX = C + 12, SZ = C - 16;
      w.box(SX - 1, MZ + 1, SZ - 1, SX + 1, MZ + 1, SZ + 1, B.marbleDk); w.box(SX, MZ + 2, SZ, SX, MZ + 4, SZ, B.silver);
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const m = Math.max(Math.abs(dx), Math.abs(dz)); S(SX + dx, MZ + 5, SZ + dz, m === 2 ? B.silver : B.crysV); if (m === 2 && (dx + dz) % 2 === 0) S(SX + dx, MZ + 6, SZ + dz, B.trim); }
      w.box(SX - 3, MZ + 6, SZ - 3, SX + 3, MZ + 6, SZ + 3, 0);
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.max(Math.abs(dx), Math.abs(dz)) === 3) S(SX + dx, MZ + 6, SZ + dz, B.silver);
      const dust = w.prop({ name: 'dust', pivot: [SX + 0.5, MZ + 12, SZ + 0.5], axis: 'y', speed: 0.9, bob: 0.6, bobSpeed: 1.4 });
      for (const [dx, dy, dz] of [[0, 8, 0], [2, 10, 0], [-2, 10, 2], [0, 12, -2], [2, 12, 2], [-2, 14, 0], [0, 14, 2], [1, 16, -1], [-1, 9, -1]]) { dust.set(SX + dx, MZ + dy, SZ + dz, (dx + dy) % 2 ? B.crysP : B.crysV); dust.set(SX + dx, MZ + dy + 1, SZ + dz, B.crysP); }
      lights.push({ name: 'dust', p: [SX + 0.5, MZ + 10, SZ + 0.5], c: '#d8c8ff', i: 0.8, d: 24, flicker: 0.2, srcR: 6 });
      acts.push({
        name: '별가루', hint: '은 그릇의 별가루가 떠올라 소용돌이치다가 홀 위로 반짝이며 흩날려요', hit: [SX - 4, MZ + 1, SZ - 4, SX + 4, MZ + 16, SZ + 4],
        run: async a => {
          a.flash('dust', 3, 4); a.spin('dust', 6, 4);
          await a.move('dust', [-6, 10, 12], 1.6);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5 + (k % 3 - 1) * 8, MZ + 20, C + 0.5 + (k % 2) * 6], { n: 16, colors: ['#ffffff', '#d8c8ff', '#fff6d8'], speed: 3, up: 0, life: 2.4, gravity: 1.6, spread: 6 }); await a.wait(0.35); }
          await a.move('dust', [0, 0, 0], 1.4);
        },
      });

      // ── 중이층 아래: 달 기록 서가(칸막이·선반·낱권 책, 두루마리가 떠오른다), 의자와 깔개 ──
      const SHZ = C - 20;
      for (let x = C - 6; x <= C + 14; x++) {
        if (dist(x, SHZ) > R - 1.2) continue;
        for (let z = SHZ - 1; z <= SHZ; z++) {
          for (const y of [G + 1, G + 8, G + 15, G + 22]) S(x, y, z, B.wood);
          const post = x === C - 6 || x === C + 14 || (x - C) % 7 === 1;
          for (let y = G + 2; y <= G + 21; y++) {
            if ((y - G - 1) % 7 === 0) continue;
            if (post) { S(x, y, z, B.woodDk); continue; }
            const shelfY = (y - G - 1) % 7, hgt = 3 + ((hash3(x, (y - G - 1) / 7 | 0, 3) * 3) | 0);
            if (z === SHZ - 1) { S(x, y, z, B.woodDk); continue; }
            if (shelfY > hgt) continue;
            const r = (y - G - 1) / 7 | 0;
            S(x, y, z, r === 1 && x % 5 < 2 ? B.scroll : BK[(hash3(x, r, 9) * 5) | 0]);
          }
        }
      }
      const scr = w.prop({ name: 'scrolls' });
      for (const [x, y] of [[C, G + 10], [C + 6, G + 3], [C + 10, G + 17]]) { scr.box(x, y, SHZ + 2, x + 3, y + 1, SHZ + 2, B.scroll); scr.box(x + 4, y, SHZ + 2, x + 4, y + 1, SHZ + 2, B.page); scr.set(x - 1, y, SHZ + 2, B.wood); }
      for (let z = C - 13; z <= C - 7; z++) for (let x = C - 6; x <= C + 9; x++) S(x, G, z, z === C - 13 || z === C - 7 || x === C - 6 || x === C + 9 ? B.rugE : B.rug);
      // 등받이 의자 둘
      for (const x of [C - 4, C + 6]) {
        const z = C - 14;
        for (const [dx, dz] of [[0, 0], [2, 0], [0, 2], [2, 2]]) w.box(x + dx, G + 1, z + dz, x + dx, G + 2, z + dz, B.woodDk);
        w.box(x, G + 3, z, x + 2, G + 3, z + 2, B.wood); w.box(x, G + 4, z, x + 2, G + 4, z + 2, B.cushion);
        w.box(x, G + 4, z, x + 2, G + 8, z, B.wood); w.box(x + 1, G + 5, z, x + 1, G + 7, z, B.cushion);
      }
      // 작은 탁자와 등
      w.box(C + 12, G + 1, C - 12, C + 12, G + 3, C - 12, B.woodDk); w.box(C + 11, G + 4, C - 13, C + 13, G + 4, C - 11, B.wood);
      S(C + 12, G + 5, C - 12, B.silver); w.box(C + 12, G + 6, C - 12, C + 12, G + 7, C - 12, B.lamp); S(C + 12, G + 8, C - 12, B.trim);
      S(C + 11, G + 5, C - 11, B.book2); S(C + 13, G + 5, C - 13, B.page);
      lights.push({ name: 'shelf', p: [C + 12.5, G + 6, C - 11.5], c: '#c8fff4', i: 0.6, d: 24, flicker: 0.08, srcR: 6 });
      acts.push({
        name: '달 기록 펼치기', hint: '서가의 달 기록 두루마리들이 빠져나와 떠오르며 빛나는 글자를 펼쳐 보여요', hit: [C - 6, G + 1, SHZ - 1, C + 14, G + 18, C - 12],
        run: async a => {
          a.flash('shelf', 3, 4);
          await a.move('scrolls', [0, 6, 10], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([C + 5 + (k % 3) * 4 - 4, G + 16, C - 7], { n: 12, colors: ['#f4f0e0', '#c8fff4', '#ffffff'], speed: 3, up: 2, life: 1.4, gravity: -0.4, spread: 3 }); await a.wait(0.4); }
          await a.move('scrolls', [0, 0, 0], 1.6);
        },
      });

      // 둥근 화분과 벤치(홀 남동쪽), 은 등대
      for (const a of [30, 60]) {
        const r = a * Math.PI / 180, x = Math.round(C + Math.cos(r) * 19), z = Math.round(C + Math.sin(r) * 19);
        w.cyl(x, z, G + 1, G + 3, 2.2, B.marbleDk); w.ring(x, z, G + 3, 1.2, 2.2, B.trim);
        w.line(x, G + 3, z, x - 1, G + 8, z, B.crysT); w.line(x, G + 3, z, x + 1, G + 7, z + 1, B.crysT); S(x - 1, G + 9, z, B.crysP);
      }
      for (let k = 0; k < 7; k++) { const x = C + 15 + k; w.box(x, G + 3, C + 6, x, G + 3, C + 8, B.wood); if (k === 0 || k === 6) w.box(x, G + 1, C + 6, x, G + 2, C + 8, B.woodDk); w.box(x, G + 4, C + 8, x, G + 6, C + 8, k % 2 ? B.wood : B.woodDk); }
      w.box(C + 17, G + 1, C + 12, C + 17, G + 5, C + 12, B.silver); w.box(C + 16, G + 6, C + 11, C + 18, G + 8, C + 13, B.silver); S(C + 17, G + 7, C + 12, B.crysT); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) S(C + 17 + dx, G + 7, C + 12 + dz, B.crysT);
      lights.push({ name: 'hall', p: [C + 17.5, G + 7, C + 12.5], c: '#7af0e0', i: 0.6, d: 24, flicker: 0.1, srcR: 6 });
      return { lights, landmarks, acts };
    },
  });
})();
