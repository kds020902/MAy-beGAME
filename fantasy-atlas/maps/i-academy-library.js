// 대도서관(하위 지도) — 학원 구역 푸른 돔 도서관 안. 가운데 돔 아래 둥근 열람실(여덟 기둥·열람 탁자·초록 등), 서쪽 서가 미로와 굴리는 사다리,
// 남서쪽 쇠창살 안 금서 서고(사슬에 묶인 책), 동쪽 정문 옆 사서 책상과 종, 북·서쪽 벽을 채운 높은 서가와 큰 창.
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄고 돔은 뒤쪽 갈빗대만 남겼다. 좌표: +x 동쪽, +z 남쪽. 정문은 동쪽 (학원 구역의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 72, Hh = 56, G = 12;
  const X0 = 16, X1 = 55, Z0 = 12, Z1 = 59, CX = 36, CZ = 36, DZ = 36;   // 벽 안쪽 경계, 돔 중심, 정문 가운데 z
  MAPS.push({
    id: 'academy-library', cat: 'magic', sub: true, parent: 'academy', name: '대도서관', en: 'Arcanum Academy · Grand Library', color: '#7a9aff', seed: 3012, base: G, time: 'night', size: [W, D, Hh],
    desc: '학원 구역 푸른 돔 아래의 대도서관. 여덟 기둥이 받친 돔 밑 둥근 열람실에는 초록 등을 켠 열람 탁자가 놓였고, 서쪽으로는 굴리는 사다리를 단 높은 서가가 미로처럼 늘어섰다. 남서쪽 쇠창살 안 금서 서고에는 사슬에 묶인 책들이 잠들어 있고, 정문 옆 사서 책상의 작은 종이 조용히 하라고 일러 준다.',
    info: { title: '장소 정보', en: 'GRAND LIBRARY', rows: [['열람실', '돔 아래 둥근 방 · 열람 탁자'], ['서가', '굴리는 사다리를 단 서가 미로'], ['금서 서고', '쇠창살 · 사슬에 묶인 책'], ['규칙', '사서 종이 울리면 조용히']] },
    sky: ['#2a3060', '#0c0e24', '#90a0ff'], stars: true,
    hemi: ['#d0d8ff', '#2a2440', 0.6], sun: ['#e0e4ff', 0.48, [0.45, 1, 0.5]],
    day: { sky: ['#dce0f8', '#7a8ae0', '#fff8f0'], stars: false, hemi: ['#ffffff', '#4a4660', 0.62], sun: ['#fff4e8', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 10, depth: 6 },
    camY: 0, zoom: 1.9,
    spawn: [X1 - 3, G + 1, DZ],
    particles: [
      { n: 110, colors: ['#fff6d8', '#e8e0c8', '#c8d0ff'], mode: 'drift', speed: 0.1, area: [CX, CZ, 20], y0: G + 2, y1: G + 18, glow: true },
      { n: 30, colors: ['#a0d0ff', '#ffffff'], mode: 'fall', speed: 0.12, area: [CX, CZ, 4], y0: G + 6, y1: G + 26, glow: true },
    ],
    blocks: {
      grass: { c: '#4a3a3a', top: '#4a7a58', v: 0.08 }, rock: { c: '#5a5a7a', v: 0.07, pat: 'stone' }, path: { c: '#6a6080', top: '#a8a0b8', v: 0.07, pat: 'stone' },
      pale: { c: '#c8c0d8', v: 0.04, pat: 'brick' }, paleDk: { c: '#9a92b0', v: 0.05, pat: 'brick' }, trim: { c: '#e4deee', v: 0.03 }, gold: { c: '#e0c060', v: 0.06 },
      floorA: { c: '#6a5a4a', top: '#8a7058', v: 0.04, pat: 'plank' }, floorM: { c: '#8a86a0', top: '#b8b2c8', v: 0.03, pat: 'check', alt: '#a8a2bc' }, rugB: { c: '#2a3a7a', v: 0.04, pat: 'check', alt: '#26346e' }, rugE: { c: '#c8a050', v: 0.04 },
      plank: { c: '#5a3e2e', v: 0.05, pat: 'plank' }, shelf: { c: '#4a3226', v: 0.04 }, desk: { c: '#4a3028', v: 0.04 }, chair: { c: '#6a4a36', v: 0.05 }, door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, iron: { c: '#34323e', v: 0.03 }, chain: { c: '#6a6878', v: 0.05 },
      book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a8a', v: 0.05 }, book3: { c: '#3a7a4a', v: 0.05 }, book4: { c: '#7a5a2a', v: 0.05 }, book5: { c: '#5a3a7a', v: 0.05 }, parch: { c: '#ece0bc', v: 0.04 },
      forbid: { c: '#3a1a2a', v: 0.04 }, seal: { c: '#ff4a6a', glow: true }, rune: { c: '#a890ff', glow: true }, mana: { c: '#a0d0ff', glow: true }, star: { c: '#fff4c0', glow: true },
      glamp: { c: '#7aff9a', glow: true }, lamp: { c: '#ffe0a0', glow: true }, candle: { c: '#fff0c0', glow: true }, win: { c: '#a8b8ff', night: true, day: '#8a9ad0' }, winG: { c: '#ffd890', night: true, day: '#c8b890' },
      bell: { c: '#e0c060', v: 0.05 }, wingA: { c: '#ff9ad8', glow: true }, wingB: { c: '#9ad8ff', glow: true },
    },
    build(w) {
      const B = w.id;
      w.hm = new Int16Array(W * D).fill(G);
      const lights = [], acts = [], landmarks = [];
      const rad = (x, z) => Math.hypot(x - CX, z - CZ);
      const inHall = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;

      // ── 땅(학원 섬 잔디·포석)과 바닥(나무 마루, 돔 아래 대리석) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        for (let y = G - 4; y < G; y++) w.set(x, y, z, B.rock);
        let top = w.noise.fbm(x * 0.12, z * 0.12, 2) > 0.5 ? B.grass : B.path;
        if (x > X1 && Math.abs(z - DZ) <= 6) top = B.path;
        if (inHall(x, z)) { const r = rad(x, z); top = r < 11 ? (r < 8.6 ? B.rugB : (r < 9.4 ? B.rugE : B.floorM)) : B.floorA; }
        w.set(x, G, z, top);
      }
      for (let z = CZ - 8; z <= CZ + 8; z++) for (let x = CX - 8; x <= CX + 8; x++) {   // 양탄자의 금빛 별
        const dx = Math.abs(x - CX), dz = Math.abs(z - CZ);
        if ((dx === 0 && dz <= 6) || (dz === 0 && dx <= 6) || (dx === dz && dx <= 4) || (rad(x, z) >= 3 && rad(x, z) < 3.8)) w.set(x, G, z, B.rugE);
      }

      // ── 벽: 북·서는 높게(서가·큰 창), 남·동은 낮게 잘랐다 ──
      const HT = G + 18;
      for (let z = Z0 - 2; z <= Z1 + 2; z++) for (let x = X0 - 2; x <= X1 + 2; x++) {
        if (inHall(x, z)) continue;
        const back = x < X0 || z < Z0;
        const top = back && !(x > X1 || z > Z1) ? HT : G + 3;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === top ? B.trim : (y === G + 1 || (y - G) % 6 === 0 ? B.paleDk : B.pale));
        if (top === HT) w.set(x, HT - 1, z, B.gold);
      }
      // 큰 창(서쪽 가운데 아치창 · 북쪽 위층 창)
      for (let z = DZ - 2; z <= DZ + 2; z++) for (let y = G + 3; y <= G + 15; y++) { const ok = y <= G + 13 || Math.abs(z - DZ) <= 3 - (y - G - 13); if (ok) for (const x of [X0 - 2, X0 - 1]) w.set(x, y, z, Math.abs(z - DZ) === 0 && y % 3 === 0 ? B.gold : B.win); }
      for (let z = DZ - 3; z <= DZ + 3; z++) w.set(X0 - 1, G + 16, z, B.gold);
      for (let x = X0 + 4; x <= X1 - 3; x += 6) for (let y = G + 14; y <= G + 16; y++) for (const xx of [x, x + 1]) for (const z of [Z0 - 2, Z0 - 1]) w.set(xx, y, z, B.win);

      // ── 정문(동쪽): 금테 문틀, 닫힌 문짝, 문 앞 양탄자 ──
      w.box(X1 + 1, G + 1, DZ - 1, X1 + 2, G + 6, DZ + 1, 0);
      w.box(X1 + 2, G + 1, DZ - 1, X1 + 2, G + 5, DZ + 1, B.door); w.box(X1 + 2, G + 1, DZ, X1 + 2, G + 5, DZ, B.iron); w.box(X1 + 2, G + 6, DZ - 1, X1 + 2, G + 6, DZ + 1, B.door);
      for (const z of [DZ - 2, DZ + 2]) { w.box(X1 + 1, G + 1, z, X1 + 2, G + 7, z, B.trim); w.set(X1 + 1, G + 4, z, B.rune); }
      w.box(X1 + 1, G + 7, DZ - 2, X1 + 2, G + 7, DZ + 2, B.gold); w.box(X1 + 1, G + 8, DZ - 1, X1 + 2, G + 8, DZ + 1, B.gold); w.set(X1 + 1, G + 9, DZ, B.mana);
      for (let z = DZ - 1; z <= DZ + 1; z++) for (let x = X1 - 4; x <= X1 + 1; x++) w.set(x, G, z, z === DZ ? B.rugB : B.rugE);
      // 바깥 열주(학원 쪽 현관과 같은 모양)
      for (let z = DZ - 10; z <= DZ + 10; z += 5) if (Math.abs(z - DZ) > 2) { w.box(X1 + 5, G + 1, z, X1 + 5, G + 9, z, B.trim); w.set(X1 + 5, G + 10, z, B.gold); }
      acts.push(OR.goAct({ at: [X1, G + 1, DZ], name: '밖으로 나가기', goto: 'academy', hint: '동쪽 정문을 열고 열주 현관을 지나 학원 구역으로 나가요', hit: [X1 - 1, G + 1, DZ - 1, X1 + 1, G + 5, DZ + 1] }));

      // ── 북·서쪽 벽 서가(높은 책장, 칸마다 선반) ──
      const books = [B.book1, B.book2, B.book3, B.book4, B.book5];
      const shelfCell = (x, y, z, top) => { const k = hash3(x, y, z); w.set(x, y, z, (y - G) % 4 === 0 || y === top ? B.shelf : (k > 0.9 ? 0 : books[(k * 5) | 0])); };
      for (let x = X0; x <= X1 - 2; x++) { if (x >= CX - 3 && x <= CX + 3) continue; for (let y = G + 1; y <= G + 12; y++) shelfCell(x, y, Z0, G + 12); w.set(x, G + 13, Z0, B.gold); }
      for (let z = Z0; z <= Z1 - 2; z++) { if (Math.abs(z - DZ) <= 4) continue; for (let y = G + 1; y <= G + 12; y++) shelfCell(X0, y, z, G + 12); w.set(X0, G + 13, z, B.gold); }
      // 북쪽 가운데: 시계 대신 별 시계판 벽감
      w.box(CX - 3, G + 1, Z0, CX + 3, G + 12, Z0, B.paleDk); w.box(CX - 2, G + 4, Z0, CX + 2, G + 10, Z0, B.rugB);
      for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; w.set(Math.round(CX + Math.cos(t) * 2), Math.round(G + 7 + Math.sin(t) * 2.4), Z0, k % 2 ? B.gold : B.star); }
      w.set(CX, G + 7, Z0, B.mana);
      // 서쪽 큰 창 앞 창가 의자
      w.box(X0, G + 1, DZ - 3, X0 + 1, G + 1, DZ + 3, B.chair); w.box(X0, G + 2, DZ - 3, X0, G + 3, DZ + 3, B.rugB);
      lights.push({ name: 'window', p: [X0 + 1.5, G + 8, DZ + 0.5], c: '#a8b8ff', i: 0.8, d: 14, flicker: 0.02, night: true });

      // ── 굴리는 사다리(서쪽 서가 앞) ──
      const LZ = Z0 + 4;
      w.box(X0 + 1, G + 12, Z0 + 1, X0 + 1, G + 12, Z1 - 3, B.iron);
      const lad = w.prop({ name: 'ladder', pivot: [X0 + 1.5, G + 6, LZ + 0.5] });
      for (const dz of [0, 2]) lad.box(X0 + 1, G + 1, LZ + dz, X0 + 1, G + 11, LZ + dz, B.plank);
      for (let y = G + 2; y <= G + 10; y += 2) lad.set(X0 + 1, y, LZ + 1, B.chair);
      lad.set(X0 + 1, G + 11, LZ + 1, B.gold);
      acts.push({
        name: '사다리 굴리기', hint: '서가에 걸린 사다리가 레일을 따라 끝까지 미끄러졌다가 돌아와요', hit: [X0, G + 1, LZ - 1, X0 + 2, G + 11, LZ + 3],
        run: async a => {
          a.burst([X0 + 1.5, G + 12, LZ + 1.5], { n: 12, colors: ['#e8dcc0', '#c8a050'], speed: 2, up: 1, life: 0.8, gravity: 3, spread: 1 });
          await a.move('ladder', [0, 0, 14], 1.8);
          a.burst([X0 + 1.5, G + 8, LZ + 15.5], { n: 16, colors: ['#ece0bc', '#ffffff'], speed: 3, up: 2, life: 1.2, gravity: 2, spread: 1.2 });
          await a.wait(0.4);
          await a.move('ladder', [0, 0, 0], 1.8);
        },
      });

      // ── 서가 미로(서쪽): 두 겹 책장 줄과 끝 판 ──
      const stack = (x0, x1, z) => {
        for (let x = x0; x <= x1; x++) for (const zz of [z, z + 1]) for (let y = G + 1; y <= G + 7; y++) { if (x === x0 || x === x1) w.set(x, y, zz, B.shelf); else shelfCell(x, y, zz, G + 7); }
        for (let x = x0; x <= x1; x++) for (const zz of [z, z + 1]) w.set(x, G + 8, zz, B.plank);
        w.set(x0, G + 9, z, B.gold); w.set(x1, G + 9, z + 1, B.gold);
      };
      for (const z of [Z0 + 4, Z0 + 9, Z0 + 14]) stack(X0 + 4, X0 + 9, z);
      stack(X0 + 4, X0 + 9, Z0 + 29);
      for (const z of [Z0 + 6, Z0 + 12]) stack(X0 + 14, X0 + 19, z);
      // 바닥에 쌓인 책 더미
      for (const [x, z, n] of [[X0 + 3, Z0 + 8, 3], [X0 + 11, Z0 + 16, 2], [X0 + 12, Z0 + 4, 4], [X0 + 2, Z0 + 25, 2]]) for (let k = 0; k < n; k++) w.set(x, G + 1 + k, z, books[(x + k) % 5]);

      // ── 돔 아래 열람실: 여덟 기둥, 뒤쪽 갈빗대만 남긴 돔, 별빛 천창 ──
      for (let k = 0; k < 8; k++) {
        const t = (k + 0.5) / 8 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 10), z = Math.round(CZ + Math.sin(t) * 10);
        w.box(x, G + 1, z, x, G + 1, z, B.paleDk); w.box(x, G + 2, z, x, G + 13, z, B.trim); w.set(x, G + 14, z, B.gold);
        if (Math.cos(t - Math.PI / 4) < 0.2) for (let s = 0; s <= 16; s++) {               // 뒤쪽 갈빗대
          const f = s / 16 * Math.PI / 2, r = 10 * Math.cos(f), y = Math.round(G + 15 + 9 * Math.sin(f));
          w.set(Math.round(CX + Math.cos(t) * r), y, Math.round(CZ + Math.sin(t) * r), B.gold);
        }
      }
      for (let a = 0; a < 64; a++) { const t = a / 64 * Math.PI * 2; if (Math.cos(t - Math.PI / 4) < 0.25) w.set(Math.round(CX + Math.cos(t) * 10), G + 15, Math.round(CZ + Math.sin(t) * 10), B.paleDk); }
      w.ring(CX, CZ, G + 24, 1.4, 2.6, B.gold); w.set(CX, G + 25, CZ, B.mana);
      lights.push({ name: 'dome', p: [CX + 0.5, G + 24, CZ + 0.5], c: '#a0d0ff', i: 1.3, d: 26, flicker: 0.05 });
      const stars = w.prop({ name: 'stars', pivot: [CX + 0.5, G + 20, CZ + 0.5], axis: 'y', speed: 0.06 });
      for (let k = 0; k < 18; k++) { const t = k / 18 * Math.PI * 2 + hash3(k, 1, 2), r = 3 + hash3(k, 3, 4) * 6; stars.set(Math.round(CX + Math.cos(t) * r), G + 18 + ((k * 5) % 5), Math.round(CZ + Math.sin(t) * r), k % 4 ? B.star : B.mana); }
      acts.push({
        name: '돔 별빛', hint: '돔 천창의 별빛이 쏟아지며 열람실 위에 별자리가 천천히 돌아요', hit: [CX - 9, G + 16, CZ - 9, CX + 9, G + 25, CZ + 9],
        run: async a => {
          a.flash('dome', 4, 5); a.glow(1.5, 5); a.spin('stars', 4, 5);
          await a.move('stars', [0, -5, 0], 1.6);
          for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, G + 24, CZ + 0.5], { n: 14, colors: ['#fff4c0', '#a0d0ff', '#ffffff'], speed: 1, up: -1, life: 2.4, gravity: 0.5, spread: 4 }); await a.wait(0.3); }
          await a.move('stars', [0, 0, 0], 1.6);
        },
      });
      // 열람 탁자 넷(가운데 십자 통로는 비운다)과 초록 등, 의자
      for (const [x0, z0] of [[CX - 7, CZ - 5], [CX + 2, CZ - 5], [CX - 7, CZ + 4], [CX + 2, CZ + 4]]) {
        w.box(x0, G + 1, z0, x0, G + 1, z0 + 1, B.desk); w.box(x0 + 4, G + 1, z0, x0 + 4, G + 1, z0 + 1, B.desk); w.box(x0, G + 2, z0, x0 + 4, G + 2, z0 + 1, B.desk);
        w.set(x0 + 2, G + 3, z0, B.glamp); w.set(x0 + 1, G + 3, z0 + 1, B.parch); w.set(x0 + 3, G + 3, z0 + 1, books[(x0 + z0) % 5]);
        for (let x = x0; x <= x0 + 4; x += 2) for (const z of [z0 - 1, z0 + 2]) w.set(x, G + 1, z, B.chair);
      }
      lights.push({ name: 'readN', p: [CX + 0.5, G + 3.5, CZ - 4.5], c: '#9aff9a', i: 0.7, d: 11, flicker: 0.05, srcR: 5 });
      lights.push({ name: 'readS', p: [CX + 0.5, G + 3.5, CZ + 4.5], c: '#9aff9a', i: 0.7, d: 11, flicker: 0.05, srcR: 5 });
      // 날아오를 책들(열람실 위에 떠 있다)
      const flock = w.prop({ name: 'flock', pivot: [CX + 0.5, G + 9, CZ + 0.5], axis: 'y', speed: 0.15, bob: 0.3, bobSpeed: 0.7 });
      for (let k = 0; k < 12; k++) {
        const t = k / 12 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 6.5), z = Math.round(CZ + Math.sin(t) * 6.5), y = G + 8 + (k % 3);
        flock.box(x, y, z, x, y + 1, z, books[k % 5]); flock.set(x, y + 2, z, B.parch);
      }
      acts.push({
        name: '책 날려 보내기', hint: '열람실 위에 떠 있던 책들이 돔까지 날아올라 빙글빙글 돌며 책장을 넘겨요', hit: [CX - 2, G + 1, CZ - 2, CX + 2, G + 11, CZ + 2],
        run: async a => {
          a.spin('flock', 8, 5);
          await a.move('flock', [0, 8, 0], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([CX + 0.5, G + 17, CZ + 0.5], { n: 22, colors: ['#ece0bc', '#ffffff', '#c8d0ff'], speed: 7, up: 1, life: 1.6, gravity: 1.5, spread: 2, flat: true }); await a.wait(0.4); }
          await a.move('flock', [0, 0, 0], 1.8);
        },
      });

      // ── 금서 서고(남서쪽 구석, 쇠창살) ──
      const FX1 = X0 + 11, FZ0 = Z1 - 12;
      for (let x = X0; x <= FX1; x++) for (let z = FZ0; z <= Z1; z++) w.set(x, G, z, (x + z) % 2 ? B.forbid : B.floorA);
      for (let x = X0; x <= FX1; x++) for (let y = G + 1; y <= G + 8; y++) w.set(x, y, FZ0, y === G + 8 ? B.iron : (x % 2 ? B.iron : 0));
      for (let z = FZ0; z <= Z1; z++) { if (z >= FZ0 + 5 && z <= FZ0 + 7) continue; for (let y = G + 1; y <= G + 8; y++) w.set(FX1, y, z, y === G + 8 ? B.iron : (z % 2 ? B.iron : 0)); }
      w.box(FX1, G + 8, FZ0 + 5, FX1, G + 8, FZ0 + 7, B.iron); w.set(FX1, G + 9, FZ0 + 6, B.seal);
      for (let z = FZ0 + 1; z <= Z1 - 1; z++) for (let y = G + 1; y <= G + 6; y++) shelfCell(X0, y, z, G + 6);
      for (let z = FZ0 + 2; z <= Z1 - 1; z += 3) { w.set(X0 + 1, G + 3, z, B.chain); w.set(X0 + 1, G + 5, z, B.chain); }
      // 독서대 위 사슬에 묶인 금서(부품)
      const TX = X0 + 6, TZ = FZ0 + 6;
      w.box(TX, G + 1, TZ, TX, G + 2, TZ, B.desk); w.box(TX - 1, G + 3, TZ, TX + 1, G + 3, TZ, B.desk);
      for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) { w.box(TX + dx, G + 1, TZ + dz, TX + dx, G + 4, TZ + dz, B.iron); w.set(TX + dx, G + 5, TZ + dz, B.seal); }
      const tome = w.prop({ name: 'tomeF', pivot: [TX + 0.5, G + 4.5, TZ + 0.5], axis: 'y' });
      tome.box(TX - 1, G + 4, TZ, TX + 1, G + 4, TZ, B.forbid); tome.set(TX, G + 5, TZ, B.seal); tome.set(TX - 1, G + 5, TZ, B.book5); tome.set(TX + 1, G + 5, TZ, B.book1);
      const chains = w.prop({ name: 'chains', pivot: [TX + 0.5, G + 4, TZ + 0.5] });
      for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) chains.line(TX + dx - Math.sign(dx), G + 4, TZ + dz - Math.sign(dz), TX + Math.sign(dx), G + 5, TZ + Math.sign(dz), B.chain);
      lights.push({ name: 'forbid', p: [TX + 0.5, G + 5, TZ + 0.5], c: '#ff4a6a', i: 1, d: 12, flicker: 0.25 });
      acts.push({
        name: '금서 사슬 풀기', hint: '쇠창살 안 금서의 사슬이 풀려 떨어지고 붉은 봉인이 번쩍이며 책이 떠올라 돌아요', hit: [TX - 3, G + 1, TZ - 3, TX + 3, G + 6, TZ + 3],
        run: async a => {
          a.flash('forbid', 5, 4.5);
          await a.move('chains', [0, -3.2, 0], 0.5);
          a.burst([TX + 0.5, G + 5, TZ + 0.5], { n: 30, colors: ['#ff4a6a', '#3a1a2a', '#ffd0d8'], speed: 5, up: 2, life: 1.2, gravity: 1, spread: 1 });
          a.spin('tomeF', 7, 3);
          await a.move('tomeF', [0, 4, 0], 1.2);
          for (let k = 0; k < 4; k++) { a.burst([TX + 0.5, G + 9, TZ + 0.5], { n: 16, colors: ['#ff4a6a', '#ffffff'], speed: 3, up: 1, life: 1, gravity: 0, spread: 0.6, flat: true }); await a.wait(0.4); }
          await a.move('tomeF', [0, 0, 0], 1); await a.move('chains', [0, 0, 0], 0.6);
        },
      });

      // ── 사서 책상(정문 남쪽)과 종, 색인 서랍장 ──
      const KX = X1 - 7, KZ = DZ + 5;
      w.box(KX, G + 1, KZ, KX + 5, G + 2, KZ, B.desk); w.box(KX, G + 1, KZ, KX, G + 2, KZ + 4, B.desk); w.box(KX - 1, G + 3, KZ - 1, KX + 5, G + 3, KZ - 1, B.plank); w.box(KX - 1, G + 3, KZ - 1, KX - 1, G + 3, KZ + 4, B.plank);
      w.set(KX + 4, G + 3, KZ, B.candle); w.set(KX, G + 3, KZ + 3, B.parch); for (let k = 0; k < 3; k++) w.set(KX, G + 3 + k, KZ + 1, books[k]);
      w.box(KX + 3, G + 1, KZ + 3, KX + 3, G + 1, KZ + 3, B.chair); w.box(KX + 4, G + 1, KZ + 3, KX + 4, G + 3, KZ + 3, B.chair);
      const bell = w.prop({ name: 'deskbell', pivot: [KX + 2.5, G + 4, KZ - 0.5] });
      bell.set(KX + 2, G + 4, KZ - 1, B.bell); bell.set(KX + 2, G + 5, KZ - 1, B.gold); bell.set(KX + 1, G + 4, KZ - 1, B.lamp); bell.set(KX + 3, G + 4, KZ - 1, B.lamp);
      lights.push({ name: 'desk', p: [KX + 2.5, G + 4.5, KZ + 0.5], c: '#ffe0a0', i: 0.9, d: 10, flicker: 0.15 });
      for (let x = X1 - 10; x <= X1 - 1; x++) for (let y = G + 1; y <= G + 2; y++) w.set(x, y, Z1, (x + y) % 2 ? B.plank : B.shelf);
      for (let x = X1 - 10; x <= X1 - 1; x += 2) w.set(x, G + 3, Z1, B.gold);
      acts.push({
        name: '사서 종', hint: '사서 책상의 작은 종이 맑게 울리고 소리 고리가 도서관에 퍼져요. 쉿!', hit: [KX - 1, G + 1, KZ - 2, KX + 5, G + 5, KZ + 4],
        run: async a => {
          a.flash('desk', 3, 2.4); a.spin('deskbell', 6, 2.4);
          await a.move('deskbell', [0, 2, 0], 0.4);
          for (let k = 0; k < 4; k++) { a.burst([KX + 2.5, G + 6, KZ - 0.5], { n: 20, colors: ['#ffffff', '#ffe0a0'], speed: 6, up: 0, life: 1.2, gravity: 0, spread: 0.5, flat: true }); await a.wait(0.4); }
          await a.move('deskbell', [0, 0, 0], 0.4);
        },
      });

      // ── 책갈피 나비(북쪽 서가 앞에 앉아 있다) ──
      const MX = CX + 9, MZ = Z0 + 2, my = G + 6;
      const moth = w.prop({ name: 'flutter', pivot: [MX + 0.5, my + 0.5, MZ + 0.5], bob: 0.3, bobSpeed: 2 });
      for (let k = 0; k < 5; k++) { const x = MX + k * 2 - 4, y = my + (k % 2) * 2; moth.set(x, y, MZ, k % 2 ? B.wingA : B.wingB); moth.set(x + 1, y, MZ, k % 2 ? B.wingA : B.wingB); moth.set(x, y - 1, MZ, B.parch); }
      const mPts = [[-4, 3, 6], [-10, 6, 14], [-6, 9, 22], [4, 8, 24], [8, 5, 14], [2, 2, 4], [0, 0, 0]];
      acts.push({
        name: '책갈피 나비', hint: '서가에 꽂혀 있던 책갈피들이 나비가 되어 열람실 위를 팔랑팔랑 날아다녀요', hit: [MX - 5, my - 2, MZ - 1, MX + 6, my + 3, MZ + 2],
        run: async a => {
          a.burst([MX + 0.5, my + 1, MZ + 1], { n: 20, colors: ['#ff9ad8', '#9ad8ff', '#ffffff'], speed: 2, up: 2, life: 1.4, gravity: -0.2, spread: 2 });
          await a.path('flutter', mPts, 7);
          a.burst([MX + 0.5, my + 1, MZ + 1], { n: 14, colors: ['#ff9ad8', '#9ad8ff'], speed: 1.5, up: 1, life: 1, gravity: 0, spread: 1.5 });
        },
      });

      landmarks.push({ name: '돔 열람실', note: '여덟 기둥과 별빛 천창', p: [CX + 0.5, G + 27, CZ + 0.5] });
      landmarks.push({ name: '금서 서고', note: '사슬에 묶인 책', p: [TX + 0.5, G + 12, TZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
