"use client";

import "./embed.css";
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
import UserInfoForm from "@/app/components/UserInfoForm";
import { useAssistant } from "@/app/context/authContext";

export default function EmbedAssistant({ params }) {
  const id = params.id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("N/A");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadMessages, setLoadMessages] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [assistant, setAssistant] = useState();
  const assistantId = assistant?.assistantId;
  const [thread, setThread] = useState();
  const threadId = thread?.id;
  const [botData, setBotData] = useState();
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isShow, setIsShow] = useState(true);

  // Update Questions
  useEffect(() => {
    if (botData && botData.questions) {
      setQuestions(botData.questions);
    }
  }, [botData]);

  //   Get Assistant & Thread Id form DB
  const threads = async () => {
    if (!id) {
      return toast.error("Assistant id not found!");
    }
    try {
      setLoadMessages(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/thread/get-thread/${id}`
      );
      if (data) {
        setAssistant(data?.thread);
        setLoadMessages(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create Thread
  const createThread = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/message/create-thread`
      );
      setThread(data);
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------- Get Prev Messages
  useEffect(() => {
    setLoadMessages(true);
    // getMessages();
    threads();
    // Get threadId
    createThread();

    // Get Messages;
    getMessages();

    // eslint-disable-next-line
  }, [id]);

  // -----------------------Handle Status
  useEffect(() => {
    if (status === "in_progress") {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10;
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
          const newProgress = prevProgress + 10;
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
    if (!threadId || !assistantId) {
      return (
        toast.error("Thread Id or Assistant Id is missing!") && setSending(true)
      );
    }

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
      setLoading(false);
      setStatus("N/A");
      setProgress(0);
      setMessages(newMessages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // -------------------------------Get Messages
  const getMessages = async () => {
    if (!threadId) {
      return toast.error("No thread_Id found!");
    }
    try {
      const defaultGreeting = {
        id: 0,
        text: `${
          botData?.message ||
          "Hey, I'm your assistant today. How can I help you?"
        }`,
        created_at: new Date().toISOString(),
      };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/message/assistant-messages/${threadId}
        `
      );
      let newMessages = data.messages;
      newMessages = newMessages.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      newMessages.unshift(defaultGreeting);
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

  // ----------------------Assistant Settings----------->

  const getBot = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/get-bot/${id}`
      );
      if (data) {
        setBotData(data?.bot);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBot();
    // eslint-disable-next-line
  }, [id]);

  // Color
  const dynamicStyles = (role) => {
    return {
      backgroundColor: role === "user" ? `${botData?.color}` : `#888`,
    };
  };

  // Handle Question
  const handleQuestionClick = (clickedQuestion) => {
    setMessage(clickedQuestion);
    const updatedQuestions = questions.filter(
      (question) => question !== clickedQuestion
    );
    setQuestions(updatedQuestions);
    setIndex(index + 1);
  };

  return (
    <>
      {!botData?.published ? (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-white ">
          <div className="flex flex-col gap-3">
            <Image src="/empty.png" alt="NotFound" width={300} height={300} />
            <h1 className="text-2xl sm:text-3xl text-black font-bold text-center">
              Assistant not Published 404{" "}
            </h1>
          </div>
        </div>
      ) : (
        <div
          className="relative h-full border-[3px] shadow-lg rounded-sm message message"
          style={{
            border: botData
              ? `4px solid ${botData?.color}`
              : "2px solid fuchsia",
            background: botData ? `${botData?.color}` : "fuchsia",
            WebkitScrollbar: "none",
          }}
        >
          <div
            className={`sticky top-0 left-0 w-full h-[3.5rem] pt-4 text-white  px-3 sm:px-4 flex items-center `}
            style={{ background: botData ? `${botData?.color}` : "fuchsia" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className={`relative w-[2.9rem] sm:w-[3.2rem] h-[2.9rem] sm:h-[3.2rem] shadow-md shadow-gray-500/25 bg-white filter drop-shadow-md rounded-full border overflow-hidden border-fuchsia-500`}
                style={{
                  border: botData
                    ? `2px solid ${botData?.color}`
                    : "2px solid fuchsia",
                }}
              >
                <Image
                  src={
                    botData
                      ? `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/bot-avatar/${assistantId}`
                      : "/ChatbotF.png"
                  }
                  alt=""
                  fill
                  objectFit="fill"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1
                  className="text-2xl  sm:text-3xl font-[700] filter drop-shadow-md shadow-gray-800/40"
                  style={{
                    textShadow: "-.4px 1px 0px #888",
                    // fontFamily: "Libre Baskerville",
                  }}
                >
                  {botData?.botName}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col gap-1 w-full h-full ">
            {/* ---------------------ProgressBar--------------------- */}
            {/* <div className=" mt-[0rem] w-full fixed top-[3.89rem] left-0 px-1 z-[99] ">
              <div
                className="w-full flex items-center gap-1 relative h-[.2rem] overflow-hidden  rounded-xl"
                style={{
                  background: botData ? `${botData?.color}` : "fuchsia",
                }}
              >
                <div
                  style={{ width: `${progress}%` }}
                  className={`h-[100%] rounded-xl  bg-green-500    `}
                />{" "}
              </div>
              <div className="flex items-center">
                <div style={{ width: `${progress}%` }}></div>
                <span
              className={`font-semibold text-[.4rem]`}
              style={{ color: botData ? `${botData?.color}` : "fuchsia" }}
            >
              {progress}
            </span>
              </div>
            </div> */}
            {/* ------------------Messages---------------- */}
            {loadMessages ? (
              <div className="w-full h-full ">
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
                  className="relative px-2 bg-white w-full h-[calc(100vh-7.5rem)] mb-[3.2rem] shadow-md rounded-lg overflow-y-auto message  "
                  id="message-container"
                >
                  {/* questions */}
                  <div className="fixed bottom-[3.5rem] left-[.5rem] flex flex-col gap-1 z-[99] py-3">
                    {questions?.map((question, index) => (
                      <div
                        key={index}
                        className="w-fit py-1 px-2 text-[10px] text-white sm:text-[12px] animate-bounce hover:animate-none rounded-md hover:shadow-gray-500 hover:scale-[1.02] active:scale-[1]  shadow-md cursor-pointer "
                        style={{
                          background: botData ? `${botData?.color}` : "fuchsia",
                        }}
                        onClick={() => handleQuestionClick(question)}
                      >
                        {question}
                      </div>
                    ))}
                  </div>
                  {/*  */}
                  {messages.length === 0 && (
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                      <video
                        src="/empty.mp4"
                        loop
                        muted
                        autoPlay
                        height={400}
                        width={300}
                      />
                    </div>
                  )}
                  {messages.map((message) => (
                    <>
                      {message.role === "user" ? (
                        <span className="text-right flex items-center justify-end pr-1 mt-2 ">
                          <div className=" relative w-[1.9rem] h-[1.9rem] bg-gray-200 rounded-full overflow-hidden cursor-pointer shadow-xl filter drop-shadow-lg border dark:border-fuchsia-600 border-sky-600 ">
                            <Image
                              src={
                                botData
                                  ? `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/user-avatar/${assistantId}`
                                  : "/user1.webp"
                              }
                              alt="log"
                              layout="fill"
                              objectFit="fill"
                            />
                          </div>
                        </span>
                      ) : (
                        <Image
                          src={
                            botData
                              ? `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/bot-avatar/${assistantId}`
                              : "/ChatbotF.png"
                          }
                          alt="You"
                          width={32}
                          height={32}
                          className="rounded-full border border-gray-400 bg-white shadow-xl filter drop-shadow-lg "
                          style={{ width: "30px", height: "30px" }}
                        />
                      )}
                      {/* Indicator */}

                      {/* ----------Messages---------> */}
                      <div
                        key={message.id}
                        className={`px-4 py-2 mb-3 max-w-[92%] sm:max-w-[80%] message rounded-2xl mt-1 shadow-lg filter drop-shadow-lg text-white w-fit text-sm ${
                          message.role === "user"
                            ? " bg-sky-600 dark:bg-fuchsia-600 ml-auto text-right rounded-tr-none mr-3"
                            : " bg-gray-500 rounded-tl-none ml-3 overflow-x-auto message"
                        }`}
                        style={dynamicStyles(message.role)}
                      >
                        <Markdown
                          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                          className="w-fit"
                        >
                          {message.content &&
                          message.content.length > 0 &&
                          message.content[0].type === "text"
                            ? message.content[0].text.value
                            : null}
                        </Markdown>
                        {/* Greeting Message */}
                        <Markdown
                          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                          className="w-fit"
                        >
                          {message.text || null}
                        </Markdown>

                        {/* Copy and Share Messages */}
                        {message.content &&
                          message.content.length > 0 &&
                          message.content[0].text.value && (
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
                                  handleShareMessage(
                                    message.content[0].text.value
                                  )
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
                  bottom-1 left-2 flex items-end gap-[2px] justify-start z-[9999]"
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

            <form
              onSubmit={handleMessage}
              className="fixed bottom-2 left-0 w-full px-1 z-50"
            >
              <div className="w-full sticky bottom-0 left-0 flex items-center gap-1 h-[2.9rem] sm:h-[3rem] border border-gray-400 dark:border-gray-200  rounded-md p-[.2rem] bg-black/20">
                <input
                  type="search"
                  placeholder="Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-[94%] bg-whit bg-zinc-100 text-black  border border-gray-400 dark:border-gray-200 rounded-md outline-none py-1 px-3 h-full text-[1rem] "
                />
                <button
                  disabled={message.length === 0 || sending}
                  className={` dark:bg-fuchsia-600 bg-sky-600  w-[3.5rem] h-full flex items-center justify-center rounded-md ${
                    sending && "pointer-events-none animate-pulse"
                  } `}
                  style={{
                    background: botData ? `${botData?.color}` : "fuchsia",
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

          {/* ---------Getting User Info------ */}
          {botData?.show && (
            <>
              {isShow && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col  w-[17rem] sm:w-[25rem] rounded-md shadow-md shadow-gray-300 filter drop-shadow-md z-[99] bg-gray-200/80 border border-gray-300  ">
                  <UserInfoForm
                    assistantId={assistantId}
                    setShow={setIsShow}
                    color={botData?.color}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
