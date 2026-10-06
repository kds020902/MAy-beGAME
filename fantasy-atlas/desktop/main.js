// Fate Five Atlas 데스크톱 셸 — 단일 HTML(app/index.html)을 창 하나로 띄운다
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

const TITLE = 'Fate Five 지역 지도';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 540,
    title: TITLE,
    backgroundColor: '#0b0d12',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  win.removeMenu();
  win.once('ready-to-show', () => win.show());
  // 페이지 <title>이 창 제목을 덮어쓰지 않게 고정
  win.on('page-title-updated', e => e.preventDefault());

  // F11: 전체 화면 토글 / Esc: 전체 화면 해제
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      e.preventDefault();
    }
  });

  // 외부 링크는 기본 브라우저로, 앱 안에서는 탐색 금지
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url !== win.webContents.getURL()) e.preventDefault();
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  return win;
}

Menu.setApplicationMenu(null);
app.setName('Fate Five Atlas');

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => app.quit());
