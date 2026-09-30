#!/usr/bin/env node
/*
 * Codex CLI로 전투 무대에 나오는 행동별 자세 그림(픽셀 아트)을 만든다. (노트북에서 실행)
 *
 *   node tools/generate-sprites.js                 아직 없는 자세 그림을 모두 만든다
 *   node tools/generate-sprites.js ghoul werewolf  특정 캐릭터만
 *   node tools/generate-sprites.js --force ghoul   이미 있는 그림도 다시 만든다
 *   node tools/generate-sprites.js --list          캐릭터 목록만 출력
 *   node tools/generate-sprites.js --force --pose=attack   모든 캐릭터의 공격 자세만 다시 만든다 (쉼표로 여러 개)
 *
 * 그림에는 이펙트(휘두르는 궤적, 섬광, 불꽃, 피 튀김 등)를 넣지 않는다. 이펙트는 게임이 VFX로 따로 그린다.
 *
 * 캐릭터마다 idle(대기) 를 먼저 만들고, 그 그림을 참고 이미지로 넣어 attack(공격) / defend(방어·회피) / hit(피격) 을 만든다.
 * 새 캐릭터의 idle 은 방랑검사 idle 을 화풍 참고로 넣어 화풍을 맞춘다.
 * 그림은 assets/sprites/<id>/<자세>.png 로 저장되고, 끝나면 assets/manifest.js 가 갱신된다.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SPRITES = path.join(ROOT, 'assets', 'sprites');
const STYLE_REF = path.join(SPRITES, 'swordsman', 'idle.png');

const STYLE = 'Pixel art battle sprite for a dark fantasy roguelike, 16-bit style with clearly visible chunky square pixels, crisp hard pixel edges, no blur, limited muted desaturated palette with one warm accent color, dark outline around the character. Whole body shown, side view, character fills most of the square 1:1 frame with small margin. Background must be fully transparent (alpha); if transparency is impossible use a flat solid pure #FF00FF magenta background with no shadows or gradients. No text, no letters, no border, no watermark, no ground, no scenery, no throne, no background objects. Draw only the character itself: no visual effects of any kind — no motion trails, swooshes, slash arcs, speed lines, sparks, impact flashes, glowing auras, magic particles, fire, smoke or blood splashes (the game adds all effects separately).';

// id → [바라보는 방향, 묘사]. 플레이어는 오른쪽, 적은 왼쪽을 본다.
const CHARS = {
  swordsman: ['right', 'a lone wandering swordsman in a tattered dark travelling cloak and worn leather armor, holding a single long straight sword, scarred face half hidden under a hood, a dark red lining on the cloak'],
  herald: ['right', 'a holy herald pilgrim in travel-stained white and gold vestments, holding a long spear with a small pennant, soft golden holy glow around him, calm face'],
  cavalry: ['right', 'a heavy cavalry knight on foot, in massive dented plate armor with a large kite shield and a flanged mace, closed visor helm with a faded red plume'],
  ghoul: ['left', 'an emaciated grey-skinned ghoul hunched low, long cracked claws, sunken glowing eyes, torn burial cloth'],
  skeleton: ['left', 'a skeleton soldier in rusted chainmail and a broken helmet, holding a notched rusty sword and a cracked round shield'],
  wraith: ['left', 'a howling translucent floating wraith with a wide screaming mouth, trailing tattered shroud, pale blue-grey ethereal glow'],
  gravekeeper: ['left', 'a hulking gravekeeper giant holding a huge iron shovel and a dim lantern, patched leather coat, stitched face'],
  bonelord: ['left', 'the lord of bones, a towering standing skeleton king with a crown of bone, tattered royal cape, green soul fire burning in the eye sockets, holding a bone scepter; imposing boss'],
  werewolf: ['left', 'a frenzied werewolf standing on hind legs, matted dark fur, bloodshot eyes and bared fangs, torn clothes, long claws'],
  shroom: ['left', 'a rotting mushroom monster, a humanoid body made of fungus with a large cap, sickly green glowing spores drifting from its cap'],
  spiders: ['left', 'a cluster of three venomous black spiders with red markings, legs raised, grouped together'],
  spiderqueen: ['left', 'a gigantic spider queen with a pale humanoid upper body on a huge black spider abdomen and legs, clusters of egg sacs on her back; imposing boss'],
  witch: ['left', 'an ancient witch fused with a gnarled dead tree, bark skin, roots as hair, glowing amber eyes, thorny vines coiling around her'],
  zealot: ['left', 'a hooded blood-cult zealot in crimson robes holding a spiked flail, self-inflicted wounds'],
  gargoyle: ['left', 'a stone gargoyle with cracked granite skin, bat wings, glowing red eyes, clawed hands'],
  vampriest: ['left', 'a vampire priest in black and red vestments, pale gaunt face with fangs, holding a golden chalice of blood'],
  inquisitor: ['left', 'a masked inquisitor in dark armor wrapped in chains, iron face mask, holding a burning branding iron'],
  archbishop: ['left', 'a corrupted archbishop floating slightly above the ground in blood-soaked golden mitre and robes, a halo of floating blood droplets; imposing boss'],
  stalker: ['left', 'an eyeless cave stalker, a pale bat-like humanoid with huge ears and long thin limbs and claws'],
  tentacles: ['left', 'a writhing mass of slimy dark tentacles rising from a small pile of cave rock, faint purple bioluminescence'],
  shade: ['left', 'a living shadow in a lost human shape with smoky dissolving edges and two faint white eyes'],
  watcher: ['left', 'an enormous floating veined eyeball of the abyss surrounded by several smaller floating eyes, faint purple aura'],
  nameless: ['left', 'a nameless eldritch horror, a shifting shapeless mass of mouths, eyes and tentacles; imposing boss'],
  frozen: ['left', 'a frozen undead villager covered in frost and icicles, blue skin, ragged peasant clothes'],
  frostwolf: ['left', 'a large white frost wolf with icy breath and glowing pale blue eyes, frost on its fur'],
  paleknight: ['left', 'a pale undead knight in frost-covered ornate armor with a tattered blue tabard and a longsword'],
  frostcommander: ['left', 'a frost knight commander in heavy ice-encrusted armor holding a greatsword made of ice, a small frozen banner on his back'],
  winterking: ['left', 'an undead winter king standing tall, crown of icicles, frozen long white beard, blue soul fire in the eyes, ice scepter, frost-covered royal robes; imposing boss'],
};

const POSES = {
  idle: 'Pose: battle-ready idle stance, poised to fight.',
  attack: 'Pose: dynamic attack in mid-motion, lunging toward the direction it faces and striking with its weapon, claws, fangs or tentacles. The body and weapon alone show the motion; no swoosh, trail or energy effect.',
  defend: 'Pose: defensive guard and evasion, pulling back and bracing, blocking or shielding itself.',
  hit: 'Pose: taking a hit, recoiling backwards away from the direction it faces and staggering in pain.',
};

const args = process.argv.slice(2);
const force = args.includes('--force');
const ids = args.filter(a => !a.startsWith('--'));
const poseArg = args.find(a => a.startsWith('--pose='));
const onlyPoses = poseArg ? poseArg.slice('--pose='.length).split(',').filter(Boolean) : null;

function generate(id, pose) {
  const [facing, desc] = CHARS[id];
  const dir = path.join(SPRITES, id);
  const out = path.join(dir, `${pose}.png`);
  fs.mkdirSync(dir, { recursive: true });
  const ref = pose === 'idle' ? STYLE_REF : path.join(dir, 'idle.png');
  const useRef = fs.existsSync(ref) && !(pose === 'idle' && id === 'swordsman');
  const instruction = [
    `Generate exactly one square 1:1 image with your built-in image generation tool and save it as a PNG at exactly this path: ${out}`,
    !useRef ? '' : pose === 'idle'
      ? 'The attached image is a STYLE reference only: match its pixel size, outline, shading and palette treatment, but draw a completely different character as described below.'
      : 'The attached image is the reference sprite of this same character. Keep the exact same character design, colors, outfit, weapon, proportions, pixel scale and art style; only change the pose.',
    `Image prompt: ${STYLE} Character: ${desc}, facing ${facing}. ${POSES[pose]}`,
    'If the generated image does not have a transparent background, remove the flat background color so it becomes transparent (you may write a short temporary script outside the repository for that, then delete it).',
    'Do not create or modify any other files in the repository.',
  ].filter(Boolean).join('\n');
  const codexArgs = ['exec', ...(useRef ? ['-i', `"${ref}"`] : []), '-s', 'workspace-write', '--skip-git-repo-check', '-'];
  console.log(`[${id}/${pose}]`);
  const r = spawnSync('codex', codexArgs, { cwd: ROOT, input: instruction, stdio: ['pipe', 'inherit', 'inherit'], shell: process.platform === 'win32' });
  if (r.error) throw new Error(`codex 를 실행하지 못했습니다: ${r.error.message}\nCodex CLI 설치 확인: npm install -g @openai/codex`);
  return fs.existsSync(out);
}

function main() {
  if (args.includes('--list')) { Object.keys(CHARS).forEach(id => console.log(id)); return; }
  const list = ids.length ? ids : Object.keys(CHARS);
  const unknown = list.filter(id => !CHARS[id]);
  const badPose = (onlyPoses || []).filter(p => !POSES[p]);
  if (badPose.length) { console.error(`모르는 자세: ${badPose.join(', ')} (idle / attack / defend / hit)`); process.exitCode = 1; return; }
  if (unknown.length) { console.error(`모르는 id: ${unknown.join(', ')}`); process.exitCode = 1; return; }
  let made = 0;
  const missing = [];
  for (const id of list) {
    for (const pose of Object.keys(POSES)) {
      if (onlyPoses && !onlyPoses.includes(pose)) continue;
      const out = path.join(SPRITES, id, `${pose}.png`);
      if (force) fs.rmSync(out, { force: true });
      if (fs.existsSync(out)) continue;
      if (pose !== 'idle' && !fs.existsSync(path.join(SPRITES, id, 'idle.png'))) { missing.push(`${id}/${pose}`); continue; }
      if (generate(id, pose)) made++;
      else missing.push(`${id}/${pose}`);
    }
  }
  console.log(`\n완료: ${made}개 생성${missing.length ? `, 실패 ${missing.length}개 (${missing.join(', ')})` : ''}`);
  spawnSync(process.execPath, [path.join(__dirname, 'generate-images.js'), '--manifest'], { stdio: 'inherit' });
}

main();
