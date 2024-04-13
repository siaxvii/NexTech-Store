//This file helps enable authentication and is where we configure protected routes for admin page
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    afterAuth(auth) {
        if (auth.userId && !auth.isPublicRoute) {
            return NextResponse.next();
        }
    }
});



export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};