"use client";

import { Loading } from "@/components/common/Loading";
import ProviderEvent from "@/components/views/ProviderEvent";
import useUser from "@/lib/user/useUser";
import { redirect } from "next/navigation";

export default function VenueEventRoute({
  params,
}: {
  params: { event: string };
}) {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) return <Loading />;

  if (!user?.isLoggedIn) redirect("/");

  const { role, accountId } = user;
  const { event } = params;

  return (
    <ProviderEvent
      address={event}
      role={role}
      account={accountId}
    />
  );
}
