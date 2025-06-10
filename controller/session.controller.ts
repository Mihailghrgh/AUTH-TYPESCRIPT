import db from "@/lib/db";
import { SessionDocument } from "@/schema/schema";
import { eq, and, gt } from "drizzle-orm";
import catchError from "@/utils/catchError";
import { NOT_FOUND, OK } from "@/utils/httpStatusCode";
import appAssert from "@/utils/appAssert";
import z from "zod";

export const findSessionHandler = catchError(async (req, res) => {
  const sessions = await db
    .select()
    .from(SessionDocument)
    .where(
      and(
        eq(SessionDocument.userId, req.userId),
        gt(SessionDocument.expires_at, new Date(Date.now()))
      )
    );

  appAssert(sessions, NOT_FOUND, "No session found for this user");

  const allSessions = sessions.map((session) => {
    let currentSession;
    if (session.id === req.sessionId) {
      currentSession = { ...session, isCurrent: true };

      return currentSession;
    } else {
      return session;
    }
  });

  return res.status(OK).json({ allSessions });
});

export const deleteSessionHandler = catchError(async (req, res) => {
  const sessionId = z.string().parse(req.params.id);

  const deletedSession = await db
    .delete(SessionDocument)
    .where(
      and(
        eq(SessionDocument.id, sessionId),
        eq(SessionDocument.userId, req.userId)
      )
    )
    .returning();

  appAssert(deletedSession, NOT_FOUND, "Session not found");

  return res.status(OK).json({ message: "Session removed successfully" });
});
