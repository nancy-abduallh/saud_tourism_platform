'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Activity,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Heart,
  HeartHandshake,
  HeartPulse,
  HelpCircle,
  Hospital,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
} from 'lucide-react';

const MEDICAL_SPECIALTIES = [
  {
    id: 'organ-transplant',
    title: 'زراعة الأعضاء وجراحة الأورام المتقدمة',
    hospital: 'مستشفى الملك فيصل التخصصي ومركز الأبحاث',
    desc: 'المركز الأول في الشرق الأوسط وإفريقيا في برامج زراعة الكبد، الكلى، والقلب، والعلاج الجيني والمناعي للأورام بأعلى معدلات نجاح عالمية.',
    badge: 'المرتبة الأولى إقليمياً',
    tag: 'زراعة الأعضاء',
  },
  {
    id: 'rehab',
    title: 'التأهيل الطبي الشامل والعلاج الطبيعي المكثف',
    hospital: 'مدينة سلطان بن عبدالعزيز للخدمات الإنسانية',
    desc: 'أضخم صرح تأهيلي واستشفائي في الشرق الأوسط، يضم أحدث أجهزة الروبوت لإعادة التأهيل العصبي والحركي وجراحات العظام والمفاصل.',
    badge: 'أكبر مجمع تأهيلي بالمنطقة',
    tag: 'تأهيل طبي',
  },
  {
    id: 'cardiology',
    title: 'جراحة القلب المفتوح والقسطرة التداخلية',
    hospital: 'مدينة الملك فهد الطبية ومراكز القلب التخصصية',
    desc: 'إجراء أدق عمليات القلب المعقدة، زراعة الصمامات بالقسطرة (TAVI)، وتصحيح العيوب الخلقية للكبار والأطفال بأحدث التقنيات.',
    badge: 'كوادر طبية عالمية',
    tag: 'طب القلب',
  },
  {
    id: 'neuro',
    title: 'جراحة المخ والأعصاب والعمود الفقري بالروبوت',
    hospital: 'المراكز العصبية المتقدمة بالرياض وجدة',
    desc: 'استئصال أورام الدماغ بدقة الميكروسكوب الجراحي، جراحات العمود الفقري بالمنظار والتدخل المحدود لسرعة التعافي والحركة.',
    badge: 'جراحة روبوتية فائقة الدقة',
    tag: 'العلوم العصبية',
  },
  {
    id: 'executive-checkup',
    title: 'الفحوصات الطبية الشاملة والتنفيذية (VIP)',
    hospital: 'أجنحة الفحص الملكي في أرقى مستشفيات العاصمة',
    desc: 'فحص شامل دقيق لكافة أجهزة الجسم والجينات الوراثية خلال يوم واحد، مع استشارات فورية من استشاريين دوليين وإقامة 5 نجوم.',
    badge: 'خلال 24-48 ساعة',
    tag: 'فحص تنفيذي شامل',
  },
  {
    id: 'orthopedics',
    title: 'جراحة العظام واستبدال المفاصل الموجه بالحاسوب',
    hospital: 'مراكز العظام والطب الرياضي التخصصية',
    desc: 'استبدال مفصل الركبة والورك بدقة ثلاثية الأبعاد والروبوت، وعلاج إصابات الملاعب مع برنامج تأهيل استشفائي فندقي متكامل.',
    badge: 'أحدث مفاصل الجيل الجديد',
    tag: 'عظام ومفاصل',
  },
];

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'الاستشارة والتقييم الطبي عن بُعد',
    desc: 'يرسل المريض تقاريره وفحوصاته الطبية، ليتم دراستها من نخبة استشاريين سعوديين معتمدين وتقديم خطة علاجية وتكلفة تقديرية خلال 24-48 ساعة.',
    icon: Stethoscope,
  },
  {
    step: '02',
    title: 'إصدار التأشيرة العلاجية وتنسيق السفر',
    desc: 'إصدار التأشيرات الطبية الرسمية للمريض ومرافقيه بشكل عاجل، وحجز الطيران التجاري أو الإسعاف الجوي الطبي الخاص وتأمين السكن الفاخر.',
    icon: FileText,
  },
  {
    step: '03',
    title: 'الاستقبال والمرافقة الطبية VIP',
    desc: 'استقبال فوري من باب الطائرة بمدرج المطار بسيارات إسعاف مجهزة أو ليموزين VIP، وتوفير منسق طبي ومترجم خاص يرافق المريض طوال رحلته.',
    icon: Plane,
  },
  {
    step: '04',
    title: 'تلقي العلاج في الأجنحة الملكية',
    desc: 'إقامة في أجنحة استشفائية مجهزة بأعلى درجات الراحة والخصوصية، مع إشراف ومتابعة مباشرة من كبار البروفيسورات ورعاية تمريضية خاصة.',
    icon: Hospital,
  },
  {
    step: '05',
    title: 'برامج النقاهة والاستشفاء الطبيعي',
    desc: 'فترة نقاهة واسترخاء في أروع وجهات المملكة: منتجعات أمالا والبحر الأحمر الصحية، مرتفعات عسير الخضراء ذات الهواء العليل، أو واحات العلا.',
    icon: Sparkles,
  },
  {
    step: '06',
    title: 'المتابعة الإلكترونية المستمرة بعد العودة',
    desc: 'تزويد المريض بملف طبي إلكتروني موحد وشامل، وجلسات متابعة دورية عبر الفيديو مع الفريق الطبي المعالج بعد عودته لبلده بسلامة الله.',
    icon: HeartHandshake,
  },
];

const FAQS = [
  {
    q: 'كيف يمكن للمريض القادم من خارج السعودية الحصول على التأشيرة العلاجية؟',
    a: 'يتولى فريق كونسيرج المرضى الدوليين لدينا التنسيق مع الجهات المختصة لإصدار التأشيرة العلاجية السريعة للمريض ومرافقيه، بناءً على قبول التقرير الطبي من المستشفى المرجعي المعالج.',
  },
  {
    q: 'هل تتوفر خدمات الإخلاء الجوي الطبي للحالات الحرجة أو العاجلة؟',
    a: 'نعم، نوفر أسطولاً مجهزاً بالكامل من طائرات الإسعاف الجوي (Air Ambulance) المزودة بوحدات عناية مركزة وطواقم طبية متخصصة لنقل الحالات من مختلف دول العالم مباشرة إلى مستشفيات المملكة.',
  },
  {
    q: 'ما هي خيارات الإقامة المتاحة للمرافقين وأفراد عائلة المريض؟',
    a: 'نوفر أجنحة فندقية 5 نجوم وشققاً فندقية فاخرة قريبة جداً من المستشفيات والمدن الطبية، مع خدمات تنقل خاصة ومساعد شخصي على مدار الساعة لتأمين كافة احتياجات العائلة.',
  },
  {
    q: 'هل تقدمون برامج نقاهة وسياحة بعد إتمام العلاج والعمليات؟',
    a: 'بالتأكيد، تمتاز المملكة بتنوع جغرافي وطبيعي استثنائي؛ فننظم للمريض بعد استقرار حالته برامج استجمام ونقاهة في منتجعات البحر الأحمر الصحية، أو مرتفعات أبها وعسير ذات الطقس المعتدل، أو واحات النخيل التراثية.',
  },
  {
    q: 'كيف يتم تسعير الخدمات الطبية والدفع؟',
    a: 'يتم تقديم تقدير مالي شفاف ومسبق يشمل الخطة العلاجية، الأتعاب الطبية، الإقامة، والتنقلات بعد مراجعة التقارير الطبية الأولية، مع خيارات دفع مرنة وآمنة.',
  },
];

export default function MedicalTourismPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    country: '',
    phone: '',
    specialty: 'organ-transplant',
    companionsCount: '1',
    needsAirAmbulance: 'no',
    medicalSummary: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: formData.patientName,
        email: 'medical-inquiry@saudtourism.sa',
        phone: formData.phone,
        message: `[طلب سياحة علاجية دولية]
بلد المريض: ${formData.country}
التخصص المطلوب: ${formData.specialty}
عدد المرافقين: ${formData.companionsCount}
يحتاج إسعاف جوي/طبي: ${formData.needsAirAmbulance === 'yes' ? 'نعم مطلوب' : 'لا (طيران عادي)'}
ملخص الحالة الطبية:
${formData.medicalSummary}`,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('حدث خطأ أثناء إرسال الطلب، يرجى التواصل مباشرة عبر الواتساب.');
      }
    } catch (err) {
      alert('فشل الاتصال، يرجى المحاولة لاحقاً أو التواصل عبر الواتساب.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `مرحباً، أود الاستفسار عن خدمات السياحة العلاجية في المملكة للمريض: ${formData.patientName || 'مريض دولي'} من دولة ${formData.country || 'خارج المملكة'}. التخصص: ${formData.specialty}`
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 text-navy-950">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-navy-950 py-20 lg:py-28 text-white">
        <div className="absolute inset-0 bg-pattern opacity-30" />
        <div className="absolute top-1/4 right-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        <div className="container-x relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md shadow-md">
            <HeartPulse size={16} className="text-emerald-400 animate-pulse" />
            <span>بوابة السياحة العلاجية والاستشفائية الدولية بالمملكة</span>
          </div>

          <h1 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            رعاية طبية تخصصية بمعايير عالمية ونقاهة ملكية في وطن الخير
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            نستقبل المرضى وعائلاتهم من مختلف دول العالم لتلقي أحدث العلاجات الطبية في كبرى المستشفيات والمدن الطبية المرجعية بالمملكة العربية السعودية، تحت إشراف نخبة من كبار الاستشاريين العالميين، مع خدمات كونسيرج شاملة وبرامج نقاهة واستجمام استثنائية.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 rounded-2xl bg-gold-gradient px-7 py-3.5 text-xs sm:text-sm font-black text-navy-950 shadow-gold hover:scale-105 transition-all"
            >
              <Stethoscope size={16} />
              <span>طلب تقييم طبي واستشارة دولية</span>
            </a>
            <a
              href={`https://wa.me/966571713078?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all"
            >
              <MessageCircle size={16} className="text-emerald-400" />
              <span>محادثة فورية مع الكونسيرج الطبي</span>
            </a>
          </div>

          {/* Quick Badges */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
              <span>مستشفيات معتمدة دولياً (JCI)</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
              <span>تأشيرات علاجية ميسرة وسريعة</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
              <span>إخلاء واستقبال طبي VIP 24/7</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
              <span>برامج نقاهة واستشفاء طبيعي</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Award size={14} className="text-gold-600" />
              <span>أبرز التخصصات والمراكز المرجعية</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-navy-950">
              أرقى الصروح الطبية في الشرق الأوسط
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              تنسيق مباشر مع كبرى المستشفيات والمدن الطبية السعودية الرائدة عالمياً لضمان أعلى نسب النجاح.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MEDICAL_SPECIALTIES.map((spec) => (
              <div
                key={spec.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs transition-all duration-300 hover:border-gold-500/40 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-navy-950 px-2.5 py-1 text-[10px] font-black text-gold-300">
                      {spec.tag}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {spec.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-black text-navy-950 group-hover:text-gold-700 transition-colors">
                    {spec.title}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Hospital size={13} className="text-gold-600 shrink-0" />
                    <span>{spec.hospital}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-200/80 pt-4 flex items-center justify-between">
                  <a
                    href="#consultation"
                    className="text-xs font-bold text-gold-700 hover:text-navy-950 transition-colors inline-flex items-center gap-1"
                  >
                    <span>طلب استشارة في هذا التخصص</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Journey: Step by Step */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-800">
              <Compass size={14} className="text-blue-600" />
              <span>خطوة بخطوة من الوصول حتى التعافي</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-navy-950">
              رحلة المريض الدولي المتكاملة
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              نصمم كل تفصيلة لضمان راحة المريض النفسية والجسدية، وتوفير تجربة استشفائية فاخرة لعائلته.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY_STEPS.map((j) => {
              const Icon = j.icon;
              return (
                <div
                  key={j.step}
                  className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-50 border border-gold-200 text-gold-700 font-display font-black">
                      <Icon size={22} className="text-gold-700" />
                    </div>
                    <span className="font-display text-2xl font-black text-slate-200">
                      {j.step}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-black text-navy-950">
                    {j.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {j.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Consultation Form Section */}
      <section id="consultation" className="py-16 sm:py-24 bg-white border-t border-slate-200 scroll-mt-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <HeartHandshake size={14} className="text-emerald-600" />
                <span>استشارة وتقييم أولي مجاني</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-black text-navy-950 leading-tight">
                ابدأ رحلتك العلاجية الآن مع نخبة الأطباء السعوديين
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                املأ النموذج وسيقوم فريق كونسيرج المرضى الدوليين بمراجعة ملفك الطبي مع الاستشاريين المتخصصين والتواصل معك خلال أقل من 24 ساعة لتقديم الخطة العلاجية والتكلفة وخيارات السفر.
              </p>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <h3 className="text-xs font-black text-navy-950 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>ضمانات الخصوصية والاحترافية:</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold-600 shrink-0" />
                    <span>سرية تامة وتشفير كامل للتقارير والملفات الطبية.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold-600 shrink-0" />
                    <span>فريق طبي مختص يتابع معك خطوة بخطوة باللغة العربية والإنجليزية.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-gold-600 shrink-0" />
                    <span>تنسيق مباشر مع المستشفيات الحكومية والخاصة المرجعية.</span>
                  </li>
                </ul>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="rounded-3xl border border-gold-500/30 bg-navy-950 p-6 text-white space-y-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500/20 text-gold-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">الخط الساخن للمرضى الدوليين</h4>
                    <p className="text-[11px] text-slate-400">متاح 24/7 لاستقبال الحالات العاجلة</p>
                  </div>
                </div>
                <div className="pt-2">
                  <a
                    href="https://wa.me/966571713078?text=مرحباً،%20أود%20الاستفسار%20عن%20السياحة%20العلاجية%20الدولية"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span>تواصل مباشر واتساب: +966 57 171 3078</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-display text-xl font-black text-navy-950">
                      تم استلام طلبك الطبي بنجاح!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      شكراً لثقتكم بنا. سيقوم فريق كونسيرج المرضى الدوليين بمراجعة الحالة مع الفريق الاستشاري والتواصل معكم عبر الهاتف والواتساب خلال ساعات قليلة.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-navy-950 hover:bg-slate-50 transition-colors"
                      >
                        إرسال طلب آخر
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-display text-lg font-black text-navy-950 border-b border-slate-100 pb-3">
                      بيانات المريض واستمارة التقييم الأولي
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          اسم المريض بالكامل *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.patientName}
                          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none"
                          placeholder="الاسم الثلاثي"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          بلد الإقامة / الجنسية *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none"
                          placeholder="مثال: الكويت، الإمارات، مصر، بريطانيا..."
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          رقم الهاتف / الواتساب الدولي *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none dir-ltr text-right"
                          placeholder="+966 ..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          التخصص الطبي المطلوب *
                        </label>
                        <select
                          value={formData.specialty}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none"
                        >
                          <option value="organ-transplant">زراعة الأعضاء وجراحة الأورام المتقدمة</option>
                          <option value="rehab">التأهيل الطبي الشامل والعلاج الطبيعي المكثف</option>
                          <option value="cardiology">جراحة القلب والقسطرة التداخلية</option>
                          <option value="neuro">جراحة المخ والأعصاب والعمود الفقري</option>
                          <option value="executive-checkup">الفحص الطبي الشامل التنفيذي لكبار الشخصيات</option>
                          <option value="orthopedics">جراحة العظام والمفاصل بالروبوت</option>
                          <option value="ophthalmology">طب وجراحة العيون والشبكية</option>
                          <option value="other">تخصص أو استشارة أخرى</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          عدد المرافقين المتوقع
                        </label>
                        <select
                          value={formData.companionsCount}
                          onChange={(e) => setFormData({ ...formData, companionsCount: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none"
                        >
                          <option value="0">بدون مرافق</option>
                          <option value="1">مرافق واحد</option>
                          <option value="2">مرافقان</option>
                          <option value="3+">3 مرافقين أو أكثر</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          هل يحتاج المريض إسعافاً جوياً أو نقلاً طبياً مجهزاً؟
                        </label>
                        <select
                          value={formData.needsAirAmbulance}
                          onChange={(e) => setFormData({ ...formData, needsAirAmbulance: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none"
                        >
                          <option value="no">لا (طيران تجاري عادي)</option>
                          <option value="yes">نعم (إسعاف جوي طبي خاص / حالة دقيقة)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ملخص الحالة والتشخيص الطبي الحالي *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.medicalSummary}
                        onChange={(e) => setFormData({ ...formData, medicalSummary: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-navy-950 focus:border-gold-500 focus:bg-white focus:outline-none leading-relaxed"
                        placeholder="يرجى كتابة نبذة عن الحالة، الأعراض، الفحوصات المجراة مسبقاً، وأي رغبات خاصة بشأن المستشفى المعالج أو فترة النقاهة..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gold-gradient py-3.5 text-xs sm:text-sm font-black text-navy-950 shadow-gold hover:scale-[1.01] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send size={15} />
                      <span>{submitting ? 'جاري إرسال الطلب...' : 'إرسال طلب التقييم الطبي الدولي'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-x max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <HelpCircle size={14} className="text-gold-600" />
              <span>إجابات واضحة</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-black text-navy-950">
              الأسئلة الشائعة حول العلاج بالمملكة
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-start font-bold text-xs sm:text-sm text-navy-950 hover:text-gold-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-gold-600 text-base">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
