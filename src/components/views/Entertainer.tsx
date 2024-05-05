import { ReactElement, useState, useCallback } from "react";
import { Tabs } from "@/components/common/Tabs";
import EntertainerEvents from "./Entertainer/Events";
import useEvents from "@/lib/useEvents";
import { EventCategory } from "@/lib/events/event-helpers";
import { lookup } from "@/common-utils/enums";
import { Role } from "@/models";
import { AccountProp } from "../component-types";

export const eventTabs = [
  EventCategory.UPCOMING_EVENTS,
  EventCategory.UNFINALIZED_EVENTS,
  EventCategory.PAST_EVENTS,
];

export default function Entertainer({ account }: AccountProp): ReactElement {
  const [currentTab, setCurrentTab] = useState(eventTabs[0]);
  const {
    data: { past, unfinalized, upcoming },
    isLoading,
  } = useEvents({
    role: Role.VENUE,
    account,
  });

  const handleTabChange = useCallback((tab: string): void => {
    const newTab = lookup(EventCategory, tab);
    if (newTab) setCurrentTab(newTab);
  }, []);

  const getEventsForTab = (tab: EventCategory) => {
    switch (tab) {
      case EventCategory.UNFINALIZED_EVENTS:
        return unfinalized;
      case EventCategory.UPCOMING_EVENTS:
        return upcoming;
      case EventCategory.PAST_EVENTS:
        return past;
    }
  };

  return (
    <div className="flex flex-col gap-12 w-[320px] md:w-[672px] xl:w-[1024px] mx-auto">
      <Tabs
        tabs={eventTabs}
        currentTab={currentTab}
        onTabClick={handleTabChange}
      />
      {eventTabs.map((tab) => (
        <EntertainerEvents
          key={tab}
          tab={tab}
          currentTab={currentTab}
          isLoading={isLoading}
          events={getEventsForTab(tab)}
        />
      ))}
    </div>
  );
}
