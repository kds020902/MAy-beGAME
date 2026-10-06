// 대시계탑 안(하위 지도) — 태엽 공방가 대시계탑의 속. 벽돌 탑 안쪽, 북쪽 벽의 맞물린 톱니, 높은 들보에 매달린 진자, 태엽통과 감기 손잡이,
// 서쪽 벽 회랑(계단·태엽 승강기)과 시계판 뒷면, 회랑 위 종. 남·동쪽 벽은 잘라 낮췄다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 60, G = 12;
  // 톱니바퀴: plane 'xy'(z축으로 돎) | 'yz'(x축) | 'xz'(y축)
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
    id: 'cogspire-clocktower', cat: 'magic', sub: true, parent: 'cogspire', name: '대시계탑 안', en: 'Cogspire · Inside the Great Clock', color: '#d8a050', seed: 3411, base: G, time: 'day', size: [W, D, Hh],
    desc: '아르카나의 시간을 정하는 대시계탑의 속. 북쪽 벽에서 놋쇠와 구리 톱니가 맞물려 돌고, 높은 들보에 매달린 진자가 째깍째깍 흔들린다. 서쪽 회랑에 오르면 빛이 비쳐 드는 시계판 뒷면과 큰 종이 있다.',
    info: { title: '장소 정보', en: 'CLOCK TOWER', rows: [['쓰임', '대시계의 기계실 · 종루'], ['1층', '태엽통 · 맞물린 톱니 · 진자'], ['회랑', '시계판 뒷면 · 큰 종 · 태엽 승강기'], ['주의', '도는 톱니에 손을 넣지 말 것']] },
    sky: ['#4a3a30', '#1e1612', '#c8925a'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.5], sun: ['#ffd8b0', 0.6, [0.5, 1, 0.45]],
    night: { sky: ['#20182a', '#0a0810', '#8a5a3a'], stars: false, hemi: ['#c8b0a0', '#140e0a', 0.36], sun: ['#ffd0a0', 0.22, [0.5, 1, 0.45]], haze: '#2a2018' },
    fog: { start: 0.94, floor: G - 6, depth: 6, haze: [6, 0.18, 6], hazeColor: '#a08060' },
    camY: 4, zoom: 1.25,
    particles: [
      { n: 70, colors: ['#ffe8c0', '#fff4dc', '#ffd890'], mode: 'drift', speed: 0.12, wind: 0.05, area: [32, 30, 12], y0: G + 1, y1: G + 26, glow: true },
      { n: 24, colors: ['#ffb040', '#ffe0a0'], mode: 'rise', speed: 0.25, area: [39.5, 32.5, 2], y0: G + 6, y1: G + 12, glow: true },
    ],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' },
      found: { c: '#6a6264', v: 0.05, pat: 'stone' }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' },
      floor: { c: '#6a4a30', top: '#8a6440', v: 0.05, pat: 'plank' }, floorDk: { c: '#5a3e28', top: '#74522f', v: 0.05, pat: 'plank' }, rug: { c: '#7a2a24', v: 0.05, pat: 'check', alt: '#8a3a2a' }, rugB: { c: '#c89a4a', v: 0.04 },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, copper: { c: '#b0683a', v: 0.07 }, verd: { c: '#5a9a88', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      face: { c: '#fff0c8', glow: true }, hand: { c: '#1e1e24', v: 0 }, bell: { c: '#d8b050', v: 0.05 }, door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' },
      glass: { c: '#d8ecf4', glow: true }, lampG: { c: '#ffd890', glow: true }, runeO: { c: '#ffb040', glow: true }, rune: { c: '#5affff', glow: true },
      crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, sack: { c: '#c8b48a', v: 0.06 }, coal: { c: '#222226', v: 0.08 }, oil: { c: '#3a2a10', v: 0.03 }, paper: { c: '#e8dcc0', v: 0.03 }, cloth: { c: '#2a5a4a', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => ((x >> 2) + (z >> 2)) % 2 ? B.cob : B.plate, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 18, X1 = 45, Z0 = 18, Z1 = 45, TOP = G + 28, LOW = G + 3;   // 벽 선(안쪽 바닥은 19..44)
      const GY = G + 10;                                                   // 회랑 바닥 높이

      // ── 바닥: 널마루, 가운데 놋쇠 고리와 붉은 깔개 ──
      for (let z = Z0 - 2; z <= Z1 + 2; z++) for (let x = X0 - 2; x <= X1 + 2; x++) S(x, G, z, B.found);
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) S(x, G, z, (x + (z >> 2)) % 7 === 0 ? B.floorDk : B.floor);
      for (let z = 28; z <= 35; z++) for (let x = 28; x <= 35; x++) S(x, G, z, (x === 28 || x === 35 || z === 28 || z === 35) ? B.rugB : B.rug);
      MH.circle(w, 31.5, 31.5, 6.5, B.brassDk);

      // ── 벽: 북·서는 높이, 남·동은 낮게(카메라 쪽). 놋쇠 띠, 모서리 기둥 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const back = x === X0 || z === Z0, top = back ? TOP : LOW, u = x === X0 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = (y === G + 1) ? B.found : (y % 9 === 0 ? B.brickDk : B.brick);
          if (back && (y === GY || y === G + 20)) b = B.brassDk;
          if (back && u % 7 === 4 && y > G + 1) b = B.brickDk;
          if (!back && y === top) b = B.brassDk;
          S(x, y, z, b);
        }
      }
      for (const [x, z, h] of [[X0, Z0, TOP + 2], [X1, Z0, TOP + 2], [X0, Z1, TOP + 2], [X1, Z1, LOW + 3], [X1, 31, LOW + 2]]) w.box(x, G + 1, z, x, h, z, B.brass);
      // 높은 아치 창(빛이 드는 유리) — 북쪽 벽 위, 서쪽 벽 남쪽
      const lancet = (axis, c, u, y0) => { for (let y = y0; y <= y0 + 6; y++) for (let k = -1; k <= 1; k++) { if (y === y0 + 6 && k) continue; axis === 'z' ? S(u + k, y, c, B.glass) : S(c, y, u + k, B.glass); } axis === 'z' ? S(u, y0 + 7, c, B.brass) : S(c, y0 + 7, u, B.brass); for (let k = -1; k <= 1; k++) axis === 'z' ? S(u + k, y0 - 1, c, B.brassDk) : S(c, y0 - 1, u + k, B.brassDk); };
      for (const u of [23, 31, 39]) lancet('z', Z0, u, G + 30 - 9);
      for (const u of [39]) lancet('x', X0, u, G + 4);
      lancet('x', X0, 39, G + 15);
      // 낮은 벽 위 놋쇠 난간 기둥
      for (let x = X0 + 3; x < X1; x += 4) if (x < 29 || x > 33) S(x, LOW + 1, Z1, B.brass);
      for (let z = Z0 + 3; z < Z1; z += 4) if (z !== 31) S(X1, LOW + 1, z, B.brass);

      // ── 정문(남쪽 벽 가운데, 안쪽에서 본 모습): 판자 문짝, 놋쇠 문설주·인방, 주황 룬 ──
      const DX0 = 30, DX1 = 32;
      for (let x = DX0 - 1; x <= DX1 + 1; x++) for (let y = G + 1; y <= G + 7; y++) {
        const edge = x === DX0 - 1 || x === DX1 + 1 || y === G + 7;
        S(x, y, Z1, edge ? B.brass : (y <= G + 5 ? B.door : B.brassDk));
      }
      S(31, G + 8, Z1, B.runeO); S(DX0 - 2, G + 4, Z1, B.lampG); S(DX1 + 2, G + 4, Z1, B.lampG);
      acts.push(OR.goAct({ at: [31, G + 1, Z1 - 1], h: 6, hit: [DX0, G + 1, Z1 - 1, DX1, G + 5, Z1], name: '밖으로 나가기', goto: 'cogspire', hint: '탑 정문을 밀고 나가 태엽 공방가의 시계탑 앞 계단으로 돌아가요' }));
      lights.push({ name: 'door', p: [31.5, G + 5, Z1 - 1.5], c: '#ffd890', i: 0.7, d: 12, flicker: 0.08, srcR: 4 });

      // ── 북쪽 벽의 맞물린 톱니 셋(부품) ──
      const gears = [[35, G + 8, 5, 0.35, B.brass], [41, G + 15, 2.4, -0.73, B.copper], [42, G + 4, 1.9, -0.9, B.verd]];
      gears.forEach(([gx, gy, r, sp, b], k) => {
        const g = w.prop({ name: 'cg' + k, pivot: [gx + 0.5, gy + 0.5, Z0 + 2], axis: 'z', speed: sp });
        gear(g, gx, gy, Z0 + 1, r, 'xy', b, B.ironDk, 2);
        S(gx, gy, Z0, B.ironDk);
      });
      for (let x = X0 + 11; x <= 38; x++) S(x, G + 1, Z0 + 1, x % 4 ? B.copper : B.brassDk);   // 바닥 쪽 구리관

      // ── 톱니 맞물림 손잡이: 쇠 받침 위 레버(부품) ──
      w.box(29, G + 1, 24, 29, G + 2, 24, B.ironDk); S(29, G + 3, 24, B.brass);
      const lever = w.prop({ name: 'lever', pivot: [29.5, G + 3.5, 24.5], axis: 'x', rot0: [0.5, 0, 0] });
      lever.box(29, G + 4, 24, 29, G + 6, 24, B.iron); lever.set(29, G + 7, 24, B.runeO);
      acts.push({
        name: '톱니 맞물리기', hint: '손잡이를 당기면 북쪽 벽 톱니들이 철컥 맞물려 빠르게 돌아요', hit: [28, G + 1, 19, 44, G + 18, 25],
        run: async a => {
          await a.turn('lever', [-0.5, 0, 0], 0.5);
          a.burst([35.5, G + 8, Z0 + 3], { n: 26, colors: ['#ffe0a0', '#ffb040', '#ffffff'], speed: 5, up: 1, life: 0.8, gravity: 2, spread: 2 });
          a.spin('cg0', 6, 4); a.spin('cg1', 6, 4); a.spin('cg2', 6, 4); a.spin('spring', 4, 4);
          for (let k = 0; k < 6; k++) { a.burst([[40.5, G + 12, Z0 + 3], [41.5, G + 6, Z0 + 3]][k % 2], { n: 10, colors: ['#ffd060', '#ffffff'], speed: 4, up: 1, life: 0.6, gravity: 3, spread: 1 }); await a.wait(0.6); }
          await a.turn('lever', [0.5, 0, 0], 0.6);
        },
      });

      // ── 진자: 북쪽 벽에서 뻗은 쇠 들보에 매달려 흔들린다(부품) ──
      const PX = 31, PZ = 30, PTOP = G + 26;
      w.box(PX, PTOP + 1, Z0 + 1, PX, PTOP + 1, PZ + 1, B.iron); w.box(PX, PTOP + 2, Z0 + 1, PX, PTOP + 2, PZ + 1, B.brassDk);
      w.line(PX, G + 18, Z0 + 1, PX, PTOP, PZ - 4, B.iron);
      S(PX, PTOP, PZ, B.brass);
      const pend = w.prop({ name: 'pend', pivot: [PX + 0.5, PTOP + 0.5, PZ + 0.5], axis: 'z', rock: 0.32, rockSpeed: 1.7 });
      pend.box(PX, G + 8, PZ, PX, PTOP - 1, PZ, B.brassDk);
      for (let v = -2; v <= 2; v++) for (let u = -2; u <= 2; u++) if (Math.hypot(u, v) <= 2.3) pend.set(PX + u, G + 6 + v, PZ, Math.hypot(u, v) < 1 ? B.runeO : B.brass);
      // 진자 아래 눈금 호
      for (let u = -6; u <= 6; u += 2) S(PX + u, G, PZ + (Math.abs(u) > 3 ? 1 : 0), B.brass);
      acts.push({
        name: '진자 멈추기', hint: '흔들리던 진자가 천천히 멈췄다가 다시 크게 흔들려요', hit: [PX - 3, G + 3, PZ - 1, PX + 3, G + 10, PZ + 1],
        run: async a => {
          await a.spin('pend', 0, 2.4);
          a.burst([PX + 0.5, G + 6, PZ + 0.5], { n: 16, colors: ['#ffb040', '#ffe0a0'], speed: 1, up: 1, life: 1.2, gravity: -0.3, spread: 1 });
          await a.wait(0.8);
          await a.spin('pend', 2.4, 3.2);
        },
      });
      landmarks.push({ name: '대진자', note: '시계탑의 시간을 재는 진자', p: [PX + 0.5, PTOP + 6, PZ + 0.5] });

      // ── 태엽통: 놋쇠 상자 위 수평 태엽(부품), 남쪽 면의 감기 손잡이(부품) ──
      const SX = 39, SZ = 32;
      w.box(SX - 3, G + 1, SZ - 2, SX + 3, G + 4, SZ + 2, B.brassDk); w.box(SX - 3, G + 1, SZ - 2, SX + 3, G + 1, SZ + 2, B.ironDk);
      for (const [x, z] of [[SX - 3, SZ - 2], [SX + 3, SZ - 2], [SX - 3, SZ + 2], [SX + 3, SZ + 2]]) w.box(x, G + 1, z, x, G + 5, z, B.brass);
      for (let x = SX - 2; x <= SX + 2; x += 2) S(x, G + 3, SZ + 2, B.runeO);
      w.box(SX, G + 5, SZ, SX, G + 6, SZ, B.iron);
      const spring = w.prop({ name: 'spring', pivot: [SX + 0.5, G + 7, SZ + 0.5], axis: 'y', speed: 0.5 });
      for (let t = 0; t < 1; t += 0.006) { const a = t * Math.PI * 7, r = 0.6 + t * 3.4; spring.set(Math.round(SX + Math.cos(a) * r), G + 7, Math.round(SZ + Math.sin(a) * r), t > 0.9 ? B.brass : B.copper); }
      spring.set(SX, G + 7, SZ, B.rune);
      S(SX, G + 3, SZ + 3, B.iron);
      const crank = w.prop({ name: 'crank', pivot: [SX + 0.5, G + 3.5, SZ + 3.5], axis: 'z' });
      crank.box(SX, G + 3, SZ + 4, SX, G + 6, SZ + 4, B.iron); crank.box(SX, G + 6, SZ + 4, SX + 1, G + 6, SZ + 4, B.brass);
      lights.push({ name: 'spring', p: [SX + 0.5, G + 8, SZ + 0.5], c: '#ffb860', i: 0.8, d: 14, flicker: 0.1, srcR: 4 });
      acts.push({
        name: '태엽 감기', hint: '손잡이를 돌려 태엽을 감으면 태엽통이 빛나며 감기고 톱니가 힘차게 돌아요', hit: [SX - 3, G + 1, SZ - 2, SX + 3, G + 7, SZ + 4],
        run: async a => {
          a.flash('spring', 3, 4); a.glow(1.4, 4);
          a.spin('crank', 1, 4); a.spin('spring', 8, 4); a.spin('cg0', 3, 4); a.spin('cg1', 3, 4); a.spin('cg2', 3, 4);
          for (let k = 0; k < 8; k++) { await a.turn('crank', [0, 0, -(k + 1) * 1.57], 0.4); a.burst([SX + 0.5, G + 7.5, SZ + 0.5], { n: 12, colors: ['#ffb040', '#ffe0a0', '#5affff'], speed: 3, up: 2, life: 0.9, gravity: 0.6, spread: 2 }); }
          a.unwind('crank'); await a.turn('crank', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '태엽통', note: '시계를 움직이는 큰 태엽', p: [SX + 0.5, G + 12, SZ + 0.5] });

      // ── 기름칠 수레와 기름통(부품) ──
      w.box(42, G + 1, 23, 43, G + 1, 24, B.ironDk); w.box(42, G + 2, 23, 43, G + 2, 24, B.plank); S(42, G + 1, 23, B.iron); S(43, G + 1, 24, B.iron);
      S(43, G + 3, 24, B.coal); S(42, G + 3, 24, B.paper);
      const can = w.prop({ name: 'oilcan', pivot: [42.5, G + 3, 23.5], axis: 'x' });
      can.box(42, G + 3, 23, 42, G + 4, 23, B.copper); can.set(42, G + 5, 23, B.brassDk); can.set(42, G + 5, 22, B.brass);
      acts.push({
        name: '기름칠', hint: '기름통이 기울어 톱니에 기름을 똑똑 떨어뜨리면 톱니가 매끄럽게 빨라져요', hit: [41, G + 1, 21, 44, G + 6, 25],
        run: async a => {
          await a.move('oilcan', [0, 2, -1], 0.6); await a.turn('oilcan', [-1.1, 0, 0], 0.5);
          a.spin('cg2', 5, 3.2); a.spin('cg0', 2, 3.2);
          for (let k = 0; k < 7; k++) { a.burst([42.5, G + 6, Z0 + 3.5], { n: 6, colors: ['#c8902a', '#5a3a10', '#ffe0a0'], speed: 0.3, up: -1, life: 1, gravity: 4, spread: 0.3 }); await a.wait(0.4); }
          await a.turn('oilcan', [0, 0, 0], 0.5); await a.move('oilcan', [0, 0, 0], 0.6);
        },
      });

      // ── 서쪽 회랑(계단으로 오른다), 회랑 아래 공구 벽 ──
      for (let z = Z0 + 1; z <= 34; z++) for (let x = X0 + 1; x <= 24; x++) S(x, GY, z, x === 24 || z === 34 ? B.brassDk : B.floorDk);
      for (const z of [26, 33]) w.box(24, G + 1, z, 24, GY - 1, z, B.iron);
      for (let z = 23; z <= 34; z++) S(24, GY + 1, z, z % 2 ? B.brass : B.iron);
      for (let x = 21; x <= 24; x++) S(x, GY + 1, 34, x % 2 ? B.brass : B.iron);
      for (let k = 0; k < 10; k++) { const z = Z1 - 1 - k; for (let y = G + 1; y <= G + 1 + k; y++) for (const x of [19, 20]) S(x, y, z, y === G + 1 + k ? B.floorDk : B.brick); }
      w.box(21, G + 1, Z1 - 1, 21, G + 3, Z1 - 1, B.brass); S(21, G + 4, Z1 - 1, B.lampG);
      // 회랑 아래: 작업대, 시계 부품 선반, 걸린 공구
      w.box(19, G + 1, 27, 20, G + 2, 32, B.plank); w.box(19, G + 1, 27, 20, G + 1, 32, B.ironDk);
      for (let z = 27; z <= 32; z++) { if (hash3(19, 3, z) > 0.5) S(20, G + 3, z, z % 2 ? B.brass : B.copper); }
      for (let z = 20; z <= 25; z++) for (const y of [G + 2, G + 5, G + 8]) { S(19, y, z, B.plank); if (hash3(z, y, 4) > 0.4) S(19, y + 1, z, [B.brass, B.copper, B.verd, B.paper][(z + y) % 4]); }
      S(22, G + 9, 26, B.iron); S(22, G + 8, 26, B.lampG); lights.push({ name: 'bench', p: [21.5, G + 7, 27.5], c: '#ffd890', i: 0.6, d: 10, flicker: 0.1, srcR: 3 });

      // ── 시계판 뒷면(서쪽 벽, 빛이 비쳐 드는 유백 판)과 바늘(부품) ──
      const FY = G + 19, FZ = 27;
      for (let v = -6; v <= 6; v++) for (let u = -6; u <= 6; u++) {
        const d = Math.hypot(u, v); if (d > 6.4) continue;
        const tick = d > 4.2 && d <= 5.2 && (Math.abs(u) < 0.6 || Math.abs(v) < 0.6 || Math.abs(Math.abs(u) - Math.abs(v)) < 0.6);
        S(X0, FY + v, FZ + u, d > 5.2 ? B.brass : tick ? B.hand : B.face);
        if (d > 5.6) S(X0 + 1, FY + v, FZ + u, B.brassDk);
      }
      S(X0 + 1, FY, FZ, B.ironDk);
      const hands = w.prop({ name: 'hands', pivot: [X0 + 2.5, FY + 0.5, FZ + 0.5], axis: 'x', speed: -0.25 });
      hands.box(X0 + 2, FY, FZ, X0 + 2, FY + 4, FZ, B.hand); hands.box(X0 + 2, FY, FZ, X0 + 2, FY, FZ + 3, B.brassDk);
      lights.push({ name: 'face', p: [X0 + 2.5, FY, FZ + 0.5], c: '#ffe8b0', i: 1.2, d: 20, flicker: 0.03, srcR: 5 });
      acts.push({
        name: '시계판 뒤 엿보기', hint: '시계판 뒷면에 바짝 다가가면 바늘이 휙휙 돌고 바깥 햇살이 판을 뚫고 쏟아져요', hit: [X0 + 1, GY + 1, FZ - 6, X0 + 4, FY + 6, FZ + 6],
        run: async a => {
          a.flash('face', 3, 4); a.glow(1.5, 4); a.spin('hands', 40, 4);
          for (let k = 0; k < 8; k++) { a.burst([X0 + 2, FY + (k % 3) * 2 - 2, FZ + 0.5 + (k % 2 ? 3 : -3)], { n: 14, colors: ['#fff0c8', '#ffffff', '#ffd890'], speed: 3, up: 0, life: 1.4, gravity: 0.2, spread: 1.5 }); await a.wait(0.45); }
        },
      });

      // ── 종: 회랑 위 북서쪽 구석, 벽에서 뻗은 쇠 들보에 매달림(부품) ──
      const BX = 22, BZ = 22, BY = G + 24;
      w.box(X0 + 1, BY + 4, BZ, BX + 1, BY + 4, BZ, B.iron); w.box(BX, BY + 4, Z0 + 1, BX, BY + 4, BZ, B.iron); S(BX, BY + 5, BZ, B.brassDk);
      const bell = w.prop({ name: 'bell', pivot: [BX + 0.5, BY + 3.5, BZ + 0.5], axis: 'x' });
      bell.box(BX, BY + 2, BZ, BX, BY + 3, BZ, B.iron); bell.ellipsoid(BX, BY, BZ, 2.2, 2.2, 2.2, B.bell, (dx, dy) => dy >= -2);
      bell.set(BX, BY - 2, BZ, B.ironDk);
      acts.push({
        name: '종 치기', hint: '회랑 위 큰 종이 흔들리며 정각을 알리는 소리가 탑 안에 울려 퍼져요', hit: [BX - 3, GY + 1, BZ - 3, BX + 3, BY + 3, BZ + 3],
        run: async a => {
          for (let k = 0; k < 4; k++) { await a.turn('bell', [0.5, 0, 0], 0.4); a.burst([BX + 0.5, BY - 1, BZ + 0.5], { n: 18, colors: ['#ffe0a0', '#ffb040', '#ffffff'], speed: 8, up: 0.5, life: 1.4, gravity: 0.5, spread: 3, flat: true }); await a.turn('bell', [-0.5, 0, 0], 0.4); }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '시계탑 종', note: '정각마다 울리는 큰 종', p: [BX + 0.5, BY + 9, BZ + 0.5] });

      // ── 태엽 승강기: 북쪽 벽 아래 구덩이에서 회랑 높이까지(부품, 탈 수 있음) ──
      const LX0 = 25, LX1 = 27, LZ0 = 19, LZ1 = 21;
      w.box(LX0, G, LZ0, LX1, G, LZ1, 0); w.box(LX0, G - 1, LZ0, LX1, G - 1, LZ1, B.ironDk);
      for (const z of [LZ0, LZ1 + 1]) w.box(28, G + 1, z, 28, GY + 5, z, B.brass);
      w.box(24, GY + 6, LZ0, 28, GY + 6, LZ0, B.brassDk); w.box(28, GY + 6, LZ0, 28, GY + 6, LZ1 + 1, B.brassDk); S(26, GY + 5, LZ0, B.runeO);
      const lift = w.prop({ name: 'lift' });
      lift.box(LX0, G, LZ0, LX1, G, LZ1, B.plank); lift.set(LX0, G, LZ0, B.brass); lift.set(LX1, G, LZ1, B.brass);
      lift.box(LX1, G + 1, LZ1, LX1, G + 2, LZ1, B.brass);
      acts.push({
        name: '태엽 승강기', hint: '발판이 태엽 힘으로 회랑 높이까지 올라갔다가 잠시 뒤 내려와요. 타고 올라가 회랑으로 내릴 수 있어요', hit: [LX0, G, LZ0, LX1, G + 3, LZ1],
        run: async a => {
          a.burst([LX0 + 1.5, G + 1, LZ0 + 1.5], { n: 16, colors: ['#e8e0d8', '#b8b0a8'], speed: 2, up: 1, life: 1, gravity: -0.4, spread: 1.5 });
          await a.move('lift', [0, GY - G, 0], 3.2); await a.wait(4); await a.move('lift', [0, 0, 0], 3.2);
        },
      });

      // ── 살림: 동쪽 작업대, 상자·자루·석탄통, 벽 등 ──
      w.box(43, G + 1, 37, 44, G + 2, 42, B.plank); w.box(43, G + 1, 37, 44, G + 1, 42, B.ironDk);
      for (let z = 37; z <= 42; z++) if (hash3(43, 5, z) > 0.45) S(43, G + 3, z, [B.brass, B.copper, B.paper, B.verd][z % 4]);
      S(44, G + 3, 39, B.lampG); lights.push({ name: 'desk', p: [43.5, G + 4, 39.5], c: '#ffd890', i: 0.6, d: 10, flicker: 0.1, srcR: 3 });
      for (const [x, z, k] of [[41, 43, 0], [37, 43, 1], [25, 43, 2], [24, 37, 0], [43, 27, 1]]) {
        if (k === 0) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate); S(x, G + 2, z, B.brassDk); }
        else if (k === 1) { w.box(x, G + 1, z, x + 1, G + 1, z, B.sack); S(x, G + 2, z, B.sack); }
        else { w.box(x, G + 1, z, x, G + 2, z, B.copper); S(x, G + 3, z, B.coal); }
      }
      S(X0 + 1, G + 9, 41, B.lampG); S(X0 + 1, G + 8, 41, B.brassDk);
      lights.push({ name: 'wallW', p: [X0 + 1.5, G + 9, 41.5], c: '#ffd890', i: 0.6, d: 12, flicker: 0.12, srcR: 3 });
      lights.push({ name: 'sun', p: [31, G + 24, Z0 + 2], c: '#fff0d8', i: 0.8, d: 30, flicker: 0, srcR: 6 });
      landmarks.push({ name: '맞물린 톱니', note: '북쪽 벽의 놋쇠·구리 톱니', p: [36.5, G + 20, Z0 + 2] });
      return { lights, landmarks, acts };
    },
  });
})();
