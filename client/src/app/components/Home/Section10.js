"use client";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import React from "react";

export default function Section10() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <div className="relative w-full min-h-[100vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      Section10
    </div>
  );
}
