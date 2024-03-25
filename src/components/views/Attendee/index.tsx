import { ReactElement, useState, useCallback } from "react";
import { Entertainers } from "./Entertainers";
import { Venues } from "./Venues";
import { Events } from "./Events";
import { Tabs } from "@/components/common/Tabs";

const attendeeTabs = ["Events", "Entertainers", "Venues"];

export default function Attendee(): ReactElement {
  const [currentTab, setCurrentTab] = useState(attendeeTabs[0]);
  const handleTabChange = useCallback((tab: string): void => {
    console.log(`${tab} was clicked`);
    setCurrentTab(tab);
  }, []);
  return (
    <div className="flex flex-col gap-12 w-[320px] md:w-[672px] xl:w-[1024px] mx-auto">
      <Tabs
        tabs={attendeeTabs}
        currentTab={currentTab}
        onTabClick={handleTabChange}
      />
      {currentTab === "Events" && <Events />}
      {currentTab === "Entertainers" && <Entertainers />}
      {currentTab === "Venues" && <Venues />}
    </div>
  );
}
