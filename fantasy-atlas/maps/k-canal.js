// 수로 지구 — 운하 격자, 도개교와 갑문, 벽돌 창고와 좁고 높은 운하 집, 남쪽 수상 시장 선착장 (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 낱돌 물막이 벽(줄눈·갓돌·계선주·쇠고리), 벽돌 창고(띠돌·모서리 기둥·아치 창·하역문·도르래 들보), 계단 박공 운하 집(창틀·창살·덧문·꽃상자·문·박공 들보),
// 아치 돌다리(홍예돌·난간 동자), 다리탑과 도개교, 갑문과 갑문지기 집, 곤돌라·장배·백조. playerScale 2 (사람 키 6.8칸).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'canal', cat: 'kingdom', name: '수로 지구', en: 'Canal Ward', color: '#5aa8c8', seed: 227, base: 40, size: [W, D, Hh],
    playerScale: 2,
    desc: '왕도의 물길이 모이는 수로 지구. 곤돌라가 창고와 창고 사이를 오가며 짐을 나른다. 남쪽 물길 끝의 둥근 선착장에는 아침마다 과일과 꽃을 실은 배들이 모여 물 위의 장이 선다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 동쪽 저지대'], ['명물', '도개교 · 갑문 · 곤돌라'], ['수상 시장', '둥근 선착장 · 등탑 · 뱃사공 쉼터'], ['소문', '갑문지기는 물속 도시로 가는 길을 안다']] },
    fog: { start: 0.8, floor: 20, depth: 20, haze: [40, 0.12, 10], hazeColor: '#d8e8f0' },
    camY: -32, zoom: 1.12,
    particles: [
      { n: 40, colors: ['#ffffff', '#d8e8f0'], mode: 'wisp', speed: 2.4, size: 2, y0: 88, glow: false },
      { n: 140, colors: ['#e8f8ff'], mode: 'drift', speed: 0.6, y0: 44, y1: 120, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      // 땅·돌
      pv1: { c: '#8a8680', top: '#a8a49a', v: 0.05 }, pv2: { c: '#7e7a72', top: '#96928a', v: 0.05 }, pv3: { c: '#948e84', top: '#b2ac9e', v: 0.05 }, pvJ: { c: '#6a665e', top: '#74706a', v: 0.03 },
      sq1: { c: '#a8a49c', top: '#c4c0b6', v: 0.04 }, sq2: { c: '#9a968e', top: '#b4b0a6', v: 0.04 },
      st1: { c: '#d8dade', v: 0.04 }, st2: { c: '#c4c6cc', v: 0.04 }, st3: { c: '#e4e2dc', v: 0.04 }, st4: { c: '#b8bcc4', v: 0.04 }, mortar: { c: '#8e8e92', v: 0.03 },
      sill: { c: '#d8d4ca', v: 0.03 }, cope: { c: '#b8b4ac', top: '#d0ccc2', v: 0.03 }, moss: { c: '#5a7a4a', v: 0.08 },
      // 벽돌·회반죽·나무
      brick: { c: '#9a5a3a', v: 0.05 }, brick2: { c: '#86492e', v: 0.05 }, brickDk: { c: '#6a3a2a', v: 0.04 }, brickLt: { c: '#b06a48', v: 0.05 },
      mullion: { c: '#f2ece0', v: 0.02 }, frameDk: { c: '#46301e', v: 0.04 }, frameW: { c: '#f0ece4', v: 0.02 }, doorDk: { c: '#33241a', v: 0.03 }, doorG: { c: '#2e5a46', v: 0.03, pat: 'plank' }, doorGd: { c: '#22463a', v: 0.03 },
      brass: { c: '#e0b850', v: 0.02 }, hinge: { c: '#2e2e34', v: 0.02 }, ironDk: { c: '#33333a', v: 0.03 }, gutter: { c: '#6a6e72', v: 0.03 },
      shutGd: { c: '#2c563a', v: 0.02 }, shutBd: { c: '#2c4a72', v: 0.02 }, shutRd: { c: '#702c1e', v: 0.02 },
      soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, pot: { c: '#b8643a', v: 0.04 },
      flowerStem: { c: '#4a8a34', v: 0.08 }, flowerLf: { c: '#5e9e44', v: 0.08 }, flowerP: { c: '#e86a8a', v: 0.05 }, flowerB: { c: '#7a8ae8', v: 0.05 },
      // 지붕(기와 넷: 붉은·푸른·갈색·석판)
      tR: { c: '#b04a3a', v: 0.04 }, tR2: { c: '#94382c', v: 0.03 }, tR3: { c: '#bc5846', v: 0.04 }, tRd: { c: '#7a3028', v: 0.04 },
      tB: { c: '#2e5aa8', v: 0.04 }, tB2: { c: '#244a8c', v: 0.03 }, tB3: { c: '#3a68b4', v: 0.04 }, tBd: { c: '#1e3a6a', v: 0.04 },
      tN: { c: '#7a4a30', v: 0.04 }, tN2: { c: '#683c26', v: 0.03 }, tN3: { c: '#8a5638', v: 0.04 }, tNd: { c: '#4e2e1e', v: 0.04 },
      tS: { c: '#4a4a5a', v: 0.04 }, tS2: { c: '#3c3c4a', v: 0.03 }, tS3: { c: '#565668', v: 0.04 }, tSd: { c: '#2c2c36', v: 0.04 },
      // 물건
      crateEdge: { c: '#7a5232', v: 0.04 }, cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      barkDk: { c: '#463020', v: 0.05 }, leafLt: { c: '#8ac25a', v: 0.08 },
      quay: { c: '#a8a49c', v: 0.05, pat: 'big' }, gond: { c: '#24242c', v: 0.03 }, gondIn: { c: '#3a2a22', v: 0.03 }, cush: { c: '#a02a34', v: 0.02 }, hull: { c: '#5a4030', v: 0.05, pat: 'plank' }, hullDk: { c: '#3e2c20', v: 0.04 },
      swan: { c: '#f8f8f4', v: 0.02 }, beak: { c: '#f08a30', v: 0.03 }, eye: { c: '#1a1a1a', v: 0.01 }, cygnet: { c: '#a8a8a4', v: 0.04 }, lantern: { c: '#ffb860', glow: true }, paddle: { c: '#7a5a3a', v: 0.05, pat: 'plank' },
      apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f09030', v: 0.05 }, melon: { c: '#5a9a3a', v: 0.07 }, clothR: { c: '#c03a5a', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothB: { c: '#3a7ac0', v: 0.02 },
      redBand: { c: '#c03a34', v: 0.03 }, beacon: { c: '#fff0b0', glow: true }, fishS: { c: '#c8d8e0', v: 0.05 }, fishG: { c: '#e8a040', v: 0.05 },
    }),
    build(w) {
      const B = w.id, base = w.base, G = base + 8, WL = base + 4, BED = base - 6;
      const lights = [], acts = [], landmarks = [];

      // ───────── 공통 도구(2배 해상도용, v-millbrook.js에서 옮겨 고침) ─────────
      // 낱돌 쌓기: 2칸 높이 돌 + 1칸 줄눈, 길이 5칸 돌을 줄마다 엇갈려 쌓는다. 줄눈이면 0
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      // 벽돌: 1칸 높이 줄, 길이 4칸, 줄마다 엇갈림 — 몇 장은 어둡거나 밝다
      const brickAt = (u, y, salt) => { const k = Math.floor((u + (y & 1) * 2) / 4), h = hash3(k, y, salt); return h > 0.86 ? B.brick2 : h < 0.07 ? B.brickLt : B.brick; };
      // 돌길 무늬: 4×3칸 돌, 1칸 줄눈, 줄마다 엇갈림
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.pvJ;
        return [B.pv1, B.pv2, B.pv3][(hash3(Math.floor((x + off) / 4), row, 7) * 3) | 0];
      };
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      const clump = (T, cx, cy, cz, r, L) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          T.set(x, y, z, dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]));
        }
      };
      // 가로수: 밑동이 넓은 줄기, 가지, 가지 끝 잎뭉치
      const tree = (x, y, z, o) => {
        const h = o.h, R0 = o.trunkR || 1.4, L = [B.leaf2, B.leaf, B.leafDk];
        for (let i = 0; i < h; i++) {
          const rr = Math.max(0.6, R0 * (1 - i / h * 0.55) + (i < 2 ? (2 - i) * 0.5 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) if (dx * dx + dz * dz <= rr * rr) w.set(x + dx, y + i, z + dz, hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62 ? B.barkDk : B.bark);
        }
        const nB = o.branches || 4, r = o.r || 6, ends = [[x, y + h + 1, z, 1.1]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + hash3(x, i, z) * 0.8, sy = y + Math.floor(h * (0.55 + hash3(i, x, z) * 0.25));
          const l = r * (0.75 + hash3(z, i, x) * 0.3), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * 0.55;
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, 0.85]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(w, ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 2; q++) { const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.7; clump(w, ex + Math.cos(a) * dd, ey + (q ? 1 : -1) * rc * 0.25, ez + Math.sin(a) * dd, rc * 0.62, L); }
        });
      };
      const barrel = (T, x, y, z, ht) => {   // 가운데 (x,z), 볼록한 통, 쇠테 둘, 뚜껑
        ht = ht || 6;
        for (let r = 0; r < ht; r++) {
          const rr = r >= 2 && r <= ht - 3 ? 2.2 : 1.8;
          for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            T.set(x + dx, y + r, z + dz, r === ht - 1 ? (outer ? B.cask : B.caskTop) : (r === 1 || r === ht - 2) && outer ? B.iron : ((dx + dz) & 1 ? B.cask : B.cask2));
          }
        }
      };
      const crate = (T, x, y, z, s, sy, sz) => {
        sy = sy || s; sz = sz || s;
        for (let dy = 0; dy < sy; dy++) for (let dz = 0; dz < sz; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === sy - 1) + (dz === 0 || dz === sz - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      // 가로등: 돌 받침, 쇠기둥과 고리, 유리 등롱(모서리 쇠살), 갓과 꼭지
      const lampPost = (x, z, h) => {
        h = h || 10;
        const y = MH.g(w, x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.sill);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lampG);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.ironDk); w.set(x, ly + 7, z, B.brass);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const FLW = [B.flowerR, B.flowerY, B.flowerW, B.flowerP, B.flowerB];

      // 집 벽면 좌표(u: 벽을 따라, d: 바깥쪽으로)
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      // 창: 5폭 유리, 가운데 창살과 가로살, 창틀, 내민 창턱, 덧문(살결·경첩), 꽃상자
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6), fr = o.frame || B.frame;
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, fr); put(sd, wu + 5, wy + r, 1, fr); }
        for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh, 1, o.lintel || fr);
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy - 1, 1, B.sill); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.sill); }
        if (o.shutter) for (const c0 of [-3, 6]) for (let c = 0; c < 2; c++) for (let r = 0; r < wh; r++) {
          put(sd, wu + c0 + c, wy + r, 1, r % 2 ? o.shutter[0] : o.shutter[1]);
          if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
        }
        if (o.box) for (let c = -1; c <= 5; c++) {
          put(sd, wu + c, wy - 2, 2, B.plank); put(sd, wu + c, wy - 2, 3, B.plank);
          const hh = hash3(wu + c, wy, sd.k.charCodeAt(0));
          put(sd, wu + c, wy - 1, 3, hh > 0.35 ? B.flowerLf : FLW[(hh * 40 | 0) % 5]);
          if ((c & 1) === 0 || hh > 0.8) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7 + (hh * 3 | 0)) % 5]);
        }
      };
      // 문: 5폭 9높이, 테두리 살 + 움푹한 판, 놋 손잡이, 문틀, 돌계단, 벽 등롱
      const doorAt = (sd, cu, yb, o) => {
        const u0 = cu - 2, dm = o.door || [B.door, B.doorDk], fr = o.frame || B.frame;
        for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) {
          const stile = c === 0 || c === 4 || r === 0 || r === 4 || r === 8;
          put(sd, u0 + c, yb + r, 1, 0);
          if (stile) put(sd, u0 + c, yb + r, 0, dm[1]);
          else { put(sd, u0 + c, yb + r, 0, 0); put(sd, u0 + c, yb + r, -1, dm[0]); }
        }
        put(sd, u0 + 3, yb + 4, 1, B.brass);
        for (let r = 0; r <= 9; r++) { put(sd, u0 - 1, yb + r, 1, fr); put(sd, u0 + 5, yb + r, 1, fr); }
        for (let c = -2; c <= 6; c++) put(sd, u0 + c, yb + 9, 1, B.frameDk);
        put(sd, u0 + 2, yb + 10, 1, B.sill);
        for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
          const p = sd.at(u0 + c, d);
          for (let y = G; y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
          for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
        }
        let lamp = null;
        if (o.lantern) {
          const lc = u0 + 7;
          put(sd, lc, yb + 8, 1, B.iron); put(sd, lc, yb + 8, 2, B.iron); put(sd, lc, yb + 7, 2, B.ironDk);
          put(sd, lc, yb + 6, 2, B.lampG); put(sd, lc, yb + 5, 2, B.lampG); put(sd, lc, yb + 4, 2, B.ironDk);
          const p = sd.at(lc, 2); lamp = [p[0] + 0.5, yb + 6, p[1] + 0.5];
        }
        const p = sd.at(cu, 2);
        return { door: [p[0], yb, p[1]], lamp };
      };
      // 박공지붕: 겹 쌓인 기와(이음줄 엇갈림), 두꺼운 처마 끝, 용마루, 박공널, 물받이·홈통, 다락 박공벽과 박공창
      const PAL = { r: [B.tR, B.tR2, B.tR3, B.tRd], b: [B.tB, B.tB2, B.tB3, B.tBd], n: [B.tN, B.tN2, B.tN3, B.tNd], s: [B.tS, B.tS2, B.tS3, B.tSd] };
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov != null ? o.ov : 3, og = o.og != null ? o.og : 2, pal = o.pal || PAL.r;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            P(a, l, ry, s === 0 ? pal[3] : seam ? pal[1] : (hash3(l >> 2, s, 5) > 0.8 ? pal[2] : pal[0]));
            P(a, l, ry - 1, pal[3]);
            if (s === sMax) P(a, l, ry + 1, pal[3]);
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (s >= 1 && og > 0 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        if (o.gwin !== false) {
          const mid = (A0 + A1) / 2, midA = Math.floor(mid), odd = (A1 - A0) % 2 === 0;
          for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
            if (o.gwin === 'front' && gl !== (o.front === 'lo' ? g0 : g1)) continue;
            const gy = top + Math.max(2, Math.floor((mid - A0) * 0.3));
            for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy + r, 0); }
            for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, o.gframe || B.frame); }
            for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, o.gframe || B.frame); P(midA + (odd ? 2 : 3), out, gy + r, o.gframe || B.frame); }
          }
        }
        if (o.gutter && ov > 0) for (const ae of [a0 - 1, a1 + 1]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const aw = ae < A0 ? A0 - 1 : A1 + 1;
          for (let y = y0 - 2; y >= o.foot; y--) P(aw, g0 + 1, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, brickAt(cx + dx + cz + dz, y, 4));
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(cx + dx, y, cz + dz, B.brickDk);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.sill);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) w.box(px, yt + 1, pz, px, yt + 2, pz, B.pot);
        return [cx + 2, yt + 3, cz + 2];
      };
      // 집 하나. o: x,z,sx,sz,floors,fh,face,brick(벽돌 벽),wall,trim,pal,axis,ov,og,shutter,box,stepped(정면 계단 박공),winGap,lantern,chimney
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 2, fh = o.fh || 12, face = o.face || 's';
        const gy = G + 1, wall = o.brick ? B.brick : (o.wall || B.plaster), trim = o.trim || (o.brick ? B.frameW : B.frame);
        // 기초: 낱돌(줄눈이 파였다), 맨 윗단은 갓돌
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = G; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            w.set(x, y, z, stoneAt((z === z0 - 1 || z === z1 + 1) ? x : z, y, 3) || B.mortar);
          }
        }
        let yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        const S = SIDES(x0, z0, x1, z1), gap = o.winGap || 12;
        for (let f = 0; f < fl; f++) {
          w.box(x0, yb, z0, x1, yb + fh - 1, z1, wall);
          const wh = Math.min(7, fh - 5), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            if (o.sides && !o.sides.includes(k)) continue;
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0;
            // 벽면: 벽돌이면 낱장 무늬, 아니면 회반죽. 모서리 귀돌, 층 띠
            for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
              const corner = u - sd.u0 < 2 || sd.u1 - u < 2;
              if (corner) put(sd, u, y, 0, ((y - yb) >> 1) & 1 ? (o.brick ? B.brickDk : B.sill) : (o.brick ? B.brick2 : B.st2));
              else if (o.brick) put(sd, u, y, 0, brickAt(u, y, k.charCodeAt(0)));
            }
            for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, yb, 1, o.brick ? B.brickDk : B.sill);
            const wins = [];
            const nW = Math.max(1, Math.floor((L + 2) / gap));
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 8) continue;
              if (wu - 2 <= sd.u0 || wu + 6 >= sd.u1) continue;
              wins.push(wu);
            }
            const front = k === face;
            for (const wu of wins) windowAt(sd, wu, wy, wh, { frame: trim, lintel: o.brick ? B.brickDk : trim, shutter: front && o.shutter && wu - 3 > sd.u0 + 1 && wu + 7 < sd.u1 - 1 ? o.shutter : null, box: front && o.box });
            if (isDoor) { const r = doorAt(sd, cu, yb, { lantern: o.lantern !== false, frame: trim, door: o.door }); out.door = r.door; out.lamp = r.lamp; out.side = sd; }
          }
          yb += fh;
        }
        const top = yb, axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        // 처마 돌림띠
        for (const k of ['s', 'n', 'e', 'w']) { const sd = S[k]; for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, top - 1, 1, o.brick ? B.brickDk : trim); }
        const front = face === 'n' || face === 'w' ? 'lo' : 'hi';
        out.peak = roof(x0, x1, z0, z1, top, { axis, pal: o.pal, gable: wall, gutter: !o.stepped, foot: gy + 3, ov: o.ov, og: o.og, gwin: o.gwin, front, gframe: trim });
        out.top = top;
        if (o.stepped) {
          // 계단 박공: 정면 박공벽을 지붕보다 높이 쌓아 3칸씩 계단으로 줄이고, 계단마다 갓돌, 꼭대기에 도르래 들보
          const sd = S[face], ov = o.ov != null ? o.ov : 3;
          for (let u = sd.u0; u <= sd.u1; u++) {
            const s = Math.min(u - sd.u0, sd.u1 - u), hs = top + 3 * Math.floor(s / 3) + 3;
            for (let y = top; y <= hs; y++) for (const d of [0, -1]) {
              const p = sd.at(u, d), cur = w.get(p[0], y, p[1]);
              if (cur === B.win || cur === B.mullion) continue;
              w.set(p[0], y, p[1], o.brick ? brickAt(u, y, 9) : wall);
            }
            put(sd, u, hs + 1, 0, B.sill); put(sd, u, hs + 1, -1, B.sill); put(sd, u, hs + 1, 1, B.sill);
            for (let y = hs + 2; y <= top + 3 * Math.floor((s + 1) / 3) + 4; y++) { put(sd, u, y, 0, 0); put(sd, u, y, -1, 0); }
          }
          const cu = Math.floor((sd.u0 + sd.u1) / 2), ht = top + 3 * Math.floor((cu - sd.u0) / 3) + 3;
          for (let d = 1; d <= 4; d++) put(sd, cu, ht - 2, d, B.wood);
          put(sd, cu, ht - 3, 4, B.iron); put(sd, cu, ht - 4, 4, B.rope); put(sd, cu, ht - 5, 4, B.iron);
          put(sd, cu, ht + 2, 0, trim); put(sd, cu, ht + 3, 0, trim);
          out.peak = Math.max(out.peak, ht + 4);
          void ov;
        }
        if (o.chimney) out.chimney = chimney(axis === 'x' ? x0 + 3 : Math.floor((x0 + x1) / 2) - 1, axis === 'x' ? Math.floor((z0 + z1) / 2) - 1 : z1 - 6, top - 2, out.peak + 4);
        return out;
      };
      // 늘어선 집(도시 블록): 사각 영역을 집들로 채운다
      const ROOFS = [PAL.r, PAL.b, PAL.n, PAL.r, PAL.s];
      const WALLS = [B.plaster, B.plasterB, B.plasterP, B.plasterG, B.plasterY];
      const SHUT = [[B.shutG, B.shutGd], [B.shutB, B.shutBd], [B.shutR, B.shutRd]];
      const row = (x0, z0, x1, z1, face, seed, o) => {
        o = o || {};
        const res = [], alongX = face === 's' || face === 'n';
        let p = alongX ? x0 : z0, k = seed;
        const end = alongX ? x1 : z1;
        while (p < end - 12) {
          const len = Math.min(end - p, 18 + ((hash3(k, seed, 3) * 7) | 0));
          const h = house({ x: alongX ? p : x0, z: alongX ? z0 : p, sx: alongX ? len : x1 - x0, sz: alongX ? z1 - z0 : len, floors: 2 + (k % 2), fh: 12, face,
            brick: k % 4 === 3, wall: WALLS[k % 5], pal: ROOFS[k % 5], shutter: o.shut ? SHUT[k % 3] : null, box: o.box && k % 2 === 0, ov: 1, og: 0, gwin: false,
            axis: alongX ? 'x' : 'z', winGap: 10, chimney: k % 3 === 1, lantern: k % 3 === 0, sides: o.sides });
          res.push(h); p += len; k++;
        }
        return res;
      };

      // ───────── 땅과 운하 ─────────
      MH.terrain(w, { floor: 8, height: () => G, surface: (x, z) => paveAt(x, z), under: (x, z, y, dep) => dep < 3 ? B.dirt : B.rock });
      const CZ0 = 156, CZ1 = 175, BAX = 200, BAZ = 244;
      const basin = (x, z) => ((x + 0.5 - BAX) / 45) ** 4 + ((z + 0.5 - BAZ) / 21) ** 4 <= 1;
      const canal = (x, z) => (z >= CZ0 && z <= CZ1) || (x >= 96 && x <= 109 && z < CZ0) || (x >= 188 && x <= 201 && z > CZ1) || basin(x, z);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (canal(x, z)) { MH.setH(w, x, z, BED, hash3(x >> 1, 1, z >> 1) > 0.7 ? B.rockDk : B.rock, B.rock); for (let y = BED + 1; y <= G; y++) w.set(x, y, z, 0); w.liquid(x, z, WL); }
      // 물막이 벽: 운하에 닿은 칸은 낱돌 벽(물높이 근처는 이끼), 맨 위는 갓돌. 그 바깥 두 줄은 큰 판석
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && canal(x, z);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (wet(x, z)) continue;
        const n1 = wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1) || wet(x, z - 1);
        if (n1) {
          const u = wet(x, z + 1) || wet(x, z - 1) ? x : z;
          for (let y = BED; y < G; y++) { const s = stoneAt(u, y, 11) || B.mortar; w.set(x, y, z, y <= WL + 1 && y >= WL - 1 && hash3(x, y, z) > 0.45 ? B.moss : s); }
          w.set(x, G, z, B.cope);
          continue;
        }
        let n2 = false;
        for (let dz = -3; dz <= 3 && !n2; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.abs(dx) + Math.abs(dz) <= 3 && wet(x + dx, z + dz)) { n2 = true; break; }
        if (n2) w.set(x, G, z, ((x >> 2) + (z >> 2)) & 1 ? B.sq1 : B.sq2);
      }
      // 계선주(쇠 말뚝)와 물막이 벽의 쇠고리
      const bollard = (x, z) => { if (w.get(x, G + 1, z)) return; w.box(x, G + 1, z, x + 1, G + 3, z + 1, B.ironDk); w.box(x, G + 4, z, x + 1, G + 4, z + 1, B.iron); };
      for (let x = 6; x < W - 4; x += 16) for (const [z, rz] of [[CZ0 - 3, CZ0 - 1], [CZ1 + 2, CZ1 + 1]]) if (!wet(x, z) && !wet(x + 1, z) && ![[94, 111], [186, 203], [46, 66], [238, 258], [124, 145], [206, 216]].some(([a, b]) => x >= a && x <= b)) { bollard(x, z); if (!wet(x, rz)) w.set(x, WL + 3, rz + (rz < CZ0 ? 1 : -1) * 0, B.iron); }
      for (let z = 8; z < CZ0 - 6; z += 16) { bollard(93, z); bollard(111, z); }

      // ───────── 벽돌 창고 셋(큰 운하 북쪽) ─────────
      const WXS = [120, 156, 220], WZ0 = 120, WSX = 30, WSZ = 28;
      const whs = WXS.map((x0, k) => {
        const x1 = x0 + WSX - 1, z0 = WZ0, z1 = z0 + WSZ - 1, top = G + 44;
        // 돌 기단
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) for (let y = G; y <= G + 3; y++) {
          const edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          w.set(x, y, z, !edge ? B.mortar : y === G + 3 ? B.sill : (stoneAt(z === z0 - 1 || z === z1 + 1 ? x : z, y, 5) || B.mortar));
        }
        const S = SIDES(x0, z0, x1, z1);
        w.box(x0, G + 4, z0, x1, top - 1, z1, B.brick);
        for (const sk of ['s', 'n', 'e', 'w']) {
          const sd = S[sk];
          for (let y = G + 4; y < top; y++) for (let u = sd.u0; u <= sd.u1; u++) {
            const pil = u - sd.u0 < 2 || sd.u1 - u < 2;
            put(sd, u, y, 0, pil ? (y & 1 ? B.brickDk : B.brick2) : brickAt(u, y, k * 7 + sk.charCodeAt(0)));
            if (pil && (u - sd.u0 === 0 || sd.u1 - u === 0)) put(sd, u, y, 1, y & 1 ? B.brickDk : B.brick2);
          }
          // 층 띠(두 줄, 1칸 내밈)와 처마 돌림띠
          for (const fy of [G + 4, G + 18, G + 31, top - 2]) for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, fy, 1, fy === G + 4 ? B.sill : B.brickDk); if (fy === top - 2) put(sd, u, fy + 1, 1, B.brickDk), put(sd, u, fy + 1, 2, B.sill); }
          // 아치 창: 층마다 5폭, 위는 홍예 벽돌, 아래는 돌 창턱
          const cu = Math.floor((sd.u0 + sd.u1) / 2);
          const cols = sk === 's' || sk === 'n' ? [sd.u0 + 4, sd.u1 - 8] : [sd.u0 + 4, cu - 2, sd.u1 - 8];
          for (const [wy, wh] of [[G + 7, 8], [G + 21, 7], [G + 34, 6]]) for (const wu of cols) {
            for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, c === 2 || r === wh - 3 ? B.ironDk : B.win); }
            for (let c = -1; c <= 5; c++) { put(sd, wu + c, wy - 1, 1, B.sill); put(sd, wu + c, wy + wh + (c === -1 || c === 5 ? 0 : 1), 0, B.brickDk); }
            for (let c = 0; c <= 4; c++) put(sd, wu + c, wy + wh, 1, c === 2 ? B.sill : B.brickDk);
            put(sd, wu - 1, wy + wh, 0, B.brickDk); put(sd, wu + 5, wy + wh, 0, B.brickDk);
          }
          // 가운데 열: 1층 문(남쪽), 2·3층 하역문
          if (sk === 's') {
            for (const [fy, h2] of [[G + 20, 10], [G + 33, 8]]) {
              for (let y = fy; y < fy + h2; y++) for (let u = cu - 3; u <= cu + 2; u++) put(sd, u, y, 0, fy === G + 20 ? B.doorDk : (u === cu - 1 || u === cu ? B.wood : (y - fy) % 3 === 1 ? B.iron : B.plank));
              for (let u = cu - 4; u <= cu + 3; u++) { put(sd, u, fy + h2, 0, B.brickDk); put(sd, u, fy + h2, 1, B.brickDk); put(sd, u, fy - 1, 1, B.sill); }
              for (let y = fy; y < fy + h2; y++) { put(sd, cu - 4, y, 1, B.brickDk); put(sd, cu + 3, y, 1, B.brickDk); }
            }
          }
        }
        // 지붕: 석판(물받이·홈통), 굴뚝, 하역 도르래 들보(정면 박공 위)
        const peak = roof(x0, x1, z0, z1, top, { axis: 'x', pal: PAL.s, gable: B.brick, gutter: true, foot: G + 4, ov: 3, og: 2, gframe: B.brickDk });
        chimney(x0 + 23, z0 + 5, top - 2, peak + 4);
        const cu = Math.floor((x0 + x1) / 2);
        for (let z = z1 - 4; z <= z1 + 5; z++) for (const x of [cu - 1, cu]) w.set(x, top + 1, z, B.wood);
        for (let y = top - 6; y <= top; y++) for (const x of [cu - 1, cu]) w.set(x, y, z1 + 1, B.wood);
        w.set(cu - 1, top, z1 + 5, B.iron); w.set(cu, top, z1 + 5, B.iron); w.set(cu, top - 1, z1 + 5, B.rope); w.set(cu, top - 2, z1 + 5, B.iron);
        // 처마 밑 흰 이름판
        w.box(cu - 7, top - 5, z1 + 1, cu + 6, top - 4, z1 + 1, B.white);
        for (let x = cu - 6; x <= cu + 5; x += 2) w.set(x, top - 4, z1 + 2, B.sill);
        // 1층 문(가운데 열 아래): 두 짝 판자문, 쇠띠, 돌 문틀
        const sd = S.s, dy = G + 4;
        for (let y = dy; y < dy + 11; y++) for (let u = cu - 3; u <= cu + 2; u++) { put(sd, u, y, 0, 0); put(sd, u, y, -1, u === cu - 1 || u === cu ? B.doorDk : (y - dy) % 4 === 2 ? B.iron : B.door); }
        for (let y = dy; y <= dy + 11; y++) { put(sd, cu - 4, y, 1, B.st2); put(sd, cu + 3, y, 1, B.st2); }
        for (let u = cu - 5; u <= cu + 4; u++) { put(sd, u, dy + 11, 1, B.sill); put(sd, u, dy + 12, 1, B.brickDk); }
        put(sd, cu - 2, dy + 5, 0, B.brass); put(sd, cu + 1, dy + 5, 0, B.brass);
        // 문 양옆 벽 등롱(쇠 팔, 유리 등)
        for (const lu of [cu - 7, cu + 6]) { put(sd, lu, dy + 9, 1, B.iron); put(sd, lu, dy + 9, 2, B.iron); put(sd, lu, dy + 8, 2, B.ironDk); put(sd, lu, dy + 7, 2, B.lampG); put(sd, lu, dy + 6, 2, B.lampG); put(sd, lu, dy + 5, 2, B.ironDk); }
        // 문 앞 디딤돌(기단을 깎아 바닥과 같은 높이로)
        for (let u = cu - 4; u <= cu + 3; u++) for (let y = G + 1; y <= G + 3; y++) put(sd, u, y, 1, 0);
        for (let u = cu - 4; u <= cu + 3; u++) for (let y = G + 1; y < dy; y++) put(sd, u, y, 0, y === dy - 1 ? B.sill : B.st2);
        for (let u = cu - 4; u <= cu + 3; u++) { put(sd, u, G + 1, 1, B.sill); put(sd, u, G + 1, 2, B.sill); put(sd, u, G + 2, 1, B.sill); }
        return { x0, x1, z0, z1, top, peak, door: [cu, G + 1, z1 + 1], cu };
      });
      // 거룻배(정박): 판자 선체, 뱃전, 상자와 통
      const BGX = 162, BGZ = 158;
      for (let x = BGX; x <= BGX + 27; x++) for (let z = BGZ; z <= BGZ + 7; z++) {
        const end = x === BGX || x === BGX + 27, side = z === BGZ || z === BGZ + 7;
        if ((x === BGX || x === BGX + 27) && (z === BGZ || z === BGZ + 7)) continue;
        w.set(x, WL, z, B.hullDk);
        if (end || side) { w.set(x, WL + 1, z, B.hull); w.set(x, WL + 2, z, x % 4 === 0 ? B.hullDk : B.hull); w.set(x, WL + 3, z, B.wood); }
        else w.set(x, WL + 1, z, B.plank);
      }
      crate(w, BGX + 3, WL + 2, BGZ + 2, 4); crate(w, BGX + 8, WL + 2, BGZ + 2, 4, 3, 4); crate(w, BGX + 4, WL + 6, BGZ + 2, 3);
      barrel(w, BGX + 15, WL + 2, BGZ + 2, 5); barrel(w, BGX + 15, WL + 2, BGZ + 5, 5);
      for (let k = 0; k < 10; k++) { const a = k * 0.63; w.set(Math.round(BGX + 25 + Math.cos(a) * 1.6), WL + 2, Math.round(BGZ + 4 + Math.sin(a) * 1.6), B.rope); }
      // 창고 기중기: 돌 받침, 굵은 나무 기둥과 버팀대, 팔, 도르래 — 밧줄이 감기며 거룻배의 짐이 올라간다
      const CX = 182, CZ = 151, ARM = G + 30;
      w.box(CX - 3, G + 1, CZ - 3, CX + 3, G + 2, CZ + 3, B.sill); w.box(CX - 2, G + 3, CZ - 2, CX + 2, G + 3, CZ + 2, B.st2);
      w.box(CX, G + 4, CZ, CX + 1, ARM, CZ + 1, B.wood);
      for (let y = G + 6; y <= ARM; y += 6) w.box(CX - 1, y, CZ - 1, CX + 2, y, CZ + 2, B.iron);
      for (const [dx, dz] of [[-4, 0], [5, 0], [0, -4]]) w.line(CX + 0.5 + dx, G + 3, CZ + 0.5 + dz, CX + 0.5, G + 15, CZ + 0.5, B.wood);
      w.box(CX, ARM + 1, CZ - 4, CX + 1, ARM + 2, CZ + 11, B.wood); w.line(CX, ARM - 10, CZ + 1, CX, ARM, CZ + 9, B.wood); w.line(CX + 1, ARM - 10, CZ + 1, CX + 1, ARM, CZ + 9, B.wood);
      w.box(CX, ARM - 1, CZ - 4, CX + 1, ARM, CZ - 3, B.found);
      w.box(CX - 1, ARM, CZ + 10, CX + 2, ARM, CZ + 11, B.iron); w.set(CX, ARM + 3, CZ + 10, B.iron);
      const RX = CX, RZ = CZ + 10, restTop = WL + 14, rLen = ARM - 1 - restTop;
      MH.rope(w, 'crope', RX, ARM - 1, RZ, rLen, B.rope);
      const load = w.prop({ name: 'load', pivot: [RX + 0.5, WL + 2, RZ + 0.5] });
      crate(load, RX - 2, WL + 2, RZ - 2, 5, 9, 5); load.box(RX - 2, WL + 11, RZ - 2, RX + 2, WL + 11, RZ + 2, B.rope); load.set(RX, WL + 12, RZ, B.iron); load.set(RX, WL + 13, RZ, B.iron);
      acts.push({
        name: '창고 기중기', hint: '밧줄이 감기며 거룻배의 짐이 올라가요', hit: [CX - 3, G + 1, CZ - 3, CX + 3, ARM + 2, CZ + 12],
        run: async a => {
          const up = 16;
          await Promise.all([a.move('load', [0, up, 0], 2.6, t => t), a.rope('crope', rLen, rLen - up, 2.6, t => t)]);
          await a.wait(0.9);
          await Promise.all([a.move('load', [0, 0, 0], 2.4, t => t), a.rope('crope', rLen, rLen, 2.4, t => t)]);
        },
      });
      landmarks.push({ name: '창고 부두', note: '기중기로 짐을 내리는 곳', p: [171, whs[1].peak + 12, 134] });
      // 가운데 벽돌 창고 1층 문: 들어가면 하역장·저장층·다락이 있는 창고 안(하위 지도)
      {
        const [dx, , dz] = whs[1].door;
        acts.push({ name: '벽돌 창고 안으로', hint: '기중기 옆 1층 문을 밀고 상자와 술통이 쌓인 벽돌 창고 하역장으로 들어가요', goto: 'canal-warehouse', hit: [dx - 4, G + 1, dz - 1, dx + 3, G + 9, dz + 3],
          run: async a => { for (let k = 0; k < 3; k++) { a.burst([dx, G + 5 + k * 3, dz + 1 + k * 2], { n: 18, colors: ['#ffe9a0', '#ffffff', '#ffd060'], speed: 3, up: 3, life: 1, gravity: -0.6, spread: 2.4 }); await a.wait(0.2); } await a.wait(0.3); } });
        lights.push({ p: [dx - 6.5, G + 10.5, dz + 1.5], c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true }, { p: [dx + 6.5, G + 10.5, dz + 1.5], c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true });
      }
      // 부두 짐: 상자 · 통 · 밧줄 사리(창고 앞)
      crate(w, 113, G + 1, 148, 4); crate(w, 113, G + 1, 152, 4, 3, 4); crate(w, 114, G + 5, 149, 3);
      barrel(w, 206, G + 1, 151); barrel(w, 151, G + 1, 151, 5);
      crate(w, 258, G + 1, 149, 4); barrel(w, 265, G + 1, 151);
      for (let k = 0; k < 12; k++) { const a = k * 0.53; w.set(Math.round(160 + Math.cos(a) * 2.2), G + 1, Math.round(152 + Math.sin(a) * 2.2), B.rope); }

      // ───────── 운하 남쪽의 좁고 높은 집들(계단 박공) ─────────
      const south = [];
      {
        let k = 0;
        for (let x = 8; x < 320; x += 20) {
          if (x + 17 >= 187 && x <= 205) continue;                 // 남쪽 물길
          if ((x <= 64 && x + 17 >= 48) || (x <= 256 && x + 17 >= 240)) continue;   // 아치 다리 끝 골목
          if (x <= 141 && x + 17 >= 128) continue;                // 도개교 끝 골목
          const brick = k % 3 === 2;
          const low = [108, 148, 168, 208].includes(x);
          const h = house({ x, z: 184, sx: 18, sz: 22, floors: low ? 2 : 2 + (k % 2), fh: 12, face: 'n', brick, wall: [B.plaster, B.plasterB, B.plasterY, B.plasterP][k % 4],
            trim: brick ? B.frameW : B.trim, pal: k % 2 ? PAL.r : PAL.s, shutter: brick ? null : SHUT[k % 3], box: k % 3 !== 1, axis: 'z', ov: 1, og: 0, stepped: true, gwin: 'front', winGap: 8,
            door: k % 2 ? [B.doorG, B.doorGd] : null, chimney: k % 2 === 0 });
          south.push(h); k++;
        }
      }
      south.forEach((h, k) => { if (h.lamp && k % 2 === 0) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 18, flicker: 0.1, night: true }); });
      // 도시 블록(뒤쪽 거리) — 원래 지도의 블록 자리를 2배로
      const blk = [];
      blk.push(...row(24, 120, 88, 144, 's', 7, { shut: true, box: true }));
      row(24, 52, 88, 76, 's', 9, { sides: ['s', 'e', 'w'] }); row(120, 52, 320, 76, 's', 11, { sides: ['s', 'e', 'w'] });
      blk.push(...row(256, 120, 320, 144, 's', 17, { shut: true, box: true }));
      row(16, 226, 120, 250, 'n', 13, { shut: true }); row(256, 222, 320, 246, 'n', 15, { shut: true });
      row(16, 282, 116, 306, 'n', 19, { sides: ['n', 'e', 'w'] }); row(276, 282, 324, 306, 'n', 21, { sides: ['n', 'e', 'w'] });
      blk.forEach((h, k) => { if (h.lamp && k % 3 === 0) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 18, flicker: 0.1, night: true }); });

      // ───────── 아치 돌다리: 홍예돌 아치, 난간 동자와 손잡이 돌, 다리 끝 가로등 ─────────
      const archBridge = (cx, za, zb, half, rise, archH) => {   // z축으로 놓인 다리
        const L = zb - za;
        for (let z = za; z <= zb; z++) {
          const t = (z - za) / L, yy = G + Math.round(Math.sin(t * Math.PI) * rise), under = Math.round(Math.sin(t * Math.PI) * archH);
          for (let dx = -half - 1; dx <= half + 1; dx++) {
            const x = cx + dx, edge = Math.abs(dx) === half + 1;
            w.set(x, yy, z, edge ? B.cope : (dx === 0 ? B.pv3 : ((z >> 1) + (dx >> 1)) & 1 ? B.pv1 : B.pv2));
            const bot = Math.max(BED, G - archH - 3 + under);
            for (let y = bot; y < yy; y++) {
              const ring = y >= yy - 3;
              w.set(x, y, z, edge || Math.abs(dx) === half ? (ring && wet(x, z) ? ((z & 1) ? B.st3 : B.st4) : stoneAt(z, y, 21) || B.mortar) : B.mortar);
            }
            // 아치 밑면(물 위는 비운다)
            if (wet(x, z)) for (let y = Math.max(BED + 1, WL + 1); y < bot; y++) w.set(x, y, z, 0);
            if (edge) {
              w.set(x, yy + 1, z, (z % 3) ? B.st1 : B.st2); w.set(x, yy + 2, z, z % 3 === 0 ? B.st2 : 0); w.set(x, yy + 3, z, B.cope);
              if (z % 3 === 1) w.set(x, yy + 2, z, 0);
            }
          }
          // 바닥이 계단처럼 갑자기 오르지 않게: 높이 차가 2칸 넘지 않음(rise는 완만)
        }
        for (const z of [za + 1, zb - 1]) for (const dx of [-half - 1, half + 1]) { w.box(cx + dx, G + 1, z, cx + dx, G + 4, z, B.st2); }
      };
      // 아치 밑을 비워야 하므로 다리 자리의 물막이는 다리가 덮는다
      archBridge(56, CZ0 - 6, CZ1 + 6, 6, 4, 10);
      archBridge(248, CZ0 - 6, CZ1 + 6, 6, 4, 10);
      // 북쪽 물길을 건너는 작은 다리(x축)
      {
        const z0 = 96, xa = 90, xb = 115, half = 4, rise = 3, archH = 8, L = xb - xa;
        for (let x = xa; x <= xb; x++) {
          const t = (x - xa) / L, yy = G + Math.round(Math.sin(t * Math.PI) * rise), under = Math.round(Math.sin(t * Math.PI) * archH);
          for (let dz = -half - 1; dz <= half + 1; dz++) {
            const z = z0 + dz, edge = Math.abs(dz) === half + 1;
            w.set(x, yy, z, edge ? B.cope : ((x >> 1) + (dz >> 1)) & 1 ? B.pv1 : B.pv2);
            const bot = Math.max(BED, G - archH - 3 + under);
            for (let y = bot; y < yy; y++) w.set(x, y, z, edge || Math.abs(dz) === half ? (stoneAt(x, y, 23) || B.mortar) : B.mortar);
            if (wet(x, z)) for (let y = WL + 1; y < bot; y++) w.set(x, y, z, 0);
            if (edge) { w.set(x, yy + 1, z, B.st1); if (x % 3 !== 1) w.set(x, yy + 2, z, B.st2); w.set(x, yy + 3, z, B.cope); }
          }
        }
      }
      for (const bx of [48, 64, 240, 256]) for (const z of [CZ0 - 6, CZ1 + 6]) lights.push({ p: lampPost(bx, z, 10), c: '#ffe0a0', i: 1, d: 20, flicker: 0.05, night: true });
      landmarks.push({ name: '아치 돌다리', note: '흰 돌로 쌓은 운하 다리', p: [56.5, G + 22, 165.5] });

      // ───────── 도개교: 다리탑 넷 사이의 두 상판이 들린다 ─────────
      const DX = 134;
      const tower = (x0, z0, x1, z1, lampZ) => {
        for (let y = G + 1; y <= G + 24; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const ex = x === x0 || x === x1, ez = z === z0 || z === z1;
          if (!ex && !ez) { w.set(x, y, z, B.mortar); continue; }
          const corner = ex && ez;
          w.set(x, y, z, corner ? (((y >> 1) & 1) ? B.st3 : B.st4) : (stoneAt(ex ? z : x, y, 31) || B.mortar));
        }
        for (const fy of [G + 12, G + 24]) w.walls(x0 - 1, fy, z0 - 1, x1 + 1, fy, z1 + 1, B.cope);
        w.walls(x0, G + 1, z0, x1, G + 1, z1, B.cope);
        // 좁은 창(화살 구멍 모양)
        for (const fy of [G + 15]) { const mx = (x0 + x1) >> 1; for (let y = fy; y <= fy + 4; y++) { w.set(mx, y, z0, B.win); w.set(mx, y, z1, B.win); } }
        MH.pyramid(w, x0 - 1, z0 - 1, x1 + 1, z1 + 1, G + 25, B.tB, 1, B.tBd);
        w.set((x0 + x1) >> 1, G + 25 + 4, (z0 + z1) >> 1, B.gold);
        const mx = (x0 + x1) >> 1;
        w.set(mx, G + 16, lampZ, B.iron); w.set(mx, G + 15, lampZ, B.lampG); w.set(mx, G + 14, lampZ, B.lampG); w.set(mx, G + 13, lampZ, B.ironDk);
      };
      for (const x0 of [DX - 12, DX + 8]) { tower(x0, CZ0 - 7, x0 + 5, CZ0 - 1, CZ0 - 8); tower(x0, CZ1 + 1, x0 + 5, CZ1 + 7, CZ1 + 8); }
      // 도르래 쇠줄(탑 꼭대기에서 상판 끝으로)
      lights.push({ p: [DX - 9, G + 15, CZ0 - 9], c: '#ffd890', i: 1, d: 24, flicker: 0.05, night: true });
      lights.push({ p: [DX + 11, G + 15, CZ1 + 9], c: '#ffd890', i: 1, d: 24, flicker: 0.05, night: true });
      const leafN = w.prop({ name: 'leafN', pivot: [DX + 0.5, G, CZ0], axis: 'x' });
      const leafS = w.prop({ name: 'leafS', pivot: [DX + 0.5, G, CZ1 + 1], axis: 'x' });
      const MIDZ = (CZ0 + CZ1 + 1) / 2;
      for (let z = CZ0; z <= CZ1; z++) for (let x = DX - 6; x <= DX + 7; x++) {
        const p = z < MIDZ ? leafN : leafS, ex = x === DX - 6 || x === DX + 7;
        p.set(x, G, z, ex ? B.frameDk : ((x - DX + 6) % 4 === 3 ? B.wood : B.plank));
        p.set(x, G - 1, z, (z % 4 === 0 || ex) ? B.ironDk : B.wood);
        if (ex) { p.set(x, G + 1, z, z % 3 === 0 ? B.iron : 0); p.set(x, G + 3, z, B.iron); if (z % 3 === 0) p.set(x, G + 2, z, B.iron); }
      }
      acts.push({
        name: '도개교', hint: '다리가 들리고 곤돌라가 지나가 남쪽 물길로 빠져나가요', hit: [DX - 6, G - 1, CZ0, DX + 7, G + 4, CZ1],
        run: async a => {
          await Promise.all([a.turn('leafN', [-1.2, 0, 0], 2.4), a.turn('leafS', [1.2, 0, 0], 2.4)]);
          const go = a.drive('gondA', [[36, 0, 0], [72, 0, 0], [108, 0, 0], [115, 0, 5], [116, 0, 24], [116, 0, 76], [116, 0, 184]], 13, { fwd: '+x', back: 1.0 });
          await a.wait(5);
          await Promise.all([go, a.turn('leafN', [0, 0, 0], 2.2), a.turn('leafS', [0, 0, 0], 2.2)]);
        },
      });
      landmarks.push({ name: '도개교', note: '배가 지나갈 때만 들린다', p: [DX + 1, G + 44, 165.5], tag: 'CANAL' });
      // 곤돌라(뱃머리 +x): 검은 선체가 위로 휘고, 뱃머리 쇠장식, 붉은 방석, 노
      const gondola = (name, x, z, phase) => {
        const p = w.prop({ name, pivot: [x + 0.5, WL + 1, z + 2.5], axis: 'x', rock: 0.05, rockSpeed: 0.9, bob: 0.25, bobSpeed: 1.2, phase });
        for (let i = -11; i <= 11; i++) {
          const ai = Math.abs(i), hw = ai > 9 ? 0 : ai > 6 ? 1 : 2, lift = ai > 8 ? ai - 8 : 0;
          for (let dz = -hw; dz <= hw; dz++) {
            const zz = z + 2 + dz, side = Math.abs(dz) === hw || ai >= 8;
            p.set(x + i, WL + lift, zz, side ? B.gond : B.gondIn);
            if (side) p.set(x + i, WL + 1 + lift, zz, B.gond);
          }
        }
        // 뱃머리 쇠장식(빗살), 고물 장식
        p.box(x + 12, WL + 4, z + 2, x + 12, WL + 8, z + 2, B.gold); for (let y = WL + 5; y <= WL + 7; y++) p.set(x + 13, y, z + 2, B.gold);
        p.box(x - 12, WL + 4, z + 2, x - 12, WL + 6, z + 2, B.gold);
        p.box(x - 3, WL + 1, z + 1, x, WL + 1, z + 3, B.cush); p.box(x - 4, WL + 2, z + 1, x - 4, WL + 3, z + 3, B.cush);
        // 펠체(작은 선실): 검은 천 지붕과 금빛 테, 옆창
        for (let i = -5; i <= 1; i++) for (let dz = 0; dz <= 4; dz++) {
          const side = dz === 0 || dz === 4, end = i === -5 || i === 1;
          if (side || end) for (let y = WL + 2; y <= WL + 5; y++) p.set(x + i, y, z + dz, (side && !end && y >= WL + 3 && y <= WL + 4 && i !== -2) ? 0 : (y === WL + 5 ? B.gold : B.gond));
          p.set(x + i, WL + 6, z + dz, side ? B.gond : B.gondIn); if (!side) p.set(x + i, WL + 7, z + dz, B.gond);
        }
        crate(p, x + 3, WL + 1, z + 1, 3, 2, 3);
        p.line(x - 8, WL + 2, z + 1, x - 5, WL + 11, z + 1, B.paddle);
      };
      const GA = [80, 166];
      gondola('gondA', GA[0], GA[1], 0); gondola('gondB', 274, 158, 1.5);
      MH.routeOK(w, [[GA[0], GA[1] + 2.5], [GA[0] + 110, GA[1] + 2.5], [GA[0] + 116, GA[1] + 8], [GA[0] + 116, 335]], 2, '곤돌라 뱃길');

      // ───────── 갑문: 두 문짝이 물길 쪽으로 열린다 ─────────
      const LX = 212;
      for (const z of [CZ0 - 1, CZ1 + 1]) {
        for (let y = BED; y <= G + 8; y++) for (let x = LX - 3; x <= LX + 3; x++) w.set(x, y, z, Math.abs(x - LX) === 3 ? (((y >> 1) & 1) ? B.st3 : B.st4) : (stoneAt(x, y, 41) || B.mortar));
        w.box(LX - 4, G + 9, z, LX + 4, G + 9, z, B.cope); w.box(LX - 3, G + 10, z, LX + 3, G + 10, z, B.trim);
      }
      // 갑문 위 걷는 다리(널판, 손잡이)
      for (let z = CZ0 - 1; z <= CZ1 + 1; z++) { w.set(LX - 3, G + 9, z, B.plank); w.set(LX - 2, G + 9, z, B.plank); w.set(LX - 2, G + 8, z, B.wood); if (z % 3 === 0) w.box(LX - 3, G + 10, z, LX - 3, G + 11, z, B.iron); w.set(LX - 3, G + 12, z, B.wood); }
      // 갑문지기 집(작은 집)과 손잡이 바퀴
      const lockHut = house({ x: LX - 24, z: 136, sx: 15, sz: 12, floors: 1, fh: 12, face: 's', wall: B.plasterB, trim: B.frame, pal: PAL.b, shutter: SHUT[1], box: true, axis: 'x', ov: 2, og: 2, winGap: 9, chimney: true });
      if (lockHut.lamp) lights.push({ p: lockHut.lamp, c: '#ffd890', i: 0.8, d: 16, flicker: 0.1, night: true });
      {
        const z = CZ1 + 5, QX = LX - 6;
        w.box(QX - 1, G + 1, z - 1, QX + 1, G + 2, z + 1, B.sill); w.box(QX, G + 3, z, QX, G + 7, z, B.iron);
        w.ring(QX, z, G + 8, 2.5, 3.5, B.iron); for (const [dx, dz] of [[1, 0], [2, 0], [-1, 0], [-2, 0], [0, 1], [0, 2], [0, -1], [0, -2]]) w.set(QX + dx, G + 8, z + dz, B.ironDk);
        w.set(QX, G + 9, z, B.brass); w.set(QX + 3, G + 9, z, B.wood); w.set(QX + 3, G + 10, z, B.wood);
      }
      const gN = w.prop({ name: 'gateN', pivot: [LX + 0.5, WL, CZ0] });
      const gS = w.prop({ name: 'gateS', pivot: [LX + 0.5, WL, CZ1 + 1] });
      for (let z = CZ0; z <= CZ1; z++) {
        const g = z < MIDZ ? gN : gS;
        for (let y = WL - 4; y <= G; y++) for (const x of [LX, LX + 1]) g.set(x, y, z, (y - base) % 5 === 0 ? B.iron : (z % 5 === 0 ? B.wood : B.plank));
        g.set(LX, G + 1, z, B.wood); g.set(LX + 1, G + 1, z, B.wood);
        for (const x of [LX, LX + 1]) { g.set(x, G + 2, z, z % 3 === 0 || z === CZ0 || z === CZ1 ? B.iron : 0); g.set(x, G + 3, z, B.iron); }
      }
      acts.push({
        name: '갑문', hint: '문짝이 열리며 물살이 쏟아져요', hit: [LX - 1, WL, CZ0, LX + 2, G + 3, CZ1],
        run: async a => {
          await Promise.all([a.turn('gateN', [0, 1.35, 0], 2), a.turn('gateS', [0, -1.35, 0], 2)]);
          for (let q = 0; q < 6; q++) { a.burst([LX + 6, WL + 2, 166], { n: 40, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 12, up: 6, life: 1.2, gravity: 16, spread: 8, flat: true }); a.burst([LX + 4, G + 10, 166], { n: 24, colors: ['#ffffff', '#e0f4ff'], speed: 6, up: 12, life: 1.2, gravity: 18, spread: 6 }); await a.wait(0.4); }
          await Promise.all([a.turn('gateN', [0, 0, 0], 1.8), a.turn('gateS', [0, 0, 0], 1.8)]);
        },
      });
      landmarks.push({ name: '갑문', note: '운하의 물높이를 다루는 문', p: [LX + 0.5, G + 24, 165.5] });

      // ───────── 갈매기 떼(부품): 창고 지붕에 앉아 있다가 운하 위를 맴돌고 북쪽 하늘로 ─────────
      const GC = [192, G + 68, 144], gulls = [];
      [[134, 0.2], [168, 2.3], [234, 4.3]].forEach(([gx, th0], k) => {
        const gz = 133, gy = w.top(gx, gz) + 1, p = w.prop({ name: 'gull' + k, pivot: [gx + 0.5, gy, gz + 0.5] });
        // 몸통(+x가 머리), 날개, 꼬리, 노란 부리, 검은 눈
        p.box(gx - 2, gy, gz, gx + 2, gy + 1, gz, B.swan); p.set(gx + 3, gy + 1, gz, B.swan); p.set(gx + 4, gy + 1, gz, B.beak); p.set(gx + 3, gy + 2, gz, B.swan); p.set(gx + 3, gy + 2, gz + 1, B.eye);
        p.set(gx - 3, gy + 1, gz, B.cygnet); p.set(gx - 4, gy + 1, gz, B.cygnet);
        for (const s of [-1, 1]) { p.box(gx - 1, gy + 1, gz + s, gx + 1, gy + 1, gz + s * 3, B.swan); p.set(gx, gy + 2, gz + s * 4, B.cygnet); p.set(gx - 1, gy + 2, gz + s * 4, B.cygnet); }
        gulls.push({ k, gx, gy, gz, th0 });
      });
      acts.push({
        name: '갈매기 떼', hint: '창고 지붕에 앉아 있던 갈매기들이 날아올라 운하 위를 크게 맴돌다 북쪽 하늘로 날아가요', hit: [130, gulls[0].gy - 2, 126, 174, gulls[0].gy + 4, 140],
        run: async a => {
          a.wind(2, 6);
          await Promise.all(gulls.map(async g => {
            const R = 40, pts = [[0, 8, 0]], s0 = [g.gx + 0.5, g.gy, g.gz + 0.5];
            for (let i = 0; i <= 36; i++) { const t = g.th0 + i / 18 * Math.PI, y = GC[1] - 12 * Math.cos(i / 36 * Math.PI * 2 + g.k); pts.push([GC[0] + R * Math.cos(t) - s0[0], y - s0[1], GC[2] + R * Math.sin(t) - s0[2]]); }
            const L = pts[pts.length - 1];
            pts.push([L[0] - 20, L[1] + 12, L[2] - 80], [L[0] - 40, L[1] + 20, -s0[2] - 60]);
            await a.wait(g.k * 0.4);
            await a.drive('gull' + g.k, pts, 13, { fwd: '+x', back: 1.0 });
          }));
        },
      });

      // ───────── 백조 가족(부품, 머리 -z): 남쪽 물길을 따라 선착장을 지나 남쪽 끝으로 ─────────
      const SWX = 191, SWZ = 208;
      MH.routeOK(w, [[SWX + 1, SWZ], [SWX + 1, SWZ + 12], [SWX - 5, SWZ + 24], [SWX - 5, SWZ + 40], [SWX + 1, SWZ + 56], [SWX + 1, 334]], 3, '백조 물길');
      const swans = w.prop({ name: 'swans', pivot: [SWX + 1, WL, SWZ + 1], bob: 0.2, bobSpeed: 1.5 });
      {
        // 어미: 둥근 몸통, 접은 날개 끝이 위로, S자 목, 주황 부리와 검은 눈(머리는 -z)
        for (let dz = -2; dz <= 4; dz++) for (let dx = -1; dx <= 2; dx++) {
          const e = (dz === -2 || dz === 4) && (dx === -1 || dx === 2);
          if (!e) swans.set(SWX + dx, WL, SWZ + dz, B.swan);
          if (!e && dz > -2) swans.set(SWX + dx, WL + 1, SWZ + dz, B.swan);
          if ((dx === -1 || dx === 2) && dz >= 0 && dz <= 4) swans.set(SWX + dx, WL + 2, SWZ + dz, B.swan);
        }
        swans.set(SWX, WL + 2, SWZ + 5, B.swan); swans.set(SWX + 1, WL + 2, SWZ + 5, B.swan); swans.set(SWX + 1, WL + 3, SWZ + 5, B.swan);
        for (const [y, z] of [[WL + 2, SWZ - 2], [WL + 3, SWZ - 2], [WL + 4, SWZ - 1], [WL + 5, SWZ - 1], [WL + 6, SWZ - 2], [WL + 7, SWZ - 2]]) { swans.set(SWX, y, z, B.swan); swans.set(SWX + 1, y, z, B.swan); }
        swans.set(SWX, WL + 7, SWZ - 3, B.swan); swans.set(SWX + 1, WL + 7, SWZ - 3, B.swan); swans.set(SWX, WL + 7, SWZ - 4, B.beak); swans.set(SWX + 1, WL + 7, SWZ - 4, B.beak); swans.set(SWX, WL + 6, SWZ - 4, B.eye);
        swans.set(SWX - 1, WL + 7, SWZ - 2, B.eye); swans.set(SWX + 2, WL + 7, SWZ - 2, B.eye);
        // 새끼 둘
        for (const [dx, dz] of [[-2, 9], [1, 11]]) { swans.box(SWX + dx, WL, SWZ + dz, SWX + dx + 1, WL, SWZ + dz + 2, B.cygnet); swans.box(SWX + dx, WL + 1, SWZ + dz - 1, SWX + dx + 1, WL + 2, SWZ + dz - 1, B.cygnet); swans.set(SWX + dx, WL + 2, SWZ + dz - 2, B.eye); }
      }
      acts.push({
        name: '백조 가족', hint: '백조 가족이 남쪽 물길을 따라 선착장을 가로질러 남쪽 물길 끝으로 헤엄쳐 가요', hit: [SWX - 4, WL, SWZ - 5, SWX + 5, WL + 8, SWZ + 12],
        run: async a => {
          const rip = async pts => { for (const [x, z] of pts) { a.burst([x, WL + 1, z], { n: 8, colors: ['#e0f4ff', '#ffffff'], speed: 2.4, up: 1, life: 0.8, gravity: 4, spread: 2, flat: true }); await a.wait(0.7); } };
          await Promise.all([
            a.drive('swans', [[0, 0, 12], [-6, 0, 24], [-6, 0, 40], [0, 0, 56], [0, 0, 88], [0, 0, 124]], 14, { fwd: '-z', back: 1.0 }),
            rip([[192, 220], [189, 228], [186, 240], [187, 252], [192, 264], [192, 280], [192, 296], [192, 312]]),
          ]);
        },
      });

      // ───────── 풍등 띄우기(부품): 운하에 등불이 퍼지며 하늘로 ─────────
      const LZ = 159, LXc = 100;
      const lan = w.prop({ name: 'lanterns', pivot: [LXc + 0.5, WL, LZ + 0.5], scl0: [0.001, 0.001, 0.001], bob: 0.2, bobSpeed: 1.1 });
      for (const [dx, dz] of [[-24, 0], [-16, 2], [-8, -1], [0, 1], [8, -1], [16, 2], [24, 0], [-12, 3], [12, 3]]) {
        const x = LXc + dx, z = LZ + dz;
        lan.box(x - 1, WL, z - 1, x + 1, WL, z + 1, B.paddle);
        lan.box(x, WL + 1, z, x, WL + 2, z, B.lantern); lan.set(x, WL + 3, z, B.lantern);
        lan.set(x - 1, WL + 1, z, B.lantern); lan.set(x + 1, WL + 1, z, B.lantern); lan.set(x, WL + 1, z - 1, B.lantern); lan.set(x, WL + 1, z + 1, B.lantern);
      }
      lights.push({ name: 'lanterns', p: [LXc + 0.5, WL + 4, LZ + 2.5], c: '#ffb860', i: 1.2, d: 40, flicker: 0.2, srcR: 12 });
      acts.push({
        name: '풍등 띄우기', hint: '운하 위에 등불이 하나둘 켜지더니 지붕 너머 하늘로 두둥실 떠올라요', hit: [LXc - 25, WL, LZ - 2, LXc + 25, WL + 4, LZ + 4],
        run: async a => {
          a.flash('lanterns', 3, 9); a.glow(1.6, 9);
          await a.tween('lanterns', { scl: [1, 1, 1] }, 1.6);
          const glimmer = async () => { for (let k = 0; k < 3; k++) { a.burst([LXc + 0.5 + (k % 5 - 2) * 10 + k * 1.2, WL + 4, LZ + 2 + (k % 3) * 2], { n: 8, colors: ['#ffd890', '#fff0c0'], speed: 1.2, up: 4, life: 1.4, gravity: -0.8, spread: 1.6 }); await a.wait(0.5); } };
          await Promise.all([a.move('lanterns', [8, 0, 0], 1.6, t => t), glimmer()]);
          await a.move('lanterns', [20, 60, -8], 6, t => t * t);
          await a.tween('lanterns', { scl: [0.001, 0.001, 0.001] }, 1.2);
          await a.move('lanterns', [0, 0, 0], 0.05);
        },
      });

      // ───────── 창고 하역문(부품): 세 창고의 2층 문이 차례로 열린다 ─────────
      const doors = [];
      whs.forEach((h, k) => {
        const cu = h.cu, dz = h.z1 + 1, y0 = G + 20;
        const L = w.prop({ name: 'whL' + k, pivot: [cu - 3, y0, dz + 0.5] }), R = w.prop({ name: 'whR' + k, pivot: [cu + 3, y0, dz + 0.5] });
        for (let y = y0; y < y0 + 10; y++) {
          for (let x = cu - 3; x <= cu - 1; x++) L.set(x, y, dz, x === cu - 1 || (y - y0) % 9 === 0 ? B.frameDk : (y - y0) % 3 === 1 ? B.door : B.plank);
          for (let x = cu; x <= cu + 2; x++) R.set(x, y, dz, x === cu || (y - y0) % 9 === 0 ? B.frameDk : (y - y0) % 3 === 1 ? B.door : B.plank);
        }
        for (const y of [y0 + 2, y0 + 7]) { L.set(cu - 3, y, dz, B.iron); L.set(cu - 2, y, dz, B.iron); R.set(cu + 1, y, dz, B.iron); R.set(cu + 2, y, dz, B.iron); }
        L.set(cu - 1, y0 + 5, dz + 0, B.brass); R.set(cu, y0 + 5, dz, B.brass);
        doors.push([cu, k, dz]);
      });
      acts.push({
        name: '창고 하역문', hint: '세 창고의 하역문이 차례로 열리고 먼지와 비둘기가 쏟아져 나와요', hit: [whs[0].cu - 4, G + 19, whs[0].z1 - 1, whs[1].cu + 4, G + 30, whs[0].z1 + 2],
        run: async a => {
          for (const [cu, k, dz] of doors) { a.turn('whL' + k, [0, -1.5, 0], 1); a.turn('whR' + k, [0, 1.5, 0], 1); await a.wait(0.5); a.burst([cu, G + 25, dz + 3], { n: 18, colors: ['#e8e8f0', '#9a9aa8', '#c8b8a0'], speed: 10, up: 8, life: 1.8, gravity: -0.8, spread: 4 }); }
          await a.wait(2.2);
          await Promise.all(doors.flatMap(([, k]) => [a.turn('whL' + k, [0, 0, 0], 1.2), a.turn('whR' + k, [0, 0, 0], 1.2)]));
        },
      });

      // ───────── 물레방아(부품): 북쪽 물길 서쪽 둑 ─────────
      const MWZ = 132, MWY = G + 2, MWX = 98;
      for (let y = BED; y <= MWY - 2; y++) for (let z = MWZ - 2; z <= MWZ + 2; z++) for (let x = 90; x <= 95; x++) w.set(x, y, z, stoneAt(z, y, 51) || B.mortar);
      w.box(90, MWY - 1, MWZ - 2, 95, MWY - 1, MWZ + 2, B.cope);
      w.box(89, MWY, MWZ - 1, 93, MWY + 1, MWZ + 1, B.wood); w.box(91, MWY - 1 + 1, MWZ - 2, 92, MWY + 2, MWZ + 2, B.iron);
      const wheel = w.prop({ name: 'wheel', pivot: [MWX + 0.5, MWY + 0.5, MWZ + 0.5], axis: 'x', speed: 0.5 });
      for (let v = -11; v <= 11; v++) for (let u = -11; u <= 11; u++) {
        const d = Math.hypot(u, v), ang = Math.atan2(v, u);
        if (d > 10.8) continue;
        const a8 = Math.round(ang / (Math.PI / 4)) * (Math.PI / 4), a16 = Math.round(ang / (Math.PI / 8)) * (Math.PI / 8);
        const rim = d > 9, spoke = d < 9.2 && d > 1.4 && Math.abs(Math.sin(ang - a8)) * d < 0.75;
        const hubR = d <= 1.6;
        for (const x of [MWX - 2, MWX - 1, MWX + 2, MWX + 3]) {
          const outer = x === MWX - 2 || x === MWX + 3;
          if (rim && (outer ? d > 9.8 : d > 9 && d <= 10)) wheel.set(x, MWY + v, MWZ + u, d > 10 ? B.iron : B.wood);
          else if (spoke && !outer) wheel.set(x, MWY + v, MWZ + u, B.wood);
          else if (hubR) wheel.set(x, MWY + v, MWZ + u, B.ironDk);
        }
        // 물받이판: 테 바깥 칸마다 가로로
        if (d > 9.6 && d <= 10.8 && Math.abs(Math.sin(ang - a16)) * d < 0.8) for (let x = MWX - 2; x <= MWX + 3; x++) wheel.set(x, MWY + v, MWZ + u, B.paddle);
      }
      wheel.box(MWX - 4, MWY, MWZ, MWX + 4, MWY + 1, MWZ + 1, B.iron);
      acts.push({
        name: '물레방아', hint: '물레방아가 빠르게 돌며 물보라를 튀겨요', hit: [MWX - 2, MWY - 11, MWZ - 11, MWX + 3, MWY + 11, MWZ + 11],
        run: async a => {
          const spray = async () => { for (let k = 0; k < 10; k++) { a.burst([MWX + 0.5, MWY + 8, MWZ + 8], { n: 16, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 6, up: 6, life: 1, gravity: 18, spread: 3 }); a.burst([MWX + 0.5, WL + 1, MWZ - 6], { n: 12, colors: ['#e0f4ff', '#ffffff'], speed: 6, up: 2, life: 0.8, gravity: 12, spread: 4, flat: true }); await a.wait(0.4); } };
          await Promise.all([a.spin('wheel', 6, 4), spray()]);
        },
      });

      // ══ 남쪽 수상 시장 선착장 ══
      // 광장(선착장 남쪽): 큰 판석 바둑무늬
      for (let z = 274; z <= 321; z++) for (let x = 120; x <= 273; x++) if (!wet(x, z) && MH.g(w, x, z) === G && !w.get(x, G + 1, z)) { const near = wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1) || wet(x, z - 1); if (!near) w.set(x, G, z, ((x >> 3) + (z >> 3)) & 1 ? (((x & 3) === 3 || (z & 3) === 3) ? B.pvJ : B.sq1) : (((x & 3) === 3 || (z & 3) === 3) ? B.pvJ : B.sq2)); }
      // 노점: 기둥, 진열대 위 과일 상자, 줄무늬 차양과 물결 테두리
      const stall = (x, z, a1, goods) => {
        const sx = 12, sz = 10, y = G + 1;
        for (const [px, pz] of [[x, z], [x + sx - 1, z], [x, z + sz - 1], [x + sx - 1, z + sz - 1]]) w.box(px, y, pz, px, y + 9, pz, B.wood);
        w.box(x + 1, y, z + sz - 3, x + sx - 2, y + 3, z + sz - 2, B.plank); w.box(x, y + 4, z + sz - 3, x + sx - 1, y + 4, z + sz - 1, B.wood);
        for (let i = 0; i < 4; i++) { const cx = x + 1 + i * 3; w.box(cx, y + 5, z + sz - 3, cx + 1, y + 5, z + sz - 2, B.crate); for (let dx = 0; dx < 2; dx++) for (let dz = 0; dz < 2; dz++) w.set(cx + dx, y + 6, z + sz - 3 + dz, goods[(i + dx + dz) % goods.length]); }
        crate(w, x + 2, y, z + 1, 3); crate(w, x + 6, y, z + 1, 3, 2, 3); barrel(w, x + 10, y, z + 3, 5);
        for (let dz = -1; dz <= sz; dz++) for (let dx = -1; dx <= sx; dx++) {
          const yy = y + 10 + Math.round((sz - dz) * 0.25);
          w.set(x + dx, yy, z + dz, ((dx + 4) >> 1) & 1 ? a1 : B.clothW);
          if (dz === sz && ((dx + 4) >> 1) & 1) { w.set(x + dx, yy - 1, z + dz, a1); if (dx & 1) w.set(x + dx, yy - 2, z + dz, a1); }
        }
      };
      const sg = [[B.apple, B.orange], [B.melon, B.apple], [B.flowerR, B.flowerY, B.flowerW]];
      [[132, 284], [152, 284], [216, 284], [236, 284], [256, 284]].forEach(([sx, sz], k) => stall(sx, sz, k % 2 ? B.clothB : B.clothR, sg[k % 3]));
      // 화단: 돌 테두리 안에 생울타리와 꽃
      for (const [hx, hz] of [[128, 308], [168, 308], [224, 308], [264, 308]]) {
        w.box(hx, G + 1, hz, hx + 17, G + 2, hz + 5, B.sill); w.box(hx + 1, G + 2, hz + 1, hx + 16, G + 2, hz + 4, B.soil);
        for (let x = hx + 1; x <= hx + 16; x++) for (let z = hz + 1; z <= hz + 4; z++) { if (x % 6 < 3) { w.set(x, G + 3, z, B.hedge); w.set(x, G + 4, z, B.hedge); } else if ((x + z) % 2) { w.set(x, G + 3, z, B.flowerStem); w.set(x, G + 4, z, FLW[(x * 3 + z) % 5]); } }
      }
      // 뱃사공 쉼터: 기둥 정자와 긴 의자
      const PX0 = 128, PX1 = 150, PZ0 = 226, PZ1 = 246;
      w.box(PX0, G + 1, PZ0, PX1, G + 2, PZ1, B.sill); w.box(PX0 + 1, G + 2, PZ0 + 1, PX1 - 1, G + 2, PZ1 - 1, B.plank);
      for (const x of [PX0 + 1, PX1 - 1]) for (const z of [PZ0 + 1, PZ1 - 1, Math.floor((PZ0 + PZ1) / 2)]) { w.box(x - 1, G + 3, z - 1, x, G + 4, z, B.st2); w.box(x - 1, G + 5, z - 1, x, G + 19, z, B.wood); w.box(x - 1, G + 19, z - 1, x, G + 19, z, B.frameDk); }
      w.walls(PX0, G + 20, PZ0, PX1, G + 21, PZ1, B.frame);
      roof(PX0 + 1, PX1 - 1, PZ0 + 1, PZ1 - 1, G + 22, { axis: 'z', pal: PAL.r, gable: B.frame, ov: 3, og: 2, gwin: false, gutter: false });
      for (const z of [PZ0 + 4, PZ1 - 4]) { w.box(PX0 + 4, G + 5, z, PX1 - 4, G + 5, z + 1, B.plank); for (const x of [PX0 + 4, PX1 - 4, (PX0 + PX1) >> 1]) w.box(x, G + 3, z, x, G + 4, z + 1, B.wood); w.box(PX0 + 4, G + 6, z + (z < 236 ? -1 : 2), PX1 - 4, G + 8, z + (z < 236 ? -1 : 2), B.plank); }
      w.box(PX0 + 8, G + 3, PZ0 + 8, PX0 + 13, G + 5, PZ0 + 12, B.wood); w.box(PX0 + 7, G + 6, PZ0 + 7, PX0 + 14, G + 6, PZ0 + 13, B.plank); w.set(PX0 + 10, G + 7, PZ0 + 10, B.lampG); w.set(PX0 + 10, G + 8, PZ0 + 10, B.iron);
      for (const z of [PZ0 + 2, PZ1 - 2]) w.box(PX1, G + 3, z, PX1, G + 6, z, B.rope);
      lights.push({ p: [PX0 + 10.5, G + 8, PZ0 + 10.5], c: '#ffd890', i: 1, d: 26, flicker: 0.1, night: true });
      landmarks.push({ name: '뱃사공 쉼터', note: '노를 쉬는 정자', p: [PX0 + 12, G + 44, PZ0 + 10] });
      // 정박한 장배 셋: 과일 · 꽃 · 상자를 싣고 줄무늬 차양 (뱃머리 +x)
      const marketBoat = (p, x, z, goods, a1) => {
        for (let i = -8; i <= 8; i++) {
          const ai = Math.abs(i), hw = ai >= 8 ? 1 : 2;
          for (let dz = 2 - hw; dz <= 2 + hw; dz++) {
            const side = Math.abs(dz - 2) === hw || ai === 8;
            p.set(x + i, WL, z + dz, B.hullDk);
            p.set(x + i, WL + 1, z + dz, side ? B.hull : B.plank);
            if (side) { p.set(x + i, WL + 2, z + dz, B.hull); p.set(x + i, WL + 3, z + dz, B.wood); }
          }
        }
        p.box(x + 9, WL + 1, z + 2, x + 9, WL + 4, z + 2, B.hull); p.set(x + 10, WL + 4, z + 2, B.hull); p.set(x + 10, WL + 5, z + 2, B.gold);
        p.box(x - 9, WL + 1, z + 2, x - 9, WL + 3, z + 2, B.hull);
        for (let i = -6; i <= 5; i++) for (let dz = 1; dz <= 3; dz++) { p.set(x + i, WL + 2, z + dz, (i + 6) % 4 === 3 ? B.crate : goods[((i + 6) + dz) % goods.length]); if ((i + dz) % 3 === 0) p.set(x + i, WL + 3, z + dz, goods[(i + 7) % goods.length]); }
        for (const i of [-6, 5]) for (const dz of [0, 4]) p.box(x + i, WL + 2, z + dz, x + i, WL + 9, z + dz, B.wood);
        for (let i = -7; i <= 6; i++) for (let dz = -1; dz <= 5; dz++) p.set(x + i, WL + 10 - (Math.abs(dz - 2) === 3 ? 1 : 0), z + dz, ((i + 8) >> 1) & 1 ? a1 : B.clothW);
      };
      marketBoat(w, 172, 230, [B.melon, B.apple, B.melon], B.clothB);
      marketBoat(w, 224, 252, [B.flowerR, B.flowerY, B.flowerW], B.clothR);
      marketBoat(w, 226, 232, [B.crate, B.orange, B.apple], B.clothB);
      const mb = w.prop({ name: 'mboat', pivot: [176.5, WL + 1, 253.5], axis: 'x', rock: 0.04, rockSpeed: 0.8, bob: 0.25, bobSpeed: 1.1 });
      marketBoat(mb, 176, 251, [B.apple, B.orange, B.apple], B.clothR);
      MH.routeOK(w, [[176.5, 253.5], [194.5, 257.5], [194.5, 334]], 3, '장배 뱃길');
      acts.push({
        name: '수상 시장 배', hint: '과일을 가득 실은 장배가 선착장을 떠나 남쪽 물길로 노 저어 나가요', hit: [166, WL, 249, 187, WL + 10, 257],
        run: async a => {
          const wake = async () => { for (const [x, z] of [[180, 253], [188, 254], [195, 262], [195, 274], [195, 286], [195, 298], [195, 310]]) { a.burst([x, WL + 1, z], { n: 10, colors: ['#e0f4ff', '#ffffff'], speed: 3, up: 1, life: 0.9, gravity: 4, spread: 2, flat: true }); await a.wait(0.9); } };
          await Promise.all([a.drive('mboat', [[10, 0, 0], [18, 0, 4], [18, 0, 24], [18, 0, 60], [18, 0, 100]], 9, { fwd: '+x', back: 1.0 }), wake()]);
        },
      });
      landmarks.push({ name: '수상 시장', note: '배 위에 서는 아침 장', p: [200, G + 32, 242], tag: 'MARKET' });
      // 선착장 등탑: 잔교 끝의 붉은 띠 등탑(부품: 도는 등갓)
      for (let z = 248; z <= 267; z++) for (let x = 205; x <= 211; x++) {
        if (MH.g(w, x, z) === G && !wet(x, z)) continue;
        const edge = x === 205 || x === 211;
        w.set(x, G, z, edge ? B.frameDk : B.plank); w.set(x, G - 1, z, B.wood);
        if ((z % 6 === 0) && edge) w.box(x, BED, z, x, G + 3, z, B.wood);
        if (edge && z % 6 !== 0) w.set(x, G + 3, z, B.rope);
      }
      const TX = 208, TZ = 242, ty0 = G;
      w.cyl(TX, TZ, BED, ty0, 5.2, B.found); w.ring(TX, TZ, ty0, 4.2, 5.2, B.cope);
      for (let y = ty0 + 1; y <= ty0 + 32; y++) w.cyl(TX, TZ, y, y, 3.8, Math.floor((y - ty0 - 1) / 8) % 2 ? B.redBand : B.white);
      w.cyl(TX, TZ, ty0 + 33, ty0 + 34, 5.4, B.whiteDk); w.ring(TX, TZ, ty0 + 35, 4.4, 5.4, B.iron); w.ring(TX, TZ, ty0 + 36, 4.4, 5.4, B.iron);
      for (const yy of [ty0 + 10, ty0 + 22]) for (let y = yy; y <= yy + 3; y++) { w.set(TX, y, TZ + 3, B.win); w.set(TX - 1, y, TZ + 3, B.win); w.set(TX, y, TZ + 4, 0); w.set(TX - 1, y, TZ + 4, 0); }
      for (let y = ty0 + 1; y <= ty0 + 8; y++) for (const x of [TX - 1, TX, TX + 1]) w.set(x, y, TZ + 3, x === TX + 1 && y === ty0 + 4 ? B.brass : B.door);
      for (const x of [TX - 2, TX + 2]) w.box(x, ty0 + 1, TZ + 3, x, ty0 + 9, TZ + 3, B.trim);
      w.box(TX - 2, ty0 + 9, TZ + 3, TX + 2, ty0 + 9, TZ + 3, B.trim);
      w.box(TX - 1, ty0 + 36, TZ - 1, TX + 1, ty0 + 40, TZ + 1, B.beacon);
      for (const [dx, dz] of [[2, 2], [-2, 2], [2, -2], [-2, -2]]) w.box(TX + dx, ty0 + 36, TZ + dz, TX + dx, ty0 + 42, TZ + dz, B.iron);
      w.cyl(TX, TZ, ty0 + 43, ty0 + 43, 3.6, B.tR); w.cyl(TX, TZ, ty0 + 44, ty0 + 44, 2.4, B.tR); w.cyl(TX, TZ, ty0 + 45, ty0 + 45, 1.2, B.tR2); w.set(TX, ty0 + 46, TZ, B.gold); w.set(TX, ty0 + 47, TZ, B.gold);
      const lamp = w.prop({ name: 'beam', pivot: [TX + 0.5, ty0 + 38, TZ + 0.5], speed: 0.4 });
      lamp.box(TX - 3, ty0 + 37, TZ - 1, TX - 3, ty0 + 40, TZ + 1, B.gold); lamp.box(TX + 3, ty0 + 37, TZ - 1, TX + 3, ty0 + 40, TZ + 1, B.iron);
      lights.push({ name: 'beacon', p: [TX + 0.5, ty0 + 38, TZ + 0.5], c: '#fff0b0', i: 1.6, d: 68, flicker: 0.05 });
      acts.push({
        name: '선착장 등탑', hint: '등탑의 등갓이 빙글빙글 돌며 선착장 위로 밝은 빛을 비춰요', hit: [TX - 4, ty0 + 33, TZ - 4, TX + 4, ty0 + 44, TZ + 4],
        run: async a => {
          a.flash('beacon', 4, 4.5);
          const glints = async () => { for (let k = 0; k < 8; k++) { const t = k * 0.8; a.burst([TX + 0.5 + Math.cos(t) * 12, ty0 + 38, TZ + 0.5 + Math.sin(t) * 12], { n: 12, colors: ['#fff0b0', '#ffffff'], speed: 2, up: 1, life: 0.8, gravity: 0, spread: 2 }); await a.wait(0.5); } };
          await Promise.all([a.spin('beam', 12, 4.5), glints()]);
        },
      });
      landmarks.push({ name: '선착장 등탑', note: '붉은 띠 등탑', p: [TX + 0.5, ty0 + 60, TZ + 0.5] });
      // 물고기 뛰기(부품): 선착장 물속에서 물고기들이 연달아 뛰어오른다(머리 +x)
      const fishes = [[166, 244, B.fishS], [182, 240, B.fishG], [216, 226, B.fishS], [224, 242, B.fishG]];
      fishes.forEach(([fx, fz, b], k) => {
        const p = w.prop({ name: 'fish' + k, pivot: [fx + 0.5, WL, fz + 0.5], scl0: [0.001, 0.001, 0.001] });
        p.box(fx - 2, WL, fz, fx + 1, WL + 1, fz, b); p.set(fx + 2, WL, fz, b); p.set(fx + 1, WL + 1, fz, B.eye);
        p.set(fx - 3, WL, fz, b); p.set(fx - 4, WL - 1, fz, b); p.set(fx - 4, WL + 2, fz, b); p.set(fx - 1, WL + 2, fz, b);
      });
      acts.push({
        name: '물고기 뛰기', hint: '선착장 물속에서 은빛 · 금빛 물고기가 차례로 펄쩍 뛰어올라요', hit: [162, WL, 222, 230, WL + 12, 248],
        run: async a => {
          for (let r = 0; r < 2; r++) for (const [k, [fx, fz]] of fishes.entries()) {
            a.burst([fx + 0.5, WL + 1, fz + 0.5], { n: 16, colors: ['#e0f4ff', '#ffffff', '#8ac0f0'], speed: 4, up: 6, life: 0.8, gravity: 18, spread: 1.2 });
            a.tween('fish' + k, { scl: [1, 1, 1] }, 0.05);
            await a.tween('fish' + k, { off: [4, 16, 0], rot: [0, 0, 0.6] }, 0.45);
            await a.tween('fish' + k, { off: [8, 0, 0], rot: [0, 0, -0.6] }, 0.45);
            a.burst([fx + 8.5, WL + 1, fz + 0.5], { n: 14, colors: ['#e0f4ff', '#ffffff'], speed: 4, up: 4, life: 0.7, gravity: 18, spread: 1.2 });
            await a.tween('fish' + k, { scl: [0.001, 0.001, 0.001], off: [0, 0, 0], rot: [0, 0, 0] }, 0.05);
          }
        },
      });

      // ───────── 가로수와 가로등 ─────────
      for (let x = 30; x < 330; x += 28) {
        const z = CZ0 - 6;
        if (Math.abs(x - 56) < 12 || Math.abs(x - 248) < 12 || Math.abs(x - DX) < 18 || Math.abs(x - LX) < 10 || Math.abs(x - CX) < 10 || (x >= 90 && x <= 116) || whs.some(h => Math.abs(x - h.cu) < 9)) continue;
        if (w.get(x, G + 1, z) || w.get(x, G + 3, z)) continue;
        tree(x, G + 1, z, { h: 13, r: 5, branches: 4 });
      }
      for (const [x, z] of [[160, 300], [232, 300], [180, 276], [212, 276]]) if (!w.get(x, G + 1, z)) tree(x, G + 1, z, { h: 12, r: 5, branches: 4 });
      for (const [lx, lz] of [[80, CZ0 - 4], [116, CZ1 + 4], [152, CZ1 + 4], [200, CZ0 - 4], [236, CZ1 + 4], [92, 84], [160, 264], [244, 224], [300, CZ0 - 4], [24, CZ1 + 4]]) if (!wet(lx, lz) && !w.get(lx, G + 1, lz)) lights.push({ p: lampPost(lx, lz, 10), c: '#ffe0a0', i: 1, d: 22, flicker: 0.05, night: true });
      return { lights, landmarks, acts };
    },
  }));
})();
