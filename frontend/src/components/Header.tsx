


// import { Landmark, Check } from "lucide-react";

// interface HeaderProps {
//   caseRef?: string;
//   live?: boolean;
// }

// const Header = ({ caseRef = "BLA-2026-0417", live = true }: HeaderProps) => {
//   return (
//     <header className="sticky top-0 z-50 border-b border-[#2A3650] bg-[#0B1220]/95 backdrop-blur-md">
//       <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

//         {/* Left */}
//         <div className="flex items-center gap-4">

//           <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[#2A3650] bg-[#121A2C]">
//             <Landmark size={22} className="text-[#C9A15A]" strokeWidth={1.75} />
//           </div>

//           <div>
//             <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B93A7]">
//               Case file &middot; {caseRef}
//             </p>
//             <h1
//               className="text-[19px] font-semibold leading-tight text-[#ECE7D8]"
//               style={{ fontFamily: "'Fraunces', serif" }}
//             >
//               Business Loan Assistant
//             </h1>
//           </div>

//         </div>

//         {/* Right: wax-seal status indicator */}
//         <div className="flex items-center gap-2.5">
//           <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A15A]/60 bg-[#1B2740]">
//             <Check size={15} className="text-[#C9A15A]" strokeWidth={2.5} />
//             {live && (
//               <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#6B9C82] ring-2 ring-[#0B1220]" />
//             )}
//           </div>
//           <div className="hidden sm:block">
//             <p className="text-[13px] font-medium text-[#ECE7D8]">Session live</p>
//             <p className="font-mono text-[11px] text-[#8B93A7]">RAG &middot; Gemini</p>
//           </div>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default Header;

import { Landmark, Check } from "lucide-react";

interface HeaderProps {
  caseRef?: string;
  live?: boolean;
}

const Header = ({ caseRef = "BLA-2026-0417", live = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A3650] bg-[#0B1220]/95 backdrop-blur-md">
      <div
        className="flex h-[72px] items-center justify-between px-6"
        style={{ maxWidth: "80rem", margin: "0 auto" }}
      >

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-md border border-[#2A3650] bg-[#121A2C]">
            <Landmark size={22} className="text-[#C9A15A]" strokeWidth={1.75} />
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B93A7]">
              Case file &middot; {caseRef}
            </p>
            <h1
              className="text-[19px] font-semibold leading-tight text-[#ECE7D8]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Business Loan Assistant
            </h1>
          </div>

        </div>

        {/* Right: wax-seal status indicator */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A15A]/60 bg-[#1B2740]">
            <Check size={15} className="text-[#C9A15A]" strokeWidth={2.5} />
            {live && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#6B9C82] ring-2 ring-[#0B1220]" />
            )}
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-medium text-[#ECE7D8]">Session live</p>
            <p className="font-mono text-[11px] text-[#8B93A7]">RAG &middot; Gemini</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;