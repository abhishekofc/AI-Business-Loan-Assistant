
import ReactMarkdown from "react-markdown";
import { Landmark, User2, FileCheck2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatMessage } from "../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";
  const hasCitation = !isUser && !!message.sourceId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-2xl items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>

        {/* Avatar */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${
            isUser ? "border-[#2A3650] bg-[#1B2740]" : "border-[#2A3650] bg-[#121A2C]"
          }`}
        >
          {isUser ? (
            <User2 size={16} className="text-[#ECE7D8]" strokeWidth={1.75} />
          ) : (
            <Landmark size={16} className="text-[#C9A15A]" strokeWidth={1.75} />
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Bubble */}
          <div
            className={`rounded-md px-5 py-4 ${
              isUser
                ? "bg-[#1B2740] text-[#ECE7D8]"
                : "border border-[#2A3650] bg-[#121A2C] text-[#ECE7D8]"
            }`}
          >
            <div className="prose prose-invert max-w-none text-[15px] leading-7 prose-p:my-1.5 prose-headings:text-[#ECE7D8]">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>

          {/* Citation stamp */}
          {hasCitation && (
            <div className="flex items-center gap-2 pl-1">
              <div
                className={`flex items-center gap-1.5 rounded-sm border px-2 py-[3px] ${
                  message.grounded === false
                    ? "border-[#8B93A7]/40 text-[#8B93A7]"
                    : "border-[#C9A15A]/40 text-[#C9A15A]"
                }`}
                style={{ transform: "rotate(-0.6deg)" }}
              >
                <FileCheck2 size={11} strokeWidth={2} />
                <span className="font-mono text-[10.5px] uppercase tracking-wide">
                  {message.grounded === false ? "unverified" : "verified"} &middot; {message.sourceId}
                </span>
              </div>
              {message.sourceLabel && (
                <span className="font-mono text-[10.5px] text-[#8B93A7]">
                  {message.sourceLabel}
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default MessageBubble;