"use client";

import "./contact.css";
import Header from "@/app/components/Header/Header";
import React, { useState } from "react";
import Footer from "@/app/components/Footer/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useAssistant } from "@/app/context/authContext";
import { TbLoader } from "react-icons/tb";

export default function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [loading, setLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/contact/create-contact`,
        {
          name,
          email,
          phone,
          message,
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setLoading(false);
      toast.success("Message send successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-[100vh]: mt-6 pb-[3rem] sm:px-[1.5rem] px-[.5rem]">
        <div className="">
          <div className="contact-header">
            <div className="flex flex-col gap-1">
              <h3
                className="text-3xl sm:text-4xl font-semibold sm:font-bold text-center"
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
                Connect With Us: Your Questions, Our Answers
              </h3>
              <p className="text-[15px] font-medium text-center">
                Embark on a seamless journey with us! Reach out and let us
                transform your inquiries into solutions with our dedicated
                customer care.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-[2.5rem]  ">
            <div className="">
              <Image
                src="/contact.png"
                alt="FAQ"
                width={600}
                height={600}
                style={{
                  filter:
                    "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <form
                onSubmit={handleForm}
                className="flex flex-col gap-3 py-4 px-3 rounded-md border-2 border-gray-400 shadow-md "
              >
                <div className="inputBox w-full">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent border-2 border-gray-300 text-gray-900 dark:text-white"
                  />
                  <span>Full Name</span>
                </div>
                <div className="inputBox">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-2 border-gray-300 text-gray-900 dark:text-white"
                  />
                  <span>Email Address</span>
                </div>
                <div className="inputBox">
                  <input
                    type="number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-transparent border-2 border-gray-300 text-gray-900 dark:text-white"
                  />
                  <span>Phone Number</span>
                </div>

                <div className="inputBox">
                  <textarea
                    type="number"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-transparent border-2 border-gray-300 text-gray-900 dark:text-white"
                  />
                  <span>Message</span>
                </div>
                <div className="submit-button">
                  <button
                    type="submit"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                      background: theme ? color : "#4a90e2",
                      padding: ".4rem 1rem",
                    }}
                  >
                    Submit{" "}
                    {loading && (
                      <TbLoader className="animate-spin w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
