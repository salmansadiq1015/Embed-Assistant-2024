"use client";
import Spinner from "@/app/components/Spinner";
import CreateAssistant from "@/app/components/user/CreateAssistant";
import { useAssistant, useAuth } from "@/app/context/authContext";
import Heading from "@/app/utils/Heading";
import React, { useEffect, useState } from "react";
import AssistantModel from "../CustomModel/AssistantModel";
import { MdAssistant } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import AllAssistants from "@/app/components/user/AllAssistants";
import UpdateAssistant from "@/app/components/user/UpdateAssistant";
import MainLayout from "@/app/utils/MainLayout";
import axios from "axios";
import { useTheme } from "next-themes";

export default function Dashboard() {
  const [auth] = useAuth();
  if (!auth?.token) {
    return <Spinner />;
  }
  // <--------------------------------------->
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("create-assistant");
  const [updateId, setUpdateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistants, setAssistants] = useState([]);
  const { color } = useAssistant();
  const { theme } = useTheme();

  //   Get All Assistants
  const getAssistants = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/user-assistants/${auth?.user?.id}`
      );
      setAssistants(data?.assistantlist);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssistants();
    // eslint-disable-next-line
  }, []);

  return (
    <MainLayout>
      <>
        {/* SEO */}
        <Heading
          title="Dashboard"
          description="ChatDoc.ai is a plateform for business, teachers, professionals ,students to upload their knowledge documents and chat this documents"
          keywords="ChatDoc.ai, MERN, SASS,Redux, Context API, education, learning, , JavaScript, React, Node, Express, MongoDB, Next JS, TypeScript, CSS"
        />
        {/* -------------Component--------------- */}
        <div className="w-full min-h-[calc(100vh-5rem)] py-4 px-3 sm:px-[2rem]">
          <div className="flex flex-col gap-3 items-center justify-center">
            <h1
              className={`text-2xl font-semibold text-center text-green-800 dark:text-sky-500 `}
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
              Welcome, {auth?.user?.name}
            </h1>
            <p className="text-[16px] font-[400] text-center w-[98%] sm:w-[70%]">
              Your assistant, your way, in just one click! Join{" "}
              <b
                className={`text-green-900 dark:text-sky-500 cursor-pointer`}
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
                ChatDoc.ai
              </b>{" "}
              for an instant transformation – simplify tasks and amplify
              productivity.
            </p>
          </div>
          <div className="w-full flex items-center justify-center sm:justify-start">
            <div
              className={` items-center justify-center w-[14rem] h-[16rem] rounded-md border-2 border-dashed border-green-800 dark:border-sky-500 shadow-xl hover:shadow-2xl active:shadow-sm cursor-pointer flex flex-col gap-2 mt-[2rem] sm:mt-[2rem] transition-shadow duration-150`}
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
              onClick={() => setOpen(true)}
            >
              <span>
                <MdAssistant
                  className={`text-5xl text-green-800 dark:text-sky-600  `}
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
                  title="Click & create a new assistant"
                />
              </span>
              <p>Create a Assistant</p>
              <button
                className="btn1 flex items-center gap-1 text-white rounded-md py-2 px-4"
                onClick={() => {
                  setRoute("create-assistant");
                  setOpen(true);
                }}
                title="Click & create a new assistant"
              >
                <LuPlus className="w-5 h-5 text-white" /> New Assistant
              </button>
            </div>
          </div>
          <hr className="w-full h-[2px]  mt-4 shadow-xl" />

          {/* ---------------All Assistants--------------- */}
          <div className="mt-4">
            <AllAssistants
              setOpen={setOpen}
              setRoute={setRoute}
              setUpdateId={setUpdateId}
              loading={loading}
              assistants={assistants}
              getAssistants={getAssistants}
            />
          </div>
        </div>

        {/* Assistant-Model */}
        {/* Create Assistant */}
        {route === "create-assistant" && (
          <>
            {open && (
              <AssistantModel
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                component={CreateAssistant}
                getAssistants={getAssistants}
              />
            )}
          </>
        )}
        {/* Update Assistant */}
        {route === "updateAssistant" && (
          <>
            {open && (
              <AssistantModel
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                component={UpdateAssistant}
                updateId={updateId}
                getAssistants={getAssistants}
              />
            )}
          </>
        )}
      </>
    </MainLayout>
  );
}
