// kit2.js — 밧줄·물길 검사·배·집 장식(귀돌, 발코니, 지붕창)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const MH = window.MH;

  // 밧줄 부품: 맨 위(yTop 칸 윗면)에 고정되어 아래로 len칸. A.rope(name, len, 새길이)로 늘이고 줄인다
  MH.rope = function (w, name, x, yTop, z, len, b) {
    const p = w.prop({ name, pivot: [x + 0.5, yTop + 1, z + 0.5] });
    p.box(x, yTop - len + 1, z, x, yTop, z, b);
    return p;
  };
  // 물길 검사: 절대 좌표 경로를 따라 반경 r 안이 모두 열린 물인지 확인하고, 막히면 경고를 남긴다
  MH.routeOK = function (w, pts, r, label) {
    const W = w.W, D = w.D;
    let bad = 0, first = null;
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1], n = Math.ceil(Math.hypot(bx - ax, bz - az) * 2);
      for (let s = 0; s <= n; s++) {
        const cx = ax + (bx - ax) * s / n, cz = az + (bz - az) * s / n;
        for (let dz = -r; dz <= r; dz++) for (let dx = -r; dx <= r; dx++) {
          if (dx * dx + dz * dz > r * r) continue;
          const x = Math.round(cx + dx), z = Math.round(cz + dz);
          if (x < 0 || z < 0 || x >= W || z >= D) continue;
          const lv = w.liq[x + W * z];
          let blocked = lv < 0;
          if (!blocked) for (let y = lv; y <= lv + 3; y++) if (w.get(x, y, z)) blocked = true;
          if (blocked) { bad++; if (!first) first = [x, z]; }
        }
      }
    }
    if (bad) (w.warn = w.warn || []).push(label + ': 물길이 막힘 ' + bad + '칸, 첫 위치 ' + first);
    return !bad;
  };
  // 절대 경로 → 부품 출발점 기준 상대 경로. 진행 방향으로 뱃머리(+x)를 돌린다
  MH.relPath = function (pts, heading0) {
    const out = [];
    let prev = heading0 || 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i][0] - pts[i - 1][0], dz = pts[i][1] - pts[i - 1][1];
      let a = Math.atan2(-dz, dx);
      while (a - prev > Math.PI) a -= Math.PI * 2;
      while (a - prev < -Math.PI) a += Math.PI * 2;
      prev = a;
      out.push([pts[i][0] - pts[0][0], 0, pts[i][1] - pts[0][1], a]);
    }
    return out;
  };
  // 배(뱃머리가 +x): 흘수선 아래 선체, 뱃전, 돛대와 돛. len 홀수 권장
  MH.ship = function (p, x, y, z, len, m, o) {
    o = o || {};
    const half = o.half || 2;
    for (let s = 0; s < len; s++) {
      const t = s / (len - 1), wd = Math.max(0, Math.round(half * Math.sin(Math.PI * Math.min(1, t * 1.6 + 0.12))));
      for (let k = -wd; k <= wd; k++) {
        p.set(x + s, y - 1, z + k, m.keel || m.hull);
        p.set(x + s, y, z + k, Math.abs(k) === wd ? m.hull : (m.deck || m.hull));
        if (Math.abs(k) === wd) p.set(x + s, y + 1, z + k, m.rail || m.hull);
      }
    }
    p.set(x + len, y + 1, z, m.rail || m.hull); p.set(x + len + 1, y + 2, z, m.rail || m.hull);
    if (m.mast) {
      const mx = x + Math.floor(len * 0.55), mh = o.mast || 10;
      p.box(mx, y + 1, z, mx, y + mh, z, m.mast);
      if (m.sail) { p.box(mx, y + 4, z - half - 1, mx, y + mh - 1, z + half + 1, m.sail); p.box(mx, y + 4, z, mx, y + mh - 1, z, m.mast); p.box(mx, y + mh - 1, z - half - 1, mx, y + mh - 1, z + half + 1, m.mast); }
      if (m.flag) p.box(mx - 2, y + mh, z, mx - 1, y + mh, z, m.flag);
    }
    if (m.cargo) { p.box(x + 1, y + 1, z - 1, x + 2, y + 1, z + 1, m.cargo); p.set(x + 1, y + 2, z, m.cargo); }
  };

  // 집 + 장식. o.m.quoin(귀돌), o.balcony(층 번호), o.dormers(개수)
  MH.houseX = function (w, o) {
    const h = MH.house(w, o), m = o.m, fh = o.fh || 5, face = o.face || 's';
    if (m.quoin) for (const [cx, cz] of [[h.x0, h.z0], [h.x1, h.z0], [h.x0, h.z1], [h.x1, h.z1]])
      for (let y = h.y + 1; y < h.y + 1 + fh; y++) if ((y - h.y) % 2) w.set(cx, y, cz, m.quoin);
    if (o.balcony) {
      const by = h.y + o.balcony * fh, ex = o.jetty ? 1 : 0;
      const mx = Math.floor((h.x0 + h.x1) / 2), mz = Math.floor((h.z0 + h.z1) / 2);
      const put = (a, d, y, b) => {
        if (face === 's') w.set(mx + a, y, h.z1 + ex + d, b); else if (face === 'n') w.set(mx + a, y, h.z0 - ex - d, b);
        else if (face === 'e') w.set(h.x1 + ex + d, y, mz + a, b); else w.set(h.x0 - ex - d, y, mz + a, b);
      };
      for (let a = -2; a <= 2; a++) { put(a, 1, by, m.frame || m.found); put(a, 2, by, m.frame || m.found); put(a, 2, by + 1, m.rail || m.frame || m.found); if (Math.abs(a) === 2) put(a, 1, by + 1, m.rail || m.frame || m.found); }
      put(0, 0, by + 1, m.door); put(0, 0, by + 2, m.door); put(0, 0, by + 3, m.win);
      if (m.flower) { put(-1, 2, by + 2, m.flower); put(1, 2, by + 2, m.flower); }
    }
    if (o.dormers && o.roof !== 'flat' && o.roof !== 'hip') {
      const alongX = o.axis ? o.axis === 'x' : o.sx >= o.sz, ex = o.jetty ? 1 : 0, p = o.pitch || 1;
      const l0 = alongX ? h.x0 : h.z0, l1 = alongX ? h.x1 : h.z1;
      for (let i = 1; i <= o.dormers; i++) {
        const l = Math.round(l0 + (l1 - l0) * i / (o.dormers + 1));
        for (const side of [-1, 1]) {
          const edge = alongX ? (side > 0 ? h.z1 + ex : h.z0 - ex) : (side > 0 ? h.x1 + ex : h.x0 - ex);
          for (let d = 0; d <= 2; d++) for (let a = -1; a <= 1; a++) for (let y = 0; y <= 2; y++) {
            const px = alongX ? l + a : edge - side * d, pz = alongX ? edge - side * d : l + a;
            w.set(px, h.top + p + y, pz, d === 0 && a === 0 && y < 2 ? m.win : (y === 2 ? (m.eave || m.roof) : (m.gable || m.wall)));
          }
          for (let d = -1; d <= 2; d++) { const px = alongX ? l : edge - side * d, pz = alongX ? edge - side * d : l; w.set(px, h.top + p + 3, pz, m.roof); }
        }
      }
    }
    return h;
  };

  // 계단 비탈: axis('z'|'x') 방향으로 a→b 칸을 따라 높이 ha→hb를 한 줄에 한 칸씩 잇는다.
  // c·half: 가로 중심과 반폭. 남는 줄은 층계참이 된다. 옆이 낮으면 축대를 쌓고 난간을 두른다.
  // o = { axis, c, half, a, b, ha, hb, step, edge, fill, rail, post, postGap, clear, onPost(x,y,z,k) }
  MH.flight = function (w, o) {
    const n = Math.abs(o.b - o.a), sg = Math.sign(o.b - o.a) || 1, dh = o.hb - o.ha;
    if (Math.abs(dh) > n) (w.warn = w.warn || []).push(`계단 ${o.name || ''}: ${n}줄에 높이 ${Math.abs(dh)}칸 — 한 줄에 두 칸 이상 오름`);
    const at = (u, v) => o.axis === 'x' ? [u, v] : [v, u];
    const rows = [];
    for (let k = 0; k <= n; k++) {
      const u = o.a + sg * k, h = Math.round(o.ha + dh * (n ? k / n : 1));
      rows.push(h);
      for (let v = o.c - o.half; v <= o.c + o.half; v++) {
        const [x, z] = at(u, v), side = Math.abs(v - o.c) === o.half;
        MH.setH(w, x, z, h, side && o.edge ? o.edge : o.step, o.fill || o.step);
        for (let y = h + 1; y <= h + (o.clear || 7); y++) w.set(x, y, z, 0);
      }
      for (const s of [-1, 1]) {
        const v = o.c + s * (o.half + 1), [x, z] = at(u, v), g = MH.g(w, x, z);
        // 옆이 계단과 같은 높이면 열어 두고, 낮아서 떨어질 곳에만 축대와 난간을 둔다
        if (g < 0 || g > h || h - g < 2) continue;
        MH.setH(w, x, z, h, o.edge || o.step, o.fill || o.step);
        if (o.rail) {
          const post = o.post && k % (o.postGap || 4) === 0;
          w.set(x, h + 1, z, post ? o.post : o.rail);
          if (post) { w.set(x, h + 2, z, o.post); if (o.onPost) o.onPost(x, h + 3, z, k); }
        }
      }
    }
    return rows;
  };
  // 비탈 자락: 사각 고원 둘레를 top에서 rate칸씩 낮아지는 경사로 메워 깎아지른 벽을 자연 비탈로 만든다
  // o = { R, rate, noise(x,z), surf(x,z,h), fill, skip(x,z) }
  MH.skirt = function (w, x0, z0, x1, z1, top, o) {
    const R = o.R || 10;
    for (let z = z0 - R; z <= z1 + R; z++) for (let x = x0 - R; x <= x1 + R; x++) {
      if (x >= x0 && x <= x1 && z >= z0 && z <= z1) continue;
      const d = Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(z0 - z, 0, z - z1));
      if (d > R) continue;
      const g = MH.g(w, x, z), h = Math.round(top - d * (o.rate || 1) - (o.noise ? o.noise(x, z) : 0));
      if (g < 0 || h <= g || (o.skip && o.skip(x, z))) continue;
      MH.setH(w, x, z, h, o.surf(x, z, h), o.fill);
    }
  };
  // 축대: 사각 영역 가장자리 중 바깥이 2칸 넘게 낮은 곳의 옆면을 석축으로 바르고 윗단에 갓돌을 얹는다
  MH.retain = function (w, x0, z0, x1, z1, b, cap) {
    for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
      if (x !== x0 && x !== x1 && z !== z0 && z !== z1) continue;
      const g = MH.g(w, x, z);
      let low = g;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz;
        if (nx >= x0 && nx <= x1 && nz >= z0 && nz <= z1) continue;
        const ng = MH.g(w, nx, nz);
        if (ng >= 0) low = Math.min(low, ng);
      }
      if (g - low < 2) continue;
      for (let y = low + 1; y < g; y++) if (w.get(x, y, z)) w.set(x, y, z, b);
      if (cap) w.set(x, g, z, cap);
    }
  };
})();
