import { ReactElement } from "react";
import { Entertainers } from "./Entertainers";
import { Venues } from "./Venues";
import { Events } from "./Events";

export default function Attendee(): ReactElement {
  return (
    <div className="flex flex-col gap-12 w-[320px] md:w-[672px] xl:w-[1024px] mx-auto">
      <Entertainers />
      <Venues />
      <Events />
    </div>
  );
}
