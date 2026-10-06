// 돌망치 주점(하위 지도) — 무쇠골 드워프들의 2층 돌집 주점 안. 남쪽 청동 문으로 들어서면 긴 돌탁자 두 줄의 홀,
// 북쪽에 흑맥주 통을 눕힌 바와 큰 술통, 북서쪽 벽난로와 도끼 장식 벽, 서쪽 회랑 위 2층 숙소(계단). 남·동쪽 벽은 잘라 낮췄다 (64칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 64, D = 64, Hh = 48, G = 10;
  MAPS.push({
    id: 'ironhollow-tavern', cat: 'village', sub: true, parent: 'ironhollow', name: '돌망치 주점', en: 'Ironhollow · The Stonehammer Tavern', color: '#8a5a30', seed: 1272, base: G, time: 'night', size: [W, D, Hh],
    desc: '흑맥주가 끊이지 않는 무쇠골의 주점. 긴 돌탁자 위로 술잔이 부딪히고, 바 뒤에는 흑맥주 통이 겹겹이 누워 있으며 구석의 큰 술통 꼭지에서는 거품이 넘친다. 벽난로 위 도끼 장식 벽 아래에서 드워프 노래가 울리고, 계단 위 회랑에는 광부들이 묵어 가는 숙소가 있다.',
    info: { title: '장소 정보', en: 'STONEHAMMER TAVERN', rows: [['홀', '긴 돌탁자 두 줄 · 팔씨름 탁자'], ['바', '흑맥주 통 · 큰 술통 · 술잔 선반'], ['2층', '회랑의 숙소 세 칸']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.6], sun: ['#ffc890', 0.6, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.62], sun: ['#ffe8d0', 0.72, [0.4, 1, 0.6]], haze: '#c89060' },
    fog: { start: 0.92, floor: G - 14, depth: 6, haze: [6, 0.14, 6], hazeColor: '#5a3424' },
    camY: 2, zoom: 1.75,
    particles: [
      { n: 50, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 0.8, area: [27, 19, 2], y0: G + 3, y1: G + 20 },
      { n: 60, colors: ['#c8b8a8', '#a89888', '#e8dcc8'], mode: 'drift', speed: 0.12, wind: 0.1, area: [34, 32, 16], y0: G + 1, y1: G + 11, glow: false },
    ],
    blocks: {
      gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 }, rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' }, pave: { c: '#6a625a', top: '#847a70', v: 0.06, pat: 'stone' },
      floorP: { c: '#5a3a24', top: '#7a5434', v: 0.06, pat: 'plank' }, floorS: { c: '#5e564e', top: '#6e665e', v: 0.06, pat: 'big' },
      granite: { c: '#8a8078', v: 0.05, pat: 'big' }, graniteDk: { c: '#5e564e', v: 0.05, pat: 'brick' }, basalt: { c: '#2e2826', v: 0.06, pat: 'stone' }, slate: { c: '#3a3a44', v: 0.04, pat: 'tile' },
      bronze: { c: '#c08a3a', v: 0.06 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 }, timber: { c: '#6a4428', v: 0.06, pat: 'log' },
      plank: { c: '#7a5434', v: 0.08, pat: 'plank' }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' }, barrelD: { c: '#6a4224', v: 0.08, pat: 'log' }, hoop: { c: '#3a3a40', v: 0.03 },
      stout: { c: '#2a1a12', v: 0.03 }, foam: { c: '#f4ecd8', v: 0.03 }, mug: { c: '#a8a098', v: 0.04 }, mugB: { c: '#c08a3a', v: 0.05 },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, fire: { c: '#ff9a3a', glow: true }, fireY: { c: '#ffe090', glow: true }, candle: { c: '#ffd890', glow: true },
      rug: { c: '#8a2a2a', v: 0.05, pat: 'check', alt: '#6a2424' }, blanket: { c: '#3a5a8a', v: 0.04 }, blanket2: { c: '#7a3a3a', v: 0.04 }, linen: { c: '#e8dcc8', v: 0.03 }, leather: { c: '#6a3a24', v: 0.05 },
      bread: { c: '#c8843a', v: 0.06 }, meat: { c: '#8a3a2a', v: 0.05 }, cheese: { c: '#e8c060', v: 0.05 }, coal: { c: '#141010', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 13, X1 = 50, Z0 = 17, Z1 = 44, TOP = G + 13, LY = G + 7;
      const DX0 = 30, DX1 = 32;                                              // 남쪽 청동 문
      const GX1 = 21;                                                        // 서쪽 회랑(2층 숙소) 동쪽 끝
      const inR = (x, z) => x > X0 && x < X1 && z > Z0 && z < Z1;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 1, z) > 0.8 ? B.rock : B.gravel, under: () => B.rock });
      const lights = [], acts = [], landmarks = [];

      // ── 바닥: 널마루 홀, 바 뒤와 벽난로 앞은 돌판, 문 앞 바깥은 포장길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) S(x, G, z, (z <= 23 && x >= 33) || (z <= 21 && x >= 23 && x <= 31) ? B.floorS : B.floorP);
      for (let z = Z1 + 1; z < D - 4; z++) for (let x = DX0 - 2; x <= DX1 + 2; x++) S(x, G, z, B.pave);

      // ── 벽: 북·서는 높고(화강암, 나무 띠, 불빛 창), 동·남은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x === X1 || z === Z1, corner = (x === X0 || x === X1) && (z === Z0 || z === Z1);
        const a = (x === X0 || x === X1) ? z : x;
        if (low) {
          for (let y = G + 1; y <= G + 2; y++) S(x, y, z, corner || a % 5 === 0 ? B.graniteDk : B.granite);
          if (corner || a % 5 === 0) S(x, G + 3, z, B.timber);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) S(x, y, z, y === G + 1 || corner || a % 6 === 0 ? B.graniteDk : (y === LY || y === TOP ? B.timber : B.granite));
      }
      for (const x of [36, 42, 47]) w.box(x, G + 9, Z0, x + 1, G + 11, Z0, B.win);
      for (const z of [22, 30, 38]) w.box(X0, G + 9, z, X0, G + 11, z + 1, B.win);
      // 남쪽 청동 문
      for (let x = DX0; x <= DX1; x++) for (let y = G + 1; y <= G + 3; y++) S(x, y, Z1, 0);
      for (const x of [DX0 - 1, DX1 + 1]) w.box(x, G + 1, Z1, x, G + 5, Z1, B.graniteDk);
      w.box(DX0 - 1, G + 5, Z1, DX1 + 1, G + 5, Z1, B.graniteDk); S(DX0 + 1, G + 5, Z1, B.gold);
      for (let x = DX0; x <= DX1; x++) S(x, G, Z1, B.floorS);
      w.box(DX1 + 2, G + 1, Z1 - 3, DX1 + 2, G + 4, Z1 - 1, B.bronze);

      // ── 벽난로(북서): 돌 아궁이, 장작불, 굴뚝, 위에 도끼 장식 벽, 앞에 깔개와 안락의자 ──
      const FX0 = 23, FX1 = 31;
      w.box(FX0, G + 1, Z0 + 1, FX1, G + 6, Z0 + 3, B.graniteDk);
      w.box(FX0 + 2, G + 1, Z0 + 2, FX1 - 2, G + 4, Z0 + 3, 0);
      w.box(FX0 + 2, G + 1, Z0 + 2, FX1 - 2, G + 1, Z0 + 2, B.coal);
      for (const [x, b] of [[25, B.ember], [26, B.fire], [27, B.fireY], [28, B.fire], [29, B.ember]]) S(x, G + 2, Z0 + 2, b);
      S(26, G + 3, Z0 + 2, B.fire); S(28, G + 3, Z0 + 2, B.fire);
      w.box(FX0, G + 6, Z0 + 1, FX1, G + 6, Z0 + 4, B.timber);
      w.box(FX0 + 2, G + 7, Z0 + 1, FX1 - 2, TOP + 4, Z0 + 2, B.graniteDk); w.box(FX0 + 3, TOP + 1, Z0 + 1, FX1 - 3, TOP + 4, Z0 + 1, 0);
      // 도끼 장식: 굴뚝 앞에 엇갈린 큰 도끼 둘과 둥근 방패
      for (let k = 0; k <= 4; k++) { S(25 + k, G + 8 + k, Z0 + 3, B.timber); S(29 - k, G + 8 + k, Z0 + 3, B.timber); }
      for (const [x, y] of [[25, 13], [24, 13], [24, 12], [29, 13], [30, 13], [30, 12]]) S(x, G + y, Z0 + 3, B.steel);
      w.box(26, G + 9, Z0 + 4, 28, G + 9, Z0 + 4, B.bronze); S(27, G + 10, Z0 + 4, B.bronze); S(27, G + 8, Z0 + 4, B.bronze); S(27, G + 9, Z0 + 4, B.gold);
      for (let z = Z0 + 5; z <= Z0 + 9; z++) for (let x = FX0; x <= FX1; x++) S(x, G, z, B.rug);
      for (const x of [FX0 + 1, FX1 - 1]) { w.box(x - 1, G + 1, Z0 + 7, x, G + 1, Z0 + 8, B.leather); w.box(x - 1, G + 2, Z0 + 8, x, G + 3, Z0 + 8, B.leather); }
      lights.push({ name: 'hearth', p: [27.5, G + 3, Z0 + 4], c: '#ff8a3a', i: 1.4, d: 22, flicker: 0.35, srcR: 3 });
      landmarks.push({ name: '벽난로', note: '도끼 장식 벽 · 안락의자', p: [27, G + 20, 20] });

      // ── 바: 돌 받침 계산대, 뒤에 눕힌 흑맥주 통, 술잔 선반, 동쪽 큰 술통 ──
      const BZ = 24, BX0 = 33, BX1 = 44;
      w.box(BX0, G + 1, BZ, BX1, G + 2, BZ, B.graniteDk); w.box(BX0, G + 3, BZ, BX1, G + 3, BZ, B.plank); w.box(BX0, G + 1, BZ - 1, BX0, G + 3, BZ - 1, B.graniteDk);
      for (let x = BX0 + 1; x <= BX1; x += 2) S(x, G + 1, BZ + 1, B.timber);
      for (let x = 34; x <= 40; x += 3) {
        w.box(x, G + 1, Z0 + 1, x + 2, G + 1, Z0 + 3, B.timber);
        for (const y of [G + 2, G + 4]) { w.box(x, y, Z0 + 1, x + 2, y + 1, Z0 + 3, (x + y) % 2 ? B.barrel : B.barrelD); w.box(x + 1, y, Z0 + 1, x + 1, y + 1, Z0 + 3, B.hoop); S(x + 1, y, Z0 + 4, B.bronze); }
      }
      for (const y of [G + 8, G + 10]) { w.box(34, y, Z0 + 1, 45, y, Z0 + 1, B.plank); for (let x = 34; x <= 45; x++) if ((x + y) % 2) S(x, y + 1, Z0 + 1, x % 3 ? B.mug : B.mugB); }
      // 큰 술통(바 동쪽 끝): 세운 큰 통과 꼭지, 받침 술잔(부품)
      const TX = 47, TZ = 21;
      w.cyl(TX, TZ, G + 1, G + 8, 2.4, B.barrelD);
      for (const y of [G + 2, G + 5, G + 8]) w.ring(TX, TZ, y, 1.6, 2.6, B.hoop);
      w.cyl(TX, TZ, G + 9, G + 9, 1.4, B.barrel);
      w.box(TX - 1, G + 4, TZ + 3, TX - 1, G + 4, TZ + 3, B.bronze); S(TX - 1, G + 5, TZ + 3, B.gold);
      w.box(TX - 3, G + 1, TZ + 3, TX + 1, G + 2, TZ + 4, B.graniteDk);
      const tmug = w.prop({ name: 'tapmug', pivot: [TX - 0.5, G + 3, TZ + 3.5] });
      tmug.set(TX - 1, G + 3, TZ + 3, B.mug); tmug.set(TX - 2, G + 3, TZ + 3, B.iron);
      const foam = w.prop({ name: 'tapfoam', pivot: [TX - 0.5, G + 4, TZ + 4.5], scl0: [0, 0, 0] });
      foam.box(TX - 2, G + 3, TZ + 4, TX, G + 3, TZ + 4, B.foam); foam.set(TX - 1, G + 4, TZ + 4, B.foam);
      landmarks.push({ name: '흑맥주 바', note: '눕힌 통 · 큰 술통 · 술잔 선반', p: [41, G + 18, 20] });
      // 바 위 술잔(부품: 바 위를 미끄러진다)
      const slide = w.prop({ name: 'slidemug', pivot: [BX1 - 0.5, G + 4, BZ + 0.5] });
      slide.set(BX1 - 1, G + 4, BZ, B.mug); slide.set(BX1 - 1, G + 5, BZ, B.foam); slide.set(BX1, G + 4, BZ, B.iron);
      S(BX0, G + 4, BZ, B.mugB); S(BX0, G + 4, BZ - 1, B.iron); S(BX0, G + 5, BZ - 1, B.candle); S(BX0 + 1, G + 4, BZ - 1, B.bread); S(BX0 + 1, G + 4, BZ - 2, B.cheese);
      w.box(BX0 + 1, G + 1, BZ - 2, BX0 + 1, G + 3, BZ - 1, B.graniteDk);
      lights.push({ name: 'bar', p: [39, G + 6, BZ + 0.5], c: '#ffc070', i: 0.6, d: 16, flicker: 0.15, srcR: 6 });

      // ── 홀: 긴 돌탁자 두 줄과 나무 걸상, 탁자 위 술잔(부품 넷 · 건배) ──
      const tables = [[27, 44, 29], [27, 44, 36]];
      for (const [x0, x1, z] of tables) {
        w.box(x0, G + 2, z, x1, G + 2, z + 1, B.granite);
        for (const x of [x0, (x0 + x1) >> 1, x1]) w.box(x, G + 1, z, x, G + 1, z + 1, B.graniteDk);
        for (let x = x0; x <= x1; x += 2) { S(x, G + 1, z - 1, B.timber); S(x, G + 1, z + 2, B.timber); }
        for (let x = x0 + 1; x <= x1 - 1; x += 3) if (hash3(x, 2, z) > 0.3) S(x, G + 3, z + (x % 2), [B.bread, B.meat, B.cheese, B.candle][(x + z) % 4]);
      }
      const mugs = [];
      for (let k = 0; k < 4; k++) {
        const x = 31 + k * 3, z = 29 + (k % 2);
        if (w.get(x, G + 3, z)) S(x, G + 3, z, 0);
        const m = w.prop({ name: 'mug' + k, pivot: [x + 0.5, G + 3, z + 0.5] });
        m.set(x, G + 3, z, k % 2 ? B.mugB : B.mug); m.set(x, G + 4, z, B.foam);
        mugs.push([x, z]);
      }
      lights.push({ name: 'tables', p: [36, G + 5, 33], c: '#ffc070', i: 0.5, d: 18, flicker: 0.15, srcR: 4 });
      S(34, G + 3, 37, B.candle); S(36, G + 3, 30, B.candle);

      // ── 팔씨름 탁자(동쪽): 둥근 돌 탁자(부품 상판)와 쇠 팔걸이, 걸상 둘 ──
      const AX = 46, AZ = 33;
      w.box(AX, G + 1, AZ, AX, G + 1, AZ, B.graniteDk);
      const arm = w.prop({ name: 'armtable', pivot: [AX + 0.5, G + 2, AZ + 0.5] });
      arm.cyl(AX, AZ, G + 2, G + 2, 1.5, B.granite); arm.set(AX - 1, G + 3, AZ, B.iron); arm.set(AX + 1, G + 3, AZ, B.iron); arm.set(AX, G + 3, AZ - 1, B.mugB); arm.set(AX, G + 3, AZ + 1, B.mug);
      for (const x of [AX - 3, AX + 3]) S(x, G + 1, AZ, B.timber);
      landmarks.push({ name: '팔씨름 탁자', note: '쇠 팔걸이가 박힌 둥근 돌 탁자', p: [AX + 0.5, G + 10, AZ + 0.5] });

      // ── 노래 자리(벽난로 앞 동쪽): 북(부품)과 류트, 노래책 ──
      const DRX = 33, DRZ = 26;
      const drum = w.prop({ name: 'drum', pivot: [DRX + 0.5, G + 1, DRZ + 0.5] });
      drum.cyl(DRX, DRZ, G + 1, G + 2, 1.1, B.barrel); drum.cyl(DRX, DRZ, G + 3, G + 3, 1.1, B.leather);
      S(DRX - 3, G + 1, DRZ, B.timber); S(DRX - 3, G + 2, DRZ, B.bronze); S(DRX - 3, G + 3, DRZ, B.bronze); S(DRX - 3, G + 4, DRZ, B.timber); S(DRX - 3, G + 5, DRZ, B.timber);

      // ── 서쪽 회랑: 1층은 칸막이 자리, 2층(LY)은 숙소 세 칸과 난간, 계단은 홀 서쪽에서 북쪽으로 ──
      for (let z = Z0 + 1; z <= Z1 - 1; z++) for (let x = X0 + 1; x <= GX1; x++) S(x, LY, z, B.plank);
      for (const z of [18, 24, 30, 36, 43]) w.box(GX1, G + 1, z, GX1, LY - 1, z, B.timber);
      w.box(GX1, LY - 1, Z0 + 1, GX1, LY - 1, Z1 - 1, B.timber);
      for (let z = Z0 + 1; z <= Z1 - 1; z++) { if (z >= 33 && z <= 35) continue; S(GX1, LY + 1, z, z % 3 === 0 ? B.timber : B.plank); if (z % 3 === 0) S(GX1, LY + 2, z, B.timber); }
      // 1층 칸막이 자리: 작은 탁자와 걸상
      for (const z of [21, 27, 39]) { w.box(16, G + 1, z, 17, G + 2, z + 1, B.plank); S(16, G + 3, z, B.candle); S(17, G + 3, z + 1, B.mug); for (const zz of [z - 1, z + 2]) S(16, G + 1, zz, B.timber); }
      for (const z of [24, 30, 36]) w.box(X0 + 1, G + 1, z, 18, G + 3, z, B.plank);
      // 2층 숙소: 칸막이 벽(낮게), 침대, 이불, 작은 궤
      for (const z of [26, 34]) { w.box(X0 + 1, LY + 1, z, 18, LY + 3, z, B.plank); S(18, LY + 4, z, B.timber); }
      for (const [z0, bl] of [[19, B.blanket], [28, B.blanket2], [37, B.blanket]]) {
        w.box(X0 + 1, LY + 1, z0, X0 + 3, LY + 1, z0 + 3, B.timber); w.box(X0 + 1, LY + 2, z0 + 1, X0 + 3, LY + 2, z0 + 3, bl); w.box(X0 + 1, LY + 2, z0, X0 + 3, LY + 2, z0, B.linen);
        w.box(X0 + 1, LY + 1, z0 + 5, X0 + 2, LY + 2, z0 + 5, B.barrelD); S(18, LY + 1, z0 + 1, B.candle);
      }
      // 계단: 회랑 동쪽(x 22..24)에서 남→북으로 올라 z=34에서 회랑에 닿는다
      for (let k = 1; k <= 7; k++) { const z = 41 - k; w.box(GX1 + 1, G + 1, z, GX1 + 3, G + k, z, k % 2 ? B.plank : B.timber); S(GX1 + 4, G + k + 1, z, B.timber); }
      for (let y = G + 1; y <= G + 8; y++) S(GX1 + 4, y, 40, B.timber);
      S(GX1, LY + 1, 33, 0); S(GX1, LY + 1, 34, 0); S(GX1, LY + 1, 35, 0);
      for (let x = GX1 + 1; x <= GX1 + 3; x++) S(x, LY, 33, B.plank);
      lights.push({ name: 'gallery', p: [18.5, LY + 2, 30], c: '#ffd890', i: 0.5, d: 14, flicker: 0.12, srcR: 4 });
      landmarks.push({ name: '2층 숙소', note: '회랑의 침대 세 칸', p: [16, LY + 12, 30] });

      // 벽 촛대와 문간 등
      for (const [x, z] of [[X1 - 1, 27], [X1 - 1, 39], [38, Z1 - 1]]) { S(x, G + 1, z, B.timber); S(x, G + 2, z, B.iron); S(x, G + 3, z, B.candle); }
      lights.push({ name: 'door', p: [DX0 + 1.5, G + 4, Z1 - 1], c: '#ffc070', i: 0.4, d: 12, flicker: 0.15, srcR: 7 });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [DX0 + 1, G + 1, Z1], h: 5, name: '밖으로 나가기', goto: 'ironhollow', hint: '청동 문을 나서 무쇠골 고원의 주점 앞 탁자 쪽으로 나가요', hit: [DX0, G + 1, Z1, DX1, G + 4, Z1] }));
      acts.push({
        name: '흑맥주 따르기', hint: '바 뒤 흑맥주 통 꼭지에서 거품 가득한 한 잔이 차오르고, 술잔이 바 위를 쭈욱 미끄러져요', hit: [BX0, G + 1, BZ - 1, BX1, G + 6, BZ + 1],
        run: async a => {
          for (let k = 0; k < 5; k++) { a.burst([41.5, G + 4, Z0 + 4.5], { n: 8, colors: ['#2a1a12', '#5a3a24', '#f4ecd8'], speed: 0.5, up: -1, life: 0.6, gravity: 8, spread: 0.2 }); await a.wait(0.15); }
          a.burst([BX1 - 0.5, G + 5.6, BZ + 0.5], { n: 14, colors: ['#f4ecd8', '#ffffff'], speed: 1, up: 1.5, life: 0.8, gravity: 2, spread: 0.4 });
          await a.move('slidemug', [-(BX1 - BX0 - 2), 0, 0], 1.4);
          a.burst([BX0 + 1.5, G + 5, BZ + 0.5], { n: 12, colors: ['#f4ecd8', '#ffffff'], speed: 1.6, up: 1, life: 0.6, gravity: 4, spread: 0.4 });
          await a.wait(1); await a.move('slidemug', [0, 0, 0], 1.2);
        },
      });
      acts.push({
        name: '팔씨름 탁자', hint: '둥근 돌 탁자가 쿵쿵 들썩이며 술잔이 튀어 오르고, 누가 이겼는지 박수 소리만 요란해요', hit: [AX - 3, G + 1, AZ - 2, AX + 3, G + 4, AZ + 2],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.tween('armtable', { off: [0, 0.8, 0], rot: [k % 2 ? 0.25 : -0.25, 0, k % 2 ? -0.15 : 0.15] }, 0.16);
            await a.tween('armtable', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.14);
            a.burst([AX + 0.5, G + 3.5, AZ + 0.5], { n: 10, colors: ['#f4ecd8', '#c8b8a8', '#ffe08a'], speed: 2, up: 1.5, life: 0.6, gravity: 5, spread: 1 });
          }
          await a.tween('armtable', { off: [0, 2, 0], rot: [0, 0.6, 0] }, 0.3);
          a.burst([AX + 0.5, G + 6, AZ + 0.5], { n: 30, colors: ['#ffe08a', '#ffb04a', '#ffffff'], speed: 3, up: 3, life: 1, gravity: 3, spread: 1 });
          await a.tween('armtable', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.4);
        },
      });
      acts.push({
        name: '드워프 노래', hint: '북이 둥둥 울리며 드워프 노래가 시작되고, 탁자 위 술잔들이 장단 맞춰 들썩여요', hit: [DRX - 3, G + 1, DRZ - 1, DRX + 1, G + 5, DRZ + 1],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            await a.tween('drum', { scl: [1.15, 0.75, 1.15] }, 0.12);
            a.burst([DRX + 0.5, G + 5, DRZ + 0.5], { n: 6, colors: ['#ffe08a', '#ffd070', '#ffffff'], speed: 1.2, up: 2.5, life: 1.4, gravity: -0.4, spread: 0.6 });
            const m = 'mug' + (k % 4);
            a.move(m, [0, 1.8, 0], 0.15).then(() => a.move(m, [0, 0, 0], 0.2));
            await a.tween('drum', { scl: [1, 1, 1] }, 0.18);
          }
          await a.wait(0.4);
        },
      });
      acts.push({
        name: '벽난로 불', hint: '장작이 탁 튀며 벽난로 불길이 확 일어나고, 도끼 장식 벽이 붉게 번쩍여요', hit: [FX0, G + 1, Z0 + 1, FX1, G + 6, Z0 + 4],
        run: async a => {
          a.flash('hearth', 4, 3); a.glow(1.4, 3);
          for (let k = 0; k < 8; k++) { a.burst([27.5, G + 3, Z0 + 5], { n: 18, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], speed: 2, up: 3, life: 1, gravity: 1, spread: 1.4 }); a.burst([27.5, TOP + 5, Z0 + 1.5], { n: 10, colors: ['#ffb04a', '#ff6a2a', '#8a7a70'], speed: 1, up: 4, life: 1.4, gravity: -0.6, spread: 0.8 }); await a.wait(0.3); }
        },
      });
      acts.push({
        name: '통 꼭지 쏟기', hint: '큰 술통 꼭지가 펑 풀리며 흑맥주 거품이 술잔을 넘쳐 쏟아져요', hit: [TX - 3, G + 1, TZ - 2, TX + 2, G + 9, TZ + 4],
        run: async a => {
          await a.tween('tapfoam', { scl: [1, 1, 1] }, 0.1);
          for (let k = 0; k < 10; k++) { a.burst([TX - 0.5, G + 4, TZ + 3.5], { n: 14, colors: ['#2a1a12', '#5a3a24', '#f4ecd8', '#ffffff'], speed: 1.4, up: 0.5, life: 0.8, gravity: 7, spread: 0.5 }); await a.wait(0.15); }
          await a.tween('tapfoam', { scl: [1.6, 2.4, 1.6] }, 0.8);
          await a.move('tapmug', [0, 2.4, 0], 0.4); await a.move('tapmug', [0, 0, 0], 0.4);
          await a.wait(0.8); await a.tween('tapfoam', { scl: [0, 0, 0] }, 0.5);
        },
      });
      acts.push({
        name: '건배', hint: '긴 돌탁자의 술잔들이 한꺼번에 높이 들려 쨍! 부딪히고 거품이 흩날려요', hit: [27, G + 1, 28, 44, G + 4, 31],
        run: async a => {
          await Promise.all(mugs.map((m, k) => a.move('mug' + k, [(37.5 - m[0] - 0.5) * 0.6, 3.5, (29.5 - m[1]) * 0.8], 0.6)));
          a.burst([37.5, G + 7, 29.5], { n: 34, colors: ['#f4ecd8', '#ffffff', '#ffe08a'], speed: 3, up: 2, life: 1, gravity: 4, spread: 1 });
          await a.wait(0.6);
          await Promise.all(mugs.map((m, k) => a.move('mug' + k, [0, 0, 0], 0.5)));
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
