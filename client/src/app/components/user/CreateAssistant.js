"use client";
import { useAuth } from "@/app/context/authContext";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { RiLoader3Fill } from "react-icons/ri";

export default function CreateAssistant({ setOpen, getAssistants }) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [model, setModel] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  // Handle Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("instructions", instructions);
      formData.append("model", model);
      formData.append("logo", logo);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/create-assistant/${auth.user.id}`,
        formData
      );
      if (data?.success) {
        getAssistants();
        setOpen(false);
        toast.success(data?.message, {
          duration: 2000,
          position: "bottom-center",
        });
      } else {
        toast.error(data?.error, { duration: 2000, position: "bottom-center" });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        duration: 2000,
        position: "bottom-center",
      });
      setLoading(false);
    }
  };
  return (
    <div className="w-full px-1">
      <h1 className="text-2xl font-semibold text-center">Create Assistant</h1>
      <div className="">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4 mt-5">
          {/* Assistant Logo */}
          <div className="flex items-center gap-2">
            <div
              className={`relative w-[3.5rem] h-[3.5rem] border border-blue-500  rounded-full overflow-hidden cursor-pointer shadow-xl`}
            >
              <Image
                src={logo ? URL.createObjectURL(logo) : "/assistantlogo.png"}
                alt="logo"
                layout="fill"
                objectFit="fill"
                className="rounded-full"
              />
            </div>
            <label
              htmlFor="logo"
              className="btn flex items-center justify-center gap-1 mb-3 w-[6rem] rounded-md cursor-pointer"
              style={{ borderRadius: ".4rem", height: "2.5rem" }}
            >
              {logo ? (
                <>
                  Update <GrUpdate className="h-4 w-4" />{" "}
                </>
              ) : (
                <>
                  Upload <IoCloudUploadOutline className="h-5 w-5" />
                </>
              )}
            </label>
            <input
              type="file"
              id="logo"
              className="hidden"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>
          {/* Logo End */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Assistant role name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-3 rounded-md shadow-xl border-2 border-gray-800 dark:border-gray-300"
            />
            <div className="">
              <select
                name=""
                id="aiModals"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full py-2 px-3 rounded-md shadow-xl border-2 border-gray-800 dark:border-gray-300 "
              >
                <option value="Model">Select Model</option>
                <option value="gpt-4-1106-preview">gpt-4-1106-preview</option>
                <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106</option>
              </select>
            </div>
            <textarea
              type="text"
              placeholder="Assistant role name"
              value={instructions}
              required
              onChange={(e) => setInstructions(e.target.value)}
              className="py-2 resize-none px-3 w-full h-[6rem] rounded-md shadow-xl border-2 border-gray-800 dark:border-gray-300"
            />

            <button
              disabled={loading}
              className={`btn1 flex items-center justify-center rounded-md py-2 px-3 gap-1 shadow-md cursor-pointer hover:shadow-lg active:shadow-md ${
                loading && "animate-pulse pointer-events-none"
              } `}
            >
              <FaPlus className="h-5 w-5" />
              Create{" "}
              {loading && <RiLoader3Fill className="h-5 w-5 animate-spin " />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
