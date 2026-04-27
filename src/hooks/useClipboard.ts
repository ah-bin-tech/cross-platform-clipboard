'use client'

import type { ClipboardItem } from '@/types/database'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useClipboard(userId: string | undefined) {
  const [items, setItems] = useState<ClipboardItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    if (!userId)
      return

    setLoading(true)
    setError(null)
    try {
      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('clipboard_items')
        .select('*')
        .eq('user_id', userId)
        .or(`expires_at.is.null,expires_at.gt.${now}`)
        .order('created_at', { ascending: false })

      if (error)
        throw error
      setItems(data || [])
    }
    catch (err) {
      setError(err instanceof Error ? err.message : '获取剪贴板内容失败')
    }
    finally {
      setLoading(false)
    }
  }

  const addItem = async (
    content: string,
    contentType: 'text' | 'image' | 'html' = 'text',
    expiresAt?: Date,
  ) => {
    if (!userId)
      throw new Error('请先登录')

    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('clipboard_items')
        .insert({
          user_id: userId,
          content,
          content_type: contentType,
          expires_at: expiresAt?.toISOString() || null,
        })
        .select()
        .single()

      if (error)
        throw error
      setItems(prev => [data, ...prev])
      return data
    }
    catch (err) {
      setError(err instanceof Error ? err.message : '添加剪贴板内容失败')
      throw err
    }
    finally {
      setLoading(false)
    }
  }

  const deleteItem = async (itemId: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase
        .from('clipboard_items')
        .delete()
        .eq('id', itemId)

      if (error)
        throw error
      setItems(prev => prev.filter(item => item.id !== itemId))
    }
    catch (err) {
      setError(err instanceof Error ? err.message : '删除剪贴板内容失败')
      throw err
    }
    finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
    }
    catch (err) {
      throw new Error(`复制到剪贴板失败：${err instanceof Error ? err.message : '未知错误'}`)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchItems()
    }
  }, [userId])

  return {
    items,
    loading,
    error,
    addItem,
    deleteItem,
    copyToClipboard,
    refetch: fetchItems,
  }
}
