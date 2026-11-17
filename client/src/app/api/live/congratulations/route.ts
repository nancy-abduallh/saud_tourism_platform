import { NextResponse } from 'next/server';
import { addLiveCongratulation } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { senderName, branchOrCity, message } = body;

    if (!senderName || !senderName.trim()) {
      return NextResponse.json({ error: 'الاسم مطلوب' }, { status: 400 });
    }
    if (!branchOrCity || !branchOrCity.trim()) {
      return NextResponse.json({ error: 'الفرع أو المدينة مطلوبة' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'نص التهنئة مطلوب' }, { status: 400 });
    }

    const item = await addLiveCongratulation({
      senderName: senderName.trim().slice(0, 80),
      branchOrCity: branchOrCity.trim().slice(0, 80),
      message: message.trim().slice(0, 500),
    });

    return NextResponse.json({ ok: true, congratulation: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'حدث خطأ أثناء إرسال التهنئة' },
      { status: 500 }
    );
  }
}
