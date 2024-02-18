"use client";

import React, { useState } from "react";
import { useAssistant } from "../context/authContext";

export default function ColorPicker() {
  const { setColor } = useAssistant();

  const handleClick = (color) => {
    setColor(color);
    localStorage.setItem("color", color);
  };

  return (
    <div className="fixed  z-[111]">
      <div className="w-full mt-[2rem] pl-[.6rem]  grid grid-cols-3 gap-3  ">
        <div
          className="bg-sky-600 rounded-full  shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("rgb(0, 144, 216)")}
        />
        <div
          className="bg-emerald-600 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("rgb(1, 115, 1)")}
        ></div>
        <div
          className="bg-amber-600 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("#d97706")}
        ></div>
        <div
          className="bg-green-600 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("rgb(216, 0, 79)")}
          style={{ background: "rgb(216, 0, 133)" }}
        ></div>
        <div
          className="bg-orange-600 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("orangered")}
        ></div>
        <div
          className="bg-teal-600 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("darkcyan")}
        ></div>
        <div
          className="bg-yellow-900 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("#c53030")}
        ></div>
        <div
          className="bg-fuchsia-600 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("rgb(162, 0, 216)")}
        ></div>
        <div
          className="bg-lime-500 rounded-full shadow-md filter drop-shadow-md active:drop-shadow-sm  cursor-pointer w-[1.5rem] h-[1.5rem]"
          onClick={() => handleClick("rgb(32, 216, 0)")}
        ></div>
      </div>
    </div>
  );
}
