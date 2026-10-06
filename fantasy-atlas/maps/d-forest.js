// 썩은 숲 — 독 늪 분지, 얼굴 있는 천년 고목, 버섯 군락, 거미 둥지, 북동쪽 언덕의 이끼 덮인 환상열석 (160칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 120, K = 1.25;
  MAPS.push({
    id: 'forest', cat: 'dungeon', name: '썩은 숲', en: 'Rotting Wood', color: '#7fa66b', seed: 23, base: 24, time: 'day', size: [W, D, Hh],
    desc: '포자와 독이 뒤덮은 숲. 나무조차 사냥감을 기다린다. 북동쪽 언덕에는 옛 드루이드들이 세운 환상열석이 가시덩굴에 묻혀 있고, 늪가에는 독두꺼비가 웅크리고 있다.',
    info: { title: '장소 정보', en: 'ROTTING WOOD', rows: [['자리', '독 늪 분지 · 사방이 언덕'], ['한가운데', '얼굴 있는 천년 고목'], ['북동쪽 언덕', '이끼 덮인 환상열석 · 가시덩굴 제단']] },
    monsters: { normal: ['광기의 늑대인간', '썩은 버섯괴물', '독거미 무리', '독두꺼비'], mid: '거미 여왕', boss: '고목의 마녀' },
    sky: ['#0e150f', '#26331f', '#56682c'], stars: false,
    hemi: ['#b0cc92', '#1f1a12', 0.66], sun: ['#e6e0a8', 0.72, [0.5, 1, 0.45]],
    night: { sky: ['#060a08', '#0c1410', '#1e3a24'], stars: true, hemi: ['#6a9a80', '#0c0e0a', 0.42], sun: ['#9ac8b0', 0.3, [0.5, 1, 0.45]], haze: '#16261c' },
    liquid: ['#18301a', '#355f25', '#b6e866'], liqSpeed: 0.6,
    fog: { start: 0.76, floor: 16, depth: 10, haze: [28, 0.4, 6], hazeColor: '#3e5234' },
    camY: 4, zoom: 1.1,
    particles: [
      { n: 560, colors: ['#d4f07a', '#a6d05a', '#f0e6a0'], mode: 'drift', speed: 0.35, y0: 26, y1: 70 },
      { n: 130, colors: ['#f7ff9a', '#c8ff6a'], mode: 'wisp', speed: 0.8, size: 2, y0: 28 },
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
      spid: { c: '#1c161a', v: 0.05 }, spidR: { c: '#c02a3a', glow: true }, bat: { c: '#221a22', v: 0.04 }, weye: { c: '#ffe040', glow: true },
      // 새 재질: 선돌·룬·가시덩굴·두꺼비·판석
      menhir: { c: '#6a6e66', v: 0.06, pat: 'big' }, menhirM: { c: '#4e6a3e', v: 0.08 }, rune: { c: '#7affc8', glow: true }, altar: { c: '#5a5c58', v: 0.05, pat: 'stone' },
      thorn: { c: '#3a2a22', v: 0.06 }, thornL: { c: '#5a3a5a', v: 0.08 }, berry: { c: '#d8406a', glow: true }, slate: { c: '#4a4e48', top: '#5e645a', v: 0.08, pat: 'stone' },
      toad: { c: '#5a6a2a', v: 0.08 }, toadB: { c: '#c8c070', v: 0.06 }, toadS: { c: '#8a9a3a', v: 0.08 }, herb: { c: '#7a8a4a', v: 0.08 }, skull: { c: '#e0d8c4', v: 0.04 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, lvl = base + 1;
      const TX = 78, TZ = 55, RCX = 118, RCZ = 33;   // 고목, 환상열석 언덕
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          const tx = x, tz = z; x /= K; z /= K;
          const d = Math.hypot(x - 64, z - 72) / 66;
          const bowl = Math.pow(d, 2.2) * 18;
          const hum = (n.fbm(x * 0.055, z * 0.055) - 0.5) * 9 + (n.ridge(x * 0.04 + 3, z * 0.04, 3) - 0.4) * 5;
          const rise = Math.max(0, 13 - Math.hypot(tx - TX, tz - TZ) * 0.36);
          const knoll = Math.max(0, 7 - Math.hypot(tx - RCX, tz - RCZ) * 0.3);
          return base - 5 + bowl + hum + rise + knoll;
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : y <= lvl ? B.mud : y <= lvl + 1 ? (hash3(x, y, z) > 0.5 ? B.mud : B.moss) : (() => { const f = n.fbm(x * 0.08 + 40, z * 0.08, 2); return f > 0.62 ? B.sick : f < 0.36 ? B.fung : B.moss; })(),
        under: (x, z, y, dep) => dep < 3 ? B.soil : (y % 5 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, lvl);
      const lights = [], acts = [], landmarks = [];
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;

      // ── 천년 고목 ──
      const g = MH.g(w, TX, TZ) + 1, TH = 52;
      for (let y = g - 3; y < g + TH; y++) {
        const t = (y - g) / TH, r = (6.6 - t * 3.2 + (y < g + 4 ? 1.6 : 0)) * 1.2;
        const ox = Math.round(Math.sin(y * 0.1) * 1.6), oz = Math.round(Math.cos(y * 0.08) * 1);
        const R = Math.ceil(r);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const dd = Math.hypot(dx, dz) + (hash3(dx + 9, y, dz) - 0.5) * 0.8;
          if (dd <= r) w.set(TX + ox + dx, y, TZ + oz + dz, hash3(TX + dx, y >> 1, TZ + dz) > 0.72 ? B.barkDk : (Math.abs(Math.sin(Math.atan2(dz, dx) * 6 + y * 0.18)) < 0.25 ? B.barkM : B.bark));
        }
      }
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2 + 0.2, l = w.r(16, 25);
        const ex = TX + Math.cos(a) * l, ez = TZ + Math.sin(a) * l;
        const eg = Math.max(lvl - 1, MH.g(w, Math.round(ex), Math.round(ez)));
        w.line(TX, g + 6, TZ, (TX + ex) / 2, g + 1, (TZ + ez) / 2, B.barkDk, t => 2.6 - t * 0.7);
        w.line((TX + ex) / 2, g + 1, (TZ + ez) / 2, ex, eg, ez, B.bark, t => 1.8 - t * 1.1);
      }
      // 얼굴(남쪽): 눈구멍과 빛나는 눈, 벌어진 입과 이빨
      const fz = TZ + 7;
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
      [[0.3, 17], [1.3, 16], [2.4, 18], [3.4, 16], [4.4, 17], [5.4, 16]].forEach(([a, l], k) => {
        const sy = g + 32 + (k % 3) * 2, ex = TX + Math.cos(a) * l, ez = TZ + Math.sin(a) * l, ey = sy + w.r(7, 11);
        const target = k === 0 ? w.prop({ name: 'armA', pivot: [TX + 0.5, sy, TZ + 0.5], axis: 'z', clipOK: 400 }) : k === 3 ? w.prop({ name: 'armB', pivot: [TX + 0.5, sy, TZ + 0.5], axis: 'x', clipOK: 400 }) : w;
        target.line(TX, sy, TZ, ex, ey, ez, B.bark, t => 2.1 - t * 1.3);
        const L = k % 2 ? [B.leaf2, B.leaf, B.leafDk, B.leafP] : [B.leaf2, B.leaf, B.leafDk];
        MH.leafBlob(target, Math.round(ex), Math.round(ey) + 2, Math.round(ez), 9, 5.5, 9, L);
        for (let s = 0; s < 16; s++) {
          const aa = w.r(0, Math.PI * 2), rr = w.r(3, 8), hx = Math.round(ex + Math.cos(aa) * rr), hz = Math.round(ez + Math.sin(aa) * rr);
          const len = w.ri(2, 7);
          for (let q = 0; q < len; q++) target.set(hx, Math.round(ey) - 2 - q, hz, q > len - 3 ? B.vine : B.hang);
        }
      });
      MH.leafBlob(w, TX, g + TH + 4, TZ, 11, 7, 11, [B.leaf2, B.leaf, B.leafDk, B.leafP]);
      acts.push({
        name: '고목의 눈', hint: '마녀가 눈을 뜨고 가지를 휘둘러요', hit: [TX - 6, g + 8, fz - 2, TX + 6, g + 24, fz + 2],
        run: async a => {
          a.flash('eyes', 6, 3.6); a.glow(1.6, 3.6);
          for (let k = 0; k < 3; k++) {
            await Promise.all([a.turn('armA', [0, 0, 0.1], 0.5), a.turn('armB', [-0.1, 0, 0], 0.5)]);
            a.burst([TX + 14, g + 44, TZ + 6], { n: 30, colors: ['#35502a', '#4a6a34', '#66782c'], speed: 4, up: 1, life: 2.6, gravity: 1.5, spread: 6 });
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
      const MX = 38, MZ = 100;
      MH.flatten(w, MX - 3, MZ - 3, MX + 3, MZ + 3, Math.max(lvl + 1, MH.g(w, MX, MZ)), B.moss, B.soil);
      const big = w.prop({ name: 'shroom', pivot: [MX + 0.5, MH.g(w, MX, MZ) + 1, MZ + 0.5], axis: 'x' });
      const bigTop = mush(big, MX, MZ, 22, 9, B.cap);
      lights.push({ name: 'spore', p: [MX + 0.5, bigTop + 3, MZ + 0.5], c: '#e0f080', i: 1, d: 20, flicker: 0.1, srcR: 8 });
      for (const [mx, mz, h, R, c] of [[52, 115, 13, 5.5, B.cap2], [22, 118, 10, 4.5, B.cap], [27, 82, 9, 4, B.cap2], [50, 88, 7, 3.5, B.cap], [96, 20, 15, 6, B.cap2], [140, 60, 9, 4, B.cap], [135, 135, 12, 5, B.cap], [26, 100, 6, 3, B.cap], [45, 128, 8, 3.5, B.cap2], [12, 70, 11, 4.5, B.cap]]) {
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
      const SX = 125, SZ = 95;
      const tops = [[SX - 10, SZ - 12, 22], [SX + 12, SZ - 10, 19], [SX - 8, SZ + 14, 18], [SX + 14, SZ + 12, 23]].map(([px, pz, h]) => { const gy = Math.max(lvl, MH.g(w, px, pz)) + 1; MH.tree(w, px, gy, pz, { kind: 'dead', h, bark: B.barkDk, spread: 5, trunkR: 1.4 }); return [px, gy + h - 3, pz]; });
      const sg = Math.max(lvl, MH.g(w, SX, SZ)) + 1;
      for (let i = 0; i < tops.length; i++) for (let j = i + 1; j < tops.length; j++) {
        const [ax, ay, az] = tops[i], [bx, by, bz] = tops[j];
        w.line(ax, ay, az, bx, by - 3, bz, B.web); w.line(ax, ay - 7, az, bx, by, bz, B.web);
        for (let t = 0.2; t < 0.9; t += 0.18) w.line(ax + (bx - ax) * t, ay + (by - 3 - ay) * t, az + (bz - az) * t, SX, sg + 6, SZ, B.web);
      }
      w.sphere(SX, sg, SZ, 6.5, B.web, (dx, dy, dz) => dy >= 0 && (Math.hypot(dx, dy, dz) > 5.4 || dy === 0) && hash3(dx, dy, dz) > 0.2);
      w.box(SX - 1, sg, SZ + 5, SX + 1, sg + 3, SZ + 7, B.hole);
      for (const [cx, cy, cz] of [[SX - 6, 17, SZ - 10], [SX + 9, 14, SZ + 10], [SX + 2, 18, SZ - 12], [SX + 12, 12, SZ - 5]]) { w.ellipsoid(cx, sg + cy, cz, 1.2, 2.4, 1.2, B.web); w.line(cx, sg + cy + 2, cz, cx, sg + cy + 6, cz, B.web); }
      const EX = 110, EZ = 98, eg2 = Math.max(lvl, MH.g(w, EX, EZ)) + 1;
      MH.flatten(w, EX - 4, EZ - 4, EX + 4, EZ + 4, eg2 - 1, B.moss, B.soil);
      const eggs = w.prop({ name: 'eggs', pivot: [EX + 0.5, eg2, EZ + 0.5], axis: 'z' });
      for (const [ex, ez] of [[EX - 2, EZ - 1], [EX, EZ + 2], [EX + 2, EZ - 2], [EX + 1, EZ], [EX - 2, EZ + 2], [EX - 3, EZ - 3]]) { eggs.ellipsoid(ex, eg2 + 1, ez, 1.1, 1.8, 1.1, B.egg); eggs.set(ex, eg2 + 3, ez, B.web); }
      acts.push({
        name: '거미 알 무더기', hint: '알이 떨리더니 새끼 거미가 쏟아져요', hit: [EX - 4, eg2, EZ - 4, EX + 3, eg2 + 4, EZ + 3],
        run: async a => {
          for (let k = 0; k < 6; k++) { await a.tween('eggs', { rot: [0, 0, 0.12], scl: [1.1, 1.22, 1.1] }, 0.1); await a.tween('eggs', { rot: [0, 0, -0.12], scl: [1, 1, 1] }, 0.1); }
          await a.tween('eggs', { rot: [0, 0, 0], off: [0, 1.4, 0], scl: [1.35, 1.7, 1.35] }, 0.2); await a.tween('eggs', { off: [0, 0, 0], scl: [1, 1, 1] }, 0.35);
          for (let k = 0; k < 3; k++) { a.burst([EX + 0.5, eg2 + 2, EZ + 0.5], { n: 50, colors: ['#1a1616', '#2a2420', '#e7e0c6'], speed: 8, up: 2, life: 2.2, gravity: 5, spread: 3, flat: true }); await a.wait(0.35); }
        },
      });
      landmarks.push({ name: '거미 여왕의 둥지', note: '중간 보스 · 거미 여왕', p: [SX + 0.5, sg + 26, SZ + 0.5], mid: true });

      // ── 늑대 굴(북서쪽 바위) ──
      const WX = 25, WZ = 42, wg = MH.g(w, WX, WZ);
      for (const [rx, rz, r] of [[WX, WZ - 2, 9], [WX - 10, WZ + 7, 6], [WX + 11, WZ - 9, 6], [WX - 8, WZ - 11, 5], [WX + 9, WZ + 5, 4], [WX - 13, WZ - 2, 5], [WX + 16, WZ - 2, 4]]) MH.rock(w, rx, wg + 3, rz, r, B.rock, B.moss, B.rockDk);
      w.ellipsoid(WX + 1, wg + 3, WZ + 6, 4, 4, 5, 0, (dx, dy) => dy >= -2);
      w.box(WX - 2, wg, WZ + 3, WX + 4, wg, WZ + 10, B.hole);
      for (let i = 0; i < 14; i++) w.fill(WX + w.ri(-4, 6), wg + 1, WZ + w.ri(10, 15), B.bone);
      landmarks.push({ name: '늑대 굴', note: '광기의 늑대인간 은신처', p: [WX + 0.5, wg + 17, WZ + 0.5] });

      // ── 늪을 건너는 판자길 ──
      const walk = [[85, 158], [88, 138], [78, 120], [85, 100], [79, 76]];
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
      const HX = 105, HZ = 130, hy = lvl + 5;
      for (const [px, pz] of [[HX, HZ], [HX + 9, HZ], [HX, HZ + 8], [HX + 9, HZ + 8]]) for (let y = Math.min(lvl, MH.g(w, px, pz)) ; y < hy; y++) w.set(px, y, pz, B.post);
      w.box(HX - 1, hy - 1, HZ - 1, HX + 10, hy - 1, HZ + 9, B.plank);
      const hut = MH.house(w, { x: HX + 1, z: HZ + 1, sx: 8, sz: 6, fh: 5, face: 'w', y: hy - 1, m: { found: B.plank, wall: B.plank, frame: B.post, win: B.lamp, sill: B.post, door: B.post, roof: B.thatch, eave: B.barkDk, ridge: B.post, lamp: B.lamp } });
      for (let s = 0; s <= 5; s++) { w.box(HX - 2 - s, hy - 1 - s + (s > 3 ? s - 3 : 0), HZ + 3, HX - 2 - s, hy - 1 - s + (s > 3 ? s - 3 : 0), HZ + 5, B.plank); }
      for (let x = HX - 8; x >= 88; x--) for (const dz of [3, 4, 5]) if (MH.g(w, x, HZ + dz) <= lvl + 1) w.set(x, lvl + 1, HZ + dz, B.plank);
      w.box(HX + 6, hy, HZ - 1, HX + 7, hy + 1, HZ - 1, B.pot); w.set(HX + 6, hy + 2, HZ - 1, B.brew);
      lights.push({ p: [HX - 0.5, hy + 4, HZ + 4.5], c: '#ffd080', i: 1.2, d: 14, flicker: 0.25, night: true });
      lights.push({ name: 'brew', p: [HX + 6.5, hy + 3, HZ - 0.5], c: '#90ff60', i: 0.8, d: 10, flicker: 0.3 });
      landmarks.push({ name: '늪 위 약초막', note: '누군가 끓이다 만 솥이 있다', p: [HX + 5, hut.peak + 5, HZ + 4] });
      // ── 늪 장식: 뒤틀린 나무, 수련, 갈대, 발광 버섯, 쓰러진 통나무 ──
      for (let i = 0; i < 80; i++) {
        const x = w.ri(4, 155), z = w.ri(4, 155), gy = MH.g(w, x, z);
        if (gy <= lvl || Math.hypot(x - RCX, z - RCZ - 4) < 22 || Math.hypot(x - WX, z - WZ - 12) < 13 || Math.hypot(x - TX, z - TZ) < 24 || Math.hypot(x - SX, z - SZ) < 18 || Math.hypot(x - MX, z - MZ) < 12 || Math.hypot(x - HX - 4, z - HZ - 4) < 12 || w.get(x, gy + 1, z)) continue;
        MH.tree(w, x, gy + 1, z, { kind: i % 3 ? 'willow' : 'twisted', h: w.ri(10, 17), bark: B.bark, barkDk: B.barkDk, leaves: [B.leaf2, B.leaf, B.leafDk], r: w.r(3.4, 5), spread: 5, trunkR: 1.3 });
      }
      MH.scatter(w, 3800, (x, gy, z, b) => {
        if ((wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1)) && w.chance(0.4)) { w.box(x, gy + 1, z, x, gy + w.ri(2, 3), z, B.reed); w.set(x, gy + 4, z, B.reedTop); }
        else if (b === B.moss && w.chance(0.25)) w.set(x, gy + 1, z, w.chance(0.12) ? B.gmush : B.vine);
      });
      for (let i = 0; i < 480; i++) { const x = w.ri(2, 157), z = w.ri(2, 157); if (wet(x, z) && !w.get(x, lvl + 1, z) && w.chance(0.5)) w.set(x, lvl + 1, z, B.lily); }
      for (let i = 0; i < 14; i++) { const x = w.ri(20, 138), z = w.ri(70, 148); const a = w.r(0, 3.14); if (wet(x, z)) w.line(x, lvl + 1, z, x + Math.cos(a) * 9, lvl + 1, z + Math.sin(a) * 9, B.barkDk, 0.9); }
      landmarks.push({ name: '독 늪', note: '판자길만이 안전하다', p: [85.5, lvl + 10, 135.5] });
      const pset = (p, x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); };
      // ── 거미 여왕(부품): 둥지 위 높은 곳에서 거미줄을 타고 내려온다 ──
      const QY = sg + 24, QT = sg + 34;
      const queen = w.prop({ name: 'queen', pivot: [SX + 0.5, QY, SZ + 0.5] });
      for (let dz = -3; dz <= 3; dz++) for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        if ((dx / 2) ** 2 + (dy / 1.5) ** 2 + ((dz + 0.6) / 2.6) ** 2 <= 1) pset(queen, SX + dx, QY + dy, SZ + dz, dz === -2 && Math.abs(dx) <= 1 && dy >= 0 ? B.spidR : B.spid);
      }
      for (let dz = 2; dz <= 3; dz++) for (let dx = -1; dx <= 1; dx++) pset(queen, SX + dx, QY, SZ + dz + 1, B.spid);
      pset(queen, SX - 1, QY + 1, SZ + 4, B.eye); pset(queen, SX + 1, QY + 1, SZ + 4, B.eye);
      for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {
        const z0 = SZ + 1.5 - k * 1.2, kx = SX + s * 1.5, ex = SX + s * 4.5, ez = SZ + 3 - k * 2.4;
        for (let t = 0; t <= 1; t += 0.2) pset(queen, kx + (ex - kx) * t, QY + 2 * Math.sin(t * Math.PI) + (t > 0.5 ? -2.5 * (t - 0.5) : 0), z0 + (ez - z0) * t, B.spid);
        for (let t = 0; t <= 1; t += 0.34) pset(queen, ex + s * t, QY - 1 - t * 2.5, ez, B.spid);
      }
      const silk = w.prop({ name: 'silk', pivot: [SX + 0.5, QT + 1, SZ + 0.5] });
      for (let y = QY + 2; y <= QT; y++) pset(silk, SX, y, SZ, B.web);
      acts.push({
        name: '거미 여왕', hint: '둥지 위 높은 곳에서 거미 여왕이 줄을 타고 스르륵 내려와요', hit: [SX - 5, QY - 4, SZ - 4, SX + 5, QY + 3, SZ + 5],
        run: async a => {
          const L0 = QT - QY - 1;
          await Promise.all([a.move('queen', [0, -13, 0], 2.2), a.rope('silk', L0, L0 + 13, 2.2)]);
          for (let k = 0; k < 3; k++) { await a.move('queen', [0, -11.5, 0], 0.25); await a.move('queen', [0, -13, 0], 0.25); }
          for (let k = 0; k < 3; k++) { a.burst([SX + 0.5, QY - 13, SZ + 0.5], { n: 40, colors: ['#1a1616', '#2a2420', '#d2cfc2'], speed: 7, up: 1, life: 2.2, gravity: 6, spread: 2 }); await a.wait(0.35); }
          await a.wait(0.8);
          await Promise.all([a.move('queen', [0, 0, 0], 2.6), a.rope('silk', L0, L0, 2.6)]);
        },
      });

      // ── 마녀의 솥: 뚜껑(부품)이 튀어 오르며 독한 김이 솟는다 ──
      const lid = w.prop({ name: 'potlid', pivot: [HX + 7, hy + 3, HZ - 0.5] });
      lid.box(HX + 6, hy + 3, HZ - 1, HX + 7, hy + 3, HZ - 1, B.pot); lid.set(HX + 6, hy + 4, HZ - 1, B.post);
      acts.push({
        name: '마녀의 솥', hint: '약초막 솥이 펄펄 끓어 뚜껑이 튀어 오르고 독한 김이 솟아요', hit: [HX + 5, hy, HZ - 2, HX + 8, hy + 4, HZ],
        run: async a => {
          a.flash('brew', 6, 4);
          for (let k = 0; k < 4; k++) { await a.move('potlid', [0, 0.6, 0], 0.1); await a.move('potlid', [0, 0, 0], 0.1); }
          await a.tween('potlid', { off: [1, 5, 2], rot: [0.8, 2, 0.4] }, 0.5);
          for (let k = 0; k < 6; k++) { a.burst([HX + 6.5, hy + 3, HZ - 0.5], { n: 30, colors: ['#9aff6a', '#c8ff6a', '#4a7a3a'], speed: 1.5, up: 6, life: 2.2, gravity: -0.6, spread: 0.8 }); await a.wait(0.3); }
          await a.tween('potlid', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6, t => t * t);
        },
      });

      // ── 늑대 굴: 어둠 속 노란 눈(부품)이 굴 밖으로 다가온다 ──
      const wolves = [[WX - 1, wg + 2, WZ + 7], [WX + 2, wg + 3, WZ + 6], [WX + 4, wg + 2, WZ + 8]].map(([x, y, z], k) => {
        const p = w.prop({ name: 'wolf' + k, pivot: [x + 1, y, z + 0.5] });
        pset(p, x, y, z, B.weye); pset(p, x + 2, y, z, B.weye);
        return 'wolf' + k;
      });
      lights.push({ name: 'den', p: [WX + 1.5, wg + 3, WZ + 9], c: '#ffd040', i: 0.01, d: 12, flicker: 0.3, srcR: 5 });
      acts.push({
        name: '늑대 굴', hint: '굴 속 어둠에서 노란 눈들이 번뜩이며 다가와요', hit: [WX - 3, wg, WZ + 3, WX + 6, wg + 6, WZ + 12],
        run: async a => {
          a.flash('den', 120, 4.6);
          await Promise.all(wolves.map((nm, k) => a.move(nm, [k - 1, 0, 5 + k], 1.6 + k * 0.3)));
          a.wind(2.5, 1.6);
          for (let k = 0; k < 3; k++) { a.burst([WX + 1.5, wg + 2, WZ + 13], { n: 26, colors: ['#3c5a2b', '#66782c', '#d8d0bc'], speed: 6, up: 2, life: 1.4, gravity: 3, spread: 3, flat: true }); await a.wait(0.4); }
          await a.wait(0.6);
          // 뒷걸음질 대신 어둠 속으로 스르르 사라졌다가 굴 안쪽에 다시 나타난다
          await Promise.all(wolves.map(nm => a.respawn(nm, 1.2)));
        },
      });

      // ── 고목의 입에서 쏟아지는 박쥐 떼(부품, 평소엔 숨김) ──
      const bats = [];
      for (let k = 0; k < 6; k++) {
        const bx = TX - 3 + k, by = g + 11 + (k % 3), bz = fz + 2;
        const nm = 'bat' + k, p = w.prop({ name: nm, pivot: [bx + 0.5, by, bz + 0.5], scl0: [0, 0, 0] });
        pset(p, bx, by, bz, B.bat); pset(p, bx - 1, by + 1, bz, B.bat); pset(p, bx + 1, by + 1, bz, B.bat); pset(p, bx, by + 1, bz + 1, B.spidR);
        bats.push(nm);
      }
      acts.push({
        name: '박쥐 떼', hint: '고목의 벌어진 입에서 박쥐 떼가 쏟아져 나와 하늘로 흩어져요', hit: [TX - 5, g + 9, fz - 1, TX + 5, g + 15, fz + 2],
        run: async a => {
          a.flash('eyes', 5, 3);
          a.burst([TX + 0.5, g + 12, fz + 2], { n: 50, colors: ['#221a22', '#3a2a34', '#120c10'], speed: 8, up: 4, life: 1.8, gravity: 0.5, spread: 3 });
          await Promise.all(bats.map((nm, k) => (async () => {
            await a.wait(k * 0.12);
            await a.tween(nm, { scl: [1, 1, 1] }, 0.1);
            const ang = (k - 2.5) * 0.45;
            // 머리(+z, 붉은 눈 쪽)를 진행 방향으로 돌리며 남쪽 하늘 너머 지도 밖까지 날아간 뒤 다시 숨는다
            await a.drive(nm, [[Math.sin(ang) * 8, 4 + k, 8], [Math.sin(ang) * 18, 12 + k * 2, 22], [Math.sin(ang) * 26, 20 + k, 50], [Math.sin(ang) * 34, 26 + k, 104]], 4.2, { fwd: '+z', back: 0.3 });
          })()));
        },
      });

      // ── 늪의 독기: 수면 곳곳에서 독 거품이 터진다 ──
      const bog = [];
      for (let i = 0; i < 400 && bog.length < 14; i++) { const x = w.ri(38, 130), z = w.ri(75, 138); if (wet(x, z) && !w.get(x, lvl + 1, z) && bog.every(([bx, bz]) => Math.hypot(bx - x, bz - z) > 7)) bog.push([x, z]); }
      bog.sort((p, q) => (q[0] + q[1]) - (p[0] + p[1]));
      if (bog.length) acts.push({
        name: '늪의 독기', hint: '늪 수면 곳곳에서 독 거품이 부글부글 솟아 터져요', hit: [bog[0][0] - 3, lvl, bog[0][1] - 3, bog[0][0] + 3, lvl + 3, bog[0][1] + 3],
        run: async a => {
          a.glow(1.5, 4);
          for (let r = 0; r < 2; r++) for (const [x, z] of bog) { a.burst([x + 0.5, lvl + 1.2, z + 0.5], { n: 22, colors: ['#b6e866', '#d4f07a', '#355f25'], speed: 2.5, up: 5, life: 1.4, gravity: 2.5, spread: 1.2 }); await a.wait(0.14); }
        },
      });

      // ══ 새 구역: 북동쪽 언덕의 이끼 덮인 환상열석 ══
      const rg = MH.g(w, RCX, RCZ);
      for (let z = RCZ - 13; z <= RCZ + 13; z++) for (let x = RCX - 13; x <= RCX + 13; x++) {
        const d = Math.hypot(x - RCX, z - RCZ);
        if (d > 13) continue;
        const ring = Math.abs(d - 9) < 1.2;
        MH.setH(w, x, z, rg, d < 4.5 ? B.slate : ring ? B.slate : hash3(x, 2, z) > 0.6 ? B.sick : B.moss, B.soil);
      }
      MH.skirt(w, RCX - 12, RCZ - 12, RCX + 12, RCZ + 12, rg, { R: 9, rate: 1.1, noise: (x, z) => n.fbm(x * 0.2, z * 0.2) * 3, surf: () => B.moss, fill: B.soil });
      // 선돌 아홉: 이끼 낀 윗면, 남쪽·동쪽 면에 룬
      const stones = [];
      for (let k = 0; k < 9; k++) {
        const a = k / 9 * Math.PI * 2 + 0.35, sx = Math.round(RCX + Math.cos(a) * 9), sz = Math.round(RCZ + Math.sin(a) * 9);
        const h = 7 + (k * 5) % 4 + (k === 2 ? 3 : 0), lean = k % 4 === 1 ? 1 : 0;
        for (let y = rg + 1; y <= rg + h; y++) {
          const ox = y > rg + h - 3 ? lean : 0;
          w.box(sx + ox, y, sz, sx + ox + 1, y, sz + 1, y >= rg + h - 1 && hash3(sx, y, sz) > 0.3 ? B.menhirM : B.menhir);
        }
        w.set(sx + 1, rg + 4, sz + 2, B.rune); w.set(sx + 1, rg + 5, sz + 2, B.rune); w.set(sx + 2, rg + 3, sz + 1, B.rune);
        stones.push([sx, sz, h]);
      }
      // 두 선돌 위 상인방(문 돌)
      for (const [i, j] of [[1, 2], [5, 6]]) {
        const [ax, az, ah] = stones[i], [bx, bz, bh] = stones[j], ty = rg + Math.min(ah, bh) + 1;
        w.line(ax, ty, az, bx + 1, ty, bz + 1, B.menhir, 0.8); w.line(ax, ty + 1, az, bx + 1, ty + 1, bz + 1, B.menhirM);
      }
      // 가운데 제단: 계단 받침, 석판, 룬 구슬
      w.cyl(RCX, RCZ, rg + 1, rg + 1, 3.6, B.altar); w.cyl(RCX, RCZ, rg + 2, rg + 2, 2.6, B.altar);
      w.box(RCX - 2, rg + 3, RCZ - 1, RCX + 2, rg + 4, RCZ + 1, B.menhir); w.box(RCX - 2, rg + 5, RCZ - 1, RCX + 2, rg + 5, RCZ + 1, B.menhirM);
      w.set(RCX - 2, rg + 4, RCZ + 2, B.rune); w.set(RCX + 2, rg + 4, RCZ + 2, B.rune); w.set(RCX, rg + 3, RCZ + 2, B.rune);
      w.set(RCX, rg + 6, RCZ, B.rune); w.set(RCX - 1, rg + 6, RCZ, B.skull); w.set(RCX + 1, rg + 6, RCZ, B.skull);
      for (const [dx, dz] of [[-3, 2], [3, -2], [2, 3]]) { w.box(RCX + dx, rg + 1, RCZ + dz, RCX + dx, rg + 2, RCZ + dz, B.pot); w.set(RCX + dx, rg + 3, RCZ + dz, B.spot); }
      lights.push({ name: 'ring', p: [RCX + 0.5, rg + 7, RCZ + 0.5], c: '#7affc8', i: 0.5, d: 26, flicker: 0.15 });
      // 언덕을 휘감은 가시덩굴과 붉은 열매
      for (let k = 0; k < 26; k++) {
        const a = w.r(0, Math.PI * 2), r0 = w.r(10.5, 13), x = Math.round(RCX + Math.cos(a) * r0), z = Math.round(RCZ + Math.sin(a) * r0);
        if (z > RCZ + 9 && Math.abs(x - RCX) < 5) continue;
        const gy = MH.g(w, x, z);
        w.line(x, gy + 1, z, x + w.ri(-2, 2), gy + w.ri(2, 4), z + w.ri(-2, 2), B.thorn, 0.7);
        if (k % 3 === 0) w.set(x, gy + 3, z, B.berry); else w.set(x, gy + 2, z + 1, B.thornL);
      }
      // 남쪽 입구의 가시덩굴 아치: 두 덩굴 덩이(부품)가 좌우로 갈라진다
      const AZ = RCZ + 12, ag = MH.g(w, RCX, AZ);
      for (const s2 of [-1, 1]) w.box(RCX + s2 * 4, ag + 1, AZ, RCX + s2 * 4, ag + 8, AZ, B.thorn);
      for (let x = RCX - 4; x <= RCX + 4; x++) { const ay = ag + 8 + Math.round(2 - Math.abs(x - RCX) * 0.5); w.set(x, ay, AZ, B.thorn); if (x % 2) w.set(x, ay + 1, AZ, B.thornL); else w.set(x, ay - 1, AZ, B.berry); }
      const vineL = w.prop({ name: 'vineL', pivot: [RCX - 3, ag + 1, AZ + 0.5] }), vineR = w.prop({ name: 'vineR', pivot: [RCX + 4, ag + 1, AZ + 0.5] });
      for (let x = RCX - 3; x <= RCX + 3; x++) for (let y = ag + 1; y <= ag + 7; y++) {
        if (hash3(x, y, AZ) < 0.25) continue;
        (x < RCX || (x === RCX && y % 2) ? vineL : vineR).set(x, y, AZ, (x + y) % 5 === 0 ? B.berry : (x + y) % 2 ? B.thorn : B.thornL);
      }
      MH.path(w, [[RCX + 0.5, AZ + 1], [RCX - 6, AZ + 10], [104, 52], [92, 62]], 1.4, B.slate, B.mud);
      landmarks.push({ name: '이끼 덮인 환상열석', note: '옛 드루이드의 선돌 · 룬이 아직 숨 쉰다', p: [RCX + 0.5, rg + 22, RCZ + 0.5] });
      landmarks.push({ name: '가시덩굴 제단', note: '고목의 마녀가 힘을 빌리는 곳', p: [RCX + 0.5, rg + 12, AZ + 0.5] });
      acts.push({
        name: '환상열석의 룬', hint: '선돌의 룬이 차례로 깨어나고 제단에서 초록 빛기둥이 솟아요', hit: [RCX - 3, rg + 1, RCZ - 2, RCX + 3, rg + 7, RCZ + 3],
        run: async a => {
          for (const [x, z, h] of stones) { a.burst([x + 1, rg + 5, z + 2], { n: 18, colors: ['#7affc8', '#c8ffe8', '#3a8a6a'], speed: 1.5, up: 3, life: 1.4, gravity: -0.4, spread: 0.6 }); await a.wait(0.2); }
          a.flash('ring', 8, 3.4); a.glow(1.7, 3.4);
          for (let k = 0; k < 7; k++) { a.burst([RCX + 0.5, rg + 7 + k * 3, RCZ + 0.5], { n: 30, colors: ['#7affc8', '#ffffff', '#b6e866'], speed: 2, up: 8, life: 1.6, gravity: -1, spread: 0.8 }); await a.wait(0.25); }
          a.burst([RCX + 0.5, rg + 2, RCZ + 0.5], { n: 70, colors: ['#7affc8', '#3c5a2b', '#c8ffe8'], speed: 7, up: 1, life: 2, gravity: 0.5, spread: 3, flat: true });
          await a.wait(1.2);
        },
      });
      acts.push({
        name: '가시덩굴 아치', hint: '입구를 막은 가시덩굴이 좌우로 스르르 갈라지며 붉은 열매가 흩날려요', hit: [RCX - 4, ag + 1, AZ - 1, RCX + 4, ag + 8, AZ + 1],
        run: async a => {
          for (let k = 0; k < 3; k++) { await Promise.all([a.move('vineL', [-0.3, 0, 0], 0.1), a.move('vineR', [0.3, 0, 0], 0.1)]); await Promise.all([a.move('vineL', [0, 0, 0], 0.1), a.move('vineR', [0, 0, 0], 0.1)]); }
          await Promise.all([a.tween('vineL', { off: [-3.5, 0, -0.5], scl: [0.55, 1, 1] }, 1.4), a.tween('vineR', { off: [3.5, 0, -0.5], scl: [0.55, 1, 1] }, 1.4)]);
          a.flash('ring', 4, 2.4);
          for (let k = 0; k < 3; k++) { a.burst([RCX + 0.5, ag + 5, AZ + 0.5], { n: 26, colors: ['#d8406a', '#5a3a5a', '#7affc8'], speed: 4, up: 3, life: 1.6, gravity: 2, spread: 2 }); await a.wait(0.4); }
          await a.wait(1.4);
          await Promise.all([a.tween('vineL', { off: [0, 0, 0], scl: [1, 1, 1] }, 1.2), a.tween('vineR', { off: [0, 0, 0], scl: [1, 1, 1] }, 1.2)]);
        },
      });

      // ── 늪가의 독두꺼비(부품): 그루터기 위에서 늪으로 첨벙 뛰어든다 ──
      let toadAt = null;
      for (let r = 0; r < 40 && !toadAt; r++) for (let k = 0; k < 24 && !toadAt; k++) {
        const a = k / 24 * Math.PI * 2, x = Math.round(70 + Math.cos(a) * r), z = Math.round(108 + Math.sin(a) * r), gy = MH.g(w, x, z);
        if (gy < lvl + 1 || gy > lvl + 2 || w.get(x, gy + 1, z) || MH.polyDist(x, z, walk) < 5 || Math.hypot(x - MX, z - MZ) < 14 || Math.hypot(x - HX - 4, z - HZ - 4) < 14) continue;
        let ok = true;
        for (let s2 = 4; s2 <= 12 && ok; s2++) if (!wet(x + Math.round(s2 * 0.6), z + Math.round(s2 * 0.8))) ok = false;
        for (let dz = -3; dz <= 3 && ok; dz++) for (let dx = -3; dx <= 3; dx++) if (w.get(x + dx, gy + 3, z + dz) || w.get(x + dx, gy + 6, z + dz)) ok = false;
        if (ok) toadAt = [x, gy, z];
      }
      if (toadAt) {
        const [tx, tg, tz] = toadAt, ty = tg + 2;
        w.box(tx - 3, tg + 1, tz - 3, tx + 3, tg + 6, tz + 3, 0);
        w.cyl(tx, tz, tg + 1, tg + 1, 2.2, B.barkM); w.ring(tx, tz, tg + 1, 1.2, 2.3, B.bark);
        const toad = w.prop({ name: 'toad', pivot: [tx + 0.5, ty, tz + 0.5] });
        toad.ellipsoid(tx, ty + 1, tz, 2, 1.5, 2.2, B.toad, (dx, dy) => dy >= -1);
        for (const [dx, dz] of [[-1, -1], [1, 0], [0, 1], [-1, 1]]) toad.set(tx + dx, ty + 3, tz + dz, B.toadS);
        toad.box(tx - 1, ty, tz + 1, tx + 1, ty, tz + 2, B.toadB);
        toad.set(tx - 1, ty + 2, tz + 2, B.eye); toad.set(tx + 1, ty + 2, tz + 2, B.eye); toad.set(tx - 1, ty + 3, tz + 2, B.toad); toad.set(tx + 1, ty + 3, tz + 2, B.toad);
        for (const s2 of [-1, 1]) { toad.box(tx + s2 * 2, ty, tz - 1, tx + s2 * 3, ty, tz - 2, B.toad); toad.set(tx + s2 * 2, ty, tz + 2, B.toad); }
        acts.push({
          name: '독두꺼비', hint: '그루터기 위 독두꺼비가 목을 부풀리다 늪으로 첨벙 뛰어들어요', hit: [tx - 3, ty, tz - 2, tx + 3, ty + 4, tz + 3],
          run: async a => {
            for (let k = 0; k < 3; k++) { await a.tween('toad', { scl: [1.12, 1.25, 1.12] }, 0.25); await a.tween('toad', { scl: [1, 1, 1] }, 0.2); }
            a.burst([tx + 0.5, ty + 2, tz + 2.5], { n: 20, colors: ['#9aff6a', '#c8ff6a'], speed: 2, up: 3, life: 1.2, gravity: -0.3, spread: 0.6 });
            await a.drive('toad', [[2, 5, 3], [4, 6, 5], [6, -1, 8]], 1.1, { fwd: '+z' });
            for (let k = 0; k < 3; k++) { a.burst([tx + 6.5, lvl + 1.2, tz + 8.5], { n: 30, colors: ['#b6e866', '#355f25', '#d4f07a'], speed: 3.5, up: 4, life: 1.2, gravity: 4, spread: 1.4 }); await a.wait(0.3); }
            await a.wait(0.8);
            await a.respawn('toad', 1.0);
          },
        });
        landmarks.push({ name: '두꺼비 그루터기', note: '독두꺼비 · 침에 닿으면 마비', p: [tx + 0.5, ty + 10, tz + 0.5] });
      }

      // ── 판자길 등불 기둥과 약초막 둘레 장식 ──
      for (let i = 1; i < walk.length - 1; i++) {
        const [x, z] = walk[i], lx = x + 3;
        if (MH.g(w, lx, z) > lvl + 1) continue;
        for (let y = MH.g(w, lx, z) + 1; y <= lvl + 6; y++) w.set(lx, y, z, B.post);
        w.set(lx, lvl + 7, z, B.post); w.set(lx - 1, lvl + 7, z, B.post); w.set(lx - 1, lvl + 6, z, B.lamp); w.set(lx, lvl + 8, z, B.skull);
        if (i % 2) lights.push({ p: [lx - 0.5, lvl + 6, z + 0.5], c: '#ffd080', i: 0.9, d: 12, flicker: 0.3, night: true });
      }
      // 약초막: 말리는 약초 시렁, 해골 토템
      for (let x = HX + 1; x <= HX + 8; x++) { w.set(x, hy + 4, HZ + 9, B.post); if (x % 2) { w.set(x, hy + 3, HZ + 9, B.herb); w.set(x, hy + 2, HZ + 9, B.reed); } }
      for (const px of [HX - 1, HX + 10]) { w.box(px, hy, HZ + 9, px, hy + 4, HZ + 9, B.post); }
      w.box(HX + 10, hy, HZ - 1, HX + 10, hy + 6, HZ - 1, B.post); w.set(HX + 10, hy + 7, HZ - 1, B.skull); w.set(HX + 11, hy + 6, HZ - 1, B.bone); w.set(HX + 9, hy + 6, HZ - 1, B.bone);
      return { lights, landmarks, acts };
    },
  });
})();
