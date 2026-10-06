// 벽돌 창고(하위 지도) — 수로 지구 가운데 기중기 창고 안. 1층 하역장(상자 더미·술통·곡물 자루·저울), 북서쪽 창고지기 사무실(장부 책상),
// 북쪽 벽을 따라 놓인 2층 저장층(중이층)과 그 위 3층 다락, 도르래 들보, 뒤편 하역문. 남·동쪽(카메라 쪽) 벽은 낮게 잘랐다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 56, G = 10;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'canal-warehouse', cat: 'kingdom', sub: true, parent: 'canal', name: '벽돌 창고', en: 'Canal Ward · Brick Warehouse', color: '#b06a48', seed: 2271, base: G, size: [W, D, Hh],
    desc: '수로 지구 한가운데 기중기가 달린 3층 벽돌 창고. 1층 하역장에는 거룻배에서 내린 상자와 술통, 곡물 자루가 쌓이고, 창고지기는 북서쪽 사무실에서 장부에 도장을 찍는다. 다락의 도르래 들보로 짐을 층층이 올리고, 들보 위에는 비둘기가 산다.',
    info: { title: '장소 정보', en: 'WAREHOUSE', rows: [['1층', '하역장 · 큰 저울 · 창고지기 사무실'], ['2층', '곡물 자루와 술통 저장층'], ['3층', '도르래 들보가 걸린 다락'], ['소문', '들보 위 비둘기는 갑문지기의 편지를 나른다']] },
    night: { sky: ['#283048', '#0a0c18', '#d8a068'], stars: true, hemi: ['#b0b8d0', '#1a1814', 0.46], sun: ['#d0d8ff', 0.3, [0.5, 1, 0.45]], haze: '#262a34' },
    hemi: ['#fff8ec', '#4a4034', 0.6], sun: ['#fff0dc', 0.62, [0.5, 1, 0.45]],
    fog: { start: 0.88, floor: G - 5, depth: 6, haze: [8, 0.12, 6], hazeColor: '#d8d0c4' },
    camY: 0, zoom: 1.3,
    particles: [
      { n: 80, colors: ['#e8dcc0', '#c8b898', '#ffffff'], mode: 'drift', speed: 0.12, wind: 0.08, area: [32, 32, 17], y0: G + 1, y1: G + 22, glow: false },
      { n: 30, colors: ['#fff4d0'], mode: 'fall', speed: 0.08, area: [30, 20, 6], y0: G + 4, y1: G + 20, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      brick: { c: '#9a5a3a', v: 0.06, pat: 'brick' }, brickDk: { c: '#6a3a2a', v: 0.05, pat: 'brick' }, brickIn: { c: '#b07a5a', v: 0.05, pat: 'brick' },
      floorP: { c: '#7a5a38', top: '#a07a4c', v: 0.06, pat: 'plank' }, floorD: { c: '#6a4a30', top: '#8a6640', v: 0.06, pat: 'plank' }, beam: { c: '#5a3e26', v: 0.04, pat: 'log' },
      sack: { c: '#d8c8a0', v: 0.05 }, sackD: { c: '#b8a478', v: 0.05 }, grain: { c: '#e8c860', v: 0.08 }, straw: { c: '#e0c870', v: 0.1 },
      ledger: { c: '#7a2a2a', v: 0.03 }, paper: { c: '#f4ecd8', v: 0.02 }, ink: { c: '#1a1a2a', v: 0.02 }, brass: { c: '#d8a840', v: 0.03 }, stampR: { c: '#c02a2a', v: 0.03 },
      cloth: { c: '#3a5a8a', v: 0.03 }, apple: { c: '#d8403a', v: 0.05 }, pigeon: { c: '#a8a8b0', v: 0.04 }, lantern: { c: '#ffb860', glow: true }, skyW: { c: '#cfe4f4', v: 0.02 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => (x + z) % 5 ? B.cobble : B.cobble2, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 13, X1 = 51, Z0 = 15, Z1 = 48, F2 = G + 8, F3 = G + 16, TOP = G + 23;
      // ── 바닥: 1층 널마루(하역 자국) ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, (x === X0 || x === X1 || z === Z0 || z === Z1) ? B.found : (hash3(x >> 2, 1, z) > 0.8 ? B.floorD : B.floorP));
      // ── 벽: 북·서는 3층 높이(창과 띠), 남·동은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const low = z === Z1 || x === X1, top = low ? G + 3 : TOP;
        for (let y = G + 1; y <= top; y++) {
          const u = x === X0 || x === X1 ? z : x;
          let b = (y === G + 1 || y === F2 || y === F3 || y === top) ? B.brickDk : B.brickIn;
          if (!low && u % 6 === 3 && ((y >= G + 3 && y <= G + 5) || (y >= F2 + 2 && y <= F2 + 5) || (y >= F3 + 2 && y <= F3 + 4)) && u > (x === X0 ? Z0 + 1 : X0 + 1) && u < (x === X0 ? Z1 - 1 : X1 - 1)) b = B.skyW;
          if (!low && u % 6 === 3 && (y === G + 6 || y === F2 + 6 || y === F3 + 5) && u > X0) b = B.brickDk;
          w.set(x, y, z, b);
        }
      }
      // 기둥(벽 안쪽 버팀)
      for (let x = X0 + 6; x < 26; x += 8) w.box(x, G + 1, Z0 + 1, x, TOP - 1, Z0 + 1, B.beam);
      for (let z = Z0 + 8; z < Z1; z += 8) w.box(X0 + 1, G + 1, z, X0 + 1, TOP - 1, z, B.beam);

      // ── 남쪽 하역문(밖으로): 두 짝 나무문, 벽돌 문틀 ──
      const DX0 = 30, DX1 = 33;
      for (let x = DX0 - 1; x <= DX1 + 1; x++) for (let y = G + 1; y <= G + 6; y++) {
        const frame = x === DX0 - 1 || x === DX1 + 1 || y >= G + 5;
        w.set(x, y, Z1, frame ? B.brickDk : ((y === G + 3) ? B.iron : B.plank));
      }
      for (let y = G + 1; y <= G + 4; y++) w.set((DX0 + DX1) >> 1, y, Z1, B.wood);
      w.box(DX0 - 2, G + 7, Z1, DX1 + 2, G + 7, Z1, B.brickDk);
      w.set(DX0 - 2, G + 4, Z1 - 1, B.lantern); w.set(DX1 + 2, G + 4, Z1 - 1, B.lantern);
      lights.push({ name: 'door', p: [32, G + 4, Z1 - 1.5], c: '#ffd890', i: 0.5, d: 10, flicker: 0.1 });
      acts.push(OR.goAct({ at: [31, G + 1, Z1 - 1], name: '밖으로 나가기', goto: 'canal', hint: '하역문을 열고 기중기와 거룻배가 있는 운하 둑길로 나가요', hit: [DX0, G + 1, Z1 - 1, DX1, G + 4, Z1], h: 6 }));
      for (let z = Z1 - 5; z <= Z1 - 1; z++) for (let x = DX0; x <= DX1; x++) w.set(x, G, z, B.slab);

      // ── 2층 저장층: 북쪽 벽을 따라 놓인 중이층(x26~50, z≤22). 3층 다락은 그 위 서쪽(x28~41, z≤20) ──
      const MZ = 22, LZ3 = 20, LX0 = 28, LX1 = 41;
      for (let z = Z0 + 1; z <= MZ; z++) for (let x = 26; x < X1; x++) w.set(x, F2, z, z === MZ ? B.beam : B.floorP);
      for (let z = Z0 + 1; z <= LZ3; z++) for (let x = LX0; x <= LX1; x++) w.set(x, F3, z, z === LZ3 || x === LX0 ? B.beam : B.floorD);
      for (const x of [26, 32, 38, 44, 50]) w.box(x, G + 1, MZ, x, F2 - 1, MZ, B.beam);
      for (let y = G + 1; y < F2; y++) w.set(26, y, Z0 + 1, B.beam);
      for (const x of [LX0, 34, LX1]) w.box(x, F2 + 1, LZ3, x, F3 - 1, LZ3, B.beam);
      // 중이층 난간(계단 머리 x34~38은 비움), 다락 난간(계단 머리 x41은 비움)
      for (let x = 26; x < X1; x++) if (x < 34 || x > 38) { w.set(x, F2 + 2, MZ, B.wood); if (x % 3 === 0) w.set(x, F2 + 1, MZ, B.wood); }
      for (let z = Z0 + 1; z <= MZ; z++) { w.set(26, F2 + 1, z, B.wood); w.set(26, F2 + 2, z, B.wood); w.set(X1, F2 + 1, z, B.wood); w.set(X1, F2 + 2, z, B.wood); }
      for (let x = LX0; x < LX1; x++) { w.set(x, F3 + 2, LZ3, B.wood); if (x % 3 === 0) w.set(x, F3 + 1, LZ3, B.wood); }
      for (let z = Z0 + 1; z <= LZ3; z++) { w.set(LX0, F3 + 1, z, B.wood); w.set(LX0, F3 + 2, z, B.wood); }
      // 1층 → 2층 계단: 중이층 앞에서 동쪽으로 오른다(x30 → x37, z23~25)
      for (let i = 0; i < 8; i++) { const x = 30 + i; w.box(x, G + 1, MZ + 1, x, G + 1 + i, MZ + 3, B.wood); w.box(x, G + 1 + i, MZ + 1, x, G + 1 + i, MZ + 3, B.floorP); w.set(x, G + 2 + i, MZ + 4, i % 3 === 0 ? B.beam : 0); if (i % 3 === 0) w.set(x, G + 3 + i, MZ + 4, B.wood); }
      // 2층 → 3층 계단: 북쪽 벽을 따라 서쪽으로 오른다(x49 → x42, z16~18), 다락 동쪽 끝 x41로 이어진다
      for (let i = 0; i < 8; i++) { const x = 49 - i; w.box(x, F2 + 1, Z0 + 1, x, F2 + 1 + i, Z0 + 3, B.wood); w.box(x, F2 + 1 + i, Z0 + 1, x, F2 + 1 + i, Z0 + 3, B.floorP); w.set(x, F2 + 2 + i, Z0 + 4, i % 3 === 1 ? B.beam : 0); }
      for (let z = Z0 + 1; z <= Z0 + 3; z++) w.set(LX1, F3 + 1, z, 0), w.set(LX1, F3 + 2, z, 0);
      // ── 1층 하역장: 상자 더미, 술통, 곡물 자루, 손수레 ──
      const crate = (x, y, z, sx, sy, sz) => { w.box(x, y, z, x + sx - 1, y + sy - 1, z + sz - 1, B.crate); for (let yy = y; yy < y + sy; yy++) { w.set(x, yy, z, B.wood); w.set(x + sx - 1, yy, z + sz - 1, B.wood); } };
      crate(43, G + 1, 37, 3, 2, 3); crate(43, G + 3, 37, 2, 2, 2); crate(47, G + 1, 38, 2, 2, 2); crate(43, G + 1, 41, 3, 3, 3); crate(46, G + 1, 41, 2, 2, 3); crate(44, G + 4, 42, 2, 1, 2);
      for (const [x, z] of [[20, 40], [21, 40], [20, 41], [22, 41], [21, 42]]) { w.box(x, G + 1, z, x, G + 2, z, B.barrel); if ((x + z) % 2) w.set(x, G + 3, z, B.barrel); }
      for (let k = 0; k < 9; k++) { const x = 25 + (k % 3), z = 43 + (k / 3 | 0), h = 1 + (k % 2); w.box(x, G + 1, z, x, G + h, z, k % 3 ? B.sack : B.sackD); }
      w.box(39, G + 1, 45, 41, G + 1, 46, B.wood); w.box(39, G + 2, 45, 41, G + 2, 46, B.plank); w.set(39, G + 3, 45, B.apple); w.set(40, G + 3, 46, B.apple); w.set(41, G + 3, 45, B.crate);
      crate(17, G + 1, 44, 2, 2, 2); crate(17, G + 3, 44, 2, 1, 2); crate(20, G + 1, 45, 3, 2, 2);
      for (let x = 44; x <= 48; x++) for (let z = 45; z <= 46; z++) w.set(x, G + 1, z, B.plank);
      for (const [x, z] of [[44, 45], [46, 46], [48, 45]]) { w.box(x, G + 2, z, x, G + 3, z, B.barrel); w.set(x, G + 2, z, B.iron); }
      for (let k = 0; k < 8; k++) { const t = k * 0.8; w.set(Math.round(36 + Math.cos(t) * 1.5), G + 1, Math.round(33 + Math.sin(t) * 1.5), B.rope); }
      for (const [x, z] of [[47, 31], [48, 31], [47, 32]]) { w.box(x, G + 1, z, x, G + 1 + ((x + z) & 1), z, B.sack); }
      // 상자 열기: 하역장 큰 상자 뚜껑(부품)
      const LX = 30, LZ = 38;
      w.box(LX, G + 1, LZ, LX + 2, G + 2, LZ + 2, B.crate); w.box(LX, G + 3, LZ, LX + 2, G + 3, LZ + 2, B.straw); w.set(LX + 1, G + 3, LZ + 1, B.apple);
      const lid = w.prop({ name: 'lid', pivot: [LX, G + 4, LZ + 1.5], axis: 'z' });
      lid.box(LX, G + 4, LZ, LX + 2, G + 4, LZ + 2, B.plank); lid.box(LX, G + 4, LZ + 1, LX + 2, G + 4, LZ + 1, B.wood);
      acts.push({
        name: '상자 열기', hint: '거룻배에서 내린 큰 상자의 뚜껑이 들리며 지푸라기와 빨간 사과 향이 튀어 올라요', hit: [LX - 1, G + 1, LZ - 1, LX + 3, G + 4, LZ + 3],
        run: async a => {
          await Promise.all([a.move('lid', [0, 1.5, 0], 0.6), a.turn('lid', [0, 0, 1.2], 0.6)]);
          a.burst([LX + 1.5, G + 4.5, LZ + 1.5], { n: 26, colors: ['#e0c870', '#f0e0a0', '#d8403a'], speed: 2.4, up: 3, life: 1.4, gravity: 5, spread: 1 });
          await a.wait(1.4);
          await Promise.all([a.move('lid', [0, 0, 0], 0.6), a.turn('lid', [0, 0, 0], 0.6)]);
        },
      });
      // 큰 저울: 받침 기둥, 저울대(부품), 두 접시
      const SX = 26, SZ = 30;
      w.box(SX - 1, G + 1, SZ - 1, SX + 1, G + 1, SZ + 1, B.found); w.box(SX, G + 2, SZ, SX, G + 5, SZ, B.iron); w.set(SX, G + 7, SZ, B.brass);
      const beam = w.prop({ name: 'scale', pivot: [SX + 0.5, G + 6.5, SZ + 0.5], axis: 'z' });
      beam.box(SX - 4, G + 6, SZ, SX + 4, G + 6, SZ, B.brass);
      for (const s of [-1, 1]) { beam.box(SX + s * 4, G + 4, SZ, SX + s * 4, G + 5, SZ, B.iron); beam.box(SX + s * 4 - 1, G + 3, SZ - 1, SX + s * 4 + 1, G + 3, SZ + 1, B.brass); }
      beam.set(SX - 4, G + 4, SZ - 1, B.sack); beam.set(SX - 4, G + 4, SZ + 1, B.sack);
      acts.push({
        name: '저울 달기', hint: '곡물 자루를 올리자 큰 저울대가 기우뚱 기울었다가 놋쇠 추와 맞춰져요', hit: [SX - 5, G + 1, SZ - 2, SX + 5, G + 7, SZ + 2],
        run: async a => {
          await a.turn('scale', [0, 0, 0.42], 0.8); a.burst([SX - 3.5, G + 3, SZ + 0.5], { n: 14, colors: ['#e8c860', '#d8c8a0'], speed: 1.2, up: 1, life: 1, gravity: 4, spread: 0.6 });
          await a.turn('scale', [0, 0, -0.25], 0.6); await a.turn('scale', [0, 0, 0.12], 0.5); await a.turn('scale', [0, 0, 0], 0.5);
          a.burst([SX + 0.5, G + 8, SZ + 0.5], { n: 10, colors: ['#ffe9a0', '#ffffff'], speed: 1, up: 1.4, life: 1, gravity: -0.3, spread: 0.4 });
        },
      });

      // ── 북서쪽 창고지기 사무실: 나무 칸막이, 장부 책상, 서류 선반, 등 ──
      const OX1 = 25, OZ1 = 26;
      for (let x = X0 + 1; x <= OX1; x++) for (let y = G + 1; y <= G + 5; y++) { const door = x >= 21 && x <= 22 && y <= G + 3; if (!door) w.set(x, y, OZ1, (y === G + 3 || y === G + 4) && x % 3 === 0 ? B.skyW : (y === G + 5 ? B.beam : B.plank)); }
      for (let z = Z0 + 1; z <= OZ1; z++) for (let y = G + 1; y <= G + 5; y++) w.set(OX1, y, z, (y === G + 3 || y === G + 4) && z % 3 === 0 ? B.skyW : (y === G + 5 ? B.beam : B.plank));
      for (let z = Z0 + 1; z < OZ1; z++) for (let x = X0 + 1; x < OX1; x++) w.set(x, G, z, (x + z) % 2 ? B.floorD : B.floorP);
      for (let z = Z0 + 3; z <= OZ1 - 3; z++) for (let x = X0 + 4; x <= OX1 - 4; x++) w.set(x, G, z, B.cloth);
      const DKX = 18, DKZ = 19;
      w.box(DKX, G + 1, DKZ, DKX, G + 1, DKZ + 2, B.wood); w.box(DKX + 3, G + 1, DKZ, DKX + 3, G + 1, DKZ + 2, B.wood); w.box(DKX, G + 2, DKZ, DKX + 3, G + 2, DKZ + 2, B.plank);
      w.set(DKX + 1, G + 3, DKZ + 1, B.ledger); w.set(DKX + 2, G + 3, DKZ + 1, B.paper); w.set(DKX + 3, G + 3, DKZ, B.ink); w.set(DKX, G + 3, DKZ + 2, B.lantern); w.set(DKX + 1, G + 1, DKZ + 4, B.wood);
      for (let x = X0 + 2; x <= OX1 - 2; x++) for (let y = G + 1; y <= G + 6; y++) w.set(x, y, Z0 + 1, y % 2 ? B.wood : (hash3(x, y, 3) > 0.5 ? B.paper : B.ledger));
      const stamp = w.prop({ name: 'stamp', pivot: [DKX + 2.5, G + 3, DKZ + 1.5] });
      stamp.set(DKX + 2, G + 4, DKZ + 1, B.stampR); stamp.box(DKX + 2, G + 5, DKZ + 1, DKX + 2, G + 6, DKZ + 1, B.wood);
      lights.push({ name: 'office', p: [DKX + 0.5, G + 4, DKZ + 2.5], c: '#ffd890', i: 0.7, d: 10, flicker: 0.12 });
      acts.push({
        name: '장부 도장', hint: '창고지기 책상에서 붉은 도장이 쾅 찍히고 장부 종이가 팔랑여요', hit: [DKX - 1, G + 1, DKZ - 1, DKX + 4, G + 5, DKZ + 4],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.move('stamp', [0, 2, 0], 0.35); await a.move('stamp', [0, -0.9, 0], 0.15);
            a.burst([DKX + 2.5, G + 3.4, DKZ + 1.5], { n: 12, colors: ['#c02a2a', '#f4ecd8', '#ffffff'], speed: 2, up: 1.4, life: 0.8, gravity: 3, spread: 0.4 });
            a.flash('office', 1.6, 0.3); await a.wait(0.2);
          }
          await a.move('stamp', [0, 0, 0], 0.4);
          a.burst([DKX + 2.5, G + 4, DKZ + 1.5], { n: 10, colors: ['#f4ecd8', '#ffffff'], speed: 1.6, up: 2, life: 1.6, gravity: 0.6, spread: 1, flat: true });
        },
      });
      landmarks.push({ name: '창고지기 사무실', note: '장부와 붉은 도장', p: [19.5, G + 10, 20.5] });

      // ── 2층: 곡물 자루 더미와 술통 줄(중이층) ──
      for (let x = 27; x <= 40; x++) for (let z = Z0 + 1; z <= Z0 + 3; z++) {
        if ((x - 27) % 5 > 3) continue;
        const h = 1 + ((x * 3 + z) % 3 === 0 ? 2 : (x + z) % 2);
        for (let y = F2 + 1; y <= F2 + h; y++) w.set(x, y, z, (x + y + z) % 3 ? B.sack : B.sackD);
      }
      for (let x = 28; x <= 48; x += 2) if (x < 34 || x > 38) { w.box(x, F2 + 1, MZ - 1, x, F2 + 2, MZ - 1, B.barrel); w.set(x, F2 + 3, MZ - 1, x % 4 ? B.barrel : B.grain); }
      for (let x = 44; x <= 48; x++) w.set(x, F2 + 1, Z0 + 5, B.grain);
      // 중이층 아래: 술통과 곡물 자루 저장
      for (let x = 27; x <= 49; x++) for (let z = Z0 + 1; z <= Z0 + 2; z++) if (x % 3) { w.box(x, G + 1, z, x, G + 2 + (x % 2), z, (x + z) % 4 ? B.barrel : B.sackD); }
      // ── 3층 다락: 도르래 들보, 밧줄 사리, 비둘기 횃대 ──
      const HX = 42, HZ = 25;
      for (let z = Z0 + 1; z <= HZ; z++) w.set(HX, TOP - 2, z, B.beam);
      w.set(HX, TOP - 3, HZ, B.iron); w.set(HX - 1, TOP - 3, HZ, B.wood); w.set(HX + 1, TOP - 3, HZ, B.wood);
      const hTop = G + 4, hLen = TOP - 4 - hTop;
      MH.rope(w, 'hrope', HX, TOP - 4, HZ, hLen, B.rope);
      const hload = w.prop({ name: 'hload', pivot: [HX + 0.5, G + 1, HZ + 0.5] });
      hload.box(HX - 1, G + 1, HZ - 1, HX + 1, G + 3, HZ + 1, B.crate); hload.box(HX - 1, G + 2, HZ - 1, HX + 1, G + 2, HZ + 1, B.wood); hload.set(HX, G + 4, HZ, B.iron);
      acts.push({
        name: '도르래로 짐 올리기', hint: '다락 들보의 도르래가 삐걱 돌며 하역장의 짐 상자가 2층 중이층 높이까지 올라가요', hit: [HX - 2, G + 1, HZ - 2, HX + 2, G + 5, HZ + 2],
        run: async a => {
          const up = F2 - G + 1;
          await Promise.all([a.move('hload', [0, up, 0], 3, t => t), a.rope('hrope', hLen, hLen - up, 3, t => t)]);
          a.burst([HX + 0.5, TOP - 3, HZ + 0.5], { n: 10, colors: ['#d8c8a0', '#c8b898'], speed: 1, up: 0.5, life: 1.4, gravity: 2, spread: 0.6 });
          await a.wait(1);
          await Promise.all([a.move('hload', [0, 0, 0], 2.6, t => t), a.rope('hrope', hLen, hLen, 2.6, t => t)]);
        },
      });
      landmarks.push({ name: '도르래 들보', note: '다락에서 짐을 올리는 들보', p: [HX + 0.5, TOP + 4, 20.5] });
      // 다락 짐: 상자와 밧줄 사리
      crate(LX0 + 1, F3 + 1, Z0 + 1, 3, 2, 3); crate(LX0 + 5, F3 + 1, Z0 + 1, 2, 2, 2);
      for (let k = 0; k < 6; k++) { const a = k * 1.05; w.set(Math.round(38 + Math.cos(a) * 1.4), F3 + 1, Math.round(Z0 + 3 + Math.sin(a) * 1.4), B.rope); }
      // 뒤편 하역문(다락 북쪽 벽, 부품 두 짝)
      const BX0 = 30, BX1 = 33;
      for (let x = BX0; x <= BX1; x++) for (let y = F3 + 1; y <= F3 + 4; y++) w.set(x, y, Z0, B.skyW);
      w.box(BX0 - 1, F3 + 5, Z0, BX1 + 1, F3 + 5, Z0, B.brickDk);
      for (let x = BX0; x <= BX1; x++) for (let y = F3 + 1; y <= F3 + 4; y++) w.set(x, y, Z0 + 1, 0);
      const bL = w.prop({ name: 'bdoorL', pivot: [BX0, F3 + 1, Z0 + 1] }), bR = w.prop({ name: 'bdoorR', pivot: [BX1 + 1, F3 + 1, Z0 + 1] });
      bL.box(BX0, F3 + 1, Z0 + 1, BX0 + 1, F3 + 4, Z0 + 1, B.door); bR.box(BX0 + 2, F3 + 1, Z0 + 1, BX1, F3 + 4, Z0 + 1, B.door); bL.set(BX0 + 1, F3 + 3, Z0 + 1, B.iron); bR.set(BX0 + 2, F3 + 3, Z0 + 1, B.iron);
      w.set(BX1 + 2, F3 + 4, Z0 + 1, B.lantern);
      lights.push({ name: 'backdoor', p: [BX1 + 2.5, F3 + 4, Z0 + 2], c: '#fff4dc', i: 0.6, d: 20, flicker: 0.02, srcR: 3 });
      acts.push({
        name: '뒤편 하역문 열기', hint: '다락 북쪽 하역문이 활짝 열리며 운하 바람과 햇빛이 다락에 쏟아져요', hit: [BX0 - 1, F3 + 1, Z0 + 1, BX1 + 1, F3 + 5, Z0 + 3],
        run: async a => {
          await Promise.all([a.turn('bdoorL', [0, 1.4, 0], 1), a.turn('bdoorR', [0, -1.4, 0], 1)]);
          a.flash('backdoor', 3, 3); a.wind(1.6, 2.4);
          for (let k = 0; k < 8; k++) { a.burst([31.5, F3 + 3 + k * 0.4, Z0 + 2 + k * 1.5], { n: 12, colors: ['#fff4d0', '#e8dcc0', '#ffffff'], speed: 1.6, up: 0.4, life: 1.6, gravity: 0.2, spread: 1.2 }); await a.wait(0.25); }
          await a.wait(1.2);
          await Promise.all([a.turn('bdoorL', [0, 0, 0], 1), a.turn('bdoorR', [0, 0, 0], 1)]);
        },
      });
      // 비둘기 횃대(북쪽 벽 들보 위)
      for (const x of [16, 20, 24]) { w.set(x, TOP - 2, Z0 + 1, B.beam); w.set(x, TOP - 2, Z0 + 2, B.beam); w.set(x, TOP - 1, Z0 + 2, B.pigeon); w.set(x + 1, TOP - 2, Z0 + 1, B.straw); }
      acts.push({
        name: '비둘기 날리기', hint: '들보 위 비둘기들이 푸드덕 날아올라 창고 위를 한 바퀴 돌아요', hit: [15, TOP - 4, Z0 + 1, 25, TOP, Z0 + 3],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            const t = k / 8 * Math.PI * 2;
            a.burst([30 + Math.cos(t) * 10, TOP - 1 - k * 0.3, 28 + Math.sin(t) * 8], { n: 10, colors: ['#a8a8b0', '#e8e8f0', '#6a6a78'], speed: 4, up: 2, life: 1.2, gravity: 0.6, spread: 1 });
            await a.wait(0.25);
          }
          a.burst([24, TOP + 2, 24], { n: 16, colors: ['#e8e8f0', '#ffffff'], speed: 2, up: 1, life: 2.2, gravity: 0.5, spread: 3, flat: true });
        },
      });
      // ── 등: 기둥에 걸린 등과 하역장 조명 ──
      for (const [x, y, z] of [[X0 + 1, G + 5, 32], [32, F2 - 2, MZ + 1], [44, F2 - 2, MZ + 1], [34, F3 - 2, LZ3 + 1]]) { w.set(x, y, z, B.lantern); }
      lights.push({ name: 'hall', p: [32.5, F2 - 2, MZ + 1.5], c: '#ffd890', i: 0.7, d: 22, flicker: 0.1 });
      lights.push({ name: 'loft', p: [34.5, F3 - 2, LZ3 + 1.5], c: '#ffd890', i: 0.5, d: 14, flicker: 0.1 });
      return { lights, landmarks, acts };
    },
  }));
})();
