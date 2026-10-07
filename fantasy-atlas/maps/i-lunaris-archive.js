// 별빛 서고 안(하위 지도, 2배 해상도) — 월광 첨탑 동쪽 섬의 둥근 도서관 속. 벽을 따라 둥글게 선 서가와 서가 사다리, 가운데 달 기록 탁자,
// 떠도는 책, 돔 천창, 북쪽 숨은 빛 책장, 혼천의와 열람 책상. 남동쪽 반은 낮게 잘랐다 (128칸)
// 세부: 칸막이·선반·높낮이 다른 낱권 책, 창틀·창살 있는 높은 창, 갈빗대와 유리 조각 박힌 돔, 아치 문틀과 판자문, 다리·서랍 있는 책상,
// 놋쇠 테 두른 두루마리 축, 금빛 테 깔개와 널마루. playerScale 2 (사람 키 6.8칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 120, G = 24;
  MAPS.push({
    id: 'lunaris-archive', cat: 'magic', sub: true, parent: 'lunaris', name: '별빛 서고 안', en: 'Lunaris · Starlight Archive', color: '#c8b8ff', seed: 3532, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '달의 기록을 모은 둥근 도서관. 벽을 따라 둥글게 선 서가 사이로 사다리가 미끄러지고, 가운데 탁자에는 달 기록 두루마리가 펼쳐져 있다. 머리 위에서는 책들이 천천히 떠돌고, 돔 천창을 열면 달빛이 쏟아진다.',
    info: { title: '장소 정보', en: 'STARLIGHT ARCHIVE', rows: [['쓰임', '월광 사제단의 서고'], ['가운데', '달 기록 탁자 · 떠도는 책'], ['돔', '여닫는 천창'], ['소문', '북쪽 서가 하나는 빛나는 방으로 열린다']] },
    sky: ['#14304a', '#04080e', '#9adcf0'], stars: true,
    hemi: ['#b8c8f0', '#101428', 0.46], sun: ['#d0e4ff', 0.36, [0.45, 1, 0.5]],
    day: { sky: ['#c8e4f0', '#5a8ab0', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.58], sun: ['#fff8ec', 0.7, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 12, depth: 12, haze: [12, 0.16, 12], hazeColor: '#2a3a5a' },
    camY: 4, zoom: 1.25,
    particles: [
      { n: 120, colors: ['#e0f0ff', '#c8b8ff', '#fff6d8'], mode: 'drift', speed: 0.2, area: [64, 64, 22], y0: G + 4, y1: G + 44, glow: true },
      { n: 60, colors: ['#ffffff', '#d0f8ff'], mode: 'fall', speed: 0.3, area: [64.5, 64.5, 5], y0: G + 6, y1: G + 48, glow: true },
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
      // 2배 해상도 세부용
      marbleJ: { c: '#9aa6b4', v: 0.03 }, woodDk: { c: '#463a46', v: 0.04 }, doorDk: { c: '#36444f', v: 0.03 }, roofB2: { c: '#4a5a88', v: 0.04 },
      spine: { c: '#e8d8a0', v: 0.03 }, cushion: { c: '#6a4a8a', v: 0.03 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 2, 5, z >> 2) > 0.72 ? B.moss : B.path, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const C = 64, R = 24, TOP = G + 32, LOW = G + 4, SH = G + 26;
      const dist = (x, z) => Math.hypot(x - C, z - C), ang = (x, z) => { let a = Math.atan2(z - C, x - C) * 180 / Math.PI; return a < 0 ? a + 360 : a; };
      const back = (x, z) => (x - C) + (z - C) < 2;
      const BK = [B.book1, B.book2, B.book3, B.book4, B.book5];
      const winAt = a => { const m = ((a % 45) + 45) % 45; return m > 19 && m < 26; };

      // ── 바닥: 남빛 널마루(부채꼴로 엇갈림), 가운데 둥근 깔개와 금빛 테, 흰 고리 ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = dist(x, z);
        if (d <= R + 6.4) S(x, G, z, d > R + 1 ? (d > R + 5.4 ? B.trim : B.marbleDk) : (d < 11.2 ? B.rug : ((Math.floor(ang(x, z) / 15) + Math.floor(d / 4)) % 2 ? B.floor : B.floorL)));
      }
      MH.circle(w, C, C, 11.2, B.rugG, 2); MH.circle(w, C, C, 6, B.rugG); MH.circle(w, C, C, 18, B.trim, 2);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; for (let r = 7; r <= 9; r++) S(Math.round(C + Math.cos(a) * r), G, Math.round(C + Math.sin(a) * r), B.rugG); }

      // ── 둥근 벽과 서가: 북서쪽 반은 높은 서가(네 단) 위로 창, 남동쪽 반은 낮은 책장 ──
      for (let z = C - R - 2; z <= C + R + 2; z++) for (let x = C - R - 2; x <= C + R + 2; x++) {
        const d = dist(x, z); if (d <= R - 3 || d > R + 1.2) continue;
        const a = ang(x, z), bk = back(x, z), wall = d > R - 1;
        if (wall) {
          for (let y = G + 1; y <= (bk ? TOP : LOW); y++) {
            let b = (y - G) % 6 === 0 ? B.marbleJ : B.marble;
            if (y <= G + 2 || y === TOP || y === SH + 1 || y === SH + 2) b = B.marbleDk;
            if (!bk && y === LOW) b = B.trim;
            S(x, y, z, b);
          }
          if (bk && winAt(a)) for (let y = G + 6; y <= SH - 2; y++) { const m = ((a % 45) + 45) % 45; S(x, y, z, (m < 20.5 || m > 24.5 || y === G + 6 || y === SH - 2) ? B.trim : (y % 7 === 0 || Math.abs(m - 22.5) < 0.9 ? B.silver : B.win)); }
          continue;
        }
        // 서가 칸(벽 안쪽 두 겹): 칸막이, 선반, 높낮이 다른 책과 빈칸
        const div = Math.abs(((a + 7.5) % 15) - 7.5) < 0.9, gap = bk && winAt(a);
        const tp = bk ? SH : LOW + 2, inner = d <= R - 2;
        for (let y = G + 1; y <= tp; y++) {
          const shelf = y === G + 1 || (y - G - 1) % 6 === 0 || y === tp;
          if (gap) { if (y === G + 1 || y === tp || y === G + 7) S(x, y, z, B.wood); continue; }
          if (div || shelf) { S(x, y, z, div && !inner ? B.woodDk : B.wood); continue; }
          if (!inner) { S(x, y, z, B.woodDk); continue; }
          const row = (y - G - 1) / 6 | 0, slot = Math.floor(a * 2.2), hgt = 2 + ((hash3(slot, row, 7) * 4) | 0), k = (y - G - 1) % 6;
          if (hash3(slot, row, 11) > 0.9 || k > hgt) continue;
          const bc = BK[(hash3(slot, row, 3) * 5) | 0];
          S(x, y, z, k === hgt - 1 && hash3(slot, row, 5) > 0.5 ? B.spine : bc);
        }
      }
      // 돔 갈빗대와 뒤쪽 돔 조각(유리 조각), 천창 고리
      const OY = G + 48, OR_ = 6;
      for (let k = 0; k < 12; k++) {
        const a = k * 30 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
        if ((ca + sa) > 0.2) continue;
        for (let t = 0; t <= 1.001; t += 0.01) { const r = R + 0.6 - (R + 0.6 - OR_) * t, y = TOP + Math.sin(t * Math.PI / 2) * (OY - TOP); for (const o of [0, 1]) S(Math.round(C + ca * (r + o * 0.8)), Math.round(y) + o, Math.round(C + sa * (r + o * 0.8)), B.silver); }
      }
      for (let z = C - R - 1; z <= C + R + 1; z++) for (let x = C - R - 1; x <= C + R + 1; x++) {
        const d = dist(x, z), a = ang(x, z); if (d < OR_ + 1.2 || d > R + 0.8 || a < 195 || a > 255) continue;
        const t = (R + 0.6 - d) / (R + 0.6 - OR_), y = Math.round(TOP + Math.sin(Math.max(0, t) * Math.PI / 2) * (OY - TOP));
        const glass = (Math.floor(a / 6) + Math.floor(d / 3)) % 5 === 0;
        for (const yy of [y, y - 1]) if (!w.get(x, yy, z)) S(x, yy, z, glass ? B.glassS : ((Math.floor(d / 2) & 1) ? B.roofB : B.roofB2));
      }
      w.ring(C, C, OY, OR_, OR_ + 2, B.silver); w.ring(C, C, OY - 1, OR_, OR_ + 1.2, B.marbleDk);
      for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; S(Math.round(C + Math.cos(a) * (OR_ + 1.5)), OY + 1, Math.round(C + Math.sin(a) * (OR_ + 1.5)), k % 2 ? B.trim : B.crysP); }
      // 천창 덮개(부품 둘): 열면 양쪽으로 미끄러진다
      const skyL = w.prop({ name: 'skyL' }), skyR = w.prop({ name: 'skyR' });
      for (let z = C - OR_; z <= C + OR_; z++) for (let x = C - OR_; x <= C + OR_; x++) {
        const d = dist(x, z); if (d > OR_ - 0.4) continue;
        const b = d > OR_ - 1.4 ? B.silver : (x === C || x === C + 1 ? B.silver : ((x + z) % 3 ? B.roofB : B.glassS));
        (x <= C ? skyL : skyR).set(x, OY, z, b);
      }
      lights.push({ name: 'sky', p: [C + 0.5, OY - 2, C + 0.5], c: '#d0f0ff', i: 0.9, d: 52, flicker: 0.03, srcR: 8 });
      acts.push({
        name: '천창 열기', hint: '돔 꼭대기 천창 덮개가 양쪽으로 열리며 달빛이 기둥처럼 쏟아져 내려요', hit: [C - 8, OY - 4, C - 8, C + 8, OY + 4, C + 8],
        run: async a => {
          await Promise.all([a.move('skyL', [-8, 0, 0], 1.6), a.move('skyR', [8, 0, 0], 1.6)]);
          a.flash('sky', 4, 4); a.glow(1.6, 4);
          for (let k = 0; k < 10; k++) { a.burst([C + 0.5, OY - 2, C + 0.5], { n: 18, colors: ['#ffffff', '#d0f8ff', '#fff6d8'], speed: 2, up: -12, life: 2, gravity: 4, spread: 3.2 }); await a.wait(0.35); }
          await Promise.all([a.move('skyL', [0, 0, 0], 1.6), a.move('skyR', [0, 0, 0], 1.6)]);
        },
      });
      landmarks.push({ name: '돔 천창', note: '달빛이 쏟아지는 둥근 창', p: [C + 0.5, OY + 12, C + 0.5] });

      // ── 정문(서쪽, 안쪽): 대리석 아치 문틀, 판자문(징·손잡이), 문 옆 등 ──
      const DX = C - R;
      for (let z = C - 5; z <= C + 5; z++) for (let y = G + 1; y <= G + 15; y++) {
        for (let x = DX - 2; x <= DX + 3; x++) if (dist(x, z) > R - 3.2) S(x, y, z, 0);
        const t = Math.abs(z - C), archTop = G + 11 + Math.round(3 - t * 0.8);
        if (t === 5 || y > archTop) { S(DX, y, z, y === G + 15 ? B.marbleDk : B.trim); continue; }
        S(DX, y, z, z === C ? B.doorDk : ((y - G) % 4 === 0 ? B.woodDk : B.door));
        if ((y === G + 3 || y === G + 8) && t === 3) S(DX + 1, y, z, B.brass);
      }
      for (const z of [C - 1, C + 1]) S(DX + 1, G + 6, z, B.brass);
      S(DX, G + 16, C, B.crysV); S(DX + 1, G + 15, C, B.crysV);
      for (const z of [C - 7, C + 7]) { w.box(DX + 1, G + 1, z, DX + 3, G + 6, z, B.wood); w.box(DX + 1, G + 7, z, DX + 3, G + 7, z, B.woodL); S(DX + 2, G + 8, z, B.brass); S(DX + 2, G + 9, z, B.lamp); S(DX + 2, G + 10, z, B.brass); }
      acts.push(OR.goAct({ at: [DX + 3, G + 1, C], h: 12, hit: [DX, G + 1, C - 3, DX + 2, G + 10, C + 3], name: '밖으로 나가기', goto: 'lunaris', hint: '서고 문을 열고 나가 기둥 현관과 별빛 서고 섬으로 돌아가요' }));
      lights.push({ name: 'door', p: [DX + 3.5, G + 10, C + 0.5], c: '#ffe0a0', i: 0.6, d: 24, flicker: 0.08, srcR: 8 });

      // ── 가운데 달 기록 탁자: 둥근 탁자와 굽은 다리, 빛나는 기록, 양쪽 두루마리 축(부품) ──
      w.cyl(C, C, G + 1, G + 1, 3.6, B.marbleDk); w.cyl(C, C, G + 2, G + 4, 1.8, B.wood); w.cyl(C, C, G + 5, G + 5, 3.2, B.woodDk);
      w.cyl(C, C, G + 6, G + 6, 6.4, B.woodL); w.ring(C, C, G + 6, 5.4, 6.4, B.wood); w.ring(C, C, G + 5, 4.2, 6.2, B.woodDk);
      for (let x = C - 4; x <= C + 4; x++) for (const z of [C - 1, C, C + 1, C + 2]) S(x, G + 7, z, (x * 3 + z) % 5 === 0 ? B.ink : B.page);
      const rollA = w.prop({ name: 'rollA' }), rollB = w.prop({ name: 'rollB' });
      for (let z = C - 1; z <= C + 2; z++) for (const [p, x] of [[rollA, C - 3], [rollB, C + 3]]) { p.box(x - 1, G + 8, z, x, G + 9, z, B.scroll); }
      for (const [p, x] of [[rollA, C - 3], [rollB, C + 3]]) for (const z of [C - 2, C + 3]) p.box(x - 1, G + 8, z, x, G + 9, z, B.brass);
      S(C - 4, G + 7, C - 4, B.brass); S(C - 4, G + 8, C - 4, B.lamp); S(C - 4, G + 9, C - 4, B.brass);
      lights.push({ name: 'table', p: [C + 0.5, G + 9, C + 0.5], c: '#fff0c8', i: 0.8, d: 28, flicker: 0.06, srcR: 6 });
      acts.push({
        name: '달 기록 펼치기', hint: '탁자의 두루마리 축이 양쪽으로 굴러가며 달의 기록이 펼쳐지고 글자가 빛으로 떠올라요', hit: [C - 6, G + 1, C - 6, C + 6, G + 10, C + 6],
        run: async a => {
          await Promise.all([a.move('rollA', [-4, 0, 0], 1), a.move('rollB', [4, 0, 0], 1)]);
          a.flash('table', 3, 4); a.glow(1.4, 4);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5 + ((k % 5) - 2) * 2, G + 8, C + 1], { n: 8, colors: ['#8af0ff', '#f4f0e0', '#ffffff'], speed: 1.2, up: 6, life: 1.6, gravity: -1.2, spread: 1.2 }); await a.wait(0.35); }
          await Promise.all([a.move('rollA', [0, 0, 0], 1), a.move('rollB', [0, 0, 0], 1)]);
        },
      });
      landmarks.push({ name: '달 기록 탁자', note: '달의 기록 두루마리', p: [C + 0.5, G + 18, C + 0.5] });

      // ── 떠도는 책(부품): 탁자 위를 둥글게 돈다(펼친 책·덮은 책) ──
      const books = w.prop({ name: 'books', pivot: [C + 0.5, G + 20, C + 0.5], axis: 'y', speed: 0.3, bob: 0.8, bobSpeed: 0.8 });
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * Math.PI * 2, x = Math.round(C + Math.cos(a) * 12), z = Math.round(C + Math.sin(a) * 12), y = G + 18 + (k % 3) * 2, c = BK[k % 5];
        if (k % 2) {   // 펼친 책: 표지 두 쪽과 흰 속지
          for (let u = -2; u <= 2; u++) for (let v = 0; v < 3; v++) books.set(x + u, y + (Math.abs(u) === 2 ? 1 : 0), z + v - 1, Math.abs(u) === 2 ? c : (u === 0 ? B.spine : B.page));
        } else {
          const alongX = Math.abs(Math.sin(a)) > 0.7;
          for (let u = 0; u < 3; u++) for (let v = 0; v < 4; v++) for (let q = 0; q < 2; q++) { const [bx, bz] = alongX ? [x + u - 1, z + q] : [x + q, z + u - 1]; books.set(bx, y + v, bz, u === 2 && v > 0 && v < 3 ? B.page : c); }
        }
      }
      lights.push({ name: 'books', p: [C + 0.5, G + 20, C + 12.5], c: '#e8e0ff', i: 0.6, d: 28, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '책 띄우기', hint: '떠도는 책들이 높이 솟아올라 빠르게 돌며 빛나는 책장을 흩뿌려요', hit: [C - 14, G + 14, C - 14, C + 14, G + 26, C + 14],
        run: async a => {
          a.flash('books', 3, 5); a.spin('books', 8, 5);
          await a.move('books', [0, 10, 0], 1.4);
          for (let k = 0; k < 8; k++) { a.burst([C + 0.5, G + 30, C + 0.5], { n: 18, colors: ['#f4f0e0', '#c8b8ff', '#ffffff'], speed: 12, up: 2, life: 1.8, gravity: 1.2, spread: 6 }); await a.wait(0.4); }
          await a.move('books', [0, 0, 0], 1.6);
        },
      });

      // ── 서가 사다리(부품): 가운데 축을 돌아 서가를 따라 미끄러진다 ──
      const la = 225 * Math.PI / 180, lc = Math.cos(la), ls = Math.sin(la), tx = -ls, tz = lc;
      const ladder = w.prop({ name: 'ladder', pivot: [C + 0.5, G + 1, C + 0.5], axis: 'y' });
      for (let y = G + 1; y <= SH; y++) {
        const r = 18.4 + (y - G) * 0.07;
        for (const o of [-2, 2]) ladder.set(Math.round(C + lc * r + tx * o), y, Math.round(C + ls * r + tz * o), B.brass);
        if (y % 3 === 0) for (const o of [-1, 0, 1]) ladder.set(Math.round(C + lc * r + tx * o), y, Math.round(C + ls * r + tz * o), B.wood);
      }
      for (const o of [-2, 2]) ladder.set(Math.round(C + lc * 18.4 + tx * o), G + 1, Math.round(C + ls * 18.4 + tz * o), B.woodDk);
      acts.push({
        name: '서가 사다리', hint: '서가 사다리가 둥근 서가를 따라 드르륵 미끄러졌다가 돌아와요', hit: [44, G + 1, 44, 54, SH, 54],
        run: async a => {
          await a.turn('ladder', [0, -0.9, 0], 2); a.burst([C + 0.5 + Math.cos(la + 0.9) * 20, G + 16, C + 0.5 + Math.sin(la + 0.9) * 20], { n: 12, colors: ['#e8e0d0', '#c8b8ff'], speed: 4, up: 2, life: 1, gravity: 2, spread: 3 });
          await a.wait(0.6); await a.turn('ladder', [0, 0.7, 0], 2.6); await a.wait(0.6); await a.turn('ladder', [0, 0, 0], 1.4);
        },
      });

      // ── 빛 책장: 북쪽 서가 한 칸이 문처럼 열리며 빛나는 숨은 방(부품) ──
      const HZ = C - R + 2;   // 서가 안쪽 면(z = 42)
      for (let x = C - 4; x <= C + 4; x++) for (let y = G + 1; y <= SH; y++) for (let z = HZ - 6; z <= HZ; z++) S(x, y, z, 0);
      for (let x = C - 6; x <= C + 6; x++) for (let y = G + 1; y <= G + 18; y++) S(x, y, HZ - 7, Math.abs(x - C) === 6 || y === G + 18 ? B.marbleDk : ((x + y) % 4 === 0 ? B.crysP : B.crysV));
      for (const x of [C - 5, C + 5]) w.box(x, G + 1, HZ - 6, x, G + 18, HZ, B.marbleDk);
      w.box(C - 4, G + 18, HZ - 6, C + 4, SH, HZ - 1, B.marble); w.box(C - 4, G + 18, HZ, C + 4, SH, HZ, B.wood);
      for (let z = HZ - 6; z <= HZ; z++) for (let x = C - 4; x <= C + 4; x++) S(x, G, z, (x + z) % 2 ? B.marbleDk : B.marble);
      w.box(C - 1, G + 1, HZ - 5, C + 1, G + 2, HZ - 3, B.marbleDk); w.box(C, G + 3, HZ - 4, C, G + 6, HZ - 4, B.crysP); S(C - 1, G + 4, HZ - 4, B.crysP); S(C + 1, G + 4, HZ - 4, B.crysP); S(C, G + 7, HZ - 4, B.crysV);
      const hs = w.prop({ name: 'hshelf', pivot: [C - 4, G + 1, HZ + 1], axis: 'y' });
      for (let x = C - 4; x <= C + 4; x++) for (let y = G + 1; y <= G + 17; y++) hs.set(x, y, HZ, x === C - 4 || x === C + 4 || (y - G - 1) % 6 === 0 || y === G + 17 ? B.wood : ((x + y) % 4 === 0 ? B.page : BK[(hash3(x, (y - G - 1) / 6 | 0, 1) * 5) | 0]));
      lights.push({ name: 'hidden', p: [C + 0.5, G + 8, HZ - 3.5], c: '#c8a8ff', i: 1, d: 28, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '빛 책장', hint: '북쪽 서가 한 칸이 스르륵 열리며 보랏빛 숨은 방과 달 수정이 드러나요', hit: [C - 5, G + 1, HZ - 1, C + 5, G + 17, HZ + 2],
        run: async a => {
          await a.turn('hshelf', [0, -1.4, 0], 1.6);
          a.flash('hidden', 4, 3.5); a.glow(1.5, 3.5);
          for (let k = 0; k < 6; k++) { a.burst([C + 0.5, G + 8, HZ - 2], { n: 14, colors: ['#c8a8ff', '#ffffff', '#d0f8ff'], speed: 5, up: 4, life: 1.4, gravity: -0.4, spread: 3 }); await a.wait(0.45); }
          await a.wait(0.6); await a.turn('hshelf', [0, 0, 0], 1.6);
        },
      });

      // ── 혼천의(부품 고리 둘)와 열람 책상 둘 ──
      const QX = 76, QZ = 76;
      w.cyl(QX, QZ, G + 1, G + 1, 2.6, B.marbleDk); w.cyl(QX, QZ, G + 2, G + 2, 1.6, B.brass); w.box(QX, G + 3, QZ, QX, G + 6, QZ, B.brass);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) S(QX + dx, G + 3, QZ + dz, B.brass);
      w.box(QX, G + 11, QZ, QX, G + 13, QZ, B.crysP); S(QX + 1, G + 12, QZ, B.crysP); S(QX - 1, G + 12, QZ, B.crysP); S(QX, G + 12, QZ + 1, B.crysP); S(QX, G + 12, QZ - 1, B.crysP);
      const q1 = w.prop({ name: 'ring1', pivot: [QX + 0.5, G + 12.5, QZ + 0.5], axis: 'y', speed: 0.5 }); MH.ringProp(q1, QX, G + 12, QZ, 5.2, 'xy', B.brass, B.crysT, 8);
      const q2 = w.prop({ name: 'ring2', pivot: [QX + 0.5, G + 12.5, QZ + 0.5], axis: 'x', speed: -0.4 }); MH.ringProp(q2, QX, G + 12, QZ, 3.6, 'xz', B.silver, B.crysV, 6);
      lights.push({ name: 'globe', p: [QX + 0.5, G + 12.5, QZ + 0.5], c: '#a0f0ff', i: 0.7, d: 24, flicker: 0.05, srcR: 6 });
      acts.push({
        name: '혼천의', hint: '놋쇠 혼천의의 고리들이 빠르게 돌며 별자리 빛점을 흩뿌려요', hit: [QX - 6, G + 1, QZ - 6, QX + 6, G + 18, QZ + 6],
        run: async a => {
          a.flash('globe', 3, 4); a.spin('ring1', 8, 4); a.spin('ring2', 8, 4);
          for (let k = 0; k < 8; k++) { a.burst([QX + 0.5, G + 12.5, QZ + 0.5], { n: 14, colors: ['#7af0e0', '#c8a8ff', '#ffffff'], speed: 10, up: 2, life: 1.2, gravity: 0.4, spread: 4 }); await a.wait(0.4); }
        },
      });
      // 열람 책상: 다리 넷, 서랍, 등, 펼친 책; 등받이 의자
      const desk = (x, z, alongZ) => {
        const P = (u, v) => alongZ ? [x + v, z + u] : [x + u, z + v];   // u: 길이(0..7), v: 폭(0..3)
        for (let u = 0; u < 8; u++) for (let v = 0; v < 4; v++) { const [px, pz] = P(u, v); S(px, G + 5, pz, B.woodL); if ((u === 0 || u === 7) && (v === 0 || v === 3)) w.box(px, G + 1, pz, px, G + 4, pz, B.wood); if (v === 0 && u > 0 && u < 7) S(px, G + 4, pz, u === 3 || u === 4 ? B.brass : B.woodDk); }
        { const [px, pz] = P(1, 3); S(px, G + 6, pz, B.brass); S(px, G + 7, pz, B.lamp); S(px, G + 8, pz, B.brass); }
        for (let u = 3; u <= 6; u++) for (let v = 1; v <= 2; v++) { const [px, pz] = P(u, v); S(px, G + 6, pz, u === 3 || u === 6 ? B.book2 : B.page); }
        for (let u = 2; u <= 4; u++) for (let v = -3; v <= -2; v++) { const [px, pz] = P(u, v); S(px, G + 3, pz, B.cushion); if ((u === 2 || u === 4)) S(px, G + 2, pz, B.wood); if (u === 2 || u === 4) S(px, G + 1, pz, B.wood); }
        for (let u = 2; u <= 4; u++) { const [px, pz] = P(u, -4); w.box(px, G + 1, pz, px, G + 7, pz, u === 3 ? B.cushion : B.wood); }
      };
      desk(80, 58, true); desk(58, 80, false);
      lights.push({ name: 'desk', p: [83.5, G + 7, 59.5], c: '#ffe0a0', i: 0.6, d: 20, flicker: 0.1, srcR: 6 });
      // 바닥에 쌓인 책(엇갈려 쌓기), 수정 화분
      for (const [x, z, h] of [[54, 78, 4], [78, 52, 3], [48, 60, 3], [70, 52, 2]]) for (let y = 0; y < h; y++) { const o = y % 2; w.box(x + o, G + 1 + y, z, x + 2 + o, G + 1 + y, z + 1, BK[(x + y) % 5]); S(x + o, G + 1 + y, z + 1, B.page); }
      for (const [x, z] of [[82, 70], [70, 82]]) { w.cyl(x, z, G + 1, G + 3, 1.8, B.marbleDk); w.ring(x, z, G + 3, 0.9, 1.8, B.trim); w.line(x, G + 3, z, x, G + 8, z, B.crysT); w.line(x, G + 3, z, x + 1, G + 6, z - 1, B.crysT); S(x, G + 9, z, B.crysP); }
      return { lights, landmarks, acts };
    },
  });
})();
