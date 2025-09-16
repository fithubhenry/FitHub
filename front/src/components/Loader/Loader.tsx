import React from "react";

export default function Loader({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#fee600] mb-4"></div>
      <span className="text-[#fee600] font-semibold text-lg">{text}</span>
    </div>
  );
}
