// 왕성 앞 광장 — 해자와 도개교, 거대한 성문, 선왕 석상이 늘어선 대광장, 남쪽 개선문과 꽃시장 거리 (176칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const { DAY } = window.KINGDOM;
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
  const W = 176, D = 176, Hh = 144;
  MAPS.push(Object.assign({}, DAY, {
    id: 'castlegate', cat: 'kingdom', name: '왕성 앞 광장', en: 'Castle Gate', color: '#c8d4ee', seed: 239, base: 40, size: [W * 2, D * 2, Hh * 2], playerScale: 2,
    desc: '왕성 정문 앞 대광장. 선왕들의 석상이 늘어선 이곳에서 근위대 교대식이 열린다. 광장 남쪽 끝에는 세 갈래 개선문이 서 있고, 그 양옆으로 꽃 노점이 늘어선 꽃시장 거리가 이어진다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['위치', '왕성 남쪽 정문'], ['명물', '도개교 · 선왕 석상 · 쌍분수 · 개선문'], ['새 거리', '개선문 앞 꽃시장 거리'], ['소문', '정문의 쇠창살은 한 번도 끝까지 내려간 적이 없다']] },
    fog: { start: 0.82, floor: 20, depth: 20, box: [176, 192, 184, 200] },
    camY: -4, zoom: 1.08,
    particles: [
      { n: 110, colors: ['#fff4c0', '#ffffff'], mode: 'drift', speed: 0.6, y0: 52, y1: 192, glow: false },
      { n: 22, colors: ['#ffffff'], mode: 'wisp', speed: 2.4, size: 3, y0: 152, glow: false },
      { n: 60, colors: ['#ffc0d8', '#ffffff', '#ffe060'], mode: 'drift', speed: 0.5, area: [176, 328, 140], y0: 48, y1: 88, glow: false },
    ],
    blocks: Object.assign({}, KP, {
      carpet: { c: '#2a4a9a', top: '#30509e', v: 0.03 }, goldP: { c: '#b89a3a', top: '#e8c04a', v: 0.04 }, waterB: { c: '#5aa0d8', v: 0.03 },
      chain: { c: '#3a3a44', v: 0.03 }, dark: { c: '#16141a', v: 0 }, fire: { c: '#ffb04a', glow: true },
      fire2: { c: '#ff7a2a', glow: true }, fishO: { c: '#f08a30', v: 0.04 }, fishW: { c: '#f4f0e8', v: 0.03 }, coach: { c: '#2a4a9a', v: 0.03 }, glass: { c: '#16141a', v: 0 },
      pave: { c: '#a8a49c', top: '#c8c2b6', v: 0.05, pat: 'stone' }, paveD: { c: '#8a867e', top: '#9e9a90', v: 0.06, pat: 'stone' },
      moss: { c: '#5a7a4a', v: 0.08 }, slate: { c: '#3a4258', v: 0.04 }, bronze: { c: '#b8863a', v: 0.05 },
      pigeon: { c: '#9aa0b0', v: 0.04 }, pigeonW: { c: '#e8eaf0', v: 0.03 }, pigeonN: { c: '#5a8a7a', v: 0.04 },
      flowerP: { c: '#f08ab8', v: 0.05 }, flowerB: { c: '#6a8ae0', v: 0.05 }, flowerO: { c: '#f0a040', v: 0.05 }, flowerV: { c: '#a06ad8', v: 0.05 },
      awnR: { c: '#c84a5a', v: 0.02 }, awnW: { c: '#f6f2e8', v: 0.02 }, awnB: { c: '#4a7ac8', v: 0.02 }, awnY: { c: '#e8c850', v: 0.02 },
      bucket: { c: '#7a8a9a', v: 0.04 }, soil: { c: '#5a3e28', v: 0.06 }, roofB2: { c: '#24488a', v: 0.05, pat: 'tile' }, doorDk: { c: '#3a2c1e', v: 0.03 },
    }),
    build(R) {
      const w = HD.face(R, true);   // 설계는 1배 좌표(0.5 단위까지), 그리기는 2배 칸
      const B = w.id, base = w.base, P = base + 3, CG = base + 12, WL = base;
      // ── 2배 칸에서 직접 짓는 둥근 탑: 낱돌 띠·화살창·내민 받침(돌출 총안)·총안 흉벽·처마 있는 원뿔 지붕 ──
      // 인자는 1배 좌표, 돌려주는 꼭대기 높이도 1배(소수)
      // ── 2배 칸 박공지붕: 처마 내밈, 기와 줄(3단마다 짙은 줄), 금 용마루, 박공벽과 둥근 박공창 (인자 1배, 돌려주는 꼭대기도 1배) ──
      const roofHD = (x0, x1, z0, z1, y, o) => {
        const alongX = o.axis === 'x';
        const A0 = (alongX ? z0 : x0) * 2, A1 = (alongX ? z1 : x1) * 2 + 1, L0 = (alongX ? x0 : z0) * 2, L1 = (alongX ? x1 : z1) * 2 + 1, Yb = y * 2;
        const put = (a, l, yy, b) => alongX ? R.set(l, yy, a, b) : R.set(a, yy, l, b);
        let s = 0;
        for (let l = L0 - 1; l <= L1 + 1; l++) { put(A0 - 1, l, Yb - 1, o.eave); put(A1 + 1, l, Yb - 1, o.eave); }
        while (A0 + s <= A1 - s) {
          const ridge = A0 + s >= A1 - s - 1;
          for (let l = L0; l <= L1; l++) {
            const b = s === 0 ? o.eave : ridge ? o.ridge : (s % 3 === 2 ? (o.band || o.b) : o.b);
            put(A0 + s, l, Yb + s, b); put(A1 - s, l, Yb + s, b);
          }
          s++;
        }
        if (o.gable) for (const l of [L0 + 2, L0 + 3, L1 - 3, L1 - 2]) for (let a = A0 + 1; a <= A1 - 1; a++) {
          const hh = Yb + Math.min(a - A0, A1 - a) - 1;
          for (let yy = Yb; yy <= hh; yy++) put(a, l, yy, o.gable);
        }
        if (o.gwin) { const ma = (A0 + A1 + 1) / 2, my = Yb + 6; for (const l of [L0 + 1, L1 - 1]) for (let a = Math.floor(ma - 4); a <= ma + 4; a++) for (let yy = my - 4; yy <= my + 4; yy++) { const d = Math.hypot(a + 0.5 - ma, yy + 0.5 - my); if (d < 2.4) put(a, l, yy, o.gwin); else if (d < 3.6) put(a, l, yy, B.trim); } }
        return (Yb + s) / 2;
      };
      // ── 2배 칸 흉벽: 굽돌 한 줄 위에 4칸 성가퀴·2칸 틈, 바깥쪽 성가퀴에 가는 화살구멍 ──
      const parapetHD = (x0, x1, z0, z1, y, outer) => {
        const X0 = x0 * 2, X1 = x1 * 2 + 1, Z0 = z0 * 2, Z1 = z1 * 2 + 1, Y0 = y * 2, alongX = X1 - X0 > Z1 - Z0;
        R.box(X0, Y0, Z0, X1, Y0 + 3, Z1, 0);
        for (let Z = Z0; Z <= Z1; Z++) for (let X = X0; X <= X1; X++) {
          const u = alongX ? X : Z;
          R.set(X, Y0, Z, B.trim);
          if (((u % 6) + 6) % 6 < 4) { R.set(X, Y0 + 1, Z, B.white); R.set(X, Y0 + 2, Z, B.white); R.set(X, Y0 + 3, Z, B.trim); }
          if (outer && (alongX ? Z === Z1 : X === X1) && u % 6 === 1) R.set(X, Y0 + 2, Z, B.dark);
        }
      };
      const towerHD = (cx1, cz1, y01, h1, r1, m, o) => {
        o = o || {};
        const cx = cx1 * 2 + 1, cz = cz1 * 2 + 1, y0 = y01 * 2, h = h1 * 2, r = r1 * 2 + 0.5;
        const disc = (y, rr, b, hollow, keep) => {
          const K = Math.ceil(rr) + 1;
          for (let z = Math.floor(cz - K); z <= cz + K; z++) for (let x = Math.floor(cx - K); x <= cx + K; x++) {
            const dx = x + 0.5 - cx, dz = z + 0.5 - cz, d = Math.hypot(dx, dz);
            if (d > rr || (hollow && d <= rr - hollow)) continue;
            if (keep && !keep(Math.atan2(dz, dx), d)) continue;
            R.set(x, y, z, typeof b === 'function' ? b(x, y, z) : b);
          }
        };
        if (o.foot !== false) for (let y = y0 - 10; y < y0; y++) disc(y, r + 2, m.band || m.wall);
        // 기초: 계단진 굽돌
        disc(y0, r + 2, m.band); disc(y0 + 1, r + 2, m.band); disc(y0 + 2, r + 1, m.band); disc(y0 + 3, r + 1, m.wall);
        // 몸통: 줄눈(4칸마다 어긋난 돌 띠)
        const stone = (x, y, z) => { const a = Math.atan2(z + 0.5 - cz, x + 0.5 - cx), seg = Math.floor((a + Math.PI) * r / 3 + ((y >> 2) & 1) * 0.5); return (y % 4 === 0 && hash3(seg, y, 5) > 0.55) ? m.band : m.wall; };
        for (let y = y0 + 4; y < y0 + h; y++) disc(y, r, stone);
        for (let y = y0 + 16; y < y0 + h - 10; y += 16) { disc(y, r + 1, m.band, 1.6); disc(y + 1, r + 0.6, m.trim || m.cren, 1.2); }
        // 화살창(네 방향, 층마다 45° 돌려)
        if (m.win) for (let y = y0 + 9, k = 0; y < y0 + h - 14; y += 14, k++) {
          for (let q = 0; q < 4; q++) {
            const a = q * Math.PI / 2 + (k & 1) * Math.PI / 4, ux = Math.cos(a), uz = Math.sin(a), tx = -uz, tz = ux;
            const at = (s, dd) => [Math.floor(cx + ux * dd + tx * s), Math.floor(cz + uz * dd + tz * s)];
            for (let yy = y; yy <= y + 6; yy++) for (const s of [-0.5, 0.5]) { const [x, z] = at(s, r - 0.6); R.set(x, yy, z, yy === y + 6 ? B.dark : m.win); }
            for (let yy = y - 1; yy <= y + 7; yy++) for (const s of [-1.5, 1.5]) { const [x, z] = at(s, r + 0.4); R.set(x, yy, z, m.trim || m.cren); }
            for (const s of [-1.5, -0.5, 0.5, 1.5]) { const [x, z] = at(s, r + 0.4); R.set(x, y - 1, z, m.band); R.set(x, y + 7, z, m.trim || m.cren); }
            const [kx, kz] = at(0, r + 0.6); R.set(kx, y + 8, kz, B.gold);
          }
        }
        let top = y0 + h;
        // 내민 받침(돌출 총안): 받침돌과 사이 구멍
        const segN = Math.max(12, Math.round(r * 0.9) * 2);
        const seg = a => Math.floor((a + Math.PI) / (Math.PI * 2) * segN);
        disc(top - 4, r + 1, m.band, 1.4, a => seg(a) % 2 === 0);
        disc(top - 3, r + 2, m.band, 2.4, a => seg(a) % 2 === 0);
        disc(top - 2, r + 2.6, m.band, 3, null);
        disc(top - 1, r + 2.6, m.wall, 3);
        for (let y = top; y <= top + 2; y++) disc(y, r + 2.6, m.wall, 1.6);
        disc(top + 2, r + 2.6, m.trim || m.cren, 1.6);
        const mer = a => { const t = (a + Math.PI) / (Math.PI * 2) * segN * 2; return (Math.floor(t) % 3) !== 2; };
        for (let y = top + 3; y <= top + 5; y++) disc(y, r + 2.6, y === top + 5 ? (m.trim || m.cren) : m.wall, 1.6, mer);
        disc(top - 1, r + 1.2, m.walk || m.band);
        // 원뿔 지붕: 처마 두 겹, 기와 띠, 꼭대기 금 장식
        let y = top + 1, rr = r + 1.2, k = 0;
        if (m.roof) {
          disc(y, rr + 0.8, m.eave, 1.2); disc(y + 1, rr + 0.4, m.eave, 1.2);
          for (; rr > 0.6; rr -= o.step || 0.36, k++) disc(y + 2 + k, rr, (k % 6 === 5) ? (m.roofBand || m.roof) : m.roof, rr > 3 ? 2.2 : 0);
          y = y + 2 + k;
          for (let q = 0; q < 3; q++) R.set(Math.floor(cx), y + q, Math.floor(cz), m.finial);
          disc(y + 3, 1.2, m.finial); disc(y + 4, 1.2, m.finial); R.set(Math.floor(cx), y + 5, Math.floor(cz), m.finial); R.set(Math.floor(cx), y + 6, Math.floor(cz), m.finial);
          y += 7;
        }
        return y / 2;
      };
      const MZ0 = 51, MZ1 = 60, RZ = 61, PZ0 = 62, PZ1 = 149;   // 해자, 옹벽, 광장
      MH.terrain(w, {
        floor: 2,
        height: (x, z) => z < MZ0 ? CG : z <= MZ1 ? base - 5 : P,
        surface: (x, z) => z < MZ0 ? B.slab : z <= MZ1 ? B.rockDk : B.cobble,
        under: (x, z, y, dep) => z < MZ0 ? B.white : dep < 2 ? B.dirt : B.rock,
      });
      MH.water(w, WL, (x, z) => z >= MZ0 && z <= MZ1);
      // 옹벽(광장 쪽)과 성 쪽 축대: 띠돌림·배수구·이끼
      for (let x = 0; x < W; x++) for (let y = base - 5; y <= P; y++) w.set(x, y, RZ, y === P ? B.trim : B.whiteDk);
      for (let x = 0; x < W; x++) {
        w.set(x, CG - 3, MZ0 - 1, B.whiteDk);
        if (x % 12 === 6) { w.set(x, WL + 3, MZ0 - 1, B.dark); w.set(x, WL + 2, MZ0 - 1, B.moss); w.set(x, WL + 1, MZ0 - 1, B.moss); }
        if (hash3(x, 3, 50) > 0.8) w.set(x, WL + 1, MZ0 - 1, B.moss);
        if (hash3(x, 5, 61) > 0.8) w.set(x, WL + 1, RZ, B.moss);
      }
      const lights = [], acts = [], landmarks = [];
      const GX0 = 82, GX1 = 94, MIDX = 88;

      // ── 성벽과 성벽 탑 ──
      const wm = { wall: B.white, band: B.whiteDk, cren: B.trim, walk: B.whiteDk };
      MH.wall(w, [[0, 47], [64, 47]], { m: wm, h: 22, t: 3, y: CG, buttress: true });
      MH.wall(w, [[112, 47], [175, 47]], { m: wm, h: 22, t: 3, y: CG, buttress: true });
      for (const [a, b] of [[0, 64], [112, 175]]) { parapetHD(a, b, 46, 46, CG + 23, false); parapetHD(a, b, 49, 49, CG + 23, true); }
      // 성벽 앞면 화살구멍
      for (let x = 4; x < W - 4; x += 6) { if (x > 58 && x < 118) continue; w.box(x, CG + 12, 49, x, CG + 15, 49, B.dark); w.set(x, CG + 16, 49, B.trim); }
      const tm = { wall: B.white, band: B.whiteDk, win: B.win, cren: B.trim, trim: B.trim, roof: B.roofB, roofBand: B.roofB2, eave: B.eave, finial: B.gold };
      for (const tx of [24, 152]) towerHD(tx, 48, base - 5, CG - base + 40, 6.5, tm);
      // ── 성문: 두 개의 큰 탑과 문루 ──
      const towerTops = [];
      for (const tx of [70, 106]) towerTops.push(towerHD(tx, 47, base - 5, CG - base + 52, 8.5, tm));
      // 탑 몸통의 창틀(남쪽 면)
      // (2배 칸) 아치 창: 유리 두 쪽과 가로살, 문설 돌, 창턱과 받침, 두건돌과 금 쐐기
      for (const tx of [70, 106]) for (const fy of [CG + 6, CG + 18, CG + 30]) {
        const cx = tx * 2 + 1, Y = fy * 2, zf = 111;
        for (let y = Y; y <= Y + 9; y++) for (let x = cx - 2; x <= cx + 1; x++) R.set(x, y, zf, y >= Y + 8 && (x === cx - 2 || x === cx + 1) ? B.trim : y === Y + 4 ? B.iron : B.win);
        for (let y = Y; y <= Y + 9; y++) { R.set(cx - 3, y, zf + 1, B.trim); R.set(cx + 2, y, zf + 1, B.trim); }
        for (let x = cx - 4; x <= cx + 3; x++) { R.set(x, Y - 1, zf + 1, B.whiteDk); R.set(x, Y + 10, zf + 1, B.trim); }
        for (let x = cx - 2; x <= cx + 1; x++) R.set(x, Y - 2, zf + 1, B.trim);
        R.set(cx - 1, Y + 11, zf + 1, B.gold); R.set(cx, Y + 11, zf + 1, B.gold); R.set(cx - 1, Y + 10, zf + 1, B.gold); R.set(cx, Y + 10, zf + 1, B.gold);
      }
      const GT = CG + 34;                                    // 문루 지붕턱
      w.box(76, P, 34, 100, GT, 50, B.white);
      for (const y of [CG + 10, CG + 22, GT]) w.walls(75, y, 33, 101, y, 51, B.whiteDk);
      // 앞면 돌출부(문 위 정면)
      w.box(79, P + 1, 51, 97, GT - 1, 51, B.white);
      for (let x = 79; x <= 97; x += 2) w.set(x, GT - 1, 52, B.trim);         // 내민 받침돌
      w.box(79, GT, 52, 97, GT, 52, B.whiteDk);
      w.box(76, GT + 1, 34, 100, GT + 1, 52, B.whiteDk);
      parapetHD(76, 100, 34, 34, GT + 2, false); parapetHD(76, 100, 52, 52, GT + 2, true); parapetHD(76, 76, 35, 51, GT + 2, true); parapetHD(100, 100, 35, 51, GT + 2, true);
      const gPeak = roofHD(77, 99, 35, 51, GT + 2, { b: B.roofB, band: B.roofB2, eave: B.eave, ridge: B.gold, gable: B.white, gwin: B.win, axis: 'x' });
      for (const x of [77, 99]) w.box(x, gPeak, 43, x, gPeak + 2, 43, B.gold);
      // 문루 종탑(지붕 위 작은 탑)
      w.box(86, gPeak - 1, 41, 90, gPeak + 4, 45, B.white); w.box(87, gPeak + 1, 41, 89, gPeak + 3, 45, B.dark); w.box(86, gPeak + 1, 42, 90, gPeak + 3, 44, B.dark);
      w.box(87, gPeak + 1, 42, 89, gPeak + 3, 44, B.white);
      { const t = MH.pyramid(R, 170, 80, 183, 93, (gPeak + 5) * 2, B.roofB, 2, B.eave); R.box(176, t, 86, 177, t + 1, 87, B.gold); R.box(176, t + 2, 86, 176, t + 6, 86, B.gold); R.box(175, t + 4, 86, 177, t + 4, 86, B.gold); }
      // 문루 창(앞면)
      const gWin = (x, y, h) => {
        w.box(x, y, 52, x + 1, y + h - 1, 52, B.win);
        w.box(x - 1, y - 1, 52, x + 2, y - 1, 52, B.whiteDk); w.box(x - 1, y, 52, x - 1, y + h - 1, 52, B.trim); w.box(x + 2, y, 52, x + 2, y + h - 1, 52, B.trim);
        w.box(x, y + h, 52, x + 1, y + h, 52, B.trim); w.box(x - 1, y + h, 53, x + 2, y + h, 53, B.gold);
      };
      for (const x of [80, 95]) { gWin(x, CG + 13, 5); gWin(x, CG + 25, 5); }
      gWin(84, CG + 25, 4); gWin(91, CG + 25, 4);
      // 통로(광장 높이)와 아치
      const archTop = x => P + 16 - Math.pow(Math.abs(x - MIDX) / 6.5, 2) * 5;
      for (let z = 26; z <= 51; z++) for (let x = GX0; x <= GX1; x++) {
        const floor = z >= 36 ? P : Math.min(CG, P + (36 - z));
        MH.setH(w, x, z, floor, z >= 36 ? B.cobble : B.whiteDk, B.white);
        for (let y = floor + 1; y <= CG + 10; y++) if (z < 34 || y <= archTop(x)) w.set(x, y, z, 0);
      }
      for (let z = 26; z <= 33; z++) for (const x of [GX0 - 1, GX1 + 1]) { for (let y = CG + 1; y <= CG + 2; y++) w.set(x, y, z, (z & 1) ? B.trim : B.whiteDk); }
      // 아치 테두리(쐐기돌)와 문설주
      for (let x = GX0 - 2; x <= GX1 + 2; x++) for (let y = P + 1; y <= P + 19; y++) {
        const at = archTop(Math.max(GX0, Math.min(GX1, x)));
        if (x >= GX0 && x <= GX1 && y > at && y <= at + 2) w.set(x, y, 52, (x + y) % 2 ? B.gold : B.trim);
        else if ((x < GX0 || x > GX1) && y <= P + 15) w.set(x, y, 52, y % 4 === 0 ? B.whiteDk : B.trim);
      }
      // (2배 칸) 정면 아치: 매끈한 곡선, 부채꼴 쐐기돌(줄눈), 금 머릿돌, 엇갈린 문설주 돌과 굽돌
      const aTop = X => 2 * archTop(X / 2 - 0.25) + 1, ACX = MIDX * 2 + 1, ACY = (P + 1) * 2;
      for (let X = GX0 * 2 - 6; X <= GX1 * 2 + 7; X++) for (let Y = (P + 1) * 2; Y <= (P + 19) * 2 + 1; Y++) for (const Z of [104, 105]) {
        const inn = X >= GX0 * 2 && X <= GX1 * 2 + 1;
        if (inn) {
          const t = aTop(X);
          if (Y <= t) { R.set(X, Y, Z, 0); continue; }
          if (Y <= t + 5) { const a = Math.atan2(Y - ACY + 4, X + 0.5 - ACX), sg = Math.floor(a / Math.PI * 15); R.set(X, Y, Z, Math.abs(X + 0.5 - ACX) < 2.2 ? B.gold : (Y === Math.ceil(t + 5) || Y > t + 4) ? B.whiteDk : (sg & 1) ? B.trim : B.white); }
        } else if (Y <= (P + 15) * 2 + 1) {
          const outer = X < GX0 * 2 - 3 || X > GX1 * 2 + 4, row = (Y - ACY) >> 2;
          if (Y < ACY + 3) R.set(X, Y, Z, B.whiteDk);
          else if (!outer || (row & 1)) R.set(X, Y, Z, (Y - ACY) % 4 === 0 ? B.whiteDk : B.trim);
        }
      }
      w.box(MIDX - 1, P + 17, 53, MIDX + 1, P + 19, 53, B.gold);             // 쐐기 머릿돌
      R.box(ACX - 3, (P + 17) * 2, 107, ACX + 2, (P + 17) * 2 + 4, 107, B.gold); R.box(ACX - 1, (P + 17) * 2 + 5, 107, ACX, (P + 19) * 2 + 1, 107, B.gold);
      // (2배 칸) 큰 성문 문짝: 널판과 틈, 쇠띠 셋, 징, 가운데 맞닿는 쇠 덧대, 금 고리 손잡이
      for (let X = GX0 * 2; X <= GX1 * 2 + 1; X++) for (let Y = (P + 1) * 2; Y <= (P + 10) * 2 + 1; Y++) for (const Z of [72, 73]) {
        const ry = Y - (P + 1) * 2, strap = ry === 3 || ry === 4 || ry === 10 || ry === 11 || ry === 16 || ry === 17, mid = X === ACX - 1 || X === ACX;
        let b = (X - GX0 * 2) % 3 === 2 ? B.doorDk : B.door;
        if (Z === 73) { if (mid) b = B.iron; else if (strap) b = ((X & 1) && (ry === 4 || ry === 11 || ry === 17)) ? B.gold : B.iron; }
        R.set(X, Y, Z, b);
      }
      for (const X of [ACX - 4, ACX + 3]) { R.set(X, (P + 1) * 2 + 8, 74, B.gold); R.set(X, (P + 1) * 2 + 7, 74, B.gold); }
      for (let x = GX0; x <= GX1; x++) for (let y = P + 11; y <= P + 16; y++) if (y <= archTop(x)) w.set(x, y, 36, B.dark);
      // 문 위 왕실 문장(돋을새김 방패)
      w.box(83, CG + 13, 52, 93, CG + 21, 52, B.whiteDk);
      // (2배 칸) 방패꼴 문장: 금 테, 푸른 바탕, 가운데 금 왕관과 흰 별
      {
        const Yb = (CG + 13) * 2 + 1, Yt = (CG + 21) * 2;
        for (let X = 166; X <= 187; X++) for (let Y = Yb - 1; Y <= Yt + 1; Y++) if (X === 166 || X === 187 || Y === Yb - 1 || Y === Yt + 1) R.set(X, Y, 106, B.trim);
        for (let Y = Yb; Y <= Yt; Y++) {
          const t = (Y - Yb) / (Yt - Yb), hw = t > 0.42 ? 8.5 : 8.5 * Math.sqrt(t / 0.42) + 0.6;
          for (let X = 167; X <= 186; X++) { const d = Math.abs(X + 0.5 - ACX); if (d > hw) continue; R.set(X, Y, 107, d > hw - 1.2 || Y === Yt ? B.gold : B.carpet); }
        }
        const cy = Yb + 8;
        for (let X = ACX - 5; X <= ACX + 4; X++) { R.set(X, cy, 108, B.gold); R.set(X, cy + 1, 108, B.gold); }
        for (const dx of [-5, -1, 0, 4]) { R.set(ACX + dx, cy + 2, 108, B.gold); R.set(ACX + dx, cy + 3, 108, B.gold); }
        for (const dx of [-3, 2]) R.set(ACX + dx, cy + 2, 108, B.gold);
        R.set(ACX - 1, cy + 4, 108, B.gold); R.set(ACX, cy + 4, 108, B.gold);
        R.set(ACX - 1, cy - 4, 108, B.trim); R.set(ACX, cy - 4, 108, B.trim); R.box(ACX - 2, cy - 3, 108, ACX + 1, cy - 3, 108, B.trim); R.set(ACX - 1, cy - 2, 108, B.trim); R.set(ACX, cy - 2, 108, B.trim);
      }
      for (const lx of [GX0 - 3, GX1 + 3]) { w.box(lx, P + 9, 53, lx, P + 9, 54, B.iron); w.set(lx, P + 8, 54, B.lampG); w.set(lx, P + 10, 54, B.iron); lights.push({ p: [lx + 0.5, P + 8, 54.5], c: '#ffd890', i: 1.2, d: 18, flicker: 0.1, night: true }); }
      // 쇠창살(부품): 처음에는 위 홈에 올라가 있다
      w.box(GX0, P + 1, 50, GX1, P + 31, 50, 0);
      w.box(GX0, P + 1, 51, GX1, P + 31, 51, 0);
      for (let x = GX0; x <= GX1; x++) for (let y = P + 1; y <= P + 31; y++) if (y > archTop(x) + 2 && y <= P + 31) w.set(x, y, 49, B.dark);
      const port = w.prop({ name: 'port', pivot: [MIDX + 0.5, P + 1, 50.5], off0: [0, 13, 0] });
      // (2배 칸) 쇠창살: 가는 세로살(앞)과 가로살(뒤)을 엮고, 아래 끝은 금 창끝
      for (let X = GX0 * 2; X <= GX1 * 2 + 1; X++) for (let Y = (P + 1) * 2; Y <= (P + 15) * 2 + 1; Y++) {
        if (Y > aTop(X)) continue;
        const ry = Y - (P + 1) * 2, vb = (X - GX0 * 2) % 3 === 1 || X === GX0 * 2 || X === GX1 * 2 + 1, hb = ry % 5 === 4 || Y >= aTop(X) - 1;
        if (vb) port.R.set(X, Y, 101, ry < 2 && X !== GX0 * 2 && X !== GX1 * 2 + 1 ? B.gold : B.iron);
        if (hb && ry > 2) port.R.set(X, Y, 100, B.iron);
      }
      acts.push({
        name: '쇠창살', hint: '쇠창살이 쿵 내려왔다가 다시 올라가요', hit: [GX0, P + 1, 49, GX1, P + 16, 52],
        run: async a => {
          await a.move('port', [0, 0, 0], 1.1, t => t * t);
          a.burst([MIDX + 0.5, P + 1, 52], { n: 34, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 1, gravity: 3, spread: 6, flat: true });
          await a.wait(1.6);
          await a.move('port', [0, 13, 0], 2.6, t => t);
        },
      });
      // 도개교(부품): 성문 쪽 축을 중심으로 들린다
      for (const x of [GX0 - 1, GX1 + 1]) { w.box(x, base - 5, MZ1, x, P, MZ1, B.whiteDk); w.set(x, P + 1, MZ1, B.trim); }
      const bridge = w.prop({ name: 'bridge', pivot: [MIDX + 0.5, P + 0.5, 52], axis: 'x' });
      // (2배 칸) 도개교: 가로 널판과 틈, 아래 세로 들보, 가장자리 턱 들보와 쇠띠·징, 끝의 쇠사슬 고리
      for (let Z = 104; Z <= MZ1 * 2 + 1; Z++) for (let X = GX0 * 2; X <= GX1 * 2 + 1; X++) {
        const edge = X <= GX0 * 2 + 1 || X >= GX1 * 2;
        bridge.R.set(X, P * 2, Z, (X - GX0 * 2) % 6 < 2 ? B.wood : 0);
        bridge.R.set(X, P * 2 + 1, Z, edge ? B.wood : (Z - 104) % 5 === 4 ? B.wood : (Z - 104) % 10 === 7 ? B.iron : B.plank);
        if (edge) bridge.R.set(X, P * 2 + 2, Z, Z % 6 === 0 ? B.iron : Z % 6 === 3 && (X === GX0 * 2 || X === GX1 * 2 + 1) ? B.gold : B.wood);
      }
      for (const X of [GX0 * 2 + 1, GX1 * 2]) { bridge.R.set(X, P * 2 + 3, MZ1 * 2, B.iron); bridge.R.set(X, P * 2 + 4, MZ1 * 2, B.iron); }
      // 도개교 쇠사슬 고리(문루 앞면)
      for (const x of [GX0, GX1]) { w.set(x, P + 20, 53, B.iron); w.set(x, P + 21, 53, B.chain); }
      acts.push({
        name: '도개교', hint: '다리가 성문 쪽으로 들렸다가 다시 내려와요', hit: [GX0, P, 51, GX1, P + 2, MZ1],
        run: async a => { await a.turn('bridge', [-1.35, 0, 0], 3); await a.wait(1.6); await a.turn('bridge', [0, 0, 0], 2.6); a.burst([MIDX + 0.5, P + 1, 61], { n: 28, colors: ['#d8d4ca', '#a8a49c'], speed: 5, up: 1, life: 0.9, gravity: 3, spread: 6, flat: true }); },
      });
      // 문루 쪽문(통로 서쪽 벽): 수비대 초소와 쇠창살 감기 방으로 드는 작은 문
      {
        const PX = GX0 - 1, Q0 = 39, Q1 = 40;
        w.box(PX, P + 1, Q0, PX, P + 4, Q1, B.door); w.box(PX, P + 1, Q0, PX, P + 4, Q0, B.wood);
        w.box(PX, P + 1, Q0 - 1, PX, P + 5, Q0 - 1, B.trim); w.box(PX, P + 1, Q1 + 1, PX, P + 5, Q1 + 1, B.trim); w.box(PX, P + 5, Q0, PX, P + 5, Q1, B.trim);
        w.set(PX, P + 6, Q0, B.gold); w.set(PX, P + 6, Q1, B.gold); w.set(PX + 1, P + 3, Q1, B.iron);
        w.set(PX + 1, P + 6, Q1 + 2, B.iron); w.set(PX + 1, P + 5, Q1 + 2, B.lampG);
        acts.push({
          name: '성문 문루 안으로', goto: 'castlegate-gatehouse', hint: '통로 옆 쪽문을 열고 수비대 초소와 쇠창살 감기 방이 있는 문루 안으로 들어가요', hit: [PX, P + 1, Q0, PX + 1, P + 5, Q1],
          run: async a => {
            const o = { n: 24, colors: ['#ffe9a0', '#ffffff', '#ffd060'], speed: 1.6, up: 1.5, life: 1, gravity: -0.4, spread: 1.2 };
            a.burst([PX + 1.5, P + 4, Q0 + 1], o);
            for (const x of [80, 95]) a.burst([x + 1, CG + 15, 53.5], o);   // 문루 창에 불빛이 번진다
            await a.wait(0.6);
          },
        });
      }
      // 성문 문짝 너머 왕성 본관(성 내부 지도)으로: 문짝 앞과 아치 머릿돌, 본성 탑 위로 금빛이 번진다
      acts.push({
        name: '성 안으로', goto: 'innerkeep', hint: '큰 성문 문짝 사이로 지나 왕성 본관 안으로 들어가요', hit: [GX0 + 2, P + 1, 36, GX1 - 2, P + 10, 37],
        run: async a => {
          const o = { n: 30, colors: ['#ffe9a0', '#ffffff', '#ffd060'], speed: 2, up: 2, life: 1, gravity: -0.4, spread: 1.6 };
          a.burst([MIDX + 1, P + 4, 38], o); a.burst([MIDX + 0.5, P + 21, 55], o); a.burst([MIDX + 0.5, CG + 82, 14.5], o); a.burst([MIDX + 0.5, CG + 70, 43.5], o);
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '왕성 정문', note: '쌍탑 사이의 문루와 쇠창살', p: [MIDX + 0.5, Math.max(...towerTops) + 4, 47.5], tag: 'GATE' });
      landmarks.push({ name: '도개교', note: '해자 위로 내린 다리', p: [MIDX + 0.5, P + 9, 56] });

      // ── 성벽 안쪽의 본성 ──
      const K0 = CG + 1;
      w.box(62, K0, 6, 114, K0 + 28, 24, B.white);
      for (const y of [K0 + 9, K0 + 18, K0 + 27]) w.walls(61, y, 5, 115, y, 25, B.whiteDk);
      for (let x = 66; x <= 110; x += 4) for (const fy of [K0 + 3, K0 + 12, K0 + 20]) {
        w.box(x, fy, 24, x + 1, fy + 3, 24, B.win); w.box(x - 1, fy - 1, 25, x + 2, fy - 1, 25, B.whiteDk); w.box(x, fy + 4, 25, x + 1, fy + 4, 25, B.trim);
      }
      const kPeak = roofHD(61, 115, 5, 25, K0 + 29, { b: B.roofB, band: B.roofB2, eave: B.eave, ridge: B.gold, gable: B.white, gwin: B.win, axis: 'x' });
      // (2배 칸) 지붕창: 흰 벽, 창틀과 십자 창살, 슬레이트 박공지붕
      for (const dx of [70, 80, 96, 106]) {
        w.box(dx - 1, K0 + 30, 21, dx + 1, K0 + 33, 24, B.white);
        const cx = dx * 2 + 1, Yw = (K0 + 30) * 2 + 1;
        for (let y = Yw; y <= Yw + 5; y++) for (let x = cx - 2; x <= cx + 1; x++) R.set(x, y, 49, (x === cx - 2 || x === cx + 1 || y === Yw || y === Yw + 5) ? B.trim : (y === Yw + 3 ? B.iron : B.win));
        R.box(cx - 3, Yw - 1, 50, cx + 2, Yw - 1, 50, B.whiteDk);
        roofHD(dx - 2, dx + 2, 20, 25, K0 + 34, { b: B.slate, eave: B.eave, ridge: B.gold, axis: 'z' });
      }
      for (const cx of [66, 110]) { w.box(cx, K0 + 29, 9, cx + 1, kPeak + 3, 10, B.whiteDk); w.box(cx - 1, kPeak + 4, 8, cx + 2, kPeak + 4, 11, B.trim); }
      for (const tx of [62, 114]) towerHD(tx, 24, K0, 36, 4.2, tm, { step: 0.34 });
      towerHD(MIDX, 14, K0 + 24, 32, 7, tm, { step: 0.34, foot: false });

      // ── 대광장: 격자 포장, 푸른 행렬 길 ──
      for (let z = PZ0; z < D; z++) for (let x = 0; x < W; x++) {
        const inLane = x >= GX0 - 1 && x <= GX1 + 1;
        let b;
        if (inLane) b = (x === GX0 - 1 || x === GX1 + 1) ? B.goldP : (x === MIDX && z % 10 === 5) ? B.goldP : B.carpet;
        else if (z > PZ1) b = z === PZ1 + 1 || z === PZ1 + 2 ? B.trim : ((x * 3 + z) % 7 === 0 ? B.paveD : B.pave);
        else if (x % 22 === 0 || z % 22 === 18) b = B.whiteDk;
        else b = ((x >> 2) + (z >> 2)) % 2 ? B.slab : B.cobble;
        MH.paint(w, x, z, b);
      }
      // 옹벽 위 난간(해자 쪽)
      for (let x = 0; x < W; x++) {
        if (x >= GX0 - 2 && x <= GX1 + 2) continue;
        if (x % 3 === 0) w.box(x, P + 1, PZ0, x, P + 2, PZ0, B.trim); else w.set(x, P + 2, PZ0, B.white);
        w.set(x, P + 3, PZ0, B.trim);
      }
      for (const x of [GX0 - 3, GX1 + 3]) { w.box(x, P + 1, PZ0, x, P + 5, PZ0, B.whiteDk); w.set(x, P + 6, PZ0, B.gold); }
      // 행렬 길 볼라드와 사슬
      for (let z = 66; z <= PZ1; z += 4) for (const x of [GX0 - 2, GX1 + 2]) {
        if (z % 8 === 2) { w.box(x, P + 1, z, x, P + 2, z, B.iron); w.set(x, P + 3, z, B.gold); }
        else w.set(x, P + 2, z, B.chain);
      }
      // 선왕 석상(받침과 큰 입상)
      const swords = [];
      const statue = (x, z) => {
        const g = P + 1;
        w.box(x - 3, g, z - 3, x + 4, g, z + 4, B.whiteDk); w.box(x - 2, g + 1, z - 2, x + 3, g + 1, z + 3, B.whiteDk);
        w.box(x - 1, g + 2, z - 1, x + 2, g + 4, z + 2, B.white); w.walls(x - 2, g + 5, z - 2, x + 3, g + 5, z + 3, B.trim);
        for (const [cx, cz] of [[x - 1, z - 1], [x + 2, z - 1], [x - 1, z + 2], [x + 2, z + 2]]) w.box(cx, g + 2, cz, cx, g + 4, cz, B.trim);
        w.box(x, g + 3, z + 3, x + 1, g + 3, z + 3, B.gold);                   // 이름판
        for (const [fx, fz] of [[x - 3, z + 4], [x + 4, z + 4], [x - 3, z - 3], [x + 4, z - 3]]) w.set(fx, g + 1, fz, hash3(fx, 2, fz) > 0.5 ? B.flowerR : B.flowerY);
        // (2배 칸) 앉은 사자상(사람 모양 대신): 엉덩이·가슴·앞다리와 발, 갈기, 머리와 주둥이, 금 왕관, 말린 꼬리
        const y = g + 6, cx = x + 0.5;
        w.box(x - 1, g + 5, z - 1, x + 2, g + 5, z + 2, B.white);
        w.ellipsoid(cx, y + 2, z - 0.5, 2, 2.2, 2.2, B.white);
        w.ellipsoid(cx, y + 4.5, z + 1, 1.6, 2.6, 1.5, B.white);
        for (const lx of [x - 0.5, x + 1.5]) { w.box(lx, y, z + 2, lx + 0.5, y + 3, z + 2.5, B.white); w.box(lx, y, z + 3, lx + 0.5, y, z + 3, B.trim); }
        w.ellipsoid(cx, y + 6.5, z + 1.5, 2, 2.2, 1.6, B.whiteDk);
        w.ellipsoid(cx, y + 7, z + 2.5, 1.5, 1.5, 1.5, B.white);
        w.box(x, y + 6, z + 3.5, x + 1, y + 6.5, z + 4, B.trim); w.set(x, y + 7.5, z + 4, B.dark); w.set(x + 1, y + 7.5, z + 4, B.dark);
        w.box(x - 0.5, y + 8.5, z + 1.5, x + 1.5, y + 8.5, z + 3, B.gold); for (const [cx2, cz2] of [[x - 0.5, z + 1.5], [x + 1.5, z + 1.5], [x - 0.5, z + 3], [x + 1.5, z + 3], [x + 0.5, z + 3]]) w.set(cx2, y + 9, cz2, B.gold);
        w.set(x + 0.5, y + 9.5, z + 3, B.flowerR);
        w.box(x + 2, y, z - 2.5, x + 2.5, y, z - 1, B.white); w.box(x + 2.5, y + 0.5, z - 1, x + 2.5, y + 1.5, z - 1, B.white); w.set(x + 2.5, y + 2, z - 1, B.whiteDk);
        const sw = w.prop({ name: 'sword' + swords.length, pivot: [x + 3.5, y + 8, z + 2.5] }); swords.push([x, y, z]);
        sw.box(x + 3, y + 1, z + 2, x + 3, y + 12, z + 2, B.gold); sw.box(x + 3, y + 3, z + 1, x + 3, y + 3, z + 3, B.gold);
        return y + 12;
      };
      let sTop = 0;
      for (const z of [76, 98, 120]) for (const x of [65, 110]) sTop = Math.max(sTop, statue(x, z));
      landmarks.push({ name: '선왕들의 석상', note: '금 왕관을 쓴 여섯 사자상이 광장을 지킨다', p: [66, sTop + 4, 98.5] });
      // 쌍분수: 이단 물받이와 금빛 물꼭지
      const FZ = 100;
      for (const FX of [34, 142]) {
        for (let z = FZ - 12; z <= FZ + 12; z++) for (let x = FX - 12; x <= FX + 12; x++) {
          const d = MH.dist(x, z, FX, FZ);
          if (d > 11.6) continue;
          if (d > 10.4) { MH.paint(w, x, z, B.whiteDk); continue; }
          if (d > 9) { w.set(x, P + 1, z, B.white); w.set(x, P + 2, z, B.trim); continue; }
          MH.setH(w, x, z, P - 2, B.whiteDk, B.found); w.liquid(x, z, P);
        }
        w.cyl(FX, FZ, P - 1, P + 5, 1.6, B.white); w.cyl(FX, FZ, P + 6, P + 6, 4.6, B.white); w.ring(FX, FZ, P + 7, 3.6, 4.6, B.trim); w.cyl(FX, FZ, P + 7, P + 7, 3.6, B.waterB);
        w.cyl(FX, FZ, P + 8, P + 10, 1, B.white); w.cyl(FX, FZ, P + 11, P + 11, 2.6, B.white); w.ring(FX, FZ, P + 12, 1.8, 2.6, B.gold); w.cyl(FX, FZ, P + 12, P + 12, 1.8, B.waterB);
        w.box(FX, P + 13, FZ, FX, P + 15, FZ, B.white); w.box(FX, P + 16, FZ, FX, P + 17, FZ, B.gold);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(FX + dx * 10, P + 3, FZ + dz * 10, B.gold); w.set(FX + dx * 5, P + 6, FZ + dz * 5, B.gold); }
        for (const [dx, dz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) { const bx = FX + dx * 9, bz = FZ + dz * 9; w.box(bx, P + 1, bz, bx, P + 4, bz, B.trim); w.set(bx, P + 5, bz, B.gold); }
      }
      acts.push({
        name: '쌍분수', hint: '양쪽 분수가 함께 솟구쳐요', hit: [26, P + 1, 92, 42, P + 17, 108],
        run: async a => { for (let k = 0; k < 8; k++) { for (const FX of [34, 142]) a.burst([FX + 0.5, P + 17, FZ + 0.5], { n: 40, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 5, up: 13, life: 1.9, gravity: 12, spread: 1 }); await a.wait(0.32); } },
      });
      landmarks.push({ name: '쌍분수', note: '광장 양쪽의 이단 분수', p: [34.5, P + 24, FZ + 0.5] });
      // 등불 오벨리스크(옛 깃대 자리)
      for (const [fx, fz] of [[50, 68], [126, 68], [50, 142], [126, 142]]) {
        w.box(fx - 1, P + 1, fz - 1, fx + 1, P + 2, fz + 1, B.whiteDk); w.box(fx - 1, P + 3, fz - 1, fx + 1, P + 3, fz + 1, B.trim);
        w.box(fx, P + 4, fz, fx, P + 22, fz, B.white); w.set(fx, P + 12, fz, B.gold); w.set(fx, P + 23, fz, B.gold); w.set(fx, P + 24, fz, B.gold);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(fx + dx, P + 18, fz + dz, B.iron); w.set(fx + dx, P + 17, fz + dz, B.lampG); }
        lights.push({ p: [fx + 0.5, P + 17, fz + 0.5], c: '#ffe0a0', i: 1.1, d: 18, flicker: 0.05, night: true });
      }
      // 양쪽 기둥 회랑: 뒷벽·벤치·옥상 난간
      for (const cx of [10, 166]) {
        const out = cx < MIDX ? -1 : 1, bx = cx + out * 4;
        w.box(bx, P + 1, 66, bx, P + 15, 144, B.whiteDk);
        for (let z = 70; z <= 140; z += 6) { w.box(bx + out, P + 1, z - 2, bx + out, P + 13, z - 2, B.white); w.box(bx + out, P + 5, z + 1, bx + out, P + 9, z + 1, B.win); w.set(bx + out, P + 10, z + 1, B.trim); }
        w.box(bx + out, P + 14, 66, bx + out, P + 14, 144, B.trim);
        for (let z = 70; z <= 140; z += 10) { const fx = bx - out * 0.5; w.box(fx, P + 1, z, fx, P + 12, z + 1, B.whiteDk); w.box(fx, P + 6, z, fx, P + 6, z + 1, B.gold); w.box(fx - out * 0.5, P + 12, z - 0.5, fx, P + 12.5, z + 1.5, B.trim); w.set(bx - out * 1.5, P + 8, z + 0.5, B.iron); w.set(bx - out * 1.5, P + 8.5, z + 0.5, B.lampG); }   // 벽기둥과 벽등(천 장식 대신)
        for (let z = 66; z <= 144; z++) for (let x = Math.min(cx, bx); x <= Math.max(cx, bx); x++) MH.paint(w, x, z, B.slab);
        for (let z = 68; z <= 142; z += 6) {
          w.box(cx - 1, P + 1, z - 1, cx + 1, P + 1, z + 1, B.whiteDk); w.box(cx, P + 2, z, cx, P + 12, z, B.white); w.box(cx - 1, P + 13, z - 1, cx + 1, P + 13, z + 1, B.trim);
          if (z % 12 === 8) { w.set(cx - out, P + 10, z, B.lampG); w.set(cx - out, P + 11, z, B.iron); lights.push({ p: [cx - out + 0.5, P + 10, z + 0.5], c: '#ffd890', i: 1, d: 14, flicker: 0.05, night: true }); }
          else if (z < 140) { w.box(cx - out * 2, P + 1, z + 2, cx - out * 2, P + 1, z + 4, B.wood); w.box(cx - out * 3, P + 1, z + 2, cx - out * 3, P + 2, z + 4, B.wood); }
        }
        w.box(Math.min(cx, bx) - 1, P + 14, 65, Math.max(cx, bx) + 1, P + 15, 145, B.white); w.box(Math.min(cx, bx) - 2, P + 16, 64, Math.max(cx, bx) + 2, P + 16, 146, B.whiteDk);
        for (let z = 64; z <= 146; z++) if (z % 3 === 0) w.set(cx - out * 1, P + 17, z, B.trim); else w.set(cx - out, P + 18, z, B.trim);
        for (let z = 64; z <= 146; z += 3) w.set(cx - out, P + 18, z, B.trim);
      }
      // 길가 쌍등
      for (const [lx, lz] of [[74, 66], [102, 66], [74, 108], [102, 108], [74, 146], [102, 146]]) {
        const p = MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lampG, found: B.whiteDk }, h: 8, dir: 'x' });
        w.set(lx - 1, P + 8, lz, B.iron); w.set(lx - 1, P + 7, lz, B.lampG); w.set(lx, P + 10, lz, B.gold);
        lights.push({ p, c: '#ffe0a0', i: 1, d: 16, flicker: 0.05, night: true });
      }
      // 화단 나무
      for (const [tx, tz] of [[24, 72], [152, 72], [24, 132], [152, 132]]) {
        w.walls(tx - 4, P + 1, tz - 4, tx + 4, P + 1, tz + 4, B.whiteDk); w.walls(tx - 4, P + 2, tz - 4, tx + 4, P + 2, tz + 4, B.trim);
        w.box(tx - 3, P + 1, tz - 3, tx + 3, P + 1, tz + 3, B.grass);
        for (let k = 0; k < 10; k++) { const fx = tx - 3 + ((k * 5) % 7), fz = tz - 3 + ((k * 3) % 7); if (Math.abs(fx - tx) > 1 || Math.abs(fz - tz) > 1) w.set(fx, P + 2, fz, [B.flowerR, B.flowerY, B.flowerW, B.flowerP][k % 4]); }
        MH.tree(w, tx, P + 2, tz, { kind: 'oak', h: 10, bark: B.bark, leaves: [B.leaf2, B.leaf, B.leafDk], r: 4.6 });
      }
      // 성문 탑의 봉화(축포)
      acts.push({
        name: '축포', hint: '성문 쌍탑 위로 축포가 터져요', hit: [61, CG + 30, 38, 115, CG + 56, 56],
        run: async a => {
          const sets = [['#6ab0ff', '#ffffff'], ['#ffe060', '#fff4c0'], ['#ffffff', '#c8d4ee']];
          for (let k = 0; k < 6; k++) {
            const tx = k % 2 ? 106 : 70, top = towerTops[k % 2];
            a.burst([tx + 0.5, top, 47.5], { n: 10, colors: ['#ffe8a0'], speed: 0.5, up: 18, life: 0.9, gravity: 4, spread: 0.3 });
            await a.wait(0.7);
            a.burst([tx + (k - 2.5) * 3, top + 18, 49], { n: 100, colors: sets[k % 3], speed: 17, up: 2, life: 1.6, gravity: 2.5, spread: 1 });
            await a.wait(0.3);
          }
        },
      });
      // ── 선왕의 검: 여섯 석상이 금빛 검을 들어 올린다 ──
      acts.push({
        name: '선왕의 검', hint: '여섯 사자상 곁의 금빛 검이 일제히 솟아오르자 사자의 왕관이 반짝여요', hit: [63, P + 7, 74, 69, P + 22, 79],
        run: async a => {
          for (let k = 0; k < 6; k++) { a.move('sword' + k, [0, 5, 0], 1.2); await a.wait(0.25); }
          await a.wait(1);
          for (let q = 0; q < 3; q++) { swords.forEach(([x, y, z]) => { a.burst([x + 1, y + 15, z + 1], { n: 12, colors: ['#ffe060', '#ffffff', '#fff4c0'], speed: 3, up: 3, life: 1.2, gravity: 1, spread: 1 }); a.burst([x + 3.5, y + 18, z + 2.5], { n: 6, colors: ['#ffffff', '#ffe8a0'], speed: 2, up: 2, life: 0.8, gravity: 0, spread: 0.5 }); }); await a.wait(0.6); }
          await Promise.all(swords.map((s, k) => a.move('sword' + k, [0, 0, 0], 1.4)));
        },
      });
      // ── 성문 화로(부품): 불꽃이 확 일어난다 ──
      const braz = [[78, 70], [98, 70], [78, 90], [98, 90]];
      braz.forEach(([bx, bz], k) => {
        w.box(bx - 1, P + 1, bz - 1, bx + 1, P + 1, bz + 1, B.whiteDk); w.box(bx, P + 2, bz, bx, P + 4, bz, B.iron);
        for (const [dx, dz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) w.set(bx + dx, P + 2, bz + dz, B.iron);
        w.ring(bx, bz, P + 5, 0.9, 2.2, B.iron); w.ring(bx, bz, P + 6, 1.4, 2.2, B.gold); w.set(bx, P + 5, bz, B.iron);
        const f = w.prop({ name: 'fire' + k, pivot: [bx + 0.5, P + 6, bz + 0.5], scl0: [0.3, 0.2, 0.3] });
        f.box(bx - 1, P + 6, bz, bx + 1, P + 6, bz, B.fire2); f.box(bx, P + 6, bz - 1, bx, P + 6, bz + 1, B.fire2); f.box(bx, P + 6, bz - 1, bx, P + 8, bz + 1, B.fire); f.box(bx - 1, P + 7, bz, bx + 1, P + 7, bz, B.fire); f.set(bx, P + 9, bz, B.fire);
        if (k < 2) lights.push({ name: 'brazier', p: [bx + 0.5, P + 8, bz + 0.5], c: '#ff9a40', i: 1.4, d: 20, flicker: 0.35 });
      });
      acts.push({
        name: '성문 화로', hint: '도개교 앞 네 화로에 불길이 확 치솟고 불티가 날려요', hit: [76, P + 1, 68, 80, P + 9, 72],
        run: async a => {
          a.flash('brazier', 3.5, 5); a.glow(1.8, 5);
          await Promise.all(braz.map((b, k) => a.tween('fire' + k, { scl: [1.2, 1.6, 1.2] }, 0.6)));
          for (let q = 0; q < 8; q++) { braz.forEach(([bx, bz]) => a.burst([bx + 0.5, P + 9, bz + 0.5], { n: 10, colors: ['#ffb04a', '#ff7a2a', '#ffe08a'], speed: 2, up: 6, life: 1.2, gravity: -1, spread: 1 })); await a.wait(0.45); }
          await Promise.all(braz.map((b, k) => a.tween('fire' + k, { scl: [0.3, 0.2, 0.3] }, 1.4)));
        },
      });
      // ── 왕실 마차(부품): 성문 앞에서 출발해 푸른 융단 길을 따라 개선문을 지나 왕도로 떠난다 ──
      const MZ = 84, my = P + 1;
      const coach = w.prop({ name: 'coach', pivot: [MIDX + 0.5, my, MZ + 0.5] });
      coach.box(86, my + 2, MZ - 3, 90, my + 6, MZ + 3, B.coach); coach.box(86, my + 7, MZ - 3, 90, my + 7, MZ + 3, B.gold); coach.box(87, my + 8, MZ - 2, 89, my + 8, MZ + 2, B.coach); coach.set(88, my + 9, MZ, B.gold);
      for (const x of [86, 90]) { coach.box(x, my + 4, MZ - 1, x, my + 5, MZ + 1, B.glass); coach.box(x, my + 2, MZ - 3, x, my + 2, MZ + 3, B.gold); }
      for (const x of [85, 91]) for (const z of [MZ - 2, MZ + 2]) { coach.box(x, my, z - 1, x, my + 2, z + 1, B.iron); coach.set(x, my + 1, z, B.gold); }
      coach.box(88, my + 2, MZ + 4, 88, my + 2, MZ + 6, B.wood); coach.box(87, my + 2, MZ + 6, 89, my + 2, MZ + 6, B.wood);
      for (const [x, z] of [[86, MZ - 3], [90, MZ - 3], [86, MZ + 3], [90, MZ + 3]]) coach.set(x, my + 8, z, B.gold);
      acts.push({
        name: '왕실 마차', hint: '성문 앞에 선 금장 왕실 마차가 푸른 융단 길을 따라 개선문을 지나 왕도로 떠나요', hit: [85, my, MZ - 3, 91, my + 9, MZ + 6],
        run: async a => {
          const dust = async (z0, dz) => { for (let k = 0; k < 10; k++) { a.burst([MIDX + 0.5, my + 0.5, z0 + dz * k], { n: 10, colors: ['#c8d4ee', '#d8d4ca'], speed: 2, up: 1, life: 0.8, gravity: 2, spread: 3, flat: true }); await a.wait(0.5); } };
          for (let k = 0; k < 3; k++) { a.burst([MIDX + 0.5, P + 20, MZ - 4], { n: 44, colors: ['#ffffff', '#ffd0e0', '#ffe060'], speed: 6, up: 4, life: 2, gravity: 2, spread: 4 }); await a.wait(0.4); }
          await Promise.all([a.drive('coach', [[0, 0, 20], [0, 0, 44], [0, 0, 68], [0, 0, 88], [0, 0, 112]], 8, { fwd: '+z', back: 1.0 }), dust(MZ + 4, 8)]);
        },
      });
      // ── 해자 물고기(부품): 금붕어들이 물 위로 뛰어오른다 ──
      const fish = [[36, 55], [50, 57], [124, 55], [138, 57]];
      fish.forEach(([fx, fz], k) => {
        const f = w.prop({ name: 'fish' + k, pivot: [fx + 1, WL - 1, fz + 0.5] });
        f.box(fx, WL - 1, fz, fx + 1, WL - 1, fz, k % 2 ? B.fishW : B.fishO); f.set(fx + 2, WL - 1, fz, B.fishO); f.set(fx - 1, WL - 1, fz, B.fishO); f.set(fx - 1, WL, fz, B.fishO);
      });
      acts.push({
        name: '해자 물고기', hint: '해자의 금붕어들이 물 위로 펄쩍펄쩍 뛰어오르며 해자를 따라 헤엄쳐 가요', hit: [34, WL - 1, 53, 52, WL + 3, 59],
        run: async a => {
          const splash = (x, z) => a.burst([x, WL + 1, z], { n: 14, colors: ['#e0f4ff', '#8ac0f0', '#ffffff'], speed: 2.5, up: 3, life: 0.8, gravity: 9, spread: 1 });
          await Promise.all(fish.map(async ([fx, fz], k) => {
            await a.wait(0.3 + k * 0.35);
            const dir = 1, edge = W - fx + 10;
            splash(fx + 1, fz + 0.5);
            const hops = [];
            let nh = 0; while (nh < 4) { const xe = fx + 10 * (nh + 1); if (xe <= 80 || (xe >= 100 && xe <= 154)) nh++; else break; } for (let j = 0; j < nh; j++) { const o = dir * 10 * j; hops.push([o + dir * 2, 4, 0], [o + dir * 4, 6, 0], [o + dir * 6, 4, 0], [o + dir * 8, 0.5, 0], [o + dir * 10, 0, 0]); }
            const sp = (async () => { for (let j = 0; j < nh; j++) { await a.wait(1.2); splash(fx + 1 + dir * (10 * j + 8), fz + 0.5); } })();
            await Promise.all([a.drive('fish' + k, [...hops, [edge, 0, 0]], 1.6 * nh + 7, { fwd: '+x', back: 1.0 }), sp]);
          }));
        },
      });

      // ── 새 구역: 개선문과 꽃시장 거리(광장 남쪽 끝) ──
      const AZ0 = 156, AZ1 = 163, AX0 = 66, AX1 = 110, AT = P + 30;
      w.box(AX0, P + 1, AZ0, AX1, AT, AZ1, B.white);
      const arch = (x0, x1, top) => {
        const mid = (x0 + x1) / 2, hw = (x1 - x0) / 2 + 0.5;
        for (let x = x0; x <= x1; x++) {
          const t = top - Math.round(Math.pow(Math.abs(x - mid) / hw, 2) * 4);
          w.box(x, P + 1, AZ0, x, t, AZ1, 0);
          for (const z of [AZ0, AZ1]) { w.set(x, t + 1, z, (x & 1) ? B.gold : B.trim); }
        }
        for (const z of [AZ0, AZ1]) { w.box(x0 - 1, P + 1, z, x0 - 1, top - 4, z, B.trim); w.box(x1 + 1, P + 1, z, x1 + 1, top - 4, z, B.trim); }
      };
      arch(GX0, GX1, P + 19); arch(70, 76, P + 11); arch(100, 106, P + 11);
      for (let z = AZ0; z <= AZ1; z++) for (let x = GX0 - 1; x <= GX1 + 1; x++) MH.paint(w, x, z, x === GX0 - 1 || x === GX1 + 1 ? B.goldP : B.carpet);
      // 기둥(앞뒤 면), 띠, 처마돌림, 비문 띠
      for (const z of [AZ0 - 1, AZ1 + 1]) {
        for (const cx of [AX0 + 1, 79, 97, AX1 - 1]) { w.box(cx - 1, P + 1, z, cx + 1, P + 2, z, B.whiteDk); w.box(cx, P + 3, z, cx, P + 22, z, B.trim); w.box(cx - 1, P + 23, z, cx + 1, P + 23, z, B.gold); }
        w.box(AX0, P + 24, z, AX1, P + 24, z, B.whiteDk);
        for (let x = AX0; x <= AX1; x++) w.set(x, AT, z, (x & 1) ? B.trim : B.whiteDk);
        for (let x = 72; x <= 104; x++) if (x % 3) w.set(x, P + 27, z, B.gold);
        for (const [mx, my2] of [[72, P + 16], [104, P + 16]]) { w.box(mx - 2, my2, z, mx + 2, my2 + 4, z, B.whiteDk); w.box(mx - 1, my2 + 1, z + (z > AZ1 ? 1 : -1), mx + 1, my2 + 3, z + (z > AZ1 ? 1 : -1), B.gold); }
      }
      w.box(AX0 - 1, AT + 1, AZ0 - 1, AX1 + 1, AT + 1, AZ1 + 1, B.whiteDk);
      for (let x = AX0 - 1; x <= AX1 + 1; x += 2) for (const z of [AZ0 - 1, AZ1 + 1]) w.set(x, AT + 2, z, B.trim);
      for (let z = AZ0 - 1; z <= AZ1 + 1; z += 2) for (const x of [AX0 - 1, AX1 + 1]) w.set(x, AT + 2, z, B.trim);
      // 개선문 위 종루와 종(부품)
      const BT = AT + 2, BCX = MIDX, BCZ = 159;
      for (const [px, pz] of [[BCX - 4, BCZ - 3], [BCX + 4, BCZ - 3], [BCX - 4, BCZ + 3], [BCX + 4, BCZ + 3]]) w.box(px, BT, pz, px, BT + 9, pz, B.white);
      w.box(BCX - 5, BT, BCZ - 4, BCX + 5, BT, BCZ + 4, B.whiteDk);
      w.box(BCX - 5, BT + 10, BCZ - 4, BCX + 5, BT + 10, BCZ + 4, B.trim);
      const bPeak = MH.pyramid(R, (BCX - 6) * 2, (BCZ - 5) * 2, (BCX + 6) * 2 + 1, (BCZ + 5) * 2 + 1, (BT + 11) * 2, B.roofB, 1, B.eave) / 2;
      w.box(BCX, bPeak, BCZ, BCX, bPeak + 3, BCZ, B.gold); w.box(BCX - 1, bPeak + 2, BCZ, BCX + 1, bPeak + 2, BCZ, B.gold);
      w.box(BCX - 3, BT + 9, BCZ, BCX + 3, BT + 9, BCZ, B.wood);
      const bell = w.prop({ name: 'bell', pivot: [BCX + 0.5, BT + 9, BCZ + 0.5], axis: 'z' });
      bell.box(BCX, BT + 8, BCZ, BCX, BT + 8, BCZ, B.bronze);
      for (let y = BT + 3; y <= BT + 7; y++) { const r = y <= BT + 4 ? 2 : y <= BT + 6 ? 1.5 : 1; bell.cyl(BCX, BCZ, y, y, r, B.bronze); }
      bell.ring(BCX, BCZ, BT + 3, 1.6, 2.4, B.gold); bell.set(BCX, BT + 2, BCZ, B.gold);
      lights.push({ name: 'archbell', p: [BCX + 0.5, BT + 1, BCZ + 0.5], c: '#ffe8a0', i: 0.2, d: 26, flicker: 0, srcR: 6 });
      w.set(BCX, BT + 1, BCZ - 4, B.lampG); w.set(BCX, BT + 1, BCZ + 4, B.lampG);
      landmarks.push({ name: '개선문', note: '광장 남쪽 입구의 세 갈래 아치와 종루', p: [MIDX + 0.5, bPeak + 6, 159.5], tag: 'ARCH' });
      acts.push({
        name: '개선문 종', hint: '개선문 종루의 큰 종이 크게 흔들리며 꽃잎이 거리 위로 쏟아져요', hit: [BCX - 4, BT + 1, BCZ - 3, BCX + 4, BT + 9, BCZ + 3],
        run: async a => {
          a.flash('archbell', 8, 4);
          const petals = async () => { for (let k = 0; k < 10; k++) { for (const dx of [-16, 0, 16]) a.burst([BCX + 0.5 + dx, AT + 4, BCZ + 6], { n: 18, colors: ['#ffc0d8', '#ffffff', '#ffe060', '#f08ab8'], speed: 4, up: 3, life: 2.6, gravity: 1.2, spread: 3 }); await a.wait(0.35); } };
          const swing = async () => { for (const amp of [0.7, 0.55, 0.4, 0.25]) { await a.turn('bell', [0, 0, amp], 0.45); a.burst([BCX + 0.5, BT + 3, BCZ + 0.5], { n: 8, colors: ['#ffe8a0', '#ffffff'], speed: 5, up: 1, life: 0.6, gravity: 0, spread: 1 }); await a.turn('bell', [0, 0, -amp], 0.45); } await a.turn('bell', [0, 0, 0], 0.4); };
          await Promise.all([swing(), petals()]);
        },
      });
      // 화단 띠(광장과 거리 사이)
      for (const [x0, x1] of [[4, 62], [114, 172]]) {
        for (let x = x0; x <= x1; x++) {
          w.set(x, P + 1, 152, B.whiteDk); w.set(x, P + 1, 154, B.whiteDk); w.set(x, P + 1, 153, B.soil);
          if (x === x0 || x === x1) w.box(x, P + 1, 152, x, P + 1, 154, B.whiteDk);
          else w.set(x, P + 2, 153, [B.flowerR, B.flowerP, B.flowerY, B.flowerW, B.flowerV, B.flowerB][(x * 7 + (x >> 2)) % 6]);
          if (x % 8 === 4) MH.bush(w, x, P + 1, 153, 1.4, [B.hedge, B.leaf, B.leafDk]);
        }
      }
      // 꽃 노점
      const awn = [[B.awnR, B.awnW], [B.awnB, B.awnW], [B.awnY, B.awnW], [B.flowerP, B.awnW]];
      const flw = [B.flowerR, B.flowerP, B.flowerY, B.flowerW, B.flowerV, B.flowerB, B.flowerO];
      const stalls = [];
      // (2배 칸) 꽃 노점: 가는 기둥, 판자 진열대와 선반 단, 양동이마다 줄기·잎·꽃송이, 줄무늬 차양과 물결 테두리
      const stallHD = (x, z, k, a1, a2) => {
        const sxN = 8, szN = 4, y = MH.maxG(w, x, z, x + sxN - 1, z + szN - 1) + 1;
        for (const [px, pz] of [[x, z], [x + sxN - 0.5, z], [x, z + szN - 0.5], [x + sxN - 0.5, z + szN - 0.5]]) w.box(px, y, pz, px, y + 4.5, pz, B.wood);
        w.box(x + 0.5, y, z + szN - 1, x + sxN - 1, y + 1, z + szN - 0.5, B.plank); w.box(x, y + 1.5, z + szN - 1, x + sxN - 0.5, y + 1.5, z + szN - 0.5, B.wood);
        w.box(x + 0.5, y, z, x + sxN - 1, y + 1, z + 0.5, B.crate); w.box(x + 0.5, y + 1.5, z, x + sxN - 1, y + 2, z, B.plank);
        for (let dx = 0.5; dx < sxN - 0.5; dx += 1) {
          for (const [zz, yy] of [[z + szN - 1, y + 2], [z, y + 2.5]]) {
            const c = flw[(k + dx * 2 + (zz === z ? 3 : 0)) % 7];
            w.set(x + dx, yy, zz, B.bucket); w.set(x + dx, yy + 0.5, zz, B.leaf2);
            w.set(x + dx, yy + 1, zz, c); if ((dx * 2 + k) % 3 === 0) { w.set(x + dx + 0.5, yy + 0.5, zz, B.leaf2); w.set(x + dx + 0.5, yy + 1.5, zz, c); }
          }
        }
        for (let dz = -1; dz <= szN; dz += 0.5) for (let dx = -1; dx <= sxN - 0.5; dx += 0.5) {
          const yy = y + 5 + (dz < 1 ? 0.5 : 0) - (dz >= szN - 0.5 ? 0.5 : 0);
          w.set(x + dx, yy, z + dz, (Math.floor(dx) & 1) ? a1 : a2);
          if (dz === szN && (dx * 2) % 2 === 0) w.set(x + dx, yy - 0.5, z + dz, (Math.floor(dx) & 1) ? a1 : a2);
        }
        return y + 6;
      };
      [10, 22, 34, 46, 120, 132, 144, 156].forEach((sx, k) => {
        const top = stallHD(sx, 165, k, awn[k % 4][0], awn[k % 4][1]);
        stalls.push([sx, top]);
        for (let dx = 0; dx < 8; dx += 2) { w.set(sx + dx, P + 1, 170, B.bucket); w.set(sx + dx, P + 2, 170, flw[(k + dx) % 7]); if (dx % 4 === 0) w.set(sx + dx, P + 3, 170, B.leaf2); }
        if (k % 2 === 0) lights.push({ p: [sx + 4.5, top - 2, 164.5], c: '#ffd890', i: 0.8, d: 12, flicker: 0.1, night: true });
        if (k % 2 === 0) w.set(sx + 4, top - 2, 164, B.lampG);
      });
      // 거리 등불과 화분
      for (const lx of [64, 112]) { const p = MH.lamp(w, lx, 168, { m: { post: B.iron, glow: B.lampG, found: B.whiteDk }, h: 7 }); lights.push({ p, c: '#ffe0a0', i: 1, d: 14, flicker: 0.05, night: true }); }
      for (const [px, pz] of [[62, 158], [114, 158], [62, 162], [114, 162]]) { w.box(px - 1, P + 1, pz - 1, px + 1, P + 1, pz + 1, B.whiteDk); w.set(px, P + 2, pz, B.soil); MH.bush(w, px, P + 2, pz, 1.6, [B.leaf2, B.leaf, B.flowerP]); }
      landmarks.push({ name: '꽃시장 거리', note: '개선문 양옆으로 늘어선 꽃 노점', p: [28, P + 14, 168] });
      // 꽃수레(부품): 거리 서쪽 끝에서 동쪽 끝까지 굴러간다
      const CX = 22, CZ = 173, cy = P + 1;
      const cart = w.prop({ name: 'cart', pivot: [CX + 2.5, cy, CZ + 0.5] });
      cart.box(CX, cy + 1, CZ - 1, CX + 5, cy + 1, CZ + 1, B.plank); cart.box(CX, cy + 2, CZ - 1, CX + 5, cy + 2, CZ - 1, B.wood); cart.box(CX, cy + 2, CZ + 1, CX + 5, cy + 2, CZ + 1, B.wood);
      cart.box(CX, cy + 2, CZ, CX, cy + 2, CZ, B.wood); cart.box(CX + 5, cy + 2, CZ, CX + 5, cy + 2, CZ, B.wood);
      for (let x = CX + 1; x <= CX + 4; x++) for (let z = CZ - 1; z <= CZ + 1; z++) cart.set(x, cy + 3 + ((x + z) & 1), z, flw[(x * 3 + z) % 7]);
      cart.set(CX + 2, cy + 5, CZ, B.flowerP); cart.set(CX + 3, cy + 5, CZ, B.flowerY);
      for (const x of [CX + 1, CX + 4]) for (const z of [CZ - 2, CZ + 2]) { cart.set(x, cy, z, B.iron); cart.set(x, cy + 1, z, B.iron); }
      cart.box(CX + 6, cy + 2, CZ, CX + 8, cy + 2, CZ, B.wood); cart.box(CX + 8, cy + 2, CZ - 1, CX + 8, cy + 2, CZ + 1, B.wood);
      acts.push({
        name: '꽃수레', hint: '꽃을 가득 실은 수레가 꽃시장 거리를 따라 동쪽 끝까지 꽃잎을 흩뿌리며 굴러가요', hit: [CX, cy, CZ - 2, CX + 8, cy + 5, CZ + 2],
        run: async a => {
          const trail = async (x0, dx) => { for (let k = 0; k < 13; k++) { a.burst([x0 + dx * k, cy + 5, CZ + 0.5], { n: 10, colors: ['#ffc0d8', '#ffe060', '#ffffff', '#a06ad8'], speed: 2, up: 3, life: 1.6, gravity: 2, spread: 1.5 }); await a.wait(0.5); } };
          await Promise.all([a.drive('cart', [[15, 0, 0], [30, 0, 0], [45, 0, 0], [60, 0, 0], [75, 0, 0], [90, 0, 0], [105, 0, 0], [120, 0, 0], [W - CX + 12, 0, 0]], 8.5, { fwd: '+x', back: 1.0 }), trail(CX + 3, 10)]);
        },
      });
      // ── 광장 비둘기 떼(부품) ──
      const doves = [[60, 88], [62, 92], [114, 86], [117, 90], [44, 120], [132, 118], [58, 132], [120, 136], [74, 126], [102, 96]];
      doves.forEach(([dx, dz], k) => {
        const g = MH.g(w, dx, dz) + 1;
        const d = w.prop({ name: 'dove' + k, pivot: [dx + 0.5, g, dz + 0.5] });
        d.box(dx, g, dz, dx + 1, g, dz, k % 3 ? B.pigeon : B.pigeonW); d.set(dx + 1, g + 1, dz, B.pigeonN); d.set(dx - 1, g, dz, B.pigeon);
        d.set(dx, g, dz - 1, B.pigeonW); d.set(dx, g, dz + 1, B.pigeonW);
      });
      acts.push({
        name: '비둘기 떼', hint: '광장의 비둘기들이 한꺼번에 날아올라 광장 위를 한 바퀴 돈 뒤 성 너머로 날아가요', hit: [56, P + 1, 84, 66, P + 4, 96],
        run: async a => {
          await Promise.all(doves.map(async ([dx, dz], k) => {
            await a.wait(k * 0.12);
            const g = P + 1;
            a.burst([dx + 0.5, g + 1, dz + 0.5], { n: 6, colors: ['#e8eaf0', '#9aa0b0'], speed: 2, up: 2, life: 0.8, gravity: 2, spread: 0.6 });
            const pts = [];
            for (let i = 0; i <= 16; i++) {
              const t = i / 16 * Math.PI * 2 + k * 0.6, r = 26 + (k % 3) * 4;
              const tx = MIDX + Math.cos(t) * r, tz = 92 + Math.sin(t) * r * 0.9;
              pts.push([tx - dx, 30 + (k % 4) * 3 + Math.sin(i * 0.9) * 2, tz - dz]);
            }
            const ex = -30 - k * 3, ez = -40 - (k % 3) * 6;
            await a.drive('dove' + k, [[1, 8, 0], ...pts, [MIDX - 20 - dx, 44, 40 - dz], [ex - dx, 50, ez - dz]], 9, { fwd: '+x', back: 1.0 });
          }));
        },
      });
      HD.syncHM(w);
      return HD.out({ lights, landmarks, acts });
    },
  }));
})();
