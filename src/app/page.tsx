"use client";

import ExternalView from "@/components/views/ExternalView";
import InternalView from "@/components/views/InternalView";
import LoadingView from "@/components/views/LoadingView";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";

export default function HomeRoute() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <LoadingView />;
  }

  switch (user?.role) {
    case Role.ATTENDEE:
      return <InternalView />;
    case Role.ENTERTAINER:
      return <InternalView />;
    case Role.VENUE:
      return <InternalView />;
    default:
      return <ExternalView />;
  }
}
