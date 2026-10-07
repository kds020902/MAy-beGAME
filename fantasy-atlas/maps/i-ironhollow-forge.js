// 대장간(하위 지도) — 무쇠골 고원의 돌 대장간 안. 서쪽 청동 문으로 들어서면 북쪽 벽에 큰 화덕과 굴뚝 갓, 풀무, 앞에 모루 둘,
// 동쪽 담금질 물통, 동쪽 무기 진열실(도끼 걸이 · 진열장), 북서 룬 각인 공방, 남서 석탄 창고. 남·동쪽 벽은 잘라 낮췄다
// (128칸, 고해상도 2배 · 1칸 ≈ 25cm: 줄눈 있는 벽돌·넓적돌 바닥, 뿔 달린 모루, 주름 풀무, 날 모양이 보이는 도끼, 테 두른 통)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 128, D = 128, Hh = 112, G = 20;
  MAPS.push({
    id: 'ironhollow-forge', cat: 'village', sub: true, parent: 'ironhollow', name: '대장간', en: 'Ironhollow · The Forge', color: '#c08a3a', seed: 1271, base: G, time: 'night', size: [W, D, Hh],
    playerScale: 2,
    desc: '무쇠골 드워프 장인들이 밤낮으로 망치를 두드리는 돌 대장간. 북쪽 벽의 큰 화덕은 풀무질 한 번에 불꽃을 뿜고, 모루 앞에서 달군 쇠는 담금질 물통에서 하얀 김을 토한다. 동쪽 진열실에는 미스릴 도끼가, 북서쪽 공방에는 룬을 새긴 돌판이 빛난다.',
    info: { title: '장소 정보', en: 'THE FORGE', rows: [['단조장', '큰 화덕 · 풀무 · 모루 둘 · 담금질 물통'], ['진열실', '도끼 걸이 · 미스릴 도끼 진열장'], ['공방', '룬 각인대 · 석탄 창고']] },
    sky: ['#3a2418', '#171014', '#ff8a40'], stars: false,
    hemi: ['#ffd8b0', '#2a1e18', 0.6], sun: ['#ffc890', 0.6, [0.4, 1, 0.6]],
    day: { sky: ['#e8c8a0', '#a8765a', '#ffe0b0'], stars: false, hemi: ['#fff0e0', '#4a3a30', 0.62], sun: ['#ffe8d0', 0.72, [0.4, 1, 0.6]], haze: '#c89060' },
    liquid: ['#2a4a5a', '#4a7a8a', '#d8f0f8'], liqSpeed: 0.3,
    fog: { start: 0.92, floor: G - 28, depth: 12, haze: [12, 0.14, 12], hazeColor: '#5a3424' },
    camY: 4, zoom: 1.75,
    particles: [
      { n: 140, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 1.8, area: [61, 42, 10], y0: G + 6, y1: G + 44 },
      { n: 80, colors: ['#8a7a70', '#6a5c54', '#a89888'], mode: 'drift', speed: 0.3, wind: 0.2, area: [64, 64, 36], y0: G + 2, y1: G + 24, glow: false },
    ],
    blocks: {
      gravel: { c: '#5a504a', top: '#7a7068', v: 0.12 }, rock: { c: '#5a504a', top: '#6a605a', v: 0.1, pat: 'stone' },
      pave: { c: '#6a625a', top: '#847a70', v: 0.06 }, pave2: { c: '#6a625a', top: '#7a7066', v: 0.06 }, paveJ: { c: '#4e4842', top: '#5a524a', v: 0.04 },
      flagF: { c: '#5e564e', top: '#6e665e', v: 0.05 }, flagF2: { c: '#5e564e', top: '#645c54', v: 0.05 }, flagJ: { c: '#433c36', top: '#4a423c', v: 0.03 }, soot: { c: '#3a3430', top: '#443c36', v: 0.06 },
      granite: { c: '#8a8078', v: 0.05 }, graniteDk: { c: '#5e564e', v: 0.05 }, basalt: { c: '#2e2826', v: 0.06 }, slate: { c: '#3a3a44', v: 0.04 },
      gr1: { c: '#8a8078', v: 0.04 }, gr2: { c: '#7c736b', v: 0.04 }, gr3: { c: '#968c82', v: 0.04 }, grJ: { c: '#4a433d', v: 0.03 }, cap: { c: '#a49a8e', v: 0.04 },
      bronze: { c: '#c08a3a', v: 0.06 }, bronzeDk: { c: '#94652a', v: 0.05 }, gold: { c: '#e8c040', v: 0.08 }, iron: { c: '#3a3a40', v: 0.03 }, ironDk: { c: '#26262c', v: 0.03 }, steel: { c: '#8a8e96', v: 0.03 }, steelLt: { c: '#b4b8c0', v: 0.02 },
      timber: { c: '#6a4428', v: 0.06, pat: 'log' }, timberDk: { c: '#4e321e', v: 0.05 }, plank: { c: '#7a5434', v: 0.08, pat: 'plank' },
      coal: { c: '#141010', v: 0.04 }, coal2: { c: '#241c1a', v: 0.06 }, leather: { c: '#6a3a24', v: 0.05 }, leather2: { c: '#542c1a', v: 0.05 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      win: { c: '#ffb050', night: true, day: '#5a4a3a' }, ember: { c: '#ff7a2a', glow: true }, rune: { c: '#ffd070', glow: true }, runeB: { c: '#7ad8ff', glow: true }, fireY: { c: '#ffe090', glow: true }, molten: { c: '#ffb04a', glow: true },
      mithril: { c: '#a8e0f0', glow: true }, glass: { c: '#a8c8d0', v: 0.03 }, ore: { c: '#e8c040', v: 0.1 }, oreB: { c: '#5ab0e0', v: 0.1 }, rope: { c: '#b8a080', v: 0.04 },
    },
    build(w) {
      const B = w.id;
      const S = (x, y, z, b) => w.set(x, y, z, b);
      const X0 = 26, X1 = 101, Z0 = 34, Z1 = 93, TOP = G + 24;          // 벽 두께 2칸
      const DZ0 = 60, DZ1 = 65;                                           // 서쪽 청동 문(폭 6 · 높이 8)
      const inR = (x, z) => x > X0 + 1 && x < X1 - 1 && z > Z0 + 1 && z < Z1 - 1;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 1, 1, z >> 1) > 0.8 ? B.rock : B.gravel, under: () => B.rock });
      const lights = [], acts = [], landmarks = [];
      // 낱돌 쌓기(2칸 높이 돌 + 1칸 줄눈, 길이 5칸)
      const GR = [B.gr1, B.gr2, B.gr3, B.gr1, B.gr2, B.gr3];
      const ash = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.grJ;
        return GR[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      const barrel = (x, y, z, ht, r) => {
        for (let k = 0; k < ht; k++) {
          const rr = k >= 1 && k <= ht - 2 ? r + 0.4 : r, R = Math.ceil(rr);
          for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
            const d2 = dx * dx + dz * dz; if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            S(x + dx, y + k, z + dz, k === ht - 1 ? (outer ? B.cask : B.caskTop) : ((k === 1 || k === ht - 2) && outer ? B.iron : ((Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2)));
          }
        }
      };

      // ── 바닥: 넓적돌(4칸 돌·줄눈), 화덕 앞은 그을음, 문 앞 바깥은 포장길 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        const row = z >> 2, off = (row & 1) * 2, joint = (z & 3) === 3 || ((x + off) & 3) === 3;
        let b = joint ? B.flagJ : (hash3((x + off) >> 2, row, 5) > 0.5 ? B.flagF : B.flagF2);
        if (z < 54 && x > 45 && x < 80 && hash3(x >> 1, 3, z >> 1) > 0.45) b = B.soot;
        S(x, G, z, b);
      }
      for (let z = DZ0 - 4; z <= DZ1 + 4; z++) for (let x = 4; x < X0; x++) S(x, G, z, (z % 3 === 2 || (x + ((z / 3 | 0) & 1) * 2) % 4 === 3) ? B.paveJ : (hash3(x >> 2, z, 9) > 0.5 ? B.pave : B.pave2));

      // ── 벽: 북·서는 높은 화강암(낱돌, 청동 띠, 불빛 창), 동·남은 낮게 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (inR(x, z)) continue;
        const low = x >= X1 - 1 || z >= Z1 - 1, corner = (x <= X0 + 1 || x >= X1 - 1) && (z <= Z0 + 1 || z >= Z1 - 1);
        const a = (x <= X0 + 1 || x >= X1 - 1) ? z : x;
        if (low) {
          const post = corner || a % 10 < 2;
          for (let y = G + 1; y <= G + 4; y++) S(x, y, z, post ? B.graniteDk : ash(a, y, 7));
          if (post) { S(x, G + 5, z, B.graniteDk); S(x, G + 6, z, B.bronze); } else S(x, G + 5, z, B.cap);
          continue;
        }
        for (let y = G + 1; y <= TOP; y++) S(x, y, z, y <= G + 2 || corner || a % 12 < 2 ? B.graniteDk : (y === G + 13 || y === G + 14 || y === TOP ? B.bronze : ash(a, y, 11)));
      }
      // 창: 쇠살과 돌 창턱
      const winN = x => { for (let y = G + 15; y <= G + 20; y++) for (let xx = x; xx <= x + 3; xx++) for (const z of [Z0, Z0 + 1]) S(xx, y, z, (y === G + 18 || xx === x + 1) ? B.iron : B.win); for (let xx = x - 1; xx <= x + 4; xx++) { S(xx, G + 14, Z0 + 2, B.cap); S(xx, G + 21, Z0 + 1, B.graniteDk); } };
      const winW = z => { for (let y = G + 15; y <= G + 20; y++) for (let zz = z; zz <= z + 3; zz++) for (const x of [X0, X0 + 1]) S(x, y, zz, (y === G + 18 || zz === z + 1) ? B.iron : B.win); for (let zz = z - 1; zz <= z + 4; zz++) { S(X0 + 2, G + 14, zz, B.cap); S(X0 + 1, G + 21, zz, B.graniteDk); } };
      for (const x of [34, 82, 92]) winN(x);
      for (const z of [44, 78]) winW(z);
      // 서쪽 청동 문: 돌 문틀과 상인방, 룬 이맛돌, 안으로 연 청동 문짝 두 쪽
      w.box(X0, G + 1, DZ0, X0 + 1, G + 8, DZ1, 0);
      for (const z of [DZ0 - 2, DZ0 - 1, DZ1 + 1, DZ1 + 2]) w.box(X0, G + 1, z, X0 + 1, G + 12, z, B.graniteDk);
      w.box(X0, G + 9, DZ0 - 2, X0 + 1, G + 12, DZ1 + 2, B.graniteDk); w.box(X0 - 1, G + 12, DZ0 - 3, X0 - 1, G + 12, DZ1 + 3, B.cap);
      w.box(X0, G + 10, DZ0 + 2, X0, G + 11, DZ1 - 2, B.rune);
      for (let z = DZ0; z <= DZ1; z++) { S(X0, G, z, B.pave); S(X0 + 1, G, z, B.pave); }
      for (const z of [DZ0 - 4, DZ1 + 3]) {
        for (let x = X0 + 2; x <= X0 + 6; x++) for (let y = G + 1; y <= G + 8; y++) for (const zz of [z, z + 1]) S(x, y, zz, x === X0 + 2 || x === X0 + 6 || y === G + 1 || y === G + 8 || y === G + 4 ? B.bronzeDk : B.bronze);
        S(X0 + 5, G + 5, z === DZ0 - 4 ? z + 2 : z - 1, B.gold);
      }

      // ── 큰 화덕(북쪽 벽 가운데): 돌 아궁이, 잉걸불 바닥, 현무암 테, 청동 갓과 굴뚝 ──
      const HX0 = 52, HX1 = 69, HZ1 = 45;
      for (let y = G + 1; y <= G + 6; y++) for (let z = Z0 + 2; z <= HZ1; z++) for (let x = HX0; x <= HX1; x++) S(x, y, z, (x === HX0 || x === HX1 || z === HZ1) ? ash(x + z, y, 21) : B.graniteDk);
      for (let z = Z0 + 3; z <= HZ1 - 2; z++) for (let x = HX0 + 2; x <= HX1 - 2; x++) {
        const hh = hash3(x >> 1, 4, z >> 1);
        S(x, G + 6, z, hh > 0.35 ? (hash3(x >> 1, 5, z >> 1) > 0.5 ? B.ember : B.molten) : B.coal);
        if (hh > 0.8) S(x, G + 7, z, B.fireY);
      }
      for (let x = HX0; x <= HX1; x++) for (const z of [HZ1 - 1, HZ1]) { S(x, G + 7, z, B.basalt); S(x, G + 8, z, B.basalt); }
      for (let z = Z0 + 2; z <= HZ1; z++) for (const x of [HX0, HX0 + 1, HX1 - 1, HX1]) { S(x, G + 7, z, B.basalt); S(x, G + 8, z, B.basalt); }
      for (const x of [HX0, HX1 - 1]) w.box(x, G + 9, HZ1 - 1, x + 1, G + 14, HZ1, B.iron);
      for (let k = 0; k <= 3; k++) {
        const y = G + 15 + 2 * k;
        w.box(HX0 + 2 * k, y, Z0 + 2, HX1 - 2 * k, y + 1, HZ1 - 2 * k, k === 0 ? B.bronze : (k === 2 ? B.bronzeDk : B.graniteDk));
        w.box(HX0 + 2 * k + 1, y, Z0 + 2, HX1 - 2 * k - 1, y + 1, HZ1 - 2 * k - 1, 0);
      }
      for (let x = HX0; x <= HX1; x += 3) S(x, G + 14, HZ1 + 1, B.bronze);
      w.box(56, G + 23, Z0, 65, G + 48, Z0 + 7, B.graniteDk); w.box(58, G + 23, Z0 + 2, 63, G + 48, Z0 + 5, 0);
      for (let y = G + 23; y <= G + 48; y++) for (let x = 56; x <= 65; x++) S(x, y, Z0 + 7, (y - G) % 10 === 7 || (y - G) % 10 === 8 ? B.bronze : ash(x, y, 31));
      w.walls(55, G + 49, Z0, 66, G + 50, Z0 + 8, B.cap);
      lights.push({ name: 'hearth', p: [61, G + 9, 41], c: '#ff7a2a', i: 1.8, d: 52, flicker: 0.35, srcR: 6 });
      landmarks.push({ name: '큰 화덕', note: '풀무 · 청동 갓 · 굴뚝', p: [61, G + 56, 40] });
      // 풀무(화덕 서쪽, 부품): 판자 둘, 주름진 가죽, 쇠 주둥이, 손잡이
      const BZ = 38;
      for (const x of [36, 46]) w.box(x, G + 1, BZ, x + 1, G + 4, BZ + 5, B.timber);
      S(50, G + 3, BZ + 2, B.iron); S(51, G + 3, BZ + 2, B.iron); S(50, G + 4, BZ + 3, B.iron); S(51, G + 4, BZ + 3, B.iron);
      const bel = w.prop({ name: 'bellows', pivot: [46, G + 7, BZ + 3], axis: 'z' });
      bel.box(36, G + 5, BZ, 47, G + 6, BZ + 5, B.plank); bel.box(36, G + 11, BZ, 47, G + 12, BZ + 5, B.plank);
      for (let y = G + 7; y <= G + 10; y++) { const inset = (y & 1) ? 0 : 1; bel.box(37 + inset, y, BZ + inset, 47, y, BZ + 5 - inset, (y & 1) ? B.leather : B.leather2); }
      bel.box(48, G + 7, BZ + 2, 51, G + 8, BZ + 3, B.iron); bel.box(33, G + 11, BZ + 2, 35, G + 12, BZ + 3, B.timber);
      for (const x of [38, 44]) bel.set(x, G + 13, BZ + 2, B.bronze);

      // ── 모루 둘(화덕 앞): 나무 둥치 받침, 받침·허리·면·뿔이 있는 쇠 모루, 망치(부품)와 달군 쇠 ──
      const anvil = (cx, cz) => {
        for (let y = G + 1; y <= G + 2; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) if (dx * dx + dz * dz <= 5.5) S(cx + dx, y, cz + dz, dx * dx + dz * dz > 3 ? B.timberDk : B.timber);
        w.box(cx - 3, G + 3, cz - 2, cx + 3, G + 3, cz + 2, B.ironDk);
        w.box(cx - 1, G + 4, cz - 1, cx + 1, G + 4, cz + 1, B.iron);
        w.box(cx - 4, G + 5, cz - 1, cx + 3, G + 5, cz + 1, B.iron); w.box(cx - 4, G + 6, cz - 1, cx + 3, G + 6, cz + 1, B.steel);
        w.box(cx + 4, G + 5, cz - 1, cx + 4, G + 6, cz + 1, B.iron); S(cx + 5, G + 6, cz, B.steel); S(cx + 5, G + 5, cz, B.iron); S(cx + 6, G + 6, cz, B.steel);
        S(cx - 3, G + 6, cz, B.ironDk);
      };
      const A1 = [58, 56], A2 = [74, 60];
      anvil(...A1); anvil(...A2);
      w.box(A1[0] - 1, G + 7, A1[1], A1[0] + 2, G + 7, A1[1], B.molten);
      const ham = w.prop({ name: 'hammer', pivot: [A1[0] + 0.5, G + 9, A1[1] + 5.5], axis: 'x' });
      ham.box(A1[0], G + 9, A1[1] + 1, A1[0], G + 9, A1[1] + 8, B.timber); ham.box(A1[0], G + 9, A1[1] + 9, A1[0], G + 9, A1[1] + 9, B.leather);
      ham.box(A1[0] - 1, G + 8, A1[1] + 1, A1[0] + 1, G + 11, A1[1] + 2, B.steel); ham.box(A1[0] - 1, G + 8, A1[1] + 1, A1[0] + 1, G + 8, A1[1] + 2, B.steelLt);
      S(A2[0] - 2, G + 7, A2[1], B.iron); S(A2[0] - 1, G + 7, A2[1], B.iron); w.box(A2[0], G + 7, A2[1] + 1, A2[0] + 3, G + 7, A2[1] + 1, B.timber); w.box(A2[0] + 3, G + 7, A2[1] - 1, A2[0] + 3, G + 7, A2[1] + 1, B.steel);
      lights.push({ name: 'anvil', p: [A1[0] + 1, G + 9, A1[1] + 0.5], c: '#ffb04a', i: 0.4, d: 20, flicker: 0.2, srcR: 4 });
      // 연장 걸이(서쪽 벽): 집게, 망치, 줄
      w.box(X0 + 2, G + 11, 48, X0 + 2, G + 12, 57, B.timber);
      for (let z = 48; z <= 57; z += 3) {
        const k = (z - 48) / 3;
        if (k % 2 === 0) { w.box(X0 + 2, G + 5, z, X0 + 2, G + 10, z, B.iron); w.box(X0 + 2, G + 5, z + 1, X0 + 2, G + 7, z + 1, B.iron); }
        else { w.box(X0 + 2, G + 7, z, X0 + 2, G + 10, z, B.timber); w.box(X0 + 2, G + 5, z - 1, X0 + 2, G + 6, z + 1, B.steel); }
      }
      // 작업대: 판자 상판, 다리, 위의 광석과 쇳조각
      w.box(X0 + 2, G + 5, 70, X0 + 7, G + 5, 75, B.plank); for (const [x, z] of [[X0 + 2, 70], [X0 + 7, 70], [X0 + 2, 75], [X0 + 7, 75]]) w.box(x, G + 1, z, x, G + 4, z, B.timberDk);
      w.box(X0 + 3, G + 6, 72, X0 + 4, G + 6, 73, B.steel); S(X0 + 2, G + 6, 70, B.ore); S(X0 + 3, G + 6, 70, B.ore); S(X0 + 6, G + 6, 74, B.oreB); S(X0 + 7, G + 6, 75, B.oreB);

      // ── 담금질 물통(화덕 동쪽): 돌 테, 물, 쇠 받침과 집게(부품) ──
      const QX0 = 74, QX1 = 87, QZ0 = 36, QZ1 = 43;
      for (let y = G + 1; y <= G + 4; y++) for (let z = QZ0; z <= QZ1; z++) for (let x = QX0; x <= QX1; x++) S(x, y, z, y === G + 4 ? B.cap : ash(x + z, y, 41));
      for (let z = QZ0 + 2; z <= QZ1 - 2; z++) for (let x = QX0 + 2; x <= QX1 - 2; x++) { for (let y = G + 1; y <= G + 4; y++) S(x, y, z, 0); S(x, G, z, B.basalt); w.liquid(x, z, G + 3); }
      w.box(QX1 - 3, G + 5, QZ0, QX1, G + 6, QZ0 + 1, B.iron);
      const tong = w.prop({ name: 'tongs', pivot: [81, G + 11, 41] });
      tong.box(80, G + 5, 40, 80, G + 12, 40, B.iron); tong.box(81, G + 5, 40, 81, G + 9, 40, B.ironDk); tong.box(80, G + 5, 41, 81, G + 6, 42, B.molten);
      w.box(78, G + 5, 38, 78, G + 12, 39, B.timber); w.box(78, G + 13, 38, 83, G + 14, 39, B.timber); w.box(80, G + 13, 40, 81, G + 14, 41, B.timber);
      landmarks.push({ name: '담금질 물통', note: '달군 쇠가 하얀 김을 토하는 곳', p: [80, G + 28, 40] });

      // ── 무기 진열실(동쪽): 벽 걸이, 가운데 양면 걸이, 남동쪽 진열장(부품 문) ──
      w.box(88, G + 12, Z0 + 2, X1 - 2, G + 12, Z0 + 2, B.timber);
      for (let x = 90; x <= 97; x += 4) {
        w.box(x, G + 3, Z0 + 2, x, G + 11, Z0 + 2, B.timber);
        const hb = (x & 4) ? B.steel : B.bronze;
        w.box(x + 1, G + 8, Z0 + 2, x + 1, G + 11, Z0 + 2, hb); w.box(x + 2, G + 7, Z0 + 2, x + 2, G + 11, Z0 + 2, hb); S(x - 1, G + 10, Z0 + 2, hb); S(x - 1, G + 9, Z0 + 2, hb);
        S(x + 2, G + 7, Z0 + 3, B.steelLt);
      }
      const RX = 92;
      w.box(RX, G + 1, 52, RX + 1, G + 2, 73, B.timber); w.box(RX, G + 9, 52, RX + 1, G + 10, 73, B.timber);
      for (const z of [52, 62, 72]) w.box(RX, G + 1, z, RX + 1, G + 10, z + 1, B.timber);
      for (let z = 54; z <= 70; z += 4) {
        if (z === 62) continue;
        w.box(RX, G + 3, z, RX + 1, G + 6, z, B.timberDk);
        for (const sx of [RX - 1, RX + 2]) {
          const hb = (z & 4) ? B.steel : B.bronze;
          w.box(sx, G + 6, z, sx, G + 8, z, B.timber); w.box(sx, G + 7, z - 1, sx, G + 8, z + 1, hb); S(sx, G + 6, z + 1, hb); S(sx, G + 9, z, B.steelLt);
        }
      }
      // 미스릴 도끼 진열장: 돌 받침 위 유리 칸, 앞 유리문(부품)
      const CX0 = 84, CX1 = 95, CZ = 82;
      w.box(CX0, G + 1, CZ, CX1, G + 2, CZ + 5, B.graniteDk); w.walls(CX0, G + 11, CZ, CX1, G + 12, CZ + 5, B.graniteDk); w.box(CX0, G + 12, CZ, CX1, G + 12, CZ + 5, B.cap);
      for (const x of [CX0, CX0 + 1, CX1 - 1, CX1]) w.box(x, G + 3, CZ, x, G + 10, CZ + 5, B.bronze);
      w.box(CX0 + 2, G + 3, CZ, CX1 - 2, G + 10, CZ + 1, B.iron);
      w.box(88, G + 3, CZ + 2, 89, G + 10, CZ + 3, B.timber);
      for (const ax of [86, 91]) { w.box(ax, G + 7, CZ + 2, ax + 1, G + 10, CZ + 3, B.mithril); S(ax + (ax < 88 ? -0 : 1), G + 6, CZ + 2, B.mithril); }
      w.box(88, G + 9, CZ + 2, 89, G + 10, CZ + 3, B.gold);
      const cdoor = w.prop({ name: 'casedoor', pivot: [CX0 + 2, G + 7, CZ + 5], axis: 'y' });
      for (let x = CX0 + 2; x <= CX1 - 2; x++) for (let y = G + 3; y <= G + 10; y++) cdoor.set(x, y, CZ + 4, x === CX0 + 2 || x === CX1 - 2 || y === G + 3 || y === G + 10 ? B.bronze : B.glass);
      cdoor.set(CX1 - 3, G + 6, CZ + 5, B.gold);
      lights.push({ name: 'mithril', p: [89, G + 8, CZ + 3], c: '#a8e8ff', i: 0.3, d: 24, flicker: 0.05, srcR: 4 });
      landmarks.push({ name: '무기 진열실', note: '도끼 걸이 · 미스릴 도끼 진열장', p: [90, G + 28, 68] });

      // ── 룬 각인 공방(북서 구석): 돌 각인대, 룬 돌판(부품), 바닥 룬 고리, 끌 ──
      const RTX = 34, RTZ = 50;
      for (let y = G + 1; y <= G + 4; y++) for (let z = RTZ; z <= RTZ + 5; z++) for (let x = RTX - 2; x <= RTX + 5; x++) S(x, y, z, ash(x + z, y, 51));
      w.box(RTX - 2, G + 5, RTZ, RTX + 5, G + 6, RTZ + 5, B.basalt);
      const slab = w.prop({ name: 'runeslab', pivot: [RTX + 2, G + 7, RTZ + 3] });
      slab.box(RTX, G + 7, RTZ, RTX + 3, G + 8, RTZ + 5, B.slate);
      slab.box(RTX, G + 9, RTZ + 2, RTX + 1, G + 9, RTZ + 3, B.rune); slab.box(RTX + 2, G + 9, RTZ, RTX + 3, G + 9, RTZ + 1, B.runeB); slab.box(RTX + 2, G + 9, RTZ + 4, RTX + 3, G + 9, RTZ + 5, B.rune);
      w.box(RTX + 4, G + 7, RTZ + 4, RTX + 5, G + 7, RTZ + 4, B.steel); S(RTX + 5, G + 7, RTZ + 5, B.timber);
      w.box(RTX - 2, G + 7, RTZ, RTX - 1, G + 8, RTZ + 1, B.timber);
      w.ring(RTX + 2, RTZ + 3, G, 6.4, 8.4, B.basalt);
      for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; S(Math.round(RTX + 2 + Math.cos(t) * 7.4), G, Math.round(RTZ + 3 + Math.sin(t) * 7.4), B.rune); }
      // 룬 돌판 선반(서쪽 벽)
      for (const y of [G + 5, G + 11]) { w.box(X0 + 2, y, 38, X0 + 3, y + 1, 45, B.timber); for (let z = 38; z <= 45; z += 2) w.box(X0 + 2, y + 2, z, X0 + 2, y + 3, z, ((z + y) >> 1) % 3 ? B.slate : B.rune); }
      lights.push({ name: 'runes', p: [RTX + 2, G + 9, RTZ + 3], c: '#ffd070', i: 0.35, d: 24, flicker: 0.1, srcR: 4 });
      landmarks.push({ name: '룬 각인 공방', note: '룬 돌판 · 바닥 룬 고리', p: [36, G + 28, 48] });

      // ── 석탄 창고(남서 구석): 판자 칸막이 안 석탄 더미, 삽(부품), 광석 통 ──
      const KX0 = 28, KX1 = 45, KZ0 = 76;
      w.box(KX1 - 1, G + 1, KZ0, KX1, G + 6, Z1 - 2, B.plank); w.box(KX0, G + 1, KZ0, KX1 - 6, G + 6, KZ0 + 1, B.plank);
      for (const z of [KZ0, KZ0 + 8, Z1 - 2]) w.box(KX1 - 1, G + 1, z, KX1, G + 7, z, B.timber);
      for (let z = KZ0 + 2; z <= Z1 - 2; z++) for (let x = KX0; x < KX1 - 1; x++) {
        const ox = x / 2, oz = z / 2, h = Math.max(0, Math.round(2 * (4.2 - Math.hypot(ox - 15.5, oz - 44.5) * 0.75) + hash3(x >> 1, 6, z >> 1) * 2));
        for (let y = G + 1; y <= G + h; y++) S(x, y, z, hash3(x >> 1, y >> 1, z >> 1) > 0.4 ? B.coal : B.coal2);
      }
      for (let x = 39; x <= 43; x++) for (let z = 80; z <= 84; z++) for (let y = G + 1; y <= G + 12; y++) S(x, y, z, 0);
      const shovel = w.prop({ name: 'shovel', pivot: [41, G + 1, 81] });
      shovel.box(41, G + 3, 81, 41, G + 11, 81, B.timber); shovel.box(40, G + 12, 81, 42, G + 12, 81, B.timberDk);
      shovel.box(40, G + 1, 81, 42, G + 2, 83, B.iron); shovel.set(41, G + 2, 81, B.ironDk);
      barrel(48, G + 1, 86, 6, 1.8); barrel(54, G + 1, 86, 6, 1.8); barrel(51, G + 1, 90, 6, 1.6);
      for (const [x, z] of [[48, 86], [54, 86], [51, 90]]) { S(x, G + 7, z, (x + z) % 2 ? B.ore : B.oreB); S(x + 1, G + 7, z, B.ore); S(x, G + 7, z + 1, B.oreB); }
      landmarks.push({ name: '석탄 창고', note: '석탄 더미 · 광석 통', p: [34, G + 24, 84] });

      // 벽 화로 둘과 문간 등
      for (const [x, z] of [[48, 88], [96, 48]]) {
        w.box(x - 1, G + 1, z - 1, x + 2, G + 2, z + 2, B.graniteDk);
        w.box(x, G + 3, z, x + 1, G + 6, z + 1, B.iron); w.walls(x - 1, G + 7, z - 1, x + 2, G + 7, z + 2, B.iron);
        w.box(x, G + 7, z, x + 1, G + 7, z + 1, B.ember); w.box(x, G + 8, z, x + 1, G + 8, z + 1, B.fireY); S(x, G + 9, z + 1, B.fireY);
      }
      lights.push({ name: 'brazierS', p: [49, G + 10, 89], c: '#ffb050', i: 0.6, d: 28, flicker: 0.3, srcR: 4 });
      lights.push({ name: 'brazierE', p: [97, G + 10, 49], c: '#ffb050', i: 0.6, d: 28, flicker: 0.3, srcR: 4 });
      lights.push({ name: 'door', p: [X0 + 3, G + 9, DZ0 + 3], c: '#ffd070', i: 0.4, d: 20, flicker: 0.1, srcR: 4 });

      // ───── 상호작용 ─────
      acts.push(OR.goAct({ at: [X0 + 2, G + 1, DZ0 + 2], h: 10, name: '밖으로 나가기', goto: 'ironhollow', hint: '청동 문을 나서 무쇠골 고원의 포장길로 돌아가요', hit: [X0, G + 1, DZ0, X0 + 2, G + 8, DZ1] }));
      acts.push({
        name: '풀무질', hint: '풀무를 밟을 때마다 큰 화덕이 푸욱 숨을 쉬며 불꽃 기둥을 뿜어요', hit: [33, G + 1, BZ, 51, G + 13, BZ + 5],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await a.tween('bellows', { rot: [0, 0, 0.22], scl: [1, 0.55, 1] }, 0.36);
            a.flash('hearth', 3, 0.5);
            a.burst([61, G + 8, 40], { n: 46, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], speed: 8, up: 16, life: 1.3, gravity: 4, spread: 4 });
            await a.tween('bellows', { rot: [0, 0, 0], scl: [1, 1, 1] }, 0.36);
          }
        },
      });
      acts.push({
        name: '모루 내리치기', hint: '쇠망치가 달군 쇠를 땅! 땅! 내리칠 때마다 불티가 튀어요', hit: [A1[0] - 4, G + 1, A1[1] - 2, A1[0] + 6, G + 12, A1[1] + 9],
        run: async a => {
          for (let k = 0; k < 5; k++) {
            await a.turn('hammer', [-1.1, 0, 0], 0.32);
            await a.turn('hammer', [0.15, 0, 0], 0.12);
            a.flash('anvil', 5, 0.15);
            a.burst([A1[0] + 1, G + 8, A1[1] + 0.5], { n: 26, colors: ['#ffe08a', '#ffb04a', '#ffffff'], speed: 10, up: 6, life: 0.6, gravity: 18, spread: 0.8 });
          }
          await a.turn('hammer', [0, 0, 0], 0.4);
        },
      });
      acts.push({
        name: '담금질', hint: '집게에 문 달군 쇠를 물통에 쑥 담그자 치이익 하얀 김이 피어올라요', hit: [QX0, G + 1, QZ0, QX1, G + 14, QZ1],
        run: async a => {
          await a.move('tongs', [0, -4, 0], 0.6);
          for (let k = 0; k < 10; k++) { a.burst([81, G + 5, 41], { n: 14, colors: ['#ffffff', '#e8eef0', '#c8d0d8'], speed: 2, up: 6, life: 1.8, gravity: -1.6, spread: 2.8 }); await a.wait(0.18); }
          await a.wait(0.5); await a.move('tongs', [0, 0, 0], 0.8);
        },
      });
      acts.push({
        name: '룬 새기기', hint: '각인대의 룬 돌판이 떠오르며 바닥 룬 고리가 차례로 금빛으로 타올라요', hit: [RTX - 2, G + 1, RTZ, RTX + 5, G + 10, RTZ + 5],
        run: async a => {
          a.flash('runes', 6, 4); a.glow(1.5, 4);
          await a.move('runeslab', [0, 5, 0], 1);
          for (let k = 0; k < 8; k++) { const t = k / 8 * Math.PI * 2; a.burst([RTX + 2.5 + Math.cos(t) * 7.4, G + 1.4, RTZ + 3.5 + Math.sin(t) * 7.4], { n: 10, colors: ['#ffd070', '#ffe8a0', '#7ad8ff'], speed: 2, up: 4, life: 1, gravity: -1.2, spread: 0.6 }); await a.wait(0.22); }
          await a.turn('runeslab', [0, Math.PI, 0], 1);
          await a.move('runeslab', [0, 0, 0], 0.8); a.unwind('runeslab');
        },
      });
      acts.push({
        name: '도끼 진열장', hint: '청동 테 유리문이 열리며 미스릴 도끼 한 쌍이 푸른 빛을 뿜어요', hit: [CX0, G + 1, CZ, CX1, G + 12, CZ + 6],
        run: async a => {
          await a.turn('casedoor', [0, -1.6, 0], 1);
          a.flash('mithril', 7, 3); a.glow(1.3, 3);
          for (let k = 0; k < 5; k++) { a.burst([89, G + 12, CZ + 3], { n: 12, colors: ['#a8e8ff', '#ffffff', '#6ad0f0'], speed: 2.4, up: 2.8, life: 1, gravity: -0.6, spread: 2 }); await a.wait(0.4); }
          await a.wait(0.6); await a.turn('casedoor', [0, 0, 0], 1);
        },
      });
      acts.push({
        name: '석탄 삽질', hint: '삽이 석탄 더미를 푹 떠서 화덕 쪽으로 휙 뿌리고, 검은 가루가 풀썩 일어요', hit: [KX0, G + 1, KZ0, KX1, G + 12, Z1 - 2],
        run: async a => {
          for (let k = 0; k < 3; k++) {
            await a.tween('shovel', { off: [-3, 0, 3], rot: [0.5, 0, 0.4] }, 0.4);
            a.burst([37, G + 4, 84], { n: 14, colors: ['#141010', '#3a3230', '#5a504a'], speed: 2.8, up: 2.8, life: 1, gravity: 4, spread: 2 });
            await a.tween('shovel', { off: [1, 4, -3], rot: [-0.6, 0, -0.2] }, 0.35);
            a.burst([41, G + 13, 77], { n: 16, colors: ['#141010', '#241c1a', '#ff7a2a'], speed: 6, up: 6, life: 1, gravity: 14, spread: 1.6 });
          }
          await a.tween('shovel', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.5);
          a.flash('hearth', 2.5, 1);
        },
      });
      return { lights, landmarks, acts };
    },
  });
})();
