"use client";

import { useState } from "react";

export default function CleanupApiPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");

  const handleTestCleanup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cleanup?secret=${secret}`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Request failed", details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cron Job 测试页面
        </h1>

        <div className="glass p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">测试清理 API</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="secret" className="block text-sm font-medium mb-2">
                Cron Secret
              </label>
              <input
                id="secret"
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="输入你的 CRON_SECRET"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                开发环境可以留空（不验证密钥），生产环境必须提供正确的密钥
              </p>
            </div>

            <button
              onClick={handleTestCleanup}
              disabled={loading}
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "执行中..." : "执行清理"}
            </button>
          </div>
        </div>

        {response && (
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">响应结果</h2>
            <pre className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">API 说明</h2>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">端点</h3>
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                GET /api/cleanup
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">认证方式</h3>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">方式 1: URL 参数</p>
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded block mt-1">
                    /api/cleanup?secret=your_secret
                  </code>
                </div>
                <div>
                  <p className="font-medium">方式 2: Authorization Header</p>
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded block mt-1">
                    Authorization: Bearer your_secret
                  </code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">成功响应</h3>
              <pre className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
{`{
  "success": true,
  "deletedCount": 5,
  "timestamp": "2024-04-27T12:00:00.000Z"
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">错误响应</h3>
              <pre className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
{`// 未授权
{
  "error": "Unauthorized"
}

// 执行失败
{
  "error": "Cleanup failed",
  "details": "..."
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Cron Job 配置</h2>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">当前配置</h3>
              <p className="mb-2">频率: 每 6 小时</p>
              <p className="mb-2">Cron 表达式: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">0 */6 * * *</code></p>
              <p>时区: UTC (协调世界时)</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">常用 Cron 表达式</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-600">
                    <th className="py-2">频率</th>
                    <th className="py-2">Cron 表达式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">每小时</td>
                    <td className="py-2"><code>0 * * * *</code></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">每 6 小时</td>
                    <td className="py-2"><code>0 */6 * * *</code></td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">每天</td>
                    <td className="py-2"><code>0 0 * * *</code></td>
                  </tr>
                  <tr>
                    <td className="py-2">每周</td>
                    <td className="py-2"><code>0 0 * * 0</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-semibold mb-2">修改配置</h3>
              <p>编辑项目根目录的 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">vercel.json</code> 文件，修改 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">schedule</code> 字段。</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            更多详细信息请查看 <a href="/" className="text-blue-500 hover:underline">首页</a> 或 <a href="/logo" className="text-blue-500 hover:underline">Logo 展示</a>
          </p>
        </div>
      </div>
    </div>
  );
}