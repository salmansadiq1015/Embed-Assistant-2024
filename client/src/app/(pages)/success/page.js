"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Success() {
  return (
    <div className=" w-full h-screen flex items-center justify-center flex-col">
      <Image
        src="/Animation - 1709279530884.gif"
        alt="Success"
        width={150}
        height={150}
      />
      <h5 className="text-lg font-semibold  text-center">
        Congratulation you subscribed successfully!{" "}
      </h5>
      <Link href="/">
        <button className=" w-[8rem] h-[2.7rem]  flex items-center justify-center gap-1 rounded-3xl bg-sky-500 text-white hover:bg-sky-600 shadow-md mt-6">
          <IoIosArrowRoundBack className="h-8 w-8 text-white" />
          Back
        </button>
      </Link>
    </div>
  );
}
