import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface InputBarProps {
  onSend: (message: string) => void;
}

const InputBar = ({ onSend }: InputBarProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-4">
      <div className="mx-auto flex max-w-5xl items-center gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask about business loans..."
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white outline-none transition focus:border-indigo-500"
        />

        <button
          onClick={handleSend}
          className="rounded-xl bg-indigo-600 p-4 transition hover:bg-indigo-700"
        >
          <SendHorizontal className="text-white" />
        </button>

      </div>
    </div>
  );
};

export default InputBar;