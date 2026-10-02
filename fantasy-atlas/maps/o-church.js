// 버려진 교회(하위 지도) — 헤스티아 파밀리아의 처음 홈. 무너진 옛 동네 한가운데 담쟁이 덮인 작은 교회와 P자 지하실 (오라리오)
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 112;
  MAPS.push({
    id: 'hestia-church', cat: 'orario', sub: true, parent: 'hestia', name: '버려진 교회', en: 'Hestia Familia · Abandoned Church', color: '#a8b0a0', seed: 1106, base: 30, time: 'day', size: [W, D, Hh],
    desc: '헤파이스토스가 내어 준 낡은 교회. 무너진 큰 건물들 사이에 담쟁이를 뒤집어쓰고 서 있고, 숨은 문 아래 P자 지하실이 헤스티아와 벨의 첫 보금자리였다.',
    info: { title: '장소 정보', en: 'ORARIO', rows: [['쓰임', '헤스티아 파밀리아의 처음 홈'], ['지하실', '숨은 문 아래 P자 방'], ['훗날', '아폴론 파밀리아의 습격으로 무너진다']] },
    sky: ['#d8e8f0', '#7a9ab8', '#fff4dc'], stars: false,
    hemi: ['#f4f4ec', '#4a4a40', 0.6], sun: ['#fff0d8', 0.7, [0.4, 1, 0.5]],
    night: { sky: ['#283048', '#080a16', '#d8a068'], stars: true, hemi: ['#b0b8d0', '#181814', 0.44], sun: ['#d0d8ff', 0.32, [0.4, 1, 0.5]], haze: '#262a34' },
    liquid: ['#5a8aa8', '#8ac0d8', '#e8f8ff'], liqSpeed: 0.5,
    fog: { start: 0.8, floor: 14, depth: 8, haze: [34, 0.22, 8], hazeColor: '#dce8e0' },
    camY: 10, zoom: 1.5,
    particles: [
      { n: 80, colors: ['#fff6d8', '#ffffff'], mode: 'fall', speed: 0.12, area: [64, 60, 3], y0: 30, y1: 70, glow: true },
      { n: 80, colors: ['#fff6d8', '#ffffff'], mode: 'fall', speed: 0.12, area: [80, 74, 3], y0: 30, y1: 70, glow: true },
      { n: 90, colors: ['#7aa04a', '#5a8a3a', '#c8b060'], mode: 'drift', speed: 0.3, wind: 0.3, y0: 32, y1: 60, glow: false },
    ],
    blocks: Object.assign(OR.blocks(), {
      chStone: { c: '#c8c4b8', v: 0.06, pat: 'stone' }, chStone2: { c: '#a8a49a', v: 0.06, pat: 'brick' }, chRoof: { c: '#7a3a44', v: 0.05, pat: 'tile' }, ivy: { c: '#4a7a3a', v: 0.1 }, ivy2: { c: '#3a6a2e', v: 0.1 }, ruin: { c: '#b8b0a0', v: 0.06, pat: 'big' },
      plank: { c: '#7a5a3a', top: '#9a7448', v: 0.05, pat: 'plank' }, sofa: { c: '#a83a3a', v: 0.04 }, bed: { c: '#ece4d4', v: 0.02 }, bookR: { c: '#8a3a3a', v: 0.04 }, bookB: { c: '#3a4a8a', v: 0.04 }, lampW: { c: '#ffd890', glow: true }, bell: { c: '#d8b048', v: 0.04 },
      rubble: { c: '#a09a8e', v: 0.07, pat: 'stone' }, moss: { c: '#5a6a3a', top: '#6a8a40', v: 0.1 },
    }),
    build(w) {
      const B = w.id, n = w.noise, G = w.base;
      const CX0 = 58, CX1 = 82, CZ0 = 60, CZ1 = 76;                   // 교회 본당(정면은 동쪽)
      const RZ0 = 96, RZ1 = 104;                                      // 옛 동네 큰길(동서)
      MH.terrain(w, { floor: G - 10, height: () => G, surface: (x, z) => n.fbm(x * 0.1, z * 0.1, 2) > 0.55 ? B.grass : (hash3(x, 3, z) > 0.5 ? B.stoneG : B.pave), under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock });
      for (let z = RZ0; z <= RZ1; z++) for (let x = 0; x < W; x++) w.set(x, G, z, z === RZ0 || z === RZ1 ? B.curb : (hash3(x, 5, z) > 0.8 ? B.moss : B.brick));
      const lights = [], acts = [], landmarks = [];

      // ── 지하실(P자): 넓은 방 + 한쪽으로 뻗은 좁은 방과 계단. 소파, 침대, 책장, 작은 등 ──
      const BY = G - 6;
      for (let y = BY; y <= G - 1; y++) for (let z = CZ0 + 2; z <= CZ1 - 2; z++) for (let x = CX0 + 2; x <= CX1 - 2; x++) {
        const room = x <= CX0 + 13, stem = x > CX0 + 13 && z <= CZ0 + 7;
        if (!room && !stem) continue;
        const wall = (room && (x === CX0 + 2 || z === CZ0 + 2 || z === CZ1 - 2 || (x === CX0 + 13 && z > CZ0 + 7))) || (stem && (z === CZ0 + 2 || z === CZ0 + 7 || x === CX1 - 2));
        w.set(x, y, z, y === BY ? B.plank : (wall ? B.chStone2 : 0));
      }
      w.box(CX0 + 4, BY + 1, CZ1 - 6, CX0 + 6, BY + 2, CZ1 - 3, B.sofa); w.box(CX0 + 4, BY + 3, CZ1 - 3, CX0 + 6, BY + 3, CZ1 - 3, B.sofa);
      w.box(CX0 + 9, BY + 1, CZ1 - 6, CX0 + 12, BY + 1, CZ1 - 3, B.bed);
      w.box(CX0 + 3, BY + 1, CZ0 + 3, CX0 + 3, BY + 4, CZ0 + 6, B.plank); for (let z = CZ0 + 3; z <= CZ0 + 6; z++) for (const y of [BY + 2, BY + 4]) w.set(CX0 + 4, y, z, z % 2 ? B.bookR : B.bookB);
      w.box(CX0 + 8, BY + 1, CZ0 + 8, CX0 + 9, BY + 2, CZ0 + 9, B.plank); w.set(CX0 + 8, BY + 3, CZ0 + 8, B.lampW);
      for (let s = 0; s < 6; s++) w.box(CX1 - 4 - s, BY + 1, CZ0 + 4, CX1 - 4 - s, BY + 1 + s, CZ0 + 5, B.plank);
      w.box(CX0, G, CZ0, CX1, G, CZ1, 0);                                                  // 바닥은 교회(부품)에 딸려 있다
      lights.push({ name: 'basement', p: [CX0 + 8.5, BY + 3, CZ0 + 9.5], c: '#ffd890', i: 0.5, d: 16, flicker: 0.2, srcR: 3 });

      // ── 교회 본당(부품): 돌벽, 뾰족 아치 창, 어두운 붉은 기와, 종탑, 담쟁이 ──
      const church = w.prop({ name: 'church', pivot: [(CX0 + CX1) / 2, G, (CZ0 + CZ1) / 2], clipOK: 40 });
      church.box(CX0, G, CZ0, CX1, G, CZ1, B.chStone2);
      for (let y = G + 1; y <= G + 9; y++) for (let z = CZ0; z <= CZ1; z++) for (let x = CX0; x <= CX1; x++) {
        if (x !== CX0 && x !== CX1 && z !== CZ0 && z !== CZ1) continue;
        church.set(x, y, z, hash3(x, y, z) > 0.86 ? B.ivy : (y % 4 === 0 ? B.chStone2 : B.chStone));
      }
      for (let x = CX0 + 3; x <= CX1 - 3; x += 4) for (const z of [CZ0, CZ1]) LB.arch(church, { axis: 'x', c: z, u0: x, y0: G + 3, a: 1, h: 5, kind: 'pointed', fill: B.win, frame: B.chStone2 });
      LB.arch(church, { axis: 'z', c: CX1, u0: (CZ0 + CZ1) >> 1, y0: G + 1, a: 2, h: 7, kind: 'pointed', fill: B.door, frame: B.chStone2 });
      LB.arch(church, { axis: 'z', c: CX1, u0: (CZ0 + CZ1) >> 1, y0: G + 10, a: 1, h: 3, kind: 'pointed', fill: B.chStone2, frame: B.chStone });   // 문 위 빈 벽감
      { MH.roof(church, CX0 - 1, CX1 + 1, CZ0 - 1, CZ1 + 1, G + 10, { b: B.chRoof, eave: B.roofDk, ridge: B.roofDk, pitch: 1, gable: B.chStone, axis: 'x' }); }
      const TX = CX1 - 3, TZ = (CZ0 + CZ1) >> 1;
      church.box(TX - 2, G + 10, TZ - 2, TX + 2, G + 24, TZ + 2, B.chStone); church.box(TX - 1, G + 19, TZ - 2, TX + 1, G + 22, TZ + 2, 0); church.box(TX - 2, G + 19, TZ - 1, TX + 2, G + 22, TZ + 1, 0);
      { MH.pyramid(church, TX - 2, TZ - 2, TX + 2, TZ + 2, G + 25, B.chRoof, 3, B.roofDk); }
      for (let k = 0; k < 60; k++) { const x = CX0 + (hash3(k, 1, 7) * (CX1 - CX0) | 0), y = G + 1 + (hash3(k, 2, 7) * 9 | 0); for (const z of [CZ0 - 1, CZ1 + 1]) if (hash3(k, 3, z) > 0.4) { church.set(x, y, z, k % 3 ? B.ivy : B.ivy2); if (hash3(k, 4, z) > 0.5) church.set(x, y - 1, z, B.ivy); } }
      const bellP = w.prop({ name: 'cbell', pivot: [TX + 0.5, G + 22, TZ + 0.5], axis: 'x' }); bellP.set(TX, G + 21, TZ, B.iron); bellP.ellipsoid(TX, G + 19.5, TZ, 1.1, 1.5, 1.1, B.bell, (dx, dy) => dy >= -1);
      acts.push({
        name: '숨겨진 지하실', hint: '버려진 교회가 들려 올라가며 헤스티아와 벨이 처음 살던 P자 지하실이 드러나요', hit: [CX0 + 2, G + 1, CZ0 + 2, CX1 - 2, G + 9, CZ1 - 2],
        run: async a => {
          await Promise.all([a.tween('church', { off: [-6, 28, -10], rot: [0.05, 0.1, 0] }, 2.2), a.tween('cbell', { off: [-6, 28, -10] }, 2.2)]);
          a.flash('basement', 6, 4); a.glow(1.4, 4);
          for (let k = 0; k < 6; k++) { a.burst([CX0 + 8.5, BY + 4, CZ0 + 9.5], { n: 14, colors: ['#ffd890', '#fff6d0'], speed: 1, up: 2, life: 1.4, gravity: -0.3, spread: 2 }); await a.wait(0.35); }
          await a.wait(1);
          await Promise.all([a.tween('church', { off: [0, 0, 0], rot: [0, 0, 0] }, 2), a.tween('cbell', { off: [0, 0, 0] }, 2)]);
        },
      });
      acts.push({
        name: '교회 종탑', hint: '버려진 교회 종탑의 작은 종이 울려요', hit: [TX - 2, G + 18, TZ - 2, TX + 2, G + 23, TZ + 2],
        run: async a => { for (let k = 0; k < 4; k++) { await a.turn('cbell', [0.6, 0, 0], 0.35); a.burst([TX + 0.5, G + 20, TZ + 0.5], { n: 16, colors: ['#ffffff', '#e8eef8'], speed: 5, up: 0.5, life: 1.4, gravity: 1, spread: 2, flat: true }); await a.turn('cbell', [-0.6, 0, 0], 0.35); } await a.turn('cbell', [0, 0, 0], 0.4); },
      });
      landmarks.push({ name: '버려진 교회', note: '처음의 홈 · 숨은 지하실', p: [(CX0 + CX1) / 2, G + 34, (CZ0 + CZ1) / 2], boss: true });

      // ── 교회 둘레: 무너진 큰 건물들(아치 창이 뚫린 벽), 깨진 기둥, 잔해와 웃자란 나무 ──
      const ruins = [[CX0 - 14, CZ0 - 12, CX0 - 11, CZ1 + 10, 26], [CX0 - 11, CZ0 - 12, CX1 + 6, CZ0 - 9, 20], [CX1 + 12, CZ0 - 8, CX1 + 15, CZ1 + 6, 30], [CX1 + 6, CZ0 - 12, CX1 + 15, CZ0 - 9, 24]];
      for (const [x0, z0, x1, z1, h] of ruins) {
        w.box(x0, G + 1, z0, x1, G + h, z1, B.ruin);
        const alongZ = z1 - z0 > x1 - x0;
        for (let k = 0; k < 8; k++) for (const ly of [G + 3, G + 13]) LB.arch(w, { axis: alongZ ? 'z' : 'x', c: alongZ ? x1 : z1, u0: (alongZ ? z0 : x0) + 3 + k * 5, y0: ly, a: 1.4, h: 6, kind: 'round', fill: 0, frame: B.chStone2, depth: 4, dir: -1 });
        LB.crumble(w, x0 - 1, G + 6, z0 - 1, x1 + 1, G + h, z1 + 1, 0.38, 3, x0 + z0);
        for (let k = 0; k < 30; k++) { const x = x0 + (hash3(k, 5, x0) * (x1 - x0 + 1) | 0), z = z0 + (hash3(k, 6, z0) * (z1 - z0 + 1) | 0); let y = G + h; while (y > G && !w.get(x, y, z)) y--; if (y > G) w.set(x, y + 1, z, B.ivy); }
      }
      for (const [x, z, h] of [[CX0 - 4, CZ1 + 8, 7], [CX1 + 6, CZ1 + 10, 4], [CX0 + 6, CZ0 - 6, 9]]) { w.cyl(x, z, G + 1, G + h, 1.6, B.ruin); w.cyl(x, z, G + 1, G + 1, 2.4, B.chStone2); }
      for (let k = 0; k < 26; k++) { const x = w.ri(CX0 - 10, CX1 + 10), z = w.ri(CZ0 - 8, CZ1 + 14); if (x >= CX0 - 1 && x <= CX1 + 1 && z >= CZ0 - 1 && z <= CZ1 + 1) continue; MH.rock(w, x, G, z, w.r(0.8, 1.8), B.rubble, B.moss); }
      for (const [x, z] of [[CX0 - 6, CZ0 - 4], [CX1 + 9, CZ1 + 2], [CX0 - 6, CZ1 + 4]]) OR.tree(w, B, x, z, { h: 9, r: 3.4 });
      acts.push({
        name: '무너진 창의 햇살', hint: '무너진 건물 창틈으로 햇살이 쏟아지며 빛 알갱이가 내려앉아요', hit: [CX0 + 4, G + 1, CZ1 + 2, CX0 + 8, G + 4, CZ1 + 6],
        run: async a => { a.glow(1.5, 4); for (let k = 0; k < 10; k++) { for (const [x, z] of [[64, 60], [80, 74], [70, 82]]) a.burst([x + 0.5, G + 30 - k * 2, z + 0.5], { n: 10, colors: ['#fff6d8', '#ffffff'], speed: 0.5, up: -1, life: 2, gravity: 0.6, spread: 2 }); await a.wait(0.3); } },
      });
      acts.push({
        name: '담쟁이', hint: '교회 벽을 덮은 담쟁이가 바람에 흔들리며 잎이 흩날려요', hit: [CX0 + 1, G + 1, CZ1, CX0 + 9, G + 9, CZ1 + 1],
        run: async a => { a.wind(2, 3); for (let k = 0; k < 8; k++) { a.burst([CX0 + 2 + k * 2.6, G + 5, CZ1 + 1.5], { n: 10, colors: ['#4a7a3a', '#7aa04a', '#c8b060'], speed: 2, up: 1, life: 2, gravity: 0.8, spread: 1.4, flat: true }); await a.wait(0.2); } },
      });

      // ── 옛 동네 큰길: 이정표(화덕의 저택 · 중앙 광장), 가로등, 낡은 집들 ──
      const sp1 = OR.signpost(w, B, CX1 + 4, RZ0 - 2, { dir: [1, 0], boards: 1 }), sp2 = OR.signpost(w, B, CX0 - 4, RZ0 - 2, { dir: [-1, 0], boards: 1 });
      acts.push(OR.goAct({ at: sp1, name: '화덕의 저택으로', goto: 'hestia', hint: '지금의 홈인 화덕의 저택으로 돌아가요' }));
      acts.push(OR.goAct({ at: sp2, name: '중앙 광장 · 바벨로', goto: 'babel', hint: '큰길을 따라 오라리오 한가운데 중앙 광장과 바벨로 가요' }));
      for (let x = 10; x < W - 8; x += 16) for (const z of [RZ0 - 2, RZ1 + 2]) if (Math.abs(x - 70) > 16) OR.lamp(w, B, x, z, 5);
      const placed = [[CX0 - 16, CZ0 - 14, CX1 + 17, CZ1 + 16]];
      OR.fill(w, B, { placed, x0: 3, z0: 3, x1: W - 4, z1: D - 4, tries: 400, floors: [1, 3], ok: (x, z) => x > 2 && z > 2 && x < W - 3 && z < D - 3 && !(z >= RZ0 - 2 && z <= RZ1 + 2), face: (x, z) => z > RZ1 ? 'n' : 's' });
      return { lights, landmarks, acts };
    },
  });
})();
