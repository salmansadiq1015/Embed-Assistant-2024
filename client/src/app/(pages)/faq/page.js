"use client";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";

export default function page() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { color } = useAssistant();

  // Get FAQ
  const getFAQ = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/layout/get-layout/FAQ`
      );
      setFaqData(data?.layoutData?.faq);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFAQ();
  }, []);

  // Toggle Questions
  const toggleQuestion = (id) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  return (
    <>
      <Header />
      <div className="w-full min-h-screen pt-[2rem] pb-[3rem] px-2 sm:px-6">
        <div className="flex flex-col gap-2 ">
          <h1
            className="text-4xl sm:text-3xl font-semibold sm:font-bold text-center"
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
            Frequently Asked Questions
          </h1>
          <span className="text-[15px] font-medium text-center">
            Dive into the fountain of knowledge! Explore our FAQ section to
            unravel answers, making your experience with us as smooth as
            possible
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem]">
          <div className="">
            <Image
              src="/faq.png"
              alt="FAQ"
              width={500}
              height={500}
              style={{
                filter:
                  "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
          <div className="">
            {loading ? (
              <Loader />
            ) : (
              <dl className="space-y-8">
                {faqData?.map((faq, i) => (
                  <div
                    className={`${
                      faq._id !== faqData[0]?._id && "border-t"
                    } border-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-2 rounded-md shadow-md dark:shadow-sm hover:shadow-lg stroke-gray-200 dark:shadow-gray-800`}
                    key={faq?._id}
                  >
                    <dt className="text-lg ">
                      <button
                        className="flex items-center dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(faq._id)}
                      >
                        <input
                          className={`w-full border-2  rounded-sm bg-transparent border-none border-gray-300 outline-none py-2 px-2 cursor-pointer `}
                          value={faq?.question}
                          disabled
                        />
                        <span className="ml-6 flex-shrink-0">
                          {faq?.active ? (
                            <HiMinus className="w-6 h-6 cursor-pointer" />
                          ) : (
                            <HiPlus className="w-6 h-6 cursor-pointer" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {faq.active && (
                      <dd className="mt-2 mr-[1.5rem] border-t border-gray-300">
                        <p className="pt-2 pl-2">{faq?.answer}</p>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
