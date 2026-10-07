// 대시계탑 안(하위 지도) — 태엽 공방가 대시계탑의 속. 벽돌 탑 안쪽, 북쪽 벽의 맞물린 톱니, 높은 들보에 매달린 진자, 태엽통과 감기 손잡이,
// 서쪽 벽 회랑(계단·태엽 승강기)과 시계판 뒷면, 회랑 위 종. 남·동쪽 벽은 잘라 낮췄다
// 2배 해상도(1칸 ≈ 25cm, 128칸), playerScale 2: 낱돌 굽도리와 벽돌 띠·벽기둥, 살대가 있는 첨두 유리창, 바퀴살·톱니·볼트가 있는 톱니,
// 장식 추가 달린 진자, 눈금·숫자 표지가 있는 시계판 뒷면, 입술이 벌어진 종, 난간 동자가 있는 회랑, 테 두른 통과 모서리 쇠를 댄 상자.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 120, G = 24;
  // 톱니바퀴(2배용): 테·톱니·바퀴살·허브와 볼트. plane 'xy'(z축으로 돎) | 'yz'(x축) | 'xz'(y축)
  function gear(p, cx, cy, cz, r, plane, b, hub, thick, bolt) {
    const put = (u, v, blk) => { for (let t = 0; t < (thick || 1); t++) { if (plane === 'xz') p.set(cx + u, cy + t, cz + v, blk); else if (plane === 'xy') p.set(cx + u, cy + v, cz + t, blk); else p.set(cx + t, cy + u, cz + v, blk); } };
    const R = Math.ceil(r + 3), teeth = Math.max(8, Math.round(r * 1.25)), spokes = r > 6 ? 6 : 4;
    for (let v = -R; v <= R; v++) for (let u = -R; u <= R; u++) {
      const d = Math.hypot(u, v), a = Math.atan2(v, u);
      let blk = 0;
      if (d <= r + 2.2 && d > r && Math.cos(a * teeth) > 0.15) blk = b;
      else if (d <= r && d > r - 2.4) blk = b;
      else if (d <= r - 2.4 && d > r - 3.2) blk = hub;          // 테 안쪽 턱
      else if (d <= r && Math.abs(Math.sin(a * spokes / 2)) * d < 1.1) blk = b;   // 바퀴살
      if (d < 2.6) blk = hub; if (d < 1.2) blk = bolt || b;
      if (blk) put(u, v, blk);
    }
  }
  MAPS.push({
    id: 'cogspire-clocktower', cat: 'magic', sub: true, parent: 'cogspire', name: '대시계탑 안', en: 'Cogspire · Inside the Great Clock', color: '#d8a050', seed: 3411, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '아르카나의 시간을 정하는 대시계탑의 속. 북쪽 벽에서 놋쇠와 구리 톱니가 맞물려 돌고, 높은 들보에 매달린 진자가 째깍째깍 흔들린다. 서쪽 회랑에 오르면 빛이 비쳐 드는 시계판 뒷면과 큰 종이 있다.',
    info: { title: '장소 정보', en: 'CLOCK TOWER', rows: [['쓰임', '대시계의 기계실 · 종루'], ['1층', '태엽통 · 맞물린 톱니 · 진자'], ['회랑', '시계판 뒷면 · 큰 종 · 태엽 승강기'], ['주의', '도는 톱니에 손을 넣지 말 것']] },
    sky: ['#4a3a30', '#1e1612', '#c8925a'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.5], sun: ['#ffd8b0', 0.6, [0.5, 1, 0.45]],
    night: { sky: ['#20182a', '#0a0810', '#8a5a3a'], stars: false, hemi: ['#c8b0a0', '#140e0a', 0.36], sun: ['#ffd0a0', 0.22, [0.5, 1, 0.45]], haze: '#2a2018' },
    fog: { start: 0.94, floor: G - 12, depth: 12, haze: [12, 0.09, 12], hazeColor: '#a08060' },
    camY: 8, zoom: 1.25,
    particles: [
      { n: 90, colors: ['#ffe8c0', '#fff4dc', '#ffd890'], mode: 'drift', speed: 0.24, wind: 0.1, area: [64, 60, 24], y0: G + 2, y1: G + 52, glow: true },
      { n: 30, colors: ['#ffb040', '#ffe0a0'], mode: 'rise', speed: 0.5, area: [79, 65, 4], y0: G + 12, y1: G + 24, glow: true },
    ],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' },
      found: { c: '#6a6264', v: 0.05, pat: 'stone' }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' },
      st1: { c: '#6e6668', v: 0.05 }, st2: { c: '#625a5c', v: 0.05 }, st3: { c: '#78706a', v: 0.05 }, mortar: { c: '#4a4442', v: 0.03 },
      floor: { c: '#6a4a30', top: '#8a6440', v: 0.05, pat: 'plank' }, floorDk: { c: '#5a3e28', top: '#74522f', v: 0.05, pat: 'plank' }, rug: { c: '#7a2a24', v: 0.05, pat: 'check', alt: '#8a3a2a' }, rugB: { c: '#c89a4a', v: 0.04 },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, brassLt: { c: '#e0b860', v: 0.05 }, copper: { c: '#b0683a', v: 0.07 }, verd: { c: '#5a9a88', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      face: { c: '#fff0c8', glow: true }, hand: { c: '#1e1e24', v: 0 }, bell: { c: '#d8b050', v: 0.05 }, bellDk: { c: '#a8842e', v: 0.05 }, door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, doorDk: { c: '#1e1410', v: 0.03 }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' },
      glass: { c: '#d8ecf4', glow: true }, glassA: { c: '#f0d8a0', glow: true }, lampG: { c: '#ffd890', glow: true }, runeO: { c: '#ffb040', glow: true }, rune: { c: '#5affff', glow: true },
      crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, crateEdge: { c: '#6a4e30', v: 0.04 }, sack: { c: '#c8b48a', v: 0.06 }, sack2: { c: '#b8a47a', v: 0.06 }, rope: { c: '#a8906a', v: 0.04 },
      coal: { c: '#222226', v: 0.08 }, oil: { c: '#3a2a10', v: 0.03 }, paper: { c: '#e8dcc0', v: 0.03 }, cloth: { c: '#2a5a4a', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => ((x >> 3) + (z >> 3)) % 2 ? B.cob : B.plate, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 36, X1 = 91, Z0 = 36, Z1 = 91, TOP = G + 56, LOW = G + 6;   // 벽은 두 칸 두께(X0..X0+1, X1-1..X1). 안쪽 바닥 38..89
      const GY = G + 20;                                                   // 회랑 바닥 높이
      const STN = [B.st1, B.st2, B.st3];
      const stoneAt = (u, y) => { const c = Math.floor((y - G) / 3), r = ((y - G) % 3 + 3) % 3, uu = u + (c & 1) * 3; if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar; return STN[(hash3(Math.floor(uu / 6), c, 9) * 3) | 0]; };

      // ── 바닥: 널마루(판자 이음 엇갈림), 가운데 놋쇠 고리와 붉은 깔개 ──
      for (let z = Z0 - 4; z <= Z1 + 4; z++) for (let x = X0 - 4; x <= X1 + 4; x++) { S(x, G, z, B.found); S(x, G - 1, z, B.found); }
      for (let z = Z0 + 2; z < Z1 - 1; z++) for (let x = X0 + 2; x < X1 - 1; x++) {
        const row = x >> 2, seam = ((z + row * 5) % 12) === 0;
        S(x, G, z, seam || (row % 4 === 1) ? B.floorDk : B.floor);
      }
      for (let z = 56; z <= 71; z++) for (let x = 56; x <= 71; x++) {
        const e = Math.min(x - 56, 71 - x, z - 56, 71 - z);
        S(x, G, z, e === 0 ? B.rugB : e === 1 ? B.rug : e === 2 ? B.rugB : B.rug);
      }
      MH.circle(w, 63.5, 63.5, 13, B.brassDk); MH.circle(w, 63.5, 63.5, 14, B.brass);

      // ── 벽: 북·서는 높이, 남·동은 낮게(카메라 쪽). 낱돌 굽도리, 놋쇠 띠, 벽기둥 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const inX = x <= X0 + 1 || x >= X1 - 1, inZ = z <= Z0 + 1 || z >= Z1 - 1;
        if (!inX && !inZ) continue;
        const back = x <= X0 + 1 || z <= Z0 + 1, top = back ? TOP : LOW, u = x <= X0 + 1 ? z : x;
        const inner = x === X0 + 1 || z === Z0 + 1 || x === X1 - 1 || z === Z1 - 1;
        for (let y = G + 1; y <= top; y++) {
          let b = (y <= G + 4) ? stoneAt(u, y) : ((y - G) % 18 === 0 ? B.brickDk : B.brick);
          if (back && (y === GY || y === GY - 1 || y === G + 40 || y === G + 41)) b = B.brassDk;
          if (back && inner && (u % 14 === 8 || u % 14 === 9) && y > G + 4) b = B.brickDk;   // 벽기둥
          if (!back && y >= top - 1) b = y === top ? B.brass : B.brassDk;
          S(x, y, z, b);
        }
      }
      for (const [x, z, h] of [[X0, Z0, TOP + 4], [X1 - 1, Z0, TOP + 4], [X0, Z1 - 1, TOP + 4], [X1 - 1, Z1 - 1, LOW + 6], [X1 - 1, 62, LOW + 4]]) {
        w.box(x, G + 1, z, x + 1, h, z + 1, B.brass);
        for (let y = G + 6; y < h; y += 10) w.box(x - (x > 60 ? 0 : 0), y, z, x + 1, y, z + 1, B.brassDk);
        w.box(x, h + 1, z, x + 1, h + 1, z + 1, B.brassLt);
      }
      // 높은 첨두 창(빛이 드는 유리): 가운데 살대, 가로살, 꼭대기 첨두, 창턱과 테
      const lancet = (axis, c, u, y0) => {
        const P = (k, y, b) => axis === 'z' ? S(u + k, y, c, b) : S(c, y, u + k, b);
        const P2 = (k, y, b) => axis === 'z' ? S(u + k, y, c + 1, b) : S(c + 1, y, u + k, b);
        for (let y = y0; y <= y0 + 14; y++) for (let k = -3; k <= 3; k++) {
          const ty = y - (y0 + 10);
          if (ty > 0 && Math.abs(k) > 3 - ty) continue;
          const bar = k === 0 || y === y0 + 6;
          P(k, y, bar ? B.brassDk : (hash3(u + k, y, c) > 0.85 ? B.glassA : B.glass)); P2(k, y, 0);
        }
        for (let y = y0; y <= y0 + 10; y++) { P(-4, y, B.brass); P(4, y, B.brass); }
        for (let t = 0; t <= 4; t++) { P(-4 + t, y0 + 10 + t, B.brass); P(4 - t, y0 + 10 + t, B.brass); }
        P(0, y0 + 15, B.brassLt);
        for (let k = -5; k <= 5; k++) { P(k, y0 - 1, B.brassDk); P2(k, y0 - 1, B.brassDk); }
      };
      for (const u of [46, 62, 78]) lancet('z', Z0, u, G + 40);
      lancet('x', X0, 78, G + 7);
      lancet('x', X0, 78, G + 28);
      // 낮은 벽 위 놋쇠 난간 동자
      for (let x = X0 + 6; x < X1 - 2; x += 4) if (x < 56 || x > 69) S(x, LOW + 1, Z1 - 1, B.brass);
      for (let z = Z0 + 6; z < Z1 - 2; z += 4) if (z < 60 || z > 65) S(X1 - 1, LOW + 1, z, B.brass);

      // ── 정문(남쪽 벽 가운데, 안쪽에서 본 모습): 판자 문짝(테두리 살·움푹한 판), 놋쇠 문설주·인방, 주황 룬 ──
      const DX0 = 60, DX1 = 65, DY1 = G + 10;
      for (let x = DX0 - 2; x <= DX1 + 2; x++) for (let y = G + 1; y <= DY1 + 4; y++) {
        const jamb = x <= DX0 - 1 || x >= DX1 + 1, lint = y > DY1;
        let b;
        if (jamb || lint) b = (lint && y === DY1 + 4) || (jamb && (x === DX0 - 2 || x === DX1 + 2)) ? B.brassDk : B.brass;
        else { const st = x === DX0 || x === DX1 || x === 62 || x === 63 || y === G + 1 || y === G + 5 || y === DY1; b = st ? B.doorDk : B.door; }
        S(x, y, Z1 - 1, b);
        if (!jamb && !lint && !(x === DX0 || x === DX1 || x === 62 || x === 63 || y === G + 1 || y === G + 5 || y === DY1)) S(x, y, Z1 - 1, B.door);
      }
      for (let x = DX0; x <= DX1; x++) for (let y = G + 2; y <= DY1 - 1; y++) { const st = x === DX0 || x === DX1 || x === 62 || x === 63 || y === G + 5; if (st) S(x, y, Z1 - 2, B.doorDk); }
      S(61, G + 6, Z1 - 3, B.brass); S(64, G + 6, Z1 - 3, B.brass); S(61, G + 6, Z1 - 2, B.brass); S(64, G + 6, Z1 - 2, B.brass);
      w.box(62, DY1 + 5, Z1 - 1, 63, DY1 + 6, Z1 - 1, B.runeO);
      for (const lx of [DX0 - 4, DX1 + 4]) { S(lx, G + 8, Z1 - 2, B.ironDk); S(lx, G + 9, Z1 - 2, B.lampG); S(lx, G + 10, Z1 - 2, B.lampG); S(lx, G + 11, Z1 - 2, B.ironDk); }
      acts.push(OR.goAct({ at: [62, G + 1, Z1 - 4], h: 9, hit: [DX0, G + 1, Z1 - 4, DX1, G + 10, Z1 - 1], name: '밖으로 나가기', goto: 'cogspire', hint: '탑 정문을 밀고 나가 태엽 공방가의 시계탑 앞 계단으로 돌아가요' }));
      lights.push({ name: 'door', p: [63, G + 10, Z1 - 3], c: '#ffd890', i: 0.7, d: 24, flicker: 0.08, srcR: 8 });

      // ── 북쪽 벽의 맞물린 톱니 셋(부품). 벽에 박은 축받이 판 ──
      const gears = [[70, G + 16, 10, 0.35, B.brass], [82, G + 30, 4.8, -0.73, B.copper], [84, G + 8, 3.8, -0.9, B.verd]];
      gears.forEach(([gx, gy, r, sp, b], k) => {
        const g = w.prop({ name: 'cg' + k, pivot: [gx + 0.5, gy + 0.5, Z0 + 4], axis: 'z', speed: sp });
        gear(g, gx, gy, Z0 + 2, r, 'xy', b, B.ironDk, 3, B.brassLt);
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (Math.abs(dx) + Math.abs(dy) < 4) S(gx + dx, gy + dy, Z0 + 1, (Math.abs(dx) === 2 || Math.abs(dy) === 2) ? B.iron : B.ironDk);
      });
      for (let x = X0 + 22; x <= 77; x++) { S(x, G + 1, Z0 + 2, x % 8 < 2 ? B.brassDk : B.copper); S(x, G + 2, Z0 + 2, x % 8 < 2 ? B.brassDk : B.copper); }   // 바닥 쪽 구리관과 이음테

      // ── 톱니 맞물림 손잡이: 쇠 받침 위 레버(부품) ──
      w.box(57, G + 1, 47, 60, G + 2, 50, B.found); w.box(58, G + 3, 48, 59, G + 5, 49, B.ironDk); w.box(58, G + 6, 48, 59, G + 6, 49, B.brass);
      for (const z of [47, 50]) S(57, G + 3, z, B.brassDk);
      const lever = w.prop({ name: 'lever', pivot: [59, G + 7, 49], axis: 'x', rot0: [0.5, 0, 0] });
      lever.box(58, G + 7, 48, 59, G + 8, 49, B.iron); lever.box(58, G + 9, 48, 58, G + 13, 48, B.iron); lever.box(59, G + 9, 49, 59, G + 13, 49, B.iron);
      lever.box(58, G + 14, 48, 59, G + 15, 49, B.runeO);
      acts.push({
        name: '톱니 맞물리기', hint: '손잡이를 당기면 북쪽 벽 톱니들이 철컥 맞물려 빠르게 돌아요', hit: [56, G + 1, 38, 88, G + 36, 51],
        run: async a => {
          await a.turn('lever', [-0.5, 0, 0], 0.5);
          a.burst([70.5, G + 16, Z0 + 6], { n: 26, colors: ['#ffe0a0', '#ffb040', '#ffffff'], speed: 10, up: 2, life: 0.8, gravity: 4, spread: 4 });
          a.spin('cg0', 6, 4); a.spin('cg1', 6, 4); a.spin('cg2', 6, 4); a.spin('spring', 4, 4);
          for (let k = 0; k < 6; k++) { a.burst([[80.5, G + 24, Z0 + 6], [82.5, G + 12, Z0 + 6]][k % 2], { n: 10, colors: ['#ffd060', '#ffffff'], speed: 8, up: 2, life: 0.6, gravity: 6, spread: 2 }); await a.wait(0.6); }
          await a.turn('lever', [0.5, 0, 0], 0.6);
        },
      });

      // ── 진자: 북쪽 벽에서 뻗은 쇠 들보(받침 가새)에 매달려 흔들린다(부품) ──
      const PX = 62, PZ = 60, PTOP = G + 52;
      w.box(PX, PTOP + 2, Z0 + 2, PX + 1, PTOP + 3, PZ + 2, B.iron); w.box(PX, PTOP + 4, Z0 + 2, PX + 1, PTOP + 4, PZ + 2, B.brassDk);
      for (let z = Z0 + 4; z <= PZ; z += 4) S(PX, PTOP + 1, z, B.ironDk), S(PX + 1, PTOP + 1, z, B.ironDk);
      w.line(PX, G + 36, Z0 + 2, PX, PTOP + 1, PZ - 8, B.iron, 0.6); w.line(PX + 1, G + 36, Z0 + 2, PX + 1, PTOP + 1, PZ - 8, B.iron, 0.6);
      w.box(PX, PTOP, PZ, PX + 1, PTOP + 1, PZ + 1, B.brass);
      const pend = w.prop({ name: 'pend', pivot: [PX + 1, PTOP + 1, PZ + 1], axis: 'z', rock: 0.32, rockSpeed: 1.7 });
      pend.box(PX, G + 16, PZ, PX + 1, PTOP - 1, PZ + 1, B.brassDk);
      for (let y = G + 20; y < PTOP - 2; y += 8) pend.box(PX, y, PZ, PX + 1, y, PZ + 1, B.brass);
      for (let v = -5; v <= 5; v++) for (let u = -5; u <= 5; u++) {
        const d = Math.hypot(u - 0.5, v);
        if (d > 4.8) continue;
        const b = d < 1.6 ? B.runeO : d > 3.9 ? B.brassDk : (Math.abs(u - 0.5) < 0.6 || Math.abs(v) < 0.6) ? B.brassLt : B.brass;
        pend.set(PX + u, G + 12 + v, PZ, b); pend.set(PX + u, G + 12 + v, PZ + 1, b);
      }
      // 진자 아래 눈금 호
      for (let u = -12; u <= 12; u += 4) { const dz = Math.abs(u) > 6 ? 2 : 0; S(PX + u, G, PZ + dz, B.brass); S(PX + u + 1, G, PZ + dz, B.brass); }
      acts.push({
        name: '진자 멈추기', hint: '흔들리던 진자가 천천히 멈췄다가 다시 크게 흔들려요', hit: [PX - 6, G + 6, PZ - 2, PX + 7, G + 20, PZ + 3],
        run: async a => {
          await a.spin('pend', 0, 2.4);
          a.burst([PX + 1, G + 12, PZ + 1], { n: 16, colors: ['#ffb040', '#ffe0a0'], speed: 2, up: 2, life: 1.2, gravity: -0.6, spread: 2 });
          await a.wait(0.8);
          await a.spin('pend', 2.4, 3.2);
        },
      });
      landmarks.push({ name: '대진자', note: '시계탑의 시간을 재는 진자', p: [PX + 1, PTOP + 12, PZ + 1] });

      // ── 태엽통: 놋쇠 상자(모서리 기둥·리벳 띠) 위 수평 태엽(부품), 남쪽 면의 감기 손잡이(부품) ──
      const SX = 78, SZ = 64;
      w.box(SX - 6, G + 1, SZ - 4, SX + 7, G + 8, SZ + 5, B.brassDk); w.box(SX - 6, G + 1, SZ - 4, SX + 7, G + 2, SZ + 5, B.ironDk);
      w.box(SX - 6, G + 8, SZ - 4, SX + 7, G + 8, SZ + 5, B.brass);
      for (const [x, z] of [[SX - 6, SZ - 4], [SX + 6, SZ - 4], [SX - 6, SZ + 4], [SX + 6, SZ + 4]]) w.box(x, G + 1, z, x + 1, G + 10, z + 1, B.brass);
      for (let x = SX - 4; x <= SX + 5; x += 3) { S(x, G + 5, SZ + 5, B.runeO); S(x, G + 6, SZ + 5, B.runeO); }
      for (let x = SX - 5; x <= SX + 6; x += 2) S(x, G + 3, SZ + 6, B.ironDk);
      w.box(SX, G + 9, SZ, SX + 1, G + 12, SZ + 1, B.iron);
      const spring = w.prop({ name: 'spring', pivot: [SX + 1, G + 14, SZ + 1], axis: 'y', speed: 0.5 });
      for (let t = 0; t < 1; t += 0.002) { const a = t * Math.PI * 9, r = 1.4 + t * 6.6; const x = Math.round(SX + 0.5 + Math.cos(a) * r), z = Math.round(SZ + 0.5 + Math.sin(a) * r); const b = t > 0.92 ? B.brass : B.copper; spring.set(x, G + 13, z, b); spring.set(x, G + 14, z, b); }
      spring.box(SX, G + 13, SZ, SX + 1, G + 15, SZ + 1, B.rune);
      w.box(SX, G + 5, SZ + 6, SX + 1, G + 6, SZ + 7, B.iron);
      const crank = w.prop({ name: 'crank', pivot: [SX + 1, G + 6, SZ + 8], axis: 'z' });
      crank.box(SX, G + 5, SZ + 8, SX + 1, G + 12, SZ + 8, B.iron); crank.box(SX, G + 12, SZ + 8, SX + 3, G + 13, SZ + 8, B.brass); crank.box(SX + 3, G + 12, SZ + 9, SX + 3, G + 13, SZ + 9, B.brassDk);
      lights.push({ name: 'spring', p: [SX + 1, G + 16, SZ + 1], c: '#ffb860', i: 0.8, d: 28, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '태엽 감기', hint: '손잡이를 돌려 태엽을 감으면 태엽통이 빛나며 감기고 톱니가 힘차게 돌아요', hit: [SX - 6, G + 1, SZ - 4, SX + 7, G + 15, SZ + 9],
        run: async a => {
          a.flash('spring', 3, 4); a.glow(1.4, 4);
          a.spin('crank', 1, 4); a.spin('spring', 8, 4); a.spin('cg0', 3, 4); a.spin('cg1', 3, 4); a.spin('cg2', 3, 4);
          for (let k = 0; k < 8; k++) { await a.turn('crank', [0, 0, -(k + 1) * 1.57], 0.4); a.burst([SX + 1, G + 15, SZ + 1], { n: 12, colors: ['#ffb040', '#ffe0a0', '#5affff'], speed: 6, up: 4, life: 0.9, gravity: 1.2, spread: 4 }); }
          a.unwind('crank'); await a.turn('crank', [0, 0, 0], 0.3);
        },
      });
      landmarks.push({ name: '태엽통', note: '시계를 움직이는 큰 태엽', p: [SX + 1, G + 24, SZ + 1] });

      // ── 기름칠 수레(바퀴·손잡이)와 기름통(부품) ──
      w.box(84, G + 3, 46, 87, G + 3, 49, B.ironDk); w.box(84, G + 4, 46, 87, G + 4, 49, B.plank);
      for (const [x, z] of [[84, 46], [87, 46], [84, 49], [87, 49]]) w.box(x, G + 1, z, x, G + 2, z, B.iron);
      w.box(88, G + 4, 47, 88, G + 6, 48, B.iron); S(88, G + 7, 47, B.brassDk); S(88, G + 7, 48, B.brassDk);
      S(87, G + 5, 49, B.coal); S(86, G + 5, 49, B.coal); S(86, G + 5, 48, B.paper); S(87, G + 5, 48, B.paper);
      const can = w.prop({ name: 'oilcan', pivot: [85, G + 6, 47], axis: 'x' });
      can.box(84, G + 5, 46, 85, G + 8, 47, B.copper); can.box(84, G + 6, 46, 85, G + 6, 47, B.brassDk); can.set(84, G + 9, 46, B.brassDk); can.set(84, G + 10, 45, B.brass); can.set(84, G + 10, 44, B.brass);
      acts.push({
        name: '기름칠', hint: '기름통이 기울어 톱니에 기름을 똑똑 떨어뜨리면 톱니가 매끄럽게 빨라져요', hit: [82, G + 1, 42, 88, G + 12, 50],
        run: async a => {
          await a.move('oilcan', [0, 4, -2], 0.6); await a.turn('oilcan', [-1.1, 0, 0], 0.5);
          a.spin('cg2', 5, 3.2); a.spin('cg0', 2, 3.2);
          for (let k = 0; k < 7; k++) { a.burst([84.5, G + 12, Z0 + 7], { n: 6, colors: ['#c8902a', '#5a3a10', '#ffe0a0'], speed: 0.6, up: -2, life: 1, gravity: 8, spread: 0.6 }); await a.wait(0.4); }
          await a.turn('oilcan', [0, 0, 0], 0.5); await a.move('oilcan', [0, 0, 0], 0.6);
        },
      });

      // ── 서쪽 회랑(계단으로 오른다): 널마루·장선, 쇠기둥, 난간 동자와 손잡이 난간 ──
      for (let z = Z0 + 2; z <= 69; z++) for (let x = X0 + 2; x <= 49; x++) {
        const edge = x >= 48 || z >= 68;
        S(x, GY, z, edge ? B.brassDk : ((z % 6 === 0) ? B.floorDk : B.floor));
        S(x, GY - 1, z, edge ? B.brassDk : (x % 4 === 0 ? B.floorDk : 0));
      }
      for (const z of [52, 66]) w.box(48, G + 1, z, 49, GY - 2, z + 1, B.iron);
      for (const z of [52, 66]) { S(47, GY - 2, z, B.ironDk); S(46, GY - 3, z, B.ironDk); }
      const railPost = (x, z) => w.box(x, GY + 1, z, x, GY + 3, z, B.iron);
      for (let z = 46; z <= 69; z++) { S(49, GY + 4, z, B.brass); if (z % 3 === 1) railPost(49, z); }
      for (let x = 42; x <= 49; x++) { S(x, GY + 4, 69, B.brass); if (x % 3 === 0) railPost(x, 69); }
      railPost(42, 69); railPost(49, 69); railPost(49, 46);
      // 계단: 한 단 2칸 높이·2칸 깊이, 폭 4칸, 벽돌 옆판과 놋쇠 디딤 코
      for (let k = 0; k < 10; k++) {
        const zA = 88 - 2 * k, top = G + 2 + 2 * k;
        for (let z = zA; z <= zA + 1; z++) for (let y = G + 1; y <= top; y++) for (let x = X0 + 2; x <= X0 + 5; x++) S(x, y, z, y === top ? (z === zA ? B.brassDk : B.floorDk) : B.brick);
      }
      w.box(42, G + 1, Z1 - 3, 42, G + 6, Z1 - 3, B.brass); S(42, G + 7, Z1 - 3, B.lampG); S(42, G + 8, Z1 - 3, B.brassDk);
      // 회랑 아래: 작업대, 시계 부품 선반, 걸린 공구
      w.box(38, G + 1, 54, 41, G + 4, 65, B.plank); w.box(38, G + 1, 54, 41, G + 2, 65, B.ironDk); w.box(39, G + 1, 55, 40, G + 3, 64, 0);
      for (let z = 54; z <= 65; z++) { if (hash3(19, 3, z) > 0.45) S(40 + (z & 1), G + 5, z, [B.brass, B.copper, B.verd, B.paper][z % 4]); }
      for (let z = 40; z <= 51; z++) for (const y of [G + 3, G + 9, G + 15]) { S(38, y, z, B.plank); S(39, y, z, B.plank); if (hash3(z, y, 4) > 0.4) { S(38, y + 1, z, [B.brass, B.copper, B.verd, B.paper][(z + y) % 4]); if (hash3(z, y, 7) > 0.6) S(38, y + 2, z, B.brassDk); } }
      for (const z of [40, 51]) w.box(38, G + 1, z, 39, G + 16, z, B.plankDk || B.plank);
      for (let z = 56; z <= 64; z += 4) { S(38, G + 9, z, B.ironDk); S(38, G + 8, z, B.iron); S(38, G + 7, z, B.iron); }
      w.box(44, G + 17, 52, 44, G + 18, 52, B.iron); S(44, G + 16, 52, B.lampG); lights.push({ name: 'bench', p: [43, G + 14, 55], c: '#ffd890', i: 0.6, d: 20, flicker: 0.1, srcR: 6 });

      // ── 시계판 뒷면(서쪽 벽, 빛이 비쳐 드는 유백 판)과 바늘(부품) ──
      const FY = G + 38, FZ = 54;
      for (let v = -13; v <= 13; v++) for (let u = -13; u <= 13; u++) {
        const d = Math.hypot(u, v); if (d > 12.8) continue;
        const a = Math.atan2(v, u), hr = Math.abs(Math.sin(a * 6)) < 0.13;
        const tick = (d > 8.6 && d <= 10.6 && hr) || (d > 9.8 && d <= 10.6 && Math.abs(Math.sin(a * 30)) < 0.2);
        const num = d > 8.4 && d <= 10.6 && (Math.abs(u) < 0.6 || Math.abs(v) < 0.6);
        S(X0 + 1, FY + v, FZ + u, d > 11.2 ? B.brass : (num ? B.brassDk : tick ? B.hand : (d < 1.6 ? B.brassDk : B.face)));
        S(X0, FY + v, FZ + u, d > 11.2 ? B.brassDk : B.face);
        if (d > 11.6) S(X0 + 2, FY + v, FZ + u, B.brassDk);
      }
      w.box(X0 + 2, FY - 1, FZ - 1, X0 + 3, FY + 1, FZ + 1, B.ironDk);
      const hands = w.prop({ name: 'hands', pivot: [X0 + 5, FY + 0.5, FZ + 0.5], axis: 'x', speed: -0.25 });
      hands.box(X0 + 4, FY, FZ, X0 + 4, FY + 9, FZ, B.hand); hands.box(X0 + 4, FY + 1, FZ, X0 + 4, FY + 7, FZ, B.hand); hands.set(X0 + 4, FY + 8, FZ - 1, B.hand); hands.set(X0 + 4, FY + 8, FZ + 1, B.hand);
      hands.box(X0 + 5, FY, FZ, X0 + 5, FY, FZ + 6, B.brassDk); hands.box(X0 + 5, FY + 1, FZ + 4, X0 + 5, FY - 1, FZ + 4, B.brassDk);
      hands.box(X0 + 4, FY, FZ, X0 + 5, FY, FZ, B.brass);
      lights.push({ name: 'face', p: [X0 + 5, FY, FZ + 1], c: '#ffe8b0', i: 1.2, d: 40, flicker: 0.03, srcR: 8 });
      acts.push({
        name: '시계판 뒤 엿보기', hint: '시계판 뒷면에 바짝 다가가면 바늘이 휙휙 돌고 바깥 햇살이 판을 뚫고 쏟아져요', hit: [X0 + 2, GY + 1, FZ - 12, X0 + 8, FY + 12, FZ + 12],
        run: async a => {
          a.flash('face', 3, 4); a.glow(1.5, 4); a.spin('hands', 40, 4);
          for (let k = 0; k < 8; k++) { a.burst([X0 + 4, FY + (k % 3) * 4 - 4, FZ + 0.5 + (k % 2 ? 6 : -6)], { n: 14, colors: ['#fff0c8', '#ffffff', '#ffd890'], speed: 6, up: 0, life: 1.4, gravity: 0.4, spread: 3 }); await a.wait(0.45); }
        },
      });

      // ── 종: 회랑 위 북서쪽 구석, 벽에서 뻗은 쇠 들보에 매달림(부품). 입술이 벌어진 종, 테 두 줄, 추 ──
      const BX = 44, BZ = 44, BY = G + 48;
      w.box(X0 + 2, BY + 8, BZ, BX + 1, BY + 9, BZ + 1, B.iron); w.box(BX, BY + 8, Z0 + 2, BX + 1, BY + 9, BZ + 1, B.iron);
      w.box(BX, BY + 10, BZ, BX + 1, BY + 10, BZ + 1, B.brassDk);
      w.line(X0 + 2, BY + 2, BZ, X0 + 6, BY + 7, BZ, B.ironDk); w.line(BX, BY + 2, Z0 + 2, BX, BY + 7, Z0 + 6, B.ironDk);
      const bell = w.prop({ name: 'bell', pivot: [BX + 1, BY + 7, BZ + 1], axis: 'x' });
      bell.box(BX, BY + 5, BZ, BX + 1, BY + 7, BZ + 1, B.iron);
      for (let dy = -5; dy <= 4; dy++) {
        const t = (4 - dy) / 9, r = 2.2 + Math.pow(t, 1.6) * 2.8 + (dy === -5 ? 0.6 : 0);
        for (let dz = -6; dz <= 7; dz++) for (let dx = -6; dx <= 7; dx++) {
          const d = Math.hypot(dx - 0.5, dz - 0.5);
          if (d > r || (d < r - 1.6 && dy < 3)) continue;
          bell.set(BX + dx, BY + dy, BZ + dz, (dy === -2 || dy === 2 || dy === -5) ? B.bellDk : B.bell);
        }
      }
      bell.box(BX, BY - 6, BZ, BX + 1, BY - 5, BZ + 1, B.ironDk); bell.box(BX, BY - 4, BZ, BX + 1, BY + 2, BZ + 1, B.iron);
      acts.push({
        name: '종 치기', hint: '회랑 위 큰 종이 흔들리며 정각을 알리는 소리가 탑 안에 울려 퍼져요', hit: [BX - 6, GY + 1, BZ - 6, BX + 7, BY + 6, BZ + 7],
        run: async a => {
          for (let k = 0; k < 4; k++) { await a.turn('bell', [0.5, 0, 0], 0.4); a.burst([BX + 1, BY - 2, BZ + 1], { n: 18, colors: ['#ffe0a0', '#ffb040', '#ffffff'], speed: 16, up: 1, life: 1.4, gravity: 1, spread: 6, flat: true }); await a.turn('bell', [-0.5, 0, 0], 0.4); }
          await a.turn('bell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '시계탑 종', note: '정각마다 울리는 큰 종', p: [BX + 1, BY + 18, BZ + 1] });

      // ── 태엽 승강기: 북쪽 벽 아래 구덩이에서 회랑 높이까지(부품, 탈 수 있음 — 발판 6×6칸) ──
      const LX0 = 50, LX1 = 55, LZ0 = 38, LZ1 = 43;
      w.box(LX0, G - 1, LZ0, LX1, G, LZ1, 0); w.box(LX0, G - 2, LZ0, LX1, G - 2, LZ1, B.ironDk);
      for (const z of [LZ0, LZ1 + 1]) { w.box(56, G + 1, z, 57, GY + 10, z, B.brass); for (let y = G + 4; y < GY + 10; y += 6) S(56, y, z, B.brassDk); }
      w.box(48, GY + 11, LZ0, 57, GY + 12, LZ0, B.brassDk); w.box(56, GY + 11, LZ0, 57, GY + 12, LZ1 + 1, B.brassDk); w.box(52, GY + 10, LZ0, 53, GY + 10, LZ0, B.runeO);
      const lift = w.prop({ name: 'lift' });
      lift.box(LX0, G, LZ0, LX1, G, LZ1, B.plank); lift.box(LX0, G - 1, LZ0, LX1, G - 1, LZ1, B.ironDk);
      for (const [x, z] of [[LX0, LZ0], [LX1, LZ0], [LX0, LZ1], [LX1, LZ1]]) lift.set(x, G, z, B.brass);
      lift.box(LX1, G + 1, LZ1, LX1, G + 4, LZ1, B.brass); lift.set(LX1, G + 5, LZ1, B.runeO);
      acts.push({
        name: '태엽 승강기', hint: '발판이 태엽 힘으로 회랑 높이까지 올라갔다가 잠시 뒤 내려와요. 타고 올라가 회랑으로 내릴 수 있어요', hit: [LX0, G, LZ0, LX1, G + 6, LZ1],
        run: async a => {
          a.burst([LX0 + 3, G + 1, LZ0 + 3], { n: 16, colors: ['#e8e0d8', '#b8b0a8'], speed: 4, up: 2, life: 1, gravity: -0.8, spread: 3 });
          await a.move('lift', [0, GY - G, 0], 3.2); await a.wait(4); await a.move('lift', [0, 0, 0], 3.2);
        },
      });

      // ── 살림: 동쪽 작업대, 상자·자루·석탄통, 벽 등 ──
      const crate = (x, y, z, s) => { for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) { const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1); S(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate); } };
      const sack = (x, y, z) => { for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) { const c = dx !== 1 && dz !== 1; if (!c) S(x + dx, y, z + dz, B.sack); S(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sack : B.sack2); if (!c) S(x + dx, y + 2, z + dz, B.sack); } S(x + 1, y + 3, z + 1, B.rope); };
      const bin = (x, y, z) => { for (let r = 0; r < 5; r++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d2 = dx * dx + dz * dz; if (d2 > 4.8) continue; const out = d2 > 1.5; S(x + dx, y + r, z + dz, r === 4 ? (out ? B.brassDk : B.coal) : ((r === 1 || r === 3) && out ? B.iron : B.copper)); } };
      w.box(86, G + 1, 74, 89, G + 4, 85, B.plank); w.box(86, G + 1, 75, 88, G + 3, 84, 0); w.box(86, G + 1, 74, 89, G + 1, 74, B.ironDk); w.box(86, G + 1, 85, 89, G + 1, 85, B.ironDk);
      for (let z = 74; z <= 85; z++) if (hash3(43, 5, z) > 0.45) S(86 + (z & 1), G + 5, z, [B.brass, B.copper, B.paper, B.verd][z % 4]);
      S(88, G + 5, 78, B.ironDk); S(88, G + 6, 78, B.lampG); S(88, G + 7, 78, B.brassDk); lights.push({ name: 'desk', p: [87, G + 8, 79], c: '#ffd890', i: 0.6, d: 20, flicker: 0.1, srcR: 6 });
      crate(82, G + 1, 86, 4); crate(83, G + 5, 87, 3); sack(74, G + 1, 86); sack(50, G + 1, 86); bin(48, G + 1, 74); crate(84, G + 1, 54, 4);
      sack(84, G + 1, 59);
      S(X0 + 2, G + 18, 82, B.lampG); S(X0 + 2, G + 17, 82, B.lampG); S(X0 + 2, G + 16, 82, B.brassDk); S(X0 + 2, G + 19, 82, B.brassDk);
      lights.push({ name: 'wallW', p: [X0 + 3, G + 18, 83], c: '#ffd890', i: 0.6, d: 24, flicker: 0.12, srcR: 6 });
      lights.push({ name: 'sun', p: [62, G + 48, Z0 + 4], c: '#fff0d8', i: 0.8, d: 60, flicker: 0, srcR: 10 });
      landmarks.push({ name: '맞물린 톱니', note: '북쪽 벽의 놋쇠·구리 톱니', p: [73, G + 40, Z0 + 4] });
      return { lights, landmarks, acts };
    },
  });
})();
