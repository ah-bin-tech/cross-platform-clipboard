# Cross-Platform Clipboard

一个使用 Next.js + TailwindCSS + Supabase 实现的跨平台剪贴板应用。

## 功能特点

- **用户认证**: 安全的登录和注册系统，每个用户只能看到自己的剪贴板内容
- **实时同步**: 剪贴板内容在所有设备间实时同步
- **自动过期**: 可以为剪贴板内容设置过期时间，过期后自动清理
- **Apple 风格设计**: 简洁优雅的界面，包含高斯模糊、半透明等效果
- **响应式设计**: 完美适配桌面和移动设备
- **深色/浅色模式**: 支持主题切换，满足不同视觉偏好
- **专业 Logo**: 多版本矢量 Logo 设计，适应各种使用场景

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **语言**: TypeScript
- **时间处理**: date-fns

## 项目结构

```
cross-platform-clipboard/
├── src/
│   ├── app/                 # Next.js App Router 页面
│   │   ├── dashboard/      # 仪表板页面
│   │   ├── login/          # 登录页面
│   │   ├── signup/         # 注册页面
│   │   ├── logo/           # Logo 展示页面
│   │   └── page.tsx        # 首页
│   ├── components/         # React 组件
│   │   ├── Header.tsx      # 头部导航
│   │   ├── Hero.tsx        # 首页 Hero 区域
│   │   ├── Logo.tsx        # Logo 组件
│   │   └── ThemeProvider.tsx # 主题提供者
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useAuth.ts      # 认证相关 Hook
│   │   └── useClipboard.ts # 剪贴板操作 Hook
│   ├── lib/               # 工具库
│   │   └── supabase.ts    # Supabase 客户端配置
│   ├── types/             # TypeScript 类型定义
│   │   └── database.ts    # 数据库类型
│   └── app/               # Next.js 配置
│       ├── globals.css    # 全局样式
│       └── layout.tsx     # 根布局
├── public/                # 静态资源
│   ├── logo-main.svg     # 主 Logo (带文字)
│   ├── logo-icon.svg     # 图标版本
│   ├── logo-simple.svg   # 简化图标
│   └── favicon.svg      # Favicon
├── scripts/               # 工具脚本
│   └── cleanup-expired.ts # 清理过期内容的定时脚本
├── supabase/             # Supabase 配置
│   └── schema.sql        # 数据库模式
└── README.md             # 项目文档
```

## Logo 使用

项目包含多个版本的 Logo，适应不同的使用场景：

### Logo 组件使用

```tsx
import { Logo } from "@/components/Logo";

// 主 Logo (带文字)
<Logo variant="main" />

// 图标版本
<Logo variant="icon" />

// 简化图标 (可自定义大小)
<Logo variant="simple" size={32} />

// Favicon
<Logo variant="favicon" />
```

### 直接使用 SVG 文件

```html
<!-- 主 Logo -->
<img src="/logo-main.svg" alt="CrossPlatform Clipboard" />

<!-- 图标版本 -->
<img src="/logo-icon.svg" alt="CrossPlatform Clipboard" />

<!-- 简化图标 -->
<img src="/logo-simple.svg" alt="CrossPlatform Clipboard" />

<!-- Favicon -->
<link rel="icon" href="/favicon.svg" />
```

### Logo 展示页面

访问 `/logo` 路径查看完整的 Logo 展示和使用示例。

### 文档

- [LOGO.md](./docs/LOGO.md) - Logo 使用指南
- [LOGO_DESIGN.md](./docs/LOGO_DESIGN.md) - Logo 设计详解
- [LOGO_SUMMARY.md](./docs/LOGO_SUMMARY.md) - Logo 功能总结

## 快速开始

### 前置要求

- Node.js 18 或更高版本
- npm 或 yarn
- 一个 Supabase 项目账号

### 安装步骤

1. **克隆项目**

```bash
git clone <repository-url>
cd cross-platform-clipboard
```

2. **安装依赖**

```bash
npm install
```

3. **设置 Supabase**

- 登录 [Supabase Dashboard](https://supabase.com/dashboard)
- 创建一个新项目
- 进入项目设置，获取以下信息：
  - Project URL
  - anon/public key
  - service_role key (用于定时清理脚本)

4. **配置环境变量**

复制 `.env.example` 文件并重命名为 `.env`：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Supabase 凭证：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **设置数据库**

在 Supabase Dashboard 的 SQL Editor 中执行 `supabase/schema.sql` 文件中的 SQL 语句，或者使用 Supabase CLI：

```bash
supabase db push
```

6. **运行开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署

### 部署到 Vercel

1. **准备工作**
   - 确保代码已推送到 GitHub
   - 在 Vercel 中创建一个新项目

2. **环境变量设置**
   在 Vercel 项目设置中添加以下环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **部署**
   - 连接 GitHub 仓库
   - Vercel 会自动检测 Next.js 项目并开始部署
   - 部署完成后，你将获得一个生产环境的 URL

### 设置定时清理任务

项目提供多种方式设置自动清理任务，推荐使用 **Vercel Cron Jobs**。

详细说明请查看 [VERCEL_CRON.md](./docs/VERCEL_CRON.md)。

#### 方案 1: Vercel Cron Jobs (推荐)

1. **生成密钥**

   ```bash
   openssl rand -base64 32
   ```

2. **配置环境变量**
   在 Vercel 项目设置中添加：

   ```
   CRON_SECRET = your_generated_secret
   ```

3. **部署项目**
   项目已包含 `vercel.json` 配置，Vercel 会自动设置 Cron Job。

4. **验证**
   访问 Vercel Dashboard → Settings → Cron Jobs 查看执行状态。

#### 方案 2: GitHub Actions

创建 `.github/workflows/cleanup.yml` 文件，详细配置请参考 [VERCEL_CRON.md](./docs/VERCEL_CRON.md)。

#### 方案 3: 第三方 Cron 服务

使用 Cron-job.org、EasyCron 等服务调用 `/api/cleanup` 端点。

#### 手动测试

```bash
# 测试清理 API
curl "https://your-project.vercel.app/api/cleanup?secret=your_secret"
```

#### 执行计划

项目默认设置为每 6 小时执行一次清理，可以在 `vercel.json` 中修改：

```json
{
  "crons": [
    {
      "path": "/api/cleanup",
      "schedule": "0 */6 * * *" // 修改这里的表达式
    }
  ]
}
```

### 详细文档

详细的 Vercel 部署和 Cron Job 配置请查看：

- [VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) - Vercel 部署完整指南
- [VERCEL_CRON.md](./docs/VERCEL_CRON.md) - Cron Job 配置详解

## 数据库架构

### clipboard_items 表

| 字段         | 类型      | 描述                        |
| ------------ | --------- | --------------------------- |
| id           | UUID      | 主键                        |
| user_id      | UUID      | 用户ID，外键关联 auth.users |
| content      | TEXT      | 剪贴板内容                  |
| content_type | VARCHAR   | 内容类型（text/image/html） |
| expires_at   | TIMESTAMP | 过期时间，NULL 表示永不过期 |
| created_at   | TIMESTAMP | 创建时间                    |
| updated_at   | TIMESTAMP | 更新时间                    |

### 行级安全策略 (RLS)

- 用户只能查看自己的剪贴板内容
- 用户只能创建自己的剪贴板内容
- 用户只能更新自己的剪贴板内容
- 用户只能删除自己的剪贴板内容

## API 函数

### cleanup_expired_clipboard_items()

清理所有过期的剪贴板内容。

```sql
SELECT cleanup_expired_clipboard_items();
```

### cleanup_expired_clipboard_items_with_count()

清理过期的剪贴板内容，并返回删除的记录数。

```sql
SELECT cleanup_expired_clipboard_items_with_count();
```

## 开发指南

### 添加新的剪贴板内容类型

1. 更新 `src/types/database.ts` 中的 `ClipboardItem` 接口
2. 更新 `supabase/schema.sql` 中的 CHECK 约束
3. 在 `src/app/dashboard/page.tsx` 中添加相应的 UI 处理

### 自定义主题样式

修改 `src/app/globals.css` 中的 CSS 变量来自定义主题颜色和样式。

### 添加新的认证方式

在 `src/hooks/useAuth.ts` 中添加新的认证方法，如 OAuth 等。

## 测试

```bash
# 运行开发环境测试
npm run dev

# 运行生产构建
npm run build

# 启动生产服务器
npm start
```

## 故障排除

### 问题：无法连接到 Supabase

- 检查 `.env` 文件中的 Supabase URL 和密钥是否正确
- 确认 Supabase 项目已启用所需的 API 端点
- 检查网络连接和防火墙设置

### 问题：用户无法注册/登录

- 确认已执行数据库 schema 脚本
- 检查 Supabase Auth 设置中的邮箱确认选项
- 查看浏览器控制台和 Supabase Dashboard 中的日志

### 问题：剪贴板内容不显示

- 检查用户是否已登录
- 确认行级安全策略已正确配置
- 查看浏览器控制台中的错误信息

## 贡献指南

欢迎提交 Pull Request 或创建 Issue 来改进项目。

## 许可证

Apache-2.0 License

## 联系方式

如有问题或建议，请通过以下方式联系：

- [GitHub Issues](https://github.com/ah-bin-tech/cross-platform-clipboard/issues)
- Email: cnliuyuhe@gmail.com

---

**注意**: 请妥善保管你的 Supabase 凭证，不要将包含真实密钥的 `.env` 文件提交到版本控制系统。
