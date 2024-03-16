import { getRequired } from "../../common/env";
import { ForbiddenError } from "./api-errors";

export const authorize = ({ headers }: Request): void => {
  const providedToken = headers.get("Authorization");
  const actualToken = getRequired("BACKEND_API_TOKEN");
  if (providedToken !== actualToken) {
    throw new ForbiddenError();
  }
};
