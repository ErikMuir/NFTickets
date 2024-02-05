import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useUser from "@/lib/user/useUser";
import { Role } from "@/models";
import { knownLookup } from "@/common-utils/enums";
import { updateWallet } from "@/clients/db";
import Loading from "../Loading";
import EntertainerForm from "./EntertainerForm";
import VenueForm from "./VenueForm";
import Unauthorized from "../Unauthorized";

export default function Profile() {
  const { user, mutateUser, isUserLoading } = useUser();
  const [role, setRole] = useState<Role>(Role.ATTENDEE);
  const [selectDisabled, setSelectDisabled] = useState<boolean>(false);

  if (isUserLoading) return <Loading />;

  if (!user?.isLoggedIn) return <Unauthorized />;

  const handleRoleChanged = async (e: SelectChangeEvent) => {
    setSelectDisabled(true);
    try {
      const newRole = knownLookup(Role, e.target.value);
      setRole(newRole);
      await updateWallet({ account: user.accountId, role: newRole });
      await mutateUser({ ...user, role: newRole });
    } catch (err) {
      // TODO : inform user in UI
      console.log(err);
    } finally {
      setSelectDisabled(false);
    }
  };

  return (
    <div className="flex flex-col w-2/3 mt-8 mx-auto items-center">
      <div className="flex flex-col w-full items-center">
        <div className="text-6xl pb-8">Profile</div>
        <FormControl className="w-1/2">
          <InputLabel id="profile-role-select-label">Role</InputLabel>
          <Select
            labelId="profile-role-select-label"
            id="profile-role-select"
            value={role}
            label="Role"
            onChange={handleRoleChanged}
            disabled={selectDisabled}
          >
            <MenuItem value={Role.ATTENDEE}>{Role.ATTENDEE}</MenuItem>
            <MenuItem value={Role.ENTERTAINER}>{Role.ENTERTAINER}</MenuItem>
            <MenuItem value={Role.VENUE}>{Role.VENUE}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {role === Role.ENTERTAINER && <EntertainerForm />}
      {role === Role.VENUE && <VenueForm />}
    </div>
  );
}
