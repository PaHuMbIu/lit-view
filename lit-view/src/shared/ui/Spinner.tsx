import React from "react";
import { HashLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <div className="flex justify-center">
      <HashLoader size={50} color="#0019ff" />
    </div>
  );
};
