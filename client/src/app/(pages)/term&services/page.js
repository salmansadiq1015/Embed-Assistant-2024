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
        <div className="relative w-full h-[40vh] flex items-center justify-center term">
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
            Terms & Conditions
          </h1>
        </div>
        <div className="px-1 sm:px-8">
          <div className="px-4 sm:px-10 py-8 font-medium bg-gray-100 dark:bg-gray-800 rounded-xl translate-y-[-4rem]">
            <h4 className="text-xl sm:text-2xl font-semibold ">
              Last updated: February 28, 2024
            </h4>
            <div className="flex flex-col gap-4 mt-[2rem]">
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Please read these Terms and Conditions ("Terms", "Terms and
                Conditions") carefully before using the AI Powered Chatbots
                Trained On Your Data website (the "Service") operated by
                ChatDoc.ai ("us", "we", or "our").
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Your access to and use of the Service is conditioned on your
                acceptance of and compliance with these Terms. These Terms apply
                to all visitors, users, and others who access or use the
                Service.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                By accessing or using the Service, you agree to be bound by
                these Terms. If you disagree with any part of the Terms, then
                you may not access the Service.
              </p>
              <b className="text-[19px] font-semibold">1. Use License</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Permission is granted to temporarily download one copy of the
                materials (information or software) on ChatDoc.ai's website for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="flex flex-col gap-1 list-disc pl-4">
                <li>Modify or copy the materials; </li>
                <li>
                  Use the materials for any commercial purpose, or for any
                  public display (commercial or non-commercial);
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on ChatDoc.ai's website;
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials;
                </li>
                <li>
                  Or transfer the materials to another person or "mirror" the
                  materials on any other server.
                </li>
              </ul>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                This license shall automatically terminate if you violate any of
                these restrictions and may be terminated by ChatDoc.ai at any
                time. Upon terminating your viewing of these materials or upon
                the termination of this license, you must destroy any downloaded
                materials in your possession whether in electronic or printed
                format.
              </p>

              {/*  */}
              <b className="text-[18px] font-semibold"> 1.1 Disclaimer</b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                The materials on ChatDoc.ai's website are provided on an 'as is'
                basis. ChatDoc.ai makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                Further, ChatDoc.ai does not warrant or make any representations
                concerning the accuracy, likely results, or reliability of the
                use of the materials on its website or otherwise relating to
                such materials or on any sites linked to this site
              </p>
              {/*  */}
              <b className="text-[18px] font-semibold"> 1.2 Limitations</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                In no event shall ChatDoc.ai or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on ChatDoc.ai's website,
                even if ChatDoc.ai or a ChatDoc.ai authorized representative has
                been notified orally or in writing of the possibility of such
                damage. Because some jurisdictions do not allow limitations on
                implied warranties, or limitations of liability for
                consequential or incidental damages, these limitations may not
                apply to you.
              </p>
              <b className="text-[18px] font-semibold">
                {" "}
                1.3 Accuracy of materials
              </b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                The materials appearing on ChatDoc.ai's website could include
                technical, typographical, or photographic errors. ChatDoc.ai
                does not warrant that any of the materials on its website are
                accurate, complete, or current. ChatDoc.ai may make changes to
                the materials contained on its website at any time without
                notice. However, ChatDoc.ai does not make any commitment to
                update the materials.
              </p>
              <b className="text-[18px] font-semibold"> 1.4 Links</b>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                ChatDoc.ai has not reviewed all of the sites linked to its
                website and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by ChatDoc.ai of the site. Use of any such linked
                website is at the user's own risk.
              </p>
              <b className="text-[19px] font-semibold">1.5 Modifications</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                ChatDoc.ai may revise these terms of service for its website at
                any time without notice. By using this website you are agreeing
                to be bound by the then current version of these terms of
                service.
              </p>

              <b className="text-[19px] font-semibold">1.6 Governing Law</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                These terms and conditions are governed by and construed in
                accordance with the laws of Pakisan and you irrevocably submit
                to the exclusive jurisdiction of the courts in that State or
                location.
              </p>

              <b className="text-[19px] font-semibold">5. Contact Us</b>
              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                If you have any questions about these Terms, please contact us
                at please contact us at{" "}
                <b className="font-semibold">infraDev.cloudSupport@gmail.com</b>
                .
              </p>

              <p className="text-[17px] text-gray-800 dark:text-gray-200">
                These Terms were last updated on
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
