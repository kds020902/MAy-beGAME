// 여관(하위 지도) — 물레방아 마을 삼층 여관의 1층 주점 홀과 2층 객실. 북쪽 벽의 큰 벽난로, 사과주 통을 쌓은 바 카운터,
// 긴 탁자와 걸상, 사슴뿔 샹들리에, 동북쪽 부엌(빵 화덕), 서쪽 2층 회랑의 객실 셋과 남쪽 벽을 따라 오르는 계단.
// 남·동쪽 벽은 잘라 낮췄다 (마을). 2배 해상도(1칸 ≈ 25cm), playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 132, Hh = 88, G = 20;
  const X0 = 36, X1 = 107, Z0 = 40, Z1 = 89;          // 벽(바깥 둘레)
  const UF = G + 14;                                  // 2층 회랑 바닥(서는 높이 UF+1)
  const HT = G + 26;
  MAPS.push({
    id: 'millbrook-inn', cat: 'village', sub: true, parent: 'millbrook', name: '물레방아 여관', en: 'Millbrook · Village Inn', color: '#e8b86a', seed: 1012, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    spawn: [90, G + 1, 82],
    desc: '마을 골목의 삼층 여관 1층 주점. 북쪽 벽의 큰 벽난로 앞에서 장꾼들이 몸을 녹이고, 바 카운터 뒤에는 언덕 과수원에서 담근 사과주 통이 줄지어 있다. 긴 탁자 위로 사슴뿔 샹들리에가 걸려 있고, 남쪽 벽 계단을 오르면 2층 회랑에 나그네 객실이 이어진다.',
    info: { title: '장소 정보', en: 'VILLAGE INN', rows: [['1층', '주점 홀 · 바 카운터 · 부엌(빵 화덕)'], ['2층', '회랑과 나그네 객실 셋'], ['자랑', '과수원 사과주 · 갓 구운 빵']] },
    sky: ['#f4e6cc', '#c8a880', '#fff2d8'], stars: false,
    hemi: ['#fff2e0', '#6a5440', 0.64], sun: ['#fff0d8', 0.6, [-0.45, 1, -0.4]],
    night: { sky: ['#3a2c26', '#120e0e', '#c87a48'], stars: false, hemi: ['#d8b898', '#1c1410', 0.44], sun: ['#ffd0a0', 0.26, [-0.45, 1, -0.4]], haze: '#2c2420' },
    fog: { start: 0.9, floor: G - 16, depth: 12, haze: [16, 0.05, 12], hazeColor: '#ecdcc4' },
    camY: -4, zoom: 1.5,
    particles: [
      { n: 120, colors: ['#fff6d8', '#ffffff', '#f0e0c0'], mode: 'drift', speed: 0.2, wind: 0.12, area: [72, 64, 30], y0: G + 4, y1: G + 28, glow: true },
      { n: 50, colors: ['#ff9a3a', '#ffd070', '#ff6a1a'], mode: 'rise', speed: 1, area: [75.5, 43.5, 3.2], y0: G + 4, y1: G + 18, glow: true },
      { n: 16, colors: ['#ff9a3a', '#ffd070'], mode: 'rise', speed: 0.6, area: [102.5, 45, 1.6], y0: G + 6, y1: G + 12, glow: true },
    ],
    blocks: {
      grass: { c: '#6b4a30', top: '#6fae4a', v: 0.08 }, grass2: { c: '#6b4a30', top: '#86bc52', v: 0.08 }, dirt: { c: '#6b4a30', v: 0.08 }, rock: { c: '#7a7a80', v: 0.06, pat: 'stone' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cobble2: { c: '#7e7a72', top: '#96928a', v: 0.06 }, cobbleJ: { c: '#6a665e', top: '#76726a', v: 0.04 },
      flower: { c: '#e86a8a', v: 0.05 }, flower2: { c: '#f0e060', v: 0.05 }, flowerStem: { c: '#4a8a34', v: 0.08 },
      st1: { c: '#8e8c88', v: 0.05 }, st2: { c: '#7c7a76', v: 0.05 }, st3: { c: '#9c988e', v: 0.05 }, st4: { c: '#84887c', v: 0.05 }, mortar: { c: '#a49c8c', v: 0.04 }, sill: { c: '#b0aaa0', v: 0.04 },
      found: { c: '#8a8a88', v: 0.06, pat: 'stone' }, stoneDk: { c: '#5e5a56', v: 0.06, pat: 'stone' }, soot: { c: '#3a3430', v: 0.05 }, plaster: { c: '#e8d8c0', v: 0.03 }, frame: { c: '#5a3a24', v: 0.05 }, frameDk: { c: '#46301e', v: 0.04 },
      floorW: { c: '#7a5434', top: '#a87a4c', v: 0.04 }, floorW2: { c: '#6e4a2c', top: '#986c42', v: 0.04 }, flag: { c: '#8e8a82', top: '#a8a49a', v: 0.04 }, flag2: { c: '#7e7a72', top: '#949088', v: 0.04 },
      plank: { c: '#9a6a40', v: 0.06, pat: 'plank' }, wood: { c: '#6a4428', v: 0.05 }, mullion: { c: '#ece4d0', v: 0.02 },
      bartop: { c: '#4a2c18', top: '#6a4024', v: 0.03 }, door: { c: '#4a2e1c', v: 0.03, pat: 'plank' }, doorDk: { c: '#3e2616', v: 0.03 }, win: { c: '#ffd890', night: true, day: '#bfe4f4' },
      shutter: { c: '#3a6a4a', v: 0.02 }, shutterDk: { c: '#2c563a', v: 0.02 }, shutter2: { c: '#8a3a2a', v: 0.02 }, shutter2Dk: { c: '#702c1e', v: 0.02 }, hinge: { c: '#2e2e34', v: 0.02 }, sign: { c: '#d8a83a', v: 0.03 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 }, iron: { c: '#4a4a52', v: 0.03 }, ironDk: { c: '#33333a', v: 0.03 }, brass: { c: '#c8a048', v: 0.03 }, copper: { c: '#b8683a', v: 0.04 },
      mug: { c: '#a8a8b0', v: 0.03 }, foam: { c: '#fff8e0', v: 0.02 }, cider: { c: '#e0a03a', v: 0.03 }, bread: { c: '#c8883a', v: 0.05 }, breadTop: { c: '#a86a2a', v: 0.04 }, plate: { c: '#f0ece0', v: 0.02 }, apple: { c: '#d8403a', v: 0.05 }, bottle: { c: '#3a7a4a', v: 0.03 }, flour: { c: '#f8f4ea', v: 0.02 },
      bark: { c: '#5a3a24', v: 0.06 }, logEnd: { c: '#c8a070', v: 0.04 }, ember: { c: '#ff7a2a', glow: true }, flame: { c: '#ffd070', glow: true }, candle: { c: '#fff4d8', glow: true }, wax: { c: '#f4ecd8', v: 0.02 }, lampG: { c: '#ffe0a0', glow: true },
      antler: { c: '#e8dcc0', v: 0.04 }, bed: { c: '#f0e8d8', v: 0.02 }, quilt: { c: '#b83a3a', v: 0.04, pat: 'check', alt: '#e8d8c0' }, quilt2: { c: '#3a6a8a', v: 0.04, pat: 'check', alt: '#e8e0d0' },
      rug: { c: '#8a3a3a', top: '#a84a3a', v: 0.04 }, rug2: { c: '#7a5a2a', top: '#c8a050', v: 0.04 }, leather: { c: '#7a4a2a', v: 0.04 }, lute: { c: '#c88a4a', v: 0.04 }, luteDk: { c: '#3a2418', v: 0.03 }, book: { c: '#3a4a8a', v: 0.03 }, book2: { c: '#8a3a3a', v: 0.03 },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      // 낱돌 쌓기: 2칸 높이 돌 + 1칸 줄눈, 줄마다 엇갈림
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stone = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const barrel = (x, y, z, ht) => {
        ht = ht || 6;
        for (let r = 0; r < ht; r++) {
          const rr = r >= 2 && r <= ht - 3 ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            w.set(x + dx, y + r, z + dz, r === ht - 1 ? (outer ? B.cask : B.caskTop) : (r === 1 || r === ht - 2) && outer ? B.iron : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2));
          }
        }
      };
      const PN = (u, y, d, b) => w.set(u, y, Z0 + d, b);      // 북쪽 벽: u = x, d = 안쪽(+z)
      const PW = (u, y, d, b) => w.set(X0 + d, y, u, b);      // 서쪽 벽: u = z, d = 안쪽(+x)
      // 창: 창살·가로살, 창턱, 창틀, (덧문)
      const winAt = (P, u0, y0, wd, ht, sh) => {
        for (let r = 0; r < ht; r++) for (let c = 0; c < wd; c++) P(u0 + c, y0 + r, 0, (c === (wd >> 1) || r === (ht >> 1)) ? B.mullion : B.win);
        for (let c = -1; c <= wd; c++) { P(u0 + c, y0 - 1, 0, B.sill); P(u0 + c, y0 - 1, 1, B.sill); P(u0 + c, y0 + ht, 0, B.frame); P(u0 + c, y0 + ht, 1, B.frameDk); }
        for (let r = 0; r < ht; r++) { P(u0 - 1, y0 + r, 1, B.frame); P(u0 + wd, y0 + r, 1, B.frame); }
        if (sh) for (const c0 of [-3, wd + 1]) for (let c = 0; c < 2; c++) for (let r = 0; r < ht; r++) { P(u0 + c0 + c, y0 + r, 1, r % 2 ? sh[0] : sh[1]); if (r === 1 || r === ht - 2) P(u0 + c0 + c, y0 + r, 2, B.hinge); }
      };
      // 촛대: 놋 받침, 밀랍, 불꽃
      const candleAt = (x, y, z) => { w.set(x, y, z, B.brass); w.set(x, y + 1, z, B.wax); w.set(x, y + 2, z, B.candle); };

      // ── 바깥: 풀밭과 남쪽 문 앞 돌길, 매단 간판, 사과주 통 ──
      MH.terrain(w, { floor: G - 16, height: () => G - 1, surface: (x, z) => hash3(x, 1, z) > 0.55 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      for (let z = Z1 + 1; z < D - 3; z++) for (let x = 84; x <= 95; x++) {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        w.set(x, G - 1, z, (x === 84 || x === 95) ? B.cobbleJ : (z % 3 === 2 || (x + off) % 4 === 3) ? B.cobbleJ : (hash3((x + off) >> 2, row, 3) > 0.5 ? B.cobble : B.cobble2));
      }
      for (let k = 0; k < 140; k++) {
        const x = (hash3(k, 2, 7) * W) | 0, z = (hash3(k, 3, 7) * D) | 0;
        if (x >= X0 - 2 && x <= X1 + 2 && z >= Z0 - 2 && z <= Z1 + 2) continue;
        if (w.get(x, G - 1, z) !== B.grass && w.get(x, G - 1, z) !== B.grass2) continue;
        w.set(x, G, z, B.flowerStem); if (k % 3 === 0) w.set(x, G + 1, z, k % 2 ? B.flower : B.flower2);
      }
      { // 간판: 기둥, 내민 팔, 사슬 둘, 테두리 있는 판에 잔 그림
        const sx = 80, z1 = Z1;
        w.box(sx, G, z1 + 2, sx, G + 14, z1 + 2, B.wood); w.box(sx - 1, G, z1 + 1, sx + 1, G, z1 + 3, B.st2);
        w.box(sx, G + 14, z1 + 2, sx, G + 14, z1 + 11, B.wood); w.line(sx, G + 10, z1 + 2, sx, G + 13, z1 + 6, B.iron);
        for (const cz of [z1 + 5, z1 + 10]) { w.set(sx, G + 13, cz, B.iron); w.set(sx, G + 12, cz, B.ironDk); }
        for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
          const z = z1 + 4 + c, y = G + 11 - r, edge = r === 0 || r === 6 || c === 0 || c === 6;
          const mug = (c >= 2 && c <= 4 && r >= 2 && r <= 5) || (c === 5 && (r === 3 || r === 4));
          w.set(sx, y, z, edge ? B.frame : mug ? (r === 2 ? B.foam : B.cider) : B.sign);
        }
      }
      barrel(100, G, Z1 + 5); barrel(105, G, Z1 + 5); barrel(102, G + 6, Z1 + 6);

      // ── 바닥과 벽 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const strip = Math.floor(x / 3), seam = ((z + strip * 7) % 16) === 0;
        w.set(x, G, z, seam || (x % 3 === 2) ? B.floorW2 : B.floorW);
      }
      for (let z = Z0 + 1; z <= Z0 + 12; z++) for (let x = 64; x <= 85; x++) {
        const row = Math.floor(z / 4), off = (row & 1) * 3;
        w.set(x, G, z, (z % 4 === 3 || (x + off) % 6 === 5) ? B.flag2 : B.flag);
      }
      // 북·서쪽: 낱돌 아랫단, 회벽, 안쪽으로 내민 목골(기둥·도리·가새)
      for (let y = G + 1; y <= HT; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z0, y <= G + 3 ? stone(x, y, 3) : B.plaster);
        for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, y <= G + 3 ? stone(z, y, 4) : B.plaster);
      }
      for (const [P, u0, u1] of [[PN, X0 + 1, X1], [PW, Z0 + 1, Z1]]) {
        for (let u = u0; u <= u1; u++) { P(u, G + 3, 1, B.sill); for (const y of [G + 4, UF - 1, UF, HT]) P(u, y, 1, B.frame); }
        for (let u = u0 + 3; u <= u1; u += 8) for (let y = G + 4; y <= HT; y++) P(u, y, 1, B.frameDk);
        for (let u = u0 + 3; u + 8 <= u1; u += 16) for (let k = 0; k <= 7; k++) P(u + 1 + k, UF + 1 + Math.round(k * 10 / 7), 1, B.frame);
      }
      // 남·동쪽: 낱돌 세 단, 회벽 두 단(기둥), 나무 갓
      for (let x = X0; x <= X1; x++) for (let y = G + 1; y <= G + 6; y++) w.set(x, y, Z1, y <= G + 3 ? stone(x, y, 5) : y === G + 6 ? B.frame : (x % 8 === 3 ? B.frameDk : B.plaster));
      for (let z = Z0; z <= Z1; z++) for (let y = G + 1; y <= G + 6; y++) w.set(X1, y, z, y <= G + 3 ? stone(z, y, 6) : y === G + 6 ? B.frame : (z % 8 === 3 ? B.frameDk : B.plaster));
      w.box(X1 - 1, G + 1, Z1 - 1, X1, G + 8, Z1, B.frameDk);
      for (const x0 of [58, 90]) winAt(PN, x0, UF + 4, 4, 6);
      winAt(PN, 91, G + 9, 4, 5);
      for (const z0 of [62, 78]) winAt(PW, z0, UF + 4, 4, 6, [B.shutter, B.shutterDk]);

      // ── 남쪽 문: 문틀과 상인방, 바깥 등불 ──
      const DX = 88;
      for (let x = DX; x <= DX + 4; x++) for (let y = G + 1; y <= G + 9; y++) w.set(x, y, Z1, 0);
      for (const x of [DX - 1, DX + 5]) w.box(x, G + 1, Z1, x, G + 10, Z1, B.frameDk);
      w.box(DX - 1, G + 10, Z1, DX + 5, G + 10, Z1, B.frameDk); w.box(DX - 2, G + 11, Z1 + 1, DX + 6, G + 11, Z1 + 1, B.sill);
      for (let x = DX - 1; x <= DX + 5; x++) for (let z = Z1 + 1; z <= Z1 + 2; z++) w.set(x, G, z, z === Z1 + 1 ? B.sill : B.st2);
      w.box(DX + 6, G + 9, Z1 + 1, DX + 6, G + 9, Z1 + 2, B.iron); w.set(DX + 6, G + 8, Z1 + 2, B.ironDk); w.box(DX + 6, G + 6, Z1 + 2, DX + 6, G + 7, Z1 + 2, B.lampG); w.set(DX + 6, G + 5, Z1 + 2, B.ironDk);
      lights.push({ name: 'doorLamp', p: [DX + 6.5, G + 7, Z1 + 2.5], c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [DX + 2, G + 1, Z1 + 1], h: 8, hit: [DX, G + 1, Z1 - 1, DX + 4, G + 9, Z1], name: '밖으로 나가기', goto: 'millbrook', hint: '여관 문을 나서 물레방아 마을 골목으로 나가요' }));

      // ── 큰 벽난로(북쪽 벽 가운데): 낱돌 화덕, 그을린 안쪽, 장작과 받침쇠, 불, 주전자 고리, 선반 ──
      const FX = 75;
      for (let x = FX - 8; x <= FX + 8; x++) for (let z = Z0 + 1; z <= Z0 + 4; z++) for (let y = G + 1; y <= G + 12; y++) w.set(x, y, z, stone(x + z, y, 7));
      for (let x = FX - 4; x <= FX + 4; x++) for (let y = G + 1; y <= G + 8; y++) {
        const arch = y === G + 8 && Math.abs(x - FX) >= 3;
        if (arch) continue;
        for (let z = Z0 + 2; z <= Z0 + 4; z++) w.set(x, y, z, 0);
        w.set(x, y, Z0 + 1, B.soot);
      }
      for (let x = FX - 5; x <= FX + 5; x++) w.set(x, G + 9, Z0 + 4, Math.abs(x - FX) <= 1 ? B.st3 : B.st1);   // 아치 이맛돌
      for (let x = FX - 4; x <= FX + 4; x++) for (let z = Z0 + 1; z <= Z0 + 6; z++) w.set(x, G, z, B.stoneDk);
      for (let x = FX - 6; x <= FX + 6; x++) for (let z = Z0 + 1; z <= Z0 + 3; z++) for (let y = G + 13; y <= HT; y++) w.set(x, y, z, stone(x, y, 8));
      for (let x = FX - 10; x <= FX + 10; x++) { w.set(x, G + 12, Z0 + 5, B.wood); w.set(x, G + 12, Z0 + 6, B.wood); w.set(x, G + 11, Z0 + 5, B.frameDk); }
      for (const x of [FX - 9, FX + 9]) w.box(x, G + 9, Z0 + 5, x, G + 10, Z0 + 5, B.frameDk);
      // 장작과 받침쇠
      for (const z of [Z0 + 2, Z0 + 3]) for (let x = FX - 3; x <= FX + 3; x++) { w.set(x, G + 1, z, (x === FX - 3 || x === FX + 3) ? B.logEnd : B.bark); }
      for (let x = FX - 2; x <= FX + 2; x++) w.set(x, G + 2, Z0 + 2, (x === FX - 2 || x === FX + 2) ? B.logEnd : B.bark);
      for (const x of [FX - 4, FX + 4]) { w.box(x, G + 1, Z0 + 4, x, G + 2, Z0 + 4, B.iron); w.set(x, G + 3, Z0 + 4, B.brass); }
      for (const [x, y, z, b] of [[FX, G + 3, Z0 + 2, B.flame], [FX - 1, G + 3, Z0 + 2, B.ember], [FX + 1, G + 3, Z0 + 2, B.flame], [FX, G + 4, Z0 + 2, B.flame], [FX - 1, G + 2, Z0 + 3, B.ember], [FX + 1, G + 2, Z0 + 3, B.ember], [FX, G + 2, Z0 + 3, B.flame], [FX + 2, G + 3, Z0 + 2, B.ember], [FX - 2, G + 3, Z0 + 2, B.ember]]) w.set(x, y, z, b);
      w.box(FX, G + 6, Z0 + 2, FX, G + 8, Z0 + 2, B.iron); w.box(FX - 1, G + 5, Z0 + 2, FX + 1, G + 5, Z0 + 3, B.copper); w.set(FX + 2, G + 5, Z0 + 3, B.copper);
      for (const [x, b] of [[FX - 9, 'c'], [FX - 7, B.plate], [FX - 6, B.plate], [FX - 3, B.bottle], [FX + 2, B.apple], [FX + 3, B.apple], [FX + 6, B.plate], [FX + 9, 'c']]) {
        if (b === 'c') candleAt(x, G + 13, Z0 + 5); else { w.set(x, G + 13, Z0 + 5, b); if (b === B.bottle) w.set(x, G + 14, Z0 + 5, B.bottle); }
      }
      lights.push({ name: 'hearth', p: [FX + 0.5, G + 4, Z0 + 5], c: '#ff9a4a', i: 1.3, d: 32, flicker: 0.3 });
      for (let x = FX - 6; x <= FX + 6; x++) for (let z = Z0 + 8; z <= Z0 + 11; z++) w.set(x, G, z, (x === FX - 6 || x === FX + 6 || z === Z0 + 8 || z === Z0 + 11) ? B.rug2 : B.rug);
      acts.push({
        name: '벽난로 불 지피기', hint: '장작이 탁탁 튀며 벽난로 불길이 확 살아나 홀 안이 따뜻하게 밝아져요', hit: [FX - 8, G + 1, Z0 + 1, FX + 8, G + 12, Z0 + 6],
        run: async a => {
          a.flash('hearth', 3.2, 4.5); a.glow(1.3, 4);
          for (let k = 0; k < 10; k++) { a.burst([FX + 0.5 + (k % 3 - 1) * 3, G + 4, Z0 + 6], { n: 22, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 3.2, up: 8, life: 1.4, gravity: -1.6, spread: 2.8 }); await a.wait(0.4); }
        },
      });
      // 류트: 난롯가 걸상에 기대 둔 악기(부품)
      const LX = 62, LZ = 50;
      w.box(LX - 3, G + 3, LZ, LX + 1, G + 3, LZ + 3, B.plank);
      for (const [x, z] of [[LX - 3, LZ], [LX + 1, LZ], [LX - 3, LZ + 3], [LX + 1, LZ + 3]]) w.box(x, G + 1, z, x, G + 2, z, B.wood);
      const lute = w.prop({ name: 'lute', pivot: [LX + 0.5, G + 4, LZ + 1.5] });
      for (let y = G + 4; y <= G + 7; y++) for (let z = LZ; z <= LZ + 3; z++) {
        if ((y === G + 4 || y === G + 7) && (z === LZ || z === LZ + 3)) continue;
        lute.set(LX, y, z, (y === G + 6 && (z === LZ + 1 || z === LZ + 2)) ? B.luteDk : B.lute);
      }
      lute.box(LX, G + 8, LZ + 1, LX, G + 11, LZ + 1, B.luteDk); lute.box(LX, G + 12, LZ + 1, LX, G + 13, LZ + 2, B.lute); lute.set(LX, G + 5, LZ + 1, B.frameDk);
      acts.push({
        name: '류트 가락', hint: '난롯가 걸상에 기대 둔 류트가 저절로 들려 흥겨운 가락을 퉁겨요', hit: [LX - 3, G + 1, LZ, LX + 1, G + 13, LZ + 3],
        run: async a => {
          await a.tween('lute', { off: [0, 4, 0], rot: [0, 0, 0.3] }, 0.6);
          for (let k = 0; k < 8; k++) { await a.turn('lute', [0, 0, k % 2 ? 0.3 : -0.3], 0.35); a.burst([LX + 0.5, G + 14, LZ + 1.5], { n: 8, colors: ['#ffe9a0', '#ffffff', '#ffb0d0'], speed: 2.4, up: 5, life: 1.4, gravity: -0.6, spread: 1.2 }); }
          await a.tween('lute', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.6);
        },
      });

      // ── 바 카운터(판자 앞판·검은 윗판)와 사과주 통 ──
      const BX = 62;
      const counter = (x, z) => { for (let y = G + 1; y <= G + 4; y++) w.set(x, y, z, y === G + 1 ? B.frameDk : (z % 4 === 0 ? B.frame : B.plank)); w.set(x, G + 5, z, B.bartop); };
      for (let z = 54; z <= 73; z++) { counter(BX, z); counter(BX + 1, z); w.set(BX + 2, G + 5, z, B.bartop); }
      for (let x = 58; x < BX; x++) for (const z of [72, 73]) counter(x, z);
      for (const z of [62, 70]) { barrel(53, G + 1, z); w.box(56, G + 3, z, 57, G + 3, z, B.brass); w.set(57, G + 2, z, B.brass); }
      barrel(53, G + 7, 62);
      for (const [z, b] of [[54, B.bottle], [56, B.mug], [64, B.bottle], [66, B.apple], [72, B.mug]]) { w.set(BX + 1, G + 6, z, b); if (b === B.bottle) w.set(BX + 1, G + 7, z, b); }
      const mz0 = 68;
      const tank = w.prop({ name: 'tankard', pivot: [BX + 1, G + 6, mz0 + 1] });
      tank.box(BX, G + 6, mz0, BX + 1, G + 7, mz0 + 1, B.mug); tank.box(BX, G + 8, mz0, BX + 1, G + 8, mz0 + 1, B.foam); tank.set(BX + 2, G + 7, mz0, B.mug);
      acts.push({
        name: '사과주 따르기', hint: '통 꼭지에서 황금빛 사과주가 콸콸 쏟아지고 가득 찬 잔이 카운터를 미끄러져 가요', hit: [51, G + 1, 54, BX + 1, G + 8, 73],
        run: async a => {
          for (let k = 0; k < 5; k++) { a.burst([57.5, G + 3, 62.5], { n: 18, colors: ['#e8a83a', '#ffd070', '#fff0b0'], speed: 2, up: -1, life: 0.9, gravity: 12, spread: 0.6 }); await a.wait(0.3); }
          await a.move('tankard', [0, 0, -12], 1.2);
          a.burst([BX + 1, G + 9, mz0 - 11], { n: 20, colors: ['#fff8e0', '#ffffff', '#ffd070'], speed: 3, up: 4, life: 1, gravity: 2, spread: 1.2 });
          await a.wait(1);
          await a.move('tankard', [0, 0, 0], 1);
        },
      });

      // ── 긴 탁자 둘과 걸상, 맥주잔(부품) ──
      const table = z => {
        for (let x = 70; x <= 87; x++) for (let dz = 0; dz < 4; dz++) w.set(x, G + 4, z + dz, (x === 70 || x === 87) ? B.wood : B.plank);
        for (const x of [71, 86]) for (const dz of [0, 3]) w.box(x, G + 1, z + dz, x, G + 3, z + dz, B.wood);
        w.box(71, G + 2, z + 1, 86, G + 2, z + 2, B.frame);
        for (const bz of [z - 2, z + 4]) { w.box(70, G + 2, bz, 87, G + 2, bz + 1, B.plank); for (const x of [71, 78, 86]) w.set(x, G + 1, bz, B.wood), w.set(x, G + 1, bz + 1, B.wood); }
      };
      table(60); table(72);
      for (const [x, b] of [[72, B.bread], [76, B.plate], [77, B.plate], [82, B.apple], [84, B.plate]]) { w.set(x, G + 5, 74, b); if (b === B.bread) { w.set(x + 1, G + 5, 74, B.bread); w.set(x, G + 6, 74, B.breadTop); } }
      w.set(83, G + 5, 74, B.apple); candleAt(79, G + 5, 73);
      const mugs = w.prop({ name: 'mugs', pivot: [79.5, G + 5, 62] });
      for (const [x, z] of [[72, 60], [76, 62], [80, 60], [84, 62]]) { mugs.box(x, G + 5, z, x + 1, G + 6, z + 1, B.mug); mugs.box(x, G + 7, z, x + 1, G + 7, z + 1, B.foam); mugs.set(x + 2, G + 6, z, B.mug); }
      acts.push({
        name: '건배!', hint: '탁자 위 맥주잔들이 한꺼번에 들려 쨍 하고 부딪치며 거품이 넘쳐요', hit: [70, G + 1, 58, 87, G + 8, 65],
        run: async a => {
          await a.move('mugs', [0, 4, 0], 0.5);
          await a.tween('mugs', { off: [0, 4.4, 0], scl: [0.8, 1, 1] }, 0.2);
          a.burst([79.5, G + 12, 62], { n: 44, colors: ['#fff8e0', '#ffffff', '#ffd070'], speed: 6, up: 6, life: 1.2, gravity: 4, spread: 3.2 });
          await a.tween('mugs', { off: [0, 4, 0], scl: [1, 1, 1] }, 0.3);
          await a.wait(0.4);
          await a.move('mugs', [0, 0, 0], 0.6);
        },
      });

      // ── 사슴뿔 샹들리에(부품): 남북으로 걸친 들보에 사슬로 매달았다 ──
      const CX = 79, CZ = 66;
      w.box(CX, HT - 4, Z0 + 4, CX + 1, HT - 3, Z1, B.wood); w.box(CX, G + 7, Z1 - 1, CX + 1, HT - 5, Z1, B.frameDk);
      const chand = w.prop({ name: 'chand', pivot: [CX + 0.5, HT - 5, CZ + 0.5] });
      chand.box(CX, G + 16, CZ, CX, HT - 5, CZ, B.iron);
      for (let a = 0; a < 32; a++) { const t = a / 32 * Math.PI * 2; chand.set(Math.round(CX + Math.cos(t) * 5.2), G + 14, Math.round(CZ + Math.sin(t) * 5.2), B.antler); }
      for (let a = 0; a < 6; a++) {
        const t = a / 6 * Math.PI * 2, x = Math.round(CX + Math.cos(t) * 5.2), z = Math.round(CZ + Math.sin(t) * 5.2);
        chand.set(x, G + 15, z, B.wax); chand.set(x, G + 16, z, B.candle);
        const t2 = t + 0.5;
        for (let k = 0; k <= 3; k++) chand.set(Math.round(CX + Math.cos(t2) * (5.6 + k * 0.5)), G + 14 + Math.round(k * 0.8), Math.round(CZ + Math.sin(t2) * (5.6 + k * 0.5)), B.antler);
      }
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) for (let r = 1; r <= 4; r++) chand.set(CX + dx * r, G + 14 + (r === 1 ? 1 : 0), CZ + dz * r, B.antler);
      lights.push({ name: 'chand', p: [CX + 0.5, G + 15, CZ + 0.5], c: '#ffe0a0', i: 0.9, d: 36, flicker: 0.12, srcR: 8 });
      acts.push({
        name: '샹들리에 촛불', hint: '사슴뿔 샹들리에가 천천히 돌며 촛불이 하나씩 환하게 피어나요', hit: [CX - 6, G + 12, CZ - 6, CX + 6, HT - 4, CZ + 6],
        run: async a => {
          a.flash('chand', 3, 4);
          await a.turn('chand', [0, Math.PI * 0.75, 0], 1.6);
          for (let k = 0; k < 6; k++) { const t = k / 6 * Math.PI * 2 + 2.3; a.burst([CX + 0.5 + Math.cos(t) * 5.2, G + 18, CZ + 0.5 + Math.sin(t) * 5.2], { n: 12, colors: ['#ffe9a0', '#fff6d8', '#ffb040'], speed: 1.6, up: 3, life: 1, gravity: -1, spread: 0.6 }); await a.wait(0.2); }
          await a.turn('chand', [0, 0, 0], 1.6);
        },
      });

      // ── 부엌(동북쪽): 빵 화덕, 작업대와 빵, 냄비 걸이 ──
      for (const [x, z] of [[88, 48], [88, 54], [88, 60], [94, 60], [102, 60]]) w.box(x, G + 1, z, x + 1, G + 12, z + 1, B.frame);
      w.box(88, G + 12, Z0 + 1, 89, G + 13, 61, B.frameDk); w.box(88, G + 12, 60, X1 - 1, G + 13, 61, B.frameDk);
      for (let x = 92; x <= X1 - 3; x += 4) { w.set(x, G + 11, 60, B.iron); w.set(x, G + 10, 60, B.iron); w.box(x, G + 8, 60, x + 1, G + 9, 60, x % 8 ? B.copper : B.ironDk); }
      // 빵 화덕: 둥근 등의 낱돌 화덕, 아치 아궁이, 숯불과 빵, 굴뚝
      for (let x = 98; x <= 106; x++) for (let z = Z0 + 1; z <= Z0 + 7; z++) for (let y = G + 1; y <= G + 10; y++) {
        const top = y > G + 7 && (Math.abs(x - 102) + (y - G - 7) * 1.6 > 5);
        if (!top) w.set(x, y, z, stone(x + z, y, 9));
      }
      for (let x = 101; x <= 103; x++) for (let y = G + 3; y <= G + 6; y++) for (let z = Z0 + 4; z <= Z0 + 7; z++) if (!(y === G + 6 && x !== 102)) w.set(x, y, z, 0);
      w.box(101, G + 3, Z0 + 4, 103, G + 3, Z0 + 5, B.ember); w.set(102, G + 4, Z0 + 4, B.flame); w.box(101, G + 3, Z0 + 6, 102, G + 3, Z0 + 6, B.bread); w.set(103, G + 3, Z0 + 7, B.breadTop);
      w.box(100, G + 2, Z0 + 8, 104, G + 2, Z0 + 8, B.sill);
      for (let x = 101; x <= 104; x++) for (let y = G + 11; y <= HT - 1; y++) for (let z = Z0 + 1; z <= Z0 + 2; z++) w.set(x, y, z, stone(x, y, 10));
      lights.push({ name: 'oven', p: [102.5, G + 5, Z0 + 8.5], c: '#ff9a4a', i: 0.8, d: 20, flicker: 0.25 });
      for (let x = 92; x <= 99; x++) for (let z = 52; z <= 55; z++) w.set(x, G + 4, z, x === 92 || x === 99 ? B.wood : B.plank);
      for (const [x, z] of [[92, 52], [99, 52], [92, 55], [99, 55]]) w.box(x, G + 1, z, x, G + 3, z, B.wood);
      for (const [x, z, b] of [[93, 53, B.bread], [94, 53, B.bread], [93, 54, B.breadTop], [96, 54, B.flour], [97, 54, B.flour], [96, 53, B.flour], [98, 52, B.plate], [98, 53, B.plate]]) w.set(x, G + 5, z, b);
      barrel(104, G + 1, 54); barrel(93, G + 1, Z0 + 3, 5);
      w.box(89, G + 7, Z0 + 1, 96, G + 7, Z0 + 2, B.plank); for (const x of [89, 96]) w.set(x, G + 6, Z0 + 1, B.frameDk);
      for (const [x, b] of [[89, B.plate], [90, B.plate], [94, B.copper], [95, B.copper], [96, B.plate]]) w.set(x, G + 8, Z0 + 2, b);

      // ── 2층 회랑(서쪽 띠)과 남쪽 벽 계단 ──
      for (let z = Z0 + 1; z <= Z1 - 1; z++) for (let x = X0 + 1; x <= 57; x++) w.set(x, UF, z, (z + (x >> 2) * 5) % 14 === 0 || x % 3 === 2 ? B.floorW2 : B.floorW);
      for (let z = Z0 + 2; z <= Z1 - 1; z += 4) w.box(X0 + 1, UF - 1, z, 55, UF - 1, z, B.frame);
      w.box(56, UF - 2, Z0 + 1, 57, UF - 1, Z1 - 1, B.frameDk);
      for (const z of [44, 52, 58, 66, 74, 82]) w.box(56, G + 1, z, 57, UF - 3, z + 1, B.frame);
      const railAt = (x, z, post) => { w.set(x, UF + 5, z, B.wood); w.set(x, UF + 2, z, B.wood); if (post) for (let y = UF + 1; y <= UF + 4; y++) w.set(x, y, z, B.frame); };
      for (let z = Z0 + 1; z <= 83; z++) railAt(57, z, z % 3 === 0 || z === 83);
      // 계단: 한 단 1칸 높이, 14단(x83 → x70)
      for (let k = 0; k < 14; k++) { const x = 83 - k; if (k > 0) w.box(x, G + 1, Z1 - 5, x, G + k, Z1 - 2, B.wood); w.box(x, G + 1 + k, Z1 - 5, x, G + 1 + k, Z1 - 2, B.plank); }
      w.box(58, UF, Z1 - 5, 69, UF, Z1 - 2, B.floorW); w.box(58, UF - 1, Z1 - 5, 69, UF - 1, Z1 - 2, B.frame);
      for (let x = 58; x <= 69; x++) railAt(x, Z1 - 6, x % 3 === 0 || x === 69);
      for (let k = 0; k < 14; k++) { const x = 83 - k; w.set(x, G + 5 + k, Z1 - 6, B.wood); if (k % 3 === 0) for (let y = G + 2 + k; y <= G + 4 + k; y++) w.set(x, y, Z1 - 6, B.frame); }
      w.box(58, G + 1, Z1 - 6, 58, UF - 1, Z1 - 6, B.frame);
      // 객실 칸막이(낮은 벽)와 방 셋
      for (const z of [56, 72]) for (let x = X0 + 1; x <= 51; x++) { w.box(x, UF + 1, z, x, UF + 4, z, x % 4 === 1 ? B.frame : B.plaster); w.set(x, UF + 5, z, B.wood); }
      const room = (z0, quilt) => {
        for (let x = X0 + 6; x <= X0 + 13; x++) for (let z = z0 + 2; z <= z0 + 8; z++) w.set(x, UF, z, (x === X0 + 6 || x === X0 + 13 || z === z0 + 2 || z === z0 + 8) ? B.rug2 : B.rug);
        w.box(X0 + 3, UF + 1, z0 + 10, X0 + 11, UF + 2, z0 + 13, B.wood);
        w.box(X0 + 5, UF + 3, z0 + 10, X0 + 11, UF + 3, z0 + 13, quilt); w.box(X0 + 3, UF + 3, z0 + 10, X0 + 4, UF + 4, z0 + 13, B.bed);
        w.box(X0 + 1, UF + 1, z0 + 10, X0 + 2, UF + 6, z0 + 13, B.wood); w.box(X0 + 12, UF + 1, z0 + 10, X0 + 12, UF + 4, z0 + 13, B.wood);
      };
      room(Z0, B.quilt); room(56, B.quilt2); room(72, B.quilt);
      // 객실 A 옷장, B 가죽 가방과 수납장·촛대, C 궤짝·책과 촛대
      w.box(46, UF + 1, Z0 + 1, 50, UF + 9, Z0 + 2, B.frame); w.box(46, UF + 2, Z0 + 3, 50, UF + 8, Z0 + 3, B.wood); w.set(48, UF + 5, Z0 + 4, B.brass);
      w.box(46, UF + 1, 59, 50, UF + 3, 60, B.leather); w.box(46, UF + 4, 59, 50, UF + 4, 60, B.frameDk); w.set(48, UF + 3, 61, B.brass);
      w.box(40, UF + 1, 57, 44, UF + 7, 58, B.frame); w.box(40, UF + 2, 59, 44, UF + 6, 59, B.wood); w.set(42, UF + 4, 60, B.brass);
      w.box(X0 + 1, UF + 1, 64, X0 + 2, UF + 3, 65, B.wood); candleAt(X0 + 1, UF + 4, 64);
      w.box(45, UF + 1, 74, 51, UF + 3, 76, B.leather); w.box(45, UF + 4, 74, 51, UF + 4, 76, B.frameDk); for (const x of [46, 50]) w.box(x, UF + 1, 77, x, UF + 4, 77, B.brass);
      w.box(X0 + 1, UF + 1, 78, X0 + 2, UF + 3, 79, B.wood); w.box(X0 + 1, UF + 4, 78, X0 + 1, UF + 4, 79, B.book); w.set(X0 + 2, UF + 4, 79, B.book2); candleAt(X0 + 2, UF + 4, 78);
      lights.push({ name: 'roomB', p: [X0 + 2, UF + 6, 64.5], c: '#ffd890', i: 0.5, d: 18, flicker: 0.15, srcR: 6 });
      // 객실 B 침대 이불(부품)
      const quilt = w.prop({ name: 'quilt', pivot: [X0 + 8.5, UF + 4, 68] });
      quilt.box(X0 + 5, UF + 4, 66, X0 + 11, UF + 4, 69, B.quilt2);
      acts.push({
        name: '포근한 침대', hint: '객실 침대 이불이 부풀었다 가라앉으며 졸음이 쏟아지는 별가루가 피어나요', hit: [X0 + 3, UF + 1, 66, X0 + 11, UF + 5, 69],
        run: async a => {
          for (let k = 0; k < 2; k++) { await a.move('quilt', [0, 3.6, 0], 0.7); await a.move('quilt', [0, 0, 0], 0.9); }
          for (let k = 0; k < 6; k++) { a.burst([X0 + 8.5, UF + 7 + k * 0.8, 68], { n: 10, colors: ['#e8e0ff', '#ffffff', '#ffe9a0'], speed: 1.2, up: 2.4, life: 1.6, gravity: -0.8, spread: 1.2 }); await a.wait(0.3); }
        },
      });
      // 객실 A 덧창(부품): 서쪽 벽 z42..49
      const SZ = Z0 + 2;
      winAt(PW, SZ, UF + 4, 8, 6);
      for (let z = SZ; z <= SZ + 7; z++) for (let y = UF + 4; y <= UF + 9; y++) w.set(X0 + 1, y, z, 0);
      const shutL = w.prop({ name: 'shutL', pivot: [X0 + 1, UF + 7, SZ] }), shutR = w.prop({ name: 'shutR', pivot: [X0 + 1, UF + 7, SZ + 8] });
      for (const [p, z0] of [[shutL, SZ], [shutR, SZ + 4]]) for (let c = 0; c < 4; c++) for (let r = 0; r < 6; r++) p.set(X0 + 1, UF + 4 + r, z0 + c, r % 2 ? B.shutter : B.shutterDk);
      for (const [p, z] of [[shutL, SZ], [shutR, SZ + 7]]) { p.set(X0 + 1, UF + 5, z, B.hinge); p.set(X0 + 1, UF + 8, z, B.hinge); }
      lights.push({ name: 'sunA', p: [X0 + 3.5, UF + 7, SZ + 4], c: '#fff4d0', i: 0.2, d: 24, srcR: 6 });
      acts.push({
        name: '덧창 열기', hint: '2층 객실 덧창이 활짝 열리며 과수원 바람과 꽃잎이 들어와요', hit: [X0 + 1, UF + 3, SZ, X0 + 3, UF + 10, SZ + 7],
        run: async a => {
          await Promise.all([a.turn('shutL', [0, 1.5, 0], 1), a.turn('shutR', [0, -1.5, 0], 1)]);
          a.flash('sunA', 5, 3.5); a.wind(1.6, 3);
          for (let k = 0; k < 7; k++) { a.burst([X0 + 3, UF + 7, SZ + 4], { n: 14, colors: ['#ffd0e8', '#ffffff', '#fff080'], speed: 5, up: 1.2, life: 1.8, gravity: 0.6, spread: 2.4, flat: true }); await a.wait(0.35); }
          await a.wait(0.5);
          await Promise.all([a.turn('shutL', [0, 0, 0], 1), a.turn('shutR', [0, 0, 0], 1)]);
        },
      });
      landmarks.push({ name: '물레방아 여관', note: '벽난로와 사과주', p: [72, HT + 8, Z0 + 24] });
      return { lights, landmarks, acts };
    },
  });
})();
