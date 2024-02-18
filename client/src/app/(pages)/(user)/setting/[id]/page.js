"use client";
import Layout from "@/app/components/Layout/Layout";
import Settings from "@/app/components/Settings";
import { useAssistant } from "@/app/context/authContext";
import { useTheme } from "next-themes";
import React from "react";

export default function Setting({ params }) {
  const assistantId = params.id;
  const { theme } = useTheme();
  const { color } = useAssistant();
  return (
    <Layout>
      <div className="">
        <div className="flex flex-col gap-4 mt-2 px-2 ">
          <h1
            className="text-3xl sm:text-4xl font-bold"
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
            Settings / Update
          </h1>
          <p className=" text-sm">
            You can update the look and feel of your chatbot interface here.
          </p>
        </div>
        <div
          className="w-full mt-6"
          style={{ width: "100%", height: "1px", background: "#ccc" }}
        ></div>
        <Settings assistantId={assistantId} />
      </div>
    </Layout>
  );
}
