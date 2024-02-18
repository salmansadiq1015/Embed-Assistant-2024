"use client";
import AdminLayout from "@/app/components/Layout/AdminLayout";
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

export default function UserAnalytics() {
  const { theme } = useTheme();
  const { leadAnalytic, loading, color } = useAssistant();

  const analyticsData = [];
  leadAnalytic &&
    leadAnalytic?.map((item) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

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
                Lead Analytics
              </h1>
              <p className="text-[15px]">Last 12 months analytics data</p>
            </div>
            <hr className="my-3 h-[2px] bg-gray-300" />

            <div className="w-full h-[90%] flex items-center justify-center">
              <ResponsiveContainer width="90%" height="80%">
                <ComposedChart
                  data={analyticsData}
                  width={500}
                  height={400}
                  margin={{
                    top: 20,
                    right: 80,
                    bottom: 20,
                    left: 20,
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
