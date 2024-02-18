"use client";
import { useAssistant, useAuth } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

export default function Section1({ setOpen }) {
  const router = useRouter();
  const [auth] = useAuth();
  const { color } = useAssistant();
  const { theme } = useTheme();

  return (
    <div className="relative w-full min-h-[88vh] py-3 px-2 sm:px-6 ">
      <div className=" relative w-full h-full grid grid-cols-1 sm:grid-cols-2">
        <div className="w-full h-full min-h-[50vh] sm:min-h-[88vh]  ">
          <div
            className="relative w-[100%] h-[100%] flex items-center justify-center object-fill mt-0 sm:mt-8 filter drop-shadow-md"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              objectFit: "fill",
              filter:
                "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Image
              src="/home2.png"
              alt="Section1"
              layout="fill"
              objectFit="fill"
            />
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center gap-5 w-full min-h-[44vh] sm:min-h-[88vh] ">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl text-center font-semibold dark:text-[#fff]`}
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
            AI Powered Chatbots Trained On Your Data
          </h1>
          <p className="text-lg sm:xl text-center font-normal mt-3">
            Create a fully automated AI chatbot like ChatGPT to help you or your
            customers get fast answers about your business with zero coding.
            Link Chatdoc.ai chatbot to your website & Connect with your chat AI
            companion and chat with Docs , PDFs, CSV, PPTX & many more <br />
            Locate, Extract and Summarize info from your documents with this
            ChatGPT based document AI chatbot and accelerate your document
            experience.
          </p>
          <div className=" flex items-center justify-center mt-4">
            <button
              onClick={() => {
                !auth?.token ? setOpen(true) : router.push("/dashboard");
              }}
              className="btn1 font-semibold flex items-center gap-2 py-[.4rem] px-4 rounded-3xl active:shadow-sm "
              style={{
                background:
                  theme === "dark"
                    ? color
                      ? color
                      : "#4facfe"
                    : color
                    ? color
                    : "#047857",
              }}
            >
              {auth.token ? (
                <>
                  Try Now
                  <MdArrowOutward size={20} />
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
