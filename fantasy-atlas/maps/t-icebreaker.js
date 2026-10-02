// 쇄빙선 — 핀란드만 얼음에 갇힌 원자력 쇄빙선 「보레아스」(아르크티카급) 전체: 남쪽을 향한 숟가락 뱃머리, 앞쪽 3분의 1에 선 줄무늬 상부 구조물과 조타실, 긴 뒤갑판의 구명정·크레인·컨테이너, 고물의 팔각 헬리패드, 둘레의 갈라진 얼음판과 검은 물길 (168칸)
// 배는 "배 좌표"(x: 고물→이물, z: 가로)로 짓고 월드에는 전치(월드 x = 배 z, 월드 z = 배 x)해서 놓는다 → 이물은 남쪽, 오른쪽 뱃전은 동쪽(기본 카메라 쪽)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 120;
  MAPS.push({
    id: 'icebreaker', cat: 'tarkov', name: '쇄빙선', en: 'Icebreaker · Boreas', color: '#5a8ab0', seed: 603, base: 22, time: 'night', size: [W, D, Hh],
    desc: '타르코프 봉쇄선 안쪽 핀란드만, 얼음에 갇힌 원자력 쇄빙선 「보레아스」. 물류 회사 파라다임 해운의 배지만 무엇을 싣고 어디로 가던 길인지는 아무도 모른다. 남쪽을 향한 뱃머리 뒤로 붉고 푸른 띠를 두른 상부 구조물이 솟고, 고물의 팔각 헬리패드에는 헬기가 앉아 있다. 조타실 탐조등만이 눈보라 속 얼음판을 훑는다.',
    info: { title: '구역 정보', en: 'LOCATION', rows: [['위치', '핀란드만 · 타르코프 봉쇄선 안'], ['소속', '파라다임 해운(Paradigm Shipping)'], ['층', '0층 창고 · 2층 헬리패드 · 3층 체육관 · 9층 조타실'], ['보스', '웨지(3층 체육관) · 나이트(0층)'], ['탈출', '헬리패드 · 녹색 신호탄'], ['모델', '원자력 쇄빙선 「아르크티카」급']] },
    sky: ['#1a2638', '#05080f', '#2c4462'], stars: true,
    hemi: ['#9ab4d8', '#141a24', 0.5], sun: ['#c0d4f4', 0.42, [0.5, 1, 0.7]],
    day: { sky: ['#a8b4c0', '#6a7c90', '#dce4ea'], stars: false, hemi: ['#e8f0f8', '#4a5462', 0.6], sun: ['#f0f4ff', 0.6, [0.5, 1, 0.7]], haze: '#b8c6d4' },
    liquid: ['#0a141e', '#16283a', '#4a6a84'], liqSpeed: 0.12,
    fog: { box: [84, 84, 92, 92], start: 0.84, floor: 10, depth: 10, haze: [30, 0.3, 10], hazeColor: '#3a4c62' },
    camY: 6, zoom: 1.15,
    particles: [
      { n: 1100, colors: ['#ffffff', '#e4eef8', '#c0d4e8'], mode: 'fall', speed: 0.9, wind: 1.6, y0: 18, y1: 116, glow: false },
      { n: 34, colors: ['#5affb0', '#3ae0c8', '#a0ffd8'], mode: 'wisp', speed: 0.3, size: 2, y0: 104, glow: true },
    ],
    blocks: {
      // 얼음판
      snowI: { c: '#9eb2c4', top: '#e2ebf2', v: 0.04 }, snow2: { c: '#94a8bc', top: '#d0dce8', v: 0.05 }, iceB: { c: '#7aa0b8', top: '#a4c6da', v: 0.05 },
      iceThin: { c: '#5a7e98', top: '#6e94ae', v: 0.05 }, crack: { c: '#3a5268', top: '#466078', v: 0.04 }, sea: { c: '#0e1820', v: 0.03 },
      iceBlk: { c: '#a8cce0', top: '#e8f4fa', v: 0.06 }, iceBlk2: { c: '#7eaac4', top: '#c8e0ee', v: 0.06 },
      // 선체: 짙은 남색 윗선체, 붉은 아랫선체, 흰 흘수선, 초록 갑판
      hullN: { c: '#1e2a3a', v: 0.04 }, hullR: { c: '#8a2a24', v: 0.05 }, hullW: { c: '#d8dcdc', v: 0.02 }, rust: { c: '#5a3226', v: 0.06 },
      deck: { c: '#3e4a3a', top: '#4c5a46', v: 0.05, pat: 'floor' }, snowD: { c: '#b4c2ce', top: '#e0e8f0', v: 0.04 },
      rail: { c: '#9aa0a6', v: 0.03 }, iron: { c: '#2c3036', v: 0.03 }, chain: { c: '#3a3634', v: 0.04 }, port: { c: '#ffe2a8', night: true, day: '#3a4650' },
      // 상부 구조물: 밝은 회색 벽에 흰·파랑·빨강 띠
      sWall: { c: '#a8b0b8', v: 0.03, pat: 'big' }, sTrim: { c: '#d4d8dc', v: 0.02 }, sRoof: { c: '#3c4248', v: 0.03 }, stripeB: { c: '#2a5a9a', v: 0.03 }, stripeR: { c: '#a8362e', v: 0.03 }, stripeW: { c: '#e4e8ec', v: 0.02 },
      win: { c: '#ffe0a0', night: true, day: '#3a4a58' }, winD: { c: '#2a3440', v: 0.03 }, brWin: { c: '#c4f0ff', night: true, day: '#2a4652' }, frame: { c: '#2a2e34', v: 0.02 },
      gymWin: { c: '#ffb058', night: true, day: '#4a4032' }, doorS: { c: '#4a525a', v: 0.03 }, boatO: { c: '#e8702a', v: 0.04 }, brass: { c: '#c8a050', v: 0.05 },
      mastN: { c: '#24324a', v: 0.03 }, dome: { c: '#e8ecee', v: 0.02 },
      // 원자로·헬리패드·크레인
      vent: { c: '#8a9298', v: 0.04, pat: 'plank' }, ventG: { c: '#6affc8', glow: true }, hazY: { c: '#e8c030', v: 0.03 }, hazK: { c: '#1a1a1a', v: 0.02 },
      pad: { c: '#2e3434', top: '#3a4242', v: 0.03, pat: 'check', alt: '#323a3a' }, padW: { c: '#e8ecec', v: 0.02 }, padG: { c: '#5aff7a', glow: true }, padL: { c: '#ffb040', glow: true },
      craneO: { c: '#c8482a', v: 0.04 }, cable: { c: '#1e2024', v: 0.02 },
      cOr: { c: '#c8642a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cBl: { c: '#2e5a8a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cGr: { c: '#3e6a4a', top: '#d8e2ea', v: 0.04, pat: 'plank' },
      cGy: { c: '#7a8088', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cWh: { c: '#c8ccc8', top: '#e4eaee', v: 0.03, pat: 'plank' }, cTeal: { c: '#2a8a8a', v: 0.03 },
      hatch: { c: '#5a6068', top: '#6a7078', v: 0.04, pat: 'plank' },
      // 불빛
      lampW: { c: '#f4fbff', glow: true }, redL: { c: '#ff3a2a', glow: true }, navW: { c: '#ffffff', glow: true }, navG: { c: '#3aff6a', glow: true }, beamL: { c: '#cfeeff', glow: true },
      // 얼음 위 야영지·헬기·호버크래프트
      tent: { c: '#4a5238', v: 0.04 }, tentDk: { c: '#384028', v: 0.04 }, crateM: { c: '#4e5a3a', top: '#c8d4dc', v: 0.05, pat: 'plank' }, sandbag: { c: '#8a7e62', top: '#b4b0a0', v: 0.08 },
      gen: { c: '#b89a3a', v: 0.04 }, barrelB: { c: '#2e4a7a', v: 0.04 }, barrelR: { c: '#8a3a2a', v: 0.04 }, sled: { c: '#a8282a', v: 0.04 },
      heliO: { c: '#d8642a', v: 0.04 }, heliWt: { c: '#dcdcd8', v: 0.03 }, heliDk: { c: '#2e342e', v: 0.03 }, heliGl: { c: '#9ac8d8', night: true, day: '#5a7a88' },
      skirt: { c: '#1e2022', v: 0.04 }, hover: { c: '#5a6a5a', v: 0.04 }, flareG: { c: '#5aff7a', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base, n = w.noise;
      const lights = [], acts = [], landmarks = [];
      // ── 배 좌표 ↔ 월드 좌표(전치) ──
      const wrap = t => ({
        set: (x, y, z, b) => t.set(z, y, x, b), get: (x, y, z) => t.get(z, y, x),
        box: (x0, y0, z0, x1, y1, z1, b) => t.box(z0, y0, x0, z1, y1, x1, b),
        cyl: (cx, cz, y0, y1, r, b) => t.cyl(cz, cx, y0, y1, r, b), sphere: (cx, cy, cz, r, b) => t.sphere(cz, cy, cx, r, b),
        ellipsoid: (cx, cy, cz, rx, ry, rz, b) => t.ellipsoid(cz, cy, cx, rz, ry, rx, b),
        line: (x0, y0, z0, x1, y1, z1, b) => t.line(z0, y0, x0, z1, y1, x1, b), liquid: (x, z, y) => t.liquid(z, x, y),
      });
      const S = wrap(w), T = p => [p[2], p[1], p[0]], TH = h => [h[2], h[1], h[0], h[5], h[4], h[3]], TR = r => [-r[2], -r[1], -r[0]];
      const sprop = o => wrap(w.prop(Object.assign({}, o, { pivot: T(o.pivot) }, o.rot0 ? { rot0: TR(o.rot0) } : {})));
      const burst = (a, p, o) => a.burst(T(p), o);
      const yawTo = (a, name, ang, d) => a.turn(name, [0, -ang, 0], d);     // 배 좌표에서 +x → +z 쪽으로 도는 각

      const CZ = 60, HW = 15, DK = G + 13;                                  // 중심선(월드 x), 반폭, 주갑판
      const deckY = x => DK + Math.floor(Math.max(0, x - 118) * 0.14);
      const tipX = y => 136 + (y - G);                                      // 숟가락 뱃머리
      const hwAt = (x, y) => {
        let b = HW - (y < G + 3 ? (G + 3 - y) * 0.5 : 0);
        if (x < 4) return -1;
        if (x < 20) b *= 0.7 + 0.3 * (x - 4) / 16;                          // 넓적한 고물
        if (x <= 112) return b;
        const t = (x - 112) / (tipX(y) - 112);
        return t >= 1 ? -1 : b * Math.pow(1 - Math.pow(t, 2.2), 0.5);
      };
      const inHull = (x, y, z) => Math.abs(z + 0.5 - CZ) <= hwAt(x, y);
      const segD = (px, pz, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (pz - a[1]) * dz) / (dx * dx + dz * dz))); return Math.hypot(px - a[0] - dx * t, pz - a[1] - dz * t); };

      // ── 얼음판(월드 좌표): 눈 덮인 해빙, 맨얼음, 금, 고물 뒤 항적 물길, 동쪽 뱃전에서 남동쪽으로 뻗은 물길, 웅덩이 둘 ──
      const LEAD = [[76, 112], [90, 122], [104, 134], [120, 142], [140, 152], [167, 160]];
      const wm = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let wet = false, floeT = 0.6;
        let dl = 1e9; for (let k = 0; k < LEAD.length - 1; k++) dl = Math.min(dl, segD(x, z, LEAD[k], LEAD[k + 1]));
        if (dl < 2.2 + n.fbm(x * 0.07, z * 0.07) * 4 + Math.max(0, x - 76) * 0.02) wet = true;
        if (z < 22 && Math.abs(x + 0.5 - CZ) < 24 - z * 0.4 + n.fbm(x * 0.1 + 4, z * 0.1) * 6) { wet = true; floeT = 0.5; }
        if (Math.hypot(x - 130, (z - 70) * 1.3) < 7 + n.fbm(x * 0.2, z * 0.2) * 4) wet = true;
        if (Math.hypot((x - 20) * 1.3, z - 118) < 6 + n.fbm(x * 0.2, z * 0.2) * 4) wet = true;
        if (wet && n.fbm(x * 0.16 + 11, z * 0.16 + 3) > floeT) wm[x + W * z] = 2;   // 떠다니는 얼음 조각
        else if (wet) wm[x + W * z] = 1;
      }
      const nearWet = (x, z, r) => { for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) { const xx = x + dx, zz = z + dz; if (xx >= 0 && zz >= 0 && xx < W && zz < D && wm[xx + W * zz] === 1) return true; } return false; };
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const m = wm[x + W * z];
        if (m === 1) { w.set(x, G - 3, z, B.sea); continue; }
        if (m === 2) { w.box(x, G - 3, z, x, G - 1, z, hash3(x, 2, z) > 0.5 ? B.iceBlk : B.iceBlk2); continue; }
        const n1 = n.fbm(x * 0.05, z * 0.05), cr = n.ridge(x * 0.035 + 5, z * 0.035 + 9);
        let b = cr > 0.84 ? B.crack : n1 > 0.62 ? B.iceB : (hash3(x, 1, z) > 0.92 ? B.snow2 : B.snowI);
        if (b !== B.crack && nearWet(x, z, 2)) b = B.iceThin;
        w.box(x, G - 3, z, x, G - 1, z, B.iceB); w.set(x, G, z, b);
        if (b === B.snowI && n.fbm(x * 0.09 + 3, z * 0.09 + 7) > 0.66) w.set(x, G + 1, z, B.snowI);   // 눈 둔덕
      }
      const wet = (x, z) => wm[z + W * x] === 1;                             // 배 좌표로 물인지

      // ── 선체(배 좌표) ──
      for (let x = 4; x <= 156; x++) {
        const dy = deckY(x);
        for (let y = G - 3; y <= dy; y++) for (let z = CZ - HW - 1; z <= CZ + HW + 1; z++) {
          if (!inHull(x, y, z)) continue;
          let b = y <= G + 4 ? B.hullR : y === G + 5 ? B.hullW : B.hullN;
          if (y === dy) b = hash3(x, 5, z) > 0.72 ? B.snowD : B.deck;
          S.set(x, y, z, b);
        }
        for (let z = CZ - HW - 1; z <= CZ + HW + 1; z++) {                  // 갑판 가장자리: 앞은 높은 현장, 나머지는 난간
          if (!inHull(x, dy, z)) continue;
          if (inHull(x, dy, z + 1) && inHull(x, dy, z - 1) && inHull(x + 1, dy, z) && inHull(x - 1, dy, z)) continue;
          if (x >= 116) { S.set(x, dy + 1, z, B.hullN); S.set(x, dy + 2, z, B.hullW); }
          else { if (x % 3 === 0) S.set(x, dy + 1, z, B.rail); S.set(x, dy + 2, z, B.rail); }
        }
      }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (wm[x + W * z] === 1 && !w.get(x, G - 1, z)) w.liquid(x, z, G - 1);
      const outZ = (x, y) => { for (let z = CZ + HW + 1; z > CZ; z--) if (S.get(x, y, z) && inHull(x, y, z)) return z; return -1; };   // 동쪽 뱃전 바깥 면
      for (let x = 10; x <= 112; x += 4) for (const y of [G + 8, G + 11]) {   // 둥근 창과 녹물
        const z = outZ(x, y); if (z < 0) continue;
        S.set(x, y, z, hash3(x, y, 2) > 0.45 ? B.port : B.winD);
        if (hash3(x, y, 9) > 0.6) for (let k = 1; k <= 1 + (hash3(x, 3, y) * 4 | 0); k++) { const zz = outZ(x, y - k); if (zz > 0 && y - k > G + 5) S.set(x, y - k, zz, B.rust); }
      }
      // 뱃머리 이름 「БОРЕЙ」: 동쪽에서 보면 왼쪽→오른쪽이 배 x가 줄어드는 쪽
      const FONT = { Б: ['111', '100', '110', '101', '110'], О: ['111', '101', '101', '101', '111'], Р: ['110', '101', '110', '100', '100'], Е: ['111', '100', '110', '100', '111'], Й: ['0110', '1001', '1011', '1101', '1001'] };
      let off = 0;
      for (const ch of 'БОРЕЙ') { const g = FONT[ch]; g.forEach((row, r) => [...row].forEach((c, k) => { if (c !== '1') return; const x = 138 - off - k, y = G + 14 - r, z = outZ(x, y); if (z > 0) S.set(x, y, z, B.hullW); })); off += g[0].length + 1; }
      { const ax = 142, az = outZ(ax, G + 12);                               // 닻
        if (az > 0) { S.box(ax - 1, G + 11, az, ax + 1, G + 13, az, B.iron); S.box(ax, G + 8, az + 1, ax, G + 12, az + 1, B.chain); S.box(ax - 1, G + 7, az + 1, ax + 1, G + 7, az + 1, B.chain); S.set(ax - 2, G + 8, az + 1, B.chain); S.set(ax + 2, G + 8, az + 1, B.chain); } }

      // ── 선체에 밀려 쌓인 얼음 능선, 뱃머리 앞 얼음 더미, 쇄빙 돌진용 깨진 얼음 자리 ──
      const SLAB = [139, 151, CZ - 7, CZ + 7], inSlab = (x, z) => x >= SLAB[0] && x <= SLAB[1] && z >= SLAB[2] && z <= SLAB[3];
      for (let x = 4; x <= 138; x++) for (const s of [-1, 1]) {
        if (s > 0 && x >= 34 && x <= 56) continue;                            // 사다리 아래는 비운다
        const hw = hwAt(x, G + 1); if (hw < 0) continue;
        const zE = s > 0 ? Math.floor(CZ + hw - 0.5) : Math.ceil(CZ - hw - 0.5);
        for (let k = 1; k <= 6; k++) {
          const z = zE + s * k; if (z < 0 || z >= W || wet(x, z)) continue;
          const h = Math.floor(hash3(x, k, z) * 4.2 * (1 - k / 7) + n.fbm(x * 0.2, z * 0.2) * 1.5);
          for (let y = G + 1; y <= G + h; y++) S.set(x, y, z, hash3(x, y, z) > 0.4 ? B.iceBlk : B.iceBlk2);
        }
      }
      for (let x = 134; x < D; x++) for (let z = CZ - 18; z <= CZ + 18; z++) {
        if (inSlab(x, z) || wet(x, z)) continue;
        const d = Math.hypot((x - 138) * 0.8, z + 0.5 - CZ); if (d > 17) continue;
        const h = Math.floor(hash3(x, 7, z) * 4.5 * (1 - d / 18) + 0.6);
        for (let y = G + 1; y <= G + h; y++) if (!S.get(x, y, z)) S.set(x, y, z, hash3(x, y, z) > 0.5 ? B.iceBlk : B.iceBlk2);
      }
      for (let x = SLAB[0]; x <= SLAB[1]; x++) for (let z = SLAB[2]; z <= SLAB[3]; z++) { S.box(x, G - 2, z, x, G + 3, z, 0); S.set(x, G - 3, z, B.sea); S.liquid(x, z, G - 1); }

      // ── 상부 구조물: 앞쪽 3분의 1에 선다. 2·3층은 뒤로 길고, 4~6층은 앞 모서리를 깎은 넓은 덩어리에 빨강·파랑·흰 띠, 7·8층은 좁다 ──
      const FH = 5;
      const LV = [[66, 118, 13, 0], [70, 118, 13, 0], [84, 116, 13, 5], [84, 116, 13, 5], [84, 116, 13, 5], [92, 112, 10, 3], [92, 112, 10, 3]];   // [x0, x1, 반폭, 앞 모서리 깎기]
      const lvIn = (L, x, z) => { const dz = Math.abs(z + 0.5 - CZ); return x >= L[0] && x <= L[1] && dz <= L[2] + 0.5 && (L[1] - x) + (L[2] + 0.5 - dz) >= L[3]; };
      const lvWall = [B.sWall, B.sWall, B.stripeR, B.stripeB, B.stripeW, B.sWall, B.sWall];
      LV.forEach((L, k) => {
        const y0 = DK + 1 + k * FH;
        for (let x = L[0]; x <= L[1]; x++) for (let z = CZ - L[2] - 1; z <= CZ + L[2]; z++) {
          if (!lvIn(L, x, z)) continue;
          const sh = !lvIn(L, x + 1, z) || !lvIn(L, x - 1, z) || !lvIn(L, x, z + 1) || !lvIn(L, x, z - 1);
          for (let y = y0; y < y0 + FH; y++) {
            if (!sh) { S.set(x, y, z, B.sWall); continue; }
            const fy = y - y0, u = x + z;
            let b = fy === 0 ? B.sTrim : lvWall[k];
            if (fy >= 2 && fy <= 3 && u % 4 >= 1 && u % 4 <= 2) b = hash3(u >> 2, k, x * 3 + z) > 0.5 ? B.win : B.winD;
            S.set(x, y, z, b);
          }
          if (sh && !S.get(x, y0 + FH, z)) S.set(x, y0 + FH, z, B.rail);    // 층 지붕 둘레 난간
        }
      });
      // 3층 체육관(배 앞쪽 동면): 넓은 주황 창과 바벨 걸이
      const GY = DK + 1 + FH, GZ = CZ + 13;
      for (let x = 98; x <= 114; x++) for (let y = GY + 1; y <= GY + 3; y++) S.set(x, y, GZ, (x % 5 === 0 && y === GY + 2) ? B.iron : (x % 6 === 2 ? B.frame : B.gymWin));
      lights.push({ name: 'gym', p: T([106.5, GY + 2, GZ + 1.5]), c: '#ffb060', i: 0.45, d: 22, flicker: 0.15, srcR: 4 });
      landmarks.push({ name: '3층 체육관', note: '웨지(The Wedge)와 중무장 경호대가 지키는 곳', p: T([106.5, GY + 10, GZ + 2]), boss: true });
      acts.push({
        name: '3층 체육관', hint: '3층 체육관 창에 불이 번쩍 들어오고, 웨지 일당의 운동기구가 쩔그렁 울려요', hit: TH([98, GY, GZ - 1, 114, GY + 4, GZ + 1]),
        run: async a => {
          a.flash('gym', 6, 4.5);
          for (let k = 0; k < 9; k++) { burst(a, [98.5 + (k * 7) % 17, GY + 2, GZ + 1.2], { n: 12, colors: ['#ffb058', '#ffe0a0', '#ffffff'], speed: 1.6, up: 1, life: 0.7, gravity: 2, spread: 0.6 }); await a.wait(0.35); }
        },
      });
      // 앞면 출입문, 갑판 투광등
      S.box(118, DK + 1, CZ - 2, 118, DK + 3, CZ + 1, B.doorS);
      for (const z of [CZ - 8, CZ + 7]) S.box(117, DK + 12, z, 117, DK + 12, z + 1, B.lampW);
      lights.push({ name: 'deck', p: T([119, DK + 11, CZ]), c: '#ffe8c0', i: 0.55, d: 38, flicker: 0.05, srcR: 10 });
      // 구명정(주황 캡슐): 상부 구조물 뒤쪽 양 뱃전
      for (const bx of [74, 88]) for (const s of [-1, 1]) {
        const bz = CZ - 0.5 + s * 16.5;
        S.ellipsoid(bx, DK + 8, Math.round(bz), 5.4, 1.8, 1.6, B.boatO); S.box(bx - 3, DK + 10, Math.round(bz), bx + 3, DK + 10, Math.round(bz), B.hullW);
        for (const dx of [-4, 4]) { const z0 = Math.round(CZ - 0.5 + s * 14); S.box(bx + dx, DK + 6, z0, bx + dx, DK + 11, z0, B.iron); S.box(bx + dx, DK + 11, Math.min(z0, Math.round(bz)), bx + dx, DK + 11, Math.max(z0, Math.round(bz)), B.iron); }
      }

      // ── 9층 조타실: 앞과 넓은 날개로 이어진 창 띠, 10층 지붕에 레이돔 둘·남색 돛대·레이더·탐조등 ──
      const BY = DK + 1 + LV.length * FH, BX0 = 96, BX1 = 114, WX0 = 106;
      S.box(BX0, BY, CZ - 10, BX1, BY + 4, CZ + 9, B.sWall); S.box(WX0, BY, CZ - 16, BX1, BY + 4, CZ + 15, B.sWall);
      const bwin = (x, y, z) => S.set(x, y, z, ((x + z) % 4 === 0) ? B.frame : B.brWin);
      for (let y = BY + 1; y <= BY + 3; y++) {
        for (let z = CZ - 15; z <= CZ + 14; z++) bwin(BX1, y, z);
        for (let x = WX0 + 1; x < BX1; x++) { bwin(x, y, CZ + 15); bwin(x, y, CZ - 16); }
        for (let x = BX0 + 1; x < WX0; x++) { bwin(x, y, CZ + 9); bwin(x, y, CZ - 10); }
      }
      S.box(BX0, BY, CZ - 10, BX1, BY, CZ + 9, B.sTrim); S.box(WX0, BY, CZ - 16, BX1, BY, CZ + 15, B.sTrim);
      S.box(BX0, BY + 5, CZ - 10, BX1 + 1, BY + 5, CZ + 9, B.sRoof); S.box(WX0, BY + 5, CZ - 17, BX1 + 1, BY + 5, CZ + 16, B.sRoof);
      lights.push({ name: 'bridge', p: T([BX1 + 1.5, BY + 2, CZ]), c: '#bfe8ff', i: 0.5, d: 30, flicker: 0.05, srcR: 4 });
      for (const z of [CZ - 7, CZ + 6]) { S.box(102, BY + 6, z, 102, BY + 7, z, B.rail); S.sphere(102, BY + 9, z, 1.8, B.dome); }   // 레이돔
      const MX = 99, MTOP = BY + 24;
      S.box(MX - 1, BY + 6, CZ - 2, MX + 1, BY + 12, CZ + 1, B.mastN); S.box(MX, BY + 13, CZ - 1, MX + 1, MTOP, CZ, B.mastN);
      S.box(MX, BY + 18, CZ - 7, MX, BY + 18, CZ + 6, B.rail);
      S.set(MX, MTOP + 1, CZ - 1, B.redL); S.set(MX + 1, MTOP + 1, CZ, B.redL); S.set(MX, BY + 19, CZ - 7, B.redL); S.set(MX, BY + 19, CZ + 6, B.redL);
      S.box(MX + 2, BY + 14, CZ - 1, MX + 3, BY + 15, CZ, B.brass);           // 기적
      lights.push({ name: 'mast', p: T([MX + 0.5, MTOP + 1, CZ]), c: '#ff4a3a', i: 0.35, d: 22, flicker: 0.1, srcR: 3 });
      for (const [x, z, h] of [[97, CZ - 9, 6], [97, CZ + 8, 5], [108, CZ - 12, 4]]) S.box(x, BY + 6, z, x, BY + 5 + h, z, B.rail);
      S.box(110, BY + 6, CZ, 110, BY + 8, CZ, B.iron);                       // 레이더 받침
      for (const z of [CZ - 16, CZ + 14]) { S.box(BX1 - 1, BY + 6, z, BX1 - 1, BY + 7, z + 1, B.iron); S.box(BX1, BY + 6, z, BX1, BY + 7, z + 1, B.lampW); }   // 탐조등
      lights.push({ name: 'search', p: T([BX1 + 1.5, BY + 7, CZ + 15]), c: '#e8f6ff', i: 0.35, d: 40, flicker: 0.05, srcR: 3 });
      landmarks.push({ name: '조타실', note: '9층 · 「보레아스」의 심장, 날개 끝에 탐조등', p: T([108.5, BY + 30, CZ]), tag: 'BRIDGE' });

      // ── 원자로 환기탑: 상부 구조물 뒤쪽 낮은 데크하우스 지붕 위 ──
      const VX0 = 71, VX1 = 81, VZ0 = CZ - 7, VZ1 = CZ + 6, VT = DK + 26;
      S.box(VX0, DK + 11, VZ0, VX1, VT, VZ1, B.vent);
      for (let y = VT - 3; y <= VT - 1; y++) {
        for (let x = VX0; x <= VX1; x++) if (x % 2 === 0) { S.set(x, y, VZ1, B.ventG); S.set(x, y, VZ0, B.ventG); }
        for (let z = VZ0; z <= VZ1; z++) if (z % 2 === 0) { S.set(VX1, y, z, B.ventG); S.set(VX0, y, z, B.ventG); }
      }
      S.box(VX0 - 1, VT + 1, VZ0 - 1, VX1 + 1, VT + 1, VZ1 + 1, B.sRoof);
      const PIPES = [[73, VZ0 + 2], [78, VZ0 + 2], [73, VZ1 - 3], [78, VZ1 - 3]];
      for (const [x, z] of PIPES) S.box(x, VT + 2, z, x + 1, VT + 5, z + 1, B.rail);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {     // 방사능 표지(동면)
        const r = Math.hypot(dx, dy), th = Math.atan2(dy, dx), blade = r >= 1.2 && r <= 3 && Math.cos(3 * (th - Math.PI / 2)) > 0.5;
        S.set(76 - dx, DK + 18 + dy, VZ1 + 1, (r < 0.8 || blade) ? B.hazK : B.hazY);
      }
      lights.push({ name: 'reactor', p: T([76.5, VT - 2, VZ1 + 1.5]), c: '#6affc8', i: 0.4, d: 26, flicker: 0.2, srcR: 3 });
      landmarks.push({ name: '원자로 환기탑', note: '선체 깊은 곳 원자로의 숨구멍', p: T([76.5, VT + 12, CZ]) });
      acts.push({
        name: '원자로 환기탑', hint: '환기탑 창살에 청록빛이 차오르고, 굴뚝 넷에서 하얀 김이 뿜어져 나와요', hit: TH([VX0, VT - 4, VZ0, VX1, VT + 5, VZ1]),
        run: async a => {
          a.flash('reactor', 6, 5); a.glow(1.8, 5);
          for (let k = 0; k < 12; k++) { const [x, z] = PIPES[k % 4]; burst(a, [x + 1, VT + 6, z + 1], { n: 16, colors: ['#ffffff', '#d8e8f0', '#a8ffe0'], speed: 1.4, up: 7, life: 2, gravity: -1, spread: 1 }); await a.wait(0.35); }
        },
      });

      // ── 고물의 팔각 헬리패드: 2층 높이, 어두운 그물판에 노란 원과 흰 H, 가장자리 주황·초록 등 ──
      const PCX = 22, PY = DK + 5, PR = 14;
      const padIn = (dx, dz) => Math.max(Math.abs(dx), Math.abs(dz)) <= PR && Math.abs(dx) + Math.abs(dz) <= 19;
      for (let dz = -PR; dz <= PR; dz++) for (let dx = -PR; dx <= PR; dx++) {
        if (!padIn(dx, dz + 0.5)) continue;
        const x = PCX + dx, z = Math.floor(CZ + dz), r = Math.hypot(dx, z + 0.5 - CZ);
        const edge = !padIn(dx + 1, dz + 0.5) || !padIn(dx - 1, dz + 0.5) || !padIn(dx, dz + 1.5) || !padIn(dx, dz - 0.5);
        let b = B.pad;
        if (edge) { b = (x + z) % 3 === 0 ? ((x + z) % 2 ? B.padG : B.padL) : B.rail; S.set(x, PY + 1, z, (x + z) % 3 === 0 ? 0 : B.rail); }
        else if (r > 8 && r < 9.3) b = B.hazY;
        else if ((Math.abs(z + 0.5 - CZ) >= 2.5 && Math.abs(z + 0.5 - CZ) <= 3.5 && Math.abs(dx) <= 4) || (Math.abs(dx) === 0 && Math.abs(z + 0.5 - CZ) < 3)) b = B.padW;
        S.set(x, PY, z, b);
      }
      for (const [dx, dz] of [[-12, -8], [-12, 7], [12, -8], [12, 7], [0, -13], [0, 12]]) S.box(PCX + dx, DK + 1, CZ + dz, PCX + dx, PY - 1, CZ + dz, B.iron);
      lights.push({ name: 'pad', p: T([PCX + 0.5, PY + 2, CZ + 14]), c: '#ffc070', i: 0.35, d: 26, flicker: 0.1, srcR: 4 });
      landmarks.push({ name: '헬리패드', note: '2층 고물 · 녹색 신호탄을 쏘아 올리면 헬기가 오는 탈출 지점', p: T([PCX + 0.5, PY + 16, CZ]) });

      // ── 뒤갑판: 주황빛 크레인 둘, 컨테이너, 화물 상자 / 앞갑판: 화물창 덮개, 양묘기, 기관총 둥지, 앞 돛대 ──
      const CRX = 48;
      for (const cz of [CZ - 11, CZ + 10]) { S.cyl(CRX, cz, DK + 1, DK + 6, 1.6, B.craneO); S.cyl(CRX, cz, DK + 6, DK + 6, 2.2, B.iron); }
      S.box(CRX - 1, DK + 7, CZ - 12, CRX + 2, DK + 9, CZ - 9, B.craneO); S.set(CRX - 1, DK + 8, CZ - 10, B.brWin);   // 서쪽 크레인(고정): 붐을 높이 세웠다
      S.line(CRX - 1, DK + 9, CZ - 11, CRX - 8, DK + 26, CZ - 11, B.craneO); S.line(CRX - 1, DK + 9, CZ - 10, CRX - 8, DK + 26, CZ - 10, B.craneO);
      S.box(CRX - 8, DK + 20, CZ - 11, CRX - 8, DK + 25, CZ - 11, B.cable);
      const cont = (x0, y0, z0, b) => { S.box(x0, y0, z0, x0 + 6, y0 + 2, z0 + 2, b); S.box(x0, y0, z0, x0, y0 + 2, z0 + 2, B.iron); S.box(x0 + 6, y0, z0, x0 + 6, y0 + 2, z0 + 2, B.iron); };
      cont(54, DK + 1, CZ - 7, B.cBl); cont(54, DK + 1, CZ - 3, B.cOr); cont(54, DK + 4, CZ - 7, B.cGr); cont(54, DK + 1, CZ + 1, B.cGy); cont(54, DK + 4, CZ - 3, B.cWh);
      for (let x = 55; x <= 59; x++) S.set(x, DK + 5, CZ - 1, x % 2 ? B.cTeal : B.cWh);   // 파라다임 해운 띠
      for (const [x, z, h] of [[38, CZ - 6, 2], [40, CZ - 6, 1], [38, CZ + 3, 1], [42, CZ + 4, 2]]) S.box(x, DK + 1, z, x + 1, DK + h, z + 1, B.crateM);
      for (let x = 120; x <= 128; x++) for (let z = CZ - 6; z <= CZ + 5; z++) S.box(x, deckY(x) + 1, z, x, DK + 3, z, (z === CZ - 6 || z === CZ + 5 || x === 120 || x === 128) ? B.iron : B.hatch);
      for (const x of [62, 124, 134]) for (const s of [-1, 1]) { const z = Math.round(CZ - 0.5 + s * (hwAt(x, deckY(x)) - 2.5)); S.box(x, deckY(x) + 1, z, x, deckY(x) + 2, z, B.iron); S.box(x + 2, deckY(x) + 1, z, x + 2, deckY(x) + 2, z, B.iron); }
      const WY = deckY(132);
      S.box(131, WY + 1, CZ - 6, 134, WY + 2, CZ - 4, B.iron); S.box(131, WY + 1, CZ + 3, 134, WY + 2, CZ + 5, B.iron); S.box(132, WY + 1, CZ - 3, 133, WY + 1, CZ + 2, B.rail);
      S.line(135, WY + 1, CZ - 5, 142, deckY(142) + 1, CZ - 10, B.chain); S.line(135, WY + 1, CZ + 4, 142, deckY(142) + 1, CZ + 9, B.chain);
      const NX = 146, NY = deckY(NX);                                          // 기관총 둥지(로그의 흔적)
      for (let dz = -4; dz <= 4; dz++) for (let dx = -3; dx <= 3; dx++) { const r = Math.hypot(dx, dz * 0.8); if (r > 2.4 && r < 3.6 && !(dx < -1 && Math.abs(dz) < 2)) S.box(NX + dx, NY + 1, CZ + dz, NX + dx, NY + 2, CZ + dz, B.sandbag); }
      S.box(NX, NY + 1, CZ, NX, NY + 2, CZ, B.iron); S.box(NX - 1, NY + 3, CZ, NX + 4, NY + 3, CZ, B.iron); S.set(NX - 1, NY + 1, CZ + 1, B.crateM);
      landmarks.push({ name: '뱃머리', note: '남쪽 얼음을 밀어붙인 숟가락 뱃머리 · 그 아래 0층에 나이트(Knight)가 머문다', p: T([142.5, NY + 14, CZ]) });
      const FMX = 138, FMY = deckY(FMX);
      S.box(FMX, FMY + 1, CZ, FMX, FMY + 12, CZ, B.rail); S.box(FMX, FMY + 9, CZ - 3, FMX, FMY + 9, CZ + 3, B.rail); S.set(FMX, FMY + 13, CZ, B.navW);
      S.set(FMX, FMY + 10, CZ - 3, B.redL); S.set(FMX, FMY + 10, CZ + 3, B.navG);
      lights.push({ name: 'bow', p: T([FMX + 0.5, FMY + 13, CZ + 0.5]), c: '#e8f4ff', i: 0.4, d: 32, flicker: 0.05, srcR: 3 });

      // ── 동쪽 뱃전에서 얼음으로 내려가는 사다리 ──
      for (let k = 0; k <= 12; k++) { const x = 52 - k, y = DK - k; S.box(x, y, CZ + 16, x, y, CZ + 17, B.rail); S.set(x, y + 2, CZ + 18, B.rail); if (k % 3 === 0) S.box(x, y, CZ + 18, x, y + 1, CZ + 18, B.rail); }
      S.box(37, G + 1, CZ + 16, 39, G + 1, CZ + 18, B.iron);

      // ── 얼음 위 야영지(블랙 디비전, 월드 좌표: 동쪽 뱃전 옆) ──
      for (const [tx, tz] of [[84, 30], [84, 42]]) for (let x = tx; x <= tx + 6; x++) {   // 천막 둘(남북으로 긴 A자)
        const h = 4 - Math.abs(x - tx - 3);
        for (let z = tz; z <= tz + 9; z++) { w.set(x, G + 1 + h, z, h === 4 ? B.tentDk : B.tent); if (z === tz || z === tz + 9) w.box(x, G + 1, z, x, G + h, z, B.tent); }
      }
      w.box(87, G + 1, 52, 87, G + 3, 52, B.tentDk);
      w.box(94, G + 1, 50, 96, G + 3, 53, B.gen); w.box(95, G + 4, 51, 95, G + 4, 52, B.iron);
      w.box(92, G + 1, 58, 92, G + 9, 58, B.iron); w.box(91, G + 10, 57, 93, G + 10, 59, B.iron); w.box(91, G + 9, 59, 93, G + 9, 59, B.lampW); w.box(91, G + 9, 57, 91, G + 9, 58, B.lampW);
      lights.push({ name: 'camp', p: [92.5, G + 8, 60.5], c: '#ffe0b0', i: 0.55, d: 28, flicker: 0.1, srcR: 3 });
      w.box(100, G + 1, 40, 101, G + 2, 42, B.crateM); w.set(100, G + 3, 41, B.flareG);
      for (let z = 26; z <= 62; z++) if (z % 9 !== 4) w.box(104 + (z > 44 ? 1 : 0), G + 1, z, 104 + (z > 44 ? 1 : 0), G + 2, z, B.sandbag);
      for (const [x, z, h] of [[82, 56, 2], [82, 58, 1], [84, 56, 1], [96, 34, 2], [98, 30, 1], [94, 60, 1]]) w.box(x, G + 1, z, x + 1, G + h, z + 1, B.crateM);
      for (const [x, z, b] of [[90, 54, B.barrelB], [91, 55, B.barrelR], [90, 40, B.barrelB], [82, 28, B.barrelR]]) w.box(x, G + 1, z, x, G + 2, z, b);
      w.box(108, G + 1, 50, 110, G + 1, 54, B.sled); w.box(108, G + 2, 51, 110, G + 2, 52, B.sled); w.box(109, G + 2, 54, 109, G + 3, 54, B.frame); w.box(108, G + 1, 49, 110, G + 1, 49, B.rail);
      landmarks.push({ name: '얼음 위 야영지', note: '블랙 디비전이 동쪽 뱃전 옆에 세운 전진 기지', p: [92.5, G + 14, 44.5] });

      // ── 호버크래프트(월드 좌표, 남동쪽 얼음): 검은 고무 치마, 조종실, 뒤쪽 덕트 프로펠러 둘 ──
      const HX0 = 112, HX1 = 120, HZ0 = 90, HZ1 = 106, HCX = 116;
      for (let z = HZ0; z <= HZ1; z++) for (let x = HX0; x <= HX1; x++) {
        if ((x === HX0 || x === HX1) && (z === HZ0 || z === HZ1)) continue;
        w.box(x, G + 1, z, x, G + 2, z, B.skirt); w.set(x, G + 3, z, B.hover);
      }
      w.box(114, G + 4, 96, 118, G + 6, 103, B.hover); w.box(114, G + 5, 103, 118, G + 5, 103, B.heliGl); w.box(118, G + 5, 97, 118, G + 5, 102, B.heliGl); w.box(114, G + 7, 96, 118, G + 7, 103, B.heliDk);
      for (const fx of [HCX - 2.5, HCX + 2.5]) for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const r = Math.hypot(dy, dx); if ((r > 2.2 && r < 3.3) || (r < 2.2 && (dy === 0 || dx === 0))) w.set(Math.round(fx + dx - 0.5), G + 7 + dy, 91, r > 2.2 ? B.heliDk : B.iron);
      }
      landmarks.push({ name: '호버크래프트', note: '등대·해안선 부두에서 얼음 위로 건너온 탈것', p: [116.5, G + 14, 98.5] });

      // ════ 움직이는 부품(맨 마지막: 월드와 겹치지 않게) ════
      // 탐조등 빛줄기(동쪽 날개 끝): 처음엔 접혀 있다가 펼쳐져 얼음판을 훑는다
      const BP = [BX1 + 1, BY + 7, CZ + 15], th0 = 0.9, slope = 1.0;
      const beam = sprop({ name: 'beam', pivot: [BP[0], BP[1] + 0.5, BP[2] + 0.5], scl0: [0, 0, 0] });
      let end = null;
      for (let s = 0; s < 120; s += 0.5) {
        const cx = BP[0] + Math.cos(th0) * s, cy = BP[1] - slope * s, cz = BP[2] + Math.sin(th0) * s;
        if (cy < G + 1.5) { end = [cx, cz]; break; }
        const r = 0.35 + s * 0.05, R = Math.ceil(r);
        for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy + dz * dz > r * r) continue;
          const x = Math.round(cx + dx), y = Math.round(cy + dy), z = Math.round(cz + dz);
          if (S.get(x, y, z) || hash3(x, y, z) < 0.45) continue;
          beam.set(x, y, z, B.beamL);
        }
      }
      if (end) for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) { const x = Math.round(end[0] + dx), z = Math.round(end[1] + dz); if (Math.hypot(dx, dz * 0.8) <= 5 && !S.get(x, G + 1, z)) beam.set(x, G + 1, z, B.beamL); }
      acts.push({
        name: '조타실 탐조등', hint: '조타실 날개 끝 탐조등이 켜지며 눈보라 속 얼음판을 천천히 훑어요', hit: TH([BX1 - 2, BY + 4, CZ + 12, BX1 + 2, BY + 8, CZ + 17]),
        run: async a => {
          a.flash('search', 6, 8.5); a.flash('bridge', 2, 8.5);
          await a.tween('beam', { scl: [1, 1, 1] }, 0.8);
          await yawTo(a, 'beam', 0.45, 2.4); await yawTo(a, 'beam', -0.35, 3);
          await yawTo(a, 'beam', 0, 1.2); await a.tween('beam', { scl: [0, 0, 0] }, 0.6);
        },
      });
      acts.push({
        name: '뱃고동', hint: '남색 돛대의 놋쇠 기적에서 김이 뿜어지며 얼어붙은 바다에 긴 뱃고동이 울려요', hit: TH([MX - 1, BY + 12, CZ - 3, MX + 4, BY + 17, CZ + 3]),
        run: async a => {
          a.flash('mast', 5, 5); a.wind(2.4, 5);
          for (let k = 0; k < 3; k++) {
            for (let j = 0; j < 5; j++) { burst(a, [MX + 4, BY + 15, CZ], { n: 22, colors: ['#ffffff', '#e0ecf4', '#b8c8d8'], speed: 2.2, up: 5, life: 2.2, gravity: -0.8, spread: 0.8 }); await a.wait(0.18); }
            await a.wait(0.5);
          }
        },
      });
      const radar = sprop({ name: 'radar', pivot: [110.5, BY + 9, CZ + 0.5], speed: 0.9 });
      radar.set(110, BY + 9, CZ, B.iron); radar.box(110, BY + 10, CZ - 5, 110, BY + 10, CZ + 4, B.rail); radar.box(110, BY + 11, CZ - 5, 110, BY + 11, CZ + 4, B.frame);
      acts.push({
        name: '레이더 마스트', hint: '조타실 지붕의 레이더가 빙글빙글 빨라지고 남색 돛대의 붉은 항공등이 깜박여요', hit: TH([96, BY + 6, CZ - 8, 114, MTOP + 2, CZ + 7]),
        run: async a => { a.flash('mast', 6, 4.5); for (let k = 0; k < 4; k++) burst(a, [MX + 0.5, MTOP + 1.5, CZ], { n: 10, colors: ['#ff4a3a', '#ffb0a0'], speed: 1, up: 0.5, life: 0.8, gravity: 0, spread: 0.4 }); await a.spin('radar', 7, 4.5); },
      });
      // 동쪽 크레인(부품): 컨테이너를 매단 채 뱃전 밖 얼음판 위로 돈다
      const CEZ = CZ + 10;
      const crane = sprop({ name: 'crane', pivot: [CRX + 0.5, DK + 7, CEZ + 0.5] });
      crane.box(CRX - 1, DK + 7, CEZ - 1, CRX + 2, DK + 9, CEZ + 2, B.craneO); crane.set(CRX + 2, DK + 8, CEZ, B.brWin); crane.box(CRX - 1, DK + 10, CEZ - 1, CRX + 2, DK + 10, CEZ + 2, B.iron);
      crane.line(CRX + 2, DK + 10, CEZ, CRX + 14, DK + 20, CEZ, B.craneO); crane.line(CRX + 2, DK + 10, CEZ + 1, CRX + 14, DK + 20, CEZ + 1, B.craneO);
      crane.box(CRX + 14, DK + 15, CEZ, CRX + 14, DK + 19, CEZ, B.cable);
      crane.box(CRX + 11, DK + 12, CEZ - 1, CRX + 17, DK + 14, CEZ + 1, B.cOr); crane.box(CRX + 11, DK + 12, CEZ - 1, CRX + 11, DK + 14, CEZ + 1, B.iron);
      acts.push({
        name: '갑판 크레인', hint: '주황빛 갑판 크레인이 컨테이너를 매단 채 뱃전 밖 얼음판 위로 돌아가요', hit: TH([CRX - 1, DK + 7, CEZ - 1, CRX + 17, DK + 20, CEZ + 2]),
        run: async a => {
          a.flash('camp', 2, 7.5);
          await yawTo(a, 'crane', 1.3, 3.2);
          burst(a, [CRX + 0.5 + 14 * Math.cos(1.3), DK + 13, CEZ + 0.5 + 14 * Math.sin(1.3)], { n: 30, colors: ['#ffffff', '#dfe9f2'], speed: 1.5, up: 0.5, life: 1.6, gravity: 6, spread: 2 });
          await a.wait(1.2); await yawTo(a, 'crane', 0, 3);
        },
      });
      // 쇄빙 돌진: 뱃머리 앞 깨진 얼음판(부품)이 들려 갈라진다
      const slabs = [[139, CZ - 7, CZ - 1], [140, CZ, CZ + 6], [145, CZ - 7, CZ], [146, CZ + 1, CZ + 7]], tilt0 = k => [(k % 2 ? 0.07 : -0.06), 0, 0.05 + (k % 3) * 0.04];
      slabs.forEach(([x0, z0, z1], k) => {
        const zc = (z0 + z1) / 2, hz = (z1 - z0) / 2 + 0.6;
        const p = sprop({ name: 'slab' + k, pivot: [x0, G, zc + 0.5], rot0: tilt0(k) });
        for (let x = x0; x <= x0 + 4; x++) for (let z = z0; z <= z1; z++) {
          if (Math.abs(x - x0 - 2) / 2.8 + Math.abs(z - zc) / hz > 1.15 + hash3(x, 3, z) * 0.3 || S.get(x, G, z)) continue;
          p.set(x, G, z, hash3(x, k, z) > 0.3 ? B.iceBlk : B.iceBlk2);
          if (hash3(x, 9, z) > 0.8) p.set(x, G + 1, z, B.snowI);
        }
      });
      acts.push({
        name: '쇄빙 돌진', hint: '배가 얼음을 밀어붙이자 뱃머리 앞 얼음판이 들려 쩍 갈라지고 검은 물이 튀어요', hit: TH([136, G, CZ - 8, 152, G + 8, CZ + 8]),
        run: async a => {
          a.flash('bow', 4, 4); a.lightning(0.3);
          for (let k = 0; k < 4; k++) {
            a.turn('slab' + k, TR([k % 2 ? 0.25 : -0.25, 0, 0.55 + k * 0.1]), 0.5);
            burst(a, [141 + (k >> 1) * 6, G + 2, CZ - 4 + (k & 1) * 7], { n: 34, colors: ['#e8f4ff', '#a4c6da', '#ffffff', '#16283a'], speed: 5, up: 7, life: 1.4, gravity: 12, spread: 1.6 });
            await a.wait(0.3);
          }
          burst(a, [138, G + 3, CZ], { n: 70, colors: ['#ffffff', '#c8e0ee', '#2a4054'], speed: 8, up: 6, life: 1.6, gravity: 10, spread: 3, flat: true });
          await a.wait(1.4);
          await Promise.all([0, 1, 2, 3].map(k => a.turn('slab' + k, TR(tilt0(k)), 1.6)));
        },
      });
      // 헬기(주황·흰 구조 헬기)와 회전날개(부품): 녹색 신호탄이 오르면 이륙해 야영지 위를 돌고 돌아온다
      const HY = PY + 1, HZ = CZ;
      const heli = sprop({ name: 'heli', pivot: [PCX + 0.5, HY, HZ] });
      heli.box(17, HY, HZ - 3, 26, HY, HZ - 3, B.iron); heli.box(17, HY, HZ + 2, 26, HY, HZ + 2, B.iron);
      for (const x of [19, 24]) { heli.set(x, HY + 1, HZ - 2, B.iron); heli.set(x, HY + 1, HZ + 1, B.iron); }
      heli.box(17, HY + 2, HZ - 2, 26, HY + 3, HZ + 1, B.heliO); heli.box(17, HY + 4, HZ - 2, 26, HY + 5, HZ + 1, B.heliWt);
      heli.box(27, HY + 2, HZ - 1, 28, HY + 4, HZ, B.heliGl); heli.box(19, HY + 4, HZ - 2, 24, HY + 4, HZ - 2, B.heliGl); heli.box(19, HY + 4, HZ + 1, 24, HY + 4, HZ + 1, B.heliGl);
      heli.box(19, HY + 6, HZ - 1, 24, HY + 6, HZ, B.heliDk); heli.box(7, HY + 4, HZ - 1, 16, HY + 4, HZ - 1, B.heliO); heli.box(7, HY + 5, HZ - 1, 8, HY + 7, HZ - 1, B.heliWt);
      heli.set(22, HY + 7, HZ - 1, B.iron);
      const rotor = sprop({ name: 'rotor', pivot: [PCX + 0.5, HY + 8, HZ - 0.5], speed: 0.01 });
      rotor.box(11, HY + 8, HZ - 1, 33, HY + 8, HZ - 1, B.heliDk); rotor.box(22, HY + 8, HZ - 12, 22, HY + 8, HZ + 10, B.heliDk);
      acts.push({
        name: '녹색 신호탄 · 헬기 탈출', hint: '헬리패드에서 녹색 신호탄이 높이 오르면 헬기가 이륙해 야영지 위를 돌고 돌아와요', hit: TH([PCX - PR, PY, CZ - PR, PCX + PR, HY + 8, CZ + PR]),
        run: async a => {
          a.flash('pad', 6, 13);
          for (let k = 0; k < 9; k++) { burst(a, [PCX + 10, PY + 3 + k * 6, CZ + 9], { n: 8, colors: ['#5aff7a', '#c8ffd0'], speed: 0.6, up: 1, life: 1.2, gravity: 0.5, spread: 0.4 }); await a.wait(0.12); }
          burst(a, [PCX + 10, PY + 58, CZ + 9], { n: 90, colors: ['#5aff7a', '#a8ffb8', '#ffffff'], speed: 9, up: 1, life: 2.4, gravity: 2, spread: 1 });
          a.spin('rotor', 900, 13);
          const pts = [[0, 4, 0], [0, 24, 0], [12, 24, 32], [16, -4, 32]].map(T), back = [[12, 24, 32], [0, 24, 0], [0, 0, 0]].map(T);
          await a.wait(1);
          await Promise.all([a.path('heli', pts, 6), a.path('rotor', pts, 6)]);
          burst(a, [PCX + 16.5, G + 1, CZ + 32], { n: 50, colors: ['#ffffff', '#dfe9f2'], speed: 6, up: 1, life: 1.4, gravity: 1, spread: 3, flat: true });
          await a.wait(1.2);
          await Promise.all([a.path('heli', back, 5.5), a.path('rotor', back, 5.5)]);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
