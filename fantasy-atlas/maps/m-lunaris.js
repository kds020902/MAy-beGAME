// 월광 첨탑 — 달빛 호수의 바위섬들, 흰 첨탑과 아치 다리, 차원문, 물에서 솟는 달빛 다리, 동쪽 별빛 서고 섬 (168칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 168, D = 168, Hh = 140;
  const P = v => Math.round(v * 1.25) + 4;   // 옛 128칸 배치 → 168칸 배치
  MAPS.push({
    id: 'lunaris', cat: 'magic', name: '월광 첨탑', en: 'Lunaris Spires', color: '#9ae8e0', seed: 353, base: 22, time: 'night', size: [W, D, Hh],
    desc: '달빛을 모으는 흰 첨탑들의 구역. 보름밤이면 호수 위로 빛의 다리가 떠올라 섬과 섬을 잇는다. 동쪽 별빛 서고 섬에서는 떠도는 책들이 달의 기록을 읽고, 은빛 나룻배가 서고와 달의 첨탑을 오간다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '월광 사제단'], ['명물', '초승달 첨탑 · 달빛 다리'], ['새 구역', '별빛 서고 섬 · 달 거울'], ['주의', '차원문 앞에서 이름을 부르지 말 것']] },
    sky: ['#1a3a4a', '#060e18', '#bff0ff'], stars: true,
    hemi: ['#d0f0ff', '#102030', 0.68], sun: ['#e0f4ff', 0.6, [0.45, 1, 0.5]],
    day: { sky: ['#e0f4f8', '#6ab0d8', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.6], sun: ['#fff8ec', 0.8, [0.45, 1, 0.5]] },
    liquid: ['#1a4a6a', '#3a8ab0', '#ffffff'], liqSpeed: 0.4,
    fog: { start: 0.84, floor: 10, depth: 10, haze: [24, 0.18, 4], hazeColor: '#2a5a6a' },
    camY: 4, zoom: 1.1,
    particles: [
      { n: 130, colors: ['#9af8f0', '#e0ffff'], mode: 'rise', speed: 0.5, area: [84, 96, 9], y0: 24, y1: 70 },
      { n: 140, colors: ['#e0f0ff', '#c8e8ff'], mode: 'drift', speed: 0.2, y0: 26, y1: 110 },
    ],
    blocks: {
      moss: { c: '#3a4a50', top: '#4a7a7a', v: 0.1 }, moss2: { c: '#3a4a50', top: '#56867e', v: 0.1 }, sand: { c: '#6a7a80', top: '#8a9aa0', v: 0.06 },
      dirt: { c: '#3a4a50', v: 0.08 }, rock: { c: '#7a8494', v: 0.06, pat: 'big' }, rockDk: { c: '#4a5260', v: 0.06, pat: 'stone' },
      path: { c: '#3a4a50', top: '#c8d0d8', v: 0.04, pat: 'stone' }, marble: { c: '#e8eef4', v: 0.03, pat: 'big' }, marbleDk: { c: '#b8c4d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f8fa', v: 0.02 },
      silver: { c: '#c8d4e0', v: 0.04 }, leafS: { c: '#a8c8c8', v: 0.09 }, leafT: { c: '#7ab0b0', v: 0.09 }, bark: { c: '#6a6a7a', v: 0.05 }, door: { c: '#4a5a6a', v: 0.03, pat: 'plank' },
      win: { c: '#c8f4ff', night: true, day: '#8ab0c8' }, lamp: { c: '#c8fff4', night: true, day: '#a8c4c0' },
      crysT: { c: '#7af0e0', glow: true }, crysP: { c: '#d0f8ff', glow: true }, crysV: { c: '#c8a8ff', glow: true },
      portal: { c: '#b890ff', glow: true }, portal2: { c: '#e8d0ff', glow: true }, rune: { c: '#8af0ff', glow: true }, beam: { c: '#e8ffff', glow: true },
      whale: { c: '#4a7aa8', v: 0.06 }, whaleB: { c: '#c8f4ff', glow: true }, lotus: { c: '#ffc8f0', glow: true }, lant: { c: '#ffe0a0', glow: true },
      plank: { c: '#8a9098', v: 0.05, pat: 'plank' }, reed: { c: '#5a8a80', v: 0.1 }, roofB: { c: '#5a6a9a', v: 0.04, pat: 'tile' },
      book1: { c: '#5a7ac8', v: 0.05 }, book2: { c: '#c87a9a', v: 0.05 }, book3: { c: '#d8c88a', v: 0.05 }, page: { c: '#f4f0e0', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, WL = base + 1;
      const AX = 150, AZ = 76;                               // 새 섬: 별빛 서고
      const isles = [[P(64), P(56), 26, 5], [P(26), P(28), 17, 4], [P(102), P(26), 17, 4], [P(20), P(88), 19, 4], [P(106), P(92), 19, 4], [P(64), P(112), 13, 3], [AX, AZ, 14, 4], [38, 146, 8, 2], [150, 146, 9, 2], [64, 12, 8, 2]];
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          let hh = -6 + n.fbm(x * 0.05, z * 0.05) * 2;
          for (const [cx, cz, r, k] of isles) { const d = Math.hypot(x - cx, z - cz) + (n.fbm(x * 0.08 + cx, z * 0.08, 3) - 0.5) * r * 0.4; hh = Math.max(hh, MH.sstep(r + 1, r - 6, d) * (k + 3) - 2.5 + MH.sstep(r - 4, 0, d) * 2.5); }
          return base + hh;
        },
        surface: (x, z, y, s) => y <= WL + 1 ? B.sand : s >= 3 ? B.rock : n.fbm(x * 0.11, z * 0.11, 2) > 0.55 ? B.moss2 : B.moss,
        under: (x, z, y, dep, s) => dep < 2 && y > WL + 1 && s < 3 ? B.dirt : (y % 4 === 0 ? B.rockDk : B.rock),
      });
      MH.water(w, WL);
      const lights = [], acts = [], landmarks = [];
      const top = (cx, cz) => MH.g(w, cx, cz);
      const spire = (cx, cz, h, r, tip, step) => {
        const g = top(cx, cz) + 1;
        MH.flatten(w, cx - Math.ceil(r) - 3, cz - Math.ceil(r) - 3, cx + Math.ceil(r) + 3, cz + Math.ceil(r) + 3, g - 1, B.path, B.rock);
        w.cyl(cx, cz, g, g + 1, r + 2.4, B.marbleDk); w.cyl(cx, cz, g + 2, g + 2, r + 1.4, B.trim);
        for (let y = g; y <= g + h; y++) w.cyl(cx, cz, y, y, r - (y - g) * 0.02, B.marble);
        // 세로 홈(기둥 결)
        for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; for (let y = g + 3; y < g + h - 2; y++) { const rr = r - (y - g) * 0.02 + 0.3; if (y % 14 > 11) continue; w.set(Math.round(cx + Math.cos(a) * rr), y, Math.round(cz + Math.sin(a) * rr), B.marbleDk); } }
        for (let y = g + 3; y < g + h; y++) {
          const a = y * 0.42, rr = r - (y - g) * 0.02;
          w.set(Math.round(cx + Math.cos(a) * (rr + 0.7)), y, Math.round(cz + Math.sin(a) * (rr + 0.7)), B.silver);
          if (y % 5 === 0) { const wx = Math.round(cx + Math.cos(a + 2.4) * rr), wz = Math.round(cz + Math.sin(a + 2.4) * rr); w.box(wx, y, wz, wx, y + 1, wz, B.win); }
        }
        for (let y = g + 12; y < g + h - 4; y += 14) {
          const rr = r - (y - g) * 0.02; w.ring(cx, cz, y, rr, rr + 2, B.marbleDk); w.ring(cx, cz, y + 1, rr + 1.2, rr + 2, B.trim);
          const nn = Math.max(8, Math.round(rr * 3));
          for (let k = 0; k < nn; k++) { const a = k / nn * Math.PI * 2; const x = Math.round(cx + Math.cos(a) * (rr + 1.7)), z = Math.round(cz + Math.sin(a) * (rr + 1.7)); w.set(x, y - 1, z, B.marbleDk); if (k % 2 === 0) w.set(x, y + 2, z, B.silver); }
        }
        w.box(cx, g, cz + Math.floor(r), cx, g + 3, cz + Math.floor(r), B.door);
        w.box(cx - 1, g + 4, cz + Math.floor(r) + 1, cx + 1, g + 4, cz + Math.floor(r) + 1, B.trim);
        const rt = r - h * 0.02;
        w.ring(cx, cz, g + h + 1, 0, rt + 1.2, B.marbleDk);
        for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; w.box(Math.round(cx + Math.cos(a) * (rt + 1)), g + h + 2, Math.round(cz + Math.sin(a) * (rt + 1)), Math.round(cx + Math.cos(a) * (rt + 1)), g + h + 3, Math.round(cz + Math.sin(a) * (rt + 1)), B.trim); }
        const t = MH.cone(w, cx, cz, g + h + 2, rt + 0.8, tip, step || 0.28);
        return { top: t, mid: g + Math.round(h * 0.55), g, cx, cz, r };
      };
      const lampPost = (x, z, h) => { const g = top(x, z); if (g <= WL || w.get(x, g + 1, z)) return; w.set(x, g + 1, z, B.marbleDk); w.box(x, g + 2, z, x, g + 1 + (h || 4), z, B.silver); w.set(x, g + 2 + (h || 4), z, B.lamp); w.set(x, g + 3 + (h || 4), z, B.trim); };
      // ── 달의 첨탑(가운데 섬) ──
      const MCX = P(64), MCZ = P(50);
      const main = spire(MCX, MCZ, 62, 6, B.crysP, 0.42);
      // 받침 둘레의 작은 탑 넷과 버팀 아치
      for (let k = 0; k < 4; k++) {
        const a = k * Math.PI / 2 + Math.PI / 4, tx = Math.round(MCX + Math.cos(a) * 10), tz = Math.round(MCZ + Math.sin(a) * 10), g = main.g;
        MH.footing(w, tx - 2, tz - 2, tx + 2, tz + 2, g, B.marbleDk);
        w.cyl(tx, tz, g, g, 2.6, B.marbleDk); w.cyl(tx, tz, g + 1, g + 13, 1.7, B.marble); w.ring(tx, tz, g + 7, 1.4, 2.4, B.trim); w.ring(tx, tz, g + 14, 0, 2.4, B.marbleDk);
        w.box(tx, g + 9, tz, tx, g + 10, tz, B.win);
        const tt = MH.cone(w, tx, tz, g + 15, 2, B.silver, 0.34); w.set(tx, tt, tz, B.crysT);
        w.line(tx, g + 13, tz, MCX + Math.cos(a) * 6, g + 22, MCZ + Math.sin(a) * 6, B.trim, 0.6);
      }
      const moon = w.prop({ name: 'moon', pivot: [MCX + 0.5, main.top + 8.5, MCZ + 0.5], axis: 'y', speed: 0.3 });
      for (let a = -2.3; a <= 2.3; a += 0.07) {
        const co = Math.cos(a), si = Math.sin(a);
        for (const rr of [6.2, 5.4, 4.6, 3.8]) if (rr > 5 || Math.abs(a) < 1.5 || (rr > 4.2 && Math.abs(a) < 1.9)) moon.set(Math.round(MCX - co * rr + 2), Math.round(main.top + 8 + si * rr), MCZ, B.crysP);
      }
      w.box(MCX, main.top, MCZ, MCX, main.top + 1, MCZ, B.silver);
      const stones = w.prop({ name: 'stones', pivot: [MCX + 0.5, main.mid, MCZ + 0.5], axis: 'y', speed: -0.5 });
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, x = Math.round(MCX + Math.cos(a) * 12), z = Math.round(MCZ + Math.sin(a) * 12), y = main.mid - 1 + (k % 2) * 3; stones.box(x, y, z, x, y + 2, z, k % 2 ? B.rune : B.marbleDk); stones.set(x, y + 1, z + 1, B.marbleDk); }
      lights.push({ name: 'moon', p: [MCX + 0.5, main.top + 8, MCZ + 0.5], c: '#d0f8ff', i: 1.8, d: 32, flicker: 0.05, srcR: 8 });
      lights.push({ p: [MCX + 0.5, main.g + 4, MCZ + 7.5], c: '#c8fff4', i: 0.9, d: 12, flicker: 0.05, night: true, srcR: 6 });
      w.set(MCX - 1, main.g + 4, MCZ + 7, B.lamp); w.set(MCX + 1, main.g + 4, MCZ + 7, B.lamp);
      acts.push({
        name: '초승달', hint: '첨탑 끝의 초승달이 빨리 돌며 달빛을 뿌려요', hit: [MCX - 7, main.top, MCZ - 5, MCX + 7, main.top + 16, MCZ + 5],
        run: async a => { a.flash('moon', 3, 4.5); a.glow(1.6, 4.5); a.spin('stones', 5, 4.5); a.spin('moon', 8, 4.5); for (let k = 0; k < 9; k++) { a.burst([MCX + 0.5, main.top + 8, MCZ + 0.5], { n: 26, colors: ['#d0f8ff', '#ffffff', '#7af0e0'], speed: 9, up: 1, life: 2.2, gravity: 1.5, spread: 3 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '달의 첨탑', note: '꼭대기에서 초승달이 돈다', p: [MCX + 0.5, main.top + 18, MCZ + 0.5], tag: 'MOON' });
      // ── 작은 첨탑과 섬을 잇는 아치 다리 ──
      const sp = [spire(P(26), P(26), 34, 3.6, B.crysT), spire(P(102), P(24), 38, 3.8, B.crysT), spire(P(100), P(86), 32, 3.6, B.crysV)];
      sp.forEach((s, k) => lights.push({ name: 'sp' + k, p: [s.cx + 0.5, s.top - 3, s.cz + 0.5], c: '#70f0e0', i: 1, d: 16, flicker: 0.05, srcR: 6 }));
      const span = (a, b, lift) => {
        const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len, nn = Math.ceil(len * 2);
        const ya = Math.max(WL + 2, MH.g(w, Math.round(a[0]), Math.round(a[1])) + 1), yb = Math.max(WL + 2, MH.g(w, Math.round(b[0]), Math.round(b[1])) + 1);
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[1] + dz * t, y = Math.round(MH.lerp(ya, yb, t) + Math.sin(t * Math.PI) * lift);
          for (let k = -2; k <= 2; k++) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); w.set(bx, y, bz, Math.abs(k) === 2 ? B.marbleDk : B.marble); if (Math.abs(k) === 2) { w.set(bx, y - 1, bz, B.marbleDk); w.set(bx, y + 1, bz, B.trim); if (i % 8 === 4) { w.set(bx, y + 2, bz, B.trim); w.set(bx, y + 3, bz, B.lamp); } } }
          if (i % 14 === 7) for (let yy = Math.max(1, MH.g(w, Math.round(x), Math.round(z))); yy < y; yy++) { for (const [ox, oz] of [[0, 0], [Math.round(px), Math.round(pz)], [-Math.round(px), -Math.round(pz)]]) w.set(Math.round(x) + ox, yy, Math.round(z) + oz, yy === y - 1 ? B.trim : B.marbleDk); }
        }
        return [a[0] + dx / 2, (ya + yb) / 2 + lift, a[1] + dz / 2];
      };
      const br1 = span([P(52), P(46)], [P(34), P(32)], 6); span([P(76), P(46)], [P(94), P(30)], 6); span([P(78), P(64)], [P(96), P(84)], 6); span([P(50), P(64)], [P(30), P(82)], 6);
      lights.push({ p: [br1[0], br1[1] + 3, br1[2]], c: '#c8fff4', i: 0.9, d: 14, flicker: 0.05, night: true, srcR: 7 });
      landmarks.push({ name: '하늘 다리', note: '섬과 첨탑을 잇는 흰 아치', p: [br1[0], br1[1] + 8, br1[2]] });
      // ── 월광 연못(가운데 섬 남쪽) ──
      const PX = P(64), PZ = P(68) + 1, py = top(PX, PZ);
      MH.flatten(w, PX - 10, PZ - 10, PX + 10, PZ + 10, py, B.path, B.rock);
      for (let z = PZ - 10; z <= PZ + 10; z++) for (let x = PX - 10; x <= PX + 10; x++) {
        const d = MH.dist(x, z, PX, PZ);
        if (d > 9.6) { if (d < 10.6 && (x + z) % 2) w.set(x, py, z, B.marbleDk); continue; }
        if (d > 7.6) { w.set(x, py + 1, z, d > 8.6 ? B.marbleDk : B.marble); if (d > 8.6 && Math.round(Math.atan2(z - PZ, x - PX) * 4) % 3 === 0) w.set(x, py + 2, z, B.trim); continue; }
        MH.setH(w, x, z, py - 2, B.marbleDk, B.rock); w.liquid(x, z, py);
      }
      w.box(PX, py - 1, PZ, PX, py + 3, PZ, B.marble); w.box(PX, py + 4, PZ, PX, py + 6, PZ, B.crysP); w.set(PX - 1, py + 5, PZ, B.crysP); w.set(PX + 1, py + 5, PZ, B.crysP); w.set(PX, py + 5, PZ - 1, B.crysP); w.set(PX, py + 5, PZ + 1, B.crysP);
      lights.push({ name: 'pool', p: [PX + 0.5, py + 6, PZ + 0.5], c: '#a0f0ff', i: 1.3, d: 18, flicker: 0.05 });
      landmarks.push({ name: '월광 연못', note: '달빛을 비추는 둥근 연못', p: [PX + 0.5, py + 12, PZ + 0.5] });
      // 가운데 섬 산책로와 가로등
      MH.path(w, [[MCX, MCZ + 8], [PX, PZ - 10]], 1.2, B.path); MH.path(w, [[PX, PZ + 10], [PX, PZ + 16]], 1.2, B.path);
      for (const [x, z] of [[MCX - 3, MCZ + 12], [MCX + 3, MCZ + 12], [PX - 3, PZ + 13], [PX + 3, PZ + 13], [MCX - 16, MCZ + 6], [MCX + 16, MCZ + 6]]) lampPost(x, z, 4);
      // ── 달빛 다리: 남쪽 섬과 가운데 섬 사이 물속에서 솟는다(부품) ──
      const BZ0 = P(80) + 2, BZ1 = P(104) - 1;
      const bridge = w.prop({ name: 'mbridge', pivot: [PX + 0.5, WL + 2, (BZ0 + BZ1) / 2], off0: [0, -5, 0] });
      for (let z = BZ0; z <= BZ1; z++) { const y = WL + 2 + Math.round(Math.sin((z - BZ0) / (BZ1 - BZ0) * Math.PI) * 2); for (let x = PX - 2; x <= PX + 2; x++) if (!w.get(x, y, z)) bridge.set(x, y, z, (x === PX - 2 || x === PX + 2) ? B.crysT : B.beam); }
      const GZc = P(112), gz = top(PX, GZc - 2) + 1;
      w.cyl(PX, GZc, gz, gz, 6, B.marbleDk); w.cyl(PX, GZc, gz, gz, 4.6, B.path);
      for (let k = 0; k < 6; k++) { const a = k * 1.047, x = Math.round(PX + Math.cos(a) * 4.8), z = Math.round(GZc + Math.sin(a) * 4.8); w.box(x, gz + 1, z, x, gz + 6, z, B.marble); w.set(x, gz + 1, z, B.marbleDk); w.set(x, gz + 6, z, B.trim); }
      w.ring(PX, GZc, gz + 7, 3.4, 5.6, B.marbleDk); MH.dome(w, PX, gz + 8, GZc, 5.4, B.silver, B.trim); w.box(PX, gz + 14, GZc, PX, gz + 15, GZc, B.trim); w.set(PX, gz + 16, GZc, B.crysP);
      w.box(PX, gz + 1, GZc, PX, gz + 2, GZc, B.marble); w.set(PX, gz + 3, GZc, B.rune);
      lights.push({ name: 'gazebo', p: [PX + 0.5, gz + 4, GZc + 0.5], c: '#8af0ff', i: 1, d: 14, flicker: 0.05 });
      acts.push({
        name: '달빛 다리', hint: '호수에서 빛의 다리가 떠올랐다가 다시 잠겨요', hit: [PX - 4, gz + 1, GZc - 4, PX + 4, gz + 8, GZc + 4],
        run: async a => {
          a.flash('gazebo', 3, 9); a.flash('pool', 2, 9);
          for (let k = 0; k < 5; k++) { a.burst([PX + 0.5, WL + 1, BZ0 + 3 + k * 6], { n: 24, colors: ['#e0ffff', '#7af0e0'], speed: 3, up: 4, life: 1.2, gravity: 6, spread: 3 }); }
          await a.move('mbridge', [0, 0, 0], 2.6);
          await a.wait(4);
          await a.move('mbridge', [0, -5, 0], 2.4);
          a.burst([PX + 0.5, WL + 1, (BZ0 + BZ1) / 2], { n: 40, colors: ['#e0ffff', '#ffffff'], speed: 4, up: 3, life: 1, gravity: 6, spread: 8, flat: true });
        },
      });
      landmarks.push({ name: '달맞이 정자', note: '달빛 다리를 부르는 곳', p: [PX + 0.5, gz + 20, GZc + 0.5] });
      // ── 차원문(서쪽 섬) ──
      const QX = P(20), QZ = P(88), qg = top(QX, QZ) + 1, QR = 10, qy = qg + QR + 1;
      MH.flatten(w, QX - 5, QZ - 13, QX + 9, QZ + 13, qg - 1, B.path, B.rock);
      w.box(QX - 3, qg, QZ - 12, QX + 3, qg, QZ + 12, B.marbleDk); w.box(QX - 1, qg + 1, QZ - 11, QX + 1, qg + 1, QZ + 11, B.marble);
      for (let v = -QR - 1; v <= QR + 1; v++) for (let u = -QR - 1; u <= QR + 1; u++) {
        const d = Math.hypot(u, v);
        if (qy + v <= qg + 1) continue;
        if (d <= QR + 0.5 && d > QR - 1.6) { for (const dx of [-1, 0, 1]) w.set(QX + dx, qy + v, QZ + u, (dx === 0 && Math.round(Math.atan2(v, u) * 4) % 2 === 0) ? B.rune : B.marble); }
        else if (d <= QR - 1.6) w.set(QX, qy + v, QZ + u, (Math.floor(d * 1.2 + Math.atan2(v, u) * 2) % 2) ? B.portal : B.portal2);
      }
      for (const s of [-1, 1]) { w.box(QX - 1, qg + 1, QZ + s * 12, QX + 1, qg + 6, QZ + s * 12, B.marble); w.set(QX, qg + 7, QZ + s * 12, B.crysV); w.box(QX - 1, qg + 6, QZ + s * 12, QX + 1, qg + 6, QZ + s * 12, B.trim); }
      for (let s = 0; s < 3; s++) w.box(QX + 3 + s, qg - s, QZ - 3, QX + 3 + s, qg - s, QZ + 3, B.marbleDk);
      const orbit = w.prop({ name: 'portal', pivot: [QX + 3.5, qy + 0.5, QZ + 0.5], axis: 'x', speed: 0.4 });
      for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, y = Math.round(qy + Math.sin(a) * (QR - 3)), z = Math.round(QZ + Math.cos(a) * (QR - 3)); orbit.box(QX + 3, y, z, QX + 3, y + (k % 2), z, k % 2 ? B.rune : B.crysV); }
      lights.push({ name: 'portal', p: [QX + 2.5, qy, QZ + 0.5], c: '#b890ff', i: 1.8, d: 24, flicker: 0.15 });
      acts.push({
        name: '차원문', hint: '룬이 돌며 문이 열리고 빛이 쏟아져요', hit: [QX - 1, qg + 2, QZ - QR, QX + 4, qy + QR, QZ + QR],
        run: async a => {
          a.flash('portal', 3.5, 4.5); a.glow(1.7, 4.5); a.spin('portal', 9, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([QX + 2, qy, QZ + 0.5], { n: 36, colors: ['#b890ff', '#e8d0ff', '#ffffff'], speed: 7, up: 1, life: 1.6, gravity: 0, spread: 4 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '차원문', note: '다른 세계로 이어진 문', p: [QX + 0.5, qy + QR + 6, QZ + 0.5] });
      // ── 수정 정원(동쪽 섬) ──
      const crystals = [[110, 96, true], [114, 88, false], [106, 102, false], [112, 82, true], [98, 98, false], [116, 94, false], [104, 92, false], [118, 100, false]].map(([x, z, b]) => [P(x), P(z), b]);
      for (const [cx, cz, big] of crystals) {
        const g = top(cx, cz);
        if (g <= WL || w.get(cx, g + 1, cz)) continue;
        const c = hash3(cx, 1, cz) > 0.5 ? B.crysT : B.crysV;
        for (let i = 0; i < (big ? 7 : 3); i++) { const a = w.r(0, Math.PI * 2), l = w.r(big ? 5 : 2, big ? 12 : 6), tl = w.r(0.15, 0.45); w.line(cx, g + 1, cz, cx + Math.cos(a) * l * tl, g + 1 + l, cz + Math.sin(a) * l * tl, c, big && i === 0 ? 0.9 : 0); }
        if (big) lights.push({ p: [cx + 0.5, g + 4, cz + 0.5], c: c === B.crysT ? '#70f0e0' : '#c0a0ff', i: 1.1, d: 14, flicker: 0.05 });
      }
      landmarks.push({ name: '수정 정원', note: '청록과 보라 수정 군락', p: [P(110) + 0.5, top(P(110), P(96)) + 16, P(96) + 0.5] });

      // ══════════ 새 구역: 별빛 서고 섬(동쪽) ══════════
      const ag = top(AX, AZ);
      MH.flatten(w, AX - 9, AZ - 9, AX + 9, AZ + 9, ag, B.path, B.rock);
      const ay = ag + 1, AR = 6.4, AH = 14;
      w.cyl(AX, AZ, ay, ay, AR + 2.2, B.marbleDk); w.cyl(AX, AZ, ay + 1, ay + 1, AR + 1.2, B.trim);
      for (let y = ay + 1; y <= ay + AH; y++) w.cyl(AX, AZ, y, y, AR, y === ay + 7 ? B.marbleDk : B.marble);
      for (let k = 0; k < 12; k++) {
        const a = k / 12 * Math.PI * 2, x = Math.round(AX + Math.cos(a) * (AR + 0.6)), z = Math.round(AZ + Math.sin(a) * (AR + 0.6));
        w.box(x, ay + 2, z, x, ay + AH, z, B.trim);
        const a2 = a + Math.PI / 12, wx = Math.round(AX + Math.cos(a2) * AR), wz = Math.round(AZ + Math.sin(a2) * AR);
        w.box(wx, ay + 3, wz, wx, ay + 5, wz, B.win); w.box(wx, ay + 9, wz, wx, ay + 12, wz, B.win);
      }
      w.ring(AX, AZ, ay + AH + 1, 0, AR + 1.4, B.marbleDk); w.ring(AX, AZ, ay + AH + 2, AR + 0.4, AR + 1.4, B.trim);
      const aTop = MH.dome(w, AX, ay + AH + 2, AZ, AR, B.roofB, B.silver);
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; for (let t = 0; t < 1; t += 0.08) { const phi = t * Math.PI / 2; w.set(Math.round(AX + Math.cos(a) * Math.cos(phi) * (AR + 0.2)), Math.round(ay + AH + 2 + Math.sin(phi) * (AR + 0.2)), Math.round(AZ + Math.sin(a) * Math.cos(phi) * (AR + 0.2)), B.silver); } }
      w.box(AX, aTop, AZ, AX, aTop + 2, AZ, B.silver); w.set(AX, aTop + 3, AZ, B.crysP);
      // 서쪽 현관(기둥 넷·박공)과 계단
      for (const dz of [-3, -1, 1, 3]) { w.box(AX - AR - 3, ay + 1, AZ + dz, AX - AR - 3, ay + 8, AZ + dz, B.marble); w.set(AX - AR - 3, ay + 1, AZ + dz, B.marbleDk); w.set(AX - AR - 3, ay + 8, AZ + dz, B.trim); }
      w.box(AX - AR - 4, ay, AZ - 4, AX - AR, ay, AZ + 4, B.marbleDk);
      for (let s = 0; s < 5; s++) w.box(AX - AR - 4 - s, ay + 9 + s, AZ - 4 + s, AX - AR - 1, ay + 9 + s, AZ + 4 - s, s === 0 ? B.trim : B.marble);
      w.box(AX - AR, ay + 1, AZ - 1, AX - AR, ay + 5, AZ + 1, B.door); w.set(AX - AR - 4, ay + 11, AZ, B.crysV);
      for (let s = 1; s <= 3; s++) w.box(AX - AR - 4 - s, ay - s, AZ - 3, AX - AR - 4 - s, ay - s, AZ + 3, B.marbleDk);
      lights.push({ name: 'archive', p: [AX + 0.5, aTop + 2, AZ + 0.5], c: '#c8b8ff', i: 1.4, d: 24, flicker: 0.06, srcR: 5 });
      // 떠도는 책(부품): 서고 둘레를 천천히 돈다
      const books = w.prop({ name: 'books', pivot: [AX + 0.5, ay + AH + 5.5, AZ + 0.5], axis: 'y', speed: 0.35, bob: 0.4, bobSpeed: 0.8 });
      for (let k = 0; k < 9; k++) {
        const a = k / 9 * Math.PI * 2, x = Math.round(AX + Math.cos(a) * 11), z = Math.round(AZ + Math.sin(a) * 11), y = ay + AH + 3 + (k % 3) * 2, c = [B.book1, B.book2, B.book3][k % 3];
        books.box(x, y, z, x, y + 2, z, c); books.set(x + (Math.abs(Math.cos(a)) > 0.7 ? 0 : 1), y + 1, z + (Math.abs(Math.cos(a)) > 0.7 ? 1 : 0), B.page);
      }
      acts.push({
        name: '떠도는 서책', hint: '서고의 책들이 높이 떠올라 빠르게 돌며 빛나는 책장을 흩뿌려요', hit: [AX - 12, ay + AH + 1, AZ - 12, AX + 12, ay + AH + 10, AZ + 12],
        run: async a => {
          a.flash('archive', 3, 5.5); a.glow(1.5, 5.5); a.spin('books', 9, 5);
          await a.move('books', [0, 8, 0], 1.4);
          for (let k = 0; k < 8; k++) { a.burst([AX + 0.5, ay + AH + 14, AZ + 0.5], { n: 20, colors: ['#f4f0e0', '#c8b8ff', '#ffffff'], speed: 7, up: 2, life: 2, gravity: 0.6, spread: 4 }); await a.wait(0.4); }
          await a.move('books', [0, 0, 0], 1.6);
        },
      });
      landmarks.push({ name: '별빛 서고', note: '달의 기록을 모은 둥근 도서관', p: [AX + 0.5, aTop + 10, AZ + 0.5], tag: 'NEW' });
      // 달 거울(서고 남쪽): 거울(부품)이 돌아 첨탑으로 빛을 보낸다
      const MRX = AX + 2, MRZ = AZ + 11, mg = top(MRX, MRZ) > WL ? top(MRX, MRZ) : WL + 1;
      MH.flatten(w, MRX - 3, MRZ - 3, MRX + 3, MRZ + 3, Math.max(mg, ag - 1), B.path, B.rock);
      const my = Math.max(mg, ag - 1) + 1;
      w.cyl(MRX, MRZ, my, my, 2.6, B.marbleDk); w.box(MRX, my + 1, MRZ, MRX, my + 5, MRZ, B.silver); w.set(MRX, my + 3, MRZ, B.trim);
      const MY = my + 10;
      const mirror = w.prop({ name: 'mirror', pivot: [MRX + 0.5, MY + 0.5, MRZ + 0.5], axis: 'y', speed: 0.15 });
      for (let v = -4; v <= 4; v++) for (let u = -4; u <= 4; u++) { const d = Math.hypot(u, v); if (d > 4.4) continue; mirror.set(MRX + u, MY + v, MRZ, d > 3.5 ? B.silver : B.crysP); }
      const beamP = w.prop({ name: 'mbeam', pivot: [MRX + 0.5, MY + 0.5, MRZ + 0.5], scl0: [0, 0, 0] });
      { const tx = MCX, ty2 = main.mid + 6, tz = MCZ, L = Math.hypot(tx - MRX, ty2 - MY, tz - MRZ), N = Math.ceil(L * 1.5); for (let i = 3; i <= N - 13; i++) { const t = i / N; beamP.set(Math.round(MRX + (tx - MRX) * t), Math.round(MY + (ty2 - MY) * t), Math.round(MRZ + (tz - MRZ) * t), i % 6 ? B.beam : B.crysT); } }
      lights.push({ name: 'mirror', p: [MRX + 0.5, MY, MRZ + 1.5], c: '#e8ffff', i: 1.2, d: 18, flicker: 0.05 });
      acts.push({
        name: '달 거울', hint: '달 거울이 빛을 모아 달의 첨탑으로 빛줄기를 쏘아 보내요', hit: [MRX - 5, MY - 5, MRZ - 2, MRX + 5, MY + 5, MRZ + 2],
        run: async a => {
          a.flash('mirror', 4, 6); a.spin('mirror', 6, 1.2);
          a.burst([MRX + 0.5, MY, MRZ + 0.5], { n: 40, colors: ['#e8ffff', '#ffffff'], speed: 6, up: 1, life: 1.2, gravity: 0, spread: 2 });
          await a.tween('mbeam', { scl: [1, 1, 1] }, 1.2);
          a.flash('moon', 3, 3.6); a.glow(1.6, 3.6);
          for (let k = 0; k < 6; k++) { a.burst([MCX + 0.5, main.mid + 6, MCZ + 0.5], { n: 30, colors: ['#e8ffff', '#7af0e0', '#ffffff'], speed: 8, up: 1, life: 1.4, gravity: 0.3, spread: 3 }); await a.wait(0.5); }
          await a.tween('mbeam', { scl: [0, 0, 0] }, 0.8);
        },
      });
      landmarks.push({ name: '달 거울', note: '달빛을 첨탑으로 되비추는 은거울', p: [MRX + 0.5, MY + 9, MRZ + 0.5] });
      // 나루(서고 서쪽 · 가운데 섬 동쪽)와 은빛 나룻배
      const FZ = AZ + 2, FX0 = AX - 16, FX1 = MCX + 24;
      const pier = (x0, x1) => { for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) { w.box(x, WL + 1, FZ - 2, x, WL + 1, FZ + 2, B.plank); if (x % 3 === 0) for (const z of [FZ - 2, FZ + 2]) { w.box(x, WL - 3, z, x, WL, z, B.bark); w.set(x, WL + 2, z, B.silver); } } };
      pier(FX0, AX - 9); pier(FX1 - 6, FX1 + 2);
      for (const x of [FX0, FX1 + 2]) { w.box(x, WL + 2, FZ - 2, x, WL + 5, FZ - 2, B.silver); w.set(x, WL + 6, FZ - 2, B.lamp); }
      // 뱃머리는 -x(서쪽)
      const fx = FX0 - 12, fy = WL + 1, fcx = fx + 4;
      const ferry = w.prop({ name: 'ferry', pivot: [fcx + 0.5, fy, FZ + 0.5] });
      for (let s = 0; s < 11; s++) { const wd = s < 2 ? 0 : s < 4 ? 1 : 2; for (let k = -wd; k <= wd; k++) { ferry.set(fx + s, fy - 1, FZ + k, B.plank); ferry.set(fx + s, fy, FZ + k, Math.abs(k) === wd ? B.silver : B.plank); } }
      ferry.box(fx - 1, fy, FZ, fx - 1, fy + 2, FZ, B.silver); ferry.set(fx - 2, fy + 3, FZ, B.crysP); ferry.set(fx - 1, fy + 3, FZ, B.crysP);
      ferry.box(fx + 7, fy + 1, FZ, fx + 7, fy + 7, FZ, B.silver); ferry.box(fx + 6, fy + 7, FZ, fx + 8, fy + 7, FZ, B.silver); ferry.set(fx + 6, fy + 6, FZ, B.lant); ferry.set(fx + 8, fy + 6, FZ, B.lant);
      ferry.box(fx + 3, fy + 1, FZ - 1, fx + 4, fy + 1, FZ + 1, B.book1); ferry.set(fx + 3, fy + 2, FZ, B.book3);
      // 뱃길(배 가운데 기준): 가운데 섬 나루 → 북동쪽 물길 → 동쪽 끝 너머
      const stop = [FX1 + 10, FZ], lane = [[FX1 + 12, FZ - 12], [146, 56], [W + 14, 50]];
      MH.routeOK(w, [[fcx + 4, FZ], stop, lane[0], lane[1], [W - 1, 50]], 1, '나룻배');
      const rel = ([x, z]) => [x - fcx, 0, z - FZ];
      acts.push({
        name: '은빛 나룻배', hint: '서고 나루의 은빛 나룻배가 가운데 섬 나루에 들렀다가 북동쪽 물길을 따라 호수 밖으로 떠나고, 다시 서고 나루에 나타나요', hit: [fx - 2, fy - 1, FZ - 3, fx + 11, fy + 8, FZ + 3],
        run: async a => {
          a.burst([fcx + 0.5, WL + 1, FZ + 0.5], { n: 24, colors: ['#e0ffff', '#7af0e0'], speed: 3, up: 2, life: 1, gravity: 5, spread: 3, flat: true });
          await a.drive('ferry', [rel(stop)], 3.4, { fwd: '-x' });
          a.burst([stop[0] - 2, WL + 8, FZ + 0.5], { n: 26, colors: ['#ffe0a0', '#ffffff'], speed: 3, up: 3, life: 1.4, gravity: 0.5, spread: 2 });
          await a.wait(1.2);
          await a.drive('ferry', lane.map(rel), 7, { fwd: '-x', back: 1.0 });
        },
      });
      landmarks.push({ name: '서고 나루', note: '은빛 나룻배가 오가는 나루', p: [FX0 - 6, WL + 12, FZ + 0.5] });

      // 작은 바위섬: 돌 제단과 등
      for (const [ix, iz] of [[38, 146], [150, 146], [64, 12]]) {
        const g = top(ix, iz); if (g <= WL) continue;
        w.cyl(ix, iz, g + 1, g + 1, 2.4, B.marbleDk); w.box(ix, g + 2, iz, ix, g + 5, iz, B.marble); w.set(ix, g + 6, iz, B.crysT); w.set(ix, g + 4, iz + 1, B.rune);
        lampPost(ix + 4, iz - 2, 3); MH.rock(w, ix - 4, g + 1, iz + 2, 1.6, B.rockDk, B.moss2);
      }
      // ── 은빛 나무·물가 갈대·바위 ──
      for (let i = 0; i < 46; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), g = top(x, z), gb = w.get(x, g, z);
        if (g <= WL + 1 || w.get(x, g + 1, z) || gb === B.path || gb === B.marbleDk) continue;
        let clear = true; for (let q = 2; q <= 11; q++) for (const [dx, dz] of [[0, 0], [3, 0], [-3, 0], [0, 3], [0, -3]]) if (w.get(x + dx, g + q, z + dz)) clear = false;
        if (clear && MH.dist(x, z, QX, QZ) > 13 && MH.dist(x, z, AX, AZ) > 10 && MH.dist(x, z, MRX, MRZ) > 6 && MH.dist(x, z, P(110), P(92)) > 12) MH.tree(w, x, g + 1, z, { kind: i % 3 ? 'oak' : 'willow', h: w.ri(6, 10), bark: B.bark, leaves: [B.leafS, B.leafT, B.leafT], r: w.r(2.8, 3.8) });
      }
      MH.scatter(w, 700, (x, g, z, b) => {
        if ((b === B.moss || b === B.moss2) && w.chance(0.22)) w.set(x, g + 1, z, w.chance(0.15) ? B.rune : B.leafT);
        else if (b === B.sand && g === WL + 1 && w.chance(0.25)) { w.box(x, g + 1, z, x, g + 1 + w.ri(1, 2), z, B.reed); }
      });
      for (let i = 0; i < 14; i++) { const x = w.ri(6, W - 7), z = w.ri(6, D - 7), g = top(x, z); if (g === WL + 1 && !w.get(x, g + 1, z)) MH.rock(w, x, g + 1, z, w.r(1.2, 2), B.rockDk, B.moss2); }
      // ── 월광 연못의 연꽃(부품, 평소엔 숨김): 기둥 둘레로 피어나 돈다 ──
      const lotus = w.prop({ name: 'lotus', pivot: [PX + 0.5, py + 1, PZ + 0.5], axis: 'y', speed: 0.4, scl0: [0, 0, 0] });
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * Math.PI * 2 + 0.3, lx = Math.round(PX + Math.cos(a) * 4.6), lz = Math.round(PZ + Math.sin(a) * 4.6);
        lotus.box(lx - 1, py + 1, lz - 1, lx + 1, py + 1, lz + 1, B.leafT);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) lotus.set(lx + dx, py + 2, lz + dz, B.lotus);
        lotus.set(lx, py + 2, lz, B.crysP); lotus.set(lx, py + 3, lz, B.lotus);
      }
      acts.push({
        name: '연꽃 개화', hint: '연못에서 빛나는 연꽃이 피어나 기둥 둘레를 맴돌아요', hit: [PX - 7, py - 1, PZ - 7, PX + 7, py + 7, PZ + 7],
        run: async a => {
          a.flash('pool', 3, 6.5);
          await a.tween('lotus', { scl: [1, 1, 1] }, 1.8);
          a.spin('lotus', 3, 3.4);
          for (let k = 0; k < 6; k++) { a.burst([PX + 0.5, py + 3, PZ + 0.5], { n: 26, colors: ['#ffc8f0', '#d0f8ff', '#ffffff'], speed: 5, up: 4, life: 1.8, gravity: -0.3, spread: 4 }); await a.wait(0.55); }
          await a.tween('lotus', { scl: [0, 0, 0] }, 1.4);
        },
      });
      // ── 수정 정원 위를 떠도는 수정 조각(부품) ──
      const CGX = P(110), CGZ = P(92), cgy = top(CGX, CGZ) + 13;
      const shards = w.prop({ name: 'shards', pivot: [CGX + 0.5, cgy + 1, CGZ + 0.5], axis: 'y', speed: 0.25, bob: 0.5, bobSpeed: 0.7 });
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, x = Math.round(CGX + Math.cos(a) * 8), z = Math.round(CGZ + Math.sin(a) * 8), y = cgy + (k % 2) * 2, c = k % 2 ? B.crysV : B.crysT; shards.box(x, y - 1, z, x, y + 2, z, c); shards.set(x + 1, y + 1, z, c); shards.set(x - 1, y, z, c); shards.set(x, y + 3, z, B.crysP); }
      lights.push({ name: 'garden', p: [CGX + 0.5, cgy, CGZ + 0.5], c: '#a0f0ff', i: 1.2, d: 20, flicker: 0.08, srcR: 9 });
      acts.push({
        name: '수정 공명', hint: '수정 조각들이 높이 떠올라 빠르게 돌며 빛을 뿌려요', hit: [CGX - 9, cgy - 13, CGZ - 9, CGX + 9, cgy + 4, CGZ + 9],
        run: async a => {
          a.flash('garden', 4, 5); a.glow(1.7, 5); a.spin('shards', 10, 5);
          await a.move('shards', [0, 8, 0], 1.4);
          for (let k = 0; k < 6; k++) { a.burst([CGX + 0.5, cgy + 9, CGZ + 0.5], { n: 30, colors: ['#7af0e0', '#c8a8ff', '#ffffff'], speed: 10, up: 1, life: 1.6, gravity: 0.5, spread: 2 }); await a.wait(0.4); }
          await a.move('shards', [0, 0, 0], 1.4);
        },
      });
      // ── 달빛 고래: 호수 속에서 뛰어올라 반대편 물속으로 들어간다(부품) ──
      const WS = [P(78) + 4, P(104) + 2], WE = [P(90) - 2, P(92)], wy = base - 3;
      for (const [cx, cz] of [WS, WE]) for (let z = cz - 11; z <= cz + 11; z++) for (let x = cx - 11; x <= cx + 11; x++) if (MH.dist(x, z, cx, cz) <= 10.9 && MH.g(w, x, z) < WL - 1) MH.setH(w, x, z, base - 7, B.sand, B.rockDk);
      const yaw0 = Math.atan2(-(WE[1] - WS[1]), WE[0] - WS[0]);
      const whale = w.prop({ name: 'whale', pivot: [WS[0] + 0.5, wy + 0.5, WS[1] + 0.5], rot0: [0, yaw0, 0], clipOK: 1 });
      whale.ellipsoid(WS[0], wy, WS[1], 5.8, 2.3, 2.3, B.whale); whale.ellipsoid(WS[0] + 1, wy - 1.2, WS[1], 4.4, 1.2, 1.7, B.whaleB);
      whale.box(WS[0] - 8, wy, WS[1], WS[0] - 6, wy + 1, WS[1], B.whale); whale.box(WS[0] - 10, wy + 1, WS[1] - 3, WS[0] - 9, wy + 1, WS[1] + 3, B.whaleB); whale.box(WS[0] - 9, wy + 1, WS[1] - 1, WS[0] - 8, wy + 1, WS[1] + 1, B.whale);
      whale.set(WS[0] + 4, wy + 1, WS[1] - 2, B.whaleB); whale.set(WS[0] + 4, wy + 1, WS[1] + 2, B.whaleB); whale.box(WS[0] + 1, wy - 1, WS[1] - 4, WS[0] + 2, wy - 1, WS[1] - 3, B.whale); whale.box(WS[0] + 1, wy - 1, WS[1] + 3, WS[0] + 2, wy - 1, WS[1] + 4, B.whale);
      for (let x = WS[0] - 4; x <= WS[0] + 3; x += 2) whale.set(x, wy + 3, WS[1], B.whaleB);
      const JH = 19, jump = [];
      for (let i = 1; i <= 10; i++) { const t = i / 10, dy = 4 * JH * t * (1 - t) + (t > 0.9 ? -1 : 0); jump.push([(WE[0] - WS[0]) * t, dy, (WE[1] - WS[1]) * t, Math.atan2(4 * JH * (1 - 2 * t), Math.hypot(WE[0] - WS[0], WE[1] - WS[1])) * 0.9]); }
      acts.push({
        name: '달빛 고래', hint: '호수 속 달빛 고래가 물 위로 크게 뛰어올라 반대편 물속으로 사라졌다가 다시 나타나요', hit: [WS[0] - 6, WL - 1, WS[1] - 6, WS[0] + 6, WL + 2, WS[1] + 6],
        run: async a => {
          a.burst([WS[0] + 0.5, WL + 1, WS[1] + 0.5], { n: 30, colors: ['#e0ffff', '#7af0e0'], speed: 4, up: 3, life: 1, gravity: 6, spread: 3 });
          await a.tween('whale', { off: [0, 2, 0], rot: [0, yaw0, 0.6] }, 0.6, t => t);
          for (const q of jump) await a.tween('whale', { off: [q[0], q[1] + 2, q[2]], rot: [0, yaw0, q[3]] }, 0.28, t => t);
          a.burst([WE[0] + 0.5, WL + 1, WE[1] + 0.5], { n: 70, colors: ['#e0ffff', '#ffffff', '#7af0e0'], speed: 8, up: 8, life: 1.4, gravity: 10, spread: 3 });
          a.flash('moon', 2.4, 1.2);
          await a.tween('whale', { off: [WE[0] - WS[0], -1, WE[1] - WS[1]], rot: [0, yaw0, -0.6] }, 0.5);
          await a.wait(0.6);
          await a.respawn('whale', 1.0);
        },
      });
      landmarks.push({ name: '고래의 물길', note: '달밤에 뛰어오르는 달빛 고래', p: [WS[0] + 6.5, WL + 12, WS[1] - 6.5] });
      // ── 작은 첨탑의 후광(부품): 빛의 고리가 하늘로 솟는다 ──
      sp.forEach((s, k) => { const h = w.prop({ name: 'halo' + k, pivot: [s.cx + 0.5, s.top + 2.5, s.cz + 0.5], axis: 'y', speed: 0.5 }); MH.ringProp(h, s.cx, s.top + 2, s.cz, 2.6, 'xz', B.beam, B.crysP, 4); });
      acts.push({
        name: '첨탑 후광', hint: '세 첨탑 끝의 빛 고리가 하늘로 솟아오르며 넓게 퍼지고, 다시 첨탑 끝에 맺혀요', hit: [sp[2].cx - 4, sp[2].top - 8, sp[2].cz - 4, sp[2].cx + 4, sp[2].top + 4, sp[2].cz + 4],
        run: async a => {
          a.glow(1.7, 5);
          for (let k = 0; k < 3; k++) { a.flash('sp' + k, 4, 5); a.spin('halo' + k, 6, 5); a.tween('halo' + k, { off: [0, 14, 0], scl: [3, 1, 3] }, 2); a.burst([sp[k].cx + 0.5, sp[k].top, sp[k].cz + 0.5], { n: 30, colors: ['#e8ffff', '#7af0e0'], speed: 1, up: 14, life: 1.6, gravity: 0, spread: 1 }); await a.wait(0.3); }
          await a.wait(2.2);
          for (let k = 0; k < 3; k++) a.burst([sp[k].cx + 0.5, sp[k].top + 16, sp[k].cz + 0.5], { n: 40, colors: ['#e8ffff', '#c8a8ff', '#ffffff'], speed: 9, up: 0, life: 1.6, gravity: 0.5, spread: 2, flat: true });
          for (let k = 0; k < 3; k++) a.respawn('halo' + k, 1.0);
          await a.wait(1.1);
        },
      });
      // ── 달맞이 등롱: 호수에 뜬 등롱(부품)들이 차례로 하늘로 떠오른다 ──
      const lantG = [];
      for (let k = 0; k < 3; k++) {
        const nm = 'lant' + k, lp = w.prop({ name: nm, pivot: [P(46.5 + k * 3), WL + 2, P(92.5)], bob: 0.3, bobSpeed: 0.9, phase: k * 2 });
        for (let q = 0; q < 5; q++) { const x = P(38 + ((k * 5 + q) * 7) % 20), z = P(84 + ((k * 5 + q) * 11) % 18); if (MH.g(w, x, z) >= WL || w.get(x, WL + 1, z)) continue; lp.set(x, WL + 1, z, B.silver); lp.box(x, WL + 2, z, x, WL + 3, z, B.lant); lp.set(x, WL + 4, z, B.silver); }
        lantG.push(nm);
      }
      acts.push({
        name: '달맞이 등롱', hint: '호수에 떠 있던 등롱들이 차례로 밤하늘로 떠올라 사라지고, 다시 호수에 떠올라요', hit: [P(36), WL - 1, P(82), P(60), WL + 5, P(104)],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.move(lantG[k], [k - 1, 30 + k * 4, -k * 2], 3.6); a.burst([P(48.5 + k * 3), WL + 1, P(92.5)], { n: 20, colors: ['#ffe0a0', '#ffffff'], speed: 3, up: 2, life: 1, gravity: 2, spread: 6, flat: true }); await a.wait(0.5); }
          await a.wait(3.4);
          for (let k = 0; k < 3; k++) a.burst([P(47.5 + k * 3), WL + 32 + k * 4, P(91.5) - k * 2], { n: 20, colors: ['#ffe0a0', '#fff8d0'], speed: 4, up: 0, life: 1.6, gravity: 0.3, spread: 6 });
          await a.wait(1);
          for (let k = 0; k < 3; k++) a.respawn(lantG[k], 1.0);
          await a.wait(1.1);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
