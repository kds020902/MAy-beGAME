// 작은 예배당(하위 지도) — 주택가 맨 위 단의 흰 예배당 안. 종탑 현관(종 줄과 종루 계단)에서 아치를 지나 본당으로,
// 붉은 통로 양옆 신자석, 서쪽 한 단 높은 제단과 장미창, 북쪽 벽 풍금, 방명록 받침대. 남·동쪽(카메라 쪽) 벽은 낮게 잘랐다.
// 2배 해상도(1칸 ≈ 25cm), playerScale 2: 낱돌 벽 밑단, 뾰족 아치 창(창살·납틀), 벽기둥과 주두, 등받이·팔걸이 있는 신자석, 계단 있는 성단.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 112, Hh = 112, G = 20;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'elmrow-chapel', cat: 'kingdom', sub: true, parent: 'elmrow', name: '작은 예배당', en: 'Elm Row · Little Chapel', color: '#c8d8f0', seed: 2131, base: G, size: [W, D, Hh],
    playerScale: 2,
    desc: '느릅나무 주택가 맨 위 단의 흰 예배당. 푸른 첨탑 아래 종탑 현관으로 들어서면 종 줄이 드리워 있고, 아치 너머 본당에는 붉은 통로 양옆으로 신자석이 줄지어 있다. 서쪽 제단 뒤 둥근 장미창으로 해 질 녘 빛이 들고, 북쪽 벽 풍금은 일요일마다 울린다.',
    info: { title: '장소 정보', en: 'CHAPEL', rows: [['현관', '종탑 아래 · 종 줄과 종루 계단'], ['본당', '붉은 통로와 신자석 열두 줄'], ['제단', '둥근 장미창 · 금빛 촛대'], ['풍금', '북쪽 벽 · 일요일 아침 예배']] },
    night: { sky: ['#283048', '#0a0c18', '#d8a068'], stars: true, hemi: ['#b8c0d8', '#1a1814', 0.48], sun: ['#d0d8ff', 0.3, [0.5, 1, 0.45]], haze: '#262a34' },
    hemi: ['#ffffff', '#5a5448', 0.62], sun: ['#fff4e0', 0.62, [0.5, 1, 0.45]],
    fog: { start: 0.88, floor: G - 10, depth: 12, haze: [16, 0.12, 12], hazeColor: '#e0e4ec' },
    camY: -2, zoom: 1.45,
    particles: [
      { n: 110, colors: ['#fff6d8', '#ffffff'], mode: 'drift', speed: 0.2, wind: 0.08, area: [60, 46, 32], y0: G + 4, y1: G + 36, glow: true },
      { n: 40, colors: ['#ffd8a0', '#c8d8ff', '#ffb8c8'], mode: 'fall', speed: 0.16, area: [36, 46, 12], y0: G + 8, y1: G + 32, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      floorW: { c: '#c8c4bc', top: '#e4e0d8', v: 0.03, pat: 'check', alt: '#cfcac0' }, carpet: { c: '#8a2a34', top: '#a8343e', v: 0.03 }, carpetG: { c: '#d8b048', v: 0.03 },
      pew: { c: '#6a4428', v: 0.05, pat: 'plank' }, pewD: { c: '#4e321e', v: 0.05 }, cloth: { c: '#f6f2ea', v: 0.02 }, bell: { c: '#d8b048', v: 0.04 },
      candle: { c: '#fff0c0', glow: true }, flame: { c: '#ffb860', glow: true }, pipe: { c: '#c8c8d0', v: 0.03, pat: 'log' }, pipeG: { c: '#e0b84a', v: 0.03, pat: 'log' }, keys: { c: '#f4f4ec', v: 0.02 }, keysB: { c: '#2a2a30', v: 0.02 },
      roseR: { c: '#e04a5a', glow: true }, roseB: { c: '#4a7ae0', glow: true }, roseY: { c: '#f0d060', glow: true }, roseG: { c: '#5ac08a', glow: true }, lead: { c: '#3a3a44', v: 0.02 },
      book: { c: '#6a2a2a', v: 0.03 }, page: { c: '#f8f2e0', v: 0.02 }, quill: { c: '#f8f8f4', v: 0.02 }, glassW: { c: '#cfe0f4', v: 0.02 }, glassB: { c: '#a8c4e8', v: 0.02 },
      st1: { c: '#c8c8cc', v: 0.04 }, st2: { c: '#b8b8be', v: 0.04 }, st3: { c: '#d4d2d0', v: 0.04 }, mortar: { c: '#a8a6a4', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 }, ironDk: { c: '#33333a', v: 0.03 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 12, height: () => G, surface: (x, z) => hash3(x >> 2, 3, z >> 2) > 0.7 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 4 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 24, X1 = 120, Z0 = 20, Z1 = 72, TOP = G + 36;          // 본당
      const VX0 = 62, VX1 = 81, VZ1 = 92;                                   // 종탑 현관(z72~92)
      const STONES = [B.st1, B.st2, B.st3, B.st1];
      const stone = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3;
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return B.mortar;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 4) | 0];
      };
      // ── 바닥 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, B.floorW);
      for (let z = Z1; z <= VZ1; z++) for (let x = VX0; x <= VX1; x++) w.set(x, G, z, B.floorW);
      // 붉은 통로(동서)와 현관에서 오는 통로(남북), 금빛 테두리
      for (let x = X0 + 17; x < X1; x++) for (let z = 43; z <= 49; z++) w.set(x, G, z, (z === 43 || z === 49) ? B.carpetG : (x % 8 === 0 && z === 46 ? B.carpetG : B.carpet));
      for (let z = 50; z < VZ1; z++) for (let x = 67; x <= 76; x++) w.set(x, G, z, (x === 67 || x === 76) ? B.carpetG : B.carpet);
      // ── 벽: 북·서는 높게(낱돌 밑단, 뾰족 아치 창과 벽기둥), 남·동·현관 앞은 낮게 ──
      const wallAt = (x, z) => ((x === X0 || x === X1) && z >= Z0 && z <= Z1) || ((z === Z0 || z === Z1) && x >= X0 && x <= X1);
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (!wallAt(x, z)) continue;
        const low = z === Z1 || x === X1, top = low ? G + 6 : TOP, u = (z === Z0 || z === Z1) ? x : z;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y <= G + 5 ? stone(u, y, 3) : (y === top ? B.trim : B.white));
        if (!low) w.set(x, TOP - 1, z, B.whiteDk);
      }
      // 낮은 벽 위 갓돌(안쪽으로 1칸)
      for (let x = X0; x <= X1; x++) if (x < VX0 || x > VX1) w.set(x, G + 6, Z1, B.trim);
      // 북쪽 벽 뾰족 아치 창(창살·납틀·창턱)과 안쪽 벽기둥(주두·촛대 받침)
      const archWin = (x0, z, side) => {
        for (let y = G + 10; y <= G + 26; y++) for (let c = 0; c < 6; c++) {
          const top = G + 23 + (c === 2 || c === 3 ? 3 : c === 1 || c === 4 ? 2 : 0);
          if (y > top) continue;
          const b = (c === 0 || c === 5) ? B.whiteDk : (y === G + 17 || ((c === 2 || c === 3) && y === top)) ? B.lead : ((c + y) % 5 === 0 ? B.glassB : B.glassW);
          w.set(x0 + c, y, z, b);
        }
        for (let c = -1; c <= 6; c++) { w.set(x0 + c, G + 9, z + side, B.trim); }
        for (let y = G + 10; y <= G + 23; y++) { w.set(x0 - 1, y, z + side, B.whiteDk); w.set(x0 + 6, y, z + side, B.whiteDk); }
      };
      const wallC = [];
      for (let x = X0 + 10; x < X1 - 6; x += 16) {
        archWin(x, Z0, 1);
        const px = x + 11;
        if (px + 1 < X1) {
          for (let y = G + 1; y <= TOP - 2; y++) for (let dz = 1; dz <= 2; dz++) w.box(px, y, Z0 + dz, px + 1, y, Z0 + dz, y <= G + 3 ? B.st2 : B.whiteDk);
          w.box(px - 1, TOP - 3, Z0 + 1, px + 2, TOP - 2, Z0 + 3, B.trim);
          // 벽 촛대
          w.box(px, G + 12, Z0 + 3, px + 1, G + 12, Z0 + 4, B.gold); w.box(px, G + 13, Z0 + 4, px + 1, G + 13, Z0 + 4, B.cloth); w.box(px, G + 14, Z0 + 4, px + 1, G + 14, Z0 + 4, B.candle);
          wallC.push([px + 1, G + 15, Z0 + 4.5]);
        }
      }
      // 지붕 들보(북쪽 벽 위로 걸친 서까래 끝)와 처마 띠
      for (let x = X0 + 1; x < X1; x++) w.set(x, TOP - 1, Z0 + 1, x % 2 ? B.wood : B.whiteDk);
      for (let x = X0 + 4; x < X1; x += 8) w.box(x, TOP, Z0 + 1, x + 1, TOP, Z0 + 6, B.wood);

      // ── 서쪽 제단: 두 계단 높은 성단, 제단, 금빛 촛대, 장미창 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x <= X0 + 17; x++) {
        const y = x <= X0 + 15 ? G + 2 : G + 1;
        w.box(x, G + 1, z, x, y, z, B.st3);
        w.set(x, y, z, (x === X0 + 15 || x === X0 + 17) ? B.whiteDk : (z >= 44 && z <= 48 ? B.carpet : B.floorW));
      }
      const AX = X0 + 7;
      w.box(AX, G + 3, 39, AX + 3, G + 7, 53, B.white); w.box(AX - 1, G + 8, 38, AX + 4, G + 8, 54, B.cloth); w.box(AX + 4, G + 3, 41, AX + 4, G + 7, 51, B.gold); w.box(AX + 4, G + 4, 43, AX + 4, G + 6, 49, B.cloth);
      for (let z = 38; z <= 54; z += 2) w.set(AX + 4, G + 7, z, B.gold);
      w.box(AX + 1, G + 9, 45, AX + 2, G + 9, 47, B.page); w.box(AX + 1, G + 9, 46, AX + 2, G + 9, 46, B.book);
      w.box(AX + 1, G + 9, 44, AX + 2, G + 12, 44, B.gold); w.box(AX + 1, G + 11, 43, AX + 2, G + 11, 45, B.gold);   // 작은 금빛 십자 표지 대신 등대(촛대)
      const candles = [];
      for (const z of [39, 53]) { w.box(AX + 1, G + 9, z, AX + 2, G + 10, z, B.gold); w.box(AX + 1, G + 11, z, AX + 2, G + 12, z, B.cloth); w.box(AX + 1, G + 13, z, AX + 2, G + 13, z, B.candle); candles.push([AX + 2, G + 13.5, z + 0.5]); }
      for (const z of [32, 60]) {
        w.box(AX + 5, G + 3, z - 1, AX + 7, G + 3, z + 1, B.gold); w.box(AX + 6, G + 4, z, AX + 6, G + 13, z, B.gold);
        w.box(AX + 4, G + 13, z, AX + 8, G + 13, z, B.gold); for (const dx of [4, 6, 8]) { w.set(AX + dx, G + 14, z, B.cloth); w.set(AX + dx, G + 15, z, B.candle); }
        candles.push([AX + 6.5, G + 15.5, z + 0.5]);
      }
      // 장미창(서쪽 벽, 지름 25): 바퀴살 납틀과 색유리
      const RY = G + 24, RZ = 46;
      for (let z = RZ - 12; z <= RZ + 12; z++) for (let y = RY - 12; y <= RY + 12; y++) {
        const dz = z - RZ, dy = y - RY, r = Math.hypot(dz, dy);
        if (r > 12.4) continue;
        let b;
        if (r > 10.8) b = B.whiteDk;
        else if (r < 2.4) b = B.roseY;
        else if (Math.abs(r - 6.2) < 0.5) b = B.lead;
        else { const a = Math.atan2(dy, dz), sp = Math.abs(((a / (Math.PI / 4)) % 1 + 1) % 1 - 0.5) < 0.07 + 0.25 / r; b = sp ? B.lead : (r < 6 ? B.roseR : ((Math.floor(a / (Math.PI / 4)) & 1) ? B.roseB : B.roseG)); }
        w.set(X0, y, z, b);
        if (r > 10.8 && r <= 12.4) w.set(X0 + 1, y, z, B.trim);
      }
      lights.push({ name: 'rose', p: [X0 + 3, RY, RZ + 0.5], c: '#ffd8b0', i: 0.9, d: 52, flicker: 0.03, srcR: 12 });
      lights.push({ name: 'candles', p: [AX + 2, G + 14, 46.5], c: '#ffd890', i: 0.8, d: 28, flicker: 0.2, srcR: 8 });
      landmarks.push({ name: '장미창', note: '제단 뒤 둥근 색유리 창', p: [X0 + 0.5, RY + 20, RZ + 0.5] });
      acts.push({
        name: '장미창 햇살', hint: '해가 기울자 장미창 색유리 빛줄기가 제단과 통로 위로 비스듬히 쏟아져요', hit: [X0 + 1, G + 3, RZ - 8, X0 + 6, G + 16, RZ + 8],
        run: async a => {
          a.flash('rose', 4, 4); a.glow(1.5, 4);
          const cols = [['#ff8a9a', '#ffd8e0'], ['#8ab0ff', '#d8e4ff'], ['#ffe08a', '#fff4d0'], ['#8ae0b0', '#d8f8e8']];
          for (let k = 0; k < 10; k++) { a.burst([X0 + 4 + k * 3.6, RY - k * 1.8, RZ + 0.5 + Math.sin(k) * 4], { n: 12, colors: cols[k % 4], speed: 1, up: -0.8, life: 2.4, gravity: 0.6, spread: 2.8 }); await a.wait(0.22); }
          await a.wait(1);
        },
      });
      acts.push({
        name: '촛불 켜기', hint: '제단의 금빛 촛대와 벽 촛대에 차례로 불이 붙어 예배당이 따뜻하게 밝아져요', hit: [AX - 1, G + 3, 30, AX + 8, G + 15, 62],
        run: async a => {
          for (const p of candles.concat(wallC)) { a.burst(p, { n: 12, colors: ['#ffe08a', '#fff4c8', '#ffb060'], speed: 2, up: 3.2, life: 1.2, gravity: -0.6, spread: 0.8 }); await a.wait(0.2); }
          a.flash('candles', 3, 3.4); a.flash('wallc', 3, 3.4);
          await a.wait(1);
        },
      });
      lights.push({ name: 'wallc', p: [wallC[1][0], G + 15, Z0 + 5], c: '#ffd890', i: 0.6, d: 32, flicker: 0.2 });

      // ── 신자석: 통로 양옆, 남북 현관 통로 자리는 비운다(앉는 판·등받이·팔걸이·성경) ──
      for (let x = X0 + 22; x < X1 - 4; x += 6) {
        if (x >= 62 && x <= 79) continue;
        for (const [z0, z1] of [[x >= 82 && x <= 112 ? 33 : 26, 40], [52, 66]]) {
          w.box(x, G + 1, z0 + 1, x, G + 1, z1 - 1, B.pewD);
          w.box(x, G + 2, z0, x + 1, G + 2, z1, B.pew);
          w.box(x + 2, G + 1, z0, x + 2, G + 5, z1, B.pewD); w.box(x + 2, G + 6, z0, x + 2, G + 6, z1, B.pew);
          for (const z of [z0, z1]) { w.box(x, G + 1, z, x + 2, G + 3, z, B.pewD); w.set(x + 2, G + 6, z, B.pewD); }
          for (let z = z0 + 3; z < z1 - 1; z += 5) if ((x + z) % 3) w.set(x + 1, G + 3, z, B.book);
        }
      }
      // ── 북쪽 벽 풍금: 금빛·은빛 파이프, 건반 두 단, 음전, 의자 ──
      const OX = 97;
      for (let k = 0; k < 17; k++) {
        const x = OX - 8 + k, h = 12 + Math.round((8 - Math.abs(k - 8)) * 1.8);
        w.box(x, G + 7, Z0 + 1, x, G + 7 + h, Z0 + 1, k % 2 ? B.pipeG : B.pipe);
        w.set(x, G + 8 + h, Z0 + 1, B.whiteDk); w.set(x, G + 9, Z0 + 2, B.ironDk);
      }
      w.box(OX - 10, G + 1, Z0 + 1, OX + 10, G + 6, Z0 + 4, B.pew); w.box(OX - 10, G + 6, Z0 + 1, OX + 10, G + 6, Z0 + 4, B.pewD);
      w.box(OX - 10, G + 1, Z0 + 1, OX - 10, G + 9, Z0 + 4, B.pewD); w.box(OX + 10, G + 1, Z0 + 1, OX + 10, G + 9, Z0 + 4, B.pewD);
      for (let x = OX - 7; x <= OX + 7; x++) { w.set(x, G + 6, Z0 + 5, x % 2 ? B.keys : B.keysB); w.set(x, G + 7, Z0 + 4, x % 3 ? B.keys : B.keysB); }
      for (const x of [OX - 9, OX + 9]) for (let y = G + 7; y <= G + 8; y++) w.set(x, y, Z0 + 4, B.brass);
      w.box(OX - 5, G + 3, Z0 + 9, OX + 5, G + 3, Z0 + 10, B.pewD); for (const x of [OX - 5, OX + 5]) w.box(x, G + 1, Z0 + 9, x, G + 2, Z0 + 10, B.pewD);
      w.box(OX - 10, G + 10, Z0 + 3, OX - 10, G + 10, Z0 + 3, B.gold); w.set(OX - 10, G + 11, Z0 + 3, B.candle);
      acts.push({
        name: '풍금', hint: '북쪽 벽 풍금이 울리기 시작하며 금빛 음표가 파이프에서 피어올라요', hit: [OX - 10, G + 1, Z0 + 1, OX + 10, G + 8, Z0 + 10],
        run: async a => {
          for (let k = 0; k < 12; k++) {
            const x = OX - 8 + (k * 5) % 17;
            a.burst([x + 0.5, G + 24 + (k % 3) * 2, Z0 + 2.5], { n: 8, colors: ['#ffe08a', '#ffffff', '#f4d8a0'], speed: 2, up: 3.2, life: 2, gravity: -0.6, spread: 1.2 });
            await a.wait(0.22);
          }
          a.burst([OX + 0.5, G + 12, Z0 + 12], { n: 20, colors: ['#ffffff', '#ffe08a'], speed: 3.2, up: 4, life: 2.2, gravity: -0.4, spread: 4 });
        },
      });
      landmarks.push({ name: '풍금', note: '일요일 아침 예배', p: [OX + 0.5, G + 44, Z0 + 1.5] });

      // ── 종탑 현관: 남쪽 문, 종 줄, 종루 계단 ──
      for (let z = Z1; z <= VZ1; z++) for (let x = VX0; x <= VX1; x++) {
        const edge = x === VX0 || x === VX1 || z === VZ1;
        if (!edge || z === Z1) continue;
        const top = x === VX0 ? G + 30 : G + 6, u = z === VZ1 ? x : z;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y <= G + 5 ? stone(u, y, 6) : (y === top ? B.trim : B.white));
      }
      // 본당으로 가는 뾰족 아치(현관 북쪽 = 본당 남쪽 벽)
      for (let x = 66; x <= 77; x++) for (let y = G + 1; y <= G + 16; y++) w.set(x, y, Z1, 0);
      for (const x of [64, 65, 78, 79]) w.box(x, G + 1, Z1, x, G + 16, Z1, B.whiteDk);
      w.box(66, G + 15, Z1, 77, G + 16, Z1, B.whiteDk); w.box(68, G + 17, Z1, 75, G + 17, Z1, B.whiteDk); w.box(70, G + 18, Z1, 73, G + 18, Z1, B.trim);
      for (const x of [66, 77]) w.set(x, G + 14, Z1, B.whiteDk);
      // 남쪽 문(밖으로): 문짝 두 짝(폭 4·높이 10), 금빛 상인방, 쇠 손잡이
      const DX0 = 70, DX1 = 73;
      for (let x = DX0 - 2; x <= DX1 + 2; x++) for (let y = G + 1; y <= G + 13; y++) {
        const leaf = x >= DX0 && x <= DX1 && y <= G + 10;
        w.set(x, y, VZ1, leaf ? ((x === DX0 || x === DX1 || y === G + 10 || y === G + 5) ? B.pewD : B.door) : (y === G + 11 || y === G + 12 ? B.gold : B.whiteDk));
      }
      w.set(DX0 + 1, G + 6, VZ1 - 1, B.iron); w.set(DX1 - 1, G + 6, VZ1 - 1, B.iron);
      lights.push({ name: 'porch', p: [71.5, G + 10, VZ1 - 3], c: '#ffd890', i: 0.5, d: 20, flicker: 0.1, srcR: 8 });
      for (const x of [DX0 - 4, DX1 + 4]) { w.set(x, G + 8, VZ1 - 1, B.iron); w.box(x, G + 9, VZ1 - 1, x, G + 10, VZ1 - 1, B.lampG); }
      acts.push(OR.goAct({ at: [DX0 + 2, G + 1, VZ1 - 2], name: '밖으로 나가기', goto: 'elmrow', hint: '종탑 문을 열고 판석 앞뜰과 회양목 울타리가 있는 맨 위 단으로 나가요', hit: [DX0, G + 1, VZ1 - 2, DX1, G + 10, VZ1], h: 12 }));
      // 방명록 받침대(현관 동쪽)
      const GX = 78, GZ = 84;
      w.box(GX, G + 1, GZ - 1, GX + 1, G + 1, GZ + 2, B.pewD); w.box(GX, G + 2, GZ, GX, G + 6, GZ + 1, B.pewD);
      w.box(GX - 2, G + 7, GZ - 1, GX + 1, G + 7, GZ + 2, B.pew); w.box(GX - 2, G + 8, GZ - 1, GX - 1, G + 8, GZ + 2, B.page); w.box(GX, G + 8, GZ - 1, GX, G + 8, GZ + 2, B.book);
      w.set(GX, G + 9, GZ + 2, B.iron);
      const quill = w.prop({ name: 'quill', pivot: [GX - 1, G + 10, GZ + 1] });
      quill.set(GX - 2, G + 9, GZ, B.ironDk); quill.box(GX - 2, G + 10, GZ, GX - 2, G + 12, GZ, B.quill); quill.box(GX - 2, G + 13, GZ - 1, GX - 2, G + 15, GZ - 1, B.quill); quill.set(GX - 2, G + 14, GZ - 2, B.quill);
      acts.push({
        name: '방명록 쓰기', hint: '현관 받침대의 흰 깃펜이 저절로 움직여 방명록에 오늘 날짜를 적어요', hit: [GX - 3, G + 1, GZ - 2, GX + 2, G + 12, GZ + 3],
        run: async a => {
          await a.move('quill', [0, 3.6, 0], 0.5);
          for (let k = 0; k < 4; k++) { await a.move('quill', [0, 0.4, k % 2 ? -1.2 : 2.4], 0.3); a.burst([GX - 1.5, G + 9, GZ + 1], { n: 6, colors: ['#1a1a2a', '#6a5a8a'], speed: 0.8, up: 1.2, life: 0.6, gravity: 0, spread: 0.6 }); }
          a.burst([GX - 1.5, G + 10, GZ + 0.5], { n: 14, colors: ['#ffe08a', '#ffffff'], speed: 2, up: 3.2, life: 1.4, gravity: -0.6, spread: 1 });
          await a.move('quill', [0, 0, 0], 0.5);
        },
      });
      // 종루 계단: 현관 서쪽 벽을 따라 북쪽으로 오른다(z90 → z77, 한 단 1칸), 위는 종루로 이어지는 층계참
      for (let i = 0; i < 14; i++) { const z = 90 - i; w.box(VX0 + 1, G + 1, z, VX0 + 4, G + i, z, B.pewD); w.box(VX0 + 1, G + 1 + i, z, VX0 + 4, G + 1 + i, z, i % 2 ? B.pew : B.wood); }
      w.box(VX0 + 1, G + 14, Z1 + 1, VX0 + 6, G + 14, Z1 + 4, B.pew); w.box(VX0 + 1, G + 1, Z1 + 1, VX0 + 1, G + 13, Z1 + 1, B.pewD);
      for (let z = Z1 + 1; z <= Z1 + 4; z++) w.box(VX0 + 6, G + 15, z, VX0 + 6, G + 17, z, z % 2 ? B.wood : 0);
      w.box(VX0 + 6, G + 18, Z1 + 1, VX0 + 6, G + 18, Z1 + 4, B.wood);
      for (let i = 0; i < 14; i += 2) w.box(VX0 + 5, G + 2 + i, 90 - i, VX0 + 5, G + 5 + i, 90 - i, B.wood);
      w.line(VX0 + 5, G + 6, 90, VX0 + 5, G + 18, 77, B.wood);
      // 종 줄(부품)과 현관 위 들보, 위쪽 종(부품)
      const RX = 76, RZ2 = 82, rLen = 22;
      w.box(VX0 + 1, G + 32, RZ2, VX1, G + 32, RZ2, B.wood); w.box(VX1, G + 7, RZ2, VX1, G + 31, RZ2, B.wood);
      MH.rope(w, 'bellrope', RX, G + 31, RZ2, rLen, B.rope);
      const tuft = w.prop({ name: 'tuft', pivot: [RX + 0.5, G + 10, RZ2 + 0.5] });
      tuft.box(RX, G + 6, RZ2, RX, G + 9, RZ2, B.bannerR); tuft.set(RX - 1, G + 7, RZ2, B.bannerR); tuft.set(RX + 1, G + 7, RZ2, B.bannerR);
      const bell = w.prop({ name: 'cbell', pivot: [RX - 5, G + 42, RZ2 + 0.5], axis: 'x' });
      bell.box(RX - 6, G + 40, RZ2, RX - 5, G + 41, RZ2, B.iron); bell.ellipsoid(RX - 5.5, G + 37, RZ2 + 0.5, 3.2, 3.2, 3.2, B.bell, (dx, dy) => dy >= -2);
      bell.box(RX - 6, G + 34, RZ2, RX - 5, G + 34, RZ2, B.ironDk);
      w.box(VX0, G + 31, RZ2, VX0, G + 44, RZ2, B.wood); w.set(VX0, G + 45, RZ2, B.trim); w.box(VX0 + 1, G + 43, RZ2, RX - 3, G + 43, RZ2, B.wood);
      acts.push({
        name: '종 줄 당기기', hint: '현관에 드리운 종 줄을 당기면 머리 위 종이 흔들리며 맑은 종소리가 울려 퍼져요', hit: [RX - 2, G + 1, RZ2 - 2, RX + 2, G + 10, RZ2 + 2],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.rope('bellrope', rLen, rLen + 4, 0.35), a.move('tuft', [0, -4, 0], 0.35), a.turn('cbell', [0.6, 0, 0], 0.35)]);
            a.burst([RX - 4, G + 36, RZ2 + 0.5], { n: 18, colors: ['#ffffff', '#e8eef8', '#ffe9a0'], speed: 10, up: 1, life: 1.2, gravity: 2, spread: 4, flat: true });
            await Promise.all([a.rope('bellrope', rLen, rLen, 0.35), a.move('tuft', [0, 0, 0], 0.35), a.turn('cbell', [-0.5, 0, 0], 0.35)]);
          }
          await a.turn('cbell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '종탑 현관', note: '종 줄과 종루 계단', p: [71.5, G + 52, 83.5] });
      // 첨탑 바람: 층계참 위 작은 창으로 바람이 들고 풍향계 소리가 내려온다
      for (let z = Z1 + 6; z <= Z1 + 9; z++) for (let y = G + 20; y <= G + 26; y++) w.set(VX0, y, z, (z === Z1 + 6 || z === Z1 + 9 || y === G + 20 || y === G + 26) ? B.whiteDk : (y === G + 23 ? B.lead : B.glassW));
      acts.push({
        name: '첨탑 풍향계 소리', hint: '바람이 거세지자 첨탑 금빛 수탉 풍향계가 삐걱 도는 소리가 종루 계단을 타고 내려와요', hit: [VX0 + 1, G + 14, Z1 + 1, VX0 + 6, G + 20, Z1 + 4],
        run: async a => {
          a.wind(2.6, 3.4);
          for (let k = 0; k < 8; k++) { a.burst([VX0 + 4, G + 44 - k * 3.6, Z1 + 3 + k * 1.2], { n: 10, colors: ['#e8c040', '#ffffff', '#d8e8f8'], speed: 4.8, up: 1.2, life: 1.4, gravity: 0.8, spread: 2.4, flat: true }); await a.wait(0.2); }
          a.burst([VX0 + 4, G + 18, Z1 + 2.5], { n: 16, colors: ['#6aaa48', '#e8c040', '#c8b060'], speed: 4, up: 2, life: 1.8, gravity: 2, spread: 2.8 });
        },
      });
      return { lights, landmarks, acts };
    },
  }));
})();
