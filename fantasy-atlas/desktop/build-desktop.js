// 오프라인 데스크톱 실행본 빌드 (Electron 프리빌트 + 단일 HTML)
// 사용법 (fantasy-atlas/ 에서):  node desktop/build-desktop.js [win|linux|mac|all]   (기본: win)
//   ELECTRON_VERSION=31.7.7 처럼 환경 변수로 Electron 버전을 바꿀 수 있다.
// 필요: node, curl, unzip, zip (프록시는 curl이 HTTPS_PROXY 로 그대로 사용)
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');           // fantasy-atlas/
const MAPS = path.join(ROOT, 'maps');
const DESK = __dirname;                                // fantasy-atlas/desktop/
const CACHE = path.join(DESK, '.cache');
const DIST = path.join(DESK, 'dist');
const APPDIR = path.join(DESK, 'app');
const EV = process.env.ELECTRON_VERSION || '31.7.7';
const THREE_VER = '0.128.0';
const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const SCRATCH_THREE = '/tmp/claude-0/-home-user-MAy-beGAME/0355cf59-6473-52d5-a258-2adc62436b83/scratchpad/three.min.js';

const TARGETS = {
  win:        { plat: 'win32-x64',    out: 'FateFiveAtlas-win-x64.zip' },
  linux:      { plat: 'linux-x64',    out: 'FateFiveAtlas-linux-x64.zip' },
  'mac-x64':  { plat: 'darwin-x64',   out: 'FateFiveAtlas-mac-x64.zip' },
  'mac-arm64':{ plat: 'darwin-arm64', out: 'FateFiveAtlas-mac-arm64.zip' },
};
const ALIASES = { win: ['win'], linux: ['linux'], mac: ['mac-x64', 'mac-arm64'], all: Object.keys(TARGETS) };

const log = (...a) => console.log('[desktop]', ...a);
const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', ...opts });
const kb = f => Math.round(fs.statSync(f).size / 1024);
const rm = p => fs.rmSync(p, { recursive: true, force: true });

function need(cmd) {
  try { execFileSync(cmd, ['-v'], { stdio: 'ignore' }); }
  catch (e) {
    if (e.code === 'ENOENT') { console.error(`'${cmd}' 명령이 필요합니다 (PATH에 없음).`); process.exit(1); }
  }
}

// ---------- 1) three.min.js r128 확보 ----------
function getThree() {
  fs.mkdirSync(CACHE, { recursive: true });
  const cached = path.join(CACHE, 'three-r128.min.js');
  if (fs.existsSync(cached)) return fs.readFileSync(cached, 'utf8');
  let src = null;
  if (fs.existsSync(SCRATCH_THREE)) src = fs.readFileSync(SCRATCH_THREE, 'utf8');
  else {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'three-pack-'));
    log('npm pack three@' + THREE_VER);
    run('npm', ['pack', 'three@' + THREE_VER, '--silent'], { cwd: tmp, stdio: ['ignore', 'ignore', 'inherit'], shell: process.platform === 'win32' });
    const tgz = fs.readdirSync(tmp).find(f => f.endsWith('.tgz'));
    run('tar', ['-xzf', tgz, 'package/build/three.min.js'], { cwd: tmp });
    src = fs.readFileSync(path.join(tmp, 'package/build/three.min.js'), 'utf8');
    rm(tmp);
  }
  if (!src.includes('"128"')) throw new Error('three.min.js 가 r128 이 아닙니다');
  if (/<\/script/i.test(src)) throw new Error('three.min.js 에 </script 가 있어 인라인 불가');
  fs.writeFileSync(cached, src);
  return src;
}

// ---------- 2) 단일 HTML 생성 (build-inline.js 와 같은 규칙 + 오프라인화) ----------
function buildHtml() {
  let h = fs.readFileSync(path.join(MAPS, 'index.html'), 'utf8');
  let n = 0; const missing = [];
  // 지도 스크립트 + audio/manifest.js 를 끼워 넣는다(소리 파일 자체는 아래에서 app/audio/ 로 복사)
  h = h.replace(/<script src="((?:audio\/)?[a-z0-9-]+\.js)"><\/script>/g, (m, f) => {
    const p = path.join(MAPS, f);
    if (!fs.existsSync(p)) { missing.push(f); return ''; }
    n++;
    return '<script>\n' + fs.readFileSync(p, 'utf8') + '\n</script>';
  });
  // three.js CDN → 인라인
  const three = getThree();
  const cdnRe = /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js"><\/script>/;
  if (!cdnRe.test(h)) throw new Error('index.html 에서 three.js CDN 스크립트를 찾지 못했습니다: ' + THREE_CDN);
  h = h.replace(cdnRe, () => '<script>\n' + three + '\n</script>');
  // Google Fonts 링크 제거 (CSS 폰트 스택의 시스템 폰트로 대체)
  h = h.replace(/[ \t]*<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\r?\n?/g, '');
  const remote = h.match(/<(script|link)[^>]+(src|href)="https?:[^"]*"/g);
  if (remote) throw new Error('남은 원격 리소스: ' + remote.join(', '));
  rm(APPDIR);
  fs.mkdirSync(APPDIR, { recursive: true });
  fs.writeFileSync(path.join(APPDIR, 'index.html'), h);
  copyAudio();
  log(`app/index.html: ${n}개 스크립트 + three r128 인라인, ${Math.round(h.length / 1024)} KB`,
    missing.length ? 'MISSING ' + missing.join(',') : '');
  if (missing.length) process.exitCode = 2;
}

// 소리 파일: maps/audio/ → app/audio/ (상대 경로 "audio/..." 그대로; manifest.js 등 스크립트는 이미 인라인)
function copyAudio() {
  const src = path.join(MAPS, 'audio');
  if (!fs.existsSync(src)) { log('maps/audio 없음 — 소리 없이 빌드'); return; }
  let files = 0, bytes = 0;
  fs.cpSync(src, path.join(APPDIR, 'audio'), {
    recursive: true,
    filter: f => {
      if (fs.statSync(f).isDirectory()) return true;
      if (/\.js$/i.test(f)) return false;
      files++; bytes += fs.statSync(f).size;
      return true;
    },
  });
  log(`app/audio: ${files}개 파일, ${(bytes / 1048576).toFixed(1)} MB`);
}

// ---------- 3) Electron 프리빌트 다운로드 (캐시 + SHA256 검증) ----------
function download(url, dest) {
  log('download', url);
  const part = dest + '.part';
  run('curl', ['-fL', '--retry', '3', '--progress-bar', '-o', part, url]);
  fs.renameSync(part, dest);
}
function getElectronZip(plat) {
  fs.mkdirSync(CACHE, { recursive: true });
  const name = `electron-v${EV}-${plat}.zip`;
  const zip = path.join(CACHE, name);
  const base = `https://github.com/electron/electron/releases/download/v${EV}/`;
  const sums = path.join(CACHE, `SHASUMS256-v${EV}.txt`);
  if (!fs.existsSync(sums)) download(base + 'SHASUMS256.txt', sums);
  const line = fs.readFileSync(sums, 'utf8').split('\n').find(l => l.trim().endsWith('*' + name) || l.trim().endsWith(' ' + name));
  if (!line) throw new Error('SHASUMS256.txt 에 ' + name + ' 항목 없음');
  const want = line.trim().split(/\s+/)[0].toLowerCase();
  const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
  if (fs.existsSync(zip) && sha(zip) !== want) { log('캐시 해시 불일치, 다시 받음'); rm(zip); }
  if (!fs.existsSync(zip)) {
    download(base + name, zip);
    if (sha(zip) !== want) { rm(zip); throw new Error(name + ' SHA256 불일치'); }
  }
  return zip;
}

// ---------- 4) 패키징 ----------
function copyApp(dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(path.join(DESK, 'main.js'), path.join(dest, 'main.js'));
  fs.copyFileSync(path.join(DESK, 'package.json'), path.join(dest, 'package.json'));
  fs.cpSync(APPDIR, path.join(dest, 'app'), { recursive: true });
}

function pack(key) {
  const t = TARGETS[key];
  const ezip = getElectronZip(t.plat);
  const folder = t.out.replace(/\.zip$/, '');            // zip 안의 최상위 폴더명
  const stage = path.join(CACHE, 'stage-' + key);
  const top = path.join(stage, folder);
  rm(stage);
  fs.mkdirSync(top, { recursive: true });
  run('unzip', ['-q', ezip, '-d', top]);
  rm(path.join(top, 'resources', 'default_app.asar'));

  if (t.plat.startsWith('win32')) {
    fs.renameSync(path.join(top, 'electron.exe'), path.join(top, 'FateFiveAtlas.exe'));
    copyApp(path.join(top, 'resources', 'app'));
  } else if (t.plat.startsWith('linux')) {
    fs.renameSync(path.join(top, 'electron'), path.join(top, 'FateFiveAtlas'));
    fs.chmodSync(path.join(top, 'FateFiveAtlas'), 0o755);
    copyApp(path.join(top, 'resources', 'app'));
  } else {
    const appb = path.join(top, 'Fate Five Atlas.app');
    fs.renameSync(path.join(top, 'Electron.app'), appb);
    rm(path.join(appb, 'Contents', 'Resources', 'default_app.asar'));
    copyApp(path.join(appb, 'Contents', 'Resources', 'app'));
  }

  fs.mkdirSync(DIST, { recursive: true });
  const out = path.join(DIST, t.out);
  rm(out);
  // -y: 심볼릭 링크 보존 (macOS 프레임워크에 필요)
  run('zip', ['-qry', '-9', out, folder], { cwd: stage });
  rm(stage);
  log(`${t.out}: ${(fs.statSync(out).size / 1048576).toFixed(1)} MB → ${out}`);
}

// ---------- main ----------
const arg = (process.argv[2] || 'win').toLowerCase();
const keys = ALIASES[arg] || (TARGETS[arg] ? [arg] : null);
if (!keys) { console.error('사용법: node desktop/build-desktop.js [win|linux|mac|mac-x64|mac-arm64|all]'); process.exit(1); }
['curl', 'unzip', 'zip'].forEach(need);
buildHtml();
for (const k of keys) pack(k);
log('완료 (Electron v' + EV + ')');
