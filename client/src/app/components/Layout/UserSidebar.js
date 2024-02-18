"use client";
import Link from "next/link";
import { useAssistant } from "../../context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdViewQuilt } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { PiFilesBold } from "react-icons/pi";
import { GoGear } from "react-icons/go";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiShareNetworkDuotone } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function UserSidebar() {
  const router = useRouter();
  const { assistant, color } = useAssistant();
  const assistantId = assistant?.threadData?.id;
  const [active, setActive] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const fileIdFromPath = pathArray[1];
    setActive(fileIdFromPath);

    // exlint-disable-next-line
  }, []);
  return (
    <div className="w-full h-full py-4 pr-1">
      <div className="flex flex-col gap-4 w-full h-full overflow-y-auto">
        <div className="">
          <button
            className={`flex w-full relative items-center justify-start  gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] ${
              active === "Dashboard"
                ? "sidebtn hover:bg-sky-600 text-white "
                : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            }`}
            onClick={() => {
              router.push(`/dashboard`);
              setActive("Dashboard");
            }}
            style={{
              background:
                active === "Dashboard" &&
                `${
                  theme === "dark"
                    ? color
                      ? color
                      : "#4facfe"
                    : color
                    ? color
                    : "#047857"
                }`,
            }}
            title="Click & Go back to Dashboard"
          >
            <IoArrowBackOutline className="h-5 w-5 cursor-pointer" />
            Dashboard
          </button>
        </div>
        <hr className="w-full h-[2px] dark:bg-gray-200 bg-gray-300 mt-2" />
        <div className="flex w-full h-[24rem] overflow-hidden message ">
          <ul className="flex w-full flex-col gap-4 overflow-y-auto py-2 allMessages message ">
            <li className="relative w-[100%] ">
              <Link
                href={`/chats/${assistantId}`}
                onClick={() => {
                  // setActive("chats");
                  router.push(`/chats/${assistantId}`);
                }}
                className={`flex items-center justify-start  gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] ${
                  active === "chats"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "chats" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to Chat Overview"
              >
                <MdViewQuilt className="h-7 w-7" />
                Overview
              </Link>
            </li>
            <li className="relative w-[100%] ">
              <Link
                href={`/history/${assistantId}`}
                onClick={() => {
                  router.push(`/history/${assistantId}`);
                  // setActive("history");
                }}
                className={`flex items-center justify-start   gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] font-Poppins ${
                  active === "history"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "history" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to Chat History"
              >
                <RiHistoryLine className="h-6 w-6" /> Chat History
              </Link>
            </li>
            <li className="relative w-[100%] ">
              <Link
                href={`/leads/${assistantId}`}
                onClick={() => {
                  router.push(`/leads/${assistantId}`);
                  // setActive("leads");
                }}
                className={`flex items-center justify-start   gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] font-Poppins ${
                  active === "leads"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "leads" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to Lead Users Overview"
              >
                <FaUsers className="h-6 w-6" /> Leads
              </Link>
            </li>
            {/*  */}

            <div className=" px-1 flex items-center gap-1">
              <hr className="w-[5rem] h-[1px] dark:bg-gray-200 bg-gray-300 mt-1" />
              <span className="text-[16px] text-center w-full font-semibold ">
                Data Source
              </span>
              <hr className="w-[5rem] h-[1px] dark:bg-gray-200 bg-gray-300 mt-1" />
            </div>
            {/*  */}
            <li className="relative w-[100%] ">
              <Link
                href={`/files/${assistantId}`}
                onClick={() => {
                  router.push(`/files/${assistantId}`);
                  // setActive("files");
                }}
                className={`flex items-center justify-start  gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] font-Poppins ${
                  active === "files"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "files" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to Upload Files Page"
              >
                <PiFilesBold className="h-6 w-6" /> Knowledge Base
              </Link>
            </li>

            <div className=" px-1 flex items-center gap-1">
              <hr className="w-[5rem] h-[1px] dark:bg-gray-200 bg-gray-300 mt-1" />
              <span className="text-[16px] text-center font-semibold ">
                Deployment
              </span>
              <hr className="w-[5rem] h-[1px] dark:bg-gray-200 bg-gray-300 mt-1" />
            </div>
            {/*  */}
            <li className="relative w-[100%] ">
              <Link
                href={`/appearance/${assistantId}`}
                onClick={() => {
                  router.push(`/appearance/${assistantId}`);
                  // setActive("appearance");
                }}
                className={`flex items-center justify-start  gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] font-Poppins ${
                  active === "appearance"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "appearance" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to assistant appearance settings"
              >
                <IoColorPaletteOutline className="h-6 w-6" /> Appearance
              </Link>
            </li>
            {/*  */}
            <li className="relative w-[100%] ">
              <Link
                href={`/share/${assistantId}`}
                onClick={() => {
                  router.push(`/share/${assistantId}`);
                  // setActive("share");
                }}
                className={`flex items-center justify-start  gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] font-Poppins ${
                  active === "share"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "share" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to assistant share & embed settings"
              >
                <PiShareNetworkDuotone className="h-6 w-6" />
                Embed / Share
              </Link>
            </li>
            {/*  */}
            <div className=" px-1 flex items-center gap-1">
              <hr className="w-[5rem] h-[1px] dark:bg-gray-200 bg-gray-300 mt-1" />
              <span className="text-[16px] font-semibold text-center ">
                Advanced
              </span>
              <hr className="w-[5rem] h-[1px] dark:bg-gray-200 bg-gray-300 mt-1" />
            </div>
            {/*  */}
            <li className="relative w-[100%] ">
              <Link
                href={`/setting/${assistantId}`}
                onClick={() => {
                  router.push(`/setting/${assistantId}`);
                  // setActive("setting");
                }}
                className={`flex items-center justify-start  gap-1 cursor-pointer rounded-tr-3xl rounded-br-3xl shadow-md hover:shadow-lg filter drop-shadow-sm py-2 px-2 text-[1rem] font-Poppins ${
                  active === "setting"
                    ? "sidebtn hover:bg-sky-600 text-white "
                    : "bg-zinc-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                }`}
                style={{
                  background:
                    active === "setting" &&
                    `${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                }}
                title="Click & Go to assistant layout settings"
              >
                <GoGear className="h-6 w-6" />
                Settings
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="">Subscription btn</div> */}
      </div>
    </div>
  );
}
