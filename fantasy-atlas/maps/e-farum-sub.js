// 용왕 플라키도사크스의 결투장(하위 지도) — 시간 너머 폭풍 속에 떠 있는 둥글고 넓은 폐허 바닥. 얇은 물이 고였고, 가장자리 낮은 난간 바깥으로 검은 큰 기둥들이 둘러 서 있다.
// 한가운데 똬리를 튼 용왕(다섯 머리 중 둘만 남았다)이 남동쪽을 보고, 남동쪽 가장자리에 도착한 자리의 축복과 파름 아즈라로 돌아가는 이정표가 있다. (무너지는 파름 아즈라의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 축복이 앞, 용왕이 가운데, 큰 기둥들이 뒤를 두른다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 150;
  const PX = 96, PZ = 90;                                   // 결투장 한가운데
  MAPS.push({
    id: 'farum-sub', cat: 'lands', sub: true, parent: 'farum', name: '용왕의 결투장', en: 'Dragonlord Placidusax', color: '#d0a060', seed: 997, base: 56, time: 'day', size: [W, D, Hh],
    desc: '파름 아즈라 아래 폐허 덩어리의 뼈 없는 아치에 누우면, 시간 너머 폭풍 한가운데의 넓고 둥근 폐허 바닥에서 눈을 뜬다. 얇은 물이 고인 바닥에는 동심원 홈이 새겨져 있고, 가장자리 낮은 난간 바깥에 검은 큰 기둥들이 부러진 채 서 있다. 한가운데 다섯 머리 가운데 둘만 남은 용왕 플라키도사크스가 똬리를 틀고 신이 돌아오기를 기다린다.',
    info: { title: '장소 정보', en: 'DRAGONLORD PLACIDUSAX', rows: [['가는 길', '파름 아즈라 · 뼈 없는 아치에 눕는다'], ['결투장', '물이 고인 둥근 폐허 바닥 · 낮은 난간'], ['큰 기둥', '바깥 둘레 열두 개 · 몇은 부러졌다'], ['축복', '남동쪽 가장자리 · 도착한 자리']] },
    monsters: { normal: ['폭풍 속 고룡의 그림자'], boss: '용왕 플라키도사크스' },
    sky: ['#c8b494', '#3e3c44', '#ffd8a0'], stars: false,
    hemi: ['#f4e8d0', '#3a342c', 0.6], sun: ['#ffe8c0', 0.66, [-0.4, 1, 0.5]],
    night: { sky: ['#6a5a48', '#1a1a22', '#d8a870'], stars: true, hemi: ['#d8c8b0', '#221e1a', 0.5], sun: ['#ffd8b0', 0.48, [-0.4, 1, 0.5]], haze: '#4a4034' },
    liquid: ['#6a6a68', '#a8a49a', '#f4ead8'], liqSpeed: 0.25,
    fog: { start: 0.82, floor: 24, depth: 16, haze: [40, 0.22, 14], hazeColor: '#b8a688', top: 144, topDepth: 10 },
    camY: 10, zoom: 1.4,
    particles: [
      { n: 600, colors: ['#a49a8c', '#c8bea8', '#7e786e', '#e8dcc0'], mode: 'vortex', center: [PX, PZ], r0: 66, r1: 100, rise: 1.2, spin: 0.4, jit: 5, y0: 10, y1: 146, glow: false },
      { n: 240, colors: ['#e8dcc0', '#c8b494'], mode: 'drift', speed: 0.6, wind: 1.1, y0: 40, y1: 140, glow: false },
      { n: 90, colors: ['#ff5a3a', '#ffb040', '#ffe08a'], mode: 'drift', speed: 0.3, wind: 0.4, y0: 56, y1: 90, glow: true },
    ],
    blocks: {
      rock: { c: '#867a68', v: 0.07, pat: 'big' }, rockDk: { c: '#5e5648', v: 0.07, pat: 'stone' },
      slab: { c: '#a69a84', top: '#b8ad96', v: 0.05, pat: 'check', alt: '#ada28c' }, slab2: { c: '#968a74', top: '#a89c86', v: 0.05 }, groove: { c: '#5e5446', top: '#6a604e', v: 0.03 }, crackD: { c: '#3e3830', v: 0.04 },
      rail: { c: '#b4a88e', v: 0.04 }, railDk: { c: '#8e826c', v: 0.05 },
      col: { c: '#3e3a36', v: 0.05, pat: 'log' }, colL: { c: '#4e4842', v: 0.05, pat: 'log' }, colCap: { c: '#5a544c', v: 0.04 },
      drg: { c: '#7a5c40', v: 0.08, pat: 'stone' }, drgL: { c: '#9a7a52', v: 0.07 }, drgDk: { c: '#4e3a2a', v: 0.08 }, drgBone: { c: '#c8b48e', v: 0.06 }, drgWing: { c: '#5a4636', v: 0.09 },
      drgEye: { c: '#ffb040', glow: true }, ember: { c: '#ff3a1a', glow: true }, bolt: { c: '#ff5a3a', glow: true }, bolt2: { c: '#ffd0a0', glow: true },
      cloud: { c: '#9e968a', v: 0.08 }, cloud2: { c: '#c4bcac', v: 0.06 }, cloudDk: { c: '#6e6a62', v: 0.08 },
      ruin: { c: '#b4a080', v: 0.05, pat: 'brick' }, ruinDk: { c: '#8c7a60', v: 0.05, pat: 'brick' },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#6e6456', v: 0.05 }, timber: { c: '#4a3a2c', v: 0.05 }, door: { c: '#6a5440', v: 0.05, pat: 'plank' }, gold: { c: '#ffd060', glow: true }, mlamp: { c: '#ffd890', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, AF = base, TAU = Math.PI * 2;
      w.hm = new Int16Array(W * D); w.slope = new Float32Array(W * D);
      const lights = [], acts = [], landmarks = [];
      const RF = 56, RC = 63;                                 // 바닥 끝(난간) · 큰 기둥 둘레
      const camA = Math.atan2(0.73, 0.68), backF = th => 0.5 - 0.5 * Math.cos(th - camA);
      const angD = (a, b) => Math.abs(((a - b) % TAU + TAU * 1.5) % TAU - Math.PI);
      const col = (x, z, top, bot, topB) => {
        if (x < 0 || z < 0 || x >= W || z >= D) return;
        for (let y = bot; y < top; y++) w.set(x, y, z, top - y < 2 ? B.slab2 : ((y + (hash3(x >> 2, 0, z >> 2) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock));
        w.set(x, top, z, topB);
        const i = x + W * z; if (top > w.hm[i]) w.hm[i] = top;
      };

      // ══ 둥근 폐허 바닥: 큰 판석에 동심원 홈, 금 간 자리, 얇은 물 ══
      const DRY = (x, z) => n.fbm(x * 0.07 + 3, z * 0.07, 3) > 0.47;           // 물 위로 드러난 높은 판석
      for (let z = PZ - RC - 6; z <= PZ + RC + 6; z++) for (let x = PX - RC - 6; x <= PX + RC + 6; x++) {
        const dx = x - PX, dz = z - PZ, r = Math.hypot(dx, dz), th = Math.atan2(dz, dx);
        const edge = RC + 3 + n.fbm(th * 3, 1, 2) * 4;
        if (r > edge) continue;
        const bot = Math.round(AF - 46 + Math.pow(r / edge, 1.6) * 40 + n.fbm(x * 0.08, z * 0.08, 2) * 6);
        let top = AF, b;
        if (r > RF + 1) { b = hash3(x >> 1, 2, z >> 1) > 0.5 ? B.slab2 : B.ruinDk; top = AF + 1; }
        else {
          b = B.slab;
          for (const rr of [9, 20, 32, 45]) if (Math.abs(r - rr) < 0.6) b = B.groove;
          if (r < 45 && r > 9 && Math.abs(Math.sin(th * 6)) < 0.03 * (20 / r)) b = B.groove;
          if (((x >> 3) + (z >> 3)) & 1 && b === B.slab) b = B.slab2;
          if (n.ridge(x * 0.06, z * 0.06, 2) > 0.93) b = B.crackD;
          if (DRY(x, z) || r < 26) top = AF + 1;
        }
        col(x, z, top, bot, b);
        if (r <= RF + 0.5 && top === AF) w.liquid(x, z, AF + 1);
      }
      // 가장자리 낮은 난간(기둥 사이에 짧은 동자, 군데군데 무너짐)
      for (let k = 0; k < 900; k++) {
        const a = k / 900 * TAU, x = Math.round(PX + Math.cos(a) * (RF + 1)), z = Math.round(PZ + Math.sin(a) * (RF + 1));
        if (n.fbm(a * 4, 7, 2) > 0.66) continue;
        const post = k % 25 === 0;
        w.set(x, AF + 2, z, post ? B.railDk : B.rail); w.set(x, AF + 3, z, B.rail);
        if (post) w.set(x, AF + 4, z, B.railDk);
      }

      // ══ 큰 기둥 열두 개: 바깥 둘레, 맞은편은 높고 시점 쪽은 부러져 낮다 ══
      const cols = [];
      for (let k = 0; k < 12; k++) {
        const th = camA + (k + 0.5) / 12 * TAU, x = Math.round(PX + Math.cos(th) * RC), z = Math.round(PZ + Math.sin(th) * RC);
        const bf = backF(th), broken = bf < 0.4 || k === 5 || k === 8, h = broken ? 8 + (hash3(k, 1, 1) * 14 | 0) : Math.round(54 + bf * 22 + hash3(k, 2, 1) * 8);
        w.cyl(x, z, AF + 1, AF + 3, 5.2, B.colCap);
        for (let y = AF + 4; y < AF + 4 + h; y++) w.cyl(x, z, y, y, 3.8, (y - AF) % 12 === 0 ? B.colCap : (hash3(x, y >> 2, z) > 0.3 ? B.col : B.colL));
        if (!broken) { w.cyl(x, z, AF + 4 + h, AF + 6 + h, 5, B.colCap); w.cyl(x, z, AF + 7 + h, AF + 7 + h, 3.4, B.colCap); }
        else LB.crumble(w, x - 4, AF + h - 2, z - 4, x + 4, AF + h + 4, z + 4, 0.5, 2, k);
        cols.push([x, z, AF + 4 + h, broken]);
      }
      // 쓰러진 기둥 한 토막이 바닥을 가로지른다(서쪽)
      LB.tube(w, [[PX - 58, AF + 4, PZ + 18], [PX - 40, AF + 3, PZ + 24]], 3.6, B.col);

      // ══ 용왕 플라키도사크스: 똬리 튼 몸, 펼친 날개, 남은 두 머리와 잘린 세 목 ══
      const DY = AF + 2, M = (x, y, z, t, dy) => dy < -1.2 ? B.drgL : (hash3(x, y, z) > 0.85 ? B.drgDk : B.drg);
      // 똬리: 바깥에서 안으로 감기며 꼬리는 남서쪽으로 늘어진다
      const coil = [];
      for (let k = 0; k <= 60; k++) { const t = k / 60, a = camA + 0.6 + t * TAU * 1.35, r = 22 - t * 12; coil.push([PX + Math.cos(a) * r, DY + 4 + t * 7 + Math.sin(t * 9) * 0.6, PZ + Math.sin(a) * r]); }
      LB.tube(w, coil, t => 4.2 + t * 4.4, M);
      LB.tube(w, [coil[0], [PX - 8, DY + 2, PZ + 28], [PX - 24, DY + 1, PZ + 32], [PX - 38, DY + 1, PZ + 24]], t => 4.2 - t * 3.4, M);
      // 등뼈 가시
      coil.forEach((p, i) => { if (i % 3 === 0) { const s = 4.2 + i / 60 * 4.4; w.box(Math.round(p[0]), Math.round(p[1] + s), Math.round(p[2]), Math.round(p[0]), Math.round(p[1] + s + 1 + (i % 2)), Math.round(p[2]), B.drgBone); } });
      // 가슴(머리들이 돋는 곳)
      const CH = [PX + 4, DY + 14, PZ + 4];
      w.ellipsoid(Math.round(CH[0]), Math.round(CH[1]), Math.round(CH[2]), 9.5, 8, 9.5, B.drg);
      // 날개: 등에서 위·뒤로 펼친 두 장
      for (const s of [-1, 1]) {
        const ux = -Math.sin(camA) * s, uz = Math.cos(camA) * s, sh = [PX - 1 + ux * 5, DY + 20, PZ - 3 + uz * 5];
        const tip = [sh[0] + ux * 40 - Math.cos(camA) * 10, DY + 60, sh[2] + uz * 40 - Math.sin(camA) * 10];
        const el = [sh[0] + ux * 16 - Math.cos(camA) * 8, DY + 46, sh[2] + uz * 16 - Math.sin(camA) * 8];
        LB.tube(w, [sh, el, tip], 1.7, B.drgBone);
        for (let f = 0; f < 4; f++) {
          const fe = [tip[0] - Math.cos(camA) * (5 + f * 7) - ux * f * 6, DY + 46 - f * 12, tip[2] - Math.sin(camA) * (5 + f * 7) - uz * f * 6];
          LB.tube(w, [el, fe], 0.7, B.drgBone);
          const nx = f < 3 ? [tip[0] - Math.cos(camA) * (12 + f * 7) - ux * (f + 1) * 6, DY + 34 - f * 12, tip[2] - Math.sin(camA) * (12 + f * 7) - uz * (f + 1) * 6] : sh;
          LB.tri(w, el, fe, nx, B.drgWing, (x, y, z) => hash3(x, y, z) > 0.92);
        }
        LB.tri(w, el, tip, [tip[0] - Math.cos(camA) * 5, DY + 46, tip[2] - Math.sin(camA) * 5], B.drgWing);
      }
      // 남은 두 머리(부품: 고개를 쳐든다)
      const heads = w.prop({ name: 'heads', pivot: [CH[0] + 0.5, CH[1], CH[2] + 0.5], axis: 'x', rock: 0.03, rockSpeed: 0.4 });
      const eyes = [];
      for (const s of [-1, 1]) {
        const ux = -Math.sin(camA) * s, uz = Math.cos(camA) * s, fx = Math.cos(camA), fz = Math.sin(camA);
        const n1 = [CH[0] + fx * 6 + ux * 3, CH[1] + 8, CH[2] + fz * 6 + uz * 3], n2 = [CH[0] + fx * 10 + ux * 11, CH[1] + 21, CH[2] + fz * 10 + uz * 11], hd = [CH[0] + fx * 17 + ux * 16, CH[1] + 27, CH[2] + fz * 17 + uz * 16];
        LB.tube(heads, [CH, n1, n2, hd], t => 4 - t * 1.6, M);
        heads.ellipsoid(Math.round(hd[0]), Math.round(hd[1]), Math.round(hd[2]), 3.6, 3, 3.6, B.drgL);
        LB.tube(heads, [hd, [hd[0] + fx * 7, hd[1] - 1.5, hd[2] + fz * 7]], t => 2.5 - t * 1.1, B.drgDk);
        for (const q of [-1, 1]) LB.tube(heads, [[hd[0] - fx, hd[1] + 2, hd[2] - fz], [hd[0] - fx * 7 + ux * q * 4, hd[1] + 8, hd[2] - fz * 7 + uz * q * 4]], 0.8, B.drgBone);
        const e = [Math.round(hd[0] + fx * 3 + ux * 2.4), Math.round(hd[1] + 1), Math.round(hd[2] + fz * 3 + uz * 2.4)];
        heads.set(e[0], e[1], e[2], B.drgEye); eyes.push(e);
      }
      // 잘린 세 목: 잘린 자리에 붉은 빛
      const stumps = [];
      for (const q of [-2, 0, 2]) {
        const ux = -Math.sin(camA), uz = Math.cos(camA), fx = Math.cos(camA), fz = Math.sin(camA);
        const e = [CH[0] + fx * 4 + ux * q * 3 - fx * Math.abs(q), CH[1] + 10 + (q === 0 ? 4 : 0), CH[2] + fz * 4 + uz * q * 3 - fz * Math.abs(q)];
        LB.tube(w, [CH, e], 3, M);
        w.set(Math.round(e[0]), Math.round(e[1]) + 1, Math.round(e[2]), B.ember);
        stumps.push(e);
      }
      lights.push({ name: 'dragon', p: [CH[0] + 0.5, CH[1] + 12, CH[2] + 0.5], c: '#ff5a3a', i: 0.15, d: 50, flicker: 0.3, srcR: 20 });
      acts.push({
        name: '용왕의 포효', hint: '똬리를 튼 용왕이 남은 두 머리를 쳐들고 눈을 번뜩이며 붉은 번개를 토해요', hit: [Math.round(CH[0]) - 7, CH[1] - 5, Math.round(CH[2]) - 7, Math.round(CH[0]) + 7, CH[1] + 7, Math.round(CH[2]) + 7],
        run: async a => {
          a.flash('dragon', 10, 4); a.glow(1.5, 4);
          await a.turn('heads', [-0.22, 0, 0], 0.7);
          for (let k = 0; k < 8; k++) { for (const e of eyes) a.burst([e[0] + 0.5 + Math.cos(camA) * 4, e[1], e[2] + 0.5 + Math.sin(camA) * 4], { n: 18, colors: ['#ff3a1a', '#ff8a3a', '#ffd0a0'], speed: 5, up: 1, life: 0.8, gravity: 0, spread: 1 }); a.lightning(0.4); await a.wait(0.3); }
          await a.turn('heads', [0, 0, 0], 1);
        },
      });
      acts.push({
        name: '잘린 세 목', hint: '다섯 머리 가운데 잘려 나간 세 목에서 붉은 빛이 솟아요. 신을 잃은 왕의 상처예요', hit: [Math.round(stumps[1][0]) - 3, Math.round(stumps[1][1]) - 2, Math.round(stumps[1][2]) - 3, Math.round(stumps[1][0]) + 3, Math.round(stumps[1][1]) + 3, Math.round(stumps[1][2]) + 3],
        run: async a => { a.flash('dragon', 6, 3); for (let k = 0; k < 8; k++) { for (const e of stumps) a.burst([e[0] + 0.5, e[1] + 1.5, e[2] + 0.5], { n: 12, colors: ['#ff3a1a', '#d0201a', '#ffb040'], speed: 1, up: 6, life: 1.2, gravity: -0.4, spread: 0.6 }); await a.wait(0.3); } },
      });
      landmarks.push({ name: '용왕 플라키도사크스', note: '보스 · 신을 잃은 옛 용왕, 다섯 머리 중 둘만 남았다', p: [CH[0] + 0.5, DY + 68, CH[2] + 0.5], boss: true });

      // ══ 붉은 번개(부품): 폭풍에서 바닥 물 위로 ══
      const TT = [PX - 26.5, AF + 1.5, PZ - 14.5];
      const bolt = w.prop({ name: 'bolt', pivot: TT, scl0: [0, 0, 0], clipOK: 400 });
      let prev = [PX - 46, Hh - 12, PZ - 50];
      for (let k = 1; k <= 10; k++) { const t = k / 10, p = LB.lerp3(prev, TT, k === 10 ? 1 : 0.16 + t * 0.1); if (k < 10) { p[0] += (hash3(k, 1, 5) - 0.5) * 8; p[1] += (hash3(k, 2, 5) - 0.5) * 6; p[2] += (hash3(k, 3, 5) - 0.5) * 8; } LB.tube(bolt, [prev, p], 0.6, k % 2 ? B.bolt : B.bolt2); prev = p; }
      lights.push({ name: 'strike', p: [TT[0], TT[1] + 2, TT[2]], c: '#ff6a40', i: 0.02, d: 60, flicker: 0.3, srcR: 4 });
      acts.push({
        name: '붉은 번개', hint: '폭풍에서 붉은 번개가 내리쳐 고인 물 위에 불꽃이 튀어요', hit: [Math.round(TT[0]) - 4, AF, Math.round(TT[2]) - 4, Math.round(TT[0]) + 4, AF + 4, Math.round(TT[2]) + 4],
        run: async a => { for (let k = 0; k < 3; k++) { a.tween('bolt', { scl: [1, 1, 1] }, 0.04); a.lightning(1); a.flash('strike', 70, 0.25); a.burst(TT, { n: 60, colors: ['#ff5a3a', '#ffd0a0', '#ffffff'], speed: 7, up: 3, life: 0.9, gravity: 5, spread: 2, flat: true }); await a.wait(0.2); await a.tween('bolt', { scl: [0, 0, 0] }, 0.05); await a.wait(0.5 + k * 0.2); } },
      });

      // ══ 물결: 바닥 고인 물이 동심원 홈을 따라 퍼진다 ══
      acts.push({
        name: '고인 물의 물결', hint: '얕은 물 위로 용왕의 숨결이 동심원 물결이 되어 가장자리까지 번져요', hit: [PX + 20, AF, PZ + 18, PX + 28, AF + 2, PZ + 26],
        run: async a => { for (const r of [12, 20, 28, 36, 44, 52]) { for (let q = 0; q < 24; q++) { const t = q / 24 * TAU; a.burst([PX + 0.5 + Math.cos(t) * r, AF + 1.6, PZ + 0.5 + Math.sin(t) * r], { n: 4, colors: ['#f4ead8', '#ffffff', '#c8bea8'], speed: 1, up: 1.5, life: 0.8, gravity: 3, spread: 0.6 }); } await a.wait(0.22); } },
      });

      // ══ 시간 너머의 폭풍: 맞은편 절반의 구름띠(부품) ══
      const storm = w.prop({ name: 'storm', pivot: [PX + 0.5, base, PZ + 0.5], rock: 0.06, rockSpeed: 0.2, clipOK: 99999 });
      for (let y = base - 30; y <= Hh - 8; y += 2) {
        const t = (y - base + 30) / (Hh - base + 22), r = 74 + 14 * Math.pow(t, 1.2);
        for (let k = 0; k < 7; k++) {
          const a0 = k * TAU / 7 + y * 0.06;
          for (let s = 0; s < 1.4; s += 0.035) {
            const a = a0 + s, rr = r + Math.sin(s * 3 + k) * 2.4, x = Math.round(PX + Math.cos(a) * rr), z = Math.round(PZ + Math.sin(a) * rr);
            if (backF(a) < 0.62 || hash3(x, y, z) < 0.36) continue;
            for (let q = 0; q < 2; q++) storm.set(x, y + q, z, hash3(x, y + 1, z) > 0.6 ? B.cloud2 : (s > 1 ? B.cloudDk : B.cloud));
          }
        }
      }
      // 무너졌다 되돌아오는 기둥 머리(부품): 북쪽 큰 기둥 꼭대기
      const tc = cols.filter(c => !c[3]).sort((p, q) => p[1] - q[1])[0];
      const cap = w.prop({ name: 'cap', pivot: [tc[0] + 0.5, tc[2] + 4, tc[1] + 0.5] });
      cap.cyl(tc[0], tc[1], tc[2] + 4, tc[2] + 10, 3.8, B.colL); cap.cyl(tc[0], tc[1], tc[2] + 11, tc[2] + 12, 5, B.colCap);
      acts.push({
        name: '시간의 역행', hint: '폭풍 속 큰 기둥 머리가 부서져 떨어지다가 시간을 거슬러 제자리로 돌아가요', hit: [tc[0] - 5, tc[2] + 3, tc[1] - 5, tc[0] + 5, tc[2] + 13, tc[1] + 5],
        run: async a => {
          a.wind(2.4, 4.5);
          await a.tween('cap', { off: [4, -30, 10], rot: [0.6, 0.4, -0.5] }, 1.4, t => t * t);
          a.burst([tc[0] + 4.5, tc[2] - 22, tc[1] + 10.5], { n: 50, colors: ['#5a544c', '#8e826c', '#c4bcac'], speed: 4, up: 2, life: 1.4, gravity: 4, spread: 4 });
          await a.wait(0.8); a.glow(1.5, 2); a.lightning(0.6);
          await a.tween('cap', { off: [0, 0, 0], rot: [0, 0, 0] }, 1.8, t => t * t * (3 - 2 * t));
        },
      });

      // ══ 떠도는 폐허 조각: 시간 너머로 흩어진 파름 아즈라의 벽과 아치 ══
      const ruins = [[24, base + 30, 40, 7], [168, base + 22, 54, 6], [150, base + 46, 16, 6], [26, base + 4, 150, 6], [176, base - 6, 150, 5]];
      ruins.forEach(([x, y, z, r], k) => {
        LB.island(w, x, y, z, r, r * 0.8, r * 1.5, { rock: B.rock, under: B.rockDk, top: () => B.slab2, salt: 20 + k });
        for (let zz = z - 3; zz <= z + 3; zz++) for (let yy = y + 1; yy <= y + 8 + (k % 3) * 2; yy++) if (!LB.inArch(zz - z, yy - y - 1, 2, 6, 'round')) w.set(x, yy, zz, k % 2 ? B.ruin : B.ruinDk);
        LB.crumble(w, x - 1, y + 4, z - 4, x + 1, y + 14, z + 4, 0.3, 2, k);
      });

      // ══ 남동쪽 가장자리: 도착한 자리의 축복과 파름 아즈라로 돌아가는 이정표 ══
      const ga = camA - 0.12, gx = Math.round(PX + Math.cos(ga) * (RF - 4)), gz = Math.round(PZ + Math.sin(ga) * (RF - 4));
      col(gx, gz, AF + 1, AF - 2, B.slab2);
      const gp = LB.grace(w, gx, AF + 1, gz, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 12, flicker: 0.1 });
      acts.push(LB.graceAct({ name: '용왕 플라키도사크스 축복', at: gp, to: [CH[0] + 0.5, CH[1] + 8, CH[2] + 0.5], arc: 14, steps: 24, hint: '눈을 뜬 자리의 축복이 물 위를 건너 똬리 튼 용왕을 가리켜요' }));
      landmarks.push({ name: '용왕 플라키도사크스 축복', note: '남동쪽 가장자리 · 도착한 자리', p: [gp[0], gp[1] + 14, gp[2]] });
      {
        const sa2 = camA + 0.14, sx = Math.round(PX + Math.cos(sa2) * (RF - 3)), sz = Math.round(PZ + Math.sin(sa2) * (RF - 3));
        col(sx, sz, AF + 1, AF - 2, B.slab2);
        const sp = OR.signpost(w, B, sx, sz, { dir: [1, 1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '파름 아즈라로', goto: 'farum', hint: '다시 눈을 감으면 뼈 없는 아치에서 깨어나, 대교 옆 축복과 말리케스의 결투장이 있는 파름 아즈라로 돌아가요' }));
        landmarks.push({ name: '돌아가는 길', note: '무너지는 파름 아즈라로', p: [sx + 0.5, sp[1] + 14, sz + 0.5] });
      }
      return { lights, landmarks, acts };
    },
  });
})();
