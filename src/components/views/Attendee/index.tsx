import { ReactElement } from "react";
import { Entertainers } from "./Entertainers";
import { Venues } from "./Venues";
import { Events } from "./Events";

export default function Attendee(): ReactElement {
  return (
    <div className="flex flex-col m-8 gap-12">
      <Entertainers />
      <Venues />
      <Events />
    </div>
  );
}
