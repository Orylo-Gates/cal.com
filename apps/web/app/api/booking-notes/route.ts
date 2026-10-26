import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { listBookingNotes, totalBookingNotes, updateBookingNote } from "@calcom/lib/server/bookingNotes/bookingNotesService";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

const updateSchema = z.object({ bookingId: z.number().int().positive(), note: z.string().max(5000) });

async function getHandler() {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const notes = await listBookingNotes(session.user.id, false);
  const total = await totalBookingNotes(session.user.id, false);
  return NextResponse.json({ notes, total });
}

async function postHandler(req: NextRequest) {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { bookingId, note } = updateSchema.parse(await req.json());
  const updated = await updateBookingNote(session.user.id, bookingId, note);
  const notes = await listBookingNotes(session.user.id, false);
  return NextResponse.json({ updated, notes });
}

export const GET = defaultResponderForAppDir(getHandler);
export const POST = defaultResponderForAppDir(postHandler);
