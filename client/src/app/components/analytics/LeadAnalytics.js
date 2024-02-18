"use client";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import { useTheme } from "next-themes";
import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LeadAnalytics() {
  const { leadAnalytic, loading, color } = useAssistant();
  const { theme } = useTheme();

  const analyticsData = [];
  leadAnalytic &&
    leadAnalytic?.map((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full  h-[100%] flex items-center justify-center ">
          <ResponsiveContainer width="100%" height="90%">
            <ComposedChart
              data={analyticsData}
              width={600}
              height={400}
              margin={{
                top: 10,
                right: 5,
                bottom: 10,
                left: 5,
              }}
            >
              <CartesianGrid
                stroke={
                  theme === "dark"
                    ? color
                      ? color
                      : "#4facfe"
                    : color
                    ? color
                    : "#047857"
                }
              />
              <XAxis
                dataKey="name"
                label={{
                  value: "Pages",
                  position: "insideBottomRight",
                  offset: 0,
                }}
                scale="band"
              />
              <YAxis
                label={{
                  value: "Index",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#4d62d9"
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
              <Bar
                dataKey="count"
                barSize={20}
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
              <Line
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
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
