import { Role } from "@/models";

export type RoleAccountFilter = {
  role?: Role;
  account?: string;
};

export const queryStringFromRoleAccountFilter = ({
  role,
  account,
}: RoleAccountFilter): string => {
  let queryString = "";
  if (role) {
    queryString += `role=${role}`;
    if (account) {
      queryString += `&account=${account}`;
    }
  }
  return queryString;
};
