"use client";

import External from "@/components/views/External";
import Internal from "@/components/views/Internal";
import Loading from "@/components/views/Loading";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";

export default function HomeRoute() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loading />;
  }

  switch (user?.role) {
    case Role.ATTENDEE:
      return <Internal />;
    case Role.ENTERTAINER:
      return <Internal />;
    case Role.VENUE:
      return <Internal />;
    default:
      return <External />;
  }
}
