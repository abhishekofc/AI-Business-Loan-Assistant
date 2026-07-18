import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export function useSpeechRecognition() {
  const recognitionRef = useRef<any>(null);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const text =
        event.results[event.results.length - 1][0].transcript.trim();

      setTranscript(text);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  return {
    transcript,
    listening,
    startListening: () => recognitionRef.current?.start(),
    stopListening: () => recognitionRef.current?.stop(),
    clearTranscript: () => setTranscript(""),
  };
}