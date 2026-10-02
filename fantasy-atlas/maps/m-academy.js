// 학원 구역 — 떠 있는 바위섬 군집 위의 마법 학원 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  // 떠 있는 섬: 윗면 높이 top, 가운데로 갈수록 깊은 바위 뿌리
  function island(w, B, cx, cz, R, top, depth, surf) {
    const n = w.noise;
    for (let z = Math.max(0, Math.floor(cz - R - 6)); z <= Math.min(D - 1, cz + R + 6); z++) for (let x = Math.max(0, Math.floor(cx - R - 6)); x <= Math.min(W - 1, cx + R + 6); x++) {
      const d = Math.hypot(x - cx, z - cz) + (n.fbm(x * 0.08 + cx, z * 0.08, 3) - 0.5) * R * 0.35;
      if (d > R) continue;
      const k = 1 - d / R, bottom = Math.max(1, top - 2 - Math.floor(Math.pow(k, 0.6) * depth + n.fbm(x * 0.2, z * 0.2, 2) * 4));
      for (let y = bottom; y <= top; y++) w.set(x, y, z, y === top ? surf(x, z) : y >= top - 2 ? B.dirt : y < bottom + 3 ? B.deep : ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 5 === 0 ? B.band : B.stone));
      w.hm[x + W * z] = top;
      if (k < 0.2 && hash3(x, 7, z) > 0.86) { const L = 2 + (hash3(x, 8, z) * 7 | 0); for (let q = 1; q <= L; q++) w.set(x, bottom - q, z, B.root); }
    }
  }
  window.ARCANA = { island };

  MAPS.push({
    id: 'academy', cat: 'magic', name: '학원 구역', en: 'Arcanum Academy', color: '#9a8aff', seed: 301, base: 38, time: 'night',
    desc: '아르카나의 심장인 마법 학원. 떠 있는 섬들 위로 대마법사의 탑이 솟고, 꼭대기에서는 수정이 쉬지 않고 궤도를 돈다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '원소학 · 소환학 · 점성술'], ['명물', '스스로 날아다니는 책'], ['주의', '실험동 근처에서는 모자를 붙잡을 것']] },
    sky: ['#4a3070', '#141030', '#a080ff'], stars: true,
    hemi: ['#d8d0ff', '#2a2040', 0.62], sun: ['#e0d8ff', 0.55, [0.45, 1, 0.5]],
    day: { sky: ['#e0d8f8', '#7a8ae0', '#fff0ff'], stars: false, hemi: ['#ffffff', '#4a4460', 0.6], sun: ['#fff4e8', 0.78, [0.45, 1, 0.5]] },
    liquid: ['#1a2a6a', '#3a5ad0', '#c0e0ff'], liqSpeed: 0.8, liqGlow: true,
    fog: { start: 0.86, floor: 14, depth: 12 },
    camY: 8,
    particles: [
      { n: 180, colors: ['#c8a0ff', '#a0c8ff'], mode: 'drift', speed: 0.3, y0: 40, y1: 100 },
      { n: 36, colors: ['#ffffff', '#e0d0ff'], mode: 'wisp', speed: 0.9, size: 2, y0: 44 },
    ],
    blocks: {
      grass: { c: '#4a3a3a', top: '#5a8a5a', v: 0.08 }, grass2: { c: '#4a3a3a', top: '#4a7a58', v: 0.08 },
      dirt: { c: '#4a3a3a', v: 0.08 }, stone: { c: '#6a6a8a', v: 0.07, pat: 'stone' }, deep: { c: '#3a3a52', v: 0.06, pat: 'stone' }, band: { c: '#7a7a9a', v: 0.05 }, root: { c: '#4a4060', v: 0.05 },
      path: { c: '#4a3a3a', top: '#a8a0b8', v: 0.08, pat: 'stone' }, pale: { c: '#c8c0d8', v: 0.04, pat: 'brick' }, paleDk: { c: '#9a92b0', v: 0.05, pat: 'brick' }, trim: { c: '#e4deee', v: 0.03 },
      roofP: { c: '#5a3a9a', v: 0.05, pat: 'tile' }, roofB: { c: '#2a4a8a', v: 0.05, pat: 'tile' }, eave: { c: '#2a2048', v: 0.03 }, gold: { c: '#e0c060', v: 0.06 }, banner: { c: '#5a2a8a', v: 0.03 },
      door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a8a', v: 0.05 }, book3: { c: '#3a7a4a', v: 0.05 },
      bark: { c: '#4a3a3a', v: 0.06 }, leaf: { c: '#3a6a5a', v: 0.1 }, leaf2: { c: '#5a8a7a', v: 0.1 }, leafP: { c: '#7a5aa8', v: 0.1 }, glass: { c: '#9ac8d8', v: 0.03 }, iron: { c: '#3a3848', v: 0.03 },
      win: { c: '#c8b0ff', night: true, day: '#8a9ad0' }, lamp: { c: '#d8c8ff', night: true, day: '#b0a8c8' },
      crys: { c: '#c080ff', glow: true }, crys2: { c: '#80e0ff', glow: true }, rune: { c: '#a890ff', glow: true }, mana: { c: '#a0d0ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      w.hm = new Int16Array(W * D).fill(-1); w.slope = new Float32Array(W * D);
      const surf = (x, z) => n.fbm(x * 0.12, z * 0.12, 2) > 0.55 ? B.grass2 : B.grass;
      const CX = 60, CZ = 64;
      island(w, B, CX, CZ, 40, base, 30, surf);
      const isl = [[112, 30, 11, base + 8], [16, 104, 12, base - 4], [110, 106, 12, base + 2]];
      for (const [x, z, r, top] of isl) island(w, B, x, z, r, top, 14, surf);
      const lights = [], acts = [], landmarks = [];
      const lane = (pts, wd) => MH.path(w, pts, wd || 2, B.path);
      // ── 섬을 잇는 아치 다리 ──
      const span = (a, b, ya, yb) => {
        const nn = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2), dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len;
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[1] + dz * t, y = Math.round(MH.lerp(ya, yb, t) + Math.sin(t * Math.PI) * 4);
          for (const k of [-2, -1, 0, 1, 2]) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); w.set(bx, y, bz, Math.abs(k) === 2 ? B.paleDk : B.pale); w.set(bx, y - 1, bz, B.paleDk); if (Math.abs(k) === 2) { w.set(bx, y + 1, bz, B.trim); if (i % 5 === 0) { w.set(bx, y + 2, bz, B.trim); w.set(bx, y + 3, bz, B.lamp); } } }
        }
      };
      span([92, 46], [104, 35], base, base + 8); span([26, 88], [22, 96], base, base - 4); span([90, 90], [102, 100], base, base + 2);
      // ── 대마법사의 탑 ──
      const TX = 60, TZ = 54, g = base + 1, TH = 44;
      MH.flatten(w, 46, 40, 74, 68, base, B.path, B.stone);
      w.cyl(TX, TZ, g, g + 2, 9, B.paleDk);
      for (let y = g; y <= g + TH; y++) w.cyl(TX, TZ, y, y, 6.6 - (y - g) * 0.035, B.pale);
      for (let y = g + 5; y < g + TH - 2; y += 4) for (let a = 0; a < 4; a++) { const ang = a / 4 * Math.PI * 2 + y * 0.35, r = 6.4 - (y - g) * 0.035; const x = Math.round(TX + Math.cos(ang) * r), z = Math.round(TZ + Math.sin(ang) * r); w.box(x, y, z, x, y + 1, z, B.win); }
      for (const y of [g + 14, g + 28, g + 42]) { const r = 6.6 - (y - g) * 0.035; w.ring(TX, TZ, y, r - 1, r + 2.2, B.paleDk); w.ring(TX, TZ, y + 1, r + 1.2, r + 2.2, B.trim); for (let a = 0; a < 8; a++) w.set(Math.round(TX + Math.cos(a * 0.785) * (r + 2)), y + 2, Math.round(TZ + Math.sin(a * 0.785) * (r + 2)), B.lamp); }
      w.box(TX - 1, g, TZ + 7, TX + 1, g + 5, TZ + 7, B.door); w.box(TX - 2, g + 6, TZ + 7, TX + 2, g + 6, TZ + 7, B.gold);
      for (const bx of [TX - 4, TX + 4]) w.box(bx, g + 16, TZ + 6, bx, g + 26, TZ + 6, B.banner);
      const rTop = MH.cone(w, TX, TZ, g + TH + 1, 8, B.roofP, 0.45, B.eave);
      w.box(TX, rTop, TZ, TX, rTop + 4, TZ, B.gold); w.set(TX, rTop + 5, TZ, B.crys);
      lights.push({ name: 'orbit', p: [TX + 0.5, rTop + 5, TZ + 0.5], c: '#b080ff', i: 1.6, d: 24, flicker: 0.08 });
      lights.push({ p: [TX + 0.5, g + 6, TZ + 9], c: '#d8c8ff', i: 1, d: 14, flicker: 0.05, night: true, srcR: 6 });
      // 궤도를 도는 수정과 떠다니는 책(부품)
      const orb = w.prop({ name: 'orbit', pivot: [TX + 0.5, g + TH - 6, TZ + 0.5], axis: 'y', speed: 0.45 });
      for (let k = 0; k < 4; k++) {
        const a = k / 4 * Math.PI * 2, cx = Math.round(TX + Math.cos(a) * 13), cz = Math.round(TZ + Math.sin(a) * 13), cy = g + TH - 8 + k * 2, c = k % 2 ? B.crys2 : B.crys;
        orb.box(cx, cy - 3, cz, cx, cy + 3, cz, c);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) orb.box(cx + dx, cy - 1, cz + dz, cx + dx, cy + 1, cz + dz, c);
      }
      const books = w.prop({ name: 'books', pivot: [TX + 0.5, g + 20, TZ + 0.5], axis: 'y', speed: -0.7 });
      for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2, bx = Math.round(TX + Math.cos(a) * 11), bz = Math.round(TZ + Math.sin(a) * 11), by = g + 18 + (k % 3) * 2; books.box(bx, by, bz, bx + 1, by + 1, bz, [B.book1, B.book2, B.book3][k % 3]); books.set(bx, by, bz, B.trim); }
      acts.push({
        name: '수정 궤도', hint: '수정과 책이 빠르게 돌며 빛나요', hit: [TX - 9, g + TH - 14, TZ - 9, TX + 9, rTop + 5, TZ + 9],
        run: async a => { a.flash('orbit', 3, 4.5); a.glow(1.7, 4.5); a.spin('books', 4, 4.5); await a.spin('orbit', 6, 4.5); },
      });
      landmarks.push({ name: '대마법사의 탑', note: '꼭대기에서 수정이 궤도를 돈다', p: [TX + 0.5, rTop + 10, TZ + 0.5], tag: 'TOWER' });
      // ── 대도서관(돔) ──
      const LX = 28, LZ = 46;
      const lib = MH.house(w, { x: LX, z: LZ, sx: 17, sz: 21, fh: 12, face: 'e', roof: 'flat', winGap: 4, y: base, m: { found: B.paleDk, wall: B.pale, frame: B.paleDk, win: B.win, door: B.door, roof: B.paleDk, eave: B.paleDk, lamp: B.lamp } });
      for (let z = LZ + 1; z <= LZ + 19; z += 4) { w.box(LX + 17, base + 1, z, LX + 17, base + 12, z, B.trim); w.box(LX + 17, base + 1, z, LX + 18, base + 1, z, B.paleDk); }
      w.cyl(LX + 8, LZ + 10, lib.top + 1, lib.top + 3, 7.4, B.paleDk);
      const dTop = MH.dome(w, LX + 8, lib.top + 4, LZ + 10, 7.6, B.roofB, B.gold);
      w.box(LX + 8, dTop, LZ + 10, LX + 8, dTop + 3, LZ + 10, B.gold);
      for (let a = 0; a < 8; a++) { const x = Math.round(LX + 8 + Math.cos(a * 0.785) * 7.2), z = Math.round(LZ + 10 + Math.sin(a * 0.785) * 7.2); w.box(x, lib.top + 2, z, x, lib.top + 3, z, B.win); }
      lights.push({ p: [lib.door[0] + 1.5, lib.door[1] + 3, lib.door[2] + 0.5], c: '#d8c8ff', i: 1, d: 12, flicker: 0.05, night: true });
      landmarks.push({ name: '대도서관', note: '푸른 돔 아래 금서 서가', p: [LX + 8.5, dTop + 6, LZ + 10.5] });
      // ── 강의동과 기숙사 ──
      const hm = { found: B.paleDk, wall: B.pale, frame: B.paleDk, quoin: B.trim, win: B.win, sill: B.trim, door: B.door, roof: B.roofP, eave: B.eave, ridge: B.gold, chimney: B.paleDk, lamp: B.lamp };
      const hall = MH.houseX(w, { x: 68, z: 76, sx: 20, sz: 11, floors: 2, fh: 6, face: 'n', pitch: 1, dormers: 3, y: base, m: hm });
      const dorms = [[30, 78, 12, 9, 'e'], [36, 92, 12, 9, 'n'], [78, 36, 10, 9, 'w']].map(([x, z, sx, sz, face], k) => MH.houseX(w, { x, z, sx, sz, floors: 3, fh: 5, face, jetty: k % 2 === 0, y: base, m: Object.assign({}, hm, { roof: k % 2 ? B.roofB : B.roofP }) }));
      [hall, dorms[0], dorms[2]].forEach(h => lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#d8c8ff', i: 0.9, d: 11, flicker: 0.05, night: true }));
      landmarks.push({ name: '학생 기숙사', note: '보라 지붕의 삼층 건물들', p: [36.5, dorms[0].peak + 5, 82.5] });
      // ── 마력의 샘과 섬 끝으로 떨어지는 마력 물줄기 ──
      const FX = 60, FZ = 86;
      for (let z = FZ - 8; z <= FZ + 8; z++) for (let x = FX - 8; x <= FX + 8; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 7.4) continue;
        if (d > 6) { w.set(x, base, z, B.paleDk); w.set(x, base + 1, z, B.pale); w.set(x, base + 2, z, B.trim); continue; }
        MH.setH(w, x, z, base - 2, B.stone, B.stone); w.liquid(x, z, base);
      }
      w.box(FX, base - 1, FZ, FX, base + 7, FZ, B.crys2); w.box(FX - 1, base + 2, FZ, FX + 1, base + 4, FZ, B.crys2); w.box(FX, base + 2, FZ - 1, FX, base + 4, FZ + 1, B.crys2);
      lights.push({ name: 'mana', p: [FX + 0.5, base + 6, FZ + 0.5], c: '#70d0ff', i: 1.5, d: 20, flicker: 0.06 });
      for (let z = FZ + 7; z < D; z++) for (const x of [FX, FX + 1]) { const gg = MH.g(w, x, z); if (gg < 0) break; MH.setH(w, x, z, base - 2, B.stone, B.stone); w.liquid(x, z, base - 1); }
      acts.push({
        name: '마력의 샘', hint: '수정에서 마력이 솟구쳐요', hit: [FX - 6, base + 1, FZ - 6, FX + 6, base + 8, FZ + 6],
        run: async a => { a.flash('mana', 3.5, 3.5); for (let k = 0; k < 8; k++) { a.burst([FX + 0.5, base + 8, FZ + 0.5], { n: 40, colors: ['#a0d0ff', '#80e0ff', '#ffffff'], speed: 5, up: 12, life: 1.8, gravity: 9, spread: 1 }); await a.wait(0.35); } },
      });
      landmarks.push({ name: '마력의 샘', note: '학원의 마력이 솟는 곳', p: [FX + 0.5, base + 15, FZ + 0.5] });
      // ── 소환진 섬(북동쪽): 룬 원과 떠오르는 돌 ──
      const SX = 112, SZ = 30, sy = base + 8;
      MH.flatten(w, SX - 7, SZ - 7, SX + 7, SZ + 7, sy, B.path, B.stone);
      MH.circle(w, SX, SZ, 7, B.rune); MH.circle(w, SX, SZ, 4, B.rune);
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; MH.paint(w, Math.round(SX + Math.cos(a) * 5.5), Math.round(SZ + Math.sin(a) * 5.5), B.rune); const px = Math.round(SX + Math.cos(a) * 9), pz = Math.round(SZ + Math.sin(a) * 9); if (MH.g(w, px, pz) >= 0) { w.box(px, MH.g(w, px, pz) + 1, pz, px, MH.g(w, px, pz) + 6, pz, B.paleDk); w.set(px, MH.g(w, px, pz) + 7, pz, B.crys); } }
      const stone = w.prop({ name: 'rstone', pivot: [SX + 0.5, sy + 3, SZ + 0.5], axis: 'y', speed: 0.3, bob: 0.4, bobSpeed: 0.8 });
      stone.ellipsoid(SX, sy + 5, SZ, 2.2, 3.2, 2.2, B.paleDk); stone.box(SX, sy + 4, SZ + 2, SX, sy + 6, SZ + 2, B.rune); stone.box(SX - 2, sy + 5, SZ, SX - 2, sy + 5, SZ, B.rune); stone.set(SX + 2, sy + 5, SZ, B.rune);
      lights.push({ name: 'circle', p: [SX + 0.5, sy + 3, SZ + 0.5], c: '#a080ff', i: 1.2, d: 18, flicker: 0.1 });
      acts.push({
        name: '소환진', hint: '룬이 빛나고 돌이 떠오르며 빛기둥이 솟아요', hit: [SX - 6, sy + 1, SZ - 6, SX + 6, sy + 9, SZ + 6],
        run: async a => {
          a.flash('circle', 4, 4.5); a.spin('rstone', 8, 4.5);
          await a.move('rstone', [0, 8, 0], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, sy + 1, SZ + 0.5], { n: 50, colors: ['#a890ff', '#c080ff', '#ffffff'], speed: 1.5, up: 16, life: 1.6, gravity: -1, spread: 4 }); await a.wait(0.4); }
          await a.move('rstone', [0, 0, 0], 1.8);
        },
      });
      landmarks.push({ name: '소환진', note: '소환학 실습용 룬 원', p: [SX + 0.5, sy + 16, SZ + 0.5] });
      // ── 온실 섬(남서쪽)과 결투장 섬(남동쪽) ──
      const GX = 16, GZ = 104, gy = base - 4;
      w.cyl(GX, GZ, gy + 1, gy + 1, 7, B.paleDk); w.ring(GX, GZ, gy + 2, 6, 7, B.paleDk);
      w.sphere(GX, gy + 3, GZ, 7, B.glass, (dx, dy, dz) => dy >= 0 && Math.hypot(dx, dy, dz) > 6 && ((dx + dz) % 3 === 0 || dy % 3 === 0));
      for (let i = 0; i < 12; i++) { const a = i * 0.52, r = 2 + (i % 3) * 1.4; MH.leafBlob(w, Math.round(GX + Math.cos(a) * r), gy + 3, Math.round(GZ + Math.sin(a) * r), 1.6, 1.8, 1.6, [i % 2 ? B.leafP : B.leaf2, B.leaf, B.leaf]); }
      w.box(GX, gy + 2, GZ, GX, gy + 5, GZ, B.bark); MH.leafBlob(w, GX, gy + 7, GZ, 3, 2.4, 3, [B.leafP, B.leaf2, B.leaf, B.crys2]);
      landmarks.push({ name: '수정 온실', note: '달빛 약초를 기르는 유리 돔', p: [GX + 0.5, gy + 16, GZ + 0.5] });
      const AX = 110, AZ = 106, ay = base + 2;
      MH.flatten(w, AX - 8, AZ - 8, AX + 8, AZ + 8, ay, B.path, B.stone);
      w.ring(AX, AZ, ay + 1, 7, 8.4, B.paleDk); w.ring(AX, AZ, ay + 2, 7.4, 8.4, B.pale); MH.circle(w, AX, AZ, 5, B.trim);
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.78, px = Math.round(AX + Math.cos(a) * 8), pz = Math.round(AZ + Math.sin(a) * 8); w.box(px, ay + 1, pz, px, ay + 7, pz, B.pale); w.set(px, ay + 8, pz, B.lamp); if (k % 2 === 0) lights.push({ p: [px + 0.5, ay + 8, pz + 0.5], c: '#d8c8ff', i: 1, d: 13, flicker: 0.05, night: true }); }
      landmarks.push({ name: '결투장', note: '원소학 실기 시험장', p: [AX + 0.5, ay + 12, AZ + 0.5] });
      // ── 길, 나무, 가로등 ──
      lane([[60, 62], [60, 80]]); lane([[60, 66], [46, 60], [46, 56]]); lane([[60, 70], [74, 74], [90, 88]]); lane([[66, 56], [84, 50], [92, 46]]); lane([[44, 84], [30, 88], [26, 88]]);
      for (const [lx, lz] of [[54, 72], [66, 72], [50, 94], [72, 94], [84, 56]]) if (MH.g(w, lx, lz) >= 0 && !w.get(lx, MH.g(w, lx, lz) + 1, lz)) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.paleDk }, h: 6 }), c: '#d8c8ff', i: 1, d: 13, flicker: 0.05, night: true });
      for (let i = 0; i < 26; i++) {
        const a = w.r(0, 6.28), d = w.r(8, 36), x = Math.round(CX + Math.cos(a) * d), z = Math.round(CZ + Math.sin(a) * d), gg = MH.g(w, x, z);
        if (gg < 0 || w.get(x, gg + 1, z) || w.get(x, gg, z) === B.path || w.liq[x + W * z] >= 0 || MH.dist(x, z, TX, TZ) < 14 || MH.dist(x, z, FX, FZ) < 10) continue;
        let clear = true; for (let q = 2; q <= 12; q++) if (w.get(x, gg + q, z) || w.get(x + 3, gg + q, z) || w.get(x - 3, gg + q, z) || w.get(x, gg + q, z + 3) || w.get(x, gg + q, z - 3)) clear = false;
        if (clear) MH.tree(w, x, gg + 1, z, { kind: 'oak', h: w.ri(6, 9), bark: B.bark, leaves: [i % 3 ? B.leaf2 : B.leafP, B.leaf, B.leaf], r: w.r(2.8, 3.6) });
      }
      return { lights, landmarks, acts };
    },
  });
})();
