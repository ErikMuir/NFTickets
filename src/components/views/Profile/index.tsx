import { useState } from "react";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";
import Loading from "../Loading";
import Entertainer from "./Entertainer";
import Venue from "./Venue";
import Unauthorized from "../Unauthorized";
import Attendee from "./Attendee";

export default function Profile() {
  const { user, isUserLoading } = useUser();
  const [role, _setRole] = useState<Role>(Role.ATTENDEE);

  if (isUserLoading) return <Loading />;

  if (!user?.isLoggedIn) return <Unauthorized />;

  return (
    <div className="flex flex-col max-w-[960px] mx-auto p-8 items-center">
      <div className="text-6xl pt-12 pb-24">Profile</div>
      {role === Role.ATTENDEE && <Attendee />}
      {role === Role.ENTERTAINER && <Entertainer />}
      {role === Role.VENUE && <Venue />}
    </div>
  );
}
