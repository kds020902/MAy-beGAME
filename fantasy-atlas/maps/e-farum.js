// 무너지는 파름 아즈라 · 말리케스의 결투장 — 대교 옆 축복(남동쪽 통로)에서 안개문을 지나면 지붕이 날아간 둥근 대전이 나온다.
// 맞은편(북서쪽) 큰 벽감에는 황금 룬 문장 창이 빛나고, 그 앞에 짐승 사제가 죽음의 룬을 지키고 앉아 있다. 벽은 군데군데 무너져 폭풍과 회오리가 보인다.
// 남서쪽 아래 떠 있는 폐허 덩어리의 '뼈 없는 아치'에 누우면 용왕 플라키도사크스의 결투장(하위 지도)으로 간다. (메인 보스: 흑검 말리케스)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 입구와 축복이 앞, 룬 벽감이 뒤, 대교는 오른쪽 아래로 휘어 나간다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 160;
  const RX = 84, RZ = 80;                                   // 둥근 대전 한가운데
  MAPS.push({
    id: 'farum', cat: 'lands', name: '무너지는 파름 아즈라', en: 'Crumbling Farum Azula · Maliketh', color: '#c8a870', seed: 947, base: 64, time: 'day', size: [W, D, Hh],
    desc: '시간 너머의 폭풍 속을 떠도는 파름 아즈라 꼭대기. 대교 옆 축복의 통로에서 안개문을 지나면 지붕이 날아간 둥근 대전이 나온다. 조각 기둥 발치마다 촛불이 타고, 맞은편 큰 벽감의 황금 룬 문장 앞에서 짐승 사제가 죽음의 룬을 지킨다. 그가 흑검 말리케스다.',
    info: { title: '장소 정보', en: 'BESIDE THE GREAT BRIDGE', rows: [['축복', '대교 옆 · 남동쪽 통로'], ['결투장', '지붕 없는 둥근 대전 · 조각 기둥과 촛불'], ['벽감', '북서쪽 · 황금 룬 문장과 죽음의 룬'], ['용왕의 결투장', '남서쪽 폐허의 뼈 없는 아치']] },
    monsters: { normal: ['파름 아즈라의 수인', '땅 잃은 기사', '파름 아즈라의 용'], mid: '용나무 파수병', boss: '흑검 말리케스' },
    sky: ['#d8c098', '#4e4e5a', '#ffe6b0'], stars: false,
    hemi: ['#fff0d8', '#4a4236', 0.64], sun: ['#fff0d0', 0.74, [0.4, 1, 0.55]],
    night: { sky: ['#8a7458', '#24242e', '#e8c890'], stars: true, hemi: ['#e0d0b8', '#2a241c', 0.52], sun: ['#ffe8c8', 0.52, [0.4, 1, 0.55]], haze: '#5a5040' },
    liquid: ['#6a7a88', '#9ab0c0', '#e8f4ff'], liqSpeed: 0.4,
    fog: { start: 0.8, floor: 30, depth: 16, haze: [44, 0.24, 14], hazeColor: '#c8b494', top: 152, topDepth: 10 },
    camY: 14, zoom: 1.3,
    particles: [
      { n: 620, colors: ['#a49a8c', '#c8bea8', '#7e786e', '#e8dcc0'], mode: 'vortex', center: [RX, RZ], r0: 56, r1: 94, rise: 1.6, spin: 0.45, jit: 4, y0: 22, y1: 152, glow: false },
      { n: 280, colors: ['#8a8070', '#b0a690'], mode: 'vortex', center: [RX, RZ], r0: 64, r1: 100, rise: 0.5, spin: 0.2, jit: 6, y0: 30, y1: 130, glow: false, size: 2 },
      { n: 220, colors: ['#e8dcc0', '#c8b494'], mode: 'drift', speed: 0.7, wind: 1.2, y0: 50, y1: 140, glow: false },
    ],
    blocks: {
      rock: { c: '#8a7e6c', v: 0.07, pat: 'big' }, rockDk: { c: '#665c4e', v: 0.07, pat: 'stone' }, soil: { c: '#7a6c58', top: '#a2926e', v: 0.08 }, grassD: { c: '#7a6c58', top: '#b0a272', v: 0.1 },
      stone: { c: '#b4a080', v: 0.05, pat: 'brick' }, stoneDk: { c: '#8c7a60', v: 0.05, pat: 'brick' }, trim: { c: '#d8c8a4', v: 0.03 }, pave: { c: '#a89878', top: '#bcac8c', v: 0.05, pat: 'check', alt: '#b0a080' },
      relief: { c: '#9a8462', v: 0.06, pat: 'stone' }, reliefL: { c: '#c4ae84', v: 0.05 },
      floorA: { c: '#4a443e', top: '#5a524a', v: 0.05 }, floorB: { c: '#3e3832', top: '#4c4540', v: 0.05 }, floorL: { c: '#6e6456', top: '#857868', v: 0.04 }, gold: { c: '#c8a860', v: 0.05 },
      statue: { c: '#8e867a', v: 0.06, pat: 'stone' }, bone: { c: '#d8ccb4', v: 0.06 },
      cloud: { c: '#9e968a', v: 0.08 }, cloud2: { c: '#c4bcac', v: 0.06 }, cloudDk: { c: '#6e6a62', v: 0.08 }, twist: { c: '#e4ddd0', v: 0.05 },
      bolt: { c: '#fff4c8', glow: true }, bolt2: { c: '#ffd060', glow: true },
      drag: { c: '#5c5a5c', v: 0.08, pat: 'stone' }, dragB: { c: '#7c7268', v: 0.07 }, dragW: { c: '#4a4644', v: 0.09 }, dragBone: { c: '#8e867c', v: 0.06 }, dragEye: { c: '#ffb040', glow: true },
      blade: { c: '#1c1416', v: 0.03 }, bladeEdge: { c: '#ff3a2a', glow: true }, dark: { c: '#1c1012', v: 0.03 },
      win: { c: '#ffd890', night: true, day: '#4a4440' }, rune: { c: '#ffd060', glow: true }, candle: { c: '#ffd8a8', glow: true }, wax: { c: '#e8dcc8', v: 0.03 },
      grace: { c: '#ffe9a0', glow: true }, fogG: { c: '#fff0c8', glow: true }, torch: { c: '#ffa040', glow: true }, iron: { c: '#3a3634', v: 0.03 },
      tower: { c: '#e2dccc', v: 0.04, pat: 'brick' }, towerDk: { c: '#bcb4a2', v: 0.04 },
      // 이정표(OR.signpost)용
      stoneG: { c: '#6e6456', v: 0.05 }, timber: { c: '#4a3a2c', v: 0.05 }, door: { c: '#6a5440', v: 0.05, pat: 'plank' }, mlamp: { c: '#ffd890', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, AF = base, TAU = Math.PI * 2;
      w.hm = new Int16Array(W * D); w.slope = new Float32Array(W * D);   // 땅이 없다: 하늘에 뜬 덩어리만 짓는다
      const lights = [], acts = [], landmarks = [];
      const RF = 41, RW1 = 46;                                // 바닥 끝 · 바깥벽 끝
      const camA = Math.atan2(0.73, 0.68), backF = th => 0.5 - 0.5 * Math.cos(th - camA);
      const ca = Math.cos(camA), sa = Math.sin(camA);
      const isl = (x, y, z, rx, rz, dep, salt) => LB.island(w, x, y, z, rx, rz, dep, { rock: B.rock, under: B.rockDk, soil: B.soil, salt, rough: 0.4, top: (xx, zz) => hash3(xx, 1, zz) > 0.7 ? B.grassD : B.soil });
      const col = (x, z, top, bot, topB) => {
        if (x < 0 || z < 0 || x >= W || z >= D) return;
        for (let y = bot; y < top; y++) w.set(x, y, z, top - y < 3 ? B.stoneDk : ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock));
        w.set(x, top, z, topB);
        const i = x + W * z; if (top > w.hm[i]) w.hm[i] = top;
      };
      const angD = (a, b) => Math.abs(((a - b) % TAU + TAU * 1.5) % TAU - Math.PI);
      // 대전 바닥: 어두운 돌에 금빛 동심원 홈과 방사선, 한가운데 문장
      const floorB = (r, th) => {
        if (r < 2.2) return B.gold;
        if (r < 3.4) return B.dark;
        for (const rr of [8, 16, 24, 33]) if (Math.abs(r - rr) < 0.55) return B.gold;
        if (r > RF - 2) return B.floorL;
        if (r > 4 && r < 33 && Math.abs(Math.sin(th * 8)) < 0.045 * (14 / r)) return B.gold;
        return ((Math.floor((th + Math.PI) / (TAU / 32)) + Math.floor(r / 4)) & 1) ? B.floorA : B.floorB;
      };

      // ══ 둥근 대전: 바닥과 그 아래 깎아지른 바위 뿌리 ══
      for (let z = RZ - RW1 - 3; z <= RZ + RW1 + 3; z++) for (let x = RX - RW1 - 3; x <= RX + RW1 + 3; x++) {
        const dx = x - RX, dz = z - RZ, r = Math.hypot(dx, dz), th = Math.atan2(dz, dx);
        if (r > RW1 + 1.5) continue;
        col(x, z, AF, Math.round(AF - 40 + Math.pow(r / RW1, 2) * 30 + n.fbm(x * 0.1, z * 0.1, 2) * 6), r <= RF ? floorB(r, th) : B.stoneDk);
      }
      // 바깥 벽: 시점 쪽은 무너져 낮고 맞은편은 높다. 안쪽 면에 두 단 아치(아래는 벽감, 위는 창), 사이에 조각 띠
      const GAPS = [camA + Math.PI * 0.62, camA - Math.PI * 0.7];                 // 무너져 폭풍이 보이는 틈 두 곳
      const wallTop = th => {
        let t = AF + 10 + 30 * Math.pow(backF(th), 1.3) + n.fbm(th * 6 + 2, 1.3, 2) * 7;
        for (const g of GAPS) { const d = angD(th, g); if (d < 0.32) t = Math.min(t, AF + 2 + d * 30 + n.fbm(th * 20, 4, 2) * 4); }
        return t;
      };
      const AW = 14, candles = [];
      const bth = camA + Math.PI;                                                   // 룬 벽감 방향(북서)
      for (let z = RZ - RW1 - 1; z <= RZ + RW1 + 1; z++) for (let x = RX - RW1 - 1; x <= RX + RW1 + 1; x++) {
        const dx = x - RX, dz = z - RZ, r = Math.hypot(dx, dz); if (r < RF + 0.6 || r > RW1) continue;
        const th = Math.atan2(dz, dx), u = th * 44, uc = Math.round(u / AW) * AW, du = u - uc;
        const dth = angD(th, camA);
        let top = Math.round(wallTop(th));
        if (dth < 0.17) top = Math.max(top, AF + 22);                               // 입구 문틀
        const pil = Math.abs(Math.abs(du) - AW / 2) < 1;
        if (r < RF + 1.4 && !pil) continue;                                         // 벽기둥만 한 칸 안으로 나온다
        for (let y = AF + 1; y <= top; y++) {
          const v = y - AF;
          let b = v % 8 === 0 ? B.trim : (pil ? B.reliefL : B.stone);
          if (!pil && r < 43.6) {
            if (LB.inArch(du, v - 1, 3.2, 11, 'round')) b = r < 42.9 ? 0 : B.dark;
            else if (LB.inArch(du, v - 17, 2.2, 9, 'round')) b = B.win;
            else if (v >= 13 && v <= 15) b = ((Math.round(du) + v) & 1) ? B.relief : B.reliefL;     // 조각 띠
            else if (v > 26) b = (hash3(x, y >> 1, z) > 0.5) ? B.relief : B.stone;
          }
          if (dth < 0.1 && v <= 15) b = 0;                                          // 입구
          if (angD(th, bth) < 0.16 && v <= 26 && r < 45) b = 0;                     // 룬 벽감 자리
          if (b) w.set(x, y, z, b);
        }
      }
      LB.crumble(w, RX - RW1, AF + 6, RZ - RW1, RX + RW1, AF + 44, RZ + RW1, 0.12, 2, 7);
      // 틈 바닥에 굴러떨어진 벽돌 더미
      for (const g of GAPS) for (let k = 0; k < 14; k++) {
        const a = g + (hash3(k, 2, 9) - 0.5) * 0.5, r = 36 + hash3(k, 3, 9) * 9, x = Math.round(RX + Math.cos(a) * r), z = Math.round(RZ + Math.sin(a) * r);
        w.box(x, AF + 1, z, x + (k & 1), AF + 1 + (hash3(k, 4, 9) * 3 | 0), z + 1, k % 3 ? B.stone : B.relief);
      }

      // ══ 조각 기둥: 둘레에 여덟 개, 발치마다 촛불 무더기(몇은 부러졌다) ══
      const pillars = [];
      for (let k = 0; k < 8; k++) {
        const th = camA + (k + 0.5) / 8 * TAU, x = Math.round(RX + Math.cos(th) * 30), z = Math.round(RZ + Math.sin(th) * 30), h = [24, 14, 30, 30, 30, 30, 18, 24][k];
        w.cyl(x, z, AF + 1, AF + 3, 3.6, B.stoneDk); w.cyl(x, z, AF + 4, AF + 4, 3.2, B.trim);
        for (let y = AF + 5; y < AF + 5 + h; y++) {
          const v = y - AF;
          w.cyl(x, z, y, y, 2.6, v % 7 === 0 ? B.trim : (v % 7 > 3 ? B.relief : B.stone));
        }
        if (h >= 30) { w.cyl(x, z, AF + 5 + h, AF + 6 + h, 3.4, B.trim); w.cyl(x, z, AF + 7 + h, AF + 7 + h, 2, B.reliefL); }
        else LB.crumble(w, x - 3, AF + h, z - 3, x + 3, AF + h + 5, z + 3, 0.45, 2, k);
        pillars.push([x, z, AF + 5 + h]);
        for (let q = 0; q < 9; q++) {
          const a = q / 9 * TAU + k, rr = 4.6 + (q % 3) * 0.8, cx = Math.round(x + Math.cos(a) * rr), cz = Math.round(z + Math.sin(a) * rr), hh = 1 + (q % 2);
          if (Math.hypot(cx - RX, cz - RZ) > RF - 1) continue;
          w.box(cx, AF + 1, cz, cx, AF + hh, cz, B.wax); w.set(cx, AF + hh + 1, cz, B.candle); candles.push([cx, cz, AF + hh + 1]);
        }
      }
      // 벽감 아래에도 촛불 줄
      for (let uc = -Math.PI * 44; uc < Math.PI * 44; uc += AW) {
        const th = Math.round(uc / AW) * AW / 44;
        if (angD(th, camA) < 1.4) continue;
        const x = Math.round(RX + Math.cos(th) * (RF - 0.5)), z = Math.round(RZ + Math.sin(th) * (RF - 0.5));
        w.set(x, AF + 1, z, B.wax); w.set(x, AF + 2, z, B.candle); candles.push([x, z, AF + 2]);
      }
      // 쓰러진 기둥 토막
      LB.tube(w, [[RX - 14, AF + 3, RZ + 12], [RX - 3, AF + 3, RZ + 20]], 2.6, B.stone);
      lights.push({ name: 'candles', p: [RX - 20.5, AF + 4, RZ - 20.5], c: '#ffc070', i: 0.4, d: 34, flicker: 0.4, srcR: 22 });
      lights.push({ name: 'candles', p: [RX + 20.5, AF + 4, RZ - 10.5], c: '#ffc070', i: 0.4, d: 34, flicker: 0.4, srcR: 22 });
      {
        const [px, pz] = pillars[4];
        acts.push({
          name: '기둥 발치의 촛불', hint: '조각 기둥 발치와 벽감 아래 촛불이 한 바퀴 차례로 타올라요', hit: [px - 6, AF + 1, pz - 6, px + 6, AF + 4, pz + 6],
          run: async a => { a.flash('candles', 4, 4.6); for (const [x, z, y] of candles.slice().sort((p, q) => Math.atan2(p[1] - RZ, p[0] - RX) - Math.atan2(q[1] - RZ, q[0] - RX)).filter((_, i) => i % 2 === 0)) { a.burst([x + 0.5, y + 1, z + 0.5], { n: 10, colors: ['#ffd8a8', '#ffb070'], speed: 0.8, up: 4, life: 1, gravity: -0.4, spread: 0.4 }); await a.wait(0.05); } },
        });
      }

      // ══ 북서쪽 룬 벽감: 깊은 아치 안 황금 룬 문장 창, 그 앞 뼈 무더기와 짐승 사제의 자리 ══
      const bx = Math.cos(bth), bz = Math.sin(bth), NR0 = 41, NR1 = 50;
      const NP = (r, s) => [Math.round(RX + bx * r - bz * s), Math.round(RZ + bz * r + bx * s)];
      for (let r = NR0; r <= NR1 + 2; r += 0.5) for (let s = -11; s <= 11; s += 0.5) {
        const [x, z] = NP(r, s);
        col(x, z, AF, AF - 12 - Math.round(Math.abs(s)), r > RF ? B.floorL : B.floorA);
        for (let y = AF + 1; y <= AF + 40; y++) {
          const v = y - AF, inN = LB.inArch(s, v - 1, 7, 26, 'round') && r < NR1;
          if (inN) { if (w.get(x, y, z)) w.set(x, y, z, 0); continue; }
          if (Math.abs(s) > 10.5 && r < 44) continue;
          if (v > 30 + Math.round(n.fbm(s * 0.4, 2, 2) * 8) - Math.abs(s) * 0.3) continue;
          let b = Math.abs(Math.abs(s) - 8.5) < 1 ? B.reliefL : (v % 8 === 0 ? B.trim : B.stone);
          if (LB.inArch(s, v - 1, 8, 27.5, 'round') && !LB.inArch(s, v - 1, 7, 26, 'round')) b = B.reliefL;     // 아치 테
          w.set(x, y, z, b);
        }
      }
      // 문장: 큰 원, 세로 줄기, 위아래 작은 원과 호(벽감 안쪽 면, 창살 뒤 빛)
      const EY = AF + 15, ER = NR1 - 0.5;
      for (let s = -6.5; s <= 6.5; s += 0.25) for (let v = -11; v <= 10; v += 0.25) {
        const d = Math.hypot(s, v), d2 = Math.hypot(s, v - 6.5), d3 = Math.hypot(s, v + 5);
        const on = Math.abs(d - 4.8) < 0.28 || (Math.abs(s) < 0.3 && v > -10 && v < 9.5) || Math.abs(d2 - 1.8) < 0.25 || (Math.abs(d3 - 2.8) < 0.25 && v < -5);
        const [x, z] = NP(ER, s), y = Math.round(EY + v);
        if (on) w.set(x, y, z, B.rune); else if (w.get(x, y, z) !== B.rune) w.set(x, y, z, B.dark);
      }
      // 뼈 무더기(짐승 사제가 먹어 온 죽음의 뼈)
      for (let k = 0; k < 40; k++) {
        const r = NR1 - 3 - hash3(k, 1, 3) * 4, s = (hash3(k, 2, 3) - 0.5) * 9, [x, z] = NP(r, s), hgt = (hash3(k, 4, 3) * 3) | 0;
        for (let y = AF + 1; y <= AF + 1 + hgt; y++) w.set(x, y, z, hash3(k, y, 7) > 0.3 ? B.bone : B.reliefL);
      }
      const [rnx, rnz] = NP(ER - 0.5, 0);
      lights.push({ name: 'rune', p: [rnx + 0.5, EY, rnz + 0.5], c: '#ffd060', i: 0.6, d: 30, flicker: 0.08, srcR: 6 });
      lights.push({ name: 'death', p: [RX + 0.5, AF + 8, RZ + 0.5], c: '#ff3020', i: 0.05, d: 60, flicker: 0.3, srcR: 30 });
      acts.push({
        name: '죽음의 룬 벽감', hint: '황금 룬 문장이 밝아졌다가, 그 안에 봉인된 죽음의 룬이 검붉은 불꽃으로 번져 나와요', hit: [rnx - 4, EY - 6, rnz - 4, rnx + 4, EY + 6, rnz + 4],
        run: async a => {
          a.flash('rune', 5, 2.4); a.glow(1.6, 2.4);
          for (let k = 0; k < 5; k++) { a.burst([rnx + 0.5 - bx * 2, EY, rnz + 0.5 - bz * 2], { n: 24, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 1.6, up: 2, life: 1.2, gravity: -0.3, spread: 3 }); await a.wait(0.3); }
          a.flash('death', 18, 3.6);
          for (let r = 4; r <= 36; r += 4) { for (let q = 0; q < 14; q++) { const t = q / 14 * TAU + r * 0.2; a.burst([RX + 0.5 + Math.cos(t) * r, AF + 1.5, RZ + 0.5 + Math.sin(t) * r], { n: 6, colors: ['#d0201a', '#1c1012', '#ff5a3a'], speed: 1.2, up: 4, life: 1.1, gravity: -0.6, spread: 0.8 }); } await a.wait(0.16); }
          await a.wait(0.8);
        },
      });
      landmarks.push({ name: '죽음의 룬 벽감', note: '황금 룬 문장 · 짐승 사제가 앉아 있던 자리', p: [rnx + 0.5, AF + 40, rnz + 0.5] });

      // ══ 흑검: 대전 한가운데 문장에서 솟는다(부품) ══
      const bladeP = w.prop({ name: 'blade', pivot: [RX + 0.5, AF + 1, RZ + 0.5], scl0: [0, 0, 0], clipOK: 10 });
      for (let y = 0; y < 26; y++) {
        const wd = y < 4 ? 0 : (y < 22 ? 1 : (y < 25 ? 0.5 : 0));
        for (let s = -1; s <= 1; s++) if (Math.abs(s) <= wd) bladeP.set(RX + s, AF + 1 + y, RZ, Math.abs(s) === 1 && y > 4 ? B.bladeEdge : B.blade);
      }
      bladeP.box(RX - 3, AF + 4, RZ, RX + 3, AF + 4, RZ, B.blade); bladeP.box(RX, AF + 1, RZ, RX, AF + 3, RZ, B.gold);
      acts.push({
        name: '흑검', hint: '대전 한가운데 문장에서 붉은 날을 두른 흑검이 솟아올라요. 짐승 사제가 흑검 말리케스의 정체를 드러내요', hit: [RX - 2, AF, RZ - 2, RX + 2, AF + 2, RZ + 2],
        run: async a => {
          a.flash('death', 14, 5); a.glow(1.5, 5);
          await a.tween('blade', { scl: [1, 1, 1] }, 1.2);
          for (let k = 0; k < 6; k++) { a.burst([RX + 0.5, AF + 6 + k * 3, RZ + 0.5], { n: 20, colors: ['#ff3a2a', '#1c1416', '#ff8a5a'], speed: 2, up: 3, life: 1.4, gravity: -0.2, spread: 1.4 }); await a.wait(0.3); }
          await a.wait(1); await a.tween('blade', { scl: [0, 0, 0] }, 1);
        },
      });
      landmarks.push({ name: '흑검 말리케스', note: '보스 · 짐승 사제의 정체, 죽음의 룬을 지키는 마리카의 그림자', p: [RX + 0.5, AF + 30, RZ + 0.5], boss: true });

      // ══ 입구: 안개문, 횃불 통로, 대교 옆 축복 ══
      const gx0 = RX + ca * 44, gz0 = RZ + sa * 44;
      for (let s = -3; s <= 3; s++) for (let y = AF + 1; y <= AF + 13; y++) { const x = Math.round(gx0 - sa * s), z = Math.round(gz0 + ca * s); if (hash3(x, y, z) > 0.55) w.set(x, y, z, B.fogG); }
      lights.push({ name: 'fog', p: [gx0 + ca * 3, AF + 6, gz0 + sa * 3], c: '#fff0c8', i: 0.6, d: 14, flicker: 0.2 });
      acts.push({
        name: '안개문', hint: '대전 입구를 막은 금빛 안개가 일렁이며 흩날려요', hit: [Math.round(gx0) - 3, AF + 1, Math.round(gz0) - 3, Math.round(gx0) + 3, AF + 12, Math.round(gz0) + 3],
        run: async a => { a.flash('fog', 4, 3); for (let k = 0; k < 8; k++) { a.burst([gx0 + 0.5, AF + 2 + k * 1.3, gz0 + 0.5], { n: 22, colors: ['#fff0c8', '#ffffff', '#ffd060'], speed: 3, up: 1, life: 1.4, gravity: -0.4, spread: 4, flat: true }); await a.wait(0.18); } },
      });
      // 통로: 양쪽 벽에 기둥과 횃불, 끝에 축복(지붕은 무너졌다)
      const CL = 66, TPX = Math.round(RX + ca * CL), TPZ = Math.round(RZ + sa * CL);
      for (let z = RZ; z <= TPZ + 12; z++) for (let x = RX; x <= TPX + 12; x++) {
        const dx = x - RX, dz = z - RZ, al = dx * ca + dz * sa, ac = -dx * sa + dz * ca;
        if (!(al > RW1 - 1 && al < CL + 6 && Math.abs(ac) <= 6.5)) continue;
        if (Math.hypot(dx, dz) <= RW1 + 1) continue;
        col(x, z, AF, Math.round(AF - 16 + n.fbm(x * 0.1, z * 0.1, 2) * 4), Math.abs(ac) < 5 ? (((al | 0) + (ac | 0)) & 1 ? B.pave : B.floorL) : B.stoneDk);
        if (Math.abs(ac) > 5.4) {
          const pil = Math.round(al) % 6 === 0, h = pil ? 15 : 9 + (hash3(x, 3, z) * 4 | 0);
          for (let y = AF + 1; y <= AF + h; y++) w.set(x, y, z, pil ? B.reliefL : ((y - AF) % 5 === 0 ? B.trim : B.stone));
        }
      }
      LB.crumble(w, RX + 30, AF + 6, RZ + 30, TPX + 8, AF + 16, TPZ + 8, 0.25, 2, 11);
      for (const s of [-1, 1]) for (const al of [52, 60]) {
        const x = Math.round(RX + ca * al - sa * s * 4.5), z = Math.round(RZ + sa * al + ca * s * 4.5);
        w.set(x, AF + 7, z, B.iron); w.set(x, AF + 8, z, B.torch);
      }
      lights.push({ name: 'torch', p: [RX + ca * 56, AF + 8, RZ + sa * 56], c: '#ffa040', i: 0.5, d: 16, flicker: 0.5, srcR: 8 });
      const grx = Math.round(RX + ca * 58), grz = Math.round(RZ + sa * 58), gp = LB.grace(w, grx, AF, grz, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      acts.push(LB.graceAct({ name: '대교 옆 축복', at: gp, to: [RX + 0.5, AF + 3, RZ + 0.5], arc: 18, steps: 28, hint: '통로 한가운데 대교 옆 축복이 안개문 너머 대전을 가리켜요' }));
      landmarks.push({ name: '대교 옆', note: '대전으로 이어지는 통로의 축복', p: [gp[0], gp[1] + 16, gp[2]] });
      // 대교: 통로 끝에서 계단을 내려가 폭풍 속으로 휘어 나간다(난간, 아치 교각)
      const BY = AF - 8, S0 = TPZ + 6;
      for (let k = 0; k <= 8; k++) { const z = S0 + k, y = AF - k; for (let x = TPX - 5; x <= TPX + 5; x++) col(x, z, y, y - 4, Math.abs(x - TPX) === 5 ? B.trim : B.pave); for (const x of [TPX - 5, TPX + 5]) w.set(x, y + 1, z, B.stone); }
      const bpts = [[TPX, S0 + 8], [TPX + 3, S0 + 22], [TPX + 10, S0 + 36], [TPX + 22, D + 6]];
      const BC = LB.curve(bpts.map(p => [p[0], 0, p[1]]), 0.5); let acc = 0;
      const bcell = new Map();
      BC.forEach((p, i) => {
        if (i) acc += Math.hypot(p[0] - BC[i - 1][0], p[2] - BC[i - 1][2]);
        for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) {
          const x = Math.round(p[0] + dx), z = Math.round(p[2] + dz), d = Math.hypot(x - p[0], z - p[2]); if (d > 6.2) continue;
          const k = x + 1000 * z, o = bcell.get(k); if (!o || d < o[0]) bcell.set(k, [d, acc]);
        }
      });
      for (const [k, [d, s]] of bcell) {
        const x = k % 1000, z = (k / 1000) | 0; if (x < 0 || z < 0 || x >= W || z >= D || MH.g(w, x, z) >= BY) continue;
        const fr = (s % 18) / 18, bot = BY - 3 - Math.round((1 - Math.sin(fr * Math.PI)) * 7);
        col(x, z, BY, bot, d > 5.2 ? B.trim : B.pave);
        if (d > 5.2) { w.set(x, BY + 1, z, B.stone); if (Math.round(s) % 6 === 0) { w.box(x, BY + 1, z, x, BY + 3, z, B.stoneDk); w.set(x, BY + 4, z, B.trim); } }
        if (fr < 0.08 || fr > 0.92) for (let y = BY - 40; y < bot; y++) w.set(x, y, z, (y % 6 === 0) ? B.trim : B.stoneDk);    // 교각
      }
      landmarks.push({ name: '대교', note: '폭풍 속으로 휘어 가는 큰 다리', p: [TPX + 6, BY + 14, S0 + 30] });

      // ══ 시간 너머의 폭풍: 맞은편 절반의 구름띠(부품)와 무너진 틈 너머 흰 회오리(부품) ══
      const vortex = (name, r0, r1, y0, y1, salt) => {
        const pr = w.prop({ name, pivot: [RX + 0.5, base, RZ + 0.5], rock: 0.08, rockSpeed: 0.25, clipOK: 99999 });
        for (let y = y0; y <= y1; y += 2) {
          const t = (y - y0) / (y1 - y0), r = r0 + (r1 - r0) * Math.pow(t, 1.25);
          for (let k = 0; k < 7; k++) {
            const a0 = k * TAU / 7 + y * 0.07 + salt;
            for (let s = 0; s < 1.4; s += 0.04) {
              const a = a0 + s, rr = r + Math.sin(s * 3 + k) * 2.4 - s * 1.2;
              const x = Math.round(RX + Math.cos(a) * rr), z = Math.round(RZ + Math.sin(a) * rr);
              if (backF(a) < 0.62) continue;
              if (hash3(x, y, z) > 0.36) for (let q = 0; q < 2; q++) pr.set(x, y + q, z, hash3(x, y + 1, z) > 0.6 ? B.cloud2 : (s > 1 ? B.cloudDk : B.cloud));
            }
          }
        }
      };
      vortex('storm', 70, 86, base - 30, Hh - 8, 0);
      // 회오리: 서쪽 틈 너머, 아래는 가늘고 위로 갈수록 퍼진다
      const TWX = Math.round(RX + Math.cos(GAPS[0]) * 62), TWZ = Math.round(RZ + Math.sin(GAPS[0]) * 62);
      const tw = w.prop({ name: 'twister', pivot: [TWX + 0.5, base, TWZ + 0.5], clipOK: 99999 });
      for (let y = base - 20; y <= Hh - 6; y++) {
        const t = (y - base + 20) / (Hh - base + 14), r = 1.6 + Math.pow(t, 2.2) * 12, cx = TWX + Math.sin(t * 4) * 3, cz = TWZ + Math.cos(t * 3) * 2;
        for (let k = 0; k < 40; k++) {
          const a = k / 40 * TAU + y * 0.3, rr = r * (0.7 + 0.3 * hash3(k, y, 5));
          if (hash3(k, y, 9) < 0.45) continue;
          tw.set(Math.round(cx + Math.cos(a) * rr), y, Math.round(cz + Math.sin(a) * rr), hash3(k, y, 3) > 0.5 ? B.twist : B.cloud2);
        }
      }
      const twY = AF + 30;
      acts.push({
        name: '시간 너머의 폭풍', hint: '무너진 벽 틈 너머 흰 회오리가 휘몰아치고 폭풍 하늘 곳곳에 번개가 쳐요', hit: [TWX - 4, twY - 6, TWZ - 4, TWX + 4, twY + 6, TWZ + 4],
        run: async a => { a.wind(3.2, 5.2); a.spin('twister', 6, 5.2); a.spin('storm', 4, 5.2); for (let k = 0; k < 6; k++) { a.lightning(0.6 + (k % 2) * 0.6); await a.wait(0.6 + (k % 3) * 0.25); } },
      });
      landmarks.push({ name: '무너진 벽 틈', note: '폭풍과 회오리가 보이는 곳', p: [TWX + 0.5, twY + 20, TWZ + 0.5] });
      // 번개(부품, 평소엔 숨김): 폭풍에서 기둥 하나로
      const TT = [pillars[3][0] + 0.5, pillars[3][2] + 2, pillars[3][1] + 0.5];
      const bolt = w.prop({ name: 'bolt', pivot: TT, scl0: [0, 0, 0], clipOK: 400 });
      let prev = [RX - 30, Hh - 14, RZ - 60];
      for (let k = 1; k <= 10; k++) { const t = k / 10, p = LB.lerp3(prev, TT, k === 10 ? 1 : 0.16 + t * 0.1); if (k < 10) { p[0] += (hash3(k, 1, 4) - 0.5) * 8; p[1] += (hash3(k, 2, 4) - 0.5) * 6; p[2] += (hash3(k, 3, 4) - 0.5) * 8; } LB.tube(bolt, [prev, p], 0.55, k % 2 ? B.bolt : B.bolt2); prev = p; }
      lights.push({ name: 'strike', p: [TT[0], TT[1] + 1, TT[2]], c: '#fff0c0', i: 0.02, d: 60, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '낙뢰', hint: '폭풍에서 내리친 번개가 조각 기둥 꼭대기에 떨어져요', hit: [Math.round(TT[0]) - 3, Math.round(TT[1]) - 12, Math.round(TT[2]) - 3, Math.round(TT[0]) + 3, Math.round(TT[1]), Math.round(TT[2]) + 3],
        run: async a => { for (let k = 0; k < 3; k++) { a.tween('bolt', { scl: [1, 1, 1] }, 0.04); a.lightning(1.2); a.flash('strike', 70, 0.25); a.burst(TT, { n: 50, colors: ['#fff4c8', '#ffd060', '#ffffff'], speed: 8, up: 3, life: 0.9, gravity: 4, spread: 2 }); await a.wait(0.2); await a.tween('bolt', { scl: [0, 0, 0] }, 0.05); await a.wait(0.5 + k * 0.2); } },
      });

      // ══ 무너짐과 역행: 동쪽 벽 꼭대기 한 토막이 떨어졌다가 시간을 거슬러 되붙는다(부품) ══
      const cth = camA - Math.PI * 0.42, chunks = [];
      for (let k = 0; k < 5; k++) {
        const nm = 'chunk' + k, th0 = cth + (k - 2) * 0.05, x = Math.round(RX + Math.cos(th0) * 44), z = Math.round(RZ + Math.sin(th0) * 44), top = Math.round(wallTop(th0)), y0 = top + 1;
        const pr = w.prop({ name: nm, pivot: [x + 0.5, y0 + 2, z + 0.5] });
        pr.box(x - 1, y0, z - 1, x + 1, y0 + 4 + (k % 2) * 2, z + 1, k % 2 ? B.stoneDk : B.stone); pr.set(x, y0 + 5 + (k % 2) * 2, z, B.trim);
        chunks.push([nm, x, y0, z]);
      }
      acts.push({
        name: '붕괴와 역행', hint: '바깥 벽 꼭대기가 폭풍 속으로 무너져 내렸다가 시간을 거슬러 되돌아와요', hit: [chunks[2][1] - 4, chunks[2][2] - 2, chunks[2][3] - 4, chunks[2][1] + 4, chunks[2][2] + 8, chunks[2][3] + 4],
        run: async a => {
          a.burst([chunks[2][1] + 0.5, chunks[2][2] + 3, chunks[2][3] + 0.5], { n: 50, colors: ['#c6b69a', '#9c8c72', '#e0d4b8'], speed: 5, up: 2, life: 1.6, gravity: 3, spread: 4 });
          const oX = chunks[2][1] - RX, oZ = chunks[2][3] - RZ, il = Math.hypot(oX, oZ);
          await Promise.all(chunks.map(([nm], k) => a.tween(nm, { off: [oX / il * (7 + k), -26 - k * 4, oZ / il * (7 + k)], rot: [0.5 * (k % 3 - 1), k * 0.6, 0.4 * (k % 2 ? 1 : -1)] }, 1.4, t => t * t)));
          await a.wait(1);
          a.glow(1.6, 2);
          await Promise.all(chunks.map(([nm]) => a.tween(nm, { off: [0, 0, 0], rot: [0, 0, 0] }, 1.8, t => t * t * (3 - 2 * t))));
          a.burst([chunks[2][1] + 0.5, chunks[2][2] + 3, chunks[2][3] + 0.5], { n: 40, colors: ['#ffe9a0', '#ffffff'], speed: 3, up: 1, life: 1.2, gravity: 0, spread: 6 });
        },
      });

      // ══ 폭풍을 도는 고룡(부품) ══
      const orb = w.prop({ name: 'dragon', pivot: [RX + 0.5, base, RZ + 0.5], speed: 0.13, bob: 3, bobSpeed: 0.6, clipOK: 99999 });
      LB.dragon(orb, { x: RX + 70, y: base + 44, z: RZ, dir: Math.PI / 2, s: 0.9, pose: 'fly', wingUp: 5, span: 26, torn: 0.3, m: { body: B.drag, belly: B.dragB, bone: B.dragBone, wing: B.dragW, horn: B.dragBone, eye: B.dragEye, spike: B.dragBone } });
      acts.push({
        name: '고룡의 비행', hint: '폭풍을 도는 고룡이 날갯짓을 빨리하며 붉은 번개를 흩뿌려요', hit: [RX + 66, base + 40, RZ - 6, RX + 74, base + 50, RZ + 6],
        run: async a => { a.spin('dragon', 3.5, 4); for (let k = 0; k < 6; k++) { a.lightning(0.5); const ang = k * 1.1; a.burst([RX + Math.cos(ang) * 70, base + 44, RZ + Math.sin(ang) * 70], { n: 30, colors: ['#ff6a3a', '#ffd060', '#ffffff'], speed: 6, up: 1, life: 0.9, gravity: 2, spread: 3 }); await a.wait(0.6); } },
      });

      // ══ 뒤로 솟은 흰 탑(북쪽 섬) ══
      {
        const tx = 70, tz = 14;
        isl(tx, base + 4, tz, 9, 7, 18, 3);
        for (let y = base + 5; y < base + 66; y++) { const r = y < base + 20 ? 6 : (y < base + 46 ? 5 : 4); w.cyl(tx, tz, y, y, r, (y - base) % 9 === 0 ? B.towerDk : B.tower, r - 1.2); }
        for (let k = 0; k < 8; k++) { const a = k / 8 * TAU, x = Math.round(tx + Math.cos(a) * 5), z = Math.round(tz + Math.sin(a) * 5); for (const yy of [base + 30, base + 50]) w.box(x, yy, z, x, yy + 3, z, B.dark); }
        LB.spire(w, tx, tz, base + 66, 4, 16, B.towerDk);
        landmarks.push({ name: '흰 탑', note: '폭풍 위로 솟은 파름 아즈라의 탑', p: [tx + 0.5, base + 88, tz + 0.5] });
      }

      // ══ 떠 있는 부스러기: 바위섬과 부서진 계단·아치, 천천히 떠도는 조각(부품) ══
      const debris = [[30, base - 8, 40, 6], [128, base + 34, 18, 6], [162, base - 4, 92, 7], [150, base + 26, 150, 5], [12, base + 6, 96, 5]];
      debris.forEach(([x, y, z, r], k) => {
        isl(x, y, z, r, r * 0.8, r * 1.4, 10 + k);
        const kind = k % 3;
        if (kind === 0) { for (let s = 0; s < 6; s++) w.box(x - 2 + s, y + 1 + s, z - 2, x - 2 + s, y + 1 + s, z + 1, B.stone); }
        else if (kind === 1) { for (let zz = z - 3; zz <= z + 3; zz++) for (let yy = y + 1; yy <= y + 9; yy++) if (!LB.inArch(zz - z, yy - y - 1, 2, 6, 'round')) w.set(x, yy, zz, B.stone); LB.crumble(w, x - 1, y + 5, z - 4, x + 1, y + 10, z + 4, 0.3, 2, k); }
        else { w.box(x, y + 1, z, x + 1, y + 7 + (k % 5), z + 1, B.stone); w.box(x - 1, y + 1, z - 1, x + 2, y + 1, z + 2, B.stoneDk); }
      });
      for (let k = 0; k < 6; k++) {
        const a = k * 1.05 + 0.4, r = 58 + (k % 3) * 6, x = Math.round(RX + Math.cos(a) * r), z = Math.round(RZ + Math.sin(a) * r), y = base + 6 + (k % 4) * 8;
        if (x < 8 || z < 8 || x > W - 9 || z > D - 9) continue;
        { let hit = false; for (let yy = y - 3; yy <= y + 6 && !hit; yy++) for (let zz = z - 4; zz <= z + 4 && !hit; zz++) for (let xx = x - 4; xx <= x + 4; xx++) if (w.get(xx, yy, zz)) { hit = true; break; } if (hit) continue; }
        const pr = w.prop({ name: 'float' + k, pivot: [x + 0.5, y, z + 0.5], bob: 1.6, bobSpeed: 0.4 + k * 0.07, rock: 0.05, rockSpeed: 0.3, phase: k, axis: 'y' });
        pr.ellipsoid(x, y, z, 2.6, 1.8, 2.2, B.rock); pr.box(x - 1, y + 1, z - 1, x + 1, y + 2, z + 1, B.stone);
      }

      // ══ 남서쪽 아래 폐허 덩어리: 뼈 없는 아치와 용왕의 결투장으로 가는 이정표 ══
      {
        const AX = 46, AZ = 150, AY = AF - 14;
        for (let z = AZ - 16; z <= AZ + 16; z++) for (let x = AX - 18; x <= AX + 18; x++) {
          const e = Math.hypot((x - AX) / 16, (z - AZ) / 13) + (n.fbm(x * 0.09, z * 0.09, 2) - 0.5) * 0.3; if (e > 1) continue;
          col(x, z, AY, Math.round(AY - 16 * Math.pow(1 - e, 0.6) - 3), ((x + z) & 3) ? B.pave : B.floorL);
        }
        // 흩어진 뼈 아치들과, 하나만 뼈가 없는 돌 아치(누울 자리)
        const arch = (cx, cz, bones) => {
          for (let k = 0; k <= 24; k++) { const t = k / 24 * Math.PI, x = Math.round(cx + Math.cos(t) * 4.5), y = AY + 1 + Math.round(Math.sin(t) * 4); w.box(x, y, cz - 1, x, y, cz + 1, B.stoneDk); w.set(x, y + 1, cz, B.trim); }
          w.box(cx - 3, AY, cz - 2, cx + 3, AY, cz + 2, B.floorA);
          if (bones) for (let k = 0; k < 8; k++) w.set(cx - 3 + (k % 7), AY + 1, cz - 1 + (k % 3), B.bone);
        };
        arch(AX - 9, AZ - 4, true); arch(AX + 8, AZ + 6, true); arch(AX, AZ - 6, false);
        w.set(AX, AY + 1, AZ - 6, B.candle); w.set(AX - 2, AY + 1, AZ - 6, B.candle); w.set(AX + 2, AY + 1, AZ - 6, B.candle);
        lights.push({ name: 'nest', p: [AX + 0.5, AY + 3, AZ - 5.5], c: '#ffe0a0', i: 0.3, d: 12, flicker: 0.1 });
        const sp = OR.signpost(w, B, AX + 6, AZ - 9, { dir: [-1, 1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '용왕의 결투장으로', goto: 'farum-sub', hint: '뼈가 없는 돌 아치에 누우면 시간 너머 폐허, 용왕 플라키도사크스가 기다리는 결투장으로 가요', hit: [AX - 5, AY, AZ - 11, AX + 8, AY + 8, AZ - 3] }));
        landmarks.push({ name: '뼈 없는 아치', note: '용왕 플라키도사크스의 결투장으로', p: [AX + 0.5, AY + 18, AZ - 5.5] });
        // 대교 계단 쪽에서 이어지는 떠 있는 디딤돌
        for (let k = 0; k < 5; k++) { const t = (k + 1) / 6, x = Math.round(TPX - 8 + (AX + 14 - TPX + 8) * t), z = Math.round(TPZ + 4 + (AZ - 8 - TPZ - 4) * t), y = Math.round(AF - 4 + (AY + 2 - AF + 4) * t); isl(x, y, z, 2.6, 2.2, 4, 30 + k); }
      }
      return { lights, landmarks, acts };
    },
  });
})();
