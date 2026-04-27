# 快速设置指南

## 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 账号登录
4. 创建新项目：
   - 选择组织
   - 输入项目名称（如：cross-platform-clipboard）
   - 选择数据库密码
   - 选择区域
   - 点击 "Create new project"

## 2. 获取 Supabase 凭证

项目创建完成后：

1. 进入项目 Dashboard
2. 点击左侧菜单的 "Project Settings" (齿轮图标)
3. 选择 "API" 标签
4. 复制以下信息：
   - **Project URL** (类似：https://xxxxxxxx.supabase.co)
   - **anon public** key (类似：eyJhbGciOiJIUzI1...)

## 3. 配置环境变量

在项目根目录创建 `.env` 文件：

```bash
# 复制模板文件
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Supabase 凭证：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```

## 4. 设置数据库

### 方法 1: 使用 Supabase Dashboard

1. 在 Supabase Dashboard 中，点击左侧菜单的 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase/schema.sql` 文件中的所有内容
4. 粘贴到 SQL Editor 中
5. 点击 "Run" 执行 SQL 语句

### 方法 2: 使用 Supabase CLI

1. 安装 Supabase CLI：
   ```bash
   # macOS
   brew install supabase/tap/supabase

   # Windows
   scoop install supabase

   # Linux
   curl -fsSL https://supabase.com/install.sh | bash
   ```

2. 推送数据库架构：
   ```bash
   supabase db push --db-url "postgresql://postgres:[password]@[project-id].supabase.co:5432/postgres"
   ```

## 5. 配置 Auth 设置

1. 在 Supabase Dashboard 中，点击左侧菜单的 "Authentication"
2. 点击 "Providers" 标签
3. 确认 "Email" 提供商已启用
4. （可选）如果要在开发环境禁用邮箱验证，可以：
   - 进入 "Project Settings" > "Auth"
   - 找到 "Email confirmation" 设置
   - 取消勾选 "Confirm email"

## 6. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 7. 测试应用

1. **注册新用户**：
   - 点击首页的 "注册" 按钮
   - 输入邮箱和密码
   - 点击 "注册"

2. **添加剪贴板内容**：
   - 登录后，你会看到仪表板
   - 在文本框中输入内容
   - （可选）设置过期时间（分钟）
   - 点击 "添加到剪贴板"

3. **复制内容**：
   - 点击任何剪贴板项的 "复制" 按钮
   - 内容会被复制到系统剪贴板

4. **删除内容**：
   - 点击 "删除" 按钮删除特定的剪贴板项

## 8. （可选）设置定时清理任务

要自动清理过期的剪贴板内容，需要配置定时任务：

1. 获取 Service Role Key：
   - 在 Supabase Dashboard > "Project Settings" > "API"
   - 复制 "service_role" key

2. 创建环境变量文件（不要提交到版本控制）：
   ```bash
   echo "SUPABASE_URL=https://xxxxxxxx.supabase.co" > .env.production
   echo "SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1..." >> .env.production
   ```

3. 测试清理脚本：
   ```bash
   source .env.production
   npm run cleanup
   ```

4. 设置定时任务（根据你的环境选择）：

   **GitHub Actions**：
   创建 `.github/workflows/cleanup.yml` 文件：

   ```yaml
   name: Cleanup Expired Clipboard Items
   on:
     schedule:
       - cron: '0 * * * *'  # 每小时执行一次
     workflow_dispatch:      # 允许手动触发
   jobs:
     cleanup:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run cleanup
         env:
           SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
           SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
   ```

   在 GitHub 仓库设置中添加 Secrets：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`

## 常见问题

### 问题：无法注册新用户

- 检查 Supabase Auth 设置中邮箱验证是否需要确认
- 查看 Supabase Dashboard > "Authentication" > "Users" 查看用户状态

### 问题：剪贴板内容不显示

- 确认已执行数据库 schema
- 检查浏览器控制台是否有错误
- 验证 RLS 策略是否正确设置

### 问题：定时清理任务不工作

- 确认 Service Role Key 正确
- 检查定时任务日志
- 手动执行 `npm run cleanup` 测试

## 下一步

- 查看 [README.md](README.md) 了解更多详细信息
- 自定义主题颜色和样式
- 添加更多功能如搜索、标签等
- 部署到 Vercel 或其他平台
