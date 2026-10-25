/* ============================================================
   Windows 快捷键与 F 键图标速查 · 数据层
   内容来源：Windows 快捷键与 F 键图标速查手册.md
   整理原则：认图标不认 F 数字；同一功能只详述一处；
             保留原文口诀与「误触 / 误关 / 误删」这类真实场景。
   结构：meta / mentalModels / sections / fnIcons / fnTags /
         nativeF / fnLock / mustKnow / scenes / nextSteps
   ============================================================ */

const KB = {
  meta: {
    title: 'Windows 快捷键速查',
    subtitle: '把笔记本 F 键图标与 Windows 常用快捷键，整理成一张「按场景找得到、按图标认得出」的速查地图。适用于 Win10 / Win11。',
    built: '2026-10-26',
    version: 'Windows 10 / 11',
    sources: ['Windows 快捷键与 F 键图标速查手册.md']
  },

  /* 跨章节提炼的判断法则 */
  mentalModels: [
    {
      icon: '🎯', title: '认图标，不认 F 数字', from: 'F 键图标',
      body: '不同品牌把同一功能放在不同 F 位（触摸板可能是 F6、F8、F9），只有图标是统一的。拿不准时看键帽上印的图案，不要背 F 几。'
    },
    {
      icon: '🔓', title: 'Fn 锁 = 免按 Fn', from: 'Fn 锁',
      body: '按 Fn + Esc 打开 Fn 锁后，直接按 F8 就能开关触摸板；关闭 Fn 锁时，才需要按住 Fn + F8。'
    },
    {
      icon: '🧭', title: '三个万能入口', from: 'Win 键 / 窗口',
      body: '找不到东西就 Win + S 搜索，想开程序就 Win + R 运行，卡住了就 Ctrl + Shift + Esc 任务管理器。'
    },
    {
      icon: '↩️', title: '三个后悔药', from: '编辑 / 浏览器 / 截图',
      body: '改错了 Ctrl + Z 撤销，网页误关了 Ctrl + Shift + T 找回，想留证据 Win + Shift + S 截图进剪贴板。'
    },
    {
      icon: '🖥️', title: '外接屏先 Win + P', from: '投屏',
      body: '接上投影或显示器没画面，先按 Win + P 选「复制 / 扩展 / 仅第二屏」，再排查线材和接口。'
    }
  ],

  /* ---------------- 七个快捷键分类 ---------------- */
  sections: [
    {
      id: 'win',
      num: '01',
      short: 'Win 键',
      title: 'Win 徽标键：系统总控台',
      tagline: '从开始菜单到虚拟桌面',
      icon: '🪟',
      accent: '#5cc8ff',
      summary: 'Win 键是 Windows 里权限最高的单键：开始菜单、搜索、设置、桌面、锁屏、虚拟桌面都从它出发。这一组是全局最高频的组合。',
      goals: [
        'Win / Win + S / Win + R：三个入口覆盖「打开、查找、运行」',
        'Win + D / Win + L：一键清屏与一键锁屏',
        'Win + Tab 与 Win + Ctrl + D：多桌面工作流',
        'Win + 方向键：不用鼠标完成分屏与最大化'
      ],
      shortcuts: [
        { keys: 'Win', action: '打开开始菜单', note: '再按一次或按 Esc 关闭', tag: '入口' },
        { keys: 'Win + D', action: '一键显示桌面', note: '再按一次恢复所有窗口', tag: '桌面' },
        { keys: 'Win + E', action: '打开文件资源管理器', note: '直达「此电脑」，找文件不用先回桌面', tag: '文件' },
        { keys: 'Win + L', action: '锁屏', note: '离开座位的第一动作，比关显示器有用', tag: '安全' },
        { keys: 'Win + R', action: '打开运行窗口', note: '输入 cmd、notepad、control 等直接启动', tag: '入口' },
        { keys: 'Win + I', action: '打开系统设置', note: 'Win11 的设置入口，比翻开始菜单快', tag: '系统' },
        { keys: 'Win + S', action: '搜索', note: '文件、软件、网页、设置一起搜', tag: '入口' },
        { keys: 'Win + Tab', action: '任务视图', note: '查看所有窗口，也能新建虚拟桌面', tag: '多任务' },
        { keys: 'Win + Ctrl + D', action: '新建虚拟桌面', note: '工作一个桌面、娱乐一个桌面', tag: '多任务' },
        { keys: 'Win + Ctrl + ← / →', action: '在虚拟桌面间切换', note: '左右方向键切换相邻桌面', tag: '多任务' },
        { keys: 'Win + Ctrl + F4', action: '关闭当前虚拟桌面', note: '桌面上的窗口会转移到相邻桌面', tag: '多任务' },
        { keys: 'Win + Shift + S', action: '截图（矩形 / 窗口 / 全屏）', note: '截图自动存入剪贴板，粘贴即可用', tag: '截图' },
        { keys: 'Win + P', action: '投影设置', note: '复制、扩展、仅第二屏等投影模式', tag: '投屏' },
        { keys: 'Win + +/−', action: '放大镜放大 / 缩小屏幕', note: '演示细节或看不清小字时使用', tag: '辅助' },
        { keys: 'Win + ↑', action: '窗口最大化', note: '再按一次可还原', tag: '窗口' },
        { keys: 'Win + ↓', action: '窗口最小化 / 还原', note: '窗口已最大化时先还原', tag: '窗口' },
        { keys: 'Win + ← / →', action: '窗口贴靠左右分屏', note: '一半屏放资料、一半屏写文档', tag: '窗口' },
        { keys: 'Win + Home', action: '最小化其他所有窗口', note: '只保留当前窗口，再按一次恢复', tag: '窗口' },
        { keys: 'Win + Alt + R', action: 'Xbox 录屏（开始 / 停止）', note: '录当前窗口或游戏画面', tag: '录屏' },
        { keys: 'Win + G', action: '打开 Xbox 游戏栏', note: '录屏、截图、性能面板都在这里', tag: '录屏' }
      ],
      tips: [
        'Win 键按一下开、再按一下关，误触不用慌。',
        'Win + D 是「清屏」不是「关闭」，窗口都还在。',
        '虚拟桌面不是远程桌面，只是把窗口分组。',
        '演示前先 Win + P 确认投影模式，别等黑屏再找线。'
      ]
    },
    {
      id: 'edit',
      num: '02',
      short: '基础编辑',
      title: '基础编辑：记事本、Word、浏览器通用',
      tagline: '复制粘贴、撤销重做、查找替换',
      icon: '✏️',
      accent: '#a78bfa',
      summary: '这一组在所有输入框、文档编辑器里都成立，练成肌肉记忆后，打字效率提升最明显。',
      goals: [
        '复制 / 粘贴 / 剪切：Ctrl + C / V / X',
        '犯错后的两步：Ctrl + Z 撤销、Ctrl + Y 重做',
        '查找与替换：Ctrl + F / Ctrl + H',
        '格式化：Ctrl + B / I / U 加粗、斜体、下划线'
      ],
      shortcuts: [
        { keys: 'Ctrl + C / V / X', action: '复制 / 粘贴 / 剪切', note: '最常用的三件套，配合鼠标选中使用', tag: '剪贴板' },
        { keys: 'Ctrl + Z', action: '撤销（回退一步）', note: '连按可连续回退，先撤销再想办法', tag: '纠错' },
        { keys: 'Ctrl + Y', action: '重做（撤销回来）', note: '撤销过头时用它恢复', tag: '纠错' },
        { keys: 'Ctrl + A', action: '全选', note: '选中当前文档 / 输入框全部内容', tag: '选择' },
        { keys: 'Ctrl + F', action: '查找文字', note: '长文档定位关键词', tag: '查找' },
        { keys: 'Ctrl + H', action: '查找并替换', note: '批量改词，替换前先确认大小写与范围', tag: '查找' },
        { keys: 'Ctrl + S', action: '保存', note: '重要：随时按，别等断电', tag: '文件' },
        { keys: 'Ctrl + P', action: '打印', note: '也可在这里选择「另存为 PDF」', tag: '输出' },
        { keys: 'Ctrl + B / I / U', action: '加粗 / 斜体 / 下划线', note: 'Word、记事本、网页编辑器通用', tag: '格式' }
      ],
      tips: [
        '先 Ctrl + A 再 Ctrl + C，复制整页最省事。',
        '替换前先 Ctrl + F 数一下命中几次，避免改错。',
        '写完一段就 Ctrl + S，不要攒到最后。',
        'Ctrl + Z 不是万能的：永久删除和覆盖保存都可能救不回来。'
      ]
    },
    {
      id: 'browser',
      num: '03',
      short: '浏览器',
      title: '浏览器：标签页与页面控制',
      tagline: '适用于 Chrome / Edge 等主流浏览器',
      icon: '🌐',
      accent: '#3ddc97',
      summary: '浏览器是每天待得最久的软件。标签页开了几十个也不怕，关键是会新建、会切换、会在误关之后救回来。',
      goals: [
        '标签页：Ctrl + T / Ctrl + W / Ctrl + Tab',
        '误关恢复：Ctrl + Shift + T',
        '页面缩放：Ctrl + +/− 与 Ctrl + 0 复位',
        '地址栏与刷新：Ctrl + L、F5、Ctrl + F5'
      ],
      shortcuts: [
        { keys: 'Ctrl + T', action: '新建标签页', note: '光标自动落在地址栏，可直接输入', tag: '标签页' },
        { keys: 'Ctrl + W', action: '关闭当前标签页', note: '最后一个标签页关闭会退出浏览器', tag: '标签页' },
        { keys: 'Ctrl + Shift + T', action: '恢复刚刚关掉的标签页', note: '救误关网页，连按可逐个恢复', tag: '标签页' },
        { keys: 'Ctrl + Tab', action: '切换到下一个标签', note: '标签很多时比点鼠标快', tag: '标签页' },
        { keys: 'Ctrl + Shift + Tab', action: '切换到上一个标签', note: 'Ctrl + Tab 的反向操作', tag: '标签页' },
        { keys: 'Ctrl + +/−', action: '页面放大 / 缩小', note: '页面字太小或太大时使用', tag: '显示' },
        { keys: 'Ctrl + 0', action: '恢复默认页面大小', note: '缩放乱了按一下就复位', tag: '显示' },
        { keys: 'F5', action: '刷新页面', note: '普通刷新，可能仍用缓存', tag: '刷新' },
        { keys: 'Ctrl + F5', action: '强制刷新（清除缓存）', note: '网页改了却没更新时使用', tag: '刷新' },
        { keys: 'Alt + ← / →', action: '返回上一页 / 前进一页', note: '相当于浏览器的后退、前进按钮', tag: '导航' },
        { keys: 'Ctrl + L', action: '选中地址栏', note: '直接输入新网址或搜索词', tag: '导航' }
      ],
      tips: [
        '误关网页先 Ctrl + Shift + T，不要重新搜一遍。',
        'Ctrl + F5 是「网页没更新」的常用解。',
        'Ctrl + L 之后可以直接输入关键词回车搜索。',
        '标签页太多时，用 Ctrl + Tab 顺序切换比找鼠标快。'
      ]
    },
    {
      id: 'window',
      num: '04',
      short: '窗口控制',
      title: '窗口与程序控制',
      tagline: '切换、关闭、结束卡死程序',
      icon: '🗔',
      accent: '#f5a524',
      summary: '多任务的核心是「切得过去、关得掉」。Alt + Tab 负责切换，Ctrl + Shift + Esc 负责在程序卡死时救场。',
      goals: [
        'Alt + Tab / Alt + Shift + Tab：正反向切换窗口',
        'Alt + F4：关闭当前窗口，桌面按可调出关机',
        'Ctrl + Shift + Esc：直接打开任务管理器',
        'Ctrl + Alt + Del：安全选项界面'
      ],
      shortcuts: [
        { keys: 'Alt + Tab', action: '在打开的程序窗口间切换', note: '按住 Alt 连按 Tab 可循环选择', tag: '切换' },
        { keys: 'Alt + Shift + Tab', action: '反向切换窗口', note: '切过头时往回走', tag: '切换' },
        { keys: 'Alt + F4', action: '关闭当前窗口 / 软件', note: '在桌面按可调出关机对话框', tag: '关闭' },
        { keys: 'Ctrl + Shift + Esc', action: '直接打开任务管理器', note: '比 Ctrl + Alt + Del 更快，卡死时首选', tag: '救急' },
        { keys: 'Ctrl + Alt + Del', action: '安全选项界面', note: '锁定、任务管理器、切换用户、修改密码', tag: '救急' }
      ],
      tips: [
        '程序没响应：先 Ctrl + Shift + Esc，再结束任务。',
        'Alt + F4 在桌面按是关机入口，别在写文档时误按。',
        'Alt + Tab 按住不放，可以用鼠标点选目标窗口。'
      ]
    },
    {
      id: 'explorer',
      num: '05',
      short: '文件管理',
      title: '文件资源管理器',
      tagline: '新建、重命名、删除与属性',
      icon: '🗂️',
      accent: '#ff7b72',
      summary: '整理文件时鼠标点来点去最费时间。这一组覆盖新建文件夹、重命名、看属性、删除与全屏。',
      goals: [
        'Ctrl + N / Ctrl + Shift + N：新窗口与新文件夹',
        'F2 重命名、Alt + Enter 看属性',
        'Delete 与 Shift + Delete 的区别',
        'F11 全屏浏览文件列表'
      ],
      shortcuts: [
        { keys: 'Ctrl + N', action: '新建一个资源管理器窗口', note: '需要两个目录对照时使用', tag: '窗口' },
        { keys: 'Ctrl + Shift + N', action: '新建文件夹', note: '整理下载目录的第一步', tag: '新建' },
        { keys: 'Delete', action: '删除文件（进回收站）', note: '还能从回收站还原', tag: '删除' },
        { keys: 'Shift + Delete', action: '永久删除，不进回收站', note: '谨慎使用：删了就找不回来', tag: '删除' },
        { keys: 'F2', action: '重命名选中文件', note: '选中文件后直接按，不用右键', tag: '重命名' },
        { keys: 'F11', action: '全屏 / 退出全屏', note: '文件列表更宽，适合看长文件名', tag: '显示' },
        { keys: 'Alt + Enter', action: '查看文件属性', note: '看路径、大小、占用空间', tag: '属性' }
      ],
      tips: [
        'Shift + Delete 是永久删除，按之前先确认文件选对了。',
        '重命名用 F2，比「右键 → 重命名」快一倍。',
        'Alt + Enter 能看文件完整路径，排查找不到的文件很有用。'
      ]
    },
    {
      id: 'cursor',
      num: '06',
      short: '光标控制',
      title: '文本光标控制',
      tagline: '不碰鼠标也能精确定位',
      icon: '📍',
      accent: '#4fd1c5',
      summary: '打字时最常做的动作不是输入，而是移动光标和选中文字。记住「Ctrl 跳词、Home / End 跳行、加 Shift 就是选」这条规律即可。',
      goals: [
        '方向键移动光标，Ctrl + 方向键一次跳一个单词',
        'Home / End 跳本行首尾，Ctrl + Home / End 跳全文首尾',
        'Shift + 方向键：边移动边选中',
        '与 Ctrl / Home / End 组合可扩展选择范围'
      ],
      shortcuts: [
        { keys: '← → ↑ ↓', action: '移动光标', note: '最基础也最稳的定位方式', tag: '移动' },
        { keys: 'Ctrl + ← / →', action: '光标一次跳一个单词', note: '长句子里快速移动', tag: '移动' },
        { keys: 'Home / End', action: '跳到本行开头 / 结尾', note: '改行首行尾的内容特别快', tag: '移动' },
        { keys: 'Ctrl + Home / End', action: '跳到文档最开头 / 最末尾', note: '长文档一键到顶或到底', tag: '移动' },
        { keys: 'Shift + 方向键', action: '选中文字', note: '配合 Ctrl / Home / End 可扩大选择范围', tag: '选择' }
      ],
      tips: [
        '规律：Ctrl 管「词和全文」，Home / End 管「行」，Shift 管「选中」。',
        '选中文字时按住 Shift 不放，再移动光标即可扩展选区。',
        'Ctrl + Shift + 方向键可以按词选中，改长句更精确。'
      ]
    },
    {
      id: 'screenshot',
      num: '07',
      short: '截图',
      title: '截图相关',
      tagline: '截得准、存得下、发得出',
      icon: '📸',
      accent: '#e879f9',
      summary: '截图分两条路：Win + Shift + S 进剪贴板，适合马上粘贴发送；PrintScreen 与 Alt + PrtSc 适合保留全屏或单窗口。',
      goals: [
        'Win + Shift + S：自由 / 矩形 / 窗口 / 全屏截图',
        'PrintScreen：全屏截图到剪贴板',
        'Alt + PrtSc：只截当前活动窗口',
        '截图后记得粘贴到微信 / 画图保存'
      ],
      shortcuts: [
        { keys: 'Win + Shift + S', action: '自由 / 矩形 / 窗口 / 全屏截图', note: '推荐方式，截图后自动存入剪贴板', tag: '推荐' },
        { keys: 'PrintScreen（PrtSc）', action: '全屏截图到剪贴板', note: '不会自动存文件，需要粘贴保存', tag: '全屏' },
        { keys: 'Alt + PrtSc', action: '只截当前活动窗口', note: '只留当前窗口，不用再裁剪', tag: '窗口' }
      ],
      tips: [
        '截完图先打开微信 / 画图，Ctrl + V 粘贴再保存。',
        '只想发一块内容：Win + Shift + S 选矩形区域最快。',
        'Alt + PrtSc 截出来的窗口没有桌面背景，发教程更干净。'
      ]
    },
    /* __APPEND_POINT__ */
  ],

  /* ---------------- F 键图标（认图标，不认 F 数字） ---------------- */
  fnTags: ['显示与投屏', '声音', '无线连接', '输入设备', '电源与锁屏', '媒体播放', '性能与工具'],

  fnIcons: [
    { icon: '🔅', name: '屏幕变暗', effect: '降低屏幕亮度', note: '太阳向下，按住可连续调暗', tag: '显示与投屏' },
    { icon: '🔆', name: '屏幕变亮', effect: '提高屏幕亮度', note: '太阳向上，按住可连续调亮', tag: '显示与投屏' },
    { icon: '🖥️', name: '投屏切换', effect: '复制、扩展、仅第二屏等投影模式', note: '两块重叠的显示器图标，作用等同 Win + P', tag: '显示与投屏' },
    { icon: '🔇', name: '静音', effect: '一键关闭声音', note: '喇叭旁带一条斜杠', tag: '声音' },
    { icon: '🔉', name: '音量减小', effect: '调低音量', note: '喇叭旁波纹较少的一侧', tag: '声音' },
    { icon: '🔊', name: '音量增大', effect: '调高音量', note: '喇叭旁波纹较多的一侧', tag: '声音' },
    { icon: '🎤', name: '关闭麦克风', effect: '开会时一键静音麦克风', note: '麦克风旁带斜杠；会议软件里也要确认未静音', tag: '声音' },
    { icon: '✈️', name: '飞行模式', effect: '同时关闭 Wi-Fi、蓝牙等无线连接', note: '图标是一架飞机，上飞机或省电时使用', tag: '无线连接' },
    { icon: '🖱️', name: '触摸板开关', effect: '关闭 / 开启触摸板', note: '你的电脑在 F8：误触关闭后按 Fn + F8 恢复；其他机型可能在 F6 / F9', tag: '输入设备' },
    { icon: '📷', name: '关闭摄像头', effect: '一键遮挡并禁用摄像头', note: '摄像机旁带斜杠，隐私场景常用', tag: '输入设备' },
    { icon: '⌨️', name: '键盘背光', effect: '开关或循环调节背光亮度', note: '发光键盘线条图标，暗环境打字用', tag: '输入设备' },
    { icon: '▶️', name: '播放 / 暂停', effect: '控制媒体播放', note: '单键切换播放状态', tag: '媒体播放' },
    { icon: '⏮⏭', name: '上一曲 / 下一曲', effect: '切换音视频曲目', note: '常与播放键相邻，注意图标里的竖线位置', tag: '媒体播放' },
    { icon: '🌙', name: '睡眠', effect: '息屏进入待机', note: '月亮 / Zz 图标；短时间离开可用', tag: '电源与锁屏' },
    { icon: '🔒', name: '锁屏', effect: '锁定系统', note: '作用与 Win + L 相同，需要密码或 PIN 解锁', tag: '电源与锁屏' },
    { icon: '🔋', name: '性能模式', effect: '在安静 / 均衡 / 狂暴等模式间切换', note: '电池 + 风扇图标，游戏本 / 轻薄本常见', tag: '性能与工具' },
    { icon: '✂️', name: '截图', effect: '快捷截图', note: '方框 + 剪刀图标；部分机型用于截取屏幕区域', tag: '性能与工具' }
  ],

  /* ---------------- 不带图标的原生 F 键（Windows 通用） ---------------- */
  nativeF: [
    { key: 'F1', action: '帮助', note: '在资源管理器、部分软件里打开帮助' },
    { key: 'F2', action: '选中文件重命名', note: '选中文件后直接按，最常用的 F 键' },
    { key: 'F3', action: '搜索', note: '在资源管理器 / 部分软件中打开搜索' },
    { key: 'F5', action: '网页 / 文件夹刷新', note: '浏览器、资源管理器通用' },
    { key: 'F6', action: '切换页面光标位置', note: '浏览器里在地址栏与页面之间切换焦点' },
    { key: 'F11', action: '全屏', note: '浏览器与资源管理器都可全屏' },
    { key: 'F12', action: '开发者工具', note: '浏览器按 F12 打开 DevTools' }
  ],

  fnLock: {
    title: 'Fn 锁（Fn + Esc）',
    summary: 'Fn 锁决定 F 键的第一身份：是「多媒体快捷键」还是「F1–F12」。',
    states: [
      { state: 'Fn 锁开启', how: '直接按 F8', result: '开关触摸板，无需一直按住 Fn', tone: 'ok' },
      { state: 'Fn 锁关闭', how: 'Fn + F8', result: '开关触摸板，需要组合键', tone: 'warn' }
    ],
    steps: [
      '看键帽：先找 F 键上的图标，确认功能是什么。',
      '试一次：先直接按该 F 键；没反应就按住 Fn 再按。',
      '切换 Fn 锁：按 Fn + Esc，观察 Esc 上的指示灯或屏幕提示。',
      '查厂商工具：联想 Vantage、MyASUS、HP Command Center 等可查看或修改 F 键行为。'
    ],
    note: '不同品牌的 Fn 锁开关位置可能不同（多数是 Fn + Esc，也有机型用 Fn + 左 Shift），以键盘上的小锁图标为准。'
  },
  /* ---------------- 高频必背 10 条 ---------------- */
  mustKnow: [
    { keys: 'Win + D', action: '回到桌面', why: '临时找文件、清屏，再按一次全部回来' },
    { keys: 'Win + L', action: '锁屏', why: '离开座位先锁屏，习惯比记性可靠' },
    { keys: 'Win + E', action: '打开此电脑', why: '找文件不用先回桌面' },
    { keys: 'Win + Shift + S', action: '截图', why: '截完直接进剪贴板，粘贴即可发送' },
    { keys: 'Ctrl + S', action: '保存', why: '写一段按一次，避免白干' },
    { keys: 'Ctrl + Z', action: '撤销', why: '误改误删的第一反应' },
    { keys: 'Alt + Tab', action: '切换窗口', why: '多任务最常用，按住 Alt 可循环' },
    { keys: 'Ctrl + Shift + Esc', action: '任务管理器', why: '程序卡死时比等它恢复快' },
    { keys: 'Ctrl + Shift + T', action: '恢复关闭的网页', why: '误关标签页的后悔药' },
    { keys: 'Win + I', action: '打开设置', why: '改系统设置的最短路径' }
  ],

  /* ---------------- 场景实战：把快捷键串成任务链 ---------------- */
  scenes: [
    {
      id: 'office', icon: '📝', title: '写文档 / 打字', lead: '从定位、选中到保存，全程不碰鼠标。',
      steps: [
        { keys: 'Ctrl + ← / →', action: '按词移动光标，快速定位要改的句子' },
        { keys: 'Shift + 方向键', action: '选中文字；配合 Ctrl 可按词选中' },
        { keys: 'Ctrl + H', action: '批量查找替换，先确认命中范围' },
        { keys: 'Ctrl + S', action: '写一段就保存，不要攒到最后' },
        { keys: 'Ctrl + Z', action: '改错了立刻撤销，别继续往下改' }
      ],
      tip: '规律：Ctrl 管词、Home / End 管行、Shift 管选中。'
    },
    {
      id: 'research', icon: '🌐', title: '查资料 / 浏览器', lead: '标签页开得再多，也能找回、切走、关掉。',
      steps: [
        { keys: 'Ctrl + T', action: '新建标签页，光标直接落在地址栏' },
        { keys: 'Ctrl + L', action: '选中地址栏，输入网址或关键词' },
        { keys: 'Ctrl + F', action: '在当前页面里定位关键词' },
        { keys: 'Ctrl + Tab', action: '按顺序切换标签页' },
        { keys: 'Ctrl + Shift + T', action: '误关了网页，立刻救回来' },
        { keys: 'Ctrl + W', action: '看完关闭当前标签，保持整洁' }
      ],
      tip: '网页没更新先 Ctrl + F5 强制刷新，再怀疑网络。'
    },
    {
      id: 'multitask', icon: '🪟', title: '多窗口 / 多桌面', lead: '把「工作」和「娱乐」分到不同桌面，互不打扰。',
      steps: [
        { keys: 'Win + Ctrl + D', action: '新建一个虚拟桌面' },
        { keys: 'Win + Tab', action: '打开任务视图，拖动窗口重新分组' },
        { keys: 'Win + Ctrl + ← / →', action: '在桌面之间切换' },
        { keys: 'Win + ← / →', action: '当前桌面内左右分屏，一边资料一边文档' },
        { keys: 'Win + D', action: '临时清屏，再按一次恢复' },
        { keys: 'Win + Ctrl + F4', action: '用完关闭当前虚拟桌面' }
      ],
      tip: '虚拟桌面只是窗口分组，不会改变文件位置。'
    },
    {
      id: 'files', icon: '🗂️', title: '整理文件', lead: '下载目录从「一团乱」到「一层层清楚」。',
      steps: [
        { keys: 'Win + E', action: '打开文件资源管理器' },
        { keys: 'Ctrl + Shift + N', action: '新建文件夹，先分类再移动' },
        { keys: 'F2', action: '重命名选中的文件' },
        { keys: 'Alt + Enter', action: '查看属性与完整路径' },
        { keys: 'Ctrl + N', action: '开第二个窗口，左右对照移动文件' },
        { keys: 'Delete', action: '删除到回收站；Shift + Delete 是永久删除' }
      ],
      tip: 'Shift + Delete 不进回收站，按之前先看清选中的文件。'
    },
    {
      id: 'share', icon: '📸', title: '截图 / 分享', lead: '截得准、发得快，还能只发一个窗口。',
      steps: [
        { keys: 'Win + Shift + S', action: '选择矩形 / 窗口 / 全屏区域截图' },
        { keys: 'Ctrl + V', action: '粘贴到微信、邮件或画图里' },
        { keys: 'Ctrl + S', action: '在画图等工具里保存成文件' },
        { keys: 'Alt + PrtSc', action: '只截当前活动窗口，省去裁剪' },
        { keys: 'PrintScreen', action: '全屏截图到剪贴板，需要时再粘贴' }
      ],
      tip: '截图默认只进剪贴板，不粘贴就不会留下文件。'
    },
    {
      id: 'meeting', icon: '🎤', title: '开会 / 投屏', lead: '投屏、静音、关摄像头，会前 30 秒搞定。',
      steps: [
        { keys: 'Win + P', action: '选择复制 / 扩展 / 仅第二屏' },
        { keys: 'Fn + 投屏图标键', action: '部分机型可直接切换投影模式' },
        { keys: 'Fn + 麦克风图标键', action: '一键静音，会议软件里再确认一次' },
        { keys: 'Fn + 摄像头图标键', action: '不需要出镜时关闭摄像头' },
        { keys: 'Win + L', action: '会前离开座位先锁屏' }
      ],
      tip: '投屏没画面：先 Win + P 切换模式，再查线与接口。'
    },
    {
      id: 'rescue', icon: '🆘', title: '卡顿 / 救急', lead: '程序无响应时，按顺序做这三件事。',
      steps: [
        { keys: 'Ctrl + Shift + Esc', action: '直接打开任务管理器' },
        { keys: 'Alt + F4', action: '关闭当前无响应窗口' },
        { keys: 'Win + L', action: '先锁屏，保护屏幕上的内容' },
        { keys: 'Ctrl + Alt + Del', action: '安全选项界面：锁定、切换用户、重启' }
      ],
      tip: '不要第一反应就长按电源键，先给程序一次正常退出的机会。'
    },
    {
      id: 'record', icon: '🎬', title: '录屏 / 演示', lead: '需要把操作过程录下来时，用系统自带游戏栏。',
      steps: [
        { keys: 'Win + G', action: '打开 Xbox 游戏栏' },
        { keys: 'Win + Alt + R', action: '开始 / 停止录屏' },
        { keys: 'Win + +', action: '放大镜放大，演示小字细节' },
        { keys: 'Win + Shift + S', action: '顺手截一张关键步骤图' }
      ],
      tip: '录屏文件默认在「视频 / 捕获」目录，录完先确认能播放。'
    }
  ],

  /* ---------------- 延伸方向（本手册未展开） ---------------- */
  nextSteps: [
    { title: 'Win + V 剪贴板历史', body: '贴出最近复制过的多条内容，需在系统设置中先开启。' },
    { title: 'Win + 数字键', body: '打开任务栏上第 N 个固定应用，例如 Win + 1。' },
    { title: 'Win + X 快速菜单', body: '设备管理器、磁盘管理、终端等系统工具的集中入口。' },
    { title: 'Win + . 表情面板', body: '输入 emoji、颜文字和部分特殊符号。' },
    { title: 'Win + Ctrl + Shift + B', body: '重启显卡驱动，黑屏或花屏时可以先试一次。' },
    { title: 'PowerToys', body: '微软官方工具集，可自定义快捷键、窗口布局与批量重命名。' }
  ]
};
