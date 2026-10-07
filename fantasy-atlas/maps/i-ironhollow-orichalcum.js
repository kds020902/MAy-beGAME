// 무쇠골 오리하르콘 광산(하위 지도) — 금광산의 두 번째 수직갱을 타고 내려온 가장 깊은 층.
// 서북쪽 승강기 도착장에서 나서면 가운데 거대한 동굴의 벽마다 푸른빛·청록 금속 광맥이 흐르고, 한가운데 큰 결정 무리가 빛난다.
// 서쪽엔 룬을 새긴 돌 지주가 줄지어 선 오래된 고대 갱도, 동쪽 바닥엔 붉게 달아오른 지열 균열과 증기 구멍,
// 동남쪽엔 바닥이 지도 밑까지 뚫린 심연의 구멍(가장자리 무너진 바위·갈라짐, 둘레엔 낮은 경고 돌무더기).
// (160칸, 고해상도 2배 · 1칸 ≈ 25cm, playerScale 2)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 128, G = 36;
  const HC = [112, 124], HR = 14;                                    // 심연의 구멍 가운데와 반지름
  MAPS.push({
    id: 'ironhollow-orichalcum', cat: 'village', sub: true, parent: 'ironhollow', name: '오리하르콘 광산', en: 'Ironhollow · The Orichalcum Deep', color: '#4ae0d0', seed: 1307, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    spawn: [30, G + 1, 46],
    desc: '금광산 아래 수직갱을 타고 내려온 가장 깊은 갱도. 거대한 동굴의 벽마다 청록빛 오리하르콘 광맥이 금속처럼 번들거리고 결정이 숨 쉬듯 빛난다. 서쪽엔 누가 팠는지 모를 고대 갱도의 룬 지주가 남아 있고, 동쪽 바닥은 지열로 붉게 갈라졌다. 동남쪽의 커다란 구멍은 끝을 알 수 없는 심연으로 떨어진다.',
    info: { title: '장소 정보', en: 'THE ORICHALCUM DEEP', rows: [['도착장', '승강기 머리틀 · 쇠우리'], ['대동굴', '오리하르콘 광맥 · 거대 결정 · 지열 균열'], ['깊은 곳', '고대 룬 갱도 · 심연의 구멍']] },
    sky: ['#0c1a1c', '#040808', '#1e4a4a'], stars: false,
    hemi: ['#b8e0e0', '#0a1414', 0.54], sun: ['#a8f0e8', 0.46, [0.4, 1, 0.6]],
    day: { sky: ['#1e3a3a', '#0a1414', '#3a6a68'], stars: false, hemi: ['#d0f0f0', '#142020', 0.6], sun: ['#d0fff8', 0.58, [0.4, 1, 0.6]], haze: '#2a4a4a' },
    fog: { start: 0.92, floor: 0, depth: 14, haze: [12, 0.14, 12], hazeColor: '#102626' },
    falls: [{ box: [HC[0] - HR - 4, 0, HC[1] - HR - 4, HC[0] + HR + 4, 10, HC[1] + HR + 4], goto: 'abyss', toast: '심연으로 떨어진다…' }],
    camY: 4, zoom: 1.4,
    particles: [
      { n: 80, colors: ['#6a7a78', '#4a5856', '#8a9a98'], mode: 'drift', speed: 0.3, wind: 0.2, area: [80, 80, 60], y0: G + 2, y1: G + 28, glow: false },
      { n: 80, colors: ['#5af0e0', '#a8fff4', '#ffffff'], mode: 'rise', speed: 0.35, area: [84, 70, 24], y0: G + 2, y1: G + 36 },
      { n: 50, colors: ['#e0e8e8', '#c0c8c8', '#ff9a5a'], mode: 'rise', speed: 0.8, area: [124, 66, 14], y0: G - 2, y1: G + 24 },
      { n: 40, colors: ['#1a1424', '#2a2034', '#4a4058'], mode: 'rise', speed: 0.5, area: [HC[0], HC[1], 12], y0: G - 20, y1: G + 10, glow: false },
    ],
    blocks: {
      rk1: { c: '#4a5250', v: 0.07, pat: 'big' }, rk2: { c: '#3a4240', v: 0.07, pat: 'big' }, rk3: { c: '#5a605c', v: 0.07, pat: 'big' }, rkR: { c: '#4a4a56', v: 0.07, pat: 'big' }, basalt: { c: '#222628', v: 0.06, pat: 'stone' },
      rock: { c: '#4a504c', top: '#5a605a', v: 0.1, pat: 'stone' }, gravel: { c: '#4a504c', top: '#646a64', v: 0.12 }, scree: { c: '#4a504c', top: '#72786e', v: 0.14 }, grit: { c: '#323836', top: '#3c4240', v: 0.12 },
      rubble: { c: '#5a5e58', top: '#6a6e66', v: 0.16, pat: 'stone' }, scorch: { c: '#2a2422', top: '#3a2e28', v: 0.1 }, ash: { c: '#5a5450', top: '#6a625c', v: 0.08 },
      oriM: { c: '#2fb8b0', v: 0.05 }, oriD: { c: '#1a7a78', v: 0.05 }, oriG: { c: '#5af0e0', glow: true },
      crysT: { c: '#6af4e8', glow: true }, crysB: { c: '#5ab8ff', glow: true }, crysW: { c: '#e0fffa', glow: true },
      anc: { c: '#8a8a7e', v: 0.05, pat: 'brick' }, ancDk: { c: '#5e5e54', v: 0.05, pat: 'brick' }, ancSlab: { c: '#6e6e64', v: 0.06, pat: 'floor' }, rune: { c: '#7ae8ff', glow: true },
      bronze: { c: '#c08a3a', v: 0.06 }, bronzeDk: { c: '#94652a', v: 0.05 }, iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#26262c', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 },
      timber: { c: '#5a3a24', v: 0.06, pat: 'log' }, timberDk: { c: '#40281a', v: 0.05 }, plank: { c: '#6a4a2e', v: 0.08, pat: 'plank' }, rope: { c: '#a89070', v: 0.04 },
      fireY: { c: '#ffe090', glow: true }, ember: { c: '#ff6a2a', glow: true }, molten: { c: '#ffa040', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const lights = [], acts = [], landmarks = [];

      // ───────── 바위와 빈 곳 ─────────
      const ell = (x, z, cx, cz, rx, rz) => (Math.hypot((x - cx) / rx, (z - cz) / rz) - 1) * Math.min(rx, rz);
      const cap = (x, z, ax, az, bx, bz, r) => MH.segDist(x, z, ax, az, bx, bz) - r;
      const rooms = (x, z) => Math.min(
        ell(x, z, 30, 30, 20, 18), cap(x, z, 30, 40, 40, 56, 9),               // 승강기 도착장
        ell(x, z, 86, 72, 44, 32),                                             // 거대한 동굴
        cap(x, z, 26, 50, 26, 124, 10), ell(x, z, 40, 132, 22, 14), cap(x, z, 30, 96, 50, 90, 8),   // 고대 갱도와 룬 제단
        ell(x, z, HC[0], HC[1], 27, 23), cap(x, z, 100, 96, 106, 104, 10));    // 심연의 구멍 방
      const forced = (x, z) => (x >= 12 && x <= 48 && z >= 14 && z <= 48) || (x >= 18 && x <= 34 && z >= 48 && z <= 124) || (x >= 114 && x <= 130 && z >= 54 && z <= 70);
      const sdN = (x, z) => rooms(x, z) + (n.fbm(x * 0.07, z * 0.07, 3) - 0.5) * 7;
      // 구멍 가장자리: 각도마다 들쭉날쭉한 반지름
      const holeD = (x, z) => {
        const dx = x - HC[0], dz = z - HC[1], a = Math.atan2(dz, dx);
        const r = HR + (n.fbm(Math.cos(a) * 1.6 + 7, Math.sin(a) * 1.6 + 7, 3) - 0.5) * 9 + (hash3(Math.round(a * 9), 41, 0) - 0.5) * 1.6;
        return Math.hypot(dx, dz) - r;
      };
      // 지열 균열: 꺾인 선 몇 가닥
      const FIS = [[[104, 50], [112, 58], [110, 66], [120, 72], [126, 82]], [[120, 72], [130, 64], [138, 66]], [[110, 66], [100, 70]]];
      const fisD = (x, z) => { let d = 1e9; for (const L of FIS) for (let i = 0; i < L.length - 1; i++) d = Math.min(d, MH.segDist(x, z, L[i][0], L[i][1], L[i + 1][0], L[i + 1][1])); return d + (n.fbm(x * 0.3, z * 0.3, 2) - 0.5) * 1.4; };
      let sx_ = -1, sz_ = -1, so_ = 0;
      const strata = (x, z, y) => {
        if (x !== sx_ || z !== sz_) { sx_ = x; sz_ = z; so_ = x * 0.12 + z * 0.05 + n.fbm(x * 0.03, z * 0.03, 2) * 18; }
        if (y < 14 + hash3(x >> 3, 1, z >> 3) * 6) return B.basalt;
        const r = hash3(Math.floor((y + so_) / 4), 37, 3);
        return r < 0.42 ? B.rk1 : r < 0.66 ? B.rk2 : r < 0.86 ? B.rk3 : B.rkR;
      };
      MH.terrain(w, {
        floor: 0,
        height: (x, z) => {
          const sd = sdN(x, z), open = forced(x, z) || sd < 0;
          if (open) {
            const hd = holeD(x, z);
            if (hd < 0) {
              // 구멍 안: 가장자리 바로 안쪽에 무너져 걸린 바위 턱이 드문드문, 나머지는 바닥까지 뚫림
              if (hd > -1.6 && hash3(x >> 1, 42, z >> 1) > 0.72) return G - 4 - Math.round(hash3(x, 43, z) * 10);
              return -1;
            }
            if (hd < 4) return G - Math.round(3 * MH.sstep(4, 0, hd) + (n.fbm(x * 0.3, z * 0.3, 2) - 0.5) * 1.6);   // 안으로 기운 무너진 가장자리
            const fd = fisD(x, z);
            if (fd < 1.3) return G - 6;
            if (forced(x, z)) return G;
            return G + Math.max(0, Math.round((sd + 3) * 0.8 * MH.sstep(0.42, 0.6, n.fbm(x * 0.09, z * 0.09 + 5, 2))));
          }
          let top = G + 14 + n.fbm(x * 0.05, z * 0.05, 3) * 12 + 26 * MH.sstep(30, 6, z) + 20 * MH.sstep(24, 4, x);
          top = MH.lerp(top, G + 6 + n.fbm(x * 0.2, z * 0.2, 2) * 3, Math.max(MH.sstep(140, 152, z), MH.sstep(146, 154, x)));
          return Math.max(G + 8, Math.round(top + Math.min(3, sd * 0.4)));
        },
        surface: (x, z, y, s) => {
          if (y < G - 3) return strata(x, z, y);
          if (y <= G + 2) {
            if (y > G) return B.scree;
            const hd = holeD(x, z), fd = fisD(x, z);
            if (hd < 6) return hash3(x >> 1, 44, z >> 1) > 0.5 ? B.rubble : B.grit;
            if (fd < 4) return fd < 2.2 ? B.scorch : B.ash;
            const v = n.fbm(x * 0.08, z * 0.08, 3);
            return v < 0.36 ? B.grit : v > 0.64 ? B.scree : B.gravel;
          }
          if (s >= 3) return strata(x, z, y);
          return n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.scree : B.rock;
        },
        under: (x, z, y) => strata(x, z, y),
      });

      // ───────── 오리하르콘 광맥: 청록 금속 띠와 빛나는 결정 알갱이(대동굴 벽은 진하게) ─────────
      const solidRock = id => id === B.rk1 || id === B.rk2 || id === B.rk3 || id === B.rkR || id === B.rock || id === B.scree;
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        const top = MH.g(w, x, z); if (top <= G + 2) continue;
        const rich = Math.hypot((x - 86) / 50, (z - 72) / 38) < 1.15 ? 1 : 0;
        if (!rich && hash3(x >> 3, 4, z >> 3) < 0.82) continue;
        for (let y = G + 1; y <= Math.min(top - 1, G + 44); y++) {
          if (!solidRock(w.get(x, y, z))) continue;
          if (w.get(x + 1, y, z) && w.get(x - 1, y, z) && w.get(x, y, z + 1) && w.get(x, y, z - 1)) continue;
          const t = x * 0.45 - y * 0.8 + z * 0.5 + n.fbm(x * 0.04, z * 0.04 + y * 0.03, 2) * 20, f = Math.abs(((t / 14) % 1 + 1) % 1 - 0.5);
          const hq = hash3(x >> 1, y >> 1, z >> 1);
          if (f < 0.06 && n.fbm(x * 0.1 + y * 0.05, z * 0.1, 2) > 0.58 - rich * 0.18) S(x, y, z, hq > 0.62 ? B.oriG : hq > 0.3 ? B.oriM : B.oriD);
          else if (f < 0.12 && hash3(x, y, z) > 0.94 - rich * 0.08) S(x, y, z, B.crysT);
        }
      }

      // ───────── 육각 기둥 결정 ─────────
      const crystal = (T, x, y, z, h, r, lx, lz, core) => {
        for (let k = 0; k < h; k++) {
          const t = k / h, rr = t < 0.7 ? r : r * (1 - t) / 0.3 + 0.3, cx = Math.round(x + lx * k), cz = Math.round(z + lz * k), R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (Math.abs(dx) + Math.abs(dz) * 0.58 <= rr + 0.2 && Math.abs(dz) <= rr) T.set(cx + dx, y + k, cz + dz, k >= h - 2 ? B.crysW : ((dx + dz + k) % 5 === 0 ? B.crysW : core));
        }
      };

      // ───────── 승강기 도착장: 갱목 머리틀 속 쇠우리(위층 금광산으로) ─────────
      const CR = 6, LX = 28, LZ = 28, UP = 24;
      for (let z = LZ - CR; z <= LZ + CR; z++) for (let x = LX - CR; x <= LX + CR; x++) MH.setH(w, x, z, G - 1, B.ancSlab, B.rk2);
      for (let z = LZ - CR - 3; z <= LZ + CR + 6; z++) for (let x = LX - CR - 3; x <= LX + CR + 3; x++) if (MH.g(w, x, z) === G && (x < LX - CR || x > LX + CR || z < LZ - CR || z > LZ + CR)) S(x, G, z, (x + z) % 3 ? B.plank : B.timberDk);
      const TP = G + 52;
      for (const [x, z] of [[LX - CR - 2, LZ - CR - 2], [LX + CR + 1, LZ - CR - 2], [LX - CR - 2, LZ + CR + 1], [LX + CR + 1, LZ + CR + 1]]) w.box(x, G + 1, z, x + 1, TP, z + 1, B.timber);
      for (const y of [G + 16, G + 30, G + 44, TP]) {
        for (const z of [LZ - CR - 2, LZ + CR + 2]) w.box(LX - CR - 2, y, z, LX + CR + 2, y, z, B.timber);
        for (const x of [LX - CR - 2, LX + CR + 2]) w.box(x, y, LZ - CR - 2, x, y, LZ + CR + 2, B.timber);
      }
      for (const [y0, y1] of [[G + 17, G + 29], [G + 31, G + 43]]) {
        w.line(LX - CR - 1, y0, LZ - CR - 2, LX + CR + 1, y1, LZ - CR - 2, B.timberDk); w.line(LX - CR - 1, y1, LZ - CR - 2, LX + CR + 1, y0, LZ - CR - 2, B.timberDk);
        w.line(LX - CR - 2, y0, LZ - CR - 1, LX - CR - 2, y1, LZ + CR + 1, B.timberDk); w.line(LX - CR - 2, y1, LZ - CR - 1, LX - CR - 2, y0, LZ + CR + 1, B.timberDk);
      }
      for (const z of [LZ - 3, LZ + 3]) w.box(LX - CR - 2, TP + 1, z, LX + CR + 2, TP + 1, z, B.timber);
      w.box(LX - CR - 2, TP + 1, LZ, LX - 1, TP + 1, LZ, B.timber); w.box(LX + 1, TP + 1, LZ, LX + CR + 2, TP + 1, LZ, B.timber);
      for (const x of [LX - 1, LX + 1]) w.box(x, TP + 2, LZ, x, TP + 7, LZ, B.timber);
      const sheave = w.prop({ name: 'orisheave', pivot: [LX + 0.5, TP + 7.5, LZ + 0.5], axis: 'x' });
      MH.ringProp(sheave, LX, TP + 7, LZ, 5, 'yz', B.bronze, B.iron, 6); MH.ringProp(sheave, LX, TP + 7, LZ, 4, 'yz', B.bronzeDk);
      for (let k = -3; k <= 3; k++) { sheave.set(LX, TP + 7 + k, LZ, B.iron); sheave.set(LX, TP + 7, LZ + k, B.iron); }
      const cage = w.prop({ name: 'orilift', pivot: [LX + 0.5, G, LZ + 0.5] }), cTop = G + 12;
      cage.box(LX - CR, G, LZ - CR, LX + CR, G, LZ + CR, B.plank);
      for (let k = -CR; k <= CR; k += 3) cage.box(LX - CR, G, LZ + k, LX + CR, G, LZ + k, B.timberDk);
      for (const [x, z] of [[LX - CR, LZ - CR], [LX + CR, LZ - CR], [LX - CR, LZ + CR], [LX + CR, LZ + CR]]) cage.box(x, G + 1, z, x, cTop - 1, z, B.iron);
      for (let k = -CR; k <= CR; k++) {
        for (const [x, z] of [[LX + k, LZ - CR], [LX - CR, LZ + k], [LX + CR, LZ + k]]) { if (k % 2 === 0) cage.box(x, G + 1, z, x, G + 5, z, B.iron); cage.set(x, G + 5, z, B.bronze); }
      }
      cage.walls(LX - CR, cTop, LZ - CR, LX + CR, cTop, LZ + CR, B.iron);
      for (let k = -CR + 2; k <= CR - 2; k += 4) cage.box(LX + k, cTop, LZ - CR, LX + k, cTop, LZ + CR, B.iron);
      cage.box(LX - 1, cTop, LZ - 1, LX + 1, cTop, LZ + 1, B.bronze);
      const ropeLen = TP - cTop;
      MH.rope(w, 'orirope', LX, TP, LZ, ropeLen, B.rope);
      const lamp = (x, y, z) => { S(x, y + 2, z, B.iron); S(x, y + 1, z, B.fireY); S(x, y, z, B.fireY); S(x, y - 1, z, B.ironDk); };
      for (const x of [LX - CR - 3, LX + CR + 3]) lamp(x, G + 14, LZ + CR + 3);
      lights.push({ name: 'landing', p: [LX + 0.5, G + 15, LZ + CR + 4], c: '#ffb050', i: 0.8, d: 30, flicker: 0.2, srcR: 10 });

      // ───────── 거대한 동굴: 한가운데 큰 결정 무리(부품)와 둘레의 작은 무리 ─────────
      const KX = 84, KZ = 70;
      w.ellipsoid(KX, G, KZ, 7, 2, 7, B.rk2, (dx, dy) => dy >= 0);
      const big = w.prop({ name: 'oricrystal', pivot: [KX + 0.5, G + 2, KZ + 0.5] });
      crystal(big, KX, G + 3, KZ, 28, 3.2, 0, 0, B.crysT);
      crystal(big, KX - 4, G + 2, KZ + 3, 18, 2.2, -0.28, 0.16, B.crysB);
      crystal(big, KX + 4, G + 2, KZ - 3, 20, 2.2, 0.24, -0.2, B.crysT);
      crystal(big, KX + 3, G + 2, KZ + 4, 13, 1.6, 0.22, 0.26, B.crysB);
      crystal(big, KX - 4, G + 2, KZ - 4, 11, 1.4, -0.22, -0.26, B.crysT);
      for (let i = 0, made = 0; i < 600 && made < 26; i++) {
        const a = w.r(0, Math.PI * 2), rr = w.r(12, 40), x = Math.round(KX + Math.cos(a) * rr), z = Math.round(KZ + Math.sin(a) * rr * 0.75);
        const gg = MH.g(w, x, z); if (gg < G || gg > G + 3 || w.get(x, gg + 1, z) || holeD(x, z) < 8 || fisD(x, z) < 6) continue;
        if ((x > 62 && x < 88 && z > 36 && z < 62) || (x > 112 && x < 132 && z > 52 && z < 72)) continue;   // 막장·증기 구멍 자리는 비운다
        const k = w.ri(2, 4), core = made % 3 ? B.crysT : B.crysB;
        for (let q = 0; q < k; q++) crystal(w, x + w.ri(-1, 1), gg + 1, z + w.ri(-1, 1), w.ri(4, 11), w.r(0.8, 1.5), Math.cos(a) * w.r(-0.1, 0.35), Math.sin(a) * w.r(-0.1, 0.35), core);
        made++;
      }
      lights.push({ name: 'crystal', p: [KX + 0.5, G + 16, KZ + 0.5], c: '#5af0e0', i: 1.1, d: 50, flicker: 0.05, srcR: 6 });
      landmarks.push({ name: '오리하르콘 대동굴', note: '청록 광맥과 숨 쉬듯 빛나는 거대 결정', p: [KX, G + 48, KZ], tag: 'ORICHALCUM' });

      // ───────── 광맥 막장: 북쪽 벽 아래 오리하르콘 바위와 곡괭이(부품) ─────────
      const OX = 74, OZ = 46;
      w.ellipsoid(OX, G + 1, OZ, 7, 5, 4, B.oriD, (dx, dy) => dy >= -1);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -7; dx <= 7; dx++) for (let dy = 0; dy <= 5; dy++) {
        if (w.get(OX + dx, G + 1 + dy, OZ + dz) !== B.oriD) continue;
        const hq = hash3(OX + dx, dy, OZ + dz);
        S(OX + dx, G + 1 + dy, OZ + dz, hq > 0.72 ? B.oriG : hq > 0.42 ? B.oriM : hq > 0.2 ? B.oriD : B.rk2);
      }
      const PZ = OZ + 9;
      w.box(OX - 2, G + 1, PZ - 1, OX + 2, G + 2, PZ + 1, B.ancDk);
      for (const x of [OX - 2, OX + 2]) w.box(x, G + 3, PZ, x, G + 5, PZ, B.timber);
      S(OX - 1, G + 4, PZ, B.iron); S(OX + 1, G + 4, PZ, B.iron);
      const pick = w.prop({ name: 'oripick', pivot: [OX + 0.5, G + 4.5, PZ + 0.5], axis: 'x' });
      pick.box(OX, G + 4, PZ, OX, G + 12, PZ, B.timber); pick.set(OX, G + 5, PZ, B.timberDk);
      pick.box(OX, G + 13, PZ - 4, OX, G + 13, PZ + 3, B.steel); pick.box(OX, G + 12, PZ - 1, OX, G + 14, PZ + 1, B.iron);
      pick.set(OX, G + 12, PZ - 4, B.steel); pick.set(OX, G + 12, PZ + 3, B.steel);
      lights.push({ name: 'vein', p: [OX + 0.5, G + 7, OZ + 1], c: '#5af0e0', i: 0.8, d: 32, flicker: 0.08, srcR: 6 });

      // ───────── 고대 갱도: 룬 새긴 돌 지주(몇은 무너짐), 갈라진 돌판 바닥, 끝의 룬 제단과 돌 고리(부품) ─────────
      for (let z = 50; z <= 124; z++) for (let x = 18; x <= 34; x++) if (MH.g(w, x, z) === G && n.fbm(x * 0.12, z * 0.12 + 50, 2) > 0.38) S(x, G, z, hash3(x >> 1, 45, z >> 1) > 0.85 ? B.ancDk : B.ancSlab);
      const pillar = (x, z, h, broken) => {
        for (let y = G + 1; y <= G + h; y++) for (let dz = 0; dz <= 1; dz++) for (let dx = 0; dx <= 1; dx++) {
          if (broken && y > G + h - 3 && hash3(x + dx, y, z + dz) > 0.5) continue;
          S(x + dx, y, z + dz, (y - G) % 5 === 0 ? B.ancDk : B.anc);
        }
        // 룬: 지주 네 면에 세로로 새긴 빛나는 홈
        for (let y = G + 3; y <= G + Math.min(h - 2, 12); y += 2) {
          const r = hash3(x, y, z);
          if (r > 0.25) S(x + (r > 0.6 ? 0 : 1), y, z - 0 + (r > 0.6 ? 0 : 1), B.rune);
        }
      };
      let pk = 0;
      for (let z = 56; z <= 120; z += 12, pk++) {
        const broken = pk === 2 || pk === 4;
        for (const x of [18, 33]) pillar(x, z, broken && x === 33 ? 9 : 16, broken && x === 33);
        if (!broken) { w.box(18, G + 17, z, 34, G + 18, z + 1, B.anc); for (let x = 21; x <= 31; x += 2) S(x, G + 17, z - 1 + 1, x % 4 === 1 ? B.rune : B.ancDk); }
        else for (let k = 0; k < 4; k++) S(29 - k * 2, G + 1, z + 3 + (k & 1), B.anc), S(30 - k * 2, G + 1, z + 3 + (k & 1), B.ancDk);   // 쓰러진 지주 토막
      }
      // 룬 제단: 계단 돌단 위 세운 돌 고리(부품)
      const AX = 40, AZ = 134;
      w.box(AX - 7, G + 1, AZ - 4, AX + 7, G + 1, AZ + 4, B.ancDk); w.box(AX - 5, G + 2, AZ - 3, AX + 5, G + 2, AZ + 3, B.anc);
      for (const x of [AX - 7, AX + 7]) { w.box(x, G + 2, AZ, x, G + 10, AZ, B.anc); S(x, G + 11, AZ, B.rune); }
      const ring = w.prop({ name: 'runering', pivot: [AX + 0.5, G + 10.5, AZ + 0.5], axis: 'z' });
      MH.ringProp(ring, AX, G + 10, AZ, 6, 'xy', B.anc, B.rune, 8); MH.ringProp(ring, AX, G + 10, AZ, 5, 'xy', B.ancDk, B.rune, 4);
      for (let k = -2; k <= 2; k++) { ring.set(AX + k, G + 10, AZ, k ? B.ancDk : B.rune); ring.set(AX, G + 10 + k, AZ, k ? B.ancDk : B.rune); }
      lights.push({ name: 'rune', p: [26.5, G + 14, 80.5], c: '#7ae8ff', i: 0.7, d: 34, flicker: 0.1, srcR: 9 });
      lights.push({ name: 'altar', p: [AX + 0.5, G + 10, AZ - 2], c: '#7ae8ff', i: 0.9, d: 30, flicker: 0.1, srcR: 7 });
      landmarks.push({ name: '고대 룬 갱도', note: '누가 팠는지 모를 룬 새긴 돌 지주', p: [26, G + 34, 92], tag: 'RUNES' });

      // ───────── 지열 균열: 붉게 달아오른 틈(바닥은 녹은 바위)과 증기 구멍(돌 뚜껑 부품) ─────────
      for (let z = 2; z < D - 2; z++) for (let x = 2; x < W - 2; x++) {
        if (MH.g(w, x, z) !== G - 6) continue;
        S(x, G - 6, z, hash3(x, 46, z) > 0.4 ? B.molten : B.ember);
        for (let y = G - 5; y <= G - 3; y++) for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const id = w.get(x + dx, y, z + dz); if (id && id !== B.molten && hash3(x + dx, y, z + dz) > 0.55) S(x + dx, y, z + dz, y === G - 5 ? B.ember : B.basalt); }
      }
      const VX_ = 122, VZ = 62;
      for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) {
        const d = Math.hypot(dx, dz); if (d > 4.4) continue;
        const h = Math.round(3 - d * 0.6);
        for (let y = G + 1; y <= G + h; y++) S(VX_ + dx, y, VZ + dz, d < 1.6 ? 0 : (hash3(dx, y, dz) > 0.5 ? B.scorch : B.basalt));
        if (d < 1.6) { for (let y = G - 4; y <= G; y++) S(VX_ + dx, y, VZ + dz, 0); S(VX_ + dx, G - 5, VZ + dz, B.molten); }
      }
      const lid = w.prop({ name: 'ventstone', pivot: [VX_ + 0.5, G + 3, VZ + 0.5] });
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.hypot(dx, dz) <= 2.3) { lid.set(VX_ + dx, G + 3, VZ + dz, B.basalt); if (Math.hypot(dx, dz) < 1.2) lid.set(VX_ + dx, G + 4, VZ + dz, B.scorch); }
      lights.push({ name: 'fissure', p: [112.5, G - 2, 62.5], c: '#ff7a3a', i: 1, d: 40, flicker: 0.35, srcR: 6 });
      lights.push({ name: 'vent', p: [VX_ + 0.5, G + 2, VZ + 0.5], c: '#ff8a4a', i: 0.8, d: 26, flicker: 0.3, srcR: 7 });

      // ───────── 심연의 구멍: 무너진 가장자리 바위, 갈라짐, 낮은 경고 돌무더기(군데군데 틈) ─────────
      for (let z = HC[1] - HR - 12; z <= HC[1] + HR + 12; z++) for (let x = HC[0] - HR - 12; x <= HC[0] + HR + 12; x++) {
        const hd = holeD(x, z); if (hd < 0 || hd > 9) continue;
        const a = Math.atan2(z - HC[1], x - HC[0]);
        // 구멍에서 바깥으로 뻗은 갈라짐(좁고 깊은 금)
        const ray = Math.abs(((a * 7 / Math.PI + n.fbm(x * 0.05, z * 0.05, 2) * 2) % 1 + 1) % 1 - 0.5);
        if (ray < 0.05 && hd < 7 - hash3(Math.round(a * 7), 47, 0) * 4) { const g = MH.g(w, x, z); for (let y = g - 4; y <= g; y++) S(x, y, z, 0); w.hm[x + W * z] = g - 5; }
      }
      // 가장자리에 걸린 무너진 바위 덩이
      for (let i = 0, made = 0; i < 400 && made < 12; i++) {
        const a = w.r(0, Math.PI * 2), rr = HR + w.r(0, 6), x = Math.round(HC[0] + Math.cos(a) * rr), z = Math.round(HC[1] + Math.sin(a) * rr);
        const hd = holeD(x, z); if (hd < 0.5 || hd > 4 || MH.g(w, x, z) < G - 4) continue;
        if (Math.abs(x - HC[0]) < 8 && z < HC[1]) continue;   // 북쪽 뛰어드는 자리는 비운다
        MH.rock(w, x, MH.g(w, x, z), z, w.r(1.2, 2.4), hash3(x, 48, z) > 0.5 ? B.rubble : B.rk3);
        made++;
      }
      // 경고 돌무더기: 둘레 13곳 중 몇 곳을 비워 둔다
      for (let k = 0; k < 13; k++) {
        if (k === 9 || k === 4 || k === 0) continue;
        const a = k / 13 * Math.PI * 2 + 0.2;
        let r = HR; while (holeD(Math.round(HC[0] + Math.cos(a) * r), Math.round(HC[1] + Math.sin(a) * r)) < 5 && r < HR + 14) r += 0.5;
        const x = Math.round(HC[0] + Math.cos(a) * r), z = Math.round(HC[1] + Math.sin(a) * r), g = MH.g(w, x, z);
        if (g < G - 2 || g > G + 1) continue;
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
          const hh = Math.round(2.4 - Math.hypot(dx, dz) * 0.8 + hash3(x + dx, 49, z + dz) * 0.8);
          for (let y = 1; y <= hh; y++) S(x + dx, g + y, z + dz, (y + dx + dz) & 1 ? B.rubble : B.rk3);
        }
        if (k % 3 === 1) { S(x, g + 3, z, B.rk1); S(x, g + 4, z, B.rubble); }
      }
      // 뛰어드는 자리(북쪽 가장자리): 오래된 쇠 등 기둥과 낭떠러지로 기운 바위(부품)
      const JX = HC[0], JZ = HC[1] - HR - 6;
      w.box(JX + 6, G + 1, JZ - 2, JX + 6, G + 12, JZ - 2, B.ironDk); w.box(JX + 4, G + 13, JZ - 2, JX + 6, G + 13, JZ - 2, B.iron); lamp(JX + 4, G + 10, JZ - 2);
      lights.push({ name: 'brink', p: [JX + 4.5, G + 11, JZ - 1], c: '#ffb050', i: 0.6, d: 26, flicker: 0.3, srcR: 4 });
      let rz = JZ + 1; while (holeD(JX, rz + 3) > 0.6 && rz < HC[1]) rz++;
      const rg = MH.g(w, JX, rz);
      const boulder = w.prop({ name: 'brinkrock', pivot: [JX + 0.5, rg + 1, rz + 0.5] });
      boulder.ellipsoid(JX, rg + 2, rz, 2.2, 1.8, 2, B.rubble, (dx, dy) => dy >= -1);
      landmarks.push({ name: '심연의 구멍', note: '끝을 알 수 없는 어둠 속으로 뚫린 구멍', p: [HC[0], G + 26, HC[1]], tag: 'ABYSS' });

      // ───────── 바닥의 바위와 종유석 기둥 ─────────
      const KEEP = [[8, 10, 50, 52], [14, 46, 38, 150], [60, 36, 90, 62], [70, 56, 100, 86], [116, 50, 140, 72], [80, 92, 146, 150]];
      const kept = (x, z) => KEEP.some(([a, b, c, d]) => x >= a - 2 && x <= c + 2 && z >= b - 2 && z <= d + 2);
      for (let i = 0, made = 0; i < 900 && made < 24; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), gg = MH.g(w, x, z);
        if (gg !== G || kept(x, z) || w.get(x, gg + 1, z) || fisD(x, z) < 5 || holeD(x, z) < 10) continue;
        let near = 0; for (const [dx, dz] of [[4, 0], [-4, 0], [0, 4], [0, -4]]) if (MH.g(w, x + dx, z + dz) > G + 6) near++;
        if (near) { const h = w.ri(6, 16), r = w.r(1.3, 2.6); for (let k = 0; k < h; k++) w.cyl(x, z, gg + 1 + k, gg + 1 + k, r * Math.pow(1 - k / h, 0.8) + 0.3, k < h * 0.3 ? B.rk2 : B.rk3); }
        else MH.rock(w, x, gg, z, w.r(1.2, 2.6), hash3(x, 5, z) > 0.5 ? B.rock : B.rk3);
        made++;
      }

      // ───── 상호작용 ─────
      const ease = t => t * t * (3 - 2 * t);
      acts.push({
        name: '승강기 타고 위로', hint: '쇠우리 승강기에 올라타면 머리틀 도르래가 끼익 돌며 위층 금광산으로 올라가요', ride: 'orilift', goto: 'ironhollow-goldmine',
        hit: [LX - CR, G + 1, LZ - CR, LX + CR, G + 13, LZ + CR],
        run: async a => {
          a.flash('landing', 2.2, 1);
          a.burst([LX + 0.5, G + 1, LZ + 0.5], { n: 20, colors: ['#6a7a78', '#8a9a98'], speed: 3, up: 2, life: 1, gravity: 6, spread: 5 });
          await a.wait(0.3);
          await Promise.all([a.move('orilift', [0, UP, 0], 5, ease), a.rope('orirope', ropeLen, ropeLen - UP, 5, ease), a.turn('orisheave', [10, 0, 0], 5, ease)]);
        },
      });
      acts.push({
        name: '심연으로 뛰어들기', hint: '구멍 가장자리 바위가 굴러떨어지고 검은 바람과 먼지가 솟구쳐요 — 그 바람 속으로 심연에 뛰어들어요', goto: 'abyss',
        hit: [JX - 6, G - 2, JZ - 3, JX + 6, G + 8, JZ + 5],
        run: async a => {
          a.wind(3, 3);
          await a.turn('brinkrock', [0.5, 0, 0], 0.6);
          a.path('brinkrock', [[0, -1, 4], [0, -10, 8], [0, -34, 10]], 1.6);
          for (let k = 0; k < 7; k++) {
            a.burst([HC[0] + 0.5, G - 14, HC[1] + 0.5], { n: 34, colors: ['#0a0810', '#1a1424', '#3a3048', '#6a6474'], speed: 5, up: 22, life: 1.6, gravity: -2, spread: HR * 0.6, glow: false });
            await a.wait(0.35);
          }
          a.flash('brink', 0.2, 1);
          await a.wait(0.4);
          await a.respawn('brinkrock', 0.05);
        },
      });
      acts.push({
        name: '오리하르콘 캐기', hint: '곡괭이가 청록 광맥 바위를 깡! 깡! 내리찍을 때마다 푸른 결정 조각이 번쩍이며 튀어요', hit: [OX - 8, G + 1, OZ - 5, OX + 8, G + 15, PZ + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('oripick', [0.35, 0, 0], 0.4);
            await a.turn('oripick', [-1.35, 0, 0], 0.22, t => t * t);
            a.flash('vein', 4, 0.3);
            a.burst([OX + 0.5, G + 5, OZ + 4], { n: 30, colors: ['#5af0e0', '#2fb8b0', '#ffffff', '#a8fff4'], speed: 10, up: 8, life: 0.8, gravity: 18, spread: 1.2 });
            await a.wait(0.2);
          }
          await a.turn('oripick', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '거대 결정 공명', hint: '한가운데 거대한 결정 무리가 떠올라 천천히 돌며 청록빛을 뿜고, 동굴 벽 광맥이 함께 울려요', hit: [KX - 8, G + 1, KZ - 8, KX + 8, G + 32, KZ + 8],
        run: async a => {
          a.flash('crystal', 4, 5); a.glow(1.9, 5);
          await a.tween('oricrystal', { off: [0, 4, 0], rot: [0, 0.6, 0], scl: [1.06, 1.06, 1.06] }, 1.4);
          for (let k = 0; k < 6; k++) { a.burst([KX + 0.5, G + 18, KZ + 0.5], { n: 28, colors: ['#5af0e0', '#5ab8ff', '#ffffff'], speed: 5, up: 3, life: 1.6, gravity: -0.8, spread: 5 }); await a.wait(0.4); }
          await a.tween('oricrystal', { off: [0, 0, 0], rot: [0, 0, 0], scl: [1, 1, 1] }, 1.4);
        },
      });
      acts.push({
        name: '룬 고리 깨우기', hint: '고대 제단의 돌 고리가 천천히 돌기 시작하면 갱도의 룬 지주들이 차례로 푸르게 깨어나요', hit: [AX - 8, G + 1, AZ - 5, AX + 8, G + 18, AZ + 5],
        run: async a => {
          a.flash('altar', 3.5, 4); a.flash('rune', 3, 4);
          await a.turn('runering', [0, 0, Math.PI * 2], 3.2, ease);
          for (let z = 116; z >= 56; z -= 12) a.burst([26, G + 10, z + 0.5], { n: 12, colors: ['#7ae8ff', '#ffffff'], speed: 2, up: 2, life: 1, gravity: -0.5, spread: 6 });
          a.unwind('runering'); await a.turn('runering', [0, 0, 0], 0.1);
        },
      });
      acts.push({
        name: '지열 균열 분출', hint: '증기 구멍이 우르릉 울리더니 돌 뚜껑이 퐁 솟구치고, 뜨거운 증기와 불티가 균열을 따라 뿜어져 나와요', hit: [VX_ - 5, G + 1, VZ - 5, VX_ + 5, G + 10, VZ + 5],
        run: async a => {
          for (let k = 0; k < 3; k++) { await a.move('ventstone', [0, 0.6, 0], 0.12); await a.move('ventstone', [0, 0, 0], 0.12); }
          a.flash('vent', 4, 2); a.flash('fissure', 2.5, 2.4);
          a.tween('ventstone', { off: [1, 12, 1], rot: [1.4, 0, 0.8] }, 0.8, t => 1 - (1 - t) * (1 - t));
          for (let k = 0; k < 6; k++) {
            a.burst([VX_ + 0.5, G + 3, VZ + 0.5], { n: 30, colors: ['#e8eeee', '#c8d0d0', '#ffffff'], speed: 4, up: 18, life: 1.4, gravity: -3, spread: 1.6 });
            a.burst([112, G - 2, 62], { n: 14, colors: ['#ff7a2a', '#ffb04a', '#ffe08a'], speed: 3, up: 9, life: 0.9, gravity: 10, spread: 4 });
            await a.wait(0.3);
          }
          await a.tween('ventstone', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6, t => t * t);
          a.burst([VX_ + 0.5, G + 4, VZ + 0.5], { n: 20, colors: ['#3a2e28', '#6a625c'], speed: 4, up: 3, life: 0.7, gravity: 16, spread: 2 });
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
