// e-kit.js — 틈새의 땅(큰 지도)용 도구: 곡선 관(뿌리·사슬·용), 고딕 아치, 갈빗대 돔, 첨탑, 떠다니는 섬, 무너짐, 축복
(function () {
  'use strict';
  const { hash3 } = VX;
  const LB = window.LB = {};
  const lerp = (a, b, t) => a + (b - a) * t;
  LB.lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

  // 캣멀롬 곡선을 거의 같은 간격(step)으로 다시 찍은 점들
  LB.curve = function (pts, step) {
    step = step || 0.6;
    const out = [], P = [pts[0], ...pts, pts[pts.length - 1]];
    for (let i = 1; i < P.length - 2; i++) {
      const p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2];
      const n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]) / step));
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0, 1, 2].map(q => 0.5 * (2 * p1[q] + (p2[q] - p0[q]) * t + (2 * p0[q] - 5 * p1[q] + 4 * p2[q] - p3[q]) * t2 + (3 * p1[q] - p0[q] - 3 * p2[q] + p3[q]) * t3)));
      }
    }
    out.push(pts[pts.length - 1].slice());
    return out;
  };
  // 관: 곡선을 따라 반지름 r(t)의 구를 이어 칠한다. b는 블록 또는 (x,y,z,t,dy,d)→블록
  LB.tube = function (w, pts, r, b, o) {
    o = o || {};
    const C = LB.curve(pts, o.step || 0.6), seen = o.dedupe === false ? null : new Set();
    C.forEach((p, i) => {
      const t = i / (C.length - 1), rr = typeof r === 'function' ? r(t) : r, R = Math.ceil(rr);
      for (let dy = -R; dy <= R; dy++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 > rr * rr + 0.25) continue;
        const x = Math.round(p[0] + dx), y = Math.round(p[1] + dy), z = Math.round(p[2] + dz);
        if (seen) { const k = x + 1000 * (z + 1000 * y); if (seen.has(k)) continue; seen.add(k); }
        if (o.under && w.get(x, y, z)) continue;
        const blk = typeof b === 'function' ? b(x, y, z, t, dy, Math.sqrt(d2) / (rr || 1)) : b;
        if (blk) w.set(x, y, z, blk);
      }
    });
    return C;
  };

  // 아치 안쪽 판정: u 가로(-a..a), v 세로(0..h). kind 'round'|'pointed'
  LB.inArch = function (u, v, a, h, kind) {
    if (v < 0 || Math.abs(u) > a + 0.01) return false;
    if (kind === 'round') { const s = h - a; return v <= s || u * u + (v - s) * (v - s) <= a * a + 0.3; }
    const R = a * 1.6, c = R - a, s = h - Math.sqrt(R * R - c * c);
    if (v <= s) return true;
    return (u + c) * (u + c) + (v - s) * (v - s) <= R * R + 0.3 && (u - c) * (u - c) + (v - s) * (v - s) <= R * R + 0.3;
  };
  // 벽면(축 'x'면 x를 따라 놓인 벽, 'z'면 z를 따라)에 아치를 뚫거나 칠한다. 테두리 한 칸은 frame
  // o = { axis, c(벽 위치), u0(가운데), y0, a(반폭), h, kind, fill(안쪽 블록, 0이면 뚫음), frame, depth(두께), d0 }
  LB.arch = function (w, o) {
    const a = o.a, h = o.h, dep = o.depth || 1;
    for (let v = -1; v <= h + 2; v++) for (let du = -Math.ceil(a) - 1; du <= Math.ceil(a) + 1; du++) {
      const inside = LB.inArch(du, v, a, h, o.kind), ring = !inside && (LB.inArch(du, v, a + 1, h + 1, o.kind) && v >= 0);
      if (!inside && !(ring && o.frame)) continue;
      for (let k = 0; k < dep; k++) {
        const along = o.u0 + du, across = o.c + (o.d0 || 0) + k * (o.dir || 1), y = o.y0 + v;
        const x = o.axis === 'x' ? along : across, z = o.axis === 'x' ? across : along;
        if (inside) w.set(x, y, z, o.fill || 0);
        else if (k === 0) w.set(x, y, z, o.frame);
      }
    }
  };
  // 아케이드: 벽을 세우고 같은 간격으로 아치를 뚫는다
  LB.arcade = function (w, o) {
    const { axis, c, u0, u1, y0, h } = o;
    for (let u = u0; u <= u1; u++) for (let y = y0; y < y0 + h; y++) for (let k = 0; k < (o.t || 1); k++) {
      const x = axis === 'x' ? u : c + k, z = axis === 'x' ? c + k : u;
      w.set(x, y, z, (y === y0 + h - 1 && o.cap) ? o.cap : o.wall);
    }
    const gap = o.gap || 6;
    for (let u = u0 + Math.floor(gap / 2); u <= u1 - 2; u += gap)
      LB.arch(w, { axis, c, u0: u, y0: o.ay || y0, a: o.a || 2, h: o.ah || h - 3, kind: o.kind, fill: o.fill || 0, frame: o.frame, depth: o.t || 1 });
  };

  // 갈빗대 돔: 반구(납작하게 sy) + 갈빗대 + 꼭대기 등롱
  LB.dome = function (w, cx, cy, cz, r, b, o) {
    o = o || {};
    const sy = o.sy || 1, R = Math.ceil(r), ribs = o.ribs || 0;
    for (let y = 0; y <= Math.ceil(r * sy); y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
      const d = Math.hypot(dx, y / sy, dz);
      if (d > r + 0.3 || (o.hollow && d < r - 1.4)) continue;
      let blk = b;
      if (ribs) { const ang = Math.atan2(dz, dx), k = Math.round(ang / (Math.PI * 2) * ribs); if (Math.abs(ang - k * Math.PI * 2 / ribs) * Math.hypot(dx, dz) < 0.7) blk = o.rib || b; }
      if (o.band && y === 0) blk = o.band;
      w.set(cx + dx, cy + y, cz + dz, blk);
    }
    let top = cy + Math.ceil(r * sy);
    if (o.lantern) { w.cyl(cx, cz, top, top + 2, 1.2, o.lantern); top += 3; if (o.tip) { w.box(cx, top, cz, cx, top + 2, cz, o.tip); top += 3; } }
    return top;
  };
  // 첨탑: 받침 고리 + 가늘어지는 원뿔 + 꼭대기 장식
  LB.spire = function (w, cx, cz, y, r, h, b, o) {
    o = o || {};
    for (let k = 0; k < h; k++) {
      const rr = r * Math.pow(1 - k / h, o.curve || 1.1);
      if (rr < 0.35) { w.set(cx, y + k, cz, o.tip || b); continue; }
      w.cyl(cx, cz, y + k, y + k, rr, (o.band && k % (o.bandGap || 6) === 0) ? o.band : b);
    }
    if (o.tip) w.box(cx, y + h, cz, cx, y + h + 1, cz, o.tip);
    return y + h + 2;
  };
  // 가는 뾰족탑(피너클)
  LB.pinnacle = function (w, x, y, z, h, b, tip) {
    w.box(x, y, z, x, y + h - 1, z, b);
    w.set(x, y + h, z, tip || b);
  };

  // 떠다니는 섬: 윗면 cy, 아래로 뾰족해지는 바위. 윗면 높이를 hm에 기록
  LB.island = function (w, cx, cy, cz, rx, rz, depth, o) {
    o = o || {};
    const n = w.noise;
    for (let dz = -Math.ceil(rz) - 2; dz <= Math.ceil(rz) + 2; dz++) for (let dx = -Math.ceil(rx) - 2; dx <= Math.ceil(rx) + 2; dx++) {
      const x = cx + dx, z = cz + dz;
      const e = Math.hypot(dx / rx, dz / rz) + (n.fbm(x * 0.09 + (o.salt || 0), z * 0.09, 3) - 0.5) * (o.rough || 0.35);
      if (e > 1) continue;
      const bottom = Math.round(cy - depth * Math.pow(1 - e, 0.55) - n.fbm(x * 0.2, z * 0.2 + 3, 2) * 4);
      const top = cy + (o.lift ? Math.round(o.lift(x, z, e)) : 0);
      for (let y = bottom; y <= top; y++) w.set(x, y, z, y === top ? (o.top ? o.top(x, z, e) : o.rock) : (top - y < 2 && o.soil ? o.soil : (o.under && (y % 4 === 0) ? o.under : o.rock)));
      if (w.hm && x >= 0 && z >= 0 && x < w.W && z < w.D) w.hm[x + w.W * z] = Math.max(w.hm[x + w.W * z], top);
    }
  };
  // 무너짐: 상자 안에서 드러난 면의 블록을 해시 확률 p로 떼어낸다(passes번)
  LB.crumble = function (w, x0, y0, z0, x1, y1, z1, p, passes, salt) {
    for (let pass = 0; pass < (passes || 2); pass++) {
      const kill = [];
      for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
        if (!w.get(x, y, z)) continue;
        if (w.get(x + 1, y, z) && w.get(x - 1, y, z) && w.get(x, y + 1, z) && w.get(x, y, z + 1) && w.get(x, y, z - 1)) continue;
        if (hash3(x + (salt || 0) * 31, y + pass * 17, z) < p) kill.push([x, y, z]);
      }
      kill.forEach(([x, y, z]) => w.set(x, y, z, 0));
    }
  };

  // 사슬 고리 하나: p 중심, d 진행 방향, vert면 세로로 선 고리
  const chainLink = function (w, p, d, vert, size, link, o) {
    let s = vert ? [0, 1, 0] : [-d[2], 0, d[0]];
    if (Math.abs(d[1]) > 0.85) s = vert ? [1, 0, 0] : [0, 0, 1];     // 거의 수직으로 늘어진 사슬
    const sd = s[0] * d[0] + s[1] * d[1] + s[2] * d[2]; s = [s[0] - d[0] * sd, s[1] - d[1] * sd, s[2] - d[2] * sd];
    const sl = Math.hypot(...s) || 1; s = s.map(v => v / sl);
    const N = Math.max(28, Math.round(14 * size));
    for (let k = 0; k < N; k++) {
      const ang = k / N * Math.PI * 2, u = Math.cos(ang) * 1.9 * size, v = Math.sin(ang) * 1.05 * size;
      const x = Math.round(p[0] + d[0] * u + s[0] * v), y = Math.round(p[1] + d[1] * u + s[1] * v), z = Math.round(p[2] + d[2] * u + s[2] * v);
      w.set(x, y, z, (o.ice && hash3(x, y, z) > 0.62) ? o.ice : link);
      if (o.ice && hash3(x, y + 9, z) > 0.86) w.set(x, y - 1, z, o.ice);
      // 굵은 사슬은 고리 두께를 한 칸 더
      if (size >= 1.8) { const x2 = Math.round(p[0] + d[0] * u * 0.86 + s[0] * v * 0.8), y2 = Math.round(p[1] + d[1] * u * 0.86 + s[1] * v * 0.8), z2 = Math.round(p[2] + d[2] * u * 0.86 + s[2] * v * 0.8); w.set(x2, y2, z2, link); }
    }
  };
  // 사슬: a→b로 처지는 고리들. 고리는 번갈아 세로·가로로 눕는다
  LB.chain = function (w, a, b, sag, link, o) {
    o = o || {};
    const L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), size = o.size || 1, step = 2.6 * size;
    const n = Math.max(2, Math.round(L / step)), P = t => [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - sag * 4 * t * (1 - t), lerp(a[2], b[2], t)];
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, p = P(t), q = P(Math.min(1, t + 0.01)), d = [q[0] - p[0], q[1] - p[1], q[2] - p[2]], dl = Math.hypot(...d) || 1;
      d[0] /= dl; d[1] /= dl; d[2] /= dl;
      chainLink(w, p, d, i % 2 === 1, size, link, o);
    }
    return P;
  };
  // 꺾인 길을 따르는 사슬(땅에 늘어진 사슬처럼): pts는 3차원 점들
  LB.chainPath = function (w, pts, link, o) {
    o = o || {};
    const size = o.size || 1, C = LB.curve(pts, 0.4), marks = [C[0]];
    let acc = 0;
    for (let k = 1; k < C.length; k++) { acc += Math.hypot(C[k][0] - C[k - 1][0], C[k][1] - C[k - 1][1], C[k][2] - C[k - 1][2]); if (acc >= 2.6 * size) { marks.push(C[k]); acc = 0; } }
    marks.forEach((p, i) => {
      const q = marks[Math.min(marks.length - 1, i + 1)], r = marks[Math.max(0, i - 1)], d = [q[0] - r[0], q[1] - r[1], q[2] - r[2]], dl = Math.hypot(...d) || 1;
      chainLink(w, p, d.map(v => v / dl), i % 2 === 1, size, link, o);
    });
    return marks;
  };
  // 비탈길: pts=[[x,z,y],...] 꺾은선을 따라 반폭 half의 길. 바닥 높이는 선을 따라 보간하고, 아래가 2칸 이상 낮은 가장자리엔 난간
  // o = { top, edge, fill, rail, post, postGap, postSide(1 오른쪽·-1 왼쪽, 없으면 낭떠러지 쪽), onPost(x,y,z,s), name }
  LB.ramp = function (w, pts, half, o) {
    o = o || {};
    const segs = []; let L = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (Math.abs(b[2] - a[2]) > l * 0.75) (w.warn = w.warn || []).push(`비탈길 ${o.name || ''}: ${i}번째 구간이 너무 가파름(${(b[2] - a[2]).toFixed(1)}칸 / ${l.toFixed(1)}칸)`);
      segs.push([a, b, l, L]); L += l;
    }
    let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    pts.forEach(p => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); });
    const R = Math.ceil(half) + 1, cells = [];
    for (let z = Math.floor(z0) - R; z <= Math.ceil(z1) + R; z++) for (let x = Math.floor(x0) - R; x <= Math.ceil(x1) + R; x++) {
      let best = 1e9, by = 0, bs = 0, bside = 0;
      for (const [a, b, l, L0] of segs) {
        const dx = b[0] - a[0], dz = b[1] - a[1];
        const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / (l * l || 1)));
        const qx = a[0] + dx * t, qz = a[1] + dz * t, d = Math.hypot(x - qx, z - qz);
        if (d < best) { best = d; by = a[2] + (b[2] - a[2]) * t; bs = L0 + l * t; bside = Math.sign(dx * (z - qz) - dz * (x - qx)); }
      }
      if (best <= half) cells.push([x, z, Math.round(by), best, bs, bside]);
    }
    const on = new Set(cells.map(c => c[0] + 1000 * c[1]));
    cells.forEach(([x, z, y, d]) => MH.setH(w, x, z, y, d > half - 1 && o.edge ? o.edge : o.top, o.fill));
    let lastPost = -1e9;
    cells.sort((p, q) => p[4] - q[4]).forEach(([x, z, y, d, s, side]) => {
      if (d <= half - 1) return;
      let drop = false;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!on.has(x + dx + 1000 * (z + dz)) && MH.g(w, x + dx, z + dz) < y - 1) drop = true;
      const want = o.postSide ? side === o.postSide : drop;
      if (o.post && want && s - lastPost >= (o.postGap || 6)) { w.box(x, y + 1, z, x, y + 2, z, o.post); if (o.onPost) o.onPost(x, y + 3, z, s); lastPost = s; return; }
      if (o.rail && drop) w.set(x, y + 1, z, o.rail);
    });
    return cells;
  };

  // 축복: 작은 금빛 싹과 빛
  LB.grace = function (w, x, y, z, glow, stem) {
    if (stem) { w.set(x, y, z, stem); }
    w.set(x, y + 1, z, glow);
    return [x + 0.5, y + 1.5, z + 0.5];
  };
  // 축복의 인도: 축복에서 목적지 쪽으로 금빛이 이어져 날아간다
  LB.graceAct = function (o) {
    const at = o.at, to = o.to;
    return {
      name: o.name || '축복의 인도', hint: o.hint || '축복이 빛나며 다음 길을 가리켜요', hit: [Math.floor(at[0]) - 2, Math.floor(at[1]) - 2, Math.floor(at[2]) - 2, Math.floor(at[0]) + 2, Math.floor(at[1]) + 2, Math.floor(at[2]) + 2],
      run: async a => {
        a.flash('grace', 5, 3.2);
        a.burst(at, { n: 40, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 2, up: 3, life: 1.6, gravity: -0.6, spread: 1.2 });
        const n = o.steps || 16;
        for (let k = 1; k <= n; k++) {
          const t = k / n, p = LB.lerp3(at, to, t);
          p[1] += Math.sin(t * Math.PI) * (o.arc || 10);
          a.burst(p, { n: 10, colors: ['#ffe9a0', '#ffd060'], speed: 0.8, up: 0.6, life: 1.4, gravity: -0.2, spread: 0.8 });
          await a.wait(0.09);
        }
        a.burst(to, { n: 50, colors: ['#ffe9a0', '#ffd060', '#ffffff'], speed: 3, up: 4, life: 1.8, gravity: -0.4, spread: 2.5 });
        await a.wait(0.8);
      },
    };
  };

  // 삼각형 채우기(막): 세 점 사이를 촘촘히 칠한다. skip(x,y,z,u,v)가 참이면 비운다
  LB.tri = function (t, A, B, C, blk, skip) {
    const L = Math.max(Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]), Math.hypot(C[0] - A[0], C[1] - A[1], C[2] - A[2]), Math.hypot(C[0] - B[0], C[1] - B[1], C[2] - B[2]));
    const n = Math.ceil(L * 2.2);
    for (let i = 0; i <= n; i++) for (let j = 0; j <= n - i; j++) {
      const u = i / n, v = j / n;
      const x = Math.round(A[0] + (B[0] - A[0]) * u + (C[0] - A[0]) * v), y = Math.round(A[1] + (B[1] - A[1]) * u + (C[1] - A[1]) * v), z = Math.round(A[2] + (B[2] - A[2]) * u + (C[2] - A[2]) * v);
      if (skip && skip(x, y, z, u, v)) continue;
      if (!t.get(x, y, z)) t.set(x, y, z, blk);
    }
  };
  // 용(석화된 시체 또는 나는 용). target은 월드나 부품.
  // o = { x,y,z, dir(라디안), s(배율), pose:'draped'|'fly', wingUp, span, neckUp, headDir, torn, m:{body,belly,bone,wing,horn,eye,spike} }
  LB.dragon = function (t, o) {
    const s = o.s || 1, m = o.m, c = Math.cos(o.dir || 0), sn = Math.sin(o.dir || 0);
    const P = (f, r, u) => [o.x + (f * c - r * sn) * s, o.y + u * s, o.z + (f * sn + r * c) * s];
    const fly = o.pose === 'fly', body = (x, y, z, tt, dy) => dy < -0.5 * s ? (m.belly || m.body) : m.body;
    // 몸통(가슴이 두껍고 배 쪽이 가늘다)
    LB.tube(t, [P(-10, 0, 0.5), P(-4, 0, 1.2), P(3, 0, 1.8), P(9, 0, 1.6)], tt => s * (2.4 + Math.sin(tt * Math.PI * 0.9) * 2.4), body);
    // 목: 가슴에서 솟아 앞으로 굽는다
    const nu = o.neckUp != null ? o.neckUp : (fly ? 2 : 14);
    const neck = [P(8, 0, 2), P(12, 0, 2 + nu * 0.45), P(15, 0, 2 + nu * 0.9), P(19, 0, 2 + nu), P(23, 0, 1 + nu * 0.85)];
    LB.tube(t, neck, tt => s * (2.6 - tt * 1.2), body);
    // 머리: 길쭉한 주둥이와 아래턱, 뒤로 뻗은 뿔
    const hd = neck[neck.length - 1], hdir = (o.dir || 0) + (o.headDir || 0), hc = Math.cos(hdir), hs = Math.sin(hdir), hp = o.headPitch != null ? o.headPitch : -0.35;
    const HP = (f, r, u) => [hd[0] + (f * hc - r * hs) * s, hd[1] + (u + f * hp) * s, hd[2] + (f * hs + r * hc) * s];
    LB.tube(t, [HP(-1, 0, 0.6), HP(2, 0, 0.3), HP(5, 0, -0.2), HP(7.5, 0, -0.6)], tt => s * (2.2 - tt * 1.3), m.body);
    LB.tube(t, [HP(0, 0, -1.4), HP(3.5, 0, -2.2), HP(6.8, 0, -2.4)], tt => s * (1.2 - tt * 0.5), m.belly || m.body);
    for (const side of [-1, 1]) {
      LB.tube(t, [HP(-0.5, side * 1.3, 1.2), HP(-3.5, side * 2.4, 2.8), HP(-6.5, side * 2.8, 3.4), HP(-8, side * 2.6, 2.6)], tt => s * (0.8 - tt * 0.55), m.horn || m.bone);
      if (m.eye) { const e = HP(3, side * 1.45, 0.8); t.set(Math.round(e[0]), Math.round(e[1]), Math.round(e[2]), m.eye); }
    }
    // 꼬리
    const tail = fly ? [P(-10, 0, 0.5), P(-17, 0, 0), P(-24, 1.5, 0.5), P(-31, 3, 1.5)] : (o.tail || [P(-10, 0, 0), P(-17, 3, -1.5), P(-23, 8, -2.5), P(-27, 14, -2.5), P(-29, 20, -2)]);
    LB.tube(t, tail, tt => s * (2.4 - tt * 2.0), body);
    // 등줄기 가시
    if (m.spike) { const C2 = LB.curve([neck[3], neck[1], P(9, 0, 1.6), P(0, 0, 1.6), P(-10, 0, 0.5), tail[1], tail[2]], 2.2 * s); C2.forEach((p, i) => { const h = Math.max(1, Math.round((2.6 - Math.abs(i - C2.length * 0.45) / C2.length * 3) * s)); for (let k = 0; k < h; k++) t.set(Math.round(p[0]), Math.round(p[1] + 2.2 * s + k), Math.round(p[2]), m.spike); }); }
    // 다리
    if (!fly) for (const [f, side] of [[6, -1], [6, 1], [-6, -1], [-6, 1]]) LB.tube(t, [P(f, side * 2.6, 0), P(f + 1.5, side * 4.2, -2.5), P(f + 2.5, side * 4.6, -5.5), P(f + 4, side * 4.8, -6)], tt => s * (1.5 - tt * 0.6), m.body);
    // 날개: 어깨→팔꿈치→손목, 손목에서 손가락 넷, 손가락 사이와 몸 쪽은 막
    const up = o.wingUp != null ? o.wingUp : (fly ? 4 : 12), sp = o.span || 26, torn = o.torn != null ? o.torn : 0.35;
    for (const side of [-1, 1]) {
      const S = P(5, side * 3, 3), E = P(2, side * sp * 0.36, 4 + up * 0.55), Wr = P(-1, side * sp * 0.56, 4 + up);
      const T = [P(1, side * sp * 1.0, 4 + up * 1.05), P(-7, side * sp * 0.96, 4 + up * 0.78), P(-13, side * sp * 0.82, 4 + up * 0.48), P(-17, side * sp * 0.58, 4 + up * 0.2)];
      const Hip = P(-7, side * 2.6, 2);
      LB.tube(t, [S, E, Wr], tt => s * (1.35 - tt * 0.45), m.bone);
      T.forEach(tip => LB.tube(t, [Wr, LB.lerp3(Wr, tip, 0.55), tip], tt => s * (0.8 - tt * 0.5), m.bone));
      const tear = (x, y, z, u, v) => (u + v > 0.78) && hash3(x, y * 3, z) < torn;
      LB.tri(t, Wr, T[0], T[1], m.wing, tear); LB.tri(t, Wr, T[1], T[2], m.wing, tear); LB.tri(t, Wr, T[2], T[3], m.wing, tear);
      LB.tri(t, Wr, T[3], Hip, m.wing, (x, y, z, u, v) => u > 0.7 && hash3(x, y, z) < torn * 0.6);
      LB.tri(t, S, Wr, Hip, m.wing);
    }
    return { head: HP(5, 0, 0), chest: P(6, 0, -1), tail: tail[tail.length - 1] };
  };
})();
