// 대시장 — 계단식 두 광장, 상인 길드 종탑, 지붕 덮인 시장, 이층 분수, 동쪽 장인 골목(대장간 · 계량소) (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 흰 낱돌 축대와 난간, 아치 회랑과 창틀·창살·꽃상자가 있는 길드 회관, 시계판·종루·청기와 첨탑의 종탑, 서까래가 보이는 시장 지붕,
// 돌 꽃잎 수반과 물줄기가 있는 이층 분수, 낱돌 벽 대장간과 벽돌 굴뚝, 기둥 정자의 큰 저울, 반목조 집들, 무늬 돌길. playerScale 2 (사람 키 6.8칸).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'market', cat: 'kingdom', name: '대시장', en: 'Grand Market', color: '#e8a050', seed: 201, base: 44, size: [W, D, Hh],
    playerScale: 2,
    desc: '왕도의 모든 길이 모이는 대시장. 새벽에 종탑의 종이 울리면 천 개의 노점이 문을 연다. 아랫광장 동쪽 장인 골목에서는 대장간 쇠망치 소리와 계량소의 큰 저울이 하루 종일 바쁘다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕도 남문 안쪽'], ['명물', '상인 길드 종탑 · 이층 분수'], ['장인 골목', '대장간 · 계량소의 큰 저울'], ['소문', '길드장은 금화 한 닢도 잊지 않는다']] },
    fog: { start: 0.78, floor: 24, depth: 20 },
    camY: -18, zoom: 1.15,
    particles: [
      { n: 30, colors: ['#9a9aa8', '#e8e8f0'], mode: 'wisp', speed: 2.2, size: 2, y0: 104, glow: false },
      { n: 120, colors: ['#fff4d0'], mode: 'drift', speed: 0.6, y0: 52, y1: 160, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      apple: { c: '#d8403a', v: 0.05 }, orange: { c: '#f09030', v: 0.05 }, melon: { c: '#5a9a3a', v: 0.07 }, bread: { c: '#c8904a', v: 0.07 }, breadTop: { c: '#a86a2a', v: 0.05 },
      clothR: { c: '#c03a5a', v: 0.02 }, clothB: { c: '#3a7ac0', v: 0.02 }, clothY: { c: '#e8c850', v: 0.02 }, clothW: { c: '#f4f0e8', v: 0.02 }, clothG: { c: '#3a8a5a', v: 0.02 },
      pot: { c: '#b8683a', v: 0.07 }, fish: { c: '#b8c8d0', v: 0.07 }, bell: { c: '#c8a050', v: 0.05 }, bellDk: { c: '#a07a34', v: 0.05 }, waterB: { c: '#5aa0d8', v: 0.03 }, face: { c: '#f4f0e0', v: 0.02 },
      ember: { c: '#ff7a2a', glow: true }, coal: { c: '#2a2a30', v: 0.06 }, soot: { c: '#4a4448', v: 0.05, pat: 'stone' }, sack: { c: '#d8c49a', v: 0.06 }, sack2: { c: '#c8b48a', v: 0.05 }, coin: { c: '#f4d060', v: 0.04 },
      pigeon: { c: '#9a9aa8', v: 0.04 }, pigeonN: { c: '#5a7a8a', v: 0.04 }, beakP: { c: '#e8a080', v: 0.03 }, leather: { c: '#7a4a2a', v: 0.05 }, planter: { c: '#a85a3a', v: 0.05 },
      // 2배 해상도용
      st1: { c: '#8e8c88', v: 0.05 }, st2: { c: '#7c7a76', v: 0.05 }, st3: { c: '#9c988e', v: 0.05 }, st4: { c: '#84887c', v: 0.05 }, mortar: { c: '#a49c8c', v: 0.04 }, sill: { c: '#b0aaa0', v: 0.04 },
      sd1: { c: '#5e5c60', v: 0.05 }, sd2: { c: '#4e4c50', v: 0.05 }, sd3: { c: '#6a6662', v: 0.05 },
      ws1: { c: '#e8eaee', v: 0.02 }, ws2: { c: '#d8dae0', v: 0.02 }, ws3: { c: '#f2f2f4', v: 0.02 }, wmortar: { c: '#b4b6be', v: 0.03 },
      sl1: { c: '#b8b4ac', top: '#d8d4ca', v: 0.03 }, sl2: { c: '#b0aca4', top: '#cac6bc', v: 0.03 }, sl3: { c: '#bcb8ae', top: '#e0dcd0', v: 0.03 }, slJ: { c: '#9a968e', top: '#a8a49a', v: 0.03 },
      cb1: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cb2: { c: '#7e7a72', top: '#96928a', v: 0.06 }, cb3: { c: '#948e84', top: '#b4ae9e', v: 0.06 }, cbJ: { c: '#6a665e', top: '#76726a', v: 0.04 },
      fl1: { c: '#6a6660', top: '#7e7a72', v: 0.05 }, fl2: { c: '#625e58', top: '#726e66', v: 0.05 }, flJ: { c: '#4e4a46', top: '#56524c', v: 0.03 },
      frameDk: { c: '#46301e', v: 0.04 }, mullion: { c: '#ece4d0', v: 0.02 }, hinge: { c: '#2e2e34', v: 0.02 }, ironDk: { c: '#33333a', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 }, steel: { c: '#aab0bc', v: 0.04 },
      doorDk: { c: '#3e2616', v: 0.03 }, shutGDk: { c: '#2c563a', v: 0.02 }, shutBDk: { c: '#2c4a74', v: 0.02 }, shutRDk: { c: '#702c1e', v: 0.02 },
      lamp: { c: '#ffe6a8', night: true, day: '#e8e0c0' },
      tile: { c: '#b04a3a', v: 0.05 }, tile2: { c: '#94382c', v: 0.04 }, tile3: { c: '#bc5846', v: 0.05 }, tileDk: { c: '#7a3028', v: 0.05 },
      tileB: { c: '#2e5aa8', v: 0.05 }, tileB2: { c: '#244a90', v: 0.04 }, tileB3: { c: '#3a68b8', v: 0.05 }, tileBDk: { c: '#1e3a70', v: 0.05 },
      tileN: { c: '#7a4a30', v: 0.05 }, tileN2: { c: '#683e26', v: 0.04 }, tileN3: { c: '#8a5838', v: 0.05 }, tileNDk: { c: '#4e2e1c', v: 0.05 },
      tileG: { c: '#3a6a4a', v: 0.05 }, tileG2: { c: '#2e5a3e', v: 0.04 }, tileG3: { c: '#467a56', v: 0.05 }, tileGDk: { c: '#244832', v: 0.05 },
      gutter: { c: '#6a6e72', v: 0.03 }, brick: { c: '#9a4a3a', v: 0.05, pat: 'brick' }, brick2: { c: '#84402f', v: 0.05, pat: 'brick' }, chpot: { c: '#b8643a', v: 0.04 },
      soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, flowerLf: { c: '#5e9e44', v: 0.08 }, flowerStem: { c: '#4a8a34', v: 0.08 }, flowerP: { c: '#e86a8a', v: 0.05 }, flowerV: { c: '#7a8ae8', v: 0.05 },
      crateEdge: { c: '#7a5232', v: 0.04 }, cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      barkDk: { c: '#463020', v: 0.05 }, leafLt: { c: '#8ac25a', v: 0.08 }, logEnd: { c: '#c8a070', v: 0.04 }, water2: { c: '#8ac8f0', v: 0.03 },
    }),
    build(w) {
      const B = w.id, n = w.noise, base = w.base, UP = base + 12, LO = base + 4;
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => base + 2 * (3 + (80 - z / 2) * 0.05 + n.fbm(x * 0.02, z * 0.02) * 0.8),
        surface: () => B.cb1, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock,
      });
      const lights = [], acts = [], landmarks = [], smokes = [];
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));

      // ───────── 공통 도구(2배 해상도용, 물레방아 마을에서 가져와 다듬음) ─────────
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2], WST = [B.ws1, B.ws2, B.ws3, B.ws1, B.ws2, B.ws3], DST = [B.sd1, B.sd2, B.sd3, B.sd1, B.sd2, B.sd3];
      const stoneAt = (u, y, salt, set) => {
        set = set || STONES;
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return set[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const wStone = (u, y, salt) => stoneAt(u, y, salt, WST) || B.wmortar;
      const paveAt = (x, z) => {   // 아랫광장 돌길: 4×3칸 돌, 1칸 줄눈
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.cbJ;
        return [B.cb1, B.cb2, B.cb3][(hash3(Math.floor((x + off) / 4), row, 7) * 3) | 0];
      };
      const slabAt = (x, z) => {   // 윗광장 판석: 8×6칸, 줄마다 엇갈림
        const row = Math.floor(z / 6), off = (row & 1) * 4;
        if (z % 6 === 5 || (x + off) % 8 === 7) return B.slJ;
        return [B.sl1, B.sl2, B.sl3][(hash3(Math.floor((x + off) / 8), row, 9) * 3) | 0];
      };
      const flagAt = (x, z) => {   // 장인 골목: 짙은 판석
        const row = Math.floor(z / 4), off = (row & 1) * 3;
        if (z % 4 === 3 || (x + off) % 6 === 5) return B.flJ;
        return hash3(Math.floor((x + off) / 6), row, 13) > 0.5 ? B.fl1 : B.fl2;
      };
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); }, get: (x, y, z) => p.get(x, y, z) });
      const disc = (T, cx, cz, y, r, b, r0) => { const R = Math.ceil(r); for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) { const d = Math.hypot(dx, dz); if (d <= r && d > (r0 || -1)) T.set(cx + dx, y, cz + dz, typeof b === 'function' ? b(dx, dz, d) : b); } };
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
        const h = o.h, R0 = o.trunkR || 1.8, L = [B.leaf2, B.leaf, B.leafDk];
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.55 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, streak ? B.barkDk : B.bark);
          }
        }
        for (let k = 0; k < 5; k++) { const a = k * 1.2566 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2.5; w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, B.barkDk, t => t < 0.5 ? 1 : 0.6); }
        const nB = o.branches || 5, r = o.r || 7, ends = [[x, y + h + 1, z, 1.15]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * w.r(0.45, 0.7);
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(w, ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 3; q++) { const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75; clump(w, ex + Math.cos(a) * dd, ey + 1 + (q - 1) * rc * 0.3, ez + Math.sin(a) * dd, rc * 0.62, L); }
        });
      };
      const sack = (T, x, y, z, b) => {
        b = b || B.sack;
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = (dx !== 1 && dz !== 1);
          if (!corner) T.set(x + dx, y, z + dz, b);
          T.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? b : B.sack2);
          if (!corner) T.set(x + dx, y + 2, z + dz, b);
        }
        T.set(x + 1, y + 3, z + 1, B.rope); T.set(x + 1, y + 4, z + 1, B.sack2);
      };
      const barrel = (T, x, y, z, ht) => {   // 가운데 (x,z), 볼록한 통, 쇠테 둘, 뚜껑
        ht = ht || 7;
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
            T.set(x + dx, y + r, z + dz, b);
          }
        }
      };
      const crate = (T, x, y, z, s) => {
        s = s || 4;
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      // 가로등: 돌 받침, 쇠기둥과 고리, 유리 등롱(모서리 쇠살), 갓과 꼭지
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
          if ((a === 0 || a === 6) && b2 !== 1) w.set(px, y, pz, B.iron);
          if (b2 === (back > 0 ? 2 : 0)) { if (a === 0 || a === 6 || a === 3) w.box(px, y + 2, pz, px, y + 4, pz, B.iron); else { w.set(px, y + 3, pz, B.plank); w.set(px, y + 4, pz, B.plank); } }
        }
      };
      const FLW = [B.flowerR, B.flowerY, B.flowerW, B.flowerP, B.flowerV];

      // ───────── 집 ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      // 창: 5폭 유리, 창살과 가로살, 창틀, 창턱, (덧문·경첩), (꽃상자)
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, o.frame || B.frame); put(sd, wu + 5, wy + r, 1, o.frame || B.frame); }
        for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh, 1, o.frame || B.frame);
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy - 1, 1, B.sill); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.sill); }
        if (o.shutter) for (const c0 of [-3, 6]) for (let c = 0; c < 2; c++) for (let r = 0; r < wh; r++) {
          put(sd, wu + c0 + c, wy + r, 1, r % 2 ? o.shutter : o.shutterDk);
          if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
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
      // 문: 5폭 9높이, 테두리 살 + 움푹한 판, 놋 손잡이, 문틀, (돌계단), (벽 등롱)
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
        if (o.steps) {
          for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
            const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
            for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
            for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
          }
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
      // 박공지붕: 겹 쌓인 기와(이음줄 엇갈림), 두꺼운 처마, 용마루, 박공널, 물받이·홈통, 박공창. o.pal: [기와, 이음, 밝은, 처마]
      const RED = [B.tile, B.tile2, B.tile3, B.tileDk], BLUE = [B.tileB, B.tileB2, B.tileB3, B.tileBDk], BRN = [B.tileN, B.tileN2, B.tileN3, B.tileNDk], GRN = [B.tileG, B.tileG2, B.tileG3, B.tileGDk];
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, pal = o.pal || RED;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            P(a, l, ry, s === 0 ? pal[3] : o.simple ? (s % 3 === 2 ? pal[1] : pal[0]) : seam ? pal[1] : (hash3(l >> 2, s, 5) > 0.72 ? pal[2] : pal[0]));
            P(a, l, ry - 1, pal[3]);
            if (s === sMax) P(a, l, ry + 1, pal[3]);
            if (o.gable && a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        if (o.gable) {
          const mid = (A0 + A1) / 2, midA = Math.floor(mid);
          for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
            for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
            for (let a = A0 + 1; a <= A1 - 1; a++) { const s = Math.min(a - a0, a1 - a), ry = y0 + s; if (ry - 2 > top) P(a, out, ry - 2, B.frame); }
            if (o.nowin) continue;
            const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35)), odd = (A1 - A0) % 2 === 0;
            for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy + r, 0); }
            for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
            for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, B.frame); P(midA + (odd ? 2 : 3), out, gy + r, B.frame); }
          }
        }
        if (o.gutter) for (const [ae, sg] of [[a0 - 1, -1], [a1 + 1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const aw = sg < 0 ? A0 - 1 : A1 + 1;
          P(ae, g0 + 1, y0 - 2, B.gutter);
          for (let y = y0 - 2; y >= o.foot; y--) P(aw, g0 + 1, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      // 모임지붕(사방으로 처마): 줄마다 기와 이음 엇갈림
      const hipRoof = (x0, x1, z0, z1, y, pal) => {
        let s = 0;
        while (x0 + s <= x1 - s && z0 + s <= z1 - s) {
          for (let x = x0 + s; x <= x1 - s; x++) for (let z = z0 + s; z <= z1 - s; z++) {
            if (x !== x0 + s && x !== x1 - s && z !== z0 + s && z !== z1 - s) continue;
            const u = (z === z0 + s || z === z1 - s) ? x : z, seam = ((u + (s & 1) * 2) & 3) === 0, corner = (x === x0 + s || x === x1 - s) && (z === z0 + s || z === z1 - s);
            w.set(x, y + s, z, s === 0 || corner ? pal[3] : seam ? pal[1] : (hash3(u >> 2, s, 7) > 0.72 ? pal[2] : pal[0]));
            w.set(x, y + s - 1, z, pal[3]);
          }
          s++;
        }
        return y + s;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, hash3(cx + dx, y, cz + dz) > 0.75 ? B.brick2 : B.brick);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(cx + dx, y, cz + dz, B.brick2);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.sill);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) w.box(px, yt + 1, pz, px, yt + 2, pz, B.chpot);
        return [cx + 2, yt + 3, cz + 2];
      };
      // 집: 낱돌 기초, 반목조 층(들보·샛기둥·가새), 창, 문, 박공지붕
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall || B.plaster, sh = o.shut || [B.shutG, B.shutGDk];
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, o.simple ? B.found : (stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0)));
          }
        }
        let e = 0, yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const ePrev = e;
          if (o.jetty && f > 0) e = 2;
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            if (o.skip && o.skip.includes(k)) continue;
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0, plain = o.plain && o.plain.includes(k);
            const nW = Math.max(1, Math.floor((L + 2) / 12)), wins = [];
            if (!plain) for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 13) continue;
              if (o.hole && k === o.hole[0] && f === fl - 1 && Math.abs(c - o.hole[1]) < 8) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || (isDoor && Math.abs(u - cu) <= 4) || (o.hole && k === o.hole[0] && Math.abs(u - o.hole[1]) <= 4);
            for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb, 1, B.frame); put(sd, u, yb + 1, 1, B.frame); put(sd, u, yb + fh - 1, 1, B.frame); }
            for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0 - 1, sd.u0, sd.u1, sd.u1 + 1]) put(sd, u, y, 1, B.frameDk);
            if (!plain) {
              for (let u = sd.u0 + 6; u <= sd.u1 - 3; u += 6) if (!busy(u)) for (let y = yb + 2; y < yb + fh - 1; y++) put(sd, u, y, 1, B.frame);
              for (const [ua, ub] of [[sd.u0 + 1, sd.u0 + 5], [sd.u1 - 1, sd.u1 - 5]]) {
                if (busy(ua) || busy(ub)) continue;
                for (let k2 = 0; k2 <= fh - 4; k2++) { const t = k2 / (fh - 4); put(sd, Math.round(ua + (ub - ua) * t), yb + 2 + k2, 1, B.frame); }
              }
            }
            if (e > ePrev) for (let u = sd.u0; u <= sd.u1; u += 3) { put(sd, u, yb - 1, 0, B.frameDk); put(sd, u, yb - 1, -1, B.frameDk); }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: sh[0], shutterDk: sh[1], box: o.box ? (f === 0 ? 1 : 2) : 0 });
            if (isDoor) { const r = doorAt(sd, cu, yb, { steps: true, lantern: o.lantern }); out.door = r.door; out.lamp = r.lamp; }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, pal: o.pal, gable: wall, gutter: true, foot: gy + 3, simple: o.simple });
        out.top = top; out.e = e;
        if (o.chimney) {
          const cx = axis === 'x' ? X0 + 3 : Math.floor((X0 + X1) / 2) - 1, cz = axis === 'x' ? Math.floor((Z0 + Z1) / 2) - 1 : Z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };
      // 도시 블록: 사각 영역을 반목조 집들로 채운다(가장자리 안개 속으로 이어지는 도시)
      const WALLS = [B.plaster, B.plasterB, B.plasterP, B.plasterG, B.plasterY], PALS = [RED, BLUE, BRN, GRN, RED], SHUTS = [[B.shutG, B.shutGDk], [B.shutB, B.shutBDk], [B.shutR, B.shutRDk]];
      const blockHD = (x0, z0, x1, z1, face, o) => {
        const alongX = face === 's' || face === 'n', end = alongX ? x1 : z1, res = [];
        let p = alongX ? x0 : z0;
        while (p < end - 14) {
          let len = w.ri(o.min || 20, o.max || 26);
          if (end - (p + len) < 16) len = end - p + 1;
          const k = res.length + (o.seed || 0);
          const back = { s: 'n', n: 's', e: 'w', w: 'e' }[face];
          const h = house({ x: alongX ? p : x0, z: alongX ? z0 : p, sx: alongX ? len : x1 - x0 + 1, sz: alongX ? z1 - z0 + 1 : len,
            floors: o.floors ? o.floors[k % o.floors.length] : 2 + (k % 2), fh: 12, face, jetty: k % 3 === 1, pal: PALS[k % PALS.length], wall: WALLS[k % WALLS.length], shut: SHUTS[k % 3],
            simple: true, chimney: k % 2 === 0, box: !o.far && k % 2 === 1, y: o.y, lantern: k % 3 === 0, plain: o.far ? ['s', 'n', 'e', 'w'].filter(q => q !== face) : [back].concat(o.sides || []), axis: k % 2 ? (alongX ? 'z' : 'x') : (alongX ? 'x' : 'z') });
          res.push(h);
          if (h.chimney && smokes.length < 4 && k % 4 === 0) smokes.push(h.chimney);
          p += len + (o.gap != null ? o.gap : 3);
        }
        return res;
      };
      const doorLights = (hs, every) => hs.forEach((h, k) => { if (h.lamp && k % (every || 2) === 0) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 18, flicker: 0.1, night: true }); });

      // ───────── 땅: 윗광장(길드 앞) · 아랫광장(노점) · 축대와 계단 ─────────
      MH.flatten(w, 54, 56, 296, 139, UP, B.sl1, B.found);
      MH.flatten(w, 52, 144, 321, 257, LO, B.cb1, B.found);
      for (let z = 140; z <= 143; z++) for (let x = 52; x <= 297; x++) MH.setH(w, x, z, LO, B.cb2, B.found);
      for (let z = 56; z <= 139; z++) for (let x = 54; x <= 296; x++) MH.paint(w, x, z, slabAt(x, z));
      for (let z = 144; z <= 257; z++) for (let x = 52; x <= 247; x++) MH.paint(w, x, z, paveAt(x, z));
      // 윗광장 바닥 무늬: 종탑 축을 따라 흰 띠(테두리 회색)
      for (let z = 114; z <= 137; z++) for (let x = 140; x <= 157; x++) MH.paint(w, x, z, (x <= 141 || x >= 156) ? B.whiteDk : ((x + z) % 8 === 0 ? B.gold : B.trim));
      // 축대: 흰 낱돌 벽, 붙임기둥, 갓돌, 난간 동자와 손잡이
      for (let x = 54; x <= 297; x++) {
        if (x > 125 && x < 172) continue;
        for (let y = LO + 1; y <= UP; y++) { w.set(x, y, 140, B.white); w.set(x, y, 141, wStone(x, y, 41)); }
        w.set(x, UP + 1, 139, B.trim); w.set(x, UP + 1, 140, B.trim); w.set(x, UP + 1, 141, B.trim); w.set(x, UP, 142, B.trim);
        if (x % 12 === 0) { w.box(x, LO + 1, 142, x + 1, UP - 1, 142, B.ws2); w.box(x, UP + 2, 140, x + 1, UP + 6, 141, B.white); w.box(x - 1, UP + 7, 139, x + 2, UP + 7, 142, B.trim); }
        else { if (x % 2 === 0) w.box(x, UP + 2, 140, x, UP + 4, 140, B.whiteDk); w.set(x, UP + 5, 140, B.trim); w.set(x, UP + 5, 141, B.trim); }
      }
      // 큰 계단(윗광장 → 아랫광장): 한 단 1칸, 디딤 2칸
      for (let s = 0; s < 7; s++) for (let z = 140 + s * 2; z <= 141 + s * 2; z++) for (let x = 126; x <= 171; x++) MH.setH(w, x, z, UP - 1 - s, z % 2 ? B.whiteDk : B.trim, B.found);
      for (let x = 126; x <= 171; x++) MH.paint(w, x, 139, B.trim);
      for (const px of [120, 172]) {   // 계단 양옆 기둥: 흰 돌, 갓돌, 금빛 단지
        for (let y = LO + 1; y <= UP + 8; y++) for (let z = 138; z <= 155; z++) for (let x = px; x <= px + 5; x++) {
          const top = UP + 8 - Math.max(0, Math.floor((z - 143) * 0.6));
          if (z > 143 && y > top) continue;
          const edge = x === px || x === px + 5 || z === 138 || z === 155;
          w.set(x, y, z, edge ? wStone(x === px || x === px + 5 ? z : x, y, 43) : B.white);
        }
        w.box(px - 1, UP + 9, 137, px + 6, UP + 9, 144, B.trim); w.box(px, UP + 10, 138, px + 5, UP + 10, 143, B.whiteDk);
        w.box(px + 2, UP + 11, 140, px + 3, UP + 11, 141, B.gold); w.box(px + 1, UP + 12, 139, px + 4, UP + 14, 142, B.gold); w.box(px + 2, UP + 15, 140, px + 3, UP + 16, 141, B.gold);
      }
      const lights0 = lights.length;

      // ───────── 둘레의 도시 블록 ─────────
      doorLights(blockHD(80, 6, 224, 28, 's', { seed: 1, floors: [3, 2, 3], far: true }), 2);
      doorLights(blockHD(52, 32, 300, 54, 's', { seed: 6, floors: [2, 3, 2], y: UP + 1, sides: ['w'] }), 3);
      doorLights(blockHD(24, 60, 48, 262, 'e', { seed: 2, sides: ['n'] }), 2);
      doorLights(blockHD(250, 60, 274, 136, 'w', { seed: 3, y: UP + 1 }), 2);
      blockHD(28, 266, 140, 288, 'n', { seed: 4, sides: ['e'] }); blockHD(164, 266, 290, 288, 'n', { seed: 5, sides: ['w'] });

      // ───────── 상인 길드 회관: 흰 낱돌 1층과 아치 회랑, 반목조 2·3층, 기와지붕과 지붕창 ─────────
      const g0 = UP + 1, GX0 = 80, GX1 = 217, GZ0 = 68, GZ1 = 105, F1 = g0 + 14, F2 = g0 + 27, GT = g0 + 40;
      const GS = SIDES(GX0, GZ0, GX1, GZ1);
      w.box(GX0, g0, GZ0, GX1, GT - 1, GZ1, B.plasterY);
      for (const k of ['s', 'n', 'e', 'w']) {
        const sd = GS[k];
        for (let u = sd.u0; u <= sd.u1; u++) {
          for (let y = g0; y < F1; y++) put(sd, u, y, 0, y === g0 ? B.ws2 : wStone(u, y, 51));
          put(sd, u, F1 - 1, 1, B.trim); put(sd, u, F1, 1, B.frameDk); put(sd, u, F1 + 1, 1, B.frame);
          put(sd, u, F2 - 1, 1, B.frame); put(sd, u, F2, 1, B.frameDk); put(sd, u, GT - 1, 1, B.frameDk);
          if ((u - sd.u0) % 10 === 0 || u === sd.u1) for (let y = F1 + 2; y < GT - 1; y++) if (y !== F2 - 1 && y !== F2) put(sd, u, y, 1, B.frame);
        }
      }
      // 남쪽 정면: 칸마다(10칸) 위층 창 둘, 1층은 문과 진열창이 번갈아
      const bays = [];
      for (let c = GX0 + 5; c <= GX1 - 5; c += 10) bays.push(c);
      const MAINC = 145;
      bays.forEach((c, i) => {
        for (const fy of [F1 + 3, F2 + 3]) windowAt(GS.s, c - 2, fy, 7, { box: fy === F1 + 3 });
        if (c === MAINC) return;
        if (i % 2 === 0) doorAt(GS.s, c, g0 + 1, {});
        else windowAt(GS.s, c - 2, g0 + 3, 7, { frame: B.frameDk });
      });
      for (const c of [GZ0 + 8, GZ0 + 19, GZ0 + 30]) for (const k of ['e', 'w']) for (const fy of [g0 + 3, F1 + 3, F2 + 3]) windowAt(GS[k], c - 2, fy, 7, { box: fy === F1 + 3 });
      for (const c of bays) if ((c - 5) % 20 === 0) for (const fy of [F1 + 3, F2 + 3]) windowAt(GS.n, c - 2, fy, 7, {});
      // 길드 문장판(금빛 저울 무늬): 위층 창 사이
      for (const bx of [100, 130, 170, 200]) {
        w.box(bx - 1, F1 + 2, GZ1 + 1, bx + 1, F1 + 9, GZ1 + 1, B.frameDk);
        w.box(bx, F1 + 3, GZ1 + 2, bx, F1 + 8, GZ1 + 2, B.gold); w.set(bx - 1, F1 + 8, GZ1 + 2, B.gold); w.set(bx + 1, F1 + 8, GZ1 + 2, B.gold);
        w.set(bx - 1, F1 + 5, GZ1 + 2, B.gold); w.set(bx + 1, F1 + 5, GZ1 + 2, B.gold); w.set(bx, F1 + 9, GZ1 + 2, B.bell); w.box(bx - 1, F1 + 3, GZ1 + 2, bx + 1, F1 + 3, GZ1 + 2, B.gold);
      }
      // 정문(종탑 축): 아치 테, 두 짝 판자문(쇠징·금빛 고리), 문 위 금빛 테
      { const dx0 = MAINC - 3, dx1 = MAINC + 3;
        for (let x = dx0 - 1; x <= dx1 + 1; x++) for (let y = g0 + 1; y <= g0 + 13; y++) {
          const d = x - MAINC, top = g0 + 10 + Math.round(Math.sqrt(Math.max(0, 9.5 - d * d)) * 0.9);
          if (x < dx0 || x > dx1) { if (y <= g0 + 10) w.set(x, y, GZ1 + 1, B.gold); continue; }
          if (y > top + 1) continue;
          if (y === top + 1) { w.set(x, y, GZ1 + 1, B.gold); w.set(x, y, GZ1, B.ws2); continue; }
          w.set(x, y, GZ1, 0);
          const stile = x === dx0 || x === dx1 || x === MAINC || y === g0 + 1 || y === top || y === g0 + 6;
          w.set(x, y, GZ1 - 1, stile ? B.doorDk : B.door);
          if (!stile && (y - g0) % 3 === 0 && (x - dx0) % 2 === 1) w.set(x, y, GZ1, B.ironDk);
        }
        w.set(MAINC - 1, g0 + 6, GZ1, B.gold); w.set(MAINC + 1, g0 + 6, GZ1, B.gold);
        w.box(MAINC - 5, g0 + 14, GZ1 + 1, MAINC + 5, g0 + 14, GZ1 + 1, B.gold); w.set(MAINC, g0 + 15, GZ1 + 1, B.bell);
      }
      // 회랑: 단(1칸), 기둥(벽까지 이어진 흰 돌 기둥), 아치, 지붕, 쇠 난간
      for (let z = GZ1 + 1; z <= GZ1 + 7; z++) for (let x = GX0 - 1; x <= GX1 + 1; x++) MH.setH(w, x, z, g0, z === GZ1 + 7 ? B.trim : ((x >> 2) + (z >> 1)) % 2 ? B.sl1 : B.sl2, B.found);
      const AY = g0 + 13;
      for (let x = GX0; x <= GX1; x++) {
        const k = (x - GX0) % 10, pier = k <= 1 || x >= GX1 - 1;
        for (let z = GZ1 + 1; z <= GZ1 + 6; z++) {
          if (pier) { for (let y = g0 + 1; y <= AY; y++) w.set(x, y, z, y <= g0 + 2 ? B.ws2 : y >= AY - 1 ? B.trim : B.white); continue; }
          w.set(x, AY + 1, z, B.whiteDk);
        }
        const portal = x > MAINC - 4 && x < MAINC + 5;   // 정문 칸: 아치 없이 높게 트고 지붕도 열어 문이 보이게
        if (portal) { for (let z = GZ1 + 1; z <= GZ1 + 5; z++) w.set(x, AY + 1, z, 0); w.box(x, AY + 1, GZ1 + 6, x, AY + 2, GZ1 + 6, B.whiteDk); w.set(x, AY + 2, GZ1 + 7, B.trim); const ph = AY + 3 + Math.floor(5 - Math.abs(x - (MAINC + 0.5))); for (let y = AY + 3; y <= ph; y++) w.set(x, y, GZ1 + 6, y === ph ? B.gold : B.white); continue; }
        if (!pier) {   // 반원 아치(앞 두 겹)
          const mid = GX0 + Math.floor((x - GX0) / 10) * 10 + 5.5, top = g0 + 9 + Math.round(Math.sqrt(Math.max(0, 16 - (x - mid) ** 2)) * 0.9);
          for (let y = top; y <= AY; y++) { w.set(x, y, GZ1 + 6, y === top ? B.whiteDk : B.white); w.set(x, y, GZ1 + 5, y === top ? B.whiteDk : 0); }
        }
        w.set(x, AY + 1, GZ1 + 6, B.whiteDk); w.set(x, AY + 2, GZ1 + 6, B.whiteDk); w.set(x, AY + 2, GZ1 + 7, B.trim); w.set(x, AY + 1, GZ1 + 7, B.trim);
        if (x % 2 === 0) w.box(x, AY + 3, GZ1 + 6, x, AY + 4, GZ1 + 6, B.iron);
        w.set(x, AY + 5, GZ1 + 6, B.ironDk);
        if (k === 0) w.box(x, AY + 3, GZ1 + 6, x + 1, AY + 6, GZ1 + 6, B.white);
      }
      for (let z = GZ1 + 1; z <= GZ1 + 6; z++) for (let x = GX0; x <= GX1; x++) if (w.get(x, AY + 1, z) === 0 && !(x > MAINC - 4 && x < MAINC + 5)) w.set(x, AY + 1, z, B.whiteDk);
      // 지붕: 붉은 기와, 박공벽, 지붕창 넷, 벽돌 굴뚝 넷
      const gpk = roof(GX0, GX1, GZ0, GZ1, GT, { axis: 'x', pal: RED, gable: B.plasterY, ov: 3, og: 2, gutter: true, foot: g0 + 14 });
      for (const dx of [100, 120, 180, 200]) {
        const dz0 = GZ1 - 8, dz1 = GZ1 + 1, dy0 = GT - 2, dy1 = GT + 8;
        w.box(dx - 4, dy0, dz0, dx + 4, dy1, dz1, B.plasterY);
        for (let y = dy0; y <= dy1; y++) { w.set(dx - 4, y, dz1, B.frameDk); w.set(dx + 4, y, dz1, B.frameDk); }
        windowAt(GS.s, dx - 2, dy0 + 3, 5, { frame: B.frameDk });
        for (let x = dx - 4; x <= dx + 4; x++) for (let z = dz0; z <= dz1; z++) w.set(x, dy0 + 2, z, w.get(x, dy0 + 2, z) === B.sill ? B.sill : w.get(x, dy0 + 2, z));
        roof(dx - 4, dx + 4, dz0, dz1 + 1, dy1 + 1, { axis: 'z', pal: RED, gable: B.plasterY, ov: 2, og: 1, nowin: true });
      }
      for (const cx of [92, 112, 184, 204]) smokes.push(chimney(cx, GZ0 + 6, GT - 4, gpk + 6));
      // 회랑 간판(부품): 기둥 위에서 내민 쇠팔에 매달려 흔들린다
      const signs = [[98, 'apple'], [118, 'bread'], [178, 'fish'], [198, 'pot']];
      const SZ = GZ1 + 11;
      signs.forEach(([sx, kind], k) => {
        w.box(sx, AY + 1, GZ1 + 8, sx, AY + 1, SZ, B.iron); w.line(sx, AY - 3, GZ1 + 7, sx, AY, GZ1 + 10, B.iron);
        w.set(sx, AY + 2, SZ, B.ironDk);
        const p = w.prop({ name: 'sign' + k, pivot: [sx + 0.5, AY + 1, SZ + 0.5], axis: 'x', rock: 0.05, rockSpeed: 1.3, phase: k });
        p.set(sx - 2, AY, SZ, B.iron); p.set(sx + 2, AY, SZ, B.iron); p.set(sx - 2, AY - 1, SZ, B.ironDk); p.set(sx + 2, AY - 1, SZ, B.ironDk);
        for (let r = 0; r < 7; r++) for (let c = -3; c <= 3; c++) {
          const y = AY - 2 - r, edge = r === 0 || r === 6 || c === -3 || c === 3;
          let b = edge ? B.frame : B.plank;
          if (!edge) {
            const ic = c + 1, ir = r - 1;   // 3×5 그림(가운데)
            if (kind === 'apple') { if (Math.hypot(c, r - 3.4) < 1.8) b = B.apple; if (c === 0 && r === 1) b = B.wood; if (c === 1 && r === 1) b = B.leaf; }
            if (kind === 'bread') { if (r >= 2 && r <= 4 && Math.abs(c) <= 2 - (r === 2 ? 1 : 0)) b = r === 2 ? B.breadTop : B.bread; }
            if (kind === 'fish') { if (r === 3 && Math.abs(c) <= 2) b = B.fish; if (r === 2 && c >= -1 && c <= 1) b = B.fish; if (r === 4 && c >= -1 && c <= 1) b = B.fish; if (c === 2 && r !== 3 && r >= 2 && r <= 4) b = B.fish; if (c === -1 && r === 3) b = B.ironDk; }
            if (kind === 'pot') { if (r >= 3 && r <= 5 && Math.abs(c) <= 1 + (r === 4 ? 1 : 0)) b = B.pot; if (r === 2 && Math.abs(c) <= 1) b = B.pot; if (r === 1 && Math.abs(c) <= 2) b = B.pot; }
            void ic; void ir;
          }
          p.set(sx + c, y, SZ, b);
        }
      });
      acts.push({
        name: '상점 간판', hint: '돌풍이 불어 회랑의 간판들이 삐걱삐걱 흔들려요', hit: [94, AY - 9, GZ1 + 7, 202, AY + 2, SZ + 1],
        run: async a => {
          a.wind(3, 3.4);
          for (const amp of [0.7, 0.55, 0.4, 0.22]) { await Promise.all(signs.map((s, k) => a.turn('sign' + k, [amp * (k % 2 ? -1 : 1), 0, 0], 0.4))); await Promise.all(signs.map((s, k) => a.turn('sign' + k, [-amp * (k % 2 ? -1 : 1), 0, 0], 0.4))); }
          await Promise.all(signs.map((s, k) => a.turn('sign' + k, [0, 0, 0], 0.4)));
        },
      });
      // 회관 정문 → 하위 지도(길드 회관 안)
      acts.push(OR.goAct({ at: [MAINC, g0 + 1, GZ1 + 3], h: 10, name: '상인 길드 회관 안으로', goto: 'market-guildhall', hint: '종탑 아래 정문을 밀고 대회의장과 경매장, 금고가 있는 길드 회관 안으로 들어가요', hit: [MAINC - 3, g0 + 1, GZ1 - 1, MAINC + 3, g0 + 12, GZ1 + 2] }));
      lights.push({ name: 'guild', p: [MAINC - 9.5, F1 + 6, GZ1 + 2.5], c: '#ffd890', i: 1.2, d: 64, flicker: 0.1 });
      // 회랑 등롱: 아치마다 천장에 매단 작은 등
      for (const c of bays) { w.set(c, AY, GZ1 + 3, B.ironDk); w.set(c, AY - 1, GZ1 + 3, B.iron); w.box(c, AY - 3, GZ1 + 3, c, AY - 2, GZ1 + 3, B.lamp); w.set(c, AY - 4, GZ1 + 3, B.ironDk); }
      for (const c of [MAINC - 20, MAINC + 20]) lights.push({ p: [c + 0.5, AY - 2.5, GZ1 + 3.5], c: '#ffd890', i: 0.9, d: 22, flicker: 0.1, night: true });
      acts.push({
        name: '길드 회관 창불', hint: '회관 창마다 아래층부터 차례로 등불이 켜져요', hit: [GX0, F1, GZ1, GX1, GT, GZ1 + 2],
        run: async a => {
          a.flash('guild', 4, 4.5);
          const o = { n: 7, colors: ['#ffd890', '#fff0c0'], speed: 1.2, up: 1.2, life: 1, gravity: 0, spread: 1.2 };
          for (const fy of [g0 + 3, F1 + 3, F2 + 3]) { bays.forEach((c, i) => { if (fy !== g0 + 3 || i % 2) a.burst([c + 0.5, fy + 4, GZ1 + 2], o); }); await a.wait(0.6); }
          for (const dx of [100, 120, 180, 200]) a.burst([dx + 0.5, GT + 3, GZ1 + 3], o);
          await a.wait(0.8);
        },
      });

      // ───────── 종탑: 흰 낱돌 몸통, 시계판, 발코니, 종루, 청기와 첨탑 ─────────
      const BX = 140, BZ = 76, BS = 18, TH = 96, BC = BX + 9;   // 몸통 BX..BX+18
      const TS = SIDES(BX, BZ, BX + BS, BZ + BS);
      for (let y = g0; y <= g0 + TH; y++) for (let z = BZ; z <= BZ + BS; z++) for (let x = BX; x <= BX + BS; x++) {
        const edge = x === BX || x === BX + BS || z === BZ || z === BZ + BS;
        if (!edge) { if (y > GT + 20 && y < g0 + 75) continue; w.set(x, y, z, B.white); continue; }
        const corner = (x === BX || x === BX + BS) && (z === BZ || z === BZ + BS);
        w.set(x, y, z, corner && ((y >> 1) & 1) ? B.ws3 : wStone(z === BZ || z === BZ + BS ? x : z, y, 61));
      }
      // 모서리 붙임기둥, 띠 돌림, 좁은 아치창
      for (const [cx, cz] of [[BX - 2, BZ - 2], [BX + BS + 1, BZ - 2], [BX - 2, BZ + BS + 1], [BX + BS + 1, BZ + BS + 1]]) {
        w.box(cx, GT, cz, cx + 1, g0 + 68, cz + 1, B.whiteDk); w.box(cx, g0 + 69, cz, cx + 1, g0 + 72, cz + 1, B.trim); w.box(cx, g0 + 73, cz, cx + 1, g0 + 74, cz + 1, B.gold);
      }
      for (const y of [g0 + 44, g0 + 68]) w.walls(BX - 1, y, BZ - 1, BX + BS + 1, y, BZ + BS + 1, B.whiteDk);
      for (const k of ['n', 'e', 'w']) for (const wy of [g0 + 46, g0 + 56]) {
        const sd = TS[k];
        for (let r = 0; r < 7; r++) for (let c = -1; c <= 1; c++) { if (r === 6 && c !== 0) continue; put(sd, BC + c, wy + r, 0, c === 0 && r < 6 ? B.mullion : B.win); }
        for (let c = -2; c <= 2; c++) put(sd, BC + c, wy - 1, 1, B.trim);
        for (let r = 0; r < 7; r++) { put(sd, BC - 2, wy + r, 1, B.whiteDk); put(sd, BC + 2, wy + r, 1, B.whiteDk); }
        put(sd, BC - 1, wy + 7, 1, B.whiteDk); put(sd, BC + 1, wy + 7, 1, B.whiteDk); put(sd, BC, wy + 8, 1, B.gold);
      }
      // 시계판(남쪽): 금빛 테, 열두 눈금, 아래 받침판
      const CY0 = g0 + 60, CZF = BZ + BS + 1;
      for (let v = -8; v <= 8; v++) for (let u = -8; u <= 8; u++) {
        const d = Math.hypot(u, v); if (d > 7.6) continue;
        const ang = Math.atan2(v, u), tick = d > 5 && d <= 6.4 && Math.abs(((ang / (Math.PI / 6)) % 1 + 1) % 1 - 0.5) > 0.38;
        w.set(BC + u, CY0 + v, CZF, d > 6.6 ? B.gold : tick ? B.iron : B.face);
      }
      for (const [u, v] of [[0, 5], [0, -5], [5, 0], [-5, 0]]) w.set(BC + u, CY0 + v, CZF, B.gold);
      w.box(BC - 4, CY0 - 10, CZF, BC + 4, CY0 - 9, CZF, B.trim);
      const hands = w.prop({ name: 'hands', pivot: [BC + 0.5, CY0 + 0.5, CZF + 1.5], axis: 'z', speed: -0.03 });
      hands.box(BC, CY0 + 1, CZF + 1, BC, CY0 + 6, CZF + 1, B.ironDk); hands.set(BC, CY0 + 7, CZF + 1, B.iron);
      hands.box(BC + 1, CY0, CZF + 1, BC + 4, CY0, CZF + 1, B.ironDk); hands.set(BC, CY0, CZF + 1, B.gold);
      acts.push({
        name: '길드 시계', hint: '시곗바늘이 빙글빙글 돌아 정오를 가리키고 금빛이 반짝여요', hit: [BC - 7, CY0 - 7, CZF, BC + 7, CY0 + 7, CZF + 2],
        run: async a => {
          await a.turn('hands', [0, 0, -Math.PI * 4], 2.6); a.unwind('hands');
          for (let k = 0; k < 3; k++) { a.burst([BC + 0.5, CY0 + 0.5, CZF + 2], { n: 24, colors: ['#ffe8a0', '#e8c04a', '#ffffff'], speed: 8, up: 4, life: 1.3, gravity: 2, spread: 5 }); await a.turn('hands', [0, 0, -0.3], 0.25); await a.turn('hands', [0, 0, 0], 0.25); }
        },
      });
      // 발코니: 내민 바닥, 난간 동자, 손잡이
      for (let z = BZ - 3; z <= BZ + BS + 3; z++) for (let x = BX - 3; x <= BX + BS + 3; x++) {
        const out = x < BX || x > BX + BS || z < BZ || z > BZ + BS; if (!out) continue;
        w.set(x, g0 + 69, z, B.whiteDk); w.set(x, g0 + 70, z, B.trim);
        const rim = x === BX - 3 || x === BX + BS + 3 || z === BZ - 3 || z === BZ + BS + 3;
        if (rim) { if ((x + z) % 2 === 0) w.box(x, g0 + 71, z, x, g0 + 72, z, B.whiteDk); w.set(x, g0 + 73, z, B.trim); }
      }
      for (let z = BZ - 2; z <= BZ + BS + 2; z += 2) for (const x of [BX - 2, BX + BS + 2]) w.set(x, g0 + 68, z, B.ws2);
      // 종루: 네 면마다 아치 둘(가운데 기둥), 바닥, 들보
      w.box(BX + 1, g0 + 75, BZ + 1, BX + BS - 1, g0 + 75, BZ + BS - 1, B.whiteDk);
      for (const k of ['s', 'n', 'e', 'w']) {
        const sd = TS[k];
        for (const [o0, o1] of [[sd.u0 + 3, sd.u0 + 7], [sd.u0 + 11, sd.u0 + 15]]) {
          const mid = (o0 + o1) / 2;
          for (let u = o0; u <= o1; u++) {
            const top = g0 + 87 + Math.round(Math.sqrt(Math.max(0, 6.25 - (u - mid) ** 2)) * 1.1);
            for (let y = g0 + 76; y <= top; y++) put(sd, u, y, 0, 0);
            put(sd, u, top + 1, 0, B.whiteDk);
          }
          for (let u = o0 - 1; u <= o1 + 1; u++) put(sd, u, g0 + 75, 1, B.trim);
          put(sd, Math.round(mid), g0 + 76, 1, B.iron);
        }
      }
      w.box(BX + 1, g0 + 76, BZ + 1, BX + BS - 1, g0 + 91, BZ + BS - 1, 0);
      w.box(BX + 1, g0 + 91, BZ + 8, BX + BS - 1, g0 + 92, BZ + 10, B.wood);
      w.box(BX, g0 + 93, BZ, BX + BS, g0 + TH, BZ + BS, B.white);
      w.walls(BX - 1, g0 + 93, BZ - 1, BX + BS + 1, g0 + 93, BZ + BS + 1, B.whiteDk);
      w.walls(BX - 1, g0 + TH + 1, BZ - 1, BX + BS + 1, g0 + TH + 2, BZ + BS + 1, B.trim);
      for (let x = BX - 1; x <= BX + BS + 1; x += 2) for (const z of [BZ - 1, BZ + BS + 1]) w.set(x, g0 + TH + 3, z, B.trim);
      for (let z = BZ - 1; z <= BZ + BS + 1; z += 2) for (const x of [BX - 1, BX + BS + 1]) w.set(x, g0 + TH + 3, z, B.trim);
      for (const [cx, cz] of [[BX - 1, BZ - 1], [BX + BS + 1, BZ - 1], [BX - 1, BZ + BS + 1], [BX + BS + 1, BZ + BS + 1]]) { w.box(cx, g0 + TH + 3, cz, cx, g0 + TH + 5, cz, B.trim); w.set(cx, g0 + TH + 6, cz, B.gold); }
      // 첨탑: 청기와(줄마다 이음 엇갈림), 금빛 축과 공, 저울 바람개비
      let bt = g0 + TH + 3;
      { let s = 0; const x0 = BX - 2, x1 = BX + BS + 2, z0 = BZ - 2, z1 = BZ + BS + 2;
        while (x0 + s <= x1 - s) {
          for (let q = 0; q < 3; q++) for (let x = x0 + s; x <= x1 - s; x++) for (let z = z0 + s; z <= z1 - s; z++) {
            if (x !== x0 + s && x !== x1 - s && z !== z0 + s && z !== z1 - s) continue;
            const u = (z === z0 + s || z === z1 - s) ? x : z, corner = (x === x0 + s || x === x1 - s) && (z === z0 + s || z === z1 - s);
            w.set(x, bt + s * 3 + q, z, s === 0 && q === 0 ? B.tileBDk : corner ? B.tileBDk : q === 2 ? B.tileB2 : ((u + (s & 1)) % 3 === 0 ? B.tileB2 : (hash3(u, s, q) > 0.75 ? B.tileB3 : B.tileB)));
          }
          s++;
        }
        bt += s * 3;
      }
      w.box(BC, bt - 2, BZ + 9, BC, bt + 8, BZ + 9, B.gold);
      w.ellipsoid(BC, bt + 2, BZ + 9, 1.6, 1.6, 1.6, B.gold);
      w.box(BC - 4, bt + 7, BZ + 9, BC + 4, bt + 7, BZ + 9, B.gold); for (const dx of [-4, 4]) { w.set(BC + dx, bt + 6, BZ + 9, B.gold); w.box(BC + dx - 1, bt + 5, BZ + 9, BC + dx + 1, bt + 5, BZ + 9, B.gold); }
      w.set(BC, bt + 9, BZ + 9, B.gold);
      // 종: 테가 두꺼운 종 몸, 어깨, 고리, 추
      const bell = w.prop({ name: 'bell', pivot: [BC + 0.5, g0 + 90, BZ + 9.5], axis: 'x' });
      const BY = g0 + 78, prof = [5.2, 5.0, 4.4, 4.1, 3.9, 3.8, 3.7, 3.6, 3.4, 3.0, 2.2];
      prof.forEach((r, dy) => {
        const R = Math.ceil(r);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz); if (d > r) continue;
          if (dy < 9 && d < r - 1.3) continue;
          bell.set(BC + dx, BY + dy, BZ + 9 + dz, dy <= 1 || dy === 6 ? B.bellDk : B.bell);
        }
      });
      bell.box(BC, BY + 11, BZ + 9, BC, BY + 12, BZ + 9, B.iron); bell.set(BC - 1, BY + 11, BZ + 9, B.iron); bell.set(BC + 1, BY + 11, BZ + 9, B.iron);
      bell.box(BC, BY + 1, BZ + 9, BC, BY + 8, BZ + 9, B.iron); bell.box(BC, BY - 1, BZ + 9, BC, BY, BZ + 9, B.ironDk);
      acts.push({
        name: '길드 종탑', hint: '장을 여는 새벽 종이 울리고 비둘기가 날아올라요', hit: [BX, g0 + 76, BZ, BX + BS, g0 + 91, BZ + BS],
        run: async a => {
          for (let k = 0; k < 5; k++) { await a.turn('bell', [0.45, 0, 0], 0.38); a.burst([BC + 0.5, g0 + 96, BZ + 9.5], { n: 16, colors: ['#e8e8f0', '#9a9aa8'], speed: 20, up: 6, life: 2.2, gravity: -1, spread: 8, flat: true }); await a.turn('bell', [-0.45, 0, 0], 0.38); }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '상인 길드 종탑', note: '새벽 종이 장을 연다', p: [BC + 0.5, bt + 20, BZ + 9.5], tag: 'GUILD' });

      // ───────── 지붕 덮인 시장: 굵은 기둥과 까치발, 들보, 서까래가 보이는 갈색 기와지붕, 환기 지붕 ─────────
      const MX0 = 68, MX1 = 112, MZ0 = 160, MZ1 = 240, MY = LO + 20;
      const postXs = [MX0, 89, MX1 - 1];
      for (let z = MZ0; z <= MZ1; z += 10) {
        const zz = Math.min(z, MZ1 - 1);
        for (const x of postXs) {
          w.box(x - 1, LO + 1, zz - 1, x + 2, LO + 2, zz + 2, B.found); w.box(x - 1, LO + 3, zz - 1, x + 2, LO + 3, zz + 2, B.sill);
          w.box(x, LO + 4, zz, x + 1, MY - 1, zz + 1, B.wood);
          if (x !== 89) { const dir = x === MX0 ? 1 : -1; w.line(x + (dir > 0 ? 1 : 0), MY - 6, zz, x + dir * 5, MY - 1, zz, B.frame); w.line(x + (dir > 0 ? 1 : 0), MY - 6, zz + 1, x + dir * 5, MY - 1, zz + 1, B.frame); }
          w.line(x, MY - 5, zz + (z === MZ0 ? 2 : -1), x, MY - 1, zz + (z === MZ0 ? 5 : -4), B.frame);
        }
        w.box(MX0, MY, zz, MX1, MY + 1, zz + 1, B.frameDk);
      }
      for (const x of postXs) w.box(x, MY, MZ0, x + 1, MY + 1, MZ1, B.frameDk);
      const mpk = roof(MX0, MX1, MZ0, MZ1, MY + 2, { axis: 'z', pal: BRN, ov: 4, og: 3 });
      for (let x = MX0 - 2; x <= MX1 + 2; x += 4) for (let z = MZ0 - 2; z <= MZ1 + 2; z++) {   // 서까래(지붕 밑)
        const s = Math.min(x - (MX0 - 4), MX1 + 4 - x), ry = MY + 2 - 4 + s;
        if (!w.get(x, ry - 2, z)) w.set(x, ry - 2, z, B.frame);
      }
      // 환기 지붕(용마루 위 작은 지붕): 판자 겹창
      for (let z = MZ0 + 12; z <= MZ1 - 12; z += 24) {
        for (let y = mpk - 3; y <= mpk + 3; y++) for (let zz = z; zz <= z + 7; zz++) for (let x = 84; x <= 96; x++) {
          const edge = x === 84 || x === 96 || zz === z || zz === z + 7;
          if (!edge) { w.set(x, y, zz, 0); continue; }
          w.set(x, y, zz, (zz === z || zz === z + 7) && (x === 84 || x === 96) ? B.frameDk : (y - mpk) % 2 ? B.wood : B.frame);
        }
        roof(84, 96, z, z + 7, mpk + 4, { axis: 'z', pal: BRN, ov: 2, og: 2 });
      }
      // 시장 안 진열대: 판자 계산대(앞판 살), 상자째 쌓인 과일·빵·생선·천·단지, 매단 등
      const goods = [['apple', 'orange'], ['bread', 'bread'], ['melon', 'apple'], ['fish', 'fish'], ['clothR', 'clothB'], ['pot', 'clothY']];
      const showGoods = (x, y, z, gd, len) => {   // x..x+len-1, z..z+3 위에 상자와 물건
        for (let k = 0; k < len; k += 5) {
          const b = B[gd[(k / 5) % 2]];
          w.box(x + k, y, z, x + k + 3, y, z + 3, B.crateEdge); w.box(x + k + 1, y, z + 1, x + k + 2, y, z + 2, B.crate);
          if (b === B.clothR || b === B.clothB || b === B.clothY) { for (let q = 0; q < 3; q++) w.box(x + k, y + 1 + q, z + q % 2, x + k + 3, y + 1 + q, z + 2 + q % 2, [B.clothR, B.clothB, B.clothY, B.clothW][(k + q) % 4]); continue; }
          if (b === B.pot) { for (const [dx, dz] of [[0, 0], [2, 2]]) { w.box(x + k + dx, y + 1, z + dz, x + k + dx + 1, y + 2, z + dz + 1, B.pot); w.set(x + k + dx, y + 3, z + dz, B.pot); } continue; }
          if (b === B.bread) { for (let dz = 0; dz < 4; dz += 2) { w.box(x + k, y + 1, z + dz, x + k + 3, y + 1, z + dz, B.bread); w.box(x + k + 1, y + 2, z + dz, x + k + 2, y + 2, z + dz, B.breadTop); } continue; }
          if (b === B.fish) { for (let dz = 0; dz < 4; dz++) { w.box(x + k, y + 1, z + dz, x + k + 2, y + 1, z + dz, B.fish); w.set(x + k + 3, y + 1, z + dz, B.steel); } continue; }
          for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) { w.set(x + k + dx, y + 1, z + dz, hash3(x + k + dx, y, z + dz) > 0.85 ? B.leaf : b); if (dx >= 1 && dx <= 2 && dz >= 1 && dz <= 2) w.set(x + k + dx, y + 2, z + dz, b); }
        }
      };
      let gi = 0;
      for (let z = MZ0 + 3; z <= MZ1 - 8; z += 10) for (const x of [MX0 + 4, MX1 - 15]) {
        const gd = goods[(gi++) % goods.length];
        for (let xx = x; xx <= x + 11; xx++) for (let y = LO + 1; y <= LO + 4; y++) { w.set(xx, y, z + 4, (xx - x) % 4 === 0 || y === LO + 4 ? B.frame : B.plank); w.box(xx, y, z, xx, y, z + 3, B.plank); }
        w.box(x, LO + 5, z, x + 11, LO + 5, z + 4, B.plank); w.box(x - 1, LO + 5, z + 5, x + 12, LO + 5, z + 5, B.frameDk);
        showGoods(x, LO + 6, z, gd, 12);
        w.box(x + 6, LO + 15, z + 2, x + 6, MY - 1, z + 2, B.iron); w.set(x + 6, LO + 14, z + 2, B.ironDk); w.box(x + 6, LO + 12, z + 2, x + 6, LO + 13, z + 2, B.lamp); w.set(x + 6, LO + 11, z + 2, B.ironDk);
      }
      lights.push({ p: [MX0 + 10.5, LO + 14, MZ0 + 36.5], c: '#ffd890', i: 1, d: 30, flicker: 0.1, night: true });
      lights.push({ p: [MX1 - 8.5, LO + 14, MZ0 + 56.5], c: '#ffd890', i: 1, d: 30, flicker: 0.1, night: true });
      landmarks.push({ name: '지붕 덮인 시장', note: '과일 · 빵 · 생선 노점', p: [90.5, mpk + 12, 200] });

      // ───────── 이층 분수: 계단 테, 낱돌 수반과 갓돌, 꽃잎 수반 둘, 물줄기, 금빛 머리와 꼭대기 ─────────
      const FX = 184, FZ = 200, WL = LO + 2;
      for (let z = FZ - 26; z <= FZ + 26; z++) for (let x = FX - 26; x <= FX + 26; x++) {
        const d = MH.dist(x, z, FX, FZ);
        if (d > 25.2) continue;
        if (d > 23.2) { w.set(x, LO + 1, z, B.whiteDk); continue; }
        if (d > 20.8) {
          const u = Math.round((Math.atan2(z - FZ, x - FX) + Math.PI) * 22);
          for (let y = LO + 1; y <= LO + 3; y++) w.set(x, y, z, wStone(u, y, 71));
          w.set(x, LO + 4, z, d > 22.4 ? B.whiteDk : B.trim);
          continue;
        }
        MH.setH(w, x, z, LO - 3, (x + z) % 4 ? B.whiteDk : B.ws2, B.found); w.liquid(x, z, WL);
      }
      for (let a = 0; a < 8; a++) { const x = Math.round(FX + Math.cos(a * 0.785) * 22), z = Math.round(FZ + Math.sin(a * 0.785) * 22); w.box(x, LO + 5, z, x + 1, LO + 5, z + 1, B.gold); w.set(x, LO + 6, z, B.gold); }
      // 가운데 기둥(받침 넓게)과 아래 꽃잎 수반
      for (let y = LO - 3; y <= LO + 12; y++) disc(w, FX, FZ, y, y <= LO + 3 ? 4.4 : (y >= LO + 10 ? 3.4 + (y - LO - 10) * 0.6 : 3.2), y === LO + 3 || y === LO + 12 ? B.trim : B.white);
      for (let y = LO + 13; y <= LO + 16; y++) {
        const r = 6 + (y - LO - 13) * 1.6;
        disc(w, FX, FZ, y, r, (dx, dz, d) => {
          if (y === LO + 16 && d < r - 1.2) return B.waterB;
          const petal = Math.abs(((Math.atan2(dz, dx) / (Math.PI / 8)) % 1 + 1) % 1 - 0.5) < 0.22;
          return y === LO + 16 ? B.trim : petal ? B.ws2 : B.white;
        }, y === LO + 16 ? -1 : r - 1.6);
      }
      disc(w, FX, FZ, LO + 15, 7.8, B.white);
      for (let y = LO + 17; y <= LO + 29; y++) disc(w, FX, FZ, y, y >= LO + 27 ? 2.2 : 1.8, y === LO + 17 || y === LO + 29 ? B.trim : B.white);
      for (let y = LO + 30; y <= LO + 32; y++) { const r = 3.2 + (y - LO - 30) * 1.1; disc(w, FX, FZ, y, r, (dx, dz, d) => y === LO + 32 ? (d < r - 1.1 ? B.waterB : B.trim) : B.white); }
      w.box(FX, LO + 32, FZ, FX, LO + 41, FZ, B.gold); w.ellipsoid(FX, LO + 36, FZ, 1.4, 1.4, 1.4, B.gold);
      w.box(FX - 2, LO + 39, FZ, FX + 2, LO + 39, FZ, B.gold); w.box(FX, LO + 39, FZ - 2, FX, LO + 39, FZ + 2, B.gold); w.set(FX, LO + 42, FZ, B.gold); w.set(FX, LO + 43, FZ, B.gold);
      // 위 수반에서 아래 수반으로, 아래 수반의 금빛 머리에서 큰 수반으로 떨어지는 물줄기
      for (let a = 0; a < 8; a++) { const ang = a * Math.PI / 4 + 0.39; for (let y = LO + 17; y <= LO + 31; y++) { const r = 5.6 + (LO + 31 - y) * 0.05; w.set(Math.round(FX + Math.cos(ang) * r), y, Math.round(FZ + Math.sin(ang) * r), a % 2 ? B.waterB : B.water2); } }
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const hx = FX + dx * 11, hz = FZ + dz * 11;
        w.box(hx - (dz ? 1 : 0), LO + 16, hz - (dx ? 1 : 0), hx + (dz ? 1 : 0), LO + 18, hz + (dx ? 1 : 0), B.gold); w.set(hx + dx, LO + 17, hz + dz, B.gold);
        for (let t = 0; t <= 8; t++) { const r = 12 + t * 0.9, y = LO + 17 - Math.round(t * t * 0.22); w.set(FX + Math.round(dx * r), y, FZ + Math.round(dz * r), t % 2 ? B.water2 : B.waterB); }
      }
      acts.push({
        name: '이층 분수', hint: '물줄기가 높이 솟구쳐요', hit: [FX - 10, LO + 1, FZ - 10, FX + 10, LO + 44, FZ + 10],
        run: async a => { for (let k = 0; k < 9; k++) { a.burst([FX + 0.5, LO + 42, FZ + 0.5], { n: 46, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 12, up: 26, life: 1.9, gravity: 24, spread: 2 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '이층 분수', note: '왕도에서 가장 큰 분수', p: [FX + 0.5, LO + 60, FZ + 0.5] });

      // ───────── 노점 줄: 기둥, 판자 진열대(앞판 살), 줄무늬 차양과 물결 테두리, 상자째 쌓인 물건 ─────────
      const aw = [[B.clothR, B.clothW], [B.clothB, B.clothW], [B.clothG, B.clothW], [B.clothY, B.clothW]];
      const stall = (x, z, a1, a2, gd) => {
        const sx = 12, sz = 10, y = MH.maxG(w, x - 1, z - 1, x + sx, z + sz) + 1;
        for (let zz = z - 1; zz <= z + sz + 1; zz++) for (let xx = x - 1; xx <= x + sx; xx++) for (let yy = y; yy <= y + 16; yy++) w.set(xx, yy, zz, 0);
        for (const [px, pz, ph] of [[x, z, 13], [x + sx - 1, z, 13], [x, z + sz - 1, 10], [x + sx - 1, z + sz - 1, 10]]) w.box(px, y, pz, px, y + ph, pz, B.wood);
        for (let xx = x; xx < x + sx; xx++) {
          for (let yy = y; yy <= y + 3; yy++) w.set(xx, yy, z + sz - 1, (xx - x) % 4 === 0 ? B.frame : B.plank);
          w.set(xx, y + 4, z + sz - 1, B.wood); w.set(xx, y + 4, z + sz - 2, B.wood); w.set(xx, y + 4, z + sz - 3, B.wood); w.set(xx, y + 4, z + sz, B.frame);
        }
        showGoods(x + 1, y + 5, z + sz - 4, gd, 10);
        crate(w, x + 1, y, z + 1, 4); crate(w, x + 1, y + 4, z + 1, 3); crate(w, x + 6, y, z + 1, 4);
        for (let dz = -1; dz <= sz + 1; dz++) {
          const yy = y + 14 - Math.round((dz + 1) * 4 / (sz + 2));
          for (let dx = -1; dx <= sx; dx++) {
            const stripe = ((dx + 1) >> 1) & 1 ? a1 : a2;
            w.set(x + dx, yy, z + dz, stripe);
            if (dz === sz + 1) { w.set(x + dx, yy - 1, z + dz, stripe); if ((dx & 1) === 0) w.set(x + dx, yy - 2, z + dz, a1); }
          }
        }
      };
      [[124, 150], [140, 150], [216, 148], [124, 228], [140, 228], [216, 232], [222, 188], [124, 188], [156, 232], [200, 150], [128, 244]].forEach(([sx, sz], k) => {
        const [a1, a2] = aw[k % aw.length];
        stall(sx, sz, a1, a2, goods[k % goods.length]);
      });

      // ───────── 도르래가 달린 상인의 집: 짐은 줄에 매달려 오르내린다 ─────────
      const HZZ = 171, HXX = 210;
      const hh = house({ x: 222, z: 160, sx: 18, sz: 24, floors: 4, fh: 12, face: 'w', jetty: true, y: LO + 1, wall: B.plasterB, shut: [B.shutB, B.shutBDk], pal: BLUE, chimney: true, box: true, lantern: true, hole: ['w', HZZ + 0] });
      if (hh.lamp) lights.push({ p: hh.lamp, c: '#ffd890', i: 0.9, d: 20, flicker: 0.1, night: true });
      const beamY = hh.top - 2, LX = 222 - hh.e;
      for (let y = beamY - 11; y <= beamY - 3; y++) for (let z = HZZ - 2; z <= HZZ + 2; z++) w.set(LX, y, z, (z === HZZ - 2 || z === HZZ + 2 || y === beamY - 3) ? B.frameDk : (z === HZZ ? B.doorDk : B.door));
      for (let z = HZZ - 3; z <= HZZ + 3; z++) w.set(LX - 1, beamY - 12, z, B.sill);
      w.box(HXX - 1, beamY, HZZ, LX, beamY + 1, HZZ + 1, B.wood); w.line(LX - 1, beamY - 5, HZZ, LX - 5, beamY - 1, HZZ, B.wood);
      w.box(HXX, beamY - 1, HZZ, HXX, beamY - 1, HZZ + 1, B.iron); w.set(HXX - 1, beamY - 1, HZZ, B.ironDk);
      const crateTop = LO + 7, rLen = beamY - 2 - crateTop - 1;
      MH.rope(w, 'hrope', HXX, beamY - 2, HZZ, rLen, B.rope);
      const hoist = w.prop({ name: 'hoist', pivot: [HXX + 0.5, LO + 1, HZZ + 0.5] });
      crate(hoist, HXX - 3, LO + 1, HZZ - 3, 7); hoist.box(HXX - 2, crateTop + 1, HZZ, HXX + 2, crateTop + 1, HZZ, B.rope); hoist.set(HXX, crateTop + 1, HZZ, B.iron);
      acts.push({
        name: '짐 도르래', hint: '밧줄이 감기며 상자를 다락 문까지 끌어올려요', hit: [HXX - 3, LO + 1, HZZ - 3, HXX + 3, crateTop + 2, HZZ + 3],
        run: async a => {
          const up = beamY - 16 - (LO + 1);
          await Promise.all([a.move('hoist', [0, up, 0], 3.2, t => t), a.rope('hrope', rLen, rLen - up, 3.2, t => t)]);
          await a.wait(1);
          await Promise.all([a.move('hoist', [0, 0, 0], 2.6, t => t), a.rope('hrope', rLen, rLen, 2.6, t => t)]);
        },
      });

      // ───────── 등불 줄(작은 등과 리본), 가로등, 나무, 벤치, 꽃 화분 ─────────
      const garland = (ax, bx, y, z) => {
        const N = (bx - ax) * 2;
        for (let i = 0; i <= N; i++) {
          const t = i / N, x = Math.round(ax + (bx - ax) * t), yy = Math.round(y - Math.sin(t * Math.PI) * 5);
          w.set(x, yy, z, B.rope);
          if (i % 16 === 8) { w.set(x, yy - 1, z, B.ironDk); w.box(x, yy - 3, z, x, yy - 2, z, B.lamp); w.set(x, yy - 4, z, B.ironDk); }
          else if (i % 8 === 4) { const c = [B.clothY, B.clothR, B.clothB][(i >> 3) % 3]; w.box(x, yy - 2, z, x, yy - 1, z, c); }
        }
      };
      for (const px of [68, 120, 176, 228]) { w.box(px, LO + 1, 143, px + 1, UP + 28, 143, B.wood); w.box(px, UP + 29, 143, px + 1, UP + 29, 143, B.gold); w.box(px - 1, LO + 1, 142, px + 2, LO + 2, 144, B.found); }
      garland(70, 119, UP + 27, 143); garland(178, 227, UP + 27, 143);
      for (const [lx, lz] of [[118, 156], [178, 156], [118, 240], [178, 240], [80, 128], [216, 128], [168, 132], [244, 200]]) lights.push({ p: lampPost(lx, lz, 10), c: '#ffe0a0', i: 1, d: 26, flicker: 0.05, night: true });
      for (const [tx, tz] of [[66, 120], [230, 120], [64, 74], [234, 66]]) { const ty = g(tx, tz) + 1; for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.abs(dx) === 3 || Math.abs(dz) === 3) w.set(tx + dx, ty - 1, tz + dz, B.sill); tree(tx, ty, tz, { h: 18, r: 8, trunkR: 2 }); }
      for (const [bx, bz] of [[92, 124], [112, 124], [184, 124], [204, 124]]) bench(bx, bz, true, -1);
      for (const [px, pz] of [[104, 132], [130, 118], [166, 118], [192, 132], [88, 118], [208, 118]]) {
        const py = UP + 1;
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
          const edge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
          w.box(px + dx, py, pz + dz, px + dx, py + 2, pz + dz, edge ? B.planter : B.soil);
          if (edge) { if ((dx + dz) % 2 === 0) w.set(px + dx, py + 3, pz + dz, B.flowerLf); continue; }
          const hq = hash3(px + dx, 3, pz + dz);
          w.set(px + dx, py + 3, pz + dz, B.flowerStem); w.set(px + dx, py + 4, pz + dz, hq > 0.3 ? FLW[(hq * 17 | 0) % 5] : B.flowerLf);
          if (dx === 0 && dz === 0) { w.set(px, py + 5, pz, B.flowerStem); w.set(px, py + 6, pz, B.flowerY); }
        }
        w.box(px - 2, py - 1, pz - 2, px + 2, py - 1, pz + 2, B.sill);
      }

      // ───────── 짐마차(부품): 아랫광장을 가로질러 오간다 ─────────
      const CY = LO + 1, CX = 125, CZ = 169;
      const cart = w.prop({ name: 'cart', pivot: [CX, CY, CZ] });
      cart.box(CX - 6, CY + 3, CZ - 3, CX + 3, CY + 3, CZ + 2, B.plank);
      for (let x = CX - 6; x <= CX + 3; x++) for (const z of [CZ - 3, CZ + 2]) { cart.set(x, CY + 4, z, B.wood); if (x % 3 === 0) cart.set(x, CY + 5, z, B.wood); cart.set(x, CY + 6, z, B.wood); }
      for (let z = CZ - 3; z <= CZ + 2; z++) for (const x of [CX - 6, CX + 3]) cart.box(x, CY + 4, z, x, CY + 6, z, B.wood);
      for (const wx of [CX - 4, CX + 1]) for (const z of [CZ - 4, CZ + 3]) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const r = Math.hypot(dx, dy); if (r > 2.9) continue;
        if (r > 2) cart.set(wx + dx, CY + 2 + dy, z, B.iron); else if (r < 0.8 || dx === 0 || dy === 0) cart.set(wx + dx, CY + 2 + dy, z, r < 0.8 ? B.ironDk : B.wood);
      }
      for (const z of [CZ - 1, CZ]) cart.box(CX + 4, CY + 3, z, CX + 10, CY + 3, z, B.wood);
      cart.box(CX + 10, CY + 3, CZ - 2, CX + 10, CY + 3, CZ + 1, B.wood);
      barrel(cart, CX - 3, CY + 4, CZ, 5);
      cart.box(CX, CY + 4, CZ - 2, CX + 2, CY + 5, CZ - 1, B.crate); cart.set(CX + 1, CY + 6, CZ - 2, B.apple); cart.set(CX + 2, CY + 6, CZ - 1, B.orange); cart.set(CX, CY + 6, CZ - 1, B.apple);
      cart.box(CX + 1, CY + 4, CZ + 1, CX + 2, CY + 5, CZ + 1, B.melon);
      acts.push({
        name: '짐마차', hint: '과일과 술통을 실은 짐마차가 아랫광장을 돌아 장인 골목을 지나 남문 쪽으로 달려 나가요', hit: [CX - 7, CY, CZ - 5, CX + 10, CY + 8, CZ + 4],
        run: async a => {
          const dust = async (pts) => { for (const [x, z] of pts) { a.burst([x, CY + 1, z], { n: 10, colors: ['#c8c0b0', '#a8a49c'], speed: 4, up: 2, life: 0.8, gravity: 4, spread: 4, flat: true }); await a.wait(0.7); } };
          await Promise.all([
            a.drive('cart', [[27, 0, 0], [27, 0, 40], [27, 0, 82], [120, 0, 82], [236, 0, 82]], 11, { fwd: '+x', back: 1.0 }),
            dust([[132, 169], [152, 172], [152, 192], [152, 216], [152, 240], [168, 251], [200, 251], [232, 251], [264, 251], [296, 251]]),
          ]);
        },
      });
      // ── 장터 불꽃놀이 ──
      acts.push({
        name: '장터 불꽃놀이', hint: '분수 위 하늘로 장날을 축하하는 불꽃이 터져요', hit: [FX - 3, LO + 32, FZ - 3, FX + 3, LO + 44, FZ + 3],
        run: async a => {
          const sets = [['#ff6a5a', '#ffe0a0'], ['#6ad0ff', '#ffffff'], ['#ffe060', '#ff9a3a'], ['#c08aff', '#ffd0f0'], ['#7aff9a', '#ffffff']];
          for (let k = 0; k < 7; k++) {
            const x = FX + 0.5 + [-32, 20, -8, 36, -24, 8, 0][k], z = FZ + 0.5 + [-28, -20, 12, -4, 4, -40, -16][k];
            a.burst([x, LO + 44, z], { n: 10, colors: ['#ffe8a0'], speed: 0.8, up: 36, life: 0.9, gravity: 8, spread: 0.6 });
            await a.wait(0.6);
            a.burst([x, LO + 84, z], { n: 80, colors: sets[k % sets.length], speed: 28, up: 4, life: 1.6, gravity: 5, spread: 2 });
            await a.wait(0.3);
          }
        },
      });

      // ══ 동쪽 장인 골목 ══
      for (let z = 144; z <= 257; z++) for (let x = 248; x <= 321; x++) MH.paint(w, x, z, (x === 248 || x === 249) ? B.found : flagAt(x, z));
      for (let z = 144; z <= 257; z++) { MH.paint(w, 292, z, B.ironDk); if (z % 6 === 0) MH.paint(w, 293, z, B.iron); }
      // ── 대장간: 남쪽으로 활짝 열린 낱돌 대장간, 벽돌 화덕과 큰 굴뚝, 바깥 쇠망치 ──
      const FG0 = 252, FG1 = 289, FZ0 = 148, FZ1 = 181, FT = LO + 19;
      const FS = SIDES(FG0, FZ0, FG1, FZ1);
      for (let z = FZ0; z <= FZ1; z++) for (let x = FG0; x <= FG1; x++) MH.paint(w, x, z, (x + z) % 5 ? B.soot : B.coal);
      for (const k of ['n', 'e', 'w']) { const sd = FS[k]; for (let u = sd.u0; u <= sd.u1; u++) for (let y = LO + 1; y <= FT; y++) { put(sd, u, y, 0, stoneAt(u, y, 81, DST) || B.mortar); put(sd, u, y, -1, B.rockDk); } }
      for (const x of [FG0, FG0 + 12, FG0 + 24, FG1 - 1]) { w.box(x, LO + 1, FZ1 - 1, x + 1, FT - 2, FZ1, B.wood); w.box(x - 1, LO + 1, FZ1 - 2, x + 2, LO + 2, FZ1 + 1, B.found); w.line(x + (x === FG0 ? 2 : -1), FT - 6, FZ1, x + (x === FG0 ? 5 : -4), FT - 2, FZ1, B.frame); }
      w.box(FG0, FT - 1, FZ1 - 1, FG1, FT, FZ1, B.frameDk);
      windowAt(FS.w, FZ0 + 12, LO + 8, 6, { shutter: B.shutR, shutterDk: B.shutRDk });
      doorAt(FS.w, FZ0 + 26, LO + 1, {});
      const fpk = roof(FG0, FG1, FZ0, FZ1 + 2, FT + 1, { axis: 'z', pal: RED, gable: B.plaster, ov: 3, og: 2, gutter: true, foot: LO + 1 });
      // 화덕(벽돌), 불씨, 쇳물받이, 덮개와 굴뚝
      const HX0 = FG1 - 15, HX1 = FG1 - 2, HZ0 = FZ0 + 2, HZ1 = FZ0 + 13;
      for (let y = LO + 1; y <= LO + 6; y++) for (let z = HZ0; z <= HZ1; z++) for (let x = HX0; x <= HX1; x++) w.set(x, y, z, hash3(x, y, z) > 0.7 ? B.brick2 : B.brick);
      w.box(HX0 + 2, LO + 6, HZ0 + 2, HX1 - 2, LO + 6, HZ1 - 2, B.coal); w.box(HX0 + 3, LO + 6, HZ0 + 3, HX1 - 3, LO + 6, HZ1 - 3, B.ember);
      w.box(HX0, LO + 7, HZ0, HX1, LO + 7, HZ1, B.sill); w.box(HX0 + 1, LO + 7, HZ0 + 1, HX1 - 1, LO + 7, HZ1 - 1, 0);
      for (let y = LO + 13; y <= FT; y++) { const k = y - (LO + 13); w.walls(HX0 + Math.min(k, 3), y, HZ0, HX1 - Math.min(k, 3), y, HZ1 - Math.min(k, 4), B.soot); }
      smokes.push(chimney(HX0 + 5, HZ0 + 1, FT, fpk + 10));
      // 풀무, 물통, 모루, 연장 걸이, 쇠붙이 더미
      for (let y = LO + 1; y <= LO + 5; y++) for (let z = HZ0 + 3; z <= HZ0 + 8; z++) for (let x = HX0 - 7; x <= HX0 - 2; x++) {
        const t = (y - LO - 1) / 4, inn = Math.abs(z - (HZ0 + 5.5)) <= 2.5 - (y === LO + 3 ? 0 : 1) * 0;
        if (y === LO + 1 || y === LO + 5) w.set(x, y, z, B.wood); else if (inn && (x - HX0 + 7) >= 1) w.set(x, y, z, (y + x) % 2 ? B.leather : B.frame);
        void t;
      }
      w.box(HX0 - 10, LO + 5, HZ0 + 5, HX0 - 8, LO + 5, HZ0 + 6, B.wood); w.box(HX0 - 10, LO + 6, HZ0 + 5, HX0 - 10, LO + 9, HZ0 + 6, B.wood);
      barrel(w, FG0 + 6, LO + 1, FZ1 - 7, 6); w.box(FG0 + 5, LO + 6, FZ1 - 8, FG0 + 7, LO + 6, FZ1 - 6, B.waterB);
      w.box(FG0 + 18, LO + 1, FZ0 + 18, FG0 + 21, LO + 3, FZ0 + 20, B.bark); w.box(FG0 + 17, LO + 4, FZ0 + 18, FG0 + 23, LO + 5, FZ0 + 20, B.iron); w.box(FG0 + 15, LO + 5, FZ0 + 19, FG0 + 16, LO + 5, FZ0 + 19, B.iron); w.box(FG0 + 17, LO + 6, FZ0 + 18, FG0 + 23, LO + 6, FZ0 + 20, B.steel);
      for (let z = FZ0 + 3; z <= FZ0 + 21; z += 3) { w.box(FG0 + 2, LO + 11, z, FG0 + 2, LO + 14, z, B.iron); w.set(FG0 + 2, LO + 10, z, z % 2 ? B.ironDk : B.wood); w.set(FG0 + 2, LO + 15, z, B.wood); }
      w.box(FG0 + 2, LO + 15, FZ0 + 2, FG0 + 2, LO + 15, FZ0 + 22, B.wood);
      for (let x = FG0 + 4; x <= FG0 + 18; x += 4) { w.box(x, LO + 12, FZ0 + 2, x, LO + 15, FZ0 + 2, B.iron); w.set(x, LO + 11, FZ0 + 2, B.ironDk); }
      for (const [x, z] of [[FG0 + 10, FZ0 + 4], [FG0 + 12, FZ0 + 6], [FG0 + 9, FZ0 + 7], [FG0 + 14, FZ0 + 4]]) w.box(x, LO + 1, z, x + 2, LO + 1 + (x % 3), z + 1, x % 2 ? B.iron : B.ironDk);
      // 바깥 쇠망치 틀: 모루, 기둥 둘과 굴대, 큰 망치(부품)
      const AX = 296, AZ = 190;
      w.box(AX - 4, LO + 1, AZ - 5, AX + 15, LO + 2, AZ + 5, B.found);
      w.box(AX, LO + 3, AZ - 1, AX + 3, LO + 5, AZ + 2, B.ironDk); w.box(AX - 1, LO + 6, AZ - 1, AX + 4, LO + 7, AZ + 2, B.steel); w.box(AX - 3, LO + 7, AZ, AX - 2, LO + 7, AZ + 1, B.steel);
      w.box(AX + 1, LO + 8, AZ, AX + 2, LO + 8, AZ + 1, B.ember);
      for (const z of [AZ - 4, AZ + 4]) { w.box(AX + 12, LO + 3, z, AX + 13, LO + 18, z + 1, B.wood); w.box(AX + 11, LO + 3, z - 1, AX + 14, LO + 4, z + 2, B.frame); }
      w.box(AX + 12, LO + 12, AZ - 4, AX + 13, LO + 13, AZ + 5, B.iron);
      const ham = w.prop({ name: 'hammer', pivot: [AX + 13, LO + 13, AZ + 1], axis: 'z' });
      ham.box(AX + 4, LO + 12, AZ, AX + 11, LO + 13, AZ + 1, B.wood); ham.box(AX, LO + 9, AZ - 1, AX + 3, LO + 15, AZ + 2, B.iron); ham.box(AX + 1, LO + 9, AZ, AX + 2, LO + 9, AZ + 1, B.ironDk);
      lights.push({ name: 'forge', p: [HX0 + 7.5, LO + 10, HZ0 + 7], c: '#ff8a3a', i: 1.4, d: 44, flicker: 0.35 });
      acts.push({
        name: '대장간 쇠망치', hint: '풀무가 불을 키우고 큰 쇠망치가 모루를 내리쳐 불티가 튀어요', hit: [AX - 4, LO + 3, AZ - 4, AX + 13, LO + 18, AZ + 5],
        run: async a => {
          a.flash('forge', 4, 5.5);
          for (let k = 0; k < 6; k++) {
            await a.turn('hammer', [0, 0, -0.75], 0.4);
            await a.turn('hammer', [0, 0, 0.05], 0.12);
            a.burst([AX + 2, LO + 9, AZ + 1], { n: 26, colors: ['#ffe060', '#ff9a3a', '#ffffff'], speed: 14, up: 8, life: 0.8, gravity: 18, spread: 1.2 });
            if (k % 2 === 0) a.burst([HX0 + 7, fpk + 14, HZ0 + 3], { n: 10, colors: ['#5a5458', '#8a8488', '#c8c0c0'], speed: 1.4, up: 8, life: 2.6, gravity: -1.2, spread: 1.6 });
            await a.wait(0.2);
          }
          await a.turn('hammer', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '대장간', note: '쇠망치 소리가 끊이지 않는 곳', p: [FG0 + 18, fpk + 24, FZ0 + 16], tag: 'FORGE' });

      // ── 계량소: 기둥만 선 열린 정자, 한가운데 길드의 큰 저울 ──
      const QX0 = 252, QX1 = 288, QZ0 = 200, QZ1 = 236, QC = 270, QZc = 218, QT = LO + 38;
      for (let z = QZ0; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) {
        const edge = x === QX0 || x === QX1 || z === QZ0 || z === QZ1;
        w.set(x, LO + 1, z, edge ? B.found : B.found); w.set(x, LO + 2, z, edge ? B.sill : ((x >> 2) + (z >> 2)) % 2 ? B.sl1 : B.sl3);
      }
      const qcol = (x, z) => {
        w.box(x - 1, LO + 3, z - 1, x + 2, LO + 4, z + 2, B.found); w.box(x - 1, LO + 5, z - 1, x + 2, LO + 5, z + 2, B.trim);
        w.box(x, LO + 6, z, x + 1, QT - 3, z + 1, B.white); for (let y = LO + 8; y < QT - 3; y += 4) { w.set(x, y, z, B.ws2); w.set(x + 1, y + 2, z + 1, B.ws2); }
        w.box(x - 1, QT - 2, z - 1, x + 2, QT - 1, z + 2, B.trim);
      };
      for (const x of [QX0 + 2, QX0 + 12, QX1 - 13, QX1 - 3]) for (const z of [QZ0 + 2, QZ1 - 3]) qcol(x, z);
      for (const z of [QZ0 + 12, QZ1 - 13]) for (const x of [QX0 + 2, QX1 - 3]) qcol(x, z);
      w.walls(QX0 + 1, QT, QZ0 + 1, QX1 - 1, QT + 1, QZ1 - 1, B.whiteDk); w.walls(QX0 + 1, QT, QZ0 + 3, QX1 - 1, QT + 1, QZ1 - 3, B.whiteDk);
      w.walls(QX0, QT + 2, QZ0, QX1, QT + 2, QZ1, B.trim);
      for (let x = QX0 + 1; x <= QX1 - 1; x += 3) for (const z of [QZ0, QZ1]) w.set(x, QT + 1, z, B.ws2);
      const qpk = hipRoof(QX0 - 2, QX1 + 2, QZ0 - 2, QZ1 + 2, QT + 3, GRN);
      w.box(QC, qpk - 1, QZc, QC + 1, qpk + 4, QZc + 1, B.gold); w.ellipsoid(QC, qpk + 6, QZc, 1.5, 1.5, 1.5, B.coin);
      // 큰 저울: 받침, 쇠기둥, 가로대(부품)와 사슬, 접시
      w.box(QC - 2, LO + 3, QZc - 2, QC + 3, LO + 4, QZc + 3, B.found); w.box(QC - 1, LO + 5, QZc - 1, QC + 2, LO + 6, QZc + 2, B.trim);
      w.box(QC, LO + 7, QZc, QC + 1, LO + 19, QZc + 1, B.iron); w.box(QC - 1, LO + 12, QZc, QC + 2, LO + 12, QZc + 1, B.ironDk);
      const beam = w.prop({ name: 'scale', pivot: [QC + 1, LO + 21, QZc + 1], axis: 'z' });
      beam.box(QC - 14, LO + 20, QZc, QC + 15, LO + 21, QZc + 1, B.gold); beam.box(QC, LO + 22, QZc, QC + 1, LO + 26, QZc + 1, B.gold); beam.set(QC, LO + 27, QZc, B.brass);
      for (const sx of [-1, 1]) {
        const px = sx < 0 ? QC - 13 : QC + 14;
        for (let y = LO + 12; y <= LO + 19; y++) { beam.set(px - 2, y, QZc - 2 + (y % 2), B.ironDk); beam.set(px + 2, y, QZc + 2 + (y % 2) - 1, B.ironDk); }
        for (let dz = -3; dz <= 4; dz++) for (let dx = -3; dx <= 3; dx++) {
          const d = Math.hypot(dx, dz - 0.5); if (d > 3.6) continue;
          beam.set(px + dx, LO + 10, QZc + dz, B.bellDk); if (d > 2.6) beam.set(px + dx, LO + 11, QZc + dz, B.bell);
        }
        if (sx < 0) { sack(beam, px - 2, LO + 11, QZc - 1, B.sack); }
        else { for (const [dx, dz] of [[-1, 0], [0, 1], [1, 0], [0, 0], [-1, 1], [1, 2]]) beam.set(px + dx, LO + 11, QZc + dz, B.coin); beam.set(px, LO + 12, QZc + 1, B.coin); }
      }
      // 곡물 자루와 돈궤
      for (const [sx, sz] of [[QX0 + 5, QZ0 + 5], [QX0 + 8, QZ0 + 6], [QX0 + 5, QZ1 - 9], [QX1 - 9, QZ0 + 5]]) sack(w, sx, LO + 3, sz);
      sack(w, QX0 + 6, LO + 6, QZ0 + 5, B.sack2);
      w.box(QX1 - 9, LO + 3, QZ1 - 9, QX1 - 5, LO + 6, QZ1 - 6, B.chest || B.wood); w.box(QX1 - 9, LO + 7, QZ1 - 9, QX1 - 5, LO + 7, QZ1 - 6, B.iron); w.box(QX1 - 8, LO + 4, QZ1 - 5, QX1 - 6, LO + 5, QZ1 - 5, B.gold);
      acts.push({
        name: '계량소 저울', hint: '곡물 자루와 금화를 올리자 큰 저울이 기우뚱거리다 수평을 잡아요', hit: [QC - 17, LO + 9, QZc - 3, QC + 18, LO + 23, QZc + 4],
        run: async a => {
          const coins = s => a.burst([QC + 1 + s * 14, LO + 16, QZc + 1], { n: 18, colors: ['#ffe060', '#f4d060', '#ffffff'], speed: 4, up: 6, life: 1.1, gravity: 18, spread: 2 });
          coins(1); await a.turn('scale', [0, 0, -0.32], 0.9);
          await a.wait(0.4);
          a.burst([QC + 1 - 14, LO + 16, QZc + 1], { n: 14, colors: ['#e8d8a8', '#c8b088'], speed: 3, up: 4, life: 1, gravity: 16, spread: 2 });
          await a.turn('scale', [0, 0, 0.24], 0.9);
          for (const t of [-0.14, 0.08, -0.04, 0]) await a.turn('scale', [0, 0, t], 0.5);
          a.burst([QC + 1, LO + 24, QZc + 1], { n: 30, colors: ['#ffe8a0', '#ffffff'], speed: 8, up: 6, life: 1.2, gravity: 2, spread: 4 });
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '계량소', note: '길드의 큰 저울로 무게를 단다', p: [QC + 1, qpk + 16, QZc + 1] });
      // 장인 골목 소품: 장작더미(나이테), 상자, 통, 등불
      for (let r = 0; r < 3; r++) for (let q = 0; q < 5 - r; q++) {
        const cz = 156 + q * 3 + r * 1.5, cy = LO + 2 + r * 3;
        for (let x = 300; x <= 310; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dy) + Math.abs(dz) > 1 && (x === 300 || x === 310)) continue;
          w.set(x, cy + dy, Math.round(cz) + dz, (x === 300 || x === 310) ? (dy === 0 && dz === 0 ? B.wood : B.logEnd) : B.bark);
        }
      }
      for (const [x, z, s] of [[256, 190, 4], [261, 191, 3], [292, 240, 4], [300, 242, 4], [300, 238, 3]]) crate(w, x, g(x, z) + 1, z, s);
      for (const [x, z] of [[258, 242], [264, 243]]) barrel(w, x, g(x, z) + 1, z, 7);
      for (const [lx, lz] of [[250, 186], [292, 184], [250, 240], [316, 200]]) lights.push({ p: lampPost(lx, lz, 10), c: '#ffe0a0', i: 1, d: 26, flicker: 0.05, night: true });

      // ───────── 비둘기 떼(부품): 윗광장 종탑 앞에 모여 있다가 탑을 한 바퀴 돈다 ─────────
      const PGX = 148, PGZ = 124, pgy = UP + 1, PC = [BC + 0.5, g0 + 88, BZ + 9.5], pigeons = [];
      [[0, 0, 0.3], [6, 4, 1.7], [-6, 2, 3.1], [2, 8, 4.4], [-4, -4, 5.6]].forEach(([dx, dz, th0], k) => {
        const x = PGX + dx, z = PGZ + dz, p = w.prop({ name: 'pigeon' + k, pivot: [x + 0.5, pgy, z + 0.5] });
        p.set(x, pgy, z, B.beakP); p.set(x, pgy, z + 1, B.beakP);
        p.box(x - 2, pgy + 1, z, x + 1, pgy + 2, z + 1, B.pigeon); p.box(x - 1, pgy + 2, z, x, pgy + 2, z + 1, B.pigeonN);
        p.box(x - 4, pgy + 2, z, x - 3, pgy + 2, z + 1, B.pigeonN); p.box(x + 2, pgy + 3, z, x + 3, pgy + 4, z + 1, B.pigeonN); p.set(x + 4, pgy + 3, z, B.beakP); p.set(x + 3, pgy + 4, z + 1, B.ironDk);
        pigeons.push({ k, x, z, th0 });
      });
      acts.push({
        name: '비둘기 떼', hint: '종탑 앞에서 모이를 쪼던 비둘기들이 한꺼번에 날아올라 탑을 크게 돌고 북쪽 하늘로 사라져요', hit: [PGX - 9, pgy, PGZ - 6, PGX + 8, pgy + 4, PGZ + 10],
        run: async a => {
          a.burst([PGX + 0.5, pgy + 1, PGZ + 2.5], { n: 20, colors: ['#e8d8a8', '#c8b088'], speed: 6, up: 4, life: 0.8, gravity: 12, spread: 6, flat: true });
          await Promise.all(pigeons.map(async g2 => {
            const R = 32 + g2.k * 2, pts = [[0, 10, 0]], s0 = [g2.x + 0.5, pgy, g2.z + 0.5];
            for (let i = 0; i <= 30; i++) { const t = g2.th0 + i / 15 * Math.PI, y = PC[1] + 8 * Math.sin(i / 30 * Math.PI * 2 + g2.k); pts.push([PC[0] + R * Math.cos(t) - s0[0], y - s0[1], PC[2] + R * Math.sin(t) - s0[2]]); }
            const L = pts[pts.length - 1];
            pts.push([L[0] - 60, L[1] + 16, L[2] - 80], [L[0] - 140, L[1] + 28, -s0[2] - 60]);
            await a.wait(g2.k * 0.25);
            await a.drive('pigeon' + g2.k, pts, 11, { fwd: '+x', back: 1.0 });
          }));
        },
      });

      // 아랫광장의 상자와 통(빈 자리에만)
      const free = (x0, z0, x1, z1, y) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) { if (MH.g(w, x, z) !== y) return false; for (let yy = y + 1; yy <= y + 9; yy++) if (w.get(x, yy, z)) return false; } return true; };
      for (let i = 0, placed = 0; i < 400 && placed < 22; i++) {
        const x = w.ri(116, 240), z = w.ri(148, 250);
        if (MH.dist(x, z, FX, FZ) < 30 || MH.dist(x, z, HXX, HZZ) < 10 || Math.abs(z - CZ) < 9 || z > 242 || (z > 158 && x > 140 && x < 166)) continue;
        if (!free(x - 3, z - 3, x + 4, z + 4, LO)) continue;
        if (w.chance(0.5)) { crate(w, x - 1, LO + 1, z - 1, 4); if (w.chance(0.4)) crate(w, x, LO + 5, z, 3); }
        else barrel(w, x, LO + 1, z, 7);
        placed++;
      }
      void lights0;
      // 굴뚝 연기
      const smoke = smokes.slice(0, 6).map(c => ({ n: 22, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 1.2, area: [c[0], c[2], 1.2], y0: c[1], y1: c[1] + 36, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  }));
})();
