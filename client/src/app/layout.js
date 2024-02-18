"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { AssistantProvider, AuthProvider } from "./context/authContext";
import "react-loading-skeleton/dist/skeleton.css";
import { GoGear } from "react-icons/go";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ColorPicker from "./utils/ColorPicker";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";

// import ReactGA from "react-ga";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({ children }) {
  const [right, setRight] = useState(false);
  const [pathname, setPathName] = useState("");

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const path = pathArray[1];
    setPathName(path);

    // exlint-disable-next-line
  }, []);

  // Track Users

  // useEffect(() => {
  //   ReactGA.initialize("your-GA-tracking-code");
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  //   alert(navigator.userAgent);
  // }, []);

  return (
    <html lang="en">
      <body
        className={`${poppins.variable}, ${josefin.variable}, bg-no-repeat !bg-white
         dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <AuthProvider>
          <AssistantProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <main className="min-h-[calc(100vh-3.7rem)] w-full">
                {children}
                {pathname !== "assistant" && (
                  <div
                    className={`fixed z-[199] ${
                      right ? "right-[4.5rem]" : "right-[0rem]"
                    } top-[40%] w-[1.7rem] h-[1.5rem] rounded-tl-md  filter drop-shadow-md active:drop-shadow-sm rounded-bl-md shadow-md flex items-center justify-center`}
                    onClick={() => setRight(!right)}
                  >
                    {right ? (
                      <IoCloseCircleOutline className="w-6 h-6  text-gray-900 dark:text-white " />
                    ) : (
                      <GoGear className=" w-4 h-4 text-gray-900 dark:text-white rotate " />
                    )}
                  </div>
                )}
                <div
                  className={`fixed  top-[40%] ${
                    right ? "right-0" : "right-[-7.5rem]"
                  } z-[100] w-[7rem] h-[10rem] shadow-gray-200 overflow-hidden bg-gray-300/10 dark:shadow-sky-400 filter drop-shadow-md  rounded-tl-md rounded-bl-md shadow-sm border`}
                >
                  <div className=" mt-2">
                    <ColorPicker setRight={setRight} />
                  </div>
                </div>
              </main>
              <Toaster position="bottom-center" reverseOrder={false} />
            </ThemeProvider>
          </AssistantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
