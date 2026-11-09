import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: 'البريد الإلكتروني مطلوب' }, { status: 400 });

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
        await pool.query('INSERT IGNORE INTO subscribers (email) VALUES (?)', [email]);
      } catch (dbErr) {
        console.warn('Could not insert subscriber to MySQL:', dbErr);
      }
    }

    return NextResponse.json({ ok: true, message: 'تم الاشتراك بالنشرة البريدية بنجاح.' });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'حدث خطأ' }, { status: 400 });
  }
}
