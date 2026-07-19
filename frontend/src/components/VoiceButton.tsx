import { Mic, MicOff } from "lucide-react";

interface Props {
  listening: boolean;
  onToggle: () => void;
}

const VoiceButton = ({ listening, onToggle }: Props) => {
  return (
    <button
      onClick={onToggle}
      aria-label={listening ? "Stop voice call" : "Start voice call"}
      className={`fixed bottom-24 right-8 flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-200 ${
        listening
          ? "border-[#8A3E3E] bg-[#3A1F1F] text-[#ECE7D8]"
          : "border-[#C9A15A]/50 bg-[#1B2740] text-[#C9A15A] hover:bg-[#22304F]"
      }`}
    >
      {listening ? <MicOff size={22} /> : <Mic size={22} />}
      {listening && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#D85A30] ring-2 ring-[#0B1220]" />
      )}
    </button>
  );
};

export default VoiceButton;