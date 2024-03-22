import { useState } from "react";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";
import Loading from "../Loading";
import Unauthorized from "../Unauthorized";
import AttendeeProfile from "./AttendeeProfile";
import EntertainerProfile from "./EntertainerProfile";
import VenueProfile from "./VenueProfile";

export default function Profile() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [role, _setRole] = useState<Role>(Role.ATTENDEE);

  if (isUserLoading) return <Loading />;

  if (!user?.isLoggedIn) return <Unauthorized />;

  return (
    <div className="flex flex-col max-w-[960px] mx-auto p-8 items-center">
      <div className="text-6xl pt-12 pb-24">Profile</div>
      {role === Role.ATTENDEE && <AttendeeProfile />}
      {role === Role.ENTERTAINER && <EntertainerProfile />}
      {role === Role.VENUE && <VenueProfile />}
    </div>
  );
}
