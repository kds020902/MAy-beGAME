// 월광 첨탑 — 달빛 호수의 바위섬들, 흰 첨탑과 아치 다리, 차원문, 물에서 솟는 달빛 다리, 동쪽 별빛 서고 섬 (336칸, 2배 해상도: 1칸 ≈ 25cm)
// 세부: 두 단 받침과 쇠시리, 세로 홈과 은 나선띠가 감긴 첨탑 몸통, 창틀·창살·창턱·쐐기돌 있는 창, 까치발 받친 난간 발코니,
// 작은 뾰족탑 왕관과 은 갈빗대 수정 지붕, 쌍여닫이 판자문(징·손잡이·벽등), 난간동자 있는 아치 다리와 교각,
// 주춧돌·기둥머리 있는 정자 기둥, 박공·기둥 현관의 둥근 서고, 무늬 돌길, 가지·잎뭉치가 있는 은빛 나무. playerScale 2 (사람 키 6.8칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 280;
  const P1 = v => Math.round(v * 1.25) + 4;   // 옛 128칸 배치 → 168칸 배치(원본 좌표)
  const P = v => 2 * P1(v);                   // → 336칸 배치
  MAPS.push({
    id: 'lunaris', cat: 'magic', name: '월광 첨탑', en: 'Lunaris Spires', color: '#9ae8e0', seed: 353, base: 44, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '달빛을 모으는 흰 첨탑들의 구역. 보름밤이면 호수 위로 빛의 다리가 떠올라 섬과 섬을 잇는다. 동쪽 별빛 서고 섬에서는 떠도는 책들이 달의 기록을 읽고, 은빛 나룻배가 서고와 달의 첨탑을 오간다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '월광 사제단'], ['명물', '초승달 첨탑 · 달빛 다리'], ['새 구역', '별빛 서고 섬 · 달 거울'], ['주의', '차원문 앞에서 이름을 부르지 말 것']] },
    sky: ['#1a3a4a', '#060e18', '#bff0ff'], stars: true,
    hemi: ['#d0f0ff', '#102030', 0.68], sun: ['#e0f4ff', 0.6, [0.45, 1, 0.5]],
    day: { sky: ['#e0f4f8', '#6ab0d8', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.6], sun: ['#fff8ec', 0.8, [0.45, 1, 0.5]] },
    liquid: ['#1a4a6a', '#3a8ab0', '#ffffff'], liqSpeed: 0.4,
    fog: { start: 0.84, floor: 20, depth: 20, haze: [48, 0.18, 8], hazeColor: '#2a5a6a' },
    camY: 8, zoom: 1.1,
    particles: [
      { n: 220, colors: ['#9af8f0', '#e0ffff'], mode: 'rise', speed: 1, area: [168, 192, 18], y0: 48, y1: 140 },
      { n: 240, colors: ['#e0f0ff', '#c8e8ff'], mode: 'drift', speed: 0.4, y0: 52, y1: 220 },
    ],
    blocks: {
      moss: { c: '#3a4a50', top: '#4a7a7a', v: 0.1 }, moss2: { c: '#3a4a50', top: '#56867e', v: 0.1 }, sand: { c: '#6a7a80', top: '#8a9aa0', v: 0.06 },
      dirt: { c: '#3a4a50', v: 0.08 }, rock: { c: '#7a8494', v: 0.06, pat: 'big' }, rockDk: { c: '#4a5260', v: 0.06, pat: 'stone' },
      path: { c: '#3a4a50', top: '#c8d0d8', v: 0.04, pat: 'stone' }, marble: { c: '#e8eef4', v: 0.03, pat: 'big' }, marbleDk: { c: '#b8c4d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f8fa', v: 0.02 },
      silver: { c: '#c8d4e0', v: 0.04 }, leafS: { c: '#a8c8c8', v: 0.09 }, leafT: { c: '#7ab0b0', v: 0.09 }, bark: { c: '#6a6a7a', v: 0.05 }, door: { c: '#4a5a6a', v: 0.03, pat: 'plank' },
      win: { c: '#c8f4ff', night: true, day: '#8ab0c8' }, lamp: { c: '#c8fff4', night: true, day: '#a8c4c0' },
      crysT: { c: '#7af0e0', glow: true }, crysP: { c: '#d0f8ff', glow: true }, crysV: { c: '#c8a8ff', glow: true },
      portal: { c: '#b890ff', glow: true }, portal2: { c: '#e8d0ff', glow: true }, rune: { c: '#8af0ff', glow: true }, beam: { c: '#e8ffff', glow: true },
      whale: { c: '#4a7aa8', v: 0.06 }, whaleB: { c: '#c8f4ff', glow: true }, lotus: { c: '#ffc8f0', glow: true }, lant: { c: '#ffe0a0', glow: true },
      plank: { c: '#8a9098', v: 0.05, pat: 'plank' }, reed: { c: '#5a8a80', v: 0.1 }, roofB: { c: '#5a6a9a', v: 0.04, pat: 'tile' },
      book1: { c: '#5a7ac8', v: 0.05 }, book2: { c: '#c87a9a', v: 0.05 }, book3: { c: '#d8c88a', v: 0.05 }, page: { c: '#f4f0e0', glow: true },
      // 2배 해상도 세부용
      pave1: { c: '#3a4a50', top: '#c8d0d8', v: 0.03 }, pave2: { c: '#3a4a50', top: '#b8c2cc', v: 0.03 }, paveJ: { c: '#3a4a50', top: '#8a96a2', v: 0.02 },
      marbleJ: { c: '#9aa6b4', v: 0.03 }, doorDk: { c: '#36444f', v: 0.03 }, roofB2: { c: '#4a5a88', v: 0.04 }, glassF: { c: '#a8c0d8', v: 0.03 },
      leafDk: { c: '#5a8a8a', v: 0.08 }, leafLt: { c: '#d0e8e8', v: 0.06 }, barkDk: { c: '#4e4e5c', v: 0.05 }, reed2: { c: '#6e9e90', v: 0.1 }, reedTop: { c: '#c8d8d0', v: 0.05 },
      lotusLf: { c: '#4a8a7a', v: 0.06 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, WL = base + 2;
      const AX = 300, AZ = 152;                              // 새 섬: 별빛 서고
      // 원본(168칸) 좌표의 섬 목록: 높이 함수는 원본 좌표에서 계산해 두 배로 키운다
      const isles = [[P1(64), P1(56), 26, 5], [P1(26), P1(28), 17, 4], [P1(102), P1(26), 17, 4], [P1(20), P1(88), 19, 4], [P1(106), P1(92), 19, 4], [P1(64), P1(112), 13, 3], [150, 76, 14, 4], [38, 146, 8, 2], [150, 146, 9, 2], [64, 12, 8, 2]];
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const ox = x / 2, oz = z / 2;
          let hh = -6 + n.fbm(ox * 0.05, oz * 0.05) * 2;
          for (const [cx, cz, r, k] of isles) { const d = Math.hypot(ox - cx, oz - cz) + (n.fbm(ox * 0.08 + cx, oz * 0.08, 3) - 0.5) * r * 0.4; hh = Math.max(hh, MH.sstep(r + 1, r - 6, d) * (k + 3) - 2.5 + MH.sstep(r - 4, 0, d) * 2.5); }
          return base + hh * 2;
        },
        surface: (x, z, y, s) => y <= WL + 2 ? B.sand : s >= 5 ? B.rock : n.fbm(x * 0.055, z * 0.055, 2) > 0.55 ? B.moss2 : B.moss,
        under: (x, z, y, dep, s) => dep < 4 && y > WL + 2 && s < 5 ? B.dirt : ((y >> 1) % 4 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, WL);
      const lights = [], acts = [], landmarks = [];
      const top = (cx, cz) => MH.g(w, Math.round(cx), Math.round(cz));
      // 부품용: 월드에 이미 블록이 있는 칸은 건너뛴다
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); } });
      // 무늬 돌길: 4×3칸 돌, 1칸 줄눈, 줄마다 엇갈림
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.paveJ;
        return hash3(Math.floor((x + off) / 4), row, 7) > 0.5 ? B.pave1 : B.pave2;
      };
      // 둥근 마당 무늬: 동심 고리 줄눈과 방사 줄눈
      const ringPaveAt = (x, z, cx, cz) => {
        const d = Math.hypot(x - cx, z - cz), ri = Math.floor(d / 3);
        if (d % 3 < 0.7) return B.paveJ;
        const a = Math.atan2(z - cz, x - cx), seg = Math.max(6, Math.round(ri * 3.2)), s = (a + Math.PI) / (Math.PI * 2) * seg + (ri & 1) * 0.5;
        if (s % 1 < 0.12) return B.paveJ;
        return hash3(Math.floor(s), ri, 3) > 0.5 ? B.pave1 : B.pave2;
      };
      // 둥근 마당(돌 테두리 옹벽): 땅보다 높으면 옆면이 대리석 옹벽, 가장자리는 갓돌
      const pavePlaza = (cx, cz, r, y) => {
        for (let z = cz - r - 1; z <= cz + r + 1; z++) for (let x = cx - r - 1; x <= cx + r + 1; x++) {
          const d = Math.hypot(x - cx, z - cz); if (d > r + 0.3) continue;
          const g = MH.g(w, x, z), edge = d > r - 0.8;
          MH.setH(w, x, z, y, edge && g < y ? B.trim : ringPaveAt(x, z, cx, cz), g < y ? B.marbleDk : B.rock);
          if (edge && g < y) for (let yy = Math.max(1, g - 2); yy < y; yy++) if ((yy & 3) === 0) w.set(x, yy, z, B.marbleJ);
        }
      };
      const pavePath = (pts, width) => {
        for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
          const d = MH.polyDist(x + 0.5, z + 0.5, pts);
          if (d <= width) { const g = MH.g(w, x, z); if (g > WL && w.get(x, g, z) !== B.marbleDk && w.get(x, g, z) !== B.trim) w.set(x, g, z, paveAt(x, z)); }
        }
      };
      // 원통 바깥 면의 칸: 방향 dir(0:+x 1:+z 2:-x 3:-z), 가로 t, 반지름 r
      const face = (cx, cz, r, dir, t, out) => {
        const m = Math.floor(Math.sqrt(Math.max(0, r * r - t * t))) + (out || 0);
        return dir === 0 ? [cx + m, cz + t] : dir === 1 ? [cx + t, cz + m] : dir === 2 ? [cx - m, cz + t] : [cx + t, cz - m];
      };
      // 창: 창틀·가로 창살·가운데 창살·창턱·쐐기돌
      const towerWindow = (cx, cz, r, dir, y0, hgt, half) => {
        half = half || 1;
        for (let t = -half - 1; t <= half + 1; t++) for (let y = y0 - 1; y <= y0 + hgt; y++) {
          const [x, z] = face(cx, cz, r, dir, t);
          const edge = Math.abs(t) === half + 1 || y === y0 - 1 || y === y0 + hgt;
          let b = edge ? B.trim : B.win;
          if (!edge && (t === 0 || y === y0 + Math.floor(hgt * 0.55))) b = B.silver;
          w.set(x, y, z, b);
          if (!edge) { const [ix, iz] = face(cx, cz, r, dir, t, -1); w.set(ix, y, iz, B.win); }
        }
        for (let t = -half - 2; t <= half + 2; t++) { const [x, z] = face(cx, cz, r, dir, t, 1); w.set(x, y0 - 1, z, B.marbleDk); }
        const [kx, kz] = face(cx, cz, r, dir, 0, 1); w.set(kx, y0 + hgt, kz, B.crysP);
        for (let t = -half; t <= half; t++) { const [x, z] = face(cx, cz, r, dir, t); w.set(x, y0 + hgt + 1, z, B.trim); }
      };
      // 가로등: 대리석 받침, 은 기둥, 은살 등롱, 갓과 수정 꼭지
      const lampPost = (x, z, h) => {
        h = h || 8;
        const g = top(x, z); if (g <= WL || w.get(x, g + 1, z) || w.get(x, g + 2, z)) return null;
        const y = g + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.marbleDk); w.set(x, y + 2, z, B.trim);
        w.box(x, y + 3, z, x, y + h, z, B.silver);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(x + dx, y + h - 1, z + dz, B.silver);
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.silver);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.silver : B.lamp);
        w.box(x - 1, ly + 4, z - 1, x + 1, ly + 4, z + 1, B.trim); w.set(x, ly + 5, z, B.trim); w.set(x, ly + 6, z, B.crysT);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      // 둥근 기둥: 주춧돌, 몸통(세로 홈), 기둥머리
      const column = (x, z, y0, y1, b) => {
        w.box(x - 1, y0, z - 1, x + 1, y0, z + 1, B.marbleDk); w.box(x - 1, y0 + 1, z - 1, x + 1, y0 + 1, z + 1, B.trim);
        for (let y = y0 + 2; y <= y1 - 2; y++) { w.set(x, y, z, b || B.marble); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(x + dx, y, z + dz, (y % 4 === 0) ? B.marbleJ : (b || B.marble)); }
        w.box(x - 1, y1 - 1, z - 1, x + 1, y1 - 1, z + 1, B.trim); w.box(x - 1, y1, z - 1, x + 1, y1, z + 1, B.marbleDk);
      };

      // ── 첨탑: 두 단 받침, 쇠시리, 세로 결과 은 나선띠, 창, 난간 발코니, 왕관과 수정 지붕 ──
      const spire = (cx, cz, h, r, tip, step, o) => {
        o = o || {};
        const g0 = top(cx, cz), R = Math.ceil(r);
        pavePlaza(cx, cz, R + 9, g0);
        w.cyl(cx, cz, g0 + 1, g0 + 2, r + 5, B.marbleDk); w.ring(cx, cz, g0 + 2, r + 4, r + 5, B.trim);
        w.cyl(cx, cz, g0 + 3, g0 + 4, r + 3, B.marble); w.ring(cx, cz, g0 + 3, r + 2.2, r + 3, B.marbleJ); w.ring(cx, cz, g0 + 4, r + 2, r + 3, B.trim);
        const g = g0 + 5;
        w.cyl(cx, cz, g, g + 1, r + 1.4, B.marbleDk); w.ring(cx, cz, g + 2, r, r + 0.8, B.trim);
        for (let y = g; y <= g + h; y++) w.cyl(cx, cz, y, y, r - (y - g) * 0.02, B.marble);
        const rAt = y => r - (y - g) * 0.02;
        const bands = []; for (let y = g + 24; y < g + h - 8; y += 28) bands.push(y);
        const nearBand = y => bands.some(b => y >= b - 3 && y <= b + 4);
        // 세로 결
        for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; for (let y = g + 4; y < g + h - 3; y++) { if (nearBand(y)) continue; const rr = rAt(y) + 0.3; w.set(Math.round(cx + Math.cos(a) * rr), y, Math.round(cz + Math.sin(a) * rr), B.marbleDk); } }
        // 은 나선띠
        for (let y = g + 5; y < g + h; y++) {
          if (nearBand(y)) continue;
          const rr = rAt(y) + 0.8;
          for (const da of [0, 0.09]) { const a = y * 0.21 + da; w.set(Math.round(cx + Math.cos(a) * rr), y, Math.round(cz + Math.sin(a) * rr), B.silver); }
        }
        // 창: 층마다 네 방향(아래층 정면은 문)
        for (let y = g + 12, lv = 0; y < g + h - 12; y += 28, lv++) for (let dir = 0; dir < 4; dir++) {
          if (lv === 0 && dir === 1) continue;
          towerWindow(cx, cz, Math.floor(rAt(y + 3)), dir, y, lv % 2 ? 6 : 7, rAt(y) > 9 ? 1 : 0);
        }
        // 발코니: 까치발, 마루, 난간동자와 손잡이, 등
        for (const y of bands) {
          const rr = rAt(y);
          w.ring(cx, cz, y - 2, rr - 0.5, rr + 1.5, B.marbleDk); w.ring(cx, cz, y - 1, rr - 0.5, rr + 3, B.marbleDk);
          w.ring(cx, cz, y, rr - 0.5, rr + 4.5, B.marbleDk); w.ring(cx, cz, y, rr + 3.6, rr + 4.5, B.trim);
          const nn = Math.max(16, Math.round(rr * 5));
          for (let k = 0; k < nn; k++) {
            const a = k / nn * Math.PI * 2, x = Math.round(cx + Math.cos(a) * (rr + 4)), z = Math.round(cz + Math.sin(a) * (rr + 4));
            if (k % 2 === 0) w.box(x, y + 1, z, x, y + 2, z, B.silver);
            if (k % Math.round(nn / 4) === 0) w.set(x, y + 4, z, B.lamp);
          }
          w.ring(cx, cz, y + 3, rr + 3.5, rr + 4.5, B.trim);
        }
        // 정면 장식 문(작은 첨탑): 판자문, 문틀, 쐐기돌
        if (!o.noDoor) {
          for (let t = -3; t <= 3; t++) for (let y = g; y <= g + 10; y++) {
            const [x, z] = face(cx, cz, rAt(y), 1, t);
            const edge = Math.abs(t) === 3 || y === g + 10;
            w.set(x, y, z, edge ? B.trim : (t === 0 ? B.doorDk : B.door));
            if (!edge && (y === g + 3 || y === g + 7) && Math.abs(t) === 2) { const [sx, sz] = face(cx, cz, rAt(y), 1, t, 1); w.set(sx, y, sz, B.silver); }
          }
          const [kx, kz] = face(cx, cz, r, 1, 0, 1); w.set(kx, g + 11, kz, B.crysP);
        }
        // 왕관: 처마 고리, 뾰족탑 여덟, 수정 지붕과 은 갈빗대
        const rt = rAt(g + h), yc = g + h + 1;
        w.ring(cx, cz, yc - 1, rt - 0.5, rt + 1.5, B.marbleDk);
        w.cyl(cx, cz, yc, yc, rt + 2.6, B.marbleDk); w.ring(cx, cz, yc + 1, rt + 1.6, rt + 2.6, B.trim);
        for (let k = 0; k < 8; k++) {
          const a = k / 8 * Math.PI * 2, x = Math.round(cx + Math.cos(a) * (rt + 2)), z = Math.round(cz + Math.sin(a) * (rt + 2));
          w.box(x, yc + 1, z, x, yc + 5, z, B.trim); w.set(x, yc + 6, z, B.silver); w.set(x, yc + 7, z, k % 2 ? B.crysT : B.crysP);
          const x2 = Math.round(cx + Math.cos(a + Math.PI / 8) * (rt + 2)), z2 = Math.round(cz + Math.sin(a + Math.PI / 8) * (rt + 2));
          w.box(x2, yc + 2, z2, x2, yc + 3, z2, B.marble);
        }
        const r0 = rt + 1.2, st = step || 0.28;
        const t = MH.cone(w, cx, cz, yc + 2, r0, tip, st);
        for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + Math.PI / 8; for (let i = 0, rr = r0; rr > 1.2; i++, rr -= st) w.set(Math.round(cx + Math.cos(a) * (rr + 0.2)), yc + 2 + i, Math.round(cz + Math.sin(a) * (rr + 0.2)), B.silver); }
        w.box(cx, t, cz, cx, t + 2, cz, B.silver); w.set(cx, t + 3, cz, tip);
        return { top: t + 3, mid: g + Math.round(h * 0.55), g, g0, cx, cz, r, rAt };
      };

      // ══════════ 달의 첨탑(가운데 섬) ══════════
      const MCX = P(64), MCZ = P(50);
      const main = spire(MCX, MCZ, 124, 12, B.crysP, 0.42, { noDoor: true });
      // 받침 둘레의 작은 탑 넷과 버팀 아치
      for (let k = 0; k < 4; k++) {
        const a = k * Math.PI / 2 + Math.PI / 4, tx = Math.round(MCX + Math.cos(a) * 21), tz = Math.round(MCZ + Math.sin(a) * 21), g = main.g;
        MH.footing(w, tx - 5, tz - 5, tx + 5, tz + 5, g, B.marbleDk);
        w.cyl(tx, tz, g - 1, g, 5.4, B.marbleDk); w.ring(tx, tz, g, 4.4, 5.4, B.trim);
        w.cyl(tx, tz, g + 1, g + 26, 3.5, B.marble);
        for (let y = g + 1; y <= g + 26; y += 5) w.ring(tx, tz, y, 2.6, 3.5, B.marbleJ);
        w.ring(tx, tz, g + 14, 2.8, 4.6, B.trim); w.ring(tx, tz, g + 13, 2.8, 4, B.marbleDk);
        for (let dir = 0; dir < 4; dir++) { const [wx, wz] = face(tx, tz, 3.5, dir, 0); w.box(wx, g + 18, wz, wx, g + 21, wz, B.win); w.set(wx, g + 22, wz, B.trim); const [sx, sz] = face(tx, tz, 3.5, dir, 0, 1); w.set(sx, g + 17, sz, B.marbleDk); }
        w.cyl(tx, tz, g + 27, g + 27, 4.8, B.marbleDk); w.ring(tx, tz, g + 28, 3.8, 4.8, B.trim);
        const tt = MH.cone(w, tx, tz, g + 29, 4, B.silver, 0.34); w.box(tx, tt, tz, tx, tt + 1, tz, B.crysT);
        w.line(tx, g + 25, tz, MCX + Math.cos(a) * 12, g + 44, MCZ + Math.sin(a) * 12, B.trim, 1.1);
        w.line(tx, g + 23, tz, MCX + Math.cos(a) * 12, g + 41, MCZ + Math.sin(a) * 12, B.marbleDk, 0.8);
      }
      // 초승달(부품): 두 겹 두께
      const moon = w.prop({ name: 'moon', pivot: [MCX + 0.5, main.top + 16.5, MCZ + 1], axis: 'y', speed: 0.3 });
      for (let a = -2.3; a <= 2.3; a += 0.03) {
        const co = Math.cos(a), si = Math.sin(a);
        for (const rr of [12.4, 11.6, 10.8, 10, 9.2, 8.4, 7.6]) if (rr > 10 || Math.abs(a) < 1.5 || (rr > 8.4 && Math.abs(a) < 1.9)) for (const z of [MCZ, MCZ + 1]) moon.set(Math.round(MCX - co * rr + 4), Math.round(main.top + 16 + si * rr), z, rr > 12 ? B.silver : B.crysP);
      }
      w.box(MCX, main.top, MCZ, MCX, main.top + 2, MCZ, B.silver);
      const stones = w.prop({ name: 'stones', pivot: [MCX + 0.5, main.mid, MCZ + 0.5], axis: 'y', speed: -0.5 });
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * Math.PI * 2, x = Math.round(MCX + Math.cos(a) * 24), z = Math.round(MCZ + Math.sin(a) * 24), y = main.mid - 2 + (k % 2) * 6;
        stones.box(x, y, z, x + 1, y + 5, z + 1, k % 2 ? B.rune : B.marbleDk); stones.box(x, y + 2, z + 2, x + 1, y + 3, z + 2, B.marbleDk); stones.set(x, y + 6, z, B.silver);
      }
      lights.push({ name: 'moon', p: [MCX + 0.5, main.top + 16, MCZ + 0.5], c: '#d0f8ff', i: 1.8, d: 64, flicker: 0.05, srcR: 16 });
      // 정문(남쪽): 받침 앞 현관 단, 쌍여닫이 판자문(징·손잡이), 계단식 아치 문틀, 벽등 → 첨탑 안(하위 지도)
      {
        const g = main.g, g0 = main.g0, rr = main.rAt(g), dz = MCZ + Math.floor(rr);
        // 현관 단(받침을 앞으로 내민다)과 계단
        w.box(MCX - 6, g0 + 1, dz - 2, MCX + 6, g0 + 4, dz + 8, B.marble);
        w.box(MCX - 6, g0 + 4, dz - 2, MCX + 6, g0 + 4, dz + 8, B.trim);
        for (let x = MCX - 6; x <= MCX + 6; x++) for (let z = dz - 2; z <= dz + 7; z++) if (Math.abs(x - MCX) < 6 && z < dz + 8) w.set(x, g0 + 4, z, (x + z) % 2 ? B.marble : B.marbleDk);
        w.box(MCX - 6, g0 + 1, dz + 9, MCX + 6, g0 + 2, dz + 10, B.marbleDk); w.box(MCX - 6, g0 + 2, dz + 9, MCX + 6, g0 + 2, dz + 10, B.trim);
        for (const x of [MCX - 7, MCX + 7]) { w.box(x, g0 + 1, dz - 2, x, g0 + 6, dz + 8, B.marbleDk); w.box(x, g0 + 7, dz - 2, x, g0 + 7, dz + 8, B.trim); w.set(x, g0 + 8, dz + 8, B.lamp); }
        // 문 구멍
        for (let t = -4; t <= 4; t++) for (let y = g; y <= g + 13; y++) {
          const [x, z] = face(MCX, MCZ, main.rAt(y), 1, t), [ix, iz] = face(MCX, MCZ, main.rAt(y), 1, t, -1);
          const arch = y - g - 10 > 3 - Math.abs(t) * 0.9;
          if (Math.abs(t) === 4 || arch) { w.set(x, y, z, B.trim); continue; }
          w.set(x, y, z, 0);
          w.set(ix, y, iz, t === 0 ? B.doorDk : (y - g) % 4 === 3 ? B.marbleJ : B.door);
        }
        for (let t = -5; t <= 5; t++) { const [x, z] = face(MCX, MCZ, rr, 1, t, 1); if (Math.abs(t) >= 4) w.box(x, g, z, x, g + 11, z, B.marble); w.set(x, g + 12, z, B.marbleDk); }
        const [kx, kz] = face(MCX, MCZ, rr, 1, 0, 1); w.box(kx, g + 13, kz, kx, g + 14, kz, B.crysP);
        for (const t of [-2, 2]) for (const y of [g + 2, g + 6, g + 10]) { const [x, z] = face(MCX, MCZ, rr, 1, t); if (y < g + 10) w.set(x, y, z, B.silver); }
        for (const t of [-1, 1]) { const [x, z] = face(MCX, MCZ, rr, 1, t); w.set(x, g + 5, z, B.silver); }
        for (const t of [-6, 6]) { const [x, z] = face(MCX, MCZ, rr, 1, t, 1); w.set(x, g + 6, z, B.silver); w.box(x, g + 7, z, x, g + 8, z, B.lamp); w.set(x, g + 9, z, B.silver); }
        acts.push(OR.goAct({ at: [MCX, g, dz + 4], h: 11, hit: [MCX - 3, g, dz - 2, MCX + 3, g + 9, dz + 1], name: '달의 첨탑 안으로', goto: 'lunaris-spire', hint: '받침 위 흰 문을 열고 달빛 우물과 초승달 방이 있는 첨탑 속으로 들어가요' }));
        lights.push({ p: [MCX + 0.5, g + 8, dz + 2.5], c: '#c8fff4', i: 0.9, d: 24, flicker: 0.05, night: true, srcR: 8 });
      }
      acts.push({
        name: '초승달', hint: '첨탑 끝의 초승달이 빨리 돌며 달빛을 뿌려요', hit: [MCX - 14, main.top, MCZ - 10, MCX + 14, main.top + 32, MCZ + 10],
        run: async a => { a.flash('moon', 3, 4.5); a.glow(1.6, 4.5); a.spin('stones', 5, 4.5); a.spin('moon', 8, 4.5); for (let k = 0; k < 9; k++) { a.burst([MCX + 0.5, main.top + 16, MCZ + 0.5], { n: 26, colors: ['#d0f8ff', '#ffffff', '#7af0e0'], speed: 16, up: 2, life: 2.2, gravity: 3, spread: 6 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '달의 첨탑', note: '꼭대기에서 초승달이 돈다', p: [MCX + 0.5, main.top + 34, MCZ + 0.5], tag: 'MOON' });

      // ══════════ 작은 첨탑과 섬을 잇는 아치 다리 ══════════
      const sp = [spire(P(26), P(26), 68, 7.2, B.crysT), spire(P(102), P(24), 76, 7.6, B.crysT), spire(P(100), P(86), 64, 7.2, B.crysV)];
      sp.forEach((s, k) => lights.push({ name: 'sp' + k, p: [s.cx + 0.5, s.top - 6, s.cz + 0.5], c: '#70f0e0', i: 1, d: 32, flicker: 0.05, srcR: 8 }));
      const span = (a, b, lift) => {
        const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len, nn = Math.ceil(len * 2);
        const ya = Math.max(WL + 4, top(a[0], a[1]) + 1), yb = Math.max(WL + 4, top(b[0], b[1]) + 1);
        const ys = [];
        for (let i = 0; i <= nn; i++) { const t = i / nn; ys.push(Math.round(MH.lerp(ya, yb, t) + Math.sin(t * Math.PI) * lift)); }
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[1] + dz * t, y = ys[i];
          for (let k = -4; k <= 4; k++) {
            const bx = Math.round(x + px * k), bz = Math.round(z + pz * k), edge = Math.abs(k) === 4;
            w.set(bx, y, bz, edge ? B.marbleDk : (Math.abs(k) === 3 ? B.marble : (i % 6 === 0 ? B.marbleJ : B.marble)));
            w.set(bx, y - 1, bz, B.marbleDk);
            if (edge) {
              w.set(bx, y - 2, bz, B.marbleDk);
              if (i % 3 === 0) w.box(bx, y + 1, bz, bx, y + 2, bz, B.silver);
              w.set(bx, y + 3, bz, B.trim);
              if (i % 24 === 12) { w.box(bx, y + 1, bz, bx, y + 4, bz, B.trim); w.set(bx, y + 5, bz, B.silver); w.set(bx, y + 6, bz, B.lamp); w.set(bx, y + 7, bz, B.trim); }
            }
          }
          if (i % 28 === 14) {
            const gx = Math.round(x), gz = Math.round(z);
            for (let yy = Math.max(1, top(gx, gz) - 2); yy < y - 1; yy++) for (let k = -2; k <= 2; k++) for (const s of [-1, 0, 1]) {
              const bx = Math.round(x + px * k + (dx / len) * s), bz = Math.round(z + pz * k + (dz / len) * s);
              w.set(bx, yy, bz, yy >= y - 3 ? B.trim : (yy % 6 === 0 ? B.marbleJ : B.marbleDk));
            }
          }
        }
        return [a[0] + dx / 2, (ya + yb) / 2 + lift, a[1] + dz / 2];
      };
      const br1 = span([P(52), P(46)], [P(34), P(32)], 12); span([P(76), P(46)], [P(94), P(30)], 12); span([P(78), P(64)], [P(96), P(84)], 12); span([P(50), P(64)], [P(30), P(82)], 12);
      lights.push({ p: [br1[0], br1[1] + 6, br1[2]], c: '#c8fff4', i: 0.9, d: 28, flicker: 0.05, night: true, srcR: 14 });
      landmarks.push({ name: '하늘 다리', note: '섬과 첨탑을 잇는 흰 아치', p: [br1[0], br1[1] + 16, br1[2]] });

      // ══════════ 월광 연못(가운데 섬 남쪽) ══════════
      const PX = P(64), PZ = P(68) + 2, py = top(PX, PZ);
      pavePlaza(PX, PZ, 23, py);
      for (let z = PZ - 21; z <= PZ + 21; z++) for (let x = PX - 21; x <= PX + 21; x++) {
        const d = MH.dist(x, z, PX, PZ);
        if (d > 19.2) continue;
        if (d > 15.2) {
          w.box(x, py + 1, z, x, py + 2, z, d > 17.6 ? B.marbleDk : B.marble);
          if (d > 17.6) { w.set(x, py + 2, z, B.trim); if (Math.round(Math.atan2(z - PZ, x - PX) * 8) % 4 === 0) w.box(x, py + 3, z, x, py + 4, z, B.trim); }
          continue;
        }
        MH.setH(w, x, z, py - 4, (x + z) % 5 ? B.marbleDk : B.rune, B.rock); w.liquid(x, z, py);
      }
      w.cyl(PX, PZ, py - 3, py + 1, 2.2, B.marbleDk); w.cyl(PX, PZ, py + 2, py + 7, 1.5, B.marble); w.cyl(PX, PZ, py + 8, py + 8, 2.4, B.trim);
      for (let y = py + 9; y <= py + 13; y++) w.cyl(PX, PZ, y, y, 1.5 - Math.abs(y - py - 11) * 0.3, B.crysP);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(PX + dx * 3, py + 11, PZ + dz * 3, B.crysP); w.set(PX + dx * 2, py + 11, PZ + dz * 2, B.crysP); }
      w.box(PX, py + 14, PZ, PX, py + 15, PZ, B.crysT);
      lights.push({ name: 'pool', p: [PX + 0.5, py + 12, PZ + 0.5], c: '#a0f0ff', i: 1.3, d: 36, flicker: 0.05 });
      landmarks.push({ name: '월광 연못', note: '달빛을 비추는 둥근 연못', p: [PX + 0.5, py + 24, PZ + 0.5] });
      // 가운데 섬 산책로와 가로등
      pavePath([[MCX, MCZ + 34], [PX, PZ - 21]], 3.2); pavePath([[PX, PZ + 21], [PX, PZ + 34]], 3.2);
      for (const [x, z] of [[MCX - 7, MCZ + 36], [MCX + 7, MCZ + 36], [PX - 7, PZ + 27], [PX + 7, PZ + 27], [MCX - 32, MCZ + 12], [MCX + 32, MCZ + 12]]) lampPost(x, z, 8);

      // ══════════ 달빛 다리: 남쪽 섬과 가운데 섬 사이 물속에서 솟는다(부품) ══════════
      const BZ0 = P1(80) * 2 + 6, BZ1 = P1(104) * 2 - 2;
      const bridge = w.prop({ name: 'mbridge', pivot: [PX + 0.5, WL + 4, (BZ0 + BZ1) / 2], off0: [0, -10, 0] });
      for (let z = BZ0; z <= BZ1; z++) {
        const y = WL + 4 + Math.round(Math.sin((z - BZ0) / (BZ1 - BZ0) * Math.PI) * 4);
        for (let x = PX - 4; x <= PX + 4; x++) {
          if (w.get(x, y, z)) continue;
          const edge = x === PX - 4 || x === PX + 4;
          bridge.set(x, y, z, edge ? B.crysT : ((z % 6 === 0) ? B.crysP : B.beam));
          if (edge && z % 3 === 0 && !w.get(x, y + 1, z)) { bridge.set(x, y + 1, z, B.crysT); if (!w.get(x, y + 2, z)) bridge.set(x, y + 2, z, B.crysP); }
        }
      }
      const GZc = P(112), gz = top(PX, GZc - 4) + 1;
      pavePlaza(PX, GZc, 14, gz - 1);
      w.cyl(PX, GZc, gz, gz, 12, B.marbleDk); w.ring(PX, GZc, gz, 11, 12, B.trim); w.cyl(PX, GZc, gz + 1, gz + 1, 10.4, B.marbleDk);
      for (let z = GZc - 10; z <= GZc + 10; z++) for (let x = PX - 10; x <= PX + 10; x++) if (MH.dist(x, z, PX, GZc) <= 9.4) w.set(x, gz + 1, z, ringPaveAt(x, z, PX, GZc));
      for (let k = 0; k < 6; k++) { const a = k * 1.047 + 0.52, x = Math.round(PX + Math.cos(a) * 9.4), z = Math.round(GZc + Math.sin(a) * 9.4); column(x, z, gz + 2, gz + 14); }
      w.ring(PX, GZc, gz + 15, 7.6, 11.4, B.marbleDk); w.ring(PX, GZc, gz + 16, 8.6, 11.2, B.trim);
      for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2, x = Math.round(PX + Math.cos(a) * 11), z = Math.round(GZc + Math.sin(a) * 11); w.set(x, gz + 14, z, B.marbleDk); if (k % 4 === 0) w.set(x, gz + 13, z, B.lamp); }
      MH.dome(w, PX, gz + 17, GZc, 10.6, B.silver, B.trim);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; for (let ph = 0; ph < Math.PI / 2; ph += 0.05) w.set(Math.round(PX + Math.cos(a) * Math.cos(ph) * 10.9), Math.round(gz + 17 + Math.sin(ph) * 10.9), Math.round(GZc + Math.sin(a) * Math.cos(ph) * 10.9), B.trim); }
      w.box(PX, gz + 28, GZc, PX, gz + 31, GZc, B.trim); w.cyl(PX, GZc, gz + 29, gz + 29, 1.2, B.silver); w.box(PX, gz + 32, GZc, PX, gz + 33, GZc, B.crysP);
      w.cyl(PX, GZc, gz + 2, gz + 3, 2.2, B.marbleDk); w.cyl(PX, GZc, gz + 4, gz + 4, 1.5, B.marble); w.cyl(PX, GZc, gz + 5, gz + 6, 1.2, B.rune);
      lights.push({ name: 'gazebo', p: [PX + 0.5, gz + 8, GZc + 0.5], c: '#8af0ff', i: 1, d: 28, flicker: 0.05 });
      acts.push({
        name: '달빛 다리', hint: '호수에서 빛의 다리가 떠올랐다가 다시 잠겨요', hit: [PX - 8, gz + 2, GZc - 8, PX + 8, gz + 16, GZc + 8],
        run: async a => {
          a.flash('gazebo', 3, 9); a.flash('pool', 2, 9);
          for (let k = 0; k < 5; k++) { a.burst([PX + 0.5, WL + 1, BZ0 + 6 + k * 12], { n: 24, colors: ['#e0ffff', '#7af0e0'], speed: 6, up: 8, life: 1.2, gravity: 12, spread: 6 }); }
          await a.move('mbridge', [0, 0, 0], 2.6);
          await a.wait(4);
          await a.move('mbridge', [0, -10, 0], 2.4);
          a.burst([PX + 0.5, WL + 1, (BZ0 + BZ1) / 2], { n: 40, colors: ['#e0ffff', '#ffffff'], speed: 8, up: 6, life: 1, gravity: 12, spread: 16, flat: true });
        },
      });
      landmarks.push({ name: '달맞이 정자', note: '달빛 다리를 부르는 곳', p: [PX + 0.5, gz + 40, GZc + 0.5] });

      // ══════════ 차원문(서쪽 섬) ══════════
      const QX = P(20), QZ = P(88), qg = top(QX, QZ) + 1, QR = 20, qy = qg + QR + 3;
      for (let z = QZ - 26; z <= QZ + 26; z++) for (let x = QX - 10; x <= QX + 18; x++) { const g = MH.g(w, x, z), e = x === QX - 10 || x === QX + 18 || Math.abs(z - QZ) === 26; MH.setH(w, x, z, qg - 1, e && g < qg - 1 ? B.trim : paveAt(x, z), g < qg - 1 ? B.marbleDk : B.rock); }
      w.box(QX - 6, qg, QZ - 24, QX + 6, qg + 1, QZ + 24, B.marbleDk); w.box(QX - 6, qg + 1, QZ - 24, QX + 6, qg + 1, QZ + 24, B.trim);
      w.box(QX - 3, qg + 2, QZ - 22, QX + 3, qg + 3, QZ + 22, B.marble); w.box(QX - 3, qg + 3, QZ - 22, QX + 3, qg + 3, QZ + 22, B.marbleJ);
      for (let v = -QR - 1; v <= QR + 1; v++) for (let u = -QR - 1; u <= QR + 1; u++) {
        const d = Math.hypot(u, v), y = qy + v;
        if (y <= qg + 3) continue;
        if (d <= QR + 0.5 && d > QR - 3.2) {
          const seg = Math.round(Math.atan2(v, u) * 8);
          for (let dx = -2; dx <= 2; dx++) {
            let b = B.marble;
            if (d > QR - 0.6 || d <= QR - 2.6) b = Math.abs(dx) === 2 ? B.marbleDk : B.trim;
            else if (Math.abs(dx) <= 1 && seg % 2 === 0) b = B.rune;
            else if (Math.abs(dx) === 2) b = B.marbleDk;
            w.set(QX + dx, y, QZ + u, b);
          }
        } else if (d <= QR - 3.2) w.set(QX, y, QZ + u, (Math.floor(d * 0.6 + Math.atan2(v, u) * 2) % 2) ? B.portal : B.portal2);
      }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, u = Math.round(Math.cos(a) * (QR + 1)), v = Math.round(Math.sin(a) * (QR + 1)); if (qy + v > qg + 4) w.box(QX - 1, qy + v, QZ + u, QX + 1, qy + v + (v > 0 ? 1 : 0), QZ + u, B.crysV); }
      for (const s of [-1, 1]) {
        const z = QZ + s * 24;
        w.box(QX - 2, qg + 2, z - 2, QX + 2, qg + 3, z + 2, B.marbleDk);
        for (let y = qg + 4; y <= qg + 13; y++) w.box(QX - 1, y, z - 1, QX + 1, y, z + 1, y % 3 === 0 ? B.marbleJ : B.marble);
        w.box(QX - 2, qg + 14, z - 2, QX + 2, qg + 14, z + 2, B.trim); w.box(QX - 1, qg + 15, z - 1, QX + 1, qg + 15, z + 1, B.silver);
        w.box(QX, qg + 16, z, QX, qg + 17, z, B.crysV); w.set(QX + 2, qg + 9, z, B.rune);
      }
      for (let s = 0; s < 3; s++) w.box(QX + 7 + s * 2, qg - 2 * s, QZ - 6, QX + 8 + s * 2, qg + 1 - 2 * s, QZ + 6, s === 0 ? B.trim : B.marbleDk);
      const orbit = w.prop({ name: 'portal', pivot: [QX + 6.5, qy + 0.5, QZ + 0.5], axis: 'x', speed: 0.4 });
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, y = Math.round(qy + Math.sin(a) * (QR - 6)), z = Math.round(QZ + Math.cos(a) * (QR - 6)); orbit.box(QX + 6, y, z, QX + 7, y + 1 + (k % 2) * 2, z + 1, k % 2 ? B.rune : B.crysV); }
      lights.push({ name: 'portal', p: [QX + 5, qy, QZ + 0.5], c: '#b890ff', i: 1.8, d: 48, flicker: 0.15, srcR: 8 });
      acts.push({
        name: '차원문', hint: '룬이 돌며 문이 열리고 빛이 쏟아져요', hit: [QX - 2, qg + 4, QZ - QR, QX + 8, qy + QR, QZ + QR],
        run: async a => {
          a.flash('portal', 3.5, 4.5); a.glow(1.7, 4.5); a.spin('portal', 9, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([QX + 4, qy, QZ + 0.5], { n: 36, colors: ['#b890ff', '#e8d0ff', '#ffffff'], speed: 14, up: 2, life: 1.6, gravity: 0, spread: 8 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '차원문', note: '다른 세계로 이어진 문', p: [QX + 0.5, qy + QR + 12, QZ + 0.5] });

      // ══════════ 수정 정원(동쪽 섬) ══════════
      const crystals = [[110, 96, true], [114, 88, false], [106, 102, false], [112, 82, true], [98, 98, false], [116, 94, false], [104, 92, false], [118, 100, false]].map(([x, z, b]) => [P(x), P(z), b]);
      for (const [cx, cz, big] of crystals) {
        const g = top(cx, cz);
        if (g <= WL || w.get(cx, g + 1, cz)) continue;
        const c = hash3(cx, 1, cz) > 0.5 ? B.crysT : B.crysV;
        MH.rock(w, cx, g, cz, big ? 4.2 : 2.6, B.rockDk, B.moss2);
        for (let i = 0; i < (big ? 8 : 4); i++) {
          const a = w.r(0, Math.PI * 2), l = w.r(big ? 10 : 4, big ? 24 : 12), tl = w.r(0.15, 0.45);
          const ex = cx + Math.cos(a) * l * tl, ey = g + 1 + l, ez = cz + Math.sin(a) * l * tl, th = big && i === 0 ? 1.8 : (big ? 1.2 : 0.8);
          w.line(cx, g + 1, cz, ex, ey, ez, c, t => th * (1 - t * 0.75));
          w.set(Math.round(ex), Math.round(ey) + 1, Math.round(ez), B.crysP);
        }
        if (big) lights.push({ p: [cx + 0.5, g + 8, cz + 0.5], c: c === B.crysT ? '#70f0e0' : '#c0a0ff', i: 1.1, d: 28, flicker: 0.05 });
      }
      landmarks.push({ name: '수정 정원', note: '청록과 보라 수정 군락', p: [P(110) + 0.5, top(P(110), P(96)) + 32, P(96) + 0.5] });

      // ══════════ 새 구역: 별빛 서고 섬(동쪽) ══════════
      const ag = top(AX, AZ);
      pavePlaza(AX, AZ, 20, ag);
      for (let z = AZ - 12; z <= AZ + 12; z++) for (let x = AX - 31; x <= AX - 18; x++) if (MH.g(w, x, z) < ag) { const g = MH.g(w, x, z), e = Math.abs(z - AZ) === 12 || x === AX - 31; MH.setH(w, x, z, ag, e ? B.trim : paveAt(x, z), B.marbleDk); if (e) for (let yy = Math.max(1, g - 2); yy < ag; yy++) if ((yy & 3) === 0) w.set(x, yy, z, B.marbleJ); } else if (MH.g(w, x, z) === ag) w.set(x, ag, z, paveAt(x, z));
      const ay = ag + 1, AR = 12.8, AH = 28, aw = ay + 3;   // aw: 벽 시작(문턱)
      w.cyl(AX, AZ, ay, ay + 1, AR + 4.4, B.marbleDk); w.ring(AX, AZ, ay + 1, AR + 3.4, AR + 4.4, B.trim);
      w.cyl(AX, AZ, ay + 2, ay + 2, AR + 2.4, B.marble); w.ring(AX, AZ, ay + 2, AR + 1.6, AR + 2.4, B.trim);
      for (let y = aw; y <= aw + AH; y++) w.cyl(AX, AZ, y, y, AR, (y === aw + 14 || y === aw + 15) ? B.marbleDk : (y === aw ? B.marbleDk : B.marble));
      for (let y = aw + 2; y <= aw + AH; y += 4) w.ring(AX, AZ, y, AR - 1, AR, B.marbleJ);
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * Math.PI * 2, x = Math.round(AX + Math.cos(a) * (AR + 1)), z = Math.round(AZ + Math.sin(a) * (AR + 1));
        if (Math.cos(a) < -0.9) continue;   // 서쪽 문 자리
        w.box(x, aw, z, x, aw + 1, z, B.marbleDk); w.box(x, aw + 2, z, x, aw + AH - 2, z, B.trim); w.box(x, aw + AH - 1, z, x, aw + AH, z, B.marbleDk);
        const a2 = a + Math.PI / 12, ca = Math.cos(a2), sa = Math.sin(a2);
        for (const [y0, y1] of [[aw + 4, aw + 11], [aw + 18, aw + 25]]) for (let y = y0 - 1; y <= y1 + 1; y++) for (let t = -1; t <= 1; t++) {
          const wx = Math.round(AX + ca * AR - sa * t), wz = Math.round(AZ + sa * AR + ca * t);
          const edge = y === y0 - 1 || y === y1 + 1 || Math.abs(t) === 1 && (y === y1);
          w.set(wx, y, wz, edge ? B.trim : (t === 0 && y < y1 ? B.win : (y === y1 ? B.trim : (Math.abs(t) === 1 ? B.win : B.win))));
          if (y === Math.round((y0 + y1) / 2) && !edge) w.set(wx, y, wz, B.silver);
          if (y === y0 - 1) w.set(Math.round(AX + ca * (AR + 1) - sa * t), y, Math.round(AZ + sa * (AR + 1) + ca * t), B.marbleDk);
        }
      }
      w.ring(AX, AZ, aw + AH + 1, AR - 1, AR + 2.8, B.marbleDk); w.ring(AX, AZ, aw + AH + 2, AR + 0.8, AR + 2.8, B.trim);
      w.cyl(AX, AZ, aw + AH + 1, aw + AH + 2, AR - 0.5, B.marbleDk);
      const aTop = MH.dome(w, AX, aw + AH + 2, AZ, AR, B.roofB, B.silver);
      for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; for (let t = 0; t < 1; t += 0.03) { const phi = t * Math.PI / 2; w.set(Math.round(AX + Math.cos(a) * Math.cos(phi) * (AR + 0.3)), Math.round(aw + AH + 2 + Math.sin(phi) * (AR + 0.3)), Math.round(AZ + Math.sin(a) * Math.cos(phi) * (AR + 0.3)), k % 2 ? B.roofB2 : B.silver); } }
      // 돔 위 작은 등탑(기둥 여섯과 수정)
      w.cyl(AX, AZ, aTop - 1, aTop, 3.6, B.marbleDk);
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; w.box(Math.round(AX + Math.cos(a) * 2.6), aTop + 1, Math.round(AZ + Math.sin(a) * 2.6), Math.round(AX + Math.cos(a) * 2.6), aTop + 5, Math.round(AZ + Math.sin(a) * 2.6), B.trim); }
      w.cyl(AX, AZ, aTop + 1, aTop + 4, 1.2, B.crysV);
      w.cyl(AX, AZ, aTop + 6, aTop + 6, 3.4, B.silver); MH.cone(w, AX, AZ, aTop + 7, 2.6, B.roofB, 0.5);
      w.box(AX, aTop + 11, AZ, AX, aTop + 13, AZ, B.silver); w.set(AX, aTop + 14, AZ, B.crysP);
      // 서쪽 현관: 기둥 넷(주춧돌·기둥머리), 들보와 박공, 마루와 계단
      const PXw = AX - Math.round(AR);       // 벽 바깥면 x
      w.box(PXw - 11, ay, AZ - 10, PXw, ay + 2, AZ + 10, B.marbleDk);
      for (let z = AZ - 9; z <= AZ + 9; z++) for (let x = PXw - 10; x <= PXw; x++) w.set(x, ay + 2, z, (x + z) % 2 ? B.marble : B.marbleDk);
      w.box(PXw - 11, ay + 2, AZ - 10, PXw, ay + 2, AZ - 10, B.trim); w.box(PXw - 11, ay + 2, AZ + 10, PXw, ay + 2, AZ + 10, B.trim); w.box(PXw - 11, ay + 2, AZ - 10, PXw - 11, ay + 2, AZ + 10, B.trim);
      for (let s = 1; s <= 2; s++) w.box(PXw - 11 - s * 2, ay - 1, AZ - 6, PXw - 10 - s * 2, ay + 2 - s * 2 + 1, AZ + 6, s === 1 ? B.marble : B.marbleDk);
      for (const dz of [-8, -4, 4, 8]) column(PXw - 8, AZ + dz, ay + 3, ay + 19);
      w.box(PXw - 10, ay + 20, AZ - 10, PXw, ay + 21, AZ + 10, B.marbleDk); w.box(PXw - 10, ay + 22, AZ - 10, PXw, ay + 22, AZ + 10, B.trim);
      for (let s = 0; s < 10; s++) {
        w.box(PXw - 10, ay + 23 + s, AZ - 9 + s, PXw, ay + 23 + s, AZ + 9 - s, B.marble);
        w.box(PXw - 11, ay + 23 + s, AZ - 10 + s, PXw - 11, ay + 23 + s, AZ - 10 + s, B.trim); w.box(PXw - 11, ay + 23 + s, AZ + 10 - s, PXw - 11, ay + 23 + s, AZ + 10 - s, B.trim);
        w.box(PXw - 10, ay + 23 + s, AZ - 10 + s, PXw, ay + 23 + s, AZ - 10 + s, B.roofB); w.box(PXw - 10, ay + 23 + s, AZ + 10 - s, PXw, ay + 23 + s, AZ + 10 - s, B.roofB);
      }
      w.box(PXw - 11, ay + 26, AZ - 1, PXw - 11, ay + 28, AZ + 1, B.crysV); w.set(PXw - 11, ay + 27, AZ - 2, B.silver); w.set(PXw - 11, ay + 27, AZ + 2, B.silver);
      // 문: 벽을 파고 안쪽에 판자문, 아치 문틀
      for (let z = AZ - 3; z <= AZ + 3; z++) for (let y = aw; y <= aw + 12; y++) {
        const t = Math.abs(z - AZ), arch = y - aw - 10 > 2 - t * 0.8;
        for (let x = PXw - 1; x <= PXw + 1; x++) if (w.get(x, y, z) && !(x < PXw && y < aw)) w.set(x, y, z, 0);
        if (t === 3 || arch) { w.set(PXw, y, z, B.trim); continue; }
        w.set(PXw + 1, y, z, z === AZ ? B.doorDk : ((y - aw) % 4 === 3 ? B.marbleJ : B.door));
      }
      for (const z of [AZ - 1, AZ + 1]) w.set(PXw, aw + 5, z, 0), w.set(PXw + 1, aw + 5, z, B.silver);
      w.box(PXw - 1, aw + 13, AZ, PXw - 1, aw + 14, AZ, B.crysV);
      for (const z of [AZ - 5, AZ + 5]) { w.set(PXw - 1, aw + 6, z, B.silver); w.box(PXw - 1, aw + 7, z, PXw - 1, aw + 8, z, B.lamp); w.set(PXw - 1, aw + 9, z, B.silver); }
      acts.push(OR.goAct({ at: [PXw - 5, aw, AZ], h: 11, hit: [PXw - 1, aw, AZ - 2, PXw + 1, aw + 9, AZ + 2], name: '별빛 서고 안으로', goto: 'lunaris-archive', hint: '기둥 현관의 서고 문을 열고 둥근 서가와 떠도는 책이 있는 서고 안으로 들어가요' }));
      lights.push({ name: 'archive', p: [AX + 0.5, aTop + 4, AZ + 0.5], c: '#c8b8ff', i: 1.4, d: 48, flicker: 0.06, srcR: 10 });
      // 떠도는 책(부품): 서고 둘레를 천천히 돈다
      const by0 = aw + AH + 6;
      const books = w.prop({ name: 'books', pivot: [AX + 0.5, by0 + 5, AZ + 0.5], axis: 'y', speed: 0.35, bob: 0.4, bobSpeed: 0.8 });
      for (let k = 0; k < 9; k++) {
        const a = k / 9 * Math.PI * 2, x = Math.round(AX + Math.cos(a) * 22), z = Math.round(AZ + Math.sin(a) * 22), y = by0 + (k % 3) * 4, c = [B.book1, B.book2, B.book3][k % 3];
        const alongX = Math.abs(Math.sin(a)) > 0.7;
        for (let u = 0; u < 3; u++) for (let v = 0; v < 5; v++) for (let q = 0; q < 2; q++) {
          const [bx, bz] = alongX ? [x + u - 1, z + q] : [x + q, z + u - 1];
          books.set(bx, y + v, bz, (u === 2 && v > 0 && v < 4) ? B.page : (v === 0 || v === 4) && u === 0 ? B.book3 : c);
        }
      }
      acts.push({
        name: '떠도는 서책', hint: '서고의 책들이 높이 떠올라 빠르게 돌며 빛나는 책장을 흩뿌려요', hit: [AX - 24, by0 - 4, AZ - 24, AX + 24, by0 + 16, AZ + 24],
        run: async a => {
          a.flash('archive', 3, 5.5); a.glow(1.5, 5.5); a.spin('books', 9, 5);
          await a.move('books', [0, 16, 0], 1.4);
          for (let k = 0; k < 8; k++) { a.burst([AX + 0.5, by0 + 22, AZ + 0.5], { n: 20, colors: ['#f4f0e0', '#c8b8ff', '#ffffff'], speed: 14, up: 4, life: 2, gravity: 1.2, spread: 8 }); await a.wait(0.4); }
          await a.move('books', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '별빛 서고', note: '달의 기록을 모은 둥근 도서관', p: [AX + 0.5, aTop + 24, AZ + 0.5], tag: 'NEW' });
      // 달 거울(서고 남쪽): 거울(부품)이 돌아 첨탑으로 빛을 보낸다
      const MRX = AX + 4, MRZ = AZ + 24, mg0 = top(MRX, MRZ), mg = Math.max(mg0 > WL ? mg0 : WL + 2, ag - 2);
      pavePlaza(MRX, MRZ, 7, mg);
      const my = mg + 1;
      w.cyl(MRX, MRZ, my, my, 5.2, B.marbleDk); w.ring(MRX, MRZ, my, 4.2, 5.2, B.trim); w.cyl(MRX, MRZ, my + 1, my + 1, 3.4, B.marble);
      w.cyl(MRX, MRZ, my + 2, my + 9, 1, B.silver); w.cyl(MRX, MRZ, my + 5, my + 5, 1.6, B.trim); w.cyl(MRX, MRZ, my + 10, my + 10, 1.6, B.trim);
      const MY = my + 20;
      const mirror = w.prop({ name: 'mirror', pivot: [MRX + 0.5, MY + 0.5, MRZ + 0.5], axis: 'y', speed: 0.15 });
      for (let v = -9; v <= 9; v++) for (let u = -9; u <= 9; u++) {
        const d = Math.hypot(u, v); if (d > 8.8) continue;
        mirror.set(MRX + u, MY + v, MRZ, d > 7.6 ? B.silver : (d > 7 ? B.trim : B.crysP));
        if (d > 5) mirror.set(MRX + u, MY + v, MRZ + 1, B.silver);
      }
      mirror.set(MRX, MY - 9, MRZ, B.silver);
      const beamP = w.prop({ name: 'mbeam', pivot: [MRX + 0.5, MY + 0.5, MRZ + 0.5], scl0: [0, 0, 0] });
      {
        const bg = guard(beamP), tx = MCX, ty2 = main.mid + 12, tz = MCZ, L = Math.hypot(tx - MRX, ty2 - MY, tz - MRZ), N = Math.ceil(L * 1.5);
        for (let i = 6; i <= N - 26; i++) { const t = i / N, x = MRX + (tx - MRX) * t, y = MY + (ty2 - MY) * t, z = MRZ + (tz - MRZ) * t; bg.set(x, y, z, i % 9 ? B.beam : B.crysT); bg.set(x, y + 1, z, B.beam); }
      }
      lights.push({ name: 'mirror', p: [MRX + 0.5, MY, MRZ + 2.5], c: '#e8ffff', i: 1.2, d: 36, flicker: 0.05 });
      acts.push({
        name: '달 거울', hint: '달 거울이 빛을 모아 달의 첨탑으로 빛줄기를 쏘아 보내요', hit: [MRX - 10, MY - 10, MRZ - 3, MRX + 10, MY + 10, MRZ + 3],
        run: async a => {
          a.flash('mirror', 4, 6); a.spin('mirror', 6, 1.2);
          a.burst([MRX + 0.5, MY, MRZ + 0.5], { n: 40, colors: ['#e8ffff', '#ffffff'], speed: 12, up: 2, life: 1.2, gravity: 0, spread: 4 });
          await a.tween('mbeam', { scl: [1, 1, 1] }, 1.2);
          a.flash('moon', 3, 3.6); a.glow(1.6, 3.6);
          for (let k = 0; k < 6; k++) { a.burst([MCX + 0.5, main.mid + 12, MCZ + 0.5], { n: 30, colors: ['#e8ffff', '#7af0e0', '#ffffff'], speed: 16, up: 2, life: 1.4, gravity: 0.6, spread: 6 }); await a.wait(0.5); }
          await a.tween('mbeam', { scl: [0, 0, 0] }, 0.8);
        },
      });
      landmarks.push({ name: '달 거울', note: '달빛을 첨탑으로 되비추는 은거울', p: [MRX + 0.5, MY + 18, MRZ + 0.5] });

      // ══════════ 나루(서고 서쪽 · 가운데 섬 동쪽)와 은빛 나룻배 ══════════
      const FZ = AZ + 4, FX0 = AX - 32, FX1 = MCX + 48;
      const pier = (x0, x1) => {
        for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
          for (let z = FZ - 4; z <= FZ + 4; z++) if (!w.get(x, WL + 2, z) || MH.g(w, x, z) < WL + 2) w.set(x, WL + 2, z, (x % 4 === 0) ? B.door : B.plank);
          w.set(x, WL + 1, FZ - 3, B.bark); w.set(x, WL + 1, FZ + 3, B.bark);
          if (x % 6 === 0) for (const z of [FZ - 4, FZ + 4]) { w.box(x, WL - 6, z, x, WL + 1, z, B.bark); w.box(x, WL + 3, z, x, WL + 4, z, B.barkDk); w.set(x, WL + 5, z, B.silver); }
          if (x % 2 === 0) for (const z of [FZ - 4, FZ + 4]) if (!w.get(x, WL + 3, z)) w.set(x, WL + 3, z, B.bark);
        }
      };
      pier(FX0, AX - 18); pier(FX1 - 12, FX1 + 4);
      for (const x of [FX0, FX1 + 4]) { w.box(x, WL + 3, FZ - 4, x, WL + 10, FZ - 4, B.silver); w.box(x, WL + 11, FZ - 4, x, WL + 12, FZ - 4, B.lamp); w.set(x, WL + 13, FZ - 4, B.trim); }
      // 뱃머리는 -x(서쪽)
      const fx = FX0 - 24, fy = WL + 2, fcx = fx + 8;
      const ferry = w.prop({ name: 'ferry', pivot: [fcx + 0.5, fy, FZ + 0.5] });
      for (let s = 0; s < 22; s++) {
        const wd = s < 3 ? 1 : s < 6 ? 2 : s < 9 ? 3 : 4;
        for (let k = -wd; k <= wd; k++) {
          const edge = Math.abs(k) === wd;
          ferry.set(fx + s, fy - 2, FZ + k, edge ? B.silver : B.plank);
          ferry.set(fx + s, fy - 1, FZ + k, edge ? B.silver : B.plank);
          if (edge || s === 21) { ferry.set(fx + s, fy, FZ + k, B.silver); ferry.set(fx + s, fy + 1, FZ + k, B.trim); }
          else if (s % 4 === 0) ferry.set(fx + s, fy - 1, FZ + k, B.door);
        }
        ferry.set(fx + s, fy - 3, FZ, B.silver);
      }
      ferry.box(fx - 2, fy - 1, FZ, fx - 1, fy + 3, FZ, B.silver); ferry.box(fx - 3, fy + 4, FZ, fx - 2, fy + 5, FZ, B.crysP); ferry.set(fx - 4, fy + 5, FZ, B.crysP);
      ferry.box(fx + 14, fy, FZ, fx + 14, fy + 14, FZ, B.silver); ferry.box(fx + 12, fy + 14, FZ, fx + 16, fy + 14, FZ, B.silver);
      for (const x of [fx + 12, fx + 16]) { ferry.set(x, fy + 13, FZ, B.silver); ferry.box(x, fy + 10, FZ, x, fy + 12, FZ, B.lant); }
      for (let x = fx + 5; x <= fx + 9; x++) for (let k = -2; k <= 2; k++) ferry.box(x, fy, FZ + k, x, fy, FZ + k, (x + k) % 3 ? B.book1 : B.book2);
      ferry.box(fx + 6, fy + 1, FZ - 1, fx + 8, fy + 2, FZ + 1, B.book3); ferry.box(fx + 6, fy + 3, FZ, fx + 8, fy + 3, FZ, B.page);
      // 뱃길(배 가운데 기준): 가운데 섬 나루 → 북동쪽 물길 → 동쪽 끝 너머
      const stop = [FX1 + 20, FZ], lane = [[FX1 + 24, FZ - 24], [292, 112], [W + 28, 100]];
      MH.routeOK(w, [[fcx + 8, FZ], stop, lane[0], lane[1], [W - 1, 100]], 2, '나룻배');
      const rel = ([x, z]) => [x - fcx, 0, z - FZ];
      acts.push({
        name: '은빛 나룻배', hint: '서고 나루의 은빛 나룻배가 가운데 섬 나루에 들렀다가 북동쪽 물길을 따라 호수 밖으로 떠나고, 다시 서고 나루에 나타나요', hit: [fx - 4, fy - 2, FZ - 6, fx + 22, fy + 16, FZ + 6],
        run: async a => {
          a.burst([fcx + 0.5, WL + 1, FZ + 0.5], { n: 24, colors: ['#e0ffff', '#7af0e0'], speed: 6, up: 4, life: 1, gravity: 10, spread: 6, flat: true });
          await a.drive('ferry', [rel(stop)], 3.4, { fwd: '-x' });
          a.burst([stop[0] - 4, WL + 16, FZ + 0.5], { n: 26, colors: ['#ffe0a0', '#ffffff'], speed: 6, up: 6, life: 1.4, gravity: 1, spread: 4 });
          await a.wait(1.2);
          await a.drive('ferry', lane.map(rel), 7, { fwd: '-x', back: 1.0 });
        },
      });
      landmarks.push({ name: '서고 나루', note: '은빛 나룻배가 오가는 나루', p: [FX0 - 12, WL + 24, FZ + 0.5] });

      // 작은 바위섬: 돌 제단과 등
      for (const [ix, iz] of [[76, 292], [300, 292], [128, 24]]) {
        const g = top(ix, iz); if (g <= WL) continue;
        pavePlaza(ix, iz, 6, g);
        w.cyl(ix, iz, g + 1, g + 2, 4.8, B.marbleDk); w.ring(ix, iz, g + 2, 3.8, 4.8, B.trim);
        for (let y = g + 3; y <= g + 10; y++) w.box(ix - 1, y, iz - 1, ix + 1, y, iz + 1, y % 3 === 0 ? B.marbleJ : B.marble);
        w.box(ix - 2, g + 11, iz - 2, ix + 2, g + 11, iz + 2, B.trim); w.box(ix, g + 12, iz, ix, g + 13, iz, B.crysT); w.set(ix, g + 14, iz, B.crysP);
        w.box(ix, g + 7, iz + 2, ix, g + 8, iz + 2, B.rune);
        lampPost(ix + 8, iz - 4, 6); MH.rock(w, ix - 8, g + 1, iz + 4, 3.2, B.rockDk, B.moss2);
      }

      // ══════════ 은빛 나무(가지·잎뭉치)·물가 갈대·바위 ══════════
      const clump = (cx, cy, cz, r, L) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          if (w.get(x, y, z)) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.95 && d > 0.45) b = B.leafLt;
          w.set(x, y, z, b);
        }
      };
      const tree = (x, y, z, o) => {
        const h = o.h, R0 = o.trunkR || 1.6, L = [B.leafS, B.leafT, B.leafDk];
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.5 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, streak ? B.barkDk : B.bark);
          }
        }
        for (let k = 0; k < 4; k++) { const a = k * 1.57 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2; w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, B.barkDk, t => t < 0.5 ? 1 : 0.6); }
        const nB = o.branches || 4, r = o.r || 6, ends = [[x, y + h + 1, z, 1.1]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * (o.willow ? w.r(0.1, 0.3) : w.r(0.45, 0.7));
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.45 ? 1 : 0.6);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.6 * k;
          clump(ex, ey + 1, ez, rc, L);
          for (let q = 0; q < 2; q++) { const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75; clump(ex + Math.cos(a) * dd, ey + (q - 0.5) * rc * 0.4, ez + Math.sin(a) * dd, rc * 0.62, L); }
          if (o.willow) for (let q = 0; q < 8; q++) { const a = q / 8 * 6.28, sx = Math.round(ex + Math.cos(a) * rc * 0.9), sz = Math.round(ez + Math.sin(a) * rc * 0.9); const len = 3 + ((hash3(sx, q, sz) * 5) | 0); for (let d = 0; d < len; d++) if (!w.get(sx, Math.round(ey) - d, sz)) w.set(sx, Math.round(ey) - d, sz, d === len - 1 ? B.leafLt : B.leafT); }
        });
      };
      const keep = (x, z) => MH.dist(x, z, QX, QZ) > 30 && MH.dist(x, z, AX, AZ) > 24 && MH.dist(x, z, MRX, MRZ) > 14 && MH.dist(x, z, P(110), P(92)) > 26 && MH.dist(x, z, PX, PZ) > 24 && MH.dist(x, z, PX, GZc) > 18 && MH.dist(x, z, MCX, MCZ) > 32;
      for (let i = 0; i < 110; i++) {
        const x = w.ri(12, W - 13), z = w.ri(12, D - 13), g = top(x, z), gb = w.get(x, g, z);
        if (g <= WL + 2 || w.get(x, g + 1, z) || gb === B.pave1 || gb === B.pave2 || gb === B.paveJ || gb === B.marbleDk) continue;
        let clear = true; for (let q = 3; q <= 22; q += 2) for (const [dx, dz] of [[0, 0], [6, 0], [-6, 0], [0, 6], [0, -6]]) if (w.get(x + dx, g + q, z + dz)) clear = false;
        if (clear && keep(x, z)) tree(x, g + 1, z, { willow: i % 3 === 0, h: w.ri(12, 20), r: w.r(5.6, 7.6), trunkR: w.r(1.4, 1.9) });
      }
      MH.scatter(w, 1800, (x, g, z, b) => {
        if ((b === B.moss || b === B.moss2) && w.chance(0.22)) {
          if (w.chance(0.12)) { w.set(x, g + 1, z, B.leafT); w.set(x, g + 2, z, B.rune); }
          else { const hgt = w.ri(1, 2); w.box(x, g + 1, z, x, g + hgt, z, hgt > 1 ? B.leafT : B.leafS); }
        } else if (b === B.sand && g <= WL + 2 && w.chance(0.3)) {
          const hgt = w.ri(2, 5); w.box(x, g + 1, z, x, g + hgt, z, w.chance(0.5) ? B.reed : B.reed2); if (w.chance(0.4)) w.set(x, g + hgt + 1, z, B.reedTop);
        }
      });
      for (let i = 0; i < 18; i++) { const x = w.ri(12, W - 13), z = w.ri(12, D - 13), g = top(x, z); if (g >= WL + 1 && g <= WL + 3 && !w.get(x, g + 1, z)) MH.rock(w, x, g + 1, z, w.r(2.4, 4), B.rockDk, B.moss2); }

      // ══════════ 월광 연못의 연꽃(부품, 평소엔 숨김): 기둥 둘레로 피어나 돈다 ══════════
      const lotus = w.prop({ name: 'lotus', pivot: [PX + 0.5, py + 1, PZ + 0.5], axis: 'y', speed: 0.4, scl0: [0, 0, 0] });
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * Math.PI * 2 + 0.3, lx = Math.round(PX + Math.cos(a) * 9.2), lz = Math.round(PZ + Math.sin(a) * 9.2);
        for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (dx * dx + dz * dz <= 9.5 && !(dx > 0 && dz === 0)) lotus.set(lx + dx, py + 1, lz + dz, B.lotusLf);
        for (let q = 0; q < 8; q++) { const b = q / 8 * Math.PI * 2, px2 = Math.round(lx + Math.cos(b) * 1.6), pz2 = Math.round(lz + Math.sin(b) * 1.6); lotus.box(px2, py + 2, pz2, px2, py + 3, pz2, B.lotus); }
        lotus.box(lx, py + 2, lz, lx, py + 3, lz, B.crysP);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) lotus.set(lx + dx, py + 4, lz + dz, B.lotus);
        lotus.set(lx, py + 5, lz, B.lotus);
      }
      acts.push({
        name: '연꽃 개화', hint: '연못에서 빛나는 연꽃이 피어나 기둥 둘레를 맴돌아요', hit: [PX - 14, py - 2, PZ - 14, PX + 14, py + 14, PZ + 14],
        run: async a => {
          a.flash('pool', 3, 6.5);
          await a.tween('lotus', { scl: [1, 1, 1] }, 1.8);
          a.spin('lotus', 3, 3.4);
          for (let k = 0; k < 6; k++) { a.burst([PX + 0.5, py + 6, PZ + 0.5], { n: 26, colors: ['#ffc8f0', '#d0f8ff', '#ffffff'], speed: 10, up: 8, life: 1.8, gravity: -0.6, spread: 8 }); await a.wait(0.55); }
          await a.tween('lotus', { scl: [0, 0, 0] }, 1.4);
        },
      });
      // ══════════ 수정 정원 위를 떠도는 수정 조각(부품) ══════════
      const CGX = P(110), CGZ = P(92), cgy = top(CGX, CGZ) + 32;
      const shards = w.prop({ name: 'shards', pivot: [CGX + 0.5, cgy + 2, CGZ + 0.5], axis: 'y', speed: 0.25, bob: 0.5, bobSpeed: 0.7 });
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * Math.PI * 2, x = Math.round(CGX + Math.cos(a) * 16), z = Math.round(CGZ + Math.sin(a) * 16), y = cgy + (k % 2) * 4, c = k % 2 ? B.crysV : B.crysT;
        for (let dy = -3; dy <= 4; dy++) { const rr = dy < 0 ? 1 + dy * 0.3 : 1.2 - dy * 0.28; for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (dx * dx + dz * dz <= rr * rr + 0.1) shards.set(x + dx, y + dy, z + dz, c); }
        shards.set(x, y + 5, z, B.crysP); shards.set(x + 2, y + 1, z, c); shards.set(x - 2, y, z, c);
      }
      lights.push({ name: 'garden', p: [CGX + 0.5, cgy, CGZ + 0.5], c: '#a0f0ff', i: 1.2, d: 40, flicker: 0.08, srcR: 18 });
      acts.push({
        name: '수정 공명', hint: '수정 조각들이 높이 떠올라 빠르게 돌며 빛을 뿌려요', hit: [CGX - 18, cgy - 30, CGZ - 18, CGX + 18, cgy + 8, CGZ + 18],
        run: async a => {
          a.flash('garden', 4, 5); a.glow(1.7, 5); a.spin('shards', 10, 5);
          await a.move('shards', [0, 16, 0], 1.4);
          for (let k = 0; k < 6; k++) { a.burst([CGX + 0.5, cgy + 18, CGZ + 0.5], { n: 30, colors: ['#7af0e0', '#c8a8ff', '#ffffff'], speed: 20, up: 2, life: 1.6, gravity: 1, spread: 4 }); await a.wait(0.4); }
          await a.move('shards', [0, 0, 0], 1.4);
        },
      });
      // ══════════ 달빛 고래: 호수 속에서 뛰어올라 반대편 물속으로 들어간다(부품) ══════════
      const WS = [212, 272], WE = [228, 238], wy = base - 6;
      for (const [cx, cz] of [WS, WE]) for (let z = cz - 22; z <= cz + 22; z++) for (let x = cx - 22; x <= cx + 22; x++) if (MH.dist(x, z, cx, cz) <= 21.8 && MH.g(w, x, z) < WL - 2) MH.setH(w, x, z, base - 14, B.sand, B.rockDk);
      const yaw0 = Math.atan2(-(WE[1] - WS[1]), WE[0] - WS[0]);
      const whale = w.prop({ name: 'whale', pivot: [WS[0] + 0.5, wy + 0.5, WS[1] + 0.5], rot0: [0, yaw0, 0], clipOK: 1 });
      whale.ellipsoid(WS[0], wy, WS[1], 11.6, 4.6, 4.6, B.whale); whale.ellipsoid(WS[0] + 2, wy - 2.4, WS[1], 8.8, 2.4, 3.4, B.whaleB);
      for (let x = WS[0] - 7; x <= WS[0] + 9; x += 2) for (const dz of [-2, 2]) whale.set(x, wy - 4, WS[1] + dz, B.whale);   // 배 주름
      whale.box(WS[0] - 16, wy - 1, WS[1] - 1, WS[0] - 11, wy + 2, WS[1] + 1, B.whale);
      whale.box(WS[0] - 20, wy + 2, WS[1] - 6, WS[0] - 18, wy + 2, WS[1] + 6, B.whaleB); whale.box(WS[0] - 19, wy + 2, WS[1] - 3, WS[0] - 16, wy + 3, WS[1] + 3, B.whale);
      whale.box(WS[0] + 7, wy + 1, WS[1] - 4, WS[0] + 8, wy + 2, WS[1] - 4, B.whaleB); whale.box(WS[0] + 7, wy + 1, WS[1] + 4, WS[0] + 8, wy + 2, WS[1] + 4, B.whaleB);
      whale.box(WS[0] + 1, wy - 2, WS[1] - 8, WS[0] + 5, wy - 2, WS[1] - 5, B.whale); whale.box(WS[0] + 1, wy - 2, WS[1] + 5, WS[0] + 5, wy - 2, WS[1] + 8, B.whale);
      for (let x = WS[0] - 8; x <= WS[0] + 6; x += 3) whale.box(x, wy + 5, WS[1], x, wy + 6, WS[1], B.whaleB);
      const JH = 38, jump = [];
      for (let i = 1; i <= 10; i++) { const t = i / 10, dy = 4 * JH * t * (1 - t) + (t > 0.9 ? -2 : 0); jump.push([(WE[0] - WS[0]) * t, dy, (WE[1] - WS[1]) * t, Math.atan2(4 * JH * (1 - 2 * t), Math.hypot(WE[0] - WS[0], WE[1] - WS[1])) * 0.9]); }
      acts.push({
        name: '달빛 고래', hint: '호수 속 달빛 고래가 물 위로 크게 뛰어올라 반대편 물속으로 사라졌다가 다시 나타나요', hit: [WS[0] - 12, WL - 2, WS[1] - 12, WS[0] + 12, WL + 4, WS[1] + 12],
        run: async a => {
          a.burst([WS[0] + 0.5, WL + 1, WS[1] + 0.5], { n: 30, colors: ['#e0ffff', '#7af0e0'], speed: 8, up: 6, life: 1, gravity: 12, spread: 6 });
          await a.tween('whale', { off: [0, 4, 0], rot: [0, yaw0, 0.6] }, 0.6, t => t);
          for (const q of jump) await a.tween('whale', { off: [q[0], q[1] + 4, q[2]], rot: [0, yaw0, q[3]] }, 0.28, t => t);
          a.burst([WE[0] + 0.5, WL + 1, WE[1] + 0.5], { n: 70, colors: ['#e0ffff', '#ffffff', '#7af0e0'], speed: 16, up: 16, life: 1.4, gravity: 20, spread: 6 });
          a.flash('moon', 2.4, 1.2);
          await a.tween('whale', { off: [WE[0] - WS[0], -2, WE[1] - WS[1]], rot: [0, yaw0, -0.6] }, 0.5);
          await a.wait(0.6);
          await a.respawn('whale', 1.0);
        },
      });
      landmarks.push({ name: '고래의 물길', note: '달밤에 뛰어오르는 달빛 고래', p: [WS[0] + 13, WL + 24, WS[1] - 13] });
      // ══════════ 작은 첨탑의 후광(부품): 빛의 고리가 하늘로 솟는다 ══════════
      sp.forEach((s, k) => {
        const h = w.prop({ name: 'halo' + k, pivot: [s.cx + 0.5, s.top + 4.5, s.cz + 0.5], axis: 'y', speed: 0.5 });
        MH.ringProp(h, s.cx, s.top + 4, s.cz, 5.2, 'xz', B.beam, B.crysP, 6); MH.ringProp(h, s.cx, s.top + 5, s.cz, 4.4, 'xz', B.crysT, B.beam, 3);
      });
      acts.push({
        name: '첨탑 후광', hint: '세 첨탑 끝의 빛 고리가 하늘로 솟아오르며 넓게 퍼지고, 다시 첨탑 끝에 맺혀요', hit: [sp[2].cx - 8, sp[2].top - 16, sp[2].cz - 8, sp[2].cx + 8, sp[2].top + 8, sp[2].cz + 8],
        run: async a => {
          a.glow(1.7, 5);
          for (let k = 0; k < 3; k++) { a.flash('sp' + k, 4, 5); a.spin('halo' + k, 6, 5); a.tween('halo' + k, { off: [0, 28, 0], scl: [3, 1, 3] }, 2); a.burst([sp[k].cx + 0.5, sp[k].top, sp[k].cz + 0.5], { n: 30, colors: ['#e8ffff', '#7af0e0'], speed: 2, up: 28, life: 1.6, gravity: 0, spread: 2 }); await a.wait(0.3); }
          await a.wait(2.2);
          for (let k = 0; k < 3; k++) a.burst([sp[k].cx + 0.5, sp[k].top + 32, sp[k].cz + 0.5], { n: 40, colors: ['#e8ffff', '#c8a8ff', '#ffffff'], speed: 18, up: 0, life: 1.6, gravity: 1, spread: 4, flat: true });
          for (let k = 0; k < 3; k++) a.respawn('halo' + k, 1.0);
          await a.wait(1.1);
        },
      });
      // ══════════ 달맞이 등롱: 호수에 뜬 등롱(부품)들이 차례로 하늘로 떠오른다 ══════════
      const lantG = [];
      for (let k = 0; k < 3; k++) {
        const nm = 'lant' + k, lp = w.prop({ name: nm, pivot: [P(46.5 + k * 3), WL + 4, P(92.5)], bob: 0.6, bobSpeed: 0.9, phase: k * 2 });
        for (let q = 0; q < 5; q++) {
          const x = P(38 + ((k * 5 + q) * 7) % 20), z = P(84 + ((k * 5 + q) * 11) % 18);
          let ok = true; for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (MH.g(w, x + dx, z + dz) >= WL || w.get(x + dx, WL + 1, z + dz) || w.get(x + dx, WL + 5, z + dz)) ok = false;
          if (!ok) continue;
          for (const [dx, dz] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) lp.set(x + dx, WL + 1, z + dz, B.silver);
          for (let dy = 2; dy <= 4; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) lp.set(x + dx, WL + dy, z + dz, (dx && dz) ? B.silver : B.lant);
          lp.box(x - 1, WL + 5, z - 1, x + 1, WL + 5, z + 1, B.silver); lp.set(x, WL + 6, z, B.trim);
        }
        lantG.push(nm);
      }
      acts.push({
        name: '달맞이 등롱', hint: '호수에 떠 있던 등롱들이 차례로 밤하늘로 떠올라 사라지고, 다시 호수에 떠올라요', hit: [P(36), WL - 2, P(82), P(60), WL + 10, P(104)],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.move(lantG[k], [(k - 1) * 2, 60 + k * 8, -k * 4], 3.6); a.burst([P(48.5 + k * 3), WL + 1, P(92.5)], { n: 20, colors: ['#ffe0a0', '#ffffff'], speed: 6, up: 4, life: 1, gravity: 4, spread: 12, flat: true }); await a.wait(0.5); }
          await a.wait(3.4);
          for (let k = 0; k < 3; k++) a.burst([P(47.5 + k * 3), WL + 64 + k * 8, P(91.5) - k * 4], { n: 20, colors: ['#ffe0a0', '#fff8d0'], speed: 8, up: 0, life: 1.6, gravity: 0.6, spread: 12 });
          await a.wait(1);
          for (let k = 0; k < 3; k++) a.respawn(lantG[k], 1.0);
          await a.wait(1.1);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
