# Windows 快捷键与 F 键图标速查

把「背不住的快捷键」变成「用得上的肌肉记忆」的纯静态知识库。零依赖、无构建、无后端，双击即可离线打开，也可以直接托管到 GitHub Pages。

- 在线版：<https://likewater16888-art.github.io/Windows-fast-keyboard/>
- 仓库：<https://github.com/likewater16888-art/Windows-fast-keyboard>

## 里面有什么

| 模块 | 内容 |
| --- | --- |
| 知识地图 | 四步上手路径、5 个判断法则、分类入口、必背预览、下一步学什么 |
| F 键图标 | 17 个笔记本 F 键图标（亮度 / 音量 / 触摸板 / 投屏 / 飞行模式 …）+ Fn 锁说明 + Windows 原生 F1–F12 |
| 分类快捷键 | 7 类共 60 条：Win 键、编辑通用、浏览器、窗口与桌面、文件资源管理器、光标与文本、截图录屏 |
| 全量速查 | 60 条汇总表，按分类 + 关键词双重过滤，点键帽即复制 |
| 场景实战 | 8 条任务链（写文档、查资料、整理文件、开会投屏 …），照着顺序按 |
| 自测 | 从全部快捷键随机出题，四选一，即时判分并给出正确组合与说明 |
| 必背清单 | 10 条覆盖日常 80% 场景的快捷键，含「为什么值得背」 |

## 本地查看

方式一：直接双击 `index.html`（脚本为经典脚本，不用起服务器）。

方式二：起一个本地静态服务器，便于手机同网段访问：

```powershell
cd Windows-fast-keyboard
python -m http.server 8080
# 浏览器打开 http://localhost:8080/
```

## 目录结构

```
Windows-fast-keyboard/
├─ index.html            # 页面骨架：侧边栏、顶栏、#view 容器
├─ assets/
│  ├─ style.css          # 主题变量 + 布局 + 组件样式（含浅色主题与打印样式）
│  ├─ data.js            # 全部内容：KB = { meta, mentalModels, sections, fnIcons, ... }
│  └─ app.js             # 渲染与交互：路由、搜索、筛选、自测、复制、主题
├─ sections/             # 可选：分类扩展脚本（默认未启用）
├─ source/               # 原始 Markdown 手册
├─ .nojekyll             # 让 GitHub Pages 原样发布（不做 Jekyll 处理）
└─ README.md
```

内容与逻辑完全分离：`app.js` 只读 `KB`，不写死任何条数或文案。改内容只动 `assets/data.js`。

## 交互速查

| 操作 | 效果 |
| --- | --- |
| `/` | 聚焦顶部搜索框 |
| `Esc` | 清空搜索 / 关闭移动端侧边栏 |
| 点击键帽或 ⧉ | 复制该组合键（Windows 下粘贴到聊天、笔记里） |
| 自测页按 `1`–`4` | 选择答案 |
| 自测页按 `Enter` | 进入下一题 / 查看结果 |
| 右上角 🌙 / ☀️ | 切换深浅主题（写入 localStorage） |
| 右上角 🖨️ | 打印或导出 PDF（自动隐藏导航与按钮） |

## 怎么加内容

### 加一条快捷键

在 `assets/data.js` 的对应分类里追加：

```js
{ keys: 'Win + Shift + S', action: '区域截图', note: '截完直接进剪贴板，可粘贴到聊天窗口', tag: '截图' }
```

`keys` 用 ` + ` 连接按键、用 ` / ` 表示二选一（如 `Win + ← / →`），页面会自动渲染成键帽。条数、筛选按钮、统计数字都由数据推导，无需同步修改。

### 加一个新分类

```js
{
  id: 'devtool',            // 唯一，决定 #/devtool 路由
  num: '08',
  short: '开发工具',
  title: '开发与终端快捷键',
  icon: '🛠️',
  accent: '#4fd1c5',
  tagline: 'IDE 与终端里最快的那几个',
  summary: '一句话说明这一类的使用场景。',
  goals: ['目标一', '目标二'],
  shortcuts: [ /* 至少一条 */ ],
  tips: ['易错提醒，支持 `code` 与 **加粗**']
}
```

### 独立文件扩展（不动 data.js）

新建 `sections/extra.js`：

```js
window.EXTRA_SECTIONS = window.EXTRA_SECTIONS || [];
window.EXTRA_SECTIONS.push({ id: 'extra', short: '补充', title: '补充快捷键', shortcuts: [] });
```

然后在 `index.html` 中取消这行注释：

```html
<script src="sections/extra.js"></script>
```

### 加一个 F 键图标 / 必背 / 场景

分别改 `KB.fnIcons`、`KB.mustKnow`、`KB.scenes`，字段与现有一致即可。缺失字段有兜底，不会报错。

## 部署到 GitHub Pages

```powershell
git init
git add .
git commit -m "feat: Windows 快捷键与 F 键图标速查知识库"
git branch -M main
git remote add origin https://github.com/likewater16888-art/Windows-fast-keyboard.git
git push -u origin main
```

仓库 **Settings → Pages**：Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存后等 1–2 分钟即可访问上面的在线地址。

## 说明

- 内容整理自本地笔记《Windows 快捷键与 F 键图标速查手册》，适用于 Windows 10 / 11。
- F 键图标用 emoji 近似示意，实际键盘为单色线条图标；同一功能在不同品牌可能落在不同 F 位，**以键帽印刷图标为准**。
- 个别软件（IDE、游戏、截图工具）可能占用同名快捷键，以其内部设置为准。
