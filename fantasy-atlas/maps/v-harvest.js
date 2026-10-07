// 황금들녘 — 구릉의 조각보 밭, 언덕 위 수확제 광장, 연못가 물레방앗간과 벌통 언덕 (336칸, 2배 해상도 · 1칸 ≈ 25cm)
// 늘어난 해상도로 세부를 그린다: 줄줄이 선 밀 이랑과 이삭, 골이 진 호박과 덩굴, 둥근 건초 더미, 줄무늬 천막과 물결 술,
// 원뿔로 쌓은 모닥불 장작과 돌 화덕, 나선 띠를 두른 메이폴, 낱돌 기초·창살·덧문·꽃상자·겹 기와가 있는 집,
// 판자와 덧대기 살·흰 테·X 가새 문·건초 후드가 있는 이중 경사(맞배 꺾임) 붉은 헛간, 바퀴살·물받이판이 있는 물레방아,
// 가지와 잎뭉치가 있는 단풍나무·사과나무, 늘어진 버드나무, 층층 벌통, 깃털 오리 가족 등.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  MAPS.push({
    id: 'harvest', cat: 'village', name: '황금들녘', en: 'Harvest Hollow', color: '#e0a040', seed: 151, base: 44, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '가을걷이가 끝나면 사흘 밤낮 축제가 열리는 농촌 마을. 모닥불 주위로 온 마을이 춤을 춘다. 서쪽 연못가에는 물레방앗간이 햇밀을 빻고, 그 곁 벌통 언덕에서는 가을 꿀을 거둔다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '농부 가족 30여 호'], ['특산물', '호박 파이 · 사과주 · 메밀꿀'], ['명소', '수확제 광장 · 물레방앗간 · 벌통 언덕'], ['소문', '축제 마지막 밤에는 허수아비가 춤을 춘다']] },
    sky: ['#fbd29a', '#6a4a7c', '#ffe4a8'], stars: false,
    hemi: ['#ffe8c8', '#5a3a20', 0.56], sun: ['#ffd0a0', 0.78, [0.6, 0.8, 0.45]],
    liquid: ['#3a5a4a', '#5a8a6a', '#f0f0d0'], liqSpeed: 0.6,
    fog: { start: 0.8, floor: 24, depth: 20, haze: [56, 0.16, 12], hazeColor: '#f0c890' },
    camY: -12, zoom: 1.05,
    particles: [
      { n: 320, colors: ['#e07a2a', '#c84a2a', '#f0b83a'], mode: 'fall', speed: 0.6, wind: 1.6, y0: 44, y1: 148, glow: false },
      { n: 80, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], mode: 'rise', speed: 2.6, area: [168, 158, 6], y0: 76, y1: 132 },
    ],
    blocks: {
      grass: { c: '#7a7840', top: '#9aa04a', v: 0.08 }, grass2: { c: '#88803e', top: '#b0a048', v: 0.08 }, grass3: { c: '#6e7238', top: '#8a9a44', v: 0.08 },
      sand: { c: '#a08a68', top: '#c8b48a', v: 0.1 }, mud: { c: '#54402c', top: '#6e5a40', v: 0.1 }, gravel: { c: '#6a6258', top: '#8a8274', v: 0.14 }, weedBed: { c: '#3e4a2c', top: '#4c5e34', v: 0.12 },
      pathDk: { c: '#6a4a30', top: '#a88a60', v: 0.1 }, grassWorn: { c: '#7a7040', top: '#b4a868', v: 0.1 },
      dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#7a7068', v: 0.06, pat: 'stone' }, rockDk: { c: '#5e564e', v: 0.06, pat: 'stone' },
      path: { c: '#6a4a30', top: '#c8a878', v: 0.1 }, pathE: { c: '#6a4a30', top: '#b0905e', v: 0.1 },
      soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, soilDk: { c: '#4a2e1c', top: '#553420', v: 0.08 },
      wheat: { c: '#d0ae44', v: 0.08 }, wheatTop: { c: '#ecc860', v: 0.08 }, stubble: { c: '#c8a860', v: 0.08 },
      cobble: { c: '#8a8070', top: '#a89a88', v: 0.06 }, cobble2: { c: '#7e7466', top: '#9a8e7e', v: 0.06 }, cobble3: { c: '#968a7a', top: '#b4a896', v: 0.06 }, cobbleJ: { c: '#6a6258', top: '#78705e', v: 0.04 },
      st1: { c: '#8e8478', v: 0.05 }, st2: { c: '#7c746a', v: 0.05 }, st3: { c: '#9c9284', v: 0.05 }, st4: { c: '#888070', v: 0.05 },
      mortar: { c: '#a49a88', v: 0.04 }, sill: { c: '#b0a698', v: 0.04 }, found: { c: '#8a8070', v: 0.05, pat: 'stone' },
      plaster: { c: '#f0e0c0', v: 0.03 }, plaster2: { c: '#ead6b4', v: 0.03 }, frame: { c: '#6a4428', v: 0.05 }, frameDk: { c: '#4e3020', v: 0.04 }, mullion: { c: '#ece4d0', v: 0.02 },
      tile: { c: '#c8702a', v: 0.05 }, tile2: { c: '#a85a20', v: 0.04 }, tile3: { c: '#d8823a', v: 0.05 }, tileDk: { c: '#7a4018', v: 0.04 },
      tileB: { c: '#8a4a2a', v: 0.05 }, tileB2: { c: '#703a20', v: 0.04 }, tileB3: { c: '#9a5634', v: 0.05 }, tileBDk: { c: '#5a3018', v: 0.04 },
      thatch: { c: '#c8a050', v: 0.07 }, thatch2: { c: '#b8903e', v: 0.07 }, thatch3: { c: '#d6b264', v: 0.07 }, thatchDk: { c: '#9a7a3a', v: 0.06 },
      door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, doorDk: { c: '#36200f', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 },
      shutter: { c: '#6a8a3a', v: 0.02 }, shutterDk: { c: '#56742c', v: 0.02 }, shutter2: { c: '#8a3a2a', v: 0.02 }, shutter2Dk: { c: '#702c1e', v: 0.02 },
      hinge: { c: '#2e2e34', v: 0.02 }, iron: { c: '#4a4a52', v: 0.03 }, ironDk: { c: '#33333a', v: 0.03 }, gutter: { c: '#6a6e72', v: 0.03 },
      brick: { c: '#9a4a3a', v: 0.05, pat: 'brick' }, brick2: { c: '#84402f', v: 0.05, pat: 'brick' }, pot: { c: '#b8643a', v: 0.04 },
      win: { c: '#ffd890', night: true, day: '#a8c8d0' },
      pumpkin: { c: '#e8801a', v: 0.05 }, pumpkin2: { c: '#cc6a12', v: 0.05 }, stem: { c: '#4a7a2a', v: 0.05 }, vine: { c: '#5a7a30', v: 0.06 },
      bark: { c: '#5a3a24', v: 0.06 }, barkDk: { c: '#463020', v: 0.05 },
      leafO: { c: '#e08a2a', v: 0.09 }, leafR: { c: '#c04a2a', v: 0.09 }, leafY: { c: '#e8b83a', v: 0.09 }, leafG: { c: '#7a8a3a', v: 0.09 }, leafLt: { c: '#f4d060', v: 0.06 },
      apple: { c: '#c8302a', v: 0.04 },
      hay: { c: '#dcb456', v: 0.06 }, hay2: { c: '#c8a044', v: 0.06 }, log: { c: '#5a3a24', v: 0.05 }, logEnd: { c: '#b08a5a', v: 0.04 },
      wood: { c: '#6a4428', v: 0.05 }, plank: { c: '#9a6a40', v: 0.05 }, cart: { c: '#8a6a40', v: 0.06 },
      hedge: { c: '#5a7a30', v: 0.08 }, hedge2: { c: '#6a8a38', v: 0.08 },
      tentR: { c: '#c83a3a', v: 0.02 }, tentW: { c: '#f4ecd8', v: 0.02 }, tentY: { c: '#e8c040', v: 0.02 }, tentB: { c: '#3a6ab0', v: 0.02 },
      rope: { c: '#8a6a4a', v: 0.04 }, rib1: { c: '#d84a4a', v: 0.02 }, rib2: { c: '#4a7ad8', v: 0.02 }, rib3: { c: '#e8d040', v: 0.02 }, rib4: { c: '#4aa84a', v: 0.02 },
      shirt: { c: '#6a8ac0', v: 0.03 }, shirtDk: { c: '#4a6aa0', v: 0.03 }, straw: { c: '#e0c070', v: 0.05 }, eye: { c: '#2a1a10', v: 0 },
      reed: { c: '#8a8a4a', v: 0.08 }, reed2: { c: '#9a9a52', v: 0.08 }, reedTop: { c: '#7a5a32', v: 0.05 },
      pie: { c: '#c8843a', v: 0.04 }, pieTop: { c: '#e0a858', v: 0.04 }, cloth: { c: '#f4ecd8', v: 0.02 }, clothR: { c: '#c84a3a', v: 0.02 },
      crate: { c: '#9a7448', v: 0.05 }, crateEdge: { c: '#6a4e2e', v: 0.04 }, sack: { c: '#d8c8a0', v: 0.04 }, sack2: { c: '#c8b48a', v: 0.04 },
      millS: { c: '#9a9088', v: 0.05 }, millstone: { c: '#a8a096', v: 0.05 }, flour: { c: '#f8f4ea', v: 0.02 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      hive: { c: '#e8c060', v: 0.04 }, hiveDk: { c: '#c8a048', v: 0.04 }, hiveR: { c: '#8a5a2a', v: 0.04 }, hole: { c: '#2a2018', v: 0.02 }, honey: { c: '#ffb020', glow: true },
      duck: { c: '#f4f0e4', v: 0.02 }, duck2: { c: '#e2dccc', v: 0.02 }, duckG: { c: '#2a7a4a', v: 0.03 }, duckB: { c: '#8a6a4a', v: 0.03 }, beak: { c: '#f0a020', v: 0.02 },
      lily: { c: '#4a8a3a', v: 0.05 }, lilyF: { c: '#f0a8c8', v: 0.03 },
      fire: { c: '#ff9a3a', glow: true }, fire2: { c: '#ffd060', glow: true }, ember: { c: '#3a2018', v: 0.05 },
      lampY: { c: '#ffe08a', night: true, day: '#e8c860' }, lampR: { c: '#ff7a5a', night: true, day: '#d86a50' }, lamp: { c: '#ffe6a8', night: true, day: '#e8e0c0' },
      barnR: { c: '#a83a2a', v: 0.03 }, barnR2: { c: '#8e2e20', v: 0.03 }, trim: { c: '#efe8d8', v: 0.02 },
      flower: { c: '#e86a8a', v: 0.04 }, flower2: { c: '#f0e060', v: 0.04 }, flower3: { c: '#ffffff', v: 0.03 }, flower4: { c: '#f08a4a', v: 0.04 }, flower5: { c: '#9a7ae0', v: 0.04 },
      flowerStem: { c: '#4a7a34', v: 0.06 }, flowerLf: { c: '#5e8e44', v: 0.06 }, tuft: { c: '#a8a050', v: 0.08 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, SX = 168, SZ = 158, PX = 62, PZ = 256;
      const MX0 = 68, MZ0 = 190, MSX = 20, MSZ = 18, CHX = 96;           // 물레방앗간과 물길
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const ox = x / 2, oz = z / 2;
          return base + 2 * (2 + n.fbm(ox * 0.0213, oz * 0.0213, 4) * 13 + Math.max(0, 8 - MH.dist(ox, oz, 84, 79) * 0.137) - Math.max(0, 6 - MH.dist(ox, oz, 31, 128) * 0.274));
        },
        surface: (x, z, y, s) => s >= 6 ? B.rock : (() => { const f = n.fbm(x * 0.035 + 3, z * 0.035, 2); return f > 0.6 ? B.grass2 : f < 0.4 ? B.grass3 : B.grass; })(),
        under: (x, z, y, dep, s) => dep < 5 && s < 6 ? B.dirt : B.rock,
      });
      const lvl = MH.g(w, PX, PZ) + 8;
      const dr = [[84, 242], [70, 250], [58, 260], [56, 270]];               // 오리 길
      // 연못: 완벽한 원 대신 들쭉날쭉한 물가, 가장자리에서 서서히 깊어지는 바닥(모래·진흙·수초 무리),
      // 물 밖은 모래·자갈·진흙 기슭에서 풀밭으로 완만하게 이어진다(물이 벽처럼 서지 않게 낮은 곳은 둑을 돋운다)
      const pondE = (x, z) => {
        const d = MH.dist(x, z, PX, PZ), de = d * (1 + (n.fbm(x * 0.045 + 61, z * 0.045 + 7, 2) - 0.5) * 0.55) + (hash3(x >> 2, 31, z >> 2) - 0.5) * 1.2;
        let e = 31 - de;
        if (MH.polyDist(x, z, dr) < 8) e = Math.max(e, 4);
        if (MH.dist(x, z, 93, 230) < 9) e = Math.max(e, 2);
        return e;
      };
      for (let z = PZ - 56; z <= PZ + 56; z++) for (let x = PX - 56; x <= PX + 56; x++) {
        const gg = MH.g(w, x, z); if (gg < 0) continue;
        const e = pondE(x, z), nb = n.fbm(x * 0.08 + 9, z * 0.08 + 33, 2);
        if (e > 0) {
          const dep = Math.max(1, Math.min(9, Math.round(1 + e * 0.42 + (nb - 0.5) * 2.5)));
          MH.setH(w, x, z, lvl - dep, dep <= 2 ? (nb > 0.56 ? B.gravel : B.sand) : nb > 0.6 ? B.weedBed : nb > 0.42 ? B.mud : nb > 0.3 ? B.sand : B.gravel, B.dirt);
        } else if (-e < 18) {
          const o = -e, t = lvl + 1 + Math.floor(o * (0.4 + nb * 0.3) + (nb - 0.5) * 1.2);
          const top = o < 1.5 + nb * 2.5 ? (nb > 0.55 ? B.gravel : B.sand) : o < 3 + nb * 2 ? B.mud : null;
          let h = gg;
          if (gg > t && o < 9) h = Math.max(lvl + 1, t);
          else if (gg <= lvl) h = Math.max(lvl + 1, Math.min(t, lvl + 2));
          if (h !== gg || top) MH.setH(w, x, z, h, top || w.get(x, gg, z), B.dirt);
        }
      }
      MH.water(w, lvl, (x, z) => MH.dist(x, z, PX, PZ) < 56 && pondE(x, z) > 0);
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const lights = [], acts = [], landmarks = [], keep = [];   // keep: 나무를 심지 않을 사각 영역
      const roads = [[[SX, SZ], [124, 208], [112, 280], [88, 336]], [[SX, SZ], [246, 132], [336, 110]], [[SX, SZ], [178, 74], [158, 0]], [[SX, SZ], [220, 246], [246, 336]]];
      const nearRoad = (x, z) => roads.some(r => MH.polyDist(x, z, r) < 8.4);
      const nearMill = (x, z) => x > 44 && x < 160 && z > 168 && z < 252;

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
      const soft = guard(w);   // 이미 있는 블록은 덮지 않는 월드
      const clump = (T, cx, cy, cz, r, L, fruit) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.95 && d > 0.45) b = B.leafLt;
          if (fruit && d > 0.5 && hh < 0.05) b = fruit;
          T.set(x, y, z, b);
        }
      };
      // 나무: 밑동이 넓어지는 줄기와 뿌리, 굵기가 줄어드는 가지, 가지 끝마다 잎뭉치
      const tree = (x, y, z, o, Lt) => {
        Lt = Lt || soft;
        const h = o.h, R0 = o.trunkR || 1.8, bark = o.bark || B.bark, dk = o.barkDk || B.barkDk, L = o.leaves || [B.leafY, B.leafO, B.leafR];
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.55 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, streak ? dk : bark);
          }
        }
        for (let k = 0; k < 5; k++) {
          const a = k * 1.2566 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2.5;
          w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, dk, t => t < 0.5 ? 1 : 0.6);
        }
        const nB = o.branches || 5, r = o.r || 7, ends = [[x, y + h + 1, z, 1.15]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * w.r(0.45, 0.7);
          w.line(x, sy, z, ex, ey, ez, bark, t => t < 0.45 ? 1 : 0.6);
          const a2 = a + w.r(0.5, 1) * (i % 2 ? 1 : -1), mx = x + Math.cos(a) * l * 0.55, mz = z + Math.sin(a) * l * 0.55, my = sy + l * 0.3;
          w.line(mx, my, mz, mx + Math.cos(a2) * 3.5, my + 2.5, mz + Math.sin(a2) * 3.5, bark);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(Lt, ex, ey + 1, ez, rc, L, o.fruit);
          for (let q = 0; q < (o.lobes || 3); q++) {
            const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75;
            clump(Lt, ex + Math.cos(a) * dd, ey + 1 + (q - 1) * rc * 0.3, ez + Math.sin(a) * dd, rc * 0.62, L, o.fruit);
          }
        });
        return { top: y + h + r * 0.8, ends };
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
      const crate = (T, x, y, z, s) => {
        s = s || 4;
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
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
            else if ((r === 1 || r === ht - 2) && outer) b = B.iron;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            T.set(x + dx, y + r, z + dz, b);
          }
        }
      };
      // 골이 진 호박: 아래 y, 반지름 r, 꼭지
      const pumpkinAt = (T, x, y, z, r) => {
        const ry = r * 0.72, R = Math.ceil(r), top = Math.round(ry * 2), cy = y + ry;
        for (let dy = 0; dy <= top; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          if ((dx * dx + dz * dz) / (r * r) + ((y + dy - cy) ** 2) / (ry * ry) > 1.08) continue;
          T.set(x + dx, y + dy, z + dz, (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 4)) & 1) ? B.pumpkin : B.pumpkin2);
        }
        T.set(x, y + top + 1, z, B.stem); if (r >= 2.4) T.set(x + 1, y + top + 2, z, B.stem);
      };
      // 통나무 더미: 2×2 단면 통나무를 층층이, 마구리는 밝은 나이테
      const logPile = (x, y, z, alongX, len, rows) => {
        for (let r = 0; r < rows; r++) for (let q = 0; q < rows - r; q++) {
          const off = q * 2 + r;
          for (let s = 0; s < len; s++) for (let a = 0; a < 2; a++) for (let b2 = 0; b2 < 2; b2++) {
            const end = s === 0 || s === len - 1;
            const [px, pz] = alongX ? [x + s, z + off + a] : [x + off + a, z + s];
            w.set(px, y + r * 2 + b2, pz, end ? B.logEnd : B.log);
          }
        }
      };
      const lampPost = (x, z, h) => {
        h = h || 10;
        const y = g(x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.sill); w.box(x - 1, y - 2, z - 1, x + 1, y - 1, z + 1, B.sill);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.ironDk); w.set(x, ly + 7, z, B.brass);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const flowerAt = (T, x, y, z, head, tall) => {
        T.set(x, y, z, B.flowerStem);
        if (tall) { T.set(x, y + 1, z, B.flowerStem); T.set(x, y + 2, z, head); }
        else T.set(x, y + 1, z, head);
      };
      const FLW = [B.flower, B.flower2, B.flower3, B.flower4, B.flower5];
      // 울타리: 6칸마다 말뚝(뾰족 머리), 가로대 두 줄
      const fence = pts => {
        for (let i = 0; i < pts.length - 1; i++) {
          const [ax, az] = pts[i], [bx, bz] = pts[i + 1], nn = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
          for (let s = 0; s <= nn; s++) {
            const x = Math.round(ax + (bx - ax) * s / nn), z = Math.round(az + (bz - az) * s / nn), gg = MH.g(w, x, z);
            if (gg < 0) continue;
            if (s % 6 === 0) { w.box(x, gg + 1, z, x, gg + 6, z, B.wood); w.set(x, gg + 7, z, B.frameDk); }
            else { w.set(x, gg + 3, z, B.plank); w.set(x, gg + 5, z, B.plank); }
          }
        }
      };

      // ───────── 집(v-millbrook-hd의 집 짓기) ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
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
            if ((c & 1) === 0 || hh > 0.8) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7 + (hh * 3 | 0)) % (o.box === 2 ? 3 : 5)]);
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
        if (o.planters) for (const c0 of [-6, 8]) {
          for (let c = 0; c < 3; c++) for (const d of [2, 3]) {
            const p = sd.at(u0 + c0 + c, d), gg = MH.g(w, p[0], p[1]);
            if (w.get(p[0], gg + 1, p[1]) || w.get(p[0], yb - 2, p[1])) continue;
            const pt = Math.min(yb - 2, gg + 2);
            for (let y = gg + 1; y <= pt; y++) w.set(p[0], y, p[1], y === pt ? B.soil : B.plank);
            const hh = hash3(p[0], yb, p[1]);
            w.set(p[0], pt + 1, p[1], B.flowerLf);
            if (hh > 0.3) w.set(p[0], pt + 2, p[1], FLW[(hh * 17 | 0) % 5]);
          }
        }
        const p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp };
      };
      const PAL = { o: [B.tile, B.tile2, B.tile3, B.tileDk], b: [B.tileB, B.tileB2, B.tileB3, B.tileBDk] };
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, th = o.mat === 'thatch', P4 = o.pal || PAL.o;
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            let b;
            if (th) {
              const hh = hash3(l, s, 11);
              b = s === 0 ? B.thatchDk : (((l + (s >> 1) * 3) % 7 === 0) ? B.thatch2 : hh > 0.78 ? B.thatch3 : hh < 0.2 ? B.thatch2 : B.thatch);
            } else {
              const seam = ((l + (s & 1) * 2) & 3) === 0;
              b = s === 0 ? P4[3] : seam ? P4[1] : (hash3(l >> 2, s, 5) > 0.72 ? P4[2] : P4[0]);
            }
            P(a, l, ry, b); P(a, l, ry - 1, th ? B.thatch2 : P4[3]);
            if (th && (s === 0 || l === l0 || l === l1)) P(a, l, ry - 2, B.thatchDk);
            if (s === sMax) { P(a, l, ry + 1, th ? B.thatchDk : P4[3]); if (th && l % 6 === 0) P(a, l, ry + 2, B.frame); }
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (!th && s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        const mid = (A0 + A1) / 2, midA = Math.floor(mid);
        for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
          for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
          for (let a = A0 + 1; a <= A1 - 1; a++) {
            const s = Math.min(a - a0, a1 - a), ry = y0 + s;
            if (ry - 2 > top) P(a, out, ry - 2, B.frame);
          }
          const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35));
          const odd = (A1 - A0) % 2 === 0;
          for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy + r, 0); }
          for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
          for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, B.frame); P(midA + (odd ? 2 : 3), out, gy + r, B.frame); }
        }
        if (o.gutter) for (const [ae, ain, sg2] of [[a0 - 1, a0, -1], [a1 + 1, a1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const l = g0 + 1;
          P(ae, l, y0 - 2, B.gutter);
          for (let k = 0; k < ov; k++) P(ain + k * -sg2, l, y0 - 3 - k, B.gutter);
          const aw = sg2 < 0 ? A0 - 1 : A1 + 1;
          for (let y = y0 - 3 - ov; y >= o.foot; y--) P(aw, l, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, hash3(cx + dx, y, cz + dz) > 0.75 ? B.brick2 : B.brick);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(cx + dx, y, cz + dz, B.brick2);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.sill);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) { w.box(px, yt + 1, pz, px, yt + 2, pz, B.pot); }
        return [cx + 2, yt + 3, cz + 2];
      };
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall || B.plaster, sh = o.shutter === B.shutter2 ? [B.shutter2, B.shutter2Dk] : [B.shutter, B.shutterDk];
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
          if (o.jetty && f > 0) e = 2;
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          const stone = f < (o.stone || 0);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, stone ? B.mortar : wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0;
            const nW = Math.max(1, Math.floor((L + 2) / 12)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 13) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || (isDoor && Math.abs(u - cu) <= 4);
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
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: stone ? null : sh[0], shutterDk: sh[1], box: o.box && !stone ? (f === 0 ? 1 : 2) : 0 });
            if (isDoor) {
              const r = doorAt(sd, cu, yb, { steps: true, lantern: o.lantern !== false, planters: o.planters !== false });
              out.door = r.door; out.lamp = r.lamp; out.side = sd;
            }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, mat: o.roof, pal: o.pal, gable: wall, gutter: o.roof !== 'thatch', foot: gy + 3 });
        out.top = top; out.e = e;
        if (o.chimney) {
          const cx = axis === 'x' ? X0 + 3 : Math.floor((X0 + X1) / 2) - 1, cz = axis === 'x' ? Math.floor((Z0 + Z1) / 2) - 1 : Z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        keep.push([x0 - 8, z0 - 8, x1 + 8, z1 + 8]);
        return out;
      };

      // ───────── 조각보 밭: 밀 이랑 · 그루터기와 둥근 건초 · 호박 덩굴 · 갈아엎은 밭, 산울타리 ─────────
      const crops = [B.wheat, B.stubble, B.pumpkin, null, B.wheat];
      const roundBale = (x, y, z) => {   // 옆으로 누운 둥근 건초(축 x), 마구리는 소용돌이
        for (let s = 0; s < 6; s++) for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) {
          const r = Math.hypot(dy, dz); if (r > 3.2) continue;
          const end = s === 0 || s === 5;
          w.set(x + s, y + 3 + dy, z + dz, end ? ((Math.round(r) & 1) ? B.hay2 : B.hay) : (s === 2 && r > 2.4 ? B.rope : B.hay));
        }
      };
      for (let fz = 8; fz < 324; fz += 44) for (let fx = 8; fx < 324; fx += 50) {
        const cx = fx + 20, cz = fz + 18;
        if (MH.dist(cx, cz, SX, SZ) < 78 || MH.dist(cx, cz, PX, PZ) < 52 || (fx > 220 && fz < 104) || (fx > 220 && fz > 156 && fz < 236) || nearMill(cx, cz)) continue;
        const crop = crops[((fx >> 1) * 3 + (fz >> 1)) % 5];
        for (let z = fz; z < fz + 36; z++) for (let x = fx; x < fx + 42; x++) {
          const gg = MH.g(w, x, z);
          if (gg < 0 || nearRoad(x, z) || wet(x, z) || nearMill(x, z)) continue;
          const row = (z - fz) % 4;
          w.set(x, gg, z, row < 2 ? B.soil : B.soilDk);
          if (crop === B.wheat && row < 2) {
            // 밀 이랑: 6칸 마디마다 같은 높이 → 줄 단위로 큰 면, 맨 위 두 칸은 이삭
            const ht = 5 + (hash3((x - fx) / 6 | 0, z >> 2, fz) > 0.55 ? 1 : 0);
            for (let k = 1; k <= ht; k++) w.set(x, gg + k, z, k >= ht - 1 ? B.wheatTop : B.wheat);
          } else if (crop === B.stubble && row === 0) w.set(x, gg + 1, z, B.stubble);
          else if (crop === B.pumpkin && row < 2 && (z - fz) % 8 < 2) w.set(x, gg + 1, z, B.vine);
        }
        if (crop === B.pumpkin) for (let z = fz + 2; z < fz + 34; z += 8) for (let x = fx + 3; x < fx + 40; x += 7) {
          const xx = x + ((hash3(x, z, 9) * 3) | 0), gg = MH.g(w, xx, z);
          if (gg < 0 || nearRoad(xx, z) || wet(xx, z) || nearMill(xx, z) || hash3(xx, 3, z) < 0.25) continue;
          pumpkinAt(w, xx, gg + 1, z, hash3(xx, 4, z) > 0.7 ? 2.6 : 2);
        }
        if (crop === B.stubble) for (const [ox, oz] of [[10, 10], [26, 22]]) { const gg = MH.g(w, fx + ox, fz + oz); if (nearRoad(fx + ox, fz + oz) || nearRoad(fx + ox + 5, fz + oz)) continue; roundBale(fx + ox, gg, fz + oz); }
        // 산울타리: 두 줄, 4칸 마디로 들쭉날쭉한 윗면
        for (let x = fx - 2; x <= fx + 43; x++) for (const z of [fz - 2, fz - 1, fz + 36, fz + 37]) {
          const gg = MH.g(w, x, z);
          if (gg < 0 || nearRoad(x, z) || wet(x, z) || nearMill(x, z) || w.get(x, gg + 1, z)) continue;
          const ht = 3 + (hash3(x >> 2, 3, z >> 1) > 0.45 ? 1 : 0) + (hash3(x >> 3, 5, z) > 0.8 ? 1 : 0);
          for (let k = 1; k <= ht; k++) w.set(x, gg + k, z, k === ht && hash3(x >> 2, 7, z) > 0.6 ? B.hedge2 : B.hedge);
        }
      }
      // 길: 너비가 들쭉날쭉하고, 가장자리 흙(pathE)은 끊기며 닳은 풀밭으로 번지고, 가운데는 수레바퀴 자국처럼 짙게 다져진 두 줄
      { const NAT = new Set(['grass', 'grass2', 'grass3', 'dirt', 'path', 'pathE', 'pathDk', 'grassWorn', 'mud', 'sand', 'gravel'].map(k => B[k]));
        for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
          let d = 1e9, r0 = null; for (const r of roads) { const q = MH.polyDist(x + 0.5, z + 0.5, r); if (q < d) { d = q; r0 = r; } }
          if (d > 10) continue;
          const gg = MH.g(w, x, z); if (gg < 0) continue;
          const cur = w.get(x, gg, z), nat = NAT.has(cur), nb = n.fbm(x * 0.12 + 13, z * 0.12 + 29, 2), wd = 5.2 + (nb - 0.5) * 3.4;
          if (d <= wd && (d <= 5.2 || nat)) w.set(x, gg, z, d > 1.6 && d < 3.4 && n.fbm(x * 0.25 + 3, z * 0.25 + 8, 1) > 0.42 ? B.pathDk : B.path);
          else if (nat && d <= wd + 1.2 && nb > 0.3) w.set(x, gg, z, B.pathE);
          else if (nat && cur !== B.path && d <= wd + 3.4 && nb > 0.45 && hash3(x >> 1, 9, z >> 1) > 0.35) w.set(x, gg, z, B.grassWorn);
        } }

      // ───────── 수확제 광장 ─────────
      const sg = MH.g(w, SX, SZ);
      for (let z = SZ - 49; z <= SZ + 49; z++) for (let x = SX - 49; x <= SX + 49; x++) { const d = MH.dist(x, z, SX, SZ); if (d < 49) MH.setH(w, x, z, sg, d < 39.2 ? B.cobble : d < 41.2 ? B.found : B.path, B.dirt); }
      for (let z = SZ - 84; z <= SZ + 84; z++) for (let x = SX - 84; x <= SX + 84; x++) {   // 둥근 둔덕: 광장 가장자리에서 완만하게 내려간다
        const d = MH.dist(x, z, SX, SZ), gg = MH.g(w, x, z); if (d < 49 || d > 84 || gg < 0) continue;
        const dn = d + (n.fbm(x * 0.05 + 17, z * 0.05 + 41, 2) - 0.5) * 16 * Math.min(1, (d - 49) / 8);   // 둔덕 자락이 동심원으로 고르지 않게
        const h = Math.round(sg - (dn - 49) * 0.55 - Math.max(0, dn - 70) * 0.4);
        if (h > gg) MH.setH(w, x, z, h, d < 51 ? B.pathE : (n.fbm(x * 0.035 + 3, z * 0.035, 2) > 0.6 ? B.grass2 : B.grass), B.dirt);
      }
      keep.push([SX - 52, SZ - 52, SX + 52, SZ + 52]);
      // 돌 화덕: 둥근 낱돌 열여덟 개, 안쪽 재
      w.cyl(SX, SZ, sg, sg, 10.5, B.ember);
      for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, x = Math.round(SX + Math.cos(a) * 12.2), z = Math.round(SZ + Math.sin(a) * 12.2); w.ellipsoid(x, sg + 1, z, 2, 1.7, 2, i % 3 ? B.rock : B.rockDk); }
      // 원뿔로 기대 세운 장작 열여섯(두께 3), 아래엔 가로 장작
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.15; for (const [ox, oz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) w.line(SX + ox + Math.cos(a) * 9.5, sg + 1, SZ + oz + Math.sin(a) * 9.5, SX + ox + Math.cos(a) * 1.4, sg + 21, SZ + oz + Math.sin(a) * 1.4, B.log); }
      for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI + 0.4; w.line(SX - Math.cos(a) * 7, sg + 1, SZ - Math.sin(a) * 7, SX + Math.cos(a) * 7, sg + 1, SZ + Math.sin(a) * 7, B.log, 1.1); }
      // 불: 넓은 아랫불, 밝은 속불, 솟는 불꽃 혀
      w.ellipsoid(SX, sg + 1, SZ, 6, 9, 6, B.fire, (dx, dy, dz, dd) => dy >= 0 && (dd < 0.55 || hash3(SX + dx, sg + dy, SZ + dz) > 0.35));
      w.ellipsoid(SX, sg + 2, SZ, 2.4, 6, 2.4, B.fire2, (dx, dy) => dy >= 0);
      for (let k = 0; k < 9; k++) { const a = k * 2.4, r = k % 3, x = Math.round(SX + Math.cos(a) * r), z = Math.round(SZ + Math.sin(a) * r), ht = 8 + ((hash3(k, 1, 2) * 10) | 0); w.box(x, sg + 6, z, x, sg + ht, z, k % 2 ? B.fire2 : B.fire); }
      w.box(SX, sg + 6, SZ, SX, sg + 22, SZ, B.fire2);
      // 장작 더미와 통나무 의자(나이테 마구리)
      for (const [x, z, al] of [[SX + 16, SZ + 4, false], [SX - 20, SZ - 6, false], [SX + 2, SZ - 20, true]]) logPile(x, sg + 1, z, al, 6, 2);
      logPile(SX + 8, sg + 1, SZ + 16, true, 7, 2);
      lights.push({ name: 'fire', p: [SX + 0.5, sg + 16, SZ + 0.5], c: '#ff9a40', i: 2.2, d: 72, flicker: 0.4 });
      acts.push({
        name: '수확제 모닥불', hint: '장작을 던지면 불길이 치솟아요', hit: [SX - 10, sg + 1, SZ - 10, SX + 10, sg + 22, SZ + 10],
        run: async a => { a.flash('fire', 3, 3.2); for (let k = 0; k < 6; k++) { a.burst([SX + 0.5, sg + 26, SZ + 0.5], { n: 60, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 6.8, up: 22, life: 1.8, gravity: 3, spread: 5.6 }); await a.wait(0.45); } },
      });
      // 메이폴(부품): 받침은 월드에, 나선 띠를 두른 기둥과 화관·리본이 돈다
      const MPX = SX + 26, MPZ = SZ - 24;
      for (let y = sg + 1; y <= sg + 2; y++) w.cyl(MPX, MPZ, y, y, 4.2, y === sg + 2 ? B.sill : B.rock);
      const pole = w.prop({ name: 'maypole', pivot: [MPX + 0.5, sg + 3, MPZ + 0.5], axis: 'y', speed: 0.25 });
      for (let y = sg + 3; y <= sg + 54; y++) for (const [dx, dz, q] of [[0, 0, 0], [1, 0, 1], [1, 1, 2], [0, 1, 3]]) pole.set(MPX + dx - (dx ? 0 : 0), y, MPZ + dz, ((y >> 1) + q) % 4 === 0 ? B.rib1 : B.tentW);
      pole.ellipsoid(MPX, sg + 56, MPZ, 1.5, 1.5, 1.5, B.tentY); pole.set(MPX, sg + 58, MPZ, B.tentY);
      for (let y = sg + 48; y <= sg + 50; y++) pole.ring(MPX, MPZ, y, 1.6, 4.4, y === sg + 49 ? B.hedge : B.hedge2);
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; pole.set(Math.round(MPX + Math.cos(a) * 3.8), sg + 51, Math.round(MPZ + Math.sin(a) * 3.8), [B.leafO, B.rib3, B.leafR][k % 3]); }
      [B.rib1, B.rib2, B.rib3, B.rib4, B.rib1, B.rib2, B.rib3, B.rib4].forEach((rb, k) => { const a = k / 8 * Math.PI * 2 + 0.2; const gp = guard(pole); for (let t = 0; t <= 1; t += 0.02) { const rr = 3.6 + 14.4 * t; gp.set(MPX + Math.cos(a) * rr, sg + 47 - 39 * t, MPZ + Math.sin(a) * rr, rb); } });
      acts.push({ name: '메이폴', hint: '리본이 빙글빙글 돌아요', hit: [MPX - 4, sg + 1, MPZ - 4, MPX + 4, sg + 56, MPZ + 4], run: async a => { await a.spin('maypole', 10, 3.8); } });
      // 불꽃놀이 발사대: 통나무 받침, 뒤판, 막대 달린 폭죽 다섯
      const FWX = SX - 28, FWZ = SZ + 28;
      w.box(FWX - 7, sg + 1, FWZ - 2, FWX + 7, sg + 2, FWZ + 2, B.log); for (const x of [FWX - 7, FWX + 7]) w.box(x, sg + 1, FWZ - 2, x, sg + 2, FWZ + 2, B.logEnd);
      w.box(FWX - 7, sg + 3, FWZ + 2, FWX + 7, sg + 6, FWZ + 2, B.crate); w.box(FWX - 7, sg + 6, FWZ + 2, FWX + 7, sg + 6, FWZ + 2, B.crateEdge);
      for (const [dx, c] of [[-4, B.rib1], [-2, B.rib3], [0, B.rib2], [2, B.rib4], [4, B.rib1]]) { w.box(FWX + dx, sg + 3, FWZ, FWX + dx, sg + 10, FWZ, c); w.set(FWX + dx, sg + 11, FWZ, B.cloth); w.set(FWX + dx, sg + 12, FWZ, B.iron); w.box(FWX + dx, sg + 3, FWZ + 1, FWX + dx, sg + 8, FWZ + 1, B.wood); }
      acts.push({
        name: '불꽃놀이', hint: '축제 하늘에 불꽃이 터져요(밤에 더 예뻐요)', hit: [FWX - 7, sg + 1, FWZ - 2, FWX + 7, sg + 12, FWZ + 2],
        run: async a => {
          const sets = [['#ff5a5a', '#ffd0d0'], ['#ffe060', '#ffffff'], ['#6ab0ff', '#d0e8ff'], ['#a0ff7a', '#ffe060'], ['#ff7ae0', '#ffffff'], ['#ffb04a', '#ffe8a0']];
          for (let k = 0; k < 6; k++) {
            const tx = FWX + (k - 2.5) * 20, tz = FWZ - 16 + (k % 2) * 20, ty = sg + 88 + (k % 3) * 14;
            a.burst([FWX + ((k % 5) - 2) * 2 + 0.5, sg + 12, FWZ + 0.5], { n: 12, colors: ['#ffe8a0'], speed: 1, up: 44, life: 1.1, gravity: 8, spread: 0.6 });
            await a.wait(0.9);
            a.burst([tx, ty, tz], { n: 130, colors: sets[k], speed: 40, up: 4, life: 1.7, gravity: 5, spread: 2 });
            await a.wait(0.3);
          }
        },
      });
      // 축제 천막(줄무늬 원뿔 + 물결 술 + 꼭대기 장식 기둥), 긴 식탁
      const tent = (cx, cz, r, c1, c2) => {
        const g0 = sg + 1;
        let k = 0;
        for (let rr = r; rr > 0.6; rr -= 0.4, k++) {
          const R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d = Math.hypot(dx, dz);
            if (d > rr || (k < 12 && d < rr - 1.6)) continue;
            const seg = Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 6));
            w.set(cx + dx, g0 + k, cz + dz, k >= 12 && rr < 2.4 ? B.tentY : seg % 2 ? c1 : c2);
          }
        }
        // 처마 술: 띠 한 줄 + 두 칸씩 늘어진 물결
        for (let a = 0; a < Math.PI * 2; a += 0.35 / r) {
          const x = Math.round(cx + Math.cos(a) * (r - 3.2)), z = Math.round(cz + Math.sin(a) * (r - 3.2));
          if (w.get(x, g0 + 10, z)) continue;
          w.set(x, g0 + 10, z, c1);
          if ((Math.round(a * r * 0.5) & 1) === 0) { w.set(x, g0 + 9, z, c1); w.set(x, g0 + 8, z, B.tentY); }
        }
        w.box(cx, g0 + k, cz, cx, g0 + k + 4, cz, B.wood); w.set(cx, g0 + k + 5, cz, B.lampY); w.set(cx, g0 + k + 6, cz, B.brass);
        const R = Math.ceil(r);
        w.box(cx - 2, g0, cz + R - 2, cx + 2, g0 + 8, cz + R + 1, 0);
        for (const sx of [-3, 3]) { w.box(cx + sx, g0, cz + R, cx + sx, g0 + 9, cz + R, B.wood); w.set(cx + sx, g0 + 10, cz + R + 1, B.wood); }
        for (let x = cx - 3; x <= cx + 3; x++) w.set(x, g0 + 10, cz + R + 1, c1);   // 문 위 차양
        return g0 + k + 7;
      };
      const t1 = tent(SX - 32, SZ - 20, 15, B.tentR, B.tentW);
      tent(SX + 32, SZ + 20, 14, B.tentY, B.tentW); tent(SX - 6, SZ + 34, 13, B.tentB, B.tentW);
      for (const tz of [SZ - 36, SZ - 28]) {
        for (const x of [SX - 10, SX, SX + 10]) for (const dz of [-1, 1]) w.box(x, sg + 1, tz + dz, x, sg + 4, tz + dz, B.wood);
        w.box(SX - 11, sg + 5, tz - 2, SX + 11, sg + 5, tz + 2, B.cloth);
        for (let x = SX - 11; x <= SX + 11; x++) for (const dz of [-2, 2]) w.set(x, sg + 4, tz + dz, (x & 1) ? B.clothR : B.cloth);
        for (const dz of [-4, 4]) { w.box(SX - 10, sg + 3, tz + dz, SX + 10, sg + 3, tz + dz, B.plank); for (const x of [SX - 9, SX, SX + 9]) w.box(x, sg + 1, tz + dz, x, sg + 2, tz + dz, B.wood); }
        for (let x = SX - 9; x <= SX + 8; x += 4) {
          const kk = ((x + tz) >> 2) % 3;
          if (kk === 0) { w.box(x, sg + 6, tz - 1, x + 1, sg + 6, tz, B.pie); w.set(x, sg + 7, tz - 1, B.pieTop); w.set(x + 1, sg + 7, tz, B.pieTop); }
          else if (kk === 1) pumpkinAt(w, x + 1, sg + 6, tz, 1.4);
          else { w.box(x, sg + 6, tz, x, sg + 8, tz, B.pot); w.set(x + 1, sg + 6, tz - 1, B.apple); w.set(x + 2, sg + 6, tz, B.apple); }
        }
      }
      // 호박 더미와 짚단(광장 가장자리)
      for (const [x, z] of [[SX + 40, SZ - 8], [SX - 42, SZ + 12], [SX + 12, SZ + 40]]) {
        pumpkinAt(w, x, sg + 1, z, 2.8); pumpkinAt(w, x + 5, sg + 1, z + 2, 2); pumpkinAt(w, x - 3, sg + 1, z + 4, 2); pumpkinAt(w, x + 1, sg + 5, z + 1, 1.6);
        for (let s = 0; s < 6; s++) for (let a = 0; a < 4; a++) for (let h = 0; h < 3; h++) w.set(x - 2 + s, sg + 1 + h, z + 8 + a, (s === 1 || s === 4) && (h === 2 || a === 0 || a === 3) ? B.rope : B.hay);
      }
      // 등불 가랜드(밤에 켜진다)
      const posts = [];
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2 + 0.2, px = Math.round(SX + Math.cos(a) * 43), pz = Math.round(SZ + Math.sin(a) * 43), gg = MH.g(w, px, pz);
        w.box(px - 1, gg + 1, pz - 1, px + 1, gg + 2, pz + 1, B.found); w.box(px, gg + 3, pz, px, gg + 24, pz, B.log);
        w.set(px, gg + 25, pz, B.iron); w.set(px, gg + 26, pz, B.lampY); w.set(px, gg + 27, pz, B.iron);
        posts.push([px, gg + 24, pz]);
        if (i % 3 === 0) lights.push({ p: [px + 0.5, gg + 26, pz + 0.5], c: '#ffd070', i: 1, d: 32, flicker: 0.1, night: true });
      }
      for (let i = 0; i < 12; i++) MH.garland(w, posts[i], posts[(i + 1) % 12], B.rope, [B.lampY, B.lampR], 4);
      landmarks.push({ name: '수확제 광장', note: '사흘 밤낮 꺼지지 않는 불', p: [SX + 0.5, sg + 48, SZ + 0.5], tag: 'FEST' });
      landmarks.push({ name: '축제 천막', note: '인형극과 점쟁이 천막', p: [SX - 31.5, t1 + 6, SZ - 19.5] });

      // ───────── 마을 집 ─────────
      const smokes = [];
      [[74, 122, 24, 20, 'e'], [230, 90, 24, 20, 's'], [236, 206, 26, 20, 'w'], [68, 154, 24, 20, 'e'], [152, 58, 28, 20, 's'], [106, 74, 24, 18, 's']].forEach(([x, z, sx, sz, face], k) => {
        const thatch = k === 2 || k === 3;
        const h = house({ x, z, sx, sz, floors: k % 2 ? 2 : 1, fh: 12, face, jetty: k % 2 === 1, roof: thatch ? 'thatch' : 'tile', pal: k % 2 ? PAL.b : PAL.o,
          wall: k % 2 ? B.plaster2 : B.plaster, shutter: k % 3 === 1 ? B.shutter2 : B.shutter, chimney: true, box: true, lantern: k % 2 === 0 });
        if (h.chimney && smokes.length < 3) smokes.push(h.chimney);
        if (h.lamp) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true });
        // 집 둘레: 장작더미(옆벽), 사과·호박 상자
        if (face === 's') logPile(h.x1 + 3, MH.g(w, h.x1 + 4, h.z0 + 4) + 1, h.z0 + 2, false, 9, 3);
        else logPile(h.x0 + 4, MH.g(w, h.x0 + 6, h.z0 - 5) + 1, h.z0 - 7, true, 10, 3);
        const bx = face === 'w' ? h.x1 + 3 : h.x0 - 7, bz = h.z1 - 5, by = MH.g(w, bx + 1, bz + 1);
        if (!w.get(bx + 1, by + 1, bz + 1)) { crate(w, bx, by + 1, bz, 4); if (k % 2) pumpkinAt(w, bx + 2, by + 5, bz + 2, 1.6); else for (let dx = 0; dx < 4; dx++) for (let dz = 0; dz < 4; dz++) if ((dx + dz) % 3) w.set(bx + dx, by + 5, bz + dz, B.apple); }
      });

      // ───────── 붉은 헛간: 낱돌 기초, 세로 판자와 덧대기 살, 흰 모서리, 꺾인 맞배지붕, 건초 후드 ─────────
      const bx0 = 246, bx1 = 289, bz0 = 174, bz1 = 205, bmid = 190;
      const BY = MH.maxG(w, bx0 - 2, bz0 - 2, bx1 + 2, bz1 + 2) + 1, BT = BY + 26;
      for (let z = bz0 - 1; z <= bz1 + 1; z++) for (let x = bx0 - 1; x <= bx1 + 1; x++) {
        const gg = MH.g(w, x, z), edge = x === bx0 - 1 || x === bx1 + 1 || z === bz0 - 1 || z === bz1 + 1;
        for (let y = Math.min(gg, BY) - 1; y <= BY + 1; y++) w.set(x, y, z, !edge ? B.mortar : y === BY + 1 ? B.sill : (stoneAt((z === bz0 - 1 || z === bz1 + 1) ? x : z, y, 41) || (y <= gg ? B.mortar : 0)));
      }
      w.box(bx0, BY + 2, bz0, bx1, BT - 1, bz1, B.barnR);
      const BS = SIDES(bx0, bz0, bx1, bz1);
      for (const k of ['s', 'n', 'e', 'w']) {
        const sd = BS[k];
        for (let u = sd.u0; u <= sd.u1; u++) for (let y = BY + 2; y < BT; y++) {
          if (u <= sd.u0 + 1 || u >= sd.u1 - 1) { put(sd, u, y, 0, B.trim); continue; }
          if ((u - sd.u0) % 4 === 0) put(sd, u, y, 1, B.barnR2);
        }
        for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, BT - 1, 1, B.trim); put(sd, u, BY + 2, 1, B.trim); }
        if (k === 's' || k === 'n') for (const c of [sd.u0 + 7, sd.u0 + 19, sd.u1 - 11]) for (let r = 0; r < 6; r++) for (let q = 0; q < 6; q++) {
          const fr = q === 0 || q === 5 || r === 0 || r === 5;
          put(sd, c + q, BY + 12 + r, 1, fr ? B.trim : 0);
          if (!fr) put(sd, c + q, BY + 12 + r, 0, (q === 2 || r === 2) ? B.trim : B.win);
        }
      }
      // 꺾인 맞배지붕(아래는 가파르고 위는 완만): 마루는 x 방향
      const hs = s => s <= 8 ? Math.round(s * 1.8) : Math.round(14.4 + (s - 8) * 0.65);
      const ra0 = bz0 - 2, ra1 = bz1 + 2, rl0 = bx0 - 2, rl1 = bx1 + 2, ry0 = BT - 4, rsMax = Math.floor((ra1 - ra0) / 2);
      for (let a = ra0; a <= ra1; a++) {
        const s = Math.min(a - ra0, ra1 - a), y = ry0 + hs(s), yp = s > 0 ? ry0 + hs(s - 1) : y;
        for (let l = rl0; l <= rl1; l++) {
          const b = s === 0 ? B.tileBDk : (((l + (s & 1) * 2) & 3) === 0 ? B.tileB2 : (s % 3 === 0 ? B.tileB3 : B.tileB));
          for (let yy = Math.min(yp + 1, y); yy <= y; yy++) w.set(l, yy, a, b);
          w.set(l, y - 1, a, B.tileBDk);
          if (s === rsMax) w.set(l, y + 1, a, B.tileBDk);
          if (l === rl0 || l === rl1) w.set(l, y - 2, a, B.trim);
          if (a >= bz0 && a <= bz1 && l >= bx0 && l <= bx1) for (let yy = BT; yy <= y - 2; yy++) w.set(l, yy, a, B.barnR);
        }
        // 박공벽 덧대기 살
        if (a >= bz0 + 2 && a <= bz1 - 2 && (a - bz0) % 4 === 0) for (let yy = BT; yy <= y - 3; yy++) { w.set(bx0 - 1, yy, a, B.barnR2); w.set(bx1 + 1, yy, a, B.barnR2); }
      }
      const barnPeak = ry0 + hs(rsMax) + 1;
      // 서쪽 큰 문 두 쪽(x245, z184..195): 흰 테, 가운데 이음, X 가새 / 문틀과 미닫이 쇠 레일, 문 앞 경사로
      const DZ0 = 184, DZ1 = 195, DH = 16;
      for (let z = DZ0; z <= DZ1; z++) for (let r = 0; r < DH; r++) {
        const leaf = z < DZ0 + 6 ? 0 : 1, c = z - DZ0 - leaf * 6;
        const edge = r === 0 || r === DH - 1 || c === 0 || c === 5 || r === 7 || r === 8;
        const t = r / (DH - 1), diag = Math.abs(c - Math.round(t * 5)) === 0 || Math.abs(c - Math.round((1 - t) * 5)) === 0;
        w.set(bx0 - 1, BY + 2 + r, z, edge || diag ? B.trim : B.barnR);
      }
      for (let r = 0; r <= DH; r++) { w.set(bx0 - 2, BY + 2 + r, DZ0 - 1, B.trim); w.set(bx0 - 2, BY + 2 + r, DZ1 + 1, B.trim); }
      for (let z = DZ0 - 1; z <= DZ1 + 1; z++) w.set(bx0 - 2, BY + 2 + DH, z, B.trim);
      for (let z = bz0 + 2; z <= bz1 - 2; z++) w.set(bx0 - 1, BY + 3 + DH, z, B.iron);
      for (const z of [DZ0 + 4, DZ1 - 4]) w.set(bx0 - 2, BY + 9, z, B.iron);
      for (let x = bx0 - 10; x <= bx0 - 2; x++) for (let z = DZ0; z <= DZ1; z++) { const top = BY + 1 - Math.floor((bx0 - 2 - x) / 3); const gg = MH.g(w, x, z); if (top > gg) { for (let y = gg; y <= top; y++) w.set(x, y, z, y === top ? paveAt(x, z) : B.rock); } }
      // 건초 다락 문(서쪽 박공)과 건초 후드: 내민 들보·도르래·밧줄
      for (let y = BT + 1; y <= BT + 9; y++) for (let z = bmid - 4; z <= bmid + 3; z++) {
        const edge = z === bmid - 4 || z === bmid + 3 || y === BT + 1 || y === BT + 9;
        w.set(bx0 - 1, y, z, edge ? B.trim : (Math.abs((y - BT - 5) - (z - bmid + 0.5)) < 0.8 || Math.abs((y - BT - 5) + (z - bmid + 0.5)) < 0.8 ? B.trim : B.barnR2));
      }
      const hoodY = barnPeak + 1;
      for (let x = bx0 - 9; x <= bx0 - 1; x++) for (let t = -5; t <= 5; t++) { w.set(x, hoodY - Math.abs(t), bmid + t, x === bx0 - 9 || Math.abs(t) === 5 ? B.tileBDk : B.tileB); w.set(x, hoodY - Math.abs(t) - 1, bmid + t, B.tileBDk); }
      for (let t = -4; t <= 4; t++) for (let y = hoodY - 5; y <= hoodY - Math.abs(t) - 2; y++) w.set(bx0 - 1, y, bmid + t, B.barnR);
      w.box(bx0 - 8, hoodY - 6, bmid, bx0 - 1, hoodY - 5, bmid, B.wood);
      w.set(bx0 - 7, hoodY - 7, bmid, B.ironDk); w.box(bx0 - 7, hoodY - 12, bmid, bx0 - 7, hoodY - 8, bmid, B.rope); w.set(bx0 - 7, hoodY - 13, bmid, B.iron);
      keep.push([bx0 - 14, bz0 - 10, bx1 + 10, bz1 + 10]);
      // 동쪽 박공: 둥근 환기창
      for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) { const r = Math.hypot(dy, dz); if (r > 3.4) continue; w.set(bx1 + 1, BT + 8 + dy, bmid + dz, r > 2.4 ? B.trim : (dy === 0 || dz === 0 ? B.trim : B.win)); }
      // 둥근 건초 더미(띠 모양으로 쌓고 원뿔 머리)
      for (const [hx, hz] of [[226, 238], [214, 226], [282, 224], [290, 214]]) {
        const gg = g(hx, hz);
        for (let y = 1; y <= 12; y++) { const r = y <= 7 ? 4.6 : 4.6 - (y - 7) * 0.8; w.cyl(hx, hz, gg + y, gg + y, r, (y % 3 === 0) ? B.hay2 : B.hay); }
        w.box(hx, gg + 13, hz, hx, gg + 15, hz, B.wood);
      }
      // 짐수레(헛간 남서쪽): 판자 바닥, 옆널과 말뚝, 바퀴(테·바퀴살·쇠 바퀴통), 끌채, 호박 짐
      { const cx = 222, cz0 = 200, gg = MH.maxG(w, cx - 2, cz0 - 2, cx + 8, cz0 + 14), yb = gg + 5;
        for (let z = cz0; z <= cz0 + 13; z++) for (let x = cx; x <= cx + 6; x++) {
          w.set(x, yb, z, B.plank);
          const edge = x === cx || x === cx + 6 || z === cz0 || z === cz0 + 13;
          if (edge) { w.set(x, yb + 1, z, (z - cz0) % 4 === 0 ? B.wood : B.cart); w.set(x, yb + 2, z, (z - cz0) % 4 === 0 ? B.wood : B.cart); }
        }
        for (const [px, pz, r] of [[cx + 2, cz0 + 3, 2], [cx + 4, cz0 + 8, 2.4], [cx + 2, cz0 + 10, 1.8]]) pumpkinAt(w, px, yb + 1, pz, r);
        for (const wx2 of [cx - 1, cx + 7]) for (let dy = -5; dy <= 5; dy++) for (let dz = -5; dz <= 5; dz++) {
          const r = Math.hypot(dy, dz); if (r > 4.6) continue;
          const sp = ((Math.atan2(dy, dz) / (Math.PI / 3)) % 1 + 1) % 1;
          if (r > 3.6) w.set(wx2, yb - 1 + dy, cz0 + 7 + dz, r > 4.2 ? B.iron : B.wood);
          else if (r < 1.2) w.set(wx2, yb - 1 + dy, cz0 + 7 + dz, B.ironDk);
          else if (sp < 0.12 || sp > 0.88) w.set(wx2, yb - 1 + dy, cz0 + 7 + dz, B.wood);
        }
        for (const sx2 of [cx + 1, cx + 5]) w.line(sx2, yb, cz0 - 1, sx2, gg + 2, cz0 - 9, B.wood);
        w.box(cx + 1, gg + 2, cz0 - 9, cx + 5, gg + 2, cz0 - 9, B.wood); }
      fence([[268, 210], [268, 236], [298, 236], [298, 210]]);
      landmarks.push({ name: '붉은 헛간', note: '겨울 곡식을 쌓아 두는 곳', p: [268, barnPeak + 12, bmid] });
      acts.push(OR.goAct({ at: [bx0 - 4, BY + 2, bmid - 1], h: 6, name: '붉은 헛간 안으로', goto: 'harvest-barn', hint: '두 쪽 큰 문을 밀고 들어가 탈곡 마당과 건초 다락이 있는 헛간 안을 구경해요', hit: [bx0 - 2, BY + 2, DZ0, bx0 - 1, BY + 2 + DH, DZ1] }));

      // ───────── 허수아비(호박밭): 기둥 아랫부분만 땅에, 윗몸(부품)은 바람에 돈다 ─────────
      const scx = 262, scz = 278, scg = MH.g(w, scx, scz);
      for (let z = scz - 4; z <= scz + 4; z++) for (let x = scx - 10; x <= scx + 10; x++) { const gg = MH.g(w, x, z); for (let y = gg + 1; y <= gg + 8; y++) w.set(x, y, z, 0); }
      w.box(scx, scg + 1, scz, scx, scg + 8, scz, B.wood); w.set(scx, scg, scz, B.wood);
      const sc = w.prop({ name: 'scarecrow', pivot: [scx + 0.5, scg + 9, scz + 0.5], axis: 'y' });
      sc.box(scx, scg + 9, scz, scx, scg + 20, scz, B.wood); sc.box(scx - 8, scg + 16, scz, scx + 8, scg + 16, scz, B.wood);
      sc.box(scx - 2, scg + 10, scz - 1, scx + 2, scg + 17, scz + 1, B.shirt); sc.box(scx - 2, scg + 10, scz - 1, scx + 2, scg + 10, scz + 1, B.shirtDk);
      sc.box(scx - 7, scg + 15, scz, scx + 7, scg + 17, scz, B.shirt); sc.box(scx - 1, scg + 13, scz + 2, scx, scg + 14, scz + 2, B.rib1);
      for (const s of [-1, 1]) { sc.box(scx + s * 8, scg + 14, scz, scx + s * 8, scg + 17, scz, B.straw); sc.set(scx + s * 9, scg + 15, scz, B.straw); sc.set(scx + s * 8, scg + 13, scz, B.straw); }
      sc.box(scx - 1, scg + 9, scz, scx + 1, scg + 9, scz, B.straw);
      pumpkinAt(sc, scx, scg + 18, scz, 2.4); sc.set(scx - 1, scg + 20, scz + 3, B.eye); sc.set(scx + 1, scg + 20, scz + 3, B.eye); sc.box(scx - 1, scg + 19, scz + 3, scx + 1, scg + 19, scz + 3, B.eye);
      sc.cyl(scx, scz, scg + 23, scg + 23, 4, B.straw); sc.cyl(scx, scz, scg + 24, scg + 25, 2.2, B.straw); sc.ring(scx, scz, scg + 24, 1.4, 2.4, B.rib1);
      acts.push({
        name: '허수아비', hint: '허수아비가 빙글 돌자 호박밭의 까마귀들이 놀라 날아가요', hit: [scx - 8, scg + 1, scz - 2, scx + 8, scg + 25, scz + 2],
        run: async a => {
          a.turn('scarecrow', [0, Math.PI * 4, 0], 2.6);
          for (let k = 0; k < 6; k++) { const ang = k * 1.05; a.burst([scx + 0.5 + Math.cos(ang) * 10, scg + 4, scz + 0.5 + Math.sin(ang) * 10], { n: 6, colors: ['#1a1a20', '#2a2a34', '#3a3a44'], speed: 8, up: 10, life: 2.4, gravity: -1.6, spread: 2 }); await a.wait(0.3); }
          await a.wait(0.8);
          a.unwind('scarecrow');
          a.burst([scx + 0.5, scg + 18, scz + 0.5], { n: 22, colors: ['#e0c070', '#dcb456'], speed: 5, up: 2, life: 1.6, gravity: 4, spread: 3 });
        },
      });
      landmarks.push({ name: '호박밭', note: '허수아비가 지키는 밭', p: [scx + 0.5, scg + 36, scz + 0.5] });

      // ───────── 사과 과수원 ─────────
      for (let z = 28; z <= 92; z += 21) for (let x = 238; x <= 316; x += 26) {
        const xx = x + ((z / 21 | 0) % 2) * 10, gg = MH.g(w, xx, z);
        if (gg < 0 || w.get(xx, gg + 1, z) || nearRoad(xx, z) || xx > W - 10) continue;
        for (let dz = -5; dz <= 5; dz++) for (let dx = -5; dx <= 5; dx++) if (Math.abs(dx) + Math.abs(dz) <= 7) MH.paint(w, xx + dx, z + dz, B.grass3);
        tree(xx, gg + 1, z, { h: 12, r: 7, trunkR: 1.6, branches: 3, leaves: [B.leafY, B.leafG, B.leafO], fruit: B.apple });
        if (hash3(xx, 5, z) > 0.45) { crate(w, xx + 6, MH.g(w, xx + 7, z + 5) + 1, z + 4, 4); for (let dx = 0; dx < 4; dx++) for (let dz = 0; dz < 4; dz++) if ((dx * 3 + dz) % 4) w.set(xx + 6 + dx, MH.g(w, xx + 7, z + 5) + 5, z + 4 + dz, B.apple); w.set(xx + 4, g(xx + 4, z + 7) + 1, z + 7, B.apple); }
      }
      landmarks.push({ name: '사과 과수원', note: '사과주의 재료가 자라는 곳', p: [277, base + 48, 61] });

      // ───────── 연못가 물레방앗간과 벌통 언덕 ─────────
      MH.river(w, [[CHX, MZ0 - 6], [CHX, MZ0 + 20], [CHX - 4, PZ - 24]], 4.8, lvl, B.rockDk, B.pathE);
      const mill = house({ x: MX0, z: MZ0, sx: MSX, sz: MSZ, floors: 2, fh: 12, face: 's', jetty: true, stone: 1, roof: 'tile', pal: PAL.b, wall: B.plaster, shutter: B.shutter, chimney: true, box: true, planters: false });
      if (mill.chimney) smokes.push(mill.chimney);
      if (mill.lamp) lights.push({ p: mill.lamp, c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true });
      // 물레 자리는 물길을 더 깊게
      const WZ = MZ0 + 8, WY = lvl + 7, WR = 10;
      for (let z = WZ - 13; z <= WZ + 13; z++) for (let x = CHX - 5; x <= CHX + 5; x++) if (wet(x, z)) { MH.setH(w, x, z, lvl - 6, B.rockDk, B.rockDk); for (let y = lvl - 5; y <= lvl; y++) w.set(x, y, z, 0); }
      // 굴대: 방앗간 동벽에서 물레까지(쇠테), 동쪽 둑의 돌 받침
      for (let x = MX0 + MSX; x <= CHX - 5; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) if (Math.abs(dy) + Math.abs(dz) < 2) w.set(x, WY + dy, WZ + dz, x % 4 === 0 ? B.iron : B.wood);
      for (let y = lvl - 6; y <= WY - 2; y++) for (let z = WZ - 2; z <= WZ + 2; z++) for (let x = CHX + 5; x <= CHX + 7; x++) w.set(x, y, z, (stoneAt(z, y, 9) || B.mortar));
      w.box(CHX + 5, WY - 1, WZ - 2, CHX + 7, WY - 1, WZ + 2, B.sill); w.box(CHX + 5, WY, WZ - 1, CHX + 6, WY, WZ + 1, B.ironDk);
      const wheel = w.prop({ name: 'millwheel', pivot: [CHX + 0.5, WY + 0.5, WZ + 0.5], axis: 'x', speed: 0.35, clipOK: 30 });
      for (let dy = -WR - 2; dy <= WR + 2; dy++) for (let dz = -WR - 2; dz <= WR + 2; dz++) {
        const r = Math.hypot(dy, dz), ang = Math.atan2(dy, dz);
        if (r > WR + 0.5) continue;
        if (r > WR - 1.6) {
          for (const x of [CHX - 3, CHX + 3]) wheel.set(x, WY + dy, WZ + dz, B.wood);
          if (r > WR - 0.7) for (let x = CHX - 2; x <= CHX + 2; x++) wheel.set(x, WY + dy, WZ + dz, B.plank);
          continue;
        }
        const sp = ((ang / (Math.PI / 4)) % 1 + 1) % 1, onSpoke = r > 1.8 && (sp < 0.9 / Math.max(1, r) || sp > 1 - 0.9 / Math.max(1, r));
        if (onSpoke) for (const x of [CHX - 3, CHX + 3]) wheel.set(x, WY + dy, WZ + dz, B.wood);
        if (r < 2.2) for (let x = CHX - 4; x <= CHX + 4; x++) wheel.set(x, WY + dy, WZ + dz, r < 1.2 ? B.ironDk : B.iron);
      }
      for (let k = 0; k < 16; k++) {
        const a = k / 16 * Math.PI * 2;
        for (let rr = WR - 3; rr <= WR + 1.5; rr += 0.5) { const dy = Math.round(Math.sin(a) * rr), dz = Math.round(Math.cos(a) * rr); for (let x = CHX - 2; x <= CHX + 2; x++) wheel.set(x, WY + dy, WZ + dz, rr > WR ? B.wood : B.plank); }
      }
      // 방앗간 앞: 밀가루 자루, 기대 세운 여분 맷돌, 장작
      const my = mill.y;
      for (let k = 0; k < 5; k++) { const x = MX0 + 1 + (k % 3) * 3, z = MZ0 + MSZ + 4 + (k >= 3 ? 3 : 0); sack(w, x, MH.g(w, x + 1, z + 1) + 1, z, k % 2 ? B.sack2 : B.sack); }
      { const sgx = MX0 + 15, sgz = MZ0 + MSZ + 6, sgg = MH.g(w, sgx, sgz);
        for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const r = Math.hypot(dx, dy); if (r > 4.3) continue; for (const dz of [0, 1]) w.set(sgx + dx, sgg + 5 + dy, sgz + dz, r < 0.9 ? 0 : r > 3.5 ? B.found : B.millstone); } }
      // 둑 위 버드나무: 줄기와 가지, 꼭대기 잎뭉치, 늘어진 잎줄기
      { const wx = 36, wz = 224, wg = MH.g(w, wx, wz) + 1;
        const t = tree(wx, wg, wz, { h: 20, r: 9, trunkR: 2.4, branches: 6, lobes: 2, leaves: [B.leafY, B.leafG, B.leafG] });
        for (let k = 0; k < 90; k++) {
          const e = t.ends[k % t.ends.length], a = hash3(k, 3, 7) * 6.28, rr = 2 + hash3(k, 4, 7) * 6;
          const x = Math.round(e[0] + Math.cos(a) * rr), z = Math.round(e[2] + Math.sin(a) * rr), y0 = Math.round(e[1]) - 1, len = 8 + ((hash3(k, 5, 7) * 12) | 0);
          for (let y = y0; y > y0 - len && y > MH.g(w, x, z) + 2; y--) soft.set(x, y, z, k % 3 ? B.leafG : B.leafY);
        }
        keep.push([wx - 16, wz - 16, wx + 16, wz + 16]); }
      // 연잎(연꽃 몇 송이)
      for (let k = 0; k < 16; k++) {
        const a = k * 0.9, x = Math.round(PX + Math.cos(a) * (10 + (k % 4) * 5)), z = Math.round(PZ + Math.sin(a) * (10 + (k % 4) * 5));
        if (!wet(x, z) || MH.dist(x, z, CHX, WZ) < 18 || MH.polyDist(x, z, dr) < 7) continue;
        for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (wet(x + dx, z + dz) && !(dx && dz && (k & 1))) w.set(x + dx, lvl, z + dz, B.lily);
        if (k % 3 === 0) { w.set(x, lvl + 1, z, B.lilyF); w.set(x, lvl + 2, z, B.flower3); }
      }
      landmarks.push({ name: '물레방앗간', note: '연못 물길로 물레를 돌려 햇밀을 빻는 곳', p: [MX0 + 10, mill.peak + 16, MZ0 + 9], tag: 'MILL' });
      acts.push(OR.goAct({ at: [mill.door[0], my + 1, mill.door[2] + 5], h: 6, name: '물레방앗간 안으로', goto: 'harvest-mill', hint: '문을 열고 들어가 맷돌방과 빵 굽는 부엌, 곡물 다락을 구경해요', hit: [mill.door[0] - 2, mill.door[1], mill.door[2] - 1, mill.door[0] + 2, mill.door[1] + 8, mill.door[2]] }));
      acts.push({
        name: '물레방아', hint: '수문을 열면 물살에 물레가 힘차게 돌고 방앗간에서 밀가루가 폴폴 날려요', hit: [CHX - 3, WY - WR, WZ - WR, CHX + 3, WY + WR, WZ + WR],
        run: async a => {
          const sp = a.spin('millwheel', 9, 4.4);
          for (let k = 0; k < 8; k++) {
            a.burst([CHX + 0.5, lvl + 1, WZ + 0.5 + (k % 2 ? 6 : -6)], { n: 22, colors: ['#ffffff', '#d8f0ff', '#a8d0c0'], speed: 6, up: 8, life: 0.9, gravity: 18, spread: 2.4 });
            if (k % 2) a.burst([mill.door[0] + 0.5, my + 8, MZ0 + MSZ + 4], { n: 18, colors: ['#ffffff', '#f8f4ea', '#e8e0d0'], speed: 2.8, up: 3.2, life: 1.8, gravity: -0.4, spread: 2.8 });
            await a.wait(0.5);
          }
          await sp;
        },
      });
      // 벌통 언덕: 방앗간 동쪽 낮은 둔덕 위 층층 벌통 줄과 꽃밭
      const HXc = 142, HZc = 232, hg = MH.g(w, HXc, HZc);
      MH.flatten(w, HXc - 11, HZc - 12, HXc + 11, HZc + 13, hg, B.grass2, B.dirt);
      MH.skirt(w, HXc - 11, HZc - 12, HXc + 11, HZc + 13, hg, { R: 8, rate: 0.8, surf: () => B.grass2, fill: B.dirt });
      fence([[HXc - 12, HZc - 14], [HXc + 12, HZc - 14], [HXc + 12, HZc + 14]]);
      keep.push([HXc - 16, HZc - 18, HXc + 16, HZc + 18]);
      const hiveAt = (x, z, T) => {   // 다리, 층층 상자(줄눈), 들머리와 착륙판, 지붕 뚜껑 → 뚜껑 높이
        T = T || w;
        for (const [lx, lz] of [[x, z], [x + 3, z], [x, z + 3], [x + 3, z + 3]]) w.box(lx, hg + 1, lz, lx, hg + 2, lz, B.wood);
        for (let y = hg + 3; y <= hg + 9; y++) w.box(x, y, z, x + 3, y, z + 3, (y - hg) % 3 === 2 ? B.hiveDk : B.hive);
        w.box(x + 1, hg + 3, z + 4, x + 2, hg + 3, z + 4, B.plank); w.box(x + 1, hg + 4, z + 3, x + 2, hg + 4, z + 3, B.hole); w.set(x + 2, hg + 3, z + 4, B.honey);
        return hg + 10;
      };
      const hives = [];
      for (const [dx, dz] of [[-6, -6], [2, -6], [-6, 2], [2, 2], [-6, 10]]) {
        const x = HXc + dx, z = HZc + dz, ty = hiveAt(x, z);
        w.box(x - 1, ty, z - 1, x + 4, ty, z + 4, B.hiveR); w.box(x, ty + 1, z, x + 3, ty + 1, z + 3, B.hiveR);
        hives.push([x + 2, hg + 5, z + 4]);
      }
      for (let z = HZc - 11; z <= HZc + 12; z++) for (let x = HXc + 6; x <= HXc + 11; x++) if (!w.get(x, hg + 1, z) && hash3(x, 4, z) > 0.55) flowerAt(w, x, hg + 1, z, [B.flower2, B.flower3, B.flower5, B.flower4][((x * 3 + z) >> 1) % 4], hash3(x, 6, z) > 0.5);
      // 꿀 항아리 선반(밤에 은은히 빛난다)
      w.box(HXc - 11, hg + 1, HZc + 9, HXc - 10, hg + 7, HZc + 13, B.crate); for (const y of [hg + 3, hg + 6]) w.box(HXc - 11, y, HZc + 9, HXc - 9, y, HZc + 13, B.crateEdge);
      for (const z of [HZc + 10, HZc + 12]) { w.set(HXc - 9, hg + 7, z, B.honey); w.set(HXc - 9, hg + 4, z, B.honey); w.set(HXc - 9, hg + 8, z, B.cloth); }
      lights.push({ name: 'hive', p: [HXc - 8.5, hg + 8, HZc + 11.5], c: '#ffc050', i: 0.9, d: 24, flicker: 0.15 });
      // 뚜껑 열리는 큰 벌통(부품)
      const BHX = HXc + 2, BHZ = HZc + 10, bty = hiveAt(BHX, BHZ);
      const lid = w.prop({ name: 'hivelid', pivot: [BHX - 1, bty, BHZ + 2], axis: 'x' });
      lid.box(BHX - 1, bty, BHZ - 1, BHX + 4, bty, BHZ + 4, B.hiveR); lid.box(BHX, bty + 1, BHZ, BHX + 3, bty + 1, BHZ + 3, B.hiveR); lid.set(BHX + 1, bty + 2, BHZ + 1, B.iron);
      acts.push({
        name: '꿀벌 떼', hint: '벌통 뚜껑을 열자 꿀벌 떼가 윙윙 날아올라 꽃밭을 한 바퀴 돌아요', hit: [HXc - 8, hg + 1, HZc - 8, HXc + 6, hg + 12, HZc + 14],
        run: async a => {
          await a.turn('hivelid', [0, 0, 1.2], 0.6);
          a.flash('hive', 2.4, 3.5);
          for (let k = 0; k < 18; k++) {
            const t = k / 18 * Math.PI * 2, r = 6 + k * 0.5;
            a.burst([HXc + 0.5 + Math.cos(t) * r, hg + 8 + Math.sin(k * 0.7) * 3 + k * 0.3, HZc + 0.5 + Math.sin(t) * r], { n: 8, colors: ['#ffd020', '#2a2018', '#ffe880'], speed: 3.2, up: 1.6, life: 1.2, gravity: 0, spread: 1.2 });
            if (k % 6 === 0) for (const h of hives) a.burst([h[0], h[1] + 1, h[2]], { n: 6, colors: ['#ffd020', '#2a2018'], speed: 2.4, up: 2.4, life: 1, gravity: 0, spread: 1 });
            await a.wait(0.18);
          }
          await a.turn('hivelid', [0, 0, 0], 0.6);
        },
      });
      landmarks.push({ name: '벌통 언덕', note: '메밀꽃 꿀을 거두는 벌통 줄', p: [HXc + 0.5, hg + 24, HZc + 0.5] });
      // 연못 오리 가족: 어미(초록 머리 · 갈색 가슴 · 흰 몸 · 꽁지)와 새끼 둘
      MH.routeOK(w, dr, 2, '오리 길');
      const DX = dr[0][0], DZ = dr[0][1], DY = lvl + 1;
      const duck = w.prop({ name: 'ducks', pivot: [DX + 0.5, DY, DZ + 0.5], axis: 'x', bob: 0.2, bobSpeed: 2 });
      const duckAt = (x, y, z, big) => {
        const L = big ? 3 : 2, Wd = big ? 1.6 : 1.1;
        for (let dx = -L; dx <= L; dx++) for (let dz = -2; dz <= 2; dz++) for (let dy = 0; dy <= (big ? 2 : 1); dy++) {
          if ((dx / (L + 0.5)) ** 2 + (dz / (Wd + 0.4)) ** 2 + (dy / (big ? 2.6 : 1.8)) ** 2 > 1) continue;
          duck.set(x + dx, y + dy, z + dz, big ? (dx >= L - 1 && dy <= 1 ? B.duckB : dy === 2 ? B.duck2 : B.duck) : B.hay);
        }
        duck.set(x - L - 1, y + (big ? 2 : 1), z, big ? B.duck2 : B.hay);
        const hx = x + L, hy = y + (big ? 3 : 2);
        duck.box(hx, hy, z, hx, hy + (big ? 1 : 0), z, big ? B.duckG : B.hay); if (big) duck.box(hx, hy, z - 1, hx, hy + 1, z + 1, B.duckG);
        duck.set(hx + 1, hy, z, B.beak); if (big) { duck.set(hx + 2, hy, z, B.beak); duck.set(hx, hy + 1, z - 1, B.eye); duck.set(hx, hy + 1, z + 1, B.eye); }
      };
      duckAt(DX, DY, DZ, true); duckAt(DX - 7, DY, DZ + 2, false); duckAt(DX - 11, DY, DZ - 2, false);
      const dDrive = dr.slice(1).map(([x, z]) => [x - DX, 0, z - DZ]).concat([[54 - DX, 10, 268 - DZ], [-32 - DX, 40, 284 - DZ]]);
      acts.push({
        name: '연못 오리', hint: '오리 가족이 연잎 사이로 연못을 가로질러 헤엄치다 날아올라 서쪽 하늘로 떠나요', hit: [DX - 13, DY, DZ - 4, DX + 6, DY + 5, DZ + 4],
        run: async a => {
          const pr = a.drive('ducks', dDrive, 9, { fwd: '+x', back: 1.0 });
          for (let k = 0; k < 4; k++) { const p = dr[k]; a.burst([p[0] + 0.5, DY + 0.6, p[1] + 0.5], { n: 12, colors: ['#ffffff', '#d8f0e0'], speed: 2.4, up: 1.2, life: 0.8, gravity: 4, spread: 2, flat: true }); await a.wait(1); }
          a.burst([56.5, DY + 4, 268.5], { n: 28, colors: ['#ffffff', '#d8f0e0', '#f4f0e4'], speed: 5, up: 4, life: 1, gravity: 8, spread: 3 });
          await pr;
        },
      });

      // ───────── 연못가 갈대, 낙엽, 풀포기, 단풍나무 ─────────
      for (let z = 1; z < D - 1; z++) for (let x = 1; x < W - 1; x++) {
        if (wet(x, z) || MH.dist(x, z, PX, PZ) > 44) continue;
        if (!(wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1) || wet(x, z - 1) || wet(x + 2, z) || wet(x - 2, z))) continue;
        const gg = MH.g(w, x, z), h = hash3(x, 5, z);
        const cl = n.fbm(x * 0.09 + 77, z * 0.09 + 5, 2);   // 갈대는 울타리처럼 고르게 두르지 않고 무리 지어
        if (gg > lvl + 6 || w.get(x, gg + 1, z) || cl < 0.47 || h < (cl > 0.6 ? 0.45 : 0.7) || MH.dist(x, z, CHX, WZ) < 14) continue;
        const ht = 3 + (Math.min(0.29, (h - 0.45) * (cl > 0.6 ? 0.6 : 1)) * 22 | 0);
        for (let k = 1; k <= ht; k++) w.set(x, gg + k, z, k % 3 ? B.reed : B.reed2);
        if (h > 0.86) { w.set(x, gg + ht + 1, z, B.reedTop); w.set(x, gg + ht + 2, z, B.reedTop); w.set(x, gg + ht + 3, z, B.reed2); }
      }
      MH.scatter(w, 9000, (x, gg, z, b) => {
        if (!(b === B.grass || b === B.grass2 || b === B.grass3) || !w.chance(0.22)) return;
        if (w.chance(0.55)) w.set(x, gg + 1, z, w.pick([B.leafO, B.leafR, B.leafY]));
        else { w.set(x, gg + 1, z, B.tuft); if (hash3(x, gg, z) > 0.5) w.set(x, gg + 2, z, B.tuft); }
      });
      const WX = 230, WZc = 276;
      for (let i = 0; i < 40; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), gg = MH.g(w, x, z), gb = w.get(x, gg, z);
        if (gg < 0 || (gb !== B.grass && gb !== B.grass2 && gb !== B.grass3) || nearRoad(x, z) || nearMill(x, z) || MH.dist(x, z, SX, SZ) < 58 || wet(x, z) || MH.dist(x, z, PX, PZ) < 44) continue;
        if (keep.some(([a0, c0, a1, c1]) => x >= a0 - 6 && x <= a1 + 6 && z >= c0 - 6 && z <= c1 + 6) || MH.dist(x, z, WX, WZc) < 22 || MH.dist(x, z, scx, scz) < 20) continue;
        const L = [[B.leafY, B.leafO, B.leafR], [B.leafO, B.leafR, B.leafR], [B.leafY, B.leafY, B.leafO]][i % 3];
        tree(x, gg + 1, z, { h: w.ri(15, 21), r: w.r(7, 8.6), trunkR: w.r(1.6, 2), branches: 4, leaves: L });
        keep.push([x - 10, z - 10, x + 10, z + 10]);
      }
      // 길가 가로등
      for (const [x, z] of [[146, 190], [200, 206], [212, 120], [172, 104], [120, 240], [280, 122]]) { if (w.get(x, MH.g(w, x, z) + 1, z)) continue; lights.push({ p: lampPost(x, z, 11), c: '#ffe0a0', i: 0.9, d: 22, flicker: 0.05, night: true }); }

      // ───────── 사과주 압착기: 나사가 돌며 내려가 사과즙이 흘러나온다 ─────────
      const CPX = SX - 28, CPZ = SZ + 8;
      for (let y = sg + 1; y <= sg + 4; y++) w.ring(CPX, CPZ, y, 3.4, 4.6, y === 2 + sg ? B.iron : B.cask);
      w.cyl(CPX, CPZ, sg + 1, sg + 3, 3.4, B.cask2); w.cyl(CPX, CPZ, sg + 4, sg + 4, 3.4, B.apple);
      w.box(CPX, sg + 3, CPZ + 5, CPX, sg + 3, CPZ + 6, B.wood); barrel(w, CPX, sg + 1, CPZ + 9, 3);
      for (const x of [CPX - 6, CPX + 6]) { w.box(x, sg + 1, CPZ - 1, x + 1, sg + 22, CPZ, B.wood); w.box(x - 1, sg + 1, CPZ - 2, x + 2, sg + 1, CPZ + 1, B.wood); }
      w.box(CPX - 7, sg + 22, CPZ - 1, CPX + 8, sg + 23, CPZ, B.wood);
      for (const [x, z] of [[CPX - 10, CPZ + 3], [CPX + 7, CPZ + 3]]) { crate(w, x, sg + 1, z, 4); for (let dx = 0; dx < 4; dx++) for (let dz = 0; dz < 4; dz++) if ((dx + dz) % 2) w.set(x + dx, sg + 5, z + dz, B.apple); }
      const press = w.prop({ name: 'press', pivot: [CPX + 0.5, sg + 12, CPZ + 0.5], axis: 'y' });
      for (let y = sg + 9; y <= sg + 21; y++) press.set(CPX, y, CPZ, y % 2 ? B.iron : B.ironDk);
      press.cyl(CPX, CPZ, sg + 7, sg + 8, 3, B.cart); press.cyl(CPX, CPZ, sg + 6, sg + 6, 2.6, B.wood);
      press.box(CPX - 4, sg + 16, CPZ, CPX + 4, sg + 16, CPZ, B.wood); press.box(CPX, sg + 16, CPZ - 4, CPX, sg + 16, CPZ + 4, B.wood);
      for (const [dx, dz] of [[-4, 0], [4, 0], [0, -4], [0, 4]]) press.set(CPX + dx, sg + 17, CPZ + dz, B.iron);
      acts.push({
        name: '사과주 압착기', hint: '나사를 돌려 누르면 사과즙이 쭉 흘러나와요', hit: [CPX - 7, sg + 1, CPZ - 5, CPX + 8, sg + 23, CPZ + 7],
        run: async a => {
          await a.tween('press', { off: [0, -2, 0], rot: [0, Math.PI * 3, 0] }, 2.4, t => t);
          for (let k = 0; k < 6; k++) { a.burst([CPX + 0.5, sg + 3, CPZ + 6.5], { n: 18, colors: ['#e8a83a', '#f0c860', '#c8702a'], speed: 2, up: 2, life: 0.8, gravity: 20, spread: 0.6 }); a.burst([CPX + 0.5, sg + 6, CPZ + 0.5], { n: 10, colors: ['#c8302a', '#e8b83a'], speed: 5, up: 4, life: 0.6, gravity: 16, spread: 2.4 }); await a.wait(0.35); }
          await a.tween('press', { off: [0, 0, 0], rot: [0, 0, 0] }, 2, t => t);
        },
      });
      // ───────── 호박 수레: 남쪽 길에서 호박을 싣고 광장 앞까지 온다 ─────────
      const route = [[WX, WZc], [220, 244], [202, 214]];
      const wy = MH.maxG(w, WX - 5, WZc - 12, WX + 5, WZc + 6);
      for (let z = WZc - 12; z <= WZc + 6; z++) for (let x = WX - 6; x <= WX + 6; x++) for (let y = MH.g(w, x, z) + 1; y <= wy + 14; y++) w.set(x, y, z, 0);
      const cart = w.prop({ name: 'pcart', pivot: [WX + 0.5, wy + 1, WZc + 0.5] });
      cart.box(WX - 3, wy + 5, WZc - 5, WX + 3, wy + 5, WZc + 5, B.plank);
      for (let z = WZc - 5; z <= WZc + 5; z++) for (const x of [WX - 3, WX + 3]) cart.box(x, wy + 6, z, x, wy + 7, z, (z - WZc) % 3 === 0 ? B.wood : B.cart);
      for (let x = WX - 3; x <= WX + 3; x++) for (const z of [WZc - 5, WZc + 5]) cart.box(x, wy + 6, z, x, wy + 7, z, B.cart);
      for (const [px, pz, r] of [[WX - 1, WZc - 2, 1.8], [WX + 1, WZc + 2, 2], [WX - 1, WZc + 3, 1.6], [WX + 1, WZc - 3, 1.6], [WX, WZc, 2.2]]) pumpkinAt(cart, px, wy + (r > 2 ? 8 : 6), pz, r);
      for (const x of [WX - 4, WX + 4]) for (const zc of [WZc - 3, WZc + 3]) for (let dy = -3; dy <= 3; dy++) for (let dz = -3; dz <= 3; dz++) {
        const r = Math.hypot(dy, dz); if (r > 3.1) continue;
        if (r > 2.3 || r < 0.8 || dy === 0 || dz === 0) cart.set(x, wy + 4 + dy, zc + dz, r < 0.8 ? B.ironDk : r > 2.6 ? B.iron : B.wood);
      }
      for (const x of [WX - 2, WX + 2]) cart.box(x, wy + 5, WZc - 10, x, wy + 5, WZc - 6, B.wood); cart.box(WX - 2, wy + 5, WZc - 11, WX + 2, wy + 5, WZc - 11, B.wood);
      const far = [[212, 198], [220, 176], [232, 144], [246, 132], [290, 122], [332, 112], [356, 106]];
      const cDrive = route.slice(1).concat(far).map(([x, z]) => { const gx = Math.min(W - 1, x), gz = Math.min(D - 1, z); return [x - WX, MH.g(w, gx, gz) - wy, z - WZc]; });
      acts.push({
        name: '호박 수레', hint: '호박을 가득 실은 수레가 광장 앞에 들렀다가 동쪽 큰길을 따라 들녘 밖으로 떠나요', hit: [WX - 5, wy + 1, WZc - 11, WX + 5, wy + 12, WZc + 5],
        run: async a => {
          await a.drive('pcart', cDrive.slice(0, 2), 4, { fwd: '-z' });
          for (let k = 0; k < 3; k++) { a.burst([route[2][0] + 0.5, MH.g(w, route[2][0], route[2][1]) + 10, route[2][1] + 0.5], { n: 16, colors: ['#e8801a', '#ffb04a', '#4a7a2a'], speed: 5, up: 8, life: 1, gravity: 16, spread: 2 }); await a.wait(0.35); }
          await a.drive('pcart', cDrive.slice(2), 8, { fwd: '-z', back: 1.0 });
        },
      });
      // ───────── 헛간 지붕 풍향 닭: 바람을 받아 빙글빙글 ─────────
      const VX0 = 266, VZ0 = bmid;
      w.box(VX0, barnPeak, VZ0, VX0, barnPeak + 5, VZ0, B.iron);
      for (const [dx, dz] of [[-3, 0], [3, 0], [0, -3], [0, 3]]) { w.line(VX0, barnPeak + 3, VZ0, VX0 + dx, barnPeak + 3, VZ0 + dz, B.iron); w.set(VX0 + dx, barnPeak + 3, VZ0 + dz, B.brass); }
      const vane = w.prop({ name: 'vane', pivot: [VX0 + 0.5, barnPeak + 6, VZ0 + 0.5], axis: 'y', speed: 0.3 });
      vane.box(VX0, barnPeak + 6, VZ0, VX0, barnPeak + 7, VZ0, B.iron);
      vane.box(VX0 - 8, barnPeak + 8, VZ0, VX0 + 8, barnPeak + 8, VZ0, B.ironDk); vane.box(VX0 + 9, barnPeak + 7, VZ0, VX0 + 9, barnPeak + 9, VZ0, B.brass); vane.set(VX0 + 10, barnPeak + 8, VZ0, B.brass);
      for (let r = 0; r < 5; r++) vane.box(VX0 - 9 - r, barnPeak + 8 - r, VZ0, VX0 - 9 - r, barnPeak + 8 + r, VZ0, B.tentY);
      // 닭: 몸, 치솟은 꽁지깃, 목과 머리, 붉은 볏과 턱볏, 부리
      for (let dx = -3; dx <= 3; dx++) for (let dy = 0; dy <= 4; dy++) if ((dx / 3.6) ** 2 + ((dy - 2) / 2.6) ** 2 <= 1) vane.set(VX0 + dx, barnPeak + 9 + dy, VZ0, B.ironDk);
      for (let k = 0; k < 4; k++) vane.box(VX0 - 3 - k, barnPeak + 11 + k, VZ0, VX0 - 3 - k, barnPeak + 13 + k + (k > 1 ? 1 : 0), VZ0, k % 2 ? B.rib1 : B.ironDk);
      vane.box(VX0 + 2, barnPeak + 13, VZ0, VX0 + 3, barnPeak + 16, VZ0, B.ironDk); vane.box(VX0 + 2, barnPeak + 17, VZ0, VX0 + 3, barnPeak + 17, VZ0, B.rib1); vane.set(VX0 + 3, barnPeak + 18, VZ0, B.rib1);
      vane.set(VX0 + 4, barnPeak + 15, VZ0, B.tentY); vane.set(VX0 + 3, barnPeak + 14, VZ0, B.rib1);
      acts.push({
        name: '풍향 닭', hint: '헛간 지붕의 풍향 닭이 세찬 가을바람에 빙글빙글 돌아요', hit: [VX0 - 9, barnPeak, VZ0 - 2, VX0 + 9, barnPeak + 18, VZ0 + 2],
        run: async a => {
          a.wind(4, 3.5);
          a.spin('vane', 14, 3.5);
          for (let k = 0; k < 5; k++) { a.burst([VX0 + 0.5, barnPeak + 12, VZ0 + 0.5], { n: 14, colors: ['#e07a2a', '#c84a2a', '#f0b83a'], speed: 12, up: 2, life: 1.6, gravity: 1, spread: 3, flat: true }); await a.wait(0.6); }
        },
      });
      // ───────── 낙엽 회오리: 길가에서 단풍잎이 소용돌이치며 솟는다 ─────────
      const LX = 140, LZ = 200, lgY = MH.g(w, LX, LZ);
      acts.push({
        name: '낙엽 회오리', hint: '가을바람이 길가 낙엽을 휘감아 회오리로 올려요', hit: [LX - 6, lgY, LZ - 6, LX + 6, lgY + 8, LZ + 6],
        run: async a => {
          a.wind(5, 4);
          for (let k = 0; k < 24; k++) {
            const ang = k * 0.75, r = 2 + k * 0.4;
            a.burst([LX + 0.5 + Math.cos(ang) * r, lgY + 2 + k * 1.3, LZ + 0.5 + Math.sin(ang) * r], { n: 10, colors: ['#e07a2a', '#c84a2a', '#f0b83a', '#e8b83a'], speed: 5, up: 3, life: 1.8, gravity: -0.6, spread: 1.2, flat: true });
            await a.wait(0.14);
          }
        },
      });
      // 광장 돌길 무늬 입히기
      for (let z = SZ - 40; z <= SZ + 40; z++) for (let x = SX - 40; x <= SX + 40; x++) { const gg = MH.g(w, x, z); if (gg > 0 && w.get(x, gg, z) === B.cobble) w.set(x, gg, z, paveAt(x, z)); }
      const smoke = smokes.map(c => ({ n: 26, colors: ['#e8dcd0', '#c8bcb0'], mode: 'rise', speed: 1.2, area: [c[0], c[2], 1.2], y0: c[1], y1: c[1] + 36, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
