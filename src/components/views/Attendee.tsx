import { ReactElement, useState, useCallback } from "react";
import { Tabs } from "@/components/common/Tabs";
import { Entertainers } from "./Attendee/Entertainers";
import { Venues } from "./Attendee/Venues";
import { Events } from "./Attendee/Events";

const attendeeTabs = ["Events", "Entertainers", "Venues"];

export default function Attendee(): ReactElement {
  const [currentTab, setCurrentTab] = useState(attendeeTabs[0]);
  const handleTabChange = useCallback((tab: string): void => {
    setCurrentTab(tab);
  }, []);
  return (
    <div className="flex flex-col gap-12 w-[320px] md:w-[672px] xl:w-[1024px] mx-auto">
      <Tabs
        tabs={attendeeTabs}
        currentTab={currentTab}
        onTabClick={handleTabChange}
      />
      <Events isHidden={currentTab !== "Events"} />
      <Entertainers isHidden={currentTab !== "Entertainers"} />
      <Venues isHidden={currentTab !== "Venues"} />
    </div>
  );
}
