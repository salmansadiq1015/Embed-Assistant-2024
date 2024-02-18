"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { TiArrowLeft } from "react-icons/ti";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineToken } from "react-icons/md";

export default function UpdatePassword({ setOpen, setRoute }) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/updatePassword`,
        { token, newPassword }
      );

      if (data?.success) {
        setRoute("Login");
        toast.success(data?.message, { duration: 3000 });
        setLoading(false);
      } else {
        toast.error(data?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-full p-1 w-[2rem] h-[2rem] flex items-center justify-center hover:bg-blue-500/40 cursor-pointer">
        <TiArrowLeft size={30} onClick={() => setRoute("Login")} />
      </div>
      <div className="w-full py-3 px-2">
        <h1 className="text-center font-semibold text-[1.5rem] text-green-900 dark:text-white ">
          Update Password
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[1.1rem] font-[400] ">
              Enter reset Token
            </label>
            <div className="relative w-full">
              <MdOutlineToken
                size={23}
                className="absolute top-[9px] left-2 cursor-pointer"
              />
              <input
                type="text"
                placeholder="Enter reset Token"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="py-2 px-3 border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-[1.1rem] font-[400] ">
              Enter your new Password
            </label>
            <div className="relative w-full">
              <div
                className="absolute top-2 right-2 z-10 cursor-pointer"
                onClick={() => setIsShow(!isShow)}
              >
                {!isShow ? (
                  <IoMdEyeOff size={25} className="cursor-pointer" />
                ) : (
                  <IoMdEye size={25} className="cursor-pointer" />
                )}
              </div>
              <TbPasswordUser
                size={23}
                className="absolute top-[9px] left-2 cursor-pointer"
              />
              <input
                type={!isShow ? "password" : "text"}
                placeholder="password!@#%"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-[2rem] py-2 px-3 border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`btn ${loading && "animate-pulse pointer-events-none"}`}
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}
