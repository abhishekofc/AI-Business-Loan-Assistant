import { Landmark } from "lucide-react";
import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#2A3650] bg-[#121A2C]">
          <Landmark size={16} className="text-[#C9A15A]" strokeWidth={1.75} />
        </div>

        <div className="flex items-center gap-2 rounded-md border border-[#2A3650] bg-[#121A2C] px-5 py-4">
          <span className="font-mono text-[11px] uppercase tracking-wide text-[#8B93A7]">
            Drafting entry
          </span>
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#C9A15A]"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.18,
                }}
              />
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;