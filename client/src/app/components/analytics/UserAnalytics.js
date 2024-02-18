"use client";
import React from "react";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import { useTheme } from "next-themes";
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
  console.log("User Anal:", userAnalytic);

  const analyticsData = [];
  console.log("User AnalData:", analyticsData);
  userAnalytic &&
    userAnalytic?.map((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

  const minValue = 0;
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full  h-[100%] flex items-center justify-center ml-[-1rem]">
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart
              data={analyticsData}
              margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
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
      )}
    </>
  );
}
