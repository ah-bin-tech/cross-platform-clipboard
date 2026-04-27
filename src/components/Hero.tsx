import Link from 'next/link'

export function Hero() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          跨平台剪贴板
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12">
          在所有设备间无缝同步你的剪贴板内容，让信息传递更简单
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-blue-500 text-white text-lg font-medium rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
          >
            开始使用
          </Link>

        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-6 rounded-xl">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">实时同步</h3>
          </div>
          <div className="glass p-6 rounded-xl">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">安全私密</h3>
          </div>
          <div className="glass p-6 rounded-xl">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="text-lg font-semibold mb-2">自动过期</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
