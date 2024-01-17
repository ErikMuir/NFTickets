import Image from "next/image";
import { AccountMenu } from "./AccountMenu";

export const TopNavigation = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <div className="flex items-center gap-2 font-bold tracking-wider">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <span className="text-primary">NFTickets</span>
      </div>
      <AccountMenu />
    </nav>
  );
};
