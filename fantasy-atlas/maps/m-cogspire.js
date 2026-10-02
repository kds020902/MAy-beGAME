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
      hot: { c: '#ff6a20', glow: true }, note: { c: '#ff8ad0', glow: true }, canvas: { c: '#d8c8a0', v: 0.05 }, canvasDk: { c: '#a89870', v: 0.05 }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' },
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
      // ── 증기 해머(아랫단 남쪽): 해머(부품)가 달군 쇠를 내리친다 ──
      const HX = 100, HZ = 108, hy = LO + 1;
      for (const x of [HX - 3, HX + 3]) w.box(x, hy, HZ, x, hy + 14, HZ, B.iron);
      w.box(HX - 3, hy + 14, HZ - 1, HX + 3, hy + 14, HZ + 1, B.ironDk); w.box(HX - 1, hy + 15, HZ - 1, HX + 1, hy + 16, HZ + 1, B.copper); w.set(HX, hy + 17, HZ, B.iron);
      w.box(HX - 1, hy, HZ - 1, HX + 1, hy + 1, HZ + 1, B.ironDk); w.box(HX - 2, hy, HZ - 2, HX + 2, hy, HZ + 2, B.found); w.box(HX - 1, hy + 2, HZ, HX + 1, hy + 2, HZ, B.hot);
      const ham = w.prop({ name: 'hammer', pivot: [HX + 0.5, hy + 9, HZ + 0.5] });
      ham.box(HX - 2, hy + 7, HZ - 1, HX + 2, hy + 9, HZ + 1, B.iron); ham.box(HX - 2, hy + 7, HZ - 1, HX + 2, hy + 7, HZ + 1, B.ironDk); ham.box(HX, hy + 10, HZ, HX, hy + 13, HZ, B.brass);
      lights.push({ name: 'forge', p: [HX + 0.5, hy + 3, HZ + 0.5], c: '#ff8a30', i: 1.4, d: 16, flicker: 0.3 });
      steam.push({ n: 18, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 0.6, area: [HX + 0.5, HZ + 0.5, 0.5], y0: hy + 18, y1: hy + 32, glow: false });
      acts.push({
        name: '증기 해머', hint: '증기 해머가 쾅쾅 내리치며 불꽃이 튀어요', hit: [HX - 4, hy, HZ - 2, HX + 4, hy + 17, HZ + 2],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.move('hammer', [0, -4, 0], 0.22, t => t * t);
            a.flash('forge', 4, 0.3);
            a.burst([HX + 0.5, hy + 3, HZ + 0.5], { n: 40, colors: ['#ffb040', '#ffe0a0', '#ff6a20'], speed: 10, up: 4, life: 0.9, gravity: 12, spread: 1 });
            a.burst([HX + 0.5, hy + 17, HZ + 0.5], { n: 14, colors: ['#ffffff', '#d8d0c8'], speed: 2, up: 5, life: 1.4, gravity: -0.5, spread: 1 });
            await a.wait(0.12); await a.move('hammer', [0, 0, 0], 0.55);
          }
        },
      });
      landmarks.push({ name: '증기 해머', note: '달군 쇠를 두드리는 대장간', p: [HX + 0.5, hy + 22, HZ + 0.5] });
      // ── 화물 승강기(옹벽 동쪽): 발판(부품)이 아랫단과 윗단을 오간다 ──
      const LX0 = 111, LX1 = 115, LZ0 = 61, LZ1 = 64, lift = UP - LO, RX0 = 113;
      for (const x of [LX0 - 1, LX1 + 1]) { w.box(x, LO + 1, 63, x, UP + 6, 63, B.iron); w.box(x, LO + 1, 62, x, UP + 6, 62, B.brassDk); }
      w.box(LX0 - 1, UP + 6, 62, LX1 + 1, UP + 6, 63, B.ironDk); w.set(RX0, UP + 7, 63, B.brass);
      const plat = w.prop({ name: 'lift' });
      plat.box(LX0, LO + 1, LZ0, LX1, LO + 1, LZ1, B.plank); plat.box(LX0, LO + 2, LZ1, LX1, LO + 2, LZ1, B.iron);
      plat.box(LX0, LO + 2, LZ0, LX0 + 1, LO + 3, LZ0 + 1, B.plank); plat.set(LX1, LO + 2, LZ0, B.copper); plat.set(LX1, LO + 3, LZ0, B.brass);
      MH.rope(w, 'liftRope', RX0, UP + 5, 63, UP + 5 - (LO + 2) + 1, B.ironDk);
      acts.push({
        name: '화물 승강기', hint: '짐을 실은 발판이 옹벽을 따라 윗단까지 올라갔다 내려와요', hit: [LX0 - 2, LO + 1, LZ0 - 1, LX1 + 2, UP + 7, LZ1 + 1],
        run: async a => {
          const L0 = UP + 5 - (LO + 2) + 1;
          a.burst([RX0, LO + 2, 63], { n: 20, colors: ['#ffffff', '#d8d0c8'], speed: 3, up: 2, life: 1, gravity: -0.5, spread: 2 });
          a.rope('liftRope', L0, L0 - lift, 2.6); await a.move('lift', [0, lift, 0], 2.6);
          a.burst([RX0, UP + 2, 63], { n: 24, colors: ['#ffe0a0', '#ffb040'], speed: 4, up: 1, life: 0.8, gravity: 4, spread: 2, flat: true });
          await a.wait(1.4);
          a.rope('liftRope', L0, L0, 2.4); await a.move('lift', [0, 0, 0], 2.4);
        },
      });
      // ── 비행선(윗단 서쪽 계류탑): 탑을 한 바퀴 돌고 돌아온다(부품) ──
      const MX = 40, MZ = 36;
      w.box(MX, UP + 1, MZ, MX, UP + 17, MZ, B.iron); w.box(MX - 1, UP + 1, MZ - 1, MX + 1, UP + 2, MZ + 1, B.found); w.box(MX - 1, UP + 17, MZ, MX + 1, UP + 17, MZ, B.brass); w.set(MX, UP + 18, MZ, B.runeO);
      const ship = w.prop({ name: 'airship', pivot: [MX - 6.5, UP + 15.5, MZ + 0.5] });
      ship.ellipsoid(MX - 7, UP + 16, MZ, 6, 3.2, 3.2, B.canvas);
      for (const dx of [-4, 0, 4]) ship.ellipsoid(MX - 7 + dx, UP + 16, MZ, 0.6, 3.3, 3.3, B.canvasDk);
      ship.box(MX - 13, UP + 15, MZ, MX - 12, UP + 20, MZ, B.copper); ship.box(MX - 13, UP + 16, MZ - 3, MX - 12, UP + 16, MZ + 3, B.copper);
      ship.box(MX - 9, UP + 11, MZ - 1, MX - 5, UP + 12, MZ + 1, B.brass); ship.box(MX - 8, UP + 12, MZ, MX - 6, UP + 12, MZ, B.win);
      ship.box(MX - 8, UP + 13, MZ, MX - 8, UP + 13, MZ, B.iron); ship.box(MX - 6, UP + 13, MZ, MX - 6, UP + 13, MZ, B.iron); ship.box(MX - 10, UP + 11, MZ, MX - 10, UP + 12, MZ, B.runeO);
      const air = [[MX - 7, MZ], [50, 58], [84, 60], [94, 34], [84, 10], [46, 8], [32, 22], [MX - 7, MZ]];
      const shipPts = [[0, 6, 0, 0]].concat(MH.relPath(air, 0).map(q => [q[0], 18, q[2], q[3]]));
      shipPts.push([0, 0, 0, shipPts[shipPts.length - 1][3]]);
      acts.push({
        name: '비행선', hint: '계류탑의 비행선이 떠올라 시계탑을 한 바퀴 돌고 와요', hit: [MX - 14, UP + 10, MZ - 4, MX + 1, UP + 20, MZ + 4],
        run: async a => {
          a.burst([MX - 7, UP + 10, MZ + 0.5], { n: 30, colors: ['#ffffff', '#e8e0d8'], speed: 3, up: 2, life: 1.4, gravity: -0.3, spread: 3 });
          await a.path('airship', shipPts, 14);
          a.unwind('airship'); await a.turn('airship', [0, 0, 0], 0.8);
          a.burst([MX, UP + 18, MZ + 0.5], { n: 20, colors: ['#ffb040', '#ffe0a0'], speed: 3, up: 2, life: 1, gravity: 2, spread: 1 });
        },
      });
      landmarks.push({ name: '비행선 계류탑', note: '시계탑을 도는 유람 비행선', p: [MX - 6.5, UP + 26, MZ + 0.5] });
      // ── 태엽 오르골(아랫단 남쪽): 핀 박힌 원통(부품)이 돌며 음표가 튄다 ──
      const OX = 70, OZ = 114, oy = LO + 1;
      w.box(OX - 1, oy, OZ - 3, OX + 11, oy + 2, OZ + 3, B.brassDk); w.box(OX - 1, oy + 3, OZ - 3, OX + 11, oy + 3, OZ + 3, B.brass);
      for (const x of [OX - 1, OX + 11]) w.box(x, oy + 4, OZ, x, oy + 7, OZ, B.brass);
      for (let x = OX + 1; x <= OX + 9; x++) w.box(x, oy + 4, OZ - 3, x, oy + 4 + (x % 3), OZ - 3, B.iron);
      const drum = w.prop({ name: 'drum', pivot: [OX + 5.5, oy + 7.5, OZ + 0.5], axis: 'x', speed: 0.5 });
      for (let x = OX; x <= OX + 10; x++) for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const d = Math.hypot(u, v); if (d <= 2.4) drum.set(x, oy + 7 + v, OZ + u, x === OX || x === OX + 10 ? B.copper : B.brass); else if (d <= 3.2 && hash3(x, u + 9, v + 9) > 0.8 && x > OX && x < OX + 10) drum.set(x, oy + 7 + v, OZ + u, B.runeO); }
      const mstar = w.prop({ name: 'mstar', pivot: [OX + 5.5, oy + 12, OZ + 0.5], axis: 'y', speed: 0.8 });
      mstar.box(OX + 5, oy + 11, OZ, OX + 5, oy + 14, OZ, B.brass); mstar.box(OX + 3, oy + 13, OZ, OX + 7, oy + 13, OZ, B.note); mstar.box(OX + 5, oy + 13, OZ - 2, OX + 5, oy + 13, OZ + 2, B.rune);
      w.box(OX + 5, oy + 10, OZ, OX + 5, oy + 10, OZ, B.brass);
      lights.push({ name: 'mbox', p: [OX + 5.5, oy + 13, OZ + 0.5], c: '#ffb0e0', i: 1.2, d: 14, flicker: 0.1 });
      acts.push({
        name: '태엽 오르골', hint: '거대한 오르골의 원통이 돌며 음표가 춤추듯 튀어나와요', hit: [OX - 1, oy, OZ - 4, OX + 11, oy + 14, OZ + 4],
        run: async a => {
          a.flash('mbox', 3, 6); a.spin('drum', 5, 6); a.spin('mstar', 6, 6);
          for (let k = 0; k < 12; k++) { a.burst([OX + 1 + (k * 7) % 10, oy + 11, OZ - 2], { n: 8, colors: [['#ff8ad0', '#ffffff'], ['#5affff', '#ffffff'], ['#ffb040', '#ffe0a0']][k % 3], speed: 2, up: 5, life: 1.8, gravity: 1, spread: 0.6 }); await a.wait(0.45); }
        },
      });
      landmarks.push({ name: '태엽 오르골', note: '광장의 거대한 오르골', p: [OX + 5.5, oy + 20, OZ + 0.5] });
      // ── 증기 크레인(아랫단 남동쪽): 팔(부품)이 돌며 짐을 옮긴다 ──
      const KX = 104, KZ = 96, ky = LO + 1;
      w.box(KX - 1, ky, KZ - 1, KX + 1, ky + 1, KZ + 1, B.found);
      for (let y = ky + 2; y <= ky + 15; y++) { w.set(KX, y, KZ, B.iron); if (y % 4 === 0) { w.set(KX - 1, y, KZ, B.brassDk); w.set(KX + 1, y, KZ, B.brassDk); w.set(KX, y, KZ - 1, B.brassDk); w.set(KX, y, KZ + 1, B.brassDk); } }
      const jib = w.prop({ name: 'jib', pivot: [KX + 0.5, ky + 16, KZ + 0.5], axis: 'y' });
      jib.box(KX - 1, ky + 16, KZ - 1, KX + 1, ky + 18, KZ + 1, B.copper); jib.set(KX, ky + 19, KZ, B.iron);
      jib.box(KX - 6, ky + 17, KZ, KX + 9, ky + 17, KZ, B.brass); jib.box(KX - 6, ky + 15, KZ - 1, KX - 4, ky + 16, KZ + 1, B.ironDk);
      jib.box(KX + 8, ky + 9, KZ, KX + 8, ky + 16, KZ, B.ironDk); jib.box(KX + 7, ky + 6, KZ - 1, KX + 9, ky + 8, KZ + 1, B.plank); jib.set(KX + 8, ky + 8, KZ, B.copper);
      acts.push({
        name: '증기 크레인', hint: '크레인 팔이 돌아 짐을 옮겼다가 제자리로 돌아와요', hit: [KX - 2, ky, KZ - 2, KX + 10, ky + 19, KZ + 2],
        run: async a => {
          a.burst([KX + 0.5, ky + 20, KZ + 0.5], { n: 24, colors: ['#ffffff', '#d8d0c8'], speed: 2, up: 5, life: 1.6, gravity: -0.5, spread: 1 });
          await a.turn('jib', [0, -1.57, 0], 2.4);
          a.burst([KX + 0.5, ky + 6, KZ + 8.5], { n: 20, colors: ['#d8d0c8', '#8a8078'], speed: 3, up: 1, life: 0.8, gravity: 3, spread: 2, flat: true });
          await a.wait(1);
          a.burst([KX + 0.5, ky + 20, KZ + 0.5], { n: 24, colors: ['#ffffff', '#d8d0c8'], speed: 2, up: 5, life: 1.6, gravity: -0.5, spread: 1 });
          await a.turn('jib', [0, 0, 0], 2.4);
        },
      });
      return { lights, landmarks, acts, particles: steam };
    },
  });
})();
