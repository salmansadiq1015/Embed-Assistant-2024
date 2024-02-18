"use client";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Section7() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <div className="relative w-full min-h-[100vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center gap-[2rem]">
          <div className="flex flex-col items-center gap-5  py-5 px-2 sm:px-4 rounded-md shadow-md bg-gray-100 dark:bg-gray-800">
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white text-center ">
              Scale automation up and down instantly. Grow your business.
            </h1>
            <p className="text-center text-gray-800 dark:text-gray-200 text-[17px]">
              Effortlessly manage fluctuations in customer inquiries and demands
              with ChatDoc.ai's scalable automation platform. Elevate customer
              experience consistently, fostering loyalty with seamless support.
              Whether facing volume surges or seasonal spikes, ChatDoc.ai
              ensures exceptional CX at every touchpoint, empowering businesses
              to thrive amidst dynamic customer interactions.
            </p>
          </div>
        </div>
        <div className="">
          <Image
            src="/section9 (1).png"
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
