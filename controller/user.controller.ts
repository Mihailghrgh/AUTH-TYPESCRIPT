import db from "@/lib/db";
import { AuthUsers } from "@/schema/schema";
import appAssert from "@/utils/appAssert";
import catchError from "@/utils/catchError";
import { NOT_FOUND, OK } from "@/utils/httpStatusCode";
import { eq } from "drizzle-orm";

export const getUserHandler = catchError(async (req, res) => {
  const user = await db
    .select()
    .from(AuthUsers)
    .where(eq(AuthUsers.id, req.userId));
    

  appAssert(user[0], NOT_FOUND, "User not found");

  const foundUser = {
    email: user[0].email,
    created_at: user[0].created_at,
  };
  return res.status(OK).json({ message: "User found", foundUser });
});
