// 무쇠골 — 거대한 산벽의 광산, 절벽 선반 위 드워프 마을, 용암 협곡과 철교, 협곡 남쪽 제련소 (336칸, 고해상도 2배 · 1칸 ≈ 25cm)
// 늘어난 해상도로 그린 세부: 낱돌 아치(쐐기돌·이맛돌)와 벽기둥·처마 돌림띠가 있는 광산 정문, 갱목 틀과 등, 침목 위 레일,
// 트러스 철교와 버팀다리, 줄눈 있는 화강암 벽·모서리 귀돌·청동 띠의 드워프 돌집, 쇠살 창과 돌 상인방, 징 박은 청동 문,
// 겹겹의 점판암 우진각 지붕(이음줄·내림마루·청동 용마루), 쇠띠 두른 벽돌 용광로, 테 두른 술통, 낱돌 무늬 넓적돌 길
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  const K0 = 168 / 128;                                   // 원본 지도 좌표계의 비율
  MAPS.push({
    id: 'ironhollow', cat: 'village', name: '무쇠골', en: 'Ironhollow', color: '#e08a3a', seed: 127, base: 48, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '산을 파고 들어간 드워프 광산 마을. 망치 소리가 그치는 날은 일 년에 단 하루뿐이다. 캐낸 광석은 철교를 건너 협곡 남쪽 제련소의 용광로로 간다.',
    info: { title: '마을 정보', en: 'VILLAGE', rows: [['주민', '드워프 장인 80여 명'], ['특산물', '미스릴 도끼 · 흑맥주 · 세공 보석'], ['소문', '가장 깊은 갱도에서 누군가 망치를 두드린다']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.64], sun: ['#ffc890', 0.7, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.6], sun: ['#ffe8d0', 0.78, [0.4, 1, 0.6]], haze: '#c89060' },
    liquid: ['#8a1a0a', '#ff5a1a', '#ffe08a'], liqSpeed: 0.6, liqGlow: true,
    fog: { box: [168, 184, 180, 192], start: 0.8, floor: 16, depth: 20, haze: [36, 0.3, 16], hazeColor: '#7a3a1a' },
    camY: 4, zoom: 1.0,
    particles: [
      { n: 260, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 2, area: [168, 246, 100], y0: 28, y1: 120 },
      { n: 240, colors: ['#8a7a70', '#6a5c54'], mode: 'drift', speed: 0.8, y0: 68, y1: 200, glow: false },
    ],
    blocks: {
      rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' }, gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 },
      cliff: { c: '#6e6660', v: 0.07, pat: 'big' }, cliffDk: { c: '#4a4440', v: 0.07, pat: 'big' }, basalt: { c: '#2e2826', v: 0.06, pat: 'stone' },
      granite: { c: '#8a8078', v: 0.05, pat: 'big' }, graniteDk: { c: '#5e564e', v: 0.05, pat: 'brick' }, slate: { c: '#3a3a44', v: 0.04 }, slate2: { c: '#444452', v: 0.04 }, slateDk: { c: '#2a2a32', v: 0.03 },
      gr1: { c: '#8a8078', v: 0.04 }, gr2: { c: '#7c736b', v: 0.04 }, gr3: { c: '#968c82', v: 0.04 }, gr4: { c: '#827a70', v: 0.04 }, grJ: { c: '#4a433d', v: 0.03 },
      sd1: { c: '#5e564e', v: 0.04 }, sd2: { c: '#544c45', v: 0.04 }, sd3: { c: '#686058', v: 0.04 }, cap: { c: '#a49a8e', v: 0.04 },
      bronze: { c: '#c08a3a', v: 0.06 }, bronzeDk: { c: '#94652a', v: 0.05 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#26262c', v: 0.03 },
      timber: { c: '#6a4428', v: 0.06, pat: 'log' }, timberDk: { c: '#4e321e', v: 0.05 },
      plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, coal: { c: '#141010', v: 0 }, coal2: { c: '#241c1a', v: 0.04 }, ore: { c: '#e8c040', v: 0.1 }, oreB: { c: '#5ab0e0', v: 0.1 },
      rail: { c: '#8a8a92', v: 0.03 }, sleeper: { c: '#5a3a24', v: 0.05 }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' }, cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      crate: { c: '#9a7048', v: 0.05, pat: 'plank' }, crateEdge: { c: '#6a4a2e', v: 0.04 },
      rope: { c: '#b8a080', v: 0.04 }, leather: { c: '#6a3a24', v: 0.05 }, leather2: { c: '#542c1a', v: 0.05 },
      pave: { c: '#6a625a', top: '#847a70', v: 0.06 }, pave2: { c: '#6a625a', top: '#7a7066', v: 0.06 }, pave3: { c: '#6a625a', top: '#8e847a', v: 0.06 }, paveJ: { c: '#4e4842', top: '#5a524a', v: 0.04 },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, rune: { c: '#ffd070', glow: true }, fireY: { c: '#ffe090', glow: true },
      brick: { c: '#7a4a3a', v: 0.05, pat: 'brick' }, brick2: { c: '#683c2e', v: 0.05, pat: 'brick' }, slag: { c: '#3a3238', v: 0.08 }, gem: { c: '#c86ae8', glow: true }, gemB: { c: '#6ae8d8', glow: true }, molten: { c: '#ffb04a', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, L = base + 16;
      const CL = ox => 52.5 + (n.fbm(ox * 0.045 / K0, 3, 2) - 0.5) * 13;
      const ZP = 107.6, ZS = 139;                                  // 고원 남쪽 끝, 협곡 남쪽 끝(원본 좌표)
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));

      // ───────── 지형: 원본 높이 함수를 두 배로 ─────────
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const ox = x / 2, oz = z / 2, cz = CL(ox);
          let hh;
          if (oz < cz) hh = 8 + Math.min(56, (cz - oz) * 2.4) + n.ridge(ox * 0.045 / K0, oz * 0.045 / K0, 4) * 9;
          else if (oz < ZP) hh = 8 + n.fbm(ox * 0.06 / K0, oz * 0.06 / K0) * 1.5;
          else if (oz < ZS) hh = MH.lerp(8, -16, MH.sstep(ZP, ZP + 5, oz)) + MH.lerp(0, 22, MH.sstep(ZS - 5, ZS, oz));
          else hh = 6 + n.fbm(ox * 0.06 / K0, oz * 0.06 / K0) * 3;
          return base + 2 * hh;
        },
        surface: (x, z, y, s) => s >= 3 ? (y < base ? B.basalt : B.cliff) : y > L + 8 ? B.rock : B.gravel,
        under: (x, z, y, dep, s) => y < base - 8 ? B.basalt : ((((y >> 1) + (hash3(x >> 4, 0, z >> 4) * 3 | 0)) % 6 === 0) ? B.cliffDk : B.cliff),
      });
      const LAVA = base - 26;
      MH.water(w, LAVA, (x, z) => z > 210 && z < 284);
      MH.flatten(w, 10, 116, 326, 212, L, B.gravel, B.rock);
      MH.flatten(w, 6, 290, 330, D - 1, L, B.gravel, B.rock);
      // 절벽의 광맥: 금빛·푸른 광석 덩이
      for (let i = 0; i < 220; i++) {
        const x = w.ri(4, W - 6), z = w.ri(4, 100), gg = MH.g(w, x, z);
        if (!(gg > L + 12 && w.slope[x + W * z] < 7)) continue;
        const b = w.chance(0.4) ? B.oreB : B.ore;
        for (const [dx, dz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) if (hash3(x + dx, i, z + dz) > 0.2) MH.paint(w, x + dx, z + dz, b);
      }
      const lights = [], acts = [], landmarks = [];
      lights.push({ p: [104, LAVA + 4, 246], c: '#ff5a1a', i: 1.6, d: 72, flicker: 0.2, liquid: true });
      lights.push({ p: [242, LAVA + 4, 246], c: '#ff5a1a', i: 1.6, d: 72, flicker: 0.2, liquid: true });

      // ───────── 공통 도구(2배 해상도용) ─────────
      // 낱돌 쌓기: 2칸 높이 돌 + 1칸 줄눈, 길이 5칸 돌을 줄마다 엇갈려 쌓는다. 줄눈이면 0
      const GR = [B.gr1, B.gr2, B.gr3, B.gr1, B.gr4, B.gr2], SD = [B.sd1, B.sd2, B.sd3, B.sd1, B.sd2, B.sd3];
      const stoneAt = (u, y, salt, pal) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return (pal || GR)[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const ash = (u, y, salt, pal) => stoneAt(u, y, salt, pal) || B.grJ;
      // 넓적돌 길 무늬: 4×3칸 돌, 1칸 줄눈, 줄마다 엇갈림
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.paveJ;
        return [B.pave, B.pave2, B.pave3][(hash3(Math.floor((x + off) / 4), row, 7) * 3) | 0];
      };
      // 부품용: 월드에 이미 블록이 있는 칸은 건너뛴다
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); } });
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      // 술통: 볼록한 몸통, 쇠테 둘, 뚜껑
      const barrel = (T, x, y, z, ht, r) => {
        ht = ht || 6; r = r || 2.2;
        for (let k = 0; k < ht; k++) {
          const mid = k >= 2 && k <= ht - 3, rr = mid ? r + 0.4 : r, R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            let b;
            if (k === ht - 1) b = outer ? B.cask : B.caskTop;
            else if ((k === 1 || k === ht - 2) && outer) b = B.iron;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            T.set(x + dx, y + k, z + dz, b);
          }
        }
      };
      const crate = (T, x, y, z, s) => {
        s = s || 4;
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      // 쇠 가로등: 돌 받침, 쇠기둥과 청동 고리, 팔, 모서리 쇠살 등롱, 갓과 꼭지
      const lampPost = (x, z) => {
        const y = MH.g(w, x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.graniteDk); w.box(x - 1, y + 2, z - 1, x + 1, y + 2, z + 1, B.cap);
        w.box(x, y + 3, z, x, y + 12, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 3, z + dz, B.ironDk); w.set(x + dx, y + 8, z + dz, B.bronze); }
        const ly = y + 13;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.fireY);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.bronze);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };

      // ───────── 드워프 돌집 ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      // 창: 5폭 유리, 가운데 쇠살과 가로살, 돌 문설주, 상인방과 청동 이맛돌, 내민 창턱
      const windowAt = (sd, wu, wy, wh) => {
        const mr = Math.floor(wh * 0.55);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.iron : B.win); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, B.sd2); put(sd, wu + 5, wy + r, 1, B.sd2); }
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy + wh, 1, B.graniteDk); put(sd, wu + c, wy - 1, 1, B.cap); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.cap); }
        put(sd, wu + 2, wy + wh + 1, 1, B.bronze);
      };
      // 문: 5폭 10높이 청동 문(테두리 살·움푹한 판·징), 고리 손잡이, 돌 문틀과 상인방, 룬 이맛돌, 돌계단, 벽 등롱
      const doorAt = (sd, cu, yb, o) => {
        const u0 = cu - 2;
        for (let r = 0; r < 10; r++) for (let c = 0; c < 5; c++) {
          const stile = c === 0 || c === 4 || r === 0 || r === 5 || r === 9;
          put(sd, u0 + c, yb + r, 1, 0);
          if (stile) put(sd, u0 + c, yb + r, 0, B.bronzeDk);
          else { put(sd, u0 + c, yb + r, 0, 0); put(sd, u0 + c, yb + r, -1, (r === 2 || r === 7) && c !== 2 ? B.iron : B.bronze); }
        }
        put(sd, u0 + 3, yb + 4, 1, B.gold);
        for (let r = 0; r <= 10; r++) { put(sd, u0 - 1, yb + r, 1, B.sd2); put(sd, u0 + 5, yb + r, 1, B.sd2); }
        for (let c = -2; c <= 6; c++) put(sd, u0 + c, yb + 10, 1, B.graniteDk);
        put(sd, u0 + 2, yb + 11, 1, B.rune);
        if (o.steps !== false) for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
          const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
          for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.cap : B.sd2);
          for (let y = top + 1; y <= yb + 10; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
        }
        let lamp = null;
        if (o.lantern) {
          const lc = u0 + 7;
          put(sd, lc, yb + 9, 1, B.iron); put(sd, lc, yb + 9, 2, B.iron); put(sd, lc, yb + 8, 2, B.ironDk);
          put(sd, lc, yb + 7, 2, B.fireY); put(sd, lc, yb + 6, 2, B.fireY); put(sd, lc, yb + 5, 2, B.ironDk);
          const p = sd.at(lc, 2); lamp = [p[0] + 0.5, yb + 7, p[1] + 0.5];
        }
        const p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp };
      };
      // 우진각 지붕: 한 단씩 들여 쌓은 점판암(이음줄 엇갈림), 쇠 처마 끝, 내림마루, 청동 용마루와 끝장식
      const hipRoof = (x0, x1, z0, z1, top, ov) => {
        let s = 0, y = top;
        for (;; s++) {
          const a0 = x0 - ov + s, a1 = x1 + ov - s, b0 = z0 - ov + s, b1 = z1 + ov - s;
          if (a0 > a1 || b0 > b1) break;
          y = top + s;
          const ridge = (a1 - a0 <= 1) || (b1 - b0 <= 1);
          for (let z = b0; z <= b1; z++) for (let x = a0; x <= a1; x++) {
            const ex = x === a0 || x === a1, ez = z === b0 || z === b1;
            if (!ex && !ez && !ridge) { w.set(x, y, z, B.slateDk); continue; }
            let b;
            if (ridge) b = B.bronze;
            else if (s === 0) b = B.iron;
            else if (ex && ez) b = B.slateDk;
            else { const u = ex ? z : x; b = ((u + (s & 1) * 2) & 3) === 0 ? B.slateDk : (hash3(u >> 2, s, 5) > 0.72 ? B.slate2 : B.slate); }
            w.set(x, y, z, b);
          }
          if (ridge) {
            for (const [fx, fz] of [[a0, b0], [a1, b1]]) { w.set(fx, y + 1, fz, B.bronze); w.set(fx, y + 2, fz, B.gold); }
            break;
          }
        }
        return y + 1;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, (y - yb) % 6 === 5 ? B.graniteDk : stoneAt(dx + dz, y, cx, SD) || B.grJ);
        w.box(cx - 1, yt - 1, cz - 1, cx + 4, yt - 1, cz + 4, B.bronze);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.cap);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) w.box(px, yt + 1, pz, px, yt + 3, pz, B.iron);
        return [cx + 2, yt + 4, cz + 2];
      };
      // 집 전체. o: x,z,sx,sz,floors,fh,face,band(층 띠 재료),chimney,dormers,wh(창 높이)
      const dhouse = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y, band = o.band || B.bronze, salt = x0 * 7 + z0;
        // 기초: 어두운 낱돌, 맨 윗단은 갓돌
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.sd2); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.cap); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, ash(u, y, 3, SD));
          }
        }
        let yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, lamp: null };
        const S = SIDES(x0, z0, x1, z1);
        for (let f = 0; f < fl; f++) {
          w.box(x0, yb, z0, x1, yb + fh - 1, z1, B.gr1);
          const wh = o.wh || Math.min(7, fh - 5), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], Ln = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0;
            // 줄눈 있는 화강암 벽, 모서리 귀돌(긴 돌·짧은 돌 번갈아)
            for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
              const ci = Math.min(u - sd.u0, sd.u1 - u), course = Math.floor((y - yb) / 3), r = (y - yb) % 3;
              if (ci <= ((course & 1) ? 1 : 3)) put(sd, u, y, 0, r === 2 ? B.grJ : B.cap);
              else put(sd, u, y, 0, ash(u, y, salt + k.charCodeAt(0)));
            }
            // 층 띠(내민 한 줄)
            for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, yb + fh - 1, 1, band);
            const nW = Math.max(1, Math.floor((Ln + 2) / 13));
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * Ln / nW), wu = c - 2;
              if (isDoor && Math.abs(c - cu) < 11) continue;
              if (wu - 2 <= sd.u0 + 3 || wu + 6 >= sd.u1 - 3) continue;
              windowAt(sd, wu, wy, wh);
            }
            if (isDoor) { const r = doorAt(sd, cu, yb, { lantern: true }); out.door = r.door; out.lamp = r.lamp; out.side = sd; }
          }
          yb += fh;
        }
        const top = yb;
        out.top = top;
        // 처마 밑 까치발(쇠)
        for (const k of ['s', 'n', 'e', 'w']) { const sd = S[k]; for (let u = sd.u0 + 2; u <= sd.u1 - 2; u += 4) { put(sd, u, top - 1, 1, B.ironDk); put(sd, u, top - 1, 2, B.ironDk); } }
        out.peak = hipRoof(x0, x1, z0, z1, top, 3);
        if (o.dormers) {
          const dz1 = z1 + 1, step = Math.floor(o.sx / (o.dormers + 1));
          for (let q = 1; q <= o.dormers; q++) {
            const cx = x0 + q * step, dyb = top + 1;
            for (let y = dyb; y <= dyb + 6; y++) for (let x = cx - 3; x <= cx + 3; x++) for (let z = dz1 - 7; z <= dz1; z++) w.set(x, y, z, (x === cx - 3 || x === cx + 3) ? B.cap : B.gr2);
            for (let y = dyb + 1; y <= dyb + 4; y++) for (let x = cx - 1; x <= cx + 1; x++) w.set(x, y, dz1, x === cx || y === dyb + 3 ? B.iron : B.win);
            for (let x = cx - 4; x <= cx + 4; x++) w.set(x, dyb, dz1 + 1, B.cap);
            for (let k = 0; k <= 4; k++) for (let x = cx - 4 + k; x <= cx + 4 - k; x++) for (let z = dz1 - 8; z <= dz1 + 1; z++) w.set(x, dyb + 7 + k, z, k === 4 ? B.bronze : (x === cx - 4 + k || x === cx + 4 - k) ? (((z + k) & 3) ? B.slate : B.slateDk) : B.slateDk);
          }
        }
        if (o.chimney !== false) {
          const cx = x0 + 3, cz = Math.floor((z0 + z1) / 2) - 1;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };

      // ───────── 고원 길: 넓적돌 포장 ─────────
      MH.path(w, [[40, 164], [120, 164], [200, 172], [256, 172], [300, 144]], 4.4, B.pave);
      MH.path(w, [[90, 148], [90, 164]], 3.2, B.pave);
      const ROAD = [[40, 164], [120, 164], [200, 172], [256, 172], [300, 144]];

      // ═════════ 광산 입구 ═════════
      const MX = 142;
      let cz = 104; while (cz < 158 && MH.g(w, MX, cz) > L + 4) cz++;
      const T0 = 16;
      const inT = (dx, y) => Math.abs(dx) <= 8 && y >= L + 1 && (y <= L + 12 || dx * dx + (y - L - 12) * (y - L - 12) <= 72.25);
      for (let z = T0; z <= cz + 3; z++) for (let x = MX - 9; x <= MX + 9; x++) for (let y = L + 1; y <= L + 22; y++) if (inT(x - MX, y)) w.set(x, y, z, 0);
      for (let x = MX - 9; x <= MX + 9; x++) for (let y = L + 1; y <= L + 22; y++) if (inT(x - MX, y)) w.set(x, y, T0, B.coal);
      w.box(MX - 8, L, T0, MX + 8, L, cz + 3, B.graniteDk);
      // 갱목 틀: 두께 2칸 기둥과 들보, 까치발, 걸린 등
      for (let z = T0 + 4; z <= cz - 3; z += 10) {
        for (const x of [MX - 8, MX - 7, MX + 7, MX + 8]) w.box(x, L + 1, z, x, L + 16, z + 1, B.timber);
        w.box(MX - 8, L + 17, z, MX + 8, L + 18, z + 1, B.timber);
        for (const s of [-1, 1]) { w.set(MX + s * 6, L + 16, z, B.timberDk); w.set(MX + s * 6, L + 16, z + 1, B.timberDk); }
        if (((z - T0 - 4) / 10) % 2 === 0) { w.set(MX - 6, L + 15, z + 2, B.iron); w.set(MX - 6, L + 14, z + 2, B.fireY); w.set(MX - 6, L + 13, z + 2, B.ironDk); }
      }
      // 정문 벽: 낱돌, 2칸 두께, 뒤는 산까지 메운다
      const FW = 20, FT = L + 36;
      for (let x = MX - FW; x <= MX + FW; x++) for (let y = L + 1; y <= FT; y++) {
        if (inT(x - MX, y)) continue;
        w.set(x, y, cz, ash(x, y, 41)); w.set(x, y, cz + 1, ash(x, y, 41));
        for (let z = cz - 1; z > cz - 24 && !w.get(x, y, z); z--) w.set(x, y, z, B.cliff);
      }
      // 아치: 쐐기돌(밝고 어두운 돌 번갈아), 안쪽 청동 띠, 문설주, 이맛돌(청동·금)
      for (let x = MX - 12; x <= MX + 12; x++) for (let y = L + 1; y <= L + 25; y++) {
        const dx = x - MX, dy = y - L - 12, r = y > L + 12 ? Math.hypot(dx, dy) : Math.abs(dx);
        if (r < 8.5 || r > 12) continue;
        let b;
        if (r < 9.4) b = y > L + 12 ? B.bronze : (((y - L) >> 1) & 1 ? B.bronze : B.graniteDk);
        else if (y > L + 12) { const sec = Math.floor((Math.atan2(dy, dx) + 0.0001) / (Math.PI / 11)); b = Math.abs(dx) <= 1.5 ? B.bronze : (sec & 1 ? B.gr3 : B.graniteDk); if (Math.abs(dx) <= 0.5 && r > 10 && r < 11.5) b = B.gold; }
        else b = (((y - L - 1) / 3 | 0) & 1) ? B.gr3 : B.graniteDk;
        for (let z = cz; z <= cz + 2; z++) w.set(x, y, z, b);
      }
      // 벽기둥 넷(받침·몸돌 마디·주두)
      for (const px of [MX - 17, MX + 17]) for (let x = px - 2; x <= px + 2; x++) for (let y = L + 1; y <= L + 32; y++) {
        const capb = y <= L + 3 || y >= L + 30;
        for (let z = cz + 2; z <= cz + (capb ? 4 : 3); z++) w.set(x, y, z, capb ? B.cap : ((y - L) % 6 === 0 ? B.graniteDk : B.gr3));
        if (capb) for (const xx of [px - 3, px + 3]) for (let z = cz + 2; z <= cz + 4; z++) w.set(xx, y, z, B.cap);
      }
      // 룬 띠: 여덟 개의 룬 글자
      const RUNES = [[[0, 0], [0, 1], [0, 2], [1, 1]], [[0, 0], [1, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [0, 2], [1, 2]], [[1, 0], [0, 1], [1, 2], [1, 1]]];
      for (let k = 0; k < 8; k++) {
        const rx = MX - 14 + k * 4;
        w.box(rx - 1, L + 23, cz + 2, rx + 2, L + 27, cz + 2, B.graniteDk);
        for (const [dx, dy] of RUNES[k % 4]) w.set(rx + dx, L + 24 + dy, cz + 2, B.rune);
      }
      // 망치와 모루 문장(청동 판에 금)
      w.box(MX - 4, L + 28, cz + 2, MX + 4, L + 34, cz + 2, B.bronzeDk); w.walls(MX - 4, L + 28, cz + 2, MX + 4, L + 34, cz + 2, B.bronze);
      w.box(MX - 2, L + 29, cz + 3, MX + 2, L + 29, cz + 3, B.gold); w.box(MX - 1, L + 30, cz + 3, MX + 1, L + 30, cz + 3, B.gold);
      w.box(MX, L + 31, cz + 3, MX, L + 33, cz + 3, B.gold); w.box(MX - 2, L + 33, cz + 3, MX + 2, L + 33, cz + 3, B.gold);
      // 돌림띠와 이빨 장식, 위로 계단꼴 갓돌
      for (let x = MX - FW - 2; x <= MX + FW + 2; x++) {
        for (let z = cz; z <= cz + 4; z++) { w.set(x, FT + 1, z, B.cap); w.set(x, FT + 2, z, B.graniteDk); }
        if (x % 2 === 0) w.set(x, FT, cz + 2, B.graniteDk);
        for (let z = cz - 1; z > cz - 20 && !w.get(x, FT + 1, z); z--) { w.set(x, FT + 1, z, B.cliff); w.set(x, FT + 2, z, B.cliff); }
        if (((x - MX + 40) % 6) < 3) for (let z = cz; z <= cz + 2; z++) w.box(x, FT + 3, z, x, FT + 4, z, B.gr3);
      }
      // 화로 둘(돌 받침·쇠기둥·쇠 그릇의 불)
      for (const bx of [MX - 26, MX + 26]) {
        const bz = cz + 6;
        w.box(bx - 2, L + 1, bz - 2, bx + 2, L + 2, bz + 2, B.graniteDk); w.box(bx - 2, L + 3, bz - 2, bx + 2, L + 3, bz + 2, B.cap);
        w.box(bx, L + 4, bz, bx, L + 12, bz, B.iron); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) w.set(bx + dx, L + 8, bz + dz, B.bronze);
        w.box(bx - 1, L + 13, bz - 1, bx + 1, L + 13, bz + 1, B.iron); w.walls(bx - 2, L + 14, bz - 2, bx + 2, L + 15, bz + 2, B.iron);
        w.box(bx - 1, L + 14, bz - 1, bx + 1, L + 14, bz + 1, B.ember);
        w.box(bx, L + 15, bz, bx, L + 17, bz, B.fireY); w.set(bx - 1, L + 15, bz, B.fireY); w.set(bx + 1, L + 16, bz + 1, B.fireY); w.set(bx, L + 15, bz - 1, B.ember);
        lights.push({ name: 'mine', p: [bx + 0.5, L + 17, bz + 0.5], c: '#ffb050', i: 1.2, d: 32, flicker: 0.25 });
      }
      // 갱도 앞 광석 더미와 석탄 더미
      w.ellipsoid(MX - 40, L + 1, cz + 14, 6, 4, 6, B.gravel, (dx, dy) => dy >= 0);
      for (let q = 0; q < 14; q++) { const x = MX - 43 + (q % 5) + (q >> 2), z = cz + 12 + ((q * 3) % 5); w.set(x, w.top(x, z) + 1, z, q % 3 ? B.ore : B.oreB); }
      w.ellipsoid(MX + 40, L + 1, cz + 14, 6, 4, 5, B.coal, (dx, dy, dz) => dy >= 0 && hash3(MX + dx, dy, dz) > 0.08);
      // 선로: 갱도 안에서 협곡 철교 너머 남쪽 제련소를 지나 지도 밖까지(침목 위 레일)
      for (let z = 280; z < D; z++) for (let x = MX - 8; x <= MX + 8; x++) MH.setH(w, x, z, L, B.gravel, B.rock);
      for (let z = T0 + 1; z < D; z++) {
        if (z % 4 < 2) w.box(MX - 6, L, z, MX + 6, L, z, B.sleeper);
        w.set(MX - 4, L + 1, z, B.rail); w.set(MX + 4, L + 1, z, B.rail);
      }
      // 협곡 철교: 판자 바닥, 양옆 트러스(아래·위 현재, 수직재, 빗재), 버팀다리와 가새, 걸린 등
      for (let z = 212; z <= 284; z++) {
        w.box(MX - 9, L - 1, z, MX + 9, L - 1, z, B.plank); w.box(MX - 9, L - 2, z, MX + 9, L - 2, z, z % 4 < 2 ? B.timberDk : 0);
        if (z % 4 < 2) w.box(MX - 6, L, z, MX + 6, L, z, B.sleeper);
        for (const x of [MX - 9, MX + 9]) { w.set(x, L - 2, z, B.timber); w.set(x, L, z, B.timber); w.set(x, L + 5, z, B.timber); w.set(x, L + 6, z, B.timber); }
        if (z % 6 === 0) for (const x of [MX - 9, MX + 9]) w.box(x, L + 1, z, x, L + 4, z, B.timber);
        if (z % 12 === 0) {
          for (const x of [MX - 9, MX + 9]) { if (z + 6 <= 284) w.line(x, L + 1, z, x, L + 4, z + 6, B.timber); if (z - 6 >= 212) w.line(x, L + 1, z, x, L + 4, z - 6, B.timber); }
          for (const x of [MX - 10, MX - 9, MX + 9, MX + 10]) { const bottom = Math.max(MH.g(w, x, z), LAVA - 6); for (let y = bottom; y < L - 2; y++) { w.set(x, y, z, B.timber); w.set(x, y, z + 1, B.timber); } }
          const bottom = Math.max(MH.g(w, MX, z), LAVA - 6);
          if (z + 12 <= 284) for (const x of [MX - 10, MX + 10]) { w.line(x, L - 4, z, x, bottom + 6, z + 12, B.timber); w.line(x, L - 4, z + 12, x, bottom + 6, z, B.timber); }
          w.box(MX - 10, L - 4, z, MX + 10, L - 3, z + 1, B.timber);
          for (let y = L - 8; y > bottom + 4; y -= 10) w.box(MX - 10, y, z, MX + 10, y, z + 1, B.timber);
        }
        if (z % 24 === 0) { w.box(MX - 10, L + 7, z, MX - 10, L + 8, z, B.iron); w.set(MX - 11, L + 8, z, B.iron); w.set(MX - 11, L + 7, z, B.fireY); w.set(MX - 11, L + 6, z, B.ironDk); }
      }
      // 광차(부품): 레일 위 바퀴, 쇠 차체와 청동 모서리, 광석 짐
      const CZ0 = 148;
      const cart = w.prop({ name: 'cart', pivot: [MX + 0.5, L + 2, CZ0 + 0.5] });
      for (const x of [MX - 4, MX + 4]) for (const zc of [CZ0 - 4, CZ0 + 4]) { for (let dy = 0; dy <= 2; dy++) cart.set(x, L + 2 + dy, zc, B.coal2); cart.set(x, L + 3, zc - 1, B.coal2); cart.set(x, L + 3, zc + 1, B.coal2); cart.set(x, L + 3, zc, B.iron); }
      cart.box(MX - 3, L + 3, CZ0 - 4, MX + 3, L + 3, CZ0 - 4, B.ironDk); cart.box(MX - 3, L + 3, CZ0 + 4, MX + 3, L + 3, CZ0 + 4, B.ironDk);
      cart.box(MX - 5, L + 5, CZ0 - 6, MX + 5, L + 5, CZ0 + 6, B.iron);
      cart.walls(MX - 5, L + 6, CZ0 - 6, MX + 5, L + 9, CZ0 + 6, B.iron);
      for (const x of [MX - 5, MX + 5]) for (const z of [CZ0 - 6, CZ0 + 6]) cart.box(x, L + 5, z, x, L + 10, z, B.bronze);
      for (let z = CZ0 - 6; z <= CZ0 + 6; z++) { cart.set(MX - 5, L + 10, z, B.bronze); cart.set(MX + 5, L + 10, z, B.bronze); }
      for (let x = MX - 5; x <= MX + 5; x++) { cart.set(x, L + 10, CZ0 - 6, B.bronze); cart.set(x, L + 10, CZ0 + 6, B.bronze); }
      for (let z = CZ0 - 5; z <= CZ0 + 5; z++) for (let x = MX - 4; x <= MX + 4; x++) {
        const hgt = Math.round(4.5 - Math.hypot((x - MX) * 0.8, (z - CZ0) * 0.55) * 0.9 + hash3(x, 9, z));
        for (let y = L + 6; y <= L + 6 + hgt; y++) cart.set(x, y, z, y === L + 6 + hgt ? ((hash3(x, y, z) > 0.75) ? B.oreB : B.ore) : B.gravel);
      }
      for (const z of [CZ0 - 7, CZ0 + 7]) { cart.set(MX, L + 4, z, B.iron); cart.set(MX, L + 4, z + (z < CZ0 ? -1 : 1), B.ironDk); }
      const cartRoute = [20, 40, 60, 80, 100, 120, 140, 160, 180, D + 24 - CZ0].map(dz => [0, 0, dz]);
      acts.push({
        name: '광차', hint: '광석을 가득 실은 광차가 철교를 건너 제련소 너머로 달려가요', hit: [MX - 5, L + 2, CZ0 - 7, MX + 5, L + 12, CZ0 + 7],
        run: async a => {
          a.flash('mine', 2, 3);
          a.burst([MX + 0.5, L + 12, CZ0 + 0.5], { n: 28, colors: ['#e8c040', '#ffe090'], speed: 8, up: 8, life: 1.2, gravity: 16, spread: 4 });
          await a.drive('cart', cartRoute, 18, { fwd: '+z', back: 1.0 });
        },
      });
      landmarks.push({ name: '광산 입구', note: '산속 깊이 이어진 갱도', p: [MX + 0.5, L + 48, cz + 0.5], tag: 'MINE' });
      landmarks.push({ name: '협곡 철교', note: '용암 위를 건너는 선로', p: [MX + 0.5, L + 18, 249] });

      // ═════════ 절벽 주거지 ═════════
      const dwell = (dx, dy) => {
        let z = 158; while (z > 8 && MH.g(w, dx, z) < dy + 16) z--;
        const fz = z + 1;
        w.box(dx - 8, dy + 1, fz - 9, dx + 8, dy + 15, fz, 0);
        // 안쪽 벽: 청동 문, 쇠살 창 둘
        for (let x = dx - 8; x <= dx + 8; x++) for (let y = dy + 1; y <= dy + 15; y++) w.set(x, y, fz - 9, ash(x, y, dx));
        w.box(dx - 8, dy, fz - 9, dx + 8, dy, fz, B.sd2);
        const sd = { k: 's', u0: dx - 8, u1: dx + 8, at: (u, d) => [u, fz - 9 + d] };
        doorAt(sd, dx, dy + 1, { steps: false });
        for (const wu of [dx - 8, dx + 4]) windowAt(sd, wu, dy + 5, 5);
        // 바깥 테두리: 낱돌 문틀, 상인방 돌림띠
        for (let x = dx - 10; x <= dx + 10; x++) for (let y = dy; y <= dy + 18; y++) {
          const rim = Math.abs(x - dx) >= 9 || y >= dy + 16 || y === dy;
          if (!rim) continue;
          w.set(x, y, fz, y === dy + 16 ? B.bronze : (y >= dy + 17 && x % 2 ? B.graniteDk : ash(x, y, dx + 1)));
          w.set(x, y, fz - 1, B.cliff);
        }
        // 앞 마루: 판자, 장선, 난간 동자와 손잡이, 바위에 박은 빗버팀
        w.box(dx - 8, dy, fz + 1, dx + 8, dy, fz + 8, B.plank);
        for (let x = dx - 8; x <= dx + 8; x += 4) w.box(x, dy - 1, fz + 1, x, dy - 1, fz + 8, B.timberDk);
        for (let x = dx - 8; x <= dx + 8; x++) { w.set(x, dy + 4, fz + 8, B.timber); if (x % 2 === 0 || Math.abs(x - dx) === 8) w.box(x, dy + 1, fz + 8, x, dy + 3, fz + 8, B.timber); }
        for (let z2 = fz + 1; z2 <= fz + 8; z2++) for (const x of [dx - 8, dx + 8]) { w.set(x, dy + 4, z2, B.timber); if (z2 % 2) w.box(x, dy + 1, z2, x, dy + 3, z2, B.timber); }
        for (const x of [dx - 8, dx + 8]) w.line(x, dy - 2, fz + 8, x, dy - 11, fz, B.timber);
        // 처마 등, 쇠 굴뚝 관, 술통
        w.box(dx + 8, dy + 13, fz + 1, dx + 8, dy + 14, fz + 2, B.iron); w.set(dx + 8, dy + 12, fz + 2, B.fireY); w.set(dx + 8, dy + 11, fz + 2, B.fireY); w.set(dx + 8, dy + 10, fz + 2, B.ironDk);
        w.box(dx - 6, dy + 19, fz - 2, dx - 5, dy + 26, fz - 1, B.iron); w.box(dx - 7, dy + 27, fz - 3, dx - 4, dy + 27, fz, B.ironDk);
        barrel(w, dx + 5, dy + 1, fz + 4, 5, 1.8);
        return [dx, dy, fz];
      };
      const homes = [dwell(52, L + 24), dwell(90, L + 48), dwell(194, L + 28), dwell(246, L + 52), dwell(284, L + 24), dwell(220, L + 72)];
      homes.forEach(([x, y, z], k) => { if (k % 2 === 0) lights.push({ p: [x - 5.5, y + 8, z - 6], c: '#ffb050', i: 0.9, d: 20, flicker: 0.2, night: true }); });
      // 절벽 계단 두 줄(한 칸씩 오르는 돌계단과 쇠 난간)
      const flight = (x0, y0, nSteps) => {
        for (let i = 0; i < nSteps; i++) {
          const x = x0 + i, y = y0 + i;
          let z = 158; while (z > 8 && MH.g(w, x, z) < y + 6) z--;
          w.box(x, y - 1, z + 1, x, y, z + 6, B.gr3); w.set(x, y, z + 6, B.cap);
          w.box(x, y + 1, z + 1, x, y + 10, z + 6, 0);
          w.set(x, y + 4, z + 7, B.iron); if (i % 3 === 0) w.box(x, y + 1, z + 7, x, y + 3, z + 7, B.iron);
        }
      };
      flight(62, L + 1, 24); flight(74, L + 25, 24);

      // ═════════ 절벽 승강기 ═════════
      const EX = 304, top = L + 52;
      let sz = 158; while (sz > 8 && MH.g(w, EX, sz) < top) sz--;
      w.box(EX - 10, top, sz - 12, EX + 10, top, sz, B.plank); w.box(EX - 10, top - 1, sz - 12, EX + 10, top - 1, sz, B.timberDk);
      w.box(EX - 10, top + 1, sz - 12, EX + 10, top + 13, sz, 0);
      for (let x = EX - 10; x <= EX + 10; x++) for (let y = top + 1; y <= top + 13; y++) w.set(x, y, sz - 12, ash(x, y, 77, SD));
      { const sd = { k: 's', u0: EX - 10, u1: EX + 10, at: (u, d) => [u, sz - 12 + d] }; doorAt(sd, EX, top + 1, { steps: false }); }
      barrel(w, EX - 7, top + 1, sz - 8, 6, 2.2); barrel(w, EX - 7, top + 1, sz - 3, 6, 2.2); barrel(w, EX - 7, top + 7, sz - 8, 5, 1.8);
      crate(w, EX + 5, top + 1, sz - 10, 4); crate(w, EX + 5, top + 5, sz - 10, 4); crate(w, EX + 6, top + 1, sz - 5, 3);
      const Z0 = sz + 1, Z1 = sz + 12, TOPB = top + 20;
      for (let z = Z0; z <= 120; z++) for (let x = EX - 8; x <= EX + 8; x++) { MH.setH(w, x, z, L, B.gravel, B.rock); for (let y = L + 1; y <= TOPB + 18; y++) w.set(x, y, z, 0); }
      for (const [x, z] of [[EX - 7, Z0], [EX + 6, Z0], [EX - 7, Z1 - 1], [EX + 6, Z1 - 1]]) { w.box(x, L + 1, z, x + 1, TOPB, z + 1, B.timber); w.box(x - 1, L + 1, z - 1, x + 2, L + 2, z + 2, B.graniteDk); }
      for (let y = L + 16; y <= TOPB; y += 16) {
        w.box(EX - 7, y, Z0, EX + 7, y, Z0 + 1, B.timber); w.box(EX - 7, y, Z1 - 1, EX + 7, y, Z1, B.timber);
        w.box(EX - 7, y, Z0, EX - 6, y, Z1, B.timber); w.box(EX + 6, y, Z0, EX + 7, y, Z1, B.timber);
      }
      for (const x of [EX - 7, EX + 7]) for (let y = L + 3; y + 16 <= TOPB; y += 16) w.line(x, y, Z0 + 2, x, y + 13, Z1 - 2, B.timberDk);
      w.box(EX - 8, TOPB + 1, Z0 + 4, EX + 8, TOPB + 2, Z0 + 7, B.timber);
      for (const z of [Z0 + 4, Z0 + 8]) w.box(EX, TOPB + 3, z, EX, TOPB + 8, z, B.timber);
      const PZ = Z0 + 6;
      const pul = w.prop({ name: 'pulley', pivot: [EX + 0.5, TOPB + 8.5, PZ + 0.5], axis: 'z' });
      MH.ringProp(pul, EX, TOPB + 8, PZ, 4, 'xy', B.bronze, B.iron, 6); MH.ringProp(pul, EX, TOPB + 8, PZ, 3, 'xy', B.bronzeDk);
      for (let k = -2; k <= 2; k++) { pul.set(EX + k, TOPB + 8, PZ, B.iron); pul.set(EX, TOPB + 8 + k, PZ, B.iron); }
      const cy0 = L + 1, cageTop = cy0 + 12, ropeLen = TOPB - cageTop;
      MH.rope(w, 'lrope', EX, TOPB, PZ, ropeLen, B.rope);
      const cage = w.prop({ name: 'lift', pivot: [EX + 0.5, cy0, PZ + 0.5] });
      cage.box(EX - 4, cy0, Z0 + 2, EX + 4, cy0, Z1 - 2, B.plank);
      for (const [x, z] of [[EX - 4, Z0 + 2], [EX + 4, Z0 + 2], [EX - 4, Z1 - 2], [EX + 4, Z1 - 2]]) cage.box(x, cy0 + 1, z, x, cageTop - 1, z, B.iron);
      for (let x = EX - 4; x <= EX + 4; x += 2) for (const z of [Z0 + 2, Z1 - 2]) cage.box(x, cy0 + 1, z, x, cy0 + 5, z, B.iron);
      for (let x = EX - 4; x <= EX + 4; x++) for (const z of [Z0 + 2, Z1 - 2]) cage.set(x, cy0 + 5, z, B.bronze);
      cage.box(EX - 4, cageTop, Z0 + 2, EX + 4, cageTop, Z1 - 2, B.iron); cage.set(EX, cageTop, PZ, B.bronze);
      barrel(cage, EX - 2, cy0 + 1, Z0 + 5, 5, 1.6); crate(cage, EX + 1, cy0 + 1, Z1 - 6, 3);
      acts.push({
        name: '절벽 승강기', hint: '쇠우리가 윗선반까지 올라갔다 내려와요', hit: [EX - 6, L + 1, Z0, EX + 6, L + 16, Z1],
        run: async a => {
          const up = top + 1 - cy0;
          await Promise.all([a.move('lift', [0, up, 0], 4.5, t => t), a.rope('lrope', ropeLen, ropeLen - up, 4.5, t => t), a.turn('pulley', [0, 0, 9], 4.5, t => t)]);
          await a.wait(1.2);
          await Promise.all([a.move('lift', [0, 0, 0], 4, t => t), a.rope('lrope', ropeLen, ropeLen, 4, t => t), a.turn('pulley', [0, 0, 0], 4, t => t)]);
        },
      });
      landmarks.push({ name: '절벽 승강기', note: '윗선반의 창고로 가는 길', p: [EX + 0.5, TOPB + 20, PZ] });

      // ═════════ 대장간, 풀무, 굴뚝 ═════════
      const FX = 204, FZ = 136;
      const forge = dhouse({ x: FX, z: FZ, sx: 38, sz: 30, fh: 18, face: 'w', y: L, band: B.bronze, chimney: false, wh: 8 });
      // 큰 굴뚝 탑: 줄눈 돌, 청동 띠, 위는 넓힌 갓과 쇠 갓
      const CX = FX + 28, CZc = FZ + 2;
      for (let y = L + 1; y <= forge.peak + 24; y++) for (let z = CZc; z <= CZc + 7; z++) for (let x = CX; x <= CX + 7; x++) {
        const edge = x === CX || x === CX + 7 || z === CZc || z === CZc + 7;
        if (!edge) { w.set(x, y, z, y > forge.peak + 18 ? 0 : B.sd2); continue; }
        w.set(x, y, z, (y - L) % 10 === 0 ? B.bronze : ash(x + z, y, 51, SD));
      }
      w.walls(CX - 1, forge.peak + 25, CZc - 1, CX + 8, forge.peak + 26, CZc + 8, B.cap);
      w.box(CX + 2, forge.peak + 19, CZc + 2, CX + 5, forge.peak + 19, CZc + 5, B.ember);
      // 화덕(집 앞 서쪽): 돌 아궁이 속 불, 위 갓과 연통
      w.box(FX - 12, L + 1, FZ + 2, FX - 6, L + 10, FZ + 10, B.graniteDk);
      for (let y = L + 1; y <= L + 10; y++) for (let z = FZ + 2; z <= FZ + 10; z++) w.set(FX - 12, y, z, ash(z, y, 61, SD));
      w.box(FX - 12, L + 3, FZ + 4, FX - 9, L + 8, FZ + 8, 0);
      w.box(FX - 11, L + 3, FZ + 4, FX - 8, L + 3, FZ + 8, B.coal);
      for (let z = FZ + 4; z <= FZ + 8; z++) for (let x = FX - 11; x <= FX - 8; x++) w.set(x, L + 4, z, hash3(x, 4, z) > 0.5 ? B.ember : B.molten);
      w.box(FX - 10, L + 5, FZ + 5, FX - 8, L + 6, FZ + 7, B.ember); w.set(FX - 9, L + 7, FZ + 6, B.fireY);
      w.box(FX - 13, L + 9, FZ + 3, FX - 13, L + 9, FZ + 9, B.bronze);
      w.box(FX - 11, L + 11, FZ + 4, FX - 7, L + 12, FZ + 8, B.bronzeDk); w.box(FX - 10, L + 13, FZ + 5, FX - 8, L + 26, FZ + 7, B.sd1);
      for (let y = L + 16; y <= L + 26; y += 5) w.walls(FX - 10, y, FZ + 5, FX - 8, y, FZ + 7, B.bronze);
      // 모루(화덕 옆)
      w.box(FX - 22, L + 1, FZ + 4, FX - 20, L + 3, FZ + 6, B.timber);
      w.box(FX - 23, L + 4, FZ + 4, FX - 19, L + 4, FZ + 6, B.iron); w.box(FX - 24, L + 5, FZ + 4, FX - 18, L + 6, FZ + 6, B.iron); w.set(FX - 17, L + 6, FZ + 5, B.iron);
      // 담금질 물통과 무기 걸이
      w.walls(FX - 26, L + 1, FZ - 6, FX - 18, L + 4, FZ - 1, B.timber); w.box(FX - 25, L + 1, FZ - 5, FX - 19, L + 3, FZ - 2, B.basalt);
      for (const x of [FX - 26, FX - 18]) for (const z of [FZ - 6, FZ - 1]) w.box(x, L + 1, z, x, L + 4, z, B.iron);
      for (let x = FX - 6; x <= FX - 2; x++) {
        w.set(x, L + 1, FZ - 4, B.timber); w.set(x, L + 8, FZ - 4, B.timber);
        if (x === FX - 6 || x === FX - 2) w.box(x, L + 1, FZ - 4, x, L + 9, FZ - 4, B.timber);
        else { w.box(x, L + 2, FZ - 3, x, L + 7, FZ - 3, B.timberDk); w.box(x, L + 5, FZ - 3, x, L + 7, FZ - 2, x % 2 ? B.iron : B.bronze); }
      }
      // 풀무(부품)
      const bz = FZ + 20;
      for (const x of [FX - 16, FX - 28]) w.box(x, L + 1, bz, x, L + 5, bz + 4, B.timber);
      const bel = w.prop({ name: 'bellows', pivot: [FX - 16, L + 8, bz + 2.5], axis: 'z' });
      bel.box(FX - 28, L + 6, bz, FX - 16, L + 6, bz + 4, B.plank); bel.box(FX - 28, L + 12, bz, FX - 16, L + 12, bz + 4, B.plank);
      for (let y = L + 7; y <= L + 11; y++) bel.box(FX - 27 + ((y & 1) ? 0 : 1), y, bz + ((y & 1) ? 0 : 1), FX - 17, y, bz + 4 - ((y & 1) ? 0 : 1), (y & 1) ? B.leather : B.leather2);
      bel.box(FX - 15, L + 8, bz + 2, FX - 12, L + 9, bz + 2, B.iron); bel.box(FX - 30, L + 12, bz + 1, FX - 29, L + 12, bz + 3, B.timber);
      lights.push({ name: 'forge', p: [FX - 9, L + 6, FZ + 6], c: '#ff7a2a', i: 1.7, d: 40, flicker: 0.35 });
      acts.push({
        name: '대장간 풀무', hint: '풀무질에 화덕이 불꽃을 뿜어요', hit: [FX - 30, L + 1, bz, FX - 12, L + 13, bz + 4],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.tween('bellows', { rot: [0, 0, 0.2], scl: [1, 0.6, 1] }, 0.38);
            a.flash('forge', 3, 0.5);
            a.burst([FX - 9, L + 8, FZ + 6], { n: 44, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], speed: 10, up: 14, life: 1.3, gravity: 4, spread: 3 });
            await a.tween('bellows', { rot: [0, 0, 0], scl: [1, 1, 1] }, 0.38);
          }
        },
      });
      landmarks.push({ name: '대장간', note: '밤낮으로 달아오른 화덕', p: [FX + 19, forge.peak + 40, FZ + 14], tag: 'FORGE' });
      // 대장간 안으로: 서쪽 청동 문
      const fdz = forge.door[2];
      acts.push(OR.goAct({ at: [FX - 3, L + 1, fdz], h: 10, name: '대장간 안으로', goto: 'ironhollow-forge', hint: '청동 문을 밀고 들어가 큰 화덕과 모루, 무기 진열실을 구경해요', hit: [FX - 1, L + 1, fdz - 2, FX, L + 12, fdz + 2] }));

      // ═════════ 용암 수로: 절벽에서 흘러 협곡으로 떨어진다(바닥을 파서 길보다 낮게) ═════════
      const lavaPath = [[268, 78], [272, 120], [270, 174], [272, 220]];
      for (let z = 0; z < D; z++) for (let x = 236; x < 304; x++) {
        const d = MH.polyDist(x, z, lavaPath);
        if (d > 5.5) continue;
        const gg = MH.g(w, x, z);
        if (gg < base - 20) continue;
        if (d <= 4) { MH.setH(w, x, z, gg - 3, B.basalt, B.basalt); w.liquid(x, z, gg - 1); }
        else if (gg <= L + 1) MH.paint(w, x, z, B.basalt);
      }
      lights.push({ name: 'chan', p: [271, L, 158], c: '#ff5a1a', i: 1.2, d: 32, flicker: 0.2, liquid: true });
      // 길이 수로를 건너는 곳: 돌다리(바닥은 길 높이, 양옆 난간)
      for (let z = 120; z < 212; z++) for (let x = 256; x < 290; x++) {
        if (MH.polyDist(x, z, lavaPath) > 5.5) continue;
        const rd = MH.polyDist(x + 0.5, z + 0.5, ROAD);
        if (rd <= 5.5) { w.set(x, L, z, rd < 4.4 ? paveAt(x, z) : B.cap); w.set(x, L - 1, z, B.graniteDk); w.set(x, L + 1, z, 0); }
        else if (rd <= 7) { w.box(x, L - 1, z, x, L + 2, z, (x + z) % 4 === 0 ? B.graniteDk : B.gr3); w.set(x, L + 3, z, B.cap); }
      }
      // 작은 돌다리 둘(쇠 난간)
      for (const zb of [148, 194]) {
        w.box(258, L - 1, zb - 2, 284, L, zb + 2, B.graniteDk);
        for (let x = 258; x <= 284; x++) for (let z = zb - 2; z <= zb + 2; z++) w.set(x, L, z, paveAt(x, z));
        for (let x = 260; x <= 282; x++) for (const zz of [zb - 3, zb + 3]) { w.set(x, L + 1, zz, B.graniteDk); w.set(x, L + 2, zz, x % 3 ? B.iron : B.graniteDk); w.set(x, L + 3, zz, B.iron); }
      }

      // ═════════ 드워프 돌집과 주점 ═════════
      const hs = [[26, 132, 24, 20, 'e'], [32, 174, 22, 20, 'e'], [78, 178, 24, 18, 'n'], [174, 184, 22, 18, 'n']].map(([x, z, sx, sz2, face]) => dhouse({ x, z, sx, sz: sz2, fh: 12, face, y: L, band: B.bronze }));
      const tav = dhouse({ x: 74, z: 120, sx: 32, sz: 22, floors: 2, fh: 12, face: 's', y: L, band: B.timber, dormers: 2 });
      // 주점 간판: 쇠 팔에 매단 널빤지(술잔 무늬)
      const sgx = tav.x0 + 6, sgz = tav.z1 + 1;
      w.box(sgx, L + 19, sgz, sgx + 7, L + 19, sgz, B.iron); w.box(sgx + 6, L + 19, sgz + 1, sgx + 6, L + 19, sgz + 4, B.iron); w.line(sgx, L + 15, sgz, sgx + 4, L + 19, sgz, B.ironDk);
      for (const x of [sgx + 4, sgx + 8]) w.box(x, L + 17, sgz + 4, x, L + 18, sgz + 4, B.ironDk);
      w.box(sgx + 3, L + 10, sgz + 4, sgx + 9, L + 16, sgz + 4, B.plank); w.walls(sgx + 3, L + 10, sgz + 4, sgx + 9, L + 16, sgz + 4, B.timberDk);
      w.box(sgx + 5, L + 11, sgz + 5, sgx + 7, L + 14, sgz + 5, B.gold); w.set(sgx + 8, L + 12, sgz + 5, B.gold); w.set(sgx + 8, L + 13, sgz + 5, B.gold); w.box(sgx + 5, L + 15, sgz + 5, sgx + 7, L + 15, sgz + 5, B.cap);
      barrel(w, 64, L + 1, 152, 6, 2.2); barrel(w, 70, L + 1, 153, 6, 2.2); barrel(w, 66, L + 7, 152, 5, 1.8);
      barrel(w, 118, L + 1, 152, 6, 2.2); barrel(w, 110, L + 1, 148, 5, 1.8);
      // 주점 앞 긴 탁자와 걸상(문 동쪽)
      for (const z of [152, 160]) {
        w.box(96, L + 3, z, 110, L + 3, z + 1, B.plank);
        for (const x of [97, 109]) w.box(x, L + 1, z, x, L + 2, z + 1, B.timber);
        for (const zz of [z - 2, z + 3]) { w.box(96, L + 2, zz, 110, L + 2, zz, B.timber); for (const x of [96, 110]) w.set(x, L + 1, zz, B.timber); }
        for (let x = 98; x <= 108; x += 4) { w.set(x, L + 4, z + (x % 8 ? 0 : 1), B.cap); w.set(x, L + 5, z + (x % 8 ? 0 : 1), B.ore); }
      }
      if (tav.lamp) lights.push({ p: tav.lamp, c: '#ffb050', i: 1, d: 24, flicker: 0.15, night: true });
      landmarks.push({ name: '돌망치 주점', note: '흑맥주가 끊이지 않는 곳', p: [90, tav.peak + 12, 132] });
      const tdx = tav.door[0], tdz = tav.door[2];
      acts.push(OR.goAct({ at: [tdx, L + 1, tdz + 4], h: 10, name: '돌망치 주점 안으로', goto: 'ironhollow-tavern', hint: '청동 문을 열고 들어가 긴 돌탁자와 흑맥주 바, 벽난로 곁에 앉아 봐요', hit: [tdx - 2, L + 1, tdz, tdx + 2, L + 12, tdz] }));
      for (const [bx, bz2] of [[116, 200], [178, 206], [48, 204], [246, 200], [124, 300], [160, 300]]) lights.push({ p: lampPost(bx, bz2), c: '#ffb050', i: 0.8, d: 22, flicker: 0.3 });
      // 고원 가장자리 난간(협곡 쪽): 돌기둥과 쇠 난간
      for (let x = 12; x < 324; x++) {
        if (Math.abs(x - MX) <= 10) continue;
        const z = 212; if (MH.g(w, x, z) !== L) continue;
        if (x % 8 === 0) { w.box(x, L + 1, z, x, L + 3, z, B.graniteDk); w.set(x, L + 4, z, B.cap); }
        else { w.set(x, L + 3, z, B.iron); if (x % 2 === 0) w.box(x, L + 1, z, x, L + 2, z, B.ironDk); }
      }

      // ── 광산 문의 룬 ──
      acts.push({
        name: '룬 각인', hint: '광산 입구의 룬이 차례로 타오르며 금빛 불티를 뿌려요', hit: [MX - 15, L + 22, cz, MX + 15, L + 34, cz + 3],
        run: async a => {
          a.flash('mine', 3, 4.5); a.glow(1.8, 4.5);
          for (let k = 0; k < 8; k++) { a.burst([MX - 14 + k * 4 + 1, L + 25.5, cz + 3.6], { n: 16, colors: ['#ffd070', '#ffe8a0', '#ff9a3a'], speed: 3, up: 3, life: 1.2, gravity: -1, spread: 0.8 }); await a.wait(0.26); }
          for (let k = 0; k < 3; k++) { a.burst([MX + 0.5, L + 31, cz + 4], { n: 40, colors: ['#e8c040', '#ffd070', '#ffffff'], speed: 12, up: 4, life: 1.4, gravity: 8, spread: 2 }); await a.wait(0.5); }
        },
      });

      // ── 물레망치 ──
      const TX = 220, TZ = 186, TY = L + 12;
      for (const z of [TZ - 4, TZ + 4]) { w.box(TX - 2, L + 1, z - 1, TX + 3, L + 2, z + 1, B.graniteDk); w.box(TX, L + 1, z, TX + 1, TY + 6, z, B.timber); }
      w.box(TX, TY + 7, TZ - 4, TX + 1, TY + 7, TZ + 4, B.timber);
      for (const z of [TZ - 3, TZ + 3]) w.box(TX, TY, z, TX + 1, TY + 1, z, B.iron);
      w.box(TX - 13, L + 1, TZ - 3, TX - 6, L + 3, TZ + 3, B.graniteDk);
      w.box(TX - 12, L + 4, TZ - 2, TX - 8, L + 4, TZ + 2, B.iron); w.box(TX - 13, L + 5, TZ - 2, TX - 7, L + 5, TZ + 2, B.iron); w.box(TX - 6, L + 5, TZ - 1, TX - 5, L + 5, TZ + 1, B.iron);
      w.box(TX - 6, L + 6, TZ - 1, TX - 5, L + 6, TZ, B.molten);
      const th = w.prop({ name: 'thammer', pivot: [TX + 1, TY + 1, TZ + 0.5], axis: 'z' });
      th.box(TX - 12, TY, TZ - 1, TX + 12, TY + 1, TZ + 1, B.timber);
      th.box(TX - 12, TY - 6, TZ - 2, TX - 8, TY - 1, TZ + 2, B.iron); th.box(TX - 12, TY - 4, TZ - 2, TX - 8, TY - 4, TZ + 2, B.bronze);
      th.box(TX + 9, TY - 2, TZ - 1, TX + 12, TY + 3, TZ + 1, B.bronze);
      lights.push({ name: 'anvil', p: [TX - 8, L + 7, TZ + 2], c: '#ffb050', i: 0.4, d: 24, flicker: 0.3 });
      acts.push({
        name: '물레망치', hint: '커다란 망치가 들렸다가 모루를 쾅쾅 내리쳐요', hit: [TX - 13, L + 1, TZ - 4, TX + 13, TY + 7, TZ + 4],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.turn('thammer', [0, 0, -0.5], 0.55);
            await a.turn('thammer', [0, 0, 0.12], 0.16, t => t * t);
            a.flash('anvil', 6, 0.3);
            a.burst([TX - 9.5, L + 6, TZ + 0.5], { n: 40, colors: ['#ffe08a', '#ffb04a', '#ff6a2a', '#ffffff'], speed: 14, up: 8, life: 0.8, gravity: 18, spread: 1.2, flat: true });
            await a.wait(0.25);
          }
          await a.turn('thammer', [0, 0, 0], 0.5);
        },
      });
      // ── 용암 분출 ──
      const GX = 192, GZ2 = 236;
      lights.push({ name: 'geyser', p: [GX, LAVA + 4, GZ2], c: '#ff6a2a', i: 0.8, d: 68, flicker: 0.3, liquid: true });
      acts.push({
        name: '용암 분출', hint: '협곡 바닥 용암이 끓어올라 불기둥이 치솟아요', hit: [GX - 14, LAVA, GZ2 - 8, GX + 14, LAVA + 20, GZ2 + 8],
        run: async a => {
          a.flash('geyser', 5, 4); a.lightning(0.4);
          for (let k = 0; k < 8; k++) {
            a.burst([GX + (k % 3 - 1) * 4, LAVA + 2, GZ2 - 2 + (k % 2) * 4], { n: 50, colors: ['#ff5a1a', '#ffb04a', '#ffe08a', '#8a1a0a'], speed: 6, up: 48, life: 2, gravity: 28, spread: 2.8 });
            if (k % 2) a.burst([GX, L + 2, GZ2], { n: 24, colors: ['#ff5a1a', '#ffb04a', '#ffe08a'], speed: 8, up: 12, life: 1.4, gravity: 20, spread: 4 });
            await a.wait(0.4);
          }
          a.burst([GX, LAVA + 16, GZ2], { n: 60, colors: ['#5a504a', '#8a7a70'], speed: 4, up: 12, life: 2.6, gravity: -1.2, spread: 6 });
        },
      });
      // ── 용암 수로 수문 ──
      const GZ = 174;
      for (const x of [262, 278]) { w.box(x, L - 1, GZ - 1, x + 1, L + 18, GZ + 2, B.graniteDk); for (let y = L + 2; y <= L + 18; y += 4) w.box(x, y, GZ - 1, x + 1, y, GZ + 2, B.bronzeDk); }
      w.box(262, L + 19, GZ - 1, 279, L + 20, GZ + 2, B.iron); w.box(269, L + 18, GZ, 272, L + 18, GZ + 1, B.bronze); w.box(270, L + 21, GZ, 271, L + 21, GZ + 1, B.gold);
      for (const x of [264, 277]) w.box(x, L + 13, GZ - 1, x, L + 18, GZ - 1, B.iron);
      const gate = w.prop({ name: 'lgate', pivot: [271, L + 1, GZ + 1] });
      for (let x = 264; x <= 277; x++) for (let y = L - 3; y <= L + 9; y++) for (const z of [GZ, GZ + 1]) if (!w.get(x, y, z)) gate.set(x, y, z, y >= L + 8 || x === 264 || x === 277 ? B.bronze : ((x - 264) % 3 === 0 || (y - L) % 4 === 0 ? B.ironDk : B.iron));
      acts.push({
        name: '용암 수문', hint: '쇠 수문이 올라가면 막혔던 용암이 불꽃을 튀기며 쏟아져요', hit: [262, L - 3, GZ - 2, 279, L + 20, GZ + 3],
        run: async a => {
          await a.move('lgate', [0, 8, 0], 1.6);
          a.flash('chan', 3, 3.2);
          for (let k = 0; k < 7; k++) { a.burst([270.5, L, GZ + 3 + (k % 3) * 2], { n: 30, colors: ['#ff5a1a', '#ffb04a', '#ffe08a'], speed: 6, up: 8, life: 1, gravity: 18, spread: 2.8 }); await a.wait(0.4); }
          await a.move('lgate', [0, 0, 0], 1.4);
          a.burst([270.5, L + 1, GZ + 2], { n: 30, colors: ['#8a7a70', '#ff9a3a'], speed: 4, up: 6, life: 1.4, gravity: 2, spread: 3 });
        },
      });
      // ── 교대 종 ──
      const KX = 232, KZ = 204, ky = L + 22;
      for (const x of [KX - 7, KX + 6]) { w.box(x - 1, L + 1, KZ - 2, x + 2, L + 2, KZ + 2, B.graniteDk); w.box(x, L + 3, KZ - 1, x + 1, ky, KZ + 1, B.timber); }
      w.box(KX - 9, ky + 1, KZ - 1, KX + 9, ky + 2, KZ + 1, B.timber);
      for (let k = 0; k <= 3; k++) w.box(KX - 10 + k, ky + 3 + k, KZ - 3 + Math.min(k, 2), KX + 10 - k, ky + 3 + k, KZ + 3 - Math.min(k, 2), k === 3 ? B.bronze : (k & 1 ? B.slate2 : B.slate));
      const bell = w.prop({ name: 'kbell', pivot: [KX + 0.5, ky + 0.5, KZ + 0.5], axis: 'z' });
      bell.box(KX, ky - 2, KZ, KX, ky, KZ, B.iron);
      for (const [y0, y1, r, b] of [[ky - 4, ky - 3, 1.6, B.bronze], [ky - 8, ky - 5, 2.4, B.bronze], [ky - 11, ky - 9, 3.0, B.bronzeDk], [ky - 13, ky - 12, 3.8, B.bronze]]) bell.cyl(KX, KZ, y0, y1, r, b);
      bell.box(KX, ky - 15, KZ, KX, ky - 14, KZ, B.gold);
      acts.push({
        name: '교대 종', hint: '청동 종이 크게 흔들리며 교대 시간을 알려요', hit: [KX - 7, L + 1, KZ - 4, KX + 7, ky + 4, KZ + 4],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.turn('kbell', [0, 0, k % 2 ? -0.7 : 0.7], 0.45);
            a.burst([KX + 0.5, ky - 10, KZ + 0.5], { n: 26, colors: ['#ffd070', '#e8c040', '#fff0c0'], speed: 14, up: 0.6, life: 0.7, gravity: 0, spread: 1.2, flat: true });
          }
          await a.turn('kbell', [0, 0, 0], 0.6);
        },
      });

      // ═════════ 협곡 남쪽 제련소와 보석 세공소 ═════════
      const FCX = 212, FCZ = 312, FH = 44;
      MH.flatten(w, FCX - 48, FCZ - 18, FCX + 44, D - 1, L, B.gravel, B.rock);
      MH.path(w, [[MX + 10, 300], [192, 300], [236, 312]], 4, B.pave);
      MH.path(w, [[MX - 10, 304], [104, 312], [80, 314]], 3.2, B.pave);
      // 용광로: 낱돌 받침, 벽돌 몸통에 청동 띠·쇠 띠, 꼭대기에서 불이 넘실댄다
      for (let y = L + 1; y <= L + 4; y++) for (let dz = -15; dz <= 15; dz++) for (let dx = -15; dx <= 15; dx++) { const r = Math.hypot(dx, dz); if (r <= 14.4) w.set(FCX + dx, y, FCZ + dz, r > 13.4 ? (y === L + 4 ? B.cap : ash(Math.round(Math.atan2(dz, dx) * 14), y, 71, SD)) : B.sd2); }
      for (let y = L + 5; y <= L + FH; y++) {
        const r = y < L + 12 ? 12.4 : 12.4 - (y - L - 12) * 0.12, R = Math.ceil(r), k = (y - L) % 10;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz); if (d > r) continue;
          if (d < r - 1.2) { w.set(FCX + dx, y, FCZ + dz, B.sd2); continue; }
          const ang = Math.atan2(dz, dx), strap = Math.abs(((ang / (Math.PI / 4)) % 1 + 1) % 1 - 0.5) > 0.47;
          w.set(FCX + dx, y, FCZ + dz, k === 0 ? B.bronze : (k === 1 ? B.graniteDk : (strap ? B.iron : (hash3(dx, y, dz) > 0.7 ? B.brick2 : B.brick))));
        }
      }
      w.ring(FCX, FCZ, L + FH + 1, 5.2, 9.4, B.graniteDk); w.ring(FCX, FCZ, L + FH + 2, 6.2, 9.4, B.cap);
      w.cyl(FCX, FCZ, L + FH, L + FH + 1, 5.2, B.molten);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { const d = Math.hypot(dx, dz), hh = hash3(dx, 7, dz); if (d > 4.6) continue; const ht = Math.round((4.6 - d) * 1.2 + hh * 2); for (let y = 1; y <= ht; y++) w.set(FCX + dx, L + FH + 1 + y, FCZ + dz, y > ht - 2 ? B.fireY : B.ember); }
      for (const [dx, dz] of [[8, 8], [-8, 8], [8, -8], [-8, -8]]) { w.box(FCX + dx, L + FH - 2, FCZ + dz, FCX + dx, L + FH + 8, FCZ + dz, B.iron); w.set(FCX + dx, L + FH + 9, FCZ + dz, B.bronze); }
      // 출탕구: 남서쪽으로 열린 아궁이와 쇳물, 위 청동 갓
      w.box(FCX - 13, L + 1, FCZ + 2, FCX - 8, L + 8, FCZ + 7, 0); w.box(FCX - 13, L, FCZ + 2, FCX - 8, L, FCZ + 7, B.basalt);
      w.box(FCX - 11, L + 1, FCZ + 3, FCX - 8, L + 2, FCZ + 6, B.molten); w.box(FCX - 8, L + 3, FCZ + 4, FCX - 8, L + 4, FCZ + 5, B.ember);
      w.box(FCX - 15, L + 9, FCZ, FCX - 9, L + 10, FCZ + 9, B.bronze); w.box(FCX - 14, L + 11, FCZ + 1, FCX - 10, L + 11, FCZ + 8, B.bronzeDk);
      // 원료 투입 경사로(동쪽, 목조): 판자 길과 난간, 버팀기둥
      for (let i = 0; i <= 32; i++) {
        const x = FCX + 42 - i, y = L + 2 + Math.round(i * (FH - 4) / 32);
        w.box(x, y, FCZ - 2, x, y, FCZ + 2, B.plank); w.box(x, y - 1, FCZ - 2, x, y - 1, FCZ + 2, B.timberDk);
        if (i % 8 === 0) for (const z of [FCZ - 2, FCZ + 2]) w.box(x, L + 1, z, x, y - 2, z, B.timber);
        w.set(x, y + 4, FCZ + 3, B.timber); if (i % 3 === 0) w.box(x, y + 1, FCZ + 3, x, y + 3, FCZ + 3, B.timber);
      }
      lights.push({ name: 'smelt', p: [FCX + 0.5, L + FH + 5, FCZ + 0.5], c: '#ff8a3a', i: 1.4, d: 52, flicker: 0.3 });
      landmarks.push({ name: '남쪽 제련소', note: '광석을 녹이는 큰 용광로', p: [FCX + 0.5, L + FH + 20, FCZ + 0.5], tag: 'SMELT' });
      // 도가니 받침대와 거푸집 줄
      const GX0 = FCX - 30, GZc = FCZ + 4, gy = L + 18;
      for (const x of [GX0 - 7, GX0 + 6]) { w.box(x - 1, L + 1, GZc - 2, x + 2, L + 2, GZc + 2, B.graniteDk); w.box(x, L + 3, GZc - 1, x + 1, gy + 4, GZc + 1, B.timber); }
      w.box(GX0 - 8, gy + 5, GZc - 1, GX0 + 8, gy + 6, GZc + 1, B.timber);
      for (const x of [GX0 - 5, GX0 + 5]) w.set(x, gy, GZc, B.iron);
      const cru = w.prop({ name: 'crucible', pivot: [GX0 + 0.5, gy + 0.5, GZc + 0.5], axis: 'x' });
      cru.box(GX0 - 4, gy, GZc, GX0 + 4, gy, GZc, B.iron);
      cru.cyl(GX0, GZc, gy - 9, gy - 9, 2.8, B.iron); cru.cyl(GX0, GZc, gy - 8, gy - 2, 4.4, B.iron); cru.ring(GX0, GZc, gy - 5, 3.4, 4.6, B.bronzeDk);
      cru.cyl(GX0, GZc, gy - 2, gy - 2, 3.2, B.molten); cru.box(GX0, gy - 2, GZc + 5, GX0, gy - 2, GZc + 6, B.iron);
      for (const s of [-1, 1]) { cru.box(GX0 + s * 4, gy - 3, GZc, GX0 + s * 4, gy - 1, GZc, B.iron); }
      const moldZ = GZc + 10;
      for (let x = GX0 - 12; x <= GX0 + 12; x += 6) { w.walls(x, L + 1, moldZ, x + 3, L + 2, moldZ + 4, B.iron); w.box(x + 1, L + 1, moldZ + 1, x + 2, L + 1, moldZ + 3, B.molten); }
      lights.push({ name: 'pour', p: [GX0 + 0.5, L + 3, moldZ + 2], c: '#ffb04a', i: 0.5, d: 24, flicker: 0.3 });
      acts.push({
        name: '용광로 쇳물', hint: '도가니가 기울어 시뻘건 쇳물을 거푸집에 부어요', hit: [GX0 - 6, gy - 10, GZc - 6, GX0 + 6, gy + 6, GZc + 6],
        run: async a => {
          a.flash('smelt', 3, 5); a.glow(1.4, 5);
          await a.turn('crucible', [1.1, 0, 0], 1.2);
          a.flash('pour', 6, 3);
          for (let k = 0; k < 8; k++) {
            a.burst([GX0 + 0.5, gy - 2, GZc + 7], { n: 26, colors: ['#ffe08a', '#ffb04a', '#ff6a2a'], speed: 1.6, up: 1, life: 0.8, gravity: 24, spread: 1.2 });
            a.burst([GX0 + 2 + (k % 5 - 2) * 6, L + 3, moldZ + 2], { n: 18, colors: ['#ffe08a', '#ffb04a', '#ffffff'], speed: 8, up: 6, life: 0.7, gravity: 18, spread: 1.2 });
            await a.wait(0.35);
          }
          a.burst([GX0 + 0.5, L + 5, moldZ + 2], { n: 40, colors: ['#8a7a70', '#6a5c54'], speed: 3, up: 8, life: 2.4, gravity: -1, spread: 6 });
          await a.turn('crucible', [0, 0, 0], 1.2);
        },
      });
      // 광석·석탄 더미, 쇠똥(슬래그) 언덕, 쇳덩이 더미
      w.ellipsoid(FCX + 30, L + 1, FCZ - 12, 8, 6, 6, B.coal, (dx, dy) => dy >= 0);
      w.ellipsoid(FCX + 30, L + 1, FCZ + 12, 7, 5, 6, B.gravel, (dx, dy) => dy >= 0);
      for (let q = 0; q < 22; q++) { const x = FCX + 25 + (q * 7) % 11, z = FCZ + 8 + (q * 5) % 9; w.set(x, w.top(x, z) + 1, z, q % 3 ? B.ore : B.oreB); }
      w.ellipsoid(FCX - 2, L + 1, D - 8, 9, 5, 6, B.slag, (dx, dy) => dy >= 0);
      for (let r = 0; r < 3; r++) for (let q = 0; q < 4 - r; q++) w.box(FCX + 14 + q * 3 + r, L + 1 + r, FCZ + 18, FCX + 15 + q * 3 + r, L + 1 + r, FCZ + 22, (q + r) % 2 ? B.iron : B.ironDk);
      // 보석 세공소: 돌집, 앞에 진열대와 숫돌
      const gem = dhouse({ x: 64, z: 290, sx: 28, sz: 18, fh: 12, face: 's', y: L, band: B.bronze });
      for (let x = gem.x0 + 2; x <= gem.x1 - 2; x += 6) {
        w.box(x, L + 1, gem.z1 + 6, x, L + 3, gem.z1 + 6, B.timber); w.box(x - 1, L + 4, gem.z1 + 5, x + 1, L + 4, gem.z1 + 7, B.plank);
        const gb = [B.gem, B.gemB, B.ore, B.oreB][(x >> 1) % 4]; w.set(x, L + 5, gem.z1 + 6, gb); w.set(x, L + 6, gem.z1 + 6, gb); w.set(x - 1, L + 5, gem.z1 + 6, B.cap);
      }
      lights.push({ p: gem.lamp, c: '#c890ff', i: 0.8, d: 20, flicker: 0.1 });
      const SGX = 108, SGZ = 320, sgy = L + 10;
      for (const z of [SGZ - 4, SGZ + 4]) { w.box(SGX - 2, L + 1, z, SGX + 2, L + 2, z, B.graniteDk); w.box(SGX, L + 3, z, SGX, sgy - 1, z, B.timber); w.set(SGX, sgy - 1, z, B.iron); }
      w.walls(SGX - 4, L + 1, SGZ - 3, SGX + 4, L + 2, SGZ + 3, B.timber); w.box(SGX - 3, L + 1, SGZ - 2, SGX + 3, L + 1, SGZ + 2, B.basalt);
      w.box(SGX - 15, L + 1, SGZ - 2, SGX - 12, L + 4, SGZ + 2, B.timber); w.box(SGX - 15, L + 5, SGZ - 2, SGX - 12, L + 5, SGZ + 2, B.basalt); w.set(SGX - 13, L + 6, SGZ, B.gem); w.set(SGX - 14, L + 6, SGZ + 1, B.gemB);
      const wheel = w.prop({ name: 'grind', pivot: [SGX + 0.5, sgy + 0.5, SGZ + 0.5], axis: 'z' });
      for (let dy = -8; dy <= 8; dy++) for (let dx = -8; dx <= 8; dx++) {
        const r = Math.hypot(dx, dy); if (r > 7.2) continue;
        for (let z = SGZ - 2; z <= SGZ + 2; z++) if (Math.abs(z - SGZ) <= (r < 6 ? 2 : 1)) wheel.set(SGX + dx, sgy + dy, z, r < 1.5 ? B.iron : (r > 6.4 ? B.gr3 : (((Math.atan2(dy, dx) * 2 + 10) | 0) % 2 ? B.granite : B.graniteDk)));
      }
      wheel.box(SGX, sgy, SGZ - 3, SGX, sgy, SGZ + 3, B.iron); wheel.box(SGX + 1, sgy, SGZ + 3, SGX + 3, sgy, SGZ + 3, B.iron);
      landmarks.push({ name: '보석 세공소', note: '갓 캐낸 원석을 숫돌로 깎는 곳', p: [gem.x0 + 14, gem.peak + 14, gem.z0 + 8] });
      acts.push({
        name: '숫돌 세공', hint: '커다란 숫돌이 윙윙 돌며 원석 가루와 불티가 반짝여요', hit: [SGX - 8, L + 1, SGZ - 4, SGX + 8, sgy + 8, SGZ + 4],
        run: async a => {
          a.spin('grind', 8, 4.5);
          for (let k = 0; k < 10; k++) {
            a.burst([SGX + 0.5 + 7.2, sgy + 0.5, SGZ + 0.5], { n: 16, colors: ['#ffe08a', '#ffffff', '#c86ae8', '#6ae8d8'], speed: 12, up: 4, life: 0.7, gravity: 12, spread: 0.8, flat: true });
            await a.wait(0.4);
          }
        },
      });

      // 마무리: 넓적돌 길 무늬
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const gg = MH.g(w, x, z); if (gg > 0 && w.get(x, gg, z) === B.pave) w.set(x, gg, z, paveAt(x, z)); }

      const smoke = [...hs, tav, gem].filter(h => h.chimney).slice(0, 4).map(h => ({ n: 30, colors: ['#6a605a', '#8a8078'], mode: 'rise', speed: 1.2, area: [h.chimney[0], h.chimney[2], 1.2], y0: h.chimney[1], y1: h.chimney[1] + 44, glow: false }));
      smoke.push({ n: 50, colors: ['#5a504a', '#8a8078'], mode: 'rise', speed: 1.8, area: [CX + 4, CZc + 4, 2], y0: forge.peak + 27, y1: forge.peak + 80, glow: false });
      smoke.push({ n: 30, colors: ['#5a504a', '#8a8078'], mode: 'rise', speed: 1.4, area: [FX - 8.5, FZ + 6.5, 1.2], y0: L + 27, y1: L + 60, glow: false });
      smoke.push({ n: 60, colors: ['#4a403a', '#6a5c54', '#ff9a4a'], mode: 'rise', speed: 2, area: [FCX + 0.5, FCZ + 0.5, 3], y0: L + FH + 6, y1: L + FH + 68, glow: false });
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
