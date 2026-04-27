'use client'

import { Logo } from '@/components/Logo'
import { useTheme } from '@/components/ThemeProvider'

export default function LogoShowcasePage() {
  const { actualTheme } = useTheme()

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Logo 展示
        </h1>

        {/* 主 Logo */}
        <section className="mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">主 Logo (带文字)</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 flex justify-center">
                <Logo variant="main" />
              </div>
              <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                <p className="mb-2">
                  <strong>用途:</strong>
                  {' '}
                  网站头部、宣传材料、文档
                </p>
                <p className="mb-2">
                  <strong>文件:</strong>
                  {' '}
                  public/logo-main.svg
                </p>
                <p className="mb-2">
                  <strong>尺寸:</strong>
                  {' '}
                  200x50px
                </p>
                <p>
                  <strong>使用方法:</strong>
                  {' '}
                  &lt;Logo variant="main" /&gt;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 图标版本 */}
        <section className="mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">图标版本</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 flex justify-center">
                <Logo variant="icon" />
              </div>
              <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                <p className="mb-2">
                  <strong>用途:</strong>
                  {' '}
                  大图标显示、社交媒体头像
                </p>
                <p className="mb-2">
                  <strong>文件:</strong>
                  {' '}
                  public/logo-icon.svg
                </p>
                <p className="mb-2">
                  <strong>尺寸:</strong>
                  {' '}
                  64x64px
                </p>
                <p>
                  <strong>使用方法:</strong>
                  {' '}
                  &lt;Logo variant="icon" /&gt;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 简化图标 */}
        <section className="mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">简化图标</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 flex justify-center">
                <Logo variant="simple" size={64} />
              </div>
              <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                <p className="mb-2">
                  <strong>用途:</strong>
                  {' '}
                  按钮图标、小尺寸显示
                </p>
                <p className="mb-2">
                  <strong>文件:</strong>
                  {' '}
                  public/logo-simple.svg
                </p>
                <p className="mb-2">
                  <strong>尺寸:</strong>
                  {' '}
                  32x32px (可自定义)
                </p>
                <p>
                  <strong>使用方法:</strong>
                  {' '}
                  &lt;Logo variant="simple" size=
                  {64}
                  {' '}
                  /&gt;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Favicon */}
        <section className="mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Favicon</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 flex justify-center">
                <Logo variant="favicon" />
              </div>
              <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                <p className="mb-2">
                  <strong>用途:</strong>
                  {' '}
                  浏览器标签页图标、书签图标
                </p>
                <p className="mb-2">
                  <strong>文件:</strong>
                  {' '}
                  public/favicon.svg
                </p>
                <p className="mb-2">
                  <strong>尺寸:</strong>
                  {' '}
                  32x32px
                </p>
                <p>
                  <strong>使用方法:</strong>
                  {' '}
                  &lt;Logo variant="favicon" /&gt;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 不同尺寸示例 */}
        <section className="mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">不同尺寸示例</h2>
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <Logo variant="simple" size={16} />
                <p className="text-xs text-gray-500 mt-2">16px</p>
              </div>
              <div className="text-center">
                <Logo variant="simple" size={24} />
                <p className="text-xs text-gray-500 mt-2">24px</p>
              </div>
              <div className="text-center">
                <Logo variant="simple" size={32} />
                <p className="text-xs text-gray-500 mt-2">32px</p>
              </div>
              <div className="text-center">
                <Logo variant="simple" size={48} />
                <p className="text-xs text-gray-500 mt-2">48px</p>
              </div>
              <div className="text-center">
                <Logo variant="simple" size={64} />
                <p className="text-xs text-gray-500 mt-2">64px</p>
              </div>
              <div className="text-center">
                <Logo variant="simple" size={96} />
                <p className="text-xs text-gray-500 mt-2">96px</p>
              </div>
            </div>
          </div>
        </section>

        {/* 主题适配示例 */}
        <section className="mb-16">
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">主题适配</h2>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  当前主题:
                  {' '}
                  <strong>{actualTheme === 'light' ? '浅色' : '深色'}</strong>
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Logo variant="simple" size={24} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">浅色背景</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Logo variant="simple" size={24} />
                      <span className="text-xs text-gray-600 dark:text-gray-300">深色背景</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 使用示例 */}
        <section>
          <div className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">代码示例</h2>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <pre>
                {`// 导入组件
import { Logo } from "@/components/Logo";

// 使用简化图标（默认）
<Logo />

// 使用主 Logo
<Logo variant="main" />

// 使用图标版本
<Logo variant="icon" />

// 自定义大小
<Logo variant="simple" size={40} />

// 添加自定义类名
<Logo variant="icon" className="mb-4" />`}
              </pre>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            更多信息请查看
            {' '}
            <a href="/" className="text-blue-500 hover:underline">首页</a>
            {' '}
            或
            {' '}
            <a href="#" className="text-blue-500 hover:underline">LOGO.md</a>
            {' '}
            文档
          </p>
        </div>
      </div>
    </div>
  )
}
