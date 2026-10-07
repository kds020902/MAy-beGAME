// 빵집(하위 지도) — 주택가 동쪽 마당의 노란 벽 이층 빵집 안. 서쪽 문으로 들어서면 빵 진열대와 계산대(종), 안쪽 반죽방(반죽 통·밀가루 자루·큰 작업대),
// 북동쪽 벽돌 화덕과 빵 삽, 계단 위 북쪽 다락(빵집 가족 방). 남·동쪽(카메라 쪽) 벽은 낮게 잘랐다.
// 2배 해상도(1칸 ≈ 25cm), playerScale 2. 진열 선반은 다락 밑에서 꺼내 북쪽 벽 서편에 층층이 세워, 기본 시점에서 빵이 채워지는 모습이 잘 보이게 했다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 112, D = 112, Hh = 96, G = 20;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'elmrow-bakery', cat: 'kingdom', sub: true, parent: 'elmrow', name: '빵집', en: 'Elm Row · Bakery', color: '#f2d27a', seed: 2132, base: G, size: [W, D, Hh],
    playerScale: 2,
    desc: '느릅나무 주택가 동쪽 마당의 노란 벽 이층 빵집. 문을 열면 진열대 가득 갓 구운 빵 냄새가 나고, 계산대 너머 반죽방에서는 새벽마다 반죽을 치댄다. 안쪽 벽돌 화덕은 하루 종일 꺼지지 않고, 계단 위 2층은 빵집 가족이 사는 방이다.',
    info: { title: '장소 정보', en: 'BAKERY', rows: [['가게', '빵 진열대 · 계산대 종'], ['반죽방', '반죽 통 · 밀가루 자루 · 큰 작업대'], ['화덕', '벽돌 둥근 화덕 · 빵 삽'], ['2층', '빵집 가족 방']] },
    night: { sky: ['#283048', '#0a0c18', '#d8a068'], stars: true, hemi: ['#c0b8c8', '#1a1814', 0.48], sun: ['#d0d8ff', 0.3, [0.5, 1, 0.45]], haze: '#262a34' },
    hemi: ['#fff8ec', '#5a4a38', 0.62], sun: ['#fff0d8', 0.62, [0.5, 1, 0.45]],
    fog: { start: 0.88, floor: G - 10, depth: 12, haze: [16, 0.12, 12], hazeColor: '#ece0cc' },
    camY: -4, zoom: 1.35,
    particles: [
      { n: 110, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], mode: 'drift', speed: 0.2, wind: 0.1, area: [56, 52, 28], y0: G + 2, y1: G + 24, glow: false },
      { n: 30, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], mode: 'rise', speed: 0.7, area: [83, 29, 1.6], y0: G + 34, y1: G + 52, glow: false },
      { n: 24, colors: ['#ffb060', '#ffe0a0'], mode: 'rise', speed: 0.6, area: [82, 43, 2.8], y0: G + 2, y1: G + 12 },
    ],
    blocks: Object.assign({}, KP, {
      tile: { c: '#a86a48', top: '#c8845a', v: 0.04, pat: 'check', alt: '#b87650' }, floorB: { c: '#8a6a44', top: '#b08a5a', v: 0.06, pat: 'plank' },
      clay: { c: '#c86a3a', v: 0.06, pat: 'brick' }, clayDk: { c: '#8a4a2a', v: 0.05, pat: 'brick' }, fire: { c: '#ff8a3a', glow: true }, ember: { c: '#ffc860', glow: true }, ash: { c: '#3a3434', v: 0.04 },
      loaf: { c: '#c88a40', v: 0.05 }, crust: { c: '#a0602a', v: 0.05 }, bun: { c: '#e8b060', v: 0.05 }, dough: { c: '#f4e8c8', v: 0.03 }, flour: { c: '#f8f4ec', v: 0.03 },
      sack: { c: '#e0d4b0', v: 0.05 }, sack2: { c: '#d0c4a0', v: 0.05 }, cloth: { c: '#f4f0e8', v: 0.02 }, clothR: { c: '#c03a3a', v: 0.02 }, check: { c: '#c03a3a', v: 0.02, pat: 'check', alt: '#f4f0e8' },
      jar: { c: '#d8c8a8', v: 0.03 }, honey: { c: '#e8a830', v: 0.03 }, bell: { c: '#e0b84a', v: 0.03 }, bed: { c: '#f0e8dc', v: 0.02 }, quilt: { c: '#5a8ac0', v: 0.03, pat: 'check', alt: '#e8d8a0' },
      glassW: { c: '#cfe4f4', v: 0.02 }, pot: { c: '#b06a48', v: 0.04 }, basket: { c: '#c8a060', v: 0.05, pat: 'log' }, frameDk: { c: '#46301e', v: 0.04 }, mullion: { c: '#ece4d0', v: 0.02 },
      st1: { c: '#a8a49c', v: 0.05 }, st2: { c: '#96928a', v: 0.05 }, st3: { c: '#b4b0a6', v: 0.05 }, mortar: { c: '#c4beb2', v: 0.04 }, brass: { c: '#e0b850', v: 0.02 }, logEnd: { c: '#c8a070', v: 0.04 }, rug: { c: '#a84a3a', top: '#b85a44', v: 0.04 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => { const row = Math.floor(z / 3), off = (row & 1) * 2; return (z % 3 === 2 || (x + off) % 4 === 3) ? B.cobble2 : B.cobble; }, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 20, X1 = 92, Z0 = 24, Z1 = 88, TOP = G + 28, FY = G + 14;
      const CX = 44;                                                                 // 계산대 줄(가게 | 반죽방)
      const STONES = [B.st1, B.st2, B.st3, B.st1];
      const stone = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3;
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 4) | 0];
      };
      const sack = (x, y, z) => {
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = (dx !== 1 && dz !== 1);
          if (!corner) w.set(x + dx, y, z + dz, B.sack);
          w.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? B.sack : B.sack2);
          if (!corner) w.set(x + dx, y + 2, z + dz, B.sack);
        }
        w.set(x + 1, y + 3, z + 1, B.rope);
      };
      // 빵 하나(2×2 윗면, 노릇한 껍질) / 바게트(가로 4칸)
      const bread = (T, x, y, z, k) => {
        if (k % 3 === 0) { T.set(x, y, z, B.loaf); T.set(x + 1, y, z, B.crust); T.set(x, y, z + 1, B.crust); T.set(x + 1, y, z + 1, B.loaf); }
        else if (k % 3 === 1) { T.set(x, y, z, B.bun); T.set(x + 1, y, z, B.bun); }
        else { T.set(x, y, z, B.crust); }
      };
      // ── 바닥: 가게는 붉은 타일, 안쪽은 널마루 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, x <= CX ? B.tile : B.floorB);
      // ── 벽: 낱돌 밑단, 노란 회벽과 목골(기둥·띠), 북·서 높게(창), 남·동 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const low = z === Z1 || x === X1, top = low ? G + 6 : TOP, u = x === X0 || x === X1 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = y <= G + 3 ? stone(u, y, 2) : (u % 8 === 0 || y === G + 4 || y === FY || y === FY + 1 || y === top) ? B.frame : B.plasterY;
          if (!low && u % 16 >= 6 && u % 16 <= 10) {
            const inWin = (y >= G + 7 && y <= G + 11) || (y >= FY + 4 && y <= FY + 10);
            if (inWin) b = ((y === G + 9 || y === FY + 7 || u % 16 === 8) ? B.mullion : B.glassW);
            if (y === G + 6 || y === FY + 3) b = B.found;
          }
          if (!low && (u % 16 === 5 || u % 16 === 11) && ((y >= G + 6 && y <= G + 12) || (y >= FY + 3 && y <= FY + 11))) b = B.frameDk;
          w.set(x, y, z, b);
        }
      }
      // 창턱 꽃(북쪽 1층 창 안쪽)
      for (let x = X0 + 1; x < X1; x++) if (x % 16 >= 6 && x % 16 <= 10 && x < 68) { w.set(x, G + 6, Z0 + 1, B.found); w.set(x, G + 7, Z0 + 1, x % 2 ? B.flowerR : B.leaf); }

      // ── 서쪽 문(밖으로): 두 짝 문(폭 4·높이 9), 문틀과 상인방, 문 위 등 ──
      const DZ0 = 54, DZ1 = 57;
      for (let z = DZ0 - 2; z <= DZ1 + 2; z++) for (let y = G + 1; y <= G + 12; y++) {
        const leaf = z >= DZ0 && z <= DZ1 && y <= G + 9;
        w.set(X0, y, z, leaf ? ((y === G + 9 || y === G + 5 || z === DZ0 || z === DZ1) ? B.frameDk : B.door) : (y >= G + 10 ? B.frameDk : B.frame));
      }
      w.set(X0 + 1, G + 5, DZ0 + 1, B.iron); w.set(X0 + 1, G + 5, DZ1 - 1, B.iron);
      for (const z of [DZ0 - 3, DZ1 + 3]) { w.set(X0 + 1, G + 11, z, B.iron); w.box(X0 + 1, G + 9, z, X0 + 1, G + 10, z, B.lampG); }
      for (let z = DZ0 - 2; z <= DZ1 + 2; z++) for (let x = X0 + 1; x <= X0 + 4; x++) w.set(x, G, z, B.cobble2);
      lights.push({ name: 'door', p: [X0 + 2.5, G + 10, 55.5], c: '#ffd890', i: 0.5, d: 20, flicker: 0.1, srcR: 6 });
      acts.push(OR.goAct({ at: [X0 + 2, G + 1, DZ0 + 2], name: '밖으로 나가기', goto: 'elmrow', hint: '문을 열고 차양 아래 진열대와 돌 화덕이 있는 빵집 마당으로 나가요', hit: [X0, G + 1, DZ0, X0 + 2, G + 9, DZ1], h: 10 }));

      // ── 가게: 북쪽 벽 층층 빵 선반(다락 밖, 하늘이 트인 쪽), 서쪽 벽 바구니 선반, 가운데 진열 탁자, 계산대 ──
      const SX0 = X0 + 2, SX1 = CX - 3;
      // 층층 선반: 아래 장(깊이 4, 높이 4), 그 위로 깊이 3·2·1칸 판 — 앞(남쪽)에서 보면 계단처럼 물러난다
      const tiers = [[G + 4, Z0 + 4], [G + 8, Z0 + 3], [G + 12, Z0 + 2], [G + 16, Z0 + 1]];
      for (let x = SX0; x <= SX1; x++) {
        for (let z = Z0 + 1; z <= Z0 + 4; z++) for (let y = G + 1; y <= G + 3; y++) w.set(x, y, z, z === Z0 + 4 ? ((x - SX0) % 6 === 0 || y === G + 1 ? B.frameDk : B.plank) : B.wood);
        for (const [y, zf] of tiers) { for (let z = Z0 + 1; z <= zf; z++) w.set(x, y, z, B.plank); }
        for (let y = G + 4; y <= G + 16; y++) w.set(x, y, Z0 + 1, (x - SX0) % 6 === 0 ? B.frameDk : B.wood);
      }
      for (const x of [SX0 - 1, SX1 + 1]) for (let y = G + 1; y <= G + 17; y++) for (let z = Z0 + 1; z <= Z0 + 4; z++) if (y <= G + 4 || z <= Z0 + 1 + Math.max(0, 3 - Math.floor((y - G - 4) / 4))) w.set(x, y, z, B.frameDk);
      w.box(SX0 - 1, G + 18, Z0 + 1, SX1 + 1, G + 18, Z0 + 2, B.frameDk);
      // 선반 위 빵(고정) — 칸칸이 바구니와 빵
      const shelfSpots = [];
      tiers.forEach(([y, zf], ti) => {
        for (let x = SX0; x + 1 <= SX1; x += 3) {
          const k = (x * 7 + ti * 3) % 5;
          if (k < 2) bread(w, x, y + 1, zf - (ti === 3 ? 0 : 1), x + ti);
          else shelfSpots.push([x, y + 1, zf - (ti === 3 ? 0 : 1), x + ti]);
        }
      });
      for (let x = SX0 + 1; x <= SX1; x += 6) { w.box(x, G + 17, Z0 + 1, x + 1, G + 17, Z0 + 1, B.basket); }
      // 서쪽 벽 바구니 선반(문 양옆)
      for (const z0 of [Z0 + 9, DZ1 + 6]) for (let z = z0; z <= z0 + 12 && z < Z1 - 1; z++) {
        if (z >= DZ0 - 3 && z <= DZ1 + 3) continue;
        for (const y of [G + 3, G + 7, G + 11]) { w.set(X0 + 1, y, z, B.plank); w.set(X0 + 2, y, z, B.plank); }
        for (let y = G + 1; y <= G + 11; y++) if (z === z0 || z === z0 + 12) w.set(X0 + 2, y, z, B.frameDk);
        if (z !== z0 && z !== z0 + 12) { w.set(X0 + 1, G + 4, z, z % 2 ? B.bun : B.loaf); w.set(X0 + 2, G + 8, z, z % 3 ? B.crust : B.bun); if (z % 4 === 0) w.box(X0 + 1, G + 12, z, X0 + 2, G + 12, z, B.basket); }
      }
      // 진열 탁자(체크 천)와 바구니
      const TX = 28, TZ = 38;
      for (const [dx, dz] of [[0, 0], [9, 0], [0, 6], [9, 6]]) w.box(TX + dx, G + 1, TZ + dz, TX + dx, G + 3, TZ + dz, B.wood);
      w.box(TX - 1, G + 4, TZ - 1, TX + 10, G + 4, TZ + 7, B.check);
      for (const [x, z, k] of [[TX + 1, TZ + 1, 0], [TX + 5, TZ + 2, 2], [TX + 7, TZ + 5, 0], [TX + 2, TZ + 5, 1]]) bread(w, x, G + 5, z, k);
      w.box(TX + 4, G + 5, TZ + 4, TX + 5, G + 6, TZ + 4, B.honey);
      // 진열대 채우기(부품): 선반 빈칸과 탁자에 빵이 나타난다
      const fillP = w.prop({ name: 'shelfbread', pivot: [32.5, G + 10, 32.5], scl0: [0.001, 0.001, 0.001] });
      const fill = { set: (x, y, z, b) => { if (!w.get(x, y, z)) fillP.set(x, y, z, b); } };
      for (const [x, y, z, k] of shelfSpots) bread(fill, x, y, z, k);
      for (const [x, z, k] of [[TX + 4, TZ + 0, 1], [TX + 8, TZ + 1, 2], [TX + 1, TZ + 3, 1], [TX + 6, TZ + 6, 0], [TX + 9, TZ + 3, 2]]) if (!w.get(x, G + 5, z)) bread(fill, x, G + 5, z, k);
      for (let z = 70; z <= 80; z += 3) bread(fill, CX, G + 7, z, z);
      acts.push({
        name: '진열대 채우기', hint: '갓 구운 둥근 빵과 바게트가 진열대와 체크 천 탁자를 가득 채워요', hit: [TX - 1, G + 1, TZ - 1, TX + 10, G + 6, TZ + 7],
        run: async a => {
          a.burst([TX + 4.5, G + 7, TZ + 3.5], { n: 22, colors: ['#e8b060', '#c88a40', '#fff4d0'], speed: 3.2, up: 4, life: 1.2, gravity: 2, spread: 3.2 });
          await a.tween('shelfbread', { scl: [1, 1, 1] }, 1.2);
          a.burst([32.5, G + 14, Z0 + 5.5], { n: 16, colors: ['#fff4d0', '#ffe08a'], speed: 2, up: 3.2, life: 1.6, gravity: -0.6, spread: 6 });
          await a.wait(2.4);
          await a.tween('shelfbread', { scl: [0.001, 0.001, 0.001] }, 0.8);
        },
      });
      // 계산대: 남북으로 길게(두께 2), 남쪽 끝에 드나드는 틈(z60~65)
      for (let z = Z0 + 10; z <= Z1 - 6; z++) {
        if (z >= 60 && z <= 65) continue;
        for (const x of [CX, CX + 1]) { w.box(x, G + 1, z, x, G + 5, z, (x === CX && (z % 4 === 0 || z === 60 - 1 || z === 66)) ? B.frameDk : B.plank); w.set(x, G + 6, z, B.floorB); }
      }
      w.box(CX - 1, G + 6, Z0 + 10, CX - 1, G + 6, Z1 - 6, B.frame);
      w.box(CX, G + 7, 42, CX + 1, G + 8, 43, B.crate); w.box(CX, G + 7, 50, CX, G + 8, 50, B.jar); w.box(CX + 1, G + 7, 52, CX + 1, G + 8, 52, B.honey);
      const cbell = w.prop({ name: 'cbell', pivot: [CX + 0.5, G + 7, 47], axis: 'y' });
      cbell.box(CX, G + 7, 46, CX + 1, G + 7, 47, B.brass); cbell.box(CX, G + 8, 46, CX + 1, G + 9, 47, B.bell); cbell.set(CX, G + 10, 46, B.iron);
      acts.push({
        name: '계산대 종', hint: '계산대 위 놋쇠 종을 두드리면 딸랑 소리와 함께 빵집 주인을 불러요', hit: [CX - 3, G + 1, 43, CX + 1, G + 10, 51],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([CX + 1, G + 10, 47], { n: 12, colors: ['#ffe9a0', '#ffffff', '#e0b84a'], speed: 6, up: 2, life: 0.8, gravity: 1, spread: 0.8, flat: true }); await a.spin('cbell', 6, 0.5); }
          a.burst([CX + 1, G + 13, 47], { n: 10, colors: ['#ffffff', '#fff4d0'], speed: 2, up: 4, life: 1.4, gravity: -0.6, spread: 2 });
        },
      });
      w.box(CX, G + 7, 58, CX, G + 8, 58, B.lampG); w.box(X0 + 1, G + 13, 40, X0 + 1, G + 14, 40, B.lampG); w.box(X0 + 1, G + 13, 70, X0 + 1, G + 14, 70, B.lampG);
      lights.push({ name: 'shop', p: [CX + 0.5, G + 9, 58.5], c: '#ffe6b0', i: 0.6, d: 36, flicker: 0.06 });

      // ── 반죽방: 큰 작업대와 반죽(부품), 반죽 통, 밀가루 자루 더미, 선반 ──
      const KX0 = 52, KX1 = 63, KZ0 = 50, KZ1 = 57;
      for (const [x, z] of [[KX0, KZ0], [KX1, KZ0], [KX0, KZ1], [KX1, KZ1]]) w.box(x, G + 1, z, x, G + 3, z, B.wood);
      w.box(KX0 + 1, G + 1, KZ0, KX1 - 1, G + 1, KZ0, B.wood); w.box(KX0 + 1, G + 1, KZ1, KX1 - 1, G + 1, KZ1, B.wood);
      w.box(KX0, G + 4, KZ0, KX1, G + 4, KZ1, B.plank); for (let x = KX0; x <= KX1; x++) for (let z = KZ0; z <= KZ1; z++) if (hash3(x, 5, z) > 0.62) w.set(x, G + 4, z, B.flour);
      w.box(KX1 - 1, G + 5, KZ0, KX1, G + 6, KZ0 + 1, B.jar); w.box(KX0, G + 5, KZ1, KX0 + 3, G + 5, KZ1, B.wood);
      const dough = w.prop({ name: 'dough', pivot: [58, G + 5, 53.5] });
      dough.box(56, G + 5, 52, 60, G + 5, 55, B.dough); dough.box(57, G + 6, 52, 59, G + 6, 54, B.dough); dough.set(58, G + 7, 53, B.dough);
      acts.push({
        name: '반죽 치대기', hint: '작업대 위 반죽이 들렸다 쿵 내려앉으며 쭉쭉 늘어나고 밀가루가 폴폴 날려요', hit: [KX0, G + 1, KZ0, KX1, G + 8, KZ1],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.move('dough', [0, 4, 0], 0.3);
            await Promise.all([a.move('dough', [0, 0, 0], 0.18), a.tween('dough', { scl: [1.5, 0.6, 1.3] }, 0.18)]);
            a.burst([58, G + 6, 53.5], { n: 14, colors: ['#ffffff', '#f8f4ec', '#f4e8c8'], speed: 4, up: 2.4, life: 1, gravity: 1.2, spread: 2.8 });
            await a.tween('dough', { scl: [1, 1, 1] }, 0.25);
          }
        },
      });
      // 반죽 통(나무 여물통, 쇠테)과 덮개 천
      w.box(50, G + 1, 66, 62, G + 5, 71, B.wood); w.box(51, G + 2, 67, 61, G + 5, 70, 0); w.box(51, G + 2, 67, 61, G + 4, 70, B.dough);
      for (const x of [53, 59]) { w.box(x, G + 1, 66, x, G + 5, 66, B.iron); w.box(x, G + 1, 71, x, G + 5, 71, B.iron); }
      w.box(51, G + 5, 67, 56, G + 5, 70, B.cloth); for (const x of [50, 62]) w.box(x, G + 6, 68, x, G + 6, 69, B.wood);
      // 밀가루 자루 더미(남동쪽)와 쏟아지는 자루(부품)
      for (const [x, z, y] of [[72, 72, 0], [75, 72, 0], [78, 72, 0], [72, 75, 0], [75, 75, 0], [78, 75, 0], [81, 73, 0], [73, 73, 3], [76, 73, 3], [74, 74, 6]]) sack(x, G + 1 + y, z);
      const fsack = w.prop({ name: 'flour', pivot: [69.5, G + 1, 75.5], axis: 'z' });
      for (let y = 0; y < 6; y++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { if (Math.abs(dx) + Math.abs(dz) === 2 && (y === 0 || y === 5)) continue; fsack.set(69 + dx, G + 1 + y, 75 + dz, (dx + dz + y) % 3 ? B.sack : B.sack2); }
      fsack.set(69, G + 7, 75, B.rope); fsack.set(69, G + 8, 75, B.sack2);
      acts.push({
        name: '밀가루 날리기', hint: '밀가루 자루가 툭 넘어지며 하얀 밀가루 구름이 반죽방 가득 피어올라요', hit: [66, G + 1, 70, 84, G + 9, 79],
        run: async a => {
          await a.turn('flour', [0, 0, 1.3], 0.5);
          for (let k = 0; k < 5; k++) { a.burst([64 + k * 1.2, G + 4 + k, 75.5], { n: 22, colors: ['#ffffff', '#f8f4ec', '#ece4d4'], speed: 4.4, up: 4, life: 2.2, gravity: 0.3, spread: 4 }); await a.wait(0.2); }
          await a.wait(1.2);
          await a.turn('flour', [0, 0, 0], 0.6);
        },
      });
      // 발효 바구니 시렁(동쪽 낮은 벽 안쪽)
      for (let z = 58; z <= 66; z++) for (const y of [G + 1, G + 5, G + 9]) { w.set(X1 - 2, y, z, B.wood); w.set(X1 - 1, y, z, B.wood); if (z % 2 === 0) w.set(X1 - 2, y + 1, z, (z + y) % 4 ? B.dough : B.basket); }
      for (const z of [57, 67]) w.box(X1 - 2, G + 1, z, X1 - 2, G + 11, z, B.frameDk);

      // ── 안쪽 화덕(북동쪽): 벽돌 둥근 지붕, 아궁이는 남쪽, 굴뚝 ──
      const OX = 82, OZ = 34;
      w.box(OX - 8, G + 1, OZ - 8, OX + 8, G + 4, OZ + 8, B.clayDk); w.box(OX - 8, G + 4, OZ - 8, OX + 8, G + 4, OZ + 8, B.found);
      w.ellipsoid(OX, G + 5, OZ, 7.6, 8.4, 7.6, B.clay, (dx, dy) => dy >= 0);
      w.ellipsoid(OX, G + 5, OZ, 5.6, 6.4, 5.6, 0, (dx, dy) => dy >= 0);
      w.box(OX - 2, G + 5, OZ + 4, OX + 2, G + 9, OZ + 8, 0);
      for (let x = OX - 4; x <= OX + 4; x++) for (let y = G + 5; y <= G + 12; y++) { const arch = Math.abs(x - OX) <= 2 && y <= G + 9; if (!arch && w.get(x, y, OZ + 7)) w.set(x, y, OZ + 7, (Math.abs(x - OX) >= 3 || y >= G + 10) ? B.clayDk : B.clay); }
      w.box(OX - 2, G + 5, OZ - 3, OX + 2, G + 5, OZ + 2, B.ember); w.box(OX - 1, G + 6, OZ - 2, OX + 1, G + 6, OZ, B.fire); w.set(OX - 2, G + 6, OZ - 2, B.fire); w.set(OX, G + 7, OZ - 1, B.fire);
      w.box(OX - 3, G + 5, OZ - 4, OX + 3, G + 5, OZ - 4, B.ash);
      w.box(OX, G + 13, OZ - 4, OX + 3, TOP + 6, OZ - 1, B.clayDk); w.box(OX - 1, TOP + 7, OZ - 5, OX + 4, TOP + 7, OZ, B.found);
      lights.push({ name: 'oven', p: [OX + 0.5, G + 7, OZ + 4.5], c: '#ff9a4a', i: 1.3, d: 36, flicker: 0.3, srcR: 6 });
      landmarks.push({ name: '안쪽 화덕', note: '하루 종일 꺼지지 않는 벽돌 화덕', p: [OX + 0.5, G + 28, OZ + 0.5] });
      // 장작더미(통나무 끝면)와 빵 삽 걸이
      for (let z = 46; z <= 54; z++) for (let y = G + 1; y <= G + 6; y++) for (let x = X1 - 5; x <= X1 - 1; x++) w.set(x, y, z, (z === 46 || z === 54) ? (((x + y) & 1) ? B.logEnd : B.bark) : B.wood);
      const peel = w.prop({ name: 'peel', pivot: [OX + 0.5, G + 6, OZ + 0.5] });
      peel.box(OX, G + 6, OZ + 9, OX, G + 6, OZ + 20, B.wood); peel.box(OX - 2, G + 6, OZ + 8, OX + 2, G + 6, OZ + 8, B.plank); peel.box(OX - 1, G + 6, OZ + 9, OX + 1, G + 6, OZ + 9, B.plank);
      for (const z of [OZ + 12, OZ + 18]) { w.box(OX, G + 1, z, OX, G + 5, z, B.wood); w.set(OX - 1, G + 5, z, B.wood); w.set(OX + 1, G + 5, z, B.wood); }
      const loaves = w.prop({ name: 'loaves', pivot: [OX + 0.5, G + 7, OZ + 3.5], scl0: [0.001, 0.001, 0.001] });
      bread(loaves, OX - 2, G + 7, OZ + 2, 0); bread(loaves, OX + 1, G + 7, OZ + 2, 0); loaves.set(OX, G + 7, OZ + 4, B.bun); loaves.set(OX - 1, G + 7, OZ + 4, B.crust);
      acts.push({
        name: '빵 삽으로 꺼내기', hint: '긴 빵 삽이 화덕 깊숙이 들어갔다가 노릇노릇 구운 빵을 꺼내 와요', hit: [OX - 4, G + 1, OZ + 8, OX + 4, G + 8, OZ + 20],
        run: async a => {
          await a.move('peel', [0, 1, -6], 0.9);
          a.flash('oven', 3, 1.4); a.burst([OX + 0.5, G + 8, OZ + 6], { n: 14, colors: ['#ffb060', '#ffe0a0'], speed: 3.2, up: 2.8, life: 0.7, gravity: -0.8, spread: 1.2 });
          await a.tween('loaves', { scl: [1, 1, 1] }, 0.1);
          await Promise.all([a.move('peel', [0, 0, 8], 1.4), a.move('loaves', [0, -1, 8], 1.4)]);
          a.burst([OX + 0.5, G + 10, OZ + 12], { n: 24, colors: ['#ffe8c0', '#ffffff', '#f0d8a0'], speed: 2, up: 6, life: 1.8, gravity: -0.8, spread: 2 });
          await a.wait(1.4);
          await a.tween('loaves', { scl: [0.001, 0.001, 0.001] }, 0.5);
          await Promise.all([a.move('peel', [0, 0, 0], 1), a.move('loaves', [0, 0, 0], 1)]);
        },
      });
      acts.push({
        name: '갓 구운 빵 냄새', hint: '화덕 문을 열자 따뜻한 빵 냄새가 김처럼 피어올라 가게 문까지 퍼져요', hit: [OX - 8, G + 5, OZ - 8, OX + 8, G + 14, OZ + 6],
        run: async a => {
          a.flash('oven', 2.6, 3.4); a.glow(1.3, 3.4);
          for (let k = 0; k < 10; k++) { const t = k / 9; a.burst([OX + 0.5 - t * (OX - X0 - 6), G + 10 + Math.sin(t * Math.PI) * 6, OZ + 8 + t * (DZ0 - OZ - 6)], { n: 10, colors: ['#fff4d8', '#ffe0b0', '#ffffff'], speed: 1.2, up: 2.4, life: 2.2, gravity: -0.7, spread: 2 }); await a.wait(0.22); }
          a.burst([OX + 2, TOP + 10, OZ - 2.5], { n: 16, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 1.2, up: 7, life: 2.4, gravity: -1.2, spread: 1.2 });
        },
      });

      // ── 2층 다락: 빵집 가족 방(북쪽 가운데, 계단 위) — 침대, 식탁, 궤짝, 화분, 난간 ──
      const LX0 = 48, LX1 = 72, LZ1 = 40;
      for (let z = Z0 + 1; z <= LZ1; z++) for (let x = LX0; x <= LX1; x++) w.set(x, FY, z, (z === LZ1 || x === LX0) ? B.frame : B.floorB);
      for (let z = Z0 + 1; z <= LZ1; z += 1) for (let x = LX0; x <= LX1; x++) if ((z === LZ1 || x === LX0) && (x % 4 === 0 || z % 4 === 0)) w.set(x, FY - 1, z, B.frameDk);
      for (const [x, z] of [[LX0, LZ1], [LX1, LZ1], [60, LZ1], [LX0, 30]]) w.box(x, G + 1, z, x, FY - 1, z, B.frame);
      // 난간(남쪽·서쪽, 계단 입구 비움)
      for (let x = LX0; x <= LX1; x++) { if (x >= 66 && x <= 70) continue; w.set(x, FY + 4, LZ1, B.wood); if (x % 2 === 0) w.box(x, FY + 1, LZ1, x, FY + 3, LZ1, B.wood); }
      for (let z = Z0 + 1; z <= LZ1; z++) { w.set(LX0, FY + 4, z, B.wood); if (z % 2 === 0) w.box(LX0, FY + 1, z, LX0, FY + 3, z, B.wood); }
      // 계단: 반죽방 쪽 x66~70, z55(아래) → z42(위), 한 단 1칸, 바깥쪽 난간
      for (let i = 0; i < 14; i++) { const z = 55 - i; w.box(66, G + 1, z, 70, G + i, z, B.wood); w.box(66, G + 1 + i, z, 70, G + 1 + i, z, B.floorB); }
      w.box(66, FY, 41, 70, FY, 41, B.floorB);
      for (let i = 0; i < 14; i += 2) w.box(71, G + 2 + i, 55 - i, 71, G + 5 + i, 55 - i, B.wood);
      w.line(71, G + 6, 55, 71, FY + 4, 42, B.wood);
      // 가족 방 살림
      w.box(LX0 + 2, FY + 1, Z0 + 2, LX0 + 9, FY + 2, Z0 + 8, B.wood); w.box(LX0 + 2, FY + 3, Z0 + 2, LX0 + 9, FY + 3, Z0 + 8, B.bed); w.box(LX0 + 4, FY + 3, Z0 + 2, LX0 + 9, FY + 3, Z0 + 8, B.quilt);
      w.box(LX0 + 2, FY + 4, Z0 + 3, LX0 + 3, FY + 4, Z0 + 7, B.cloth); w.box(LX0 + 1, FY + 1, Z0 + 1, LX0 + 1, FY + 7, Z0 + 9, B.wood);
      w.box(LX0 + 2, FY + 1, Z0 + 11, LX0 + 5, FY + 4, Z0 + 14, B.crate); w.box(LX0 + 2, FY + 5, Z0 + 11, LX0 + 5, FY + 5, Z0 + 14, B.frameDk);
      const FTX = 60, FTZ = 31;
      for (const [dx, dz] of [[0, 0], [5, 0], [0, 4], [5, 4]]) w.box(FTX + dx, FY + 1, FTZ + dz, FTX + dx, FY + 3, FTZ + dz, B.wood);
      w.box(FTX - 1, FY + 4, FTZ - 1, FTX + 6, FY + 4, FTZ + 5, B.check); bread(w, FTX + 1, FY + 5, FTZ + 1, 0); w.box(FTX + 4, FY + 5, FTZ + 3, FTX + 4, FY + 6, FTZ + 3, B.pot);
      for (const [x, z] of [[FTX - 3, FTZ + 1], [FTX + 8, FTZ + 2]]) { w.box(x, FY + 1, z, x + 1, FY + 2, z + 1, B.wood); w.box(x, FY + 3, z, x + 1, FY + 3, z + 1, B.plank); }
      w.box(70, FY + 1, Z0 + 1, 71, FY + 2, Z0 + 2, B.pot); w.box(70, FY + 3, Z0 + 1, 71, FY + 4, Z0 + 2, B.leaf); w.set(70, FY + 5, Z0 + 1, B.flowerY); w.set(71, FY + 5, Z0 + 2, B.flowerY);
      for (let z = FTZ - 3; z <= FTZ + 7; z++) for (let x = FTX - 4; x <= FTX + 10; x++) if (!w.get(x, FY + 1, z) && x <= LX1 - 1) w.set(x, FY, z, (x === FTX - 4 || x === FTX + 10 || z === FTZ - 3 || z === FTZ + 7) ? B.clothR : B.rug);
      w.box(LX1 - 4, FY + 8, Z0 + 1, LX1 - 3, FY + 9, Z0 + 1, B.lampG);
      lights.push({ name: 'room', p: [62.5, FY + 9, 31.5], c: '#ffe0a8', i: 0.6, d: 28, flicker: 0.1, srcR: 10 });
      landmarks.push({ name: '빵집 가족 방', note: '계단 위 2층', p: [60.5, FY + 20, 32.5] });
      return { lights, landmarks, acts };
    },
  }));
})();
