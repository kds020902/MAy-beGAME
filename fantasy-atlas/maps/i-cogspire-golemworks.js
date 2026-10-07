// 골렘 공방 안(하위 지도) — 태엽 공방가 아랫단 2층 벽돌 공방의 속. 쇠 들틀에 매달린 골렘 몸통(조립장), 룬 심장 받침, 룬 원 위 시험 골렘(시험대),
// 칸막이 너머 부품 창고와 돌림 크레인, 북쪽 벽 계단으로 오르는 설계실 중이층. 남·동쪽 벽은 잘라 낮췄다
// 2배 해상도(1칸 ≈ 25cm, 152×120칸), playerScale 2: 낱돌 굽도리와 놋쇠 벽기둥, 창살·창턱이 있는 창, 리벳 줄이 있는 골렘 판갑,
// 테와 볼트가 있는 쇠 들틀, 마디 진 팔, 책등이 보이는 책장, 모서리 쇠를 댄 상자와 테 두른 통.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 152, D = 120, Hh = 112, G = 24;
  MAPS.push({
    id: 'cogspire-golemworks', cat: 'magic', sub: true, parent: 'cogspire', name: '골렘 공방 안', en: 'Cogspire · Golem Works', color: '#c87a4a', seed: 3412, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '룬 기술자 길드의 골렘 공방. 쇠 들틀에 골렘 몸통이 매달려 다리와 맞춰지기를 기다리고, 룬 원 위에서는 다 만든 작은 골렘이 시동을 기다린다. 칸막이 너머 창고에는 팔·머리·톱니가 쌓여 있고, 계단 위 중이층에서는 설계도를 그린다.',
    info: { title: '장소 정보', en: 'GOLEM WORKS', rows: [['쓰임', '작업용 골렘을 짓는 공방'], ['조립장', '쇠 들틀 · 매달린 몸통 · 룬 심장'], ['시험대', '룬 원 위의 작은 골렘'], ['창고', '부품 선반 · 돌림 크레인']] },
    sky: ['#4a3a30', '#1e1612', '#c8925a'], stars: false,
    hemi: ['#ffe8d0', '#3a2a20', 0.52], sun: ['#ffd8b0', 0.62, [0.5, 1, 0.45]],
    night: { sky: ['#20182a', '#0a0810', '#8a5a3a'], stars: false, hemi: ['#c8b0a0', '#140e0a', 0.36], sun: ['#ffd0a0', 0.22, [0.5, 1, 0.45]], haze: '#2a2018' },
    fog: { start: 0.94, floor: G - 12, depth: 12, haze: [12, 0.09, 12], hazeColor: '#a08060' },
    camY: 0, zoom: 1.1,
    particles: [
      { n: 90, colors: ['#ffe8c0', '#fff4dc', '#ffd890'], mode: 'drift', speed: 0.24, wind: 0.1, area: [76, 60, 32], y0: G + 2, y1: G + 36, glow: true },
      { n: 26, colors: ['#ff8a30', '#ffd060'], mode: 'rise', speed: 0.8, area: [41, 43.5, 2.4], y0: G + 6, y1: G + 14, glow: true },
    ],
    blocks: {
      cob: { c: '#5a524a', top: '#6a625a', v: 0.1, pat: 'stone' }, plate: { c: '#5a5a62', top: '#6a6a74', v: 0.04, pat: 'floor' }, dirt: { c: '#4a3a30', v: 0.08 }, rock: { c: '#5a5456', v: 0.06, pat: 'stone' },
      found: { c: '#6a6264', v: 0.05, pat: 'stone' }, brick: { c: '#8a4a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' },
      st1: { c: '#6e6668', v: 0.05 }, st2: { c: '#625a5c', v: 0.05 }, st3: { c: '#78706a', v: 0.05 }, mortar: { c: '#4a4442', v: 0.03 },
      floor: { c: '#6a4a30', top: '#8a6440', v: 0.05, pat: 'plank' }, floorDk: { c: '#5a3e28', top: '#74522f', v: 0.05, pat: 'plank' }, steel: { c: '#5a5a62', top: '#74747e', v: 0.04, pat: 'check', alt: '#686872' },
      brass: { c: '#c89a4a', v: 0.07 }, brassDk: { c: '#9a7030', v: 0.06 }, brassLt: { c: '#e0b860', v: 0.05 }, copper: { c: '#b0683a', v: 0.07 }, verd: { c: '#5a9a88', v: 0.07 }, iron: { c: '#4a4a52', v: 0.04 }, ironDk: { c: '#2a2a30', v: 0.03 },
      golem: { c: '#7a7068', v: 0.06, pat: 'big' }, golemDk: { c: '#5a524c', v: 0.05 }, rivet: { c: '#a89a88', v: 0.03 }, eye: { c: '#5affff', glow: true }, eyeOff: { c: '#1e3a40', v: 0.02 }, core: { c: '#3ac8d0', glow: true },
      rune: { c: '#5affff', glow: true }, runeO: { c: '#ffb040', glow: true }, hot: { c: '#ff6a20', glow: true }, lampG: { c: '#ffd890', glow: true }, glass: { c: '#d8ecf4', glow: true },
      door: { c: '#2a1e18', v: 0.03, pat: 'plank' }, doorDk: { c: '#1e1410', v: 0.03 }, plank: { c: '#7a5a3a', v: 0.06, pat: 'plank' }, paint: { c: '#2a5a4a', v: 0.04 }, crate: { c: '#9a7448', v: 0.06, pat: 'plank' }, crateEdge: { c: '#6a4e30', v: 0.04 },
      sack: { c: '#c8b48a', v: 0.06 }, sack2: { c: '#b8a47a', v: 0.06 }, rope: { c: '#a8906a', v: 0.04 },
      coal: { c: '#222226', v: 0.08 }, paper: { c: '#e8dcc0', v: 0.03 }, blue: { c: '#2a4a8a', v: 0.03 }, blueL: { c: '#8ac8ff', glow: true }, bookR: { c: '#8a3a3a', v: 0.04 }, bookG: { c: '#3a6a4a', v: 0.04 }, bookB: { c: '#3a4a7a', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => ((x >> 4) + (z >> 4)) % 2 ? B.cob : B.plate, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 36, X1 = 115, Z0 = 36, Z1 = 83, TOP = G + 32, LOW = G + 6, MZ = G + 14;   // 벽 두 칸 두께, 안쪽 바닥 38..113 × 38..81
      const STN = [B.st1, B.st2, B.st3];
      const stoneAt = (u, y) => { const c = Math.floor((y - G) / 3), r = ((y - G) % 3 + 3) % 3, uu = u + (c & 1) * 3; if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar; return STN[(hash3(Math.floor(uu / 6), c, 9) * 3) | 0]; };
      const crate = (x, y, z, s) => { for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) { const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1); S(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate); } };
      const sack = (x, y, z) => { for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) { const c = dx !== 1 && dz !== 1; if (!c) S(x + dx, y, z + dz, B.sack); S(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sack : B.sack2); if (!c) S(x + dx, y + 2, z + dz, B.sack); } S(x + 1, y + 3, z + 1, B.rope); };
      const drum = (x, y, z, top) => { for (let r = 0; r < 6; r++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d2 = dx * dx + dz * dz; if (d2 > 4.8) continue; const out = d2 > 1.5; S(x + dx, y + r, z + dz, r === 5 ? (out ? B.brassDk : top) : ((r === 1 || r === 4) && out ? B.iron : B.copper)); } };

      // ── 바닥: 널마루(이음 엇갈림), 조립장·시험대는 쇠판 ──
      for (let z = Z0 - 4; z <= Z1 + 4; z++) for (let x = X0 - 4; x <= X1 + 4; x++) { S(x, G, z, B.found); S(x, G - 1, z, B.found); }
      for (let z = Z0 + 2; z < Z1 - 1; z++) for (let x = X0 + 2; x < X1 - 1; x++) {
        const steelA = x >= 66 && x <= 93 && z >= 42 && z <= 63;
        const row = x >> 2, seam = ((z + row * 7) % 14) === 0;
        S(x, G, z, steelA ? ((x === 66 || x === 93 || z === 42 || z === 63) ? B.brassDk : B.steel) : (seam || row % 4 === 2 ? B.floorDk : B.floor));
      }

      // ── 벽: 북·서는 2층 높이, 남·동은 낮게. 낱돌 굽도리, 놋쇠 벽기둥과 띠, 창 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const inX = x <= X0 + 1 || x >= X1 - 1, inZ = z <= Z0 + 1 || z >= Z1 - 1;
        if (!inX && !inZ) continue;
        const back = x <= X0 + 1 || z <= Z0 + 1, top = back ? TOP : LOW, u = x <= X0 + 1 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = y <= G + 3 ? stoneAt(u, y) : B.brick;
          if (back && (u % 12 === 0 || u % 12 === 1 || y === MZ || y === MZ - 1 || y >= TOP - 1)) b = B.brass;
          if (back && (u % 12 === 0 || u % 12 === 1) && (y % 6 === 0)) b = B.brassDk;
          if (!back && y >= top - 1) b = y === top ? B.brass : B.brassDk;
          S(x, y, z, b);
        }
      }
      for (const [x, z, h] of [[X0, Z0, TOP + 2], [X1 - 1, Z0, TOP + 2], [X0, Z1 - 1, TOP + 2], [X1 - 1, Z1 - 1, LOW + 4]]) { w.box(x, G + 1, z, x + 1, h, z + 1, B.brassDk); w.box(x, h + 1, z, x + 1, h + 1, z + 1, B.brassLt); }
      // 창: 4폭 6높이 유리, 가운데 창살·가로살, 칠한 덧틀, 창턱, 벽돌 인방
      const win = (axis, c, u, y0) => {
        const P = (k, y, b) => axis === 'z' ? S(u + k, y, c, b) : S(c, y, u + k, b);
        const P2 = (k, y, b) => axis === 'z' ? S(u + k, y, c + 1, b) : S(c + 1, y, u + k, b);
        for (let y = y0; y <= y0 + 5; y++) for (let k = 0; k <= 3; k++) { P(k, y, (k === 1 || y === y0 + 3) ? B.brassDk : B.glass); P2(k, y, 0); }
        for (const k of [-1, 4]) for (let y = y0 - 1; y <= y0 + 6; y++) { P(k, y, B.paint); P2(k, y, B.paint); }
        for (let k = -2; k <= 5; k++) { P(k, y0 - 1, B.brassDk); P2(k, y0 - 1, B.brassDk); P(k, y0 + 6, B.brickDk); P2(k, y0 + 6, B.brickDk); }
      };
      for (const u of [52, 88, 100]) win('z', Z0, u, G + 19);
      win('z', Z0, 88, G + 5);
      for (const u of [44, 72]) win('x', X0, u, G + 19);
      win('x', X0, 72, G + 5);
      for (let x = X0 + 8; x < X1 - 2; x += 10) S(x, LOW + 1, Z1 - 1, B.brass);
      for (let z = Z0 + 8; z < Z1 - 2; z += 10) S(X1 - 1, LOW + 1, z, B.brass);

      // ── 정문(서쪽 벽, 안쪽): 판자 문짝(테두리 살·움푹한 판), 놋쇠 문틀, 벽 등 ──
      const DZ0 = 58, DZ1 = 61, DY = G + 9;
      for (let z = DZ0 - 2; z <= DZ1 + 2; z++) for (let y = G + 1; y <= DY + 2; y++) {
        const frame = z < DZ0 || z > DZ1 || y > DY;
        const stile = z === DZ0 || z === DZ1 || y === G + 1 || y === G + 5 || y === DY;
        S(X0 + 1, y, z, frame ? (y === DY + 2 || z === DZ0 - 2 || z === DZ1 + 2 ? B.brassDk : B.brass) : (stile ? B.doorDk : B.door));
      }
      S(X0 + 2, G + 5, DZ1 - 1, B.brassLt);
      w.box(X0 + 1, DY + 3, 59, X0 + 1, DY + 4, 60, B.runeO);
      for (const lz of [DZ0 - 4, DZ1 + 4]) { S(X0 + 2, G + 7, lz, B.ironDk); S(X0 + 2, G + 8, lz, B.lampG); S(X0 + 2, G + 9, lz, B.lampG); S(X0 + 2, G + 10, lz, B.ironDk); }
      acts.push(OR.goAct({ at: [X0 + 4, G + 1, 59.5], h: 9, hit: [X0 + 1, G + 1, DZ0, X0 + 4, G + 9, DZ1], name: '밖으로 나가기', goto: 'cogspire', hint: '공방 문을 열고 나가 아랫단 골렘 시험대 옆 거리로 돌아가요' }));
      lights.push({ name: 'door', p: [X0 + 4, G + 10, 60], c: '#ffd890', i: 0.7, d: 24, flicker: 0.08, srcR: 8 });

      // ── 중이층(설계실): 북서쪽, 북쪽 벽을 따라 오르는 계단(한 단 2칸) ──
      for (let z = Z0 + 2; z <= 49; z++) for (let x = X0 + 2; x <= 61; x++) {
        const edge = x >= 60 || z >= 48;
        S(x, MZ, z, edge ? B.brassDk : (x % 6 === 0 ? B.floorDk : B.floor)); S(x, MZ - 1, z, edge ? B.brassDk : (z % 4 === 0 ? B.floorDk : 0));
      }
      for (const [x, z] of [[60, 48], [48, 48]]) { w.box(x, G + 1, z, x + 1, MZ - 2, z + 1, B.iron); S(x, G + 1, z, B.ironDk); S(x + 1, G + 1, z + 1, B.ironDk); }
      for (let x = X0 + 2; x <= 61; x++) { S(x, MZ + 4, 49, B.brass); if (x % 3 === 0) w.box(x, MZ + 1, 49, x, MZ + 3, 49, B.iron); }
      for (let z = 42; z <= 49; z++) { S(61, MZ + 4, z, B.brass); if (z % 3 === 0) w.box(61, MZ + 1, z, 61, MZ + 3, z, B.iron); }
      w.box(61, MZ + 1, 42, 61, MZ + 4, 42, B.brassDk);
      for (let k = 0; k <= 6; k++) { const xA = 74 - 2 * k, top = G + 2 + 2 * k; for (let x = xA; x <= xA + 1; x++) for (let y = G + 1; y <= top; y++) for (let z = Z0 + 2; z <= Z0 + 5; z++) S(x, y, z, y === top ? (x === xA ? B.brassDk : B.floorDk) : B.brick); }
      w.box(76, G + 1, Z0 + 6, 76, G + 6, Z0 + 6, B.brass); S(76, G + 7, Z0 + 6, B.lampG); S(76, G + 8, Z0 + 6, B.brassDk);
      // 설계실 살림: 책장(책등), 의자, 설계 탁자(설계도는 부품)
      for (let z = Z0 + 2; z <= 47; z++) for (const y of [MZ + 1, MZ + 5, MZ + 9]) {
        S(X0 + 2, y, z, B.plank); S(X0 + 3, y, z, B.plank);
        if (y < MZ + 9) { const h = hash3(z, y, 3); const bk = [B.bookR, B.bookG, B.paper, B.blue, B.bookB][(h * 5) | 0]; S(X0 + 2, y + 1, z, bk); S(X0 + 2, y + 2, z, bk); if (h > 0.4) S(X0 + 2, y + 3, z, bk); }
      }
      for (const z of [Z0 + 2, 47]) w.box(X0 + 2, MZ + 1, z, X0 + 3, MZ + 9, z, B.plank);
      w.box(46, MZ + 4, 40, 55, MZ + 4, 43, B.plank);
      for (const [x, z] of [[46, 40], [55, 40], [46, 43], [55, 43]]) w.box(x, MZ + 1, z, x, MZ + 3, z, B.ironDk);
      w.box(50, MZ + 1, 46, 51, MZ + 2, 47, B.brassDk); w.box(50, MZ + 3, 47, 51, MZ + 5, 47, B.brassDk);
      S(56, MZ + 5, 40, B.paper); S(57, MZ + 5, 40, B.paper); w.box(56, MZ + 1, 40, 57, MZ + 4, 41, B.plank); S(57, MZ + 5, 41, B.brassDk); S(57, MZ + 6, 41, B.lampG);
      lights.push({ name: 'office', p: [57, MZ + 7, 41], c: '#ffd890', i: 0.6, d: 24, flicker: 0.1, srcR: 6 });
      const plan = w.prop({ name: 'plan', pivot: [51, MZ + 5.5, 43], axis: 'x' });
      plan.box(47, MZ + 5, 40, 54, MZ + 5, 43, B.blue);
      for (let x = 48; x <= 53; x++) plan.set(x, MZ + 5, 41, B.blueL);
      for (let z = 40; z <= 43; z++) plan.set(50, MZ + 5, z, B.blueL);
      plan.set(52, MZ + 5, 42, B.blueL); plan.set(48, MZ + 5, 43, B.paper); plan.set(47, MZ + 5, 43, B.paper);
      acts.push({
        name: '설계도 펼치기', hint: '중이층 탁자의 설계도가 일어서며 골렘 설계선이 푸르게 빛나요', hit: [44, MZ + 1, 38, 58, MZ + 10, 46],
        run: async a => {
          await a.move('plan', [0, 4, 2], 0.8); await a.turn('plan', [-1.3, 0, 0], 0.6);
          a.flash('office', 3, 3); a.glow(1.4, 3);
          for (let k = 0; k < 6; k++) { a.burst([51 + ((k % 3) - 1) * 2, MZ + 12, 44], { n: 12, colors: ['#8ac8ff', '#ffffff', '#5affff'], speed: 4, up: 2, life: 1.2, gravity: -0.6, spread: 2.4 }); await a.wait(0.45); }
          await a.turn('plan', [0, 0, 0], 0.6); await a.move('plan', [0, 0, 0], 0.7);
        },
      });
      // 중이층 아래: 작은 화덕(벽돌·아궁이 불)과 석탄, 공구 사물함
      w.box(X0 + 2, G + 1, 40, X0 + 7, G + 5, 47, B.brickDk); w.box(X0 + 3, G + 2, 41, X0 + 7, G + 4, 46, 0); w.box(X0 + 3, G + 1, 41, X0 + 6, G + 2, 46, B.coal);
      w.box(X0 + 4, G + 2, 42, X0 + 5, G + 3, 45, B.hot); w.box(X0 + 2, G + 6, 40, X0 + 7, G + 6, 47, B.iron);
      w.box(X0 + 2, G + 7, 40, X0 + 4, MZ - 2, 42, B.brickDk);
      for (let x = X0 + 9; x <= X0 + 12; x++) for (let z = 45; z <= 47; z++) for (let y = G + 1; y <= G + 2 + ((x + z) & 1); y++) S(x, y, z, B.coal);
      for (let x = 48; x <= 59; x++) { const k = (x - 48) >> 1; for (let y = G + 1; y <= G + 9; y++) S(x, y, Z0 + 2, (x & 1) && y > G + 2 ? B.ironDk : (k % 2 ? B.iron : B.verd)); S(x, G + 9, Z0 + 3, B.brassDk); if (!(x & 1)) { S(x, G + 6, Z0 + 3, B.brassLt); } }
      lights.push({ name: 'forge', p: [X0 + 5, G + 7, 44], c: '#ff8a30', i: 0.9, d: 24, flicker: 0.3, srcR: 6 });

      // ── 조립장: 쇠 들틀(볼트 판), 다리만 선 골렘, 매달린 몸통(부품)과 두 팔(부품) ──
      const GX = 80, GZ = 52, GT = G + 48, UP = 10;
      for (const [x, z] of [[68, 44], [90, 44], [68, 60], [90, 60]]) { w.box(x, G + 1, z, x + 1, GT, z + 1, B.iron); w.box(x - 1, G + 1, z - 1, x + 2, G + 2, z + 2, B.ironDk); w.box(x, G + 16, z, x + 1, G + 17, z + 1, B.brass); w.box(x, G + 32, z, x + 1, G + 32, z + 1, B.brassDk); }
      for (const z of [44, 60]) { w.box(68, GT, z, 91, GT + 1, z + 1, B.ironDk); for (let x = 70; x < 90; x += 4) S(x, GT - 1, z, B.brassDk); }
      w.box(GX, GT, 44, GX + 1, GT + 1, 61, B.brassDk); w.box(GX - 2, GT - 2, GZ - 2, GX + 3, GT - 1, GZ + 3, B.iron); w.box(GX, GT - 4, GZ, GX + 1, GT - 3, GZ + 1, B.ironDk);
      w.box(GX - 6, G + 1, GZ - 4, GX + 7, G + 2, GZ + 5, B.ironDk); w.box(GX - 5, G + 2, GZ - 3, GX + 6, G + 2, GZ + 4, B.iron);
      // 다리: 정강이 판·무릎 마디·발
      for (const lx of [GX - 4, GX + 2]) {
        w.box(lx, G + 3, GZ - 2, lx + 3, G + 12, GZ + 3, B.golem);
        w.box(lx - 1, G + 3, GZ - 3, lx + 4, G + 4, GZ + 4, B.golemDk);
        w.box(lx, G + 8, GZ - 2, lx + 3, G + 8, GZ + 3, B.golemDk);
        S(lx, G + 10, GZ + 3, B.rivet); S(lx + 3, G + 10, GZ + 3, B.rivet); S(lx, G + 6, GZ + 3, B.rivet); S(lx + 3, G + 6, GZ + 3, B.rivet);
      }
      const torso = w.prop({ name: 'torso', pivot: [GX + 1, G + 20, GZ + 1], off0: [0, UP, 0] });
      torso.box(GX - 6, G + 13, GZ - 4, GX + 7, G + 24, GZ + 5, B.golem);
      torso.box(GX - 6, G + 17, GZ - 4, GX + 7, G + 17, GZ + 5, B.golemDk); torso.box(GX - 6, G + 24, GZ - 4, GX + 7, G + 24, GZ + 5, B.brassDk);
      torso.box(GX - 7, G + 20, GZ - 3, GX - 7, G + 23, GZ + 4, B.golemDk); torso.box(GX + 8, G + 20, GZ - 3, GX + 8, G + 23, GZ + 4, B.golemDk);
      for (let x = GX - 5; x <= GX + 6; x += 2) { torso.set(x, G + 15, GZ + 5, B.rivet); torso.set(x, G + 22, GZ + 5, B.rivet); }
      torso.box(GX - 2, G + 18, GZ + 5, GX + 3, G + 21, GZ + 5, B.core); torso.box(GX - 1, G + 19, GZ + 5, GX + 2, G + 20, GZ + 5, B.rune);
      torso.box(GX - 2, G + 25, GZ - 2, GX + 3, G + 29, GZ + 3, B.golem); torso.box(GX - 2, G + 29, GZ - 2, GX + 3, G + 29, GZ + 3, B.golemDk);
      torso.box(GX - 1, G + 27, GZ + 3, GX - 1, G + 27, GZ + 3, B.eyeOff); torso.box(GX + 2, G + 27, GZ + 3, GX + 2, G + 27, GZ + 3, B.eyeOff);
      torso.box(GX, G + 30, GZ, GX + 1, G + 30, GZ + 1, B.iron);
      for (let y = G + 31; y <= GT - 5 - UP; y++) torso.set(GX + (y & 1), y, GZ + ((y >> 1) & 1), B.iron);
      const arm = (nm, x0, px, sg) => {
        const p = w.prop({ name: nm, pivot: [px, G + 22, GZ + 1], off0: [sg * 4, 0, 0], rot0: [0, 0, sg * 0.5] });
        p.box(x0, G + 18, GZ - 1, x0 + 3, G + 22, GZ + 2, B.golemDk);          // 어깨~위팔
        p.box(x0, G + 16, GZ - 1, x0 + 3, G + 16, GZ + 2, B.brassDk);          // 팔꿈치 마디
        p.box(x0, G + 11, GZ - 1, x0 + 3, G + 15, GZ + 2, B.golem);            // 아래팔
        p.box(x0, G + 9, GZ - 1, x0 + 3, G + 10, GZ + 2, B.golemDk);           // 주먹
        p.set(x0 + (sg < 0 ? 0 : 3), G + 20, GZ + 2, B.rivet);
        return p;
      };
      arm('armL', GX - 11, GX - 8, -1);
      arm('armR', GX + 9, GX + 10, 1);
      lights.push({ name: 'core', p: [GX + 1, G + 20 + UP, GZ + 7], c: '#50f0ff', i: 0.8, d: 28, flicker: 0.1, srcR: 12 });
      acts.push({
        name: '골렘 조립', hint: '매달린 몸통이 내려와 다리에 맞물리고 두 팔이 어깨에 철컥 끼워져요', hit: [GX - 12, G + 1, GZ - 5, GX + 13, G + 36, GZ + 6],
        run: async a => {
          await a.move('torso', [0, 0, 0], 2.2);
          a.burst([GX + 1, G + 13, GZ + 1], { n: 24, colors: ['#ffe0a0', '#ffb040', '#ffffff'], speed: 10, up: 2, life: 0.8, gravity: 5, spread: 6, flat: true });
          await Promise.all([a.tween('armL', { off: [0, 0, 0], rot: [0, 0, 0] }, 1), a.tween('armR', { off: [0, 0, 0], rot: [0, 0, 0] }, 1)]);
          a.flash('core', 4, 2.2);
          for (const x of [GX - 8, GX + 10]) a.burst([x, G + 22, GZ + 1], { n: 12, colors: ['#ffd060', '#ffffff'], speed: 8, up: 2, life: 0.6, gravity: 6, spread: 2 });
          await a.wait(2.4);
          await Promise.all([a.tween('armL', { off: [-4, 0, 0], rot: [0, 0, -0.5] }, 1), a.tween('armR', { off: [4, 0, 0], rot: [0, 0, 0.5] }, 1)]);
          await a.move('torso', [0, UP, 0], 2);
        },
      });
      landmarks.push({ name: '조립장', note: '들틀에 매달린 골렘 몸통', p: [GX + 1, GT + 10, GZ + 1] });

      // ── 룬 심장 받침(부품: 떠 있는 심장) ──
      const HX = 62, HZ = 54;
      w.box(HX - 2, G + 1, HZ - 2, HX + 3, G + 2, HZ + 3, B.brassDk); w.box(HX - 1, G + 3, HZ - 1, HX + 2, G + 3, HZ + 2, B.brass);
      w.box(HX, G + 4, HZ, HX + 1, G + 6, HZ + 1, B.iron); w.box(HX - 1, G + 7, HZ - 1, HX + 2, G + 7, HZ + 2, B.brass);
      for (const [dx, dz] of [[-2, -2], [3, -2], [-2, 3], [3, 3]]) w.box(HX + dx, G + 3, HZ + dz, HX + dx, G + 5, HZ + dz, B.brass);
      const heart = w.prop({ name: 'heart', pivot: [HX + 1, G + 12, HZ + 1], axis: 'y', speed: 0.8, bob: 0.5, bobSpeed: 1.6 });
      heart.ellipsoid(HX + 0.5, G + 12, HZ + 0.5, 2.4, 2.8, 2.4, B.rune);
      heart.box(HX, G + 12, HZ + 3, HX + 1, G + 12, HZ + 3, B.runeO); heart.box(HX, G + 12, HZ - 2, HX + 1, G + 12, HZ - 2, B.runeO);
      heart.box(HX, G + 15, HZ, HX + 1, G + 15, HZ + 1, B.brass);
      lights.push({ name: 'heart', p: [HX + 1, G + 12, HZ + 1], c: '#5affff', i: 0.9, d: 24, flicker: 0.15, srcR: 6 });
      acts.push({
        name: '룬 심장 넣기', hint: '받침의 룬 심장이 떠올라 매달린 몸통 가슴에 쏙 들어갔다가 돌아와요', hit: [HX - 2, G + 1, HZ - 2, HX + 3, G + 16, HZ + 3],
        run: async a => {
          a.flash('heart', 3, 4.5);
          await a.path('heart', [[0, 8, 0], [10, 18, 2], [GX - HX, 8 + UP, 4]], 2.2);
          a.flash('core', 4, 2); a.glow(1.5, 2);
          for (let k = 0; k < 4; k++) { a.burst([GX + 1, G + 20 + UP, GZ + 6], { n: 16, colors: ['#5affff', '#a0ffff', '#ffffff'], speed: 8, up: 2, life: 1, gravity: 0, spread: 3 }); await a.wait(0.45); }
          await a.path('heart', [[10, 18, 2], [0, 8, 0], [0, 0, 0]], 2);
        },
      });

      // ── 시험대: 룬 원 위의 다 만든 작은 골렘(오른팔은 부품), 수정 기둥 넷 ──
      const TX = 56, TZ = 70;
      MH.circle(w, TX + 0.5, TZ + 0.5, 9, B.rune); MH.circle(w, TX + 0.5, TZ + 0.5, 10.4, B.brassDk); MH.circle(w, TX + 0.5, TZ + 0.5, 5, B.rune);
      for (const [dx, dz] of [[-8, -8], [8, -8], [-8, 8], [8, 8]]) { w.box(TX + dx, G + 1, TZ + dz, TX + dx + 1, G + 2, TZ + dz + 1, B.brassDk); w.box(TX + dx, G + 3, TZ + dz, TX + dx + 1, G + 6, TZ + dz + 1, B.brass); w.box(TX + dx, G + 7, TZ + dz, TX + dx + 1, G + 9, TZ + dz + 1, B.rune); S(TX + dx, G + 10, TZ + dz, B.brassLt); }
      for (const dx of [-2, 2]) { w.box(TX + dx, G + 1, TZ, TX + dx + 1, G + 6, TZ + 1, B.golemDk); w.box(TX + dx, G + 1, TZ - 1, TX + dx + 1, G + 2, TZ + 2, B.golem); }
      w.box(TX - 4, G + 7, TZ - 2, TX + 5, G + 14, TZ + 3, B.golem); w.box(TX - 4, G + 14, TZ - 2, TX + 5, G + 14, TZ + 3, B.brassDk); w.box(TX - 4, G + 10, TZ - 2, TX + 5, G + 10, TZ + 3, B.golemDk);
      w.box(TX, G + 11, TZ + 3, TX + 1, G + 12, TZ + 3, B.rune); for (const x of [TX - 3, TX + 4]) { S(x, G + 8, TZ + 3, B.rivet); S(x, G + 13, TZ + 3, B.rivet); }
      w.box(TX - 2, G + 15, TZ - 2, TX + 3, G + 18, TZ + 3, B.golem); S(TX - 1, G + 17, TZ + 3, B.eye); S(TX + 2, G + 17, TZ + 3, B.eye); w.box(TX - 2, G + 18, TZ - 2, TX + 3, G + 18, TZ + 3, B.golemDk);
      w.box(TX - 6, G + 7, TZ, TX - 5, G + 14, TZ + 1, B.golemDk); w.box(TX - 6, G + 5, TZ, TX - 5, G + 6, TZ + 1, B.golem);
      const tarm = w.prop({ name: 'tarm', pivot: [TX + 7, G + 15, TZ + 1], axis: 'x' });
      tarm.box(TX + 6, G + 7, TZ, TX + 7, G + 14, TZ + 1, B.golemDk); tarm.box(TX + 6, G + 5, TZ, TX + 7, G + 6, TZ + 1, B.golem); tarm.box(TX + 6, G + 10, TZ, TX + 7, G + 10, TZ + 1, B.brassDk);
      lights.push({ name: 'test', p: [TX + 1, G + 18, TZ + 4], c: '#50f0ff', i: 0.9, d: 28, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '시험 시동', hint: '룬 원이 빛나고 시험 골렘의 눈에 불이 들어오며 오른팔을 번쩍 들어 인사해요', hit: [TX - 8, G + 1, TZ - 8, TX + 9, G + 20, TZ + 9],
        run: async a => {
          a.flash('test', 4, 4.5); a.glow(1.5, 4.5);
          a.burst([TX + 1, G + 2, TZ + 1], { n: 30, colors: ['#5affff', '#a0ffff'], speed: 10, up: 1, life: 1.2, gravity: 0, spread: 8, flat: true });
          await a.turn('tarm', [-1.6, 0, 0], 1.2);
          for (let k = 0; k < 3; k++) { await a.turn('tarm', [-2.4, 0, 0], 0.35); await a.turn('tarm', [-1.6, 0, 0], 0.35); }
          a.burst([TX + 1, G + 18, TZ + 3], { n: 16, colors: ['#e8e0d8', '#b8b0a8'], speed: 6, up: 4, life: 1.2, gravity: -1, spread: 3 });
          await a.turn('tarm', [0, 0, 0], 1);
        },
      });
      landmarks.push({ name: '시험대', note: '룬 원 위의 작은 골렘', p: [TX + 1, G + 30, TZ + 1] });

      // ── 부품 창고(동쪽 칸막이 너머): 선반의 팔·머리·톱니, 상자 ──
      const PX = 96;
      for (let z = Z0 + 2; z < Z1 - 1; z++) { if (z >= 52 && z <= 63) continue; w.box(PX, G + 1, z, PX + 1, G + 8, z, B.brick); w.box(PX, G + 9, z, PX + 1, G + 10, z, B.brassDk); }
      for (const z of [50, 64]) w.box(PX, G + 1, z, PX + 1, G + 12, z + 1, B.brass);
      for (let x = PX + 2; x < X1 - 1; x++) {
        const ox = x >> 1;
        for (const y of [G + 5, G + 11]) { S(x, y, Z0 + 2, B.plank); S(x, y, Z0 + 3, B.plank); }
        if (ox % 3 === 0) w.box(x, G + 1, Z0 + 2, x, G + 12, Z0 + 3, B.iron);
        else {
          S(x, G + 1, Z0 + 2, B.ironDk);
          const it = [B.golemDk, B.brass, B.copper][ox % 3 === 1 ? 0 : 1];
          w.box(x, G + 6, Z0 + 2, x, G + 8, Z0 + 2, it); if (ox % 2) w.box(x, G + 2, Z0 + 2, x, G + 4, Z0 + 3, B.golem);
        }
      }
      for (let z = 48; z <= 60; z += 6) { crate(X1 - 6, G + 1, z, 4); if (z % 4) { S(X1 - 4, G + 5, z + 1, B.golem); S(X1 - 3, G + 5, z + 1, B.golem); } }
      crate(102, G + 1, 66, 4); crate(108, G + 1, 76, 4); crate(100, G + 1, 78, 3); S(103, G + 5, 67, B.brassDk);
      sack(106, G + 1, 50); sack(108, G + 4, 51);
      // 여분 머리(부품)와 받침 선반
      const phead = w.prop({ name: 'phead', pivot: [105, G + 16, 42], axis: 'y' });
      phead.box(102, G + 13, 40, 107, G + 18, 43, B.golem); phead.box(102, G + 18, 40, 107, G + 18, 43, B.golemDk);
      phead.set(103, G + 16, 43, B.eyeOff); phead.set(106, G + 16, 43, B.eyeOff); phead.box(102, G + 19, 40, 107, G + 19, 40, B.brassDk);
      w.box(102, G + 11, 40, 107, G + 12, 42, B.plank); w.box(102, G + 1, 41, 102, G + 10, 41, B.iron); w.box(107, G + 1, 41, 107, G + 10, 41, B.iron);
      w.box(X1 - 3, G + 1, 66, X1 - 2, G + 10, 67, B.brassDk); S(X1 - 3, G + 11, 66, B.lampG); S(X1 - 2, G + 11, 67, B.lampG); S(X1 - 3, G + 12, 66, B.brassDk);
      lights.push({ name: 'store', p: [X1 - 3, G + 12, 67], c: '#ffd890', i: 0.6, d: 24, flicker: 0.1, srcR: 6 });
      acts.push({
        name: '부품 고르기', hint: '창고 선반의 여분 골렘 머리가 떠올라 한 바퀴 돌며 눈을 깜빡여요', hit: [100, G + 1, 38, 110, G + 20, 46],
        run: async a => {
          a.flash('store', 2.5, 3);
          await a.move('phead', [0, 6, 4], 0.9); await a.turn('phead', [0, Math.PI * 2, 0], 1.6);
          a.burst([105, G + 24, 46], { n: 14, colors: ['#5affff', '#ffe0a0'], speed: 6, up: 2, life: 0.9, gravity: 1, spread: 3 });
          a.unwind('phead'); await a.move('phead', [0, 0, 0], 0.9);
        },
      });

      // ── 돌림 크레인: 칸막이 옆 쇠기둥(받침·띠), 팔(부품)에 매단 팔 부품 상자 ──
      const KX = 94, KZ = 72, KY = G + 26;
      w.box(KX - 1, G + 1, KZ - 1, KX + 2, G + 2, KZ + 2, B.ironDk); w.box(KX, G + 3, KZ, KX + 1, KY - 1, KZ + 1, B.iron);
      w.box(KX, G + 12, KZ, KX + 1, G + 12, KZ + 1, B.brass); w.box(KX, KY - 1, KZ, KX + 1, KY - 1, KZ + 1, B.brassDk);
      const jib = w.prop({ name: 'jib', pivot: [KX + 1, KY, KZ + 1], axis: 'y' });
      jib.box(KX, KY, KZ, KX + 17, KY + 1, KZ + 1, B.iron); jib.box(KX, KY + 2, KZ, KX + 1, KY + 3, KZ + 1, B.brass);
      jib.line(KX + 1, KY + 4, KZ, KX + 13, KY + 2, KZ, B.ironDk); jib.line(KX + 1, KY + 4, KZ + 1, KX + 13, KY + 2, KZ + 1, B.ironDk);
      jib.box(KX + 12, KY - 1, KZ, KX + 13, KY - 1, KZ + 1, B.brassDk);
      jib.box(KX + 12, G + 17, KZ, KX + 12, KY - 2, KZ, B.ironDk); jib.box(KX + 13, G + 17, KZ + 1, KX + 13, KY - 2, KZ + 1, B.ironDk);
      for (let dy = 0; dy < 6; dy++) for (let dz = -1; dz <= 2; dz++) for (let dx = 10; dx <= 15; dx++) { const e = (dx === 10 || dx === 15) + (dy === 0 || dy === 5) + (dz === -1 || dz === 2); jib.set(KX + dx, G + 11 + dy, KZ + dz, e >= 2 ? B.crateEdge : B.crate); }
      jib.box(KX + 12, G + 17, KZ, KX + 13, G + 17, KZ + 1, B.golemDk);
      acts.push({
        name: '크레인', hint: '크레인 팔이 돌아 창고의 부품 상자를 조립장 쪽으로 옮겼다가 제자리로 돌아와요', hit: [KX - 2, G + 1, KZ - 2, KX + 17, KY + 4, KZ + 3],
        run: async a => {
          a.burst([KX + 1, KY + 4, KZ + 1], { n: 14, colors: ['#e8e0d8', '#b8b0a8'], speed: 4, up: 4, life: 1.2, gravity: -0.8, spread: 2 });
          await a.turn('jib', [0, Math.PI / 2, 0], 2.4); await a.wait(1.2);
          a.burst([KX + 1, G + 12, KZ - 11], { n: 12, colors: ['#d8d0c8', '#8a8078'], speed: 6, up: 2, life: 0.8, gravity: 4, spread: 3, flat: true });
          await a.turn('jib', [0, 0, 0], 2.4);
        },
      });

      // ── 살림: 작업대, 통, 상자, 구리관, 벽 등 ──
      w.box(72, G + 3, 76, 83, G + 4, 79, B.plank);
      for (const [x, z] of [[72, 76], [83, 76], [72, 79], [83, 79]]) w.box(x, G + 1, z, x, G + 2, z, B.ironDk);
      w.box(73, G + 1, 77, 82, G + 1, 78, B.ironDk);
      for (let x = 72; x <= 83; x++) if (hash3(x, 7, 38) > 0.45) S(x, G + 5, 76 + (x % 4), [B.brass, B.copper, B.golemDk, B.paper][x % 4]);
      S(83, G + 5, 79, B.ironDk); S(83, G + 6, 79, B.lampG);
      drum(44, G + 1, 77, B.coal); drum(49, G + 1, 79, B.oil || B.coal);
      crate(40, G + 1, 66, 4); S(41, G + 5, 67, B.brassDk);
      for (let x = 78; x < X1 - 1; x++) { S(x, TOP - 4, Z0 + 2, x % 8 < 2 ? B.brassDk : B.copper); S(x, TOP - 5, Z0 + 2, x % 8 < 2 ? B.brassDk : B.copper); }
      S(88, G + 16, Z0 + 2, B.lampG); S(89, G + 16, Z0 + 2, B.lampG); S(88, G + 17, Z0 + 2, B.brassDk); S(89, G + 17, Z0 + 2, B.brassDk);
      lights.push({ name: 'sun', p: [90, G + 24, Z0 + 4], c: '#fff0d8', i: 0.7, d: 52, flicker: 0, srcR: 10 });
      return { lights, landmarks, acts };
    },
  });
})();
