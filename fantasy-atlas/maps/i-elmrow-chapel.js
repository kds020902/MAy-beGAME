// 작은 예배당(하위 지도) — 주택가 맨 위 단의 흰 예배당 안. 종탑 현관(종 줄과 종루 계단)에서 아치를 지나 본당으로,
// 붉은 통로 양옆 신자석, 서쪽 한 단 높은 제단과 장미창, 북쪽 벽 풍금, 방명록 받침대. 남·동쪽(카메라 쪽) 벽은 낮게 잘랐다 (72칸)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 72, D = 56, Hh = 56, G = 10;
  const { KP, DAY } = window.KINGDOM;
  MAPS.push(Object.assign({}, DAY, {
    id: 'elmrow-chapel', cat: 'kingdom', sub: true, parent: 'elmrow', name: '작은 예배당', en: 'Elm Row · Little Chapel', color: '#c8d8f0', seed: 2131, base: G, size: [W, D, Hh],
    desc: '느릅나무 주택가 맨 위 단의 흰 예배당. 푸른 첨탑 아래 종탑 현관으로 들어서면 종 줄이 드리워 있고, 아치 너머 본당에는 붉은 통로 양옆으로 신자석이 줄지어 있다. 서쪽 제단 뒤 둥근 장미창으로 해 질 녘 빛이 들고, 북쪽 벽 풍금은 일요일마다 울린다.',
    info: { title: '장소 정보', en: 'CHAPEL', rows: [['현관', '종탑 아래 · 종 줄과 종루 계단'], ['본당', '붉은 통로와 신자석 열두 줄'], ['제단', '둥근 장미창 · 금빛 촛대'], ['풍금', '북쪽 벽 · 일요일 아침 예배']] },
    night: { sky: ['#283048', '#0a0c18', '#d8a068'], stars: true, hemi: ['#b8c0d8', '#1a1814', 0.48], sun: ['#d0d8ff', 0.3, [0.5, 1, 0.45]], haze: '#262a34' },
    hemi: ['#ffffff', '#5a5448', 0.62], sun: ['#fff4e0', 0.62, [0.5, 1, 0.45]],
    fog: { start: 0.88, floor: G - 5, depth: 6, haze: [8, 0.12, 6], hazeColor: '#e0e4ec' },
    camY: -1, zoom: 1.45,
    particles: [
      { n: 70, colors: ['#fff6d8', '#ffffff'], mode: 'drift', speed: 0.1, wind: 0.04, area: [30, 23, 16], y0: G + 2, y1: G + 18, glow: true },
      { n: 30, colors: ['#ffd8a0', '#c8d8ff', '#ffb8c8'], mode: 'fall', speed: 0.08, area: [18, 23, 6], y0: G + 4, y1: G + 16, glow: true },
    ],
    blocks: Object.assign({}, KP, {
      floorW: { c: '#c8c4bc', top: '#e4e0d8', v: 0.03, pat: 'check', alt: '#cfcac0' }, carpet: { c: '#8a2a34', top: '#a8343e', v: 0.03 }, carpetG: { c: '#d8b048', v: 0.03 },
      pew: { c: '#6a4428', v: 0.05, pat: 'plank' }, pewD: { c: '#4e321e', v: 0.05 }, cloth: { c: '#f6f2ea', v: 0.02 }, bell: { c: '#d8b048', v: 0.04 },
      candle: { c: '#fff0c0', glow: true }, flame: { c: '#ffb860', glow: true }, pipe: { c: '#c8c8d0', v: 0.03, pat: 'log' }, pipeG: { c: '#e0b84a', v: 0.03, pat: 'log' }, keys: { c: '#f4f4ec', v: 0.02 },
      roseR: { c: '#e04a5a', glow: true }, roseB: { c: '#4a7ae0', glow: true }, roseY: { c: '#f0d060', glow: true }, roseG: { c: '#5ac08a', glow: true }, lead: { c: '#3a3a44', v: 0.02 },
      book: { c: '#6a2a2a', v: 0.03 }, page: { c: '#f8f2e0', v: 0.02 }, quill: { c: '#f8f8f4', v: 0.02 }, glassW: { c: '#cfe0f4', v: 0.02 },
    }),
    build(w) {
      const B = w.id;
      MH.terrain(w, { floor: G - 6, height: () => G, surface: (x, z) => hash3(x, 3, z) > 0.7 ? B.grass2 : B.grass, under: (x, z, y, dep) => dep < 2 ? B.dirt : B.rock });
      const lights = [], acts = [], landmarks = [];
      const X0 = 12, X1 = 60, Z0 = 10, Z1 = 36, TOP = G + 18;              // 본당
      const VX0 = 31, VX1 = 40, VZ1 = 46;                                   // 종탑 현관(z36~46)
      // ── 바닥 ──
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) w.set(x, G, z, B.floorW);
      for (let z = Z1; z <= VZ1; z++) for (let x = VX0; x <= VX1; x++) w.set(x, G, z, B.floorW);
      // 붉은 통로(동서)와 현관에서 오는 통로(남북)
      for (let x = X0 + 9; x < X1; x++) for (let z = 22; z <= 24; z++) w.set(x, G, z, z === 23 ? B.carpet : (x % 4 ? B.carpet : B.carpetG));
      for (let z = 25; z < VZ1; z++) for (let x = 34; x <= 37; x++) w.set(x, G, z, (x === 34 || x === 37) && z % 4 === 0 ? B.carpetG : B.carpet);
      // ── 벽: 북·서는 높게(뾰족 아치 창과 버팀 기둥), 남·동·현관 앞은 낮게 ──
      const wallAt = (x, z) => ((x === X0 || x === X1) && z >= Z0 && z <= Z1) || ((z === Z0 || z === Z1) && x >= X0 && x <= X1);
      for (let z = Z0; z <= Z1; z++) for (let x = X0; x <= X1; x++) {
        if (!wallAt(x, z)) continue;
        const low = z === Z1 || x === X1, top = low ? G + 3 : TOP;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === G + 1 ? B.whiteDk : (y === top ? B.trim : B.white));
      }
      // 북쪽 벽 뾰족 아치 창과 안쪽 기둥
      for (let x = X0 + 6; x < X1 - 2; x += 8) {
        LB.arch(w, { axis: 'x', c: Z0, u0: x, y0: G + 5, a: 1.4, h: 7, kind: 'pointed', fill: B.glassW, frame: B.whiteDk });
        if (x + 4 < X1) { w.box(x + 4, G + 1, Z0 + 1, x + 4, TOP - 1, Z0 + 1, B.whiteDk); w.set(x + 4, TOP, Z0 + 1, B.trim); }
      }
      for (let x = X0 + 1; x < X1; x++) w.set(x, TOP - 1, Z0 + 1, x % 2 ? B.wood : B.whiteDk);
      // 지붕 들보(북쪽 벽 위로 걸친 서까래 끝)
      for (let x = X0 + 2; x < X1; x += 4) w.box(x, TOP, Z0 + 1, x, TOP, Z0 + 3, B.wood);
      // ── 서쪽 제단: 한 단 높은 성단, 제단, 금빛 촛대, 장미창 ──
      for (let z = Z0 + 1; z < Z1; z++) for (let x = X0 + 1; x <= X0 + 8; x++) w.set(x, G + 1, z, x === X0 + 8 ? B.whiteDk : (z === 23 ? B.carpet : B.floorW));
      const AX = X0 + 4;
      w.box(AX, G + 2, 20, AX + 1, G + 3, 26, B.white); w.box(AX, G + 4, 20, AX + 1, G + 4, 26, B.cloth); w.box(AX + 1, G + 2, 21, AX + 1, G + 3, 25, B.gold);
      w.set(AX, G + 5, 23, B.book); w.set(AX, G + 5, 22, B.page);
      const candles = [];
      for (const z of [20, 26]) { w.set(AX, G + 5, z, B.gold); w.set(AX, G + 6, z, B.candle); candles.push([AX + 0.5, G + 6.5, z + 0.5]); }
      for (const z of [16, 30]) { w.box(AX + 2, G + 2, z, AX + 2, G + 5, z, B.gold); w.box(AX + 1, G + 6, z, AX + 3, G + 6, z, B.gold); for (const dx of [1, 2, 3]) { w.set(AX + dx, G + 7, z, B.candle); } candles.push([AX + 2.5, G + 7.5, z + 0.5]); }
      // 장미창(서쪽 벽, 지름 11): 바퀴살 납틀과 색유리
      const RY = G + 12, RZ = 23;
      for (let z = RZ - 6; z <= RZ + 6; z++) for (let y = RY - 6; y <= RY + 6; y++) {
        const dz = z - RZ, dy = y - RY, r = Math.hypot(dz, dy);
        if (r > 6.3) continue;
        let b;
        if (r > 5.4) b = B.whiteDk;
        else if (r < 1.2) b = B.roseY;
        else { const a = Math.atan2(dy, dz), sp = Math.abs(((a / (Math.PI / 4)) % 1 + 1) % 1 - 0.5) < 0.12; b = sp ? B.lead : (r < 3 ? B.roseR : ((Math.floor(a / (Math.PI / 4)) & 1) ? B.roseB : B.roseG)); }
        w.set(X0, y, z, b);
      }
      lights.push({ name: 'rose', p: [X0 + 2, RY, RZ + 0.5], c: '#ffd8b0', i: 0.9, d: 26, flicker: 0.03, srcR: 6 });
      lights.push({ name: 'candles', p: [AX + 1, G + 7, 23.5], c: '#ffd890', i: 0.8, d: 14, flicker: 0.2 });
      landmarks.push({ name: '장미창', note: '제단 뒤 둥근 색유리 창', p: [X0 + 0.5, RY + 10, RZ + 0.5] });
      acts.push({
        name: '장미창 햇살', hint: '해가 기울자 장미창 색유리 빛줄기가 제단과 통로 위로 비스듬히 쏟아져요', hit: [X0 + 1, G + 2, RZ - 4, X0 + 3, G + 8, RZ + 4],
        run: async a => {
          a.flash('rose', 4, 4); a.glow(1.5, 4);
          const cols = [['#ff8a9a', '#ffd8e0'], ['#8ab0ff', '#d8e4ff'], ['#ffe08a', '#fff4d0'], ['#8ae0b0', '#d8f8e8']];
          for (let k = 0; k < 10; k++) { a.burst([X0 + 2 + k * 1.8, RY - k * 0.9, RZ + 0.5 + Math.sin(k) * 2], { n: 12, colors: cols[k % 4], speed: 0.5, up: -0.4, life: 2.4, gravity: 0.3, spread: 1.4 }); await a.wait(0.22); }
          await a.wait(1);
        },
      });
      acts.push({
        name: '촛불 켜기', hint: '제단의 금빛 촛대와 벽 촛대에 차례로 불이 붙어 예배당이 따뜻하게 밝아져요', hit: [AX - 1, G + 2, 18, AX + 3, G + 7, 28],
        run: async a => {
          for (const p of candles.concat(wallC)) { a.burst(p, { n: 12, colors: ['#ffe08a', '#fff4c8', '#ffb060'], speed: 1, up: 1.6, life: 1.2, gravity: -0.3, spread: 0.4 }); await a.wait(0.2); }
          a.flash('candles', 3, 3.4); a.flash('wallc', 3, 3.4);
          await a.wait(1);
        },
      });
      // 벽 촛대(북쪽 기둥)
      const wallC = [];
      for (let x = X0 + 10; x < X1 - 2; x += 8) { w.set(x, G + 6, Z0 + 1, B.gold); w.set(x, G + 7, Z0 + 1, B.candle); wallC.push([x + 0.5, G + 7.5, Z0 + 1.5]); }
      lights.push({ name: 'wallc', p: [X0 + 26.5, G + 7, Z0 + 2], c: '#ffd890', i: 0.6, d: 16, flicker: 0.2 });

      // ── 신자석: 통로 양옆, 남북 현관 통로 자리는 비운다 ──
      for (let x = X0 + 11; x < X1 - 2; x += 3) {
        if (x >= 32 && x <= 39) continue;
        for (const [z0, z1] of [[x >= 40 && x <= 55 ? 16 : 13, 20], [26, 33]]) {
          w.box(x, G + 1, z0, x, G + 1, z1, B.pew); w.box(x + 1, G + 1, z0, x + 1, G + 2, z1, B.pewD);
          w.set(x, G + 1, z0, B.pewD); w.set(x, G + 1, z1, B.pewD);
          if ((x + z0) % 2) w.set(x, G + 2, z0 + 2, B.book);
        }
      }
      // ── 북쪽 벽 풍금: 금빛·은빛 파이프, 건반, 의자 ──
      const OX = 48;
      for (let k = 0; k < 9; k++) { const x = OX - 4 + k, h = 6 + Math.round((4 - Math.abs(k - 4)) * 1.6); w.box(x, G + 4, Z0 + 1, x, G + 4 + h, Z0 + 1, k % 2 ? B.pipeG : B.pipe); w.set(x, G + 5 + h, Z0 + 1, B.whiteDk); }
      w.box(OX - 5, G + 1, Z0 + 1, OX + 5, G + 3, Z0 + 2, B.pew); w.box(OX - 3, G + 3, Z0 + 3, OX + 3, G + 3, Z0 + 3, B.keys); w.box(OX - 3, G + 1, Z0 + 5, OX + 3, G + 1, Z0 + 5, B.pewD);
      w.set(OX - 5, G + 4, Z0 + 2, B.candle);
      acts.push({
        name: '풍금', hint: '북쪽 벽 풍금이 울리기 시작하며 금빛 음표가 파이프에서 피어올라요', hit: [OX - 5, G + 1, Z0 + 1, OX + 5, G + 4, Z0 + 5],
        run: async a => {
          for (let k = 0; k < 12; k++) {
            const x = OX - 4 + (k * 5) % 9;
            a.burst([x + 0.5, G + 12 + (k % 3), Z0 + 1.5], { n: 8, colors: ['#ffe08a', '#ffffff', '#f4d8a0'], speed: 1, up: 1.6, life: 2, gravity: -0.3, spread: 0.6 });
            await a.wait(0.22);
          }
          a.burst([OX + 0.5, G + 6, Z0 + 6], { n: 20, colors: ['#ffffff', '#ffe08a'], speed: 1.6, up: 2, life: 2.2, gravity: -0.2, spread: 2 });
        },
      });
      landmarks.push({ name: '풍금', note: '일요일 아침 예배', p: [OX + 0.5, G + 22, Z0 + 1.5] });

      // ── 종탑 현관: 남쪽 문, 종 줄, 종루 계단 ──
      for (let z = Z1; z <= VZ1; z++) for (let x = VX0; x <= VX1; x++) {
        const edge = x === VX0 || x === VX1 || z === VZ1;
        if (!edge || z === Z1) continue;
        const top = G + 3;
        for (let y = G + 1; y <= top; y++) w.set(x, y, z, y === G + 1 ? B.whiteDk : (y === top ? B.trim : B.white));
      }
      // 본당으로 가는 뾰족 아치(현관 북쪽 = 본당 남쪽 벽)
      for (let x = 33; x <= 38; x++) for (let y = G + 1; y <= G + 7; y++) w.set(x, y, Z1, 0);
      w.box(32, G + 1, Z1, 32, G + 7, Z1, B.whiteDk); w.box(39, G + 1, Z1, 39, G + 7, Z1, B.whiteDk); w.box(33, G + 8, Z1, 38, G + 8, Z1, B.whiteDk); w.box(34, G + 9, Z1, 37, G + 9, Z1, B.trim);
      // 남쪽 문(밖으로): 문짝 두 칸, 금빛 상인방
      const DX0 = 35, DX1 = 36;
      for (let x = DX0 - 1; x <= DX1 + 1; x++) for (let y = G + 1; y <= G + 7; y++) {
        const leaf = x >= DX0 && x <= DX1 && y <= G + 5;
        w.set(x, y, VZ1, leaf ? B.door : (y === G + 6 ? B.gold : B.whiteDk));
      }
      w.set(DX0, G + 3, VZ1, B.iron);
      lights.push({ name: 'porch', p: [35.5, G + 5, VZ1 - 1.5], c: '#ffd890', i: 0.5, d: 10, flicker: 0.1 });
      w.set(DX0 - 2, G + 4, VZ1 - 1, B.lampG); w.set(DX1 + 2, G + 4, VZ1 - 1, B.lampG);
      acts.push(OR.goAct({ at: [DX0, G + 1, VZ1 - 1], name: '밖으로 나가기', goto: 'elmrow', hint: '종탑 문을 열고 판석 앞뜰과 회양목 울타리가 있는 맨 위 단으로 나가요', hit: [DX0, G + 1, VZ1 - 1, DX1, G + 5, VZ1], h: 7 }));
      // 방명록 받침대(현관 동쪽)
      const GX = 39, GZ = 42;
      w.box(GX, G + 1, GZ, GX, G + 3, GZ, B.pewD); w.box(GX - 1, G + 4, GZ, GX, G + 4, GZ + 1, B.pew); w.set(GX - 1, G + 5, GZ, B.page); w.set(GX - 1, G + 5, GZ + 1, B.page); w.set(GX, G + 5, GZ, B.book);
      const quill = w.prop({ name: 'quill', pivot: [GX - 0.5, G + 6, GZ + 0.5] });
      quill.set(GX - 1, G + 6, GZ, B.quill); quill.set(GX - 1, G + 7, GZ, B.quill); quill.set(GX - 1, G + 8, GZ - 1, B.quill);
      w.set(GX, G + 5, GZ + 1, B.iron);
      acts.push({
        name: '방명록 쓰기', hint: '현관 받침대의 흰 깃펜이 저절로 움직여 방명록에 오늘 날짜를 적어요', hit: [GX - 2, G + 1, GZ - 1, GX + 1, G + 6, GZ + 2],
        run: async a => {
          await a.move('quill', [0, 1.8, 0], 0.5);
          for (let k = 0; k < 4; k++) { await a.move('quill', [0, 0.2, k % 2 ? -0.6 : 1.2], 0.3); a.burst([GX - 0.5, G + 6, GZ + 0.8], { n: 6, colors: ['#1a1a2a', '#6a5a8a'], speed: 0.4, up: 0.6, life: 0.6, gravity: 0, spread: 0.3 }); }
          a.burst([GX - 0.5, G + 6.5, GZ + 0.5], { n: 14, colors: ['#ffe08a', '#ffffff'], speed: 1, up: 1.6, life: 1.4, gravity: -0.3, spread: 0.5 });
          await a.move('quill', [0, 0, 0], 0.5);
        },
      });
      // 종루 계단: 현관 서쪽 벽을 따라 북쪽으로 오른다(z45 → z38), 위는 종루로 이어지는 층계참
      for (let i = 0; i < 7; i++) { const z = 45 - i; w.box(VX0 + 1, G + 1, z, VX0 + 2, G + 1 + i, z, B.pewD); w.box(VX0 + 1, G + 1 + i, z, VX0 + 2, G + 1 + i, z, B.pew); }
      w.box(VX0 + 1, G + 7, Z1 + 1, VX0 + 3, G + 7, Z1 + 2, B.pew); w.box(VX0 + 3, G + 8, Z1 + 1, VX0 + 3, G + 9, Z1 + 2, B.wood);
      for (let z = Z1 + 3; z <= 45; z++) if (z % 2) w.set(VX0 + 3, G + 2 + (45 - z), z, B.wood);
      // 종 줄(부품)과 현관 위 들보, 위쪽 종(부품)
      w.box(VX0 + 1, G + 16, 41, VX1, G + 16, 41, B.wood); w.box(VX1, G + 4, 41, VX1, G + 15, 41, B.wood);
      const RX = 38, RZ2 = 41, rLen = 11;
      MH.rope(w, 'bellrope', RX, G + 15, RZ2, rLen, B.rope);
      const tuft = w.prop({ name: 'tuft', pivot: [RX + 0.5, G + 5, RZ2 + 0.5] });
      tuft.set(RX, G + 4, RZ2, B.bannerR); tuft.set(RX, G + 3, RZ2, B.bannerR);
      const bell = w.prop({ name: 'cbell', pivot: [RX - 2.5, G + 21, RZ2 + 0.5], axis: 'x' });
      bell.box(RX - 3, G + 20, RZ2, RX - 2, G + 20, RZ2, B.iron); bell.ellipsoid(RX - 2.5, G + 18.5, RZ2 + 0.5, 1.6, 1.6, 1.6, B.bell, (dx, dy) => dy >= -1);
      w.box(VX0, G + 4, 41, VX0, G + 21, 41, B.wood); w.box(VX0, G + 22, 41, VX0, G + 22, 41, B.trim); w.box(VX0 + 1, G + 21, 41, RX - 1, G + 21, 41, B.wood);
      acts.push({
        name: '종 줄 당기기', hint: '현관에 드리운 종 줄을 당기면 머리 위 종이 흔들리며 맑은 종소리가 울려 퍼져요', hit: [RX - 1, G + 1, RZ2 - 1, RX + 1, G + 5, RZ2 + 1],
        run: async a => {
          for (let k = 0; k < 4; k++) {
            await Promise.all([a.rope('bellrope', rLen, rLen + 2, 0.35), a.move('tuft', [0, -2, 0], 0.35), a.turn('cbell', [0.6, 0, 0], 0.35)]);
            a.burst([RX - 2, G + 18, RZ2 + 0.5], { n: 18, colors: ['#ffffff', '#e8eef8', '#ffe9a0'], speed: 5, up: 0.5, life: 1.2, gravity: 1, spread: 2, flat: true });
            await Promise.all([a.rope('bellrope', rLen, rLen, 0.35), a.move('tuft', [0, 0, 0], 0.35), a.turn('cbell', [-0.5, 0, 0], 0.35)]);
          }
          await a.turn('cbell', [0, 0, 0], 0.4);
        },
      });
      landmarks.push({ name: '종탑 현관', note: '종 줄과 종루 계단', p: [35.5, G + 26, 41.5] });
      // 첨탑 바람: 층계참 위 작은 창으로 바람이 들고 풍향계 소리가 내려온다
      acts.push({
        name: '첨탑 풍향계 소리', hint: '바람이 거세지자 첨탑 금빛 수탉 풍향계가 삐걱 도는 소리가 종루 계단을 타고 내려와요', hit: [VX0 + 1, G + 7, Z1 + 1, VX0 + 3, G + 10, Z1 + 2],
        run: async a => {
          a.wind(2.6, 3.4);
          for (let k = 0; k < 8; k++) { a.burst([VX0 + 2.5, G + 22 - k * 1.8, Z1 + 2 + k * 0.6], { n: 10, colors: ['#e8c040', '#ffffff', '#d8e8f8'], speed: 2.4, up: 0.6, life: 1.4, gravity: 0.4, spread: 1.2, flat: true }); await a.wait(0.2); }
          a.burst([VX0 + 2.5, G + 9, Z1 + 1.5], { n: 16, colors: ['#6aaa48', '#e8c040', '#c8b060'], speed: 2, up: 1, life: 1.8, gravity: 1, spread: 1.4 });
        },
      });
      return { lights, landmarks, acts };
    },
  }));
})();
