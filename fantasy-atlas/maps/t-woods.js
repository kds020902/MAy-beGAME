// 삼림 — 제재소 핵심부: 오목한 분지 안 마당. 서쪽 회색 창고(동쪽 박공에 큰 문), 북쪽 긴 철골 창고, 남서 큰 철골 창고, 가운데 풀섬의 슈투르만 은닉처(트랙터 바퀴 위 공구함), 북쪽 통나무 옹벽과 집게 크레인 트럭 (슈투르만의 영역)
// 배치는 tarkov.dev 지도의 건물 치수(1복셀≈1m)와 mapgenie·은닉처 지도를 따랐다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 144, D = 144, Hh = 80;
  MAPS.push({
    id: 'woods', cat: 'tarkov', name: '삼림', en: 'Woods · Sawmill', color: '#5a7a4a', seed: 604, base: 20, time: 'day', size: [W, D, Hh],
    desc: '프리오제르스크 자연보호구역 깊은 숲, 큰 호수 바로 북쪽 분지에 자리한 낡은 제재소. 서쪽에 청회색 판벽의 회색 창고와 녹슨 붉은 철골 창고들이 서 있고, 마당에는 자갈길이 여러 갈래로 엉켜 풀섬을 만든다. 가운데 풀섬의 통나무 더미 옆, 눕혀 둔 트랙터 바퀴 위 공구함이 슈투르만의 은닉처다. 이곳은 저격수 보스 슈투르만과 호위병들의 영역 — 그들은 멀리서 먼저 쏜다.',
    info: { title: '구역 정보', en: 'WOODS · SAWMILL', rows: [['위치', '우즈 남쪽 · 큰 호수 북쪽 분지'], ['보스', '슈투르만 · 호위병 2명'], ['은닉처', '가운데 풀섬 · 트랙터 바퀴 위 공구함'], ['열쇠', '슈투르만의 은닉처 열쇠(보스가 지님)'], ['안쪽', '회색 창고 · 제재 홀']] },
    sky: ['#b8ccd8', '#6e8ea8', '#e8ece4'], stars: false,
    hemi: ['#e4ece4', '#3a4232', 0.66], sun: ['#fff6e4', 0.6, [-0.45, 1, 0.6]],
    fog: { start: 0.93, floor: 12, depth: 8, haze: [24, 0.2, 7], hazeColor: '#c8d0cc' },
    camY: -14, zoom: 1.35,
    particles: [
      { n: 40, colors: ['#e4e8e0', '#d0d6d0'], mode: 'wisp', speed: 0.45, size: 3, y0: 21, glow: false },
      { n: 80, colors: ['#d8bc88', '#c8a878', '#8a9a72'], mode: 'drift', speed: 0.3, wind: 0.4, y0: 22, y1: 50, glow: false },
    ],
    blocks: {
      // 땅
      grass: { c: '#4e6034', top: '#62763e', v: 0.1 }, grassY: { c: '#5e6a3a', top: '#76884a', v: 0.1 }, needle: { c: '#4a4232', top: '#5a5036', v: 0.12 }, moss: { c: '#3e5030', top: '#4e6436', v: 0.1 },
      gravel: { c: '#8e8676', top: '#b2aa98', v: 0.08 }, gravelD: { c: '#7e7464', top: '#9c927e', v: 0.07 }, dirt: { c: '#5e4c36', top: '#7a6a50', v: 0.08 }, sawdust: { c: '#b89868', top: '#d0b07a', v: 0.08 },
      soil: { c: '#4a3c2c', v: 0.08 }, rock: { c: '#8a8a80', top: '#9a9a90', v: 0.07, pat: 'stone' }, rockD: { c: '#5e605a', v: 0.06, pat: 'stone' },
      // 나무
      bark: { c: '#4a3a2c', v: 0.06 }, birch: { c: '#d8d6cc', v: 0.08 }, birchL: { c: '#8a9a4a', top: '#a4b05a', v: 0.1 }, birchL2: { c: '#6e7e3e', v: 0.1 },
      pine0: { c: '#4e6e44', top: '#5a7a4a', v: 0.08 }, pine1: { c: '#38563a', v: 0.08 }, pine2: { c: '#2a4430', v: 0.07 },
      pineD0: { c: '#3a5a3a', top: '#44663e', v: 0.08 }, pineD1: { c: '#2a4430', v: 0.07 }, pineD2: { c: '#1e3424', v: 0.06 },
      fern: { c: '#5a7a3a', v: 0.12 }, bushB: { c: '#3e5a32', top: '#4e6a38', v: 0.1 },
      // 통나무(회색 껍질)·목재
      logB: { c: '#6e665a', v: 0.08 }, logB2: { c: '#5a5248', v: 0.08 }, logEnd: { c: '#dcc08e', v: 0.05 }, logPith: { c: '#a8865a', v: 0.04 },
      plankN: { c: '#c8a878', top: '#d4b484', v: 0.05, pat: 'plank' }, plankG: { c: '#9a8c74', top: '#aa9c82', v: 0.05, pat: 'plank' }, plankD: { c: '#4e4438', v: 0.05, pat: 'plank' }, beam: { c: '#3e3226', v: 0.04 },
      // 철골 창고: 녹슨 붉은 기둥·트러스, 녹슨 골함석
      steelR: { c: '#8e3a24', v: 0.04 }, steelRD: { c: '#6a2c1e', v: 0.04 }, sheetR: { c: '#7e3a28', v: 0.06, pat: 'plank' }, sheetR2: { c: '#9a5238', v: 0.06, pat: 'plank' },
      roofR: { c: '#7a3e2a', top: '#8a4a30', v: 0.06, pat: 'plank' }, roofR2: { c: '#a0623e', top: '#a86a42', v: 0.07, pat: 'plank' },
      // 회색 창고: 아래 민트빛 청회색 패널, 위 바랜 회색 널판, 녹슨 격자 트러스
      tealW: { c: '#7e9a94', v: 0.05, pat: 'plank' }, tealD: { c: '#5e7a76', v: 0.04 }, greyW: { c: '#8e8e86', v: 0.07, pat: 'plank' }, roofG: { c: '#6e6c66', top: '#7c7a72', v: 0.05, pat: 'plank' }, lattice: { c: '#8a4a2e', v: 0.05 },
      // 금속·콘크리트
      iron: { c: '#2e3034', v: 0.03 }, steel: { c: '#8a9298', v: 0.03 }, steelL: { c: '#c4ccd0', v: 0.02 }, rust: { c: '#7a4a2e', v: 0.08 },
      conc: { c: '#8e8c86', top: '#a09e96', v: 0.05, pat: 'stone' },
      // 탈것·잡동사니
      khaki: { c: '#8a8458', v: 0.04 }, khakiD: { c: '#6a6644', v: 0.04 }, uralG: { c: '#5a6640', v: 0.05 }, uralD: { c: '#454e32', v: 0.04 }, orange: { c: '#c8742e', v: 0.04 }, orangeD: { c: '#9a5a26', v: 0.04 },
      tire: { c: '#1e1e20', v: 0.03 }, hub: { c: '#d8b040', v: 0.03 }, glass: { c: '#3a4448', v: 0.02 }, suv: { c: '#2e2c28', v: 0.03 }, suvD: { c: '#1e1c1a', v: 0.02 },
      cabin: { c: '#4e4236', v: 0.05, pat: 'plank' }, dumpG: { c: '#4a6a3a', v: 0.06 }, barrelR: { c: '#8a4a2a', v: 0.06 }, barrelO: { c: '#4e5a36', v: 0.05 }, crateG: { c: '#5a6236', v: 0.05, pat: 'plank' },
      toolbox: { c: '#6a5038', v: 0.05 }, toolboxD: { c: '#4a3828', v: 0.04 }, pole: { c: '#5a4a38', v: 0.05 }, wire: { c: '#1e1e1e', v: 0 },
      win: { c: '#ffd890', night: true, day: '#3a4448' },
      // 이정표(OR.signpost가 쓰는 이름): 콘크리트 받침, 검은 각목, 판자, 노란 끝, 등
      stoneG: { c: '#8e8c86', v: 0.05 }, timber: { c: '#3e3226', v: 0.04 }, door: { c: '#9a8c74', v: 0.05, pat: 'plank' }, gold: { c: '#e0b030', v: 0.04 }, mlamp: { c: '#ffe0a0', glow: true },
      // 빛
      lamp: { c: '#ffe0a0', glow: true }, lampR: { c: '#ff4a3a', glow: true }, lampO: { c: '#ffa040', glow: true }, chem: { c: '#7aff8a', glow: true }, head: { c: '#fff4d0', glow: true },
    },
    build(w) {
      const B = w.id, G = w.base, n = w.noise;
      const lights = [], acts = [], landmarks = [];
      const keep = [];
      const hold = (x0, z0, x1, z1) => keep.push([x0, z0, x1, z1]);

      // ── 땅: 평평한 분지 마당, 북·서쪽은 비탈로 솟고(숲), 동쪽은 낮은 둔덕, 남쪽은 열어 둔다 ──
      const ROADS = [
        [[86, 0], [86, 40], [88, 58], [95, 80], [103, 100], [110, 120], [116, 143]],      // 북→남 큰 자갈길
        [[86, 44], [98, 40], [112, 37], [124, 31], [131, 29]],                             // 숙소 오두막·동쪽 큰길로
        [[88, 50], [74, 56], [62, 61], [50, 61], [42, 60]],                                 // 회색 창고 문 앞으로
        [[56, 52], [60, 61]],                                                               // 북쪽 창고 남단
        [[48, 62], [53, 73], [61, 83], [68, 93], [73, 106], [76, 124], [78, 143]],          // 서쪽 갈래(큰 창고 동쪽 끝)
        [[62, 63], [71, 76], [82, 84], [95, 84]],                                           // 은닉처 풀섬 남쪽 가장자리
        [[62, 99], [78, 96], [94, 92], [104, 97]],                                          // 큰 창고 북동 동서길
        [[63, 108], [84, 109], [107, 108]],                                                 // 아래 동서길
        [[131, 0], [131, 52], [134, 100], [138, 143]],                                      // 동쪽 큰길
      ];
      const rd = (x, z) => Math.min(...ROADS.map(r => MH.polyDist(x, z, r)));
      const height = (x, z) => {
        let h = G;
        const bn = MH.sstep(13, 2, z) * (1 - MH.sstep(80, 90, x) * MH.sstep(97, 90, x) * 0.75);   // 북쪽 비탈(큰길 자리만 완만)
        const bw = MH.sstep(9, 0, x);                                                                // 서쪽 비탈
        h += bn * 9 + bw * 7 + (bn + bw) * (n.fbm(x * 0.08, z * 0.08) - 0.5) * 3;
        if (bn + bw < 0.05) h += (n.fbm(x * 0.05 + 7, z * 0.05) - 0.5) * 0.9;
        return h;
      };
      MH.terrain(w, {
        floor: G - 8, height,
        surface: (x, z, y) => {
          const hh = hash3(x, 7, z);
          if (y > G + 1) return hh > 0.6 ? B.needle : (hh > 0.3 ? B.grass : B.moss);
          const r = rd(x + 0.5, z + 0.5), bare = r < (Math.hypot(x - 79, z - 70) < 11 ? 2.8 : 5.5 + n.fbm(x * 0.15, z * 0.15 + 4) * 3) && x < 126;   // 은닉처 풀섬은 풀
          if (bare) return hh > 0.75 ? B.gravelD : (hh > 0.5 ? B.dirt : (hh > 0.12 ? B.gravelD : B.grass));
          return n.fbm(x * 0.09 + 30, z * 0.09) > 0.6 ? (hh > 0.4 ? B.grassY : B.grass) : (hh > 0.88 ? B.moss : B.grass);
        },
        under: (x, z, y, dep) => dep < 2 ? B.soil : B.rock,
      });
      // 자갈길과 건물 둘레 맨땅
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = rd(x + 0.5, z + 0.5);
        if (d < 2.4) MH.paint(w, x, z, hash3(x, 2, z) > 0.78 ? B.gravelD : B.gravel);
        else if (d < 3.3 && hash3(x, 5, z) > 0.45) MH.paint(w, x, z, hash3(x, 6, z) > 0.5 ? B.gravelD : B.dirt);
      }
      const apron = (x0, z0, x1, z1) => { for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) if (MH.g(w, x, z) === G) MH.paint(w, x, z, hash3(x, 9, z) > 0.8 ? B.sawdust : (hash3(x, 8, z) > 0.4 ? B.gravelD : B.dirt)); };

      // ── 통나무·더미 도우미: 회색 껍질, 끝은 연한 나이테 ──
      const log = (t, axis, a0, a1, u, cy, r) => {
        const R = Math.ceil(r), bk = hash3(a0, cy, u) > 0.5 ? B.logB : B.logB2;
        for (let a = a0; a <= a1; a++) for (let dy = -R; dy <= R; dy++) for (let du = -R; du <= R; du++) {
          const d = Math.hypot(dy, du);
          if (d > r) continue;
          let b = bk;
          if (a === a0 || a === a1) b = d > r - 0.6 ? bk : (d < 0.5 ? B.logPith : B.logEnd);
          if (axis === 'x') t.set(a, cy + dy, u + du, b); else t.set(u + du, cy + dy, a, b);
        }
      };
      const pile = (axis, a0, a1, uc, rows, r, sp, y0, skip) => {
        const out = [];
        for (let k = 0; k < rows; k++) {
          const cnt = rows - k + 1;
          for (let i = 0; i < cnt; i++) {
            const u = uc + Math.round((i - (cnt - 1) / 2) * sp), y = y0 + Math.floor(r) + k * Math.round(sp * 0.8);
            const j = Math.round(hash3(u, k, a0) * 2) - 1;
            out.push([k, i, u, y]);
            if (skip && skip(k, i)) continue;
            log(w, axis, a0 + j, a1 + j, u, y, r);
          }
        }
        return out;
      };
      // 판재 더미: 받침목 위 널판 층, 층 사이 막대
      const boards = (x0, z0, x1, z1, layers, y0, b) => {
        const alongX = x1 - x0 >= z1 - z0;
        for (let k = 0; k < layers; k++) {
          const y = (y0 || G + 1) + k * 2;
          if (alongX) for (let x = x0; x <= x1; x += 3) w.box(x, y, z0, x, y, z1, B.beam); else for (let z = z0; z <= z1; z += 3) w.box(x0, y, z, x1, y, z, B.beam);
          w.box(x0, y + 1, z0, x1, y + 1, z1, b || (hash3(x0, k, z0) > 0.5 ? B.plankN : B.plankG));
        }
      };

      // ── 녹슨 붉은 철골 창고: 콘크리트 기단, 5칸마다 기둥, 격자 트러스, 아주 낮은 함석 박공, 윗부분만 골함석 ──
      const steelShed = (x0, z0, x1, z1, h, o) => {
        const top = G + 1 + h, alongX = o.axis === 'x';
        hold(x0 - 1, z0 - 1, x1 + 1, z1 + 1);
        MH.flatten(w, x0 - 2, z0 - 2, x1 + 2, z1 + 2, G, B.gravelD, B.soil);
        w.box(x0, G + 1, z0, x1, G + 1, z1, B.conc);
        const col = (x, z) => w.box(x, G + 2, z, x, top, z, B.steelR);
        for (let x = x0; x <= x1; x++) if ((x - x0) % 5 === 0 || x === x1) { col(x, z0); col(x, z1); }
        for (let z = z0; z <= z1; z++) if ((z - z0) % 5 === 0 || z === z1) { col(x0, z); col(x1, z); }
        w.walls(x0, top, z0, x1, top, z1, B.steelR);
        if (alongX) for (let x = x0; x <= x1; x += 5) { w.box(x, top, z0, x, top, z1, B.steelRD); for (let z = z0; z < z1; z += 2) w.line(x, top, z, x, top + 1, z + 1, B.steelRD); }
        else for (let z = z0; z <= z1; z += 5) { w.box(x0, top, z, x1, top, z, B.steelRD); for (let x = x0; x < x1; x += 2) w.line(x, top, z, x + 1, top + 1, z, B.steelRD); }
        const clad = (side, y0, y1) => {
          for (let y = y0; y <= y1; y++) {
            if (side === 'n' || side === 's') { const z = side === 'n' ? z0 : z1; for (let x = x0; x <= x1; x++) if (w.get(x, y, z) !== B.steelR) w.set(x, y, z, hash3(x, y >> 2, z) > 0.8 ? B.sheetR2 : B.sheetR); }
            else { const x = side === 'w' ? x0 : x1; for (let z = z0; z <= z1; z++) if (w.get(x, y, z) !== B.steelR) w.set(x, y, z, hash3(x, y >> 2, z) > 0.8 ? B.sheetR2 : B.sheetR); }
          }
        };
        for (const s of o.clad || []) clad(s, G + 2, top - 1);
        for (const s of o.band || []) clad(s, top - 3, top - 1);
        const a0 = alongX ? z0 - 1 : x0 - 1, a1 = alongX ? z1 + 1 : x1 + 1;
        let peak = top;
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const a = alongX ? z : x, y = top + 1 + Math.floor(Math.min(a - a0, a1 - a) / 4);
          peak = Math.max(peak, y);
          w.set(x, y, z, n.fbm(x * 0.2, z * 0.2 + 9) > 0.58 ? B.roofR2 : B.roofR);
        }
        return { top, peak };
      };

      // ① 북쪽 긴 창고(남북, 8.8×37.5m): 서·북쪽 막힘, 동쪽 윗띠. 안에 판재 더미
      const S1 = steelShed(51, 15, 60, 52, 7, { axis: 'z', clad: ['w', 'n'], band: ['e'] });
      for (const [z0, z1] of [[17, 23], [26, 32], [35, 41], [44, 49]]) boards(53, z0, 58, z1, z0 === 35 ? 2 : 3, G + 2);
      landmarks.push({ name: '북쪽 철골 창고', note: '판재 더미 · 슈투르만 호위병 자리', p: [55.5, S1.peak + 5, 33.5] });
      // ③ 큰 철골 창고(동서, 50×21m): 북쪽 윗띠·서쪽 벽, 안에 통나무 더미 세 무더기
      const S3 = steelShed(11, 94, 61, 115, 8, { axis: 'x', clad: ['w'], band: ['n', 's'] });
      for (const [a0, a1] of [[14, 26], [30, 43], [47, 58]]) pile('x', a0, a1, 104, 3, 2.2, 4.4, G + 2);
      landmarks.push({ name: '슈투르만의 제재소', note: '보스 슈투르만 · 호위병 2명', p: [36.5, S3.peak + 9, 104.5], boss: true });
      w.box(62, G + 1, 95, 64, G + 3, 98, B.dumpG); w.box(62, G + 4, 95, 64, G + 4, 98, B.uralD);                         // 초록 쓰레기통(기둥 옆)

      // ── ② 회색 창고(동서, 29×14m): 아래 민트빛 패널, 위 회색 널판, 낮은 박공, 동쪽 박공에 큰 문 ──
      const GX0 = 11, GX1 = 40, GZ0 = 53, GZ1 = 68, GT = G + 7;
      hold(GX0 - 1, GZ0 - 1, GX1 + 3, GZ1 + 1);
      MH.flatten(w, GX0 - 2, GZ0 - 2, GX1 + 4, GZ1 + 2, G, B.gravelD, B.soil);
      apron(GX1 + 1, GZ0 - 3, GX1 + 8, GZ1 + 3); hold(GX1 + 1, GZ0 - 2, GX1 + 14, GZ1 + 2);
      w.box(GX0, G, GZ0, GX1, G, GZ1, B.conc);
      for (let y = G + 1; y <= GT; y++) for (let z = GZ0; z <= GZ1; z++) for (let x = GX0; x <= GX1; x++) {
        if (x !== GX0 && x !== GX1 && z !== GZ0 && z !== GZ1) continue;
        const corner = (x === GX0 || x === GX1) && (z === GZ0 || z === GZ1), post = (x - GX0) % 5 === 0 && (z === GZ0 || z === GZ1);
        w.set(x, y, z, corner || post ? B.tealD : (y <= G + 3 ? B.tealW : (y === G + 4 ? B.tealD : B.greyW)));
      }
      w.box(24, G + 1, GZ1, 26, G + 4, GZ1, B.timber); w.box(25, G + 1, GZ1, 25, G + 4, GZ1, B.suvD);   // 남쪽 쪽문
      const gp = MH.roof(w, GX0 - 1, GX1 + 1, GZ0 - 1, GZ1 + 1, GT + 1, { b: B.roofG, eave: B.rust, ridge: B.iron, pitch: 1, gable: B.greyW, axis: 'x' });
      const DZ0 = 57, DZ1 = 64, DH = G + 5;
      w.box(GX1, G + 1, DZ0, GX1, DH, DZ1, 0);
      for (let z = DZ0; z <= DZ1; z++) for (let y = DH + 1; y <= DH + 2; y++) w.set(GX1 - 1, y, z, (z + y) % 2 ? B.lattice : 0);   // 문 위 안쪽 녹슨 격자
      w.box(GX1 + 1, DH + 2, DZ0 - 4, GX1 + 1, DH + 2, DZ1 + 4, B.iron);                                                    // 문 레일
      for (let z = DZ0; z <= DZ1; z++) MH.paint(w, GX1 - 1, z, B.sawdust);
      w.box(GX1 - 4, G + 1, DZ0 - 1, GX1 - 4, DH + 2, DZ1 + 1, B.suvD); w.box(GX1 - 3, G, DZ0, GX1 - 2, G, DZ1, B.plankD);   // 문 안쪽 어둠
      w.set(30, GT - 1, 60, B.lamp); w.set(30, GT, 60, B.iron);
      lights.push({ name: 'shed', p: [36.5, G + 4, 60.5], c: '#ffd8a0', i: 0.35, d: 22, flicker: 0.15, srcR: 7 });
      // 미닫이문 두 짝: 평소엔 양옆 벽 앞으로 밀려 열려 있다
      const dA = w.prop({ name: 'doorA', pivot: [GX1 + 1.5, G + 1, DZ0 - 2] }), dB = w.prop({ name: 'doorB', pivot: [GX1 + 1.5, G + 1, DZ1 + 2.5] });
      for (const [p, z0, z1] of [[dA, DZ0 - 4, DZ0 - 1], [dB, DZ1 + 1, DZ1 + 4]]) for (let z = z0; z <= z1; z++) for (let y = G + 1; y <= DH + 1; y++) {
        const e = y === G + 1 || y === DH + 1 || z === z0 || z === z1;
        p.set(GX1 + 1, y, z, e ? B.tealD : (y > G + 3 ? B.greyW : B.tealW));
      }
      acts.push({
        name: '회색 창고 미닫이문', hint: '회색 창고 동쪽 박공의 큰 미닫이문이 드르륵 닫혔다가, 안쪽 등불이 깜빡이며 다시 활짝 열려요', hit: [GX1, G + 1, DZ0 - 4, GX1 + 1, DH + 1, DZ1 + 4],
        run: async a => {
          await Promise.all([a.move('doorA', [0, 0, 4], 1.4), a.move('doorB', [0, 0, -4], 1.4)]);
          a.burst([GX1 + 2, G + 1.5, (DZ0 + DZ1) / 2 + 0.5], { n: 26, colors: ['#c8b890', '#a89a7a', '#e0d4b4'], speed: 4, up: 1, life: 1.2, gravity: 1, spread: 3, flat: true });
          await a.wait(0.8);
          a.flash('shed', 7, 4);
          await Promise.all([a.move('doorA', [0, 0, 0], 1.6), a.move('doorB', [0, 0, 0], 1.6)]);
          a.burst([GX1 + 3, G + 1.5, (DZ0 + DZ1) / 2 + 0.5], { n: 30, colors: ['#c8b890', '#a89a7a', '#e0d4b4'], speed: 5, up: 1.2, life: 1.4, gravity: 1, spread: 3, flat: true });
          await a.wait(1.5);
        },
      });
      landmarks.push({ name: '회색 창고', note: '제재 홀 · 안으로 들어갈 수 있다', p: [25.5, gp + 6, 60.5] });
      // 이정표: 문 앞 → 안쪽 지도
      const sp = OR.signpost(w, B, 47, 54, { dir: [-1, 0], boards: 1, h: 6 });
      hold(42, 52, 48, 56);
      acts.push(OR.goAct({ at: sp, name: '회색 창고 안으로', goto: 'woods-in', hint: '큰 문을 지나 회색 창고 안 제재 홀로 들어가요. 둥근 톱과 롤러 컨베이어, 선반의 의료품이 있어요' }));
      // 문 앞 검은 랜드크루저(호위병 차)
      const SX0 = 43, SX1 = 51, SZ = 72;
      hold(SX0 - 1, SZ - 2, SX1 + 1, SZ + 2);
      for (const x of [SX0 + 1, SX1 - 1]) for (const z of [SZ - 2, SZ + 2]) w.box(x, G + 1, z, x + 1, G + 2, z, B.tire);
      w.box(SX0, G + 2, SZ - 1, SX1, G + 3, SZ + 1, B.suv);                                                    // 차체
      w.box(SX0 + 1, G + 4, SZ - 1, SX1 - 3, G + 4, SZ + 1, B.glass); w.box(SX0 + 2, G + 4, SZ, SX1 - 4, G + 4, SZ, B.suvD);   // 유리창 띠
      w.box(SX0 + 1, G + 5, SZ - 1, SX1 - 3, G + 5, SZ + 1, B.suvD);                                           // 지붕
      w.set(SX1 + 1, G + 3, SZ - 1, B.head); w.set(SX1 + 1, G + 3, SZ + 1, B.head); w.set(SX0 - 1, G + 3, SZ - 1, B.lampR); w.set(SX0 - 1, G + 3, SZ + 1, B.lampR);
      lights.push({ name: 'suv', p: [SX1 + 1.5, G + 3, SZ + 0.5], c: '#ffb060', i: 0.3, d: 14, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '랜드크루저 경보', hint: '회색 창고 앞 검은 랜드크루저의 경보가 울려 깜빡이가 번쩍이고, 놀란 새들이 날아올라요', hit: [SX0, G + 1, SZ - 2, SX1 + 1, G + 6, SZ + 2],
        run: async a => {
          for (let k = 0; k < 8; k++) {
            a.flash('suv', 9, 0.3);
            for (const [x, z] of [[SX1 + 1.5, SZ - 0.5], [SX1 + 1.5, SZ + 1.5], [SX0 - 0.5, SZ - 0.5], [SX0 - 0.5, SZ + 1.5]]) a.burst([x, G + 3.5, z], { n: 4, colors: ['#ffb040', '#fff0c0'], speed: 0.6, up: 0.2, life: 0.35, gravity: 0, spread: 0.2 });
            await a.wait(0.4);
          }
          a.burst([20.5, G + 22, 40.5], { n: 26, colors: ['#2a2a2c', '#3e3a36'], speed: 6, up: 4, life: 2.4, gravity: -0.8, spread: 3 });
        },
      });

      // ── 가운데 풀섬: 부채꼴로 흩어진 통나무 더미 옆, 눕힌 트랙터 바퀴 위 공구함 = 슈투르만의 은닉처 ──
      const IX = 80, IZ = 71;
      hold(IX - 12, IZ - 8, IX + 8, IZ + 7);
      pile('x', IX - 7, IX + 5, IZ - 4, 3, 1.6, 3.2, G + 1);                                   // 쌓인 통나무(동서)
      for (const [dx, dz] of [[-9, 2], [-8, 4], [-7, 6], [-5, 7]]) w.line(IX - 2, G + 1.5, IZ, IX + dx, G + 1.2, IZ + dz, B.logB, 0.7);   // 앞으로 흩어진 통나무
      for (const [dx, dz] of [[-9, 2], [-8, 4], [-7, 6], [-5, 7]]) w.set(IX + dx, G + 1, IZ + dz, B.logEnd);
      // 트랙터 바퀴(세움): 통나무 더미 남쪽 끝에 기대 선 검은 타이어와 노란 휠, 그 위(접지면)에 갈색 공구함
      const TX = IX + 2, TZ = IZ + 3, TY = G + 4;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 3.3) continue;
        w.box(TX + dx, TY + dy, TZ, TX + dx, TY + dy, TZ + 1, d > 1.8 ? B.tire : (d > 0.7 ? B.hub : B.iron));
      }
      for (const dx of [-1, 0, 1]) w.set(TX + dx, TY + 3, TZ - 1, B.tire);
      w.box(TX - 1, TY + 4, TZ, TX + 1, TY + 4, TZ + 1, B.toolboxD);
      const lid = w.prop({ name: 'stash', pivot: [TX + 0.5, TY + 5, TZ + 0.2] });
      lid.box(TX - 1, TY + 5, TZ, TX + 1, TY + 5, TZ + 1, B.toolbox); lid.set(TX, TY + 6, TZ, B.iron); lid.set(TX, TY + 6, TZ + 1, B.iron);
      w.set(TX - 2, G + 1, TZ + 3, B.chem);
      lights.push({ name: 'stash', p: [TX - 1.5, G + 1.5, TZ + 3.5], c: '#9aff9a', i: 0.25, d: 10, flicker: 0.1, srcR: 3 });
      MH.tree(w, IX + 7, G + 1, IZ - 6, { kind: 'oak', h: 6, bark: B.birch, leaves: [B.birchL, B.birchL2, B.birchL2], r: 2.2, trunkR: 0.6, spread: 2, branches: 3 });
      for (const [x, z] of [[IX - 4, IZ + 5], [IX + 6, IZ + 5], [IX - 10, IZ + 2]]) MH.bush(w, x, G + 1, z, 1.6, [B.bushB, B.bushB]);
      acts.push({
        name: '슈투르만의 은닉처', hint: '풀섬 통나무 더미 옆, 눕힌 트랙터 바퀴 위 공구함 뚜껑이 젖혀지고 전리품이 반짝여요', hit: [TX - 3, G + 1, TZ - 1, TX + 3, TY + 6, TZ + 2],
        run: async a => {
          a.flash('stash', 8, 5);
          await a.turn('stash', [1.9, 0, 0], 0.7);
          for (let k = 0; k < 6; k++) { a.burst([TX + 0.5, TY + 6, TZ + 1], { n: 14, colors: ['#ffe08a', '#7aff8a', '#ffffff'], speed: 1.4, up: 4, life: 1.2, gravity: 3, spread: 1 }); await a.wait(0.4); }
          await a.wait(0.6);
          await a.turn('stash', [0, 0, 0], 0.6);
        },
      });
      landmarks.push({ name: '슈투르만의 은닉처', note: '풀섬 · 트랙터 바퀴 위 공구함', p: [TX + 0.5, G + 16, TZ + 0.5] });

      // ── 북쪽 통나무 옹벽: 세로 통나무 기둥 사이에 굵은 통나무를 가로로 쌓아 비탈을 받친다 ──
      const LW0 = 28, LW1 = 84, LZ = 11;
      for (let x = LW0; x <= LW1; x++) for (let z = LZ - 4; z < LZ; z++) if (MH.g(w, x, z) < G + 6) MH.setH(w, x, z, G + 6, B.needle, B.soil);
      for (let x = LW0; x <= LW1; x++) MH.setH(w, x, LZ, G, B.dirt, B.soil);
      for (const y of [G + 1.5, G + 3.5, G + 5.5]) log(w, 'x', LW0, LW1, LZ, Math.round(y), 1.1);
      for (let x = LW0 + 1; x <= LW1; x += 5) w.box(x, G + 1, LZ + 1, x, G + 7, LZ + 1, B.logB2);
      hold(LW0 - 1, LZ - 1, LW1 + 1, LZ + 2);
      // 집게 크레인 트럭(카키 KrAZ): 옹벽 앞 길 위, 뒤 받침에 통나무
      const KZ = 16;
      hold(63, KZ - 3, 84, KZ + 3);
      for (const wx of [65, 69, 79]) for (const z of [KZ - 2, KZ + 2]) { w.box(wx, G + 1, z, wx + 2, G + 3, z, B.tire); w.set(wx + 1, G + 2, z, B.hub); }
      w.box(64, G + 3, KZ - 1, 84, G + 3, KZ + 1, B.iron);
      w.box(78, G + 4, KZ - 2, 81, G + 8, KZ + 2, B.khaki); w.box(78, G + 9, KZ - 2, 81, G + 9, KZ + 2, B.khakiD);
      w.box(81, G + 6, KZ - 1, 81, G + 7, KZ + 1, B.glass); for (const z of [KZ - 2, KZ + 2]) w.box(79, G + 6, z, 80, G + 7, z, B.glass);
      w.box(82, G + 4, KZ - 2, 84, G + 5, KZ + 2, B.khaki); w.box(85, G + 4, KZ - 1, 85, G + 5, KZ + 1, B.iron);
      w.box(64, G + 4, KZ - 2, 74, G + 4, KZ + 2, B.plankD);
      for (const x of [64, 69, 74]) for (const z of [KZ - 2, KZ + 2]) w.box(x, G + 5, z, x, G + 7, z, B.iron);
      log(w, 'x', 63, 75, KZ - 1, G + 6, 1.1); log(w, 'x', 64, 75, KZ + 1, G + 6, 1.1);
      w.box(76, G + 4, KZ - 1, 76, G + 9, KZ + 1, B.khakiD); w.box(76, G + 4, KZ - 3, 76, G + 4, KZ + 3, B.iron);
      const crane = w.prop({ name: 'crane', pivot: [76.5, G + 10, KZ + 0.5] });
      crane.box(76, G + 10, KZ, 76, G + 12, KZ, B.khaki);
      crane.line(76, G + 12, KZ, 76, G + 16, KZ - 3, B.khaki, 0); crane.line(76, G + 13, KZ, 76, G + 17, KZ - 3, B.khakiD, 0);
      crane.line(76, G + 16, KZ - 3, 76, G + 17, KZ + 3, B.khaki, 0);
      crane.box(76, G + 15, KZ + 3, 76, G + 16, KZ + 3, B.iron); crane.box(75, G + 14, KZ + 2, 77, G + 14, KZ + 4, B.iron);
      log(crane, 'x', 71, 81, KZ + 3, G + 13, 0.9);
      acts.push({
        name: '집게 크레인 트럭', hint: '옹벽 앞 카키색 원목 트럭의 집게 크레인이 통나무를 물고 빙 돌아 짐칸 위로 옮겨요', hit: [70, G + 9, KZ - 4, 82, G + 18, KZ + 5],
        run: async a => {
          await a.turn('crane', [0, 1.57, 0], 2.4);
          await a.move('crane', [0, -2, 0], 0.8);
          a.burst([70.5, G + 8, KZ + 0.5], { n: 22, colors: ['#a89a78', '#e0d4b4'], speed: 3, up: 1, life: 1.2, gravity: 2, spread: 4, flat: true });
          await a.wait(1);
          await a.move('crane', [0, 0, 0], 0.8);
          await a.turn('crane', [0, 0, 0], 2.4);
        },
      });
      landmarks.push({ name: '통나무 옹벽', note: '크레인 트럭 · 슈투르만이 지나는 길', p: [71, G + 14, LZ] });

      // ── 녹색 Ural(통나무 실은 6×6): 북쪽 창고 동쪽 ──
      const UZ = 44, UX0 = 63, UX1 = 80;
      hold(UX0 - 1, UZ - 3, UX1 + 2, UZ + 3);
      const ural = w.prop({ name: 'ural', pivot: [(UX0 + UX1) / 2, G + 1, UZ + 0.5] });
      for (const wx of [UX0 + 1, UX0 + 5, UX1 - 3]) for (const z of [UZ - 2, UZ + 2]) { ural.box(wx, G + 1, z, wx + 2, G + 3, z, B.tire); ural.set(wx + 1, G + 2, z, B.uralD); }
      ural.box(UX0, G + 3, UZ - 1, UX1, G + 3, UZ + 1, B.iron);
      ural.box(UX1 - 4, G + 4, UZ - 2, UX1 - 1, G + 8, UZ + 2, B.uralG); ural.box(UX1 - 4, G + 9, UZ - 2, UX1 - 1, G + 9, UZ + 2, B.uralD);
      ural.box(UX1 - 1, G + 6, UZ - 1, UX1 - 1, G + 7, UZ + 1, B.glass); for (const z of [UZ - 2, UZ + 2]) ural.box(UX1 - 3, G + 6, z, UX1 - 2, G + 7, z, B.glass);
      ural.box(UX1, G + 4, UZ - 2, UX1 + 1, G + 5, UZ + 2, B.uralG); ural.set(UX1 + 1, G + 5, UZ - 2, B.head); ural.set(UX1 + 1, G + 5, UZ + 2, B.head);
      ural.box(UX0, G + 4, UZ - 2, UX1 - 5, G + 4, UZ + 2, B.plankD); for (const z of [UZ - 2, UZ + 2]) ural.box(UX0, G + 5, z, UX1 - 5, G + 6, z, B.uralD);
      log(ural, 'x', UX0 - 1, UX1 - 5, UZ - 1, G + 7, 1); log(ural, 'x', UX0, UX1 - 5, UZ + 1, G + 7, 1);
      ural.box(UX1 - 5, G + 9, UZ + 2, UX1 - 5, G + 11, UZ + 2, B.iron);
      lights.push({ name: 'ural', p: [UX1 + 2.5, G + 5, UZ + 0.5], c: '#fff0c8', i: 0.25, d: 18, flicker: 0.05, srcR: 3 });
      acts.push({
        name: '우랄 트럭 시동', hint: '통나무를 실은 녹색 우랄 트럭에 시동이 걸려 차체가 덜컹이고, 전조등이 켜지며 굴뚝에서 검은 연기가 뿜어져요', hit: [UX0, G + 1, UZ - 2, UX1 + 1, G + 11, UZ + 2],
        run: async a => {
          a.flash('ural', 10, 6);
          for (let k = 0; k < 10; k++) {
            a.burst([UX1 - 4.5, G + 12, UZ + 2.5], { n: 12, colors: ['#4a4a48', '#2e2e2e', '#7a7a76'], speed: 1, up: 3.5, life: 2, gravity: -0.6, spread: 0.6 });
            await a.move('ural', [0, 0.3, 0], 0.09); await a.move('ural', [0, 0, 0], 0.09);
            await a.wait(0.25);
          }
          // 숙소 오두막 쪽 길로 동쪽 큰길에 나가 남쪽 지도 밖까지
          await a.drive('ural', [[16.5, 0, 0], [28.5, 0, -1.5], [42.5, 0, -2], [50.5, 0, -2], [55.5, 0, 1], [57.5, 0, 7.5], [57.5, 0, 21.5], [53.5, 0, 39.5], [49.5, 0, 55.5], [44.5, 0, 75.5], [42.5, 0, 98.5], [41.5, 0, 127.5]], 9, { fwd: '+x', back: 1.0 });
        },
      });

      // ── 통나무 더미(동쪽 마당, 가장 큼): 맨 위 통나무가 굴러 내려오는 부품 ──
      const P1 = pile('x', 97, 117, 62, 3, 2.2, 4.4, G + 1, (k) => k === 2);
      hold(95, 56, 119, 69);
      const tp = P1.find(q => q[0] === 2).slice(); tp[3] += 1;
      const roll = w.prop({ name: 'roll', pivot: [107.5, tp[3] + 0.5, tp[2] + 0.5] });
      log(roll, 'x', 98, 116, tp[2], tp[3], 2.2);
      acts.push({
        name: '통나무 더미 굴러내림', hint: '쌓아 둔 회색 통나무 더미 맨 위 통나무가 쿵쿵 굴러 남쪽 자갈 마당으로 떨어져요', hit: [97, tp[3] - 2, tp[2] - 2, 117, tp[3] + 2, tp[2] + 2],
        run: async a => {
          const dy = G + 3 - tp[3];
          await a.tween('roll', { off: [0, -2, 5], rot: [2.2, 0, 0] }, 0.6, t => t * t);
          await a.tween('roll', { off: [0, dy, 10], rot: [4.4, 0, 0] }, 0.5, t => t);
          a.burst([107.5, G + 1, tp[2] + 12], { n: 50, colors: ['#8a7a5a', '#aca290', '#6a5a40'], speed: 7, up: 1.5, life: 1.4, gravity: 3, spread: 10, flat: true });
          await a.tween('roll', { off: [0, dy, 14], rot: [6.6, 0, 0] }, 0.8);
          await a.wait(1.6);
          await a.respawn('roll', 1.0);
        },
      });
      // 판재 더미·통나무 더미 여러 곳(지도의 비스듬한 더미 자리)
      boards(64, 66, 70, 70, 3); hold(63, 65, 71, 71);
      apron(14, 16, 48, 49);                                                                  // 북서 마당(맨땅)과 더미
      pile('x', 20, 40, 24, 3, 1.8, 3.6, G + 1); hold(18, 19, 42, 29);
      boards(22, 34, 34, 38, 3); hold(21, 33, 35, 39);
      boards(38, 33, 44, 44, 2); hold(37, 32, 45, 45);
      pile('x', 16, 30, 44, 2, 1.6, 3.2, G + 1); hold(14, 41, 32, 48);
      boards(42, 46, 48, 49, 2); hold(41, 45, 49, 50);
      boards(88, 94, 96, 97, 2); hold(87, 93, 97, 98);
      boards(84, 120, 96, 124, 3); hold(83, 119, 97, 125);
      boards(88, 130, 100, 134, 2); hold(87, 129, 101, 135);
      pile('z', 116, 132, 98, 2, 1.8, 3.6, G + 1); hold(93, 114, 103, 134);
      pile('x', 20, 34, 126, 2, 1.8, 3.6, G + 1); hold(18, 121, 36, 131);
      for (const [x0, x1, z] of [[102, 110, 78], [104, 112, 80], [40, 48, 86]]) log(w, 'x', x0, x1, z, G + 1, 0.8);
      // 드럼통·팔레트·상자
      for (const [x, z, b] of [[42, 70, B.barrelR], [43, 71, B.barrelO], [9, 72, B.barrelR], [61, 54, B.barrelO], [62, 54, B.barrelR], [92, 104, B.barrelR], [65, 92, B.barrelO]]) if (!w.get(x, G + 1, z)) w.box(x, G + 1, z, x, G + 3, z, b);
      for (const [x, z] of [[46, 77], [104, 86], [24, 120]]) { w.box(x, G + 1, z, x + 3, G + 1, z + 3, B.beam); w.box(x, G + 2, z, x + 3, G + 2, z + 3, B.plankN); }
      w.box(36, G + 1, 71, 38, G + 2, 72, B.crateG); w.box(36, G + 3, 71, 37, G + 3, 72, B.crateG);

      // ── 숙소 오두막 3동(북동, 나무 트레일러) ──
      for (const [k, cz] of [[0, 18], [1, 26], [2, 34]]) {
        const x0 = 103 + k, x1 = x0 + 9, z0 = cz, z1 = cz + 3;
        hold(x0 - 1, z0 - 1, x1 + 1, z1 + 2);
        MH.flatten(w, x0 - 1, z0 - 1, x1 + 1, z1 + 2, G, B.gravelD, B.soil);
        for (const x of [x0, x1]) for (const z of [z0, z1]) w.set(x, G + 1, z, B.conc);
        w.box(x0, G + 2, z0, x1, G + 5, z1, B.cabin); w.box(x0 - 1, G + 6, z0 - 1, x1 + 1, G + 6, z1 + 1, B.plankD);
        w.box(x0 + 2, G + 2, z1, x0 + 3, G + 4, z1, B.beam); w.box(x0 + 5, G + 3, z1, x0 + 6, G + 4, z1, k === 1 ? B.win : B.glass); w.box(x1, G + 3, z0 + 1, x1, G + 4, z0 + 2, B.glass);
        w.box(x0 + 2, G + 1, z1 + 1, x0 + 3, G + 1, z1 + 1, B.plankD);
      }
      lights.push({ name: 'cabin', p: [109.5, G + 4, 30.5], c: '#ffd890', i: 0.25, d: 12, flicker: 0.1, srcR: 3 });
      landmarks.push({ name: '숙소 오두막', note: '제재소 일꾼 숙소 · 보급 계획 퀘스트', p: [109, G + 12, 27] });

      // ── 나무 전신주(큰길 따라) ──
      [[83, 6], [84, 30], [91, 56], [99, 82], [106, 106]].map(([x, z]) => { const y = MH.g(w, x, z) + 1; w.box(x, y, z, x, y + 10, z, B.pole); w.box(x - 1, y + 9, z, x + 1, y + 9, z, B.pole); hold(x - 1, z - 1, x + 1, z + 1); });

      // ── 저격 섬광: 북서 비탈 위 소나무 사이에서 조준경이 번쩍 ──
      const SN = [70, G + 8, 8]; hold(66, 3, 75, 10);
      w.box(SN[0] - 1, MH.g(w, SN[0], SN[2]) + 1, SN[2] - 1, SN[0] + 1, MH.g(w, SN[0], SN[2]) + 1, SN[2] + 1, B.bushB);
      w.set(SN[0], SN[1], SN[2] + 1, B.head); w.set(SN[0], SN[1], SN[2], B.iron);
      lights.push({ name: 'glint', p: [SN[0] + 0.5, SN[1] + 0.5, SN[2] + 1.5], c: '#fff4d0', i: 0.2, d: 12, flicker: 0, srcR: 3 });
      const nests = [[14, 30], [24, 8], [40, 4], [10, 86], [100, 4], [70, 3]].map(([x, z]) => [x + 0.5, Math.max(G + 16, MH.g(w, x, z) + 16), z + 0.5]);
      acts.push({
        name: '저격수의 섬광', hint: '북쪽 비탈 소나무 사이에서 조준경이 번쩍이고 총성이 울리자, 숲의 새떼가 한꺼번에 날아올라요', hit: [SN[0] - 3, SN[1] - 3, SN[2] - 2, SN[0] + 3, SN[1] + 3, SN[2] + 3],
        run: async a => {
          for (let k = 0; k < 3; k++) { a.flash('glint', 14, 0.25); a.burst([SN[0] + 0.5, SN[1] + 0.5, SN[2] + 1.5], { n: 10, colors: ['#ffffff', '#fff4c0'], speed: 1.5, up: 0, life: 0.3, gravity: 0, spread: 0.2 }); await a.wait(0.5); }
          a.burst([SN[0] + 0.5, SN[1] + 0.5, SN[2] + 2], { n: 24, colors: ['#d8d4cc', '#b0aca4'], speed: 2, up: 1, life: 1.6, gravity: -0.3, spread: 0.6 });
          a.wind(2, 3);
          for (const p of nests) { a.burst(p, { n: 20, colors: ['#2a2a2c', '#3e3a36', '#1e1e20'], speed: 7, up: 5, life: 2.6, gravity: -0.8, spread: 3 }); await a.wait(0.25); }
          await a.wait(1);
        },
      });

      // ── 숲: 북·서쪽 비탈은 빽빽한 큰 소나무, 동쪽 둔덕 너머는 성기게, 남쪽은 몇 그루만 ──
      for (const [x, z, r] of [[121, 70, 2.4], [123, 92, 2], [119, 50, 1.8], [126, 116, 2.2], [6, 140, 2]]) { MH.rock(w, x, MH.g(w, x, z), z, r, B.rock, B.moss); hold(x - 3, z - 3, x + 3, z + 3); }
      const blocked = (x, z, r) => keep.some(([x0, z0, x1, z1]) => x > x0 - r && x < x1 + r && z > z0 - r && z < z1 + r);
      const LD = [B.pineD0, B.pineD1, B.pineD2], LN = [B.pine0, B.pine1, B.pine2], LBi = [B.birchL, B.birchL2, B.birchL2];
      for (let gz = 0; gz < D; gz += 5) for (let gx = 0; gx < W; gx += 5) {
        const x = gx + w.ri(0, 4), z = gz + w.ri(0, 4);
        if (x < 1 || z < 1 || x > W - 2 || z > D - 2 || rd(x, z) < 4.5 || blocked(x, z, 3)) continue;
        const rim = z < 12 || x < 9, eastF = x > 126, south = z > 128;
        let p = rim ? 0.9 : eastF ? 0.4 : south ? 0.05 : (x > 114 ? 0.12 : 0.02);
        if (!w.chance(p)) continue;
        const y = MH.g(w, x, z) + 1;
        if (!rim && w.chance(0.15)) { MH.tree(w, x, y, z, { kind: 'oak', h: w.ri(7, 9), bark: B.birch, leaves: LBi, r: 2.4, trunkR: 0.6, spread: 2.3, branches: 3 }); continue; }
        MH.tree(w, x, y, z, { kind: 'pine', h: rim ? w.ri(17, 24) : w.ri(11, 16), r: rim ? w.r(3.4, 4.4) : w.r(2.6, 3.4), bark: B.bark, leaves: (rim || w.chance(0.4)) ? LD : LN });
      }
      MH.scatter(w, 1400, (x, g, z, b) => {
        if (blocked(x, z, 1) || rd(x, z) < 3) return;
        if (b === B.needle || b === B.moss) { if (hash3(x, 3, z) > 0.75) MH.bush(w, x, g + 1, z, 1.3, [B.bushB, B.bushB]); else w.set(x, g + 1, z, B.fern); }
        else if (b === B.grass || b === B.grassY) { if (hash3(x, 9, z) > 0.65) w.set(x, g + 1, z, B.fern); }
      });
      return { lights, landmarks, acts };
    },
  });
})();
