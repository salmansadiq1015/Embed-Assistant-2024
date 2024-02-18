import Image from "next/image";
import React from "react";

export default function EmptyModel({ title, upload }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh]">
      <div className="flex flex-col gap-4">
        <div className="w-[13rem] h-[13rem] relative">
          <Image src="/empty.png" alt="Empty" layout="fill" objectFit="fill" />
        </div>
        <p className="text-xl font-semibold text-center">
          {upload} Your First {title}!
        </p>
      </div>
    </div>
  );
}
