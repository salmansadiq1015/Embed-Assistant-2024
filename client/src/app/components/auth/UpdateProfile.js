"use client";
import { useAuth } from "@/app/context/authContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCameraReverseOutline } from "react-icons/io5";

export default function UpdateProfile({ setRoute, setOpen }) {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  // User Data
  const userData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/single-user/${auth?.user.id}`
      );
      if (data?.success) {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userData();
    //   eslint-disable-next-line
  }, []);

  // Update Prfile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("avatar", avatar);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/update-profile/${auth?.user.id}`,
        formData
      );
      if (data.success) {
        setRoute("Profile");
        toast.success(data?.message, { duration: 2000 });
        setLoading(false);
      } else {
        toast.error(data?.message, { duration: 2000 });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center justify-center px-2 py-4">
        <div className="relative w-[6rem] h-[6rem] rounded-full border-2 border-green-500">
          {avatar ? (
            <Image
              src={URL.createObjectURL(avatar)}
              layout="fill"
              objectFit="fill"
              className="rounded-full"
            />
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/user-avatar/${auth?.user.id}`}
              layout="fill"
              objectFit="fill"
              className="rounded-full"
            />
          )}
          <div className="absolute bottom-[4px] right-1 z-10">
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <label htmlFor="avatar" className="cursor-pointer ">
              <IoCameraReverseOutline
                size={20}
                className="w-[1.5rem] h-[1.5rem] rounded-full p-1 border text-white border-blue-500 bg-gray-900 "
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="text-[1.1rem] font-medium">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            className="py-2 px-3 text-[1rem] ring-gray-900 dark:ring-gray-200 ring-2 rounded-md shadow-md w-full "
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="" className="text-[1.1rem] font-medium">
            Email Address
          </label>
          <input
            type="text"
            value={email}
            className=" py-2 px-3 text-[1rem] ring-gray-900 dark:ring-gray-200 ring-2 rounded-md shadow-md w-full "
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative flex flex-col items-end justify-end gap-2 w-full  ">
          <button
            className={` btn w-[7.5rem] ${
              loading && "animate-pulse pointer-events-none"
            }`}
            style={{ borderRadius: ".3rem" }}
            onClick={handleUpdate}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </>
  );
}
