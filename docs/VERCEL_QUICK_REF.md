# Vercel Cron Job 快速参考

## 🚀 一键部署流程

```bash
# 1. 生成密钥
openssl rand -base64 32

# 2. 提交代码
git add .
git commit -m "Add cron job"
git push origin main

# 3. 在 Vercel 部署
# - 导入 GitHub 仓库
# - 配置环境变量
# - 部署完成
```

## 🔑 环境变量

在 Vercel 项目设置中配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
CRON_SECRET=your_generated_secret
```

## ⚙️ 当前配置

**频率**: 每 6 小时
**Cron 表达式**: `0 */6 * * *`
**时区**: UTC
**API 端点**: `/api/cleanup`

## 📝 常用 Cron 表达式

| 频率 | Cron 表达式 | 中国时间对应 |
|------|------------|-------------|
| 每小时 | `0 * * * *` | 每小时 |
| 每 6 小时 | `0 */6 * * *` | 每 6 小时 |
| 每天 | `0 0 * * *` | 每天 08:00 |
| 每周 | `0 0 * * 0` | 每周日 08:00 |
| 每月 | `0 0 1 * *` | 每月1日 08:00 |

**时区转换**: 中国时间 = UTC + 8 小时

## 🧪 测试方法

### 浏览器测试
访问：`/test-cleanup`

### 命令行测试
```bash
curl "https://your-project.vercel.app/api/cleanup?secret=your_secret"
```

### 成功响应
```json
{
  "success": true,
  "deletedCount": 5,
  "timestamp": "2024-04-27T12:00:00.000Z"
}
```

## 🛠️ 修改配置

编辑 `vercel.json`:

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

## 🔍 监控检查

- **Vercel Dashboard**: Settings → Cron Jobs
- **函数日志**: 查看执行结果和错误
- **API 测试**: `/test-cleanup` 页面

## 🆘 常见问题

**Q: Cron Job 不执行？**
A: 检查 Vercel Cron Jobs 状态是否为 Active

**Q: 执行失败？**
A: 查看函数日志，验证 Supabase 连接

**Q: 清理数量为 0？**
A: 正常，表示没有过期内容

**Q: 如何立即执行？**
A: 访问 `/test-cleanup` 页面手动触发

## 📞 支持

- 详细部署指南: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- Cron Job 详解: [VERCEL_CRON.md](VERCEL_CRON.md)
- Vercel 文档: https://vercel.com/docs/cron-jobs

---

**快速参考 - 保持简洁，随时查询！**
