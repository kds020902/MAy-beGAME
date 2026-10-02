// 태엽 공방가 — 두 단의 공방 거리, 대시계탑, 톱니 옹벽, 룬 동력로, 골렘 공방 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  // 톱니바퀴: plane 'xz' | 'xy' | 'yz'
  function gear(p, cx, cy, cz, r, plane, b, hub, thick) {
    const put = (u, v, blk) => { for (let t = 0; t < (thick || 1); t++) { if (plane === 'xz') p.set(cx + u, cy + t, cz + v, blk); else if (plane === 'xy') p.set(cx + u, cy + v, cz + t, blk); else p.set(cx + t, cy + u, cz + v, blk); } };
    const R = Math.ceil(r + 2), teeth = Math.max(6, Math.round(r * 1.6));
    for (let v = -R; v <= R; v++) for (let u = -R; u <= R; u++) {
      const d = Math.hypot(u, v), a = Math.atan2(v, u);
      if (d <= r + 1.2 && d > r && Math.cos(a * teeth) > 0.2) put(u, v, b);
      else if (d <= r && (d > r - 1.4 || Math.abs(u) < 0.6 || Math.abs(v) < 0.6 || Math.abs(Math.abs(u) - Math.abs(v)) < 0.6)) put(u, v, b);
      if (d < 1.6) put(u, v, hub || b);
    }
  }
  MAPS.push({
    id: 'cogspire', cat: 'magic', name: '태엽 공방가', en: 'Cogspire Works', color: '#d8a050', seed: 341, base: 22, time: 'day',
    desc: '룬 동력으로 톱니가 도는 기술자들의 거리. 대시계탑의 바늘은 아르카나의 시간을 정한다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '룬 기술자 길드'], ['명물', '정각마다 울리는 대시계'], ['주의', '푸른 룬선은 밟지 말 것']] },
    sky: ['#f0c890', '#6a5a80', '#ffd8a0'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.56], sun: ['#ffd8b0', 0.76, [0.5, 1, 0.45]],
    liquid: ['#0a3a4a', '#1a8aa0', '#a0ffff'], liqSpeed: 1, liqGlow: true,
    fog: { start: 0.76, floor: 12, depth: 10, haze: [24, 0.14, 5], hazeColor: '#d8a878' },
    camY: 14,
    particles: [{ n: 80, colors: ['#ffb040', '#ffe0a0'], mode: 'drift', speed: 0.5, y0: 26, y1: 70 }],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, grass: { c: '#4a3a30', top: '#6a7a4a', v: 0.1 },
      dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' }, found: { c: '#6a6264', v: 0.05, pat: 'stone' },
      brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' }, slate: { c: '#3a3a4a', v: 0.04, pat: 'tile' },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, copper: { c: '#b0683a', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      face: { c: '#f0e8d0', v: 0.02 }, hand: { c: '#1e1e24', v: 0 }, golem: { c: '#7a7068', v: 0.06, pat: 'big' }, golemDk: { c: '#5a524c', v: 0.05 }, door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, bell: { c: '#d8b050', v: 0.05 },
      win: { c: '#ffd890', night: true, day: '#8a9aa8' }, lamp: { c: '#ffe0a0', night: true, day: '#c8b890' },
      rune: { c: '#5affff', glow: true }, runeO: { c: '#ffb040', glow: true }, eye: { c: '#5affff', glow: true },
    },
    build(w) {
      const B = w.id, base = w.base, UP = base + 10, LO = base + 2, EDGE = 60;
      MH.terrain(w, {
        floor: 4, height: (x, z) => z < EDGE ? UP : LO,
        surface: (x, z) => ((x >> 3) + (z >> 3)) % 2 ? B.cob : B.plate, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock,
      });
      for (let x = 0; x < W; x++) { for (let y = LO + 1; y <= UP; y++) w.set(x, y, EDGE - 1, B.brickDk); w.set(x, UP + 1, EDGE - 1, x % 3 ? B.iron : B.brass); if (x % 6 === 0) w.box(x, LO + 1, EDGE, x, UP - 1, EDGE, B.found); }
      for (const sx of [20, 100]) { for (let s = 0; s < UP - LO; s++) { w.box(sx, UP - s, EDGE + s, sx + 7, UP - s, EDGE + s, B.found); MH.footing(w, sx, EDGE + s, sx + 7, EDGE + s, UP - s, B.brickDk); } w.box(sx, UP + 1, EDGE - 1, sx + 7, UP + 1, EDGE - 1, 0); }
      const lights = [], acts = [], steam = [], landmarks = [];
      // ── 대시계탑 ──
      const TX0 = 58, TZ0 = 28, TS = 12, ty = UP + 1, TH = 46;
      w.box(TX0 - 2, ty, TZ0 - 2, TX0 + TS + 2, ty + 3, TZ0 + TS + 2, B.found);
      w.box(TX0, ty, TZ0, TX0 + TS, ty + TH, TZ0 + TS, B.brick);
      for (const [cx, cz] of [[TX0, TZ0], [TX0 + TS, TZ0], [TX0, TZ0 + TS], [TX0 + TS, TZ0 + TS]]) w.box(cx, ty, cz, cx, ty + TH + 2, cz, B.brass);
      for (const y of [ty + 12, ty + 24, ty + 36]) w.walls(TX0 - 1, y, TZ0 - 1, TX0 + TS + 1, y, TZ0 + TS + 1, B.brassDk);
      for (let y = ty + 5; y < ty + 34; y += 6) for (const x of [TX0 + 3, TX0 + 9]) { w.box(x, y, TZ0 + TS, x, y + 2, TZ0 + TS, B.win); w.box(x, y, TZ0, x, y + 2, TZ0, B.win); }
      w.box(TX0 + 5, ty + 4, TZ0 + TS, TX0 + 7, ty + 9, TZ0 + TS, B.door); w.box(TX0 + 4, ty + 10, TZ0 + TS, TX0 + 8, ty + 10, TZ0 + TS, B.brass);
      for (let s = 0; s < 4; s++) w.box(TX0 + 3 - s, ty + 3 - s, TZ0 + TS + 3 + s, TX0 + 9 + s, ty + 3 - s, TZ0 + TS + 3 + s, B.found);
      const FCY = ty + 38, FCX = TX0 + 6, FZ = TZ0 + TS + 1;
      const faceAt = (plane, fixed) => { for (let v = -5; v <= 5; v++) for (let u = -5; u <= 5; u++) { const d = Math.hypot(u, v); if (d > 5.4) continue; const tick = d > 3.4 && d <= 4.4 && (Math.abs(u) < 0.6 || Math.abs(v) < 0.6 || Math.abs(Math.abs(u) - Math.abs(v)) < 0.6); const b = d > 4.4 ? B.brass : tick ? B.hand : B.face; if (plane === 'z') w.set(FCX + u, FCY + v, fixed, b); else w.set(fixed, FCY + v, TZ0 + 6 + u, b); } };
      faceAt('z', FZ); faceAt('z', TZ0 - 1); faceAt('x', TX0 - 1); faceAt('x', TX0 + TS + 1);
      w.box(FCX, FCY, TZ0 - 2, FCX, FCY + 3, TZ0 - 2, B.hand); w.box(TX0 - 2, FCY, TZ0 + 6, TX0 - 2, FCY, TZ0 + 9, B.hand); w.box(TX0 + TS + 2, FCY - 3, TZ0 + 6, TX0 + TS + 2, FCY, TZ0 + 6, B.hand);
      const hMin = w.prop({ name: 'hMin', pivot: [FCX + 0.5, FCY + 0.5, FZ + 1.5], axis: 'z', speed: -0.4 });
      hMin.box(FCX, FCY, FZ + 1, FCX, FCY + 4, FZ + 1, B.hand);
      const hHour = w.prop({ name: 'hHour', pivot: [FCX + 0.5, FCY + 0.5, FZ + 2.5], axis: 'z', speed: -0.034 });
      hHour.box(FCX, FCY, FZ + 2, FCX + 2, FCY, FZ + 2, B.brassDk); hHour.set(FCX, FCY, FZ + 2, B.brass);
      // 종루(속을 비움)와 지붕
      const by = ty + TH - 1;
      w.box(TX0 - 1, by + 1, TZ0 - 1, TX0 + TS + 1, by + 2, TZ0 + TS + 1, B.brassDk);
      for (const [cx, cz] of [[TX0, TZ0], [TX0 + TS, TZ0], [TX0, TZ0 + TS], [TX0 + TS, TZ0 + TS], [TX0 + 6, TZ0], [TX0 + 6, TZ0 + TS], [TX0, TZ0 + 6], [TX0 + TS, TZ0 + 6]]) w.box(cx, by + 3, cz, cx, by + 9, cz, B.brass);
      w.box(TX0, by + 10, TZ0, TX0 + TS, by + 10, TZ0 + TS, B.brassDk); w.box(TX0, by + 9, TZ0 + 6, TX0 + TS, by + 9, TZ0 + 6, B.iron);
      const cTop = MH.pyramid(w, TX0 - 1, TZ0 - 1, TX0 + TS + 1, TZ0 + TS + 1, by + 11, B.slate, 2, B.brass);
      w.box(FCX, cTop, TZ0 + 6, FCX, cTop + 5, TZ0 + 6, B.brass);
      const bell = w.prop({ name: 'bell', pivot: [FCX + 0.5, by + 9, TZ0 + 6.5], axis: 'x' });
      bell.box(FCX, by + 7, TZ0 + 6, FCX, by + 8, TZ0 + 6, B.iron); bell.ellipsoid(FCX, by + 5, TZ0 + 6, 2.6, 2.4, 2.6, B.bell, (dx, dy) => dy >= -2);
      w.set(FCX - 3, ty + 8, FZ, B.lamp); w.set(FCX + 3, ty + 8, FZ, B.lamp);
      lights.push({ p: [FCX + 0.5, ty + 8, FZ + 1], c: '#ffd890', i: 1.2, d: 16, flicker: 0.05, night: true });
      landmarks.push({ name: '대시계탑', note: '아르카나의 시간을 정하는 시계', p: [FCX + 0.5, cTop + 9, TZ0 + 6.5], tag: 'CLOCK' });
      // ── 톱니 옹벽: 맞물려 도는 큰 톱니 셋 ──
      const gears = [[44, 5.5, 0.4, B.brass], [56, 5.5, -0.4, B.copper], [68, 5.5, 0.4, B.brass], [80, 5.5, -0.4, B.copper], [36, 3.2, -0.69, B.brassDk]];
      gears.forEach(([gx, r, sp, b], k) => {
        const gyc = k === 4 ? LO + 5 : LO + 7;
        const g = w.prop({ name: 'gear' + k, pivot: [gx + 0.5, gyc + 0.5, EDGE + 2], axis: 'z', speed: sp });
        gear(g, gx, gyc, EDGE + 1, r, 'xy', b, B.ironDk, 2);
        w.set(gx, gyc, EDGE, B.ironDk);
      });
      acts.push({
        name: '대시계', hint: '바늘이 빠르게 돌고 종이 울리며 톱니가 빨라져요', hit: [FCX - 5, FCY - 5, FZ, FCX + 5, FCY + 5, FZ + 3],
        run: async a => {
          a.spin('hMin', 30, 4.2); a.spin('hHour', 30, 4.2); for (let k = 0; k < 5; k++) a.spin('gear' + k, 4, 4.2);
          for (let k = 0; k < 5; k++) { await a.turn('bell', [0.4, 0, 0], 0.4); a.burst([FCX + 0.5, by + 6, TZ0 + 6.5], { n: 18, colors: ['#ffe0a0', '#ffb040'], speed: 9, up: 1, life: 1.6, gravity: 0.5, spread: 4, flat: true }); await a.turn('bell', [-0.4, 0, 0], 0.4); }
          await a.turn('bell', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '톱니 옹벽', note: '맞물려 도는 다섯 톱니', p: [62.5, LO + 18, EDGE + 1] });
      // ── 룬 동력로(아랫단 서쪽) ──
      const RX = 30, RZ = 90, ry = LO;
      w.cyl(RX, RZ, ry + 1, ry + 1, 9.4, B.ironDk); w.ring(RX, RZ, ry + 2, 8.2, 9.4, B.iron); MH.circle(w, RX, RZ, 12, B.rune);
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.78, px = Math.round(RX + Math.cos(a) * 8.6), pz = Math.round(RZ + Math.sin(a) * 8.6); w.box(px, ry + 2, pz, px, ry + 12, pz, B.brass); w.box(px, ry + 13, pz, px, ry + 14, pz, B.rune); w.line(px, ry + 12, pz, RX + Math.cos(a) * 3, ry + 3, RZ + Math.sin(a) * 3, B.copper); }
      w.box(RX, ry + 2, RZ, RX, ry + 4, RZ, B.iron); w.sphere(RX, ry + 8, RZ, 3, B.rune);
      const rr = w.prop({ name: 'rr1', pivot: [RX + 0.5, ry + 8.5, RZ + 0.5], axis: 'y', speed: 0.9 }); MH.ringProp(rr, RX, ry + 8, RZ, 6.4, 'xz', B.copper, B.rune, 8);
      const rr2 = w.prop({ name: 'rr2', pivot: [RX + 0.5, ry + 8.5, RZ + 0.5], axis: 'y', speed: -0.6, clipOK: 2 }); MH.ringProp(rr2, RX, ry + 8, RZ, 4.8, 'xy', B.brass, B.runeO, 6);
      lights.push({ name: 'core', p: [RX + 0.5, ry + 9, RZ + 0.5], c: '#50f0ff', i: 2, d: 24, flicker: 0.1 });
      MH.path(w, [[RX + 10, RZ - 4], [50, 74], [62, EDGE + 3]], 0.7, B.rune); MH.path(w, [[RX + 12, RZ + 2], [70, 92], [84, 88]], 0.7, B.rune);
      acts.push({
        name: '룬 동력로', hint: '고리가 빨리 돌고 룬 핵이 눈부시게 빛나요', hit: [RX - 7, ry + 2, RZ - 7, RX + 7, ry + 15, RZ + 7],
        run: async a => { a.flash('core', 3, 4.5); a.glow(1.7, 4.5); a.spin('rr1', 6, 4.5); a.spin('rr2', 6, 4.5); for (let k = 0; k < 8; k++) { a.burst([RX + 0.5, ry + 8, RZ + 0.5], { n: 30, colors: ['#5affff', '#a0ffff', '#ffffff'], speed: 8, up: 2, life: 1.4, gravity: 0, spread: 2 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '룬 동력로', note: '고리 두 개가 도는 동력 핵', p: [RX + 0.5, ry + 22, RZ + 0.5] });
      // 냉각수 수로(동력로에서 남쪽 끝으로)
      for (let z = RZ + 10; z < D; z++) for (let x = RX - 1; x <= RX + 1; x++) { MH.setH(w, x, z, LO - 2, B.ironDk, B.rock); w.liquid(x, z, LO - 1); w.set(x, LO - 1, z, 0); w.set(x, LO, z, 0); }
      lights.push({ p: [RX + 0.5, LO + 1, 112], c: '#40d0e0', i: 1, d: 14, flicker: 0.1, liquid: true });
      // ── 골렘 공방(아랫단 동쪽)과 시험대의 골렘 ──
      const shop = MH.house(w, { x: 88, z: 72, sx: 24, sz: 16, floors: 2, fh: 7, face: 'w', pitch: 1, winGap: 4, y: LO, m: { found: B.found, wall: B.brick, frame: B.brass, win: B.win, door: B.door, roof: B.slate, eave: B.ironDk, ridge: B.brass, chimney: B.brickDk, lamp: B.lamp } });
      lights.push({ p: [shop.door[0] - 0.5, shop.door[1] + 3, shop.door[2] + 0.5], c: '#ffd890', i: 1, d: 12, flicker: 0.05, night: true });
      if (shop.chimney) steam.push({ n: 36, colors: ['#e8e0d8', '#b8b0a8'], mode: 'rise', speed: 0.7, area: [shop.chimney[0], shop.chimney[2], 0.8], y0: shop.chimney[1], y1: shop.chimney[1] + 22, glow: false });
      const GX = 72, GZ = 98, gy = LO + 1;
      w.box(GX - 5, gy, GZ - 3, GX + 5, gy, GZ + 3, B.ironDk);
      for (const x of [GX - 6, GX + 6]) { w.box(x, gy, GZ - 2, x, gy + 20, GZ - 2, B.iron); w.box(x, gy, GZ + 2, x, gy + 20, GZ + 2, B.iron); }
      w.box(GX - 6, gy + 20, GZ - 2, GX + 6, gy + 20, GZ - 2, B.iron);
      w.box(GX - 3, gy + 1, GZ - 1, GX - 1, gy + 6, GZ + 1, B.golem); w.box(GX + 1, gy + 1, GZ - 1, GX + 3, gy + 6, GZ + 1, B.golem);
      w.box(GX - 4, gy + 7, GZ - 2, GX + 4, gy + 14, GZ + 2, B.golem); w.box(GX - 4, gy + 10, GZ - 2, GX + 4, gy + 10, GZ + 2, B.golemDk);
      w.box(GX - 2, gy + 15, GZ - 1, GX + 2, gy + 18, GZ + 1, B.golem); w.box(GX - 1, gy + 17, GZ + 2, GX - 1, gy + 17, GZ + 2, B.eye); w.set(GX + 1, gy + 17, GZ + 2, B.eye);
      w.box(GX - 1, gy + 10, GZ + 3, GX + 1, gy + 12, GZ + 3, B.rune);
      w.box(GX - 7, gy + 8, GZ - 1, GX - 5, gy + 14, GZ + 1, B.golemDk);
      const arm = w.prop({ name: 'arm', pivot: [GX + 6, gy + 13, GZ + 0.5], axis: 'z' });
      arm.box(GX + 5, gy + 4, GZ - 1, GX + 7, gy + 14, GZ + 1, B.golemDk); arm.box(GX + 5, gy + 2, GZ - 1, GX + 7, gy + 3, GZ + 1, B.golem);
      lights.push({ name: 'golem', p: [GX + 0.5, gy + 17, GZ + 3.5], c: '#50f0ff', i: 0.9, d: 14, flicker: 0.1 });
      acts.push({
        name: '골렘 시동', hint: '눈에 불이 들어오고 팔을 들어 올려요', hit: [GX - 7, gy + 1, GZ - 2, GX + 7, gy + 19, GZ + 3],
        run: async a => {
          a.flash('golem', 5, 5);
          a.burst([GX + 0.5, gy + 12, GZ + 3], { n: 30, colors: ['#ffffff', '#d8d0c8'], speed: 5, up: 3, life: 1.4, gravity: -0.5, spread: 3 });
          await a.turn('arm', [0, 0, 1.7], 1.6); await a.wait(0.5);
          await a.turn('arm', [0, 0, 0.9], 0.5); await a.turn('arm', [0, 0, 1.7], 0.5); await a.wait(0.6);
          await a.turn('arm', [0, 0, 0], 1.4);
          a.burst([GX + 6, gy + 2, GZ + 0.5], { n: 20, colors: ['#d8d0c8', '#8a8078'], speed: 4, up: 1, life: 0.9, gravity: 3, spread: 2, flat: true });
        },
      });
      landmarks.push({ name: '골렘 공방', note: '시험대에 선 작업용 골렘', p: [GX + 0.5, gy + 27, GZ + 0.5] });
      // ── 기술자 집, 구리 관, 증기 ──
      const hm = k => ({ found: B.found, wall: k % 2 ? B.brickDk : B.brick, frame: B.brass, quoin: B.found, win: B.win, sill: B.brassDk, door: B.door, roof: B.slate, eave: B.ironDk, ridge: B.copper, chimney: B.iron, lamp: B.lamp });
      [[10, 12, 12, 9, 's', UP], [30, 10, 11, 9, 's', UP], [86, 12, 12, 9, 's', UP], [106, 10, 11, 10, 's', UP], [10, 38, 10, 9, 'e', UP], [104, 36, 11, 9, 'w', UP], [8, 68, 10, 9, 'e', LO], [52, 104, 11, 9, 'n', LO]].forEach(([x, z, sx, sz, face, y], k) => {
        const h = MH.houseX(w, { x, z, sx, sz, floors: 2 + (k % 2), fh: 6, face, pitch: 1, dormers: k % 3 === 0 ? 1 : 0, y, m: hm(k) });
        if (k % 2 === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.05, night: true });
        if (h.chimney && steam.length < 4) steam.push({ n: 22, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 0.6, area: [h.chimney[0], h.chimney[2], 0.6], y0: h.chimney[1], y1: h.chimney[1] + 18, glow: false });
      });
      // 관 받침대와 구리 관(탑 → 공방)
      for (const px of [76, 84]) { w.box(px, UP + 1, 50, px, UP + 12, 50, B.iron); w.box(px - 1, UP + 12, 50, px + 1, UP + 12, 50, B.iron); }
      w.line(TX0 + TS, UP + 13, 40, 76, UP + 13, 50, B.copper, 0.7); w.line(76, UP + 13, 50, 84, UP + 13, 50, B.copper, 0.7); w.line(84, UP + 13, 50, 96, LO + 14, 72, B.copper, 0.7);
      for (const [lx, lz, y] of [[44, 50, UP], [84, 56, UP], [50, 78, LO], [70, 78, LO], [96, 100, LO]]) if (!w.get(lx, y + 1, lz)) lights.push({ p: MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 6 }), c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      return { lights, landmarks, acts, particles: steam };
    },
  });
})();
