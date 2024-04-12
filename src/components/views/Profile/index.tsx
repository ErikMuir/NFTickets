import useUser from "@/lib/user/useUser";
import { Role } from "@/models";
import { Loading } from "../Loading";
import Unauthorized from "../Unauthorized";
import AttendeeProfile from "./AttendeeProfile";
import EntertainerProfile from "./EntertainerProfile";
import VenueProfile from "./VenueProfile";

export default function Profile() {
  const { data: user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) return <Loading />;

  if (!user?.isLoggedIn) return <Unauthorized />;

  const { accountId, role } = user;

  return (
    <div className="flex flex-col max-w-[960px] mx-auto p-8 items-center">
      <div className="text-6xl pt-4 pb-12">Profile</div>
      {role === Role.ATTENDEE && <AttendeeProfile />}
      {role === Role.ENTERTAINER && <EntertainerProfile account={accountId} />}
      {role === Role.VENUE && <VenueProfile account={accountId} />}
    </div>
  );
}
