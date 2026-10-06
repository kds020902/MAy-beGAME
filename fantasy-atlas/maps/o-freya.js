// 프레이야 파밀리아 홈 — 전쟁의 들판(폴크방): 네 겹 큰 성벽 안 신전처럼 엄숙한 큰 저택, 코린트식 기둥과 큰 계단, 꽃병과 장미, 날마다 난전이 벌어지는 넓은 정원 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 128, TAU = Math.PI * 2;
  MAPS.push({
    id: 'freya', cat: 'orario', name: '프레이야 파밀리아 홈', en: 'Freya Familia · Folkvangr', color: '#e88aa8', seed: 1105, base: 30, time: 'day', size: [W, D, Hh],
    desc: '도시 남쪽 제5구획, 남쪽 큰길 끝에 자리한 「전쟁의 들판(폴크방)」. 북쪽 끝 로키 파밀리아 홈과 정반대편이다. 네 면의 큰 성벽 안에 신전처럼 엄숙한 큰 저택이 서 있고, 단원 모두가 모일 만큼 넓은 정원에서는 해 뜰 때부터 해 질 때까지 단원끼리 겨루는 난전 「세례」가 벌어진다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['자리', '남쪽 큰길 끝 · 도시 제5구획'], ['큰 저택', '신전 같은 엄숙한 저택 · 연회의 큰 홀'], ['정원', '해 뜰 때부터 해 질 때까지 벌이는 난전 「세례」']] },
    sky: ['#f8e0e4', '#8a9ad0', '#fff0e8'], stars: false,
    hemi: ['#fff6f0', '#5a5048', 0.62], sun: ['#fff2e8', 0.8, [0.45, 1, 0.6]],
    night: { sky: ['#3a2a48', '#0a0818', '#e890a8'], stars: true, hemi: ['#d0c0d8', '#1c1618', 0.46], sun: ['#e8e0ff', 0.36, [0.45, 1, 0.6]], haze: '#302838' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.5,
    fog: { start: 0.95, floor: 12, depth: 8, haze: [40, 0.16, 8], hazeColor: '#f0e4e4' },
    camY: 16, zoom: 1.0,
    particles: [
      { n: 160, colors: ['#f07890', '#c8203a', '#ffd0dc'], mode: 'drift', speed: 0.45, wind: 0.8, area: [96, 120, 70], y0: 32, y1: 60, glow: false },
      { n: 60, colors: ['#f0e8ff', '#ffffff'], mode: 'rise', speed: 0.3, area: [96, 40, 6], y0: 96, y1: 120, glow: true },
    ],
    blocks: Object.assign(OR.blocks(), {
      marb: { c: '#f2eee6', v: 0.03, pat: 'big' }, marb2: { c: '#e2dcd0', v: 0.03 }, mTrim: { c: '#fbf8f2', v: 0.02 }, mFloor: { c: '#e8e2d8', top: '#f0ece4', v: 0.03, pat: 'check', alt: '#d8d0c4' },
      acanth: { c: '#9ab07a', v: 0.05 }, roofT: { c: '#5a6a8a', v: 0.05, pat: 'tile' }, roofTD: { c: '#3e4a66', v: 0.04 }, domeC: { c: '#7ab0a0', v: 0.04, pat: 'tile' },
      wallF: { c: '#cfc6b4', v: 0.05, pat: 'big' }, wallF2: { c: '#b4aa96', v: 0.05, pat: 'stone' },
      urnB: { c: '#e8e2d4', v: 0.03 }, dirt: { c: '#8a7458', top: '#a08868', v: 0.1 }, scorch: { c: '#4a4038', top: '#5a4e44', v: 0.08 },
      divine: { c: '#f4ecff', glow: true }, candle: { c: '#ffd890', glow: true }, carpet: { c: '#a8203a', v: 0.03 }, cloth: { c: '#f4f0f0', v: 0.02 }, tableW: { c: '#6a4a30', v: 0.04, pat: 'plank' },
      food: { c: '#d89040', v: 0.08 }, fruit: { c: '#c83a4a', v: 0.08 }, silverB: { c: '#d8dce8', v: 0.03 },
    }),
    build(w) {
      const B = w.id, G = w.base;
      const WX0 = 14, WX1 = 178, WZ0 = 12, WZ1 = 178;                 // 성벽 바깥선(두께 3)
      const P = G + 5;                                                  // 기단 윗면
      MH.terrain(w, { floor: G - 8, height: () => G, surface: () => B.grass, under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      const lights = [], acts = [], landmarks = [];
      const inside = (x, z) => x > WX0 + 2 && x < WX1 - 2 && z > WZ0 + 2 && z < WZ1 - 2;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        let b;
        if (inside(x, z)) b = B.grass;
        else if (z > WZ1 + 1 || x > WX1 + 1) b = (z === WZ1 + 2 || x === WX1 + 2) ? B.curb : ((x + z) % 7 === 0 ? B.paveL : B.brick);
        else b = hash3(x, 1, z) > 0.85 ? B.stoneG : B.pave;
        w.set(x, G, z, b);
      }

      // ── 도구: 코린트식 기둥, 큰 꽃병 ──
      const col = (x, z, y0, y1) => {
        w.box(x - 2, y0, z - 2, x + 2, y0, z + 2, B.mTrim); w.cyl(x, z, y0 + 1, y0 + 1, 2, B.marb2);
        for (let y = y0 + 2; y <= y1 - 4; y++) w.cyl(x, z, y, y, 1.5, (y - y0) % 2 ? B.marb : B.marb2);
        w.cyl(x, z, y1 - 3, y1 - 3, 1.5, B.acanth); w.cyl(x, z, y1 - 2, y1 - 2, 2, B.acanth);
        for (const [dx, dz] of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) w.set(x + dx, y1 - 1, z + dz, B.gold);
        w.cyl(x, z, y1 - 1, y1 - 1, 2, B.marb); w.box(x - 2, y1, z - 2, x + 2, y1, z + 2, B.mTrim);
      };
      const urn = (x, z, y, top) => {
        w.box(x - 1, y, z - 1, x + 1, y, z + 1, B.mTrim); w.set(x, y + 1, z, B.marb2);
        w.cyl(x, z, y + 2, y + 2, 1.2, B.urnB); w.cyl(x, z, y + 3, y + 3, 1.9, B.urnB); w.cyl(x, z, y + 4, y + 4, 2.5, B.urnB);
        for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) { const d = Math.hypot(dx, dz); if (d > 1.4 && d <= 1.95 && (dx + dz) % 2 === 0) w.set(x + dx, y + 3, z + dz, B.rose); }
        w.ring(x, z, y + 5, 1.6, 2.7, B.mTrim); w.cyl(x, z, y + 5, y + 5, 1.6, B.soil);
        if (top !== false) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) { w.set(x + dx, y + 6, z + dz, hash3(x + dx, y, z + dz) > 0.5 ? B.rose : (hash3(x + dx, y + 1, z + dz) > 0.5 ? B.roseP : B.hedge)); if (!dx && !dz) w.set(x, y + 7, z, B.roseP); }
      };
      // ── 기단과 큰 계단 ──
      w.box(24, G + 1, 20, 168, P, 70, B.marb2);
      for (let x = 24; x <= 168; x++) { w.set(x, P, 70, B.mTrim); w.set(x, P, 20, B.mTrim); }
      for (let z = 20; z <= 70; z++) { w.set(24, P, z, B.mTrim); w.set(168, P, z, B.mTrim); }
      for (let k = 0; k < 5; k++) w.box(76, G + 1, 71 + 2 * k, 116, G + 4 - k, 72 + 2 * k, k % 2 ? B.marb : B.mTrim);
      for (let k = 0; k < 10; k++) for (const x of [75, 117]) w.box(x, G + 1, 71 + k, x, G + 6 - Math.floor(k / 2), 71 + k, B.marb);
      urn(75, 71, P + 2); urn(117, 71, P + 2); urn(75, 81, G + 2); urn(117, 81, G + 2);
      for (const x of [82, 110]) { col(x, 85, G + 1, G + 22); w.sphere(x, G + 25, 85, 2.2, B.marb); w.cyl(x, 85, G + 23, G + 23, 1.2, B.mTrim); }
      for (let x = 28; x <= 164; x += 8) if (x < 72 || x > 120) urn(x, 68, P + 1);

      // ── 큰 저택: 큰 홀(내부), 이중 줄 기둥 현관, 옆 기둥, 박공 페디먼트와 돔(부품: 연회 때 들어 올린다) ──
      const CX0 = 62, CX1 = 130, CZ0 = 26, CZ1 = 58, TOPC = G + 29, CX = 96;
      for (let y = P + 1; y <= TOPC; y++) for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        const edge = x <= CX0 + 1 || x >= CX1 - 1 || z <= CZ0 + 1 || z >= CZ1 - 1;
        if (!edge) continue;
        let b = (y - P) % 8 === 0 ? B.mTrim : B.marb;
        const u = (x === CX0 || x === CX1 || x === CX0 + 1 || x === CX1 - 1) ? z : x;
        if ((u % 8 === 3 || u % 8 === 4) && y > P + 3 && y < TOPC - 3 && (y - P) % 8 !== 0) b = B.win;
        w.set(x, y, z, b);
      }
      for (let z = CZ0 + 2; z <= CZ1 - 2; z++) for (let x = CX0 + 2; x <= CX1 - 2; x++) w.set(x, P, z, (x === CX0 + 6 && z > 34 && z < 50) ? B.gold : B.mFloor);
      for (let x = 92; x <= 100; x++) for (let y = P + 1; y <= P + 12; y++) w.set(x, y, CZ1, y === P + 12 || x === 92 || x === 100 ? B.gold : (y > P + 10 ? B.mTrim : B.door));
      for (let x = 92; x <= 100; x++) w.set(x, P + 11, CZ1 - 1, 0);
      for (let z = CZ0 + 2; z <= CZ1 - 2; z++) for (let x = 94; x <= 98; x++) if (z > 47) w.set(x, P, z, B.carpet);
      for (let x = CX0 + 8; x <= CX1 - 8; x += 10) for (const z of [33, 51]) col(x, z, P + 1, TOPC);
      // 연회 식탁: 긴 탁자, 흰 식탁보, 촛대와 음식, 서쪽 끝 은빛 옥좌
      w.box(70, P + 1, 42, 122, P + 2, 42, B.tableW); w.box(70, P + 3, 41, 122, P + 3, 43, B.cloth);
      for (let x = 70; x <= 122; x++) {
        if (x % 6 === 0) { w.set(x, P + 4, 42, B.candle); }
        else if (x % 3 === 0) { w.set(x, P + 4, 41, B.food); w.set(x, P + 4, 43, B.fruit); }
        if (x % 3 === 1) for (const z of [39, 45]) w.box(x, P + 1, z, x, P + 2, z, B.tableW);
      }
      w.box(65, P + 1, 39, 67, P + 1, 45, B.mTrim); w.box(66, P + 2, 40, 66, P + 3, 44, B.silverB); w.box(65, P + 2, 40, 65, P + 8, 44, B.silverB); w.box(65, P + 9, 41, 65, P + 9, 43, B.gold); w.box(66, P + 2, 41, 66, P + 2, 43, B.carpet);
      lights.push({ name: 'hall', p: [96.5, P + 6, 42.5], c: '#ffd090', i: 0.5, d: 36, flicker: 0.2, srcR: 4 });
      // 현관 기둥(두 줄)과 옆 기둥
      const front = [];
      for (let x = 62; x <= 130; x += 7) { col(x, 66, P + 1, TOPC); col(x, 62, P + 1, TOPC); front.push(x); }
      for (let z = 30; z <= 54; z += 8) { col(58, z, P + 1, TOPC); col(134, z, P + 1, TOPC); }
      // 지붕 부품: 엔타블러처(금빛 띠), 박공지붕과 앞뒤 페디먼트(장미 부조), 북쪽 돔과 등불
      const roof = w.prop({ name: 'roof', pivot: [CX + 0.5, TOPC + 1, 46], clipOK: 99999 });
      roof.box(56, TOPC + 1, 22, 136, TOPC + 4, 69, B.marb);
      for (let x = 56; x <= 136; x++) for (const z of [22, 69]) { roof.set(x, TOPC + 2, z, B.gold); roof.set(x, TOPC + 4, z, B.mTrim); }
      for (let z = 22; z <= 69; z++) for (const x of [56, 136]) { roof.set(x, TOPC + 2, z, B.gold); roof.set(x, TOPC + 4, z, B.mTrim); }
      const RY = TOPC + 5;
      for (let x = 55; x <= 137; x++) {
        const d = Math.min(x - 55, 137 - x), hh = Math.floor(d / 3);
        for (let z = 21; z <= 70; z++) roof.set(x, RY + hh, z, d === 0 ? B.roofTD : (Math.abs(x - CX) < 1 ? B.roofTD : B.roofT));
        for (const z of [22, 69]) for (let y = RY; y < RY + hh; y++) {
          let b = B.marb;
          if (y === RY || d <= 1) b = B.mTrim;
          const u = x - CX, v = y - RY - 4;
          if (z === 69 && Math.hypot(u * 0.6, v) < 2.4 && y > RY) b = Math.hypot(u * 0.6, v) < 1.2 ? B.rose : B.gold;
          if (z === 69 && Math.abs(v) < 0.6 && Math.abs(u) > 5 && Math.abs(u) < 24 && (u & 1)) b = B.acanth;
          roof.set(x, y, z, b);
        }
      }
      for (let x = 56; x <= 136; x++) { const d = Math.min(x - 55, 137 - x); for (const z of [22, 69]) roof.set(x, RY + Math.floor(d / 3), z, B.mTrim); }
      const DZc = 38, RTOP = RY + 13;
      roof.cyl(CX, DZc, RY + 4, RTOP + 4, 10, B.marb);
      for (let k = 0; k < 16; k++) { const t = k / 16 * TAU, x = Math.round(CX + Math.cos(t) * 10), z = Math.round(DZc + Math.sin(t) * 10); roof.box(x, RY + 8, z, x, RTOP + 2, z, B.win); }
      roof.ring(CX, DZc, RTOP + 5, 9, 11, B.mTrim);
      const dTop = (() => { const tmp = { set: (x, y, z, b) => roof.set(x, y, z, b) }; for (let y = 0; y <= 10; y++) for (let dz = -10; dz <= 10; dz++) for (let dx = -10; dx <= 10; dx++) { const dd = Math.hypot(dx, y, dz); if (dd > 10.3 || dd < 8.5) continue; tmp.set(CX + dx, RTOP + 6 + y, DZc + dz, (Math.round(Math.atan2(dz, dx) / TAU * 16) + 16) % 2 === 0 && Math.abs(Math.atan2(dz, dx) * 16 / TAU - Math.round(Math.atan2(dz, dx) * 16 / TAU)) < 0.12 ? B.gold : B.domeC); } return RTOP + 16; })();
      roof.cyl(CX, DZc, dTop + 1, dTop + 3, 1.6, B.mTrim); roof.cyl(CX, DZc, dTop + 2, dTop + 3, 1, B.divine); roof.box(CX, dTop + 4, DZc, CX, dTop + 6, DZc, B.gold);
      lights.push({ name: 'dome', p: [CX + 0.5, dTop + 3, DZc + 0.5], c: '#f4e0ff', i: 0.6, d: 40, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '폴크방 큰 저택', note: '신전 같은 엄숙한 저택 · 연회의 홀', p: [CX + 0.5, dTop + 10, DZc + 0.5], boss: true });
      // 정문(금빛 문틀): 큰 홀(하위 지도)로 들어간다
      acts.push(OR.goAct({ at: [CX, P + 1, CZ1 + 13], h: 6, name: '폴크방 큰 홀 안으로', goto: 'freya-hall', hint: '금빛 문을 열고 긴 만찬 식탁과 은빛 옥좌가 있는 큰 홀로 들어가요', hit: [CX - 4, P + 1, CZ1, CX + 4, P + 12, CZ1] }));
      acts.push({
        name: '큰 홀의 만찬', hint: '지붕과 돔이 들어 올려지고, 큰 홀 긴 식탁에 촛불이 켜지며 만찬이 시작돼요', hit: [62, TOPC + 1, 22, 130, RY + 12, 69],
        run: async a => {
          await a.tween('roof', { off: [-6, 40, -30], rot: [-0.08, 0, 0.04] }, 2.4);
          a.flash('hall', 6, 5);
          for (let k = 0; k < 9; k++) { a.burst([72 + k * 6 + 0.5, P + 5, 42.5], { n: 12, colors: ['#ffd890', '#ffffff', '#f07890'], speed: 1.4, up: 3, life: 1.2, gravity: 2, spread: 0.8 }); await a.wait(0.3); }
          a.burst([66, P + 10, 42.5], { n: 30, colors: ['#f4ecff', '#ffffff', '#d8b048'], speed: 2, up: 2, life: 1.6, gravity: -0.3, spread: 1.2 });
          await a.wait(1.6);
          await a.tween('roof', { off: [0, 0, 0], rot: [0, 0, 0] }, 2.2);
        },
      });
      acts.push({
        name: '여신의 은빛', hint: '돔 꼭대기 등불에서 미의 여신의 은빛이 퍼져 정원 위로 쏟아져요', hit: [CX - 3, dTop, DZc - 3, CX + 3, dTop + 7, DZc + 3],
        run: async a => {
          a.flash('dome', 8, 4); a.glow(2, 4);
          for (let k = 0; k < 4; k++) { a.burst([CX + 0.5, dTop + 3, DZc + 0.5], { n: 50, colors: ['#f4ecff', '#ffffff', '#ffd0e8'], speed: 5 + k, up: 1, life: 1.6, gravity: 0.3, spread: 0.4, flat: k % 2 === 0 }); await a.wait(0.6); }
        },
      });

      // ── 양옆 날개: 낮은 평지붕, 아치 창, 난간과 꽃병 ──
      for (const [x0, x1] of [[26, 52], [140, 166]]) {
        for (let y = P + 1; y <= G + 22; y++) for (let z = 28; z <= 60; z++) for (let x = x0; x <= x1; x++) {
          if (x !== x0 && x !== x1 && z !== 28 && z !== 60) continue;
          const u = (x === x0 || x === x1) ? z : x;
          let b = (y - P) % 8 === 0 ? B.mTrim : B.marb;
          if (u % 6 >= 2 && u % 6 <= 3 && y > P + 2 && y < G + 20 && (y - P) % 8 !== 0) b = B.win;
          w.set(x, y, z, b);
        }
        w.box(x0, G + 23, 28, x1, G + 23, 60, B.marb2);
        for (let x = x0; x <= x1; x++) for (const z of [28, 60]) w.set(x, G + 24, z, (x & 1) ? B.mTrim : 0);
        for (let z = 28; z <= 60; z++) for (const x of [x0, x1]) w.set(x, G + 24, z, (z & 1) ? B.mTrim : 0);
        for (let x = x0 + 4; x <= x1 - 4; x += 9) urn(x, 58, G + 24);
      }

      // ── 장미 화단: 계단 양옆 ──
      for (const [x0, x1] of [[28, 72], [120, 164]]) {
        for (let z = 74; z <= 84; z++) for (let x = x0; x <= x1; x++) w.set(x, G, z, (z === 74 || z === 84 || x === x0 || x === x1) ? B.mTrim : B.soil);
        for (let x = x0 + 3; x <= x1 - 3; x += 5) for (const z of [77, 81]) OR.rose(w, B, x, G + 1, z, 1.8, hash3(x, 2, z) > 0.5 ? B.roseP : B.flowerW);
      }
      acts.push({
        name: '장미 꽃잎', hint: '장미 화단에 바람이 불어 붉은 꽃잎이 정원 가득 흩날려요', hit: [120, G, 74, 164, G + 4, 84],
        run: async a => {
          a.wind(3, 4);
          for (let k = 0; k < 14; k++) { const x = k % 2 ? 124 + (k * 13) % 38 : 32 + (k * 11) % 38; a.burst([x + 0.5, G + 4, 79], { n: 18, colors: ['#c8203a', '#f07890', '#ffd0dc'], speed: 3, up: 3, life: 2.4, gravity: 0.4, spread: 1.6, flat: true }); await a.wait(0.25); }
        },
      });

      // ── 넓은 정원(난전의 마당): 가운데 길과 분수 광장, 양쪽 잔디 마당의 파인 흙자국, 가장자리 장미와 꽃병 ──
      const FCZ = 128;
      for (let z = 82; z <= WZ1 - 3; z++) for (let x = 91; x <= 101; x++) if (Math.hypot(x - CX, z - FCZ) > 11) w.set(x, G, z, (x === 91 || x === 101) ? B.mTrim : B.paveL);
      for (let dz = -11; dz <= 11; dz++) for (let dx = -11; dx <= 11; dx++) { const d = Math.hypot(dx, dz); if (d <= 11) w.set(CX + dx, G, FCZ + dz, d > 10 ? B.mTrim : ((Math.floor(d / 3) & 1) ? B.paveL : B.pave)); }
      const fp = OR.fountain(w, CX, FCZ, 5, B.mTrim, B.stoneG, { h: 4, bowl: 2, top: B.gold });
      for (const [dx, dz] of [[-9, -6], [9, -6], [-9, 6], [9, 6]]) OR.lamp(w, B, CX + dx, FCZ + dz, 5);
      lights.push({ name: 'field', p: [CX + 0.5, G + 6, FCZ + 0.5], c: '#fff0c0', i: 0.45, d: 50, flicker: 0.1, srcR: 11 });
      acts.push({
        name: '정원 분수', hint: '정원 한가운데 분수가 금빛 꼭지에서 물을 높이 뿜어요', hit: [CX - 5, G, FCZ - 5, CX + 5, G + 6, FCZ + 5],
        run: async a => { for (let k = 0; k < 10; k++) { a.burst(fp, { n: 22, colors: ['#e8f8ff', '#8ac0d8', '#ffffff'], speed: 1.8, up: 7, life: 1.4, gravity: 9, spread: 0.6 }); await a.wait(0.3); } },
      });
      // 흙자국과 그을음: 매일 난전에 패인 자리
      const scars = [];
      for (let i = 0; i < 22; i++) {
        const east = i & 1, x = east ? w.ri(110, 168) : w.ri(24, 82), z = w.ri(92, 168), r = w.r(2.5, 6);
        if (Math.hypot(x - CX, z - FCZ) < 16) continue;
        scars.push([x, z]);
        for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) { const d = Math.hypot(dx, dz) + hash3(x + dx, 3, z + dz) * 1.5; if (d < r && inside(x + dx, z + dz) && w.get(x + dx, G, z + dz) === B.grass) w.set(x + dx, G, z + dz, d < r * 0.4 && i % 3 === 0 ? B.scorch : B.dirt); }
      }
      // 가장자리: 장미 덤불과 꽃병, 나무
      for (let z = 92; z <= 170; z += 9) for (const x of [20, 172]) OR.rose(w, B, x, G + 1, z, 1.6);
      for (let x = 24; x <= 168; x += 9) if (Math.abs(x - CX) > 8) OR.rose(w, B, x, G + 1, 172, 1.6);
      for (let z = 92; z <= 170; z += 12) if (Math.abs(z - FCZ) > 13) for (const x of [88, 104]) urn(x, z, G + 1);
      for (const [x, z] of [[22, 88], [170, 88], [40, 172], [152, 172]]) OR.tree(w, B, x, z, { h: 8, r: 3.4 });
      for (let z = 102; z <= 162; z += 20) for (const x of [26, 166]) OR.tree(w, B, x, z, { h: 7, r: 3 });
      for (let x = 36; x <= 160; x += 20) if (Math.abs(x - CX) > 24) OR.tree(w, B, x, 166, { h: 7, r: 3 });
      acts.push({
        name: '정원의 난전', hint: '해 뜰 때부터 해 질 때까지, 넓은 정원 곳곳에서 단원끼리 겨루는 「세례」가 벌어져 칼날과 마법 불꽃이 튀어요', hit: [24, G, 92, 82, G + 3, 168],
        run: async a => {
          for (let k = 0; k < 16; k++) {
            const [x, z] = scars[(k * 5) % scars.length];
            const fire = k % 4 === 3;
            a.burst([x + 0.5, G + 2.5, z + 0.5], fire ? { n: 30, colors: ['#ff6a1a', '#ffd060', '#ffffff'], speed: 4, up: 3, life: 0.8, gravity: 2, spread: 1 } : { n: 20, colors: ['#ffffff', '#c8d8ff', '#ffe08a'], speed: 5, up: 2, life: 0.45, gravity: 5, spread: 0.6 });
            a.burst([x + 0.5, G + 1, z + 0.5], { n: 8, colors: ['#a08868', '#8a7458'], speed: 1.5, up: 1, life: 0.8, gravity: 3, spread: 1.2 });
            if (fire) a.lightning(0.25);
            await a.wait(0.22);
          }
        },
      });
      acts.push({
        name: '치유의 빛', hint: '난전이 끝나자 치료 부대 「안드림니르」의 치유의 빛이 기둥처럼 솟아 다친 자리를 감싸요', hit: [110, G, 92, 168, G + 3, 168],
        run: async a => {
          a.flash('field', 3, 4); a.glow(1.6, 4);
          for (let k = 0; k < 8; k++) { const [x, z] = scars[(k * 3 + 1) % scars.length]; a.burst([x + 0.5, G + 1, z + 0.5], { n: 34, colors: ['#c8ffb0', '#ffe9a0', '#ffffff'], speed: 0.5, up: 9, life: 1.6, gravity: -1.5, spread: 0.5 }); await a.wait(0.35); }
        },
      });

      // ── 네 면의 큰 성벽: 북·서는 높고 남·동은 낮다. 모서리와 가운데 네모 탑, 남쪽 문루와 큰 문(부품) ──
      const wallSeg = (x0, z0, x1, z1, h) => {
        w.box(x0, G + 1, z0, x1, G + h, z1, B.wallF);
        for (let x = x0; x <= x1; x++) for (let z = z0; z <= z1; z++) {
          if ((x + z) % 2 === 0 && (x === x0 || x === x1 || z === z0 || z === z1)) w.set(x, G + h + 1, z, B.wallF2);
          w.set(x, G + h, z, B.wallF2);
        }
      };
      const sqTower = (x, z, h) => {
        w.box(x - 5, G + 1, z - 5, x + 5, G + h, z + 5, B.wallF2); w.box(x - 6, G + h + 1, z - 6, x + 6, G + h + 1, z + 6, B.mTrim);
        for (let dx = -6; dx <= 6; dx++) for (let dz = -6; dz <= 6; dz++) if ((Math.abs(dx) === 6 || Math.abs(dz) === 6) && (dx + dz) % 2 === 0) w.set(x + dx, G + h + 2, z + dz, B.wallF);
        for (let y = G + 6; y < G + h - 2; y += 6) for (const [dx, dz] of [[5, 0], [-5, 0], [0, 5], [0, -5]]) w.box(x + dx, y, z + dz, x + dx, y + 2, z + dz, B.win);
      };
      wallSeg(WX0, WZ0, WX1, WZ0 + 2, 16); wallSeg(WX0, WZ0, WX0 + 2, WZ1, 16);
      wallSeg(WX0, WZ1 - 2, 87, WZ1, 9); wallSeg(105, WZ1 - 2, WX1, WZ1, 9); wallSeg(WX1 - 2, WZ0, WX1, WZ1, 9);
      for (const [x, z, h] of [[WX0 + 1, WZ0 + 1, 22], [WX1 - 1, WZ0 + 1, 22], [WX0 + 1, WZ1 - 1, 22], [WX1 - 1, WZ1 - 1, 13], [CX, WZ0 + 1, 22], [WX0 + 1, 95, 22], [WX1 - 1, 95, 13]]) sqTower(x, z, h);
      // 문루: 문 양쪽 네모 탑과 아치, 문 위 통로
      sqTower(82, WZ1 - 1, 18); sqTower(110, WZ1 - 1, 18);
      w.box(88, G + 13, WZ1 - 2, 104, G + 16, WZ1, B.wallF); for (let x = 88; x <= 104; x++) w.set(x, G + 17, WZ1, (x & 1) ? B.wallF2 : 0);
      for (let x = 88; x <= 104; x++) w.set(x, G + 12, WZ1, B.mTrim);
      const gL = w.prop({ name: 'gateL', pivot: [88, G + 1, WZ1 - 0.5] }), gR = w.prop({ name: 'gateR', pivot: [105, G + 1, WZ1 - 0.5] });
      for (let x = 88; x <= 104; x++) for (let y = G + 1; y <= G + 11; y++) {
        const g = x <= 96 ? gL : gR, edge = x === 88 || x === 104 || y === G + 11 || y === G + 1;
        g.set(x, y, WZ1 - 1, edge || y === G + 6 ? B.iron : ((x + y) % 4 === 0 ? B.gold : B.door));
      }
      acts.push({
        name: '폴크방 정문', hint: '문루 아래 커다란 정문이 안쪽으로 천천히 열려요', hit: [88, G + 1, WZ1 - 2, 104, G + 11, WZ1],
        run: async a => { await Promise.all([a.turn('gateL', [0, 1.4, 0], 2), a.turn('gateR', [0, -1.4, 0], 2)]); await a.wait(1.8); await Promise.all([a.turn('gateL', [0, 0, 0], 1.6), a.turn('gateR', [0, 0, 0], 1.6)]); },
      });
      // 문 밖 마석등과 이정표
      const lp1 = OR.lamp(w, B, 80, WZ1 + 5, 5), lp2 = OR.lamp(w, B, 112, WZ1 + 5, 5);
      lights.push({ name: 'gate', p: [96.5, lp1[1], lp1[2]], c: '#fff0c0', i: 0.4, d: 24, flicker: 0.1, srcR: 17 });
      const sp = OR.signpost(w, B, 122, WZ1 + 6, { dir: [1, 0], boards: 1 });
      acts.push(OR.goAct({ at: sp, name: '중앙 광장 · 바벨로', goto: 'babel', hint: '성벽 밖 큰길을 따라가면 오라리오 한가운데 중앙 광장과 바벨이 나와요' }));
      return { lights, landmarks, acts };
    },
  });
})();
