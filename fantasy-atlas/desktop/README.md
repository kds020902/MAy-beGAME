# Fate Five Atlas — 데스크톱 실행본

브라우저나 인터넷 없이 게임처럼 실행되는 오프라인 버전입니다.
Electron(크로미움 내장) 위에서 지도 하나(`app/index.html`, three.js r128 포함)를 창으로 띄웁니다.

## 실행하기

### Windows
1. `FateFiveAtlas-win-x64.zip`을 받아 **압축을 풉니다** (zip 안에서 바로 실행하지 마세요).
2. 폴더 안의 `FateFiveAtlas.exe`를 더블클릭합니다.
3. "Windows의 PC 보호" (SmartScreen) 창이 뜨면 **추가 정보 → 실행**을 누릅니다.
   코드 서명이 없는 exe라 처음 한 번 뜨는 경고입니다.

### Linux
```bash
unzip FateFiveAtlas-linux-x64.zip
cd FateFiveAtlas-linux-x64
./FateFiveAtlas            # 샌드박스 오류가 나면: ./FateFiveAtlas --no-sandbox
```

### macOS
`Fate Five Atlas.app`의 압축을 푼 뒤, 서명이 없어 "손상됨" 경고가 나오면 터미널에서:
```bash
xattr -cr "Fate Five Atlas.app"
codesign --force --deep -s - "Fate Five Atlas.app"   # Apple Silicon에서 필요
```

### 조작
- **F11**: 전체 화면 켜기/끄기
- 나머지 조작은 웹 버전과 같습니다.
- 인터넷이 없으면 Google Fonts 대신 시스템 글꼴(명조/serif, Courier New)로 표시됩니다.

## 다시 빌드하기

`fantasy-atlas/` 폴더에서 (필요: Node 18+, `curl`, `unzip`, `zip`):

```bash
node desktop/build-desktop.js win      # → desktop/dist/FateFiveAtlas-win-x64.zip
node desktop/build-desktop.js linux    # → desktop/dist/FateFiveAtlas-linux-x64.zip
node desktop/build-desktop.js mac      # → mac-x64, mac-arm64 두 개
node desktop/build-desktop.js all      # 전부
```

빌드 과정:
1. `maps/index.html`의 로컬 스크립트를 모두 끼워 넣고 (`build-inline.js`와 같은 규칙),
   three.js CDN 스크립트를 r128 사본으로 교체, Google Fonts 링크를 제거해 `desktop/app/index.html`을 만듭니다.
2. 공식 Electron 프리빌트(기본 v31.7.7, `ELECTRON_VERSION=…`으로 변경 가능)를 받아
   `desktop/.cache/`에 보관하고 SHA256을 확인합니다.
3. 실행 파일 이름을 `FateFiveAtlas(.exe)`로 바꾸고 `main.js`, `package.json`, `app/`을
   `resources/app/`에 넣은 뒤 `desktop/dist/`에 zip으로 묶습니다.

지도를 고친 뒤에는 이 명령만 다시 실행하면 됩니다. `.cache/`, `dist/`, `app/`은 git에 올리지 않습니다.

## 알아둘 점
- exe/앱은 코드 서명이 없습니다 (SmartScreen·Gatekeeper 경고).
- exe 아이콘과 파일 속성(버전 정보)은 Electron 기본값 그대로입니다.
- 압축 크기는 플랫폼별 약 100–110 MB입니다 (크로미움 런타임 포함).
