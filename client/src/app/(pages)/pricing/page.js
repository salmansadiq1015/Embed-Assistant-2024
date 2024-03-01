"use client";
import PageLayout from "@/app/components/PageLayout";
import UpgradeButton from "@/app/components/UpgradeButton";
import { useAssistant, useAuth } from "@/app/context/authContext";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function Pricing() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [auth] = useAuth();
  const [payment, setPayment] = useState(null);

  // Get Payment User

  const getPaymentUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/user-payment-info/${auth?.user?.id}`
      );
      setPayment(data?.paymentInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentUser();
  }, [auth?.user?.subscriptionId]);

  // Pricing Details

  const pricingItems = [
    {
      plan: "Free",
      tagline: "For small side projects.",
      quota: 1,
      price: 0,
      features: [
        {
          text: "2 Documents, 1 Website link , 2 Written or Copy Text",
          footnote: "The maximum amount of files per Assistant.",
        },
        {
          text: "4MB file size limit",
          footnote: "The maximum file size of a single Document file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
          negative: true,
        },
        {
          text: "Only 1 Assistant Quata",
          footnote: "You can create only 1 free Assistant",
          negative: true,
        },
        {
          text: "Unlimited uploads",
          footnote:
            "Upload unlimited PDF, CSV, TXT, Docx, PPTX, JavaScript, HTML, CSS Website links, Copy Past or written text or more",
          negative: true,
        },
        {
          text: "Chat with Multiple files",
          footnote:
            "You can also integrate chat with multiple files at a time.",
          negative: true,
        },
        {
          text: "Priority support",
          negative: true,
        },
      ],
    },
    {
      plan: "Standard",
      tagline: "For larger projects with higher needs.",
      quota: "Standard",
      price: 30,
      features: [
        {
          text: "100 pages per PDF, CSV, TEXT",
          footnote:
            "The maximum amount of pages per PDF, CSV & TEXT, Docx, PPTX, Doc, HTML, CSS, JavaScript, Website Links, Written or Copy Past text or more.",
        },
        {
          text: "8MB file size limit",
          footnote:
            "The maximum file size of a multiple PDF, CSV & TEXT, Docx, Doc, PPTX,  HTML, CSS, JavaScript, Website Links, Written or Copy Past text",
        },
        {
          text: "4 Assistant Quata",
          footnote:
            "You can creare only 4 free Assistant per month & embed these assistant in your own websites",
        },
        {
          text: "Full Customize_able Assistant",
        },
        {
          text: "Mobile-friendly interface",
          footnote:
            "You can Customize your assistant that you want (Assistant Avatar, Name,Color, Message, Pre Questions, Publish / UnPublish, fully secure) ",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
        },
        {
          text: "Unlimited uploads",
          footnote:
            "Upload unlimited  PDF, CSV & TEXT, Docx, Doc, PPTX,  HTML, CSS, JavaScript, Website Links, Written or Copy Past text.",
        },
        {
          text: "Chat with Multiple files",
          footnote:
            "You can also integrate chat with multiple files at a time.",
        },
        {
          text: "Priority support",
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For larger projects with higher needs.",
      quota: "Pro",
      price: 59,
      features: [
        {
          text: "Unlimited pages per Documents.",
          footnote:
            "The maximum amount of pages per PDF, CSV & TEXT, Docx, PPTX, Doc, HTML, CSS, JavaScript, Website Links, Written or Copy Past text or more.",
        },
        {
          text: "16MB file size limit",
          footnote:
            "The maximum file size of a multiple PDF, CSV & TEXT, Docx, Doc, PPTX,  HTML, CSS, JavaScript, Website Links, Written or Copy Past text",
        },
        {
          text: "8 Assistant Quata",
          footnote:
            "You can creare only 8 free Assistant per month & embed these assistant in your own websites",
        },
        {
          text: "Full Customize_able Assistant",
          footnote:
            "You can Customize your assistant that you want (Assistant Avatar, Name,Color, Message, Pre Questions, Publish / UnPublish, fully secure) ",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
        },
        {
          text: "Unlimited uploads",
          footnote:
            "Upload unlimited  PDF, CSV & TEXT, Docx, Doc, PPTX,  HTML, CSS, JavaScript, Website Links, Written or Copy Past text.",
        },
        {
          text: "Chat with Multiple files, Website Links, Written Text or Copy Past Text",
          footnote:
            "You can also integrate chat with multiple files at a time.",
        },
        {
          text: "Priority support",
        },
      ],
    },
  ];

  // Delete Payment Info
  // useEffect(() => {
  //   // Function to delete payment info
  //   const deletePaymentInfo = async () => {
  //     try {
  //       await axios.delete(
  //         `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/user-payment-info/${payment?._id}`
  //       );
  //       console.log("Payment info deleted successfully.");
  //       getPaymentUser();
  //     } catch (error) {
  //       console.log("Error deleting payment info:", error);
  //     }
  //   };

  //   // Calculate the expiration date based on the price
  //   const expirationDate = new Date(payment?.createdAt);
  //   expirationDate.setMonth(
  //     expirationDate.getMonth() + (payment?.price === "30" ? 1 : 2)
  //   );

  //   // Calculate the delay until expiration
  //   const currentTime = new Date();
  //   const delayInMillis = expirationDate.getTime() - currentTime.getTime();

  //   // Schedule the deletion of payment info
  //   if (delayInMillis > 0) {
  //     const timerId = setTimeout(deletePaymentInfo, delayInMillis);
  //     // Clean up the timer on component unmount
  //     return () => clearTimeout(timerId);
  //   }

  //   // No need to schedule deletion if expiration date is already past
  // }, [payment]);

  return (
    <PageLayout>
      <>
        {!payment ? (
          <div className="w-full flex flex-col items-center justify-center min-h-screen py-8 px-4">
            <div className="mx-auto mb-10 sm:max-w-lg">
              <h1 className="text-6xl font-bold sm:text-7xl text-center">
                Pri
                <span
                  className="text-blue-600"
                  style={{
                    color:
                      theme === "dark"
                        ? !color
                          ? "white"
                          : color
                        : !color
                        ? "black"
                        : color,
                  }}
                >
                  cing
                </span>
              </h1>
              <p className="mt-5 text-gray-600 sm:text-lg text-center ">
                Whether you&apos;re just trying out our service or need more,
                we&apos;ve got you covered.
              </p>
            </div>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pricingItems.map(({ plan, tagline, quota, features, price }) => {
                return (
                  <div
                    key={plan}
                    className={`relative rounded-2xl bg-white  dark:bg-gray-800 shadow-lg 
                    ${
                      plan === "Pro" || plan === "Standard"
                        ? "border-2 border-blue-600 shadow-blue-200"
                        : "border border-gray-200"
                    }`}
                  >
                    {plan === "Pro" || plan === "Standard" ? (
                      <div className="absolute text-center -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                        Upgrade now
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="p-5 flex flex-col items-center justify-center gap-[1rem]">
                      <h3 className="my-3 text-center font-display text-3xl font-bold ">
                        {plan}
                      </h3>
                      <p className="text-gray-500">{tagline}</p>
                      <p className="my-5 font-display text-6xl font-semibold">
                        ${price}
                      </p>
                      <p className="text-gray-500">per 3 month</p>
                    </div>

                    <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50 dark:bg-gray-900">
                      <div className="flex items-center gap-1 space-x-1">
                        <p>{quota.toLocaleString()} Files/mo included</p>{" "}
                        <HiOutlineQuestionMarkCircle
                          title="How many Files you can upload per month."
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </div>

                    <ul className="my-10 space-y-5 px-8">
                      {features.map(({ text, footnote, negative }) => (
                        <li key={text} className="flex space-x-5">
                          <div className="flex-shrink-0">
                            {negative ? (
                              <Minus className="h-6 w-6 text-gray-300" />
                            ) : (
                              <Check className="h-6 w-6 text-blue-500" />
                            )}
                          </div>
                          {footnote ? (
                            <div className="flex items-center space-x-1">
                              <p
                                className={
                                  ("text-gray-600",
                                  `${negative && "text-gray-400"}`)
                                }
                              >
                                {text}
                              </p>
                              <HelpCircle
                                className="h-4 w-4 text-zinc-500"
                                data-tooltip-id="textNote"
                                data-tooltip-content={`${footnote}`}
                              />
                              <Tooltip
                                id="textNote"
                                className="dark:bg-gray-800 dark:text-white text-black bg-gray-100 shadow-md"
                              />
                            </div>
                          ) : (
                            <p
                              className={
                                ("text-gray-600",
                                `${negative && "text-gray-400"}`)
                              }
                            >
                              {text}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-200" />
                    <div className="p-5">
                      {plan === "Free" ? (
                        <Link
                          href={auth?.user ? "/dashboard" : "/"}
                          className="w-full h-[2.8rem] text-black bg-gray-200 dark:text-white dark:bg-gray-700 pointer-events-none flex items-center justify-center rounded-3xl shadow-md cursor-pointer "
                        >
                          {auth?.token ? "Upgrade now" : "Sign up"}
                          <ArrowRight className="h-5 w-5 ml-1.5" />
                        </Link>
                      ) : auth?.token ? (
                        <UpgradeButton
                          price={price}
                          setPrice={price}
                          plans={plan}
                        />
                      ) : (
                        <Link
                          href="/sign-in"
                          className="w-full text-white h-[2.8rem] flex items-center justify-center rounded-3xl shadow-md cursor-pointer "
                          style={{
                            background:
                              theme === "dark"
                                ? !color
                                  ? "white"
                                  : color
                                : !color
                                ? "black"
                                : color,
                          }}
                        >
                          {auth?.user ? "Upgrade now" : "Sign up"}
                          <ArrowRight className="h-5 w-5 ml-1.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-full py-8 px-2 sm:px-4">
            <div className="w-full flex items-center justify-between rounded-md cursor-pointer py-5 px-4 shadow-md hover:shadow-xl dark:bg-gray-700 dark:text-white  bg-gray-100">
              <div className="flex flex-col gap-4">
                <h2 className=" text-2xl sm:text-3xl font-medium ">
                  Subscription Plan
                </h2>
                <p>
                  You are currently on the{" "}
                  <span className="font-semibold">
                    {payment?.price === "30" ? "Standard" : "Pro"}
                  </span>{" "}
                  plan.
                </p>
              </div>
              <div className="h-full flex items-end ">
                Your plan renews on{" "}
                <span className="font-semibold ml-1">
                  {payment?.price === "30" ? formattedDate : formattedDate}
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    </PageLayout>
  );
}
