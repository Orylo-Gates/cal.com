import { HttpError } from "@calcom/lib/http-error";
import prisma from "@calcom/prisma";
import { BookingStatus } from "@calcom/prisma/enums";

export async function findBookingNotes(userId: number, includeCancelled: boolean) {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new HttpError({ statusCode: 400, message: "Invalid user id" });
  }
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, locked: true } });
  if (!user) {
    throw new HttpError({ statusCode: 404, message: "User not found" });
  }
  if (user.locked) {
    throw new HttpError({ statusCode: 403, message: "User is locked" });
  }
  return prisma.booking.findMany({
    where: {
      userId,
      description: { not: null },
      ...(includeCancelled ? {} : { status: { not: BookingStatus.CANCELLED } }),
    },
    select: { id: true, uid: true, title: true, description: true, startTime: true },
    orderBy: { startTime: "desc" },
  });
}

export async function saveBookingNote(userId: number, bookingId: number, note: string) {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new HttpError({ statusCode: 400, message: "Invalid user id" });
  }
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, locked: true } });
  if (!user) {
    throw new HttpError({ statusCode: 404, message: "User not found" });
  }
  if (user.locked) {
    throw new HttpError({ statusCode: 403, message: "User is locked" });
  }
  return prisma.booking.update({
    where: { id: bookingId, userId },
    data: { description: note.trim() },
    select: { id: true, uid: true, description: true },
  });
}

export async function countBookingNotes(userId: number, includeCancelled: boolean) {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new HttpError({ statusCode: 400, message: "Invalid user id" });
  }
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, locked: true } });
  if (!user) {
    throw new HttpError({ statusCode: 404, message: "User not found" });
  }
  if (user.locked) {
    throw new HttpError({ statusCode: 403, message: "User is locked" });
  }
  return prisma.booking.count({
    where: {
      userId,
      description: { not: null },
      ...(includeCancelled ? {} : { status: { not: BookingStatus.CANCELLED } }),
    },
  });
}
