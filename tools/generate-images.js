#!/usr/bin/env node
/*
 * Codex CLI로 직업·몬스터·아이템 이미지를 만든다. (노트북에서 실행)
 *
 *   node tools/generate-images.js              아직 없는 이미지를 모두 만든다
 *   node tools/generate-images.js --only monsters   classes / monsters / items 중 하나만
 *   node tools/generate-images.js --id ghoul   특정 id 하나만
 *   node tools/generate-images.js --force      이미 있는 이미지도 다시 만든다
 *   node tools/generate-images.js --list       만들 목록과 프롬프트만 출력
 *   node tools/generate-images.js --manifest   이미지 생성 없이 assets/manifest.js 만 갱신
 *   node tools/generate-images.js --codex "exec --full-auto"   codex 에 넘길 인자 (기본값)
 *
 * 이미지는 assets/<종류>/<id>.png 로 저장되고, 끝나면 assets/manifest.js 에 등록된다.
 * 게임은 manifest 에 등록된 이미지만 쓰고, 없으면 아이콘으로 대신한다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const D = require('../js/data.js');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const args = process.argv.slice(2);
const flag = name => args.includes(name);
const opt = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };

const STYLE = [
  'dark fantasy illustration for a roguelike card game',
  'painterly, muted desaturated palette with one warm accent color',
  'dramatic rim lighting, subject centered and filling most of the frame',
  'plain dark vignette background, square composition',
  'no text, no letters, no border, no watermark',
].join('; ');

function targets() {
  const out = [];
  D.CLASSES.forEach(c => out.push({
    kind: 'classes', id: c.id, name: c.name,
    prompt: `Portrait of a playable hero, the "${c.name}" (${c.role}, weapon: ${c.weapon}). ${c.desc} Waist-up heroic pose. ${STYLE}.`,
  }));
  D.REGIONS.forEach(r => {
    const mobs = [...r.monsters.map(m => [m, 'monster']), [r.midboss, 'mid-boss'], [r.boss, 'boss']];
    mobs.forEach(([m, role]) => out.push({
      kind: 'monsters', id: m.id, name: m.name,
      prompt: `A ${role} enemy "${m.name}" from the region "${r.name}" (${r.desc}). ${m.desc} Menacing, facing the viewer.${role === 'boss' ? ' Imposing and grand.' : ''} ${STYLE}.`,
    }));
  });
  D.ITEMS.forEach(it => out.push({
    kind: 'items', id: it.id, name: it.name,
    prompt: `Game item icon of "${it.name}" (the object suggested by the emoji ${it.icon}). A single object shown alone, centered, clean silhouette readable at small size. ${STYLE}.`,
  }));
  return out;
}

function existing(kind, id) {
  for (const ext of ['png', 'webp', 'jpg']) {
    const f = path.join(ASSETS, kind, `${id}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function writeManifest() {
  const map = {};
  ['classes', 'monsters', 'items'].forEach(kind => {
    const dir = path.join(ASSETS, kind);
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).filter(f => /\.(png|webp|jpg)$/i.test(f)).sort().forEach(f => {
      map[`${kind}/${f.replace(/\.[^.]+$/, '')}`] = `assets/${kind}/${f}`;
    });
  });
  const body = [
    '// 게임이 사용할 이미지 목록. tools/generate-images.js 가 이미지를 만든 뒤 자동으로 다시 쓴다.',
    "// 키: '<종류>/<id>' (classes / monsters / items), 값: index.html 기준 경로",
    `window.FFD_ASSETS = ${JSON.stringify(map, null, 2)};`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(ASSETS, 'manifest.js'), body);
  console.log(`assets/manifest.js 갱신: 이미지 ${Object.keys(map).length}개`);
}

function main() {
  if (flag('--manifest')) { writeManifest(); return; }
  let list = targets();
  const only = opt('--only');
  const id = opt('--id');
  if (only) list = list.filter(t => t.kind === only);
  if (id) list = list.filter(t => t.id === id);
  if (!flag('--force')) list = list.filter(t => !existing(t.kind, t.id));

  if (flag('--list')) {
    list.forEach(t => console.log(`[${t.kind}/${t.id}] ${t.name}\n  ${t.prompt}\n`));
    console.log(`총 ${list.length}개`);
    return;
  }
  if (!list.length) { console.log('만들 이미지가 없습니다.'); writeManifest(); return; }

  const codexArgs = (opt('--codex') || 'exec --full-auto').split(/\s+/).filter(Boolean);
  let ok = 0;
  list.forEach((t, n) => {
    const out = path.join(ASSETS, t.kind, `${t.id}.png`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const instruction = [
      `Generate one square PNG image (1024x1024 or 512x512) and save it at exactly this path: ${out}`,
      `Image description: ${t.prompt}`,
      'Use your built-in image generation if you have it. Otherwise write and run a small script that calls the OpenAI Images API',
      '(model gpt-image-1) with the OPENAI_API_KEY environment variable and saves the result to that path.',
      'Do not create or modify any other files in this repository. Delete any temporary script you create.',
    ].join('\n');
    console.log(`\n[${n + 1}/${list.length}] ${t.kind}/${t.id} — ${t.name}`);
    const r = spawnSync('codex', [...codexArgs, instruction], { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
    if (r.error) {
      console.error(`codex 를 실행하지 못했습니다: ${r.error.message}\nCodex CLI 설치 확인: npm install -g @openai/codex`);
      process.exitCode = 1;
      return;
    }
    if (existing(t.kind, t.id)) ok++;
    else console.warn(`  ⚠ ${out} 이(가) 만들어지지 않았습니다.`);
  });
  console.log(`\n완료: ${ok}/${list.length}개 생성`);
  writeManifest();
}

main();
