"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { TbPasswordUser } from "react-icons/tb";

export default function Login({ setOpen, setRoute }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/login-user`,
        { email, password }
      );

      if (data?.success) {
        setAuth({ ...auth, user: data?.user, token: data?.token });
        localStorage.setItem("auth", JSON.stringify(data));
        setOpen(false);
        router.push("/dashboard");
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
    <div className="w-full py-5 px-2">
      <h1 className="text-center font-bold text-[1.5rem] text-green-900 dark:text-white">
        Sign In to ChatDoc.ai
      </h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
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
              className="py-2 w-full px-3 pl-[2rem] border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
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
              className="w-full py-2 px-3 pl-[2rem] border-2 dark:border-zinc-200 text-[15px] outline-none border-gray-900 rounded-md shadow-md"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2  items-start sm:items-center justify-start sm:justify-between my-3">
            <div className="flex items-center gap-2 ">
              <p className="text-[16px]">Not have an account?</p>
              <span
                className="text-green-900 hover:text-green-950 dark:text-sky-400 dark:hover:text-sky-500  font-medium text-[1rem]  cursor-pointer "
                onClick={() => setRoute("Register")}
              >
                Register
              </span>
            </div>
            <span
              type="button"
              onClick={() => setRoute("ResetPassword")}
              className="text-green-900 hover:text-green-950 dark:text-sky-400 dark:hover:text-sky-500  font-medium cursor-pointer "
            >
              Reset Password
            </span>
          </div>
          <button
            type="submit"
            className={`btn ${loading && "animate-pulse pointer-events-none"}`}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
