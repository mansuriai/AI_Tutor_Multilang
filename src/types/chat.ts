
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export interface Source {
  text: string;
  metadata: {
    chunk_id: string;
    content_type: string;
    page_num?: number;
    source: string;
    text: string;
    total_pages?: number;
  };
}
