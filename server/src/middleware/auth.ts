import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'غير مصرح' });
  try {
    const payload = jwt.verify(header.slice(7), config.jwtSecret) as { id: number; role: string };
    if (payload.role !== 'ADMIN') return res.status(403).json({ message: 'ليس لديك صلاحية' });
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'انتهت الجلسة، أعد تسجيل الدخول' });
  }
}
