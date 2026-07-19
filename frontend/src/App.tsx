import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";

import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

import type { ChatMessage } from "./types/chat";
import { searchKnowledge } from "./services/api";

const QUICK_ACTIONS = [
  "Check Eligibility",
  "Required Documents",
  "Interest Rates",
  "Business Loan Types",
];

const CENTERED_COLUMN: React.CSSProperties = {
  maxWidth: "48rem",
  margin: "0 auto",
  width: "100%",
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "👋 Hello! I'm your AI Business Loan Assistant.\n\nHow can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { transcript, listening, startListening, stopListening, clearTranscript } =
    useSpeechRecognition();

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const history = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await searchKnowledge(text, history);

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.answer,
        sourceId: response.sources?.[0],
        sourceLabel:
          response.sources && response.sources.length > 1
            ? `+${response.sources.length - 1} more`
            : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);

      if (response.audio) {
        try {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          const audio = new Audio(`data:audio/mp3;base64,${response.audio}`);
          audioRef.current = audio;
          await audio.play();
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      }
    } catch (err) {
      console.error(err);

      setLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content: "❌ Unable to connect to the backend.",
        },
      ]);
    }
  };

  useEffect(() => {
    if (!transcript) return;

    handleSend(transcript);
    clearTranscript();
  }, [transcript]);

  const isWelcome = messages.length === 1;

  const composer = (
    <InputBar
      onSend={handleSend}
      listening={listening}
      onVoice={() => (listening ? stopListening() : startListening())}
    />
  );

  return (
    <div className="flex h-screen w-full flex-col bg-[#0B1220] text-[#ECE7D8]">
      <Header />

      <main className="flex w-full flex-1 flex-col overflow-hidden">

        {isWelcome ? (
          <div
            className="flex flex-1 flex-col items-center justify-center px-6 text-center"
            style={CENTERED_COLUMN}
          >
            <h1
              className="text-5xl font-semibold tracking-tight text-[#ECE7D8]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              AI Business Loan Assistant
            </h1>

            <p className="mt-4 text-lg text-[#8B93A7]">
              Ask questions about business loans, MSME financing, eligibility, documents
              and interest rates.
            </p>

            <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              {QUICK_ACTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSend(item)}
                  className="rounded-md border border-[#2A3650] bg-[#121A2C] px-5 py-4 text-left text-[#ECE7D8] transition-colors duration-150 hover:border-[#C9A15A]/60 hover:bg-[#17223A]"
                >
                  <div className="font-medium">{item}</div>
                </button>
              ))}
            </div>

            <div className="w-full" style={{ marginTop: "3rem" }}>
              {composer}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-hidden" style={CENTERED_COLUMN}>
              <ChatWindow messages={messages} loading={loading} />
            </div>

            <div className="w-full bg-gradient-to-t from-[#0B1220] via-[#0B1220] to-transparent px-5 pb-6 pt-4">
              {composer}
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default App;