import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/user/session";
import { User } from "@/lib/user/types";
import { RequestError } from "@/server-utils/api-errors";
import { serverError, unauthenticated } from "@/server-utils/api-responses";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
}

export async function middleware(request: NextRequest) {
  try {
    const user = await getIronSession<User>(cookies(), sessionOptions);
    const { pathname } = request.nextUrl;
    const isPublicRoute = pathname.startsWith('/api/user');
    const isAdminRoute = pathname.startsWith('/api/admin');
    const isLoggedIn = user?.isLoggedIn && user.accountId;
    if (!isPublicRoute && !isAdminRoute && !isLoggedIn) {
      console.log("Not authenticated.");
      return unauthenticated();
    }
    return NextResponse.next();
  } catch (e) {
    if (e instanceof RequestError) {
      console.log(e, "Request error occurred.");
      return e.toErrorResponse();
    } else {
      console.log(e, "Unknown error occurred.");
      return serverError();
    }
  }
}
