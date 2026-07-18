import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import VoiceButton from "./components/VoiceButton";

import { useSpeechRecognition } from "./hooks/useSpeechRecognition";

import type { ChatMessage } from "./types/chat";
import { searchKnowledge } from "./services/api";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "👋 Hello! I'm your AI Business Loan Assistant.\n\nHow can I help you today?",
    },
  ]);

  // Holds currently playing audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    transcript,
    listening,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

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
      };

      setMessages((prev) => [...prev, aiMessage]);

      // ==========================
      // Play AI Voice Response
      // ==========================
      if (response.audio) {
        try {
          // Stop previous audio if any
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          const audio = new Audio(
            `data:audio/mp3;base64,${response.audio}`
          );

          audioRef.current = audio;

          await audio.play();
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      }
    } catch (err) {
      console.error(err);

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

  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      <Header />

      <ChatWindow messages={messages} />

      <InputBar onSend={handleSend} />

      <VoiceButton
        listening={listening}
        onToggle={() =>
          listening ? stopListening() : startListening()
        }
      />
    </div>
  );
}

export default App;