// 골렘 공방 안(하위 지도) — 태엽 공방가 아랫단 2층 벽돌 공방의 속. 쇠 들틀에 매달린 골렘 몸통(조립장), 룬 심장 받침, 룬 원 위 시험 골렘(시험대),
// 칸막이 너머 부품 창고와 돌림 크레인, 북쪽 벽 계단으로 오르는 설계실 중이층. 남·동쪽 벽은 잘라 낮췄다 (76×60칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 76, D = 60, Hh = 56, G = 12;
  MAPS.push({
    id: 'cogspire-golemworks', cat: 'magic', sub: true, parent: 'cogspire', name: '골렘 공방 안', en: 'Cogspire · Golem Works', color: '#c87a4a', seed: 3412, base: G, time: 'day', size: [W, D, Hh],
    desc: '룬 기술자 길드의 골렘 공방. 쇠 들틀에 골렘 몸통이 매달려 다리와 맞춰지기를 기다리고, 룬 원 위에서는 다 만든 작은 골렘이 시동을 기다린다. 칸막이 너머 창고에는 팔·머리·톱니가 쌓여 있고, 계단 위 중이층에서는 설계도를 그린다.',
    info: { title: '장소 정보', en: 'GOLEM WORKS', rows: [['쓰임', '작업용 골렘을 짓는 공방'], ['조립장', '쇠 들틀 · 매달린 몸통 · 룬 심장'], ['시험대', '룬 원 위의 작은 골렘'], ['창고', '부품 선반 · 돌림 크레인']] },
    sky: ['#4a3a30', '#1e1612', '#c8925a'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.52], sun: ['#ffd8b0', 0.62, [0.5, 1, 0.45]],
    night: { sky: ['#20182a', '#0a0810', '#8a5a3a'], stars: false, hemi: ['#c8b0a0', '#140e0a', 0.36], sun: ['#ffd0a0', 0.22, [0.5, 1, 0.45]], haze: '#2a2018' },
    fog: { start: 0.94, floor: G - 6, depth: 6, haze: [6, 0.18, 6], hazeColor: '#a08060' },
    camY: 0, zoom: 1.1,
    particles: [
      { n: 70, colors: ['#ffe8c0', '#fff4dc', '#ffd890'], mode: 'drift', speed: 0.12, wind: 0.05, area: [38, 30, 16], y0: G + 1, y1: G + 18, glow: true },
      { n: 22, colors: ['#ff8a30', '#ffd060'], mode: 'rise', speed: 0.4, area: [21, 21.5, 1.2], y0: G + 3, y1: G + 7, glow: true },
    ],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' },
      found: { c: '#6a6264', v: 0.05, pat: 'stone' }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' },
      floor: { c: '#6a4a30', top: '#8a6440', v: 0.05, pat: 'plank' }, floorDk: { c: '#5a3e28', top: '#74522f', v: 0.05, pat: 'plank' }, steel: { c: '#5a5a62', top: '#74747e', v: 0.04, pat: 'check', alt: '#686872' },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, copper: { c: '#b0683a', v: 0.07 }, verd: { c: '#5a9a88', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      golem: { c: '#7a7068', v: 0.06, pat: 'big' }, golemDk: { c: '#5a524c', v: 0.05 }, eye: { c: '#5affff', glow: true }, eyeOff: { c: '#1e3a40', v: 0.02 }, core: { c: '#3ac8d0', glow: true },
      rune: { c: '#5affff', glow: true }, runeO: { c: '#ffb040', glow: true }, hot: { c: '#ff6a20', glow: true }, lampG: { c: '#ffd890', glow: true }, glass: { c: '#d8ecf4', glow: true },
      door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, paint: { c: '#2a5a4a', v: 0.04 }, crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, sack: { c: '#c8b48a', v: 0.06 },
      coal: { c: '#222226', v: 0.08 }, paper: { c: '#e8dcc0', v: 0.03 }, blue: { c: '#2a4a8a', v: 0.03 }, blueL: { c: '#8ac8ff', glow: true }, bookR: { c: '#8a3a3a', v: 0.04 }, bookG: { c: '#3a6a4a', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => ((x >> 3) + (z >> 3)) % 2 ? B.cob : B.plate, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 18, X1 = 57, Z0 = 18, Z1 = 41, TOP = G + 16, LOW = G + 3, MZ = G + 7;

      // ── 바닥: 널마루, 조립장·시험대는 쇠판 ──
      for (let z = Z0 - 2; z <= Z1 + 2; z++) for (let x = X0 - 2; x <= X1 + 2; x++) S(x, G, z, B.found);
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x < X1; x++) {
        const steelA = x >= 33 && x <= 46 && z >= 21 && z <= 31;
        S(x, G, z, steelA ? B.steel : ((x + (z >> 2)) % 6 === 0 ? B.floorDk : B.floor));
      }

      // ── 벽: 북·서는 2층 높이, 남·동은 낮게. 놋쇠 기둥(목골 대신), 창 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const back = x === X0 || z === Z0, top = back ? TOP : LOW, u = x === X0 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = y === G + 1 ? B.found : B.brick;
          if (back && (u % 6 === 0 || y === MZ || y === TOP)) b = B.brass;
          if (!back && y === top) b = B.brassDk;
          S(x, y, z, b);
        }
      }
      for (const [x, z, h] of [[X0, Z0, TOP + 1], [X1, Z0, TOP + 1], [X0, Z1, TOP + 1], [X1, Z1, LOW + 2]]) w.box(x, G + 1, z, x, h, z, B.brassDk);
      const win = (axis, c, u, y0) => { for (let y = y0; y <= y0 + 2; y++) for (const k of [0, 1]) axis === 'z' ? S(u + k, y, c, B.glass) : S(c, y, u + k, B.glass); for (const k of [-1, 2]) for (let y = y0; y <= y0 + 2; y++) axis === 'z' ? S(u + k, y, c, B.paint) : S(c, y, u + k, B.paint); for (const k of [0, 1]) axis === 'z' ? (S(u + k, y0 - 1, c, B.brassDk), S(u + k, y0 + 3, c, B.brick)) : (S(c, y0 - 1, u + k, B.brassDk), S(c, y0 + 3, u + k, B.brick)); };
      for (const u of [26, 44, 50]) win('z', Z0, u, G + 10);
      win('z', Z0, 44, G + 3);
      for (const u of [22, 36]) { win('x', X0, u, G + 10); }
      win('x', X0, 36, G + 3);
      for (let x = X0 + 4; x < X1; x += 5) S(x, LOW + 1, Z1, B.brass);
      for (let z = Z0 + 4; z < Z1; z += 5) S(X1, LOW + 1, z, B.brass);

      // ── 정문(서쪽 벽, 안쪽): 판자 문짝, 놋쇠 문틀, 벽 등 ──
      const DZ0 = 29, DZ1 = 30;
      for (let z = DZ0 - 1; z <= DZ1 + 1; z++) for (let y = G + 1; y <= G + 5; y++) S(X0, y, z, (z === DZ0 - 1 || z === DZ1 + 1 || y === G + 5) ? B.brass : B.door);
      S(X0, G + 6, 29, B.runeO); S(X0, G + 4, DZ0 - 2, B.lampG); S(X0, G + 4, DZ1 + 2, B.lampG);
      acts.push(OR.goAct({ at: [X0 + 1, G + 1, 29], h: 5, hit: [X0, G + 1, DZ0, X0 + 1, G + 4, DZ1], name: '밖으로 나가기', goto: 'cogspire', hint: '공방 문을 열고 나가 아랫단 골렘 시험대 옆 거리로 돌아가요' }));
      lights.push({ name: 'door', p: [X0 + 1.5, G + 5, 29.5], c: '#ffd890', i: 0.7, d: 12, flicker: 0.08, srcR: 4 });

      // ── 중이층(설계실): 북서쪽, 북쪽 벽을 따라 오르는 계단 ──
      for (let z = Z0 + 1; z <= 24; z++) for (let x = X0 + 1; x <= 30; x++) S(x, MZ, z, x === 30 || z === 24 ? B.brassDk : B.floorDk);
      for (const [x, z] of [[30, 24], [24, 24]]) w.box(x, G + 1, z, x, MZ - 1, z, B.iron);
      for (let x = X0 + 1; x <= 30; x++) S(x, MZ + 1, 24, x % 2 ? B.brass : B.iron);
      for (let z = 21; z <= 24; z++) S(30, MZ + 1, z, z % 2 ? B.brass : B.iron);
      for (let k = 0; k <= 6; k++) { const x = 37 - k; for (let y = G + 1; y <= G + 1 + k; y++) for (const z of [Z0 + 1, Z0 + 2]) S(x, y, z, y === G + 1 + k ? B.floorDk : B.brick); }
      w.box(38, G + 1, Z0 + 3, 38, G + 3, Z0 + 3, B.brass); S(38, G + 4, Z0 + 3, B.lampG);
      // 설계실 살림: 책장, 의자, 설계 탁자(설계도는 부품)
      for (let z = Z0 + 1; z <= 23; z++) for (const y of [MZ + 1, MZ + 3, MZ + 5]) { S(X0 + 1, y, z, B.plank); if (y < MZ + 5) S(X0 + 1, y + 1, z, [B.bookR, B.bookG, B.paper, B.blue][(z + y) % 4]); }
      w.box(23, MZ + 1, 20, 27, MZ + 2, 21, B.plank); w.box(23, MZ + 1, 20, 27, MZ + 1, 21, 0); for (const [x, z] of [[23, 20], [27, 20], [23, 21], [27, 21]]) S(x, MZ + 1, z, B.ironDk);
      S(25, MZ + 1, 23, B.brassDk); S(28, MZ + 1, 20, B.paper); S(28, MZ + 2, 20, B.lampG);
      lights.push({ name: 'office', p: [28.5, MZ + 3, 20.5], c: '#ffd890', i: 0.6, d: 12, flicker: 0.1, srcR: 3 });
      const plan = w.prop({ name: 'plan', pivot: [25.5, MZ + 3, 21.5], axis: 'x' });
      plan.box(24, MZ + 3, 20, 27, MZ + 3, 21, B.blue); plan.set(25, MZ + 3, 20, B.blueL); plan.set(26, MZ + 3, 21, B.blueL); plan.set(24, MZ + 3, 21, B.paper);
      acts.push({
        name: '설계도 펼치기', hint: '중이층 탁자의 설계도가 일어서며 골렘 설계선이 푸르게 빛나요', hit: [22, MZ + 1, 19, 29, MZ + 5, 23],
        run: async a => {
          await a.move('plan', [0, 2, 1], 0.8); await a.turn('plan', [-1.3, 0, 0], 0.6);
          a.flash('office', 3, 3); a.glow(1.4, 3);
          for (let k = 0; k < 6; k++) { a.burst([25.5 + (k % 3) - 1, MZ + 6, 22], { n: 12, colors: ['#8ac8ff', '#ffffff', '#5affff'], speed: 2, up: 1, life: 1.2, gravity: -0.3, spread: 1.2 }); await a.wait(0.45); }
          await a.turn('plan', [0, 0, 0], 0.6); await a.move('plan', [0, 0, 0], 0.7);
        },
      });
      // 중이층 아래: 작은 화덕과 석탄, 공구 사물함
      w.box(X0 + 1, G + 1, 20, X0 + 3, G + 2, 23, B.brickDk); w.box(X0 + 2, G + 2, 21, X0 + 2, G + 2, 22, B.hot); w.box(X0 + 1, G + 3, 20, X0 + 1, MZ - 1, 20, B.brickDk);
      w.box(X0 + 4, G + 1, 23, X0 + 5, G + 1, 23, B.coal); S(X0 + 4, G + 2, 23, B.coal);
      for (let x = 24; x <= 29; x++) { w.box(x, G + 1, Z0 + 1, x, G + 4, Z0 + 1, x % 2 ? B.iron : B.verd); S(x, G + 3, Z0 + 2, x % 2 ? B.brassDk : 0); }
      lights.push({ name: 'forge', p: [X0 + 2.5, G + 4, 21.5], c: '#ff8a30', i: 0.9, d: 12, flicker: 0.3, srcR: 3 });

      // ── 조립장: 쇠 들틀, 다리만 선 골렘, 매달린 몸통(부품)과 두 팔(부품) ──
      const GX = 40, GZ = 26, GT = G + 24;
      for (const [x, z] of [[34, 22], [45, 22], [34, 30], [45, 30]]) { w.box(x, G + 1, z, x, GT, z, B.iron); S(x, G + 1, z, B.ironDk); S(x, G + 8, z, B.brass); }
      for (const z of [22, 30]) w.box(34, GT, z, 45, GT, z, B.ironDk);
      w.box(GX, GT, 22, GX, GT, 30, B.brassDk); w.box(GX - 1, GT - 1, GZ - 1, GX + 1, GT - 1, GZ + 1, B.iron); w.box(GX, GT - 2, GZ, GX, GT - 2, GZ, B.ironDk);
      w.box(GX - 3, G + 1, GZ - 2, GX + 3, G + 1, GZ + 2, B.ironDk);
      for (const dx of [-2, 1]) w.box(GX + dx, G + 2, GZ - 1, GX + dx + 1, G + 6, GZ + 1, B.golem);
      for (const dx of [-2, 1]) w.box(GX + dx, G + 2, GZ + 1, GX + dx + 1, G + 2, GZ + 1, B.golemDk);
      const UP = 5;
      const torso = w.prop({ name: 'torso', pivot: [GX + 0.5, G + 10, GZ + 0.5], off0: [0, UP, 0] });
      torso.box(GX - 3, G + 7, GZ - 2, GX + 3, G + 12, GZ + 2, B.golem); torso.box(GX - 3, G + 9, GZ - 2, GX + 3, G + 9, GZ + 2, B.golemDk); torso.box(GX - 3, G + 12, GZ - 2, GX + 3, G + 12, GZ + 2, B.brassDk);
      torso.box(GX - 1, G + 10, GZ + 2, GX + 1, G + 11, GZ + 2, B.core);
      torso.box(GX - 1, G + 13, GZ - 1, GX + 1, G + 14, GZ + 1, B.golem); torso.set(GX - 1, G + 14, GZ + 1, B.eyeOff); torso.set(GX + 1, G + 14, GZ + 1, B.eyeOff); torso.set(GX, G + 15, GZ, B.iron);
      for (let y = G + 16; y <= GT - 2 - UP; y++) torso.set(GX, y, GZ, B.iron);
      const armL = w.prop({ name: 'armL', pivot: [GX - 4.5, G + 11, GZ + 0.5], off0: [-2, 0, 0], rot0: [0, 0, -0.5] });
      armL.box(GX - 5, G + 6, GZ - 1, GX - 4, G + 11, GZ, B.golemDk); armL.box(GX - 5, G + 5, GZ - 1, GX - 4, G + 5, GZ, B.golem);
      const armR = w.prop({ name: 'armR', pivot: [GX + 5.5, G + 11, GZ + 0.5], off0: [2, 0, 0], rot0: [0, 0, 0.5] });
      armR.box(GX + 4, G + 6, GZ - 1, GX + 5, G + 11, GZ, B.golemDk); armR.box(GX + 4, G + 5, GZ - 1, GX + 5, G + 5, GZ, B.golem);
      lights.push({ name: 'core', p: [GX + 0.5, G + 11 + UP, GZ + 3], c: '#50f0ff', i: 0.8, d: 14, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '골렘 조립', hint: '매달린 몸통이 내려와 다리에 맞물리고 두 팔이 어깨에 철컥 끼워져요', hit: [GX - 6, G + 1, GZ - 3, GX + 6, G + 18, GZ + 3],
        run: async a => {
          await a.move('torso', [0, 0, 0], 2.2);
          a.burst([GX + 0.5, G + 7, GZ + 0.5], { n: 24, colors: ['#ffe0a0', '#ffb040', '#ffffff'], speed: 5, up: 1, life: 0.8, gravity: 2.5, spread: 3, flat: true });
          await Promise.all([a.tween('armL', { off: [0, 0, 0], rot: [0, 0, 0] }, 1), a.tween('armR', { off: [0, 0, 0], rot: [0, 0, 0] }, 1)]);
          a.flash('core', 4, 2.2);
          for (const x of [GX - 4, GX + 5]) a.burst([x, G + 11, GZ + 0.5], { n: 12, colors: ['#ffd060', '#ffffff'], speed: 4, up: 1, life: 0.6, gravity: 3, spread: 1 });
          await a.wait(2.4);
          await Promise.all([a.tween('armL', { off: [-2, 0, 0], rot: [0, 0, -0.5] }, 1), a.tween('armR', { off: [2, 0, 0], rot: [0, 0, 0.5] }, 1)]);
          await a.move('torso', [0, UP, 0], 2);
        },
      });
      landmarks.push({ name: '조립장', note: '들틀에 매달린 골렘 몸통', p: [GX + 0.5, GT + 5, GZ + 0.5] });

      // ── 룬 심장 받침(부품: 떠 있는 심장) ──
      const HX = 31, HZ = 27;
      w.box(HX - 1, G + 1, HZ - 1, HX + 1, G + 1, HZ + 1, B.brassDk); w.box(HX, G + 2, HZ, HX, G + 3, HZ, B.iron); S(HX, G + 4, HZ, B.brass);
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) S(HX + dx, G + 2, HZ + dz, B.brass);
      const heart = w.prop({ name: 'heart', pivot: [HX + 0.5, G + 6.5, HZ + 0.5], axis: 'y', speed: 0.8, bob: 0.25, bobSpeed: 1.6 });
      heart.sphere(HX, G + 6, HZ, 1.2, B.rune); heart.set(HX, G + 6, HZ + 1, B.runeO); heart.set(HX, G + 6, HZ - 1, B.runeO);
      lights.push({ name: 'heart', p: [HX + 0.5, G + 6.5, HZ + 0.5], c: '#5affff', i: 0.9, d: 12, flicker: 0.15, srcR: 3 });
      acts.push({
        name: '룬 심장 넣기', hint: '받침의 룬 심장이 떠올라 매달린 몸통 가슴에 쏙 들어갔다가 돌아와요', hit: [HX - 1, G + 1, HZ - 1, HX + 1, G + 8, HZ + 1],
        run: async a => {
          a.flash('heart', 3, 4.5);
          await a.path('heart', [[0, 4, 0], [5, 9, 1], [GX - HX, 4 + UP, 2]], 2.2);
          a.flash('core', 4, 2); a.glow(1.5, 2);
          for (let k = 0; k < 4; k++) { a.burst([GX + 0.5, G + 11 + UP, GZ + 3], { n: 16, colors: ['#5affff', '#a0ffff', '#ffffff'], speed: 4, up: 1, life: 1, gravity: 0, spread: 1.5 }); await a.wait(0.45); }
          await a.path('heart', [[5, 9, 1], [0, 4, 0], [0, 0, 0]], 2);
        },
      });

      // ── 시험대: 룬 원 위의 다 만든 작은 골렘(오른팔은 부품), 수정 기둥 넷 ──
      const TX = 28, TZ = 35;
      MH.circle(w, TX, TZ, 4.5, B.rune); MH.circle(w, TX, TZ, 5.2, B.brassDk);
      for (const [dx, dz] of [[-4, -4], [4, -4], [-4, 4], [4, 4]]) { w.box(TX + dx, G + 1, TZ + dz, TX + dx, G + 3, TZ + dz, B.brass); S(TX + dx, G + 4, TZ + dz, B.rune); }
      for (const dx of [-1, 1]) w.box(TX + dx, G + 1, TZ, TX + dx, G + 3, TZ, B.golemDk);
      w.box(TX - 2, G + 4, TZ - 1, TX + 2, G + 7, TZ + 1, B.golem); w.box(TX - 2, G + 7, TZ - 1, TX + 2, G + 7, TZ + 1, B.brassDk); S(TX, G + 5, TZ + 1, B.rune);
      w.box(TX - 1, G + 8, TZ - 1, TX + 1, G + 9, TZ + 1, B.golem); S(TX - 1, G + 9, TZ + 1, B.eye); S(TX + 1, G + 9, TZ + 1, B.eye);
      w.box(TX - 3, G + 4, TZ, TX - 3, G + 7, TZ, B.golemDk);
      const tarm = w.prop({ name: 'tarm', pivot: [TX + 3.5, G + 7.5, TZ + 0.5], axis: 'x' });
      tarm.box(TX + 3, G + 3, TZ, TX + 3, G + 7, TZ, B.golemDk); tarm.set(TX + 3, G + 3, TZ, B.golem);
      lights.push({ name: 'test', p: [TX + 0.5, G + 9, TZ + 2], c: '#50f0ff', i: 0.9, d: 14, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '시험 시동', hint: '룬 원이 빛나고 시험 골렘의 눈에 불이 들어오며 오른팔을 번쩍 들어 인사해요', hit: [TX - 4, G + 1, TZ - 4, TX + 4, G + 10, TZ + 4],
        run: async a => {
          a.flash('test', 4, 4.5); a.glow(1.5, 4.5);
          a.burst([TX + 0.5, G + 1.5, TZ + 0.5], { n: 30, colors: ['#5affff', '#a0ffff'], speed: 5, up: 0.5, life: 1.2, gravity: 0, spread: 4, flat: true });
          await a.turn('tarm', [-1.6, 0, 0], 1.2);
          for (let k = 0; k < 3; k++) { await a.turn('tarm', [-2.4, 0, 0], 0.35); await a.turn('tarm', [-1.6, 0, 0], 0.35); }
          a.burst([TX + 0.5, G + 9, TZ + 1.5], { n: 16, colors: ['#e8e0d8', '#b8b0a8'], speed: 3, up: 2, life: 1.2, gravity: -0.5, spread: 1.5 });
          await a.turn('tarm', [0, 0, 0], 1);
        },
      });
      landmarks.push({ name: '시험대', note: '룬 원 위의 작은 골렘', p: [TX + 0.5, G + 15, TZ + 0.5] });

      // ── 부품 창고(동쪽 칸막이 너머): 선반의 팔·머리·톱니, 상자 ──
      const PX = 48;
      for (let z = Z0 + 1; z < Z1; z++) { if (z >= 26 && z <= 31) continue; w.box(PX, G + 1, z, PX, G + 4, z, B.brick); S(PX, G + 5, z, B.brassDk); }
      for (const z of [25, 32]) w.box(PX, G + 1, z, PX, G + 6, z, B.brass);
      for (let x = PX + 1; x < X1; x++) {
        for (const y of [G + 3, G + 6]) S(x, y, Z0 + 1, B.plank);
        S(x, G + 1, Z0 + 1, B.ironDk);
        if (x % 3 === 0) w.box(x, G + 1, Z0 + 1, x, G + 6, Z0 + 1, B.iron);
        else { S(x, G + 4, Z0 + 1, [B.golemDk, B.brass, B.copper][x % 3 === 1 ? 0 : 1]); if (x % 2) S(x, G + 2, Z0 + 1, B.golem); }
      }
      for (let z = 24; z <= 30; z += 3) { w.box(X1 - 2, G + 1, z, X1 - 1, G + 1, z + 1, B.crate); if (z % 2) S(X1 - 1, G + 2, z, B.golem); }
      for (const [x, z] of [[51, 33], [54, 38], [50, 39]]) { w.box(x, G + 1, z, x + 1, G + 2, z + 1, B.crate); S(x, G + 2, z, B.brassDk); }
      S(53, G + 1, 25, B.sack); S(54, G + 1, 25, B.sack); S(53, G + 2, 25, B.sack);
      // 여분 머리(부품)
      const phead = w.prop({ name: 'phead', pivot: [52.5, G + 8, 20.5], axis: 'y' });
      phead.box(51, G + 7, 20, 53, G + 9, 21, B.golem); phead.set(51, G + 9, 21, B.eyeOff); phead.set(53, G + 9, 21, B.eyeOff); phead.box(51, G + 10, 20, 53, G + 10, 20, B.brassDk);
      S(52, G + 6, 20, B.plank);
      w.box(X1 - 1, G + 1, 33, X1 - 1, G + 5, 33, B.brassDk); S(X1 - 1, G + 6, 33, B.lampG);
      lights.push({ name: 'store', p: [X1 - 1.5, G + 6, 33.5], c: '#ffd890', i: 0.6, d: 12, flicker: 0.1, srcR: 3 });
      acts.push({
        name: '부품 고르기', hint: '창고 선반의 여분 골렘 머리가 떠올라 한 바퀴 돌며 눈을 깜빡여요', hit: [50, G + 1, 19, 55, G + 10, 23],
        run: async a => {
          a.flash('store', 2.5, 3);
          await a.move('phead', [0, 3, 2], 0.9); await a.turn('phead', [0, Math.PI * 2, 0], 1.6);
          a.burst([52.5, G + 12, 22.5], { n: 14, colors: ['#5affff', '#ffe0a0'], speed: 3, up: 1, life: 0.9, gravity: 0.5, spread: 1.5 });
          a.unwind('phead'); await a.move('phead', [0, 0, 0], 0.9);
        },
      });

      // ── 돌림 크레인: 칸막이 옆 쇠기둥, 팔(부품)에 매단 팔 부품 상자 ──
      const KX = 47, KZ = 36, KY = G + 13;
      w.box(KX, G + 1, KZ, KX, KY - 1, KZ, B.iron); S(KX, G + 1, KZ, B.ironDk); S(KX, G + 6, KZ, B.brass); S(KX, KY - 1, KZ, B.brassDk);
      const jib = w.prop({ name: 'jib', pivot: [KX + 0.5, KY, KZ + 0.5], axis: 'y' });
      jib.box(KX, KY, KZ, KX + 8, KY, KZ, B.iron); jib.set(KX, KY + 1, KZ, B.brass); jib.line(KX, KY + 2, KZ, KX + 6, KY, KZ, B.ironDk); jib.set(KX + 6, KY - 1, KZ, B.brassDk);
      jib.box(KX + 6, G + 9, KZ, KX + 6, KY - 2, KZ, B.ironDk); jib.box(KX + 5, G + 6, KZ, KX + 7, G + 8, KZ, B.crate); jib.set(KX + 6, G + 8, KZ, B.golemDk);
      acts.push({
        name: '크레인', hint: '크레인 팔이 돌아 창고의 부품 상자를 조립장 쪽으로 옮겼다가 제자리로 돌아와요', hit: [KX - 1, G + 1, KZ - 1, KX + 8, KY + 2, KZ + 1],
        run: async a => {
          a.burst([KX + 0.5, KY + 2, KZ + 0.5], { n: 14, colors: ['#e8e0d8', '#b8b0a8'], speed: 2, up: 2, life: 1.2, gravity: -0.4, spread: 1 });
          await a.turn('jib', [0, Math.PI / 2, 0], 2.4); await a.wait(1.2);
          a.burst([KX + 0.5, G + 6, KZ - 5.5], { n: 12, colors: ['#d8d0c8', '#8a8078'], speed: 3, up: 1, life: 0.8, gravity: 2, spread: 1.5, flat: true });
          await a.turn('jib', [0, 0, 0], 2.4);
        },
      });

      // ── 살림: 작업대, 자루, 구리관, 벽 등 ──
      w.box(36, G + 1, 38, 41, G + 2, 39, B.plank); w.box(37, G + 1, 38, 40, G + 1, 39, 0); for (let x = 36; x <= 41; x++) if (hash3(x, 7, 38) > 0.45) S(x, G + 3, 38 + (x % 2), [B.brass, B.copper, B.golemDk, B.paper][x % 4]);
      S(41, G + 3, 39, B.lampG);
      for (const [x, z] of [[21, 38], [22, 39]]) { w.box(x, G + 1, z, x, G + 2, z, B.copper); S(x, G + 3, z, B.brassDk); }
      w.box(20, G + 1, 33, 21, G + 2, 34, B.crate); S(20, G + 2, 33, B.brassDk);
      for (let x = 39; x < X1; x++) S(x, TOP - 2, Z0 + 1, x % 4 ? B.copper : B.brassDk);
      S(44, G + 8, Z0 + 1, B.lampG);
      lights.push({ name: 'sun', p: [45, G + 12, Z0 + 2], c: '#fff0d8', i: 0.7, d: 26, flicker: 0, srcR: 5 });
      return { lights, landmarks, acts };
    },
  });
})();
