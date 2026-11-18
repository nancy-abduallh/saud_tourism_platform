import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { wrap } from '../lib/wrap';
import { config } from '../config';
import { requireAuth, AuthRequest } from '../middleware/auth';

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

router.post(
  '/register',
  wrap(async (req, res) => {
    const { name, email, password } = z
      .object({
        name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(120),
        email: z.string().trim().email('البريد الإلكتروني غير صحيح'),
        password: z.string().min(6, 'كلمة المرور يجب ألا تقل عن 6 خانات'),
      })
      .parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'البريد الإلكتروني مسجل بالفعل' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'USER',
      },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  }),
);

router.get(
  '/me',
  requireAuth,
  wrap(async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'غير مصرح' });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });
    res.json({ user });
  }),
);

router.put(
  '/profile',
  requireAuth,
  wrap(async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'غير مصرح' });

    const { name, currentPassword, newPassword } = z
      .object({
        name: z.string().trim().min(2).max(120).optional(),
        currentPassword: z.string().min(6).optional(),
        newPassword: z.string().min(6).optional(),
      })
      .parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });

    const updateData: { name?: string; passwordHash?: string } = {};

    if (name) {
      updateData.name = name;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'يرجى إدخال كلمة المرور الحالية لتغيير كلمة المرور' });
      }
      const match = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!match) {
        return res.status(400).json({ message: 'كلمة المرور الحالية غير صحيحة' });
      }
      updateData.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    res.json({ user: updated, message: 'تم تحديث الملف الشخصي بنجاح' });
  }),
);

router.post(
  '/forgot-password',
  wrap(async (req, res) => {
    const { email } = z.object({ email: z.string().trim().email() }).parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    // Don't disclose whether email exists for security, return friendly message
    res.json({
      ok: true,
      message: 'إذا كان البريد مسجلاً لدينا، فستصلك تعليمات استعادة كلمة المرور',
      exists: Boolean(user),
    });
  }),
);

export default router;
