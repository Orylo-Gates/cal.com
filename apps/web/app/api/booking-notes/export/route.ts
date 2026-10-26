import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { listBookingNotes } from "@calcom/lib/server/bookingNotes/bookingNotesService";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

async function getHandler() {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const notes = await listBookingNotes(session.user.id, false);
  const csv = ["uid,title,note", ...notes.map((n) => `${n.uid},"${n.title}","${n.description ?? ""}"`)].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv" } });
}

export const GET = defaultResponderForAppDir(getHandler);
