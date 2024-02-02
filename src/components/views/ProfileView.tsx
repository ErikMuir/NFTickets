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

export default function ProfileView() {
  const { user, mutateUser } = useUser();
  const [role, setRole] = useState<Role>(Role.ATTENDEE);

  const handleRoleChanged = (e: SelectChangeEvent) => {
    const newRole = knownLookup(Role, e.target.value);
    setRole(newRole);
  };

  const updateProfile = async () => {
    if (!user?.accountId) throw new Error("Unauthorized");
    await updateWallet({ account: user.accountId, role });
    await mutateUser({ ...user, role });
  };

  return (
    <div className="flex flex-col w-2/3 mt-8 mx-auto items-center">
      <form action={updateProfile} className="flex flex-col w-full items-center">
        <div className="text-6xl pb-8">
          Profile
        </div>
        <FormControl className="w-1/2">
          <InputLabel id="profile-role-select-label">Role</InputLabel>
          <Select
            labelId="profile-role-select-label"
            id="profile-role-select"
            value={role}
            label="Role"
            onChange={handleRoleChanged}
          >
            <MenuItem value={Role.ATTENDEE}>{Role.ATTENDEE}</MenuItem>
            <MenuItem value={Role.ENTERTAINER}>{Role.ENTERTAINER}</MenuItem>
            <MenuItem value={Role.VENUE}>{Role.VENUE}</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
