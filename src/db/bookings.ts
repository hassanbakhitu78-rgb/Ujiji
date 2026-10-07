import { db } from './index.ts';
import { bookings, rooms } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export interface CreateBookingInput {
  userId?: number;
  guestName: string;
  phoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guestCount: string;
  roomNumber: string;
  totalAmount: number;
  specialRequest?: string;
  dispatchMethod?: string;
}

export async function createBooking(data: CreateBookingInput) {
  try {
    const result = await db.insert(bookings)
      .values({
        userId: data.userId || null,
        guestName: data.guestName,
        phoneNumber: data.phoneNumber,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        nights: data.nights,
        guestCount: data.guestCount,
        roomNumber: data.roomNumber,
        totalAmount: data.totalAmount,
        specialRequest: data.specialRequest || null,
        dispatchMethod: data.dispatchMethod || 'direct',
        status: 'confirmed',
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to record booking in database.", { cause: error });
  }
}

export async function getBookingsByUser(userId: number) {
  try {
    return await db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to fetch bookings.", { cause: error });
  }
}

export async function getAllBookings() {
  try {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to fetch all bookings.", { cause: error });
  }
}

export async function getAllRooms() {
  try {
    return await db.select().from(rooms);
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to fetch rooms.", { cause: error });
  }
}
