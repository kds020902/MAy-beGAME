// 갈매기 항구 — 언덕 비탈의 마을, 돌 안벽과 부두, 곶 끝의 등대, 서쪽 후미의 조선소 (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 늘어난 해상도로 세부를 그린다: 낱돌로 쌓은 안벽 앞면과 갓돌, 무늬 돌길, 말뚝·밧줄 난간이 있는 널판 부두, 계류 말뚝,
// 용골·외판 띠·난간·돛대·활대·솔기 있는 돛·버팀줄이 있는 배, 창틀·창살·덧문·꽃상자가 있는 흰 집, 기와 겹과 처마·물받이,
// 벽돌 굴뚝, 아치 창이 있는 교회와 종이 보이는 종루, 받침돌·창·회랑 난간·유리 등실·돔 지붕이 있는 줄무늬 등대 등.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  const K = 168 / 128;                       // 원본 지도 좌표계의 비율
  MAPS.push({
    id: 'harbor', cat: 'village', name: '갈매기 항구', en: 'Gull Harbor', color: '#5ab0d0', seed: 113, base: 44, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '언덕 비탈에 흰 집들이 층층이 들어선 항구. 어부들은 새벽마다 곶의 등대를 보고 바다로 나가고, 서쪽 후미 조선소에서는 새 배가 바다로 미끄러져 나간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '어부와 선원, 배 목수 100여 명'], ['특산물', '훈제 청어 · 구름 진주 · 참나무 어선'], ['소문', '밤마다 등대지기가 바다를 향해 노래한다']] },
    sky: ['#ffc48a', '#4e5c9c', '#ffe0a0'], stars: false,
    hemi: ['#ffe8d0', '#3a4a6a', 0.56], sun: ['#ffd0a0', 0.8, [0.6, 0.8, 0.5]],
    liquid: ['#1f5a80', '#3a86b0', '#eaf8ff'], liqSpeed: 0.9,
    fog: { box: [168, 168, 168, 172], start: 0.8, floor: 24, depth: 20 },
    camY: 8, zoom: 1.05,
    particles: [
      { n: 180, colors: ['#ffffff', '#d8f0ff'], mode: 'drift', speed: 0.6, y0: 48, y1: 120, glow: false },
      { n: 40, colors: ['#ffffff'], mode: 'wisp', speed: 2, size: 2, y0: 92, glow: false },
    ],
    blocks: {
      grass: { c: '#7a5a3a', top: '#7aa84a', v: 0.08 }, grass2: { c: '#7a5a3a', top: '#8ab85a', v: 0.08 }, grass3: { c: '#7a5a3a', top: '#6a9a42', v: 0.08 },
      sand: { c: '#c8b080', top: '#ecd8a4', v: 0.05 }, sand2: { c: '#c0a878', top: '#e0cc98', v: 0.05 }, dirt: { c: '#7a5a3a', v: 0.08 },
      rock: { c: '#6e6e78', v: 0.06, pat: 'stone' }, rockDk: { c: '#4e4e58', v: 0.06, pat: 'stone' }, cliff: { c: '#7e7a78', v: 0.06, pat: 'big' }, weed: { c: '#3a5a40', v: 0.08 },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cobble2: { c: '#7e7a72', top: '#9a968c', v: 0.06 }, cobble3: { c: '#948e84', top: '#b4ae9e', v: 0.06 }, cobbleJ: { c: '#6a665e', top: '#76726a', v: 0.04 },
      quay: { c: '#8e8a84', v: 0.05, pat: 'big' }, cope: { c: '#b8b2a6', v: 0.04 }, copeJ: { c: '#8a847a', v: 0.03 },
      plaster: { c: '#f2eee4', v: 0.03 }, plasterB: { c: '#a8c8dc', v: 0.03 }, plasterY: { c: '#f0dca0', v: 0.03 },
      frame: { c: '#5a4030', v: 0.05 }, frameDk: { c: '#46301e', v: 0.04 }, mullion: { c: '#f4f0e8', v: 0.02 }, sill: { c: '#b8b2a6', v: 0.04 }, mortar: { c: '#a49c8c', v: 0.04 },
      st1: { c: '#8e8c88', v: 0.05 }, st2: { c: '#7c7a76', v: 0.05 }, st3: { c: '#9c988e', v: 0.05 }, st4: { c: '#84887c', v: 0.05 },
      tileB: { c: '#3a6a9a', v: 0.05 }, tileB2: { c: '#2e5a86', v: 0.04 }, tileB3: { c: '#4a7cac', v: 0.05 }, tileBDk: { c: '#2a4a6a', v: 0.04 },
      tile: { c: '#b0503a', v: 0.05 }, tile2: { c: '#94402e', v: 0.04 }, tile3: { c: '#c0604a', v: 0.05 }, tileDk: { c: '#7a3028', v: 0.05 },
      shingle: { c: '#6a7a8a', v: 0.05 }, shingle2: { c: '#5a6a7a', v: 0.04 }, shingle3: { c: '#7a8a98', v: 0.05 }, shingleDk: { c: '#4a5868', v: 0.04 },
      door: { c: '#3a5a7a', v: 0.03, pat: 'plank' }, doorDk: { c: '#2a4258', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 },
      shutter: { c: '#3a7ab0', v: 0.02 }, shutterDk: { c: '#2e6698', v: 0.02 }, hinge: { c: '#2e2e34', v: 0.02 },
      iron: { c: '#4a4a52', v: 0.03 }, ironDk: { c: '#33333a', v: 0.03 }, gutter: { c: '#6a6e72', v: 0.03 },
      brick: { c: '#9a4a3a', v: 0.05, pat: 'brick' }, brick2: { c: '#84402f', v: 0.05, pat: 'brick' }, pot: { c: '#b8643a', v: 0.04 },
      win: { c: '#ffd890', night: true, day: '#a8d8f0' }, lamp: { c: '#fff0a0', night: true, day: '#d8d0b0' }, hole: { c: '#2a2420', v: 0.02 },
      lens: { c: '#ffe890', night: true, day: '#c8d8e0' }, glass: { c: '#c8e4f0', v: 0.02 }, beam: { c: '#fff6c8', night: true, day: '#000000' },
      stripeR: { c: '#d04a3a', v: 0.03 }, stripeW: { c: '#f4f0e8', v: 0.02 },
      plank: { c: '#9a6a40', v: 0.06, pat: 'plank' }, plank2: { c: '#8a5c36', v: 0.06, pat: 'plank' }, post: { c: '#4a3020', v: 0.05 }, wood: { c: '#6a4428', v: 0.05 },
      hull: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, hullB: { c: '#2a4a6a', v: 0.04 }, hullN: { c: '#3a7a6a', v: 0.04, pat: 'plank' }, deck: { c: '#b08a5a', v: 0.05, pat: 'plank' },
      sail: { c: '#f0ead8', v: 0.03 }, sail2: { c: '#ded6c0', v: 0.03 }, mast: { c: '#5a3a24', v: 0.04 },
      net: { c: '#8a8a70', v: 0.1 }, fish: { c: '#b8c8d0', v: 0.08 }, fishDk: { c: '#7a8a98', v: 0.06 }, ice: { c: '#e8f4f8', v: 0.03 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      crate: { c: '#a07a4a', v: 0.05, pat: 'plank' }, crateEdge: { c: '#6e5030', v: 0.04 },
      rope: { c: '#c8b890', v: 0.04 }, bark: { c: '#5a3a24', v: 0.06 }, barkDk: { c: '#463020', v: 0.05 },
      leaf: { c: '#4a8a3a', v: 0.1 }, leaf2: { c: '#6aaa48', v: 0.1 }, leafDk: { c: '#3a6a30', v: 0.08 }, leafLt: { c: '#8ac25a', v: 0.08 },
      flower: { c: '#e86a8a', v: 0.05 }, flower2: { c: '#f0e060', v: 0.05 }, flower3: { c: '#ffffff', v: 0.03 }, flower4: { c: '#f08a4a', v: 0.05 }, flower5: { c: '#7a8ae8', v: 0.05 },
      flowerStem: { c: '#4a8a34', v: 0.08 }, flowerLf: { c: '#5e9e44', v: 0.08 }, fern: { c: '#5a9a40', v: 0.12 }, soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 },
      bell: { c: '#c8a050', v: 0.05 }, timber: { c: '#b8875a', v: 0.06, pat: 'log' }, rib: { c: '#c89a68', v: 0.05 }, tar: { c: '#1e1a18', v: 0.02 }, ember: { c: '#ff8a3a', glow: true },
      sawdust: { c: '#d8c090', v: 0.08 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sea = base;
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const lights = [], acts = [], landmarks = [];
      // ───────── 지형: 원본 높이 함수를 두 배로 ─────────
      const b0 = 22;
      const coastZ = ox => 94.5 + (n.fbm(ox * 0.03 / K, 5, 3) - 0.5) * 13;      // 원본 좌표
      const head = (ox, oz) => MH.segDist(ox, oz, 137, 87, 148, 131);
      const cove = (ox, oz) => MH.dist(ox, oz, 34, 102) < 23.6;
      const grassAt = (x, z) => { const f = n.fbm(x * 0.04 + 7, z * 0.04, 2); return f > 0.6 ? B.grass2 : f < 0.38 ? B.grass3 : B.grass; };
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const ox = x / 2, oz = z / 2;
          let k = coastZ(ox) - oz;
          const hd = head(ox, oz);
          if (hd < 10.5) k = Math.max(k, 10.5 - hd);
          const land = b0 + 2 + Math.max(0, k) * 0.34 / K + n.fbm(ox * 0.05 / K, oz * 0.05 / K) * 2;
          const t = cove(ox, oz) ? MH.sstep(-10.5, 10.5, k) : MH.sstep(-1.3, 3.3, k);
          return base + 2 * (MH.lerp(b0 - 7 + n.fbm(ox * 0.08, oz * 0.08) * 2, land, t) - b0);
        },
        surface: (x, z, y, s) => y <= sea + 2 ? (hash3(x >> 1, 2, z >> 1) > 0.7 ? B.sand2 : B.sand) : s >= 3 ? B.cliff : grassAt(x, z),
        under: (x, z, y, dep, s) => dep < 4 && s < 3 && y > sea ? B.dirt : (((y >> 1) & 3) === 0 ? B.rockDk : B.cliff),
      });

      // ───────── 공통 도구(2배 해상도용, v-millbrook-hd.js에서 옮김) ─────────
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.cobbleJ;
        return [B.cobble, B.cobble2, B.cobble3][(hash3(Math.floor((x + off) / 4), row, 7) * 3) | 0];
      };
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); }, get: (x, y, z) => p.get(x, y, z) });
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
        for (let k = 0; k < 5; k++) {
          const a = k * 1.2566 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2.5;
          w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, B.barkDk, t => t < 0.5 ? 1 : 0.6);
        }
        const nB = o.branches || 4, r = o.r || 6.5, ends = [[x, y + h + 1, z, 1.1]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * w.r(0.45, 0.7);
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(w, ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 2; q++) { const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75; clump(w, ex + Math.cos(a) * dd, ey + 1 + (q - 0.5) * rc * 0.4, ez + Math.sin(a) * dd, rc * 0.62, L); }
        });
      };
      // 통: 가운데 (x,z), 볼록한 몸통, 쇠테 둘, 뚜껑. r: 굵기
      const barrel = (T, x, y, z, ht, r) => {
        ht = ht || 7; r = r || 2.6;
        const R = Math.ceil(r);
        for (let k = 0; k < ht; k++) {
          const mid = k >= 2 && k <= ht - 3, rr = mid ? r : r - 0.4;
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            let b;
            if (k === ht - 1) b = outer ? B.cask : B.caskTop;
            else if ((k === 1 || k === ht - 2) && outer) b = B.iron;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            T.set(x + dx, y + k, z + dz, b);
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
      const coil = (T, x, y, z) => { for (let k = 0; k < 2; k++) T.ring(x, z, y + k, 0.8, 2.2 - k * 0.5, B.rope); };
      // 가로등: 돌 받침, 쇠기둥과 고리, 유리 등롱(모서리 쇠살), 갓과 꼭지. y0를 주면 그 높이에 세운다
      const lampPost = (x, z, h, y0) => {
        h = h || 10;
        const y = y0 != null ? y0 : g(x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.sill);
        if (y0 == null) w.box(x - 1, y - 2, z - 1, x + 1, y - 1, z + 1, B.sill);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.ironDk); w.set(x, ly + 7, z, B.brass);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const flowerAt = (T, x, y, z, hd, tall) => { T.set(x, y, z, B.flowerStem); if (tall) { T.set(x, y + 1, z, B.flowerStem); T.set(x, y + 2, z, hd); } else T.set(x, y + 1, z, hd); };
      const FLW = [B.flower, B.flower2, B.flower3, B.flower4, B.flower5];
      const fishAt = (T, x, y, z, alongX) => {   // 매단 생선 한 마리: 머리·몸통·꼬리
        T.set(x, y, z, B.fish); T.set(x, y - 1, z, B.fish); T.set(x, y - 2, z, B.fishDk);
        if (alongX) T.set(x + 1, y - 2, z, B.fishDk); else T.set(x, y - 2, z + 1, B.fishDk);
      };

      // ───────── 집 ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      // 창: 5폭 유리, 창살, 바깥 창틀, 창턱, 덧문(살결·경첩), 꽃상자. o.arch면 위가 둥근 창
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr || (o.arch && r === Math.floor(wh * 0.3))) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
        let top = wy + wh;
        if (o.arch) {
          for (let c = 1; c <= 3; c++) { put(sd, wu + c, top, 0, c === 2 ? B.mullion : B.win); put(sd, wu + c, top, 1, 0); }
          put(sd, wu + 2, top + 1, 0, B.win); put(sd, wu + 2, top + 1, 1, 0);
          put(sd, wu, top, 1, B.sill); put(sd, wu + 4, top, 1, B.sill); put(sd, wu + 1, top + 1, 1, B.sill); put(sd, wu + 3, top + 1, 1, B.sill); put(sd, wu + 2, top + 2, 1, B.sill);
        }
        for (let r = -1; r < wh; r++) { put(sd, wu - 1, wy + r, 1, B.frame); put(sd, wu + 5, wy + r, 1, B.frame); }
        if (!o.arch) for (let c = -1; c <= 5; c++) put(sd, wu + c, top, 1, B.frame);
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
      // 문: 5폭 9높이, 테두리 살 + 움푹한 판, 놋 손잡이, 문틀, 땅까지 내려가는 돌계단, 벽 등롱
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
          for (let d = 2; d < 16; d++) {
            const top = yb - d;
            let any = false;
            for (let c = -2; c <= 6; c++) {
              const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
              if (gg < 0 || gg >= top) continue;
              any = true;
              for (let y = gg; y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
              for (let y = top + 1; y <= yb + 9; y++) w.set(p[0], y, p[1], 0);
            }
            if (!any) break;
          }
          for (let c = -2; c <= 6; c++) { const p = sd.at(u0 + c, 1); for (let y = yb; y <= yb + 9; y++) if (c >= 0 && c <= 4) w.set(p[0], y, p[1], 0); }
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
      // 박공지붕: 겹 쌓인 기와(이음줄 엇갈림), 두꺼운 처마 끝, 용마루, 박공널, 물받이·홈통, 다락 박공벽과 박공창
      const PAL = { b: [B.tileB, B.tileB2, B.tileB3, B.tileBDk], r: [B.tile, B.tile2, B.tile3, B.tileDk], s: [B.shingle, B.shingle2, B.shingle3, B.shingleDk] };
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, P4 = o.pal || PAL.b;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            const b = s === 0 ? P4[3] : seam ? P4[1] : (hash3(l >> 2, s, 5) > 0.72 ? P4[2] : P4[0]);
            P(a, l, ry, b); P(a, l, ry - 1, P4[3]);
            if (s === sMax) P(a, l, ry + 1, o.ridge || P4[3]);
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        if (!o.noGableWin) {
          const mid = (A0 + A1) / 2, midA = Math.floor(mid);
          for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
            const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35));
            if (gy + 4 > y0 + Math.floor((A1 - A0) / 2)) continue;
            const odd = (A1 - A0) % 2 === 0;
            for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy + r, 0); }
            for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
            for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, B.frame); P(midA + (odd ? 2 : 3), out, gy + r, B.frame); }
          }
        }
        if (o.gutter) for (const [ae, sg] of [[a0 - 1, -1], [a1 + 1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const l = g0 + 1, aw = sg < 0 ? A0 - 1 : A1 + 1;
          for (let k = 0; k <= ov; k++) P(ae - sg * k, l, y0 - 2 - k, B.gutter);
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
      // 집 전체(흰 회벽 + 귀돌 + 처마 돌띠). o: x,z,sx,sz,floors,fh,face,pal,wall,chimney,balcony,box,lantern,winH,arch,plank
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall || B.plaster;
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0));
          }
        }
        let yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        const S = SIDES(x0, z0, x1, z1);
        for (let f = 0; f < fl; f++) {
          w.box(x0, yb, z0, x1, yb + fh - 1, z1, wall);
          const wh = o.winH || Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0, isBal = k === face && o.balcony === f && f > 0;
            const nW = Math.max(1, Math.floor((L + 2) / (o.winGap || 12))), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if ((isDoor || isBal) && Math.abs(c - cu) < 9) continue;
              if (wu - 1 <= sd.u0 + 1 || wu + 5 >= sd.u1 - 1) continue;
              wins.push(wu);
            }
            if (o.plank) {
              for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) if ((u - sd.u0) % 4 === 0) put(sd, u, y, 1, B.frame);
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, yb + fh - 1, 1, B.frameDk);
            } else {
              // 귀돌(모서리에 엇갈린 돌)과 처마 밑 돌띠
              for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0, sd.u0 + 1, sd.u1 - 1, sd.u1]) if (((y - yb) >> 1) & 1) put(sd, u, y, 0, B.sill);
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, yb + fh - 1, 1, B.sill);
            }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: !o.arch && (f > 0 || k !== 'n'), box: o.box && k === face, arch: o.arch });
            if (isDoor) { const r = doorAt(sd, cu, yb, { steps: true, lantern: o.lantern !== false }); out.door = r.door; out.lamp = r.lamp; out.side = sd; }
            if (isBal) {
              doorAt(sd, cu, yb, {});
              for (let u = cu - 6; u <= cu + 6; u++) for (let d = 1; d <= 5; d++) { put(sd, u, yb - 1, d, B.plank); if (u % 3 === 0) put(sd, u, yb - 2, d, B.frameDk); }
              for (let u = cu - 6; u <= cu + 6; u++) { put(sd, u, yb + 3, 5, B.iron); if (u % 2 === 0 || Math.abs(u - cu) === 6) for (let y = yb; y <= yb + 2; y++) put(sd, u, y, 5, B.ironDk); }
              for (let d = 1; d <= 5; d++) for (const u of [cu - 6, cu + 6]) { put(sd, u, yb + 3, d, B.iron); if (d % 2) for (let y = yb; y <= yb + 2; y++) put(sd, u, y, d, B.ironDk); }
              for (const u of [cu - 5, cu + 5]) { put(sd, u, yb, 4, B.pot); put(sd, u, yb + 1, 4, B.flowerLf); put(sd, u, yb + 2, 4, FLW[(u + 5) % 5]); }
            }
          }
          yb += fh;
        }
        const top = yb, axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(x0, x1, z0, z1, top, { axis, pal: o.pal, gable: wall, gutter: true, foot: gy + 3, ridge: o.ridge });
        out.top = top;
        if (o.chimney) {
          const cx = axis === 'x' ? x0 + 3 : Math.floor((x0 + x1) / 2) - 1, cz = axis === 'x' ? Math.floor((z0 + z1) / 2) - 1 : z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };

      // ───────── 배: 용골, 흘수선 아래 검푸른 바닥, 외판 띠, 난간, 돛대·활대·돛(솔기와 배부름)·버팀줄 ─────────
      // 뱃머리는 +x(along 'x') 또는 +z. y는 갑판 높이
      const shipHD = (p, x0, y, zc, len, half, m, o) => {
        o = o || {};
        const alongZ = o.alongZ;
        const S = (s, dy, k, b) => alongZ ? p.set(zc + k, y + dy, x0 + s, b) : p.set(x0 + s, y + dy, zc + k, b);
        const wdAt = s => { const t = s / (len - 1); return half * Math.sqrt(Math.max(0, 1 - ((t - 0.42) / 0.62) ** 2)); };
        let prevR = null;
        for (let s = 0; s < len; s++) {
          const t = s / (len - 1), wd = wdAt(s), wR = Math.round(wd), sheer = t > 0.82 ? Math.round((t - 0.82) * 8) : (t < 0.08 ? 1 : 0);
          if (t > 0.04 && t < 0.97) S(s, -4, 0, m.keel);
          for (let dy = -3; dy <= -1; dy++) {
            const wl = Math.round(wd * (1 + dy * 0.22));
            for (let k = -wl; k <= wl; k++) S(s, dy, k, dy <= -2 ? m.keel : (Math.abs(k) === wl ? m.strake : m.hull));
          }
          for (let k = -wR; k <= wR; k++) S(s, 0, k, Math.abs(k) === wR ? m.hull : m.deck);
          const lo = prevR == null ? wR : Math.min(prevR, wR);
          for (const sg of [-1, 1]) for (let k = lo; k <= wR; k++) {
            for (let dy = 1; dy <= 1 + sheer; dy++) S(s, dy, sg * k, m.hull);
            S(s, 2 + sheer, sg * k, m.rail);
          }
          if (prevR != null && prevR > wR) for (const sg of [-1, 1]) for (let k = wR; k <= prevR; k++) { S(s - 1, 1, sg * k, m.hull); S(s - 1, 2, sg * k, m.rail); }
          if (s === 0) for (let k = -wR; k <= wR; k++) { S(s, 1, k, m.hull); S(s, 2, k, m.hull); S(s, 3, k, m.rail); }
          prevR = wR;
        }
        // 이물(곧게 솟은 이물대와 앞 돛대 활대), 고물(키와 키손잡이)
        for (let dy = -3; dy <= 4; dy++) S(len, dy, 0, m.rail);
        S(len + 1, 4, 0, m.rail); S(len + 1, 5, 0, m.rail);
        p.line(...(alongZ ? [zc, y + 5, x0 + len + 1, zc, y + 7, x0 + len + 6] : [x0 + len + 1, y + 5, zc, x0 + len + 6, y + 7, zc]), m.mast);
        for (let dy = -4; dy <= 1; dy++) S(-1, dy, 0, m.rail);
        S(1, 3, 0, m.mast); S(2, 3, 0, m.mast); S(3, 3, 0, m.mast);
        // 돛대
        const ms = Math.floor(len * 0.5), mh = o.mast || 24;
        for (let dy = 1; dy <= mh; dy++) S(ms, dy, 0, dy % 6 === 0 ? B.iron : m.mast);
        for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) S(ms + a, 1, b, m.mast);
        S(ms, mh + 1, 0, m.mast);
        const yw = half + 2;
        for (let k = -yw; k <= yw; k++) { S(ms, mh - 2, k, m.mast); S(ms, 6, k, m.mast); }
        // 돛: 활대 사이, 가로 솔기, 가운데가 앞으로 부푼다
        for (let dy = 7; dy <= mh - 3; dy++) for (let k = -yw + 1; k <= yw - 1; k++) {
          const belly = Math.abs(k) <= yw - 3 && dy > 8 && dy < mh - 4 ? 1 : 0;
          let b = (dy - 7) % 4 === 3 ? m.sail2 : m.sail;
          if (m.stripe && ((k + yw) >> 1) % 2 === 0 && (dy - 7) % 4 !== 3) b = m.stripe;
          S(ms + 1 + belly, dy, k, b);
          if (belly) S(ms + 1, dy, k, 0);
        }
        // 버팀줄
        const P3 = (s, dy, k) => alongZ ? [zc + k, y + dy, x0 + s] : [x0 + s, y + dy, zc + k];
        p.line(...P3(ms, mh, 0), ...P3(len + 5, 7, 0), B.rope);
        p.line(...P3(ms, mh, 0), ...P3(0, 4, 0), B.rope);
        for (const sg of [-1, 1]) p.line(...P3(ms, mh - 3, 0), ...P3(ms - 1, 3, sg * Math.round(wdAt(ms - 1))), B.rope);
        if (m.cargo === 'net') { for (let s = 2; s <= 6; s++) for (let k = -2; k <= 2; k++) { S(s, 1, k, B.net); if (Math.abs(k) < 2 && s > 2 && s < 6) S(s, 2, k, hash3(s, k, zc) > 0.6 ? B.fish : B.net); } }
        else if (m.cargo) { crate(o.T || p, ...(alongZ ? [zc - 2, y + 1, x0 + 2] : [x0 + 2, y + 1, zc - 2]), 4); }
        return { ms, mh };
      };

      // ───────── 돌 안벽: 무늬 돌길 윗면, 갓돌, 낱돌 앞면, 계류 말뚝, 물로 내려가는 돌계단 ─────────
      const QZ0 = 194, QZ1 = 208, QX0 = 104, QX1 = 258;
      for (let z = QZ0 - 6; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) MH.setH(w, x, z, sea + 4, z >= QZ1 - 1 ? (x % 6 === 5 ? B.copeJ : B.cope) : B.cobble, B.quay);
      for (let z = QZ1 + 1; z < D; z++) for (let x = 78; x <= 268; x++) if (head(x / 2, z / 2) > 13 && !cove(x / 2, z / 2) && MH.g(w, x, z) > sea - 12) MH.setH(w, x, z, sea - 12, hash3(x >> 2, 9, z >> 2) > 0.8 ? B.weed : B.sand, B.rockDk);
      for (let x = QX0; x <= QX1; x++) for (let y = sea - 13; y <= sea + 3; y++) w.set(x, y, QZ1, stoneAt(x, y, 7) || B.mortar);
      for (let x = QX0; x <= QX1; x++) for (let y = sea - 13; y <= sea - 1; y++) if (hash3(x, y, 4) > 0.75) w.set(x, y, QZ1, B.weed);
      MH.water(w, sea);
      const bollard = (x, z, y) => { w.box(x, y, z, x + 1, y + 2, z + 1, B.iron); w.box(x - 1, y + 3, z - 1, x + 2, y + 3, z + 2, B.ironDk); w.box(x, y + 4, z, x + 1, y + 4, z + 1, B.iron); };
      for (let x = QX0 + 4; x <= QX1 - 4; x += 12) if (x < 144 || (x > 156 && x < 208) || x > 220) bollard(x, QZ1 - 3, sea + 5);
      // 안벽 물 쪽 계단(바다로 내려가는 돌계단)
      for (const sx of [128, 196]) for (let k = 0; k < 7; k++) {
        const z = QZ1 + 1 + k, top = sea + 3 - k;
        for (let x = sx; x <= sx + 5; x++) for (let y = sea - 12; y <= top; y++) w.set(x, y, z, y === top ? B.cope : (stoneAt(z, y, 11) || B.mortar));
        for (const x of [sx - 1, sx + 6]) for (let y = sea - 12; y <= top + 1; y++) w.set(x, y, z, y === top + 1 ? B.cope : B.st2);
      }
      // 나무 선착장 둘(남쪽으로): 널판 마루, 장선, 말뚝, 처지는 밧줄 난간
      const piers = [[146, 153], [210, 217]], PZ1 = 268;
      for (const [x0, x1] of piers) {
        for (let z = QZ1 + 1; z <= PZ1; z++) for (let x = x0; x <= x1; x++) {
          w.set(x, sea + 4, z, (z >> 1) % 5 === 0 ? B.plank2 : B.plank);
          if (x === x0 + 1 || x === x1 - 1) w.set(x, sea + 3, z, B.post);
          if ((x === x0 || x === x1) && z % 8 === 4) { for (let y = MH.g(w, x, z) + 1; y <= sea + 7; y++) w.set(x, y, z, B.post); w.set(x, sea + 8, z, B.iron); }
        }
        for (let z = QZ1 + 1; z <= PZ1; z++) {
          const t = ((z - 4) % 8 + 8) % 8, yR = t >= 3 && t <= 5 ? sea + 6 : sea + 7;
          if (t !== 0) for (const x of [x0, x1]) w.set(x, yR, z, B.rope);
        }
        for (let z = QZ1 + 8; z <= PZ1; z += 16) w.line(x0 + 1, sea - 2, z, x1 - 1, sea + 2, z, B.post);   // 물속 가새
        lights.push({ p: lampPost(x0 + 3, PZ1 - 2, 10, sea + 5), c: '#ffd890', i: 1, d: 24, flicker: 0.1, night: true });
        // 선착장 위 짐: 통·상자·감긴 밧줄
        barrel(w, x0 + 2, sea + 5, 224, 6, 1.7); barrel(w, x0 + 2, sea + 5, 229, 6, 1.7); barrel(w, x0 + 2, sea + 11, 226, 6, 1.7);
        crate(w, x1 - 4, sea + 5, 240, 4); crate(w, x1 - 4, sea + 5, 244, 4); crate(w, x1 - 3, sea + 9, 241, 3);
        coil(w, x1 - 3, sea + 5, 254);
      }
      landmarks.push({ name: '선착장', note: '두 줄로 뻗은 나무 부두', p: [181, sea + 26, 242] });

      // ───────── 배: 흘수선 아래가 물에 잠기게 놓는다 ─────────
      const SM = { hull: B.hull, keel: B.hullB, strake: B.stripeW, deck: B.deck, rail: B.mast, mast: B.mast, sail: B.sail, sail2: B.sail2, cargo: true };
      const b1 = w.prop({ name: 'b1', pivot: [177.5, sea + 2, 226.5], axis: 'x', rock: 0.05, rockSpeed: 1.1, bob: 0.4, bobSpeed: 1.3 });
      shipHD(b1, 164, sea + 2, 226, 26, 5, SM, { mast: 26 });
      const b2 = w.prop({ name: 'b2', pivot: [179.5, sea + 2, 252.5], axis: 'x', rock: 0.06, rockSpeed: 0.9, bob: 0.4, bobSpeed: 1.1, phase: 2 });
      shipHD(b2, 166, sea + 2, 252, 26, 5, Object.assign({}, SM, { strake: B.stripeR, stripe: B.stripeR }), { mast: 24 });
      // 출항하는 어선: 동쪽 선착장 바깥에 매여 있다. 뱃머리는 +x
      const FXs = 240, FZs = 246;
      const fb = w.prop({ name: 'fisher', pivot: [FXs + 0.5, sea + 2, FZs + 0.5], axis: 'x', rock: 0.05, rockSpeed: 1, bob: 0.5, bobSpeed: 1.2, phase: 1 });
      shipHD(fb, FXs - 13, sea + 2, FZs, 26, 5, Object.assign({}, SM, { strake: B.hullN, sail: B.stripeW, cargo: 'net' }), { mast: 26 });
      const route = [[120, 123], [121, 130], [116, 138], [108, 143], [98, 146], [86, 148], [74, 149], [63, 152], [56, 158], [52, 165]].map(p => [p[0] * 2, p[1] * 2]);
      MH.routeOK(w, route.slice(1), 7, '어선 출항 경로');
      const out = route.slice(1).map(p => [p[0] - FXs, 0, p[1] - FZs]).concat([[98 - FXs, 0, 348 - FZs]]);
      acts.push({
        name: '어선 출항', hint: '어선이 뱃머리를 돌려 먼바다로 나가고, 다음 어선이 부두에 들어와요', hit: [FXs - 15, sea, FZs - 6, FXs + 15, sea + 28, FZs + 6],
        run: async a => {
          await a.drive('fisher', out, 10, { fwd: '+x', back: 1.0 });
        },
      });
      // 거룻배(정박)와 부두 기중기: 줄은 늘고 줄어든다
      const BGX = 224, BGZ = 214;
      w.box(BGX, sea - 1, BGZ, BGX + 25, sea, BGZ + 9, B.hullB);
      w.walls(BGX, sea + 1, BGZ, BGX + 25, sea + 3, BGZ + 9, B.hull); w.walls(BGX, sea + 3, BGZ, BGX + 25, sea + 3, BGZ + 9, B.mast);
      w.box(BGX + 1, sea + 1, BGZ + 1, BGX + 24, sea + 1, BGZ + 8, B.deck);
      crate(w, BGX + 2, sea + 2, BGZ + 1, 4); crate(w, BGX + 6, sea + 2, BGZ + 1, 4); crate(w, BGX + 3, sea + 6, BGZ + 2, 3);
      barrel(w, BGX + 20, sea + 2, BGZ + 3, 6, 1.7); barrel(w, BGX + 20, sea + 2, BGZ + 7, 6, 1.7);
      const CX = 238, CZ = 198, cg = sea + 5, ARM = cg + 28;
      for (let y = cg; y <= cg + 1; y++) for (let z = CZ - 4; z <= CZ + 4; z++) for (let x = CX - 4; x <= CX + 4; x++) w.set(x, y, z, y === cg + 1 && (Math.abs(x - CX) === 4 || Math.abs(z - CZ) === 4) ? B.cope : (stoneAt(x + z, y, 13) || B.mortar));
      w.box(CX - 2, cg + 2, CZ - 2, CX + 2, cg + 3, CZ + 2, B.sill);
      w.box(CX, cg + 4, CZ, CX + 1, ARM, CZ + 1, B.post);
      for (let y = cg + 8; y < ARM; y += 8) w.box(CX - 1, y, CZ - 1, CX + 2, y, CZ + 2, B.iron);
      for (const [dx, dz] of [[-3, 0], [4, 0], [0, -3], [0, 4]]) w.line(CX + dx, cg + 4, CZ + dz, CX + (dx > 0 ? 1 : 0), cg + 14, CZ + (dz > 0 ? 1 : 0), B.post);
      w.box(CX, ARM + 1, CZ - 6, CX + 1, ARM + 2, CZ + 20, B.post);
      w.line(CX, ARM - 10, CZ + 1, CX, ARM, CZ + 12, B.post); w.line(CX + 1, ARM - 10, CZ + 1, CX + 1, ARM, CZ + 12, B.post);
      w.box(CX - 1, ARM - 2, CZ - 7, CX + 2, ARM, CZ - 4, B.sill);
      w.box(CX, ARM + 3, CZ + 20, CX + 1, ARM + 3, CZ + 20, B.iron); w.box(CX, ARM, CZ + 19, CX + 1, ARM, CZ + 20, B.ironDk);
      for (const dx of [-1, 2]) w.set(CX + dx, cg + 5, CZ, B.iron);
      w.box(CX - 1, cg + 4, CZ + 2, CX - 1, cg + 6, CZ + 2, B.ironDk);
      MH.rope(w, 'crope', CX, ARM - 1, CZ + 20, 8, B.rope);
      const load = w.prop({ name: 'load', pivot: [CX + 0.5, ARM - 12, CZ + 20.5] });
      load.set(CX, ARM - 9, CZ + 20, B.ironDk);
      crate(load, CX - 2, ARM - 14, CZ + 18, 5);
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) load.set(CX + Math.sign(dx), ARM - 9, CZ + 20 + Math.sign(dz), B.rope);
      acts.push({
        name: '부두 기중기', hint: '밧줄이 풀려 짐을 거룻배에 내려요', hit: [CX - 2, cg, CZ - 2, CX + 2, ARM + 3, CZ + 22],
        run: async a => {
          const drop = (ARM - 14) - (sea + 2);
          await Promise.all([a.move('load', [0, -drop, 0], 2.4, t => t), a.rope('crope', 8, 8 + drop, 2.4, t => t)]);
          await a.wait(0.9);
          await Promise.all([a.move('load', [0, 0, 0], 2.6, t => t), a.rope('crope', 8, 8, 2.6, t => t)]);
        },
      });

      // ───────── 곶의 등대 ─────────
      const LX = 292, LZ = 248, lg = g(LX, LZ) + 1;
      MH.flatten(w, LX - 16, LZ - 16, LX + 16, LZ + 16, lg - 1, B.cobble, B.cliff);
      for (let a = 0; a < 160; a++) {
        const t = a / 160 * Math.PI * 2, x = Math.round(LX + Math.cos(t) * 15.6), z = Math.round(LZ + Math.sin(t) * 15.6);
        if (Math.abs(x - LX) <= 3 && z > LZ) continue;
        w.set(x, lg, z, stoneAt(a, lg, 17) || B.st2); w.set(x, lg + 1, z, B.cope);
      }
      const LH = 68, rAt = y => 10 - (y - lg) * 0.045;
      for (let y = lg; y < lg + LH; y++) w.cyl(LX, LZ, y, y, rAt(y), Math.floor((y - lg) / 10) % 2 ? B.stripeR : B.stripeW);
      for (let y = lg; y <= lg + 4; y++) for (let dz = -12; dz <= 12; dz++) for (let dx = -12; dx <= 12; dx++) {   // 낱돌 받침
        const d = Math.hypot(dx, dz); if (d > 11.6) continue;
        if (y === lg + 4) { if (d > 9.6) w.set(LX + dx, y, LZ + dz, B.cope); continue; }
        w.set(LX + dx, y, LZ + dz, d > 10.6 ? (stoneAt(Math.round((Math.atan2(dz, dx) + Math.PI) * 11.6), y, 19) || B.mortar) : B.mortar);
      }
      // 창: 남쪽과 서쪽, 층마다
      const towerWin = (yy, ax, az) => {
        for (let r = -1; r <= 5; r++) for (let c = -2; c <= 2; c++) {
          const y = yy + r, rr = rAt(y), dep = Math.floor(Math.sqrt(Math.max(0, rr * rr - c * c)));
          const px = ax ? LX + ax * dep : LX + c, pz = az ? LZ + az * dep : LZ + c, ox = px + ax, oz = pz + az;
          if (r === -1) { w.set(ox, y, oz, B.sill); continue; }
          if (r === 5) { w.set(px, y, pz, B.frame); if (Math.abs(c) <= 1) w.set(ox, y, oz, B.sill); continue; }
          if (Math.abs(c) === 2) { w.set(px, y, pz, B.frame); continue; }
          w.set(px, y, pz, c === 0 || r === 2 ? B.mullion : B.win);
        }
      };
      for (let y = lg + 16; y < lg + LH - 10; y += 14) { towerWin(y, 0, 1); towerWin(y + 7, -1, 0); }
      // 문(남쪽): 판자문, 돌 문틀과 쐐기돌, 돌계단
      { const dz0 = LZ + Math.floor(rAt(lg + 5));
        for (let r = 0; r < 10; r++) for (let c = -2; c <= 2; c++) {
          const x = LX + c, z = LZ + Math.floor(Math.sqrt(Math.max(0, rAt(lg + 5 + r) ** 2 - c * c))), y = lg + 1 + r;
          if (y < lg + 5) { for (let zz = z; zz <= LZ + 12; zz++) w.set(x, y, zz, 0); }
          const stile = Math.abs(c) === 2 || r === 0 || r === 5 || r === 9;
          w.set(x, y, z - 1, stile ? B.doorDk : B.door);
          w.set(x, y, z, 0); w.set(x, y, z + 1, 0);
        }
        w.set(LX + 1, lg + 5, dz0 - 1, B.brass);
        for (let r = 0; r <= 10; r++) for (const c of [-3, 3]) w.set(LX + c, lg + 1 + r, dz0, B.sill);
        for (let c = -3; c <= 3; c++) w.set(LX + c, lg + 11, dz0, B.cope);
        w.set(LX, lg + 12, dz0, B.cope);
        for (let c = -3; c <= 3; c++) w.set(LX + c, lg, dz0 + 1, B.cope);
      }
      const T = lg + LH;
      // 회랑: 까치발 위 마루, 쇠 난간
      for (let y = T - 3; y < T; y++) w.cyl(LX, LZ, y, y, rAt(y) + (y - T + 4) * 0.9, B.stripeR);
      w.cyl(LX, LZ, T, T, 11.6, B.sill); w.ring(LX, LZ, T, 10.6, 11.6, B.cope);
      for (let k = 0; k < 48; k++) {
        const a = k / 48 * Math.PI * 2, x = Math.round(LX + Math.cos(a) * 11), z = Math.round(LZ + Math.sin(a) * 11);
        if (k % 2 === 0) w.box(x, T + 1, z, x, T + 3, z, B.iron);
      }
      w.ring(LX, LZ, T + 4, 10.2, 11.6, B.ironDk);
      // 등실: 받침벽, 유리창과 쇠살, 돔 지붕, 환기 구슬, 꼭대기 종
      w.cyl(LX, LZ, T + 1, T + 3, 5.6, B.stripeR); w.ring(LX, LZ, T + 3, 5, 6.2, B.iron);
      for (let y = T + 4; y <= T + 11; y++) for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
        const d = Math.hypot(dx, dz); if (d > 5.6) continue;
        if (d > 4.5) w.set(LX + dx, y, LZ + dz, (Math.round((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 4) * 2) % 2 === 0 || y === T + 8) ? B.iron : B.glass);
        else w.set(LX + dx, y, LZ + dz, d > 2.6 ? 0 : d > 1.4 ? B.lens : B.iron);
      }
      w.cyl(LX, LZ, T + 4, T + 4, 4.5, B.iron); w.cyl(LX, LZ, T + 11, T + 11, 4.5, B.iron);
      w.ring(LX, LZ, T + 12, 0, 6.6, B.ironDk);
      let cap = T + 13;
      for (let k = 0; k < 6; k++) w.cyl(LX, LZ, cap + k, cap + k, Math.sqrt(Math.max(0, 36 - k * k * 1.1)), k === 0 ? B.tileDk : (k % 2 ? B.tile : B.tile3));
      cap += 6;
      w.cyl(LX, LZ, cap, cap, 1.2, B.ironDk); w.ellipsoid(LX, cap + 2, LZ, 1.6, 1.4, 1.6, B.brass);
      w.box(LX, cap + 4, LZ, LX, cap + 8, LZ, B.iron); w.set(LX, cap + 9, LZ, B.bell);
      const beam = w.prop({ name: 'beam', pivot: [LX + 0.5, T + 7.5, LZ + 0.5], axis: 'y', speed: 0.9 });
      for (let s = 7; s <= 28; s++) { const hw = s > 20 ? 1 : 0; for (let q = -hw; q <= hw; q++) { beam.box(LX + s, T + 6, LZ + q, LX + s, T + 8 + (s > 14 ? 1 : 0), LZ + q, B.beam); beam.box(LX - s, T + 6, LZ + q, LX - s, T + 8 + (s > 14 ? 1 : 0), LZ + q, B.beam); } }
      lights.push({ name: 'light', p: [LX + 0.5, T + 7, LZ + 0.5], c: '#fff0b0', i: 1.8, d: 80, flicker: 0.05 });
      const keeper = house({ x: LX - 26, z: LZ - 36, sx: 18, sz: 16, fh: 12, face: 's', pal: PAL.r, wall: B.plaster, chimney: true, box: true });
      if (keeper.lamp) lights.push({ p: keeper.lamp, c: '#ffd890', i: 0.8, d: 18, flicker: 0.1, night: true });
      acts.push({
        name: '등대', hint: '불빛이 밝아지며 빠르게 돌아요(밤에 더 잘 보여요)', hit: [LX - 12, T - 8, LZ - 12, LX + 12, T + 16, LZ + 12],
        run: async a => {
          a.flash('light', 3, 4.5); a.glow(1.6, 4.5); a.spin('beam', 5, 4.5);
          for (let k = 0; k < 15; k++) {
            for (const j of [0, 1]) { const t = Math.PI * (0.5 + (k * 2 + j) / 30); a.burst([LX + 0.5 + Math.cos(t) * 14, T + 5 + (k % 3) * 2, LZ + 0.5 - Math.sin(t) * 14], { n: 8, colors: ['#fff6c8', '#ffe890', '#ffffff'], speed: 4, up: 1, life: 0.9, gravity: 0, spread: 1, flat: true }); }
            if (k % 3 === 0) a.burst([LX + 0.5, cap + 9, LZ + 0.5], { n: 14, colors: ['#ffe890', '#fff6c8'], speed: 3, up: 6, life: 1.2, gravity: -1, spread: 2 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '곶의 등대', note: '돌아가는 불빛이 배를 부른다', p: [LX + 0.5, cap + 16, LZ + 0.5], tag: 'LIGHT' });
      // 등대 문 → 하위 지도(등대 안). 탑 몸통이 꽉 차 있어 돌아오면 문 앞 자갈 위에 선다
      acts.push(OR.goAct({ at: [LX, lg, LZ + 12], h: 9, hit: [LX - 2, lg, LZ + 9, LX + 2, lg + 9, LZ + 12], name: '곶의 등대 안으로', goto: 'harbor-lighthouse', hint: '줄무늬 등대의 문을 열고 나선 계단이 도는 등대 안으로 들어가요' }));

      // ───────── 생선 시장(기둥 회랑) ─────────
      const MX = 112, MZ = 168, mg = sea + 5;
      MH.flatten(w, MX - 4, MZ - 4, MX + 44, MZ + 22, mg - 1, B.cobble, B.quay);
      const MT = mg + 16;
      for (let x = MX; x <= MX + 40; x += 10) for (const z of [MZ, MZ + 18]) {
        w.box(x - 1, mg, z - 1, x + 2, mg, z + 2, B.sill);
        w.box(x, mg + 1, z, x + 1, MT - 2, z + 1, B.plaster);
        w.box(x - 1, MT - 1, z - 1, x + 2, MT - 1, z + 2, B.sill);
      }
      for (let x = MX - 1; x <= MX + 42; x++) for (const z of [MZ, MZ + 1, MZ + 17, MZ + 18]) w.box(x, MT, z, x, MT + 1, z, B.frame);
      for (let z = MZ; z <= MZ + 18; z++) for (const x of [MX, MX + 1, MX + 40, MX + 41]) w.box(x, MT, z, x, MT + 1, z, B.frame);
      MH.flatten(w, MX + 2, MZ + 2, MX + 39, MZ + 16, mg - 1, B.cobble, B.quay);
      roof(MX, MX + 41, MZ, MZ + 18, MT + 2, { axis: 'x', pal: PAL.b, gable: B.plaster, ridge: B.stripeW, noGableWin: true });
      for (let x = MX + 4; x <= MX + 36; x += 8) {   // 생선 좌판: 상자 위 얼음과 생선
        crate(w, x, mg, MZ + 6, 4); crate(w, x, mg, MZ + 10, 4);
        for (let dx = 0; dx < 4; dx++) for (let dz = 0; dz < 8; dz++) w.set(x + dx, mg + 4, MZ + 6 + dz, B.ice);
        for (let dz = 1; dz < 7; dz += 2) for (let dx = 0; dx < 3; dx++) { w.set(x + dx, mg + 5, MZ + 6 + dz, dx === 2 ? B.fishDk : B.fish); }
      }
      for (const [bx, bz, st] of [[MX + 47, MZ + 5, 0], [MX + 47, MZ + 11, 0], [MX + 47, MZ + 8, 1], [MX + 53, MZ + 8, 0], [MX - 7, MZ + 12, 0]]) { const gg = MH.g(w, bx, bz); barrel(w, bx, gg + 1 + st * 7, bz, 7, 2.6); }
      w.box(MX + 20, MT - 1, MZ + 19, MX + 20, MT - 1, MZ + 20, B.iron); w.set(MX + 20, MT - 2, MZ + 20, B.ironDk); w.box(MX + 20, MT - 4, MZ + 20, MX + 20, MT - 3, MZ + 20, B.lamp); w.set(MX + 20, MT - 5, MZ + 20, B.ironDk);
      lights.push({ p: [MX + 20.5, MT - 3, MZ + 20.5], c: '#ffd890', i: 1, d: 24, flicker: 0.1, night: true });
      landmarks.push({ name: '생선 시장', note: '아침마다 청어 경매', p: [MX + 21, MT + 20, MZ + 9] });

      // ───────── 비탈의 집들, 계단 골목, 교회 ─────────
      const walls = [B.plaster, B.plasterB, B.plaster, B.plasterY];
      const lanesO = [[[39, 6], [45, 47], [58, 74], [64, 95]], [[113, 8], [102, 45], [92, 74], [95, 95]]];
      for (const l of lanesO) MH.path(w, l.map(p => [p[0] * 2, p[1] * 2]), 4, B.cobble, B.sill);
      let k = 0;
      const chim = [], chimAll = [];
      for (let z = 12; z <= 80; z += 15) for (let x = 8; x <= 130; x += 17) {
        const hx = x + w.ri(-2, 2), hz = z + w.ri(-1, 1), sx = w.ri(10, 12), sz = w.ri(8, 10);
        if (coastZ(hx + 5) - (hz + sz) < 7 || head(hx, hz) < 15 || lanesO.some(l => MH.polyDist(hx + 5, hz + 4, l) < 9) || (hx > 44 && hx < 84 && hz > 66) || (hx > 64 && hx < 96 && hz < 46 && hz > 20) || (hx < 58 && hz + sz > 56)) continue;
        const two = k % 3 === 0;
        const h = house({ x: hx * 2, z: hz * 2, sx: sx * 2, sz: sz * 2, floors: two ? 2 : 1, fh: 12, face: 's', balcony: two && k % 2 === 0 ? 1 : undefined,
          wall: walls[k % 4], pal: k % 3 === 1 ? PAL.r : PAL.b, ridge: B.stripeW, chimney: k % 2 === 1, box: k % 2 === 0, lantern: k % 3 === 0 });
        if (h.chimney && chim.length < 3) chim.push(h.chimney);
        if (h.chimney) chimAll.push(h.chimney);
        if (h.lamp) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 18, flicker: 0.1, night: true });
        // 앞마당 낮은 돌담(갓돌)과 꽃
        for (let x2 = h.x0 - 2; x2 <= h.x1 + 2; x2++) {
          const z2 = h.z1 + 6, gg = MH.g(w, x2, z2);
          if (Math.abs(x2 - h.door[0]) <= 3 || gg < 0 || w.get(x2, gg + 1, z2) || gg > h.y + 1 || w.liq[x2 + W * z2] >= 0) continue;
          const end = x2 === h.x0 - 2 || x2 === h.x1 + 2 || Math.abs(x2 - h.door[0]) === 4;
          w.set(x2, gg + 1, z2, end ? (stoneAt(x2, gg + 1, 5) || B.st2) : walls[k % 4]); w.set(x2, gg + 2, z2, end ? B.st3 : walls[k % 4]); w.set(x2, gg + 3, z2, B.sill);
          if (end) w.set(x2, gg + 4, z2, B.sill);
          else if (hash3(x2, 3, z2) > 0.72) flowerAt(w, x2, gg + 4, z2, FLW[(x2 * 3) % 5], false);
        }
        k++;
      }
      // 교회: 아치 창, 모서리 버팀벽, 종루(종이 보이는 열린 창, 처마 띠, 사각뿔 지붕)
      const CHX = 146, CHZ = 54;
      const ch = house({ x: CHX, z: CHZ, sx: 34, sz: 20, fh: 22, face: 's', pal: PAL.b, ridge: B.stripeW, wall: B.plaster, winH: 10, winGap: 10, arch: true, lantern: false });
      for (const [bx, bz] of [[ch.x0, ch.z1 + 1], [ch.x1 - 1, ch.z1 + 1], [ch.x0, ch.z0 - 3], [ch.x1 - 1, ch.z0 - 3]]) for (let d = 0; d < 3; d++) {
        const ht = 16 - d * 4;
        for (let y = ch.y; y <= ch.floor + ht; y++) for (let dx = 0; dx < 2; dx++) w.set(bx + dx, y, bz + d, y === ch.floor + ht ? B.cope : (stoneAt(bx + dx + d, y, 23) || B.sill));
      }
      const TX0 = CHX + 2, TZ0 = CHZ + 2, TS = 12, ty0 = ch.y, BT = ty0 + 46;
      for (let y = ty0; y <= BT + 12; y++) for (let z = TZ0; z < TZ0 + TS; z++) for (let x = TX0; x < TX0 + TS; x++) {
        const ex = x === TX0 || x === TX0 + TS - 1, ez = z === TZ0 || z === TZ0 + TS - 1, corner = (x <= TX0 + 1 || x >= TX0 + TS - 2) && (z <= TZ0 + 1 || z >= TZ0 + TS - 2);
        let b = (ex || ez) && corner && ((y >> 1) & 1) ? B.sill : B.plaster;
        if ((y - ty0) % 16 === 15) b = B.sill;
        if (y > BT && y <= BT + 9 && !(ex || ez)) b = 0;
        if (y > BT && y <= BT + 9 && (ex || ez)) { const u = ex ? z - TZ0 : x - TX0; if (u >= 3 && u <= 8 && (y <= BT + 7 || (u >= 4 && u <= 7 && y === BT + 8) || (u >= 5 && u <= 6 && y === BT + 9))) b = 0; }
        w.set(x, y, z, b);
      }
      for (let x = TX0 - 1; x <= TX0 + TS; x++) for (let z = TZ0 - 1; z <= TZ0 + TS; z++) if (x === TX0 - 1 || x === TX0 + TS || z === TZ0 - 1 || z === TZ0 + TS) { w.set(x, BT, z, B.sill); w.set(x, BT + 12, z, B.cope); }
      w.ellipsoid(TX0 + 5, BT + 4, TZ0 + 5, 2.6, 3, 2.6, B.bell, (dx, dy, dz) => dy <= 1 || Math.abs(dx) + Math.abs(dz) < 3);
      w.box(TX0 + 1, BT + 9, TZ0 + 5, TX0 + 10, BT + 9, TZ0 + 5, B.frame); w.box(TX0 + 5, BT + 7, TZ0 + 5, TX0 + 5, BT + 8, TZ0 + 5, B.iron);
      let st = BT + 13;
      for (let hw = 7; hw >= 0; hw--) for (let r = 0; r < 2; r++, st++) for (let z = -hw; z <= hw + 1; z++) for (let x = -hw; x <= hw + 1; x++) {
        const edge = x === -hw || x === hw + 1 || z === -hw || z === hw + 1;
        if (!edge && r === 1) continue;
        w.set(TX0 + 5 + x, st, TZ0 + 5 + z, hw === 7 ? B.tileBDk : (((x + z + st) & 3) === 0 ? B.tileB2 : B.tileB));
      }
      w.box(TX0 + 5, st, TZ0 + 5, TX0 + 6, st + 4, TZ0 + 6, B.iron); w.ellipsoid(TX0 + 5, st + 6, TZ0 + 5, 1.2, 1.2, 1.2, B.bell);
      { // 교회 앞마당: 낱돌 옹벽과 갓돌로 두른 돌마당
        const x0 = CHX - 4, x1 = CHX + 38, z0 = ch.z1 + 4, z1 = ch.z1 + 14, y = ch.y - 1;
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 || x === x1 || z === z1;
          if (gg < 0) continue;
          if (!edge) { MH.setH(w, x, z, y, B.cobble, B.mortar); continue; }
          MH.setH(w, x, z, y, B.cope, B.mortar);
          for (let yy = Math.min(gg, y) - 1; yy < y; yy++) w.set(x, yy, z, stoneAt(z === z1 ? x : z, yy, 29) || B.mortar);
        }
        const sx = Math.floor((CHX * 2 + 33) / 2);
        for (let d = 1; d < 14; d++) { let any = false; for (let x = sx - 4; x <= sx + 4; x++) { const z = z1 + d, gg = MH.g(w, x, z), top = y - d; if (gg < 0 || gg >= top) continue; any = true; for (let yy = gg; yy <= top; yy++) w.set(x, yy, z, yy === top ? B.cope : B.st2); } if (!any) break; }
      }
      landmarks.push({ name: '언덕 위 마을', note: '푸른 지붕의 흰 집과 종탑', p: [TX0 + 6, st + 8, TZ0 + 6] });
      // 교회 문 → 하위 지도(언덕 위 교회 안)
      { const [cx, cy, cz] = ch.door;
        acts.push(OR.goAct({ at: [cx, cy, cz + 2], h: 9, hit: [cx - 2, cy, cz, cx + 2, cy + 9, cz + 2], name: '언덕 위 교회 안으로', goto: 'harbor-chapel', hint: '흰 교회 문을 열고 봉헌 배 모형이 매달린 본당으로 들어가요' })); }

      // ───────── 모래톱: 건조대, 바위 ─────────
      for (const [rx, rz] of [[80, 180], [92, 186]]) {
        const gg = g(rx, rz); if (gg < sea) continue;
        for (const dx of [0, 10]) { w.box(rx + dx, gg + 1, rz, rx + dx, gg + 12, rz, B.post); w.line(rx + dx, gg + 12, rz, rx + dx + (dx ? 2 : -2), gg + 1, rz + 2, B.post); }
        w.box(rx, gg + 12, rz, rx + 10, gg + 12, rz, B.rope); w.box(rx, gg + 9, rz, rx + 10, gg + 9, rz, B.rope);
        for (let q = 1; q <= 9; q += 2) { fishAt(w, rx + q, gg + 11, rz, true); if (q % 4 === 1) fishAt(w, rx + q, gg + 8, rz, true); }
      }
      for (let i = 0; i < 14; i++) { const x = w.ri(8, 80), z = w.ri(220, 320), gg = g(x, z); if (x > 24 && x < 72) continue; if (gg >= sea - 8 && gg <= sea + 2) MH.rock(w, x, gg, z, w.r(3, 6), B.rock, null); }
      const treeAt = [];
      for (let i = 0; i < 40 && treeAt.length < 26; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, 160), gg = g(x, z);
        if (gg < sea + 6 || w.get(x, gg, z) === B.cobble || (x < 120 && z > 108)) continue;
        let clear = true;
        for (let dz = -9; dz <= 9 && clear; dz += 3) for (let dx = -9; dx <= 9 && clear; dx += 3) for (const dy of [1, 6, 14, 22]) if (w.get(x + dx, gg + dy, z + dz)) { clear = false; break; }
        if (!clear || treeAt.some(([a, b]) => Math.hypot(a - x, b - z) < 14)) continue;
        tree(x, gg + 1, z, { h: w.ri(12, 16), r: w.r(5.6, 7), trunkR: 1.6 });
        treeAt.push([x, z]);
      }
      for (const [lx, lz] of [[132, 200], [184, 200], [252, 202]]) lights.push({ p: lampPost(lx, lz, 10), c: '#ffe0a0', i: 1, d: 24, flicker: 0.1, night: true });

      // ───────── 큰 파도 ─────────
      acts.push({
        name: '큰 파도', hint: '큰 너울이 밀려와 배들이 크게 출렁이고 안벽에 물보라가 튀어요', hit: [162, sea - 2, 220, 196, sea + 28, 260],
        run: async a => {
          a.spin('b1', 6, 4); a.spin('b2', 6, 4); a.spin('fisher', 5, 4); a.wind(2.5, 4);
          for (let k2 = 0; k2 < 8; k2++) {
            for (let x = QX0 + 8 + (k2 % 2) * 14; x <= QX1 - 8; x += 28) if (x < 144 || (x > 155 && x < 208) || x > 219) a.burst([x + 0.5, sea + 2, QZ1 + 2.5], { n: 12, colors: ['#ffffff', '#eaf8ff', '#a8d8f0'], speed: 5, up: 12, life: 1, gravity: 24, spread: 3 });
            await a.wait(0.5);
          }
        },
      });
      // ───────── 종 부표 ─────────
      const BX = 184, BZB = 280;
      const buoy = w.prop({ name: 'buoy', pivot: [BX + 0.5, sea, BZB + 0.5], axis: 'x', rock: 0.08, rockSpeed: 1.3, bob: 0.5, bobSpeed: 1.5, phase: 0.7 });
      for (let y = sea - 3; y <= sea + 4; y++) { const r = y < sea - 1 ? 2.6 + (y - sea + 3) * 0.6 : y > sea + 2 ? 3.8 - (y - sea - 2) * 0.6 : 4; buoy.cyl(BX, BZB, y, y, r, y >= sea + 1 && y <= sea + 2 ? B.stripeW : B.stripeR); }
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) buoy.box(BX + dx, sea + 5, BZB + dz, BX + dx, sea + 13, BZB + dz, B.iron);
      buoy.box(BX - 3, sea + 14, BZB - 3, BX + 3, sea + 14, BZB + 3, B.stripeR); buoy.box(BX - 1, sea + 15, BZB - 1, BX + 1, sea + 15, BZB + 1, B.ironDk); buoy.box(BX, sea + 16, BZB, BX, sea + 17, BZB, B.lamp);
      buoy.set(BX, sea + 13, BZB, B.iron); buoy.ellipsoid(BX, sea + 10, BZB, 1.6, 2.2, 1.6, B.bell, (dx, dy) => dy <= 1); buoy.set(BX, sea + 7, BZB, B.iron);
      acts.push({
        name: '종 부표', hint: '항구 어귀의 부표가 흔들리며 땡그랑 종을 울려요', hit: [BX - 4, sea, BZB - 4, BX + 4, sea + 17, BZB + 4],
        run: async a => {
          for (let k2 = 0; k2 < 6; k2++) { a.turn('buoy', [k2 % 2 ? -0.32 : 0.32, 0, k2 % 3 ? 0.12 : -0.12], 0.6); a.burst([BX + 0.5, sea + 12, BZB + 0.5], { n: 22, colors: ['#ffe08a', '#fff6c8', '#c8a050'], speed: 10, up: 1, life: 0.8, gravity: 0, spread: 1.2, flat: true }); a.burst([BX + 0.5, sea + 1, BZB + 0.5], { n: 10, colors: ['#ffffff', '#d8f0ff'], speed: 4, up: 6, life: 0.7, gravity: 18, spread: 4 }); await a.wait(0.65); }
          await a.turn('buoy', [0, 0, 0], 0.8);
        },
      });
      // ───────── 그물 기둥 ─────────
      const NX = 139, NZ = QZ1 + 6, ny = sea + 5, NA = ny + 20;
      w.box(NX - 2, ny, NZ - 10, NX + 2, ny + 1, NZ - 6, B.sill); w.box(NX - 1, ny + 2, NZ - 9, NX + 1, ny + 2, NZ - 7, B.cope);
      w.box(NX, ny + 3, NZ - 8, NX, NA, NZ - 8, B.post); w.box(NX, NA, NZ - 8, NX, NA + 1, NZ, B.post);
      w.line(NX, NA - 8, NZ - 8, NX, NA - 1, NZ - 2, B.post); w.box(NX, NA + 2, NZ, NX, NA + 2, NZ, B.iron); w.set(NX, NA + 1, NZ - 8, B.iron);
      barrel(w, NX - 4, ny, NZ - 13, 7, 2.2); crate(w, NX + 2, ny, NZ - 15, 4);
      const nLen = NA - 1 - sea;
      MH.rope(w, 'nrope', NX, NA - 1, NZ, nLen, B.rope);
      const net = w.prop({ name: 'net', pivot: [NX + 0.5, sea, NZ + 0.5] });
      net.box(NX - 3, sea - 5, NZ - 3, NX + 3, sea - 5, NZ + 3, B.net);
      for (let y = sea - 4; y <= sea - 1; y++) for (let z = NZ - 3; z <= NZ + 3; z++) for (let x = NX - 3; x <= NX + 3; x++) if ((x === NX - 3 || x === NX + 3 || z === NZ - 3 || z === NZ + 3) && ((x + y + z) & 1)) net.set(x, y, z, B.net);
      for (let z = NZ - 3; z <= NZ + 3; z++) for (let x = NX - 3; x <= NX + 3; x++) if (x === NX - 3 || x === NX + 3 || z === NZ - 3 || z === NZ + 3) net.set(x, sea, z, B.rope);
      for (const [x, y, z] of [[NX - 1, sea - 4, NZ], [NX + 1, sea - 4, NZ + 1], [NX, sea - 3, NZ - 1], [NX + 1, sea - 4, NZ - 2], [NX - 2, sea - 4, NZ - 1]]) { net.set(x, y, z, B.fish); net.set(x + 1, y, z, B.fishDk); }
      for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) net.line(NX + dx, sea, NZ + dz, NX, sea + 1, NZ, B.rope);
      net.set(NX, sea + 1, NZ, B.iron);
      const nUp = 14;
      acts.push({
        name: '그물 올리기', hint: '안벽 기둥이 물속 그물을 끌어올리자 물고기가 펄떡여요', hit: [NX - 2, ny, NZ - 15, NX + 2, NA + 2, NZ + 3],
        run: async a => {
          a.burst([NX + 0.5, sea + 1, NZ + 0.5], { n: 20, colors: ['#ffffff', '#d8f0ff'], speed: 4, up: 6, life: 0.8, gravity: 18, spread: 3 });
          await Promise.all([a.move('net', [0, nUp, 0], 2.4, t => t), a.rope('nrope', nLen, nLen - nUp, 2.4, t => t)]);
          for (let k2 = 0; k2 < 6; k2++) {
            a.burst([NX + 0.5, sea + nUp + 1, NZ + 0.5], { n: 4, colors: ['#b8c8d0', '#e8f0f8', '#8aa0b0'], speed: 5, up: 10, life: 0.9, gravity: 28, spread: 1.6 });
            a.burst([NX + 0.5, sea + nUp - 4, NZ + 0.5], { n: 14, colors: ['#ffffff', '#d8f0ff', '#8ac8f0'], speed: 3, up: 1, life: 0.8, gravity: 20, spread: 2.4 });
            await a.wait(0.4);
          }
          await Promise.all([a.move('net', [0, 0, 0], 2.2, t => t), a.rope('nrope', nLen, nLen, 2.2, t => t)]);
          a.burst([NX + 0.5, sea + 1, NZ + 0.5], { n: 24, colors: ['#ffffff', '#d8f0ff'], speed: 5, up: 6, life: 0.8, gravity: 18, spread: 3 });
        },
      });
      // ───────── 갈매기 떼 ─────────
      const gulls = [[149.5, sea + 8, 266], [213.5, sea + 8, 266], [MX + 21, MT + 14, MZ + 9], [181, sea + 8, 209]];
      acts.push({
        name: '갈매기 떼', hint: '갈매기들이 끼룩끼룩 울며 한꺼번에 날아올라요', hit: [146, sea + 4, 252, 217, sea + 12, 268],
        run: async a => {
          for (let k2 = 0; k2 < 6; k2++) {
            for (const p of gulls) a.burst([p[0] + (k2 % 3 - 1) * 4, p[1], p[2]], { n: 8, colors: ['#ffffff', '#f4f4f0', '#8a8a92'], speed: 10, up: 8, life: 3, gravity: -1.2, spread: 3, flat: true });
            await a.wait(0.4);
          }
        },
      });

      // ══ 서쪽 후미의 조선소 ══
      // 선대(진수대): 뭍에서 물속까지 경사진 널판 길, 가장자리 말뚝, 가운데 미끄럼 들보 둘
      const SLX = 48, SLZ0 = 152, SLZ1 = 224;
      const slopeY = z => Math.round(MH.lerp(sea + 6, sea - 6, Math.max(0, Math.min(1, (z - SLZ0 - 20) / (SLZ1 - SLZ0 - 20)))));
      for (let z = SLZ0; z <= SLZ1; z++) {
        const y = slopeY(z);
        for (let x = SLX - 8; x <= SLX + 8; x++) {
          const gg = MH.g(w, x, z), edge = Math.abs(x - SLX) === 8, rail = Math.abs(x - SLX) === 4 || Math.abs(x - SLX) === 3;
          if (y >= sea) { MH.setH(w, x, z, y - 1, B.sand, B.sand); w.set(x, y, z, edge ? B.post : rail ? B.timber : ((z >> 1) % 4 === 0 ? B.plank2 : B.plank)); }
          else { if (gg > y - 1) MH.setH(w, x, z, y - 1, B.sand, B.sand); w.set(x, y, z, rail ? B.timber : 0); w.liquid(x, z, sea); for (let yy = y + 1; yy <= sea; yy++) w.set(x, yy, z, 0); }
          if (edge && z % 8 === 0 && y >= sea) w.box(x, y + 1, z, x, y + 4, z, B.post);
        }
      }
      // 진수할 새 배(부품): 선대 위 받침에 올라 있다, 뱃머리가 바다(+z)
      const ny0 = sea + 12, nz0 = SLZ0 + 6, NL = 26;
      for (let z = SLZ0 + 2; z <= SLZ0 + 30; z += 6) {
        for (const x of [SLX - 7, SLX + 7]) w.box(x, slopeY(z) + 1, z, x, ny0 - 4, z, B.timber);
        w.box(SLX - 1, slopeY(z) + 1, z, SLX + 1, ny0 - 5, z, B.timber);
      }
      const nb = w.prop({ name: 'newboat', pivot: [SLX + 0.5, ny0, nz0 + NL / 2], axis: 'z', bob: 0, rock: 0 });
      shipHD(nb, nz0, ny0, SLX, NL, 5, { hull: B.hullN, keel: B.hullB, strake: B.stripeW, deck: B.deck, rail: B.mast, mast: B.mast, sail: B.sail, sail2: B.sail2, cargo: true }, { alongZ: true, mast: 18 });
      MH.routeOK(w, [[SLX, nz0 + 60], [SLX, D - 1]], 6, '진수 경로');
      const dLaunch = 92, yLaunch = sea + 2 - ny0;
      acts.push({
        name: '진수식', hint: '받침목이 빠지고 새 배가 선대를 미끄러져 바다로 나아가요', hit: [SLX - 8, ny0 - 4, nz0, SLX + 8, ny0 + 20, nz0 + NL + 2],
        run: async a => {
          for (let k2 = 0; k2 < 3; k2++) { a.burst([SLX + 0.5, ny0 + 8, nz0 + 12], { n: 30, colors: ['#ffd8e8', '#fff080', '#ffffff', '#a8d8f0'], speed: 10, up: 12, life: 1.6, gravity: 10, spread: 4 }); await a.wait(0.4); }
          await a.tween('newboat', { off: [0, yLaunch, 44], rot: [0.06, 0, 0] }, 2.6, t => t * t);
          for (let k2 = 0; k2 < 3; k2++) { a.burst([SLX + 0.5, sea + 2, nz0 + 52 + k2 * 2], { n: 30, colors: ['#ffffff', '#eaf8ff', '#a8d8f0'], speed: 8, up: 12, life: 1.1, gravity: 20, spread: 6 }); await a.wait(0.2); }
          await a.tween('newboat', { rot: [0, 0, 0] }, 0.4);
          await a.drive('newboat', [[0, yLaunch, dLaunch], [0, yLaunch, D + 48 - nz0]], 5, { fwd: '+z', back: 1.0 });
        },
      });
      // 짓고 있는 배의 뼈대: 용골과 늑골, 외판 몇 줄, 비계와 발판
      const RX0 = 72, RZ0 = 140, RL = 32, rg = Math.max(g(RX0 + 16, RZ0), sea + 2);
      MH.flatten(w, RX0 - 8, RZ0 - 12, RX0 + RL + 8, RZ0 + 11, rg, B.sand, B.sand);
      for (let x = RX0; x <= RX0 + RL; x += 8) w.box(x, rg + 1, RZ0 - 2, x + 1, rg + 2, RZ0 + 2, B.timber);
      w.box(RX0, rg + 3, RZ0, RX0 + RL, rg + 4, RZ0, B.timber);
      for (let y = rg + 5; y <= rg + 18; y++) { const dx = Math.round((y - rg - 5) * 0.35); w.set(RX0 + RL + 1 + dx, y, RZ0, B.timber); }
      for (let y = rg + 5; y <= rg + 15; y++) w.set(RX0 - 1, y, RZ0, B.timber);
      for (let x = RX0 + 2; x <= RX0 + RL; x += 3) {
        const t = (x - RX0) / RL, R = 7.2 * Math.sin(Math.PI * Math.min(1, t * 1.3 + 0.1)) + 1.2;
        for (let a = -Math.PI / 2; a <= Math.PI / 2; a += 0.05) { const dz = Math.round(Math.sin(a) * R), dy = Math.round(-Math.cos(a) * R * 1.3) + Math.round(R * 1.3); w.set(x, rg + 4 + dy, RZ0 + dz, B.rib); }
      }
      for (let x = RX0 + 1; x <= RX0 + 18; x++) {
        const t = (x - RX0) / RL, R = 7.2 * Math.sin(Math.PI * Math.min(1, t * 1.3 + 0.1)) + 1.2;
        for (const sd of [-1, 1]) for (let dy = 0; dy <= 5; dy++) if (dy !== 3) { const a = Math.asin(Math.min(1, (dy + 3) / (R * 1.3))); w.set(x, rg + 5 + dy, RZ0 + sd * Math.round(R * Math.cos(Math.PI / 2 - a) * 0.98), B.hullN); }
      }
      for (const z of [RZ0 - 10, RZ0 + 10]) {
        for (let x = RX0; x <= RX0 + RL; x += 10) w.box(x, rg + 1, z, x, rg + 16, z, B.post);
        for (let x = RX0; x <= RX0 + RL; x++) { w.set(x, rg + 12, z, B.plank); w.set(x, rg + 12, z + (z < RZ0 ? 1 : -1), B.plank); }
        for (let x = RX0; x < RX0 + RL; x += 10) w.line(x, rg + 1, z, x + 10, rg + 11, z, B.post);
      }
      for (let x = RX0 - 4; x <= RX0 + RL + 4; x++) for (let z = RZ0 - 11; z <= RZ0 + 11; z++) if (hash3(x, 7, z) > 0.88 && !w.get(x, rg + 1, z)) w.set(x, rg + 1, z, B.sawdust);
      // 목재 더미(나이테 보이는 통나무)와 톱질 모탕
      for (let r = 0; r < 3; r++) for (let q = 0; q < 4 - r; q++) {
        const cz = RZ0 + 16 + q * 3 + r * 1.5, cy = rg + 2 + r * 3, czr = Math.round(cz), gg = rg;
        for (let x = RX0 + 4; x <= RX0 + 22 - r * 2; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dy) + Math.abs(dz) > 1 && (x === RX0 + 4 || x === RX0 + 22 - r * 2)) continue;
          const end = x === RX0 + 4 || x === RX0 + 22 - r * 2;
          if (cy + dy > gg) w.set(x, cy + dy, czr + dz, end ? (dy === 0 && dz === 0 ? B.wood : B.timber) : B.bark);
        }
      }
      for (const x of [RX0 + 28, RX0 + 36]) { const gg = g(x, RZ0 + 18); for (const z of [RZ0 + 16, RZ0 + 20]) w.box(x, gg + 1, z, x, gg + 3, z, B.post); w.box(x, gg + 4, RZ0 + 16, x, gg + 4, RZ0 + 20, B.plank); }
      { const gg = g(RX0 + 32, RZ0 + 18); w.box(RX0 + 26, gg + 5, RZ0 + 18, RX0 + 38, gg + 6, RZ0 + 18, B.timber); }
      landmarks.push({ name: '서쪽 조선소', note: '참나무 어선을 짓는 배 목수들의 작업장', p: [RX0 + 16, rg + 32, RZ0], tag: 'YARD' });
      // 배 목수 작업장(널빤지 헛간)과 타르 솥
      const shed = house({ x: 16, z: 124, sx: 24, sz: 18, fh: 12, face: 'e', pal: PAL.s, wall: B.plank, plank: true, chimney: true });
      if (shed.lamp) lights.push({ p: shed.lamp, c: '#ffd890', i: 0.9, d: 20, flicker: 0.1, night: true });
      const TX = 30, TZ = 168, tg = Math.max(g(TX, TZ), sea + 2);
      MH.flatten(w, TX - 6, TZ - 6, TX + 6, TZ + 6, tg, B.sand, B.sand);
      w.ring(TX, TZ, tg + 1, 3.2, 5.2, B.rockDk); w.ring(TX, TZ, tg + 2, 4, 5.2, B.rockDk);
      for (const [dx, dz] of [[0, 0], [1, 0], [-1, 1], [0, -1], [2, 1], [-2, -1]]) w.set(TX + dx, tg + 1, TZ + dz, B.ember);
      for (let y = tg + 3; y <= tg + 7; y++) { const r = y === tg + 3 ? 2.2 : y === tg + 4 ? 3 : 3.4; w.cyl(TX, TZ, y, y, r, B.iron); }
      w.cyl(TX, TZ, tg + 7, tg + 7, 2.6, B.tar); w.ring(TX, TZ, tg + 7, 2.6, 3.6, B.ironDk);
      for (const dx of [-5, 5]) { w.box(TX + dx, tg + 1, TZ, TX + dx, tg + 13, TZ, B.post); }
      w.box(TX - 5, tg + 13, TZ, TX + 5, tg + 13, TZ, B.post); w.box(TX, tg + 11, TZ, TX, tg + 12, TZ, B.iron);
      const lid = w.prop({ name: 'tarlid', pivot: [TX + 0.5, tg + 8, TZ + 0.5] });
      lid.cyl(TX, TZ, tg + 8, tg + 8, 3.4, B.iron); lid.cyl(TX, TZ, tg + 9, tg + 9, 1.4, B.ironDk); lid.set(TX, tg + 10, TZ, B.post);
      lights.push({ name: 'tar', p: [TX + 0.5, tg + 2, TZ + 0.5], c: '#ff8a3a', i: 0.5, d: 20, flicker: 0.3 });
      acts.push({
        name: '타르 솥', hint: '솥뚜껑이 들썩이며 끓는 타르에서 검은 연기와 불티가 솟아요', hit: [TX - 5, tg + 1, TZ - 4, TX + 5, tg + 13, TZ + 4],
        run: async a => {
          a.flash('tar', 4, 4);
          for (let k2 = 0; k2 < 6; k2++) {
            await a.tween('tarlid', { off: [0, 3, 0], rot: [k2 % 2 ? 0.3 : -0.3, 0, 0.2] }, 0.25);
            a.burst([TX + 0.5, tg + 10, TZ + 0.5], { n: 22, colors: ['#2a2420', '#4a423a', '#6a625a'], speed: 2.4, up: 10, life: 2.6, gravity: -1.2, spread: 1.6 });
            a.burst([TX + 0.5, tg + 8, TZ + 0.5], { n: 10, colors: ['#ff8a3a', '#ffd070'], speed: 5, up: 8, life: 0.8, gravity: 12, spread: 1.2 });
            await a.tween('tarlid', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.25);
            await a.wait(0.2);
          }
        },
      });

      // 바닷가 풀과 꽃
      MH.scatter(w, 9000, (x, gg, z, b) => {
        if (!(b === B.grass || b === B.grass2 || b === B.grass3) || !w.chance(0.16)) return;
        if (w.chance(0.72)) { w.set(x, gg + 1, z, B.fern); if (hash3(x, gg, z) > 0.6) w.set(x, gg + 2, z, B.fern); }
        else flowerAt(w, x, gg + 1, z, w.pick(FLW), w.chance(0.4));
      });
      // 돌길 무늬 입히기
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const gg = MH.g(w, x, z); if (gg > 0 && w.get(x, gg, z) === B.cobble) w.set(x, gg, z, paveAt(x, z)); }
      // ───────── 훈제 청어 ─────────
      const smk = chimAll.slice().sort((p, q) => q[2] - p[2]).slice(0, 3);
      acts.push({
        name: '훈제 굴뚝', hint: '청어를 훈제하느라 굴뚝마다 짙은 연기가 뭉게뭉게 올라요', hit: [Math.floor(smk[0][0]) - 3, Math.floor(smk[0][1]) - 8, Math.floor(smk[0][2]) - 3, Math.floor(smk[0][0]) + 2, Math.floor(smk[0][1]), Math.floor(smk[0][2]) + 2],
        run: async a => {
          for (let k2 = 0; k2 < 9; k2++) { for (const c of smk) a.burst([c[0], c[1], c[2]], { n: 14, colors: ['#d8d4cc', '#b8b4ac', '#9a968e', '#ffd8a0'], speed: 2.4, up: 8, life: 3, gravity: -0.8, spread: 1.6 }); await a.wait(0.4); }
        },
      });
      const smoke = chim.concat(shed.chimney ? [shed.chimney] : []).map(c => ({ n: 26, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 1.2, area: [c[0], c[2], 1.2], y0: c[1], y1: c[1] + 36, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
