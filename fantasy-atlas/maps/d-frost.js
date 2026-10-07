// 서리 왕좌 — 빙하 계곡 꼭대기의 얼음 성채와 절벽의 얼음 감옥, 감옥 동쪽 단의 기사단 묘역과 서리 영묘 (320칸, 2배 해상도: 1칸 ≈ 25cm)
// 낱돌로 쌓은 성벽(줄눈·띠돌림·성가퀴·화살구멍·버팀벽), 내민 받침과 처마 고드름이 있는 원뿔 지붕 탑, 아치 성문과 쇠창살,
// 기둥 회랑의 왕좌의 방(주춧돌·기둥머리·높은 창·무너진 지붕 끝 고드름), 얼음 왕좌(가시 등받이·팔걸이·방석·왕관),
// 절벽을 깎은 두 층 감방(문틀·쐐기돌·창살·사슬·족쇄), 위층 난간길과 돌계단, 교수대 쇠들보에 매달린 얼음 우리,
// 묘역(창끝 쇠울타리·둥근 머리 묘비·칼 무덤·등롱), 서리 영묘(주랑·박공·둥근 창·두 짝 문), 지층 띠가 있는 바위 절벽,
// 모래·자갈 바닥이 비치는 호수, 가지마다 눈이 쌓인 전나무. playerScale 2 (사람 키 6.8칸).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 320, D = 320, Hh = 256, K = 2.5;   // K: 원래 128칸 설계 좌표 → 320칸
  MAPS.push({
    id: 'frost', cat: 'dungeon', name: '서리 왕좌', en: 'Frost Throne', color: '#7cc4e0', seed: 71, base: 40, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '영원한 겨울에 갇힌 옛 왕국. 얼어붙은 기사들은 아직도 왕을 지킨다. 절벽을 깎은 얼음 감옥에는 사슬에 매달린 얼음 우리가 삐걱이고, 그 동쪽 단에는 쓰러진 기사들이 묻힌 묘역과 옛 기사단장들의 얼음관을 모신 서리 영묘가 눈에 덮여 있다.',
    info: { title: '장소 정보', en: 'FROST THRONE', rows: [['생김새', '빙하 계곡 꼭대기의 얼음 성채'], ['명소', '겨울 왕좌 · 얼음 감옥 · 기사단 묘역'], ['주의', '묘역의 혼불이 오르면 얼음관이 열림']] },
    monsters: { normal: ['얼어붙은 망자', '서리 늑대', '창백한 기사', '묘역의 혼불'], mid: '서리 기사단장', boss: '겨울의 왕' },
    sky: ['#1c2c48', '#34507a', '#86aed4'], stars: false,
    hemi: ['#e0f0ff', '#34414f', 0.66], sun: ['#f0f8ff', 0.78, [0.4, 1, 0.6]],
    night: { sky: ['#070c18', '#0e1a30', '#2a4a78'], stars: true, hemi: ['#8ab0e0', '#141c28', 0.46], sun: ['#b0d0ff', 0.4, [0.4, 1, 0.6]], haze: '#2a3a54' },
    liquid: ['#8cc8e0', '#b4e2f2', '#ffffff'], liqSpeed: 0.05,
    fog: { start: 0.74, floor: 24, depth: 20, haze: [60, 0.22, 16], hazeColor: '#b8cce0' },
    camY: 40,
    particles: [
      { n: 1500, colors: ['#ffffff', '#dfefff', '#b8d8f0'], mode: 'fall', speed: 1.6, wind: 2.4, y0: 36, y1: 248, glow: false },
      { n: 80, colors: ['#9fe8ff', '#e0f8ff'], mode: 'wisp', speed: 0.8, size: 3, y0: 124 },
    ],
    blocks: {
      snow: { c: '#9aa8b8', top: '#e8f0f6', v: 0.04 }, snow2: { c: '#9aa8b8', top: '#d2deea', v: 0.05 }, snow3: { c: '#b0bccb', top: '#f4f8fc', v: 0.03 },
      rock: { c: '#58606e', v: 0.06, pat: 'stone' }, rockDk: { c: '#3a4250', v: 0.06, pat: 'stone' }, cliff: { c: '#6a7484', v: 0.06, pat: 'big' },
      cliffLt: { c: '#7c8696', v: 0.06, pat: 'big' }, rockSnow: { c: '#58606e', top: '#dce6f0', v: 0.06, pat: 'stone' },
      sand: { c: '#8a8a7c', top: '#a8a690', v: 0.08 }, gravel: { c: '#5c626c', top: '#7a808a', v: 0.12 }, bed: { c: '#4a5260', top: '#56606c', v: 0.1 },
      ice: { c: '#86c4e0', top: '#b4e2f2', v: 0.05 }, iceDk: { c: '#5a9ab8', top: '#6aa8c8', v: 0.05 }, icicle: { c: '#c8ecfa', v: 0.03 },
      castle: { c: '#aab6c6', v: 0.05, pat: 'brick' }, castleDk: { c: '#7c889a', v: 0.05, pat: 'brick' }, trim: { c: '#d4dde8', v: 0.03 },
      st1: { c: '#b2bccb', v: 0.03 }, st2: { c: '#a0acbc', v: 0.03 }, st3: { c: '#bcc6d4', v: 0.03 }, mortar: { c: '#8692a4', v: 0.03 },
      sd1: { c: '#7e8a9c', v: 0.03 }, sd2: { c: '#6e7a8c', v: 0.03 }, sdM: { c: '#5a6474', v: 0.03 },
      roofI: { c: '#4a78a8', v: 0.05, pat: 'tile' }, roofI2: { c: '#3e6a9a', v: 0.05, pat: 'tile' }, roofIdk: { c: '#34588a', v: 0.04 }, gold: { c: '#e0c060', v: 0.06 },
      carpet: { c: '#2a4a8a', v: 0.03 }, iron: { c: '#3a3e48', v: 0.03 }, ironDk: { c: '#2a2c34', v: 0.03 }, wood: { c: '#6a5040', v: 0.05, pat: 'plank' }, woodDk: { c: '#4e3a2e', v: 0.04 },
      pine: { c: '#2a4a44', v: 0.1 }, pineDk: { c: '#1f3834', v: 0.1 }, pineLt: { c: '#3a5c52', v: 0.1 }, trunk: { c: '#3a2e2a', v: 0.05 }, trunkDk: { c: '#2a201e', v: 0.05 },
      bone: { c: '#e4e0d0', v: 0.03 }, dark: { c: '#141a24', v: 0 },
      glowIce: { c: '#9fe8ff', glow: true }, blueFire: { c: '#6ad0ff', glow: true }, crown: { c: '#ffe08a', glow: true },
      win: { c: '#9fe8ff', night: true, day: '#5a88b0' },
      flag: { c: '#7c889a', top: '#a8b4c4', v: 0.06, pat: 'stone' }, flag2: { c: '#748092', top: '#98a4b4', v: 0.05 }, flagJ: { c: '#5c6676', top: '#6a7484', v: 0.03 },
      trail: { c: '#9aa8b8', top: '#c4ceda', v: 0.06 }, trailDk: { c: '#8a96a6', top: '#aab6c4', v: 0.06 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, WL = base + 2;
      const lights = [], acts = [], landmarks = [];
      const dx0 = (xo, zo) => Math.abs(xo - 64 + Math.sin(zo * 0.045) * 5);
      const dxOf = (x, z) => dx0(x / K, z / K) * K;

      // ───────── 지형: 원래 설계 높이를 2배로, 산비탈에는 굴곡·바위 턱, 호수 바닥은 모래·자갈 ─────────
      const WC = new Float32Array(W * D).fill(NaN);
      const warp = (x, z) => { if (x < 0 || z < 0 || x >= W || z >= D) return 0; const i = x + W * z; let v = WC[i]; if (v !== v) v = WC[i] = (n.fbm(x * 0.021 + 40, z * 0.021 + 9, 2) - 0.5) * 14; return v; };
      const STRATA = [B.rock, B.cliff, B.rockDk, B.cliffLt, B.rock, B.cliff, B.rockDk];
      const strata = (x, y, z) => STRATA[((Math.floor((y + warp(x, z)) / 4) % 7) + 7) % 7];
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const xo = x / K, zo = z / K, u = zo / 127, dx = dx0(xo, zo);
          let hh = (1 - u) * 16 + MH.sstep(73, 65, zo) * 11;
          const mt = MH.sstep(16, 40, dx);
          hh += Math.min(32, Math.pow(Math.max(0, dx - 20), 1.2) * 0.5) + n.ridge(xo * 0.04, zo * 0.04, 4) * 8 * mt;
          if (zo > 96) hh -= MH.sstep(96, 112, zo) * 7 * Math.max(0, 1 - dx / 34);
          let y = base + K * (hh + n.fbm(xo * 0.06, zo * 0.06) * 1.6);
          // 산비탈: 바위 턱(가볍게 계단진 선반)과 굴곡 — 등고선이 고르게 돌지 않도록 노이즈로 휜다
          const crag = (n.fbm(x * 0.05 + 11, z * 0.05 + 3, 3) - 0.5) * 9 * mt;
          y += crag;
          if (mt > 0.2) { const q = (y + warp(x, z)) / 9, f = q - Math.floor(q); y += (MH.sstep(0.35, 0.75, f) - f) * 5 * mt; }
          return y;
        },
        surface: (x, z, y, sl) => {
          const xo = x / K, zo = z / K, dx = dx0(xo, zo);
          if (y <= WL && zo > 88) {   // 물속·물가: 가장자리는 모래, 조금 깊으면 자갈, 깊은 곳은 바위 바닥(무리 지어)
            const dep = WL - y, nb = n.fbm(x * 0.09 + 3, z * 0.09 + 77, 2);
            if (dep <= 1) return nb > 0.55 ? B.gravel : B.sand;
            if (dep <= 5) return nb > 0.6 ? B.bed : nb < 0.36 ? B.sand : B.gravel;
            return nb > 0.5 ? B.bed : B.rockDk;
          }
          if (y <= WL + 2 && zo > 88 && n.fbm(x * 0.12, z * 0.12 + 40, 2) > 0.45) return B.gravel;
          if (sl >= 4) return strata(x, y, z);
          if (sl >= 3) return n.fbm(x * 0.08 + 9, z * 0.08, 2) > 0.5 ? B.rockSnow : strata(x, y, z);
          const gn = (n.fbm(x * 0.05 + 70, z * 0.05 + 7, 2) - 0.5);
          if (dx < 14 + gn * 10 && zo > 50 + gn * 8 && zo < 102 + gn * 8) return n.ridge(xo * 0.14, zo * 0.07, 2) > 0.86 ? B.iceDk : B.ice;
          const f = n.fbm(x * 0.06, z * 0.06, 2);
          return f > 0.6 ? B.snow2 : f < 0.36 ? B.snow3 : B.snow;
        },
        under: (x, z, y, dep, sl) => (y < 6 || x === 0 || z === 0 || x === W - 1 || z === D - 1) && dep > 3 ? B.rockDk : dep < 2 && sl < 3 ? B.snow : strata(x, y, z),
      });
      MH.water(w, WL, (x, z) => z > 236);
      // 얕은 물가에 얇게 언 얼음판
      for (let z = 237; z < D; z++) for (let x = 0; x < W; x++) {
        const lv = w.liq[x + W * z]; if (lv < 0) continue;
        const g = MH.g(w, x, z);
        if (WL - g <= 2 && n.fbm(x * 0.07 + 2, z * 0.07 + 61, 2) > 0.5) w.set(x, WL, z, B.ice);
      }

      // ───────── 공통 도구 ─────────
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st2], SDK = [B.sd1, B.sd2, B.sd1, B.sd2, B.sd1];
      // 낱돌: 2칸 높이 돌 + 1칸 줄눈, 길이 5칸, 줄마다 엇갈림
      const stoneAt = (u, y, salt, dk) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return dk ? B.sdM : B.mortar;
        return (dk ? SDK : STONES)[(hash3(Math.floor(uu / 6), c, salt) * 5) | 0];
      };
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); }, box: (...a) => p.box(...a), get: (x, y, z) => p.get(x, y, z) });
      const icicles = (x, y, z, k, glowEnd) => { for (let q = 0; q < k; q++) { if (w.get(x, y - q, z)) break; w.set(x, y - q, z, glowEnd && q === k - 1 ? B.glowIce : B.icicle); } };
      // 축이 나란한 성벽 토막: 낱돌, 띠돌림, 성가퀴, 화살구멍, 버팀벽, 띠 밑 고드름, 밑동 눈더미. (nx,nz) 바깥 방향
      const wallSeg = (x0, z0, x1, z1, y, h, nx, nz) => {
        const alongX = nz !== 0, top = y + h;
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const g = MH.g(w, x, z), u = alongX ? x : z;
          for (let yy = Math.min(g, y) - 2; yy < top; yy++) w.set(x, yy, z, yy < y + 3 ? stoneAt(u, yy, 5, true) : stoneAt(u, yy, 7));
          w.set(x, top, z, B.castleDk);
          const outer = alongX ? (nz > 0 ? z === z1 : z === z0) : (nx > 0 ? x === x1 : x === x0);
          const inner = alongX ? (nz > 0 ? z === z0 : z === z1) : (nx > 0 ? x === x0 : x === x1);
          const m = ((u % 6) + 6) % 6;
          if (outer) { for (let yy = top + 1; yy <= top + 4; yy++) if (m < 4 || yy === top + 1) w.set(x, yy, z, yy === top + 4 ? B.trim : stoneAt(u, yy, 9)); if (m === 1) w.set(x, top + 2, z, B.dark); }
          if (inner) { w.set(x, top + 1, z, stoneAt(u, top + 1, 9)); w.set(x, top + 2, z, B.trim); }
        }
        // 띠돌림(바깥으로 한 칸)과 그 밑 고드름, 화살구멍, 버팀벽, 눈더미
        const u0 = alongX ? x0 : z0, u1 = alongX ? x1 : z1;
        const ox = nx > 0 ? x1 + 1 : nx < 0 ? x0 - 1 : 0, oz = nz > 0 ? z1 + 1 : nz < 0 ? z0 - 1 : 0;
        const at = (u, d) => alongX ? [u, oz + nz * d] : [ox + nx * d, u];
        for (let u = u0; u <= u1; u++) {
          const [bx, bz] = at(u, 0);
          w.set(bx, top - 6, bz, B.trim);
          if (hash3(u, 3, 77) > 0.45) icicles(bx, top - 7, bz, 1 + ((hash3(u, 4, 77) * 5) | 0), hash3(u, 5, 77) > 0.85);
          if (u % 12 === 6) { const [sx, sz] = alongX ? [u, nz > 0 ? z1 : z0] : [nx > 0 ? x1 : x0, u]; w.box(sx, top - 16, sz, sx, top - 11, sz, B.dark); w.set(sx, top - 10, sz, B.trim); w.set(sx, top - 17, sz, B.trim); }
          if (u % 16 === 8) for (let d = 0; d < 3; d++) {
            const [px, pz] = at(u, d), g = MH.g(w, px, pz);
            for (let k = 0; k < 3; k++) { const [qx, qz] = alongX ? [u - 1 + k, pz] : [px, u - 1 + k]; const gg = MH.g(w, qx, qz); for (let yy = Math.min(gg, y) - 1; yy <= y + h - 10 - d * 4; yy++) w.set(qx, yy, qz, yy === y + h - 10 - d * 4 ? B.trim : stoneAt(u + k, yy, 11, true)); }
            if (g < 0) break;
          }
          for (let d = 0; d < 4; d++) {
            const [px, pz] = at(u, d), gg = MH.g(w, px, pz), hS = Math.round((1 - d / 4) * 3 * (0.4 + n.fbm(u * 0.15, d, 1)));
            for (let k = 1; k <= hS; k++) if (!w.get(px, gg + k, pz)) w.set(px, gg + k, pz, B.snow);
          }
        }
      };
      // 둥근 탑: 계단진 굽돌, 엇갈린 돌 띠, 화살창, 내민 받침, 성가퀴, 처마 두 겹·기와 띠의 원뿔 지붕, 처마 밑 고드름
      const tower = (cx, cz, y0, h, r, o) => {
        o = o || {};
        const m = o.m || TM;
        const disc = (y, rr, b, hollow, keep) => {
          const KK = Math.ceil(rr) + 1;
          for (let z = Math.floor(cz - KK); z <= cz + KK; z++) for (let x = Math.floor(cx - KK); x <= cx + KK; x++) {
            const dx = x + 0.5 - cx, dz = z + 0.5 - cz, d = Math.hypot(dx, dz);
            if (d > rr || (hollow && d <= rr - hollow)) continue;
            if (keep && !keep(Math.atan2(dz, dx), d)) continue;
            w.set(x, y, z, typeof b === 'function' ? b(x, y, z) : b);
          }
        };
        for (let y = y0 - 12; y < y0; y++) disc(y, r + 2, m.band);
        disc(y0, r + 2, m.band); disc(y0 + 1, r + 2, m.band); disc(y0 + 2, r + 1, m.band); disc(y0 + 3, r + 1, m.band);
        const stone = (x, y, z) => { const a = Math.atan2(z + 0.5 - cz, x + 0.5 - cx), seg = Math.floor((a + Math.PI) * r / 3 + ((y >> 2) & 1) * 0.5); return (y % 4 === 0) ? (m.mortar || m.band) : ((((y >> 2) & 3) === 1 && hash3(seg, y >> 2, 6) > 0.6) ? m.wall2 || m.wall : m.wall); };
        for (let y = y0 + 4; y < y0 + h; y++) disc(y, r, stone);
        for (let y = y0 + 16; y < y0 + h - 10; y += 16) { disc(y, r + 1, m.band, 1.6); disc(y + 1, r + 0.6, m.trim, 1.2); }
        if (m.win) for (let y = y0 + 9, k = 0; y < y0 + h - 14; y += 14, k++) {
          for (let q = 0; q < 4; q++) {
            const a = q * Math.PI / 2 + (k & 1) * Math.PI / 4, ux = Math.cos(a), uz = Math.sin(a), tx = -uz, tz = ux;
            const at = (s, dd) => [Math.floor(cx + ux * dd + tx * s), Math.floor(cz + uz * dd + tz * s)];
            for (let yy = y; yy <= y + 6; yy++) for (const s of [-0.5, 0.5]) { const [x, z] = at(s, r - 0.6); w.set(x, yy, z, yy === y + 6 ? B.dark : m.win); }
            for (let yy = y - 1; yy <= y + 7; yy++) for (const s of [-1.5, 1.5]) { const [x, z] = at(s, r + 0.4); w.set(x, yy, z, m.trim); }
            for (const s of [-1.5, -0.5, 0.5, 1.5]) { const [x, z] = at(s, r + 0.4); w.set(x, y - 1, z, m.band); w.set(x, y + 7, z, m.trim); }
          }
        }
        let top = y0 + h;
        if (o.ruin) return top;
        const segN = Math.max(12, Math.round(r * 0.9) * 2), seg = a => Math.floor((a + Math.PI) / (Math.PI * 2) * segN);
        disc(top - 4, r + 1, m.band, 1.4, a => seg(a) % 2 === 0);
        disc(top - 3, r + 2, m.band, 2.4, a => seg(a) % 2 === 0);
        disc(top - 2, r + 2.6, m.band, 3);
        disc(top - 1, r + 2.6, m.wall, 3);
        for (let y = top; y <= top + 2; y++) disc(y, r + 2.6, m.wall, 1.6);
        disc(top + 2, r + 2.6, m.trim, 1.6);
        const mer = a => { const t = (a + Math.PI) / (Math.PI * 2) * segN * 2; return (Math.floor(t) % 3) !== 2; };
        for (let y = top + 3; y <= top + 5; y++) disc(y, r + 2.6, y === top + 5 ? m.trim : m.wall, 1.6, mer);
        disc(top - 1, r + 1.2, m.band);
        // 받침 밑 고드름
        for (let i = 0; i < segN * 3; i++) { const a = i / (segN * 3) * Math.PI * 2, x = Math.floor(cx + Math.cos(a) * (r + 1.9)), z = Math.floor(cz + Math.sin(a) * (r + 1.9)); if (hash3(x, top, z) > 0.55) icicles(x, top - 5, z, 1 + ((hash3(x, 7, z) * 4) | 0), hash3(z, 8, x) > 0.85); }
        let y = top + 1, rr = r + 1.2, k = 0;
        disc(y, rr + 0.8, m.eave, 1.2); disc(y + 1, rr + 0.4, m.eave, 1.2);
        for (; rr > 0.6; rr -= o.step || 0.36, k++) disc(y + 2 + k, rr, k % 6 === 5 ? m.roof2 : m.roof, 0);
        // 처마 끝 고드름
        for (let i = 0; i < segN * 4; i++) { const a = i / (segN * 4) * Math.PI * 2, x = Math.floor(cx + Math.cos(a) * (r + 1.7)), z = Math.floor(cz + Math.sin(a) * (r + 1.7)); if (hash3(x, y, z) > 0.5) icicles(x, y - 1, z, 1 + ((hash3(x, 9, z) * 6) | 0), hash3(z, 3, x) > 0.8); }
        y = y + 2 + k;
        for (let q = 0; q < 3; q++) w.set(Math.floor(cx), y + q, Math.floor(cz), B.trim);
        disc(y + 3, 1.2, m.finial); disc(y + 4, 1.2, m.finial); w.set(Math.floor(cx), y + 5, Math.floor(cz), m.finial); w.set(Math.floor(cx), y + 6, Math.floor(cz), m.finial);
        return y + 7;
      };
      const TM = { wall: B.st1, wall2: B.st3, band: B.st2, mortar: B.mortar, trim: B.trim, win: B.win, roof: B.roofI, roof2: B.roofI2, eave: B.roofIdk, finial: B.glowIce };
      // 원뿔 아닌 박공지붕(2배): 처마 내밈, 기와 띠, 눈 무리, 용마루, 박공벽과 둥근 박공창
      const roofHD = (x0, x1, z0, z1, y, o) => {
        const alongX = o.axis === 'x';
        const A0 = alongX ? z0 : x0, A1 = alongX ? z1 : x1, L0 = alongX ? x0 : z0, L1 = alongX ? x1 : z1;
        const put = (a, l, yy, b) => alongX ? w.set(l, yy, a, b) : w.set(a, yy, l, b);
        for (let l = L0 - 1; l <= L1 + 1; l++) { put(A0 - 1, l, y - 1, B.roofIdk); put(A1 + 1, l, y - 1, B.roofIdk); if (hash3(l, 1, A0) > 0.5) put(A0 - 1, l, y - 2, B.icicle); if (hash3(l, 2, A1) > 0.5) put(A1 + 1, l, y - 2, B.icicle); }
        let s = 0;
        while (A0 + s <= A1 - s) {
          const ridge = A0 + s >= A1 - s - 1;
          for (let l = L0; l <= L1; l++) {
            const b = s === 0 ? B.roofIdk : ridge ? B.trim : (s % 3 === 2 ? B.roofI2 : (hash3(l >> 2, s >> 1, 13) > 0.78 ? B.snow3 : B.roofI));
            put(A0 + s, l, y + s, b); put(A1 - s, l, y + s, b);
            put(A0 + s, l, y + s - 1, B.roofIdk); put(A1 - s, l, y + s - 1, B.roofIdk);
          }
          s++;
        }
        for (const l of [L0 + 1, L0 + 2, L1 - 2, L1 - 1]) for (let a = A0 + 1; a <= A1 - 1; a++) {
          const hh = y + Math.min(a - A0, A1 - a) - 2;
          for (let yy = y; yy <= hh; yy++) put(a, l, yy, o.gable(a, yy));
        }
        if (o.gwin) { const ma = (A0 + A1 + 1) / 2, my = y + Math.round((A1 - A0) * 0.22); for (const l of [L0 + 1, L1 - 1]) for (let a = Math.floor(ma - 5); a <= ma + 5; a++) for (let yy = my - 5; yy <= my + 5; yy++) { const d = Math.hypot(a + 0.5 - ma, yy + 0.5 - my); if (d < 2.6) put(a, l, yy, o.gwin); else if (d < 3.8) put(a, l, yy, B.trim); } }
        return y + s;
      };
      // 전나무: 굵기가 줄어드는 줄기, 층층 가지(아래는 짙게), 가지 위 눈
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      const pineTree = (T, x, y, z, h, R) => {
        for (let i = 0; i < h + 2; i++) cylT(T, x, z, y + i, y + i, Math.max(0.5, 1.6 * (1 - i / h)), i % 6 ? B.trunk : B.trunkDk);
        // 층마다: 아래로 처진 짙은 가지 끝 + 가지 판 + 위에 쌓인 눈(가지 판보다 조금 작게) — 면이 크게 합쳐지도록 매끈한 원판으로
        const k0 = (x * 7 + z * 3) % 4;
        for (let ty = y + 7, t = 0; ty < y + h; ty += 5, t++) {
          const rr = (1 - (ty - y) / (h + 4)) * R + 1.4, sk = ((t + k0) % 4) * 0.5;
          cylT(T, x, z, ty - 1, ty, rr, t % 2 ? B.pine : B.pineDk);
          cylT(T, x, z, ty + 1, ty + 1, Math.max(0.8, rr - 1.6 - sk), B.snow3);
        }
        for (let k = 0; k < 4; k++) T.set(x, y + h + k, z, k === 3 ? B.snow3 : B.pine);
        return y + h + 3;
      };
      // 눈 덮인 바위
      const boulder = (x, y, z, r) => {
        const ry = r * w.r(0.55, 0.8), rx = r * w.r(0.9, 1.2), rz = r * w.r(0.9, 1.2);
        w.ellipsoid(x, y, z, rx, ry, rz, B.rock, (dx, dy, dz, d) => {
          if (d > 0.7 && hash3(x + dx, y + dy, z + dz) < 0.3) return false;
          w.set(x + dx, y + dy, z + dz, dy > ry * 0.45 && d < 0.85 ? B.snow3 : dy < 0 ? B.rockDk : B.rock); return false;
        });
      };

      // ───────── 얼음 감옥: 빙하 절벽을 깎아 만든 두 층 감방과 사슬에 매달린 얼음 우리 ─────────
      const PT = MH.g(w, 160, 166), PB = MH.g(w, 160, 192), PZ = 178;   // 절벽 윗단·아랫마당 높이, 감방 앞면
      for (let i = 0; i < 20; i++) w.ri(4, 10);
      // 아랫마당: 판석(줄눈)과 눈더미
      MH.flatten(w, 132, PZ + 1, 192, 203, PB, B.flag, B.rock);
      for (let z = PZ + 1; z <= 203; z++) for (let x = 132; x <= 192; x++) {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        let b = (z % 3 === 2 || (x + off) % 4 === 3) ? B.flagJ : (hash3(Math.floor((x + off) / 4), row, 5) > 0.5 ? B.flag : B.flag2);
        const sn = n.fbm(x * 0.08 + 4, z * 0.08 + 8, 2) + (x < 135 || x > 189 || z > 200 ? 0.25 : 0);
        if (sn > 0.62) b = B.snow2; else if (sn > 0.56) b = B.trail;
        w.set(x, PB, z, b);
      }
      // 절벽 벽: 윗단까지 바위로 채우고, 앞면 아래는 다듬은 석축, 위는 거친 빙벽 바위
      for (let z = 166; z <= PZ; z++) for (let x = 132; x <= 192; x++) if (MH.g(w, x, z) < PT) MH.setH(w, x, z, PT, z === PZ ? B.castleDk : B.snow, B.rock);
      // 양옆 어깨: 절벽 끝이 칼로 자른 듯 끊기지 않게 바위 비탈로 이어 붙인다
      for (let z = 160; z <= PZ + 4; z++) for (const [xa, sg] of [[131, -1], [193, 1]]) for (let d = 0; d < 14; d++) {
        const x = xa + sg * d, g = MH.g(w, x, z), hh = Math.round(PT - d * 2.2 - (n.fbm(x * 0.2, z * 0.2, 2) - 0.3) * 6 - Math.max(0, z - PZ) * 3);
        if (g >= 0 && hh > g) MH.setH(w, x, z, hh, hh - g > 3 ? strata(x, hh, z) : B.rockSnow, B.rock);
      }
      const ASH = Math.min(PB + 30, PT - 2);
      for (let x = 132; x <= 192; x++) for (let y = PB + 1; y < PT; y++) w.set(x, y, PZ, y < ASH ? stoneAt(x, y, 21, true) : strata(x, y, PZ));
      for (let x = 132; x <= 192; x++) {
        w.set(x, PT + 1, PZ, x % 4 < 2 ? B.trim : B.castleDk); w.set(x, PT + 1, PZ - 1, B.castleDk);
        if (hash3(x, 9, 1) > 0.4) icicles(x, PT, PZ + 1, 1 + Math.floor(hash3(x, 9, 2) * 7), true);
        w.set(x, ASH, PZ + 1, B.trim);
        if (hash3(x, 9, 3) > 0.55) icicles(x, ASH - 1, PZ + 1, 1 + Math.floor(hash3(x, 9, 4) * 4), false);
      }
      // 감방: 아래층(높이 10)과 위층(높이 9), 각 다섯 칸(폭 7, 깊이 8)
      const cellX = [136, 146, 156, 166, 176], T2 = PB + 14, tiers = [[PB + 1, 9], [T2, Math.min(9, ASH - T2 - 3)]];
      let ck = 0;
      for (const [y0, h] of tiers) for (const x0 of cellX) {
        const k = ck++, y1 = y0 + h - 1, x1 = x0 + 6;
        w.box(x0, y0, 170, x1, y1, PZ, 0);
        w.box(x0, y0 - 1, 170, x1, y0 - 1, PZ, B.flag); for (let x = x0; x <= x1; x += 3) w.box(x, y0 - 1, 170, x, y0 - 1, PZ, B.flagJ);
        // 문틀(두 칸 굵기)과 쐐기돌 아치
        for (const fx of [x0 - 1, x1 + 1]) for (let y = y0; y <= y1 + 1; y++) w.set(fx, y, PZ, (y - y0) % 3 === 2 ? B.sdM : B.sd2);
        w.box(x0 - 1, y1 + 1, PZ, x1 + 1, y1 + 2, PZ, B.sd1); w.box(x0 + 2, y1 + 2, PZ, x0 + 4, y1 + 3, PZ, B.trim); w.set(x0 + 3, y1 + 3, PZ + 1, B.trim);
        w.box(x0 - 1, y0 - 1, PZ + 1, x1 + 1, y0 - 1, PZ + 1, B.sd1);
        // 뒷벽 사슬과 족쇄
        for (const sx of [x0 + 1, x1 - 1]) { w.box(sx, y1 - 3, 170, sx, y1, 170, B.iron); w.set(sx, y1 - 4, 170, B.ironDk); w.set(sx, y1 - 5, 171, k % 2 ? B.gold : B.iron); w.set(sx + (sx < x0 + 3 ? -1 : 1) * 0, y1 - 5, 170, B.ironDk); }
        // 속: 얼음에 갇힌 짐승 / 뼈 무더기 / 서리 결정
        if (k % 3 === 1) {
          w.box(x0 + 1, y0, 171, x1 - 1, y0 + Math.min(5, h - 3), 175, B.ice); w.box(x0 + 2, y0 + 1, 172, x1 - 2, y0 + 2, 174, B.glowIce);
          w.set(x0 + 1, y0 + Math.min(6, h - 2), 172, B.bone); w.set(x0 + 1, y0 + Math.min(6, h - 2) - 1, 172, B.bone); w.set(x1 - 1, y0 + Math.min(6, h - 2), 172, B.bone);
          w.box(x0 + 2, y0 + Math.min(6, h - 2), 173, x1 - 2, y0 + Math.min(6, h - 2), 174, B.snow);
        } else if (k % 3 === 2) {
          w.box(x0 + 1, y0, 172, x1 - 1, y0, 175, B.bone); w.box(x0 + 2, y0 + 1, 173, x0 + 3, y0 + 2, 174, B.bone); w.set(x0 + 2, y0 + 1, 175, B.dark);
          w.set(x0 + 5, y0 + 1, 172, B.bone); w.box(x0 + 4, y0, 176, x1, y0, 177, B.snow2); w.set(x0, y0, 176, B.glowIce); w.set(x0, y0 + 1, 176, B.icicle);
        } else {
          for (const [cx, cz, hh] of [[x0 + 3, 172, 5], [x0 + 2, 173, 3], [x0 + 4, 174, 2], [x0 + 1, 171, 2]]) w.box(cx, y0, cz, cx, y0 + Math.min(hh, h - 3), cz, B.glowIce);
          w.box(x0 + 4, y0, 176, x1, y0, 177, B.snow2);
          for (const ix of [x0 + 1, x0 + 4, x1]) icicles(ix, y1, 175, 2 + (ix % 3), false);
        }
        // 철창(가운데 아래 감방은 열리는 문짝)
        const door = k === 2, dp = door ? w.prop({ name: 'cellDoor', pivot: [x0, y0, PZ + 0.5] }) : w;
        for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) {
          const bar = (x - x0) % 2 === 0, cross = y === y0 + 1 || y === y1 - 1 || (door && y === y0 + 5);
          if (bar || cross) dp.set(x, y, PZ, bar && (y === y1 || y === y0) ? B.ironDk : B.iron);
        }
        if (door) { dp.set(x1 - 1, y0 + 4, PZ, B.gold); dp.set(x1 - 1, y0 + 5, PZ, B.gold); }
      }
      // 위층 난간길: 쇠 까치발 위 두꺼운 판석, 난간, 동쪽 끝 돌계단
      const WY = T2 - 1;
      w.box(134, WY - 1, PZ + 1, 191, WY, PZ + 5, B.castleDk);
      for (let x = 134; x <= 191; x += 3) w.set(x, WY, PZ + 5, B.sd1);
      for (let x = 135; x <= 189; x += 6) { w.box(x, WY - 2, PZ + 1, x, WY - 2, PZ + 3, B.iron); w.set(x, WY - 3, PZ + 1, B.iron); w.set(x, WY - 4, PZ + 1, B.ironDk); }
      for (let x = 134; x <= 186; x++) { const post = x % 6 === 2; w.set(x, WY + 1, PZ + 5, post ? B.sd2 : B.iron); w.set(x, WY + 2, PZ + 5, post ? B.sd2 : B.iron); if (post) w.set(x, WY + 3, PZ + 5, B.trim); else if (x % 2) w.set(x, WY + 1, PZ + 5, 0); }
      w.box(134, WY + 1, PZ + 1, 134, WY + 2, PZ + 5, B.iron);
      for (let j = 0; j <= 13; j++) {
        const z = PZ + 6 + j, hy = WY - j;
        for (let x = 187; x <= 191; x++) { for (let y = PB; y < hy; y++) w.set(x, y, z, stoneAt(z, y, 31, true)); w.set(x, hy, z, x === 187 || x === 191 ? B.sd1 : B.flag); }
        w.set(186, hy + 1, z, j % 4 === 0 ? B.sd2 : B.iron); if (j % 4 === 0) w.set(186, hy + 2, z, B.trim);
        for (let y = hy + 1; y <= hy + 14; y++) for (let x = 187; x <= 191; x++) w.set(x, y, z, 0);
      }
      // 감방 사이 푸른 횃불(받침 + 쇠 바구니)
      for (const px of [144, 154, 164, 174, 184]) for (const ty of [PB + 6, T2 + 4]) {
        w.set(px, ty, PZ + 1, B.ironDk); w.set(px, ty + 1, PZ + 1, B.iron); w.set(px, ty + 1, PZ + 2, B.iron);
        w.set(px, ty + 2, PZ + 2, B.blueFire); w.set(px, ty + 3, PZ + 2, B.blueFire);
      }
      // 절벽 위 교수대처럼 튀어나온 쇠들보와 매달린 얼음 우리(부품)
      const cages = [];
      for (const [ci, cx] of [144, 160, 176].entries()) {
        w.box(cx - 2, PT + 1, 169, cx + 2, PT + 3, 175, B.sd1); w.box(cx - 1, PT + 4, 170, cx + 1, PT + 4, 174, B.trim);
        w.box(cx, PT + 5, 172, cx, PT + 26, 172, B.iron); w.box(cx, PT + 5, 171, cx, PT + 8, 171, B.ironDk);
        w.set(cx, PT + 27, 172, B.iron); w.set(cx, PT + 28, 172, B.blueFire); w.set(cx, PT + 29, 172, B.blueFire);
        w.box(cx, PT + 26, 173, cx, PT + 26, 194, B.iron); w.box(cx, PT + 27, 192, cx, PT + 27, 194, B.iron); w.set(cx, PT + 27, 170, B.ironDk); w.set(cx, PT + 26, 170, B.iron);
        for (let q = 0; q < 10; q++) w.set(cx, PT + 16 + q, 173 + q, B.iron);
        for (let z = 175; z <= 192; z += 4) if (hash3(cx, z, 1) > 0.3) icicles(cx, PT + 25, z, 1 + ((hash3(cx, z, 2) * 3) | 0), false);
        const nm = 'cage' + ci, cz = 192, yb = PT - 12 + (ci % 2) * 4, yt = yb + 10;
        const cp = w.prop({ name: nm, pivot: [cx + 0.5, PT + 26, cz + 0.5], axis: 'z' });
        for (let y = yt + 2; y <= PT + 25; y++) cp.set(cx, y, cz, (y & 1) ? B.iron : B.ironDk);
        cp.box(cx - 4, yb, cz - 4, cx + 4, yb, cz + 4, B.iron); cp.box(cx - 4, yt, cz - 4, cx + 4, yt, cz + 4, B.iron);
        cp.box(cx - 2, yt + 1, cz - 2, cx + 2, yt + 1, cz + 2, B.ironDk); cp.box(cx - 1, yt + 2, cz - 1, cx + 1, yt + 2, cz + 1, B.snow3);
        cp.box(cx - 3, yt + 1, cz - 3, cx - 2, yt + 1, cz + 3, B.snow3);
        for (let y = yb + 1; y < yt; y++) for (let d = -4; d <= 4; d++) if (d % 2 === 0 || y === yb + 5) { cp.set(cx + d, y, cz - 4, B.iron); cp.set(cx + d, y, cz + 4, B.iron); cp.set(cx - 4, y, cz + d, B.iron); cp.set(cx + 4, y, cz + d, B.iron); }
        if (ci === 0) { cp.box(cx - 2, yb + 1, cz - 2, cx + 2, yb + 6, cz + 2, B.ice); cp.box(cx - 1, yb + 2, cz - 1, cx + 1, yb + 4, cz + 1, B.glowIce); cp.set(cx - 2, yb + 7, cz, B.bone); cp.set(cx + 2, yb + 7, cz, B.bone); cp.set(cx - 2, yb + 8, cz, B.bone); cp.set(cx + 2, yb + 8, cz, B.bone); }
        else if (ci === 1) { cp.box(cx - 3, yb + 1, cz - 3, cx + 3, yb + 1, cz + 3, B.bone); cp.box(cx - 1, yb + 2, cz - 1, cx + 1, yb + 4, cz + 1, B.bone); cp.set(cx, yb + 3, cz + 2, B.dark); cp.set(cx, yb + 5, cz, B.glowIce); cp.set(cx - 2, yb + 2, cz + 2, B.icicle); }
        else { cp.box(cx - 2, yb + 1, cz - 2, cx + 2, yb + 8, cz + 2, B.iceDk); cp.box(cx, yb + 2, cz, cx, yb + 7, cz, B.glowIce); }
        for (const [dx, dz] of [[-4, -4], [4, 4], [-4, 4], [4, -4], [0, -4], [-4, 0]]) for (let q = 1; q <= 1 + ((hash3(dx, dz, ci) * 3) | 0); q++) cp.set(cx + dx, yb - q, cz + dz, B.icicle);
        cages.push([nm, cx, yb, cz]);
      }
      // 마당: 깨진 족쇄, 뼈, 가운데 푸른 화로
      for (const [bx, bz, b] of [[140, 186, B.bone], [142, 186, B.bone], [141, 187, B.bone], [172, 184, B.iron], [173, 184, B.ironDk], [174, 185, B.iron], [150, 200, B.bone], [151, 200, B.bone], [168, 198, B.bone], [169, 198, B.snow2], [170, 199, B.snow2]]) w.set(bx, PB + 1, bz, b);
      w.box(157, PB + 1, 182, 163, PB + 2, 188, B.sd1); w.box(158, PB + 3, 183, 162, PB + 3, 187, B.sd2);
      w.box(160, PB + 4, 185, 160, PB + 5, 185, B.iron);
      for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz); if (d <= 3.3) { w.set(160 + dx, PB + 6, 185 + dz, B.iron); if (d > 2.3) w.set(160 + dx, PB + 7, 185 + dz, B.ironDk); } }
      for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d = Math.abs(dx) + Math.abs(dz); if (d <= 2) w.set(160 + dx, PB + 7, 185 + dz, B.blueFire); if (d <= 1) w.set(160 + dx, PB + 8, 185 + dz, B.blueFire); }
      w.set(160, PB + 9, 185, B.blueFire);
      lights.push({ name: 'prison', p: [160.5, PB + 10, 185.5], c: '#9fe8ff', i: 0.9, d: 60, flicker: 0.12 });
      lights.push({ p: [160.5, PT + 30, 172.5], c: '#6ad0ff', i: 0.7, d: 40, flicker: 0.3 });
      acts.push({
        name: '얼음 감옥', hint: '사슬에 매달린 얼음 우리들이 삐걱이며 흔들리고, 가운데 감방 철창문이 열리며 냉기가 쏟아져요', hit: [132, PB + 1, 170, 192, PT + 28, 198],
        run: async a => {
          a.flash('prison', 4, 4.5);
          for (let k = 0; k < 4; k++) {
            const r = (k % 2 ? 0.22 : -0.22) * (1 - k * 0.15);
            await Promise.all(cages.map(([nm], i) => a.turn(nm, [0, 0, i % 2 ? -r : r], 0.45)));
            for (const [, cx, yb, cz] of cages) a.burst([cx + 0.5, yb, cz + 0.5], { n: 10, colors: ['#ffffff', '#c8ecfa'], speed: 4, up: 0, life: 1, gravity: 12, spread: 3 });
          }
          await Promise.all([...cages.map(([nm]) => a.turn(nm, [0, 0, 0], 0.6)), a.turn('cellDoor', [0, -1.35, 0], 1)]);
          for (let k = 0; k < 5; k++) { a.burst([159.5, PB + 3, PZ + 2], { n: 30, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 10, up: 1, life: 1.6, gravity: 0.8, spread: 3, flat: true }); await a.wait(0.3); }
          await a.wait(0.6);
          await a.turn('cellDoor', [0, 0, 0], 0.8);
        },
      });
      landmarks.push({ name: '얼음 감옥', note: '절벽을 깎은 감방과 매달린 얼음 우리', p: [160.5, PT + 44, 184] });
      landmarks.push({ name: '서리 호수', note: '서리 늑대 무리의 사냥터', p: [151, base + 22, 281] });

      // ───────── 얼음 성채 ─────────
      const L = MH.g(w, 160, 132) + 1;
      MH.flatten(w, 84, 10, 236, 130, L, B.snow, B.rock);
      // 대지 둘레: 깎아지른 단 대신 노이즈 섞인 비탈로 잇는다(위로도 아래로도)
      for (let z = 0; z <= 150; z++) for (let x = 64; x <= 256; x++) {
        if (x >= 84 && x <= 236 && z >= 10 && z <= 130) continue;
        if (x >= 120 && x <= 200 && z > 150) continue;
        const d = Math.hypot(Math.max(84 - x, 0, x - 236), Math.max(10 - z, 0, z - 130)), g = MH.g(w, x, z);
        if (g < 0 || d > 20) continue;
        const nz = (n.fbm(x * 0.09 + 7, z * 0.09 + 1, 2) - 0.5) * 6;
        if (g < L) { const hh = Math.round(L - d * 1.1 - nz); if (hh > g) MH.setH(w, x, z, hh, d < 6 ? B.snow : (hh - g > 6 && d > 8 ? B.rockSnow : B.snow2), B.rock); }
        else { const hh = Math.round(L + d * 1.6 + nz); if (hh < g) MH.setH(w, x, z, hh, d > 10 && hash3(x >> 2, 1, z >> 2) > 0.6 ? B.rockSnow : B.snow, B.rock); }
      }
      // 안뜰 바닥: 눈 사이로 드러난 판석
      for (let z = 12; z <= 128; z++) for (let x = 86; x <= 234; x++) {
        const f = n.fbm(x * 0.05 + 3, z * 0.05 + 30, 2);
        if (f < 0.42) { const row = Math.floor(z / 3), off = (row & 1) * 2; w.set(x, L, z, (z % 3 === 2 || (x + off) % 4 === 3) ? B.flagJ : B.flag); }
        else if (f > 0.62) w.set(x, L, z, B.snow3);
      }
      wallSeg(96, 21, 224, 27, L, 30, 0, -1);
      wallSeg(221, 24, 227, 114, L, 30, 1, 0);
      wallSeg(178, 111, 224, 117, L, 30, 0, 1);
      wallSeg(96, 111, 142, 117, L, 30, 0, 1);
      wallSeg(93, 24, 99, 114, L, 30, -1, 0);
      for (const [tx, tz] of [[96, 24], [224, 24], [96, 114], [224, 114]]) tower(tx, tz, L + 1, 54, 11.2);
      for (const tx of [140, 180]) tower(tx, 118, L + 1, 48, 8);
      // 성문 누각: 낱돌 몸체, 반원 아치 문, 쐐기돌, 기둥형 벽기둥 위 푸른 불, 흉벽
      for (let z = 112; z <= 120; z++) for (let x = 144; x <= 176; x++) for (let y = L - 2; y <= L + 42; y++) w.set(x, y, z, z === 120 || z === 112 ? stoneAt(x, y, 41) : stoneAt(z, y, 43));
      const archTop = (x) => { const dx = x + 0.5 - 160.5; return L + 16 + Math.round(Math.sqrt(Math.max(0, 110 - dx * dx)) * 0.75); };
      for (let x = 150; x <= 170; x++) { const t = archTop(x); for (let y = L + 1; y <= t; y++) for (let z = 112; z <= 120; z++) w.set(x, y, z, 0); for (const z of [112, 120]) { w.set(x, t + 1, z, B.trim); w.set(x, t + 2, z, B.trim); } }
      w.box(159, archTop(160) + 1, 120, 161, archTop(160) + 4, 121, B.trim); w.set(160, archTop(160) + 3, 122, B.glowIce);
      for (let z = 112; z <= 120; z++) for (let x = 150; x <= 170; x++) { const row = Math.floor(z / 3); w.set(x, L, z, (z % 3 === 2 || (x + (row & 1) * 2) % 4 === 3) ? B.flagJ : B.flag2); }
      for (const bx of [144, 173]) {
        for (let y = L + 1; y <= L + 36; y++) for (let x = bx; x <= bx + 3; x++) for (let z = 121; z <= 122; z++) w.set(x, y, z, (y - L) % 6 === 0 ? B.sdM : stoneAt(x, y, 47, true));
        w.box(bx - 1, L + 37, 120, bx + 4, L + 38, 123, B.trim);
        const fx = bx + (bx < 160 ? 3 : 0); w.box(fx, L + 26, 123, fx, L + 27, 124, B.iron); w.set(fx, L + 28, 124, B.blueFire); w.set(fx, L + 29, 124, B.blueFire);
      }
      for (let x = 143; x <= 177; x++) { w.set(x, L + 40, 121, B.trim); w.set(x, L + 43, 121, B.castleDk); w.set(x, L + 43, 111, B.castleDk); if (x % 6 < 4) { w.box(x, L + 44, 121, x, L + 46, 121, B.st2); w.box(x, L + 44, 111, x, L + 46, 111, B.st2); w.set(x, L + 47, 121, B.trim); w.set(x, L + 47, 111, B.trim); } if (x % 6 === 1) w.set(x, L + 45, 121, B.dark); }
      w.box(143, L + 43, 112, 177, L + 43, 120, B.castleDk);
      for (let x = 154; x <= 166; x++) w.set(x, L + 34, 121, x === 160 ? B.glowIce : B.trim);
      for (let x = 144; x <= 176; x++) if (hash3(x, 2, 121) > 0.45) icicles(x, L + 39, 121, 1 + ((hash3(x, 3, 121) * 5) | 0), hash3(x, 4, 121) > 0.85);
      const gate = w.prop({ name: 'gate', pivot: [160.5, L + 1, 121.5] });
      for (let x = 150; x <= 170; x++) for (let y = L + 1; y <= Math.min(L + 22, archTop(x)); y++) {
        const bar = x % 3 === 0, cross = (y - L) % 5 === 2;
        if (!(bar || cross) || w.get(x, y, 121)) continue;
        gate.set(x, y, 121, y <= L + 2 && bar ? B.trim : cross && bar ? B.ironDk : B.iron);
      }
      for (const bx of [136, 184]) {
        const g = MH.g(w, bx, 130);
        w.box(bx - 2, g + 1, 128, bx + 2, g + 2, 132, B.sd1); w.box(bx, g + 3, 130, bx, g + 10, 130, B.iron); w.box(bx - 1, g + 3, 129, bx + 1, g + 4, 131, B.ironDk);
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dx) === 2 || Math.abs(dz) === 2) w.set(bx + dx, g + 11, 130 + dz, B.iron); else w.set(bx + dx, g + 11, 130 + dz, B.blueFire);
        w.box(bx - 1, g + 12, 129, bx + 1, g + 13, 131, B.blueFire); w.set(bx, g + 14, 130, B.blueFire); w.set(bx, g + 15, 130, B.blueFire);
        lights.push({ p: [bx + 0.5, g + 15, 130.5], c: '#6ad0ff', i: 1, d: 36, flicker: 0.3 });
      }
      // 성문 앞 얼어붙은 보급 상자(널판·모서리 쇠·눈 뚜껑)
      for (const [cx, cz, hh] of [[126, 126, 2], [131, 133, 1], [190, 125, 2], [195, 131, 1]]) {
        const g = MH.g(w, cx, cz), s = 4;
        for (let lv = 0; lv < hh; lv++) for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          w.set(cx + dx + lv, g + 1 + lv * s + dy, cz + dz, e >= 2 ? B.ironDk : B.wood);
        }
        w.box(cx + hh - 1, g + 1 + hh * s, cz, cx + hh + 2, g + 1 + hh * s, cz + 3, B.snow3);
      }
      acts.push({
        name: '얼음 성문', hint: '쇠창살이 올라가고 다시 내려와요', hit: [150, L + 1, 112, 170, L + 22, 124],
        run: async a => { await a.move('gate', [0, 21, 0], 2.4); await a.wait(2); await a.move('gate', [0, 0, 0], 1.2, t => t * t); a.burst([160.5, L + 1, 124.5], { n: 40, colors: ['#ffffff', '#dfefff'], speed: 14, up: 2, life: 1, gravity: 4, spread: 12, flat: true }); },
      });
      landmarks.push({ name: '얼음 성문', note: '중간 보스 · 서리 기사단장', p: [160.5, L + 64, 118], mid: true });

      // 왕좌의 방: 앞이 트인 기둥 회랑
      const hx0 = 120, hx1 = 200, hz0 = 40, hz1 = 88, HH = 50;
      for (let z = hz0; z <= hz1; z++) for (let x = hx0; x <= hx1; x++) {
        const edgeX = x <= hx0 + 1 || x >= hx1 - 1, edgeZ = z <= hz0 + 1;
        if (!edgeX && !edgeZ) continue;
        for (let y = L + 1; y <= L + HH; y++) w.set(x, y, z, y <= L + 4 ? stoneAt(edgeX ? z : x, y, 51, true) : y === L + 5 ? B.trim : stoneAt(edgeX ? z : x, y, 53));
      }
      for (let x = hx0; x <= hx1; x++) for (let z = hz0; z <= hz1; z++) if (x <= hx0 + 1 || x >= hx1 - 1) w.set(x, L + HH, z, B.trim);
      // 앞 기둥: 주춧돌·홈 파인 몸통·기둥머리
      for (let x = hx0 + 4; x <= hx1 - 4; x += 10) {
        w.box(x - 2, L + 1, hz1 - 2, x + 2, L + 3, hz1 + 2, B.sd1); w.box(x - 2, L + 3, hz1 - 2, x + 2, L + 3, hz1 + 2, B.trim);
        for (let y = L + 4; y <= L + 36; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, y, hz1 + dz, (dx && dz) ? B.st2 : (y % 8 === 0 ? B.st2 : B.trim));
        w.box(x - 2, L + 37, hz1 - 2, x + 2, L + 38, hz1 + 2, B.st2); w.box(x - 3, L + 39, hz1 - 3, x + 3, L + 40, hz1 + 3, B.trim);
        for (let y = L + 10; y < L + 36; y += 8) w.set(x, y, hz1 + 2, B.castleDk);
      }
      w.box(hx0, L + 41, hz1 - 2, hx1, L + 43, hz1 + 1, B.st1); w.box(hx0, L + 44, hz1 - 2, hx1, L + 44, hz1 + 2, B.trim);
      for (let x = hx0; x <= hx1; x++) { w.set(x, L + 42, hz1 + 2, x % 4 === 0 ? B.sd2 : B.st3); if (hash3(x, 5, 88) > 0.4) icicles(x, L + 43, hz1 + 2, 1 + ((hash3(x, 6, 88) * 6) | 0), hash3(x, 7, 88) > 0.85); }
      for (let x = hx0 + 9; x <= hx1 - 9; x += 10) { w.box(x, L + 45, hz1 + 1, x + 1, L + 46, hz1 + 2, B.glowIce); }
      // 옆벽 높은 창(창틀·창턱·가운데 살)과 버팀벽
      for (let z = hz0 + 6; z <= hz1 - 6; z += 10) for (const [x, dx] of [[hx0, -1], [hx1, 1]]) {
        const xi = dx < 0 ? hx0 : hx1, xo = xi + dx;
        w.box(dx < 0 ? hx0 : hx1 - 1, L + 11, z, dx < 0 ? hx0 + 1 : hx1, L + 38, z + 3, B.win);
        w.box(dx < 0 ? hx0 : hx1 - 1, L + 24, z, dx < 0 ? hx0 + 1 : hx1, L + 24, z + 3, B.iron);
        w.box(xo, L + 10, z - 2, xo, L + 10, z + 5, B.trim); w.box(xo + dx, L + 10, z - 1, xo + dx, L + 10, z + 4, B.trim);
        w.box(xo, L + 11, z - 1, xo, L + 38, z - 1, B.sd2); w.box(xo, L + 11, z + 4, xo, L + 38, z + 4, B.sd2);
        w.box(xo, L + 39, z - 1, xo, L + 40, z + 4, B.trim); w.set(xo, L + 41, z + 1, B.trim); w.set(xo, L + 41, z + 2, B.trim);
        w.box(xi, L + 11, z + 1, xi, L + 38, z + 2, B.win);
        if (x === xi) icicles(xo, L + 9, z + 1, 3, true);
      }
      for (let z = hz0 + 1; z <= hz1 - 2; z += 10) for (const [bx, dx] of [[hx0, -1], [hx1, 1]]) for (let d = 1; d <= 5; d++) {
        const x = bx + dx * d, top = L + 36 - (d - 1) * 6;
        for (let y = L - 2; y <= top; y++) for (let k = 0; k < 3; k++) w.set(x, y, z + k, y === top ? B.trim : stoneAt(z + k, y, 57, true));
      }
      // 뒤쪽 지붕만 남았다: 기와 비탈이 앞으로 갈수록 무너져 끝이 들쭉날쭉, 그 끝에 고드름
      const rY = z => L + HH + 2 + (z - (hz0 - 2));
      for (let x = hx0 - 2; x <= hx1 + 2; x++) {
        const end = 47 + Math.floor(hash3(x >> 1, 4, 7) * 3) - ((x - hx0 < 4 || hx1 - x < 4) ? 2 : 0);
        for (let z = hz0 - 2; z <= end; z++) {
          const s = z - (hz0 - 2);
          w.set(x, rY(z), z, s === 0 ? B.roofIdk : s % 3 === 2 ? B.roofI2 : (hash3(x >> 2, s >> 1, 3) > 0.75 ? B.snow3 : B.roofI));
          w.set(x, rY(z) - 1, z, B.roofIdk);
        }
        w.set(x, rY(hz0 - 2) - 1, hz0 - 3, B.roofIdk);
        if (x <= hx0 + 1 || x >= hx1 - 1) for (let z = hz0; z <= end; z++) for (let y = L + HH + 1; y < rY(z) - 1; y++) w.set(x, y, z, stoneAt(z, y, 61));
      }
      for (let x = hx0; x <= hx1; x++) for (let y = L + HH + 1; y < rY(hz0 + 1) - 1; y++) for (const z of [hz0, hz0 + 1]) w.set(x, y, z, stoneAt(x, y, 63));
      const icl = [];
      for (let x = hx0 + 2; x < hx1 - 1; x++) {
        let z = 49; while (z > hz0 && !w.get(x, rY(z) - 1, z)) z--;
        const y = rY(z) - 2;
        const big = (x - hx0) % 12 === 6 && x < hx1 - 4, kk = big ? 16 : 1 + Math.floor(hash3(x, 5, 27) * 8);
        const tw = big ? w.prop({ name: 'icl' + x, pivot: [x + 0.5, y, z + 0.5] }) : w;
        if (big) { for (let q = 0; q < kk; q++) { const th = q < 5 ? 1 : 0; tw.set(x, y - q, z, q === kk - 1 ? B.glowIce : B.icicle); if (th) tw.set(x + 1, y - q, z, B.icicle); } icl.push(['icl' + x, x, y - kk + 1, z]); x++; }
        else if (!w.get(x, y, z)) icicles(x, y, z, kk, kk > 6);
      }
      for (let i = 0; i < 260; i++) {
        const x = w.ri(hx0 + 2, hx1 - 2), z = w.ri(56, hz1 - 3);
        if (x > 150 && x < 170) continue;
        const r = w.r(1.5, 3.5);
        for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { const d = Math.hypot(dx, dz) / r; if (d < 1 && !w.get(x + dx, L + 1, z + dz) && x + dx > hx0 + 1 && x + dx < hx1 - 1) { w.set(x + dx, L + 1, z + dz, B.snow3); if (d < 0.45 && !w.get(x + dx, L + 2, z + dz)) w.set(x + dx, L + 2, z + dz, B.snow3); } }
      }
      // 융단: 금 테두리, 가운데 얼음 무늬
      for (let z = hz0 + 12; z <= hz1 + 24; z++) for (let x = 152; x <= 168; x++) w.set(x, L, z, (x <= 153 || x >= 167) ? B.gold : ((z % 12 === 0 && (x === 160 || x === 159 || x === 161)) || (z % 12 === 1 && x === 160) || (z % 12 === 11 && x === 160) ? B.glowIce : B.carpet));
      // 왕좌 단: 열 계단
      for (let st = 0; st < 10; st++) {
        const zEnd = Math.round(hz0 + 16 - st * 1.4);
        for (let x = 138 + st; x <= 182 - st; x++) for (let z = hz0 + 2; z <= zEnd; z++) w.set(x, L + 1 + st, z, z === zEnd ? (st % 2 ? B.trim : B.sd1) : (st % 2 ? B.st3 : B.sd1));
        for (let x = 152 + Math.floor(st / 3); x <= 168 - Math.floor(st / 3); x++) w.set(x, L + 1 + st, zEnd, x <= 153 || x >= 167 ? B.gold : B.carpet);
      }
      const ty = L + 11, tz = hz0 + 2;
      w.box(154, L + 1, tz, 167, ty - 1, tz + 7, B.iceDk); w.box(154, ty, tz, 167, ty + 3, tz + 7, B.glowIce); w.box(155, ty + 1, tz, 166, ty + 2, tz + 8, B.ice);
      w.box(154, ty + 4, tz, 167, ty + 29, tz + 1, B.ice);
      for (const ax of [154, 166]) { w.box(ax, ty + 4, tz + 2, ax + 1, ty + 12, tz + 8, B.ice); w.box(ax, ty + 13, tz + 7, ax + 1, ty + 14, tz + 8, B.glowIce); w.box(ax, ty + 13, tz + 2, ax + 1, ty + 13, tz + 6, B.iceDk); }
      for (const [sx, h] of [[154, 34], [156, 40], [158, 44], [160, 52], [162, 44], [164, 40], [166, 34], [152, 30], [168, 30], [150, 22], [170, 22], [148, 16], [172, 16]]) {
        w.box(sx, ty + 4, tz, sx + 1, ty + h - 2, tz, B.glowIce); w.box(sx, ty + h - 1, tz, sx, ty + h, tz, B.glowIce);
        if (sx < 154 || sx > 167) w.box(sx, ty + 4, tz + 1, sx + 1, ty + Math.floor(h * 0.6), tz + 1, B.ice);
      }
      w.box(156, ty + 4, tz + 2, 165, ty + 5, tz + 7, B.carpet); w.box(156, ty + 6, tz + 2, 165, ty + 19, tz + 3, B.carpet); w.box(157, ty + 7, tz + 4, 164, ty + 18, tz + 4, B.carpet);
      for (let x = 156; x <= 165; x++) w.set(x, ty + 20, tz + 2, B.gold);
      // 왕관: 테 + 다섯 뾰족
      for (let x = 158; x <= 163; x++) for (let z = tz + 4; z <= tz + 6; z++) if (x === 158 || x === 163 || z !== tz + 5) { w.set(x, ty + 6, z, B.crown); w.set(x, ty + 7, z, B.crown); }
      for (const [px, pz] of [[158, tz + 4], [163, tz + 4], [158, tz + 6], [163, tz + 6], [160, tz + 4], [161, tz + 6]]) w.box(px, ty + 8, pz, px, ty + 9, pz, B.crown);
      w.set(160, ty + 10, tz + 4, B.crown); w.set(161, ty + 8, tz + 5, B.glowIce);
      for (const bx of [134, 186]) {
        const bz = hz1 - 10;
        w.box(bx - 2, L + 1, bz - 2, bx + 2, L + 2, bz + 2, B.sd1); w.box(bx, L + 3, bz, bx, L + 10, bz, B.iron); w.box(bx - 1, L + 5, bz - 1, bx + 1, L + 5, bz + 1, B.ironDk);
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) w.set(bx + dx, L + 11, bz + dz, Math.abs(dx) === 2 || Math.abs(dz) === 2 ? B.iron : B.blueFire);
        w.box(bx - 1, L + 12, bz - 1, bx + 1, L + 13, bz + 1, B.blueFire); w.box(bx, L + 14, bz, bx, L + 15, bz, B.blueFire);
        lights.push({ p: [bx + 0.5, L + 16, bz + 0.5], c: '#6ad0ff', i: 1.1, d: 40, flicker: 0.3 });
      }
      lights.push({ name: 'throne', p: [160.5, ty + 11, tz + 6], c: '#80d8ff', i: 1.5, d: 64, flicker: 0.05 });
      acts.push({
        name: '겨울 왕좌', hint: '왕관이 타오르고 눈보라가 몰아쳐요', hit: [148, ty, tz, 172, ty + 34, tz + 10],
        run: async a => {
          a.flash('throne', 4, 3.6); a.glow(1.7, 3.6);
          for (let k = 0; k < 6; k++) { a.burst([160.5, ty + 12, tz + 10], { n: 50, colors: ['#ffffff', '#c8ecfa', '#ffe08a'], speed: 32, up: 4, life: 2, gravity: 1, spread: 5, flat: true }); await a.wait(0.4); }
        },
      });
      landmarks.push({ name: '겨울의 왕좌', note: '보스 · 겨울의 왕', p: [161, L + 90, 64], boss: true });
      tower(160, 22, L + 1, 74, 12.5);

      // ───────── 성문에서 호숫가까지: 눈길과 감옥 옆 돌계단 ─────────
      const NAT = new Set([B.snow, B.snow2, B.snow3, B.ice, B.iceDk, B.trail, B.rockSnow]);
      const rpath = (pts, width, b) => {
        for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
          const d = MH.polyDist(x + 0.5, z + 0.5, pts);
          if (d > width + 4) continue;
          const g = MH.g(w, x, z); if (g < 0) continue;
          const cur = w.get(x, g, z), nb = n.fbm(x * 0.13 + 13, z * 0.13 + 29, 2), wd = width + (nb - 0.5) * 3.2;
          if (d <= wd && (d <= width || NAT.has(cur))) w.set(x, g, z, d < width * 0.45 && n.fbm(x * 0.2 + 3, z * 0.2 + 8, 2) > 0.52 ? B.trailDk : b);
          else if (NAT.has(cur) && d <= wd + 2.5 && nb > 0.45 && hash3(x >> 1, 9, z >> 1) > 0.35) w.set(x, g, z, B.snow2);
        }
      };
      const path1 = [[161, 132], [142, 145], [119, 155]];
      rpath(path1, 5.5, B.trail);
      const sTop = MH.g(w, 118, 154), sBot = MH.g(w, 118, 204);
      MH.flight(w, { name: '감옥 옆 계단', axis: 'z', c: 118, half: 7, a: 158, b: 200, ha: sTop, hb: sBot, step: B.flag, edge: B.castleDk, fill: B.rock, rail: B.castleDk, post: B.castle, postGap: 8, clear: 16,
        onPost: (x, y, z, k) => { w.set(x, y, z, B.trim); w.set(x, y + 1, z, B.blueFire); if (k === 24 && x > 118) lights.push({ p: [x + 0.5, y + 2, z + 0.5], c: '#6ad0ff', i: 0.9, d: 36, flicker: 0.3 }); } });
      rpath([[119, 202], [121, 220], [130, 232]], 5.5, B.trail);

      // ───────── 기사단 묘역: 감옥 동쪽 단, 쇠울타리 안의 묘비와 얼음관, 서리 영묘 ─────────
      const GX0 = 204, GX1 = 260, GZ0 = 140, GZ1 = 196, GL = MH.g(w, 224, 172);
      const inGrave = (x, z) => x >= GX0 - 8 && x <= GX1 + 8 && z >= GZ0 - 8 && z <= GZ1 + 8;
      const path2 = [[168, 132], [190, 146], [204, 169]];
      rpath(path2, 3.6, B.trail);
      MH.flatten(w, GX0, GZ0, GX1, GZ1, GL, B.snow, B.rock);
      // 단 둘레: 아래쪽은 석축, 위쪽(산 쪽)은 비탈
      for (let z = GZ0 - 16; z <= GZ1 + 16; z++) for (let x = GX0 - 16; x <= GX1 + 16; x++) {
        if (x >= GX0 && x <= GX1 && z >= GZ0 && z <= GZ1) continue;
        const d = Math.hypot(Math.max(GX0 - x, 0, x - GX1), Math.max(GZ0 - z, 0, z - GZ1)), g = MH.g(w, x, z);
        if (g <= GL || d > 16) continue;
        const hh = Math.round(GL + d * 1.5 + (n.fbm(x * 0.1, z * 0.1 + 5, 2) - 0.5) * 5);
        if (hh < g) MH.setH(w, x, z, hh, d > 8 && hash3(x >> 2, 2, z >> 2) > 0.6 ? B.rockSnow : B.snow2, B.rock);
      }
      for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) {
        const edge = x === GX0 || x === GX1 || z === GZ0 || z === GZ1;
        if (!edge) continue;
        let low = GL; for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const g2 = MH.g(w, x + dx, z + dz); if (g2 >= 0 && !(x + dx >= GX0 && x + dx <= GX1 && z + dz >= GZ0 && z + dz <= GZ1)) low = Math.min(low, g2); }
        if (GL - low < 2) continue;
        for (let y = low - 1; y < GL; y++) w.set(x, y, z, stoneAt(x + z, y, 71, true));
        w.set(x, GL, z, B.trim);
      }
      for (let z = GZ0 + 1; z < GZ1; z++) for (let x = GX0 + 1; x < GX1; x++) { const f = n.fbm(x * 0.1, z * 0.1, 2); if (f > 0.56) MH.paint(w, x, z, B.snow2); else if (f < 0.36) MH.paint(w, x, z, B.snow3); }
      for (let x = GX0; x <= 234; x++) for (let z = 165; z <= 173; z++) { const row = Math.floor(x / 3), off = (row & 1) * 2; MH.paint(w, x, z, (x % 3 === 2 || (z + off) % 4 === 3) ? B.flagJ : (hash3(row, (z + off) >> 2, 3) > 0.7 ? B.trail : B.flag)); }
      // 창끝 쇠울타리(서쪽에 출입구)
      const fence = pts => {
        for (let i = 0; i < pts.length - 1; i++) {
          const [ax, az] = pts[i], [bx, bz] = pts[i + 1], nn = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
          for (let s = 0; s <= nn; s++) {
            const x = Math.round(ax + (bx - ax) * s / nn), z = Math.round(az + (bz - az) * s / nn), g = MH.g(w, x, z);
            if (s % 6 === 0) { w.box(x, g + 1, z, x, g + 8, z, B.iron); w.set(x, g + 9, z, B.gold); }
            else { w.set(x, g + 2, z, B.ironDk); w.set(x, g + 7, z, B.ironDk); if (s % 2 === 0) { w.box(x, g + 3, z, x, g + 6, z, B.iron); w.set(x, g + 8, z, B.iron); } }
          }
        }
      };
      fence([[GX0, 161], [GX0, GZ0], [GX1, GZ0], [GX1, GZ1], [GX0, GZ1], [GX0, 177]]);
      for (const gz of [162, 175]) {
        for (let y = GL + 1; y <= GL + 14; y++) for (let x = 203; x <= 205; x++) for (let z = gz; z <= gz + 1; z++) w.set(x, y, z, (y - GL) % 5 === 0 ? B.sdM : B.sd1);
        w.box(202, GL + 15, gz - 1, 206, GL + 15, gz + 2, B.trim); w.box(204, GL + 16, gz, 204, GL + 16, gz + 1, B.iron); w.box(204, GL + 17, gz, 204, GL + 18, gz + 1, B.blueFire);
      }
      for (let z = 164; z <= 174; z++) { const yy = GL + 17 + Math.round(Math.sin((z - 163) / 12 * Math.PI) * 3); w.set(204, yy, z, B.iron); if (z % 2 === 0) w.set(204, yy - 1, z, B.ironDk); }
      w.set(204, GL + 21, 169, B.gold);
      // 서리 영묘: 두 단 기단, 낱돌 벽, 주랑, 높은 창, 박공지붕과 둥근 창, 얼음 십자
      const M0 = 216, M1 = 247, MZ0 = 142, MZ1 = 163, MC = 231.5;
      w.box(M0 - 2, GL + 1, MZ0 - 2, M1 + 2, GL + 1, MZ1 + 2, B.sd2); w.box(M0 - 1, GL + 2, MZ0 - 1, M1 + 1, GL + 2, MZ1 + 2, B.sd1);
      w.box(220, GL + 1, MZ1 + 3, 243, GL + 1, MZ1 + 4, B.flag);
      for (let z = MZ0; z <= MZ1; z++) for (let x = M0; x <= M1; x++) {
        const edge = x <= M0 + 1 || x >= M1 - 1 || z <= MZ0 + 1 || z >= MZ1 - 1;
        for (let y = GL + 3; y <= GL + 26; y++) w.set(x, y, z, edge ? (y === GL + 14 ? B.trim : stoneAt((x === M0 || x === M1 || x === M0 + 1 || x === M1 - 1) ? z : x, y, 81)) : 0);
        w.set(x, GL + 2, z, B.flag);
      }
      for (let z = MZ0 - 1; z <= MZ1 + 1; z++) for (let x = M0 - 1; x <= M1 + 1; x++) if (x === M0 - 1 || x === M1 + 1 || z === MZ0 - 1 || z === MZ1 + 1) { w.set(x, GL + 26, z, B.trim); w.set(x, GL + 3, z, B.sd2); }
      for (const px of [216, 222, 240, 246]) {
        w.box(px - 1, GL + 3, MZ1 + 1, px + 2, GL + 4, MZ1 + 4, B.sd1);
        for (let y = GL + 5; y <= GL + 23; y++) for (let x = px; x <= px + 1; x++) for (let z = MZ1 + 2; z <= MZ1 + 3; z++) w.set(x, y, z, y % 6 === 0 ? B.st2 : B.trim);
        w.box(px - 1, GL + 24, MZ1 + 1, px + 2, GL + 25, MZ1 + 4, B.trim);
      }
      w.box(M0 - 1, GL + 26, MZ1 + 1, M1 + 1, GL + 26, MZ1 + 4, B.trim);
      for (const z of [148, 156]) for (const x of [M0, M1]) {
        const xs = x === M0 ? [M0, M0 + 1] : [M1 - 1, M1], xo = x === M0 ? M0 - 1 : M1 + 1;
        for (const xx of xs) w.box(xx, GL + 7, z, xx, GL + 21, z + 1, B.win);
        w.box(xo, GL + 6, z - 1, xo, GL + 6, z + 2, B.trim); w.box(xo, GL + 22, z - 1, xo, GL + 22, z + 2, B.trim); w.box(xo, GL + 7, z - 1, xo, GL + 21, z - 1, B.sd2); w.box(xo, GL + 7, z + 2, xo, GL + 21, z + 2, B.sd2);
      }
      const mpk = roofHD(M0 - 1, M1 + 1, MZ0 - 1, MZ1 + 4, GL + 27, { axis: 'z', gable: (a, yy) => stoneAt(a, yy, 83), gwin: B.glowIce });
      w.box(231, mpk, MZ1 + 4, 232, mpk + 9, MZ1 + 4, B.glowIce); w.box(228, mpk + 6, MZ1 + 4, 235, mpk + 7, MZ1 + 4, B.glowIce);
      // 영묘 안: 빛나는 얼음관과 뒤의 얼음 기둥
      w.box(226, GL + 3, 146, 237, GL + 6, 153, B.ice); w.box(227, GL + 3, 145, 236, GL + 4, 154, B.sd1);
      w.box(228, GL + 7, 148, 235, GL + 7, 151, B.glowIce); w.box(231, GL + 3, 144, 232, GL + 16, 144, B.glowIce);
      // 문간과 두 짝 문(부품)
      const dop = (x, y) => y <= GL + 16 || (y === GL + 17 && x > 226 && x < 237) || (y === GL + 18 && x > 228 && x < 235);
      for (let y = GL + 3; y <= GL + 18; y++) for (let x = 226; x <= 237; x++) if (dop(x, y)) for (const z of [MZ1 - 1, MZ1]) w.set(x, y, z, 0);
      for (let y = GL + 3; y <= GL + 20; y++) for (const x of [224, 225, 238, 239]) w.set(x, y, MZ1 + 1, (y - GL) % 4 === 0 ? B.sdM : B.sd2);
      w.box(224, GL + 19, MZ1 + 1, 239, GL + 20, MZ1 + 1, B.sd2); w.box(228, GL + 21, MZ1 + 1, 235, GL + 21, MZ1 + 1, B.gold); w.box(230, GL + 22, MZ1 + 1, 233, GL + 22, MZ1 + 1, B.trim);
      const mdL = w.prop({ name: 'mdoorL', pivot: [226, GL + 3, MZ1 + 1] }), mdR = w.prop({ name: 'mdoorR', pivot: [238, GL + 3, MZ1 + 1] });
      for (let y = GL + 3; y <= GL + 18; y++) for (let x = 226; x <= 237; x++) if (dop(x, y)) {
        const L2 = x <= 231, ex = x === 226 || x === 237 || x === 231 || x === 232;
        (L2 ? mdL : mdR).set(x, y, MZ1, (y - GL) % 5 === 0 || ex ? B.iron : ((x === 230 || x === 233) && (y === GL + 9 || y === GL + 10)) ? B.gold : (x % 2 ? B.woodDk : B.roofIdk));
      }
      lights.push({ name: 'tomb', p: [MC, GL + 9, 150], c: '#9fe8ff', i: 0.6, d: 40, flicker: 0.1 });
      // 묘비(둥근 머리·눈 모자·명판)와 칼 무덤
      const graves = [];
      for (const gz of [176, 186]) for (const gx of [210, 220, 242, 252]) {
        const k = graves.length, broken = k === 2 || k === 7, top = broken ? GL + 4 : GL + 8;
        for (let y = GL + 1; y <= top; y++) for (let x = gx - 2; x <= gx + 2; x++) for (let z = gz; z <= gz + 1; z++) {
          if (broken && y === top && hash3(x, y, z) > 0.5) continue;
          w.set(x, y, z, y === GL + 1 ? B.sd2 : B.sd1);
        }
        if (!broken) { w.box(gx - 1, GL + 9, gz, gx + 1, GL + 9, gz + 1, B.sd1); w.set(gx, GL + 10, gz, B.sd1); w.set(gx, GL + 10, gz + 1, B.sd1); w.box(gx - 1, GL + 10, gz, gx - 1, GL + 10, gz + 1, B.snow3); w.box(gx + 1, GL + 10, gz, gx + 1, GL + 10, gz + 1, B.snow3); w.set(gx, GL + 11, gz, B.snow3); w.box(gx, GL + 5, gz + 2, gx, GL + 7, gz + 2, k % 3 ? B.trim : B.gold); w.box(gx - 1, GL + 6, gz + 2, gx + 1, GL + 6, gz + 2, k % 3 ? B.trim : B.gold); }
        else { w.box(gx + 3, GL + 1, gz + 2, gx + 4, GL + 1, gz + 4, B.sd1); w.set(gx + 3, GL + 2, gz + 3, B.sd1); w.set(gx - 3, GL + 1, gz + 1, B.sd1); }
        for (let z = gz + 2; z <= gz + 7; z++) for (let x = gx - 2; x <= gx + 2; x++) { w.set(x, GL + 1, z, B.snow2); if (Math.abs(x - gx) <= 1 && z > gz + 2 && z < gz + 7) w.set(x, GL + 2, z, B.snow3); }
        if (k % 2 === 0) { w.box(gx, GL + 3, gz + 5, gx, GL + 8, gz + 5, B.iron); w.box(gx - 2, GL + 9, gz + 5, gx + 2, GL + 9, gz + 5, B.gold); w.box(gx, GL + 10, gz + 5, gx, GL + 11, gz + 5, B.woodDk); w.set(gx, GL + 12, gz + 5, B.gold); }
        graves.push([gx, gz + 5]);
      }
      // 등롱 기둥: 쇠기둥, 유리 바구니 안 푸른 불, 갓
      for (const [lx, lz] of [[232, 181], [232, 193], [210, 150], [254, 150]]) {
        const g = MH.g(w, lx, lz);
        w.box(lx - 1, g + 1, lz - 1, lx + 1, g + 1, lz + 1, B.sd1); w.box(lx, g + 2, lz, lx, g + 10, lz, B.iron);
        for (let dy = 11; dy <= 13; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(lx + dx, g + dy, lz + dz, (dx && dz) ? B.ironDk : (dx || dz) ? (dy === 12 ? B.blueFire : B.iron) : B.blueFire);
        w.box(lx - 1, g + 14, lz - 1, lx + 1, g + 14, lz + 1, B.iron); w.set(lx, g + 15, lz, B.ironDk);
      }
      lights.push({ name: 'grave', p: [232, GL + 14, 184], c: '#7ad8ff', i: 0.6, d: 52, flicker: 0.25 });
      // 얼음관 두 개(뚜껑은 부품)
      const coffins = [];
      for (const cx of [208, 252]) {
        w.box(cx - 2, GL + 1, 154, cx + 2, GL + 4, 164, B.ice); w.box(cx - 1, GL + 2, 155, cx + 1, GL + 4, 163, B.iceDk); w.box(cx, GL + 4, 156, cx, GL + 4, 162, B.glowIce);
        w.box(cx - 2, GL + 1, 153, cx + 2, GL + 2, 153, B.sd2); w.box(cx - 2, GL + 1, 165, cx + 2, GL + 2, 165, B.sd2);
        const nm = 'lid' + coffins.length, p = w.prop({ name: nm, pivot: [cx + (cx < 232 ? -2 : 3), GL + 5, 159.5], axis: 'z' });
        p.box(cx - 2, GL + 5, 154, cx + 2, GL + 5, 164, B.iceDk); p.box(cx, GL + 6, 155, cx, GL + 6, 163, B.trim); p.box(cx - 2, GL + 6, 158, cx + 2, GL + 6, 158, B.trim);
        p.set(cx, GL + 7, 158, B.gold); p.set(cx, GL + 7, 159, B.gold);
        coffins.push([cx, nm]);
      }
      landmarks.push({ name: '기사단 묘역', note: '새 구역 · 얼어붙은 망자들이 잠든 곳', p: [232, GL + 36, 184] });
      landmarks.push({ name: '서리 영묘', note: '옛 기사단장들의 얼음관', p: [MC, GL + 62, 152] });
      acts.push({
        name: '서리 영묘의 문', hint: '영묘의 두 문짝이 바깥으로 열리고 안에서 푸른 냉기가 쏟아져 나와요', hit: [226, GL + 3, MZ1 - 2, 237, GL + 18, MZ1 + 4],
        run: async a => {
          a.flash('tomb', 6, 5);
          await Promise.all([a.turn('mdoorL', [0, -1.3, 0], 1.3), a.turn('mdoorR', [0, 1.3, 0], 1.3)]);
          for (let k = 0; k < 7; k++) { a.burst([MC, GL + 5, MZ1 + 2], { n: 30, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 8, up: 1, life: 1.8, gravity: 0.8, spread: 4, flat: true }); await a.wait(0.3); }
          await a.wait(0.8);
          await Promise.all([a.turn('mdoorL', [0, 0, 0], 1.1), a.turn('mdoorR', [0, 0, 0], 1.1)]);
        },
      });
      acts.push({
        name: '열리는 얼음관', hint: '묘역의 얼음관 뚜껑이 들썩 들리며 옆으로 젖혀지고 서리가 뿜어져 나와요', hit: [205, GL + 1, 152, 211, GL + 8, 166],
        run: async a => {
          for (const [, nm] of coffins) for (let k = 0; k < 3; k++) { await a.move(nm, [0, 0.8, 0], 0.07); await a.move(nm, [0, 0, 0], 0.07); }
          await Promise.all(coffins.map(([cx, nm]) => a.tween(nm, { off: [0, 2, 0], rot: [0, 0, cx < 232 ? 1.2 : -1.2] }, 0.8)));
          for (let k = 0; k < 4; k++) { for (const [cx] of coffins) a.burst([cx + 0.5, GL + 5, 160], { n: 22, colors: ['#ffffff', '#9fe8ff', '#c8ecfa'], speed: 6, up: 12, life: 1.4, gravity: -0.6, spread: 3 }); await a.wait(0.35); }
          await a.wait(0.6);
          await Promise.all(coffins.map(([, nm]) => a.tween(nm, { off: [0, 0, 0], rot: [0, 0, 0] }, 1)));
        },
      });
      acts.push({
        name: '묘역의 혼불', hint: '무덤마다 푸른 혼불이 하나씩 피어올라 묘역 위를 맴돌아요', hit: [207, GL + 1, 174, 256, GL + 14, 196],
        run: async a => {
          a.flash('grave', 5, 5); a.glow(1.5, 5);
          for (const [gx, gz] of graves) { a.burst([gx + 0.5, GL + 4, gz + 0.5], { n: 20, colors: ['#6ad0ff', '#9fe8ff', '#ffffff'], speed: 2, up: 8, life: 2, gravity: -1.2, spread: 1.6 }); await a.wait(0.3); }
          for (let k = 0; k < 16; k++) { const t = k / 16 * Math.PI * 2; a.burst([232 + Math.cos(t) * 22, GL + 18 + Math.sin(k) * 3, 184 + Math.sin(t) * 12], { n: 6, colors: ['#9fe8ff', '#e0f8ff'], speed: 1, up: 1, life: 1.2, gravity: 0, spread: 0.8 }); await a.wait(0.08); }
          await a.wait(0.8);
        },
      });

      const onTrail = (x, z) => (x > 100 && x < 138 && z > 138 && z < 240) || MH.polyDist(x, z, path1) < 10 || MH.polyDist(x, z, path2) < 8 || inGrave(x, z);
      // ───────── 빙하 위 얼음 가시 ─────────
      for (let i = 0; i < 45; i++) {
        const x = w.ri(124, 196), z = w.ri(210, 250), g = MH.g(w, x, z);
        if (g < 0 || onTrail(x, z) || (x > 128 && x < 198 && z < 224) || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
        const h = w.ri(10, 30), r = w.r(3, 6);
        let k = 0;
        for (let rr = r; rr > 0.4; rr -= r / h, k++) w.cyl(x, z, g + 1 + k, g + 1 + k, rr, k > h * 0.6 ? B.icicle : k < 3 ? B.iceDk : B.ice);
        w.set(x, g + 1 + k, z, B.glowIce);
      }
      // ───────── 눈 털어내는 전나무(부품) ─────────
      let pine = null;
      for (let z = 144; z <= 250 && !pine; z += 4) for (let x = 276; x >= 44 && !pine; x -= 4) {
        const g = MH.g(w, x, z);
        if (g < 0 || w.slope[x + W * z] > 2 || w.liq[x + W * z] >= 0 || onTrail(x, z) || Math.hypot(x - 160, z - 130) < 44 || (x > 116 && x < 206 && z < 214) || g + 52 >= Hh) continue;
        let free = true;
        if (MH.maxG(w, x - 6, z - 6, x + 6, z + 6) > g + 3) free = false;
        for (let y = g + 9; y <= g + 48 && free; y += 2) for (let dz = -10; dz <= 10 && free; dz++) for (let dx = -10; dx <= 10; dx++) if (w.get(x + dx, y, z + dz)) { free = false; break; }
        if (free) pine = [x, g, z];
      }
      if (pine) {
        const [px, pg, pz] = pine;
        const pp = w.prop({ name: 'pine', pivot: [px + 0.5, pg + 1, pz + 0.5], axis: 'z' });
        const ptop = pineTree(guard(pp), px, pg + 1, pz, 42, 10);
        acts.push({
          name: '흔들리는 전나무', hint: '큰 전나무가 찬바람에 휘청이며 가지 위 눈을 우수수 쏟아내요', hit: [px - 10, pg + 1, pz - 10, px + 10, ptop, pz + 10],
          run: async a => {
            a.wind(3, 3);
            for (let k = 0; k < 4; k++) {
              await a.turn('pine', [0.12, 0, k % 2 ? 0.14 : -0.14], 0.35);
              a.burst([px + 0.5, pg + 20 + k * 5, pz + 0.5], { n: 50, colors: ['#ffffff', '#e8f0f6', '#dfefff'], speed: 8, up: 2, life: 2, gravity: 6, spread: 10 });
            }
            await a.turn('pine', [0, 0, 0], 0.8);
          },
        });
      }
      // ───────── 전나무 숲 ─────────
      for (let i = 0; i < 125; i++) {
        const x = w.ri(8, W - 10), z = w.ri(100, D - 10), g = MH.g(w, x, z);
        if (g < 0 || dxOf(x, z) < 42 || onTrail(x, z) || (x > 192 && x < 280 && z > 128 && z < 232) || (x > 76 && x < 244 && z < 140) || w.slope[x + W * z] > 2 || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0 || g + 60 >= Hh || (pine && Math.hypot(x - pine[0], z - pine[2]) < 20)) continue;
        pineTree(w, x, g + 1, z, w.ri(30, 46), w.r(6.5, 9));
      }
      // ───────── 무너진 망루 ─────────
      const RX = 56, RZ = 200, rg = MH.g(w, RX, RZ) + 1;
      MH.flatten(w, RX - 13, RZ - 13, RX + 13, RZ + 13, rg - 1, B.snow2, B.rock);
      for (let z = RZ - 26; z <= RZ + 26; z++) for (let x = RX - 26; x <= RX + 26; x++) {
        const d = Math.max(Math.abs(x - RX), Math.abs(z - RZ)) - 13; if (d <= 0) continue;
        const g = MH.g(w, x, z); if (g < 0) continue;
        const want = rg - 1 + (g > rg - 1 ? 1 : -1) * d * 1.3 + (n.fbm(x * 0.1, z * 0.1, 2) - 0.5) * 4;
        if ((g > rg - 1 && g > want) || (g < rg - 1 && g < want)) MH.setH(w, x, z, Math.round(want), B.snow2, B.rock);
      }
      tower(RX, RZ, rg, 44, 10, { ruin: true, m: { wall: B.sd1, wall2: B.sd2, band: B.sd2, mortar: B.sdM, trim: B.trim, win: B.dark } });
      for (let i = 0; i < 160; i++) { const a = w.r(0, 6.28), rr = w.r(0, 11.5), y = rg + 44 - w.ri(0, 18) + Math.round(Math.cos(a * 2) * 3); w.sphere(RX + Math.round(Math.cos(a) * rr), y, RZ + Math.round(Math.sin(a) * rr), w.r(1, 2.2), 0); }
      for (let i = 0; i < 70; i++) {
        const x = RX + w.ri(-22, 22), z = RZ + w.ri(-22, 22), g = MH.g(w, x, z);
        if (Math.hypot(x - RX, z - RZ) < 12 || w.get(x, g + 1, z)) continue;
        const s = w.ri(1, 3); w.box(x, g + 1, z, x + s, g + w.ri(1, 2), z + w.ri(1, 2), hash3(x, 1, z) > 0.5 ? B.sd1 : B.sd2);
        if (i % 3 === 0) w.set(x, g + 3, z, B.snow3);
      }
      landmarks.push({ name: '무너진 망루', note: '창백한 기사들의 순찰로', p: [RX + 0.5, rg + 60, RZ + 0.5] });
      // ───────── 고드름 낙하 ─────────
      if (icl.length) acts.push({
        name: '고드름 낙하', hint: '무너진 지붕 끝 큰 고드름들이 떨어져 왕좌의 방 바닥에 부서졌다가 다시 맺혀요', hit: [hx0 + 4, icl[0][2] - 2, 45, hx1 - 4, L + HH + 4, 52],
        run: async a => {
          for (let k = 0; k < 4; k++) { await Promise.all(icl.map(([nm]) => a.move(nm, [0.4 * (k % 2 ? 1 : -1), 0, 0], 0.07))); }
          for (const [nm, x, y, z] of icl) {
            const drop = y - L - 1;
            await a.move(nm, [0, -drop, 2], 0.45, t => t * t);
            a.burst([x + 0.5, L + 2, z + 2.5], { n: 36, colors: ['#ffffff', '#c8ecfa', '#9fe8ff'], speed: 16, up: 6, life: 1.2, gravity: 12, spread: 4 });
            a.tween(nm, { scl: [0, 0, 0] }, 0.1);
            await a.wait(0.25);
          }
          await a.wait(0.6);
          await Promise.all(icl.map(([nm]) => a.respawn(nm, 1.0)));
        },
      });
      // ───────── 망루의 봉화 ─────────
      const bt = rg + 44;   // 무너진 꼭대기 가운데에 봉화 받침 기둥을 다시 쌓는다
      for (let y = rg + 20; y <= bt; y++) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (dx * dx + dz * dz <= 7.5) w.set(RX + dx, y, RZ + dz, y === bt ? B.trim : (y % 4 === 0 ? B.sdM : B.sd1));
      w.box(RX - 2, bt + 1, RZ - 2, RX + 2, bt + 1, RZ + 2, B.iron); w.box(RX - 1, bt + 2, RZ - 1, RX + 1, bt + 2, RZ + 1, B.blueFire);
      for (const [dx, dz] of [[-2, -2], [2, 2], [-2, 2], [2, -2]]) w.set(RX + dx, bt + 2, RZ + dz, B.ironDk);
      w.set(RX, bt + 3, RZ, B.blueFire);
      lights.push({ name: 'beacon', p: [RX + 0.5, bt + 5, RZ + 0.5], c: '#6ad0ff', i: 0.5, d: 72, flicker: 0.4 });
      acts.push({
        name: '망루의 봉화', hint: '무너진 망루 꼭대기에 푸른 봉화가 치솟아 계곡을 비춰요', hit: [RX - 4, bt, RZ - 4, RX + 4, bt + 6, RZ + 4],
        run: async a => {
          a.flash('beacon', 8, 5); a.glow(1.5, 5);
          for (let k = 0; k < 12; k++) { a.burst([RX + 0.5, bt + 4, RZ + 0.5], { n: 26, colors: ['#6ad0ff', '#9fe8ff', '#ffffff'], speed: 4, up: 20, life: 1.4, gravity: -1, spread: 2.4 }); await a.wait(0.35); }
        },
      });
      // ───────── 서리 호수의 유빙(부품) ─────────
      const IX = 150, IZ = 268, iy = WL + 1;
      for (let dz = -14; dz <= 14; dz++) for (let dx = -16; dx <= 16; dx++) { const x = IX + dx, z = IZ + dz; if (w.get(x, WL, z) === B.ice) w.set(x, WL, z, 0); }
      const floe = w.prop({ name: 'floe', pivot: [IX + 0.5, iy, IZ + 0.5] });
      for (let dz = -8; dz <= 8; dz++) for (let dx = -10; dx <= 10; dx++) {
        const e = Math.abs(dx) + Math.abs(dz) * 1.3 + (hash3(dx >> 1, 4, dz >> 1) - 0.5) * 2.4;
        if (e > 13) continue;
        if (!w.get(IX + dx, iy, IZ + dz)) floe.set(IX + dx, iy, IZ + dz, e > 11 ? B.iceDk : hash3(dx >> 1, 5, dz >> 1) > 0.8 ? B.iceDk : B.ice);
        if (e < 9 && !w.get(IX + dx, iy - 1, IZ + dz)) floe.set(IX + dx, iy - 1, IZ + dz, B.iceDk);
        if (e < 7 && n.fbm(dx * 0.3, dz * 0.3 + 9, 2) > 0.52) floe.set(IX + dx, iy + 1, IZ + dz, B.snow3);
      }
      acts.push({
        name: '갈라지는 유빙', hint: '서리 호수의 얼음판이 쩍 갈라지며 기울었다가 물보라와 함께 가라앉고, 새 얼음판이 스르륵 떠올라요', hit: [IX - 10, iy - 1, IZ - 8, IX + 10, iy + 2, IZ + 8],
        run: async a => {
          for (let k = 0; k < 5; k++) { a.burst([IX + 0.5 + (k - 2) * 5, iy + 1, IZ + 0.5 + (k % 2) * 4 - 2], { n: 14, colors: ['#ffffff', '#b4e2f2'], speed: 6, up: 2, life: 0.7, gravity: 8, spread: 1.2, flat: true }); await a.wait(0.12); }
          await a.tween('floe', { off: [0, 4, 0], rot: [0.55, 0, 0.25] }, 0.6);
          await a.wait(0.4);
          await a.tween('floe', { off: [0, -8, 0], rot: [0.2, 0, 0.1] }, 0.9, t => t * t);
          for (let k = 0; k < 3; k++) { a.burst([IX + 0.5, iy + 1, IZ + 0.5], { n: 40, colors: ['#ffffff', '#b4e2f2', '#8cc8e0'], speed: 12, up: 10, life: 1.3, gravity: 14, spread: 7 }); await a.wait(0.25); }
          await a.wait(0.6);
          await a.respawn('floe', 1.2);
        },
      });
      // ───────── 오로라 ─────────
      acts.push({
        name: '오로라', hint: '성채 위 하늘에 푸르고 초록빛 오로라가 장막처럼 일렁여요', hit: [140, L + 70, 64, 180, L + 84, 80],
        run: async a => {
          a.glow(1.6, 6); a.flash('throne', 2, 6);
          for (let r = 0; r < 3; r++) for (let k = 0; k <= 16; k++) {
            const x = 74 + k * 10.5, z = 74 + Math.sin(k * 0.6 + r) * 15, y = Math.min(w.H - 12, L + 84 + Math.sin(k * 0.4 + r * 1.3) * 8);
            a.burst([x, y, z], { n: 12, colors: r % 2 ? ['#7affc8', '#9fe8ff', '#c8ffe8'] : ['#9fe8ff', '#b088ff', '#e0f8ff'], speed: 1.4, up: -4, life: 2.2, gravity: 1.2, spread: 3 });
            await a.wait(0.07);
          }
          await a.wait(1.4);
        },
      });
      // ───────── 눈 덮인 바위와 절벽 발치의 무너진 돌 ─────────
      for (let i = 0; i < 200; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), g = MH.g(w, x, z);
        if (g < 0 || onTrail(x, z) || (pine && Math.hypot(x - pine[0], z - pine[2]) < 16) || (x > 80 && x < 240 && z < 136) || (x > 126 && x < 200 && z > 150 && z < 210) || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
        const sl = w.slope[x + W * z], dxx = dxOf(x, z);
        if (dxx < 36 && sl < 2 && hash3(x, 5, z) > 0.4) continue;
        boulder(x, g + (sl > 2 ? 0 : -1), z, sl > 3 ? w.r(1.2, 2.6) : w.r(1.6, 4.2));
      }
      for (let i = 0; i < 500; i++) {
        const x = w.ri(2, W - 3), z = w.ri(2, D - 3), g = MH.g(w, x, z);
        if (g < 0 || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0 || (pine && Math.hypot(x - pine[0], z - pine[2]) < 13)) continue;
        const b = w.get(x, g, z);
        if ((b === B.snow || b === B.snow2) && w.chance(0.5)) { w.set(x, g + 1, z, B.snow3); if (w.chance(0.4) && !w.get(x + 1, g + 1, z)) w.set(x + 1, g + 1, z, B.snow3); }
      }
      return { lights, landmarks, acts };
    },
  });
})();
