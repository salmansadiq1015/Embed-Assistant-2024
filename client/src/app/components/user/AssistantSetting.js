"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";

export default function AssistantSetting({ setShowSetting, setShowEmail }) {
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between py-2 px-3 border-b ">
        <span></span>
        <h3 className="text-center font-semibold text-lg">Settings</h3>
        <span>
          {" "}
          <IoClose
            className="h-5 w-5 cursor-pointer text-black"
            onClick={() => setShowSetting(false)}
          />
        </span>
      </div>
      <div className="flex flex-col gap-2 pt-5 pb-3 px-2">
        <div
          className="flex items-center gap-3 py-2 px-3 rounded-md bg-white border hover:bg-gray-100 hover:shadow-md  cursor-pointer transition duration-50"
          onClick={() => {
            setShowSetting(false), setShowEmail(true);
          }}
        >
          <HiOutlineMail className="h-6 w-6 text-gray-800" />{" "}
          <span className="text-black">Email Transcript</span>
        </div>
      </div>
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
