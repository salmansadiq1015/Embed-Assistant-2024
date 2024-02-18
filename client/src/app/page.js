"use client";
import React, { useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Section1 from "./components/Home/Section1";
import Footer from "./components/Footer/Footer";
import PreLoader from "./components/PreLoader";
import Header from "./components/Header/Header";

import Section2 from "./components/Home/Section2";
import Section3 from "./components/Home/Section3";
import Section4 from "./components/Home/Section4";
import Section5 from "./components/Home/Section5";
import Section6 from "./components/Home/Section6";
import Section7 from "./components/Home/Section7";
import Section8 from "./components/Home/Section8";
import Section9 from "./components/Home/Section9";
import Section10 from "./components/Home/Section10";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  // Pre Loader
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full h-screen">
          <PreLoader />
        </div>
      ) : (
        <>
          <Header open={open} setOpen={setOpen} />
          <>
            <div className="fixed bottom-5 right-2 z-[444] ">
              {isShow && (
                <div className="absolute bottom-3 right-2">
                  <iframe
                    style={{
                      width: "340px",
                      height: "400px",
                      borderRadius: ".5rem",
                    }}
                    src="http://localhost:3000/assistant/asst_a2unUaZaJdcvUQ8lAApJ1kcr"
                  ></iframe>
                </div>
              )}
              {!isShow ? (
                <div
                  className="relative z-[999] w-[2.7rem] bg-white h-[2.7rem] rounded-full overflow-hidden animate-bounce shadow-md shadow-gray-300 dark:shadow-gray-700 cursor-pointer hover:animate-none"
                  onClick={() => setIsShow(true)}
                  style={{ display: isShow && "none" }}
                >
                  <Image src="/botbtn (1).png" alt="BotBtn" fill />
                </div>
              ) : (
                <div className="fixed bottom-2 right-2 z-[999]">
                  <IoCloseCircle
                    className="text-3xl rounded-full shadow-md cursor-pointer"
                    onClick={() => setIsShow(false)}
                    style={{ color: "orangered" }}
                  />
                </div>
              )}
            </div>
          </>
          <div className="w-[full] overflow-x-hidden ">
            <Heading
              title="ChatDoc.ai"
              description="ChatDoc.ai is a plateform for business, teachers, professionals ,students to upload their knowledge documents and chat this documents"
              keywords="ChatDoc.ai, MERN, SASS,Redux, Context API, education, learning, , JavaScript, React, Node, Express, MongoDB, Next JS, TypeScript, CSS"
            />

            {/* Section1 */}
            <Section1 setOpen={setOpen} />

            {/* Section 2 */}
            <Section2 />

            {/* Section 3 */}
            <Section3 />

            {/* Section 4 */}
            <Section4 />

            {/* Section 5 */}
            <Section5 setOpen={setOpen} />

            {/* Section 6 */}
            <Section6 />

            {/* Section 7 */}
            <Section7 />

            {/* Section 8 */}
            <Section8 />

            {/* Section 9 */}
            <Section9 />

            {/* Section 10 */}
            {/* <Section10 /> */}

            {/* Footer */}
            <div className="w-full">
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}
