import { Mic, MicOff } from "lucide-react";

interface Props {
  listening: boolean;
  onToggle: () => void;
}

const VoiceButton = ({ listening, onToggle }: Props) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-24 right-8 rounded-full p-5 shadow-xl transition ${
        listening
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {listening ? (
        <MicOff className="text-white" size={28} />
      ) : (
        <Mic className="text-white" size={28} />
      )}
    </button>
  );
};

export default VoiceButton;