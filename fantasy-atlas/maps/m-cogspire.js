// 태엽 공방가 — 두 단의 공방 거리, 대시계탑, 톱니 옹벽, 룬 동력로, 골렘 공방, 동쪽 태엽 정거장과 별시계 관측소
// 2배 해상도(352칸, 1칸 ≈ 25cm), playerScale 2: 낱돌 굽도리와 벽돌 띠·벽기둥이 있는 옹벽과 난간 동자, 테·바퀴살·볼트가 있는 톱니,
// 첨두 쌍창·버팀벽·눈금과 숫자 표지가 있는 시계판·트인 종루·모서리 첨탑이 있는 대시계탑, 창틀·창살·창턱·덧문·꽃상자가 있는 벽돌 집,
// 겹친 슬레이트 지붕과 처마·용마루·물받이, 벽돌 굴뚝, 리벳 줄 판갑의 골렘, 바퀴·피스톤·굴뚝이 있는 기관차, 테 두른 통과 상자, 가지와 잎뭉치 나무.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 352, D = 352, Hh = 280;
  const P = v => 2 * Math.round(v * 1.2);   // 옛 128칸 배치 → 176칸 배치 → 2배
  // 톱니바퀴(2배용): 테·톱니·바퀴살·허브와 볼트. plane 'xz' | 'xy' | 'yz'
  function gear(p, cx, cy, cz, r, plane, b, hub, thick, bolt) {
    const put = (u, v, blk) => { for (let t = 0; t < (thick || 1); t++) { if (plane === 'xz') p.set(cx + u, cy + t, cz + v, blk); else if (plane === 'xy') p.set(cx + u, cy + v, cz + t, blk); else p.set(cx + t, cy + u, cz + v, blk); } };
    const R = Math.ceil(r + 3), teeth = Math.max(8, Math.round(r * 1.25)), spokes = r > 7 ? 6 : 4;
    for (let v = -R; v <= R; v++) for (let u = -R; u <= R; u++) {
      const d = Math.hypot(u, v), a = Math.atan2(v, u);
      let blk = 0;
      if (d <= r + 2.2 && d > r && Math.cos(a * teeth) > 0.15) blk = b;
      else if (d <= r && d > r - 2.2) blk = b;
      else if (d <= r - 2.2 && d > r - 3) blk = hub;
      else if (d <= r && Math.abs(Math.sin(a * spokes / 2)) * d < 1.1) blk = b;
      if (d < 2.6) blk = hub; if (d < 1.2) blk = bolt || b;
      if (blk) put(u, v, blk);
    }
  }
  // 두께 있는 고리 부품(혼천의·동력로)
  function ringT(p, cx, cy, cz, r, plane, b, mark, marks) {
    const n = Math.ceil(r * 10);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, blk = mark && i % Math.ceil(n / (marks || 6)) < 3 ? mark : b;
      for (const rr of [r - 0.5, r + 0.5]) {
        const u = Math.round(Math.cos(a) * rr), v = Math.round(Math.sin(a) * rr);
        for (let t = 0; t < 2; t++) {
          if (plane === 'xz') p.set(cx + u, cy + t, cz + v, blk);
          else if (plane === 'xy') p.set(cx + u, cy + v, cz + t, blk);
          else p.set(cx + t, cy + u, cz + v, blk);
        }
      }
    }
  }
  MAPS.push({
    id: 'cogspire', cat: 'magic', name: '태엽 공방가', en: 'Cogspire Works', color: '#d8a050', seed: 341, base: 44, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '룬 동력으로 톱니가 도는 기술자들의 거리. 대시계탑의 바늘은 아르카나의 시간을 정한다. 동쪽 끝 태엽 정거장에서는 증기 기관차가 화물을 싣고 오가고, 윗단 별시계 관측소의 혼천의는 별의 시간을 잰다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '룬 기술자 길드'], ['명물', '정각마다 울리는 대시계 · 태엽 기관차'], ['새 구역', '동쪽 태엽 정거장 · 별시계 관측소'], ['주의', '푸른 룬선과 철로는 밟지 말 것']] },
    sky: ['#f0c890', '#6a5a80', '#ffd8a0'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.56], sun: ['#ffd8b0', 0.76, [0.5, 1, 0.45]],
    liquid: ['#0a3a4a', '#1a8aa0', '#a0ffff'], liqSpeed: 1, liqGlow: true,
    fog: { start: 0.84, floor: 24, depth: 20, haze: [48, 0.07, 10], hazeColor: '#d8a878' },
    camY: 0, zoom: 1.1,
    particles: [{ n: 140, colors: ['#ffb040', '#ffe0a0'], mode: 'drift', speed: 1, y0: 52, y1: 180 }],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, grass: { c: '#4a3a30', top: '#6a7a4a', v: 0.1 },
      dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' }, found: { c: '#6a6264', v: 0.05, pat: 'stone' }, curb: { c: '#8a8070', v: 0.04 },
      st1: { c: '#6e6668', v: 0.05 }, st2: { c: '#625a5c', v: 0.05 }, st3: { c: '#78706a', v: 0.05 }, st4: { c: '#6a6870', v: 0.05 }, mortar: { c: '#4a4442', v: 0.03 },
      brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' }, brick2: { c: '#7a4232', v: 0.05, pat: 'brick' },
      slate: { c: '#3a3a4a', v: 0.04, pat: 'tile' }, slateR: { c: '#4a3a3a', v: 0.04, pat: 'tile' },
      tile: { c: '#3e4050', v: 0.04 }, tile2: { c: '#33353f', v: 0.03 }, tile3: { c: '#4a4c5c', v: 0.04 }, tileDk: { c: '#2a2a34', v: 0.03 },
      tileR: { c: '#5a3c3a', v: 0.04 }, tileR2: { c: '#4a302e', v: 0.03 }, tileR3: { c: '#684644', v: 0.04 }, tileRDk: { c: '#3a2624', v: 0.03 },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, brassLt: { c: '#e0b860', v: 0.05 }, copper: { c: '#b0683a', v: 0.07 }, verd: { c: '#5a9a88', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      face: { c: '#f0e8d0', v: 0.02 }, hand: { c: '#1e1e24', v: 0 }, golem: { c: '#7a7068', v: 0.06, pat: 'big' }, golemDk: { c: '#5a524c', v: 0.05 }, rivet: { c: '#a89a88', v: 0.03 },
      door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, doorDk: { c: '#1e1410', v: 0.03 }, bell: { c: '#d8b050', v: 0.05 }, bellDk: { c: '#a8842e', v: 0.05 },
      frame: { c: '#5a4434', v: 0.05 }, frameDk: { c: '#3e2e22', v: 0.04 }, mullion: { c: '#d8ccb0', v: 0.02 }, sill: { c: '#9a948a', v: 0.04 }, hinge: { c: '#2e2e34', v: 0.02 }, gutter: { c: '#6a6e72', v: 0.03 },
      shutter: { c: '#2a5a4a', v: 0.02 }, shutterDk: { c: '#204a3c', v: 0.02 }, shutter2: { c: '#8a2a24', v: 0.02 }, shutter2Dk: { c: '#70221c', v: 0.02 },
      win: { c: '#ffd890', night: true, day: '#8a9aa8' }, lamp: { c: '#ffe0a0', night: true, day: '#c8b890' },
      rune: { c: '#5affff', glow: true }, runeO: { c: '#ffb040', glow: true }, eye: { c: '#5affff', glow: true },
      hot: { c: '#ff6a20', glow: true }, note: { c: '#ff8ad0', glow: true }, canvas: { c: '#d8c8a0', v: 0.05 }, canvasDk: { c: '#a89870', v: 0.05 }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, wood: { c: '#5a4028', v: 0.05 },
      crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, crateEdge: { c: '#6a4e30', v: 0.04 }, sack: { c: '#c8b48a', v: 0.06 }, sack2: { c: '#b8a47a', v: 0.06 }, rope: { c: '#a8906a', v: 0.04 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 }, coal: { c: '#222226', v: 0.08 }, pot: { c: '#9a5a3a', v: 0.04 }, soil: { c: '#4a3424', top: '#5a3e28', v: 0.08 },
      leaf: { c: '#4a7a3a', v: 0.1 }, leafL: { c: '#6a9a48', v: 0.1 }, leafDk: { c: '#3a5e2e', v: 0.08 }, leafLt: { c: '#8aae58', v: 0.08 }, bark: { c: '#5a3e28', v: 0.06 }, barkDk: { c: '#463020', v: 0.05 },
      flower: { c: '#d85a4a', v: 0.05 }, flower2: { c: '#f0d060', v: 0.05 }, flower3: { c: '#f0ece0', v: 0.03 }, flowerLf: { c: '#4e7e3a', v: 0.08 },
      rail: { c: '#7a7a84', v: 0.03 }, tie: { c: '#4a3424', v: 0.05, pat: 'plank' }, gravel: { c: '#5a5452', top: '#7a726a', v: 0.12 }, paint: { c: '#2a5a4a', v: 0.04 }, paintR: { c: '#8a2a24', v: 0.04 },
    },
    build(w) {
      const B = w.id, base = w.base, UP = base + 20, LO = base + 4, EDGE = 144;
      const TRX = 316;                         // 철로 중심(동쪽 정거장)
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      MH.terrain(w, {
        floor: 8, height: (x, z) => z < EDGE ? UP : LO,
        surface: (x, z) => {
          if (x >= TRX - 8 && x <= TRX + 9 && z >= EDGE) return B.gravel;
          if ((x % 44 < 2 || z % 44 < 2)) return B.curb;
          return ((x >> 4) + (z >> 4)) % 2 ? B.cob : B.plate;
        },
        under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock,
      });
      const lights = [], acts = [], steam = [], landmarks = [];
      const STN = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STN[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const FLW = [B.flower, B.flower2, B.flower3];

      // ───────── 작은 물건(2배) ─────────
      const crate = (T, x, y, z, s) => { s = s || 4; for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) { const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1); T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate); } };
      const barrel = (T, x, y, z, ht, top) => {
        ht = ht || 7;
        for (let r = 0; r < ht; r++) {
          const mid = r >= 2 && r <= ht - 3, rr = mid ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            let b;
            if (r === ht - 1) b = outer ? B.cask : (top || B.caskTop);
            else if ((r === 1 || r === ht - 2) && outer) b = B.iron;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            T.set(x + dx, y + r, z + dz, b);
          }
        }
      };
      const tank = (T, x, y, z) => {   // 구리 통(놋쇠 테)
        for (let r = 0; r < 6; r++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d2 = dx * dx + dz * dz; if (d2 > 4.8) continue; const out = d2 > 1.5; T.set(x + dx, y + r, z + dz, r === 5 ? (out ? B.brassDk : B.brass) : ((r === 1 || r === 4) && out ? B.brassDk : B.copper)); }
      };
      const sack = (T, x, y, z) => {
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) { const c = dx !== 1 && dz !== 1; if (!c) T.set(x + dx, y, z + dz, B.sack); T.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sack : B.sack2); if (!c) T.set(x + dx, y + 2, z + dz, B.sack); }
        T.set(x + 1, y + 3, z + 1, B.rope); T.set(x + 1, y + 4, z + 1, B.sack2);
      };
      const free = (x0, y0, z0, x1, y1, z1) => { for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) if (w.get(x, y, z)) return false; return true; };
      const clutter = (x, z, k) => {
        const y = g(x, z) + 1;
        if (!free(x - 3, y, z - 3, x + 3, y + 7, z + 3)) return;
        const t = k % 3;
        if (t === 0) { crate(w, x - 2, y, z - 2, 4); if (k % 4 === 0) crate(w, x - 1, y + 4, z - 1, 3); }
        else if (t === 1) barrel(w, x, y, z, 7);
        else { sack(w, x - 2, y, z - 2); if (k % 2) sack(w, x, y, z); }
      };
      const planter = (x, z, y, len, ax) => {   // 2칸 폭 화단: 널 테, 흙, 잎과 낱낱의 꽃
        for (let k = -1; k <= len * 2; k++) for (let q = -1; q <= 2; q++) {
          const px = ax ? x + k : x + q, pz = ax ? z + q : z + k, edge = k === -1 || k === len * 2 || q === -1 || q === 2;
          if (w.get(px, y, pz)) continue;
          S(px, y, pz, edge ? B.plank : B.soil);
          if (edge) S(px, y + 1, pz, B.plank);
          else { const hh = hash3(px, y, pz); S(px, y + 1, pz, B.flowerLf); if (hh > 0.45) S(px, y + 2, pz, hh > 0.8 ? FLW[(hh * 31 | 0) % 3] : B.leafL); }
        }
      };
      const bench = (x, z, y, alongX) => {   // 앉는 판 7칸, 쇠 다리, 등받이 살
        for (let a = 0; a < 7; a++) for (let b2 = 0; b2 < 3; b2++) {
          const [px, pz] = alongX ? [x + a, z + b2] : [x + b2, z + a];
          S(px, y + 1, pz, B.plank);
          if ((a === 0 || a === 6) && b2 !== 1) S(px, y, pz, B.iron);
          if (b2 === 2) { if (a === 0 || a === 6 || a === 3) w.box(px, y + 2, pz, px, y + 4, pz, B.iron); else { S(px, y + 3, pz, B.plank); S(px, y + 4, pz, B.brassDk); } }
        }
      };
      const lampPost = (x, z, h) => {   // 돌 받침, 쇠기둥과 고리, 유리 등롱(모서리 쇠살), 갓과 꼭지
        h = h || 10;
        const y = g(x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.found);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { S(x + dx, y + 2, z + dz, B.brassDk); S(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) S(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.brassDk); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.brass); S(x, ly + 6, z, B.brassLt);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      const clump = (cx, cy, cz, r, L) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.95 && d > 0.45) b = B.leafLt;
          if (!w.get(x, y, z)) S(x, y, z, b);
        }
      };
      const tree = (x, y, z, h, r) => {   // 밑동이 넓어지는 줄기, 뿌리, 가지, 가지 끝 잎뭉치
        const R0 = 1.5, L = [B.leafL, B.leaf, B.leafDk];
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.45 : 0));
          cylT(w, x, z, y + i, y + i, rr, hash3(x, i >> 2, z) > 0.6 && i % 3 === 0 ? B.barkDk : B.bark);
        }
        for (let k = 0; k < 4; k++) { const a = k * 1.57 + hash3(x, k, z) * 0.8; w.line(x, y + 1, z, x + Math.cos(a) * 3.5, y, z + Math.sin(a) * 3.5, B.barkDk); }
        const ends = [[x, y + h + 1, z, 1.1]];
        for (let i = 0; i < 4; i++) {
          const a = i * 1.57 + hash3(i, x, z) * 0.8, sy = y + Math.floor(h * 0.6), l = r * 0.9;
          const ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * 0.55;
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, 0.85]);
        }
        ends.forEach(([ex, ey, ez, k], i) => { const rc = r * 0.62 * k; clump(ex, ey + 1, ez, rc, L); const a = hash3(i, 3, x + z) * 6.28; clump(ex + Math.cos(a) * rc * 0.7, ey + 1, ez + Math.sin(a) * rc * 0.7, rc * 0.6, L); });
      };
      // 노점(2배): 쇠기둥, 널 진열대와 앞판, 물건, 상자, 줄무늬 차양과 물결 테두리
      const stall = (x, z, a1, a2) => {
        const sx = 12, sz = 10, y = MH.maxG(w, x, z, x + sx - 1, z + sz - 1) + 1;
        for (const [px, pz] of [[x, z], [x + sx - 1, z], [x, z + sz - 1], [x + sx - 1, z + sz - 1]]) w.box(px, y, pz, px, y + 9, pz, B.iron);
        w.box(x + 1, y, z + sz - 2, x + sx - 2, y + 3, z + sz - 1, B.plank); w.box(x + 1, y + 3, z + sz - 2, x + sx - 2, y + 3, z + sz - 1, B.wood);
        const goods = [B.brass, B.copper, B.verd, B.runeO, B.brassDk];
        for (let dx = 1; dx < sx - 1; dx++) { const hh = hash3(x + dx, y, z); if (hh > 0.3) S(x + dx, y + 4, z + sz - 1 - (dx & 1), goods[(hh * 50 | 0) % 5]); if (hh > 0.75) S(x + dx, y + 5, z + sz - 2, goods[(dx * 3) % 5]); }
        crate(w, x + 1, y, z + 1, 3); crate(w, x + 4, y, z + 1, 3); tank(w, x + sx - 3, y, z + 3);
        for (let dz = -2; dz <= sz + 1; dz++) for (let dx = -1; dx <= sx; dx++) {
          const yy = y + 11 + (dz < 2 ? 1 : 0) - (dz > sz - 1 ? 1 : 0);
          S(x + dx, yy, z + dz, ((dx + 4) >> 1) & 1 ? a1 : a2);
          if (dz === sz + 1 && (((dx + 4) >> 1) & 1)) { S(x + dx, yy - 1, z + dz, a1); if (dx & 1) S(x + dx, yy - 2, z + dz, a1); }
        }
        return y + 12;
      };

      // ───────── 집(2배): 벽돌 벽, 반목조 층띠, 창(창살·덧문·꽃상자), 판자문과 계단, 슬레이트 지붕 ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); S(p[0], y, p[1], b); };
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, B.frame); put(sd, wu + 5, wy + r, 1, B.frame); }
        for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh, 1, B.brassDk);
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy - 1, 1, B.sill); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.sill); }
        if (o.shutter && wu - 3 > sd.u0 + 1 && wu + 7 < sd.u1 - 1) {
          for (const c0 of [-3, 6]) for (let c = 0; c < 2; c++) for (let r = 0; r < wh; r++) {
            put(sd, wu + c0 + c, wy + r, 1, r % 2 ? o.shutter : o.shutterDk);
            if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
          }
        }
        if (o.box) {
          for (let c = -1; c <= 5; c++) { put(sd, wu + c, wy - 2, 2, B.plank); put(sd, wu + c, wy - 2, 3, B.plank); }
          for (let c = -1; c <= 5; c++) { const hh = hash3(wu + c, wy, sd.k.charCodeAt(0)); put(sd, wu + c, wy - 1, 3, hh > 0.35 ? B.flowerLf : FLW[(hh * 40 | 0) % 3]); if ((c & 1) === 0) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7) % 3]); }
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
        for (let r = 0; r <= 9; r++) { put(sd, u0 - 1, yb + r, 1, B.brass); put(sd, u0 + 5, yb + r, 1, B.brass); }
        for (let c = -2; c <= 6; c++) put(sd, u0 + c, yb + 9, 1, B.brassDk);
        put(sd, u0 + 2, yb + 10, 1, B.runeO);
        let lamp = null;
        if (o.steps) for (let c = -2; c <= 6; c++) for (let d = 2; d <= 5; d++) {
          const top = d <= 3 ? yb - 1 : yb - 2, p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
          for (let y = Math.min(gg, top); y <= top; y++) S(p[0], y, p[1], y === top ? (d === 2 || d === 4 ? B.sill : B.found) : B.st2);
          for (let y = top + 1; y <= yb + 9; y++) S(p[0], y, p[1], 0);
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
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = 3, og = 2, pal = o.pal;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const PP = (a, l, y, b) => alongX ? S(l, y, a, b) : S(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            const seam = ((l + (s & 1) * 2) & 3) === 0;
            const b = s === 0 ? pal[3] : seam ? pal[1] : (hash3(l >> 2, s, 5) > 0.72 ? pal[2] : pal[0]);
            PP(a, l, ry, b); PP(a, l, ry - 1, pal[3]);
            if (s === sMax) { PP(a, l, ry + 1, B.copper); }
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) PP(a, l, y, o.gable);
            if (s >= 1 && (l === l0 || l === l1)) PP(a, l, ry - 2, B.frame);
          }
        }
        const mid = (A0 + A1) / 2, midA = Math.floor(mid);
        for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
          for (let a = A0; a <= A1; a++) PP(a, out, top, B.brassDk);
          const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35));
          const odd = (A1 - A0) % 2 === 0;
          for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { PP(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); PP(midA + c, out, gy + r, 0); }
          for (let c = -2; c <= (odd ? 2 : 3); c++) { PP(midA + c, out, gy - 1, B.sill); PP(midA + c, out, gy + 3, B.frame); }
        }
        for (const [ae] of [[a0 - 1], [a1 + 1]]) for (let l = l0; l <= l1; l++) PP(ae, l, y0 - 1, B.gutter);
        return y0 + sMax + 2;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) S(cx + dx, y, cz + dz, hash3(cx + dx, y, cz + dz) > 0.75 ? B.brick2 : B.brickDk);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) S(cx + dx, y, cz + dz, B.brickDk);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.iron);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) w.box(px, yt + 1, pz, px, yt + 3, pz, B.copper);
        return [cx + 2, yt + 4, cz + 2];
      };
      // o: x,z,sx,sz,floors,fh,face,y,wall,shutter(1|2),pal,chimney,balcony,box,stone
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y;
        const wall = o.wall || B.brick, sh = o.shutter === 2 ? [B.shutter2, B.shutter2Dk] : [B.shutter, B.shutterDk];
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { S(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { S(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            S(x, y, z, stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0));
          }
        }
        let yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const SD = SIDES(x0, z0, x1, z1);
          const stone = f < (o.stone || 0);
          w.box(x0, yb, z0, x1, yb + fh - 1, z1, wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = SD[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0, isBal = k === face && o.balcony === f && f > 0;
            const nW = Math.max(1, Math.floor((L + 2) / 11)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if ((isDoor || isBal) && Math.abs(c - cu) < 10) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            if (stone) {
              for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
                const corner = u <= sd.u0 + 1 || u >= sd.u1 - 1;
                put(sd, u, y, 0, corner && ((y >> 1) & 1) ? B.sill : (stoneAt(u, y, 5) || B.mortar));
              }
            } else {
              // 벽돌 벽: 모서리 귀돌(엇갈림), 층띠(놋쇠·쇠), 창 위 벽돌 인방
              for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0, sd.u0 + 1, sd.u1 - 1, sd.u1]) { const alt = ((y - yb) >> 1) & 1; if (alt || u === sd.u0 || u === sd.u1) put(sd, u, y, 1, B.found); }
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb + fh - 1, 1, B.brassDk); if (f === 0) put(sd, u, yb, 1, B.found); }
              for (const wu of wins) for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh + 1, 1, B.brickDk);
            }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: stone ? null : sh[0], shutterDk: sh[1], box: o.box && !stone ? 1 : 0 });
            if (isDoor) { const r = doorAt(sd, cu, yb, { steps: true, lantern: true }); out.door = r.door; out.lamp = r.lamp; out.side = sd; }
            if (isBal) {
              doorAt(sd, cu, yb, {});
              for (let u = cu - 6; u <= cu + 6; u++) for (let d = 1; d <= 5; d++) { put(sd, u, yb - 1, d, B.plank); if (u % 3 === 0) put(sd, u, yb - 2, d, B.ironDk); }
              for (let u = cu - 6; u <= cu + 6; u++) { put(sd, u, yb + 3, 5, B.brass); if (u % 2 === 0 || Math.abs(u - cu) === 6) for (let y = yb; y <= yb + 2; y++) put(sd, u, y, 5, B.iron); }
              for (let d = 1; d <= 5; d++) for (const u of [cu - 6, cu + 6]) { put(sd, u, yb + 3, d, B.brass); if (d % 2) for (let y = yb; y <= yb + 2; y++) put(sd, u, y, d, B.iron); }
              for (const u of [cu - 5, cu - 4, cu + 4, cu + 5]) { put(sd, u, yb, 4, B.plank); put(sd, u, yb + 1, 4, B.flowerLf); put(sd, u, yb + 2, 4, FLW[(u + 5) % 3]); }
            }
          }
          yb += fh;
        }
        const top = yb, axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        const pal = o.pal || [B.tile, B.tile2, B.tile3, B.tileDk];
        out.peak = roof(x0, x1, z0, z1, top, { axis, gable: wall, pal });
        out.top = top;
        if (o.chimney !== false) {
          const cx = axis === 'x' ? x0 + 3 : Math.floor((x0 + x1) / 2) - 1, cz = axis === 'x' ? Math.floor((z0 + z1) / 2) - 1 : z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };

      // ══════════ 옹벽: 낱돌 굽도리, 벽돌 벽·띠, 벽기둥, 윗단 난간(동자·손잡이), 구리 배관 ══════════
      const stairX = [P(20), P(100)];
      const LX0 = 268, LX1 = 277;                                  // 화물 승강기 자리(난간·배관을 비운다)
      const onStair = x => stairX.some(sx => x >= sx - 2 && x <= sx + 17);
      const onLift = x => x >= LX0 - 1 && x <= LX1 + 1;
      for (let x = 0; x < W; x++) {
        for (let y = LO + 1; y <= UP; y++) for (const z of [EDGE - 2, EDGE - 1]) {
          let b = y <= LO + 3 ? (stoneAt(x, y, 7) || B.mortar) : ((y === UP - 9 || y === UP - 8) ? B.brick : B.brickDk);
          if (y === UP) b = B.found;
          S(x, y, z, b);
        }
        if (!onLift(x)) S(x, UP, EDGE, B.curb);
        if (!onStair(x) && !onLift(x)) {
          S(x, UP + 1, EDGE - 1, B.iron); S(x, UP + 5, EDGE - 1, B.brass);
          if (x % 8 === 0) { w.box(x, UP + 2, EDGE - 1, x, UP + 4, EDGE - 1, B.iron); S(x, UP + 6, EDGE - 1, B.brassLt); }
          else if (x % 2 === 0) w.box(x, UP + 2, EDGE - 1, x, UP + 4, EDGE - 1, B.ironDk);
        }
        if (x % 12 < 2 && !onLift(x)) { w.box(x, LO + 1, EDGE, x, UP - 1, EDGE + 1, B.found); S(x, UP, EDGE + 1, B.curb); S(x, LO + 8, EDGE + 1, B.brassDk); }
        if (!onStair(x) && !onLift(x) && (x < 96 || x > 248)) {
          for (const y of [UP - 6, UP - 5]) S(x, y, EDGE, B.copper);
          if (x % 24 === 6 || x % 24 === 7) { for (const y of [UP - 7, UP - 4]) S(x, y, EDGE, B.brass); S(x, UP - 6, EDGE + 1, B.brassDk); S(x, UP - 5, EDGE + 1, B.brassDk); }
        }
      }
      for (const sx of stairX) {
        for (let s = 0; s < UP - LO; s++) {
          w.box(sx, UP - s, EDGE + s, sx + 15, UP - s, EDGE + s, s % 2 ? B.found : B.curb); MH.footing(w, sx, EDGE + s, sx + 15, EDGE + s, UP - s, B.brickDk);
          for (const x of [sx - 2, sx - 1, sx + 16, sx + 17]) { MH.footing(w, x, EDGE + s, x, EDGE + s, UP - s + 2, B.brickDk); S(x, UP - s + 2, EDGE + s, B.found); }
          for (const x of [sx - 1, sx + 16]) { if (s % 3 === 0) w.box(x, UP - s + 3, EDGE + s, x, UP - s + 5, EDGE + s, B.iron); S(x, UP - s + 6, EDGE + s, B.brass); }
        }
        w.box(sx, UP + 1, EDGE - 2, sx + 15, UP + 6, EDGE - 1, 0);
        for (const x of [sx - 2, sx + 16]) { w.box(x, UP + 1, EDGE - 2, x + 1, UP + 8, EDGE - 1, B.brass); w.box(x, UP + 9, EDGE - 2, x + 1, UP + 10, EDGE - 1, B.lamp); w.box(x, UP + 11, EDGE - 2, x + 1, UP + 11, EDGE - 1, B.brassDk); }
      }

      // ══════════ 대시계탑 ══════════
      const TS = 28, TC = 14, TX0 = P(64) - TC, TZ0 = P(34) - TC, ty = UP + 1, TH = 108;
      const TX1 = TX0 + TS, TZ1 = TZ0 + TS;
      // 받침단: 낱돌 두 단, 갓돌, 둘레 낮은 담
      for (let z = TZ0 - 6; z <= TZ1 + 6; z++) for (let x = TX0 - 6; x <= TX1 + 6; x++) {
        const r6 = Math.max(Math.abs(x - TX0 - TC), Math.abs(z - TZ0 - TC));
        for (let y = ty; y <= ty + 2; y++) S(x, y, z, r6 >= TC + 5 ? (y === ty + 2 ? B.curb : (stoneAt(x + z, y, 2) || B.mortar)) : B.found);
        if (r6 === TC + 6) S(x, ty + 3, z, (x + z) % 4 ? B.curb : B.brassDk);
        if (r6 <= TC + 2) for (let y = ty + 3; y <= ty + 8; y++) S(x, y, z, r6 === TC + 2 ? (y === ty + 8 ? B.curb : (stoneAt(x + z, y, 4) || B.mortar)) : B.found);
      }
      // 탑몸: 벽돌, 3단마다 brickDk 띠
      for (let y = ty + 9; y <= ty + TH; y++) w.walls(TX0, y, TZ0, TX1, y, TZ1, (y - ty) % 14 === 0 ? B.brickDk : B.brick);
      w.box(TX0 + 1, ty + TH, TZ0 + 1, TX1 - 1, ty + TH, TZ1 - 1, B.found);
      // 모서리 놋쇠 기둥과 버팀벽(세 단으로 물러난다)
      for (const [cx, cz] of [[TX0, TZ0], [TX1 - 1, TZ0], [TX0, TZ1 - 1], [TX1 - 1, TZ1 - 1]]) {
        w.box(cx, ty + 9, cz, cx + 1, ty + TH + 4, cz + 1, B.brass);
        const sx = cx === TX0 ? -1 : 1, sz = cz === TZ0 ? -1 : 1;
        for (let k = 0; k < 3; k++) {
          const top = ty + 10 + (3 - k) * 8, ox = cx + (sx < 0 ? -2 : 2), oz = cz + (sz < 0 ? -2 : 2);
          w.box(ox, ty + 9, oz, ox + 1, top, oz + 1, k ? B.brickDk : B.found);
          w.box(cx + (sx < 0 ? -2 : 2), ty + 9, cz, cx + (sx < 0 ? -1 : 3), ty + 9 + (3 - k) * 6, cz + 1, B.brickDk);
          w.box(cx, ty + 9, cz + (sz < 0 ? -2 : 2), cx + 1, ty + 9 + (3 - k) * 6, cz + (sz < 0 ? -1 : 3), B.brickDk);
          S(ox, top + 1, oz, B.curb); S(ox + 1, top + 1, oz + 1, B.curb); S(ox + 1, top + 1, oz, B.curb); S(ox, top + 1, oz + 1, B.curb);
        }
      }
      // 층띠: 놋쇠 + 내민 돌
      for (const y of [ty + 36, ty + 64, ty + 88]) { w.walls(TX0 - 1, y, TZ0 - 1, TX1 + 1, y, TZ1 + 1, B.brassDk); w.walls(TX0 - 1, y + 1, TZ0 - 1, TX1 + 1, y + 1, TZ1 + 1, B.found); w.walls(TX0 - 2, y + 2, TZ0 - 2, TX1 + 2, y + 2, TZ1 + 2, B.curb); }
      // 첨두 쌍창: 놋쇠 살대, 가로살, 창턱, 첨두 머리(놋쇠 테)
      const twin = (face, u, y) => {
        const P2 = (uu, yy, d, b) => { if (face === 's') S(uu, yy, TZ1 + d, b); else if (face === 'n') S(uu, yy, TZ0 - d, b); else if (face === 'w') S(TX0 - d, yy, uu, b); else S(TX1 + d, yy, uu, b); };
        for (let r = 0; r < 9; r++) for (let c = -2; c <= 2; c++) {
          if (r >= 7 && Math.abs(c) > 8 - r) continue;
          P2(u + c, y + r, 0, c === 0 || r === 4 ? B.brassDk : B.win);
        }
        for (let r = -1; r <= 7; r++) { P2(u - 3, y + r, 1, B.brass); P2(u + 3, y + r, 1, B.brass); }
        P2(u - 2, y + 8, 1, B.brass); P2(u + 2, y + 8, 1, B.brass); P2(u - 1, y + 9, 1, B.brass); P2(u + 1, y + 9, 1, B.brass); P2(u, y + 10, 1, B.brassLt);
        for (let c = -4; c <= 4; c++) P2(u + c, y - 1, 1, B.sill);
      };
      for (const oy of [14, 24, 42, 52, 70]) for (const o of [6, 22]) for (const f of ['s', 'n', 'e', 'w']) {
        if (f === 's' && oy === 14 && Math.abs(o - TC) < 10) continue;
        twin(f, (f === 's' || f === 'n' ? TX0 : TZ0) + o, ty + oy);
      }
      // 정문: 판자 문짝 두 짝(테두리 살·움푹한 판·쇠 경첩), 놋쇠 문설주·아치 인방, 룬 문장, 앞 층계참과 계단
      const FCX = TX0 + TC, FZ = TZ1 + 1, DY0 = ty + 9;
      for (let r = 0; r < 12; r++) for (let c = -3; c <= 3; c++) {
        const stile = Math.abs(c) === 3 || c === 0 || r === 0 || r === 5 || r === 11;
        S(FCX + c, DY0 + r, TZ1, stile ? B.doorDk : B.door); S(FCX + c, DY0 + r, TZ1 - 1, B.door);
        if (!stile) S(FCX + c, DY0 + r, TZ1, 0);
        if ((r === 2 || r === 9) && Math.abs(c) >= 2) S(FCX + c, DY0 + r, TZ1 + 1, B.hinge);
      }
      S(FCX - 1, DY0 + 6, TZ1 + 1, B.brass); S(FCX + 1, DY0 + 6, TZ1 + 1, B.brass);
      for (const x of [FCX - 5, FCX - 4, FCX + 4, FCX + 5]) w.box(x, DY0, TZ1 + 1, x, DY0 + 12, TZ1 + 2, B.brassDk);
      for (let c = -5; c <= 5; c++) { const ah = Math.round(Math.sqrt(Math.max(0, 30 - c * c)) * 0.6); w.box(FCX + c, DY0 + 12, TZ1 + 1, FCX + c, DY0 + 13 + ah, TZ1 + 1, B.brass); }
      w.box(FCX - 1, DY0 + 14, TZ1 + 2, FCX + 1, DY0 + 16, TZ1 + 2, B.runeO);
      for (let z = TZ1 + 1; z <= TZ1 + 6; z++) for (let x = FCX - 8; x <= FCX + 8; x++) for (let y = ty; y <= ty + 8; y++) S(x, y, z, y === ty + 8 ? (z === TZ1 + 6 ? B.curb : B.found) : B.found);
      for (let s = 0; s < 8; s++) { const z = TZ1 + 7 + s, y = ty + 7 - s; w.box(FCX - 8 - s, ty - 2, z, FCX + 8 + s, y, z, B.found); w.box(FCX - 8 - s, y, z, FCX + 8 + s, y, z, s % 2 ? B.curb : B.found); }
      for (const dx of [-11, 11]) { const lx = FCX + dx; w.box(lx, ty + 9, TZ1 + 3, lx, ty + 15, TZ1 + 3, B.iron); S(lx, ty + 16, TZ1 + 3, B.lamp); S(lx, ty + 17, TZ1 + 3, B.lamp); S(lx, ty + 18, TZ1 + 3, B.brassDk); }
      lights.push({ p: [FCX - 10.5, ty + 16.5, TZ1 + 3.5], c: '#ffd890', i: 1.2, d: 36, flicker: 0.05, night: true });
      // 시계판 넷: 놋쇠 테, 시 눈금(굵게)·분 눈금, 12·3·6·9 자리 놋쇠 표지, 가운데 축
      const FCY = ty + 96;
      const faceAt = (plane, fixed, sg) => {
        for (let v = -13; v <= 13; v++) for (let u = -13; u <= 13; u++) {
          const d = Math.hypot(u, v); if (d > 12.8) continue;
          const a = Math.atan2(v, u), hr = Math.abs(Math.sin(a * 6)) < 0.14, mn = Math.abs(Math.sin(a * 30)) < 0.18;
          const quad = d > 7.6 && d <= 10.6 && (Math.abs(u) < 0.6 || Math.abs(v) < 0.6);
          const b = d > 11.4 ? B.brass : d > 10.8 ? B.brassDk : quad ? B.brassDk : (d > 8.6 && hr) || (d > 9.8 && mn) ? B.hand : d < 1.6 ? B.brassDk : B.face;
          if (plane === 'z') { S(FCX + u, FCY + v, fixed, b); S(FCX + u, FCY + v, fixed - sg, b); } else { S(fixed, FCY + v, TZ0 + TC + u, b); S(fixed - sg, FCY + v, TZ0 + TC + u, b); }
        }
      };
      faceAt('z', FZ, 1); faceAt('z', TZ0 - 1, -1); faceAt('x', TX0 - 1, -1); faceAt('x', TX1 + 1, 1);
      // 남쪽 말고 세 면의 바늘(고정)
      w.box(FCX, FCY, TZ0 - 2, FCX, FCY + 9, TZ0 - 2, B.hand); w.box(FCX, FCY, TZ0 - 2, FCX + 6, FCY, TZ0 - 2, B.hand);
      w.box(TX0 - 2, FCY, TZ0 + TC, TX0 - 2, FCY, TZ0 + TC + 9, B.hand); w.box(TX0 - 2, FCY - 6, TZ0 + TC, TX0 - 2, FCY, TZ0 + TC, B.hand);
      w.box(TX1 + 2, FCY - 6, TZ0 + TC, TX1 + 2, FCY, TZ0 + TC, B.hand); w.box(TX1 + 2, FCY, TZ0 + TC - 9, TX1 + 2, FCY, TZ0 + TC, B.hand);
      const hMin = w.prop({ name: 'hMin', pivot: [FCX + 0.5, FCY + 0.5, FZ + 1.5], axis: 'z', speed: -0.4 });
      hMin.box(FCX, FCY, FZ + 1, FCX, FCY + 10, FZ + 1, B.hand); hMin.set(FCX - 1, FCY + 9, FZ + 1, B.hand); hMin.set(FCX + 1, FCY + 9, FZ + 1, B.hand); hMin.set(FCX, FCY - 2, FZ + 1, B.hand); hMin.set(FCX, FCY - 1, FZ + 1, B.hand);
      const hHour = w.prop({ name: 'hHour', pivot: [FCX + 0.5, FCY + 0.5, FZ + 2.5], axis: 'z', speed: -0.034 });
      hHour.box(FCX, FCY, FZ + 2, FCX + 6, FCY, FZ + 2, B.brassDk); hHour.box(FCX + 5, FCY - 1, FZ + 2, FCX + 5, FCY + 1, FZ + 2, B.brassDk); hHour.set(FCX, FCY, FZ + 3, B.brass);
      // 종루: 마루, 트인 아치(놋쇠 기둥), 난간, 들보와 종(부품)
      const by = ty + TH;
      w.box(TX0 - 3, by + 1, TZ0 - 3, TX1 + 3, by + 2, TZ1 + 3, B.brassDk); w.box(TX0 - 3, by + 1, TZ0 - 3, TX1 + 3, by + 1, TZ1 + 3, B.found);
      for (let x = TX0 - 3; x <= TX1 + 3; x++) for (let z = TZ0 - 3; z <= TZ1 + 3; z++) if (x === TX0 - 3 || x === TX1 + 3 || z === TZ0 - 3 || z === TZ1 + 3) { S(x, by + 6, z, B.brass); if ((x + z) % 3 === 0) w.box(x, by + 3, z, x, by + 5, z, B.iron); S(x, by + 3, z, B.iron); }
      const piers = [];
      for (const a of [0, 7, 14, 21, 27]) { piers.push([TX0 + a, TZ0]); piers.push([TX0 + a, TZ1 - 1]); if (a > 0 && a < 27) { piers.push([TX0, TZ0 + a]); piers.push([TX1 - 1, TZ0 + a]); } }
      for (const [cx, cz] of piers) w.box(cx, by + 3, cz, cx + 1, by + 20, cz + 1, B.brass);
      for (const [x0, z0, x1, z1] of [[TX0, TZ0, TX1, TZ0 + 1], [TX0, TZ1 - 1, TX1, TZ1], [TX0, TZ0, TX0 + 1, TZ1], [TX1 - 1, TZ0, TX1, TZ1]]) {
        w.box(x0, by + 19, z0, x1, by + 22, z1, B.brickDk); w.box(x0, by + 18, z0, x1, by + 18, z1, B.brassDk);
      }
      // 아치 머리: 기둥 사이 둥근 놋쇠 테
      for (const [a0, a1] of [[2, 6], [9, 13], [16, 20], [23, 26]]) for (let a = a0; a <= a1; a++) {
        const t = (a - a0) / (a1 - a0), ah = Math.round(Math.sin(t * Math.PI) * 2.5);
        for (let y = by + 18 - 2 + ah; y <= by + 17; y++) { S(TX0 + a, y, TZ0, B.brassDk); S(TX0 + a, y, TZ1, B.brassDk); S(TX0, y, TZ0 + a, B.brassDk); S(TX1, y, TZ0 + a, B.brassDk); }
      }
      w.box(TX0, by + 23, TZ0, TX1, by + 23, TZ1, B.brassDk); w.box(TX0, by + 21, TZ0 + TC, TX1, by + 22, TZ0 + TC + 1, B.iron);
      const cTop = MH.pyramid(w, TX0 - 2, TZ0 - 2, TX1 + 2, TZ1 + 2, by + 24, B.slate, 2, B.tileDk);
      // 지붕 모서리 놋쇠 마루, 지붕창, 모서리 첨탑
      for (let s = 0; s < (cTop - by - 24) / 2; s++) for (const [x, z] of [[TX0 - 2 + s, TZ0 - 2 + s], [TX1 + 2 - s, TZ0 - 2 + s], [TX0 - 2 + s, TZ1 + 2 - s], [TX1 + 2 - s, TZ1 + 2 - s]]) { S(x, by + 24 + s * 2, z, B.brass); S(x, by + 25 + s * 2, z, B.brass); }
      for (const [cx, cz] of [[TX0 - 2, TZ0 - 2], [TX1 + 1, TZ0 - 2], [TX0 - 2, TZ1 + 1], [TX1 + 1, TZ1 + 1]]) {
        w.box(cx, by + 3, cz, cx + 1, by + 30, cz + 1, B.brass);
        w.box(cx, by + 31, cz, cx + 1, by + 32, cz + 1, B.brassDk); S(cx, by + 33, cz, B.brass); S(cx + 1, by + 33, cz + 1, B.brass);
        w.box(cx, by + 34, cz, cx + 1, by + 35, cz + 1, B.runeO);
      }
      for (const [x, z, f] of [[FCX, TZ0 + 4, 'n'], [FCX, TZ1 - 4, 's'], [TX0 + 4, TZ0 + TC, 'w'], [TX1 - 4, TZ0 + TC, 'e']]) {
        const yy = by + 24 + 8;
        if (f === 'n' || f === 's') { const d = f === 'n' ? -1 : 1; w.box(x - 2, yy, z, x + 2, yy + 5, z + d * 2, B.brickDk); w.box(x - 1, yy + 1, z + d * 3, x + 1, yy + 3, z + d * 3, B.win); w.box(x - 2, yy + 6, z, x + 2, yy + 6, z + d * 3, B.brassDk); }
        else { const d = f === 'w' ? -1 : 1; w.box(x, yy, z - 2, x + d * 2, yy + 5, z + 2, B.brickDk); w.box(x + d * 3, yy + 1, z - 1, x + d * 3, yy + 3, z + 1, B.win); w.box(x, yy + 6, z - 2, x + d * 3, yy + 6, z + 2, B.brassDk); }
      }
      // 첨탑 꼭대기: 놋쇠 단, 십자 장식, 룬 구슬
      w.box(FCX - 1, cTop, TZ0 + TC - 1, FCX + 1, cTop + 1, TZ0 + TC + 1, B.brassDk);
      w.box(FCX, cTop + 2, TZ0 + TC, FCX, cTop + 13, TZ0 + TC, B.brass);
      w.box(FCX - 3, cTop + 7, TZ0 + TC, FCX + 3, cTop + 7, TZ0 + TC, B.brass); w.box(FCX, cTop + 7, TZ0 + TC - 3, FCX, cTop + 7, TZ0 + TC + 3, B.brass);
      w.sphere(FCX, cTop + 15, TZ0 + TC, 1.6, B.runeO);
      const bell = w.prop({ name: 'bell', pivot: [FCX + 0.5, by + 20, TZ0 + TC + 0.5], axis: 'x' });
      bell.box(FCX, by + 16, TZ0 + TC, FCX, by + 20, TZ0 + TC + 1, B.iron);
      for (let dy = -9; dy <= 6; dy++) {
        const t = (6 - dy) / 15, r = 2.4 + Math.pow(t, 1.6) * 4.4 + (dy === -9 ? 0.6 : 0);
        for (let dz = -8; dz <= 8; dz++) for (let dx = -8; dx <= 8; dx++) {
          const d = Math.hypot(dx, dz - 0.5);
          if (d > r || (d < r - 1.6 && dy < 4)) continue;
          bell.set(FCX + dx, by + 12 + dy, TZ0 + TC + dz, (dy === -4 || dy === 2 || dy === -9) ? B.bellDk : B.bell);
        }
      }
      bell.box(FCX, by + 4, TZ0 + TC, FCX, by + 11, TZ0 + TC, B.ironDk);
      MH.circle(w, FCX + 0.5, TZ1 + 30, 12, B.brass, 2); MH.circle(w, FCX + 0.5, TZ1 + 30, 6, B.runeO, 2);
      for (const dx of [-20, 14]) bench(FCX + dx, TZ1 + 26, UP + 1, false);
      landmarks.push({ name: '대시계탑', note: '아르카나의 시간을 정하는 시계', p: [FCX + 0.5, cTop + 20, TZ0 + TC + 0.5], tag: 'CLOCK' });
      // 대시계탑 정문 → 탑 안(하위 지도). 문 앞 층계참(폭 17·깊이 6)에 선다
      acts.push(OR.goAct({ at: [FCX, ty + 9, TZ1 + 3], h: 12, hit: [FCX - 3, DY0, TZ1 - 1, FCX + 3, DY0 + 11, TZ1 + 4], name: '대시계탑 안으로', goto: 'cogspire-clocktower', hint: '놋쇠 문틀의 탑 정문을 열고 톱니와 진자가 도는 대시계탑 속으로 들어가요' }));

      // ══════════ 톱니 옹벽: 맞물려 도는 톱니 일곱 ══════════
      const gears = [[116, 11, 0.4, B.brass], [140, 11, -0.4, B.copper], [164, 11, 0.4, B.brass], [188, 11, -0.4, B.copper], [100, 6.4, -0.69, B.brassDk], [212, 11, 0.4, B.brass], [228, 6.4, -0.69, B.verd]];
      gears.forEach(([gx, r, sp, b], k) => {
        const gyc = r < 8 ? LO + 10 : LO + 14;
        const gp = w.prop({ name: 'gear' + k, pivot: [gx + 0.5, gyc + 0.5, EDGE + 4], axis: 'z', speed: sp });
        gear(gp, gx, gyc, EDGE + 2, r, 'xy', b, B.ironDk, 4, B.brassLt);
        w.box(gx - 1, gyc - 1, EDGE, gx + 1, gyc + 1, EDGE + 1, B.ironDk); S(gx, gyc, EDGE + 1, B.brass);
      });
      acts.push({
        name: '대시계', hint: '바늘이 빠르게 돌고 종이 울리며 톱니가 빨라져요', hit: [FCX - 13, FCY - 13, FZ, FCX + 13, FCY + 13, FZ + 4],
        run: async a => {
          a.spin('hMin', 30, 4.2); a.spin('hHour', 30, 4.2); for (let k = 0; k < 7; k++) a.spin('gear' + k, 4, 4.2);
          for (let k = 0; k < 5; k++) { await a.turn('bell', [0.4, 0, 0], 0.4); a.burst([FCX + 0.5, by + 10, TZ0 + TC + 0.5], { n: 18, colors: ['#ffe0a0', '#ffb040'], speed: 18, up: 2, life: 1.6, gravity: 1, spread: 8, flat: true }); await a.turn('bell', [-0.4, 0, 0], 0.4); }
          await a.turn('bell', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '톱니 옹벽', note: '맞물려 도는 일곱 톱니', p: [165, LO + 36, EDGE + 2] });

      // ══════════ 룬 동력로(아랫단 서쪽) ══════════
      const RX = P(30), RZ = P(90), ry = LO;
      w.cyl(RX, RZ, ry + 1, ry + 2, 20.8, B.found); w.ring(RX, RZ, ry + 2, 19.6, 20.8, B.curb); w.cyl(RX, RZ, ry + 1, ry + 2, 18.8, B.ironDk);
      for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; S(Math.round(RX + Math.cos(a) * 17.6), ry + 2, Math.round(RZ + Math.sin(a) * 17.6), B.brassDk); }
      w.ring(RX, RZ, ry + 3, 16.4, 18.8, B.iron); w.ring(RX, RZ, ry + 4, 16.4, 17.4, B.brassDk);
      MH.circle(w, RX + 0.5, RZ + 0.5, 26, B.rune, 2); MH.circle(w, RX + 0.5, RZ + 0.5, 30, B.brassDk, 2);
      for (let k = 0; k < 4; k++) {
        const a = k * 1.57 + 0.78, px = Math.round(RX + Math.cos(a) * 17.2), pz = Math.round(RZ + Math.sin(a) * 17.2);
        w.box(px - 1, ry + 3, pz - 1, px + 1, ry + 4, pz + 1, B.found);
        w.box(px, ry + 5, pz, px + 1, ry + 24, pz + 1, B.brass);
        for (const y of [ry + 10, ry + 16]) w.box(px - 1, y, pz - 1, px + 2, y + 1, pz + 2, B.copper);
        w.box(px, ry + 25, pz, px + 1, ry + 28, pz + 1, B.rune); w.box(px - 1, ry + 29, pz - 1, px + 2, ry + 29, pz + 2, B.brassDk); S(px, ry + 30, pz, B.brassLt);
        w.line(px, ry + 12, pz, RX + Math.cos(a) * 6, ry + 6, RZ + Math.sin(a) * 6, B.copper, 0.8);
      }
      w.cyl(RX, RZ, ry + 3, ry + 4, 4, B.brassDk); w.cyl(RX, RZ, ry + 5, ry + 9, 2, B.iron); w.sphere(RX, ry + 16, RZ, 6, B.rune);
      const rr = w.prop({ name: 'rr1', pivot: [RX + 0.5, ry + 16.5, RZ + 0.5], axis: 'y', speed: 0.9 }); ringT(rr, RX, ry + 16, RZ, 12.8, 'xz', B.copper, B.rune, 8);
      const rr2 = w.prop({ name: 'rr2', pivot: [RX + 0.5, ry + 16.5, RZ + 0.5], axis: 'y', speed: -0.6, clipOK: 24 }); ringT(rr2, RX, ry + 16, RZ, 9.6, 'xy', B.brass, B.runeO, 6);
      lights.push({ name: 'core', p: [RX + 0.5, ry + 18, RZ + 0.5], c: '#50f0ff', i: 2, d: 52, flicker: 0.1 });
      MH.path(w, [[RX + 24, RZ - 10], [120, 178], [148, EDGE + 6]], 1.2, B.rune); MH.path(w, [[RX + 28, RZ + 4], [168, 220], [202, 212]], 1.2, B.rune);
      acts.push({
        name: '룬 동력로', hint: '고리가 빨리 돌고 룬 핵이 눈부시게 빛나요', hit: [RX - 14, ry + 2, RZ - 14, RX + 14, ry + 30, RZ + 14],
        run: async a => { a.flash('core', 3, 4.5); a.glow(1.7, 4.5); a.spin('rr1', 6, 4.5); a.spin('rr2', 6, 4.5); for (let k = 0; k < 8; k++) { a.burst([RX + 0.5, ry + 16, RZ + 0.5], { n: 30, colors: ['#5affff', '#a0ffff', '#ffffff'], speed: 16, up: 4, life: 1.4, gravity: 0, spread: 4 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '룬 동력로', note: '고리 두 개가 도는 동력 핵', p: [RX + 0.5, ry + 44, RZ + 0.5] });
      // 냉각수 수로(동력로에서 남쪽 끝으로) — 놋쇠 갓돌, 나무 다리
      for (let z = RZ + 22; z < D; z++) {
        for (let x = RX - 2; x <= RX + 3; x++) { MH.setH(w, x, z, LO - 4, B.ironDk, B.rock); w.liquid(x, z, LO - 1); for (let y = LO - 3; y <= LO; y++) S(x, y, z, 0); }
        for (const x of [RX - 4, RX - 3, RX + 4, RX + 5]) { S(x, LO, z, z % 8 < 6 ? B.curb : B.brassDk); for (let y = LO - 4; y < LO; y++) S(x, y, z, B.found); }
      }
      for (const bz of [276, 320]) {
        w.box(RX - 4, LO + 1, bz, RX + 5, LO + 1, bz + 5, B.plank); w.box(RX - 4, LO, bz, RX + 5, LO, bz, B.wood); w.box(RX - 4, LO, bz + 5, RX + 5, LO, bz + 5, B.wood);
        for (const x of [RX - 4, RX + 5]) { for (const z of [bz, bz + 5]) w.box(x, LO + 2, z, x, LO + 5, z, B.iron); w.box(x, LO + 5, bz, x, LO + 5, bz + 5, B.brass); }
      }
      lights.push({ p: [RX + 0.5, LO + 1, 300], c: '#40d0e0', i: 1, d: 28, flicker: 0.1, liquid: true });

      // ══════════ 골렘 공방(아랫단 동쪽)과 시험대의 골렘 ══════════
      const shop = house({ x: P(88), z: P(72), sx: 48, sz: 32, floors: 2, fh: 14, face: 'w', y: LO, wall: B.brick, shutter: 1, box: false, pal: [B.tile, B.tile2, B.tile3, B.tileDk], axis: 'x' });
      lights.push({ p: [shop.door[0] - 1, shop.door[1] + 6, shop.door[2] + 0.5], c: '#ffd890', i: 1, d: 24, flicker: 0.05, night: true });
      // 공방 간판: 문 위 쇠 팔에 매단 톱니
      { const [dx, dy, dz] = shop.door; w.box(dx - 1, dy + 12, dz, dx - 4, dy + 12, dz, B.iron); const sg = w.prop({ name: 'sign', pivot: [dx - 3.5, dy + 8.5, dz + 0.5], axis: 'x', speed: 0.6 }); gear(sg, dx - 4, dy + 8, dz - 1, 2.6, 'yz', B.brass, B.ironDk, 1, B.runeO); w.box(dx - 4, dy + 11, dz, dx - 4, dy + 11, dz, B.ironDk); }
      // 골렘 공방 정문(서쪽) → 공방 안(하위 지도)
      acts.push(OR.goAct({ at: [shop.door[0] - 2, shop.door[1], shop.door[2]], h: 9, hit: [shop.door[0] - 3, shop.door[1], shop.door[2] - 2, shop.door[0], shop.door[1] + 8, shop.door[2] + 2], name: '골렘 공방 안으로', goto: 'cogspire-golemworks', hint: '공방 문을 열고 골렘 몸통이 매달린 조립장과 시험대가 있는 공방 안으로 들어가요' }));
      if (shop.chimney) steam.push({ n: 36, colors: ['#e8e0d8', '#b8b0a8'], mode: 'rise', speed: 1.4, area: [shop.chimney[0], shop.chimney[2], 1.6], y0: shop.chimney[1], y1: shop.chimney[1] + 44, glow: false });
      for (let k = 0; k < 6; k++) clutter(shop.x0 - 9 - (k % 2) * 7, shop.z0 + 3 + k * 4 + (k > 2 ? 10 : 0), k);
      // 시험대: 돌 받침, 쇠 들틀, 리벳 판갑 골렘(오른팔은 부품)
      const GX = P(72), GZ = P(98), gy = LO + 1;
      w.box(GX - 12, gy, GZ - 8, GX + 13, gy, GZ + 9, B.found); w.box(GX - 10, gy, GZ - 6, GX + 11, gy, GZ + 7, B.ironDk);
      for (let x = GX - 12; x <= GX + 13; x += 5) S(x, gy, GZ + 9, B.brassDk);
      for (const x of [GX - 12, GX + 12]) for (const z of [GZ - 4, GZ + 4]) { w.box(x, gy, z, x + 1, gy + 40, z + 1, B.iron); for (const y of [gy + 14, gy + 30]) w.box(x, y, z, x + 1, y, z + 1, B.brassDk); }
      w.box(GX - 12, gy + 40, GZ - 4, GX + 13, gy + 41, GZ - 3, B.iron); w.box(GX - 12, gy + 40, GZ + 4, GX + 13, gy + 41, GZ + 5, B.iron); w.box(GX - 2, gy + 42, GZ - 4, GX + 3, gy + 42, GZ + 5, B.brass);
      // 다리
      for (const lx of [GX - 6, GX + 2]) { w.box(lx, gy + 1, GZ - 2, lx + 5, gy + 12, GZ + 3, B.golem); w.box(lx - 1, gy + 1, GZ - 3, lx + 6, gy + 2, GZ + 4, B.golemDk); w.box(lx, gy + 7, GZ - 2, lx + 5, gy + 7, GZ + 3, B.golemDk); S(lx, gy + 10, GZ + 3, B.rivet); S(lx + 5, gy + 10, GZ + 3, B.rivet); S(lx, gy + 4, GZ + 3, B.rivet); S(lx + 5, gy + 4, GZ + 3, B.rivet); }
      // 몸통: 판갑, 허리띠, 어깨 놋쇠 테, 리벳 줄, 룬 심장
      w.box(GX - 8, gy + 13, GZ - 4, GX + 9, gy + 28, GZ + 5, B.golem); w.box(GX - 8, gy + 19, GZ - 4, GX + 9, gy + 20, GZ + 5, B.golemDk); w.box(GX - 8, gy + 28, GZ - 4, GX + 9, gy + 29, GZ + 5, B.brassDk);
      for (let x = GX - 7; x <= GX + 8; x += 2) { S(x, gy + 15, GZ + 5, B.rivet); S(x, gy + 26, GZ + 5, B.rivet); }
      w.box(GX - 2, gy + 21, GZ + 6, GX + 3, gy + 25, GZ + 6, B.rune); w.box(GX - 3, gy + 20, GZ + 6, GX + 4, gy + 20, GZ + 6, B.brass); w.box(GX - 3, gy + 26, GZ + 6, GX + 4, gy + 26, GZ + 6, B.brass);
      // 머리: 투구, 눈, 이마 띠
      w.box(GX - 4, gy + 30, GZ - 2, GX + 5, gy + 37, GZ + 3, B.golem); S(GX - 2, gy + 34, GZ + 4, B.eye); S(GX - 1, gy + 34, GZ + 4, B.eye); S(GX + 2, gy + 34, GZ + 4, B.eye); S(GX + 3, gy + 34, GZ + 4, B.eye);
      w.box(GX - 4, gy + 38, GZ - 1, GX + 5, gy + 38, GZ + 2, B.brassDk); w.box(GX - 4, gy + 36, GZ + 4, GX + 5, gy + 36, GZ + 4, B.golemDk); w.box(GX - 1, gy + 31, GZ + 4, GX + 2, gy + 31, GZ + 4, B.golemDk);
      // 왼팔(고정, 내린 팔)
      w.box(GX - 14, gy + 16, GZ - 2, GX - 9, gy + 28, GZ + 3, B.golemDk); w.box(GX - 14, gy + 22, GZ - 2, GX - 9, gy + 22, GZ + 3, B.brassDk); w.box(GX - 14, gy + 13, GZ - 2, GX - 9, gy + 15, GZ + 3, B.golem);
      const arm = w.prop({ name: 'arm', pivot: [GX + 12, gy + 26, GZ + 1], axis: 'z' });
      arm.box(GX + 10, gy + 8, GZ - 2, GX + 14, gy + 28, GZ + 3, B.golemDk); arm.box(GX + 10, gy + 18, GZ - 2, GX + 14, gy + 18, GZ + 3, B.brassDk); arm.box(GX + 10, gy + 4, GZ - 2, GX + 14, gy + 7, GZ + 3, B.golem);
      for (const y of [gy + 12, gy + 24]) { arm.set(GX + 10, y, GZ + 3, B.rivet); arm.set(GX + 14, y, GZ + 3, B.rivet); }
      lights.push({ name: 'golem', p: [GX + 0.5, gy + 34, GZ + 6], c: '#50f0ff', i: 0.9, d: 28, flicker: 0.1 });
      for (let k = 0; k < 4; k++) clutter(GX - 20 + k * 10, GZ - 16, k + 1);
      acts.push({
        name: '골렘 시동', hint: '눈에 불이 들어오고 팔을 들어 올려요', hit: [GX - 14, gy + 1, GZ - 4, GX + 14, gy + 38, GZ + 6],
        run: async a => {
          a.flash('golem', 5, 5);
          a.burst([GX + 0.5, gy + 24, GZ + 6], { n: 30, colors: ['#ffffff', '#d8d0c8'], speed: 10, up: 6, life: 1.4, gravity: -1, spread: 6 });
          await a.turn('arm', [0, 0, 1.7], 1.6); await a.wait(0.5);
          await a.turn('arm', [0, 0, 0.9], 0.5); await a.turn('arm', [0, 0, 1.7], 0.5); await a.wait(0.6);
          await a.turn('arm', [0, 0, 0], 1.4);
          a.burst([GX + 12, gy + 4, GZ + 0.5], { n: 20, colors: ['#d8d0c8', '#8a8078'], speed: 8, up: 2, life: 0.9, gravity: 6, spread: 4, flat: true });
        },
      });
      landmarks.push({ name: '골렘 공방', note: '시험대에 선 작업용 골렘', p: [GX + 0.5, gy + 56, GZ + 0.5] });

      // ══════════ 기술자 집, 구리 관, 증기 ══════════
      [[12, 14, 12, 9, 's', UP], [36, 12, 11, 9, 's', UP], [103, 14, 12, 9, 's', UP], [127, 12, 11, 10, 's', UP], [12, 46, 10, 9, 'e', UP], [124, 44, 11, 9, 'w', UP], [10, 82, 10, 9, 'e', LO], [62, 126, 11, 9, 'n', LO], [8, 140, 12, 10, 'e', LO]].forEach(([ox, oz, osx, osz, face, y], k) => {
        const x = ox * 2, z = oz * 2, sx = osx * 2, sz = osz * 2;
        const h = house({ x, z, sx, sz, floors: 2 + (k % 2), fh: 12, face, y, wall: k % 2 ? B.brickDk : B.brick, shutter: k % 3 ? 1 : 2, box: true, balcony: k % 3 === 2 ? 1 : 0, stone: k === 3 || k === 6 ? 1 : 0, pal: k % 3 === 1 ? [B.tileR, B.tileR2, B.tileR3, B.tileRDk] : [B.tile, B.tile2, B.tile3, B.tileDk] });
        if ((k === 0 || k === 4) && h.lamp) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 20, flicker: 0.05, night: true });
        if (h.chimney && steam.length < 5) steam.push({ n: 22, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 1.2, area: [h.chimney[0], h.chimney[2], 1.2], y0: h.chimney[1], y1: h.chimney[1] + 36, glow: false });
        // 집 앞 소품: 화단·통·상자
        const fy = y + 1;
        if (face === 's') { planter(x + 2, z + sz + 7, fy, 3, true); clutter(x + sx - 4, z + sz + 9, k); }
        else if (face === 'e') { planter(x + sx + 7, z + 2, fy, 3, false); clutter(x + sx + 9, z + sz - 4, k + 1); }
        else if (face === 'w') { planter(x - 9, z + 2, fy, 3, false); clutter(x - 9, z + sz - 4, k + 2); }
        else { planter(x + 2, z - 9, fy, 3, true); clutter(x + sx - 4, z - 9, k); }
      });
      // 관 받침대와 구리 관(탑 → 공방): 쇠 기둥, 받침 팔, 놋쇠 이음테
      for (const px of [182, 202]) { w.box(px, UP + 1, 120, px + 1, UP + 24, 121, B.iron); w.box(px - 2, UP + 24, 120, px + 3, UP + 24, 121, B.iron); w.box(px - 2, UP + 1, 118, px + 3, UP + 2, 123, B.found); S(px, UP + 12, 122, B.brassDk); }
      w.line(TX1 + 2, UP + 26, TZ0 + 16, 182, UP + 26, 120.5, B.copper, 1.2); w.line(182, UP + 26, 120.5, 202, UP + 26, 120.5, B.copper, 1.2); w.line(202, UP + 26, 120.5, 228, LO + 30, 172, B.copper, 1.2);
      for (const x of [188, 196]) for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) if (Math.hypot(dy, dz) <= 2.4) S(x, UP + 26 + dy, 120 + dz, B.brass);
      w.box(192, UP + 29, 120, 193, UP + 31, 121, B.brass); S(192, UP + 32, 120, B.runeO);
      for (const [lx, lz, lit] of [[53, 60, 1], [101, 66, 0], [60, 94, 1], [84, 94, 0], [115, 120, 1], [24, 26, 0], [140, 24, 0], [48, 110, 0], [100, 150, 0]]) {
        const x = lx * 2, z = lz * 2, y = g(x, z);
        if (!free(x - 1, y + 1, z - 1, x + 1, y + 16, z + 1)) continue;
        const lp = lampPost(x, z, 11);
        if (lit) lights.push({ p: lp, c: '#ffe0a0', i: 1, d: 26, flicker: 0.05, night: true });
      }

      // ══════════ 증기 해머(아랫단 남쪽): 해머(부품)가 달군 쇠를 내리친다 ══════════
      const HX = P(100), HZ = P(108), hy = LO + 1;
      w.box(HX - 10, hy - 1, HZ - 8, HX + 11, hy - 1, HZ + 9, B.found);
      for (const x of [HX - 6, HX + 6]) { w.box(x, hy, HZ, x + 1, hy + 28, HZ + 1, B.iron); w.box(x - 1, hy, HZ - 2, x + 2, hy + 3, HZ + 3, B.ironDk); for (const y of [hy + 10, hy + 20]) w.box(x, y, HZ, x + 1, y, HZ + 1, B.brassDk); }
      w.box(HX - 6, hy + 28, HZ - 2, HX + 7, hy + 29, HZ + 3, B.ironDk); w.box(HX - 2, hy + 30, HZ - 2, HX + 3, hy + 33, HZ + 3, B.copper); w.box(HX - 2, hy + 31, HZ - 2, HX + 3, hy + 31, HZ + 3, B.brassDk); w.box(HX, hy + 34, HZ, HX + 1, hy + 36, HZ + 1, B.iron);
      w.box(HX - 3, hy, HZ - 3, HX + 4, hy + 2, HZ + 4, B.ironDk); w.box(HX - 4, hy, HZ - 4, HX + 5, hy, HZ + 5, B.found); w.box(HX - 2, hy + 3, HZ, HX + 3, hy + 3, HZ + 1, B.hot); w.box(HX - 1, hy + 4, HZ, HX + 2, hy + 4, HZ + 1, B.hot);
      // 화덕(벽돌, 불구멍)과 석탄 더미
      w.box(HX + 12, hy, HZ - 6, HX + 17, hy + 5, HZ - 1, B.brickDk); w.box(HX + 13, hy + 2, HZ - 1, HX + 15, hy + 3, HZ - 1, B.hot); w.box(HX + 13, hy + 6, HZ - 5, HX + 16, hy + 6, HZ - 2, B.iron);
      w.box(HX + 14, hy + 7, HZ - 4, HX + 15, hy + 14, HZ - 3, B.brickDk);
      for (let dz = 0; dz < 5; dz++) for (let dx = 0; dx < 5; dx++) { const hh = 3 - Math.max(Math.abs(dx - 2), Math.abs(dz - 2)); for (let y = 0; y < hh; y++) S(HX - 15 + dx, hy + y, HZ + 3 + dz, B.coal); }
      const ham = w.prop({ name: 'hammer', pivot: [HX + 1, hy + 18, HZ + 1] });
      ham.box(HX - 4, hy + 14, HZ - 2, HX + 5, hy + 19, HZ + 3, B.iron); ham.box(HX - 4, hy + 14, HZ - 2, HX + 5, hy + 15, HZ + 3, B.ironDk); ham.box(HX - 4, hy + 18, HZ - 2, HX + 5, hy + 18, HZ + 3, B.brassDk);
      ham.box(HX, hy + 20, HZ, HX + 1, hy + 27, HZ + 1, B.brass);
      lights.push({ name: 'forge', p: [HX + 0.5, hy + 6, HZ + 0.5], c: '#ff8a30', i: 1.4, d: 32, flicker: 0.3 });
      steam.push({ n: 18, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 1.2, area: [HX + 0.5, HZ + 0.5, 1], y0: hy + 36, y1: hy + 64, glow: false });
      acts.push({
        name: '증기 해머', hint: '증기 해머가 쾅쾅 내리치며 불꽃이 튀어요', hit: [HX - 8, hy, HZ - 4, HX + 8, hy + 34, HZ + 4],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.move('hammer', [0, -8, 0], 0.22, t => t * t);
            a.flash('forge', 4, 0.3);
            a.burst([HX + 0.5, hy + 6, HZ + 0.5], { n: 40, colors: ['#ffb040', '#ffe0a0', '#ff6a20'], speed: 20, up: 8, life: 0.9, gravity: 24, spread: 2 });
            a.burst([HX + 0.5, hy + 34, HZ + 0.5], { n: 14, colors: ['#ffffff', '#d8d0c8'], speed: 4, up: 10, life: 1.4, gravity: -1, spread: 2 });
            await a.wait(0.12); await a.move('hammer', [0, 0, 0], 0.55);
          }
        },
      });
      landmarks.push({ name: '증기 해머', note: '달군 쇠를 두드리는 대장간', p: [HX + 0.5, hy + 44, HZ + 0.5] });

      // ══════════ 화물 승강기(옹벽 동쪽): 발판(부품, 10×10칸이라 타고 오를 수 있다)이 아랫단과 윗단을 오간다 ══════════
      const LZ0 = EDGE, LZ1 = EDGE + 9, lift = UP - LO, RX0 = 272;
      for (const x of [LX0 - 3, LX0 - 2, LX1 + 2, LX1 + 3]) w.box(x, LO + 1, EDGE + 8, x, UP + 14, EDGE + 9, x === LX0 - 3 || x === LX1 + 3 ? B.iron : B.brassDk);
      for (const x of [LX0 - 3, LX1 + 2]) for (let y = LO + 4; y < UP + 14; y += 6) w.box(x, y, EDGE + 8, x + 1, y, EDGE + 9, B.brass);
      w.box(LX0 - 3, UP + 15, EDGE + 7, LX1 + 3, UP + 16, EDGE + 9, B.ironDk); w.box(RX0, UP + 14, EDGE + 9, RX0 + 1, UP + 14, EDGE + 9, B.brass);
      gear(w, RX0, UP + 18, EDGE + 7, 2.6, 'xy', B.brass, B.ironDk, 1, B.runeO);
      const plat = w.prop({ name: 'lift' });
      plat.box(LX0, LO + 1, LZ0, LX1, LO + 1, LZ1, B.plank); plat.box(LX0, LO + 1, LZ0, LX1, LO + 1, LZ0, B.brassDk);
      for (let x = LX0; x <= LX1; x++) { plat.set(x, LO + 4, LZ1, B.iron); if (x % 3 === 0 || x === LX0 || x === LX1) plat.box(x, LO + 2, LZ1, x, LO + 3, LZ1, B.iron); }
      crate(plat, LX0, LO + 2, LZ1 - 4, 3); plat.box(LX1 - 1, LO + 2, LZ1 - 2, LX1, LO + 4, LZ1 - 1, B.copper); plat.box(LX1 - 1, LO + 5, LZ1 - 2, LX1, LO + 5, LZ1 - 1, B.brass);
      MH.rope(w, 'liftRope', RX0, UP + 13, LZ1, UP + 13 - (LO + 5) + 1, B.ironDk);
      acts.push({
        name: '화물 승강기', hint: '짐을 실은 발판이 옹벽을 따라 윗단까지 올라갔다 내려와요. 타고 윗단으로 오를 수 있어요', hit: [LX0 - 3, LO + 1, LZ0, LX1 + 3, UP + 16, LZ1 + 1],
        run: async a => {
          const L0 = UP + 13 - (LO + 5) + 1;
          a.burst([RX0, LO + 4, LZ1], { n: 20, colors: ['#ffffff', '#d8d0c8'], speed: 6, up: 4, life: 1, gravity: -1, spread: 4 });
          a.rope('liftRope', L0, L0 - lift, 2.6); await a.move('lift', [0, lift, 0], 2.6);
          a.burst([RX0, UP + 4, LZ1], { n: 24, colors: ['#ffe0a0', '#ffb040'], speed: 8, up: 2, life: 0.8, gravity: 8, spread: 4, flat: true });
          await a.wait(3);
          a.rope('liftRope', L0, L0, 2.4); await a.move('lift', [0, 0, 0], 2.4);
        },
      });

      // ══════════ 비행선(윗단 서쪽 계류탑): 탑을 한 바퀴 돌고 계류탑에 새로 나타난다(부품) ══════════
      const MX = P(40), MZ = P(36);
      w.box(MX - 4, UP + 1, MZ - 4, MX + 5, UP + 2, MZ + 5, B.found); w.box(MX - 2, UP + 3, MZ - 2, MX + 3, UP + 4, MZ + 3, B.found);
      w.box(MX, UP + 5, MZ, MX + 1, UP + 34, MZ + 1, B.iron);
      for (const [dx, dz] of [[-4, -4], [5, -4], [-4, 5], [5, 5]]) w.line(MX + dx, UP + 3, MZ + dz, MX + (dx > 0 ? 1 : 0), UP + 20, MZ + (dz > 0 ? 1 : 0), B.ironDk, 0.6);
      for (let y = UP + 8; y < UP + 32; y += 6) w.box(MX - 2, y, MZ, MX + 3, y, MZ + 1, B.brassDk);
      w.box(MX - 2, UP + 34, MZ - 2, MX + 3, UP + 35, MZ + 3, B.brass); w.box(MX, UP + 36, MZ, MX + 1, UP + 37, MZ + 1, B.runeO);
      w.box(MX - 2, UP + 30, MZ, MX - 1, UP + 30, MZ + 1, B.iron);   // 계류 팔
      const ship = w.prop({ name: 'airship', pivot: [MX - 13, UP + 31, MZ + 1] });
      ship.ellipsoid(MX - 14, UP + 32, MZ + 0.5, 12, 6.4, 6.4, B.canvas);
      for (const dx of [-8, 0, 8]) ship.ellipsoid(MX - 14 + dx, UP + 32, MZ + 0.5, 0.7, 6.6, 6.6, B.canvasDk);
      ship.ellipsoid(MX - 14, UP + 32, MZ + 0.5, 12.3, 0.6, 6.6, B.canvasDk);
      ship.box(MX - 27, UP + 31, MZ, MX - 24, UP + 42, MZ + 1, B.copper); ship.box(MX - 27, UP + 32, MZ - 6, MX - 24, UP + 33, MZ + 7, B.copper);
      ship.box(MX - 28, UP + 30, MZ, MX - 28, UP + 34, MZ + 1, B.brassDk);
      // 곤돌라: 놋쇠 선체, 창, 매단 줄, 룬 엔진
      ship.box(MX - 19, UP + 21, MZ - 2, MX - 9, UP + 24, MZ + 3, B.brass); ship.box(MX - 18, UP + 20, MZ - 1, MX - 10, UP + 20, MZ + 2, B.brassDk);
      for (let x = MX - 17; x <= MX - 11; x += 2) { ship.set(x, UP + 23, MZ - 2, B.lamp); ship.set(x, UP + 23, MZ + 3, B.lamp); }
      for (const x of [MX - 17, MX - 11]) for (const z of [MZ - 1, MZ + 2]) ship.box(x, UP + 25, z, x, UP + 26, z, B.iron);
      ship.box(MX - 21, UP + 21, MZ, MX - 20, UP + 23, MZ + 1, B.runeO); ship.box(MX - 8, UP + 22, MZ, MX - 7, UP + 23, MZ + 1, B.iron);
      ship.box(MX - 6, UP + 20, MZ, MX - 6, UP + 25, MZ + 1, B.brassDk);
      const air = [[60, 70], [104, 74], [116, 44], [104, 20], [62, 22], [26, 24], [-4, 20]];
      const shipPts = [[0, 12, 0]].concat(air.map(([x, z]) => [2 * x - (MX - 14), 36, 2 * z - MZ]));
      acts.push({
        name: '비행선', hint: '계류탑의 비행선이 떠올라 시계탑을 한 바퀴 돌고 북서쪽 하늘 너머로 떠난 뒤, 계류탑에 다시 나타나요', hit: [MX - 28, UP + 20, MZ - 7, MX + 2, UP + 40, MZ + 8],
        run: async a => {
          a.burst([MX - 14, UP + 20, MZ + 0.5], { n: 30, colors: ['#ffffff', '#e8e0d8'], speed: 6, up: 4, life: 1.4, gravity: -0.6, spread: 6 });
          await a.drive('airship', shipPts, 18, { fwd: '+x', back: 1.0 });
          a.burst([MX, UP + 36, MZ + 0.5], { n: 20, colors: ['#ffb040', '#ffe0a0'], speed: 6, up: 4, life: 1, gravity: 4, spread: 2 });
        },
      });
      landmarks.push({ name: '비행선 계류탑', note: '시계탑을 도는 유람 비행선', p: [MX - 13, UP + 52, MZ + 0.5] });

      // ══════════ 태엽 오르골(아랫단 남쪽): 핀 박힌 원통(부품)이 돌며 음표가 튄다 ══════════
      const OX = P(70), OZ = P(114), oy = LO + 1;
      w.box(OX - 6, oy - 1, OZ - 10, OX + 27, oy - 1, OZ + 11, B.found); w.walls(OX - 6, oy, OZ - 10, OX + 27, oy, OZ + 11, B.curb);
      w.box(OX - 2, oy, OZ - 6, OX + 23, oy + 5, OZ + 7, B.brassDk); w.box(OX - 3, oy + 6, OZ - 7, OX + 24, oy + 7, OZ + 8, B.brass); w.box(OX - 3, oy, OZ - 7, OX + 24, oy + 1, OZ + 8, B.wood);
      for (let x = OX; x <= OX + 21; x += 3) w.box(x, oy + 2, OZ + 7, x + 1, oy + 3, OZ + 7, B.runeO);
      for (let x = OX - 2; x <= OX + 23; x += 5) w.box(x, oy + 2, OZ + 8, x, oy + 5, OZ + 8, B.brass);
      for (const x of [OX - 2, OX - 1, OX + 22, OX + 23]) w.box(x, oy + 8, OZ, x, oy + 15, OZ + 1, B.brass);
      for (let x = OX + 2; x <= OX + 19; x++) w.box(x, oy + 8, OZ - 6, x, oy + 8 + ((x >> 1) % 3) * 2, OZ - 5, x & 1 ? B.iron : B.rail);   // 빗살
      const drum = w.prop({ name: 'drum', pivot: [OX + 10.5, oy + 15, OZ + 1], axis: 'x', speed: 0.5, clipOK: 4 });
      for (let x = OX; x <= OX + 21; x++) for (let v = -6; v <= 6; v++) for (let u = -6; u <= 6; u++) {
        const d = Math.hypot(u - 0.5, v - 0.5);
        if (d <= 4.8) { if (d > 3.8 || x === OX || x === OX + 21) drum.set(x, oy + 15 + v, OZ + u, x <= OX + 1 || x >= OX + 20 ? B.copper : B.brass); }
        else if (d <= 6 && hash3(x >> 1, u + 9, v + 9) > 0.86 && x > OX + 1 && x < OX + 20) drum.set(x, oy + 15 + v, OZ + u, B.runeO);
      }
      const mstar = w.prop({ name: 'mstar', pivot: [OX + 11, oy + 24, OZ + 1], axis: 'y', speed: 0.8 });
      mstar.box(OX + 10, oy + 22, OZ, OX + 11, oy + 28, OZ + 1, B.brass); mstar.box(OX + 6, oy + 26, OZ, OX + 15, oy + 26, OZ + 1, B.note); mstar.box(OX + 10, oy + 26, OZ - 4, OX + 11, oy + 26, OZ + 5, B.rune);
      mstar.box(OX + 10, oy + 29, OZ, OX + 11, oy + 29, OZ + 1, B.runeO);
      w.box(OX + 10, oy + 21, OZ, OX + 11, oy + 21, OZ + 1, B.brass);
      for (const dz of [-15, 13]) bench(OX + 7, OZ + dz, oy, true);
      lights.push({ name: 'mbox', p: [OX + 11, oy + 26, OZ + 1], c: '#ffb0e0', i: 1.2, d: 28, flicker: 0.1 });
      acts.push({
        name: '태엽 오르골', hint: '거대한 오르골의 원통이 돌며 음표가 춤추듯 튀어나와요', hit: [OX - 2, oy, OZ - 8, OX + 23, oy + 28, OZ + 8],
        run: async a => {
          a.flash('mbox', 3, 6); a.spin('drum', 5, 6); a.spin('mstar', 6, 6);
          for (let k = 0; k < 12; k++) { a.burst([OX + 2 + (k * 14) % 20, oy + 22, OZ - 4], { n: 8, colors: [['#ff8ad0', '#ffffff'], ['#5affff', '#ffffff'], ['#ffb040', '#ffe0a0']][k % 3], speed: 4, up: 10, life: 1.8, gravity: 2, spread: 1.2 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '태엽 오르골', note: '광장의 거대한 오르골', p: [OX + 11, oy + 40, OZ + 1] });

      // ══════════ 증기 크레인(아랫단 남동쪽): 팔(부품)이 돌며 짐을 옮긴다 ══════════
      const KX = P(104), KZ = P(96), ky = LO + 1;
      w.box(KX - 4, ky, KZ - 4, KX + 5, ky + 1, KZ + 5, B.found); w.box(KX - 2, ky + 2, KZ - 2, KX + 3, ky + 3, KZ + 3, B.found);
      for (let y = ky + 4; y <= ky + 30; y++) { w.box(KX, y, KZ, KX + 1, y, KZ + 1, B.iron); if (y % 8 === 0) { w.box(KX - 1, y, KZ - 1, KX + 2, y, KZ + 2, B.brassDk); } }
      w.line(KX - 2, ky + 4, KZ - 2, KX, ky + 18, KZ, B.ironDk); w.line(KX + 3, ky + 4, KZ + 3, KX + 1, ky + 18, KZ + 1, B.ironDk);
      const jib = w.prop({ name: 'jib', pivot: [KX + 1, ky + 32, KZ + 1], axis: 'y' });
      jib.box(KX - 2, ky + 31, KZ - 2, KX + 3, ky + 36, KZ + 3, B.copper); jib.box(KX - 2, ky + 33, KZ - 2, KX + 3, ky + 33, KZ + 3, B.brassDk); jib.box(KX, ky + 37, KZ, KX + 1, ky + 40, KZ + 1, B.iron);
      jib.set(KX, ky + 41, KZ, B.ironDk);
      jib.box(KX - 12, ky + 34, KZ, KX + 19, ky + 35, KZ + 1, B.brass);
      jib.line(KX + 1, ky + 40, KZ, KX + 18, ky + 36, KZ, B.ironDk); jib.line(KX, ky + 40, KZ + 1, KX - 11, ky + 36, KZ + 1, B.ironDk);
      jib.box(KX - 12, ky + 29, KZ - 2, KX - 7, ky + 33, KZ + 3, B.ironDk);   // 평형추
      jib.box(KX + 16, ky + 18, KZ, KX + 16, ky + 33, KZ, B.ironDk); jib.box(KX + 17, ky + 18, KZ + 1, KX + 17, ky + 33, KZ + 1, B.ironDk);
      crate(jib, KX + 14, ky + 12, KZ - 2, 6); jib.box(KX + 16, ky + 18, KZ, KX + 17, ky + 18, KZ + 1, B.copper);
      for (let k = 0; k < 3; k++) clutter(KX - 12 + k * 7, KZ + 12, k + 2);
      acts.push({
        name: '증기 크레인', hint: '크레인 팔이 돌아 짐을 옮겼다가 제자리로 돌아와요', hit: [KX - 4, ky, KZ - 4, KX + 20, ky + 40, KZ + 5],
        run: async a => {
          a.burst([KX + 1, ky + 42, KZ + 1], { n: 24, colors: ['#ffffff', '#d8d0c8'], speed: 4, up: 10, life: 1.6, gravity: -1, spread: 2 });
          await a.turn('jib', [0, -1.57, 0], 2.4);
          a.burst([KX + 1, ky + 12, KZ + 17], { n: 20, colors: ['#d8d0c8', '#8a8078'], speed: 6, up: 2, life: 0.8, gravity: 6, spread: 4, flat: true });
          await a.wait(1);
          a.burst([KX + 1, ky + 42, KZ + 1], { n: 24, colors: ['#ffffff', '#d8d0c8'], speed: 4, up: 10, life: 1.6, gravity: -1, spread: 2 });
          await a.turn('jib', [0, 0, 0], 2.4);
        },
      });

      // ══════════ 새 구역: 태엽 정거장(아랫단 동쪽) ══════════
      const RZ0 = EDGE + 12, RZ1 = D - 1;
      for (let z = RZ0; z <= RZ1; z++) {
        if (z % 4 < 2) w.box(TRX - 6, LO, z, TRX + 7, LO, z, B.tie);
        for (const x of [TRX - 4, TRX + 4]) { S(x, LO + 1, z, B.rail); S(x + 1, LO + 1, z, B.rail); if (z % 4 === 0) { S(x - 1, LO + 1, z, B.ironDk); S(x + 2, LO + 1, z, B.ironDk); } }
      }
      // 기관고(북쪽, 남쪽이 트인 벽돌 창고): 벽기둥, 쌍창, 아치 입구, 박공지붕과 환기탑
      const SX0 = TRX - 16, SX1 = TRX + 16, SZ0 = EDGE + 6, SZ1 = EDGE + 40, sy = LO + 1, sh = 26;
      w.box(SX0 - 2, LO, SZ0 - 2, SX1 + 2, LO, SZ1 + 2, B.found);
      for (let y = sy; y <= sy + sh; y++) { w.walls(SX0, y, SZ0, SX1, y, SZ1, y <= sy + 2 ? B.found : ((y - sy) % 9 === 0 ? B.brickDk : B.brick)); w.walls(SX0 + 1, y, SZ0 + 1, SX1 - 1, y, SZ1 - 1, B.brickDk); }
      w.box(TRX - 8, sy, SZ1 - 1, TRX + 9, sy + 18, SZ1, 0);
      for (let c = -10; c <= 11; c++) { const ah = Math.round(Math.sqrt(Math.max(0, 110 - (c - 0.5) * (c - 0.5))) * 0.35); w.box(TRX + c, sy + 18 - ah + 3, SZ1, TRX + c, sy + 21, SZ1, B.brass); if (Math.abs(c - 0.5) < 9) w.box(TRX + c, sy + 19 - ah + 3, SZ1 - 1, TRX + c, sy + 19, SZ1 - 1, 0); }
      for (const x of [TRX - 10, TRX - 9, TRX + 10, TRX + 11]) w.box(x, sy, SZ1, x, sy + 19, SZ1 + 1, B.brassDk);
      for (const x of [SX0, SX1]) for (let z = SZ0 + 6; z < SZ1 - 3; z += 8) {
        const o = x === SX0 ? -1 : 1;
        w.box(x, sy + 8, z, x + (o < 0 ? 1 : -1), sy + 15, z + 3, B.win); w.box(x, sy + 8, z + 1, x, sy + 15, z + 2, B.win); w.box(x, sy + 12, z, x, sy + 12, z + 3, B.brassDk);
        w.box(x + o, sy + 7, z - 1, x + o, sy + 7, z + 4, B.sill); w.box(x + o, sy + 16, z - 1, x + o, sy + 16, z + 4, B.brickDk);
      }
      for (const [x, z] of [[SX0, SZ0], [SX1 - 1, SZ0], [SX0, SZ1 - 1], [SX1 - 1, SZ1 - 1]]) w.box(x, sy, z, x + 1, sy + sh + 1, z + 1, B.found);
      for (let z = SZ0; z <= SZ1; z += 8) for (const x of [SX0 - 1, SX1 + 1]) w.box(x, sy, z, x, sy + sh - 2, z + 1, B.brickDk);
      w.walls(SX0, sy + sh, SZ0, SX1, sy + sh, SZ1, B.brassDk);
      const shTop = roof(SX0, SX1, SZ0, SZ1, sy + sh + 1, { axis: 'z', gable: B.brickDk, pal: [B.tileR, B.tileR2, B.tileR3, B.tileRDk] });
      for (let z = SZ0 + 4; z < SZ1 - 2; z += 12) { w.box(TRX - 2, shTop - 3, z, TRX + 3, shTop + 4, z + 3, B.iron); w.box(TRX - 3, shTop + 5, z - 1, TRX + 4, shTop + 6, z + 4, B.brassDk); w.box(TRX - 2, shTop + 2, z, TRX + 3, shTop + 3, z, B.ironDk); }
      steam.push({ n: 20, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 1.2, area: [TRX + 0.5, SZ0 + 6, 2], y0: shTop + 8, y1: shTop + 40, glow: false });
      // 승강장(철로 서쪽): 돌 바닥·놋쇠 가장자리·기둥·구리 지붕·의자·짐
      const PZ0 = 252, PZ1 = 312, PX0 = TRX - 26, PX1 = TRX - 8, py = LO + 2;
      w.box(PX0, LO, PZ0, PX1, py, PZ1, B.found); w.box(PX0, py, PZ0, PX1, py, PZ1, B.plate); w.box(PX1 - 1, py, PZ0, PX1, py, PZ1, B.brass);
      w.box(PX0 - 2, LO + 1, PZ0 + 24, PX0 - 1, LO + 1, PZ0 + 36, B.found);
      for (let z = PZ0 + 4; z <= PZ1 - 4; z += 14) for (const x of [PX0 + 4, PX1 - 2]) {
        w.box(x, py + 1, z, x + 1, py + 15, z + 1, B.iron); w.box(x - 1, py + 1, z - 1, x + 2, py + 2, z + 2, B.ironDk); w.box(x, py + 10, z, x + 1, py + 10, z + 1, B.brassDk);
        w.line(x, py + 13, z, x + (x < TRX - 16 ? 3 : -3), py + 16, z, B.iron);
      }
      for (let z = PZ0 - 1; z <= PZ1 + 1; z++) for (let x = PX0 - 1; x <= PX1 + 3; x++) {
        const edge = x === PX0 - 1 || x >= PX1 + 2 || z === PZ0 - 1 || z === PZ1 + 1;
        const yy = py + 16 + (x < PX0 + 6 ? 1 : x > PX1 - 4 ? 0 : 1);
        S(x, yy, z, edge ? B.ironDk : (z % 6 < 2 ? B.copper : B.verd));
        if (edge && x >= PX1 + 2 && z % 2 === 0) S(x, yy - 1, z, B.ironDk);
      }
      for (let z = PZ0 + 6; z <= PZ1 - 6; z += 14) { S(TRX - 16, py + 13, z + 6, B.lamp); S(TRX - 16, py + 14, z + 6, B.lamp); S(TRX - 16, py + 15, z + 6, B.iron); }
      for (let z = PZ0 + 8; z <= PZ1 - 12; z += 18) bench(PX0 + 6, z, py, false);
      for (let k = 0; k < 4; k++) { const x = PX0 + 4 + (k % 2) * 6, z = PZ1 - 6 - (k >> 1) * 6; if (k % 2) barrel(w, x, py + 1, z, 7); else crate(w, x - 2, py + 1, z - 2, 4); }
      sack(w, PX0 + 2, py + 1, PZ1 - 18);
      // 매표소(승강장 북쪽 끝)
      house({ x: PX0 - 2, z: PZ0 - 18, sx: 18, sz: 14, floors: 1, fh: 12, face: 's', y: LO, wall: B.brickDk, shutter: 2, box: false, chimney: false, pal: [B.tile, B.tile2, B.tile3, B.tileDk], axis: 'x' });
      lights.push({ name: 'depot', p: [TRX - 16, py + 13, PZ0 + 27], c: '#ffd890', i: 1.3, d: 44, flicker: 0.05, srcR: 10 });
      // 신호기: 쇠기둥, 사다리, 등 두 개(룬·불)
      for (const sz of [EDGE + 60, PZ1 + 16]) {
        w.box(TRX + 10, LO + 1, sz, TRX + 10, LO + 20, sz, B.iron); w.box(TRX + 9, LO + 1, sz - 1, TRX + 11, LO + 2, sz + 1, B.found);
        w.box(TRX + 8, LO + 16, sz - 1, TRX + 9, LO + 23, sz + 1, B.ironDk); S(TRX + 7, LO + 22, sz, B.rune); S(TRX + 7, LO + 21, sz, B.rune); S(TRX + 7, LO + 18, sz, B.hot); S(TRX + 7, LO + 17, sz, B.hot);
        w.box(TRX + 8, LO + 24, sz - 1, TRX + 9, LO + 24, sz + 1, B.brassDk);
      }
      // 급수탑(철로 동쪽): 쇠다리와 가새, 통(널판·쇠테), 뾰족 지붕, 내리는 관(부품)
      const WX = TRX + 18, WZ = 224, wy0 = LO + 1, wt = LO + 26;
      for (const [dx, dz] of [[-6, -6], [6, -6], [-6, 6], [6, 6]]) { w.box(WX + dx, wy0, WZ + dz, WX + dx + 1, wt - 1, WZ + dz + 1, B.iron); w.box(WX + dx - 1, wy0, WZ + dz - 1, WX + dx + 2, wy0 + 1, WZ + dz + 2, B.found); }
      w.line(WX - 6, wy0 + 2, WZ - 6, WX + 6, wt - 3, WZ - 6, B.ironDk); w.line(WX + 6, wy0 + 2, WZ + 7, WX - 6, wt - 3, WZ + 7, B.ironDk);
      w.line(WX - 6, wy0 + 2, WZ + 6, WX - 6, wt - 3, WZ - 6, B.ironDk); w.line(WX + 7, wy0 + 2, WZ - 6, WX + 7, wt - 3, WZ + 6, B.ironDk);
      w.cyl(WX, WZ, wt, wt + 1, 9.2, B.ironDk);
      for (let y = wt + 2; y <= wt + 15; y++) for (let dz = -9; dz <= 9; dz++) for (let dx = -9; dx <= 9; dx++) { const d = Math.hypot(dx, dz); if (d > 8.4) continue; const out = d > 7.2; if (!out) continue; S(WX + dx, y, WZ + dz, (y === wt + 4 || y === wt + 10) ? B.iron : ((Math.floor((Math.atan2(dz, dx) + 4) * 6) & 1) ? B.plank : B.wood)); }
      w.cyl(WX, WZ, wt + 15, wt + 15, 7.2, B.plank);
      const wTop = MH.cone(w, WX, WZ, wt + 16, 10, B.verd, 0.75, B.ironDk); w.box(WX, wTop, WZ, WX, wTop + 2, WZ, B.brass);
      w.box(WX - 11, wt + 5, WZ, WX - 8, wt + 7, WZ + 1, B.copper);
      const spout = w.prop({ name: 'spout', pivot: [WX - 11, wt + 6.5, WZ + 1], axis: 'z', rot0: [0, 0, -1.2] });
      spout.box(WX - 22, wt + 6, WZ, WX - 12, wt + 7, WZ + 1, B.copper); spout.box(WX - 22, wt + 4, WZ, WX - 21, wt + 5, WZ + 1, B.brassDk); spout.box(WX - 16, wt + 8, WZ, WX - 16, wt + 8, WZ + 1, B.brass);
      // 정거장 둘레 소품, 울타리
      for (let k = 0; k < 6; k++) clutter(TRX + 14 + (k % 2) * 8, 256 + k * 12, k);
      for (let z = EDGE + 48; z < D - 2; z++) { const x = TRX + 28, gg = g(x, z); if (z % 6 === 0) w.box(x, gg + 1, z, x, gg + 6, z, B.iron); else { S(x, gg + 3, z, B.brassDk); S(x, gg + 5, z, B.brassDk); } }
      // 기관차와 화차(부품): 기관고 앞에서 출발해 승강장으로
      const LZf = SZ1 + 32, ly = LO + 2, lb = LZf - 28;                 // 기관차 앞끝, 뒤끝
      const loco = w.prop({ name: 'loco', pivot: [TRX + 0.5, ly + 10, lb - 8] });
      // 바퀴(붉은 바퀴통·바퀴살)와 연결봉
      for (const wz of [LZf - 4, LZf - 11, LZf - 18]) for (const x of [TRX - 5, TRX + 5]) {
        for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const d = Math.hypot(u, v); if (d > 3.3) continue; loco.set(x, ly + 3 + v, wz + u, d > 2.3 ? B.ironDk : (d < 1 ? B.brass : (u === 0 || v === 0 ? B.paintR : B.ironDk))); loco.set(x + (x < TRX ? -1 : 1), ly + 3 + v, wz + u, d > 2.3 ? B.ironDk : B.paintR); }
      }
      for (const x of [TRX - 7, TRX + 7]) loco.box(x, ly + 3, LZf - 18, x, ly + 3, LZf - 4, B.brass);
      for (const wz of [lb + 3]) for (const x of [TRX - 5, TRX + 5]) for (let v = -2; v <= 2; v++) for (let u = -2; u <= 2; u++) if (Math.hypot(u, v) <= 2.3) loco.set(x, ly + 2 + v, wz + u, B.ironDk);
      loco.box(TRX - 5, ly + 5, lb, TRX + 5, ly + 5, LZf, B.ironDk);
      // 보일러: 초록 칠, 놋쇠 테, 앞 연기실 문(룬 등)
      for (let z = lb + 10; z <= LZf - 1; z++) for (let v = -6; v <= 6; v++) for (let u = -6; u <= 6; u++) { const d = Math.hypot(u, v); if (d > 5.3 || d < 4) continue; loco.set(TRX + u, ly + 11 + v, z, (z - lb) % 6 === 0 ? B.brass : B.paint); }
      for (let v = -5; v <= 5; v++) for (let u = -5; u <= 5; u++) { const d = Math.hypot(u, v); if (d > 5.3) continue; loco.set(TRX + u, ly + 11 + v, LZf, d < 1.5 ? B.runeO : d > 4.2 ? B.brassDk : B.ironDk); loco.set(TRX + u, ly + 11 + v, lb + 10, B.ironDk); }
      loco.box(TRX - 5, ly + 3, LZf + 1, TRX + 5, ly + 3, LZf + 2, B.ironDk); for (let k = 0; k < 4; k++) loco.box(TRX - 3 + k * 2, ly, LZf + 2 + Math.floor(k / 4), TRX - 3 + k * 2, ly + 2, LZf + 2, B.paintR);
      loco.box(TRX - 1, ly + 17, LZf - 6, TRX + 1, ly + 22, LZf - 4, B.ironDk); loco.box(TRX - 2, ly + 23, LZf - 7, TRX + 2, ly + 24, LZf - 3, B.brass);   // 굴뚝
      loco.box(TRX - 1, ly + 17, LZf - 16, TRX + 1, ly + 19, LZf - 14, B.brass); loco.set(TRX, ly + 20, LZf - 15, B.brassLt);   // 증기 돔
      for (const x of [TRX - 6, TRX + 6]) loco.box(x, ly + 6, LZf - 6, x, ly + 8, LZf - 2, B.iron);   // 피스톤 통
      // 기관실: 창, 지붕
      loco.box(TRX - 5, ly + 6, lb, TRX + 5, ly + 18, lb + 9, B.paint); loco.box(TRX - 3, ly + 6, lb + 1, TRX + 3, ly + 16, lb + 8, 0);
      for (const x of [TRX - 5, TRX + 5]) { loco.box(x, ly + 12, lb + 3, x, ly + 15, lb + 6, B.win); loco.box(x, ly + 11, lb + 2, x, ly + 11, lb + 7, B.brassDk); }
      loco.box(TRX - 7, ly + 19, lb - 2, TRX + 7, ly + 19, lb + 11, B.copper); loco.box(TRX - 5, ly + 20, lb, TRX + 5, ly + 20, lb + 9, B.brassDk);
      // 화차(석탄)
      const cb = lb - 18;
      for (const z of [cb + 3, cb + 13]) for (const x of [TRX - 5, TRX + 5]) for (let v = -2; v <= 2; v++) for (let u = -2; u <= 2; u++) if (Math.hypot(u, v) <= 2.3) loco.set(x, ly + 2 + v, z + u, B.ironDk);
      loco.box(TRX - 5, ly + 4, cb, TRX + 5, ly + 4, cb + 15, B.ironDk); loco.walls(TRX - 5, ly + 5, cb, TRX + 5, ly + 10, cb + 15, B.plank); loco.box(TRX - 4, ly + 5, cb + 1, TRX + 4, ly + 10, cb + 14, B.coal);
      for (let z = cb + 1; z <= cb + 14; z++) for (let x = TRX - 4; x <= TRX + 4; x++) if (hash3(x, z, 5) > 0.55) loco.set(x, ly + 11, z, B.coal);
      for (const z of [cb, cb + 5, cb + 10, cb + 15]) loco.box(TRX - 5, ly + 5, z, TRX + 5, ly + 5, z, B.brassDk);
      loco.box(TRX, ly + 4, cb + 16, TRX + 1, ly + 4, lb - 1, B.iron);
      const run = PZ0 + 36 - LZf;                                          // 승강장 가운데에 선다
      acts.push({
        name: '증기 열차', hint: '기관차가 기적을 울리며 승강장에 섰다가 철로를 따라 남쪽 끝 너머로 떠나고, 기관고 앞에 다시 나타나요', hit: [TRX - 7, ly, cb, TRX + 7, ly + 24, LZf + 2],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([TRX + 0.5, ly + 26, LZf - 5], { n: 22, colors: ['#ffffff', '#d8d0c8'], speed: 4, up: 12, life: 1.6, gravity: -1.2, spread: 2 }); await a.wait(0.35); }
          a.flash('depot', 2, 6);
          const steps = 6;
          for (let k = 1; k <= steps; k++) {
            await a.drive('loco', [[0, 0, run * k / steps]], 4.2 / steps, { fwd: '+z' });
            a.burst([TRX + 0.5, ly + 26, LZf - 5 + run * k / steps], { n: 14, colors: ['#ffffff', '#e8e0d8'], speed: 4, up: 10, life: 1.4, gravity: -1.2, spread: 2 });
          }
          a.burst([TRX + 0.5, ly + 2, LZf + run], { n: 30, colors: ['#ffffff', '#d8d0c8'], speed: 10, up: 2, life: 1, gravity: 2, spread: 6, flat: true });
          await a.wait(1.6);
          for (let k = 0; k < 2; k++) { a.burst([TRX + 0.5, ly + 26, LZf - 5 + run], { n: 22, colors: ['#ffffff', '#d8d0c8'], speed: 4, up: 12, life: 1.6, gravity: -1.2, spread: 2 }); await a.wait(0.3); }
          await a.drive('loco', [[0, 0, run + 24], [0, 0, D + 28 - cb]], 3.6, { fwd: '+z', back: 1.0 });
        },
      });
      acts.push({
        name: '급수탑', hint: '급수탑의 관이 철로 위로 내려와 물을 쏟아요', hit: [WX - 12, wt - 2, WZ - 10, WX + 10, wTop + 2, WZ + 10],
        run: async a => {
          await a.turn('spout', [0, 0, 0], 1.2);
          for (let k = 0; k < 9; k++) { a.burst([WX - 21, wt + 4, WZ + 1], { n: 26, colors: ['#a0e8ff', '#e0ffff', '#5ac8e8'], speed: 3, up: -12, life: 1, gravity: 28, spread: 1.2 }); await a.wait(0.3); }
          a.burst([TRX + 0.5, LO + 3, WZ + 1], { n: 36, colors: ['#a0e8ff', '#ffffff'], speed: 10, up: 2, life: 0.9, gravity: 12, spread: 4, flat: true });
          await a.turn('spout', [0, 0, -1.2], 1.2);
        },
      });
      landmarks.push({ name: '태엽 정거장', note: '증기 기관차가 화물을 싣고 오가는 새 정거장', p: [TRX - 16, py + 32, PZ0 + 28], tag: 'NEW' });
      landmarks.push({ name: '급수탑', note: '기관차에 물을 대는 구리 관', p: [WX + 0.5, wTop + 12, WZ + 0.5] });

      // ══════════ 새 구역: 별시계 관측소(윗단 동쪽) ══════════
      const OBX = 304, OBZ = 68, oby = UP + 1, obH = 24;
      MH.circle(w, OBX + 0.5, OBZ + 0.5, 26, B.brass, 2); MH.circle(w, OBX + 0.5, OBZ + 0.5, 22, B.curb, 2);
      w.cyl(OBX, OBZ, oby, oby + 1, 18.8, B.found); w.ring(OBX, OBZ, oby + 1, 17.6, 18.8, B.curb);
      for (let y = oby + 2; y <= oby + obH; y++) w.ring(OBX, OBZ, y, 12.6, 14.8, y % 8 === 0 ? B.brassDk : (y <= oby + 3 ? B.found : B.brick));
      for (let k = 0; k < 8; k++) {
        const a = k / 8 * Math.PI * 2, x = Math.round(OBX + Math.cos(a) * 14.4), z = Math.round(OBZ + Math.sin(a) * 14.4);
        w.box(x - 1, oby + 2, z - 1, x + 1, oby + obH, z + 1, B.found);
        const a2 = a + Math.PI / 8;
        for (let y = oby + 9; y <= oby + 17; y++) for (const dr of [-0.08, 0, 0.08]) { const wx = Math.round(OBX + Math.cos(a2 + dr) * 14.2), wz = Math.round(OBZ + Math.sin(a2 + dr) * 14.2); S(wx, y, wz, y === oby + 13 ? B.brassDk : B.win); }
        const sx2 = Math.round(OBX + Math.cos(a2) * 15.2), sz2 = Math.round(OBZ + Math.sin(a2) * 15.2); S(sx2, oby + 8, sz2, B.sill);
      }
      // 문(남쪽): 판자 문짝, 놋쇠 인방, 앞 디딤
      for (let y = oby + 2; y <= oby + 10; y++) for (let x = OBX - 2; x <= OBX + 2; x++) for (const z of [OBZ + 13, OBZ + 14]) S(x, y, z, (x === OBX - 2 || x === OBX + 2 || y === oby + 6) ? B.doorDk : B.door);
      w.box(OBX - 4, oby + 11, OBZ + 15, OBX + 4, oby + 12, OBZ + 15, B.brass); w.box(OBX - 3, oby + 2, OBZ + 15, OBX - 3, oby + 10, OBZ + 15, B.brassDk); w.box(OBX + 3, oby + 2, OBZ + 15, OBX + 3, oby + 10, OBZ + 15, B.brassDk);
      w.cyl(OBX, OBZ, oby + obH + 1, oby + obH + 2, 17.2, B.brassDk); w.ring(OBX, OBZ, oby + obH + 3, 15.2, 17.2, B.iron);
      for (let k = 0; k < 32; k++) { const a = k / 32 * Math.PI * 2; const x = Math.round(OBX + Math.cos(a) * 16.2), z = Math.round(OBZ + Math.sin(a) * 16.2); S(x, oby + obH + 4, z, B.brass); if (k % 4 === 0) S(x, oby + obH + 5, z, B.brassLt); }
      const sky0 = oby + obH + 2;
      w.cyl(OBX, OBZ, sky0 + 1, sky0 + 2, 4.8, B.brass); w.cyl(OBX, OBZ, sky0 + 3, sky0 + 7, 1.4, B.brassDk);
      const SY = sky0 + 22;
      w.sphere(OBX, SY, OBZ, 4.4, B.runeO); w.box(OBX, sky0 + 8, OBZ, OBX, SY - 4, OBZ, B.brass);
      const orb = [['orb1', 15.2, 'xz', B.brass, B.rune, 0.5], ['orb2', 12.8, 'xy', B.copper, B.runeO, -0.35], ['orb3', 10.4, 'yz', B.verd, B.rune, 0.7]];
      for (const [nm, r, pl, b, mk, sp] of orb) { const p = w.prop({ name: nm, pivot: [OBX + 0.5, SY + 0.5, OBZ + 0.5], axis: pl === 'xz' ? 'y' : pl === 'xy' ? 'x' : 'z', speed: sp, clipOK: 6 }); ringT(p, OBX, SY, OBZ, r, pl, b, mk, 4); }
      const planets = w.prop({ name: 'planets', pivot: [OBX + 0.5, SY + 0.5, OBZ + 0.5], axis: 'y', speed: 0.3 });
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.4, x = Math.round(OBX + Math.cos(a) * 20), z = Math.round(OBZ + Math.sin(a) * 20); planets.sphere(x, SY - 2 + (k % 2) * 4, z, 1.6 + (k % 2) * 0.6, [B.rune, B.note, B.runeO, B.face][k]); planets.line(OBX + Math.cos(a) * 6, SY, OBZ + Math.sin(a) * 6, x, SY - 2 + (k % 2) * 4, z, B.brassDk); }
      lights.push({ name: 'star', p: [OBX + 0.5, SY, OBZ + 0.5], c: '#ffc860', i: 1.6, d: 52, flicker: 0.08 });
      // 망원경(부품): 관측소 옆 받침대에서 하늘을 겨눈다
      const TLX = OBX - 24, TLZ = OBZ + 24, tly = UP + 1;
      w.box(TLX - 2, tly, TLZ - 2, TLX + 3, tly + 1, TLZ + 3, B.found); w.box(TLX, tly + 2, TLZ, TLX + 1, tly + 8, TLZ + 1, B.iron);
      for (const [dx, dz] of [[-2, -2], [3, -2], [-2, 3], [3, 3]]) w.line(TLX + dx, tly + 2, TLZ + dz, TLX + (dx > 0 ? 1 : 0), tly + 7, TLZ + (dz > 0 ? 1 : 0), B.ironDk);
      const scope = w.prop({ name: 'scope', pivot: [TLX + 1, tly + 10.5, TLZ + 1], axis: 'x', rot0: [0.5, 0, 0] });
      scope.box(TLX, tly + 10, TLZ - 8, TLX + 1, tly + 11, TLZ + 7, B.brass); scope.box(TLX - 1, tly + 9, TLZ - 11, TLX + 2, tly + 12, TLZ - 9, B.copper);
      scope.box(TLX, tly + 12, TLZ - 4, TLX + 1, tly + 12, TLZ - 2, B.brassDk); scope.box(TLX, tly + 10, TLZ - 12, TLX + 1, tly + 11, TLZ - 12, B.rune); scope.box(TLX, tly + 10, TLZ + 8, TLX + 1, tly + 10, TLZ + 9, B.iron);
      scope.box(TLX, tly + 9, TLZ - 1, TLX + 1, tly + 9, TLZ + 2, B.brassDk);
      for (let k = 0; k < 4; k++) clutter(OBX + 20 + (k % 2) * 7, OBZ + 26 + (k >> 1) * 7, k);
      planter(OBX - 20, OBZ - 26, UP + 1, 8, true);
      acts.push({
        name: '별시계', hint: '혼천의의 고리들이 빠르게 돌고 망원경이 하늘을 겨누며 별빛이 쏟아져요', hit: [OBX - 16, SY - 16, OBZ - 16, OBX + 16, SY + 16, OBZ + 16],
        run: async a => {
          a.flash('star', 3, 6); a.glow(1.6, 6);
          a.spin('orb1', 6, 6); a.spin('orb2', 6, 6); a.spin('orb3', 6, 6); a.spin('planets', 8, 6);
          a.turn('scope', [-0.6, 0, 0], 1.6);
          for (let k = 0; k < 10; k++) { a.burst([OBX + 0.5, SY, OBZ + 0.5], { n: 26, colors: ['#ffc860', '#fff0c0', '#5affff'], speed: 18, up: 4, life: 1.8, gravity: 0.6, spread: 4 }); await a.wait(0.5); }
          await a.turn('scope', [0.5, 0, 0], 1.4);
        },
      });
      landmarks.push({ name: '별시계 관측소', note: '별의 시간을 재는 놋쇠 혼천의', p: [OBX + 0.5, SY + 24, OBZ + 0.5], tag: 'NEW' });

      // ══════════ 부품 노점 줄(아랫단 남쪽)과 가로수 ══════════
      [[44, 150], [52, 150], [60, 150], [44, 160], [52, 160], [100, 160], [108, 160]].forEach(([x, z], k) => stall(x * 2, z * 2, k % 2 ? B.paintR : B.paint, B.canvas));
      for (const [ox, oz, y] of [[46, 100, LO], [74, 150, LO], [120, 150, LO], [20, 120, LO], [58, 40, UP], [100, 40, UP], [24, 60, UP], [132, 100, LO]]) {
        const x = ox * 2, z = oz * 2;
        if (!free(x - 3, y + 1, z - 3, x + 3, y + 14, z + 3)) continue;
        w.box(x - 3, y, z - 3, x + 3, y, z + 3, B.brassDk); w.box(x - 2, y, z - 2, x + 2, y, z + 2, B.soil);
        for (let k = -2; k <= 2; k += 2) { S(x + k, y, z - 3, B.ironDk); S(x + k, y, z + 3, B.ironDk); }
        tree(x, y + 1, z, 14, 7);
      }
      // 바닥 잔손질: 하수구 격자(2×2)·볼트
      MH.scatter(w, 1600, (x, gg, z, b) => { if ((b === B.plate || b === B.cob) && w.chance(0.08)) { const k = w.chance(0.5) ? B.ironDk : B.curb; for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) if (MH.g(w, x + dx, z + dz) === gg && (w.get(x + dx, gg, z + dz) === B.plate || w.get(x + dx, gg, z + dz) === B.cob) && !w.get(x + dx, gg + 1, z + dz)) S(x + dx, gg, z + dz, k); } });
      return { lights, landmarks, acts, particles: steam };
    },
  });
})();
