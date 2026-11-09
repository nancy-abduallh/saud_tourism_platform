import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, fullName, email, phone, startDate, guests = 1, vipAddon = false, notes, totalSar } = body;

    const reference = 'SA-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const dbUrl = process.env.DATABASE_URL;
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    const port = Number(process.env.DB_PORT) || 3306;

    let pool: mysql.Pool | null = null;
    if (dbUrl) {
      pool = mysql.createPool({ uri: dbUrl, connectTimeout: 3000 });
    } else if (host && user && database) {
      pool = mysql.createPool({ host, user, password, database, port, connectTimeout: 3000 });
    }

    if (pool) {
      try {
        await pool.query(
          `INSERT INTO bookings (reference, package_id, full_name, email, phone, start_date, guests, vip_addon, notes, total_sar, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
          [reference, packageId || 1, fullName, email, phone, startDate ? new Date(startDate) : new Date(), guests, vipAddon ? 1 : 0, notes || null, totalSar || 0],
        );
      } catch (dbErr) {
        console.warn('Could not insert booking to MySQL:', dbErr);
      }
    }

    return NextResponse.json({
      ok: true,
      reference,
      message: 'تم استلام طلب الحجز بنجاح، سيتواصل معك فريق الكونسيرج قريباً.',
    });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'حدث خطأ أثناء معالجة الحجز' }, { status: 400 });
  }
}
