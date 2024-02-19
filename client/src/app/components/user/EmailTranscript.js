"use client";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { TbLoader } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function EmailTranscript({
  setShowEmail,
  setShowSetting,
  color,
  assistantId,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!assistantId) {
      return toast.error("Assistant_Id required!");
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/userInfo/create-userInfo`,
        { name, email, phone, assistantId }
      );

      if (data?.success) {
        setLoading(false);
        toast.success("Thank you for providing your info😇. ");
        setShowEmail(false);
        setEmail("");
        setName("");
        setPhone("");
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="relative w-full h-full">
      <div className="w-full flex items-center justify-between py-2 px-3 border-b ">
        <span>
          <IoIosArrowBack
            className="h-5 w-5 cursor-pointer text-black"
            onClick={() => {
              setShowEmail(false), setShowSetting(true);
            }}
          />
        </span>
        <h3 className="text-center font-semibold text-lg">Email Transcript</h3>
        <span>
          <IoClose
            className="h-5 w-5 cursor-pointer text-black"
            onClick={() => {
              setShowEmail(false), setShowSetting(true);
            }}
          />
        </span>
      </div>
      <form
        className="w-full flex flex-col gap-3 px-2 mt-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          autoFocus
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full py-1 sm:py-2 px-2 rounded-md border-2 text-black border-gray-800 shadow-md shadow-gray-300 bg-transparent outline-none"
          style={{ border: `2px solid ${color}` }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-1 sm:py-2 px-2 rounded-md border-2 text-black border-gray-800 shadow-md shadow-gray-300 bg-transparent outline-none"
          style={{ border: `2px solid ${color}` }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
          style={{ border: `2px solid ${color}` }}
          className="w-full py-1 sm:py-2 px-2 rounded-md border-2 text-black border-gray-800 shadow-md shadow-gray-300 bg-transparent outline-none"
        />
        <div className="flex items-center justify-end">
          <button
            className="flex items-center gap-2 sidebtn py-[6px] mt-[1rem] px-4  rounded-3xl shadow-sm hover:shadow-md shadow-gray-300 text-white "
            style={{ background: color ? color : "#4D92FF" }}
            onClick={handleSubmit}
          >
            Submit{" "}
            {loading ? (
              <TbLoader className="h-5 w-5 animate-spin text-white " />
            ) : (
              <VscSend className="h-5 w-5  text-white " />
            )}
          </button>
        </div>
      </form>
      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-2 flex items-center justify-center">
        <div className="flex items-center justify-center gap-2 w-full text-[13px]">
          <p className="text-[13px] text-gray-800">© 2024 mediguide360</p>{" "}
          <ul className="list-disc flex items-center gap-2">
            <li
              className="text-[13px] ml-3 text-gray-800 cursor-pointer"
              onClick={() => router.push("/privacy_policy")}
            >
              Privacy{" "}
            </li>
            <li
              className="text-[13px] ml-3 text-gray-800 cursor-pointer"
              onClick={() => router.push("/term&services")}
            >
              {" "}
              Terms
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
