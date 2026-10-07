// 성 내부 — 지붕을 걷어 낸 왕성 본관: 알현실, 현관 홀, 연회장과 주방, 서고, 보물고, 무기고, 남쪽 달빛 정원과 유리 온실 (176칸)
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
  const W = 176, D = 176, Hh = 96;
  MAPS.push({
    id: 'innerkeep', cat: 'kingdom', name: '성 내부', en: 'Inner Keep', color: '#e8c04a', seed: 251, base: 44, time: 'night', size: [W * 2, D * 2, Hh * 2], playerScale: 2,
    desc: '지붕을 걷어 내고 들여다본 왕성 본관. 알현실의 붉은 융단이 왕좌까지 곧게 뻗어 있다. 정문 밖 남쪽에는 백조 연못과 유리 온실이 있는 달빛 정원이 펼쳐진다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕성 본관 1층'], ['명물', '알현실 · 왕실 서고 · 보물고'], ['새 구역', '달빛 정원 · 유리 온실'], ['소문', '보물고 열쇠는 왕관 안쪽에 숨겨져 있다']] },
    sky: ['#2a2238', '#0e0c18', '#5a4468'], stars: true,
    hemi: ['#d8c8e8', '#2a2030', 0.5], sun: ['#c8c0f0', 0.42, [0.5, 1, 0.55]],
    day: { sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false, hemi: ['#ffffff', '#5a5a60', 0.62], sun: ['#fff4e0', 0.8, [0.5, 1, 0.55]] },
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
    fog: { start: 0.84, floor: 24, depth: 20, box: [176, 184, 192, 200] },
    camY: -12, zoom: 1.1,
    particles: [
      { n: 160, colors: ['#ffe8c0', '#fff4e0'], mode: 'drift', speed: 0.4, y0: 52, y1: 108, glow: false },
      { n: 70, colors: ['#c8ff8a', '#fff4a0'], mode: 'drift', speed: 0.6, area: [176, 316, 140], y0: 48, y1: 68, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      tile: { c: '#9a9aa4', top: '#c4c0cc', v: 0.04, pat: 'check', alt: '#8a8694' }, marble: { c: '#e8e4ec', top: '#f0ecf2', v: 0.03, pat: 'check', alt: '#3a3848' },
      plankF: { c: '#7a5434', top: '#946a44', v: 0.06, pat: 'plank' }, kfloor: { c: '#8a8680', top: '#a09a90', v: 0.08, pat: 'stone' },
      cut: { c: '#32303c', v: 0.02 }, carpet: { c: '#a02a34', top: '#a82c36', v: 0.03 }, carpetG: { c: '#d8a83a', top: '#e0b040', v: 0.03 }, cushion: { c: '#3a5ab0', v: 0.03 },
      table: { c: '#7a4a2a', v: 0.05, pat: 'plank' }, chair: { c: '#4a2e1c', v: 0.04 }, plate: { c: '#f4f0e8', v: 0.02 }, cloth: { c: '#f0ece0', v: 0.02 },
      food: { c: '#c86a2a', v: 0.1 }, food2: { c: '#8aa83a', v: 0.08 }, wine: { c: '#6a1a2a', v: 0.03 },
      book1: { c: '#8a2a2a', v: 0.05 }, book2: { c: '#2a4a7a', v: 0.05 }, book3: { c: '#3a6a3a', v: 0.05 }, book4: { c: '#8a6a2a', v: 0.05 }, shelf: { c: '#5a3a24', v: 0.04 },
      globe: { c: '#3a7ab0', v: 0.1 }, chest: { c: '#6a4428', v: 0.05, pat: 'plank' }, steel: { c: '#aab0bc', v: 0.04 }, hearth: { c: '#5a5660', v: 0.06, pat: 'brick' },
      glassR: { c: '#ff5a6a', glow: true }, glassB: { c: '#6aa8ff', glow: true }, glassY: { c: '#ffd070', glow: true },
      candle: { c: '#ffe2a0', glow: true }, fire: { c: '#ff9a3a', glow: true }, gemR: { c: '#ff3a5a', glow: true }, gemB: { c: '#5ac8ff', glow: true }, coin: { c: '#ffd860', glow: true },
      rug: { c: '#3a4a8a', top: '#3e4e90', v: 0.03 }, rugB: { c: '#c8a050', top: '#d0a850', v: 0.03 }, copper: { c: '#b8683a', v: 0.06 }, goldDk: { c: '#b8902a', v: 0.04 }, doorDk: { c: '#3a2c1e', v: 0.03 },
      gravel: { c: '#8a8478', top: '#b8b0a0', v: 0.08, pat: 'stone' }, swan: { c: '#f8f8f4', v: 0.02 }, beak: { c: '#f08a30', v: 0.03 },
      glassC: { c: '#8ad8c8', night: true, day: '#a8d0e0' }, moonP: { c: '#e8f0ff', glow: true }, moonC: { c: '#fff4a0', glow: true }, lily: { c: '#3a7a4a', v: 0.06 },
    }),
    build(R) {
      const w = HD.face(R, true);   // 설계는 1배 좌표(0.5 단위까지), 그리기는 2배 칸
      const B = w.id, base = w.base, F = base + 2, Y = F + 1, WH = 12;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => ((x - 40) / 17) ** 2 + ((z - 161) / 8) ** 2 < 1 ? base - 2 : base + 1,
        surface: (x, z) => hash3(x, 1, z) > 0.5 ? B.grass : B.grass2, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock,
      });
      MH.water(w, base, (x, z) => z > 145);
      const X0 = 16, X1 = 140, Z0 = 14, Z1 = 138, MX = 78;
      MH.flatten(w, X0 - 3, Z0 - 3, X1 + 3, Z1 + 2, F, B.tile, B.found);
      const lights = [], acts = [], landmarks = [];
      const floor = (x0, z0, x1, z1, b) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) w.set(x, F, z, b); };
      const wall = (x0, z0, x1, z1, h) => { const t = Y + (h || WH) - 1; w.box(x0, Y, z0, x1, t, z1, B.white); w.box(x0, t, z0, x1, t, z1, B.cut); w.box(x0, Y, z0, x1, Y, z1, B.whiteDk); w.box(x0, Y + 7, z0, x1, Y + 7, z1, B.whiteDk); };
      const gap = (x0, z0, x1, z1, h) => w.box(x0, Y, z0, x1, Y + (h || 8), z1, 0);
      const doorTrim = (x0, z0, x1, z1, h) => { const hx = x1 - x0 > z1 - z0; if (hx) { w.box(x0 - 1, Y, z0, x0 - 1, Y + h, z1, B.trim); w.box(x1 + 1, Y, z0, x1 + 1, Y + h, z1, B.trim); w.box(x0 - 1, Y + h + 1, z0, x1 + 1, Y + h + 1, z1, B.trim); } else { w.box(x0, Y, z0 - 1, x1, Y + h, z0 - 1, B.trim); w.box(x0, Y, z1 + 1, x1, Y + h, z1 + 1, B.trim); w.box(x0, Y + h + 1, z0 - 1, x1, Y + h + 1, z1 + 1, B.trim); } };
      const candelabra = (x, z, lit) => { w.box(x, Y, z, x, Y + 5, z, B.gold); w.box(x - 1, Y + 5, z, x + 1, Y + 5, z, B.gold); w.box(x, Y + 5, z - 1, x, Y + 5, z + 1, B.gold); w.set(x, Y + 6, z, B.candle); w.set(x - 1, Y + 6, z, B.candle); w.set(x + 1, Y + 6, z, B.candle); w.set(x, Y + 6, z - 1, B.candle); w.set(x, Y + 6, z + 1, B.candle); w.box(x - 1, Y, z - 1, x + 1, Y, z + 1, B.gold); if (lit) lights.push({ name: lit === true ? undefined : lit, p: [x + 0.5, Y + 7, z + 0.5], c: '#ffd890', i: 1.3, d: 20, flicker: 0.2 }); };
      const sconce = (x, z, dx, dz) => { w.set(x + dx, Y + 6, z + dz, B.iron); w.set(x + dx, Y + 7, z + dz, B.candle); };
      // ── 바깥벽과 칸막이 ──
      wall(X0, Z0, X1, Z0 + 1); wall(X0, Z1 - 1, X1, Z1); wall(X0, Z0, X0 + 1, Z1); wall(X1 - 1, Z0, X1, Z1);
      wall(47, Z0, 48, Z1); wall(108, Z0, 109, Z1);            // 서·동 익랑을 가르는 벽
      wall(48, 73, 108, 74);                                    // 알현실 / 현관 홀
      wall(X0, 86, 47, 87); wall(109, 76, X1, 77); wall(109, 111, X1, 112);
      w.box(49, Y + WH, Z0, 107, Y + WH + 9, Z0 + 1, B.white); w.box(49, Y + WH + 9, Z0, 107, Y + WH + 9, Z0 + 1, B.cut);   // 알현실 북벽(장미창 벽)
      gap(74, Z1 - 1, 82, Z1, 9);                               // 정문
      for (const [a, b, c, d] of [[47, 48, 52, 56], [47, 48, 104, 108], [108, 109, 40, 44], [108, 109, 92, 96], [108, 109, 122, 126]]) { gap(a, c, b, d); doorTrim(a, c, b, d, 8); }
      gap(28, 86, 34, 87); doorTrim(28, 86, 34, 87, 8);
      // 바깥벽 창(남·동 면 — 바깥쪽에서 보이는 창틀)
      for (let x = X0 + 6; x <= X1 - 6; x += 8) { if (x > 68 && x < 88) continue; w.box(x, Y + 3, Z1, x + 1, Y + 7, Z1, B.win); w.box(x - 1, Y + 2, Z1 + 1, x + 2, Y + 2, Z1 + 1, B.whiteDk); w.box(x, Y + 8, Z1 + 1, x + 1, Y + 8, Z1 + 1, B.trim); }
      for (let z = Z0 + 6; z <= Z1 - 6; z += 8) { w.box(X1, Y + 3, z, X1, Y + 7, z + 1, B.win); w.box(X1 + 1, Y + 2, z - 1, X1 + 1, Y + 2, z + 2, B.whiteDk); w.box(X1 + 1, Y + 8, z, X1 + 1, Y + 8, z + 1, B.trim); }
      // 모서리 탑(나선 계단)
      for (const [tx, tz] of [[X0, Z0], [X1, Z0], [X0, Z1], [X1, Z1]]) {
        w.cyl(tx, tz, Y, Y + WH + 3, 6.6, B.white); w.cyl(tx, tz, Y, Y + WH + 3, 5, 0); w.cyl(tx, tz, F, F, 5, B.kfloor);
        w.ring(tx, tz, Y + WH + 3, 5, 6.6, B.cut); w.ring(tx, tz, Y + 7, 6.2, 7.2, B.whiteDk); w.ring(tx, tz, Y, 6.2, 7.4, B.whiteDk);
        for (let i = 0; i < 30; i++) { const a = i * 0.45; w.set(Math.round(tx + Math.cos(a) * 3.2), Y + Math.floor(i / 2), Math.round(tz + Math.sin(a) * 3.2), B.found); w.set(Math.round(tx + Math.cos(a) * 3.8), Y + Math.floor(i / 2), Math.round(tz + Math.sin(a) * 3.8), B.found); }
        w.box(tx, Y, tz, tx, Y + 15, tz, B.found);
      }
      // ── 알현실 ──
      floor(49, Z0 + 2, 107, 72, B.marble);
      for (let z = 24; z <= 72; z++) for (let x = 74; x <= 82; x++) w.set(x, F, z, (x === 74 || x === 82) ? B.carpetG : B.carpet);
      for (let s = 0; s < 4; s++) w.box(63 + s, Y + s, Z0 + 2, 93 - s, Y + s, 25 - s, s % 2 ? B.gold : B.white);
      const ty = Y + 4, TX = MX;
      // (2배 칸) 왕좌: 굽돌, 금 테 앉음판과 푸른 방석, 두루마리 팔걸이, 단추 박힌 높은 등받이, 왕관꼴 머리 장식과 보석
      {
        const cx = TX * 2 + 1, tY = ty * 2;
        R.box(cx - 7, tY, 32, cx + 6, tY, 39, B.gold); R.box(cx - 7, tY, 39, cx + 6, tY, 39, B.goldDk);
        R.box(cx - 5, tY + 1, 33, cx + 4, tY + 3, 39, B.gold); R.box(cx - 4, tY + 3, 34, cx + 3, tY + 3, 39, B.cushion); R.box(cx - 4, tY + 4, 35, cx + 3, tY + 4, 38, B.cushion);
        R.box(cx - 4, tY + 1, 39, cx + 3, tY + 2, 39, B.goldDk); R.set(cx - 1, tY + 2, 40, B.gemR); R.set(cx, tY + 2, 40, B.gemR);
        for (const ax of [cx - 7, cx + 5]) {
          R.box(ax, tY + 1, 33, ax + 1, tY + 5, 38, B.gold); R.box(ax, tY + 6, 33, ax + 1, tY + 6, 39, B.goldDk);
          R.box(ax, tY + 5, 39, ax + 1, tY + 7, 40, B.gold); R.box(ax, tY + 1, 39, ax + 1, tY + 1, 40, B.gold); R.box(ax, tY + 2, 39, ax + 1, tY + 4, 39, B.goldDk);
        }
        R.box(cx - 6, tY + 1, 31, cx + 5, tY + 19, 33, B.gold);
        for (let y = tY + 5; y <= tY + 17; y++) for (let x = cx - 4; x <= cx + 3; x++) R.set(x, y, 34, (y - tY) % 4 === 1 && (x - cx + 8) % 3 === 1 ? B.goldDk : B.cushion);
        for (let x = cx - 6; x <= cx + 5; x++) { const d = Math.abs(x + 0.5 - cx), h = Math.round(9 * (1 - (d / 6.6) ** 2)); R.box(x, tY + 20, 31, x, tY + 20 + h, 33, B.gold); }
        for (const dx of [-6, -3, 2, 5]) R.box(cx + dx, tY + 24, 32, cx + dx, tY + 27 - Math.abs(dx > 0 ? dx - 1 : dx + 0) % 3, 32, B.gold);
        R.box(cx - 1, tY + 29, 32, cx, tY + 31, 32, B.gold);
        R.set(cx - 1, tY + 24, 34, B.gemR); R.set(cx, tY + 24, 34, B.gemR); R.set(cx - 1, tY + 25, 34, B.gemR); R.set(cx, tY + 25, 34, B.gemR);
        for (const dx of [-4, 3]) R.set(cx + dx, tY + 22, 34, B.gemB);
        R.box(cx - 6, tY + 20, 34, cx + 5, tY + 20, 34, B.goldDk);
      }
      for (const sx of [TX - 6, TX + 6]) { w.box(sx - 1, Y + 2, 20, sx + 1, Y + 2, 21, B.gold); w.box(sx, Y + 3, 20, sx, Y + 5, 20, B.gold); w.set(sx, Y + 3, 21, B.cushion); }
      // 왕좌 뒤 돌 기둥 둘과 조각 들보(천 장식 대신): 굽돌·금 띠·기둥머리, 들보의 금 띠와 가운데 금 메달
      for (const px of [TX - 9, TX + 9]) {
        w.box(px, ty - 1, 17, px, ty + 11, 17, B.whiteDk); w.box(px - 0.5, ty - 1, 16.5, px + 0.5, ty, 17.5, B.trim);
        for (const yy of [ty + 3, ty + 7.5]) w.box(px - 0.5, yy, 16.5, px + 0.5, yy, 17.5, B.gold);
        w.box(px - 0.5, ty + 11, 16.5, px + 0.5, ty + 11.5, 17.5, B.trim);
        w.set(px, ty + 5.5, 18, B.iron); w.set(px, ty + 6, 18, B.candle);
      }
      w.box(TX - 9.5, ty + 12, 17, TX + 9.5, ty + 12.5, 17.5, B.whiteDk); w.box(TX - 9.5, ty + 13, 17, TX + 9.5, ty + 13, 17, B.gold); w.box(TX - 9, ty + 12, 18, TX + 9, ty + 12, 18, B.trim);
      w.box(TX - 0.5, ty + 12, 18, TX + 0.5, ty + 13.5, 18, B.gold);
      // 장미창(북벽 높은 곳)
      const RY = Y + 15;
      // (2배 칸) 장미창: 금 테, 납 테두리 고리, 열두 살, 꽃잎 두 겹(안·밖 엇갈림), 가운데 금빛 눈
      {
        const cx = TX * 2 + 1, cy = RY * 2 + 1;
        for (let y = cy - 12; y <= cy + 12; y++) for (let x = cx - 12; x <= cx + 12; x++) {
          const dx = x + 0.5 - cx, dy = y + 0.5 - cy, r = Math.hypot(dx, dy); if (r > 11.3) continue;
          const a = (Math.atan2(dy, dx) + Math.PI * 2) % (Math.PI * 2), sec = a / (Math.PI / 6), k = Math.floor(sec), f = sec - k;
          const k2 = Math.floor(sec + 0.5), f2 = sec + 0.5 - k2;
          let b;
          if (r > 10) b = B.gold; else if (r > 9.1) b = B.cut; else if (r < 1.9) b = B.glassY; else if (r < 2.9) b = B.gold;
          else if (Math.abs(r - 6) < 0.55) b = B.cut;
          else if (r < 6) b = Math.min(f, 1 - f) * r * 0.52 < 0.5 ? B.cut : (k & 1 ? B.glassR : B.glassB);
          else b = Math.min(f2, 1 - f2) * r * 0.52 < 0.5 ? B.cut : (Math.hypot(r - 7.6, (f2 - 0.5) * 4) < 0.8 ? B.glassY : (k2 & 1 ? B.glassB : B.glassR));
          R.set(x, y, 30, b); R.set(x, y, 31, b);
        }
      }
      // 기둥 두 줄
      for (const x of [58, 98]) for (let z = 30; z <= 70; z += 8) {
        w.cyl(x, z, Y, Y + 10, 1.5, B.white); w.cyl(x, z, Y, Y, 2.2, B.whiteDk); w.cyl(x, z, Y + 1, Y + 1, 1.9, B.trim); w.cyl(x, z, Y + 10, Y + 10, 2.2, B.gold); w.cyl(x, z, Y + 11, Y + 11, 1.5, B.cut);
        // 기둥 금 띠 둘과 안쪽 벽등(휘장 대신)
        w.ring(x, z, Y + 4, 1.5, 1.8, B.gold); w.ring(x, z, Y + 8, 1.5, 1.8, B.gold);
        { const sx = x + (x < MX ? 1.5 : -1.5); w.set(sx, Y + 6, z, B.iron); w.set(sx, Y + 6.5, z, B.gold); w.set(sx, Y + 7, z, B.candle); }
      }
      for (const [gx, gc] of [[52, B.glassR], [60, B.glassB], [94, B.glassB], [102, B.glassR]]) {
        w.box(gx, Y + 2, Z0 + 1, gx + 2, Y + 9, Z0 + 1, gc); w.box(gx + 1, Y + 2, Z0 + 1, gx + 1, Y + 9, Z0 + 1, B.cut); w.box(gx, Y + 5, Z0 + 1, gx + 2, Y + 5, Z0 + 1, B.cut);
        w.box(gx - 1, Y + 1, Z0 + 2, gx + 3, Y + 1, Z0 + 2, B.whiteDk); w.set(gx + 1, Y + 10, Z0 + 1, B.gold);
      }
      // 가장자리 융단과 의자
      for (const x of [52, 104]) for (let z = 30; z <= 68; z += 6) { w.set(x, Y, z, B.chair); w.set(x, Y + 1, z, B.chair); w.set(x, Y, z + 1, B.cushion); }
      candelabra(68, 26, 'throne'); candelabra(88, 26, 'throne'); candelabra(52, 46, true); candelabra(104, 46, true); candelabra(68, 68, false); candelabra(88, 68, false);
      // 알현실 대문(부품): 남쪽 현관 홀 쪽으로 열린다
      gap(74, 73, 81, 74, 10);
      w.box(73, Y, 73, 73, Y + 11, 74, B.gold); w.box(82, Y, 73, 82, Y + 11, 74, B.gold); w.box(73, Y + 11, 73, 82, Y + 11, 74, B.gold); w.box(76, Y + 12, 74, 79, Y + 13, 74, B.gold);
      const dL = w.prop({ name: 'tdoorL', pivot: [74, Y, 74.5] }), dR = w.prop({ name: 'tdoorR', pivot: [82, Y, 74.5] });
      // (2배 칸) 알현실 대문: 금 테 틀과 가로대, 안쪽 굽은 판넬 테, 금 징
      for (let y = Y * 2; y <= Y * 2 + 21; y++) for (let x = 148; x <= 163; x++) for (const z of [148, 149]) {
        const ry = y - Y * 2, lx = x < 156 ? x - 148 : x - 156;
        const frame = lx === 0 || lx === 7 || ry <= 1 || ry === 8 || ry === 9 || ry >= 20;
        const inset = !frame && (lx === 1 || lx === 6 || ry === 2 || ry === 7 || ry === 10 || ry === 19);
        (x < 156 ? dL : dR).R.set(x, y, z, frame ? B.gold : inset ? B.doorDk : (z === 149 && lx >= 3 && lx <= 4 && (ry === 5 || ry === 14) ? B.gold : B.door));
      }
      acts.push({
        name: '알현실 대문', hint: '금장 대문이 현관 홀 쪽으로 활짝 열려요', hit: [74, Y, 73, 81, Y + 10, 75],
        run: async a => {
          a.flash('throne', 2.2, 5);
          await Promise.all([a.turn('tdoorL', [0, -1.5, 0], 2.2), a.turn('tdoorR', [0, 1.5, 0], 2.2)]);
          a.burst([TX + 0.5, ty + 8, 18], { n: 40, colors: ['#ffd860', '#ffffff', '#ffe2a0'], speed: 4, up: 3, life: 2, gravity: 1, spread: 3 });
          await a.wait(2.6);
          await Promise.all([a.turn('tdoorL', [0, 0, 0], 2), a.turn('tdoorR', [0, 0, 0], 2)]);
        },
      });
      landmarks.push({ name: '알현실', note: '왕좌와 장미창, 스테인드글라스', p: [TX + 0.5, RY + 10, 18.5], tag: 'THRONE' });
      acts.push({
        name: '스테인드글라스', hint: '달빛이 장미창과 스테인드글라스를 지나 알현실 바닥에 붉고 푸른 빛을 뿌려요', hit: [52, Y + 2, Z0 + 1, 104, Y + 20, Z0 + 2],
        run: async a => {
          a.glow(2.6, 5); a.flash('throne', 1.8, 5);
          for (let k = 0; k < 8; k++) {
            for (const [gx, col] of [[52, '#ff5a6a'], [60, '#6aa8ff'], [94, '#6aa8ff'], [102, '#ff5a6a']]) a.burst([gx + 1.5, Y + 5 - k * 0.4, Z0 + 3 + k * 2.8], { n: 8, colors: [col, '#ffffff'], speed: 0.8, up: 0.3, life: 1.6, gravity: 0.4, spread: 1.4 });
            a.burst([TX + 0.5, RY - k * 1.4, Z0 + 3 + k * 3], { n: 10, colors: ['#ff5a6a', '#6aa8ff', '#ffd070'], speed: 1, up: 0.3, life: 1.6, gravity: 0.4, spread: 2 });
            await a.wait(0.35);
          }
          await a.wait(1);
        },
      });
      // ── 현관 홀: 큰 계단(잘린 중이층으로) ──
      floor(49, 75, 107, 136, B.marble);
      for (let z = 75; z <= 136; z++) for (let x = 74; x <= 82; x++) w.set(x, F, z, (x === 74 || x === 82) ? B.carpetG : B.carpet);
      for (let z = 80; z <= 132; z += 13) { w.box(76, F, z, 80, F, z, B.carpetG); w.set(78, F, z + 1, B.carpetG); w.set(78, F, z - 1, B.carpetG); }
      for (const sx of [51, 95]) {
        for (let s = 0; s < 10; s++) { w.box(sx, Y + s, 90 + s, sx + 10, Y + s, 90 + s, B.white); w.box(sx + 2, Y + s, 90 + s, sx + 8, Y + s, 90 + s, B.carpet); MH.footing(w, sx, 90 + s, sx + 10, 90 + s, Y + s, B.whiteDk); w.set(sx, Y + s + 1, 90 + s, B.gold); w.set(sx + 10, Y + s + 1, 90 + s, B.gold); if (s % 3 === 0) { w.set(sx, Y + s + 2, 90 + s, B.gold); w.set(sx + 10, Y + s + 2, 90 + s, B.gold); } }
        w.box(sx, Y, 100, sx + 10, Y + 9, 112, B.whiteDk); w.box(sx, Y + 10, 100, sx + 10, Y + 10, 112, B.cut); w.box(sx + 1, Y + 10, 100, sx + 9, Y + 10, 110, B.carpet);
        for (let z = 100; z <= 112; z += 2) { w.set(sx, Y + 11, z, B.gold); w.set(sx + 10, Y + 11, z, B.gold); }
        w.box(sx + 3, Y, 112, sx + 7, Y + 5, 112, B.dark || B.cut); w.box(sx + 2, Y + 6, 112, sx + 8, Y + 6, 112, B.trim);
        w.set(sx + 5, Y + 11, 108, B.candle); w.box(sx + 5, Y + 11, 108, sx + 5, Y + 11, 108, B.candle);
      }
      candelabra(68, 80, true); candelabra(88, 80, true); candelabra(68, 132, false); candelabra(88, 132, false);
      for (const [px, pz] of [[54, 130], [102, 130], [54, 80], [102, 80], [66, 118], [90, 118]]) { w.cyl(px, pz, Y, Y + 1, 1.4, B.whiteDk); w.ring(px, pz, Y + 1, 1, 1.6, B.gold); MH.leafBlob(w, px, Y + 4, pz, 2.4, 2.4, 2.4, [B.leaf2, B.leaf, B.leafDk]); w.box(px, Y + 2, pz, px, Y + 3, pz, B.bark); }
      // 남벽 벽기둥(휘장 대신): 굽돌·몸통·금 띠·기둥머리와 벽등
      for (const bx of [62, 94]) {
        w.box(bx, Y, Z1 - 2, bx + 1, Y + 11, Z1 - 2, B.whiteDk); w.box(bx - 0.5, Y, Z1 - 2.5, bx + 1.5, Y + 0.5, Z1 - 2, B.trim);
        w.box(bx - 0.5, Y + 10.5, Z1 - 2.5, bx + 1.5, Y + 11, Z1 - 2, B.trim); w.box(bx, Y + 5, Z1 - 2.5, bx + 1, Y + 5, Z1 - 2.5, B.gold);
        w.set(bx + 0.5, Y + 7, Z1 - 3, B.iron); w.set(bx + 0.5, Y + 7.5, Z1 - 3, B.candle);
      }
      landmarks.push({ name: '현관 홀', note: '두 갈래 큰 계단과 붉은 융단', p: [MX + 0.5, Y + 16, 104.5] });
      // ── 서쪽: 연회장과 주방 ──
      floor(18, Z0 + 2, 46, 85, B.plankF); floor(18, 88, 46, 136, B.kfloor);
      for (let z = 22; z <= 80; z++) for (let x = 25; x <= 41; x++) if (x === 25 || x === 41 || z === 22 || z === 80) w.set(x, F, z, B.rugB); else if (x >= 26 && x <= 40) w.set(x, F, z, B.rug);
      // (2배 칸) 긴 식탁: 다리, 상판, 늘어진 식탁보와 금 띠, 접시·음식·금 잔, 등받이 의자, 세 갈래 촛대
      for (const tx of [27, 37]) {
        const X0 = tx * 2, X1 = tx * 2 + 5, Y0 = Y * 2;
        for (let Z = 52; Z <= 153; Z++) {
          if ((Z - 52) % 12 === 1 || Z === 152) for (const X of [X0 + 1, X1 - 1]) R.box(X, Y0, Z, X, Y0 + 2, Z, B.table);
          R.box(X0, Y0 + 3, Z, X1, Y0 + 3, Z, B.table);
          R.box(X0 - 1, Y0 + 4, Z, X1 + 1, Y0 + 4, Z, B.cloth); R.set(X0 - 1, Y0 + 3, Z, B.cloth); R.set(X1 + 1, Y0 + 3, Z, B.cloth);
          R.set(X0 + 2, Y0 + 4, Z, B.rugB); R.set(X0 + 3, Y0 + 4, Z, B.rugB);
        }
        for (let Z = 54, k = 0; Z <= 150; Z += 6, k++) {
          for (const [px, gx] of [[X0, X0 + 2], [X1 - 1, X1 - 2]]) {
            R.box(px, Y0 + 5, Z, px + 1, Y0 + 5, Z + 1, B.plate); R.set(px + (px === X0 ? 0 : 1), Y0 + 6, Z, [B.food, B.food2, B.food][k % 3]);
            R.set(gx, Y0 + 5, Z + 2, B.gold); R.set(gx, Y0 + 6, Z + 2, k % 2 ? B.wine : B.gold);
          }
          for (const [s, cx] of [[-1, X0 - 4], [1, X1 + 3]]) {
            for (const [lx, lz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) R.box(cx + lx, Y0, Z + lz, cx + lx, Y0 + 1, Z + lz, B.chair);
            R.box(cx, Y0 + 2, Z, cx + 1, Y0 + 2, Z + 1, B.cushion);
            const bx = s < 0 ? cx : cx + 1; R.box(bx, Y0 + 3, Z, bx, Y0 + 7, Z + 1, B.chair); R.set(bx, Y0 + 8, Z, B.gold); R.set(bx, Y0 + 8, Z + 1, B.gold);
          }
        }
        for (const z of [34, 50, 66]) { const Z = z * 2 + 2, cx = X0 + 2; R.box(cx, Y0 + 5, Z, cx + 1, Y0 + 5, Z + 1, B.gold); R.box(cx, Y0 + 6, Z, cx, Y0 + 8, Z, B.gold); R.box(cx - 1, Y0 + 8, Z, cx + 2, Y0 + 8, Z, B.gold); for (const X of [cx - 1, cx, cx + 2]) R.set(X, Y0 + 9, Z, B.candle); }
        lights.push({ p: [tx + 1.5, Y + 5, 51.5], c: '#ffd890', i: 1, d: 18, flicker: 0.2 });
      }
      // 상석(북쪽 끝)
      w.box(24, Y, 17, 42, Y, 20, B.whiteDk); w.box(26, Y + 1, 18, 40, Y + 1, 19, B.table); w.box(26, Y + 2, 18, 40, Y + 2, 19, B.cloth);
      for (let x = 27; x <= 39; x += 3) { w.set(x, Y + 1, 17, B.chair); w.set(x, Y + 2, 17, B.chair); w.set(x, Y + 3, 17, B.chair); w.set(x, Y + 3, 18, B.food); }
      w.box(32, Y + 1, 17, 34, Y + 4, 17, B.gold);
      // 큰 벽난로(서쪽 벽)
      w.box(18, Y, 42, 20, Y + 10, 60, B.hearth); w.box(19, Y, 45, 20, Y + 6, 57, 0); w.box(18, Y + 11, 44, 19, Y + 16, 58, B.hearth); w.box(18, Y + 16, 44, 19, Y + 16, 58, B.cut);
      w.box(19, Y, 46, 19, Y + 1, 56, B.wood); w.box(19, Y + 1, 47, 19, Y + 3, 55, B.fire); w.set(19, Y + 4, 51, B.candle); w.box(21, Y + 7, 44, 21, Y + 7, 58, B.gold);
      w.box(21, Y + 11, 49, 21, Y + 14, 53, B.gold); w.box(21, Y + 12, 50, 21, Y + 13, 52, B.whiteDk); w.box(21.5, Y + 12.5, 50.5, 21.5, Y + 13, 51.5, B.gemR);
      for (const z of [43, 59]) w.box(21, Y, z, 21, Y + 6, z, B.trim);
      lights.push({ name: 'hearth', p: [21, Y + 3, 51.5], c: '#ff9a40', i: 1.8, d: 24, flicker: 0.35 });
      acts.push({
        name: '연회장 벽난로', hint: '장작이 타오르며 불꽃이 튀어요', hit: [18, Y, 44, 21, Y + 10, 58],
        run: async a => { a.flash('hearth', 2.6, 3); for (let k = 0; k < 6; k++) { a.burst([21, Y + 3, 51.5], { n: 34, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 3, up: 5, life: 1.3, gravity: 3, spread: 2.4 }); await a.wait(0.45); } },
      });
      landmarks.push({ name: '연회장', note: '긴 식탁 두 줄과 큰 벽난로', p: [32.5, Y + 14, 51.5] });
      // 주방: 화덕, 조리대, 통, 매단 냄비, 찬장
      w.box(18, Y, 118, 20, Y + 7, 134, B.hearth); w.box(19, Y + 1, 120, 20, Y + 3, 124, 0); w.box(19, Y + 1, 128, 20, Y + 3, 132, 0); w.box(19, Y + 1, 122, 19, Y + 1, 122, B.fire); w.set(19, Y + 1, 130, B.fire); w.set(19, Y + 1, 121, B.fire); w.set(19, Y + 1, 131, B.fire);
      w.box(18, Y + 8, 120, 19, Y + 13, 132, B.hearth); w.box(18, Y + 13, 120, 19, Y + 13, 132, B.cut);
      w.set(20, Y + 4, 122, B.copper); w.set(20, Y + 4, 130, B.copper);
      lights.push({ name: 'kitchen', p: [21, Y + 2, 126.5], c: '#ff9a40', i: 1.2, d: 16, flicker: 0.3 });
      // (2배 칸) 조리대 둘: 다리와 선반, 도마·칼·채소·빵·구리 냄비·사발
      for (const z0 of [98, 114]) {
        const X0 = 56, X1 = 81, Z0 = z0 * 2, Z1 = z0 * 2 + 9, Y0 = Y * 2;
        for (const X of [X0, X1]) for (const Z of [Z0, Z1]) R.box(X, Y0, Z, X, Y0 + 3, Z, B.table);
        R.box(X0, Y0 + 1, Z0, X1, Y0 + 1, Z1, B.plankF); R.box(X0, Y0 + 3, Z0, X1, Y0 + 3, Z1, B.table);
        for (let X = X0 + 2; X < X1 - 1; X += 5) { R.box(X, Y0 + 2, Z0 + 1, X + 1, Y0 + 2, Z0 + 2, [B.copper, B.plate, B.food2][(X >> 2) % 3]); }
        R.box(X0 + 2, Y0 + 4, Z0 + 3, X0 + 6, Y0 + 4, Z0 + 6, B.plankF); R.box(X0 + 3, Y0 + 5, Z0 + 4, X0 + 5, Y0 + 5, Z0 + 4, B.steel); R.set(X0 + 6, Y0 + 5, Z0 + 4, B.chair);
        R.box(X0 + 9, Y0 + 4, Z0 + 2, X0 + 12, Y0 + 5, Z0 + 5, B.copper); R.box(X0 + 10, Y0 + 5, Z0 + 3, X0 + 11, Y0 + 5, Z0 + 4, B.food);
        for (const [dx, dz, b] of [[16, 3, B.food2], [17, 5, B.food2], [18, 3, B.food], [21, 4, B.food], [22, 6, B.food2]]) R.set(X0 + dx, Y0 + 4, Z0 + dz, b);
        R.box(X1 - 3, Y0 + 4, Z0 + 5, X1 - 2, Y0 + 4, Z0 + 7, B.plate); R.set(X1 - 3, Y0 + 5, Z0 + 6, B.food);
      }
      for (let z = 90; z <= 108; z += 2) { w.box(45, Y, z, 46, Y + 6, z, B.shelf); w.set(45, Y + 2, z, [B.copper, B.plate, B.food][z % 3]); w.set(45, Y + 4, z, [B.plate, B.copper, B.food2][z % 3]); }
      for (const [bx, bz] of [[44, 92], [44, 94], [43, 93], [44, 134], [42, 134], [44, 132], [40, 134]]) { w.set(bx, Y, bz, B.barrel); w.set(bx, Y + 1, bz, B.barrel); }
      for (const [cx, cz] of [[24, 134], [26, 134], [24, 132]]) w.box(cx, Y, cz, cx + 1, Y + 1, cz + 1, B.crate);
      w.box(18, Y + 9, 89, 46, Y + 9, 89, B.iron);
      const pots = w.prop({ name: 'pots', pivot: [32.5, Y + 9, 89.5], axis: 'x', rock: 0.03 });
      for (let x = 23; x <= 43; x += 3) { pots.set(x, Y + 8, 89, B.iron); pots.set(x, Y + 7, 89, B.iron); pots.set(x, Y + 6, 89, x % 2 ? B.steel : B.copper); }
      landmarks.push({ name: '주방', note: '화덕 두 개와 조리대', p: [32.5, Y + 12, 112.5] });
      acts.push({
        name: '주방 화덕', hint: '화덕 불이 확 일고 매달린 냄비들이 달그락 흔들리며 김이 올라요', hit: [18, Y, 118, 21, Y + 7, 134],
        run: async a => {
          a.flash('kitchen', 3, 4);
          const fire = async () => { for (let k = 0; k < 8; k++) { for (const z of [122.5, 130.5]) a.burst([20.8, Y + 2, z], { n: 12, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2, up: 4, life: 1, gravity: 2, spread: 1 }); for (const z of [100, 116]) a.burst([34.5, Y + 3, z + 0.5], { n: 6, colors: ['#ffffff', '#e8e8f0'], speed: 0.6, up: 3, life: 1.8, gravity: -0.8, spread: 2 }); await a.wait(0.4); } };
          const swing = async () => { for (const amp of [0.9, 0.6, 0.35]) { await a.turn('pots', [amp, 0, 0], 0.4); await a.turn('pots', [-amp, 0, 0], 0.4); } await a.turn('pots', [0, 0, 0], 0.4); };
          await Promise.all([fire(), swing()]);
        },
      });
      // ── 동쪽: 왕실 서고, 보물고, 무기고 ──
      floor(110, Z0 + 2, 138, 75, B.plankF); floor(110, 78, 138, 110, B.tile); floor(110, 113, 138, 136, B.kfloor);
      const books = [B.book1, B.book2, B.book3, B.book4];
      const shelfRow = (x0, x1, z) => { for (let x = x0; x <= x1; x++) for (let y = Y; y <= Y + 8; y++) w.set(x, y, z, (y - Y) % 2 === 1 || x === x0 || x === x1 || y === Y + 8 ? B.shelf : books[(hash3(x, y, z) * 4) | 0]); };
      shelfRow(112, 137, Z0 + 2); for (const z of [26, 34, 42, 50]) { shelfRow(116, 132, z); shelfRow(116, 132, z + 1); }
      for (let z = 18; z <= 74; z += 1) for (let y = Y; y <= Y + 8; y++) if (z < 40 || z > 46) w.set(137, y, z, (y - Y) % 2 === 1 || y === Y + 8 ? B.shelf : books[(hash3(1, y, z) * 4) | 0]);
      for (let y = Y; y <= Y + 8; y++) { w.set(114, y, 27, B.wood); if (y % 2) w.set(115, y, 27, B.wood); }
      for (let x = 117; x <= 131; x += 7) for (let z = 28; z <= 48; z += 8) { w.set(x, Y, z + 4, B.chair); w.set(x + 2, Y, z + 4, B.chair); }
      for (let z = 58; z <= 72; z++) for (let x = 114; x <= 134; x++) if (x === 114 || x === 134 || z === 58 || z === 72) w.set(x, F, z, B.rugB); else w.set(x, F, z, B.rug);
      w.box(119, Y, 63, 129, Y, 67, B.table); w.set(122, Y + 1, 66, B.book2); w.set(127, Y + 1, 66, B.book1); w.box(124, Y + 1, 65, 124, Y + 2, 65, B.gold); w.set(124, Y + 3, 65, B.candle);
      for (let x = 120; x <= 128; x += 2) { w.set(x, Y, 61, B.chair); w.set(x, Y + 1, 61, B.chair); w.set(x, Y, 69, B.chair); w.set(x, Y + 1, 69, B.chair); }
      w.box(114, Y, 67, 114, Y + 1, 67, B.wood);
      const globe = w.prop({ name: 'globe', pivot: [114.5, Y + 3.5, 67.5], speed: 0.3 });
      globe.sphere(114, Y + 3, 67, 1.5, B.globe); for (const [x, y, z] of [[113, Y + 3, 66], [115, Y + 4, 67], [114, Y + 2, 68], [113, Y + 4, 68]]) globe.set(x, y, z, B.leaf2);
      const fbooks = [[120, 64, B.book1], [127, 67, B.book3], [125, 63, B.book4]];
      fbooks.forEach(([bx, bz, bc], k) => { const p = w.prop({ name: 'fbook' + k, pivot: [bx + 1, Y + 1, bz + 0.5] }); p.set(bx, Y + 1, bz, bc); p.set(bx + 1, Y + 1, bz, bc); p.set(bx, Y + 2, bz, B.cloth); });
      acts.push({
        name: '왕실 서고', hint: '지구본이 빙글빙글 돌고 책들이 떠올라 서고 위를 맴돌아요', hit: [112, Y, 62, 130, Y + 5, 68],
        run: async a => {
          a.glow(1.5, 8);
          const fly = async ([bx, bz], k) => {
            const s0 = [bx + 1, Y + 1, bz + 0.5], pts = [];
            for (let i = 0; i <= 24; i++) { const t = k * 2.1 + i / 12 * Math.PI; pts.push([124.5 + 6 * Math.cos(t) - s0[0], 9 + Math.sin(i * 0.8), 65.5 + 6 * Math.sin(t) - s0[2], -t - Math.PI / 2]); }
            await a.wait(k * 0.3);
            await a.move('fbook' + k, [0, 5, 0], 1);
            await a.path('fbook' + k, pts, 6);
            await a.respawn('fbook' + k, 1.0);
          };
          const sparkle = async () => { for (let q = 0; q < 14; q++) { a.burst([124.5 + 6 * Math.cos(q), Y + 10, 65.5 + 6 * Math.sin(q)], { n: 6, colors: ['#5ac8ff', '#ffffff', '#ffe2a0'], speed: 1, up: 1, life: 1.2, gravity: -0.3, spread: 1 }); await a.wait(0.5); } };
          await Promise.all([a.spin('globe', 12, 7), sparkle(), ...fbooks.map(fly)]);
        },
      });
      lights.push({ p: [124.5, Y + 4, 65.5], c: '#ffe0a0', i: 1.1, d: 18, flicker: 0.15 });
      // 북동 모서리 탑 계단문(서가 벽 x137): 나선 계단을 올라 왕의 서재로
      {
        const DX = 137, Q0 = 19, Q1 = 21;
        w.box(DX, Y, Q0, DX, Y + 3, Q1, B.door); w.box(DX, Y, Q0 + 1, DX, Y + 3, Q0 + 1, B.wood); w.set(DX, Y + 1, Q1, B.gold);
        w.box(DX, Y, Q0 - 1, DX, Y + 5, Q0 - 1, B.trim); w.box(DX, Y, Q1 + 1, DX, Y + 5, Q1 + 1, B.trim); w.box(DX, Y + 4, Q0, DX, Y + 5, Q1, B.trim); w.set(DX, Y + 5, Q0 + 1, B.gold);
        w.set(DX - 1, Y + 4, Q1 + 1, B.iron); w.set(DX - 1, Y + 5, Q1 + 1, B.candle);
        acts.push(OR.goAct({ at: [DX - 1, Y, Q0 + 1], h: 5, name: '왕의 서재 안으로', goto: 'innerkeep-tower', hint: '서가 사이 탑문을 열고 나선 계단을 올라 북동 모서리 탑의 왕의 서재로 들어가요', hit: [DX - 1, Y, Q0, DX, Y + 4, Q1] }));
      }
      landmarks.push({ name: '왕실 서고', note: '왕국의 연대기가 잠든 서가', p: [124.5, Y + 15, 40.5] });
      // 보물고: 금화 더미, 보석, 뚜껑이 열리는 상자
      const CXX = 124, CZZ = 104;
      for (let i = 0; i < 260; i++) { const x = w.ri(111, 137), z = w.ri(80, 100); let y = Y; while (w.get(x, y, z)) y++; if (y < Y + 4 && MH.dist(x, z, CXX, CZZ) > 5) w.set(x, y, z, hash3(x, y, z) > 0.85 ? B.coin : B.gold); }
      for (const [gx, gy, gz, gb] of [[115, 3, 84, B.gemR], [131, 2, 86, B.gemB], [121, 3, 82, B.gemB], [134, 3, 94, B.gemR], [117, 2, 96, B.gemB], [128, 3, 90, B.gemR]]) w.set(gx, Y + gy, gz, gb);
      for (const [px, pz] of [[113, 80], [136, 80]]) { w.box(px, Y, pz, px, Y + 4, pz, B.whiteDk); w.set(px, Y + 5, pz, B.gold); w.set(px, Y + 6, pz, B.gemR); }
      w.box(CXX - 3, Y, CZZ - 1, CXX + 3, Y + 2, CZZ + 2, B.chest); w.box(CXX - 3, Y, CZZ - 1, CXX - 3, Y + 2, CZZ + 2, B.gold); w.box(CXX + 3, Y, CZZ - 1, CXX + 3, Y + 2, CZZ + 2, B.gold); w.box(CXX, Y, CZZ + 2, CXX, Y + 2, CZZ + 2, B.gold);
      w.box(CXX - 2, Y + 2, CZZ, CXX + 2, Y + 2, CZZ + 1, B.coin);
      const lid = w.prop({ name: 'clid', pivot: [CXX + 0.5, Y + 3, CZZ - 1], axis: 'x' });
      lid.box(CXX - 3, Y + 3, CZZ - 1, CXX + 3, Y + 3, CZZ + 2, B.chest); lid.box(CXX - 2, Y + 4, CZZ, CXX + 2, Y + 4, CZZ + 1, B.chest);
      lid.box(CXX - 3, Y + 3, CZZ - 1, CXX - 3, Y + 3, CZZ + 2, B.gold); lid.box(CXX + 3, Y + 3, CZZ - 1, CXX + 3, Y + 3, CZZ + 2, B.gold); lid.set(CXX, Y + 3, CZZ + 2, B.gold);
      lights.push({ name: 'gold', p: [CXX + 0.5, Y + 4, CZZ + 0.5], c: '#ffd070', i: 0.9, d: 16, flicker: 0.05 });
      w.box(108, Y + 9, 92, 109, Y + 9, 96, B.iron); for (const z of [92, 94, 96]) w.box(108, Y, z, 109, Y + 8, z, B.iron);
      acts.push({
        name: '보물 상자', hint: '뚜껑이 열리고 금빛이 쏟아져요', hit: [CXX - 3, Y, CZZ - 1, CXX + 3, Y + 4, CZZ + 2],
        run: async a => {
          await a.turn('clid', [-1.25, 0, 0], 1);
          a.flash('gold', 4, 3); a.glow(1.6, 3);
          for (let k = 0; k < 5; k++) { a.burst([CXX + 0.5, Y + 4, CZZ + 1], { n: 30, colors: ['#ffd860', '#ffffff', '#ff3a5a', '#5ac8ff'], speed: 3, up: 5, life: 1.6, gravity: 3, spread: 2 }); await a.wait(0.5); }
          await a.turn('clid', [0, 0, 0], 0.9);
        },
      });
      landmarks.push({ name: '보물고', note: '금화 더미와 보석함', p: [124.5, Y + 12, 92.5] });
      // 무기고: 창 걸이, 방패 벽, 갑옷 상자, 숫돌
      for (let x = 114; x <= 134; x += 4) { w.box(x, Y, 134, x, Y + 1, 134, B.wood); w.box(x, Y + 2, 134, x, Y + 8, 134, B.steel); w.set(x, Y + 9, 134, B.iron); w.box(x - 1, Y + 3, 135, x + 1, Y + 3, 135, B.wood); }
      // 무기고 벽 방패(쇠 테·강철 판·금 돌기)
      for (let z = 116; z <= 132; z += 4) { w.box(137, Y + 3, z, 137, Y + 6, z + 2, B.iron); w.box(136.5, Y + 3.5, z + 0.5, 136.5, Y + 6, z + 1.5, B.steel); w.box(136, Y + 4.5, z + 1, 136, Y + 5, z + 1, B.gold); }
      w.box(114, Y, 118, 116, Y + 1, 120, B.chest); w.box(124, Y, 118, 126, Y + 1, 120, B.chest); w.box(119, Y, 126, 121, Y, 128, B.steel); w.box(128, Y, 125, 130, Y + 1, 127, B.crate);
      w.cyl(131, 119, Y, Y + 1, 1.2, B.found); w.box(131, Y + 2, 119, 131, Y + 2, 119, B.steel);
      candelabra(120, 116, true);
      landmarks.push({ name: '무기고', note: '창과 방패가 늘어선 방', p: [125.5, Y + 12, 124.5] });

      // ── 새 구역: 달빛 정원(정문 밖 남쪽) ──
      const G = base + 1;
      // 정문 앞 자갈 길과 정원 길
      for (let z = Z1 + 1; z < D; z++) for (let x = 72; x <= 84; x++) MH.paint(w, x, z, x === 72 || x === 84 ? B.whiteDk : B.gravel);
      for (let x = 8; x <= 168; x++) for (let z = 148; z <= 150; z++) if (MH.g(w, x, z) === G) MH.paint(w, x, z, z === 149 ? B.gravel : B.whiteDk);
      // 산울타리 테두리
      // (2배 칸) 생울타리: 아래는 짙고 위는 둥글게 다듬은 잎, 위쪽에 고르지 않은 순
      const hedgeHD = (X, Z) => { const Yg = G * 2 + 2; R.box(X, Yg, Z, X, Yg + 2, Z, B.leafDk); R.set(X, Yg + 3, Z, B.hedge); if (hash3(X, 3, Z) > 0.55) R.set(X, Yg + 4, Z, B.hedge); };
      for (let x = 4; x <= 172; x++) { if (x >= 70 && x <= 86) continue; if (MH.g(w, x, 173) === G) { for (const X of [x * 2, x * 2 + 1]) for (const Z of [346, 347]) hedgeHD(X, Z); if (x % 6 === 0) w.set(x, G + 3, 173, B.hedge); } }
      for (const [x0, x1] of [[6, 66], [90, 104]]) for (let x = x0; x <= x1; x++) if (MH.g(w, x, 144) === G) { for (const X of [x * 2, x * 2 + 1]) for (const Z of [288, 289]) hedgeHD(X, Z); if (x % 4 === 0) { R.set(x * 2, G * 2 + 3, 290, B.leaf2); R.set(x * 2, G * 2 + 4, 290, x % 8 ? B.flowerW : B.flowerR); } }
      for (const [x, z] of [[72, 141], [84, 141]]) { w.box(x, G + 1, z, x, G + 6, z, B.iron); w.set(x, G + 7, z, B.fire); w.box(x - 1, G + 1, z - 1, x + 1, G + 1, z + 1, B.whiteDk); lights.push({ p: [x + 0.5, G + 8, z + 0.5], c: '#ffb050', i: 1.1, d: 16, flicker: 0.3 }); }
      // 백조 연못과 달빛 분수
      for (let z = 150; z <= 172; z++) for (let x = 20; x <= 60; x++) {
        const e = ((x - 40) / 17) ** 2 + ((z - 161) / 8) ** 2;
        if (e >= 1 && e < 1.35 && MH.g(w, x, z) === G) { MH.paint(w, x, z, B.whiteDk); if (e < 1.18) w.set(x, G + 1, z, B.trim); }
      }
      for (const [lx, lz] of [[28, 158], [50, 164], [33, 166], [47, 156]]) { w.set(lx, base, lz, B.lily); w.set(lx + 1, base, lz, B.lily); w.set(lx, base, lz + 1, B.flowerW); }
      const FX = 40, FZ = 161;
      w.cyl(FX, FZ, base - 2, base + 1, 2.6, B.white); w.ring(FX, FZ, base + 2, 1.6, 2.6, B.trim);
      w.cyl(FX, FZ, base + 2, base + 7, 0.8, B.white); w.cyl(FX, FZ, base + 8, base + 8, 2.2, B.white); w.ring(FX, FZ, base + 9, 1.4, 2.2, B.gold);
      w.box(FX, base + 9, FZ, FX, base + 11, FZ, B.white); w.set(FX, base + 12, FZ, B.moonP); w.set(FX, base + 13, FZ, B.moonC);
      lights.push({ name: 'moon', p: [FX + 0.5, base + 13, FZ + 0.5], c: '#c8d8ff', i: 0.9, d: 22, flicker: 0.05 });
      for (const [bx, bz] of [[22, 150], [58, 150], [22, 172], [58, 172]]) { w.box(bx, G + 1, bz, bx, G + 5, bz, B.white); w.set(bx, G + 6, bz, B.moonP); lights.push({ p: [bx + 0.5, G + 6, bz + 0.5], c: '#c8d8ff', i: 0.6, d: 10, flicker: 0.05 }); }
      // 정자(분수 동쪽)
      const GZX = 64, GZZ = 162;
      w.cyl(GZX, GZZ, G + 1, G + 1, 4.4, B.whiteDk); w.cyl(GZX, GZZ, G + 1, G + 1, 3.4, B.plankF);
      for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, px = Math.round(GZX + Math.cos(a) * 3.6), pz = Math.round(GZZ + Math.sin(a) * 3.6); w.box(px, G + 2, pz, px, G + 7, pz, B.white); }
      MH.cone(w, GZX, GZZ, G + 8, 5.2, B.roofB, 0.6, B.eave); w.box(GZX, G + 16, GZZ, GZX, G + 17, GZZ, B.gold);
      w.set(GZX, G + 7, GZZ, B.candle); lights.push({ p: [GZX + 0.5, G + 6, GZZ + 0.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.15 });
      // 화단과 장미 아치
      for (const [x0, z0] of [[90, 152], [90, 164]]) {
        w.walls(x0, G + 1, z0, x0 + 12, G + 1, z0 + 6, B.whiteDk);
        // (2배 칸) 낱낱의 꽃: 흙 위 잎 포기, 줄기와 꽃송이(빨강·하양·노랑·분홍), 군데군데 키 큰 꽃
        for (let z = z0 + 1; z < z0 + 6; z++) for (let x = x0 + 1; x < x0 + 12; x++) MH.paint(w, x, z, B.dirt);
        for (let Z = z0 * 2 + 2; Z <= z0 * 2 + 11; Z++) for (let X = x0 * 2 + 2; X <= x0 * 2 + 23; X++) {
          const h = hash3(X, 7, Z), h2 = hash3(X, 9, Z), Yg = G * 2 + 2;
          R.set(X, Yg, Z, 0); R.set(X, Yg + 1, Z, 0);
          if (h < 0.45) R.set(X, Yg, Z, h < 0.2 ? B.leaf : B.leaf2);
          if (h2 > 0.7 && (X + Z) % 2 === 0) { const tall = h2 > 0.93; R.set(X, Yg, Z, B.leaf2); if (tall) R.set(X, Yg + 1, Z, B.leaf2); R.set(X, Yg + 1 + (tall ? 1 : 0), Z, [B.flowerR, B.flowerW, B.flowerY, B.flowerR][(h * 16 | 0) % 4]); }
        }
      }
      for (const z of [148, 156, 164]) { w.box(71, G + 1, z, 71, G + 6, z, B.white); w.box(85, G + 1, z, 85, G + 6, z, B.white); for (let x = 71; x <= 85; x++) { const yy = G + 7 + (x > 74 && x < 82 ? 1 : 0); w.set(x, yy, z, (x & 1) ? B.leafDk : B.flowerR); } }
      landmarks.push({ name: '달빛 정원', note: '백조 연못과 달빛 분수, 정자', p: [40.5, G + 18, 161.5] });
      // 백조(부품): 연못을 가로질러 헤엄친다
      const swans = [[27, 158], [30, 163]];
      swans.forEach(([sx, sz], k) => {
        const p = w.prop({ name: 'swan' + k, pivot: [sx + 0.5, base + 1, sz + 0.5], bob: 0.1, bobSpeed: 1.4 });
        p.box(sx - 1, base + 1, sz, sx + 1, base + 1, sz, B.swan); p.box(sx, base + 1, sz - 1, sx, base + 1, sz + 1, B.swan); p.set(sx - 1, base + 2, sz, B.swan);
        p.box(sx + 1, base + 2, sz, sx + 1, base + 4, sz, B.swan); p.set(sx + 2, base + 4, sz, B.beak);
      });
      acts.push({
        name: '백조 연못', hint: '두 마리 백조가 물결을 남기며 연못을 가로질러 헤엄친 뒤 날개를 펴고 정원 너머 밤하늘로 날아가요', hit: [25, base + 1, 156, 32, base + 4, 165],
        run: async a => {
          await Promise.all(swans.map(async ([sx, sz], k) => {
            await a.wait(k * 0.6);
            const ripple = async () => { for (let q = 0; q < 12; q++) { a.burst([sx + q * 1.9, base + 1.2, sz + 0.5 + Math.sin(q * 0.6) * 1.5], { n: 6, colors: ['#e0f4ff', '#8ac0f0'], speed: 1.5, up: 0.4, life: 0.8, gravity: 1, spread: 1, flat: true }); await a.wait(0.45); } };
            await Promise.all([a.drive('swan' + k, [[6, 0, k ? -1 : 1.5], [12, 0, k ? 0 : 2], [18, 0, k ? 1 : 0.5], [23, 0, 0], [28, 2, 3], [33, 8, 12], [38, 14, 24], [44, 18, 40]], 9, { fwd: '+x', back: 1.0 }), ripple()]);
          }));
        },
      });
      acts.push({
        name: '달빛 분수', hint: '달빛 분수가 은빛 물줄기를 뿜자 반딧불이가 연못 위로 떠올라요', hit: [FX - 2, base + 2, FZ - 2, FX + 2, base + 13, FZ + 2],
        run: async a => {
          a.flash('moon', 3, 5); a.glow(1.4, 5);
          for (let k = 0; k < 10; k++) {
            a.burst([FX + 0.5, base + 13, FZ + 0.5], { n: 30, colors: ['#e0f4ff', '#c8d8ff', '#ffffff'], speed: 3.5, up: 9, life: 1.6, gravity: 10, spread: 1 });
            a.burst([FX + 0.5 + Math.cos(k) * 10, base + 3, FZ + 0.5 + Math.sin(k) * 5], { n: 8, colors: ['#c8ff8a', '#fff4a0'], speed: 0.6, up: 2, life: 2.4, gravity: -0.6, spread: 2 });
            await a.wait(0.4);
          }
        },
      });
      // 동쪽 잔디밭: 자갈 산책로, 원뿔 정원수, 가로등
      for (let z = 10; z <= 146; z++) for (let x = 148; x <= 150; x++) if (MH.g(w, x, z) === G) MH.paint(w, x, z, x === 149 ? B.gravel : B.whiteDk);
      for (let z = 18; z <= 138; z += 12) {
        const tx = 160 + ((z / 12 | 0) % 2) * 6;
        w.box(tx, G + 1, z, tx, G + 2, z, B.bark); MH.leafBlob(w, tx, G + 5, z, 2.2, 3.4, 2.2, [B.hedge, B.leafDk, B.leaf]); w.set(tx, G + 9, z, B.hedge);
        if (z % 24 === 18) { w.box(152, G + 1, z, 152, G + 5, z, B.iron); w.set(152, G + 6, z, B.lampG); w.set(152, G + 7, z, B.iron); lights.push({ p: [152.5, G + 6, z + 0.5], c: '#ffd890', i: 0.7, d: 12, flicker: 0.1, night: true }); }
        else { w.box(152, G + 1, z, 154, G + 1, z, B.wood); w.box(152, G + 2, z, 152, G + 2, z, B.wood); w.box(154, G + 2, z, 154, G + 2, z, B.wood); }
      }
      for (let z = 30; z <= 126; z += 24) for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz); if (d < 3.4 && d > 2.2) w.set(168 + dx, G + 1, z + dz, B.hedge); else if (d <= 1.5) w.set(168 + dx, G + 1, z + dz, (dx + dz) & 1 ? B.flowerR : B.flowerY); }
      // 유리 온실(동쪽): 낮은 유리벽, 쇠 갈비뼈 지붕, 달꽃 화분
      const OX0 = 110, OX1 = 140, OZ0 = 150, OZ1 = 170;
      MH.flatten(w, OX0 - 1, OZ0 - 1, OX1 + 1, OZ1 + 1, F, B.kfloor, B.found);
      for (let z = OZ0; z <= OZ1; z++) for (let x = OX0; x <= OX1; x++) {
        const edge = x === OX0 || x === OX1 || z === OZ0 || z === OZ1;
        if (edge) { const post = (x - OX0) % 5 === 0 && (z === OZ0 || z === OZ1) || (z - OZ0) % 5 === 0 && (x === OX0 || x === OX1); w.box(x, Y, z, x, Y + (post ? 9 : 3), z, post ? B.iron : B.glassC); w.set(x, Y, z, B.whiteDk); }
      }
      w.box(124, Y, OZ1, 126, Y + 5, OZ1, 0); w.box(123, Y + 6, OZ1, 127, Y + 6, OZ1, B.iron);
      for (let x = OX0; x <= OX1; x += 5) for (let z = OZ0; z <= OZ1; z++) { const yy = Y + 9 + Math.round(4 * Math.sin((z - OZ0) / (OZ1 - OZ0) * Math.PI)); w.set(x, yy, z, B.iron); }
      w.box(OX0, Y + 9, OZ0, OX1, Y + 9, OZ0, B.iron); w.box(OX0, Y + 9, OZ1, OX1, Y + 9, OZ1, B.iron); w.box(OX0, Y + 13, (OZ0 + OZ1) / 2, OX1, Y + 13, (OZ0 + OZ1) / 2, B.gold);
      for (let x = OX0 + 2; x <= OX1 - 2; x++) for (const z of [OZ0 + 2, OZ1 - 2]) { if (x > 122 && x < 128) continue; w.set(x, Y, z, B.dirt); if (x % 2) MH.leafBlob(w, x, Y + 1, z, 1, 1, 1, [B.leaf2, B.leaf, B.leafDk]); }
      for (const tx of [114, 136]) { MH.tree(w, tx, Y, 160, { kind: 'palm', h: 9, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk] }); }
      w.box(118, Y, 158, 132, Y, 162, B.whiteDk);
      const blooms = [[120, 160], [125, 160], [130, 160]];
      blooms.forEach(([bx, bz], k) => {
        w.box(bx, Y + 1, bz, bx, Y + 1, bz, B.copper); w.box(bx, Y + 2, bz, bx, Y + 4, bz, B.leafDk); w.set(bx - 1, Y + 3, bz, B.leaf2); w.set(bx + 1, Y + 3, bz, B.leaf2);
        const p = w.prop({ name: 'bloom' + k, pivot: [bx + 0.5, Y + 5, bz + 0.5], scl0: [0.35, 0.35, 0.35] });
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) p.set(bx + dx, Y + 5 + (Math.abs(dx) + Math.abs(dz) > 1 ? 1 : 0), bz + dz, B.moonP);
        p.set(bx, Y + 5, bz, B.moonC); p.set(bx, Y + 6, bz, B.moonC);
      });
      lights.push({ name: 'moonflower', p: [125.5, Y + 6, 160.5], c: '#d8e4ff', i: 0.5, d: 20, flicker: 0.05 });
      landmarks.push({ name: '유리 온실', note: '밤에만 피는 달꽃을 기르는 온실', p: [125.5, Y + 20, 160.5] });
      acts.push({
        name: '온실 달꽃', hint: '유리 온실의 달꽃 세 송이가 활짝 피어나며 은빛 꽃가루를 날려요', hit: [118, Y + 1, 158, 132, Y + 10, 162],
        run: async a => {
          a.flash('moonflower', 5, 5);
          for (let k = 0; k < 3; k++) { a.tween('bloom' + k, { off: [0, 3, 0], scl: [1.8, 1.8, 1.8] }, 1.2); await a.wait(0.35); }
          await a.wait(0.9);
          for (let q = 0; q < 8; q++) { blooms.forEach(([bx, bz]) => a.burst([bx + 0.5, Y + 10, bz + 0.5], { n: 8, colors: ['#e8f0ff', '#fff4a0', '#ffffff'], speed: 1.2, up: 3, life: 2, gravity: -0.4, spread: 1.2 })); await a.wait(0.4); }
          await Promise.all(blooms.map((b, k) => a.tween('bloom' + k, { off: [0, 0, 0], scl: [0.35, 0.35, 0.35] }, 1.6)));
        },
      });
      // ── 성 정문(부품): 남쪽 정문 두 문짝이 바깥 뜰로 열린다 ──
      w.box(73, Y, Z1, 73, Y + 10, Z1 + 1, B.trim); w.box(83, Y, Z1, 83, Y + 10, Z1 + 1, B.trim); w.box(72, Y + 10, Z1 + 1, 84, Y + 11, Z1 + 1, B.whiteDk); w.box(76, Y + 12, Z1 + 1, 80, Y + 13, Z1 + 1, B.gold);
      const gL = w.prop({ name: 'mgateL', pivot: [74, Y, Z1 + 0.5] }), gR = w.prop({ name: 'mgateR', pivot: [83, Y, Z1 + 0.5] });
      // (2배 칸) 성 정문: 세로 널판과 틈, 쇠띠 셋과 징, 가운데 쇠 덧대, 금 고리
      for (let y = Y * 2; y <= Y * 2 + 19; y++) for (let x = 148; x <= 165; x++) for (const z of [Z1 * 2, Z1 * 2 + 1]) {
        const ry = y - Y * 2, strap = ry === 4 || ry === 5 || ry === 12 || ry === 13 || ry >= 18, mid = x === 155 || x === 156;
        let b = (x - 148) % 3 === 2 ? B.doorDk : B.door;
        if (mid || strap) b = strap && (x & 1) && (ry === 5 || ry === 13) ? B.gold : B.iron;
        (x < 156 ? gL : gR).R.set(x, y, z, b);
      }
      for (const x of [152, 159]) { gL.R.set(x, Y * 2 + 9, Z1 * 2 + 2, x < 156 ? B.gold : 0); gR.R.set(x, Y * 2 + 9, Z1 * 2 + 2, x >= 156 ? B.gold : 0); }
      acts.push({
        name: '성 정문', hint: '쇠테 두른 정문이 바깥 뜰 쪽으로 활짝 열리며 횃불이 타올라요', hit: [74, Y, Z1 - 1, 82, Y + 9, Z1],
        run: async a => {
          await Promise.all([a.turn('mgateL', [0, -1.45, 0], 2.4), a.turn('mgateR', [0, 1.45, 0], 2.4)]);
          for (let k = 0; k < 4; k++) { for (const x of [72, 84]) a.burst([x + 0.5, G + 8, 141.5], { n: 12, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2, up: 5, life: 1, gravity: -1, spread: 0.8 }); a.burst([MX + 0.5, Y + 4, Z1 - 3], { n: 10, colors: ['#ffe8c0', '#ffffff'], speed: 2, up: 2, life: 1.4, gravity: 0, spread: 3 }); await a.wait(0.5); }
          await a.wait(1.2);
          await Promise.all([a.turn('mgateL', [0, 0, 0], 2.2), a.turn('mgateR', [0, 0, 0], 2.2)]);
        },
      });
      // 정문 밖 이정표: 성문 문루를 지나 왕성 앞 광장(castlegate)으로
      {
        const SX = 87, SZ = 143;
        w.box(SX - 1, G, SZ - 1, SX + 1, G, SZ + 1, B.whiteDk);
        w.box(SX, G + 1, SZ, SX, G + 6, SZ, B.wood);
        for (let s = 1; s <= 4; s++) w.set(SX, G + 5, SZ + s, s === 4 ? B.gold : B.door);
        for (let s = 1; s <= 3; s++) w.set(SX + s, G + 3, SZ, s === 3 ? B.gold : B.door);
        w.set(SX, G + 7, SZ, B.lampG); w.set(SX, G + 8, SZ, B.iron);
        acts.push(OR.goAct({ at: [SX, G + 1, SZ], h: 9, name: '성문 광장으로', goto: 'castlegate', hint: '정문을 나서 성문 문루를 지나 선왕 석상이 늘어선 왕성 앞 광장으로 가요' }));
      }
      // ── 밤하늘 불꽃놀이: 익랑 벽 위에서 쏘아 올린다 ──
      acts.push({
        name: '밤하늘 불꽃', hint: '왕성 위 밤하늘에 금빛과 푸른빛 불꽃이 연달아 터져요', hit: [46, Y + 11, 122, 49, Y + 12, 128],
        run: async a => {
          const sets = [['#ffd860', '#fff4c0'], ['#6aa8ff', '#ffffff'], ['#ff5a6a', '#ffd0d0'], ['#c08aff', '#ffffff'], ['#7aff9a', '#fff4c0']];
          const pads = [[47.5, 124], [108.5, 44], [47.5, 36], [108.5, 124], [78.5, 80], [47.5, 80], [108.5, 94]];
          for (let k = 0; k < pads.length; k++) {
            const [x, z] = pads[k];
            a.burst([x, Y + 12, z], { n: 10, colors: ['#ffe8a0'], speed: 0.4, up: 22, life: 1, gravity: 4, spread: 0.3 });
            await a.wait(0.65);
            a.burst([x, Y + 40, z], { n: 100, colors: sets[k % sets.length], speed: 16, up: 2, life: 1.8, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      HD.syncHM(w);
      return HD.out({ lights, landmarks, acts });
    },
  });
})();
