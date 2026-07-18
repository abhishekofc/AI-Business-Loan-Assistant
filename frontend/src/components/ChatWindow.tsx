import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "../types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
};

export default ChatWindow;