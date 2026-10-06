// 빵집(하위 지도) — 주택가 동쪽 마당의 노란 벽 이층 빵집 안. 서쪽 문으로 들어서면 빵 진열대와 계산대(종), 안쪽 반죽방(반죽 통·밀가루 자루·큰 작업대),
// 북동쪽 벽돌 화덕과 빵 삽, 계단 위 북서쪽 2층 빵집 가족 방. 남·동쪽(카메라 쪽) 벽은 낮게 잘랐다 (56칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 56, D = 56, Hh = 48, G = 10;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'elmrow-bakery', cat: 'kingdom', sub: true, parent: 'elmrow', name: '빵집', en: 'Elm Row · Bakery', color: '#f2d27a', seed: 2132, base: G, size: [W, D, Hh],
    desc: '느릅나무 주택가 동쪽 마당의 노란 벽 이층 빵집. 문을 열면 진열대 가득 갓 구운 빵 냄새가 나고, 계산대 너머 반죽방에서는 새벽마다 반죽을 치댄다. 안쪽 벽돌 화덕은 하루 종일 꺼지지 않고, 계단 위 2층은 빵집 가족이 사는 방이다.',
    info: { title: '장소 정보', en: 'BAKERY', rows: [['가게', '빵 진열대 · 계산대 종'], ['반죽방', '반죽 통 · 밀가루 자루 · 큰 작업대'], ['화덕', '벽돌 둥근 화덕 · 빵 삽'], ['2층', '빵집 가족 방']] },
    night: { sky: ['#283048', '#0a0c18', '#d8a068'], stars: true, hemi: ['#c0b8c8', '#1a1814', 0.48], sun: ['#d0d8ff', 0.3, [0.5, 1, 0.45]], haze: '#262a34' },
    hemi: ['#fff8ec', '#5a4a38', 0.62], sun: ['#fff0d8', 0.62, [0.5, 1, 0.45]],
    fog: { start: 0.88, floor: G - 5, depth: 6, haze: [8, 0.12, 6], hazeColor: '#ece0cc' },
    camY: -2, zoom: 1.35,
    particles: [
      { n: 70, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], mode: 'drift', speed: 0.1, wind: 0.05, area: [28, 26, 14], y0: G + 1, y1: G + 12, glow: false },
      { n: 24, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], mode: 'rise', speed: 0.35, area: [41.5, 15.5, 0.8], y0: G + 12, y1: G + 26, glow: false },
      { n: 20, colors: ['#ffb060', '#ffe0a0'], mode: 'rise', speed: 0.3, area: [41, 22, 1.4], y0: G + 1, y1: G + 6 },
    ],
    blocks: Object.assign({}, KP, {
      tile: { c: '#a86a48', top: '#c8845a', v: 0.04, pat: 'check', alt: '#b87650' }, floorB: { c: '#8a6a44', top: '#b08a5a', v: 0.06, pat: 'plank' },
      clay: { c: '#c86a3a', v: 0.06, pat: 'brick' }, clayDk: { c: '#8a4a2a', v: 0.05, pat: 'brick' }, fire: { c: '#ff8a3a', glow: true }, ember: { c: '#ffc860', glow: true }, ash: { c: '#3a3434', v: 0.04 },
      loaf: { c: '#c88a40', v: 0.05 }, crust: { c: '#a0602a', v: 0.05 }, bun: { c: '#e8b060', v: 0.05 }, dough: { c: '#f4e8c8', v: 0.03 }, flour: { c: '#f8f4ec', v: 0.03 },
      sack: { c: '#e0d4b0', v: 0.05 }, cloth: { c: '#f4f0e8', v: 0.02 }, clothR: { c: '#c03a3a', v: 0.02 }, check: { c: '#c03a3a', v: 0.02, pat: 'check', alt: '#f4f0e8' },
      jar: { c: '#d8c8a8', v: 0.03 }, honey: { c: '#e8a830', v: 0.03 }, bell: { c: '#e0b84a', v: 0.03 }, bed: { c: '#f0e8dc', v: 0.02 }, quilt: { c: '#5a8ac0', v: 0.03, pat: 'check', alt: '#e8d8a0' },
      glassW: { c: '#cfe4f4', v: 0.02 }, pot: { c: '#b06a48', v: 0.04 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => (x + z) % 4 === 0 ? B.cobble2 : B.cobble, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 10, X1 = 46, Z0 = 12, Z1 = 44, TOP = G + 14, FY = G + 7;
      const CX = 22;                                                                // 계산대 줄(가게 | 반죽방)
      // ── 바닥: 가게는 붉은 타일, 안쪽은 널마루 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, x <= CX ? B.tile : B.floorB);
      // ── 벽: 노란 회벽과 목골(기둥·띠), 북·서 높게, 남·동 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (x !== X0 && x !== X1 && z !== Z0 && z !== Z1) continue;
        const low = z === Z1 || x === X1, top = low ? G + 3 : TOP, u = x === X0 || x === X1 ? z : x;
        for (let y = G + 1; y <= top; y++) {
          let b = (u % 4 === 0 || y === G + 1 || y === FY || y === top) ? B.frame : B.plasterY;
          if (!low && u % 8 === 2 && ((y >= G + 3 && y <= G + 5) || (y >= FY + 2 && y <= FY + 4))) b = B.glassW;
          if (!low && u % 8 === 2 && (y === G + 2 || y === FY + 1)) b = B.found;
          w.set(x, y, z, b);
        }
      }
      // 창턱 꽃(북쪽 창)
      for (let x = X0 + 2; x < X1; x += 8) { w.set(x, G + 2, Z0 + 1, B.found); w.set(x, G + 3, Z0 + 1, B.flowerR); }

      // ── 서쪽 문(밖으로): 두 칸 문짝, 문 위 차양 띠 ──
      const DZ0 = 27, DZ1 = 28;
      for (let z = DZ0 - 1; z <= DZ1 + 1; z++) for (let y = G + 1; y <= G + 6; y++) {
        const leaf = z >= DZ0 && z <= DZ1 && y <= G + 4;
        w.set(X0, y, z, leaf ? B.door : B.frame);
      }
      w.set(X0, G + 3, DZ1, B.iron); w.set(X0, G + 6, DZ0, B.lampG); w.set(X0, G + 6, DZ1, B.lampG);
      for (let z = DZ0 - 1; z <= DZ1 + 1; z++) w.set(X0 + 1, G, z, B.cobble2);
      lights.push({ name: 'door', p: [X0 + 1.5, G + 5, 28], c: '#ffd890', i: 0.5, d: 10, flicker: 0.1 });
      acts.push(OR.goAct({ at: [X0 + 1, G + 1, DZ0], name: '밖으로 나가기', goto: 'elmrow', hint: '문을 열고 차양 아래 진열대와 돌 화덕이 있는 빵집 마당으로 나가요', hit: [X0, G + 1, DZ0, X0 + 1, G + 4, DZ1], h: 6 }));

      // ── 가게: 북쪽 벽 빵 선반, 서쪽 벽 바구니 선반, 가운데 진열 탁자, 계산대 ──
      const shelfLo = [];
      for (let x = X0 + 1; x <= CX - 1; x++) for (let y = G + 1; y <= G + 5; y++) {
        w.set(x, y, Z0 + 1, y % 2 ? B.wood : 0);
        if (y % 2 === 0) { w.set(x, y, Z0 + 1, (x + y) % 3 ? B.loaf : B.crust); }
      }
      for (let x = X0 + 1; x <= CX - 1; x++) for (const y of [G + 1, G + 3, G + 5]) w.set(x, y, Z0 + 2, B.wood);
      for (let x = X0 + 1; x <= CX - 1; x += 1) if (x % 2) shelfLo.push([x, G + 4, Z0 + 2]);
      for (const z0 of [Z0 + 4, DZ1 + 3]) for (let z = z0; z <= z0 + 6 && z < Z1; z++) {
        if (z >= DZ0 - 1 && z <= DZ1 + 1) continue;
        for (const y of [G + 1, G + 3]) w.set(X0 + 1, y, z, B.wood);
        w.set(X0 + 1, G + 2, z, z % 2 ? B.bun : B.loaf); w.set(X0 + 1, G + 4, z, z % 3 ? B.crust : B.bun);
      }
      // 진열 탁자(체크 천)와 바구니
      w.box(14, G + 1, 20, 14, G + 1, 23, B.wood); w.box(18, G + 1, 20, 18, G + 1, 23, B.wood); w.box(14, G + 2, 20, 18, G + 2, 23, B.check);
      for (const [x, z] of [[15, 21], [17, 22], [16, 20]]) { w.set(x, G + 3, z, B.loaf); }
      w.set(15, G + 3, 23, B.bun); w.set(17, G + 3, 20, B.honey);
      // 진열대 채우기(부품): 선반 빈칸과 탁자에 빵이 나타난다
      const fill = w.prop({ name: 'shelfbread', pivot: [16.5, G + 3, 18.5], scl0: [0.001, 0.001, 0.001] });
      for (const [x, y, z] of shelfLo) fill.set(x, y, z, B.bun);
      for (const [x, z] of [[14, 20], [16, 22], [18, 21], [15, 22], [17, 21]]) fill.set(x, G + 3, z, (x + z) % 2 ? B.bun : B.crust);
      for (let z = 35; z <= 40; z++) fill.set(CX, G + 4, z, z % 2 ? B.loaf : B.bun);
      acts.push({
        name: '진열대 채우기', hint: '갓 구운 둥근 빵과 바게트가 진열대와 체크 천 탁자를 가득 채워요', hit: [13, G + 1, 19, 19, G + 3, 24],
        run: async a => {
          a.burst([16.5, G + 4, 21.5], { n: 22, colors: ['#e8b060', '#c88a40', '#fff4d0'], speed: 1.6, up: 2, life: 1.2, gravity: 1, spread: 1.6 });
          await a.tween('shelfbread', { scl: [1, 1, 1] }, 1.2);
          a.burst([16.5, G + 6, Z0 + 2.5], { n: 16, colors: ['#fff4d0', '#ffe08a'], speed: 1, up: 1.6, life: 1.6, gravity: -0.3, spread: 3 });
          await a.wait(2.4);
          await a.tween('shelfbread', { scl: [0.001, 0.001, 0.001] }, 0.8);
        },
      });
      // 계산대: 남북으로 길게, 남쪽 끝에 드나드는 틈(z30~32)
      for (let z = Z0 + 5; z <= Z1 - 3; z++) {
        if (z >= 30 && z <= 32) continue;
        w.set(CX, G + 1, z, B.wood); w.set(CX, G + 2, z, z % 3 ? B.plank : B.wood); w.set(CX, G + 3, z, B.floorB);
      }
      w.set(CX, G + 4, 21, B.crate); w.set(CX, G + 4, 25, B.jar); w.set(CX, G + 4, 26, B.honey); w.set(CX, G + 4, 34, B.loaf);
      const cbell = w.prop({ name: 'cbell', pivot: [CX + 0.5, G + 4, 23.5], axis: 'y' });
      cbell.set(CX, G + 4, 23, B.bell); cbell.set(CX, G + 5, 23, B.iron);
      acts.push({
        name: '계산대 종', hint: '계산대 위 놋쇠 종을 두드리면 딸랑 소리와 함께 빵집 주인을 불러요', hit: [CX - 2, G + 1, 21, CX, G + 5, 25],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.burst([CX + 0.5, G + 5.5, 23.5], { n: 12, colors: ['#ffe9a0', '#ffffff', '#e0b84a'], speed: 3, up: 1, life: 0.8, gravity: 0.5, spread: 0.4, flat: true }); await a.spin('cbell', 6, 0.5); }
          a.burst([CX + 0.5, G + 7, 23.5], { n: 10, colors: ['#ffffff', '#fff4d0'], speed: 1, up: 2, life: 1.4, gravity: -0.3, spread: 1 });
        },
      });
      w.set(CX, G + 4, 29, B.lampG); w.set(X0 + 1, G + 6, 20, B.lampG); w.set(X0 + 1, G + 6, 35, B.lampG);
      lights.push({ name: 'shop', p: [CX + 0.5, G + 5, 29.5], c: '#ffe6b0', i: 0.6, d: 18, flicker: 0.06 });

      // ── 반죽방: 큰 작업대와 반죽(부품), 반죽 통, 밀가루 자루 더미, 선반 ──
      const TX0 = 27, TX1 = 33, TZ0 = 25, TZ1 = 28;
      for (const [x, z] of [[TX0, TZ0], [TX1, TZ0], [TX0, TZ1], [TX1, TZ1]]) w.set(x, G + 1, z, B.wood);
      w.box(TX0, G + 2, TZ0, TX1, G + 2, TZ1, B.plank); for (let x = TX0; x <= TX1; x++) for (let z = TZ0; z <= TZ1; z++) if (hash3(x, 5, z) > 0.6) w.set(x, G + 2, z, B.flour);
      w.set(TX1, G + 3, TZ0, B.jar); w.set(TX0, G + 3, TZ1, B.wood);
      const dough = w.prop({ name: 'dough', pivot: [30.5, G + 3, 26.5] });
      dough.box(29, G + 3, 26, 31, G + 3, 27, B.dough); dough.set(30, G + 4, 26, B.dough);
      acts.push({
        name: '반죽 치대기', hint: '작업대 위 반죽이 들렸다 쿵 내려앉으며 쭉쭉 늘어나고 밀가루가 폴폴 날려요', hit: [TX0, G + 1, TZ0, TX1, G + 4, TZ1],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.move('dough', [0, 2, 0], 0.3);
            await Promise.all([a.move('dough', [0, 0, 0], 0.18), a.tween('dough', { scl: [1.5, 0.6, 1.3] }, 0.18)]);
            a.burst([30.5, G + 3.5, 26.5], { n: 14, colors: ['#ffffff', '#f8f4ec', '#f4e8c8'], speed: 2, up: 1.2, life: 1, gravity: 0.6, spread: 1.4 });
            await a.tween('dough', { scl: [1, 1, 1] }, 0.25);
          }
        },
      });
      // 반죽 통(나무 여물통)과 덮개 천
      w.box(25, G + 1, 33, 31, G + 2, 35, B.wood); w.box(26, G + 2, 34, 30, G + 2, 34, B.dough); w.box(26, G + 3, 33, 28, G + 3, 35, B.cloth);
      // 밀가루 자루 더미(남동쪽)와 쏟아지는 자루(부품)
      for (let k = 0; k < 10; k++) { const x = 36 + (k % 4), z = 36 + (k / 4 | 0), h = 1 + ((k * 7) % 3 === 0 ? 1 : 0); w.box(x, G + 1, z, x, G + h, z, B.sack); }
      const sack = w.prop({ name: 'flour', pivot: [34.5, G + 1, 37.5], axis: 'z' });
      sack.box(34, G + 1, 37, 34, G + 3, 37, B.sack); sack.set(34, G + 4, 37, B.rope);
      acts.push({
        name: '밀가루 날리기', hint: '밀가루 자루가 툭 넘어지며 하얀 밀가루 구름이 반죽방 가득 피어올라요', hit: [33, G + 1, 35, 40, G + 4, 39],
        run: async a => {
          await a.turn('flour', [0, 0, 1.3], 0.5);
          for (let k = 0; k < 5; k++) { a.burst([32 + k * 0.6, G + 2 + k * 0.5, 37.5], { n: 22, colors: ['#ffffff', '#f8f4ec', '#ece4d4'], speed: 2.2, up: 2, life: 2.2, gravity: 0.15, spread: 2 }); await a.wait(0.2); }
          await a.wait(1.2);
          await a.turn('flour', [0, 0, 0], 0.6);
        },
      });
      // 반죽방 선반(북쪽 벽): 단지와 꿀, 빵틀
      for (let x = 24; x <= 34; x++) { for (const y of [G + 4, G + 6]) w.set(x, y, Z0 + 1, B.wood); w.set(x, G + 5, Z0 + 1, x % 3 ? B.jar : B.honey); w.set(x, G + 7 - 0, Z0 + 1, x % 2 ? B.pot : 0); }
      // 발효 바구니 시렁
      for (let z = 30; z <= 33; z++) for (const y of [G + 1, G + 3, G + 5]) { w.set(X1 - 1, y, z, B.wood); w.set(X1 - 1, y + 1, z, (z + y) % 2 ? B.dough : B.bun); }

      // ── 안쪽 화덕(북동쪽): 벽돌 둥근 지붕, 아궁이는 남쪽, 굴뚝 ──
      const OX = 41, OZ = 17;
      w.box(OX - 4, G + 1, OZ - 4, OX + 4, G + 2, OZ + 4, B.found);
      w.ellipsoid(OX, G + 3, OZ, 4, 4.4, 4, B.clay, (dx, dy) => dy >= 0);
      w.ellipsoid(OX, G + 3, OZ, 2.8, 3.2, 2.8, 0, (dx, dy) => dy >= 0);
      w.box(OX - 1, G + 3, OZ + 2, OX + 1, G + 5, OZ + 4, 0);
      w.box(OX - 2, G + 6, OZ + 4, OX + 2, G + 6, OZ + 4, B.clayDk); w.box(OX - 2, G + 3, OZ + 4, OX - 2, G + 5, OZ + 4, B.clayDk); w.box(OX + 2, G + 3, OZ + 4, OX + 2, G + 5, OZ + 4, B.clayDk);
      w.box(OX - 1, G + 3, OZ - 1, OX + 1, G + 3, OZ + 1, B.ember); w.set(OX, G + 3, OZ, B.fire); w.set(OX - 1, G + 4, OZ - 1, B.fire);
      w.box(OX, G + 7, OZ - 2, OX + 1, TOP + 3, OZ - 1, B.clayDk); w.box(OX - 1, TOP + 4, OZ - 3, OX + 2, TOP + 4, OZ, B.found);
      lights.push({ name: 'oven', p: [OX + 0.5, G + 4, OZ + 2.5], c: '#ff9a4a', i: 1.3, d: 18, flicker: 0.3, srcR: 3 });
      landmarks.push({ name: '안쪽 화덕', note: '하루 종일 꺼지지 않는 벽돌 화덕', p: [OX + 0.5, G + 14, OZ + 0.5] });
      // 장작더미와 빵 삽 걸이
      w.box(X1 - 2, G + 1, 24, X1 - 1, G + 3, 27, B.wood); for (let z = 24; z <= 27; z++) w.set(X1 - 1, G + 4, z, B.bark);
      const peel = w.prop({ name: 'peel', pivot: [OX + 0.5, G + 3, OZ + 0.5] });
      peel.box(OX, G + 3, OZ + 5, OX, G + 3, OZ + 10, B.wood); peel.box(OX - 1, G + 3, OZ + 4, OX + 1, G + 3, OZ + 4, B.plank);
      for (const z of [OZ + 6, OZ + 9]) w.box(OX, G + 1, z, OX, G + 2, z, B.wood);
      const loaves = w.prop({ name: 'loaves', pivot: [OX + 0.5, G + 4, OZ + 1.5], scl0: [0.001, 0.001, 0.001] });
      loaves.set(OX - 1, G + 4, OZ + 1, B.loaf); loaves.set(OX + 1, G + 4, OZ + 1, B.crust); loaves.set(OX, G + 4, OZ + 2, B.loaf); loaves.set(OX, G + 4, OZ + 1, B.bun);
      acts.push({
        name: '빵 삽으로 꺼내기', hint: '긴 빵 삽이 화덕 깊숙이 들어갔다가 노릇노릇 구운 빵을 꺼내 와요', hit: [OX - 2, G + 1, OZ + 4, OX + 2, G + 4, OZ + 10],
        run: async a => {
          await a.move('peel', [0, 1, -3], 0.9);
          a.flash('oven', 3, 1.4); a.burst([OX + 0.5, G + 4, OZ + 3], { n: 14, colors: ['#ffb060', '#ffe0a0'], speed: 1.6, up: 1.4, life: 0.7, gravity: -0.4, spread: 0.6 });
          await a.tween('loaves', { scl: [1, 1, 1] }, 0.1);
          await Promise.all([a.move('peel', [0, 0, 4], 1.4), a.move('loaves', [0, -1, 4], 1.4)]);
          a.burst([OX + 0.5, G + 5, OZ + 6], { n: 24, colors: ['#ffe8c0', '#ffffff', '#f0d8a0'], speed: 1, up: 3, life: 1.8, gravity: -0.4, spread: 1 });
          await a.wait(1.4);
          await a.tween('loaves', { scl: [0.001, 0.001, 0.001] }, 0.5);
          await Promise.all([a.move('peel', [0, 0, 0], 1), a.move('loaves', [0, 0, 0], 1)]);
        },
      });
      acts.push({
        name: '갓 구운 빵 냄새', hint: '화덕 문을 열자 따뜻한 빵 냄새가 김처럼 피어올라 가게 문까지 퍼져요', hit: [OX - 4, G + 3, OZ - 4, OX + 4, G + 8, OZ + 3],
        run: async a => {
          a.flash('oven', 2.6, 3.4); a.glow(1.3, 3.4);
          for (let k = 0; k < 10; k++) { const t = k / 9; a.burst([OX + 0.5 - t * (OX - X0 - 3), G + 5 + Math.sin(t * Math.PI) * 3, OZ + 4 + t * (DZ0 - OZ - 3)], { n: 10, colors: ['#fff4d8', '#ffe0b0', '#ffffff'], speed: 0.6, up: 1.2, life: 2.2, gravity: -0.35, spread: 1 }); await a.wait(0.22); }
          a.burst([OX + 0.5, TOP + 6, OZ - 1.5], { n: 16, colors: ['#d8d0d0', '#a8a0a8', '#f0e8e8'], speed: 0.6, up: 3.5, life: 2.4, gravity: -0.6, spread: 0.6 });
        },
      });

      // ── 2층 빵집 가족 방(북서쪽, 계단 위): 침대, 식탁, 궤짝, 화분, 난간 ──
      for (let z = Z0 + 1; z <= 19; z++) for (let x = X0 + 1; x <= 25; x++) w.set(x, FY, z, z === 19 || x === 25 ? B.frame : B.floorB);
      for (const x of [14, 19]) w.box(x, G + 1, 19, x, FY - 1, 19, B.frame);
      for (let x = X0 + 1; x <= 25; x++) if (x < 23) { w.set(x, FY + 2, 19, B.wood); if (x % 3 === 0) w.set(x, FY + 1, 19, B.wood); }
      for (let z = Z0 + 1; z <= 18; z++) { w.set(25, FY + 1, z, B.wood); w.set(25, FY + 2, z, B.wood); }
      // 계단: 반죽방 쪽 x23~24, z26 → z20(위)
      for (let i = 0; i < 7; i++) { const z = 26 - i; w.box(23, G + 1, z, 24, G + 1 + i, z, B.wood); w.box(23, G + 1 + i, z, 24, G + 1 + i, z, B.floorB); }
      for (let i = 0; i < 7; i += 2) w.set(25, G + 2 + i, 26 - i, B.wood);
      // 가족 방 살림
      w.box(X0 + 1, FY + 1, Z0 + 1, X0 + 4, FY + 1, Z0 + 3, B.wood); w.box(X0 + 1, FY + 2, Z0 + 1, X0 + 4, FY + 2, Z0 + 3, B.bed); w.box(X0 + 2, FY + 2, Z0 + 1, X0 + 4, FY + 2, Z0 + 3, B.quilt); w.box(X0 + 1, FY + 2, Z0 + 1, X0 + 1, FY + 4, Z0 + 3, B.wood);
      w.box(X0 + 1, FY + 1, Z0 + 5, X0 + 2, FY + 2, Z0 + 6, B.crate);
      w.box(18, FY + 1, 15, 18, FY + 1, 16, B.wood); w.box(17, FY + 2, 14, 19, FY + 2, 17, B.check); w.set(18, FY + 3, 15, B.loaf); w.set(18, FY + 3, 16, B.pot);
      for (const [x, z] of [[16, 15], [20, 16]]) w.set(x, FY + 1, z, B.wood);
      w.set(22, FY + 1, Z0 + 1, B.pot); w.set(22, FY + 2, Z0 + 1, B.flowerY);
      for (let z = 14; z <= 17; z++) for (let x = 15; x <= 21; x++) if (!w.get(x, FY + 1, z)) w.set(x, FY, z, B.clothR);
      w.set(21, FY + 4, Z0 + 1, B.lampG);
      lights.push({ name: 'room', p: [18.5, FY + 4, 15.5], c: '#ffe0a8', i: 0.6, d: 14, flicker: 0.1 });
      landmarks.push({ name: '빵집 가족 방', note: '계단 위 2층', p: [17.5, FY + 10, 15.5] });
      return { lights, landmarks, acts };
    },
  }));
})();
