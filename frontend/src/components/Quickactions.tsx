import { FileText, Percent, Building2, ClipboardCheck } from "lucide-react";

interface QuickAction {
  label: string;
  prompt: string;
  icon: React.ElementType;
}

const ACTIONS: QuickAction[] = [
  { label: "Check eligibility", prompt: "What are the eligibility requirements for a business loan?", icon: ClipboardCheck },
  { label: "Required documents", prompt: "What documents do I need to apply?", icon: FileText },
  { label: "Interest rates", prompt: "What are the current interest rates?", icon: Percent },
  { label: "Loan types", prompt: "What types of business loans do you offer?", icon: Building2 },
];

interface Props {
  onSelect: (prompt: string) => void;
}

const QuickActions = ({ onSelect }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-3xl border-b border-[#2A3650]">
      {ACTIONS.map(({ label, prompt, icon: Icon }, i) => (
        <button
          key={label}
          onClick={() => onSelect(prompt)}
          className={`group flex flex-1 items-center justify-center gap-2 border-t-2 border-transparent px-3 py-3 text-[13px] text-[#8B93A7] transition-colors duration-150 hover:border-t-[#C9A15A] hover:bg-[#121A2C] hover:text-[#ECE7D8] ${
            i !== ACTIONS.length - 1 ? "border-r border-r-[#2A3650]" : ""
          }`}
        >
          <Icon size={14} strokeWidth={1.75} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;