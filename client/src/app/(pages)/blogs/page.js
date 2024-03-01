"use client";
import PageLayout from "@/app/components/PageLayout";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import React from "react";
import { TbLoader3 } from "react-icons/tb";

export default function page() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <PageLayout>
      <div className=" w-full min-h-screen flex items-center justify-center flex-col gap-2">
        <h1 className="font-semibold text-3xl sm:text-4xl animate-pulse">
          Development Mode
        </h1>
        <TbLoader3
          className="h-10 w-10 animate-spin"
          style={{
            color:
              theme === "dark"
                ? !color
                  ? "white"
                  : color
                : !color
                ? "black"
                : color,
          }}
        />
      </div>
    </PageLayout>
  );
}
