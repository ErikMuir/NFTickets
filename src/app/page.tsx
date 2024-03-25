"use client";

import { useRouter } from "next/navigation";
import LoggedOut from "@/components/views/LoggedOut";
import Loading from "@/components/views/Loading";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";

export default function HomeRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading) {
    return <Loading />;
  }

  if (!user?.isLoggedIn) {
    return <LoggedOut />;
  }

  switch (user.role) {
    case Role.ATTENDEE:
      return router.push("/attendee");
    case Role.ENTERTAINER:
      return router.push("/entertainer");
    case Role.VENUE:
      return router.push("/venue");
    default:
      return <LoggedOut />;
  }
}
