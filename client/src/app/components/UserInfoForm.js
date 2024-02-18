"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscSend } from "react-icons/vsc";
import { TbLoader } from "react-icons/tb";

export default function UserInfoForm({ assistantId, setShow, color }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      return toast.error("Please fill all the fields");
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/userInfo/create-userInfo`,
        { name, email, phone, assistantId }
      );

      if (data?.success) {
        setShow(false);
        setLoading(false);
        toast.success("Thank you for providing your info😇. ");
      } else {
        toast.error(data?.message);
        setLoading(false);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 py-2 px-3 rounded-md ">
      <h1
        className="text-center font-semibold sm:font-bold text-lg sm:text-2xl text-black"
        style={{ textShadow: "-.3px 1px 0px #888", color: color }}
      >
        Provide Information
      </h1>
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
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
            className="flex items-center gap-[.2rem] sidebtn py-[5px] px-4  rounded-3xl shadow-sm hover:shadow-md shadow-gray-300 text-white "
            style={{ background: color }}
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
    </div>
  );
}
