"use client";

import { Loading } from "@/components/common/Loading";
import Profile from "@/components/views/Profile";
import useUser from "@/lib/user/useUser";
import { redirect } from "next/navigation";

export default function ProfileRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loading />;
  }

  if (!user?.isLoggedIn) {
    redirect("/");
  }

  return <Profile />;
}
