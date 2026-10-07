// 물레방아 마을 HD — v-millbrook.js를 2배 해상도(1칸 ≈ 25cm)로 다시 지은 시범 지도 (336칸)
// 단순 확대가 아니라 늘어난 해상도로 세부를 그린다: 낱돌 기초(줄눈이 파인), 두께 있는 들보, 창틀·창살·창턱·덧문·경첩·꽃상자,
// 판자문과 손잡이, 겹겹의 이엉·기와와 처마·용마루·물받이·홈통, 벽돌 굴뚝과 갓돌, 바퀴살·물받이판·테 볼트가 있는 물레방아,
// 격자 돛과 회랑 난간이 있는 풍차, 가지와 잎뭉치가 있는 나무, 낱낱의 꽃·라벤더 포기·갈대, 무늬 있는 돌길, 테가 있는 통 등.
// 플레이어 크기는 엔진에 고정(3.4칸)이라 이 지도에서는 사람이 절반 크기로 보인다(시범용, playerScale은 엔진이 아직 읽지 않음).
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 336, D = 336, Hh = 224;
  const K0 = 168 / 128;                       // 원본 지도 좌표계의 비율
  MAPS.push({
    id: 'millbrook-hd', cat: 'village', name: '물레방아 마을 (고해상도 시범)', en: 'Millbrook · HD pilot', color: '#8fc46a', seed: 101, base: 44, time: 'day', size: [W, D, Hh],
    playerScale: 2,
    desc: '물레방아 마을을 두 배 해상도로 다시 지은 시범 지도. 낱돌 기초, 창살과 덧문, 겹겹의 이엉, 바퀴살이 보이는 물레방아까지 한 칸이 손바닥만 하다.',
    info: { title: '마을 정보', en: 'VILLAGE · HD', rows: [['해상도', '1칸 ≈ 25cm (기존의 2배)'], ['특산물', '고운 밀가루 · 사과주 · 들꽃 꿀'], ['소문', '강 상류에서 물의 정령을 봤다는 이야기']] },
    sky: ['#d6eef8', '#5c9ad6', '#fff4d2'], stars: false,
    hemi: ['#ffffff', '#5a6a40', 0.54], sun: ['#fff2d8', 0.74, [0.5, 1, 0.4]],
    liquid: ['#2a6a9a', '#4a9ad0', '#e0f6ff'], liqSpeed: 1,
    fog: { box: [168, 168, 168, 172], start: 0.8, floor: 24, depth: 20 },
    camY: 8, zoom: 1.05,
    particles: [
      { n: 200, colors: ['#ffffff', '#fff4a0'], mode: 'drift', speed: 0.6, y0: 52, y1: 128, glow: false },
      { n: 60, colors: ['#ffd0e8', '#fff080'], mode: 'wisp', speed: 2, size: 2, y0: 52, glow: false },
    ],
    blocks: {
      grass: { c: '#6b4a30', top: '#6fae4a', v: 0.08 }, grass2: { c: '#6b4a30', top: '#86bc52', v: 0.08 }, grass3: { c: '#6b4a30', top: '#5a9a40', v: 0.08 },
      dirt: { c: '#6b4a30', v: 0.08 }, rock: { c: '#7a7a80', v: 0.06, pat: 'stone' }, rockDk: { c: '#5a5a62', v: 0.06, pat: 'stone' }, rockMoss: { c: '#7a7a80', top: '#6a8a48', v: 0.08 },
      path: { c: '#6b4a30', top: '#c8b48a', v: 0.1 }, bank: { c: '#6a5038', top: '#a8946c', v: 0.1 }, gravel: { c: '#6a6660', top: '#8a8478', v: 0.14 },
      soil: { c: '#5a3a24', top: '#6a4428', v: 0.08 }, soilDk: { c: '#4a2e1c', top: '#553420', v: 0.08 },
      cobble: { c: '#8a8680', top: '#a8a49a', v: 0.06 }, cobble2: { c: '#7e7a72', top: '#96928a', v: 0.06 }, cobble3: { c: '#948e84', top: '#b4ae9e', v: 0.06 }, cobbleJ: { c: '#6a665e', top: '#76726a', v: 0.04 },
      plaster: { c: '#efe4c8', v: 0.03 }, plaster2: { c: '#e8d8c0', v: 0.03 }, frame: { c: '#5a3a24', v: 0.05 }, frameDk: { c: '#46301e', v: 0.04 },
      mullion: { c: '#ece4d0', v: 0.02 }, sill: { c: '#b0aaa0', v: 0.04 }, mortar: { c: '#a49c8c', v: 0.04 },
      st1: { c: '#8e8c88', v: 0.05 }, st2: { c: '#7c7a76', v: 0.05 }, st3: { c: '#9c988e', v: 0.05 }, st4: { c: '#84887c', v: 0.05 }, stoneDk: { c: '#6a6a6a', v: 0.06, pat: 'stone' },
      thatch: { c: '#c8a050', v: 0.07 }, thatch2: { c: '#b8903e', v: 0.07 }, thatch3: { c: '#d6b264', v: 0.07 }, thatchDk: { c: '#9a7a3a', v: 0.06 },
      tile: { c: '#b04a3a', v: 0.05 }, tile2: { c: '#94382c', v: 0.04 }, tile3: { c: '#bc5846', v: 0.05 }, tileDk: { c: '#7a3028', v: 0.05 },
      door: { c: '#5a3822', v: 0.03, pat: 'plank' }, doorDk: { c: '#3e2616', v: 0.03 }, brass: { c: '#e0b850', v: 0.02 },
      shutter: { c: '#3a6a4a', v: 0.02 }, shutterDk: { c: '#2c563a', v: 0.02 }, shutter2: { c: '#8a3a2a', v: 0.02 }, shutter2Dk: { c: '#702c1e', v: 0.02 },
      hinge: { c: '#2e2e34', v: 0.02 }, iron: { c: '#4a4a52', v: 0.03 }, ironDk: { c: '#33333a', v: 0.03 }, gutter: { c: '#6a6e72', v: 0.03 },
      brick: { c: '#9a4a3a', v: 0.05, pat: 'brick' }, brick2: { c: '#84402f', v: 0.05, pat: 'brick' }, pot: { c: '#b8643a', v: 0.04 },
      win: { c: '#ffd890', night: true, day: '#9ad4f0' }, lamp: { c: '#ffe6a8', night: true, day: '#e8e0c0' },
      wheat: { c: '#d0ae44', v: 0.1 }, wheatTop: { c: '#e8cc6a', v: 0.08 }, cabbage: { c: '#5aa040', v: 0.08 }, cabbage2: { c: '#9ad070', v: 0.06 },
      lavender: { c: '#8a6ac8', v: 0.08 }, lavender2: { c: '#a88ae0', v: 0.08 }, lavenderStem: { c: '#6a8a5a', v: 0.08 },
      hay: { c: '#dcb456', v: 0.08 }, hay2: { c: '#c8a044', v: 0.08 },
      plank: { c: '#9a6a40', v: 0.06, pat: 'plank' }, wood: { c: '#6a4428', v: 0.05 }, bark: { c: '#5a3a24', v: 0.06 }, barkDk: { c: '#463020', v: 0.05 },
      birch: { c: '#e8e4d8', v: 0.04 }, birchDk: { c: '#3a3430', v: 0.04 },
      leaf: { c: '#4a8a3a', v: 0.1 }, leaf2: { c: '#6aaa48', v: 0.1 }, leafDk: { c: '#3a6a30', v: 0.08 }, leafLt: { c: '#8ac25a', v: 0.08 },
      apple: { c: '#d8403a', v: 0.05 }, appleG: { c: '#b8c84a', v: 0.05 },
      hedge: { c: '#3e7a36', v: 0.1 }, hedge2: { c: '#4e8c40', v: 0.1 }, fern: { c: '#5a9a40', v: 0.12 },
      flower: { c: '#e86a8a', v: 0.05 }, flower2: { c: '#f0e060', v: 0.05 }, flower3: { c: '#ffffff', v: 0.03 }, flower4: { c: '#f08a4a', v: 0.05 }, flower5: { c: '#7a8ae8', v: 0.05 },
      flowerStem: { c: '#4a8a34', v: 0.08 }, flowerLf: { c: '#5e9e44', v: 0.08 },
      sail: { c: '#f0ead8', v: 0.03 }, sail2: { c: '#e2dac4', v: 0.03 }, rope: { c: '#b8a080', v: 0.04 },
      barnR: { c: '#a83a2a', v: 0.04, pat: 'plank' }, barnR2: { c: '#8e2e20', v: 0.03 }, trim: { c: '#f0ead8', v: 0.02 },
      sign: { c: '#d8a83a', v: 0.03 }, foam2: { c: '#a8d8f0', v: 0.06 },
      reed: { c: '#5a8a3a', v: 0.12 }, reed2: { c: '#74a04a', v: 0.1 }, reedTop: { c: '#7a5a32', v: 0.06 }, picket: { c: '#ece4d0', v: 0.03 },
      awnR: { c: '#c84a3a', v: 0.02 }, awnW: { c: '#f4eee0', v: 0.02 }, awnG: { c: '#4a8a5a', v: 0.02 },
      cask: { c: '#8a5a30', v: 0.05 }, cask2: { c: '#7a4e28', v: 0.05 }, caskTop: { c: '#6a4224', v: 0.04 },
      crate: { c: '#b08050', v: 0.05, pat: 'plank' }, crateEdge: { c: '#7a5232', v: 0.04 },
      hive: { c: '#d8b060', v: 0.05, pat: 'log' }, hiveDk: { c: '#b08a40', v: 0.05 },
      hole: { c: '#2a2018', v: 0.02 }, sack: { c: '#e8dcc0', v: 0.04 }, sack2: { c: '#d8cab0', v: 0.04 }, millstone: { c: '#a09a90', v: 0.06 },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base;
      const UPL = base;
      const rX0 = z => 87 + Math.sin(z * 0.038) * 9;      // 원본 강 중심(원본 좌표)
      const rX = z => 2 * rX0(z / 2);
      const g = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const lights = [], acts = [], landmarks = [], smokes = [];
      const grassAt = (x, z) => { const f = n.fbm(x * 0.045 + 7, z * 0.045, 2); return f > 0.6 ? B.grass2 : f < 0.38 ? B.grass3 : B.grass; };

      // ───────── 지형: 원본 높이 함수를 두 배로 ─────────
      MH.terrain(w, {
        floor: 8,
        height: (x, z) => {
          const ox = x / 2, oz = z / 2;
          const d = Math.abs(ox - rX0(oz)) / K0;
          let hh = Math.pow(d, 1.1) * 0.1 + Math.max(0, 18 - MH.dist(ox, oz, 32, 74) * 0.5 / K0) + Math.max(0, 10 - MH.dist(ox, oz, 152, 32) * 0.4 / K0);
          hh += 2.5 * Math.max(0, Math.min(1, (94 - oz) / 31.5));
          return base + 2 * (hh + n.fbm(ox * 0.04 / K0, oz * 0.04 / K0) * 3);
        },
        surface: (x, z, y, s) => s >= 3 ? B.rock : grassAt(x, z),
        under: (x, z, y, dep, s) => dep < 5 && s < 3 ? B.dirt : B.rock,
      });

      // ───────── 공통 도구(2배 해상도용) ─────────
      // 낱돌 쌓기: 2칸 높이 돌 + 1칸 줄눈, 길이 5칸 돌을 줄마다 엇갈려 쌓는다. 줄눈이면 0
      const STONES = [B.st1, B.st2, B.st3, B.st1, B.st4, B.st2];
      const stoneAt = (u, y, salt) => {
        const c = Math.floor(y / 3), r = ((y % 3) + 3) % 3, uu = u + (c & 1) * 3 + ((hash3(c, salt, 3) * 2) | 0);
        if (r === 2 || ((uu % 6) + 6) % 6 === 5) return 0;
        return STONES[(hash3(Math.floor(uu / 6), c, salt) * 6) | 0];
      };
      // 돌길 무늬: 4×3칸 돌, 1칸 줄눈, 줄마다 엇갈림
      const paveAt = (x, z) => {
        const row = Math.floor(z / 3), off = (row & 1) * 2;
        if (z % 3 === 2 || (x + off) % 4 === 3) return B.cobbleJ;
        return [B.cobble, B.cobble2, B.cobble3][(hash3(Math.floor((x + off) / 4), row, 7) * 3) | 0];
      };
      // 부품용: 월드에 이미 블록이 있는 칸은 건너뛴다(부품이 월드에 박히지 않게)
      const guard = p => ({ set: (x, y, z, b) => { x = Math.round(x); y = Math.round(y); z = Math.round(z); if (!w.get(x, y, z)) p.set(x, y, z, b); }, get: (x, y, z) => p.get(x, y, z) });
      const cylT = (T, cx, cz, y0, y1, r, b) => { const R = Math.ceil(r); for (let y = y0; y <= y1; y++) for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) if (dx * dx + dz * dz <= r * r) T.set(cx + dx, y, cz + dz, b); };
      // 잎뭉치: 위는 밝고 아래는 어둡게, 바깥은 성기게, 겉에 열매
      const clump = (T, cx, cy, cz, r, L, fruit) => {
        cx = Math.round(cx); cy = Math.round(cy); cz = Math.round(cz);
        const ry = r * 0.72, X = Math.ceil(r), Y = Math.ceil(ry);
        for (let dy = -Y; dy <= Y; dy++) for (let dz = -X; dz <= X; dz++) for (let dx = -X; dx <= X; dx++) {
          const d = (dx * dx + dz * dz) / (r * r) + dy * dy / (ry * ry);
          if (d > 1) continue;
          const x = cx + dx, y = cy + dy, z = cz + dz, hh = hash3(x, y, z);
          if (d > 0.6 && hh < 0.3) continue;
          let b = dy > ry * 0.3 ? L[0] : dy < -ry * 0.35 ? L[2] : (hh > 0.8 ? L[0] : L[1]);
          if (hh > 0.94 && d > 0.45) b = B.leafLt;
          if (fruit && d > 0.5 && hh < 0.04) b = fruit;
          T.set(x, y, z, b);
        }
      };
      // 나무: 밑동이 넓어지는 줄기와 뿌리, 굵기가 줄어드는 가지, 가지 끝마다 잎뭉치 서너 개
      const tree = (x, y, z, o, Lt) => {
        Lt = Lt || w;
        const h = o.h, R0 = o.trunkR || 1.8, bark = o.bark || B.bark, dk = o.barkDk || B.barkDk, L = o.leaves || [B.leaf2, B.leaf, B.leafDk];
        if (o.kind === 'pine') {
          for (let i = 0; i < h + 2; i++) cylT(w, x, z, y + i, y + i, Math.max(0.5, R0 * (1 - i / h)), i % 5 ? bark : dk);
          const R = o.r || 8;
          for (let ty = y + 6; ty < y + h; ty += 3) {
            const rr = (1 - (ty - y) / (h + 3)) * R + 1.3, RR = Math.ceil(rr + 1);
            for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
              const d = Math.hypot(dx, dz), hh = hash3(x + dx, ty, z + dz);
              if (d <= rr && !(d > rr - 1.2 && hh < 0.35)) Lt.set(x + dx, ty, z + dz, d < rr * 0.5 ? L[2] : L[1]);
              if (d > rr - 1.6 && d <= rr + 0.7 && hh > 0.25) Lt.set(x + dx, ty - 1, z + dz, L[2]);
              if (d <= rr - 2 && hh > 0.2) Lt.set(x + dx, ty + 1, z + dz, d < rr * 0.4 ? L[1] : L[0]);
            }
          }
          for (let k = 0; k < 4; k++) Lt.set(x, y + h + k, z, L[0]);
          return { top: y + h + 3 };
        }
        for (let i = 0; i < h; i++) {
          const t = i / h, rr = Math.max(0.6, R0 * (1 - t * 0.55) + (i < 3 ? (3 - i) * 0.55 : 0)), RR = Math.ceil(rr);
          for (let dz = -RR; dz <= RR; dz++) for (let dx = -RR; dx <= RR; dx++) {
            if (dx * dx + dz * dz > rr * rr) continue;
            const streak = hash3(Math.floor((Math.atan2(dz, dx) + 4) * 2.5), (i / 4) | 0, x + z) > 0.62;
            w.set(x + dx, y + i, z + dz, (o.birch ? (streak && i % 3 === 0) : streak) ? dk : bark);
          }
        }
        for (let k = 0; k < 5; k++) {   // 뿌리
          const a = k * 1.2566 + hash3(x, k, z) * 0.8, l = R0 + 2 + hash3(z, k, x) * 2.5;
          w.line(x, y + 2, z, x + Math.cos(a) * l, y - 1, z + Math.sin(a) * l, dk, t => t < 0.5 ? 1 : 0.6);
        }
        const nB = o.branches || 5, r = o.r || 7, ends = [[x, y + h + 1, z, 1.15]];
        for (let i = 0; i < nB; i++) {
          const a = i / nB * Math.PI * 2 + w.r(-0.4, 0.4), sy = y + Math.floor(h * w.r(0.5, 0.82));
          const l = r * w.r(0.75, 1.05), ex = x + Math.cos(a) * l, ez = z + Math.sin(a) * l, ey = sy + l * w.r(0.45, 0.7);
          w.line(x, sy, z, ex, ey, ez, bark, t => t < 0.45 ? 1 : 0.6);
          const a2 = a + w.r(0.5, 1) * (i % 2 ? 1 : -1), mx = x + Math.cos(a) * l * 0.55, mz = z + Math.sin(a) * l * 0.55, my = sy + l * 0.3;
          w.line(mx, my, mz, mx + Math.cos(a2) * 3.5, my + 2.5, mz + Math.sin(a2) * 3.5, bark);
          ends.push([ex, ey, ez, w.r(0.8, 0.95)]);
        }
        ends.forEach(([ex, ey, ez, k], i) => {
          const rc = r * 0.62 * k;
          clump(Lt, ex, ey + 1, ez, rc, L, o.fruit);
          for (let q = 0; q < 3; q++) {
            const a = hash3(i, q, x + z) * 6.28, dd = rc * 0.75;
            clump(Lt, ex + Math.cos(a) * dd, ey + 1 + (q - 1) * rc * 0.3, ez + Math.sin(a) * dd, rc * 0.62, L, o.fruit);
          }
        });
        return { top: y + h + r * 0.8, ends };
      };
      // 작은 물건들
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
      const barrel = (T, x, y, z, ht) => {   // 가운데 (x,z), 볼록한 통, 쇠테 둘, 뚜껑
        ht = ht || 7;
        for (let r = 0; r < ht; r++) {
          const mid = r >= 2 && r <= ht - 3, rr = mid ? 2.6 : 2.2;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) {
            const d2 = dx * dx + dz * dz;
            if (d2 > rr * rr) continue;
            const outer = d2 > (rr - 1) * (rr - 1);
            let b;
            if (r === ht - 1) b = outer ? B.cask : B.caskTop;
            else if ((r === 1 || r === ht - 2) && outer) b = B.iron;
            else b = (Math.floor((Math.atan2(dz, dx) + Math.PI) / (Math.PI / 5)) & 1) ? B.cask : B.cask2;
            T.set(x + dx, y + r, z + dz, b);
          }
        }
      };
      const crate = (T, x, y, z, s) => {
        s = s || 4;
        for (let dy = 0; dy < s; dy++) for (let dz = 0; dz < s; dz++) for (let dx = 0; dx < s; dx++) {
          const e = (dx === 0 || dx === s - 1) + (dy === 0 || dy === s - 1) + (dz === 0 || dz === s - 1);
          T.set(x + dx, y + dy, z + dz, e >= 2 ? B.crateEdge : B.crate);
        }
      };
      const hayBale = (x, y, z, alongX) => {
        for (let a = 0; a < 6; a++) for (let b2 = 0; b2 < 4; b2++) for (let h = 0; h < 3; h++) {
          const [px, pz] = alongX ? [x + a, z + b2] : [x + b2, z + a];
          w.set(px, y + h, pz, (a === 1 || a === 4) && (h === 2 || b2 === 0 || b2 === 3) ? B.rope : (hash3(px, y + h, pz) > 0.6 ? B.hay2 : B.hay));
        }
      };
      // 가로등: 돌 받침, 쇠기둥과 고리, 유리 등롱(모서리 쇠살), 갓과 꼭지
      const lampPost = (x, z, h) => {
        h = h || 10;
        const y = g(x, z) + 1;
        w.box(x - 1, y, z - 1, x + 1, y + 1, z + 1, B.sill); w.box(x - 1, y - 2, z - 1, x + 1, y - 1, z + 1, B.sill);
        w.box(x, y + 2, z, x, y + h, z, B.iron);
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { w.set(x + dx, y + 2, z + dz, B.ironDk); w.set(x + dx, y + h - 1, z + dz, B.ironDk); }
        const ly = y + h + 1;
        w.box(x - 1, ly, z - 1, x + 1, ly, z + 1, B.ironDk);
        for (let dy = 1; dy <= 3; dy++) for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) w.set(x + dx, ly + dy, z + dz, (dx && dz) ? B.ironDk : B.lamp);
        w.box(x - 2, ly + 4, z - 2, x + 2, ly + 4, z + 2, B.iron); w.box(x - 1, ly + 5, z - 1, x + 1, ly + 5, z + 1, B.iron); w.set(x, ly + 6, z, B.ironDk); w.set(x, ly + 7, z, B.brass);
        return [x + 0.5, ly + 2.5, z + 0.5];
      };
      const bench = (x, z, alongX, back) => {   // 앉는 판 7칸, 다리, 등받이 살
        const y = g(x, z) + 1;
        for (let a = 0; a < 7; a++) for (let b2 = 0; b2 < 3; b2++) {
          const [px, pz] = alongX ? [x + a, z + b2] : [x + b2, z + a];
          w.set(px, y + 1, pz, B.plank);
          if ((a === 0 || a === 6) && b2 !== 1) w.set(px, y, pz, B.wood);
          if (b2 === (back > 0 ? 2 : 0)) { if (a === 0 || a === 6 || a === 3) w.box(px, y + 2, pz, px, y + 4, pz, B.wood); else { w.set(px, y + 3, pz, B.plank); w.set(px, y + 4, pz, B.wood); } }
        }
      };
      const flowerAt = (T, x, y, z, head, tall) => {   // 줄기 + 꽃송이 (+잎)
        T.set(x, y, z, B.flowerStem);
        if (tall) { T.set(x, y + 1, z, B.flowerStem); T.set(x, y + 2, z, head); }
        else T.set(x, y + 1, z, head);
      };
      const FLW = [B.flower, B.flower2, B.flower3, B.flower4, B.flower5];

      // ───────── 집 ─────────
      const SIDES = (x0, z0, x1, z1) => ({
        s: { k: 's', u0: x0, u1: x1, at: (u, d) => [u, z1 + d] },
        n: { k: 'n', u0: x0, u1: x1, at: (u, d) => [u, z0 - d] },
        e: { k: 'e', u0: z0, u1: z1, at: (u, d) => [x1 + d, u] },
        w: { k: 'w', u0: z0, u1: z1, at: (u, d) => [x0 - d, u] },
      });
      const put = (sd, u, y, d, b) => { const p = sd.at(u, d); w.set(p[0], y, p[1], b); };
      const getS = (sd, u, y, d) => { const p = sd.at(u, d); return w.get(p[0], y, p[1]); };
      // 창: 5폭 유리, 가운데 창살과 가로살, 바깥 창틀, 내민 창턱, 양옆 덧문(살결·경첩), 아래 꽃상자
      const windowAt = (sd, wu, wy, wh, o) => {
        const mr = Math.floor(wh * 0.6);
        for (let r = 0; r < wh; r++) for (let c = 0; c < 5; c++) { put(sd, wu + c, wy + r, 0, (c === 2 || r === mr) ? B.mullion : B.win); put(sd, wu + c, wy + r, 1, 0); }
        for (let r = -1; r <= wh; r++) { put(sd, wu - 1, wy + r, 1, B.frame); put(sd, wu + 5, wy + r, 1, B.frame); }
        for (let c = -1; c <= 5; c++) put(sd, wu + c, wy + wh, 1, B.frame);
        for (let c = -2; c <= 6; c++) { put(sd, wu + c, wy - 1, 1, B.sill); if (c >= -1 && c <= 5) put(sd, wu + c, wy - 1, 2, B.sill); }
        if (o.shutter && wu - 3 > sd.u0 + 1 && wu + 7 < sd.u1 - 1) {
          for (const c0 of [-3, 6]) for (let c = 0; c < 2; c++) for (let r = 0; r < wh; r++) {
            put(sd, wu + c0 + c, wy + r, 1, r % 2 ? o.shutter : o.shutterDk);
            if (r === 1 || r === wh - 2) put(sd, wu + c0 + c, wy + r, 2, B.hinge);
          }
        }
        if (o.box) {
          for (let c = -1; c <= 5; c++) { put(sd, wu + c, wy - 2, 2, B.plank); put(sd, wu + c, wy - 2, 3, B.plank); }
          for (let c = -1; c <= 5; c++) {
            const hh = hash3(wu + c, wy, sd.k.charCodeAt(0));
            put(sd, wu + c, wy - 1, 3, hh > 0.35 ? B.flowerLf : FLW[(hh * 40 | 0) % 5]);
            if ((c & 1) === 0 || hh > 0.8) put(sd, wu + c, wy, 3, FLW[((wu + c) * 7 + (hh * 3 | 0)) % (o.box === 2 ? 3 : 5)]);
          }
        }
      };
      // 문: 5폭 9높이, 테두리 살 + 움푹한 판, 놋 손잡이, 문틀, 돌계단, 벽 등롱, 화분
      const doorAt = (sd, cu, yb, o) => {
        const u0 = cu - 2;
        for (let r = 0; r < 9; r++) for (let c = 0; c < 5; c++) {
          const stile = c === 0 || c === 4 || r === 0 || r === 4 || r === 8;
          put(sd, u0 + c, yb + r, 1, 0);
          if (stile) put(sd, u0 + c, yb + r, 0, B.doorDk);
          else { put(sd, u0 + c, yb + r, 0, 0); put(sd, u0 + c, yb + r, -1, B.door); }
        }
        put(sd, u0 + 3, yb + 4, 1, B.brass);
        for (let r = 0; r <= 9; r++) { put(sd, u0 - 1, yb + r, 1, B.frame); put(sd, u0 + 5, yb + r, 1, B.frame); }
        for (let c = -2; c <= 6; c++) put(sd, u0 + c, yb + 9, 1, B.frameDk);
        put(sd, u0 + 2, yb + 10, 1, B.sill);
        let lamp = null;
        if (o.steps) {
          for (let c = -2; c <= 6; c++) for (const [d, top] of [[2, yb - 2], [3, yb - 3]]) {
            const p = sd.at(u0 + c, d), gg = MH.g(w, p[0], p[1]);
            for (let y = Math.min(gg, top); y <= top; y++) w.set(p[0], y, p[1], y === top ? B.sill : B.st2);
            for (let y = top + 1; y <= yb + 9; y++) if (!(d === 2 && y <= yb - 1)) w.set(p[0], y, p[1], 0);
          }
        }
        if (o.lantern) {
          const lc = u0 + 7;
          put(sd, lc, yb + 8, 1, B.iron); put(sd, lc, yb + 8, 2, B.iron); put(sd, lc, yb + 7, 2, B.ironDk);
          put(sd, lc, yb + 6, 2, B.lamp); put(sd, lc, yb + 5, 2, B.lamp); put(sd, lc, yb + 4, 2, B.ironDk);
          const p = sd.at(lc, 2); lamp = [p[0] + 0.5, yb + 6, p[1] + 0.5];
        }
        if (o.planters) for (const c0 of [-6, 8]) {
          for (let c = 0; c < 3; c++) for (const d of [2, 3]) {
            const p = sd.at(u0 + c0 + c, d), gg = MH.g(w, p[0], p[1]);
            if (w.get(p[0], gg + 1, p[1]) || w.get(p[0], yb - 2, p[1])) continue;
            const pt = Math.min(yb - 2, gg + 2);
            for (let y = gg + 1; y <= pt; y++) w.set(p[0], y, p[1], y === pt ? B.soil : B.plank);
            const hh = hash3(p[0], yb, p[1]);
            w.set(p[0], pt + 1, p[1], B.flowerLf);
            if (hh > 0.3) w.set(p[0], pt + 2, p[1], FLW[(hh * 17 | 0) % 5]);
          }
        }
        const p = sd.at(cu, 1);
        return { door: [p[0], yb, p[1]], lamp };
      };
      // 박공지붕: 겹 쌓인 기와(이음줄 엇갈림)·이엉(결 무늬), 두꺼운 처마 끝, 용마루, 박공널, 물받이·홈통, 다락 박공벽
      const roof = (wx0, wx1, wz0, wz1, top, o) => {
        const alongX = o.axis === 'x', ov = o.ov || 3, og = o.og || 2, th = o.mat === 'thatch';
        const A0 = alongX ? wz0 : wx0, A1 = alongX ? wz1 : wx1, a0 = A0 - ov, a1 = A1 + ov;
        const g0 = alongX ? wx0 : wz0, g1 = alongX ? wx1 : wz1, l0 = g0 - og, l1 = g1 + og;
        const y0 = top - ov;
        const P = (a, l, y, b) => alongX ? w.set(l, y, a, b) : w.set(a, y, l, b);
        const sMax = Math.floor((a1 - a0) / 2);
        for (let a = a0; a <= a1; a++) {
          const s = Math.min(a - a0, a1 - a), ry = y0 + s;
          for (let l = l0; l <= l1; l++) {
            let b;
            if (th) {
              const hh = hash3(l, s, 11);
              b = s === 0 ? B.thatchDk : (((l + (s >> 1) * 3) % 7 === 0) ? B.thatch2 : hh > 0.78 ? B.thatch3 : hh < 0.2 ? B.thatch2 : B.thatch);
            } else {
              const seam = ((l + (s & 1) * 2) & 3) === 0;
              b = s === 0 ? B.tileDk : seam ? B.tile2 : (hash3(l >> 2, s, 5) > 0.72 ? B.tile3 : B.tile);
            }
            P(a, l, ry, b); P(a, l, ry - 1, th ? B.thatch2 : B.tileDk);
            if (th && (s === 0 || l === l0 || l === l1)) P(a, l, ry - 2, B.thatchDk);
            if (s === sMax) { P(a, l, ry + 1, th ? B.thatchDk : B.tileDk); if (th && l % 6 === 0) P(a, l, ry + 2, B.frame); }
            // 다락: 벽 안쪽은 지붕 밑까지 채운다(박공벽)
            if (a >= A0 && a <= A1 && l >= g0 && l <= g1) for (let y = top; y <= ry - 2; y++) P(a, l, y, o.gable);
            if (!th && s >= 1 && (l === l0 || l === l1)) P(a, l, ry - 2, B.frame);
          }
        }
        // 박공 들보: 가로보, 빗보, 작은 박공창
        const mid = (A0 + A1) / 2, midA = Math.floor(mid);
        for (const [gl, out] of [[g0, g0 - 1], [g1, g1 + 1]]) {
          for (let a = A0; a <= A1; a++) P(a, out, top, B.frame);
          for (let a = A0 + 1; a <= A1 - 1; a++) {
            const s = Math.min(a - a0, a1 - a), ry = y0 + s;
            if (ry - 2 > top) P(a, out, ry - 2, B.frame);
          }
          const gy = top + Math.max(2, Math.floor((mid - A0) * 0.35));
          const odd = (A1 - A0) % 2 === 0;
          for (let r = 0; r < 3; r++) for (let c = -1; c <= (odd ? 1 : 2); c++) { P(midA + c, gl, gy + r, (c === 0 && odd) || r === 1 ? B.mullion : B.win); P(midA + c, out, gy + r, 0); }
          for (let c = -2; c <= (odd ? 2 : 3); c++) { P(midA + c, out, gy - 1, B.sill); P(midA + c, out, gy + 3, B.frame); }
          for (let r = 0; r < 3; r++) { P(midA - 2, out, gy + r, B.frame); P(midA + (odd ? 2 : 3), out, gy + r, B.frame); }
        }
        if (o.gutter) for (const [ae, ain, sg] of [[a0 - 1, a0, -1], [a1 + 1, a1, 1]]) {
          for (let l = l0; l <= l1; l++) P(ae, l, y0 - 1, B.gutter);
          const l = g0 + 1;
          P(ae, l, y0 - 2, B.gutter);
          for (let k = 0; k < ov; k++) P(ain + k * -sg + (sg < 0 ? 0 : 0), l, y0 - 3 - k, B.gutter);
          const aw = sg < 0 ? A0 - 1 : A1 + 1;
          for (let y = y0 - 3 - ov; y >= o.foot; y--) P(aw, l, y, B.gutter);
        }
        return y0 + sMax + 2;
      };
      const chimney = (cx, cz, yb, yt) => {
        for (let y = yb; y <= yt; y++) for (let dz = 0; dz < 4; dz++) for (let dx = 0; dx < 4; dx++) w.set(cx + dx, y, cz + dz, hash3(cx + dx, y, cz + dz) > 0.75 ? B.brick2 : B.brick);
        for (let y = yt - 2; y <= yt - 1; y++) for (let dz = -1; dz <= 4; dz++) for (let dx = -1; dx <= 4; dx++) if (dx < 0 || dz < 0 || dx > 3 || dz > 3) w.set(cx + dx, y, cz + dz, B.brick2);
        w.box(cx - 1, yt, cz - 1, cx + 4, yt, cz + 4, B.sill);
        for (const [px, pz] of [[cx + 1, cz + 1], [cx + 2, cz + 2]]) { w.box(px, yt + 1, pz, px, yt + 2, pz, B.pot); }
        return [cx + 2, yt + 3, cz + 2];
      };
      // 집 전체. o: x,z,sx,sz,floors,fh,face,roof('thatch'|'tile'),wall,shutter,jetty,stone(돌로 쌓은 층 수),chimney,balcony,box
      const house = o => {
        const x0 = o.x, z0 = o.z, x1 = o.x + o.sx - 1, z1 = o.z + o.sz - 1, fl = o.floors || 1, fh = o.fh || 12, face = o.face || 's';
        const gy = o.y != null ? o.y : MH.maxG(w, x0 - 3, z0 - 3, x1 + 3, z1 + 3) + 1;
        const wall = o.wall || B.plaster, sh = o.shutter === B.shutter2 ? [B.shutter2, B.shutter2Dk] : [B.shutter, B.shutterDk];
        // 기초: 낱돌(줄눈이 파였다), 맨 윗단은 갓돌
        for (let z = z0 - 1; z <= z1 + 1; z++) for (let x = x0 - 1; x <= x1 + 1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 - 1 || x === x1 + 1 || z === z0 - 1 || z === z1 + 1;
          for (let y = Math.min(gg, gy) - 1; y <= gy + 2; y++) {
            if (!edge) { w.set(x, y, z, B.mortar); continue; }
            if (y === gy + 2) { w.set(x, y, z, B.sill); continue; }
            const u = (z === z0 - 1 || z === z1 + 1) ? x : z;
            w.set(x, y, z, stoneAt(u, y, 3) || (y <= gg ? B.mortar : 0));
          }
        }
        let e = 0, yb = gy + 3;
        const out = { x0, x1, z0, z1, y: gy, floor: gy + 3, lamp: null };
        for (let f = 0; f < fl; f++) {
          const ePrev = e;
          if (o.jetty && f > 0) e = 2;
          const X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e, S = SIDES(X0, Z0, X1, Z1);
          const stone = f < (o.stone || 0);
          w.box(X0, yb, Z0, X1, yb + fh - 1, Z1, wall);
          const wh = Math.min(6, fh - 6), wy = yb + 3;
          for (const k of ['s', 'n', 'e', 'w']) {
            const sd = S[k], L = sd.u1 - sd.u0 + 1, cu = Math.floor((sd.u0 + sd.u1) / 2);
            const isDoor = k === face && f === 0, isBal = k === face && o.balcony === f;
            const nW = Math.max(1, Math.floor((L + 2) / 12)), wins = [];
            for (let q = 0; q < nW; q++) {
              const c = Math.round(sd.u0 + (q + 0.5) * L / nW), wu = c - 2;
              if ((isDoor || isBal) && Math.abs(c - cu) < 13) continue;
              if (wu - 1 <= sd.u0 || wu + 5 >= sd.u1) continue;
              wins.push(wu);
            }
            const busy = u => wins.some(wu => u >= wu - 4 && u <= wu + 8) || ((isDoor || isBal) && Math.abs(u - cu) <= 4);
            if (stone) {
              for (let y = yb; y < yb + fh; y++) for (let u = sd.u0; u <= sd.u1; u++) {
                const corner = u === sd.u0 || u === sd.u1 || u === sd.u0 + 1 || u === sd.u1 - 1;
                put(sd, u, y, 0, corner && ((y >> 1) & 1) ? B.sill : (stoneAt(u, y, 5) || B.mortar));
              }
            } else {
              // 반목조: 1칸 내민 들보(아래 깔도리 2줄, 위 도리, 모서리 기둥, 샛기둥, 가새)
              for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) { put(sd, u, yb, 1, B.frame); put(sd, u, yb + 1, 1, B.frame); put(sd, u, yb + fh - 1, 1, B.frame); }
              for (let y = yb; y < yb + fh; y++) for (const u of [sd.u0 - 1, sd.u0, sd.u1, sd.u1 + 1]) put(sd, u, y, 1, B.frameDk);
              for (let u = sd.u0 + 6; u <= sd.u1 - 3; u += 6) if (!busy(u)) for (let y = yb + 2; y < yb + fh - 1; y++) put(sd, u, y, 1, B.frame);
              for (const [ua, ub] of [[sd.u0 + 1, sd.u0 + 5], [sd.u1 - 1, sd.u1 - 5]]) {
                if (busy(ua) || busy(ub)) continue;
                for (let k2 = 0; k2 <= fh - 4; k2++) { const t = k2 / (fh - 4); put(sd, Math.round(ua + (ub - ua) * t), yb + 2 + k2, 1, B.frame); }
              }
              // 내민 층 밑 장선 끝
              if (e > ePrev) for (let u = sd.u0; u <= sd.u1; u += 3) { put(sd, u, yb - 1, 0, B.frameDk); put(sd, u, yb - 1, -1, B.frameDk); }
            }
            for (const wu of wins) windowAt(sd, wu, wy, wh, { shutter: stone ? null : sh[0], shutterDk: sh[1], box: o.box && !stone ? (f === 0 ? 1 : 2) : 0 });
            if (isDoor) {
              const r = doorAt(sd, cu, yb, { steps: true, lantern: o.lantern !== false, planters: o.planters !== false });
              out.door = r.door; out.lamp = r.lamp; out.side = sd;
            }
            if (isBal) {
              // 발코니: 마루, 장선, 난간 동자(2칸마다), 손잡이 난간, 꽃
              doorAt(sd, cu, yb, {});
              for (let u = cu - 6; u <= cu + 6; u++) for (let d = 1; d <= 5; d++) { put(sd, u, yb - 1, d, B.plank); if (u % 3 === 0) put(sd, u, yb - 2, d, B.frameDk); }
              for (let u = cu - 6; u <= cu + 6; u++) { put(sd, u, yb + 3, 5, B.wood); if (u % 2 === 0 || Math.abs(u - cu) === 6) put(sd, u, yb, 5, B.wood), put(sd, u, yb + 1, 5, B.wood), put(sd, u, yb + 2, 5, B.wood); }
              for (let d = 1; d <= 5; d++) for (const u of [cu - 6, cu + 6]) { put(sd, u, yb + 3, d, B.wood); if (d % 2) put(sd, u, yb, d, B.wood), put(sd, u, yb + 1, d, B.wood), put(sd, u, yb + 2, d, B.wood); }
              for (const u of [cu - 5, cu - 4, cu + 4, cu + 5]) { put(sd, u, yb, 4, B.plank); put(sd, u, yb + 1, 4, B.flowerLf); put(sd, u, yb + 2, 4, FLW[(u + 5) % 5]); }
            }
          }
          yb += fh;
        }
        const top = yb, X0 = x0 - e, X1 = x1 + e, Z0 = z0 - e, Z1 = z1 + e;
        const axis = o.axis || (o.sx >= o.sz ? 'x' : 'z');
        out.peak = roof(X0, X1, Z0, Z1, top, { axis, mat: o.roof, gable: wall, gutter: o.roof !== 'thatch', foot: gy + 3 });
        out.top = top; out.e = e;
        if (o.chimney) {
          const cx = axis === 'x' ? X0 + 3 : Math.floor((X0 + X1) / 2) - 1, cz = axis === 'x' ? Math.floor((Z0 + Z1) / 2) - 1 : Z0 + 3;
          out.chimney = chimney(cx, cz, top - 2, out.peak + 5);
        }
        return out;
      };

      // ───────── 강: 둑, 자갈 바닥, 물가 바위와 갈대 ─────────
      const RW = 13.2;
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const d = Math.abs(x + 0.5 - rX(z + 0.5)) * 0.99, gg = MH.g(w, x, z);
        if (d <= RW) {
          const depth = Math.round(4 + (1 - d / RW) * 4), by = Math.min(gg, UPL - depth);
          MH.setH(w, x, z, by, hash3(x, 1, z) > 0.6 ? B.gravel : B.rockDk, B.rockDk);
          w.liquid(x, z, UPL);
          for (let y = by + 1; y <= UPL; y++) w.set(x, y, z, 0);
        } else if (d <= RW + 4 && gg > UPL) MH.paint(w, x, z, d < RW + 2 ? B.bank : B.path);
      }
      const wet = (x, z) => x >= 0 && z >= 0 && x < W && z < D && w.liq[x + W * z] >= 0;
      // 물가 바위(이끼 낀 윗면)
      for (let z = 4; z < D - 4; z += 3) for (const side of [-1, 1]) {
        const hh = hash3(z, side + 5, 17);
        if (hh > 0.42 || Math.abs(z - 104) < 26) continue;
        const x = Math.round(rX(z) + side * (RW + 0.5 - hh * 3)), y = UPL - 1, r = 1.4 + hh * 3;
        w.ellipsoid(x, y, z, r, r * 0.7, r * 1.1, B.rock, (dx, dy, dz, dd) => dd < 0.7 || hash3(x + dx, y + dy, z + dz) > 0.3);
        for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const t = w.top(x + dx, z + dz); if (t > UPL - 1 && w.get(x + dx, t, z + dz) === B.rock && hash3(x + dx, t, z + dz) > 0.4) w.set(x + dx, t, z + dz, B.rockMoss); }
      }
      // 갈대: 가는 줄기 여러 높이, 일부는 부들 이삭
      for (let z = 1; z < D - 1; z++) for (let x = 1; x < W - 1; x++) {
        if (wet(x, z)) continue;
        if (!(wet(x + 1, z) || wet(x - 1, z) || wet(x, z + 1) || wet(x, z - 1) || wet(x + 2, z) || wet(x - 2, z))) continue;
        const gg = MH.g(w, x, z), h = hash3(x, 5, z);
        if (gg > UPL + 4 || w.get(x, gg + 1, z) || h < 0.62) continue;
        const ht = 3 + ((h - 0.62) * 14 | 0);
        for (let k = 1; k <= ht; k++) w.set(x, gg + k, z, k % 3 ? B.reed : B.reed2);
        if (h > 0.86) { w.set(x, gg + ht + 1, z, B.reedTop); w.set(x, gg + ht + 2, z, B.reedTop); w.set(x, gg + ht + 3, z, B.reed2); }
      }
      // 징검다리
      { const zz = 172;
        for (let x = Math.round(rX(zz) - RW - 1); x <= rX(zz) + RW + 1; x += 4) {
          const z = zz + Math.round(Math.sin(x * 0.7) * 1.5);
          for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 1; dx++) {
            if (dx * dx + dz * dz * 0.8 > 4.2) continue;
            const gg = MH.g(w, x + dx, z + dz);
            for (let y = gg; y <= UPL + 1; y++) w.set(x + dx, y, z + dz, y === UPL + 1 ? (hash3(x + dx, y, z + dz) > 0.5 ? B.st3 : B.st1) : B.rockDk);
          }
        }
      }

      // ───────── 물레방앗간(동쪽 강변)과 물레방아 ─────────
      const mz = 104, mrx = Math.round(rX(mz)), millX = mrx + 22;
      const my = MH.maxG(w, millX - 2, mz - 18, millX + 36, mz + 18) + 1;
      MH.flatten(w, millX - 4, mz - 28, millX + 42, mz + 22, my - 1, B.cobble, B.rock);
      MH.skirt(w, millX - 4, mz - 28, millX + 42, mz + 22, my - 1, { R: 12, rate: 1, surf: (x, z) => grassAt(x, z), fill: B.dirt, skip: (x, z) => x < millX - 4 });
      const mill = house({ x: millX, z: mz - 14, sx: 32, sz: 30, y: my, floors: 2, fh: 12, face: 'e', roof: 'thatch', stone: 1, chimney: true, wall: B.plaster, shutter: B.shutter, box: true });
      if (mill.lamp) lights.push({ p: mill.lamp, c: '#ffd890', i: 1, d: 24, flicker: 0.1, night: true });
      // 북쪽 처마 헛간: 밀가루 자루와 장작더미
      for (let dz = 0; dz <= 11; dz++) w.box(millX + 1, my + 15 - Math.ceil(dz / 2), mz - 16 - dz, millX + 26, my + 15 - Math.ceil(dz / 2), mz - 16 - dz, dz === 11 ? B.thatchDk : (hash3(dz, 3, 1) > 0.6 ? B.thatch2 : B.thatch));
      for (const x of [millX + 2, millX + 13, millX + 25]) w.box(x, my, mz - 26, x, my + 8, mz - 26, B.wood);
      for (let k = 0; k < 6; k++) sack(w, millX + 3 + (k % 3) * 4, my + (k >= 3 ? 5 : 0), mz - 23 + (k % 2), k % 2 ? B.sack2 : B.sack);
      for (let r = 0; r < 3; r++) for (let q = 0; q < 4 - r; q++) {   // 장작: 나이테 보이는 통나무
        const cz = mz - 22 + q * 3 + r * 1.5, cy = my + 1 + r * 3;
        for (let x = millX + 15; x <= millX + 23; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
          if (Math.abs(dy) + Math.abs(dz) > 1 && (x === millX + 15 || x === millX + 23)) continue;
          w.set(x, cy + dy, Math.round(cz) + dz, (x === millX + 15 || x === millX + 23) ? (dy === 0 && dz === 0 ? B.wood : B.plank) : B.bark);
        }
      }
      // 물레방아: 바퀴 아랫부분만 물에 잠기고, 굴대가 돌 받침을 지나 방앗간 벽까지
      const WR = 18, wy = UPL + 16, wx = mrx + 6;
      for (let y = UPL - 9; y <= wy - 2; y++) for (let z = mz - 4; z <= mz + 4; z++) for (let x = wx + 7; x <= wx + 11; x++) {
        const edge = x === wx + 7 || x === wx + 11 || z === mz - 4 || z === mz + 4;
        w.set(x, y, z, edge ? (stoneAt(x === wx + 7 || x === wx + 11 ? z : x, y, 9) || B.mortar) : B.mortar);
      }
      w.box(wx + 7, wy - 2, mz - 4, wx + 11, wy - 2, mz + 4, B.sill);
      w.box(wx + 8, wy - 1, mz - 2, wx + 10, wy - 1, mz + 2, B.ironDk);
      for (let x = wx + 6; x < millX; x++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) w.set(x, wy + dy, mz + dz, x % 6 === 0 ? B.iron : B.wood);
      for (const dz of [-5, 5]) { w.box(millX - 5, my - 1, mz + dz, millX - 4, wy - 2, mz + dz, B.wood); w.box(millX - 5, wy - 2, mz - 5, millX - 4, wy - 2, mz + 5, B.wood); }
      const wheel = w.prop({ name: 'wheel', pivot: [wx + 0.5, wy + 0.5, mz + 0.5], axis: 'x', speed: -0.7 });
      for (let dy = -WR - 2; dy <= WR + 2; dy++) for (let dz = -WR - 2; dz <= WR + 2; dz++) {
        const r = Math.hypot(dy, dz), ang = Math.atan2(dy, dz);
        if (r > WR + 0.5) continue;
        // 테(양쪽 두 겹)와 테 볼트
        if (r > WR - 2.2) {
          for (const x of [wx - 3, wx - 2, wx + 2, wx + 3]) wheel.set(x, wy + dy, mz + dz, (Math.abs(x - wx) === 3) ? B.wood : B.plank);
          const bolt = r > WR - 1.6 && r <= WR - 0.4 && Math.abs(((ang / (Math.PI / 12)) % 1 + 1) % 1 - 0.5) < 0.12;
          if (bolt) { wheel.set(wx - 4, wy + dy, mz + dz, B.iron); wheel.set(wx + 4, wy + dy, mz + dz, B.iron); }
          if (r > WR - 0.7) for (let x = wx - 1; x <= wx + 1; x++) wheel.set(x, wy + dy, mz + dz, B.plank);   // 바닥판
          continue;
        }
        // 바퀴살 8개(두께 2) + 안쪽 테
        const sp = ((ang / (Math.PI / 4)) % 1 + 1) % 1, onSpoke = r > 2 && (sp < 0.5 / Math.max(1, r * 0.5) * 2 || sp > 1 - 0.5 / Math.max(1, r * 0.5) * 2);
        const inner = r > 5 && r < 6.3;
        if (onSpoke || inner) for (const x of [wx - 3, wx - 2, wx + 2, wx + 3]) wheel.set(x, wy + dy, mz + dz, B.wood);
        if (r < 3.2) for (let x = wx - 4; x <= wx + 4; x++) wheel.set(x, wy + dy, mz + dz, r < 1.6 ? B.ironDk : B.iron);
      }
      // 물받이판 24장: 테 사이를 가로질러 바깥으로 1칸 더 내민다
      for (let k = 0; k < 24; k++) {
        const a = k / 24 * Math.PI * 2;
        for (let rr = WR - 5; rr <= WR + 1.5; rr += 0.5) {
          const dy = Math.round(Math.sin(a) * rr), dz = Math.round(Math.cos(a) * rr);
          for (let x = wx - 2; x <= wx + 2; x++) wheel.set(x, wy + dy, mz + dz, rr > WR ? B.wood : B.plank);
        }
      }
      for (let x = wx - 6; x <= wx + 5; x++) wheel.set(x, wy, mz, B.ironDk);
      acts.push({
        name: '물레방아', hint: '물살이 세지며 물레방아가 빠르게 돌아요', hit: [wx - 5, wy - WR - 2, mz - WR - 2, wx + 5, wy + WR + 2, mz + WR + 2],
        run: async a => {
          a.spin('wheel', 4, 4.5);
          for (let k = 0; k < 7; k++) { a.burst([wx, UPL + 1, mz + 0.5], { n: 30, colors: ['#ffffff', '#d8f0ff', '#8ac8f0'], speed: 7, up: 7, life: 1, gravity: 16, spread: 7 }); await a.wait(0.6); }
        },
      });
      landmarks.push({ name: '물레방앗간', note: '강물이 돌리는 큰 바퀴', p: [millX + 16, mill.peak + 12, mz], tag: 'MILL' });
      // 방앗간 박공의 자루 도르래: 다락 문, 내민 들보, 도르래, 밧줄과 자루
      const MX1 = mill.x1, HZ = mz - 8, HT = mill.top;
      for (let y = HT; y <= HT + 4; y++) for (let z = HZ - 2; z <= HZ + 2; z++) w.set(MX1, y, z, (z === HZ - 2 || z === HZ + 2 || y === HT + 4) ? B.frameDk : B.door);
      for (let z = HZ - 2; z <= HZ + 2; z++) { w.set(MX1 + 1, HT - 1, z, B.sill); w.set(MX1 + 1, HT, z, 0); w.set(MX1 + 1, HT + 1, z, 0); }
      const HX = MX1 + 8;
      w.box(MX1 + 1, HT + 6, HZ, HX, HT + 7, HZ, B.wood);
      w.line(MX1 + 1, HT + 1, HZ, MX1 + 5, HT + 5, HZ, B.wood);
      w.set(HX, HT + 5, HZ, B.iron); w.set(HX - 1, HT + 5, HZ, B.ironDk);
      w.box(HX - 2, my, HZ - 1, HX + 1, my, HZ + 1, B.plank);
      MH.rope(w, 'srope', HX, HT + 4, HZ, 2, B.rope);
      const sackP = w.prop({ name: 'sack', pivot: [HX + 0.5, HT + 2, HZ + 0.5] });
      sack(sackP, HX - 1, HT - 4, HZ - 1, B.sail); sackP.set(HX, HT + 2, HZ, B.rope);
      const sDrop = (HT - 4) - (my + 1);
      acts.push({
        name: '자루 도르래', hint: '방앗간 다락에서 밀가루 자루가 내려와요', hit: [MX1 + 1, my + 1, HZ - 2, HX + 1, HT + 7, HZ + 2],
        run: async a => {
          await Promise.all([a.move('sack', [0, -sDrop, 0], 2.2, t => t), a.rope('srope', 2, 2 + sDrop, 2.2, t => t)]);
          for (let k = 0; k < 3; k++) { a.burst([HX, my + 3, HZ + 0.5], { n: 34, colors: ['#ffffff', '#f4ecd8', '#e8dcc0'], speed: 5, up: 4, life: 1.4, gravity: 2, spread: 3 }); await a.wait(0.35); }
          await a.wait(0.6);
          await Promise.all([a.move('sack', [0, 0, 0], 2.4, t => t), a.rope('srope', 2, 2, 2.4, t => t)]);
        },
      });

      // ───────── 아치 돌다리: 쐐기돌 아치, 낱돌 벽면, 난간 갓돌, 돌길 바닥 ─────────
      const bz = 232, brx = rX(bz);
      const by = Math.max(g(brx - 30, bz), g(brx + 30, bz)) + 1, BH = 30, AH = 17;
      for (let dx = -BH; dx <= BH; dx++) {
        const x = Math.round(brx + dx), t = dx / BH, deck = by + Math.round(6 * (1 - t * t));
        const archTop = Math.abs(dx) < AH ? UPL + 1 + Math.round(9 * Math.sqrt(1 - (dx / AH) ** 2)) : -99;
        for (let z = bz - 8; z <= bz + 8; z++) {
          const gg = MH.g(w, x, z), side = z === bz - 7 || z === bz + 7, rim = z === bz - 8 || z === bz + 8;
          if (rim) { w.set(x, deck + 4, z, B.sill); continue; }
          for (let y = Math.min(gg, UPL - 8); y <= deck + 4; y++) {
            if (y <= archTop) continue;
            if (y > deck && !side) { w.set(x, y, z, 0); continue; }
            if (y === deck + 4) { w.set(x, y, z, B.sill); continue; }
            if (y > deck) { w.set(x, y, z, stoneAt(x, y, 13) || B.mortar); continue; }
            if (y <= archTop + 2 && archTop > 0) { const sec = Math.floor((Math.atan2(y - UPL, dx) + 4) * 9); w.set(x, y, z, sec & 1 ? B.st2 : B.stoneDk); continue; }
            if (side || z === bz - 6 || z === bz + 6) w.set(x, y, z, side ? (stoneAt(x, y, 13) || B.mortar) : B.rock);
            else w.set(x, y, z, y === deck ? paveAt(x, z) : B.rock);
          }
          if (!side) w.hm[x + W * z] = Math.max(w.hm[x + W * z], deck);
        }
      }
      landmarks.push({ name: '아치 돌다리', note: '마을과 밀밭을 잇는 다리', p: [brx, by + 22, bz + 0.5] });
      for (const [lx, lz] of [[Math.round(brx + 34), bz - 10], [Math.round(brx - 34), bz + 10]]) lights.push({ p: lampPost(lx, lz, 9), c: '#ffe0a0', i: 0.9, d: 22, flicker: 0.05, night: true });

      // ───────── 마을: 동쪽 강변의 골목과 집 ─────────
      const lane = [[brx + 32, bz + 2], [252, 226], [268, 184], [258, 136], [millX + 36, mz + 8]];
      MH.path(w, lane, 4.8, B.cobble, B.path);
      const westPath = [[brx - 32, bz], [104, 226], [68, 204], [64, 168]];
      MH.path(w, westPath, 4, B.path);
      const houses = [[216, 252, 24, 20, 'n'], [302, 244, 24, 20, 'w'], [288, 200, 24, 24, 'w'], [220, 162, 24, 20, 'e'], [284, 146, 24, 20, 'w'], [226, 288, 24, 20, 'n'], [268, 288, 24, 20, 'n']];
      const hs = [];
      houses.forEach(([x, z, sx, sz, face], k) => {
        const h = house({ x, z, sx, sz, floors: k % 3 === 0 ? 1 : 2, fh: 12, face, jetty: k % 2 === 1, roof: k % 2 ? 'thatch' : 'tile', wall: k % 2 ? B.plaster2 : B.plaster,
          shutter: k % 2 ? B.shutter : B.shutter2, chimney: k % 2 === 1 || k === 0, box: true, lantern: k % 2 === 0 });
        hs.push(h);
        if (h.chimney && smokes.length < 3) smokes.push(h.chimney);
        if (h.lamp) lights.push({ p: h.lamp, c: '#ffd890', i: 0.8, d: 18, flicker: 0.1, night: true });
      });
      // 텃밭 둘: 흰 울타리(뾰족 말뚝과 가로대) 안에 양배추 이랑
      const picket = (x0, z0, x1, z1) => {
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const gg = MH.g(w, x, z), edge = x === x0 || x === x1 || z === z0 || z === z1;
          if (gg < 0 || w.get(x, gg + 1, z) || wet(x, z)) continue;
          if (edge) {
            const mzz = Math.floor((z0 + z1) / 2);
            if ((x === x0 || x === x1) && Math.abs(z - mzz) <= 1) continue;
            const u = (x === x0 || x === x1) ? z : x, post = u % 6 === 0;
            if (u % 2 === 0) { w.box(x, gg + 1, z, x, gg + (post ? 6 : 5), z, B.picket); }
            else { w.set(x, gg + 2, z, B.picket); w.set(x, gg + 4, z, B.picket); }
          } else {
            w.set(x, gg, z, (z - z0) % 4 < 2 ? B.soil : B.soilDk);
            if ((z - z0) % 4 === 1 && (x - x0) % 4 === 2) {
              if ((x + z) % 5) { w.box(x - 1, gg + 1, z - 1, x + 1, gg + 1, z + 1, B.cabbage); w.set(x, gg + 2, z, B.cabbage2); for (const [dx, dz] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) if (!w.get(x + dx, gg + 1, z + dz)) w.set(x + dx, gg + 1, z + dz, B.cabbage); }
              else flowerAt(w, x, gg + 1, z, B.flower2, true);
            }
          }
        }
      };
      picket(196, 160, 214, 180); picket(314, 196, 330, 220);
      // 여관(삼층, 내민 층, 발코니, 매단 간판)
      const inn = house({ x: 224, z: 194, sx: 28, sz: 20, floors: 3, fh: 12, face: 's', jetty: true, balcony: 2, roof: 'thatch', wall: B.plaster2, shutter: B.shutter, chimney: true, box: true });
      if (inn.chimney) smokes.push(inn.chimney);
      { // 간판: 쇠까치발이 받친 들보, 사슬 두 줄, 테두리 있는 판에 잔 그림
        const sx = inn.x0 + 4, sy = inn.floor + 10, z1 = inn.z1;
        w.box(sx, sy, z1 + 1, sx, sy, z1 + 10, B.wood); w.line(sx, sy - 4, z1 + 1, sx, sy - 1, z1 + 5, B.iron);
        for (const cz of [z1 + 5, z1 + 9]) { w.set(sx, sy - 1, cz, B.iron); w.set(sx, sy - 2, cz, B.ironDk); }
        for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
          const z = z1 + 4 + c, y = sy - 3 - r, edge = r === 0 || r === 6 || c === 0 || c === 6;
          const mug = (c >= 2 && c <= 4 && r >= 2 && r <= 5) || (c === 5 && (r === 3 || r === 4));
          w.set(sx, y, z, edge ? B.frame : mug ? (r === 2 ? B.flower3 : B.thatch3) : B.sign);
        }
      }
      for (const [bx, bz2, st] of [[inn.x1 - 6, inn.z1 + 5, 0], [inn.x1 - 1, inn.z1 + 5, 0], [inn.x1 - 4, inn.z1 + 9, 0], [inn.x1 - 3, inn.z1 + 5, 1]]) barrel(w, bx, g(bx, bz2) + 1 + st * 7, bz2);
      if (inn.lamp) lights.push({ p: inn.lamp, c: '#ffd890', i: 1, d: 22, flicker: 0.1, night: true });
      landmarks.push({ name: '물레방아 여관', note: '삼층 여관과 매단 간판', p: [inn.x0 + 14, inn.peak + 8, inn.z0 + 10] });

      // ───────── 광장과 우물 ─────────
      const SX = 258, SZ = 232, sg = g(SX, SZ);
      for (let z = SZ - 20; z <= SZ + 20; z++) for (let x = SX - 20; x <= SX + 20; x++) {
        const d = MH.dist(x, z, SX, SZ);
        if (d < 19.5 && !w.get(x, MH.g(w, x, z) + 3, z)) MH.setH(w, x, z, sg, d > 18 ? B.st1 : d > 17 ? B.cobbleJ : B.cobble, B.rock);
      }
      // 우물: 낱돌 둥근 벽과 갓돌, 깊은 수직갱, 기둥 둘, 도르래 굴대와 손잡이, 기와 지붕
      for (let y = sg + 1; y <= sg + 5; y++) for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
        const d = Math.hypot(dx, dz);
        if (d > 5.9 || d <= 3.2) continue;
        if (y === sg + 5) { w.set(SX + dx, y, SZ + dz, B.sill); continue; }
        const u = Math.round((Math.atan2(dz, dx) + Math.PI) * 6);
        w.set(SX + dx, y, SZ + dz, d > 4.9 ? (stoneAt(u, y, 21) || B.mortar) : B.st2);
      }
      for (let y = sg - 22; y <= sg; y++) w.cyl(SX, SZ, y, y, 3.2, 0);
      for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { if (dx * dx + dz * dz > 3.2 * 3.2) continue; w.set(SX + dx, sg - 22, SZ + dz, B.rockDk); w.hm[SX + dx + W * (SZ + dz)] = sg - 22; w.liquid(SX + dx, SZ + dz, sg - 16); }
      for (const px of [SX - 7, SX + 7]) w.box(px, sg + 5, SZ, px + 1, sg + 17, SZ + 1, B.wood);
      for (let x = SX - 5; x <= SX + 6; x++) { w.set(x, sg + 14, SZ, B.wood); w.set(x, sg + 15, SZ, B.wood); w.set(x, sg + 14, SZ + 1, B.wood); w.set(x, sg + 15, SZ + 1, B.wood); }
      for (let x = SX - 2; x <= SX + 3; x++) { w.set(x, sg + 14, SZ - 1, B.rope); w.set(x, sg + 15, SZ - 1, B.rope); }
      w.box(SX + 9, sg + 14, SZ, SX + 9, sg + 15, SZ, B.iron); w.box(SX + 10, sg + 11, SZ, SX + 10, sg + 14, SZ, B.iron); w.box(SX + 11, sg + 11, SZ, SX + 12, sg + 11, SZ, B.wood);
      roof(SX - 7, SX + 8, SZ - 3, SZ + 4, sg + 19, { axis: 'x', mat: 'tile', gable: B.wood, ov: 3, og: 2, foot: sg });
      MH.rope(w, 'wrope', SX, sg + 13, SZ, 2, B.rope);
      const bucket = w.prop({ name: 'bucket', pivot: [SX + 0.5, sg + 11, SZ + 0.5] });
      for (let y = sg + 6; y <= sg + 9; y++) for (let dz = -2; dz <= 2; dz++) for (let dx = -2; dx <= 2; dx++) {
        const d2 = dx * dx + dz * dz; if (d2 > 4.5) continue;
        const outer = d2 > 1.5;
        if (y === sg + 9 && !outer) bucket.set(SX + dx, y, SZ + dz, B.foam2);
        else if (outer || y === sg + 6) bucket.set(SX + dx, y, SZ + dz, (y === sg + 7 || y === sg + 9) && outer ? B.iron : B.cask);
      }
      for (const dx of [-2, 2]) bucket.set(SX + dx, sg + 10, SZ, B.iron);
      bucket.box(SX - 1, sg + 11, SZ, SX + 1, sg + 11, SZ, B.iron);
      // 물통: 길어 올린 물을 우물 남쪽 나무 물통에 붓는다
      w.box(SX - 4, sg + 1, SZ + 8, SX + 5, sg + 4, SZ + 12, B.plank); w.box(SX - 3, sg + 4, SZ + 9, SX + 4, sg + 4, SZ + 11, B.foam2);
      for (const x of [SX - 4, SX + 5]) w.box(x, sg + 1, SZ + 8, x, sg + 4, SZ + 12, B.iron);
      acts.push({
        name: '우물 두레박', hint: '두레박이 물을 길어 올려 물통에 부어요', hit: [SX - 7, sg + 1, SZ - 6, SX + 8, sg + 18, SZ + 13],
        run: async a => {
          await Promise.all([a.move('bucket', [0, -24, 0], 1.3, t => t), a.rope('wrope', 2, 26, 1.3, t => t)]);
          a.burst([SX + 0.5, sg - 15, SZ + 0.5], { n: 22, colors: ['#e0f6ff', '#8ac8f0'], speed: 4, up: 6, life: 0.8, gravity: 14, spread: 2 });
          await a.wait(0.4);
          await Promise.all([a.move('bucket', [0, 0, 0], 1.5, t => t), a.rope('wrope', 2, 2, 1.5, t => t)]);
          await a.move('bucket', [0, -1, 9], 0.9);
          await a.turn('bucket', [0.9, 0, 0], 0.6);
          for (let k = 0; k < 4; k++) { a.burst([SX + 0.5, sg + 7, SZ + 11], { n: 24, colors: ['#e0f6ff', '#8ac8f0', '#ffffff'], speed: 4, up: 2, life: 0.8, gravity: 18, spread: 2.4 }); await a.wait(0.35); }
          await a.turn('bucket', [0, 0, 0], 0.6);
          await a.move('bucket', [0, 0, 0], 0.9);
        },
      });
      // 장터 노점: 기둥, 판자 진열대(앞판·윗판), 줄무늬 차양과 물결 테두리, 상자째 쌓인 사과·양배추·자루·라벤더 다발
      const stall = (x, z, a1, a2, kind) => {
        const sx = 11, sz = 8, y = MH.maxG(w, x - 1, z - 1, x + sx, z + sz) + 1;
        MH.footing(w, x, z, x + sx - 1, z + sz - 1, y, B.st2);
        for (let zz = z - 1; zz <= z + sz + 1; zz++) for (let xx = x - 1; xx <= x + sx; xx++) for (let yy = y; yy <= y + 16; yy++) w.set(xx, yy, zz, 0);
        for (const [px, pz, ph] of [[x, z, 13], [x + sx - 1, z, 13], [x, z + sz - 1, 10], [x + sx - 1, z + sz - 1, 10]]) w.box(px, y, pz, px, y + ph, pz, B.wood);
        for (let xx = x; xx < x + sx; xx++) {
          for (let yy = y; yy <= y + 3; yy++) w.set(xx, yy, z + sz - 1, (xx - x) % 3 === 0 ? B.frame : B.plank);
          w.set(xx, y + 4, z + sz - 1, B.wood); w.set(xx, y + 4, z + sz - 2, B.wood); w.set(xx, y + 4, z + sz, B.frame);
        }
        // 진열 물건
        for (let k = 0; k < 3; k++) {
          const gx = x + 1 + k * 3;
          if (kind === 0) {   // 사과 상자
            w.box(gx, y + 5, z + sz - 2, gx + 2, y + 5, z + sz - 1, B.crateEdge);
            for (let dx = 0; dx < 3; dx++) for (let dz = 0; dz < 2; dz++) { w.set(gx + dx, y + 6, z + sz - 2 + dz, hash3(gx + dx, k, dz) > 0.3 ? (k === 1 ? B.appleG : B.apple) : B.apple); }
            w.set(gx + 1, y + 7, z + sz - 2, k === 1 ? B.appleG : B.apple);
          } else if (k === 1) { sack(w, gx, y + 5, z + sz - 3, B.sack); }
          else { for (let dx = 0; dx < 3; dx++) { w.set(gx + dx, y + 5, z + sz - 1, B.cabbage); w.set(gx + dx, y + 5, z + sz - 2, dx === 1 ? B.cabbage2 : B.cabbage); } w.set(gx + 1, y + 6, z + sz - 2, B.cabbage2); }
        }
        w.set(x + sx - 2, y + 5, z + sz - 1, B.lavenderStem); w.set(x + sx - 2, y + 6, z + sz - 1, B.lavender); w.set(x + sx - 2, y + 7, z + sz - 1, B.lavender2);
        crate(w, x + 1, y, z + 1, 4); crate(w, x + 1, y + 4, z + 1, 3); crate(w, x + 6, y, z + 1, 4);
        // 차양: 뒤가 높고 앞이 낮은 줄무늬, 앞쪽 물결 테두리
        for (let dz = -1; dz <= sz + 1; dz++) {
          const yy = y + 14 - Math.round((dz + 1) * 4 / (sz + 2));
          for (let dx = -1; dx <= sx; dx++) {
            const stripe = ((dx + 1) >> 1) & 1 ? a1 : a2;
            w.set(x + dx, yy, z + dz, stripe);
            if (dz === sz + 1) { w.set(x + dx, yy - 1, z + dz, stripe); if ((dx & 1) === 0) w.set(x + dx, yy - 2, z + dz, a1); }
          }
        }
        return y;
      };
      stall(SX - 19, SZ - 7, B.awnR, B.awnW, 0);
      stall(SX + 8, SZ + 2, B.awnG, B.awnW, 1);
      bench(SX - 8, SZ - 15, true, -1);
      // 꽃밭: 낱돌 테두리, 흙, 줄기와 잎이 있는 낱낱의 꽃
      const flowerBed = (x0, z0, x1, z1) => {
        const fy = MH.maxG(w, x0, z0, x1, z1);
        for (let z = z0; z <= z1; z++) for (let x = x0; x <= x1; x++) {
          const edge = x === x0 || x === x1 || z === z0 || z === z1;
          MH.setH(w, x, z, fy, edge ? B.cobble : B.soil, B.rock);
          if (edge) { w.set(x, fy + 1, z, (x + z) % 3 ? B.st3 : B.st1); continue; }
          w.set(x, fy, z, B.soil); w.set(x, fy + 1, z, B.soil);
          const hh = hash3(x, 9, z);
          if (hh < 0.18) w.set(x, fy + 2, z, B.flowerLf);
          else if (hh < 0.82) flowerAt(w, x, fy + 2, z, FLW[((x * 3 + z * 5) >> 1) % 5], hh > 0.55);
        }
      };
      flowerBed(SX - 15, SZ + 7, SX - 7, SZ + 14);
      // 우물가 사과나무: 잎뭉치는 부품(바람에 흔들림), 떨어지는 사과 셋
      const AX = SX + 14, AZ = SZ - 15, ag = g(AX, AZ) + 1;
      const crown = w.prop({ name: 'acrown', pivot: [AX + 0.5, ag + 12, AZ + 0.5] });
      const at = tree(AX, ag, AZ, { h: 18, r: 9, trunkR: 2.4, branches: 5, leaves: [B.leaf2, B.leaf, B.leafDk], fruit: B.apple }, guard(crown));
      const aps = [];
      for (let k = 0; k < 3; k++) {
        const e = at.ends[1 + k] || at.ends[0], ax = Math.round(e[0]), az = Math.round(e[2]);
        let ay = Math.round(e[1]) - 6;
        while (w.get(ax, ay, az) || crown.get(ax, ay, az)) ay--;
        const ap = w.prop({ name: 'apple' + k, pivot: [ax + 0.5, ay, az + 0.5] });
        ap.set(ax, ay, az, B.apple); ap.set(ax, ay - 1, az, B.apple);
        aps.push([ax, ay, az, ay - 1 - (g(ax, az) + 1)]);
      }
      acts.push({
        name: '사과나무', hint: '바람에 우물가 사과나무가 흔들려 사과와 잎이 떨어져요', hit: [AX - 9, ag + 8, AZ - 9, AX + 9, ag + 32, AZ + 9],
        run: async a => {
          a.wind(3, 3.5);
          aps.forEach((p, k) => a.wait(0.4 + k * 0.5).then(() => a.move('apple' + k, [0, -p[3], 0], 0.5, t => t * t)));
          for (let k = 0; k < 6; k++) {
            const s = k % 2 ? -1 : 1;
            a.turn('acrown', [0.07 * s, 0, 0.1 * s], 0.45);
            const ang = 0.9 + (k % 4) * 0.35;
            a.burst([AX + 0.5 + Math.cos(ang) * 10, ag + 20 + (k % 3), AZ + 0.5 + Math.sin(ang) * 10], { n: 16, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 4, up: 2, life: 2.4, gravity: 2.4, spread: 3 });
            if (k % 2 === 0) a.burst([AX + 0.5, ag + 30, AZ + 0.5], { n: 18, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 6, up: 4, life: 2.6, gravity: 1.6, spread: 6, flat: true });
            await a.wait(0.45);
          }
          await a.turn('acrown', [0, 0, 0], 0.5);
          await a.wait(0.8);
          await Promise.all(aps.map((_, k) => a.respawn('apple' + k, 0.6)));
        },
      });
      for (const [lx, lz] of [[SX - 19, SZ + 12], [SX + 14, SZ + 17], [262, 168], [248, 128]]) lights.push({ p: lampPost(lx, lz, 11), c: '#ffe0a0', i: 1, d: 24, flicker: 0.05, night: true });
      landmarks.push({ name: '우물 광장', note: '장날이면 노점이 선다', p: [SX + 0.5, sg + 32, SZ + 0.5] });

      // ───────── 서쪽 언덕: 풍차 ─────────
      const WX = 64, WZ = 148, wg = g(WX, WZ) + 1;
      MH.flatten(w, WX - 18, WZ - 18, WX + 18, WZ + 22, wg - 1, B.path, B.dirt);
      MH.skirt(w, WX - 18, WZ - 18, WX + 18, WZ + 22, wg - 1, { R: 24, rate: 0.95, noise: (x, z) => n.fbm(x * 0.075, z * 0.075 + 5, 2) * 3.2 - 0.8, surf: (x, z) => grassAt(x, z), fill: B.dirt });
      MH.path(w, [[68, 204], [64, 170]], 4, B.path);
      const TH = 52, rAt = y => 12 - (y - wg) * 0.08;
      for (let y = wg; y < wg + TH; y++) {
        const r = rAt(y), band = (y - wg) % 12 >= 10;
        w.cyl(WX, WZ, y, y, r, B.plaster);
        if (band) w.ring(WX, WZ, y, r - 1.2, r, B.frame);
      }
      for (let y = wg; y <= wg + 3; y++) for (let dz = -14; dz <= 14; dz++) for (let dx = -14; dx <= 14; dx++) {
        const d = Math.hypot(dx, dz); if (d > 13.6) continue;
        if (y === wg + 3) { if (d > 12) w.set(WX + dx, y, WZ + dz, B.sill); continue; }
        const u = Math.round((Math.atan2(dz, dx) + Math.PI) * 13.6);
        w.set(WX + dx, y, WZ + dz, d > 12.6 ? (stoneAt(u, y, 31) || B.mortar) : B.mortar);
      }
      // 창: 동·서·북 세 방향, 세 층
      for (const yy of [wg + 10, wg + 22, wg + 34]) for (const [ax, az] of [[1, 0], [-1, 0], [0, -1]]) {
        for (let r = -1; r <= 5; r++) for (let c = -2; c <= 2; c++) {
          const y = yy + r, rr = rAt(y), dep = Math.floor(Math.sqrt(Math.max(0, rr * rr - c * c)));
          const px = ax ? WX + ax * dep : WX + c, pz = az ? WZ + az * dep : WZ + c;
          const ox = px + ax, oz = pz + az;
          if (r === -1) { w.set(ox, y, oz, B.sill); continue; }
          if (r === 5) { w.set(px, y, pz, B.frame); if (Math.abs(c) <= 1) w.set(ox, y, oz, B.frame); continue; }
          if (Math.abs(c) === 2) { w.set(px, y, pz, B.frame); continue; }
          w.set(px, y, pz, c === 0 || r === 2 ? B.mullion : B.win);
        }
      }
      // 문(남쪽): 판자문, 문틀, 돌계단 셋, 등롱
      { const dz0 = WZ + Math.floor(rAt(wg + 4));
        for (let r = 0; r < 9; r++) for (let c = -2; c <= 2; c++) {
          const x = WX + c, z = WZ + Math.floor(Math.sqrt(Math.max(0, rAt(wg + 4 + r) ** 2 - c * c)));
          const stile = Math.abs(c) === 2 || r === 0 || r === 4 || r === 8;
          w.set(x, wg + 4 + r, z, stile ? B.doorDk : B.door);
          if (!stile) w.set(x, wg + 4 + r, z + 1, 0);
        }
        w.set(WX + 1, wg + 8, dz0 + 1, B.brass);
        for (let r = 0; r <= 9; r++) for (const c of [-3, 3]) w.set(WX + c, wg + 4 + r, dz0 + 1, B.frame);
        for (let c = -3; c <= 3; c++) w.set(WX + c, wg + 13, dz0 + 1, B.frameDk);
        for (let k = 0; k < 4; k++) for (let c = -4; c <= 4; c++) for (let y = wg - 1; y <= wg + 3 - k; y++) w.set(WX + c, y, dz0 + 1 + k, y === wg + 3 - k ? B.sill : B.st2);
        w.box(WX - 5, wg + 11, dz0 + 1, WX - 5, wg + 11, dz0 + 2, B.iron); w.set(WX - 5, wg + 10, dz0 + 2, B.ironDk); w.box(WX - 5, wg + 8, dz0 + 2, WX - 5, wg + 9, dz0 + 2, B.lamp); w.set(WX - 5, wg + 7, dz0 + 2, B.ironDk);
        lights.push({ p: [WX - 4.5, wg + 9, dz0 + 2.5], c: '#ffd890', i: 0.8, d: 20, flicker: 0.1, night: true }); }
      // 둘레 회랑: 마루, 장선, 버팀대, 난간 동자, 손잡이
      const GY = wg + 20;
      w.ring(WX, WZ, GY, 9, 15.2, B.plank);
      for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; for (let r = 10; r <= 15; r++) w.set(Math.round(WX + Math.cos(a) * r), GY - 1, Math.round(WZ + Math.sin(a) * r), B.frameDk); }
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + 0.2; w.line(WX + Math.cos(a) * 14, GY - 2, WZ + Math.sin(a) * 14, WX + Math.cos(a) * (rAt(GY - 10) + 0.5), GY - 10, WZ + Math.sin(a) * (rAt(GY - 10) + 0.5), B.wood); }
      for (let k = 0; k < 64; k++) {
        const a = k / 64 * Math.PI * 2, x = Math.round(WX + Math.cos(a) * 14.6), z = Math.round(WZ + Math.sin(a) * 14.6);
        if (k % 2 === 0) { w.set(x, GY + 1, z, B.wood); w.set(x, GY + 2, z, B.wood); w.set(x, GY + 3, z, B.wood); }
        if (k % 8 === 0) w.set(x, GY + 4, z, B.frameDk);
      }
      w.ring(WX, WZ, GY + 4, 14, 15.2, B.wood);
      // 모자 지붕: 겹 이엉 원뿔, 처마 띠, 꼭대기 쇠장식
      let cy = wg + TH, cr = 10.8;
      for (let k = 0; cr > 0.4; k++, cr -= 0.55) {
        const R = Math.ceil(cr);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz); if (d > cr) continue;
          const hh = hash3(WX + dx, cy + k, WZ + dz);
          w.set(WX + dx, cy + k, WZ + dz, k === 0 && d > cr - 1.2 ? B.thatchDk : ((Math.round((Math.atan2(dz, dx) + 4) * 6) + k) % 5 === 0 ? B.thatch2 : hh > 0.8 ? B.thatch3 : B.thatch));
        }
      }
      const capTop = cy + Math.ceil(10.4 / 0.55);
      w.box(WX, capTop, WZ, WX, capTop + 3, WZ, B.iron); w.cyl(WX, WZ, capTop + 4, capTop + 4, 1, B.brass); w.set(WX, capTop + 5, WZ, B.brass);
      // 풍차 아래 맷돌과 자루
      for (let y = wg; y <= wg + 1; y++) for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) { const d = Math.hypot(dx, dz); if (d <= 3.8 && d > 0.9) w.set(WX + 18 + dx, y, WZ - 12 + dz, d > 3 ? B.stoneDk : B.millstone); }
      for (let k = 0; k < 4; k++) sack(w, WX - 17 + (k % 2) * 3, wg + (k === 3 ? 5 : 0), WZ + 5 + (k > 1 ? 3 : 0), k % 2 ? B.sack2 : B.sack);
      // 굴대와 날개: 날개 막대(두께 2), 격자틀, 돛천(둘은 활짝, 둘은 반쯤 걷음), 쇠 굴대 머리
      const hy = wg + 46;
      w.box(WX - 1, hy - 1, WZ + 6, WX + 1, hy + 1, WZ + 16, B.wood); w.box(WX - 1, hy - 1, WZ + 12, WX + 1, hy + 1, WZ + 12, B.iron);
      const blades = w.prop({ name: 'blades', pivot: [WX + 0.5, hy + 0.5, WZ + 17.5], axis: 'z', speed: 0.5 });
      [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([dx, dy], arm) => {
        const px = -dy, py = dx;
        for (let s = 2; s <= 32; s++) for (const q of [0, -1]) for (const z of [WZ + 17, WZ + 18]) blades.set(WX + dx * s + px * q, hy + dy * s + py * q, z, B.wood);
        for (let s = 6; s <= 32; s++) {
          blades.set(WX + dx * s - px * 2, hy + dy * s - py * 2, WZ + 17, B.plank);   // 앞날 판
          for (let q = 1; q <= 8; q++) {
            const bar = s % 4 === 2 || q === 8 || q === 4, X = WX + dx * s + px * q, Y = hy + dy * s + py * q;
            if (bar) blades.set(X, Y, WZ + 17, B.wood);
            else if (arm % 2 === 0 || q < 4) blades.set(X, Y, WZ + 17, ((s >> 2) + (q >> 2)) & 1 ? B.sail : B.sail2);
          }
        }
      });
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { blades.set(WX + dx, hy + dy, WZ + 19, B.iron); if (Math.abs(dx) + Math.abs(dy) <= 2) blades.set(WX + dx, hy + dy, WZ + 20, B.ironDk); }
      blades.set(WX, hy, WZ + 21, B.brass);
      acts.push({
        name: '풍차', hint: '바람을 받아 날개가 힘차게 돌아요', hit: [WX - 32, hy - 32, WZ + 15, WX + 32, hy + 32, WZ + 21],
        run: async a => { a.spin('blades', 6, 4.5); for (let k = 0; k < 5; k++) { a.burst([WX + 0.5, hy, WZ + 19], { n: 16, colors: ['#fff4d0', '#e8d8a0'], speed: 22, up: 2, life: 1.2, gravity: 0, spread: 16, flat: true }); await a.wait(0.8); } },
      });
      landmarks.push({ name: '풍차 언덕', note: '밀밭을 내려다보는 풍차', p: [WX + 0.5, capTop + 12, WZ + 0.5] });

      // ───────── 조각보 밭, 산울타리, 붉은 헛간 ─────────
      const crops = [B.wheat, B.cabbage, B.lavender, B.wheat];
      const BRX0 = 98, BRX1 = 128, BRZ0 = 250, BRZ1 = 272;
      const lavs = [], lavRows = [];
      for (let fz = 190; fz < 320; fz += 34) for (let fx = 16; fx < 136; fx += 38) {
        const crop = crops[((fx / 38 | 0) + (fz / 34 | 0)) % 4];
        let cnt = 0;
        for (let z = fz; z < fz + 26; z++) for (let x = fx; x < fx + 30; x++) {
          const gg = MH.g(w, x, z);
          if (gg < base || wet(x, z) || MH.polyDist(x, z, westPath) < 7 || (x >= BRX0 - 4 && x <= BRX1 + 12 && z >= BRZ0 - 4 && z <= BRZ1 + 4)) continue;
          const row = (z - fz) % 4;
          w.set(x, gg, z, row < 2 ? B.soil : B.soilDk); cnt++;
          if (crop === B.wheat && row < 2) {
            const hh = hash3(x, 2, z), ht = 3 + (hh * 3 | 0);
            for (let k = 1; k <= ht; k++) w.set(x, gg + k, z, k >= ht - 1 ? B.wheatTop : B.wheat);
          } else if (crop === B.cabbage && row === 1 && (x - fx) % 4 === 1) {
            w.box(x - 1, gg + 1, z - 1, x + 1, gg + 1, z + 1, B.cabbage); w.set(x, gg + 2, z, B.cabbage2);
            for (const [dx, dz] of [[1, 1], [-1, -1]]) w.set(x + dx, gg + 2, z + dz, B.cabbage);
          }
        }
        if (crop === B.lavender && cnt > 240) lavs.push([fx + 14, fz + 12]);
        if (crop === B.lavender) for (let z = fz + 1; z < fz + 26; z += 4) lavRows.push([fx + 1, fx + 28, z]);
        // 산울타리: 두 줄, 들쭉날쭉한 윗면
        for (let x = fx - 2; x <= fx + 31; x++) for (const z of [fz - 2, fz - 1, fz + 26, fz + 27]) {
          const gg = MH.g(w, x, z);
          if (gg < 0 || wet(x, z) || w.get(x, gg + 1, z) || MH.polyDist(x, z, westPath) < 7 || (x >= BRX0 - 4 && x <= BRX1 + 12 && z >= BRZ0 - 4 && z <= BRZ1 + 4)) continue;
          const ht = 3 + (n.fbm(x * 0.3, z * 0.3, 2) * 3 | 0);
          for (let k = 1; k <= ht; k++) w.set(x, gg + k, z, hash3(x, k, z) > 0.7 ? B.hedge2 : B.hedge);
        }
      }
      // 붉은 헛간: 낱돌 기초, 세로 판자와 덧대기 살, 흰 모서리, 기와 지붕
      const barn = { x0: 100, z0: 252, x1: 127, z1: 271 };
      const BY = MH.maxG(w, barn.x0 - 2, barn.z0 - 2, barn.x1 + 2, barn.z1 + 2) + 1;
      for (let z = barn.z0 - 1; z <= barn.z1 + 1; z++) for (let x = barn.x0 - 1; x <= barn.x1 + 1; x++) {
        const gg = MH.g(w, x, z), edge = x === barn.x0 - 1 || x === barn.x1 + 1 || z === barn.z0 - 1 || z === barn.z1 + 1;
        for (let y = Math.min(gg, BY) - 1; y <= BY + 1; y++) w.set(x, y, z, !edge ? B.mortar : y === BY + 1 ? B.sill : (stoneAt((z === barn.z0 - 1 || z === barn.z1 + 1) ? x : z, y, 41) || (y <= gg ? B.mortar : 0)));
      }
      const BFH = 18, BT = BY + 2 + BFH;
      w.box(barn.x0, BY + 2, barn.z0, barn.x1, BT - 1, barn.z1, B.barnR);
      { const S = SIDES(barn.x0, barn.z0, barn.x1, barn.z1);
        for (const k of ['s', 'n', 'e', 'w']) {
          const sd = S[k];
          for (let u = sd.u0; u <= sd.u1; u++) for (let y = BY + 2; y < BT; y++) {
            if (u <= sd.u0 + 1 || u >= sd.u1 - 1) { put(sd, u, y, 0, B.trim); continue; }
            if ((u - sd.u0) % 4 === 0) put(sd, u, y, 1, B.barnR2);
          }
          for (let u = sd.u0 - 1; u <= sd.u1 + 1; u++) put(sd, u, BT - 1, 1, B.trim);
          // 작은 창 둘(흰 십자틀)
          if (k === 's' || k === 'n') for (const c of [sd.u0 + 6, sd.u1 - 10]) for (let r = 0; r < 5; r++) for (let q = 0; q < 5; q++) {
            put(sd, c + q, BY + 10 + r, 1, (q === 0 || q === 4 || r === 0 || r === 4 || q === 2 || r === 2) ? B.trim : 0);
            if (!(q === 0 || q === 4 || r === 0 || r === 4 || q === 2 || r === 2)) put(sd, c + q, BY + 10 + r, 0, B.win);
          }
        } }
      const barnPeak = roof(barn.x0, barn.x1, barn.z0, barn.z1, BT, { axis: 'x', mat: 'tile', gable: B.barnR, gutter: true, foot: BY + 2 });
      // 건초 다락 문과 도르래 들보(동쪽 박공)
      const bmid = Math.floor((barn.z0 + barn.z1) / 2);
      for (let y = BT; y <= BT + 5; y++) for (let z = bmid - 3; z <= bmid + 3; z++) {
        const edge = Math.abs(z - bmid) === 3 || y === BT + 5;
        w.set(barn.x1, y, z, edge ? B.trim : (hash3(z, y, 1) > 0.5 ? B.hay : B.hay2)); w.set(barn.x1 + 1, y, z, edge ? B.trim : 0);
      }
      w.box(barn.x1 + 1, BT + 8, bmid, barn.x1 + 7, BT + 8, bmid, B.wood); w.set(barn.x1 + 7, BT + 7, bmid, B.iron); w.box(barn.x1 + 7, BT + 2, bmid, barn.x1 + 7, BT + 6, bmid, B.rope);
      for (const [hx, hz, al] of [[90, 284, 1], [94, 294, 0], [136, 262, 1], [140, 280, 0]]) {
        const gg = g(hx + 2, hz + 2); if (wet(hx, hz)) continue;
        hayBale(hx, gg + 1, hz, al); hayBale(hx + (al ? 0 : 4), gg + 1, hz + (al ? 4 : 0), al); hayBale(hx + (al ? 0 : 2), gg + 4, hz + (al ? 2 : 0), al);
      }
      // 짐수레(헛간 앞): 판자 바닥, 옆널과 말뚝, 바퀴(테·바퀴살·쇠 바퀴통), 끌채, 건초 짐
      { const cx = barn.x1 + 9, cz0 = barn.z0 - 9, gg = g(cx + 3, cz0 + 6), yb = gg + 4;
        for (let z = cz0; z <= cz0 + 13; z++) for (let x = cx; x <= cx + 6; x++) {
          w.set(x, yb, z, B.plank);
          const edge = x === cx || x === cx + 6 || z === cz0 || z === cz0 + 13;
          if (edge) { w.set(x, yb + 1, z, (z - cz0) % 4 === 0 || (x - cx) % 3 === 0 ? B.wood : B.plank); w.set(x, yb + 2, z, (z - cz0) % 4 === 0 ? B.wood : B.plank); if ((z - cz0) % 4 === 0 && (x === cx || x === cx + 6)) w.set(x, yb + 3, z, B.wood); }
          else { w.set(x, yb + 1, z, B.hay); if (hash3(x, 3, z) > 0.25) w.set(x, yb + 2, z, B.hay2); if (x > cx + 1 && x < cx + 5 && z > cz0 + 2 && z < cz0 + 11) w.set(x, yb + 3, z, B.hay); }
        }
        for (const wx2 of [cx - 1, cx + 7]) {
          for (let dy = -5; dy <= 5; dy++) for (let dz = -5; dz <= 5; dz++) {
            const r = Math.hypot(dy, dz); if (r > 4.6) continue;
            const ang = Math.atan2(dy, dz), sp = ((ang / (Math.PI / 3)) % 1 + 1) % 1;
            if (r > 3.6) w.set(wx2, yb - 0 + dy, cz0 + 7 + dz, r > 4.2 ? B.iron : B.wood);
            else if (r < 1.2) w.set(wx2, yb + dy, cz0 + 7 + dz, B.ironDk);
            else if (sp < 0.12 || sp > 0.88) w.set(wx2, yb + dy, cz0 + 7 + dz, B.wood);
          }
        }
        for (let x = cx - 1; x <= cx + 7; x++) w.set(x, yb, cz0 + 7, B.wood);
        for (const sx2 of [cx + 1, cx + 5]) w.line(sx2, yb, cz0 - 1, sx2, gg + 2, cz0 - 9, B.wood);
        w.box(cx + 1, gg + 2, cz0 - 9, cx + 5, gg + 2, cz0 - 9, B.wood); }
      // 헛간 큰 문짝(동쪽): 양쪽으로 열리면 건초가 날린다. 문짝은 판자 + 흰 테 + X 가새
      const BDX = barn.x1, BZ = bmid - 4;
      w.box(BDX - 8, BY + 2, BZ, BDX + 1, BY + 11, BZ + 7, 0);
      w.box(BDX - 9, BY + 1, BZ, BDX, BY + 1, BZ + 7, B.plank);
      for (let k = 0; k < 3; k++) hayBale(BDX - 8, BY + 2 + k * 3, BZ + 1 - (k === 2 ? 0 : 0), false);
      for (let z = BZ - 1; z <= BZ + 8; z++) w.set(BDX + 1, BY + 12, z, B.trim);
      for (let y = BY + 2; y <= BY + 12; y++) { w.set(BDX + 1, y, BZ - 1, B.trim); w.set(BDX + 1, y, BZ + 8, B.trim); }
      const bdL = w.prop({ name: 'bdoorL', pivot: [BDX + 1, BY + 2, BZ] }), bdR = w.prop({ name: 'bdoorR', pivot: [BDX + 1, BY + 2, BZ + 8] });
      for (const [p, z0] of [[bdL, BZ], [bdR, BZ + 4]]) for (let r = 0; r < 10; r++) for (let c = 0; c < 4; c++) {
        const edge = r === 0 || r === 9 || c === 0 || c === 3, diag = Math.abs(Math.round(r * 3 / 9) - c) === 0 || Math.abs(Math.round((9 - r) * 3 / 9) - c) === 0;
        p.set(BDX, BY + 2 + r, z0 + c, edge || diag ? B.trim : B.barnR);
      }
      bdL.set(BDX + 1, BY + 6, BZ + 3, B.iron); bdR.set(BDX + 1, BY + 6, BZ + 4, B.iron);
      acts.push({
        name: '헛간 문', hint: '붉은 헛간의 큰 문이 활짝 열리고 건초가 날려요', hit: [BDX - 1, BY + 2, BZ, BDX + 2, BY + 11, BZ + 7],
        run: async a => {
          await Promise.all([a.turn('bdoorL', [0, 1.5, 0], 1.3), a.turn('bdoorR', [0, -1.5, 0], 1.3)]);
          for (let k = 0; k < 4; k++) { a.burst([BDX + 3, BY + 6, BZ + 4], { n: 30, colors: ['#dcb456', '#e8c870', '#c8a050'], speed: 9, up: 5, life: 1.6, gravity: 4, spread: 2.4 }); await a.wait(0.4); }
          await a.wait(1);
          await Promise.all([a.turn('bdoorL', [0, 0, 0], 1.2), a.turn('bdoorR', [0, 0, 0], 1.2)]);
        },
      });
      landmarks.push({ name: '붉은 헛간', note: '건초 다락과 짐수레', p: [barn.x0 + 14, barnPeak + 8, bmid] });

      // ───────── 북동쪽 언덕: 사과주 저장고 · 과수원 · 벌통 · 비둘기 탑 ─────────
      MH.path(w, [[millX + 36, mz + 8], [260, 92], [274, 72], [274, 52]], 3.2, B.path);
      const cid = house({ x: 262, z: 26, sx: 28, sz: 20, floors: 2, fh: 12, face: 's', roof: 'tile', wall: B.plaster2, shutter: B.shutter2, stone: 1, chimney: true, box: true });
      if (cid.chimney) smokes.push(cid.chimney);
      const PY = cid.y - 1;
      MH.flatten(w, 254, cid.z1 + 5, 300, 76, PY, B.cobble, B.rock);
      MH.skirt(w, 254, cid.z1 + 5, 300, 76, PY, { R: 14, rate: 1, surf: (x, z) => grassAt(x, z), fill: B.dirt });
      for (const [bx, bz2, st] of [[cid.x0 + 3, cid.z1 + 9, 0], [cid.x0 + 8, cid.z1 + 9, 0], [cid.x0 + 5, cid.z1 + 9, 1], [cid.x1 - 3, cid.z1 + 9, 0]]) barrel(w, bx, PY + 1 + st * 7, bz2);
      for (const bx of [cid.x1 - 12, cid.x1 - 8]) { crate(w, bx, PY + 1, cid.z1 + 7, 4); for (let dx = 0; dx < 4; dx++) for (let dz = 0; dz < 4; dz++) if ((dx + dz) % 3) w.set(bx + dx, PY + 5, cid.z1 + 7 + dz, B.apple); }
      if (cid.lamp) lights.push({ p: cid.lamp, c: '#ffd890', i: 0.9, d: 20, flicker: 0.1, night: true });
      landmarks.push({ name: '사과주 저장고', note: '땅속 저장고에서 사과주가 익는다', p: [cid.x0 + 14, cid.peak + 10, cid.z0 + 10], tag: 'CIDER' });
      const orchard = [];
      for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
        const x = 266 + c * 18 + (r % 2) * 8, z = 88 + r * 16;
        if (x > W - 10) continue;
        const gg = g(x, z);
        if (gg < base || w.get(x, gg + 1, z)) continue;
        for (let dz = -4; dz <= 4; dz++) for (let dx = -4; dx <= 4; dx++) if (Math.abs(dx) + Math.abs(dz) <= 6 && w.get(x + dx, MH.g(w, x + dx, z + dz), z + dz) !== B.cobble) MH.paint(w, x + dx, z + dz, B.grass3);
        tree(x, gg + 1, z, { h: 11, r: 6, trunkR: 1.5, branches: 3, leaves: [B.leaf2, B.leaf, B.leafDk], fruit: B.apple });
        orchard.push([x, gg, z]);
      }
      if (orchard[1]) { const [x, gg, z] = orchard[1]; w.line(x + 6, gg + 1, z + 5, x + 4, gg + 12, z + 3, B.wood); w.line(x + 8, gg + 1, z + 3, x + 6, gg + 12, z + 1, B.wood); for (let k = 2; k < 11; k += 2) w.line(x + 6 - k * 0.18, gg + 1 + k, z + 5 - k * 0.18, x + 8 - k * 0.18, gg + 1 + k, z + 3 - k * 0.18, B.wood); barrel(w, x - 6, gg + 1, z + 6, 5); }
      landmarks.push({ name: '사과 과수원', note: '꿀벌이 꽃가루를 나르는 언덕 과수원', p: [296, g(296, 100) + 28, 100] });
      // 벌통 다섯(장식): 다리, 층층 상자, 들머리, 지붕 뚜껑
      for (const [hx, hz] of [[268, 118], [278, 120], [288, 118], [298, 120], [308, 118]]) {
        const gg = MH.maxG(w, hx - 1, hz - 1, hx + 5, hz + 5);
        MH.flatten(w, hx - 3, hz - 3, hx + 7, hz + 7, gg, B.grass2, B.dirt);
        for (const [lx, lz] of [[hx, hz], [hx + 4, hz], [hx, hz + 4], [hx + 4, hz + 4]]) w.box(lx, gg + 1, lz, lx, gg + 2, lz, B.wood);
        for (let y = gg + 3; y <= gg + 9; y++) w.box(hx, y, hz, hx + 4, y, hz + 4, ((y - gg) >> 1) % 2 ? B.hive : B.hiveDk);
        w.box(hx + 1, gg + 3, hz + 5, hx + 3, gg + 3, hz + 5, B.plank); w.box(hx + 1, gg + 4, hz + 4, hx + 3, gg + 4, hz + 4, B.hole);
        w.box(hx - 1, gg + 10, hz - 1, hx + 5, gg + 10, hz + 5, B.wood); w.box(hx, gg + 11, hz, hx + 4, gg + 11, hz + 4, B.tileDk); w.box(hx + 1, gg + 12, hz + 1, hx + 3, gg + 12, hz + 3, B.tileDk);
        for (let q = 0; q < 10; q++) { const fx = hx - 2 + (q * 3) % 10, fz = hz + 8 + (q % 3); const fg = MH.g(w, fx, fz); if (fg > 0 && !w.get(fx, fg + 1, fz)) flowerAt(w, fx, fg + 1, fz, [B.lavender, B.flower2, B.flower, B.flower3][q % 4], q % 2); }
      }
      // 비둘기 탑
      const DX = 244, DZ = 60, dg = g(DX, DZ) + 1;
      MH.flatten(w, DX - 10, DZ - 10, DX + 10, DZ + 10, dg - 1, B.path, B.dirt);
      for (let y = dg; y < dg + 22; y++) { w.cyl(DX, DZ, y, y, 7.2, (y - dg) % 8 >= 6 ? B.sill : B.plaster); }
      for (let y = dg; y <= dg + 1; y++) w.ring(DX, DZ, y, 6, 8.2, B.st2);
      for (const yy of [dg + 10, dg + 16]) for (let a = 0; a < 10; a++) {
        const ang = a / 10 * Math.PI * 2 + (yy - dg) * 0.1;
        for (const dy of [0, 1]) w.set(Math.round(DX + Math.cos(ang) * 7), yy + dy, Math.round(DZ + Math.sin(ang) * 7), B.hole);
        w.set(Math.round(DX + Math.cos(ang) * 8), yy - 1, Math.round(DZ + Math.sin(ang) * 8), B.wood);
      }
      for (let r = 0; r < 8; r++) for (let c = -1; c <= 1; c++) w.set(DX + c, dg + r, DZ + 7, (r === 7 || Math.abs(c) === 1) ? B.doorDk : B.door);
      let dtop = dg + 22; for (let rr = 10, k = 0; rr > 0.4; rr -= 0.6, k++) { w.cyl(DX, DZ, dtop + k, dtop + k, rr, k === 0 ? B.tileDk : (k % 2 ? B.tile : B.tile3)); if (rr - 0.6 <= 0.4) dtop = dtop + k + 1; }
      w.box(DX, dtop, DZ, DX, dtop + 3, DZ, B.iron); w.box(DX - 2, dtop + 3, DZ, DX + 2, dtop + 3, DZ, B.iron);
      landmarks.push({ name: '비둘기 탑', note: '편지를 나르는 흰 비둘기', p: [DX + 0.5, dtop + 10, DZ + 0.5] });

      // ───────── 숲 ─────────
      for (let i = 0; i < 120; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), gg = MH.g(w, x, z), gb = w.get(x, gg, z);
        if (gg < base || wet(x, z) || w.get(x, gg + 1, z) || gb === B.soil || gb === B.soilDk || gb === B.cobble || gb === B.path || gb === B.bank) continue;
        if ((x > 200 && z > 120) || (x > 232 && z < 132) || (x < 148 && z > 174) || MH.dist(x, z, WX, WZ) < 44 || MH.dist(x, z, millX + 16, mz) < 50 || MH.dist(x, z, wx - 20, mz + 20) < 44 || MH.dist(x, z, wx - 45, mz + 50) < 22 || Math.abs(x - rX(z)) < 22 || MH.dist(x, z, DX, DZ) < 16) continue;
        if (z < 104) tree(x, gg + 1, z, { kind: 'pine', h: w.ri(26, 40), trunkR: 1.6, r: 8, leaves: [B.leaf, B.leafDk, B.leafDk] });
        else { const birch = i % 4 === 0; tree(x, gg + 1, z, { h: w.ri(14, 19), r: w.r(6.4, 8.6), trunkR: w.r(1.5, 2), bark: birch ? B.birch : B.bark, barkDk: birch ? B.birchDk : B.barkDk, birch, leaves: [B.leaf2, B.leaf, B.leafDk], fruit: i % 5 === 0 ? B.apple : null }); }
      }

      // ───────── 나룻배와 나루터 ─────────
      const RZ = 244, RX = Math.round(rX(RZ + 7));
      { const jy = UPL + 2, jx0 = Math.round(rX(RZ + 7) + 12);
        for (let x = jx0; x <= jx0 + 14; x++) for (let z = RZ + 4; z <= RZ + 9; z++) { w.set(x, jy, z, (x - jx0) % 3 === 2 ? B.wood : B.plank); for (let y = jy + 1; y <= jy + 6; y++) w.set(x, y, z, 0); }
        for (const x of [jx0, jx0 + 6, jx0 + 12]) for (const z of [RZ + 4, RZ + 9]) for (let y = MH.g(w, x, z) + 1; y < jy; y++) w.set(x, y, z, B.wood);
        w.box(jx0, jy + 1, RZ + 3, jx0, jy + 4, RZ + 3, B.wood); w.set(jx0, jy + 5, RZ + 3, B.rope); w.set(jx0, jy + 3, RZ + 4, B.rope);
        w.box(jx0 + 1, jy + 1, RZ + 3, jx0 + 1, jy + 3, RZ + 3, B.rope); }
      const boat = w.prop({ name: 'rowboat', pivot: [RX + 0.5, UPL, RZ + 7.5], bob: 0.3, bobSpeed: 1.4, rock: 0.04, rockSpeed: 1.1, axis: 'z' });
      for (let k = 0; k < 14; k++) {
        const t = k / 13, hw = Math.max(0, Math.round(3.4 * Math.sin(Math.PI * Math.min(1, t * 1.1 + 0.04)))), z = RZ + 1 + k;
        boat.set(RX, UPL - 1, z, B.wood);
        for (let dx = -hw; dx <= hw; dx++) {
          const side = Math.abs(dx) === hw;
          boat.set(RX + dx, UPL, z, side ? B.wood : B.plank);
          if (side) { boat.set(RX + dx, UPL + 1, z, B.plank); boat.set(RX + dx, UPL + 2, z, B.wood); boat.set(RX + dx, UPL + 3, z, B.frameDk); }
        }
        if (hw === 0) for (let y = UPL; y <= UPL + 4; y++) boat.set(RX, y, z, B.wood);
        if (k === 4 || k === 9) for (let dx = -hw + 1; dx <= hw - 1; dx++) boat.set(RX + dx, UPL + 2, z, B.plank);
      }
      for (const s of [-1, 1]) { boat.set(RX + s * 3, UPL + 4, RZ + 7, B.iron); for (let k = 0; k <= 6; k++) boat.set(RX + s * (3 + k), UPL + 4 - Math.round(k * 0.6), RZ + 7 + Math.round(k * 0.4), B.wood); boat.box(RX + s * 9, UPL, RZ + 9, RX + s * 10, UPL, RZ + 10, B.plank); }
      crate(boat, RX - 1, UPL + 1, RZ + 10, 3); sack(boat, RX - 1, UPL + 1, RZ + 2, B.sack);
      boat.box(RX, UPL + 1, RZ + 13, RX, UPL + 9, RZ + 13, B.wood); boat.box(RX, UPL + 9, RZ + 14, RX, UPL + 9, RZ + 15, B.iron);
      boat.set(RX, UPL + 8, RZ + 15, B.ironDk); boat.box(RX, UPL + 6, RZ + 15, RX, UPL + 7, RZ + 15, B.lamp); boat.set(RX, UPL + 5, RZ + 15, B.ironDk);
      const rDown = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84].map(dz => [rX(RZ + 7 + dz) - rX(RZ + 7), 0, dz]);
      acts.push({
        name: '나룻배', hint: '나룻배가 강물을 따라 마을 밖으로 내려가고, 다음 배가 나루터에 들어와요', hit: [RX - 8, UPL, RZ, RX + 8, UPL + 8, RZ + 15],
        run: async a => {
          for (let k = 0; k < 3; k++) a.burst([RX + 0.5 + (k - 1) * 6, UPL + 1, RZ + 8], { n: 12, colors: ['#ffffff', '#d8f0ff'], speed: 4, up: 3, life: 0.8, gravity: 12, spread: 1.2 });
          await a.drive('rowboat', rDown, 8, { fwd: '+z', back: 1.0 });
        },
      });

      // ───────── 풀과 들꽃 ─────────
      MH.scatter(w, 14000, (x, gg, z, b) => {
        if (!(b === B.grass || b === B.grass2 || b === B.grass3) || !w.chance(0.2)) return;
        if (w.chance(0.7)) { w.set(x, gg + 1, z, B.fern); if (hash3(x, gg, z) > 0.6) w.set(x, gg + 2, z, B.fern); }
        else flowerAt(w, x, gg + 1, z, w.pick(FLW), w.chance(0.4));
      });
      // 돌길 무늬 입히기
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const gg = MH.g(w, x, z); if (gg > 0 && w.get(x, gg, z) === B.cobble) w.set(x, gg, z, paveAt(x, z)); }

      // ───────── 라벤더 바람: 라벤더 포기 이랑(부품)과 둘레 들꽃 꽃밭(부품) ─────────
      const sway = { rows: [], beds: [], trees: [] };
      { let k = 0;
        for (const [rx0, rx1, rz] of lavRows) {
          const vox = [];
          for (let tx = rx0; tx <= rx1; tx += 3) {
            const gg = MH.g(w, tx, rz); if (gg < 0 || w.get(tx, gg, rz) !== B.soil && w.get(tx, gg, rz) !== B.soilDk) continue;
            const hh = hash3(tx, 4, rz), ht = 4 + (hh * 3 | 0);
            const cell = (x, z, dy, b) => { const g2 = MH.g(w, x, z); if (g2 >= 0 && !w.get(x, g2 + dy, z)) vox.push([x, g2 + dy, z, b]); };
            for (const [dx, dz] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) cell(tx + dx, rz + dz, 1, B.lavenderStem);
            cell(tx, rz, 2, B.lavenderStem);
            for (let y = 3; y <= ht; y++) cell(tx, rz, y, y === ht ? B.lavender2 : B.lavender);
            for (const [dx, dz] of [[1, 0], [-1, 0], [0, hh > 0.5 ? 1 : -1]]) { cell(tx + dx, rz + dz, 2, B.lavenderStem); for (let y = 3; y <= ht - 1; y++) cell(tx + dx, rz + dz, y, (y + dx) % 2 ? B.lavender : B.lavender2); }
          }
          if (vox.length < 10) continue;
          const xs = vox.map(v => v[0]), cx = (Math.min(...xs) + Math.max(...xs) + 1) / 2;
          const gy = Math.round(vox.reduce((s2, v) => s2 + MH.g(w, v[0], v[2]), 0) / vox.length) + 1;
          const name = 'lavrow' + k++;
          const pr = w.prop({ name, pivot: [cx, gy, rz + 0.5] });
          for (const [x, y, z, b] of vox) pr.set(x, y, z, b);
          sway.rows.push({ kind: 'row', name, x: cx, z: rz, half: (Math.max(...xs) - Math.min(...xs)) / 2, top: [cx, gy + 5, rz + 0.5] });
        }
        // 라벤더 밭 둘레의 들꽃: 24칸 안쪽 풀밭에 심고 12칸 격자로 묶는다
        const near = (x, z) => lavRows.some(([a0, a1, rz]) => x >= a0 - 24 && x <= a1 + 24 && Math.abs(z - rz) <= 24);
        const fx0 = Math.min(...lavRows.map(r => r[0])) - 24, fx1 = Math.max(...lavRows.map(r => r[1])) + 24;
        const fz0 = Math.min(...lavRows.map(r => r[2])) - 24, fz1 = Math.max(...lavRows.map(r => r[2])) + 24;
        const cells = new Map();
        for (let z = Math.max(1, fz0); z <= Math.min(D - 2, fz1); z++) for (let x = Math.max(1, fx0); x <= Math.min(W - 2, fx1); x++) {
          const gg = MH.g(w, x, z); if (gg < 0 || !near(x, z)) continue;
          const b = w.get(x, gg, z);
          if (!(b === B.grass || b === B.grass2 || b === B.grass3) || w.get(x, gg + 1, z) || w.get(x, gg + 2, z) || w.get(x, gg + 3, z) || hash3(x, 77, z) > 0.07) continue;
          const key = ((x / 12) | 0) + ',' + ((z / 12) | 0);
          if (!cells.has(key)) cells.set(key, []);
          const hh = hash3(x, 78, z), head = [B.flower, B.flower2, B.flower3, B.lavender, B.flower5][(hh * 5) | 0];
          cells.get(key).push([x, gg + 1, z, head, hh > 0.5]);
        }
        const LAVC = { [B.lavender]: '#8a6ac8', [B.flower]: '#e86a8a', [B.flower2]: '#f0e060', [B.flower3]: '#ffffff', [B.flower5]: '#7a8ae8' };
        let q = 0;
        for (const fl of cells.values()) {
          if (fl.length < 3) continue;
          const n2 = fl.length, cx = fl.reduce((s2, v) => s2 + v[0], 0) / n2 + 0.5, cz = fl.reduce((s2, v) => s2 + v[2], 0) / n2 + 0.5, cy = Math.round(fl.reduce((s2, v) => s2 + v[1], 0) / n2);
          const name = 'lavbed' + q++;
          const pr = w.prop({ name, pivot: [cx, cy, cz] });
          for (const [x, y, z, b, tall] of fl) flowerAt(pr, x, y, z, b, tall);
          const colors = [...new Set(fl.map(v => LAVC[v[3]]))];
          if (colors.length < 2) colors.push(colors[0] === '#ffffff' ? '#fff4d0' : '#ffffff');
          sway.beds.push({ kind: 'bed', name, x: cx, z: cz, half: Math.max(2, Math.max(...fl.map(v => Math.hypot(v[0] + 0.5 - cx, v[2] + 0.5 - cz)))), top: [cx, cy + 2.4, cz], colors });
        }
        const tops = new Map();
        for (let z = Math.max(0, fz0 - 20); z <= Math.min(D - 1, fz1 + 8); z++) for (let x = Math.max(0, fx0 - 12); x <= Math.min(W - 1, fx1 + 16); x++) {
          const ty = w.top(x, z), b = w.get(x, ty, z);
          if (!(b === B.leaf || b === B.leaf2 || b === B.leafDk || b === B.leafLt)) continue;
          const key = ((x / 16) | 0) + ',' + ((z / 16) | 0), c = tops.get(key);
          if (!c || ty > c[1]) tops.set(key, [x + 0.5, ty, z + 0.5]);
        }
        sway.trees = [...tops.values()].sort((p1, p2) => p2[2] - p1[2]).slice(0, 8); }
      const L0 = lavs[0] || [60, 240], lg0 = g(L0[0], L0[1]);
      acts.push({
        name: '라벤더 바람', hint: '바람이 밭을 쓸고 지나가며 라벤더와 들꽃이 물결치고 꽃잎이 흩날려요', hit: [L0[0] - 12, lg0 + 1, L0[1] - 10, L0[0] + 12, lg0 + 6, L0[1] + 10],
        run: async a => {
          a.wind(4, 6.6);
          a.spin('blades', 2.4, 6.5);
          const LAV = ['#8a6ac8', '#b89ae8', '#e0d0ff', '#6a4aa8'];
          const swing = async (p, delay, amp, pass) => {
            await a.wait(delay);
            if (p.kind === 'row') {
              a.burst(p.top, { n: pass ? 5 : 8, colors: LAV, speed: 4.4, up: 4.4, life: 2.2, gravity: -0.3, spread: p.half, flat: true });
              await a.turn(p.name, [amp, 0, 0], 0.42);
              await a.turn(p.name, [-amp * 0.4, 0, 0], 0.5);
              await a.turn(p.name, [amp * 0.45, 0, 0], 0.42);
              await a.turn(p.name, [0, 0, 0], 0.5);
            } else {
              a.burst(p.top, { n: pass ? 4 : 6, colors: p.colors, speed: 4, up: 4.8, life: 2, gravity: -0.2, spread: p.half, flat: true });
              await a.move(p.name, [0, 0, amp], 0.42);
              await a.move(p.name, [0, 0, -amp * 0.4], 0.5);
              await a.move(p.name, [0, 0, amp * 0.4], 0.42);
              await a.move(p.name, [0, 0, 0], 0.5);
            }
          };
          const all = sway.rows.concat(sway.beds), z0 = Math.min(...all.map(p => p.z)), x0 = Math.min(...all.map(p => p.x));
          const jobs = [];
          for (let pass = 0; pass < 2; pass++) {
            const t0 = pass * 3;
            for (const p of all) jobs.push(swing(p, t0 + (p.z - z0) * 0.021 + (p.x - x0) * 0.004, (p.kind === 'row' ? 0.42 : 0.64) * (pass ? 0.7 : 1), pass));
            sway.trees.forEach(t => jobs.push(a.wait(t0 + 0.3 + (t[2] - z0) * 0.021).then(() => a.burst(t, { n: pass ? 5 : 8, colors: ['#4a8a3a', '#6aaa48', '#a8c860'], speed: 4.4, up: 1.6, life: 2.6, gravity: 2, spread: 5, flat: true }))));
          }
          for (let k = 0; k < 3; k++) { for (const [lx, lz] of lavs) a.burst([lx + (k - 1) * 6, g(lx, lz) + 6, lz], { n: 5, colors: ['#ffd23a', '#2a2018', '#fff080'], speed: 5, up: 3, life: 2, gravity: -0.4, spread: 6, flat: true }); await a.wait(0.9); }
          await Promise.all(jobs);
        },
      });

      const smoke = smokes.concat(mill.chimney ? [mill.chimney] : []).map(c => ({ n: 30, colors: ['#e8e8e8', '#c8c8c8'], mode: 'rise', speed: 1.2, area: [c[0], c[2], 1.2], y0: c[1], y1: c[1] + 40, glow: false }));
      return { lights, landmarks, acts, particles: smoke };
    },
  });
})();
