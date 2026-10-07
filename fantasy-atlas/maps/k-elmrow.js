// 주택가 — 언덕을 오르는 계단식 골목, 앞마당 꽃밭, 빨랫줄, 느릅나무 쉼터, 꼭대기 예배당, 동쪽 빵집 마당 (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 낱돌 기초와 옹벽(줄눈), 두께 있는 들보, 창틀·창살·창턱·덧문·경첩·꽃상자, 판자문과 놋 손잡이, 겹 기와·처마·용마루·물받이·홈통,
// 벽돌 굴뚝, 버팀벽과 뾰족 창·장미창이 있는 예배당, 열린 종루와 첨탑, 둥근 돌 화덕, 가지와 잎뭉치가 있는 느릅나무, 낱낱의 꽃.
// playerScale 2 (사람 키 6.8칸). 빵집은 남쪽(카메라 쪽)으로 문과 진열대를 내어 기본 시점에서 잘 보이게 했다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  const { KP } = window.KINGDOM;
  MAPS.push({
    id: 'elmrow', cat: 'kingdom', name: '주택가', en: 'Elm Row', color: '#d8b08a', seed: 213, base: 40, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '성벽 안쪽 언덕을 따라 층층이 들어선 주택가. 집집마다 작은 앞마당 꽃밭을 가꾸고, 해 질 녘이면 골목마다 창문에 불이 켜진다. 언덕 동쪽 빵집 마당에서는 아침마다 화덕 빵 냄새가 골목을 타고 오른다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 서쪽 언덕'], ['명물', '느릅나무 쉼터 · 작은 예배당'], ['빵집 마당', '돌 화덕 · 두레박 우물'], ['소문', '예배당 종지기는 밤마다 지붕 위를 걷는다']] },
    sky: ['#f8c088', '#5a4a8a', '#ffd8a0'], stars: false,
    hemi: ['#ffe0c8', '#3a3040', 0.54], sun: ['#ffb880', 0.74, [0.7, 0.6, 0.45]],
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
    fog: { start: 0.8, floor: 20, depth: 20, haze: [44, 0.14, 12], hazeColor: '#e8b890' },
    camY: 0, zoom: 1.05,
    particles: [
      { n: 22, colors: ['#3a3040', '#6a5a70'], mode: 'wisp', speed: 2, size: 2, y0: 140, glow: false },
      { n: 160, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.5, y0: 48, y1: 180, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      grass3: { c: '#6a4a30', top: '#5e9a42', v: 0.08 },
      clothR: { c: '#d86a6a', v: 0.02 }, clothB: { c: '#7aa8d8', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothY: { c: '#f0d870', v: 0.02 },
      veg: { c: '#5aa040', v: 0.09 }, veg2: { c: '#8ac860', v: 0.08 }, soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, bench: { c: '#7a5a3a', v: 0.05, pat: 'plank' }, bell: { c: '#c8a050', v: 0.05 },
      pump: { c: '#3a5a4a', v: 0.04 }, waterB: { c: '#5aa0d8', v: 0.03 },
      picket: { c: '#f0ece0', v: 0.03 }, flowerP: { c: '#d870b0', v: 0.05 }, flowerB: { c: '#6a8ae0', v: 0.05 }, flowerO: { c: '#f08a4a', v: 0.05 },
      flowerStem: { c: '#4a8a34', v: 0.08 }, flowerLf: { c: '#5e9e44', v: 0.08 }, leafLt: { c: '#8ac25a', v: 0.08 }, barkDk: { c: '#463020', v: 0.05 },
      clay: { c: '#c8784a', v: 0.06, pat: 'brick' }, clayDk: { c: '#8a4a30', v: 0.05 }, fire: { c: '#ff8a3a', glow: true }, ember: { c: '#ffc860', glow: true }, loaf: { c: '#d8984a', v: 0.06 }, crust: { c: '#a8642a', v: 0.05 }, bun: { c: '#e8b060', v: 0.05 },
      cat: { c: '#e8902a', v: 0.04 }, catW: { c: '#f8f0e0', v: 0.02 }, catE: { c: '#3a5a2a', v: 0.02 }, cloth: { c: '#e8e0d0', v: 0.03 },
      // 2배 해상도 세부용
      st1: { c: '#a8a49c', v: 0.05 }, st2: { c: '#96928a', v: 0.05 }, st3: { c: '#b4b0a6', v: 0.05 }, st4: { c: '#9c9a90', v: 0.05 }, mortar: { c: '#c4beb2', v: 0.04 }, sill: { c: '#c8c4bc', v: 0.04 },
      paveA: { c: '#8a8680', top: '#a8a49c', v: 0.05 }, paveB: { c: '#8a8680', top: '#9a968e', v: 0.05 }, paveC: { c: '#8a8680', top: '#b2aea4', v: 0.05 }, paveJ: { c: '#6a665e', top: '#7a766e', v: 0.04 },
      frameDk: { c: '#46301e', v: 0.04 }, mullion: { c: '#ece4d0', v: 0.02 }, doorDk: { c: '#33261a', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 }, hinge: { c: '#2e2e34', v: 0.02 },
      ironDk: { c: '#33333a', v: 0.03 }, gutter: { c: '#6a6e72', v: 0.03 }, brick: { c: '#9a4a3a', v: 0.05, pat: 'brick' }, brick2: { c: '#84402f', v: 0.05, pat: 'brick' }, pot: { c: '#b8643a', v: 0.04 },
      shutGd: { c: '#2c563a', v: 0.03 }, shutBd: { c: '#2c4a74', v: 0.03 }, shutRd: { c: '#702c1e', v: 0.03 },
      tileR: { c: '#b04a3a', v: 0.05 }, tileR2: { c: '#94382c', v: 0.04 }, tileR3: { c: '#bc5846', v: 0.05 }, tileRd: { c: '#7a3028', v: 0.05 },
      tileB: { c: '#2e5aa8', v: 0.05 }, tileB2: { c: '#244a8c', v: 0.04 }, tileB3: { c: '#3a6ab8', v: 0.05 }, tileBd: { c: '#1c3466', v: 0.05 },
      tileN: { c: '#7a4a30', v: 0.05 }, tileN2: { c: '#683e28', v: 0.04 }, tileN3: { c: '#8a5638', v: 0.05 }, tileNd: { c: '#4e3020', v: 0.05 },
      tileG: { c: '#3a6a4a', v: 0.05 }, tileG2: { c: '#30583e', v: 0.04 }, tileG3: { c: '#467a56', v: 0.05 }, tileGd: { c: '#244232', v: 0.05 },
      lamp: { c: '#ffe6a8', night: true, day: '#e8e0c0' }, glassW: { c: '#cfe0f4', v: 0.02 },
      roseR: { c: '#e04a5a', glow: true }, roseB: { c: '#4a7ae0', glow: true }, roseY: { c: '#f0d060', glow: true }, lead: { c: '#3a3a44', v: 0.02 },
      sack: { c: '#e8dcc0', v: 0.04 }, sack2: { c: '#d8cab0', v: 0.04 }, logEnd: { c: '#c8a070', v: 0.04 }, awnR: { c: '#c84a3a', v: 0.02 }, awnW: { c: '#f4eee0', v: 0.02 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 }, check: { c: '#c03a3a', v: 0.02, pat: 'check', alt: '#f4f0e8' },
    }),
    build(w) {
      const B = w.id, n = w.noise, base = w.base, BAND = 64, STEP = 14;
      const lvl = z => base + (4 - Math.min(4, Math.floor(z / BAND))) * STEP;
      const STAIRS = [76, 176, 256], SW = 12;
      const onStair = x => STAIRS.some(s => x >= s - 1 && x <= s + SW);
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const lights = [], acts = [], landmarks = [];

      // ───────── 공통 도구(2배 해상도용, 물레방아 마을에서 옮겨 와 손봄) ─────────
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.paveJ;
        return [B.paveA, B.paveB, B.paveC][(hash3(Math.floor((x + off) / 4), row, 7) * 3) | 0];
      };
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); }, get: (x, y, z) => p.get(x, y, z) });
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      const clump = (T, cx, cy, cz, r, L) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.94 && d > 0.45) b = B.leafLt;
          T.set(x, y, z, b);
        }
      };
      const tree = (x, y, z, o) => {
        const h = o.h, R0 = o.trunkR || 1.8, bark = B.bark, dk = B.barkDk, L = o.leaves || [B.leaf2, B.leaf, B.leafDk];
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.55 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, streak ? dk : bark);
          }
        }
        for (let k = 0; k < 6; k++) {
          const a = k * 1.047 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 3;
          w.line(x, y + 2, z, x + Math.cos(a) * l, y, z + Math.sin(a) * l, dk, t => t < 0.5 ? 1.2 : 0.7);
        }
        const nB = o.branches || 5, r = o.r || 7, ends = [[x, y + h + 1, z, 1.15]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * w.r(0.45, 0.7);
          w.line(x, sy, z, ex, ey, ez, bark, t => t < 0.45 ? 1.2 : 0.7);
          const a2 = a + w.r(0.5, 1) * (i % 2 ? 1 : -1), mx = x + Math.cos(a) * l * 0.55, mz = z + Math.sin(a) * l * 0.55, my = sy + l * 0.3;
          w.line(mx, my, mz, mx + Math.cos(a2) * 4.5, my + 3, mz + Math.sin(a2) * 4.5, bark);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(w, ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 3; q++) {
            const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75;
            clump(w, ex + Math.cos(a) * dd, ey + 1 + (q - 1) * rc * 0.3, ez + Math.sin(a) * dd, rc * 0.62, L);
          }
        });
        return { top: y + h + r * 0.8 };
      };
      const sack = (T, x, y, z) => {
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = (dx !== 1 && dz !== 1);
          if (!corner) T.set(x + dx, y, z + dz, B.sack);
          T.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sack : B.sack2);
          if (!corner) T.set(x + dx, y + 2, z + dz, B.sack);
        }
        T.set(x + 1, y + 3, z + 1, B.rope); T.set(x + 1, y + 4, z + 1, B.sack2);
      };
      const barrel = (T, x, y, z, ht) => {
        ht = ht || 7;
        for (let r = 0; r < ht; r++) {
          const rr = r >= 2 && r <= ht - 3 ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            T.set(x + dx, y + r, z + dz, r === ht - 1 ? (outer ? B.cask : B.caskTop) : (r === 1 || r === ht - 2) && outer ? B.iron : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2));
          }
        }
      };
      const lampPost = (x, z, h) => {
        h = h || 10;
        const y = g(x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.sill);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.ironDk); w.set(x, ly + 7, z, B.brass);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const bench = (x, z, alongX, back) => {
        const y = g(x, z) + 1;
        for (let a = 0; a < 7; a++) for (let b2 = 0; b2 < 3; b2++) {
          const [px, pz] = alongX ? [x + a, z + b2] : [x + b2, z + a];
          w.set(px, y + 1, pz, B.plank);
          if ((a === 0 || a === 6) && b2 !== 1) w.set(px, y, pz, B.wood);
          if (b2 === (back > 0 ? 2 : 0)) { if (a === 0 || a === 6 || a === 3) w.box(px, y + 2, pz, px, y + 4, pz, B.wood); else { w.set(px, y + 3, pz, B.plank); w.set(px, y + 4, pz, B.wood); } }
        }
      };
      const FLW = [B.flowerR, B.flowerY, B.flowerP, B.flowerB, B.flowerW, B.flowerO];
      const flowerAt = (T, x, y, z, head, tall) => { T.set(x, y, z, B.flowerStem); if (tall) { T.set(x, y + 1, z, B.flowerStem); T.set(x, y + 2, z, head); } else T.set(x, y + 1, z, head); };

      // ───────── 집(반목조·창·문·기와지붕·굴뚝) ─────────
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
            put(sd, wu + c0 + c, wy + r, 1, r % 2 ? o.shutter : o.shutterDk);
            if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
          }
        }
        if (o.box) {
          for (let c = -1; c <= 5; c++) { put(sd, wu + c, wy - 2, 2, B.plank); put(sd, wu + c, wy - 2, 3, B.plank); }
          for (let c = -1; c <= 5; c++) {
            const hh = hash3(wu + c, wy, sd.k.charCodeAt(0));
            put(sd, wu + c, wy - 1, 3, hh > 0.35 ? B.flowerLf : FLW[(hh * 40 | 0) % 6]);
            if ((c & 1) === 0 || hh > 0.8) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7 + (hh * 3 | 0)) % 6]);
          }
        }
      };
      const doorAt = (sd, cu, yb, o) => {
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
        put(sd, u0 + 2, yb + 10, 1, B.sill);
        for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
          const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
          for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
          for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
        }
        let lamp = null;
        if (o.lantern) {
          const lc = u0 + 7;
          put(sd, lc, yb + 8, 1, B.iron); put(sd, lc, yb + 8, 2, B.iron); put(sd, lc, yb + 7, 2, B.ironDk);
          put(sd, lc, yb + 6, 2, B.lamp); put(sd, lc, yb + 5, 2, B.lamp); put(sd, lc, yb + 4, 2, B.ironDk);
          const p = sd.at(lc, 2); lamp = [p[0] + 0.5, yb + 6, p[1] + 0.5];
        }
        const p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp };
      };
      const PAL = { R: [B.tileR, B.tileR2, B.tileR3, B.tileRd], B: [B.tileB, B.tileB2, B.tileB3, B.tileBd], N: [B.tileN, B.tileN2, B.tileN3, B.tileNd], G: [B.tileG, B.tileG2, B.tileG3, B.tileGd] };
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, T = o.pal || PAL.R;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            const b = s === 0 ? T[3] : seam ? T[1] : (hash3(l >> 2, s, 5) > 0.72 ? T[2] : T[0]);
            P(a, l, ry, b); P(a, l, ry - 1, T[3]);
            if (s === sMax) P(a, l, ry + 1, T[3]);
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        const mid = (A0 + A1) / 2, midA = Math.floor(mid);
        for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
          for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
          const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35));
          const odd = (A1 - A0) % 2 === 0;
          for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy + r, 0); }
          for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
        }
        if (o.gutter) for (const [ae, ain, sg] of [[a0 - 1, a0, -1], [a1 + 1, a1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const l = g0 + 1;
          P(ae, l, y0 - 2, B.gutter);
          for (let k = 0; k < ov; k++) P(ain - k * sg, l, y0 - 3 - k, B.gutter);
          const aw = sg < 0 ? A0 - 1 : A1 + 1;
          for (let y = y0 - 3 - ov; y >= o.foot; y--) P(aw, l, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, hash3(cx + dx, y, cz + dz) > 0.75 ? B.brick2 : B.brick);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(cx + dx, y, cz + dz, B.brick2);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.sill);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) w.box(px, yt + 1, pz, px, yt + 2, pz, B.pot);
        return [cx + 2, yt + 3, cz + 2];
      };
      // o: x,z,sx,sz,floors,fh,face,wall,shutter[2],pal,jetty,stone,chimney,box,y
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 2, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall || B.plaster, sh = o.shutter || [B.shutG, B.shutGd];
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0) || B.mortar);
          }
        }
        let e = 0, yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const ePrev = e;
          if (o.jetty && f > 0) e = 2;
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          const stone = f < (o.stone || 0);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0;
            const nW = Math.max(1, Math.floor((L + 2) / 10)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 9) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || (isDoor && Math.abs(u - cu) <= 4);
            if (stone) {
              for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
                const corner = u <= sd.u0 + 1 || u >= sd.u1 - 1;
                put(sd, u, y, 0, corner && ((y >> 1) & 1) ? B.sill : (stoneAt(u, y, 5) || B.mortar));
              }
            } else if (k === 's' || k === 'e') {   // 반목조는 보이는 두 면에만(정점 아끼기)
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb, 1, B.frame); put(sd, u, yb + 1, 1, B.frame); put(sd, u, yb + fh - 1, 1, B.frame); }
              for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0 - 1, sd.u0, sd.u1, sd.u1 + 1]) put(sd, u, y, 1, B.frameDk);
              for (let u = sd.u0 + 6; u <= sd.u1 - 3; u += 6) if (!busy(u)) for (let y = yb + 2; y < yb + fh - 1; y++) put(sd, u, y, 1, B.frame);
              for (const [ua, ub] of [[sd.u0 + 1, sd.u0 + 5], [sd.u1 - 1, sd.u1 - 5]]) {
                if (busy(ua) || busy(ub)) continue;
                for (let k2 = 0; k2 <= fh - 4; k2++) { const t = k2 / (fh - 4); put(sd, Math.round(ua + (ub - ua) * t), yb + 2 + k2, 1, B.frame); }
              }
              if (e > ePrev) for (let u = sd.u0; u <= sd.u1; u += 3) { put(sd, u, yb - 1, 0, B.frameDk); put(sd, u, yb - 1, -1, B.frameDk); }
            }
            if (k === 'n') continue;   // 뒷면(옹벽 쪽) 창은 생략
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: stone ? null : sh[0], shutterDk: sh[1], box: o.box && !stone && k === 's' });
            if (isDoor) { const r = doorAt(sd, cu, yb, { lantern: o.lantern !== false }); out.door = r.door; out.lamp = r.lamp; out.cu = cu; }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || 'x';
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, pal: o.pal, gable: wall, gutter: true, foot: gy + 3 });
        out.top = top; out.e = e;
        if (o.chimney) {
          const cx = axis === 'x' ? X0 + 3 : Math.floor((X0 + X1) / 2) - 1, cz = axis === 'x' ? Math.floor((Z0 + Z1) / 2) - 1 : Z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };

      // ───────── 지형: 다섯 단의 언덕, 단 끝은 낱돌 옹벽 ─────────
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => lvl(z),
        surface: (x, z) => { const f = n.fbm(x * 0.03 + 3, z * 0.03, 2); return f > 0.6 ? B.grass2 : f < 0.38 ? B.grass3 : B.grass; },
        under: (x, z, y, dep) => dep < 3 ? B.dirt : B.found,
      });
      for (let k = 0; k < 4; k++) {
        const z = k * BAND + BAND - 1, yt = lvl(z), yb = lvl(z + 1);
        for (let x = 0; x < W; x++) for (let y = yb + 1; y <= yt; y++) w.set(x, y, z, stoneAt(x, y, 11 + k) || B.mortar);
      }
      // 골목(각 단의 남쪽 가장자리): 무늬 돌길과 배수 홈
      for (let k = 0; k < 5; k++) for (let z = k * BAND + 48; z <= k * BAND + 62; z++) for (let x = 0; x < W; x++) if (z < D) MH.paint(w, x, z, z === k * BAND + 61 ? B.paveJ : paveAt(x, z));
      // 옹벽 위 난간: 낮은 돌 난간, 갓돌, 16칸마다 기둥과 돌구슬
      for (let k = 0; k < 4; k++) {
        const z = k * BAND + 63, y = lvl(z);
        for (let x = 0; x < W; x++) {
          if (onStair(x)) continue;
          for (let yy = y + 1; yy <= y + 3; yy++) w.set(x, yy, z, stoneAt(x, yy, 21) || B.whiteDk);
          w.set(x, y + 4, z, B.trim);
          if (x % 16 === 8) { w.box(x, y + 1, z - 1, x + 1, y + 6, z, B.whiteDk); w.box(x, y + 7, z - 1, x + 1, y + 7, z, B.trim); w.box(x, y + 8, z - 1, x + 1, y + 8, z, B.found); }
        }
      }
      // 계단: 한 단 1칸, 폭 12, 양옆 돌 난간과 쇠 손잡이
      for (let k = 1; k < 5; k++) for (const sx of STAIRS) {
        const top = lvl(k * BAND - 1), bot = lvl(k * BAND);
        for (let s = 0; s <= top - bot; s++) {
          const z = k * BAND + s, y = top - s;
          for (let x = sx; x < sx + SW; x++) { w.box(x, bot, z, x, y - 1, z, B.found); w.set(x, y, z, (x === sx || x === sx + SW - 1) ? B.st2 : B.sill); }
          for (const x of [sx - 1, sx + SW]) { w.box(x, bot, z, x, y + 2, z, B.whiteDk); w.set(x, y + 3, z, B.trim); if (s % 4 === 0) w.box(x, y + 4, z, x, y + 5, z, B.iron); }
        }
        for (const x of [sx - 1, sx + SW]) w.line(x, top + 6, k * BAND, x, bot + 6, k * BAND + top - bot, B.iron);
      }

      // ───────── 층층이 늘어선 집들 + 앞마당(울타리 · 꽃밭 · 디딤돌) ─────────
      const WALLS = [B.plaster, B.plasterB, B.plasterP, B.plasterG, B.plasterY];
      const ROOFS = [PAL.R, PAL.B, PAL.N, PAL.G];
      const SHUT = [[B.shutG, B.shutGd], [B.shutB, B.shutBd], [B.shutR, B.shutRd]];
      const lines = [], allHs = [];
      const BLOCKS = [[6, 70], [94, 170], [194, 250], [274, 330]];
      for (let k = 0; k < 5; k++) {
        const z0 = k * BAND + 10, sz = 22, y = lvl(z0), fz = k * BAND + 44;
        BLOCKS.forEach(([bx0, bx1], bi) => {
          if ((k === 2 || k === 0 || k === 3) && bi === 1) return;
          if (k === 2 && bi === 2) return;   // 빵집 마당
          const span = bx1 - bx0 + 1, gap = 12, sxA = Math.floor((span - gap) / 2);
          const hs = [];
          for (let q = 0; q < 2; q++) {
            const id = k * 7 + bi * 3 + q, jit = (hash3(id, 1, 9) * 4) | 0;
            const sx = sxA - jit, x = q === 0 ? bx0 + jit : bx1 - sx + 1 - ((hash3(id, 2, 9) * 2) | 0);
            const h = house({ x, z: z0, sx, sz, floors: (k === 3 && bi === 2) ? 1 : id % 3 === 1 ? 3 : 2, fh: 12, face: 's', y: y + 1, wall: WALLS[id % 5], shutter: SHUT[id % 3], pal: ROOFS[(id * 3 + 1) % 4],
              jetty: id % 4 === 1, stone: id % 5 === 3 ? 1 : 0, chimney: id % 2 === 0, box: true, lantern: true });
            hs.push(h); allHs.push(h);
            if (h.lamp && id % 2 === 0) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 16, flicker: 0.1, night: true });
            // 앞마당: 문에서 골목까지 판석 길, 흰 울타리(문 자리 비움), 꽃밭과 회양목
            const cu = h.cu;
            for (let zz = z0 + sz + 3; zz <= fz + 3; zz++) for (let xx = cu - 2; xx <= cu + 2; xx++) MH.paint(w, xx, zz, (xx === cu - 2 || xx === cu + 2) ? B.paveJ : (zz % 3 === 0 ? B.slab : B.paveC));
            for (let xx = h.x0 - 1; xx <= h.x1 + 1; xx++) {
              if (xx >= cu - 3 && xx <= cu + 3) continue;
              const post = (xx - h.x0) % 4 === 0;
              if (xx % 2 === 0 || post) w.box(xx, y + 1, fz, xx, y + (post ? 4 : 3), fz, B.picket);
              else { w.set(xx, y + 1, fz, B.picket); w.set(xx, y + 3, fz, B.picket); }
              for (let zz = fz - 5; zz <= fz - 1; zz++) {
                const hh = hash3(xx, zz, k);
                MH.paint(w, xx, zz, B.soil);
                if (zz === fz - 5 && (xx % 5 === 0)) { w.box(xx, y + 1, zz, xx + 1, y + 2, zz, B.hedge); continue; }
                if (hh < 0.45 && !w.get(xx, y + 1, zz)) flowerAt(w, xx, y + 1, zz, FLW[(hh * 13 | 0) % 6], hh < 0.15);
                else if (hh > 0.85 && !w.get(xx, y + 1, zz)) w.set(xx, y + 1, zz, B.flowerLf);
              }
            }
            for (const gx of [cu - 3, cu + 3]) { w.box(gx, y + 1, fz, gx, y + 5, fz, B.found); w.set(gx, y + 6, fz, B.trim); }
          }
          const [a, b] = hs, yy = Math.min(a.top, b.top) - 4, zc = Math.round((a.z0 + a.z1) / 2);
          lines.push({ ax: a.x1 + a.e + 1, bx: b.x0 - b.e - 1, y: yy, z: zc, k });
        });
      }
      // ───────── 빨랫줄: 집과 집 사이(옷감은 3×5칸, 나무 집게) ─────────
      const CLOTH = [B.clothR, B.clothB, B.clothW, B.clothY];
      const hang = (T, L) => {
        for (const dz of [-5, 0, 5]) {
          const z = L.z + dz, len = L.bx - L.ax;
          for (let x = L.ax; x <= L.bx; x++) {
            const t = (x - L.ax) / Math.max(1, len), yy = L.y - Math.round(Math.sin(t * Math.PI) * 1.2);
            T.set(x, yy, z, B.rope);
          }
          for (let x = L.ax + 1; x + 2 < L.bx; x += 4) {
            const c = CLOTH[(x + z + L.k) & 3], t = (x + 1 - L.ax) / Math.max(1, len), yy = L.y - Math.round(Math.sin(t * Math.PI) * 1.2);
            T.set(x, yy, z, B.wood); T.set(x + 2, yy, z, B.wood);
            for (let dy = 1; dy <= 5; dy++) for (let dx = 0; dx < 3; dx++) if (!(dy === 5 && dx === 1 && (x & 4))) T.set(x + dx, yy - dy, z, c);
          }
        }
      };
      const LI = lines.findIndex(L => L.k === 3 && L.ax > 190) >= 0 ? lines.findIndex(L => L.k === 3 && L.ax > 190) : 0;
      lines.forEach((L, i) => {
        if (i === LI) {
          const p = w.prop({ name: 'laundry', pivot: [(L.ax + L.bx) / 2 + 0.5, L.y + 0.5, L.z + 0.5], axis: 'x', rock: 0.07, rockSpeed: 1.5 });
          hang(guard(p), L);
          acts.push({ name: '빨랫줄', hint: '바람에 빨래가 크게 펄럭여요', hit: [L.ax - 1, L.y - 7, L.z - 7, L.bx + 1, L.y + 1, L.z + 7], run: async A => { A.wind(2, 3.2); await A.spin('laundry', 7, 3.2); } });
          landmarks.push({ name: '빨랫줄 골목', note: '집과 집 사이에 걸린 빨래', p: [(L.ax + L.bx) / 2, L.y + 14, L.z] });
        } else hang(w, L);
      });

      // ───────── 느릅나무 쉼터(가운데 단) ─────────
      const EX = 128, EZ = 156, eg = lvl(EZ);
      for (let z = 134; z <= 172; z++) for (let x = 94; x <= 170; x++) {
        const edge = x <= 95 || x >= 169 || z <= 135 || z >= 171, r = Math.hypot(x - EX, z - EZ);
        MH.paint(w, x, z, edge ? B.found : (r < 20 && ((Math.atan2(z - EZ, x - EX) * 8 / Math.PI + 16) | 0) % 2 === 0 && Math.round(r) % 3 !== 0) ? B.slab : paveAt(x, z));
      }
      // 둥근 화단 테(돌)와 둘레 의자
      w.ring(EX, EZ, eg + 1, 5.6, 9.2, B.found); w.ring(EX, EZ, eg + 2, 7.4, 9.2, B.sill);
      for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) if (dx * dx + dz * dz <= 31) w.set(EX + dx, eg + 1, EZ + dz, B.soil);
      w.ring(EX, EZ, eg + 3, 10.4, 12.6, B.bench); for (let a = 0; a < 16; a++) { const x = Math.round(EX + Math.cos(a * Math.PI / 8) * 11.5), z = Math.round(EZ + Math.sin(a * Math.PI / 8) * 11.5); w.box(x, eg + 1, z, x, eg + 2, z, B.wood); }
      tree(EX, eg + 2, EZ, { h: 30, r: 15, branches: 6, trunkR: 2.6, leaves: [B.leaf2, B.leaf, B.leafDk] });
      for (const [bx, bz, ax, bk] of [[104, 140, true, 1], [146, 140, true, 1], [104, 166, true, -1], [146, 166, true, -1]]) bench(bx, bz, ax, bk);
      for (const [px, pz] of [[97, 137], [166, 137], [97, 168], [166, 168]]) {
        for (let y = eg + 1; y <= eg + 4; y++) for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) w.set(px + dx, y, pz + dz, y === eg + 4 ? B.soil : (dx === 1 && dz === 1 ? B.clayDk : B.clay));
        clump(w, px + 1, eg + 6, pz + 1, 2.6, [B.hedge, B.hedge, B.leafDk]);
        for (const [dx, dz] of [[0, 0], [2, 1], [1, 2]]) w.set(px + dx, eg + 8, pz + dz, B.flowerP);
      }
      landmarks.push({ name: '느릅나무 쉼터', note: '이웃들이 모이는 그늘', p: [EX + 0.5, eg + 60, EZ + 0.5], tag: 'HOME' });
      // 손펌프와 물통
      const PX = 160, PZ = 156;
      w.box(PX - 2, eg + 1, PZ - 2, PX + 2, eg + 2, PZ + 2, B.found); w.box(PX - 2, eg + 3, PZ - 2, PX + 2, eg + 3, PZ + 2, B.sill);
      w.box(PX - 1, eg + 4, PZ - 1, PX, eg + 13, PZ, B.pump); w.box(PX - 1, eg + 14, PZ - 1, PX, eg + 14, PZ, B.ironDk); w.set(PX, eg + 15, PZ, B.brass);
      for (const y of [eg + 6, eg + 12]) w.box(PX - 2, y, PZ - 2, PX + 1, y, PZ + 1, B.ironDk);
      w.box(PX, eg + 10, PZ + 1, PX, eg + 10, PZ + 3, B.pump); w.set(PX, eg + 9, PZ + 3, B.ironDk);
      w.box(PX - 3, eg + 1, PZ + 4, PX + 3, eg + 4, PZ + 9, B.found); w.box(PX - 2, eg + 2, PZ + 5, PX + 2, eg + 4, PZ + 8, 0); w.box(PX - 2, eg + 2, PZ + 5, PX + 2, eg + 3, PZ + 8, B.waterB);
      for (let x = PX - 3; x <= PX + 3; x++) for (const z of [PZ + 4, PZ + 9]) w.set(x, eg + 4, z, B.sill);
      const handle = w.prop({ name: 'handle', pivot: [PX + 0.5, eg + 13.5, PZ - 0.5], axis: 'x' });
      handle.box(PX, eg + 13, PZ - 2, PX, eg + 13, PZ - 8, B.iron); handle.box(PX, eg + 11, PZ - 8, PX, eg + 12, PZ - 8, B.wood); handle.set(PX - 1, eg + 13, PZ - 2, B.ironDk);
      acts.push({
        name: '손펌프', hint: '손잡이를 저으면 물통에 물이 쏟아져요', hit: [PX - 3, eg + 1, PZ - 9, PX + 3, eg + 15, PZ + 9],
        run: async a => { for (let k = 0; k < 4; k++) { await a.turn('handle', [0.5, 0, 0], 0.3); a.burst([PX + 0.5, eg + 9, PZ + 4], { n: 22, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 2.5, up: 1.5, life: 0.8, gravity: 14, spread: 1 }); await a.turn('handle', [-0.25, 0, 0], 0.3); } await a.turn('handle', [0, 0, 0], 0.3); },
      });
      // ───────── 공동 텃밭(아래 단) ─────────
      const gz0 = 3 * BAND + 10, gy0 = lvl(gz0);
      for (let z = gz0; z <= gz0 + 26; z++) for (let x = 96; x <= 168; x++) {
        const row = (z - gz0) % 6;
        w.set(x, gy0, z, row >= 4 ? B.paveJ : B.soil);
        if (row >= 1 && row <= 2 && x % 4 !== 0) { const hh = hash3(x, z, 4); w.set(x, gy0 + 1, z, hh > 0.85 ? B.veg2 : B.veg); if (row === 1 && hh > 0.55) w.set(x, gy0 + 2, z, ((x >> 2) + z) % 5 === 0 ? B.flowerY : B.veg); }
      }
      for (const [x0, x1] of [[94, 125], [134, 170]]) for (let x = x0; x <= x1; x++) { const post = x % 4 === 0; w.box(x, gy0 + 1, gz0 - 2, x, gy0 + (post ? 5 : 1), gz0 - 2, B.bench); w.set(x, gy0 + 4, gz0 - 2, B.bench); w.box(x, gy0 + 1, gz0 + 28, x, gy0 + (post ? 5 : 1), gz0 + 28, B.bench); w.set(x, gy0 + 4, gz0 + 28, B.bench); }
      for (const x of [94, 170]) for (let z = gz0 - 2; z <= gz0 + 28; z++) { const post = z % 4 === 0; w.box(x, gy0 + 1, z, x, gy0 + (post ? 5 : 1), z, B.bench); w.set(x, gy0 + 4, z, B.bench); }
      for (const x of [125, 134]) { w.box(x, gy0 + 1, gz0 + 28, x, gy0 + 6, gz0 + 28, B.wood); w.set(x, gy0 + 7, gz0 + 28, B.trim); }
      // 텃밭 헛간과 빗물 통
      { const sx0 = 98, sz0 = gz0 + 30, sy = gy0;
        for (let z = sz0; z <= sz0 + 8; z++) for (let x = sx0; x <= sx0 + 10; x++) MH.paint(w, x, z, B.slab);
        for (let y = sy + 1; y <= sy + 9; y++) for (let z = sz0; z <= sz0 + 8; z++) for (let x = sx0; x <= sx0 + 10; x++) {
          const edge = x === sx0 || x === sx0 + 10 || z === sz0 || z === sz0 + 8; if (!edge) continue;
          w.set(x, y, z, (x === sx0 || x === sx0 + 10) && (z === sz0 || z === sz0 + 8) ? B.frame : (x % 2 ? B.plank : B.crate));
        }
        for (let y = sy + 1; y <= sy + 7; y++) for (let x = sx0 + 4; x <= sx0 + 6; x++) w.set(x, y, sz0 + 8, x === sx0 + 5 && y === sy + 4 ? B.iron : B.door);
        roof(sx0, sx0 + 10, sz0, sz0 + 8, sy + 10, { axis: 'x', pal: PAL.G, gable: B.plank, ov: 2, og: 1 });
        barrel(w, sx0 + 15, sy + 1, sz0 + 4, 7); w.box(sx0 + 14, sy + 7, sz0 + 3, sx0 + 16, sy + 7, sz0 + 5, B.waterB);
      }
      landmarks.push({ name: '공동 텃밭', note: '이웃끼리 나눠 쓰는 밭', p: [132.5, gy0 + 16, gz0 + 13] });

      // ───────── 예배당(맨 위 단): 버팀벽과 뾰족 창, 장미창, 속 빈 종루에 매단 종 ─────────
      const cy = lvl(8) + 1, CX0 = 104, CX1 = 151, CZ0 = 8, CZ1 = 31, CFH = 22;
      for (let z = CZ0 - 1; z <= CZ1 + 1; z++) for (let x = CX0 - 1; x <= CX1 + 1; x++) {
        const edge = x === CX0 - 1 || x === CX1 + 1 || z === CZ0 - 1 || z === CZ1 + 1;
        for (let y = cy - 2; y <= cy + 2; y++) w.set(x, y, z, !edge ? B.mortar : y === cy + 2 ? B.sill : (stoneAt(z === CZ0 - 1 || z === CZ1 + 1 ? x : z, y, 7) || B.mortar));
      }
      const cyb = cy + 3;
      w.box(CX0, cyb, CZ0, CX1, cyb + CFH - 1, CZ1, B.white);
      for (let x = CX0; x <= CX1; x++) for (const z of [CZ0, CZ1]) { w.set(x, cyb, z, B.whiteDk); w.set(x, cyb + 1, z, B.whiteDk); w.set(x, cyb + CFH - 1, z, B.trim); }
      for (let z = CZ0; z <= CZ1; z++) for (const x of [CX0, CX1]) { w.set(x, cyb, z, B.whiteDk); w.set(x, cyb + 1, z, B.whiteDk); }
      // 뾰족 창(남·북) 사이사이 버팀벽(아래가 두껍고 위로 물러남)
      const pointed = (x0, z, side) => {
        for (let y = cyb + 5; y <= cyb + 17; y++) for (let c = 0; c < 4; c++) {
          const top = cyb + 15 + (c === 1 || c === 2 ? 2 : 0);
          if (y > top) continue;
          w.set(x0 + c, y, z, (c === 1 || c === 2) && y === cyb + 11 ? B.lead : (c === 1 || c === 2) ? B.glassW : B.lead);
          w.set(x0 + c, y, z + side, 0);
        }
        for (let c = -1; c <= 4; c++) { w.set(x0 + c, cyb + 4, z + side, B.sill); }
        for (let y = cyb + 4; y <= cyb + 16; y++) { w.set(x0 - 1, y, z + side, B.whiteDk); w.set(x0 + 4, y, z + side, B.whiteDk); }
        w.set(x0, cyb + 16, z + side, B.whiteDk); w.set(x0 + 3, cyb + 16, z + side, B.whiteDk); w.box(x0 + 1, cyb + 18, z + side, x0 + 2, cyb + 18, z + side, B.whiteDk);
      };
      for (let x = CX0 + 4; x + 4 < CX1; x += 10) {
        for (const [z, side] of [[CZ1, 1], [CZ0, -1]]) {
          if (side > 0 && x + 4 >= 120 && x <= 136) continue;   // 종탑 자리
          pointed(x + 2, z, side);
        }
      }
      for (let x = CX0; x <= CX1 + 1; x += 10) for (const [z, side] of [[CZ1, 1], [CZ0, -1]]) {
        if (side > 0 && x >= 118 && x <= 136) continue;
        const xx = Math.min(x, CX1 - 1);
        for (let y = cyb; y <= cyb + 18; y++) { const d = y < cyb + 8 ? 3 : y < cyb + 14 ? 2 : 1; for (let dd = 1; dd <= d; dd++) w.box(xx, y, z + side * dd, xx + 1, y, z + side * dd, (y === cyb + 7 || y === cyb + 13) && dd === d ? B.trim : B.whiteDk); }
      }
      // 지붕(푸른 기와)과 서쪽·동쪽 박공의 둥근 장미창
      const cpeak = roof(CX0, CX1, CZ0, CZ1, cyb + CFH, { axis: 'x', pal: PAL.B, gable: B.white, gutter: true, foot: cyb, ov: 3, og: 2 });
      for (let z = CZ0; z <= CZ1; z++) w.set(Math.round((CX0 + CX1) / 2), cpeak - 1, z, B.gold);
      for (const [gx, out] of [[CX0, CX0 - 1], [CX1, CX1 + 1]]) {
        const RZ = (CZ0 + CZ1) / 2, RY = cyb + 15;
        for (let z = Math.floor(RZ - 7); z <= Math.ceil(RZ + 7); z++) for (let y = RY - 7; y <= RY + 7; y++) {
          const dz = z - RZ, dy = y - RY, r = Math.hypot(dz, dy);
          if (r > 7) continue;
          let b;
          if (r > 6) b = B.whiteDk; else if (r < 1.5) b = B.roseY;
          else { const a = Math.atan2(dy, dz), sp = Math.abs(((a / (Math.PI / 4)) % 1 + 1) % 1 - 0.5) < 0.12; b = sp ? B.lead : (r < 3.4 ? B.roseR : B.roseB); }
          w.set(gx, y, z, b); w.set(out, y, z, r > 6 ? B.trim : 0);
        }
      }
      // 종탑(남쪽 가운데): 문, 띠돌, 창, 열린 종루, 첨탑
      const tx = 122, tz = 32, TS = 12, TH = 60;
      for (let z = tz; z < tz + TS; z++) for (let x = tx; x < tx + TS; x++) w.box(x, cy - 2, z, x, cy, z, B.found);
      for (let y = cy + 1; y <= cy + TH; y++) for (let z = tz; z < tz + TS; z++) for (let x = tx; x < tx + TS; x++) {
        const edge = x === tx || x === tx + TS - 1 || z === tz || z === tz + TS - 1, corner = (x <= tx + 1 || x >= tx + TS - 2) && (z <= tz + 1 || z >= tz + TS - 2);
        if (!edge && !(y >= cy + 42 && y <= cy + 43)) continue;
        const belfry = y >= cy + 44 && y <= cy + 55;
        if (belfry && !corner) {
          const u = (x === tx || x === tx + TS - 1) ? z - tz : x - tz + tz - tx;   // 열린 아치
          if (y >= cy + 54 && !(u >= 3 && u <= 8)) { w.set(x, y, z, B.white); continue; }
          if (y >= cy + 55 && (u === 3 || u === 8)) { w.set(x, y, z, B.white); continue; }
          continue;
        }
        w.set(x, y, z, corner && y % 6 < 3 ? B.whiteDk : B.white);
      }
      for (let y = cy + 1; y <= cy + 41; y++) for (let z = tz + 1; z < tz + TS - 1; z++) for (let x = tx + 1; x < tx + TS - 1; x++) w.set(x, y, z, 0);
      for (const y of [cy + 24, cy + 43, cy + 56]) for (let z = tz - 1; z <= tz + TS; z++) for (let x = tx - 1; x <= tx + TS; x++) if (x === tx - 1 || x === tx + TS || z === tz - 1 || z === tz + TS) w.set(x, y, z, B.whiteDk);
      for (let x = tx - 1; x <= tx + TS; x++) for (let z = tz - 1; z <= tz + TS; z++) if (x === tx - 1 || x === tx + TS || z === tz - 1 || z === tz + TS) { w.set(x, cy + 61, z, B.trim); w.set(x, cy + 44, z, B.sill); }
      // 종탑 문(남쪽): 폭 4 · 높이 10, 뾰족 아치와 금빛 상인방
      const DXa = tx + 4, DXb = tx + 7, DZ = tz + TS - 1;
      for (let x = DXa; x <= DXb; x++) for (let y = cy + 1; y <= cy + 11; y++) { const top = cy + 10 + (x === DXa + 1 || x === DXb - 1 ? 1 : 0); if (y <= top) { w.set(x, y, DZ, 0); w.set(x, y, DZ - 1, y <= cy + 9 ? B.door : 0); } }
      w.set(DXa + 2, cy + 5, DZ - 1, B.brass); w.set(DXa + 1, cy + 5, DZ - 1, B.brass);
      for (let y = cy + 1; y <= cy + 11; y++) { w.set(DXa - 1, y, DZ + 1, B.whiteDk); w.set(DXb + 1, y, DZ + 1, B.whiteDk); }
      w.box(DXa - 1, cy + 12, DZ + 1, DXb + 1, cy + 12, DZ + 1, B.gold); w.box(DXa, cy + 13, DZ + 1, DXb, cy + 13, DZ + 1, B.whiteDk);
      for (let x = DXa; x <= DXb; x++) w.set(x, cy + 11, DZ + 1, B.whiteDk);
      for (let x = tx + 4; x <= tx + 7; x++) for (let y = cy + 30; y <= cy + 38; y++) w.set(x, y, DZ, (x === tx + 5 || x === tx + 6) && y < cy + 38 ? B.glassW : (y === cy + 38 ? B.whiteDk : B.lead));
      for (const x of [DXa - 3, DXb + 3]) { w.box(x, cy + 8, DZ + 1, x, cy + 8, DZ + 2, B.iron); w.box(x, cy + 6, DZ + 2, x, cy + 7, DZ + 2, B.lamp); w.set(x, cy + 5, DZ + 2, B.ironDk); }
      // 종루 안 들보와 종(부품)
      w.box(tx + 1, cy + 56, tz + 5, tx + TS - 2, cy + 56, tz + 6, B.wood);
      const st = MH.pyramid(w, tx - 1, tz - 1, tx + TS, tz + TS, cy + 62, B.tileB, 4, B.tileBd);
      w.box(tx + 5, st, tz + 5, tx + 6, st + 5, tz + 6, B.gold); w.box(tx + 5, st + 6, tz + 5, tx + 5, st + 8, tz + 5, B.iron);
      const BX = tx + 6, BZ = tz + 6;
      const bell = w.prop({ name: 'bell', pivot: [BX, cy + 55.5, BZ], axis: 'x' });
      bell.box(BX - 2, cy + 55, BZ - 1, BX + 1, cy + 55, BZ, B.wood); bell.box(BX - 1, cy + 53, BZ - 1, BX, cy + 54, BZ, B.iron);
      bell.ellipsoid(BX - 0.5, cy + 49.5, BZ - 0.5, 3.4, 3.6, 3.4, B.bell, (dx, dy, dz, d) => dy >= -3 && (dy >= -2 || dx * dx + dz * dz >= 7));
      bell.box(BX - 1, cy + 46, BZ - 1, BX, cy + 46, BZ, B.ironDk);
      acts.push({
        name: '예배당 종', hint: '저녁 기도 종이 울리고 새들이 날아올라요', hit: [tx, cy + 44, tz, tx + TS - 1, cy + 56, tz + TS - 1],
        run: async a => { for (let k = 0; k < 4; k++) { await a.turn('bell', [0.45, 0, 0], 0.4); a.burst([BX, cy + 60, BZ], { n: 14, colors: ['#3a3040', '#6a5a70'], speed: 12, up: 6, life: 2, gravity: -0.5, spread: 6 }); await a.turn('bell', [-0.45, 0, 0], 0.4); } await a.turn('bell', [0, 0, 0], 0.4); },
      });
      lights.push({ p: [DXa + 2, cy + 7, DZ + 3], c: '#ffd890', i: 1, d: 22, flicker: 0.1, night: true });
      landmarks.push({ name: '작은 예배당', note: '푸른 첨탑의 종', p: [BX, st + 16, BZ] });
      // 예배당 앞뜰: 판석 길과 낮은 회양목 울, 흰 꽃
      for (let z = tz + TS; z <= 47; z++) for (let x = tx - 2; x <= tx + TS + 1; x++) MH.paint(w, x, z, (x === tx - 2 || x === tx + TS + 1) ? B.paveJ : (z % 3 === 0 ? B.slab : B.paveC));
      for (let x = 100; x <= 155; x++) if (x < tx - 3 || x > tx + TS + 2) { w.box(x, cy, 45, x, cy + 1, 46, B.hedge); if (x % 4 === 0) { w.set(x, cy + 2, 45, B.flowerW); } }
      acts.push({ name: '작은 예배당 안으로', hint: '종탑 아래 문을 열고 종 줄이 드리운 현관을 지나 신자석과 장미창이 있는 본당으로 들어가요', goto: 'elmrow-chapel', hit: [DXa - 1, cy, DZ - 1, DXb + 1, cy + 10, DZ + 2],
        run: async a => { for (let k = 0; k < 3; k++) { a.burst([DXa + 2, cy + 5 + k * 3, DZ + 3 + k * 2], { n: 16, colors: ['#ffe9a0', '#ffffff', '#c8d8ff'], speed: 3, up: 3, life: 1, gravity: -0.4, spread: 2.4 }); await a.wait(0.2); } await a.wait(0.3); } });
      // 첨탑 풍향계(부품): 화살과 금빛 수탉
      const VY = st + 9;
      const vane = w.prop({ name: 'vane', pivot: [tx + 5.5, VY, tz + 5.5], speed: 0.25 });
      vane.box(tx - 1, VY, tz + 5, tx + 11, VY, tz + 5, B.iron); vane.box(tx + 10, VY - 1, tz + 5, tx + 10, VY + 1, tz + 5, B.gold); vane.set(tx + 11, VY, tz + 5, B.gold); vane.set(tx + 12, VY, tz + 5, B.gold);
      vane.box(tx - 1, VY + 1, tz + 5, tx + 1, VY + 2, tz + 5, B.iron);
      // 수탉: 몸통·꼬리·볏
      vane.box(tx + 3, VY + 2, tz + 5, tx + 7, VY + 4, tz + 5, B.gold); vane.box(tx + 2, VY + 4, tz + 5, tx + 3, VY + 7, tz + 5, B.gold); vane.set(tx + 1, VY + 6, tz + 5, B.gold);
      vane.box(tx + 7, VY + 5, tz + 5, tx + 8, VY + 6, tz + 5, B.gold); vane.set(tx + 8, VY + 7, tz + 5, B.flowerR); vane.set(tx + 9, VY + 5, tz + 5, B.flowerY); vane.box(tx + 5, VY + 1, tz + 5, tx + 5, VY + 1, tz + 5, B.gold);
      acts.push({
        name: '첨탑 풍향계', hint: '바람이 거세지며 첨탑 꼭대기의 금빛 수탉 풍향계가 팽팽 돌아요', hit: [tx - 1, VY - 2, tz, tx + 12, VY + 8, tz + 11],
        run: async a => { a.wind(3, 3.6); for (let k = 0; k < 3; k++) a.burst([tx + 6, VY + 2, tz + 6], { n: 10, colors: ['#3a3040', '#6a5a70'], speed: 12, up: 3, life: 2, gravity: -0.4, spread: 6 }); await a.spin('vane', 24, 3.6); },
      });

      // ───────── 쉼터 그네(부품) ─────────
      const SX = 101, SZ = 154;
      for (const x of [SX - 5, SX + 5]) { w.box(x, eg + 1, SZ, x, eg + 17, SZ, B.wood); w.line(x, eg + 1, SZ - 5, x, eg + 13, SZ, B.wood); w.line(x, eg + 1, SZ + 5, x, eg + 13, SZ, B.wood); }
      w.box(SX - 6, eg + 18, SZ, SX + 6, eg + 18, SZ, B.wood); w.box(SX - 6, eg + 19, SZ, SX + 6, eg + 19, SZ, B.frameDk);
      const swing = w.prop({ name: 'swing', pivot: [SX + 0.5, eg + 17.5, SZ + 0.5], axis: 'x', rock: 0.04, rockSpeed: 1.4 });
      for (const x of [SX - 2, SX + 2]) swing.box(x, eg + 5, SZ, x, eg + 17, SZ, B.rope);
      swing.box(SX - 3, eg + 4, SZ - 1, SX + 3, eg + 4, SZ + 1, B.bench); swing.box(SX - 3, eg + 3, SZ, SX + 3, eg + 3, SZ, B.wood);
      acts.push({
        name: '쉼터 그네', hint: '바람이 불자 느릅나무 옆 그네가 높이 흔들리고 잎이 흩날려요', hit: [SX - 5, eg + 1, SZ - 5, SX + 5, eg + 18, SZ + 5],
        run: async a => {
          a.wind(2.5, 4);
          for (const amp of [0.5, 0.9, 1.1, 0.8, 0.5, 0.25]) {
            a.burst([EX + 0.5, eg + 32, EZ + 0.5], { n: 12, colors: ['#6aaa48', '#4a8a3a', '#e8c040'], speed: 8, up: 2, life: 2.2, gravity: 4, spread: 12 });
            await a.turn('swing', [amp, 0, 0], 0.55); await a.turn('swing', [-amp, 0, 0], 0.55);
          }
          await a.turn('swing', [0, 0, 0], 0.5);
        },
      });
      // ───────── 텃밭 해바라기(부품): 물을 주면 쑥쑥 자란다 ─────────
      const gy = gy0 + 1, sun = w.prop({ name: 'sunflowers', pivot: [132, gy, gz0 + 12], scl0: [1, 0.05, 1] });
      const spots = [[108, gz0 + 3], [120, gz0 + 9], [132, gz0 + 3], [144, gz0 + 9], [156, gz0 + 3], [108, gz0 + 15], [144, gz0 + 15], [156, gz0 + 21], [120, gz0 + 21]];
      for (const [x, z] of spots) {
        sun.box(x, gy + 2, z, x, gy + 9, z, B.veg); sun.set(x + 1, gy + 5, z, B.veg); sun.set(x - 1, gy + 7, z, B.veg); sun.set(x + 2, gy + 5, z, B.leaf2); sun.set(x - 2, gy + 7, z, B.leaf2);
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { if (Math.abs(dx) === 2 && Math.abs(dy) === 2) continue; sun.set(x + dx, gy + 12 + dy, z + 1, Math.abs(dx) <= 1 && Math.abs(dy) <= 1 ? B.bark : B.flowerY); }
        sun.set(x, gy + 10, z, B.veg);
      }
      acts.push({
        name: '텃밭 해바라기', hint: '텃밭에 물을 뿌리면 해바라기가 쑥쑥 자라 꽃을 피워요', hit: [96, gy - 1, gz0, 168, gy + 6, gz0 + 24],
        run: async a => {
          for (let k = 0; k < 6; k++) { for (const z of [gz0 + 4, gz0 + 16]) a.burst([102 + k * 12, gy + 12, z + 0.5], { n: 18, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 4, up: 3, life: 1, gravity: 16, spread: 4 }); await a.wait(0.3); }
          await a.tween('sunflowers', { scl: [1, 1, 1] }, 2.4);
          for (const [x, z] of spots) a.burst([x + 0.5, gy + 13, z + 2], { n: 8, colors: ['#ffe060', '#fff4c0'], speed: 3, up: 3, life: 1.4, gravity: 0.5, spread: 2 });
          await a.wait(2.6);
          await a.tween('sunflowers', { scl: [1, 0.05, 1] }, 2);
        },
      });

      // ══ 동쪽 빵집 마당(가운데 단 동쪽) — 빵집은 남쪽(골목·카메라 쪽)으로 문과 진열대를 낸다 ══
      const bz0 = 2 * BAND, by = lvl(bz0 + 8);
      for (let z = bz0 + 2; z <= bz0 + 47; z++) for (let x = 192; x <= 252; x++) MH.paint(w, x, z, (x === 192 || x === 252) ? B.paveJ : paveAt(x + 1, z));
      // 빵집: 노란 벽 이층집(남향 문), 덧문, 굴뚝
      const bk = house({ x: 226, z: bz0 + 6, sx: 24, sz: 18, floors: 2, fh: 12, face: 's', y: by + 1, wall: B.plasterY, shutter: [B.shutR, B.shutRd], pal: PAL.R, chimney: true, box: true, lantern: true });
      allHs.push(bk);
      const bdx = bk.cu, bfy = bk.floor, bfz = bk.z1;   // 문 가운데 x, 1층 바닥, 남쪽 벽 z
      // 줄무늬 차양(문 위로 길게)과 받침 기둥
      for (let x = bk.x0 - 1; x <= bk.x1 + 1; x++) for (let d = 1; d <= 6; d++) {
        if (Math.abs(x - bdx) <= 3) continue;   // 문 위는 비워 둔다(문이 잘 보이게)
        const yy = bfy + 11 - (d >> 1);
        w.set(x, yy, bfz + d, ((x - bk.x0 + 99) >> 1) & 1 ? B.awnR : B.awnW);
        if (d === 6 && (x & 1)) w.set(x, yy - 1, bfz + d, B.awnR);
      }
      for (const x of [bk.x0 - 1, bk.x1 + 1]) w.box(x, by + 1, bfz + 6, x, bfy + 7, bfz + 6, B.wood);
      // 진열대 둘(문 양옆, 차양 아래): 다리·판·바구니의 빵
      for (const [sx0, sx1] of [[bk.x0, bdx - 5], [bdx + 5, bk.x1]]) {
        for (let x = sx0; x <= sx1; x++) for (let z = bfz + 3; z <= bfz + 4; z++) {
          w.set(x, by + 4, z, B.plank);
          if (x === sx0 || x === sx1) w.box(x, by + 1, z, x, by + 3, z, B.wood);
          else if (z === bfz + 4) w.set(x, by + 3, z, B.check);
        }
        for (let x = sx0 + 1; x < sx1; x += 2) w.set(x, by + 5, bfz + 3 + (x & 1), (x % 3) ? B.loaf : B.crust);
      }
      // 빵 간판(벽에 내민 쇠팔과 둥근 빵 판)
      { const sx = bk.x0 + 2, sz = bfz + 1, sy = bfy + 15;
        w.box(sx, sy + 6, sz, sx, sy + 6, sz + 6, B.iron);
        for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) { const d = Math.hypot(c - 2.5, r - 2.5); if (d < 3.1) w.set(sx, sy + r, sz + 1 + c, d > 2.2 ? B.crust : B.loaf); }
      }
      // 돌 화덕: 둥근 지붕, 아궁이(남쪽), 굴뚝
      const OX = 208, OZ = bz0 + 18;
      w.box(OX - 8, by + 1, OZ - 8, OX + 8, by + 4, OZ + 8, B.found); w.box(OX - 8, by + 4, OZ - 8, OX + 8, by + 4, OZ + 8, B.sill);
      w.ellipsoid(OX, by + 5, OZ, 7.6, 7.6, 7.6, B.clay, (dx, dy) => dy >= 0);
      w.ellipsoid(OX, by + 5, OZ, 5.6, 5.6, 5.6, 0, (dx, dy) => dy >= 0);
      w.box(OX - 2, by + 5, OZ + 4, OX + 2, by + 8, OZ + 8, 0);
      for (let x = OX - 4; x <= OX + 4; x++) for (let y = by + 5; y <= by + 11; y++) { const arch = Math.abs(x - OX) <= 2 && y <= by + 9; if (!arch) w.set(x, y, OZ + 7, (Math.abs(x - OX) === 3 || y === by + 10) ? B.clayDk : (w.get(x, y, OZ + 7) ? B.clay : 0)); }
      w.box(OX - 2, by + 5, OZ - 2, OX + 2, by + 5, OZ + 2, B.ember); w.box(OX - 1, by + 6, OZ - 1, OX + 1, by + 6, OZ, B.fire);
      w.box(OX - 1, by + 12, OZ - 4, OX + 2, by + 22, OZ - 1, B.clayDk); w.box(OX - 2, by + 23, OZ - 5, OX + 3, by + 23, OZ, B.found);
      // 장작더미 · 밀가루 자루 · 나무 탁자
      for (let z = OZ + 10; z <= OZ + 16; z++) for (let y = by + 1; y <= by + 5; y++) for (let x = OX - 16; x <= OX - 11; x++) w.set(x, y, z, (z === OZ + 16 || z === OZ + 10) ? (((x + y) & 1) ? B.logEnd : B.bark) : B.wood);
      for (const [sx, sz] of [[OX + 11, OZ - 7], [OX + 14, OZ - 7], [OX + 12, OZ - 4]]) sack(w, sx, by + 1, sz);
      for (const [t0, tz0] of [[OX - 6, OZ + 22], [OX + 10, OZ + 22]]) {
        w.box(t0, by + 4, tz0, t0 + 8, by + 4, tz0 + 3, B.plank); for (const [dx, dz] of [[0, 0], [8, 0], [0, 3], [8, 3]]) w.box(t0 + dx, by + 1, tz0 + dz, t0 + dx, by + 3, tz0 + dz, B.wood);
        w.set(t0 + 2, by + 5, tz0 + 1, B.loaf); w.set(t0 + 3, by + 5, tz0 + 1, B.loaf); w.set(t0 + 6, by + 5, tz0 + 2, B.bun);
        for (const bz of [tz0 - 3, tz0 + 5]) { w.box(t0, by + 2, bz, t0 + 8, by + 2, bz + 1, B.bench); for (const dx of [0, 8]) w.set(t0 + dx, by + 1, bz, B.wood); }
      }
      // 빵 삽(부품): 화덕 아궁이에서 빵을 꺼낸다
      const peel = w.prop({ name: 'peel', pivot: [OX + 0.5, by + 6, OZ + 0.5] });
      peel.box(OX, by + 6, OZ + 8, OX, by + 6, OZ + 18, B.wood); peel.box(OX - 2, by + 6, OZ + 3, OX + 2, by + 6, OZ + 7, B.plank);
      const loaves = w.prop({ name: 'loaves', pivot: [OX + 0.5, by + 7, OZ + 5.5], scl0: [0.001, 0.001, 0.001] });
      for (const [dx, dz, b] of [[-1, 4, B.loaf], [1, 4, B.loaf], [0, 6, B.crust], [-1, 6, B.bun], [1, 6, B.loaf]]) { loaves.set(OX + dx, by + 7, OZ + dz, b); }
      loaves.set(OX, by + 8, OZ + 5, B.crust);
      lights.push({ name: 'oven', p: [OX + 0.5, by + 7, OZ + 0.5], c: '#ff9a4a', i: 1.4, d: 30, flicker: 0.3 });
      acts.push({
        name: '빵집 화덕', hint: '화덕 불이 확 일어나고 빵 삽이 갓 구운 빵을 꺼내요', hit: [OX - 8, by + 1, OZ - 8, OX + 8, by + 13, OZ + 18],
        run: async a => {
          a.flash('oven', 4, 3);
          for (let k = 0; k < 4; k++) { a.burst([OX + 1, by + 24, OZ - 2], { n: 10, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 1.2, up: 7, life: 2.4, gravity: -1.2, spread: 1.2 }); a.burst([OX + 0.5, by + 8, OZ + 8], { n: 8, colors: ['#ffb060', '#ffe0a0'], speed: 3, up: 3, life: 0.6, gravity: -1, spread: 1.2 }); await a.wait(0.4); }
          await a.tween('loaves', { scl: [1, 1, 1] }, 0.1);
          await Promise.all([a.move('peel', [0, 0, 10], 1.4), a.move('loaves', [0, 0, 10], 1.4)]);
          a.burst([OX + 0.5, by + 11, OZ + 16], { n: 24, colors: ['#ffe8c0', '#ffffff', '#f0d8a0'], speed: 2, up: 6, life: 1.8, gravity: -0.8, spread: 2 });
          await a.wait(1.6);
          await a.tween('loaves', { scl: [0.001, 0.001, 0.001] }, 0.6);
          await Promise.all([a.move('peel', [0, 0, 0], 1.2), a.move('loaves', [0, 0, 0], 1.2)]);
        },
      });
      landmarks.push({ name: '빵집 화덕', note: '아침마다 갓 구운 빵 냄새', p: [OX + 0.5, by + 34, OZ + 0.5], tag: 'BAKERY' });
      // 빵집 문(남쪽, 차양 아래): 들어가면 진열대·반죽방·안쪽 화덕·2층 가족 방(하위 지도)
      acts.push({ name: '빵집 안으로', hint: '차양 아래 문을 열고 빵 진열대와 계산대, 안쪽 화덕이 있는 빵집 안으로 들어가요', goto: 'elmrow-bakery', hit: [bdx - 3, bfy - 1, bfz - 1, bdx + 3, bfy + 9, bfz + 3],
        run: async a => { for (let k = 0; k < 3; k++) { a.burst([bdx + 0.5, bfy + 5 + k * 3, bfz + 6 + k * 3], { n: 16, colors: ['#ffe9a0', '#ffffff', '#ffd060'], speed: 3, up: 3, life: 1, gravity: -0.4, spread: 2.4 }); await a.wait(0.2); } await a.wait(0.3); } });
      // 두레박 우물(부품): 마당 남서쪽, 밧줄이 풀리며 두레박이 내려갔다 물을 길어 올린다
      const WX = 232, WZ = bz0 + 38;
      w.cyl(WX, WZ, by + 1, by + 3, 4.6, B.found); w.ring(WX, WZ, by + 4, 3.2, 4.6, B.sill); w.cyl(WX, WZ, by - 9, by + 4, 3, 0);
      w.cyl(WX, WZ, by - 10, by - 10, 3, B.found); w.cyl(WX, WZ, by - 9, by - 9, 3, B.waterB);
      for (const x of [WX - 4, WX + 4]) w.box(x, by + 5, WZ, x, by + 22, WZ, B.wood);
      w.box(WX - 4, by + 21, WZ, WX + 4, by + 21, WZ, B.iron); w.box(WX + 5, by + 19, WZ, WX + 5, by + 21, WZ, B.iron); w.box(WX + 5, by + 19, WZ, WX + 7, by + 19, WZ, B.iron);
      roof(WX - 4, WX + 4, WZ - 3, WZ + 3, by + 24, { axis: 'x', pal: PAL.R, gable: 0, ov: 2, og: 1 });
      const wTop = by + 20, wLen = 4;
      MH.rope(w, 'wrope', WX, wTop, WZ, wLen, B.rope);
      const bTop = wTop - wLen;
      const bucket = w.prop({ name: 'bucket', pivot: [WX + 0.5, bTop - 1, WZ + 0.5] });
      bucket.box(WX - 1, bTop - 4, WZ - 1, WX + 1, bTop - 2, WZ + 1, B.cask); bucket.box(WX - 1, bTop - 3, WZ - 1, WX + 1, bTop - 3, WZ + 1, B.iron); bucket.box(WX, bTop - 3, WZ, WX, bTop - 2, WZ, B.waterB); bucket.set(WX, bTop - 1, WZ, B.iron); bucket.set(WX - 1, bTop - 1, WZ, B.iron); bucket.set(WX + 1, bTop - 1, WZ, B.iron);
      acts.push({
        name: '두레박 우물', hint: '밧줄이 풀리며 두레박이 우물 속으로 내려갔다가 물을 가득 길어 올려요', hit: [WX - 5, by + 1, WZ - 5, WX + 5, by + 22, WZ + 5],
        run: async a => {
          const dn = 10;
          await Promise.all([a.move('bucket', [0, -dn, 0], 1.8), a.rope('wrope', wLen, wLen + dn, 1.8)]);
          a.burst([WX + 0.5, by - 6, WZ + 0.5], { n: 16, colors: ['#e0f4ff', '#8ac0f0'], speed: 3, up: 4, life: 0.6, gravity: 16, spread: 1.2 });
          await a.wait(0.6);
          await Promise.all([a.move('bucket', [0, 0, 0], 2.2), a.rope('wrope', wLen, wLen, 2.2)]);
          a.burst([WX + 0.5, bTop + 1, WZ + 0.5], { n: 18, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 3, up: 4, life: 0.8, gravity: 18, spread: 1.6 });
          await a.wait(0.5);
        },
      });
      landmarks.push({ name: '두레박 우물', note: '빵집 반죽 물을 긷는 우물', p: [WX + 0.5, by + 32, WZ + 0.5] });
      lights.push({ p: lampPost(248, bz0 + 44, 10), c: '#ffd890', i: 1.1, d: 26, flicker: 0.1, night: true });

      // ───────── 골목 고양이(부품): 옹벽 난간 위를 따라 사뿐사뿐 걸어간다 ─────────
      const ck = 2, CZ = ck * BAND + 63, capY = lvl(CZ) + 4, cyy = capY + 1, CXc = 200;
      for (let x = CXc - 8; x < W; x++) if (!onStair(x)) { for (let y = capY + 1; y <= capY + 4; y++) for (const z of [CZ - 1, CZ]) w.set(x, y, z, 0); w.set(x, capY, CZ, B.trim); for (let y = capY - 3; y < capY; y++) if (!w.get(x, y, CZ)) w.set(x, y, CZ, B.whiteDk); }
      const cat = w.prop({ name: 'cat', pivot: [CXc + 0.5, cyy, CZ + 0.5] });
      cat.box(CXc - 3, cyy + 1, CZ, CXc + 2, cyy + 2, CZ, B.cat);
      for (const x of [CXc - 3, CXc + 2]) cat.set(x, cyy, CZ, B.cat);
      cat.box(CXc - 1, cyy + 1, CZ, CXc + 1, cyy + 1, CZ, B.catW);
      cat.box(CXc + 3, cyy + 2, CZ, CXc + 4, cyy + 4, CZ, B.cat); cat.set(CXc + 5, cyy + 2, CZ, B.catW); cat.set(CXc + 4, cyy + 3, CZ, B.catE); cat.set(CXc + 3, cyy + 5, CZ, B.cat); cat.set(CXc + 4, cyy + 5, CZ, B.cat);
      cat.set(CXc - 4, cyy + 2, CZ, B.cat); cat.set(CXc - 5, cyy + 3, CZ, B.cat); cat.set(CXc - 5, cyy + 4, CZ, B.cat); cat.set(CXc - 4, cyy + 5, CZ, B.catW);
      acts.push({
        name: '골목 고양이', hint: '주황 고양이가 옹벽 난간 위를 사뿐사뿐 걸어 동쪽 골목 끝 안개 속으로 사라져요', hit: [CXc - 5, cyy, CZ - 2, CXc + 5, cyy + 5, CZ + 2],
        run: async a => {
          const steps = async () => { for (let k = 0; k < 10; k++) { a.burst([CXc + 4 + k * 13, cyy + 1, CZ + 0.5], { n: 4, colors: ['#ffe8c0'], speed: 1.2, up: 2, life: 0.6, gravity: 2, spread: 0.8 }); await a.wait(0.8); } };
          await Promise.all([a.drive('cat', [[20, 0, 0], [52, 0, 0], [88, 0, 0], [124, 0, 0]], 9, { fwd: '+x', back: 1.0 }), steps()]);
        },
      });

      // ───────── 굴뚝 연기 ─────────
      const chims = allHs.filter(h => h.chimney && Math.abs(h.chimney[0] - 168) < 132 && Math.abs(h.chimney[2] - 168) < 128).map(h => h.chimney);
      const c0 = chims.slice().sort((p, q) => (q[2] - Math.abs(q[0] - 200) * 0.5) - (p[2] - Math.abs(p[0] - 200) * 0.5))[0];
      acts.push({
        name: '굴뚝 연기', hint: '저녁밥 짓는 시간, 집집마다 굴뚝에서 연기가 피어올라요', hit: [Math.floor(c0[0]) - 3, Math.floor(c0[1]) - 12, Math.floor(c0[2]) - 3, Math.floor(c0[0]) + 2, Math.floor(c0[1]) - 2, Math.floor(c0[2]) + 2],
        run: async a => {
          for (let k = 0; k < 8; k++) { for (const c of chims) a.burst([c[0], c[1] - 1, c[2]], { n: 4, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 1.2, up: 7, life: 2.4, gravity: -1.2, spread: 1.2 }); await a.wait(0.45); }
        },
      });
      // ───────── 저녁 창불: 아래 단부터 위 단까지 남향 창에 차례로 불이 켜진다 ─────────
      const wins = [], clear = (x, y, z) => { for (let t = 1; t < 80; t++) if (w.get(Math.floor(x + t * 0.45), Math.floor(y + t * 0.56), Math.floor(z + t * 0.69))) return false; return true; };
      for (let z = 1; z < D - 1; z++) for (let x = 0; x < W; x++) for (let y = base; y < base + 128; y++) if (w.get(x, y, z) === B.win && !w.get(x, y, z + 1) && !w.get(x, y, z + 2) && (x + y) % 3 === 0 && (x + z) % 2 === 0 && Math.pow(((x - 168) / 168) ** 4 + ((z - 168) / 168) ** 4, 0.25) < 0.72 && clear(x + 0.5, y + 0.5, z + 2)) wins.push([x + 0.5, y, z + 2]);
      const wh = allHs.filter(h => h.z0 === 3 * BAND + 10 && h.x0 >= 194)[0];
      acts.push({
        name: '저녁 창불', hint: '해가 지면 아래 골목부터 언덕 위까지 창문마다 불이 켜져요', hit: [wh.x0, wh.y + 1, wh.z1, wh.x1, wh.top, wh.z1 + 2],
        run: async a => {
          const o = { n: 4, colors: ['#ffd890', '#fff0c0'], speed: 0.8, up: 1, life: 1.2, gravity: 0, spread: 0.8 };
          for (let k = 4; k >= 0; k--) { wins.filter(p => Math.floor(p[2] / BAND) === k).forEach(p => a.burst(p, o)); await a.wait(0.7); }
          await a.wait(0.6);
        },
      });
      // ───────── 가로등(밤에 켜진다), 들꽃 ─────────
      for (let k = 0; k < 5; k++) for (const lx of [28, 120, 216, 300]) {
        const lz = k * BAND + 55;
        if (lz >= D - 2) continue;
        if (k === 2 && lx === 216) continue;
        const p = lampPost(lx, lz, 10);
        if ((k + lx) % 4 !== 1) lights.push({ p, c: '#ffd890', i: 1.1, d: 26, flicker: 0.1, night: true });
      }
      MH.scatter(w, 2600, (x, gg, z, b) => { if ((b === B.grass || b === B.grass2 || b === B.grass3) && w.chance(0.3)) { const hh = hash3(x, gg, z); if (hh < 0.5) flowerAt(w, x, gg + 1, z, FLW[(hh * 17 | 0) % 6], hh < 0.12); else w.set(x, gg + 1, z, B.flowerLf); } });
      return { lights, landmarks, acts };
    },
  });
})();
