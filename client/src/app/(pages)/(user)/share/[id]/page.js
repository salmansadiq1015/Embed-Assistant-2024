"use client";
import Layout from "@/app/components/Layout/Layout";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

export default function Share({ params }) {
  const assistantId = params.id;
  const [isCopied, setIsCopied] = useState(false);
  const [iframeCopy, setIframeCopy] = useState(false);
  const { theme } = useTheme();
  const { color } = useAssistant();

  const handleCopyText = () => {
    const textToCopy = `http://localhost:3000/assistant/${assistantId}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      toast.success("Copied the clipboard", { duration: 3000 });
    }, 2000);
  };

  const handleCopyIframe = () => {
    const textToCopy = `<iframe style="width: 400px; height: 520px;  border-radius: .5rem;" src="http://localhost:3000/assistant/${assistantId}"></iframe>`;
    navigator.clipboard.writeText(textToCopy);
    setIframeCopy(true);
    setTimeout(() => {
      setIframeCopy(false);
      toast.success("Copied the clipboard", {
        position: "top-center",
        theme: "dark",
      });
    }, 2000);
  };
  return (
    <Layout>
      <div className="w-full min-h-[75vh] py-12 lg:py-5 px-2 sm:px-4">
        <div className="flex flex-col gap-3">
          <h2
            className="text-3xl sm:text-4xl font-semibold "
            style={{
              color:
                theme === "dark"
                  ? color
                    ? color
                    : "#4facfe"
                  : color
                  ? color
                  : "#047857",
              textShadow: "-.3px 1px 0px #ccc",
            }}
          >
            Deploy / Share
          </h2>
          <p className="text-sm ">
            View instructions for deploying your chatbot on your websites.
          </p>
        </div>
        <div className="w-full bg-zinc-100/10 border shadow-md hover:shadow-xl border-zinc-200 py-4 px-2 rounded-lg cursor-pointer mt-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-medium ">Share your bot</h3>
            <p className="text-sm  ">
              You can share your bot with anyone by sending them the link below.
            </p>
            <div
              className="w-full bg-zinc-100/10 border flex items-center justify-between shadow-md
           hover:shadow-xl border-zinc-200 py-3 px-3 mt-2"
            >
              <p className="text-sm font-normal sm:text-base sm:font-medium  ">
                http://localhost:3000/assistant/{assistantId}
              </p>
              <div
                onClick={handleCopyText}
                className={` ml-2 bg-sky-500 hover:bg-sky-600  px-2 py-1 shadow-md shadow-gray-500/70 rounded focus:outline-none w-[2rem] cursor-pointer ${
                  isCopied && "opacity-70 cursor-not-allowed"
                }
                `}
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
                <FaCopy className="text-white" />
              </div>
            </div>
          </div>
        </div>
        {/* ----I Frame---- */}

        <div
          className="w-full bg-zinc-100/10 border shadow-md hover:shadow-xl
       border-zinc-200 py-4 px-2 rounded-lg cursor-pointer mt-8"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-medium ">Using Iframe</h3>
            <p className="text-sm  text-zinc-500">
              If you wish to embed the chat window directly into your website
              you can use the iframe snippet shown below.
            </p>
            <div
              className="w-full bg-zinc-100/10 border flex items-center justify-between shadow-md 
          hover:shadow-xl border-zinc-200 py-3 px-3 mt-2"
            >
              <p
                className="text-sm font-normal sm:text-base sm:font-medium text-sky-600 dark:text-white"
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
                &lt;<span className="text-pink-600">iframe</span>{" "}
                style=&quot;width: 400px; height: 600px;&quot; src=
                {`"http://localhost:3000/assistant/${assistantId}"`}
                &gt;&lt;<span className="text-pink-600">/iframe</span>&gt;
              </p>
              <div
                onClick={handleCopyIframe}
                className={` ml-2 bg-sky-500 hover:bg-sky-600 px-2 py-1 shadow-md shadow-gray-500/70 rounded focus:outline-none w-[2rem] cursor-pointer ${
                  iframeCopy && "opacity-70 cursor-not-allowed"
                }
                `}
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
                <FaCopy className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
