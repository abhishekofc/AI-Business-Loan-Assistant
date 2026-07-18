import { Bot, Wifi } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/20">

            <Bot size={26} className="text-white" />

          </div>

          <div>

            <h1 className="text-lg font-bold text-white">
              AI Loan Assistant
            </h1>

            <p className="text-sm text-zinc-400">
              Powered by RAG + Gemini
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">

          <Wifi
            size={18}
            className="text-green-400"
          />

          <span className="text-sm font-medium text-green-400">
            Connected
          </span>

        </div>

      </div>
    </header>
  );
};

export default Header;