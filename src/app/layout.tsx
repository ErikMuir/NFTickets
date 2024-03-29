"use client";

import React from "react";
import { Jost } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { Footer } from "@/components/globals/Footer";
import { Header } from "@/components/globals/Header/Header";
import { muiTheme } from "@/styles/mui-theme";
import "@/styles/globals.css";
import { twMerge } from "tailwind-merge";

const jost = Jost({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>NFTickets</title>
        <meta name="description" content="NFTickets" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className={twMerge(jost.className, "text-gray-dark bg-off-white")}>
        <div className="flex flex-col min-h-screen">
          <ThemeProvider theme={muiTheme}>
            <Header />
            <main className="grow shrink-0 basis-auto m-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
