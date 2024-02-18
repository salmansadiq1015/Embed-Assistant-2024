"use client";
import Layout from "@/app/components/Layout/Layout";
import UserHistory from "@/app/components/user/(sidebar_pages)/UserHistory";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function History() {
  const [messages, setMessages] = useState([]);
  const { assistant, color } = useAssistant();
  const threadId = assistant?.threadData?.threadId;
  const [loading, setLoading] = useState(false);
  console.log(messages, threadId);
  const { theme } = useTheme();

  // Get User Messages

  const getMessages = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (threadId) {
      getMessages();
    }
  }, [threadId]);
  return (
    <Layout>
      <>
        {loading ? (
          <div className="my-8">
            <Loader />
          </div>
        ) : (
          <div
            className="h-full message scroll-smooth py-[1.2rem] sm:py-[1rem] px-2 overflow-y-auto"
            style={{ borderLeft: "1px solid #999" }}
          >
            <div className="flex flex-col gap-4">
              <h2
                className="text-3xl sm:text-4xl text-sky-600 dark:text-fuchsia-600 font-bold"
                onClick={getMessages}
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
                Explore Your Journey
              </h2>
              <p className=" text-gray-700 dark:text-gray-200 w-[95%] sm:w-[80%] text-justify ">
                {" "}
                Effortlessly view and export the highlights of the engaging
                conversations that have taken place between your bot and the
                visitors to your website.
              </p>
              <div className="w-full h-[1px] bg-slate-300 mt-6"></div>
            </div>
            {messages.length !== 0 ? (
              <div className=" py-[.5rem] p-2 rounded-md shadow-lg  mt-4">
                <UserHistory messages={messages} />
              </div>
            ) : (
              <div className="w-full min-h-[50vh] flex flex-col gap-2  items-center justify-center">
                <Image
                  src="/empty.png"
                  alt="Empty"
                  height={80}
                  width={80}
                  className="w-[10rem] h-[10rem] sm:h-[14rem] sm:w-[14rem]"
                />
                <div className="flex flex-col gap-3 w-[95%] sm:w-[80%] md:w-[60%] ">
                  <p className="text-zinc-900 dark:text-white text-center text-xl font-medium">
                    We couldn&apos;t find any history for your account yet, but
                    don&apos;t worry! Your journey is just beginning.
                  </p>
                  <p className="text-zinc-600 text-center dark:text-gray-200  ">
                    Start exploring and interacting with our platform to create
                    your unique history. Whether it&apos;s discovering new
                    content, making connections, or achieving milestones, every
                    moment contributes to your story.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </Layout>
  );
}
