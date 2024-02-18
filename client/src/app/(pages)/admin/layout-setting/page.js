"use client";
import AdminLayout from "@/app/components/Layout/AdminLayout";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import axios from "axios";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuPencil } from "react-icons/lu";

export default function Layout() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { color } = useAssistant();
  const [faqData, setFaqData] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [logo, setLogo] = useState(null);

  // Get FAQ
  const getFAQ = async () => {
    try {
      setLoading(true);
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

  // Update FAQ
  const updateFAQ = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/layout/update-layout`,
        { type: "FAQ", faq: faqData }
      );
      if (data?.success) {
        getFAQ();
        toast.success("FAQ Updated successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Questions
  const toggleQuestion = (id) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id, value) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };
  const handleAnswerChange = (id, value) => {
    setFaqData((prevFaqs) =>
      prevFaqs?.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFAQHandler = () => {
    setFaqData([...faqData, { question: "", answer: "" }]);
  };

  // Logo Handle

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get Logo
  const getLogo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/layout/get-layout/Logo`
      );
      setLogo(data?.layoutData?.logo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLogo();
  }, []);

  // Update Logo
  const updateLogo = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/layout/update-layout`,
        { type: "Logo", logoImage: imageUrl }
      );
      if (data?.success) {
        getLogo();
        toast.success("Logo Updated successfully.");
        setImageUrl(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminLayout>
      <div className="w-full h-[89%]  py-7 px-3 sm:px-5 overflow-y-auto message pb-[4rem]">
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
            textShadow: "-.1px 1px 0px #ccc",
          }}
        >
          Layout Settings
        </h1>
        <hr className="my-3 h-[1px] bg-gray-300" />
        <div className="flex flex-col gap-4 mt-[2rem]">
          {/* Logo Setting */}
          <div className="">
            <h3 className="text-xl font-[600] text-black dark:text-white">
              Modify Logo
            </h3>
            <hr className="my-3 h-[1px] bg-gray-300" />
            <label className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="logoInput"
              />
              <div className="relative w-[3.5rem] h-[3.5rem] bg-white rounded-full border">
                <Image
                  src={imageUrl ? imageUrl : logo?.logoImage}
                  alt="Logo"
                  fill
                  className="rounded-full shadow-md cursor-pointer"
                  id="logoImage"
                />
                <LuPencil className="h-5 w-5 text-black dark:text-white absolute bottom-[.5rem] right-[-.5rem] z-40" />
              </div>
              {imageUrl && (
                <button
                  className="text-[15px] w-[4.3rem] h-[2.1rem] text-white bg-green-500 cursor-pointer flex items-center justify-center rounded-md hover:shadow-xl shadow-gray-300 dark:shadow-gray-700 "
                  onClick={updateLogo}
                >
                  Save
                </button>
              )}
            </label>
          </div>
          {/* FAQ Edit */}
          {loading ? (
            <Loader />
          ) : (
            <div className="">
              <h3 className="text-xl font-[600] text-black dark:text-white">
                FAQ Edit
              </h3>
              <hr className="my-3 h-[1px] bg-gray-300" />

              <dl className="space-y-8">
                {faqData?.map((faq, i) => (
                  <div
                    className={`${
                      faq._id !== faqData[0]?._id && "border-t"
                    } border-gray-300 bg-gray-100 px-2 py-2 rounded-md shadow-md hover:shadow-lg stroke-gray-200 dark:bg-gray-800  dark:shadow-gray-700`}
                    key={faq?._id}
                  >
                    <dt className="text-lg ">
                      <button
                        className="flex items-center dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(faq._id)}
                      >
                        <input
                          type="text"
                          className={`w-full border-2 rounded-sm bg-transparent border-none border-gray-300 dark:bg-gray-800 outline-none py-2 px-2 cursor-pointer `}
                          value={faq?.question}
                          onChange={(e) =>
                            handleQuestionChange(faq?._id, e.target.value)
                          }
                          placeholder="Add your questions..."
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
                        <textarea
                          className="w-full h-[7rem] bg-transparent sm:h-[4rem] border-2 border-none resize-none border-gray-300 dark:bg-gray-800  rounded-sm outline-none py-2 px-2 cursor-pointer "
                          value={faq?.answer}
                          onChange={(e) =>
                            handleAnswerChange(faq?._id, e.target.value)
                          }
                          placeholder="Add your answer..."
                        />
                        <span className="ml-10 flex-shrink-0">
                          <AiOutlineDelete
                            className="text-black  dark:text-white text-[18px] hover:text-red-500 cursor-pointer"
                            onClick={() => {
                              setFaqData((prevFaq) =>
                                prevFaq.filter((item) => item?._id !== faq?._id)
                              );
                            }}
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
              <br />
              <br />
              <IoMdAddCircleOutline
                className="text-black dark:text-white text-[25px] cursor-pointer"
                onClick={newFAQHandler}
              />
              <div className="w-[98%] sm:w-[96%] flex items-center justify-end ">
                <div
                  className="flex bg-green-500 items-center justify-center w-[7rem] h-[2.6rem] cursor-pointer rounded-3xl text-[16px] text-white hover:scale-[1.01] hover:shadow-2xl"
                  onClick={updateFAQ}
                >
                  Update
                </div>
              </div>
            </div>
          )}
          {/*  */}
        </div>
      </div>
    </AdminLayout>
  );
}
