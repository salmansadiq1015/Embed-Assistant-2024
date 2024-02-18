"use client";
import { useAssistant } from "@/app/context/authContext";
import Loader from "@/app/utils/Loader";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Label,
  YAxis,
} from "recharts";

export default function AssistantAnalytics() {
  const { assistAnalytic, loading } = useAssistant();

  const analyticsData = [];
  assistAnalytic &&
    assistAnalytic?.map((item) => {
      analyticsData.push({ name: item?.month, uv: item?.count });
    });

  const minValue = 0;
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="w-full  h-[100%] flex items-center justify-center ml-[-2rem]">
          <ResponsiveContainer width="100%" height="90%">
            <BarChart width={150} height={450} data={analyticsData}>
              <XAxis dataKey={"name"} interval="preserveStartEnd">
                <Label offset={0} position="insideBottom" />
              </XAxis>
              <Tooltip />
              <YAxis domain={[minValue, "auto"]} />
              <Bar dataKey="uv" fill={"rgb(0, 128, 255)"}>
                <Label dataKey="uv" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
