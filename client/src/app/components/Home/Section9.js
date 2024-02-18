"use client";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Section9() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <div className="relative w-full min-h-[100vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="">
          <Image
            src="/section9 (2).png"
            alt="Section2"
            width={500}
            height={500}
            style={{
              filter:
                "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>
        {/*  */}
        <div className="flex flex-col items-center justify-center gap-[2rem]">
          <div className="flex flex-col items-center gap-5  py-5 px-2 sm:px-4 rounded-md shadow-md bg-gray-100 dark:bg-gray-800">
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white text-center ">
              Streamline automation for optimal performance. Change this heading
              Build, measure, and improve. Optimize automation.
            </h1>
            <p className="text-center text-gray-800 dark:text-gray-200 text-[17px]">
              Leverage your customers' data to fuel exceptional, automated
              customer experiences. Gain instant insights to enhance automation,
              driving higher customer resolutions and satisfaction. Let
              data-driven CX speak volumes for your brand's excellence and
              efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
