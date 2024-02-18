"use client";
import { useAssistant } from "../../context/authContext";
import Loader from "@/app/utils/Loader";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowForward } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import toast from "react-hot-toast";
import EmptyModel from "@/app/utils/EmptyModel";
import { CiCalendarDate } from "react-icons/ci";
import { format } from "date-fns";
import { TbLoader3 } from "react-icons/tb";
import { useTheme } from "next-themes";

export default function AllAssistants({
  setOpen,
  setRoute,
  setUpdateId,
  loading,
  assistants,
  getAssistants,
}) {
  const router = useRouter();
  const [show, setShow] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { assistant, setAssistant, color } = useAssistant();
  const { theme } = useTheme();

  //   Delete Assistant

  const deleteAssistant = async (id) => {
    setDeleting(true);
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this assistant?"
      );

      if (isConfirmed) {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/delete-assistant/${id}`
        );
        getAssistants();
        if (data?.success) {
          setDeleting(false);
          toast.success("Assistant deleted successfully!", {
            position: "bottom-center",
            duration: 2000,
          });
        } else {
          setDeleting(false);
          toast.success(data?.message, {
            position: "bottom-center",
            duration: 2000,
          });
        }
      } else {
        setDeleting(false);
        toast.error(data?.error, { position: "bottom-center" });
      }
    } catch (error) {
      setDeleting(false);
      console.log(error);
      toast.error("Something went wrong", { position: "bottom-center" });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : assistants.length === 0 ? (
        <div>
          <EmptyModel title={"Assistant"} upload={"Create"} />
        </div>
      ) : (
        <div className="w-full min-h-screen py-3 select-none ">
          <h1
            className={`text-3xl sm:text-4xl font-[700] text-green-800  dark:text-sky-500`}
            style={{
              textShadow: "-.2px 1px 0px #ccc",
              filter: "drop-shadow(-.5px 1px 0px #ccc)",
              color:
                theme === "dark"
                  ? color
                    ? color
                    : "#4facfe"
                  : color
                  ? color
                  : "#047857",
            }}
            title="Your Assistants"
          >
            My Assistants
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-8">
            {assistants &&
              assistants?.map((assist, index) => (
                <div
                  className={` rounded-md py-4  px-2 sm:px-[1rem] shadow-xl hover:shadow-md active:shadow-md hover:shadow-green-400/60 dark:hover:shadow-sky-400/60  cursor-pointer flex flex-col items-center gap-3 transition-shadow duration-150 border-2 border-green-800 dark:border-sky-500 `}
                  style={{
                    border: `2px solid ${
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }`,
                  }}
                  key={assist._id}
                >
                  <div className="relative flex items-center justify-between w-full ">
                    <div className="flex items-center gap-2">
                      <CiCalendarDate
                        className="h-5 w-5 text-purple-600"
                        style={{
                          color:
                            theme === "dark"
                              ? color
                                ? color
                                : "#4facfe"
                              : color
                              ? color
                              : "#047857",
                        }}
                        title="Assistant created date"
                      />
                      {format(new Date(assist.createdAt), "dd MMM yyyy")}
                    </div>
                    <span className=" p-1 border border-zinc-400 bg-white/15 cursor-pointer rounded-md shadow-md">
                      <BsThreeDotsVertical
                        className="h-4 w-4 text-green-600 dark:text-sky-500"
                        style={{
                          color:
                            theme === "dark"
                              ? color
                                ? color
                                : "#4facfe"
                              : color
                              ? color
                              : "#047857",
                        }}
                        onClick={() =>
                          setShow((prevShow) =>
                            prevShow === index ? null : index
                          )
                        }
                        title="Click to see more options"
                      />
                    </span>
                    {show === index && (
                      <div className=" absolute top-6 right-4 bg-white z-40 w-[12rem] py-1 px-1 flex flex-col gap-[2px] rounded-md shadow-md cursor-pointer border border-zinc-400">
                        <span
                          className="text-[14px] text-gray-800 flex items-center justify-between font-medium cursor-pointer py-1 px-2 rounded-md hover:shadow-md hover:bg-white/10 border hover:border-blue-400"
                          onClick={() => {
                            setRoute("updateAssistant");
                            setUpdateId(assist?.id);
                            setOpen(true);
                          }}
                        >
                          Update Assistant{" "}
                          <GrUpdate className="h-4 w-4 text-blue-500" />
                        </span>
                        <span
                          className="text-[14px] flex items-center justify-between text-red-500 font-medium cursor-pointer py-1 px-2 rounded-md hover:shadow-md hover:bg-white/10 border hover:border-red-400"
                          onClick={() => deleteAssistant(assist.id)}
                        >
                          Delete Assistant
                          {deleting && (
                            <TbLoader3 className="h-4 w-4 animate-spin" />
                          )}
                          <MdDeleteForever className="h-4 w-4 text-red-500" />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="relative w-[4rem] h-[4rem] rounded-full overflow-hidden cursor-pointer shadow-lg border border-fuchsia-500 ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/assistant-logo/${assist?._id}`}
                      alt="log"
                      layout="fill"
                      objectFit="fill"
                    />
                  </div>
                  <h3 className="text-lg font-semibold ">{assist?.name}</h3>
                  <p className="text-center">
                    {assist?.instructions.slice(0, 60)}...
                  </p>
                  <button
                    onClick={() => {
                      setAssistant({ ...assistant, threadData: assist });
                      localStorage.setItem("thread", JSON.stringify(assist));
                      router.push(`/dashboard/${assist.id}`);
                    }}
                    title="Click & move to upload file page"
                    className="btn1 flex items-center gap-1 text-white cursor-pointer shadow-md rounded-3xl py-2 px-4"
                  >
                    Upload File <IoArrowForward />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
