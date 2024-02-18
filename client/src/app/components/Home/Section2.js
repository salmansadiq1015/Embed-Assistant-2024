"use client";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Section2() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <div className="w-full min-h-[80vh] px-2 sm:px-6 mt-[3.5rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-[2rem]">
          <h1 className="text-3xl sm:text-5xl font-bold text-black dark:text-white">
            A full customer service team, powered by AI
          </h1>
          <p className="text-justify text-gray-800 dark:text-gray-200 text-[17px]">
            Don't settle for a basic chatbot - your customers deserve better.
            Elevate their experience with a fully stocked, AI-powered customer
            service automation platform. Say goodbye to mundane inquiries and
            hello to streamlined efficiency. Our platform resolves more issues
            with less effort, ensuring your customers receive the support they
            deserve. Upgrade to the future of customer service today.
          </p>
          <div className="flex items-center justify-end px-4 sm:px-8">
            <button
              className="border-2  rounded-md cursor-pointer shadow-md shadow-gray-300/15 dark:shadow-gray-800 hover:scale-[1.01] active:scale-[1] hover:shadow-xl px-[1rem] py-2 "
              style={{
                border: `2px solid ${
                  theme === "dark"
                    ? color
                      ? color
                      : "#4facfe"
                    : color
                    ? color
                    : "#047857"
                }`,
                color:
                  theme === "dark"
                    ? color
                      ? color
                      : "#4facfe"
                    : color
                    ? color
                    : "#047857",
              }}
            >
              Learn more
            </button>
          </div>
        </div>
        <div className="">
          <Image
            src="/home11.png"
            alt="Section2"
            width={500}
            height={500}
            style={{
              filter:
                "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
