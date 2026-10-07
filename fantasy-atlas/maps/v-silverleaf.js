// 은빛잎 마을 HD — 두 단의 고대 숲, 달빛 폭포와 연못, 거목 위 엘프 마을, 동남쪽 이슬 포도원과 언덕 술 창고 (336칸, 1칸 ≈ 25cm)
// 2배 해상도로 다시 지었다: 결이 진 거목 줄기와 뿌리, 굵기가 줄어드는 가지와 잎뭉치, 널판 이음줄이 보이는 발판과 장선·버팀대,
// 기둥·밧줄 난간, 나선 계단(디딤판·난간 기둥·등), 창틀·창살·창턱·꽃상자·판자문·손잡이·처마가 있는 둥근 오두막과 비늘 지붕,
// 디딤판 이음줄이 있는 흔들다리, 낱돌로 쌓은 술 창고 아치 문, 테 두른 술통, 포도 송이, 선돌 제단, 돌 등롱, 과녁 동심원 등.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  MAPS.push({
    id: 'silverleaf', cat: 'village', name: '은빛잎 마을', en: 'Silverleaf', color: '#7ad0a0', seed: 139, base: 44, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '천 년 된 거목 위에 지은 엘프 마을. 해가 지면 가지마다 등불이 켜지고 흔들다리가 노래한다. 동남쪽 이슬 포도원에서는 밤마다 포도알이 은빛으로 빛나고, 언덕 속 달샘 술 창고에서 이슬 포도주가 익어 간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '숲 엘프 40여 명'], ['특산물', '은잎 활 · 이슬 포도주'], ['명소', '달빛 폭포 · 이슬 포도원 · 달샘 술 창고'], ['소문', '거목의 나이를 아는 이는 장로뿐']] },
    sky: ['#2c3c64', '#0e1630', '#8ad8c8'], stars: true,
    hemi: ['#c8f0e8', '#1a2a2a', 0.68], sun: ['#d0e8ff', 0.58, [0.45, 1, 0.5]],
    day: { sky: ['#d8f0e8', '#6aa8c0', '#f0ffe8'], stars: false, hemi: ['#f4fff8', '#3a4a3a', 0.6], sun: ['#fff8e0', 0.74, [0.45, 1, 0.5]], haze: '#b8d8d0' },
    liquid: ['#1a4a5a', '#3a8a9a', '#c8fff0'], liqSpeed: 0.8,
    fog: { box: [172, 172, 176, 176], start: 0.78, floor: 28, depth: 20, haze: [60, 0.26, 12], hazeColor: '#3e5e6e' },
    camY: -20, zoom: 1.0,
    particles: [
      { n: 220, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], mode: 'wisp', speed: 1.4, size: 2, y0: 52 },
      { n: 220, colors: ['#a8d8b8', '#d8f0e0'], mode: 'drift', speed: 0.5, y0: 60, y1: 208, glow: false },
    ],
    blocks: {
      moss: { c: '#3e4a34', top: '#4a7a4a', v: 0.1 }, moss2: { c: '#40503a', top: '#5a8a52', v: 0.1 }, fern: { c: '#3a6a3a', v: 0.1 }, fern2: { c: '#4e8248', v: 0.1 },
      dirt: { c: '#4a3a2e', v: 0.08 }, rock: { c: '#5a6a6a', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4646', v: 0.06, pat: 'stone' }, cliff: { c: '#6a7a78', v: 0.06, pat: 'big' },
      bark: { c: '#7a6a58', v: 0.07 }, barkDk: { c: '#54483c', v: 0.07 }, barkLt: { c: '#948470', v: 0.06 },
      leafS: { c: '#8ab8a0', v: 0.09 }, leafT: { c: '#5a9a88', v: 0.09 }, leafD: { c: '#3a6a5a', v: 0.08 }, leafW: { c: '#c8e8d8', v: 0.05 },
      plank: { c: '#b08a5a', v: 0.08, pat: 'plank' }, plankDk: { c: '#8a6a44', v: 0.06 }, rope: { c: '#c8b890', v: 0.04 },
      hut: { c: '#dccca4', v: 0.04 }, hutRoof: { c: '#5a8a6a', v: 0.05 }, hutRoof2: { c: '#4e7c5e', v: 0.05 }, hutRoofDk: { c: '#3e6450', v: 0.04 },
      door: { c: '#6a5038', v: 0.03, pat: 'plank' }, doorDk: { c: '#4a3a2e', v: 0.03 }, brass: { c: '#e0c060', v: 0.02 }, iron: { c: '#3a3a3e', v: 0.03 },
      mullion: { c: '#e8e0c8', v: 0.02 }, stoneW: { c: '#b0b8b0', v: 0.06 }, mortar: { c: '#6a726c', v: 0.04 },
      st1: { c: '#8a9692', v: 0.05 }, st2: { c: '#76827e', v: 0.05 }, st3: { c: '#9aa49c', v: 0.05 }, st4: { c: '#7e8a80', v: 0.05 },
      target: { c: '#e8e0d0', v: 0.03 }, targetR: { c: '#c04a3a', v: 0.03 }, targetY: { c: '#e8c050', v: 0.03 }, straw: { c: '#c8b070', v: 0.06 },
      flower: { c: '#c8a0ff', v: 0.05 }, flower2: { c: '#ffffff', v: 0.03 }, flower3: { c: '#f0e080', v: 0.04 }, stem: { c: '#4a7a44', v: 0.06 },
      pathS: { c: '#4a3a2e', top: '#8a948c', v: 0.06 }, pathS2: { c: '#4a3a2e', top: '#7a8680', v: 0.06 }, pathJ: { c: '#4a3a2e', top: '#5a6460', v: 0.04 },
      vsoil: { c: '#4a3a2e', top: '#5a4632', v: 0.08 },
      mush: { c: '#d8d0c0', top: '#c04a4a', v: 0.05 }, mushStem: { c: '#e8e0d0', v: 0.03 }, mushG: { c: '#9ae8f0', glow: true },
      cask: { c: '#8a6a44', v: 0.05 }, cask2: { c: '#7a5c3a', v: 0.05 }, caskTop: { c: '#6a4e32', v: 0.04 }, hoop: { c: '#3a3a3e', v: 0.03 },
      grape: { c: '#b890ff', night: true, day: '#6a4aa8' }, grapeD: { c: '#5a3a8a', v: 0.05 },
      lamp: { c: '#9affd8', night: true, day: '#8ab0a0' }, lamp2: { c: '#ffe08a', night: true, day: '#c8b880' }, win: { c: '#ffe8a8', night: true, day: '#a8c8c0' },
      glowF: { c: '#b8f8ff', glow: true }, moon: { c: '#e0f8ff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, UP = base + 28;
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const sX = z => 168 + Math.sin(z * 0.023) * 13;
      const EDGE = x => 152 + (n.fbm(x * 0.015, 7, 2) - 0.5) * 30;
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => base + MH.sstep(EDGE(x) + 4, EDGE(x) - 2, z) * 28 + n.fbm(x * 0.019, z * 0.019) * 5 + n.ridge(x * 0.015, z * 0.015, 3) * 3,
        surface: (x, z, y, s) => s >= 5 ? B.cliff : n.fbm(x * 0.0425, z * 0.0425 + 5, 2) > 0.55 ? B.moss2 : B.moss,
        under: (x, z, y, dep, s) => dep < 4 && s < 5 ? B.dirt : (((y >> 1) & 3) === 0 ? B.rockDk : B.rock),
      });
      const isLeaf = b => b === B.leafS || b === B.leafT || b === B.leafD || b === B.leafW;
      // 물길: 2배 깊이(4~8칸)
      const river = (pts, width, level, bed) => {
        const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
        for (let z = Math.max(0, Math.floor(Math.min(...zs) - width - 3)); z < Math.min(D, Math.max(...zs) + width + 3); z++)
          for (let x = Math.max(0, Math.floor(Math.min(...xs) - width - 3)); x < Math.min(W, Math.max(...xs) + width + 3); x++) {
            const d = MH.polyDist(x + 0.5, z + 0.5, pts);
            if (d > width) continue;
            const depth = Math.round(4 + (1 - d / width) * 4);
            MH.setH(w, x, z, Math.min(MH.g(w, x, z), level - depth), bed, bed);
            w.liquid(x, z, level);
            for (let y = level - depth + 1; y <= level + 1; y++) w.set(x, y, z, 0);
          }
      };
      const upPts = []; for (let z = -8; z <= 152; z += 8) upPts.push([sX(z), z]);
      river(upPts, 7, UP + 2, B.rockDk);
      const PX = 168, PZ = 200;
      for (let z = 148; z < 254; z++) for (let x = 116; x < 224; x++) {
        const d = MH.dist(x, z, PX, PZ) + (n.vn(x * 0.095, z * 0.095) - 0.5) * 8;
        if (d > 31 || MH.g(w, x, z) > UP - 6) continue;
        MH.setH(w, x, z, base - 6, d > 26 ? B.rock : B.rockDk, B.rock);
        for (let y = base - 5; y <= base + 3; y++) w.set(x, y, z, 0);
        w.liquid(x, z, base + 2);
      }
      const dnPts = []; for (let z = 220; z <= 344; z += 8) dnPts.push([sX(z) + 8, z]);
      river(dnPts, 6.4, base + 2, B.rockDk);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const lights = [], acts = [], landmarks = [];

      // ───────── 공통 도구 ─────────
      // 낱돌 쌓기(2칸 돌 + 1칸 줄눈, 줄마다 엇갈림). 줄눈이면 0
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      // 돌길 무늬: 4×3칸 돌, 1칸 줄눈
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.pathJ;
        return hash3(Math.floor((x + off) / 4), row, 7) > 0.5 ? B.pathS : B.pathS2;
      };
      // 통: 볼록한 몸통, 쇠테 둘, 뚜껑
      const barrel = (T, x, y, z, ht) => {
        ht = ht || 7;
        for (let r = 0; r < ht; r++) {
          const mid = r >= 2 && r <= ht - 3, rr = mid ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            let b;
            if (r === ht - 1) b = outer ? B.cask : B.caskTop;
            else if ((r === 1 || r === ht - 2) && outer) b = B.hoop;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            T.set(x + dx, y + r, z + dz, b);
          }
        }
      };
      // 잎뭉치: 위는 밝고 아래는 어둡게 띠로 나눠 큰 면이 되게, 겉만 2칸 단위로 성기게
      const clump = (cx, cy, cz, r, L) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz;
          if (d > 0.84 && hash3(x >> 2, y >> 2, z >> 2) < 0.18) continue;
          let b = dy > ry * 0.32 ? L[0] : dy < -ry * 0.3 ? L[2] : L[1];
          if (d > 0.75 && hash3(x, y, z) > 0.985) b = B.leafW;
          w.fill(x, y, z, b);
        }
      };
      const LEAVES = [B.leafW, B.leafS, B.leafD];   // 은빛잎: 위는 은백색, 가운데 은녹색, 아래 짙은 녹색
      // 작은 나무: 밑동이 넓은 줄기, 가지 서넛, 가지 끝 잎뭉치
      const oak = (x, y, z, h, r) => {
        for (let i = 0; i < h; i++) {
          const rr = Math.max(0.8, 1.7 * (1 - i / h * 0.5) + (i < 3 ? (3 - i) * 0.4 : 0)), R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= rr * rr) w.set(x + dx, y + i, z + dz, hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2), i >> 2, x + z) > 0.7 ? B.barkDk : B.bark);
        }
        const ends = [[x, y + h, z, 1]];
        const nb = 3 + (hash3(x, 1, z) > 0.5 ? 1 : 0);
        for (let i = 0; i < nb; i++) {
          const a = i / nb * Math.PI * 2 + hash3(x, i, z) * 1.2, sy = y + Math.floor(h * (0.55 + hash3(z, i, x) * 0.25)), l = r * 0.9;
          const ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * 0.55;
          w.line(x, sy, z, ex, ey, ez, B.bark, t => t < 0.5 ? 0.9 : 0.5);
          ends.push([ex, ey, ez, 0.8]);
        }
        ends.forEach(([ex, ey, ez, k]) => clump(ex, ey + 1, ez, r * 0.75 * k, LEAVES));
      };
      // 이끼 덮인 둥근 바위
      const boulder = (x, y, z, r) => {
        const rx = r * 1.15, ry = r * 0.62, rz = r * 0.95, X = Math.ceil(rx), Y = Math.ceil(ry), Z = Math.ceil(rz);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -Z; dz <= Z; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = dx * dx / (rx * rx) + dy * dy / (ry * ry) + dz * dz / (rz * rz);
          if (d > 1) continue;
          const top = dy > ry * 0.35 && hash3((x + dx) >> 2, 3, (z + dz) >> 2) > 0.35;
          w.set(x + dx, y + dy, z + dz, top ? B.moss2 : (dy < -ry * 0.2 ? B.rockDk : B.rock));
        }
      };
      // 돌 등롱: 받침 · 기둥 · 불집(모서리 기둥, 사방 불빛) · 지붕돌 · 보주
      const slamp = (x, z) => {
        const gg = g(x, z); if (gg < 0 || w.get(x, gg + 1, z)) return null;
        w.box(x - 1, gg + 1, z - 1, x + 1, gg + 2, z + 1, B.rock); w.box(x, gg + 3, z, x, gg + 6, z, B.stoneW);
        w.box(x - 1, gg + 7, z - 1, x + 1, gg + 7, z + 1, B.stoneW);
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.box(x + dx, gg + 8, z + dz, x + dx, gg + 9, z + dz, (dx && dz) ? B.stoneW : B.lamp);
        w.box(x - 2, gg + 10, z - 2, x + 2, gg + 10, z + 2, B.stoneW); w.box(x - 1, gg + 11, z - 1, x + 1, gg + 11, z + 1, B.stoneW); w.set(x, gg + 12, z, B.stoneW);
        return [x + 0.5, gg + 9, z + 0.5];
      };
      // 버섯: 줄기 + 갓
      const mushroom = (x, y, z, big) => {
        if (big) { w.box(x, y, z, x, y + 1, z, B.mushStem); for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, y + 2, z + dz, B.mush); w.set(x, y + 3, z, B.mush); }
        else { w.set(x, y, z, B.mushStem); w.set(x, y + 1, z, B.mush); }
      };
      // 울타리: 기둥 6칸마다, 밧줄 두 줄
      const fence = pts => {
        for (let i = 0; i < pts.length - 1; i++) {
          const [ax, az] = pts[i], [bx, bz] = pts[i + 1], nn = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
          for (let s = 0; s <= nn; s++) {
            const x = Math.round(ax + (bx - ax) * s / nn), z = Math.round(az + (bz - az) * s / nn), gg = MH.g(w, x, z);
            if (gg < 0 || wet(x, z)) continue;
            if (s % 6 === 0) { w.box(x, gg + 1, z, x, gg + 6, z, B.barkDk); w.set(x, gg + 7, z, B.leafW); }
            else { w.set(x, gg + 3, z, B.rope); w.set(x, gg + 6, z, B.rope); }
          }
        }
      };

      // ───────── 연못 가운데 달돌 ─────────
      { const cx = 169, cz = 211, rx = 4.2, rz = 3.6;
        for (let dz = -4; dz <= 4; dz++) for (let dx = -5; dx <= 5; dx++) {
          const e = dx * dx / (rx * rx) + dz * dz / (rz * rz);
          if (e > 1) continue;
          const top = base - 2 + Math.round(6 * Math.sqrt(1 - e));
          for (let y = base - 6; y <= top; y++) w.set(cx + dx, y, cz + dz, y === top && hash3(cx + dx, 1, cz + dz) > 0.45 ? B.moss2 : (y < base ? B.rockDk : B.rock));
          if (top >= base + 2) w.liquid(cx + dx, cz + dz, -1);
        }
        w.box(cx - 1, base + 4, cz - 1, cx, base + 8, cz, B.moon); w.box(cx - 1, base + 9, cz - 1, cx - 1, base + 10, cz - 1, B.moon); w.set(cx, base + 9, cz, B.moon);
        w.set(cx - 2, base + 4, cz, B.leafW); w.set(cx + 1, base + 4, cz - 2, B.fern); w.set(cx + 1, base + 5, cz - 2, B.fern2); w.set(cx - 2, base + 4, cz + 1, B.fern);
        lights.push({ name: 'lamp', p: [cx, base + 12, cz], c: '#9af0ff', i: 1.1, d: 44, flicker: 0.05 }); }
      landmarks.push({ name: '달빛 폭포', note: '윗숲에서 떨어지는 은빛 물줄기', p: [169, UP + 20, 159] });
      // 연못 징검돌(남서쪽 물가): 둥근 판돌
      for (const [x, z] of [[146, 222], [151, 226], [155, 230], [159, 233]]) if (wet(x, z)) {
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
          if (dx * dx / 5.5 + dz * dz / 3.4 > 1) continue;
          for (let y = base - 6; y <= base + 3; y++) w.set(x + dx, y, z + dz, y === base + 3 ? B.stoneW : B.rock);
          w.liquid(x + dx, z + dz, -1);
        }
      }

      // ───────── 거목, 발판, 오두막, 나선 계단 ─────────
      const trees = [[100, 84, 96, 10.8], [258, 74, 84, 9.6], [68, 246, 84, 10], [262, 230, 88, 10.4]];
      const plats = [];
      const angd = (t, c) => { let d = t - c; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
      // 나선 계단 디딤판 높이(줄기 둘레 한 바퀴에 25칸 오른다)
      const SA = 0.25, stairR0 = 1.8, stairR1 = 5.2;
      const stairYs = (T, x, z) => {
        const d = MH.dist(x, z, T.tx, T.tz);
        if (d < T.r + stairR0 || d > T.r + stairR1 + 1.3) return [];
        const rel = (((Math.atan2(z - T.tz, x - T.tx) - T.ti) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2), out = [];
        for (let k = 0; k < 4; k++) { const y = T.g + Math.floor((rel + k * Math.PI * 2) / SA); if (y >= T.top) break; out.push(y); }
        return out;
      };
      // 거목
      const giant = (tx, y, tz, h, R0, ti) => {
        for (let i = 0; i < h + 6; i++) {
          const t = Math.min(1, i / h), rr = R0 * (1 - t * 0.45) + (i < 6 ? (6 - i) * 0.3 : 0), R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            let b = B.bark;
            if (d2 > (rr - 1.5) * (rr - 1.5)) {
              const band = Math.floor((Math.atan2(dz, dx) + Math.PI) * rr / 3), hh = hash3(band, Math.floor(i / 9 + hash3(band, 1, ti) * 3), ti);
              b = hh > 0.66 ? B.barkDk : hh < 0.08 ? B.barkLt : B.bark;
              if (i < 4 && hash3(tx + dx, i, tz + dz) > 0.6) b = B.moss2;
            }
            w.set(tx + dx, y + i, tz + dz, b);
          }
        }
        // 뿌리: 줄기에서 땅으로 파고드는 굵은 뿌리 여덟
        for (let k = 0; k < 8; k++) {
          const a = k * 0.785 + hash3(tx, k, tz) * 0.5, l = R0 + 8 + hash3(tz, k, tx) * 7;
          w.line(tx + Math.cos(a) * (R0 - 2), y + 7, tz + Math.sin(a) * (R0 - 2), tx + Math.cos(a) * l, y - 3, tz + Math.sin(a) * l, k % 2 ? B.bark : B.barkDk, t => 3.2 * (1 - t) + 0.9);
        }
        // 가지와 잎뭉치
        const ends = [[tx, y + h + 4, tz, 1.05]];
        for (let i = 0; i < 6; i++) {
          const a = i / 6 * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.55, 0.86)), l = 28 * w.r(0.75, 1.1);
          const ex = tx + Math.cos(a) * l, ez = tz + Math.sin(a) * l, ey = sy + w.r(5, 9);
          w.line(tx, sy, tz, ex, ey, ez, B.bark, t => 2.6 - t * 1.4);
          const a2 = a + (i % 2 ? 0.7 : -0.7), mx = tx + Math.cos(a) * l * 0.55, mz = tz + Math.sin(a) * l * 0.55, my = sy + 3;
          w.line(mx, my, mz, mx + Math.cos(a2) * 9, my + 5, mz + Math.sin(a2) * 9, B.bark, 0.9);
          ends.push([ex, ey, ez, w.r(0.78, 0.92)]);
          ends.push([mx + Math.cos(a2) * 9, my + 5, mz + Math.sin(a2) * 9, 0.42]);
        }
        ends.forEach(([ex, ey, ez, k], q) => {
          const rc = 20 * k;
          clump(ex, ey + 2, ez, rc, q % 3 === 1 ? [B.leafW, B.leafT, B.leafD] : LEAVES);
          if (k > 0.6) { const a = hash3(q, ti, 5) * 6.28; clump(ex + Math.cos(a) * rc * 0.7, ey + 2 - rc * 0.15, ez + Math.sin(a) * rc * 0.7, rc * 0.55, LEAVES); }
        });
      };
      // 둥근 오두막: 판벽(아래·위 띠, 샛기둥), 창 넷(창틀·십자 창살·창턱·꽃상자), 판자문(손잡이·문틀·처마), 비늘 지붕과 꼭지 등
      const hut = (hx, hz, y0, hr, a, doorA) => {
        const yb = y0 + 1, yt = y0 + 12, R = Math.ceil(hr + 3);
        const wins = [0, 1, 2, 3].map(k => doorA + 0.8 + k * 1.57);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz), th = Math.atan2(dz, dx), x = hx + dx, z = hz + dz;
          if (d > hr + 2.4) continue;
          const du = wins.map(wa => angd(th, wa) * hr), dd = angd(th, doorA) * hr;
          for (let y = yb; y <= yt; y++) {
            if (d <= hr) {
              let b = B.hut;
              if (d > hr - 1.5) {
                if (y <= yb + 1 || y >= yt - 1) b = B.barkDk;
                else if (((Math.round((th + Math.PI) * hr) % 6) + 6) % 6 === 0) b = B.bark;
                for (let k = 0; k < 4; k++) {
                  const u = Math.abs(du[k]);
                  if (u <= 1.6 && y >= yb + 4 && y <= yb + 7) b = (u < 0.5 || y === yb + 6) ? B.mullion : B.win;
                  else if (u <= 2.6 && y >= yb + 3 && y <= yb + 8) b = B.barkDk;
                }
                const ud = Math.abs(dd);
                if (ud <= 2.1 && y <= yb + 8) b = (y === yb + 8 || ud > 1.6) ? B.doorDk : B.door;
                else if (ud <= 3.1 && y <= yb + 9) b = B.barkDk;
              }
              w.set(x, y, z, b);
            } else if (d <= hr + 1.25) {
              for (let k = 0; k < 4; k++) {
                const u = Math.abs(du[k]);
                if (u <= 2.6 && y === yb + 3) w.set(x, y, z, B.plank);
                if (k % 2 && u <= 2.6 && y === yb + 2) w.set(x, y, z, B.plankDk);
              }
              if (Math.abs(dd - 1) < 0.6 && y === yb + 4) w.set(x, y, z, B.brass);
              if (Math.abs(dd) <= 3.4 && y === yb + 10) w.set(x, y, z, B.barkDk);
              if (Math.abs(angd(th, doorA + 0.62) * hr) < 0.6) { if (y === yb + 9) w.set(x, y, z, B.iron); if (y === yb + 7 || y === yb + 8) w.set(x, y, z, B.lamp2); }
            } else {
              for (let k = 1; k < 4; k += 2) { const u = Math.abs(du[k]); if (u <= 2.4 && y === yb + 3) w.set(x, y, z, hash3(x, y, z) > 0.45 ? B.flower : B.fern2); if (u <= 2.6 && y === yb + 2) w.set(x, y, z, B.plankDk); }
              if (Math.abs(dd) <= 3.2 && y === yb + 10) w.set(x, y, z, B.leafD);
            }
          }
        }
        // 지붕: 처마 끝은 짙게, 비늘(2칸 줄마다 엇갈린 이음), 이끼 점
        let k = 0;
        for (let rr = hr + 3; rr > 0.4; rr -= 0.5, k++) {
          const y = yt + 1 + k, RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            const d = Math.hypot(dx, dz);
            if (d > rr) continue;
            let b = B.hutRoof;
            if (k === 0) b = B.hutRoofDk;
            else if (d > rr - 1.2) {
              const band = k >> 1, seg = Math.floor((Math.atan2(dz, dx) + Math.PI) * rr / 3 + (band & 1) * 0.5);
              b = (seg & 1) ? B.hutRoof : B.hutRoof2;
              if (hash3((hx + dx) >> 1, y >> 1, (hz + dz) >> 1) > 0.9) b = B.leafD;
            }
            w.set(hx + dx, y, hz + dz, b);
          }
        }
        const rt = yt + 1 + k;
        w.box(hx, rt, hz, hx, rt + 1, hz, B.barkDk); w.box(hx, rt + 2, hz, hx, rt + 3, hz, B.lamp); w.set(hx, rt + 4, hz, B.barkDk);
        return rt;
      };
      trees.forEach(([tx, tz, h, r], ti) => {
        const g0 = g(tx, tz) + 1;
        giant(tx, g0, tz, h, r, ti);
        // 뿌리 둘레 버섯
        for (let k = 0; k < 9; k++) { const a = k * 0.7 + ti, x = Math.round(tx + Math.cos(a) * (r + 6)), z = Math.round(tz + Math.sin(a) * (r + 6)), gg = MH.g(w, x, z); if (!w.get(x, gg + 1, z) && !wet(x, z)) { if (k % 3) mushroom(x, gg + 1, z, k % 3 === 1); else { w.set(x, gg + 1, z, B.mushG); w.set(x + 1, gg + 1, z, B.mushG); w.set(x, gg + 2, z, B.mushG); } } }
        const T = { tx, tz, r, g: g0, ti, top: Math.round(g0 + h * 0.36) };
        [Math.round(g0 + h * 0.36), Math.round(g0 + h * 0.64)].forEach((py, li) => {
          const pr = r + 16 - li * 3, R = Math.ceil(pr) + 1;
          // 발판 위 머리 공간의 잎은 걷어 낸다
          for (let dz = -R - 1; dz <= R + 1; dz++) for (let dx = -R - 1; dx <= R + 1; dx++) if (dx * dx + dz * dz <= (pr + 1.5) * (pr + 1.5)) for (let y = py - 3; y <= py + 16; y++) if (isLeaf(w.get(tx + dx, y, tz + dz))) w.set(tx + dx, y, tz + dz, 0);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz), x = tx + dx, z = tz + dz;
            if (d > pr) continue;
            if (li === 0 && stairYs(T, x, z).some(y => y >= py - 10)) continue;   // 계단 구멍
            w.fill(x, py, z, ((x % 5) + 5) % 5 === 4 ? B.plankDk : B.plank);
            if (d > pr - 2.6 && d <= pr - 0.6) { w.fill(x, py - 1, z, B.barkDk); w.fill(x, py - 2, z, B.barkDk); }
            else if (((z % 8) + 8) % 8 === 0) w.fill(x, py - 1, z, B.barkDk);
            if (d > pr - 1.2) {
              const post = ((Math.round((Math.atan2(dz, dx) + Math.PI) * pr) % 8) + 8) % 8 === 0;
              if (post) { w.fill(x, py + 1, z, B.barkDk); w.fill(x, py + 2, z, B.barkDk); w.fill(x, py + 3, z, B.barkDk); w.fill(x, py + 4, z, B.barkDk); w.fill(x, py + 5, z, B.barkDk); if (hash3(x, py, z) > 0.5) w.fill(x, py + 6, z, B.leafW); }
              else { w.fill(x, py + 3, z, B.rope); w.fill(x, py + 5, z, B.rope); }
            }
          }
          // 발판 밑 버팀대
          for (let k = 0; k < 6; k++) { const aa = k * 1.047 + li * 0.5; w.line(tx + Math.cos(aa) * r, py - 14, tz + Math.sin(aa) * r, tx + Math.cos(aa) * (pr - 3), py - 2, tz + Math.sin(aa) * (pr - 3), B.barkDk, 1); }
          const hr = li ? 5.4 : 6.4, a = ti * 2.1 + li * 2.6, hx = Math.round(tx + Math.cos(a) * (r + 2 + hr)), hz = Math.round(tz + Math.sin(a) * (r + 2 + hr));
          for (let dz = -Math.ceil(hr) - 5; dz <= Math.ceil(hr) + 5; dz++) for (let dx = -Math.ceil(hr) - 5; dx <= Math.ceil(hr) + 5; dx++) for (let y = py + 1; y <= py + 36; y++) if (isLeaf(w.get(hx + dx, y, hz + dz))) w.set(hx + dx, y, hz + dz, 0);
          hut(hx, hz, py, hr, a, ti === 0 && li === 0 ? a : a + Math.PI / 2);
          // 발판 밑 매단 등
          for (let k = 0; k < 4; k++) {
            const aa = a + 1.2 + k * 1.4, lx = Math.round(tx + Math.cos(aa) * (pr - 1.5)), lz = Math.round(tz + Math.sin(aa) * (pr - 1.5));
            w.box(lx, py - 4, lz, lx, py - 1, lz, B.rope); w.set(lx, py - 5, lz, B.iron); w.box(lx, py - 7, lz, lx, py - 6, lz, li ? B.lamp2 : B.lamp); w.set(lx, py - 8, lz, B.iron);
            if (k === 0) lights.push({ name: 'lamp', p: [lx + 0.5, py - 6, lz + 0.5], c: li ? '#ffd880' : '#8affd0', i: 1, d: 32, flicker: 0.1 });
          }
          plats.push({ tx, tz, py, pr, g: g0, r });
        });
        // 나선 계단: 땅에서 아랫단 발판까지
        const R = Math.ceil(r + stairR1 + 2);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const x = tx + dx, z = tz + dz, d = Math.hypot(dx, dz), ys = stairYs(T, x, z);
          for (const y of ys) {
            if (d <= r + stairR1) {
              w.set(x, y, z, B.plank); if (y - 1 > MH.g(w, x, z)) w.set(x, y - 1, z, B.plankDk);
              for (let yy = y + 1; yy <= y + 8; yy++) if (yy < T.top || d < r + stairR0 + 0.5) { const b = w.get(x, yy, z); if (b && b !== B.plank) w.set(x, yy, z, 0); }
            } else {
              w.set(x, y + 4, z, B.rope); w.set(x, y, z, B.plankDk);
              const step = Math.floor((((Math.atan2(dz, dx) - ti) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / SA);
              if (step % 6 === 0) { w.box(x, y + 1, z, x, y + 3, z, B.barkDk); if (step % 24 === 12) w.set(x, y + 5, z, B.lamp2); }
            }
          }
        }
      });
      // 흔들다리: 발판 가장자리 바깥에서 시작, 디딤판 이음줄과 밧줄 난간·드림줄
      const bridge = (p, a, b, sag) => {
        const nn = Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2]) * 2), dx = b[0] - a[0], dz = b[2] - a[2], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len;
        // 다리 길의 잎을 걷고, 양 끝 난간을 연다
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[2] + dz * t, y = Math.round(a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag);
          for (let k = -4; k <= 4; k++) for (let yy = y - 1; yy <= y + 9; yy++) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); if (isLeaf(w.get(bx, yy, bz))) w.set(bx, yy, bz, 0); }
        }
        for (const [e, s] of [[a, 1], [b, -1]]) {
          const cx = e[0] - dx / len * 2 * s, cz = e[2] - dz / len * 2 * s;
          for (let qz = -5; qz <= 5; qz++) for (let qx = -5; qx <= 5; qx++) {
            if (qx * qx + qz * qz > 12.5) continue;
            for (let yy = e[1] + 1; yy <= e[1] + 6; yy++) { const x = Math.round(cx + qx), z = Math.round(cz + qz), bb = w.get(x, yy, z); if (bb === B.rope || bb === B.leafW || bb === B.barkDk) w.set(x, yy, z, 0); }
          }
        }
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[2] + dz * t, y = Math.round(a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag);
          for (let k = -2; k <= 2; k++) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); if (!w.get(bx, y, bz)) p.set(bx, y, bz, i % 6 === 0 ? B.barkDk : (i % 3 === 0 ? B.plankDk : B.plank)); }
          for (const k of [-3, 3]) {
            const bx = Math.round(x + px * k), bz = Math.round(z + pz * k);
            if (!w.get(bx, y, bz)) p.set(bx, y, bz, B.barkDk);
            if (!w.get(bx, y + 5, bz)) p.set(bx, y + 5, bz, B.rope);
            if (i % 6 === 0) for (let yy = y + 1; yy <= y + 4; yy++) if (!w.get(bx, yy, bz)) p.set(bx, yy, bz, B.rope);
          }
          if (i % 12 === 6) { const cx = Math.round(x), cz = Math.round(z); if (!w.get(cx, y - 1, cz)) p.set(cx, y - 1, cz, B.iron); if (!w.get(cx, y - 2, cz)) p.set(cx, y - 2, cz, B.lamp2); }
        }
        return [a[0] + dx / 2, (a[1] + b[1]) / 2 - sag, a[2] + dz / 2];
      };
      const edge = (p, q) => { const dx = q.tx - p.tx, dz = q.tz - p.tz, d = Math.hypot(dx, dz); return [[p.tx + dx / d * (p.pr + 2), p.py, p.tz + dz / d * (p.pr + 2)], [q.tx - dx / d * (q.pr + 2), q.py, q.tz - dz / d * (q.pr + 2)]]; };
      const [a1, b1] = edge(plats[1], plats[3]);
      const sway = w.prop({ name: 'sway', pivot: [(a1[0] + b1[0]) / 2, Math.max(a1[1], b1[1]) + 4, (a1[2] + b1[2]) / 2], axis: Math.abs(b1[0] - a1[0]) > Math.abs(b1[2] - a1[2]) ? 'x' : 'z', rock: 0.03, rockSpeed: 1.4, clipOK: 16 });
      const midS = bridge(sway, a1, b1, 10);
      const [a2, b2] = edge(plats[5], plats[7]); bridge(w, a2, b2, 10);
      const [a3, b3] = edge(plats[4], plats[6]); bridge(w, a3, b3, 8);
      const [a4, b4] = edge(plats[0], plats[4]); bridge(w, a4, b4, 8);
      acts.push({
        name: '흔들다리', hint: '거목 사이 다리가 크게 출렁여요', hit: [Math.round(midS[0]) - 10, Math.round(midS[1]) - 2, Math.round(midS[2]) - 10, Math.round(midS[0]) + 10, Math.round(midS[1]) + 8, Math.round(midS[2]) + 10],
        run: async a => { await a.spin('sway', 7, 3.2); },
      });
      landmarks.push({ name: '흔들다리', note: '윗숲 거목을 잇는 밧줄 다리', p: [midS[0], midS[1] + 18, midS[2]] });
      landmarks.push({ name: '장로의 거목', note: '가장 오래된 나무 위의 회의장', p: [101, plats[1].py + 60, 85], tag: 'ELDER' });
      // 장로의 거목 회의장 입구: 아랫단 오두막 동쪽 문 앞 현관 발판(밧줄 난간·등 기둥), 문에 들어가는 상호작용
      {
        const E = plats[0], hr = 6.4, ehx = Math.round(E.tx + E.r + 2 + hr), edx = Math.round(ehx + hr), edz = E.tz, ey = E.py;
        for (let z = edz - 8; z <= edz + 8; z++) for (let x = edx - 2; x <= edx + 7; x++) {
          if (Math.hypot(x - ehx, z - edz) < hr + 0.6) continue;
          for (let y = ey + 1; y <= ey + 9; y++) { const b = w.get(x, y, z); if (b === B.rope || b === B.leafW || isLeaf(b) || (b === B.barkDk && y > ey + 1 && Math.hypot(x - ehx, z - edz) > hr + 1.4)) w.set(x, y, z, 0); }
          if (x > edx) {
            w.set(x, ey, z, ((x % 5) + 5) % 5 === 4 ? B.plankDk : B.plank); w.set(x, ey - 1, z, ((z % 4) + 4) % 4 === 0 ? B.barkDk : 0);
            const rim = x === edx + 7 || Math.abs(z - edz) === 8;
            if (rim) {
              const post = (x === edx + 7 && Math.abs(z - edz) % 4 === 0) || (Math.abs(z - edz) === 8 && (x - edx) % 3 === 1);
              if (post) { w.box(x, ey + 1, z, x, ey + 5, z, B.barkDk); if (Math.abs(z - edz) === 8 && x === edx + 7) { w.set(x, ey + 6, z, B.iron); w.box(x, ey + 7, z, x, ey + 8, z, B.lamp2); w.set(x, ey + 9, z, B.iron); } }
              else { w.set(x, ey + 3, z, B.rope); w.set(x, ey + 5, z, B.rope); }
            }
          }
        }
        w.line(edx + 6, ey - 1, edz - 6, E.tx + E.r, ey - 12, edz - 3, B.barkDk, 1); w.line(edx + 6, ey - 1, edz + 6, E.tx + E.r, ey - 12, edz + 3, B.barkDk, 1);
        // 문 앞 깔개와 화분
        w.box(edx + 1, ey, edz - 2, edx + 3, ey, edz + 2, B.hutRoof2);
        for (const s of [-1, 1]) { w.box(edx + 2, ey + 1, edz + s * 5, edx + 3, ey + 2, edz + s * 5 + s, B.plankDk); w.set(edx + 2, ey + 3, edz + s * 5, B.flower); w.set(edx + 3, ey + 3, edz + s * 5 + s, B.flower2); w.set(edx + 3, ey + 3, edz + s * 5, B.fern2); }
        acts.push({ name: '장로의 거목 회의장 안으로', hint: '오두막 문을 열고 거목 줄기 속 둥근 회의장으로 들어가요', goto: 'silverleaf-elder', hit: [edx - 1, ey + 1, edz - 3, edx + 2, ey + 9, edz + 3],
          run: async a => {
            a.burst([edx + 1.5, ey + 6, edz + 0.5], { n: 30, colors: ['#ffe9a0', '#ffffff', '#9affd8'], speed: 4, up: 4, life: 1, gravity: -0.8, spread: 2.8 });
            // 반딧불이 거목 둘레를 감아 꼭대기까지 솟으며 장로에게 손님을 알린다
            for (let k = 0; k < 10; k++) { const t = k * 0.7, rr = 38 + k * 0.8; a.burst([E.tx + 0.5 + Math.cos(t) * rr, ey + 12 + k * 8, E.tz + 0.5 + Math.sin(t) * rr], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 2.4, up: 4, life: 1.6, gravity: -0.8, spread: 2.4 }); await a.wait(0.08); }
            await a.wait(0.4);
          } });
      }
      // 승강 바구니(아래 서쪽 거목): 가지에서 내려온 밧줄이 줄어든다
      const T = plats[4], bx = T.tx, bzz = T.tz + Math.round(T.pr) + 6, bg = g(bx, bzz) + 1, beamY = T.py + 16;
      MH.flatten(w, bx - 6, bzz - 4, bx + 7, bzz + 6, bg - 1, B.pathS, B.dirt);
      for (let z = bzz - 4; z <= bzz + 6; z++) for (let x = bx - 6; x <= bx + 7; x++) w.set(x, bg - 1, z, paveAt(x, z));
      for (let z = bzz - 6; z <= bzz + 6; z++) for (let x = bx - 6; x <= bx + 6; x++) for (let y = bg; y <= beamY + 2; y++) if (isLeaf(w.get(x, y, z))) w.set(x, y, z, 0);
      w.line(T.tx, beamY - 2, T.tz + 4, bx, beamY, bzz, B.bark, 1.2); w.box(bx - 1, beamY - 2, bzz, bx + 1, beamY - 2, bzz, B.barkDk); w.set(bx, beamY - 1, bzz, B.iron);
      const bTop = bg + 8, rLen = beamY - 2 - bTop;
      MH.rope(w, 'brope', bx, beamY - 3, bzz, rLen - 1, B.rope);
      const basket = w.prop({ name: 'basket', pivot: [bx + 0.5, bg, bzz + 0.5] });
      basket.box(bx - 2, bg, bzz - 2, bx + 2, bg, bzz + 2, B.plank);
      for (let y = bg + 1; y <= bg + 4; y++) for (let z = bzz - 2; z <= bzz + 2; z++) for (let x = bx - 2; x <= bx + 2; x++) if (Math.abs(x - bx) === 2 || Math.abs(z - bzz) === 2) basket.set(x, y, z, y === bg + 4 ? B.plankDk : ((x + z + y) & 1 ? B.rope : B.straw));
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) basket.box(bx + dx, bg + 5, bzz + dz, bx + dx, bTop - 1, bzz + dz, B.rope);
      basket.box(bx - 2, bTop, bzz - 2, bx + 2, bTop, bzz + 2, B.rope); basket.set(bx, bTop - 1, bzz, B.iron); basket.box(bx, bTop - 3, bzz, bx, bTop - 2, bzz, B.lamp2);
      // 바구니 곁 짐 통과 꽃
      barrel(w, bx + 8, bg, bzz + 3, 6); w.set(bx + 8, bg + 6, bzz + 3, B.flower);
      acts.push({
        name: '승강 바구니', hint: '밧줄이 감기며 바구니가 발판까지 올라가요', hit: [bx - 2, bg, bzz - 2, bx + 2, bTop, bzz + 2],
        run: async a => {
          const up = T.py + 1 - bg;
          await Promise.all([a.move('basket', [0, up, 0], 3.6, t => t), a.rope('brope', rLen - 1, rLen - 1 - up, 3.6, t => t)]);
          await a.wait(1);
          await Promise.all([a.move('basket', [0, 0, 0], 3.2, t => t), a.rope('brope', rLen - 1, rLen - 1, 3.2, t => t)]);
        },
      });

      // ───────── 달맞이 돌 제단(연못 남서쪽): 선돌 열둘, 판돌 원, 달돌 ─────────
      const MXX = 121, MZZ = 259, mg = g(MXX, MZZ);
      const fieldL = [[194, 236], [192, 272], [206, 280], [220, 264], [212, 244], [228, 282]];
      MH.flatten(w, MXX - 20, MZZ - 20, MXX + 20, MZZ + 20, mg, B.moss2, B.dirt);
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * Math.PI * 2, x = Math.round(MXX + Math.cos(a) * 17), z = Math.round(MZZ + Math.sin(a) * 17), ht = 9 + (k % 2) * 6;
        for (let y = mg + 1; y <= mg + ht; y++) for (let dz = 0; dz <= 1; dz++) for (let dx = 0; dx <= 1; dx++) {
          if (y > mg + ht - 2 && (dx + dz + k) % 3 === 0) continue;
          w.set(x + dx, y, z + dz, y <= mg + 2 ? B.rock : (hash3(x + dx, y >> 2, z + dz) > 0.85 ? B.moss2 : B.stoneW));
        }
        if (k % 2) { w.set(x, mg + ht + 1, z, B.iron); w.box(x, mg + ht + 2, z, x, mg + ht + 3, z, B.lamp); w.set(x, mg + ht + 4, z, B.iron); }
        else { w.set(x, mg + ht + 1, z, B.leafW); w.set(x + 1, mg + ht, z + 1, B.leafW); }
      }
      for (let dz = -12; dz <= 12; dz++) for (let dx = -12; dx <= 12; dx++) {
        const d = Math.hypot(dx, dz), x = MXX + dx, z = MZZ + dz;
        if (d <= 7 && d > 4) w.set(x, mg, z, B.stoneW);
        else if (d <= 11 && d > 7) w.set(x, mg, z, hash3(Math.floor((Math.atan2(dz, dx) + Math.PI) * 3), d > 9 ? 1 : 0, 3) > 0.5 ? B.pathS : B.pathS2);
        else if (d > 11 && d <= 11.8) w.set(x, mg, z, B.pathJ);
      }
      w.box(MXX - 3, mg + 1, MZZ - 3, MXX + 3, mg + 2, MZZ + 3, B.rock); w.box(MXX - 2, mg + 3, MZZ - 2, MXX + 2, mg + 4, MZZ + 2, B.stoneW);
      w.box(MXX - 3, mg + 5, MZZ - 3, MXX + 3, mg + 5, MZZ + 3, B.stoneW);
      w.box(MXX - 1, mg + 6, MZZ - 1, MXX + 1, mg + 7, MZZ + 1, B.moon); w.box(MXX, mg + 8, MZZ, MXX, mg + 9, MZZ, B.moon);
      for (const [dx, dz] of [[-5, 0], [5, 0], [0, -5], [0, 5]]) { w.set(MXX + dx, mg + 1, MZZ + dz, B.stem); w.set(MXX + dx, mg + 2, MZZ + dz, B.flower2); }
      lights.push({ name: 'lamp', p: [MXX + 0.5, mg + 10, MZZ + 0.5], c: '#e0f8ff', i: 1, d: 32, flicker: 0.05 });
      acts.push({
        name: '등불 점등', hint: '숲 전체의 등불이 밝아지고 반딧불이 날아올라요', hit: [MXX - 4, mg + 1, MZZ - 4, MXX + 4, mg + 10, MZZ + 4],
        run: async a => {
          a.flash('lamp', 3, 4.4); a.glow(1.7, 4.4);
          for (let k = 0; k < 6; k++) a.burst([MXX + 0.5 + Math.cos(k * 1.05) * 10, mg + 4, MZZ + 0.5 + Math.sin(k * 1.05) * 10], { n: 12, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 2.8, up: 4.8, life: 3.2, gravity: -0.7, spread: 3 });
          // 반딧불은 줄기 속이 아니라 발판 바깥 둘레에서 솟는다
          for (const [x, z] of fieldL) for (let k = 0; k < 6; k++) a.burst([x + 3 + (k % 2) * 3, MH.g(w, x, z) + 6 + k * 2.4, z + 1 - (k % 2) * 2], { n: 12, colors: ['#ffe08a', '#c8ff9a', '#8affe0'], speed: 2.8, up: 4, life: 3, gravity: -0.7, spread: 2.8 });
          for (let k = 0; k < 12; k++) { const t = k / 12 * Math.PI * 2; a.burst([MXX + 0.5 + Math.cos(t) * 17, mg + 18, MZZ + 0.5 + Math.sin(t) * 17], { n: 8, colors: ['#9affd8', '#e0f8ff'], speed: 2, up: 3, life: 2.4, gravity: -0.6, spread: 1.2 }); }
          for (const p of plats) { for (let k = 0; k < 3; k++) { const ang = k * 2.1 + p.py * 0.15; a.burst([p.tx + 0.5 + Math.cos(ang) * (p.pr + 1.6), p.py + 2, p.tz + 0.5 + Math.sin(ang) * (p.pr + 1.6)], { n: 10, colors: ['#c8ff9a', '#8affe0', '#ffe08a'], speed: 3.2, up: 4, life: 3, gravity: -0.6, spread: 3.2 }); } await a.wait(0.25); }
        },
      });
      landmarks.push({ name: '달맞이 제단', note: '선돌이 둘러싼 은빛 돌', p: [MXX + 0.5, mg + 28, MZZ + 0.5] });

      // ───────── 활터(동쪽): 다리 셋인 받침대와 짚 테 과녁 ─────────
      const targetDisc = (T2, x, y, z) => {
        for (let dy = -7; dy <= 7; dy++) for (let dz = -7; dz <= 7; dz++) {
          const d = Math.hypot(dy, dz);
          if (d > 7.2) continue;
          T2.set(x, y + dy, z + dz, d > 6.2 ? B.straw : d < 1.6 ? B.targetY : d < 3.2 ? B.targetR : d < 4.8 ? B.target : B.targetR);
        }
      };
      for (const [tx, tz] of [[310, 142], [310, 162], [308, 184]]) {
        const gg = g(tx, tz);
        w.line(tx - 2, gg + 1, tz, tx, gg + 15, tz, B.barkDk); w.line(tx + 3, gg + 1, tz - 5, tx + 1, gg + 12, tz - 3, B.barkDk); w.line(tx + 3, gg + 1, tz + 5, tx + 1, gg + 12, tz + 3, B.barkDk);
        w.box(tx + 1, gg + 9, tz - 5, tx + 1, gg + 9, tz + 5, B.barkDk);
        targetDisc(w, tx, gg + 17, tz);
      }
      // 사대: 판돌 마당, 기둥과 난간, 화살 통(꽂힌 화살)
      const shg = g(260, 164);
      MH.flatten(w, 254, 152, 266, 176, shg, B.pathS, B.dirt);
      for (let z = 152; z <= 176; z++) for (let x = 254; x <= 266; x++) w.set(x, shg, z, paveAt(x, z));
      for (let z = 152; z <= 176; z += 6) { w.box(254, shg + 1, z, 254, shg + 6, z, B.barkDk); if (z === 164) { w.set(254, shg + 7, z, B.iron); w.box(254, shg + 8, z, 254, shg + 9, z, B.lamp2); } else w.set(254, shg + 7, z, B.leafW); }
      w.box(254, shg + 6, 152, 254, shg + 6, 176, B.plank); w.box(254, shg + 3, 152, 254, shg + 3, 176, B.rope);
      for (const z of [156, 168, 174]) {
        barrel(w, 258, shg + 1, z, 5);
        for (const [dx, dz, hh] of [[-1, 0, 3], [1, 1, 4], [0, -1, 2], [1, -1, 3]]) { w.box(258 + dx, shg + 6, z + dz, 258 + dx, shg + 6 + hh, z + dz, B.barkDk); w.set(258 + dx, shg + 7 + hh, z + dz, B.leafW); }
      }
      // 연습용 과녁(부품): 활터 앞쪽 풀밭, 화살을 맞으면 빙글 돈다
      const tgt = { x: 284, z: 178 }; tgt.y = g(tgt.x, tgt.z) + 17;
      w.box(tgt.x, tgt.y - 16, tgt.z, tgt.x, tgt.y - 8, tgt.z, B.barkDk); w.box(tgt.x - 1, tgt.y - 16, tgt.z - 1, tgt.x + 1, tgt.y - 15, tgt.z + 1, B.barkDk);
      const tp = w.prop({ name: 'target', pivot: [tgt.x + 0.5, tgt.y + 0.5, tgt.z + 0.5], axis: 'y' });
      targetDisc(tp, tgt.x, tgt.y, tgt.z);
      acts.push({
        name: '과녁 맞히기', hint: '은잎 화살이 과녁 한가운데 꽂히자 과녁이 빙글 돌아요', hit: [tgt.x - 2, tgt.y - 7, tgt.z - 7, tgt.x + 2, tgt.y + 7, tgt.z + 7],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.burst([tgt.x - 18, tgt.y + 2, tgt.z + 0.5], { n: 6, colors: ['#e0f8ff', '#c8e8d8'], speed: 18, up: 0.4, life: 0.5, gravity: 0, spread: 0.4, flat: true });
            await a.wait(0.35);
            a.burst([tgt.x + 2.4, tgt.y + 0.5, tgt.z + 0.5], { n: 22, colors: ['#ffffff', '#ffe08a', '#c04a3a'], speed: 8, up: 4, life: 0.7, gravity: 12, spread: 1 });
            await a.wait(0.3);
          }
          await a.turn('target', [0, Math.PI * 4, 0], 2.2);
          a.unwind('target');
        },
      });
      landmarks.push({ name: '활터', note: '은잎 활 시험장', p: [309, UP + 10, 163] });

      // ───────── 이슬 포도원과 달샘 술 창고(동남쪽 아랫숲) ─────────
      const VX0 = 236, VX1 = 326, VZ0 = 268, VZ1 = 326, vg = g(280, 296);
      for (let z = VZ0 - 12; z <= VZ1; z++) for (let x = VX0; x <= VX1; x++) if (!wet(x, z)) MH.setH(w, x, z, vg, B.moss2, B.dirt);
      MH.retain(w, VX0, VZ0 - 12, VX1, VZ1, B.rock, B.stoneW);
      // 술 창고 언덕
      const HX = 310, HZ = 238, HR = 24;
      for (let z = HZ - HR; z <= HZ + HR; z++) for (let x = HX - HR; x <= HX + HR; x++) {
        const d = MH.dist(x, z, HX, HZ) + (n.vn(x * 0.15, z * 0.15) - 0.5) * 3;
        if (d > HR || x >= W || z >= D) continue;
        const h = vg + Math.round(20 * Math.sqrt(Math.max(0, 1 - (d / HR) ** 2))), gg = MH.g(w, x, z);
        if (h > gg) MH.setH(w, x, z, h, d < HR - 4 ? B.moss2 : B.moss, B.dirt);
      }
      // 앞마당을 파내고 낱돌 옹벽
      const FZ0 = 256;
      for (let z = FZ0 + 2; z <= VZ0 - 1; z++) for (let x = 298; x <= 321; x++) { MH.setH(w, x, z, vg, paveAt(x, z), B.dirt); for (let y = vg + 1; y <= vg + 28; y++) w.set(x, y, z, 0); }
      for (const [x0, x1] of [[296, 297], [322, 323]]) for (let z = FZ0 + 2; z <= VZ0 - 3; z++) {
        const hh = Math.max(vg + 2, Math.max(MH.g(w, x0 - 1, z), MH.g(w, x1 + 1, z)));
        for (let x = x0; x <= x1; x++) { for (let y = vg + 1; y < hh; y++) w.set(x, y, z, stoneAt(z, y, x0) || B.mortar); w.set(x, hh, z, B.stoneW); }
      }
      // 앞벽(낱돌), 처마돌, 담쟁이
      for (let y = vg + 1; y <= vg + 16; y++) for (let x = 298; x <= 321; x++) { w.set(x, y, FZ0, B.rock); w.set(x, y, FZ0 + 1, stoneAt(x, y, 11) || B.mortar); }
      w.box(297, vg + 17, FZ0, 322, vg + 18, FZ0 + 2, B.rock);
      for (let x = 297; x <= 322; x++) { if (hash3(x >> 1, 4, 2) > 0.35) w.set(x, vg + 19, FZ0 + 1, B.leafD); if (hash3(x, 5, 2) > 0.7) w.box(x, vg + 13 + ((hash3(x, 6, 2) * 4) | 0), FZ0 + 2, x, vg + 16, FZ0 + 2, B.leafD); }
      // 저장실(언덕 속)
      for (let z = 240; z < FZ0; z++) for (let x = 302; x <= 317; x++) for (let y = vg + 1; y <= vg + 12; y++) w.set(x, y, z, 0);
      w.box(302, vg + 13, 240, 317, vg + 14, FZ0 - 1, B.rock); w.box(300, vg + 1, 240, 301, vg + 12, FZ0 - 1, B.rock); w.box(318, vg + 1, 240, 319, vg + 12, FZ0 - 1, B.rock); w.box(302, vg + 1, 238, 317, vg + 12, 239, B.rock);
      for (let z = 240; z < FZ0; z++) for (let x = 302; x <= 317; x++) w.set(x, vg, z, paveAt(x, z));
      // 아치 문: 쐐기돌 아치, 기둥, 달돌 이맛돌
      const ACX = 309.5, ACY = vg + 9;
      const inArch = (x, y) => Math.abs(x - ACX) <= 6 && (y <= ACY || Math.hypot(x - ACX, y - ACY) <= 6);
      for (let x = 300; x <= 319; x++) for (let y = vg + 1; y <= vg + 17; y++) {
        if (inArch(x, y)) { w.set(x, y, FZ0, 0); w.set(x, y, FZ0 + 1, 0); continue; }
        const r = Math.hypot(x - ACX, Math.max(0, y - ACY));
        if (y > ACY && r <= 8.6) { const seg = Math.floor(Math.atan2(y - ACY, x - ACX) / (Math.PI / 9)); for (const z of [FZ0 + 1, FZ0 + 2]) w.set(x, y, z, (seg & 1) ? B.st3 : B.st1); }
        else if (Math.abs(x - ACX) <= 8.6 && Math.abs(x - ACX) > 6 && y <= ACY) { for (const z of [FZ0 + 1, FZ0 + 2]) w.set(x, y, z, ((y - vg) % 4 === 0) ? B.mortar : (((y - vg) >> 2) & 1 ? B.st3 : B.st1)); }
      }
      w.box(308, vg + 16, FZ0 + 2, 311, vg + 17, FZ0 + 3, B.moon);
      // 창고 안: 통 더미, 누운 큰 통, 등불
      for (const x of [305, 314]) for (const z of [244, 250]) barrel(w, x, vg + 1, z, 6);
      for (let x = 304; x <= 315; x++) for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { if (dy * dy + dz * dz > 10) continue; w.set(x, vg + 4 + dy, 242 + dz, x === 305 || x === 314 ? B.hoop : (x === 304 || x === 315 ? (dy * dy + dz * dz < 2 ? B.caskTop : B.cask2) : B.cask)); }
      w.box(308, vg + 9, 245, 311, vg + 9, 245, B.iron); w.box(309, vg + 8, 245, 310, vg + 8, 245, B.lamp2);
      lights.push({ name: 'cellar', p: [310, vg + 8, 246], c: '#ffd890', i: 1.2, d: 28, flicker: 0.15 });
      // 문짝(부품 두 쪽): 판자, 쇠띠, 고리 손잡이. 바깥으로 열린다
      const doorL = w.prop({ name: 'cdoorL', pivot: [304, vg + 1, FZ0 + 2], axis: 'y' });
      const doorR = w.prop({ name: 'cdoorR', pivot: [316, vg + 1, FZ0 + 2], axis: 'y' });
      for (let x = 304; x <= 315; x++) for (let y = vg + 1; y <= vg + 15; y++) {
        if (!inArch(x, y)) continue;
        const P = x < 310 ? doorL : doorR, edgeX = x === 304 || x === 315 || x === 309 || x === 310;
        P.set(x, y, FZ0 + 1, (y - vg === 3 || y - vg === 10) ? B.hoop : edgeX ? B.doorDk : B.door);
      }
      doorL.set(308, vg + 6, FZ0 + 2, B.iron); doorL.set(308, vg + 5, FZ0 + 2, B.brass); doorR.set(311, vg + 6, FZ0 + 2, B.iron); doorR.set(311, vg + 5, FZ0 + 2, B.brass);
      // 문 앞 술통과 등롱 기둥
      for (const [x, z] of [[301, 263], [318, 261], [318, 267]]) barrel(w, x, vg + 1, z, 6);
      for (const x of [300, 319]) { w.box(x, vg + 1, FZ0 + 4, x, vg + 8, FZ0 + 4, B.barkDk); w.set(x, vg + 9, FZ0 + 4, B.iron); w.box(x, vg + 10, FZ0 + 4, x, vg + 11, FZ0 + 4, B.lamp2); w.set(x, vg + 12, FZ0 + 4, B.iron); }
      lights.push({ p: [300.5, vg + 10, FZ0 + 4.5], c: '#ffd880', i: 0.9, d: 24, flicker: 0.12, night: true });
      acts.push({
        name: '술 창고 문', hint: '언덕 속 술 창고 문이 활짝 열리며 이슬 포도주 향과 금빛 반딧불이 쏟아져요', hit: [302, vg + 1, FZ0 - 2, 317, vg + 14, FZ0 + 4],
        run: async a => {
          await Promise.all([a.turn('cdoorL', [0, -1.35, 0], 1.4), a.turn('cdoorR', [0, 1.35, 0], 1.4)]);
          a.flash('cellar', 3, 3.4);
          for (let k = 0; k < 7; k++) { a.burst([309.5 + ((k % 3) - 1) * 2, vg + 6, FZ0 + 3], { n: 14, colors: ['#ffe08a', '#c8a0ff', '#fff4c8'], speed: 3.2, up: 5.2, life: 2.6, gravity: -0.8, spread: 2.8 }); await a.wait(0.35); }
          await a.wait(0.8);
          await Promise.all([a.turn('cdoorL', [0, 0, 0], 1.4), a.turn('cdoorR', [0, 0, 0], 1.4)]);
        },
      });
      landmarks.push({ name: '달샘 술 창고', note: '언덕 속에서 이슬 포도주가 익는 저장고', p: [309, vg + 36, 249] });
      acts.push({
        name: '달샘 술 창고 안으로', hint: '문짝을 활짝 열고 언덕 속 깊은 통 저장실과 달빛 샘물 숙성 굴로 들어가요', goto: 'silverleaf-cellar', hit: [302, vg + 1, 240, 317, vg + 12, FZ0 + 2],
        run: async a => {
          await Promise.all([a.turn('cdoorL', [0, -1.35, 0], 1), a.turn('cdoorR', [0, 1.35, 0], 1)]);
          a.flash('cellar', 2.5, 1.4);
          a.burst([309.5, vg + 6, FZ0 + 3], { n: 30, colors: ['#ffe9a0', '#c8a0ff', '#ffffff'], speed: 4, up: 4, life: 1, gravity: -0.8, spread: 3.2 });
          await a.wait(0.7);
        },
      });
      // 포도 시렁: T자 기둥, 철선 두 줄, 덩굴 울타리, 포도 송이
      const rows = [276, 286, 306, 316];
      const FX = 283, FZc = 297;
      rows.forEach((rz, ri) => {
        for (let x = 244; x <= 324; x++) {
          if (MH.dist(x, rz, FX, FZc) < 14) continue;
          for (let dz = -2; dz <= 2; dz++) w.set(x, vg, rz + dz, B.vsoil);
          const post = (x - 244) % 10 === 0;
          if (post) {
            w.box(x, vg + 1, rz, x, vg + 11, rz, B.barkDk); w.box(x, vg + 10, rz - 2, x, vg + 10, rz + 2, B.barkDk);
            if ((x / 10 + ri) % 4 === 2) { w.set(x, vg + 12, rz, B.iron); w.box(x, vg + 13, rz, x, vg + 14, rz, B.lamp2); }
            continue;
          }
          for (const s of [-2, 2]) w.set(x, vg + 10, rz + s, B.rope);
          if ((x - 244) % 10 === 5) w.box(x, vg + 1, rz, x, vg + 3, rz, B.barkDk);
          const seg = (x / 4) | 0, hv = hash3(seg, ri, 7), top = vg + 8 + (hash3(seg, ri, 8) > 0.5 ? 1 : 0);
          for (let y = vg + 4; y <= top; y++) for (let dz = -1; dz <= 1; dz++) w.set(x, y, rz + dz, y >= top - 1 ? B.leafS : hv > 0.5 ? B.leafT : B.leafD);
          if ((x + ri * 3) % 7 === 0) for (const s of [-1, 1]) if (hash3(x, s, rz) > 0.25) {
            const z = rz + s * 2;
            w.box(x, vg + 6, z, x + 1, vg + 7, z, B.grape); w.set(x, vg + 5, z, B.grapeD); w.set(x + 1, vg + 5, z, B.grape); w.set(x, vg + 4, z, B.grape);
            w.set(x, vg + 8, z, B.stem);
          }
        }
      });
      lights.push({ name: 'vine', p: [264.5, vg + 13, 286.5], c: '#c8a0ff', i: 1, d: 36, flicker: 0.1 });
      w.set(264, vg + 12, 286, B.lamp2); w.set(264, vg + 13, 286, B.lamp2);
      lights.push({ name: 'vine', p: [304.5, vg + 13, 306.5], c: '#c8a0ff', i: 1, d: 36, flicker: 0.1 });
      w.set(304, vg + 12, 306, B.lamp2); w.set(304, vg + 13, 306, B.lamp2);
      // 가운데 돌길과 둘레 울타리
      for (let x = VX0; x <= VX1; x++) for (let z = 294; z <= 299; z++) if (MH.dist(x, z, FX, FZc) > 9.4) w.set(x, vg, z, paveAt(x, z));
      for (let z = FZ0 + 2; z <= 293; z++) for (let x = 306; x <= 313; x++) w.set(x, vg, z, paveAt(x, z));
      fence([[VX0, VZ0 - 8], [VX0, 290]]); fence([[VX0, 302], [VX0, VZ1 - 2], [VX1, VZ1 - 2]]);
      // 포도 바구니(엮은 바구니에 소복한 포도)
      for (const [x, z] of [[252, 300], [268, 302], [296, 290], [320, 300]]) {
        for (let dz = 0; dz <= 2; dz++) for (let dx = 0; dx <= 3; dx++) { w.set(x + dx, vg + 1, z + dz, B.straw); w.set(x + dx, vg + 2, z + dz, (dx === 0 || dx === 3 || dz === 0 || dz === 2) ? B.rope : B.grape); }
        w.set(x + 1, vg + 3, z + 1, B.grape); w.set(x + 2, vg + 3, z + 1, B.grapeD);
      }
      acts.push({
        name: '이슬 거두기', hint: '시렁마다 이슬 포도가 차례로 빛나며 은빛 이슬방울이 날아올라요', hit: [252, vg + 1, 272, 292, vg + 12, 290],
        run: async a => {
          a.flash('vine', 2.6, 4.2);
          for (let i = 0; i < 7; i++) {
            for (const rz of rows.slice(0, 2)) a.burst([247 + i * 8, vg + 11, rz + 3.5], { n: 10, colors: ['#c8a0ff', '#e0f8ff', '#8affe0'], speed: 2.4, up: 5.2, life: 2.4, gravity: -0.8, spread: 2.8 });
            await a.wait(0.3);
          }
          a.burst([FX + 0.5, vg + 12, FZc + 0.5], { n: 40, colors: ['#e0f8ff', '#c8a0ff'], speed: 4.8, up: 6, life: 2, gravity: -0.4, spread: 4 });
        },
      });
      landmarks.push({ name: '이슬 포도원', note: '밤이면 포도알이 은빛으로 빛나는 덩굴 시렁', p: [269, vg + 28, 305] });
      // 달샘 분수: 갓돌 두른 돌 수반, 가운데 기둥과 윗잔, 달돌 구슬이 떠오른다
      for (let z = FZc - 10; z <= FZc + 10; z++) for (let x = FX - 10; x <= FX + 10; x++) {
        const d = MH.dist(x, z, FX, FZc);
        if (d > 9.2) continue;
        if (d > 6.8) { w.set(x, vg, z, B.pathJ); for (let y = vg + 1; y <= vg + 3; y++) w.set(x, y, z, stoneAt(Math.round(Math.atan2(z - FZc, x - FX) * 8), y, 5) || B.mortar); w.set(x, vg + 4, z, B.stoneW); }
        else { MH.setH(w, x, z, vg - 3, B.rockDk, B.rock); for (let y = vg - 2; y <= vg + 3; y++) w.set(x, y, z, 0); w.liquid(x, z, vg + 2); }
      }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = Math.round(FX + Math.cos(a) * 8), z = Math.round(FZc + Math.sin(a) * 8); w.box(x, vg + 5, z, x, vg + 6, z, B.stoneW); if (k % 2) w.set(x, vg + 7, z, B.leafW); }
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { w.box(FX + dx, vg - 3, FZc + dz, FX + dx, vg + 5, FZc + dz, (dx && dz) ? B.stoneW : B.st3); w.liquid(FX + dx, FZc + dz, -1); }
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz); if (d <= 3.2) w.set(FX + dx, vg + 6, FZc + dz, d > 2.2 ? B.stoneW : B.glowF); }
      w.set(FX, vg + 7, FZc, B.glowF);
      const orb = w.prop({ name: 'moonorb', pivot: [FX + 0.5, vg + 14.5, FZc + 0.5], axis: 'y', bob: 0.5, bobSpeed: 1.2 });
      for (let dy = -2; dy <= 2; dy++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (dx * dx + dy * dy + dz * dz <= 5) orb.set(FX + dx, vg + 14 + dy, FZc + dz, B.moon);
      orb.box(FX + 4, vg + 14, FZc, FX + 5, vg + 14, FZc, B.leafW); orb.box(FX - 5, vg + 14, FZc, FX - 4, vg + 14, FZc, B.leafW);
      lights.push({ name: 'well', p: [FX + 0.5, vg + 12, FZc + 0.5], c: '#b8f8ff', i: 1.2, d: 32, flicker: 0.05 });
      acts.push({
        name: '달샘 분수', hint: '수반 위 달돌 구슬이 떠올라 돌자 물줄기가 은빛으로 솟구쳐요', hit: [FX - 8, vg + 1, FZc - 8, FX + 8, vg + 18, FZc + 8],
        run: async a => {
          a.flash('well', 3, 4);
          a.tween('moonorb', { off: [0, 10, 0], rot: [0, Math.PI * 4, 0] }, 2.4);
          for (let k = 0; k < 8; k++) { a.burst([FX + 0.5, vg + 8, FZc + 0.5], { n: 26, colors: ['#ffffff', '#b8f8ff', '#8affe0'], speed: 4.4, up: 16, life: 1.4, gravity: 18, spread: 1.2 }); await a.wait(0.35); }
          a.burst([FX + 0.5, vg + 24, FZc + 0.5], { n: 40, colors: ['#e0f8ff', '#c8a0ff', '#ffffff'], speed: 8, up: 2, life: 1.8, gravity: 1, spread: 2 });
          await a.tween('moonorb', { off: [0, 0, 0], rot: [0, Math.PI * 4, 0] }, 1.8);
          a.unwind('moonorb');
        },
      });
      landmarks.push({ name: '달샘', note: '포도원 한가운데 달빛을 머금은 샘', p: [FX + 0.5, vg + 26, FZc + 0.5] });

      // ───────── 땅 위의 길: 판돌 길과 돌 등롱 ─────────
      const trail = (pts, wd) => {
        const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
        for (let z = Math.min(...zs) - wd - 1; z <= Math.max(...zs) + wd + 1; z++) for (let x = Math.min(...xs) - wd - 1; x <= Math.max(...xs) + wd + 1; x++) {
          if (wet(x, z) || MH.g(w, x, z) < 0) continue;
          const d = MH.polyDist(x + 0.5, z + 0.5, pts);
          if (d <= wd && hash3(x >> 1, 7, z >> 1) > 0.1) MH.paint(w, x, z, paveAt(x, z));
        }
      };
      trail([[116, 194], [120, 220], [120, 238]], 2.8);
      trail([[134, 266], [160, 280], [166, 292]], 2.8);
      trail([[194, 292], [220, 294], [VX0, 296]], 2.8);
      // 아랫개울을 건너는 무지개 다리(잎배가 밑으로 지나간다): 판자 바닥, 난간 기둥과 손잡이
      { const ax = 158, bx2 = 202, zc = 292, y0 = Math.max(g(ax, zc), g(bx2, zc)) + 1, rise = 14;
        for (let x = ax; x <= bx2; x++) {
          const t = (x - ax) / (bx2 - ax), yy = y0 + Math.round(Math.sin(t * Math.PI) * rise);
          for (let dz = -3; dz <= 3; dz++) {
            const z = zc + dz, side = Math.abs(dz) === 3;
            w.set(x, yy, z, side ? B.barkDk : (x % 4 === 0 ? B.plankDk : B.plank)); w.set(x, yy - 1, z, B.barkDk);
            if (side) { w.set(x, yy + 4, z, B.plank); if (x % 6 === 0) w.box(x, yy + 1, z, x, yy + 3, z, B.barkDk); else w.set(x, yy + 2, z, B.rope); }
            for (let y = yy + 1; y <= yy + 9; y++) if (!side && w.get(x, y, z)) w.set(x, y, z, 0);
          }
        }
        for (const x of [ax, bx2]) for (const dz of [-3, 3]) { const gg = g(x, zc + dz); for (let y = gg + 1; y < y0; y++) w.set(x, y, zc + dz, B.barkDk); }
      }
      const slampP = [];
      for (const [x, z] of [[124, 220], [140, 274], [156, 282], [208, 288], [228, 300]]) { const p = slamp(x, z); if (p) slampP.push(p); }
      // ───────── 바위, 작은 나무, 고사리, 꽃 ─────────
      const clearOf = (x, z) => MH.polyDist(x, z, dnPts) > 16 && trees.every(([tx, tz, h, r]) => MH.dist(x, z, tx, tz) > r + 24) && MH.dist(x, z, MXX, MZZ) > 24 && MH.dist(x, z, bx, bzz) > 10 && !(x > VX0 - 6 && z > VZ0 - 16) && MH.dist(x, z, HX, HZ) > HR + 2 && !(x > 248 && x < 270 && z > 148 && z < 180) && !(x > 276 && x < 316 && z > 136 && z < 190);
      const edgeSkip = (x, z) => { const e = Math.min(x, z, W - 1 - x, D - 1 - z); return e < 26 && hash3(x >> 3, 9, z >> 3) > e / 26; };
      for (let i = 0; i < 36; i++) { const x = w.ri(8, W - 9), z = w.ri(8, D - 9), gg = MH.g(w, x, z); if (gg > base && !wet(x, z) && !w.get(x, gg + 1, z) && clearOf(x, z)) boulder(x, gg, z, w.r(3, 7)); }
      for (let i = 0; i < 34; i++) { const x = w.ri(8, W - 9), z = w.ri(8, D - 9), gg = MH.g(w, x, z); if (gg > base && !wet(x, z) && !w.get(x, gg + 1, z) && clearOf(x, z) && !edgeSkip(x, z)) oak(x, gg + 1, z, w.ri(18, 28), w.r(7.5, 9.5)); }
      MH.scatter(w, 10000, (x, gg, z, b) => {
        if (!(b === B.moss || b === B.moss2) || (x > VX0 && z > VZ0 - 12) || edgeSkip(x, z)) return;
        if (!w.chance(0.3) || MH.dist(x, z, bx, bzz) < 6) return;
        const r = w.rand();
        if (r < 0.55) { w.set(x, gg + 1, z, B.fern); w.set(x, gg + 2, z, hash3(x, 2, z) > 0.5 ? B.fern : B.fern2); }
        else if (r < 0.68) { w.set(x, gg + 1, z, B.glowF); }
        else if (r < 0.78) mushroom(x, gg + 1, z, false);
        else { w.set(x, gg + 1, z, B.stem); w.set(x, gg + 2, z, w.pick([B.flower, B.flower2, B.flower3])); }
      });
      // 윗숲 개울을 건너는 나무다리, 폭포 옆 절벽을 내려가는 돌계단
      const bzc = 68, bxc = Math.round(sX(bzc));
      MH.bridge(w, [bxc - 16, bzc], [bxc + 16, bzc], UP + 4, { m: { deck: B.plank, parapet: B.barkDk, cap: B.leafW }, width: 5, rise: 2 });
      for (let x = bxc - 16; x <= bxc + 16; x++) for (let dz = -2; dz <= 2; dz++) for (let y = UP + 5; y <= UP + 14; y++) if (w.get(x, y, bzc + dz)) w.set(x, y, bzc + dz, 0);
      slamp(bxc - 20, bzc + 5); slamp(bxc + 20, bzc - 5);
      const cTop = g(116, 148), cBot = g(116, 192);
      MH.flight(w, { name: '절벽 돌계단', axis: 'z', c: 116, half: 4, a: 150, b: 190, ha: cTop, hb: cBot, step: B.stoneW, edge: B.rockDk, fill: B.rock, rail: B.plank, post: B.barkDk, postGap: 10, clear: 14,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.barkDk); w.set(x, y + 1, z, B.lamp); w.set(x, y + 2, z, B.iron); if (k === 10 && x > 116) lights.push({ p: [x + 0.5, y + 1.5, z + 0.5], c: '#8affd0', i: 0.8, d: 24, flicker: 0.1, night: true }); } });
      // ───────── 동쪽 풀밭 등롱(등불 점등 때 함께 밝아진다) ─────────
      for (const [x, z] of fieldL) { const gg = g(x, z); w.box(x - 1, gg + 1, z - 1, x + 1, gg + 1, z + 1, B.rock); w.box(x, gg + 2, z, x, gg + 9, z, B.barkDk); w.box(x + 1, gg + 9, z, x + 2, gg + 9, z, B.barkDk); w.set(x + 2, gg + 8, z, B.iron); w.box(x + 2, gg + 6, z, x + 2, gg + 7, z, B.lamp2); w.set(x + 2, gg + 5, z, B.iron); w.set(x, gg + 10, z, B.leafW); w.set(x, gg + 11, z, B.leafW); }
      // ───────── 폭포 물보라와 무지개 ─────────
      const FWX = Math.round(sX(158)), FWZ = 168;
      acts.push({
        name: '폭포 무지개', hint: '폭포 물보라가 피어오르며 연못 위에 무지개가 걸려요', hit: [FWX - 8, base, FWZ - 12, FWX + 8, UP + 4, FWZ + 4],
        run: async a => {
          for (let k = 0; k < 4; k++) { a.burst([FWX + 0.5, base + 4, FWZ + 2], { n: 44, colors: ['#ffffff', '#e0f8ff', '#b8e8f0'], speed: 8, up: 10, life: 1.6, gravity: 6, spread: 6 }); a.burst([FWX + 0.5, UP + 2, FWZ - 10], { n: 14, colors: ['#ffffff', '#d8f0ff'], speed: 3, up: 2, life: 1.2, gravity: 16, spread: 3 }); await a.wait(0.35); }
          const bow = ['#ff6a6a', '#ffb05a', '#ffe86a', '#8aff8a', '#6ac8ff', '#a88aff'];
          for (let i = 0; i <= 18; i++) {
            const t = i / 18, x = FWX - 24 + t * 48, y = base + 6 + Math.sin(t * Math.PI) * 32;
            bow.forEach((c, j) => a.burst([x, y - j * 1.6, FWZ + 10], { n: 3, colors: [c], speed: 0.2, up: 0.1, life: 2.6, gravity: 0, spread: 0.4 }));
            await a.wait(0.06);
          }
          await a.wait(1.5);
        },
      });
      // ───────── 연못 잎배: 등불을 단 잎사귀 배가 연못을 빠져나가 아랫개울을 따라 숲 밖으로 흘러간다 ─────────
      const lr = [[154, 218], [164, 222], [174, 222], [182, 218], [186, 214], [180, 220], [172, 224], [166, 234]];
      for (let z = 252; z <= 332; z += 20) lr.push([Math.round(sX(z) + 8), z]);
      MH.routeOK(w, lr, 2, '잎배 경로');
      lr.push([Math.round(sX(348) + 8), 348]);
      const LBX = lr[0][0], LBZ = lr[0][1], LY = base + 3;   // 물 위에 뜬 바닥
      const lb = w.prop({ name: 'leafboat', pivot: [LBX + 0.5, LY, LBZ + 0.5], axis: 'x', bob: 0.24, bobSpeed: 1.6, rock: 0.04, rockSpeed: 1.2 });
      for (let dx = -6; dx <= 6; dx++) {
        const t = (dx + 6) / 12, hw = Math.round(3 * Math.sin(Math.PI * t));
        for (let dz = -hw; dz <= hw; dz++) { lb.set(LBX + dx, LY, LBZ + dz, dz === 0 ? B.leafW : B.leafT); if (Math.abs(dz) === hw && hw > 0) lb.set(LBX + dx, LY + 1, LBZ + dz, B.leafS); }
      }
      lb.set(LBX + 7, LY + 1, LBZ, B.leafW); lb.set(LBX + 8, LY + 2, LBZ, B.leafW); lb.set(LBX + 8, LY + 3, LBZ, B.leafS); lb.set(LBX - 7, LY + 1, LBZ, B.leafT);
      lb.box(LBX - 2, LY + 1, LBZ, LBX - 2, LY + 10, LBZ, B.barkDk); lb.box(LBX - 1, LY + 10, LBZ, LBX + 1, LY + 10, LBZ, B.barkDk);
      lb.set(LBX + 1, LY + 9, LBZ, B.iron); lb.box(LBX + 1, LY + 7, LBZ, LBX + 1, LY + 8, LBZ, B.lamp2); lb.set(LBX + 2, LY + 1, LBZ, B.stem); lb.set(LBX + 2, LY + 2, LBZ, B.flower);
      const lDrive = lr.slice(1).map(([x, z]) => [x - LBX, 0, z - LBZ]);
      acts.push({
        name: '연못 잎배', hint: '등불을 단 잎사귀 배가 연못을 빠져나가 아랫개울을 따라 숲 밖으로 흘러가요', hit: [LBX - 6, LY, LBZ - 3, LBX + 8, LY + 10, LBZ + 3],
        run: async a => {
          a.burst([LBX + 1.5, LY + 8, LBZ + 0.5], { n: 16, colors: ['#ffe08a', '#c8ff9a', '#8affe0'], speed: 2, up: 3, life: 2, gravity: -0.6, spread: 2 });
          await a.drive('leafboat', lDrive, 22, { fwd: '+x', back: 1.0 });
        },
      });
      // ───────── 은방울 풍경: 제단 곁 나무틀에 매단 풍경이 바람에 흔들린다 ─────────
      const CX = 144, CZ = 268, cg = g(CX, CZ);
      for (const z of [CZ - 7, CZ + 7]) { w.box(CX - 1, cg + 1, z - 1, CX + 1, cg + 2, z + 1, B.rock); w.box(CX, cg + 3, z, CX, cg + 20, z, B.barkDk); }
      w.box(CX, cg + 21, CZ - 9, CX, cg + 22, CZ + 9, B.bark); w.set(CX, cg + 23, CZ, B.leafW); w.set(CX, cg + 23, CZ - 7, B.leafW); w.set(CX, cg + 23, CZ + 7, B.leafW);
      const ch = w.prop({ name: 'chimes', pivot: [CX + 0.5, cg + 21, CZ + 0.5], axis: 'z' });
      for (let k = -2; k <= 2; k++) {
        const z = CZ + k * 2, tt = cg + 16 - Math.abs(k) * 2;
        ch.box(CX, tt + 1, z, CX, cg + 20, z, B.rope); ch.box(CX, tt - 5, z, CX, tt, z, k % 2 ? B.stoneW : B.mullion); ch.set(CX, tt - 6, z, B.rope); ch.set(CX, tt - 7, z, B.moon);
      }
      acts.push({
        name: '은방울 풍경', hint: '바람이 불면 제단 곁 풍경이 흔들리며 맑은 소리와 빛을 뿌려요', hit: [CX - 2, cg + 1, CZ - 8, CX + 2, cg + 22, CZ + 8],
        run: async a => {
          a.wind(3, 4);
          for (let k = 0; k < 6; k++) {
            await a.turn('chimes', [0, 0, k % 2 ? -0.6 : 0.6], 0.5);
            a.burst([CX + 0.5, cg + 10, CZ + 0.5], { n: 16, colors: ['#e0f8ff', '#b8f8ff', '#ffffff'], speed: 5, up: 3, life: 1.4, gravity: -0.8, spread: 1.2 });
          }
          await a.turn('chimes', [0, 0, 0], 0.7);
        },
      });
      // ───────── 은어 뛰기: 아랫개울에서 은빛 물고기들이 차례로 튀어 오른다 ─────────
      const fish = [[173, 262], [179, 282], [183, 310], [169, 246]];
      acts.push({
        name: '은어 뛰기', hint: '아랫개울에서 은빛 물고기들이 물을 차고 튀어 올라요', hit: [160, base, 240, 192, base + 8, 316],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            const [x, z] = fish[k % 4];
            a.burst([x, base + 3, z], { n: 4, colors: ['#e8f0f8', '#c8d8e8', '#a8c0d0'], speed: 4, up: 14, life: 1.1, gravity: 26, spread: 0.6 });
            a.burst([x, base + 2.4, z], { n: 14, colors: ['#ffffff', '#d8f0ff'], speed: 5, up: 5, life: 0.7, gravity: 18, spread: 1.6 });
            await a.wait(0.45);
          }
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
