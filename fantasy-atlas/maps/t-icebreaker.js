// 쇄빙선 — 핀란드만 얼음에 갇힌 원자력 쇄빙선 「보레아스」의 앞쪽 절반: 붉은·검은 선체와 숟가락 뱃머리, 7층 상부 구조물과 조타실, 크레인과 컨테이너, 뒤쪽 헬리패드, 둘레의 갈라진 얼음판과 검은 물길 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 120;
  MAPS.push({
    id: 'icebreaker', cat: 'tarkov', name: '쇄빙선', en: 'Icebreaker · Boreas', color: '#5a8ab0', seed: 603, base: 22, time: 'night', size: [W, D, Hh],
    desc: '타르코프 봉쇄선 안쪽 핀란드만, 얼음에 갇힌 원자력 쇄빙선 「보레아스」. 물류 회사 파라다임 해운의 배지만 무엇을 싣고 어디로 가던 길인지는 아무도 모른다. 검은 선체 위로 8층 상부 구조물이 솟고, 조타실 탐조등만이 눈보라 속 얼음판을 훑는다.',
    info: { title: '구역 정보', en: 'LOCATION', rows: [['위치', '핀란드만 · 타르코프 봉쇄선 안'], ['소속', '파라다임 해운(Paradigm Shipping)'], ['보스', '웨지(3층 체육관) · 나이트(0층)'], ['탈출', '헬리패드 · 녹색 신호탄'], ['모델', '원자력 쇄빙선 「아르크티카」급']] },
    sky: ['#1a2638', '#05080f', '#2c4462'], stars: true,
    hemi: ['#9ab4d8', '#141a24', 0.5], sun: ['#c0d4f4', 0.42, [0.5, 1, 0.7]],
    day: { sky: ['#a8b4c0', '#6a7c90', '#dce4ea'], stars: false, hemi: ['#e8f0f8', '#4a5462', 0.6], sun: ['#f0f4ff', 0.6, [0.5, 1, 0.7]], haze: '#b8c6d4' },
    liquid: ['#0a141e', '#16283a', '#4a6a84'], liqSpeed: 0.12,
    fog: { start: 0.82, floor: 10, depth: 10, haze: [30, 0.3, 10], hazeColor: '#3a4c62' },
    camY: 18, zoom: 1.3,
    particles: [
      { n: 1100, colors: ['#ffffff', '#e4eef8', '#c0d4e8'], mode: 'fall', speed: 0.9, wind: 1.6, y0: 18, y1: 116, glow: false },
      { n: 34, colors: ['#5affb0', '#3ae0c8', '#a0ffd8'], mode: 'wisp', speed: 0.3, size: 2, y0: 104, glow: true },
    ],
    blocks: {
      // 얼음판
      snowI: { c: '#9eb2c4', top: '#e2ebf2', v: 0.04 }, snow2: { c: '#94a8bc', top: '#d0dce8', v: 0.05 }, iceB: { c: '#7aa0b8', top: '#a4c6da', v: 0.05 },
      iceThin: { c: '#5a7e98', top: '#6e94ae', v: 0.05 }, crack: { c: '#3a5268', top: '#466078', v: 0.04 }, sea: { c: '#0e1820', v: 0.03 },
      iceBlk: { c: '#a8cce0', top: '#e8f4fa', v: 0.06 }, iceBlk2: { c: '#7eaac4', top: '#c8e0ee', v: 0.06 },
      // 선체
      hullK: { c: '#22262c', v: 0.04 }, hullR: { c: '#8a2a24', v: 0.05 }, hullW: { c: '#d8dcdc', v: 0.02 }, rust: { c: '#5a3226', v: 0.06 },
      deck: { c: '#4e4440', top: '#5c504a', v: 0.05, pat: 'floor' }, snowD: { c: '#b4c2ce', top: '#e0e8f0', v: 0.04 },
      rail: { c: '#9aa0a6', v: 0.03 }, iron: { c: '#2c3036', v: 0.03 }, chain: { c: '#3a3634', v: 0.04 }, port: { c: '#ffe2a8', night: true, day: '#3a4650' },
      // 상부 구조물
      sWall: { c: '#b4bcc4', v: 0.03, pat: 'big' }, sTrim: { c: '#d4d8dc', v: 0.02 }, sRoof: { c: '#3c4248', v: 0.03 }, stripeB: { c: '#2a5a9a', v: 0.03 }, stripeR: { c: '#a8362e', v: 0.03 },
      win: { c: '#ffe0a0', night: true, day: '#3a4a58' }, winD: { c: '#2a3440', v: 0.03 }, brWin: { c: '#c4f0ff', night: true, day: '#2a4652' }, frame: { c: '#2a2e34', v: 0.02 },
      gymWin: { c: '#ffb058', night: true, day: '#4a4032' }, doorS: { c: '#4a525a', v: 0.03 }, boatO: { c: '#e8702a', v: 0.04 }, brass: { c: '#c8a050', v: 0.05 },
      // 원자로·헬리패드·크레인
      vent: { c: '#8a9298', v: 0.04, pat: 'plank' }, ventG: { c: '#6affc8', glow: true }, hazY: { c: '#e8c030', v: 0.03 }, hazK: { c: '#1a1a1a', v: 0.02 },
      pad: { c: '#3a4440', top: '#46524c', v: 0.03 }, padW: { c: '#e8ecec', v: 0.02 }, padG: { c: '#5aff7a', glow: true },
      craneY: { c: '#d8a830', v: 0.04 }, cable: { c: '#1e2024', v: 0.02 },
      cOr: { c: '#c8642a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cBl: { c: '#2e5a8a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cGr: { c: '#3e6a4a', top: '#d8e2ea', v: 0.04, pat: 'plank' },
      cRd: { c: '#8a2e2a', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cGy: { c: '#7a8088', top: '#d8e2ea', v: 0.04, pat: 'plank' }, cWh: { c: '#c8ccc8', top: '#e4eaee', v: 0.03, pat: 'plank' }, cTeal: { c: '#2a8a8a', v: 0.03 },
      hatch: { c: '#5a6068', top: '#6a7078', v: 0.04, pat: 'plank' },
      // 불빛
      lampW: { c: '#f4fbff', glow: true }, redL: { c: '#ff3a2a', glow: true }, navW: { c: '#ffffff', glow: true }, navG: { c: '#3aff6a', glow: true },
      beamL: { c: '#cfeeff', glow: true },
      // 얼음 위 야영지·헬기·호버크래프트
      tent: { c: '#4a5238', v: 0.04 }, tentDk: { c: '#384028', v: 0.04 }, crateM: { c: '#4e5a3a', top: '#c8d4dc', v: 0.05, pat: 'plank' }, sandbag: { c: '#8a7e62', top: '#b4b0a0', v: 0.08 },
      gen: { c: '#b89a3a', v: 0.04 }, barrelB: { c: '#2e4a7a', v: 0.04 }, barrelR: { c: '#8a3a2a', v: 0.04 }, sled: { c: '#a8282a', v: 0.04 },
      heli: { c: '#4a5248', v: 0.04 }, heliDk: { c: '#2e342e', v: 0.03 }, heliGl: { c: '#9ac8d8', night: true, day: '#5a7a88' },
      skirt: { c: '#1e2022', v: 0.04 }, hover: { c: '#5a6a5a', v: 0.04 }, flareG: { c: '#5aff7a', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base, n = w.noise, TAU = Math.PI * 2;
      const lights = [], acts = [], landmarks = [];
      const CZ = 72, HW = 16, DK = G + 13;                                  // 선체 중심선 z, 반폭, 주갑판 높이
      const deckY = x => DK + Math.floor(Math.max(0, x - 106) * 0.12);     // 뱃머리 쪽으로 갑판이 살짝 오른다
      const tipX = y => 134 + (y - G);                                      // 숟가락 뱃머리: 위로 갈수록 앞으로 나온다
      const hwAt = (x, y) => {
        const b = HW - (y < G + 3 ? (G + 3 - y) * 0.5 : 0);
        if (x <= 100) return b;
        const t = (x - 100) / (tipX(y) - 100);
        return t >= 1 ? -1 : b * Math.pow(1 - Math.pow(t, 2.2), 0.5);
      };
      const inHull = (x, y, z) => Math.abs(z + 0.5 - CZ) <= hwAt(x, y);
      const segD = (px, pz, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (pz - a[1]) * dz) / (dx * dx + dz * dz))); return Math.hypot(px - a[0] - dx * t, pz - a[1] - dz * t); };

      // ── 얼음판: 눈 덮인 해빙, 맨얼음, 갈라진 금, 뒤쪽 항적의 깨진 물길, 뱃머리 옆에서 남동쪽으로 뻗은 물길 ──
      const LEAD = [[112, 90], [122, 100], [134, 110], [146, 126], [156, 146], [164, 168]];
      const wm = new Uint8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let wet = false, floeT = 0.6;
        let dl = 1e9; for (let k = 0; k < LEAD.length - 1; k++) dl = Math.min(dl, segD(x, z, LEAD[k], LEAD[k + 1]));
        if (dl < 2.2 + n.fbm(x * 0.07, z * 0.07) * 4 + Math.max(0, z - 90) * 0.025) wet = true;
        if (x < 26 && Math.abs(z + 0.5 - CZ) < 24 - x * 0.4 + n.fbm(x * 0.1 + 4, z * 0.1) * 6) { wet = true; floeT = 0.5; }
        if (Math.hypot(x - 40, (z - 130) * 1.3) < 7 + n.fbm(x * 0.2, z * 0.2) * 4) wet = true;
        if (wet && n.fbm(x * 0.16 + 11, z * 0.16 + 3) > floeT) wet = false, wm[x + W * z] = 2;   // 떠다니는 얼음 조각
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

      // ── 선체: 물에 잠긴 쪽 붉은 칠, 흰 흘수선, 검은 윗선체. 서쪽 끝은 지도 밖으로 이어진다 ──
      for (let x = 0; x <= 152; x++) {
        const dy = deckY(x);
        for (let y = G - 3; y <= dy; y++) for (let z = CZ - HW - 2; z <= CZ + HW + 2; z++) {
          if (!inHull(x, y, z)) continue;
          let b = y <= G + 3 ? B.hullR : y === G + 4 ? B.hullW : B.hullK;
          if (y === dy) b = hash3(x, 5, z) > 0.72 ? B.snowD : B.deck;
          w.set(x, y, z, b);
        }
        // 갑판 가장자리: 앞갑판은 높은 현장, 뒤로는 난간
        for (let z = CZ - HW - 1; z <= CZ + HW + 1; z++) {
          if (!inHull(x, dy, z)) continue;
          const edge = !inHull(x, dy, z + 1) || !inHull(x, dy, z - 1) || !inHull(x + 1, dy, z);
          if (!edge) continue;
          if (x >= 96) { w.set(x, dy + 1, z, B.hullK); w.set(x, dy + 2, z, B.hullW); }
          else { if (x % 3 === 0) w.set(x, dy + 1, z, B.rail); w.set(x, dy + 2, z, B.rail); }
        }
      }
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) if (wm[x + W * z] === 1 && !w.get(x, G - 1, z)) w.liquid(x, z, G - 1);
      const outZ = (x, y) => { for (let z = CZ + HW + 2; z > CZ; z--) if (w.get(x, y, z) && inHull(x, y, z)) return z; return -1; };   // 남쪽 바깥 면
      // 둥근 창과 녹물 자국
      for (let x = 4; x <= 118; x += 4) for (const y of [G + 8, G + 11]) {
        if (x >= 92 && x <= 120) continue;
        const z = outZ(x, y); if (z < 0) continue;
        w.set(x, y, z, hash3(x, y, 2) > 0.45 ? B.port : B.winD);
        if (hash3(x, y, 9) > 0.6) for (let k = 1; k <= 1 + (hash3(x, 3, y) * 4 | 0); k++) { const zz = outZ(x, y - k); if (zz > 0 && y - k > G + 4) w.set(x, y - k, zz, B.rust); }
      }
      // 선수 이름 BOREAS (3×5 글자)
      const FONT = { B: ['110', '101', '110', '101', '110'], O: ['111', '101', '101', '101', '111'], R: ['110', '101', '110', '101', '101'], E: ['111', '100', '110', '100', '111'], A: ['010', '101', '111', '101', '101'], S: ['011', '100', '010', '001', '110'] };
      [...'BOREAS'].forEach((ch, i) => FONT[ch].forEach((row, r) => [...row].forEach((c, k) => { if (c !== '1') return; const x = 96 + i * 4 + k, y = G + 12 - r, z = outZ(x, y); if (z > 0) w.set(x, y, z, B.hullW); })));
      // 닻 구멍과 닻, 흘러내린 녹
      for (const ax of [138]) {
        const az = outZ(ax, G + 11);
        if (az > 0) {
          w.box(ax - 1, G + 10, az, ax + 1, G + 12, az, B.iron); w.box(ax, G + 7, az + 1, ax, G + 11, az + 1, B.chain);
          w.box(ax - 1, G + 6, az + 1, ax + 1, G + 6, az + 1, B.chain); w.set(ax - 2, G + 7, az + 1, B.chain); w.set(ax + 2, G + 7, az + 1, B.chain);
          for (let y = G + 5; y < G + 10; y++) { const zz = outZ(ax + 2, y); if (zz > 0) w.set(ax + 2, y, zz, B.rust); }
        }
      }

      // ── 선체 둘레에 밀려 쌓인 얼음 덩어리(압력 능선)와 뱃머리 앞 얼음 더미 ──
      const SLAB = [138, 150, 65, 79];                                        // 쇄빙 돌진에 쓰는 얼음판 자리
      const inSlab = (x, z) => x >= SLAB[0] && x <= SLAB[1] && z >= SLAB[2] && z <= SLAB[3];
      for (let x = 2; x <= 136; x++) for (const s of [-1, 1]) {
        if (s > 0 && x >= 76 && x <= 97) continue;                               // 사다리 아래는 비운다
        const hw = hwAt(x, G + 1); if (hw < 0) continue;
        const zE = s > 0 ? Math.floor(CZ + hw - 0.5) : Math.ceil(CZ - hw - 0.5);
        for (let k = 1; k <= 6; k++) {
          const z = zE + s * k; if (z < 0 || z >= D || wm[x + W * z] === 1) continue;
          const h = Math.floor(hash3(x, k, z) * 4.2 * (1 - k / 7) + n.fbm(x * 0.2, z * 0.2) * 1.5);
          for (let y = G + 1; y <= G + h; y++) w.set(x, y, z, hash3(x, y, z) > 0.4 ? B.iceBlk : B.iceBlk2);
        }
      }
      for (let x = 132; x <= 160; x++) for (let z = 56; z <= 88; z++) {
        if (inSlab(x, z) || wm[x + W * z] === 1) continue;
        const d = Math.hypot((x - 136) * 0.8, z + 0.5 - CZ); if (d > 17) continue;
        const h = Math.floor(hash3(x, 7, z) * 4.5 * (1 - d / 18) + 0.6);
        for (let y = G + 1; y <= G + h; y++) if (!w.get(x, y, z)) w.set(x, y, z, hash3(x, y, z) > 0.5 ? B.iceBlk : B.iceBlk2);
      }
      for (let x = SLAB[0]; x <= SLAB[1]; x++) for (let z = SLAB[2]; z <= SLAB[3]; z++) { w.box(x, G - 2, z, x, G + 3, z, 0); w.set(x, G - 3, z, B.sea); w.liquid(x, z, G - 1); }   // 깨진 얼음 사이 검은 물

      // ── 상부 구조물: 8개 층, 층마다 창 줄, 가운데 파란 띠와 아래 붉은 띠, 위층일수록 앞이 물러난다 ──
      const SX0 = 46, SX1 = 80, SZ0 = 58, SZ1 = 86, FH = 5;
      const lv = [];
      for (let k = 0; k < 8; k++) {
        const y0 = DK + 1 + k * FH, y1 = y0 + FH - 1;
        const x0 = k < 4 ? SX0 : SX0 + 4, x1 = k < 2 ? SX1 : k < 5 ? SX1 - 2 : SX1 - 4, z0 = k < 5 ? SZ0 : SZ0 + 1, z1 = k < 5 ? SZ1 : SZ1 - 1;
        lv.push({ x0, x1, z0, z1, y0, y1 });
        for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const sh = x === x0 || x === x1 || z === z0 || z === z1;
          if (!sh) { w.set(x, y, z, B.sWall); continue; }
          const fy = y - y0, u = (x === x0 || x === x1) ? z : x, corner = (x === x0 || x === x1) && (z === z0 || z === z1);
          let b = fy === 0 ? B.sTrim : B.sWall;
          if (k === 4 && fy <= 1) b = B.stripeB;
          else if (k === 1 && fy <= 1) b = B.stripeR;
          else if (!corner && fy >= 2 && fy <= 3 && u % 4 >= 1 && u % 4 <= 2) b = hash3(u >> 2, k, x + z) > 0.55 ? B.win : B.winD;
          w.set(x, y, z, b);
        }
      }
      // 노출된 층 지붕 둘레의 난간
      for (let k = 0; k < 8; k++) {
        const L = lv[k], y = L.y1 + 1;
        for (let z = L.z0; z <= L.z1; z++) for (let x = L.x0; x <= L.x1; x++) if ((x === L.x0 || x === L.x1 || z === L.z0 || z === L.z1) && !w.get(x, y, z)) w.set(x, y, z, B.rail);
      }
      // 3층 체육관: 남쪽 면의 넓은 주황 창, 창 너머 바벨 걸이
      const GYM = lv[2];
      for (let x = 50; x <= 66; x++) for (let y = GYM.y0 + 1; y <= GYM.y0 + 3; y++) w.set(x, y, SZ1, (x % 5 === 0 && y === GYM.y0 + 2) ? B.iron : (x % 6 === 2 ? B.frame : B.gymWin));
      lights.push({ name: 'gym', p: [58.5, GYM.y0 + 2, SZ1 + 1.5], c: '#ffb060', i: 0.45, d: 22, flicker: 0.15, srcR: 4 });
      landmarks.push({ name: '3층 체육관', note: '웨지(The Wedge)와 중무장 경호대가 지키는 곳', p: [58.5, GYM.y0 + 9, SZ1 + 2], boss: true });
      acts.push({
        name: '3층 체육관', hint: '3층 체육관 창에 불이 번쩍 들어오고, 웨지 일당의 운동기구가 쩔그렁 울려요', hit: [50, GYM.y0, SZ1 - 1, 66, GYM.y1, SZ1 + 1],
        run: async a => {
          a.flash('gym', 6, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([50.5 + (k * 7) % 17, GYM.y0 + 2, SZ1 + 1.2], { n: 12, colors: ['#ffb058', '#ffe0a0', '#ffffff'], speed: 1.6, up: 1, life: 0.7, gravity: 2, spread: 0.6 }); await a.wait(0.35); }
        },
      });
      // 앞면 출입문과 갑판 투광등
      w.box(SX1, DK + 1, 70, SX1, DK + 3, 73, B.doorS); w.box(SX1, DK + 4, 70, SX1, DK + 4, 73, B.sTrim);
      for (const z of [63, 81]) { w.box(SX1 - 1, DK + 19, z, SX1 - 1, DK + 19, z + 1, B.iron); w.box(SX1 - 1, DK + 18, z, SX1 - 1, DK + 18, z + 1, B.lampW); }
      lights.push({ name: 'deck', p: [SX1 + 1, DK + 17, 72.5], c: '#ffe8c0', i: 0.55, d: 38, flicker: 0.05, srcR: 10 });
      // 구명정(주황 캡슐)과 대빗
      for (const bx of [58, 72]) {
        w.ellipsoid(bx, DK + 8, SZ1 + 3, 5.4, 1.8, 1.6, B.boatO);
        w.box(bx - 3, DK + 10, SZ1 + 3, bx + 3, DK + 10, SZ1 + 3, B.hullW);
        for (const dx of [-4, 4]) { w.box(bx + dx, DK + 6, SZ1 + 1, bx + dx, DK + 11, SZ1 + 1, B.iron); w.box(bx + dx, DK + 11, SZ1 + 1, bx + dx, DK + 11, SZ1 + 3, B.iron); }
      }

      // ── 조타실: 맨 위층, 앞과 양 날개로 빙 둘러 이어진 창 띠, 차양 지붕 ──
      const BY = DK + 41, BX0 = 58, BX1 = 80;
      w.box(BX0, BY, SZ0, BX1, BY + 4, SZ1, B.sWall);
      w.box(72, BY, 56, BX1, BY + 4, 88, B.sWall);
      const bwin = (x, y, z) => w.set(x, y, z, ((x + z) % 4 === 0) ? B.frame : B.brWin);
      for (let y = BY + 1; y <= BY + 3; y++) {
        for (let z = 57; z <= 87; z++) bwin(BX1, y, z);
        for (let x = 73; x < BX1; x++) { bwin(x, y, 88); bwin(x, y, 56); }
        for (let x = BX0 + 1; x < 72; x++) { bwin(x, y, SZ1); bwin(x, y, SZ0); }
      }
      w.box(BX0, BY, SZ0, BX1, BY, SZ1, B.sTrim); w.box(72, BY, 56, BX1, BY, 88, B.sTrim);
      w.box(BX0, BY + 5, SZ0, BX1, BY + 5, SZ1, B.sRoof); w.box(72, BY + 5, 55, BX1 + 1, BY + 5, 89, B.sRoof);
      lights.push({ name: 'bridge', p: [BX1 + 1.5, BY + 2, 72.5], c: '#bfe8ff', i: 0.5, d: 30, flicker: 0.05, srcR: 4 });
      landmarks.push({ name: '조타실', note: '쇄빙선 「보레아스」의 심장 · 상부 구조물 꼭대기', p: [74.5, BY + 26, 72.5], boss: false, tag: 'BRIDGE' });
      // 탐조등 둘(앞 모서리)
      for (const z of [56, 87]) { w.box(BX1 - 1, BY + 6, z, BX1 - 1, BY + 7, z + 1, B.iron); w.box(BX1, BY + 6, z, BX1, BY + 7, z + 1, B.lampW); }
      lights.push({ name: 'search', p: [BX1 + 1.5, BY + 7, 88], c: '#e8f6ff', i: 0.35, d: 40, flicker: 0.05, srcR: 3 });
      // 주 돛대: 붉은 항공등, 가로 활대, 놋쇠 기적
      const MX = 64, MTOP = BY + 22;
      w.box(MX, BY + 6, 71, MX + 1, MTOP, 72, B.rail);
      w.box(MX, BY + 16, 65, MX, BY + 16, 78, B.rail);
      w.set(MX, MTOP + 1, 71, B.redL); w.set(MX + 1, MTOP + 1, 72, B.redL); w.set(MX, BY + 17, 65, B.redL); w.set(MX, BY + 17, 78, B.redL);
      w.box(MX + 2, BY + 12, 71, MX + 3, BY + 13, 72, B.brass);
      lights.push({ name: 'mast', p: [MX + 0.5, MTOP + 1, 72], c: '#ff4a3a', i: 0.35, d: 22, flicker: 0.1, srcR: 3 });
      // 안테나
      for (const [x, z, h] of [[60, 62, 8], [60, 82, 6], [70, 61, 5]]) w.box(x, BY + 6, z, x, BY + 5 + h, z, B.rail);
      w.box(74, BY + 6, 72, 74, BY + 8, 72, B.iron);                         // 레이더 받침

      // ── 원자로 환기탑과 뒤쪽 갑판실 ──
      w.box(28, DK + 1, 62, SX0 - 1, DK + 6, 82, B.sWall);
      for (let x = 28; x < SX0; x++) { w.set(x, DK + 6, 82, B.sTrim); if (x % 4 === 1) w.box(x, DK + 3, 82, x + 1, DK + 4, 82, B.win); }
      const VX0 = 32, VX1 = 42, VZ0 = 64, VZ1 = 80, VT = DK + 24;
      w.box(VX0, DK + 7, VZ0, VX1, VT, VZ1, B.vent);
      for (let y = VT - 3; y <= VT - 1; y++) {
        for (let x = VX0; x <= VX1; x++) { if (x % 2 === 0) { w.set(x, y, VZ1, B.ventG); w.set(x, y, VZ0, B.ventG); } }
        for (let z = VZ0; z <= VZ1; z++) if (z % 2 === 0) { w.set(VX1, y, z, B.ventG); w.set(VX0, y, z, B.ventG); }
      }
      w.box(VX0 - 1, VT + 1, VZ0 - 1, VX1 + 1, VT + 1, VZ1 + 1, B.sRoof);
      const PIPES = [[34, 67], [40, 67], [34, 77], [40, 77]];
      for (const [x, z] of PIPES) w.box(x, VT + 2, z, x + 1, VT + 5, z + 1, B.rail);
      // 방사능 표지(노랑 바탕 검은 세 날개)
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const r = Math.hypot(dx, dy), th = Math.atan2(dy, dx), blade = r >= 1.2 && r <= 3 && Math.cos(3 * (th - Math.PI / 2)) > 0.5;
        w.set(37 + dx, DK + 14 + dy, VZ1 + 1, (r < 0.8 || blade) ? B.hazK : B.hazY);
      }
      lights.push({ name: 'reactor', p: [37.5, VT - 2, VZ1 + 1.5], c: '#6affc8', i: 0.4, d: 26, flicker: 0.2, srcR: 3 });
      landmarks.push({ name: '원자로 환기탑', note: '선체 깊은 곳 원자로의 숨구멍', p: [37.5, VT + 12, 72.5] });
      acts.push({
        name: '원자로 환기탑', hint: '환기탑 창살에 청록빛이 차오르고, 굴뚝 넷에서 하얀 김이 뿜어져 나와요', hit: [VX0, VT - 4, VZ0, VX1, VT + 5, VZ1],
        run: async a => {
          a.flash('reactor', 6, 5); a.glow(1.8, 5);
          for (let k = 0; k < 12; k++) { const [x, z] = PIPES[k % 4]; a.burst([x + 1, VT + 6, z + 1], { n: 16, colors: ['#ffffff', '#d8e8f0', '#a8ffe0'], speed: 1.4, up: 7, life: 2, gravity: -1, spread: 1 }); await a.wait(0.35); }
        },
      });

      // ── 헬리패드: 다리 위 넓은 판, 흰 원과 노란 H, 초록 가장자리등 ──
      const PX0 = 4, PX1 = 27, PZ0 = 61, PZ1 = 83, PY = DK + 5, PCX = 16, PCZ = 72;
      for (const [x, z] of [[PX0, PZ0], [PX1, PZ0], [PX0, PZ1], [PX1, PZ1], [PCX, PZ0], [PCX, PZ1]]) w.box(x, DK + 1, z, x, PY - 1, z, B.iron);
      for (let z = PZ0; z <= PZ1; z++) for (let x = PX0; x <= PX1; x++) {
        const r = Math.hypot(x + 0.5 - PCX - 0.5, z + 0.5 - PCZ), edge = x === PX0 || x === PX1 || z === PZ0 || z === PZ1;
        let b = B.pad;
        if (edge) b = (x + z) % 4 === 0 ? B.padG : B.padW;
        else if (r > 7.6 && r < 8.8) b = B.padW;
        else if ((Math.abs(x - PCX) <= 2 && (z === PCZ - 3 || z === PCZ + 3)) || (x === PCX && Math.abs(z - PCZ) <= 3)) b = B.hazY;
        w.set(x, PY, z, b);
      }
      lights.push({ name: 'pad', p: [PX1 + 0.5, PY + 1, PZ1 + 0.5], c: '#5aff7a', i: 0.3, d: 24, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '헬리패드', note: '녹색 신호탄을 쏘아 올리면 헬기가 오는 탈출 지점', p: [PCX + 0.5, PY + 14, PCZ + 0.5] });

      // ── 앞갑판: 크레인 둘, 컨테이너 더미, 화물창 덮개, 계류주, 양묘기, 기관총 둥지, 앞 돛대 ──
      const CRX = 85;
      for (const cz of [63, 81]) { w.cyl(CRX, cz, DK + 1, DK + 6, 1.6, B.craneY); w.cyl(CRX, cz, DK + 6, DK + 6, 2.2, B.iron); }
      // 북쪽 크레인(고정): 붐을 컨테이너 쪽으로 눕혔다
      w.box(CRX - 1, DK + 7, 62, CRX + 2, DK + 9, 65, B.craneY); w.set(CRX + 2, DK + 8, 64, B.brWin);
      w.line(CRX + 2, DK + 9, 63, CRX + 18, DK + 15, 63, B.craneY); w.line(CRX + 2, DK + 9, 64, CRX + 18, DK + 15, 64, B.craneY);
      w.box(CRX + 18, DK + 10, 63, CRX + 18, DK + 14, 63, B.cable);
      const cont = (x0, y0, z0, b) => { w.box(x0, y0, z0, x0 + 6, y0 + 2, z0 + 2, b); w.box(x0, y0, z0, x0, y0 + 2, z0 + 2, B.iron); w.box(x0 + 6, y0, z0, x0 + 6, y0 + 2, z0 + 2, B.frame); };
      cont(90, DK + 1, 60, B.cOr); cont(98, DK + 1, 60, B.cBl); cont(90, DK + 4, 60, B.cGr);
      cont(90, DK + 1, 64, B.cGy); cont(98, DK + 1, 64, B.cRd); cont(98, DK + 4, 64, B.cWh);
      cont(91, DK + 1, 68, B.cBl); cont(99, DK + 1, 68, B.cOr); cont(94, DK + 1, 73, B.cWh);
      for (let x = 99; x <= 103; x++) w.set(x, DK + 5, 66, x % 2 ? B.cTeal : B.cWh);         // 파라다임 해운 띠
      for (let x = 95; x <= 99; x++) w.set(x, DK + 2, 75, B.cTeal);
      // 화물창 덮개
      for (let x = 110; x <= 124; x++) for (let z = 66; z <= 78; z++) w.box(x, deckY(x) + 1, z, x, DK + 3, z, (z === 66 || z === 78 || x === 110 || x === 124) ? B.iron : B.hatch);
      // 계류주
      for (const x of [108, 120, 130]) for (const s of [-1, 1]) { const z = Math.round(CZ - 0.5 + s * (hwAt(x, deckY(x)) - 2.5)); w.box(x, deckY(x) + 1, z, x, deckY(x) + 2, z, B.iron); w.box(x + 2, deckY(x) + 1, z, x + 2, deckY(x) + 2, z, B.iron); }
      // 양묘기와 닻줄
      const WY = deckY(132);
      w.box(130, WY + 1, 66, 133, WY + 2, 68, B.iron); w.box(130, WY + 1, 76, 133, WY + 2, 78, B.iron); w.box(131, WY + 1, 69, 132, WY + 1, 75, B.rail);
      w.line(134, WY + 1, 67, 141, deckY(141) + 1, 62, B.chain); w.line(134, WY + 1, 77, 141, deckY(141) + 1, 82, B.chain);
      // 기관총 둥지(로그의 흔적): 모래주머니 고리와 거치 기관총
      const NX = 141, NZ = 72, NY = deckY(NX);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -3; dx <= 3; dx++) { const r = Math.hypot(dx, dz * 0.8); if (r > 2.4 && r < 3.6 && !(dx < -1 && Math.abs(dz) < 2)) w.box(NX + dx, NY + 1, NZ + dz, NX + dx, NY + 2, NZ + dz, B.sandbag); }
      w.box(NX, NY + 1, NZ, NX, NY + 2, NZ, B.iron); w.box(NX - 1, NY + 3, NZ, NX + 4, NY + 3, NZ, B.iron); w.set(NX - 1, NY + 1, NZ + 1, B.crateM);
      landmarks.push({ name: '뱃머리', note: '얼음을 밀어붙인 숟가락 뱃머리 · 그 아래 0층에 나이트(Knight)가 머문다', p: [138.5, NY + 14, 72.5] });
      // 앞 돛대와 흰 항해등
      const FMX = 126, FMY = deckY(FMX);
      w.box(FMX, FMY + 1, 72, FMX, FMY + 12, 72, B.rail); w.box(FMX, FMY + 9, 69, FMX, FMY + 9, 75, B.rail); w.set(FMX, FMY + 13, 72, B.navW);
      w.set(FMX, FMY + 10, 69, B.redL); w.set(FMX, FMY + 10, 75, B.navG);
      lights.push({ name: 'bow', p: [FMX + 0.5, FMY + 13, 72.5], c: '#e8f4ff', i: 0.4, d: 32, flicker: 0.05, srcR: 3 });

      // ── 얼음 위 야영지(블랙 디비전): 내려가는 사다리, 천막, 발전기, 조명탑, 모래주머니, 상자, 썰매 ──
      for (let k = 0; k <= 12; k++) { const x = 93 - k, y = DK - k; w.box(x, y, 89, x, y, 90, B.rail); w.set(x, y + 2, 91, B.rail); if (k % 3 === 0) w.box(x, y, 91, x, y + 1, 91, B.rail); }
      w.box(78, G + 1, 89, 80, G + 1, 91, B.iron);
      // 천막 두 동
      for (const [tx, tz] of [[64, 98], [64, 106]]) for (let z = tz; z <= tz + 6; z++) {
        const h = 4 - Math.abs(z - tz - 3);
        for (let x = tx; x <= tx + 9; x++) { w.set(x, G + 1 + h, z, h === 4 ? B.tentDk : B.tent); if (x === tx || x === tx + 9) w.box(x, G + 1, z, x, G + h, z, B.tent); }
      }
      w.box(64, G + 1, 101, 64, G + 3, 101, B.tentDk);
      // 발전기와 조명탑
      w.box(80, G + 1, 104, 83, G + 3, 106, B.gen); w.box(81, G + 4, 105, 82, G + 4, 105, B.iron);
      w.box(86, G + 1, 99, 86, G + 9, 99, B.iron); w.box(85, G + 10, 98, 87, G + 10, 100, B.iron); w.box(85, G + 9, 100, 87, G + 9, 100, B.lampW); w.box(85, G + 9, 98, 85, G + 9, 99, B.lampW);
      lights.push({ name: 'camp', p: [86.5, G + 8, 101.5], c: '#ffe0b0', i: 0.55, d: 28, flicker: 0.1, srcR: 3 });
      // 신호탄 상자
      w.box(76, G + 1, 110, 78, G + 2, 111, B.crateM); w.set(77, G + 3, 110, B.flareG);
      // 모래주머니 방벽, 군용 상자, 드럼통, 붉은 설상차
      for (let x = 62; x <= 92; x++) if (x % 9 !== 4) w.box(x, G + 1, 115 + (x > 76 ? 1 : 0), x, G + 2, 115 + (x > 76 ? 1 : 0), B.sandbag);
      for (const [x, z, h] of [[75, 98, 2], [77, 98, 1], [75, 100, 1], [90, 104, 2], [88, 108, 1], [70, 112, 1]]) w.box(x, G + 1, z, x + 1, G + h, z + 1, B.crateM);
      for (const [x, z, b] of [[79, 100, B.barrelB], [80, 101, B.barrelR], [91, 100, B.barrelB], [72, 96, B.barrelR]]) w.box(x, G + 1, z, x, G + 2, z, b);
      w.box(92, G + 1, 110, 96, G + 1, 112, B.sled); w.box(94, G + 2, 110, 95, G + 2, 112, B.sled); w.box(92, G + 2, 111, 92, G + 3, 111, B.frame); w.box(97, G + 1, 110, 97, G + 1, 112, B.rail);
      landmarks.push({ name: '얼음 위 야영지', note: '블랙 디비전이 선체 옆에 세운 전진 기지', p: [76.5, G + 14, 104.5] });

      // ── 호버크래프트(수다크-투다크 수리 키트로 건너온 탈것): 검은 고무 치마, 조종실, 뒤쪽 큰 덕트 프로펠러 둘 ──
      const HX0 = 104, HX1 = 120, HZ0 = 118, HZ1 = 126, HCZ = 122;
      for (let z = HZ0; z <= HZ1; z++) for (let x = HX0; x <= HX1; x++) {
        const cut = (x === HX0 || x === HX1) && (z === HZ0 || z === HZ1);
        if (cut) continue;
        w.box(x, G + 1, z, x, G + 2, z, B.skirt); w.set(x, G + 3, z, B.hover);
      }
      w.box(109, G + 4, 120, 116, G + 6, 124, B.hover); w.box(116, G + 5, 120, 116, G + 5, 124, B.heliGl); w.box(110, G + 5, 120, 115, G + 5, 120, B.heliGl); w.box(109, G + 7, 120, 116, G + 7, 124, B.heliDk);
      for (const fz of [HCZ - 2.5, HCZ + 2.5]) {
        for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const r = Math.hypot(dy, dz); if ((r > 2.2 && r < 3.3) || (r < 2.2 && (dy === 0 || dz === 0))) w.set(105, G + 7 + dy, Math.round(fz + dz - 0.5), r > 2.2 ? B.heliDk : B.iron); }
      }
      landmarks.push({ name: '호버크래프트', note: '등대·해안선 부두에서 얼음 위로 건너온 탈것', p: [112.5, G + 14, 122.5] });

      // ════ 움직이는 부품(맨 마지막: 월드와 겹치지 않게) ════
      // 탐조등 빛줄기: 처음엔 접혀 있다가 펼쳐져 얼음판을 훑는다
      const BP = [BX1 + 1, BY + 7, 88], th0 = 0.2, slope = 0.8;
      const beam = w.prop({ name: 'beam', pivot: [BP[0], BP[1] + 0.5, BP[2] + 0.5], scl0: [0, 0, 0] });
      let end = null;
      for (let s = 0; s < 120; s += 0.5) {
        const cx = BP[0] + Math.cos(th0) * s, cy = BP[1] - slope * s, cz = BP[2] + Math.sin(th0) * s;
        if (cy < G + 1.5) { end = [cx, cz]; break; }
        const r = 0.35 + s * 0.045, R = Math.ceil(r);
        for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy + dz * dz > r * r) continue;
          const x = Math.round(cx + dx), y = Math.round(cy + dy), z = Math.round(cz + dz);
          if (w.get(x, y, z) || hash3(x, y, z) < 0.45) continue;
          beam.set(x, y, z, B.beamL);
        }
      }
      if (end) for (let dz = -5; dz <= 5; dz++) for (let dx = -7; dx <= 7; dx++) { const x = Math.round(end[0] + dx), z = Math.round(end[1] + dz); if (Math.hypot(dx * 0.7, dz) <= 5 && !w.get(x, G + 1, z)) beam.set(x, G + 1, z, B.beamL); }
      acts.push({
        name: '조타실 탐조등', hint: '조타실 앞 탐조등이 켜지며 눈보라 속 얼음판을 천천히 훑어요', hit: [BX1 - 2, BY + 4, 85, BX1 + 2, BY + 8, 90],
        run: async a => {
          a.flash('search', 6, 8.5); a.flash('bridge', 2, 8.5);
          await a.tween('beam', { scl: [1, 1, 1] }, 0.8);
          await a.turn('beam', [0, -1.1, 0], 2.8); await a.turn('beam', [0, -0.3, 0], 2.4);
          await a.turn('beam', [0, 0, 0], 1.2); await a.tween('beam', { scl: [0, 0, 0] }, 0.6);
        },
      });
      // 뱃고동
      acts.push({
        name: '뱃고동', hint: '돛대의 놋쇠 기적에서 김이 뿜어지며 얼어붙은 바다에 긴 뱃고동이 울려요', hit: [MX - 1, BY + 10, 68, MX + 4, BY + 15, 76],
        run: async a => {
          a.flash('mast', 5, 5); a.wind(2.4, 5);
          for (let k = 0; k < 3; k++) {
            for (let j = 0; j < 5; j++) { a.burst([MX + 4, BY + 13, 72], { n: 22, colors: ['#ffffff', '#e0ecf4', '#b8c8d8'], speed: 2.2, up: 5, life: 2.2, gravity: -0.8, spread: 0.8 }); await a.wait(0.18); }
            await a.wait(0.5);
          }
        },
      });
      // 레이더
      const radar = w.prop({ name: 'radar', pivot: [74.5, BY + 9, 72.5], speed: 0.9 });
      radar.box(74, BY + 9, 72, 74, BY + 9, 72, B.iron); radar.box(70, BY + 10, 72, 79, BY + 10, 72, B.rail); radar.box(70, BY + 11, 72, 79, BY + 11, 72, B.frame);
      acts.push({
        name: '레이더 마스트', hint: '조타실 위 레이더가 빙글빙글 빨라지고 돛대의 붉은 항공등이 깜박여요', hit: [62, BY + 6, 64, 80, MTOP + 2, 80],
        run: async a => { a.flash('mast', 6, 4.5); for (let k = 0; k < 4; k++) a.burst([MX + 0.5, MTOP + 1.5, 72], { n: 10, colors: ['#ff4a3a', '#ffb0a0'], speed: 1, up: 0.5, life: 0.8, gravity: 0, spread: 0.4 }); await a.spin('radar', 7, 4.5); },
      });
      // 남쪽 크레인(부품): 컨테이너를 매단 채 바깥 얼음 쪽으로 돈다
      const crane = w.prop({ name: 'crane', pivot: [CRX + 0.5, DK + 7, 81.5] });
      crane.box(CRX - 1, DK + 7, 80, CRX + 2, DK + 9, 83, B.craneY); crane.set(CRX + 2, DK + 8, 82, B.brWin); crane.box(CRX - 1, DK + 10, 80, CRX + 2, DK + 10, 83, B.iron);
      crane.line(CRX + 2, DK + 10, 81, CRX + 16, DK + 20, 81, B.craneY); crane.line(CRX + 2, DK + 10, 82, CRX + 16, DK + 20, 82, B.craneY);
      crane.box(CRX + 16, DK + 13, 81, CRX + 16, DK + 19, 81, B.cable);
      crane.box(CRX + 13, DK + 10, 80, CRX + 19, DK + 12, 82, B.cOr); crane.box(CRX + 13, DK + 10, 80, CRX + 13, DK + 12, 82, B.iron);
      acts.push({
        name: '갑판 크레인', hint: '노란 갑판 크레인이 주황 컨테이너를 매단 채 배 밖 얼음판 위로 돌아가요', hit: [CRX - 1, DK + 7, 79, CRX + 19, DK + 20, 84],
        run: async a => {
          a.flash('deck', 2.5, 7.5);
          await a.turn('crane', [0, -1.25, 0], 3.2);
          a.burst([CRX + 0.5 + 16 * Math.cos(1.25), DK + 11, 81.5 + 16 * Math.sin(1.25)], { n: 30, colors: ['#ffffff', '#dfe9f2'], speed: 1.5, up: 0.5, life: 1.6, gravity: 6, spread: 2 });
          await a.wait(1.2); await a.turn('crane', [0, 0, 0], 3);
        },
      });
      // 쇄빙 돌진: 뱃머리 앞 얼음판(부품)이 들려 깨진다
      const slabs = [[138, 65, 71], [139, 72, 79], [144, 65, 72], [145, 73, 79]], tilt0 = k => [(k % 2 ? 0.07 : -0.06), 0, 0.05 + (k % 3) * 0.04];
      slabs.forEach(([x0, z0, z1], k) => {
        const zc = (z0 + z1) / 2, hz = (z1 - z0) / 2 + 0.6;
        const p = w.prop({ name: 'slab' + k, pivot: [x0, G, zc + 0.5], rot0: tilt0(k) });
        for (let x = x0; x <= x0 + 4; x++) for (let z = z0; z <= z1; z++) {
          if (Math.abs(x - x0 - 2) / 2.8 + Math.abs(z - zc) / hz > 1.15 + hash3(x, 3, z) * 0.3 || w.get(x, G, z)) continue;
          p.set(x, G, z, hash3(x, k, z) > 0.3 ? B.iceBlk : B.iceBlk2);
          if (hash3(x, 9, z) > 0.8) p.set(x, G + 1, z, B.snowI);
        }
      });
      acts.push({
        name: '쇄빙 돌진', hint: '배가 얼음을 밀어붙이자 뱃머리 앞 얼음판이 들려 쩍 갈라지고 검은 물이 튀어요', hit: [136, G, 64, 151, G + 8, 81],
        run: async a => {
          a.flash('bow', 4, 4); a.lightning(0.3);
          for (let k = 0; k < 4; k++) {
            a.turn('slab' + k, [k % 2 ? 0.25 : -0.25, 0, 0.55 + k * 0.1], 0.5);
            a.burst([141 + (k >> 1) * 6, G + 2, 69 + (k & 1) * 7], { n: 34, colors: ['#e8f4ff', '#a4c6da', '#ffffff', '#16283a'], speed: 5, up: 7, life: 1.4, gravity: 12, spread: 1.6 });
            await a.wait(0.3);
          }
          a.burst([136, G + 3, 72], { n: 70, colors: ['#ffffff', '#c8e0ee', '#2a4054'], speed: 8, up: 6, life: 1.6, gravity: 10, spread: 3, flat: true });
          await a.wait(1.4);
          await Promise.all([0, 1, 2, 3].map(k => a.turn('slab' + k, tilt0(k), 1.6)));
        },
      });
      // 헬기와 회전날개(부품): 녹색 신호탄이 오르면 이륙해 야영지 위를 돌고 돌아온다
      const HY = PY + 1;
      const heli = w.prop({ name: 'heli', pivot: [PCX + 0.5, HY, PCZ] });
      heli.box(11, HY, 69, 20, HY, 69, B.iron); heli.box(11, HY, 75, 20, HY, 75, B.iron);
      for (const x of [13, 18]) { heli.set(x, HY + 1, 70, B.iron); heli.set(x, HY + 1, 74, B.iron); }
      heli.box(11, HY + 2, 70, 20, HY + 5, 74, B.heli); heli.box(21, HY + 2, 71, 22, HY + 4, 73, B.heliGl); heli.box(14, HY + 4, 70, 19, HY + 4, 70, B.heliGl); heli.box(14, HY + 4, 74, 19, HY + 4, 74, B.heliGl);
      heli.box(13, HY + 6, 71, 18, HY + 6, 73, B.heliDk); heli.box(1, HY + 4, 72, 10, HY + 4, 72, B.heli); heli.box(1, HY + 5, 72, 2, HY + 7, 72, B.heliDk);
      heli.box(16, HY + 7, 72, 16, HY + 7, 72, B.iron);
      const rotor = w.prop({ name: 'rotor', pivot: [PCX + 0.5, HY + 8, 72.5], speed: 0.01 });
      rotor.box(5, HY + 8, 72, 27, HY + 8, 72, B.heliDk); rotor.box(16, HY + 8, 61, 16, HY + 8, 83, B.heliDk);
      acts.push({
        name: '녹색 신호탄 · 헬기 탈출', hint: '헬리패드에서 녹색 신호탄이 높이 오르면 헬기가 이륙해 얼음판 위를 한 바퀴 돌고 돌아와요', hit: [PX0, PY, PZ0, PX1, HY + 8, PZ1],
        run: async a => {
          a.flash('pad', 6, 13);
          for (let k = 0; k < 9; k++) { a.burst([PX1 - 1, PY + 3 + k * 6, PZ1 + 1], { n: 8, colors: ['#5aff7a', '#c8ffd0'], speed: 0.6, up: 1, life: 1.2, gravity: 0.5, spread: 0.4 }); await a.wait(0.12); }
          a.burst([PX1 - 1, PY + 58, PZ1 + 1], { n: 90, colors: ['#5aff7a', '#a8ffb8', '#ffffff'], speed: 9, up: 1, life: 2.4, gravity: 2, spread: 1 });
          a.spin('rotor', 900, 13);
          const pts = [[0, 4, 0], [0, 26, 0], [0, 30, 30], [60, 22, 30], [60, -3, 30]], back = [[60, 22, 30], [0, 30, 30], [0, 26, 0], [0, 0, 0]];
          await a.wait(1);
          await Promise.all([a.path('heli', pts, 6), a.path('rotor', pts, 6)]);
          a.burst([PCX + 60.5, G + 1, PCZ + 30], { n: 50, colors: ['#ffffff', '#dfe9f2'], speed: 6, up: 1, life: 1.4, gravity: 1, spread: 3, flat: true });
          await a.wait(1.2);
          await Promise.all([a.path('heli', back, 5.5), a.path('rotor', back, 5.5)]);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
