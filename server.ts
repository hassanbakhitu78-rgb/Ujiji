import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import { createBooking, getBookingsByUser, getAllRooms } from './src/db/bookings.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  // 1. Sync / register user from Firebase Auth
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid || !req.user.email) {
        return res.status(400).json({ error: 'Missing user credentials from token' });
      }
      const user = await getOrCreateUser(req.user.uid, req.user.email, req.user.name);
      res.json(user);
    } catch (error: any) {
      console.error('Failed to sync user:', error);
      res.status(500).json({ error: 'Failed to sync user' });
    }
  });

  // 2. Get Rooms
  app.get('/api/rooms', async (_req, res) => {
    try {
      const rooms = await getAllRooms();
      res.json(rooms);
    } catch (error: any) {
      console.error('Failed to fetch rooms:', error);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  });

  // 3. Create Booking (supports guest booking & authenticated user)
  app.post('/api/bookings', async (req, res) => {
    try {
      const {
        guestName,
        phoneNumber,
        checkInDate,
        checkOutDate,
        nights,
        guestCount,
        roomNumber,
        totalAmount,
        specialRequest,
        dispatchMethod,
        userUid,
      } = req.body;

      if (!guestName || !phoneNumber || !checkInDate || !checkOutDate) {
        return res.status(400).json({ error: 'Required booking details missing' });
      }

      let userId: number | undefined = undefined;
      if (userUid) {
        const existingUser = await getUserByUid(userUid);
        if (existingUser) {
          userId = existingUser.id;
        }
      }

      const booking = await createBooking({
        userId,
        guestName,
        phoneNumber,
        checkInDate,
        checkOutDate,
        nights: Number(nights) || 1,
        guestCount: String(guestCount || '1'),
        roomNumber: String(roomNumber || 'Any Available Room'),
        totalAmount: Number(totalAmount) || 25000,
        specialRequest,
        dispatchMethod,
      });

      res.status(201).json(booking);
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  // 4. Get User's Bookings
  app.get('/api/my-bookings', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const existingUser = await getUserByUid(req.user.uid);
      if (!existingUser) {
        return res.json([]);
      }
      const userBookings = await getBookingsByUser(existingUser.id);
      res.json(userBookings);
    } catch (error: any) {
      console.error('Failed to fetch bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
