'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { api } from '@/lib/client-api';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token, user } = await api<{ token: string; user: { name: string } }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      localStorage.setItem('st_token', token);
      localStorage.setItem('st_user', user.name);
      router.push('/admin');
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-navy-gradient p-4">
      <div className="absolute inset-0 bg-pattern opacity-60" />
      <motion.form initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="glass relative w-full max-w-md rounded-3xl p-8 text-white shadow-2xl">
        <img src="/logo.png" alt="SA للسياحة" className="mx-auto mb-3 h-20 w-20 rounded-full ring-2 ring-gold-500/70" />
        <div className="flex flex-col items-center justify-center text-center">
          <span
            className="allura-regular font-allura text-4xl leading-none text-gold-gradient drop-shadow"
            style={{ fontFamily: '"Allura", cursive' }}
            dir="ltr"
          >
            SA
          </span>
          <span className="font-display text-xs font-bold tracking-[0.25em] text-white leading-tight mt-1">
            للسياحة
          </span>
        </div>
        <h1 className="mt-4 text-center font-display text-xl font-bold text-white/90">لوحة تحكم الإدارة</h1>
        <div className="mt-8 space-y-4">
          <input required type="email" dir="ltr" placeholder="البريد الإلكتروني" className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              dir="ltr"
              placeholder="كلمة المرور"
              className="field pr-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 z-10 flex items-center pr-3.5 text-black hover:text-gray-700 focus:outline-none transition-colors cursor-pointer"
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-black stroke-[2.2]" />
              ) : (
                <Eye size={20} className="text-black stroke-[2.2]" />
              )}
            </button>
          </div>
          {error && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{error}</p>}
          <button disabled={busy} className="btn-gold w-full">{busy ? <Loader2 className="animate-spin" /> : <><Lock size={18} /> تسجيل الدخول</>}</button>
        </div>
      </motion.form>
    </main>
  );
}
