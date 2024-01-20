import React from "react";
import { Jost } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/globals/Footer";
import { Header } from "@/components/globals/Header/Header";

const jost = Jost({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow shrink-0 basis-auto">{children}</main>
          <Footer />
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
