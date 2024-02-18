"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAssistant, useAuth } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import { RiLoader3Fill } from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { BsJournalText } from "react-icons/bs";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function UploadText({
  setOpen,
  assistantId,
  getAllFiles,
  setRoute,
}) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [file, setFile] = useState(null);
  console.log("File:", file);

  // Scrape the website

  // Handle Download

  const handleFile = () => {
    if (!data) {
      toast.error("Please enter text data");
      return;
    }
    const blob = new Blob([data], { type: "text/plain" });
    setFile(blob);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please convert text to file first");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("assistantId", assistantId);
    formData.append("userId", userId);
    formData.append("files", file);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/files/upload-file`,
        formData
      );

      if (data?.success) {
        getAllFiles();
        setOpen(false);
        toast.success(data?.message, { duration: 3000 });
      } else {
        toast.error(data?.message || "Upload failed", { duration: 3000 });
        setFile([]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed!");
      setFile([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full  flex flex-col items-center gap-4 py-4 ">
        <div className="flex items-center gap-[1rem] sm:gap-[2rem]">
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
        {/*  */}
        {/* Input and Scrape button */}
        <h2 className="text-2xl text-center  font-semibold capitalize">
          Enter the text Data
        </h2>
        <div
          className="flex flex-col gap-4 items-center py-6 px-3 border-2 border-dotted   rounded-md w-full "
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
        >
          {!file ? (
            <>
              <textarea
                type="search"
                placeholder="Enter text data to convert into file..."
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full h-[10rem] resize-none rounded-md shadow-md px-2  py-1 border-2 border-gray-300 outline-none "
              />
            </>
          ) : (
            <div
              className=" relative w-full h-[14rem] gap-4 border-2 border-dashed rounded-md shadow-lg hover:shadow-2xl cursor-pointer flex items-center justify-center flex-col border-green-600 dark:border-sky-600 "
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
            >
              <span className="absolute top-2 right-2">
                <IoMdCloseCircleOutline
                  className="h-5 w-5 cursor-pointer "
                  onClick={() => setFile(null)}
                />{" "}
              </span>
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
              <h3 className="font-[400] text-[17px] cursor-pointer text-current flex flex-col text-center">
                Successfully text is changed to file{" "}
              </h3>
            </div>
          )}
          <button
            onClick={file ? handleUpload : handleFile}
            className={`btn1 w-full rounded-3xl flex items-center justify-center gap-2 text-center py-2 text-white font-medium text-[1rem] cursor-pointer ${
              loading && "pointer-events-none animate-pulse"
            }`}
            disabled={loading}
          >
            {file ? "Upload" : "Convert"}
            {loading && <RiLoader3Fill className="h-5 w-5 animate-spin" />}
          </button>
        </div>
      </div>
    </div>
  );
}
