import { ReactElement, useState, useCallback, useEffect } from "react";
import { Tabs } from "@/components/common/Tabs";
import EntertainerEvents from "./Entertainer/Events";
import useCategorizedEvents from "@/lib/useCategorizedEvents";
import useUser from "@/lib/user/useUser";
import { EventCategory, eventTabs } from "@/models/Event";
import { lookup } from "@/common-utils/enums";

export default function Entertainer(): ReactElement {
  const [currentTab, setCurrentTab] = useState(eventTabs[0]);
  const [account, setAccount] = useState<string>();

  const { data: user } = useUser();
  const {
    data: { unfinalized, upcoming, past },
    isLoading,
  } = useCategorizedEvents({
    entertainer: account,
  });

  useEffect(() => {
    setAccount(user?.accountId);
  }, [user]);

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
