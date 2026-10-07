// 학원 구역 — 떠 있는 바위섬 군집 위의 마법 학원 (336칸, 2배 해상도 · 1칸 ≈ 25cm)
// 늘어난 해상도로 세부를 그린다: 낱돌 줄눈을 쌓은 대마법사의 탑(층층 버팀벽·아치 창틀과 창살·까치발 발코니와 난간 살·기와 원뿔 지붕과 첨탑),
// 열주(받침·기둥·주두)와 박공·장미창이 있는 대도서관과 갈빗대 푸른 돔, 창틀·덧문·꽃상자·겹 기와의 강의동과 기숙사,
// 난간 살과 등불 기둥이 있는 아치 다리, 수정 다발이 솟는 마력의 샘, 바퀴살 무늬 룬 원, 사람 폭만 한 빗자루 등.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 300;
  // 떠 있는 섬: 윗면 높이 top, 가운데로 갈수록 깊은 바위 뿌리(2배 해상도: 줄무늬·뿌리는 2칸 단위)
  function island(w, B, cx, cz, R, top, depth, surf) {
    const n = w.noise, WW = w.W, DD = w.D;
    for (let z = Math.max(0, Math.floor(cz - R - 12)); z <= Math.min(DD - 1, cz + R + 12); z++) for (let x = Math.max(0, Math.floor(cx - R - 12)); x <= Math.min(WW - 1, cx + R + 12); x++) {
      const d = Math.hypot(x - cx, z - cz) + (n.fbm(x * 0.04 + cx, z * 0.04, 3) - 0.5) * R * 0.35;
      if (d > R) continue;
      const k = 1 - d / R, bottom = Math.max(1, top - 4 - Math.floor(Math.pow(k, 0.6) * depth + n.fbm(x * 0.1, z * 0.1, 2) * 8));
      for (let y = bottom; y <= top; y++) w.set(x, y, z, y === top ? surf(x, z) : y >= top - 4 ? B.dirt : y < bottom + 6 ? B.deep : ((y + (hash3(x >> 3, 0, z >> 3) * 6 | 0)) % 10 < 2 ? B.band : B.stone));
      w.hm[x + WW * z] = top;
      if (k < 0.2 && !(x & 1) && !(z & 1) && hash3(x >> 1, 7, z >> 1) > 0.8) { const L = 4 + (hash3(x, 8, z) * 14 | 0); for (let q = 1; q <= L; q++) for (const [ox, oz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) if (q < L - 2 || (ox + oz) === 0) w.set(x + ox, bottom - q, z + oz, B.root); }
    }
  }
  window.ARCANA = { island };

  MAPS.push({
    id: 'academy', cat: 'magic', name: '학원 구역', en: 'Arcanum Academy', color: '#9a8aff', seed: 301, base: 76, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '아르카나의 심장인 마법 학원. 떠 있는 섬들 위로 대마법사의 탑이 솟고, 꼭대기에서는 수정이 쉬지 않고 궤도를 돈다. 북쪽 끝 섬에는 하늘배가 드나드는 선착장과 수정 등대가 있다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '원소학 · 소환학 · 점성술'], ['명물', '스스로 날아다니는 책 · 하늘배'], ['주의', '실험동 근처에서는 모자를 붙잡을 것']] },
    sky: ['#4a3070', '#141030', '#a080ff'], stars: true,
    hemi: ['#d8d0ff', '#2a2040', 0.62], sun: ['#e0d8ff', 0.55, [0.45, 1, 0.5]],
    day: { sky: ['#e0d8f8', '#7a8ae0', '#fff0ff'], stars: false, hemi: ['#ffffff', '#4a4460', 0.6], sun: ['#fff4e8', 0.78, [0.45, 1, 0.5]] },
    liquid: ['#1a2a6a', '#3a5ad0', '#c0e0ff'], liqSpeed: 0.8, liqGlow: true,
    fog: { start: 0.86, floor: 28, depth: 24 },
    camY: -24, zoom: 1.1,
    particles: [
      { n: 260, colors: ['#c8a0ff', '#a0c8ff'], mode: 'drift', speed: 0.6, y0: 88, y1: 260 },
      { n: 52, colors: ['#ffffff', '#e0d0ff'], mode: 'wisp', speed: 1.8, size: 2, y0: 92 },
    ],
    blocks: {
      grass: { c: '#4a3a3a', top: '#5a8a5a', v: 0.08 }, grass2: { c: '#4a3a3a', top: '#4a7a58', v: 0.08 },
      dirt: { c: '#4a3a3a', v: 0.08 }, stone: { c: '#6a6a8a', v: 0.07, pat: 'stone' }, deep: { c: '#3a3a52', v: 0.06, pat: 'stone' }, band: { c: '#7a7a9a', v: 0.05 }, root: { c: '#4a4060', v: 0.05 },
      path: { c: '#4a3a3a', top: '#a8a0b8', v: 0.06 }, path2: { c: '#4a3a3a', top: '#9a92ac', v: 0.06 }, path3: { c: '#4a3a3a', top: '#b6aec4', v: 0.06 }, pathJ: { c: '#4a3a3a', top: '#7a7290', v: 0.04 },
      pale: { c: '#c8c0d8', v: 0.04, pat: 'brick' }, paleDk: { c: '#9a92b0', v: 0.05, pat: 'brick' }, trim: { c: '#e4deee', v: 0.03 },
      st1: { c: '#c8c0d8', v: 0.04 }, st2: { c: '#b8b0cc', v: 0.04 }, st3: { c: '#d4cee2', v: 0.04 }, st4: { c: '#bcb4d0', v: 0.04 }, mortar: { c: '#9a92b0', v: 0.03 }, sill: { c: '#d8d0e4', v: 0.03 },
      roofP: { c: '#5a3a9a', v: 0.04 }, roofP2: { c: '#4a2e86', v: 0.04 }, roofP3: { c: '#6a4aaa', v: 0.04 }, roofPDk: { c: '#3a2468', v: 0.03 },
      roofB: { c: '#2a4a8a', v: 0.04 }, roofB2: { c: '#223e78', v: 0.04 }, roofB3: { c: '#3a5a9a', v: 0.04 }, roofBDk: { c: '#1a2e5a', v: 0.03 },
      eave: { c: '#2a2048', v: 0.03 }, gold: { c: '#e0c060', v: 0.06 }, gutter: { c: '#5a5868', v: 0.03 },
      door: { c: '#3a2a3a', v: 0.03, pat: 'plank' }, doorDk: { c: '#2a1e2a', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 }, hinge: { c: '#262430', v: 0.02 },
      frame: { c: '#5a4a6a', v: 0.04 }, frameDk: { c: '#3e3250', v: 0.04 }, mullion: { c: '#e4deee', v: 0.02 }, shutter: { c: '#4a5a9a', v: 0.02 }, shutterDk: { c: '#3e4c88', v: 0.02 },
      book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a8a', v: 0.05 }, book3: { c: '#3a7a4a', v: 0.05 }, parch: { c: '#ece0bc', v: 0.03 },
      bark: { c: '#4a3a3a', v: 0.06 }, barkDk: { c: '#3a2c30', v: 0.05 }, leaf: { c: '#3a6a5a', v: 0.1 }, leaf2: { c: '#5a8a7a', v: 0.1 }, leafP: { c: '#7a5aa8', v: 0.1 }, leafLt: { c: '#8ab8a0', v: 0.06 },
      glass: { c: '#9ac8d8', v: 0.03 }, iron: { c: '#3a3848', v: 0.03 }, ironDk: { c: '#2a2834', v: 0.03 },
      win: { c: '#c8b0ff', night: true, day: '#8a9ad0' }, lamp: { c: '#d8c8ff', night: true, day: '#b0a8c8' },
      crys: { c: '#c080ff', glow: true }, crys2: { c: '#80e0ff', glow: true }, rune: { c: '#a890ff', glow: true }, mana: { c: '#a0d0ff', glow: true },
      flame: { c: '#ff8a3a', glow: true }, ember: { c: '#ffd060', glow: true }, owl: { c: '#7a5a3a', v: 0.08 }, owlW: { c: '#e8dcc0', v: 0.05 }, straw: { c: '#d8b060', v: 0.08 }, straw2: { c: '#c49a48', v: 0.08 }, petal: { c: '#ff9ad8', glow: true },
      plank: { c: '#6a4a3a', v: 0.06, pat: 'plank' }, plank2: { c: '#5a3e30', v: 0.05 }, hull: { c: '#4a3050', v: 0.05, pat: 'plank' }, sail: { c: '#e8e0f4', v: 0.03 },
      hedge: { c: '#2e5a48', v: 0.1 }, hedge2: { c: '#3a6a54', v: 0.1 }, flowB: { c: '#8ab0ff', v: 0.06 },
      crate: { c: '#8a6a4a', v: 0.05 }, crateEdge: { c: '#5e442e', v: 0.04 }, cask: { c: '#7a5a3a', v: 0.05 }, cask2: { c: '#6a4a30', v: 0.05 }, caskTop: { c: '#5a3e28', v: 0.04 }, rope: { c: '#8a6a4a', v: 0.04 },
      soil: { c: '#3a2a2a', v: 0.06 }, flowerStem: { c: '#3a6a44', v: 0.05 }, flowerLf: { c: '#4a7a54', v: 0.06 },
      flower: { c: '#e88ad0', v: 0.04 }, flower2: { c: '#a8b8ff', v: 0.04 }, flower3: { c: '#ffffff', v: 0.03 }, flower4: { c: '#c8a0ff', v: 0.04 }, flower5: { c: '#ffe08a', v: 0.04 },
    },
    build(w) {
      const B = w.id, base = w.base;
      w.hm = new Int16Array(W * D).fill(-1); w.slope = new Float32Array(W * D);
      const n = w.noise;
      const surf = (x, z) => n.fbm(x * 0.06, z * 0.06, 2) > 0.55 ? B.grass2 : B.grass;
      const CX = 158, CZ = 168;
      island(w, B, CX, CZ, 104, base, 76, surf);
      const SX = 294, SZ = 78, sy = base + 20;          // 소환진 섬
      const GX = 44, GZ = 272, gy = base - 10;          // 온실 섬
      const AX = 286, AZ = 276, ay = base + 6;          // 결투장 섬
      const KX = 188, KZ = 32, ky = base + 12;          // 하늘 선착장 섬(북쪽)
      island(w, B, SX, SZ, 30, sy, 36, surf); island(w, B, GX, GZ, 30, gy, 36, surf); island(w, B, AX, AZ, 30, ay, 36, surf); island(w, B, KX, KZ, 32, ky, 40, surf);
      const lights = [], acts = [], landmarks = [], keep = [];

      // ───────── 공통 도구(2배 해상도용, v-millbrook-hd에서 옮겨 학원 색으로) ─────────
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const PAVE = [B.path, B.path2, B.path3];
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 5 === 4) return B.pathJ;
        return PAVE[(hash3(Math.floor((x + off) / 5), row, 7) * 3) | 0];
      };
      const isGrass = (x, z) => { const gg = MH.g(w, x, z); if (gg < 0) return false; const b = w.get(x, gg, z); return b === B.grass || b === B.grass2; };
      const lane = (pts, wd) => {
        let x0 = 1e9, z0 = 1e9, x1 = -1e9, z1 = -1e9;
        for (const [x, z] of pts) { x0 = Math.min(x0, x); z0 = Math.min(z0, z); x1 = Math.max(x1, x); z1 = Math.max(z1, z); }
        for (let z = Math.max(0, Math.floor(z0 - wd - 2)); z <= Math.min(D - 1, z1 + wd + 2); z++) for (let x = Math.max(0, Math.floor(x0 - wd - 2)); x <= Math.min(W - 1, x1 + wd + 2); x++) {
          const d = MH.polyDist(x + 0.5, z + 0.5, pts);
          if (d > wd + 1) continue;
          const gg = MH.g(w, x, z); if (gg < 0 || w.liq[x + W * z] >= 0) continue;
          const b = w.get(x, gg, z); if (b !== B.grass && b !== B.grass2 && PAVE.indexOf(b) < 0 && b !== B.pathJ) continue;
          w.set(x, gg, z, d > wd ? B.paleDk : paveAt(x, z));
        }
      };
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); }, get: (x, y, z) => p.get(x, y, z) });
      const soft = guard(w);
      const clump = (T, cx, cy, cz, r, L) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.95 && d > 0.45) b = B.leafLt;
          T.set(x, y, z, b);
        }
      };
      // 나무: 밑동이 넓어지는 줄기와 뿌리, 굵기가 줄어드는 가지, 가지 끝마다 잎뭉치
      const tree = (x, y, z, o) => {
        const h = o.h, R0 = o.trunkR || 1.8, bark = B.bark, dk = B.barkDk, L = o.leaves;
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.55 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, streak ? dk : bark);
          }
        }
        for (let k = 0; k < 5; k++) {
          const a = k * 1.2566 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2.5;
          w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, dk, t => t < 0.5 ? 1 : 0.6);
        }
        const nB = o.branches || 5, r = o.r || 7, ends = [[x, y + h + 1, z, 1.15]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy2 = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy2 + l * w.r(0.45, 0.7);
          w.line(x, sy2, z, ex, ey, ez, bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(soft, ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 2; q++) {
            const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75;
            clump(soft, ex + Math.cos(a) * dd, ey + 1 + (q - 0.5) * rc * 0.3, ez + Math.sin(a) * dd, rc * 0.62, L);
          }
        });
      };
      const crate = (x, y, z, s) => {
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          w.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      const barrel = (x, y, z, ht) => {
        for (let r = 0; r < ht; r++) {
          const mid = r >= 2 && r <= ht - 3, rr = mid ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            let b;
            if (r === ht - 1) b = outer ? B.cask : B.caskTop;
            else if ((r === 1 || r === ht - 2) && outer) b = B.iron;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            w.set(x + dx, y + r, z + dz, b);
          }
        }
      };
      // 가로등: 받침돌, 쇠기둥, 유리 등갓, 지붕 갓
      const lampPost = (x, z, h) => {
        h = h || 12;
        const y = MH.g(w, x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.paleDk);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.ironDk); w.set(x, ly + 7, z, B.gold);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const FLW = [B.flower, B.flower2, B.flower3, B.flower4, B.flower5];
      // 둥근 몸통: 바깥 껍질은 낱돌과 줄눈, 속은 줄눈 색으로 채운다. rf(y) = 반지름
      const shaft = (cx, cz, y0, y1, rf, salt) => {
        for (let y = y0; y <= y1; y++) {
          const r = rf(y), R = Math.ceil(r);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz); if (d > r) continue;
            w.set(cx + dx, y, cz + dz, d > r - 1.6 ? (stoneAt(Math.round(Math.atan2(dz, dx) * 16), y, salt) || B.mortar) : B.mortar);
          }
        }
      };
      // 기와 원뿔: 두 줄씩 기와 줄, 4칸마다 골, 첫 줄은 처마
      const tileCone = (cx, cz, y, r, step, P4) => {
        let k = 0;
        for (let rr = r; rr > 0.3; rr -= step, k++) {
          const R = Math.ceil(rr), course = k >> 1;
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz); if (d > rr) continue;
            let b = P4[3];
            if (d > rr - 1.5 && k > 0) { const u = Math.round((Math.atan2(dz, dx) + Math.PI) * 12) + (course & 1) * 2; b = (u & 3) === 0 ? P4[1] : (hash3(u >> 2, course, 9) > 0.75 ? P4[2] : P4[0]); }
            w.set(cx + dx, y + k, cz + dz, b);
          }
        }
        return y + k;
      };
      const PURP = [B.roofP, B.roofP2, B.roofP3, B.roofPDk], BLUE = [B.roofB, B.roofB2, B.roofB3, B.roofBDk];

      // ───────── 집(v-millbrook-hd의 집 짓기) ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, B.frame); put(sd, wu + 5, wy + r, 1, B.frame); }
        for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh, 1, B.frame);
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy - 1, 1, B.sill); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.sill); }
        if (o.shutter && wu - 3 > sd.u0 + 1 && wu + 7 < sd.u1 - 1) {
          for (const c0 of [-3, 6]) for (let c = 0; c < 2; c++) for (let r = 0; r < wh; r++) {
            put(sd, wu + c0 + c, wy + r, 1, r % 2 ? B.shutter : B.shutterDk);
            if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
          }
        }
        if (o.box) {
          for (let c = -1; c <= 5; c++) { put(sd, wu + c, wy - 2, 2, B.plank); put(sd, wu + c, wy - 2, 3, B.plank); }
          for (let c = -1; c <= 5; c++) {
            const hh = hash3(wu + c, wy, sd.k.charCodeAt(0));
            put(sd, wu + c, wy - 1, 3, hh > 0.35 ? B.flowerLf : FLW[(hh * 40 | 0) % 5]);
            if ((c & 1) === 0 || hh > 0.8) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7 + (hh * 3 | 0)) % 5]);
          }
        }
      };
      const doorAt = (sd, cu, yb) => {
        const u0 = cu - 2;
        for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) {
          const stile = c === 0 || c === 4 || r === 0 || r === 4 || r === 8;
          put(sd, u0 + c, yb + r, 1, 0);
          if (stile) put(sd, u0 + c, yb + r, 0, B.doorDk);
          else { put(sd, u0 + c, yb + r, 0, 0); put(sd, u0 + c, yb + r, -1, B.door); }
        }
        put(sd, u0 + 3, yb + 4, 1, B.brass);
        for (let r = 0; r <= 9; r++) { put(sd, u0 - 1, yb + r, 1, B.frame); put(sd, u0 + 5, yb + r, 1, B.frame); }
        for (let c = -2; c <= 6; c++) put(sd, u0 + c, yb + 9, 1, B.frameDk);
        put(sd, u0 + 2, yb + 10, 1, B.gold);
        for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
          const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
          for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
          for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
        }
        const lc = u0 + 7;
        put(sd, lc, yb + 8, 1, B.iron); put(sd, lc, yb + 8, 2, B.iron); put(sd, lc, yb + 7, 2, B.ironDk);
        put(sd, lc, yb + 6, 2, B.lamp); put(sd, lc, yb + 5, 2, B.lamp); put(sd, lc, yb + 4, 2, B.ironDk);
        const lp = sd.at(lc, 2), p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp: [lp[0] + 0.5, yb + 6, lp[1] + 0.5] };
      };
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = 3, og = 2, P4 = o.pal;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            const b = s === 0 ? B.eave : seam ? P4[1] : (hash3(l >> 2, s, 5) > 0.72 ? P4[2] : P4[0]);
            P(a, l, ry, b); P(a, l, ry - 1, P4[3]);
            if (s === sMax) { P(a, l, ry + 1, B.gold); }
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        const mid = (A0 + A1) / 2, midA = Math.floor(mid);
        for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
          for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
          const gy2 = top + Math.max(2, Math.floor((mid - A0) * 0.35));
          const odd = (A1 - A0) % 2 === 0;
          for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy2 + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy2 + r, 0); }
          for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy2 - 1, B.sill); P(midA + c, out, gy2 + 3, B.frame); }
          for (let r = 0; r < 3; r++) { P(midA - 2, out, gy2 + r, B.frame); P(midA + (odd ? 2 : 3), out, gy2 + r, B.frame); }
        }
        for (const [ae, ain, sg2] of [[a0 - 1, a0, -1], [a1 + 1, a1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const l = g0 + 1;
          P(ae, l, y0 - 2, B.gutter);
          for (let k = 0; k < ov; k++) P(ain + k * -sg2, l, y0 - 3 - k, B.gutter);
          const aw = sg2 < 0 ? A0 - 1 : A1 + 1;
          for (let y = y0 - 3 - ov; y >= o.foot; y--) P(aw, l, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy0 = o.y;
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          const lo = gg < 0 ? gy0 - 8 : Math.min(gg, gy0) - 1;
          for (let y = lo; y <= gy0 + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy0 + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, stoneAt(u, y, 3) || B.mortar);
          }
        }
        let e = 0, yb = gy0 + 3;
        const out = { x0, x1, z0, z1, y: gy0, floor: gy0 + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const ePrev = e;
          if (o.jetty && f > 0) e = 2;
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, B.pale);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0;
            const nW = Math.max(1, Math.floor((L + 2) / 12)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 13) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || (isDoor && Math.abs(u - cu) <= 4);
            for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb, 1, B.paleDk); put(sd, u, yb + 1, 1, B.paleDk); put(sd, u, yb + fh - 1, 1, B.trim); }
            for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0 - 1, sd.u0, sd.u1, sd.u1 + 1]) put(sd, u, y, 1, ((y >> 1) & 1) ? B.trim : B.paleDk);
            for (let u = sd.u0 + 6; u <= sd.u1 - 3; u += 6) if (!busy(u)) for (let y = yb + 2; y < yb + fh - 1; y++) put(sd, u, y, 1, B.paleDk);
            if (e > ePrev) for (let u = sd.u0; u <= sd.u1; u += 3) { put(sd, u, yb - 1, 0, B.frameDk); put(sd, u, yb - 1, -1, B.frameDk); }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: true, box: o.box ? 1 : 0 });
            if (isDoor) { const r = doorAt(sd, cu, yb); out.door = r.door; out.lamp = r.lamp; out.side = sd; }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, pal: o.pal, gable: B.pale, foot: gy0 + 3 });
        out.top = top; out.e = e;
        keep.push([x0 - 10, z0 - 10, x1 + 10, z1 + 10]);
        return out;
      };

      // ── 섬을 잇는 아치 다리(난간 살·손잡이·등불 기둥·용골) ──
      const span = (a, b, ya, yb) => {
        const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz), nn = Math.ceil(len * 3), px = -dz / len, pz = dx / len;
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[1] + dz * t, y = Math.round(MH.lerp(ya, yb, t) + Math.sin(t * Math.PI) * 8), post = (i % 36) < 3;
          for (let k = -6; k <= 6; k += 0.5) {
            const bx = Math.round(x + px * k), bz = Math.round(z + pz * k), ak = Math.abs(k), edge = ak >= 5.5;
            w.set(bx, y, bz, edge ? B.paleDk : (ak < 1 ? B.trim : B.pale)); w.set(bx, y - 1, bz, B.paleDk); if (ak <= 2.5) { w.set(bx, y - 2, bz, B.paleDk); w.set(bx, y - 3, bz, ak < 1 ? B.trim : B.paleDk); }
            for (let q = 1; q <= 7; q++) if (!edge) w.set(bx, y + q, bz, 0);
            if (edge) {
              w.set(bx, y + 1, bz, B.paleDk);
              if (post) { for (let q = 2; q <= 6; q++) w.set(bx, y + q, bz, B.paleDk); w.set(bx, y + 7, bz, B.trim); w.set(bx, y + 8, bz, B.lamp); w.set(bx, y + 9, bz, B.lamp); w.set(bx, y + 10, bz, B.gold); }
              else { if (((bx + bz) & 1) === 0) { w.set(bx, y + 2, bz, B.trim); w.set(bx, y + 3, bz, B.trim); } w.set(bx, y + 4, bz, B.paleDk); }
            }
          }
        }
      };
      span([234, 120], [278, 90], base, sy); span([92, 230], [60, 258], base, gy); span([228, 226], [268, 260], base, ay); span([174, 80], [182, 52], base, ky);

      // ═════════ 대마법사의 탑 ═════════
      const TX = 158, TZ = 140, g = base + 1, TH = 112;
      const tr = y => 17.2 - (y - g) * 0.035;
      MH.flatten(w, 122, 104, 194, 178, base, B.path, B.stone);
      for (let z = 104; z <= 178; z++) for (let x = 122; x <= 194; x++) {
        const d = MH.dist(x, z, TX, TZ);
        if (d > 26 && d < 32) w.set(x, base, z, ((x >> 1) + (z >> 1)) % 2 ? B.paleDk : B.path3);
        else if (d >= 32 && d < 33.2) w.set(x, base, z, B.trim);
        else w.set(x, base, z, paveAt(x, z));
      }
      // 두 단 받침(아랫단 r25, 윗단 r21) — 두 칸씩 오른다
      for (let y = g; y <= g + 3; y++) {
        const r = y <= g + 1 ? 25 : 21, R = Math.ceil(r);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz); if (d > r) continue;
          w.set(TX + dx, y, TZ + dz, (y === g + 1 || y === g + 3) && d > r - 1.2 ? B.trim : (d > r - 1.6 ? (stoneAt(Math.round(Math.atan2(dz, dx) * 24), y, 2) || B.mortar) : B.paleDk));
        }
      }
      shaft(TX, TZ, g + 4, g + TH, tr, 1);
      // 몸통의 띠돌림(층마다 튀어나온 두 줄)
      for (const y of [g + 4, g + 5, g + 30, g + 31, g + 64, g + 65, g + 98, g + 99]) { const r = tr(y); w.ring(TX, TZ, y, r - 0.5, r + 0.8, y & 1 ? B.trim : B.paleDk); }
      // 버팀벽 8개: 아래로 갈수록 두툼하게 층층이
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * Math.PI * 2 + Math.PI / 8, ca = Math.cos(a), sa = Math.sin(a);
        for (let s = 0; s <= 7; s++) for (let q = -1.5; q <= 1.5; q += 0.5) {
          const r = tr(g) + s - 0.5, x = Math.round(TX + ca * r - sa * q), z = Math.round(TZ + sa * r + ca * q), yt = g + 34 - Math.floor(s / 2) * 7;
          for (let y = g + 4; y <= yt; y++) w.set(x, y, z, stoneAt(s * 3 + Math.round(q * 2), y, 4 + k) || B.mortar);
          w.set(x, yt + 1, z, B.trim);
        }
      }
      // 아치 창: 깊은 유리, 가운데 창살과 가로살, 옆 창틀, 튀어나온 창턱, 금빛 아치와 쐐기돌
      const tpt = (a, y, u, d) => { const r = tr(y), ca = Math.cos(a), sa = Math.sin(a); return [Math.round(TX + ca * (r + d) - sa * u), Math.round(TZ + sa * (r + d) + ca * u)]; };
      const tset = (a, y, u, d, b) => { const p = tpt(a, y, u, d); w.set(p[0], y, p[1], b); };
      const twin = (a, wy) => {
        for (let y = wy; y <= wy + 7; y++) for (let u = -2; u <= 2; u += 0.5) {
          if (y === wy + 7 && Math.abs(u) > 1) continue;
          const b = (Math.abs(u) < 0.5 && y < wy + 7) || y === wy + 4 ? B.iron : B.win;
          for (const d of [-0.4, -1.2]) tset(a, y, u, d, b);
        }
        for (let y = wy - 1; y <= wy + 6; y++) for (const u of [-3, 3]) tset(a, y, u, 0.4, B.trim);
        for (let u = -3.5; u <= 3.5; u += 0.5) { tset(a, wy - 1, u, 0.6, B.sill); if (Math.abs(u) <= 2.5) tset(a, wy - 2, u, 1.4, B.sill); }
        for (let u = -2.5; u <= 2.5; u += 0.5) tset(a, wy + 7 + (Math.abs(u) < 1.5 ? 1 : 0), u, 0.5, B.gold);
        tset(a, wy + 9, 0, 0.5, B.gold); tset(a, wy + 9, 0, 1.2, B.crys);
      };
      [g + 12, g + 46, g + 80].forEach((wy, ri) => { for (let a = 0; a < 6; a++) twin(a / 6 * Math.PI * 2 + ri * 1.05 + 0.3, wy); });
      [g + 20, g + 54, g + 88].forEach((wy, ri) => { for (let a = 0; a < 6; a++) twin(a / 6 * Math.PI * 2 + ri * 1.05 + 0.82, wy); });
      // 층 발코니: 계단식 까치발, 바닥, 난간 살과 손잡이, 등불
      const balc = [g + 36, g + 72, g + 104];
      for (const y of balc) {
        const r = tr(y);
        w.ring(TX, TZ, y, r - 1, r + 5, B.paleDk); w.ring(TX, TZ, y - 1, r - 1, r + 3.6, B.paleDk); w.ring(TX, TZ, y - 2, r - 1, r + 2.2, B.trim); w.ring(TX, TZ, y - 3, r - 1, r + 1.2, B.paleDk);
        for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; for (let q = 0; q <= 3; q++) { const x = Math.round(TX + Math.cos(a) * (r + q)), z = Math.round(TZ + Math.sin(a) * (r + q)); for (let yy = y - 3 - (3 - q) * 2; yy < y - 1; yy++) w.set(x, yy, z, B.paleDk); } }
        const n2 = Math.round((r + 4.6) * Math.PI);
        for (let k = 0; k < n2; k++) {
          const a = k / n2 * Math.PI * 2, x = Math.round(TX + Math.cos(a) * (r + 4.4)), z = Math.round(TZ + Math.sin(a) * (r + 4.4));
          if (k % 8 === 0) { w.box(x, y + 1, z, x, y + 4, z, B.paleDk); w.set(x, y + 5, z, B.lamp); w.set(x, y + 6, z, B.gold); }
          else if (k % 2 === 0) { w.set(x, y + 1, z, B.trim); w.set(x, y + 2, z, B.trim); w.set(x, y + 3, z, B.trim); }
        }
        w.ring(TX, TZ, y + 4, r + 3.9, r + 4.9, B.paleDk);
      }
      // 정문: 두 짝 판자문(쇠띠·놋쇠 고리), 겹 아치 문틀, 양옆 룬 기둥과 등
      const DZf = TZ + 17;
      w.box(TX - 3, g + 4, TZ + 16, TX + 3, g + 15, DZf + 1, 0);
      for (let x = TX - 3; x <= TX + 3; x++) for (let z = TZ + 16; z <= DZf + 1; z++) w.set(x, g + 3, z, B.trim);
      for (let y = g + 4; y <= g + 15; y++) for (let x = TX - 3; x <= TX + 3; x++) {
        const top = Math.abs(x - TX) === 3 ? g + 13 : Math.abs(x - TX) === 2 ? g + 14 : g + 15;
        if (y > top) { w.set(x, y, TZ + 16, B.gold); continue; }
        w.set(x, y, TZ + 16, x === TX ? B.doorDk : ((y - g) % 4 === 1 ? B.iron : B.door));
      }
      for (const x of [TX - 1, TX + 1]) w.set(x, g + 9, TZ + 17, B.brass);
      for (let y = g + 4; y <= g + 17; y++) for (const x of [TX - 4, TX + 4]) for (let z = TZ + 15; z <= DZf + 2; z++) w.set(x, y, z, (y - g) % 3 === 0 ? B.gold : B.trim);
      for (let x = TX - 5; x <= TX + 5; x++) for (let z = TZ + 15; z <= DZf + 2; z++) { const ax = Math.abs(x - TX); w.set(x, g + 16 + (ax <= 3 ? 1 : 0) + (ax <= 1 ? 1 : 0), z, B.gold); }
      w.set(TX, g + 19, DZf + 2, B.crys); w.set(TX, g + 20, DZf + 2, B.crys);
      for (const bx of [TX - 9, TX + 9]) {
        w.box(bx - 1, g + 4, DZf + 2, bx + 1, g + 4, DZf + 3, B.paleDk); w.box(bx, g + 5, DZf + 2, bx, g + 16, DZf + 2, B.trim);
        w.box(bx, g + 8, DZf + 3, bx, g + 13, DZf + 3, B.rune); w.box(bx - 1, g + 17, DZf + 1, bx + 1, g + 17, DZf + 3, B.paleDk); w.set(bx, g + 18, DZf + 2, B.lamp); w.set(bx, g + 19, DZf + 2, B.lamp); w.set(bx, g + 20, DZf + 2, B.gold);
      }
      acts.push(OR.goAct({ at: [TX, g + 4, DZf], h: 8, name: '대마법사의 탑 안으로', goto: 'academy-tower', hint: '금테 아치 정문을 열고 룬 원이 빛나는 탑 안 현관 홀로 들어가요', hit: [TX - 3, g + 4, TZ + 16, TX + 3, g + 15, DZf + 2] }));
      // 지붕: 내민 처마 띠(까치발), 총안 난간, 기와 원뿔, 네 귀퉁이 작은 첨탑, 금 꼭지
      const yTop = g + TH, rT = tr(yTop);
      w.ring(TX, TZ, yTop + 1, rT - 1, rT + 2.4, B.paleDk); w.ring(TX, TZ, yTop + 2, rT - 1, rT + 3.6, B.paleDk); w.ring(TX, TZ, yTop + 3, rT + 1.6, rT + 3.6, B.trim);
      for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2, x = Math.round(TX + Math.cos(a) * (rT + 1.2)), z = Math.round(TZ + Math.sin(a) * (rT + 1.2)); w.set(x, yTop, z, B.paleDk); w.set(x, yTop - 1, z, B.trim); }
      for (let k = 0; k < 48; k++) if (k % 4 < 2) { const a = k / 48 * Math.PI * 2, x = Math.round(TX + Math.cos(a) * (rT + 2.8)), z = Math.round(TZ + Math.sin(a) * (rT + 2.8)); w.box(x, yTop + 4, z, x, yTop + 6, z, B.trim); }
      const rTop = tileCone(TX, TZ, yTop + 4, rT + 3, 0.2, PURP);
      for (let y = yTop + 10; y < rTop - 4; y += 9) { const rr = rT + 3 - (y - yTop - 4) * 0.2; w.ring(TX, TZ, y, Math.max(0, rr - 1), rr + 0.3, B.gold); }
      for (let a = 0; a < 4; a++) {
        const ang = a * Math.PI / 2 + Math.PI / 4, x = Math.round(TX + Math.cos(ang) * (rT + 4.2)), z = Math.round(TZ + Math.sin(ang) * (rT + 4.2));
        w.cyl(x, z, yTop + 1, yTop + 3, 2.6, B.paleDk); shaft(x, z, yTop + 4, yTop + 13, () => 2.2, 6); w.ring(x, z, yTop + 13, 1.5, 3, B.trim);
        for (const [dx, dz] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) w.box(x + dx, yTop + 8, z + dz, x + dx, yTop + 10, z + dz, B.win);
        const pt = tileCone(x, z, yTop + 14, 3.4, 0.3, PURP); w.box(x, pt, z, x, pt + 1, z, B.gold); w.box(x, pt + 2, z, x, pt + 3, z, B.crys);
      }
      w.box(TX, rTop, TZ, TX, rTop + 8, TZ, B.gold); w.ring(TX, TZ, rTop + 2, 0.5, 1.6, B.gold); w.ring(TX, TZ, rTop + 6, 0.5, 1.2, B.gold);
      for (let dy = 0; dy <= 6; dy++) { const rr = dy < 3 ? dy * 0.6 : (6 - dy) * 0.6; w.cyl(TX, TZ, rTop + 9 + dy, rTop + 9 + dy, rr + 0.2, B.crys); }
      lights.push({ name: 'orbit', p: [TX + 0.5, rTop + 11, TZ + 0.5], c: '#b080ff', i: 1.6, d: 56, flicker: 0.08 });
      lights.push({ p: [TX + 0.5, g + 14, DZf + 4], c: '#d8c8ff', i: 1, d: 32, flicker: 0.05, night: true, srcR: 12 });
      // 궤도를 도는 수정(팔면체)과 떠다니는 책(부품)
      const orb = w.prop({ name: 'orbit', pivot: [TX + 0.5, g + TH - 12, TZ + 0.5], axis: 'y', speed: 0.45 });
      for (let k = 0; k < 4; k++) {
        const a = k / 4 * Math.PI * 2, cx = Math.round(TX + Math.cos(a) * 32), cz = Math.round(TZ + Math.sin(a) * 32), cy = g + TH - 18 + k * 4, c = k % 2 ? B.crys2 : B.crys;
        for (let dy = -9; dy <= 9; dy++) { const rr = 3 * (1 - Math.abs(dy) / 10); for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.abs(dx) + Math.abs(dz) <= rr) orb.set(cx + dx, cy + dy, cz + dz, Math.abs(dx) + Math.abs(dz) < rr - 1.5 ? B.mana : c); }
        orb.set(cx, cy + 10, cz, B.mana); orb.set(cx, cy - 10, cz, B.mana);
      }
      const books = w.prop({ name: 'books', pivot: [TX + 0.5, g + 52, TZ + 0.5], axis: 'y', speed: -0.7 });
      for (let k = 0; k < 9; k++) {
        const a = k / 9 * Math.PI * 2, bx = Math.round(TX + Math.cos(a) * 28), bz = Math.round(TZ + Math.sin(a) * 28), by = g + 46 + (k % 3) * 4, c = [B.book1, B.book2, B.book3][k % 3];
        books.box(bx, by, bz, bx + 3, by + 3, bz + 1, c); books.box(bx + 1, by + 1, bz - 1, bx + 3, by + 2, bz - 1, B.parch); books.box(bx, by, bz, bx, by + 3, bz + 1, B.trim); books.set(bx + 2, by + 4, bz, B.gold); books.set(bx + 2, by + 5, bz, B.gold);
      }
      acts.push({
        name: '수정 궤도', hint: '수정과 책이 빠르게 돌며 빛나요', hit: [TX - 22, g + TH - 32, TZ - 22, TX + 22, rTop + 12, TZ + 22],
        run: async a => { a.flash('orbit', 3, 4.5); a.glow(1.7, 4.5); a.spin('books', 4, 4.5); await a.spin('orbit', 6, 4.5); },
      });
      landmarks.push({ name: '대마법사의 탑', note: '꼭대기에서 수정이 궤도를 돈다', p: [TX + 0.5, rTop + 22, TZ + 0.5], tag: 'TOWER' });

      // ═════════ 대도서관(열주 현관 · 푸른 돔) ═════════
      const LX0 = 68, LX1 = 111, LZ0 = 116, LZ1 = 167, LY = base + 3, LT = base + 33, DCZ = 141;
      // 받침(동쪽은 열주 마루로 이어진다)과 한 단 디딤돌
      for (let z = LZ0 - 2; z <= LZ1 + 2; z++) for (let x = LX0 - 2; x <= 121; x++) for (let y = base; y <= base + 2; y++) w.set(x, y, z, y === base + 2 && (x === 121 || z === LZ0 - 2 || z === LZ1 + 2 || x === LX0 - 2) ? B.trim : (y === base + 2 ? (x > LX1 ? paveAt(x, z) : B.paleDk) : B.paleDk));
      for (let z = 128; z <= 155; z++) for (const x of [122, 123]) { w.set(x, base, z, B.paleDk); w.set(x, base + 1, z, x === 122 ? B.trim : B.paleDk); }
      // 벽: 낱돌 줄눈, 6칸마다 벽기둥
      for (let y = LY; y <= LT - 1; y++) for (let z = LZ0; z <= LZ1; z++) for (let x = LX0; x <= LX1; x++) {
        const edge = x === LX0 || x === LX1 || z === LZ0 || z === LZ1;
        w.set(x, y, z, edge ? (stoneAt(z === LZ0 || z === LZ1 ? x : z, y, 7) || B.mortar) : B.mortar);
      }
      const LS = SIDES(LX0, LZ0, LX1, LZ1);
      for (const k of ['n', 's', 'w', 'e']) {
        const sd = LS[k];
        for (let u = sd.u0; u <= sd.u1; u += 8) for (let y = LY; y <= LT - 3; y++) put(sd, u, y, 1, y < LY + 2 ? B.paleDk : (y > LT - 6 ? B.gold : B.trim));
        for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, LY, 1, B.paleDk); put(sd, u, LT - 2, 1, B.paleDk); put(sd, u, LT - 1, 1, B.trim); put(sd, u, LT - 1, 2, B.paleDk); }
        if (k === 'e') continue;
        // 높은 아치 창(4칸 폭): 벽기둥 사이마다
        for (let u = sd.u0 + 2; u + 3 < sd.u1 - 1; u += 8) {
          for (let y = LY + 6; y <= LY + 21; y++) for (let c = 0; c < 4; c++) {
            if (y === LY + 21 && (c === 0 || c === 3)) continue;
            put(sd, u + c, y, 0, (y - LY) % 5 === 0 ? B.iron : (c === 1 || c === 2) && y > LY + 19 ? B.win : (c === 1 && y < LY + 19 ? B.iron : B.win));
          }
          for (let c = -1; c <= 4; c++) { put(sd, u + c, LY + 5, 1, B.sill); put(sd, u + c, LY + 4, 1, B.paleDk); }
          for (let y = LY + 5; y <= LY + 20; y++) { put(sd, u - 1, y, 1, B.trim); put(sd, u + 4, y, 1, B.trim); }
          for (let c = -1; c <= 4; c++) put(sd, u + c, LY + 21 + (c >= 1 && c <= 2 ? 1 : 0), 1, B.gold);
        }
      }
      // 정문(동쪽 벽): 여섯 칸 폭 · 열두 칸 높이의 두 짝 문, 금빛 상인방
      for (let y = LY; y <= LY + 11; y++) for (let z = DCZ - 3; z <= DCZ + 2; z++) w.set(LX1, y, z, z === DCZ - 1 || z === DCZ ? (z === DCZ - 1 ? B.doorDk : B.door) : ((y - LY) % 4 === 1 ? B.iron : B.door));
      w.set(LX1 + 1, LY + 6, DCZ - 2, B.brass); w.set(LX1 + 1, LY + 6, DCZ + 1, B.brass);
      for (let y = LY; y <= LY + 12; y++) for (const z of [DCZ - 4, DCZ + 3]) w.set(LX1 + 1, y, z, (y - LY) % 4 === 3 ? B.gold : B.trim);
      for (let z = DCZ - 5; z <= DCZ + 4; z++) { w.set(LX1 + 1, LY + 13, z, B.gold); if (z >= DCZ - 3 && z <= DCZ + 2) w.set(LX1 + 1, LY + 14, z, B.gold); }
      w.set(LX1 + 1, LY + 15, DCZ - 1, B.crys); w.set(LX1 + 1, LY + 15, DCZ, B.crys);
      // 열주: 받침·홈 판 기둥·주두, 그 위 엔타블러처와 박공(장미창)
      for (const cz of [117, 125, 133, 149, 157, 165]) {
        w.box(115, LY, cz - 2, 119, LY, cz + 2, B.paleDk);
        for (let y = LY + 1; y <= LT - 5; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { if (dx && dz) continue; w.set(117 + dx, y, cz + dz, dx || dz ? B.trim : B.pale); }
        for (let dz = -1; dz <= 1; dz += 2) for (let dx = -1; dx <= 1; dx += 2) for (let y = LY + 1; y <= LT - 5; y++) if (y % 4 === 0) w.set(117 + dx, y, cz + dz, B.trim);
        w.box(116, LT - 4, cz - 1, 118, LT - 4, cz + 1, B.gold); w.box(115, LT - 3, cz - 2, 119, LT - 3, cz + 2, B.paleDk);
      }
      w.box(LX1 + 1, LT - 2, LZ0 - 2, 121, LT - 1, LZ1 + 2, B.paleDk); w.box(121, LT - 1, LZ0 - 2, 121, LT - 1, LZ1 + 2, B.gold); w.box(LX1 + 1, LT, LZ0 - 2, 121, LT, LZ1 + 2, B.trim);
      for (let s = 0; s <= 11; s++) for (let z = 125 + Math.ceil(s * 1.5); z <= 158 - Math.ceil(s * 1.5); z++) for (let x = 117; x <= 121; x++) {
        const edgeZ = z <= 125 + Math.ceil(s * 1.5) + 1 || z >= 158 - Math.ceil(s * 1.5) - 1;
        w.set(x, LT + 1 + s, z, edgeZ || s === 11 ? (x === 121 ? B.trim : B.paleDk) : B.pale);
      }
      for (let dz = -3; dz <= 3; dz++) for (let dy = -3; dy <= 3; dy++) { const r = Math.hypot(dz, dy); if (r <= 3.2) w.set(121, LT + 5 + dy, DCZ - 0.5 + dz | 0, r > 2.3 ? B.gold : (dz === 0 || dy === 0 ? B.gold : B.win)); }
      // 지붕: 평평한 지붕과 난간(살·손잡이)
      w.box(LX0 - 1, LT, LZ0 - 1, LX1 + 1, LT, LZ1 + 1, B.paleDk);
      for (let x = LX0 - 1; x <= LX1 + 1; x++) for (let z = LZ0 - 1; z <= LZ1 + 1; z++) {
        if (x !== LX0 - 1 && x !== LX1 + 1 && z !== LZ0 - 1 && z !== LZ1 + 1) continue;
        const u = x + z;
        if (u % 8 === 0) w.box(x, LT + 1, z, x, LT + 3, z, B.paleDk); else if (u % 2 === 0) { w.set(x, LT + 1, z, B.trim); w.set(x, LT + 2, z, B.trim); }
        w.set(x, LT + 3, z, B.paleDk);
      }
      // 돔: 원통 받침(낱돌·창), 기와 반구와 금 갈빗대, 등롱
      const DX = 88, DZ = DCZ, lt = LT;
      shaft(DX, DZ, lt + 1, lt + 8, () => 18.8, 8);
      w.ring(DX, DZ, lt + 8, 17.6, 19.6, B.trim); w.ring(DX, DZ, lt + 1, 18, 19.6, B.paleDk);
      for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2; for (let y = lt + 3; y <= lt + 6; y++) for (const q of [-0.5, 0.5]) { const x = Math.round(DX + Math.cos(t) * 18.6 - Math.sin(t) * q), z = Math.round(DZ + Math.sin(t) * 18.6 + Math.cos(t) * q); w.set(x, y, z, y === lt + 6 ? B.gold : B.win); } }
      const dR = 19.2, dc = lt + 9;
      for (let dy = 0; dy <= Math.ceil(dR); dy++) for (let dz = -20; dz <= 20; dz++) for (let dx = -20; dx <= 20; dx++) {
        const d = Math.hypot(dx, dy, dz); if (d > dR) continue;
        let b = B.roofBDk;
        if (d > dR - 1.6) {
          const ang = Math.atan2(dz, dx), seg = ang / (Math.PI / 4), off = Math.abs(seg - Math.round(seg)) * (Math.PI / 4) * Math.hypot(dx, dz);
          b = off < 0.8 ? B.gold : (Math.floor(dy / 3) % 2 ? B.roofB2 : (hash3(Math.round(ang * 10), dy >> 1, 4) > 0.8 ? B.roofB3 : B.roofB));
        }
        w.set(DX + dx, dc + dy, DZ + dz, b);
      }
      w.ring(DX, DZ, dc, dR - 0.5, dR + 1, B.gold);
      const dTop = dc + Math.ceil(dR);
      shaft(DX, DZ, dTop, dTop + 5, () => 3.4, 9);
      for (const [dx, dz] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) w.box(DX + dx, dTop + 2, DZ + dz, DX + dx, dTop + 4, DZ + dz, B.win);
      const lTop = tileCone(DX, DZ, dTop + 6, 4.6, 0.6, BLUE); w.box(DX, lTop, DZ, DX, lTop + 5, DZ, B.gold);
      for (const z of [DCZ - 6, DCZ + 5]) { w.box(LX1 + 1, LY + 6, z, LX1 + 1, LY + 9, z, B.iron); w.box(LX1 + 2, LY + 7, z, LX1 + 2, LY + 8, z, B.lamp); w.set(LX1 + 2, LY + 9, z, B.ironDk); }
      lights.push({ p: [LX1 + 2.5, LY + 7, DCZ + 0.5], c: '#d8c8ff', i: 1, d: 26, flicker: 0.05, night: true, srcR: 8 });
      acts.push(OR.goAct({ at: [LX1 + 2, LY, DCZ], h: 9, name: '대도서관 안으로', goto: 'academy-library', hint: '동쪽 열주 현관의 문을 열고 푸른 돔 아래 열람실로 들어가요', hit: [LX1, LY, DCZ - 3, LX1 + 2, LY + 11, DCZ + 2] }));
      landmarks.push({ name: '대도서관', note: '푸른 돔 아래 금서 서가', p: [DX + 0.5, lTop + 12, DZ + 0.5] });
      keep.push([LX0 - 10, LZ0 - 10, 130, LZ1 + 10]);

      // ═════════ 강의동(종탑)과 기숙사 ═════════
      const hall = house({ x: 186, z: 200, sx: 50, sz: 26, floors: 2, fh: 14, face: 'n', y: base, pal: PURP, box: true });
      const dorms = [[76, 196, 28, 22, 'e'], [92, 240, 28, 22, 'n'], [206, 88, 24, 22, 'w']].map(([x, z, sx, sz, face], k) => house({ x, z, sx, sz, floors: 3, fh: 12, face, jetty: k % 2 === 0, y: base, pal: k % 2 ? BLUE : PURP, box: k === 1 }));
      [hall, dorms[0]].forEach(h => lights.push({ p: h.lamp, c: '#d8c8ff', i: 0.9, d: 24, flicker: 0.05, night: true }));
      landmarks.push({ name: '학생 기숙사', note: '보라 지붕의 삼층 건물들', p: [90.5, dorms[0].peak + 12, 206.5] });
      // 강의동 지붕 가운데의 종탑과 종(부품)
      const BX = Math.floor((hall.x0 + hall.x1) / 2), BZ = Math.floor((hall.z0 + hall.z1) / 2), by0 = hall.peak - 1;
      for (let y = hall.top; y <= by0; y++) for (let z = BZ - 4; z <= BZ + 4; z++) for (let x = BX - 4; x <= BX + 4; x++) w.set(x, y, z, (x === BX - 4 || x === BX + 4 || z === BZ - 4 || z === BZ + 4) ? (stoneAt(x + z, y, 11) || B.mortar) : B.mortar);
      w.box(BX - 5, by0 + 1, BZ - 5, BX + 5, by0 + 2, BZ + 5, B.paleDk); w.box(BX - 5, by0 + 2, BZ - 5, BX + 5, by0 + 2, BZ + 5, B.trim); w.box(BX - 4, by0 + 2, BZ - 4, BX + 4, by0 + 2, BZ + 4, B.paleDk);
      for (const [dx, dz] of [[-4, -4], [3, -4], [-4, 3], [3, 3]]) { w.box(BX + dx, by0 + 3, BZ + dz, BX + dx + 1, by0 + 17, BZ + dz + 1, B.trim); w.box(BX + dx, by0 + 9, BZ + dz, BX + dx + 1, by0 + 9, BZ + dz + 1, B.gold); }
      for (let x = BX - 2; x <= BX + 2; x++) for (const z of [BZ - 4, BZ + 4]) w.set(x, by0 + 17 - (Math.abs(x - BX) > 1 ? 1 : 0), z, B.paleDk);
      for (let z = BZ - 2; z <= BZ + 2; z++) for (const x of [BX - 4, BX + 4]) w.set(x, by0 + 17 - (Math.abs(z - BZ) > 1 ? 1 : 0), z, B.paleDk);
      w.box(BX - 5, by0 + 18, BZ - 5, BX + 5, by0 + 19, BZ + 5, B.paleDk); w.box(BX - 5, by0 + 19, BZ - 5, BX + 5, by0 + 19, BZ + 5, B.trim);
      const bTop = MH.pyramid(w, BX - 6, BZ - 6, BX + 6, BZ + 6, by0 + 20, B.roofP, 3, B.eave);
      for (let s = 0; s < 6; s++) for (const [dx, dz] of [[-6 + s, -6 + s], [6 - s, -6 + s], [-6 + s, 6 - s], [6 - s, 6 - s]]) for (let p = 0; p < 3; p++) w.set(BX + dx, by0 + 20 + s * 3 + p, BZ + dz, B.gold);
      w.box(BX, bTop, BZ, BX, bTop + 4, BZ, B.gold); w.set(BX, bTop + 5, BZ, B.crys);
      w.box(BX - 3, by0 + 16, BZ, BX + 3, by0 + 16, BZ, B.iron);
      const bell = w.prop({ name: 'bell', pivot: [BX + 0.5, by0 + 16, BZ + 0.5] });
      bell.box(BX, by0 + 14, BZ, BX, by0 + 15, BZ, B.iron);
      for (let dy = 0; dy <= 7; dy++) { const rr = 1.2 + dy * 0.28 + (dy >= 6 ? 0.5 : 0); bell.cyl(BX, BZ, by0 + 13 - dy, by0 + 13 - dy, rr, dy === 7 ? B.ember : B.gold); }
      bell.box(BX, by0 + 5, BZ, BX, by0 + 6, BZ, B.iron); bell.set(BX, by0 + 4, BZ, B.ember);
      acts.push({
        name: '종탑의 종', hint: '강의동 종탑의 금종이 흔들리며 수업 시작을 알려요', hit: [BX - 6, by0 + 1, BZ - 6, BX + 6, bTop + 4, BZ + 6],
        run: async a => {
          a.glow(1.5, 4);
          for (let k = 0; k < 6; k++) {
            await a.turn('bell', [0, 0, k % 2 ? -0.7 : 0.7], 0.35);
            a.burst([BX + 0.5, by0 + 10, BZ + 0.5], { n: 24, colors: ['#ffd060', '#ffffff', '#c8b0ff'], speed: 14, up: 4, life: 1.4, gravity: -1, spread: 2, flat: true });
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });
      landmarks.push({ name: '강의동 종탑', note: '수업마다 금종이 울린다', p: [BX + 0.5, bTop + 12, BZ + 0.5] });

      // ═════════ 마력의 샘과 섬 끝으로 떨어지는 마력 물줄기 ═════════
      const FX = 158, FZ = 228;
      for (let z = FZ - 20; z <= FZ + 20; z++) for (let x = FX - 20; x <= FX + 20; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 18.8) continue;
        if (d > 15.6) {
          const u = Math.round(Math.atan2(z - FZ, x - FX) * 18);
          w.set(x, base, z, B.paleDk); w.set(x, base + 1, z, stoneAt(u, base + 1, 12) || B.mortar); w.set(x, base + 2, z, stoneAt(u, base + 2, 12) || B.mortar);
          w.set(x, base + 3, z, d > 17.6 ? B.paleDk : B.trim); continue;
        }
        MH.setH(w, x, z, base - 4, (x + z) % 4 ? B.stone : B.deep, B.stone); w.liquid(x, z, base);
      }
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * Math.PI * 2, x = Math.round(FX + Math.cos(a) * 17.2), z = Math.round(FZ + Math.sin(a) * 17.2);
        w.box(x - 1, base + 4, z - 1, x + 1, base + 4, z + 1, B.paleDk); w.box(x, base + 5, z, x, base + 9, z, B.trim); w.box(x - 1, base + 10, z - 1, x + 1, base + 10, z + 1, B.paleDk);
        w.box(x, base + 11, z, x, base + 12, z, k % 2 ? B.crys2 : B.lamp);
      }
      w.cyl(FX, FZ, base - 2, base + 2, 4.2, B.paleDk); w.ring(FX, FZ, base + 2, 3.2, 4.4, B.trim);
      const crystal = (x0, z0, y0, h, r, lean, c) => { for (let dy = 0; dy <= h; dy++) { const t = dy / h, rr = t < 0.75 ? r : r * (1 - t) * 4, cx = x0 + lean[0] * dy, cz = z0 + lean[1] * dy; for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.abs(dx) + Math.abs(dz) <= rr + 0.2) w.set(Math.round(cx + dx), y0 + dy, Math.round(cz + dz), Math.abs(dx) + Math.abs(dz) < rr - 1 ? B.mana : c); } };
      crystal(FX, FZ, base + 3, 18, 2.4, [0, 0], B.crys2);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) crystal(FX + dx * 2, FZ + dz * 2, base + 3, 10, 1.4, [dx * 0.25, dz * 0.25], B.crys2);
      for (const [dx, dz] of [[4, 2], [-4, -2], [2, -4], [-2, 4]]) crystal(FX + dx, FZ + dz, base + 1, 5, 1.2, [dx * 0.08, dz * 0.08], B.crys);
      lights.push({ name: 'mana', p: [FX + 0.5, base + 14, FZ + 0.5], c: '#70d0ff', i: 1.5, d: 44, flicker: 0.06 });
      for (let z = FZ + 17; z < D; z++) {
        let stop = false;
        for (const x of [FX - 1, FX, FX + 1, FX + 2]) { const gg = MH.g(w, x, z); if (gg < 0) { stop = true; break; } MH.setH(w, x, z, base - 4, B.stone, B.stone); w.liquid(x, z, base - 2); }
        if (stop) break;
        for (const ex of [FX - 2, FX + 3]) if (MH.g(w, ex, z) === base) { w.set(ex, base, z, B.paleDk); if (z % 8 === 0) { w.set(ex, base + 1, z, B.trim); w.set(ex, base + 2, z, B.lamp); } }
      }
      acts.push({
        name: '마력의 샘', hint: '수정에서 마력이 솟구쳐요', hit: [FX - 16, base + 1, FZ - 16, FX + 16, base + 20, FZ + 16],
        run: async a => { a.flash('mana', 3.5, 3.5); for (let k = 0; k < 8; k++) { a.burst([FX + 0.5, base + 20, FZ + 0.5], { n: 40, colors: ['#a0d0ff', '#80e0ff', '#ffffff'], speed: 10, up: 26, life: 1.8, gravity: 18, spread: 2 }); await a.wait(0.35); } },
      });
      landmarks.push({ name: '마력의 샘', note: '학원의 마력이 솟는 곳', p: [FX + 0.5, base + 34, FZ + 0.5] });

      // ═════════ 소환진 섬(북동쪽): 룬 원과 떠오르는 돌 ═════════
      MH.flatten(w, SX - 18, SZ - 18, SX + 18, SZ + 18, sy, B.path, B.stone);
      for (let z = SZ - 18; z <= SZ + 18; z++) for (let x = SX - 18; x <= SX + 18; x++) if (MH.g(w, x, z) === sy) w.set(x, sy, z, paveAt(x, z));
      MH.circle(w, SX, SZ, 18, B.rune, 2); MH.circle(w, SX, SZ, 10, B.rune, 2); MH.circle(w, SX, SZ, 14, B.paleDk, 2);
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * Math.PI * 2;
        MH.circle(w, Math.round(SX + Math.cos(a) * 14), Math.round(SZ + Math.sin(a) * 14), 2, B.rune, 2);
        for (const o of [0, 0.6]) w.line(SX + Math.cos(a) * 10 + o, sy, SZ + Math.sin(a) * 10, SX + Math.cos(a + 2.09) * 10 + o, sy, SZ + Math.sin(a + 2.09) * 10, B.rune);
        const px = Math.round(SX + Math.cos(a) * 24), pz = Math.round(SZ + Math.sin(a) * 24), pg = MH.g(w, px, pz);
        if (pg >= 0) {
          w.box(px - 2, pg + 1, pz - 2, px + 2, pg + 2, pz + 2, B.paleDk); w.box(px - 2, pg + 2, pz - 2, px + 2, pg + 2, pz + 2, B.trim);
          for (let y = pg + 3; y <= pg + 14; y++) for (let dz = 0; dz <= 1; dz++) for (let dx = 0; dx <= 1; dx++) w.set(px + dx - 1, y, pz + dz - 1, y === pg + 9 || y === pg + 10 ? B.rune : (stoneAt(dx + dz * 2, y, 13) || B.mortar));
          w.box(px - 2, pg + 15, pz - 2, px + 1, pg + 15, pz + 1, B.trim); w.box(px - 1, pg + 16, pz - 1, px, pg + 18, pz, B.crys);
        }
      }
      const stone = w.prop({ name: 'rstone', pivot: [SX + 0.5, sy + 8, SZ + 0.5], axis: 'y', speed: 0.3, bob: 0.8, bobSpeed: 0.8 });
      stone.ellipsoid(SX, sy + 12, SZ, 5.6, 8, 5.6, B.paleDk);
      stone.ellipsoid(SX, sy + 12, SZ, 5.8, 1.2, 5.8, B.rune);
      stone.box(SX - 1, sy + 9, SZ + 6, SX, sy + 14, SZ + 6, B.rune); stone.box(SX - 6, sy + 11, SZ - 1, SX - 6, sy + 15, SZ, B.rune); stone.box(SX + 6, sy + 10, SZ, SX + 6, sy + 13, SZ, B.rune);
      stone.box(SX, sy + 20, SZ, SX, sy + 21, SZ, B.crys);
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) MH.paint(w, SX + dx, SZ + dz, B.rune);
      lights.push({ name: 'circle', p: [SX + 0.5, sy + 3, SZ + 0.5], c: '#a080ff', i: 1.2, d: 40, flicker: 0.1 });
      acts.push({
        name: '소환진', hint: '룬이 빛나고 돌이 떠오르며 빛기둥이 솟아요', hit: [SX - 14, sy + 1, SZ - 14, SX + 14, sy + 22, SZ + 14],
        run: async a => {
          a.flash('circle', 4, 4.5); a.spin('rstone', 8, 4.5);
          await a.move('rstone', [0, 18, 0], 1.6);
          for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, sy + 2, SZ + 0.5], { n: 50, colors: ['#a890ff', '#c080ff', '#ffffff'], speed: 3, up: 36, life: 1.6, gravity: -2, spread: 10 }); await a.wait(0.4); }
          await a.move('rstone', [0, 0, 0], 1.8);
        },
      });
      landmarks.push({ name: '소환진', note: '소환학 실습용 룬 원', p: [SX + 0.5, sy + 36, SZ + 0.5] });

      // ═════════ 온실 섬(남서쪽): 유리 돔 ═════════
      w.cyl(GX, GZ, gy + 1, gy + 2, 18.8, B.paleDk); w.ring(GX, GZ, gy + 3, 16.8, 18.8, B.paleDk); w.ring(GX, GZ, gy + 4, 17.2, 18.8, B.paleDk); w.ring(GX, GZ, gy + 5, 17.2, 18.8, B.trim);
      for (let z = GZ - 16; z <= GZ + 16; z++) for (let x = GX - 16; x <= GX + 16; x++) if (MH.dist(x, z, GX, GZ) < 16.6) w.set(x, gy + 2, z, (x + z) % 2 ? B.soil : B.dirt);
      for (let dy = 0; dy <= 18; dy++) for (let dz = -18; dz <= 18; dz++) for (let dx = -18; dx <= 18; dx++) {
        const d = Math.hypot(dx, dy, dz); if (d > 18 || d <= 16.6) continue;
        const rib = Math.abs(dx) < 0.6 || Math.abs(dz) < 0.6 || Math.abs(dx - dz) < 0.6 || Math.abs(dx + dz) < 0.6;
        const lat = dy % 6 === 0;
        if (rib || lat) w.set(GX + dx, gy + 6 + dy, GZ + dz, B.iron);
        else if (((dx + dz) % 6 + 6) % 6 === 0 || dy % 6 === 3) w.set(GX + dx, gy + 6 + dy, GZ + dz, B.glass);
      }
      for (let i = 0; i < 16; i++) { const a = i * 0.52, r = 4.8 + (i % 3) * 3.6; MH.leafBlob(w, Math.round(GX + Math.cos(a) * r), gy + 6, Math.round(GZ + Math.sin(a) * r), 3.2, 3.6, 3.2, [i % 2 ? B.leafP : B.leaf2, B.leaf, B.leaf, B.petal]); }
      for (let y = gy + 3; y <= gy + 15; y++) for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) w.set(GX + dx, y, GZ + dz, (y + dx) % 3 ? B.bark : B.barkDk);
      MH.leafBlob(w, GX, gy + 19, GZ, 6.8, 5.2, 6.8, [B.leafP, B.leaf2, B.leaf, B.crys2]);
      for (let y = gy + 3; y <= gy + 12; y++) for (let z = GZ - 2; z <= GZ + 2; z++) for (const x of [GX + 16, GX + 17, GX + 18]) w.set(x, y, z, x === GX + 18 ? (y === gy + 12 || Math.abs(z - GZ) === 2 ? B.iron : B.door) : 0);
      w.box(GX + 19, gy + 13, GZ - 1, GX + 19, gy + 13, GZ + 1, B.iron); w.set(GX + 20, gy + 12, GZ, B.lamp);
      landmarks.push({ name: '수정 온실', note: '달빛 약초를 기르는 유리 돔', p: [GX + 0.5, gy + 36, GZ + 0.5] });

      // ═════════ 결투장 섬(남동쪽) ═════════
      MH.flatten(w, AX - 20, AZ - 20, AX + 20, AZ + 20, ay, B.path, B.stone);
      for (let z = AZ - 20; z <= AZ + 20; z++) for (let x = AX - 20; x <= AX + 20; x++) if (MH.g(w, x, z) === ay) w.set(x, ay, z, paveAt(x, z));
      for (let y = ay + 1; y <= ay + 5; y++) for (let z = AZ - 22; z <= AZ + 22; z++) for (let x = AX - 22; x <= AX + 22; x++) {
        const d = MH.dist(x, z, AX, AZ), rIn = y === ay + 1 ? 18 : y <= ay + 3 ? 19.2 : 20;
        if (d < rIn || d > 21.6) continue;
        w.set(x, y, z, y >= ay + 5 ? B.trim : (y === ay + 1 ? B.paleDk : (stoneAt(Math.round(Math.atan2(z - AZ, x - AX) * 21), y, 14) || B.mortar)));
      }
      MH.circle(w, AX, AZ, 12, B.trim, 2);
      for (let x = AX - 3; x <= AX + 3; x++) for (let y = ay + 1; y <= ay + 6; y++) for (let z = AZ - 23; z <= AZ - 16; z++) if (MH.dist(x, z, AX, AZ) > 17.6) w.set(x, y, z, 0);
      for (let k = 0; k < 4; k++) {
        const a = k * 1.57 + 0.78, px = Math.round(AX + Math.cos(a) * 20), pz = Math.round(AZ + Math.sin(a) * 20);
        w.box(px - 1, ay + 1, pz - 1, px + 2, ay + 2, pz + 2, B.paleDk);
        for (let y = ay + 3; y <= ay + 18; y++) w.box(px, y, pz, px + 1, y, pz + 1, y === ay + 8 || y === ay + 9 ? B.trim : (stoneAt(px + pz, y, 15) || B.mortar));
        w.box(px - 1, ay + 19, pz - 1, px + 2, ay + 19, pz + 2, B.trim); w.box(px, ay + 20, pz, px + 1, ay + 21, pz + 1, B.lamp);
        if (k % 2 === 0) lights.push({ p: [px + 1, ay + 21, pz + 1], c: '#d8c8ff', i: 1, d: 28, flicker: 0.05, night: true });
      }
      landmarks.push({ name: '결투장', note: '원소학 실기 시험장', p: [AX + 0.5, ay + 28, AZ + 0.5] });

      // ═════════ 하늘 선착장 섬(북쪽) — 나무 잔교, 하늘배, 수정 등대 ═════════
      MH.flatten(w, KX - 18, KZ - 12, KX + 16, KZ + 18, ky, B.path, B.stone);
      for (let z = KZ - 12; z <= KZ + 18; z++) for (let x = KX - 18; x <= KX + 16; x++) if (MH.g(w, x, z) === ky) w.set(x, ky, z, paveAt(x, z));
      const PZ0 = KZ + 4;                                   // 잔교(폭 8칸): 섬 서쪽 끝에서 바깥으로
      for (let x = KX - 54; x <= KX - 16; x++) for (let z = PZ0 - 2; z <= PZ0 + 5; z++) {
        if (MH.g(w, x, z) > ky) continue;
        w.set(x, ky, z, (x >> 1) % 3 === 0 ? B.plank2 : B.plank); w.set(x, ky - 1, z, B.plank2);
        if (z === PZ0 - 2 || z === PZ0 + 5) { if (x % 6 === 0) { w.box(x, ky + 1, z, x, ky + 4, z, B.bark); w.set(x, ky + 5, z, B.barkDk); } else w.set(x, ky + 4, z, B.bark); }
        if (x % 12 === 0 && (z === PZ0 || z === PZ0 + 3)) for (const dz of [0, 1]) w.box(x, ky - 12, z + dz, x + 1, ky - 2, z + dz, B.bark);
      }
      for (const x of [KX - 52, KX - 28]) { w.box(x, ky + 1, PZ0 - 3, x, ky + 11, PZ0 - 3, B.iron); w.box(x, ky + 11, PZ0 - 4, x, ky + 11, PZ0 - 4, B.iron); w.box(x, ky + 8, PZ0 - 5, x, ky + 10, PZ0 - 5, B.ironDk); w.box(x, ky + 8, PZ0 - 5, x, ky + 9, PZ0 - 5, B.lamp); }
      lights.push({ p: [KX - 51.5, ky + 8, PZ0 - 4.5], c: '#ffe0a0', i: 1, d: 28, flicker: 0.1, night: true });
      crate(KX - 14, ky + 1, KZ - 10, 4); crate(KX - 10, ky + 1, KZ - 10, 4); crate(KX - 14, ky + 5, KZ - 10, 4); crate(KX - 14, ky + 1, KZ - 6, 4);
      barrel(KX + 10, ky + 1, KZ + 14, 7); barrel(KX + 5, ky + 1, KZ + 15, 6);
      // 하늘배(부품): 잔교 북쪽에 떠서 정박
      const shX = KX - 48, shZ = PZ0 - 10, shY = ky + 6, shLen = 30;
      const ship = w.prop({ name: 'skiff', pivot: [shX + 15, shY + 1, shZ + 0.5], bob: 0.7, bobSpeed: 1.1 });
      MH.ship(ship, shX, shY, shZ, shLen, { hull: B.hull, deck: B.plank, rail: B.gold, keel: B.eave, mast: B.bark, sail: B.sail }, { half: 4, mast: 22 });
      for (let s = 2; s < shLen - 2; s++) { const t = s / (shLen - 1), wd = Math.max(0, Math.round(4 * Math.sin(Math.PI * Math.min(1, t * 1.6 + 0.12)))); for (let k = -wd + 1; k <= wd - 1; k++) ship.set(shX + s, shY - 2, shZ + k, B.hull); }
      ship.box(shX + 2, shY + 1, shZ - 2, shX + 5, shY + 3, shZ + 1, B.crate); ship.box(shX + 2, shY + 4, shZ - 2, shX + 5, shY + 4, shZ + 1, B.crateEdge);
      ship.box(shX + 24, shY + 1, shZ, shX + 24, shY + 3, shZ, B.iron); ship.set(shX + 24, shY + 4, shZ, B.crys2);
      for (const sx of [8, 20]) ship.box(shX + sx, shY - 4, shZ, shX + sx, shY - 3, shZ, B.crys);
      ship.box(shX + 16, shY + 22, shZ, shX + 16, shY + 24, shZ, B.crys2);
      for (let x = KX - 50; x <= KX - 16; x++) for (let y = ky + 1; y <= ky + 5; y++) if (w.get(x, y, PZ0 - 2) && x >= shX - 3 && x <= shX + shLen + 3) w.set(x, y, PZ0 - 2, 0);
      // 하늘길: 떠올라 섬들을 한 바퀴 돌고 서쪽 지도 밖 구름 속으로 사라진다
      const sRoute = [[shX + 44, shZ + 0.5], [236, 36], [272, 120], [264, 212], [200, 268], [112, 272], [56, 212], [40, 140], [-48, 104]];
      const shPts = [[0, 20, 0], [29, 36, 0]].concat(sRoute.slice(1).map(([x, z]) => [x - shX - 15, 68, z - shZ - 0.5]));
      acts.push({
        name: '하늘배 출항', hint: '선착장의 하늘배가 떠올라 학원 섬들을 한 바퀴 돌고 구름 너머로 떠나요', hit: [shX - 2, shY - 4, shZ - 6, shX + shLen + 2, shY + 24, shZ + 6],
        run: async a => {
          a.burst([shX + 15, shY - 2, shZ + 0.5], { n: 50, colors: ['#80e0ff', '#c080ff', '#ffffff'], speed: 8, up: -4, life: 1.4, gravity: 6, spread: 10 });
          await a.drive('skiff', shPts, 34, { fwd: '+x', back: 2.0 });
          a.burst([shX + 15, shY - 2, shZ + 0.5], { n: 30, colors: ['#80e0ff', '#ffffff'], speed: 6, up: 2, life: 1, gravity: 4, spread: 10, flat: true });
        },
      });
      landmarks.push({ name: '하늘 선착장', note: '학원과 바깥을 잇는 하늘배 나루', p: [shX + 15, ky + 40, shZ + 0.5] });
      // 수정 등대: 낱돌 몸통, 띠돌림, 작은 창, 회랑과 난간, 수정 등실, 기와 원뿔
      const LHX = KX + 8, LHZ = KZ - 4, lhR = y => 6.8 - (y - ky) * 0.02;
      w.cyl(LHX, LHZ, ky + 1, ky + 2, 8.4, B.paleDk); w.ring(LHX, LHZ, ky + 2, 7.4, 8.4, B.trim);
      shaft(LHX, LHZ, ky + 1, ky + 52, lhR, 16);
      for (const y of [ky + 17, ky + 34]) { w.ring(LHX, LHZ, y, lhR(y) - 0.5, lhR(y) + 0.8, B.paleDk); w.ring(LHX, LHZ, y + 1, lhR(y) - 0.5, lhR(y) + 0.8, B.trim); }
      for (let y = ky + 10; y < ky + 50; y += 12) { const a = (y / 12) % 2 ? 0 : Math.PI / 2; for (const s of [0, Math.PI]) for (let dy = 0; dy <= 3; dy++) { const r = lhR(y), x = Math.round(LHX + Math.cos(a + s) * r), z = Math.round(LHZ + Math.sin(a + s) * r); w.set(x, y + dy, z, dy === 3 ? B.gold : B.win); } }
      const lhTop = ky + 53;
      w.cyl(LHX, LHZ, lhTop, lhTop, 9, B.paleDk); w.ring(LHX, LHZ, lhTop - 1, 5.6, 8, B.paleDk); w.ring(LHX, LHZ, lhTop - 2, 5.6, 6.8, B.trim);
      for (let k = 0; k < 28; k++) { const a = k / 28 * Math.PI * 2, x = Math.round(LHX + Math.cos(a) * 8.4), z = Math.round(LHZ + Math.sin(a) * 8.4); if (k % 7 === 0) w.box(x, lhTop + 1, z, x, lhTop + 3, z, B.iron); else if (k % 2 === 0) w.box(x, lhTop + 1, z, x, lhTop + 2, z, B.iron); }
      w.ring(LHX, LHZ, lhTop + 3, 7.8, 8.8, B.iron);
      for (const [dx, dz] of [[-4, -4], [4, -4], [-4, 4], [4, 4]]) w.box(LHX + dx, lhTop + 1, LHZ + dz, LHX + dx, lhTop + 9, LHZ + dz, B.iron);
      crystal(LHX, LHZ, lhTop + 1, 8, 2.2, [0, 0], B.crys2);
      w.cyl(LHX, LHZ, lhTop + 10, lhTop + 10, 5.6, B.iron);
      const lhRoof = tileCone(LHX, LHZ, lhTop + 11, 6.8, 0.5, BLUE); w.box(LHX, lhRoof, LHZ, LHX, lhRoof + 4, LHZ, B.gold); w.set(LHX, lhRoof + 5, LHZ, B.crys2);
      for (let y = ky + 1; y <= ky + 10; y++) for (let x = LHX - 3; x <= LHX + 2; x++) { const top = Math.abs(x - LHX + 0.5) > 1.6 ? ky + 9 : ky + 10; w.set(x, y, LHZ + 7, y > top ? B.gold : (y === top ? B.gold : B.door)); if (y <= top) w.set(x, y, LHZ + 8, 0); }
      w.set(LHX - 2, ky + 5, LHZ + 8, B.brass);
      lights.push({ name: 'beacon', p: [LHX + 0.5, lhTop + 5, LHZ + 0.5], c: '#80e0ff', i: 1.4, d: 48, flicker: 0.08 });
      const beam = w.prop({ name: 'beam', pivot: [LHX + 0.5, lhTop + 5, LHZ + 0.5], axis: 'y', speed: 0.6 });
      for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; for (let r = 9; r <= 22; r++) { const x = Math.round(LHX + Math.cos(a) * r), z = Math.round(LHZ + Math.sin(a) * r), y = lhTop + 4 + (r > 14 ? 1 : 0) * (k % 2); beam.box(x, y, z, x, y + 1, z, r % 5 === 0 ? B.crys2 : B.mana); } }
      acts.push({
        name: '등대 신호', hint: '수정 등대의 빛줄기가 빠르게 돌며 하늘에 신호를 쏘아 올려요', hit: [LHX - 9, lhTop - 12, LHZ - 9, LHX + 9, lhRoof + 4, LHZ + 9],
        run: async a => {
          a.flash('beacon', 4, 5.5); a.glow(1.6, 5.5); a.spin('beam', 7, 5.5);
          for (let k = 0; k < 5; k++) { a.burst([LHX + 0.5, lhRoof + 4, LHZ + 0.5], { n: 40, colors: ['#80e0ff', '#ffffff', '#c080ff'], speed: 4, up: 40, life: 1.6, gravity: 4, spread: 2 }); await a.wait(0.8); }
          for (let k = 0; k < 3; k++) { a.burst([LHX + 0.5, lhTop + 5, LHZ + 0.5], { n: 50, colors: ['#80e0ff', '#ffffff'], speed: 24, up: 0, life: 1.2, gravity: 0, spread: 2, flat: true }); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '수정 등대', note: '안개 낀 밤 하늘배를 이끄는 빛', p: [LHX + 0.5, lhRoof + 14, LHZ + 0.5] });

      // ═════════ 길, 생울타리, 꽃밭, 벤치, 가로등 ═════════
      lane([[TX, 178], [FX, 208]], 4.8); lane([[TX, 172], [120, 160], [116, 142]], 4); lane([[FX, 184], [200, 192], [236, 228]], 4); lane([[176, 140], [216, 128], [240, 116]], 4);
      lane([[116, 220], [84, 232], [90, 232]], 4); lane([[168, 120], [176, 80]], 4); lane([[FX + 18, FZ], [208, 240], [208, 232]], 4); lane([[124, 142], [114, 142]], 3.5);
      const hedge = (x0, z0, x1, z1) => {
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const gg = MH.g(w, x, z); if (gg !== base || w.get(x, gg + 1, z) || !isGrass(x, z)) continue;
          const hh = hash3(x >> 1, 5, z >> 1), top = gg + 3 + (hh > 0.6 ? 1 : 0);
          for (let y = gg + 1; y <= top; y++) w.set(x, y, z, y === top && hh > 0.3 ? B.hedge2 : B.hedge);
        }
      };
      hedge(TX - 14, 180, TX - 9, 200); hedge(TX + 10, 180, TX + 15, 200);
      for (const [fx, fz] of [[140, 186], [176, 186], [128, 204], [188, 240], [116, 188]]) {
        for (let dz = -3; dz <= 3; dz++) for (let dx = -5; dx <= 5; dx++) {
          const x = fx + dx, z = fz + dz, gg = MH.g(w, x, z); if (gg !== base || w.get(x, gg + 1, z) || !isGrass(x, z)) continue;
          if (Math.abs(dx) === 5 || Math.abs(dz) === 3) { w.set(x, gg + 1, z, B.paleDk); continue; }
          w.set(x, gg, z, B.soil);
          const hh = hash3(x, 9, z);
          if ((x + z) % 2 === 0) { w.set(x, gg + 1, z, B.flowerStem); w.set(x, gg + 2, z, hh > 0.7 ? B.petal : FLW[(hh * 17 | 0) % 5]); }
          else w.set(x, gg + 1, z, B.flowerLf);
        }
      }
      for (const [bx, bz] of [[147, 196], [167, 196]]) {
        const gg = MH.g(w, bx, bz); if (gg !== base) continue;
        for (const dx of [0, 5]) { w.box(bx + dx, gg + 1, bz, bx + dx, gg + 2, bz, B.iron); w.box(bx + dx, gg + 1, bz + 2, bx + dx, gg + 4, bz + 2, B.iron); }
        w.box(bx, gg + 3, bz, bx + 5, gg + 3, bz + 1, B.plank); w.box(bx, gg + 5, bz + 2, bx + 5, gg + 6, bz + 2, B.plank); w.box(bx, gg + 4, bz + 2, bx + 5, gg + 4, bz + 2, B.plank2);
      }
      for (const [lx, lz] of [[146, 182], [172, 182], [208, 194]]) if (MH.g(w, lx, lz) >= 0 && !w.get(lx, MH.g(w, lx, lz) + 1, lz)) lights.push({ p: lampPost(lx, lz, 12), c: '#d8c8ff', i: 1, d: 28, flicker: 0.05, night: true });
      for (const [lx, lz] of [[116, 178], [224, 140], [132, 264], [196, 260]]) if (MH.g(w, lx, lz) >= 0 && !w.get(lx, MH.g(w, lx, lz) + 1, lz)) lampPost(lx, lz, 12);
      // 빗자루 발판 자리는 나무를 심지 않는다
      const BRX = 240, BRZ = 172;
      keep.push([BRX - 16, BRZ - 10, BRX + 14, BRZ + 14], [TX - 36, TZ - 36, TX + 36, TZ + 40], [FX - 26, FZ - 26, FX + 26, FZ + 26]);
      const kept = (x, z) => keep.some(([x0, z0, x1, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1);
      for (let i = 0, made = 0; i < 160 && made < 26; i++) {
        const a = w.r(0, 6.28), d = w.r(20, 92), x = Math.round(CX + Math.cos(a) * d), z = Math.round(CZ + Math.sin(a) * d), gg = MH.g(w, x, z);
        if (gg !== base || w.get(x, gg + 1, z) || !isGrass(x, z) || kept(x, z)) continue;
        let clear = true; for (const [dx, dz] of [[0, 0], [8, 0], [-8, 0], [0, 8], [0, -8], [6, 6], [-6, -6], [6, -6], [-6, 6]]) { const g2 = MH.g(w, x + dx, z + dz); if (g2 !== base) clear = false; else for (let q = 1; q <= 26; q += 3) if (w.get(x + dx, gg + q, z + dz)) clear = false; }
        if (!clear) continue;
        made++;
        tree(x, gg + 1, z, { h: w.ri(14, 20), r: w.r(6.5, 8), trunkR: 1.6, leaves: [made % 3 ? B.leaf2 : B.leafP, B.leaf, B.hedge] });
      }
      // 풀숲과 빛나는 수정 싹
      for (let i = 0; i < 1100; i++) {
        const x = w.ri(2, W - 3), z = w.ri(2, D - 3), gg = MH.g(w, x, z);
        if (gg < 0 || w.get(x, gg + 1, z) || w.liq[x + W * z] >= 0 || !isGrass(x, z)) continue;
        const r = hash3(x, 3, z);
        if (r > 0.94) { w.set(x, gg + 1, z, B.crys2); w.set(x, gg + 2, z, B.crys2); }
        else if (r > 0.86) { w.set(x, gg + 1, z, B.flowerStem); w.set(x, gg + 2, z, B.petal); }
        else { w.set(x, gg + 1, z, r > 0.5 ? B.leaf2 : B.hedge); if (r > 0.75) w.set(x, gg + 2, z, B.leaf2); }
      }

      // ── 대도서관 지붕을 맴도는 금서(부품) ──
      w.box(DX, lTop + 6, DZ, DX, lTop + 7, DZ, B.crys);
      lights.push({ name: 'lib', p: [DX + 0.5, lTop + 7, DZ + 0.5], c: '#ffe0a0', i: 1.2, d: 40, flicker: 0.08 });
      const tomes = w.prop({ name: 'tomes', pivot: [DX + 0.5, lt + 8, DZ + 0.5], axis: 'y', speed: 0.12, bob: 0.6, bobSpeed: 0.9 });
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * Math.PI * 2, bx = Math.round(DX + Math.cos(a) * 26), bz = Math.round(DZ + Math.sin(a) * 26), by = lt + 8 + (k % 2) * 4, c = [B.book1, B.book2, B.book3][k % 3];
        tomes.box(bx, by, bz, bx + 1, by + 3, bz + 3, c); tomes.box(bx - 1, by + 1, bz + 1, bx - 1, by + 2, bz + 3, B.parch); tomes.box(bx, by + 4, bz, bx + 1, by + 4, bz + 3, B.trim); tomes.set(bx, by + 5, bz + 1, B.gold);
      }
      acts.push({
        name: '금서의 비행', hint: '지붕 위 책들이 날아올라 돔 둘레를 맴돌아요', hit: [LX0 - 2, lt + 1, LZ0, LX1, dTop + 6, LZ1],
        run: async a => {
          a.flash('lib', 3, 5); a.spin('tomes', 7, 5);
          await a.move('tomes', [0, 22, 0], 1.4);
          for (let k = 0; k < 6; k++) { a.burst([DX + 0.5, lt + 30 + k * 2, DZ + 0.5], { n: 30, colors: ['#fff8e0', '#ffe0a0', '#c8b0ff'], speed: 22, up: 2, life: 1.6, gravity: 2, spread: 6 }); await a.wait(0.4); }
          await a.move('tomes', [0, 0, 0], 1.6);
        },
      });

      // ── 결투장: 기둥 위의 불꽃 구슬과 얼음 구슬(부품)이 가운데서 부딪친다 ──
      MH.circle(w, AX, AZ, 6, B.rune, 2); MH.circle(w, AX, AZ, 16, B.rune, 2);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; w.line(AX + Math.cos(a) * 7, ay, AZ + Math.sin(a) * 7, AX + Math.cos(a) * 15, ay, AZ + Math.sin(a) * 15, B.paleDk); }
      const duelOrb = (nm, k, c) => {
        const a = k * 1.57 + 0.78, px = Math.round(AX + Math.cos(a) * 20) + 1, pz = Math.round(AZ + Math.sin(a) * 20) + 1;
        const p = w.prop({ name: nm, pivot: [px, ay + 29, pz], axis: 'y', speed: 1.2, bob: 0.8, bobSpeed: 1.6 });
        p.sphere(px, ay + 28, pz, 3.6, c); p.sphere(px, ay + 28, pz, 2, B.ember);
        for (const [dx, dz] of [[4, 0], [-4, 0], [0, 4], [0, -4]]) p.set(px + dx, ay + 28, pz + dz, B.ember);
        p.set(px, ay + 32, pz, B.ember);
        return [AX - px, AZ - pz];
      };
      const fo = duelOrb('fireOrb', 1, B.flame), io = duelOrb('iceOrb', 3, B.crys2);
      acts.push({
        name: '원소 대결', hint: '불꽃 구슬과 얼음 구슬이 날아와 결투장 한가운데서 부딪쳐요', hit: [AX - 20, ay + 1, AZ - 20, AX + 20, ay + 32, AZ + 20],
        run: async a => {
          a.spin('fireOrb', 5, 6); a.spin('iceOrb', 5, 6);
          for (const k of [0.6, 1]) {
            a.move('fireOrb', [fo[0] * k - 1, -14, fo[1] * k + 1], 0.9); await a.move('iceOrb', [io[0] * k + 1, -14, io[1] * k - 1], 0.9);
            a.lightning(0.6 * k); a.glow(1.8, 0.8);
            a.burst([AX + 0.5, ay + 14, AZ + 0.5], { n: 50, colors: ['#ff8a3a', '#ffd060', '#80e0ff', '#ffffff'], speed: 24, up: 6, life: 1.2, gravity: 8, spread: 2 });
            a.move('fireOrb', [fo[0] * 0.3, -6, fo[1] * 0.3], 0.6); await a.move('iceOrb', [io[0] * 0.3, -6, io[1] * 0.3], 0.6);
          }
          for (let k = 0; k < 4; k++) { a.burst([AX + 0.5, ay + 4, AZ + 0.5], { n: 30, colors: k % 2 ? ['#80e0ff', '#ffffff'] : ['#ff8a3a', '#ffd060'], speed: 20, up: 2, life: 1, gravity: 4, spread: 8, flat: true }); await a.wait(0.3); }
          a.move('fireOrb', [0, 0, 0], 1.3); await a.move('iceOrb', [0, 0, 0], 1.3);
        },
      });

      // ── 수정 온실 옆 마법꽃: 봉오리에서 거대한 꽃이 자란다(부품, 평소엔 숨김) ──
      const FLX = 66, FLZ = 282;
      MH.leafBlob(w, FLX + 1, gy + 2, FLZ + 1, 2.8, 2, 2.8, [B.leaf2, B.leafP, B.leaf]);
      const bloom = w.prop({ name: 'bloom', pivot: [FLX + 0.5, gy + 1, FLZ + 0.5], axis: 'y', speed: 0.6, scl0: [0, 0, 0], clipOK: 40 });
      bloom.box(FLX, gy + 1, FLZ, FLX + 1, gy + 26, FLZ + 1, B.leaf);
      for (const [y, dir] of [[gy + 9, 1], [gy + 15, -1], [gy + 20, 1]]) { for (let q = 1; q <= 4; q++) bloom.box(FLX + (dir > 0 ? 1 + q : -q), y + (q > 2 ? 1 : 0), FLZ, FLX + (dir > 0 ? 1 + q : -q), y + (q > 2 ? 1 : 0), FLZ + 1, B.leaf2); }
      for (let dz = -8; dz <= 9; dz++) for (let dx = -8; dx <= 9; dx++) {
        const d = Math.abs(dx - 0.5) + Math.abs(dz - 0.5); if (d > 10) continue;
        const y = gy + 27 + (d >= 7 ? 2 : d >= 4 ? 1 : 0);
        bloom.set(FLX + dx, y, FLZ + dz, d <= 2 ? B.ember : (d <= 3 ? B.flame : B.petal));
        if (d >= 8) bloom.set(FLX + dx, y + 1, FLZ + dz, B.petal);
      }
      bloom.box(FLX, gy + 28, FLZ, FLX + 1, gy + 30, FLZ + 1, B.ember);
      acts.push({
        name: '마법꽃 개화', hint: '온실 옆 봉오리에서 거대한 꽃이 피어나 꽃가루를 뿌려요', hit: [FLX - 9, gy + 1, FLZ - 9, FLX + 10, gy + 31, FLZ + 10],
        run: async a => {
          a.glow(1.6, 6.5);
          await a.tween('bloom', { scl: [1, 1, 1] }, 2.2);
          for (let k = 0; k < 6; k++) { a.burst([FLX + 1, gy + 30, FLZ + 1], { n: 30, colors: ['#ff9ad8', '#ffd060', '#ffffff'], speed: 8, up: 6, life: 2.2, gravity: -1.2, spread: 6 }); await a.wait(0.5); }
          await a.tween('bloom', { scl: [0, 0, 0] }, 1.6);
        },
      });

      // ── 탑 발코니의 전령 부엉이(부품): 탑을 한 바퀴 날고 돌아온다 ──
      const OX = TX + 16, OZ = TZ + 6, oy = balc[0] + 1;
      for (let x = OX - 2; x <= OX + 6; x++) for (let z = OZ - 3; z <= OZ + 6; z++) for (let y = oy; y <= oy + 8; y++) if (MH.dist(x, z, TX, TZ) > tr(y) + 0.4) w.set(x, y, z, 0);
      const owl = w.prop({ name: 'owl', pivot: [OX + 2, oy + 3, OZ + 1.5] });
      owl.box(OX, oy, OZ, OX + 3, oy + 3, OZ + 3, B.owl); owl.box(OX + 3, oy, OZ + 1, OX + 3, oy + 2, OZ + 2, B.owlW);
      owl.box(OX, oy + 4, OZ, OX + 3, oy + 6, OZ + 3, B.owl); owl.box(OX + 4, oy + 4, OZ, OX + 4, oy + 6, OZ + 3, B.owlW);
      owl.set(OX + 5, oy + 5, OZ, B.ember); owl.set(OX + 5, oy + 5, OZ + 3, B.ember); owl.box(OX + 5, oy + 4, OZ + 1, OX + 5, oy + 4, OZ + 2, B.gold);
      owl.set(OX, oy + 7, OZ, B.owl); owl.set(OX, oy + 7, OZ + 3, B.owl);
      owl.box(OX, oy + 1, OZ - 1, OX + 3, oy + 3, OZ - 1, B.owl); owl.box(OX, oy + 1, OZ + 4, OX + 3, oy + 3, OZ + 4, B.owl); owl.box(OX - 1, oy, OZ + 1, OX - 1, oy + 1, OZ + 2, B.owl);
      const owlPts = [], r0 = Math.hypot(OX + 2 - TX, OZ + 1.5 - TZ), t0 = Math.atan2(OZ + 1.5 - TZ, OX + 2 - TX);
      for (let i = 1; i <= 16; i++) {
        const s = Math.sin(i / 16 * Math.PI), t = t0 + i / 16 * Math.PI * 2, r = r0 + Math.pow(s, 0.4) * 18;
        owlPts.push([TX + Math.cos(t) * r - OX - 2, Math.pow(s, 1.5) * 32, TZ + Math.sin(t) * r - OZ - 1.5]);
      }
      owlPts[15][1] = 40; owlPts.push([380 - OX, 68, 120 - OZ]);
      acts.push({
        name: '전령 부엉이', hint: '발코니의 부엉이가 날개를 펴고 탑을 한 바퀴 돈 뒤 편지를 물고 멀리 날아가요', hit: [OX - 2, oy - 1, OZ - 3, OX + 6, oy + 8, OZ + 6],
        run: async a => {
          a.burst([OX + 2, oy + 4, OZ + 2], { n: 20, colors: ['#e8dcc0', '#7a5a3a'], speed: 6, up: 4, life: 1.2, gravity: 6, spread: 2 });
          await a.drive('owl', owlPts, 20, { fwd: '+x', back: 2.0 });
          a.burst([OX + 2, oy + 4, OZ + 2], { n: 16, colors: ['#e8dcc0', '#ffd060'], speed: 4, up: 2, life: 1, gravity: 6, spread: 2 });
        },
      });

      // ── 동쪽 잔디의 빗자루 발판: 사람이 올라탈 만한 빗자루 두 자루(부품)가 섬을 한 바퀴 돈다 ──
      for (let y = base + 1; y <= base + 12; y++) for (let z = BRZ - 6; z <= BRZ + 10; z++) for (let x = BRX - 14; x <= BRX + 12; x++) w.set(x, y, z, 0);
      MH.circle(w, BRX, BRZ + 2, 10, B.rune, 2); MH.circle(w, BRX, BRZ + 2, 6, B.paleDk, 2); MH.circle(w, BRX, BRZ + 2, 2, B.rune, 2);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; w.line(BRX + Math.cos(a) * 3, base, BRZ + 2 + Math.sin(a) * 3, BRX + Math.cos(a) * 6, base, BRZ + 2 + Math.sin(a) * 6, B.rune); }
      // 올라타기 디딤돌(두 칸): 두 빗자루 사이
      w.box(BRX, base + 1, BRZ + 2, BRX + 2, base + 2, BRZ + 3, B.paleDk); w.box(BRX, base + 2, BRZ + 2, BRX + 2, base + 2, BRZ + 3, B.trim);
      const broom = (nm, z) => {
        const p = w.prop({ name: nm, pivot: [BRX + 1, base + 4, z + 1], bob: 0.6, bobSpeed: 1.3, phase: z });
        p.box(BRX - 4, base + 3, z, BRX + 8, base + 4, z + 1, B.bark);                      // 자루(2×2): 윗면 폭 2칸
        for (let x = BRX - 4; x <= BRX + 8; x += 4) p.box(x, base + 3, z, x, base + 4, z + 1, B.barkDk);
        p.box(BRX - 5, base + 2, z - 1, BRX - 4, base + 5, z + 2, B.gold);                  // 묶음 띠
        for (let x = BRX - 11; x <= BRX - 6; x++) { const t = (BRX - 6 - x) / 5, rr = 1.6 + t * 1.6; for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) if (Math.hypot(dy, dz - 0.5) <= rr + 0.3) p.set(x, base + 4 + dy, z + dz, (x + dy + dz) % 3 ? B.straw : B.straw2); }
        p.box(BRX + 9, base + 3, z, BRX + 9, base + 4, z + 1, B.gold); p.box(BRX + 10, base + 3, z, BRX + 10, base + 4, z + 1, B.crys);
        return p;
      };
      broom('broomA', BRZ - 2); broom('broomB', BRZ + 6);
      const loop = [[BRX, BRZ], [268, 124], [220, 52], [116, 48], [44, 136], [68, 256], [160, 296], [192, 380]];
      const brPts = [[0, 16, 0], [20, 28, 0]].concat(loop.slice(1).map(([x, z]) => [x - BRX, 60, z - BRZ]));
      const fly = async (a, nm) => { await a.drive(nm, brPts, 24, { fwd: '+x', back: 2.0 }); };
      acts.push({
        name: '빗자루 비행', hint: '룬 발판의 빗자루 두 자루가 떠올라 섬을 한 바퀴 돌고 멀리 날아가요', hit: [BRX - 12, base + 1, BRZ - 8, BRX + 12, base + 12, BRZ + 12],
        run: async a => {
          a.burst([BRX + 0.5, base + 4, BRZ + 2.5], { n: 40, colors: ['#a890ff', '#ffd060', '#ffffff'], speed: 12, up: 8, life: 1.4, gravity: 4, spread: 6 });
          fly(a, 'broomA'); await a.wait(0.7); await fly(a, 'broomB');
          a.burst([BRX + 0.5, base + 4, BRZ + 2.5], { n: 40, colors: ['#a890ff', '#ffd060', '#ffffff'], speed: 12, up: 4, life: 1.2, gravity: 4, spread: 6, flat: true });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
