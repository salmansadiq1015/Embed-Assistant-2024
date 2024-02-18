"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";
import { FaUserLarge } from "react-icons/fa6";

export default function Register({ setOpen, setRoute }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pass, setPass] = useState(true);

  useEffect(() => {
    if (password.length > 0) {
      if (password.length < 6) {
        setPass(false);
      } else {
        setPass(true);
      }
    }
  }, [password]);
  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", avatar);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/register`,
        formData
      );

      if (data?.success) {
        setRoute("Login");
        toast.success(data?.message, { duration: 3000 });
        setLoading(false);
      } else {
        toast.error(data?.message, { duration: 3000 });
        setLoading(false);
      }
      setAvatar("");
      setEmail("");
      setName("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-1 sm:py-3 px-2">
      <h1 className="text-center font-semibold text-[1.5rem] text-green-900 dark:text-white ">
        Join to ChatDoc.ai
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-2 sm:gap-3"
      >
        <div className="flex flex-col gap-2">
          <input
            type="file"
            placeholder="Avatar"
            required
            onChange={(e) => setAvatar(e.target.files[0])}
            className="hidden"
            id="avatar"
          />
          <div className="flex items-center gap-2">
            <div
              className="relative rounded-full"
              style={{
                width: "2.8rem",
                height: "2.8rem",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Image
                src={avatar ? URL.createObjectURL(avatar) : "/user2.png"}
                alt="Avatar"
                layout="fill"
                objectFit="cover"
                className="border-[2px] border-gray-900 dark:border-zinc-200 rounded-full"
              />
            </div>
            <label
              htmlFor="avatar"
              className="text-[.9rem] text-white font-[400] py-[.4rem] px-[.6rem] rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 transition duration-150 "
            >
              {avatar ? "Update Avatar" : "Upload Avater"}
            </label>
          </div>
        </div>
        {/* End Avatar */}
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[1.1rem] font-[400] ">
            Enter your Name
          </label>
          <div className="relative w-full">
            <FaUserLarge
              size={18}
              className="absolute top-[10px] left-2 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-3 pl-[2rem] border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[1.1rem] font-[400] ">
            Enter your Email
          </label>
          <div className="relative w-full">
            <HiOutlineMail
              size={23}
              className="absolute top-[9px] left-2 cursor-pointer"
            />
            <input
              type="email"
              placeholder="loginmail@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 pl-[2rem] border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[1.1rem] font-[400] ">
            Enter your Password
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2 px-3 border-2 text-[15px] pl-[2rem]   outline-none  ${
                !pass
                  ? "border-red-600"
                  : "dark:border-zinc-200 border-gray-900"
              } rounded-md shadow-md`}
            />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[16px]">Already have an account?</p>
            <span
              className="text-green-900 hover:text-green-950 dark:text-sky-400 dark:hover:text-sky-500 font-[600] cursor-pointer "
              onClick={() => setRoute("Login")}
            >
              Login
            </span>
          </div>
          <button
            type="submit"
            className={`btn ${loading && "animate-pulse pointer-events-none"}`}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
