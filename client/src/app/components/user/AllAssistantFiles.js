"use client";
import EmptyModel from "@/app/utils/EmptyModel";
import Loader from "@/app/utils/Loader";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { TbLoader3 } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { format } from "date-fns";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "@emotion/react";

export default function AllAssistantFiles({
  setfile,
  files,
  loading,
  getAllFiles,
}) {
  const [show, setShow] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { color } = useAssistant();
  const { theme } = useTheme();

  if (files?.length > 0) {
    setfile(true);
  } else {
    setfile(false);
  }

  //   Handle Delete
  const handleDelete = async (assistantId, fileId) => {
    setDeleting(true);
    if (!assistantId || !fileId)
      return toast.error("Assistant_id or File_id is missing!");
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/files/delete-file/${assistantId}/${fileId}`
      );
      if (data?.success) {
        getAllFiles();
        setDeleting(false);
        toast.success(data?.message, { duration: 3000 });
      } else {
        setDeleting(false);
        toast.error(data?.message, { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      setDeleting(false);
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : files?.length === 0 ? (
        <div>
          <EmptyModel title={"File"} upload={"Upload"} />
        </div>
      ) : (
        <div className="w-full h-[100%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {files?.map((file, index) => (
              <div
                className=" relative box rounded-md py-4  border-2 border-green-600  dark:border-sky-500 cursor-default flex items-center justify-center flex-col gap-3 shadow-xl hover:shadow-md active:shadow-md hover:shadow-green-400/60 dark:hover:shadow-sky-400/60"
                key={file?._id}
                style={{
                  border: `2px solid ${
                    theme === "dark" ? "#4facfe" : color ? color : "#047857"
                  }`,
                }}
              >
                {/* Three Dots */}
                <div className="relative flex items-center justify-between w-full px-2 ">
                  <div className="flex items-center gap-2">
                    <CiCalendarDate
                      className="h-5 w-5 text-purple-600"
                      style={{
                        color:
                          theme === "dark"
                            ? "#4facfe"
                            : color
                            ? color
                            : "#047857",
                      }}
                    />
                    {format(new Date(file?.createdAt), "dd MMM yyyy")}
                  </div>
                  <span className=" p-1 border border-zinc-400 bg-white/15 cursor-pointer rounded-md shadow-md ">
                    <BsThreeDotsVertical
                      className="h-4 w-4 text-green-600 dark:text-blue-400"
                      style={{
                        color:
                          theme === "dark"
                            ? "#4facfe"
                            : color
                            ? color
                            : "#047857",
                      }}
                      onClick={() =>
                        setShow((prevShow) =>
                          prevShow === index ? null : index
                        )
                      }
                    />
                  </span>
                  {show === index && (
                    <div className=" absolute top-6 right-4 bg-white z-40 w-[12rem] py-1 px-1 flex flex-col gap-[2px] rounded-md shadow-md cursor-pointer border border-zinc-400">
                      <span
                        className={` ${
                          deleting && "pointer-events-none animate-pulse"
                        }text-[14px] flex items-center justify-between text-red-500 font-medium cursor-pointer py-1 px-2 rounded-md hover:shadow-md hover:bg-white/10 border hover:border-red-400`}
                        onClick={() =>
                          handleDelete(file?.assistantId, file?.fileId)
                        }
                      >
                        Delete File
                        {deleting && (
                          <TbLoader3 className="h-4 w-4 animate-spin" />
                        )}
                        <MdDeleteForever className="h-4 w-4 text-red-500" />
                      </span>
                    </div>
                  )}
                </div>

                {/* End */}
                <div className="relative w-[3rem] h-[3rem] object-fill p-1">
                  <Image
                    src={
                      file?.fileType === "pdf"
                        ? "/pdf.png"
                        : file?.fileType === "plain"
                        ? "/txt.png"
                        : file?.fileType === "txt"
                        ? "/txt.png"
                        : file?.fileType === "csv"
                        ? "/csv.png"
                        : file?.fileType === "docx"
                        ? "/docx.png"
                        : file?.fileType === "doc"
                        ? "/docx.png"
                        : file?.fileType === "pptx"
                        ? "/pptx.png"
                        : "/any.png"
                    }
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full"
                    alt="Icon"
                  />
                </div>
                <p className="text-[16] font-medium text-center">
                  {file?.fileName?.slice(0, 25)}{" "}
                  <span>{file?.fileName?.length > 25 && "..."}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
