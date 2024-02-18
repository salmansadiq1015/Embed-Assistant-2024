"use client";
import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import UserSidebar from "./UserSidebar";
import MainLayout from "@/app/utils/MainLayout";

export default function Layout({ children }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <MainLayout>
        <div className=" relative w-full flex-1 gap-1 flex h-[calc(100vh-4rem) overflow-hidden">
          {!show && (
            <div className=" flex md:hidden  absolute top-2 left-3">
              <IoMenu
                onClick={() => setShow(true)}
                size={25}
                className="hover:text-blue-500 transition-all duration-150"
              />
            </div>
          )}
          <div className="hidden md:flex w-[14rem] h-[calc(100vh-4rem)]  border-r-[2px] dark:border-gray-300 border-gray-400">
            <UserSidebar />
          </div>
          {show && (
            <div className=" absolute top-0 left-0 flex h-full dark:bg-gray-900 bg-white md:hidden z-20 w-[14rem] pt-[1rem]  border-r-[2px] dark:border-gray-300 border-gray-600">
              <div className="absolute top-2 right-3">
                <IoClose
                  onClick={() => setShow(false)}
                  size={25}
                  className="hover:text-blue-500 transition-all duration-150"
                />
              </div>
              <UserSidebar />
            </div>
          )}
          <div className="flex-[1.8] border-r-red-500 pt-[2.5rem] h-[calc(100vh-4rem)] overflow-auto message scroll-smooth  md:pt-0  ">
            {children}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
