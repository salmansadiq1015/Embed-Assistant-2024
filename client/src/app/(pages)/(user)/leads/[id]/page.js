"use client";
import Layout from "@/app/components/Layout/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useTheme } from "next-themes";
import { useAssistant } from "@/app/context/authContext";
import Image from "next/image";

export default function Leads({ params }) {
  const assistantId = params.id;
  const [userInfo, setUserInfo] = useState([]);
  const { theme } = useTheme();
  const { color } = useAssistant();

  const userData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/userInfo/assistant-users/${assistantId}`
      );
      setUserInfo(data?.usersInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userData();
    // eslint-disable-next-line
  }, [assistantId]);

  return (
    <Layout>
      <div className="w-full h-full py-2 pb-4 px-2">
        <div className="flex flex-col gap-4 mt-2  ">
          <h1
            className="text-3xl sm:text-4xl text-sky-600 dark:text-fuchsia-600 font-bold"
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
            Leads
          </h1>
          <p className=" text-sm">
            Below are the leads generated from your Chatbot during a
            conversation. You can also see any users who submitted their details
            in the event
          </p>
        </div>
        <div className="px-2">
          <hr className="w-full h-[2px] bg-gray-300 my-6" />
        </div>
        {/*  */}
        {userInfo.length > 0 ? (
          <div className="w-full h-full flex flex-col gap-4">
            <h1
              className="text-2xl sm:text-3xl font-semibold "
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
              Leads Users Information
            </h1>
            <table className="border-2 hidden sm:table">
              <thead>
                <tr>
                  <th className="border-2 py-2 px-2 text-center hidden sm:block">
                    Sr#
                  </th>
                  <th className="border-2 py-2 px-2 text-center">Name</th>
                  <th className="border-2 py-2 px-2 text-center">Email</th>
                  <th className="border-2 py-2 px-2 text-center">Phone</th>
                  <th className="border-2 py-2 px-2 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {userInfo?.map((info, index) => (
                  <tr key={index}>
                    <td className="border-2 py-2 px-2 text-center hidden sm:block">
                      {index + 1}
                    </td>
                    <td className="border-2 py-2 px-2 text-center">
                      {info?.name}
                    </td>
                    <td className="border-2 py-2 px-2 text-center overflow-x-auto ">
                      {info?.email}
                    </td>
                    <td className="border-2 py-2 px-2 text-center">
                      {info?.phone}
                    </td>
                    <td className="border-2 py-2 px-2 text-center">
                      {moment(info?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile Format */}
            <div className=" sm:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {userInfo?.map((info, index) => (
                <div
                  key={index}
                  className="py-4 flex flex-col gap-3 px-3 rounded-md box cursor-pointer border-2  "
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
                  }}
                >
                  <div className="">
                    <span className="rounded-3xl py-1 px-2 border border-green-500 bg-green-500/30 cursor-pointer shadow-md text-xs">
                      {moment(info?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <input
                      type="text"
                      value={info?.name}
                      disabled
                      className="border-2 rounded-md border-gray-700 shadow-md py-2 px-3 text-black dark:text-white"
                    />
                    <input
                      type="text"
                      value={info?.email}
                      disabled
                      className="border-2 rounded-md border-gray-700 shadow-md py-2 px-3 text-black dark:text-white"
                    />
                    <input
                      type="text"
                      value={info?.phone}
                      disabled
                      className="border-2 rounded-md border-gray-700 shadow-md py-2 px-3 text-black dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <Image
                src="/empty.png"
                alt="Empty"
                height={80}
                width={80}
                className="w-[10rem] h-[10rem] sm:h-[14rem] sm:w-[14rem]"
              />

              <h3
                className="text-lg font-semibold  text-center px-1 text-red-500"
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
                No lead user found!
              </h3>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
