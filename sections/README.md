# 分类扩展（可选）

这个目录用于放「不想改动 `assets/data.js`」的额外分类。

1. 复制下面内容，保存为 `sections/extra.js`：

```js
window.EXTRA_SECTIONS = window.EXTRA_SECTIONS || [];
window.EXTRA_SECTIONS.push({
  id: 'devtool',            // 唯一，决定 #/devtool 路由
  num: '08',
  short: '开发工具',
  title: '开发与终端快捷键',
  icon: '🛠️',
  accent: '#4fd1c5',
  tagline: 'IDE 与终端里最快的那几个',
  summary: '一句话说明这一类的使用场景。',
  goals: ['目标一', '目标二'],
  shortcuts: [
    { keys: 'Ctrl + `', action: '打开终端', note: 'VS Code 里的内置终端', tag: '终端' }
  ],
  tips: ['支持 `code` 与 **加粗** 写法']
});
```

2. 打开根目录的 `index.html`，取消这一行的注释：

```html
<script src="sections/extra.js"></script>
```

3. 刷新页面：侧边栏「按场景分类」会自动多出一项，统计数字、搜索、自测、全量速查都会自动包含新内容，无需改 `app.js`。

字段说明见根目录 `README.md` 的「怎么加内容」一节。
