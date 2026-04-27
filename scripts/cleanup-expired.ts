import process from 'node:process'
import { createClient } from '@supabase/supabase-js'

// 从环境变量中读取 Supabase 凭证
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('错误: 请设置 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_KEY 环境变量')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function cleanupExpiredClipboardItems() {
  console.log('开始清理过期的剪贴板内容...')

  try {
    // 调用数据库函数清理过期内容
    const { data, error } = await supabase.rpc('cleanup_expired_clipboard_items_with_count')

    if (error) {
      console.error('清理失败:', error)
      process.exit(1)
    }

    console.log(`清理完成，删除了 ${data} 条过期内容`)

    if (data === 0) {
      console.log('没有需要清理的过期内容')
    }
  }
  catch (error) {
    console.error('清理过程中发生错误:', error)
    process.exit(1)
  }
}

// 执行清理
cleanupExpiredClipboardItems()
  .then(() => {
    console.log('清理任务完成')
    process.exit(0)
  })
  .catch((error) => {
    console.error('清理任务失败:', error)
    process.exit(1)
  })
