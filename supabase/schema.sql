-- 创建 clipboard_items 表
CREATE TABLE IF NOT EXISTS clipboard_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  content_type VARCHAR(10) DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'html')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_clipboard_items_user_id ON clipboard_items(user_id);
CREATE INDEX IF NOT EXISTS idx_clipboard_items_created_at ON clipboard_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clipboard_items_expires_at ON clipboard_items(expires_at) WHERE expires_at IS NOT NULL;

-- 启用行级安全策略
ALTER TABLE clipboard_items ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能看到自己的剪贴板内容
CREATE POLICY "Users can view their own clipboard items"
ON clipboard_items FOR SELECT
USING (auth.uid() = user_id);

-- 创建策略：用户可以创建自己的剪贴板内容
CREATE POLICY "Users can insert their own clipboard items"
ON clipboard_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 创建策略：用户可以更新自己的剪贴板内容
CREATE POLICY "Users can update their own clipboard items"
ON clipboard_items FOR UPDATE
USING (auth.uid() = user_id);

-- 创建策略：用户可以删除自己的剪贴板内容
CREATE POLICY "Users can delete their own clipboard items"
ON clipboard_items FOR DELETE
USING (auth.uid() = user_id);

-- 创建触发器：自动更新 updated_at 字段
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clipboard_items_updated_at BEFORE UPDATE
ON clipboard_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 创建存储过程：清理过期的剪贴板内容
CREATE OR REPLACE FUNCTION cleanup_expired_clipboard_items()
RETURNS void 
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM clipboard_items
    WHERE expires_at IS NOT NULL
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 创建清理过期的剪贴板内容的函数，返回删除的记录数
CREATE OR REPLACE FUNCTION cleanup_expired_clipboard_items_with_count()
RETURNS integer 
SECURITY DEFINER
AS $$
DECLARE
    deleted_count integer;
BEGIN
    DELETE FROM clipboard_items
    WHERE expires_at IS NOT NULL
    AND expires_at < NOW();

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;