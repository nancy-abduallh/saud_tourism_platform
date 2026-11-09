import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'بيانات غير صالحة، تحقق من الحقول', issues: err.flatten().fieldErrors });
  }
  if (err?.code === 'P2002') return res.status(409).json({ message: 'القيمة موجودة مسبقاً' });
  if (err?.code === 'P2025') return res.status(404).json({ message: 'العنصر غير موجود' });
  if (err?.code === 'P2003') return res.status(409).json({ message: 'لا يمكن الحذف لارتباط العنصر ببيانات أخرى' });
  console.error(err);
  res.status(500).json({ message: 'حدث خطأ في الخادم' });
};
