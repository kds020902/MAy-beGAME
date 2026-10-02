// kit.js — 지형 생성과 세밀한 건축 도구
(function () {
  'use strict';
  const { W, D, H, hash3 } = VX;
  const MH = {};
  window.MH = MH;
  window.MAPS = [];

  MH.g = (w, x, z) => (x < 0 || z < 0 || x >= w.W || z >= w.D) ? -1 : w.hm[x + w.W * z];
  MH.dist = (x, z, cx, cz) => Math.hypot(x - cx, z - cz);
  MH.lerp = (a, b, t) => a + (b - a) * t;
  MH.sstep = (a, b, t) => { const k = Math.max(0, Math.min(1, (t - a) / (b - a))); return k * k * (3 - 2 * k); };
  MH.maxG = (w, x0, z0, x1, z1) => { let y = -1; for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) y = Math.max(y, MH.g(w, x, z)); return y; };
  MH.minG = (w, x0, z0, x1, z1) => { let y = 999; for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) { const g = MH.g(w, x, z); if (g >= 0) y = Math.min(y, g); } return y; };
  // 선분까지 거리
  MH.segDist = (x, z, ax, az, bx, bz) => {
    const dx = bx - ax, dz = bz - az, l = dx * dx + dz * dz;
    const t = l ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l)) : 0;
    return Math.hypot(x - (ax + dx * t), z - (az + dz * t));
  };
  MH.polyDist = (x, z, pts) => { let d = 1e9; for (let i = 0; i < pts.length - 1; i++) d = Math.min(d, MH.segDist(x, z, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1])); return d; };

  // ───── 지형 ─────
  // o.height(x,z) → 높이, o.surface(x,z,y,slope) → 윗면, o.under(x,z,y,depth,slope) → 속
  MH.terrain = function (w, o) {
    const W = w.W, D = w.D;
    const hf = new Float32Array(W * D);
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) hf[x + W * z] = o.height(x, z);
    w.hm = new Int16Array(W * D);
    w.slope = new Float32Array(W * D);
    const floor = o.floor != null ? o.floor : 0;
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      const i = x + W * z, top = Math.round(hf[i]);
      let s = 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = Math.min(W - 1, Math.max(0, x + dx)), nz = Math.min(D - 1, Math.max(0, z + dz));
        s = Math.max(s, Math.abs(Math.round(hf[nx + W * nz]) - top));
      }
      w.slope[i] = s;
      w.hm[i] = top;
      if (top < floor) continue;
      for (let y = floor; y <= top; y++) w.set(x, y, z, y === top ? o.surface(x, z, top, s) : o.under(x, z, y, top - y, s));
    }
  };
  // 층층이 드러나는 바위 속살
  MH.strata = (B, list) => (x, z, y, dep) => dep < 2 ? B[list[0]] : B[list[1 + ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % (list.length - 1))]];
  MH.paint = (w, x, z, b) => { const y = MH.g(w, x, z); if (y >= 0) w.set(x, y, z, b); };
  MH.setH = function (w, x, z, y, top, fill) {
    const W = w.W, D = w.D;
    if (x < 0 || z < 0 || x >= W || z >= D) return;
    const cur = MH.g(w, x, z);
    for (let yy = y + 1; yy <= Math.max(cur, y) + 1; yy++) w.set(x, yy, z, 0);
    for (let yy = Math.max(0, Math.min(cur, y) - 1); yy < y; yy++) w.set(x, yy, z, fill);
    w.set(x, y, z, top);
    w.hm[x + W * z] = y;
  };
  MH.flatten = function (w, x0, z0, x1, z1, y, top, fill) {
    for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) if (MH.g(w, x, z) >= 0) MH.setH(w, x, z, y, top, fill);
  };
  MH.footing = function (w, x0, z0, x1, z1, y, b) {
    for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
      const g = MH.g(w, x, z);
      for (let yy = Math.max(0, g < 0 ? y - 4 : g + 1); yy < y; yy++) w.set(x, yy, z, b);
    }
  };
  // 수면 아래 칸을 액체로
  MH.water = function (w, level, test) {
    const W = w.W, D = w.D;
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      const g = MH.g(w, x, z);
      if (g >= level || (test && !test(x, z))) continue;
      for (let y = g + 1; y <= level; y++) w.set(x, y, z, 0);
      w.liquid(x, z, level);
    }
  };
  // 폴리라인을 따라 물길을 판다
  MH.river = function (w, pts, width, level, bed, bank) {
    const W = w.W, D = w.D;
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      const d = MH.polyDist(x + 0.5, z + 0.5, pts);
      if (d > width + 2) continue;
      const g = MH.g(w, x, z);
      if (d <= width) {
        const depth = Math.round(2 + (1 - d / width) * 2);
        MH.setH(w, x, z, Math.min(g, level - depth), bed, bed);
        w.liquid(x, z, level);
        for (let y = level - depth + 1; y <= level; y++) w.set(x, y, z, 0);
      } else if (bank && g > level) MH.paint(w, x, z, bank);
    }
  };
  MH.path = function (w, pts, width, b, edge) {
    const W = w.W, D = w.D;
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      const d = MH.polyDist(x + 0.5, z + 0.5, pts);
      if (d <= width) MH.paint(w, x, z, b);
      else if (edge && d <= width + 1) MH.paint(w, x, z, edge);
    }
  };
  // 풀잎·꽃 같은 작은 장식
  MH.scatter = function (w, count, fn) {
    const W = w.W, D = w.D;
    for (let i = 0; i < count; i++) {
      const x = w.ri(1, W - 2), z = w.ri(1, D - 2), g = MH.g(w, x, z);
      if (g < 0 || w.get(x, g + 1, z) || w.liq[x + W * z] >= 0) continue;
      fn(x, g, z, w.get(x, g, z));
    }
  };

  // ───── 자연물 ─────
  MH.rock = function (w, x, y, z, r, b, moss, dark) {
    const ry = r * w.r(0.55, 0.85);
    w.ellipsoid(x, y, z, r * w.r(0.9, 1.2), ry, r * w.r(0.9, 1.2), b, (dx, dy, dz, d) => d < 0.72 || hash3(x + dx, y + dy, z + dz) > 0.35);
    if (dark) w.ellipsoid(x, y - 1, z, r, ry * 0.5, r, dark, (dx, dy) => dy < 0);
    if (moss) for (let dz = -Math.ceil(r); dz <= Math.ceil(r); dz++) for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
      let yy = y + Math.ceil(ry);
      while (yy > y - 1 && !w.get(x + dx, yy, z + dz)) yy--;
      if (w.get(x + dx, yy, z + dz) === b && hash3(x + dx, yy, z + dz) > 0.35) w.set(x + dx, yy, z + dz, moss);
    }
  };
  // 잎 덩어리: 위는 밝게 아래는 어둡게
  MH.leafBlob = function (w, x, y, z, rx, ry, rz, L) {
    w.ellipsoid(x, y, z, rx, ry, rz, L[1], (dx, dy, dz, d) => {
      const hh = hash3(x + dx, y + dy, z + dz);
      if (d > 0.6 && hh < 0.28) return false;
      const b = dy > ry * 0.35 ? L[0] : dy < -ry * 0.3 ? (L[2] || L[1]) : (hh > 0.85 ? L[0] : L[1]);
      if (L[3] && hh > 0.965) w.set(x + dx, y + dy, z + dz, L[3]);
      else w.set(x + dx, y + dy, z + dz, b);
      return false;
    });
  };
  MH.tree = function (w, x, y, z, o) {
    const k = o.kind || 'oak', h = o.h || 10, bark = o.bark, L = o.leaves || [];
    if (k === 'pine') {
      for (let i = 0; i < h; i++) w.set(x, y + i, z, bark);
      const R = o.r || 4;
      for (let ty = y + 3; ty < y + h; ty += 2) {
        const r = (1 - (ty - y) / (h + 1)) * R + 0.7;
        w.cyl(x, z, ty, ty, r, L[1]);
        w.ring(x, z, ty - 1, r - 0.9, r + 0.4, L[2] || L[1]);
        if (o.snow) w.cyl(x, z, ty + 1, ty + 1, r - 0.8, o.snow);
        else w.cyl(x, z, ty + 1, ty + 1, r - 1.2, L[0]);
      }
      w.set(x, y + h, z, o.snow || L[0]); w.set(x, y + h + 1, z, o.snow || L[0]);
      return y + h + 1;
    }
    if (k === 'palm') {
      const lean = w.r(0, Math.PI * 2), lx = Math.cos(lean), lz = Math.sin(lean);
      let px = x, pz = z;
      for (let i = 0; i < h; i++) { const q = Math.pow(i / h, 2) * 3; px = x + lx * q; pz = z + lz * q; w.set(px, y + i, pz, i % 3 ? bark : (o.barkDk || bark)); }
      const tx = Math.floor(px), ty = y + h, tz = Math.floor(pz);
      w.box(tx, ty - 1, tz, tx, ty, tz, L[1]);
      for (let a = 0; a < 8; a++) {
        const ang = a / 8 * Math.PI * 2 + w.r(0, 0.4);
        for (let s = 1; s <= 6; s++) w.set(tx + Math.round(Math.cos(ang) * s), ty + (s < 3 ? 1 : 2 - Math.floor((s - 2) * 0.9)), tz + Math.round(Math.sin(ang) * s), s > 4 ? (L[2] || L[1]) : L[a % 2]);
      }
      if (o.fruit) { w.set(tx + 1, ty - 1, tz, o.fruit); w.set(tx, ty - 1, tz + 1, o.fruit); }
      return ty + 2;
    }
    // 줄기
    const base = o.trunkR || (k === 'giant' ? 3.2 : 1.1);
    for (let i = 0; i < h; i++) {
      const t = i / h, r = base * (1 - t * 0.45) + (i < 2 ? 0.8 : 0);
      const ox = k === 'dead' || k === 'twisted' ? Math.round(Math.sin(i * 0.35 + x) * 1.2) : 0;
      w.cyl(x + ox, z, y + i, y + i, Math.max(0.5, r), (o.barkDk && hash3(x, y + i, z) > 0.7) ? o.barkDk : bark);
    }
    if (k === 'giant' || base > 1.5) {
      for (let a = 0; a < 6; a++) {
        const ang = a / 6 * Math.PI * 2 + 0.4, l = base + w.r(2, 4);
        w.line(x, y + 3, z, x + Math.cos(ang) * l, y - 1, z + Math.sin(ang) * l, o.barkDk || bark, 1);
      }
    }
    const nB = o.branches || (k === 'giant' ? 6 : k === 'dead' ? 5 : 4);
    const ends = [[x, y + h, z]];
    for (let i = 0; i < nB; i++) {
      const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.85));
      const l = (o.spread || (k === 'giant' ? 9 : 4.5)) * w.r(0.7, 1.1);
      const ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + w.r(2, k === 'dead' ? 5 : 4);
      w.line(x, sy, z, ex, ey, ez, bark, k === 'giant' ? 1.2 : (k === 'dead' ? 0 : 0.6));
      if (k === 'dead' || k === 'twisted') {
        const a2 = a + w.r(-1, 1);
        w.line(ex, ey, ez, ex + Math.cos(a2) * 2.5, ey + w.r(1, 3), ez + Math.sin(a2) * 2.5, bark);
        if (w.chance(0.5)) w.line(ex, ey, ez, ex + Math.cos(a2 + 1.5) * 2, ey - 1, ez + Math.sin(a2 + 1.5) * 2, bark);
      }
      ends.push([Math.round(ex), Math.round(ey), Math.round(ez)]);
    }
    if (k === 'dead' || !L.length) return y + h;
    const R = o.r || (k === 'giant' ? 7 : 3.4);
    ends.forEach(([ex, ey, ez], i) => {
      const r = R * (i === 0 ? 1.1 : w.r(0.75, 0.95));
      MH.leafBlob(w, ex, ey + 1, ez, r, r * 0.72, r, L);
      if (k === 'willow') for (let s = 0; s < 10; s++) {
        const aa = w.r(0, Math.PI * 2), hx = Math.round(ex + Math.cos(aa) * r * 0.9), hz = Math.round(ez + Math.sin(aa) * r * 0.9);
        const l = w.ri(3, 8);
        for (let q = 0; q < l; q++) w.fill(hx, ey - q, hz, q > l - 2 ? (L[2] || L[1]) : L[1]);
      }
    });
    return y + h + R;
  };
  MH.bush = (w, x, y, z, r, L) => MH.leafBlob(w, x, y + Math.floor(r * 0.5), z, r, r * 0.7, r, L);

  // ───── 건축 ─────
  MH.cone = function (w, cx, cz, y, r, b, step, edge) {
    step = step || 0.5;
    let k = 0;
    for (let rr = r; rr > 0.3; rr -= step, k++) {
      w.cyl(cx, cz, y + k, y + k, rr, b);
      if (edge && k === 0) w.ring(cx, cz, y, rr - 1, rr, edge);
    }
    return y + k;
  };
  MH.dome = (w, cx, cy, cz, r, b, band) => {
    w.sphere(cx, cy, cz, r, b, (dx, dy) => dy >= 0);
    if (band) w.ring(cx, cz, cy, r - 1, r + 0.5, band);
    return cy + Math.ceil(r);
  };
  // 사각뿔(첨탑)
  MH.pyramid = function (w, x0, z0, x1, z1, y, b, pitch, edge) {
    pitch = pitch || 2;
    let s = 0;
    while (x0 + s <= x1 - s && z0 + s <= z1 - s) {
      for (let p = 0; p < pitch; p++) w.walls(x0 + s, y + s * pitch + p, z0 + s, x1 - s, y + s * pitch + p, z1 - s, (s === 0 && edge) ? edge : b);
      s++;
    }
    return y + s * pitch;
  };
  // 박공지붕: 처마·용마루·기와 결, 박공벽까지
  MH.roof = function (w, x0, x1, z0, z1, y, o) {
    const p = o.pitch || 1, alongX = o.axis ? o.axis === 'x' : (x1 - x0) >= (z1 - z0);
    const a0 = alongX ? z0 : x0, a1 = alongX ? z1 : x1, l0 = alongX ? x0 : z0, l1 = alongX ? x1 : z1;
    const put = (a, l, yy, b) => alongX ? w.set(l, yy, a, b) : w.set(a, yy, l, b);
    let s = 0;
    while (a0 + s <= a1 - s) {
      for (let q = 0; q < p; q++) for (let l = l0; l <= l1; l++) {
        const b = s === 0 ? (o.eave || o.b) : (a0 + s >= a1 - s - 1 && q === p - 1 ? (o.ridge || o.b) : o.b);
        put(a0 + s, l, y + s * p + q, b);
        put(a1 - s, l, y + s * p + q, b);
      }
      s++;
    }
    const peak = y + s * p;
    if (o.gable) {
      const g0 = alongX ? x0 + 1 : z0 + 1, g1 = alongX ? x1 - 1 : z1 - 1;
      for (const l of [g0, g1]) for (let a = a0 + 1; a <= a1 - 1; a++) {
        const hh = y + Math.min(a - a0, a1 - a) * p - 1;
        for (let yy = y; yy <= hh; yy++) put(a, l, yy, o.gable);
      }
      if (o.gwin) { const mid = Math.floor((a0 + a1) / 2); for (const l of [g0, g1]) { put(mid, l, y + p + 1, o.gwin); if ((a1 - a0) % 2) put(mid + 1, l, y + p + 1, o.gwin); } }
    }
    return peak;
  };
  MH.hipRoof = function (w, x0, x1, z0, z1, y, b, pitch, eave) {
    pitch = pitch || 1;
    let s = 0;
    while (x0 + s <= x1 - s && z0 + s <= z1 - s) {
      for (let q = 0; q < pitch; q++) w.walls(x0 + s, y + s * pitch + q, z0 + s, x1 - s, y + s * pitch + q, z1 - s, s === 0 && eave ? eave : b);
      s++;
    }
    return y + s * pitch;
  };
  // 층·창틀·덧문·문틀·굴뚝이 있는 집
  // o: x,z,sx,sz,floors,fh,y,face,m{found,wall,frame,win,shutter,sill,door,roof,eave,ridge,chimney,flower,lamp},
  //    roof:'gable'|'hip'|'flat', pitch, jetty, studs, lit
  MH.house = function (w, o) {
    const m = o.m, fl = o.floors || 1, fh = o.fh || 5;
    const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1;
    const y = o.y != null ? o.y : MH.maxG(w, x0 - 1, z0 - 1, x1 + 1, z1 + 1) + 1;
    MH.footing(w, x0 - 1, z0 - 1, x1 + 1, z1 + 1, y, m.found);
    w.box(x0 - 1, y, z0 - 1, x1 + 1, y, z1 + 1, m.found);
    const face = o.face || 's';
    let yy = y + 1, ex = 0;
    for (let f = 0; f < fl; f++) {
      if (o.jetty && f > 0) ex = 1;
      const a0 = x0 - ex, a1 = x1 + ex, b0 = z0 - ex, b1 = z1 + ex;
      w.walls(a0, yy, b0, a1, yy + fh - 1, b1, m.wall);
      if (m.frame) {
        for (const [cx, cz] of [[a0, b0], [a1, b0], [a0, b1], [a1, b1]]) w.box(cx, yy, cz, cx, yy + fh - 1, cz, m.frame);
        w.walls(a0, yy + fh - 1, b0, a1, yy + fh - 1, b1, m.frame);
        if (ex) w.walls(a0, yy - 1, b0, a1, yy - 1, b1, m.frame);
        if (o.studs) {
          for (let x = a0 + 3; x < a1 - 1; x += 3) for (const z of [b0, b1]) w.box(x, yy, z, x, yy + fh - 2, z, m.frame);
          for (let z = b0 + 3; z < b1 - 1; z += 3) for (const x of [a0, a1]) w.box(x, yy, z, x, yy + fh - 2, z, m.frame);
        }
      }
      const wh = fh >= 6 ? 3 : 2, wy = yy + (fh >= 6 ? 2 : 1);
      const win = (x, z, nx, nz) => {
        const dz = nz === 0, lx = dz ? 0 : 1, lz = dz ? 1 : 0;
        w.box(x, wy, z, x, wy + wh - 1, z, m.win);
        if (m.frame) w.set(x, wy + wh, z, m.frame);
        if (m.sill) w.set(x + nx, wy - 1, z + nz, m.sill);
        if (m.flower && hash3(x, wy, z) > 0.5) w.set(x + nx, wy, z + nz, m.flower);
        if (m.shutter) for (const s of [-1, 1]) w.box(x + lx * s, wy, z + lz * s, x + lx * s, wy + wh - 1, z + lz * s, m.shutter);
      };
      const gap = o.winGap || 4;
      const doorX = Math.floor((x0 + x1) / 2), doorZ = Math.floor((z0 + z1) / 2);
      for (let x = a0 + 2; x <= a1 - 2; x += gap) {
        const near = f === 0 && Math.abs(x - doorX) < 3;
        if (!(near && face === 'n')) win(x, b0, 0, -1);
        if (!(near && face === 's')) win(x, b1, 0, 1);
      }
      for (let z = b0 + 2; z <= b1 - 2; z += gap) {
        const near = f === 0 && Math.abs(z - doorZ) < 3;
        if (!(near && face === 'w')) win(a0, z, -1, 0);
        if (!(near && face === 'e')) win(a1, z, 1, 0);
      }
      yy += fh;
    }
    // 문
    const dh = Math.min(fh - 1, 4), dx = Math.floor((x0 + x1) / 2), dz = Math.floor((z0 + z1) / 2);
    const door = { s: [dx, z1, 0, 1], n: [dx, z0, 0, -1], e: [x1, dz, 1, 0], w: [x0, dz, -1, 0] }[face];
    const [fx, fz, nx, nz] = door, along = nz !== 0;
    const dw = (along ? o.sx : o.sz) >= 7 ? 1 : 0;
    for (let k = 0; k <= dw; k++) w.box(fx + (along ? k : 0), y + 1, fz + (along ? 0 : k), fx + (along ? k : 0), y + dh, fz + (along ? 0 : k), m.door);
    if (m.frame) {
      w.box(fx - (along ? 1 : 0), y + 1, fz - (along ? 0 : 1), fx - (along ? 1 : 0), y + dh, fz - (along ? 0 : 1), m.frame);
      w.box(fx + (along ? dw + 1 : 0), y + 1, fz + (along ? 0 : dw + 1), fx + (along ? dw + 1 : 0), y + dh, fz + (along ? 0 : dw + 1), m.frame);
      w.box(fx - (along ? 1 : 0), y + dh + 1, fz - (along ? 0 : 1), fx + (along ? dw + 1 : 0), y + dh + 1, fz + (along ? 0 : dw + 1), m.frame);
    }
    w.box(fx + nx, y, fz + nz, fx + nx + (along ? dw : 0), y, fz + nz + (along ? 0 : dw), m.found);
    if (m.lamp) w.set(fx + nx - (along ? 1 : 0) * 1, y + dh, fz + nz - (along ? 0 : 1), m.lamp);
    // 지붕
    const e = ex + 1, top = yy;
    let peak = top;
    if (o.roof === 'flat') {
      w.box(x0 - ex, top, z0 - ex, x1 + ex, top, z1 + ex, m.eave || m.roof);
      w.walls(x0 - ex, top + 1, z0 - ex, x1 + ex, top + 1, z1 + ex, m.found);
      peak = top + 1;
    } else if (o.roof === 'hip') peak = MH.hipRoof(w, x0 - e, x1 + e, z0 - e, z1 + e, top, m.roof, o.pitch || 1, m.eave);
    else peak = MH.roof(w, x0 - e, x1 + e, z0 - e, z1 + e, top, { b: m.roof, eave: m.eave, ridge: m.ridge, pitch: o.pitch || 1, gable: m.gable || m.wall, gwin: m.win, axis: o.axis });
    let chimney = null;
    if (m.chimney) {
      const cx = x0 + 1, cz = z0 + 1;
      w.box(cx, top - 1, cz, cx + 1, peak + 2, cz + 1, m.chimney);
      w.box(cx - 0, peak + 3, cz - 0, cx + 1, peak + 3, cz + 1, m.found);
      w.set(cx, peak + 3, cz, 0);
      chimney = [cx + 0.5, peak + 4, cz + 0.5];
    }
    return { y, top, peak, chimney, x0, x1, z0, z1, door: [fx, y + 1, fz] };
  };

  // 둥근/사각 탑: 받침, 띠돌림, 창, 내민 총안, 원뿔 지붕, 꼭대기 장식과 깃발
  // o: cx,cz,y0,h,r,square,m{wall,band,win,cren,roof,eave,finial,flag},roof:'cone'|'flat'|'dome'|'spire', pitch
  MH.tower = function (w, o) {
    const { cx, cz, y0, h, r } = o, m = o.m;
    const inside = (dx, dz, rr) => o.square ? Math.max(Math.abs(dx), Math.abs(dz)) <= rr : dx * dx + dz * dz <= rr * rr;
    const layer = (y, rr, b, hollow) => {
      const R = Math.ceil(rr);
      for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++)
        if (inside(dx, dz, rr) && (!hollow || !inside(dx, dz, rr - 1))) w.set(cx + dx, y, cz + dz, b);
    };
    MH.footing(w, cx - Math.ceil(r) - 1, cz - Math.ceil(r) - 1, cx + Math.ceil(r) + 1, cz + Math.ceil(r) + 1, y0, m.band || m.wall);
    layer(y0, r + 1, m.band || m.wall); layer(y0 + 1, r + 0.6, m.band || m.wall);
    for (let y = y0; y < y0 + h; y++) layer(y, r, m.wall);
    for (let y = y0 + 8; y < y0 + h - 3; y += 8) layer(y, r + 0.6, m.band || m.wall, true);
    const R = Math.floor(r);
    if (m.win) for (let y = y0 + 4; y < y0 + h - 4; y += 6) {
      const rot = (y / 6) % 2 ? 1 : 0;
      for (const [dx, dz] of rot ? [[R, 0], [-R, 0], [0, R], [0, -R]] : [[R, 0], [-R, 0], [0, R], [0, -R]]) w.box(cx + dx, y, cz + dz, cx + dx, y + 2, cz + dz, m.win);
    }
    let top = y0 + h;
    if (m.cren) {
      layer(top - 1, r + 1.2, m.band || m.wall, true);
      layer(top, r + 1.2, m.cren, true);
      const RR = Math.ceil(r + 1.2);
      for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++)
        if (inside(dx, dz, r + 1.2) && !inside(dx, dz, r + 0.2) && ((dx + dz) & 1) === 0) w.set(cx + dx, top + 1, cz + dz, m.cren);
      top += 1;
    }
    const kind = o.roof || 'cone';
    if (kind === 'cone' && m.roof) {
      if (o.square) top = MH.pyramid(w, cx - R - 1, cz - R - 1, cx + R + 1, cz + R + 1, top + 1, m.roof, o.pitch || 3, m.eave);
      else top = MH.cone(w, cx, cz, top + 1, r + 1.6, m.roof, o.step || 0.34, m.eave);
    } else if (kind === 'dome' && m.roof) top = MH.dome(w, cx, top + 1, cz, r + 0.6, m.roof, m.band);
    else if (kind === 'spire' && m.roof) { layer(top + 1, r - 0.5, m.wall); top = MH.cone(w, cx, cz, top + 2, r, m.roof, o.step || 0.2); }
    if (m.finial) { w.box(cx, top, cz, cx, top + 2, cz, m.finial); top += 3; }
    if (m.flag) { w.box(cx, top, cz, cx, top + 2, cz, m.finial || m.wall); w.box(cx + 1, top + 1, cz, cx + 3, top + 2, cz, m.flag); top += 3; }
    return top;
  };

  // 성벽: 폴리라인 위로 두께·높이·총안·버팀벽
  MH.wall = function (w, pts, o) {
    const m = o.m, t = o.t || 2, h = o.h || 10;
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
      const n = Math.ceil(Math.hypot(bx - ax, bz - az));
      const nx = -(bz - az) / (n || 1), nz = (bx - ax) / (n || 1);
      for (let s = 0; s <= n; s++) {
        const cx = ax + (bx - ax) * s / n, cz = az + (bz - az) * s / n;
        for (let k = -t; k <= t; k++) {
          const x = Math.round(cx + nx * k * 0.5), z = Math.round(cz + nz * k * 0.5);
          const g = Math.max(0, MH.g(w, x, z));
          const yb = o.y != null ? Math.min(o.y, g) : g;
          const topY = (o.y != null ? o.y : g) + h;
          for (let y = yb; y <= topY; y++) w.set(x, y, z, y === topY - 3 ? (m.band || m.wall) : m.wall);
          if (Math.abs(k) >= t - 0) { if ((s & 1) === 0) { w.set(x, topY + 1, z, m.cren || m.wall); w.set(x, topY + 2, z, m.cren || m.wall); } else w.set(x, topY + 1, z, m.cren || m.wall); }
          else w.set(x, topY, z, m.walk || m.wall);
        }
        if (o.buttress && s % 7 === 3) {
          for (let k = t; k <= t + 2; k++) {
            const x = Math.round(cx + nx * k * 0.5 * (o.side || 1)), z = Math.round(cz + nz * k * 0.5 * (o.side || 1));
            const g = Math.max(0, MH.g(w, x, z));
            for (let y = g; y <= g + h - 4 - (k - t) * 2; y++) w.set(x, y, z, m.band || m.wall);
          }
        }
      }
    }
  };

  // 돌 아치 다리
  MH.bridge = function (w, a, b, y, o) {
    const m = o.m, dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz);
    const px = -dz / len, pz = dx / len, half = Math.floor((o.width || 3) / 2), rise = o.rise || 2;
    const n = Math.ceil(len * 2);
    for (let i = 0; i <= n; i++) {
      const t = i / n, cx = a[0] + dx * t, cz = a[1] + dz * t;
      const yy = y + Math.round(Math.sin(t * Math.PI) * rise);
      for (let k = -half - 1; k <= half + 1; k++) {
        const x = Math.round(cx + px * k), z = Math.round(cz + pz * k);
        const edge = Math.abs(k) === half + 1;
        w.set(x, yy, z, edge ? (m.parapet || m.deck) : m.deck);
        if (o.arch) {
          const under = Math.round(Math.sin(t * Math.PI) * (o.archH || 4));
          for (let q = 1; q <= 1 + (edge ? 1 : 0) + Math.max(0, (o.archH || 4) - under); q++) w.set(x, yy - q, z, q === 1 ? m.deck : (m.arch || m.deck));
        }
        if (edge && m.parapet) { w.set(x, yy + 1, z, m.parapet); if (i % 4 === 0) w.set(x, yy + 2, z, m.cap || m.parapet); }
      }
    }
    return [a[0] + dx / 2, y + rise, a[1] + dz / 2];
  };

  // 가로등: 받침·기둥·팔·매단 등불
  MH.lamp = function (w, x, z, o) {
    const m = o.m, y = MH.g(w, x, z) + 1, h = o.h || 5;
    w.set(x, y, z, m.found || m.post);
    w.box(x, y + 1, z, x, y + h, z, m.post);
    const ax = o.dir === 'x' ? 1 : 0, az = o.dir === 'x' ? 0 : 1;
    w.set(x + ax, y + h, z + az, m.post);
    w.set(x + ax, y + h - 1, z + az, m.glow);
    w.set(x, y + h + 1, z, m.post);
    return [x + ax + 0.5, y + h - 1, z + az + 0.5];
  };

  // 노점: 기둥·진열대·물건·줄무늬 차양과 물결 테두리
  MH.stall = function (w, x, z, o) {
    const m = o.m, sx = o.sx || 5, sz = o.sz || 4;
    const y = MH.maxG(w, x, z, x + sx - 1, z + sz - 1) + 1;
    MH.footing(w, x, z, x + sx - 1, z + sz - 1, y, m.post);
    for (const [px, pz] of [[x, z], [x + sx - 1, z], [x, z + sz - 1], [x + sx - 1, z + sz - 1]]) w.box(px, y, pz, px, y + 4, pz, m.post);
    w.box(x, y, z + sz - 1, x + sx - 1, y + 1, z + sz - 1, m.counter || m.post);
    if (m.goods) for (let dx = 1; dx < sx - 1; dx++) { w.set(x + dx, y + 2, z + sz - 1, m.goods[dx % m.goods.length]); if (dx % 2) w.set(x + dx, y + 2, z + sz - 2, m.goods[(dx + 1) % m.goods.length]); }
    if (m.crate) { w.box(x + 1, y, z + 1, x + 2, y + 1, z + 1, m.crate); }
    for (let dz = -1; dz <= sz; dz++) for (let dx = -1; dx <= sx; dx++) {
      const yy = y + 5 + (dz < 1 ? 1 : 0) - (dz >= sz ? 1 : 0);
      w.set(x + dx, yy, z + dz, (dx & 1) ? m.a1 : m.a2);
      if (dz === sz && (dx & 1)) w.set(x + dx, yy - 1, z + dz, m.a1);
    }
    return y + 6;
  };

  MH.fence = function (w, pts, post, rail) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1], n = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
      for (let s = 0; s <= n; s++) {
        const x = Math.round(ax + (bx - ax) * s / n), z = Math.round(az + (bz - az) * s / n), g = MH.g(w, x, z);
        if (g < 0) continue;
        if (s % 3 === 0) w.box(x, g + 1, z, x, g + 3, z, post);
        else { w.set(x, g + 2, z, rail || post); w.set(x, g + 3, z, rail || post); }
      }
    }
  };
  MH.garland = function (w, a, b, rope, beads, sag) {
    const n = Math.ceil(Math.hypot(b[0] - a[0], b[2] - a[2])) * 2;
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = a[0] + (b[0] - a[0]) * t, z = a[2] + (b[2] - a[2]) * t;
      const y = a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * (sag || 2);
      w.set(Math.round(x), Math.round(y), Math.round(z), (i % 4 === 2) ? beads[(i >> 2) % beads.length] : rope);
      if (i % 4 === 2 && beads.length > 1) w.set(Math.round(x), Math.round(y) - 1, Math.round(z), beads[((i >> 2) + 1) % beads.length]);
    }
  };
  MH.stairs = function (w, x, z, dx, dz, n, y, b, width) {
    for (let s = 0; s < n; s++) for (let k = 0; k < (width || 3); k++) {
      const px = x + dx * s + (dz ? k : 0), pz = z + dz * s + (dx ? k : 0);
      MH.footing(w, px, pz, px, pz, y - s, b);
      w.set(px, y - s, pz, b);
    }
  };
  // 두 칸 크기 룬/별 무늬 원
  MH.circle = function (w, cx, cz, r, b, thick) {
    for (let a = 0; a < Math.PI * 2; a += 0.5 / r) for (let k = 0; k < (thick || 1); k++) MH.paint(w, Math.round(cx + Math.cos(a) * (r - k)), Math.round(cz + Math.sin(a) * (r - k)), b);
  };
  // 부품 링(혼천의·궤도석)
  MH.ringProp = function (p, cx, cy, cz, r, plane, b, mark, marks) {
    const n = Math.ceil(r * 8);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, u = Math.round(Math.cos(a) * r), v = Math.round(Math.sin(a) * r);
      const blk = mark && i % Math.ceil(n / (marks || 6)) === 0 ? mark : b;
      if (plane === 'xz') p.set(cx + u, cy, cz + v, blk);
      else if (plane === 'xy') p.set(cx + u, cy + v, cz, blk);
      else p.set(cx, cy + u, cz + v, blk);
    }
  };
})();
