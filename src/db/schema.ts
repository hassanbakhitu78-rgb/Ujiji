import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table (synced with Firebase Authentication)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Rooms table (16 rooms of Ujiji Lodge)
export const rooms = pgTable('rooms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  floor: text('floor').notNull(),
  status: text('status').notNull().default('available'),
  bedType: text('bed_type').notNull(),
  pricePerNight: integer('price_per_night').notNull().default(25000),
  description: text('description').notNull(),
});

// Bookings table for guest reservations
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  guestName: text('guest_name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  checkInDate: text('check_in_date').notNull(),
  checkOutDate: text('check_out_date').notNull(),
  nights: integer('nights').notNull(),
  guestCount: text('guest_count').notNull(),
  roomNumber: text('room_number').notNull(),
  totalAmount: integer('total_amount').notNull(),
  specialRequest: text('special_request'),
  status: text('status').notNull().default('pending'),
  dispatchMethod: text('dispatch_method'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));
