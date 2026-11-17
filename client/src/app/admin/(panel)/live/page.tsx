'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Building2,
  Calendar,
  Check,
  Eye,
  MessageSquare,
  Radio,
  Save,
  Sparkles,
  Trash2,
  Tv,
  Video,
} from 'lucide-react';
import type { LiveCongratulation, LiveStreamSettings, LiveStreamStatus } from '@/lib/types';
import { parseVideoUrl } from '@/components/LivePlayer';

export default function AdminLivePage() {
  const [settings, setSettings] = useState<LiveStreamSettings | null>(null);
  const [congratulations, setCongratulations] = useState<LiveCongratulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/live')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
        if (data.congratulations) setCongratulations(data.congratulations);
        setLoading(false);
      })
      .catch((err) => {
        setMessage({ type: 'error', text: 'فشل تحميل بيانات البث: ' + err.message });
        setLoading(false);
      });
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/live', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'فشل حفظ الإعدادات');
      }

      const updated = await res.json();
      setSettings(updated);
      setMessage({ type: 'success', text: 'تم حفظ وتحديث إعدادات البث المباشر بنجاح!' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'حدث خطأ أثناء الحفظ' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCongratulation = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه التهنئة؟')) return;

    try {
      const res = await fetch(`/api/admin/live/congratulations/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('فشل حذف التهنئة');

      setCongratulations(congratulations.filter((c) => c.id !== id));
      setMessage({ type: 'success', text: 'تم حذف التهنئة بنجاح' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ');
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  const preview = parseVideoUrl(
    settings.status === 'ENDED' && settings.recordingUrl
      ? settings.recordingUrl
      : settings.streamUrl
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
              <Radio size={16} className="animate-pulse" /> إدارة البث المباشر وحفل التدشين
            </div>
            <h1 className="mt-1 font-display text-2xl font-black sm:text-3xl">
              التحكم في البث المباشر والتدشين الوطني
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              إدارة وقائع البث المباشر لحفل تدشين منصة SA للسياحة وفروع المملكة الـ 13، التحكم برابط البث والعد التنازلي والشريط التنبيهي العلوي والتبريكات المباشرة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20"
            >
              <Eye size={15} /> معاينة صفحة البث للزوار ↗
            </a>

            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2 text-xs font-black text-navy-950 shadow-gold transition hover:opacity-90 disabled:opacity-50"
            >
              <Save size={15} />
              <span>{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-3 rounded-2xl p-4 text-sm font-semibold ${
            message.type === 'success'
              ? 'border border-emerald-500/40 bg-emerald-50 text-emerald-800'
              : 'border border-red-500/40 bg-red-50 text-red-800'
          }`}
        >
          {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Quick Status Control Bar */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Status: UPCOMING */}
        <button
          type="button"
          onClick={() => {
            setSettings({ ...settings, status: 'UPCOMING', isLive: false });
          }}
          className={`flex flex-col items-start rounded-2xl border p-5 text-start transition ${
            settings.status === 'UPCOMING'
              ? 'border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-500/30'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-amber-500" />
            <span className="font-bold text-slate-800">قريباً (بث مجدول) ⏳</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            يُظهر للزوار عداداً تنازلياً أنيقاً باليوم والساعة لموعد انطلاق الحفل مع جدول الفعاليات.
          </p>
        </button>

        {/* Status: LIVE */}
        <button
          type="button"
          onClick={() => {
            setSettings({ ...settings, status: 'LIVE', isLive: true, bannerEnabled: true });
          }}
          className={`flex flex-col items-start rounded-2xl border p-5 text-start transition ${
            settings.status === 'LIVE'
              ? 'border-red-500 bg-red-50/70 shadow-md ring-2 ring-red-500/30'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
            </span>
            <span className="font-bold text-red-900">مباشر الآن (LIVE) 🔴</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            الحفل يُبث لايف الآن! تفعيل المشغل الفوري وتفعيل شريط التنبيه العلوي وتفاعل الفروع.
          </p>
        </button>

        {/* Status: ENDED */}
        <button
          type="button"
          onClick={() => {
            setSettings({ ...settings, status: 'ENDED', isLive: false });
          }}
          className={`flex flex-col items-start rounded-2xl border p-5 text-start transition ${
            settings.status === 'ENDED'
              ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-500/30'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-blue-500" />
            <span className="font-bold text-slate-800">انتهى البث (تسجيل الحفل) 🎬</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            انتهت الفعاليات ويُعرض التسجيل الكامل للحفل للزوار والمتابعين لمشاهدته في أي وقت.
          </p>
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Settings Fields */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Tv size={18} className="text-gold-600" /> تفاصيل ورابط البث
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                عنوان حفل التدشين <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الوصف التعريفي للحدث
              </label>
              <textarea
                rows={2}
                value={settings.subtitle || ''}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  رابط البث المباشر (YouTube / Vimeo / Embed) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={settings.streamUrl}
                  onChange={(e) => setSettings({ ...settings, streamUrl: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  يقبل روابط يوتيوب العادية، روابط البث Live، أو كود التضمين.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  رابط تسجيل الحفل (بعد الانتهاء)
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={settings.recordingUrl || ''}
                  onChange={(e) => setSettings({ ...settings, recordingUrl: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  موعد الحفل وتاريخ الانطلاق (للعد التنازلي)
                </label>
                <input
                  type="datetime-local"
                  value={
                    settings.scheduledAt
                      ? new Date(settings.scheduledAt).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      scheduledAt: new Date(e.target.value).toISOString(),
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عدّاد المشاهدين الحاضرين
                </label>
                <input
                  type="number"
                  value={settings.viewerCount || 1420}
                  onChange={(e) =>
                    setSettings({ ...settings, viewerCount: Number(e.target.value) || 0 })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Banner & Interaction Settings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-gold-600" /> الشريط التنبيهي والتفاعل
            </h2>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <div className="text-sm font-bold text-slate-800">
                  تفعيل الشريط التنبيهي العلوي بالموقع
                </div>
                <div className="text-xs text-slate-500">
                  شريط جذاب يظهر في أعلى كافة صفحات الموقع لتوجيه الزوار للبث المباشر.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.bannerEnabled}
                onChange={(e) => setSettings({ ...settings, bannerEnabled: e.target.checked })}
                className="h-5 w-5 rounded text-gold-500 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نص الشريط التنبيهي العلوي
              </label>
              <input
                type="text"
                value={settings.bannerText}
                onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <div className="text-sm font-bold text-slate-800">
                  السماح بالتبريكات والتهاني المباشرة
                </div>
                <div className="text-xs text-slate-500">
                  تمكين الفروع والزوار من نشر تبريكاتهم لايف على شاشة البث.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.allowComments}
                onChange={(e) => setSettings({ ...settings, allowComments: e.target.checked })}
                className="h-5 w-5 rounded text-gold-500 focus:ring-gold-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Video Preview & Congratulations Management */}
        <div className="space-y-6 lg:col-span-5">
          {/* Live Preview Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Video size={16} className="text-gold-600" /> معاينة المشغل الفورية
              </h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                {preview.type}
              </span>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              {preview.embedUrl ? (
                preview.type === 'direct' ? (
                  <video src={preview.embedUrl} controls className="h-full w-full object-contain" />
                ) : (
                  <iframe
                    src={preview.embedUrl}
                    title="Live Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                  لا يوجد رابط صالح للمعاينة
                </div>
              )}
            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              تأكد من أن الفيديو أو البث يعمل بشكل صحيح قبل حفظ الإعدادات للعامة.
            </p>
          </div>

          {/* Congratulations Management Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare size={16} className="text-gold-600" /> إدارة التبريكات والتهاني (
                {congratulations.length})
              </h3>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pe-1">
              {congratulations.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{c.senderName}</span>
                      <span className="rounded-md bg-gold-100 px-2 py-0.5 text-[10px] font-semibold text-gold-800">
                        {c.branchOrCity}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-600 leading-relaxed">{c.message}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteCongratulation(c.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="حذف التهنئة"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {congratulations.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">
                  لا توجد تهاني مسجلة حالياً
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
