
import { useState } from "react";
import { Send, Mic, Paperclip } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  onVoice: () => void;
  listening: boolean;
}

const InputBar = ({ onSend, onVoice, listening }: Props) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", width: "100%" }}>
      <div className="rounded-[26px] border border-[#2A3650] bg-[#121A2C] px-5 pb-3 pt-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors duration-200 focus-within:border-[#C9A15A]/60">

        <textarea
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask about eligibility, documents, rates, or loan types…"
          className="max-h-40 w-full resize-none bg-transparent text-[15px] leading-6 text-[#ECE7D8] placeholder:text-[#8B93A7]/70 outline-none"
        />

        <div className="mt-3 flex items-center justify-between">

          <button
            type="button"
            aria-label="Attach a document"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2A3650] text-[#8B93A7] transition-colors duration-150 hover:border-[#C9A15A]/50 hover:text-[#ECE7D8]"
          >
            <Paperclip size={15} />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wide text-[#8B93A7]">
              RAG &middot; Gemini
            </span>

            <button
              type="button"
              onClick={onVoice}
              aria-label="Toggle voice input"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
                listening
                  ? "bg-[#6B2F2F] text-[#ECE7D8]"
                  : "text-[#8B93A7] hover:bg-[#1B2740] hover:text-[#ECE7D8]"
              }`}
            >
              <Mic size={16} />
            </button>

            <button
              onClick={handleSend}
              disabled={!text.trim()}
              aria-label="Send message"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A15A] text-[#1B2740] transition-all duration-200 hover:bg-[#DBB876] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#2A3650] disabled:text-[#8B93A7]"
            >
              <Send size={14} strokeWidth={2.25} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InputBar;