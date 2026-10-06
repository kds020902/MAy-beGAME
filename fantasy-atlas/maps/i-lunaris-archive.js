// 별빛 서고 안(하위 지도) — 월광 첨탑 동쪽 섬의 둥근 도서관 속. 벽을 따라 둥글게 선 서가와 서가 사다리, 가운데 달 기록 탁자,
// 떠도는 책, 돔 천창, 북쪽 숨은 빛 책장, 혼천의와 열람 책상. 남동쪽 반은 낮게 잘랐다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 60, G = 12;
  MAPS.push({
    id: 'lunaris-archive', cat: 'magic', sub: true, parent: 'lunaris', name: '별빛 서고 안', en: 'Lunaris · Starlight Archive', color: '#c8b8ff', seed: 3532, base: G, time: 'night', size: [W, D, Hh],
    desc: '달의 기록을 모은 둥근 도서관. 벽을 따라 둥글게 선 서가 사이로 사다리가 미끄러지고, 가운데 탁자에는 달 기록 두루마리가 펼쳐져 있다. 머리 위에서는 책들이 천천히 떠돌고, 돔 천창을 열면 달빛이 쏟아진다.',
    info: { title: '장소 정보', en: 'STARLIGHT ARCHIVE', rows: [['쓰임', '월광 사제단의 서고'], ['가운데', '달 기록 탁자 · 떠도는 책'], ['돔', '여닫는 천창'], ['소문', '북쪽 서가 하나는 빛나는 방으로 열린다']] },
    sky: ['#14304a', '#04080e', '#9adcf0'], stars: true,
    hemi: ['#b8c8f0', '#101428', 0.46], sun: ['#d0e4ff', 0.36, [0.45, 1, 0.5]],
    day: { sky: ['#c8e4f0', '#5a8ab0', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.58], sun: ['#fff8ec', 0.7, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 6, depth: 6, haze: [6, 0.16, 6], hazeColor: '#2a3a5a' },
    camY: 2, zoom: 1.25,
    particles: [
      { n: 80, colors: ['#e0f0ff', '#c8b8ff', '#fff6d8'], mode: 'drift', speed: 0.1, area: [32, 32, 11], y0: G + 2, y1: G + 22, glow: true },
      { n: 40, colors: ['#ffffff', '#d0f8ff'], mode: 'fall', speed: 0.15, area: [32.5, 32.5, 2.5], y0: G + 3, y1: G + 24, glow: true },
    ],
    blocks: {
      moss: { c: '#3a4a50', top: '#4a7a7a', v: 0.1 }, dirt: { c: '#3a4a50', v: 0.08 }, rock: { c: '#7a8494', v: 0.06, pat: 'big' }, path: { c: '#2a3a44', top: '#5a6a78', v: 0.05, pat: 'stone' },
      marble: { c: '#e8eef4', v: 0.03, pat: 'big' }, marbleDk: { c: '#b8c4d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f8fa', v: 0.02 }, silver: { c: '#c8d4e0', v: 0.04 }, roofB: { c: '#5a6a9a', v: 0.04, pat: 'tile' },
      floor: { c: '#4a4a6a', top: '#5a5a80', v: 0.04, pat: 'plank' }, floorL: { c: '#5a5a7a', top: '#6a6a90', v: 0.04, pat: 'plank' }, rug: { c: '#2a3a6a', v: 0.04, pat: 'check', alt: '#33457a' }, rugG: { c: '#c8a860', v: 0.04 },
      wood: { c: '#5a4a5a', v: 0.05, pat: 'plank' }, woodL: { c: '#7a6a7a', v: 0.05, pat: 'plank' }, door: { c: '#4a5a6a', v: 0.03, pat: 'plank' },
      book1: { c: '#5a7ac8', v: 0.05 }, book2: { c: '#c87a9a', v: 0.05 }, book3: { c: '#d8c88a', v: 0.05 }, book4: { c: '#6a9a8a', v: 0.05 }, book5: { c: '#8a5ab0', v: 0.05 },
      page: { c: '#f4f0e0', glow: true }, scroll: { c: '#efe6cc', v: 0.03 }, ink: { c: '#8af0ff', glow: true },
      win: { c: '#c8f4ff', glow: true }, glassS: { c: '#a8d8ff', glow: true }, lamp: { c: '#ffe0a0', glow: true }, crysP: { c: '#d0f8ff', glow: true }, crysV: { c: '#c8a8ff', glow: true }, crysT: { c: '#7af0e0', glow: true },
      brass: { c: '#c8a860', v: 0.05 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x >> 1, 5, z >> 1) > 0.72 ? B.moss : B.path, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const C = 32, R = 12, TOP = G + 16, LOW = G + 2, SH = G + 13;
      const dist = (x, z) => Math.hypot(x - C, z - C), ang = (x, z) => { let a = Math.atan2(z - C, x - C) * 180 / Math.PI; return a < 0 ? a + 360 : a; };
      const back = (x, z) => (x - C) + (z - C) < 1;
      const BK = [B.book1, B.book2, B.book3, B.book4, B.book5];

      // ── 바닥: 남빛 널마루, 가운데 둥근 깔개와 금빛 테 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = dist(x, z);
        if (d <= R + 3.2) S(x, G, z, d > R + 0.5 ? B.marbleDk : (d < 5.6 ? B.rug : ((Math.floor(ang(x, z) / 15) + Math.floor(d / 3)) % 2 ? B.floor : B.floorL)));
      }
      MH.circle(w, C, C, 5.6, B.rugG); MH.circle(w, C, C, 9, B.trim);

      // ── 둥근 벽과 서가: 북서쪽 반은 높은 서가(3단) 위로 창, 남동쪽 반은 낮은 책장 ──
      for (let z = C - R - 1; z <= C + R + 1; z++) for (let x = C - R - 1; x <= C + R + 1; x++) {
        const d = dist(x, z); if (d <= R - 1.5 || d > R + 0.6) continue;
        const a = ang(x, z), bk = back(x, z), wall = d > R - 0.5;
        if (wall) {
          for (let y = G + 1; y <= (bk ? TOP : LOW); y++) S(x, y, z, y === G + 1 || y === TOP || y === SH + 1 ? B.marbleDk : (!bk && y === LOW ? B.trim : B.marble));
          if (bk && Math.round(a) % 45 === 22) for (let y = G + 3; y <= SH - 1; y++) S(x, y, z, B.win);
          continue;
        }
        // 서가 칸(벽 안쪽 한 겹)
        const div = Math.round(a) % 15 === 0, gap = bk && Math.round(a) % 45 === 22;
        const top = bk ? SH : LOW;
        for (let y = G + 1; y <= top; y++) {
          if (gap) { if (y === G + 1 || y === top) S(x, y, z, B.wood); continue; }
          const shelf = y === G + 1 || (y - G - 1) % 4 === 0 || y === top;
          S(x, y, z, div || shelf ? B.wood : (hash3(x, y, z) > 0.88 ? 0 : BK[(hash3(x, y >> 1, z) * 5) | 0]));
        }
      }
      // 돔 갈빗대와 뒤쪽 돔 조각, 천창 고리
      const OY = G + 24, OR_ = 3;
      for (let k = 0; k < 12; k++) {
        const a = k * 30 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
        if ((ca + sa) > 0.2) continue;
        for (let t = 0; t <= 1.001; t += 0.02) { const r = R + 0.3 - (R + 0.3 - OR_) * t, y = TOP + Math.sin(t * Math.PI / 2) * (OY - TOP); S(Math.round(C + ca * r), Math.round(y), Math.round(C + sa * r), B.silver); }
      }
      for (let z = C - R; z <= C + R; z++) for (let x = C - R; x <= C + R; x++) {
        const d = dist(x, z), a = ang(x, z); if (d < OR_ + 0.6 || d > R + 0.4 || a < 195 || a > 255) continue;
        const t = (R + 0.3 - d) / (R + 0.3 - OR_), y = Math.round(TOP + Math.sin(Math.max(0, t) * Math.PI / 2) * (OY - TOP));
        if (!w.get(x, y, z)) S(x, y, z, (Math.round(a) + Math.round(d)) % 7 === 0 ? B.glassS : B.roofB);
      }
      w.ring(C, C, OY, OR_, OR_ + 1, B.silver);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; S(Math.round(C + Math.cos(a) * (OR_ + 1)), OY + 1, Math.round(C + Math.sin(a) * (OR_ + 1)), k % 2 ? B.trim : B.crysP); }
      // 천창 덮개(부품 둘): 열면 양쪽으로 미끄러진다
      const skyL = w.prop({ name: 'skyL' }), skyR = w.prop({ name: 'skyR' });
      for (let z = C - OR_; z <= C + OR_; z++) for (let x = C - OR_; x <= C + OR_; x++) {
        if (dist(x, z) > OR_ - 0.4) continue;
        (x <= C ? skyL : skyR).set(x, OY, z, (x + z) % 3 ? B.roofB : B.glassS);
      }
      lights.push({ name: 'sky', p: [C + 0.5, OY - 1, C + 0.5], c: '#d0f0ff', i: 0.9, d: 26, flicker: 0.03, srcR: 4 });
      acts.push({
        name: '천창 열기', hint: '돔 꼭대기 천창 덮개가 양쪽으로 열리며 달빛이 기둥처럼 쏟아져 내려요', hit: [C - 4, OY - 2, C - 4, C + 4, OY + 2, C + 4],
        run: async a => {
          await Promise.all([a.move('skyL', [-4, 0, 0], 1.6), a.move('skyR', [4, 0, 0], 1.6)]);
          a.flash('sky', 4, 4); a.glow(1.6, 4);
          for (let k = 0; k < 10; k++) { a.burst([C + 0.5, OY - 1, C + 0.5], { n: 18, colors: ['#ffffff', '#d0f8ff', '#fff6d8'], speed: 1, up: -6, life: 2, gravity: 2, spread: 1.6 }); await a.wait(0.35); }
          await Promise.all([a.move('skyL', [0, 0, 0], 1.6), a.move('skyR', [0, 0, 0], 1.6)]);
        },
      });
      landmarks.push({ name: '돔 천창', note: '달빛이 쏟아지는 둥근 창', p: [C + 0.5, OY + 6, C + 0.5] });

      // ── 정문(서쪽, 안쪽): 대리석 아치 문틀과 판자 문짝 ──
      for (let z = 30; z <= 34; z++) for (let y = G + 1; y <= G + 7; y++) {
        for (let x = 19; x <= 21; x++) if (dist(x, z) > R - 1.5) S(x, y, z, 0);
        const edge = z === 30 || z === 34 || y === G + 7 || (y === G + 6 && (z === 31 || z === 33));
        S(20, y, z, edge ? B.trim : (y <= G + 5 ? B.door : B.marbleDk));
        if (y > G + 7 - 1 && (z === 30 || z === 34)) S(21, y, z, B.wood);
      }
      S(20, G + 8, 32, B.crysV); S(21, G + 4, 29, B.lamp); S(21, G + 4, 35, B.lamp);
      for (const z of [29, 35]) w.box(21, G + 1, z, 21, G + 3, z, B.wood);
      acts.push(OR.goAct({ at: [21, G + 1, 32], h: 6, hit: [20, G + 1, 31, 21, G + 5, 33], name: '밖으로 나가기', goto: 'lunaris', hint: '서고 문을 열고 나가 기둥 현관과 별빛 서고 섬으로 돌아가요' }));
      lights.push({ name: 'door', p: [21.5, G + 5, 32.5], c: '#ffe0a0', i: 0.6, d: 12, flicker: 0.08, srcR: 4 });

      // ── 가운데 달 기록 탁자: 둥근 탁자, 빛나는 기록, 양쪽 두루마리 축(부품) ──
      w.cyl(C, C, G + 1, G + 1, 1.3, B.marbleDk); w.cyl(C, C, G + 2, G + 2, 3.2, B.woodL); w.ring(C, C, G + 2, 2.6, 3.2, B.wood);
      for (let x = C - 2; x <= C + 2; x++) for (const z of [C, C + 1]) S(x, G + 3, z, (x + z) % 3 === 0 ? B.ink : B.page);
      const rollA = w.prop({ name: 'rollA' }), rollB = w.prop({ name: 'rollB' });
      for (const z of [C, C + 1]) { rollA.box(C - 1, G + 4, z, C - 1, G + 4, z, B.scroll); rollB.box(C + 1, G + 4, z, C + 1, G + 4, z, B.scroll); }
      rollA.set(C - 1, G + 4, C - 1, B.brass); rollA.set(C - 1, G + 4, C + 2, B.brass); rollB.set(C + 1, G + 4, C - 1, B.brass); rollB.set(C + 1, G + 4, C + 2, B.brass);
      S(C - 2, G + 3, C - 2, B.lamp);
      lights.push({ name: 'table', p: [C + 0.5, G + 4, C + 0.5], c: '#fff0c8', i: 0.8, d: 14, flicker: 0.06, srcR: 3 });
      acts.push({
        name: '달 기록 펼치기', hint: '탁자의 두루마리 축이 양쪽으로 굴러가며 달의 기록이 펼쳐지고 글자가 빛으로 떠올라요', hit: [C - 3, G + 1, C - 3, C + 3, G + 5, C + 3],
        run: async a => {
          await Promise.all([a.move('rollA', [-2, 0, 0], 1), a.move('rollB', [2, 0, 0], 1)]);
          a.flash('table', 3, 4); a.glow(1.4, 4);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5 + (k % 5) - 2, G + 4, C + 1], { n: 8, colors: ['#8af0ff', '#f4f0e0', '#ffffff'], speed: 0.6, up: 3, life: 1.6, gravity: -0.6, spread: 0.6 }); await a.wait(0.35); }
          await Promise.all([a.move('rollA', [0, 0, 0], 1), a.move('rollB', [0, 0, 0], 1)]);
        },
      });
      landmarks.push({ name: '달 기록 탁자', note: '달의 기록 두루마리', p: [C + 0.5, G + 9, C + 0.5] });

      // ── 떠도는 책(부품): 탁자 위를 둥글게 돈다 ──
      const books = w.prop({ name: 'books', pivot: [C + 0.5, G + 10, C + 0.5], axis: 'y', speed: 0.3, bob: 0.4, bobSpeed: 0.8 });
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * Math.PI * 2, x = Math.round(C + Math.cos(a) * 6), z = Math.round(C + Math.sin(a) * 6), y = G + 9 + (k % 3), c = BK[k % 5];
        books.box(x, y, z, x, y + 1, z, c); books.set(x + (Math.abs(Math.cos(a)) > 0.7 ? 0 : 1), y, z + (Math.abs(Math.cos(a)) > 0.7 ? 1 : 0), B.page);
      }
      lights.push({ name: 'books', p: [C + 0.5, G + 10, C + 6.5], c: '#e8e0ff', i: 0.6, d: 14, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '책 띄우기', hint: '떠도는 책들이 높이 솟아올라 빠르게 돌며 빛나는 책장을 흩뿌려요', hit: [C - 7, G + 7, C - 7, C + 7, G + 13, C + 7],
        run: async a => {
          a.flash('books', 3, 5); a.spin('books', 8, 5);
          await a.move('books', [0, 5, 0], 1.4);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5, G + 15, C + 0.5], { n: 18, colors: ['#f4f0e0', '#c8b8ff', '#ffffff'], speed: 6, up: 1, life: 1.8, gravity: 0.6, spread: 3 }); await a.wait(0.4); }
          await a.move('books', [0, 0, 0], 1.6);
        },
      });

      // ── 서가 사다리(부품): 가운데 축을 돌아 서가를 따라 미끄러진다 ──
      const la = 225 * Math.PI / 180, lc = Math.cos(la), ls = Math.sin(la), tx = -ls, tz = lc;
      const ladder = w.prop({ name: 'ladder', pivot: [C + 0.5, G + 1, C + 0.5], axis: 'y' });
      for (let y = G + 1; y <= SH; y++) {
        const r = 9.4 + (y - G) * 0.04;
        for (const o of [-1, 1]) ladder.set(Math.round(C + lc * r + tx * o), y, Math.round(C + ls * r + tz * o), B.brass);
        if (y % 2 === 0) ladder.set(Math.round(C + lc * r), y, Math.round(C + ls * r), B.wood);
      }
      acts.push({
        name: '서가 사다리', hint: '서가 사다리가 둥근 서가를 따라 드르륵 미끄러졌다가 돌아와요', hit: [22, G + 1, 22, 27, SH, 27],
        run: async a => {
          await a.turn('ladder', [0, -0.9, 0], 2); a.burst([C + 0.5 + Math.cos(la + 0.9) * 10, G + 8, C + 0.5 + Math.sin(la + 0.9) * 10], { n: 12, colors: ['#e8e0d0', '#c8b8ff'], speed: 2, up: 1, life: 1, gravity: 1, spread: 1.5 });
          await a.wait(0.6); await a.turn('ladder', [0, 0.7, 0], 2.6); await a.wait(0.6); await a.turn('ladder', [0, 0, 0], 1.4);
        },
      });

      // ── 빛 책장: 북쪽 서가 한 칸이 문처럼 열리며 빛나는 숨은 방(부품) ──
      const HZ = C - R + 1;   // 서가 칸(z = 21)
      for (let x = C - 2; x <= C + 2; x++) for (let y = G + 1; y <= SH; y++) { S(x, y, HZ, 0); S(x, y, HZ - 1, 0); S(x, y, HZ - 2, 0); }
      for (let x = C - 3; x <= C + 3; x++) for (let y = G + 1; y <= G + 9; y++) S(x, y, HZ - 3, Math.abs(x - C) === 3 || y === G + 9 ? B.marbleDk : B.crysV);
      for (const x of [C - 3, C + 3]) w.box(x, G + 1, HZ - 2, x, G + 9, HZ, B.marbleDk);
      w.box(C - 2, G + 9, HZ - 2, C + 2, SH, HZ - 1, B.marble); w.box(C - 2, G + 9, HZ, C + 2, SH, HZ, B.wood);
      S(C, G + 1, HZ - 2, B.marbleDk); S(C, G + 2, HZ - 2, B.crysP); S(C, G + 3, HZ - 2, B.crysP);
      const hs = w.prop({ name: 'hshelf', pivot: [C - 2, G + 1, HZ + 1], axis: 'y' });
      for (let x = C - 2; x <= C + 2; x++) for (let y = G + 1; y <= G + 8; y++) hs.set(x, y, HZ, x === C - 2 || x === C + 2 || (y - G - 1) % 4 === 0 ? B.wood : ((x + y) % 4 === 0 ? B.page : BK[(x + y) % 5]));
      lights.push({ name: 'hidden', p: [C + 0.5, G + 4, HZ - 1.5], c: '#c8a8ff', i: 1, d: 14, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '빛 책장', hint: '북쪽 서가 한 칸이 스르륵 열리며 보랏빛 숨은 방과 달 수정이 드러나요', hit: [C - 3, G + 1, HZ - 1, C + 3, G + 9, HZ + 1],
        run: async a => {
          await a.turn('hshelf', [0, -1.4, 0], 1.6);
          a.flash('hidden', 4, 3.5); a.glow(1.5, 3.5);
          for (let k = 0; k < 6; k++) { a.burst([C + 0.5, G + 4, HZ - 1], { n: 14, colors: ['#c8a8ff', '#ffffff', '#d0f8ff'], speed: 2.5, up: 2, life: 1.4, gravity: -0.2, spread: 1.5 }); await a.wait(0.45); }
          await a.wait(0.6); await a.turn('hshelf', [0, 0, 0], 1.6);
        },
      });

      // ── 혼천의(부품 고리 둘)와 열람 책상 둘 ──
      const QX = 38, QZ = 38;
      w.box(QX, G + 1, QZ, QX, G + 2, QZ, B.brass); w.cyl(QX, QZ, G + 1, G + 1, 1.3, B.marbleDk); S(QX, G + 6, QZ, B.crysP);
      const q1 = w.prop({ name: 'ring1', pivot: [QX + 0.5, G + 6.5, QZ + 0.5], axis: 'y', speed: 0.5 }); MH.ringProp(q1, QX, G + 6, QZ, 2.6, 'xy', B.brass, B.crysT, 6);
      const q2 = w.prop({ name: 'ring2', pivot: [QX + 0.5, G + 6.5, QZ + 0.5], axis: 'x', speed: -0.4 }); MH.ringProp(q2, QX, G + 6, QZ, 1.8, 'xz', B.silver, B.crysV, 4);
      lights.push({ name: 'globe', p: [QX + 0.5, G + 6.5, QZ + 0.5], c: '#a0f0ff', i: 0.7, d: 12, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '혼천의', hint: '놋쇠 혼천의의 고리들이 빠르게 돌며 별자리 빛점을 흩뿌려요', hit: [QX - 3, G + 1, QZ - 3, QX + 3, G + 9, QZ + 3],
        run: async a => {
          a.flash('globe', 3, 4); a.spin('ring1', 8, 4); a.spin('ring2', 8, 4);
          for (let k = 0; k < 8; k++) { a.burst([QX + 0.5, G + 6.5, QZ + 0.5], { n: 14, colors: ['#7af0e0', '#c8a8ff', '#ffffff'], speed: 5, up: 1, life: 1.2, gravity: 0.2, spread: 2 }); await a.wait(0.4); }
        },
      });
      for (const [x, z, ax] of [[41, 30, 'z'], [30, 41, 'x']]) {
        if (ax === 'z') { w.box(x, G + 2, z, x + 1, G + 2, z + 3, B.woodL); for (const zz of [z, z + 3]) S(x, G + 1, zz, B.wood); S(x - 1, G + 1, z + 1, B.wood); S(x + 1, G + 3, z, B.lamp); S(x, G + 3, z + 2, B.book2); S(x + 1, G + 3, z + 2, B.page); }
        else { w.box(x, G + 2, z, x + 3, G + 2, z + 1, B.woodL); for (const xx of [x, x + 3]) S(xx, G + 1, z, B.wood); S(x + 1, G + 1, z - 1, B.wood); S(x, G + 3, z + 1, B.lamp); S(x + 2, G + 3, z, B.book1); S(x + 2, G + 3, z + 1, B.page); }
      }
      lights.push({ name: 'desk', p: [41.5, G + 4, 30.5], c: '#ffe0a0', i: 0.6, d: 10, flicker: 0.1, srcR: 3 });
      // 바닥에 쌓인 책, 수정 화분
      for (const [x, z, h] of [[27, 39, 3], [39, 26, 2], [24, 30, 2], [35, 26, 1]]) for (let y = 0; y < h; y++) S(x, G + 1 + y, z, BK[(x + y) % 5]);
      for (const [x, z] of [[41, 35], [35, 41]]) { S(x, G + 1, z, B.marbleDk); S(x, G + 2, z, B.crysT); }
      return { lights, landmarks, acts };
    },
  });
})();
