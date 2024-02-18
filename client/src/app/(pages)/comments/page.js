"use client";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BiSolidStar } from "react-icons/bi";
import { FiStar } from "react-icons/fi";
import { useParams } from "next/navigation";
import { useAssistant, useAuth } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import Loader from "@/app/utils/Loader";

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

  // ----------Rating----------->
  const handleStarClick = (starCount) => {
    setStars(starCount);
  };

  const renderStars = () => {
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
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/comment/create-comment`,
        { userId: userId, rating: stars, comment: comment }
      );
      if (data?.success) {
        toast.success("Thank you for your feedback!", { duration: 3000 });
        setText("");
        setStars(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 2000 });
    }
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen pt-[2rem] pb-[3rem] px-2 sm:px-6">
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
                    />
                  </div>
                  <h3 className="text-[19px] font-medium">{c?.userName}</h3>
                </div>
                <div className="flex flex-col mt-[1rem] ">
                  <FaQuoteLeft
                    className="h-7 w-7 "
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
