import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
}

export const Input = ({ variant = "default", ...props }: InputProps) => {
  const variantClasses: Record<string, string> = {
    default: "px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300",
    checkbox: "px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 cursor-pointer",
    search:
      "px-4 py-3 bg-[#0f0f0f] text-white rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-inner",
  };

  const className = variantClasses[variant] || variantClasses.default;

  return <input className={className} {...props} />;
};
