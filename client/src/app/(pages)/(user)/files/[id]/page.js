"use client";
import Layout from "@/app/components/Layout/Layout";
import { useAssistant } from "@/app/context/authContext";
import React, { useEffect, useState } from "react";
import { FaFileMedical } from "react-icons/fa";
import UploadFileModel from "../../CustomModel/UploadFileModel";
import UploadFile from "@/app/components/user/UploadFile";
import AllAssistantFiles from "@/app/components/user/AllAssistantFiles";
import axios from "axios";
import { useTheme } from "next-themes";
import UploadText from "@/app/components/user/UploadText";
import UploadLink from "@/app/components/user/UploadLink";

export default function Files({ params }) {
  const assistantId = params.id;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("upload-files");
  const [file, setfile] = useState(false);
  const { assistant, color } = useAssistant();
  const assisId = assistant?.threadData?.id;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme;

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
  }, [assistantId]);

  return (
    <Layout>
      <>
        <div
          className="mt-[1rem] min-h-screen message sm:mt-0 flex flex-col items-center justify-center gap-4 border-b
       border-gray-200 pb-5 sm:items-center sm:gap-0 overflow-y-auto  "
        >
          <div className="flex flex-col items-center justify-center sm:mt-[-4rem]">
            <h1
              className="mb-3 font-bold text-center text-5xl"
              style={{ textShadow: "-.4px 1px 0px #777" }}
            >
              All{" "}
              <span
                style={{
                  color:
                    theme === "dark" ? "#4facfe" : color ? color : "#047857",
                  textShadow: "-.3px 1px 0px #ccc",
                }}
              >
                Uploaded
              </span>{" "}
              Files
            </h1>
            <p className="text-center mt-3 text-zinc-500 dark:text-gray-300">
              Elevate your communication with our Chat with Document feature,
              seamlessly integrating file uploads. Transform your conversations
              into dynamic exchanges, enabling you to share files effortlessly.
            </p>
          </div>

          <div className="flex items-center justify-end w-full py-[1rem] px-5">
            <button
              className="btn1 py-2 text-white px-4 flex text-[16] items-center gap-2 rounded-md  cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <FaFileMedical className="h-5 w-5 text-white" /> Upload
            </button>
          </div>
          <div className="py-2 w-full px-4">
            <hr className="w-full h-[2px] bg-gray-300 dark:bg-gray-300" />
          </div>
          <div className="w-full h-full py-6 px-4">
            <AllAssistantFiles
              assistantId={assisId}
              setfile={setfile}
              files={files}
              loading={loading}
              getAllFiles={getAllFiles}
            />
          </div>
        </div>

        {/* Upload files Model */}
        {route === "upload-files" && (
          <>
            {open && (
              <UploadFileModel
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                component={UploadFile}
                assistantId={assisId}
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

        {/*  */}
      </>
    </Layout>
  );
}
