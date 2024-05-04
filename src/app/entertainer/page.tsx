"use client";

import { Loading } from "@/components/common/Loading";
import Entertainer from "@/components/views/Entertainer";
import useUser from "@/lib/user/useUser";
import { redirect } from "next/navigation";

export default function EntertainerRoute() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loading />;
  }

  if (!user?.isLoggedIn) {
    redirect("/");
  }

  return <Entertainer />;
}
