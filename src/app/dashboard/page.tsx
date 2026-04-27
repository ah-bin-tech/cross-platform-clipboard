"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useClipboard } from "@/hooks/useClipboard";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, loading: clipboardLoading, addItem, deleteItem, copyToClipboard, error } = useClipboard(user?.id);
  const router = useRouter();
  const [newContent, setNewContent] = useState("");
  const [expiresIn, setExpiresIn] = useState<number | "">("");
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setAddingItem(true);
    try {
      let expiresAt: Date | undefined;
      if (expiresIn && expiresIn > 0) {
        expiresAt = new Date(Date.now() + expiresIn * 60 * 1000); // 分钟转换为毫秒
      }

      await addItem(newContent, "text", expiresAt);
      setNewContent("");
      setExpiresIn("");
    } catch (err) {
      console.error("添加失败:", err);
    } finally {
      setAddingItem(false);
    }
  };

  const handleCopyItem = async (content: string) => {
    try {
      await copyToClipboard(content);
      alert("已复制到剪贴板");
    } catch (err) {
      alert("复制失败");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm("确定要删除这条内容吗？")) {
      try {
        await deleteItem(id);
      } catch (err) {
        alert("删除失败");
      }
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">我的剪贴板</h1>
        <p className="text-gray-600 dark:text-gray-300">
          欢迎，{user.email}
        </p>
      </div>

      <div className="glass p-6 rounded-xl mb-8">
        <form onSubmit={handleAddItem} className="space-y-4">
          <div>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="输入要保存的内容..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="expiresIn" className="block text-sm font-medium mb-2">
                过期时间（分钟，留空表示永不过期）
              </label>
              <input
                id="expiresIn"
                type="number"
                min="1"
                value={expiresIn}
                onChange={(e) => setExpiresIn(e.target.value === "" ? "" : parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="例如：60"
              />
            </div>
            <button
              type="submit"
              disabled={addingItem || !newContent.trim()}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {addingItem ? "添加中..." : "添加到剪贴板"}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 mb-6">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {clipboardLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              暂无剪贴板内容，开始添加你的第一条内容吧！
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="glass p-6 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: zhCN })}
                  </p>
                  <pre className="whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100">
                    {item.content}
                  </pre>
                  {item.expires_at && (
                    <p className="text-sm text-orange-500 dark:text-orange-400 mt-2">
                      将于 {formatDistanceToNow(new Date(item.expires_at), { locale: zhCN })} 后过期
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleCopyItem(item.content)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    复制
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}