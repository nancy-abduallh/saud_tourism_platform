import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { wrap } from '../lib/wrap';
import { config } from '../config';

const router = Router();

router.post(
  '/login',
  wrap(async (req, res) => {
    const { email, password } = z
      .object({ email: z.string().trim().email(), password: z.string().min(6) })
      .parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  }),
);

export default router;
