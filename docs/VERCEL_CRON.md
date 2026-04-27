# Vercel Cron Job 设置指南

## 📋 方案对比

### 1. Vercel Cron Jobs (推荐)
- ✅ **简单**: 无需额外服务配置
- ✅ **免费**: 包含在 Vercel 免费计划中
- ✅ **可靠**: 由 Vercel 基础设施支持
- ✅ **集成**: 直接在项目配置中设置

### 2. GitHub Actions
- ✅ **免费**: GitHub 提供免费的 CI/CD
- ✅ **灵活**: 可以执行复杂的工作流
- ⚠️ **限制**: 执行时间有限制
- ⚠️ **网络**: 可能受到网络限制

### 3. 第三方 Cron 服务
- ✅ **简单**: 配置简单
- ⚠️ **依赖**: 依赖第三方服务稳定性
- ⚠️ **成本**: 高级功能可能需要付费

## 🚀 方案 1: Vercel Cron Jobs

### 1.1 生成 Cron Secret

首先生成一个安全的密钥：

```bash
# macOS/Linux
openssl rand -base64 32

# Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 10)

# 或使用在线工具
# https://www.uuidgenerator.net/api/version4
```

### 1.2 配置环境变量

在 Vercel 项目中添加环境变量：

1. 进入项目设置 → Environment Variables
2. 添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1...
CRON_SECRET = your_generated_secret
```

3. 选择适用环境 (Production, Preview, Development)
4. 点击 Save

### 1.3 验证配置文件

项目已包含 `vercel.json` 配置：

```json
{
  "crons": [
    {
      "path": "/api/cleanup",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

**Cron 表达式说明**:
- `0 */6 * * *` - 每 6 小时执行一次
- `0 * * * *` - 每小时执行一次
- `0 0 * * *` - 每天午夜执行一次

### 1.4 部署项目

```bash
# 提交代码
git add .
git commit -m "Add cron job for cleanup"

# 推送到 GitHub
git push origin main
```

Vercel 会自动检测 `vercel.json` 并配置 Cron Job。

### 1.5 验证 Cron Job

1. 进入 Vercel Dashboard
2. 选择你的项目
3. 进入 Settings → Cron Jobs
4. 你会看到：
   - Cron Job 路径: `/api/cleanup`
   - 执行计划: `0 */6 * * *`
   - 最后执行时间
   - 执行状态

### 1.6 手动测试

**通过浏览器测试**:
- 访问 `/test-cleanup` 路径
- 输入你的 CRON_SECRET
- 点击"执行清理"按钮测试 API

**通过命令行测试**:
```bash
# 测试 API 端点
curl "https://your-project.vercel.app/api/cleanup?secret=your_secret"

# 或使用 Authorization header
curl -H "Authorization: Bearer your_secret" https://your-project.vercel.app/api/cleanup
```

预期响应：
```json
{
  "success": true,
  "deletedCount": 5,
  "timestamp": "2024-04-27T12:00:00.000Z"
}
```

## 🔄 方案 2: GitHub Actions

### 2.1 创建 GitHub Actions Workflow

创建 `.github/workflows/cleanup.yml`：

```yaml
name: Cleanup Expired Clipboard Items

on:
  schedule:
    # 每 6 小时执行一次 (Cron 时区为 UTC)
    - cron: '0 */6 * * *'
  workflow_dispatch: # 允许手动触发

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run cleanup script
        run: npm run cleanup
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Cleanup Job Failed',
              body: 'The scheduled cleanup job failed. Please check the logs.',
              labels: ['bug', 'cleanup']
            })
```

### 2.2 配置 GitHub Secrets

在 GitHub 仓库中配置 Secrets：

1. 进入 Settings → Secrets and variables → Actions
2. 添加以下 secrets：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - (可选) `SUPABASE_SERVICE_KEY`

### 2.3 手动触发

在 GitHub Actions 页面：
1. 进入 Actions → Cleanup Expired Clipboard Items
2. 点击 "Run workflow"
3. 选择分支并点击 "Run workflow"

## 🌐 方案 3: 第三方 Cron 服务

### 3.1 推荐服务

1. **Cron-job.org** (免费)
   - 支持最小 1 分钟间隔
   - 提供 SSL 证书验证
   - 简单易用

2. **EasyCron** (免费额度)
   - 支持多种协议
   - 提供监控和通知
   - 有付费高级功能

3. **Cron-job.de** (免费)
   - 德国托管，隐私友好
   - 支持时区设置
   - 提供执行日志

### 3.2 配置步骤

以 Cron-job.org 为例：

1. **注册账号**
   - 访问 https://cron-job.org
   - 注册免费账号

2. **创建 Cron Job**
   - 点击 "Members" → "Cronjobs"
   - 点击 "Add cronjob"
   - 配置：
     ```
     Title: Cleanup Expired Clipboard Items
     URL: https://your-project.vercel.app/api/cleanup?secret=your_secret
     Execution time: Every 6 hours
     ```

3. **验证设置**
   - 保存后等待第一次执行
   - 检查执行日志
   - 验证清理功能正常工作

## 🔍 监控和调试

### 检查执行状态

**Vercel Dashboard**:
1. 进入项目 → Settings → Cron Jobs
2. 查看执行历史和状态
3. 点击具体的执行查看日志

**GitHub Actions**:
1. 进入 Actions 标签页
2. 查看工作流执行历史
3. 点击具体的执行查看日志

### 查看日志

```bash
# 使用 Vercel CLI
vercel logs

# 查看特定函数的日志
vercel logs --follow
```

### 常见问题排查

#### 问题: Cron Job 未执行
- 检查 `vercel.json` 配置是否正确
- 验证环境变量是否设置
- 检查 Vercel Cron Jobs 页面状态

#### 问题: 执行失败
- 查看 Vercel 函数日志
- 验证 Supabase 连接
- 检查数据库权限

#### 问题: 清理数量为 0
- 这是正常的，表示没有过期内容
- 检查数据库中的 `expires_at` 字段
- 验证时区设置是否正确

## 🛡️ 安全建议

### 1. 保护 Cron 端点
- 使用强密钥 (至少 32 字符)
- 定期轮换密钥
- 不在代码中硬编码密钥

### 2. 限制访问
- 验证 Authorization header 或 URL 参数
- 考虑添加 IP 白名单
- 使用 HTTPS

### 3. 监控异常
- 设置失败通知
- 监控执行频率
- 记录异常访问

## 📊 执行计划建议

### 频率选择

根据数据量和性能考虑：

| 频率 | Cron 表达式 | 适用场景 |
|------|------------|----------|
| 每小时 | `0 * * * *` | 大量数据，频繁更新 |
| 每 6 小时 | `0 */6 * * *` | 中等数据量 (推荐) |
| 每天 | `0 0 * * *` | 少量数据 |
| 每周 | `0 0 * * 0` | 极少数据 |

### 时区考虑

- Vercel Cron 使用 UTC 时区
- 调整执行时间以匹配你的时区
- 例如：中国 (UTC+8) 的凌晨 3 点 = UTC 19 点

```json
{
  "crons": [
    {
      "path": "/api/cleanup",
      "schedule": "0 19 * * *" // UTC 19:00 = 中国时间 03:00
    }
  ]
}
```

## 🎯 最佳实践

1. **测试先行**: 在生产环境部署前充分测试
2. **渐进调整**: 从较长间隔开始，根据需要调整
3. **监控日志**: 定期检查执行结果和错误
4. **备份重要**: 清理前考虑备份数据
5. **文档记录**: 记录清理策略和执行历史

## 🚀 快速部署检查清单

- [ ] 生成 CRON_SECRET
- [ ] 配置 Vercel 环境变量
- [ ] 验证 vercel.json 配置
- [ ] 测试 API 端点 `/api/cleanup`
- [ ] 部署到 Vercel
- [ ] 在 Vercel Dashboard 验证 Cron Job
- [ ] 监控第一次执行
- [ ] 设置失败通知

---

**推荐使用 Vercel Cron Jobs**，因为它最简单、最可靠，并且完全集成在 Vercel 生态系统中。
