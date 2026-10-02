// 월광 첨탑 — 달빛 호수의 바위섬들, 흰 첨탑과 아치 다리, 차원문, 물에서 솟는 달빛 다리 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  MAPS.push({
    id: 'lunaris', cat: 'magic', name: '월광 첨탑', en: 'Lunaris Spires', color: '#9ae8e0', seed: 353, base: 22, time: 'night',
    desc: '달빛을 모으는 흰 첨탑들의 구역. 보름밤이면 호수 위로 빛의 다리가 떠올라 섬과 섬을 잇는다.',
    info: { title: '구역 정보', en: 'DISTRICT', rows: [['학파', '월광 사제단'], ['명물', '초승달 첨탑 · 달빛 다리'], ['주의', '차원문 앞에서 이름을 부르지 말 것']] },
    sky: ['#1a3a4a', '#060e18', '#bff0ff'], stars: true,
    hemi: ['#d0f0ff', '#102030', 0.68], sun: ['#e0f4ff', 0.6, [0.45, 1, 0.5]],
    day: { sky: ['#e0f4f8', '#6ab0d8', '#ffffff'], stars: false, hemi: ['#ffffff', '#4a5a60', 0.6], sun: ['#fff8ec', 0.8, [0.45, 1, 0.5]] },
    liquid: ['#1a4a6a', '#3a8ab0', '#ffffff'], liqSpeed: 0.4,
    fog: { start: 0.8, floor: 10, depth: 10, haze: [24, 0.18, 4], hazeColor: '#2a5a6a' },
    camY: 14,
    particles: [
      { n: 110, colors: ['#9af8f0', '#e0ffff'], mode: 'rise', speed: 0.5, area: [64, 74, 7], y0: 24, y1: 60 },
      { n: 110, colors: ['#e0f0ff', '#c8e8ff'], mode: 'drift', speed: 0.2, y0: 26, y1: 96 },
    ],
    blocks: {
      moss: { c: '#3a4a50', top: '#4a7a7a', v: 0.1 }, moss2: { c: '#3a4a50', top: '#56867e', v: 0.1 }, sand: { c: '#6a7a80', top: '#8a9aa0', v: 0.06 },
      dirt: { c: '#3a4a50', v: 0.08 }, rock: { c: '#7a8494', v: 0.06, pat: 'big' }, rockDk: { c: '#4a5260', v: 0.06, pat: 'stone' },
      path: { c: '#3a4a50', top: '#c8d0d8', v: 0.04, pat: 'stone' }, marble: { c: '#e8eef4', v: 0.03, pat: 'big' }, marbleDk: { c: '#b8c4d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f8fa', v: 0.02 },
      silver: { c: '#c8d4e0', v: 0.04 }, leafS: { c: '#a8c8c8', v: 0.09 }, leafT: { c: '#7ab0b0', v: 0.09 }, bark: { c: '#6a6a7a', v: 0.05 }, door: { c: '#4a5a6a', v: 0.03, pat: 'plank' },
      win: { c: '#c8f4ff', night: true, day: '#8ab0c8' }, lamp: { c: '#c8fff4', night: true, day: '#a8c4c0' },
      crysT: { c: '#7af0e0', glow: true }, crysP: { c: '#d0f8ff', glow: true }, crysV: { c: '#c8a8ff', glow: true },
      portal: { c: '#b890ff', glow: true }, portal2: { c: '#e8d0ff', glow: true }, rune: { c: '#8af0ff', glow: true }, beam: { c: '#e8ffff', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, WL = base + 1;
      const isles = [[64, 56, 18, 5], [26, 28, 11, 4], [102, 26, 11, 4], [20, 88, 13, 4], [106, 92, 13, 4], [64, 112, 8, 3]];
      MH.terrain(w, {
        floor: 4,
        height: (x, z) => {
          let hh = -6 + n.fbm(x * 0.06, z * 0.06) * 2;
          for (const [cx, cz, r, k] of isles) { const d = Math.hypot(x - cx, z - cz) + (n.fbm(x * 0.09 + cx, z * 0.09, 3) - 0.5) * r * 0.4; hh = Math.max(hh, MH.sstep(r, r - 4, d) * (k + 3) - 2.5 + MH.sstep(r - 3, 0, d) * 1.5); }
          return base + hh;
        },
        surface: (x, z, y, s) => y <= WL + 1 ? B.sand : s >= 3 ? B.rock : n.fbm(x * 0.13, z * 0.13, 2) > 0.55 ? B.moss2 : B.moss,
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
        for (let y = g + 3; y < g + h; y++) {
          const a = y * 0.42, rr = r - (y - g) * 0.02;
          w.set(Math.round(cx + Math.cos(a) * (rr + 0.7)), y, Math.round(cz + Math.sin(a) * (rr + 0.7)), B.silver);
          if (y % 5 === 0) { const wx = Math.round(cx + Math.cos(a + 2.4) * rr), wz = Math.round(cz + Math.sin(a + 2.4) * rr); w.box(wx, y, wz, wx, y + 1, wz, B.win); }
        }
        for (let y = g + 12; y < g + h - 4; y += 14) { const rr = r - (y - g) * 0.02; w.ring(cx, cz, y, rr, rr + 2, B.marbleDk); w.ring(cx, cz, y + 1, rr + 1.2, rr + 2, B.trim); }
        w.box(cx, g, cz + Math.floor(r), cx, g + 3, cz + Math.floor(r), B.door);
        const rt = r - h * 0.02;
        w.ring(cx, cz, g + h + 1, 0, rt + 1.2, B.marbleDk);
        const t = MH.cone(w, cx, cz, g + h + 2, rt + 0.8, tip, step || 0.28);
        return { top: t, mid: g + Math.round(h * 0.55), g, cx, cz, r };
      };
      // ── 달의 첨탑(가운데 섬) ──
      const main = spire(64, 50, 54, 5, B.crysP, 0.42);
      const moon = w.prop({ name: 'moon', pivot: [64.5, main.top + 7.5, 50.5], axis: 'y', speed: 0.3 });
      for (let a = -2.3; a <= 2.3; a += 0.08) {
        const co = Math.cos(a), si = Math.sin(a);
        for (const rr of [5.4, 4.6, 3.8]) if (rr > 4.5 || Math.abs(a) < 1.5 || (rr > 4 && Math.abs(a) < 1.9)) moon.set(Math.round(64 - co * rr + 2), Math.round(main.top + 7 + si * rr), 50, B.crysP);
      }
      w.box(64, main.top, 50, 64, main.top + 1, 50, B.silver);
      const stones = w.prop({ name: 'stones', pivot: [64.5, main.mid, 50.5], axis: 'y', speed: -0.5 });
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, x = Math.round(64 + Math.cos(a) * 10), z = Math.round(50 + Math.sin(a) * 10), y = main.mid - 1 + (k % 2) * 3; stones.box(x, y, z, x, y + 2, z, k % 2 ? B.rune : B.marbleDk); stones.set(x, y + 1, z + 1, B.marbleDk); }
      lights.push({ name: 'moon', p: [64.5, main.top + 7, 50.5], c: '#d0f8ff', i: 1.8, d: 28, flicker: 0.05, srcR: 8 });
      lights.push({ p: [64.5, main.g + 4, 56.5], c: '#c8fff4', i: 0.9, d: 12, flicker: 0.05, night: true, srcR: 6 });
      w.set(63, main.g + 4, 56, B.lamp); w.set(65, main.g + 4, 56, B.lamp);
      acts.push({
        name: '초승달', hint: '첨탑 끝의 초승달이 빨리 돌며 달빛을 뿌려요', hit: [58, main.top, 46, 70, main.top + 14, 54],
        run: async a => { a.flash('moon', 3, 4.5); a.glow(1.6, 4.5); a.spin('stones', 5, 4.5); a.spin('moon', 8, 4.5); for (let k = 0; k < 9; k++) { a.burst([64.5, main.top + 7, 50.5], { n: 26, colors: ['#d0f8ff', '#ffffff', '#7af0e0'], speed: 9, up: 1, life: 2.2, gravity: 1.5, spread: 3 }); await a.wait(0.5); } },
      });
      landmarks.push({ name: '달의 첨탑', note: '꼭대기에서 초승달이 돈다', p: [64.5, main.top + 16, 50.5], tag: 'MOON' });
      // ── 작은 첨탑과 섬을 잇는 아치 다리 ──
      const sp = [spire(26, 26, 30, 3.2, B.crysT), spire(102, 24, 34, 3.4, B.crysT), spire(100, 86, 28, 3.2, B.crysV)];
      sp.forEach(s => lights.push({ p: [s.cx + 0.5, s.top - 3, s.cz + 0.5], c: '#70f0e0', i: 1, d: 14, flicker: 0.05, srcR: 6 }));
      const span = (a, b, lift) => {
        const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz), px = -dz / len, pz = dx / len, nn = Math.ceil(len * 2);
        const ya = Math.max(WL + 2, MH.g(w, Math.round(a[0]), Math.round(a[1])) + 1), yb = Math.max(WL + 2, MH.g(w, Math.round(b[0]), Math.round(b[1])) + 1);
        for (let i = 0; i <= nn; i++) {
          const t = i / nn, x = a[0] + dx * t, z = a[1] + dz * t, y = Math.round(MH.lerp(ya, yb, t) + Math.sin(t * Math.PI) * lift);
          for (let k = -2; k <= 2; k++) { const bx = Math.round(x + px * k), bz = Math.round(z + pz * k); w.set(bx, y, bz, Math.abs(k) === 2 ? B.marbleDk : B.marble); if (Math.abs(k) === 2) { w.set(bx, y + 1, bz, B.trim); if (i % 8 === 4) { w.set(bx, y + 2, bz, B.trim); w.set(bx, y + 3, bz, B.lamp); } } }
          if (i % 14 === 7) for (let yy = Math.max(1, MH.g(w, Math.round(x), Math.round(z))); yy < y; yy++) { w.set(Math.round(x), yy, Math.round(z), B.marbleDk); }
        }
        return [a[0] + dx / 2, (ya + yb) / 2 + lift, a[1] + dz / 2];
      };
      const br1 = span([52, 46], [34, 32], 5); span([76, 46], [94, 30], 5); span([78, 64], [96, 84], 5); span([50, 64], [30, 82], 5);
      lights.push({ p: [br1[0], br1[1] + 3, br1[2]], c: '#c8fff4', i: 0.9, d: 14, flicker: 0.05, night: true, srcR: 7 });
      landmarks.push({ name: '하늘 다리', note: '섬과 첨탑을 잇는 흰 아치', p: [br1[0], br1[1] + 8, br1[2]] });
      // ── 월광 연못(가운데 섬 남쪽) ──
      const PX = 64, PZ = 68, py = top(PX, PZ);
      MH.flatten(w, PX - 9, PZ - 9, PX + 9, PZ + 9, py, B.path, B.rock);
      for (let z = PZ - 8; z <= PZ + 8; z++) for (let x = PX - 8; x <= PX + 8; x++) {
        const d = MH.dist(x, z, PX, PZ);
        if (d > 7.6) continue;
        if (d > 6.4) { w.set(x, py + 1, z, B.marble); continue; }
        MH.setH(w, x, z, py - 2, B.marbleDk, B.rock); w.liquid(x, z, py);
      }
      w.box(PX, py - 1, PZ, PX, py + 3, PZ, B.marble); w.box(PX, py + 4, PZ, PX, py + 6, PZ, B.crysP); w.set(PX - 1, py + 5, PZ, B.crysP); w.set(PX + 1, py + 5, PZ, B.crysP);
      lights.push({ name: 'pool', p: [PX + 0.5, py + 6, PZ + 0.5], c: '#a0f0ff', i: 1.3, d: 18, flicker: 0.05 });
      landmarks.push({ name: '월광 연못', note: '달빛을 비추는 둥근 연못', p: [PX + 0.5, py + 12, PZ + 0.5] });
      // ── 달빛 다리: 남쪽 섬과 가운데 섬 사이 물속에서 솟는다(부품) ──
      const bridge = w.prop({ name: 'mbridge', pivot: [64.5, WL + 2, 92], off0: [0, -5, 0] });
      for (let z = 80; z <= 104; z++) { const y = WL + 2 + Math.round(Math.sin((z - 80) / 24 * Math.PI) * 2); for (let x = 62; x <= 66; x++) if (!w.get(x, y, z)) bridge.set(x, y, z, (x === 62 || x === 66) ? B.crysT : B.beam); }
      const gz = top(64, 110) + 1;
      w.cyl(64, 112, gz, gz, 5, B.marbleDk); for (let k = 0; k < 6; k++) { const a = k * 1.047, x = Math.round(64 + Math.cos(a) * 4.4), z = Math.round(112 + Math.sin(a) * 4.4); w.box(x, gz + 1, z, x, gz + 6, z, B.marble); }
      w.ring(64, 112, gz + 7, 3.4, 5, B.marbleDk); MH.dome(w, 64, gz + 8, 112, 5, B.silver, B.trim); w.box(64, gz + 1, 112, 64, gz + 2, 112, B.marble); w.set(64, gz + 3, 112, B.rune);
      lights.push({ name: 'gazebo', p: [64.5, gz + 4, 112.5], c: '#8af0ff', i: 1, d: 14, flicker: 0.05 });
      acts.push({
        name: '달빛 다리', hint: '호수에서 빛의 다리가 떠올랐다가 다시 잠겨요', hit: [60, gz + 1, 108, 68, gz + 8, 116],
        run: async a => {
          a.flash('gazebo', 3, 9); a.flash('pool', 2, 9);
          for (let k = 0; k < 4; k++) { a.burst([64.5, WL + 1, 84 + k * 6], { n: 24, colors: ['#e0ffff', '#7af0e0'], speed: 3, up: 4, life: 1.2, gravity: 6, spread: 3 }); }
          await a.move('mbridge', [0, 0, 0], 2.6);
          await a.wait(4);
          await a.move('mbridge', [0, -5, 0], 2.4);
          a.burst([64.5, WL + 1, 92], { n: 40, colors: ['#e0ffff', '#ffffff'], speed: 4, up: 3, life: 1, gravity: 6, spread: 8, flat: true });
        },
      });
      landmarks.push({ name: '달맞이 정자', note: '달빛 다리를 부르는 곳', p: [64.5, gz + 15, 112.5] });
      // ── 차원문(서쪽 섬) ──
      const QX = 20, QZ = 88, qg = top(QX, QZ) + 1, QR = 9, qy = qg + QR + 1;
      MH.flatten(w, QX - 5, QZ - 12, QX + 8, QZ + 12, qg - 1, B.path, B.rock);
      w.box(QX - 2, qg, QZ - 11, QX + 2, qg, QZ + 11, B.marbleDk); w.box(QX - 1, qg + 1, QZ - 10, QX + 1, qg + 1, QZ + 10, B.marble);
      for (let v = -QR - 1; v <= QR + 1; v++) for (let u = -QR - 1; u <= QR + 1; u++) {
        const d = Math.hypot(u, v);
        if (qy + v <= qg + 1) continue;
        if (d <= QR + 0.5 && d > QR - 1.6) { for (const dx of [-1, 0, 1]) w.set(QX + dx, qy + v, QZ + u, (dx === 0 && Math.round(Math.atan2(v, u) * 4) % 2 === 0) ? B.rune : B.marble); }
        else if (d <= QR - 1.6) w.set(QX, qy + v, QZ + u, (Math.floor(d * 1.2 + Math.atan2(v, u) * 2) % 2) ? B.portal : B.portal2);
      }
      const orbit = w.prop({ name: 'portal', pivot: [QX + 3.5, qy + 0.5, QZ + 0.5], axis: 'x', speed: 0.4 });
      for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2, y = Math.round(qy + Math.sin(a) * (QR - 3)), z = Math.round(QZ + Math.cos(a) * (QR - 3)); orbit.box(QX + 3, y, z, QX + 3, y + (k % 2), z, k % 2 ? B.rune : B.crysV); }
      lights.push({ name: 'portal', p: [QX + 2.5, qy, QZ + 0.5], c: '#b890ff', i: 1.8, d: 22, flicker: 0.15 });
      acts.push({
        name: '차원문', hint: '룬이 돌며 문이 열리고 빛이 쏟아져요', hit: [QX - 1, qg + 2, QZ - QR, QX + 4, qy + QR, QZ + QR],
        run: async a => {
          a.flash('portal', 3.5, 4.5); a.glow(1.7, 4.5); a.spin('portal', 9, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([QX + 2, qy, QZ + 0.5], { n: 36, colors: ['#b890ff', '#e8d0ff', '#ffffff'], speed: 7, up: 1, life: 1.6, gravity: 0, spread: 4 }); await a.wait(0.5); }
        },
      });
      landmarks.push({ name: '차원문', note: '다른 세계로 이어진 문', p: [QX + 0.5, qy + QR + 6, QZ + 0.5] });
      // ── 수정 정원(동쪽 섬) ──
      const crystals = [[110, 96, true], [114, 88, false], [106, 102, false], [112, 82, true], [98, 98, false], [116, 94, false]];
      for (const [cx, cz, big] of crystals) {
        const g = top(cx, cz);
        if (g <= WL || w.get(cx, g + 1, cz)) continue;
        const c = hash3(cx, 1, cz) > 0.5 ? B.crysT : B.crysV;
        for (let i = 0; i < (big ? 6 : 3); i++) { const a = w.r(0, Math.PI * 2), l = w.r(big ? 4 : 2, big ? 10 : 5), tl = w.r(0.15, 0.45); w.line(cx, g + 1, cz, cx + Math.cos(a) * l * tl, g + 1 + l, cz + Math.sin(a) * l * tl, c, big && i === 0 ? 0.9 : 0); }
        if (big) lights.push({ p: [cx + 0.5, g + 4, cz + 0.5], c: c === B.crysT ? '#70f0e0' : '#c0a0ff', i: 1.1, d: 14, flicker: 0.05 });
      }
      landmarks.push({ name: '수정 정원', note: '청록과 보라 수정 군락', p: [110.5, top(110, 96) + 14, 96.5] });
      // ── 은빛 나무와 물가 ──
      for (let i = 0; i < 30; i++) {
        const x = w.ri(6, 122), z = w.ri(6, 122), g = top(x, z), gb = w.get(x, g, z);
        if (g <= WL + 1 || w.get(x, g + 1, z) || gb === B.path || gb === B.marbleDk) continue;
        let clear = true; for (let q = 2; q <= 10; q++) for (const [dx, dz] of [[0, 0], [3, 0], [-3, 0], [0, 3], [0, -3]]) if (w.get(x + dx, g + q, z + dz)) clear = false;
        if (clear && MH.dist(x, z, QX, QZ) > 12) MH.tree(w, x, g + 1, z, { kind: i % 3 ? 'oak' : 'willow', h: w.ri(6, 9), bark: B.bark, leaves: [B.leafS, B.leafT, B.leafT], r: w.r(2.8, 3.6) });
      }
      MH.scatter(w, 500, (x, g, z, b) => { if ((b === B.moss || b === B.moss2) && w.chance(0.2)) w.set(x, g + 1, z, w.chance(0.15) ? B.rune : B.leafT); });
      return { lights, landmarks, acts };
    },
  });
})();
