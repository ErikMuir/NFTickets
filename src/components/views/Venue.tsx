import { ReactElement, useState, useCallback } from "react";
import { AddCircle } from "@mui/icons-material";
import { lookup } from "@/utils/common/enums";
import { Button } from "@/components/common/Button";
import { Tabs } from "@/components/common/Tabs";
import { AccountProp } from "@/components/component-types";
import VenueEvents from "@/components/views/Venue/Events";
import { EventCategory, providerEventTabs } from "@/lib/events/event-helpers";
import useEvents from "@/lib/events/useEvents";
import { Role } from "@/models";
import { CreateEventModal } from "@/components/globals/CreateEventModal";

export default function Venue({ account }: AccountProp): ReactElement {
  const [currentTab, setCurrentTab] = useState(providerEventTabs[0]);
  const [showModal, setShowModal] = useState(false);
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
      <div className="flex flex-row w-full justify-between">
        <Tabs
          tabs={providerEventTabs}
          currentTab={currentTab}
          onTabClick={handleTabChange}
        />
        <Button
          size="large"
          startIcon={<AddCircle />}
          onClick={() => setShowModal(true)}
        >
          Create Event
        </Button>
        {showModal && (
          <CreateEventModal
            id="create-event"
            show={showModal}
            onClose={() => setShowModal(false)}
            providerRole={Role.VENUE}
          />
        )}
      </div>
      {providerEventTabs.map((tab) => (
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
