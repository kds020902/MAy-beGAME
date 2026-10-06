// 태엽 공방가 — 두 단의 공방 거리, 대시계탑, 톱니 옹벽, 룬 동력로, 골렘 공방, 동쪽 태엽 정거장과 별시계 관측소 (176칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 176, D = 176, Hh = 140;
  const P = v => Math.round(v * 1.2);   // 옛 128칸 배치 → 176칸 배치
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
    id: 'cogspire', cat: 'magic', name: '태엽 공방가', en: 'Cogspire Works', color: '#d8a050', seed: 341, base: 22, time: 'day', size: [W, D, Hh],
    desc: '룬 동력으로 톱니가 도는 기술자들의 거리. 대시계탑의 바늘은 아르카나의 시간을 정한다. 동쪽 끝 태엽 정거장에서는 증기 기관차가 화물을 싣고 오가고, 윗단 별시계 관측소의 혼천의는 별의 시간을 잰다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '룬 기술자 길드'], ['명물', '정각마다 울리는 대시계 · 태엽 기관차'], ['새 구역', '동쪽 태엽 정거장 · 별시계 관측소'], ['주의', '푸른 룬선과 철로는 밟지 말 것']] },
    sky: ['#f0c890', '#6a5a80', '#ffd8a0'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.56], sun: ['#ffd8b0', 0.76, [0.5, 1, 0.45]],
    liquid: ['#0a3a4a', '#1a8aa0', '#a0ffff'], liqSpeed: 1, liqGlow: true,
    fog: { start: 0.84, floor: 12, depth: 10, haze: [24, 0.14, 5], hazeColor: '#d8a878' },
    camY: 0, zoom: 1.1,
    particles: [{ n: 100, colors: ['#ffb040', '#ffe0a0'], mode: 'drift', speed: 0.5, y0: 26, y1: 90 }],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, grass: { c: '#4a3a30', top: '#6a7a4a', v: 0.1 },
      dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' }, found: { c: '#6a6264', v: 0.05, pat: 'stone' }, curb: { c: '#8a8070', v: 0.04 },
      brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' }, slate: { c: '#3a3a4a', v: 0.04, pat: 'tile' }, slateR: { c: '#4a3a3a', v: 0.04, pat: 'tile' },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, copper: { c: '#b0683a', v: 0.07 }, verd: { c: '#5a9a88', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      face: { c: '#f0e8d0', v: 0.02 }, hand: { c: '#1e1e24', v: 0 }, golem: { c: '#7a7068', v: 0.06, pat: 'big' }, golemDk: { c: '#5a524c', v: 0.05 }, door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, bell: { c: '#d8b050', v: 0.05 },
      win: { c: '#ffd890', night: true, day: '#8a9aa8' }, lamp: { c: '#ffe0a0', night: true, day: '#c8b890' },
      rune: { c: '#5affff', glow: true }, runeO: { c: '#ffb040', glow: true }, eye: { c: '#5affff', glow: true },
      hot: { c: '#ff6a20', glow: true }, note: { c: '#ff8ad0', glow: true }, canvas: { c: '#d8c8a0', v: 0.05 }, canvasDk: { c: '#a89870', v: 0.05 }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' },
      crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, sack: { c: '#c8b48a', v: 0.06 }, coal: { c: '#222226', v: 0.08 }, leaf: { c: '#4a7a3a', v: 0.1 }, leafL: { c: '#6a9a48', v: 0.1 }, flower: { c: '#d85a4a', v: 0.05 },
      rail: { c: '#7a7a84', v: 0.03 }, tie: { c: '#4a3424', v: 0.05, pat: 'plank' }, gravel: { c: '#5a5452', top: '#7a726a', v: 0.12 }, paint: { c: '#2a5a4a', v: 0.04 }, paintR: { c: '#8a2a24', v: 0.04 },
    },
    build(w) {
      const B = w.id, base = w.base, UP = base + 10, LO = base + 2, EDGE = 72;
      const TRX = 158;                         // 철로 중심(동쪽 정거장)
      MH.terrain(w, {
        floor: 4, height: (x, z) => z < EDGE ? UP : LO,
        surface: (x, z) => {
          if (x >= TRX - 4 && x <= TRX + 4 && z >= EDGE) return B.gravel;
          if ((x % 22 === 0 || z % 22 === 0)) return B.curb;
          return ((x >> 3) + (z >> 3)) % 2 ? B.cob : B.plate;
        },
        under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock,
      });
      const lights = [], acts = [], steam = [], landmarks = [];
      // ── 옹벽: 벽돌 벽·기둥·윗단 난간·배관 ──
      const stairX = [P(20), P(100)];
      const onStair = x => stairX.some(sx => x >= sx - 1 && x <= sx + 8);
      for (let x = 0; x < W; x++) {
        for (let y = LO + 1; y <= UP; y++) w.set(x, y, EDGE - 1, (y === UP - 4) ? B.brick : B.brickDk);
        w.set(x, UP, EDGE - 1, B.found);
        if (!onStair(x)) { w.set(x, UP + 1, EDGE - 1, x % 4 ? B.iron : B.brass); if (x % 4 === 0) { w.set(x, UP + 2, EDGE - 1, B.iron); w.set(x, UP + 3, EDGE - 1, B.brass); } else w.set(x, UP + 2, EDGE - 1, B.ironDk); }
        if (x % 6 === 0) { w.box(x, LO + 1, EDGE, x, UP - 1, EDGE, B.found); w.set(x, UP, EDGE, B.curb); }
        if (!onStair(x) && (x < 48 || x > 124)) { w.set(x, UP - 3, EDGE, B.copper); if (x % 12 === 3) { w.set(x, UP - 2, EDGE, B.brass); w.set(x, UP - 4, EDGE, B.brass); w.set(x, UP - 3, EDGE + 1, B.brassDk); } }
        w.set(x, LO + 1, EDGE, x % 6 === 0 ? B.found : B.ironDk);
      }
      for (const sx of stairX) {
        for (let s = 0; s < UP - LO; s++) {
          w.box(sx, UP - s, EDGE + s, sx + 7, UP - s, EDGE + s, B.found); MH.footing(w, sx, EDGE + s, sx + 7, EDGE + s, UP - s, B.brickDk);
          for (const x of [sx - 1, sx + 8]) { MH.footing(w, x, EDGE + s, x, EDGE + s, UP - s + 1, B.brickDk); w.set(x, UP - s + 1, EDGE + s, B.found); w.set(x, UP - s + 2, EDGE + s, s % 3 ? B.iron : B.brass); }
        }
        w.box(sx, UP + 1, EDGE - 1, sx + 7, UP + 3, EDGE - 1, 0);
        for (const x of [sx - 1, sx + 8]) { w.box(x, UP + 1, EDGE - 1, x, UP + 4, EDGE - 1, B.brass); w.set(x, UP + 5, EDGE - 1, B.lamp); }
      }
      // 작은 소품
      const crate = (x, z, y, tall) => { w.box(x, y, z, x + 1, y + 1, z + 1, B.crate); w.set(x, y + 1, z, B.brassDk); if (tall) { w.box(x, y + 2, z, x, y + 2, z, B.crate); } };
      const barrel = (x, z, y) => { w.box(x, y, z, x, y + 2, z, B.copper); w.set(x, y + 1, z, B.iron); w.set(x, y + 3, z, B.brassDk); };
      const sacks = (x, z, y) => { w.box(x, y, z, x + 1, y, z, B.sack); w.set(x, y + 1, z, B.sack); };
      const planter = (x, z, y, len, ax) => { for (let k = 0; k < len; k++) { const px = ax ? x + k : x, pz = ax ? z : z + k; w.set(px, y, pz, B.plank); w.set(px, y + 1, pz, hash3(px, y, pz) > 0.7 ? B.flower : (k % 2 ? B.leaf : B.leafL)); } };
      const bench = (x, z, y, ax) => { for (let k = 0; k < 3; k++) { const px = ax ? x + k : x, pz = ax ? z : z + k; w.set(px, y + 1, pz, B.plank); } w.set(x, y, z, B.iron); w.set(ax ? x + 2 : x, y, ax ? z : z + 2, B.iron); };
      const clutter = (x, z, k) => { const y = MH.g(w, x, z) + 1; if (w.get(x, y, z) || w.get(x + 1, y, z + 1)) return; [crate, barrel, sacks][k % 3](x, z, y, k % 4 === 0); };

      // ── 대시계탑 ──
      const TS = 14, TC = 7, TX0 = P(64) - TC, TZ0 = P(34) - TC, ty = UP + 1, TH = 54;
      w.box(TX0 - 3, ty, TZ0 - 3, TX0 + TS + 3, ty + 1, TZ0 + TS + 3, B.found); w.walls(TX0 - 3, ty + 2, TZ0 - 3, TX0 + TS + 3, ty + 2, TZ0 + TS + 3, B.curb);
      w.box(TX0 - 1, ty + 2, TZ0 - 1, TX0 + TS + 1, ty + 4, TZ0 + TS + 1, B.found);
      w.box(TX0, ty, TZ0, TX0 + TS, ty + TH, TZ0 + TS, B.brick);
      for (const [cx, cz] of [[TX0, TZ0], [TX0 + TS, TZ0], [TX0, TZ0 + TS], [TX0 + TS, TZ0 + TS]]) {
        w.box(cx, ty, cz, cx, ty + TH + 2, cz, B.brass);
        const sx = cx === TX0 ? -1 : 1, sz = cz === TZ0 ? -1 : 1;
        for (let k = 0; k < 3; k++) w.box(cx + sx, ty + 5, cz + sz, cx + sx, ty + 5 + (3 - k) * 4, cz + sz, k ? B.brickDk : B.found);
      }
      for (const y of [ty + 14, ty + 28, ty + 40]) { w.walls(TX0 - 1, y, TZ0 - 1, TX0 + TS + 1, y, TZ0 + TS + 1, B.brassDk); w.walls(TX0 - 1, y + 1, TZ0 - 1, TX0 + TS + 1, y + 1, TZ0 + TS + 1, B.found); }
      // 창(창턱·인방)
      for (const oy of [6, 10, 19, 23, 32, 36]) for (const o of [3, 11]) {
        const y = ty + oy;
        w.box(TX0 + o, y, TZ0 + TS, TX0 + o, y + 2, TZ0 + TS, B.win); w.box(TX0 + o, y, TZ0, TX0 + o, y + 2, TZ0, B.win);
        w.box(TX0, y, TZ0 + o, TX0, y + 2, TZ0 + o, B.win); w.box(TX0 + TS, y, TZ0 + o, TX0 + TS, y + 2, TZ0 + o, B.win);
        w.set(TX0 + o, y - 1, TZ0 + TS + 1, B.brassDk); w.set(TX0 + o, y - 1, TZ0 - 1, B.brassDk); w.set(TX0 - 1, y - 1, TZ0 + o, B.brassDk); w.set(TX0 + TS + 1, y - 1, TZ0 + o, B.brassDk);
        w.set(TX0 + o, y + 3, TZ0 + TS, B.found); w.set(TX0 + o, y + 3, TZ0, B.found); w.set(TX0, y + 3, TZ0 + o, B.found); w.set(TX0 + TS, y + 3, TZ0 + o, B.found);
      }
      // 문·계단
      w.box(TX0 + 6, ty + 5, TZ0 + TS, TX0 + 8, ty + 10, TZ0 + TS, B.door); w.box(TX0 + 5, ty + 11, TZ0 + TS, TX0 + 9, ty + 11, TZ0 + TS, B.brass); w.set(TX0 + 7, ty + 12, TZ0 + TS, B.runeO);
      for (const x of [TX0 + 5, TX0 + 9]) w.box(x, ty + 5, TZ0 + TS + 1, x, ty + 10, TZ0 + TS + 1, B.brassDk);
      for (let s = 0; s < 5; s++) w.box(TX0 + 4 - s, ty + 4 - s, TZ0 + TS + 2 + s, TX0 + 10 + s, ty + 4 - s, TZ0 + TS + 2 + s, B.found);
      const FCY = ty + 46, FCX = TX0 + TC, FZ = TZ0 + TS + 1;
      const faceAt = (plane, fixed) => { for (let v = -6; v <= 6; v++) for (let u = -6; u <= 6; u++) { const d = Math.hypot(u, v); if (d > 6.4) continue; const tick = d > 4.2 && d <= 5.2 && (Math.abs(u) < 0.6 || Math.abs(v) < 0.6 || Math.abs(Math.abs(u) - Math.abs(v)) < 0.6); const b = d > 5.2 ? B.brass : tick ? B.hand : d < 1 ? B.brassDk : B.face; if (plane === 'z') w.set(FCX + u, FCY + v, fixed, b); else w.set(fixed, FCY + v, TZ0 + TC + u, b); } };
      faceAt('z', FZ); faceAt('z', TZ0 - 1); faceAt('x', TX0 - 1); faceAt('x', TX0 + TS + 1);
      w.box(FCX, FCY, TZ0 - 2, FCX, FCY + 4, TZ0 - 2, B.hand); w.box(TX0 - 2, FCY, TZ0 + TC, TX0 - 2, FCY, TZ0 + TC + 4, B.hand); w.box(TX0 + TS + 2, FCY - 3, TZ0 + TC, TX0 + TS + 2, FCY, TZ0 + TC, B.hand);
      const hMin = w.prop({ name: 'hMin', pivot: [FCX + 0.5, FCY + 0.5, FZ + 1.5], axis: 'z', speed: -0.4 });
      hMin.box(FCX, FCY, FZ + 1, FCX, FCY + 5, FZ + 1, B.hand);
      const hHour = w.prop({ name: 'hHour', pivot: [FCX + 0.5, FCY + 0.5, FZ + 2.5], axis: 'z', speed: -0.034 });
      hHour.box(FCX, FCY, FZ + 2, FCX + 3, FCY, FZ + 2, B.brassDk); hHour.set(FCX, FCY, FZ + 2, B.brass);
      // 종루(속을 비움)·발코니·지붕·모서리 첨탑
      const by = ty + TH - 1;
      w.box(TX0 - 2, by + 1, TZ0 - 2, TX0 + TS + 2, by + 2, TZ0 + TS + 2, B.brassDk);
      for (let x = TX0 - 2; x <= TX0 + TS + 2; x++) for (let z = TZ0 - 2; z <= TZ0 + TS + 2; z++) if ((x === TX0 - 2 || x === TX0 + TS + 2 || z === TZ0 - 2 || z === TZ0 + TS + 2)) w.set(x, by + 3, z, (x + z) % 2 ? B.iron : B.brass);
      for (const [cx, cz] of [[TX0, TZ0], [TX0 + TS, TZ0], [TX0, TZ0 + TS], [TX0 + TS, TZ0 + TS], [TX0 + TC, TZ0], [TX0 + TC, TZ0 + TS], [TX0, TZ0 + TC], [TX0 + TS, TZ0 + TC]]) w.box(cx, by + 3, cz, cx, by + 10, cz, B.brass);
      for (const [x0, z0, x1, z1] of [[TX0, TZ0, TX0 + TS, TZ0], [TX0, TZ0 + TS, TX0 + TS, TZ0 + TS], [TX0, TZ0, TX0, TZ0 + TS], [TX0 + TS, TZ0, TX0 + TS, TZ0 + TS]]) w.box(x0, by + 9, z0, x1, by + 9, z1, B.brassDk);
      w.box(TX0, by + 11, TZ0, TX0 + TS, by + 11, TZ0 + TS, B.brassDk); w.box(TX0, by + 10, TZ0 + TC, TX0 + TS, by + 10, TZ0 + TC, B.iron);
      const cTop = MH.pyramid(w, TX0 - 1, TZ0 - 1, TX0 + TS + 1, TZ0 + TS + 1, by + 12, B.slate, 2, B.brass);
      for (const [cx, cz] of [[TX0 - 1, TZ0 - 1], [TX0 + TS + 1, TZ0 - 1], [TX0 - 1, TZ0 + TS + 1], [TX0 + TS + 1, TZ0 + TS + 1]]) { w.box(cx, by + 12, cz, cx, by + 16, cz, B.brass); w.set(cx, by + 17, cz, B.runeO); }
      for (let k = 2; k < cTop - by - 12; k += 4) { const s = Math.floor(k / 2); for (const [x, z] of [[TX0 - 1 + s, TZ0 + TC], [TX0 + TS + 1 - s, TZ0 + TC], [TX0 + TC, TZ0 - 1 + s], [TX0 + TC, TZ0 + TS + 1 - s]]) w.set(x, by + 12 + k, z, B.brassDk); }
      w.box(FCX, cTop, TZ0 + TC, FCX, cTop + 6, TZ0 + TC, B.brass); w.box(FCX - 1, cTop + 3, TZ0 + TC, FCX + 1, cTop + 3, TZ0 + TC, B.brass); w.set(FCX, cTop + 7, TZ0 + TC, B.runeO);
      const bell = w.prop({ name: 'bell', pivot: [FCX + 0.5, by + 10, TZ0 + TC + 0.5], axis: 'x' });
      bell.box(FCX, by + 8, TZ0 + TC, FCX, by + 9, TZ0 + TC, B.iron); bell.ellipsoid(FCX, by + 6, TZ0 + TC, 2.6, 2.4, 2.6, B.bell, (dx, dy) => dy >= -2);
      w.set(FCX - 3, ty + 9, FZ, B.lamp); w.set(FCX + 3, ty + 9, FZ, B.lamp);
      lights.push({ p: [FCX + 0.5, ty + 9, FZ + 1], c: '#ffd890', i: 1.2, d: 18, flicker: 0.05, night: true });
      MH.circle(w, FCX, TZ0 + TS + 14, 6, B.brass); MH.circle(w, FCX, TZ0 + TS + 14, 3, B.runeO);
      for (const dx of [-9, 9]) bench(FCX + dx - 1, TZ0 + TS + 12, UP + 1, false);
      landmarks.push({ name: '대시계탑', note: '아르카나의 시간을 정하는 시계', p: [FCX + 0.5, cTop + 10, TZ0 + TC + 0.5], tag: 'CLOCK' });
      // 대시계탑 정문 → 탑 안(하위 지도)
      acts.push(OR.goAct({ at: [FCX, ty + 5, FZ], h: 7, hit: [TX0 + 6, ty + 5, TZ0 + TS, TX0 + 8, ty + 10, TZ0 + TS + 1], name: '대시계탑 안으로', goto: 'cogspire-clocktower', hint: '놋쇠 문틀의 탑 정문을 열고 톱니와 진자가 도는 대시계탑 속으로 들어가요' }));
      // ── 톱니 옹벽: 맞물려 도는 톱니 일곱 ──
      const gears = [[58, 5.5, 0.4, B.brass], [70, 5.5, -0.4, B.copper], [82, 5.5, 0.4, B.brass], [94, 5.5, -0.4, B.copper], [50, 3.2, -0.69, B.brassDk], [106, 5.5, 0.4, B.brass], [114, 3.2, -0.69, B.verd]];
      gears.forEach(([gx, r, sp, b], k) => {
        const gyc = r < 4 ? LO + 5 : LO + 7;
        const g = w.prop({ name: 'gear' + k, pivot: [gx + 0.5, gyc + 0.5, EDGE + 2], axis: 'z', speed: sp });
        gear(g, gx, gyc, EDGE + 1, r, 'xy', b, B.ironDk, 2);
        w.set(gx, gyc, EDGE, B.ironDk);
      });
      acts.push({
        name: '대시계', hint: '바늘이 빠르게 돌고 종이 울리며 톱니가 빨라져요', hit: [FCX - 6, FCY - 6, FZ, FCX + 6, FCY + 6, FZ + 3],
        run: async a => {
          a.spin('hMin', 30, 4.2); a.spin('hHour', 30, 4.2); for (let k = 0; k < 7; k++) a.spin('gear' + k, 4, 4.2);
          for (let k = 0; k < 5; k++) { await a.turn('bell', [0.4, 0, 0], 0.4); a.burst([FCX + 0.5, by + 7, TZ0 + TC + 0.5], { n: 18, colors: ['#ffe0a0', '#ffb040'], speed: 9, up: 1, life: 1.6, gravity: 0.5, spread: 4, flat: true }); await a.turn('bell', [-0.4, 0, 0], 0.4); }
          await a.turn('bell', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '톱니 옹벽', note: '맞물려 도는 일곱 톱니', p: [82.5, LO + 18, EDGE + 1] });
      // ── 룬 동력로(아랫단 서쪽) ──
      const RX = P(30), RZ = P(90), ry = LO;
      w.cyl(RX, RZ, ry + 1, ry + 1, 10.4, B.found); w.cyl(RX, RZ, ry + 1, ry + 1, 9.4, B.ironDk); w.ring(RX, RZ, ry + 2, 8.2, 9.4, B.iron); MH.circle(w, RX, RZ, 13, B.rune); MH.circle(w, RX, RZ, 15, B.brassDk);
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.78, px = Math.round(RX + Math.cos(a) * 8.6), pz = Math.round(RZ + Math.sin(a) * 8.6); w.box(px, ry + 2, pz, px, ry + 12, pz, B.brass); w.set(px, ry + 7, pz, B.copper); w.box(px, ry + 13, pz, px, ry + 14, pz, B.rune); w.set(px, ry + 15, pz, B.brassDk); w.line(px, ry + 12, pz, RX + Math.cos(a) * 3, ry + 3, RZ + Math.sin(a) * 3, B.copper); }
      w.box(RX, ry + 2, RZ, RX, ry + 4, RZ, B.iron); w.sphere(RX, ry + 8, RZ, 3, B.rune);
      const rr = w.prop({ name: 'rr1', pivot: [RX + 0.5, ry + 8.5, RZ + 0.5], axis: 'y', speed: 0.9 }); MH.ringProp(rr, RX, ry + 8, RZ, 6.4, 'xz', B.copper, B.rune, 8);
      const rr2 = w.prop({ name: 'rr2', pivot: [RX + 0.5, ry + 8.5, RZ + 0.5], axis: 'y', speed: -0.6, clipOK: 2 }); MH.ringProp(rr2, RX, ry + 8, RZ, 4.8, 'xy', B.brass, B.runeO, 6);
      lights.push({ name: 'core', p: [RX + 0.5, ry + 9, RZ + 0.5], c: '#50f0ff', i: 2, d: 26, flicker: 0.1 });
      MH.path(w, [[RX + 12, RZ - 5], [60, 89], [74, EDGE + 3]], 0.7, B.rune); MH.path(w, [[RX + 14, RZ + 2], [84, 110], [101, 106]], 0.7, B.rune);
      acts.push({
        name: '룬 동력로', hint: '고리가 빨리 돌고 룬 핵이 눈부시게 빛나요', hit: [RX - 7, ry + 2, RZ - 7, RX + 7, ry + 15, RZ + 7],
        run: async a => { a.flash('core', 3, 4.5); a.glow(1.7, 4.5); a.spin('rr1', 6, 4.5); a.spin('rr2', 6, 4.5); for (let k = 0; k < 8; k++) { a.burst([RX + 0.5, ry + 8, RZ + 0.5], { n: 30, colors: ['#5affff', '#a0ffff', '#ffffff'], speed: 8, up: 2, life: 1.4, gravity: 0, spread: 2 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '룬 동력로', note: '고리 두 개가 도는 동력 핵', p: [RX + 0.5, ry + 22, RZ + 0.5] });
      // 냉각수 수로(동력로에서 남쪽 끝으로) — 놋쇠 갓돌, 나무 다리
      for (let z = RZ + 11; z < D; z++) {
        for (let x = RX - 1; x <= RX + 1; x++) { MH.setH(w, x, z, LO - 2, B.ironDk, B.rock); w.liquid(x, z, LO - 1); w.set(x, LO - 1, z, 0); w.set(x, LO, z, 0); }
        for (const x of [RX - 2, RX + 2]) w.set(x, LO, z, z % 4 ? B.curb : B.brassDk);
      }
      for (const bz of [138, 160]) { w.box(RX - 2, LO + 1, bz, RX + 2, LO + 1, bz + 2, B.plank); for (const x of [RX - 2, RX + 2]) { w.box(x, LO + 2, bz, x, LO + 3, bz, B.iron); w.box(x, LO + 2, bz + 2, x, LO + 3, bz + 2, B.iron); w.set(x, LO + 3, bz + 1, B.iron); } }
      lights.push({ p: [RX + 0.5, LO + 1, 150], c: '#40d0e0', i: 1, d: 14, flicker: 0.1, liquid: true });
      // ── 골렘 공방(아랫단 동쪽)과 시험대의 골렘 ──
      const shop = MH.houseX(w, { x: P(88), z: P(72), sx: 24, sz: 16, floors: 2, fh: 7, face: 'w', pitch: 1, winGap: 4, studs: true, dormers: 2, y: LO, m: { found: B.found, wall: B.brick, frame: B.brass, quoin: B.found, win: B.win, sill: B.brassDk, shutter: B.paint, door: B.door, roof: B.slate, eave: B.ironDk, ridge: B.brass, chimney: B.brickDk, lamp: B.lamp } });
      lights.push({ p: [shop.door[0] - 0.5, shop.door[1] + 3, shop.door[2] + 0.5], c: '#ffd890', i: 1, d: 12, flicker: 0.05, night: true });
      // 골렘 공방 정문(서쪽) → 공방 안(하위 지도)
      acts.push(OR.goAct({ at: [shop.door[0] - 1, shop.door[1], shop.door[2]], h: 6, hit: [shop.door[0] - 1, shop.door[1], shop.door[2], shop.door[0], shop.door[1] + 3, shop.door[2] + 1], name: '골렘 공방 안으로', goto: 'cogspire-golemworks', hint: '공방 문을 열고 골렘 몸통이 매달린 조립장과 시험대가 있는 공방 안으로 들어가요' }));
      if (shop.chimney) steam.push({ n: 36, colors: ['#e8e0d8', '#b8b0a8'], mode: 'rise', speed: 0.7, area: [shop.chimney[0], shop.chimney[2], 0.8], y0: shop.chimney[1], y1: shop.chimney[1] + 22, glow: false });
      for (let k = 0; k < 6; k++) clutter(shop.x0 - 4 - (k % 2) * 3, shop.z0 + 1 + k * 2 + (k > 2 ? 6 : 0), k);
      const GX = P(72), GZ = P(98), gy = LO + 1;
      w.box(GX - 6, gy, GZ - 4, GX + 6, gy, GZ + 4, B.found); w.box(GX - 5, gy, GZ - 3, GX + 5, gy, GZ + 3, B.ironDk);
      for (const x of [GX - 6, GX + 6]) { w.box(x, gy, GZ - 2, x, gy + 20, GZ - 2, B.iron); w.box(x, gy, GZ + 2, x, gy + 20, GZ + 2, B.iron); }
      w.box(GX - 6, gy + 20, GZ - 2, GX + 6, gy + 20, GZ - 2, B.iron); w.box(GX - 6, gy + 20, GZ + 2, GX + 6, gy + 20, GZ + 2, B.iron); w.box(GX - 1, gy + 21, GZ - 2, GX + 1, gy + 21, GZ + 2, B.brass);
      w.box(GX - 3, gy + 1, GZ - 1, GX - 1, gy + 6, GZ + 1, B.golem); w.box(GX + 1, gy + 1, GZ - 1, GX + 3, gy + 6, GZ + 1, B.golem);
      w.box(GX - 4, gy + 7, GZ - 2, GX + 4, gy + 14, GZ + 2, B.golem); w.box(GX - 4, gy + 10, GZ - 2, GX + 4, gy + 10, GZ + 2, B.golemDk); w.box(GX - 4, gy + 14, GZ - 2, GX + 4, gy + 14, GZ + 2, B.brassDk);
      w.box(GX - 2, gy + 15, GZ - 1, GX + 2, gy + 18, GZ + 1, B.golem); w.set(GX - 1, gy + 17, GZ + 2, B.eye); w.set(GX + 1, gy + 17, GZ + 2, B.eye); w.box(GX - 2, gy + 19, GZ, GX + 2, gy + 19, GZ, B.brassDk);
      w.box(GX - 1, gy + 10, GZ + 3, GX + 1, gy + 12, GZ + 3, B.rune);
      w.box(GX - 7, gy + 8, GZ - 1, GX - 5, gy + 14, GZ + 1, B.golemDk);
      const arm = w.prop({ name: 'arm', pivot: [GX + 6, gy + 13, GZ + 0.5], axis: 'z' });
      arm.box(GX + 5, gy + 4, GZ - 1, GX + 7, gy + 14, GZ + 1, B.golemDk); arm.box(GX + 5, gy + 2, GZ - 1, GX + 7, gy + 3, GZ + 1, B.golem);
      lights.push({ name: 'golem', p: [GX + 0.5, gy + 17, GZ + 3.5], c: '#50f0ff', i: 0.9, d: 14, flicker: 0.1 });
      for (let k = 0; k < 4; k++) clutter(GX - 10 + k * 5, GZ - 8, k + 1);
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
      landmarks.push({ name: '골렘 공방', note: '시험대에 선 작업용 골렘', p: [GX + 0.5, gy + 28, GZ + 0.5] });
      // ── 기술자 집, 구리 관, 증기 ──
      const hm = k => ({ found: B.found, wall: k % 2 ? B.brickDk : B.brick, frame: B.brass, quoin: B.found, win: B.win, sill: B.brassDk, shutter: k % 3 ? B.paint : B.paintR, flower: B.flower, rail: B.iron, door: B.door, roof: k % 3 === 1 ? B.slateR : B.slate, eave: B.ironDk, ridge: B.copper, chimney: B.iron, lamp: B.lamp });
      [[12, 14, 12, 9, 's', UP], [36, 12, 11, 9, 's', UP], [103, 14, 12, 9, 's', UP], [127, 12, 11, 10, 's', UP], [12, 46, 10, 9, 'e', UP], [124, 44, 11, 9, 'w', UP], [10, 82, 10, 9, 'e', LO], [62, 126, 11, 9, 'n', LO], [8, 140, 12, 10, 'e', LO]].forEach(([x, z, sx, sz, face, y], k) => {
        const h = MH.houseX(w, { x, z, sx, sz, floors: 2 + (k % 2), fh: 6, face, pitch: 1, dormers: k % 3 === 0 ? 1 : 0, balcony: k % 3 === 2 ? 1 : 0, studs: k % 2 === 0, y, m: hm(k) });
        if (k === 0 || k === 4) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.05, night: true });
        if (h.chimney && steam.length < 5) steam.push({ n: 22, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 0.6, area: [h.chimney[0], h.chimney[2], 0.6], y0: h.chimney[1], y1: h.chimney[1] + 18, glow: false });
        // 집 앞 소품: 화단·통·상자
        const fy = y + 1;
        if (face === 's') { planter(x + 1, z + sz + 1, fy, 3, true); clutter(x + sx - 3, z + sz + 2, k); }
        else if (face === 'e') { planter(x + sx + 1, z, fy, 3, false); clutter(x + sx + 2, z + sz - 3, k + 1); }
        else if (face === 'w') { planter(x - 2, z, fy, 3, false); clutter(x - 4, z + sz - 3, k + 2); }
        else { planter(x + 1, z - 2, fy, 3, true); clutter(x + sx - 3, z - 4, k); }
      });
      // 관 받침대와 구리 관(탑 → 공방)
      for (const px of [91, 101]) { w.box(px, UP + 1, 60, px, UP + 12, 60, B.iron); w.box(px - 1, UP + 12, 60, px + 1, UP + 12, 60, B.iron); w.box(px - 1, UP + 1, 59, px + 1, UP + 1, 61, B.found); }
      w.line(TX0 + TS + 1, UP + 13, TZ0 + 8, 91, UP + 13, 60, B.copper, 0.7); w.line(91, UP + 13, 60, 101, UP + 13, 60, B.copper, 0.7); w.line(101, UP + 13, 60, 114, LO + 15, 86, B.copper, 0.7);
      w.set(96, UP + 14, 60, B.brass); w.set(96, UP + 12, 60, B.brass);
      for (const [lx, lz, lit] of [[53, 60, 1], [101, 66, 0], [60, 94, 1], [84, 94, 0], [115, 120, 1], [24, 26, 0], [140, 24, 0], [48, 110, 0], [100, 150, 0]]) {
        const y = MH.g(w, lx, lz); if (w.get(lx, y + 1, lz)) continue;
        const lp = MH.lamp(w, lx, lz, { m: { post: B.iron, glow: B.lamp, found: B.found }, h: 6 });
        if (lit) lights.push({ p: lp, c: '#ffe0a0', i: 1, d: 13, flicker: 0.05, night: true });
      }
      // ── 증기 해머(아랫단 남쪽): 해머(부품)가 달군 쇠를 내리친다 ──
      const HX = P(100), HZ = P(108), hy = LO + 1;
      w.box(HX - 5, hy - 1, HZ - 4, HX + 5, hy - 1, HZ + 4, B.found);
      for (const x of [HX - 3, HX + 3]) { w.box(x, hy, HZ, x, hy + 14, HZ, B.iron); w.box(x, hy, HZ - 1, x, hy + 1, HZ + 1, B.ironDk); }
      w.box(HX - 3, hy + 14, HZ - 1, HX + 3, hy + 14, HZ + 1, B.ironDk); w.box(HX - 1, hy + 15, HZ - 1, HX + 1, hy + 16, HZ + 1, B.copper); w.set(HX, hy + 17, HZ, B.iron);
      w.box(HX - 1, hy, HZ - 1, HX + 1, hy + 1, HZ + 1, B.ironDk); w.box(HX - 2, hy, HZ - 2, HX + 2, hy, HZ + 2, B.found); w.box(HX - 1, hy + 2, HZ, HX + 1, hy + 2, HZ, B.hot);
      w.box(HX + 6, hy, HZ - 3, HX + 8, hy + 2, HZ - 1, B.brickDk); w.set(HX + 7, hy + 2, HZ - 2, B.hot); w.box(HX - 7, hy, HZ + 2, HX - 6, hy, HZ + 3, B.coal); w.set(HX - 7, hy + 1, HZ + 2, B.coal);
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
      const LX0 = 134, LX1 = 138, LZ0 = EDGE + 1, LZ1 = EDGE + 4, lift = UP - LO, RX0 = 136;
      for (const x of [LX0 - 1, LX1 + 1]) { w.box(x, LO + 1, EDGE + 3, x, UP + 6, EDGE + 3, B.iron); w.box(x, LO + 1, EDGE + 2, x, UP + 6, EDGE + 2, B.brassDk); }
      w.box(LX0 - 1, UP + 6, EDGE + 2, LX1 + 1, UP + 6, EDGE + 3, B.ironDk); w.set(RX0, UP + 7, EDGE + 3, B.brass);
      const plat = w.prop({ name: 'lift' });
      plat.box(LX0, LO + 1, LZ0, LX1, LO + 1, LZ1, B.plank); plat.box(LX0, LO + 2, LZ1, LX1, LO + 2, LZ1, B.iron);
      plat.box(LX0, LO + 2, LZ0, LX0 + 1, LO + 3, LZ0 + 1, B.crate); plat.set(LX1, LO + 2, LZ0, B.copper); plat.set(LX1, LO + 3, LZ0, B.brass);
      MH.rope(w, 'liftRope', RX0, UP + 5, EDGE + 3, UP + 5 - (LO + 2) + 1, B.ironDk);
      acts.push({
        name: '화물 승강기', hint: '짐을 실은 발판이 옹벽을 따라 윗단까지 올라갔다 내려와요', hit: [LX0 - 2, LO + 1, LZ0 - 1, LX1 + 2, UP + 7, LZ1 + 1],
        run: async a => {
          const L0 = UP + 5 - (LO + 2) + 1;
          a.burst([RX0, LO + 2, EDGE + 3], { n: 20, colors: ['#ffffff', '#d8d0c8'], speed: 3, up: 2, life: 1, gravity: -0.5, spread: 2 });
          a.rope('liftRope', L0, L0 - lift, 2.6); await a.move('lift', [0, lift, 0], 2.6);
          a.burst([RX0, UP + 2, EDGE + 3], { n: 24, colors: ['#ffe0a0', '#ffb040'], speed: 4, up: 1, life: 0.8, gravity: 4, spread: 2, flat: true });
          await a.wait(1.4);
          a.rope('liftRope', L0, L0, 2.4); await a.move('lift', [0, 0, 0], 2.4);
        },
      });
      // ── 비행선(윗단 서쪽 계류탑): 탑을 한 바퀴 돌고 계류탑에 새로 나타난다(부품) ──
      const MX = P(40), MZ = P(36);
      w.box(MX, UP + 1, MZ, MX, UP + 17, MZ, B.iron); w.box(MX - 2, UP + 1, MZ - 2, MX + 2, UP + 1, MZ + 2, B.found); w.box(MX - 1, UP + 2, MZ - 1, MX + 1, UP + 2, MZ + 1, B.found);
      for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.line(MX + dx, UP + 2, MZ + dz, MX, UP + 10, MZ, B.ironDk);
      for (let y = UP + 4; y < UP + 10; y += 4) w.box(MX - 1, y, MZ, MX + 1, y, MZ, B.brassDk);
      w.box(MX - 1, UP + 17, MZ, MX + 1, UP + 17, MZ, B.brass); w.set(MX, UP + 18, MZ, B.runeO);
      const ship = w.prop({ name: 'airship', pivot: [MX - 6.5, UP + 15.5, MZ + 0.5] });
      ship.ellipsoid(MX - 7, UP + 16, MZ, 6, 3.2, 3.2, B.canvas);
      for (const dx of [-4, 0, 4]) ship.ellipsoid(MX - 7 + dx, UP + 16, MZ, 0.6, 3.3, 3.3, B.canvasDk);
      ship.box(MX - 13, UP + 15, MZ, MX - 12, UP + 20, MZ, B.copper); ship.box(MX - 13, UP + 16, MZ - 3, MX - 12, UP + 16, MZ + 3, B.copper);
      ship.box(MX - 9, UP + 11, MZ - 1, MX - 5, UP + 12, MZ + 1, B.brass); ship.box(MX - 8, UP + 12, MZ, MX - 6, UP + 12, MZ, B.win);
      ship.box(MX - 8, UP + 13, MZ, MX - 8, UP + 13, MZ, B.iron); ship.box(MX - 6, UP + 13, MZ, MX - 6, UP + 13, MZ, B.iron); ship.box(MX - 10, UP + 11, MZ, MX - 10, UP + 12, MZ, B.runeO);
      const air = [[60, 70], [104, 74], [116, 44], [104, 20], [62, 22], [26, 24], [-4, 20]];
      const shipPts = [[0, 6, 0]].concat(air.map(([x, z]) => [x - (MX - 7), 18, z - MZ]));
      acts.push({
        name: '비행선', hint: '계류탑의 비행선이 떠올라 시계탑을 한 바퀴 돌고 북서쪽 하늘 너머로 떠난 뒤, 계류탑에 다시 나타나요', hit: [MX - 14, UP + 10, MZ - 4, MX + 1, UP + 20, MZ + 4],
        run: async a => {
          a.burst([MX - 7, UP + 10, MZ + 0.5], { n: 30, colors: ['#ffffff', '#e8e0d8'], speed: 3, up: 2, life: 1.4, gravity: -0.3, spread: 3 });
          await a.drive('airship', shipPts, 18, { fwd: '+x', back: 1.0 });
          a.burst([MX, UP + 18, MZ + 0.5], { n: 20, colors: ['#ffb040', '#ffe0a0'], speed: 3, up: 2, life: 1, gravity: 2, spread: 1 });
        },
      });
      landmarks.push({ name: '비행선 계류탑', note: '시계탑을 도는 유람 비행선', p: [MX - 6.5, UP + 26, MZ + 0.5] });
      // ── 태엽 오르골(아랫단 남쪽): 핀 박힌 원통(부품)이 돌며 음표가 튄다 ──
      const OX = P(70), OZ = P(114), oy = LO + 1;
      w.box(OX - 3, oy - 1, OZ - 5, OX + 13, oy - 1, OZ + 5, B.found); w.walls(OX - 3, oy, OZ - 5, OX + 13, oy, OZ + 5, B.curb);
      w.box(OX - 1, oy, OZ - 3, OX + 11, oy + 2, OZ + 3, B.brassDk); w.box(OX - 1, oy + 3, OZ - 3, OX + 11, oy + 3, OZ + 3, B.brass);
      for (let x = OX; x <= OX + 10; x += 2) w.set(x, oy + 1, OZ + 3, B.runeO);
      for (const x of [OX - 1, OX + 11]) w.box(x, oy + 4, OZ, x, oy + 7, OZ, B.brass);
      for (let x = OX + 1; x <= OX + 9; x++) w.box(x, oy + 4, OZ - 3, x, oy + 4 + (x % 3), OZ - 3, B.iron);
      const drum = w.prop({ name: 'drum', pivot: [OX + 5.5, oy + 7.5, OZ + 0.5], axis: 'x', speed: 0.5, clipOK: 1 });
      for (let x = OX; x <= OX + 10; x++) for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const d = Math.hypot(u, v); if (d <= 2.4) drum.set(x, oy + 7 + v, OZ + u, x === OX || x === OX + 10 ? B.copper : B.brass); else if (d <= 3.2 && hash3(x, u + 9, v + 9) > 0.8 && x > OX && x < OX + 10) drum.set(x, oy + 7 + v, OZ + u, B.runeO); }
      const mstar = w.prop({ name: 'mstar', pivot: [OX + 5.5, oy + 12, OZ + 0.5], axis: 'y', speed: 0.8 });
      mstar.box(OX + 5, oy + 11, OZ, OX + 5, oy + 14, OZ, B.brass); mstar.box(OX + 3, oy + 13, OZ, OX + 7, oy + 13, OZ, B.note); mstar.box(OX + 5, oy + 13, OZ - 2, OX + 5, oy + 13, OZ + 2, B.rune);
      w.box(OX + 5, oy + 10, OZ, OX + 5, oy + 10, OZ, B.brass);
      for (const dz of [-7, 7]) bench(OX + 4, OZ + dz, oy - 1 + 1, true);
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
      const KX = P(104), KZ = P(96), ky = LO + 1;
      w.box(KX - 2, ky, KZ - 2, KX + 2, ky, KZ + 2, B.found); w.box(KX - 1, ky + 1, KZ - 1, KX + 1, ky + 1, KZ + 1, B.found);
      for (let y = ky + 2; y <= ky + 15; y++) { w.set(KX, y, KZ, B.iron); if (y % 4 === 0) { w.set(KX - 1, y, KZ, B.brassDk); w.set(KX + 1, y, KZ, B.brassDk); w.set(KX, y, KZ - 1, B.brassDk); w.set(KX, y, KZ + 1, B.brassDk); } }
      const jib = w.prop({ name: 'jib', pivot: [KX + 0.5, ky + 16, KZ + 0.5], axis: 'y' });
      jib.box(KX - 1, ky + 16, KZ - 1, KX + 1, ky + 18, KZ + 1, B.copper); jib.set(KX, ky + 19, KZ, B.iron);
      jib.box(KX - 6, ky + 17, KZ, KX + 9, ky + 17, KZ, B.brass); jib.box(KX - 6, ky + 15, KZ - 1, KX - 4, ky + 16, KZ + 1, B.ironDk);
      jib.box(KX + 8, ky + 9, KZ, KX + 8, ky + 16, KZ, B.ironDk); jib.box(KX + 7, ky + 6, KZ - 1, KX + 9, ky + 8, KZ + 1, B.crate); jib.set(KX + 8, ky + 8, KZ, B.copper);
      for (let k = 0; k < 3; k++) clutter(KX - 6 + k * 3, KZ + 5, k + 2);
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

      // ══════════ 새 구역: 태엽 정거장(아랫단 동쪽) ══════════
      const RZ0 = EDGE + 6, RZ1 = D - 1;
      for (let z = RZ0; z <= RZ1; z++) {
        if (z % 2 === 0) w.box(TRX - 3, LO, z, TRX + 3, LO, z, B.tie);
        w.set(TRX - 2, LO + 1, z, B.rail); w.set(TRX + 2, LO + 1, z, B.rail);
      }
      // 기관고(북쪽, 남쪽이 트인 벽돌 창고)
      const SX0 = TRX - 8, SX1 = TRX + 8, SZ0 = EDGE + 3, SZ1 = EDGE + 20, sy = LO + 1, sh = 13;
      w.box(SX0 - 1, LO, SZ0 - 1, SX1 + 1, LO, SZ1 + 1, B.found);
      w.walls(SX0, sy, SZ0, SX1, sy + sh, SZ1, B.brick);
      w.box(TRX - 4, sy, SZ1, TRX + 4, sy + 9, SZ1, 0);
      w.box(TRX - 5, sy + 10, SZ1, TRX + 5, sy + 10, SZ1, B.brass); for (const x of [TRX - 5, TRX + 5]) w.box(x, sy, SZ1, x, sy + 9, SZ1, B.brassDk);
      for (const x of [SX0, SX1]) for (let z = SZ0 + 3; z < SZ1 - 1; z += 4) { w.box(x, sy + 4, z, x, sy + 7, z + 1, B.win); w.set(x + (x === SX0 ? -1 : 1), sy + 3, z, B.brassDk); w.set(x + (x === SX0 ? -1 : 1), sy + 3, z + 1, B.brassDk); }
      for (const [x, z] of [[SX0, SZ0], [SX1, SZ0], [SX0, SZ1], [SX1, SZ1]]) w.box(x, sy, z, x, sy + sh, z, B.found);
      w.walls(SX0, sy + sh, SZ0, SX1, sy + sh, SZ1, B.brassDk);
      const shTop = MH.roof(w, SX0 - 1, SX1 + 1, SZ0 - 1, SZ1 + 1, sy + sh + 1, { b: B.slateR, eave: B.ironDk, ridge: B.copper, pitch: 1, gable: B.brickDk, gwin: B.win, axis: 'z' });
      for (let z = SZ0 + 2; z < SZ1; z += 6) { w.box(TRX - 1, shTop - 1, z, TRX + 1, shTop + 2, z + 1, B.iron); w.box(TRX - 1, shTop + 3, z, TRX + 1, shTop + 3, z + 1, B.brassDk); }
      steam.push({ n: 20, colors: ['#e8e0d8', '#c8c0b8'], mode: 'rise', speed: 0.6, area: [TRX + 0.5, SZ0 + 3, 1], y0: shTop + 4, y1: shTop + 20, glow: false });
      // 승강장(철로 서쪽): 돌 바닥·노란 가장자리·지붕·의자·짐
      const PZ0 = 126, PZ1 = 156, PX0 = TRX - 13, PX1 = TRX - 4, py = LO + 1;
      w.box(PX0, LO, PZ0, PX1, py, PZ1, B.found); w.box(PX0, py, PZ0, PX1, py, PZ1, B.plate); w.box(PX1, py, PZ0, PX1, py, PZ1, B.brass);
      for (let s = 1; s <= 1; s++) w.box(PX0 - s, LO + 1 - s + 0, PZ0 + 12, PX0 - s, LO + 1 - s, PZ0 + 18, B.found);
      for (let z = PZ0 + 2; z <= PZ1 - 2; z += 7) {
        w.box(PX0 + 2, py + 1, z, PX0 + 2, py + 7, z, B.iron); w.box(PX1 - 1, py + 1, z, PX1 - 1, py + 7, z, B.iron);
        w.set(PX0 + 2, py + 5, z, B.brassDk); w.set(PX1 - 1, py + 5, z, B.brassDk);
      }
      for (let z = PZ0; z <= PZ1; z++) for (let x = PX0; x <= PX1 + 1; x++) { const edge = x === PX0 || x === PX1 + 1; w.set(x, py + 8 + (x < PX0 + 3 ? 1 : x > PX1 - 2 ? -0 : 1), z, edge ? B.ironDk : (z % 3 ? B.verd : B.copper)); }
      for (let z = PZ0 + 3; z <= PZ1 - 3; z += 7) { w.set(TRX - 8, py + 7, z + 3, B.lamp); w.set(TRX - 8, py + 8, z + 3, B.iron); }
      for (let z = PZ0 + 4; z <= PZ1 - 6; z += 9) bench(PX0 + 4, z, py, false);
      for (let k = 0; k < 4; k++) { const x = PX0 + 1 + (k % 2) * 3, z = PZ1 - 3 - (k >> 1) * 3; [crate, barrel, sacks, crate][k](x, z, py + 1, k === 0); }
      // 매표소(승강장 북쪽 끝)
      MH.houseX(w, { x: PX0 - 1, z: PZ0 - 9, sx: 9, sz: 7, floors: 1, fh: 6, face: 's', pitch: 1, y: LO, m: { found: B.found, wall: B.brickDk, frame: B.brass, quoin: B.found, win: B.win, sill: B.brassDk, door: B.door, roof: B.verd, eave: B.ironDk, ridge: B.brass, lamp: B.lamp } });
      lights.push({ name: 'depot', p: [TRX - 7.5, py + 6, PZ0 + 13.5], c: '#ffd890', i: 1.3, d: 22, flicker: 0.05, srcR: 5 });
      // 신호기
      for (const sz of [EDGE + 30, PZ1 + 8]) { w.box(TRX + 5, LO + 1, sz, TRX + 5, LO + 10, sz, B.iron); w.box(TRX + 4, LO + 9, sz, TRX + 4, LO + 11, sz, B.ironDk); w.set(TRX + 4, LO + 11, sz, B.rune); w.set(TRX + 4, LO + 9, sz, B.hot); }
      // 급수탑(철로 동쪽)
      const WX = TRX + 9, WZ = 112, wy0 = LO + 1, wt = LO + 13;
      for (const [dx, dz] of [[-3, -3], [3, -3], [-3, 3], [3, 3]]) { w.box(WX + dx, wy0, WZ + dz, WX + dx, wt - 1, WZ + dz, B.iron); w.set(WX + dx, wy0, WZ + dz, B.found); }
      w.line(WX - 3, wy0 + 1, WZ - 3, WX + 3, wt - 2, WZ - 3, B.ironDk); w.line(WX + 3, wy0 + 1, WZ + 3, WX - 3, wt - 2, WZ + 3, B.ironDk);
      w.cyl(WX, WZ, wt, wt, 4.6, B.ironDk); w.cyl(WX, WZ, wt + 1, wt + 7, 4.2, B.plank);
      for (const y of [wt + 2, wt + 5]) w.ring(WX, WZ, y, 3.6, 4.4, B.iron);
      const wTop = MH.cone(w, WX, WZ, wt + 8, 5, B.verd, 0.6, B.ironDk); w.box(WX, wTop, WZ, WX, wTop + 1, WZ, B.brass);
      w.box(WX - 5, wt + 3, WZ, WX - 4, wt + 3, WZ, B.copper);
      const spout = w.prop({ name: 'spout', pivot: [WX - 5.5, wt + 3.5, WZ + 0.5], axis: 'z', rot0: [0, 0, -1.2] });
      spout.box(WX - 11, wt + 3, WZ, WX - 6, wt + 3, WZ, B.copper); spout.box(WX - 11, wt + 2, WZ, WX - 11, wt + 2, WZ, B.brassDk); spout.set(WX - 8, wt + 4, WZ, B.brass);
      // 정거장 둘레 소품
      for (let k = 0; k < 6; k++) clutter(TRX + 6 + (k % 2) * 3, 128 + k * 6, k);
      MH.fence(w, [[TRX + 12, EDGE + 24], [TRX + 12, D - 2]], B.iron, B.brassDk);
      // 기관차와 화차(부품): 기관고 앞에서 출발해 승강장으로
      const LZf = SZ1 + 16, ly = LO + 2;
      const lb = LZf - 14;                                                   // 기관차 뒤끝
      const loco = w.prop({ name: 'loco', pivot: [TRX + 0.5, ly + 5, lb - 4] });
      for (let z = lb; z <= LZf; z++) for (const x of [TRX - 2, TRX + 2]) { if (z % 4 === 1) { loco.box(x, ly, z - 1, x, ly + 2, z + 1, B.ironDk); loco.set(x, ly + 1, z, B.paintR); } }
      loco.box(TRX - 2, ly + 2, lb, TRX + 2, ly + 2, LZf, B.ironDk);
      for (let z = lb + 5; z <= LZf - 1; z++) for (let v = -3; v <= 3; v++) for (let u = -3; u <= 3; u++) { const d = Math.hypot(u, v); if (d <= 2.6) loco.set(TRX + u, ly + 5 + v, z, (z - lb) % 3 === 0 ? B.brass : B.paint); }
      loco.box(TRX - 1, ly + 4, LZf, TRX + 1, ly + 6, LZf, B.ironDk); loco.set(TRX, ly + 5, LZf, B.runeO);
      loco.box(TRX - 2, ly + 1, LZf + 1, TRX + 2, ly + 1, LZf + 1, B.ironDk); loco.box(TRX - 1, ly, LZf + 1, TRX + 1, ly, LZf + 1, B.paintR);
      loco.box(TRX, ly + 8, LZf - 3, TRX, ly + 11, LZf - 3, B.ironDk); loco.box(TRX - 1, ly + 12, LZf - 4, TRX + 1, ly + 12, LZf - 2, B.brass);
      loco.box(TRX, ly + 8, LZf - 8, TRX, ly + 9, LZf - 8, B.brass);
      loco.box(TRX - 2, ly + 3, lb, TRX + 2, ly + 9, lb + 4, B.paint); loco.box(TRX - 1, ly + 3, lb + 1, TRX + 1, ly + 8, lb + 3, 0);
      loco.box(TRX - 2, ly + 6, lb + 2, TRX - 2, ly + 7, lb + 2, B.win); loco.box(TRX + 2, ly + 6, lb + 2, TRX + 2, ly + 7, lb + 2, B.win);
      loco.box(TRX - 3, ly + 10, lb - 1, TRX + 3, ly + 10, lb + 5, B.copper); loco.box(TRX - 2, ly + 11, lb, TRX + 2, ly + 11, lb + 4, B.brassDk);
      // 화차(석탄)
      const cb = lb - 9;
      for (const z of [cb + 1, cb + 6]) for (const x of [TRX - 2, TRX + 2]) loco.box(x, ly, z, x, ly + 1, z + 1, B.ironDk);
      loco.box(TRX - 2, ly + 2, cb, TRX + 2, ly + 2, cb + 7, B.ironDk); loco.walls(TRX - 2, ly + 3, cb, TRX + 2, ly + 5, cb + 7, B.plank); loco.box(TRX - 1, ly + 3, cb + 1, TRX + 1, ly + 5, cb + 6, B.coal);
      loco.box(TRX - 2, ly + 4, cb, TRX + 2, ly + 4, cb, B.brassDk); loco.box(TRX, ly + 2, cb + 8, TRX, ly + 2, lb - 1, B.iron);
      const run = PZ0 + 18 - LZf;                                            // 승강장 가운데에 선다
      acts.push({
        name: '증기 열차', hint: '기관차가 기적을 울리며 승강장에 섰다가 철로를 따라 남쪽 끝 너머로 떠나고, 기관고 앞에 다시 나타나요', hit: [TRX - 3, ly, cb, TRX + 3, ly + 12, LZf + 1],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([TRX + 0.5, ly + 13, LZf - 2.5], { n: 22, colors: ['#ffffff', '#d8d0c8'], speed: 2, up: 6, life: 1.6, gravity: -0.6, spread: 1 }); await a.wait(0.35); }
          a.flash('depot', 2, 6);
          const steps = 6;
          for (let k = 1; k <= steps; k++) {
            await a.drive('loco', [[0, 0, run * k / steps]], 4.2 / steps, { fwd: '+z' });
            a.burst([TRX + 0.5, ly + 13, LZf - 2.5 + run * k / steps], { n: 14, colors: ['#ffffff', '#e8e0d8'], speed: 2, up: 5, life: 1.4, gravity: -0.6, spread: 1 });
          }
          a.burst([TRX + 0.5, ly + 1, LZf + run], { n: 30, colors: ['#ffffff', '#d8d0c8'], speed: 5, up: 1, life: 1, gravity: 1, spread: 3, flat: true });
          await a.wait(1.6);
          for (let k = 0; k < 2; k++) { a.burst([TRX + 0.5, ly + 13, LZf - 2.5 + run], { n: 22, colors: ['#ffffff', '#d8d0c8'], speed: 2, up: 6, life: 1.6, gravity: -0.6, spread: 1 }); await a.wait(0.3); }
          await a.drive('loco', [[0, 0, run + 12], [0, 0, D + 14 - cb]], 3.6, { fwd: '+z', back: 1.0 });
        },
      });
      acts.push({
        name: '급수탑', hint: '급수탑의 관이 철로 위로 내려와 물을 쏟아요', hit: [WX - 6, wt - 1, WZ - 5, WX + 5, wTop + 1, WZ + 5],
        run: async a => {
          await a.turn('spout', [0, 0, 0], 1.2);
          for (let k = 0; k < 9; k++) { a.burst([WX - 10.5, wt + 2, WZ + 0.5], { n: 26, colors: ['#a0e8ff', '#e0ffff', '#5ac8e8'], speed: 1.5, up: -6, life: 1, gravity: 14, spread: 0.6 }); await a.wait(0.3); }
          a.burst([TRX + 0.5, LO + 2, WZ + 0.5], { n: 36, colors: ['#a0e8ff', '#ffffff'], speed: 5, up: 1, life: 0.9, gravity: 6, spread: 2, flat: true });
          await a.turn('spout', [0, 0, -1.2], 1.2);
        },
      });
      landmarks.push({ name: '태엽 정거장', note: '증기 기관차가 화물을 싣고 오가는 새 정거장', p: [TRX - 8, py + 16, PZ0 + 14], tag: 'NEW' });
      landmarks.push({ name: '급수탑', note: '기관차에 물을 대는 구리 관', p: [WX + 0.5, wTop + 6, WZ + 0.5] });

      // ══════════ 새 구역: 별시계 관측소(윗단 동쪽) ══════════
      const OBX = 152, OBZ = 34, oby = UP + 1, obH = 12;
      MH.circle(w, OBX, OBZ, 13, B.brass); MH.circle(w, OBX, OBZ, 11, B.curb);
      w.cyl(OBX, OBZ, oby, oby, 9.4, B.found);
      for (let y = oby + 1; y <= oby + obH; y++) { w.ring(OBX, OBZ, y, 6.2, 7.4, y % 4 === 0 ? B.brassDk : B.brick); }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = Math.round(OBX + Math.cos(a) * 7), z = Math.round(OBZ + Math.sin(a) * 7); w.box(x, oby + 1, z, x, oby + obH, z, B.found); const a2 = a + Math.PI / 8, wx = Math.round(OBX + Math.cos(a2) * 7.2), wz = Math.round(OBZ + Math.sin(a2) * 7.2); w.box(wx, oby + 5, wz, wx, oby + 8, wz, B.win); }
      w.box(OBX - 1, oby + 1, OBZ + 7, OBX + 1, oby + 4, OBZ + 7, B.door); w.box(OBX - 2, oby + 5, OBZ + 7, OBX + 2, oby + 5, OBZ + 7, B.brass);
      w.cyl(OBX, OBZ, oby + obH + 1, oby + obH + 1, 8.6, B.brassDk); w.ring(OBX, OBZ, oby + obH + 2, 7.6, 8.6, B.iron);
      for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; w.set(Math.round(OBX + Math.cos(a) * 8.1), oby + obH + 3, Math.round(OBZ + Math.sin(a) * 8.1), B.brass); }
      const sky0 = oby + obH + 1;
      w.cyl(OBX, OBZ, sky0 + 1, sky0 + 1, 2.4, B.brass); w.box(OBX, sky0 + 2, OBZ, OBX, sky0 + 3, OBZ, B.brassDk);
      const SY = sky0 + 11;
      w.sphere(OBX, SY, OBZ, 2.2, B.runeO);
      const orb = [['orb1', 7.6, 'xz', B.brass, B.rune, 0.5], ['orb2', 6.4, 'xy', B.copper, B.runeO, -0.35], ['orb3', 5.2, 'yz', B.verd, B.rune, 0.7]];
      for (const [nm, r, pl, b, mk, sp] of orb) { const p = w.prop({ name: nm, pivot: [OBX + 0.5, SY + 0.5, OBZ + 0.5], axis: pl === 'xz' ? 'y' : pl === 'xy' ? 'x' : 'z', speed: sp }); MH.ringProp(p, OBX, SY, OBZ, r, pl, b, mk, 4); }
      const planets = w.prop({ name: 'planets', pivot: [OBX + 0.5, SY + 0.5, OBZ + 0.5], axis: 'y', speed: 0.3 });
      for (let k = 0; k < 4; k++) { const a = k * 1.57 + 0.4, x = Math.round(OBX + Math.cos(a) * 10), z = Math.round(OBZ + Math.sin(a) * 10); planets.box(x, SY - 1 + (k % 2) * 2, z, x, SY + (k % 2) * 2, z, [B.rune, B.note, B.runeO, B.face][k]); }
      lights.push({ name: 'star', p: [OBX + 0.5, SY, OBZ + 0.5], c: '#ffc860', i: 1.6, d: 26, flicker: 0.08 });
      // 망원경(부품): 관측소 옆 받침대에서 하늘을 겨눈다
      const TLX = OBX - 12, TLZ = OBZ + 12, tly = UP + 1;
      w.box(TLX - 1, tly, TLZ - 1, TLX + 1, tly, TLZ + 1, B.found); w.box(TLX, tly + 1, TLZ, TLX, tly + 4, TLZ, B.iron);
      const scope = w.prop({ name: 'scope', pivot: [TLX + 0.5, tly + 5.5, TLZ + 0.5], axis: 'x', rot0: [0.5, 0, 0] });
      scope.box(TLX, tly + 5, TLZ - 4, TLX, tly + 5, TLZ + 3, B.brass); scope.box(TLX, tly + 5, TLZ - 5, TLX, tly + 6, TLZ - 5, B.copper); scope.set(TLX, tly + 6, TLZ - 2, B.brassDk); scope.set(TLX, tly + 5, TLZ - 6, B.rune);
      for (let k = 0; k < 4; k++) clutter(OBX + 9 + (k % 2) * 3, OBZ + 12 + (k >> 1) * 3, k);
      planter(OBX - 10, OBZ - 12, UP + 1, 8, true);
      acts.push({
        name: '별시계', hint: '혼천의의 고리들이 빠르게 돌고 망원경이 하늘을 겨누며 별빛이 쏟아져요', hit: [OBX - 8, SY - 8, OBZ - 8, OBX + 8, SY + 8, OBZ + 8],
        run: async a => {
          a.flash('star', 3, 6); a.glow(1.6, 6);
          a.spin('orb1', 6, 6); a.spin('orb2', 6, 6); a.spin('orb3', 6, 6); a.spin('planets', 8, 6);
          a.turn('scope', [-0.6, 0, 0], 1.6);
          for (let k = 0; k < 10; k++) { a.burst([OBX + 0.5, SY, OBZ + 0.5], { n: 26, colors: ['#ffc860', '#fff0c0', '#5affff'], speed: 9, up: 2, life: 1.8, gravity: 0.3, spread: 2 }); await a.wait(0.5); }
          await a.turn('scope', [0.5, 0, 0], 1.4);
        },
      });
      landmarks.push({ name: '별시계 관측소', note: '별의 시간을 재는 놋쇠 혼천의', p: [OBX + 0.5, SY + 12, OBZ + 0.5], tag: 'NEW' });

      // 부품 노점 줄(아랫단 남쪽)과 가로수
      [[44, 150], [52, 150], [60, 150], [44, 160], [52, 160], [100, 160], [108, 160]].forEach(([x, z], k) => MH.stall(w, x, z, { sx: 6, sz: 5, m: { post: B.iron, counter: B.plank, goods: [B.brass, B.copper, B.verd, B.runeO], crate: B.crate, a1: k % 2 ? B.paintR : B.paint, a2: B.canvas } }));
      for (const [x, z, y] of [[46, 100, LO], [74, 150, LO], [120, 150, LO], [20, 120, LO], [58, 40, UP], [100, 40, UP], [24, 60, UP], [132, 100, LO]]) {
        if (w.get(x, y + 1, z)) continue;
        w.box(x - 1, y + 1, z - 1, x + 1, y + 1, z + 1, B.brassDk); w.set(x, y + 1, z, B.dirt);
        MH.tree(w, x, y + 2, z, { kind: 'oak', h: 6, bark: B.plank, leaves: [B.leafL, B.leaf, B.leaf], r: 2.6 });
      }
      // 바닥 잔손질: 하수구 격자·볼트
      MH.scatter(w, 900, (x, g, z, b) => { if ((b === B.plate || b === B.cob) && w.chance(0.12)) w.set(x, g, z, w.chance(0.5) ? B.ironDk : B.curb); });
      return { lights, landmarks, acts, particles: steam };
    },
  });
})();
