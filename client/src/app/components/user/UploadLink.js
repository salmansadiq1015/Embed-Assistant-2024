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

export default function UploadLink({
  setOpen,
  assistantId,
  getAllFiles,
  setRoute,
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [file, setFile] = useState(null);

  // --------------------------------------->
  const handleLink = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/scrap/scrap-data-puppeter`,
        { url: url }
      );

      if (data?.success) {
        const blob = new Blob([data?.title, data?.data], {
          type: "text/plain ",
        });
        setFile(blob);
        setLoading(false);
        url("");
        toast.success("Data scraped successfully!", { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   Upload File
  const handleUpload = async (e) => {
    if (!file) {
      return toast.error("Please provide a file to upload!");
    }
    e.preventDefault();
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
        setLoading(false);
        setFile([]);
      } else {
        toast.error(data?.message, { duration: 3000 });
        setLoading(false);
        setFile([]);
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast.error("File type is not supported!");
      setFile([]);
    }
  };

  return (
    <div>
      <div className="w-full  flex flex-col items-center gap-4 py-4 ">
        <div className="flex items-center justify-around gap-[1rem] sm:gap-[2rem]">
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
        <h2 className="text-2xl text-center  font-semibold">
          Enter the target Website link
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
          {file ? (
            <div
              className=" relative w-full h-[10rem] gap-4 border-2 border-dashed rounded-md shadow-lg hover:shadow-2xl cursor-pointer flex items-center justify-center flex-col border-green-600 dark:border-sky-600 "
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
                Website data is scraped successfully
              </h3>
              <span
                className="font-[500]"
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
                Upload Now
              </span>{" "}
            </div>
          ) : (
            <input
              type="search"
              placeholder="Enter the website link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full  rounded-md shadow-md px-2  py-1 border-2 border-gray-300 outline-none "
              style={{ height: "3rem" }}
            />
          )}
          <button
            onClick={file ? handleUpload : handleLink}
            className={`btn1 w-full rounded-3xl flex items-center justify-center gap-2 text-center py-2 text-white font-medium text-[1rem] cursor-pointer ${
              loading && "pointer-events-none animate-pulse"
            }`}
            disabled={loading}
          >
            {file ? "Upload" : "Scrape"}
            {loading && <RiLoader3Fill className="h-5 w-5 animate-spin" />}
          </button>
        </div>
      </div>
    </div>
  );
}
