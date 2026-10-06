// 학원 구역 — 떠 있는 바위섬 군집 위의 마법 학원 (168칸으로 확장: 북쪽 하늘 선착장 섬 추가)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 150;
  // 떠 있는 섬: 윗면 높이 top, 가운데로 갈수록 깊은 바위 뿌리
  function island(w, B, cx, cz, R, top, depth, surf) {
    const n = w.noise, WW = w.W, DD = w.D;
    for (let z = Math.max(0, Math.floor(cz - R - 6)); z <= Math.min(DD - 1, cz + R + 6); z++) for (let x = Math.max(0, Math.floor(cx - R - 6)); x <= Math.min(WW - 1, cx + R + 6); x++) {
      const d = Math.hypot(x - cx, z - cz) + (n.fbm(x * 0.08 + cx, z * 0.08, 3) - 0.5) * R * 0.35;
      if (d > R) continue;
      const k = 1 - d / R, bottom = Math.max(1, top - 2 - Math.floor(Math.pow(k, 0.6) * depth + n.fbm(x * 0.2, z * 0.2, 2) * 4));
      for (let y = bottom; y <= top; y++) w.set(x, y, z, y === top ? surf(x, z) : y >= top - 2 ? B.dirt : y < bottom + 3 ? B.deep : ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 5 === 0 ? B.band : B.stone));
      w.hm[x + WW * z] = top;
      if (k < 0.2 && hash3(x, 7, z) > 0.86) { const L = 2 + (hash3(x, 8, z) * 7 | 0); for (let q = 1; q <= L; q++) w.set(x, bottom - q, z, B.root); }
    }
  }
  window.ARCANA = { island };

  MAPS.push({
    id: 'academy', cat: 'magic', name: '학원 구역', en: 'Arcanum Academy', color: '#9a8aff', seed: 301, base: 38, time: 'night', size: [W, D, Hh],
    desc: '아르카나의 심장인 마법 학원. 떠 있는 섬들 위로 대마법사의 탑이 솟고, 꼭대기에서는 수정이 쉬지 않고 궤도를 돈다. 북쪽 끝 섬에는 하늘배가 드나드는 선착장과 수정 등대가 있다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '원소학 · 소환학 · 점성술'], ['명물', '스스로 날아다니는 책 · 하늘배'], ['주의', '실험동 근처에서는 모자를 붙잡을 것']] },
    sky: ['#4a3070', '#141030', '#a080ff'], stars: true,
    hemi: ['#d8d0ff', '#2a2040', 0.62], sun: ['#e0d8ff', 0.55, [0.45, 1, 0.5]],
    day: { sky: ['#e0d8f8', '#7a8ae0', '#fff0ff'], stars: false, hemi: ['#ffffff', '#4a4460', 0.6], sun: ['#fff4e8', 0.78, [0.45, 1, 0.5]] },
    liquid: ['#1a2a6a', '#3a5ad0', '#c0e0ff'], liqSpeed: 0.8, liqGlow: true,
    fog: { start: 0.86, floor: 14, depth: 12 },
    camY: -12, zoom: 1.1,
    particles: [
      { n: 220, colors: ['#c8a0ff', '#a0c8ff'], mode: 'drift', speed: 0.3, y0: 44, y1: 130 },
      { n: 44, colors: ['#ffffff', '#e0d0ff'], mode: 'wisp', speed: 0.9, size: 2, y0: 46 },
    ],
    blocks: {
      grass: { c: '#4a3a3a', top: '#5a8a5a', v: 0.08 }, grass2: { c: '#4a3a3a', top: '#4a7a58', v: 0.08 },
      dirt: { c: '#4a3a3a', v: 0.08 }, stone: { c: '#6a6a8a', v: 0.07, pat: 'stone' }, deep: { c: '#3a3a52', v: 0.06, pat: 'stone' }, band: { c: '#7a7a9a', v: 0.05 }, root: { c: '#4a4060', v: 0.05 },
      path: { c: '#4a3a3a', top: '#a8a0b8', v: 0.08, pat: 'stone' }, pale: { c: '#c8c0d8', v: 0.04, pat: 'brick' }, paleDk: { c: '#9a92b0', v: 0.05, pat: 'brick' }, trim: { c: '#e4deee', v: 0.03 },
      roofP: { c: '#5a3a9a', v: 0.05, pat: 'tile' }, roofB: { c: '#2a4a8a', v: 0.05, pat: 'tile' }, eave: { c: '#2a2048', v: 0.03 }, gold: { c: '#e0c060', v: 0.06 },
      door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a8a', v: 0.05 }, book3: { c: '#3a7a4a', v: 0.05 },
      bark: { c: '#4a3a3a', v: 0.06 }, leaf: { c: '#3a6a5a', v: 0.1 }, leaf2: { c: '#5a8a7a', v: 0.1 }, leafP: { c: '#7a5aa8', v: 0.1 }, glass: { c: '#9ac8d8', v: 0.03 }, iron: { c: '#3a3848', v: 0.03 },
      win: { c: '#c8b0ff', night: true, day: '#8a9ad0' }, lamp: { c: '#d8c8ff', night: true, day: '#b0a8c8' },
      crys: { c: '#c080ff', glow: true }, crys2: { c: '#80e0ff', glow: true }, rune: { c: '#a890ff', glow: true }, mana: { c: '#a0d0ff', glow: true },
      flame: { c: '#ff8a3a', glow: true }, ember: { c: '#ffd060', glow: true }, owl: { c: '#7a5a3a', v: 0.08 }, owlW: { c: '#e8dcc0', v: 0.05 }, straw: { c: '#d8b060', v: 0.1 }, petal: { c: '#ff9ad8', glow: true },
      plank: { c: '#6a4a3a', v: 0.06, pat: 'plank' }, hull: { c: '#4a3050', v: 0.05, pat: 'plank' }, sail: { c: '#e8e0f4', v: 0.03 }, hedge: { c: '#2e5a48', v: 0.12 }, flowB: { c: '#8ab0ff', v: 0.06 }, crate: { c: '#8a6a4a', v: 0.06, pat: 'plank' },
    },
    build(w) {
      const B = w.id, base = w.base;
      w.hm = new Int16Array(W * D).fill(-1); w.slope = new Float32Array(W * D);
      const n = w.noise;
      const surf = (x, z) => n.fbm(x * 0.12, z * 0.12, 2) > 0.55 ? B.grass2 : B.grass;
      const CX = 79, CZ = 84;
      island(w, B, CX, CZ, 52, base, 38, surf);
      const SX = 147, SZ = 39, sy = base + 10;          // 소환진 섬
      const GX = 22, GZ = 136, gy = base - 5;           // 온실 섬
      const AX = 143, AZ = 138, ay = base + 3;          // 결투장 섬
      const KX = 94, KZ = 16, ky = base + 6;            // 새 하늘 선착장 섬(북쪽)
      island(w, B, SX, SZ, 15, sy, 18, surf); island(w, B, GX, GZ, 15, gy, 18, surf); island(w, B, AX, AZ, 15, ay, 18, surf); island(w, B, KX, KZ, 16, ky, 20, surf);
      const lights = [], acts = [], landmarks = [];
      const lane = (pts, wd) => MH.path(w, pts, wd || 2, B.path);
      // ── 섬을 잇는 아치 다리(난간·기둥·등불) ──
      const span = (a, b, ya, yb) => {
        const nn = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2), dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len;
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[1] + dz * t, y = Math.round(MH.lerp(ya, yb, t) + Math.sin(t * Math.PI) * 4);
          for (const k of [-3, -2, -1, 0, 1, 2, 3]) {
            const bx = Math.round(x + px * k), bz = Math.round(z + pz * k), edge = Math.abs(k) === 3;
            w.set(bx, y, bz, edge ? B.paleDk : (k === 0 ? B.trim : B.pale)); w.set(bx, y - 1, bz, B.paleDk); if (Math.abs(k) <= 1) w.set(bx, y - 2, bz, B.paleDk);
            for (let q = 1; q <= 3; q++) w.set(bx, y + q, bz, 0);
            if (edge) { w.set(bx, y + 1, bz, B.trim); if (i % 6 === 0) { w.set(bx, y + 2, bz, B.paleDk); w.set(bx, y + 3, bz, B.trim); w.set(bx, y + 4, bz, B.lamp); } }
          }
        }
      };
      span([117, 60], [139, 45], base, sy); span([46, 115], [30, 129], base, gy); span([114, 113], [134, 130], base, ay); span([87, 40], [91, 26], base, ky);
      // ── 대마법사의 탑 ──
      const TX = 79, TZ = 70, g = base + 1, TH = 56;
      const tr = y => 8.6 - (y - g) * 0.035;
      MH.flatten(w, 61, 52, 97, 89, base, B.path, B.stone);
      for (let z = 52; z <= 89; z++) for (let x = 61; x <= 97; x++) if ((x + z) % 2 === 0 && MH.dist(x, z, TX, TZ) < 16 && MH.dist(x, z, TX, TZ) > 13) MH.paint(w, x, z, B.paleDk);
      w.cyl(TX, TZ, g, g + 1, 12.5, B.paleDk); w.cyl(TX, TZ, g + 2, g + 2, 11, B.pale); w.ring(TX, TZ, g + 2, 10.4, 11, B.trim);
      for (let y = g; y <= g + TH; y++) w.cyl(TX, TZ, y, y, tr(y), B.pale);
      // 버팀벽 8개: 아래로 갈수록 두툼하게
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * Math.PI * 2 + Math.PI / 8;
        for (let s = 0; s <= 3; s++) { const r = tr(g) + s, x = Math.round(TX + Math.cos(a) * r), z = Math.round(TZ + Math.sin(a) * r); w.box(x, g + 2, z, x, g + 14 - s * 3, z, s === 3 ? B.paleDk : B.pale); w.set(x, g + 15 - s * 3, z, B.trim); }
      }
      // 아치 창: 창틀(위 금빛 상인방·아래 창턱)
      for (let y = g + 6; y < g + TH - 3; y += 5) for (let a = 0; a < 6; a++) {
        const ang = a / 6 * Math.PI * 2 + y * 0.21, r = tr(y), x = Math.round(TX + Math.cos(ang) * r), z = Math.round(TZ + Math.sin(ang) * r);
        w.box(x, y, z, x, y + 2, z, B.win); w.set(x, y - 1, z, B.trim); w.set(x, y + 3, z, B.gold);
      }
      // 층 발코니: 바닥 띠, 난간 기둥과 살, 등불
      const balc = [g + 18, g + 36, g + 52];
      for (const y of balc) {
        const r = tr(y); w.ring(TX, TZ, y, r - 1, r + 2.6, B.paleDk); w.ring(TX, TZ, y - 1, r - 1, r + 1.4, B.paleDk); w.ring(TX, TZ, y + 1, r + 1.6, r + 2.6, B.trim);
        for (let a = 0; a < 16; a++) { const x = Math.round(TX + Math.cos(a * Math.PI / 8) * (r + 2.1)), z = Math.round(TZ + Math.sin(a * Math.PI / 8) * (r + 2.1)); w.set(x, y + 2, z, a % 2 ? B.trim : B.lamp); }
      }
      // 정문: 금테 아치, 계단, 문 양옆 룬 기둥
      w.box(TX - 2, g, TZ + 8, TX + 2, g + 6, TZ + 9, B.door); w.box(TX - 3, g + 7, TZ + 9, TX + 3, g + 7, TZ + 9, B.gold); w.box(TX - 2, g + 8, TZ + 9, TX + 2, g + 8, TZ + 9, B.gold); w.set(TX, g + 9, TZ + 9, B.crys);
      for (const bx of [TX - 3, TX + 3]) w.box(bx, g, TZ + 9, bx, g + 6, TZ + 9, B.trim);
      for (let s = 0; s < 3; s++) w.box(TX - 4 - s, g + 2 - s, TZ + 10 + s, TX + 4 + s, g + 2 - s, TZ + 10 + s, s % 2 ? B.trim : B.paleDk);
      for (const bx of [TX - 6, TX + 6]) { w.box(bx, g + 1, TZ + 10, bx, g + 7, TZ + 10, B.paleDk); w.box(bx, g + 3, TZ + 11, bx, g + 6, TZ + 11, B.rune); w.set(bx, g + 8, TZ + 10, B.lamp); }
      // 지붕: 처마 띠, 원뿔, 네 귀퉁이 작은 첨탑, 금 꼭지
      const yTop = g + TH, rT = tr(yTop);
      w.ring(TX, TZ, yTop + 1, rT - 1, rT + 1.8, B.paleDk); w.ring(TX, TZ, yTop + 2, rT + 0.8, rT + 1.8, B.trim);
      for (let a = 0; a < 12; a++) if (a % 3) { const x = Math.round(TX + Math.cos(a * Math.PI / 6) * (rT + 1.3)), z = Math.round(TZ + Math.sin(a * Math.PI / 6) * (rT + 1.3)); w.set(x, yTop + 3, z, B.trim); }
      const rTop = MH.cone(w, TX, TZ, yTop + 2, rT + 2.2, B.roofP, 0.42, B.eave);
      for (let y = yTop + 4; y < rTop - 2; y += 4) w.ring(TX, TZ, y, Math.max(0, rT + 2.2 - (y - yTop - 2) * 0.42 - 1), rT + 2.2 - (y - yTop - 2) * 0.42, B.gold);
      for (let a = 0; a < 4; a++) { const ang = a * Math.PI / 2 + Math.PI / 4, x = Math.round(TX + Math.cos(ang) * (rT + 1)), z = Math.round(TZ + Math.sin(ang) * (rT + 1)); w.box(x, yTop + 3, z, x, yTop + 6, z, B.pale); const pt = MH.cone(w, x, z, yTop + 7, 1.6, B.roofP, 0.4); w.set(x, pt, z, B.gold); w.set(x, pt + 1, z, B.crys); }
      w.box(TX, rTop, TZ, TX, rTop + 4, TZ, B.gold); w.set(TX, rTop + 5, TZ, B.crys); w.set(TX, rTop + 6, TZ, B.crys);
      lights.push({ name: 'orbit', p: [TX + 0.5, rTop + 5, TZ + 0.5], c: '#b080ff', i: 1.6, d: 28, flicker: 0.08 });
      lights.push({ p: [TX + 0.5, g + 7, TZ + 11], c: '#d8c8ff', i: 1, d: 16, flicker: 0.05, night: true, srcR: 6 });
      // 궤도를 도는 수정과 떠다니는 책(부품)
      const orb = w.prop({ name: 'orbit', pivot: [TX + 0.5, g + TH - 6, TZ + 0.5], axis: 'y', speed: 0.45 });
      for (let k = 0; k < 4; k++) {
        const a = k / 4 * Math.PI * 2, cx = Math.round(TX + Math.cos(a) * 16), cz = Math.round(TZ + Math.sin(a) * 16), cy = g + TH - 9 + k * 2, c = k % 2 ? B.crys2 : B.crys;
        orb.box(cx, cy - 4, cz, cx, cy + 4, cz, c);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) orb.box(cx + dx, cy - 2, cz + dz, cx + dx, cy + 2, cz + dz, c);
        orb.set(cx, cy + 5, cz, B.mana); orb.set(cx, cy - 5, cz, B.mana);
      }
      const books = w.prop({ name: 'books', pivot: [TX + 0.5, g + 26, TZ + 0.5], axis: 'y', speed: -0.7 });
      for (let k = 0; k < 9; k++) { const a = k / 9 * Math.PI * 2, bx = Math.round(TX + Math.cos(a) * 14), bz = Math.round(TZ + Math.sin(a) * 14), by = g + 23 + (k % 3) * 2; books.box(bx, by, bz, bx + 1, by + 1, bz, [B.book1, B.book2, B.book3][k % 3]); books.set(bx, by, bz, B.trim); books.set(bx + 1, by + 2, bz, B.gold); }
      acts.push({
        name: '수정 궤도', hint: '수정과 책이 빠르게 돌며 빛나요', hit: [TX - 11, g + TH - 16, TZ - 11, TX + 11, rTop + 6, TZ + 11],
        run: async a => { a.flash('orbit', 3, 4.5); a.glow(1.7, 4.5); a.spin('books', 4, 4.5); await a.spin('orbit', 6, 4.5); },
      });
      landmarks.push({ name: '대마법사의 탑', note: '꼭대기에서 수정이 궤도를 돈다', p: [TX + 0.5, rTop + 11, TZ + 0.5], tag: 'TOWER' });
      // ── 대도서관(돔) ──
      const LX = 34, LZ = 58;
      const lib = MH.house(w, { x: LX, z: LZ, sx: 22, sz: 26, fh: 15, face: 'e', roof: 'flat', winGap: 4, y: base, m: { found: B.paleDk, wall: B.pale, frame: B.paleDk, win: B.win, door: B.door, roof: B.paleDk, eave: B.paleDk, lamp: B.lamp } });
      // 동쪽 열주와 박공 현관, 계단
      for (let z = LZ + 1; z <= LZ + 24; z += 4) { w.box(LX + 23, base + 1, z, LX + 23, base + 15, z, B.trim); w.box(LX + 23, base + 1, z, LX + 24, base + 1, z, B.paleDk); w.set(LX + 23, base + 15, z, B.gold); }
      w.box(LX + 22, base + 16, LZ, LX + 24, base + 16, LZ + 25, B.paleDk);
      for (let s = 0; s < 6; s++) w.box(LX + 24, base + 17 + s, LZ + 7 + s, LX + 24, base + 17 + s, LZ + 18 - s, s === 5 ? B.gold : B.pale);
      w.box(LX + 24, base + 18, LZ + 12, LX + 24, base + 19, LZ + 13, B.win);
      for (let s = 1; s <= 3; s++) w.box(LX + 24 + s, base + 1 - s + 1, LZ + 9, LX + 24 + s, base + 1 - s + 1, LZ + 16, B.paleDk);
      // 옥상 난간과 돔(금 갈빗대)
      for (let x = LX - 1; x <= LX + 22; x++) for (const z of [LZ - 1, LZ + 26]) if (x % 2) w.set(x, lib.top + 2, z, B.trim);
      for (let z = LZ - 1; z <= LZ + 26; z++) for (const x of [LX - 1, LX + 22]) if (z % 2) w.set(x, lib.top + 2, z, B.trim);
      const DX = LX + 10, DZ = LZ + 12;
      w.cyl(DX, DZ, lib.top + 1, lib.top + 4, 9.4, B.paleDk); w.ring(DX, DZ, lib.top + 4, 8.6, 9.6, B.trim);
      for (let a = 0; a < 10; a++) { const x = Math.round(DX + Math.cos(a * 0.628) * 9.2), z = Math.round(DZ + Math.sin(a * 0.628) * 9.2); w.box(x, lib.top + 2, z, x, lib.top + 3, z, B.win); }
      const dTop = MH.dome(w, DX, lib.top + 5, DZ, 9.6, B.roofB, B.gold);
      for (let a = 0; a < 8; a++) for (let t = 0; t < 1.5; t += 0.06) { const r = Math.cos(t) * 9.8, y = Math.round(lib.top + 5 + Math.sin(t) * 9.8); w.set(Math.round(DX + Math.cos(a * 0.785) * r), y, Math.round(DZ + Math.sin(a * 0.785) * r), B.gold); }
      w.cyl(DX, DZ, dTop, dTop + 2, 1.6, B.trim); w.box(DX, dTop + 3, DZ, DX, dTop + 5, DZ, B.gold);
      lights.push({ p: [lib.door[0] + 1.5, lib.door[1] + 3, lib.door[2] + 0.5], c: '#d8c8ff', i: 1, d: 13, flicker: 0.05, night: true });
      landmarks.push({ name: '대도서관', note: '푸른 돔 아래 금서 서가', p: [DX + 0.5, dTop + 8, DZ + 0.5] });
      // ── 강의동(종탑)과 기숙사 ──
      const hm = { found: B.paleDk, wall: B.pale, frame: B.paleDk, quoin: B.trim, win: B.win, sill: B.trim, door: B.door, roof: B.roofP, eave: B.eave, ridge: B.gold, chimney: B.paleDk, lamp: B.lamp, rail: B.trim, flower: B.petal };
      const hall = MH.houseX(w, { x: 93, z: 100, sx: 25, sz: 13, floors: 2, fh: 7, face: 'n', pitch: 1, dormers: 4, balcony: 1, y: base, m: hm });
      const dorms = [[38, 98, 14, 11, 'e'], [46, 120, 14, 11, 'n'], [103, 44, 12, 11, 'w']].map(([x, z, sx, sz, face], k) => MH.houseX(w, { x, z, sx, sz, floors: 3, fh: 6, face, jetty: k % 2 === 0, balcony: k === 1 ? 2 : 0, y: base, m: Object.assign({}, hm, { roof: k % 2 ? B.roofB : B.roofP }) }));
      [hall, dorms[0]].forEach(h => lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#d8c8ff', i: 0.9, d: 12, flicker: 0.05, night: true }));
      landmarks.push({ name: '학생 기숙사', note: '보라 지붕의 삼층 건물들', p: [45.5, dorms[0].peak + 6, 103.5] });
      // 강의동 지붕 가운데의 종탑과 종(부품)
      const BX = Math.floor((hall.x0 + hall.x1) / 2), BZ = Math.floor((hall.z0 + hall.z1) / 2), by0 = hall.peak - 1;
      w.box(BX - 2, hall.top, BZ - 2, BX + 2, by0, BZ + 2, B.pale);
      w.box(BX - 2, by0 + 1, BZ - 2, BX + 2, by0 + 1, BZ + 2, B.paleDk);
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.box(BX + dx, by0 + 2, BZ + dz, BX + dx, by0 + 8, BZ + dz, B.trim);
      w.box(BX - 2, by0 + 9, BZ - 2, BX + 2, by0 + 9, BZ + 2, B.paleDk);
      const bTop = MH.pyramid(w, BX - 3, BZ - 3, BX + 3, BZ + 3, by0 + 10, B.roofP, 2, B.eave); w.box(BX, bTop, BZ, BX, bTop + 2, BZ, B.gold);
      w.box(BX - 1, by0 + 8, BZ, BX + 1, by0 + 8, BZ, B.iron);
      const bell = w.prop({ name: 'bell', pivot: [BX + 0.5, by0 + 8, BZ + 0.5] });
      bell.box(BX, by0 + 6, BZ, BX, by0 + 7, BZ, B.gold); bell.box(BX - 1, by0 + 3, BZ - 1, BX + 1, by0 + 5, BZ + 1, B.gold); bell.set(BX, by0 + 3, BZ, B.ember);
      acts.push({
        name: '종탑의 종', hint: '강의동 종탑의 금종이 흔들리며 수업 시작을 알려요', hit: [BX - 3, by0 + 1, BZ - 3, BX + 3, bTop + 2, BZ + 3],
        run: async a => {
          a.glow(1.5, 4);
          for (let k = 0; k < 6; k++) {
            await a.turn('bell', [0, 0, k % 2 ? -0.7 : 0.7], 0.35);
            a.burst([BX + 0.5, by0 + 5, BZ + 0.5], { n: 24, colors: ['#ffd060', '#ffffff', '#c8b0ff'], speed: 7, up: 2, life: 1.4, gravity: -0.5, spread: 1, flat: true });
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });
      landmarks.push({ name: '강의동 종탑', note: '수업마다 금종이 울린다', p: [BX + 0.5, bTop + 6, BZ + 0.5] });
      // ── 마력의 샘과 섬 끝으로 떨어지는 마력 물줄기 ──
      const FX = 79, FZ = 114;
      for (let z = FZ - 10; z <= FZ + 10; z++) for (let x = FX - 10; x <= FX + 10; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 9.4) continue;
        if (d > 7.8) { w.set(x, base, z, B.paleDk); w.set(x, base + 1, z, B.pale); w.set(x, base + 2, z, B.trim); continue; }
        MH.setH(w, x, z, base - 2, B.stone, B.stone); w.liquid(x, z, base);
      }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = Math.round(FX + Math.cos(a) * 8.6), z = Math.round(FZ + Math.sin(a) * 8.6); w.box(x, base + 3, z, x, base + 4, z, B.paleDk); w.set(x, base + 5, z, k % 2 ? B.crys2 : B.lamp); }
      w.cyl(FX, FZ, base - 1, base + 1, 2, B.paleDk);
      w.box(FX, base + 1, FZ, FX, base + 9, FZ, B.crys2); w.box(FX - 1, base + 3, FZ, FX + 1, base + 6, FZ, B.crys2); w.box(FX, base + 3, FZ - 1, FX, base + 6, FZ + 1, B.crys2);
      for (const [dx, dz] of [[2, 1], [-2, -1], [1, -2], [-1, 2]]) w.box(FX + dx, base + 1, FZ + dz, FX + dx, base + 3, FZ + dz, B.crys);
      lights.push({ name: 'mana', p: [FX + 0.5, base + 7, FZ + 0.5], c: '#70d0ff', i: 1.5, d: 22, flicker: 0.06 });
      for (let z = FZ + 9; z < D; z++) for (const x of [FX, FX + 1]) { const gg = MH.g(w, x, z); if (gg < 0) break; MH.setH(w, x, z, base - 2, B.stone, B.stone); w.liquid(x, z, base - 1); if (z % 4 === 0) for (const ex of [FX - 1, FX + 2]) if (MH.g(w, ex, z) === base) w.set(ex, base + 1, z, B.trim); }
      acts.push({
        name: '마력의 샘', hint: '수정에서 마력이 솟구쳐요', hit: [FX - 8, base + 1, FZ - 8, FX + 8, base + 10, FZ + 8],
        run: async a => { a.flash('mana', 3.5, 3.5); for (let k = 0; k < 8; k++) { a.burst([FX + 0.5, base + 10, FZ + 0.5], { n: 40, colors: ['#a0d0ff', '#80e0ff', '#ffffff'], speed: 5, up: 13, life: 1.8, gravity: 9, spread: 1 }); await a.wait(0.35); } },
      });
      landmarks.push({ name: '마력의 샘', note: '학원의 마력이 솟는 곳', p: [FX + 0.5, base + 17, FZ + 0.5] });
      // ── 소환진 섬(북동쪽): 룬 원과 떠오르는 돌 ──
      MH.flatten(w, SX - 9, SZ - 9, SX + 9, SZ + 9, sy, B.path, B.stone);
      MH.circle(w, SX, SZ, 9, B.rune); MH.circle(w, SX, SZ, 5, B.rune); MH.circle(w, SX, SZ, 7, B.paleDk);
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * Math.PI * 2; MH.paint(w, Math.round(SX + Math.cos(a) * 7), Math.round(SZ + Math.sin(a) * 7), B.rune);
        w.line(SX + Math.cos(a) * 5, sy, SZ + Math.sin(a) * 5, SX + Math.cos(a + 2.09) * 5, sy, SZ + Math.sin(a + 2.09) * 5, B.rune);
        const px = Math.round(SX + Math.cos(a) * 12), pz = Math.round(SZ + Math.sin(a) * 12), pg = MH.g(w, px, pz);
        if (pg >= 0) { w.box(px - 1, pg + 1, pz - 1, px + 1, pg + 1, pz + 1, B.paleDk); w.box(px, pg + 2, pz, px, pg + 7, pz, B.pale); w.set(px, pg + 5, pz, B.rune); w.set(px, pg + 8, pz, B.trim); w.set(px, pg + 9, pz, B.crys); }
      }
      const stone = w.prop({ name: 'rstone', pivot: [SX + 0.5, sy + 4, SZ + 0.5], axis: 'y', speed: 0.3, bob: 0.4, bobSpeed: 0.8 });
      stone.ellipsoid(SX, sy + 6, SZ, 2.8, 4, 2.8, B.paleDk); stone.box(SX, sy + 5, SZ + 3, SX, sy + 7, SZ + 3, B.rune); stone.box(SX - 3, sy + 6, SZ, SX - 3, sy + 7, SZ, B.rune); stone.set(SX + 3, sy + 6, SZ, B.rune); stone.set(SX, sy + 10, SZ, B.crys);
      lights.push({ name: 'circle', p: [SX + 0.5, sy + 3, SZ + 0.5], c: '#a080ff', i: 1.2, d: 20, flicker: 0.1 });
      acts.push({
        name: '소환진', hint: '룬이 빛나고 돌이 떠오르며 빛기둥이 솟아요', hit: [SX - 7, sy + 1, SZ - 7, SX + 7, sy + 11, SZ + 7],
        run: async a => {
          a.flash('circle', 4, 4.5); a.spin('rstone', 8, 4.5);
          await a.move('rstone', [0, 9, 0], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, sy + 1, SZ + 0.5], { n: 50, colors: ['#a890ff', '#c080ff', '#ffffff'], speed: 1.5, up: 18, life: 1.6, gravity: -1, spread: 5 }); await a.wait(0.4); }
          await a.move('rstone', [0, 0, 0], 1.8);
        },
      });
      landmarks.push({ name: '소환진', note: '소환학 실습용 룬 원', p: [SX + 0.5, sy + 18, SZ + 0.5] });
      // ── 온실 섬(남서쪽) ──
      w.cyl(GX, GZ, gy + 1, gy + 1, 9.4, B.paleDk); w.ring(GX, GZ, gy + 2, 8.4, 9.4, B.paleDk); w.ring(GX, GZ, gy + 3, 8.6, 9.4, B.trim);
      w.sphere(GX, gy + 3, GZ, 9, B.glass, (dx, dy, dz) => dy >= 0 && Math.hypot(dx, dy, dz) > 8 && ((dx + dz) % 3 === 0 || dy % 3 === 0));
      w.sphere(GX, gy + 3, GZ, 9, B.iron, (dx, dy, dz) => dy >= 0 && Math.hypot(dx, dy, dz) > 8 && (dx === 0 || dz === 0));
      for (let i = 0; i < 16; i++) { const a = i * 0.52, r = 2.4 + (i % 3) * 1.8; MH.leafBlob(w, Math.round(GX + Math.cos(a) * r), gy + 3, Math.round(GZ + Math.sin(a) * r), 1.6, 1.8, 1.6, [i % 2 ? B.leafP : B.leaf2, B.leaf, B.leaf, B.petal]); }
      w.box(GX, gy + 2, GZ, GX, gy + 7, GZ, B.bark); MH.leafBlob(w, GX, gy + 9, GZ, 3.4, 2.6, 3.4, [B.leafP, B.leaf2, B.leaf, B.crys2]);
      w.box(GX + 8, gy + 2, GZ - 1, GX + 9, gy + 5, GZ + 1, B.door); w.set(GX + 9, gy + 6, GZ, B.lamp);
      landmarks.push({ name: '수정 온실', note: '달빛 약초를 기르는 유리 돔', p: [GX + 0.5, gy + 18, GZ + 0.5] });
      // ── 결투장 섬(남동쪽) ──
      MH.flatten(w, AX - 10, AZ - 10, AX + 10, AZ + 10, ay, B.path, B.stone);
      w.ring(AX, AZ, ay + 1, 9, 10.8, B.paleDk); w.ring(AX, AZ, ay + 2, 9.6, 10.8, B.pale); w.ring(AX, AZ, ay + 3, 10, 10.8, B.trim); MH.circle(w, AX, AZ, 6, B.trim);
      for (let x = AX - 1; x <= AX + 1; x++) for (let y = ay + 1; y <= ay + 3; y++) for (const z of [AZ - 10, AZ - 9, AZ - 11]) if (MH.dist(x, z, AX, AZ) > 8.8) w.set(x, y, z, 0);
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.78, px = Math.round(AX + Math.cos(a) * 10), pz = Math.round(AZ + Math.sin(a) * 10); w.box(px, ay + 1, pz, px, ay + 9, pz, B.pale); w.set(px, ay + 4, pz, B.trim); w.set(px, ay + 10, pz, B.lamp); if (k % 2 === 0) lights.push({ p: [px + 0.5, ay + 10, pz + 0.5], c: '#d8c8ff', i: 1, d: 14, flicker: 0.05, night: true }); }
      landmarks.push({ name: '결투장', note: '원소학 실기 시험장', p: [AX + 0.5, ay + 14, AZ + 0.5] });
      // ── 새 구역: 하늘 선착장 섬(북쪽) — 나무 잔교, 하늘배, 수정 등대 ──
      MH.flatten(w, KX - 9, KZ - 6, KX + 8, KZ + 9, ky, B.path, B.stone);
      for (let z = KZ - 6; z <= KZ + 9; z++) for (let x = KX - 9; x <= KX + 8; x++) if ((x * 3 + z) % 7 === 0) MH.paint(w, x, z, B.paleDk);
      const PZ0 = KZ + 2;                                   // 잔교: 섬 서쪽 끝에서 바깥으로
      for (let x = KX - 27; x <= KX - 8; x++) for (let z = PZ0 - 1; z <= PZ0 + 2; z++) {
        if (MH.g(w, x, z) > ky) continue;
        w.set(x, ky, z, B.plank); if (z === PZ0 - 1 || z === PZ0 + 2) { if (x % 3 === 0) { w.box(x, ky + 1, z, x, ky + 2, z, B.bark); } else w.set(x, ky + 2, z, B.bark); }
        if (x % 6 === 0 && (z === PZ0 || z === PZ0 + 1)) w.box(x, ky - 6, z, x, ky - 1, z, B.bark);
      }
      for (const x of [KX - 26, KX - 14]) { w.box(x, ky + 1, PZ0 - 1, x, ky + 5, PZ0 - 1, B.iron); w.set(x, ky + 5, PZ0 - 2, B.iron); w.set(x, ky + 4, PZ0 - 2, B.lamp); }
      lights.push({ p: [KX - 25.5, ky + 4, PZ0 - 1.5], c: '#ffe0a0', i: 1, d: 14, flicker: 0.1, night: true });
      // 짐 상자와 통
      for (const [x, z, h] of [[KX - 6, KZ - 4, 2], [KX - 4, KZ - 4, 1], [KX - 6, KZ - 2, 1], [KX + 4, KZ + 6, 2]]) { w.box(x, ky + 1, z, x + 1, ky + h, z + 1, B.crate); w.set(x, ky + h, z, B.straw); }
      // 하늘배(부품): 잔교 북쪽에 떠서 정박
      const shX = KX - 24, shZ = PZ0 - 5, shY = ky + 3, shLen = 15;
      const ship = w.prop({ name: 'skiff', pivot: [shX + 7.5, shY + 0.5, shZ + 0.5], bob: 0.35, bobSpeed: 1.1 });
      MH.ship(ship, shX, shY, shZ, shLen, { hull: B.hull, deck: B.plank, rail: B.gold, keel: B.eave, mast: B.bark, sail: B.sail }, { half: 2, mast: 11 });
      ship.box(shX + 1, shY + 1, shZ - 1, shX + 2, shY + 2, shZ + 1, B.crate); ship.set(shX + 12, shY + 1, shZ, B.crys2); ship.set(shX + 4, shY - 2, shZ, B.crys); ship.set(shX + 10, shY - 2, shZ, B.crys);
      ship.box(shX + 8, shY + 11, shZ, shX + 8, shY + 12, shZ, B.crys2);
      for (let x = KX - 25; x <= KX - 8; x++) for (let y = ky + 1; y <= ky + 3; y++) if (w.get(x, y, PZ0 - 1) && x >= shX - 2 && x <= shX + shLen + 2 && y >= shY - 1) w.set(x, y, PZ0 - 1, 0);
      // 하늘길: 떠올라 섬들을 한 바퀴 돌고 서쪽 지도 밖 구름 속으로 사라진다
      const sRoute = [[shX + 22, shZ + 0.5], [118, 18], [136, 60], [132, 106], [100, 134], [56, 136], [28, 106], [20, 70], [-24, 52]];
      const shPts = [[0, 10, 0], [14.5, 18, 0]].concat(sRoute.slice(1).map(([x, z]) => [x - shX - 7.5, 34, z - shZ - 0.5]));
      acts.push({
        name: '하늘배 출항', hint: '선착장의 하늘배가 떠올라 학원 섬들을 한 바퀴 돌고 구름 너머로 떠나요', hit: [shX - 1, shY - 2, shZ - 3, shX + shLen + 1, shY + 12, shZ + 3],
        run: async a => {
          a.burst([shX + 7.5, shY - 1, shZ + 0.5], { n: 50, colors: ['#80e0ff', '#c080ff', '#ffffff'], speed: 4, up: -2, life: 1.4, gravity: 3, spread: 5 });
          await a.drive('skiff', shPts, 17, { fwd: '+x', back: 1.0 });
          a.burst([shX + 7.5, shY - 1, shZ + 0.5], { n: 30, colors: ['#80e0ff', '#ffffff'], speed: 3, up: 1, life: 1, gravity: 2, spread: 5, flat: true });
        },
      });
      landmarks.push({ name: '하늘 선착장', note: '학원과 바깥을 잇는 하늘배 나루', p: [shX + 7.5, ky + 20, shZ + 0.5] });
      // 수정 등대
      const LHX = KX + 4, LHZ = KZ - 2;
      const lhTop = MH.tower(w, { cx: LHX, cz: LHZ, y0: ky + 1, h: 26, r: 3.4, m: { wall: B.pale, band: B.paleDk, win: B.win, cren: B.trim } });
      w.cyl(LHX, LHZ, lhTop, lhTop, 2.4, B.paleDk);
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.box(LHX + dx, lhTop + 1, LHZ + dz, LHX + dx, lhTop + 4, LHZ + dz, B.iron);
      w.box(LHX, lhTop + 1, LHZ, LHX, lhTop + 4, LHZ, B.crys2); w.box(LHX - 1, lhTop + 2, LHZ, LHX + 1, lhTop + 3, LHZ, B.crys2); w.box(LHX, lhTop + 2, LHZ - 1, LHX, lhTop + 3, LHZ + 1, B.crys2);
      const lhR = MH.cone(w, LHX, LHZ, lhTop + 5, 3.4, B.roofB, 0.5, B.gold); w.box(LHX, lhR, LHZ, LHX, lhR + 2, LHZ, B.gold);
      w.box(LHX - 1, ky + 1, LHZ + 3, LHX + 1, ky + 4, LHZ + 3, B.door);
      lights.push({ name: 'beacon', p: [LHX + 0.5, lhTop + 3, LHZ + 0.5], c: '#80e0ff', i: 1.4, d: 24, flicker: 0.08 });
      const beam = w.prop({ name: 'beam', pivot: [LHX + 0.5, lhTop + 2.5, LHZ + 0.5], axis: 'y', speed: 0.6 });
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; for (let r = 4; r <= 10; r++) beam.set(Math.round(LHX + Math.cos(a) * r), lhTop + 2 + (r > 6 ? 1 : 0) * (k % 2), Math.round(LHZ + Math.sin(a) * r), r % 3 === 0 ? B.crys2 : B.mana); }
      acts.push({
        name: '등대 신호', hint: '수정 등대의 빛줄기가 빠르게 돌며 하늘에 신호를 쏘아 올려요', hit: [LHX - 4, lhTop - 6, LHZ - 4, LHX + 4, lhR + 2, LHZ + 4],
        run: async a => {
          a.flash('beacon', 4, 5.5); a.glow(1.6, 5.5); a.spin('beam', 7, 5.5);
          for (let k = 0; k < 5; k++) { a.burst([LHX + 0.5, lhR + 2, LHZ + 0.5], { n: 40, colors: ['#80e0ff', '#ffffff', '#c080ff'], speed: 2, up: 20, life: 1.6, gravity: 2, spread: 1 }); await a.wait(0.8); }
          for (let k = 0; k < 3; k++) { a.burst([LHX + 0.5, lhTop + 3, LHZ + 0.5], { n: 50, colors: ['#80e0ff', '#ffffff'], speed: 12, up: 0, life: 1.2, gravity: 0, spread: 1, flat: true }); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '수정 등대', note: '안개 낀 밤 하늘배를 이끄는 빛', p: [LHX + 0.5, lhR + 7, LHZ + 0.5] });
      // ── 길, 생울타리, 꽃밭, 벤치, 가로등 ──
      lane([[TX, 80], [FX, 104]], 2.4); lane([[TX, 86], [60, 80], [58, 71]], 2); lane([[FX, 92], [100, 96], [118, 114]]); lane([[88, 70], [108, 64], [120, 58]]); lane([[58, 110], [42, 116], [45, 116]]); lane([[84, 60], [88, 40]]); lane([[FX + 9, FZ], [104, 120], [104, 116]]);
      const hedge = (x0, z0, x1, z1) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) { const gg = MH.g(w, x, z); if (gg === base && !w.get(x, gg + 1, z) && w.get(x, gg, z) !== B.path) { w.set(x, gg + 1, z, B.hedge); if ((x + z) % 4 === 0) w.set(x, gg + 2, z, B.hedge); } } };
      hedge(TX - 6, 90, TX - 4, 100); hedge(TX + 5, 90, TX + 7, 100);
      for (const [fx, fz] of [[70, 92], [88, 92], [64, 102], [94, 120], [58, 94]]) for (let dz = -1; dz <= 1; dz++) for (let dx = -2; dx <= 2; dx++) { const gg = MH.g(w, fx + dx, fz + dz); if (gg === base && !w.get(fx + dx, gg + 1, fz + dz) && w.get(fx + dx, gg, fz + dz) !== B.path) w.set(fx + dx, gg + 1, fz + dz, (dx + dz + fx) % 3 === 0 ? B.petal : (dx + fz) % 2 ? B.flowB : B.leaf2); }
      for (const [bx, bz] of [[74, 98], [85, 98]]) { const gg = MH.g(w, bx, bz); if (gg === base) { w.box(bx, gg + 1, bz, bx + 2, gg + 1, bz, B.door); w.set(bx, gg + 1, bz, B.iron); w.set(bx + 2, gg + 1, bz, B.iron); } }
      for (const [lx, lz] of [[73, 92], [86, 92], [104, 98]]) if (MH.g(w, lx, lz) >= 0 && !w.get(lx, MH.g(w, lx, lz) + 1, lz)) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.paleDk }, h: 7 }), c: '#d8c8ff', i: 1, d: 14, flicker: 0.05, night: true });
      for (const [lx, lz] of [[58, 88], [112, 70], [66, 132], [98, 130]]) if (MH.g(w, lx, lz) >= 0 && !w.get(lx, MH.g(w, lx, lz) + 1, lz)) MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.paleDk }, h: 7 });
      for (let i = 0; i < 40; i++) {
        const a = w.r(0, 6.28), d = w.r(10, 47), x = Math.round(CX + Math.cos(a) * d), z = Math.round(CZ + Math.sin(a) * d), gg = MH.g(w, x, z);
        if (gg < 0 || w.get(x, gg + 1, z) || w.get(x, gg, z) === B.path || w.liq[x + W * z] >= 0 || MH.dist(x, z, TX, TZ) < 18 || MH.dist(x, z, FX, FZ) < 12) continue;
        let clear = true; for (let q = 2; q <= 14; q++) if (w.get(x, gg + q, z) || w.get(x + 4, gg + q, z) || w.get(x - 4, gg + q, z) || w.get(x, gg + q, z + 4) || w.get(x, gg + q, z - 4)) clear = false;
        if (clear) MH.tree(w, x, gg + 1, z, { kind: 'oak', h: w.ri(7, 11), bark: B.bark, leaves: [i % 3 ? B.leaf2 : B.leafP, B.leaf, B.leaf], r: w.r(3.2, 4.2) });
      }
      // 풀숲과 빛나는 버섯, 바위 조각
      for (let i = 0; i < 260; i++) { const x = w.ri(2, W - 3), z = w.ri(2, D - 3), gg = MH.g(w, x, z); if (gg < 0 || w.get(x, gg + 1, z) || w.get(x, gg, z) === B.path || w.liq[x + W * z] >= 0) continue; const top = w.get(x, gg, z); if (top !== B.grass && top !== B.grass2) continue; const r = hash3(x, 3, z); w.set(x, gg + 1, z, r > 0.93 ? B.crys2 : r > 0.86 ? B.petal : r > 0.6 ? B.leaf2 : B.hedge); }
      // ── 대도서관 지붕을 맴도는 금서(부품) ──
      w.set(DX, dTop + 6, DZ, B.crys);
      lights.push({ name: 'lib', p: [DX + 0.5, dTop + 6, DZ + 0.5], c: '#ffe0a0', i: 1.2, d: 20, flicker: 0.08 });
      const tomes = w.prop({ name: 'tomes', pivot: [DX + 0.5, lib.top + 4, DZ + 0.5], axis: 'y', speed: 0.12, bob: 0.3, bobSpeed: 0.9 });
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, bx = Math.round(DX + Math.cos(a) * 13), bz = Math.round(DZ + Math.sin(a) * 13), by = lib.top + 4 + (k % 2) * 2; tomes.box(bx, by, bz, bx, by + 1, bz + 1, [B.book1, B.book2, B.book3][k % 3]); tomes.box(bx, by + 2, bz, bx, by + 2, bz + 1, B.trim); }
      acts.push({
        name: '금서의 비행', hint: '지붕 위 책들이 날아올라 돔 둘레를 맴돌아요', hit: [LX - 2, lib.top + 1, LZ, LX + 22, dTop + 6, LZ + 25],
        run: async a => {
          a.flash('lib', 3, 5); a.spin('tomes', 7, 5);
          await a.move('tomes', [0, 11, 0], 1.4);
          for (let k = 0; k < 6; k++) { a.burst([DX + 0.5, lib.top + 15 + k, DZ + 0.5], { n: 30, colors: ['#fff8e0', '#ffe0a0', '#c8b0ff'], speed: 11, up: 1, life: 1.6, gravity: 1, spread: 3 }); await a.wait(0.4); }
          await a.move('tomes', [0, 0, 0], 1.6);
        },
      });
      // ── 결투장: 기둥 위의 불꽃 구슬과 얼음 구슬(부품)이 가운데서 부딪친다 ──
      MH.circle(w, AX, AZ, 3, B.rune); MH.circle(w, AX, AZ, 8, B.rune);
      const duelOrb = (nm, k, c) => {
        const a = k * 1.57 + 0.78, px = Math.round(AX + Math.cos(a) * 10), pz = Math.round(AZ + Math.sin(a) * 10);
        const p = w.prop({ name: nm, pivot: [px + 0.5, ay + 14.5, pz + 0.5], axis: 'y', speed: 1.2, bob: 0.4, bobSpeed: 1.6 });
        p.sphere(px, ay + 14, pz, 1.8, c); p.set(px, ay + 16, pz, B.ember); p.set(px + 2, ay + 14, pz, B.ember); p.set(px - 2, ay + 14, pz, B.ember);
        return [AX - px, AZ - pz];
      };
      const fo = duelOrb('fireOrb', 1, B.flame), io = duelOrb('iceOrb', 3, B.crys2);
      acts.push({
        name: '원소 대결', hint: '불꽃 구슬과 얼음 구슬이 날아와 결투장 한가운데서 부딪쳐요', hit: [AX - 10, ay + 1, AZ - 10, AX + 10, ay + 16, AZ + 10],
        run: async a => {
          a.spin('fireOrb', 5, 6); a.spin('iceOrb', 5, 6);
          for (const k of [0.6, 1]) {
            a.move('fireOrb', [fo[0] * k - 0.5, -7, fo[1] * k + 0.5], 0.9); await a.move('iceOrb', [io[0] * k + 0.5, -7, io[1] * k - 0.5], 0.9);
            a.lightning(0.6 * k); a.glow(1.8, 0.8);
            a.burst([AX + 0.5, ay + 7, AZ + 0.5], { n: 50, colors: ['#ff8a3a', '#ffd060', '#80e0ff', '#ffffff'], speed: 12, up: 3, life: 1.2, gravity: 4, spread: 1 });
            a.move('fireOrb', [fo[0] * 0.3, -3, fo[1] * 0.3], 0.6); await a.move('iceOrb', [io[0] * 0.3, -3, io[1] * 0.3], 0.6);
          }
          for (let k = 0; k < 4; k++) { a.burst([AX + 0.5, ay + 2, AZ + 0.5], { n: 30, colors: k % 2 ? ['#80e0ff', '#ffffff'] : ['#ff8a3a', '#ffd060'], speed: 10, up: 1, life: 1, gravity: 2, spread: 4, flat: true }); await a.wait(0.3); }
          a.move('fireOrb', [0, 0, 0], 1.3); await a.move('iceOrb', [0, 0, 0], 1.3);
        },
      });
      // ── 수정 온실 옆 마법꽃: 봉오리에서 거대한 꽃이 자란다(부품, 평소엔 숨김) ──
      const FLX = 33, FLZ = 141;
      MH.leafBlob(w, FLX + 1, gy + 1, FLZ + 1, 1.4, 1, 1.4, [B.leaf2, B.leafP, B.leaf]);
      const bloom = w.prop({ name: 'bloom', pivot: [FLX + 0.5, gy + 1, FLZ + 0.5], axis: 'y', speed: 0.6, scl0: [0, 0, 0], clipOK: 20 });
      bloom.box(FLX, gy + 1, FLZ, FLX, gy + 13, FLZ, B.leaf); bloom.box(FLX + 1, gy + 5, FLZ, FLX + 2, gy + 5, FLZ, B.leaf2); bloom.box(FLX - 2, gy + 8, FLZ, FLX - 1, gy + 8, FLZ, B.leaf2); bloom.set(FLX + 2, gy + 6, FLZ, B.leaf2); bloom.set(FLX - 2, gy + 9, FLZ, B.leaf2);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { const d = Math.abs(dx) + Math.abs(dz); if (d === 0 || d > 5) continue; bloom.set(FLX + dx, gy + 14 + (d >= 4 ? 1 : 0), FLZ + dz, d === 1 ? B.ember : B.petal); }
      bloom.set(FLX, gy + 14, FLZ, B.ember); bloom.set(FLX, gy + 15, FLZ, B.ember);
      acts.push({
        name: '마법꽃 개화', hint: '온실 옆 봉오리에서 거대한 꽃이 피어나 꽃가루를 뿌려요', hit: [FLX - 5, gy + 1, FLZ - 5, FLX + 5, gy + 16, FLZ + 5],
        run: async a => {
          a.glow(1.6, 6.5);
          await a.tween('bloom', { scl: [1, 1, 1] }, 2.2);
          for (let k = 0; k < 6; k++) { a.burst([FLX + 0.5, gy + 15, FLZ + 0.5], { n: 30, colors: ['#ff9ad8', '#ffd060', '#ffffff'], speed: 4, up: 3, life: 2.2, gravity: -0.6, spread: 3 }); await a.wait(0.5); }
          await a.tween('bloom', { scl: [0, 0, 0] }, 1.6);
        },
      });
      // ── 탑 발코니의 전령 부엉이(부품): 탑을 한 바퀴 날고 돌아온다 ──
      const OX = TX + 8, OZ = TZ + 3, oy = balc[0] + 1;
      for (let x = OX - 1; x <= OX + 2; x++) for (let z = OZ - 2; z <= OZ + 3; z++) for (let y = oy; y <= oy + 4; y++) if (MH.dist(x, z, TX, TZ) > tr(y) + 0.4) w.set(x, y, z, 0);
      const owl = w.prop({ name: 'owl', pivot: [OX + 1, oy + 1.5, OZ + 1] });
      owl.box(OX, oy, OZ, OX + 1, oy + 1, OZ + 1, B.owl); owl.box(OX, oy + 2, OZ, OX + 1, oy + 2, OZ + 1, B.owlW);
      owl.set(OX + 2, oy + 2, OZ, B.ember); owl.set(OX + 2, oy + 2, OZ + 1, B.ember); owl.set(OX, oy + 3, OZ, B.owl); owl.set(OX, oy + 3, OZ + 1, B.owl);
      owl.box(OX, oy + 1, OZ - 1, OX + 1, oy + 1, OZ - 1, B.owl); owl.box(OX, oy + 1, OZ + 2, OX + 1, oy + 1, OZ + 2, B.owl);
      const owlPts = [], r0 = Math.hypot(OX + 1 - TX, OZ + 1 - TZ), t0 = Math.atan2(OZ + 1 - TZ, OX + 1 - TX);
      for (let i = 1, pyw = 0; i <= 16; i++) {
        const s = Math.sin(i / 16 * Math.PI), t = t0 + i / 16 * Math.PI * 2, r = r0 + Math.pow(s, 0.4) * 9;
        let yw = Math.atan2(-Math.cos(t), -Math.sin(t)); while (yw - pyw > Math.PI) yw -= Math.PI * 2; while (yw - pyw < -Math.PI) yw += Math.PI * 2; pyw = yw;
        owlPts.push([TX + Math.cos(t) * r - OX - 1, Math.pow(s, 1.5) * 16, TZ + Math.sin(t) * r - OZ - 1, yw]);
      }
      owlPts[15][1] = 20; owlPts.push([190 - OX, 34, 60 - OZ]);
      acts.push({
        name: '전령 부엉이', hint: '발코니의 부엉이가 날개를 펴고 탑을 한 바퀴 돈 뒤 편지를 물고 멀리 날아가요', hit: [OX - 2, oy - 1, OZ - 2, OX + 3, oy + 4, OZ + 3],
        run: async a => {
          a.burst([OX + 1, oy + 2, OZ + 1], { n: 20, colors: ['#e8dcc0', '#7a5a3a'], speed: 3, up: 2, life: 1.2, gravity: 3, spread: 1 });
          await a.drive('owl', owlPts.map(q => q.slice(0, 3)), 10, { fwd: '+x', back: 1.0 });
          a.burst([OX + 1, oy + 2, OZ + 1], { n: 16, colors: ['#e8dcc0', '#ffd060'], speed: 2, up: 1, life: 1, gravity: 3, spread: 1 });
        },
      });
      // ── 동쪽 잔디의 빗자루 발판: 빗자루 두 자루(부품)가 섬을 한 바퀴 돈다 ──
      const BRX = 120, BRZ = 86;
      MH.circle(w, BRX, BRZ + 1, 5, B.rune); MH.circle(w, BRX, BRZ + 1, 3, B.paleDk); MH.paint(w, BRX, BRZ + 1, B.rune);
      for (let y = base + 1; y <= base + 6; y++) for (let z = BRZ - 3; z <= BRZ + 5; z++) for (let x = BRX - 7; x <= BRX + 6; x++) w.set(x, y, z, 0);
      const broom = (nm, z) => { const p = w.prop({ name: nm, pivot: [BRX + 0.5, base + 3.5, z + 0.5], bob: 0.3, bobSpeed: 1.3, phase: z }); p.box(BRX - 2, base + 3, z, BRX + 4, base + 3, z, B.bark); p.box(BRX - 5, base + 2, z - 1, BRX - 3, base + 4, z + 1, B.straw); p.set(BRX - 2, base + 3, z, B.gold); p.set(BRX + 4, base + 3, z, B.crys); return p; };
      broom('broomA', BRZ - 1); broom('broomB', BRZ + 3);
      const loop = [[BRX, BRZ], [134, 62], [110, 26], [58, 24], [22, 68], [34, 128], [80, 148], [BRX, BRZ]];
      loop[loop.length - 1] = [96, 190];                 // 마지막엔 남쪽 지도 밖으로
      const brPts = [[0, 8, 0], [10, 14, 0]].concat(loop.slice(1).map(([x, z]) => [x - BRX, 30, z - BRZ]));
      const fly = async (a, nm) => { await a.drive(nm, brPts, 12, { fwd: '+x', back: 1.0 }); };
      acts.push({
        name: '빗자루 비행', hint: '룬 발판의 빗자루 두 자루가 떠올라 섬을 한 바퀴 돌고 멀리 날아가요', hit: [BRX - 6, base + 1, BRZ - 4, BRX + 6, base + 6, BRZ + 6],
        run: async a => {
          a.burst([BRX + 0.5, base + 2, BRZ + 1.5], { n: 40, colors: ['#a890ff', '#ffd060', '#ffffff'], speed: 6, up: 4, life: 1.4, gravity: 2, spread: 3 });
          fly(a, 'broomA'); await a.wait(0.7); await fly(a, 'broomB');
          a.burst([BRX + 0.5, base + 2, BRZ + 1.5], { n: 40, colors: ['#a890ff', '#ffd060', '#ffffff'], speed: 6, up: 2, life: 1.2, gravity: 2, spread: 3, flat: true });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
