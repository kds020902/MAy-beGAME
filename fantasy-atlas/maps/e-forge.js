// 거인들의 대장간(하위 지도) — 불의 정상 동쪽 끝, 협곡 위 바위 봉우리에 세운 아치 탑과 팔각 기둥 받침 위의 거대한 가마.
// 남서쪽 눈 능선 꼭대기 쇠말뚝에서 얼어붙은 사슬을 타고 올라 가마 가장자리를 돌면, 남동쪽 금 바로 앞 동쪽 가장자리에 축복이 있다. (불의 정상의 하위 지도)
// 좌표: +x 동쪽, +z 남쪽. 기본 시점(남동쪽)에서 보면 금 난 쪽이 앞을 향하고, 사슬은 왼쪽(남서)에서 올라온다.
(function () {
  'use strict';
  const { hash3 } = VX;
  const W = 160, D = 160, Hh = 176;
  const PX = 86, PZ = 70;                                   // 가마 한가운데
  MAPS.push({
    id: 'flamepeak-forge', cat: 'lands', sub: true, parent: 'flamepeak', name: '거인의 불가마', en: 'Forge of the Giants', color: '#ff6a2a', seed: 663, base: 30, time: 'night', size: [W, D, Hh],
    desc: '불의 정상 동쪽 끝, 구름 위로 솟은 바위 봉우리에 아치 탑과 팔각 기둥 받침을 쌓고 그 위에 거인들의 대장간 가마를 올렸다. 남서쪽 눈 능선에서 얼어붙은 사슬을 타고 오르면 짐승 머리 고리가 사슬을 물고 있고, 가마 속 잿더미에서는 멸망의 불이 잉걸불로 잠들어 있다. 남동쪽 금 앞 축복에서 멜리나가 황금 나무를 태울 불을 지폈다.',
    info: { title: '장소 정보', en: 'FORGE OF THE GIANTS', rows: [['오르는 길', '불의 정상 동쪽 끝 → 눈 능선 → 얼어붙은 사슬'], ['가마', '조각 띠를 두른 큰 가마 · 남동쪽에 금'], ['축복', '동쪽 가장자리 · 멜리나와의 약속']] },
    sky: ['#3a3040', '#0a0a16', '#d8602e'], stars: true,
    hemi: ['#b8b8d8', '#2a2028', 0.54], sun: ['#d0d4ff', 0.4, [0.5, 1, 0.65]],
    day: { sky: ['#b0b0c0', '#58607a', '#f0b890'], stars: false, hemi: ['#eef0ff', '#55505c', 0.6], sun: ['#fff0e0', 0.68, [0.5, 1, 0.65]], haze: '#a8a8b8' },
    liquid: ['#8ab8d0', '#b8dcec', '#f4ffff'], liqSpeed: 0.05,
    fog: { start: 0.82, floor: 18, depth: 16, haze: [40, 0.18, 12], hazeColor: '#3a3040' },
    camY: 42, zoom: 1.5,
    particles: [
      { n: 900, colors: ['#ffffff', '#e8eef8', '#c8d4e8'], mode: 'fall', speed: 0.9, wind: 1.8, y0: 20, y1: 170, glow: false },
      { n: 380, colors: ['#ff6a2a', '#ffb04a', '#ffe08a', '#d8401a'], mode: 'rise', speed: 1.2, area: [PX, PZ, 18], y0: 122, y1: 172, glow: true },
      { n: 260, colors: ['#ff6a2a', '#ff8a3a', '#d8401a'], mode: 'drift', speed: 0.35, wind: 0.7, y0: 40, y1: 150, glow: true },
    ],
    blocks: {
      snow: { c: '#9aa6b8', top: '#eef2f8', v: 0.04 }, snow2: { c: '#9aa6b8', top: '#dde4ee', v: 0.05 }, snowDk: { c: '#7a8698', top: '#bcc8d8', v: 0.05 },
      rock: { c: '#55535c', v: 0.06, pat: 'stone' }, rockDk: { c: '#3c3a44', v: 0.06, pat: 'stone' }, basalt: { c: '#2a2830', v: 0.05, pat: 'log' }, basalt2: { c: '#36343e', v: 0.05, pat: 'log' },
      icicle: { c: '#d4f0fa', v: 0.03 }, chain: { c: '#45403f', v: 0.05 }, iron: { c: '#2e2c30', v: 0.03 },
      fstone: { c: '#3e3a40', v: 0.05, pat: 'brick' }, fstoneL: { c: '#5c5660', v: 0.05, pat: 'brick' }, fstoneD: { c: '#2c282e', v: 0.05, pat: 'stone' },
      fband: { c: '#4e4648', v: 0.04 }, frelief: { c: '#6e6468', v: 0.04 }, fpanel: { c: '#352f34', v: 0.04 }, frim: { c: '#7a7478', top: '#8c868a', v: 0.05, pat: 'stone' },
      col: { c: '#34303a', v: 0.04, pat: 'log' }, colL: { c: '#4a4450', v: 0.04, pat: 'log' }, archIn: { c: '#141016', v: 0.02 },
      beast: { c: '#b8b2a8', v: 0.05, pat: 'big' }, beastDk: { c: '#7e786e', v: 0.05 }, eyeR: { c: '#ff6a1a', glow: true },
      clinker: { c: '#3a3640', top: '#4a4652', v: 0.08 }, ashG: { c: '#7a7680', top: '#9a96a0', v: 0.07 }, coal: { c: '#2a1c18', v: 0.06 },
      ember: { c: '#ff6a1a', glow: true }, ember2: { c: '#ffb040', glow: true }, flame: { c: '#ffe08a', glow: true },
      bone: { c: '#c8c0b0', v: 0.06, pat: 'big' }, boneDk: { c: '#a09888', v: 0.06, pat: 'stone' },
      trunkDk: { c: '#1e1a1c', v: 0.05 },
      grace: { c: '#ffe9a0', glow: true },
      // 이정표(OR.signpost)용
      stoneG: { c: '#3a3840', v: 0.05 }, timber: { c: '#3a2c26', v: 0.05 }, door: { c: '#5a4636', v: 0.05, pat: 'plank' }, gold: { c: '#ff9a3a', glow: true }, mlamp: { c: '#ffb050', glow: true },
    },
    build(w) {
      const B = w.id, n = w.noise, base = w.base, sst = MH.sstep;
      const PKT = base + 44;                                  // 봉우리 꼭대기(탑 바닥)
      // 남서쪽에서 올라오는 눈 능선(불의 정상 설원 동쪽 끝과 이어진다)
      const RG = [[8, 156], [26, 132], [42, 114], [50, 104]], POST = [50, 103];
      const rgL = [], rgC = [0];
      for (let i = 0; i < RG.length - 1; i++) { rgL.push(Math.hypot(RG[i + 1][0] - RG[i][0], RG[i + 1][1] - RG[i][1])); rgC.push(rgC[i] + rgL[i]); }
      const RGT = rgC[rgC.length - 1];
      const ridge = (x, z) => {
        let best = 1e9, bk = 0;
        for (let i = 0; i < RG.length - 1; i++) {
          const [ax, az] = RG[i], [bx, bz] = RG[i + 1], dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz, k = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / l2)), d = Math.hypot(x - ax - dx * k, z - az - dz * k);
          if (d < best) { best = d; bk = (rgC[i] + rgL[i] * k) / RGT; }
        }
        return { k: bk, d: best };
      };
      const RGH = k => base + 8 + Math.pow(k, 1.15) * 46;     // 능선 높이: 아래 설원 쪽에서 쇠말뚝까지
      const ZN = new Uint8Array(W * D);                       // 0 골짜기 1 봉우리 2 능선 3 북쪽 산 4 구름 아래 낭떠러지
      MH.terrain(w, {
        floor: base - 26,
        height: (x, z) => {
          const dP = Math.hypot(x - PX, z - PZ), ang = Math.atan2(z - PZ, x - PX), pr = 18 + n.fbm(Math.cos(ang) * 2.5 + 5, Math.sin(ang) * 2.5, 2) * 7;
          const rg = ridge(x, z), rw = 15 - rg.k * 6 + n.fbm(x * 0.15, z * 0.15, 2) * 2;
          const i = x + W * z;
          let h, zn;
          const floorH = base - 6 + n.fbm(x * 0.06, z * 0.06, 3) * 5;
          const north = base + 44 - z * 1.5 + n.ridge(x * 0.06, z * 0.05, 3) * 14 - Math.max(0, x - 110) * 0.7;
          const drop = Math.max(0, (x + z) - 214) * 0.9 + Math.max(0, x - 136) * 0.9;           // 동·남쪽으로 구름 아래 낭떠러지
          if (dP < pr + 10) { zn = 1; const e = dP - pr; h = e < 0 ? PKT - n.fbm(x * 0.2, z * 0.2, 2) * 1.5 : PKT - 6 - e * 3.2 - n.ridge(x * 0.12, z * 0.12, 3) * 8 + (hash3(x >> 2, 1, z >> 2) > 0.7 ? 3 : 0); }
          else if (rg.d < rw && rg.k > 0) { zn = 2; const q = rg.d / rw; h = Math.max(floorH, RGH(rg.k) - (q < 0.3 ? q * 3 : 0.9 + (q - 0.3) * 38 * (0.5 + rg.k)) + n.fbm(x * 0.2, z * 0.2, 2) * 1.5); }
          else if (north > floorH) { zn = 3; h = north; }
          else { zn = drop > 2 ? 4 : 0; h = floorH - drop; }
          // 봉우리 둘레는 깎아지른 절벽에서 골짜기 바닥으로 이어진다
          if (zn === 1) h = Math.max(h, floorH);
          ZN[i] = zn;
          return Math.max(base - 25, Math.min(Hh - 20, h));
        },
        surface: (x, z, y, s) => {
          const zn = ZN[x + W * z];
          if (zn === 1) return s >= 3 ? (hash3(x >> 1, 3, z >> 1) > 0.5 ? B.basalt : B.basalt2) : B.snowDk;
          if (s >= 4) return hash3(x >> 1, 5, z >> 1) > 0.5 ? B.basalt : B.rockDk;
          return s >= 2 ? B.snowDk : (n.fbm(x * 0.13, z * 0.13, 2) > 0.58 ? B.snow2 : B.snow);
        },
        under: (x, z, y, dep, s) => {
          if (dep < 1 && s < 3) return B.snow;
          const c = hash3(x >> 1, 7, z >> 1);
          return ZN[x + W * z] === 1 || s >= 4 ? (c > 0.7 ? B.basalt2 : B.basalt) : ((y + (hash3(x >> 3, 0, z >> 3) * 3 | 0)) % 5 === 0 ? B.rockDk : B.rock);
        },
      });
      const lights = [], acts = [], landmarks = [];
      const gAt = (x, z) => MH.g(w, Math.round(x), Math.round(z));
      const fly = async (a, from, to, arc, steps, colors, nn) => {
        for (let k = 1; k <= steps; k++) { const t = k / steps, p = LB.lerp3(from, to, t); p[1] += Math.sin(t * Math.PI) * arc; a.burst(p, { n: nn || 8, colors, speed: 0.6, up: 0.4, life: 1, gravity: 0, spread: 0.6 }); await a.wait(0.05); }
      };

      // ══ 아치 탑: 봉우리 꼭대기에 올린 네모난 고딕 몸채 ══
      const TH = 12, T0 = PKT - 3, T1 = PKT + 16;
      for (let y = T0; y <= T1; y++) for (let dz = -TH; dz <= TH; dz++) for (let dx = -TH; dx <= TH; dx++) {
        const ax = Math.abs(dx), az = Math.abs(dz), edge = ax === TH || az === TH;
        if (!edge && y > T0 + 1 && y < T1) { w.set(PX + dx, y, PZ + dz, B.fstoneD); continue; }
        let b = ((y >> 1) + ((ax === TH ? dz : dx) >> 1)) & 1 ? B.fstone : B.fstoneD;
        if ((ax === TH && az === TH) || (ax === TH && Math.abs(dz) % 6 === 0) || (az === TH && Math.abs(dx) % 6 === 0)) b = B.fstoneL;        // 붙임기둥
        if (y === T1 || y === T0 + 6) b = B.fband;
        w.set(PX + dx, y, PZ + dz, b);
      }
      for (const [axis, c] of [['x', PZ - TH], ['x', PZ + TH], ['z', PX - TH], ['z', PX + TH]]) for (const u of [-9, -3, 3, 9])
        LB.arch(w, { axis, c, u0: (axis === 'x' ? PX : PZ) + u, y0: T0 + 7, a: 1.5, h: 7, kind: 'pointed', fill: B.archIn, frame: B.fstoneL });
      // ══ 팔각 기둥 묶음 받침 세 단(아래에서 보면 톱니 원반이 겹친 모양) ══
      let ty = T1 + 1;
      for (let tier = 0; tier < 3; tier++) {
        const r0 = 14.5 - tier * 1.6;
        w.cyl(PX, PZ, ty, ty + 2, r0 - 1.4, B.fstoneD);
        for (let k = 0; k < 18; k++) {
          const a = (k + tier * 0.5) / 18 * Math.PI * 2, cx = Math.round(PX + Math.cos(a) * r0), cz = Math.round(PZ + Math.sin(a) * r0);
          w.cyl(cx, cz, ty, ty + 2, 1.5, k % 2 ? B.colL : B.col);
        }
        w.cyl(PX, PZ, ty + 3, ty + 3, r0 + 0.8, B.fband);
        ty += 4;
      }
      w.cyl(PX, PZ, ty, ty + 1, 9.5, B.fstoneD);                                              // 받침 목
      const SB = ty + 2, BH = 22, RT = SB + BH;                                               // 가마 바닥 · 높이 · 가장자리
      const bowlR = y => y < 14 ? 12 + 10 * Math.sin(y / 14 * Math.PI / 2) : 22 + (y - 14) * 0.18;
      const CRACK = Math.PI * 0.25, FILL = BH - 3;                                             // 남동쪽 금, 잿더미 높이
      const angDiff = (a, b) => Math.abs(((a - b) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
      const inCrack = (ang, y) => y >= BH - 10 && angDiff(ang, CRACK) < 0.04 + (y - BH + 10) * 0.017;
      const ashTop = (dx, dz) => { const d = Math.hypot(dx, dz); return FILL + (d < 6 ? Math.round(3 * (1 - d / 6) + n.fbm(dx * 0.4, dz * 0.4, 2)) : 0); };
      for (let y = 0; y <= BH; y++) {
        const r = bowlR(y), R = Math.ceil(r) + 1, wall = y >= BH - 1 ? 3.6 : 2.4;
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz); if (d > r + 0.45) continue;
          const ang = Math.atan2(dz, dx), x = PX + dx, yy = SB + y, z = PZ + dz;
          if (y > 0 && d < r - wall) {
            // 속: 잿더미(가운데 회색 재 둔덕, 그 둘레 잉걸불 고리, 나머지는 검은 숯재)
            const at = ashTop(dx, dz);
            if (y < at) w.set(x, yy, z, B.coal);
            else if (y === at) w.set(x, yy, z, d < 4.5 ? B.ashG : (d >= 5 && d < 9.5 ? (hash3(dx, y, dz) > 0.35 ? B.ember : B.ember2) : (hash3(dx, 4, dz) > 0.93 ? B.ember : B.clinker)));
            continue;
          }
          if (inCrack(ang, y)) { if (y <= FILL) w.set(x, yy, z, hash3(dx, y, dz) > 0.5 ? B.ember : B.coal); continue; }
          let b = B.fstone;
          const out = d > r - 0.9;
          if (y >= BH - 1) b = B.frim;
          else if (y === 2 || y === 9 || y === 14 || y === BH - 3) b = B.fband;
          else if (out && y > 9) {
            // 조각 띠: 세로 갈비와 들어간 판, 판마다 둥근 무늬
            const seg = ang / (Math.PI * 2) * 36, f = seg - Math.floor(seg);
            if (f < 0.16) b = B.frelief;
            else if (y > 14) b = (Math.abs(f - 0.58) < 0.16 && Math.abs(y - 17.5) < 1.2) ? B.frelief : B.fpanel;
            else b = (y === 11 || y === 12) && Math.abs(f - 0.58) < 0.2 ? B.frelief : B.fpanel;
          } else if (out && y > 2) b = ((Math.round(ang * 20 / Math.PI) + y) & 3) === 0 ? B.frelief : B.fstone;
          w.set(x, yy, z, b);
        }
      }
      lights.push({ name: 'forge', p: [PX + 0.5, SB + FILL + 4, PZ + 0.5], c: '#ff7a2a', i: 1.8, d: 56, flicker: 0.3, srcR: 10 });
      landmarks.push({ name: '거인들의 대장간', note: '멸망의 불이 잉걸불로 잠든 큰 가마', p: [PX + 0.5, RT + 22, PZ + 0.5], tag: 'FORGE' });

      // ── 1. 멸망의 불: 잿더미 속 잉걸불이 깨어나 불기둥으로 치솟는다(부품) ──
      const plume = w.prop({ name: 'plume', pivot: [PX + 0.5, SB + FILL + 2, PZ + 0.5], scl0: [0, 0, 0], clipOK: 20 });
      for (let y = 0; y < 30; y++) {
        const rr = 9 * (1 - y / 36) + Math.sin(y * 0.7) * 0.8, R = Math.ceil(rr);
        for (let dz = -R; dz <= R; dz++) for (let dx = -R; dx <= R; dx++) {
          const d = Math.hypot(dx, dz), hh = hash3(dx + 40, y, dz + 40);
          if (d > rr || (d > rr * 0.55 && hh < 0.4)) continue;
          plume.set(PX + dx, SB + FILL + 4 + y, PZ + dz, d < rr * 0.45 ? B.flame : (hh > 0.62 ? B.ember2 : B.ember));
        }
      }
      const mt = SB + ashTop(0, 0);
      acts.push({
        name: '멸망의 불', hint: '가마 속 잿더미의 잉걸불이 깨어나 멸망의 불이 하늘로 치솟아요', hit: [PX - 5, mt - 1, PZ - 5, PX + 5, mt + 3, PZ + 5],
        run: async a => {
          a.flash('forge', 3.2, 5); a.glow(2, 5); a.lightning(0.25);
          a.tween('plume', { scl: [1, 1, 1] }, 0.9);
          for (let k = 0; k < 12; k++) { a.burst([PX + 0.5, SB + FILL + 20, PZ + 0.5], { n: 50, colors: ['#ff6a1a', '#ffb040', '#ffe08a', '#ffffff'], speed: 3.5, up: 18, life: 2.2, gravity: 2, spread: 7 }); await a.wait(0.32); }
          await a.tween('plume', { scl: [0, 0, 0] }, 1.2);
        },
      });

      // ══ 손잡이 고리와 끊어져 늘어진 사슬(북·남) ══
      const hangs = [];
      for (const [s, nm] of [[-1, 'hangN'], [1, 'hangS']]) {
        const rr = bowlR(12) + 2.2, hz = PZ + s * rr, hy = SB + 12;
        for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2; for (const t of [0, 1]) w.set(PX + (t ? (s > 0 ? 1 : -1) : 0), hy + Math.round(Math.sin(a) * 3.2), Math.round(hz + s * (Math.cos(a) * 3.2 + 1.2)), B.iron); }
        const top = hy - 3, len = nm === 'hangS' ? 46 : 30;
        const pr = w.prop({ name: nm, pivot: [PX + 0.5, top, hz + s * 1.2 + 0.5], axis: 'x', rock: 0.03, rockSpeed: 0.5 + (s > 0 ? 0.1 : 0), clipOK: 60 });
        LB.chain(pr, [PX, top, hz + s * 1.2], [PX, top - len, hz + s * 1.2], 0, B.chain, { size: 1.6, ice: B.icicle });
        hangs.push([nm, PX, top, hz + s * 1.2, len]);
      }
      {
        const [, hx, ht, hz, hl] = hangs[1];
        acts.push({
          name: '끊어진 사슬', hint: '가마 손잡이 고리에 걸린 끊어진 사슬이 흔들리며 고드름과 눈이 골짜기로 떨어져요', hit: [hx - 3, ht - 16, hz - 3, hx + 3, ht - 2, hz + 3],
          run: async a => {
            const sw = n2 => (async () => { for (let k = 0; k < 3; k++) { await a.turn(n2, [0.22, 0, 0], 0.7); await a.turn(n2, [-0.18, 0, 0], 0.8); } await a.turn(n2, [0, 0, 0], 0.6); })();
            const p1 = sw('hangS'), p2 = (async () => { await a.wait(0.4); await sw('hangN'); })();
            for (let k = 0; k < 8; k++) { a.burst([hx + 0.5, ht - 4 - k * 4, hz + 0.5], { n: 14, colors: ['#ffffff', '#d4f0fa', '#c4e8f4'], speed: 2, up: 1, life: 1.6, gravity: 9, spread: 2 }); await a.wait(0.2); }
            await Promise.all([p1, p2]);
          },
        });
      }

      // ══ 남서쪽 눈 능선 · 쇠말뚝 · 얼어붙은 사슬 · 짐승 머리 고리 ══
      const pg = MH.maxG(w, POST[0] - 2, POST[1] - 2, POST[0] + 2, POST[1] + 2);
      w.box(POST[0] - 2, pg - 3, POST[1] - 2, POST[0] + 2, pg + 6, POST[1] + 2, B.fstone);
      w.box(POST[0] - 2, pg + 7, POST[1] - 2, POST[0] + 2, pg + 7, POST[1] + 2, B.fband);
      w.box(POST[0] - 1, pg + 8, POST[1] - 1, POST[0] + 1, pg + 9, POST[1] + 1, B.fstoneL);
      const cAng = Math.atan2(POST[1] - PZ, POST[0] - PX), cr = bowlR(BH) + 1.5;
      const head = [PX + Math.cos(cAng) * cr, RT - 2, PZ + Math.sin(cAng) * cr];
      // 짐승 머리: 가장자리 바깥으로 주둥이를 내민 흰 돌 머리, 눈은 감겨 있다
      const hd = [Math.cos(cAng), Math.sin(cAng)], hs = [-hd[1], hd[0]];
      const HP = (f, s, u) => [head[0] + hd[0] * f + hs[0] * s, head[1] + u, head[2] + hd[1] * f + hs[1] * s];
      w.ellipsoid(...HP(0, 0, 0).map(Math.round), 4.5, 4, 4.5, B.beast);
      LB.tube(w, [HP(1, 0, 0), HP(4, 0, -0.5), HP(6.5, 0, -1.2)], t => 3.2 - t * 1.2, (x, y, z, t, dy) => dy < -1 ? B.beastDk : B.beast);
      for (const s of [-1, 1]) { const e = HP(2.6, s * 2.6, 1.6).map(Math.round); w.set(e[0], e[1], e[2], B.beastDk); w.set(e[0], e[1] + 1, e[2], B.beastDk); }
      const eyeL = HP(2.9, -2.8, 1.6).map(Math.round), eyeRr = HP(2.9, 2.8, 1.6).map(Math.round);
      const lid = w.prop({ name: 'beastlid', pivot: [eyeL[0] + 0.5, eyeL[1] + 1, eyeL[2] + 0.5], clipOK: 12 });
      for (const e of [eyeL, eyeRr]) for (const [ox, oz] of [[0, 0], [hs[0], hs[1]], [-hs[0], -hs[1]]]) lid.set(Math.round(e[0] + ox), e[1], Math.round(e[2] + oz), B.beastDk);
      for (const e of [eyeL, eyeRr]) for (const [ox, oz] of [[0, 0], [hs[0], hs[1]], [-hs[0], -hs[1]]]) w.set(Math.round(e[0] + ox), e[1], Math.round(e[2] + oz), 0);
      // 눈알(감긴 눈꺼풀 부품 뒤, 한 칸 안쪽)
      for (const e of [HP(2.4, -2.5, 1.6), HP(2.4, 2.5, 1.6)].map(p => p.map(Math.round))) w.set(e[0], e[1], e[2], B.eyeR);
      const mouth = HP(6.8, 0, -1.6);
      lights.push({ name: 'beast', p: [eyeL[0] + 0.5, eyeL[1] + 0.5, eyeL[2] + 0.5], c: '#ff6a2a', i: 0.15, d: 12, flicker: 0.2, srcR: 6 });
      // 얼어붙은 사슬: 쇠말뚝에서 짐승 머리 입까지, 위에 눈이 쌓여 등줄기처럼 보인다
      const cA = [POST[0], pg + 5, POST[1]], cB = mouth;
      const CH = LB.chain(w, cA, cB, 3, B.chain, { size: 2.2, ice: B.icicle });
      const snowPts = [];
      for (let k = 0; k <= 24; k++) { const p = CH(k / 24); snowPts.push([p[0], p[1] + 2.2, p[2]]); }
      LB.tube(w, snowPts.filter((_, i) => i % 2 === 0 && i > 0 && i < 24), 1.5, (x, y, z) => hash3(x, y, z) > 0.2 ? B.snow2 : B.icicle, { under: true });
      snowPts.forEach((p, i) => { if (i % 2 === 0) for (let q = 1; q < 2 + (hash3(i, 3, 7) * 3 | 0); q++) { const x = Math.round(p[0]), z = Math.round(p[2]), y = Math.round(p[1]) - 4 - q; if (!w.get(x, y, z)) w.set(x, y, z, B.icicle); } });
      const cm = CH(0.5);
      acts.push({
        name: '얼어붙은 사슬', hint: '능선 쇠말뚝에서 가마까지 이어진 얼어붙은 사슬 다리를 따라 눈더미가 쏟아지고 고드름이 부서져요', hit: [Math.round(cm[0]) - 4, Math.round(cm[1]) - 3, Math.round(cm[2]) - 4, Math.round(cm[0]) + 4, Math.round(cm[1]) + 4, Math.round(cm[2]) + 4],
        run: async a => {
          a.wind(2.5, 3);
          for (let k = 0; k <= 16; k++) { const p = CH(k / 16); a.burst([p[0] + 0.5, p[1] + 4.5, p[2] + 0.5], { n: 16, colors: ['#ffffff', '#e8eef8', '#d4f0fa'], speed: 2, up: 1, life: 1.8, gravity: 9, spread: 2.5 }); await a.wait(0.11); }
          await a.wait(0.8);
        },
      });
      landmarks.push({ name: '얼어붙은 사슬', note: '능선에서 가마로 건너는 길', p: [cm[0], cm[1] + 12, cm[2]] });
      acts.push({
        name: '짐승 머리 고리', hint: '사슬을 물고 있는 가마 가장자리의 흰 짐승 머리가 감았던 눈을 붉게 떠요', hit: [Math.round(head[0]) - 4, head[1] - 3, Math.round(head[2]) - 4, Math.round(head[0]) + 4, head[1] + 4, Math.round(head[2]) + 4],
        run: async a => {
          a.flash('beast', 14, 3.4);
          await a.tween('beastlid', { off: [0, 2.6, 0] }, 0.5);
          for (let k = 0; k < 6; k++) { for (const e of [eyeL, eyeRr]) a.burst([e[0] + 0.5 + hd[0], e[1] + 0.5, e[2] + 0.5 + hd[1]], { n: 10, colors: ['#ff6a1a', '#ffb040'], speed: 1, up: 2, life: 1, gravity: -0.3, spread: 0.5 }); await a.wait(0.35); }
          a.burst([mouth[0] + 0.5, mouth[1], mouth[2] + 0.5], { n: 40, colors: ['#ffffff', '#d4f0fa'], speed: 3, up: 2, life: 1.4, gravity: 8, spread: 3 });
          await a.tween('beastlid', { off: [0, 0, 0] }, 0.4);
        },
      });

      // ══ 남동쪽 금과 동쪽 가장자리의 축복 ══
      const crP = [PX + Math.cos(CRACK) * (bowlR(BH) - 1), SB + FILL + 1, PZ + Math.sin(CRACK) * (bowlR(BH) - 1)];
      lights.push({ name: 'crack', p: [crP[0] + 0.5, crP[1] + 2, crP[2] + 0.5], c: '#ff5a1a', i: 0.6, d: 20, flicker: 0.5, srcR: 6 });
      acts.push({
        name: '가마의 금', hint: '가마 남동쪽 쐐기 모양 금 사이로 불길이 새어 나와요. 멜리나가 마지막으로 섰던 자리예요', hit: [Math.round(crP[0]) - 3, crP[1] - 1, Math.round(crP[2]) - 3, Math.round(crP[0]) + 3, crP[1] + 8, Math.round(crP[2]) + 3],
        run: async a => {
          a.flash('crack', 6, 3.6); a.glow(1.6, 3.6);
          for (let k = 0; k < 10; k++) { a.burst([crP[0] + 0.5, crP[1] + 1 + (k % 3), crP[2] + 0.5], { n: 26, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1.6, up: 8, life: 1.3, gravity: -0.6, spread: 1.2 }); await a.wait(0.3); }
        },
      });
      landmarks.push({ name: '가마의 금', note: '빠져나간 가마 조각 자리', p: [crP[0], crP[1] + 16, crP[2]] });
      const gA = -0.12, gr = bowlR(BH) - 1.8, gx = Math.round(PX + Math.cos(gA) * gr), gz = Math.round(PZ + Math.sin(gA) * gr);
      const gp = LB.grace(w, gx, RT, gz, B.grace);
      lights.push({ name: 'grace', p: gp, c: '#ffe08a', i: 0.9, d: 10, flicker: 0.1 });
      acts.push({
        name: '거인들의 대장간 축복', hint: '동쪽 가장자리의 축복. 멜리나가 몸을 불살라 지핀 금빛 불길이 남서쪽 하늘 너머 황금 나무를 향해 번져요', hit: [gx - 2, RT - 1, gz - 2, gx + 2, RT + 4, gz + 2],
        run: async a => {
          a.flash('grace', 5, 4); a.flash('forge', 2.6, 4); a.glow(1.8, 4);
          a.burst(gp, { n: 50, colors: ['#ffe9a0', '#ffd060', '#fff6d0'], speed: 2, up: 4, life: 1.8, gravity: -0.6, spread: 1.4 });
          await a.wait(0.4);
          a.burst([PX + 0.5, SB + FILL + 3, PZ + 0.5], { n: 90, colors: ['#ffe9a0', '#ffb040', '#ff6a1a'], speed: 4, up: 14, life: 2.2, gravity: 1, spread: 8 });
          await fly(a, [PX + 0.5, RT + 6, PZ + 0.5], [6, RT + 30, 150], 20, 30, ['#ffe9a0', '#ffb040', '#ff6a1a'], 12);
          await a.wait(0.6);
        },
      });
      landmarks.push({ name: '거인들의 대장간 축복', note: '멜리나와의 약속 · 동쪽 가장자리', p: [gp[0], gp[1] + 12, gp[2]] });

      // ══ 골짜기의 거인 유해: 해골과 갈비뼈가 봉우리 발치 눈 속에 박혀 있다 ══
      let SKX = 64, SKZ = 112;
      { let lo = 1e9; for (let z = 100; z <= 124; z += 2) for (let x = 52; x <= 76; x += 2) { const g = MH.maxG(w, x - 4, z - 4, x + 4, z + 4); if (ZN[x + W * z] === 0 && g < lo) { lo = g; SKX = x; SKZ = z; } } }
      const sg = MH.minG(w, SKX - 3, SKZ - 3, SKX + 3, SKZ + 3), sr = 9;
      w.ellipsoid(SKX, sg + 3, SKZ, sr, sr * 0.86, sr * 1.05, B.bone, (dx, dy, dz, d) => d > 0.74 || dy < -sr * 0.4);
      const eyes = [];
      for (const s of [-1, 1]) { const ex = SKX + Math.round((s * 0.38 + 0.38) * sr * 0.7), ez = SKZ + Math.round((0.38 - s * 0.38) * sr * 0.7 + sr * 0.35); w.sphere(ex, sg + 5, ez, sr * 0.26, 0); w.sphere(ex - 1, sg + 5, ez - 1, sr * 0.16, B.ember); eyes.push([ex, sg + 5, ez]); }
      for (let k = -4; k <= 4; k++) { const x = SKX + 6 + Math.round(k * 0.7), z = SKZ + 6 - Math.round(k * 0.7); w.box(x, sg, z, x, sg + 1 + (k & 1), z, B.boneDk); }
      MH.rock(w, SKX - 9, sg, SKZ - 2, 5, B.basalt, B.snow); MH.rock(w, SKX + 2, sg, SKZ - 9, 4, B.basalt, B.snow);
      // 갈비뼈: 봉우리 남쪽 발치
      const rbx = 104, rbz = 104, rbg = gAt(rbx, rbz);
      for (let k = 0; k < 7; k++) { const x = rbx - 12 + k * 4, L = 10 - Math.abs(k - 3) * 1.4; for (const s of [-1, 1]) LB.tube(w, [[x, rbg + 1, rbz], [x + s * 1, rbg + L * 0.9, rbz + s * L * 0.6], [x + s * 1.5, rbg, rbz + s * L]], 0.75, B.bone); }
      LB.tube(w, [[rbx - 16, rbg, rbz], [rbx, rbg + 1, rbz], [rbx + 16, rbg, rbz + 1]], 1.4, B.boneDk);
      lights.push({ name: 'skull', p: [SKX + 3.5, sg + 6, SKZ + 5.5], c: '#ff6a2a', i: 0.3, d: 16, flicker: 0.4, srcR: 8 });
      acts.push({
        name: '협곡의 거인 유해', hint: '봉우리 발치 눈 속에 박힌 거인의 해골 눈구멍에 불씨가 되살아나요', hit: [SKX - 6, sg, SKZ - 4, SKX + 8, sg + 10, SKZ + 10],
        run: async a => { a.flash('skull', 7, 3.4); for (let k = 0; k < 7; k++) { for (const e of eyes) a.burst([e[0] + 1, e[1], e[2] + 1.5], { n: 14, colors: ['#ff6a1a', '#ffb040', '#ffe08a'], speed: 1, up: 6, life: 1.4, gravity: -0.5, spread: 0.8 }); await a.wait(0.35); } },
      });
      landmarks.push({ name: '거인의 유해', note: '대장간 아래 골짜기', p: [SKX + 0.5, sg + 20, SKZ + 0.5] });

      // ══ 능선 아래: 불의 정상으로 돌아가는 이정표 ══
      {
        const sx = 26, sz = 138, sp = OR.signpost(w, B, sx, sz, { dir: [-1, 1], boards: 1, h: 6 });
        acts.push(OR.goAct({ at: sp, name: '불의 정상으로', goto: 'flamepeak', hint: '눈 능선을 따라 내려가 불의 거인과 싸운 아랫단 설원으로 돌아가요' }));
        landmarks.push({ name: '능선 길', note: '불의 정상 설원으로', p: [sx + 0.5, sp[1] + 14, sz + 0.5] });
      }

      // ══ 풍경: 능선과 골짜기의 죽은 나무, 검은 바위, 눈 ══
      for (let i = 0; i < 120; i++) {
        const x = w.ri(4, W - 5), z = w.ri(4, D - 5), g = MH.g(w, x, z), zn = ZN[x + W * z];
        if (zn === 1 || zn === 4 || w.slope[x + W * z] > 1 || w.get(x, g + 1, z) || Math.hypot(x - PX, z - PZ) < 30) continue;
        if (Math.hypot(x - SKX, z - SKZ) < 14 || Math.hypot(x - rbx, z - rbz) < 18 || Math.hypot(x - 26, z - 138) < 5 || Math.hypot(x - POST[0], z - POST[1]) < 6) continue;
        if (i % 4 === 0) MH.tree(w, x, g + 1, z, { kind: 'dead', h: w.ri(7, 11), bark: B.trunkDk, branches: 5 });
        else MH.rock(w, x, g, z, w.r(1.4, 3.4), i % 3 ? B.basalt : B.rockDk, B.snow);
      }
      MH.scatter(w, 900, (x, g, z, b) => { if ((b === B.snow || b === B.snow2) && w.chance(0.25)) w.set(x, g + 1, z, B.snow2); });
      return { lights, landmarks, acts };
    },
  });
})();
