// 천문대 언덕 — 구름바다 위 바위 봉우리, 정상의 대망원경, 혼천의 광장, 유성 구덩이, 남쪽 아랫단 별빛 시장 (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 대천문대: 낱돌 쌓기(줄눈) 둥근 몸채, 벽기둥과 주두, 세로 창(창살·창턱·이맛돌), 띠돌림, 옥상 난간 동자, 현관 기둥과 황동 차양, 넉 단 돌계단.
// 대망원경: 굵은 경통(띠)과 렌즈, 파인더, 멍에. 혼천의: 두 칸 두께 고리. 점성술사의 집: 받침돌·귀돌·창틀·판자문·등·돔(기와 줄·은 갈빗대).
// 별빛 시장: 줄무늬 차양 노점(진열대·물건), 별 등불 줄, 달시계, 점성 천막. playerScale 2 (사람 키 6.8칸).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  MAPS.push({
    id: 'stellaris', cat: 'magic', name: '천문대 언덕', en: 'Stellaris Hill', color: '#6ab0ff', seed: 327, base: 44, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '아르카나에서 별에 가장 가까운 봉우리. 광장의 혼천의는 별의 움직임에 맞춰 스스로 돈다. 남쪽 아랫단에서는 밤에만 별빛 시장이 열려, 달시계 아래로 별가루와 점괘를 판다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '점성술사 회당'], ['명물', '밤에만 열리는 별빛 시장 · 달시계'], ['주의', '혼천의가 멈추면 불길한 징조']] },
    sky: ['#0a1430', '#02040c', '#3a5aa0'], stars: true,
    hemi: ['#a0c0ff', '#0a1020', 0.6], sun: ['#c0d8ff', 0.52, [0.45, 1, 0.5]],
    day: { sky: ['#dcecf8', '#5a90d8', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5060', 0.6], sun: ['#fff6e4', 0.8, [0.45, 1, 0.5]], haze: '#e8f0f8' },
    liquid: ['#0a1a4a', '#1a3a8a', '#ffffff'], liqSpeed: 0.5,
    fog: { start: 0.84, floor: 28, depth: 20, haze: [68, 0.55, 16], hazeColor: '#1a2848' },
    camY: -24, zoom: 1.05,
    particles: [
      { n: 200, colors: ['#ffffff', '#b8d0ff'], mode: 'drift', speed: 0.4, y0: 88, y1: 220 },
      { n: 40, colors: ['#ffc080', '#ffe0b0'], mode: 'rise', speed: 1.2, area: [263, 257, 8], y0: 60, y1: 112 },
      { n: 30, colors: ['#fff8d0', '#8ab8ff'], mode: 'rise', speed: 0.6, area: [169, 295, 28], y0: 64, y1: 120 },
    ],
    blocks: {
      grass: { c: '#33464a', top: '#3a5a5a', v: 0.1 }, grass2: { c: '#304246', top: '#34504e', v: 0.1 },
      dirt: { c: '#3e3c46', v: 0.08 }, rock: { c: '#4a5068', v: 0.06, pat: 'big' }, rockDk: { c: '#2e3246', v: 0.06, pat: 'stone' }, rockM: { c: '#4a3a3a', v: 0.1 },
      path: { c: '#3a3a44', top: '#6a7088', v: 0.08, pat: 'stone' }, marble: { c: '#c8d0e0', v: 0.04, pat: 'big' }, marbleDk: { c: '#8a94a8', v: 0.05, pat: 'brick' }, trim: { c: '#e4eaf4', v: 0.03 },
      marble2: { c: '#bcc4d6', v: 0.04, pat: 'big' }, marbleJ: { c: '#9aa2b6', v: 0.03 },
      pave: { c: '#5a6078', top: '#727890', v: 0.05 }, pave2: { c: '#565c74', top: '#686e86', v: 0.05 }, paveJ: { c: '#3e4256', top: '#4a4e62', v: 0.03 },
      roofN: { c: '#1a2a5a', v: 0.05, pat: 'tile' }, roofN2: { c: '#22346a', v: 0.05, pat: 'tile' }, silver: { c: '#c8d4e0', v: 0.04 }, brass: { c: '#c8a050', v: 0.07 }, brassDk: { c: '#8a6a30', v: 0.06 }, iron: { c: '#2a2e3c', v: 0.03 },
      door: { c: '#1a1a2a', v: 0.02, pat: 'plank' }, doorDk: { c: '#121220', v: 0.02 }, bark: { c: '#3a3a44', v: 0.06 }, barkDk: { c: '#2c2c36', v: 0.05 }, leaf: { c: '#2a4a5a', v: 0.1 }, leaf2: { c: '#3a6a70', v: 0.1 }, leafDk: { c: '#22404c', v: 0.08 },
      win: { c: '#b8d0ff', night: true, day: '#7a90b8' }, lamp: { c: '#d0e0ff', night: true, day: '#a8b4c8' },
      starG: { c: '#fff8d0', glow: true }, starB: { c: '#8ab8ff', glow: true }, meteor: { c: '#ffb86a', glow: true }, lens: { c: '#a0d8ff', glow: true },
      cloth1: { c: '#2a3a8a', v: 0.04 }, cloth2: { c: '#d8dcf0', v: 0.03 }, cloth3: { c: '#5a3a8a', v: 0.04 }, wood: { c: '#4a3a3a', v: 0.05, pat: 'plank' }, woodDk: { c: '#3a2c2c', v: 0.04 }, rope: { c: '#a89070', v: 0.04 },
      lanternB: { c: '#ffd890', glow: true }, moon: { c: '#f0f0ff', glow: true }, orbG: { c: '#c0a0ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, SX = 168, SZ = 104;
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      // ───────── 지형: 세 단(정상·광장·시장)을 들쭉날쭉한 벼랑으로 잇는다 ─────────
      // 벼랑 선은 x를 따라 노이즈로 휘고(광장·시장·큰 계단 자리 근처에서는 덜 휜다), 벼랑은 3~4칸 폭의 가파른 비탈 + 중간 바위 선반으로 내려간다.
      const nearX = (x, a, b, m) => MH.sstep(a - m, a, x) * (1 - MH.sstep(b, b + m, x));   // x가 [a,b] 안이면 1
      // 벼랑 k의 [중심 z, 폭]. 비탈은 중심-폭/2 ~ 중심+폭 사이에 놓인다.
      // 1단: 정상 대지(z≤150)·탑(z≤143)과 광장(z≥184)·점성술사의 집(z≥178) 사이. 2단: 광장(≤257)과 시장(≥272) 사이.
      // 서쪽 점성술사의 집 둘(64,248 / 72,288)은 원래 벼랑에 걸쳐 높은 받침 위에 떠 있었으므로, 그 구간은 벼랑을 북쪽(z≈233)으로 당겨 둘 다 아랫단에 앉힌다
      const cliff = (x, k) => {
        const tame = nearX(x, 110, 228, 16), west = k === 2 ? nearX(x, 48, 100, 12) : 0, calm = Math.max(tame, west);
        const wob = (n.fbm(x * 0.022, k * 9.3, 3) - 0.5) * 2 * MH.lerp(9, 2.5, calm) + (n.vn(x * 0.11, k * 5.1) - 0.5) * MH.lerp(4, 1.5, calm);
        const wid = MH.lerp(9 + n.vn(x * 0.05, k * 1.7) * 4, 8, calm);
        if (k === 1) return [Math.max(150, Math.min(MH.lerp(160, 169, tame), MH.lerp(157, 166, tame) + wob)), wid];
        return [MH.lerp(Math.max(250, Math.min(MH.lerp(276, 264, tame), MH.lerp(264, 263, tame) + wob)), 232 + wob, west), wid];
      };
      const cliffP = (z, c, x, k) => {          // 0(위) → 1(아래): 가파른 비탈 + 노이즈 폭 선반
        const t = (z - c[0]) / c[1], ledge = 0.25 + n.vn(x * 0.07, k * 3.3) * 0.3;
        return MH.lerp(MH.sstep(-0.5, 0.05, t) * ledge, ledge + (1 - ledge) * MH.sstep(0.35, 1, t), MH.sstep(-0.1, 0.4, t));
      };
      const tier = (x, z) => 39 - 15 * cliffP(z, cliff(x, 1), x, 1) - 16 * cliffP(z, cliff(x, 2), x, 2);
      // 지층: 낮은 노이즈로 기울고 굵기가 바뀌는 띠(덩어리째 바뀌어 면 합치기가 깨지지 않게)
      const stOff = new Float32Array(W * D).fill(NaN);
      const strata = (x, z, y) => {
        const i = x + W * z; if (stOff[i] !== stOff[i]) stOff[i] = n.fbm(x * 0.03, z * 0.03, 2) * 9 + n.vn(x * 0.09, z * 0.09) * 2;
        const yy = y + stOff[i], k = ((Math.floor(yy / 7) % 5) + 5) % 5;
        return k === 1 ? B.rockDk : k === 3 && hash3(x >> 4, Math.floor(yy / 7), z >> 4) > 0.45 ? B.rockM : B.rock;
      };
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const ox = x / 2, oz = z / 2, d = Math.hypot((ox - 84) * 0.9, oz - 84) + (n.fbm(ox * 0.06 + 5, oz * 0.06, 3) - 0.5) * 14;
          return base + 2 * (Math.max(0, MH.sstep(79, 52, d) * tier(x, z)) + n.fbm(ox * 0.038, oz * 0.038) * 4 + n.ridge(ox * 0.03, oz * 0.03, 3) * 4) + (n.vn(x * 0.13, z * 0.13) - 0.5) * 1.6;
        },
        surface: (x, z, y, s) => s >= 4 ? strata(x, z, y) : s >= 2 && n.fbm(x * 0.05 + 3, z * 0.05, 2) > 0.58 ? B.rock : s >= 2 && n.vn(x * 0.09, z * 0.09) > 0.62 ? B.dirt : n.fbm(x * 0.0425, z * 0.0425, 2) > 0.55 ? B.grass2 : B.grass,
        under: (x, z, y, dep, s) => dep < 3 && s < 4 ? B.dirt : strata(x, z, y),
      });
      const lights = [], acts = [], landmarks = [];

      // ───────── 공통 도구(2배 해상도용) ─────────
      // 낱돌 쌓기: 2칸 높이 돌 + 1칸 줄눈, 길이 6칸 돌을 줄마다 엇갈려
      const ashlar = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3;
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.marbleJ;
        return hash3(Math.floor(uu / 6), c, salt || 1) > 0.62 ? B.marble2 : B.marble;
      };
      // 돌판 무늬: 4×3칸 돌, 1칸 줄눈, 줄마다 엇갈림
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.paveJ;
        return hash3(Math.floor((x + off) / 4), row, 7) > 0.5 ? B.pave : B.pave2;
      };
      const SIDES = (x0, z0, x1, z1) => ({
        s: { u0: x0, u1: x1, at: (u, d) => [u, z1 + d] }, n: { u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { u0: z0, u1: z1, at: (u, d) => [x1 + d, u] }, w: { u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      // 소나무: 줄기, 층층이 겹친 가지 단(아래 짙은 테·위 밝은 갓), 꼭대기 순
      const pine = (x, y, z, h, R) => {
        for (let i = 0; i < h + 2; i++) w.cyl(x, z, y + i, y + i, Math.max(0.5, 1.4 * (1 - i / h) + (i < 2 ? 0.8 : 0)), i % 6 ? B.bark : B.barkDk);
        for (let ty = y + 5; ty < y + h; ty += 4) {
          const r = (1 - (ty - y) / (h + 2)) * R + 1.4;
          w.cyl(x, z, ty, ty + 1, r, B.leaf2);
          w.ring(x, z, ty - 1, r - 1.8, r + 0.6, B.leafDk);
          w.cyl(x, z, ty + 2, ty + 2, r - 2.2, B.leaf);
        }
        for (let k = 0; k < 4; k++) w.set(x, y + h + k, z, B.leaf);
      };
      // 등주: 받침돌, 쇠기둥, 유리 등롱(모서리 쇠살), 갓과 꼭지
      const lampPost = (x, z, h, y0) => {
        const y = (y0 != null ? y0 : g(x, z)) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.marbleDk);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.iron);
        for (let dy = 1; dy <= 2; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.iron : B.lamp);
        w.box(x - 1, ly + 3, z - 1, x + 1, ly + 3, z + 1, B.iron); w.set(x, ly + 4, z, B.brass);
        return [x + 0.5, ly + 1.5, z + 0.5];
      };

      // ───────── 정상: 대천문대(둥근 몸채와 옥상의 대망원경) ─────────
      const oy = MH.maxG(w, SX - 36, SZ - 36, SX + 36, SZ + 36);
      MH.flatten(w, SX - 46, SZ - 46, SX + 46, SZ + 46, oy, B.path, B.rock);
      for (let z = SZ - 46; z <= SZ + 46; z++) for (let x = SX - 46; x <= SX + 46; x++) {
        const d = MH.dist(x + 0.5, z + 0.5, SX, SZ);
        if (d > 46.5) continue;
        if (d > 40) MH.paint(w, x, z, (((x >> 1) + (z >> 1)) & 1) ? B.marbleDk : B.path);
        else if (d > 38.6) MH.paint(w, x, z, B.trim);
        else MH.paint(w, x, z, paveAt(x, z));
      }
      MH.retain(w, SX - 46, SZ - 46, SX + 46, SZ + 46, B.marbleDk, B.trim);
      const Y = oy + 1, RD = 34;
      const rC = (x, z) => Math.hypot(x + 0.5 - SX, z + 0.5 - SZ);
      // 기단(두 단)과 몸채(속은 꽉 찼다): 낱돌 쌓기 겉면
      w.cyl(SX, SZ, Y, Y + 1, 39, B.marbleDk); w.ring(SX, SZ, Y + 1, 37.4, 39, B.trim); w.cyl(SX, SZ, Y + 2, Y + 3, 37, B.marbleDk); w.ring(SX, SZ, Y + 3, 35.4, 37, B.trim);
      for (let z = SZ - RD - 1; z <= SZ + RD + 1; z++) for (let x = SX - RD - 1; x <= SX + RD + 1; x++) {
        const r = rC(x, z); if (r > RD) continue;
        const outer = r > RD - 1.5, u = Math.round(Math.atan2(z + 0.5 - SZ, x + 0.5 - SX) * RD);
        for (let y = Y + 4; y <= Y + 35; y++) w.set(x, y, z, outer ? (y >= Y + 34 ? B.trim : y <= Y + 5 ? B.marbleDk : ashlar(u, y, 3)) : B.marble);
      }
      // 20칸: 홀수는 세로 창(창살·가로살, 창턱, 이맛돌), 짝수는 벽기둥(받침·주두)
      for (let a = 0; a < 20; a++) {
        const ang = a / 20 * Math.PI * 2, ca = Math.cos(ang), sa = Math.sin(ang);
        for (let t = -3; t <= 3; t++) {
          const tx = -sa, tz = ca;                          // 접선 방향
          if (a % 2) {
            for (const rr of [RD - 0.6, RD - 1.4]) {
              const x = Math.floor(SX + ca * rr + tx * t * 0.95), z = Math.floor(SZ + sa * rr + tz * t * 0.95);
              if (Math.abs(t) <= 2) for (let y = Y + 12; y <= Y + 25; y++) w.set(x, y, z, rr > RD - 1 ? ((t === 0 || y === Y + 21) ? B.trim : B.win) : B.marble);
            }
            const xs = Math.floor(SX + ca * (RD + 0.5) + tx * t * 0.95), zs = Math.floor(SZ + sa * (RD + 0.5) + tz * t * 0.95);
            if (Math.abs(t) <= 3) { w.set(xs, Y + 11, zs, B.trim); }
            const xf = Math.floor(SX + ca * (RD - 0.6) + tx * t * 0.95), zf = Math.floor(SZ + sa * (RD - 0.6) + tz * t * 0.95);
            if (Math.abs(t) === 3) for (let y = Y + 11; y <= Y + 26; y++) w.set(xf, y, zf, B.marbleDk);
            if (Math.abs(t) <= 3) { w.set(xf, Y + 26, zf, B.marbleDk); w.set(xf, Y + 27, zf, t === 0 ? B.brass : B.marbleDk); }
            if (t === 0) { const xk = Math.floor(SX + ca * (RD + 0.5)), zk = Math.floor(SZ + sa * (RD + 0.5)); w.set(xk, Y + 27, zk, B.brass); w.set(xk, Y + 28, zk, B.brass); }
          } else if (Math.abs(t) <= 1) {
            for (const rr of [RD + 0.5, RD + 1.4]) {
              const x = Math.floor(SX + ca * rr + tx * t * 0.95), z = Math.floor(SZ + sa * rr + tz * t * 0.95);
              for (let y = Y + 4; y <= Y + 33; y++) w.set(x, y, z, (y <= Y + 5 || y >= Y + 31) ? B.trim : B.marbleDk);
              w.set(x, Y + 34, z, B.trim); w.set(x, Y + 35, z, B.trim);
            }
          }
        }
      }
      // 띠돌림(창 아래·가운데), 처마 돌림띠, 옥상 바닥과 난간(동자 + 손잡이)
      for (let z = SZ - RD - 3; z <= SZ + RD + 3; z++) for (let x = SX - RD - 3; x <= SX + RD + 3; x++) {
        const r = rC(x, z);
        if (r > RD && r <= RD + 1.2) { if (!w.get(x, Y + 8, z)) w.set(x, Y + 8, z, B.marbleDk); if (!w.get(x, Y + 9, z)) w.set(x, Y + 9, z, B.marbleDk); if (!w.get(x, Y + 30, z)) w.set(x, Y + 30, z, B.trim); }
        if (r <= RD + 2.6) { w.set(x, Y + 36, z, r > RD + 1.3 ? B.trim : B.marbleDk); w.set(x, Y + 37, z, r > RD - 1 ? B.trim : (r > 26 ? B.marbleDk : B.marble)); }
      }
      for (let a = 0; a < 72; a++) {
        const ang = a / 72 * Math.PI * 2, x = Math.floor(SX + Math.cos(ang) * (RD + 0.8)), z = Math.floor(SZ + Math.sin(ang) * (RD + 0.8));
        if (a % 2 === 0) w.box(x, Y + 38, z, x, Y + 40, z, a % 6 === 0 ? B.marbleDk : B.trim);
      }
      w.ring(SX, SZ, Y + 41, RD - 0.6, RD + 1.6, B.trim);
      // 옥상 안쪽 별자리 원판
      w.ring(SX, SZ, Y + 37, 23, 24.6, B.silver);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, x = Math.floor(SX + Math.cos(a) * 20), z = Math.floor(SZ + Math.sin(a) * 20); w.box(x, Y + 37, z, x + 1, Y + 37, z + 1, k % 3 ? B.starB : B.starG); }
      // 정문(남쪽): 판자문(테두리 살·판·놋 고리), 현관 기둥 넷, 황동 차양과 별, 넉 단 돌계단, 등주 둘
      const DZf = SZ + RD - 1;
      for (let x = SX - 6; x <= SX + 5; x++) {
        for (let z = DZf - 2; z <= SZ + RD + 2; z++) for (let y = Y + 4; y <= Y + 23; y++) if (rC(x, z) > RD - 3) w.set(x, y, z, 0);
        for (let y = Y + 4; y <= Y + 21; y++) {
          const stile = x === SX - 6 || x === SX + 5 || x === SX - 1 || x === SX || y === Y + 4 || y === Y + 12 || y === Y + 21;
          w.set(x, y, DZf - 2, stile ? B.doorDk : B.door);
        }
        w.set(x, Y + 22, DZf - 2, B.marbleDk); w.set(x, Y + 23, DZf - 2, B.marbleDk);
        for (let z = DZf - 1; z <= SZ + RD + 2; z++) { w.set(x, Y + 3, z, B.marble); }
      }
      for (const x of [SX - 3, SX + 2]) w.set(x, Y + 12, DZf - 1, B.brass);
      for (const x of [SX - 8, SX - 7, SX + 6, SX + 7]) for (let z = DZf - 2; z <= SZ + RD + 2; z++) for (let y = Y + 4; y <= Y + 23; y++) w.set(x, y, z, B.marbleDk);
      for (const cx of [SX - 11, SX - 8, SX + 7, SX + 10]) {
        w.box(cx, Y + 4, SZ + RD + 3, cx + 1, Y + 5, SZ + RD + 4, B.trim);
        w.box(cx, Y + 6, SZ + RD + 3, cx + 1, Y + 21, SZ + RD + 4, B.marble);
        w.box(cx, Y + 22, SZ + RD + 3, cx + 1, Y + 22, SZ + RD + 4, B.trim);
      }
      w.box(SX - 12, Y + 23, DZf - 1, SX + 11, Y + 23, SZ + RD + 6, B.brass); w.box(SX - 11, Y + 24, DZf, SX + 10, Y + 24, SZ + RD + 5, B.brassDk);
      for (let x = SX - 12; x <= SX + 11; x++) if (x % 2 === 0) w.set(x, Y + 22, SZ + RD + 6, B.brassDk);
      w.box(SX - 1, Y + 25, SZ + RD + 3, SX, Y + 26, SZ + RD + 4, B.starG);
      for (let s = 0; s < 4; s++) {
        const top = Y + 3 - s, z0 = SZ + RD + 3 + s * 2;
        for (let x = SX - 13 - 2 * s; x <= SX + 12 + 2 * s; x++) for (const z of [z0, z0 + 1]) {
          if (s === 0 && ((x >= SX - 11 && x <= SX - 10) || (x >= SX - 8 && x <= SX - 7) || (x >= SX + 7 && x <= SX + 8) || (x >= SX + 10 && x <= SX + 11))) { w.set(x, top, z, B.marbleDk); continue; }
          MH.setH(w, x, z, top, s % 2 ? B.marble : B.marbleDk, B.marbleDk);
        }
      }
      for (const lx of [SX - 22, SX + 21]) lampPost(lx, SZ + RD + 8, 12, oy);
      lights.push({ p: [SX + 0.5, Y + 20, SZ + RD + 6], c: '#d0e0ff', i: 1.1, d: 32, flicker: 0.05, night: true, srcR: 16 });
      // 망원경 받침(월드)과 경통(부품, 수평으로 돈다)
      const MY = Y + 38;
      w.cyl(SX, SZ, MY, MY + 2, 10.4, B.brassDk); w.ring(SX, SZ, MY + 2, 8.4, 10.4, B.brass); w.cyl(SX, SZ, MY + 3, MY + 3, 7.4, B.brassDk);
      w.cyl(SX, SZ, MY + 4, MY + 9, 4.6, B.iron); w.cyl(SX, SZ, MY + 10, MY + 12, 2.6, B.brassDk); w.ring(SX, SZ, MY + 8, 4, 5.4, B.brassDk);
      const scope = w.prop({ name: 'scope', pivot: [SX + 0.5, MY + 20, SZ + 0.5], axis: 'y', speed: 0.05, clipOK: 40 });
      const L = 48, TY = MY + 19, SL = 0.5;      // 경통 길이·높이·기울기(월드 높이 224칸 안에 들게)
      // 경통: 축에서 거리로 깎은 둥근 통(속은 비움), 뒤쪽 굵은 접안부, 황동 띠 넷, 앞쪽 이슬막이 테
      { const ax = [0, SL, 0.78], al = Math.hypot(ax[1], ax[2]), dir = [0, ax[1] / al, ax[2] / al], P0 = [SX + 0.5, TY + 0.5, SZ + 0.5];
        for (let z = SZ - 22; z <= SZ + 42; z++) for (let y = TY - 18; y <= TY + 32; y++) for (let x = SX - 8; x <= SX + 8; x++) {
          const v = [x + 0.5 - P0[0], y + 0.5 - P0[1], z + 0.5 - P0[2]], tl = v[1] * dir[1] + v[2] * dir[2], t = tl / (L * al);
          if (t < -0.35 || t > 1) continue;
          const rad = Math.hypot(v[0], v[1] - dir[1] * tl, v[2] - dir[2] * tl);
          const band = [0.2, 0.4, 0.6, 0.8].some(q => Math.abs(t - q) < 0.018), cap = t > 0.9;
          const R = t < 0 ? 6 : (cap ? 5.6 : band ? 5.7 : 5) - t * 0.6;
          if (rad > R || rad < R - 1.8) continue;
          scope.set(x, y, z, cap || band || (t < 0 && t > -0.05) ? B.brassDk : B.brass);
        }
      }
      const tipZ = Math.round(SZ + L * 0.78), tipY = Math.round(TY + L * SL);
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) if (dx * dx + dy * dy <= 10) scope.set(SX + dx, tipY + dy, tipZ + 3, B.lens);
      const fy = Math.round(TY + 0.55 * L * SL), fz = Math.round(SZ + 0.55 * L * 0.78);
      scope.line(SX + 5, fy + 5, fz - 4, SX + 5, fy + 7, fz + 6, B.brassDk, 1.2); scope.box(SX + 5, fy + 7, fz + 7, SX + 5, fy + 8, fz + 7, B.lens);
      // 경통을 받치는 멍에
      scope.box(SX - 9, MY + 13, SZ, SX + 9, MY + 14, SZ + 1, B.brassDk);
      for (const dx of [-9, 8]) scope.box(SX + dx, MY + 13, SZ, SX + dx + 1, MY + 22, SZ + 1, B.brassDk);
      scope.box(SX - 9, MY + 19, SZ, SX + 9, MY + 20, SZ + 1, B.iron);
      lights.push({ name: 'scope', p: [SX + 0.5, MY + 26, SZ + 8], c: '#a0d8ff', i: 1.2, d: 44, flicker: 0.05, srcR: 32 });
      acts.push({
        name: '대망원경', hint: '경통이 밤하늘을 따라 한 바퀴 돌아요', hit: [SX - 12, MY, SZ - 12, SX + 12, MY + 48, SZ + 42],
        run: async a => {
          a.flash('scope', 3, 6);
          await a.turn('scope', [0, 2.1, 0], 2.6); a.burst([SX + 32, tipY + 10, SZ - 16], { n: 30, colors: ['#ffffff', '#a0d8ff'], speed: 6, up: 2, life: 2, gravity: 0, spread: 12 });
          await a.wait(0.8);
          await a.turn('scope', [0, 4.4, 0], 2.8); a.burst([SX - 32, tipY + 10, SZ - 16], { n: 30, colors: ['#ffffff', '#fff8d0'], speed: 6, up: 2, life: 2, gravity: 0, spread: 12 });
          await a.wait(0.8);
          await a.turn('scope', [0, 6.283, 0], 2.4); a.unwind('scope');
        },
      });
      landmarks.push({ name: '대천문대', note: '옥상에서 도는 황동 대망원경', p: [SX + 0.5, tipY + 8, SZ + 0.5], tag: 'OBSERV' });
      // 정문: 대천문대 둥근 홀(하위 지도)로 들어간다
      acts.push(OR.goAct({ at: [SX, Y + 4, SZ + RD + 3], h: 12, name: '대천문대 안으로', goto: 'stellaris-observatory', hint: '검은 정문을 열고 별 지도가 박힌 대천문대 둥근 홀로 들어가요', hit: [SX - 6, Y + 4, DZf - 2, SX + 5, Y + 21, DZf - 1] }));

      // ───────── 정상에서 광장까지 큰 계단(두 줄마다 두 칸, 층계참마다 등주) ─────────
      const PZ = 220, PXc = 169, PZc = 221, py = MH.g(w, 168, PZ);
      MH.flatten(w, 116, 184, 221, 257, py, B.path, B.rock);
      {
        let k = 0;
        for (let z = SZ + 47; z < 188; z++, k++) {
          const y = Math.max(py, oy - 2 * Math.floor((k + 1) / 2));
          for (let x = SX - 10; x <= SX + 9; x++) {
            const edge = x <= SX - 9 || x >= SX + 8;
            MH.setH(w, x, z, y, edge ? B.marbleDk : (((k + 1) >> 1) & 1 ? B.path : B.marble), B.rock);
            for (let q = 1; q <= 14; q++) w.set(x, y + q, z, 0);
          }
          if (k % 10 === 5 && y > py) for (const x of [SX - 12, SX + 11]) { const gg = MH.g(w, x, z); w.box(x, gg + 1, z, x + 1, gg + 10, z + 1, B.marbleDk); w.box(x, gg + 11, z, x + 1, gg + 12, z + 1, B.lamp); w.box(x, gg + 13, z, x + 1, gg + 13, z + 1, B.trim); }
        }
      }
      lights.push({ p: [SX - 11, MH.g(w, SX - 12, 160) + 12, 161], c: '#d0e0ff', i: 0.9, d: 26, flicker: 0.05, night: true, srcR: 12 });

      // ───────── 혼천의 광장 ─────────
      for (let z = 184; z <= 257; z++) for (let x = 116; x <= 221; x++) {
        const d = MH.dist(x + 0.5, z + 0.5, PXc, PZc);
        if (d >= 35.4) continue;
        let b;
        if (d > 33) b = B.marble;
        else if (Math.abs(d - 31) < 0.8) b = B.trim;
        else if (Math.abs(d - 12) < 0.8) b = B.silver;
        else {
          // 둥근 판석: 4칸 너비 고리, 고리마다 엇갈린 이음
          const ring = Math.floor(d / 4), th = Math.atan2(z + 0.5 - PZc, x + 0.5 - PXc), seg = th * d / 6 + ring * 0.5;
          b = (d % 4 < 0.8 || Math.abs(seg - Math.round(seg)) * 6 < 0.7) ? B.paveJ : B.marbleDk;
        }
        MH.paint(w, x, z, b);
      }
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; for (let r = 14; r <= 30; r++) if ((r >> 1) % 2) { MH.paint(w, Math.floor(PXc + Math.cos(a) * r), Math.floor(PZc + Math.sin(a) * r), B.silver); MH.paint(w, Math.floor(PXc + Math.cos(a) * r + 0.6), Math.floor(PZc + Math.sin(a) * r + 0.6), B.silver); } }
      const stars = [[63, 97], [67, 100], [71, 97], [73, 102], [70, 106], [97, 96], [102, 100], [100, 105], [94, 108], [64, 121], [68, 125], [75, 123], [96, 123], [102, 119], [92, 126], [60, 110], [108, 110]].map(([x, z]) => [2 * x, 2 * z]);
      for (const [sx, sz] of stars) { const b = hash3(sx, 1, sz) > 0.5 ? B.starG : B.starB; for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) MH.paint(w, sx + dx, sz + dz, b); for (const [dx, dz] of [[2, 0], [-1, 1], [0, -1], [1, 2]]) MH.paint(w, sx + dx, sz + dz, B.starB); }
      for (let i = 0; i < stars.length - 1; i++) if (i % 5 !== 4 && Math.hypot(stars[i][0] - stars[i + 1][0], stars[i][1] - stars[i + 1][1]) < 16) { const [ax, az] = stars[i], [bx, bz] = stars[i + 1]; const nn = Math.ceil(Math.hypot(bx - ax, bz - az)); for (let s = 3; s < nn - 2; s++) MH.paint(w, Math.round(MH.lerp(ax, bx, s / nn)), Math.round(MH.lerp(az, bz, s / nn)), B.silver); }
      // 혼천의 받침: 대리석 단(테), 두 단 기둥, 황동 굽, 기둥, 가운데 별 구
      w.cyl(168, PZ, py + 1, py + 3, 8, B.marble); w.ring(168, PZ, py + 3, 6.4, 8.2, B.trim); w.ring(168, PZ, py + 1, 7.4, 8.4, B.marbleDk);
      w.cyl(168, PZ, py + 4, py + 8, 5.2, B.marbleDk); w.ring(168, PZ, py + 8, 4.2, 5.4, B.trim);
      w.box(167, py + 9, PZ - 1, 170, py + 10, PZ + 2, B.brassDk); w.box(168, py + 11, PZ, 169, py + 12, PZ + 1, B.brass);
      const ay = py + 40;
      w.box(168, py + 13, PZ, 169, ay - 6, PZ + 1, B.brass);
      for (let y = py + 16; y < ay - 6; y += 6) w.box(167, y, PZ - 1, 170, y, PZ + 2, B.brassDk);
      w.ellipsoid(168, ay, PZ, 4.6, 4.6, 4.6, B.starG, (dx, dy, dz) => true); w.ellipsoid(169, ay, PZ + 1, 4.6, 4.6, 4.6, B.starG, () => true);
      // 두 칸 두께 고리(부품): 바깥 테·안쪽 테, 눈금마다 별 마디
      const ring2 = (p, r, plane, b, mark, marks) => {
        const N = Math.ceil(r * 14), step = Math.round(N / marks);
        for (let i = 0; i < N; i++) {
          const a = i / N * Math.PI * 2, mk = i % step === 0;
          for (const rr of [r, r - 1]) for (const q of [0, 1]) {
            const u = Math.cos(a) * rr, v = Math.sin(a) * rr;
            let x, y, z;
            if (plane === 'xz') { x = PXc + u; y = ay + q; z = PZc + v; }
            else if (plane === 'xy') { x = PXc + u; y = ay + 0.5 + v; z = PZc - 1 + q; }
            else { x = PXc - 1 + q; y = ay + 0.5 + u; z = PZc + v; }
            p.set(Math.floor(x), Math.floor(y), Math.floor(z), mk ? mark : b);
          }
        }
      };
      const rA = w.prop({ name: 'ringA', pivot: [PXc, ay + 1, PZc], axis: 'y', speed: 0.25 }); ring2(rA, 24, 'xz', B.brass, B.starB, 12);
      const rB = w.prop({ name: 'ringB', pivot: [PXc, ay + 1, PZc], axis: 'y', speed: -0.4, clipOK: 12 }); ring2(rB, 20, 'xy', B.brass, B.starG, 8);
      const rCp = w.prop({ name: 'ringC', pivot: [PXc, ay + 1, PZc], axis: 'y', speed: 0.7, clipOK: 12 }); ring2(rCp, 16, 'yz', B.silver, B.starB, 6);
      lights.push({ name: 'arm', p: [PXc, ay + 1, PZc], c: '#fff0c0', i: 1.3, d: 40, flicker: 0.05, srcR: 6 });
      acts.push({
        name: '혼천의', hint: '세 고리가 빠르게 돌며 별빛을 뿌려요', hit: [144, py + 12, PZ - 24, 192, ay + 24, PZ + 24],
        run: async a => { a.flash('arm', 3, 4.5); a.spin('ringA', 8, 4.5); a.spin('ringB', 8, 4.5); a.spin('ringC', 8, 4.5); for (let k = 0; k < 9; k++) { a.burst([PXc, ay + 1, PZc], { n: 24, colors: ['#fff8d0', '#8ab8ff', '#ffffff'], speed: 20, up: 4, life: 1.8, gravity: 1, spread: 2 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '혼천의 광장', note: '세 고리가 스스로 도는 혼천의', p: [PXc, ay + 30, PZc] });
      landmarks.push({ name: '별자리 정원', note: '바닥에 박힌 별 지도', p: [133, py + 12, 245] });
      // 광장 둘레 벤치(다리·앉는 판·등받이 살)와 화분
      for (const [bx, bz] of [[124, 200], [208, 200], [124, 236], [208, 236]]) {
        if (MH.g(w, bx, bz) !== py) continue;
        const back = bx < 168 ? -1 : 1;
        for (let dz = 0; dz < 7; dz++) for (let dx = 0; dx < 3; dx++) {
          w.set(bx + dx, py + 2, bz + dz, B.wood);
          if ((dz === 0 || dz === 6) && dx !== 1) w.set(bx + dx, py + 1, bz + dz, B.iron);
          if (dx === (back > 0 ? 2 : 0)) { if (dz === 0 || dz === 6 || dz === 3) w.box(bx + dx, py + 3, bz + dz, bx + dx, py + 5, bz + dz, B.iron); else { w.set(bx + dx, py + 4, bz + dz, B.wood); w.set(bx + dx, py + 5, bz + dz, B.iron); } }
        }
        w.box(bx, py + 1, bz + 9, bx + 2, py + 3, bz + 11, B.marbleDk); w.box(bx, py + 3, bz + 9, bx + 2, py + 3, bz + 11, B.trim);
        w.box(bx, py + 4, bz + 9, bx + 2, py + 5, bz + 11, B.leaf2); w.set(bx + 1, py + 6, bz + 10, B.leaf2); w.set(bx + 1, py + 5, bz + 9, B.starB);
      }

      // ───────── 유성 구덩이 ─────────
      const MXX = 262, MZZ = 256;
      // 구덩이 자리는 계단식 비탈(벼랑) 위라, 둘레 평균 높이로 둔덕을 고르고(깎고 채움) 바깥으로 갈수록 본래 땅에 섞는다
      let my = 0, nm = 0; for (let a = 0; a < 6.28; a += 0.1) { my += MH.g(w, Math.round(MXX + Math.cos(a) * 21), Math.round(MZZ + Math.sin(a) * 21)); nm++; }
      my = Math.round(my / nm) + 2;
      for (let z = MZZ - 34; z <= MZZ + 34; z++) for (let x = MXX - 34; x <= MXX + 34; x++) {
        const d = MH.dist(x, z, MXX, MZZ), gg = MH.g(w, x, z);
        if (gg < 0 || d > 34) continue;
        if (d > 20) {
          const t = MH.sstep(20, 34, d), h = Math.round(MH.lerp(my + 1, gg, t));
          if (h !== gg) MH.setH(w, x, z, h, w.slope[x + W * z] >= 3 && t > 0.6 ? B.rock : (hash3(x, 3, z) > 0.5 ? B.grass2 : B.grass), B.rock);
          if (d <= 24 && hash3(x >> 1, 2, z >> 1) > 0.4) { w.set(x, h + 1, z, B.rockM); if (hash3(x >> 1, 4, z >> 1) > 0.7) w.set(x, h + 2, z, B.rockM); if (hash3(x >> 1, 5, z >> 1) > 0.92) w.set(x, h + 3, z, B.rockM); }
          continue;
        }
        const dep = Math.round((20 - d) * 0.7);
        MH.setH(w, x, z, my + 1 - dep, d < 8 ? B.rockM : B.dirt, B.rock);
      }
      w.sphere(MXX, my - 10, MZZ, 6, B.meteor, (dx, dy) => dy >= -2); w.sphere(MXX, my - 12, MZZ, 6.8, B.rockM, (dx, dy) => dy < -2);
      for (let i = 0; i < 9; i++) { const a = i * 0.7 + 0.3; for (let s = 8; s <= 22; s++) if (hash3(i, s >> 1, 3) > 0.25) { const x = MXX + Math.cos(a + s * 0.025) * s, z = MZZ + Math.sin(a + s * 0.025) * s; MH.paint(w, Math.floor(x), Math.floor(z), B.meteor); MH.paint(w, Math.floor(x + 0.7), Math.floor(z + 0.7), B.meteor); } }
      for (const [dx, dz] of [[12, -6], [-10, 10], [4, 14]]) { const gg = MH.g(w, MXX + dx, MZZ + dz); w.box(MXX + dx, gg + 1, MZZ + dz, MXX + dx + 1, gg + 3, MZZ + dz + 1, B.meteor); w.set(MXX + dx, gg + 4, MZZ + dz, B.meteor); }
      // 구덩이 둘레의 관측용 밧줄 울타리(말뚝 + 처진 밧줄)
      { const posts = [];
        for (let a = 0; a < 6.28; a += 0.26) { const x = Math.round(MXX + Math.cos(a) * 26), z = Math.round(MZZ + Math.sin(a) * 26), gg = MH.g(w, x, z); if (gg < 0 || w.get(x, gg + 1, z)) { posts.push(null); continue; } w.box(x, gg + 1, z, x, gg + 5, z, B.wood); w.set(x, gg + 6, z, B.woodDk); posts.push([x, gg + 5, z]); }
        for (let i = 0; i < posts.length; i++) { const p = posts[i], q = posts[(i + 1) % posts.length]; if (!p || !q || Math.abs(p[1] - q[1]) > 3) continue; for (let s = 1; s < 8; s++) { const t = s / 8; const x = Math.round(MH.lerp(p[0], q[0], t)), z = Math.round(MH.lerp(p[2], q[2], t)), y = Math.round(MH.lerp(p[1], q[1], t) - Math.sin(t * Math.PI) * 1.2); if (!w.get(x, y, z)) w.set(x, y, z, B.rope); } } }
      lights.push({ name: 'meteor', p: [MXX + 0.5, my - 2, MZZ + 0.5], c: '#ffa050', i: 1.6, d: 40, flicker: 0.2, srcR: 8 });
      acts.push({
        name: '유성 구덩이', hint: '하늘에서 별똥별이 쏟아져 구덩이에 떨어져요', hit: [MXX - 18, my - 12, MZZ - 18, MXX + 18, my + 4, MZZ + 18],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            a.burst([MXX - 36 + k * 8, my + 112, MZZ - 32], { n: 26, colors: ['#ffe0a0', '#ffffff', '#ffb86a'], speed: 2, up: -48, life: 1.3, gravity: 28, spread: 2 });
            await a.wait(0.8);
            a.flash('meteor', 4, 0.5);
            a.burst([MXX + 0.5, my - 4, MZZ + 0.5], { n: 50, colors: ['#ffb86a', '#ffe0a0', '#ff7a3a'], speed: 20, up: 16, life: 1.3, gravity: 18, spread: 4 });
            await a.wait(0.3);
          }
        },
      });
      landmarks.push({ name: '유성 구덩이', note: '아직 식지 않은 별 조각', p: [MXX + 0.5, my + 22, MZZ + 0.5] });

      // ───────── 점성술사의 집(돔 지붕) ─────────
      // 받침돌(두 단·갓돌), 낱돌 몸채(속은 꽉 참), 귀돌, 창(창살·창틀·창턱·이맛돌), 판자문과 문틀·등·디딤돌, 처마 돌림띠, 평지붕과 난간, 드럼과 돔(기와 줄, 은 갈빗대, 꼭지)
      const domeHouse = (x0, z0, face) => {
        const S = 22, x1 = x0 + S - 1, z1 = z0 + S - 1, Cx = x0 + S / 2, Cz = z0 + S / 2;
        const Yh = MH.maxG(w, x0 - 2, z0 - 2, x1 + 2, z1 + 2) + 1;
        MH.footing(w, x0 - 2, z0 - 2, x1 + 2, z1 + 2, Yh, B.marbleDk);
        w.box(x0 - 1, Yh, z0 - 1, x1 + 1, Yh + 1, z1 + 1, B.marbleDk); w.walls(x0 - 1, Yh + 1, z0 - 1, x1 + 1, Yh + 1, z1 + 1, B.trim);
        w.box(x0, Yh + 2, z0, x1, Yh + 15, z1, B.marble);
        const Sd = SIDES(x0, z0, x1, z1);
        for (const k of ['s', 'n', 'e', 'w']) {
          const sd = Sd[k];
          for (let u = sd.u0; u <= sd.u1; u++) for (let y = Yh + 2; y <= Yh + 15; y++) {
            const cd = Math.min(u - sd.u0, sd.u1 - u), c = (y - Yh - 2) >> 1;
            let b;
            if (y >= Yh + 14) b = B.trim;
            else if (y <= Yh + 3) b = B.marbleDk;
            else if (cd < ((c & 1) ? 2 : 3)) b = (c & 1) ? B.trim : B.marbleDk;
            else b = ashlar(u, y, 5);
            put(sd, u, y, 0, b);
          }
          for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, Yh + 15, 1, B.trim);
          const cu = sd.u0 + 11, isDoor = k === face;
          for (const wc of isDoor ? [] : [sd.u0 + 5, sd.u0 + 16]) {
            for (let y = Yh + 5; y <= Yh + 13; y++) for (let c = -2; c <= 2; c++) {
              if (y === Yh + 5) { put(sd, wc + c, y, 1, B.trim); continue; }
              if (Math.abs(c) === 2 || y === Yh + 12 || y === Yh + 13) { put(sd, wc + c, y, 0, B.marbleDk); continue; }
              put(sd, wc + c, y, 0, (c === 0 || y === Yh + 9) ? B.trim : B.win);
            }
            put(sd, wc, Yh + 13, 1, B.trim);
          }
          if (isDoor) {
            for (let c = -2; c <= 1; c++) for (let y = Yh + 2; y <= Yh + 10; y++) {
              const stile = c === -2 || c === 1 || y === Yh + 2 || y === Yh + 6 || y === Yh + 10;
              put(sd, cu + c, y, 0, stile ? B.doorDk : B.door);
            }
            put(sd, cu, Yh + 6, 1, B.brass);
            for (const c of [-3, 2]) for (let y = Yh + 2; y <= Yh + 11; y++) put(sd, cu + c, y, 1, B.marbleDk);
            for (let c = -4; c <= 3; c++) { put(sd, cu + c, Yh + 12, 1, B.trim); put(sd, cu + c, Yh + 11, 1, c === -4 || c === 3 ? 0 : B.marbleDk); }
            put(sd, cu - 1, Yh + 13, 1, B.starG); put(sd, cu, Yh + 13, 1, B.starB);
            // 문 옆 벽등(쇠 팔 + 등롱)
            for (const lc of [cu - 6, cu + 5]) { put(sd, lc, Yh + 11, 1, B.iron); put(sd, lc, Yh + 11, 2, B.iron); put(sd, lc, Yh + 10, 2, B.lamp); put(sd, lc, Yh + 9, 2, B.lamp); put(sd, lc, Yh + 8, 2, B.iron); }
            // 문 쪽 벽: 창 대신 문 양옆 둥근 별 창(작은 원창)
            for (const wc of [sd.u0 + 4, sd.u0 + 17]) for (let y = Yh + 7; y <= Yh + 11; y++) for (let c = -2; c <= 2; c++) { const rr = Math.hypot(c, y - Yh - 9); if (rr <= 1.5) put(sd, wc + c, y, 0, B.win); else if (rr <= 2.6) put(sd, wc + c, y, 0, B.marbleDk); }
            // 디딤돌(문 앞 폭 10칸, 두 줄)
            // 디딤돌(문 앞 폭 10칸): 첫 줄은 문턱 높이, 그 뒤로 땅에 닿을 때까지 한 줄에 한 칸씩 내려가는 돌계단
            for (let d = 2; d <= 24; d++) {
              const top = Yh + 1 - Math.max(0, d - 2);
              let any = false;
              for (let c = -5; c <= 4; c++) {
                const p = sd.at(cu + c, d), gg = MH.g(w, p[0], p[1]);
                if (d > 3 && gg >= top) continue;
                any = true;
                const edge = c === -5 || c === 4;
                MH.setH(w, p[0], p[1], top, d === 2 ? B.trim : (edge ? B.marbleDk : (d & 1 ? B.marble : B.marbleDk)), B.marbleDk);
                for (let y = top + 1; y <= Yh + 12; y++) { const b = w.get(p[0], y, p[1]); if (b !== B.lamp && b !== B.iron) w.set(p[0], y, p[1], 0); }
              }
              if (!any) break;
            }
          }
        }
        // 평지붕(처마), 난간(동자 + 갓돌)
        const Tp = Yh + 16;
        w.box(x0 - 1, Tp, z0 - 1, x1 + 1, Tp, z1 + 1, B.iron);
        for (let x = x0 - 1; x <= x1 + 1; x++) for (let z = z0 - 1; z <= z1 + 1; z++) {
          if (x !== x0 - 1 && x !== x1 + 1 && z !== z0 - 1 && z !== z1 + 1) continue;
          const u = (x === x0 - 1 || x === x1 + 1) ? z : x;
          w.set(x, Tp + 1, z, B.marbleDk); if (u % 3 !== 1) w.set(x, Tp + 2, z, B.marbleDk); w.set(x, Tp + 3, z, B.trim);
        }
        // 드럼과 돔
        const R0 = 9.6;
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const r = Math.hypot(x + 0.5 - Cx, z + 0.5 - Cz);
          if (r <= 9.4) for (let y = Tp + 1; y <= Tp + 5; y++) w.set(x, y, z, y >= Tp + 4 ? (r > 7.8 ? B.trim : B.marbleDk) : ((y === Tp + 2 && r > 8.4 && (Math.round(Math.atan2(z + 0.5 - Cz, x + 0.5 - Cx) * 8) & 1)) ? B.win : B.marbleDk));
          const dy0 = Tp + 6;
          for (let dy = 0; dy <= R0; dy++) {
            const d3 = Math.hypot(r, dy * 1.05); if (d3 > R0) continue;
            const ang = Math.atan2(z + 0.5 - Cz, x + 0.5 - Cx), rib = Math.abs(ang * 4 / Math.PI - Math.round(ang * 4 / Math.PI)) * r < 0.55 && r > 1.5;
            w.set(x, dy0 + dy, z, dy === 0 && r > R0 - 1.4 ? B.silver : rib ? B.silver : ((dy >> 1) & 1 ? B.roofN2 : B.roofN));
          }
        }
        const fx = Math.floor(Cx - 0.5), fz = Math.floor(Cz - 0.5), dt = Tp + 6 + Math.floor(R0 / 1.05) + 1;
        w.box(fx, dt, fz, fx + 1, dt + 1, fz + 1, B.silver); w.set(fx, dt + 2, fz, B.silver); w.set(fx, dt + 3, fz, B.starB);
        const sd = Sd[face], dc = sd.u0 + 11, p0 = sd.at(dc - 2, 0), p1 = sd.at(dc + 1, 0), pf = sd.at(dc, 3);
        return { Y: Yh, top: Tp, dome: [fx, dt + 3, fz], door: [Math.min(p0[0], p1[0]), Yh + 2, Math.min(p0[1], p1[1]), Math.max(p0[0], p1[0]), Yh + 10, Math.max(p0[1], p1[1])], front: [pf[0], Yh + 2, pf[1]] };
      };
      const domes = [], houses = [];
      // 집터 고르기: 집 자리(둘레 2칸 포함)는 평균 높이로 깎고 메워 평평하게, 바깥 12칸은 본래 비탈로 서서히 잇는다(높은 받침 위에 뜨지 않게)
      const natural = new Set([B.grass, B.grass2, B.dirt, B.rock, B.rockDk, B.rockM]);
      const pad = (x0, z0, x1, z1) => {
        let s = 0, c = 0; for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) { s += MH.g(w, x, z); c++; }
        const lv = Math.round(s / c), M = 12;
        for (let z = z0 - M; z <= z1 + M; z++) for (let x = x0 - M; x <= x1 + M; x++) {
          const gg = MH.g(w, x, z); if (gg < 0) continue;
          const inR = x >= x0 && x <= x1 && z >= z0 && z <= z1;
          if (!inR && (!natural.has(w.get(x, gg, z)) || w.get(x, gg + 1, z))) continue;
          const dd = Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(z0 - z, 0, z - z1)) + (n.vn(x * 0.2, z * 0.2) - 0.5) * 3;
          const h = Math.round(MH.lerp(lv, gg, MH.sstep(0, M, dd)));
          if (h !== gg) MH.setH(w, x, z, h, inR ? B.dirt : Math.abs(h - gg) > 3 && hash3(x >> 2, 7, z >> 2) > 0.5 ? B.dirt : (hash3(x >> 1, 3, z >> 1) > 0.5 ? B.grass2 : B.grass), B.dirt);
        }
      };
      for (const [x, z, face] of [[56, 200, 'e'], [64, 248, 'e'], [72, 288, 'e'], [240, 292, 'n'], [256, 180, 'w']]) {
        pad(x - 2, z - 2, x + 23, z + 23);
        const h = domeHouse(x, z, face); houses.push(h); domes.push(h.dome);
        if (domes.length <= 3) lights.push({ p: [h.front[0] + 0.5, h.Y + 8, h.front[2] + 0.5], c: '#d0e0ff', i: 0.8, d: 22, flicker: 0.05, night: true, srcR: 6 });
      }

      // ───────── 관측 탑 둘: 받침, 낱돌, 띠돌림, 세로 창, 총안 ─────────
      const tower2 = (cx, cz, y0, h, r) => {
        const inside = (dx, dz, rr) => (dx + 0.5) * (dx + 0.5) + (dz + 0.5) * (dz + 0.5) <= rr * rr;
        const layer = (y, rr, f) => { const R = Math.ceil(rr) + 1; for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (inside(dx, dz, rr)) { const b = f(dx, dz); if (b) w.set(cx + dx, y, cz + dz, b); } };
        MH.footing(w, cx - Math.ceil(r) - 3, cz - Math.ceil(r) - 3, cx + Math.ceil(r) + 3, cz + Math.ceil(r) + 3, y0, B.marbleDk);
        layer(y0, r + 2, () => B.marbleDk); layer(y0 + 1, r + 1.2, () => B.trim);
        for (let y = y0 + 2; y < y0 + h; y++) layer(y, r, (dx, dz) => inside(dx, dz, r - 1.2) ? B.marble : ashlar(Math.round(Math.atan2(dz + 0.5, dx + 0.5) * r), y, 9));
        for (let y = y0 + 16; y < y0 + h - 6; y += 16) for (const yy of [y, y + 1]) layer(yy, r + 1.2, (dx, dz) => inside(dx, dz, r - 0.2) ? 0 : (yy === y ? B.marbleDk : B.trim));
        for (let y = y0 + 8; y < y0 + h - 10; y += 12) for (const [ax, az] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let t = -1; t <= 1; t++) for (let yy = y; yy <= y + 5; yy++) {
          const R = Math.floor(r - 0.5), x = cx + (ax ? (ax > 0 ? R : -R - 1) : t), z = cz + (az ? (az > 0 ? R : -R - 1) : t);
          w.set(x, yy, z, (t === 0 || yy === y + 3) ? B.trim : B.win);
        }
        const top = y0 + h;
        layer(top - 2, r + 1.6, (dx, dz) => inside(dx, dz, r - 0.2) ? 0 : B.marbleDk); layer(top - 1, r + 1.6, () => B.trim);
        layer(top, r + 1.6, (dx, dz) => inside(dx, dz, r - 0.4) ? 0 : B.marble);
        layer(top + 1, r + 1.6, (dx, dz) => inside(dx, dz, r - 0.4) ? 0 : (((Math.floor((Math.atan2(dz + 0.5, dx + 0.5) + 4) * r * 0.5)) & 1) ? B.trim : 0));
        return top;
      };
      const tTop = [];
      for (const [tx, tz] of [[62, 132], [272, 120]]) {
        const gy = MH.g(w, tx, tz) + 1;
        const t = tower2(tx, tz, gy, 48, 7.6);
        tTop.push(t);
        if (tx < 168) { w.line(tx, t, tz, tx + 10, t + 12, tz + 8, B.brass, 1.2); w.box(tx + 11, t + 13, tz + 9, tx + 12, t + 14, tz + 10, B.lens); w.box(tx - 1, t, tz - 1, tx + 1, t + 1, tz + 1, B.iron); continue; }
        // 동쪽 탑의 망원경은 부품(수평으로 돈다)
        w.box(tx - 1, t - 2, tz - 1, tx + 1, t + 1, tz + 1, B.iron);
        const ts = w.prop({ name: 'tscope', pivot: [tx + 0.5, t + 2, tz + 0.5], axis: 'y' });
        ts.line(tx, t + 3, tz, tx + 10, t + 14, tz + 8, B.brass, 1.2); ts.box(tx + 11, t + 15, tz + 9, tx + 12, t + 16, tz + 10, B.lens); ts.box(tx, t + 2, tz, tx, t + 3, tz, B.brassDk);
        lights.push({ name: 'tscope', p: [tx + 9, t + 12, tz + 7], c: '#a0d8ff', i: 1.1, d: 36, flicker: 0.05, srcR: 6 });
      }

      // ───────── 선돌과 나무 ─────────
      const menh = w.prop({ name: 'menhirs', pivot: [PXc, py + 2, PZc], axis: 'y' }), mPts = [];
      for (let i = 0; i < 10; i++) {
        const a = i * 0.63, x = Math.round(168 + Math.cos(a) * 44), z = Math.round(PZ + Math.sin(a) * 30);
        if (MH.g(w, x, z) !== py || MH.g(w, x + 1, z + 1) !== py || w.get(x, py + 1, z) || w.get(x + 1, py + 1, z + 1) || Math.abs(x - 168) <= 16) continue;
        const ht = 12 + 2 * (i % 3);
        menh.box(x, py + 1, z, x + 1, py + ht, z + 1, B.marbleDk); menh.box(x, py + 7, z, x + 1, py + 8, z + 1, i % 2 ? B.starG : B.starB);
        menh.box(x, py + ht + 1, z, x + 1, py + ht + 2, z + 1, B.trim); menh.set(x, py + ht + 3, z, B.trim);
        mPts.push([x + 1, py + 6, z + 1]);
      }
      for (let i = 0; i < 40; i++) {
        const x = w.ri(16, 320), z = w.ri(16, 320), gg = MH.g(w, x, z);
        if (gg > base + 2 && w.slope[x + W * z] < 2 && !w.get(x, gg + 1, z) && w.get(x, gg, z) !== B.path && w.get(x, gg, z) !== B.marbleDk && MH.dist(x, z, SX, SZ) > 52 && MH.dist(x, z, MXX, MZZ) > 30 && MH.dist(x, z, 168, PZ) > 42 && !(z > 268 && x > 112 && x < 232))
          pine(x, gg + 1, z, w.ri(22, 36), 7.6);
      }
      // 벼랑 발치의 무너진 돌무더기: 바로 위로 높은 벼랑이 선 자리에 크고 작은 바위 무리
      for (let i = 0, made = 0; i < 2400 && made < 46; i++) {
        const x = w.ri(12, W - 13), z = w.ri(12, D - 13), gg = MH.g(w, x, z);
        if (gg < 0 || w.get(x, gg + 1, z) || !natural.has(w.get(x, gg, z)) || w.slope[x + W * z] > 2) continue;
        if (MH.dist(x, z, MXX, MZZ) < 30 || (x > 150 && x < 186 && z > 140 && z < 290)) continue;
        let up = 0; for (const [dx, dz] of [[0, -5], [0, 5], [-5, 0], [5, 0], [0, -8], [0, 8]]) up = Math.max(up, MH.g(w, x + dx, z + dz) - gg);
        if (up < 9) continue;
        made++;
        const k = 1 + (hash3(x, 9, z) * 3 | 0);
        for (let j = 0; j < k; j++) {
          const rx = x + w.ri(-3, 3), rz = z + w.ri(-3, 3), rg = MH.g(w, rx, rz);
          if (rg < 0 || Math.abs(rg - gg) > 2 || w.get(rx, rg + 1, rz)) continue;
          MH.rock(w, rx, rg + 1, rz, j ? w.r(1.1, 1.8) : w.r(1.8, 3.2), hash3(rx, 2, rz) > 0.6 ? B.rockDk : B.rock, j ? 0 : B.grass2);
        }
      }
      for (let i = 0; i < 520; i++) {
        const x = w.ri(4, W - 5), z = w.ri(4, D - 5), gg = MH.g(w, x, z);
        if (gg < 0 || w.get(x, gg + 1, z) || (w.get(x, gg, z) !== B.grass && w.get(x, gg, z) !== B.grass2)) continue;
        const r = hash3(x, 6, z);
        if (r > 0.96) MH.rock(w, x, gg + 1, z, 2.6, B.rock, B.grass2);
        else if (r > 0.86) { w.set(x, gg + 1, z, B.leaf); w.set(x, gg + 2, z, B.starB); }
        else { w.set(x, gg + 1, z, B.leaf2); if (r > 0.5) w.set(x, gg + 2, z, B.leaf2); }
      }

      // ───────── 동쪽 관측 탑: 작은 망원경이 하늘을 훑는다 ─────────
      const ET = tTop[1];
      acts.push({
        name: '관측 탑', hint: '동쪽 탑의 망원경이 하늘을 훑으며 별을 찾아요', hit: [262, ET - 14, 110, 286, ET + 18, 132],
        run: async a => {
          a.flash('tscope', 3, 6);
          await a.turn('tscope', [0, 1.6, 0], 1.4); a.burst([272 + 12, ET + 28, 120 - 14], { n: 24, colors: ['#ffffff', '#a0d8ff'], speed: 6, up: 2, life: 1.6, gravity: 0, spread: 8 });
          await a.wait(0.5);
          await a.turn('tscope', [0, 3.6, 0], 1.4); a.burst([272 - 14, ET + 28, 120 - 8], { n: 24, colors: ['#ffffff', '#fff8d0'], speed: 6, up: 2, life: 1.6, gravity: 0, spread: 8 });
          await a.wait(0.5);
          await a.turn('tscope', [0, 6.283, 0], 1.6); a.unwind('tscope');
          a.burst([272 + 14, ET + 20, 120 + 12], { n: 30, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 8, up: 2, life: 1.8, gravity: 0, spread: 6 });
        },
      });
      // ───────── 점성술사의 집(남동쪽): 돔에서 망원경(부품, 평소엔 안에 숨음)이 솟아 돈다 ─────────
      const [DX, DT, DZ] = domes[3];
      const dscope = w.prop({ name: 'dscope', pivot: [DX + 1, DT + 1, DZ + 1], axis: 'y', off0: [0, -20, 0] });
      dscope.line(DX, DT + 3, DZ, DX + 6, DT + 19, DZ + 6, B.brass, 1.2); dscope.box(DX, DT + 2, DZ, DX + 1, DT + 3, DZ + 1, B.brassDk);
      dscope.box(DX + 6, DT + 21, DZ + 6, DX + 7, DT + 22, DZ + 7, B.lens); dscope.box(DX + 8, DT + 20, DZ + 6, DX + 8, DT + 21, DZ + 7, B.lens);
      acts.push({
        name: '돔 망원경', hint: '점성술사의 돔에서 망원경이 솟아올라 빙 돌아요', hit: [DX - 10, DT - 12, DZ - 10, DX + 10, DT + 4, DZ + 10],
        run: async a => {
          a.burst([DX + 1, DT + 2, DZ + 1], { n: 24, colors: ['#c8d4e0', '#ffffff'], speed: 6, up: 4, life: 1, gravity: 6, spread: 4 });
          await a.move('dscope', [0, 0, 0], 1.6);
          await a.turn('dscope', [0, 6.283, 0], 3.6);
          a.unwind('dscope');
          for (let k = 0; k < 3; k++) { a.burst([DX + 8, DT + 28, DZ + 8], { n: 24, colors: ['#ffffff', '#a0d8ff', '#fff8d0'], speed: 6, up: 4, life: 1.6, gravity: 0, spread: 6 }); await a.wait(0.4); }
          await a.move('dscope', [0, -20, 0], 1.4);
        },
      });
      // 점성술사의 집 문(북쪽): 집 안(하위 지도)으로 들어간다
      { const h = houses[3], d = h.door; acts.push(OR.goAct({ at: [d[0] + 2, d[1], d[2] - 4], h: 12, name: '점성술사의 집 안으로', goto: 'stellaris-astrologer', hint: '돔 지붕 집의 검은 문을 열고 수정구와 별자리 책이 있는 점성실로 들어가요', hit: [d[0], d[1], d[2], d[3], d[4], d[5]] })); }

      // ───────── 별자리 정원: 바닥의 별이 떠올라 하늘에 큰 별자리(부품, 평소엔 숨김)를 그린다 ─────────
      const CGX = 136, CGZ = 230, CGY = py + 80, U = Math.SQRT1_2;
      const cst = w.prop({ name: 'cstars', pivot: [CGX + 0.5, py + 2, CGZ + 0.5], scl0: [0, 0, 0] });
      const dip = [[-20, 1], [-13, 4], [-6, 5], [0, 2], [1, -4], [10, -5], [12, 2]].map(([u, v]) => [Math.round(CGX + 2 * u * U), CGY + 2 * v, Math.round(CGZ - 2 * u * U)]);
      for (let i = 0; i < dip.length - 1; i++) { const [ax2, ay2, az] = dip[i], [bx, by2, bz] = dip[i + 1 === 7 ? 3 : i + 1]; cst.line(ax2, ay2, az, bx, by2, bz, B.silver, 0.6); }
      cst.line(dip[6][0], dip[6][1], dip[6][2], dip[3][0], dip[3][1], dip[3][2], B.silver, 0.6);
      for (const [x, y, z] of dip) { cst.box(x - 2, y, z, x + 2, y, z, B.starG); cst.box(x, y - 2, z, x, y + 2, z, B.starG); cst.box(x, y, z - 2, x, y, z + 2, B.starB); cst.box(x - 1, y - 1, z - 1, x + 1, y + 1, z + 1, B.starG); }
      acts.push({
        name: '별자리 승천', hint: '바닥의 별들이 하늘로 떠올라 커다란 별자리를 그려요', hit: [116, py, 230, 152, py + 6, 254],
        run: async a => {
          a.glow(1.7, 7);
          for (let k = 0; k < 4; k++) a.burst([CGX + 0.5 - k * 4, py + 2, CGZ + 12.5 + k * 2], { n: 20, colors: ['#fff8d0', '#8ab8ff'], speed: 2, up: 24, life: 1.6, gravity: 0, spread: 4 });
          await a.tween('cstars', { scl: [1, 1, 1] }, 2.4);
          for (const p of dip) { a.burst([p[0] + 0.5, p[1] + 0.5, p[2] + 0.5], { n: 18, colors: ['#ffffff', '#fff8d0', '#8ab8ff'], speed: 8, up: 0, life: 1.6, gravity: 0, spread: 2 }); await a.wait(0.25); }
          await a.wait(1.8);
          await a.tween('cstars', { scl: [0, 0, 0] }, 1.8);
        },
      });
      // ───────── 혜성: 서쪽 탑에서 부르면 하늘을 가로지른다(부품, 평소엔 숨김) ─────────
      const C0 = [80, base + 164, 252], C1 = [256, base + 148, 76];
      const comet = w.prop({ name: 'comet', pivot: [C0[0] + 0.5, C0[1] + 0.5, C0[2] + 0.5], scl0: [0, 0, 0] });
      comet.sphere(C0[0], C0[1], C0[2], 5.6, B.starG);
      for (let s = 1; s <= 40; s++) { const r = 5 - s * 0.12, x = Math.round(C0[0] - s * 0.72), y = Math.round(C0[1] + s * 0.15), z = Math.round(C0[2] + s * 0.72); if (r > 0.5) comet.sphere(x, y, z, r, s < 14 ? B.starG : B.starB); else comet.set(x, y, z, B.starB); }
      const cOff = t => [(C1[0] - C0[0]) * t, (C1[1] - C0[1]) * t, (C1[2] - C0[2]) * t];
      acts.push({
        name: '혜성', hint: '서쪽 탑에서 부르면 꼬리 긴 혜성이 하늘을 가로질러 지평선 너머로 사라져요', hit: [50, tTop[0] - 14, 120, 76, tTop[0] + 16, 144],
        run: async a => {
          a.burst([63, tTop[0] + 4, 133], { n: 30, colors: ['#8ab8ff', '#ffffff'], speed: 2, up: 32, life: 1.4, gravity: 0, spread: 2 });
          await a.tween('comet', { scl: [1, 1, 1] }, 0.6);
          for (let k = 1; k <= 6; k++) { const o = cOff(k / 6); await a.move('comet', o, 0.9, t => t); a.burst([C0[0] + o[0] - 4, C0[1] + o[1], C0[2] + o[2] + 4], { n: 24, colors: ['#fff8d0', '#8ab8ff', '#ffffff'], speed: 3, up: -2, life: 1.6, gravity: 4, spread: 4 }); }
          a.lightning(0.3);
          await a.move('comet', cOff(1.75), 1.2, t => t);
          await a.respawn('comet', 1.0);
        },
      });
      // ───────── 선돌 공명: 광장 둘레의 선돌이 떠올라 광장을 한 바퀴 돈다 ─────────
      acts.push({
        name: '선돌 공명', hint: '광장 둘레의 선돌들이 떠올라 광장을 한 바퀴 돌아요', hit: [200, py + 1, 188, 216, py + 20, 252],
        run: async a => {
          a.glow(1.6, 7);
          for (const p of mPts) a.burst([p[0], py + 2, p[2]], { n: 14, colors: ['#c8d0e0', '#8a94a8'], speed: 4, up: 4, life: 0.8, gravity: 12, spread: 2, flat: true });
          await a.move('menhirs', [0, 10, 0], 1.2);
          a.turn('menhirs', [0, 6.283, 0], 4.2);
          for (let k = 0; k < 7; k++) { a.burst([PXc, py + 18, PZc], { n: 24, colors: ['#fff8d0', '#8ab8ff'], speed: 22, up: 0, life: 1.6, gravity: 0, spread: 2, flat: true }); await a.wait(0.6); }
          a.unwind('menhirs');
          await a.move('menhirs', [0, 0, 0], 1.2);
        },
      });

      // ───────── 남쪽 아랫단의 별빛 시장 — 천막 노점, 별 등불 줄, 달시계, 점성 천막 ─────────
      const MKX = 172, MKZ = 296, mky = MH.g(w, MKX, MKZ);
      MH.flatten(w, 120, 272, 225, 321, mky, B.path, B.rock);
      MH.retain(w, 120, 272, 225, 321, B.marbleDk, B.trim);
      for (let z = 272; z <= 321; z++) for (let x = 120; x <= 225; x++) {
        const cx = x >> 1, cz = z >> 1;
        if ((cx + cz * 3) % 9 === 0) MH.paint(w, x, z, B.marbleDk); else if (hash3(cx, 21, cz) > 0.985) MH.paint(w, x, z, B.starB);
      }
      // 광장에서 시장으로 내려가는 계단
      MH.flight(w, { axis: 'z', c: 168, half: 5, a: 246, b: 284, ha: py, hb: mky, step: B.path, edge: B.marbleDk, rail: B.trim, post: B.marbleDk, postGap: 6, clear: 14 });
      // 노점: 네 기둥, 진열대(앞널·윗판), 물건(병·구슬·등), 상자, 두 칸 줄무늬 차양(뒤가 높고 앞이 낮다)과 물결 끝단
      const stall = (x, z, m) => {
        const sx = 12, sz = 10, y = MH.maxG(w, x, z, x + sx - 1, z + sz - 1) + 1;
        MH.footing(w, x, z, x + sx - 1, z + sz - 1, y, B.wood);
        for (const [px, pz] of [[x, z], [x + sx - 1, z], [x, z + sz - 1], [x + sx - 1, z + sz - 1]]) w.box(px, y, pz, px, y + 10, pz, B.wood);
        w.box(x + 1, y, z + sz - 2, x + sx - 2, y + 3, z + sz - 1, B.wood); w.box(x + 1, y + 3, z + sz - 3, x + sx - 2, y + 3, z + sz - 1, B.woodDk);
        for (let dx = 1; dx < sx - 1; dx++) { const gb = m.goods[dx % m.goods.length]; if (dx % 2) { w.set(x + dx, y + 4, z + sz - 2, gb); if (dx % 4 === 1) w.set(x + dx, y + 5, z + sz - 2, gb); } else w.set(x + dx, y + 4, z + sz - 3, m.goods[(dx + 1) % m.goods.length]); }
        w.box(x + 2, y, z + 2, x + 4, y + 2, z + 3, B.brassDk); w.box(x + 2, y + 3, z + 2, x + 3, y + 3, z + 3, m.a2);
        for (let dz = -2; dz <= sz + 1; dz++) for (let dx = -2; dx <= sx + 1; dx++) {
          const yy = y + 11 - Math.floor((dz + 2) / 5);
          w.set(x + dx, yy, z + dz, ((dx + 2) >> 1) & 1 ? m.a1 : m.a2);
          if (dz === sz + 1 && ((dx + 2) >> 1) & 1) w.set(x + dx, yy - 1, z + dz, m.a1);
        }
        return y;
      };
      const tents = [[124, 276, 0], [144, 276, 1], [196, 276, 2], [212, 276, 0], [122, 304, 1], [208, 304, 2]];
      const cl = [[B.cloth1, B.cloth2], [B.cloth3, B.cloth2], [B.cloth1, B.cloth3]], goodsS = [[B.starG, B.lens, B.silver], [B.starB, B.brass, B.lanternB], [B.moon, B.starG, B.cloth3]];
      for (const [x, z, k] of tents) stall(x, z, { a1: cl[k][0], a2: cl[k][1], goods: goodsS[k] });
      // 별 등불 줄: 기둥 넷, 처진 밧줄에 매단 등(두 칸)
      const garland = (ax, bx, z, y, beads) => {
        const N = (bx - ax);
        for (let i = 0; i <= N; i++) {
          const t = i / N, x = ax + i, yy = Math.round(y - Math.sin(t * Math.PI) * 4);
          w.set(x, yy, z, B.iron);
          if (i % 6 === 3) { const b = beads[(i / 6 | 0) % beads.length]; w.set(x, yy - 1, z, B.iron); w.set(x, yy - 2, z, b); w.set(x, yy - 3, z, b); }
        }
      };
      garland(124, 220, 288, mky + 18, [B.lanternB, B.starG, B.starB]);
      garland(124, 220, 316, mky + 18, [B.lanternB, B.starB]);
      for (const x of [122, 222]) for (const z of [288, 316]) { w.box(x, mky + 1, z, x, mky + 18, z, B.wood); w.box(x - 1, mky + 1, z - 1, x + 1, mky + 1, z + 1, B.marbleDk); w.box(x - 1, mky + 18, z, x + 1, mky + 18, z, B.wood); w.box(x, mky + 19, z, x, mky + 20, z, B.lanternB); }
      lights.push({ name: 'mkt', p: [173, mky + 14, 289], c: '#ffd890', i: 1.2, d: 44, flicker: 0.12, srcR: 12 });
      // 달시계: 둥근 단(두 층·테), 시각 눈금, 해시계 바늘(부품), 위에 뜬 초승달 원반
      const MDX = 172, MDZ = 304;
      w.cyl(MDX, MDZ, mky + 1, mky + 2, 13, B.marbleDk); w.ring(MDX, MDZ, mky + 2, 11.6, 13.2, B.trim); w.cyl(MDX, MDZ, mky + 3, mky + 4, 11, B.marble); w.ring(MDX, MDZ, mky + 4, 9.6, 11.2, B.trim);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, x = Math.floor(MDX + 0.5 + Math.cos(a) * 10), z = Math.floor(MDZ + 0.5 + Math.sin(a) * 10); w.box(x, mky + 5, z, x, mky + 5, z, k % 3 ? B.silver : B.starG); if (k % 3 === 0) w.set(x, mky + 6, z, B.starG); }
      w.box(MDX, mky + 5, MDZ, MDX + 1, mky + 19, MDZ + 1, B.brass);
      for (let dy = -7; dy <= 7; dy++) for (let dx = -7; dx <= 7; dx++) { const r = Math.hypot(dx + 0.5, dy + 0.5); if (r <= 6.6 && !(dx > 0 && Math.hypot(dx + 0.5 - 3.4, dy + 0.5) < 5.4)) w.box(MDX + dx, mky + 28 + dy, MDZ, MDX + dx, mky + 28 + dy, MDZ + 1, B.moon); }
      w.box(MDX, mky + 20, MDZ, MDX + 1, mky + 21, MDZ + 1, B.brassDk);
      const hand = w.prop({ name: 'hand', pivot: [MDX + 1, mky + 6, MDZ + 1], axis: 'y', speed: 0.08 });
      hand.box(MDX + 2, mky + 5, MDZ, MDX + 8, mky + 5, MDZ + 1, B.brassDk); hand.box(MDX + 8, mky + 6, MDZ, MDX + 8, mky + 7, MDZ + 1, B.starG); hand.box(MDX - 4, mky + 5, MDZ, MDX - 2, mky + 5, MDZ + 1, B.brassDk);
      lights.push({ name: 'moondial', p: [MDX + 1, mky + 28, MDZ + 1], c: '#e0e8ff', i: 1.2, d: 36, flicker: 0.05, srcR: 6 });
      acts.push({
        name: '달시계', hint: '달시계 바늘이 빙글 돌고 위에 뜬 초승달이 환하게 빛나요', hit: [MDX - 12, mky + 1, MDZ - 12, MDX + 12, mky + 34, MDZ + 12],
        run: async a => {
          a.flash('moondial', 4, 5); a.glow(1.6, 5);
          await a.turn('hand', [0, 6.283 * 2, 0], 3.2, t => t * t * (3 - 2 * t));
          a.unwind('hand');
          for (let k = 0; k < 3; k++) { a.burst([MDX + 1, mky + 28, MDZ + 1], { n: 40, colors: ['#ffffff', '#e0e8ff', '#fff8d0'], speed: 16, up: 2, life: 1.4, gravity: 0, spread: 4 }); await a.wait(0.4); }
        },
      });
      landmarks.push({ name: '별빛 시장', note: '밤에만 열리는 별가루 노점 거리', p: [173, mky + 44, 283], tag: 'MARKET' });
      // 하늘로 띄우는 별 등불(부품): 날아오른 뒤 다시 노점 위에 나타난다
      const lanPos = [[132, 294], [152, 294], [192, 294], [212, 294], [158, 290]];
      lanPos.forEach(([x, z], k) => {
        const p = w.prop({ name: 'lan' + k, pivot: [x + 1, mky + 12, z + 1], bob: 0.6, bobSpeed: 1 + k * 0.1, phase: k });
        p.box(x, mky + 10, z, x + 1, mky + 12, z + 1, B.lanternB); p.box(x, mky + 13, z, x + 1, mky + 13, z + 1, B.cloth2); p.set(x, mky + 14, z, B.cloth2); p.box(x, mky + 9, z, x + 1, mky + 9, z + 1, B.wood);
        w.box(x, mky + 1, z, x, mky + 6, z, B.wood); w.set(x, mky + 7, z, B.brassDk);
      });
      acts.push({
        name: '별 등불 띄우기', hint: '시장의 별 등불들이 하나씩 밤하늘로 날아올라요', hit: [128, mky + 1, 276, 216, mky + 16, 318],
        run: async a => {
          a.flash('mkt', 2.4, 7);
          const go = async k => { const [x, z] = lanPos[k]; await a.path('lan' + k, [[-4 + 2 * k, 24, 4], [4 - 2 * k, 52, -8], [-8 + k * 4, 88, -20]], 4.5); a.burst([x - 8 + k * 4 + 1, mky + 100, z - 20 + 1], { n: 16, colors: ['#ffd890', '#fff8d0'], speed: 6, up: 2, life: 1.4, gravity: 0, spread: 2 }); await a.respawn('lan' + k, 1.0); };
          const all = [];
          for (let k = 0; k < lanPos.length; k++) { all.push(go(k)); await a.wait(0.5); }
          await Promise.all(all);
        },
      });
      // 점성 천막: 원뿔 천막(띠 무늬), 입구 둘, 받침 위 수정구와 그 둘레를 도는 작은 별들(부품)
      const OTX = 144, OTZ = 306;
      for (let y = 0; y < 20; y++) { const r = 10.4 - y * 0.5; w.ring(OTX, OTZ, mky + 1 + y, Math.max(0, r - 1.6), r, (y % 6 === 4 || y % 6 === 5) ? B.cloth2 : B.cloth3); }
      w.box(OTX, mky + 21, OTZ, OTX, mky + 22, OTZ, B.brassDk); w.box(OTX, mky + 23, OTZ, OTX, mky + 24, OTZ, B.starG);
      w.box(OTX + 6, mky + 1, OTZ - 2, OTX + 11, mky + 8, OTZ + 2, 0); w.box(OTX - 2, mky + 1, OTZ + 6, OTX + 2, mky + 8, OTZ + 11, 0);
      w.box(OTX - 1, mky + 1, OTZ - 1, OTX + 1, mky + 1, OTZ + 1, B.brassDk); w.box(OTX, mky + 2, OTZ, OTX, mky + 4, OTZ, B.brassDk); w.sphere(OTX, mky + 8, OTZ, 3, B.orbG);
      lights.push({ name: 'orb', p: [OTX + 0.5, mky + 8, OTZ + 0.5], c: '#c0a0ff', i: 1.2, d: 28, flicker: 0.1, srcR: 4 });
      const orbit = w.prop({ name: 'fstars', pivot: [OTX + 0.5, mky + 14, OTZ + 0.5], axis: 'y', speed: 0.3, scl0: [0, 0, 0] });
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, x = Math.round(OTX + Math.cos(a) * 16), z = Math.round(OTZ + Math.sin(a) * 16), yy = mky + 26 + (k % 2) * 2; orbit.box(x, yy, z, x + 1, yy + 1, z + 1, k % 2 ? B.starB : B.starG); orbit.box(x, yy - 2, z, x + 1, yy - 1, z + 1, B.starB); }
      acts.push({
        name: '점성 수정구', hint: '점성 천막의 수정구가 빛나며 별들이 천막 위를 돌아요', hit: [OTX - 10, mky + 1, OTZ - 10, OTX + 10, mky + 22, OTZ + 10],
        run: async a => {
          a.flash('orb', 4, 6); a.glow(1.5, 6);
          await a.tween('fstars', { scl: [1, 1, 1] }, 1);
          a.spin('fstars', 6, 4);
          for (let k = 0; k < 6; k++) { a.burst([OTX + 0.5, mky + 24, OTZ + 0.5], { n: 20, colors: ['#c0a0ff', '#ffffff', '#fff8d0'], speed: 6, up: 10, life: 1.4, gravity: 0, spread: 2 }); await a.wait(0.6); }
          await a.tween('fstars', { scl: [0, 0, 0] }, 1);
        },
      });
      landmarks.push({ name: '점성 천막', note: '수정구로 별점을 봐 주는 천막', p: [OTX + 0.5, mky + 36, OTZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
