"use client";
import UploadFile from "@/app/components/user/UploadFile";
import React, { useEffect, useState } from "react";
import { FaFileMedical } from "react-icons/fa";
import UploadFileModel from "../../CustomModel/UploadFileModel";
import AllAssistantFiles from "@/app/components/user/AllAssistantFiles";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useAssistant } from "@/app/context/authContext";
import Spinner from "@/app/components/Spinner";
import MainLayout from "@/app/utils/MainLayout";
import axios from "axios";
import { useTheme } from "next-themes";
import UploadLink from "@/app/components/user/UploadLink";
import UploadText from "@/app/components/user/UploadText";

export default function UploadFiles({ params }) {
  const assistantId = params.id;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("upload-files");
  const router = useRouter();
  const [file, setfile] = useState(false);
  const [count, setCount] = useState(3);
  const { assistant, color } = useAssistant();
  const assisId = assistant?.threadData?.id;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Authentication
  useEffect(() => {
    if (assistantId !== assisId) {
      const counter = setInterval(() => {
        setCount((prevVal) => {
          if (prevVal === 0) {
            clearInterval(counter);
            router.push("/dashboard");
          }
          return prevVal - 1;
        });
      }, 1000);

      return () => clearInterval(counter);
    }
    // eslint-disable-next-line
  }, [assistantId]);

  //   Get All Files
  const getAllFiles = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/files/assistant-files/${assistantId}`
      );
      setFiles(data.files);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFiles();
    // eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <>
        {!assistantId ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl flex flex-col gap-2font-semibold text-center">
                <span className="text-2xl text-red-500 font-bold text-center">
                  Unauthorised Access
                </span>
                Redirecting to you in {count} seconds
              </h1>
              <span>
                <ImSpinner10 className="h-10 w-10 text-blue-500 animate-spin" />
              </span>
            </div>
          </div>
        ) : (
          <div className=" relative w-full min-h-screen py-5 px-[.5rem] sm:px-4 ">
            <span
              className="absolute top-3 right-2 p-1 bg-green-600 text-white animate-bounce hover:animate-none rounded-md cursor-pointer border hover:bg-sky-500 hover:text-white box "
              onClick={() => router.push("/dashboard")}
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
              title="Click & move to dashboard"
            >
              {" "}
              <HiOutlineArrowRight className="h-5 w-7" />
            </span>
            {file && (
              <span
                className="absolute top-3 left-2 p-1 bg-green-600 text-white animate-bounce hover:animate-none rounded-md cursor-pointer border hover:bg-sky-500 hover:text-white box "
                onClick={() => router.push(`/chats/${assistantId}`)}
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
                title="Click & move to chat"
              >
                {" "}
                <HiOutlineArrowLeft className="h-5 w-7" />
              </span>
            )}
            {/* <div className="flex flex-col gap-3">
            <h1 className="text-center text-3xl sm:text-5xl font-semibold font-Poppins">
              Supported formats: "c", "cpp", "css", "csv", "docx", "gif", "html", "java", "jpeg", "jpg", "js", "json", "md", "pdf", "php", "png", "pptx", "py", "rb", "tar", "tex", "ts", "txt", "xlsx", "xml", "zip"
            </h1>
          </div> */}
            <div className="flex items-center justify-between  sm:gap-3 mt-7">
              <div className="flex flex-col gap-2">
                <h1
                  className="text-4xl sm:text-5xl mt-3 sm:mt-0 font-bold font-Poppins text-green-700 dark:text-sky-500 "
                  style={{
                    color:
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857",
                    textShadow: "-.7px 1px 0px #888",
                  }}
                >
                  My Files
                </h1>
                <p className="text-[14px] text-gray-800 dark:text-gray-200 w-[98%] sm:w-[80%]">
                  Supported Formats: c, cpp, css, csv, docx, gif, html, java,
                  jpeg, jpg, js, json, md, pdf, php, png, pptx, py, rb, tar,
                  tex, ts, txt, xlsx, xml, zip
                </p>
              </div>
              <div className="">
                <button
                  className="btn1 py-2 text-white px-4 flex text-[16] items-center gap-2 rounded-md  cursor-pointer"
                  onClick={() => setOpen(true)}
                  title="Click to upload"
                >
                  <FaFileMedical className="h-5 w-5 text-white" /> Upload
                </button>
              </div>
            </div>
            <hr className="w-full h-[2px] mt-6" />
            <div className="w-full h-full py-6">
              <AllAssistantFiles
                assistantId={assistantId}
                setfile={setfile}
                files={files}
                loading={loading}
                getAllFiles={getAllFiles}
              />
            </div>
          </div>
        )}

        {/* Upload files Model */}
        {route === "upload-files" && (
          <>
            {open && (
              <UploadFileModel
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                component={UploadFile}
                assistantId={assistantId}
                getAllFiles={getAllFiles}
              />
            )}
          </>
        )}

        {/* Upload files Model */}
        {route === "upload-link" && (
          <>
            {open && (
              <UploadFileModel
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                component={UploadLink}
                assistantId={assistantId}
                getAllFiles={getAllFiles}
              />
            )}
          </>
        )}

        {/* Upload files Model */}
        {route === "upload-text" && (
          <>
            {open && (
              <UploadFileModel
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                component={UploadText}
                assistantId={assistantId}
                getAllFiles={getAllFiles}
              />
            )}
          </>
        )}
      </>
    </MainLayout>
  );
}
