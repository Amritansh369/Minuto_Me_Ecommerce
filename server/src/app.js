// Owner: M1 (everyone adds ONE line for their routes)
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true });
});

// Routes -- uncomment as each member finishes theirs
// M1
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);

// Product, dashboard, order, and payment routes will be mounted by their owners.

app.use(errorHandler);
export default app;
