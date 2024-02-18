"use client";
import { useAssistant, useAuth } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";

export default function Section5({ setOpen }) {
  const { theme } = useTheme();
  const { color } = useAssistant();
  const { auth } = useAuth();
  const router = useRouter();
  return (
    <div className="relative w-full min-h-[70vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      <div
        className=" w-full min-h-[70vh] bg-gray-200 dark:bg-gray-800 mt-[4rem] sm:mt-[6rem] rounded-md shadow-xl flex 
      flex-col items-center justify-center z-30 "
        style={{
          filter:
            " contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="section3-content w-full flex flex-col items-center justify-center gap-4">
          <h3
            className="text-lg font-semibold "
            style={{
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
            SEEING IS BELIEVING
          </h3>
          <h1
            className="text-3xl sm:text-5xl text-center px-[.5rem] md:px-[3.5rem] font-semibold
           text-zinc-950-700 line-"
            style={{
              lineHeight: "3.8rem",
              textShadow: "-1px 1px 0px #000",
            }}
          >
            Elevate Your Daily Routine with Our Dynamic Chatbot Integration.
          </h1>

          <button
            className="homebtn flex py-2 rounded-md px-4 text-black dark:text-white hover:text-white transition-all duration-150 flex-col gap-1 h-[5rem] font-semibold text-xl mt-[1rem] overflow-hidden"
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
              boxShadow: ".2rem .2rem .3rem rgba(0,0,0,.3)",
            }}
            onClick={() => {
              !auth?.token ? setOpen(true) : router.push("/dashboard");
            }}
          >
            <span className="z-40">Chat Your First Document</span>
            <span className="uppercase font-normal text-lg z-40">
              {" "}
              NO credit card required
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
