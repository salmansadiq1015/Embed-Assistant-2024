"use client";
import React from "react";
import "./loader.css";
import Typewriter from "typewriter-effect";

export default function PreLoader() {
  return (
    <div className="w-full min-h-screen flex text-center justify-center flex-col gap-4">
      <figure>
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
      <h1 className="text-2xl sm:text-4xl mt-[8rem] text-center text-green-900  dark:text-white font-bold">
        <Typewriter
          options={{
            strings: ["Welcome, To ChatDoc.ai"],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      {/* <h1>Welcome, To ChatDoc.ai</h1> */}
    </div>
  );
}
