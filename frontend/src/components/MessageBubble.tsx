import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-3xl gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isUser
              ? "bg-indigo-600"
              : "bg-zinc-800"
          }`}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} />
          )}
        </div>

        <div
          className={`rounded-2xl px-5 py-4 shadow-lg ${
            isUser
              ? "bg-indigo-600 text-white"
              : "border border-zinc-800 bg-zinc-900 text-zinc-100"
          }`}
        >
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;