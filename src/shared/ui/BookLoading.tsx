import React, { ReactNode } from "react";

interface BookLoadingProps {
  children: ReactNode;
}

export const BookLoading = ({ children }: BookLoadingProps) => {
  return (
    <div className="flex justify-center items-center h-screen text-gray-400 bg-[#0a0a0a]">
      {children}
    </div>
  );
};
