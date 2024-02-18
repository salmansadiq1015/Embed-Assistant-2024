"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function Embed() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="fixed bottom-5 right-2 z-[444] bg-transparent ">
        {isShow && (
          <div className="absolute bottom-3 right-2">
            <iframe
              style={{
                width: "340px",
                height: "400px",
                borderRadius: ".5rem",
              }}
              src="http://localhost:3000/assistant/asst_a2unUaZaJdcvUQ8lAApJ1kcr"
            ></iframe>
          </div>
        )}
        {!isShow ? (
          <div
            className="relative w-[2.7rem] h-[2.7rem] rounded-full overflow-hidden animate-bounce shadow-md shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:animate-none"
            onClick={() => setIsShow(true)}
            style={{ display: isShow && "none" }}
          >
            <Image src="/botbtn (1).png" alt="BotBtn" fill objectFit="fill" />
          </div>
        ) : (
          <div className="fixed bottom-2 right-2 z-[999]">
            <IoCloseCircle
              className="text-3xl shadow-md cursor-pointer"
              onClick={() => setIsShow(false)}
              style={{ color: "orangered" }}
            />
          </div>
        )}
      </div>
    </>
  );
}
