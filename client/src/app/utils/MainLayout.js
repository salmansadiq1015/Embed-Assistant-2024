"use client";

import React, { useState } from "react";
import Header from "../components/Header/Header";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <main className="w-full h-full">{children}</main>
    </div>
  );
}
