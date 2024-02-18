"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { RiLoader3Line } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { LuLoader } from "react-icons/lu";
import { useTheme } from "next-themes";
import { useAssistant } from "../context/authContext";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function Settings({ assistantId }) {
  const [bot, setBot] = useState(null);
  const [botName, setBotName] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [colors, setColors] = useState("#28a745");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [defaultQuestions, setDefaultQuestions] = useState([""]);
  const [published, setPublished] = useState();
  const [show, setShow] = useState();
  const { theme } = useTheme();
  const { color } = useAssistant();
  const router = useRouter();

  // Questions
  const addInputField = () => {
    defaultQuestions.length < 3 &&
      setDefaultQuestions([...defaultQuestions, ""]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...defaultQuestions];
    newQuestions[index] = value;
    setDefaultQuestions(newQuestions);
  };

  // Handle Published

  const handlePublished = async () => {
    setLoading1(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/published-bot/${assistantId}`,
        { published: !published }
      );

      if (data?.success) {
        toast.success("Updated successfully!");
        setLoading1(false);
        getBot();
      }
    } catch (error) {
      console.log(error);
      setLoading1(false);
    }
  };

  // Get Bot

  const getBot = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/get-bot/${assistantId}`
      );
      if (data) {
        setBot(data?.bot);
        setBotName(data?.bot?.botName);
        setMessage(data?.bot?.message);
        setColors(data?.bot?.color);
        setDefaultQuestions(data?.bot?.questions);
        setShow(data?.bot?.show);
        setPublished(data?.bot?.published);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBot();
    // eslint-disable-next-line
  }, [assistantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("botName", botName);
      formData.append("message", message);
      formData.append("color", colors);
      formData.append("avatar", avatar);
      formData.append("userAvatar", userAvatar);
      formData.append("question", JSON.stringify(defaultQuestions));
      formData.append("show", show);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/update-bot/${assistantId}`,
        formData
      );

      if (data?.success) {
        toast.success("Bot information added successfully!", {
          duration: 2000,
        });
        getBot();
        setLoading(false);
      } else {
        toast.error("Bot already exist!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        "Bot already exist with this userId, Please update your bot from setting."
      );
    }
  };

  return (
    <div className="w-full min-h-[70vh] overflow-hidden mt-2 px-2">
      <button
        className={` absolute top-2 right-2 z-[50]  py-2 px-4 rounded-md flex items-center justify-center gap-1 shadow-md  shadow-gray-300 dark:shadow-gray-700 cursor-pointer font-medium text-white `}
        onClick={() => {
          setPublished(!published);
          setTimeout(() => {
            handlePublished();
          }, 100);
        }}
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
      >
        {published ? "Published" : "Publish"}
        {loading1 && <LuLoader className="h-5 w-5 animate-spin text-white" />}
      </button>
      {bot ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className=" rounded-md border border-zinc-200 shadow-md py-6 px-4 overflow-y-auto h-[31.5rem] message ">
            <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md  "
              >
                <h3 className="text-base font-medium">Get User Information</h3>
                <p className="text-sm">
                  Check to show form to get user information (Update)
                </p>
                <div
                  className={`relative w-[2.7rem] rounded-3xl transition-all duration-200 cursor-pointer h-[1.3rem] border-2 flex items-center ${
                    show ? "justify-end" : "justify-start"
                  }`}
                  onClick={() => setShow(!show)}
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
                >
                  <div
                    className="w-[1.2rem]  h-[1.2rem] rounded-full flex items-center justify-center border-[.1rem]  border-white cursor-pointer "
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
                  >
                    {show ? (
                      <IoIosCheckmark className="h-5 w-5 text-white" />
                    ) : (
                      <IoIosClose className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </label>
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md "
              >
                <h3 className="text-base font-medium">Title</h3>
                <p className="text-sm">Title to be shown in the chat window</p>
                <input
                  type="text"
                  placeholder="Enter your chatbot title here."
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="py-2 px-2 border-none shadow-md focus:shadow-gray-300 dark:focus:shadow-gray-700 rounded-md outline-none focus:bg-gray-200 dark:focus:bg-gray-300 focus:text-black  "
                  required
                />
              </label>
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md  "
              >
                <h3 className="text-base font-medium">Welcome Message</h3>
                <p className="text-sm">
                  This will be shown as the first message from bot when a new
                  chat begins. Leave it empty if you want to disab
                </p>
                <input
                  type="text"
                  placeholder="Hi, How can I help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="py-2 px-2 border-none shadow-md focus:shadow-gray-300 dark:focus:shadow-gray-700 rounded-md outline-none focus:bg-gray-200 dark:focus:bg-gray-300 focus:text-black "
                  required
                />
              </label>
              {/* Questions */}
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md  "
              >
                <h3 className="text-base font-medium">Default Questions</h3>
                <p className="text-sm">
                  Enhance your experience! By adding default questions.
                </p>

                {defaultQuestions.map((question, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    className="py-2 px-2 border-none shadow-md dark:text-white focus:shadow-gray-300 dark:focus:shadow-gray-700 rounded-md outline-none focus:bg-gray-300 dark:focus:bg-gray-500 text-black "
                    required
                  />
                ))}

                <button
                  type="button"
                  onClick={addInputField}
                  className="py-2 px-4 sidebtn text-white rounded-md "
                >
                  + Add Question
                </button>
              </label>
              {/* -------------Color------- */}
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md  "
              >
                <h3 className="text-base font-medium">Bot Color</h3>
                <p className="text-sm">
                  This color will be applied to your bot when displayed in the
                  chat window. Click on the color input to choose your preferred
                  header color.
                </p>
                <input
                  type="color"
                  placeholder="Hi, How can I help you today?"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  className="py-1 px-2 border-none shadow-md w-[3rem] rounded-md "
                  required
                />
              </label>
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md "
              >
                <h3 className="text-base font-medium">Chatbot Avatar</h3>
                <p className="text-sm">
                  Add your avatar profile image to display in the chat window.
                  Leave empty if you don&apos;t want an avatar.
                </p>
                <input
                  type="file"
                  id="botAvatar"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="py-1 px-2 border-none shadow-md hidden "
                  required
                />
                <div className="flex items-center justify-start gap-4">
                  <div className=" relative w-[3rem] h-[3rem] rounded-md border border-gray-300  shadow-md shadow-gray-900/50 hover:shadow-xl cursor-pointer  filter drop-shadow-md ">
                    <Image
                      src={
                        avatar
                          ? URL.createObjectURL(avatar)
                          : `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/bot-avatar/${assistantId}`
                      }
                      fill
                      // objectFit="fill"
                      alt="avatar"
                      className="rounded-md shadow-md border border-zinc-300"
                    />
                  </div>
                  <label
                    htmlFor="botAvatar"
                    className="btn1 py-2 px-4 mb-4 shadow-md  shadow-gray-300 hover:shadow-xl cursor-pointer rounded-md  filter drop-shadow-md"
                  >
                    {avatar ? (
                      <MdOutlinePublishedWithChanges className="h-5 w-5" />
                    ) : (
                      <FiUploadCloud className="h-5 w-5" />
                    )}
                  </label>
                </div>
              </label>

              {/* User Avatar */}
              <label
                htmlFor=""
                className="flex flex-col gap-2 shadow-md py-3 px-2 border border-zinc-200 rounded-md "
              >
                <h3 className="text-base font-medium">User Avatar</h3>
                <p className="text-sm">
                  Add your avatar image to display in the chat window. Leave
                  empty if you don&apos;t want an avatar.
                </p>
                <input
                  type="file"
                  id="userAvatar"
                  onChange={(e) => setUserAvatar(e.target.files[0])}
                  className="py-1 px-2 border-none shadow-md hidden "
                  required
                />
                <div className="flex items-center justify-start gap-4">
                  <div className=" relative w-[3rem] h-[3rem] rounded-md border border-gray-300  shadow-md shadow-gray-900/50 hover:shadow-xl cursor-pointer  filter drop-shadow-md ">
                    <Image
                      src={
                        userAvatar
                          ? URL.createObjectURL(userAvatar)
                          : `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/bot/user-avatar/${assistantId}`
                      }
                      fill
                      // objectFit="fill"
                      alt="avatar"
                      className="rounded-md shadow-md border border-zinc-300"
                    />
                  </div>
                  <label
                    htmlFor="userAvatar"
                    className="btn1 py-2 px-4 shadow-md mb-4  shadow-gray-300 hover:shadow-xl cursor-pointer rounded-md  filter drop-shadow-md"
                  >
                    {avatar ? (
                      <MdOutlinePublishedWithChanges className="h-5 w-5" />
                    ) : (
                      <FiUploadCloud className="h-5 w-5" />
                    )}
                  </label>
                </div>
              </label>

              <div className="w-full flex items-center justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!bot || loading}
                  className={`btn1 flex items-center justify-center gap-1 rounded-md py-2 px-4 cursor-pointer shadow-md ${
                    loading && "pointer-events-none animate-pulse"
                  }`}
                  title={
                    !bot
                      ? "First create bot setting in appearance tab then update here"
                      : "Update Bot Information"
                  }
                >
                  Update{" "}
                  {loading && (
                    <RiLoader3Line className="h-5 w-5 animate-spin " />
                  )}
                </button>
              </div>
            </form>
          </div>
          {/* ------- */}
          <div className="  ">
            <div className="rounded-md shadow-md overflow-hidden border border-zinc-300">
              <div
                className={"w-full h-[3rem] flex gap-2 items-center py-2 px-2"}
                style={{ backgroundColor: colors }}
              >
                {avatar ? (
                  <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
                    <Image
                      src={URL.createObjectURL(avatar)}
                      height={32}
                      width={32}
                      alt="avatar"
                    />
                  </div>
                ) : (
                  <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
                    <Image
                      src="/logo1.jpeg"
                      width={32}
                      height={32}
                      alt="avatar"
                    />
                  </div>
                )}
                <h3 className="text-white text-xl font-semibold">
                  {botName ? botName : "ChatDoc.ai"}
                </h3>
              </div>
              <div className=" relative w-full h-[25rem] py-3 px-2">
                <div className="flex flex-col items-start gap-1 py-1 px-2 border max-w-[70%] shadow-md rounded-md  border-zinc-100 shadow-gray-400 dark:shadow-gray-600 filter drop-shadow-md">
                  <Image src="/ChatbotF.png" width={32} height={32} alt="bot" />

                  <p className="">
                    {message ? message : "Hi, How can I help you today?"}
                  </p>
                </div>
                <div
                  className={`flex mt-2  float-right flex-col items-start gap-1 py-1 px-2 border border-zinc-100 shadow-gray-400 dark:shadow-gray-600 filter drop-shadow-md shadow-md rounded-md max-w-[70%] `}
                  style={{ background: `${colors}` }}
                >
                  <div className="w-full flex items-center justify-end">
                    <div className="relative w-[2rem] h-[2rem] rounded-full ">
                      <Image
                        src={
                          userAvatar
                            ? URL.createObjectURL(userAvatar)
                            : "/user1.webp"
                        }
                        fill
                        // objectFit="fill"
                        alt="User"
                        className="flex float-right  rounded-full bg-zinc-300 border"
                      />
                    </div>
                  </div>

                  <p className="text-gray-100">
                    Hi,I am fine. What's about you?
                  </p>
                </div>
                {/* Questions */}
                <div className="absolute bottom-1 left-1 flex flex-col gap-1">
                  {defaultQuestions?.map((question, index) => (
                    <div
                      key={index}
                      className="w-fit py-1 px-2 rounded-md shadow-gray-200 dark:shadow-gray-700 shadow-md cursor-pointer "
                      style={{ background: colors ? `${colors}` : "fuchsia" }}
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-2 w-full h-[3rem] px-1 mt-1 
          shadow-md border border-zinc-300 rounded-md "
            >
              <input
                type="url"
                placeholder="Enter your message..."
                className="w-full py-2 px-2 disabled"
                disabled
              />
              <button disabled className="rounded-md btn1 h-[94%] px-4 mb-4">
                <IoSend size="18" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-[50vh]">
          <Image src="/empty.png" alt="Setting" height={270} width={270} />
          <p className="text-[17px] text-center">
            First Add Share / Embeded Assistant layout settings in Appearance,
            then Assistant settings is ready to Update{" "}
          </p>
          <button
            className="flex items-center mt-3 gap-1 text-white rounded-3xl shadow-md cursor-pointer py-2 px-4 shadow-gray-300 dark:shadow-gray-800"
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
            title="Go to Assistant Layout Appearance"
            onClick={() => router.push(`/appearance/${assistantId}`)}
          >
            Go to Appearance <GoArrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
