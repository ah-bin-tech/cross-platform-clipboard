'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { useTheme } from '@/components/ThemeProvider'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { actualTheme, setTheme } = useTheme()
  const { user, signOut } = useAuth()

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <Logo variant="simple" size={32} />
            <h1 className="text-xl font-semibold">Cross-Platform Clipboard</h1>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="切换主题"
            >
              {actualTheme === 'light' ? '🌙' : '☀️'}
            </button>

            {user
              ? (
                  <>
                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                      {user.email}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={signOut}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        退出登录
                      </button>
                    </div>
                  </>
                )
              : (
                  <div className="flex items-center space-x-2">
                    <a
                      href="/login"
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      登录
                    </a>
                    <a
                      href="/signup"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      注册
                    </a>
                  </div>
                )}
          </div>
        </div>
      </nav>
    </header>
  )
}
