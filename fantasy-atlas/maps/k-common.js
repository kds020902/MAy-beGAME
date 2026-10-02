// k-common.js — 은빛 왕국 왕도 공용 팔레트와 도시 도구 (128칸)
(function () {
  'use strict';
  const { W, D, hash3 } = VX;
  const KP = {
    grass: { c: '#6a4a30', top: '#6aa84a', v: 0.08 }, grass2: { c: '#6a4a30', top: '#7ab852', v: 0.08 },
    dirt: { c: '#6a4a30', v: 0.08 }, rock: { c: '#8a8a90', v: 0.06, pat: 'stone' }, rockDk: { c: '#606068', v: 0.06, pat: 'stone' },
    cobble: { c: '#8a8680', top: '#a8a49c', v: 0.1, pat: 'stone' }, cobble2: { c: '#8a8680', top: '#94908a', v: 0.1, pat: 'stone' },
    slab: { c: '#b8b4ac', top: '#d8d4ca', v: 0.04, pat: 'check', alt: '#c4c0b6' }, found: { c: '#9a968e', v: 0.05, pat: 'stone' },
    white: { c: '#eceef2', v: 0.03, pat: 'big' }, whiteDk: { c: '#c4c8d0', v: 0.04, pat: 'brick' }, trim: { c: '#f6f4ee', v: 0.02 },
    gold: { c: '#e8c04a', v: 0.05 }, roofB: { c: '#2e5aa8', v: 0.05, pat: 'tile' }, roofR: { c: '#b04a3a', v: 0.05, pat: 'tile' },
    roofBr: { c: '#7a4a30', v: 0.05, pat: 'tile' }, roofG: { c: '#3a6a4a', v: 0.05, pat: 'tile' }, eave: { c: '#3a3038', v: 0.03 },
    banner: { c: '#2a4a9a', v: 0.03 }, bannerR: { c: '#a02a34', v: 0.03 },
    plaster: { c: '#efe6d2', v: 0.03 }, plasterB: { c: '#c8d8e8', v: 0.03 }, plasterP: { c: '#f0d0cc', v: 0.03 }, plasterG: { c: '#d4e4c8', v: 0.03 }, plasterY: { c: '#f2e2a8', v: 0.03 },
    frame: { c: '#5a3a24', v: 0.05 }, door: { c: '#4a3a2a', v: 0.03, pat: 'plank' },
    shutG: { c: '#3a6a4a', v: 0.03 }, shutB: { c: '#3a5a8a', v: 0.03 }, shutR: { c: '#8a3a2a', v: 0.03 },
    plank: { c: '#8a6a40', v: 0.08, pat: 'plank' }, wood: { c: '#6a4a30', v: 0.05 }, iron: { c: '#4a4a52', v: 0.03 }, rope: { c: '#b8a888', v: 0.03 },
    bark: { c: '#5a3a24', v: 0.05 }, leaf: { c: '#4a8a3a', v: 0.1 }, leaf2: { c: '#6aaa48', v: 0.1 }, leafDk: { c: '#3a6a30', v: 0.08 }, hedge: { c: '#3a7a3a', v: 0.1 },
    flowerR: { c: '#d8404a', v: 0.05 }, flowerY: { c: '#f0d040', v: 0.05 }, flowerW: { c: '#ffffff', v: 0.02 },
    crate: { c: '#a07a4a', v: 0.08, pat: 'plank' }, barrel: { c: '#8a5a30', v: 0.08, pat: 'log' },
    win: { c: '#ffd890', night: true, day: '#8ab8e0' }, lampG: { c: '#ffe6a8', night: true, day: '#d8d0b0' },
  };
  const DAY = {
    time: 'day', sky: ['#d8ecf8', '#5a90d0', '#fff8e0'], stars: false,
    hemi: ['#ffffff', '#4a5a3a', 0.54], sun: ['#fff4e0', 0.76, [0.5, 1, 0.45]],
    liquid: ['#2a5a8a', '#4a8ac0', '#e0f4ff'], liqSpeed: 0.7,
  };
  // 도시 블록: 사각 영역을 집들로 촘촘히 채운다(가장자리 안개 속으로 이어지는 도시)
  function block(w, B, x0, z0, x1, z1, face, o) {
    o = o || {};
    const walls = [B.plaster, B.plasterB, B.plasterP, B.plasterG, B.plasterY];
    const roofs = [B.roofR, B.roofB, B.roofBr, B.roofG];
    const shut = [B.shutG, B.shutB, B.shutR];
    const res = [];
    const alongX = face === 's' || face === 'n';
    let p = alongX ? x0 : z0;
    const end = alongX ? x1 : z1;
    while (p < end - 6) {
      const len = Math.min(end - p, w.ri(o.min || 9, o.max || 12));
      const x = alongX ? p : x0, z = alongX ? z0 : p;
      const sx = alongX ? len : (x1 - x0), sz = alongX ? (z1 - z0) : len;
      const k = res.length + (o.seed || 0);
      const h = MH.houseX(w, { x, z, sx, sz, floors: o.floors ? o.floors[k % o.floors.length] : 2 + (k % 2), fh: o.fh || 6, face, jetty: k % 3 === 1, studs: k % 2 === 0, pitch: k % 4 === 3 ? 2 : 1,
        dormers: k % 3 === 0 ? 1 : 0, balcony: k % 5 === 2 ? 1 : 0, y: o.y,
        m: { found: B.found, wall: walls[k % walls.length], frame: B.frame, quoin: k % 2 ? B.found : null, win: B.win, shutter: shut[k % 3], sill: B.found, flower: k % 2 ? B.flowerR : null,
          door: B.door, roof: roofs[k % roofs.length], eave: B.eave, ridge: B.trim, chimney: k % 2 ? B.found : null, lamp: B.lampG, rail: B.iron } });
      res.push(h);
      p += len + (o.gap || 0);
    }
    return res;
  }
  // 집 문 앞 등불 조명(밤 전용) — 몇 채 걸러 하나씩
  function doorLights(lights, hs, every, face) {
    hs.forEach((h, k) => { if (k % (every || 3) === 0) lights.push({ p: [h.door[0] + 0.5, h.door[1] + 3, h.door[2] + 0.5], c: '#ffd890', i: 0.8, d: 10, flicker: 0.1, night: true }); });
  }
  window.KINGDOM = { KP, DAY, block, doorLights };
})();
