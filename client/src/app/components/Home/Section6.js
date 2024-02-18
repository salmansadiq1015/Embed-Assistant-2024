"use client";
import React from "react";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidBot } from "react-icons/bi";
import { BsDatabaseFill } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa6";
import { FaPaintRoller } from "react-icons/fa6";
import { FaDoorClosed } from "react-icons/fa6";

export default function Section6() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <div className="relative w-full min-h-[100vh] py-3 px-2 sm:px-6 mt-[3.5rem]">
      <div
        className="section5-content flex flex-col gap-4 py-6 px-2 sm:px-6 rounded-md shadow-md bg-gray-200 dark:bg-gray-800"
        style={{
          filter: "contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full ">
          <div className=" flex flex-col gap-2">
            <span
              className="text-lg "
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
              SECURITY - RELIABILITY - INNOVATION
            </span>
            <h1
              className=" text-3xl sm:text-4xl font-bold  w-full"
              style={{ textShadow: "-1px 1px 0px #888" }}
            >
              Why Choose ChatDoc.ai?
            </h1>
          </div>
          {/*  */}
          <p className="text-justify text-lg text-gray-700 dark:text-gray-300">
            At the heart of our mission is the empowerment of individuals and
            business leaders worldwide through seamless AI adoption, boosting
            productivity effortlessly.
          </p>
        </div>

        {/* ----------- */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mt-[3rem]">
          {/* con1 */}
          <div
            className="condition1 bg-gray-50 dark:bg-gray-900 rounded-md py-[3.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-center box1"
          >
            <div className="section5-icon">
              <FaCalendarAlt />
            </div>
            <h3 className="text-2xl  font-extrabold">Chat History</h3>
            <p className="text-base text-gray-800 dark:text-gray-300 text-justify ">
              Take a look at each and every conversation that&apos;s taken place
              within any of your chatbots.
            </p>
            <span
              className="w-[10rem] h-[2px] rounded-md"
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
            ></span>
          </div>

          {/* con2 */}

          <div
            className="condition1 bg-gray-50 dark:bg-gray-900 rounded-md py-[3.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-center box1"
          >
            <div className="section5-icon2">
              <BiSolidBot />
            </div>
            <h3 className="text-2xl text-center font-bold">
              GPT-3.5-turbo & GPT-4 Support
            </h3>
            <p className="text-base text-gray-800 dark:text-gray-300 text-justify ">
              Choose which language model is best for you and your needs and
              select a plan accordingly.
            </p>
            <span
              className="w-[10rem] h-[2px] rounded-md"
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
            ></span>
          </div>
          {/* col3 */}
          <div
            className="condition1 bg-gray-50 dark:bg-gray-900 rounded-md py-[3.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-center box1"
          >
            <div className="section5-icon3">
              <BsDatabaseFill />
            </div>
            <h3 className="text-2xl  font-bold">Upload Your Data</h3>
            <p className="text-base text-gray-800 dark:text-gray-300 text-justify ">
              Upload PDFs, TXT, CSV files into your ChatDoc and interect with
              your custom data.
            </p>
            <span
              className="w-[10rem] h-[2px] rounded-md"
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
            ></span>
          </div>
          {/* col4 */}
          <div
            className="condition1 bg-gray-50 dark:bg-gray-900 rounded-md py-[3.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-center box1"
          >
            <div className="section5-icon4">
              <FaLaptopCode color="purple" size="50" />
            </div>
            <h3 className="text-2xl  font-bold">No Code Platform</h3>
            <p className="text-base text-gray-800 dark:text-gray-300 text-justify ">
              Simply copy and paste our ready-made code to embed the chatbot
              anywhere you need.
            </p>
            <span
              className="w-[10rem] h-[2px] rounded-md"
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
            ></span>
          </div>
          {/* col5 */}
          <div
            className="condition1 bg-gray-50 dark:bg-gray-900 rounded-md py-[3.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-center box1"
          >
            <div className="section5-icon5">
              <FaPaintRoller color="yellow" size="50" />
            </div>
            <h3 className="text-2xl  font-bold">Branding</h3>
            <p className="text-base text-gray-800 dark:text-gray-300 text-justify ">
              Customise your chatbot with your own avatar, text colours and
              chatbot bubble to match your own branding.
            </p>
            <span
              className="w-[10rem] h-[2px] rounded-md"
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
            ></span>
          </div>

          {/* col6 */}
          <div
            className="condition1 bg-gray-50 dark:bg-gray-900 rounded-md py-[3.5rem] px-[1rem]
            shadow-lg cursor-pointer flex flex-col gap-8 items-center justify-center box1"
          >
            <div className="section5-icon6">
              <FaDoorClosed color="green" size="50" />
            </div>
            <h3 className="text-2xl  font-bold">Control Access</h3>
            <p className="text-base text-gray-800 dark:text-gray-300 text-justify ">
              Choose to share your Chatbot publicly by embedding or keep for
              private use within your FastBots account.
            </p>
            <span
              className="w-[10rem] h-[2px] rounded-md"
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
            ></span>
          </div>

          {/* ----------- */}
        </div>
      </div>
    </div>
  );
}
