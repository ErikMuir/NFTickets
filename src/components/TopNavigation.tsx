import Image from "next/image";
import { AccountMenu } from "./AccountMenu";

export const TopNavigation = () => {
  return (
    <nav
      className="flex justify-between items-center px-4 py-2"
      style={{ backgroundColor: "rgb(51, 51, 51)" }}
    >
      <div className="flex items-center gap-2 text-white">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        NFTickets
      </div>
      <AccountMenu />
    </nav>
  );
};
