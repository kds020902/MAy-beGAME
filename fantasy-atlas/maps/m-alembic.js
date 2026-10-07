// 연금술 거리 — 협곡 골목의 기울어진 집들, 거대 가마솥, 협곡을 건너는 증류관 (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 남쪽 약재 장터·서쪽 유리 공방. 낱돌 기초와 줄눈, 두께 있는 들보, 창틀·창살·창턱·덧문·꽃상자, 판자문과 놋 손잡이, 겹 기와와 처마·용마루·물받이,
// 벽돌 굴뚝과 갓돌, 리벳 띠를 두른 거대 가마솥과 받침 다리·장작 바퀴, 낱돌로 쌓은 증류탑 화덕과 구리 증류기·리브, 무늬 돌길. playerScale 2 (사람 키 6.8칸).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  MAPS.push({
    id: 'alembic', cat: 'magic', name: '연금술 거리', en: 'Alembic Row', color: '#8ad05a', seed: 313, base: 44, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '굴뚝마다 다른 색 연기가 오르는 연금술사들의 협곡 골목. 한가운데 거대 가마솥은 백 년째 끓고 있다. 협곡 남쪽 끝은 일곱 색 분수가 솟는 약재 장터로 넓어지고, 서쪽 벼랑 위에는 유리 공방의 가마가 밤새 타오른다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '연금술사 조합'], ['명물', '한 병에 일곱 색 물약 · 장터의 일곱 색 분수'], ['주의', '초록 연기는 들이마시지 말 것']] },
    sky: ['#233a22', '#0d140e', '#6aff9a'], stars: true,
    hemi: ['#d8ffd0', '#1a1a10', 0.6], sun: ['#f0ffe0', 0.5, [0.45, 1, 0.5]],
    day: { sky: ['#e0f0d0', '#8ab890', '#f8ffe0'], stars: false, hemi: ['#ffffff', '#4a4a38', 0.6], sun: ['#fff8e0', 0.76, [0.45, 1, 0.5]], haze: '#b8d8a0' },
    liquid: ['#2a6a1a', '#6ad02a', '#e0ff8a'], liqSpeed: 1.4, liqGlow: true,
    fog: { start: 0.92, floor: 24, depth: 20, haze: [60, 0.1, 10], hazeColor: '#2a4a26' },
    camY: -8, zoom: 1.1,
    particles: [{ n: 140, colors: ['#b8ff8a', '#e0ffb0'], mode: 'rise', speed: 1.2, area: [168, 188, 10], size: 2, y0: 76, y1: 148 }],
    blocks: {
      cob: { c: '#4a4a40', top: '#5a5a50', v: 0.12, pat: 'stone' }, grass: { c: '#3e5232', top: '#4a6a3a', v: 0.1 }, grass2: { c: '#435a36', top: '#56763e', v: 0.1 },
      dirt: { c: '#3a3028', v: 0.08 }, rock: { c: '#4a4a44', v: 0.07, pat: 'big' }, rockDk: { c: '#2e2e2a', v: 0.06, pat: 'stone' },
      rockR: { c: '#5e5446', v: 0.07, pat: 'big' }, rockL: { c: '#5a5a52', v: 0.07, pat: 'big' }, scree: { c: '#3e3c36', top: '#57544a', v: 0.12 }, mossR: { c: '#4a5a3a', top: '#4e6a38', v: 0.1 },
      cobble: { c: '#4e4e46', top: '#5e5e54', v: 0.06 }, cobble2: { c: '#46463e', top: '#54544a', v: 0.06 }, cobble3: { c: '#55534a', top: '#68665a', v: 0.06 }, cobbleJ: { c: '#2e2e2a', top: '#363630', v: 0.04 },
      st1: { c: '#6a6a62', v: 0.05 }, st2: { c: '#5c5c56', v: 0.05 }, st3: { c: '#74726a', v: 0.05 }, st4: { c: '#62665c', v: 0.05 }, mortar: { c: '#48463e', v: 0.04 }, sill: { c: '#7a786e', v: 0.04 },
      wallC: { c: '#c8c0a8', v: 0.04 }, wallT: { c: '#4a8a8a', v: 0.04 }, wallM: { c: '#7a3a4a', v: 0.04 }, wallY: { c: '#c8a040', v: 0.04 },
      roofT: { c: '#2a5a5a', v: 0.05 }, roofT2: { c: '#204a4a', v: 0.04 }, roofT3: { c: '#346a68', v: 0.05 },
      roofM: { c: '#5a2a3a', v: 0.05 }, roofM2: { c: '#4a2030', v: 0.04 }, roofM3: { c: '#6a3446', v: 0.05 },
      roofY: { c: '#8a6a2a', v: 0.05 }, roofY2: { c: '#745822', v: 0.04 }, roofY3: { c: '#9a7a36', v: 0.05 }, eave: { c: '#1e1a16', v: 0.03 },
      frame: { c: '#3a2a1a', v: 0.05 }, frameDk: { c: '#2a1e12', v: 0.04 }, found: { c: '#5a5a54', v: 0.05, pat: 'stone' }, door: { c: '#2a1a10', v: 0.03, pat: 'plank' }, doorDk: { c: '#1e120a', v: 0.03 },
      mullion: { c: '#2a2a26', v: 0.02 }, brass: { c: '#e0c060', v: 0.03 }, hinge: { c: '#1e1e22', v: 0.02 }, shutter: { c: '#2a4a4a', v: 0.02 }, shutterDk: { c: '#203c3c', v: 0.02 },
      shutter2: { c: '#4a2a4a', v: 0.02 }, shutter2Dk: { c: '#3c203c', v: 0.02 }, gutter: { c: '#5a4a3a', v: 0.03 }, pot: { c: '#8a5a3a', v: 0.04 },
      copper: { c: '#c07a3a', v: 0.08 }, copperDk: { c: '#8a5228', v: 0.06 }, patina: { c: '#4a9a7a', v: 0.08 }, iron: { c: '#3a3a40', v: 0.04 }, ironDk: { c: '#26262c', v: 0.03 }, rivet: { c: '#d09050', v: 0.04 },
      log: { c: '#4a3020', v: 0.06, pat: 'log' }, logEnd: { c: '#a07a50', v: 0.05 }, plank: { c: '#6a4a30', v: 0.06, pat: 'plank' }, wood: { c: '#4a3222', v: 0.05 },
      bark: { c: '#3a2a1c', v: 0.06 }, barkDk: { c: '#2c2016', v: 0.05 },
      winG: { c: '#c8ff8a', night: true, day: '#7a9a80' }, winP: { c: '#e0a0ff', night: true, day: '#8a7aa0' }, lamp: { c: '#b8ff9a', night: true, day: '#9ab090' },
      potG: { c: '#8aff5a', glow: true }, potP: { c: '#d07aff', glow: true }, potR: { c: '#ff6a8a', glow: true }, potB: { c: '#6ac8ff', glow: true }, potY: { c: '#ffe060', glow: true }, potO: { c: '#ffa040', glow: true }, potI: { c: '#8a7aff', glow: true }, fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ffd060', glow: true },
      goldG: { c: '#ffd860', glow: true }, philo: { c: '#ff2a4a', glow: true }, frost: { c: '#c8f0ff', glow: true }, soil: { c: '#3a2a1a', top: '#4a3420', v: 0.1 }, mand: { c: '#c8a070', v: 0.08 }, mandDk: { c: '#a07a50', v: 0.06 },
      leafM: { c: '#5a9a3a', v: 0.1 }, leafDk: { c: '#3a6a2a', v: 0.08 }, leafLt: { c: '#8ac25a', v: 0.08 },
      glass: { c: '#a8e0c8', v: 0.03 }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brick2: { c: '#74402f', v: 0.05, pat: 'brick' }, soot: { c: '#2a2220', v: 0.04 },
      awnG: { c: '#3a7a3a', v: 0.04 }, awnP: { c: '#6a3a7a', v: 0.04 }, awnW: { c: '#d8d0b8', v: 0.04 }, crate: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, crateEdge: { c: '#523a24', v: 0.04 },
      herb: { c: '#6aa040', v: 0.1 }, herbD: { c: '#8a8a3a', v: 0.1 }, homu: { c: '#e0b8a0', v: 0.05 }, rope: { c: '#a08060', v: 0.05 }, sack: { c: '#b8a070', v: 0.06 },
      flower: { c: '#b86ae0', v: 0.05 }, flower2: { c: '#f0e060', v: 0.05 }, flower3: { c: '#e8e8d8', v: 0.03 }, flower4: { c: '#e06a8a', v: 0.05 }, flowerStem: { c: '#3a6a2a', v: 0.08 }, flowerLf: { c: '#4a7a34', v: 0.08 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, F = base + 4;
      const cx = z => 168 + Math.sin(z * 0.019) * 20;
      const MKZ = 292, MKX = Math.round(cx(MKZ));               // 남쪽 약재 장터
      const wide = z => 30 + Math.max(0, 20 - Math.abs(z - 188) * 0.5) + Math.max(0, 28 - Math.abs(z - MKZ) * 0.7);
      // 협곡 벽: 발치(wd)는 그대로 두고, 위로는 폭이 들쭉날쭉한 비탈 + 두세 단의 바위 선반 + 거친 면 + 기울어진 지층 띠.
      // 벼랑 위 굴곡은 가장자리에서 서서히 섞어 테두리 턱이 생기지 않게 한다.
      const cliffT = (x, z) => { const d = Math.abs(x - cx(z)), wd = wide(z), side = x < cx(z) ? 0 : 50; return (d - wd) / (12 + 7 * n.fbm(z * 0.018 + side, 3.3, 2)); };
      let sX = -1, sZ = -1, sW = 0;
      const strata = (x, y, z) => { if (x !== sX || z !== sZ) { sX = x; sZ = z; sW = (n.fbm(x * 0.017 + 9, z * 0.017, 2) - 0.5) * 14 + x * 0.04; } const yw = y + sW; const b = ((Math.floor(yw / 4) % 5) + 5) % 5; return b === 1 ? B.rockDk : b === 3 ? B.rockR : b === 4 ? B.rockL : B.rock; };
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const t = cliffT(x, z);
          if (t <= 0) return F;
          const P = MH.sstep(0, 1, t), K = 3, q = P * K, P2 = (Math.floor(q) + MH.sstep(0.3, 0.8, q - Math.floor(q))) / K;
          const ledge = MH.sstep(0.4, 0.6, t) * (0.55 + 0.4 * n.fbm(x * 0.03 + 21, z * 0.03, 2));
          const rough = (n.fbm(x * 0.11 + 5, z * 0.11, 2) - 0.5) * 9 * Math.sin(Math.PI * Math.min(1, t)) * MH.sstep(0.25, 0.5, t);
          const top = n.fbm(x * 0.025, z * 0.025) * 8 * MH.sstep(0.75, 1.4, t);
          return F + (P + (P2 - P) * ledge) * 40 + rough + top;
        },
        surface: (x, z, y, s) => s >= 4 ? strata(x, y, z) : y > F + 16 ? (n.fbm(x * 0.06 + 3, z * 0.06, 2) > 0.55 ? B.grass2 : B.grass) : y > F + 2 ? B.scree : B.cob,
        under: (x, z, y, dep, s) => dep < 3 && y > F + 16 && s < 4 ? B.dirt : strata(x, y, z),
      });
      const lights = [], acts = [], smoke = [], landmarks = [], chims = [];
      const KX = 168, KZ = 188;
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));

      // ───────── 공통 도구(2배 해상도용) ─────────
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
      const cylT = (T, x, z, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(x + dx, y, z + dz, b); };
      const clump = (T, x0, y0, z0, r, L) => {
        x0 = Math.round(x0); y0 = Math.round(y0); z0 = Math.round(z0);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = x0 + dx, y = y0 + dy, z = z0 + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.95 && d > 0.45) b = B.leafLt;
          T.set(x, y, z, b);
        }
      };
      const tree = (x, y, z, o) => {
        const h = o.h, R0 = o.trunkR || 1.6, L = o.leaves;
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.5 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, streak ? B.barkDk : B.bark);
          }
        }
        for (let k = 0; k < 4; k++) { const a = k * 1.57 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2; w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, B.barkDk, t => t < 0.5 ? 1 : 0.6); }
        const nB = 4, r = o.r || 6, ends = [[x, y + h + 1, z, 1.1]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.8));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * w.r(0.45, 0.7);
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(w, ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 2; q++) { const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75; clump(w, ex + Math.cos(a) * dd, ey + 1 + (q - 0.5) * rc * 0.3, ez + Math.sin(a) * dd, rc * 0.62, L); }
        });
      };
      const crate = (T, x, y, z, s) => {
        s = s || 4;
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      // 물약병: 몸통(빛), 어깨 유리, 목, 코르크
      const bottle = (T, x, y, z, b, tall) => {
        T.set(x, y, z, b); if (tall) T.set(x, y + 1, z, b);
        const t = y + (tall ? 2 : 1); T.set(x, t, z, B.glass); T.set(x, t + 1, z, B.pot);
      };
      // 큰 물약병(2×2 몸통)
      const flaskBig = (T, x, y, z, b) => {
        for (let dy = 0; dy < 3; dy++) for (let dz = 0; dz < 2; dz++) for (let dx = 0; dx < 2; dx++) T.set(x + dx, y + dy, z + dz, dy === 2 ? B.glass : b);
        T.set(x, y + 3, z, B.glass); T.set(x, y + 4, z, B.pot);
      };
      const logPile = (x, y, z, len, alongX, rows) => {   // 나이테가 보이는 통나무 더미
        for (let r = 0; r < rows; r++) for (let q = 0; q < rows - r + 1; q++) {
          const cq = q * 3 + r * 1.5, cy = y + 1 + r * 3;
          for (let a = 0; a < len; a++) for (let dy = -1; dy <= 1; dy++) for (let dq = -1; dq <= 1; dq++) {
            const end = a === 0 || a === len - 1;
            if (Math.abs(dy) + Math.abs(dq) > 1 && end) continue;
            const qq = Math.round(cq) + dq, [px, pz] = alongX ? [x + a, z + qq] : [x + qq, z + a];
            w.set(px, cy + dy, pz, end ? (dy === 0 && dq === 0 ? B.wood : B.logEnd) : B.bark);
          }
        }
      };
      const lampPost = (x, z, h) => {
        h = h || 12;
        const y = g(x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.sill);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.copperDk); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.copper); w.set(x, ly + 6, z, B.ironDk);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      // 병 등불 줄: 쇠줄이 처지고 6칸마다 구리 갓을 쓴 병 등불이 매달린다
      const garland = (a, b, sag, beads) => {
        const len = Math.hypot(b[0] - a[0], b[2] - a[2]), nn = Math.ceil(len) * 2;
        let last = -99, bi = 0;
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = Math.round(a[0] + (b[0] - a[0]) * t), z = Math.round(a[2] + (b[2] - a[2]) * t), y = Math.round(a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag);
          w.set(x, y, z, B.ironDk);
          const s = t * len;
          if (s - last >= 6 && t > 0.08 && t < 0.92) {
            last = s;
            w.set(x, y - 1, z, B.iron); w.set(x, y - 2, z, B.copper); w.set(x, y - 3, z, beads[bi % beads.length]); w.set(x, y - 4, z, beads[bi % beads.length]); w.set(x, y - 5, z, B.glass);
            bi++;
          }
        }
      };
      const FLW = [B.flower, B.flower2, B.flower3, B.flower4, B.herb];

      // ───────── 집(2배 해상도) ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : o.win); put(sd, wu + c, wy + r, 1, 0); }
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
            put(sd, wu + c, wy - 1, 3, hh > 0.35 ? B.flowerLf : FLW[(hh * 40 | 0) % 5]);
            if ((c & 1) === 0 || hh > 0.8) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7 + (hh * 3 | 0)) % 5]);
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
        let lamp = null;
        if (o.steps) {
          for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
            const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
            for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
            for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
          }
        }
        if (o.lantern) {
          const lc = u0 + 7;
          put(sd, lc, yb + 8, 1, B.iron); put(sd, lc, yb + 8, 2, B.iron); put(sd, lc, yb + 7, 2, B.ironDk);
          put(sd, lc, yb + 6, 2, B.lamp); put(sd, lc, yb + 5, 2, B.lamp); put(sd, lc, yb + 4, 2, B.ironDk);
          const p = sd.at(lc, 2); lamp = [p[0] + 0.5, yb + 6, p[1] + 0.5];
        }
        const p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp };
      };
      // 박공지붕: 겹 기와(이음줄 엇갈림), 두꺼운 처마 끝, 용마루, 박공 들보와 박공창, 물받이·홈통
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, [T1, T2, T3] = o.pal;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov, pitch = o.pitch || 1;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + Math.floor(s * pitch);
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            const b = s === 0 ? B.eave : seam ? T2 : (hash3(l >> 2, s, 5) > 0.72 ? T3 : T1);
            for (let q = 0; q < pitch; q++) P(a, l, ry - q, q ? T2 : b);
            P(a, l, ry - pitch, B.eave);
            if (s === sMax) P(a, l, ry + 1, B.frameDk);
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - pitch - 1; y++) P(a, l, y, o.gable);
            if (s >= 1 && (l === l0 || l === l1)) P(a, l, ry - pitch - 1, B.frame);
          }
        }
        const mid = (A0 + A1) / 2, midA = Math.floor(mid);
        for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
          for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
          for (let a = A0 + 1; a <= A1 - 1; a++) {
            const s = Math.min(a - a0, a1 - a), ry = y0 + Math.floor(s * pitch);
            if (ry - pitch - 1 > top) P(a, out, ry - pitch - 1, B.frame);
          }
          const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35 * pitch));
          const odd = (A1 - A0) % 2 === 0;
          for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : o.win); P(midA + c, out, gy + r, 0); }
          for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
          for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, B.frame); P(midA + (odd ? 2 : 3), out, gy + r, B.frame); }
        }
        for (const [ae] of [[a0 - 1], [a1 + 1]]) for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
        return y0 + Math.floor(sMax * pitch) + 2;
      };
      const chimney = (x0, z0, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(x0 + dx, y, z0 + dz, hash3(x0 + dx, y, z0 + dz) > 0.75 ? B.brick2 : B.brick);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(x0 + dx, y, z0 + dz, B.brick2);
        w.box(x0 - 1, yt, z0 - 1, x0 + 4, yt, z0 + 4, B.sill);
        for (const [px, pz] of [[x0 + 1, z0 + 1], [x0 + 2, z0 + 2]]) w.box(px, yt + 1, pz, px, yt + 2, pz, B.pot);
        return [x0 + 2, yt + 3, z0 + 2];
      };
      // o: x,z,sx,sz,floors,fh,face,wall,win,pal,shutter,jetty,stone,chimney,balcony,box,y,axis,pitch
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall, win = o.win, sh = o.shutter === B.shutter2 ? [B.shutter2, B.shutter2Dk] : [B.shutter, B.shutterDk];
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0));
          }
        }
        let e = 0, yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const ePrev = e;
          if (o.jetty && f > 0) e = 2 * Math.min(f, 1);
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          const stone = f < (o.stone || 0);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0, isBal = k === face && o.balcony === f;
            const nW = Math.max(1, Math.floor((L + 2) / 12)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if ((isDoor || isBal) && Math.abs(c - cu) < 13) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || ((isDoor || isBal) && Math.abs(u - cu) <= 4);
            if (stone) {
              for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
                const corner = u === sd.u0 || u === sd.u1 || u === sd.u0 + 1 || u === sd.u1 - 1;
                put(sd, u, y, 0, corner && ((y >> 1) & 1) ? B.sill : (stoneAt(u, y, 5) || B.mortar));
              }
            } else {
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb, 1, B.frame); put(sd, u, yb + 1, 1, B.frame); put(sd, u, yb + fh - 1, 1, B.frame); }
              for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0 - 1, sd.u0, sd.u1, sd.u1 + 1]) put(sd, u, y, 1, B.frameDk);
              for (let u = sd.u0 + 6; u <= sd.u1 - 3; u += 6) if (!busy(u)) for (let y = yb + 2; y < yb + fh - 1; y++) put(sd, u, y, 1, B.frame);
              for (const [ua, ub] of [[sd.u0 + 1, sd.u0 + 5], [sd.u1 - 1, sd.u1 - 5]]) {
                if (busy(ua) || busy(ub)) continue;
                for (let k2 = 0; k2 <= fh - 4; k2++) { const t = k2 / (fh - 4); put(sd, Math.round(ua + (ub - ua) * t), yb + 2 + k2, 1, B.frame); }
              }
              if (e > ePrev) for (let u = sd.u0; u <= sd.u1; u += 3) { put(sd, u, yb - 1, 0, B.frameDk); put(sd, u, yb - 1, -1, B.frameDk); }
            }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { win, shutter: stone ? null : sh[0], shutterDk: sh[1], box: o.box && !stone && f > 0 });
            if (isDoor) {
              const r = doorAt(sd, cu, yb, { steps: true, lantern: true });
              out.door = r.door; out.lamp = r.lamp; out.side = sd;
            }
            if (isBal) {
              doorAt(sd, cu, yb, {});
              for (let u = cu - 6; u <= cu + 6; u++) for (let d = 1; d <= 5; d++) { put(sd, u, yb - 1, d, B.plank); if (u % 3 === 0) put(sd, u, yb - 2, d, B.frameDk); }
              for (let u = cu - 6; u <= cu + 6; u++) { put(sd, u, yb + 3, 5, B.iron); if (u % 2 === 0 || Math.abs(u - cu) === 6) for (let q = 0; q < 3; q++) put(sd, u, yb + q, 5, B.iron); }
              for (let d = 1; d <= 5; d++) for (const u of [cu - 6, cu + 6]) { put(sd, u, yb + 3, d, B.iron); if (d % 2) for (let q = 0; q < 3; q++) put(sd, u, yb + q, d, B.iron); }
              for (const u of [cu - 5, cu - 4, cu + 4, cu + 5]) { put(sd, u, yb, 4, B.pot); put(sd, u, yb + 1, 4, B.flowerLf); put(sd, u, yb + 2, 4, FLW[(u + 5) % 5]); }
            }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, pal: o.pal, gable: wall, win, pitch: o.pitch, og: o.og });
        out.top = top; out.e = e;
        if (o.chimney) {
          const ccx = axis === 'x' ? X0 + 3 : Math.floor((X0 + X1) / 2) - 1, ccz = axis === 'x' ? Math.floor((Z0 + Z1) / 2) - 1 : Z0 + 3;
          out.chimney = chimney(ccx, ccz, top - 2, out.peak + 5);
        }
        return out;
      };
      const walls = [B.wallC, B.wallT, B.wallM, B.wallY];
      const PAL = [[B.roofT, B.roofT2, B.roofT3], [B.roofM, B.roofM2, B.roofM3], [B.roofY, B.roofY2, B.roofY3]];
      const pots = [B.potG, B.potP, B.potR, B.potB];
      const smokeCol = [['#9aff6a', '#c8ffa0'], ['#d890ff', '#f0c8ff'], ['#ff8aa8', '#ffc8d8'], ['#8ad8ff', '#c8f0ff']];

      // ───────── 골목 바닥: 무늬 돌길 ─────────
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (MH.g(w, x, z) === F) w.set(x, F, z, paveAt(x, z));

      // ───────── 폐액 수로(골목 가운데, 폭 4) ─────────
      const PZ = 252, PXX = Math.round(cx(PZ));
      for (let z = 0; z < D; z++) {
        const x = Math.round(cx(z));
        if (MH.dist(x, z, KX, KZ) < 28 || Math.abs(z - MKZ) < 22) continue;
        for (let dx = 0; dx < 4; dx++) { MH.setH(w, x + dx, z, F - 4, B.rockDk, B.rockDk); for (let y = F - 3; y <= F; y++) w.set(x + dx, y, z, 0); w.liquid(x + dx, z, F - 2); }
        for (const dx of [-2, -1, 4, 5]) if (MH.g(w, x + dx, z) === F) w.set(x + dx, F, z, (dx === -1 || dx === 4) ? ((z >> 1) % 3 === 0 ? B.st3 : B.sill) : B.st2);
        for (const dx of [-1, 4]) for (let y = F - 3; y < F; y++) w.set(x + dx, y, z, stoneAt(z, y, 2) || B.mortar);
        // 판자 다리: 28칸마다, 걸침목 위에 판자 다섯 장
        if (z % 28 === 12 && Math.abs(z - PZ) > 24) for (let dz = 0; dz < 5; dz++) for (let dx = -2; dx <= 5; dx++) w.set(x + dx, F, z + dz, dz === 0 || dz === 4 ? B.wood : B.plank);
      }

      // ───────── 기울어진 집들(골목 양쪽) ─────────
      let k = 0;
      for (const z of [12, 40, 68, 96, 124, 224]) {
        for (const side of [-1, 1]) {
          const c = Math.round(cx(z + 10)), sx = 22, sz = 22;
          const x = side < 0 ? c - 32 : c + 12;
          const h = house({ x, z, sx, sz, floors: 3 + (k % 2), fh: 12, face: side < 0 ? 'e' : 'w', jetty: true, pitch: k % 3 === 0 ? 2 : 1, axis: 'z', og: 1,
            balcony: k % 4 === 2 ? 2 : undefined, y: F + 1, chimney: true, box: k % 2 === 0, stone: k % 3 === 1 ? 1 : 0,
            wall: walls[k % 4], win: k % 2 ? B.winP : B.winG, pal: PAL[k % 3], shutter: k % 2 ? B.shutter2 : B.shutter });
          const sd = h.side, cu = Math.floor((sd.u0 + sd.u1) / 2);
          // 진열대: 다리 넷, 판자 상판, 빛나는 병과 큰 병, 약초 다발
          for (const u of [z + 1, z + 5]) for (const d of [5, 6]) for (let y = F + 1; y <= F + 3; y++) put(sd, u, y, d, B.wood);
          for (let u = z + 1; u <= z + 5; u++) for (const d of [5, 6]) put(sd, u, F + 4, d, B.plank);
          for (let u = z + 1; u <= z + 5; u++) { const p = sd.at(u, 6); bottle(w, p[0], F + 5, p[1], pots[(k + u) % 4], (u & 1) === 0); }
          { const p = sd.at(z + 2, 5), q = sd.at(z + 3, 5); flaskBig(w, Math.min(p[0], q[0]), F + 5, Math.min(p[1], q[1]), pots[(k + 1) % 4]); }
          { const p = sd.at(z + 5, 5); w.set(p[0], F + 5, p[1], B.herb); w.set(p[0], F + 6, p[1], B.herbD); }
          // 상자 둘과 약초
          { const p = sd.at(z + 16, 4), q = sd.at(z + 19, 7); crate(w, Math.min(p[0], q[0]), F + 1, Math.min(p[1], q[1]), 4); w.set(Math.min(p[0], q[0]) + 1, F + 5, Math.min(p[1], q[1]) + 1, B.herb); w.set(Math.min(p[0], q[0]) + 2, F + 5, Math.min(p[1], q[1]) + 2, B.herbD); }
          // 벽에서 뻗은 쇠 걸이에 매단 병 간판(구리 갓, 빛나는 몸통, 유리 어깨)
          { const su = z + 18;
            for (let d = 1; d <= 6; d++) put(sd, su, F + 15, d, B.iron); put(sd, su, F + 14, 2, B.iron); put(sd, su, F + 13, 3, B.iron);
            for (const d of [5, 6]) { put(sd, su, F + 14, d, B.ironDk); put(sd, su, F + 13, d, B.copper); for (let y = F + 9; y <= F + 12; y++) put(sd, su, y, d, pots[(k + 2) % 4]); put(sd, su, F + 8, d, B.copperDk); }
            put(sd, su, F + 13, 5, B.glass); }
          // 벽을 타는 구리관: 이음 띠와 쇠 고정쇠, 위에서 벽으로 꺾인다
          for (let y = F + 1; y <= F + 14; y++) for (const u of [z + 20, z + 21]) for (const d of [2, 3]) put(sd, u, y, d, y % 5 === 0 ? B.patina : (d === 3 && u === z + 21 ? B.copperDk : B.copper));
          for (const y of [F + 4, F + 10]) for (const u of [z + 19, z + 22]) put(sd, u, y, 2, B.iron);
          for (const u of [z + 20, z + 21]) put(sd, u, F + 14, 1, B.copperDk);
          if (k % 3 === 0) { const p = sd.at(z + 3, 6); lights.push({ p: [p[0] + 0.5, F + 6, p[1] + 0.5], c: k % 2 ? '#d080ff' : '#90ff70', i: 0.9, d: 22, flicker: 0.2 }); }
          if (h.chimney) chims.push(h.chimney);
          if (z === 68 && side > 0) {                          // 물약 상점 정문: 문 앞에서 금빛이 골목 위로 피어오른 뒤 안으로 들어간다
            const [dx, dy, dz] = h.door;
            acts.push({ name: '물약 상점 안으로', goto: 'alembic-potionshop', hint: '병 간판이 걸린 문을 열고 빛나는 병이 가득한 물약 상점으로 들어가요', hit: [dx - 3, dy - 2, dz - 3, dx, dy + 8, dz + 3],
              run: async a => { for (let q = 0; q < 6; q++) { a.burst([dx - 2.5, dy + 6 + q * 16, dz + 0.5], { n: 26, colors: ['#ffe9a0', '#ffffff', '#b8ff9a'], speed: 3, up: 5, life: 1, gravity: -1, spread: 2.6 }); await a.wait(0.1); } await a.wait(0.4); } });
          }
          if (h.chimney && smoke.length < 6) smoke.push({ n: 28, colors: smokeCol[k % 4], mode: 'rise', speed: 1.1, area: [h.chimney[0], h.chimney[2], 1.2], y0: h.chimney[1], y1: h.chimney[1] + 40, glow: true });
          if (side > 0 && k % 4 === 1) { const p = lampPost(c + 8, z + 25, 12); if (lights.length < 40) lights.push({ p, c: '#a0ff80', i: 1, d: 26, flicker: 0.1, night: true }); }
          k++;
        }
        const c = cx(z + 10);
        garland([Math.round(c - 12), F + 26, z + 10], [Math.round(c + 11), F + 26, z + 10], 4, [B.potG, B.potP, B.potY, B.potB]);
      }
      landmarks.push({ name: '물약 상점가', note: '창가에 빛나는 병이 줄지어 있다', p: [cx(80) + 0.5, F + 60, 80.5] });

      // ───────── 거대 가마솥(넓어진 골목 한가운데) ─────────
      // 바닥: 부채꼴로 깐 돌 고리
      for (let z = KZ - 32; z <= KZ + 32; z++) for (let x = KX - 32; x <= KX + 32; x++) {
        const d = MH.dist(x, z, KX, KZ); if (d >= 31 || MH.g(w, x, z) !== F) continue;
        const ring = Math.floor(d / 4), seg = Math.floor((Math.atan2(z - KZ, x - KX) + Math.PI) / (Math.PI * 2) * (ring * 6 + 6));
        const jt = (d % 4) < 0.7 || hash3(seg, ring, 3) < 0 || ((Math.atan2(z - KZ, x - KX) + Math.PI) / (Math.PI * 2) * (ring * 6 + 6)) % 1 < 0.12;
        w.set(x, F, z, d < 24 ? (jt ? B.mortar : B.soot) : jt ? B.cobbleJ : [B.st1, B.st2, B.st3][(hash3(seg, ring, 9) * 3) | 0]);
      }
      // 장작 바퀴: 바깥에서 안쪽으로 모인 통나무와 숯불
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; w.line(KX + Math.cos(a) * 21, F + 2, KZ + Math.sin(a) * 21, KX + Math.cos(a) * 10, F + 4, KZ + Math.sin(a) * 10, B.log, 1.3); w.set(Math.round(KX + Math.cos(a) * 21.6), F + 2, Math.round(KZ + Math.sin(a) * 21.6), B.logEnd); }
      for (let a = 0; a < 6.28; a += 0.12) { const r = 13 + hash3(Math.round(a * 50), 1, 1) * 3; w.set(Math.round(KX + Math.cos(a) * r), F + 1, Math.round(KZ + Math.sin(a) * r), hash3(Math.round(a * 50), 2, 1) > 0.5 ? B.fire : B.ember); if (hash3(Math.round(a * 50), 3, 1) > 0.6) w.set(Math.round(KX + Math.cos(a) * r), F + 2, Math.round(KZ + Math.sin(a) * r), B.fire); }
      // 받침 다리 넷: 돌 받침, 굽은 쇠다리
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const lx = KX + dx * 17, lz = KZ + dz * 17;
        w.box(lx - 2, F + 1, lz - 2, lx + 2, F + 2, lz + 2, B.sill);
        w.line(lx, F + 3, lz, KX + dx * 14, F + 12, KZ + dz * 14, B.iron, 1.2);
        w.box(lx - 1, F + 3, lz - 1, lx + 1, F + 4, lz + 1, B.ironDk);
      }
      // 솥 몸통: 둥근 바닥에서 불룩한 배, 리벳 띠
      const YC = F + 24, RB = 19.5;
      const potR = y => Math.sqrt(Math.max(0, RB * RB - (y - YC) * (y - YC)));
      for (let y = F + 8; y <= F + 29; y++) {
        const r = Math.min(potR(y), 19.2), band = (y - F) % 7 === 0;
        w.ring(KX, KZ, y, r - 2.6, r, band ? B.copperDk : B.iron);
        if (y < F + 24) w.cyl(KX, KZ, y, y, r - 2.4, B.ironDk);
        if (band) for (let a = 0; a < 48; a++) { const t = a / 48 * Math.PI * 2; w.set(Math.round(KX + Math.cos(t) * (r + 0.6)), y, Math.round(KZ + Math.sin(t) * (r + 0.6)), B.rivet); }
      }
      w.ring(KX, KZ, F + 30, 16.4, 20.6, B.copperDk); w.ring(KX, KZ, F + 31, 18.2, 20.6, B.copper); w.ring(KX, KZ, F + 32, 18.6, 20.2, B.copperDk);
      // 손잡이 고리 둘(동·서): 쇠 고리판과 둥근 고리
      for (const s of [-1, 1]) {
        w.box(KX + s * 20, F + 24, KZ - 2, KX + s * 20, F + 27, KZ + 2, B.copperDk);
        for (let a = 0; a < 40; a++) { const t = a / 40 * Math.PI * 2, rz = Math.round(Math.cos(t) * 4), ry = Math.round(Math.sin(t) * 4); w.set(KX + s * 22, F + 22 + ry, KZ + rz, B.iron); if (ry < 0) w.set(KX + s * 21, F + 22 + ry, KZ + rz, B.ironDk); }
      }
      for (let z = KZ - 18; z <= KZ + 18; z++) for (let x = KX - 18; x <= KX + 18; x++) if (MH.dist(x, z, KX, KZ) < 16.8) { w.hm[x + W * z] = F + 24; w.set(x, F + 24, z, B.ironDk); w.liquid(x, z, F + 26); }
      // 주걱: 굵은 자루, 가로대, 가운데 쇠축, 물약 속 구리 날
      const ladle = w.prop({ name: 'ladle', pivot: [KX + 0.5, F + 30, KZ + 0.5], axis: 'y', speed: 0.5 });
      ladle.box(KX + 8, F + 27, KZ, KX + 9, F + 48, KZ + 1, B.log); ladle.box(KX, F + 48, KZ, KX + 9, F + 49, KZ + 1, B.log);
      ladle.box(KX, F + 50, KZ, KX + 1, F + 56, KZ + 1, B.iron); ladle.box(KX - 1, F + 57, KZ - 1, KX + 2, F + 57, KZ + 2, B.ironDk);
      ladle.box(KX + 6, F + 27, KZ - 2, KX + 11, F + 29, KZ + 3, B.copperDk); ladle.box(KX + 7, F + 30, KZ - 1, KX + 10, F + 30, KZ + 2, B.copper);
      for (const y of [F + 34, F + 42]) ladle.box(KX + 8, y, KZ, KX + 9, y, KZ + 1, B.ironDk);
      // 솥걸이 기둥 둘과 대각 들보(돌 받침, 쇠 고리)
      for (const [x, z] of [[KX - 24, KZ - 24], [KX + 24, KZ + 24]]) {
        w.box(x - 3, F + 1, z - 3, x + 3, F + 2, z + 3, B.sill); w.box(x - 2, F + 3, z - 2, x + 2, F + 3, z + 2, B.st2);
        w.box(x - 1, F + 4, z - 1, x + 1, F + 60, z + 1, B.log);
        for (const y of [F + 12, F + 36, F + 58]) w.box(x - 1, y, z - 1, x + 1, y, z + 1, B.ironDk);
        w.box(x - 1, F + 61, z - 1, x + 1, F + 61, z + 1, B.iron); w.set(x, F + 62, z, B.iron);
      }
      w.line(KX - 24, F + 61, KZ - 24, KX + 24, F + 61, KZ + 24, B.log, 1.1);
      // 가마솥 둘레의 장작 더미와 재료 상자
      logPile(KX - 30, F, KZ + 8, 8, true, 2);
      logPile(KX + 24, F, KZ - 14, 8, true, 2);
      for (const [x, z] of [[KX - 18, KZ - 30], [KX + 20, KZ + 22]]) { crate(w, x, F + 1, z, 4); crate(w, x + 4, F + 1, z, 4); crate(w, x + 1, F + 5, z, 4); bottle(w, x + 2, F + 9, z + 1, B.potG, true); bottle(w, x + 6, F + 5, z + 2, B.potY); }
      lights.push({ name: 'pot', p: [KX + 0.5, F + 30, KZ + 0.5], c: '#80ff50', i: 1.8, d: 56, flicker: 0.15, liquid: true });
      lights.push({ p: [KX + 16, F + 6, KZ + 0.5], c: '#ff9a40', i: 1.2, d: 32, flicker: 0.35 });
      acts.push({
        name: '거대 가마솥', hint: '주걱이 빨리 돌고 물약이 끓어 넘쳐요', hit: [KX - 20, F + 10, KZ - 20, KX + 20, F + 32, KZ + 20],
        run: async a => {
          a.flash('pot', 2.6, 4); a.spin('ladle', 6, 4);
          for (let q = 0; q < 8; q++) { a.burst([KX + 0.5, F + 30, KZ + 0.5], { n: 44, colors: ['#8aff5a', '#e0ff8a', '#6ad02a'], speed: 12, up: 16, life: 1.6, gravity: 10, spread: 12 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '거대 가마솥', note: '백 년째 끓는 초록 물약', p: [KX + 0.5, F + 72, KZ + 0.5] });

      // ───────── 대증류탑(서쪽 절벽 위) ─────────
      const AX = 76, AZ = 104, ay = MH.maxG(w, AX - 20, AZ - 20, AX + 20, AZ + 20) + 1;
      MH.flatten(w, AX - 24, AZ - 24, AX + 24, AZ + 24, ay - 1, B.cob, B.rock);
      for (let z = AZ - 24; z <= AZ + 24; z++) for (let x = AX - 24; x <= AX + 24; x++) w.set(x, ay - 1, z, paveAt(x, z));
      // 화덕: 낱돌로 쌓은 둥근 벽, 벽돌 띠, 벽돌 기둥 여섯, 아치 아궁이
      for (let y = ay; y <= ay + 12; y++) for (let dz = -18; dz <= 18; dz++) for (let dx = -18; dx <= 18; dx++) {
        const d = Math.hypot(dx, dz); if (d > 18 || d <= 14) continue;
        const u = Math.round((Math.atan2(dz, dx) + Math.PI) * 18);
        w.set(AX + dx, y, AZ + dz, stoneAt(u, y, 4) || B.mortar);
      }
      w.ring(AX, AZ, ay + 13, 15, 19.2, B.brick); w.ring(AX, AZ, ay + 14, 16, 19.2, B.brick2);
      for (let a = 0; a < 6; a++) { const x = Math.round(AX + Math.cos(a * 1.047 + 0.5) * 18.4), z = Math.round(AZ + Math.sin(a * 1.047 + 0.5) * 18.4); w.box(x - 1, ay, z - 1, x + 1, ay + 15, z + 1, B.brick); w.box(x - 1, ay + 16, z - 1, x + 1, ay + 16, z + 1, B.sill); }
      for (let y = ay + 1; y <= ay + 9; y++) for (let x = AX - 3; x <= AX + 3; x++) { const top = ay + 7 + (Math.abs(x - AX) < 2 ? 2 : Math.abs(x - AX) < 3 ? 1 : 0); if (y <= top) for (let z = AZ + 13; z <= AZ + 19; z++) w.set(x, y, z, 0); }
      for (let x = AX - 4; x <= AX + 4; x++) { const top = ay + 8 + (Math.abs(x - AX) < 2 ? 2 : Math.abs(x - AX) < 3 ? 1 : 0); w.set(x, top, AZ + 18, B.brick2); w.set(x, top + 1, AZ + 18, B.brick2); }
      w.box(AX - 5, ay + 11, AZ + 19, AX + 5, ay + 11, AZ + 19, B.iron);
      w.cyl(AX, AZ, ay, ay, 14, B.soot); logPile(AX - 4, ay - 1, AZ + 4, 9, true, 2); w.cyl(AX, AZ, ay + 1, ay + 3, 6, B.fire); w.cyl(AX, AZ, ay + 4, ay + 4, 3, B.ember);
      // 구리 증류기: 큰 구리 공, 띠와 리브 여덟, 들여다보는 초록 유리창
      w.sphere(AX, ay + 32, AZ, 20, B.copper, (dx, dy, dz) => dx * dx + dy * dy + dz * dz > 16 * 16);
      for (let a = 0; a < 6.28; a += 0.05) for (const dy of [0, 1]) w.set(Math.round(AX + Math.cos(a) * 20.4), ay + 32 + dy, Math.round(AZ + Math.sin(a) * 20.4), B.copperDk);
      for (let a = 0; a < 8; a++) for (let t = 0.05; t < 1.5; t += 0.03) { const r = Math.cos(t) * 20.6; w.set(Math.round(AX + Math.cos(a * 0.785) * r), Math.round(ay + 32 + Math.sin(t) * 20.6), Math.round(AZ + Math.sin(a * 0.785) * r), B.copperDk); if ((t * 100 | 0) % 18 === 0) w.set(Math.round(AX + Math.cos(a * 0.785) * (r + 1)), Math.round(ay + 32 + Math.sin(t) * 21.6), Math.round(AZ + Math.sin(a * 0.785) * (r + 1)), B.rivet); }
      w.box(AX - 2, ay + 26, AZ + 19, AX + 2, ay + 34, AZ + 21, B.potG); w.box(AX - 4, ay + 24, AZ + 21, AX + 4, ay + 24, AZ + 21, B.iron); w.box(AX - 4, ay + 36, AZ + 21, AX + 4, ay + 36, AZ + 21, B.iron);
      for (const x of [AX - 4, AX + 4]) w.box(x, ay + 24, AZ + 21, x, ay + 36, AZ + 21, B.iron);
      w.box(AX, ay + 25, AZ + 21, AX, ay + 35, AZ + 21, B.ironDk);
      // 구리 기둥과 꼭대기 공
      w.cyl(AX, AZ, ay + 52, ay + 80, 5.6, B.patina); w.ring(AX, AZ, ay + 62, 5.6, 8, B.copperDk); w.ring(AX, AZ, ay + 63, 5.6, 8, B.copperDk); w.ring(AX, AZ, ay + 72, 5.6, 7.6, B.copperDk); w.ring(AX, AZ, ay + 73, 5.6, 7.6, B.copperDk);
      for (let y = ay + 53; y <= ay + 79; y += 4) for (let a = 0; a < 12; a++) { const t = a / 12 * Math.PI * 2; w.set(Math.round(AX + Math.cos(t) * 6), y, Math.round(AZ + Math.sin(t) * 6), B.rivet); }
      w.cyl(AX, AZ, ay + 51, ay + 52, 8, B.copperDk);
      w.sphere(AX, ay + 84, AZ, 8.4, B.copper); w.ring(AX, AZ, ay + 84, 8, 9, B.copperDk);
      w.box(AX, ay + 92, AZ, AX + 1, ay + 97, AZ + 1, B.iron); w.box(AX - 1, ay + 93, AZ - 1, AX + 2, ay + 93, AZ + 2, B.ironDk);
      // ───────── 응축기(동쪽 절벽 위) ─────────
      const CXX = 256, CZZ = 116, cy = MH.maxG(w, CXX - 16, CZZ - 16, CXX + 16, CZZ + 16) + 1;
      MH.flatten(w, CXX - 20, CZZ - 20, CXX + 20, CZZ + 20, cy - 1, B.cob, B.rock);
      for (let z = CZZ - 20; z <= CZZ + 20; z++) for (let x = CXX - 20; x <= CXX + 20; x++) w.set(x, cy - 1, z, paveAt(x, z));
      for (const [dx, dz] of [[-10, -10], [10, -10], [-10, 10], [10, 10]]) { w.box(CXX + dx - 1, cy, CZZ + dz - 1, CXX + dx + 1, cy + 1, CZZ + dz + 1, B.sill); w.box(CXX + dx, cy + 2, CZZ + dz, CXX + dx + 1, cy + 17, CZZ + dz + 1, B.iron); }
      for (const dz of [-10, 11]) { w.line(CXX - 10, cy + 2, CZZ + dz, CXX + 10, cy + 15, CZZ + dz, B.ironDk); w.line(CXX + 11, cy + 2, CZZ + dz, CXX - 9, cy + 15, CZZ + dz, B.ironDk); }
      w.cyl(CXX, CZZ, cy + 18, cy + 44, 13.6, B.patina);
      for (const y of [cy + 18, cy + 30, cy + 44]) { w.ring(CXX, CZZ, y, 13.6, 15.2, B.copperDk); w.ring(CXX, CZZ, y + 1, 13.6, 15.2, B.copperDk); }
      for (const y of [cy + 24, cy + 38]) w.ring(CXX, CZZ, y, 13.6, 14.8, B.copper);
      for (let y = cy + 21; y <= cy + 42; y += 7) for (let a = 0; a < 24; a++) { const t = a / 24 * Math.PI * 2; w.set(Math.round(CXX + Math.cos(t) * 14.2), y, Math.round(CZZ + Math.sin(t) * 14.2), B.rivet); }
      w.cyl(CXX, CZZ, cy + 46, cy + 46, 12, B.copperDk); w.cyl(CXX, CZZ, cy + 47, cy + 47, 9, B.copper);
      w.box(CXX, cy + 2, CZZ, CXX + 1, cy + 17, CZZ + 1, B.copper); w.box(CXX - 2, cy, CZZ - 2, CXX + 3, cy + 1, CZZ + 3, B.plank);
      bottle(w, CXX - 1, cy + 2, CZZ + 3, B.potB, true); bottle(w, CXX + 3, cy + 2, CZZ, B.potB);
      for (let s = 0; s < 3; s++) crate(w, CXX + 14 + s * 0, cy, CZZ - 8 + s * 4, 4);
      // 증류관: 증류기 머리에서 응축기 위로(이음매 띠, 고정 고리)
      let prev = null;
      const pipeAt = t => [MH.lerp(AX + 8, CXX, t), MH.lerp(ay + 88, cy + 48, t) + Math.sin(t * Math.PI) * 16, MH.lerp(AZ, CZZ, t)];
      for (let i = 0; i <= 90; i++) { const p = pipeAt(i / 90); if (prev) w.line(prev[0], prev[1], prev[2], p[0], p[1], p[2], i % 9 === 0 ? B.copperDk : B.copper, i % 9 === 0 ? 2.8 : 2.2); prev = p; }
      for (const t of [0.3, 0.7]) { const p = pipeAt(t); w.box(Math.round(p[0]) - 1, Math.round(p[1]) + 3, Math.round(p[2]) - 1, Math.round(p[0]) + 1, Math.round(p[1]) + 6, Math.round(p[2]) + 1, B.iron); }
      w.box(CXX, cy + 48, CZZ, CXX + 1, cy + 54, CZZ + 1, B.copper);
      // 밸브 바퀴(부품)
      const valve = w.prop({ name: 'valve', pivot: [AX + 0.5, ay + 67, AZ + 10.5], axis: 'z' });
      MH.ringProp(valve, AX, ay + 66, AZ + 10, 6, 'xy', B.iron, B.copper, 6); MH.ringProp(valve, AX, ay + 66, AZ + 10, 5, 'xy', B.ironDk);
      valve.box(AX - 5, ay + 66, AZ + 10, AX + 5, ay + 66, AZ + 10, B.iron); valve.box(AX, ay + 61, AZ + 10, AX, ay + 71, AZ + 10, B.iron); valve.set(AX, ay + 66, AZ + 11, B.copper);
      w.box(AX, ay + 66, AZ + 6, AX, ay + 66, AZ + 9, B.iron);
      lights.push({ name: 'still', p: [AX + 0.5, ay + 5, AZ + 7], c: '#ff9a40', i: 1.5, d: 40, flicker: 0.3 });
      lights.push({ p: [AX + 0.5, ay + 30, AZ + 23], c: '#90ff60', i: 1, d: 26, flicker: 0.1 });
      smoke.push({ n: 40, colors: ['#9aff6a', '#e0ffc0'], mode: 'rise', speed: 1.2, area: [AX + 0.5, AZ + 0.5, 2], y0: ay + 98, y1: ay + 148, glow: true });
      acts.push({
        name: '대증류탑', hint: '밸브가 돌고 증기가 뿜어지며 응축기에 물약이 고여요', hit: [AX - 20, ay + 12, AZ - 20, AX + 20, ay + 54, AZ + 22],
        run: async a => {
          a.flash('still', 2.6, 4.5);
          await a.turn('valve', [0, 0, 6.28], 1.6, t => t);
          for (let q = 0; q < 6; q++) {
            a.burst([AX + 0.5, ay + 98, AZ + 0.5], { n: 36, colors: ['#e8ffe0', '#9aff6a', '#ffffff'], speed: 8, up: 16, life: 1.8, gravity: -1, spread: 3 });
            a.burst([CXX + 0.5, cy + 16, CZZ + 0.5], { n: 10, colors: ['#6ac8ff', '#c8f0ff'], speed: 1, up: 0, life: 0.8, gravity: 16, spread: 1 });
            await a.wait(0.45);
          }
          await a.turn('valve', [0, 0, 0], 1.4, t => t);
        },
      });
      landmarks.push({ name: '대증류탑', note: '연금술 조합의 구리 증류기', p: [AX + 0.5, ay + 108, AZ + 0.5], tag: 'LAB' });
      landmarks.push({ name: '응축기', note: '협곡 건너편에서 물약을 식힌다', p: [CXX + 0.5, cy + 64, CZZ + 0.5] });

      // ───────── 폐액 펌프: 수로 위 물레 ─────────
      for (const x of [PXX - 8, PXX + 10]) { w.box(x - 1, F + 1, PZ + 3, x + 1, F + 2, PZ + 5, B.sill); w.box(x, F + 3, PZ + 4, x + 1, F + 18, PZ + 5, B.log); w.box(x - 1, F + 18, PZ + 3, x + 2, F + 19, PZ + 6, B.wood); }
      w.box(PXX - 7, F + 16, PZ + 4, PXX - 1, F + 17, PZ + 5, B.iron); w.box(PXX + 4, F + 16, PZ + 4, PXX + 9, F + 17, PZ + 5, B.iron);
      for (let z = PZ - 14; z <= PZ + 22; z++) for (let x = PXX - 2; x <= PXX + 5; x++) { MH.setH(w, x, z, F - 20, B.rockDk, B.rockDk); for (let y = F - 19; y <= F; y++) w.set(x, y, z, 0); w.liquid(x, z, F - 2); }
      for (let z = PZ - 14; z <= PZ + 22; z++) for (const x of [PXX - 3, PXX + 6]) for (let y = F - 19; y <= F; y++) w.set(x, y, z, y === F ? B.sill : (stoneAt(z, y, 6) || B.mortar));
      const pump = w.prop({ name: 'pump', pivot: [PXX + 2, F + 16.5, PZ + 4.5], axis: 'x', speed: 0.8 });
      for (let dy = -16; dy <= 16; dy++) for (let dz = -16; dz <= 16; dz++) {
        const r = Math.hypot(dy + 0.5, dz + 0.5), ang = Math.atan2(dy + 0.5, dz + 0.5); if (r > 14.4) continue;
        const sp = ((ang / (Math.PI / 4)) % 1 + 1) % 1, spoke = r > 2 && (sp < 0.9 / r || sp > 1 - 0.9 / r);
        if (r > 11.8) for (const x of [PXX, PXX + 3]) pump.set(x, F + 16 + dy, PZ + 4 + dz, r > 13.4 ? B.copperDk : B.log);
        else if (spoke) for (const x of [PXX, PXX + 3]) pump.set(x, F + 16 + dy, PZ + 4 + dz, B.log);
        if (r < 2.4) for (let x = PXX; x <= PXX + 3; x++) pump.set(x, F + 16 + dy, PZ + 4 + dz, B.iron);
      }
      for (let a = 0; a < 12; a++) { const ang = a / 12 * Math.PI * 2; for (let rr = 12; rr <= 16; rr += 0.5) for (let x = PXX; x <= PXX + 3; x++) pump.set(x, F + 16 + Math.round(Math.sin(ang) * rr), PZ + 4 + Math.round(Math.cos(ang) * rr), rr > 15 ? B.copperDk : B.patina); }
      acts.push({
        name: '폐액 물레', hint: '물레가 빨리 돌며 초록 물보라가 튀어요', hit: [PXX - 2, F, PZ - 12, PXX + 5, F + 32, PZ + 20],
        run: async a => { a.spin('pump', 5, 4); for (let q = 0; q < 8; q++) { a.burst([PXX + 2, F, PZ + 4.5], { n: 28, colors: ['#8aff5a', '#e0ff8a'], speed: 8, up: 10, life: 1, gravity: 18, spread: 6 }); await a.wait(0.45); } },
      });
      landmarks.push({ name: '폐액 물레', note: '넘친 물약을 퍼 올리는 바퀴', p: [PXX + 2, F + 42, PZ + 4.5] });

      // ───────── 남쪽 약재 장터: 일곱 색 분수, 노점, 호문쿨루스 플라스크 ─────────
      for (let z = MKZ - 36; z <= MKZ + 40; z++) for (let x = MKX - 52; x <= MKX + 52; x++) {
        if (MH.g(w, x, z) !== F) continue;
        const d = MH.dist(x, z, MKX, MKZ);
        if (d < 24) { const rg = Math.floor(d / 3), seg = Math.floor((Math.atan2(z - MKZ, x - MKX) + Math.PI) * (rg + 2)); w.set(x, F, z, (d % 3) < 0.6 ? B.cobbleJ : [B.st1, B.st3, B.st2][(hash3(seg, rg, 5) * 3) | 0]); }
        else { const q = ((x >> 2) + (z >> 2)) & 1; w.set(x, F, z, (x & 3) === 3 || (z & 3) === 3 ? B.cobbleJ : q ? B.cobble3 : B.cobble2); }
      }
      // 분수: 낱돌 대야 테, 구리 갓돌, 가운데 기둥과 위 두 대야, 일곱 색 꼭지
      for (let z = MKZ - 16; z <= MKZ + 16; z++) for (let x = MKX - 16; x <= MKX + 16; x++) {
        const d = MH.dist(x, z, MKX, MKZ); if (d > 15.2) continue;
        if (d > 12.4) { for (let y = F + 1; y <= F + 4; y++) w.set(x, y, z, stoneAt(Math.round(Math.atan2(z - MKZ, x - MKX) * 16), y, 8) || B.mortar); w.set(x, F + 5, z, d > 14 ? B.copperDk : B.copper); continue; }
        MH.setH(w, x, z, F - 2, B.rockDk, B.rockDk); w.liquid(x, z, F + 2);
      }
      w.cyl(MKX, MKZ, F - 1, F + 10, 3.2, B.st3); for (let y = F; y <= F + 10; y += 3) w.ring(MKX, MKZ, y, 2.4, 3.4, B.mortar);
      w.cyl(MKX, MKZ, F + 11, F + 11, 5, B.copperDk); w.cyl(MKX, MKZ, F + 12, F + 13, 7.2, B.copper); w.ring(MKX, MKZ, F + 14, 5.2, 7.2, B.copperDk); w.ring(MKX, MKZ, F + 15, 6.2, 7.2, B.copper);
      w.cyl(MKX, MKZ, F + 14, F + 21, 2, B.copper); w.ring(MKX, MKZ, F + 18, 1.4, 2.6, B.copperDk);
      w.cyl(MKX, MKZ, F + 22, F + 22, 3, B.copperDk); w.cyl(MKX, MKZ, F + 23, F + 23, 4.4, B.copper); w.ring(MKX, MKZ, F + 24, 3.4, 4.4, B.copperDk);
      const seven = [B.potR, B.potO, B.potY, B.potG, B.potB, B.potI, B.potP];
      for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2, x = Math.round(MKX + Math.cos(a) * 6), z = Math.round(MKZ + Math.sin(a) * 6); w.set(x, F + 16, z, seven[i]); w.set(x, F + 17, z, seven[i]); w.set(Math.round(MKX + Math.cos(a) * 7.6), F + 15, Math.round(MKZ + Math.sin(a) * 7.6), seven[i]); }
      w.box(MKX, F + 24, MKZ, MKX + 1, F + 27, MKZ + 1, B.goldG);
      lights.push({ name: 'fount', p: [MKX + 1, F + 24, MKZ + 1], c: '#ffe080', i: 1.4, d: 44, flicker: 0.1 });
      const cols7 = ['#ff6a8a', '#ffa040', '#ffe060', '#8aff5a', '#6ac8ff', '#8a7aff', '#d07aff'];
      acts.push({
        name: '일곱 색 분수', hint: '장터 분수에서 일곱 색 물약이 차례로 솟구쳐요', hit: [MKX - 14, F + 1, MKZ - 14, MKX + 14, F + 28, MKZ + 14],
        run: async a => {
          a.flash('fount', 3, 6.5); a.glow(1.5, 6.5);
          for (let i = 0; i < 7; i++) { a.burst([MKX + 1, F + 27, MKZ + 1], { n: 50, colors: [cols7[i], '#ffffff'], speed: 8, up: 30, life: 1.8, gravity: 20, spread: 2 }); await a.wait(0.55); }
          a.burst([MKX + 1, F + 27, MKZ + 1], { n: 90, colors: cols7, speed: 14, up: 36, life: 2.2, gravity: 20, spread: 4 });
          await a.wait(1);
        },
      });
      landmarks.push({ name: '약재 장터', note: '일곱 색 분수 둘레의 노점 골목', p: [MKX + 0.5, F + 44, MKZ + 0.5], tag: 'MARKET' });
      // 노점: 기둥 넷, 앞 진열대(판자 상판), 물건, 줄무늬 차양과 물결 테두리
      const goodsL = [[B.herb, B.potG, B.mand], [B.potP, B.potR, B.glass], [B.potB, B.potY, B.herb], [B.mand, B.herb, B.potO]];
      const awn = [[B.awnG, B.awnW], [B.awnP, B.awnW], [B.awnG, B.awnP]];
      const stall = (x, z, si) => {
        const SX = 12, SZ = 10, y = F + 1, aw = awn[si % 3], goods = goodsL[si % 4];
        for (const [px, pz] of [[x, z], [x + SX - 1, z], [x, z + SZ - 1], [x + SX - 1, z + SZ - 1]]) w.box(px, y, pz, px, y + 10, pz, B.log);
        for (let px = x + 1; px <= x + SX - 2; px++) { w.box(px, y, z + SZ - 2, px, y + 3, z + SZ - 1, px % 3 ? B.plank : B.wood); w.set(px, y + 4, z + SZ - 2, B.wood); w.set(px, y + 4, z + SZ - 1, B.wood); }
        for (let px = x + 1; px <= x + SX - 2; px += 2) { const gb = goods[(px >> 1) % 3]; if (gb === B.herb || gb === B.mand) { w.set(px, y + 5, z + SZ - 2, gb); w.set(px + 1, y + 5, z + SZ - 2, gb === B.herb ? B.herbD : B.mandDk); w.set(px, y + 6, z + SZ - 2, B.leafM); } else bottle(w, px, y + 5, z + SZ - 1, gb, px & 2); }
        crate(w, x + 2, y, z + 1, 4); crate(w, x + 6, y, z + 2, 3); w.set(x + 3, y + 4, z + 2, B.herb);
        for (let dz = -2; dz <= SZ + 1; dz++) for (let dx = -2; dx <= SX + 1; dx++) {
          const yy = y + 12 - Math.floor((dz + 2) / 5);
          w.set(x + dx, yy, z + dz, ((dx + 2) >> 1) & 1 ? aw[0] : aw[1]);
          if (dz === SZ + 1 && (dx & 1)) w.set(x + dx, yy - 1, z + dz, ((dx + 2) >> 1) & 1 ? aw[0] : aw[1]);
        }
      };
      let si = 0;
      for (const [sx, sz] of [[MKX - 44, MKZ - 30], [MKX - 26, MKZ - 30], [MKX + 18, MKZ - 30], [MKX + 36, MKZ - 30], [MKX - 44, MKZ + 18], [MKX + 32, MKZ + 18]]) {
        if (MH.g(w, sx, sz) !== F || MH.g(w, sx + 11, sz + 9) !== F || MH.g(w, sx - 2, sz - 2) !== F || MH.g(w, sx + 13, sz + 11) !== F) continue;
        stall(sx, sz, si); si++;
      }
      for (const [x, z] of [[MKX - 12, MKZ + 24], [MKX + 16, MKZ + 26], [MKX - 32, MKZ - 6], [MKX - 6, MKZ - 26]]) if (MH.g(w, x, z) === F && MH.g(w, x + 4, z + 4) === F) { crate(w, x, F + 1, z, 4); w.set(x + 2, F + 5, z + 1, B.herb); w.set(x + 1, F + 5, z + 2, B.herbD); bottle(w, x + 1, F + 5, z + 1, seven[Math.abs(x + z) % 7]); }
      garland([MKX - 44, F + 18, MKZ - 31], [MKX + 47, F + 18, MKZ - 31], 6, [B.potY, B.potG, B.potP]);
      // 호문쿨루스 플라스크: 구리 받침, 구리 갈비뼈 사이 유리 구, 긴 목과 마개, 바닥의 빛나는 물약
      const HFX = MKX + 26, HFZ = MKZ + 2, hfy = MH.g(w, HFX, HFZ) + 1;
      w.cyl(HFX, HFZ, hfy, hfy + 2, 8, B.copperDk); w.ring(HFX, HFZ, hfy + 3, 6, 8, B.copper); for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2; w.set(Math.round(HFX + Math.cos(t) * 7.6), hfy + 1, Math.round(HFZ + Math.sin(t) * 7.6), B.rivet); }
      w.sphere(HFX, hfy + 12, HFZ, 9.2, B.glass, (dx, dy, dz) => { const r = Math.hypot(dx, dy, dz); return r > 7.8 && (dy < -5 || hash3(dx, dy, dz) > 0.82); });
      for (let a = 0; a < 6; a++) for (let t = -1.2; t < 1.1; t += 0.04) { const r = Math.cos(t) * 9.4; w.set(Math.round(HFX + Math.cos(a * 1.047) * r), Math.round(hfy + 12 + Math.sin(t) * 9.4), Math.round(HFZ + Math.sin(a * 1.047) * r), B.copperDk); }
      for (let a = 0; a < 6.28; a += 0.06) w.set(Math.round(HFX + Math.cos(a) * 9.5), hfy + 12, Math.round(HFZ + Math.sin(a) * 9.5), B.copper);
      for (let y = hfy + 20; y <= hfy + 23; y++) w.ring(HFX, HFZ, y, 1.6, 3.4, B.glass);
      w.ring(HFX, HFZ, hfy + 24, 1.4, 4.2, B.copper); w.ring(HFX, HFZ, hfy + 25, 1.4, 3.6, B.copperDk); w.cyl(HFX, HFZ, hfy + 25, hfy + 26, 1.4, B.pot);
      w.cyl(HFX, HFZ, hfy + 4, hfy + 5, 5, B.potG);
      lights.push({ name: 'flask', p: [HFX + 0.5, hfy + 10, HFZ + 0.5], c: '#a0ffb0', i: 1.1, d: 28, flicker: 0.15 });
      const homu = w.prop({ name: 'homu', pivot: [HFX + 0.5, hfy + 10, HFZ + 0.5], axis: 'y', speed: 0.4, bob: 0.8, bobSpeed: 1.4 });
      homu.box(HFX, hfy + 7, HFZ, HFX + 1, hfy + 11, HFZ + 1, B.homu); homu.box(HFX, hfy + 12, HFZ, HFX + 1, hfy + 13, HFZ + 1, B.homu);
      homu.set(HFX + 2, hfy + 10, HFZ, B.homu); homu.set(HFX - 1, hfy + 10, HFZ, B.homu); homu.set(HFX + 3, hfy + 11, HFZ, B.homu); homu.set(HFX - 2, hfy + 11, HFZ, B.homu);
      homu.set(HFX, hfy + 13, HFZ + 2, B.potG); homu.set(HFX + 1, hfy + 13, HFZ + 2, B.potG); homu.box(HFX, hfy + 14, HFZ, HFX + 1, hfy + 14, HFZ + 1, B.leafM); homu.set(HFX, hfy + 15, HFZ, B.leafLt);
      homu.box(HFX - 1, hfy + 16, HFZ - 1, HFX + 2, hfy + 16, HFZ + 2, B.goldG); homu.box(HFX, hfy + 16, HFZ, HFX + 1, hfy + 16, HFZ + 1, 0);
      acts.push({
        name: '호문쿨루스', hint: '플라스크 속 호문쿨루스가 깨어나 병 위로 떠올라 빙글빙글 춤을 춰요', hit: [HFX - 10, hfy, HFZ - 10, HFX + 10, hfy + 26, HFZ + 10],
        run: async a => {
          a.flash('flask', 3, 5); a.spin('homu', 8, 4.5);
          await a.move('homu', [0, 20, 0], 1.2);
          for (let q = 0; q < 4; q++) { await a.move('homu', [0, 24, 0], 0.4); a.burst([HFX + 0.5, hfy + 36, HFZ + 0.5], { n: 24, colors: ['#a0ffb0', '#ffffff', '#ffd860'], speed: 8, up: 8, life: 1.4, gravity: 2, spread: 2 }); await a.move('homu', [0, 20, 0], 0.4); }
          await a.move('homu', [0, 0, 0], 1.2);
        },
      });

      // ───────── 서쪽 벼랑 위 유리 공방 ─────────
      const GWX = 60, GWZ = 244, gwy = MH.maxG(w, GWX - 24, GWZ - 18, GWX + 24, GWZ + 30) + 1;
      MH.flatten(w, GWX - 26, GWZ - 20, GWX + 28, GWZ + 32, gwy - 1, B.cob, B.rock);
      for (let z = GWZ - 20; z <= GWZ + 32; z++) for (let x = GWX - 26; x <= GWX + 28; x++) w.set(x, gwy - 1, z, paveAt(x, z));
      const shop = house({ x: GWX - 24, z: GWZ - 18, sx: 24, sz: 20, floors: 2, fh: 12, face: 'e', pitch: 1, axis: 'x', y: gwy, chimney: true,
        wall: B.wallC, win: B.winG, pal: PAL[0], shutter: B.shutter, box: true, stone: 1 });
      { const [dx, dy, dz] = shop.door;
        acts.push(OR.goAct({ at: [dx + 2, dy, dz], h: 8, name: '유리 공방 안으로', goto: 'alembic-glassworks', hint: '문을 열고 녹임 가마가 타오르는 유리 공방 작업장으로 들어가요', hit: [dx, dy - 2, dz - 3, dx + 3, dy + 8, dz + 3] })); }
      if (shop.chimney) smoke.push({ n: 24, colors: ['#ffb070', '#f0e0c0'], mode: 'rise', speed: 1, area: [shop.chimney[0], shop.chimney[2], 1.2], y0: shop.chimney[1], y1: shop.chimney[1] + 32, glow: true });
      // 벌집 모양 벽돌 가마: 벽돌 반구, 아치 아궁이, 쇠 문틀, 굴뚝
      const KLX = GWX + 14, KLZ = GWZ + 10;
      w.sphere(KLX, gwy, KLZ, 10.8, B.brick, (dx, dy, dz) => dy >= 0 && (dx * dx + dy * dy + dz * dz > 7.4 * 7.4 || dy > 6));
      for (let dy = 0; dy <= 10; dy += 3) w.ring(KLX, KLZ, gwy + dy, Math.sqrt(Math.max(0, 10.8 * 10.8 - dy * dy)) - 1, Math.sqrt(Math.max(0, 10.8 * 10.8 - dy * dy)) + 0.4, B.brick2);
      w.cyl(KLX, KLZ, gwy, gwy, 7.2, B.fire); w.cyl(KLX, KLZ, gwy + 1, gwy + 1, 4, B.ember);
      for (let y = gwy; y <= gwy + 5; y++) for (let x = KLX - 3; x <= KLX + 3; x++) if (y <= gwy + 4 || Math.abs(x - KLX) < 2) for (let z = KLZ + 6; z <= KLZ + 12; z++) w.set(x, y, z, 0);
      w.box(KLX - 4, gwy + 6, KLZ + 10, KLX + 4, gwy + 6, KLZ + 10, B.iron); for (const x of [KLX - 4, KLX + 4]) w.box(x, gwy, KLZ + 10, x, gwy + 5, KLZ + 10, B.iron);
      w.box(KLX - 1, gwy + 10, KLZ - 1, KLX + 1, gwy + 19, KLZ + 1, B.brick); w.box(KLX - 2, gwy + 18, KLZ - 2, KLX + 2, gwy + 18, KLZ + 2, B.brick2); w.box(KLX - 2, gwy + 20, KLZ - 2, KLX + 2, gwy + 20, KLZ + 2, B.iron);
      logPile(KLX + 12, gwy - 1, KLZ - 8, 8, false, 3);
      // 식힘 탁자: 다리, 판자 상판, 갓 분 병
      w.box(GWX - 8, gwy, GWZ + 6, GWX, gwy + 3, GWZ + 14, 0);
      for (const [x, z] of [[GWX - 8, GWZ + 6], [GWX, GWZ + 6], [GWX - 8, GWZ + 14], [GWX, GWZ + 14]]) w.box(x, gwy, z, x, gwy + 2, z, B.wood);
      w.box(GWX - 8, gwy + 3, GWZ + 6, GWX, gwy + 3, GWZ + 14, B.plank);
      for (let i = 0; i < 5; i++) bottle(w, GWX - 7 + i * 2, gwy + 4, GWZ + 8 + (i % 3) * 2, [B.glass, B.potB, B.glass, B.potP, B.potG][i], i % 2);
      lights.push({ name: 'kiln', p: [KLX + 0.5, gwy + 2, KLZ + 6], c: '#ffa040', i: 1.4, d: 36, flicker: 0.35 });
      smoke.push({ n: 18, colors: ['#ffb070', '#ffe0b0'], mode: 'rise', speed: 1.3, area: [KLX + 0.5, KLZ + 0.5, 1.2], y0: gwy + 22, y1: gwy + 52, glow: true });
      const BBX = KLX, BBZ = KLZ + 20, bby = gwy + 9;
      w.box(BBX, gwy, BBZ, BBX, gwy + 4, BBZ, B.iron); w.box(BBX - 2, gwy, BBZ - 2, BBX + 2, gwy, BBZ + 2, B.sill); for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) w.set(BBX + dx, gwy + 1, BBZ + dz, B.ironDk);
      const bub = w.prop({ name: 'bubble', pivot: [BBX + 0.5, gwy + 6, BBZ + 0.5], axis: 'y', speed: 0.3, scl0: [0, 0, 0] });
      bub.sphere(BBX, bby, BBZ, 6, B.glass, (dx, dy, dz) => Math.hypot(dx, dy, dz) > 4.6 && (((dx >> 1) + (dy >> 1) + (dz >> 1)) & 1) === 0); bub.sphere(BBX, bby, BBZ, 2.8, B.potO);
      acts.push({
        name: '유리 불기', hint: '유리 공방 가마가 확 타오르고 커다란 유리 방울이 부풀다 터져요', hit: [KLX - 10, gwy, KLZ - 10, KLX + 10, gwy + 18, BBZ + 6],
        run: async a => {
          a.flash('kiln', 4, 5.5);
          for (let q = 0; q < 3; q++) { a.burst([KLX + 0.5, gwy + 4, KLZ + 12], { n: 30, colors: ['#ff9a3a', '#ffd060', '#ffffff'], speed: 8, up: 8, life: 1, gravity: -2, spread: 2 }); await a.wait(0.3); }
          await a.tween('bubble', { scl: [1, 1, 1] }, 1.6);
          await a.tween('bubble', { scl: [1.4, 1.4, 1.4] }, 1.2);
          a.lightning(0.3);
          a.burst([BBX + 0.5, bby + 2, BBZ + 0.5], { n: 70, colors: ['#a8e0c8', '#ffffff', '#ffa040', '#6ac8ff'], speed: 20, up: 8, life: 1.4, gravity: 16, spread: 4 });
          await a.tween('bubble', { scl: [0, 0, 0] }, 0.2);
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '유리 공방', note: '벌집 가마에서 물약병을 불어 만든다', p: [GWX + 0.5, gwy + 48, GWZ + 0.5] });

      // ───────── 현자의 돌(동쪽 절벽 위) ─────────
      const SX = 278, SZ = 252, sy = MH.maxG(w, SX - 22, SZ - 22, SX + 22, SZ + 22);
      MH.flatten(w, SX - 26, SZ - 26, SX + 26, SZ + 26, sy, B.cob, B.rock);
      for (let z = SZ - 26; z <= SZ + 26; z++) for (let x = SX - 26; x <= SX + 26; x++) w.set(x, sy, z, paveAt(x, z));
      MH.circle(w, SX, SZ, 22, B.potR, 2); MH.circle(w, SX, SZ, 14, B.goldG, 2); MH.circle(w, SX, SZ, 18, B.sill, 2);
      for (let q = 0; q < 6; q++) { const a = q / 6 * Math.PI * 2; for (let s = 0; s <= 1; s += 0.01) { const x = MH.lerp(SX + Math.cos(a) * 14, SX + Math.cos(a + 2.09) * 14, s), z = MH.lerp(SZ + Math.sin(a) * 14, SZ + Math.sin(a + 2.09) * 14, s); MH.paint(w, Math.round(x), Math.round(z), B.potR); } }
      for (let q = 0; q < 4; q++) {
        const a = q * 1.57 + 0.78, px = Math.round(SX + Math.cos(a) * 25), pz = Math.round(SZ + Math.sin(a) * 25);
        w.box(px - 2, sy + 1, pz - 2, px + 2, sy + 2, pz + 2, B.sill);
        for (let y = sy + 3; y <= sy + 13; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(px + dx, y, pz + dz, (dx && dz) ? B.st2 : (stoneAt(dx + dz * 3 + q * 7, y, 11) || B.mortar));
        w.box(px - 2, sy + 14, pz - 2, px + 2, sy + 14, pz + 2, B.copperDk); w.box(px - 1, sy + 15, pz - 1, px + 1, sy + 15, pz + 1, B.copper);
        w.box(px, sy + 16, pz, px, sy + 17, pz, q % 2 ? B.potP : B.potG);
      }
      w.box(SX - 2, sy + 1, SZ - 2, SX + 2, sy + 2, SZ + 2, B.copperDk); w.box(SX - 1, sy + 3, SZ - 1, SX + 1, sy + 3, SZ + 1, B.copper); w.box(SX, sy + 4, SZ, SX, sy + 6, SZ, B.copper);
      const philo = w.prop({ name: 'philo', pivot: [SX + 0.5, sy + 17, SZ + 0.5], axis: 'y', speed: 0.6, bob: 1, bobSpeed: 1.2 });
      philo.sphere(SX, sy + 17, SZ, 4.4, B.philo, (dx, dy, dz) => Math.abs(dx) + Math.abs(dy) * 0.8 + Math.abs(dz) < 6.2);
      for (const [dx, dy, dz] of [[0, 7, 0], [0, -6, 0], [7, 0, 0], [-7, 0, 0], [0, 0, 7], [0, 0, -7]]) philo.set(SX + dx, sy + 17 + dy, SZ + dz, B.goldG);
      lights.push({ name: 'philo', p: [SX + 0.5, sy + 17, SZ + 0.5], c: '#ff4a5a', i: 1.4, d: 40, flicker: 0.12 });
      acts.push({
        name: '현자의 돌', hint: '붉은 돌이 높이 떠올라 돌며 금빛 가루를 쏟아내요', hit: [SX - 22, sy + 1, SZ - 22, SX + 22, sy + 24, SZ + 22],
        run: async a => {
          a.flash('philo', 4, 5.5); a.glow(1.7, 5.5); a.spin('philo', 9, 5.5);
          await a.move('philo', [0, 16, 0], 1.4);
          for (let q = 0; q < 7; q++) { a.burst([SX + 0.5, sy + 33, SZ + 0.5], { n: 36, colors: ['#ffd860', '#fff0a0', '#ff6a8a'], speed: 16, up: 8, life: 1.8, gravity: 12, spread: 2 }); await a.wait(0.4); }
          a.burst([SX + 0.5, sy + 1, SZ + 0.5], { n: 60, colors: ['#ffd860', '#ff6a8a'], speed: 24, up: 2, life: 1, gravity: 2, spread: 16, flat: true });
          await a.move('philo', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '현자의 돌', note: '변성진 위에 떠 있는 붉은 돌', p: [SX + 0.5, sy + 38, SZ + 0.5] });

      // ───────── 응축기 남쪽 면의 냉각 팬(부품) ─────────
      const fan = w.prop({ name: 'fan', pivot: [CXX + 0.5, cy + 31.5, CZZ + 16.5], axis: 'z', speed: 0.8 });
      for (let q = 0; q < 4; q++) { const a = q * Math.PI / 2; for (let r = 1.5; r <= 10; r += 0.5) for (let s = -0.5; s <= 0.5; s += 0.1) { const aa = a + s * 2.4 / Math.max(2, r) + r * 0.04; fan.set(Math.round(CXX + Math.cos(aa) * r), Math.round(cy + 31 + Math.sin(aa) * r), CZZ + 16, r > 9.4 ? B.copper : B.patina); } }
      MH.ringProp(fan, CXX, cy + 31, CZZ + 17, 11, 'xy', B.iron);
      fan.box(CXX - 1, cy + 30, CZZ + 16, CXX + 1, cy + 32, CZZ + 17, B.iron); fan.set(CXX, cy + 31, CZZ + 18, B.frost);
      w.box(CXX, cy + 31, CZZ + 14, CXX, cy + 31, CZZ + 15, B.iron);
      acts.push({
        name: '냉각 팬', hint: '응축기의 팬이 세차게 돌며 차가운 김을 내뿜어요', hit: [CXX - 12, cy + 18, CZZ + 12, CXX + 12, cy + 42, CZZ + 20],
        run: async a => {
          a.spin('fan', 9, 5);
          for (let q = 0; q < 9; q++) {
            a.burst([CXX + 0.5, cy + 31.5, CZZ + 20], { n: 30, colors: ['#c8f0ff', '#ffffff', '#6ac8ff'], speed: 18, up: 0, life: 1.4, gravity: -0.8, spread: 6 });
            if (q % 2) a.burst([CXX + 0.5, cy + 16, CZZ + 0.5], { n: 10, colors: ['#6ac8ff', '#c8f0ff'], speed: 1, up: 0, life: 0.8, gravity: 16, spread: 1 });
            await a.wait(0.5);
          }
        },
      });

      // ───────── 굴뚝 폭발: 시점 쪽 공방 굴뚝의 구리 뚜껑(부품)이 펑 하고 날아간다 ─────────
      const ch = chims.reduce((b, c) => c[0] + c[2] > b[0] + b[2] && c[2] < 256 ? c : b), hx = ch[0] - 2, hz = ch[2] - 2, hy = ch[1] - 3;
      const lid = w.prop({ name: 'lid', pivot: [hx + 2, hy + 3, hz + 2] });
      lid.box(hx - 1, hy + 3, hz - 1, hx + 4, hy + 3, hz + 4, B.copper); lid.box(hx, hy + 4, hz, hx + 3, hy + 4, hz + 3, B.copperDk);
      for (const [dx, dz] of [[-1, -1], [4, -1], [-1, 4], [4, 4]]) lid.set(hx + dx, hy + 4, hz + dz, B.rivet);
      lid.box(hx + 1, hy + 5, hz + 1, hx + 2, hy + 6, hz + 2, B.potP);
      acts.push({
        name: '굴뚝 폭발', hint: '실험이 실패해 굴뚝 뚜껑이 펑 하고 날아가요', hit: [hx - 3, hy - 8, hz - 3, hx + 6, hy + 8, hz + 6],
        run: async a => {
          for (let q = 0; q < 4; q++) { await a.turn('lid', [0.12, 0, -0.12], 0.12); await a.turn('lid', [-0.12, 0, 0.12], 0.12); }
          a.lightning(0.7); a.glow(1.8, 1.5);
          a.burst([hx + 2, hy + 3, hz + 2], { n: 80, colors: ['#d07aff', '#8aff5a', '#ff6a8a', '#ffd860', '#ffffff'], speed: 24, up: 18, life: 2, gravity: 10, spread: 2 });
          await a.tween('lid', { off: [0, 32, 0], rot: [0.6, 7, 0.4] }, 1.3);
          for (let q = 0; q < 3; q++) { a.burst([hx + 2, hy + 4, hz + 2], { n: 30, colors: ['#d07aff', '#f0c8ff', '#888888'], speed: 6, up: 12, life: 2, gravity: -1, spread: 2 }); await a.wait(0.3); }
          await a.tween('lid', { off: [0, 0, 0], rot: [0, 12.566, 0] }, 1.4, t => t * t);
          a.unwind('lid');
          a.burst([hx + 2, hy + 3, hz + 2], { n: 20, colors: ['#888888', '#c8c0a8'], speed: 8, up: 2, life: 0.8, gravity: 6, spread: 2, flat: true });
        },
      });

      // ───────── 증류관을 타고 건너는 물약 방울(부품, 평소엔 숨김) ─────────
      const d0 = pipeAt(0), drop = w.prop({ name: 'drop', pivot: [d0[0] + 0.5, d0[1] + 6, d0[2] + 0.5], axis: 'y', speed: 1, scl0: [0, 0, 0] });
      drop.sphere(Math.round(d0[0]), Math.round(d0[1] + 6), Math.round(d0[2]), 3.6, B.potG); drop.box(Math.round(d0[0]), Math.round(d0[1] + 10), Math.round(d0[2]), Math.round(d0[0]), Math.round(d0[1] + 12), Math.round(d0[2]), B.frost);
      const dropPts = []; for (let i = 1; i <= 14; i++) { const p = pipeAt(i / 14); dropPts.push([p[0] - d0[0], p[1] - d0[1], p[2] - d0[2]]); }
      acts.push({
        name: '물약 방울', hint: '증류탑 꼭대기에서 빛나는 물약 방울이 관을 타고 협곡을 건너요', hit: [AX - 10, ay + 76, AZ - 10, AX + 12, ay + 96, AZ + 10],
        run: async a => {
          a.flash('still', 2.4, 7);
          a.burst([d0[0] + 0.5, d0[1] + 6, d0[2] + 0.5], { n: 30, colors: ['#8aff5a', '#e0ffc0'], speed: 8, up: 6, life: 1.2, gravity: 4, spread: 2 });
          await a.tween('drop', { scl: [1, 1, 1] }, 0.7);
          await a.path('drop', dropPts, 5);
          await a.move('drop', [dropPts[13][0], dropPts[13][1] - 8, dropPts[13][2]], 0.5);
          a.tween('drop', { scl: [0, 0, 0] }, 0.4);
          for (let q = 0; q < 4; q++) { a.burst([CXX + 0.5, cy + 16, CZZ + 0.5], { n: 14, colors: ['#8aff5a', '#6ac8ff'], speed: 1.2, up: 0, life: 0.8, gravity: 16, spread: 1 }); a.burst([CXX + 0.5, cy + 54, CZZ + 0.5], { n: 16, colors: ['#8aff5a', '#ffffff'], speed: 8, up: 8, life: 1, gravity: 8, spread: 2 }); await a.wait(0.4); }
          await a.respawn('drop', 1.0);
        },
      });

      // ───────── 만드라고라 밭(동쪽 절벽 위) ─────────
      const MX = 248, MZ = 176, my = MH.maxG(w, MX - 6, MZ - 8, MX + 40, MZ + 8);
      MH.flatten(w, MX - 8, MZ - 10, MX + 42, MZ + 10, my, B.cob, B.rock);
      for (let z = MZ - 10; z <= MZ + 10; z++) for (let x = MX - 8; x <= MX + 42; x++) w.set(x, my, z, B.dirt);
      for (let z = MZ - 4; z <= MZ + 4; z++) for (let x = MX - 4; x <= MX + 38; x++) { const edge = z === MZ - 4 || z === MZ + 4 || x === MX - 4 || x === MX + 38; w.set(x, my + 1, z, edge ? B.plank : B.soil); if (edge && (x - MX) % 6 === 0) w.set(x, my + 2, z, B.wood); }
      for (let z = MZ - 3; z <= MZ + 3; z++) for (let x = MX - 3; x <= MX + 37; x++) if (((x + z) & 3) === 0 && hash3(x, 4, z) > 0.4 && (Math.abs(z - MZ) > 2 || ((x - MX - 2) % 6 + 6) % 6 > 1 && ((x - MX - 2) % 6 + 6) % 6 < 5)) w.set(x, my + 2, z, B.leafDk);
      // 울타리: 4칸마다 말뚝(갓 있음), 가로대 두 줄
      const fpts = [[MX - 8, MZ - 10], [MX + 42, MZ - 10], [MX + 42, MZ + 10], [MX - 8, MZ + 10], [MX - 8, MZ - 10]];
      for (let i = 0; i < 4; i++) {
        const [ax, az] = fpts[i], [bx, bz] = fpts[i + 1], nn = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
        for (let s = 0; s <= nn; s++) {
          const x = Math.round(ax + (bx - ax) * s / nn), z = Math.round(az + (bz - az) * s / nn);
          if (i === 3 && s >= 7 && s <= 13) continue;                        // 서쪽 문 틈
          if (s % 4 === 0) { w.box(x, my + 1, z, x, my + 6, z, B.log); w.set(x, my + 7, z, B.wood); }
          else { w.set(x, my + 3, z, B.plank); w.set(x, my + 5, z, B.plank); }
        }
      }
      for (let q = 0; q < 6; q++) {
        const x = MX + q * 6 + 2, p = w.prop({ name: 'mand' + q, pivot: [x + 0.5, my + 8, MZ + 0.5], off0: [0, -6, 0], clipOK: 0 });
        p.box(x - 1, my + 3, MZ - 1, x + 1, my + 8, MZ + 1, B.mand); p.box(x - 2, my + 5, MZ - 1, x + 2, my + 6, MZ + 1, B.mand);
        p.set(x, my + 2, MZ, B.mandDk); p.set(x - 1, my + 2, MZ, B.mandDk); p.set(x + 1, my + 2, MZ, B.mandDk);
        p.set(x - 3, my + 6, MZ, B.mandDk); p.set(x + 3, my + 6, MZ, B.mandDk); p.set(x - 3, my + 7, MZ, B.mandDk); p.set(x + 3, my + 7, MZ, B.mandDk);
        p.set(x - 1, my + 7, MZ + 2, B.eave); p.set(x + 1, my + 7, MZ + 2, B.eave); p.set(x, my + 5, MZ + 2, B.eave);
        p.box(x - 1, my + 9, MZ - 1, x + 1, my + 9, MZ + 1, B.leafM); p.set(x, my + 10, MZ, B.leafM); p.set(x - 1, my + 11, MZ, B.leafLt); p.set(x + 1, my + 10, MZ - 1, B.leafM); p.set(x + 2, my + 11, MZ - 1, B.leafLt); p.set(x, my + 12, MZ, B.leafM); p.set(x - 1, my + 10, MZ + 1, B.leafDk);
      }
      acts.push({
        name: '만드라고라 밭', hint: '흙 속 만드라고라가 차례로 튀어나와 꽥 비명을 질러요', hit: [MX - 4, my + 1, MZ - 6, MX + 38, my + 16, MZ + 6],
        run: async a => {
          for (let q = 0; q < 6; q++) {
            a.move('mand' + q, [0, 2, 0], 0.35); a.turn('mand' + q, [0, 0.5, 0], 0.2);
            a.burst([MX + q * 6 + 2.5, my + 10, MZ + 0.5], { n: 26, colors: ['#ffffff', '#e0ffb0'], speed: 16, up: 1, life: 0.7, gravity: 0, spread: 2, flat: true });
            await a.wait(0.35); a.turn('mand' + q, [0, -0.5, 0], 0.2);
          }
          await a.wait(1.4);
          for (let q = 0; q < 6; q++) { a.turn('mand' + q, [0, 0, 0], 0.4); a.move('mand' + q, [0, -6, 0], 0.6); a.burst([MX + q * 6 + 2.5, my + 3, MZ + 0.5], { n: 10, colors: ['#4a3420', '#6a4a30'], speed: 4, up: 4, life: 0.6, gravity: 16, spread: 2 }); await a.wait(0.15); }
          await a.wait(0.6);
        },
      });

      // ───────── 골목 바닥: 초록 웅덩이, 흩어진 깨진 병 ─────────
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        if (MH.g(w, x, z) !== F || w.get(x, F + 1, z)) continue;
        const h1 = hash3(x, 11, z);
        if (h1 > 0.997) bottle(w, x, F + 1, z, pots[(x + z) % 4]); else if (h1 > 0.99) w.set(x, F + 1, z, B.glass);
      }
      for (let i = 0; i < 14; i++) {
        const z = w.ri(8, D - 9), x = Math.round(cx(z)) + (i % 2 ? 9 : -7); if (MH.g(w, x, z) !== F) continue;
        for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { if (dx * dx + dz * dz * 1.4 > 8 || MH.g(w, x + dx, z + dz) !== F || w.get(x + dx, F + 1, z + dz)) continue; MH.setH(w, x + dx, z + dz, F - 1, B.rockDk, B.rockDk); w.liquid(x + dx, z + dz, F); }
      }

      // ───────── 벼랑 위 공방 줄(윗길) ─────────
      const busy = [[AX, AZ, 36], [CXX, CZZ, 32], [MX + 18, MZ, 36], [SX, SZ, 38], [GWX, GWZ, 40], [KX, KZ, 28], [MKX, MKZ, 60]];
      let uk = 0;
      for (const z of [16, 52, 88, 124, 160, 196, 232, 268]) for (const side of [-1, 1]) {
        const c = cx(z + 8), wd = wide(z + 8), x = Math.round(side < 0 ? c - wd - 34 : c + wd + 16);
        if (x < 8 || x + 18 > W - 8 || busy.some(([bx, bz, r]) => MH.dist(x + 8, z + 8, bx, bz) < r + 12)) continue;
        const hy = MH.maxG(w, x - 2, z - 2, x + 18, z + 16) + 1;
        if (hy < F + 36) continue;
        const h = house({ x, z, sx: 18, sz: 16, floors: 2, fh: 11, face: side < 0 ? 'e' : 'w', pitch: 1, axis: 'z', y: hy, chimney: true, stone: uk % 2,
          wall: walls[(uk + 2) % 4], win: uk % 2 ? B.winG : B.winP, pal: PAL[(uk + 1) % 3], shutter: uk % 2 ? B.shutter : B.shutter2, box: uk % 3 === 0 });
        if (h.chimney && smoke.length < 9) smoke.push({ n: 20, colors: smokeCol[(uk + 1) % 4], mode: 'rise', speed: 1.1, area: [h.chimney[0], h.chimney[2], 1.2], y0: h.chimney[1], y1: h.chimney[1] + 28, glow: true });
        { const p = h.side.at(z + 2, 4), gg = MH.g(w, p[0], p[1]); if (gg >= hy - 3) { crate(w, Math.min(p[0], h.side.at(z + 5, 7)[0]), gg + 1, z + 1, 4); bottle(w, Math.min(p[0], h.side.at(z + 5, 7)[0]) + 1, gg + 5, z + 2, pots[uk % 4], true); } }
        uk++;
      }

      // ───────── 벼랑 위 덤불·바위·약초·나무 ─────────
      for (let i = 0; i < 520; i++) {
        const x = w.ri(3, W - 4), z = w.ri(3, D - 4), gg = MH.g(w, x, z);
        if (gg < F + 24 || w.get(x, gg + 1, z) || (w.get(x, gg, z) !== B.grass && w.get(x, gg, z) !== B.grass2)) continue;
        const r = hash3(x, 5, z);
        if (r > 0.93) MH.rock(w, x, gg + 1, z, 2.8, B.rock, B.grass);
        else if (r > 0.6) { for (const [dx, dz, hh] of [[0, 0, 3], [1, 0, 2], [0, 1, 2], [-1, 0, 1], [0, -1, 2]]) for (let y = 1; y <= hh; y++) if (!w.get(x + dx, gg + y, z + dz) && MH.g(w, x + dx, z + dz) === gg) w.set(x + dx, gg + y, z + dz, y === hh ? (r > 0.8 ? B.herbD : B.herb) : B.flowerStem); }
        else { w.set(x, gg + 1, z, B.leafM); if (r > 0.3) { w.set(x, gg + 2, z, B.flowerStem); w.set(x, gg + 3, z, FLW[(r * 50 | 0) % 4]); } }
      }
      for (let i = 0; i < 22; i++) {
        const x = w.ri(12, W - 13), z = w.ri(12, D - 13), gg = MH.g(w, x, z);
        if (gg < F + 30 || (w.get(x, gg, z) !== B.grass && w.get(x, gg, z) !== B.grass2) || w.slope[x + W * z] > 2) continue;
        let ok = true; for (let q = 1; q <= 20; q++) for (const [dx, dz] of [[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]]) if (w.get(x + dx, gg + q, z + dz)) ok = false;
        if (ok) tree(x, gg + 1, z, { h: w.ri(11, 15), r: 6.2, leaves: [B.leafM, B.herb, B.leafDk] });
      }
      // ───────── 벼랑 발치의 무너진 돌무더기(비어 있는 자리에만, 몇 개는 반쯤 묻힘) ─────────
      for (let i = 0; i < 110; i++) {
        const z = w.ri(4, D - 5), side = i % 2 ? 1 : -1, wd = wide(z);
        const x = Math.round(cx(z) + side * (wd + w.r(-1, 3)));
        if (Math.abs(z - MKZ) < 44 || MH.dist(x, z, KX, KZ) < 34 || x < 4 || x > W - 5) continue;
        const r = w.r(1.6, 3.4), R = Math.ceil(r) + 2;
        let ok = true;
        for (let dz = -R; dz <= R && ok; dz++) for (let dx = -R; dx <= R && ok; dx++) {
          const gg = MH.g(w, x + dx, z + dz);
          if (gg < F || w.liq[x + dx + W * (z + dz)] >= 0) { ok = false; break; }
          for (let y = gg + 1; y <= F + 8; y++) if (w.get(x + dx, y, z + dz)) { ok = false; break; }
        }
        if (!ok) continue;
        const sink = hash3(x, 3, z) > 0.6 ? 1 : 0;
        MH.rock(w, x, F + 1 - sink, z, r, i % 3 ? B.rock : B.rockR, B.mossR, B.rockDk);
        for (let q = 0; q < 3; q++) {
          const a = hash3(x, q, z) * 6.28, dd = r + 1.5 + hash3(z, q, x) * 2, px = Math.round(x + Math.cos(a) * dd), pz = Math.round(z + Math.sin(a) * dd);
          if (MH.g(w, px, pz) === F && !w.get(px, F + 1, pz) && w.liq[px + W * pz] < 0) { w.set(px, F + 1, pz, q ? B.rockL : B.rockDk); if (q === 1) w.set(px + 1, F + 1, pz, B.rockL); }
        }
      }
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
