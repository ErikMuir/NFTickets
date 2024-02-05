import useUser from "@/lib/user/useUser";
import { Salsa } from "next/font/google";
import { twMerge } from "tailwind-merge";

const salsa = Salsa({ weight: "400", subsets: ["latin"] });

export default function Internal() {
  const { user } = useUser();
  return (
    <div className="flex flex-col w-2/3 mt-8 mx-auto items-center">
      <div className={twMerge("text-6xl text-primary", salsa.className)}>
        Coming soon...
      </div>
    </div>
  );
}
