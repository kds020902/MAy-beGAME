/*
 * 오푸스덜스 — 전투 효과음
 * 무료 녹음 효과음(OpenGameArt, 모두 CC0)만 쓴다. 출처는 assets/sfx/CREDITS.txt
 *   SFX.play(name, { vol })
 *     'swing'  무기를 휘두르는 소리
 *     'clash'  합: 무기끼리 부딪히는 소리 + 「챙」 하고 울리는 쇳소리
 *     'slash' / 'pierce' / 'blunt'  검 · 창 · 둔기 적중음
 *     'slide'  뒤로 밀려나며 모래 바닥에 끌리는 소리
 *   SFX.muted / SFX.setMuted(bool)
 * 브라우저 정책상 첫 입력 뒤에 소리가 난다. 파일을 못 불러오면 소리 없이 진행한다.
 */
(function (root) {
  'use strict';
  const BASE = root.FFD_SFX_BASE || 'assets/sfx/';
  const FILES = ['swing1', 'swing2', 'swing3', 'swing4', 'clash1', 'clash2', 'clash3', 'ching1', 'ching2', 'ching3', 'ching4',
    'slash1', 'slash2', 'slash3', 'pierce1', 'pierce2', 'pierce3', 'blunt1', 'blunt2', 'blunt3', 'sand1', 'sand2', 'sand3'];
  // file:// 로 열면 fetch 가 막혀 있으므로 <audio> 요소로 재생한다
  const useElements = !!(root.location && root.location.protocol === 'file:');
  let ctx = null;
  let bus = null;
  let muted = false;
  let loading = false;
  const buffers = {};

  function ensure() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return true; }
    const AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    bus = ctx.createGain();
    bus.gain.value = 0.6;
    bus.connect(ctx.destination);
    loadAll();
    return true;
  }

  function loadAll() {
    if (loading) return;
    loading = true;
    FILES.forEach(name => {
      const url = BASE + name + '.mp3';
      if (useElements) {
        const a = new Audio();
        a.preload = 'auto';
        a.src = url;
        a.addEventListener('canplaythrough', () => { buffers[name] = a; }, { once: true });
        return;
      }
      fetch(url).then(r => (r.ok ? r.arrayBuffer() : Promise.reject(r.status)))
        .then(ab => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)))
        .then(buf => { buffers[name] = buf; })
        .catch(() => { /* 없으면 조용히 */ });
    });
  }

  const pickOne = list => list[Math.floor(Math.random() * list.length)];
  // 묶음 중 하나를 재생. 매번 음높이를 조금씩 바꿔 반복감을 줄인다
  function sample(prefix, count, o) {
    const ready = [];
    for (let i = 1; i <= count; i++) if (buffers[prefix + i]) ready.push(prefix + i);
    if (!ready.length) return;
    const buf = buffers[pickOne(ready)];
    const rate = (o.rate || 1) * (1 + (Math.random() - 0.5) * (o.jitter == null ? 0.1 : o.jitter));
    const vol = Math.max(0, Math.min(1.5, o.gain));
    const delay = o.delay || 0;
    if (buf instanceof AudioBuffer) {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = rate;
      const g = ctx.createGain();
      g.gain.value = vol;
      src.connect(g).connect(bus);
      src.start(ctx.currentTime + delay);
      return;
    }
    const play = () => {
      const a = buf.cloneNode();
      a.preservesPitch = false;
      a.mozPreservesPitch = false;
      a.webkitPreservesPitch = false;
      a.playbackRate = rate;
      a.volume = Math.min(1, vol * 0.6);
      a.play().catch(() => {});
    };
    if (delay) setTimeout(play, delay * 1000); else play();
  }

  const SOUNDS = {
    swing(v) { sample('swing', 4, { gain: 0.7 * v, jitter: 0.16 }); },
    clash(v) {
      sample('clash', 3, { gain: 0.75 * v });                 // 무기끼리 부딪히는 몸통 소리
      sample('ching', 4, { gain: 0.95 * v, delay: 0.012 });   // 뒤따라 울리는 「챙」
    },
    slash(v) { sample('slash', 3, { gain: 0.85 * v }); },
    pierce(v) { sample('pierce', 3, { gain: 0.95 * v, rate: 1.05 }); },
    blunt(v) { sample('blunt', 3, { gain: 1.0 * v, rate: 0.92 }); },
    slide(v) { sample('sand', 3, { gain: 0.8 * v, rate: 0.95, jitter: 0.14 }); },
  };

  const SFX = {
    get muted() { return muted; },
    setMuted(v) { muted = !!v; },
    play(name, opts) {
      if (muted || !SOUNDS[name]) return;
      const v = (opts && opts.vol != null) ? opts.vol : 1;
      try { if (ensure()) SOUNDS[name](v); } catch (e) { /* 오디오 불가 환경 */ }
    },
    unlock() { try { ensure(); } catch (e) { /* 무시 */ } },
    // 불러온 효과음 수 (확인용)
    get loaded() { return Object.keys(buffers).length; },
    get total() { return FILES.length; },
  };
  root.SFX = SFX;
})(window);
