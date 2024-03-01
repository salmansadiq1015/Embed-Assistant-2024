"use client";
import Layout from "@/app/components/Layout/Layout";
import { useAssistant } from "@/app/context/authContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TbLoader3 } from "react-icons/tb";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TypingIndicator from "@/app/utils/TypingIndicator";
import { CiMedicalClipboard } from "react-icons/ci";
import { BsClipboardCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import { IoShareSocialSharp } from "react-icons/io5";
import { useTheme } from "next-themes";

export default function Messages() {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const { assistant, color } = useAssistant();
  const threadId = assistant?.threadData?.threadId;
  const assistantId = assistant?.threadData?.id;
  const assisId = assistant?.threadData?._id;
  const [status, setStatus] = useState("N/A");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadMessages, setLoadMessages] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  //---------------------- Get Prev Messages
  useEffect(() => {
    setLoadMessages(true);
    getMessages();
    // eslint-disable-next-line
  }, [threadId, assistantId]);

  // -----------------------Handle Status
  useEffect(() => {
    if (status === "in_progress") {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 81) {
            clearInterval(interval);
            return 81;
          } else {
            return newProgress;
          }
        });
      }, 100);
      return () => clearInterval(interval);
    } else if (status === "completed") {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          } else {
            return newProgress;
          }
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  // --------------------Send Messages
  const handleMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/message/create-message`,
        { message, threadId, assistantId }
      );
      if (data?.success) {
        setMessages([...messages, data.threadMessage]);
        handleRun(data.run.id);
        getMessages();
        setMessage("");
        setSending(false);
      }
    } catch (error) {
      console.log(error);
      setSending(false);
    }
  };

  // ------------------------------Run
  const handleRun = async (runId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/message/run/${threadId}/${runId}`
      );
      const updatedRun = data.status;
      setStatus(updatedRun.status);
      let newMessages = data.messages;
      newMessages = newMessages.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      setMessages(newMessages);
      getMessages();
      setLoading(false);
      setStatus("N/A");
      setProgress(0);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // -------------------------------Get Messages
  const getMessages = async () => {
    if (!threadId) {
      return console.log("Thread Id is required!");
    }
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/message/message-list/${threadId}
      `
      );
      let newMessages = data.messages;
      newMessages = newMessages.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      setMessages(newMessages);
      setLoadMessages(false);
      setStatus("N/A");
      setProgress(0);
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------Scroll Effect
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // ----------------------Handle Copy Messages
  const handleCopyText = (message) => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      toast.success("Copied the clipboard", { duration: 2000 });
    }, 2000);
  };

  // Handle Share System

  const handleShareMessage = (message) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share Message",
          text: message,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <Layout>
      <div className=" relative h-full border rounded-none sm:rounded-md p-1 shadow-lg">
        <div className="relative flex flex-col gap-1 w-full h-full">
          {/* ------------------Messages---------------- */}
          {loadMessages ? (
            <div className="w-full h-full">
              <SkeletonTheme baseColor="#ccc" highlightColor="#777">
                <p>
                  <Skeleton
                    count={6}
                    height={60}
                    width="100%"
                    className="animate-pulse"
                  />
                </p>
              </SkeletonTheme>
            </div>
          ) : (
            <>
              <div
                className="relative w-full h-[92%] shadow-md rounded-md overflow-y-auto allMessages px-1 sm:px-2 pt-2 pb-3 scroll-smooth "
                id="message-container"
              >
                {messages.length === 0 && (
                  <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                    <Image
                      src="/empty.png"
                      alt="Empty"
                      height={80}
                      width={80}
                      className="w-[10rem] h-[10rem] sm:h-[14rem] sm:w-[14rem]"
                    />

                    <h3 className="text-lg font-semibold text-white text-center px-1">
                      No messages found! Let's chat and enlighten you! .
                    </h3>
                  </div>
                )}
                {messages.map((message) => (
                  <>
                    {message.role === "user" ? (
                      <span className="text-right flex items-center justify-end pr-1">
                        <div className=" relative w-[2rem] h-[2rem] bg-white rounded-full overflow-hidden cursor-pointer shadow-xl filter drop-shadow-lg border border-sky-500 ">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/assistant-logo/${assisId}`}
                            alt="log"
                            layout="fill"
                            objectFit="fill"
                          />
                        </div>
                      </span>
                    ) : (
                      <div className=" relative w-[2rem] h-[2rem] bg-white rounded-full overflow-hidden cursor-pointer shadow-xl filter drop-shadow-lg border  border-sky-500 ">
                        <Image
                          src="/ChatbotF.png"
                          alt="You"
                          layout="fill"
                          objectFit="fill"
                          className="rounded-full border border-gray-400 bg-white shadow-xl filter drop-shadow-lg "
                        />
                      </div>
                    )}
                    {/* Indicator */}

                    {/* ----------Messages---------> */}
                    <div
                      key={message.id}
                      className={`px-4 py-2 mb-3 max-w-[92%] sm:max-w-[80%] rounded-2xl mt-1 shadow-lg filter drop-shadow-lg text-white w-fit text-sm ${
                        message.role === "user"
                          ? " bg-green-600 dark:bg-sky-600 ml-auto text-right rounded-tr-none mr-3"
                          : " bg-gray-500 rounded-tl-none ml-3 overflow-x-auto message"
                      }`}
                      style={{
                        background:
                          message.role === "user" &&
                          (theme === "dark"
                            ? color
                              ? color
                              : "#4facfe"
                            : color
                            ? color
                            : "#047857"),
                      }}
                    >
                      <Markdown
                        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                        className="w-fit"
                      >
                        {message?.content[0]?.type === "text"
                          ? message?.content[0]?.text?.value
                          : null}
                      </Markdown>

                      {/* Copy and Share Messages */}
                      {message?.content[0]?.text?.value && (
                        <div
                          className={`flex items-center justify-end w-full mt-1 ${
                            message.role === "user" ? "hidden" : ""
                          }`}
                        >
                          <div
                            onClick={() =>
                              handleCopyText(
                                message.content[0].type === "text" &&
                                  message.content[0].text.value
                              )
                            }
                            className={`
                              " mr-1 text-white focus:outline-none p-1 cursor-pointer rounded-md shadow-md hover:bg-zinc-300/70 flex items-center justify-center  ${
                                isCopied && "opacity-70 cursor-not-allowed"
                              } "
                              
                           `}
                          >
                            {isCopied ? (
                              <BsClipboardCheck className="h-4 sm:h-5 w-4 sm:w-5" />
                            ) : (
                              <CiMedicalClipboard className="h-4 sm:h-5 w-4 sm:w-5" />
                            )}
                          </div>
                          <div
                            onClick={() =>
                              handleShareMessage(message.content[0].text.value)
                            }
                            className={`
                              "ml-2 text-white focus:outline-none p-1 cursor-pointer rounded-md shadow-md hover:bg-zinc-300/70 flex items-center justify-center  ",
                           `}
                          >
                            <IoShareSocialSharp className="h-4 sm:h-5 w-4 sm:w-5" />
                          </div>
                        </div>
                      )}
                      {/* ----End-------- */}
                    </div>
                  </>
                ))}
                {loading && (
                  <div
                    className=" sticky
                   bottom-0 left-2 flex items-end gap-[2px] justify-start z-[9999]"
                  >
                    <span className="">
                      <TypingIndicator />
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
          {/* Input */}

          <form onSubmit={handleMessage}>
            <div className="w-full sticky bottom-0 left-0 flex items-center gap-1 h-[2.9rem] sm:h-[3rem] border border-gray-400 dark:border-gray-200  rounded-md p-[.2rem] bg-black/20">
              <input
                type="search"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-[94%] bg-white dark:bg-gray-800  border border-gray-400 dark:border-gray-200 rounded-md outline-none py-1 px-3 h-full text-[1rem] "
              />
              <button
                disabled={message.length === 0 || sending || loading}
                className={` bg-green-600 dark:bg-sky-600  w-[3.5rem] h-full flex items-center justify-center rounded-md ${
                  sending && "pointer-events-none animate-pulse"
                } `}
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
                {sending ? (
                  <TbLoader3 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <IoSend size={25} color="white" className="" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
