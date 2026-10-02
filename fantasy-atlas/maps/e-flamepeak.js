// 불의 정상 · 불의 거인 — 대장간 기슭에서 거대한 사슬을 건너면 펼쳐지는 비탈 설원, 그 위 바위 턱의 거인들의 대장간 (메인 보스: 불의 거인)
// 기본 시점(남동쪽)에서 북서쪽으로: 대장간 기슭 → 사슬 → 설원 → 대장간이 대각선으로 이어진다
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  const PX = 47, PZ = 55;                                   // 대장간 가마 자리(북서쪽 바위 턱)
  MAPS.push({
    id: 'flamepeak', cat: 'lands', name: '불의 정상', en: 'Flame Peak · Fire Giant', color: '#ff7a3a', seed: 613, base: 30, time: 'night', size: [W, D, Hh],
    desc: '대장간 기슭의 축복에서 거대한 사슬을 건너면 비탈진 설원이 펼쳐진다. 그 위 바위 턱에서 거인들의 대장간이 멸망의 불을 품고 타오르고, 마지막 불의 거인이 그 앞을 지킨다.',
    monsters: { normal: ['불 승병', '거인 산정 트롤', '설원 까마귀'], mid: '불 주교', boss: '불의 거인' },
    sky: ['#2a2238', '#070a16', '#b04a2a'], stars: true,
    hemi: ['#a8b8e0', '#2a2430', 0.56], sun: ['#c8d4ff', 0.42, [0.5, 1, 0.65]],
    day: { sky: ['#c8ccd8', '#6a7a98', '#ffd8b0'], stars: false, hemi: ['#f0f4ff', '#5a5a68', 0.62], sun: ['#fff4e8', 0.72, [0.5, 1, 0.65]], haze: '#b8c0d0' },
    liquid: ['#8ab8d0', '#b8dcec', '#f4ffff'], liqSpeed: 0.05,
    fog: { start: 0.78, floor: 16, depth: 12, haze: [40, 0.18, 12], hazeColor: '#3a3448' },
    camY: 22, zoom: 1.15,
    particles: [
      { n: 1300, colors: ['#ffffff', '#e8eef8', '#c8d4e8'], mode: 'fall', speed: 0.9, wind: 1.6, y0: 10, y1: 140, glow: false },
      { n: 300, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 1.6, area: [PX, PZ, 13], y0: 106, y1: 142, glow: true },
      { n: 140, colors: ['#ff8a3a', '#ffb04a', '#ffd070'], mode: 'drift', speed: 0.45, wind: 0.5, area: [92, 92, 56], y0: 40, y1: 70, glow: true },
    ],
    blocks: {
      snow: { c: '#9aa6b8', top: '#eef2f8', v: 0.04 }, snow2: { c: '#9aa6b8', top: '#dde4ee', v: 0.05 }, snowDk: { c: '#7a8698', top: '#bcc8d8', v: 0.05 },
      snowFt: { c: '#7e8aa0', top: '#a4b0c6', v: 0.04 }, snowPath: { c: '#7c7c88', top: '#a8acb8', v: 0.06, pat: 'stone' },
      rock: { c: '#5c5a62', v: 0.06, pat: 'stone' }, rockDk: { c: '#403e48', v: 0.06, pat: 'stone' }, cliff: { c: '#6a6872', v: 0.06, pat: 'big' }, basalt: { c: '#2c2830', v: 0.06, pat: 'stone' },
      ice: { c: '#8ac4dc', top: '#c4e8f4', v: 0.04 }, iceDk: { c: '#5a9ab8', v: 0.04 }, icicle: { c: '#d4f0fa', v: 0.03 },
      pot: { c: '#3e3a3a', v: 0.05, pat: 'big' }, potBand: { c: '#5c544c', v: 0.04 }, potRim: { c: '#6a625a', v: 0.04 }, rivet: { c: '#8a8278', v: 0.02 },
      chain: { c: '#4a4646', v: 0.05 }, iron: { c: '#2e2c30', v: 0.03 },
      ember: { c: '#ff6a1a', glow: true }, ember2: { c: '#ffb040', glow: true }, flame: { c: '#ffe08a', glow: true }, coal: { c: '#2a1c18', v: 0.06 }, scorch: { c: '#3a2e2a', top: '#4a3a32', v: 0.08 },
      bone: { c: '#c8c0b0', v: 0.06, pat: 'big' }, boneDk: { c: '#a09888', v: 0.06, pat: 'stone' },
      stone: { c: '#8a8690', v: 0.05, pat: 'brick' }, stoneDk: { c: '#6a6670', v: 0.05, pat: 'brick' },
      leafY: { c: '#c8902a', top: '#e8b840', v: 0.1 }, leafYs: { c: '#d8a838', top: '#eef2f8', v: 0.08 }, leafY2: { c: '#a8701e', top: '#c8902a', v: 0.1 },
      trunk: { c: '#3a2c26', v: 0.05 }, trunkDk: { c: '#241c1a', v: 0.05 },
      grace: { c: '#ffe9a0', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sst = MH.sstep, S = Math.SQRT1_2;
      // 대각선 좌표: u는 남동쪽(기본 시점 쪽), v는 북동쪽(화면 오른쪽)
      const U = (x, z) => (x + z - 192) * S, V = (x, z) => (x - z) * S;
      const XZ = (u, v) => [Math.round(96 + (u + v) * S), Math.round(96 + (u - v) * S)];
      const PR = 30, PL = base + 36;                         // 대장간 바위 턱
      const LG = base - 2;                                   // 대장간 기슭(축복 턱)
      const rimU = v => 50 + n.fbm(v * 0.08, 1.7, 2) * 5 - 2.5;     // 설원 끝(낭떠러지 북쪽 벽)
      const ledgeU = v => 66 + n.fbm(v * 0.08, 5.1, 2) * 4 - 2;     // 기슭 시작
      const gorgeW = u => 10 + Math.max(0, u - 66) * 0.25;
      const [ACX, ACZ] = XZ(-6, 0);                          // 거인이 서는 설원 한가운데
      // 칸마다 구역(설원·낭떠러지·기슭·협곡 벽)을 미리 정해 둔다(속 블록마다 다시 계산하지 않게)
      const ZN = new Uint8Array(W * D), ZK = ['field', 'chasm', 'ledge', 'wall'];
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) { const u = U(x, z), v = V(x, z); ZN[x + W * z] = u > ledgeU(v) && Math.abs(v) < gorgeW(u) + 7 ? (Math.abs(v) > gorgeW(u) + 0.5 ? 3 : 2) : (u > rimU(v) ? 1 : 0); }
      const zone = (x, z) => (x < 0 || z < 0 || x >= W || z >= D) ? 'field' : ZK[ZN[x + W * z]];
      MH.terrain(w, {
        floor: base - 26,
        height: (x, z) => {
          const u = U(x, z), v = V(x, z);
          let h;
          if (u > ledgeU(v) && Math.abs(v) < gorgeW(u) + 7) {
            // 대장간 기슭: 낭떠러지로 튀어나온 바위 곶, 양옆은 불씨 박힌 낮은 바위벽
            h = LG + n.fbm(x * 0.08, z * 0.08, 2) * 1.5;
            const gw = Math.abs(v) - gorgeW(u);
            if (gw > 0) h = LG + Math.min(13, gw * 2.4 + n.ridge(x * 0.07, z * 0.07, 3) * 5);
          } else if (u > rimU(v)) h = base - 24 + n.fbm(x * 0.15, z * 0.15, 2) * 3;
          else {
            // 설원: 대장간 쪽으로 오르는 비탈, 넓은 기복과 바람에 쌓인 눈 물결
            h = base + 4 + (rimU(v) - u) * 0.2 + n.fbm(x * 0.03, z * 0.03) * 5 + Math.max(0, Math.sin(u * 0.13 + v * 0.05 + n.fbm(x * 0.05, z * 0.05) * 3)) * 1.4;
            // 양옆 산줄기
            // 낭떠러지 가까이에선 산이 낮아져 설원 끝이 고르게 이어진다
            const hv = 52 + n.fbm(u * 0.04 + 9, 3.3, 2) * 12, s = Math.abs(v) - hv, fz = sst(rimU(v) + 2, rimU(v) - 26, u);
            if (s > -8) h += ((s + 8) * 1.15 * sst(-8, 6, s) + n.ridge(x * 0.05, z * 0.05, 3) * 12 * sst(-4, 14, s)) * fz;
            // 뒤쪽 능선과 대장간 바위 턱(산을 깎아 낸 자리)
            if (u < -36) h = Math.max(h, base + 22 + (-36 - u) * 0.9 + n.ridge(x * 0.04, z * 0.06, 3) * 6 * sst(-36, -56, u));
            const dp = Math.hypot(x - PX, z - PZ);
            h = dp <= PR ? PL : Math.max(h, PL - (dp - PR) * 2.4 + n.fbm(x * 0.2, z * 0.2, 2) * 2);
          }
          return Math.min(Hh - 10, h);
        },
        surface: (x, z, y, s) => {
          const zn = zone(x, z);
          if (zn === 'chasm') return B.rockDk;
          if (zn === 'wall') return s >= 3 ? B.basalt : B.snowDk;
          return s >= 4 ? (hash3(x, y >> 1, z) > 0.5 ? B.cliff : B.rock) : s >= 2 ? B.snowDk : (n.fbm(x * 0.13, z * 0.13, 2) > 0.58 ? B.snow2 : B.snow);
        },
        under: (x, z, y, dep, s) => {
          if (zone(x, z) === 'wall') {
            // 검은 바위벽에 불씨 박힌 금이 비스듬히 지나간다
            const c = Math.abs(((x - z) * 0.5 + y * 0.8 + hash3(x >> 3, y >> 3, z >> 3) * 6 + 400) % 9 - 4.5);
            return dep < 1 && s < 3 ? B.snowDk : (c < 0.45 && hash3(x >> 1, y >> 1, z >> 1) > 0.45 ? B.ember : (y % 4 === 0 ? B.rockDk : B.basalt));
          }
          return dep < 1 && s < 3 ? B.snow : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock);
        },
      });
      const lights = [], acts = [], landmarks = [];
      const fly = async (a, from, to, arc, steps, colors, nn) => {
        for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); }
      };

      // ── 거인들의 대장간: 쇠띠 두른 거대한 가마와 받침 ──
      for (let s = 0; s < 5; s++) w.cyl(PX, PZ, PL + 1 + s, PL + 1 + s, 24 - s * 1.2, s % 2 ? B.stone : B.stoneDk);
      const P0 = PL + 6, HP = 42, rimY = P0 + HP;
      const prof = y => y < 38 ? 13 + 10.5 * Math.pow(Math.sin(Math.PI * (y + 2) / 44), 1.15) : (y < 40 ? 15.6 : 17.6);
      const fireH = (dx, dz) => 31 + Math.round(n.fbm(dx * 0.3 + 7, dz * 0.3, 2) * 4);
      for (let y = 0; y <= HP; y++) {
        const r = prof(y), R = Math.ceil(r) + 1;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz);
          if (d > r + 0.4) continue;
          const x = PX + dx, yy = P0 + y, z = PZ + dz;
          if (y > 4 && d < r - 2.2) {
            // 안쪽: 불 높이까지 숯과 불씨로 채운다(보이지 않는 속면이 생기지 않게)
            const hh = fireH(dx, dz);
            if (y < hh - 2) w.set(x, yy, z, B.coal);
            else if (y <= hh) w.set(x, yy, z, y === hh ? (hash3(dx, y, dz) > 0.5 ? B.ember : B.ember2) : (hash3(dx, y, dz) > 0.7 ? B.coal : B.ember));
            else if (hash3(dx, 3, dz) > 0.94 && y - hh <= 1 + (hash3(dx, 4, dz) * 4 | 0)) w.set(x, yy, z, B.flame);
            continue;
          }
          const ang = Math.atan2(dz, dx), band = y % 8 === 2 || y === 37;
          let b = B.pot;
          if (band || y >= HP - 3) b = B.potBand;
          if (y >= HP - 1) b = B.potRim;
          if (band && Math.abs(Math.sin(ang * 22)) > 0.93 && d > r - 0.8) b = B.rivet;
          if (!band && y < HP - 4 && d > r - 0.8 && ((Math.round(ang * 30 / Math.PI) + (y >> 2)) % 6 === 0) && (y & 3) === 1) b = B.rivet;
          w.set(x, yy, z, b);
        }
      }
      // 손잡이 고리: 화면 좌우(북동·남서)로
      const HD = [S, -S], HT = [S, S], hOut = prof(30) + 7;
      for (const side of [-1, 1]) for (let k = 0; k < 90; k++) {
        const a = k / 90 * Math.PI * 2, rr = prof(30) + 3 + Math.cos(a) * 4, y = Math.round(P0 + 30 + Math.sin(a) * 5);
        for (const t of [-1, -0.5, 0, 0.5, 1]) w.set(Math.round(PX + side * HD[0] * rr + HT[0] * t), y, Math.round(PZ + side * HD[1] * rr + HT[1] * t), B.potBand);
      }
      lights.push({ name: 'forge', p: [PX + 0.5, P0 + 36, PZ + 0.5], c: '#ff7a2a', i: 2.2, d: 72, flicker: 0.25, srcR: 9 });
      lights.push({ name: 'forge', p: [PX + 0.5, rimY - 4, PZ + 0.5], c: '#ffb050', i: 1.1, d: 40, flicker: 0.3, srcR: 9 });
      // 치솟는 불기둥(부품, 평소엔 숨김)
      const plume = w.prop({ name: 'plume', pivot: [PX + 0.5, P0 + 38, PZ + 0.5], scl0: [0, 0, 0], clipOK: 12 });
      for (let y = 0; y < 21; y++) {
        const rr = 10 * (1 - y / 25), R = Math.ceil(rr);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz), hh = hash3(dx + 40, y, dz + 40);
          if (d > rr || (d > rr * 0.55 && hh < 0.35)) continue;
          plume.set(PX + dx, P0 + 38 + y, PZ + dz, d < rr * 0.5 ? B.flame : (hh > 0.62 ? B.ember2 : B.ember));
        }
      }
      acts.push({
        name: '거인들의 대장간', hint: '가마 속 멸망의 불이 하늘로 기둥처럼 치솟아요', hit: [PX - 16, P0, PZ - 16, PX + 16, rimY + 2, PZ + 16],
        run: async a => {
          a.flash('forge', 3.2, 5); a.glow(2, 5); a.lightning(0.3);
          a.tween('plume', { scl: [1, 1, 1] }, 0.8);
          for (let k = 0; k < 12; k++) { a.burst([PX + 0.5, rimY + 4, PZ + 0.5], { n: 60, colors: ['#ff6a1a', '#ffb040', '#ffe08a', '#ffffff'], speed: 3.5, up: 20, life: 2.2, gravity: 2, spread: 8 }); await a.wait(0.32); }
          await a.tween('plume', { scl: [0, 0, 0] }, 1.2);
        },
      });
      landmarks.push({ name: '거인들의 대장간', note: '황금 나무를 태울 멸망의 불', p: [PX + 0.5, rimY + 16, PZ + 0.5], tag: 'FORGE' });
      // 바위 턱 둘레의 무너진 거인의 돌기둥
      for (let k = 0; k < 7; k++) {
        const a = Math.PI * 0.05 + k * 0.42, x = Math.round(PX + Math.cos(a) * 27.5), z = Math.round(PZ + Math.sin(a) * 27.5), h = 6 + (hash3(k, 1, 9) * 12 | 0);
        if (Math.hypot(x - PX, z - PZ) > PR - 1) continue;
        w.box(x - 1, PL + 1, z - 1, x + 1, PL + h, z + 1, k % 2 ? B.stone : B.stoneDk);
        w.box(x - 1, PL + 1, z - 1, x + 1, PL + 1, z + 1, B.stoneDk);
        LB.crumble(w, x - 1, PL + h - 3, z - 1, x + 1, PL + h, z + 1, 0.4, 2, k);
        w.set(x, PL + h + 1, z, 0);
      }

      // ── 가마를 산에 묶은 쇠사슬(손잡이에서 양쪽 산비탈 쇠말뚝으로) ──
      const anchor = (x, z) => { const g = MH.maxG(w, x - 2, z - 2, x + 2, z + 2); w.box(x - 2, g - 3, z - 2, x + 2, g + 2, z + 2, B.iron); w.box(x - 3, g - 3, z - 3, x + 3, g - 1, z + 3, B.rockDk); return [x, g + 3, z]; };
      const aR = anchor(...XZ(-40, 58)), aL = anchor(...XZ(-36, -60));
      LB.chain(w, [PX + HD[0] * hOut, P0 + 30, PZ + HD[1] * hOut], aR, 6, B.chain, { size: 2, ice: B.icicle });
      LB.chain(w, [PX - HD[0] * hOut, P0 + 30, PZ - HD[1] * hOut], aL, 6, B.chain, { size: 2, ice: B.icicle });

      // ── 대장간 비탈길: 설원 오른쪽 위에서 바위 턱으로 오르는 길, 불 승병의 화로 ──
      const rampPosts = [], R0 = XZ(-28, 30), R1 = XZ(-38, 30), R2 = XZ(-48, 26), R3 = XZ(-54, 20);
      const rampCells = LB.ramp(w, [[R0[0], R0[1], MH.g(w, R0[0], R0[1])], [R1[0], R1[1], PL - 10], [R2[0], R2[1], PL - 5], [R3[0], R3[1], PL]], 3, {
        name: '대장간 비탈길', top: B.snowPath, edge: B.stoneDk, fill: B.rock, rail: B.stoneDk, post: B.stone, postGap: 9, postSide: 1,
        onPost: (x, y, z) => { w.set(x, y, z, B.iron); w.set(x, y + 1, z, B.ember); rampPosts.push([x, y, z]); },
      });
      const rampSet = new Set(rampCells.map(c => c[0] + 1000 * c[1]));
      const rp = rampPosts[rampPosts.length >> 1] || [R1[0], PL - 8, R1[1]];
      lights.push({ name: 'ramp', p: [rp[0] + 0.5, rp[1] + 3, rp[2] + 0.5], c: '#ff8a3a', i: 0.4, d: 30, flicker: 0.4, srcR: 26 });
      acts.push({
        name: '비탈길 화로', hint: '불 승병이 지피던 화로가 비탈길을 따라 차례로 타올라요', hit: [rp[0] - 2, rp[1] - 3, rp[2] - 2, rp[0] + 2, rp[1] + 2, rp[2] + 2],
        run: async a => { a.flash('ramp', 4, 4); for (const [x, y, z] of rampPosts) { a.burst([x + 0.5, y + 2, z + 0.5], { n: 24, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1.4, up: 8, life: 1.3, gravity: 1, spread: 0.7 }); await a.wait(0.3); } },
      });
      const g2a = Math.atan2(R3[1] - PZ, R3[0] - PX), g2x = Math.round(PX + Math.cos(g2a) * 26.5), g2z = Math.round(PZ + Math.sin(g2a) * 26.5), gp2 = LB.grace(w, g2x, PL, g2z, B.grace);
      lights.push({ name: 'grace2', p: gp2, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push({
        name: '거인들의 대장간 축복', hint: '축복의 불씨가 가마로 날아들어 멸망의 불이 거세게 일렁여요', hit: [g2x - 1, PL - 1, g2z - 1, g2x + 1, PL + 3, g2z + 1],
        run: async a => {
          a.flash('grace2', 5, 3);
          a.burst(gp2, { n: 40, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 2, up: 3, life: 1.6, gravity: -0.6, spread: 1.2 });
          await fly(a, gp2, [PX + 0.5, rimY + 3, PZ + 0.5], 34, 20, ['#ffe9a0', '#ffd060']);
          a.flash('forge', 2.4, 3); a.burst([PX + 0.5, rimY, PZ + 0.5], { n: 70, colors: ['#ffe9a0', '#ffb040', '#ff6a1a'], speed: 4, up: 12, life: 2, gravity: 2, spread: 7 });
          await a.wait(1.4);
        },
      });

      // ── 설원 한가운데: 그을린 자리 ──
      const gC = MH.g(w, ACX, ACZ);
      lights.push({ name: 'field', p: [ACX + 0.5, gC + 10, ACZ + 0.5], c: '#ff7a2a', i: 0.05, d: 72, flicker: 0.3, srcR: 30 });
      for (let k = 0; k < 6; k++) {
        const a = k * 1.7 + 0.4, rr = 6 + (k % 3) * 4, x0 = Math.round(ACX + Math.cos(a) * rr), z0 = Math.round(ACZ + Math.sin(a) * rr), R = 3 + (k % 2) * 2;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) { const d = Math.hypot(dx, dz) + n.fbm((x0 + dx) * 0.4, (z0 + dz) * 0.4, 2) * 1.6; if (d <= R) MH.paint(w, x0 + dx, z0 + dz, hash3(x0 + dx, k, z0 + dz) > 0.86 ? B.ember : (d < R - 1.4 ? B.scorch : B.snowDk)); }
      }
      // 거인의 발자국: 바위 턱 아래에서 설원 한가운데로(눈이 눌린 자리, 불씨는 부품)
      const prints = [], F0 = XZ(-30, -4), F1 = XZ(8, 2), fl = Math.hypot(F1[0] - F0[0], F1[1] - F0[1]);
      const fd = [(F1[0] - F0[0]) / fl, (F1[1] - F0[1]) / fl], fpp = [-fd[1], fd[0]];
      for (let k = 0; k < 7; k++) {
        const t = k / 6, side = k % 2 ? 1 : -1;
        const cx = Math.round(F0[0] + (F1[0] - F0[0]) * t - fpp[0] * side * 3.2), cz = Math.round(F0[1] + (F1[1] - F0[1]) * t - fpp[1] * side * 3.2);
        const cells = [];
        for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
          const al = dx * fd[0] + dz * fd[1], ac = dx * fpp[0] + dz * fpp[1];
          const foot = (al / 4.2) ** 2 + (ac / 2.6) ** 2 <= 1;
          const toe = [-1.8, -0.6, 0.6, 1.8].some(q => Math.hypot(al - 5.1, ac - q) < 0.75);
          if (foot || toe) cells.push([cx + dx, cz + dz]);
        }
        const g0 = MH.g(w, cx, cz), pr = w.prop({ name: 'print' + k, pivot: [cx + 0.5, g0, cz + 0.5], scl0: [0, 0, 0] });
        cells.forEach(([x, z]) => { const g = MH.g(w, x, z) - 1; MH.setH(w, x, z, g, B.snowFt, B.snow); if (hash3(x, k, z) > 0.45) pr.set(x, g + 1, z, hash3(x, 9, z) > 0.7 ? B.ember2 : B.ember); });
        prints.push([cx, g0, cz]);
      }
      acts.push({
        name: '거인의 발자국', hint: '눈 위에 찍힌 거인의 발자국마다 불씨가 피어오르고 눈보라가 일어요', hit: [prints[3][0] - 3, prints[3][1] - 1, prints[3][2] - 3, prints[3][0] + 3, prints[3][1] + 2, prints[3][2] + 3],
        run: async a => {
          a.flash('field', 8, 4.4);
          for (let k = 0; k < prints.length; k++) {
            const [x, g, z] = prints[k];
            a.tween('print' + k, { scl: [1, 1, 1] }, 0.15);
            a.burst([x + 0.5, g + 1, z + 0.5], { n: 36, colors: ['#ffffff', '#e8eef8', '#c8d4e8'], speed: 6, up: 2.5, life: 1.2, gravity: 4, spread: 4, flat: true });
            a.burst([x + 0.5, g + 1, z + 0.5], { n: 14, colors: ['#ff6a1a', '#ffb040'], speed: 1.5, up: 4, life: 1, gravity: 2, spread: 2 });
            await a.wait(0.45);
          }
          await a.wait(1.6);
          for (let k = 0; k < prints.length; k++) a.tween('print' + k, { scl: [0, 0, 0] }, 1);
          await a.wait(1);
        },
      });
      // 솟구치는 불기둥(부품): 그을린 둘레에서 솟는다. 발자국과 겹치지 않게 자리를 돌려 잡는다
      const pillars = [];
      for (let k = 0; k < 7; k++) {
        let a = k / 7 * Math.PI * 2 + 0.35, x, z;
        for (let tries = 0; tries < 8; tries++, a += 0.12) { x = Math.round(ACX + Math.cos(a) * 21); z = Math.round(ACZ + Math.sin(a) * 21); if (prints.every(p => Math.hypot(p[0] - x, p[2] - z) > 8.5)) break; }
        const g = MH.maxG(w, x - 2, z - 2, x + 2, z + 2), h = 15 + (k % 3) * 3;
        for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.hypot(dx, dz) <= 3.2) MH.paint(w, x + dx, z + dz, hash3(x + dx, 5, z + dz) > 0.7 ? B.ember : B.scorch);
        const pr = w.prop({ name: 'pillar' + k, pivot: [x + 0.5, g + 1, z + 0.5], scl0: [0, 0, 0] });
        for (let y = 0; y < h; y++) {
          const rr = 2.5 - y / h * 1.5 + Math.sin(y * 0.9 + k) * 0.3;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz); if (d <= rr) pr.set(x + dx, g + 1 + y, z + dz, d < rr - 1 ? B.flame : (hash3(x + dx, y, z + dz) > 0.5 ? B.ember2 : B.ember)); }
        }
        pillars.push([x, g, z, h]);
      }
      acts.push({
        name: '솟구치는 불기둥', hint: '그을린 자리마다 땅속에서 불기둥이 차례로 솟구쳐요', hit: [ACX - 4, gC - 1, ACZ - 4, ACX + 4, gC + 3, ACZ + 4],
        run: async a => {
          a.flash('field', 16, 4.2); a.glow(1.6, 4.2);
          for (let k = 0; k < pillars.length; k++) {
            const [x, g, z, h] = pillars[k];
            a.burst([x + 0.5, g + 1, z + 0.5], { n: 30, colors: ['#ff6a1a', '#ffb040', '#3a2e2a'], speed: 4, up: 3, life: 0.8, gravity: 6, spread: 2, flat: true });
            a.tween('pillar' + k, { scl: [1, 1, 1] }, 0.3);
            a.burst([x + 0.5, g + h * 0.6, z + 0.5], { n: 26, colors: ['#ffe08a', '#ffb040', '#ff6a1a'], speed: 1.6, up: 10, life: 1.4, gravity: 1, spread: 1.5 });
            await a.wait(0.28);
          }
          await a.wait(1.6);
          for (let k = 0; k < pillars.length; k++) a.tween('pillar' + k, { scl: [0, 0, 0] }, 0.6);
          await a.wait(0.7);
        },
      });
      landmarks.push({ name: '불의 거인', note: '보스 · 대장간을 지키는 마지막 불의 거인', p: [ACX + 0.5, gC + 28, ACZ + 0.5], boss: true });

      // ── 멸망의 불 비: 가마에서 녹은 바위가 설원 곳곳에 떨어진다 ──
      const drops = [[-20, -24], [-14, 20], [0, -36], [10, 30], [18, -8], [26, 18], [-26, 6], [30, -26]].map(([u, v]) => { const [x, z] = XZ(u, v); return [x + 0.5, MH.g(w, x, z) + 1.5, z + 0.5]; });
      acts.push({
        name: '멸망의 불 비', hint: '가마에서 튀어 오른 녹은 바위가 불덩이가 되어 설원에 쏟아져요', hit: [PX - 18, rimY - 6, PZ - 18, PX + 18, rimY + 1, PZ + 18],
        run: async a => {
          a.flash('forge', 2.6, 5); a.glow(1.5, 5);
          const src = [PX + 0.5, rimY + 3, PZ + 0.5];
          await Promise.all(drops.map(async (p, k) => {
            await a.wait(k * 0.38);
            a.burst(src, { n: 24, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 3, up: 10, life: 1, gravity: 4, spread: 4 });
            await fly(a, src, p, 28, 14, ['#ff6a1a', '#ffb040'], 6);
            a.burst(p, { n: 46, colors: ['#ff6a1a', '#ffb040', '#ffe08a', '#3a2e2a'], speed: 6, up: 6, life: 1.3, gravity: 9, spread: 2 });
            a.flash('field', 10, 0.5);
          }));
        },
      });

      // ── 불의 거인의 족쇄: 가마에서 내려온 사슬이 설원의 쇠말뚝에 박히고, 끊어진 족쇄까지 사슬이 늘어진다 ──
      const [SX, SZ] = XZ(-16, -30), sg = MH.maxG(w, SX - 2, SZ - 2, SX + 2, SZ + 2);
      w.box(SX - 3, sg - 3, SZ - 3, SX + 3, sg, SZ + 3, B.rockDk);
      w.box(SX - 2, sg + 1, SZ - 2, SX + 2, sg + 4, SZ + 2, B.iron);
      for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; w.set(Math.round(SX + Math.cos(a) * 2.2), Math.round(sg + 7 + Math.sin(a) * 2.2), SZ, B.potBand); }
      {
        const dx = SX - PX, dz = SZ - PZ, dl = Math.hypot(dx, dz), r = prof(34);
        LB.chain(w, [PX + dx / dl * r, P0 + 34, PZ + dz / dl * r], [SX, sg + 7, SZ], 5, B.chain, { size: 1.8, ice: B.icicle });
      }
      const [KX, KZ] = XZ(-4, -16), kg = MH.maxG(w, KX - 4, KZ - 4, KX + 4, KZ + 4);
      const gpt = (x, z) => [x, MH.g(w, Math.round(x), Math.round(z)) + 1.2, z];
      const sch = w.prop({ name: 'schain', pivot: [(SX + KX) / 2, sg + 1, (SZ + KZ) / 2], clipOK: 90 });
      const mx = (SX + KX) / 2, mz = (SZ + KZ) / 2;
      const schPts = LB.chainPath(sch, [gpt(SX + 3, SZ), gpt(mx - 2, mz + 3), gpt(mx + 3, mz - 1), gpt(KX - 5, KZ)], B.chain, { size: 1.4 });
      const shk = w.prop({ name: 'shackle', pivot: [KX + 0.5, kg + 2, KZ + 0.5], clipOK: 30 });
      for (let k = 0; k < 90; k++) {
        const a = k / 90 * Math.PI * 2; if (a > 5.3) continue;           // 끊어진 틈
        for (const t of [0, 1]) shk.set(Math.round(KX + Math.cos(a) * (4.2 - t)), kg + 2 + Math.round(Math.sin(a) * 1.2), Math.round(KZ + Math.sin(a) * (4.2 - t)), B.iron);
      }
      shk.box(KX - 5, kg + 1, KZ - 1, KX - 4, kg + 2, KZ + 1, B.potBand);
      {
        const pl = Math.hypot(SX - KX, SZ - KZ), ux = (SX - KX) / pl, uz = (SZ - KZ) / pl;
        acts.push({
          name: '불의 거인의 족쇄', hint: '끊어진 족쇄 사슬이 팽팽하게 당겨지며 불꽃과 눈이 튀어요', hit: [KX - 5, kg, KZ - 5, KX + 5, kg + 4, KZ + 5],
          run: async a => {
            for (let k = 0; k < 5; k++) {
              a.tween('schain', { off: [ux * 1.2, 1.4, uz * 1.2] }, 0.14);
              await a.tween('shackle', { off: [ux * 2, 1.8, uz * 2], rot: [0, k % 2 ? 0.14 : -0.14, 0] }, 0.14);
              a.burst([KX + 0.5, kg + 3, KZ + 0.5], { n: 16, colors: ['#ffb040', '#ffe08a'], speed: 4, up: 3, life: 0.6, gravity: 8, spread: 1 });
              schPts.filter((_, i) => i % 3 === k % 3).forEach(p => a.burst([p[0], p[1] + 1, p[2]], { n: 8, colors: ['#ffffff', '#e8eef8'], speed: 3, up: 2, life: 0.8, gravity: 5, spread: 1.5 }));
              a.tween('schain', { off: [0, 0, 0] }, 0.18);
              await a.tween('shackle', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.2);
              await a.wait(0.12);
            }
          },
        });
      }
      landmarks.push({ name: '거인의 족쇄', note: '가마에 묶인 불의 거인의 사슬', p: [SX + 0.5, sg + 18, SZ + 0.5] });

      // ── 쓰러진 거인들의 유해: 해골, 갈비뼈, 손 ──
      const skull = (x, z, r) => {
        const g = MH.g(w, x, z);
        w.ellipsoid(x, g + Math.round(r * 0.4), z, r, r * 0.86, r * 1.1, B.bone, (dx, dy, dz, d) => d > 0.72 || dy < -r * 0.3);
        for (const s of [-1, 1]) { w.sphere(x + s * Math.round(r * 0.38), g + Math.round(r * 0.55), z + Math.round(r * 0.8), r * 0.26, 0); w.sphere(x + s * Math.round(r * 0.38), g + Math.round(r * 0.55), z + Math.round(r * 0.7), r * 0.2, B.ember); }
        w.box(x - 1, g + Math.round(r * 0.2), z + Math.round(r * 1.0), x + 1, g + Math.round(r * 0.35), z + Math.round(r * 1.1), 0);
        for (let k = -3; k <= 3; k++) w.box(x + k, g + 1, z + Math.round(r * 1.05), x + k, g + 1 + (k & 1), z + Math.round(r * 1.05), B.boneDk);
        return [x, g + Math.round(r * 0.55), z + Math.round(r * 0.8)];
      };
      const [skx, skz] = XZ(14, 40), eyes = skull(skx, skz, 9);
      lights.push({ name: 'skull', p: [eyes[0] + 0.5, eyes[1], eyes[2] + 1.5], c: '#ff6a2a', i: 0.6, d: 18, flicker: 0.4, srcR: 5 });
      acts.push({
        name: '거인의 유골', hint: '반쯤 묻힌 해골의 눈구멍에 거인의 불꽃이 되살아나요', hit: [eyes[0] - 9, eyes[1] - 6, eyes[2] - 12, eyes[0] + 9, eyes[1] + 6, eyes[2] + 2],
        run: async a => { a.flash('skull', 6, 3.5); for (let k = 0; k < 7; k++) { for (const s of [-1, 1]) a.burst([eyes[0] + s * 3.4 + 0.5, eyes[1], eyes[2] + 1], { n: 14, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1, up: 6, life: 1.4, gravity: -0.5, spread: 0.8 }); await a.wait(0.35); } },
      });
      landmarks.push({ name: '거인들의 유해', note: '거인과의 전쟁이 남긴 뼈', p: [skx + 0.5, eyes[1] + 18, skz + 0.5] });
      const [rbx, rbz] = XZ(18, -40), rg = MH.g(w, rbx, rbz);
      for (let k = 0; k < 8; k++) {
        const z = rbz - 15 + k * 4.2, L = 11 - Math.abs(k - 3.5) * 1.3;
        for (const s of [-1, 1]) LB.tube(w, [[rbx, rg + 2, z], [rbx + s * L * 0.7, rg + L * 0.95, z], [rbx + s * L, rg + 1, z + 1]], 0.75, B.bone);
      }
      LB.tube(w, [[rbx, rg + 1, rbz - 20], [rbx, rg + 2, rbz], [rbx + 2, rg + 1, rbz + 18]], 1.5, B.boneDk);
      const [hx, hz] = XZ(-24, 46), hg = MH.g(w, hx, hz);
      w.ellipsoid(hx, hg + 1, hz, 6, 3, 5, B.bone);
      for (let k = 0; k < 4; k++) { const a = 1.6 + k * 0.6; LB.tube(w, [[hx + Math.cos(a) * 4, hg + 2, hz + Math.sin(a) * 4], [hx + Math.cos(a) * 8, hg + 8, hz + Math.sin(a) * 8], [hx + Math.cos(a) * 7, hg + 13, hz + Math.sin(a) * 6]], t => 1.6 - t * 0.6, B.bone); }
      LB.tube(w, [[hx + 4, hg + 2, hz - 3], [hx + 9, hg + 6, hz - 5], [hx + 10, hg + 9, hz - 2]], 1.4, B.bone);

      // ── 눈사태: 오른쪽 산비탈의 눈덩이와 바위가 설원으로 굴러 내려온다(부품) ──
      const avalanche = [[-6, 66], [6, 68], [18, 66]].map(([u, v]) => {
        const [x, z] = XZ(u, v), g = MH.g(w, x, z), pts = [];
        for (let k = 1; k <= 6; k++) { const [xx, zz] = XZ(u + k * 0.6, v - k * 5); pts.push([xx - x, MH.g(w, xx, zz) - g, zz - z]); }
        return { x, z, g, pts };
      });
      avalanche.forEach((b, k) => { const pr = w.prop({ name: 'boulder' + k, pivot: [b.x + 0.5, b.g + 3, b.z + 0.5], clipOK: 40 }); pr.sphere(b.x, b.g + 3, b.z, 2.6, B.snowDk); pr.sphere(b.x, b.g + 4, b.z, 1.8, B.snow); });
      acts.push({
        name: '눈사태', hint: '오른쪽 비탈에서 눈더미와 바위가 설원으로 굴러 내려와요', hit: [avalanche[1].x - 4, avalanche[1].g - 2, avalanche[1].z - 4, avalanche[1].x + 4, avalanche[1].g + 8, avalanche[1].z + 4],
        run: async a => {
          a.wind(3, 4);
          avalanche.forEach((b, k) => a.path('boulder' + k, b.pts, 3.2));
          for (let k = 0; k < 10; k++) { for (const b of avalanche) { const p = b.pts[Math.min(5, k >> 1)]; a.burst([b.x + p[0] + 0.5, b.g + p[1] + 3, b.z + p[2] + 0.5], { n: 18, colors: ['#ffffff', '#e8eef8'], speed: 5, up: 2, life: 1.2, gravity: 3, spread: 4, flat: true }); } await a.wait(0.32); }
          await a.wait(1.2);
          avalanche.forEach((_, k) => a.tween('boulder' + k, { scl: [0, 0, 0] }, 0.3));
          await a.wait(0.4);
          avalanche.forEach((_, k) => a.move('boulder' + k, [0, 0, 0], 0.05));
          await a.wait(0.2);
          await Promise.all(avalanche.map((_, k) => a.tween('boulder' + k, { scl: [1, 1, 1] }, 0.8)));
        },
      });

      // ── 낭떠러지: 설원 끝 벽의 얼어붙은 폭포와 고드름 ──
      const rimTop = (x, z) => Math.max(MH.g(w, x - 1, z), MH.g(w, x, z - 1), MH.g(w, x - 1, z - 1));
      const fall = [];
      for (let z = 60; z < D; z++) for (let x = 60; x < W; x++) {
        const u = U(x, z), v = V(x, z), r0 = rimU(v);
        if (u <= r0 || u > r0 + 1.9 || zone(x, z) !== 'chasm') continue;
        const top = rimTop(x, z);
        if (v > -32 && v < -22) { for (let y = base - 22; y < top; y++) if (hash3(x, y, z) > 0.12) w.set(x, y, z, (x + y) % 3 ? B.ice : B.iceDk); fall.push([x, top, z]); }
        else if (Math.abs(v) < 44 && u <= r0 + 1 && hash3(x, 3, z) > 0.55) { const L = 1 + (hash3(x, 5, z) * 5 | 0); for (let k = 1; k <= L; k++) w.set(x, top - k, z, B.icicle); }
      }
      { const [ax, az] = XZ(36, -27), [bx, bz] = XZ(48, -27); MH.path(w, [[ax, az], [bx, bz]], 1.6, B.ice); }
      const ft = fall[fall.length >> 1] || [...XZ(51, -27).slice(0, 1), base, XZ(51, -27)[1]];
      acts.push({
        name: '얼어붙은 폭포', hint: '낭떠러지로 흘러내리다 얼어붙은 폭포에서 얼음 조각이 부서져 내려요', hit: [ft[0] - 3, ft[1] - 12, ft[2] - 3, ft[0] + 3, ft[1], ft[2] + 3],
        run: async a => { for (let k = 0; k < 8; k++) { a.burst([ft[0] + 1, ft[1] - 2 - k * 2.4, ft[2] + 1], { n: 22, colors: ['#ffffff', '#c4e8f4', '#8ac4dc'], speed: 3, up: 2, life: 1.6, gravity: 9, spread: 3 }); await a.wait(0.16); } },
      });

      // ── 대장간 기슭: 협곡 끝의 축복과 낭떠러지를 건너는 거대한 사슬 ──
      const ancL = (x, z) => { const g = MH.maxG(w, x - 3, z - 3, x + 3, z + 3); w.box(x - 3, g - 2, z - 3, x + 3, g, z + 3, B.stoneDk); w.box(x - 2, g + 1, z - 2, x + 2, g + 3, z + 2, B.iron); return [x, g + 3, z]; };
      const crossing = [-8, 8].map(v => {
        const s = ancL(...XZ(70, v)), e = ancL(...XZ(44, v * 1.1));
        return LB.chain(w, [s[0] - 1.4, s[1], s[2] - 1.4], [e[0] + 1.4, e[1], e[2] + 1.4], 1.6, B.chain, { size: 1.8, ice: B.icicle });
      });
      // 끊어져 늘어진 사슬 하나(부품): 설원 가장자리에서 낭떠러지 아래로
      const dgv = 24, dr = rimU(dgv), [dgx, dgz] = XZ(dr + 4.6, dgv), dgTop = MH.g(w, ...XZ(dr - 3, dgv));
      { const [ax, az] = XZ(dr - 4, dgv); ancL(ax, az); LB.tube(w, [[ax, dgTop + 3, az], [dgx, dgTop + 3, dgz]], 0.9, B.iron); w.box(dgx - 1, dgTop + 2, dgz - 1, dgx + 1, dgTop + 4, dgz + 1, B.iron); }
      const dangle = w.prop({ name: 'dangle', pivot: [dgx + 0.5, dgTop + 1, dgz + 0.5], axis: 'x', rock: 0.04, rockSpeed: 0.7, clipOK: 20 });
      LB.chain(dangle, [dgx, dgTop, dgz], [dgx, dgTop - 22, dgz], 0, B.chain, { size: 1.6, ice: B.icicle });
      {
        const P = crossing[0], m = P(0.5);
        acts.push({
          name: '대장간 기슭의 사슬', hint: '낭떠러지를 건너는 거대한 사슬에서 눈과 고드름이 떨어지고 끊어진 사슬이 흔들려요', hit: [Math.round(m[0]) - 4, Math.round(m[1]) - 3, Math.round(m[2]) - 4, Math.round(m[0]) + 4, Math.round(m[1]) + 3, Math.round(m[2]) + 4],
          run: async a => {
            const sway = (async () => { for (let k = 0; k < 3; k++) { await a.turn('dangle', [0.26, 0, 0], 0.6); await a.turn('dangle', [-0.22, 0, 0], 0.7); } await a.turn('dangle', [0, 0, 0], 0.6); })();
            for (let k = 0; k <= 10; k++) for (const Q of crossing) { const p = Q(k / 10); a.burst([p[0] + 0.5, p[1] - 4.5, p[2] + 0.5], { n: 10, colors: ['#ffffff', '#d4f0fa', '#e8eef8'], speed: 1.5, up: 0, life: 1.8, gravity: 9, spread: 2 }); if (k % 2) await a.wait(0.16); }
            await sway;
          },
        });
        landmarks.push({ name: '거인의 사슬', note: '낭떠러지를 건너 보스방으로', p: [m[0], m[1] + 14, m[2]] });
      }
      const [gx, gz] = XZ(74, 5), gp = LB.grace(w, gx, MH.g(w, gx, gz), gz, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push(LB.graceAct({ at: gp, to: [PX + 0.5, rimY + 4, PZ + 0.5], arc: 34, steps: 28, hint: '대장간 기슭의 축복이 사슬 너머 거인들의 대장간을 가리켜요' }));
      landmarks.push({ name: '대장간 기슭', note: '사슬 앞의 축복', p: [gp[0], gp[1] + 16, gp[2]] });
      // 불씨 박힌 협곡 벽과 바위
      const [glx, glz] = XZ(76, 0);
      lights.push({ name: 'gorge', p: [glx + 0.5, LG + 8, glz + 0.5], c: '#ff6a2a', i: 0.5, d: 26, flicker: 0.5, srcR: 16 });
      for (const [u, v, r] of [[72, -9, 2.6], [78, 8, 2.2], [69, 10, 1.8]]) { const [x, z] = XZ(u, v), g = MH.g(w, x, z); MH.rock(w, x, g, z, r, B.basalt, B.snowDk); w.set(x, g + 1, z + Math.ceil(r), B.ember); }
      { const [x, z] = XZ(77, -5); MH.tree(w, x, MH.g(w, x, z) + 1, z, { kind: 'dead', h: 11, bark: B.trunkDk, branches: 5 }); }
      const wallPts = [[69, -1], [72, 1], [75, -1], [78, 1], [81, -1], [70, 1], [76, -1], [80, 1]].map(([u, sd]) => { const [x, z] = XZ(u, sd * (gorgeW(u) - 0.8)); return [x + 0.5, MH.g(w, x, z) + 2 + (hash3(x, 1, z) * 4 | 0), z + 0.5]; });
      {
        const [hx0, hz0] = XZ(74, -gorgeW(74) - 1.5);
        acts.push({
          name: '불씨 박힌 협곡', hint: '협곡 바위벽의 갈라진 틈에서 불씨가 확 일어나요', hit: [hx0 - 2, LG + 1, hz0 - 2, hx0 + 2, LG + 11, hz0 + 2],
          run: async a => {
            a.flash('gorge', 5, 3.4); a.glow(1.8, 3.4);
            for (const p of wallPts) { a.burst(p, { n: 16, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1.4, up: 5, life: 1.4, gravity: -0.3, spread: 1.4 }); await a.wait(0.22); }
          },
        });
      }

      // ── 설원의 나무와 바위: 노란 잎 나무, 마른 나무 ──
      const busy = (x, z) => {
        const u = U(x, z);
        return Math.hypot(x - ACX, z - ACZ) < 30 || Math.hypot(x - PX, z - PZ) < PR + 6 || u > rimU(V(x, z)) - 4 || rampSet.has(x + 1000 * z) || rampSet.has(x + 3 + 1000 * z) || rampSet.has(x - 3 + 1000 * z)
          || Math.hypot(x - SX, z - SZ) < 8 || Math.hypot(x - skx, z - skz) < 13 || Math.hypot(x - rbx, z - rbz) < 18 || Math.hypot(x - hx, z - hz) < 12 || prints.some(p => Math.hypot(p[0] - x, p[2] - z) < 7);
      };
      const golden = [];
      for (const [u, v] of [[-14, -46], [30, -46], [34, 40], [-8, 50], [-28, -40], [6, 44], [20, -22], [40, 20], [-20, 30], [24, 52], [38, -10], [-30, 14]]) {
        const [x, z] = XZ(u, v), g = MH.g(w, x, z);
        if (busy(x, z) || w.slope[x + W * z] > 2 || w.get(x, g + 1, z)) continue;
        MH.tree(w, x, g + 1, z, { kind: 'oak', h: w.ri(8, 11), bark: B.trunk, leaves: [B.leafYs, B.leafY, B.leafY2], r: w.r(3.2, 4.2), spread: 3.4, branches: 4 });
        golden.push([x, g, z]);
      }
      const gt = golden.reduce((p, q) => (U(q[0], q[2]) > U(p[0], p[2]) ? q : p), golden[0] || [96, base + 10, 120]);
      acts.push({
        name: '노란 잎 나무', hint: '눈 쌓인 노란 잎 나무가 흔들리며 금빛 잎과 눈이 흩날려요', hit: [gt[0] - 4, gt[1] + 6, gt[2] - 4, gt[0] + 4, gt[1] + 15, gt[2] + 4],
        run: async a => { a.wind(2.2, 3); for (let k = 0; k < 6; k++) { a.burst([gt[0] + 0.5, gt[1] + 12, gt[2] + 0.5], { n: 26, colors: ['#e8b840', '#c8902a', '#ffffff', '#f0d070'], speed: 3, up: 1, life: 2.6, gravity: 1.6, spread: 4, flat: true }); await a.wait(0.3); } },
      });
      for (let i = 0; i < 90; i++) {
        const [x, z] = XZ(w.r(-34, 44), w.r(-62, 62)), g = MH.g(w, x, z);
        if (x < 2 || z < 2 || x > W - 3 || z > D - 3 || busy(x, z) || w.slope[x + W * z] > 1 || w.get(x, g + 1, z)) continue;
        if (Math.abs(V(x, z)) < 26 && U(x, z) > -18) continue;
        if (golden.some(p => Math.hypot(p[0] - x, p[2] - z) < 9)) continue;
        if (i % 3 === 0) MH.tree(w, x, g + 1, z, { kind: i % 2 ? 'dead' : 'twisted', h: w.ri(8, 13), bark: B.trunkDk, branches: 5 });
        else MH.rock(w, x, g, z, w.r(1.6, 4.2), i % 4 ? B.rock : B.rockDk, B.snow);
      }
      MH.scatter(w, 1400, (x, g, z, b) => { if ((b === B.snow || b === B.snow2) && w.chance(0.3)) w.set(x, g + 1, z, B.snow2); });
      return { lights, landmarks, acts };
    },
  });
})();
