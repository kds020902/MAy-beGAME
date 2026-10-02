// o-kit.js — 오라리오(던전에서 만남을 추구하면 안 되는 걸까 팬 지도)용 도구: 공통 재질, 도시 집 채우기, 마석등, 철책, 분수, 장미, 완만한 박공지붕
(function () {
  'use strict';
  const { hash3 } = VX;
  const OR = window.OR = {};

  // 오라리오 공통 재질(지도마다 Object.assign으로 덧붙여 쓴다)
  OR.blocks = () => ({
    pave: { c: '#a89c88', top: '#c4b8a2', v: 0.05, pat: 'stone' }, paveL: { c: '#c8bea8', top: '#dcd2bc', v: 0.04, pat: 'check', alt: '#d2c8b2' },
    brick: { c: '#9a6a4e', top: '#b88462', v: 0.06, pat: 'brick' }, curb: { c: '#8a8072', top: '#a0968a', v: 0.04 },
    grass: { c: '#5a6a3a', top: '#7a9a4a', v: 0.1 }, soil: { c: '#6a5440', v: 0.08 }, rock: { c: '#7a746c', v: 0.06, pat: 'stone' },
    hedge: { c: '#3e5a2e', top: '#56763a', v: 0.1 }, leaf: { c: '#4a7a36', top: '#6a9a44', v: 0.1 }, leaf2: { c: '#3a6a2e', v: 0.1 }, leafL: { c: '#7aa04a', top: '#9ac05a', v: 0.1 }, bark: { c: '#5a4632', v: 0.06 },
    plaster: { c: '#ece4d4', v: 0.03 }, plaster2: { c: '#ddd2bc', v: 0.03 }, timber: { c: '#5a4030', v: 0.04 }, timberDk: { c: '#3e2c22', v: 0.04 },
    stoneW: { c: '#d4cab4', v: 0.04, pat: 'big' }, stoneW2: { c: '#bcb098', v: 0.04, pat: 'brick' }, stoneG: { c: '#9a948c', v: 0.05, pat: 'stone' }, trimW: { c: '#f0eadc', v: 0.02 },
    roofR: { c: '#b8583a', v: 0.05, pat: 'tile' }, roofO: { c: '#c8763e', v: 0.05, pat: 'tile' }, roofB: { c: '#8a5a3e', v: 0.05, pat: 'tile' }, roofP: { c: '#6a5a78', v: 0.05, pat: 'tile' }, roofDk: { c: '#5a3a2a', v: 0.04 },
    chimney: { c: '#8a6a58', v: 0.05, pat: 'brick' },
    win: { c: '#ffd890', night: true, day: '#4e5c6a' }, door: { c: '#6a4a30', v: 0.04, pat: 'plank' }, shutter: { c: '#4a6a5a', v: 0.04 },
    iron: { c: '#2e2e34', v: 0.03 }, ironW: { c: '#ecebe6', v: 0.02 }, mlamp: { c: '#fff0c0', night: true, day: '#e8e2cc' },
    flowerR: { c: '#d83a4a', v: 0.08 }, flowerP: { c: '#9a5ab8', v: 0.08 }, flowerY: { c: '#f0c84a', v: 0.08 }, flowerW: { c: '#f4f0e8', v: 0.05 }, rose: { c: '#c8203a', v: 0.06 }, roseP: { c: '#f07890', v: 0.05 },
    awnR: { c: '#c84a3a', v: 0.03 }, awnW: { c: '#f2ece0', v: 0.02 }, cloth: { c: '#b03a3a', v: 0.03 }, gold: { c: '#d8b048', v: 0.04 },
  });

  // 도시 집: 회반죽+목골, 돌벽, 연한 회반죽 중 하나. 지붕은 붉은·주황·갈색·보라 기와
  OR.house = function (w, B, o) {
    const k = o.kind != null ? o.kind : (hash3(o.x, 3, o.z) * 3 | 0);
    const roofs = [B.roofR, B.roofO, B.roofB, B.roofR, B.roofP];
    const roof = o.roofB || roofs[(hash3(o.x, 5, o.z) * roofs.length) | 0];
    const m = k === 0 ? { found: B.stoneG, wall: B.plaster, frame: B.timber, win: B.win, sill: B.timberDk, door: B.door, roof, eave: B.roofDk, ridge: B.roofDk, chimney: B.chimney }
      : k === 1 ? { found: B.stoneG, wall: B.stoneW, frame: B.stoneW2, win: B.win, sill: B.trimW, door: B.door, roof, eave: B.roofDk, ridge: B.roofDk, chimney: B.chimney, quoin: B.trimW }
      : { found: B.stoneG, wall: B.plaster2, frame: B.timberDk, win: B.win, sill: B.timber, door: B.door, roof, eave: B.roofDk, ridge: B.roofDk, chimney: B.chimney, shutter: B.shutter };
    return MH.houseX(w, Object.assign({ floors: 2, fh: 6, pitch: 1, studs: k !== 1, dormers: o.sx > 9 && k !== 1 ? 1 : 0, m }, o));
  };

  // 도시 채우기: [x0,z0]~[x1,z1] 안에서 ok(x,z)인 자리에 집을 촘촘히 놓는다. face(x,z)는 길 쪽 방향
  // o = { x0,z0,x1,z1, ok, face, tries, gap, min, max, floors:[a,b], y }
  OR.fill = function (w, B, o) {
    const placed = o.placed || [], g = o.gap != null ? o.gap : 2;
    for (let i = 0; i < (o.tries || 400); i++) {
      const sx = w.ri(o.min || 7, o.max || 12), sz = w.ri(o.min || 7, o.max || 11);
      const x = w.ri(o.x0, o.x1 - sx), z = w.ri(o.z0, o.z1 - sz);
      const pts = [[x - 1, z - 1], [x + sx, z - 1], [x - 1, z + sz], [x + sx, z + sz], [x + (sx >> 1), z + (sz >> 1)], [x + (sx >> 1), z - 1], [x + (sx >> 1), z + sz], [x - 1, z + (sz >> 1)], [x + sx, z + (sz >> 1)]];
      if (!pts.every(([px, pz]) => o.ok(px, pz))) continue;
      if (placed.some(([a0, b0, a1, b1]) => x < a1 + g && x + sx > a0 - g && z < b1 + g && z + sz > b0 - g)) continue;
      const fl = w.ri(...(o.floors || [2, 3]));
      const h = OR.house(w, B, { x, z, sx, sz, floors: fl, face: o.face ? o.face(x + sx / 2, z + sz / 2) : 's', y: o.y ? o.y(x, z) : undefined, axis: sx >= sz ? 'x' : 'z' });
      placed.push([x, z, x + sx, z + sz, h]);
    }
    return placed;
  };

  // 마석등: 돌받침 위 쇠기둥, 밤에 빛나는 마석 등불과 갓
  OR.lamp = function (w, B, x, z, h) {
    const y = MH.g(w, x, z) + 1; h = h || 5;
    w.set(x, y, z, B.stoneG);
    w.box(x, y + 1, z, x, y + h, z, B.iron);
    w.set(x, y + h + 1, z, B.mlamp);
    w.set(x, y + h + 2, z, B.iron);
    return [x + 0.5, y + h + 1.5, z + 0.5];
  };

  // 철책: 꺾은선(가로·세로 구간)을 따라 기둥, 창살, 위아래 가로대, 기둥 끝 장식
  OR.fence = function (w, pts, h, bar, post, finial, skip) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1], n = Math.max(Math.abs(bx - ax), Math.abs(bz - az));
      for (let s = 0; s <= n; s++) {
        const x = Math.round(ax + (bx - ax) * s / n), z = Math.round(az + (bz - az) * s / n);
        if (skip && skip(x, z)) continue;
        const y = MH.g(w, x, z) + 1, isPost = s % 6 === 0;
        if (isPost) { w.box(x, y, z, x, y + h, z, post); w.set(x, y + h + 1, z, finial || post); }
        else { w.box(x, y, z, x, y + h - 1, z, bar); w.set(x, y + h, z, (s & 1) ? bar : 0); w.set(x, y + 1, z, post); w.set(x, y + h - 1, z, post); }
      }
    }
  };

  // 둥근 분수: 돌 테두리, 물(액체), 가운데 기둥과 받침 접시. 물줄기가 나올 자리를 돌려준다
  OR.fountain = function (w, x, z, r, rim, inner, opts) {
    const o = opts || {}, g = MH.g(w, x, z), R = Math.ceil(r) + 1;
    for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
      const d = Math.hypot(dx, dz);
      if (d > r + 0.5) continue;
      if (d > r - 1) { w.box(x + dx, g + 1, z + dz, x + dx, g + 2, z + dz, rim); continue; }
      MH.setH(w, x + dx, z + dz, g, inner, inner); w.set(x + dx, g + 1, z + dz, 0); w.liquid(x + dx, z + dz, g + 1);
    }
    const ph = o.h || 5;
    w.box(x, g + 1, z, x, g + ph, z, rim);
    w.cyl(x, z, g + ph + 1, g + ph + 1, o.bowl || 1.8, rim);
    if (o.top) w.set(x, g + ph + 2, z, o.top);
    return [x + 0.5, g + ph + 2.5, z + 0.5];
  };

  // 장미 덤불: 잎 덩어리에 꽃 점
  OR.rose = function (w, B, x, y, z, r, c2) {
    MH.leafBlob(w, x, y + Math.round(r * 0.5), z, r, r * 0.75, r, [B.hedge, B.leaf2, B.hedge]);
    const R = Math.ceil(r);
    for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) for (let dy = 0; dy <= R + 1; dy++) {
      const yy = y + dy, xx = x + dx, zz = z + dz;
      if (w.get(xx, yy, zz) && !w.get(xx, yy + 1, zz) && hash3(xx, yy, zz) > 0.55) w.set(xx, yy, zz, hash3(xx, yy + 3, zz) > 0.7 ? (c2 || B.roseP) : B.rose);
    }
  };

  // 완만한 박공지붕: run칸마다 한 칸 오른다(기본 2). axis는 용마루 방향. gable이면 양 끝 박공벽을 채운다
  OR.gable = function (w, x0, x1, z0, z1, y, o) {
    const alongX = o.axis === 'x', a0 = alongX ? z0 : x0, a1 = alongX ? z1 : x1, l0 = alongX ? x0 : z0, l1 = alongX ? x1 : z1, run = o.run || 2;
    const put = (a, l, yy, b) => alongX ? w.set(l, yy, a, b) : w.set(a, yy, l, b);
    const mid = (a0 + a1) / 2;
    let peak = y;
    for (let a = a0; a <= a1; a++) {
      const d = Math.min(a - a0, a1 - a), hh = Math.floor(d / run);
      for (let l = l0; l <= l1; l++) put(a, l, y + hh, d === 0 ? (o.eave || o.b) : (Math.abs(a - mid) < 1 ? (o.ridge || o.b) : o.b));
      if (o.gable) for (let yy = y; yy < y + hh; yy++) for (const l of [l0 + 1, l1 - 1]) put(a, l, yy, o.gable);
      peak = Math.max(peak, y + hh);
    }
    return peak;
  };

  // 이정표: 나무 기둥에 화살표 판(끝은 금빛), 꼭대기 마석등. dir = [dx, dz]는 판이 가리키는 쪽
  OR.signpost = function (w, B, x, z, o) {
    o = o || {};
    const y = MH.g(w, x, z) + 1, h = o.h || 6, [ax, az] = o.dir || [1, 0];
    w.set(x, y - 1, z, B.stoneG);
    w.box(x, y, z, x, y + h, z, B.timber);
    for (let k = 0; k < (o.boards || 1); k++) {
      const yy = y + h - 1 - k * 2, sg = k % 2 ? -1 : 1;
      for (let s = 1; s <= 4; s++) w.set(x + ax * s * sg, yy, z + az * s * sg, s === 4 ? B.gold : (o.board || B.door));
    }
    w.set(x, y + h + 1, z, B.mlamp);
    return [x, y, z];
  };
  // 장소 이동 상호작용: 누르면 금빛이 번진 뒤 화면이 어두워지며 다른 지도(goto)로 넘어간다
  OR.goAct = function (o) {
    const [x, y, z] = o.at, h = o.h || 7;
    return {
      name: o.name, hint: o.hint, goto: o.goto, hit: o.hit || [x - 2, y, z - 2, x + 2, y + h, z + 2],
      run: async a => { a.burst([x + 0.5, y + h - 1, z + 0.5], { n: 34, colors: ['#ffe9a0', '#ffffff', '#ffd060'], speed: 2, up: 2, life: 1, gravity: -0.4, spread: 1.6 }); await a.wait(0.6); },
    };
  };

  // 나무(가로수·정원수)
  OR.tree = function (w, B, x, z, o) {
    o = o || {};
    const g = MH.g(w, x, z);
    return MH.tree(w, x, g + 1, z, { kind: 'oak', h: o.h || w.ri(6, 9), bark: B.bark, leaves: o.leaves || [B.leafL, B.leaf, B.leaf2], r: o.r || w.r(2.6, 3.6), spread: o.spread || 2.8, branches: 3 });
  };
})();
