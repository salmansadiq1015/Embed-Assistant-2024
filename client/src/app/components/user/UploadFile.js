"use client";
import { useAssistant, useAuth } from "@/app/context/authContext";
import React, { useCallback, useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiLoader3Fill } from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { useTheme } from "next-themes";
import { BsJournalText } from "react-icons/bs";

export default function UploadFile({
  setOpen,
  assistantId,
  getAllFiles,
  setRoute,
}) {
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { color } = useAssistant();

  // Handle Drop file
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  // Handle Remove file
  const handleRemove = () => {
    setFile([]);
    setProgress(0);
  };

  // Handle Progress

  useEffect(() => {
    if (file[0]) {
      const intervals = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;

          if (newProgress >= 100) {
            clearInterval(intervals);
            return 100;
          } else {
            return newProgress;
          }
        });
      }, 100);
      return () => clearInterval(intervals);
    }
  }, [file]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("assistantId", assistantId);
    formData.append("userId", userId);
    formData.append("files", file[0]);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/files/upload-file`,
        formData
      );

      if (data?.success) {
        getAllFiles();
        setOpen(false);
        toast.success(data?.message, { duration: 3000 });
        setLoading(false);
      } else {
        toast.error(data?.message, { duration: 3000 });
        setLoading(false);
        setProgress(0);
        setFile([]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("File type is not supported!");
      setProgress(0);
      setFile([]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="w-full py-2 px-2 ">
      <div
        className="py-4 flex items-center justify-around 
      "
      >
        <span
          className="py-[.3rem] px-5 rounded-3xl shadow-md cursor-pointer border border-gray-300 hover:scale-[1.01] active:scale-[1]"
          style={{
            background:
              theme === "dark"
                ? color
                  ? color
                  : "#4facfe"
                : color
                ? color
                : "#047857",
          }}
          onClick={() => setRoute("upload-files")}
        >
          <FiFileText className="h-5 w-5 text-white" />
        </span>
        <span
          className="py-[.3rem] px-5 rounded-3xl shadow-md cursor-pointer border border-gray-300 hover:scale-[1.01] active:scale-[1]"
          style={{
            background:
              theme === "dark"
                ? color
                  ? color
                  : "#4facfe"
                : color
                ? color
                : "#047857",
          }}
          onClick={() => setRoute("upload-link")}
        >
          <FiLink className="h-5 w-5 text-white" />
        </span>
        <span
          className="py-[.3rem] px-5 rounded-3xl shadow-md cursor-pointer border border-gray-300 hover:scale-[1.01] active:scale-[1]"
          style={{
            background:
              theme === "dark"
                ? color
                  ? color
                  : "#4facfe"
                : color
                ? color
                : "#047857",
          }}
          onClick={() => setRoute("upload-text")}
        >
          <BsJournalText className="h-5 w-5 text-white" />
        </span>
      </div>
      <div
        className=" relative w-full h-[14rem] gap-4 border-2 border-dashed rounded-md shadow-lg hover:shadow-2xl cursor-pointer flex items-center justify-center flex-col "
        style={{
          border: `2px dashed ${
            theme === "dark"
              ? color
                ? color
                : "#4facfe"
              : color
              ? color
              : "#047857"
          }`,
        }}
        {...getRootProps()}
      >
        <span className="absolute top-2 right-2">
          <IoMdCloseCircleOutline
            className="h-5 w-5 cursor-pointer "
            onClick={handleRemove}
          />
        </span>
        <input {...getInputProps()} />
        <FaFileUpload
          className="h-10 w-10 dark:text-sky-600 text-green-600"
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
        />
        <h3 className="font-[400] text-[17px] cursor-pointer text-current">
          Drag & drop your file here or{" "}
          <span
            className="dark:text-sky-600 text-green-600 font-[500]"
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
          >
            choose file
          </span>{" "}
        </h3>
        <div className="px-2 sm:px-3 mt-5 w-full ">
          <div className="w-full flex items-center gap-1 relative h-[.4rem] overflow-hidden bg-gray-200 border border-zinc-600/35 rounded-xl">
            <div
              style={{ width: `${progress}%` }}
              className={`h-[100%] rounded-xl ${
                progress > 80
                  ? "bg-green-500 dark:bg-green-500"
                  : " dark:bg-fuchsia-500 bg-sky-500 "
              } `}
            />{" "}
          </div>
          <div className="flex items-center">
            <div style={{ width: `${progress}%` }}></div>
            <span className="text-sky-500 dark:text-fuchsia-500 font-semibold text-xs">
              {progress}%
            </span>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`btn1 w-full rounded-3xl flex items-center justify-center gap-2 text-center py-2 text-white font-medium text-[1rem] cursor-pointer ${
            loading && "pointer-events-none animate-pulse"
          }`}
        >
          Upload{" "}
          {loading && <RiLoader3Fill className="h-5 w-5 animate-spin " />}
        </button>
      </div>
    </div>
  );
}
