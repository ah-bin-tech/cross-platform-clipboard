/* eslint-disable node/prefer-global/process */
import { NextResponse } from 'next/server'

// 验证 Cron Job 请求的密钥
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(request: Request) {
  // 验证请求来源
  const authHeader = request.headers.get('authorization')
  const url = new URL(request.url)
  const secretParam = url.searchParams.get('secret')

  if (authHeader !== `Bearer ${CRON_SECRET}` && secretParam !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 创建 Supabase 客户端
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    // 调用清理函数
    const { data, error } = await supabase.rpc('cleanup_expired_clipboard_items_with_count')

    if (error) {
      console.error('Cleanup failed:', error)
      return NextResponse.json(
        { error: 'Cleanup failed', details: error.message },
        { status: 500 },
      )
    }

    // console.log(`Cleanup completed: ${data} items deleted`)

    return NextResponse.json({
      success: true,
      deletedCount: data,
      timestamp: new Date().toISOString(),
    })
  }
  catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
