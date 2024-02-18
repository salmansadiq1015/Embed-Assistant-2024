"use client";
import AdminLayout from "@/app/components/Layout/AdminLayout";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import axios from "axios";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function UserAnalytics() {
  const { theme } = useTheme();
  const { color, userAnalytic, loading } = useAssistant();

  const analyticsData = [];
  userAnalytic &&
    userAnalytic?.map((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

  const minValue = 0;
  return (
    <AdminLayout>
      <div className="w-full h-[89%]  py-7 px-3 sm:px-5 overflow-y-auto message">
        {loading ? (
          <Loader />
        ) : (
          <div className="h-full w-full">
            <div className="mt-3 flex flex-col gap-2">
              <h1
                className="text-2xl sm:text-3xl font-semibold "
                style={{
                  color:
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857",
                  textShadow: "-.1px 1px 0px #ccc",
                }}
              >
                User Analytics
              </h1>
              <p className="text-[15px]">Last 12 months analytics data</p>
            </div>
            <hr className="my-3 h-[2px] bg-gray-300" />

            <div className="w-full h-[90%] flex items-center justify-center">
              <ResponsiveContainer width="90%" height="80%">
                <AreaChart
                  data={analyticsData}
                  className="top-4 right-30 left-0 bottom-0"
                >
                  <XAxis dataKey={"name"} />
                  <YAxis domain={[minValue, "auto"]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke={
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }
                    fill={
                      theme === "dark"
                        ? color
                          ? color
                          : "#4facfe"
                        : color
                        ? color
                        : "#047857"
                    }
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
