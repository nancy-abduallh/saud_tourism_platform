import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

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
          `INSERT INTO contact_messages (name, email, phone, message, is_read)
           VALUES (?, ?, ?, ?, 0)`,
          [name, email, phone || null, message],
        );
      } catch (dbErr) {
        console.warn('Could not insert contact message to MySQL:', dbErr);
      }
    }

    return NextResponse.json({ ok: true, message: 'تم إرسال رسالتك بنجاح، شكراً لتواصلك معنا.' });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'حدث خطأ أثناء إرسال الرسالة' }, { status: 400 });
  }
}
