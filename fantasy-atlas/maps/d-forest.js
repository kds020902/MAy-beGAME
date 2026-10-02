// 썩은 숲 — 독 늪 분지, 얼굴 있는 천년 고목, 버섯 군락, 거미 둥지 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'forest', cat: 'dungeon', name: '썩은 숲', en: 'Rotting Wood', color: '#7fa66b', seed: 23, base: 24, time: 'day',
    desc: '포자와 독이 뒤덮은 숲. 나무조차 사냥감을 기다린다.',
    monsters: { normal: ['광기의 늑대인간', '썩은 버섯괴물', '독거미 무리'], mid: '거미 여왕', boss: '고목의 마녀' },
    sky: ['#0e150f', '#26331f', '#56682c'], stars: false,
    hemi: ['#b0cc92', '#1f1a12', 0.66], sun: ['#e6e0a8', 0.72, [0.5, 1, 0.45]],
    night: { sky: ['#060a08', '#0c1410', '#1e3a24'], stars: true, hemi: ['#6a9a80', '#0c0e0a', 0.42], sun: ['#9ac8b0', 0.3, [0.5, 1, 0.45]], haze: '#16261c' },
    liquid: ['#18301a', '#355f25', '#b6e866'], liqSpeed: 0.6,
    fog: { start: 0.68, floor: 16, depth: 10, haze: [28, 0.4, 6], hazeColor: '#3e5234' },
    camY: 8,
    particles: [
      { n: 380, colors: ['#d4f07a', '#a6d05a', '#f0e6a0'], mode: 'drift', speed: 0.35, y0: 26, y1: 70 },
      { n: 90, colors: ['#f7ff9a', '#c8ff6a'], mode: 'wisp', speed: 0.8, size: 2, y0: 28 },
    ],
    blocks: {
      moss: { c: '#3a2e24', top: '#3c5a2b', v: 0.1 }, sick: { c: '#3a2e24', top: '#66782c', v: 0.1 }, fung: { c: '#3a2e24', top: '#5a3a5f', v: 0.1 },
      mud: { c: '#2c2a1c', top: '#38361f', v: 0.08 }, soil: { c: '#382a20', v: 0.08 },
      rock: { c: '#4a504a', v: 0.06, pat: 'stone' }, rockDk: { c: '#333833', v: 0.06, pat: 'stone' },
      bark: { c: '#3b2a20', v: 0.08 }, barkDk: { c: '#261b15', v: 0.07 }, barkM: { c: '#4a3a2a', v: 0.08 },
      leaf: { c: '#2a4a2c', v: 0.1 }, leaf2: { c: '#35502a', v: 0.1 }, leafDk: { c: '#1c3020', v: 0.08 }, leafP: { c: '#4a2e56', v: 0.1 },
      vine: { c: '#2f4a26', v: 0.1 }, hang: { c: '#4a6a34', v: 0.1 },
      stem: { c: '#cfc5ad', v: 0.05 }, gill: { c: '#9a8a74', v: 0.05 }, cap: { c: '#8c2c4a', v: 0.07 }, cap2: { c: '#3a6d78', v: 0.07 }, capDk: { c: '#5a1a30', v: 0.06 },
      web: { c: '#d2cfc2', v: 0.04 }, egg: { c: '#e7e0c6', v: 0.05 }, bone: { c: '#d8d0bc', v: 0.05 }, hole: { c: '#0e0c0a', v: 0 },
      plank: { c: '#5a4a32', v: 0.08, pat: 'plank' }, post: { c: '#3a2e22', v: 0.05 }, rope: { c: '#8a7a5a', v: 0.05 }, thatch: { c: '#5a5230', v: 0.08, pat: 'tile' },
      lily: { c: '#4a7a3a', v: 0.1 }, reed: { c: '#6a7a3a', v: 0.1 }, reedTop: { c: '#8a6a3a', v: 0.08 }, pot: { c: '#2a2a2c', v: 0.04 },
      spot: { c: '#f2f7a0', glow: true }, eye: { c: '#ffd54a', glow: true }, gmush: { c: '#8ff5dc', glow: true },
      lamp: { c: '#ffd890', night: true, day: '#6a5a3a' }, brew: { c: '#9aff6a', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, lvl = base + 1;
      const TX = 62, TZ = 44;
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const d = Math.hypot(x - 64, z - 72) / 66;
          const bowl = Math.pow(d, 2.2) * 18;
          const hum = (n.fbm(x * 0.055, z * 0.055) - 0.5) * 9 + (n.ridge(x * 0.04 + 3, z * 0.04, 3) - 0.4) * 5;
          const rise = Math.max(0, 13 - Math.hypot(x - TX, z - TZ) * 0.42);
          return base - 5 + bowl + hum + rise;
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : y <= lvl ? B.mud : y <= lvl + 1 ? (hash3(x, y, z) > 0.5 ? B.mud : B.moss) : (() => { const f = n.fbm(x * 0.1 + 40, z * 0.1, 2); return f > 0.62 ? B.sick : f < 0.36 ? B.fung : B.moss; })(),
        under: (x, z, y, dep) => dep < 3 ? B.soil : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, lvl);
      const lights = [], acts = [], landmarks = [];
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;

      // ── 천년 고목 ──
      const g = MH.g(w, TX, TZ) + 1, TH = 44;
      for (let y = g - 3; y < g + TH; y++) {
        const t = (y - g) / TH, r = 6.6 - t * 3.2 + (y < g + 4 ? 1.6 : 0);
        const ox = Math.round(Math.sin(y * 0.1) * 1.6), oz = Math.round(Math.cos(y * 0.08) * 1);
        const R = Math.ceil(r);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const dd = Math.hypot(dx, dz) + (hash3(dx + 9, y, dz) - 0.5) * 0.8;
          if (dd <= r) w.set(TX + ox + dx, y, TZ + oz + dz, hash3(TX + dx, y >> 1, TZ + dz) > 0.72 ? B.barkDk : (Math.abs(Math.sin(Math.atan2(dz, dx) * 6 + y * 0.18)) < 0.25 ? B.barkM : B.bark));
        }
      }
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2 + 0.2, l = w.r(14, 20);
        const ex = TX + Math.cos(a) * l, ez = TZ + Math.sin(a) * l;
        const eg = Math.max(lvl - 1, MH.g(w, Math.round(ex), Math.round(ez)));
        w.line(TX, g + 6, TZ, (TX + ex) / 2, g + 1, (TZ + ez) / 2, B.barkDk, t => 2.6 - t * 0.7);
        w.line((TX + ex) / 2, g + 1, (TZ + ez) / 2, ex, eg, ez, B.bark, t => 1.8 - t * 1.1);
      }
      // 얼굴(남쪽): 눈구멍과 빛나는 눈, 벌어진 입과 이빨
      const fz = TZ + 6;
      for (const ex of [TX - 4, TX + 2]) {
        w.box(ex, g + 19, fz - 2, ex + 2, g + 22, fz + 1, B.hole);
        w.box(ex, g + 20, fz - 2, ex + 2, g + 21, fz - 2, B.eye); w.set(ex + 1, g + 20, fz - 1, B.hole);
        w.box(ex - 1, g + 23, fz, ex + 3, g + 23, fz + 1, B.barkDk);
      }
      for (let x = TX - 5; x <= TX + 5; x++) for (let y = g + 9; y <= g + 15; y++) {
        const edge = Math.abs(x - TX) === 5 || y === g + 9 || y === g + 15;
        w.set(x, y, fz, edge ? B.barkDk : B.hole); w.set(x, y, fz - 1, B.hole);
        if (!edge && (y === g + 14 || y === g + 10) && x % 2 === 0) w.set(x, y, fz, B.bone);
      }
      lights.push({ name: 'eyes', p: [TX + 0.5, g + 20, fz + 1], c: '#ffd04a', i: 0.9, d: 20, flicker: 0.2 });
      // 가지와 수관 — 두 가지는 흔들리는 부품(뿌리가 줄기에 묻혀 있어 겹침 허용)
      [[0.3, 14], [1.3, 13], [2.4, 15], [3.4, 13], [4.4, 14], [5.4, 13]].forEach(([a, l], k) => {
        const sy = g + 27 + (k % 3) * 2, ex = TX + Math.cos(a) * l, ez = TZ + Math.sin(a) * l, ey = sy + w.r(7, 11);
        const target = k === 0 ? w.prop({ name: 'armA', pivot: [TX + 0.5, sy, TZ + 0.5], axis: 'z', clipOK: 400 }) : k === 3 ? w.prop({ name: 'armB', pivot: [TX + 0.5, sy, TZ + 0.5], axis: 'x', clipOK: 400 }) : w;
        target.line(TX, sy, TZ, ex, ey, ez, B.bark, t => 2.1 - t * 1.3);
        const L = k % 2 ? [B.leaf2, B.leaf, B.leafDk, B.leafP] : [B.leaf2, B.leaf, B.leafDk];
        MH.leafBlob(target, Math.round(ex), Math.round(ey) + 2, Math.round(ez), 8, 5, 8, L);
        for (let s = 0; s < 16; s++) {
          const aa = w.r(0, Math.PI * 2), rr = w.r(3, 8), hx = Math.round(ex + Math.cos(aa) * rr), hz = Math.round(ez + Math.sin(aa) * rr);
          const len = w.ri(2, 7);
          for (let q = 0; q < len; q++) target.set(hx, Math.round(ey) - 2 - q, hz, q > len - 3 ? B.vine : B.hang);
        }
      });
      MH.leafBlob(w, TX, g + TH + 4, TZ, 9, 6, 9, [B.leaf2, B.leaf, B.leafDk, B.leafP]);
      acts.push({
        name: '고목의 눈', hint: '마녀가 눈을 뜨고 가지를 휘둘러요', hit: [TX - 6, g + 8, fz - 2, TX + 6, g + 24, fz + 2],
        run: async a => {
          a.flash('eyes', 6, 3.6); a.glow(1.6, 3.6);
          for (let k = 0; k < 3; k++) {
            await Promise.all([a.turn('armA', [0, 0, 0.1], 0.5), a.turn('armB', [-0.1, 0, 0], 0.5)]);
            a.burst([TX + 12, g + 38, TZ + 6], { n: 30, colors: ['#35502a', '#4a6a34', '#66782c'], speed: 4, up: 1, life: 2.6, gravity: 1.5, spread: 6 });
            await Promise.all([a.turn('armA', [0, 0, -0.08], 0.5), a.turn('armB', [0.08, 0, 0], 0.5)]);
          }
          await Promise.all([a.turn('armA', [0, 0, 0], 0.6), a.turn('armB', [0, 0, 0], 0.6)]);
        },
      });
      landmarks.push({ name: '천년 고목', note: '보스 · 고목의 마녀', p: [TX + 0.5, g + TH + 12, TZ + 0.5], boss: true });

      // ── 거대 버섯 군락(서쪽) ──
      const mush = (tw, cx, cz, h, R, cap) => {
        const gy = Math.max(lvl, MH.g(w, cx, cz)) + 1;
        for (let y = gy; y < gy + h; y++) tw.cyl(cx, cz, y, y, y < gy + 2 ? 2.4 : 1.6, B.stem);
        tw.ring(cx, cz, gy + Math.round(h * 0.6), 1.2, 3, B.gill);
        tw.ellipsoid(cx, gy + h, cz, R, R * 0.6, R, cap, (dx, dy) => dy >= 0);
        tw.ring(cx, cz, gy + h, R - 1.6, R, B.capDk);
        tw.cyl(cx, cz, gy + h - 1, gy + h - 1, R - 1.2, B.gill);
        for (let k = 0; k < R * 5; k++) {
          const a = w.r(0, Math.PI * 2), rr = w.r(0.3, 0.9) * R, sx = Math.round(cx + Math.cos(a) * rr), sz = Math.round(cz + Math.sin(a) * rr);
          let sy = gy + h + Math.ceil(R * 0.6);
          while (sy > gy + h && !tw.get(sx, sy, sz)) sy--;
          if (tw.get(sx, sy, sz) === cap) tw.set(sx, sy, sz, B.spot);
        }
        return gy + h;
      };
      const MX = 30, MZ = 80;
      MH.flatten(w, MX - 3, MZ - 3, MX + 3, MZ + 3, Math.max(lvl + 1, MH.g(w, MX, MZ)), B.moss, B.soil);
      const big = w.prop({ name: 'shroom', pivot: [MX + 0.5, MH.g(w, MX, MZ) + 1, MZ + 0.5], axis: 'x' });
      const bigTop = mush(big, MX, MZ, 22, 9, B.cap);
      lights.push({ name: 'spore', p: [MX + 0.5, bigTop + 3, MZ + 0.5], c: '#e0f080', i: 1, d: 20, flicker: 0.1, srcR: 8 });
      for (const [mx, mz, h, R, c] of [[42, 92, 13, 5.5, B.cap2], [18, 94, 10, 4.5, B.cap], [22, 66, 9, 4, B.cap2], [40, 70, 7, 3.5, B.cap], [84, 28, 15, 6, B.cap2], [96, 40, 9, 4, B.cap], [108, 108, 12, 5, B.cap]]) {
        const top = mush(w, mx, mz, h, R, c);
        if (c === B.cap2) lights.push({ p: [mx + 0.5, top + 2, mz + 0.5], c: '#7ff0d0', i: 1.1, d: 15, flicker: 0.05, srcR: 7 });
      }
      acts.push({
        name: '거대 버섯', hint: '갓이 흔들리며 포자를 뿜어요', hit: [MX - 8, bigTop - 2, MZ - 8, MX + 8, bigTop + 6, MZ + 8],
        run: async a => {
          a.flash('spore', 4, 2.6);
          for (let k = 0; k < 3; k++) {
            await a.turn('shroom', [0.07, 0, 0], 0.28);
            a.burst([MX + 0.5, bigTop + 3, MZ + 0.5], { n: 80, colors: ['#e0f080', '#f7ff9a', '#b8e050'], speed: 8, up: 5, life: 3, gravity: 0.4, spread: 6 });
            await a.turn('shroom', [-0.07, 0, 0], 0.32);
          }
          await a.turn('shroom', [0, 0, 0], 0.5);
        },
      });
      landmarks.push({ name: '포자 군락', note: '썩은 버섯괴물 출몰', p: [MX + 0.5, bigTop + 10, MZ + 0.5] });

      // ── 거미 여왕의 둥지(동쪽) ──
      const SX = 100, SZ = 76;
      const tops = [[92, 66, 22], [110, 68, 19], [94, 88, 18], [112, 86, 23]].map(([px, pz, h]) => { const gy = Math.max(lvl, MH.g(w, px, pz)) + 1; MH.tree(w, px, gy, pz, { kind: 'dead', h, bark: B.barkDk, spread: 5, trunkR: 1.4 }); return [px, gy + h - 3, pz]; });
      const sg = Math.max(lvl, MH.g(w, SX, SZ)) + 1;
      for (let i = 0; i < tops.length; i++) for (let j = i + 1; j < tops.length; j++) {
        const [ax, ay, az] = tops[i], [bx, by, bz] = tops[j];
        w.line(ax, ay, az, bx, by - 3, bz, B.web); w.line(ax, ay - 7, az, bx, by, bz, B.web);
        for (let t = 0.2; t < 0.9; t += 0.18) w.line(ax + (bx - ax) * t, ay + (by - 3 - ay) * t, az + (bz - az) * t, SX, sg + 6, SZ, B.web);
      }
      w.sphere(SX, sg, SZ, 6.5, B.web, (dx, dy, dz) => dy >= 0 && (Math.hypot(dx, dy, dz) > 5.4 || dy === 0) && hash3(dx, dy, dz) > 0.2);
      w.box(SX - 1, sg, SZ + 5, SX + 1, sg + 3, SZ + 7, B.hole);
      for (const [cx, cy, cz] of [[95, 17, 68], [108, 14, 84], [102, 18, 66], [110, 12, 72]]) { w.ellipsoid(cx, sg + cy, cz, 1.2, 2.4, 1.2, B.web); w.line(cx, sg + cy + 2, cz, cx, sg + cy + 6, cz, B.web); }
      const EX = 88, EZ = 78, eg2 = Math.max(lvl, MH.g(w, EX, EZ)) + 1;
      MH.flatten(w, EX - 4, EZ - 4, EX + 4, EZ + 4, eg2 - 1, B.moss, B.soil);
      const eggs = w.prop({ name: 'eggs', pivot: [EX + 0.5, eg2, EZ + 0.5], axis: 'z' });
      for (const [ex, ez] of [[EX - 2, EZ - 1], [EX, EZ + 2], [EX + 2, EZ - 2], [EX + 1, EZ], [EX - 2, EZ + 2], [EX - 3, EZ - 3]]) { eggs.ellipsoid(ex, eg2 + 1, ez, 1.1, 1.8, 1.1, B.egg); eggs.set(ex, eg2 + 3, ez, B.web); }
      acts.push({
        name: '거미 알 무더기', hint: '알이 떨리더니 새끼 거미가 쏟아져요', hit: [EX - 4, eg2, EZ - 4, EX + 3, eg2 + 4, EZ + 3],
        run: async a => {
          for (let k = 0; k < 6; k++) { await a.tween('eggs', { rot: [0, 0, 0.12], scl: [1.1, 1.22, 1.1] }, 0.1); await a.tween('eggs', { rot: [0, 0, -0.12], scl: [1, 1, 1] }, 0.1); }
          await a.tween('eggs', { rot: [0, 0, 0], scl: [1.18, 0.8, 1.18] }, 0.12); await a.tween('eggs', { scl: [1, 1, 1] }, 0.25);
          for (let k = 0; k < 3; k++) { a.burst([EX + 0.5, eg2 + 2, EZ + 0.5], { n: 50, colors: ['#1a1616', '#2a2420', '#e7e0c6'], speed: 8, up: 2, life: 2.2, gravity: 5, spread: 3, flat: true }); await a.wait(0.35); }
        },
      });
      landmarks.push({ name: '거미 여왕의 둥지', note: '중간 보스 · 거미 여왕', p: [SX + 0.5, sg + 26, SZ + 0.5], mid: true });

      // ── 늑대 굴(북서쪽 바위) ──
      const WX = 20, WZ = 34, wg = MH.g(w, WX, WZ);
      for (const [rx, rz, r] of [[20, 32, 9], [11, 40, 6], [29, 26, 6], [13, 24, 5], [27, 38, 4]]) MH.rock(w, rx, wg + 3, rz, r, B.rock, B.moss, B.rockDk);
      w.ellipsoid(WX + 1, wg + 3, WZ + 6, 4, 4, 5, 0, (dx, dy) => dy >= -2);
      w.box(WX - 2, wg, WZ + 3, WX + 4, wg, WZ + 10, B.hole);
      for (let i = 0; i < 14; i++) w.fill(WX + w.ri(-4, 6), wg + 1, WZ + w.ri(10, 15), B.bone);
      landmarks.push({ name: '늑대 굴', note: '광기의 늑대인간 은신처', p: [WX + 0.5, wg + 17, WZ + 0.5] });

      // ── 늪을 건너는 판자길 ──
      const walk = [[68, 126], [70, 110], [62, 96], [68, 80], [63, 62]];
      for (let i = 0; i < walk.length - 1; i++) {
        const [ax, az] = walk[i], [bx, bz] = walk[i + 1], nn = Math.ceil(Math.hypot(bx - ax, bz - az));
        for (let s = 0; s <= nn; s++) {
          const cx = Math.round(ax + (bx - ax) * s / nn), cz = Math.round(az + (bz - az) * s / nn);
          for (let k = -1; k <= 2; k++) {
            const x = cx + k;
            if (MH.g(w, x, cz) > lvl + 1) continue;
            w.set(x, lvl + 1, cz, B.plank);
            if ((k === -1 || k === 2) && s % 4 === 0) for (let y = MH.g(w, x, cz) + 1; y <= lvl + 3; y++) w.set(x, y, cz, B.post);
            if (k === 2 && s % 4 !== 0) w.set(x, lvl + 3, cz, B.rope);
          }
        }
      }
      // ── 늪 위 기둥 오두막(마녀의 약초막) ──
      const HX = 84, HZ = 104, hy = lvl + 5;
      for (const [px, pz] of [[HX, HZ], [HX + 9, HZ], [HX, HZ + 8], [HX + 9, HZ + 8]]) for (let y = Math.min(lvl, MH.g(w, px, pz)) ; y < hy; y++) w.set(px, y, pz, B.post);
      w.box(HX - 1, hy - 1, HZ - 1, HX + 10, hy - 1, HZ + 9, B.plank);
      const hut = MH.house(w, { x: HX + 1, z: HZ + 1, sx: 8, sz: 6, fh: 5, face: 'w', y: hy - 1, m: { found: B.plank, wall: B.plank, frame: B.post, win: B.lamp, sill: B.post, door: B.post, roof: B.thatch, eave: B.barkDk, ridge: B.post, lamp: B.lamp } });
      for (let s = 0; s <= 5; s++) { w.box(HX - 2 - s, hy - 1 - s + (s > 3 ? s - 3 : 0), HZ + 3, HX - 2 - s, hy - 1 - s + (s > 3 ? s - 3 : 0), HZ + 5, B.plank); }
      for (let x = HX - 8; x >= 72; x--) for (const dz of [3, 4, 5]) if (MH.g(w, x, HZ + dz) <= lvl + 1) w.set(x, lvl + 1, HZ + dz, B.plank);
      w.box(HX + 6, hy, HZ - 1, HX + 7, hy + 1, HZ - 1, B.pot); w.set(HX + 6, hy + 2, HZ - 1, B.brew);
      lights.push({ p: [HX - 0.5, hy + 4, HZ + 4.5], c: '#ffd080', i: 1.2, d: 14, flicker: 0.25, night: true });
      lights.push({ p: [HX + 6.5, hy + 3, HZ - 0.5], c: '#90ff60', i: 0.8, d: 10, flicker: 0.3 });
      landmarks.push({ name: '늪 위 약초막', note: '누군가 끓이다 만 솥이 있다', p: [HX + 5, hut.peak + 5, HZ + 4] });
      // ── 늪 장식: 뒤틀린 나무, 수련, 갈대, 발광 버섯, 쓰러진 통나무 ──
      for (let i = 0; i < 46; i++) {
        const x = w.ri(4, 123), z = w.ri(4, 123), gy = MH.g(w, x, z);
        if (gy <= lvl || Math.hypot(x - TX, z - TZ) < 22 || Math.hypot(x - SX, z - SZ) < 18 || Math.hypot(x - MX, z - MZ) < 12 || Math.hypot(x - HX - 4, z - HZ - 4) < 12 || w.get(x, gy + 1, z)) continue;
        MH.tree(w, x, gy + 1, z, { kind: i % 3 ? 'willow' : 'twisted', h: w.ri(10, 17), bark: B.bark, barkDk: B.barkDk, leaves: [B.leaf2, B.leaf, B.leafDk], r: w.r(3.4, 5), spread: 5, trunkR: 1.3 });
      }
      MH.scatter(w, 2400, (x, gy, z, b) => {
        if ((wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1)) && w.chance(0.4)) { w.box(x, gy + 1, z, x, gy + w.ri(2, 3), z, B.reed); w.set(x, gy + 4, z, B.reedTop); }
        else if (b === B.moss && w.chance(0.25)) w.set(x, gy + 1, z, w.chance(0.12) ? B.gmush : B.vine);
      });
      for (let i = 0; i < 300; i++) { const x = w.ri(2, 125), z = w.ri(2, 125); if (wet(x, z) && !w.get(x, lvl + 1, z) && w.chance(0.5)) w.set(x, lvl + 1, z, B.lily); }
      for (let i = 0; i < 10; i++) { const x = w.ri(16, 110), z = w.ri(56, 118); const a = w.r(0, 3.14); if (wet(x, z)) w.line(x, lvl + 1, z, x + Math.cos(a) * 9, lvl + 1, z + Math.sin(a) * 9, B.barkDk, 0.9); }
      landmarks.push({ name: '독 늪', note: '판자길만이 안전하다', p: [68.5, lvl + 10, 108.5] });
      return { lights, landmarks, acts };
    },
  });
})();
