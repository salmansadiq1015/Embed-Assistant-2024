"use client";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import React from "react";

export default function Privacy() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <>
      <Header />
      <div className="w-full min-h-[95vh] flex flex-col gap-4  pb-[1rem]">
        <div className="relative w-full h-[40vh] flex items-center justify-center privacy">
          <h1
            className=" relative text-3xl sm:text-5xl font-bold z-10"
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
            Privacy Policy
          </h1>
        </div>
        <div className="px-1 sm:px-8">
          <div className="px-4 sm:px-10 py-8 font-medium bg-gray-100 dark:bg-gray-800 rounded-xl translate-y-[-4rem]">
            <h4 className="text-xl sm:text-2xl font-semibold ">
              Last updated: February 28, 2024
            </h4>
            <div className="flex flex-col gap-4 mt-[2rem]">
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                This Privacy Policy describes how AI Powered Chatbots Trained On
                Your Data ("ChatDoc.ai", "we", "us", or "our") collects, uses,
                and shares your information when you use our website (the
                "Service") or interact with our AI chatbots.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                By accessing or using the Service, you agree to the collection
                and use of information in accordance with this Privacy Policy.
                If you do not agree with this Privacy Policy, please do not use
                the Service.
              </p>
              <b className="text-[19px] font-semibold">
                1. Information We Collect
              </b>
              <b className="text-[18px] font-semibold">
                {" "}
                1.1 Personal Information
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We may collect personal information that you provide to us when
                you register for an account, such as your name, email address,
                and contact information. We may also collect payment information
                when you purchase a subscription or make a transaction through
                the Service.
              </p>
              <b className="text-[18px] font-semibold"> 1.2 Chat History</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We collect and store the conversations that take place within
                our chatbots, including any personal information or data shared
                during these interactions.
              </p>
              <b className="text-[18px] font-semibold"> 1.3 Usage Data</b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We automatically collect information about how you use the
                Service, including your interactions with our chatbots, the
                documents you upload, and your preferences.
              </p>
              <b className="text-[18px] font-semibold">
                {" "}
                1.4 Cookies and Tracking Technologies
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We use cookies and similar tracking technologies to track your
                activity on the Service and improve your experience. You can
                configure your browser to refuse all cookies or to indicate when
                a cookie is being sent. However, if you do not accept cookies,
                you may not be able to use some portions of the Service.
              </p>
              <b className="text-[19px] font-semibold">
                1. How We Use Your Information
              </b>
              <span className="text-[17px] text-gray-800 dark:text-gray-200">
                We use the information we collect for various purposes,
                including to:
              </span>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <ul className="flex flex-col gap-1 list-disc pl-4">
                  <li>Provide, operate, and maintain the Service</li>
                  <li>Improve, personalize, and optimize the Service</li>
                  <li>
                    Communicate with you, including sending you updates,
                    newsletters, and promotional materia
                  </li>
                  <li>Process transactions and payments</li>
                  <li>Protect the security of the Service and our users</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </p>
              {/*  */}
              <b className="text-[19px] font-semibold">
                2. How We Share Your Information
              </b>
              <span className="text-[17px] text-gray-800 dark:text-gray-200">
                We may share your information with third parties in the
                following circumstances:
              </span>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                <ul className="flex flex-col gap-1 list-disc pl-4">
                  <li>
                    With service providers who help us operate the Service
                  </li>
                  <li>
                    With our affiliates, subsidiaries, and parent companies
                  </li>
                  <li>With your consent or at your direction</li>
                  <li>
                    To comply with legal obligations or protect our rights
                  </li>
                  <li>
                    In connection with a merger, acquisition, or sale of assets
                  </li>
                </ul>
              </p>
              <b className="text-[19px] font-semibold">1. Data Retention</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We will retain your information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
              </p>
              <b className="text-[19px] font-semibold">2. Security </b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We take reasonable measures to protect your information from
                unauthorized access, use, or disclosure. However, no method of
                transmission over the internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>
              <b className="text-[19px] font-semibold">3. Children's Privacy</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                The Service is not intended for children under the age of 13,
                and we do not knowingly collect personal information from
                children under the age of 13. If you are a parent or guardian
                and believe that your child has provided us with personal
                information, please contact us immediately.
              </p>
              <b className="text-[19px] font-semibold">
                4. Changes to This Privacy Policy
              </b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                We may update this Privacy Policy from time to time, and any
                changes will be effective immediately upon posting the revised
                policy on this page. We encourage you to review this Privacy
                Policy periodically for any updates.
              </p>
              <b className="text-[19px] font-semibold">5. Contact Us</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at{" "}
                <b className="font-semibold">infraDev.cloudSupport@gmail.com</b>
                .
              </p>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                This Privacy Policy was last updated on{" "}
                <b className="font-semibold">February 28, 2024</b> .
              </p>

              {/* End */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
