"use client";

import { ReactNode } from "react";
import "@/app/globals.css";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans select-none">{children}</body>
    </html>
  );
}
