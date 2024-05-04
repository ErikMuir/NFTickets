"use client";

import { Loading } from "@/components/common/Loading";
import Venue from "@/components/views/Venue";
import useUser from "@/lib/user/useUser";
import { redirect } from "next/navigation";

export default function VenueRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loading />;
  }

  if (!user?.isLoggedIn) {
    redirect("/");
  }

  return <Venue />;
}
