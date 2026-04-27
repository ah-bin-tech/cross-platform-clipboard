# Vercel 部署 - Cron Job 自动清理任务

## 🚀 快速部署指南

### 1. 准备工作

#### 1.1 生成 Cron Secret
```bash
# macOS/Linux
openssl rand -base64 32

# Windows (PowerShell)
[System.Web.Security.Commands.GeneratePassword]((Get-Random -Minimum 10 -Maximum 32), (Get-Random -Minimum 5 -Maximum 10))

# 记录生成的密钥，稍后需要配置到 Vercel
```

#### 1.2 准备 Supabase 凭证
确保你已经有：
- Supabase Project URL
- Supabase Anon Key

### 2. GitHub 仓库设置

#### 2.1 创建 GitHub 仓库
1. 登录 GitHub
2. 创建新仓库：`cross-platform-clipboard`
3. 上传项目文件

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit with cron job setup"

# 添加远程仓库
git remote add origin https://github.com/your-username/cross-platform-clipboard.git

# 推送代码
git push -u origin main
```

### 3. Vercel 部署

#### 3.1 连接 Vercel 和 GitHub
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 导入 GitHub 仓库 `cross-platform-clipboard`

#### 3.2 配置项目
1. **Framework Preset**: 选择 Next.js
2. **Root Directory**: 保持默认 `./`
3. **Build Command**: 保持默认 `npm run build`
4. **Output Directory**: 保持默认 `.next`
5. 点击 "Deploy"

Vercel 会自动检测 Next.js 配置并开始部署。

#### 3.3 配置环境变量
部署完成后，在 Vercel 项目设置中添加环境变量：

1. 进入项目 → Settings → Environment Variables
2. 添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1...
CRON_SECRET = your_generated_secret_from_step_1.1
```

3. 选择环境：
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. 点击 Save

#### 3.4 重新部署
环境变量添加后，触发一次重新部署：
1. 进入 Deployments 标签页
2. 点击最新部署右侧的 "..." 菜单
3. 选择 "Redeploy"

### 4. 验证 Cron Job

#### 4.1 检查 Vercel Cron Jobs
1. 进入项目 → Settings → Cron Jobs
2. 你应该看到：
   ```
   Job: /api/cleanup
   Schedule: 0 */6 * * * (Every 6 hours)
   Status: Active
   ```

#### 4.2 测试 API 端点
**方式 1: 浏览器测试**
1. 访问 `https://your-project.vercel.app/test-cleanup`
2. 输入你的 CRON_SECRET
3. 点击"执行清理"按钮
4. 查看响应结果

**方式 2: 命令行测试**
```bash
curl "https://your-project.vercel.app/api/cleanup?secret=your_secret"
```

预期响应：
```json
{
  "success": true,
  "deletedCount": 3,
  "timestamp": "2024-04-27T12:00:00.000Z"
}
```

#### 4.3 监控执行状态
1. 进入 Vercel Dashboard → 项目 → Settings → Cron Jobs
2. 查看执行历史
3. 检查执行时间和状态

### 5. Cron Job 调整

#### 5.1 修改执行频率
编辑项目根目录的 `vercel.json` 文件：

```json
{
  "crons": [
    {
      "path": "/api/cleanup",
      "schedule": "0 */6 * * *" // 修改这里
    }
  ]
}
```

常用频率：
- `0 * * * *` - 每小时
- `0 */6 * * *` - 每 6 小时（默认）
- `0 */12 * * *` - 每 12 小时
- `0 0 * * *` - 每天
- `0 0 * * 0` - 每周

修改后提交代码并推送，Vercel 会自动更新 Cron Job。

#### 5.2 时区考虑
Vercel Cron 使用 UTC 时区。如果你需要在特定本地时间执行，需要换算：

例如，中国时间 (UTC+8) 的凌晨 3 点：
- UTC 时间 = 3 - 8 = -5 = 19 (前一天晚上 19 点)
- Cron 表达式：`0 19 * * *`

## 🔧 故障排除

### 问题 1: Cron Job 未执行

**检查清单**:
- [ ] 验证 `vercel.json` 文件存在且格式正确
- [ ] 检查 Vercel Cron Jobs 页面是否显示 Active 状态
- [ ] 确认代码已部署到 Production
- [ ] 检查环境变量是否正确设置

**解决方案**:
1. 重新部署项目
2. 手动触发测试验证 API 端点工作正常

### 问题 2: 执行失败

**检查清单**:
- [ ] 查看 Vercel 函数日志
- [ ] 验证 Supabase 连接配置
- [ ] 检查数据库权限和 RLS 策略
- [ ] 确认 CRON_SECRET 正确

**查看日志**:
```bash
# 使用 Vercel CLI
vercel logs --follow

# 或在 Vercel Dashboard 查看函数日志
```

### 问题 3: 清理数量为 0

这是正常情况，表示当前没有过期的剪贴板内容。

**验证数据**:
1. 检查数据库中是否有 `expires_at` 字段
2. 确认有些内容设置了过期时间
3. 验证当前时间已超过 `expires_at`

### 问题 4: 环境变量未生效

**解决方案**:
1. 确认在正确的项目设置中添加环境变量
2. 检查变量名称拼写正确
3. 确认选择了正确的环境 (Production/Preview/Development)
4. 触发重新部署使环境变量生效

## 📊 监控和维护

### 定期检查
1. **每周**: 查看 Cron Job 执行历史
2. **每月**: 检查数据库存储空间
3. **每季**: 评估执行频率是否合理

### 性能优化
如果清理任务执行时间过长：
1. 增加执行间隔（例如改为每天执行）
2. 在数据库中添加索引优化查询
3. 考虑批量删除而非单个删除

### 安全维护
1. **密钥轮换**: 定期更新 CRON_SECRET
2. **访问监控**: 监控异常的 API 调用
3. **权限审查**: 定期检查数据库权限

## 🎯 最佳实践

1. **渐进部署**:
   - 先在测试环境验证
   - 确认功能正常后部署到生产环境

2. **文档记录**:
   - 记录 Cron Job 的执行结果
   - 保存配置变更历史
   - 维护故障排除文档

3. **备份策略**:
   - 定期备份 Supabase 数据库
   - 重要变更前创建快照
   - 测试恢复流程

4. **通知设置**:
   - 配置 Vercel 部署通知
   - 设置错误监控
   - 定期检查系统状态

## 📞 支持资源

### 官方文档
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Supabase Database Functions](https://supabase.com/docs/guides/functions)

### 调试工具
- Vercel Dashboard - 函数日志和执行状态
- Supabase Dashboard - 数据库监控
- 测试页面 - `/test-cleanup`

---

## 🎉 部署完成检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] 环境变量已配置
- [ ] 项目已成功部署
- [ ] Cron Job 已激活
- [ ] API 端点测试通过
- [ ] 首次执行成功
- [ ] 监控已设置

完成所有检查项后，你的 Vercel 部署和 Cron Job 自动清理任务就绪了！

**访问你的应用**: `https://your-project.vercel.app`
