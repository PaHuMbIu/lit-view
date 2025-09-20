import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  children: ReactNode;
}

export const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
  const variantClasses: Record<string, string> = {
    default: "rounded hover:bg-gray-300 cursor-pointer",
    primary:
      "px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-[0_0_20px_#3b82f6] transition cursor-pointer",
    secondary:
      "px-6 py-2 bg-gray-700 text-gray-100 font-semibold rounded-xl shadow-lg hover:bg-gray-600 hover:shadow-[0_0_15px_#ffffff33] transition cursor-pointer",
    card: "transparent flex flex-col w-full cursor-pointer",
  };

  const className = variantClasses[variant] || variantClasses.default;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
