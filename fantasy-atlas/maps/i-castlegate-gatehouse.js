// 성문 문루(하위 지도) — 왕성 앞 광장 정문 쌍탑 사이 문루의 속. 가운데 성문 통로와 쇠창살, 서쪽 수비대 초소, 동쪽 쇠창살 감기 방, 북쪽 위 망루 통로 (왕성 앞 광장의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 남쪽·동쪽 벽은 낮게 잘라 기본 시점(남동쪽)에서 방 안이 보인다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const KP = Object.assign({}, window.KINGDOM.KP); delete KP.banner; delete KP.bannerR;   // 깃발·휘장 블록은 쓰지 않는다
  // ── 2배 해상도 도우미(이 파일 전용 복사본) ──
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
  const W = 96, D = 96, Hh = 72;
  MAPS.push({
    id: 'castlegate-gatehouse', cat: 'kingdom', sub: true, parent: 'castlegate', name: '성문 문루', en: 'Castle Gatehouse', color: '#c8d4ee', seed: 2391, base: 40, time: 'night', size: [W * 2, D * 2, Hh * 2], playerScale: 2,
    desc: '왕성 정문 쌍탑 사이 문루의 속. 가운데로 성문 통로가 지나고 머리 위에 쇠창살이 걸려 있다. 서쪽은 화로가 타는 수비대 초소, 동쪽은 쇠창살과 도개교를 감는 큰 윈치 방이고, 계단을 오르면 화살구멍과 봉화 화로가 있는 망루 통로가 북쪽 벽을 따라 이어진다.',
    info: { title: '장소 정보', en: 'GATEHOUSE', rows: [['위치', '왕성 앞 광장 정문 문루'], ['아래층', '성문 통로 · 수비대 초소 · 쇠창살 감기 방'], ['위층', '망루 통로 · 화살구멍 · 봉화 화로'], ['소문', '쇠창살 윈치는 근위대 셋이 함께 돌려야 겨우 움직인다']] },
    sky: ['#26304a', '#0c0e1a', '#6a5a78'], stars: true,
    hemi: ['#d8d0e8', '#2a2430', 0.52], sun: ['#c8d0f8', 0.4, [0.5, 1, 0.55]],
    day: { sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false, hemi: ['#ffffff', '#5a5a60', 0.6], sun: ['#fff4e0', 0.74, [0.5, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.6,
    fog: { start: 0.9, floor: 12, depth: 12 },
    camY: -12, zoom: 1.65,
    particles: [
      { n: 90, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.3, area: [96, 96, 60], y0: 44, y1: 72, glow: false },
      { n: 50, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], mode: 'rise', speed: 1.6, area: [143, 51, 6], y0: 64, y1: 92, glow: true },
      { n: 30, colors: ['#ffb04a', '#ff7a2a'], mode: 'rise', speed: 1, area: [45, 103, 4], y0: 44, y1: 60, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      slabD: { c: '#9a968e', top: '#b4b0a6', v: 0.05, pat: 'check', alt: '#a8a49a' }, flagst: { c: '#8a867e', top: '#a29e94', v: 0.08, pat: 'stone' },
      dark: { c: '#16141a', v: 0 }, chain: { c: '#3a3a44', v: 0.03 }, steel: { c: '#aab0bc', v: 0.04 }, brass: { c: '#d8a84a', v: 0.05 },
      hearth: { c: '#5a5660', v: 0.06, pat: 'brick' }, fire: { c: '#ff9a3a', glow: true }, ember: { c: '#ff6a1a', glow: true }, candle: { c: '#ffe2a0', glow: true },
      table: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, bench: { c: '#5a3a24', v: 0.04 }, mug: { c: '#c8b8a0', v: 0.03 }, ale: { c: '#d89a3a', v: 0.03 },
      blanket: { c: '#3a4a8a', v: 0.03 }, straw: { c: '#d8c07a', v: 0.08 }, card: { c: '#f4f0e6', v: 0.02 }, die: { c: '#f6f2ea', v: 0.01 },
      rug: { c: '#2a4a9a', top: '#30509e', v: 0.03 }, coal: { c: '#2a2a30', v: 0.06 }, shield: { c: '#2a4a9a', v: 0.03 }, leather: { c: '#7a4a2a', v: 0.05 },
      chest: { c: '#6a4428', v: 0.05, pat: 'plank' }, waterB: { c: '#5aa0d8', v: 0.03 },
    }),
    build(R) {
      const w = HD.face(R, true);   // 설계는 1배 좌표(0.5 단위까지), 그리기는 2배 칸
      const B = w.id, G = w.base;
      MH.terrain(w, { floor: 2, height: () => G, surface: (x, z) => hash3(x, 2, z) > 0.8 ? B.cobble2 : B.cobble, under: (x, z, y, dep) => dep < 2 ? B.found : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 18, X1 = 78, Z0 = 20, Z1 = 74;        // 문루 바깥벽
      const PX0 = 42, PX1 = 54, MIDX = 48;              // 성문 통로
      const GH = G + 8;                                  // 망루 통로 바닥 높이
      const TALL = G + 17, LOW = G + 3;

      // ── 바닥: 초소·윈치 방은 체크 석판, 통로는 자갈과 푸른 행렬 길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        let b = ((x >> 1) + (z >> 1)) % 2 ? B.slab : B.slabD;
        if (x >= PX0 && x <= PX1) b = (x === PX0 || x === PX1) ? B.gold : (x === MIDX ? B.carpet : B.flagst);
        w.set(x, G, z, b);
      }
      for (let z = Z1 + 1; z < D - 4; z++) for (let x = PX0 - 1; x <= PX1 + 1; x++) w.set(x, G, z, (x === PX0 - 1 || x === PX1 + 1) ? B.whiteDk : (x === MIDX ? B.carpet : B.flagst));

      // ── 바깥벽: 북·서는 높고(화살구멍), 남·동은 낮게 잘라 속을 보인다 ──
      w.box(X0, G + 1, Z0, X1, TALL, Z0 + 1, B.white);
      w.box(X0, G + 1, Z0, X0 + 1, TALL, Z1, B.white);
      w.box(X1 - 1, G + 1, Z0 + 2, X1, LOW, Z1, B.white);
      w.box(X0, G + 1, Z1 - 1, X1, LOW, Z1, B.white);
      for (const y of [G + 1, G + 9, TALL]) { w.box(X0, y, Z0, X1, y, Z0 + 1, B.whiteDk); w.box(X0, y, Z0, X0 + 1, y, Z1, B.whiteDk); }
      for (let x = X0; x <= X1; x++) { w.set(x, LOW + 1, Z1, x % 3 === 0 ? B.trim : 0); w.set(x, LOW, Z1, B.whiteDk); }
      for (let z = Z0 + 2; z <= Z1; z++) { w.set(X1, LOW + 1, z, z % 3 === 0 ? B.trim : 0); w.set(X1, LOW, z, B.whiteDk); }
      for (let x = X0; x <= X1; x += 2) w.set(x, TALL + 1, Z0, B.trim);
      for (let z = Z0; z <= Z1; z += 2) w.set(X0, TALL + 1, z, B.trim);
      // 남쪽 벽의 성문 아치(바깥 도개교 쪽)와 북쪽 큰 문짝
      w.box(PX0, G + 1, Z1 - 1, PX1, LOW + 1, Z1, 0);
      for (const x of [PX0 - 1, PX1 + 1]) { w.box(x, G + 1, Z1 - 1, x, G + 12, Z1, B.whiteDk); w.set(x, G + 13, Z1, B.gold); }
      w.box(PX0 - 1, G + 12, Z1, PX1 + 1, G + 13, Z1, B.trim); w.box(MIDX - 1, G + 13, Z1, MIDX + 1, G + 14, Z1, B.gold);
      w.box(PX0, G + 1, Z0 + 2, PX1, GH - 1, Z0 + 2, B.door);
      for (let x = PX0; x <= PX1; x += 2) w.box(x, G + 1, Z0 + 2, x, GH - 1, Z0 + 2, B.wood);
      for (const y of [G + 2, G + 6]) w.box(PX0, y, Z0 + 3, PX1, y, Z0 + 3, B.iron);
      w.box(MIDX, G + 1, Z0 + 3, MIDX, GH - 1, Z0 + 3, B.iron);
      // 북벽 화살구멍(망루 통로 높이)
      const slits = [26, 34, 62, 70];
      for (const x of slits) { w.box(x, GH + 2, Z0, x, GH + 6, Z0 + 1, B.dark); w.set(x, GH + 7, Z0 + 1, B.trim); w.set(x, GH + 1, Z0 + 2, B.whiteDk); }
      for (const x of [30, 66]) for (const y of [G + 3]) { w.box(x, y, Z0, x, y + 3, Z0 + 1, B.dark); }

      // ── 통로 양옆 칸막이 벽(안쪽 벽) ──
      const inner = x0 => {
        w.box(x0, G + 1, Z0 + 2, x0 + 1, G + 5, Z1 - 2, B.white); w.box(x0, G + 1, Z0 + 2, x0 + 1, G + 1, Z1 - 2, B.whiteDk); w.box(x0, G + 5, Z0 + 2, x0 + 1, G + 5, Z1 - 2, B.trim);
        for (let z = Z0 + 3; z <= Z1 - 2; z += 2) w.set(x0 + (x0 < MIDX ? 0 : 1), G + 6, z, B.trim);
        w.box(x0, G + 1, Z0 + 2, x0 + 1, GH - 1, 30, B.white); w.box(x0, G + 1, 43, x0 + 1, GH - 1, 47, B.white); w.box(x0, GH - 1, 43, x0 + 1, GH - 1, 47, B.trim);
      };
      inner(PX0 - 2); inner(PX1 + 1);
      // 칸막이 문(통로 ↔ 초소, 통로 ↔ 윈치 방)
      for (const x0 of [PX0 - 2, PX1 + 1]) {
        w.box(x0, G + 1, 58, x0 + 1, G + 4, 60, 0);
        w.box(x0, G + 5, 57, x0 + 1, G + 5, 61, B.trim); w.box(x0, G + 1, 57, x0 + 1, G + 4, 57, B.whiteDk); w.box(x0, G + 1, 61, x0 + 1, G + 4, 61, B.whiteDk);
      }
      // 쇠창살 홈: 통로를 가로지르는 두 겹 돌 들보
      for (const z of [44, 46]) { w.box(PX0 - 2, GH - 1, z, PX1 + 2, GH + 1, z, B.whiteDk); w.box(PX0, GH - 2, z, PX1, GH - 2, z, B.trim); }
      w.box(PX0 - 2, GH + 2, 44, PX1 + 2, GH + 2, 46, B.trim);
      // 쇠창살(부품): 처음엔 들보 위로 걷혀 있다
      const port = w.prop({ name: 'port', pivot: [MIDX + 0.5, G + 1, 45.5], off0: [0, 9, 0] });
      // (2배 칸) 가는 세로살(앞)과 가로살(뒤)을 엮고, 아래 끝은 금 창끝
      for (let X = PX0 * 2; X <= PX1 * 2 + 1; X++) for (let Y = (G + 1) * 2; Y <= (GH - 3) * 2 + 1; Y++) {
        const ry = Y - (G + 1) * 2, side = X === PX0 * 2 || X === PX1 * 2 + 1, vb = (X - PX0 * 2) % 3 === 1 || side, hb = ry % 5 === 4 || Y >= (GH - 3) * 2;
        if (vb) port.R.set(X, Y, 91, ry < 2 && !side ? B.gold : B.iron);
        if (hb && ry > 2) port.R.set(X, Y, 90, B.iron);
      }
      // 통로 벽 등잔
      for (const [x, z] of [[PX0, 34], [PX1, 34], [PX0, 66], [PX1, 66]]) { w.set(x, G + 6, z, B.iron); w.set(x, G + 7, z, B.candle); }
      lights.push({ p: [PX0 + 1.5, G + 7, 34.5], c: '#ffd890', i: 0.9, d: 18, flicker: 0.15 });
      lights.push({ p: [PX1 - 0.5, G + 7, 66.5], c: '#ffd890', i: 0.9, d: 18, flicker: 0.15 });

      // ── 망루 통로(북쪽 위층): 서쪽 계단으로 올라 통로 위 다리를 건너 동쪽 봉화대까지 ──
      w.box(X0 + 2, GH, Z0 + 2, X1 - 2, GH, 30, B.plank);
      w.box(X0 + 2, GH - 1, 30, X1 - 2, GH - 1, 30, B.whiteDk);
      for (let x = X0 + 2; x <= X1 - 2; x++) { if (x >= 22 && x <= 24) continue; w.set(x, GH + 1, 30, x % 3 === 0 ? B.trim : B.iron); if (x % 3 === 0) w.set(x, GH + 2, 30, B.gold); }
      for (const x of [PX0 - 1, PX1 + 1]) { w.box(x, G + 1, 30, x, GH - 1, 30, B.white); }
      // 계단(초소 서쪽 벽을 따라 북쪽으로 오른다)
      for (let s = 1; s <= 8; s++) { const z = 39 - s; w.box(22, G + 1, z, 24, G + s, z, B.whiteDk); w.box(22, G + s, z, 24, G + s, z, s % 2 ? B.slab : B.trim); }
      for (let s = 1; s <= 8; s++) { w.set(25, G + s + 1, 39 - s, B.iron); }
      w.box(25, G + 1, 31, 25, G + 9, 31, B.iron);
      // 위층 아래 창고: 통, 상자, 화살 다발
      for (const [x, z] of [[27, 23], [29, 23], [27, 25], [31, 23]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.barrel);
      for (const [x, z] of [[34, 23], [36, 23], [34, 26]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate);
      for (const [x, z] of [[60, 23], [62, 23], [64, 23], [60, 26]]) w.box(x, G + 1, z, x + 1, G + 2, z + 1, (x + z) % 4 ? B.crate : B.barrel);
      for (const x of [68, 70, 72]) { w.box(x, G + 1, 24, x, G + 3, 24, B.wood); w.set(x, G + 4, 24, B.steel); }

      // ── 수비대 초소(서쪽): 화로, 경비 탁자, 이층 침상, 창 걸이 ──
      // 화로(서쪽 벽)
      w.box(X0 + 2, G + 1, 47, X0 + 3, G + 8, 55, B.hearth); w.box(X0 + 3, G + 1, 49, X0 + 3, G + 4, 53, 0);
      w.box(X0 + 3, G + 1, 49, X0 + 3, G + 1, 53, B.coal); w.box(X0 + 3, G + 2, 50, X0 + 3, G + 3, 52, B.fire); w.set(X0 + 3, G + 4, 51, B.ember);
      w.box(X0 + 4, G + 5, 47, X0 + 4, G + 5, 55, B.trim); w.box(X0 + 2, G + 9, 48, X0 + 3, TALL, 54, B.hearth);
      w.box(X0 + 4, G + 1, 48, X0 + 4, G + 1, 48, B.iron); w.box(X0 + 4, G + 1, 54, X0 + 4, G + 1, 54, B.iron);
      w.box(X0 + 4, G + 6, 50, X0 + 4, G + 8, 52, B.shield); w.set(X0 + 4, G + 7, 51, B.gold); w.set(X0 + 4, G + 8, 51, B.gold);   // 왕실 문장 방패
      lights.push({ name: 'hearth', p: [X0 + 5, G + 3, 51.5], c: '#ff9a40', i: 1.5, d: 20, flicker: 0.35 });
      // 융단과 경비 탁자, 의자, 술잔
      for (let z = 46; z <= 58; z++) for (let x = 26; x <= 36; x++) w.set(x, G, z, (x === 26 || x === 36 || z === 46 || z === 58) ? B.gold : B.rug);
      w.box(28, G + 1, 49, 34, G + 2, 55, B.table); w.box(29, G + 1, 50, 33, G + 1, 54, 0);
      for (const z of [50, 52, 54]) { w.set(27, G + 1, z, B.bench); w.set(35, G + 1, z, B.bench); }
      for (const x of [29, 31, 33]) { w.set(x, G + 1, 48, B.bench); w.set(x, G + 1, 56, B.bench); }
      for (const [x, z] of [[29, 50], [33, 54], [30, 54]]) { w.set(x, G + 3, z, B.mug); }
      w.set(33, G + 3, 50, B.ale); w.box(31, G + 3, 50, 32, G + 3, 50, B.card); w.set(29, G + 3, 53, B.card);
      w.box(31, G + 3, 55, 31, G + 4, 55, B.gold); w.set(31, G + 5, 55, B.candle);
      lights.push({ p: [31.5, G + 6, 54.5], c: '#ffd890', i: 0.9, d: 14, flicker: 0.2 });
      // 주사위(부품 셋)
      const dice = [[30, 52], [32, 52], [31, 53]];
      dice.forEach(([x, z], k) => { const p = w.prop({ name: 'die' + k, pivot: [x + 0.5, G + 3.5, z + 0.5] }); p.set(x, G + 3, z, B.die); });
      // 이층 침상(남서쪽)
      for (const z0 of [62, 67]) {
        w.box(X0 + 2, G + 1, z0, X0 + 6, G + 1, z0 + 3, B.wood); w.box(X0 + 2, G + 2, z0, X0 + 6, G + 2, z0 + 3, B.straw); w.box(X0 + 3, G + 2, z0 + 1, X0 + 6, G + 2, z0 + 2, B.blanket);
        w.box(X0 + 2, G + 5, z0, X0 + 6, G + 5, z0 + 3, B.wood); w.box(X0 + 3, G + 6, z0 + 1, X0 + 6, G + 6, z0 + 2, B.blanket); w.set(X0 + 2, G + 6, z0 + 1, B.straw);
        for (const [x, z] of [[X0 + 2, z0], [X0 + 6, z0], [X0 + 2, z0 + 3], [X0 + 6, z0 + 3]]) w.box(x, G + 1, z, x, G + 6, z, B.wood);
      }
      // 침상 발치 궤짝, 물통, 장작 더미, 열쇠 걸이
      for (const z of [63, 68]) { w.box(X0 + 7, G + 1, z, X0 + 8, G + 1, z + 1, B.chest); w.box(X0 + 7, G + 2, z, X0 + 8, G + 2, z + 1, B.wood); w.set(X0 + 8, G + 2, z, B.gold); }
      w.cyl(25, 44, G + 1, G + 2, 1, B.barrel); w.set(25, G + 3, 44, B.waterB);
      for (let z = 56; z <= 58; z++) w.box(X0 + 2, G + 1, z, X0 + 3, G + 1 + (z % 2), z, B.wood);
      w.box(PX0 - 3, G + 3, 62, PX0 - 3, G + 3, 66, B.wood); for (const z of [62, 64, 66]) w.set(PX0 - 4, G + 2, z, B.gold);
      // 투구 선반(서쪽 벽)
      w.box(X0 + 2, G + 5, 40, X0 + 2, G + 5, 45, B.wood);
      for (const z of [40, 42, 44]) { w.set(X0 + 3, G + 6, z, B.steel); w.set(X0 + 3, G + 7, z, B.steel); }
      // 창 걸이(칸막이 벽 쪽): 창 다섯 자루(부품)
      w.box(PX0 - 3, G + 1, 40, PX0 - 3, G + 1, 50, B.wood); w.box(PX0 - 3, G + 5, 40, PX0 - 3, G + 5, 50, B.wood);
      const spears = w.prop({ name: 'spears', pivot: [PX0 - 3.5, G + 2, 45.5] });
      for (let z = 41; z <= 49; z += 2) { spears.box(PX0 - 4, G + 2, z, PX0 - 4, G + 7, z, B.wood); spears.set(PX0 - 4, G + 8, z, B.steel); spears.set(PX0 - 4, G + 9, z, B.steel); }
      // 나팔 거치대(망루 통로 서쪽)
      w.box(30, GH + 1, 24, 30, GH + 4, 24, B.wood); w.box(29, GH + 1, 23, 31, GH + 1, 25, B.whiteDk);
      const horn = w.prop({ name: 'horn', pivot: [30.5, GH + 5, 24.5] });
      horn.box(28, GH + 5, 24, 32, GH + 5, 24, B.brass); horn.box(33, GH + 4, 24, 33, GH + 6, 24, B.brass); horn.set(27, GH + 5, 24, B.gold); horn.set(30, GH + 6, 24, B.leather);
      // 화살구멍 덧문(부품): 안쪽에서 옆으로 밀어 연다
      slits.forEach((x, k) => { const p = w.prop({ name: 'shut' + k, pivot: [x + 0.5, GH + 4, Z0 + 2.5] }); p.box(x, GH + 2, Z0 + 2, x, GH + 6, Z0 + 2, B.door); p.set(x, GH + 4, Z0 + 2, B.iron); });

      // ── 쇠창살 감기 방(동쪽): 큰 윈치 북과 바퀴, 도개교 사슬 감개 ──
      const WZ = 46, WY = G + 4;
      for (const x of [58, 73]) { w.box(x, G + 1, WZ - 1, x, WY + 1, WZ + 1, B.wood); w.box(x, G + 1, WZ - 2, x, G + 1, WZ + 2, B.whiteDk); w.set(x, WY + 2, WZ, B.iron); }
      const winch = w.prop({ name: 'winch', pivot: [65.5, WY + 0.5, WZ + 0.5], axis: 'x' });
      // (2배 칸) 윈치 북: 나무 심, 감긴 쇠사슬 고리(한 줄씩 엇갈림), 양끝 쇠테 / 큰 바퀴: 테·바퀴살 여덟·손잡이 말뚝
      {
        const cy = WY * 2 + 1, cz = WZ * 2 + 1, WR = winch.R;
        for (let X = 120; X <= 143; X++) for (let Y = cy - 6; Y <= cy + 6; Y++) for (let Z = cz - 6; Z <= cz + 6; Z++) {
          const dy = Y + 0.5 - cy, dz = Z + 0.5 - cz, r = Math.hypot(dy, dz); if (r > 4.9) continue;
          const end = X <= 121 || X >= 142, link = ((X >> 1) + Math.round((Math.atan2(dy, dz) + Math.PI) * 3)) & 1;
          WR.set(X, Y, Z, end ? (r > 3.4 ? B.iron : B.wood) : r < 3 ? B.wood : link ? B.chain : B.iron);
        }
        for (const X0 of [118, 144]) for (let Y = cy - 10; Y <= cy + 10; Y++) for (let Z = cz - 10; Z <= cz + 10; Z++) {
          if (Y < (G + 1) * 2) continue;
          const dy = Y + 0.5 - cy, dz = Z + 0.5 - cz, r = Math.hypot(dy, dz), a = Math.atan2(dy, dz);
          const spoke = r < 7 && Math.abs(Math.sin(a * 4)) * r < 0.8, rim = r > 7 && r <= 9, hub = r < 1.8;
          if (!(spoke || rim || hub)) continue;
          WR.set(X0, Y, Z, rim ? ((Math.round(a * 8) & 1) ? B.wood : B.plank) : hub ? B.iron : B.plank); WR.set(X0 + 1, Y, Z, rim ? B.wood : hub ? B.iron : B.plank);
        }
        for (const X0 of [118, 145]) for (const [dz, dy] of [[0, 9.5], [9.5, 0], [0, -9.5], [-9.5, 0], [6.7, 6.7], [-6.7, 6.7], [6.7, -6.7], [-6.7, -6.7]]) {
          const Y = Math.floor(cy + dy), Z = Math.floor(cz + dz); if (Y < (G + 1) * 2) continue;
          const o = X0 < 130 ? -1 : 1; WR.set(X0 + o, Y, Z, B.wood); WR.set(X0 + 2 * o, Y, Z, B.iron);
        }
      }
      // 쇠사슬: 북에서 들보를 넘어 쇠창살로
      w.line(65, WY + 3, WZ, 60, GH + 3, WZ, B.chain); w.box(PX1 + 1, GH + 3, WZ, 59, GH + 3, WZ, B.chain); w.box(PX0, GH + 3, WZ - 1, PX1, GH + 3, WZ - 1, B.chain);
      w.box(PX1 + 1, GH, WZ, PX1 + 2, GH + 2, WZ, B.iron);
      lights.push({ p: [65.5, G + 8, 40.5], c: '#ffd890', i: 0.8, d: 16, flicker: 0.15 });
      w.box(65, G + 1, 38, 65, G + 6, 38, B.iron); w.set(65, G + 7, 38, B.candle); w.box(64, G + 1, 37, 66, G + 1, 39, B.whiteDk);
      // 도개교 사슬 감개(세운 캡스턴)
      const CX = 66, CZ = 62;
      w.cyl(CX, CZ, G + 1, G + 1, 2.2, B.whiteDk);
      const cap = w.prop({ name: 'capstan', pivot: [CX + 0.5, G + 2, CZ + 0.5] });
      cap.cyl(CX, CZ, G + 2, G + 5, 1.2, B.wood); cap.cyl(CX, CZ, G + 6, G + 6, 1.6, B.iron); cap.set(CX, G + 7, CZ, B.gold);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let s = 2; s <= 5; s++) cap.set(CX + dx * s, G + 4, CZ + dz * s, s === 5 ? B.iron : B.wood);
      for (let k = 0; k < 10; k++) { const a = k * 0.63; cap.set(Math.round(CX + Math.cos(a) * 1.6), G + 2 + (k % 3), Math.round(CZ + Math.sin(a) * 1.6), B.chain); }
      w.box(CX, G + 2, CZ + 6, CX, G + 2, Z1 - 2, B.chain); w.box(CX, G + 1, Z1 - 2, CX, LOW, Z1 - 2, B.iron);
      // 사슬 더미, 기름통, 공구
      for (const [x, z] of [[74, 54], [74, 56], [73, 55]]) w.set(x, G + 1, z, B.chain);
      w.box(60, G + 1, 66, 61, G + 2, 67, B.barrel); w.box(60, G + 1, 69, 62, G + 1, 70, B.crate); w.set(61, G + 2, 69, B.iron);

      // ── 봉화대(망루 통로 동쪽 끝) ──
      const BX = 71, BZ = 25;
      w.box(BX - 3, GH + 1, BZ - 3, BX + 3, GH + 1, BZ + 3, B.whiteDk); w.cyl(BX, BZ, GH + 2, GH + 3, 1.2, B.iron);
      w.cyl(BX, BZ, GH + 4, GH + 4, 2.6, B.iron); w.ring(BX, BZ, GH + 5, 1.6, 2.6, B.iron);
      w.cyl(BX, BZ, GH + 5, GH + 5, 1.6, B.coal); w.cyl(BX, BZ, GH + 6, GH + 6, 1.2, B.fire); w.set(BX, GH + 7, BZ, B.ember);
      lights.push({ name: 'beacon', p: [BX + 0.5, GH + 8, BZ + 0.5], c: '#ff9a3a', i: 1.4, d: 26, flicker: 0.4 });
      landmarks.push({ name: '봉화대', note: '망루 통로 끝의 봉화 화로', p: [BX + 0.5, GH + 14, BZ + 0.5] });
      landmarks.push({ name: '쇠창살 윈치', note: '쇠창살을 감아올리는 큰 북', p: [65.5, G + 14, WZ + 0.5] });
      landmarks.push({ name: '수비대 초소', note: '화로와 경비 탁자, 침상', p: [30.5, G + 14, 52.5] });

      // ── 남쪽 출입문(초소): 왕성 앞 광장으로 ──
      const DX0 = 29, DX1 = 31;
      w.box(DX0, G + 1, Z1 - 1, DX1, LOW + 1, Z1, 0);
      w.box(DX0, G + 1, Z1, DX1, G + 5, Z1, B.door); w.box(DX0 + 1, G + 1, Z1, DX0 + 1, G + 5, Z1, B.wood); w.set(DX1, G + 3, Z1 - 1, B.iron);
      for (const x of [DX0 - 1, DX1 + 1]) w.box(x, G + 1, Z1 - 1, x, G + 6, Z1, B.trim);
      w.box(DX0 - 1, G + 6, Z1 - 1, DX1 + 1, G + 7, Z1, B.whiteDk); w.set(DX0 + 1, G + 7, Z1, B.gold);
      w.set(DX1 + 2, G + 5, Z1 - 2, B.iron); w.set(DX1 + 2, G + 6, Z1 - 2, B.candle);
      lights.push({ p: [DX1 + 2.5, G + 6, Z1 - 1.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.15 });
      acts.push(OR.goAct({ at: [DX0 + 1, G + 1, Z1 - 3], h: 4, name: '성문 광장으로 나가기', goto: 'castlegate', hint: '쪽문을 열고 성문 통로를 지나 선왕 석상이 늘어선 왕성 앞 광장으로 나가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 5, Z1] }));

      // ── 상호작용 ──
      acts.push({
        name: '쇠창살 감기', hint: '윈치 북을 풀자 쇠창살이 통로로 쿵 내려앉았다가 사슬이 감기며 다시 올라가요', hit: [58, G + 1, WZ - 4, 73, WY + 4, WZ + 4],
        run: async a => {
          await Promise.all([a.move('port', [0, 0, 0], 1.2, t => t * t), a.turn('winch', [-Math.PI * 2, 0, 0], 1.2)]);
          a.burst([MIDX + 0.5, G + 1.2, 45.5], { n: 40, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 1, gravity: 3, spread: 6, flat: true });
          await a.wait(1.4);
          await Promise.all([a.move('port', [0, 9, 0], 3, t => t), a.turn('winch', [0, 0, 0], 3, t => t)]);
          a.burst([65.5, WY + 3, WZ + 0.5], { n: 16, colors: ['#ffe8a0', '#ffffff'], speed: 2, up: 2, life: 0.8, gravity: 1, spread: 2 });
        },
      });
      acts.push({
        name: '도개교 사슬 감개', hint: '캡스턴이 빙글빙글 돌며 도개교 사슬을 감아요', hit: [CX - 5, G + 1, CZ - 5, CX + 5, G + 7, CZ + 5],
        run: async a => {
          await a.turn('capstan', [0, Math.PI * 3, 0], 3.2); a.unwind('capstan');
          for (let k = 0; k < 4; k++) { a.burst([CX + 0.5, G + 2.5, Z1 - 3], { n: 10, colors: ['#8a8a94', '#d8d4ca'], speed: 2, up: 1, life: 0.8, gravity: 2, spread: 1.5 }); await a.wait(0.25); }
          await a.turn('capstan', [0, -Math.PI * 0.5, 0], 1); await a.turn('capstan', [0, 0, 0], 0.8);
        },
      });
      acts.push({
        name: '경비 교대 나팔', hint: '거치대의 놋쇠 나팔이 들려 올라 교대를 알리는 소리가 문루에 울려 퍼져요', hit: [27, GH + 1, 22, 33, GH + 6, 26],
        run: async a => {
          await a.tween('horn', { off: [0, 2.5, 0], rot: [0, 0, 0.5] }, 0.8);
          for (let k = 0; k < 4; k++) { a.burst([34, GH + 9, 24.5], { n: 18, colors: ['#ffe8a0', '#ffffff', '#d8a84a'], speed: 6, up: 1, life: 1, gravity: 0, spread: 1, flat: true }); await a.wait(0.45); }
          await a.tween('horn', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.9);
        },
      });
      acts.push({
        name: '봉화 올리기', hint: '봉화 화로에 기름을 붓자 불길이 높이 치솟아 밤하늘로 불티가 날아올라요', hit: [BX - 3, GH + 1, BZ - 3, BX + 3, GH + 7, BZ + 3],
        run: async a => {
          a.flash('beacon', 4, 4.5); a.glow(1.5, 4);
          for (let k = 0; k < 9; k++) { a.burst([BX + 0.5, GH + 7, BZ + 0.5], { n: 34, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3, up: 9, life: 1.6, gravity: -1, spread: 1.6 }); await a.wait(0.45); }
        },
      });
      acts.push({
        name: '화살구멍 엿보기', hint: '화살구멍 덧문이 차례로 밀려 열리며 바깥 달빛이 가늘게 새어 들어와요', hit: [24, GH + 1, Z0 + 2, 72, GH + 6, Z0 + 3],
        run: async a => {
          for (let k = 0; k < slits.length; k++) { a.move('shut' + k, [2, 0, 0], 0.6); await a.wait(0.3); }
          await a.wait(0.4);
          for (let q = 0; q < 6; q++) { slits.forEach(x => a.burst([x + 0.5, GH + 4, Z0 + 3 + q], { n: 5, colors: ['#e8f0ff', '#c8d8ff'], speed: 0.4, up: 0.2, life: 1.2, gravity: 0.3, spread: 0.6 })); await a.wait(0.3); }
          await a.wait(0.6);
          await Promise.all(slits.map((x, k) => a.move('shut' + k, [0, 0, 0], 0.7)));
        },
      });
      acts.push({
        name: '창 걸이 점검', hint: '걸이에 세운 창 다섯 자루가 들썩 올라갔다 철컥 내려앉아요', hit: [PX0 - 4, G + 1, 40, PX0 - 3, G + 9, 50],
        run: async a => {
          for (let k = 0; k < 2; k++) { await a.move('spears', [0, 2, 0], 0.35); await a.move('spears', [0, 0, 0], 0.25); a.burst([PX0 - 3.5, G + 9, 45.5], { n: 14, colors: ['#ffffff', '#aab0bc'], speed: 3, up: 1, life: 0.6, gravity: 2, spread: 4 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '주사위 놀이', hint: '경비 탁자 위 주사위 세 알이 높이 튀어 올라 빙글 돌다 떨어져요', hit: [28, G + 1, 49, 34, G + 4, 55],
        run: async a => {
          await Promise.all(dice.map((d, k) => a.tween('die' + k, { off: [0, 3 + k * 0.6, 0], rot: [Math.PI * (2 + k), Math.PI * 1.5, 0] }, 0.6)));
          await Promise.all(dice.map((d, k) => a.tween('die' + k, { off: [0, 0, 0], rot: [0, 0, 0] }, 0.5, t => t * t)));
          a.burst([31.5, G + 3.5, 52.5], { n: 16, colors: ['#ffe8a0', '#ffffff'], speed: 2, up: 1.5, life: 0.8, gravity: 1, spread: 1.5 });
          a.flash('hearth', 1.8, 1);
        },
      });
      HD.syncHM(w);
      return HD.out({ lights, landmarks, acts });
    },
  });
})();
