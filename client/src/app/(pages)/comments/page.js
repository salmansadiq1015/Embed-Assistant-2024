"use client";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import React, { useEffect, useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useAssistant, useAuth } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import Loader from "@/app/utils/Loader";
import { FiStar } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

// Post Comment
const Star = ({ selected, onClick }) => {
  return selected ? (
    <BiSolidStar onClick={onClick} size={26} color="red" />
  ) : (
    <FiStar onClick={onClick} size={26} color="red" />
  );
};

export default function page() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [auth] = useAuth();
  const userId = auth?.user?.id;
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [posting, setPosting] = useState(false);

  // ----------Rating----------->
  const handleStarClick = (starCount) => {
    setStars(starCount);
  };

  const renderPostStars = () => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      starArray.push(
        <Star
          key={i}
          selected={i <= stars}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return starArray;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-green-600 " size="25" />
        ) : (
          <FaRegStar key={i} className="text-zinc-500" size="25" />
        )
      );
    }
    return stars;
  };

  //   Get All Comments
  const getComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/comment/get-all-comment`
      );
      if (data) {
        setComments(data?.comments);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  //   Post Comment
  const postComments = async () => {
    if (!userId) {
      return setOpen(true), toast.error("Login first!");
    }
    setPosting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/comment/create-comment`,
        { userId: userId, rating: stars, comment: comment }
      );
      getComments();
      setShow(false);
      setText("");
      setStars(0);
      toast.success("Thank you for your feedback!", { duration: 3000 });
      setPosting(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 2000 });
      setPosting(false);
    }
  };

  const loaderProp = ({ src }) => {
    return src;
  };

  return (
    <>
      <Header open={open} setOpen={setOpen} />
      <div className="relative w-full min-h-screen pt-[2rem] pb-[3rem] px-2 sm:px-6">
        <div className="absolute top-3 right-2 cursor-pointer">
          <span>
            {!show ? (
              <FaRegCommentDots
                className="h-7 w-7 cursor-pointer animate-bounce"
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
                onClick={() => setShow(!show)}
              />
            ) : (
              <IoClose
                className="h-7 w-7 cursor-pointer animate-bounce"
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
                onClick={() => setShow(!show)}
              />
            )}
          </span>
          {show && (
            <div className=" absolute top-[1.5] z-[10] right-5 w-[18rem] sm:w-[23rem]  py-3 px-3 rounded-md shadow-md cursor-pointer dark:bg-gray-800 bg-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-center">
                Share your Feedback
              </h3>
              <div className="w-full flex flex-col gap-3">
                <textarea
                  className=" rounded-md shadow-md shadow-gray-300 dark:shadow-gray-700 w-full h-[8rem] resize-none py-2 px-2 border-2 border-gray-300"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder=" Share your Feedback. Your feedback is invaluable to help us improve"
                />
                <div className="flex items-center gap-3 mt-2 ml-3">
                  <span className="text-lg flex items-center gap-3 font-medium">
                    {renderPostStars()}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end mt-3">
                <button
                  className="py-2 px-4 flex items-center justify-center gap-1 rounded-md cursor-pointer text-white shadow-md"
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
                  onClick={postComments}
                >
                  Post{" "}
                  {posting && (
                    <BiLoaderCircle className="animate-spin h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        <h1
          className="text-4xl sm:text-3xl font-semibold sm:font-bold text-center"
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
          What do our users says?
        </h1>
        {loading ? (
          <div className="w-full">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[3rem]">
            {comments.map((c) => (
              <div
                className=" box1 py-4 px-4 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 cursor-pointer"
                key={c._id}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-[3.5rem] h-[3.5rem] rounded-full border shadow-md">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/user-avatar/${c?.userId}`}
                      fill
                      className="rounded-full"
                      loader={loaderProp}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[19px] font-medium">{c?.userName}</h3>
                    <p className="text-[14px] flex items-center font-medium">
                      <span>{c?.userEmail.slice(0, 5)}</span>
                      <span>*******</span>
                      <span>{c?.userEmail.slice(14, 25)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-[1rem] ">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium"></span>
                    {renderStars(c?.rating)}
                  </div>
                  <FaQuoteLeft
                    className="h-7 w-7 mt-3 "
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
                  <p>{c?.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
