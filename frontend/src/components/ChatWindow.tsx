
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessage } from "../types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
  loading?: boolean;
}

const ChatWindow = ({ messages, loading = false }: ChatWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      className="h-full overflow-y-auto px-6 py-8"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent, transparent 43px, #14203699 44px)",
      }}
    >
      <div
        className="flex flex-col gap-6"
        style={{ maxWidth: "48rem", margin: "0 auto", width: "100%" }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;