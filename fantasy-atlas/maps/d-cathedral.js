// 피의 성당 — 절벽 고원 위의 고딕 대성당과 핏빛 폭포, 서쪽 고원의 참회의 수도원 회랑 (320칸, 2배 해상도: 1칸 ≈ 25cm)
// 세 겹 뾰족 아치 정문과 판자·쇠띠·징 박힌 문짝, 바퀴살·꽃잎 고리가 있는 장미창, 납틀 뾰족 창, 종루 아치와 입술이 벌어진 대종,
// 두 단 쇠시리 테의 피의 샘과 날개 편 가고일 상, 엇갈려 깐 판석 광장, 등롱 창살이 있는 쇠 등, 촛대 난간 계단.
// 지형: 들쭉날쭉한 고원 가장자리와 선반 진 벼랑·지층 띠, 층층이 떨어지는 핏물 도랑, 자갈 기슭에서 점점 깊어지는 협곡. playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  // 1배 좌표로 쓴 설계를 2배 칸(1칸 ≈ 25cm)에 그린다. 정수 좌표 c는 실제 칸 2c..2c+1, 0.5 좌표(c = n + 0.5)는 실제 칸 2n+1 하나.
  // 그래서 세부(가는 창살·줄눈·널판 틈 등)는 0.5 단위 좌표로 바로 그릴 수 있다. 원·고리·구는 실제 해상도로 매끄럽게 그린다.
  const HD = (function () {
    const rng = c => { const q = c * 2; if (Number.isInteger(q) && (q & 1)) return [q, q]; const f = Math.floor(c) * 2; return [f, f + 1]; };
    const ctr = c => { const r = rng(c); return (r[0] + r[1] + 1) / 2; };
    const sc = v => v && v.map((c, i) => (i < 3 ? c * 2 : c));
    function face(T, root) {
      const S = {
        W: T.W >> 1, D: T.D >> 1, H: T.H >> 1, id: T.id, blocks: T.blocks, base: T.base / 2, R: T, hm: null, slope: null,
        liq: root ? new Int16Array((T.W >> 1) * (T.D >> 1)).fill(-1) : null,
        rand: () => T.rand(), noise: T.noise,
        r: (a, b) => T.r(a, b), ri: (a, b) => T.ri(a, b), pick: a => T.pick(a), chance: p => T.chance(p),
        get: (x, y, z) => T.get(rng(x)[0], rng(y)[0], rng(z)[0]),
        set(x, y, z, b) {
          const X = rng(x), Y = rng(y), Z = rng(z);
          for (let yy = Y[0]; yy <= Y[1]; yy++) for (let zz = Z[0]; zz <= Z[1]; zz++) for (let xx = X[0]; xx <= X[1]; xx++) T.set(xx, yy, zz, b);
        },
        fill(x, y, z, b) { if (!S.get(x, y, z)) S.set(x, y, z, b); },
        box(x0, y0, z0, x1, y1, z1, b) {
          const X0 = rng(Math.min(x0, x1))[0], X1 = rng(Math.max(x0, x1))[1], Y0 = rng(Math.min(y0, y1))[0], Y1 = rng(Math.max(y0, y1))[1], Z0 = rng(Math.min(z0, z1))[0], Z1 = rng(Math.max(z0, z1))[1];
          for (let y = Y0; y <= Y1; y++) for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) T.set(x, y, z, b);
        },
        walls(x0, y0, z0, x1, y1, z1, b) {
          const a = rng(x0), c = rng(x1), d = rng(z0), e = rng(z1), Y0 = rng(y0)[0], Y1 = rng(y1)[1];
          for (let y = Y0; y <= Y1; y++) for (let z = d[0]; z <= e[1]; z++) for (let x = a[0]; x <= c[1]; x++)
            if (x <= a[1] || x >= c[0] || z <= d[1] || z >= e[0]) T.set(x, y, z, b);
        },
        cyl(cx, cz, y0, y1, r, b) {
          if (r < 1.5) { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let z = -R; z <= R; z++) for (let x = -R; x <= R; x++) if (x * x + z * z <= r * r) S.set(cx + x, y, cz + z, b); return; }
          const X = ctr(cx), Z = ctr(cz), RR = 2 * r + 0.5, K = Math.ceil(RR), Y0 = rng(y0)[0], Y1 = rng(y1)[1];
          for (let z = Math.floor(Z - K); z <= Z + K; z++) for (let x = Math.floor(X - K); x <= X + K; x++) {
            const dx = x + 0.5 - X, dz = z + 0.5 - Z; if (dx * dx + dz * dz > RR * RR) continue;
            for (let y = Y0; y <= Y1; y++) T.set(x, y, z, b);
          }
        },
        ring(cx, cz, y, r0, r1, b) {
          if (r1 < 1.5) { const R = Math.ceil(r1); for (let z = -R; z <= R; z++) for (let x = -R; x <= R; x++) { const d = x * x + z * z; if (d <= r1 * r1 && d > r0 * r0) S.set(cx + x, y, cz + z, b); } return; }
          const X = ctr(cx), Z = ctr(cz), A = r0 > 0 ? 2 * r0 + 0.5 : 0, Bb = 2 * r1 + 0.5, K = Math.ceil(Bb), Y = rng(y);
          for (let z = Math.floor(Z - K); z <= Z + K; z++) for (let x = Math.floor(X - K); x <= X + K; x++) {
            const dx = x + 0.5 - X, dz = z + 0.5 - Z, d = dx * dx + dz * dz; if (d > Bb * Bb || d <= A * A) continue;
            for (let yy = Y[0]; yy <= Y[1]; yy++) T.set(x, yy, z, b);
          }
        },
        sphere(cx, cy, cz, r, b, keep) { S.ellipsoid(cx, cy, cz, r, r, r, b, keep && ((x, y, z) => keep(x, y, z))); },
        ellipsoid(cx, cy, cz, rx, ry, rz, b, keep) {
          if (Math.min(rx, ry, rz) < 1.5) {
            const X = Math.ceil(rx), Y = Math.ceil(ry), Z = Math.ceil(rz);
            for (let y = -Y; y <= Y; y++) for (let z = -Z; z <= Z; z++) for (let x = -X; x <= X; x++) { const d = x * x / (rx * rx) + y * y / (ry * ry) + z * z / (rz * rz); if (d > 1 || (keep && !keep(x, y, z, d))) continue; S.set(cx + x, cy + y, cz + z, b); }
            return;
          }
          const X = ctr(cx), Y = ctr(cy), Z = ctr(cz), ax = 2 * rx + 0.5, ay = 2 * ry + 0.5, az = 2 * rz + 0.5;
          for (let y = Math.floor(Y - ay); y <= Y + ay; y++) for (let z = Math.floor(Z - az); z <= Z + az; z++) for (let x = Math.floor(X - ax); x <= X + ax; x++) {
            const dx = x + 0.5 - X, dy = y + 0.5 - Y, dz = z + 0.5 - Z, d = dx * dx / (ax * ax) + dy * dy / (ay * ay) + dz * dz / (az * az);
            if (d > 1 || (keep && !keep(dx / 2, dy / 2, dz / 2, d))) continue;
            T.set(x, y, z, b);
          }
        },
        line(x0, y0, z0, x1, y1, z1, b, th) {
          if (th) { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)) * 1.5) + 1; for (let i = 0; i <= n; i++) { const t = i / n; S.sphere(Math.round(x0 + (x1 - x0) * t), Math.round(y0 + (y1 - y0) * t), Math.round(z0 + (z1 - z0) * t), typeof th === 'function' ? th(t) : th, b); } return; }
          const a = [ctr(x0) - 0.5, ctr(y0) - 0.5, ctr(z0) - 0.5], c = [ctr(x1) - 0.5, ctr(y1) - 0.5, ctr(z1) - 0.5];
          const n = Math.ceil(Math.max(Math.abs(c[0] - a[0]), Math.abs(c[1] - a[1]), Math.abs(c[2] - a[2])) * 1.5) + 1;
          for (let i = 0; i <= n; i++) { const t = i / n; T.set(Math.round(a[0] + (c[0] - a[0]) * t), Math.round(a[1] + (c[1] - a[1]) * t), Math.round(a[2] + (c[2] - a[2]) * t), b); }
        },
        top(x, z) { const y = T.top(rng(x)[0], rng(z)[0]); return y < 0 ? -1 : y >> 1; },
        liquid(x, z, y) {
          const X = rng(x), Z = rng(z), Y = rng(y)[1];
          for (let zz = Z[0]; zz <= Z[1]; zz++) for (let xx = X[0]; xx <= X[1]; xx++) T.liquid(xx, zz, Y);
          if (S.liq && x >= 0 && z >= 0 && x < S.W && z < S.D) S.liq[Math.floor(x) + S.W * Math.floor(z)] = y;
        },
        prop(o) {
          const q = Object.assign({}, o);
          if (q.pivot) q.pivot = sc(q.pivot); if (q.off0) q.off0 = sc(q.off0); if (q.bob) q.bob *= 2;
          return face(T.prop(q), false);
        },
      };
      return S;
    }
    // 1배 높이지도를 실제 칸 높이지도로(2h+1)
    function syncHM(S) {
      const T = S.R, W = T.W, D = T.D;
      if (!T.hm || T.hm.length !== W * D) T.hm = new Int16Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const h = S.hm[(x >> 1) + S.W * (z >> 1)]; T.hm[x + W * z] = h * 2 + 1; }
    }
    const hit2 = h => [rng(Math.min(h[0], h[3]))[0], rng(Math.min(h[1], h[4]))[0], rng(Math.min(h[2], h[5]))[0], rng(Math.max(h[0], h[3]))[1], rng(Math.max(h[1], h[4]))[1], rng(Math.max(h[2], h[5]))[1]];
    const burst2 = o => o && Object.assign({}, o, { speed: (o.speed || 4) * 2, up: (o.up != null ? o.up : 3) * 2, gravity: (o.gravity != null ? o.gravity : 3) * 2, spread: (o.spread || 1) * 2, h: o.h ? o.h * 2 : o.h });
    function actor(a) {
      const over = {
        move: (n, off, d, e) => a.move(n, sc(off), d, e),
        tween: (n, to, d, e) => a.tween(n, to && to.off ? Object.assign({}, to, { off: sc(to.off) }) : to, d, e),
        burst: (p, o) => a.burst(sc(p), burst2(o)),
        drive: (n, pts, d, o) => a.drive(n, pts.map(sc), d, o),
        path: (n, pts, d) => a.path(n, pts.map(sc), d),
      };
      return new Proxy(a, { get(t, k) { if (over[k]) return over[k]; const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; } });
    }
    // 설계(1배)로 만든 조명·랜드마크·상호작용을 실제 칸 좌표로
    function out(res) {
      return {
        lights: res.lights.map(l => Object.assign({}, l, { p: sc(l.p), d: l.d ? l.d * 2 : l.d, srcR: (l.srcR || 4) * 2 })),
        landmarks: res.landmarks.map(m => Object.assign({}, m, { p: sc(m.p) })),
        acts: res.acts.map(q => Object.assign({}, q, { hit: hit2(q.hit), run: q.run && (a => q.run(actor(a))) })),
      };
    }
    return { face, syncHM, out, rng, sc };
  })();
  const W = 160, D = 160, Hh = 128;            // 설계(1배) 크기 — 실제 칸은 두 배
  MAPS.push({
    id: 'cathedral', cat: 'dungeon', name: '피의 성당', en: 'Cathedral of Blood', color: '#c0444a', seed: 37, base: 48, time: 'night', size: [W * 2, D * 2, Hh * 2],
    playerScale: 2,
    desc: '신 대신 피를 섬기게 된 성당. 기도 소리는 비명으로 바뀌었다. 성당 서쪽 고원에는 수도사들이 참회하던 회랑이 남아, 안뜰 우물에서는 지금도 물 대신 피가 길어 올려진다.',
    info: { title: '장소 정보', en: 'CATHEDRAL OF BLOOD', rows: [['자리', '절벽 고원 · 동쪽은 핏빛 협곡'], ['정면', '쌍탑과 장미창 · 피의 샘 광장'], ['서쪽 고원', '참회의 수도원 회랑 · 피 우물']] },
    monsters: { normal: ['광신도', '가고일', '흡혈 사제', '참회하는 망령'], mid: '심문관', boss: '타락한 대주교' },
    sky: ['#1c080c', '#3a0e18', '#8a2230'], stars: false,
    hemi: ['#d8a8b0', '#2a1216', 0.64], sun: ['#ffd0c8', 0.74, [0.5, 1, 0.55]],
    day: { sky: ['#e8c0b0', '#9a5a5a', '#ffd8c0'], stars: false, hemi: ['#f8e0d8', '#4a3030', 0.6], sun: ['#ffe0d0', 0.72, [0.5, 1, 0.55]], haze: '#c89088' },
    liquid: ['#3a0810', '#7c1420', '#ff6072'], liqSpeed: 0.5,
    fog: { start: 0.72, floor: 32, depth: 20, haze: [52, 0.32, 16], hazeColor: '#4a1a24' },
    camY: 12, zoom: 1.15,
    particles: [
      { n: 400, colors: ['#ff5a6a', '#c02a3a', '#ff9aa0'], mode: 'drift', speed: 0.7, y0: 72, y1: 192 },
      { n: 80, colors: ['#ffb04a', '#ff7a2a'], mode: 'rise', speed: 2.4, area: [96, 200, 5], y0: 80, y1: 128 },
    ],
    blocks: {
      cliff: { c: '#4a3f45', v: 0.06, pat: 'big' }, rock: { c: '#3d3439', v: 0.06, pat: 'stone' }, rockDk: { c: '#2a2226', v: 0.06, pat: 'stone' },
      cliff2: { c: '#54474c', v: 0.06, pat: 'big' }, rockR: { c: '#4a3236', v: 0.06, pat: 'stone' },
      ground: { c: '#3d3439', top: '#4d4247', v: 0.1 }, bmoss: { c: '#3d3439', top: '#5a2a30', v: 0.1 }, soil: { c: '#2e2226', v: 0.08 },
      gravel: { c: '#3a3236', top: '#5a5054', v: 0.14 }, silt: { c: '#2e2226', top: '#4a2a2e', v: 0.1 }, bone2: { c: '#b8ae9a', v: 0.06 },
      cobble: { c: '#4a3f45', top: '#5a4e52', v: 0.1, pat: 'stone' }, flag: { c: '#5a4e52', top: '#6a5e60', v: 0.05, pat: 'check', alt: '#4e4448' },
      pave1: { c: '#5a4e52', top: '#6a5e60', v: 0.04 }, pave2: { c: '#54484c', top: '#625658', v: 0.04 }, pave3: { c: '#5e5254', top: '#706466', v: 0.04 }, paveJ: { c: '#3a3034', top: '#40363a', v: 0.03 },
      wall: { c: '#7e7274', v: 0.05, pat: 'brick' }, wallDk: { c: '#5e5256', v: 0.05, pat: 'brick' }, trim: { c: '#9e928c', v: 0.04 }, trimDk: { c: '#867a76', v: 0.04 },
      roof: { c: '#2a1f27', v: 0.04, pat: 'tile' }, roofR: { c: '#5a1c24', v: 0.05 }, gold: { c: '#c9a24a', v: 0.06 },
      dark: { c: '#120c0f', v: 0 }, iron: { c: '#241d22', v: 0.03 }, wood: { c: '#3d2a22', v: 0.06, pat: 'log' }, plank: { c: '#4d3528', v: 0.08, pat: 'plank' },
      garg: { c: '#5e585c', v: 0.06 }, gargDk: { c: '#48424a', v: 0.05 }, bark: { c: '#2a2024', v: 0.05 }, barkDk: { c: '#1e171a', v: 0.04 }, bell: { c: '#8a6a3a', v: 0.06 }, bellDk: { c: '#6a5030', v: 0.05 }, bone: { c: '#d0c8b4', v: 0.05 }, rope: { c: '#6a5a4a', v: 0.04 },
      glassR: { c: '#ff3e52', glow: true }, glassP: { c: '#b848d8', glow: true }, glassG: { c: '#ffb85a', glow: true },
      candle: { c: '#ffe2a0', glow: true }, bolt: { c: '#fff0f0', glow: true }, door: { c: '#4a2420', v: 0.06, pat: 'plank' }, doorDk: { c: '#381a18', v: 0.04 }, fire: { c: '#ff8a3a', glow: true }, fire2: { c: '#ffd060', glow: true }, reye: { c: '#ff3040', glow: true },
      cloF: { c: '#5a4e52', top: '#6e6264', v: 0.05, pat: 'check', alt: '#5e5458' }, roseF: { c: '#a01828', v: 0.08 }, leafD: { c: '#2a3a26', v: 0.08 }, grass: { c: '#3d3439', top: '#4a3a34', v: 0.1 },
      lamp: { c: '#ffb070', night: true, day: '#5a4a40' }, blood: { c: '#c01a2a', glow: true },
    },
    build(R) {
      const w = HD.face(R, true);   // 건물 설계는 1배 좌표, 그리기는 2배 칸. 지형·샘·문·장미창·종·계단·나무는 실제 칸에 바로 그린다
      const B = w.id, n = w.noise, base = w.base, M = 72, CZ = 66;
      const RW = R.W, RD = R.D, RB = R.base;
      const P = base + 12, Y = P + 1;               // 설계 고원 높이 36 → 실제 윗면 73, 실제 바닥 74
      const PT = 2 * P + 1, YR = 2 * Y;
      const lights = [], acts = [], landmarks = [];
      const dl = (p) => p.map((v, i) => i < 3 ? v / 2 : v);   // 실제 좌표 → 설계 좌표(조명·입자는 설계 좌표로 넘긴다)

      // ═════════ 지형(실제 칸): 휜 고원 가장자리, 선반이 있는 벼랑과 지층, 점점 깊어지는 협곡 핏물 ═════════
      const gorge = [[256, -10], [244, 136], [268, 330]];
      const RA = [72, 48, 217, 217], RQ = [8, 120, 75, 217];   // 본 고원·서쪽 고원(실제 칸)
      const rdist = (X, Z, r) => Math.hypot(Math.max(r[0] - X, 0, X - r[2]), Math.max(r[1] - Z, 0, Z - r[3]));
      const inR = (X, Z, r) => X >= r[0] && X <= r[2] && Z >= r[1] && Z <= r[3];
      const WL = 43;                                 // 협곡 핏물 수면
      const GD = new Float32Array(RW * RD), WOB = new Float32Array(RW * RD), REG = new Uint8Array(RW * RD), PD = new Float32Array(RW * RD);
      const strata = (X, Z, y) => {
        const k = Math.floor((y + WOB[X + RW * Z] + (X - Z) * 0.12) / 4);   // 비스듬히 기운 지층
        return [B.cliff, B.rock, B.cliff2, B.rockDk, B.cliff, B.rockR][((k % 6) + 6) % 6];
      };
      MH.terrain(R, {
        floor: 4,
        height: (X, Z) => {
          const x = X / 2, z = Z / 2, i = X + RW * Z;
          WOB[i] = n.fbm(X * 0.035 + 4, Z * 0.035, 2) * 9;
          const qx = Math.abs(x - M) / 40, qz = Math.abs(z - CZ) / 45;
          const e = Math.pow(Math.pow(qx, 4) + Math.pow(qz, 4), 0.25) + (n.fbm(x * 0.08, z * 0.08, 3) - 0.5) * 0.1;
          let h = 2 * (base + MH.sstep(1.04, 0.94, e) * 12 + n.fbm(x * 0.05, z * 0.05) * 2) + 1 + (n.fbm(X * 0.09 + 7, Z * 0.09, 2) - 0.5) * 3;
          const inA = inR(X, Z, RA), inQ = inR(X, Z, RQ);
          REG[i] = inA ? 1 : inQ ? 2 : 0;
          let pd = Math.min(rdist(X, Z, RA), rdist(X, Z, RQ));
          pd = Math.max(0, pd - n.fbm(X * 0.025 + 11, Z * 0.025, 3) * 16 - n.fbm(X * 0.09, Z * 0.09 + 3, 2) * 4);   // 가장자리를 바깥으로 들쭉날쭉 밀어낸다
          PD[i] = pd;
          if (inA || inQ) h = PT;
          else {
            // 위는 깎아지른 벼랑(군데군데 선반), 아래는 무너진 돌이 쌓인 완만한 자락
            const cw = 6 + n.fbm(X * 0.03 + 5, Z * 0.03 + 1, 2) * 9, pn = pd + (n.fbm(X * 0.045, Z * 0.045 + 7, 2) - 0.5) * 8;
            const ph = n.fbm(X * 0.05 + 3, Z * 0.05, 2) * 12;
            let drop = pn < cw ? pn * 3.6 - 2 * Math.sin(pn * 0.7 + ph) : cw * 3.6 + (pn - cw) * 0.7;
            drop += (n.fbm(X * 0.16, Z * 0.16 + 5, 2) - 0.5) * 5;
            const sk = PT - Math.max(0, drop);
            h = Math.max(h, pd < 0.5 ? PT : sk);
          }
          // 협곡: 가운데는 점점 깊어지는 물길, 가장자리는 자갈 기슭, 그 바깥은 선반 진 벽
          const rd = MH.polyDist(X, Z, gorge), wc = 7 + (n.fbm(X * 0.05 + 2, Z * 0.05 + 9, 2) - 0.5) * 5;
          GD[i] = rd - wc;
          if (rd < wc + 40) {
            let gh;
            if (rd < wc) gh = WL - 1 - Math.round(Math.pow(1 - rd / wc, 0.8) * 6 + (n.fbm(X * 0.2, Z * 0.2, 2) - 0.5) * 1.5);
            else if (rd < wc + 5) gh = WL + (rd - wc) * 0.55;
            else { const t = (rd - wc - 5) * (2.4 + n.fbm(X * 0.04 + 1, Z * 0.04, 2) * 2.4); gh = WL + 2.75 + t - 2 * Math.sin(t * 0.35 + n.fbm(X * 0.03, Z * 0.03, 2) * 6) + (n.fbm(X * 0.14 + 9, Z * 0.14, 2) - 0.5) * 6; }
            if (!(inA || inQ)) h = Math.min(h, gh);
          }
          return h;
        },
        surface: (X, Z, y, s) => {
          const i = X + RW * Z;
          if (REG[i] === 1) return B.flag;
          if (REG[i] === 2) return B.grass;
          if (y < WL) return n.fbm(X * 0.09 + 3, Z * 0.09, 2) > 0.55 ? B.gravel : B.silt;
          if (s >= 3) return strata(X, Z, y);
          if (GD[i] < 5 && y < WL + 4) return B.gravel;
          if (PD[i] > 2 && PD[i] < 26 && s >= 2) return B.rock;
          const f = n.fbm(X * 0.055 + 9, Z * 0.055, 2);
          return f > 0.6 ? B.bmoss : B.ground;
        },
        under: (X, Z, y, dep, s) => (dep < 2 && s < 3) ? B.soil : strata(X, Z, y),
      });
      // 협곡 핏물: 바닥이 수면보다 낮은 칸
      for (let Z = 0; Z < RD; Z++) for (let X = 0; X < RW; X++) if (GD[X + RW * Z] < 6 && R.hm[X + RW * Z] < WL) R.liquid(X, Z, WL);

      // 광장 샘에서 넘친 핏물: 고원 위 돌 도랑 → 벼랑을 타고 층층이 떨어지는 물웅덩이 → 협곡
      const chan = [[158, 204], [218, 204], [234, 207], [252, 213]];
      {
        let hc = PT;
        const cols = new Map();
        for (let s = 0; s < chan.length - 1; s++) {
          const [ax, az] = chan[s], [bx, bz] = chan[s + 1], L = Math.hypot(bx - ax, bz - az), st = Math.ceil(L * 2);
          for (let k = 0; k <= st; k++) {
            const cx = ax + (bx - ax) * k / st, cz = az + (bz - az) * k / st;
            const gh = R.hm[Math.round(cx) + RW * Math.round(cz)];
            hc = Math.min(hc, gh);
            const half = cx < 218 ? 2 : 2.6;
            for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
              const X = Math.round(cx + dx), Z = Math.round(cz + dz);
              if (Math.hypot(X + 0.5 - cx, Z + 0.5 - cz) > half) continue;
              const key = X + RW * Z, lv = Math.max(WL, hc - 2);
              if (!cols.has(key) || cols.get(key) > lv) cols.set(key, lv);
            }
          }
        }
        for (const [key, lv] of cols) {
          const X = key % RW, Z = (key / RW) | 0;
          const cur = R.hm[key];
          const bed = Math.min(cur - 1, lv - 2);
          MH.setH(R, X, Z, bed, B.rockR, B.rock);
          if (X < 218) for (let y = bed + 1; y <= PT; y++) R.set(X, y, Z, 0);
          R.liquid(X, Z, lv);
        }
        // 고원 위 도랑의 갓돌
        for (let X = 160; X <= 215; X++) for (const Z of [201, 206]) if (!cols.has(X + RW * Z) && R.hm[X + RW * Z] === PT) { R.set(X, PT, Z, B.trimDk); if (X % 6 === 0) R.set(X, PT + 1, Z, B.trimDk); }
      }

      // ── 순례자의 대계단(실제 칸): 한 줄에 한 칸 이하로 오르는 넓은 계단, 양옆 축대·난간·촛대 ──
      const stairC = [];
      const SZ0 = 218, footZ = 246, footH = R.hm[144 + RW * 252];
      MH.flight(R, { name: '순례자 계단', axis: 'z', c: 144, half: 10, a: SZ0, b: footZ, ha: PT - 1, hb: footH, step: B.cobble, edge: B.trim, fill: B.rock, rail: B.iron, post: B.wallDk, postGap: 6, clear: 16,
        onPost: (x, y, z, k) => {
          R.box(x, y, z, x, y + 3, z, B.wallDk); R.set(x, y + 4, z, B.iron); R.set(x, y + 5, z, B.candle);
          stairC.push([x / 2, (y + 5) / 2, z / 2]);
          if (k % 24 === 0 && x < 144) lights.push({ p: [M + 0.5, (y + 5) / 2, z / 2 + 0.5], c: '#ffd0a0', i: 0.8, d: 14, flicker: 0.3, srcR: 7 });
        } });
      // 계단 아래 참배로: 들쭉날쭉한 가장자리, 가운데 닳은 자국
      {
        const pts = [[144.5, footZ], [143, 280], [146, 319]];
        for (let Z = footZ - 2; Z < RD; Z++) for (let X = 120; X < 170; X++) {
          const d = MH.polyDist(X + 0.5, Z + 0.5, pts), nb = n.fbm(X * 0.15 + 13, Z * 0.15 + 29, 2), wd = 5.2 + (nb - 0.5) * 3;
          if (d > wd + 3) continue;
          const g = R.hm[X + RW * Z];
          if (d <= wd) R.set(X, g, Z, d < 2.2 && n.fbm(X * 0.2 + 3, Z * 0.2, 2) > 0.52 ? B.ground : (hash3(X >> 1, 5, Z >> 1) > 0.25 ? B.cobble : B.gravel));
          else if (nb > 0.45 && hash3(X >> 1, 9, Z >> 1) > 0.4) R.set(X, g, Z, B.gravel);
        }
        for (let Z = footZ + 8; Z <= 312; Z += 10) for (const X of [134, 155]) {
          const g = R.hm[X + RW * Z];
          R.box(X - 1, g + 1, Z - 1, X + 1, g + 1, Z + 1, B.wallDk); R.box(X, g + 2, Z, X, g + 7, Z, B.iron);
          R.box(X - 1, g + 8, Z, X + 1, g + 8, Z, B.iron); R.set(X - 1, g + 9, Z, B.candle); R.set(X + 1, g + 9, Z, B.candle); R.set(X, g + 9, Z, B.iron); R.set(X, g + 10, Z, B.candle);
        }
      }

      // 설계 높이지도: 실제 높이에서 내려 받는다
      w.hm = new Int16Array(W * D); w.slope = new Float32Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) w.hm[x + W * z] = R.hm[2 * x + RW * 2 * z] >> 1;

      // ═════════ 대성당(설계 좌표) ═════════
      w.box(59, Y, 40, 85, Y + 13, 88, B.wall);          // 측랑
      w.box(65, Y, 40, 79, Y + 27, 88, B.wall);          // 신랑
      w.box(46, Y, 52, 98, Y + 27, 64, B.wall);          // 익랑
      for (let dz = -12; dz <= 0; dz++) for (let dx = -12; dx <= 12; dx++) if (dx * dx + dz * dz <= 144) w.box(M + dx, Y, 40 + dz, M + dx, Y + 27, 40 + dz, B.wall);
      w.walls(58, Y, 39, 86, Y + 1, 89, B.wallDk); w.walls(45, Y, 51, 99, Y + 1, 65, B.wallDk);
      for (const y of [Y + 13, Y + 27]) { w.walls(59, y, 40, 85, y, 88, B.trim); w.walls(46, y, 52, 98, y, 64, B.trim); }
      w.walls(46, Y + 7, 52, 98, Y + 7, 64, B.trim);
      for (let x = 57; x <= 64; x++) for (let z = 39; z <= 89; z++) { w.set(x, Y + 14 + (x - 57), z, x === 57 ? B.roofR : B.roof); w.set(144 - x, Y + 14 + (x - 57), z, x === 57 ? B.roofR : B.roof); }
      MH.roof(w, 64, 80, 39, 89, Y + 28, { b: B.roof, eave: B.roofR, ridge: B.roofR, pitch: 2, gable: B.wall, axis: 'z' });
      MH.roof(w, 45, 99, 51, 65, Y + 28, { b: B.roof, eave: B.roofR, ridge: B.roofR, pitch: 2, gable: B.wall, axis: 'x' });
      MH.cone(w, M, 38, Y + 28, 13.5, B.roof, 0.42, B.roofR);
      for (let z = 40; z <= 88; z += 2) { const t = w.top(M, z); if (t > Y + 30 && !(z > 52 && z < 64)) { w.set(M, t + 1, z, B.iron); if (z % 4 === 0) w.set(M, t + 2, z, B.iron); } }
      for (let x = 46; x <= 98; x += 2) { const t = w.top(x, 58); if (t > Y + 30 && (x < 65 || x > 79)) w.set(x, t + 1, 58, B.iron); }
      // 교차부 첨탑
      w.box(69, Y + 40, 55, 75, Y + 48, 61, B.wallDk);
      for (const [x, z] of [[69, 58], [75, 58], [72, 55], [72, 61]]) w.box(x, Y + 42, z, x, Y + 46, z, B.glassR);
      w.walls(68, Y + 40, 54, 76, Y + 40, 62, B.trim); w.walls(68, Y + 48, 54, 76, Y + 48, 62, B.trim);
      for (const [x, z] of [[68, 54], [76, 54], [68, 62], [76, 62]]) { w.box(x, Y + 49, z, x, Y + 51, z, B.wallDk); w.set(x, Y + 52, z, B.gold); }
      const fl = MH.pyramid(w, 69, 55, 75, 61, Y + 49, B.roofR, 4);
      w.box(M, fl, 58, M, fl + 4, 58, B.gold); w.box(M - 1, fl + 2, 58, M + 1, fl + 2, 58, B.gold);
      // 버팀벽, 작은 첨탑(금 꼭지), 공중 버팀벽, 물받이 가고일
      for (const z of [42, 47, 68, 73, 78, 83]) for (const [px, dir] of [[55, -1], [89, 1]]) {
        w.box(px, Y, z, px + dir, Y + 20, z + 1, B.wallDk); w.box(px + dir * 2, Y, z, px + dir * 2, Y + 10, z + 1, B.wallDk);
        w.box(px + dir * 2, Y + 11, z, px + dir * 2, Y + 11, z + 1, B.trim); w.box(px - dir, Y + 6, z, px - dir, Y + 6, z + 1, B.trim);
        MH.cone(w, px, z, Y + 21, 1.4, B.roofR, 0.45);
        w.set(px, w.top(px, z) + 1, z, B.gold);
        const cx = dir < 0 ? 65 : 79;
        w.line(px, Y + 20, z, cx, Y + 25, z, B.wallDk, 0.6); w.line(px, Y + 20, z + 1, cx, Y + 25, z + 1, B.wallDk, 0.6);
        w.set(px + dir * 3, Y + 9, z, B.garg); w.set(px + dir * 4, Y + 9, z, B.garg); w.set(px + dir * 4, Y + 10, z, B.reye);
      }
      // 측랑 창: 실제 칸으로 — 뾰족 머리, 가운데 문설주, 납틀 가로대, 창턱
      const lancet = (X, Z0, plane, y0, h, wdt, g1, g2) => {   // plane 'x': 벽이 x=X 면, 창이 z 방향으로 폭
        const half = wdt / 2, cz = Z0 + half;
        for (let y = y0 - 1; y <= y0 + h + Math.ceil(half) + 1; y++) for (let u = -1; u <= wdt; u++) {
          const du = Math.abs(u + 0.5 - half), head = y0 + h + Math.sqrt(Math.max(0, half * half - du * du)) * 1.3;
          const set = (b) => plane === 'x' ? R.set(X, y, Z0 + u, b) : R.set(Z0 + u, y, X, b);
          if (u < 0 || u >= wdt || y < y0 || y > head) { if ((y <= head + 1 && y >= y0 - 1) && (u === -1 || u === wdt || y === y0 - 1 || y > head)) set(B.trim); continue; }
          const mull = wdt >= 4 && Math.abs(u + 0.5 - half) < 0.6, bar = (y - y0) % 4 === 3;
          set(mull ? B.trimDk : bar ? B.iron : ((u + ((y - y0) >> 2)) & 1 ? g1 : g2));
        }
      };
      for (const z of [44, 70, 75, 80]) for (const X of [118, 171]) lancet(X, 2 * z, 'x', YR + 6, 13, 4, B.glassR, B.glassP);
      for (let z = 42; z <= 86; z += 4) { if (z > 50 && z < 66) continue; for (const X of [130, 159]) lancet(X, 2 * z, 'x', YR + 34, 13, 4, B.glassR, B.glassR); }
      for (const [X, Zs] of [[92, [107, 123]], [197, [107, 123]]]) for (const Z of Zs) lancet(X, Z, 'x', YR + 6, 11, 3, B.glassP, B.glassP);
      for (let a = 0.25; a < Math.PI - 0.15; a += 0.36) { const x = Math.round(M + Math.cos(a) * 12), z = Math.round(40 - Math.sin(a) * 12); w.box(x, Y + 5, z, x, Y + 20, z, B.glassP); w.set(x, Y + 13, z, B.iron); }

      // ── 장미창(실제 칸): 테두리·바퀴살·꽃잎 고리·가운데 꽃심 ──
      const rose = (cx, cy, cz, r, plane) => {
        const K = Math.ceil(r) + 1;
        for (let v = -K; v <= K; v++) for (let u = -K; u <= K; u++) {
          const du = u + 0.5, dv = v + 0.5, d = Math.hypot(du, dv);
          if (d > r + 0.6) continue;
          const ang = Math.atan2(dv, du), sec = Math.floor((ang + Math.PI) / (Math.PI / 6));
          let b;
          if (d > r - 1.4) b = B.trim;
          else if (d < 2.2) b = B.glassG;
          else if (d < 3.2) b = B.trimDk;
          else {
            const spoke = Math.abs(Math.sin(ang * 6)) * d < 0.75;
            const fa = (sec + 0.5) * Math.PI / 6 - Math.PI, fx = Math.cos(fa) * r * 0.74, fz = Math.sin(fa) * r * 0.74, fd = Math.hypot(du - fx, dv - fz);
            const foilR = r * 0.2;
            if (spoke && d < r * 0.56) b = B.iron;
            else if (Math.abs(d - r * 0.56) < 0.6) b = B.trimDk;
            else if (d > r * 0.56 && Math.abs(fd - foilR) < 0.55) b = B.trimDk;
            else if (d > r * 0.56 && fd < foilR) b = fd < foilR * 0.4 ? B.glassG : B.glassR;
            else if (d > r * 0.56) b = spoke ? B.iron : B.glassP;
            else b = sec & 1 ? B.glassP : B.glassR;
          }
          if (plane === 'z') R.set(cx + u, cy + v, cz, b), R.set(cx + u, cy + v, cz - 1, b === B.glassR || b === B.glassP || b === B.glassG ? B.dark : b);
          else R.set(cx, cy + v, cz + u, b), R.set(cx + (cx < 145 ? 1 : -1), cy + v, cz + u, b === B.glassR || b === B.glassP || b === B.glassG ? B.dark : b);
        }
      };
      rose(92, 2 * (Y + 18) + 1, 116, 10, 'x'); rose(197, 2 * (Y + 18) + 1, 116, 10, 'x');

      // ── 정면 쌍탑 ──
      const tops = [];
      for (const tx of [52, 83]) {
        w.box(tx, Y, 80, tx + 9, Y + 44, 89, B.wall);
        for (const [cx, cz] of [[tx - 1, 90], [tx + 10, 90], [tx - 1, 79], [tx + 10, 79]]) { w.box(cx, Y, cz, cx, Y + 32, cz, B.wallDk); for (let y = Y + 8; y <= Y + 32; y += 8) w.set(cx, y, cz, B.trim); }
        for (const y of [Y + 13, Y + 27, Y + 33]) w.walls(tx - 1, y, 79, tx + 10, y, 90, B.trim);
        lancet(179, 2 * tx + 6, 'z', YR + 30, 14, 8, B.glassP, B.glassP);
        w.box(tx + 2, Y + 8, 90, tx + 7, Y + 8, 90, B.trim);
        for (const X of [2 * tx, 2 * tx + 19]) for (const z of [83, 86]) lancet(X, 2 * z, 'x', YR + 32, 12, 2, B.glassR, B.glassR);
        // 종루: 속을 비우고 네 기둥만 남긴다
        w.box(tx + 1, Y + 35, 80, tx + 8, Y + 42, 89, 0); w.box(tx, Y + 35, 81, tx + 9, Y + 42, 88, 0);
        w.box(tx + 1, Y + 34, 81, tx + 8, Y + 34, 88, B.wallDk);
        for (const x of [tx, tx + 9]) for (const z of [80, 89]) w.box(x, Y + 35, z, x, Y + 42, z, B.wall);
        // 종루 기둥 사이 뾰족 아치(실제 칸)
        for (const [face, fixed] of [['x', 160], ['x', 179], ['z', 2 * tx], ['z', 2 * tx + 19]]) for (let u = 0; u < 16; u++) {
          const du = Math.abs(u + 0.5 - 8), top = Math.ceil(YR + 78 + 6 * Math.pow(1 - du / 8, 0.55));
          for (let y = top; y <= YR + 85; y++) face === 'x' ? R.set(2 * tx + 2 + u, y, fixed, B.trimDk) : R.set(fixed, y, 162 + u, B.trimDk);
        }
        w.box(tx, Y + 43, 80, tx + 9, Y + 44, 89, B.wall);
        w.walls(tx - 1, Y + 45, 79, tx + 10, Y + 46, 90, B.trim);
        for (const [cx, cz] of [[tx - 1, 79], [tx + 10, 79], [tx - 1, 90], [tx + 10, 90]]) { w.box(cx, Y + 47, cz, cx, Y + 50, cz, B.wallDk); w.set(cx, Y + 51, cz, B.roofR); w.set(cx, Y + 52, cz, B.gold); }
        const st = MH.pyramid(w, tx, 80, tx + 9, 89, Y + 47, B.roof, 3, B.roofR);
        w.box(tx + 4, st, 84, tx + 5, st + 5, 85, B.gold); w.box(tx + 3, st + 3, 84, tx + 6, st + 3, 85, B.gold);
        tops.push(st + 6);
      }
      // 정면 벽
      w.box(62, Y, 89, 82, Y + 31, 89, B.wall);
      MH.roof(w, 62, 82, 89, 89, Y + 30, { b: B.wall, pitch: 2, axis: 'z' });
      rose(144, 2 * (Y + 21) + 1, 181, 14, 'z');
      for (let x = 64; x <= 80; x++) w.set(x, Y + 13, 90, B.trim);
      // 장미창 위 뾰족 아치 촛불줄
      for (let x = 66; x <= 78; x += 2) { w.set(x, Y + 30 - Math.abs(x - M), 90, B.candle); }

      // ── 정문(실제 칸): 세 겹 뾰족 아치(문설주 기둥·주두), 깊은 문간, 판자·쇠띠·징·문고리가 있는 두 문짝(부품) ──
      const PC = 145, DX0 = 138, DX1 = 151, DS = YR + 13, DA = YR + 21;   // 문 너비 14칸, 높이 21칸
      const arch = (X, a, ys, ya) => { const u = Math.abs(X + 0.5 - PC) / a; return u > 1 ? -1 : ys + (ya - ys) * Math.pow(1 - u, 0.55); };
      for (let X = DX0; X <= DX1; X++) for (let y = YR; y <= DA; y++) if (y <= arch(X, 7, DS, DA)) for (let Z = 176; Z <= 181; Z++) R.set(X, y, Z, B.dark);
      for (let k = 3; k >= 1; k--) {
        const a = 7 + 2 * k, a0 = 7 + 2 * (k - 1), zf = 181 + 2 * k;
        for (let X = PC - a - 1; X <= PC + a; X++) {
          const top = arch(X, a, DS, DA + 2 * k), in0 = arch(X, a0, DS, DA + 2 * (k - 1));
          if (top < 0) continue;
          for (let y = YR; y <= top; y++) {
            if (in0 >= 0 && y <= in0) continue;
            const col = y < DS && (X === PC - a || X === PC + a - 1);
            for (let Z = 180; Z <= zf; Z++) R.set(X, y, Z, col ? B.trim : (k & 1 ? B.wallDk : B.trimDk));
          }
          if (X === PC - a || X === PC + a - 1) { R.set(X, DS, zf + 1, B.gold); R.set(X, YR, zf + 1, B.trimDk); R.set(X, YR + 1, zf + 1, B.trimDk); }
        }
      }
      R.box(PC - 1, DA + 7, 186, PC, DA + 8, 187, B.gold);
      // 문 양옆 쇠 촛대
      for (const cx of [130, 160]) { R.box(cx - 1, YR, 185, cx + 1, YR, 187, B.wallDk); R.box(cx, YR + 1, 186, cx, YR + 7, 186, B.iron); R.box(cx - 2, YR + 7, 186, cx + 2, YR + 7, 186, B.iron); for (const dx of [-2, 0, 2]) R.set(cx + dx, YR + 8 + (dx ? 0 : 1), 186, B.candle); }
      const gL = R.prop({ name: 'gateL', pivot: [DX0, YR, 182] }), gR = R.prop({ name: 'gateR', pivot: [DX1 + 1, YR, 182] });
      for (let X = DX0; X <= DX1; X++) for (let y = YR; y <= arch(X, 7, DS, DA); y++) {
        const T = X <= 144 ? gL : gR, lx = X <= 144 ? X - DX0 : DX1 - X, ry = y - YR;
        const strap = (ry >= 3 && ry <= 4) || (ry >= 13 && ry <= 14);
        T.set(X, y, 182, (X === 144 || X === 145) ? B.iron : lx % 3 === 2 ? B.doorDk : B.door);
        T.set(X, y, 183, strap && lx < 6 ? B.iron : lx % 3 === 2 ? B.doorDk : B.door);
        if (strap && lx % 2 === 1 && lx < 6) T.set(X, y, 184, B.gold);
      }
      for (const [T, X] of [[gL, 142], [gR, 147]]) { T.set(X, YR + 9, 184, B.gold); T.set(X, YR + 8, 185, B.gold); T.set(X, YR + 10, 185, B.gold); T.set(X + (X < 145 ? -1 : 1), YR + 9, 185, B.gold); }
      lights.push({ name: 'rose', p: [M + 0.5, Y + 21, 92], c: '#ff3a4c', i: 1.3, d: 30, flicker: 0.06 });
      lights.push({ p: [44, Y + 18, 58.5], c: '#c050e0', i: 1.1, d: 20, flicker: 0.05 });
      lights.push({ p: [100, Y + 18, 58.5], c: '#ff3a4c', i: 1.1, d: 20, flicker: 0.05 });
      lights.push({ p: [M + 0.5, Y + 4, 93], c: '#ffd0a0', i: 0.8, d: 12, flicker: 0.3, srcR: 7 });
      lights.push({ name: 'nave', p: [M + 0.5, Y + 4, 92.5], c: '#ff4050', i: 0.01, d: 22, flicker: 0.3, srcR: 7 });

      // ── 서쪽 탑의 대종(실제 칸 부품): 어깨·허리·벌어진 입술, 속은 비고 추가 매달렸다 ──
      w.box(53, Y + 42, 84, 60, Y + 42, 84, B.wood);
      {
        const bell = R.prop({ name: 'bell', pivot: [114, YR + 84, 169], axis: 'z' });
        const yTop = YR + 81, yLip = YR + 72;
        for (let y = yLip; y <= yTop; y++) {
          const t = (yTop - y) / (yTop - yLip);
          const r = 2.8 + 1.5 * Math.pow(t, 1.4) + (t > 0.78 ? (t - 0.78) * 8 : 0);
          for (let Z = 163; Z <= 176; Z++) for (let X = 107; X <= 121; X++) {
            const dd = Math.hypot(X + 0.5 - 114, Z + 0.5 - 169.5);
            if (dd > r || (dd < r - 1.5 && y < yTop)) continue;
            bell.set(X, y, Z, (y === yLip + 2 || y === yTop - 2) ? B.bellDk : B.bell);
          }
        }
        bell.box(113, yTop + 1, 169, 114, yTop + 2, 170, B.iron); bell.box(111, yTop + 2, 169, 116, yTop + 2, 170, B.iron);
        bell.box(113, yLip + 3, 169, 114, yTop - 1, 170, B.iron); bell.box(112, yLip, 168, 115, yLip + 2, 171, B.iron);
      }
      acts.push({
        name: '서쪽 탑의 대종', hint: '종이 울리고 붉은 먼지가 흩날려요', hit: [53, Y + 35, 81, 60, Y + 42, 88],
        run: async a => {
          a.flash('rose', 1.6, 3.4);
          for (let k = 0; k < 4; k++) {
            await a.turn('bell', [0, 0, 0.45], 0.42);
            a.burst([57, Y + 38, 84.5], { n: 30, colors: ['#ff5a6a', '#ff9aa0', '#c02a3a'], speed: 9, up: 1, life: 2.4, gravity: 0.3, spread: 4, flat: true });
            await a.turn('bell', [0, 0, -0.45], 0.42);
          }
          await a.turn('bell', [0, 0, 0], 0.5);
        },
      });
      acts.push({
        name: '장미창', hint: '핏빛 스테인드글라스가 타오르듯 빛나요', hit: [64, Y + 13, 89, 80, Y + 29, 91],
        run: async a => {
          a.flash('rose', 5, 3.2); a.glow(1.8, 3.2);
          for (let k = 0; k < 5; k++) { a.burst([M + 0.5, Y + 21, 92], { n: 24, colors: ['#ff3e52', '#ffb85a', '#b848d8'], speed: 6, up: 0.5, life: 2, gravity: -0.4, spread: 7 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '핏빛 대성당', note: '보스 · 타락한 대주교', p: [M + 0.5, Math.max(...tops) + 5, 84.5], boss: true });

      // ═════════ 광장(실제 칸): 엇갈려 깐 판석, 피의 샘, 쇠 등 ═════════
      const FXr = 145, FZr = 203;   // 샘 중심(실제)
      for (let Z = 184; Z <= 217; Z++) for (let X = 76; X <= 213; X++) {
        if (R.hm[X + RW * Z] !== PT || R.get(X, PT + 1, Z) || Math.hypot(X + 0.5 - FXr, Z + 0.5 - FZr) < 15.5) continue;
        if (R.get(X, PT, Z) === B.trimDk || R.liq[X + RW * Z] >= 0) continue;
        const axis = Math.abs(X + 0.5 - PC) < 5;
        const row = Math.floor(Z / 4), off = axis ? 0 : (row & 1) * 3;
        let b;
        if (axis) b = (Z % 6 === 5) ? B.paveJ : (Math.abs(X + 0.5 - PC) < 1 ? B.pave3 : B.flag);
        else if (Z % 4 === 3 || (X + off) % 6 === 5) b = B.paveJ;
        else b = [B.pave1, B.pave2, B.pave3, B.pave1][(hash3(Math.floor((X + off) / 6), row, 7) * 4) | 0];
        if (hash3(X, 11, Z) > 0.985 && b !== B.paveJ) b = B.bmoss;
        R.set(X, PT, Z, b);
      }
      // 피의 샘: 두 단 쇠시리 테, 넘칠 듯 찬 핏물, 받침 기둥과 수반, 날개 편 가고일 상
      for (let Z = FZr - 15; Z <= FZr + 15; Z++) for (let X = FXr - 15; X <= FXr + 15; X++) {
        const d = Math.hypot(X + 0.5 - FXr, Z + 0.5 - FZr);
        if (d > 14.8 || (d > 11.2 && R.liq[X + RW * Z] >= 0)) continue;
        if (d > 11.2) {
          R.set(X, PT, Z, B.trimDk);
          if (d <= 14.2) R.set(X, PT + 1, Z, B.wallDk);
          if (d <= 13.6) { R.set(X, PT + 2, Z, B.trim); R.set(X, PT + 3, Z, B.trim); }
          if (d > 11.6 && d <= 13.2) R.set(X, PT + 4, Z, B.trim);
          continue;
        }
        const bed = PT - 2 - Math.round((1 - d / 11.2) * 3);
        MH.setH(R, X, Z, bed, d < 5 ? B.rockR : B.silt, B.rock);
        R.liquid(X, Z, PT + 2);
      }
      // 넘친 핏물이 도랑으로: 테의 동쪽에 홈
      for (let X = FXr + 10; X <= FXr + 13; X++) for (let Z = 202; Z <= 205; Z++) for (let y = PT + 3; y <= PT + 4; y++) R.set(X, y, Z, 0);
      // 받침 기둥과 수반
      R.cyl(FXr, FZr, PT - 4, PT + 13, 1.8, B.trim);
      R.cyl(FXr, FZr, PT + 1, PT + 2, 3.2, B.wallDk);
      R.cyl(FXr, FZr, PT + 14, PT + 14, 3.2, B.trim); R.cyl(FXr, FZr, PT + 15, PT + 15, 4.6, B.trim); R.ring(FXr, FZr, PT + 16, 3.6, 5.2, B.trim);
      R.cyl(FXr, FZr, PT + 16, PT + 16, 3.6, B.blood);
      // 가고일 상: 웅크린 몸·다리·꼬리·뿔·날개, 붉은 눈, 입에서 핏물
      {
        const gy = PT + 17;
        R.ellipsoid(FXr, gy + 4, FZr, 2.6, 3.4, 2.4, B.garg);                         // 몸통
        R.ellipsoid(FXr, gy + 9, FZr + 2, 2.2, 2, 2.2, B.garg);                       // 머리
        R.box(FXr - 1, gy + 8, FZr + 4, FXr, gy + 8, FZr + 5, B.gargDk);               // 주둥이
        R.set(FXr - 2, gy + 10, FZr + 4, B.reye); R.set(FXr + 1, gy + 10, FZr + 4, B.reye);
        for (const s of [-1, 1]) {
          R.line(FXr + s * 1.5, gy + 11, FZr + 1, FXr + s * 3, gy + 14, FZr - 1, B.gargDk);         // 뿔
          R.box(FXr + (s < 0 ? -3 : 1), gy, FZr + 1, FXr + (s < 0 ? -2 : 2), gy + 3, FZr + 3, B.gargDk);   // 앞발
          // 날개: 뼈대(뼈 색 줄)와 막
          for (let u = 1; u <= 9; u++) for (let v = 0; v <= 8 - Math.floor(u * 0.5); v++) {
            const X = FXr + s * (2 + u) - (s < 0 ? 1 : 0), yy = gy + 5 + Math.round(u * 0.9) + v - 2, Z = FZr - 1 - Math.floor(u / 3);
            R.set(X, yy, Z, v === 8 - Math.floor(u * 0.5) || u % 4 === 0 ? B.gargDk : B.garg);
          }
        }
        R.line(FXr, gy + 1, FZr - 3, FXr + 2, gy - 1, FZr - 7, B.gargDk, 0.6);      // 꼬리
        R.box(FXr - 1, gy + 6, FZr + 6, FXr, gy + 7, FZr + 6, B.blood);
      }
      lights.push({ name: 'font', p: [FXr / 2, (PT + 27) / 2, (FZr + 4) / 2], c: '#ff3040', i: 1.3, d: 18, flicker: 0.1 });
      landmarks.push({ name: '피의 샘', note: '절벽 아래로 떨어지는 핏물', p: [M + 0.5, P + 19, 101.5] });
      // 광장 쇠 등(실제 칸): 받침돌·기둥·고리·등롱 창살·뾰족 갓
      for (const [lx, lz] of [[50, 96], [94, 96], [50, 106], [94, 106]]) {
        const X = 2 * lx, Z = 2 * lz;
        R.box(X - 1, PT + 1, Z - 1, X + 1, PT + 2, Z + 1, B.wallDk); R.box(X, PT + 3, Z, X, PT + 13, Z, B.iron);
        R.box(X - 1, PT + 8, Z, X + 1, PT + 8, Z, B.iron); R.box(X, PT + 8, Z - 1, X, PT + 8, Z + 1, B.iron);
        R.box(X - 1, PT + 14, Z - 1, X + 1, PT + 14, Z + 1, B.iron);
        for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) R.box(X + dx, PT + 15, Z + dz, X + dx, PT + 17, Z + dz, B.iron);
        R.box(X, PT + 15, Z, X, PT + 17, Z, B.lamp); for (const [dx, dz] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) R.box(X + dx, PT + 15, Z + dz, X + dx, PT + 17, Z + dz, B.lamp);
        R.box(X - 1, PT + 18, Z - 1, X + 1, PT + 18, Z + 1, B.iron); R.set(X, PT + 19, Z, B.iron); R.set(X, PT + 20, Z, B.gold);
        lights.push({ p: [lx + 0.5, (PT + 16) / 2, lz + 0.5], c: '#ffb070', i: 0.9, d: 12, flicker: 0.2, night: true });
      }
      for (const bx of [58, 84]) { w.box(bx - 2, P + 1, 104, bx + 2, P + 1, 104, B.trim); w.set(bx - 2, P + 1, 105, B.wallDk); w.set(bx + 2, P + 1, 105, B.wallDk); }
      const FX = M, FZ = 101, QZ1 = 108;
      // ── 가고일 회랑(고원 동쪽 끝) ──
      let gargAt = null;
      for (let z = 34; z <= 90; z += 8) {
        let gx = 112; while (gx > 76 && MH.g(w, gx, z) !== P) gx--;
        gx -= 2;
        const flat = q => { for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (MH.g(w, q + dx, z + dz) !== P) return false; return true; };
        while (gx > 76 && !flat(gx)) gx--;
        if (MH.g(w, gx, z) !== P) continue;
        w.box(gx - 1, P + 1, z - 1, gx + 1, P + 1, z + 1, B.wallDk); w.box(gx, P + 2, z, gx, P + 8, z, B.trim); w.box(gx - 1, P + 8, z - 1, gx + 1, P + 8, z + 1, B.wallDk);
        w.set(gx, P + 4, z + 1, B.wallDk); w.set(gx + 1, P + 4, z, B.wallDk);
        const gw = z === 82 ? w.prop({ name: 'garg', pivot: [gx + 0.5, P + 9, z + 0.5] }) : w;
        if (z === 82) gargAt = [gx, z];
        gw.box(gx, P + 9, z, gx, P + 11, z, B.garg); gw.box(gx + 1, P + 9, z, gx + 2, P + 10, z, B.garg); gw.set(gx + 2, P + 11, z, B.reye);
        for (const s of [-1, 1]) { gw.set(gx, P + 11, z + s, B.garg); gw.set(gx - 1, P + 12, z + s * 2, B.garg); gw.set(gx - 1, P + 11, z + s * 2, B.garg); }
      }
      landmarks.push({ name: '가고일 회랑', note: '가고일 · 광신도 출몰', p: [106.5, P + 18, 58.5] });

      // ── 심문관의 화형대와 교수대 ──
      const IX = 43, IZ = 95;
      w.box(IX, P + 1, IZ, IX + 10, P + 2, IZ + 10, B.plank);
      for (const [px, pz] of [[IX, IZ], [IX + 10, IZ], [IX, IZ + 10], [IX + 10, IZ + 10]]) w.box(px, P + 1, pz, px, P + 4, pz, B.wood);
      w.box(IX + 11, P + 1, IZ + 4, IX + 12, P + 1, IZ + 6, B.plank); w.box(IX + 13, P + 0.5, IZ + 4, IX + 13, P + 0.5, IZ + 6, B.plank);
      w.box(IX + 5, P + 3, IZ + 5, IX + 5, P + 14, IZ + 5, B.wood); w.box(IX + 3, P + 12, IZ + 5, IX + 7, P + 12, IZ + 5, B.wood);
      // 장작더미(실제 칸): 비스듬히 쌓인 통나무와 불씨
      for (let i = 0; i < 46; i++) {
        const a = w.r(0, 6.28), r = w.r(1.5, 6.5), cx = 2 * IX + 11 + Math.cos(a) * r, cz = 2 * IZ + 11 + Math.sin(a) * r, y = 2 * P + 5 + w.ri(0, 3);
        const b2 = a + w.r(-0.6, 0.6) + 1.57;
        R.line(cx - Math.cos(b2) * 2, y, cz - Math.sin(b2) * 2, cx + Math.cos(b2) * 2, y + w.ri(0, 1), cz + Math.sin(b2) * 2, w.chance(0.7) ? B.wood : B.bark);
      }
      for (let i = 0; i < 26; i++) { const a = w.r(0, 6.28), r = w.r(0, 3.5); R.fill(Math.round(2 * IX + 11 + Math.cos(a) * r), 2 * P + 6 + w.ri(0, 4), Math.round(2 * IZ + 11 + Math.sin(a) * r), w.chance(0.6) ? B.fire : B.fire2); }
      w.set(IX + 4, P + 5, IZ + 5, B.fire); w.set(IX + 6, P + 4, IZ + 5, B.fire2); w.set(IX + 5, P + 5, IZ + 6, B.fire);
      lights.push({ name: 'pyre', p: [IX + 5.5, P + 6, IZ + 5.5], c: '#ff8a30', i: 1.7, d: 20, flicker: 0.45 });
      const gxp = IX - 4, gzp = IZ + 2;
      w.box(gxp, P + 1, gzp, gxp, P + 16, gzp, B.wood); w.box(gxp, P + 16, gzp, gxp + 5, P + 16, gzp, B.wood); w.line(gxp, P + 12, gzp, gxp + 3, P + 16, gzp, B.wood);
      const cage = w.prop({ name: 'cage', pivot: [gxp + 5.5, P + 16, gzp + 0.5], axis: 'x', rock: 0.07, rockSpeed: 0.9 });
      cage.box(gxp + 5, P + 13, gzp, gxp + 5, P + 15, gzp, B.iron);
      // 쇠우리(실제 칸): 가는 창살과 테, 바닥판, 안의 뼈
      {
        const X0 = 2 * (gxp + 4), X1 = 2 * (gxp + 6) + 1, Z0 = 2 * (gzp - 1), Z1 = 2 * (gzp + 1) + 1, Y0 = 2 * (P + 7), Y1 = 2 * (P + 12) + 1;
        const C = cage.R || cage;
        for (let y = Y0; y <= Y1; y++) for (let Z = Z0; Z <= Z1; Z++) for (let X = X0; X <= X1; X++) {
          const edge = X === X0 || X === X1 || Z === Z0 || Z === Z1, cap = y === Y0 || y === Y1 || y === Y0 + 1;
          if (!edge && !cap) continue;
          if (cap || y === Y0 + 6 || ((X + Z) % 2 === 0)) C.set(X, y, Z, B.iron);
        }
        C.box(X0 + 2, Y0 + 2, Z0 + 2, X1 - 3, Y0 + 2, Z0 + 3, B.bone); C.set(X0 + 4, Y0 + 3, Z0 + 3, B.bone); C.set(X0 + 4, Y0 + 4, Z0 + 3, B.bone);
      }
      acts.push({
        name: '화형대', hint: '불길이 치솟고 쇠우리가 흔들려요', hit: [IX, P + 1, IZ, IX + 10, P + 9, IZ + 10],
        run: async a => {
          a.flash('pyre', 3.5, 3); a.spin('cage', 3.5, 3);
          for (let k = 0; k < 6; k++) { a.burst([IX + 5.5, P + 5, IZ + 5.5], { n: 34, colors: ['#ffb04a', '#ff7a2a', '#ffd060'], speed: 3, up: 8, life: 1.8, gravity: 1, spread: 2.5 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '심문관의 화형대', note: '중간 보스 · 심문관', p: [IX + 5.5, P + 23, IZ + 5.5], mid: true });
      landmarks.push({ name: '순례자의 대계단', note: '촛불을 따라 오르는 길', p: [M + 0.5, P + 3, 109 + 6] });

      // ═════════ 아래 땅(실제 칸): 비틀린 죽은 나무, 부서진 기둥, 반쯤 묻힌 바위와 떨어진 돌, 뼈 무더기 ═════════
      const deadTree = (x, y, z, h) => {
        const lean = w.r(0, 6.28), lx = Math.cos(lean), lz = Math.sin(lean);
        let cx = x, cz = z;
        for (let i = 0; i < h; i++) {
          const t = i / h, r = Math.max(0.7, 2.1 * (1 - t * 0.7) + (i < 3 ? (3 - i) * 0.6 : 0));
          cx = x + lx * t * t * 3 + Math.sin(i * 0.4 + x) * 0.6; cz = z + lz * t * t * 3;
          R.cyl(Math.round(cx), Math.round(cz), y + i, y + i, r, hash3(x, i >> 2, z) > 0.7 ? B.barkDk : B.bark);
        }
        for (let k = 0; k < 4; k++) { const a = k * 1.57 + w.r(-0.4, 0.4), l = w.r(3.5, 6); R.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, B.barkDk, t => t < 0.5 ? 0.9 : 0.5); }
        const nb = w.ri(4, 6);
        for (let i = 0; i < nb; i++) {
          const a = i / nb * 6.28 + w.r(-0.5, 0.5), sy = y + Math.floor(h * w.r(0.45, 0.9)), l = w.r(6, 11);
          const ex = cx + Math.cos(a) * l, ez = cz + Math.sin(a) * l, ey = sy + l * w.r(0.3, 0.8);
          R.line(cx, sy, cz, ex, ey, ez, B.bark, t => t < 0.35 ? 0.8 : 0);
          for (let q = 0; q < 2; q++) { const a2 = a + w.r(-1.1, 1.1), l2 = w.r(2.5, 5); R.line(ex, ey, ez, ex + Math.cos(a2) * l2, ey + w.r(-1, 3), ez + Math.sin(a2) * l2, B.bark); }
        }
      };
      const pillar = (x, y, z, h) => {
        R.box(x - 3, y, z - 3, x + 3, y + 1, z + 3, B.wallDk); R.box(x - 2, y + 2, z - 2, x + 2, y + 2, z + 2, B.trimDk);
        for (let yy = y + 3; yy < y + h; yy++) R.cyl(x, z, yy, yy, (yy - y) % 7 === 6 ? 1.6 : 2.1, (yy - y) % 7 === 6 ? B.trimDk : B.trim);
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (dx * dx + dz * dz <= 4.5 && hash3(x + dx, 3, z + dz) > 0.45) R.set(x + dx, y + h, z + dz, B.trim);
        // 떨어져 누운 기둥 토막
        const a = w.r(0, 6.28), d = w.r(5, 8), fx = x + Math.cos(a) * d, fz = z + Math.sin(a) * d;
        R.line(fx, y + 1, fz, fx + Math.cos(a + 1.3) * 5, y + 1, fz + Math.sin(a + 1.3) * 5, B.trim, 1.6);
      };
      const lowOK = (X, Z) => {
        if (X < 6 || Z < 6 || X > RW - 7 || Z > RD - 7) return false;
        const g = R.hm[X + RW * Z];
        if (R.liq[X + RW * Z] >= 0 || REG[X + RW * Z] || g > RB + 10 || g < WL + 3) return false;
        if (Math.abs(X - 145) < 18 && Z > 210) return false;
        for (const [dx, dz] of [[4, 0], [-4, 0], [0, 4], [0, -4]]) { const g2 = R.hm[X + dx + RW * (Z + dz)]; if (Math.abs(g2 - g) > 3 || R.liq[X + dx + RW * (Z + dz)] >= 0) return false; }
        return !R.get(X, g + 1, Z);
      };
      for (let i = 0, made = 0; i < 260 && made < 30; i++) {
        const X = w.ri(8, RW - 9), Z = w.ri(8, RD - 9);
        if (!lowOK(X, Z)) continue;
        const g = R.hm[X + RW * Z];
        if (made % 3 !== 2) deadTree(X, g + 1, Z, w.ri(18, 30)); else pillar(X, g + 1, Z, w.ri(7, 22));
        made++;
      }
      // 벼랑 발치의 떨어진 돌과 반쯤 묻힌 바위
      for (let i = 0, made = 0; i < 900 && made < 70; i++) {
        const X = w.ri(6, RW - 7), Z = w.ri(6, RD - 7), k = X + RW * Z;
        if (REG[k] || R.liq[k] >= 0 || (Math.abs(X - 145) < 16 && Z > 210)) continue;
        const g = R.hm[k], foot = PD[k] > 14 && PD[k] < 40, far = PD[k] >= 40 && hash3(X, 1, Z) > 0.6;
        if (!(foot || far) || R.get(X, g + 1, Z) || g > PT - 6) continue;
        const r = foot ? w.r(1.6, 4.2) : w.r(2.5, 5);
        MH.rock(R, X, g - Math.round(r * 0.35), Z, r, hash3(X, 2, Z) > 0.5 ? B.cliff : B.cliff2, B.bmoss, B.rockDk);
        if (foot) for (let q = 0; q < 4; q++) { const ox = X + w.ri(-6, 6), oz = Z + w.ri(-6, 6), gg = MH.g(R, ox, oz); if (gg > 0 && R.liq[ox + RW * oz] < 0 && !R.get(ox, gg + 1, oz)) R.box(ox, gg + 1, oz, ox + w.ri(0, 1), gg + 1 + w.ri(0, 1), oz + w.ri(0, 1), B.rock); }
        made++;
      }
      // 뼈 무더기
      for (let i = 0, made = 0; i < 400 && made < 16; i++) {
        const X = w.ri(10, RW - 11), Z = w.ri(10, RD - 11);
        if (!lowOK(X, Z)) continue;
        const g = R.hm[X + RW * Z];
        for (let q = 0; q < 7; q++) { const a = w.r(0, 6.28), l = w.r(1.5, 3); const ox = X + w.ri(-2, 2), oz = Z + w.ri(-2, 2); R.line(ox, g + 1, oz, ox + Math.cos(a) * l, g + 1, oz + Math.sin(a) * l, q % 3 ? B.bone : B.bone2); }
        R.box(X, g + 2, Z, X + 1, g + 3, Z + 1, B.bone); R.set(X, g + 3, Z + 1, B.dark);
        made++;
      }

      // ── 정문 상호작용 ──
      acts.push({
        name: '성당 정문', hint: '육중한 정문이 바깥으로 열리며 붉은 안개가 쏟아져 나와요', hit: [68, Y, 90, 76, Y + 11, 92],
        run: async a => {
          a.flash('nave', 260, 5);
          await Promise.all([a.turn('gateL', [0, -1.5, 0], 2.2), a.turn('gateR', [0, 1.5, 0], 2.2)]);
          for (let k = 0; k < 5; k++) { a.burst([M + 0.5, Y + 3, 93], { n: 34, colors: ['#ff5a6a', '#c02a3a', '#4a1a24'], speed: 5, up: 1, life: 2.4, gravity: 0.3, spread: 4, flat: true }); await a.wait(0.4); }
          await a.wait(1);
          await Promise.all([a.turn('gateL', [0, 0, 0], 1.8), a.turn('gateR', [0, 0, 0], 1.8)]);
        },
      });

      // ── 가고일의 비상: 회랑의 가고일 하나가 깨어나 성당 위를 지나 서쪽 하늘 너머로 날아가고, 다시 받침에 나타난다 ──
      if (gargAt) {
        const [gx, gz] = gargAt;
        acts.push({
          name: '가고일의 비상', hint: '회랑의 가고일이 눈을 붉히며 날아올라 성당 위를 넘어 서쪽 하늘로 사라져요', hit: [gx - 2, P + 8, gz - 2, gx + 3, P + 13, gz + 2],
          run: async a => {
            for (let k = 0; k < 3; k++) { await a.move('garg', [0, 0.6, 0], 0.1); await a.move('garg', [0, 0, 0], 0.1); }
            a.burst([gx + 2.5, P + 11.5, gz + 0.5], { n: 30, colors: ['#ff3040', '#5e585c', '#9e928c'], speed: 5, up: 3, life: 1.4, gravity: 3, spread: 1.5 });
            // 머리(+x, 붉은 눈 쪽)를 진행 방향으로 돌린다
            await a.drive('garg', [[3, 6, 2], [4, 12, 8], [-4, 18, 12], [-16, 22, 6], [-30, 24, -4], [-46, 26, -16], [-62, 27, -24], [-124, 30, -40]], 7, { fwd: '+x', back: 1.0 });
            a.burst([gx + 0.5, P + 9, gz + 0.5], { n: 30, colors: ['#9e928c', '#5e585c'], speed: 5, up: 1, life: 1, gravity: 4, spread: 2, flat: true });
          },
        });
      }

      // ── 피의 샘: 가고일 상의 입에서 핏물이 솟구친다 ──
      acts.push({
        name: '피의 샘', hint: '샘 한가운데 가고일 상이 핏물을 높이 뿜어 올려요', hit: [FX - 6, P - 1, FZ - 6, FX + 6, P + 12, FZ + 6],
        run: async a => {
          a.flash('font', 4, 4);
          for (let k = 0; k < 8; k++) {
            a.burst([FX + 0.5, P + 13, FZ + 4.5], { n: 40, colors: ['#ff3e52', '#c02a3a', '#7c1420'], speed: 4, up: 12, life: 2, gravity: 9, spread: 0.8 });
            const t = k * 0.8;
            a.burst([FX + 0.5 + Math.cos(t) * 4.5, P + 3, FZ + 0.5 + Math.sin(t) * 4.5], { n: 16, colors: ['#ff6072', '#7c1420'], speed: 3, up: 3, life: 0.8, gravity: 6, spread: 1 });
            await a.wait(0.35);
          }
        },
      });

      // ── 광장의 낙뢰(부품 번개, 평소엔 숨김) ──
      const TT = [88.5, P + 1, 97.5];
      const bolt = w.prop({ name: 'bolt', pivot: TT, scl0: [0, 0, 0] });
      let prev = [108, w.H - 3, 112];
      for (let k = 1; k <= 7; k++) {
        const p = [prev[0] + (TT[0] - prev[0]) * (k === 7 ? 1 : 0.3), prev[1] + (TT[1] - prev[1]) * (k === 7 ? 1 : 0.3), prev[2] + (TT[2] - prev[2]) * (k === 7 ? 1 : 0.3)];
        if (k < 7) { p[0] += (hash3(k, 1, 7) - 0.5) * 5; p[2] += (hash3(k, 3, 7) - 0.5) * 5; }
        bolt.line(prev[0], prev[1], prev[2], p[0], p[1], p[2], B.bolt); prev = p;
      }
      lights.push({ name: 'strike', p: [TT[0], TT[1] + 1, TT[2]], c: '#ffd8d8', i: 0.01, d: 50, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '광장의 낙뢰', hint: '핏빛 하늘에서 번개가 성당 앞 광장에 내리꽂혀 불똥이 튀어요', hit: [85, P, 94, 92, P + 4, 101],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            a.tween('bolt', { scl: [1, 1, 1] }, 0.05); a.lightning(1.3); a.flash('strike', 200, 0.3);
            a.burst(TT, { n: 50, colors: ['#ffffff', '#ffd060', '#ff5a6a'], speed: 9, up: 3, life: 1, gravity: 4, spread: 2 });
            await a.wait(0.22); await a.tween('bolt', { scl: [0, 0, 0] }, 0.05); await a.wait(0.5 + k * 0.25);
          }
          a.glow(1.8, 2); a.flash('rose', 3, 2);
          a.burst([TT[0], P + 1.5, TT[2]], { n: 40, colors: ['#ff3e52', '#ffb85a', '#3d3439'], speed: 6, up: 1, life: 1.6, gravity: 2, spread: 2, flat: true });
          await a.wait(1.2);
        },
      });

      // ── 순례자의 촛불: 계단 촛불이 아래부터 차례로 크게 타오른다 ──
      const cand = stairC.filter(([, , z]) => z <= 124).sort((p, q) => q[2] - p[2] || p[0] - q[0]).concat([[65, Y + 4, 93], [80, Y + 4, 93]]);
      if (cand.length) acts.push({
        name: '순례자의 촛불', hint: '대계단 난간의 촛불이 아래에서부터 차례로 타오르며 성당을 가리켜요', hit: [M - 7, cand[0][1] - 1, cand[0][2] - 2, M + 7, cand[0][1] + 3, cand[0][2] + 2],
        run: async a => {
          for (const [x, y, z] of cand) { a.burst([x + 0.5, y + 1, z + 0.5], { n: 14, colors: ['#ffe2a0', '#ffb04a', '#ff7a2a'], speed: 0.8, up: 5, life: 1.2, gravity: -0.4, spread: 0.3 }); await a.wait(0.1); }
          a.flash('nave', 120, 2); a.flash('rose', 4, 2.4); a.glow(1.6, 2.4);
          a.burst([M + 0.5, Y + 21, 92], { n: 50, colors: ['#ff3e52', '#ffb85a', '#b848d8'], speed: 6, up: 0.5, life: 2, gravity: -0.3, spread: 6 });
          await a.wait(2);
        },
      });

      // ══ 새 구역: 서쪽 고원의 참회의 수도원 회랑 ══
      const CX0 = 8, CX1 = 33, CZ0 = 70, CZ1 = 101, RH = 7;
      // 바깥벽(남·동쪽은 낮은 벽, 북·서쪽은 높은 벽)
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        const edge = x === CX0 || x === CX1 || z === CZ0 || z === CZ1;
        const walk = x < CX0 + 4 || x > CX1 - 4 || z < CZ0 + 4 || z > CZ1 - 4;
        MH.paint(w, x, z, walk ? B.cloF : (hash3(x, 1, z) > 0.7 ? B.bmoss : B.grass));
        if (!edge) continue;
        const low = z === CZ1 || x === CX1;
        w.box(x, P + 1, z, x, P + (low ? 3 : RH), z, B.wall);
        if (!low && (x + z) % 5 === 0) w.box(x, P + 3, z, x, P + 5, z, B.dark);
        if (low) w.set(x, P + 4, z, B.trim);
      }
      // 회랑 입구(동쪽 낮은 벽, 화형대 쪽)와 철문(부품)
      const EZ = 86;
      w.box(CX1, P + 1, EZ - 2, CX1, P + 4, EZ + 2, 0);
      for (const s2 of [-3, 3]) { w.box(CX1, P + 1, EZ + s2, CX1, P + 7, EZ + s2, B.wallDk); w.set(CX1, P + 8, EZ + s2, B.gold); }
      for (let z = EZ - 3; z <= EZ + 3; z++) w.set(CX1, P + 7 + (Math.abs(z - EZ) < 2 ? 1 : 0), z, B.trim);
      const cgL = w.prop({ name: 'cgateL', pivot: [CX1 + 0.5, P + 1, EZ - 2] }), cgR = w.prop({ name: 'cgateR', pivot: [CX1 + 0.5, P + 1, EZ + 3] });
      for (let z = EZ - 2; z <= EZ + 2; z++) for (let y = P + 1; y <= P + 5; y++) {
        if (z === EZ && y > P + 4) continue;
        const b = (y === P + 1 || y === P + 4 || z === EZ - 2 || z === EZ + 2) ? B.iron : ((z + y) % 2 ? B.iron : 0);
        if (b) (z < EZ || (z === EZ && y % 2) ? cgL : cgR).set(CX1, y, z, b);
      }
      for (let x = CX1 + 1; x <= 42; x++) for (let z = EZ - 1; z <= EZ + 1; z++) if (MH.g(w, x, z) === P) MH.paint(w, x, z, B.cloF);
      // 안쪽 아케이드: 기둥과 뾰족 아치, 안쪽으로 기운 지붕
      const IX0 = CX0 + 4, IX1 = CX1 - 4, IZ0 = CZ0 + 4, IZ1 = CZ1 - 4;
      for (let z = IZ0; z <= IZ1; z++) for (let x = IX0; x <= IX1; x++) {
        if (x !== IX0 && x !== IX1 && z !== IZ0 && z !== IZ1) continue;
        const u = (x === IX0 || x === IX1) ? z - IZ0 : x - IX0, col = u % 3 === 0;
        if (col) { w.box(x, P + 1, z, x, P + 5, z, B.trim); w.set(x, P + 1, z, B.wallDk); }
        else w.set(x, P + 5, z, B.wall);
        if (!col && u % 3 === 1) w.set(x, P + 4, z, B.trim);
        if (!col && u % 3 === 2) w.set(x, P + 4, z, B.trim);
      }
      // 기운 지붕: 바깥벽(높이 RH) → 아케이드(높이 6)
      for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        const dIn = Math.min(x - CX0, CX1 - x, z - CZ0, CZ1 - z);
        if (dIn > 4) continue;
        const sideLow = (x > CX1 - 5 && dIn === CX1 - x) || (z > CZ1 - 5 && dIn === CZ1 - z);
        const y = sideLow ? P + 6 : P + RH + 1 - Math.round(dIn * 0.5);
        if (x === CX1 && Math.abs(z - EZ) <= 3) continue;
        w.set(x, y, z, dIn === 4 ? B.roofR : B.roof);
      }
      // 안뜰: 장미 화단과 피 우물
      const WX = Math.round((IX0 + IX1) / 2), WZ = Math.round((IZ0 + IZ1) / 2);
      for (let z = IZ0 + 1; z < IZ1; z++) for (let x = IX0 + 1; x < IX1; x++) {
        const d = Math.hypot(x - WX, z - WZ);
        if (d < 4.5) MH.paint(w, x, z, B.cloF);
        else if (Math.abs(x - WX) <= 1 || Math.abs(z - WZ) <= 1) MH.paint(w, x, z, B.cloF);
        else if (hash3(x, 2, z) > 0.45) { w.set(x, P + 1, z, B.leafD); if (hash3(x, 3, z) > 0.55) w.set(x, P + 2, z, B.roseF); }
      }
      w.ring(WX, WZ, P + 1, 1.5, 3.1, B.wallDk); w.ring(WX, WZ, P + 2, 1.5, 3.1, B.trim);
      for (let z = WZ - 1; z <= WZ + 1; z++) for (let x = WX - 1; x <= WX + 1; x++) { MH.setH(w, x, z, P - 3, B.rock, B.rock); w.liquid(x, z, P - 1); }
      w.ring(WX, WZ, P, 1.5, 3.1, B.wallDk);
      for (const [px, pz] of [[WX - 3, WZ], [WX + 3, WZ]]) w.box(px, P + 3, pz, px, P + 8, pz, B.wood);
      w.box(WX - 3, P + 9, WZ, WX + 3, P + 9, WZ, B.wood); w.set(WX - 4, P + 9, WZ, B.iron); w.set(WX - 4, P + 8, WZ, B.iron);
      for (let x = WX - 2; x <= WX + 2; x++) for (const dz of [-1, 1]) w.set(x, P + 10, WZ + dz, B.roofR);
      w.box(WX - 2, P + 11, WZ, WX + 2, P + 11, WZ, B.roofR);
      MH.rope(w, 'wrope', WX, P + 8, WZ, 2, B.rope);
      const pail = w.prop({ name: 'pail', pivot: [WX + 0.5, P + 6, WZ + 0.5] });
      pail.box(WX, P + 5, WZ, WX, P + 6, WZ, B.wood); pail.set(WX, P + 7, WZ, B.iron);
      lights.push({ name: 'well', p: [WX + 0.5, P, WZ + 0.5], c: '#ff3040', i: 0.4, d: 12, flicker: 0.2, liquid: true });
      // 성배 제단(안뜰 북쪽 회랑 앞)
      const AX = WX, AZ = IZ0 + 2;
      w.box(AX - 2, P + 1, AZ - 1, AX + 2, P + 2, AZ + 1, B.trim); w.box(AX - 2, P + 3, AZ - 1, AX + 2, P + 3, AZ + 1, B.wallDk);
      w.set(AX, P + 4, AZ, B.gold); w.set(AX, P + 5, AZ, B.gold); w.box(AX - 1, P + 6, AZ, AX + 1, P + 6, AZ, B.gold); w.set(AX, P + 6, AZ, B.blood);
      for (const s2 of [-2, 2]) { w.set(AX + s2, P + 4, AZ, B.iron); w.set(AX + s2, P + 5, AZ, B.candle); }
      w.box(AX - 1, P + 3, AZ + 2, AX + 1, P + 3, AZ + 2, B.roofR);
      lights.push({ name: 'chalice', p: [AX + 0.5, P + 7, AZ + 0.5], c: '#ff3a4c', i: 0.5, d: 14, flicker: 0.2 });
      // 고해실 첨탑(북서 모서리): 사각 탑과 뾰족 지붕, 붉은 등
      const KX = CX0 + 2, KZ = CZ0 + 2;
      w.box(KX - 3, P + 1, KZ - 3, KX + 3, P + 22, KZ + 3, B.wall);
      for (const y of [P + 8, P + 15, P + 22]) w.walls(KX - 4, y, KZ - 4, KX + 4, y, KZ + 4, B.trim);
      for (const [dx, dz] of [[3, 0], [0, 3]]) { w.box(KX + dx, P + 10, KZ + dz, KX + dx, P + 13, KZ + dz, B.glassR); w.box(KX + dx, P + 17, KZ + dz, KX + dx, P + 20, KZ + dz, B.lamp); }
      const kt = MH.pyramid(w, KX - 3, KZ - 3, KX + 3, KZ + 3, P + 23, B.roof, 3, B.roofR);
      w.box(KX, kt, KZ, KX, kt + 3, KZ, B.gold); w.box(KX - 1, kt + 2, KZ, KX + 1, kt + 2, KZ, B.gold);
      lights.push({ p: [KX + 3.5, P + 18, KZ + 0.5], c: '#ffb070', i: 0.8, d: 14, flicker: 0.25, night: true });
      // 회랑 바깥: 수도사 묘지(작은 십자 묘비)
      for (let z = CZ1 + 3; z <= QZ1 - 1; z += 3) for (let x = CX0 + 1; x <= CX1 - 1; x += 4) {
        if (MH.g(w, x, z) !== P) continue;
        w.box(x, P + 1, z, x, P + 3, z, B.trim); w.box(x - 1, P + 2, z, x + 1, P + 2, z, B.trim); w.set(x, P + 1, z + 1, B.bmoss);
      }
      landmarks.push({ name: '참회의 수도원 회랑', note: '참회하는 망령이 맴도는 안뜰', p: [WX + 0.5, P + 20, WZ + 0.5] });
      landmarks.push({ name: '고해실 첨탑', note: '밤마다 붉은 등이 켜진다', p: [KX + 0.5, kt + 8, KZ + 0.5] });
      acts.push({
        name: '참회의 우물', hint: '두레박이 우물 속으로 내려갔다 피를 가득 길어 올려요', hit: [WX - 3, P + 1, WZ - 3, WX + 3, P + 11, WZ + 3],
        run: async a => {
          await Promise.all([a.rope('wrope', 2, 9, 1.6), a.move('pail', [0, -7, 0], 1.6)]);
          a.flash('well', 8, 2.6);
          for (let k = 0; k < 3; k++) { a.burst([WX + 0.5, P - 0.5, WZ + 0.5], { n: 24, colors: ['#ff3e52', '#7c1420', '#c02a3a'], speed: 3, up: 4, life: 1, gravity: 7, spread: 0.8 }); await a.wait(0.35); }
          await Promise.all([a.rope('wrope', 2, 2, 2), a.move('pail', [0, 0, 0], 2)]);
          for (let k = 0; k < 4; k++) { a.burst([WX + 0.5, P + 5, WZ + 0.5], { n: 12, colors: ['#ff3e52', '#7c1420'], speed: 1, up: 0.5, life: 1, gravity: 8, spread: 0.3 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '피의 성배', hint: '제단의 금 성배에서 피가 넘쳐흘러 촛불이 붉게 타올라요', hit: [AX - 2, P + 1, AZ - 1, AX + 2, P + 7, AZ + 2],
        run: async a => {
          a.flash('chalice', 8, 3.4); a.glow(1.5, 3.4);
          for (let k = 0; k < 7; k++) {
            a.burst([AX + 0.5, P + 7, AZ + 0.5], { n: 22, colors: ['#ff3e52', '#c02a3a', '#ffb85a'], speed: 1.6, up: 3, life: 1.4, gravity: 5, spread: 0.6 });
            for (const s2 of [-2, 2]) a.burst([AX + s2 + 0.5, P + 6, AZ + 0.5], { n: 6, colors: ['#ff6a3a', '#ffe2a0'], speed: 0.6, up: 3, life: 0.8, gravity: -0.4, spread: 0.2 });
            await a.wait(0.4);
          }
          a.burst([AX + 0.5, P + 1.5, AZ + 2.5], { n: 40, colors: ['#7c1420', '#ff3e52'], speed: 3, up: 0.5, life: 1.6, gravity: 2, spread: 2, flat: true });
          await a.wait(0.8);
        },
      });
      acts.push({
        name: '회랑 철문', hint: '수도원 회랑의 녹슨 철문이 삐걱 열리며 참회하는 망령의 붉은 숨이 새어 나와요', hit: [CX1 - 1, P + 1, EZ - 3, CX1 + 1, P + 6, EZ + 3],
        run: async a => {
          await Promise.all([a.turn('cgateL', [0, 1.4, 0], 1.8), a.turn('cgateR', [0, -1.4, 0], 1.8)]);
          for (let k = 0; k < 5; k++) { a.burst([CX1 + 1.5, P + 3, EZ + 0.5], { n: 26, colors: ['#ff9aa0', '#c02a3a', '#4a1a24'], speed: 3, up: 2, life: 2.2, gravity: -0.3, spread: 1.5 }); await a.wait(0.4); }
          await a.wait(0.8);
          await Promise.all([a.turn('cgateL', [0, 0, 0], 1.5), a.turn('cgateR', [0, 0, 0], 1.5)]);
        },
      });
      return HD.out({ lights, landmarks, acts });
    },
  });
})();
