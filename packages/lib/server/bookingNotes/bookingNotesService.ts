import { countBookingNotes, findBookingNotes, saveBookingNote } from "./bookingNotesRepository";

export async function listBookingNotes(userId: number, includeCancelled: boolean) {
  return findBookingNotes(userId, includeCancelled);
}

export async function updateBookingNote(userId: number, bookingId: number, note: string) {
  return saveBookingNote(userId, bookingId, note);
}

export async function totalBookingNotes(userId: number, includeCancelled: boolean) {
  return countBookingNotes(userId, includeCancelled);
}
