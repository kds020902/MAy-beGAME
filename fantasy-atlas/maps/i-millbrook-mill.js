// 물레방앗간(하위 지도) — 물레방아 마을 동쪽 강변의 2층 방앗간 안. 서쪽 벽을 뚫고 들어온 물레 굴대와 큰 나무 톱니바퀴,
// 나무 받침 위의 맷돌 두 짝과 곡물 깔때기, 북쪽 처마 밑 자루 창고와 그 위 곡물 다락(자루 도르래), 동남쪽 방앗간지기 방.
// 남·동쪽 벽은 아랫단 돌벽 높이로 잘라 낮췄다 (마을). 2배 해상도(1칸 ≈ 25cm), playerScale 2.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 136, Hh = 88, G = 20;
  const X0 = 40, X1 = 99, Z0 = 40, Z1 = 91;          // 벽(바깥 둘레)
  const LF = G + 16;                                  // 다락 바닥(서는 높이 LF+1)
  MAPS.push({
    id: 'millbrook-mill', cat: 'village', sub: true, parent: 'millbrook', name: '물레방앗간', en: 'Millbrook · Watermill', color: '#d8c49a', seed: 1011, base: G, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    spawn: [95, G + 1, 66],
    desc: '강물이 돌리는 물레방아의 굴대가 서쪽 벽을 뚫고 들어와 큰 나무 톱니바퀴를 돌리고, 나무 받침 위 맷돌 두 짝이 밀을 고운 가루로 빻는다. 북쪽 처마 밑에는 밀가루 자루가 쌓여 있고, 그 위 곡물 다락에서는 도르래로 자루를 끌어올린다. 방앗간지기의 작은 방과 다락의 고양이가 있다.',
    info: { title: '장소 정보', en: 'WATERMILL', rows: [['1층', '맷돌방 · 자루 창고 · 방앗간지기 방'], ['2층', '곡물 다락 · 자루 도르래'], ['자랑', '강물이 돌리는 맷돌과 고운 밀가루']] },
    sky: ['#f4ead4', '#c8b490', '#fff4dc'], stars: false,
    hemi: ['#fff6e8', '#6a5a40', 0.66], sun: ['#fff2d8', 0.62, [-0.5, 1, -0.35]],
    night: { sky: ['#30282a', '#100c10', '#c08050'], stars: false, hemi: ['#c8b8a0', '#1a1410', 0.42], sun: ['#ffd8a8', 0.24, [-0.5, 1, -0.35]], haze: '#2a2420' },
    liquid: ['#2a6a9a', '#4a9ad0', '#e0f6ff'], liqSpeed: 1,
    fog: { start: 0.9, floor: G - 16, depth: 12, haze: [16, 0.05, 12], hazeColor: '#ece0c8' },
    camY: -4, zoom: 1.5,
    particles: [
      { n: 160, colors: ['#ffffff', '#f4ecd8', '#fff6d8'], mode: 'drift', speed: 0.2, wind: 0.12, area: [68, 64, 26], y0: G + 2, y1: G + 28, glow: true },
      { n: 60, colors: ['#ffffff', '#efe6d0'], mode: 'fall', speed: 0.3, area: [67.5, 63.5, 6], y0: G + 6, y1: G + 20, glow: false },
      { n: 16, colors: ['#ff9a3a', '#ffd070'], mode: 'rise', speed: 0.6, area: [95.5, 86, 1.2], y0: G + 3, y1: G + 10, glow: true },
    ],
    blocks: {
      grass: { c: '#6b4a30', top: '#6fae4a', v: 0.08 }, grass2: { c: '#6b4a30', top: '#86bc52', v: 0.08 }, dirt: { c: '#6b4a30', v: 0.08 }, rock: { c: '#7a7a80', v: 0.06, pat: 'stone' },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cobble2: { c: '#7e7a72', top: '#96928a', v: 0.06 }, cobbleJ: { c: '#6a665e', top: '#76726a', v: 0.04 }, path: { c: '#6b4a30', top: '#c8b48a', v: 0.1 },
      flower: { c: '#e86a8a', v: 0.05 }, flower2: { c: '#f0e060', v: 0.05 }, flower3: { c: '#ffffff', v: 0.03 }, flowerStem: { c: '#4a8a34', v: 0.08 },
      st1: { c: '#8e8c88', v: 0.05 }, st2: { c: '#7c7a76', v: 0.05 }, st3: { c: '#9c988e', v: 0.05 }, st4: { c: '#84887c', v: 0.05 }, mortar: { c: '#a49c8c', v: 0.04 }, sill: { c: '#b0aaa0', v: 0.04 },
      found: { c: '#8a8a88', v: 0.06, pat: 'stone' }, stoneDk: { c: '#6a6a6a', v: 0.06, pat: 'stone' }, plaster: { c: '#efe4c8', v: 0.03 }, frame: { c: '#5a3a24', v: 0.05 }, frameDk: { c: '#46301e', v: 0.04 },
      floorW: { c: '#8a6440', top: '#b08a5a', v: 0.04 }, floorW2: { c: '#7e5a38', top: '#a07c4e', v: 0.04 }, flag: { c: '#8e8a82', top: '#a8a49a', v: 0.04 }, flag2: { c: '#7e7a72', top: '#949088', v: 0.04 },
      plank: { c: '#9a6a40', v: 0.06, pat: 'plank' }, wood: { c: '#6a4428', v: 0.05 }, mullion: { c: '#ece4d0', v: 0.02 },
      door: { c: '#5a3822', v: 0.03, pat: 'plank' }, doorDk: { c: '#3e2616', v: 0.03 }, win: { c: '#ffd890', night: true, day: '#bfe4f4' }, shutter: { c: '#3a6a4a', v: 0.02 }, shutterDk: { c: '#2c563a', v: 0.02 }, hinge: { c: '#2e2e34', v: 0.02 },
      mstone: { c: '#b8b4ac', top: '#cac6be', v: 0.04 }, mstoneDk: { c: '#9a968e', v: 0.04 }, iron: { c: '#4a4a52', v: 0.03 }, ironDk: { c: '#33333a', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 },
      sack: { c: '#e8dcc0', v: 0.04 }, sack2: { c: '#d8c8a0', v: 0.04 }, flour: { c: '#f8f4ea', v: 0.02 }, wheat: { c: '#d8b84a', v: 0.08 }, wheatTop: { c: '#e8cc6a', v: 0.06 }, hay: { c: '#dcb456', v: 0.08 }, hay2: { c: '#c8a044', v: 0.08 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 }, brass: { c: '#c8a048', v: 0.03 }, mesh: { c: '#d8ccb0', v: 0.08 },
      bed: { c: '#ece4d4', v: 0.02 }, quilt: { c: '#7a9a5a', v: 0.04 }, quilt2: { c: '#5e7e44', v: 0.04 }, rug: { c: '#a85a3a', v: 0.04 }, rug2: { c: '#c8a050', v: 0.04 }, book: { c: '#8a3a3a', v: 0.03 }, pot: { c: '#3a3a3e', v: 0.03 },
      lampG: { c: '#ffe0a0', glow: true }, ember: { c: '#ff8a3a', glow: true }, flame: { c: '#ffd070', glow: true },
      catO: { c: '#e09048', v: 0.03 }, catW: { c: '#f4ece0', v: 0.02 }, catE: { c: '#3a5a2a', v: 0.02 }, pink: { c: '#e8a0a0', v: 0.02 },
    },
    build(w) {
      const B = w.id;
      const lights = [], acts = [], landmarks = [];
      // 낱돌 쌓기: 2칸 높이 돌 + 1칸 줄눈, 길이 5칸 돌을 줄마다 엇갈려 쌓는다. 줄눈이면 0
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const stone = (u, y, salt) => stoneAt(u, y, salt) || B.mortar;
      // 자루: 3×3, 5칸 높이, 묶은 주둥이
      const sack = (T, x, y, z, b) => {
        b = b || B.sack;
        for (let dz = 0; dz < 3; dz++) for (let dx = 0; dx < 3; dx++) {
          const corner = (dx !== 1 && dz !== 1);
          if (!corner) T.set(x + dx, y, z + dz, b);
          T.set(x + dx, y + 1, z + dz, (dx + dz) % 2 ? b : B.sack2);
          if (!corner) T.set(x + dx, y + 2, z + dz, b);
        }
        T.set(x + 1, y + 3, z + 1, B.rope); T.set(x + 1, y + 4, z + 1, B.sack2);
      };
      // 통: 가운데 (x,z), 볼록한 몸통, 쇠테 둘, 뚜껑
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
      // 창: 4폭 6높이, 가운데 창살·가로살, 창턱과 창틀(벽 안쪽으로 1칸 내민)
      const winAt = (P, u0, y0, wd, ht, inward) => {
        for (let r = 0; r < ht; r++) for (let c = 0; c < wd; c++) P(u0 + c, y0 + r, 0, (c === (wd >> 1) || r === (ht >> 1)) ? B.mullion : B.win);
        for (let c = -1; c <= wd; c++) { P(u0 + c, y0 - 1, 0, B.sill); P(u0 + c, y0 - 1, inward, B.sill); P(u0 + c, y0 + ht, 0, B.frame); P(u0 + c, y0 + ht, inward, B.frameDk); }
        for (let r = 0; r < ht; r++) { P(u0 - 1, y0 + r, inward, B.frame); P(u0 + wd, y0 + r, inward, B.frame); }
      };
      const PN = (u, y, d, b) => w.set(u, y, Z0 + d, b);      // 북쪽 벽: u = x, d = 안쪽(+z)
      const PW = (u, y, d, b) => w.set(X0 + d, y, u, b);      // 서쪽 벽: u = z, d = 안쪽(+x)

      // ── 바깥: 방앗간 둘레 풀밭과 동쪽 문 앞 돌길 ──
      MH.terrain(w, { floor: G - 16, height: () => G - 1, surface: (x, z) => hash3(x, 1, z) > 0.55 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      for (let x = X1 + 1; x < W - 3; x++) for (let z = 60; z <= 71; z++) {
        const row = Math.floor(x / 3), off = (row & 1) * 2;
        w.set(x, G - 1, z, (z === 60 || z === 71) ? B.path : (x % 3 === 2 || (z + off) % 4 === 3) ? B.cobbleJ : (hash3(row, (z + off) >> 2, 3) > 0.5 ? B.cobble : B.cobble2));
      }
      for (let k = 0; k < 140; k++) {
        const x = (hash3(k, 2, 9) * W) | 0, z = (hash3(k, 3, 9) * D) | 0;
        if (x >= X0 - 14 && x <= X1 + 3 && z >= Z0 - 2 && z <= Z1 + 2) continue;
        if (w.get(x, G - 1, z) !== B.grass && w.get(x, G - 1, z) !== B.grass2) continue;
        w.set(x, G, z, B.flowerStem); if (k % 3 === 0) w.set(x, G + 1, z, [B.flower, B.flower2, B.flower3][k % 3 === 0 ? (k >> 2) % 3 : 0]);
      }

      // ── 바닥: 널마루(널 두 폭, 이음매 엇갈림), 맷돌 둘레는 판석 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const strip = Math.floor(z / 3), seam = ((x + strip * 7) % 16) === 0;
        w.set(x, G, z, seam || (z % 3 === 2) ? B.floorW2 : B.floorW);
      }
      for (let z = 52; z <= 75; z++) for (let x = 48; x <= 79; x++) {
        const row = Math.floor(z / 4), off = (row & 1) * 3;
        w.set(x, G, z, (z % 4 === 3 || (x + off) % 6 === 5) ? B.flag2 : B.flag);
      }

      // ── 벽: 북·서쪽은 아랫단 낱돌 + 회벽과 안쪽으로 내민 목골, 남·동쪽은 낱돌 벽 네 단과 나무 갓 ──
      const HT = G + 30;
      for (let y = G + 1; y <= HT; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z0, y <= G + 5 ? stone(x, y, 3) : B.plaster);
        for (let z = Z0; z <= Z1; z++) w.set(X0, y, z, y <= G + 5 ? stone(z, y, 4) : B.plaster);
      }
      // 목골: 기둥(8칸마다), 아래 깔도리·다락 도리·위 도리, 가새
      for (const [P, u0, u1] of [[PN, X0 + 1, X1], [PW, Z0 + 1, Z1]]) {
        for (let u = u0; u <= u1; u++) for (const y of [G + 6, LF - 1, LF, HT]) P(u, y, 1, B.frame);
        for (let u = u0; u <= u1; u++) P(u, G + 5, 1, B.sill);
        for (let u = u0 + 3; u <= u1; u += 8) for (let y = G + 6; y <= HT; y++) P(u, y, 1, B.frameDk);
        for (let u = u0 + 3; u + 8 <= u1; u += 16) for (let k = 0; k <= 7; k++) { P(u + 1 + k, LF + 1 + Math.round(k * 12 / 7), 1, B.frame); P(u + 1 + k, G + 7 + Math.round((7 - k) * 7 / 7), 1, B.frame); }
      }
      for (let y = G + 1; y <= G + 4; y++) {
        for (let x = X0; x <= X1; x++) w.set(x, y, Z1, stone(x, y, 5));
        for (let z = Z0; z <= Z1; z++) w.set(X1, y, z, stone(z, y, 6));
      }
      for (let x = X0; x <= X1; x++) { w.set(x, G + 5, Z1, B.wood); w.set(x, G + 6, Z1, B.frame); }
      for (let z = Z0; z <= Z1; z++) { w.set(X1, G + 5, z, B.wood); w.set(X1, G + 6, z, B.frame); }
      w.box(X1 - 1, G + 1, Z1 - 1, X1, G + 9, Z1, B.frameDk);
      // 북쪽 다락 창, 서쪽 아래층·다락 창
      for (const x0 of [50, 76, 88]) winAt(PN, x0, LF + 4, 4, 6, 1);
      for (const [z0, y0] of [[70, G + 8], [82, LF + 4], [50, LF + 4]]) winAt(PW, z0, y0, 4, 6, 1);
      lights.push({ name: 'sunW', p: [X0 + 4.5, G + 10, 72], c: '#fff4d8', i: 0.7, d: 28, srcR: 6 });

      // ── 동쪽 문: 문틀과 상인방, 안쪽으로 열린 판자 문짝, 바깥 등 ──
      const DZ = 64;
      for (let y = G + 1; y <= G + 9; y++) for (let z = DZ; z <= DZ + 4; z++) w.set(X1, y, z, 0);
      for (const z of [DZ - 1, DZ + 5]) w.box(X1, G + 1, z, X1, G + 10, z, B.frameDk);
      w.box(X1, G + 10, DZ - 1, X1, G + 10, DZ + 5, B.frameDk); w.box(X1 + 1, G + 11, DZ - 2, X1 + 1, G + 11, DZ + 6, B.sill);
      for (let x = X1 + 1; x <= X1 + 3; x++) for (let z = DZ - 1; z <= DZ + 5; z++) w.set(x, G, z, x === X1 + 1 ? B.sill : B.st2);
      for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) w.set(X1 - 1 - c, G + 1 + r, DZ - 1, (c === 0 || c === 4 || r === 0 || r === 4 || r === 8) ? B.doorDk : B.door);
      w.set(X1 - 4, G + 5, DZ - 2, B.iron);
      w.box(X1 + 1, G + 9, DZ - 3, X1 + 2, G + 9, DZ - 3, B.iron); w.set(X1 + 2, G + 8, DZ - 3, B.ironDk); w.box(X1 + 2, G + 6, DZ - 3, X1 + 2, G + 7, DZ - 3, B.lampG); w.set(X1 + 2, G + 5, DZ - 3, B.ironDk);
      lights.push({ name: 'doorLamp', p: [X1 + 2.5, G + 7, DZ - 2.5], c: '#ffd890', i: 0.7, d: 20, flicker: 0.1, night: true });
      acts.push(OR.goAct({ at: [X1 + 1, G + 1, DZ + 2], h: 8, hit: [X1 - 1, G + 1, DZ, X1, G + 9, DZ + 4], name: '밖으로 나가기', goto: 'millbrook', hint: '문을 열고 물레방아가 도는 마을로 나가요' }));

      // ── 다락(북쪽 띠)과 서쪽 벽을 따라 오르는 계단 · 다락 복도 ──
      const LZ = Z0 + 15;                                 // 다락 가장자리 z
      for (let z = Z0 + 1; z <= LZ; z++) for (let x = X0 + 1; x <= X1 - 1; x++) w.set(x, LF, z, (x + (z >> 2) * 5) % 14 === 0 || z % 3 === 2 ? B.floorW2 : B.floorW);
      for (let x = X0 + 2; x <= X1 - 1; x += 4) w.box(x, LF - 1, Z0 + 1, x, LF - 1, LZ, B.frame);   // 장선
      w.box(X0 + 1, LF - 2, LZ - 1, X1 - 1, LF - 1, LZ, B.frameDk);                                // 가장자리 보
      for (let x = X0 + 8; x <= X1 - 3; x += 12) {
        w.box(x, G + 1, LZ - 1, x + 1, LF - 3, LZ, B.frame);
        w.line(x - 3, LF - 3, LZ, x, LF - 6, LZ, B.frame); w.line(x + 4, LF - 3, LZ, x + 1, LF - 6, LZ, B.frame);   // 까치발
      }
      // 난간: 손잡이(LF+5)와 중간 살(LF+2), 3칸마다 동자
      const railAt = (x, z, post) => { w.set(x, LF + 5, z, B.wood); w.set(x, LF + 2, z, B.wood); if (post) for (let y = LF + 1; y <= LF + 4; y++) w.set(x, y, z, B.frame); };
      w.box(X0 + 1, LF, LZ + 1, X0 + 4, LF, 73, B.floorW);                   // 서쪽 다락 복도(폭 4)
      w.box(X0 + 5, LF - 1, LZ + 1, X0 + 5, LF, 73, B.frameDk);
      // 계단: 한 단 1칸 높이, 16단(z89 → z74)
      for (let k = 0; k < 16; k++) { const z = Z1 - 2 - k; if (k > 0) w.box(X0 + 1, G + 1, z, X0 + 4, G + k, z, B.wood); w.box(X0 + 1, G + 1 + k, z, X0 + 4, G + 1 + k, z, B.plank); }
      for (let k = 0; k < 16; k++) { const z = Z1 - 2 - k; w.set(X0 + 5, G + 4 + k, z, B.wood); if (k % 3 === 0) for (let y = G + 2 + k; y <= G + 3 + k; y++) w.set(X0 + 5, y, z, B.frame); }
      w.box(X0 + 5, G + 1, 74, X0 + 5, LF - 2, 74, B.frame);
      for (let x = X0 + 6; x <= X1 - 1; x++) if (x < 88 || x > 95) railAt(x, LZ, x % 3 === 0 || x === 87 || x === 96);
      for (let z = LZ + 1; z <= 73; z++) railAt(X0 + 5, z, z % 3 === 0 || z === 73);

      // ── 물레 굴대와 큰 나무 톱니바퀴(부품) ──
      const GZ = 63, GY = G + 11, GX = 52;
      w.box(X0 - 13, GY - 1, GZ - 1, GX - 4, GY + 1, GZ + 1, B.wood);
      for (let x = X0 - 12; x <= GX - 4; x += 6) w.box(x, GY - 1, GZ - 1, x, GY + 1, GZ + 1, B.iron);
      for (let y = GY - 2; y <= GY + 2; y++) for (let z = GZ - 2; z <= GZ + 2; z++) if (Math.abs(y - GY) === 2 || Math.abs(z - GZ) === 2) w.set(X0, y, z, B.ironDk);
      for (let y = G + 1; y <= GY - 2; y++) for (let z = GZ - 3; z <= GZ + 3; z++) for (let x = GX + 4; x <= GX + 7; x++) w.set(x, y, z, (x === GX + 4 || x === GX + 7 || Math.abs(z - GZ) === 3) ? stone(x + z, y, 8) : B.mortar);
      w.box(GX + 4, GY - 1, GZ - 3, GX + 7, GY - 1, GZ + 3, B.sill);
      w.box(GX + 4, GY, GZ - 1, GX + 5, GY, GZ + 1, B.ironDk); w.box(GX + 4, GY + 1, GZ - 2, GX + 5, GY + 1, GZ + 2, B.iron);
      for (const dz of [-6, 6]) w.box(X0 - 4, G - 3, GZ + dz, X0 - 3, GY + 3, GZ + dz + (dz > 0 ? 1 : -1) * 0, B.wood);
      w.box(X0 - 4, GY + 3, GZ - 6, X0 - 3, GY + 3, GZ + 6, B.wood);
      // 바깥 물길: 바퀴를 돌린 물이 벽 밑으로 흘러 나간다
      for (let z = GZ - 4; z <= GZ + 4; z++) for (let x = X0 - 12; x <= X0 - 3; x++) {
        const edge = Math.abs(z - GZ) === 4;
        w.set(x, G - 1, z, edge ? B.found : 0); w.set(x, G - 2, z, edge ? B.found : 0); w.set(x, G - 3, z, B.rock);
        if (!edge) w.liquid(x, z, G - 1);
      }
      const gear = w.prop({ name: 'gear', pivot: [GX + 0.5, GY + 0.5, GZ + 0.5], axis: 'x', speed: 0.35 });
      for (let dy = -8; dy <= 8; dy++) for (let dz = -8; dz <= 8; dz++) {
        const r = Math.hypot(dy, dz), ang = Math.atan2(dy, dz);
        if (r > 7.4) continue;
        const rim = r > 5.4, spoke = (Math.abs(dy) <= 1 || Math.abs(dz) <= 1) && r > 2.2;
        if (rim) {
          for (const x of [GX - 1, GX]) gear.set(x, GY + dy, GZ + dz, r > 6.6 ? B.wood : B.plank);
          const cog = ((Math.floor((ang + Math.PI) / (Math.PI / 10)) & 1) === 0) && r > 5.8 && r < 7.2;   // 바깥 면의 나무 톱니 20개
          if (cog) { gear.set(GX + 1, GY + dy, GZ + dz, B.plank); gear.set(GX + 2, GY + dy, GZ + dz, B.wood); }
        } else if (spoke) for (const x of [GX - 1, GX]) gear.set(x, GY + dy, GZ + dz, B.wood);
        if (r <= 2.2) for (let x = GX - 3; x <= GX + 3; x++) gear.set(x, GY + dy, GZ + dz, r < 1.2 ? B.ironDk : (x === GX - 3 || x === GX + 3) ? B.iron : B.wood);
      }

      // ── 맷돌 받침(나무 단), 아랫돌과 통, 윗돌(부품), 곡물 깔때기 ──
      const MX = 67, MZ = 63, PT = G + 6;
      for (let z = 56; z <= 69; z++) for (let x = 60; x <= 75; x++) {
        const edge = x === 60 || x === 75 || z === 56 || z === 69;
        for (let y = G + 1; y <= PT; y++) {
          if (y === PT) w.set(x, y, z, (x + z * 3) % 5 === 0 ? B.floorW2 : B.plank);
          else if (edge) w.set(x, y, z, y === PT - 1 ? B.frame : ((z === 56 || z === 69) ? (x - 60) % 5 === 0 : (z - 56) % 5 === 0) ? B.frameDk : B.plank);
        }
      }
      for (const [x, z] of [[60, 56], [74, 56], [60, 68], [74, 68]]) w.box(x, G + 1, z, x + 1, PT, z + 1, B.frameDk);
      for (let z = 58; z <= 63; z++) { w.box(76, G + 1, z, 77, G + 4, z, B.plank); w.box(78, G + 1, z, 79, G + 2, z, B.plank); w.set(76, G + 4, z, B.wood); w.set(78, G + 2, z, B.wood); }
      for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) {
        const d = Math.hypot(dx, dz);
        if (d <= 5.4) { w.set(MX + dx, PT + 1, MZ + dz, B.mstoneDk); if (d <= 5.4) w.set(MX + dx, PT + 2, MZ + dz, (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 6)) & 1) ? B.mstone : B.mstoneDk); }
        else if (d <= 7) { w.set(MX + dx, PT + 1, MZ + dz, B.wood); w.set(MX + dx, PT + 2, MZ + dz, (Math.round((Math.atan2(dz, dx) + 4) * 4) % 3) ? B.plank : B.iron); }
      }
      const runner = w.prop({ name: 'runner', pivot: [MX + 0.5, PT + 4, MZ + 0.5], axis: 'y', speed: 0.25 });
      for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
        const d = Math.hypot(dx, dz);
        if (d > 5.4 || d < 1.1) continue;
        runner.set(MX + dx, PT + 3, MZ + dz, B.mstone);
        runner.set(MX + dx, PT + 4, MZ + dz, d > 4.6 ? B.mstoneDk : (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 4)) & 1) ? B.mstone : B.flour);
      }
      for (const s of [-1, 1]) { runner.set(MX + s * 3, PT + 5, MZ, B.iron); runner.set(MX + s * 2, PT + 5, MZ, B.iron); }
      for (const x of [MX - 6, MX + 6]) w.box(x, PT + 1, MZ - 7, x, PT + 15, MZ - 7, B.frame);
      w.box(MX - 6, PT + 15, MZ - 7, MX + 6, PT + 15, MZ - 7, B.frameDk);
      for (const x of [MX - 6, MX + 6]) w.box(x, PT + 8, MZ - 6, x, PT + 8, MZ - 2, B.wood);
      w.box(MX - 6, PT + 8, MZ - 2, MX + 6, PT + 8, MZ - 2, B.wood);
      // 깔때기: 거꾸로 선 네모뿔, 판자 벽과 밀알
      for (let k = 0; k < 5; k++) {
        const y = PT + 9 + k, h = 1 + k;
        for (let dz = -h; dz <= h; dz++) for (let dx = -h; dx <= h; dx++) {
          const edge = Math.max(Math.abs(dx), Math.abs(dz)) === h;
          w.set(MX + dx, y, MZ - 2 + dz, edge ? (k === 4 ? B.frame : B.plank) : k >= 3 ? (k === 4 ? B.wheatTop : B.wheat) : 0);
        }
      }
      w.box(MX - 5, PT + 8, MZ - 2, MX + 5, PT + 8, MZ - 2, B.wood);
      w.box(MX, PT + 7, MZ - 1, MX, PT + 7, MZ, B.plank);                // 공급 홈(신)
      w.line(MX, PT + 16, MZ - 7, MX, LF + 1, LZ, B.plank); w.line(MX + 1, PT + 16, MZ - 7, MX + 1, LF + 1, LZ, B.plank);   // 다락에서 내려오는 곡물 홈통
      // 가루 받는 홈과 자루
      w.box(74, PT - 1, 64, 77, PT - 1, 65, B.wood); w.box(76, PT - 3, 64, 77, PT - 2, 65, B.plank);
      sack(w, 76, G + 1, 66); w.set(77, G + 6, 67, 0); w.box(77, G + 5, 66, 77, G + 5, 67, B.flour);
      const LX = MX + 10;
      w.set(LX, LF - 1, LZ + 1, B.iron); w.set(LX, LF - 2, LZ + 1, B.iron); w.box(LX - 1, LF - 3, LZ + 1, LX + 1, LF - 3, LZ + 1, B.ironDk);
      w.box(LX, LF - 5, LZ + 1, LX, LF - 4, LZ + 1, B.lampG); w.set(LX, LF - 6, LZ + 1, B.ironDk);
      lights.push({ name: 'millLamp', p: [LX + 0.5, LF - 4, LZ + 1.5], c: '#ffe0a0', i: 0.9, d: 30, flicker: 0.08 });
      acts.push({
        name: '맷돌 돌리기', hint: '윗돌이 힘차게 돌며 고운 밀가루가 하얗게 피어올라요', hit: [60, PT, 56, 75, PT + 6, 69],
        run: async a => {
          a.spin('runner', 9, 4.5); a.spin('gear', 6, 4.5);
          for (let k = 0; k < 9; k++) { a.burst([MX + 0.5 + Math.cos(k) * 6, PT + 4.5, MZ + 0.5 + Math.sin(k) * 6], { n: 24, colors: ['#ffffff', '#f4ecd8', '#fff8e8'], speed: 4.8, up: 3.2, life: 1.6, gravity: 0.4, spread: 2.4 }); await a.wait(0.45); }
        },
      });
      acts.push({
        name: '굴대 톱니바퀴', hint: '강물이 세게 밀려와 굴대가 빨라지고 나무 톱니바퀴가 덜컹덜컹 돌아요', hit: [GX - 3, G + 1, GZ - 8, GX + 3, GY + 8, GZ + 8],
        run: async a => {
          a.spin('gear', 10, 4);
          for (let k = 0; k < 7; k++) { a.burst([X0 - 6, G, GZ + 0.5], { n: 20, colors: ['#d8f0ff', '#8ac8f0', '#ffffff'], speed: 6, up: 3, life: 0.9, gravity: 12, spread: 2 }); a.burst([GX + 2.5, GY + 8, GZ + 0.5], { n: 8, colors: ['#c8a070', '#e8d8b8'], speed: 4, up: 4, life: 0.8, gravity: 8, spread: 2 }); await a.wait(0.5); }
        },
      });

      // ── 밀가루 체질 틀(부품): 다리 위에서 좌우로 흔든다 ──
      const SX = 62, SZ = 78;
      for (const [x, z] of [[SX, SZ], [SX + 8, SZ], [SX, SZ + 4], [SX + 8, SZ + 4]]) w.box(x, G + 1, z, x, G + 4, z, B.wood);
      w.box(SX, G + 3, SZ, SX + 8, G + 3, SZ, B.wood); w.box(SX, G + 3, SZ + 4, SX + 8, G + 3, SZ + 4, B.wood);
      for (let x = SX + 2; x <= SX + 6; x++) for (let z = SZ + 1; z <= SZ + 3; z++) { w.set(x, G + 1, z, B.flour); if (Math.abs(x - SX - 4) + Math.abs(z - SZ - 2) <= 1) w.set(x, G + 2, z, B.flour); }
      const sieve = w.prop({ name: 'sieve', pivot: [SX + 4.5, G + 6, SZ + 2.5] });
      sieve.walls(SX - 2, G + 5, SZ - 1, SX + 10, G + 6, SZ + 5, B.plank); sieve.box(SX - 1, G + 5, SZ, SX + 9, G + 5, SZ + 4, B.mesh);
      sieve.box(SX - 4, G + 6, SZ + 2, SX - 3, G + 6, SZ + 2, B.wood);
      for (let x = SX + 1; x <= SX + 7; x += 2) sieve.set(x, G + 6, SZ + 2, B.flour);
      acts.push({
        name: '밀가루 체질', hint: '체가 앞뒤로 흔들리며 밀가루가 눈처럼 체 아래로 내려앉아요', hit: [SX - 4, G + 1, SZ - 1, SX + 10, G + 7, SZ + 5],
        run: async a => {
          for (let k = 0; k < 6; k++) {
            await a.move('sieve', [k % 2 ? -4 : 4, 0, 0], 0.3);
            a.burst([SX + 4.5, G + 4.2, SZ + 2.5], { n: 28, colors: ['#ffffff', '#f8f4ea', '#efe6d0'], speed: 1.6, up: -1, life: 1.4, gravity: 2, spread: 4 });
          }
          await a.move('sieve', [0, 0, 0], 0.4);
        },
      });

      // ── 큰 저울(부품: 남북으로 놓인 저울대와 두 접시) ──
      const KX = 86, KZ = 66;
      w.box(KX, G + 1, KZ, KX, G + 12, KZ, B.wood); w.box(KX - 2, G + 1, KZ - 2, KX + 2, G + 1, KZ + 2, B.wood); w.box(KX - 1, G + 2, KZ - 1, KX + 1, G + 2, KZ + 1, B.frame);
      const scale = w.prop({ name: 'scale', pivot: [KX + 0.5, G + 13.5, KZ + 0.5], axis: 'x' });
      scale.box(KX, G + 13, KZ - 6, KX, G + 13, KZ + 6, B.brass); scale.box(KX, G + 14, KZ - 1, KX, G + 15, KZ + 1, B.brass); scale.set(KX, G + 16, KZ, B.brass);
      for (const s of [-1, 1]) {
        const pz = KZ + s * 5;
        scale.box(KX, G + 10, pz, KX, G + 12, pz, B.iron);
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { scale.set(KX + dx, G + 7, pz + dz, B.brass); if (Math.abs(dx) === 2 || Math.abs(dz) === 2) scale.set(KX + dx, G + 8, pz + dz, B.brass); }
      }
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { scale.set(KX + dx, G + 8, KZ - 5 + dz, (dx + dz) % 2 ? B.sack : B.sack2); if (!dx || !dz) scale.set(KX + dx, G + 9, KZ - 5 + dz, B.sack); }
      for (const [dx, dz, h] of [[-1, -1, 2], [1, 0, 1], [0, 1, 1]]) for (let y = 0; y < h; y++) scale.set(KX + dx, G + 8 + y, KZ + 5 + dz, B.ironDk);
      acts.push({
        name: '큰 저울', hint: '밀가루 자루와 추를 올린 큰 저울이 기우뚱거리다 반듯하게 맞춰져요', hit: [KX - 2, G + 1, KZ - 7, KX + 2, G + 16, KZ + 7],
        run: async a => {
          await a.turn('scale', [0.5, 0, 0], 0.7); await a.turn('scale', [-0.42, 0, 0], 0.9); await a.turn('scale', [0.24, 0, 0], 0.8); await a.turn('scale', [-0.1, 0, 0], 0.6);
          a.burst([KX + 0.5, G + 10, KZ - 4.5], { n: 16, colors: ['#ffffff', '#f4ecd8'], speed: 3, up: 3, life: 1, gravity: 2, spread: 1.6 });
          await a.turn('scale', [0, 0, 0], 0.6);
          a.burst([KX + 0.5, G + 17, KZ + 0.5], { n: 18, colors: ['#ffe9a0', '#ffffff'], speed: 3.2, up: 4, life: 0.9, gravity: -0.8, spread: 1 });
        },
      });

      // ── 자루 창고(다락 아래 북쪽): 자루 더미, 통, 건초 ──
      for (let c = 0; c < 6; c++) for (let r = 0; r < 2; r++) {
        const x = 72 + c * 4, z = Z0 + 2 + r * 4, h = hash3(c, r, 5);
        sack(w, x, G + 1, z, (c + r) % 2 ? B.sack2 : B.sack);
        if (h > 0.4 && r === 0) sack(w, x, G + 6, z, B.sack);
      }
      for (const [x, z, h] of [[46, 46, 6], [52, 46, 6], [46, 52, 6], [49, 49, 6]]) barrel(x, G + 1 + (x === 49 ? 6 : 0), z, h);
      for (let x = 58; x <= 63; x++) for (let z = Z0 + 2; z <= Z0 + 5; z++) for (let y = G + 1; y <= G + 6; y++) w.set(x, y, z, (x === 59 || x === 62) && (y === G + 6 || z === Z0 + 2 || z === Z0 + 5) ? B.rope : hash3(x, y, z) > 0.6 ? B.hay2 : B.hay);
      for (const x of [78, 84]) barrel(x, G + 1, 51, 6);

      // ── 다락: 곡물 궤짝, 자루, 도르래와 자루(부품), 셔터 창(부품), 고양이(부품) ──
      for (const x of [43, 51]) {
        w.walls(x, LF + 1, Z0 + 2, x + 7, LF + 4, Z0 + 7, B.plank);
        for (const [cx, cz] of [[x, Z0 + 2], [x + 7, Z0 + 2], [x, Z0 + 7], [x + 7, Z0 + 7]]) w.box(cx, LF + 1, cz, cx, LF + 5, cz, B.frame);
        w.box(x + 1, LF + 1, Z0 + 3, x + 6, LF + 3, Z0 + 6, B.wheat); w.box(x + 1, LF + 4, Z0 + 3, x + 6, LF + 4, Z0 + 6, B.wheatTop);
      }
      for (let c = 0; c < 3; c++) sack(w, 70 + c * 4, LF + 1, Z0 + 2, c % 2 ? B.sack2 : B.sack);
      sack(w, 72, LF + 6, Z0 + 2, B.sack);
      const HX = 92, HZ = LZ + 2;
      for (const x of [88, 95]) w.box(x, LF + 1, LZ - 3, x, LF + 13, LZ - 2, B.frame);
      w.box(88, LF + 13, LZ - 3, 95, LF + 14, LZ - 2, B.frameDk);
      w.box(HX, LF + 13, LZ - 1, HX, LF + 14, HZ, B.wood); w.line(HX, LF + 8, LZ - 2, HX, LF + 12, HZ - 1, B.wood);
      w.box(HX, LF + 11, HZ - 1, HX, LF + 12, HZ + 1, B.iron); w.set(HX, LF + 10, HZ, B.ironDk);
      const L0 = 1 + (LF + 9) - (G + 6), hdrop = (LF + 3) - (G + 5);
      MH.rope(w, 'hrope', HX, LF + 9, HZ, L0, B.rope);
      const hsack = w.prop({ name: 'hsack', pivot: [HX + 0.5, G + 3, HZ + 0.5] });
      sack(hsack, HX - 1, G + 1, HZ - 1, B.sack);
      acts.push({
        name: '자루 도르래', hint: '도르래가 끼익 돌며 밀가루 자루가 다락 난간까지 끌려 올라가요', hit: [HX - 2, G + 1, HZ - 2, HX + 2, LF + 14, HZ + 2],
        run: async a => {
          await Promise.all([a.move('hsack', [0, hdrop, 0], 2.4, t => t), a.rope('hrope', L0, Math.max(1, L0 - hdrop), 2.4, t => t)]);
          a.burst([HX + 0.5, LF + 3, HZ + 0.5], { n: 32, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], speed: 5, up: 3, life: 1.3, gravity: 2, spread: 2.8 });
          await a.wait(1);
          await Promise.all([a.move('hsack', [0, 0, 0], 2.2, t => t), a.rope('hrope', L0, L0, 2.2, t => t)]);
        },
      });
      // 셔터 창: 다락 북쪽 벽 x60..67
      const WX0 = 60;
      winAt(PN, WX0, LF + 4, 8, 6, 1);
      for (let x = WX0; x <= WX0 + 7; x++) for (let y = LF + 4; y <= LF + 9; y++) w.set(x, y, Z0 + 1, 0);
      const shutL = w.prop({ name: 'shutL', pivot: [WX0, LF + 7, Z0 + 1] }), shutR = w.prop({ name: 'shutR', pivot: [WX0 + 8, LF + 7, Z0 + 1] });
      for (const [p, x0] of [[shutL, WX0], [shutR, WX0 + 4]]) for (let c = 0; c < 4; c++) for (let r = 0; r < 6; r++) {
        p.set(x0 + c, LF + 4 + r, Z0 + 1, r % 2 ? B.shutter : B.shutterDk);
      }
      for (const [p, x] of [[shutL, WX0], [shutR, WX0 + 7]]) { p.set(x, LF + 5, Z0 + 1, B.hinge); p.set(x, LF + 8, Z0 + 1, B.hinge); }
      lights.push({ name: 'loftSun', p: [WX0 + 4, LF + 7, Z0 + 4.5], c: '#fff4d0', i: 0.2, d: 28, srcR: 6 });
      acts.push({
        name: '다락 창 열기', hint: '다락 덧창이 활짝 열리며 햇살과 함께 밀가루 먼지가 반짝여요', hit: [WX0 - 1, LF + 3, Z0 + 1, WX0 + 8, LF + 10, Z0 + 3],
        run: async a => {
          await Promise.all([a.turn('shutL', [0, -1.5, 0], 1), a.turn('shutR', [0, 1.5, 0], 1)]);
          a.flash('loftSun', 5, 3.5); a.glow(1.4, 3);
          for (let k = 0; k < 6; k++) { a.burst([WX0 + 4, LF + 7 - k * 1.6, Z0 + 4 + k * 2], { n: 18, colors: ['#fff6d8', '#ffffff', '#ffe9a0'], speed: 1.2, up: -0.8, life: 1.8, gravity: 0.6, spread: 3.2 }); await a.wait(0.4); }
          await a.wait(0.6);
          await Promise.all([a.turn('shutL', [0, 0, 0], 1), a.turn('shutR', [0, 0, 0], 1)]);
        },
      });
      // 고양이: 다락 마루에 웅크린 얼룩 고양이(몸통·흰 배·머리·귀·눈·코·꼬리)
      const CX = 76, CZ = Z0 + 9, CY = LF + 1;
      const cat = w.prop({ name: 'cat', pivot: [CX + 2, CY, CZ + 1] });
      for (let x = CX; x <= CX + 4; x++) for (let z = CZ; z <= CZ + 1; z++) { cat.set(x, CY, z, z === CZ + 1 && x > CX && x < CX + 4 ? B.catW : B.catO); cat.set(x, CY + 1, z, (x + z) % 3 ? B.catO : B.catW); }
      for (let x = CX + 5; x <= CX + 7; x++) for (let z = CZ; z <= CZ + 1; z++) for (let y = CY + 1; y <= CY + 3; y++) cat.set(x, y, z, y === CY + 1 && x === CX + 7 ? B.catW : B.catO);
      cat.set(CX + 5, CY + 4, CZ, B.catO); cat.set(CX + 5, CY + 4, CZ + 1, B.catO); cat.set(CX + 7, CY + 4, CZ, B.pink); cat.set(CX + 7, CY + 4, CZ + 1, B.pink);
      cat.set(CX + 8, CY + 3, CZ, B.catE); cat.set(CX + 8, CY + 3, CZ + 1, B.catE); cat.set(CX + 8, CY + 2, CZ, B.pink);
      cat.set(CX - 1, CY, CZ, B.catO); cat.set(CX - 2, CY + 1, CZ, B.catO); cat.set(CX - 2, CY + 2, CZ, B.catO); cat.set(CX - 2, CY + 3, CZ, B.catW);
      acts.push({
        name: '방앗간 고양이', hint: '다락 고양이가 생쥐를 쫓아 폴짝 뛰었다가 밀가루를 뒤집어쓰고 재채기해요', hit: [CX - 2, CY, CZ - 1, CX + 8, CY + 5, CZ + 2],
        run: async a => {
          await a.move('cat', [-6, 5, 1], 0.35); await a.move('cat', [-12, 0, 2], 0.35);
          a.burst([CX - 10, CY + 2, CZ + 2.5], { n: 44, colors: ['#ffffff', '#f8f4ea', '#efe6d0'], speed: 6, up: 4, life: 1.4, gravity: 2, spread: 2.8 });
          await a.wait(0.8);
          for (let k = 0; k < 2; k++) { await a.move('cat', [-12, 1.2, 2], 0.12); a.burst([CX - 6, CY + 3, CZ + 1.5], { n: 20, colors: ['#ffffff', '#f4ecd8'], speed: 4.4, up: 2, life: 0.8, gravity: 1.2, spread: 1.2 }); await a.move('cat', [-12, 0, 2], 0.12); await a.wait(0.4); }
          await a.move('cat', [-6, 5, 1], 0.35); await a.move('cat', [0, 0, 0], 0.35);
        },
      });

      // ── 방앗간지기 방(남동쪽): 낮은 칸막이, 침대, 작은 화덕과 굴뚝, 탁자와 책 ──
      const RX = 78, RZ = 74;
      for (let x = RX; x <= X1 - 1; x++) if (x < 84 || x > 88) { w.box(x, G + 1, RZ, x, G + 4, RZ, x % 4 === 2 ? B.frame : B.plank); w.set(x, G + 5, RZ, B.wood); }
      for (let z = RZ; z <= Z1 - 1; z++) { w.box(RX, G + 1, z, RX, G + 4, z, z % 4 === 2 ? B.frame : B.plank); w.set(RX, G + 5, z, B.wood); }
      for (const x of [83, 89]) w.box(x, G + 1, RZ, x, G + 7, RZ, B.frameDk);
      // 침대: 나무 틀, 이불(줄무늬), 베개, 머리판
      w.box(RX + 2, G + 1, Z1 - 7, RX + 11, G + 2, Z1 - 2, B.wood);
      for (let x = RX + 2; x <= RX + 11; x++) for (let z = Z1 - 7; z <= Z1 - 2; z++) { w.set(x, G + 3, z, x >= RX + 10 ? B.bed : ((x >> 1) & 1) ? B.quilt : B.quilt2); }
      w.box(RX + 10, G + 4, Z1 - 6, RX + 11, G + 4, Z1 - 3, B.bed);
      w.box(RX + 12, G + 1, Z1 - 7, RX + 12, G + 6, Z1 - 2, B.wood); w.box(RX + 1, G + 1, Z1 - 7, RX + 1, G + 4, Z1 - 2, B.wood);
      for (let x = RX + 3; x <= RX + 10; x++) for (let z = RZ + 2; z <= RZ + 6; z++) w.set(x, G, z, (x === RX + 3 || x === RX + 10 || z === RZ + 2 || z === RZ + 6) ? B.rug2 : B.rug);
      // 화덕
      for (let x = X1 - 6; x <= X1 - 1; x++) for (let z = Z1 - 5; z <= Z1 - 1; z++) for (let y = G + 1; y <= G + 5; y++) w.set(x, y, z, y === G + 5 ? B.sill : stone(x + z, y, 12));
      w.box(X1 - 4, G + 2, Z1 - 5, X1 - 3, G + 3, Z1 - 4, 0); w.box(X1 - 4, G + 2, Z1 - 4, X1 - 3, G + 2, Z1 - 4, B.ember); w.set(X1 - 4, G + 3, Z1 - 4, B.flame);
      w.box(X1 - 4, G + 6, Z1 - 3, X1 - 3, G + 7, Z1 - 2, B.pot); w.set(X1 - 4, G + 8, Z1 - 3, B.iron);
      for (let y = G + 6; y <= G + 16; y++) for (let x = X1 - 5; x <= X1 - 2; x++) w.set(x, y, Z1 - 1, stone(x, y, 13));
      lights.push({ name: 'stove', p: [X1 - 3, G + 3, Z1 - 5.5], c: '#ff9a4a', i: 0.8, d: 18, flicker: 0.25 });
      // 탁자와 걸상, 책과 촛불
      w.box(X1 - 7, G + 4, RZ + 3, X1 - 3, G + 4, RZ + 6, B.plank);
      for (const [x, z] of [[X1 - 7, RZ + 3], [X1 - 3, RZ + 3], [X1 - 7, RZ + 6], [X1 - 3, RZ + 6]]) w.box(x, G + 1, z, x, G + 3, z, B.wood);
      w.box(X1 - 6, G + 5, RZ + 4, X1 - 5, G + 5, RZ + 5, B.book); w.set(X1 - 4, G + 5, RZ + 5, B.wood); w.set(X1 - 4, G + 6, RZ + 5, B.flame);
      w.box(X1 - 10, G + 1, RZ + 4, X1 - 9, G + 2, RZ + 5, B.wood);

      // 문 옆 밀가루 자루 더미
      for (const [x, z, up] of [[95, 50, 1], [91, 50, 0], [95, 70, 0], [91, 70, 0]]) { sack(w, x, G + 1, z, (x + z) % 2 ? B.sack : B.sack2); if (up) sack(w, x, G + 6, z, B.sack2); }
      landmarks.push({ name: '물레방앗간', note: '맷돌과 곡물 다락', p: [MX + 0.5, LF + 16, MZ + 0.5] });
      return { lights, landmarks, acts };
    },
  });
})();
