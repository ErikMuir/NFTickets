"use client";

import { Salsa } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AccountMenu } from "./AccountMenu";

const salsa = Salsa({ weight: "400", subsets: ["latin"] });

export const Header = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center px-4 py-2">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleHome}>
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <span className={twMerge("text-primary text-4xl")}>NFTickets</span>
      </div>
      <AccountMenu />
    </header>
  );
};
