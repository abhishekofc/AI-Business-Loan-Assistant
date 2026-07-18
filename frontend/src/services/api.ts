import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SearchResponse {
  answer: string;
  sources: string[];
  audio: string | null;
}

export const searchKnowledge = async (
  query: string,
  history: HistoryMessage[]
): Promise<SearchResponse> => {
  const response = await api.post("/search", {
    query,
    history,
  });

  return response.data;
};

export default api;