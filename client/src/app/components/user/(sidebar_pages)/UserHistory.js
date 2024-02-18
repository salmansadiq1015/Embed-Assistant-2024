"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";
import { formatDistanceToNow } from "date-fns";
import { TbFileDownload } from "react-icons/tb";
import "jspdf-autotable";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAssistant } from "@/app/context/authContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function UserHistory({ messages }) {
  const [lastMessage, setLastMessage] = useState(messages[0]);
  const { assistant, color } = useAssistant();
  const router = useRouter();
  const { theme } = useTheme();

  const downloadAsPDF = async (messages) => {
    console.log(messages);
    if (!messages) {
      toast.error("No messages to download!");
    }

    const pdf = new jsPDF();

    pdf.autoTable({
      head: [["Text", "Created At"]],
      body: messages.map((message) => [
        message.content[0].text.value,
        formatDistanceToNow(new Date(message.created_at * 1000)),
      ]),
    });

    pdf.save(`chat_history_.pdf`);
  };

  //   Time Format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="w-full py-2 px-2">
      <table
        className="w-full border-2 hidden sm:table "
        cellPadding={4}
        cellSpacing={4}
      >
        <thead className="">
          <tr className="">
            <th className="border-2 ">Avatar</th>
            <th className="border-2">Created_At</th>
            <th className="border-2">Last Message</th>
            <th className="border-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className=" flex items-center justify-center    ">
              <div className="relative w-[2.5rem] ml-1 h-[2.5rem] rounded-full overflow-hidden cursor-pointer shadow-lg border border-fuchsia-500 ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/assistant-logo/${assistant?.threadData?._id}`}
                  alt="log"
                  layout="fill"
                  objectFit="fill"
                />
              </div>
            </td>
            <td className="border-2 text-center ">
              {formatDistanceToNow(new Date(lastMessage.created_at * 1000))}
            </td>
            <td className="border-2 px-2">
              {lastMessage.content[0].text.value.slice(0, 30)}
              {lastMessage.content[0].text.value.length > 30 && "..."}
            </td>
            <td className="border-2 ">
              <div className="flex items-center justify-around border-none ">
                <button
                  className="p-1 rounded-md cursor-pointer hover:border box shadow-md hover:bg-gray-500/30 transition-all duration-150 dark:hover:text-fuchsia-600 hover:text-sky-500"
                  onClick={() =>
                    router.push(`/chats/${assistant?.threadData?.id}`)
                  }
                >
                  <FaEye className="h-5 w-5  " />
                </button>

                <button
                  onClick={() => downloadAsPDF(messages)}
                  className="p-1 rounded-md cursor-pointer hover:border shadow-md box hover:bg-gray-500/30 transition-all duration-150 dark:hover:text-fuchsia-600 hover:text-sky-500"
                >
                  <TbFileDownload
                    className="h-6 w-6 dark:text-fuchsia-600  text-sky-500 "
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
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* ----------------Mobile Format--------------- */}
      <div className=" sm:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="py-4 flex flex-col gap-3 px-3 rounded-md box cursor-pointer border-2 border-sky-600 dark:border-fuchsia-600 ">
          <div className="flex items-center justify-between">
            <span className="rounded-3xl py-1 px-2 border border-green-500 cursor-pointer shadow-md text-xs">
              {formatTimestamp(lastMessage?.created_at)}
            </span>
            <div className="flex items-center justify-around border-none ">
              <button
                className="p-1 rounded-md cursor-pointer hover:border box shadow-md hover:bg-gray-500/30 transition-all duration-150 dark:hover:text-fuchsia-600 hover:text-sky-500"
                onClick={() =>
                  router.push(`/chats/${assistant?.threadData?.id}`)
                }
              >
                <FaEye className="h-6 w-6  " />
              </button>

              <button
                onClick={() => downloadAsPDF(messages)}
                className="p-1 rounded-md cursor-pointer hover:border shadow-md box hover:bg-gray-500/30 transition-all duration-150 dark:hover:text-fuchsia-600 hover:text-sky-500"
              >
                <TbFileDownload className="h-6 w-6 dark:text-fuchsia-600  text-sky-500 " />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="relative w-[4rem] h-[4rem] rounded-full overflow-hidden cursor-pointer shadow-lg border border-fuchsia-500 ">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/assistant-logo/${assistant?.threadData?._id}`}
                alt="log"
                layout="fill"
                objectFit="fill"
              />
            </div>
            <p className="text-sm text-center">
              {lastMessage.content[0].text.value.slice(0, 60)}
              {lastMessage.content[0].text.value.length > 30 && "..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
