"use client";
import "./../../home.css";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Section3() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <div className="relative w-full min-h-[80vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      <div className="section2-content flex flex-col items-center justify-center gap-4">
        <h1
          className="text-center font-bold text-black dark:text-white text-3xl px-[.5rem] sm:px-[3rem] sm:text-6xl"
          style={{ textShadow: "-1px 1px 0px #999" }}
        >
          Begin your chat session within minutes.
        </h1>
        <p className="px-[.5rem] md:px-[6rem] text-center text-zinc-500 dark:text-gray-200  ">
          Interacting with your PDF, SVG, TXT documents has never been this
          simple, thanks to ChatDoc. Our user-friendly interface ensures quick
          and efficient communication with your PDF, SVG, TXT files.
        </p>

        <div className="chat-steps mt-[2rem] px-0 w-full">
          <div className="chat-step flex flex-col gap-4 items-center">
            <div className="step-image">
              <Image
                src="/step1.webp"
                alt="step1"
                width="480"
                height="300"
                className="p-[.5rem] hover:scale-105 transition-all"
                style={{
                  filter:
                    "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
            <h2 className="text-3xl text-zinc-900 dark:text-white  font-bold mt-2">
              Register for an account
            </h2>
            <h1
              className="text-4xl font-extrabold "
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
              01
            </h1>
            <p className="text-center text-zinc-500 dark:text-gray-200 font-normal ">
              Register for your account now to access our platform&apos;s full
              range of features and benefits.
            </p>
          </div>

          {/* Step 2 */}
          <div className="chat-step flex flex-col gap-4 items-center">
            <div className="step-image2">
              <Image
                src="/step2.webp"
                alt="step2"
                width="500"
                height="320"
                className="p-[.5rem] hover:scale-105 transition-all"
                style={{
                  filter:
                    "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
            <h2 className="text-3xl text-zinc-900 dark:text-white  font-bold mt-2">
              Upload your documents
            </h2>
            <h1
              className="text-4xl  font-extrabold "
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
              02
            </h1>

            <p className="text-center text-zinc-500 dark:text-gray-200 font-normal ">
              Add any TXT Files, PDF files & CSV Files securely into your
              ChatDoc in minutes.
            </p>
          </div>
          {/* Step 3 */}
          <div className="chat-step chat-step flex flex-col gap-4 items-center">
            <div className="step-image3">
              <Image
                src="/step3.webp"
                alt="step3"
                width="500"
                height="320"
                className="p-[.5rem] hover:scale-105 transition-all"
                style={{
                  filter:
                    "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
            <h2 className="text-3xl text-zinc-900 dark:text-white  font-bold mt-2">
              Initiate your queries.
            </h2>
            <h1
              className="text-4xl  font-extrabold "
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
              03
            </h1>

            <p className="text-center text-zinc-500 dark:text-gray-200 font-normal ">
              Experience sheer simplicity! Discover the lightning-fast ChatDoc
              today; it&apos;s a matter of mere seconds to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
