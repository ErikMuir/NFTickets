import React from "react";
import { Inter, Jost, Salsa } from "next/font/google";
import "@/styles/globals.css";
import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";

const jost = Jost({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "NFTickets",
  description:
    "A ledger-based ticketing system for live events built on the Hedera Hashgraph network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <div className="flex flex-col min-h-screen">
          <TopNavigation />
          <div className="grow shrink-0 basis-auto">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
