// 대도서관(하위 지도) — 학원 구역 푸른 돔 도서관 안. 가운데 돔 아래 둥근 열람실(여덟 기둥·열람 탁자·초록 등), 서쪽 서가 미로와 굴리는 사다리,
// 남서쪽 쇠창살 안 금서 서고(사슬에 묶인 책), 동쪽 정문 옆 사서 책상과 종, 북·서쪽 벽을 채운 높은 서가와 큰 창.
// 2배 해상도(1칸 ≈ 25cm): 높이가 제각각인 책등, 받침·주두가 있는 기둥, 창살 아치 창, 다리 달린 탁자와 의자, 놋쇠 받침 초록 등 등.
// 남·동쪽(기본 시점 쪽) 벽은 잘라 낮췄고 돔은 뒤쪽 갈빗대만 남겼다. 좌표: +x 동쪽, +z 남쪽. 정문은 동쪽 (학원 구역의 하위 지도)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 112, G = 24;
  const X0 = 32, X1 = 111, Z0 = 24, Z1 = 119, CX = 72, CZ = 72, DZ = 72;   // 벽 안쪽 경계, 돔 중심, 정문 가운데 z
  MAPS.push({
    id: 'academy-library', cat: 'magic', sub: true, parent: 'academy', name: '대도서관', en: 'Arcanum Academy · Grand Library', color: '#7a9aff', seed: 3012, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '학원 구역 푸른 돔 아래의 대도서관. 여덟 기둥이 받친 돔 밑 둥근 열람실에는 초록 등을 켠 열람 탁자가 놓였고, 서쪽으로는 굴리는 사다리를 단 높은 서가가 미로처럼 늘어섰다. 남서쪽 쇠창살 안 금서 서고에는 사슬에 묶인 책들이 잠들어 있고, 정문 옆 사서 책상의 작은 종이 조용히 하라고 일러 준다.',
    info: { title: '장소 정보', en: 'GRAND LIBRARY', rows: [['열람실', '돔 아래 둥근 방 · 열람 탁자'], ['서가', '굴리는 사다리를 단 서가 미로'], ['금서 서고', '쇠창살 · 사슬에 묶인 책'], ['규칙', '사서 종이 울리면 조용히']] },
    sky: ['#2a3060', '#0c0e24', '#90a0ff'], stars: true,
    hemi: ['#d0d8ff', '#2a2440', 0.6], sun: ['#e0e4ff', 0.48, [0.45, 1, 0.5]],
    day: { sky: ['#dce0f8', '#7a8ae0', '#fff8f0'], stars: false, hemi: ['#ffffff', '#4a4660', 0.62], sun: ['#fff4e8', 0.72, [0.45, 1, 0.5]] },
    fog: { start: 0.94, floor: G - 20, depth: 12 },
    camY: 0, zoom: 1.9,
    spawn: [X1 - 6, G + 1, DZ],
    particles: [
      { n: 130, colors: ['#fff6d8', '#e8e0c8', '#c8d0ff'], mode: 'drift', speed: 0.2, area: [CX, CZ, 40], y0: G + 4, y1: G + 36, glow: true },
      { n: 36, colors: ['#a0d0ff', '#ffffff'], mode: 'fall', speed: 0.24, area: [CX, CZ, 8], y0: G + 12, y1: G + 52, glow: true },
    ],
    blocks: {
      grass: { c: '#4a3a3a', top: '#4a7a58', v: 0.08 }, rock: { c: '#5a5a7a', v: 0.07, pat: 'stone' }, path: { c: '#6a6080', top: '#a8a0b8', v: 0.05 }, pathJ: { c: '#6a6080', top: '#847c98', v: 0.03 },
      pale: { c: '#c8c0d8', v: 0.04 }, paleDk: { c: '#9a92b0', v: 0.04 }, trim: { c: '#e4deee', v: 0.03 }, gold: { c: '#e0c060', v: 0.05 },
      st1: { c: '#c8c0d8', v: 0.03 }, st2: { c: '#b8b0cc', v: 0.03 }, st3: { c: '#d4cee2', v: 0.03 }, st4: { c: '#bcb4d0', v: 0.03 }, mortar: { c: '#9a92b0', v: 0.03 },
      floorA: { c: '#6a5a4a', top: '#8a7058', v: 0.03 }, floorA2: { c: '#6a5a4a', top: '#7e6650', v: 0.03 }, floorM: { c: '#8a86a0', top: '#b8b2c8', v: 0.02 }, floorM2: { c: '#8a86a0', top: '#a8a2bc', v: 0.02 },
      rugB: { c: '#2a3a7a', v: 0.03 }, rugE: { c: '#c8a050', v: 0.03 },
      plank: { c: '#5a3e2e', v: 0.04 }, shelf: { c: '#4a3226', v: 0.03 }, desk: { c: '#4a3028', v: 0.03 }, deskLt: { c: '#5e3e32', v: 0.03 }, chair: { c: '#6a4a36', v: 0.04 }, door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, doorDk: { c: '#2a1e2a', v: 0.03 }, iron: { c: '#34323e', v: 0.03 }, chain: { c: '#6a6878', v: 0.04 }, brass: { c: '#c8a050', v: 0.04 },
      book1: { c: '#8a2a2a', v: 0.04 }, book2: { c: '#2a4a8a', v: 0.04 }, book3: { c: '#3a7a4a', v: 0.04 }, book4: { c: '#7a5a2a', v: 0.04 }, book5: { c: '#5a3a7a', v: 0.04 }, parch: { c: '#ece0bc', v: 0.03 },
      forbid: { c: '#3a1a2a', v: 0.03 }, seal: { c: '#ff4a6a', glow: true }, rune: { c: '#a890ff', glow: true }, mana: { c: '#a0d0ff', glow: true }, star: { c: '#fff4c0', glow: true },
      glamp: { c: '#7aff9a', glow: true }, lamp: { c: '#ffe0a0', glow: true }, candle: { c: '#fff0c0', glow: true }, wax: { c: '#f0e8d8', v: 0.02 }, win: { c: '#a8b8ff', night: true, day: '#8a9ad0' },
      bell: { c: '#e0c060', v: 0.05 }, wingA: { c: '#ff9ad8', glow: true }, wingB: { c: '#9ad8ff', glow: true },
    },
    build(w) {
      const B = w.id;
      w.hm = new Int16Array(W * D).fill(G);
      const lights = [], acts = [], landmarks = [];
      const rad = (x, z) => Math.hypot(x - CX, z - CZ);
      const inHall = (x, z) => x >= X0 && x <= X1 && z >= Z0 && z <= Z1;
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const books = [B.book1, B.book2, B.book3, B.book4, B.book5];
      // 책장 칸: 6칸마다 선반, 책등마다 높이가 다르다(u는 가로 순번)
      const shelfAt = (u, y, top) => {
        const k = y - G - 1;
        if (k % 6 === 0 || y === top) return B.shelf;
        const s = Math.floor(k / 6), hh = hash3(u, s, 5), h = 3 + ((hh * 3) | 0);
        if (hh > 0.92 || (k % 6) > h) return 0;
        return books[(hash3(u >> (hh > 0.5 ? 0 : 1), s, 9) * 5) | 0];
      };

      // ── 땅(학원 섬 잔디·포석)과 바닥(나무 마루, 돔 아래 대리석과 양탄자) ──
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        for (let y = G - 8; y < G; y++) w.set(x, y, z, B.rock);
        let top = w.noise.fbm(x * 0.06, z * 0.06, 2) > 0.5 ? B.grass : B.path;
        if (x > X1 && Math.abs(z - DZ) <= 12) top = (z % 3 === 2 || (x + ((z / 3 | 0) & 1) * 2) % 5 === 4) ? B.pathJ : B.path;
        if (inHall(x, z)) {
          const r = rad(x, z);
          top = r < 22 ? (r < 17.2 ? B.rugB : (r < 18.8 ? B.rugE : (((x >> 2) + (z >> 2)) % 2 ? B.floorM : B.floorM2))) : ((x >> 1) % 2 ? B.floorA : B.floorA2);
        }
        w.set(x, G, z, top);
      }
      for (let z = CZ - 16; z <= CZ + 16; z++) for (let x = CX - 16; x <= CX + 16; x++) {   // 양탄자의 금빛 별
        const dx = Math.abs(x - CX + 0.5), dz = Math.abs(z - CZ + 0.5), r = rad(x + 0.5, z + 0.5);
        if ((dx < 1 && dz <= 12) || (dz < 1 && dx <= 12) || (Math.abs(dx - dz) < 1 && dx <= 8) || (r >= 6 && r < 7.6)) w.set(x, G, z, B.rugE);
      }

      // ── 벽(두께 4): 북·서는 높게(서가·큰 창), 남·동은 낮게 잘랐다 ──
      const HT = G + 36;
      for (let z = Z0 - 4; z <= Z1 + 4; z++) for (let x = X0 - 4; x <= X1 + 4; x++) {
        if (inHall(x, z)) continue;
        const back = x < X0 || z < Z0;
        const top = back && !(x > X1 || z > Z1) ? HT : G + 6;
        const u = (x < X0 || x > X1) ? z : x;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === top ? B.trim : (y <= G + 2 || (y - G) % 12 === 0 ? B.paleDk : (stoneAt(u, y, 1) || B.mortar)));
        if (top === HT) { w.set(x, HT - 1, z, B.gold); if ((x + z) % 4 < 2 && (x === X0 - 4 || z === Z0 - 4)) w.set(x, HT + 1, z, B.trim); }
      }
      // 큰 창(서쪽 가운데 아치창): 창살과 가로살, 안쪽은 움푹하게
      for (let z = DZ - 5; z <= DZ + 4; z++) for (let y = G + 6; y <= G + 31; y++) {
        const off = Math.abs(z - DZ + 0.5), ok = y <= G + 26 || off <= 5 - (y - G - 26);
        if (!ok) continue;
        w.set(X0 - 4, y, z, B.win); w.set(X0 - 3, y, z, off < 1 || (y - G) % 6 === 0 ? B.gold : B.win);
        w.set(X0 - 2, y, z, 0); w.set(X0 - 1, y, z, 0);
      }
      for (let z = DZ - 6; z <= DZ + 5; z++) { w.set(X0 - 2, G + 5, z, B.trim); w.set(X0 - 1, G + 5, z, B.trim); w.set(X0 - 1, G + 32, z, B.gold); }
      // 북쪽 위층 창
      for (let x = X0 + 8; x <= X1 - 8; x += 12) for (let y = G + 28; y <= G + 33; y++) for (let xx = x; xx <= x + 3; xx++) {
        w.set(xx, y, Z0 - 4, B.win); w.set(xx, y, Z0 - 3, xx === x + 1 || y === G + 31 ? B.gold : B.win); w.set(xx, y, Z0 - 2, 0); w.set(xx, y, Z0 - 1, 0);
        w.set(xx, G + 27, Z0 - 1, B.trim); w.set(xx, G + 34, Z0 - 1, B.gold);
      }

      // ── 정문(동쪽): 금테 문틀, 두 짝 판자문(쇠띠), 문 앞 양탄자 ──
      w.box(X1 + 1, G + 1, DZ - 3, X1 + 3, G + 13, DZ + 3, 0);
      for (let y = G + 1; y <= G + 12; y++) for (let z = DZ - 3; z <= DZ + 3; z++) w.set(X1 + 4, y, z, z === DZ ? B.doorDk : ((y - G) % 4 === 2 ? B.iron : B.door));
      w.box(X1 + 4, G + 13, DZ - 3, X1 + 4, G + 13, DZ + 3, B.door);
      for (const z of [DZ - 1, DZ + 1]) w.set(X1 + 3, G + 6, z, B.brass);
      for (const z of [DZ - 5, DZ - 4, DZ + 4, DZ + 5]) { w.box(X1 + 1, G + 1, z, X1 + 4, G + 14, z, B.trim); if (z === DZ - 4 || z === DZ + 4) w.box(X1 + 1, G + 7, z, X1 + 1, G + 8, z, B.rune); }
      w.box(X1 + 1, G + 15, DZ - 5, X1 + 4, G + 15, DZ + 5, B.gold); w.box(X1 + 1, G + 16, DZ - 3, X1 + 4, G + 16, DZ + 3, B.gold); w.box(X1 + 1, G + 17, DZ - 1, X1 + 4, G + 17, DZ + 1, B.gold); w.box(X1 + 1, G + 18, DZ, X1 + 1, G + 19, DZ, B.mana);
      for (let z = DZ - 3; z <= DZ + 3; z++) for (let x = X1 - 9; x <= X1 + 3; x++) w.set(x, G, z, Math.abs(z - DZ) <= 1 ? B.rugB : B.rugE);
      // 바깥 열주(학원 쪽 현관과 같은 모양): 받침·기둥·주두
      for (let z = DZ - 20; z <= DZ + 20; z += 10) if (Math.abs(z - DZ) > 4) {
        w.box(X1 + 9, G + 1, z - 1, X1 + 12, G + 1, z + 2, B.paleDk);
        for (let y = G + 2; y <= G + 18; y++) w.box(X1 + 10, y, z, X1 + 11, y, z + 1, y % 4 === 0 ? B.pale : B.trim);
        w.box(X1 + 9, G + 19, z - 1, X1 + 12, G + 19, z + 2, B.gold); w.box(X1 + 10, G + 20, z, X1 + 11, G + 20, z + 1, B.paleDk);
      }
      acts.push(OR.goAct({ at: [X1, G + 1, DZ], h: 9, name: '밖으로 나가기', goto: 'academy', hint: '동쪽 정문을 열고 열주 현관을 지나 학원 구역으로 나가요', hit: [X1 - 2, G + 1, DZ - 3, X1 + 3, G + 12, DZ + 3] }));

      // ── 북·서쪽 벽 서가(높은 책장, 칸마다 선반) ──
      for (let x = X0; x <= X1 - 4; x++) { if (x >= CX - 6 && x <= CX + 6) continue; for (let y = G + 1; y <= G + 24; y++) { w.set(x, y, Z0, shelfAt(x, y, G + 24) || B.shelf); w.set(x, y, Z0 + 1, (x - X0) % 16 === 0 ? B.shelf : (shelfAt(x, y, G + 24) || B.shelf)); } w.set(x, G + 25, Z0, B.gold); w.set(x, G + 25, Z0 + 1, B.shelf); }
      for (let z = Z0; z <= Z1 - 4; z++) { if (Math.abs(z - DZ + 0.5) <= 8) continue; for (let y = G + 1; y <= G + 24; y++) { w.set(X0, y, z, B.shelf); w.set(X0 + 1, y, z, (z - Z0) % 16 === 0 ? B.shelf : (shelfAt(z + 50, y, G + 24) || B.shelf)); } w.set(X0, G + 25, z, B.gold); w.set(X0 + 1, G + 25, z, B.shelf); }
      // 북쪽 가운데: 별 시계판 벽감
      w.box(CX - 6, G + 1, Z0, CX + 6, G + 24, Z0 + 1, B.paleDk); w.box(CX - 4, G + 8, Z0 + 1, CX + 4, G + 20, Z0 + 1, B.rugB);
      for (let k = 0; k < 16; k++) { const t = k / 16 * Math.PI * 2; w.set(Math.round(CX + Math.cos(t) * 3.6), Math.round(G + 14 + Math.sin(t) * 4.6), Z0 + 2, k % 2 ? B.gold : B.star); }
      w.line(CX, G + 14, Z0 + 2, CX, G + 17, Z0 + 2, B.gold); w.line(CX, G + 14, Z0 + 2, CX + 2, G + 13, Z0 + 2, B.gold); w.set(CX, G + 14, Z0 + 2, B.mana);
      for (let y = G + 1; y <= G + 24; y++) for (const x of [CX - 6, CX + 6]) w.set(x, y, Z0 + 2, y % 4 === 0 ? B.gold : B.trim);
      // 서쪽 큰 창 앞 창가 의자
      w.box(X0, G + 1, DZ - 6, X0 + 3, G + 3, DZ + 5, B.chair); w.box(X0 + 1, G + 4, DZ - 6, X0 + 3, G + 4, DZ + 5, B.rugB); w.box(X0, G + 4, DZ - 6, X0, G + 4, DZ + 5, B.chair);
      for (const z of [DZ - 4, DZ + 2]) w.box(X0 + 1, G + 5, z, X0 + 2, G + 6, z + 1, B.rugE);
      lights.push({ name: 'window', p: [X0 + 1.5, G + 16, DZ + 0.5], c: '#a8b8ff', i: 0.8, d: 28, flicker: 0.02, night: true });

      // ── 굴리는 사다리(서쪽 서가 앞) ──
      const LZ = Z0 + 8;
      w.box(X0 + 2, G + 24, Z0 + 2, X0 + 2, G + 24, Z1 - 6, B.iron);
      const lad = w.prop({ name: 'ladder', pivot: [X0 + 2.5, G + 12, LZ + 2.5] });
      for (const dz of [0, 4]) lad.box(X0 + 2, G + 1, LZ + dz, X0 + 2, G + 23, LZ + dz, B.plank);
      for (let y = G + 3; y <= G + 21; y += 3) lad.box(X0 + 2, y, LZ + 1, X0 + 2, y, LZ + 3, B.chair);
      lad.box(X0 + 2, G + 23, LZ + 1, X0 + 2, G + 23, LZ + 3, B.gold); for (const dz of [0, 4]) lad.set(X0 + 3, G + 1, LZ + dz, B.iron);
      acts.push({
        name: '사다리 굴리기', hint: '서가에 걸린 사다리가 레일을 따라 끝까지 미끄러졌다가 돌아와요', hit: [X0 + 1, G + 1, LZ - 1, X0 + 4, G + 23, LZ + 5],
        run: async a => {
          a.burst([X0 + 2.5, G + 24, LZ + 2.5], { n: 12, colors: ['#e8dcc0', '#c8a050'], speed: 4, up: 2, life: 0.8, gravity: 6, spread: 2 });
          await a.move('ladder', [0, 0, 28], 1.8);
          a.burst([X0 + 2.5, G + 16, LZ + 30.5], { n: 16, colors: ['#ece0bc', '#ffffff'], speed: 6, up: 4, life: 1.2, gravity: 4, spread: 2.4 });
          await a.wait(0.4);
          await a.move('ladder', [0, 0, 0], 1.8);
        },
      });

      // ── 서가 미로(서쪽): 두 겹 책장 줄(앞뒤로 책), 끝 판과 금 꼭지 ──
      const stack = (x0, x1, z) => {
        for (let x = x0; x <= x1; x++) for (let zz = z; zz <= z + 3; zz++) for (let y = G + 1; y <= G + 14; y++) {
          const face = zz === z || zz === z + 3;
          w.set(x, y, zz, x === x0 || x === x1 || !face ? B.shelf : (shelfAt(x * 3 + zz, y, G + 14) || B.shelf));
        }
        w.box(x0, G + 15, z, x1, G + 15, z + 3, B.plank);
        for (const [x, zz] of [[x0, z], [x1, z + 3]]) w.box(x, G + 16, zz, x, G + 17, zz, B.gold);
      };
      for (const z of [Z0 + 8, Z0 + 18, Z0 + 28]) stack(X0 + 8, X0 + 19, z);
      stack(X0 + 8, X0 + 19, Z0 + 58);
      for (const z of [Z0 + 12, Z0 + 24]) stack(X0 + 28, X0 + 39, z);
      // 바닥에 쌓인 책 더미
      for (const [x, z, n] of [[X0 + 5, Z0 + 16, 3], [X0 + 22, Z0 + 32, 2], [X0 + 24, Z0 + 8, 4], [X0 + 4, Z0 + 50, 2]]) for (let k = 0; k < n; k++) w.box(x + (k & 1), G + 1 + k, z, x + 2, G + 1 + k, z + 1, books[(x + k) % 5]);

      // ── 돔 아래 열람실: 여덟 기둥, 뒤쪽 갈빗대만 남긴 돔, 별빛 천창 ──
      for (let k = 0; k < 8; k++) {
        const t = (k + 0.5) / 8 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 20) - 1, z = Math.round(CZ + Math.sin(t) * 20) - 1;
        w.box(x - 1, G + 1, z - 1, x + 2, G + 2, z + 2, B.paleDk);
        for (let y = G + 3; y <= G + 26; y++) w.box(x, y, z, x + 1, y, z + 1, y % 4 === 0 ? B.pale : B.trim);
        w.box(x - 1, G + 27, z - 1, x + 2, G + 28, z + 2, B.gold);
        if (Math.cos(t - Math.PI / 4) < 0.2) for (let s = 0; s <= 40; s++) {               // 뒤쪽 갈빗대
          const f = s / 40 * Math.PI / 2, r = 20 * Math.cos(f), y = Math.round(G + 30 + 18 * Math.sin(f));
          for (const q of [-0.5, 0.5]) w.set(Math.round(CX + Math.cos(t) * r - Math.sin(t) * q), y, Math.round(CZ + Math.sin(t) * r + Math.cos(t) * q), B.gold);
        }
      }
      for (let a = 0; a < 160; a++) { const t = a / 160 * Math.PI * 2; if (Math.cos(t - Math.PI / 4) < 0.25) for (const r of [19.5, 20.5]) for (const y of [G + 29, G + 30]) w.set(Math.round(CX + Math.cos(t) * r), y, Math.round(CZ + Math.sin(t) * r), y === G + 30 ? B.paleDk : B.trim); }
      w.ring(CX, CZ, G + 48, 2.8, 5.2, B.gold); w.box(CX, G + 49, CZ, CX + 1, G + 50, CZ + 1, B.mana);
      lights.push({ name: 'dome', p: [CX + 0.5, G + 48, CZ + 0.5], c: '#a0d0ff', i: 1.3, d: 52, flicker: 0.05 });
      const stars = w.prop({ name: 'stars', pivot: [CX + 0.5, G + 40, CZ + 0.5], axis: 'y', speed: 0.06 });
      for (let k = 0; k < 24; k++) {
        const t = k / 24 * Math.PI * 2 + hash3(k, 1, 2), r = 6 + hash3(k, 3, 4) * 12, x = Math.round(CX + Math.cos(t) * r), z = Math.round(CZ + Math.sin(t) * r), y = G + 36 + ((k * 5) % 5) * 2, c = k % 4 ? B.star : B.mana;
        stars.set(x, y, z, c); stars.set(x + 1, y, z, c); stars.set(x - 1, y, z, c); stars.set(x, y + 1, z, c); stars.set(x, y - 1, z, c);
      }
      acts.push({
        name: '돔 별빛', hint: '돔 천창의 별빛이 쏟아지며 열람실 위에 별자리가 천천히 돌아요', hit: [CX - 18, G + 32, CZ - 18, CX + 18, G + 50, CZ + 18],
        run: async a => {
          a.flash('dome', 4, 5); a.glow(1.5, 5); a.spin('stars', 4, 5);
          await a.move('stars', [0, -10, 0], 1.6);
          for (let k = 0; k < 8; k++) { a.burst([CX + 0.5, G + 48, CZ + 0.5], { n: 14, colors: ['#fff4c0', '#a0d0ff', '#ffffff'], speed: 2, up: -2, life: 2.4, gravity: 1, spread: 8 }); await a.wait(0.3); }
          await a.move('stars', [0, 0, 0], 1.6);
        },
      });
      // 열람 탁자 넷(가운데 십자 통로는 비운다): 다리·상판, 놋쇠 초록 등, 의자(등받이)
      for (const [x0, z0] of [[CX - 14, CZ - 10], [CX + 4, CZ - 10], [CX - 14, CZ + 8], [CX + 4, CZ + 8]]) {
        for (const [dx, dz] of [[0, 0], [9, 0], [0, 3], [9, 3]]) w.box(x0 + dx, G + 1, z0 + dz, x0 + dx, G + 3, z0 + dz, B.desk);
        w.box(x0 + 1, G + 2, z0 + 1, x0 + 8, G + 2, z0 + 2, B.desk);
        w.box(x0 - 1, G + 4, z0, x0 + 10, G + 4, z0 + 3, B.deskLt);
        w.set(x0 + 4, G + 5, z0 + 1, B.brass); w.box(x0 + 4, G + 6, z0 + 1, x0 + 5, G + 6, z0 + 1, B.glamp); w.set(x0 + 5, G + 5, z0 + 1, B.brass);
        w.box(x0 + 1, G + 5, z0 + 2, x0 + 2, G + 5, z0 + 3, B.parch); w.box(x0 + 7, G + 5, z0 + 2, x0 + 8, G + 6, z0 + 3, books[(x0 + z0) % 5]);
        for (const cx of [x0 + 1, x0 + 7]) for (const [cz, bz] of [[z0 - 3, z0 - 3], [z0 + 5, z0 + 6]]) {
          w.box(cx, G + 1, cz, cx + 1, G + 1, cz + 1, B.chair); w.box(cx, G + 2, cz, cx + 1, G + 2, cz + 1, B.chair);
          w.box(cx, G + 3, bz, cx + 1, G + 6, bz, B.chair);
        }
      }
      lights.push({ name: 'readN', p: [CX + 0.5, G + 7, CZ - 9], c: '#9aff9a', i: 0.7, d: 22, flicker: 0.05, srcR: 10 });
      lights.push({ name: 'readS', p: [CX + 0.5, G + 7, CZ + 9], c: '#9aff9a', i: 0.7, d: 22, flicker: 0.05, srcR: 10 });
      // 날아오를 책들(열람실 위에 떠 있다)
      const flock = w.prop({ name: 'flock', pivot: [CX + 0.5, G + 18, CZ + 0.5], axis: 'y', speed: 0.15, bob: 0.6, bobSpeed: 0.7 });
      for (let k = 0; k < 12; k++) {
        const t = k / 12 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 13), z = Math.round(CZ + Math.sin(t) * 13), y = G + 16 + (k % 3) * 2;
        flock.box(x, y, z, x + 1, y + 3, z + 2, books[k % 5]); flock.box(x, y + 4, z, x + 1, y + 4, z + 2, B.parch); flock.box(x + 2, y + 1, z, x + 2, y + 2, z + 2, B.parch);
      }
      acts.push({
        name: '책 날려 보내기', hint: '열람실 위에 떠 있던 책들이 돔까지 날아올라 빙글빙글 돌며 책장을 넘겨요', hit: [CX - 4, G + 1, CZ - 4, CX + 4, G + 22, CZ + 4],
        run: async a => {
          a.spin('flock', 8, 5);
          await a.move('flock', [0, 16, 0], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([CX + 0.5, G + 34, CZ + 0.5], { n: 22, colors: ['#ece0bc', '#ffffff', '#c8d0ff'], speed: 14, up: 2, life: 1.6, gravity: 3, spread: 4, flat: true }); await a.wait(0.4); }
          await a.move('flock', [0, 0, 0], 1.8);
        },
      });

      // ── 금서 서고(남서쪽 구석, 쇠창살) ──
      const FX1 = X0 + 23, FZ0 = Z1 - 25;
      for (let x = X0; x <= FX1; x++) for (let z = FZ0; z <= Z1; z++) w.set(x, G, z, ((x >> 1) + (z >> 1)) % 2 ? B.forbid : B.floorA);
      for (let x = X0; x <= FX1; x++) for (let y = G + 1; y <= G + 16; y++) w.set(x, y, FZ0, y >= G + 15 || y === G + 1 ? B.iron : (x % 2 ? B.iron : 0));
      for (let z = FZ0; z <= Z1; z++) { if (z >= FZ0 + 10 && z <= FZ0 + 15) continue; for (let y = G + 1; y <= G + 16; y++) w.set(FX1, y, z, y >= G + 15 || y === G + 1 ? B.iron : (z % 2 ? B.iron : 0)); }
      for (let z = FZ0; z <= Z1; z += 6) w.box(FX1, G + 17, z, FX1, G + 17, z, B.iron);
      w.box(FX1, G + 15, FZ0 + 10, FX1, G + 16, FZ0 + 15, B.iron); w.box(FX1, G + 17, FZ0 + 12, FX1, G + 18, FZ0 + 13, B.seal);
      for (let z = FZ0 + 2; z <= Z1 - 2; z++) for (let y = G + 1; y <= G + 12; y++) { w.set(X0, y, z, B.shelf); w.set(X0 + 1, y, z, shelfAt(z * 7, y, G + 12) || B.shelf); }
      for (let z = FZ0 + 4; z <= Z1 - 2; z += 6) for (let y = G + 3; y <= G + 11; y++) w.set(X0 + 2, y, z, (y - G) % 2 ? B.chain : 0);
      for (let z = FZ0 + 4; z <= Z1 - 2; z += 6) { w.set(X0 + 2, G + 3, z, B.chain); w.set(X0 + 2, G + 9, z, B.chain); }
      // 독서대 위 사슬에 묶인 금서(부품)
      const TX = X0 + 12, TZ = FZ0 + 12;
      w.box(TX - 1, G + 1, TZ - 1, TX + 1, G + 1, TZ + 1, B.desk); w.box(TX, G + 2, TZ, TX, G + 4, TZ, B.desk); w.box(TX - 2, G + 5, TZ - 1, TX + 2, G + 5, TZ + 1, B.deskLt);
      for (const [dx, dz] of [[-6, -6], [6, -6], [-6, 6], [6, 6]]) { w.box(TX + dx, G + 1, TZ + dz, TX + dx, G + 8, TZ + dz, B.iron); w.box(TX + dx, G + 9, TZ + dz, TX + dx, G + 10, TZ + dz, B.seal); }
      const tome = w.prop({ name: 'tomeF', pivot: [TX + 0.5, G + 7, TZ + 0.5], axis: 'y' });
      tome.box(TX - 2, G + 6, TZ - 1, TX + 2, G + 7, TZ + 1, B.forbid); tome.box(TX - 2, G + 8, TZ - 1, TX - 1, G + 8, TZ + 1, B.book5); tome.box(TX + 1, G + 8, TZ - 1, TX + 2, G + 8, TZ + 1, B.book1); tome.set(TX, G + 8, TZ, B.seal); tome.set(TX, G + 9, TZ, B.seal);
      const chains = w.prop({ name: 'chains', pivot: [TX + 0.5, G + 8, TZ + 0.5] });
      for (const [dx, dz] of [[-6, -6], [6, -6], [-6, 6], [6, 6]]) chains.line(TX + dx - Math.sign(dx), G + 8, TZ + dz - Math.sign(dz), TX + Math.sign(dx) * 3, G + 9, TZ + Math.sign(dz) * 2, B.chain);
      lights.push({ name: 'forbid', p: [TX + 0.5, G + 10, TZ + 0.5], c: '#ff4a6a', i: 1, d: 24, flicker: 0.25 });
      acts.push({
        name: '금서 사슬 풀기', hint: '쇠창살 안 금서의 사슬이 풀려 떨어지고 붉은 봉인이 번쩍이며 책이 떠올라 돌아요', hit: [TX - 6, G + 1, TZ - 6, TX + 6, G + 12, TZ + 6],
        run: async a => {
          a.flash('forbid', 5, 4.5);
          await a.move('chains', [0, -6.4, 0], 0.5);
          a.burst([TX + 0.5, G + 10, TZ + 0.5], { n: 30, colors: ['#ff4a6a', '#3a1a2a', '#ffd0d8'], speed: 10, up: 4, life: 1.2, gravity: 2, spread: 2 });
          a.spin('tomeF', 7, 3);
          await a.move('tomeF', [0, 8, 0], 1.2);
          for (let k = 0; k < 4; k++) { a.burst([TX + 0.5, G + 18, TZ + 0.5], { n: 16, colors: ['#ff4a6a', '#ffffff'], speed: 6, up: 2, life: 1, gravity: 0, spread: 1.2, flat: true }); await a.wait(0.4); }
          await a.move('tomeF', [0, 0, 0], 1); await a.move('chains', [0, 0, 0], 0.6);
        },
      });

      // ── 사서 책상(정문 남쪽)과 종, 색인 서랍장 ──
      const KX = X1 - 14, KZ = DZ + 10;
      w.box(KX, G + 1, KZ, KX + 11, G + 5, KZ + 1, B.desk); w.box(KX, G + 1, KZ, KX + 1, G + 5, KZ + 9, B.desk);
      for (let x = KX + 2; x <= KX + 10; x += 4) w.box(x, G + 2, KZ - 1, x + 1, G + 3, KZ - 1, B.deskLt);
      w.box(KX - 1, G + 6, KZ - 2, KX + 11, G + 6, KZ + 1, B.plank); w.box(KX - 1, G + 6, KZ - 2, KX + 1, G + 6, KZ + 9, B.plank);
      w.set(KX + 9, G + 7, KZ, B.brass); w.box(KX + 9, G + 8, KZ, KX + 9, G + 9, KZ, B.wax); w.set(KX + 9, G + 10, KZ, B.candle);
      w.box(KX, G + 7, KZ + 6, KX + 1, G + 7, KZ + 7, B.parch); for (let k = 0; k < 3; k++) w.box(KX, G + 7 + k, KZ + 2, KX + 1, G + 7 + k, KZ + 3, books[k]);
      w.box(KX + 6, G + 1, KZ + 6, KX + 8, G + 3, KZ + 8, B.chair); w.box(KX + 9, G + 4, KZ + 6, KX + 9, G + 8, KZ + 8, B.chair);
      const bell = w.prop({ name: 'deskbell', pivot: [KX + 5.5, G + 8, KZ - 0.5] });
      bell.cyl(KX + 5, KZ - 1, G + 7, G + 7, 1.4, B.bell); bell.cyl(KX + 5, KZ - 1, G + 8, G + 8, 1, B.bell); bell.set(KX + 5, G + 9, KZ - 1, B.gold); bell.set(KX + 5, G + 10, KZ - 1, B.gold);
      bell.set(KX + 2, G + 7, KZ - 1, B.lamp); bell.set(KX + 8, G + 7, KZ - 1, B.lamp);
      lights.push({ name: 'desk', p: [KX + 5.5, G + 9, KZ + 0.5], c: '#ffe0a0', i: 0.9, d: 20, flicker: 0.15 });
      for (let x = X1 - 20; x <= X1 - 2; x++) for (let y = G + 1; y <= G + 5; y++) w.set(x, y, Z1, (x - X1) % 3 === 0 || y === G + 1 || y === G + 5 ? B.shelf : B.plank);
      for (let x = X1 - 19; x <= X1 - 2; x += 3) for (const y of [G + 2, G + 4]) w.set(x, y, Z1 - 1, B.brass);
      for (let x = X1 - 20; x <= X1 - 2; x += 2) w.set(x, G + 6, Z1, B.gold);
      acts.push({
        name: '사서 종', hint: '사서 책상의 작은 종이 맑게 울리고 소리 고리가 도서관에 퍼져요. 쉿!', hit: [KX - 2, G + 1, KZ - 4, KX + 11, G + 10, KZ + 9],
        run: async a => {
          a.flash('desk', 3, 2.4); a.spin('deskbell', 6, 2.4);
          await a.move('deskbell', [0, 4, 0], 0.4);
          for (let k = 0; k < 4; k++) { a.burst([KX + 5.5, G + 12, KZ - 0.5], { n: 20, colors: ['#ffffff', '#ffe0a0'], speed: 12, up: 0, life: 1.2, gravity: 0, spread: 1, flat: true }); await a.wait(0.4); }
          await a.move('deskbell', [0, 0, 0], 0.4);
        },
      });

      // ── 책갈피 나비(북쪽 서가 앞에 앉아 있다) ──
      const MX = CX + 18, MZ = Z0 + 4, my = G + 12;
      const moth = w.prop({ name: 'flutter', pivot: [MX + 0.5, my + 1, MZ + 0.5], bob: 0.6, bobSpeed: 2 });
      for (let k = 0; k < 5; k++) {
        const x = MX + k * 4 - 8, y = my + (k % 2) * 4, c = k % 2 ? B.wingA : B.wingB;
        moth.box(x - 1, y, MZ, x - 1, y + 1, MZ, c); moth.box(x + 1, y, MZ, x + 1, y + 1, MZ, c); moth.set(x - 1, y + 2, MZ, c); moth.set(x + 1, y + 2, MZ, c); moth.box(x, y - 1, MZ, x, y + 1, MZ, B.parch);
      }
      const mPts = [[-8, 6, 12], [-20, 12, 28], [-12, 18, 44], [8, 16, 48], [16, 10, 28], [4, 4, 8], [0, 0, 0]];
      acts.push({
        name: '책갈피 나비', hint: '서가에 꽂혀 있던 책갈피들이 나비가 되어 열람실 위를 팔랑팔랑 날아다녀요', hit: [MX - 10, my - 2, MZ - 2, MX + 10, my + 6, MZ + 2],
        run: async a => {
          a.burst([MX + 0.5, my + 2, MZ + 2], { n: 20, colors: ['#ff9ad8', '#9ad8ff', '#ffffff'], speed: 4, up: 4, life: 1.4, gravity: -0.4, spread: 4 });
          await a.path('flutter', mPts, 14);
          a.burst([MX + 0.5, my + 2, MZ + 2], { n: 14, colors: ['#ff9ad8', '#9ad8ff'], speed: 3, up: 2, life: 1, gravity: 0, spread: 3 });
        },
      });

      landmarks.push({ name: '돔 열람실', note: '여덟 기둥과 별빛 천창', p: [CX + 0.5, G + 54, CZ + 0.5] });
      landmarks.push({ name: '금서 서고', note: '사슬에 묶인 책', p: [TX + 0.5, G + 24, TZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
