import Image from "next/image";

export default function HomeRoute() {
  return (
    <div className="flex flex-col w-2/3 mt-8 mx-auto items-center">
      <Image src="/logo.png" alt="logo" width={300} height={300} />
      <div className="text-6xl font-bold">NFTickets</div>
    </div>
  );
}
