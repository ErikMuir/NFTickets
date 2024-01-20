"use client";

import ExternalView from "@/components/views/ExternalView";
import InternalView from "@/components/views/InternalView";
import useUser from "@/lib/useUser";

export default function HomeRoute() {
  const { user, mutateUser } = useUser();

  return user?.isLoggedIn ? <InternalView /> : <ExternalView />;
}
