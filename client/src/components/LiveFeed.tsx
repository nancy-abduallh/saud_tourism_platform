'use client';

import React, { useState } from 'react';
import { Building2, MessageSquare, Send, Sparkles, User } from 'lucide-react';
import type { LiveCongratulation } from '@/lib/types';

interface LiveFeedProps {
  initialCongratulations: LiveCongratulation[];
  allowComments: boolean;
}

const COMMON_BRANCHES = [
  'فرع الرياض (الرئيسي)',
  'فرع القصيم',
  'فرع حايل',
  'فرع العلا',
  'فرع تبوك',
  'فرع عسير',
  'فرع الدمام والشرقية',
  'فرع المدينة المنورة',
  'فرع المنطقة الغربية (جدة ومكة)',
  'فرع الخرج',
  'فرع الزلفي',
  'فرع جيزان',
  'فرع نجران',
  'زائر كريم / شريك نجاح',
];

export default function LiveFeed({
  initialCongratulations,
  allowComments,
}: LiveFeedProps) {
  const [items, setItems] = useState<LiveCongratulation[]>(initialCongratulations);
  const [senderName, setSenderName] = useState('');
  const [branchOrCity, setBranchOrCity] = useState(COMMON_BRANCHES[0]);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      setError('يرجى كتابة اسمك ونص التهنئة');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/live/congratulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName.trim(),
          branchOrCity: branchOrCity.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل إرسال التهنئة');
      }

      if (data.congratulation) {
        setItems([data.congratulation, ...items]);
      }
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || 'حدث خطأ أثناء الإرسال');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-navy-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400">
            <Sparkles size={14} /> سجل التبريكات والتهاني المباشرة
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
            تهاني وتبريكات الفروع والضيوف بمناسبة التدشين
          </h3>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
          <MessageSquare size={14} className="text-gold-400" />
          <span>{items.length} تهنئة مسجلة</span>
        </div>
      </div>

      {/* Form to submit congratulations */}
      {allowComments ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-navy-950/60 p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300">
            ✍️ شارك بتهنئتك أو كلمة مباركة باسم فرعك أو شخصك الكريم:
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                الاسم أو الصفة <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: فهد السبيعي"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-navy-900/90 px-3.5 py-2.5 ps-10 text-xs text-white placeholder-white/40 focus:border-gold-500 focus:outline-none"
                />
                <User size={15} className="absolute start-3 top-3 text-white/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                الفرع أو المدينة <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={branchOrCity}
                  onChange={(e) => setBranchOrCity(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-navy-900/90 px-3.5 py-2.5 ps-10 text-xs text-white focus:border-gold-500 focus:outline-none"
                >
                  {COMMON_BRANCHES.map((b) => (
                    <option key={b} value={b} className="bg-navy-950 text-white">
                      {b}
                    </option>
                  ))}
                </select>
                <Building2 size={15} className="absolute start-3 top-3 text-white/40" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              نص التهنئة والتبريكات <span className="text-gold-400">*</span>
            </label>
            <textarea
              required
              rows={2}
              maxLength={400}
              placeholder="نبارك لكم تدشين منصة SA للسياحة ونتمنى لكم مزيداً من التوفيق والنجاح..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-900/90 p-3 text-xs text-white placeholder-white/40 focus:border-gold-500 focus:outline-none resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
          {success && (
            <p className="text-xs text-emerald-400 font-bold">
              ✓ تم نشر تهنئتكم المباركة بنجاح على شاشة البث! شكراً لمشاركتكم.
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2.5 text-xs font-black text-navy-950 shadow-gold transition hover:opacity-90 disabled:opacity-50"
            >
              <Send size={13} />
              <span>{submitting ? 'جاري الإرسال...' : 'إرسال التهنئة الآن'}</span>
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-4 text-xs text-white/60">
          تم إيقاف استقبال التبريكات المباشرة مؤقتاً بواسطة المشرف.
        </p>
      )}

      {/* Congratulations List */}
      <div className="mt-6 space-y-3 max-h-[460px] overflow-y-auto pe-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-navy-950/70 p-4 transition hover:border-gold-500/30"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-white">
                  {item.senderName}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-gold-500/40 bg-gold-500/10 px-2.5 py-0.5 text-[10px] font-bold text-gold-300">
                  <Building2 size={11} />
                  {item.branchOrCity}
                </span>
              </div>
              <span className="text-[10px] text-white/40">
                {new Date(item.createdAt).toLocaleDateString('ar-SA', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              {item.message}
            </p>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-8 text-center text-xs text-white/50">
            لا توجد تهاني مسجلة حتى الآن. كن أول المهنئين بمناسبة التدشين!
          </div>
        )}
      </div>
    </div>
  );
}
