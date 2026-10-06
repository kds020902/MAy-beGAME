// 여관(하위 지도) — 물레방아 마을 삼층 여관의 1층 주점 홀과 2층 객실. 북쪽 벽의 큰 벽난로, 사과주 통을 쌓은 바 카운터,
// 긴 탁자와 걸상, 사슴뿔 샹들리에, 동북쪽 부엌(빵 화덕), 서쪽 2층 회랑의 객실 셋과 남쪽 벽을 따라 오르는 계단.
// 남·동쪽 벽은 잘라 낮췄다 (마을)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 66, Hh = 44, G = 10;
  const X0 = 18, X1 = 53, Z0 = 20, Z1 = 44;          // 벽(바깥 둘레)
  const UF = G + 7;                                   // 2층 회랑 바닥(서는 높이 UF+1)
  const HT = G + 13;
  MAPS.push({
    id: 'millbrook-inn', cat: 'village', sub: true, parent: 'millbrook', name: '물레방아 여관', en: 'Millbrook · Village Inn', color: '#e8b86a', seed: 1012, base: G, time: 'day', size: [W, D, Hh],
    spawn: [44, G + 1, 41],
    desc: '마을 골목의 삼층 여관 1층 주점. 북쪽 벽의 큰 벽난로 앞에서 장꾼들이 몸을 녹이고, 바 카운터 뒤에는 언덕 과수원에서 담근 사과주 통이 줄지어 있다. 긴 탁자 위로 사슴뿔 샹들리에가 걸려 있고, 남쪽 벽 계단을 오르면 2층 회랑에 나그네 객실이 이어진다.',
    info: { title: '장소 정보', en: 'VILLAGE INN', rows: [['1층', '주점 홀 · 바 카운터 · 부엌(빵 화덕)'], ['2층', '회랑과 나그네 객실 셋'], ['자랑', '과수원 사과주 · 갓 구운 빵']] },
    sky: ['#f4e6cc', '#c8a880', '#fff2d8'], stars: false,
    hemi: ['#fff2e0', '#6a5440', 0.64], sun: ['#fff0d8', 0.6, [-0.45, 1, -0.4]],
    night: { sky: ['#3a2c26', '#120e0e', '#c87a48'], stars: false, hemi: ['#d8b898', '#1c1410', 0.44], sun: ['#ffd0a0', 0.26, [-0.45, 1, -0.4]], haze: '#2c2420' },
    fog: { start: 0.9, floor: G - 8, depth: 6, haze: [8, 0.1, 6], hazeColor: '#ecdcc4' },
    camY: -2, zoom: 1.5,
    particles: [
      { n: 90, colors: ['#fff6d8', '#ffffff', '#f0e0c0'], mode: 'drift', speed: 0.1, wind: 0.06, area: [36, 32, 15], y0: G + 2, y1: G + 14, glow: true },
      { n: 40, colors: ['#ff9a3a', '#ffd070', '#ff6a1a'], mode: 'rise', speed: 0.5, area: [37.5, 21.5, 1.6], y0: G + 2, y1: G + 9, glow: true },
      { n: 16, colors: ['#ff9a3a', '#ffd070'], mode: 'rise', speed: 0.3, area: [50.5, 22.5, 0.8], y0: G + 3, y1: G + 6, glow: true },
    ],
    blocks: {
      grass: { c: '#6b4a30', top: '#6fae4a', v: 0.08 }, grass2: { c: '#6b4a30', top: '#86bc52', v: 0.08 }, dirt: { c: '#6b4a30', v: 0.08 }, rock: { c: '#7a7a80', v: 0.06, pat: 'stone' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.1, pat: 'stone' }, flower: { c: '#e86a8a', v: 0.06 }, flower2: { c: '#f0e060', v: 0.06 },
      found: { c: '#8a8a88', v: 0.06, pat: 'stone' }, stoneDk: { c: '#5e5a56', v: 0.06, pat: 'stone' }, plaster: { c: '#e8d8c0', v: 0.03 }, frame: { c: '#5a3a24', v: 0.05 },
      floorW: { c: '#7a5434', top: '#a87a4c', v: 0.05, pat: 'plank' }, flag: { c: '#8e8a82', top: '#a8a49a', v: 0.06, pat: 'floor' }, plank: { c: '#9a6a40', v: 0.08, pat: 'plank' }, wood: { c: '#6a4428', v: 0.05 },
      bartop: { c: '#4a2c18', top: '#6a4024', v: 0.03, pat: 'plank' }, door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, win: { c: '#ffd890', night: true, day: '#bfe4f4' },
      shutter: { c: '#3a6a4a', v: 0.03, pat: 'plank' }, shutter2: { c: '#8a3a2a', v: 0.03, pat: 'plank' }, sign: { c: '#d8a83a', v: 0.04 },
      cask: { c: '#8a5a30', v: 0.08, pat: 'log' }, iron: { c: '#4a4a52', v: 0.03 }, brass: { c: '#c8a048', v: 0.04 }, copper: { c: '#b8683a', v: 0.04 },
      mug: { c: '#a8a8b0', v: 0.03 }, foam: { c: '#fff8e0', v: 0.02 }, bread: { c: '#c8883a', v: 0.05 }, plate: { c: '#f0ece0', v: 0.02 }, apple: { c: '#d8403a', v: 0.05 }, bottle: { c: '#3a7a4a', v: 0.03 }, flour: { c: '#f8f4ea', v: 0.02 },
      bark: { c: '#5a3a24', v: 0.06 }, ember: { c: '#ff7a2a', glow: true }, flame: { c: '#ffd070', glow: true }, candle: { c: '#fff4d8', glow: true }, lampG: { c: '#ffe0a0', glow: true },
      antler: { c: '#e8dcc0', v: 0.04 }, bed: { c: '#f0e8d8', v: 0.02 }, quilt: { c: '#b83a3a', v: 0.04, pat: 'check', alt: '#e8d8c0' }, quilt2: { c: '#3a6a8a', v: 0.04, pat: 'check', alt: '#e8e0d0' },
      rug: { c: '#8a3a3a', top: '#a84a3a', v: 0.05, pat: 'check', alt: '#7a5a2a' }, leather: { c: '#7a4a2a', v: 0.04 }, lute: { c: '#c88a4a', v: 0.04 }, luteDk: { c: '#3a2418', v: 0.03 }, book: { c: '#3a4a8a', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      // ── 바깥: 풀밭과 남쪽 문 앞 자갈길, 매단 간판 ──
      MH.terrain(w, { floor: G - 8, height: () => G - 1, surface: (x, z) => hash3(x, 1, z) > 0.55 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      for (let z = Z1 + 1; z < D - 2; z++) for (let x = 42; x <= 47; x++) w.set(x, G - 1, z, B.cobble);
      for (let k = 0; k < 60; k++) { const x = (hash3(k, 2, 7) * W) | 0, z = (hash3(k, 3, 7) * D) | 0; if (x >= X0 - 1 && x <= X1 + 1 && z >= Z0 - 1 && z <= Z1 + 1) continue; if (w.get(x, G - 1, z) === B.cobble) continue; w.set(x, G, z, k % 3 ? B.grass2 : (k % 2 ? B.flower : B.flower2)); }
      w.box(41, G, Z1 + 1, 41, G + 6, Z1 + 1, B.wood); w.box(41, G + 6, Z1 + 1, 41, G + 6, Z1 + 4, B.wood); w.set(41, G + 5, Z1 + 3, B.iron);
      w.box(41, G + 2, Z1 + 2, 41, G + 4, Z1 + 4, B.sign); w.set(41, G + 3, Z1 + 3, B.frame);
      for (const [x, z] of [[49, Z1 + 2], [50, Z1 + 2], [49, Z1 + 3]]) w.box(x, G, z, x, G + 1, z, B.cask);

      // ── 바닥과 벽: 북·서쪽은 2층 높이(아랫단 돌, 회벽과 목골), 남·동쪽은 세 단으로 잘랐다 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, B.floorW);
      for (let z = Z0 + 1; z <= Z0 + 6; z++) for (let x = 32; x <= 42; x++) w.set(x, G, z, B.flag);
      for (let y = G + 1; y <= HT; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z0, y === G + 1 ? B.found : (x % 4 === 2 || y === UF || y === HT ? B.frame : B.plaster));
        for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, y === G + 1 ? B.found : (z % 4 === 0 || y === UF || y === HT ? B.frame : B.plaster));
      }
      for (let x = X0; x <= X1; x++) { w.set(x, G + 1, Z1, B.found); w.set(x, G + 2, Z1, x % 4 === 2 ? B.frame : B.plaster); w.set(x, G + 3, Z1, B.frame); }
      for (let z = Z0; z <= Z1; z++) { w.set(X1, G + 1, z, B.found); w.set(X1, G + 2, z, z % 4 === 0 ? B.frame : B.plaster); w.set(X1, G + 3, z, B.frame); }
      const winN = (x0, y0, sh) => { w.box(x0, y0, Z0, x0 + 1, y0 + 2, Z0, B.win); w.box(x0 - 1, y0 - 1, Z0, x0 + 2, y0 - 1, Z0, B.wood); for (const x of [x0 - 1, x0 + 2]) w.box(x, y0, Z0, x, y0 + 2, Z0, sh || B.frame); };
      const winW = (z0, y0, sh) => { w.box(X0, y0, z0, X0, y0 + 2, z0 + 1, B.win); w.box(X0, y0 - 1, z0 - 1, X0, y0 - 1, z0 + 2, B.wood); for (const z of [z0 - 1, z0 + 2]) w.box(X0, y0, z, X0, y0 + 2, z, sh || B.frame); };
      winN(29, UF + 2); winN(45, UF + 2); winN(47, G + 3, B.shutter2);
      winW(31, UF + 2, B.shutter); winW(39, UF + 2, B.shutter);

      // ── 남쪽 문: 문틀, 바깥 등불 ──
      const DX = 44;
      w.box(DX, G + 1, Z1, DX + 1, G + 4, Z1, 0);
      for (const x of [DX - 1, DX + 2]) w.box(x, G + 1, Z1, x, G + 5, Z1, B.frame);
      w.box(DX - 1, G + 5, Z1, DX + 2, G + 5, Z1, B.frame);
      w.set(DX + 3, G + 4, Z1 + 1, B.lampG); w.set(DX + 3, G + 5, Z1 + 1, B.iron);
      lights.push({ name: 'doorLamp', p: [DX + 3.5, G + 4, Z1 + 1.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [DX, G + 1, Z1], h: 4, hit: [DX, G + 1, Z1 - 1, DX + 1, G + 4, Z1], name: '밖으로 나가기', goto: 'millbrook', hint: '여관 문을 나서 물레방아 마을 골목으로 나가요' }));

      // ── 큰 벽난로(북쪽 벽 가운데) ──
      const FX = 37;
      w.box(FX - 4, G + 1, Z0 + 1, FX + 4, G + 6, Z0 + 2, B.found);
      w.box(FX - 2, G + 1, Z0 + 1, FX + 2, G + 4, Z0 + 2, 0);
      for (let x = FX - 2; x <= FX + 2; x++) w.set(x, G, Z0 + 1, B.stoneDk);
      w.box(FX - 3, G + 7, Z0 + 1, FX + 3, HT, Z0 + 1, B.found);
      w.box(FX - 5, G + 5, Z0 + 3, FX + 5, G + 5, Z0 + 3, B.wood);
      w.box(FX - 1, G + 1, Z0 + 1, FX + 1, G + 1, Z0 + 1, B.bark); w.set(FX - 1, G + 1, Z0 + 2, B.iron); w.set(FX + 1, G + 1, Z0 + 2, B.iron);
      w.set(FX, G + 2, Z0 + 1, B.flame); w.set(FX - 1, G + 2, Z0 + 1, B.ember); w.set(FX + 1, G + 2, Z0 + 1, B.ember); w.set(FX, G + 1, Z0 + 2, B.ember);
      w.set(FX, G + 4, Z0 + 1, B.iron); w.set(FX, G + 3, Z0 + 1, B.copper);
      for (const [x, b] of [[FX - 4, B.candle], [FX - 3, B.plate], [FX - 1, B.bottle], [FX + 1, B.apple], [FX + 3, B.plate], [FX + 4, B.candle]]) w.set(x, G + 6, Z0 + 3, b);
      lights.push({ name: 'hearth', p: [FX + 0.5, G + 2.5, Z0 + 2.5], c: '#ff9a4a', i: 1.3, d: 16, flicker: 0.3 });
      w.box(FX - 3, G, Z0 + 4, FX + 3, G, Z0 + 5, B.rug);
      acts.push({
        name: '벽난로 불 지피기', hint: '장작이 탁탁 튀며 벽난로 불길이 확 살아나 홀 안이 따뜻하게 밝아져요', hit: [FX - 4, G + 1, Z0 + 1, FX + 4, G + 6, Z0 + 3],
        run: async a => {
          a.flash('hearth', 3.2, 4.5); a.glow(1.3, 4);
          for (let k = 0; k < 10; k++) { a.burst([FX + 0.5 + (k % 3 - 1) * 1.5, G + 2.5, Z0 + 4], { n: 20, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1.6, up: 4, life: 1.4, gravity: -0.8, spread: 1.4 }); await a.wait(0.4); }
        },
      });
      // 류트: 난롯가 걸상에 기대 둔 악기(부품)
      const LX = FX - 5, LZ = Z0 + 5;
      w.set(LX, G + 1, LZ, B.wood); w.set(LX - 1, G + 1, LZ, B.wood);
      const lute = w.prop({ name: 'lute', pivot: [LX + 0.5, G + 2, LZ + 0.5] });
      lute.box(LX, G + 2, LZ, LX, G + 3, LZ + 1, B.lute); lute.set(LX, G + 2, LZ + 1, B.luteDk);
      lute.box(LX, G + 4, LZ, LX, G + 5, LZ, B.luteDk); lute.set(LX, G + 6, LZ, B.lute);
      acts.push({
        name: '류트 가락', hint: '난롯가 걸상에 기대 둔 류트가 저절로 들려 흥겨운 가락을 퉁겨요', hit: [LX - 1, G + 1, LZ, LX + 1, G + 6, LZ + 1],
        run: async a => {
          await a.tween('lute', { off: [0, 2, 0], rot: [0, 0, 0.3] }, 0.6);
          for (let k = 0; k < 8; k++) { await a.turn('lute', [0, 0, k % 2 ? 0.3 : -0.3], 0.35); a.burst([LX + 0.5, G + 6, LZ + 0.5], { n: 6, colors: ['#ffe9a0', '#ffffff', '#ffb0d0'], speed: 1.2, up: 2.5, life: 1.4, gravity: -0.3, spread: 0.6 }); }
          await a.tween('lute', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6);
        },
      });

      // ── 바 카운터와 사과주 통 ──
      const BX = 31;
      for (let z = Z0 + 7; z <= Z0 + 16; z++) { w.set(BX, G + 1, z, B.wood); w.set(BX, G + 2, z, B.bartop); }
      for (let x = BX - 2; x < BX; x++) { w.set(x, G + 1, Z0 + 16, B.wood); w.set(x, G + 2, Z0 + 16, B.bartop); }
      for (const [z, two] of [[Z0 + 7, false], [Z0 + 10, true], [Z0 + 14, false]]) {
        w.box(27, G + 1, z, 28, G + 2, z + 1, B.cask); w.set(28, G + 1, z, B.iron); w.set(29, G + 2, z, B.brass);
        if (two) w.box(27, G + 3, z, 28, G + 4, z + 1, B.cask);
      }
      for (const [z, b] of [[Z0 + 7, B.bottle], [Z0 + 16, B.mug], [Z0 + 12, B.bottle], [Z0 + 15, B.apple]]) w.set(BX, G + 3, z, b);
      const mz0 = Z0 + 14;
      const tank = w.prop({ name: 'tankard', pivot: [BX + 0.5, G + 3, mz0 + 0.5] });
      tank.set(BX, G + 3, mz0, B.mug); tank.set(BX, G + 4, mz0, B.foam);
      acts.push({
        name: '사과주 따르기', hint: '통 꼭지에서 황금빛 사과주가 콸콸 쏟아지고 가득 찬 잔이 카운터를 미끄러져 가요', hit: [27, G + 1, Z0 + 7, BX, G + 4, Z0 + 16],
        run: async a => {
          for (let k = 0; k < 5; k++) { a.burst([29.5, G + 2.5, Z0 + 10.5], { n: 16, colors: ['#e8a83a', '#ffd070', '#fff0b0'], speed: 1, up: -0.5, life: 0.9, gravity: 6, spread: 0.3 }); await a.wait(0.3); }
          await a.move('tankard', [0, 0, -6], 1.2);
          a.burst([BX + 0.5, G + 4.5, mz0 - 5.5], { n: 18, colors: ['#fff8e0', '#ffffff', '#ffd070'], speed: 1.5, up: 2, life: 1, gravity: 1, spread: 0.6 });
          await a.wait(1);
          await a.move('tankard', [0, 0, 0], 1);
        },
      });

      // ── 긴 탁자 둘과 걸상, 맥주잔(부품) ──
      const table = (z) => {
        w.box(35, G + 2, z, 43, G + 2, z + 1, B.plank);
        for (const x of [35, 43]) w.box(x, G + 1, z, x, G + 1, z + 1, B.wood);
        for (const bz of [z - 1, z + 2]) w.box(35, G + 1, bz, 43, G + 1, bz, B.wood);
      };
      table(Z0 + 10); table(Z0 + 16);
      for (const [x, b] of [[36, B.bread], [38, B.plate], [41, B.apple], [42, B.plate]]) w.set(x, G + 3, Z0 + 17, b);
      w.set(39, G + 3, Z0 + 16, B.candle);
      const mugs = w.prop({ name: 'mugs', pivot: [39.5, G + 3, Z0 + 11] });
      for (const [x, z] of [[36, Z0 + 10], [38, Z0 + 11], [40, Z0 + 10], [42, Z0 + 11]]) { mugs.set(x, G + 3, z, B.mug); mugs.set(x, G + 4, z, B.foam); }
      acts.push({
        name: '건배!', hint: '탁자 위 맥주잔들이 한꺼번에 들려 쨍 하고 부딪치며 거품이 넘쳐요', hit: [35, G + 1, Z0 + 9, 43, G + 4, Z0 + 12],
        run: async a => {
          await a.move('mugs', [0, 2, 0], 0.5);
          await a.tween('mugs', { off: [0, 2.2, 0], scl: [0.8, 1, 1] }, 0.2);
          a.burst([39.5, G + 6.5, Z0 + 11], { n: 40, colors: ['#fff8e0', '#ffffff', '#ffd070'], speed: 3, up: 3, life: 1.2, gravity: 2, spread: 1.6 });
          await a.tween('mugs', { off: [0, 2, 0], scl: [1, 1, 1] }, 0.3);
          await a.wait(0.4);
          await a.move('mugs', [0, 0, 0], 0.6);
        },
      });

      // ── 사슴뿔 샹들리에(부품): 남북으로 걸친 들보에 사슬로 매달았다 ──
      const CX = 39, CZ = Z0 + 13;
      w.box(CX, HT - 2, Z0 + 2, CX, HT - 2, Z1, B.wood); w.box(CX, G + 4, Z1, CX, HT - 3, Z1, B.frame);
      const chand = w.prop({ name: 'chand', pivot: [CX + 0.5, HT - 2.5, CZ + 0.5] });
      chand.box(CX, G + 8, CZ, CX, HT - 3, CZ, B.iron);
      for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2; chand.set(Math.round(CX + Math.cos(t) * 2.6), G + 7, Math.round(CZ + Math.sin(t) * 2.6), B.antler); }
      for (let a = 0; a < 6; a++) {
        const t = a / 6 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 2.6), z = Math.round(CZ + Math.sin(t) * 2.6);
        chand.set(x, G + 8, z, B.candle);
        const ox = Math.round(CX + Math.cos(t + 0.5) * 3.4), oz = Math.round(CZ + Math.sin(t + 0.5) * 3.4); chand.set(ox, G + 8, oz, B.antler);
      }
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) chand.set(CX + dx, G + 8, CZ + dz, B.antler);
      lights.push({ name: 'chand', p: [CX + 0.5, G + 7.5, CZ + 0.5], c: '#ffe0a0', i: 0.9, d: 18, flicker: 0.12, srcR: 4 });
      acts.push({
        name: '샹들리에 촛불', hint: '사슴뿔 샹들리에가 천천히 돌며 촛불이 하나씩 환하게 피어나요', hit: [CX - 3, G + 6, CZ - 3, CX + 3, HT - 2, CZ + 3],
        run: async a => {
          a.flash('chand', 3, 4);
          await a.turn('chand', [0, Math.PI * 0.75, 0], 1.6);
          for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2 + 2.3; a.burst([CX + 0.5 + Math.cos(t) * 2.6, G + 9, CZ + 0.5 + Math.sin(t) * 2.6], { n: 10, colors: ['#ffe9a0', '#fff6d8', '#ffb040'], speed: 0.8, up: 1.5, life: 1, gravity: -0.5, spread: 0.3 }); await a.wait(0.2); }
          await a.turn('chand', [0, 0, 0], 1.6);
        },
      });

      // ── 부엌(동북쪽): 빵 화덕, 작업대와 빵, 냄비 걸이 ──
      const KX0 = 45;
      for (const [x, z] of [[KX0 - 1, Z0 + 4], [KX0 - 1, Z0 + 7], [KX0 - 1, Z0 + 10], [KX0 + 2, Z0 + 10], [KX0 + 6, Z0 + 10]]) w.box(x, G + 1, z, x, G + 6, z, B.frame);
      w.box(KX0 - 1, G + 6, Z0 + 1, KX0 - 1, G + 6, Z0 + 10, B.frame); w.box(KX0 - 1, G + 6, Z0 + 10, X1 - 1, G + 6, Z0 + 10, B.frame);
      for (let x = KX0 + 1; x <= X1 - 2; x += 2) { w.set(x, G + 5, Z0 + 10, B.iron); w.set(x, G + 4, Z0 + 10, B.copper); }
      w.box(49, G + 1, Z0 + 1, 52, G + 4, Z0 + 3, B.found); w.box(50, G + 2, Z0 + 3, 51, G + 3, Z0 + 3, 0); w.box(50, G + 2, Z0 + 2, 51, G + 2, Z0 + 2, B.ember); w.set(50, G + 3, Z0 + 2, B.bread);
      w.box(50, G + 5, Z0 + 1, 51, HT - 2, Z0 + 1, B.found);
      lights.push({ name: 'oven', p: [50.5, G + 2.5, Z0 + 3.5], c: '#ff9a4a', i: 0.8, d: 10, flicker: 0.25 });
      w.box(46, G + 2, Z0 + 6, 49, G + 2, Z0 + 7, B.plank); for (const [x, z] of [[46, Z0 + 6], [49, Z0 + 7]]) w.set(x, G + 1, z, B.wood);
      for (const [x, z, b] of [[46, Z0 + 6, B.bread], [47, Z0 + 7, B.bread], [48, Z0 + 6, B.flour], [49, Z0 + 7, B.plate]]) w.set(x, G + 3, z, b);
      w.box(52, G + 1, Z0 + 6, 52, G + 2, Z0 + 7, B.cask); w.set(46, G + 1, Z0 + 1, B.cask);
      w.box(45, G + 4, Z0 + 1, 47, G + 4, Z0 + 1, B.plank); for (const x of [45, 46, 47]) w.set(x, G + 5, Z0 + 1, x % 2 ? B.plate : B.copper);

      // ── 2층 회랑(서쪽 띠)과 남쪽 벽 계단 ──
      w.box(X0 + 1, UF, Z0 + 1, 28, UF, Z1 - 1, B.floorW);
      for (const z of [Z0 + 2, Z0 + 6, Z0 + 9, Z0 + 13, Z0 + 17, Z0 + 21]) w.box(28, G + 1, z, 28, UF - 1, z, B.frame);
      w.box(28, UF - 1, Z0 + 1, 28, UF - 1, Z1 - 1, B.frame);
      for (let z = Z0 + 1; z <= Z1 - 3; z++) w.set(28, UF + 1, z, z % 3 === 0 ? B.frame : B.wood);
      for (let k = 0; k < 7; k++) w.box(41 - k, G + 1, Z1 - 2, 41 - k, G + 1 + k, Z1 - 1, B.plank);
      w.box(29, UF, Z1 - 2, 34, UF, Z1 - 1, B.floorW);
      for (let x = 29; x <= 34; x++) w.set(x, UF + 1, Z1 - 3, x % 3 === 0 ? B.frame : B.wood);
      w.box(29, G + 1, Z1 - 3, 29, UF - 1, Z1 - 3, B.frame);
      // 객실 칸막이(낮은 벽)와 방 셋
      for (const z of [Z0 + 8, Z0 + 16]) for (let x = X0 + 1; x <= 25; x++) w.box(x, UF + 1, z, x, UF + 2, z, x % 3 === 0 ? B.frame : B.plaster);
      const room = (z0, quilt) => {
        w.box(20, UF + 1, z0 + 5, 23, UF + 1, z0 + 6, B.wood); w.box(21, UF + 2, z0 + 5, 23, UF + 2, z0 + 6, quilt); w.box(20, UF + 2, z0 + 5, 20, UF + 2, z0 + 6, B.bed);
        w.box(X0 + 1, UF + 1, z0 + 5, X0 + 1, UF + 3, z0 + 6, B.wood);
        for (let z = z0 + 1; z <= z0 + 4; z++) for (let x = 21; x <= 24; x++) w.set(x, UF, z, B.rug);
      };
      room(Z0, B.quilt); room(Z0 + 8, B.quilt2); room(Z0 + 16, B.quilt);
      w.box(23, UF + 1, Z0 + 1, 24, UF + 3, Z0 + 1, B.frame); w.set(24, UF + 2, Z0 + 1, B.brass);
      w.box(24, UF + 1, Z0 + 9, 25, UF + 1, Z0 + 9, B.leather); w.set(24, UF + 2, Z0 + 9, B.brass);
      w.box(X0 + 1, UF + 1, Z0 + 9, X0 + 2, UF + 3, Z0 + 10, B.frame); w.set(X0 + 1, UF + 1, Z0 + 12, B.wood); w.set(X0 + 1, UF + 2, Z0 + 12, B.candle);
      w.box(23, UF + 1, Z0 + 17, 25, UF + 1, Z0 + 17, B.leather); w.box(23, UF + 2, Z0 + 17, 25, UF + 2, Z0 + 17, B.brass);
      w.set(X0 + 1, UF + 1, Z0 + 19, B.book); w.set(X0 + 1, UF + 2, Z0 + 19, B.candle);
      lights.push({ name: 'roomB', p: [X0 + 1.5, UF + 2.5, Z0 + 12.5], c: '#ffd890', i: 0.5, d: 9, flicker: 0.15, srcR: 3 });
      // 객실 B 침대 이불(부품)
      const quilt = w.prop({ name: 'quilt', pivot: [22, UF + 2, Z0 + 14] });
      quilt.box(21, UF + 3, Z0 + 13, 23, UF + 3, Z0 + 14, B.quilt2);
      acts.push({
        name: '포근한 침대', hint: '객실 침대 이불이 부풀었다 가라앉으며 졸음이 쏟아지는 별가루가 피어나요', hit: [20, UF + 1, Z0 + 13, 23, UF + 3, Z0 + 14],
        run: async a => {
          for (let k = 0; k < 2; k++) { await a.move('quilt', [0, 1.8, 0], 0.7); await a.move('quilt', [0, 0, 0], 0.9); }
          for (let k = 0; k < 6; k++) { a.burst([22, UF + 4 + k * 0.4, Z0 + 14], { n: 8, colors: ['#e8e0ff', '#ffffff', '#ffe9a0'], speed: 0.6, up: 1.2, life: 1.6, gravity: -0.4, spread: 0.6 }); await a.wait(0.3); }
        },
      });
      // 객실 A 덧창(부품)
      const SZ = Z0 + 1;
      w.box(X0, UF + 2, SZ, X0, UF + 4, SZ + 3, B.win); w.box(X0, UF + 1, SZ - 1, X0, UF + 1, SZ + 4, B.wood); w.box(X0, UF + 5, SZ - 1, X0, UF + 5, SZ + 4, B.frame);
      const shutL = w.prop({ name: 'shutL', pivot: [X0 + 1, UF + 3, SZ] }), shutR = w.prop({ name: 'shutR', pivot: [X0 + 1, UF + 3, SZ + 4] });
      shutL.box(X0 + 1, UF + 2, SZ, X0 + 1, UF + 4, SZ + 1, B.shutter); shutR.box(X0 + 1, UF + 2, SZ + 2, X0 + 1, UF + 4, SZ + 3, B.shutter);
      lights.push({ name: 'sunA', p: [X0 + 2.5, UF + 3, SZ + 2], c: '#fff4d0', i: 0.2, d: 12, srcR: 3 });
      acts.push({
        name: '덧창 열기', hint: '2층 객실 덧창이 활짝 열리며 과수원 바람과 꽃잎이 들어와요', hit: [X0 + 1, UF + 1, SZ, X0 + 2, UF + 5, SZ + 3],
        run: async a => {
          await Promise.all([a.turn('shutL', [0, -1.5, 0], 1), a.turn('shutR', [0, 1.5, 0], 1)]);
          a.flash('sunA', 5, 3.5); a.wind(1.6, 3);
          for (let k = 0; k < 7; k++) { a.burst([X0 + 2, UF + 3, SZ + 2], { n: 12, colors: ['#ffd0e8', '#ffffff', '#fff080'], speed: 2.5, up: 0.6, life: 1.8, gravity: 0.3, spread: 1.2, flat: true }); await a.wait(0.35); }
          await a.wait(0.5);
          await Promise.all([a.turn('shutL', [0, 0, 0], 1), a.turn('shutR', [0, 0, 0], 1)]);
        },
      });
      landmarks.push({ name: '물레방아 여관', note: '벽난로와 사과주', p: [36, HT + 4, Z0 + 12] });
      return { lights, landmarks, acts };
    },
  });
})();
