"use client";
import Appearance from "@/app/components/Appearance";
import Layout from "@/app/components/Layout/Layout";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";

import React from "react";

export default function Appearances({ params }) {
  const assistantId = params.id;
  const { color } = useAssistant();
  const { theme } = useTheme();

  return (
    <Layout>
      <div className="w-full min-h-screen py-[1rem] px-3 ">
        <div className=" flex items-center justify-between gap-2">
          <div className="flex flex-col gap-4">
            <h1
              className="text-3xl sm:text-4xl  font-bold"
              style={{
                color:
                  theme === "dark"
                    ? color
                      ? color
                      : "#4facfe"
                    : color
                    ? color
                    : "#047857",
                textShadow: "-.3px 1px 0px #ccc",
              }}
            >
              Appearance
            </h1>
            <p className=" text-sm">
              You can customise the look and feel of your chatbot interface
              here.
            </p>
          </div>
        </div>
        <div
          className="w-full mt-6"
          style={{ width: "100%", height: "1px", background: "#ccc" }}
        ></div>
        <Appearance assistantId={assistantId} />
      </div>
    </Layout>
  );
}
