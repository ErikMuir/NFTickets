"use client";

import { Loading } from "@/components/common/Loading";
import Attendee from "@/components/views/Attendee";
import useUser from "@/lib/user/useUser";
import { redirect } from "next/navigation";

export default function AttendeeRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loading />;
  }

  if (!user?.isLoggedIn) {
    redirect("/");
  }

  return <Attendee />;
}
