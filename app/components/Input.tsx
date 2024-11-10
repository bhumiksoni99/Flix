import React, { RefObject } from "react";

interface InputProps {
  ref: RefObject<HTMLInputElement>;
  type: string;
  label: string;
}

export default function Input({ ref, type, label }: InputProps) {
  return (
    <div className="relative flex flex-col">
      <input
        placeholder=""
        autoComplete={"off"}
        id={label}
        type={type}
        ref={ref}
        className="h-12 px-4 pt-2 bg-gray-400 bg-opacity-40 text-white rounded-md peer focus:mt-1 focus:outline-0"
      />
      <label
        htmlFor={label}
        className="absolute text-gray-400 scale-75 text-md px-4 py-3 duration-200 peer-focus:top-1 peer-focus:-translate-y-3 -translate-y-3  peer-focus:scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 "
      >
        {label}
      </label>
    </div>
  );
}
