"use client";

import Attendee from "@/components/views/Attendee";
import Entertainer from "@/components/views/Entertainer";
import LoggedOut from "@/components/views/LoggedOut";
import Loading from "@/components/views/Loading";
import Venue from "@/components/views/Venue";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";

export default function HomeRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loading />;
  }

  if (!user?.isLoggedIn) {
    return <LoggedOut />;
  }

  switch (user.role) {
    case Role.ATTENDEE:
      return <Attendee />;
    case Role.ENTERTAINER:
      return <Entertainer />;
    case Role.VENUE:
      return <Venue />;
    default:
      return <LoggedOut />;
  }
}
