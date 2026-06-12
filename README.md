# image2svip - 跨平台图像生成应用

支持 Mac、Windows、Linux 桌面端和 Android APK。

## 快速开始

### 安装依赖

```bash
npm install
```

### Web 模式（开发用）

```bash
npm start
```

访问 http://localhost:4173

### Electron 桌面模式（开发）

```bash
npm run electron:dev
```

## 打包构建

### Mac (.dmg)

```bash
npm run build:mac
```

输出位置：`dist/`

### Windows (.exe)

```bash
npm run build:win
```

输出位置：`dist/`

### Linux (AppImage/deb)

```bash
npm run build:linux
```

### Android APK

需要先安装 Android Studio 和 Capacitor CLI：

```bash
# 安装 Capacitor CLI
npm install -g @capacitor/cli

# 初始化 Capacitor（首次）
npx cap init

# 添加 Android 平台
npx cap add android

# 同步 Web 资源到 Android
npx cap sync

# 打开 Android Studio
npx cap open android
```

在 Android Studio 中构建 APK。

## 项目结构

```
image2svip/
├── electron/           # Electron 主进程
│   ├── main.js        # 主进程入口
│   └── preload.js     # 预加载脚本
├── public/            # Web 前端
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── img/               # 图标资源
├── server.js          # Node.js 服务端（Web 模式用）
├── capacitor.config.ts # Capacitor 配置
└── package.json
```

## 功能特性

- 图像生成（支持 gpt-image-2 和 codex-gpt-image-2 模型）
- 多图参考（图生图）
- 多种尺寸比例选择
- 批量生成（1-10 张）
- 历史记录管理
- 本地图片存储（IndexedDB）

## 配置

### API Key

在应用界面中输入并保存 API Key。

### 自定义 API 端点

设置环境变量：

```bash
export IMAGE2SVIP_API_URL="https://your-api-endpoint/v1/chat/completions"
```

## 技术栈

- 前端：原生 HTML/CSS/JavaScript
- 桌面端：Electron
- Android：Capacitor
- 后端：Node.js HTTP Server
