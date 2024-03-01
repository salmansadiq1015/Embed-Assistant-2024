"use client";
import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function PageLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <main className="min-h-[calc(100vh-5rem)]">{children}</main>
      <Footer />
    </div>
  );
}
