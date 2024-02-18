"use client";
import AdminLayout from "@/app/components/Layout/AdminLayout";
import Spinner from "@/app/components/Spinner";
import { useAssistant, useAuth } from "@/app/context/authContext";
import Heading from "@/app/utils/Heading";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { PiFilesFill } from "react-icons/pi";
import { FaUsersCog } from "react-icons/fa";
import Link from "next/link";
import UserAnalytics from "@/app/components/analytics/UserAnalytics";
import AssistantAnalytics from "@/app/components/analytics/AssistantAnalytics";
import FilesAnalytics from "@/app/components/analytics/FilesAnalytics";
import LeadAnalytics from "@/app/components/analytics/LeadAnalytics";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoAnalyticsOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TbFileAnalytics } from "react-icons/tb";
import SubscriptionAnalytics from "@/app/components/analytics/SubscriptionAnalytics";

export default function Dashboard() {
  const [auth] = useAuth();
  if (!auth?.token || auth?.user?.role !== 1) {
    return <Spinner />;
  }
  const { theme } = useTheme();
  const { color, userLen, loadTotal } = useAssistant();

  return (
    <AdminLayout>
      <Heading
        title="Admin-Dashboard"
        description="ChatDoc.ai is a plateform for business, teachers, professionals ,students to upload their knowledge documents and chat this documents"
        keywords="ChatDoc.ai, MERN, SASS,Redux, Context API, education, learning, , JavaScript, React, Node, Express, MongoDB, Next JS, TypeScript, CSS"
      />
      <div className="w-full message overflow-y-auto px-2 md:px-[2rem] pt-6 pb-[5rem]">
        <div className="h-[70vh] pb-[6rem] transition-all duration-200 ">
          <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-4">
            <div className=" md:flex-[.3] py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Congratulations! 🥳
                </h3>
                <span className="text-[14px] font-[400] text-gray-700 dark:text-gray-200">
                  Best seller of the month
                </span>
              </div>
              <div className="flex items-center gap-4 justify-between sm:justify-normal  mt-4">
                <div className="flex flex-col gap-4">
                  <h1
                    className="text-3xl font-[500]"
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
                    {" "}
                    $24.8k
                  </h1>

                  <button
                    className=" flex items-center gap-2 justify-center py-2 px-[1.1rem] font-medium rounded-md shadow shadow-gray-300 text-white dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1]"
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
                    View <GoArrowRight className="h-5 w-5 " />
                  </button>
                </div>
                <div className=" ml-[1rem] xl:ml-[4rem]">
                  <Image
                    src="/dash (5).png"
                    alt="AdminLogo"
                    width={90}
                    height={120}
                  />
                </div>
              </div>
            </div>
            <div className="flex-[.6] md:flex-[.7] py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Statistics Card
                </h3>
                <p className="text-[14px] font-[400] text-gray-700 dark:text-gray-200">
                  Total number of growth 😎 this month
                </p>
              </div>
              {/* 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-[2rem] md:mt-[3.5rem] md:pt-[.5rem] sm:pt-[2rem]">
                <Link
                  href="/admin/users"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-green-600 font-medium rounded-md shadow shadow-gray-300 text-white dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <FaUsers className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-medium text-gray-800 dark:text-white">
                      Customers
                    </h3>
                    <span className="text-[16px] font-medium text-green-600 ">
                      {userLen ? userLen?.length : "128K"}
                      {userLen?.length > 1000 && "k"}
                    </span>
                  </div>
                </Link>

                {/* 2 */}
                <Link
                  href="/admin/assistants"
                  className="flex items-center gap-2"
                >
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-pink-600 font-medium rounded-md shadow shadow-gray-300 text-white dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <RiRobot2Line className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-medium text-gray-800 dark:text-white">
                      Assistants
                    </h3>
                    <span className="text-[16px] font-medium text-pink-600 ">
                      10k
                    </span>
                  </div>
                </Link>

                {/* 3 */}
                <Link href="/admin/files" className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-sky-600 font-medium rounded-md shadow shadow-gray-300 text-white dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <PiFilesFill className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-medium text-gray-800 dark:text-white">
                      Files
                    </h3>
                    <span className="text-[16px] font-medium text-sky-600 dark:text-white">
                      197k
                    </span>
                  </div>
                </Link>
                {/* 4 */}
                <Link href="/admin/leads" className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-[3.4rem] h-[3.4rem] bg-fuchsia-600 font-medium rounded-md shadow shadow-gray-300 text-white dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                    <FaUsersCog className="h-10 w-10 text-white" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-medium text-gray-800 dark:text-white">
                      Lead Users
                    </h3>
                    <span className="text-[16px] font-medium text-fuchsia-600 dark:text-white">
                      75.5k
                    </span>
                  </div>
                </Link>

                {/* End */}
              </div>
            </div>
          </div>
          {/* Analytics */}
          <div className="pb-[6rem] sm:pb-[1rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem] gap-4 ">
              {/* User Analytics */}
              <div className=" h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3 className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                  <IoAnalyticsOutline
                    className=" text-3xl sm:text-4xl "
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
                  Users Analytics
                </h3>
                <UserAnalytics />
              </div>
              <div className="flex-[.4] h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  <TbBrandGoogleAnalytics className="  text-3xl sm:text-4xl text-sky-500 " />{" "}
                  Assistant Analytics
                </h3>
                <AssistantAnalytics />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-4 mt-[2rem]">
              <div className="flex-[1] md:flex-[.7] h-[22rem] py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3 className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                  <GrAnalytics className=" text-3xl sm:text-4xl text-green-500 " />
                  Subscription Analytics
                </h3>
                <SubscriptionAnalytics />
              </div>
              <div className="md:flex-[.3] py-4 px-3 h-[17rem] flex-col gap-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1]">
                <h2 className="text-xl sm:text-2xl flex items-center gap-2 font-semibold text-gray-800 dark:text-white">
                  <RiMoneyDollarCircleLine
                    className="text-3xl sm:text-4xl "
                    style={{ color: "orangered" }}
                  />
                  Total Earning{" "}
                </h2>
                <p className="mt-1">Last Month Subscription Revenue ⚡</p>
                <div className="flex flex-row ">
                  <h3
                    className="text-2xl ml-2 sm:text-3xl mt-[1rem] "
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
                    $24,8k
                  </h3>
                  <Image
                    src="/money.png"
                    alt="Analytics"
                    height={300}
                    width={230}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem] gap-4 ">
              {/* User Analytics */}
              <div className=" h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  <TbFileAnalytics className="  text-3xl sm:text-4xl text-pink-600 " />{" "}
                  Files Analytics
                </h3>
                <FilesAnalytics />
              </div>
              <div className=" h-[22rem] md:flex-[.3] overflow-hidden py-4 px-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:scale-[1.01] active:scale-[1] ">
                <h3 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  <LiaUsersCogSolid
                    className="  text-3xl sm:text-4xl  "
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
                  />{" "}
                  Lead Analytics
                </h3>
                <LeadAnalytics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
