// 벽돌 창고(하위 지도) — 수로 지구 가운데 기중기 창고 안. 1층 하역장(상자 더미·술통·곡물 자루·저울), 북서쪽 창고지기 사무실(장부 책상),
// 북쪽 벽을 따라 놓인 2층 저장층(중이층)과 그 위 3층 다락, 도르래 들보, 뒤편 하역문. 남·동쪽(카메라 쪽) 벽은 낮게 잘랐다
// (128칸, 2배 해상도: 1칸 ≈ 25cm. 낱장 벽돌과 아치 창, 두께 있는 들보와 버팀대, 널마루 결, 테 두른 술통, 모서리 띠 상자, 묶은 자루). playerScale 2
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 112, G = 20;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'canal-warehouse', cat: 'kingdom', sub: true, parent: 'canal', name: '벽돌 창고', en: 'Canal Ward · Brick Warehouse', color: '#b06a48', seed: 2271, base: G, size: [W, D, Hh],
    playerScale: 2,
    desc: '수로 지구 한가운데 기중기가 달린 3층 벽돌 창고. 1층 하역장에는 거룻배에서 내린 상자와 술통, 곡물 자루가 쌓이고, 창고지기는 북서쪽 사무실에서 장부에 도장을 찍는다. 다락의 도르래 들보로 짐을 층층이 올리고, 들보 위에는 비둘기가 산다.',
    info: { title: '장소 정보', en: 'WAREHOUSE', rows: [['1층', '하역장 · 큰 저울 · 창고지기 사무실'], ['2층', '곡물 자루와 술통 저장층'], ['3층', '도르래 들보가 걸린 다락'], ['소문', '들보 위 비둘기는 갑문지기의 편지를 나른다']] },
    night: { sky: ['#283048', '#0a0c18', '#d8a068'], stars: true, hemi: ['#b0b8d0', '#1a1814', 0.46], sun: ['#d0d8ff', 0.3, [0.5, 1, 0.45]], haze: '#262a34' },
    hemi: ['#fff8ec', '#4a4034', 0.6], sun: ['#fff0dc', 0.62, [0.5, 1, 0.45]],
    fog: { start: 0.88, floor: G - 10, depth: 12, haze: [16, 0.12, 12], hazeColor: '#d8d0c4' },
    camY: 0, zoom: 1.3,
    particles: [
      { n: 120, colors: ['#e8dcc0', '#c8b898', '#ffffff'], mode: 'drift', speed: 0.24, wind: 0.16, area: [64, 64, 34], y0: G + 2, y1: G + 44, glow: false },
      { n: 40, colors: ['#fff4d0'], mode: 'fall', speed: 0.16, area: [60, 40, 12], y0: G + 8, y1: G + 40, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      brick: { c: '#9a5a3a', v: 0.05 }, brickDk: { c: '#6a3a2a', v: 0.04 }, brickIn: { c: '#b07a5a', v: 0.04 }, brickIn2: { c: '#a06a4c', v: 0.04 }, brickInLt: { c: '#c08a68', v: 0.04 },
      floorP: { c: '#7a5a38', top: '#a07a4c', v: 0.05 }, floorP2: { c: '#7a5a38', top: '#94703f', v: 0.05 }, floorD: { c: '#6a4a30', top: '#7e5c38', v: 0.04 }, beam: { c: '#5a3e26', v: 0.04 }, beamDk: { c: '#46301e', v: 0.03 },
      sack: { c: '#d8c8a0', v: 0.04 }, sackD: { c: '#b8a478', v: 0.04 }, grain: { c: '#e8c860', v: 0.08 }, straw: { c: '#e0c870', v: 0.1 },
      ledger: { c: '#7a2a2a', v: 0.03 }, ledger2: { c: '#2a4a6a', v: 0.03 }, paper: { c: '#f4ecd8', v: 0.02 }, ink: { c: '#1a1a2a', v: 0.02 }, brass: { c: '#d8a840', v: 0.03 }, stampR: { c: '#c02a2a', v: 0.03 },
      cloth: { c: '#3a5a8a', v: 0.03 }, clothEdge: { c: '#c8a040', v: 0.03 }, apple: { c: '#d8403a', v: 0.05 }, pigeon: { c: '#a8a8b0', v: 0.04 }, pigeonDk: { c: '#6a6a78', v: 0.04 }, pigeonNeck: { c: '#5a8a7a', v: 0.03 },
      lantern: { c: '#ffb860', glow: true }, skyW: { c: '#cfe4f4', v: 0.02 }, sill: { c: '#d8d4ca', v: 0.03 }, ironDk: { c: '#33333a', v: 0.03 },
      crateEdge: { c: '#7a5232', v: 0.04 }, cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => (x + z) % 5 ? B.cobble : B.cobble2, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 26, X1 = 103, Z0 = 30, Z1 = 97, F2 = G + 16, F3 = G + 32, TOP = G + 46;
      // ── 작은 도구 ──
      const brickAt = (u, y, s) => { const h = hash3(Math.floor((u + (y & 1) * 2) / 4), y, s); return h > 0.86 ? B.brickIn2 : h < 0.08 ? B.brickInLt : B.brickIn; };
      // 널마루: 2칸 폭 널, 이음매는 줄마다 엇갈림
      const plank = (x, z, s) => { const r = x >> 1, seam = ((z + r * 5) % 14) === 0; return seam ? B.floorD : (hash3(r, (z + r * 5) / 14 | 0, s) > 0.7 ? B.floorP2 : B.floorP); };
      const crate = (T, x, y, z, s, sy, sz) => {
        sy = sy || s; sz = sz || s;
        for (let dy = 0; dy < sy; dy++) for (let dz = 0; dz < sz; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === sy - 1) + (dz === 0 || dz === sz - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      const barrel = (T, x, y, z, ht) => {   // 가운데 (x,z), 볼록한 통, 쇠테 둘, 뚜껑
        ht = ht || 6;
        for (let r = 0; r < ht; r++) {
          const rr = r >= 2 && r <= ht - 3 ? 2.2 : 1.8;
          for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            T.set(x + dx, y + r, z + dz, r === ht - 1 ? (outer ? B.cask : B.caskTop) : (r === 1 || r === ht - 2) && outer ? B.iron : ((dx + dz) & 1 ? B.cask : B.cask2));
          }
        }
      };
      const sack = (x, y, z, b) => {   // 3×3 자루, 위를 묶은 끈
        b = b || B.sack;
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = dx !== 1 && dz !== 1;
          if (!corner) w.set(x + dx, y, z + dz, b);
          w.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? b : B.sackD);
          if (!corner) w.set(x + dx, y + 2, z + dz, b);
        }
        w.set(x + 1, y + 3, z + 1, B.rope); w.set(x + 1, y + 4, z + 1, b);
      };
      const post = (x, z, y0, y1) => { w.box(x, y0, z, x + 1, y1, z + 1, B.beam); w.box(x, y0, z, x + 1, y0, z + 1, B.beamDk); };

      // ── 바닥: 1층 널마루(테두리는 돌) ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, (x === X0 || x === X1 || z === Z0 || z === Z1) ? B.found : plank(x, z, 1));
      // ── 벽: 북·서는 3층 높이(아치 창과 층 띠), 남·동은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const low = z === Z1 || x === X1, top = low ? G + 6 : TOP, u = x === X0 || x === X1 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = (y <= G + 2 || y === F2 || y === F2 + 1 || y === F3 || y === F3 + 1 || y >= top - 1) ? B.brickDk : brickAt(u, y, x === X0 ? 3 : 5);
          w.set(x, y, z, b);
        }
      }
      // 아치 창(북·서 벽): 층마다 5폭, 위는 홍예, 아래는 돌 창턱, 가운데 창살
      const winAt = (sd, u, y0, h) => {
        for (let r = 0; r < h + 2; r++) for (let c = 0; c < 5; c++) {
          const arch = r >= h && (c === 0 || c === 4) ? null : r >= h + 1 && (c === 1 || c === 3) ? null : true;
          if (!arch) continue;
          sd(u + c, y0 + r, r >= h ? B.skyW : (c === 2 || r === (h * 0.6 | 0)) ? B.beamDk : B.skyW);
        }
        for (let c = -1; c <= 5; c++) sd(u + c, y0 - 1, B.sill);
        for (const [c, r] of [[-1, h - 1], [-1, h], [0, h + 1], [1, h + 2], [2, h + 2], [3, h + 2], [4, h + 1], [5, h], [5, h - 1]]) sd(u + c, y0 + r, B.brickDk);
      };
      const north = (u, y, b) => w.set(u, y, Z0, b), west = (u, y, b) => w.set(X0, y, u, b);
      for (let u = 36; u < X1 - 6; u += 16) { if (u >= 56 && u <= 70) continue; for (const [y0, h] of [[G + 5, 7], [F2 + 4, 7], [F3 + 4, 6]]) winAt(north, u, y0, h); }
      for (let u = 40; u < Z1 - 6; u += 16) for (const [y0, h] of [[G + 5, 7], [F2 + 4, 7], [F3 + 4, 6]]) winAt(west, u, y0, h);
      // 벽 안쪽 버팀 기둥(2×2)과 꼭대기 들보
      for (const z of [46, 62, 78, 94]) if (z < Z1) post(X0 + 1, z, G + 1, TOP - 1);
      for (let z = Z0 + 1; z < Z1; z++) w.set(X0 + 1, TOP - 1, z, B.beam);
      for (let x = X0 + 1; x < X1; x++) w.set(x, TOP - 1, Z0 + 1, B.beam);
      // 지붕 트러스(남북으로 걸친 들보, 북·서 벽에서 시작 — 남쪽은 열어 둔다)
      for (const x of [44, 72, 98]) { for (let z = Z0 + 1; z <= Z0 + 26; z++) w.box(x, TOP - 1, z, x + 1, TOP - 1, z, B.beam); w.line(x, TOP - 2, Z0 + 18, x, TOP - 8, Z0 + 2, B.beamDk); w.line(x + 1, TOP - 2, Z0 + 18, x + 1, TOP - 8, Z0 + 2, B.beamDk); }

      // ── 남쪽 하역문(밖으로): 두 짝 나무문, 쇠띠, 벽돌 문틀과 아치 ──
      const DX0 = 60, DX1 = 67;
      for (let x = DX0 - 2; x <= DX1 + 2; x++) for (let y = G + 1; y <= G + 14; y++) {
        const frame = x <= DX0 - 1 || x >= DX1 + 1 || y >= G + 11;
        w.set(x, y, Z1, frame ? ((x === DX0 - 2 || x === DX1 + 2) && y < G + 11 ? B.found : B.brickDk) : ((y - G) % 4 === 2 ? B.iron : (x === 63 || x === 64 ? B.wood : B.plank)));
      }
      for (let y = G + 1; y <= G + 8; y++) { w.set(63, y, Z1, B.beamDk); w.set(64, y, Z1, B.beamDk); }
      w.set(62, G + 5, Z1 - 1, B.brass); w.set(65, G + 5, Z1 - 1, B.brass);
      w.box(DX0 - 4, G + 15, Z1, DX1 + 4, G + 15, Z1, B.brickDk);
      for (const x of [DX0 - 4, DX1 + 4]) { w.box(x, G + 1, Z1, x, G + 14, Z1, B.brickDk); w.set(x, G + 9, Z1 - 1, B.iron); w.set(x, G + 8, Z1 - 1, B.lantern); w.set(x, G + 7, Z1 - 1, B.iron); }
      lights.push({ name: 'door', p: [DX0 - 3.5, G + 8, Z1 - 1.5], c: '#ffd890', i: 0.5, d: 20, flicker: 0.1 }, { p: [DX1 + 4.5, G + 8, Z1 - 1.5], c: '#ffd890', i: 0.5, d: 20, flicker: 0.1 });
      for (let z = Z1 - 10; z <= Z1 - 1; z++) for (let x = DX0; x <= DX1; x++) w.set(x, G, z, (x + (z >> 1)) & 1 ? B.slab : B.found);
      acts.push(OR.goAct({ at: [63, G + 1, Z1 - 2], name: '밖으로 나가기', goto: 'canal', hint: '하역문을 열고 기중기와 거룻배가 있는 운하 둑길로 나가요', hit: [DX0, G + 1, Z1 - 3, DX1, G + 8, Z1], h: 10 }));

      // ── 2층 저장층: 북쪽 벽을 따라 놓인 중이층(x52~102, z≤45). 3층 다락은 그 위 서쪽(x56~83, z≤41) ──
      const MZ = 45, LZ3 = 41, LX0 = 56, LX1 = 83;
      for (let z = Z0 + 1; z <= MZ; z++) for (let x = 52; x < X1; x++) { w.set(x, F2, z, z >= MZ - 1 ? B.beam : plank(x, z, 2)); w.set(x, F2 - 1, z, z % 6 === 0 || z >= MZ - 1 ? B.beamDk : 0); }
      for (let z = Z0 + 1; z <= LZ3; z++) for (let x = LX0; x <= LX1; x++) { w.set(x, F3, z, z >= LZ3 - 1 || x <= LX0 + 1 ? B.beam : plank(x, z, 3)); if (z % 6 === 0 || z >= LZ3 - 1) w.set(x, F3 - 1, z, B.beamDk); }
      // 중이층 기둥(버팀대 포함), 다락 기둥
      for (const x of [52, 64, 76, 88, 100]) { post(x, MZ - 1, G + 1, F2 - 1); if (x < 100) { w.line(x + 2, F2 - 4, MZ - 1, x + 5, F2 - 1, MZ - 1, B.beamDk); } if (x > 52) w.line(x - 1, F2 - 4, MZ - 1, x - 4, F2 - 1, MZ - 1, B.beamDk); }
      post(52, Z0 + 1, G + 1, F2 - 1);
      for (const x of [LX0, 68, LX1 - 1]) post(x, LZ3 - 1, F2 + 1, F3 - 1);
      // 중이층 난간(계단 머리 x68~77은 비움), 다락 난간(계단 머리 x82~83, z31~36은 비움)
      for (let x = 52; x < X1; x++) if (x < 68 || x > 77) { w.set(x, F2 + 4, MZ, B.wood); if (x % 4 === 0) w.box(x, F2 + 1, MZ, x, F2 + 3, MZ, B.wood); }
      for (let z = Z0 + 1; z <= MZ; z++) { w.set(52, F2 + 4, z, B.wood); if (z % 4 === 0) w.box(52, F2 + 1, z, 52, F2 + 3, z, B.wood); }
      for (let x = LX0; x <= LX1; x++) { w.set(x, F3 + 4, LZ3, B.wood); if (x % 4 === 0) w.box(x, F3 + 1, LZ3, x, F3 + 3, LZ3, B.wood); }
      for (let z = Z0 + 1; z <= LZ3; z++) { w.set(LX0, F3 + 4, z, B.wood); if (z % 4 === 0) w.box(LX0, F3 + 1, z, LX0, F3 + 3, z, B.wood); }
      for (let z = 37; z <= LZ3; z++) { w.set(LX1, F3 + 4, z, B.wood); if (z % 4 === 0) w.box(LX1, F3 + 1, z, LX1, F3 + 3, z, B.wood); }
      // 1층 → 2층 계단: 중이층 앞에서 동쪽으로 오른다(x60 → x75, z46~51). 디딤판 + 옆판 + 손잡이
      for (let i = 0; i < 16; i++) {
        const x = 60 + i;
        for (const z of [MZ + 1, MZ + 6]) w.box(x, G + 1, z, x, G + i, z, B.beamDk);
        if (i > 0) w.box(x, G + i, MZ + 2, x, G + i, MZ + 5, B.wood);
        for (let z = MZ + 1; z <= MZ + 6; z++) w.set(x, G + 1 + i, z, z === MZ + 1 || z === MZ + 6 ? B.beam : B.floorP);
        if (i % 4 === 0) w.box(x, G + 2 + i, MZ + 7, x, G + 4 + i, MZ + 7, B.wood);
        w.set(x, G + 5 + i, MZ + 7, B.wood);
      }
      for (let i = 0; i < 16; i++) for (let z = MZ + 1; z <= MZ + 6; z++) for (let y = G + 2 + i; y <= G + 9 + i; y++) if (w.get(60 + i, y, z) && y > G + 1 + i) w.set(60 + i, y, z, 0);
      // 2층 → 3층 계단: 북쪽 벽을 따라 서쪽으로 오른다(x99 → x84, z31~36), 다락 동쪽 끝 x83으로 이어진다
      for (let i = 0; i < 16; i++) {
        const x = 99 - i;
        for (const z of [Z0 + 1, Z0 + 6]) w.box(x, F2 + 1, z, x, F2 + i, z, B.beamDk);
        if (i > 0) w.box(x, F2 + i, Z0 + 2, x, F2 + i, Z0 + 5, B.wood);
        for (let z = Z0 + 1; z <= Z0 + 6; z++) w.set(x, F2 + 1 + i, z, z === Z0 + 6 ? B.beam : B.floorP);
        if (i % 4 === 1) w.box(x, F2 + 2 + i, Z0 + 7, x, F2 + 4 + i, Z0 + 7, B.wood);
        w.set(x, F2 + 5 + i, Z0 + 7, B.wood);
      }
      for (let z = Z0 + 1; z <= Z0 + 6; z++) for (let y = F3 + 1; y <= F3 + 4; y++) { w.set(LX1, y, z, 0); w.set(LX1 - 1, y, z, 0); }

      // ── 1층 하역장: 상자 더미, 술통, 곡물 자루, 손수레 ──
      crate(w, 86, G + 1, 74, 6, 4, 6); crate(w, 87, G + 5, 75, 4); crate(w, 94, G + 1, 76, 4); crate(w, 86, G + 1, 82, 6, 6, 6); crate(w, 92, G + 1, 82, 4, 4, 6); crate(w, 88, G + 7, 84, 4, 2, 4);
      for (const [x, z, h] of [[40, 80, 6], [45, 80, 6], [40, 85, 6], [45, 85, 7]]) barrel(w, x, G + 1, z, h);
      barrel(w, 42, G + 7, 82, 5);
      for (let k = 0; k < 9; k++) { const x = 48 + (k % 3) * 4, z = 86 + (k / 3 | 0) * 4; sack(x, G + 1, z, k % 3 ? B.sack : B.sackD); if (k % 2) sack(x, G + 5, z, B.sackD); }
      // 손수레: 바퀴 둘, 짐칸, 손잡이
      w.box(78, G + 3, 90, 83, G + 3, 93, B.plank); w.walls(78, G + 4, 90, 83, G + 4, 93, B.wood);
      for (const z of [89, 94]) { for (const [dy, dx] of [[0, 0], [1, 0], [2, 0], [1, -1], [1, 1]]) w.set(80 + dx, G + 1 + dy, z, dy === 1 && dx === 0 ? B.iron : B.wood); }
      w.line(84, G + 4, 91, 86, G + 3, 91, B.wood); w.line(84, G + 4, 92, 86, G + 3, 92, B.wood);
      w.set(79, G + 5, 91, B.apple); w.set(81, G + 5, 92, B.apple); w.set(82, G + 5, 91, B.apple); w.set(80, G + 5, 92, B.crate);
      crate(w, 34, G + 1, 88, 4); crate(w, 34, G + 5, 88, 4, 2, 4); crate(w, 40, G + 1, 91, 6, 4, 4);
      for (let x = 88; x <= 97; x++) for (let z = 90; z <= 93; z++) w.set(x, G + 1, z, (x & 1) ? B.plank : B.wood);
      for (const [x, z] of [[89, 91], [93, 92]]) barrel(w, x + 1, G + 2, z, 6);
      for (let k = 0; k < 16; k++) { const t = k * 0.4; w.set(Math.round(72 + Math.cos(t) * 3), G + 1, Math.round(66 + Math.sin(t) * 3), B.rope); if (k % 2) w.set(Math.round(72 + Math.cos(t) * 2), G + 2, Math.round(66 + Math.sin(t) * 2), B.rope); }
      for (const [x, z] of [[94, 62], [94, 66], [97, 64]]) { sack(x, G + 1, z); }
      // 상자 열기: 하역장 큰 상자 뚜껑(부품)
      const LX = 60, LZ = 76;
      crate(w, LX, G + 1, LZ, 6, 5, 6); w.box(LX + 1, G + 6, LZ + 1, LX + 4, G + 6, LZ + 4, B.straw); w.set(LX + 2, G + 6, LZ + 2, B.apple); w.set(LX + 3, G + 6, LZ + 3, B.apple); w.box(LX, G + 6, LZ, LX + 5, G + 6, LZ, B.crateEdge); w.box(LX, G + 6, LZ + 5, LX + 5, G + 6, LZ + 5, B.crateEdge); w.box(LX, G + 6, LZ, LX, G + 6, LZ + 5, B.crateEdge); w.box(LX + 5, G + 6, LZ, LX + 5, G + 6, LZ + 5, B.crateEdge);
      const lid = w.prop({ name: 'lid', pivot: [LX, G + 7, LZ + 3], axis: 'z' });
      lid.box(LX, G + 7, LZ, LX + 5, G + 7, LZ + 5, B.plank); lid.box(LX, G + 8, LZ + 2, LX + 5, G + 8, LZ + 3, B.crateEdge); lid.box(LX + 1, G + 8, LZ, LX + 1, G + 8, LZ + 5, B.crateEdge); lid.box(LX + 4, G + 8, LZ, LX + 4, G + 8, LZ + 5, B.crateEdge);
      acts.push({
        name: '상자 열기', hint: '거룻배에서 내린 큰 상자의 뚜껑이 들리며 지푸라기와 빨간 사과 향이 튀어 올라요', hit: [LX - 2, G + 1, LZ - 2, LX + 7, G + 8, LZ + 7],
        run: async a => {
          await Promise.all([a.move('lid', [0, 3, 0], 0.6), a.turn('lid', [0, 0, 1.2], 0.6)]);
          a.burst([LX + 3, G + 9, LZ + 3], { n: 30, colors: ['#e0c870', '#f0e0a0', '#d8403a'], speed: 4.8, up: 6, life: 1.4, gravity: 10, spread: 2 });
          await a.wait(1.4);
          await Promise.all([a.move('lid', [0, 0, 0], 0.6), a.turn('lid', [0, 0, 0], 0.6)]);
        },
      });
      // 큰 저울: 돌 받침, 쇠기둥, 저울대(부품), 두 접시와 사슬, 놋쇠 추
      const SX = 52, SZ = 60;
      w.box(SX - 2, G + 1, SZ - 2, SX + 2, G + 2, SZ + 2, B.found); w.box(SX - 1, G + 3, SZ - 1, SX + 1, G + 3, SZ + 1, B.iron);
      w.box(SX, G + 4, SZ, SX, G + 11, SZ, B.iron); w.set(SX, G + 14, SZ, B.brass); w.set(SX, G + 15, SZ, B.brass);
      const beam = w.prop({ name: 'scale', pivot: [SX + 0.5, G + 12.5, SZ + 0.5], axis: 'z' });
      beam.box(SX - 8, G + 12, SZ, SX + 8, G + 12, SZ, B.brass); beam.box(SX - 1, G + 13, SZ, SX + 1, G + 13, SZ, B.brass);
      for (const s of [-1, 1]) {
        const px = SX + s * 8;
        for (let y = G + 7; y <= G + 11; y++) { beam.set(px - 1, y, SZ, B.iron); beam.set(px + 1, y, SZ, B.iron); }
        beam.box(px - 2, G + 6, SZ - 2, px + 2, G + 6, SZ + 2, B.brass); beam.box(px - 1, G + 6, SZ - 1, px + 1, G + 6, SZ + 1, B.iron);
      }
      for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { beam.set(SX - 9 + dx, G + 7, SZ - 1 + dz, B.sack); beam.set(SX - 9 + dx, G + 8, SZ - 1 + dz, dx ? B.sackD : B.sack); }
      beam.box(SX + 7, G + 7, SZ, SX + 8, G + 8, SZ, B.brass);
      acts.push({
        name: '저울 달기', hint: '곡물 자루를 올리자 큰 저울대가 기우뚱 기울었다가 놋쇠 추와 맞춰져요', hit: [SX - 10, G + 1, SZ - 3, SX + 10, G + 14, SZ + 3],
        run: async a => {
          await a.turn('scale', [0, 0, 0.42], 0.8); a.burst([SX - 7.5, G + 6, SZ + 0.5], { n: 16, colors: ['#e8c860', '#d8c8a0'], speed: 2.4, up: 2, life: 1, gravity: 8, spread: 1.2 });
          await a.turn('scale', [0, 0, -0.25], 0.6); await a.turn('scale', [0, 0, 0.12], 0.5); await a.turn('scale', [0, 0, 0], 0.5);
          a.burst([SX + 0.5, G + 16, SZ + 0.5], { n: 12, colors: ['#ffe9a0', '#ffffff'], speed: 2, up: 2.8, life: 1, gravity: -0.6, spread: 0.8 });
        },
      });

      // ── 북서쪽 창고지기 사무실: 나무 칸막이(창과 문), 장부 책상, 서류 선반, 등 ──
      const OX1 = 50, OZ1 = 52;
      for (let x = X0 + 1; x <= OX1; x++) for (let y = G + 1; y <= G + 10; y++) {
        const door = x >= 41 && x <= 46 && y <= G + 9, win = (y >= G + 5 && y <= G + 8) && ((x >= 30 && x <= 36));
        if (door) continue;
        w.set(x, y, OZ1, y === G + 10 || y === G + 1 || x === X0 + 1 || x === OX1 || x === 40 || x === 47 ? B.beam : win ? ((x === 33 || y === G + 7) ? B.beamDk : B.skyW) : ((x & 1) ? B.plank : B.wood));
      }
      for (let z = Z0 + 1; z <= OZ1; z++) for (let y = G + 1; y <= G + 10; y++) {
        const win = (y >= G + 5 && y <= G + 8) && z >= 38 && z <= 46;
        w.set(OX1, y, z, y === G + 10 || y === G + 1 || z === OZ1 ? B.beam : win ? ((z === 42 || y === G + 7) ? B.beamDk : B.skyW) : ((z & 1) ? B.plank : B.wood));
      }
      for (let x = 40; x <= 47; x++) w.set(x, G + 10, OZ1 + 1, B.beamDk);
      for (let z = Z0 + 1; z < OZ1; z++) for (let x = X0 + 1; x < OX1; x++) w.set(x, G, z, ((x >> 1) + (z >> 1)) & 1 ? B.floorD : B.floorP);
      for (let z = Z0 + 6; z <= OZ1 - 6; z++) for (let x = X0 + 8; x <= OX1 - 8; x++) w.set(x, G, z, (x === X0 + 8 || x === OX1 - 8 || z === Z0 + 6 || z === OZ1 - 6) ? B.clothEdge : B.cloth);
      // 책상: 다리 넷, 서랍, 상판, 장부·종이·잉크병·등
      const DKX = 34, DKZ = 38;
      for (const [dx, dz] of [[0, 0], [7, 0], [0, 4], [7, 4]]) w.box(DKX + dx, G + 1, DKZ + dz, DKX + dx, G + 3, DKZ + dz, B.wood);
      w.box(DKX, G + 4, DKZ, DKX + 7, G + 4, DKZ + 4, B.plank); w.box(DKX + 1, G + 3, DKZ, DKX + 6, G + 3, DKZ, B.wood); w.set(DKX + 3, G + 3, DKZ - 1, B.brass);
      w.box(DKX + 1, G + 5, DKZ + 2, DKX + 2, G + 5, DKZ + 3, B.ledger); w.box(DKX + 1, G + 6, DKZ + 2, DKX + 2, G + 6, DKZ + 3, B.ledger2);
      w.box(DKX + 3, G + 5, DKZ + 2, DKX + 4, G + 5, DKZ + 3, B.paper); w.set(DKX + 6, G + 5, DKZ + 1, B.ink); w.set(DKX + 6, G + 6, DKZ + 1, B.wood);
      w.set(DKX, G + 5, DKZ + 4, B.iron); w.set(DKX, G + 6, DKZ + 4, B.lantern); w.set(DKX, G + 7, DKZ + 4, B.iron);
      // 의자
      w.box(DKX + 3, G + 1, DKZ + 7, DKX + 4, G + 1, DKZ + 8, B.wood); w.box(DKX + 3, G + 2, DKZ + 7, DKX + 4, G + 2, DKZ + 8, B.plank); w.box(DKX + 3, G + 3, DKZ + 8, DKX + 4, G + 5, DKZ + 8, B.wood);
      // 서류 선반(북쪽 벽): 선반 판 사이에 장부와 종이 묶음
      for (let x = X0 + 4; x <= OX1 - 4; x++) for (let y = G + 1; y <= G + 13; y++) for (const z of [Z0 + 1, Z0 + 2]) {
        const shelf = (y - G - 1) % 4 === 0;
        if (z === Z0 + 2 && !shelf) { const h = hash3(x, y, 3); if (h > 0.55) w.set(x, y, z, h > 0.8 ? B.ledger : h > 0.68 ? B.ledger2 : B.paper); continue; }
        w.set(x, y, z, shelf || x === X0 + 4 || x === OX1 - 4 ? B.wood : (hash3(x, y, 9) > 0.5 ? B.paper : hash3(x, y, 7) > 0.5 ? B.ledger : B.ledger2));
      }
      const stamp = w.prop({ name: 'stamp', pivot: [DKX + 5.5, G + 5, DKZ + 2.5] });
      stamp.box(DKX + 5, G + 6, DKZ + 2, DKX + 5, G + 6, DKZ + 3, B.stampR); stamp.box(DKX + 5, G + 7, DKZ + 2, DKX + 5, G + 7, DKZ + 3, B.brass); stamp.box(DKX + 5, G + 8, DKZ + 2, DKX + 5, G + 10, DKZ + 2, B.wood); stamp.set(DKX + 5, G + 11, DKZ + 2, B.beamDk);
      lights.push({ name: 'office', p: [DKX + 0.5, G + 7, DKZ + 4.5], c: '#ffd890', i: 0.7, d: 20, flicker: 0.12 });
      acts.push({
        name: '장부 도장', hint: '창고지기 책상에서 붉은 도장이 쾅 찍히고 장부 종이가 팔랑여요', hit: [DKX - 1, G + 1, DKZ - 1, DKX + 8, G + 10, DKZ + 6],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.move('stamp', [0, 4, 0], 0.35); await a.move('stamp', [0, -1, 0], 0.15);
            a.burst([DKX + 5.5, G + 6, DKZ + 2.5], { n: 14, colors: ['#c02a2a', '#f4ecd8', '#ffffff'], speed: 4, up: 2.8, life: 0.8, gravity: 6, spread: 0.8 });
            a.flash('office', 1.6, 0.3); await a.wait(0.2);
          }
          await a.move('stamp', [0, 0, 0], 0.4);
          a.burst([DKX + 3.5, G + 7, DKZ + 2.5], { n: 12, colors: ['#f4ecd8', '#ffffff'], speed: 3.2, up: 4, life: 1.6, gravity: 1.2, spread: 2, flat: true });
        },
      });
      landmarks.push({ name: '창고지기 사무실', note: '장부와 붉은 도장', p: [39, G + 20, 41] });

      // ── 2층: 곡물 자루 더미와 술통 줄(중이층) ──
      for (let k = 0; k < 7; k++) { const x = 54 + k * 4; sack(x, F2 + 1, Z0 + 1, k % 3 ? B.sack : B.sackD); sack(x, F2 + 1, Z0 + 4, B.sack); if (k % 2 === 0) sack(x, F2 + 5, Z0 + 2, B.sackD); }
      for (let x = 58; x <= 98; x += 6) if (x < 66 || x > 80) { barrel(w, x, F2 + 1, MZ - 4, 6); if (x % 12 === 10) barrel(w, x, F2 + 7, MZ - 4, 5); }
      for (let x = 101; x <= 102; x++) for (let z = Z0 + 9; z <= Z0 + 12; z++) w.box(x, F2 + 1, z, x, F2 + 1 + ((x + z) & 1), z, B.grain);
      // 중이층 아래: 술통과 곡물 자루 저장
      for (let x = 56; x <= 98; x += 5) { if ((x / 5 | 0) % 3 === 0) sack(x - 1, G + 1, Z0 + 1, B.sackD); else barrel(w, x, G + 1, Z0 + 3, 6 + (x % 2)); }
      // ── 3층 다락: 도르래 들보, 밧줄 사리, 비둘기 횃대 ──
      const HX = 84, HZ = 50;
      for (let z = Z0 + 1; z <= HZ + 1; z++) w.box(HX, TOP - 4, z, HX + 1, TOP - 3, z, B.beam);
      w.line(HX, TOP - 5, HZ - 6, HX, TOP - 2, Z0 + 1, B.beamDk);
      w.box(HX - 1, TOP - 6, HZ, HX + 2, TOP - 5, HZ, B.iron); w.set(HX - 1, TOP - 7, HZ, B.wood); w.set(HX + 2, TOP - 7, HZ, B.wood);
      const hTop = G + 9, hLen = TOP - 7 - hTop;
      MH.rope(w, 'hrope', HX, TOP - 7, HZ, hLen, B.rope);
      const hload = w.prop({ name: 'hload', pivot: [HX + 0.5, G + 1, HZ + 0.5] });
      crate(hload, HX - 2, G + 1, HZ - 2, 6, 6, 6); hload.box(HX - 2, G + 7, HZ, HX + 3, G + 7, HZ, B.rope); hload.box(HX, G + 7, HZ - 2, HX, G + 7, HZ + 3, B.rope); hload.set(HX, G + 8, HZ, B.iron);
      acts.push({
        name: '도르래로 짐 올리기', hint: '다락 들보의 도르래가 삐걱 돌며 하역장의 짐 상자가 2층 중이층 높이까지 올라가요', hit: [HX - 3, G + 1, HZ - 3, HX + 4, G + 9, HZ + 4],
        run: async a => {
          const up = F2 - G + 1;
          await Promise.all([a.move('hload', [0, up, 0], 3, t => t), a.rope('hrope', hLen, hLen - up, 3, t => t)]);
          a.burst([HX + 0.5, TOP - 6, HZ + 0.5], { n: 12, colors: ['#d8c8a0', '#c8b898'], speed: 2, up: 1, life: 1.4, gravity: 4, spread: 1.2 });
          await a.wait(1);
          await Promise.all([a.move('hload', [0, 0, 0], 2.6, t => t), a.rope('hrope', hLen, hLen, 2.6, t => t)]);
        },
      });
      landmarks.push({ name: '도르래 들보', note: '다락에서 짐을 올리는 들보', p: [HX + 1, TOP + 8, 41] });
      // 다락 짐: 상자와 밧줄 사리
      crate(w, 70, F3 + 1, 33, 5, 4, 5); crate(w, 77, F3 + 1, 31, 4); crate(w, 71, F3 + 5, 34, 3);
      for (let k = 0; k < 14; k++) { const t = k * 0.45; w.set(Math.round(62 + Math.cos(t) * 2.4), F3 + 1, Math.round(37 + Math.sin(t) * 2.4), B.rope); if (k % 2) w.set(Math.round(62 + Math.cos(t) * 1.4), F3 + 2, Math.round(37 + Math.sin(t) * 1.4), B.rope); }
      // 뒤편 하역문(다락 북쪽 벽, 부품 두 짝) — 열면 바깥 하늘이 보인다
      const BX0 = 60, BX1 = 67;
      for (let x = BX0; x <= BX1; x++) for (let y = F3 + 1; y <= F3 + 9; y++) w.set(x, y, Z0, 0);
      for (let x = BX0 - 1; x <= BX1 + 1; x++) w.set(x, F3 + 10, Z0, B.brickDk);
      for (let y = F3 + 1; y <= F3 + 9; y++) { w.set(BX0 - 1, y, Z0, B.brickDk); w.set(BX1 + 1, y, Z0, B.brickDk); }
      for (let x = BX0; x <= BX1; x++) for (let y = F3 + 1; y <= F3 + 9; y++) w.set(x, y, Z0 + 1, 0);
      const bL = w.prop({ name: 'bdoorL', pivot: [BX0, F3 + 1, Z0 + 1] }), bR = w.prop({ name: 'bdoorR', pivot: [BX1 + 1, F3 + 1, Z0 + 1] });
      for (let y = F3 + 1; y <= F3 + 9; y++) for (let x = BX0; x <= BX1; x++) {
        const P = x <= BX0 + 3 ? bL : bR, edge = x === BX0 + 3 || x === BX0 + 4 || y === F3 + 1 || y === F3 + 9;
        P.set(x, y, Z0 + 1, edge ? B.beamDk : (y - F3) % 4 === 0 ? B.iron : B.door);
      }
      bL.set(BX0 + 3, F3 + 5, Z0 + 2, B.iron); bR.set(BX0 + 4, F3 + 5, Z0 + 2, B.iron);
      w.set(BX1 + 3, F3 + 8, Z0 + 1, B.iron); w.set(BX1 + 3, F3 + 7, Z0 + 1, B.lantern); w.set(BX1 + 3, F3 + 6, Z0 + 1, B.iron);
      lights.push({ name: 'backdoor', p: [BX1 + 3.5, F3 + 7, Z0 + 2], c: '#fff4dc', i: 0.6, d: 40, flicker: 0.02, srcR: 6 });
      acts.push({
        name: '뒤편 하역문 열기', hint: '다락 북쪽 하역문이 활짝 열리며 운하 바람과 햇빛이 다락에 쏟아져요', hit: [BX0 - 1, F3 + 1, Z0 + 1, BX1 + 1, F3 + 10, Z0 + 5],
        run: async a => {
          await Promise.all([a.turn('bdoorL', [0, 1.4, 0], 1), a.turn('bdoorR', [0, -1.4, 0], 1)]);
          a.flash('backdoor', 3, 3); a.wind(1.6, 2.4);
          for (let k = 0; k < 8; k++) { a.burst([64, F3 + 6 + k * 0.8, Z0 + 4 + k * 3], { n: 14, colors: ['#fff4d0', '#e8dcc0', '#ffffff'], speed: 3.2, up: 0.8, life: 1.6, gravity: 0.4, spread: 2.4 }); await a.wait(0.25); }
          await a.wait(1.2);
          await Promise.all([a.turn('bdoorL', [0, 0, 0], 1), a.turn('bdoorR', [0, 0, 0], 1)]);
        },
      });
      // 비둘기 횃대(북쪽 벽 들보 위): 횃대 들보, 지푸라기 둥지, 비둘기(머리 남쪽)
      for (const x of [32, 40, 48]) {
        w.box(x, TOP - 4, Z0 + 1, x + 1, TOP - 4, Z0 + 5, B.beam);
        w.box(x + 2, TOP - 4, Z0 + 1, x + 3, TOP - 4, Z0 + 2, B.straw); w.set(x + 2, TOP - 3, Z0 + 1, B.straw);
        w.box(x, TOP - 3, Z0 + 2, x + 1, TOP - 3, Z0 + 4, B.pigeon); w.set(x, TOP - 2, Z0 + 4, B.pigeonNeck); w.set(x + 1, TOP - 2, Z0 + 4, B.pigeonNeck);
        w.set(x, TOP - 1, Z0 + 4, B.pigeon); w.set(x + 1, TOP - 1, Z0 + 4, B.pigeon); w.set(x, TOP - 1, Z0 + 5, B.pigeonDk);
        w.set(x, TOP - 3, Z0 + 1, B.pigeonDk); w.set(x + 1, TOP - 3, Z0 + 1, B.pigeonDk);
      }
      acts.push({
        name: '비둘기 날리기', hint: '들보 위 비둘기들이 푸드덕 날아올라 창고 위를 한 바퀴 돌아요', hit: [30, TOP - 8, Z0 + 1, 50, TOP, Z0 + 6],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            const t = k / 8 * Math.PI * 2;
            a.burst([60 + Math.cos(t) * 20, TOP - 2 - k * 0.6, 56 + Math.sin(t) * 16], { n: 12, colors: ['#a8a8b0', '#e8e8f0', '#6a6a78'], speed: 8, up: 4, life: 1.2, gravity: 1.2, spread: 2 });
            await a.wait(0.25);
          }
          a.burst([48, TOP + 4, 48], { n: 18, colors: ['#e8e8f0', '#ffffff'], speed: 4, up: 2, life: 2.2, gravity: 1, spread: 6, flat: true });
        },
      });
      // ── 등: 기둥에 걸린 등과 하역장 조명 ──
      for (const [x, y, z] of [[X0 + 3, G + 10, 64], [54, F2 - 4, MZ + 1], [88, F2 - 4, MZ + 1], [68, F3 - 4, LZ3 + 1]]) { w.set(x, y + 2, z, B.iron); w.set(x, y + 1, z, B.lantern); w.set(x, y, z, B.lantern); w.set(x, y - 1, z, B.iron); }
      lights.push({ name: 'hall', p: [54.5, F2 - 4, MZ + 2], c: '#ffd890', i: 0.7, d: 44, flicker: 0.1 });
      lights.push({ name: 'loft', p: [68.5, F3 - 4, LZ3 + 2], c: '#ffd890', i: 0.5, d: 28, flicker: 0.1 });
      return { lights, landmarks, acts };
    },
  }));
})();
