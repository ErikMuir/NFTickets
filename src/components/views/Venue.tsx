import { ReactElement, useState, useCallback } from "react";
import { Tabs } from "@/components/common/Tabs";
import VenueEvents from "./Venue/Events";
import useEvents from "@/lib/useEvents";
import { EventCategory } from "@/lib/events/event-helpers";
import { lookup } from "@/common-utils/enums";
import { Role } from "@/models";
import { AccountProp } from "@/components/component-types";

export const eventTabs = [
  EventCategory.UPCOMING_EVENTS,
  EventCategory.UNFINALIZED_EVENTS,
  EventCategory.PAST_EVENTS,
];

export default function Venue({ account }: AccountProp): ReactElement {
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
      case EventCategory.PAST_EVENTS:
        return past;
      case EventCategory.UNFINALIZED_EVENTS:
        return unfinalized;
      case EventCategory.UPCOMING_EVENTS:
        return upcoming;
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
        <VenueEvents
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
