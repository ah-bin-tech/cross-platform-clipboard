export interface ClipboardItem {
  id: string;
  user_id: string;
  content: string;
  content_type: "text" | "image" | "html";
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}