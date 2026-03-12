# 🚀 Vercel 一键部署指南

## 快速部署（推荐）

### 方式一：使用 Vercel CLI（最快）

```powershell
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录 Vercel
vercel login

# 3. 进入项目目录
cd C:\Users\14108\.openclaw\workspace-dev\vercel-package

# 4. 部署到生产环境
vercel --prod
```

部署完成后会显示：
```
🔍  Inspect: https://vercel.com/your-account/feishu-sync-api/xxx
✅  Production: https://feishu-sync-api-xxx.vercel.app
```

同步端点 URL：`https://feishu-sync-api-xxx.vercel.app/sync`

### 方式二：GitHub 自动部署

1. 将 `vercel-package` 文件夹推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. Import Git Repository
4. 选择你的仓库
5. 配置环境变量
6. 点击 Deploy

## 配置环境变量

在 Vercel 控制台 → Settings → Environment Variables 添加：

| 变量名 | 值 |
|--------|-----|
| `FLYSITE_APP_SECRET` | `vtuXWbgg8xLKPnZErTMLZc3jmLiJgiCo` |
| `FLYSITE_APP_TOKEN` | `AKF2bHBDVaEfEpsCLggc3mUSnyb` |
| `FLYSITE_TABLE_ID` | `tblOy4VZZ5L1baTP` |
| `FLYSITE_APP_ID` | `cli_a92481440eb81bb4` |

## 测试部署

```powershell
# 测试同步 API
$body = @{
    practiceTitle = "测试同步"
    questionCount = 10
    score = 8
    accuracy = 80
    practiceUrl = "https://xingyun-new.github.io/Skills-XiaoSiMen/math-playgrounds/english-passive-comprehensive.html"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://YOUR_VERCEL_URL.vercel.app/sync" -Method Post -ContentType "application/json" -Body $body
```

## 更新练习题配置

部署完成后，编辑 `english-passive-comprehensive.html`：

```javascript
const feishuConfig = {
    appToken: 'AKF2bHBDVaEfEpsCLggc3mUSnyb',
    tableId: 'tblOy4VZZ5L1baTP',
    webhookUrl: 'https://YOUR_VERCEL_URL.vercel.app/sync' // ← 替换为你的 Vercel URL
};
```

然后提交到 GitHub：

```powershell
cd D:\0.py\Skills-XiaoSiMen
git add .
git commit -m "Update 同步服务 URL 为 Vercel 公网地址"
git push origin main
```

## 免费额度

Vercel 免费计划：
- ✅ 无限次部署
- ✅ 100GB 带宽/月
- ✅ 100GB 函数执行时间/月
- ✅ 自动 HTTPS

对于答题记录同步场景，免费额度完全够用！

---

*需要我帮你执行部署命令吗？*
