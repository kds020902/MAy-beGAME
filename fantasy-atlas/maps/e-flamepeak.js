// 불의 정상 · 불의 거인 — 대장간 기슭(북서쪽 윗단)에서 협곡을 건너는 거대한 사슬을 타면 서남서→동북동으로 길쭉한 아랫단 설원(보스방)이 나온다.
// 설원 동쪽 끝에서 눈 덮인 능선을 오르면 북동쪽 바위 봉우리 위 거인들의 대장간(하위 지도)으로 이어진다. (메인 보스: 불의 거인)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 보스방이 화면 가운데를 비스듬히 가로지르고, 뒤(북서)가 윗단, 오른쪽 위(북동)가 대장간.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 192, D = 192, Hh = 144;
  const PKX = 168, PKZ = 30;                                 // 대장간 바위 봉우리
  const ACX = 88, ACZ = 96;                                 // 불의 거인이 서는 설원 한가운데
  MAPS.push({
    id: 'flamepeak', cat: 'lands', name: '불의 정상', en: 'Flame Peak · Fire Giant', color: '#ff7a3a', seed: 613, base: 30, time: 'night', size: [W, D, Hh],
    desc: '대장간 기슭의 축복에서 협곡 위로 걸린 거대한 사슬을 건너면, 산허리에 길쭉하게 걸린 아랫단 설원이 나온다. 마른 풀과 죽은 나무뿐인 눈밭에서 외눈 뚜껑을 든 마지막 불의 거인이 길을 막고, 설원 동쪽 끝 능선 너머 봉우리 위에서 거인들의 대장간이 멸망의 불을 품고 있다.',
    monsters: { normal: ['거인 산정 트롤', '설원 까마귀', '손가락 크리퍼'], mid: '피손가락 오키나', boss: '불의 거인' },
    sky: ['#3a3446', '#0a0c18', '#c8582e'], stars: true,
    hemi: ['#b0bce0', '#2a2430', 0.56], sun: ['#c8d4ff', 0.42, [0.5, 1, 0.65]],
    day: { sky: ['#b8bcc8', '#5e6a84', '#f0c8a0'], stars: false, hemi: ['#eef2ff', '#5a5a68', 0.62], sun: ['#fff4e8', 0.7, [0.5, 1, 0.65]], haze: '#a8b0c0' },
    liquid: ['#8ab8d0', '#b8dcec', '#f4ffff'], liqSpeed: 0.05,
    fog: { start: 0.8, floor: 20, depth: 14, haze: [36, 0.2, 12], hazeColor: '#3a3448' },
    camY: 8, zoom: 1.9,
    particles: [
      { n: 1200, colors: ['#ffffff', '#e8eef8', '#c8d4e8'], mode: 'fall', speed: 0.9, wind: 1.6, y0: 10, y1: 140, glow: false },
      { n: 420, colors: ['#ff6a2a', '#ff8a3a', '#ffb04a', '#d8401a'], mode: 'drift', speed: 0.35, wind: 0.6, y0: 34, y1: 110, glow: true },
      { n: 160, colors: ['#ffb04a', '#ff6a2a', '#ffe08a'], mode: 'rise', speed: 1.4, area: [PKX, PKZ, 8], y0: 98, y1: 136, glow: true },
    ],
    blocks: {
      snow: { c: '#9aa6b8', top: '#eef2f8', v: 0.04 }, snow2: { c: '#9aa6b8', top: '#dde4ee', v: 0.05 }, snowDk: { c: '#7a8698', top: '#bcc8d8', v: 0.05 },
      snowFt: { c: '#7e8aa0', top: '#a4b0c6', v: 0.04 }, grassDry: { c: '#c4bea8', v: 0.1 }, grassDry2: { c: '#9e9886', v: 0.1 },
      rock: { c: '#55535c', v: 0.06, pat: 'stone' }, rockDk: { c: '#3c3a44', v: 0.06, pat: 'stone' }, basalt: { c: '#2a2830', v: 0.05, pat: 'log' }, basalt2: { c: '#36343e', v: 0.05, pat: 'log' },
      ice: { c: '#8ac4dc', top: '#c4e8f4', v: 0.04 }, icicle: { c: '#d4f0fa', v: 0.03 },
      chain: { c: '#4a4646', v: 0.05 }, iron: { c: '#2e2c30', v: 0.03 }, ironR: { c: '#5a3a2c', v: 0.04 },
      ember: { c: '#ff6a1a', glow: true }, ember2: { c: '#ffb040', glow: true }, flame: { c: '#ffe08a', glow: true }, coal: { c: '#2a1c18', v: 0.06 }, ash: { c: '#5a5660', top: '#6e6a74', v: 0.08 },
      scorch: { c: '#3a2e2a', top: '#463630', v: 0.08 },
      bone: { c: '#c8c0b0', v: 0.06, pat: 'big' }, boneDk: { c: '#a09888', v: 0.06, pat: 'stone' },
      fur: { c: '#7a6e66', v: 0.1 }, furDk: { c: '#544a46', v: 0.1 }, briar: { c: '#d8d0c4', v: 0.05 }, briarR: { c: '#c03020', glow: true },
      hair: { c: '#b8441e', v: 0.08 }, hair2: { c: '#8e2e14', v: 0.08 }, bead: { c: '#a07a4a', v: 0.04 },
      lid: { c: '#80847a', v: 0.05, pat: 'stone' }, lidL: { c: '#b8b8aa', v: 0.04 }, lidDk: { c: '#3e423c', v: 0.05 }, eyeW: { c: '#e8dccc', v: 0.03 }, eyeR: { c: '#ff5a1a', glow: true },
      fstone: { c: '#3e3a40', v: 0.05, pat: 'brick' }, fstoneL: { c: '#5c5660', v: 0.05, pat: 'brick' }, fband: { c: '#4e4648', v: 0.04 }, frelief: { c: '#6a6064', v: 0.04 },
      trunk: { c: '#2e2626', v: 0.05 }, trunkDk: { c: '#1e1a1c', v: 0.05 },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용: 검은 돌받침, 그을린 나무 기둥, 낡은 판, 불씨 끝, 화롯불 등
      stoneG: { c: '#3a3840', v: 0.05 }, timber: { c: '#3a2c26', v: 0.05 }, door: { c: '#5a4636', v: 0.05, pat: 'plank' }, gold: { c: '#ff9a3a', glow: true }, mlamp: { c: '#ffb050', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sst = MH.sstep;
      // ── 보스방(아랫단 설원) 등뼈: 서남서 → 동북동, 폭은 가운데가 넓고 동쪽 끝이 좁다 ──
      const SP = [[18, 114], [52, 108], [92, 98], [126, 90], [148, 83]];
      const HW = [[0, 18], [0.12, 28], [0.42, 34], [0.66, 30], [0.88, 16], [1, 9]];
      const segL = [], cum = [0];
      for (let i = 0; i < SP.length - 1; i++) { segL.push(Math.hypot(SP[i + 1][0] - SP[i][0], SP[i + 1][1] - SP[i][1])); cum.push(cum[i] + segL[i]); }
      const LT = cum[cum.length - 1];
      const hwAt = t => { for (let i = 0; i < HW.length - 1; i++) if (t <= HW[i + 1][0]) { const k = (t - HW[i][0]) / (HW[i + 1][0] - HW[i][0]); return HW[i][1] + (HW[i + 1][1] - HW[i][1]) * sst(0, 1, k); } return HW[HW.length - 1][1]; };
      // 등뼈에 가장 가까운 점: t(0~1), d(거리), s(남쪽 +1 / 북쪽 -1)
      const spine = (x, z) => {
        let best = 1e9, bt = 0, bs = 1;
        for (let i = 0; i < SP.length - 1; i++) {
          const [ax, az] = SP[i], [bx, bz] = SP[i + 1], dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz;
          const k = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2)), qx = ax + dx * k, qz = az + dz * k, d = Math.hypot(x - qx, z - qz);
          if (d < best) { best = d; bt = (cum[i] + segL[i] * k) / LT; bs = (dx * (z - az) - dz * (x - ax)) >= 0 ? 1 : -1; }
        }
        return { t: bt, d: best, s: bs };
      };
      const tPos = t => { const L = t * LT; for (let i = 0; i < segL.length; i++) if (L <= cum[i + 1] + 1e-6) { const k = (L - cum[i]) / segL[i]; return [SP[i][0] + (SP[i + 1][0] - SP[i][0]) * k, SP[i][1] + (SP[i + 1][1] - SP[i][1]) * k]; } return SP[SP.length - 1]; };
      // 동쪽 끝에서 대장간으로 오르는 눈 능선
      const RG0 = [146, 86], RG1 = [153, 56], RGL = Math.hypot(RG1[0] - RG0[0], RG1[1] - RG0[1]);
      const ridge = (x, z) => { const dx = RG1[0] - RG0[0], dz = RG1[1] - RG0[1], k = Math.max(0, Math.min(1, ((x - RG0[0]) * dx + (z - RG0[1]) * dz) / (RGL * RGL))); return { k, d: Math.hypot(x - RG0[0] - dx * k, z - RG0[1] - dz * k) }; };
      const AH = t => base + 8 + t * 7;                     // 설원 높이(동쪽으로 갈수록 조금 높다)
      const PL = base + 19;                                  // 윗단(대장간 기슭 쪽)
      const PKT = base + 44;                                 // 대장간 바위 봉우리 꼭대기
      const RGH = k => base + 15 + k * 25;                   // 능선 높이
      // 칸마다 구역과 높이를 한 번에 정한다
      // 0 설원 1 협곡 2 윗단 3 남쪽 낭떠러지 4 서쪽 산벽 5 능선 6 봉우리 둘레 골짜기 7 봉우리 8 북동 산
      const ZN = new Uint8Array(W * D), HF = new Float32Array(W * D), AE = new Float32Array(W * D);
      for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
        const i = x + W * z, sp = spine(x, z), e = n.fbm(x * 0.06, z * 0.06, 2) * 6 - 3, A = sp.d - hwAt(sp.t) - e;
        const dk = Math.hypot(x - PKX, z - PKZ) + n.fbm(x * 0.1 + 4, z * 0.1, 2) * 4 - 2, rg = ridge(x, z), rw = 4.5 + n.fbm(x * 0.2, z * 0.2 + 7, 2) * 1.5;
        const cw = 11 + n.fbm(x * 0.05 + 3, 1.2, 2) * 4 + sst(0.7, 0.95, sp.t) * 6;
        let zn, h;
        if (dk < 10) { zn = 7; h = PKT - Math.max(0, dk - 8) * 3; }
        else if (A > -1 && rg.d < rw && rg.k > 0.02) { zn = 5; h = RGH(rg.k) - (rg.d / rw) ** 2 * 7 + n.fbm(x * 0.15, z * 0.15, 2) * 1.5; }
        else if (dk < 27) { zn = 6; h = base - 24 + n.fbm(x * 0.2, z * 0.2, 2) * 3; }
        else if (A < 0) { zn = 0; h = AH(sp.t) + n.fbm(x * 0.03, z * 0.03, 3) * 4 + Math.max(0, Math.sin(x * 0.11 + z * 0.05 + n.fbm(x * 0.05, z * 0.05) * 3)) * 1.2 + Math.max(0, A + 6) * 0.45 * (sp.s < 0 ? 1 : 0.3); }
        else if (sp.s < 0 && sp.t > 0.05 && A < cw) { zn = 1; h = base - 22 + n.fbm(x * 0.2, z * 0.2, 2) * 3; }
        else if (sp.s < 0 && !(x > 132 && z < 66)) { zn = 2; h = PL + n.fbm(x * 0.04, z * 0.04, 3) * 5 + Math.max(0, 30 - z) * 0.12 + n.ridge(x * 0.05, z * 0.05, 3) * 3 * sst(50, 10, z); }
        else if (sp.s < 0) { zn = 8; h = base + 30 + n.ridge(x * 0.05, z * 0.05, 3) * 10 + Math.max(0, x - 150) * 0.3; }
        else if (sp.t < 0.02 && x < SP[0][0] + 4) { zn = 4; h = Math.min(base + 48, AH(0) + 4 + A * 1.4 + n.ridge(x * 0.06, z * 0.06, 3) * 6); }
        else { zn = 3; h = AH(sp.t) - Math.min(6, A * 1.5) - Math.max(0, A - 4) * 0.9 + n.ridge(x * 0.07, z * 0.07, 3) * 5 * sst(4, 14, A) + n.fbm(x * 0.12, z * 0.12, 2) * 2; }
        ZN[i] = zn; HF[i] = Math.min(Hh - 12, Math.max(base - 27, h)); AE[i] = A;
      }
      const zone = (x, z) => (x < 0 || z < 0 || x >= W || z >= D) ? 3 : ZN[x + W * z];
      const colB = (x, y, z) => { const c = hash3(x >> 1, 7, z >> 1); return c > 0.7 ? B.basalt2 : (c < 0.12 ? B.rockDk : B.basalt); };
      MH.terrain(w, {
        floor: base - 28,
        height: (x, z) => HF[x + W * z],
        surface: (x, z, y, s) => {
          const zn = zone(x, z);
          if (zn === 1 || zn === 6) return s >= 3 ? colB(x, y, z) : B.snowDk;
          if (zn === 7) return B.snowDk;
          if (s >= 4) return colB(x, y, z);
          return s >= 2 ? B.snowDk : (n.fbm(x * 0.13, z * 0.13, 2) > 0.58 ? B.snow2 : B.snow);
        },
        under: (x, z, y, dep, s) => {
          if (dep < 1 && s < 3) return B.snow;
          // 검은 주상절리: 세로 기둥 결
          const zn = zone(x, z);
          if (zn === 1 || zn === 3 || zn === 6 || zn === 7 || s >= 4) return colB(x, y, z);
          return (y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock;
        },
      });
      const lights = [], acts = [], landmarks = [];
      const fly = async (a, from, to, arc, steps, colors, nn) => {
        for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); }
      };
      const gAt = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const busy = [];                                       // [x, z, r] 장식이 피해야 할 자리
      const free = (x, z, r) => busy.every(([bx, bz, br]) => Math.hypot(x - bx, z - bz) > br + (r || 0));

      // ══ 거인들의 대장간(멀리 북동쪽 봉우리 위): 주상절리 받침 + 아치 탑 + 조각 띠를 두른 큰 가마 ══
      const TB = PKT, TT = TB + 8;                            // 탑 몸통
      for (let y = TB - 4; y <= TT; y++) for (let dz = -7; dz <= 7; dz++) for (let dx = -7; dx <= 7; dx++) {
        const ad = Math.max(Math.abs(dx), Math.abs(dz)); if (ad > 6 + (y < TB ? 1 : 0)) continue;
        const face = ad >= 6, u = Math.abs(dx) >= 6 ? dz : dx;
        let b = (y + (u & 1)) % 3 ? B.fstone : B.fstoneL;
        if (face && y > TB && y < TT - 1 && Math.abs(u) <= 4 && (Math.abs(u) % 4 === 2) && y < TT - 2) b = 0;     // 아치 구멍
        if (face && (Math.abs(u) % 4 === 0)) b = B.fstoneL;                                                  // 기둥
        if (y === TT) b = B.fband;
        if (b) w.set(PKX + dx, y, PKZ + dz, b); else w.set(PKX + dx, y, PKZ + dz, B.coal);
      }
      // 팔각 기둥 묶음 층(톱니처럼 보이는 받침) 두 단
      for (let tier = 0; tier < 2; tier++) {
        const y0 = TT + 1 + tier * 3, r0 = 7.5 - tier * 0.8;
        w.cyl(PKX, PKZ, y0, y0 + 2, r0 - 1.2, B.fstone);
        for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2, cx = Math.round(PKX + Math.cos(a) * r0), cz = Math.round(PKZ + Math.sin(a) * r0); w.cyl(cx, cz, y0, y0 + 2, 1.2, k % 2 ? B.fstoneL : B.fstone); }
      }
      const SB = TT + 7;                                     // 가마 바닥
      w.cyl(PKX, PKZ, SB - 1, SB, 4.5, B.fband);
      const BH = 11, RT = SB + BH;                           // 가마 높이, 가장자리 윗면
      const bowlR = y => y < 3 ? 6 + y * 1.6 : 11 + Math.min(1.8, (y - 3) * 0.25);
      const crackA = Math.PI * 0.25;                          // 남동쪽 금(빠진 조각)
      const angDiff = (a, b) => Math.abs(((a - b) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
      for (let y = 0; y <= BH; y++) {
        const r = bowlR(y), R = Math.ceil(r) + 1;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz); if (d > r + 0.4) continue;
          const ang = Math.atan2(dz, dx), x = PKX + dx, yy = SB + y, z = PKZ + dz;
          if (y >= BH - 4 && angDiff(ang, crackA) < 0.16 + (y - BH + 4) * 0.05 && d > r - 2.6) continue;        // 쐐기 모양 금
          if (y > 1 && d < r - 2) { if (y <= BH - 2) w.set(x, yy, z, y === BH - 2 ? (Math.abs(d - 4.5) < 1.2 ? (hash3(dx, y, dz) > 0.4 ? B.ember : B.ember2) : (d < 3 ? B.ash : (hash3(dx, 1, dz) > 0.9 ? B.ember : B.coal))) : B.coal); continue; }
          let b = B.fstone;
          if (y === BH) b = B.fstoneL;
          else if (y === 3 || y === 7 || y === BH - 1) b = B.fband;
          else if (d > r - 0.8 && (Math.round(ang * 24 / Math.PI) & 1) && y > 3) b = B.frelief;
          w.set(x, yy, z, b);
        }
      }
      // 손잡이 고리 둘(북·남)과 끊어져 늘어진 사슬
      for (const s of [-1, 1]) {
        const hz = PKZ + s * (bowlR(8) + 1.5);
        for (let k = 0; k < 40; k++) { const a = k / 40 * Math.PI * 2; w.set(PKX + Math.round(Math.cos(a) * 2.2), SB + 7 + Math.round(Math.sin(a) * 2.2), Math.round(hz + s * 0.6), B.iron); }
        LB.chain(w, [PKX, SB + 4, hz + s * 0.6], [PKX + s * 1.5, SB - 14, hz + s * 1.5], 0, B.chain, { size: 1.1, ice: B.icicle });
      }
      lights.push({ name: 'forge', p: [PKX + 0.5, RT + 3, PKZ + 0.5], c: '#ff7a2a', i: 1.6, d: 46, flicker: 0.3, srcR: 8 });
      landmarks.push({ name: '거인들의 대장간', note: '멸망의 불이 잠든 큰 가마 · 하위 지도', p: [PKX + 0.5, RT + 16, PKZ + 0.5], tag: 'FORGE' });
      // 능선 꼭대기 쇠말뚝에서 가마 서쪽 가장자리로 얼어붙은 사슬(눈 덮인 등줄기처럼)
      const postG = gAt(RG1[0], RG1[1]);
      w.box(RG1[0] - 1, postG - 2, RG1[1] - 1, RG1[0] + 1, postG + 5, RG1[1] + 1, B.fstone);
      w.box(RG1[0] - 1, postG + 6, RG1[1] - 1, RG1[0] + 1, postG + 6, RG1[1] + 1, B.fband);
      {
        const a = [RG1[0], postG + 4, RG1[1]], dir = Math.atan2(RG1[1] - PKZ, RG1[0] - PKX), r = bowlR(BH) + 0.5, b = [PKX + Math.cos(dir) * r, RT - 1, PKZ + Math.sin(dir) * r];
        LB.chain(w, a, b, 2, B.chain, { size: 1.5, ice: B.icicle });
        LB.tube(w, [LB.lerp3(a, b, 0.05), LB.lerp3(a, b, 0.5), LB.lerp3(a, b, 0.95)].map((p, k) => [p[0], p[1] - [0.5, 2, 0.5][k] + 1.6, p[2]]), 0.7, B.snow2, { under: true });
      }

      // ══ 보스방: 불의 거인의 자리 ══
      const gC = gAt(ACX, ACZ);
      lights.push({ name: 'field', p: [ACX + 0.5, gC + 10, ACZ + 0.5], c: '#ff7a2a', i: 0.05, d: 70, flicker: 0.3, srcR: 30 });
      landmarks.push({ name: '불의 거인', note: '보스 · 대장간을 지키라는 저주를 받은 마지막 불의 거인', p: [ACX + 0.5, gC + 30, ACZ + 0.5], boss: true });
      busy.push([ACX, ACZ, 8]);
      // 싸움이 남긴 그을린 자리(불덩이가 터진 불밭)
      for (let k = 0; k < 7; k++) {
        const a = k * 1.9 + 0.3, rr = 7 + (k % 3) * 6, x0 = Math.round(ACX + Math.cos(a) * rr), z0 = Math.round(ACZ + Math.sin(a) * rr * 0.7), R = 2.5 + (k % 2) * 2;
        if (zone(x0, z0) !== 0) continue;
        for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) { const d = Math.hypot(dx, dz) + n.fbm((x0 + dx) * 0.4, (z0 + dz) * 0.4, 2) * 1.6; if (d <= R && zone(x0 + dx, z0 + dz) === 0) MH.paint(w, x0 + dx, z0 + dz, hash3(x0 + dx, k, z0 + dz) > 0.84 ? B.ember : (d < R - 1.4 ? B.scorch : B.snowDk)); }
      }

      // ── 1. 거인의 발자국: 동쪽 끝(거인이 기다리던 자리)에서 서쪽 사슬 다리 쪽으로 ──
      const prints = [], F0 = [134, 90], F1 = [62, 102], fl = Math.hypot(F1[0] - F0[0], F1[1] - F0[1]);
      const fd = [(F1[0] - F0[0]) / fl, (F1[1] - F0[1]) / fl], fpp = [-fd[1], fd[0]];
      for (let k = 0; k < 7; k++) {
        const t = k / 6, side = k % 2 ? 1 : -1;
        const cx = Math.round(F0[0] + (F1[0] - F0[0]) * t - fpp[0] * side * 3.4), cz = Math.round(F0[1] + (F1[1] - F0[1]) * t - fpp[1] * side * 3.4);
        const cells = [];
        for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) {
          const al = dx * fd[0] + dz * fd[1], ac = dx * fpp[0] + dz * fpp[1];
          if ((al / 4.2) ** 2 + (ac / 2.6) ** 2 <= 1 || [-1.8, -0.6, 0.6, 1.8].some(q => Math.hypot(al - 5.1, ac - q) < 0.75)) cells.push([cx + dx, cz + dz]);
        }
        const g0 = gAt(cx, cz), pr = w.prop({ name: 'print' + k, pivot: [cx + 0.5, g0, cz + 0.5], scl0: [0, 0, 0] });
        cells.forEach(([x, z]) => { const g = MH.g(w, x, z) - 1; MH.setH(w, x, z, g, B.snowFt, B.snow); if (hash3(x, k, z) > 0.45) pr.set(x, g + 1, z, hash3(x, 9, z) > 0.7 ? B.ember2 : B.ember); });
        prints.push([cx, g0, cz]); busy.push([cx, cz, 5]);
      }
      acts.push({
        name: '거인의 발자국', hint: '설원 동쪽 끝에서 걸어 나온 거인의 발자국마다 불씨가 피어오르고 눈보라가 일어요', hit: [prints[3][0] - 3, prints[3][1] - 1, prints[3][2] - 3, prints[3][0] + 3, prints[3][1] + 2, prints[3][2] + 3],
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

      // ── 2. 솟구치는 불기둥(2페이즈): 거인 둘레 땅속에서 차례로 ──
      const pillars = [];
      for (let k = 0; k < 7; k++) {
        let a = k / 7 * Math.PI * 2 + 0.35, x, z;
        for (let tries = 0; tries < 10; tries++, a += 0.13) { x = Math.round(ACX + Math.cos(a) * 19); z = Math.round(ACZ + Math.sin(a) * 15); if (zone(x, z) === 0 && free(x, z, 3) && Math.hypot(x - 104, z - 90) > 12) break; }
        const g = MH.maxG(w, x - 2, z - 2, x + 2, z + 2), h = 15 + (k % 3) * 3;
        for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) if (Math.hypot(dx, dz) <= 3.2) MH.paint(w, x + dx, z + dz, hash3(x + dx, 5, z + dz) > 0.7 ? B.ember : B.scorch);
        const pr = w.prop({ name: 'pillar' + k, pivot: [x + 0.5, g + 1, z + 0.5], scl0: [0, 0, 0] });
        for (let y = 0; y < h; y++) {
          const rr = 2.5 - y / h * 1.5 + Math.sin(y * 0.9 + k) * 0.3;
          for (let dz = -3; dz <= 3; dz++) for (let dx = -3; dx <= 3; dx++) { const d = Math.hypot(dx, dz); if (d <= rr) pr.set(x + dx, g + 1 + y, z + dz, d < rr - 1 ? B.flame : (hash3(x + dx, y, z + dz) > 0.5 ? B.ember2 : B.ember)); }
        }
        pillars.push([x, g, z, h]); busy.push([x, z, 4]);
      }
      acts.push({
        name: '솟구치는 불기둥', hint: '그을린 땅 한가운데를 누르면 거인 둘레에서 불기둥이 차례로 솟구쳐요', hit: [ACX - 4, gC - 1, ACZ - 4, ACX + 4, gC + 3, ACZ + 4],
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

      // ── 3. 외눈 가마 뚜껑: 거인이 방패처럼 휘두르던 둥근 돌 뚜껑, 외눈 신이 새겨져 있다 ──
      const LX = 104, LZ = 90, LR = 9, lg = MH.minG(w, LX - 3, LZ - 3, LX + 3, LZ + 3);
      const LY = lg + Math.round(LR) - 2, S2 = Math.SQRT1_2;
      const lidP = w.prop({ name: 'lid', pivot: [LX + 0.5, lg, LZ + 0.5], clipOK: 150 });
      {
        const Hd = [S2, -S2], tilt = 0.14;                     // 판은 남동쪽(기본 시점)을 바라보고 뒤로 조금 기울었다
        for (let v = -LR; v <= LR; v += 0.4) for (let u = -LR; u <= LR; u += 0.4) {
          const r = Math.hypot(u, v); if (r > LR) continue;
          for (let k = 0; k <= 1.5; k += 0.5) {
            const back = k + Math.sin(tilt) * v, x = Math.round(LX + Hd[0] * u - S2 * back), z = Math.round(LZ + Hd[1] * u - S2 * back), y = Math.round(LY + v * Math.cos(tilt));
            if (k > 0 && lidP.get(x, y, z)) continue;
            let b = B.lid;
            if (k === 0) {
              if (r > LR - 1.2) b = B.lidDk;                                                                  // 테두리
              else if (Math.abs(r - 5.4) < 0.5) b = B.lidDk;
              else if (r > 5.4 && Math.abs(Math.sin(Math.atan2(v, u) * 4 + r * 1.1)) < 0.25) b = B.lidL;    // 소용돌이 무늬
              else if ((u / 4) ** 2 + (v / 2.3) ** 2 <= 1) b = r < 0.7 ? B.coal : (r < 1.6 ? B.eyeR : ((u / 4) ** 2 + (v / 2.3) ** 2 > 0.72 ? B.lidDk : B.eyeW));    // 외눈
              else if (r < 5.4 && r > 4.2) b = B.lidL;
            }
            lidP.set(x, y, z, b);
          }
        }
      }
      lights.push({ name: 'lideye', p: [LX + 1.5, LY, LZ + 1.5], c: '#ff6a2a', i: 0.3, d: 14, flicker: 0.2, srcR: 3 });
      busy.push([LX, LZ, 9]);
      acts.push({
        name: '외눈 가마 뚜껑', hint: '눈밭에 박힌 둥근 돌 뚜껑의 외눈이 붉게 뜨이며 흔들려요. 거인이 방패처럼 휘두르던 대장간 가마의 뚜껑이에요', hit: [LX - 7, LY - 7, LZ - 7, LX + 7, LY + 7, LZ + 7],
        run: async a => {
          a.flash('lideye', 9, 3.4);
          await a.tween('lid', { off: [0, 2.5, 0] }, 0.4);
          for (let k = 0; k < 6; k++) {
            await a.tween('lid', { off: [0, 2.5, 0], rot: [k % 2 ? 0.16 : -0.16, k % 2 ? 0.3 : -0.3, k % 2 ? -0.16 : 0.16] }, 0.22);
            a.burst([LX + 1.5, LY, LZ + 1.5], { n: 18, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1.4, up: 3, life: 1.1, gravity: -0.4, spread: 0.8 });
          }
          await a.tween('lid', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.3);
          a.burst([LX + 0.5, lg + 1, LZ + 0.5], { n: 50, colors: ['#ffffff', '#e8eef8'], speed: 6, up: 2, life: 1.2, gravity: 4, spread: 5, flat: true });
        },
      });

      // ── 4. 부서진 다리 족쇄: 붉은 머리칼로 감은 쇠 족쇄가 깨져 떨어져 있다 ──
      const KX = 62, KZ = 108, kg = MH.maxG(w, KX - 4, KZ - 4, KX + 4, KZ + 4);
      const shk = w.prop({ name: 'shackle', pivot: [KX + 0.5, kg + 2, KZ + 0.5], clipOK: 40 });
      for (let k = 0; k < 160; k++) {
        const a = k / 160 * Math.PI * 2; if (a > 5.0 && a < 5.6) continue;                 // 깨진 틈
        for (const t of [0, 0.7, 1.4]) for (const yy of [0, 1, 2]) shk.set(Math.round(KX + Math.cos(a) * (5.6 - t)), kg + 1 + yy, Math.round(KZ + Math.sin(a) * (5.6 - t)), ((k % 20) < 6 && t < 1) ? (yy === 1 ? B.hair2 : B.hair) : (yy === 2 ? B.ironR : B.iron));
      }
      const braids = [];
      // 끊어진 머리채 세 가닥이 동쪽(거인이 끌고 간 쪽)으로 길게 끌린다
      for (let j = 0; j < 3; j++) {
        const zz = KZ - 2 + j * 2, pts = [[KX + 5.4, kg + 2, zz]];
        for (let s = 1; s <= 6; s++) { const x = KX + 5.4 + s * 3, z = zz + Math.sin(s * 1.1 + j * 2) * 1.6; pts.push([x, gAt(x, z) + 1, z]); }
        const C = LB.tube(shk, pts, 0.5, (x, y, z) => hash3(x, y, z) > 0.45 ? B.hair : B.hair2);
        for (const q of [2, 4]) shk.set(Math.round(pts[q][0]), pts[q][1] + 1, Math.round(pts[q][2]), B.bead);
        braids.push(...C.filter((_, i) => i % 4 === 0));
      }
      lights.push({ name: 'shackle', p: [KX + 0.5, kg + 4, KZ + 0.5], c: '#ff6a2a', i: 0.25, d: 16, flicker: 0.4, srcR: 6 });
      busy.push([KX, KZ, 16]);
      acts.push({
        name: '부서진 다리 족쇄', hint: '거인이 붉은 머리칼로 감아 두었던 다리 족쇄가 들썩이고, 머리채를 따라 불씨가 타올라요', hit: [KX - 6, kg, KZ - 6, KX + 6, kg + 4, KZ + 6],
        run: async a => {
          a.flash('shackle', 7, 3);
          for (let k = 0; k < 4; k++) {
            await a.tween('shackle', { off: [0, 1.4, 0], rot: [0, k % 2 ? 0.12 : -0.12, 0] }, 0.14);
            a.burst([KX + 0.5, kg + 3, KZ + 0.5], { n: 16, colors: ['#ffb040', '#ffe08a'], speed: 4, up: 3, life: 0.6, gravity: 8, spread: 1 });
            await a.tween('shackle', { off: [0, 0, 0], rot: [0, 0, 0] }, 0.2);
          }
          for (const p of braids) { a.burst([p[0] + 0.5, p[1] + 1, p[2] + 0.5], { n: 8, colors: ['#ff6a1a', '#ffb040', '#d8401a'], speed: 0.8, up: 4, life: 1.2, gravity: -0.4, spread: 0.6 }); await a.wait(0.05); }
          await a.wait(0.6);
        },
      });

      // ── 5. 불타는 바위 비: 거인이 하늘로 던져 올린 녹은 바위가 설원에 쏟아진다. 떨어진 바위 무더기를 누르면 ──
      const RX = 114, RZ = 110, rgd = gAt(RX, RZ);
      for (const [dx, dz, r] of [[0, 0, 2.8], [3, 2, 2], [-2, 3, 1.8], [2, -3, 1.6]]) { const x = RX + dx, z = RZ + dz, g = gAt(x, z); MH.rock(w, x, g, z, r, B.basalt, null); for (let k = 0; k < 4; k++) w.set(x + (k % 2 ? 1 : -1) * Math.round(r - 1), g + 1 + (k >> 1), z + (k < 2 ? 1 : -1), B.ember); }
      for (let dz = -6; dz <= 6; dz++) for (let dx = -6; dx <= 6; dx++) { const d = Math.hypot(dx, dz); if (d < 6 && d > 3 && zone(RX + dx, RZ + dz) === 0) MH.paint(w, RX + dx, RZ + dz, hash3(dx, 3, dz) > 0.6 ? B.scorch : B.snowDk); }
      busy.push([RX, RZ, 8]);
      const drops = [[-24, -6], [-12, 12], [2, -16], [14, 16], [24, -2], [32, 10], [-34, 8], [8, 2]].map(([dx, dz]) => { const x = ACX + dx, z = ACZ + dz; return [x + 0.5, gAt(x, z) + 1.5, z + 0.5]; });
      acts.push({
        name: '불타는 바위 비', hint: '거인이 하늘로 흩뿌린 녹은 바위가 불덩이가 되어 설원 곳곳에 쏟아져요', hit: [RX - 4, rgd - 1, RZ - 4, RX + 4, rgd + 4, RZ + 4],
        run: async a => {
          a.flash('field', 6, 5); a.glow(1.5, 5);
          const src = [ACX + 0.5, gC + 28, ACZ + 0.5];
          a.burst(src, { n: 60, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 5, up: 8, life: 1.4, gravity: 2, spread: 4 });
          await Promise.all(drops.map(async (p, k) => {
            await a.wait(k * 0.34);
            await fly(a, src, p, 18, 14, ['#ff6a1a', '#ffb040'], 6);
            a.burst(p, { n: 46, colors: ['#ff6a1a', '#ffb040', '#ffe08a', '#3a2e2a'], speed: 6, up: 6, life: 1.3, gravity: 9, spread: 2 });
          }));
        },
      });

      // ══ 북쪽: 협곡과 윗단(대장간 기슭) ══
      // ── 6. 협곡을 건너는 거인의 사슬 두 가닥(보스방 입구) ──
      const anchor = (x, z) => { const g = MH.maxG(w, x - 3, z - 3, x + 3, z + 3); w.box(x - 3, g - 3, z - 3, x + 3, g, z + 3, B.fstone); w.box(x - 2, g + 1, z - 2, x + 2, g + 3, z + 2, B.iron); return [x, g + 3, z]; };
      const crossing = [-4, 4].map(o => { const s = anchor(56 + o, 50 + (o > 0 ? 1 : 0)), e = anchor(64 + o, 79 + (o > 0 ? -1 : 0)); busy.push([e[0], e[2], 5]); return LB.chain(w, [s[0], s[1], s[2] + 1.6], [e[0], e[1], e[2] - 1.6], 2, B.chain, { size: 1.8, ice: B.icicle }); });
      // 끊어져 협곡 아래로 늘어진 사슬(부품)
      const dgx = 100, dgz = 56, dgTop = PL + 2;
      { const ag = anchor(100, 46); LB.tube(w, [[ag[0], ag[1], ag[2]], [dgx, dgTop + 1, dgz]], 0.8, B.iron); }
      const dangle = w.prop({ name: 'dangle', pivot: [dgx + 0.5, dgTop + 1, dgz + 0.5], axis: 'x', rock: 0.04, rockSpeed: 0.7, clipOK: 30 });
      LB.chain(dangle, [dgx, dgTop, dgz], [dgx, dgTop - 24, dgz], 0, B.chain, { size: 1.5, ice: B.icicle });
      {
        const P = crossing[0], m = P(0.5);
        acts.push({
          name: '협곡의 사슬 다리', hint: '대장간 기슭에서 보스방으로 건너는 거대한 사슬에서 눈과 고드름이 떨어지고, 끊어진 사슬이 흔들려요', hit: [Math.round(m[0]) - 4, Math.round(m[1]) - 3, Math.round(m[2]) - 4, Math.round(m[0]) + 4, Math.round(m[1]) + 3, Math.round(m[2]) + 4],
          run: async a => {
            const sway = (async () => { for (let k = 0; k < 3; k++) { await a.turn('dangle', [0.26, 0, 0], 0.6); await a.turn('dangle', [-0.22, 0, 0], 0.7); } await a.turn('dangle', [0, 0, 0], 0.6); })();
            for (let k = 0; k <= 10; k++) for (const Q of crossing) { const p = Q(k / 10); a.burst([p[0] + 0.5, p[1] - 3, p[2] + 0.5], { n: 10, colors: ['#ffffff', '#d4f0fa', '#e8eef8'], speed: 1.5, up: 0, life: 1.8, gravity: 9, spread: 2 }); if (k % 2) await a.wait(0.16); }
            await sway;
          },
        });
        landmarks.push({ name: '협곡의 사슬', note: '보스방 입구 · 대장간 기슭에서 건너온다', p: [m[0], m[1] + 14, m[2]] });
      }
      // ── 7. 대장간 기슭 축복(윗단 남동쪽 끝, 사슬 앞) ──
      const [gfx, gfz] = [48, 44], gfp = LB.grace(w, gfx, gAt(gfx, gfz), gfz, B.grace);
      lights.push({ name: 'grace', p: gfp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push(LB.graceAct({ name: '대장간 기슭 축복', at: gfp, to: [PKX + 0.5, RT + 4, PKZ + 0.5], arc: 30, steps: 30, hint: '대장간 기슭의 축복이 협곡과 설원 너머 봉우리 위 거인들의 대장간을 가리켜요' }));
      landmarks.push({ name: '대장간 기슭', note: '사슬 앞의 축복', p: [gfp[0], gfp[1] + 14, gfp[2]] });
      // 거인의 거대한 유골: 대장간 기슭 바위에 박힌 해골
      const skull = (x, z, r) => {
        const g = gAt(x, z);
        w.ellipsoid(x, g + Math.round(r * 0.3), z, r, r * 0.86, r * 1.05, B.bone, (dx, dy, dz, d) => d > 0.72 || dy < -r * 0.3);
        for (const s of [-1, 1]) { w.sphere(x + s * Math.round(r * 0.36), g + Math.round(r * 0.45), z + Math.round(r * 0.8), r * 0.26, 0); w.sphere(x + s * Math.round(r * 0.36), g + Math.round(r * 0.45), z + Math.round(r * 0.66), r * 0.18, B.coal); }
        w.box(x - 1, g + Math.round(r * 0.1), z + Math.round(r * 0.95), x + 1, g + Math.round(r * 0.25), z + Math.round(r * 1.05), 0);
        for (let k = -3; k <= 3; k++) w.box(x + k, g - 1, z + Math.round(r * 1.0), x + k, g + (k & 1), z + Math.round(r * 1.0), B.boneDk);
        MH.rock(w, x - Math.round(r), g, z - 2, r * 0.7, B.basalt, B.snow); MH.rock(w, x + Math.round(r * 0.9), g, z - 3, r * 0.6, B.basalt, B.snow);
      };
      skull(78, 36, 8);
      landmarks.push({ name: '거인의 유해', note: '전쟁에서 쓰러진 거인의 해골', p: [78.5, PL + 22, 36.5] });
      // ── 8. 죄의 가시에 꿰인 거인: 윗단에 얼어붙은 털북숭이 주검, 하얀 가시 말뚝이 꿰뚫고 있다 ──
      const corpse = (x, z, r, salt) => {
        const g = gAt(x, z);
        // 웅크린 채 얼어붙은 털 무더기. 위는 눈이 덮였고 아래로 고드름
        const furB = (xx, yy, zz, top) => top && hash3(xx, yy, zz) > 0.3 ? B.snow2 : (hash3(xx, yy, zz + salt) > 0.62 ? B.furDk : B.fur);
        const blob = (cx, cy, cz, rx, ry, rz) => w.ellipsoid(cx, cy, cz, rx, ry, rz, B.fur, (dx, dy, dz) => { w.set(cx + dx, cy + dy, cz + dz, furB(cx + dx, cy + dy, cz + dz, dy > ry * 0.45)); return false; });
        blob(x, g + Math.round(r * 0.7), z, r * 0.9, r * 1.05, r * 0.8);                                   // 몸통
        blob(x + 1, g + Math.round(r * 0.5), z + Math.round(r * 0.7), r * 0.6, r * 0.55, r * 0.5);           // 앞으로 무너진 덩어리
        for (let k = 0; k < 30; k++) { const a = k / 30 * Math.PI * 2, xx = Math.round(x + Math.cos(a) * r * 0.95), zz = Math.round(z + Math.sin(a) * r * 0.85), yy = g + Math.round(r * 0.9); if (!w.get(xx, yy, zz) && !w.get(xx, yy + 1, zz)) continue; for (let q = 1; q < 2 + (hash3(xx, salt, zz) * 4 | 0); q++) if (!w.get(xx, yy - q, zz)) w.set(xx, yy - q, zz, B.icicle); }
        // 하얀 가시 말뚝: 몸통을 비스듬히 꿰뚫고 높이 솟는다
        const top = [x + 3, g + r * 3.2 + 4, z - 2], bot = [x - 2, g - 2, z + 2];
        const C = LB.tube(w, [bot, LB.lerp3(bot, top, 0.5), top], t => 1.0 - t * 0.55, B.briar);
        C.forEach((p, i) => { if (i % 4 === 2) { const a = i * 1.7, x2 = Math.round(p[0] + Math.cos(a) * 1.8), z2 = Math.round(p[2] + Math.sin(a) * 1.8); w.set(x2, Math.round(p[1]) + 1, z2, hash3(i, salt, 1) > 0.6 ? B.briarR : B.briar); } });
        return [x, g, z, top];
      };
      const cps = [corpse(30, 48, 8, 1), corpse(114, 30, 7, 2), corpse(18, 22, 7, 3)];
      const cp = cps[0];
      lights.push({ name: 'briar', p: [cp[0] + 0.5, cp[1] + 10, cp[2] + 0.5], c: '#ff4a2a', i: 0.15, d: 16, flicker: 0.3, srcR: 10 });
      acts.push({
        name: '죄의 가시에 꿰인 거인', hint: '윗단에 얼어붙은 거인의 주검을 꿰뚫은 하얀 가시 말뚝이 붉게 달아오르고 고드름이 부서져 내려요', hit: [cp[0] - 3, cp[1] + 12, cp[2] - 4, cp[0] + 5, Math.round(cp[3][1]), cp[2] + 2],
        run: async a => {
          a.flash('briar', 10, 3.2);
          for (let k = 2; k < 8; k++) {
            const t = k / 7, p = [cp[0] - 1 + (cp[3][0] - cp[0] + 1) * t, cp[1] - 2 + (cp[3][1] - cp[1] + 2) * t, cp[2] + 1 + (cp[3][2] - cp[2] - 1) * t];
            a.burst([p[0] + 2, p[1] + 1, p[2] + 2], { n: 12, colors: ['#ff4a2a', '#c03020', '#ffb040'], speed: 1, up: 2, life: 1, gravity: -0.2, spread: 0.8 });
            await a.wait(0.12);
          }
          a.burst([cp[0] + 0.5, cp[1] + 16, cp[2] + 0.5], { n: 50, colors: ['#ffffff', '#d4f0fa', '#c4e8f4'], speed: 4, up: 3, life: 1.4, gravity: 9, spread: 6 });
          await a.wait(1.2);
        },
      });
      landmarks.push({ name: '죄의 가시', note: '얼어붙은 거인들의 주검', p: [cp[0] + 0.5, cp[1] + 26, cp[2] + 0.5] });
      cps.forEach(c => busy.push([c[0], c[2], 9]));
      busy.push([78, 36, 12], [gfx, gfz, 4]);

      // ══ 동쪽 끝: 불의 거인 축복과 대장간으로 가는 이정표 ══
      const [fgx, fgz] = [136, 89], fgp = LB.grace(w, fgx, gAt(fgx, fgz), fgz, B.grace);
      lights.push({ name: 'grace2', p: fgp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push({
        name: '불의 거인 축복', hint: '거인이 쓰러진 뒤 설원 동쪽 끝에 축복이 피어나요. 금빛이 능선 너머 대장간으로 이어져요', hit: [fgx - 2, fgp[1] - 3, fgz - 2, fgx + 2, fgp[1] + 2, fgz + 2],
        run: async a => {
          a.flash('grace2', 5, 3);
          a.burst(fgp, { n: 40, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 2, up: 3, life: 1.6, gravity: -0.6, spread: 1.2 });
          await fly(a, fgp, [PKX + 0.5, RT + 3, PKZ + 0.5], 20, 22, ['#ffe9a0', '#ffd060']);
          a.flash('forge', 2.4, 2.5); a.burst([PKX + 0.5, RT + 1, PKZ + 0.5], { n: 70, colors: ['#ffe9a0', '#ffb040', '#ff6a1a'], speed: 3, up: 10, life: 2, gravity: 2, spread: 5 });
          await a.wait(1.2);
        },
      });
      landmarks.push({ name: '불의 거인 축복', note: '보스를 쓰러뜨리면 나타난다', p: [fgp[0], fgp[1] + 12, fgp[2]] });
      busy.push([fgx, fgz, 4]);
      {
        const sx = 146, sz = 82, sp = OR.signpost(w, B, sx, sz, { dir: [0, -1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '거인들의 대장간으로', goto: 'flamepeak-forge', hint: '설원 동쪽 끝의 눈 능선을 오르고 얼어붙은 사슬을 건너 멸망의 불이 잠든 거인들의 대장간으로 가요' }));
        busy.push([sx, sz, 4]);
      }

      // ══ 풍경: 죽은 나무, 검은 바위, 마른 풀 ══
      for (let i = 0; i < 220; i++) {
        const x = w.ri(6, W - 7), z = w.ri(6, D - 7), zn = zone(x, z), g = MH.g(w, x, z);
        if ((zn !== 0 && zn !== 2) || w.slope[x + W * z] > 1 || w.get(x, g + 1, z) || !free(x, z, 3)) continue;
        if (zn === 0 && AE[x + W * z] > -4) continue;
        if (zn === 0 && Math.hypot(x - ACX, z - ACZ) < 16) continue;               // 싸움터 한가운데는 비워 둔다
        if (i % 3 === 0) { MH.tree(w, x, g + 1, z, { kind: i % 2 ? 'dead' : 'twisted', h: w.ri(8, 14), bark: B.trunkDk, branches: 6 }); busy.push([x, z, 4]); }
        else { MH.rock(w, x, g, z, w.r(1.4, 3.6), i % 4 ? B.basalt : B.rockDk, B.snow); busy.push([x, z, 3]); }
      }
      MH.scatter(w, 2600, (x, g, z, b) => {
        if (b !== B.snow && b !== B.snow2) return;
        const zn = zone(x, z); if (zn !== 0 && zn !== 2 && zn !== 5) return;
        const r = hash3(x, 11, z);
        if (r < 0.1) w.set(x, g + 1, z, r < 0.04 ? B.grassDry2 : B.grassDry);
        else if (r < 0.3) w.set(x, g + 1, z, B.snow2);
      });
      return { lights, landmarks, acts };
    },
  });
})();
