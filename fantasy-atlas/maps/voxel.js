// voxel.js — 복셀 월드, 메셔(AO·재질 무늬), 액체·발광·입자 셰이더, 픽셀 후처리(외곽선·안개·빛 번짐·디더)
(function () {
  'use strict';
  const W = 128, D = 128, H = 112;

  // ───── 난수 · 노이즈 ─────
  function mulberry(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hash3(x, y, z) {
    let h = (x * 374761393 + y * 668265263 + z * 1274126177) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967295;
  }
  function makeNoise(seed) {
    const sm = t => t * t * (3 - 2 * t);
    const h = (a, b) => hash3(a + seed * 131, b - seed * 71, seed * 7);
    function vn(x, y) {
      const xi = Math.floor(x), yi = Math.floor(y);
      const u = sm(x - xi), v = sm(y - yi);
      const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }
    function fbm(x, y, oct) {
      oct = oct || 4;
      let s = 0, a = 0.5, f = 1, n = 0;
      for (let i = 0; i < oct; i++) { s += a * vn(x * f, y * f); n += a; a *= 0.5; f *= 2; }
      return s / n;
    }
    function ridge(x, y, oct) {
      oct = oct || 4;
      let s = 0, a = 0.5, f = 1, n = 0;
      for (let i = 0; i < oct; i++) { const v = 1 - Math.abs(vn(x * f, y * f) * 2 - 1); s += a * v * v; n += a; a *= 0.5; f *= 2; }
      return s / n;
    }
    return { vn, fbm, ridge };
  }
  function hexRGB(hex) { const c = new THREE.Color(hex); return [c.r, c.g, c.b]; }

  // ───── 복셀 월드 (부품은 희소 저장) ─────
  class World {
    // size = [W, D, H] (기본 128·128·112). 부품은 부모 크기를 따른다
    constructor(defs, seed, parent, size) {
      const sz = parent ? [parent.W, parent.D, parent.H] : (size || [W, D, H]);
      this.W = sz[0]; this.D = sz[1]; this.H = sz[2];
      this.rand = mulberry(seed || 1);
      this.noise = makeNoise(seed || 1);
      if (parent) {
        this.blocks = parent.blocks; this.id = parent.id; this.base = parent.base; this.hm = parent.hm;
        this.sparse = true; this.data = new Map(); this.liq = null;
        return;
      }
      this.sparse = false;
      this.data = new Uint8Array(this.W * this.D * this.H);
      this.liq = new Int16Array(this.W * this.D).fill(-1);
      this.blocks = [null]; this.id = {};
      for (const k in defs) {
        const b = Object.assign({ v: 0.06 }, defs[k]);
        b._c = hexRGB(b.c);
        b._t = b.top ? hexRGB(b.top) : b._c;
        b._b = b.bot ? hexRGB(b.bot) : b._c;
        b._a = b.alt ? hexRGB(b.alt) : null;
        b._d = b.day ? hexRGB(b.day) : [0.22, 0.27, 0.34];
        this.id[k] = this.blocks.length;
        this.blocks.push(b);
      }
      this.base = 24;
    }
    i(x, y, z) { return x + this.W * (z + this.D * y); }
    ok(x, y, z) { return x >= 0 && y >= 0 && z >= 0 && x < this.W && y < this.H && z < this.D; }
    get(x, y, z) {
      if (!this.ok(x, y, z)) return 0;
      const i = x + this.W * (z + this.D * y);
      return this.sparse ? (this.data.get(i) || 0) : this.data[i];
    }
    set(x, y, z, b) {
      // Math.floor와 같은 결과(음수는 어차피 범위 밖)를 더 싸게
      x = x >= 0 ? x | 0 : -1; y = y >= 0 ? y | 0 : -1; z = z >= 0 ? z | 0 : -1;
      if (!this.ok(x, y, z)) { if (y >= this.H && b) this.over = (this.over || 0) + 1; return; }
      const i = x + this.W * (z + this.D * y);
      if (this.sparse) { if (b) this.data.set(i, b); else this.data.delete(i); }
      else this.data[i] = b;
    }
    fill(x, y, z, b) { if (!this.get(Math.floor(x), Math.floor(y), Math.floor(z))) this.set(x, y, z, b); }
    box(x0, y0, z0, x1, y1, z1, b) {
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++)
        for (let z = Math.min(z0, z1); z <= Math.max(z0, z1); z++)
          for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) this.set(x, y, z, b);
    }
    walls(x0, y0, z0, x1, y1, z1, b) {
      for (let y = y0; y <= y1; y++)
        for (let z = z0; z <= z1; z++)
          for (let x = x0; x <= x1; x++)
            if (x === x0 || x === x1 || z === z0 || z === z1) this.set(x, y, z, b);
    }
    sphere(cx, cy, cz, r, b, keep) {
      const R = Math.ceil(r);
      for (let y = -R; y <= R; y++) for (let z = -R; z <= R; z++) for (let x = -R; x <= R; x++) {
        if (x * x + y * y + z * z > r * r) continue;
        if (keep && !keep(x, y, z)) continue;
        this.set(cx + x, cy + y, cz + z, b);
      }
    }
    ellipsoid(cx, cy, cz, rx, ry, rz, b, keep) {
      const X = Math.ceil(rx), Y = Math.ceil(ry), Z = Math.ceil(rz);
      for (let y = -Y; y <= Y; y++) for (let z = -Z; z <= Z; z++) for (let x = -X; x <= X; x++) {
        const d = (x * x) / (rx * rx) + (y * y) / (ry * ry) + (z * z) / (rz * rz);
        if (d > 1) continue;
        if (keep && !keep(x, y, z, d)) continue;
        this.set(cx + x, cy + y, cz + z, b);
      }
    }
    cyl(cx, cz, y0, y1, r, b) {
      const R = Math.ceil(r);
      for (let y = y0; y <= y1; y++) for (let z = -R; z <= R; z++) for (let x = -R; x <= R; x++)
        if (x * x + z * z <= r * r) this.set(cx + x, y, cz + z, b);
    }
    ring(cx, cz, y, r0, r1, b) {
      const R = Math.ceil(r1);
      for (let z = -R; z <= R; z++) for (let x = -R; x <= R; x++) {
        const d = x * x + z * z;
        if (d <= r1 * r1 && d > r0 * r0) this.set(cx + x, y, cz + z, b);
      }
    }
    line(x0, y0, z0, x1, y1, z1, b, th) {
      const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)) * 1.5) + 1;
      for (let i = 0; i <= n; i++) {
        const t = i / n, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t, z = z0 + (z1 - z0) * t;
        if (th) this.sphere(Math.round(x), Math.round(y), Math.round(z), typeof th === 'function' ? th(t) : th, b);
        else this.set(Math.round(x), Math.round(y), Math.round(z), b);
      }
    }
    top(x, z) {
      for (let y = this.H - 1; y >= 0; y--) if (this.get(x, y, z)) return y;
      return -1;
    }
    liquid(x, z, y) { if (this.liq && x >= 0 && z >= 0 && x < this.W && z < this.D) this.liq[x + this.W * z] = y; }
    r(a, b) { return a + this.rand() * (b - a); }
    ri(a, b) { return Math.floor(a + this.rand() * (b - a + 1)); }
    pick(arr) { return arr[Math.floor(this.rand() * arr.length)]; }
    chance(p) { return this.rand() < p; }
    // 따로 움직이는 부품. o = { name, pivot:[x,y,z], axis, speed, bob, bobSpeed, rock, rockSpeed, phase }
    prop(o) {
      const p = new World(null, 7 + (this.props ? this.props.length : 0), this);
      (this.props = this.props || []).push({ w: p, o });
      return p;
    }
  }

  // ───── 재질 무늬: 복셀 단위로 벽돌·널빤지·기와 결을 만든다 ─────
  function patMul(bl, x, y, z, d) {
    const u = d === 0 ? z : x;
    switch (bl.pat) {
      case 'brick': return d === 1 ? 1 : (((u + (y & 1) * 2) & 3) === 0 ? 0.8 : 1);
      case 'plank': return ((d === 1 ? x + z * 0 : u) % 3 === 0) ? 0.84 : 1;
      case 'floor': return (x % 4 === 0 || z % 4 === 0) ? 0.86 : 1;
      case 'tile': return (y % 2 === 0 ? 0.84 : 1) * (((x + z) & 1) ? 1.03 : 0.97);
      case 'stone': return 0.88 + hash3(x >> 1, y >> 1, z >> 1) * 0.22;
      case 'big': return 0.9 + hash3(x >> 2, y >> 1, z >> 2) * 0.18;
      case 'log': return (y % 4 === 0) ? 0.82 : 1;
      default: return 1;
    }
  }

  // ───── 메셔: 보이는 면만 만들고 꼭짓점 AO를 굽는다 ─────
  const AO = [0.5, 0.68, 0.85, 1.0];
  // 자라는 형식 배열: push로 쌓고 view()로 잘라 쓴다
  class Grow {
    constructor(T, n) { this.T = T; this.a = new T(n || 4096); this.length = 0; }
    grow(n) { if (this.length + n > this.a.length) { const b = new this.T(Math.max(this.a.length * 2, this.length + n)); b.set(this.a); this.a = b; } }
    push3(p, q, r) { this.grow(3); const a = this.a, n = this.length; a[n] = p; a[n + 1] = q; a[n + 2] = r; this.length = n + 3; }
    push6(p, q, r, s, t, u) { this.grow(6); const a = this.a, n = this.length; a[n] = p; a[n + 1] = q; a[n + 2] = r; a[n + 3] = s; a[n + 4] = t; a[n + 5] = u; this.length = n + 6; }
    view() { return this.a.subarray(0, this.length); }
  }
  function newBuf() { return { pos: new Grow(Float32Array), nor: new Grow(Float32Array), col: new Grow(Float32Array), col2: new Grow(Float32Array), jit: new Grow(Float32Array), idx: new Grow(Uint32Array) }; }
  function toGeometry(buf) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(buf.pos.view(), 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(buf.nor.view(), 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(buf.col.view(), 3));
    if (buf.col2.length) g.setAttribute('color2', new THREE.Float32BufferAttribute(buf.col2.view(), 3));
    if (buf.jit.length) g.setAttribute('jit', new THREE.Float32BufferAttribute(buf.jit.view(), 2));
    g.setIndex(new THREE.BufferAttribute(buf.idx.view(), 1));
    if (buf.pos.length) g.computeBoundingSphere();
    return g;
  }
  const CS_POS = [[0, 0], [1, 0], [1, 1], [0, 1]], CS_NEG = [[0, 0], [0, 1], [1, 1], [1, 0]];
  // ───── 큰 지도용 면 합치기(그리디 메싱) ─────
  // 밝은(lit) 면 중 네 꼭짓점 색이 같은 면은 같은 색 이웃과 직사각형으로 합친다.
  // 복셀마다의 밝기 흔들림과 돌 무늬는 꼭짓점 색 대신 셰이더(VX.litMaterial)가 칸 좌표로 계산한다 → 합쳐도 결이 그대로 보인다.
  // 1) 한 번 훑어 보이는 면만 방향별로 모으고 2) 면(슬라이스)별로 나눠 3) 같은 키끼리 직사각형으로 묶는다.
  function greedy(w, lit, glow, nite, emit, solid) {
    const W = w.W, D = w.D, H = w.H, dat = w.data, blocks = w.blocks, WD = W * D;
    const SZ = [W, H, D], ST = [1, WD, W];
    const flatJ = new Float32Array(blocks.length), patC = new Uint8Array(blocks.length), special = new Uint8Array(blocks.length);
    for (let k = 1; k < blocks.length; k++) {
      const b = blocks[k];
      flatJ[k] = b.v || 0;
      patC[k] = b.pat === 'stone' ? 1 : b.pat === 'big' ? 2 : 0;   // 1=stone, 2=big (셰이더가 계산)
      special[k] = b.glow || b.night ? 1 : 0;                      // 발광·밤 블록은 예전 방식(면마다)
    }
    // 1) 보이는 면 모으기: 방향 k = d*2 + (s<0)
    const lists = [0, 1, 2, 3, 4, 5].map(() => new Grow(Int32Array, 1 << 16));
    for (let y = 0; y < H; y++) for (let z = 0; z < D; z++) {
      const row = W * (z + D * y);
      for (let x = 0; x < W; x++) {
        const i = row + x, id = dat[i];
        if (!id) continue;
        if (special[id]) { emit(x, y, z, id); continue; }
        if (x === W - 1 || !dat[i + 1]) { const L = lists[0]; L.grow(1); L.a[L.length++] = i; }
        if (x === 0 || !dat[i - 1]) { const L = lists[1]; L.grow(1); L.a[L.length++] = i; }
        if (y === H - 1 || !dat[i + WD]) { const L = lists[2]; L.grow(1); L.a[L.length++] = i; }
        if (y === 0 || !dat[i - WD]) { const L = lists[3]; L.grow(1); L.a[L.length++] = i; }
        if (z === D - 1 || !dat[i + W]) { const L = lists[4]; L.grow(1); L.a[L.length++] = i; }
        if (z === 0 || !dat[i - W]) { const L = lists[5]; L.grow(1); L.a[L.length++] = i; }
      }
    }
    const t = [0, 0, 0], vtx = [0, 0, 0], ao = [3, 3, 3, 3], c3 = [0, 0, 0];
    let mask = new Int32Array(0), mj = new Float32Array(0), sorted = new Int32Array(0);
    for (let k6 = 0; k6 < 6; k6++) {
      const d = k6 >> 1, s = (k6 & 1) ? -1 : 1, u = (d + 1) % 3, v = (d + 2) % 3;
      const cs = s > 0 ? CS_POS : CS_NEG, nx = d === 0 ? s : 0, ny = d === 1 ? s : 0, nz = d === 2 ? s : 0;
      const Sd = SZ[d];
      // 마스크는 메모리 순서(보폭 큰 축 = 바깥) → 모은 순서가 곧 래스터 순서
      const innerU = ST[u] < ST[v], In = innerU ? u : v, Ou = innerU ? v : u, Sn = SZ[In], So = SZ[Ou];
      if (mask.length < Sn * So) { mask = new Int32Array(Sn * So); mj = new Float32Array(Sn * So); }
      // 2) 슬라이스별로 안정 정렬(계수 정렬)
      const L = lists[k6], n = L.length, A = L.a;
      if (!n) continue;
      if (sorted.length < n) sorted = new Int32Array(n);
      const cnt = new Int32Array(Sd + 1);
      const coord = d === 0 ? (i => i % W) : d === 1 ? (i => (i / WD) | 0) : (i => ((i / W) | 0) % D);
      for (let j = 0; j < n; j++) cnt[coord(A[j]) + 1]++;
      for (let c = 0; c < Sd; c++) cnt[c + 1] += cnt[c];
      const startAt = cnt.slice();
      for (let j = 0; j < n; j++) sorted[startAt[coord(A[j])]++] = A[j];
      for (let c = 0; c < Sd; c++) {
        const j0 = cnt[c], j1 = cnt[c + 1];
        if (j0 === j1) continue;
        // 키 채우기(그늘진 면은 바로 한 칸짜리로)
        for (let j = j0; j < j1; j++) {
          const i = sorted[j], id = dat[i], bl = blocks[id];
          const x = i % W, y = (i / WD) | 0, z = ((i / W) | 0) % D;
          c3[0] = x; c3[1] = y; c3[2] = z;
          const m = c3[In] + c3[Ou] * Sn;
          const under = y < w.base - 2 ? 0.5 + 0.5 * Math.max(0, y) / w.base : 1;
          let rgb = d === 1 ? (s > 0 ? bl._t : bl._b) : bl._c;
          if (bl._a && bl.pat === 'check' && ((x + z + (d === 1 ? 0 : y)) & 1)) rgb = bl._a;
          const pc = patC[id], bright = under * (pc ? 1 : patMul(bl, x, y, z, d));
          let flat = true;
          for (let k = 0; k < 4; k++) {
            const cu = cs[k][0], cv = cs[k][1];
            t[0] = x; t[1] = y; t[2] = z; t[d] += s; t[u] += cu ? 1 : -1;
            const s1 = solid(t[0], t[1], t[2]);
            t[0] = x; t[1] = y; t[2] = z; t[d] += s; t[v] += cv ? 1 : -1;
            const s2 = solid(t[0], t[1], t[2]);
            t[u] += cu ? 1 : -1;
            const s3 = solid(t[0], t[1], t[2]);
            ao[k] = (s1 && s2) ? 0 : 3 - (s1 + s2 + s3);
            if (ao[k] !== ao[0]) flat = false;
          }
          const jt = flatJ[id];
          if (flat) {
            const f = bright * AO[ao[0]];
            const r = Math.min(255, Math.round(rgb[0] * f * 255)), g = Math.min(255, Math.round(rgb[1] * f * 255)), b = Math.min(255, Math.round(rgb[2] * f * 255));
            // 키 = 색(24비트) + 흔들림 세기(5비트) + 돌 무늬(2비트): 모두 같아야 합친다
            mask[m] = (((r << 16) | (g << 8) | b) | ((Math.round(jt * 255) & 31) << 24) | (pc << 29)) + 1;
            mj[m] = jt;
            continue;
          }
          mask[m] = 0;
          const base0 = lit.pos.length / 3;
          for (let k = 0; k < 4; k++) {
            const cu = cs[k][0], cv = cs[k][1];
            vtx[d] = c + (s > 0 ? 1 : 0); vtx[u] = c3[u] + cu; vtx[v] = c3[v] + cv;
            lit.pos.push3(vtx[0], vtx[1], vtx[2]); lit.nor.push3(nx, ny, nz);
            const f = bright * AO[ao[k]];
            lit.col.push3(rgb[0] * f, rgb[1] * f, rgb[2] * f);
            lit.jit.grow(2); lit.jit.a[lit.jit.length++] = jt; lit.jit.a[lit.jit.length++] = pc;
          }
          if (ao[0] + ao[2] >= ao[1] + ao[3]) lit.idx.push6(base0, base0 + 1, base0 + 2, base0, base0 + 2, base0 + 3);
          else lit.idx.push6(base0 + 1, base0 + 2, base0 + 3, base0 + 1, base0 + 3, base0);
        }
        // 3) 래스터 순서로 직사각형 묶기(쓴 칸은 모두 다시 0이 된다)
        for (let j = j0; j < j1; j++) {
          const i = sorted[j];
          c3[0] = i % W; c3[1] = (i / WD) | 0; c3[2] = ((i / W) | 0) % D;
          const a0 = c3[In], o0 = c3[Ou], m = a0 + o0 * Sn, key = mask[m];
          if (!key) continue;
          let wn = 1;
          while (a0 + wn < Sn && mask[m + wn] === key) wn++;
          let ho = 1;
          grow: while (o0 + ho < So) {
            const r0 = m + ho * Sn;
            for (let k = 0; k < wn; k++) if (mask[r0 + k] !== key) break grow;
            ho++;
          }
          for (let h2 = 0; h2 < ho; h2++) mask.fill(0, m + h2 * Sn, m + h2 * Sn + wn);
          const kc = (key - 1) & 0xffffff, pc = ((key - 1) >>> 29) & 3, jt = mj[m];
          const r = ((kc >> 16) & 255) / 255, g = ((kc >> 8) & 255) / 255, b = (kc & 255) / 255;
          const wu = innerU ? wn : ho, hv = innerU ? ho : wn;
          const base0 = lit.pos.length / 3;
          for (let k = 0; k < 4; k++) {
            const cu = cs[k][0], cv = cs[k][1];
            vtx[d] = c + (s > 0 ? 1 : 0); vtx[u] = c3[u] + cu * wu; vtx[v] = c3[v] + cv * hv;
            lit.pos.push3(vtx[0], vtx[1], vtx[2]); lit.nor.push3(nx, ny, nz);
            lit.col.push3(r, g, b);
            lit.jit.grow(2); lit.jit.a[lit.jit.length++] = jt; lit.jit.a[lit.jit.length++] = pc;
          }
          lit.idx.push6(base0, base0 + 1, base0 + 2, base0, base0 + 2, base0 + 3);
        }
      }
    }
  }

  function buildGeometry(w) {
    const W = w.W, D = w.D, H = w.H;
    const lit = newBuf(), glow = newBuf(), nite = newBuf();
    const dat = w.data;
    const solid = w.sparse ? (x, y, z) => w.get(x, y, z) !== 0 : (x, y, z) => x >= 0 && y >= 0 && z >= 0 && x < W && y < H && z < D && dat[x + W * (z + D * y)] !== 0;
    const p = [0, 0, 0], q = [0, 0, 0], t = [0, 0, 0], vtx = [0, 0, 0];
    const emit = (x, y, z, id) => {
      const bl = w.blocks[id];
      let jitter = -1, under = 1;                     // 보이는 면이 처음 나올 때 계산한다
      const buf = bl.night ? nite : bl.glow ? glow : lit;
      p[0] = x; p[1] = y; p[2] = z;
      for (let d = 0; d < 3; d++) for (let si = 0; si < 2; si++) {
        const s = si === 0 ? 1 : -1;
        q[0] = x; q[1] = y; q[2] = z; q[d] += s;
        if (solid(q[0], q[1], q[2])) continue;
        if (jitter < 0) { jitter = 1 + (hash3(x, y, z) * 2 - 1) * bl.v; under = (!bl.glow && y < w.base - 2) ? 0.5 + 0.5 * Math.max(0, y) / w.base : 1; }
        const u = (d + 1) % 3, v = (d + 2) % 3;
        let rgb = d === 1 ? (s > 0 ? bl._t : bl._b) : bl._c;
        if (bl._a && bl.pat === 'check' && ((x + z + (d === 1 ? 0 : y)) & 1)) rgb = bl._a;
        const bright = jitter * under * patMul(bl, x, y, z, d);
        const cs = s > 0 ? CS_POS : CS_NEG;
        const base = buf.pos.length / 3;
        const ao = [3, 3, 3, 3];
        for (let k = 0; k < 4; k++) {
          const cu = cs[k][0], cv = cs[k][1];
          vtx[d] = p[d] + (s > 0 ? 1 : 0); vtx[u] = p[u] + cu; vtx[v] = p[v] + cv;
          buf.pos.push3(vtx[0], vtx[1], vtx[2]);
          buf.nor.push3(d === 0 ? s : 0, d === 1 ? s : 0, d === 2 ? s : 0);
          if (!bl.glow && !bl.night) {
            t[0] = q[0]; t[1] = q[1]; t[2] = q[2]; t[u] += cu ? 1 : -1;
            const s1 = solid(t[0], t[1], t[2]);
            t[0] = q[0]; t[1] = q[1]; t[2] = q[2]; t[v] += cv ? 1 : -1;
            const s2 = solid(t[0], t[1], t[2]);
            t[u] += cu ? 1 : -1;
            const s3 = solid(t[0], t[1], t[2]);
            ao[k] = (s1 && s2) ? 0 : 3 - (s1 + s2 + s3);
          }
          const f = bright * AO[ao[k]];
          buf.col.push3(rgb[0] * f, rgb[1] * f, rgb[2] * f);
          if (bl.night) { const sh = f * (d === 1 ? 1 : 0.8); buf.col2.push3(bl._d[0] * sh, bl._d[1] * sh, bl._d[2] * sh); }
        }
        if (ao[0] + ao[2] >= ao[1] + ao[3]) buf.idx.push6(base, base + 1, base + 2, base, base + 2, base + 3);
        else buf.idx.push6(base + 1, base + 2, base + 3, base + 1, base + 3, base);
      }
    };
    if (w.sparse) {
      for (const [i, id] of w.data) emit(i % W, Math.floor(i / (W * D)), Math.floor(i / W) % D, id);
    } else greedy(w, lit, glow, nite, emit, solid);
    return { lit: toGeometry(lit), glow: glow.pos.length ? toGeometry(glow) : null, nite: nite.pos.length ? toGeometry(nite) : null };
  }

  // 밝은 면 재질: 램버트 + 복셀마다 밝기 흔들림(그리디 메싱으로 합친 면도 칸마다 결이 보이게)
  function litPatch(sh) {
    sh.vertexShader = 'attribute vec2 jit;\nvarying vec3 vVox;\nvarying vec2 vJ;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvVox = position - normal * 0.5; vJ = jit;');
    sh.fragmentShader = 'varying vec3 vVox;\nvarying vec2 vJ;\nfloat vxh(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }\n' + sh.fragmentShader.replace('#include <color_fragment>', [
      '#include <color_fragment>',
      'vec3 cv = floor(vVox);',
      'if (vJ.x > 0.0) diffuseColor.rgb *= 1.0 + (vxh(cv) * 2.0 - 1.0) * vJ.x;',
      'if (vJ.y > 1.5) diffuseColor.rgb *= 0.9 + vxh(floor(cv / vec3(4.0, 2.0, 4.0)) + 17.0) * 0.18;',
      'else if (vJ.y > 0.5) diffuseColor.rgb *= 0.88 + vxh(floor(cv * 0.5) + 31.0) * 0.22;',
    ].join('\n'));
  }
  function litMaterial(m) {
    m = m || new THREE.MeshLambertMaterial({ vertexColors: true });
    m.onBeforeCompile = litPatch;
    return m;
  }

  // 발광 재질: 알파 0.75를 빛 번짐 표시로 쓴다
  function glowMaterial() {
    return new THREE.ShaderMaterial({
      vertexColors: true,
      uniforms: { uBoost: { value: 1 } },
      vertexShader: 'varying vec3 vC; void main(){ vC = color; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform float uBoost; varying vec3 vC; void main(){ gl_FragColor = vec4(min(vC * uBoost, vec3(1.0)), 0.75); }',
    });
  }
  // 밤에만 켜지는 창·등불: 낮에는 유리(낮 색), 밤에는 발광
  function niteMaterial() {
    return new THREE.ShaderMaterial({
      vertexColors: true,
      uniforms: { uNight: { value: 0 }, uBoost: { value: 1 } },
      vertexShader: 'attribute vec3 color2; varying vec3 vC; varying vec3 vD; void main(){ vC = color; vD = color2; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform float uNight; uniform float uBoost; varying vec3 vC; varying vec3 vD; void main(){ if (uNight < 0.5 && vD.r + vD.g + vD.b < 0.001) discard; gl_FragColor = uNight > 0.5 ? vec4(min(vC * uBoost, vec3(1.0)), 0.75) : vec4(vD, 1.0); }',
    });
  }
  // 입자: 0.75는 빛 번짐, 0.85는 외곽선 없는 일반 입자
  function pointsMaterial(size, glow) {
    return new THREE.ShaderMaterial({
      vertexColors: true,
      uniforms: { uSize: { value: size || 1 }, uA: { value: glow ? 0.75 : 0.85 } },
      vertexShader: 'uniform float uSize; varying vec3 vC; void main(){ vC = color; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_PointSize = uSize; }',
      fragmentShader: 'uniform float uA; varying vec3 vC; void main(){ gl_FragColor = vec4(vC, uA); }',
    });
  }

  // ───── 액체(물·피·독·용암·얼음) ─────
  const LIQ_VS = `
    attribute float dep; varying vec3 vW; varying vec3 vN; varying float vDep;
    void main(){ vec4 wp = modelMatrix * vec4(position,1.0); vW = wp.xyz; vN = normal; vDep = dep;
      gl_Position = projectionMatrix * viewMatrix * wp; }`;
  const LIQ_FS = `
    uniform float uT; uniform float uSpeed; uniform float uAlpha; uniform float uOp; varying float vDep; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
    uniform float uEnh; uniform vec4 uEye; uniform vec3 uSun; uniform vec3 uSunC; uniform vec3 uSkyC; uniform float uGlint;
    varying vec3 vW; varying vec3 vN;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    void main(){
      float t = uT * uSpeed;
      vec3 c;
      if (abs(vN.y) > 0.5) {
        vec2 p = floor(vW.xz * 2.0) / 2.0;
        float n = sin(p.x*0.7 + t*1.3) + sin(p.y*0.9 - t*1.1) + sin((p.x - p.y)*0.45 + t*0.7);
        n = n / 6.0 + 0.5;
        c = mix(uA, uB, step(0.44, n));
        c = mix(c, uC, step(0.82, n));
        float sp = step(0.99, h(p + floor(t * 2.0)));
        c = mix(c, uC, sp);
        // 셰이더 모드: 프레넬(비스듬히 볼수록 하늘빛) + 해 반사 반짝임. 끄면(uEnh 0) 위와 똑같다
        if (uEnh > 0.5 && uAlpha > 0.9) {
          vec3 V = uEye.w > 0.5 ? normalize(uEye.xyz - vW) : uEye.xyz;
          vec3 N = normalize(vec3(sin(p.x * 1.3 + t * 1.7) * 0.22 + sin((p.x + p.y) * 0.8 - t) * 0.12, 1.0, cos(p.y * 1.1 - t * 1.4) * 0.22));
          float fr = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
          c = mix(c, uSkyC, clamp(fr * 1.1, 0.0, 0.65));
          float s = pow(max(dot(reflect(-V, N), uSun), 0.0), 48.0);
          c += uSunC * step(0.35, s) * 0.5;
          float g2 = step(0.986, h(p * 1.7 + floor(t * 2.6) + 7.0)) * (0.4 + 0.6 * smoothstep(0.0, 0.6, uSun.y));
          c = mix(c, mix(uC, vec3(1.0), 0.7), g2 * uGlint);
        }
      } else {
        vec2 p = floor(vec2((vW.x + vW.z) * 2.0, vW.y * 2.0 + t * 6.0));
        float n = h(vec2(p.x, 0.0));
        float band = fract(p.y * 0.13 + n);
        c = mix(uA, uB, step(0.55, band));
        c = mix(c, uC, step(0.93, band));
      }
      // 물(uAlpha 1)은 반투명(uOp)으로 섞고, 빛나는 액체(0.75)는 그대로
      // 얕은 물가는 더 맑게, 깊을수록 물빛이 진하게(그래도 반쯤 비친다)
      float op = min(0.58, uOp * (0.62 + 0.44 * smoothstep(1.0, 14.0, vDep)));   // 0.6~0.8은 후처리의 발광 표시라 넘지 않는다
      gl_FragColor = vec4(c, uAlpha > 0.9 ? op : uAlpha);
    }`;
  function buildLiquid(w, colors, speed, glow) {
    const W = w.W, D = w.D;
    const pos = [], nor = [], idx = [], dep = [];
    let qd = 8;   // 지금 그리는 면의 물 깊이(칸)
    const quad = (a, b, c, d, n) => {
      const i0 = pos.length / 3;
      pos.push(...a, ...b, ...c, ...d);
      for (let k = 0; k < 4; k++) { nor.push(...n); dep.push(qd); }
      idx.push(i0, i0 + 1, i0 + 2, i0, i0 + 2, i0 + 3);
    };
    const L = (x, z) => w.liq[x + W * z];
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      const ly = w.liq[x + W * z];
      if (ly < 0) continue;
      const y = ly + 0.8;
      qd = ly - w.top(x, z);
      quad([x, y, z], [x, y, z + 1], [x + 1, y, z + 1], [x + 1, y, z], [0, 1, 0]);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz;
        if (nx < 0 || nz < 0 || nx >= W || nz >= D) continue;
        const nl = L(nx, nz);
        if (nl >= ly) continue;
        const nt = w.top(nx, nz);
        if (nl < 0 && nt >= ly) continue;
        const y0 = nl >= 0 ? nl + 0.8 : Math.max(0, nt + 1);
        qd = 8;
        const fx = dx > 0 ? x + 1 : dx < 0 ? x : null;
        const fz = dz > 0 ? z + 1 : dz < 0 ? z : null;
        if (fx !== null) quad([fx, y0, z], [fx, y, z], [fx, y, z + 1], [fx, y0, z + 1], [dx, 0, 0]);
        else quad([x, y0, fz], [x + 1, y0, fz], [x + 1, y, fz], [x, y, fz], [0, 0, dz]);
      }
    }
    if (!pos.length) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute('dep', new THREE.Float32BufferAttribute(dep, 1));
    g.setIndex(idx);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uT: { value: 0 }, uSpeed: { value: speed == null ? 1 : speed }, uAlpha: { value: glow ? 0.75 : 1 }, uOp: { value: 0.54 },
        uA: { value: new THREE.Color(colors[0]) }, uB: { value: new THREE.Color(colors[1]) }, uC: { value: new THREE.Color(colors[2]) },
        // 셰이더 모드(fx.js가 매 프레임 채운다)
        uEnh: { value: 0 }, uEye: { value: new THREE.Vector4(0, 1, 0, 0) }, uSun: { value: new THREE.Vector3(0, 1, 0) },
        uSunC: { value: new THREE.Color('#fff') }, uSkyC: { value: new THREE.Color('#9ac') }, uGlint: { value: 1 },
      },
      vertexShader: LIQ_VS, fragmentShader: LIQ_FS, side: THREE.DoubleSide,
    });
    // 물은 반쯤 투명: 색은 알파로 섞고, 화면 알파(후처리가 하늘·발광·외곽선 표시로 씀)는 밑의 값에 더해 1에 가깝게 둔다
    if (!glow) Object.assign(mat, {
      transparent: true, blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneFactor,
    });
    return new THREE.Mesh(g, mat);
  }

  // ───── 픽셀 후처리 ─────
  // 같은 셰이더를 두 벌 만든다: 기본(지금까지 그대로) / ENH(셰이더 모드: 부드러운 빛 번짐·틈새 그늘·색보정·비네트·햇빛 산란)
  // wx*(날씨 안개·하늘·어둡게·번개)는 0이면 기본 결과와 똑같다
  const POST_FS = `
    uniform sampler2D tC; uniform sampler2D tD; uniform vec2 res; uniform float range; uniform mat4 invVP;
    uniform float uT; uniform float levels; uniform float dither; uniform float outline; uniform float stars; uniform float bloom;
    uniform vec3 sky0; uniform vec3 sky1; uniform vec3 skyGlow;
    uniform vec4 fogBox; uniform float fogStart; uniform float fogFloor; uniform float fogDepth;
    uniform vec3 haze; uniform vec3 hazeColor; uniform vec2 fogTop;
    uniform vec4 wxFog; uniform vec4 wxSky; uniform float wxDim; uniform float wxFlash; uniform vec3 wxFocus; uniform vec2 wxRange;
  #ifdef ENH
    uniform sampler2D tB; uniform float bloomK; uniform float persp; uniform float zNear; uniform float zFar; uniform vec4 eye;
    uniform vec3 sunDir; uniform vec3 sunCol; uniform vec3 sunUV; uniform float aoK; uniform float vig;
    uniform vec3 gLift; uniform vec3 gGain; uniform float gSat; uniform float gCon; uniform float scatK;
  #endif
    varying vec2 vUv;
    float bayer2(vec2 a){ a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
    float bayer4(vec2 a){ return bayer2(0.5 * a) * 0.25 + bayer2(a); }
    float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
    float dep(vec2 px){ return texture2D(tD, (px + 0.5) / res).x; }
    vec3 skyAt(vec2 uv, vec2 px, float b){
      float g = uv.y + (b - 0.5) * 0.06;
      vec3 c = mix(sky0, sky1, clamp(g, 0.0, 1.0));
      vec2 q = (uv - vec2(0.5, 0.45)) * vec2(res.x / res.y, 1.0);
      return mix(c, skyGlow, smoothstep(0.8, 0.0, length(q)) * 0.6);
    }
    vec3 tap(vec2 px){ vec4 s = texture2D(tC, (px + 0.5) / res); return s.rgb * step(0.6, s.a) * step(s.a, 0.8); }
  #ifdef ENH
    float lin(float d){
      if (persp > 0.5) { float z = d * 2.0 - 1.0; return 2.0 * zNear * zFar / (zFar + zNear - z * (zFar - zNear)); }
      return d * range;
    }
    float occ1(vec2 px, float zc){ float dz = zc - lin(dep(px)); return smoothstep(0.15, 1.0, dz) * (1.0 - smoothstep(2.5, 6.0, dz)); }
  #endif
    void main(){
      vec2 px = floor(vUv * res);
      vec2 uv = (px + 0.5) / res;
      float d = dep(px);
      vec4 src = texture2D(tC, uv);
      float b = bayer4(px);
      vec3 sky = skyAt(uv, px, b);
      if (wxSky.a > 0.0 || wxFlash > 0.0) sky = mix(sky, wxSky.rgb, wxSky.a) + vec3(0.8, 0.85, 1.0) * wxFlash;
  #ifdef ENH
      vec4 wq = invVP * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0); wq /= wq.w;
      vec3 rd = eye.w > 0.5 ? normalize(wq.xyz - eye.xyz) : -eye.xyz;
      float sc = pow(max(dot(rd, sunDir), 0.0), 6.0) * scatK;
  #endif
      vec3 c;
      if (src.a < 0.3) {
        c = sky;
        float s = hash(px);
        if (s > 1.0 - 0.0035 * stars) c += vec3(0.55) * (0.5 + 0.5 * sin(uT * 1.7 + s * 900.0)) * smoothstep(0.3, 1.0, uv.y);
  #ifdef ENH
        c += sunCol * sc * 0.35;
  #endif
      } else {
        c = src.rgb;
        if (src.a > 0.95) {
          float l = dep(px + vec2(1.0, 0.0)) + dep(px - vec2(1.0, 0.0)) + dep(px + vec2(0.0, 1.0)) + dep(px - vec2(0.0, 1.0)) - 4.0 * d;
          float e = l * range;
          if (e > 3.0) c *= mix(1.0, 0.3, outline);
          else if (e > 0.7) c *= mix(1.0, 0.66, outline);
  #ifdef ENH
          // 틈새 그늘: 둘레 8점 중 카메라 쪽으로 튀어나온 곳이 많을수록 어둡게
          float zc = lin(d);
          float o = occ1(px + vec2(2.0, 0.0), zc) + occ1(px - vec2(2.0, 0.0), zc) + occ1(px + vec2(0.0, 2.0), zc) + occ1(px - vec2(0.0, 2.0), zc)
                  + occ1(px + vec2(3.0, 3.0), zc) + occ1(px - vec2(3.0, 3.0), zc) + occ1(px + vec2(3.0, -3.0), zc) + occ1(px - vec2(3.0, -3.0), zc);
          c *= 1.0 - aoK * min(1.0, o / 5.0);
  #endif
        }
        if (wxDim < 1.0 && abs(src.a - 0.75) > 0.05) c *= wxDim;
        vec4 wp = invVP * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
        wp /= wp.w;
        float hz = smoothstep(haze.x, haze.x - haze.z, wp.y) * haze.y;
        c = mix(c, hazeColor, clamp(hz + (b - 0.5) * 0.12 * step(0.01, hz), 0.0, 1.0));
        vec2 q = abs(wp.xz - fogBox.xy) / fogBox.zw;
        float e2 = pow(pow(q.x, 4.0) + pow(q.y, 4.0), 0.25);
        float f = smoothstep(fogStart, 1.0, e2);
        f = max(f, smoothstep(fogFloor, fogFloor - fogDepth, wp.y));
        f = max(f, smoothstep(fogTop.x, fogTop.x + fogTop.y, wp.y));
        f = clamp(f + (b - 0.5) * 0.2, 0.0, 1.0);
        f = floor(f * 5.0 + 0.5) / 5.0;
        c = mix(c, sky, f);
        if (wxFog.a > 0.0) {
          float wf = wxFog.a * smoothstep(wxRange.x, wxRange.y, length(wp.xyz - wxFocus));
          wf = clamp(floor((wf + (b - 0.5) * 0.16) * 6.0 + 0.5) / 6.0, 0.0, 1.0);
          c = mix(c, wxFog.rgb, wf);
        }
  #ifdef ENH
        // 햇빛 산란: 해 쪽을 볼 때 먼 곳·안개가 해 빛깔로 물든다
        c = mix(c, sunCol, clamp(sc * (f + 0.12), 0.0, 0.6));
  #endif
      }
      vec3 bl = tap(px + vec2(1.0, 0.0)) + tap(px - vec2(1.0, 0.0)) + tap(px + vec2(0.0, 1.0)) + tap(px - vec2(0.0, 1.0));
      bl = bl * 0.5 + (tap(px + vec2(2.0, 1.0)) + tap(px - vec2(2.0, 1.0)) + tap(px + vec2(-1.0, 2.0)) + tap(px + vec2(1.0, -2.0))) * 0.3;
      bl += (tap(px + vec2(3.0, 0.0)) + tap(px - vec2(3.0, 0.0)) + tap(px + vec2(0.0, 3.0)) + tap(px - vec2(0.0, 3.0))) * 0.15;
      c += bl * bloom * 0.25;
  #ifdef ENH
      // 넓고 부드러운 빛 번짐(1/4 해상도에서 흐린 것)
      c += texture2D(tB, vUv).rgb * bloomK;
      // 빛줄기: 해 쪽으로 걸어가며 하늘이 보이는 비율을 모은다
      if (sunUV.z > 0.0) {
        vec2 dl = (sunUV.xy - uv) / 10.0;
        float acc = 0.0; vec2 sp = uv + dl * b;
        for (int i = 0; i < 10; i++) { acc += step(texture2D(tC, sp).a, 0.3); sp += dl; }
        float fall = 1.0 - smoothstep(0.0, 1.1, length((sunUV.xy - uv) * vec2(res.x / res.y, 1.0)));
        c += sunCol * (acc / 10.0) * fall * fall * sunUV.z * 0.32;
      }
      // 색보정: 대비·채도·밝은 쪽/어두운 쪽 색
      c = (c - 0.5) * gCon + 0.5;
      float lu = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(vec3(lu), c, gSat) * gGain + gLift * (1.0 - lu);
      vec2 vq = (uv - 0.5) * vec2(1.0, 0.85);
      c *= 1.0 - vig * smoothstep(0.25, 0.75, length(vq));
      c = max(c, 0.0);
  #endif
      c = floor(c * levels + mix(0.5, b, dither)) / levels;
      gl_FragColor = vec4(c, 1.0);
    }`;
  // 빛 번짐 재료: 발광 칸(알파 0.75)은 그대로, 아주 밝은 칸은 조금. 4×4 칸을 한 점으로 모은다
  const BRIGHT_FS = `
    uniform sampler2D tC; uniform vec2 res; uniform float thr; uniform float litK; varying vec2 vUv;
    vec3 m(vec2 o){ vec4 s = texture2D(tC, vUv + o / res); float g = step(0.6, s.a) * step(s.a, 0.8);
      float l = dot(s.rgb, vec3(0.3, 0.59, 0.11)); return s.rgb * (g + step(0.3, s.a) * (1.0 - g) * smoothstep(thr, thr + 0.12, l) * litK); }
    void main(){ gl_FragColor = vec4((m(vec2(-1.0, -1.0)) + m(vec2(1.0, -1.0)) + m(vec2(-1.0, 1.0)) + m(vec2(1.0, 1.0))) * 0.25, 1.0); }`;
  const BLUR_FS = `
    uniform sampler2D tS; uniform vec2 dir; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tS, vUv).rgb * 0.227;
      c += (texture2D(tS, vUv + dir * 1.385).rgb + texture2D(tS, vUv - dir * 1.385).rgb) * 0.316;
      c += (texture2D(tS, vUv + dir * 3.231).rgb + texture2D(tS, vUv - dir * 3.231).rgb) * 0.070;
      gl_FragColor = vec4(c, 1.0);
    }`;
  const QUAD_VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';

  class PostFX {
    constructor(renderer) {
      this.r = renderer;
      this.rt = new THREE.WebGLRenderTarget(4, 4, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
      this.rt.depthTexture = new THREE.DepthTexture();
      this.rt.depthTexture.type = THREE.UnsignedIntType;
      const lo = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false };
      this.rtA = new THREE.WebGLRenderTarget(1, 1, lo);
      this.rtB = new THREE.WebGLRenderTarget(1, 1, lo);
      this.u = {
        tC: { value: this.rt.texture }, tD: { value: this.rt.depthTexture },
        res: { value: new THREE.Vector2(4, 4) }, range: { value: 1 }, uT: { value: 0 }, invVP: { value: new THREE.Matrix4() },
        levels: { value: 20 }, dither: { value: 1 }, outline: { value: 1 }, stars: { value: 1 }, bloom: { value: 1 },
        sky0: { value: new THREE.Color('#000') }, sky1: { value: new THREE.Color('#000') }, skyGlow: { value: new THREE.Color('#000') },
        fogBox: { value: new THREE.Vector4(0, 0, 48, 48) }, fogStart: { value: 0.72 }, fogFloor: { value: -12 }, fogDepth: { value: 10 },
        haze: { value: new THREE.Vector3(-100, 0, 1) }, hazeColor: { value: new THREE.Color('#fff') }, fogTop: { value: new THREE.Vector2(1e4, 18) },
        // 날씨(fx.js)
        wxFog: { value: new THREE.Vector4(1, 1, 1, 0) }, wxSky: { value: new THREE.Vector4(1, 1, 1, 0) }, wxDim: { value: 1 }, wxFlash: { value: 0 },
        wxFocus: { value: new THREE.Vector3() }, wxRange: { value: new THREE.Vector2(10, 80) },
        // 셰이더 모드
        tB: { value: this.rtA.texture }, bloomK: { value: 0.9 }, persp: { value: 0 }, zNear: { value: 1 }, zFar: { value: 800 }, eye: { value: new THREE.Vector4(0, 1, 0, 0) },
        sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunCol: { value: new THREE.Color('#fff') }, sunUV: { value: new THREE.Vector3(0.5, 1.2, 0) },
        aoK: { value: 0.35 }, vig: { value: 0.22 }, gLift: { value: new THREE.Vector3() }, gGain: { value: new THREE.Vector3(1, 1, 1) }, gSat: { value: 1.08 }, gCon: { value: 1.05 }, scatK: { value: 0.5 },
      };
      const mk = (fs, uniforms, defines) => new THREE.ShaderMaterial({ uniforms, vertexShader: QUAD_VS, fragmentShader: fs, depthTest: false, depthWrite: false, defines: defines || {} });
      this.matBase = mk(POST_FS, this.u);
      this.matEnh = null;                          // 처음 켤 때 컴파일
      this.bu = { tC: this.u.tC, res: this.u.res, thr: { value: 0.86 }, litK: { value: 0.35 } };
      this.matBright = mk(BRIGHT_FS, this.bu);
      this.blurU = { tS: { value: null }, dir: { value: new THREE.Vector2() } };
      this.matBlur = mk(BLUR_FS, this.blurU);
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.matBase);
      quad.frustumCulled = false;
      this.quad = quad;
      this.scene = new THREE.Scene();
      this.scene.add(quad);
      this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.enh = false;
    }
    // 셰이더 모드 켜고 끄기(끄면 예전과 똑같은 셰이더로 돌아간다)
    setEnhanced(on) {
      this.enh = !!on;
      if (on && !this.matEnh) this.matEnh = new THREE.ShaderMaterial({ uniforms: this.u, vertexShader: QUAD_VS, fragmentShader: POST_FS, depthTest: false, depthWrite: false, defines: { ENH: '' } });
      this.quad.material = on ? this.matEnh : this.matBase;
    }
    setSize(w, h) {
      this.rt.setSize(w, h); this.u.res.value.set(w, h);
      this.rtA.setSize(Math.max(1, w >> 2), Math.max(1, h >> 2)); this.rtB.setSize(Math.max(1, w >> 2), Math.max(1, h >> 2));
    }
    setSky(a, b, g, stars) {
      this.u.sky0.value.set(a); this.u.sky1.value.set(b); this.u.skyGlow.value.set(g);
      this.u.stars.value = stars === false ? 0 : 1;
    }
    // fog = { box:[cx,cz,hx,hz], start, floor, depth, haze:[y, amount, spread], hazeColor }
    setFog(f) {
      const u = this.u;
      u.fogBox.value.set(f.box[0], f.box[1], f.box[2], f.box[3]);
      u.fogStart.value = f.start; u.fogFloor.value = f.floor; u.fogDepth.value = f.depth;
      const hz = f.haze || [-100, 0, 1];
      u.haze.value.set(hz[0], hz[1], hz[2]);
      u.hazeColor.value.set(f.hazeColor || '#ffffff');
      u.fogTop.value.set(f.top != null ? f.top : 1e4, f.topDepth || 18);
    }
    pass(mat, target) { this.quad.material = mat; this.r.setRenderTarget(target); this.r.render(this.scene, this.cam); }
    // 장면을 그린 뒤 후처리(정사영·원근 모두 이 길로)
    draw(scene, cam) {
      const r = this.r;
      r.setRenderTarget(this.rt);
      r.render(scene, cam);
      if (this.enh) {
        const a = this.rtA, b = this.rtB;
        this.pass(this.matBright, a);
        this.blurU.tS.value = a.texture; this.blurU.dir.value.set(1 / a.width, 0); this.pass(this.matBlur, b);
        this.blurU.tS.value = b.texture; this.blurU.dir.value.set(0, 1 / a.height); this.pass(this.matBlur, a);
        this.blurU.tS.value = a.texture; this.blurU.dir.value.set(2 / a.width, 0); this.pass(this.matBlur, b);
        this.blurU.tS.value = b.texture; this.blurU.dir.value.set(0, 2 / a.height); this.pass(this.matBlur, a);
        this.quad.material = this.matEnh;
      }
      r.setRenderTarget(null);
      r.render(this.scene, this.cam);
    }
    render(scene, cam, t) {
      this.u.uT.value = t;
      this.u.range.value = cam.far - cam.near;
      this.u.invVP.value.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse).invert();
      this.draw(scene, cam);
    }
  }

  window.VX = { W, D, H, World, buildGeometry, litMaterial, buildLiquid, glowMaterial, niteMaterial, pointsMaterial, PostFX, hash3, mulberry };
})();
