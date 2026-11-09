import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import publicRoutes from './routes/public';
import { errorHandler } from './middleware/error';

const app = express();
const uploadsDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 30, message: { message: 'محاولات كثيرة، حاول لاحقاً' } }));
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60, message: { message: 'طلبات كثيرة، حاول لاحقاً' } });
app.use(['/api/bookings', '/api/contact', '/api/newsletter'], formLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

app.use((_req, res) => res.status(404).json({ message: 'المسار غير موجود' }));
app.use(errorHandler);

app.listen(config.port, () => console.log(`✔ API running on http://localhost:${config.port}`));
