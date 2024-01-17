import Image from "next/image";
import { Salsa } from "next/font/google";
import { twMerge } from "tailwind-merge";

const salsa = Salsa({ weight: "400", subsets: ["latin"] });

export default function HomeRoute() {
  return (
    <div className="flex flex-col w-2/3 mt-8 mx-auto items-center">
      <Image src="/logo.png" alt="logo" width={300} height={300} priority />
      <div className={twMerge("text-6xl text-primary", salsa.className)}>
        NFTickets
      </div>
      <div className="flex flex-col my-12 gap-8 text-xl">
        <p>
          Live event promotors and ticket marketplaces (e.g. Live Nation,
          TicketMaster, StubHub) are regularly accused of unfair and opaque
          business practices due to their monopolization and centralization of
          the live event industry.
        </p>
        <p>
          We aim to disrupt this paradigm by bringing transparency to
          ticketing and eliminating the need for a promotor as a middleman
          between entertainers and venues, while enabling the entertainers to
          create a unique connection with their audiences using NFT assets as
          keepsakes and collectibles.
        </p>
      </div>
      <div className={twMerge("text-2xl text-primary", salsa.className)}>
        Connect your wallet to get started!
      </div>
    </div>
  );
}
