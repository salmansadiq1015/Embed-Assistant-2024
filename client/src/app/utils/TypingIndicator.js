import React from "react";
import "./model.css";

export default function TypingIndicator() {
  return (
    <div className="flex items-center justify-end gap-2 ml-3">
      <div className="w-3 h-3 dark:bg-sky-500 bg-green-600 rounded-full  typing " />
      <div className="w-3 h-3 dark:bg-sky-500 bg-green-600 rounded-full typing " />
      <div className="w-3 h-3 dark:bg-sky-500 bg-green-600 rounded-full typing " />
    </div>
  );
}
