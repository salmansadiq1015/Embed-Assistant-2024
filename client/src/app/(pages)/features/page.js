"use client";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function page() {
  const { theme } = useTheme();
  const { color } = useAssistant();

  return (
    <>
      <Header />
      <div className="w-full min-h-screen pt-[2rem] pb-[3rem] px-2 sm:px-6">
        <div className="flex flex-col gap-2 ">
          <h1
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
            Discover Features
          </h1>
          <span className="text-[15px] font-medium text-center">
            Discover powerful automation tools, customizable chatbots, and
            seamless document interaction to streamline your business
            operations.
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem]">
          <div className="flex items-center justify-center">
            <Image
              src="/features.png"
              alt="FAQ"
              width={550}
              height={600}
              style={{
                filter:
                  "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
          <div className=" flex flex-col gap-4 py-4 px-3 sm:px-4 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
            <h3 className="text-2xl sm:text-3xl font-semibold">
              Here are the features of the AI Powered Chatbots Trained On Your
              Data website:
            </h3>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                1. Fully Automated AI Chatbot Creation:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Create a fully automated AI chatbot similar to ChatGPT without
                any coding skills required. Quickly set up a chatbot to assist
                you or your customers in getting fast answers about your
                business.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                2. Document Interaction:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Link Chatdoc.ai chatbot to your website and connect with your
                chat AI companion. Interact with documents such as Docs, PDFs,
                CSVs, PPTX files, and more directly within the chat interface.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                3. Document Information Extraction:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Locate, extract, and summarize information from your documents
                using the ChatGPT-based document AI chatbot. Accelerate your
                document experience by easily accessing relevant information.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                4. User-Friendly Interface:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Begin your chat session within minutes with a user-friendly
                interface. Interact with PDFs, SVGs, TXT documents, and more
                seamlessly, ensuring quick and efficient communication.
              </p>
            </div>

            {/* End */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[2.5rem]">
          <div className="flex flex-col gap-4 py-4 px-3 sm:px-4 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                5. Easy Setup Process:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Register for an account to access the platform's full range of
                features and benefits. Upload your documents securely within
                minutes and initiate your queries effortlessly. Customizable
                Chatbots: Customize your chatbot with your own avatar, text
                colors, and chatbot bubble to match your branding. Choose from
                different language models, including GPT-3.5-turbo & GPT-4,
                based on your needs.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                6. No Code Platform:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Easily embed the chatbot anywhere you need by simply copying and
                pasting the ready-made code. No coding skills required to
                integrate the chatbot into your website or platform.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                7. Controlled Access:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Choose to share your chatbot publicly by embedding it or keep it
                for private use within your account. Maintain control over who
                can access and interact with your chatbot.
              </p>
            </div>
            {/*  */}
            <div className=" flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold">
                8. Scalable Automation:
              </h3>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Scale automation up and down instantly to manage fluctuations in
                customer inquiries and demands. Ensure consistent customer
                experience and support, empowering your business to thrive
                amidst dynamic interactions.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/feature2.png"
              alt="FAQ"
              width={550}
              height={600}
              style={{
                filter:
                  "brightness(1.1) contrast(1.1) drop-shadow(.3px .3px 10px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
