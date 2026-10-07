// 썩은 숲 HD — 독 늪 분지, 얼굴 있는 천년 고목, 버섯 군락, 거미 둥지, 북동쪽 언덕의 이끼 덮인 환상열석 (320칸, 1칸 ≈ 25cm)
// 2배 해상도로 다시 지었다: 결(세로 골)이 진 고목 줄기와 굵기가 줄어드는 뿌리·가지, 줄기 표면에 판 눈두덩·코·이빨 난 입,
// 띠로 나눈 잎뭉치와 늘어진 이끼 가닥, 주름(방사형)·턱받이·밑둥 혹이 있는 거대 버섯, 판자 이음줄·장선·밧줄 난간 판자길,
// 창틀·덧문·판자문·손잡이·겹 이엉 지붕이 있는 기둥 오두막과 다리 달린 솥, 깎인 선돌과 계단 제단, 바위 선반이 있는 늑대 굴,
// 가장자리부터 서서히 깊어지는 늪(진흙·모래·자갈 바닥, 수초), 무리 지은 이끼·병든 풀·버섯 땅. playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 320, D = 320, Hh = 256;
  // 터짐(입자) 크기도 2배로
  const P2 = o => Object.assign({}, o, { n: Math.round((o.n || 40) * 1.4), speed: (o.speed || 4) * 2, up: (o.up != null ? o.up : 3) * 2, spread: (o.spread || 1) * 2, gravity: (o.gravity != null ? o.gravity : 3) * 2 });
  MAPS.push({
    id: 'forest', cat: 'dungeon', name: '썩은 숲', en: 'Rotting Wood', color: '#7fa66b', seed: 23, base: 48, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '포자와 독이 뒤덮은 숲. 나무조차 사냥감을 기다린다. 북동쪽 언덕에는 옛 드루이드들이 세운 환상열석이 가시덩굴에 묻혀 있고, 늪가에는 독두꺼비가 웅크리고 있다.',
    info: { title: '장소 정보', en: 'ROTTING WOOD', rows: [['자리', '독 늪 분지 · 사방이 언덕'], ['한가운데', '얼굴 있는 천년 고목'], ['북동쪽 언덕', '이끼 덮인 환상열석 · 가시덩굴 제단']] },
    monsters: { normal: ['광기의 늑대인간', '썩은 버섯괴물', '독거미 무리', '독두꺼비'], mid: '거미 여왕', boss: '고목의 마녀' },
    sky: ['#0e150f', '#26331f', '#56682c'], stars: false,
    hemi: ['#b0cc92', '#1f1a12', 0.66], sun: ['#e6e0a8', 0.72, [0.5, 1, 0.45]],
    night: { sky: ['#060a08', '#0c1410', '#1e3a24'], stars: true, hemi: ['#6a9a80', '#0c0e0a', 0.42], sun: ['#9ac8b0', 0.3, [0.5, 1, 0.45]], haze: '#16261c' },
    liquid: ['#18301a', '#355f25', '#b6e866'], liqSpeed: 0.6,
    fog: { start: 0.76, floor: 32, depth: 20, haze: [56, 0.4, 12], hazeColor: '#3e5234' },
    camY: 8, zoom: 1.1,
    particles: [
      { n: 560, colors: ['#d4f07a', '#a6d05a', '#f0e6a0'], mode: 'drift', speed: 0.7, y0: 52, y1: 140 },
      { n: 130, colors: ['#f7ff9a', '#c8ff6a'], mode: 'wisp', speed: 1.6, size: 2, y0: 56 },
    ],
    blocks: {
      // 옆면도 흙빛 대신 짙은 이끼빛: 한 칸 턱이 검은 등고선으로 보이지 않게
      moss: { c: '#37522a', top: '#3c5a2b', v: 0.1 }, sick: { c: '#5a6a2a', top: '#66782c', v: 0.1 }, fung: { c: '#4e3454', top: '#5a3a5f', v: 0.1 },
      mud: { c: '#33311d', top: '#38361f', v: 0.08 }, soil: { c: '#382a20', v: 0.08 },
      silt: { c: '#4a4430', top: '#5e563a', v: 0.08 }, pebble: { c: '#4a4c44', top: '#5e6056', v: 0.12, pat: 'stone' }, weed: { c: '#2e5a2a', v: 0.12 },
      rock: { c: '#4a504a', v: 0.06, pat: 'stone' }, rockDk: { c: '#333833', v: 0.06, pat: 'stone' }, rockLt: { c: '#5a605a', v: 0.06, pat: 'big' },
      bark: { c: '#3b2a20', v: 0.08 }, barkDk: { c: '#261b15', v: 0.07 }, barkM: { c: '#4a3a2a', v: 0.08 },
      leaf: { c: '#2a4a2c', v: 0.1 }, leaf2: { c: '#35502a', v: 0.1 }, leafDk: { c: '#1c3020', v: 0.08 }, leafP: { c: '#4a2e56', v: 0.1 },
      vine: { c: '#2f4a26', v: 0.1 }, hang: { c: '#4a6a34', v: 0.1 },
      stem: { c: '#cfc5ad', v: 0.05 }, stemDk: { c: '#a89c84', v: 0.05 }, gill: { c: '#9a8a74', v: 0.05 }, cap: { c: '#8c2c4a', v: 0.07 }, cap2: { c: '#3a6d78', v: 0.07 }, capDk: { c: '#5a1a30', v: 0.06 }, cap2Dk: { c: '#244a54', v: 0.06 },
      web: { c: '#d2cfc2', v: 0.04 }, egg: { c: '#e7e0c6', v: 0.05 }, bone: { c: '#d8d0bc', v: 0.05 }, hole: { c: '#0e0c0a', v: 0 },
      plank: { c: '#5a4a32', v: 0.08, pat: 'plank' }, plankDk: { c: '#463826', v: 0.06, pat: 'plank' }, post: { c: '#3a2e22', v: 0.05 }, rope: { c: '#8a7a5a', v: 0.05 },
      thatch: { c: '#5a5230', v: 0.08 }, thatch2: { c: '#4a4428', v: 0.08 }, thatchDk: { c: '#3a3420', v: 0.06 }, door: { c: '#4a3a28', v: 0.03, pat: 'plank' }, iron: { c: '#2a2a2c', v: 0.03 }, shut: { c: '#3e4a2c', v: 0.04 },
      lily: { c: '#4a7a3a', v: 0.1 }, lilyF: { c: '#e8c8d8', v: 0.05 }, reed: { c: '#6a7a3a', v: 0.1 }, reedTop: { c: '#8a6a3a', v: 0.08 }, pot: { c: '#2a2a2c', v: 0.04 },
      spot: { c: '#f2f7a0', glow: true }, eye: { c: '#ffd54a', glow: true }, gmush: { c: '#8ff5dc', glow: true },
      lamp: { c: '#ffd890', night: true, day: '#6a5a3a' }, win: { c: '#ffd890', night: true, day: '#2a3020' }, brew: { c: '#9aff6a', glow: true },
      spid: { c: '#1c161a', v: 0.05 }, spidR: { c: '#c02a3a', glow: true }, bat: { c: '#221a22', v: 0.04 }, weye: { c: '#ffe040', glow: true },
      // 선돌·룬·가시덩굴·두꺼비·판석
      menhir: { c: '#6a6e66', v: 0.06, pat: 'big' }, menhirM: { c: '#4e6a3e', v: 0.08 }, rune: { c: '#7affc8', glow: true }, altar: { c: '#5a5c58', v: 0.05, pat: 'stone' },
      thorn: { c: '#3a2a22', v: 0.06 }, thornL: { c: '#5a3a5a', v: 0.08 }, berry: { c: '#d8406a', glow: true }, slate: { c: '#4a4e48', top: '#5e645a', v: 0.08, pat: 'stone' }, slate2: { c: '#4a4e48', top: '#525850', v: 0.08, pat: 'stone' },
      toad: { c: '#5a6a2a', v: 0.08 }, toadB: { c: '#c8c070', v: 0.06 }, toadS: { c: '#8a9a3a', v: 0.08 }, herb: { c: '#7a8a4a', v: 0.08 }, skull: { c: '#e0d8c4', v: 0.04 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, lvl = base + 2;
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const TX = 156, TZ = 110, RCX = 236, RCZ = 66;   // 고목, 환상열석 언덕
      const strata = new Int8Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) strata[x + W * z] = Math.floor(n.fbm(x * 0.02 + 31, z * 0.02, 2) * 12);
      // 물 밑 바닥: 무리 단위로 진흙·모래·자갈
      const bedAt = (x, z, y) => { const f = n.fbm(x * 0.05 + 50, z * 0.05, 2); return lvl - y <= 2 && f > 0.5 ? B.silt : f > 0.62 ? B.pebble : f < 0.36 ? B.silt : B.mud; };
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const xs = x / 2.5, zs = z / 2.5;
          const d = Math.hypot(xs - 64, zs - 72) / 66;
          const bowl = Math.pow(d, 2.2) * 36;
          const hum = (n.fbm(xs * 0.055, zs * 0.055) - 0.5) * 18 + (n.ridge(xs * 0.04 + 3, zs * 0.04, 3) - 0.4) * 9 + (n.fbm(x * 0.07 + 9, z * 0.07, 2) - 0.5) * 3;
          // 고목 둔덕·열석 언덕: 둥근 원뿔 대신 노이즈로 휜 가장자리, 꼭대기는 둥글게
          const dt = Math.hypot(x - TX, z - TZ) + (n.fbm(x * 0.04 + 70, z * 0.04, 2) - 0.5) * 22;
          const rise = 26 * MH.sstep(80, 18, dt);
          const dk = Math.hypot(x - RCX, z - RCZ) + (n.fbm(x * 0.05 + 90, z * 0.05, 2) - 0.5) * 16;
          const knoll = 15 * MH.sstep(56, 22, dk);
          let h = base - 10 + bowl + hum + rise + knoll;
          // 물속: 가장자리에서 서서히 깊어지고 너무 깊지 않게
          if (h < lvl + 0.5) h = lvl + 0.5 - Math.min(13, (lvl + 0.5 - h) * 0.7);
          return h;
        },
        surface: (x, z, y, s) => {
          if (y <= lvl) return bedAt(x, z, y);
          if (s >= 5) return B.rock;
          if (y <= lvl + 1) return B.mud;
          if (y <= lvl + 3) return hash3(x >> 2, 3, z >> 2) > 0.5 ? B.mud : B.moss;
          const f = n.fbm(x * 0.04 + 40, z * 0.04, 2);
          return f > 0.62 ? B.sick : f < 0.36 ? B.fung : B.moss;
        },
        // 바위 속살: 휘어진 지층 띠
        under: (x, z, y, dep, s) => { if (dep < 5 && s < 5) return y < lvl ? B.mud : B.soil; const k = ((y + strata[x + W * z]) >> 2) % 4; return k === 0 ? B.rockDk : k === 2 ? B.rockLt : B.rock; },
      });
      MH.water(w, lvl);
      const lights = [], acts = [], landmarks = [];
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      const LV = [B.leaf2, B.leaf, B.leafDk], LVP = [B.leaf2, B.leaf, B.leafDk, B.leafP];

      // ───────── 공통 도구 ─────────
      // 잎뭉치: 위는 밝고 아래는 어둡게 띠로 나눠 큰 면이 되게, 겉은 4칸 단위로 성기게
      const clump = (T, cx, cy, cz, r, L, k) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * (k || 0.68), X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz;
          if (d > 0.8 && hash3(x >> 2, y >> 2, z >> 2) < 0.22) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.3 ? L[2] : L[1];
          if (L[3] && d > 0.6 && hash3(x >> 1, y >> 1, z >> 1) > 0.95) b = L[3];
          if (!T.get(x, y, z)) T.set(x, y, z, b);
        }
      };
      // 늘어진 이끼 가닥
      const strands = (T, ex, ey, ez, r, cnt) => {
        for (let s = 0; s < cnt; s++) {
          const a = hash3(ex | 0, s, ez | 0) * 6.283, rr = r * (0.5 + hash3(s, ex | 0, 3) * 0.45);
          const hx = Math.round(ex + Math.cos(a) * rr), hz = Math.round(ez + Math.sin(a) * rr), len = 4 + ((hash3(hx, s, hz) * 11) | 0);
          let y = Math.round(ey);
          while (y > ey - r && !T.get(hx, y, hz)) y--;
          for (let q = 1; q <= len; q++) if (!T.get(hx, y - q, hz)) T.set(hx, y - q, hz, q > len - 3 ? B.vine : B.hang);
        }
      };
      // 굵기가 줄어드는 나무 줄기 조각
      const limb = (T, a, b, r0, r1, bk) => T.line(a[0], a[1], a[2], b[0], b[1], b[2], bk, t => r0 + (r1 - r0) * t);
      // 숲 나무: 밑동이 퍼진 줄기, 뿌리, 굽은 가지, 가지 끝 잎뭉치(버드나무는 늘어진 가닥)
      const tree = (x, y, z, o) => {
        const h = o.h, R0 = o.trunkR || 2.2, tw = o.kind === 'twisted';
        let px = x, pz = z;
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = R0 * (1 - t * 0.5) + Math.max(0, 4 - i) * 0.45, R = Math.ceil(rr);
          px = x + Math.round(Math.sin(i * 0.11 + x) * (tw ? 2.4 : 0.8)); pz = z + Math.round(Math.cos(i * 0.09 + z) * (tw ? 1.6 : 0.5));
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= rr * rr)
            w.set(px + dx, y + i, pz + dz, ((Math.floor((Math.atan2(dz, dx) + 4) * 2) + (i >> 3)) % 3 === 0) ? B.barkDk : B.bark);
        }
        for (let k = 0; k < 4; k++) {
          const a = k / 4 * 6.283 + hash3(x, k, z) * 1.2, l = R0 + 3 + hash3(z, k, x) * 3;
          limb(w, [x, y + 3, z], [x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l], 1.3, 0.6, B.barkDk);
        }
        const ends = [[px, y + h, pz, 1]], nb = o.nb || 4;
        for (let i = 0; i < nb; i++) {
          const a = i / nb * 6.283 + hash3(x, i, z) * 1.4, sy = y + Math.floor(h * (0.5 + hash3(z, i, x) * 0.3)), l = o.spread * (0.75 + hash3(i, x, z) * 0.35);
          const mx = x + Math.cos(a) * l * 0.55, mz = z + Math.sin(a) * l * 0.55, my = sy + l * (tw ? 0.15 : 0.3);
          const a2 = a + (hash3(i, z, x) - 0.5) * (tw ? 1.6 : 0.6), ex = mx + Math.cos(a2) * l * 0.5, ez = mz + Math.sin(a2) * l * 0.5, ey = my + l * 0.35;
          limb(w, [x, sy, z], [mx, my, mz], 1.3, 0.9, B.bark); limb(w, [mx, my, mz], [ex, ey, ez], 0.9, 0.5, B.bark);
          ends.push([ex, ey, ez, 0.85]);
        }
        if (!o.leaves) return;
        ends.forEach(([ex, ey, ez, k]) => {
          const r = o.r * k;
          clump(w, ex, ey + 1, ez, r, o.leaves);
          if (o.kind === 'willow') strands(w, ex, ey, ez, r, 5);
        });
      };
      // 이끼 덮인 바위: 노이즈로 울퉁불퉁, 위는 이끼·가운데 바위·아래 짙은 바위
      const boulder = (x, y, z, r, o) => {
        o = o || {};
        const rx = r * (o.sx || 1.15), ry = r * (o.sy || 0.7), rz = r * (o.sz || 0.95), X = Math.ceil(rx * 1.2), Y = Math.ceil(ry * 1.2), Z = Math.ceil(rz * 1.2);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -Z; dz <= Z; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = dx * dx / (rx * rx) + dy * dy / (ry * ry) + dz * dz / (rz * rz) + (n.fbm((x + dx) * 0.18, (y + dy) * 0.18 + (z + dz) * 0.13, 2) - 0.5) * 0.9;
          if (d > 1) continue;
          const top = dy > ry * 0.3 && hash3((x + dx) >> 2, 3, (z + dz) >> 2) > 0.3;
          w.set(x + dx, y + dy, z + dz, top ? B.moss : (dy < -ry * 0.25 ? B.rockDk : ((y + dy + (hash3((x + dx) >> 3, 1, (z + dz) >> 3) * 3 | 0)) >> 2) % 3 === 0 ? B.rockLt : B.rock));
        }
      };
      const pset = (p, x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z) && !p.get(x, y, z)) p.set(x, y, z, b); };

      // ══ 천년 고목 ══
      const tg = g(TX, TZ) + 1, TH = 104;
      const tcx = y => TX + Math.round(Math.sin(y * 0.05) * 3), tcz = y => TZ + Math.round(Math.cos(y * 0.04) * 2);
      const trR = y => { const t = (y - tg) / TH; return (6.6 - t * 3.2) * 2.4 + 9 * Math.exp(-(y - tg + 5) / 6); };
      for (let y = tg - 6; y < tg + TH; y++) {
        const r = trR(y), R = Math.ceil(r + 1), cx = tcx(y), cz = tcz(y);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const ang = Math.atan2(dz, dx), groove = Math.abs(Math.sin(ang * 9 + y * 0.06));
          const dd = Math.hypot(dx, dz) + (groove < 0.3 ? 0.9 : 0) + (hash3((cx + dx) >> 1, y >> 2, (cz + dz) >> 1) - 0.5) * 0.6;
          if (dd > r) continue;
          w.set(cx + dx, y, cz + dz, groove < 0.42 ? B.barkDk : hash3(Math.floor((ang + 4) * 4), y >> 3, 5) > 0.8 ? B.barkM : B.bark);
        }
      }
      // 뿌리: 줄기에서 굵게 나와 땅속으로 파고든다
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2 + 0.2, l = w.r(34, 52);
        const a2 = a + w.r(-0.3, 0.3), ex = TX + Math.cos(a2) * l, ez = TZ + Math.sin(a2) * l, a1 = a - (a2 - a) * 0.6, mx = TX + Math.cos(a1) * l * 0.45, mz = TZ + Math.sin(a1) * l * 0.45;
        const eg = Math.max(lvl - 2, g(ex, ez)), mg = Math.max(lvl, g(mx, mz)) + 2;
        limb(w, [TX, tg + 12, TZ], [mx, mg, mz], 5.4, 3.4, B.barkDk);
        limb(w, [mx, mg, mz], [ex, eg - 1, ez], 3.4, 1.0, B.bark);
      }
      // 얼굴(남쪽): 줄기 겉면을 따라 판다 — 찡그린 눈두덩과 빛나는 눈, 혹 같은 코, 이빨 난 입
      const surfZ = (x, y) => { for (let z = TZ + 40; z > TZ; z--) if (w.get(x, y, z)) return z; return TZ; };
      const fz = surfZ(TX, tg + 30), eyeY = tg + 40, eyeS = surfZ(TX - 7, eyeY);
      const carve = (x, y, depth, b) => { const sz = surfZ(x, y); for (let k = 0; k < depth; k++) w.set(x, y, sz - k, k === depth - 1 ? b : 0); return sz; };
      for (const [ex0, sg2] of [[TX - 10, 1], [TX + 4, -1]]) {
        for (let x = ex0; x < ex0 + 7; x++) for (let y = eyeY - 4; y <= eyeY + 4; y++) {
          const u = (x - ex0 - 3) / 3.6, v = (y - eyeY) / 4.4;
          if (u * u + v * v > 1) continue;
          const inner = (x - ex0 - 3) ** 2 / 4 + (y - eyeY + 0.5) ** 2 / 2.2 <= 1;
          carve(x, y, inner ? 4 : 3, inner ? B.eye : B.hole);
        }
        // 찡그린 눈두덩(안쪽이 낮다)
        for (let x = ex0 - 1; x <= ex0 + 7; x++) {
          const by = eyeY + 5 + Math.round(((x - ex0) * sg2 + (sg2 < 0 ? 7 : 0)) * 0.35), sz = surfZ(x, by - 1);
          w.box(x, by, sz + 1, x, by + 1, sz + 2, B.barkDk); w.set(x, by + 2, sz + 1, B.barkDk);
        }
      }
      // 코: 눈 사이 아래로 불룩한 혹
      for (let y = tg + 31; y <= tg + 37; y++) for (let x = TX - 2; x <= TX + 2; x++) {
        const k = Math.abs(x - TX) <= (y < tg + 33 ? 2 : 1) ? 1 + (y < tg + 33 ? 1 : 0) : 0;
        const sz = surfZ(x, y); for (let q = 1; q <= k; q++) w.set(x, y, sz + q, B.barkM);
      }
      // 입: 테두리는 두툼하게 튀어나오고 안은 깊은 구멍, 위아래 이빨
      const MY0 = tg + 16, MY1 = tg + 29, mouthZ = new Map();
      for (let x = TX - 10; x <= TX + 10; x++) {
        const half = 6.5 * Math.sqrt(Math.max(0, 1 - ((x - TX) / 10.5) ** 2)), cy = (MY0 + MY1) / 2 - Math.abs(x - TX) * 0.18;
        for (let y = MY0 - 1; y <= MY1 + 1; y++) {
          const dy = Math.abs(y - cy);
          if (dy <= half) {
            const sz = carve(x, y, 7, B.hole);
            mouthZ.set(x * 1000 + y, sz);
            const tooth = (dy > half - 2.2) && ((x + 20) % 4 < 2) && Math.abs(x - TX) < 9;
            if (tooth) w.set(x, y, sz - 2, B.bone);
          } else if (dy <= half + 1.6) { const sz = surfZ(x, y); w.set(x, y, sz + 1, B.barkDk); }
        }
      }
      lights.push({ name: 'eyes', p: [TX + 0.5, eyeY, eyeS - 1], c: '#ffd04a', i: 0.9, d: 40, flicker: 0.2, srcR: 10 });
      // 가지와 수관 — 두 가지는 흔들리는 부품(뿌리가 줄기에 묻혀 있어 겹침 허용)
      [[0.3, 34], [1.3, 32], [2.4, 36], [3.4, 32], [4.4, 34], [5.4, 32]].forEach(([a, l], k) => {
        const sy = tg + 64 + (k % 3) * 4, ex = TX + Math.cos(a) * l, ez = TZ + Math.sin(a) * l, ey = sy + w.r(14, 22);
        const T = k === 0 ? w.prop({ name: 'armA', pivot: [TX + 0.5, sy, TZ + 0.5], axis: 'z', clipOK: 2600 }) : k === 3 ? w.prop({ name: 'armB', pivot: [TX + 0.5, sy, TZ + 0.5], axis: 'x', clipOK: 2600 }) : w;
        const mx = TX + Math.cos(a) * l * 0.55, mz = TZ + Math.sin(a) * l * 0.55, my = sy + (ey - sy) * 0.4;
        limb(T, [TX, sy - 4, TZ], [mx, my, mz], 4.4, 3, B.bark); limb(T, [mx, my, mz], [ex, ey, ez], 3, 1.6, B.bark);
        // 곁가지 둘
        const ends = [[ex, ey, ez, 11]];
        for (const s of [-1, 1]) {
          const a2 = a + s * 0.7, fx = mx + Math.cos(a2) * l * 0.4, fz2 = mz + Math.sin(a2) * l * 0.4, fy = my + w.r(6, 12);
          limb(T, [mx, my, mz], [fx, fy, fz2], 2, 1, B.barkDk); ends.push([fx, fy, fz2, 8]);
        }
        const L = k % 2 ? LVP : LV;
        ends.forEach(([x, y, z, r]) => { clump(T, x, y + 3, z, r, L); strands(T, x, y + 3, z, r, 7); });
      });
      for (const [dx, dz, r] of [[0, 0, 15], [-12, 6, 11], [11, -6, 11], [4, 12, 10], [-6, -12, 10]]) clump(w, TX + dx, tg + TH + 10 + (r < 12 ? -3 : 0), TZ + dz, r, LVP);
      acts.push({
        name: '고목의 눈', hint: '마녀가 눈을 뜨고 가지를 휘둘러요', hit: [TX - 12, tg + 14, Math.min(fz, eyeS) - 4, TX + 12, tg + 48, Math.max(fz, eyeS) + 4],
        run: async a => {
          a.flash('eyes', 6, 3.6); a.glow(1.6, 3.6);
          for (let k = 0; k < 3; k++) {
            await Promise.all([a.turn('armA', [0, 0, 0.1], 0.5), a.turn('armB', [-0.1, 0, 0], 0.5)]);
            a.burst([TX + 28, tg + 88, TZ + 12], P2({ n: 30, colors: ['#35502a', '#4a6a34', '#66782c'], speed: 4, up: 1, life: 2.6, gravity: 1.5, spread: 6 }));
            await Promise.all([a.turn('armA', [0, 0, -0.08], 0.5), a.turn('armB', [0.08, 0, 0], 0.5)]);
          }
          await Promise.all([a.turn('armA', [0, 0, 0], 0.6), a.turn('armB', [0, 0, 0], 0.6)]);
        },
      });
      landmarks.push({ name: '천년 고목', note: '보스 · 고목의 마녀', p: [TX + 0.5, tg + TH + 24, TZ + 0.5], boss: true });

      // ══ 거대 버섯 군락(서쪽) ══
      // 밑둥 혹 · 가늘어지는 줄기 · 처진 턱받이 · 방사형 주름 · 테 두른 갓 · 무리 지은 반점
      const mush = (T, cx, cz, h, R, cap) => {
        const gy = Math.max(lvl, g(cx, cz)) + 1, capD = cap === B.cap2 ? B.cap2Dk : B.capDk;
        for (let y = gy - (T === w ? 2 : 0); y < gy + h; y++) {
          const t = (y - gy) / h, r = 3 + (1 - t) * 0.8 + Math.max(0, 3 - (y - gy)) * 0.7;
          T.cyl(cx, cz, y, y, r, y < gy + 3 ? B.stemDk : B.stem);
        }
        const ry = gy + Math.round(h * 0.62);
        T.ring(cx, cz, ry, 2.6, 5.6, B.stem); T.ring(cx, cz, ry - 1, 4.2, 6, B.stemDk); T.ring(cx, cz, ry - 2, 5, 6.2, B.stemDk);
        const top = gy + h;
        T.ellipsoid(cx, top, cz, R, R * 0.58, R, cap, (dx, dy) => dy >= 0);
        T.ring(cx, cz, top, R - 2.4, R + 0.4, capD); T.ring(cx, cz, top - 1, R - 2.2, R - 0.6, capD);
        // 주름: 갓 밑면에 방사형 줄
        const RR = Math.ceil(R);
        for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
          const d = Math.hypot(dx, dz); if (d > R - 1 || d < 3.2) continue;
          if (Math.floor((Math.atan2(dz, dx) + 4) * R * 0.9) % 2 === 0) T.set(cx + dx, top - 1, cz + dz, B.gill);
          else T.set(cx + dx, top, cz + dz, B.gill);
        }
        // 반점: 2×2 무리로 갓 겉면에
        for (let k = 0; k < R * 3; k++) {
          const a = w.r(0, Math.PI * 2), rr = w.r(0.15, 0.85) * R, sx = Math.round(cx + Math.cos(a) * rr), sz = Math.round(cz + Math.sin(a) * rr);
          for (const [ox, oz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
            let sy = top + Math.ceil(R * 0.6);
            while (sy > top && !T.get(sx + ox, sy, sz + oz)) sy--;
            if (T.get(sx + ox, sy, sz + oz) === cap) T.set(sx + ox, sy, sz + oz, B.spot);
          }
        }
        return top + Math.round(R * 0.58);
      };
      const MX = 76, MZ = 200;
      MH.flatten(w, MX - 6, MZ - 6, MX + 6, MZ + 6, Math.max(lvl + 2, g(MX, MZ)), B.moss, B.soil);
      const big = w.prop({ name: 'shroom', pivot: [MX + 0.5, g(MX, MZ) + 1, MZ + 0.5], axis: 'x' });
      const bigTop = mush(big, MX, MZ, 44, 18, B.cap);
      lights.push({ name: 'spore', p: [MX + 0.5, bigTop + 6, MZ + 0.5], c: '#e0f080', i: 1, d: 40, flicker: 0.1, srcR: 16 });
      for (const [mx, mz, h, R, c] of [[104, 230, 26, 11, B.cap2], [44, 236, 20, 9, B.cap], [54, 164, 18, 8, B.cap2], [100, 176, 14, 7, B.cap], [192, 40, 30, 12, B.cap2], [280, 120, 18, 8, B.cap], [270, 270, 24, 10, B.cap], [52, 200, 12, 6, B.cap], [90, 256, 16, 7, B.cap2], [24, 140, 22, 9, B.cap]]) {
        const top = mush(w, mx, mz, h, R, c);
        if (c === B.cap2) lights.push({ p: [mx + 0.5, top + 4, mz + 0.5], c: '#7ff0d0', i: 1.1, d: 30, flicker: 0.05, srcR: 14 });
      }
      // 작은 버섯 무리
      for (const [mx, mz] of [[64, 214], [88, 190], [70, 182], [40, 220], [112, 214], [96, 240]]) {
        for (let k = 0; k < 4; k++) {
          const x = mx + w.ri(-4, 4), z = mz + w.ri(-4, 4), gy = g(x, z); if (gy <= lvl || w.get(x, gy + 1, z)) continue;
          const hh = w.ri(2, 4); w.box(x, gy + 1, z, x, gy + hh, z, B.stem); w.box(x - 1, gy + hh + 1, z - 1, x + 1, gy + hh + 1, z + 1, k % 2 ? B.cap : B.cap2); w.set(x, gy + hh + 2, z, k % 2 ? B.capDk : B.gmush);
        }
      }
      acts.push({
        name: '거대 버섯', hint: '갓이 흔들리며 포자를 뿜어요', hit: [MX - 16, bigTop - 8, MZ - 16, MX + 16, bigTop + 8, MZ + 16],
        run: async a => {
          a.flash('spore', 4, 2.6);
          for (let k = 0; k < 3; k++) {
            await a.turn('shroom', [0.07, 0, 0], 0.28);
            a.burst([MX + 0.5, bigTop + 4, MZ + 0.5], P2({ n: 80, colors: ['#e0f080', '#f7ff9a', '#b8e050'], speed: 8, up: 5, life: 3, gravity: 0.4, spread: 6 }));
            await a.turn('shroom', [-0.07, 0, 0], 0.32);
          }
          await a.turn('shroom', [0, 0, 0], 0.5);
        },
      });
      landmarks.push({ name: '포자 군락', note: '썩은 버섯괴물 출몰', p: [MX + 0.5, bigTop + 20, MZ + 0.5] });

      // ══ 거미 여왕의 둥지(동쪽) ══
      const SX = 250, SZ = 190;
      const deadTree = (x, y, z, h) => {
        for (let i = 0; i < h; i++) {
          const rr = 2.8 * (1 - i / h * 0.6) + Math.max(0, 4 - i) * 0.5, R = Math.ceil(rr), ox = Math.round(Math.sin(i * 0.17 + x) * 1.6);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= rr * rr) w.set(x + ox + dx, y + i, z + dz, (Math.floor((Math.atan2(dz, dx) + 4) * 2) + (i >> 3)) % 3 ? B.barkDk : B.bark);
        }
        for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.5; limb(w, [x, y + 3, z], [x + Math.cos(a) * 7, y - 1, z + Math.sin(a) * 7], 1.4, 0.6, B.barkDk); }
        for (let k = 0; k < 5; k++) {
          const a = k / 5 * 6.283 + hash3(x, k, z), sy = y + Math.floor(h * (0.5 + k * 0.08)), l = w.r(8, 13);
          const ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + w.r(4, 9);
          limb(w, [x, sy, z], [ex, ey, ez], 1.2, 0.6, B.barkDk);
          const a2 = a + w.r(-1, 1); w.line(ex, ey, ez, ex + Math.cos(a2) * 5, ey + w.r(2, 6), ez + Math.sin(a2) * 5, B.barkDk);
          w.line(ex, ey, ez, ex + Math.cos(a2 + 1.4) * 4, ey - 2, ez + Math.sin(a2 + 1.4) * 4, B.barkDk);
        }
      };
      const tops = [[SX - 20, SZ - 24, 44], [SX + 24, SZ - 20, 38], [SX - 16, SZ + 28, 36], [SX + 28, SZ + 24, 46]].map(([px, pz, h]) => { const gy = Math.max(lvl, g(px, pz)) + 1; deadTree(px, gy, pz, h); return [px, gy + h - 6, pz]; });
      const sg = Math.max(lvl, g(SX, SZ)) + 1;
      for (let i = 0; i < tops.length; i++) for (let j = i + 1; j < tops.length; j++) {
        const [ax, ay, az] = tops[i], [bx, by, bz] = tops[j];
        w.line(ax, ay, az, bx, by - 6, bz, B.web); w.line(ax, ay - 14, az, bx, by, bz, B.web);
        for (let t = 0.2; t < 0.9; t += 0.12) w.line(ax + (bx - ax) * t, ay + (by - 6 - ay) * t, az + (bz - az) * t, SX, sg + 12, SZ, B.web);
      }
      // 둥지: 성긴 거미줄 돔(4칸 단위로 뚫림), 입구
      w.sphere(SX, sg, SZ, 13, B.web, (dx, dy, dz) => dy >= 0 && (Math.hypot(dx, dy, dz) > 11.8 || dy === 0) && hash3((dx + 40) >> 1, (dy + 40) >> 1, (dz + 40) >> 1) > 0.25);
      w.box(SX - 2, sg, SZ + 10, SX + 2, sg + 7, SZ + 14, B.hole);
      // 매달린 고치(먹이)
      for (const [cx, cy, cz] of [[SX - 12, 34, SZ - 20], [SX + 18, 28, SZ + 20], [SX + 4, 36, SZ - 24], [SX + 24, 24, SZ - 10]]) { w.ellipsoid(cx, sg + cy, cz, 2.4, 4.8, 2.4, B.web); w.set(cx, sg + cy - 2, cz + 2, B.bone); w.line(cx, sg + cy + 4, cz, cx, sg + cy + 12, cz, B.web); }
      const EX = 220, EZ = 196, eg2 = Math.max(lvl, g(EX, EZ)) + 1;
      MH.flatten(w, EX - 8, EZ - 8, EX + 8, EZ + 8, eg2 - 1, B.moss, B.soil);
      const eggs = w.prop({ name: 'eggs', pivot: [EX + 0.5, eg2, EZ + 0.5], axis: 'z' });
      for (const [ex, ez] of [[EX - 4, EZ - 2], [EX, EZ + 4], [EX + 4, EZ - 4], [EX + 2, EZ], [EX - 4, EZ + 4], [EX - 6, EZ - 6]]) { eggs.ellipsoid(ex, eg2 + 3, ez, 2.2, 3.6, 2.2, B.egg); eggs.set(ex, eg2 + 7, ez, B.web); eggs.set(ex, eg2 + 6, ez + 1, B.web); }
      acts.push({
        name: '거미 알 무더기', hint: '알이 떨리더니 새끼 거미가 쏟아져요', hit: [EX - 8, eg2, EZ - 8, EX + 6, eg2 + 8, EZ + 6],
        run: async a => {
          for (let k = 0; k < 6; k++) { await a.tween('eggs', { rot: [0, 0, 0.12], scl: [1.1, 1.22, 1.1] }, 0.1); await a.tween('eggs', { rot: [0, 0, -0.12], scl: [1, 1, 1] }, 0.1); }
          await a.tween('eggs', { rot: [0, 0, 0], off: [0, 2.8, 0], scl: [1.35, 1.7, 1.35] }, 0.2); await a.tween('eggs', { off: [0, 0, 0], scl: [1, 1, 1] }, 0.35);
          for (let k = 0; k < 3; k++) { a.burst([EX + 0.5, eg2 + 4, EZ + 0.5], P2({ n: 50, colors: ['#1a1616', '#2a2420', '#e7e0c6'], speed: 8, up: 2, life: 2.2, gravity: 5, spread: 3, flat: true })); await a.wait(0.35); }
        },
      });
      landmarks.push({ name: '거미 여왕의 둥지', note: '중간 보스 · 거미 여왕', p: [SX + 0.5, sg + 52, SZ + 0.5], mid: true });

      // ══ 늑대 굴(북서쪽 바위) ══
      const WX = 50, WZ = 84, wg = g(WX, WZ);
      for (const [rx, rz, r, sy] of [[WX, WZ - 4, 18, 0.8], [WX - 20, WZ + 14, 12, 0.7], [WX + 22, WZ - 18, 12, 0.75], [WX - 16, WZ - 22, 10, 0.7], [WX + 18, WZ + 10, 8, 0.65], [WX - 26, WZ - 4, 10, 0.6], [WX + 32, WZ - 4, 8, 0.6]]) boulder(rx, wg + Math.round(r * 0.35), rz, r, { sy });
      // 굴: 동굴 입을 파고 바닥은 어둠, 입 위에 돌 선반 처마
      w.ellipsoid(WX + 2, wg + 6, WZ + 12, 8, 8, 10, 0, (dx, dy) => dy >= -4);
      w.box(WX - 4, wg, WZ + 6, WX + 8, wg, WZ + 20, B.hole);
      for (let x = WX - 7; x <= WX + 11; x++) { const sz = WZ + 19 + (hash3(x >> 1, 4, 1) > 0.5 ? 1 : 0); w.box(x, wg + 13, sz - 3, x, wg + 14, sz, B.rockDk); }
      for (const [dx, dz, r] of [[-9, 24, 3], [12, 23, 2.5], [-6, 28, 2], [16, 18, 3]]) boulder(WX + dx, g(WX + dx, WZ + dz) + 1, WZ + dz, r);
      for (let i = 0; i < 22; i++) {
        const x = WX + w.ri(-8, 12), z = WZ + w.ri(20, 32), gy = g(x, z) + 1;
        if (w.get(x, gy, z)) continue;
        if (i % 3) { const ax = w.chance(0.5); w.box(x, gy, z, x + (ax ? 2 : 0), gy, z + (ax ? 0 : 2), B.bone); }
        else { w.box(x, gy, z, x + 1, gy + 1, z + 1, B.skull); w.set(x, gy + 1, z + 1, B.hole); }
      }
      landmarks.push({ name: '늑대 굴', note: '광기의 늑대인간 은신처', p: [WX + 0.5, wg + 34, WZ + 0.5] });

      // ══ 늪을 건너는 판자길: 2칸 널판(이음줄) · 장선 · 기둥 · 밧줄 난간 ══
      const walk = [[170, 316], [176, 276], [156, 240], [170, 200], [158, 152]];
      const DECK = lvl + 2;
      for (let i = 0; i < walk.length - 1; i++) {
        const [ax, az] = walk[i], [bx, bz] = walk[i + 1], nn = Math.ceil(Math.hypot(bx - ax, bz - az));
        for (let s = 0; s <= nn; s++) {
          const cx = Math.round(ax + (bx - ax) * s / nn), cz = Math.round(az + (bz - az) * s / nn);
          for (let k = -3; k <= 4; k++) {
            const x = cx + k;
            if (g(x, cz) > DECK) continue;
            const edge = k === -3 || k === 4;
            w.set(x, DECK, cz, cz % 3 === 0 ? B.plankDk : B.plank);
            if (g(x, cz) < DECK - 1 && (edge || k === 0 || k === 1)) w.set(x, DECK - 1, cz, B.post);
            if (edge && s % 8 === 0) { for (let y = g(x, cz) + 1; y < DECK; y++) w.set(x, y, cz, B.post); w.box(x, DECK + 1, cz, x, DECK + 6, cz, B.post); }
            if (edge && s % 8 !== 0) w.set(x, DECK + 5 - (s % 8 > 2 && s % 8 < 6 ? 1 : 0), cz, B.rope);
          }
        }
      }
      // ══ 늪 위 기둥 오두막(마녀의 약초막) ══
      const HX = 210, HZ = 260, hy = lvl + 12;
      const hx0 = HX + 2, hx1 = HX + 17, hz0 = HZ + 4, hz1 = HZ + 15, fh = 12;
      for (const [px, pz] of [[HX - 2, HZ - 4], [HX + 19, HZ - 4], [HX - 2, HZ + 17], [HX + 19, HZ + 17], [HX + 8, HZ + 17], [HX + 8, HZ - 4]]) {
        for (let y = Math.min(lvl, g(px, pz)) - 1; y < hy; y++) w.box(px, y, pz, px + 1, y, pz + 1, B.post);
        limb(w, [px + 0.5, hy - 2, pz + 0.5], [px + 0.5 + (px < HX + 8 ? 4 : px > HX + 8 ? -4 : 0), hy - 7, pz + 0.5 + (pz < HZ ? 0 : 0)], 0.6, 0.6, B.post);
      }
      for (let z = HZ - 4; z <= HZ + 18; z++) for (let x = HX - 2; x <= HX + 20; x++) {
        const edge = x === HX - 2 || x === HX + 20 || z === HZ - 4 || z === HZ + 18;
        w.set(x, hy - 1, z, edge ? B.post : (x % 3 === 0 ? B.plankDk : B.plank));
        if (edge) w.set(x, hy - 2, z, B.post);
      }
      // 벽: 세로 판자(이음줄), 모서리 기둥, 위아래 띠 들보
      for (let y = hy; y < hy + fh; y++) for (let z = hz0; z <= hz1; z++) for (let x = hx0; x <= hx1; x++) {
        const ex = x === hx0 || x === hx1, ez = z === hz0 || z === hz1;
        if (!ex && !ez) continue;
        const corner = ex && ez, beam = y === hy || y === hy + fh - 1 || y === hy + 6;
        w.set(x, y, z, corner || beam ? B.post : ((ex ? z : x) % 3 === 0 ? B.plankDk : B.plank));
      }
      // 판자문(서쪽): 5폭 9높이, 테두리 살·빗장·쇠 손잡이·경첩, 문틀
      const dzc = HZ + 9;
      for (let y = hy; y < hy + 9; y++) for (let z = dzc - 2; z <= dzc + 2; z++) { w.set(hx0, y, z, 0); w.set(hx0 + 1, y, z, (z === dzc - 2 || z === dzc + 2 || y === hy + 8 || y === hy + 4) ? B.post : B.door); }
      w.set(hx0, hy + 4, dzc + 1, B.iron); w.set(hx0, hy + 2, dzc - 2, B.iron); w.set(hx0, hy + 6, dzc - 2, B.iron);
      for (let y = hy; y <= hy + 9; y++) { w.set(hx0 - 1, y, dzc - 3, B.post); w.set(hx0 - 1, y, dzc + 3, B.post); }
      w.box(hx0 - 1, hy + 9, dzc - 4, hx0 - 1, hy + 9, dzc + 4, B.post);
      // 창: 빛나는 유리, 가운데 살, 창틀·창턱·덧문
      const winZ = (z0, side) => {   // 남·북 벽
        const zz = side > 0 ? hz1 : hz0;
        for (let y = hy + 7; y <= hy + 10; y++) for (let x = z0; x < z0 + 4; x++) w.set(x, y, zz, (x === z0 + 1 || y === hy + 9) ? B.post : B.win);
        for (let x = z0 - 1; x <= z0 + 4; x++) { w.set(x, hy + 6, zz + side, B.post); w.set(x, hy + 11, zz + side, B.post); }
        for (let y = hy + 7; y <= hy + 10; y++) { w.box(z0 - 3, y, zz + side, z0 - 2, y, zz + side, B.shut); w.box(z0 + 4, y, zz + side, z0 + 5, y, zz + side, B.shut); }
      };
      winZ(hx0 + 4, 1); winZ(hx0 + 10, 1); winZ(hx0 + 6, -1);
      for (let y = hy + 7; y <= hy + 10; y++) for (let z = dzc - 2; z <= dzc + 1; z++) w.set(hx1, y, z, (z === dzc - 1 || y === hy + 9) ? B.post : B.win);
      // 겹 이엉 박공지붕(용마루는 x축), 두꺼운 처마 끝
      const rov = 3, ry0 = hy + fh - 1, zc = (hz0 + hz1) / 2;
      let peak = ry0;
      for (let z = hz0 - rov; z <= hz1 + rov; z++) {
        const s = Math.min(z - (hz0 - rov), (hz1 + rov) - z), y = ry0 - rov + s + 1;
        for (let x = hx0 - 3; x <= hx1 + 3; x++) {
          const hh = hash3(x, s, 11);
          w.set(x, y, z, s === 0 ? B.thatchDk : ((x + (s >> 1) * 3) % 7 === 0 ? B.thatch2 : hh > 0.85 ? B.thatchDk : B.thatch));
          w.set(x, y - 1, z, s === 0 ? B.thatchDk : B.thatch2);
          if (Math.abs(z - zc) < 0.6 || s === Math.floor((hz1 - hz0 + 2 * rov) / 2)) { w.set(x, y + 1, z, B.thatchDk); if (x % 5 === 0) w.set(x, y + 2, z, B.post); }
          if (z >= hz0 && z <= hz1 && (x === hx0 || x === hx1)) for (let yy = ry0; yy < y - 1; yy++) w.set(x, yy, z, (z % 3 === 0) ? B.plankDk : B.plank);
        }
        peak = Math.max(peak, y + 2);
      }
      // 오두막 앞 계단(서쪽으로 내려가 판자길에 닿는다)과 이어지는 널길
      const nSt = hy - 1 - DECK;
      for (let s = 1; s <= nSt; s++) {
        const x0 = HX - 2 - s * 2, top = hy - 1 - s;
        w.box(x0 - 1, top, dzc - 3, x0, top, dzc + 3, B.plank);
        for (const zz of [dzc - 3, dzc + 3]) for (let y = Math.max(g(x0, zz), lvl - 2); y < top; y++) if (s % 2 === 0) w.set(x0, y, zz, B.post);
      }
      for (let x = HX - 3 - nSt * 2; x >= 176; x--) for (let z = dzc - 3; z <= dzc + 3; z++) if (g(x, z) <= DECK) { w.set(x, DECK, z, x % 3 === 0 ? B.plankDk : B.plank); if (x % 10 === 0 && (z === dzc - 3 || z === dzc + 3)) for (let y = g(x, z) + 1; y < DECK; y++) w.set(x, y, z, B.post); }
      // 솥: 다리 셋, 불룩한 몸통, 테, 끓는 약
      const PX0 = HX + 13, PZ0 = HZ;
      for (let y = hy; y <= hy + 4; y++) { const r = y === hy ? 2 : y === hy + 4 ? 2.6 : 3; w.ring(PX0, PZ0, y, y === hy ? 0 : r - 1.1, r, B.pot); }
      w.cyl(PX0, PZ0, hy + 1, hy + 1, 2, B.pot); w.cyl(PX0, PZ0, hy + 3, hy + 3, 2, B.brew);
      w.ring(PX0, PZ0, hy + 5, 1.6, 3.4, B.iron);
      w.box(hx0 - 1, hy + 10, dzc + 5, hx0 - 3, hy + 10, dzc + 5, B.iron); w.box(hx0 - 4, hy + 7, dzc + 4, hx0 - 3, hy + 8, dzc + 5, B.lamp); w.box(hx0 - 4, hy + 9, dzc + 4, hx0 - 3, hy + 9, dzc + 5, B.iron);
      lights.push({ p: [hx0 - 3, hy + 8, dzc + 5], c: '#ffd080', i: 1.2, d: 28, flicker: 0.25, night: true });
      lights.push({ name: 'brew', p: [PX0 + 0.5, hy + 6, PZ0 + 0.5], c: '#90ff60', i: 0.8, d: 20, flicker: 0.3 });
      landmarks.push({ name: '늪 위 약초막', note: '누군가 끓이다 만 솥이 있다', p: [HX + 10, peak + 10, HZ + 10] });

      // ── 늪가의 독두꺼비(부품): 그루터기 위에서 늪으로 첨벙 뛰어든다 ──
      let toadAt = null;
      for (let r = 0; r < 80 && !toadAt; r += 2) for (let k = 0; k < 32 && !toadAt; k++) {
        const a = k / 32 * Math.PI * 2, x = Math.round(140 + Math.cos(a) * r), z = Math.round(216 + Math.sin(a) * r), gy = g(x, z);
        if (gy < lvl + 1 || gy > lvl + 3 || w.get(x, gy + 1, z) || MH.polyDist(x, z, walk) < 10 || Math.hypot(x - MX, z - MZ) < 28 || Math.hypot(x - HX - 9, z - HZ - 7) < 30) continue;
        let ok = true;
        for (let s2 = 8; s2 <= 24 && ok; s2++) if (!wet(x + Math.round(s2 * 0.6), z + Math.round(s2 * 0.8))) ok = false;
        for (let dz = -6; dz <= 6 && ok; dz++) for (let dx = -6; dx <= 6; dx++) if (w.get(x + dx, gy + 6, z + dz) || w.get(x + dx, gy + 12, z + dz)) ok = false;
        if (ok) toadAt = [x, gy, z];
      }
      // ══ 늪 장식: 뒤틀린 나무·버드나무, 수련, 갈대, 발광 버섯, 쓰러진 통나무, 바위 ══
      const AZ = RCZ + 24;
      const busy = (x, z) => Math.hypot(x - RCX, z - RCZ - 8) < 44 || Math.hypot(x - WX, z - WZ - 12) < 34 || Math.hypot(x - TX, z - TZ) < 52 || Math.hypot(x - SX, z - SZ) < 40 || Math.hypot(x - MX, z - MZ) < 40 || Math.hypot(x - HX - 9, z - HZ - 7) < 26 || MH.polyDist(x, z, walk) < 10 || (toadAt && Math.hypot(x - toadAt[0], z - toadAt[1]) < 16);
      for (let i = 0; i < 52; i++) {
        const x = w.ri(8, 311), z = w.ri(8, 311), gy = g(x, z);
        if (gy <= lvl + 1 || busy(x, z) || w.get(x, gy + 1, z) || w.get(x, gy + 12, z)) continue;
        const kind = i % 3 ? 'willow' : 'twisted';
        tree(x, gy + 1, z, { kind, h: w.ri(20, 32), trunkR: w.r(2, 2.8), spread: w.r(9, 12), r: w.r(6.5, 9), leaves: LV, nb: 3 + (i % 2) });
      }
      for (let i = 0; i < 26; i++) {
        const x = w.ri(10, 309), z = w.ri(10, 309), gy = g(x, z);
        if (gy <= lvl || busy(x, z) || w.get(x, gy + 1, z)) continue;
        boulder(x, gy, z, w.r(2.5, 5));
      }
      // 쓰러진 통나무(땅 위): 둥근 껍질, 나이테 마구리, 이끼
      for (let i = 0; i < 10; i++) {
        const x = w.ri(20, 300), z = w.ri(20, 300), gy = g(x, z), a = w.r(0, Math.PI), l = w.r(12, 20);
        const x2 = x + Math.cos(a) * l, z2 = z + Math.sin(a) * l;
        if (gy <= lvl + 1 || busy(x, z) || busy(x2, z2) || Math.abs(g(x2, z2) - gy) > 3) continue;
        limb(w, [x, gy + 2, z], [x2, gy + 2, z2], 1.8, 1.6, B.bark);
        w.sphere(Math.round(x), gy + 2, Math.round(z), 1.2, B.barkM);
        w.line(x, gy + 4, z, x + (x2 - x) * 0.6, gy + 4, z + (z2 - z) * 0.6, B.moss);
      }
      // 물가 갈대 무리, 이끼 위 덩굴 순·발광 버섯
      MH.scatter(w, 9000, (x, gy, z, b) => {
        const nearW = wet(x + 2, z) || wet(x - 2, z) || wet(x, z + 2) || wet(x, z - 2);
        if (nearW && w.chance(0.4)) {
          for (let k = 0; k < 3; k++) { const rx = x + w.ri(-1, 1), rz = z + w.ri(-1, 1), rg2 = g(rx, rz); if (rg2 < 0 || wet(rx, rz) || w.get(rx, rg2 + 1, rz)) continue; const hh = w.ri(4, 8); w.box(rx, rg2 + 1, rz, rx, rg2 + hh, rz, B.reed); w.box(rx, rg2 + hh + 1, rz, rx, rg2 + hh + 2, rz, B.reedTop); }
        }
        else if ((b === B.moss || b === B.sick) && w.chance(0.2)) { if (w.chance(0.1)) { w.set(x, gy + 1, z, B.stem); w.set(x, gy + 2, z, B.gmush); } else w.box(x, gy + 1, z, x, gy + w.ri(1, 2), z, B.vine); }
        else if (b === B.fung && w.chance(0.12)) w.set(x, gy + 1, z, B.leafP);
      });
      // 물속 수초(바닥에서 자라 수면 아래에서 멈춘다)
      for (let i = 0; i < 900; i++) { const x = w.ri(4, 315), z = w.ri(4, 315), gy = g(x, z); if (!wet(x, z) || lvl - gy < 3 || w.get(x, gy + 1, z)) continue; w.box(x, gy + 1, z, x, gy + w.ri(1, lvl - gy - 2), z, B.weed); }
      // 수련 잎(둥근 잎에 갈라진 틈) · 드문드문 꽃
      for (let i = 0; i < 420; i++) {
        const x = w.ri(4, 315), z = w.ri(4, 315);
        if (!wet(x, z) || g(x, z) >= lvl || w.get(x, lvl + 1, z) || MH.polyDist(x, z, walk) < 6) continue;
        const r = w.r(1.2, 2.3), a0 = w.r(0, 6.28);
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
          if (dx * dx + dz * dz > r * r || !wet(x + dx, z + dz) || w.get(x + dx, lvl + 1, z + dz)) continue;
          if ((dx || dz) && Math.abs(Math.atan2(dz, dx) - a0 + 0.1) < 0.4) continue;
          w.set(x + dx, lvl + 1, z + dz, B.lily);
        }
        if (i % 7 === 0) { w.set(x, lvl + 2, z, B.lilyF); w.set(x, lvl + 3, z, B.lilyF); }
      }
      // 물에 잠긴 통나무
      for (let i = 0; i < 14; i++) { const x = w.ri(40, 276), z = w.ri(140, 296); const a = w.r(0, 3.14); if (wet(x, z) && MH.polyDist(x, z, walk) > 22) limb(w, [x, lvl, z], [x + Math.cos(a) * 18, lvl + 1, z + Math.sin(a) * 18], 1.6, 1.3, B.barkDk); }
      landmarks.push({ name: '독 늪', note: '판자길만이 안전하다', p: [170.5, lvl + 20, 270.5] });

      // ── 거미 여왕(부품): 둥지 위 높은 곳에서 거미줄을 타고 내려온다 ──
      const QY = sg + 48, QT = sg + 68;
      const queen = w.prop({ name: 'queen', pivot: [SX + 0.5, QY, SZ + 0.5] });
      // 배(붉은 모래시계 무늬)와 머리가슴
      for (let dz = -9; dz <= 7; dz++) for (let dy = -4; dy <= 4; dy++) for (let dx = -5; dx <= 5; dx++) {
        const ab = (dx / 4.4) ** 2 + ((dy - 0.6) / 3.6) ** 2 + ((dz + 3.6) / 5.2) ** 2 <= 1, ce = (dx / 3) ** 2 + (dy / 2.4) ** 2 + ((dz - 3.4) / 3) ** 2 <= 1;
        if (!ab && !ce) continue;
        const hg = ab && dy >= 2 && Math.abs(dx) <= Math.abs(dz + 4) * 0.5 + 0.5 && dz >= -7 && dz <= -1;
        pset(queen, SX + dx, QY + dy, SZ + dz, hg ? B.spidR : B.spid);
      }
      for (const dx of [-1, 1]) { pset(queen, SX + dx, QY + 1, SZ + 6, B.eye); pset(queen, SX + dx * 2, QY + 2, SZ + 5, B.weye); pset(queen, SX + dx, QY - 2, SZ + 7, B.spidR); pset(queen, SX + dx, QY - 3, SZ + 7, B.spidR); }
      // 다리 여덟: 무릎이 솟았다가 끝이 아래로
      for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
        const z0 = SZ + 4.5 - k * 1.6, kx = SX + s * 2.5, mx = SX + s * 8, mzz = SZ + 7 - k * 4.4, ex = SX + s * 11, ezz = SZ + 9 - k * 6;
        for (let t = 0; t <= 1; t += 0.08) { const x = kx + (mx - kx) * t, y = QY + 6 * t, z = z0 + (mzz - z0) * t; pset(queen, x, y, z, B.spid); pset(queen, x, y + 1, z, B.spid); }
        for (let t = 0; t <= 1; t += 0.08) pset(queen, mx + (ex - mx) * t, QY + 6 - 13 * t, mzz + (ezz - mzz) * t, B.spid);
      }
      const silk = w.prop({ name: 'silk', pivot: [SX + 0.5, QT + 1, SZ + 0.5] });
      for (let y = QY + 4; y <= QT; y++) pset(silk, SX, y, SZ, B.web);
      acts.push({
        name: '거미 여왕', hint: '둥지 위 높은 곳에서 거미 여왕이 줄을 타고 스르륵 내려와요', hit: [SX - 10, QY - 8, SZ - 9, SX + 10, QY + 6, SZ + 9],
        run: async a => {
          const L0 = QT - QY - 3;
          await Promise.all([a.move('queen', [0, -26, 0], 2.2), a.rope('silk', L0, L0 + 26, 2.2)]);
          for (let k = 0; k < 3; k++) { await a.move('queen', [0, -23, 0], 0.25); await a.move('queen', [0, -26, 0], 0.25); }
          for (let k = 0; k < 3; k++) { a.burst([SX + 0.5, QY - 26, SZ + 0.5], P2({ n: 40, colors: ['#1a1616', '#2a2420', '#d2cfc2'], speed: 7, up: 1, life: 2.2, gravity: 6, spread: 2 })); await a.wait(0.35); }
          await a.wait(0.8);
          await Promise.all([a.move('queen', [0, 0, 0], 2.6), a.rope('silk', L0, L0, 2.6)]);
        },
      });

      // ── 마녀의 솥: 뚜껑(부품)이 튀어 오르며 독한 김이 솟는다 ──
      const lid = w.prop({ name: 'potlid', pivot: [PX0 + 0.5, hy + 5, PZ0 + 0.5] });
      lid.cyl(PX0, PZ0, hy + 5, hy + 5, 1.6, B.pot); lid.box(PX0, hy + 6, PZ0, PX0, hy + 7, PZ0, B.post);
      acts.push({
        name: '마녀의 솥', hint: '약초막 솥이 펄펄 끓어 뚜껑이 튀어 오르고 독한 김이 솟아요', hit: [PX0 - 4, hy, PZ0 - 4, PX0 + 4, hy + 8, PZ0 + 4],
        run: async a => {
          a.flash('brew', 6, 4);
          for (let k = 0; k < 4; k++) { await a.move('potlid', [0, 1.2, 0], 0.1); await a.move('potlid', [0, 0, 0], 0.1); }
          await a.tween('potlid', { off: [2, 10, 4], rot: [0.8, 2, 0.4] }, 0.5);
          for (let k = 0; k < 6; k++) { a.burst([PX0 + 0.5, hy + 5, PZ0 + 0.5], P2({ n: 30, colors: ['#9aff6a', '#c8ff6a', '#4a7a3a'], speed: 1.5, up: 6, life: 2.2, gravity: -0.6, spread: 0.8 })); await a.wait(0.3); }
          await a.tween('potlid', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6, t => t * t);
        },
      });

      // ── 늑대 굴: 어둠 속 노란 눈(부품)이 굴 밖으로 다가온다 ──
      const wolves = [[WX - 2, wg + 4, WZ + 14], [WX + 4, wg + 6, WZ + 12], [WX + 8, wg + 4, WZ + 16]].map(([x, y, z], k) => {
        const p = w.prop({ name: 'wolf' + k, pivot: [x + 1.5, y, z + 0.5] });
        pset(p, x, y, z, B.weye); pset(p, x + 3, y, z, B.weye); pset(p, x, y + 1, z, B.weye); pset(p, x + 3, y + 1, z, B.weye);
        return 'wolf' + k;
      });
      lights.push({ name: 'den', p: [WX + 3, wg + 6, WZ + 18], c: '#ffd040', i: 0.01, d: 24, flicker: 0.3, srcR: 10 });
      acts.push({
        name: '늑대 굴', hint: '굴 속 어둠에서 노란 눈들이 번뜩이며 다가와요', hit: [WX - 6, wg, WZ + 6, WX + 12, wg + 12, WZ + 24],
        run: async a => {
          a.flash('den', 120, 4.6);
          await Promise.all(wolves.map((nm, k) => a.move(nm, [(k - 1) * 2, 0, 10 + k * 2], 1.6 + k * 0.3)));
          a.wind(2.5, 1.6);
          for (let k = 0; k < 3; k++) { a.burst([WX + 3, wg + 4, WZ + 26], P2({ n: 26, colors: ['#3c5a2b', '#66782c', '#d8d0bc'], speed: 6, up: 2, life: 1.4, gravity: 3, spread: 3, flat: true })); await a.wait(0.4); }
          await a.wait(0.6);
          // 뒷걸음질 대신 어둠 속으로 스르르 사라졌다가 굴 안쪽에 다시 나타난다
          await Promise.all(wolves.map(nm => a.respawn(nm, 1.2)));
        },
      });

      // ── 고목의 입에서 쏟아지는 박쥐 떼(부품, 평소엔 숨김) ──
      const bats = [];
      for (let k = 0; k < 6; k++) {
        const bx = TX - 5 + k * 2, by = MY0 + 3 + (k % 3) * 2;
        let s0 = 999, s1 = -999;
        for (let x = bx - 3; x <= bx + 3; x++) for (let y = by; y <= by + 2; y++) { const sz = mouthZ.get(x * 1000 + y); if (sz != null) { s0 = Math.min(s0, sz); s1 = Math.max(s1, sz); } }
        const bz = Math.max(s1 - 5, s0 - 1);
        const nm = 'bat' + k, p = w.prop({ name: nm, pivot: [bx + 0.5, by, bz + 0.5], scl0: [0, 0, 0] });
        p.box(bx, by, bz, bx, by + 1, bz + 1, B.bat);
        for (const s of [-1, 1]) { p.set(bx + s, by + 1, bz, B.bat); p.set(bx + s * 2, by + 2, bz, B.bat); p.set(bx + s * 3, by + 1, bz, B.bat); }
        p.set(bx, by + 2, bz + 1, B.spidR);
        bats.push(nm);
      }
      acts.push({
        name: '박쥐 떼', hint: '고목의 벌어진 입에서 박쥐 떼가 쏟아져 나와 하늘로 흩어져요', hit: [TX - 10, MY0, fz - 2, TX + 10, MY1, fz + 4],
        run: async a => {
          a.flash('eyes', 5, 3);
          a.burst([TX + 0.5, MY0 + 6, fz + 2], P2({ n: 50, colors: ['#221a22', '#3a2a34', '#120c10'], speed: 8, up: 4, life: 1.8, gravity: 0.5, spread: 3 }));
          await Promise.all(bats.map((nm, k) => (async () => {
            await a.wait(k * 0.12);
            await a.tween(nm, { scl: [1, 1, 1] }, 0.1);
            const ang = (k - 2.5) * 0.45;
            // 머리(+z, 붉은 눈 쪽)를 진행 방향으로 돌리며 남쪽 하늘 너머 지도 밖까지 날아간 뒤 다시 숨는다
            await a.drive(nm, [[Math.sin(ang) * 16, 8 + k * 2, 16], [Math.sin(ang) * 36, 24 + k * 4, 44], [Math.sin(ang) * 52, 40 + k * 2, 100], [Math.sin(ang) * 68, 52 + k * 2, 216]], 4.2, { fwd: '+z', back: 0.3 });
          })()));
        },
      });

      // ── 늪의 독기: 수면 곳곳에서 독 거품이 터진다 ──
      const bog = [];
      for (let i = 0; i < 600 && bog.length < 14; i++) { const x = w.ri(76, 260), z = w.ri(150, 276); if (wet(x, z) && !w.get(x, lvl + 1, z) && bog.every(([bx, bz]) => Math.hypot(bx - x, bz - z) > 14)) bog.push([x, z]); }
      bog.sort((p, q) => (q[0] + q[1]) - (p[0] + p[1]));
      if (bog.length) acts.push({
        name: '늪의 독기', hint: '늪 수면 곳곳에서 독 거품이 부글부글 솟아 터져요', hit: [bog[0][0] - 6, lvl, bog[0][1] - 6, bog[0][0] + 6, lvl + 6, bog[0][1] + 6],
        run: async a => {
          a.glow(1.5, 4);
          for (let r = 0; r < 2; r++) for (const [x, z] of bog) { a.burst([x + 0.5, lvl + 1.4, z + 0.5], P2({ n: 22, colors: ['#b6e866', '#d4f07a', '#355f25'], speed: 2.5, up: 5, life: 1.4, gravity: 2.5, spread: 1.2 })); await a.wait(0.14); }
        },
      });

      // ══ 북동쪽 언덕의 이끼 덮인 환상열석 ══
      const rg = g(RCX, RCZ);
      for (let z = RCZ - 27; z <= RCZ + 27; z++) for (let x = RCX - 27; x <= RCX + 27; x++) {
        const d = Math.hypot(x - RCX, z - RCZ) + (n.fbm(x * 0.15, z * 0.15, 2) - 0.5) * 3;
        if (d > 26) continue;
        const ring = Math.abs(d - 18) < 2.4;
        // 판석: 3×3 돌에 줄눈
        const slab = (((x + 300) % 4 === 3) || ((z + 300 + (((x + 300) >> 2) & 1) * 2) % 4 === 3)) ? B.slate2 : B.slate;
        MH.setH(w, x, z, rg, d < 9 || ring ? slab : hash3(x >> 2, 2, z >> 2) > 0.6 ? B.sick : B.moss, B.soil);
      }
      MH.skirt(w, RCX - 24, RCZ - 24, RCX + 24, RCZ + 24, rg, { R: 18, rate: 1.0, noise: (x, z) => n.fbm(x * 0.1, z * 0.1) * 5, surf: () => B.moss, fill: B.soil });
      // 선돌 아홉: 아래가 넓고 위가 둥근 4×3 돌, 이끼 낀 윗면, 남쪽·동쪽 면의 룬
      const stones = [];
      for (let k = 0; k < 9; k++) {
        const a = k / 9 * Math.PI * 2 + 0.35, sx = Math.round(RCX + Math.cos(a) * 18), sz = Math.round(RCZ + Math.sin(a) * 18);
        const h = 14 + ((k * 5) % 4) * 2 + (k === 2 ? 6 : 0), lean = k % 4 === 1 ? 2 : 0;
        for (let y = rg + 1; y <= rg + h; y++) {
          const t = (y - rg) / h, ox = Math.round(lean * t * t), shrink = y > rg + h - 2 ? 1 : 0, wide = y <= rg + 2 ? 1 : 0;
          w.box(sx + ox - wide + shrink, y, sz - wide, sx + ox + 3 + wide - shrink, y, sz + 2 + wide - (shrink && y === rg + h ? 1 : 0), y >= rg + h - 2 && hash3(sx, y >> 1, sz) > 0.25 ? B.menhirM : B.menhir);
        }
        for (const [dx, dy] of [[1, 6], [1, 7], [1, 8], [1, 9], [2, 8], [0, 10], [2, 5], [2, 10]]) w.set(sx + dx, rg + dy, sz + 3, B.rune);
        for (const [dz, dy] of [[1, 4], [1, 5], [0, 6], [2, 6], [1, 7]]) w.set(sx + 4, rg + dy, sz + dz, B.rune);
        stones.push([sx, sz, h]);
      }
      // 두 선돌 위 상인방(문 돌)
      for (const [i, j] of [[1, 2], [5, 6]]) {
        const [ax, az, ah] = stones[i], [bx, bz, bh] = stones[j], ty = rg + Math.min(ah, bh) + 2;
        limb(w, [ax + 1, ty, az + 1], [bx + 2, ty, bz + 1], 1.6, 1.6, B.menhir);
        w.line(ax + 1, ty + 2, az + 1, bx + 2, ty + 2, bz + 1, B.menhirM);
      }
      // 가운데 제단: 세 단 받침, 다리 돌 위 석판, 룬 구슬, 해골
      w.cyl(RCX, RCZ, rg + 1, rg + 1, 7.4, B.altar); w.cyl(RCX, RCZ, rg + 2, rg + 2, 5.6, B.altar); w.cyl(RCX, RCZ, rg + 3, rg + 3, 4.2, B.slate);
      w.box(RCX - 4, rg + 4, RCZ - 2, RCX - 3, rg + 7, RCZ + 2, B.menhir); w.box(RCX + 3, rg + 4, RCZ - 2, RCX + 4, rg + 7, RCZ + 2, B.menhir);
      w.box(RCX - 5, rg + 8, RCZ - 3, RCX + 5, rg + 9, RCZ + 3, B.menhir); w.box(RCX - 5, rg + 10, RCZ - 3, RCX + 5, rg + 10, RCZ + 3, B.menhirM);
      for (let x = RCX - 4; x <= RCX + 4; x += 2) w.set(x, rg + 9, RCZ + 4, B.rune);
      w.box(RCX, rg + 11, RCZ, RCX + 1, rg + 12, RCZ + 1, B.rune);
      for (const sx of [RCX - 4, RCX + 4]) { w.box(sx, rg + 11, RCZ - 1, sx + 1, rg + 12, RCZ, B.skull); w.set(sx, rg + 12, RCZ + 1, B.hole); w.set(sx + 1, rg + 12, RCZ + 1, B.hole); w.set(sx, rg + 11, RCZ + 1, B.skull); w.set(sx + 1, rg + 11, RCZ + 1, B.skull); }
      for (const [dx, dz] of [[-7, 4], [7, -4], [4, 7]]) { w.box(RCX + dx, rg + 2, RCZ + dz, RCX + dx + 1, rg + 4, RCZ + dz + 1, B.pot); w.box(RCX + dx, rg + 5, RCZ + dz, RCX + dx + 1, rg + 5, RCZ + dz + 1, B.spot); }
      lights.push({ name: 'ring', p: [RCX + 0.5, rg + 14, RCZ + 0.5], c: '#7affc8', i: 0.5, d: 52, flicker: 0.15 });
      // 언덕을 휘감은 가시덩굴과 붉은 열매
      for (let k = 0; k < 52; k++) {
        const a = w.r(0, Math.PI * 2), r0 = w.r(21, 26), x = Math.round(RCX + Math.cos(a) * r0), z = Math.round(RCZ + Math.sin(a) * r0);
        if (z > RCZ + 16 && Math.abs(x - RCX) < 12) continue;
        const gy = g(x, z), tx2 = x + w.ri(-4, 4), ty2 = gy + w.ri(4, 8), tz2 = z + w.ri(-4, 4);
        w.line(x, gy + 1, z, tx2, ty2, tz2, B.thorn, 0.8);
        w.line(tx2, ty2, tz2, tx2 + w.ri(-3, 3), ty2 - 2, tz2 + w.ri(-3, 3), B.thorn);
        if (k % 3 === 0) w.box(tx2, ty2 + 1, tz2, tx2 + 1, ty2 + 2, tz2 + 1, B.berry); else w.box(x, gy + 3, z + 1, x + 1, gy + 3, z + 2, B.thornL);
      }
      // 남쪽 입구의 가시덩굴 아치: 두 덩굴 덩이(부품)가 좌우로 갈라진다
      const ag = g(RCX, AZ);
      for (const s2 of [-1, 1]) w.box(RCX + s2 * 8, ag + 1, AZ, RCX + s2 * 8 + (s2 > 0 ? 1 : -1), ag + 16, AZ + 1, B.thorn);
      for (let x = RCX - 9; x <= RCX + 9; x++) {
        const ay = ag + 16 + Math.round(4 - Math.abs(x - RCX) * 0.45);
        w.box(x, ay, AZ, x, ay + 1, AZ + 1, B.thorn);
        if (x % 3 === 0) w.set(x, ay + 2, AZ, B.thornL); else if (x % 3 === 1) w.box(x, ay - 1, AZ + 1, x, ay - 1, AZ + 1, B.berry);
      }
      const vineL = w.prop({ name: 'vineL', pivot: [RCX - 6, ag + 1, AZ + 0.5] }), vineR = w.prop({ name: 'vineR', pivot: [RCX + 7, ag + 1, AZ + 0.5] });
      for (let x = RCX - 7; x <= RCX + 7; x++) for (let y = ag + 1; y <= ag + 15; y++) for (let z = AZ; z <= AZ + 1; z++) {
        if (hash3(x >> 1, y >> 1, z) < 0.38 || y > ag + 15 - Math.abs(x - RCX) * 0.5 + (hash3(x, 9, z) > 0.5 ? 1 : 0)) continue;
        const T = x < RCX || (x === RCX && (y >> 1) % 2) ? vineL : vineR, q = ((x >> 1) + (y >> 1)) % 5;
        T.set(x, y, z, q === 0 && z === AZ + 1 ? B.berry : ((x + y) >> 1) % 2 ? B.thorn : B.thornL);
      }
      // 닳은 판석 길: 가장자리가 들쭉날쭉, 군데군데 판석이 빠지고 흙이 드러난다
      const sPts = [[RCX + 0.5, AZ + 2], [RCX - 12, AZ + 20], [208, 104], [184, 124]];
      for (let z = AZ - 4; z <= 132; z++) for (let x = 176; x <= RCX + 6; x++) {
        const d = MH.polyDist(x + 0.5, z + 0.5, sPts) + (n.fbm(x * 0.2 + 5, z * 0.2, 2) - 0.5) * 2.4;
        if (d > 4.4 || g(x, z) <= lvl) continue;
        const missing = hash3(x >> 1, 6, z >> 1) > 0.82;
        MH.paint(w, x, z, d > 2.8 || missing ? B.mud : (((x + 300) % 4 === 3) || ((z + 300 + (((x + 300) >> 2) & 1) * 2) % 3 === 2)) ? B.slate2 : B.slate);
      }
      landmarks.push({ name: '이끼 덮인 환상열석', note: '옛 드루이드의 선돌 · 룬이 아직 숨 쉰다', p: [RCX + 0.5, rg + 44, RCZ + 0.5] });
      landmarks.push({ name: '가시덩굴 제단', note: '고목의 마녀가 힘을 빌리는 곳', p: [RCX + 0.5, rg + 24, AZ + 0.5] });
      acts.push({
        name: '환상열석의 룬', hint: '선돌의 룬이 차례로 깨어나고 제단에서 초록 빛기둥이 솟아요', hit: [RCX - 6, rg + 1, RCZ - 4, RCX + 6, rg + 14, RCZ + 6],
        run: async a => {
          for (const [x, z] of stones) { a.burst([x + 2, rg + 10, z + 4], P2({ n: 18, colors: ['#7affc8', '#c8ffe8', '#3a8a6a'], speed: 1.5, up: 3, life: 1.4, gravity: -0.4, spread: 0.6 })); await a.wait(0.2); }
          a.flash('ring', 8, 3.4); a.glow(1.7, 3.4);
          for (let k = 0; k < 7; k++) { a.burst([RCX + 0.5, rg + 14 + k * 6, RCZ + 0.5], P2({ n: 30, colors: ['#7affc8', '#ffffff', '#b6e866'], speed: 2, up: 8, life: 1.6, gravity: -1, spread: 0.8 })); await a.wait(0.25); }
          a.burst([RCX + 0.5, rg + 4, RCZ + 0.5], P2({ n: 70, colors: ['#7affc8', '#3c5a2b', '#c8ffe8'], speed: 7, up: 1, life: 2, gravity: 0.5, spread: 3, flat: true }));
          await a.wait(1.2);
        },
      });
      acts.push({
        name: '가시덩굴 아치', hint: '입구를 막은 가시덩굴이 좌우로 스르르 갈라지며 붉은 열매가 흩날려요', hit: [RCX - 8, ag + 1, AZ - 2, RCX + 8, ag + 16, AZ + 3],
        run: async a => {
          for (let k = 0; k < 3; k++) { await Promise.all([a.move('vineL', [-0.6, 0, 0], 0.1), a.move('vineR', [0.6, 0, 0], 0.1)]); await Promise.all([a.move('vineL', [0, 0, 0], 0.1), a.move('vineR', [0, 0, 0], 0.1)]); }
          await Promise.all([a.tween('vineL', { off: [-7, 0, -1], scl: [0.55, 1, 1] }, 1.4), a.tween('vineR', { off: [7, 0, -1], scl: [0.55, 1, 1] }, 1.4)]);
          a.flash('ring', 4, 2.4);
          for (let k = 0; k < 3; k++) { a.burst([RCX + 0.5, ag + 10, AZ + 0.5], P2({ n: 26, colors: ['#d8406a', '#5a3a5a', '#7affc8'], speed: 4, up: 3, life: 1.6, gravity: 2, spread: 2 })); await a.wait(0.4); }
          await a.wait(1.4);
          await Promise.all([a.tween('vineL', { off: [0, 0, 0], scl: [1, 1, 1] }, 1.2), a.tween('vineR', { off: [0, 0, 0], scl: [1, 1, 1] }, 1.2)]);
        },
      });

      if (toadAt) {
        const [tx, tg2, tz] = toadAt, ty = tg2 + 4;
        w.box(tx - 6, tg2 + 1, tz - 6, tx + 6, tg2 + 12, tz + 6, 0);
        // 그루터기: 껍질 테, 나이테 윗면, 뿌리
        for (let y = tg2 - 1; y <= tg2 + 3; y++) { w.cyl(tx, tz, y, y, 4.4, B.bark); if (y === tg2 + 3) { w.cyl(tx, tz, y, y, 3.4, B.barkM); w.ring(tx, tz, y, 1.6, 2.4, B.bark); } }
        for (let k = 0; k < 5; k++) { const a = k * 1.26 + 0.3; limb(w, [tx, tg2 + 1, tz], [tx + Math.cos(a) * 7, tg2 - 1, tz + Math.sin(a) * 7], 1.2, 0.6, B.bark); }
        const toad = w.prop({ name: 'toad', pivot: [tx + 0.5, ty, tz + 0.5] });
        toad.ellipsoid(tx, ty + 2, tz, 4, 3, 4.4, B.toad, (dx, dy) => dy >= -2);
        for (const [dx, dz] of [[-2, -2], [2, 0], [0, 2], [-2, 2], [1, -3], [-3, 0]]) toad.box(tx + dx, ty + 5, tz + dz, tx + dx + 1, ty + 5, tz + dz, B.toadS);
        toad.box(tx - 2, ty, tz + 2, tx + 2, ty + 1, tz + 4, B.toadB);
        for (const s2 of [-1, 1]) {
          toad.box(tx + s2 * 2 - (s2 < 0 ? 1 : 0), ty + 4, tz + 3, tx + s2 * 2 + (s2 > 0 ? 1 : 0), ty + 5, tz + 4, B.eye);
          toad.box(tx + s2 * 2 - (s2 < 0 ? 1 : 0), ty + 6, tz + 3, tx + s2 * 2 + (s2 > 0 ? 1 : 0), ty + 6, tz + 4, B.toad);
          toad.box(tx + s2 * 4, ty, tz - 2, tx + s2 * 6, ty + 1, tz - 4, B.toad); toad.box(tx + s2 * 4, ty, tz + 3, tx + s2 * 5, ty, tz + 5, B.toad);
        }
        acts.push({
          name: '독두꺼비', hint: '그루터기 위 독두꺼비가 목을 부풀리다 늪으로 첨벙 뛰어들어요', hit: [tx - 6, ty, tz - 4, tx + 6, ty + 8, tz + 6],
          run: async a => {
            for (let k = 0; k < 3; k++) { await a.tween('toad', { scl: [1.12, 1.25, 1.12] }, 0.25); await a.tween('toad', { scl: [1, 1, 1] }, 0.2); }
            a.burst([tx + 0.5, ty + 4, tz + 5], P2({ n: 20, colors: ['#9aff6a', '#c8ff6a'], speed: 2, up: 3, life: 1.2, gravity: -0.3, spread: 0.6 }));
            await a.drive('toad', [[4, 10, 6], [8, 12, 10], [12, -4, 16]], 1.1, { fwd: '+z' });
            for (let k = 0; k < 3; k++) { a.burst([tx + 12.5, lvl + 1.4, tz + 16.5], P2({ n: 30, colors: ['#b6e866', '#355f25', '#d4f07a'], speed: 3.5, up: 4, life: 1.2, gravity: 4, spread: 1.4 })); await a.wait(0.3); }
            await a.wait(0.8);
            await a.respawn('toad', 1.0);
          },
        });
        landmarks.push({ name: '두꺼비 그루터기', note: '독두꺼비 · 침에 닿으면 마비', p: [tx + 0.5, ty + 20, tz + 0.5] });
      }

      // ── 판자길 등불 기둥과 약초막 둘레 장식 ──
      for (let i = 1; i < walk.length - 1; i++) {
        const [x, z] = walk[i], lx = x + 6;
        if (g(lx, z) > DECK) continue;
        w.box(lx, g(lx, z) + 1, z, lx + 1, DECK + 12, z + 1, B.post);
        w.box(lx - 3, DECK + 13, z, lx + 1, DECK + 13, z + 1, B.post); w.set(lx - 3, DECK + 12, z, B.iron);
        w.box(lx - 4, DECK + 9, z - 1, lx - 2, DECK + 11, z + 1, B.lamp); w.box(lx - 4, DECK + 8, z - 1, lx - 2, DECK + 8, z + 1, B.iron); w.box(lx - 4, DECK + 12, z - 1, lx - 2, DECK + 12, z + 1, B.iron);
        w.box(lx, DECK + 14, z, lx + 1, DECK + 15, z + 1, B.skull); w.set(lx, DECK + 15, z + 1, B.hole);
        if (i % 2) lights.push({ p: [lx - 2.5, DECK + 10, z + 0.5], c: '#ffd080', i: 0.9, d: 24, flicker: 0.3, night: true });
      }
      // 약초막: 말리는 약초 시렁(남쪽), 해골 토템(북동쪽 모서리)
      for (const px of [HX - 1, HX + 19]) w.box(px, hy, HZ + 18, px, hy + 9, HZ + 18, B.post);
      for (let x = HX - 1; x <= HX + 19; x++) { w.set(x, hy + 9, HZ + 18, B.post); if (x % 3 === 0) { w.box(x, hy + 6, HZ + 18, x, hy + 8, HZ + 18, B.herb); w.box(x, hy + 4, HZ + 18, x, hy + 5, HZ + 18, B.reed); } }
      w.box(HX + 19, hy, HZ - 4, HX + 20, hy + 12, HZ - 3, B.post);
      w.box(HX + 18, hy + 13, HZ - 5, HX + 21, hy + 15, HZ - 2, B.skull); w.set(HX + 19, hy + 14, HZ - 2, B.hole); w.set(HX + 20, hy + 14, HZ - 2, 0); w.set(HX + 20, hy + 14, HZ - 2, B.hole);
      w.box(HX + 21, hy + 11, HZ - 4, HX + 23, hy + 11, HZ - 4, B.bone); w.box(HX + 16, hy + 11, HZ - 4, HX + 18, hy + 11, HZ - 4, B.bone);
      return { lights, landmarks, acts };
    },
  });
})();
