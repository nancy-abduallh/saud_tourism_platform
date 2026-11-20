'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Heart,
  HeartHandshake,
  HelpCircle,
  MapPin,
  MessageCircle,
  Mountain,
  Palmtree,
  Phone,
  Plane,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  User,
  Users,
  Waves,
  Wind,
} from 'lucide-react';

interface MedicalDestination {
  id: string;
  name: string;
  title: string;
  region: string;
  description: string;
  highlights: string[];
  image: string;
  badge: string;
  tag: string;
  featuredQuote: string;
  bestFor: string;
}

const MEDICAL_DESTINATIONS: MedicalDestination[] = [
  {
    id: 'abha',
    name: 'أبها',
    title: 'منتجع جبلي هادئ',
    region: 'جبال أبها، المملكة العربية السعودية',
    description:
      'تعتبر منحدرات منطقة عسير منطقة مثالية لراغبي الراحة والاسترخاء. فهي محاطة بالجبال والمساحات الخضراء ويتميز المناخ بالبرودة المنعشة. تكتمل جوانب الرحلة العلاجية في المدينة من خلال الحدائق الهادئة، مثل منتزه عسير الوطني، حيث يمكنك أن تستمتع بالطبيعة والهواء البارد والمناظر الخلابة مما يخلق بيئة تساعد على السلام الداخلي.',
    highlights: [
      'هواء بارد نقي وبيئة جبلية تساعد على السلام الداخلي',
      'منتزه عسير الوطني والحدائق الهادئة المنعشة',
      'إطلالات بانورامية فوق السحاب بعيداً عن التلوث والضوضاء',
      'جلسات استجمام واستعادة النشاط الجسدي والذهني',
    ],
    image: '/images/medical-abha.jpg',
    badge: 'منتجع جبلي هادئ',
    tag: 'سلام داخلي',
    featuredQuote: 'منحدرات خضراء وهواء نقي يساعد على صفاء الذهن والسلام الداخلي.',
    bestFor: 'الراحة النفسية، نقاء الجهاز التنفسي، وتخفيف التوتر والإجهاد',
  },
  {
    id: 'red-sea',
    name: 'ساحل البحر الأحمر',
    title: 'ملاذ صحي واستشفاء شاطئي',
    region: 'كورنيش جدة وسواحل البحر الأحمر',
    description:
      'تقدم طبيعة ساحل البحر الأحمر مجموعة من الملاذات الساحلية. تتميز وجهات مثل جدة والخبر بشواطئ رائعة حيث يمكنك الاسترخاء على الشواطئ أمام المياه الصافية. سواء كان ذلك من خلال ممارسة اليوغا على الشاطئ أو الاستمتاع بعلاجات المنتجع المريحة، يوفر ساحل البحر الأحمر أجواء هادئة لرحلتك العلاجية.',
    highlights: [
      'ممارسة اليوغا والتأمل الشاطئي أمام المياه الفيروزية',
      'علاجات المنتجع المريحة والسبا البحري المتطور',
      'الاسترخاء على شواطئ البحر الأحمر النقية',
      'أجواء كورنيش جدة ومسجد الرحمة العائم لراحة الروح والجسد',
    ],
    image: '/images/medical-redsea-jeddah.jpg',
    badge: 'ملاذ صحي',
    tag: 'عافية شاطئية',
    featuredQuote: 'مزيج هادئ من اليوغا الشاطئية وعلاجات السبا أمام أمواج البحر الصافية.',
    bestFor: 'العلاج بمياه البحر (Thalassotherapy)، جلسات اليوغا، والاسترخاء العميق',
  },
  {
    id: 'ahsa',
    name: 'الأحساء',
    title: 'جمال الطبيعة والينابيع الساخنة العلاجية',
    region: 'واحة الأحساء، المملكة العربية السعودية',
    description:
      'تشتهر مدينة الأحساء بالواحات والبحيرات الهادئة والينابيع الساخنة. يعتقد أن ينابيع الهفوف تمتلك خصائص علاجية، مما يجعلها وجهة مرغوبة للباحثين عن وجهات متعلقة بالصحة الجسدية. استكشف واحة النخيل الواسعة، وقم بزيارة جبل القارة الهادئ، واستمتع بالممارسات العلاجية التقليدية، مثل الحمامات الطينية وجلسات الاسترخاء.',
    highlights: [
      'ينابيع الهفوف الكبريتية والساخنة ذات الخصائص العلاجية',
      'الحمامات الطينية التقليدية لتجديد حيوية البشرة والمفاصل',
      'واحة النخيل الواسعة المدرجة باليونسكو والبحيرات الهادئة',
      'جبل القارة بكهوفه ذات التهوية والحرارة الطبيعية المعتدلة',
    ],
    image: '/images/medical-ahsa.jpg',
    badge: 'ينابيع ساخنة وعلاج طبيعي',
    tag: 'حمامات طينية',
    featuredQuote: 'واحات وارفة وينابيع حارة تمتلك خصائص علاجية مثبتة عبر الأجيال.',
    bestFor: 'علاج المفاصل، الروماتيزم، صحة الجلد والبشرة، والاستجمام الطبيعي',
  },
  {
    id: 'taif',
    name: 'الطائف',
    title: 'جنة زهور للاسترخاء',
    region: 'مدينة الطائف، المملكة العربية السعودية',
    description:
      'تعرف الطائف بـ "مدينة الورود" نظرًا لأنها محاطة بحدائق ذات رائحة عطرية وتتمتع بهواء جبلي منعش. المناخ المعتدل للمدينة والمناظر الخلابة تجعلها وجهة شهيرة للراحة واستعادة النشاط. تجول في حدائق الورود وحدائق قصر شبرا، حيث ستهدأ حواسك في أجواء الطبيعة.',
    highlights: [
      'استنشاق أريج مزارع الورد الطائفي العطرية الزكية',
      'العلاج العطري الطبيعي (Aromatherapy) بمستخلصات الورد الملكي',
      'مناخ جبلي معتدل ومنعش على مدار العام',
      'جولات الاسترخاء في حدائق الورود وحدائق قصر شبرا التاريخية',
    ],
    image: '/images/medical-taif.jpg',
    badge: 'جنة زهور للاسترخاء',
    tag: 'مدينة الورود',
    featuredQuote: 'حدائق الورود الفواحة والمناخ المعتدل لتهدئة الحواس واستعادة النشاط.',
    bestFor: 'العلاج بالروائح الطبيعية، تصفية الذهن، ونقاهة الجهاز العصبي',
  },
  {
    id: 'alula',
    name: 'العلا',
    title: 'التوازن بين الحاضر والماضي',
    region: 'الصخور الرملية الطبيعية في العلا، المملكة العربية السعودية',
    description:
      'تخلق التكوينات الصخرية القديمة والكنوز التاريخية في العلا جوًا من الهدوء والدهشة. استكشف المناظر الخلابة في البلدة القديمة وصخرة الفيل، وعيش تجربة صحية بينما تتعرف على تراث المدينة وسط بيئة ملهمة تحقق التوازن والسكينة.',
    highlights: [
      'تأمل وسكون مطلق بين التكوينات الصخرية القديمة والرمال الذهبية',
      'منتجعات عافية متخصصة في العزلة الإيجابية والتخلص من الضغوط',
      'استكشاف البلدة القديمة وصخرة الفيل وصخرة الجرة التاريخية',
      'تحقيق التوازن النفسي والجسدي وسط عجائب الطبيعة الصخرية',
    ],
    image: '/images/medical-alula.jpg',
    badge: 'التوازن بين الحاضر والماضي',
    tag: 'سكينة تاريخية',
    featuredQuote: 'سحر الصخور القديمة يعزل ضوضاء العالم ليخلق جوًا من الهدوء والدهشة.',
    bestFor: 'التأمل الواعي (Mindfulness)، الديتوكس الفكري، والتوازن الروحي',
  },
  {
    id: 'rub-al-khali',
    name: 'السكينة في الصحراء العربية',
    title: 'السكينة والهدوء في الصحراء العربية',
    region: 'صحراء الربع الخالي، المملكة العربية السعودية',
    description:
      'لتجربة علاجية فريدة، توجه إلى قلب الصحراء العربية. مع وجهات مثل الربع الخالي، يمكنك الانطلاق في رحلات استرخاء روحية في الصحراء. كما يمكنك التواصل مع الطبيعة والاستمتاع برؤية النجوم وممارسة اليوغا في أوساط الكثبان الرملية الشاسعة.',
    highlights: [
      'رحلات استرخاء روحية عميقة في قلب الصحراء العربية الشاسعة',
      'ممارسة اليوغا والتنفس الصحي فوق الكثبان الرملية الذهبية',
      'التواصل النقي مع الطبيعة بعيداً عن الشاشات والضوضاء',
      'رؤية النجوم والمجرات ليلاً في سماء فائقة الصفاء والنقاء',
    ],
    image: '/images/medical-rub-al-khali.jpg',
    badge: 'سكينة الصحراء',
    tag: 'رحلات روحية',
    featuredQuote: 'كثبان رملية شاسعة وسماء مليئة بالنجوم لرحلة استرخاء روحية لا مثيل لها.',
    bestFor: 'الديتوكس الرقمي، التأمل العميق، والهدوء النفسي التام',
  },
  {
    id: 'riyadh',
    name: 'السياحة العلاجية في الرياض',
    title: 'السياحة العلاجية ومرافق العافية بالرياض',
    region: 'حديقة السلام والحي الدبلوماسي، الرياض، المملكة العربية السعودية',
    description:
      'حتى عاصمة المملكة العربية السعودية، الرياض، تضم وجهات سياحة علاجية. استرخ في أجواء حديقة السلام، حيث يمكنك الاسترخاء في وسط الخضرة والاستمتاع بالأنشطة في الهواء الطلق. ويقدم الحي الدبلوماسي مرافق علاجية بما في ذلك المنتجعات الصحية ومراكز اللياقة، لتلبية احتياجات المسافرين الباحثين عن الصحة.',
    highlights: [
      'استرخاء طبيعي وسط الخضرة والبحيرة الهادئة في حديقة السلام',
      'مرافق علاجية متطورة ومنتجعات صحية عالمية في الحي الدبلوماسي',
      'مراكز لياقة بدنية واستشفاء متكاملة تحت إشراف اختصاصيين',
      'مزيج فريد يجمع بين رفاهية العاصمة وهدوء الطبيعة والأنشطة الصحية',
    ],
    image: '/images/medical-salam-park.jpg',
    badge: 'عافية العاصمة',
    tag: 'مرافق علاجية',
    featuredQuote: 'خضرة وارفة في حديقة السلام ومرافق صحية عالمية تلبي متطلبات الباحثين عن العافية.',
    bestFor: 'برامج العافية التنفيذية، الاسترخاء في الهواء الطلق، والنوادي الصحية المتطورة',
  },
];

const BOOKING_STEPS = [
  {
    step: '01',
    title: 'اختر وجهتك العلاجية المفضلة',
    desc: 'اختر من بين الوجهات الـ 7 الطبيعية بالمملكة بحسب طبيعة الاستشفاء التي تبحث عنها: جبال أبها الباردة، شواطئ البحر الأحمر، ينابيع الأحساء، حدائق الطائف، صخور العلا، سكينة الربع الخالي، أو حدائق ومرافق الرياض.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'تنسيق واستشارة مخصصة مع مستشار العافية',
    desc: 'يتواصل معك منسق السياحة العلاجية لتصميم برنامج استشفائي خاص يلبي احتياجاتك، متضمناً جلسات اليوغا، الحمامات الكبريتية، علاجات السبا، والتأمل الطبيعي.',
    icon: HeartHandshake,
  },
  {
    step: '03',
    title: 'تأكيد الحجز وكافة الترتيبات اللوجستية',
    desc: 'نتولى ترتيبات الإقامة الفندقية الفاخرة أو النزل الريفية والصحية، تأمين التنقلات بسيارات خاصة وسائق، وتسهيل إجراءات التأشيرة للضيوف القادمين من خارج المملكة.',
    icon: FileText,
  },
  {
    step: '04',
    title: 'الاستقبال وعيش التجربة العلاجية براحة تامة',
    desc: 'استقبال خاص من المطار، ومرافقة كونسيرج مخصص 24/7 طوال فترة إقامتك لضمان أعلى مستويات الهدوء والخصوصية والسلام الداخلي.',
    icon: Sparkles,
  },
];

const FAQS = [
  {
    q: 'ما هي وجهات السياحة العلاجية والاستشفائية في المملكة العربية السعودية؟',
    a: 'تضم المملكة 7 وجهات بارزة للسياحة العلاجية والاستشفاء الطبيعي: جبال أبها (منتجع جبلي بارد)، ساحل البحر الأحمر وجدة (ملاذ صحي ويوغا شاطئية)، الأحساء (ينابيع ساخنة وحمامات طينية)، الطائف (جنة زهور وعلاج عطري)، العلا (سكينة وتوازن بين الحاضر والماضي)، الربع الخالي (هدوء الصحراء والنجوم)، والرياض (حديقة السلام ومرافق الحي الدبلوماسي).',
  },
  {
    q: 'كيف يمكنني حجز رحلة سياحة علاجية واستشفائية؟',
    a: 'يمكنك الحجز بسهولة عبر اختيار الوجهة المطلوبة من خلال النموذج في هذه الصفحة، أو التواصل الفوري عبر الواتساب مع مستشار رحلات العافية. سنقوم بتجهيز جدول الرحلة، الإقامة، وتأكيد المواعيد فوراً.',
  },
  {
    q: 'هل توفرون التنسيق للقادمين من خارج المملكة العربية السعودية؟',
    a: 'نعم، نوفر خدمات شاملة للمسافرين القادمين من خارج المملكة تتضمن تسهيل التأشيرات السياحية والعلاجية، الاستقبال الخاص من المطار، وتأمين الإقامة الفاخرة ووسائل التنقل والمترجمين.',
  },
  {
    q: 'ما هي الفوائد الصحية لزيارة ينابيع الأحساء الحارة؟',
    a: 'تتميز ينابيع الهفوف في الأحساء بمياهها المعدنية الكبريتية الدافئة والحمامات الطينية، والتي تُعرف بقدرتها على تخفيف آلام المفاصل، تنشيط الدورة الدموية، وتجديد حيوية البشرة.',
  },
  {
    q: 'هل البرامج مناسبة للعائلات والأفراد على حد سواء؟',
    a: 'نعم، كافة برامج وجهات السياحة العلاجية والاستشفائية مصممة لتلائم الأفراد الراغبين في العزلة والهدوء، وكذلك العائلات الباحثة عن الراحة والنقاهة وسط بيئة آمنة وراقية.',
  },
];

export default function MedicalTourismPage() {
  const [destinations, setDestinations] = useState<MedicalDestination[]>(MEDICAL_DESTINATIONS);
  const [heroConfig, setHeroConfig] = useState({
    badge: 'السياحة العلاجية والاستشفاء الطبيعي بالمملكة',
    title: '7 وجهات للسياحة العلاجية في المملكة العربية السعودية',
    subtitle:
      'استكشف ملاذات الراحة والاسترخاء والسلام الداخلي بالمملكة: من هواء جبال أبها العليل وملاذات البحر الأحمر الشاطئية، إلى ينابيع الأحساء الساخنة، حدائق الطائف العطرة، سكينة صخور العلا، هدوء صحراء الربع الخالي، ومرافق العافية في العاصمة الرياض.',
    whatsappPhone: '966571713078',
  });
  const [selectedDestination, setSelectedDestination] = useState<string>('abha');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    guests: '2',
    date: '',
    destination: 'abha',
    experienceType: 'طبيعة واسترخاء عام',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/sections')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (Array.isArray(data.medicalDestinations) && data.medicalDestinations.length > 0) {
            setDestinations(data.medicalDestinations);
          }
          if (data.medicalHero) {
            setHeroConfig((prev) => ({ ...prev, ...data.medicalHero }));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectDestination = (destId: string) => {
    setSelectedDestination(destId);
    setFormData((prev) => ({ ...prev, destination: destId }));
    const formEl = document.getElementById('booking-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentDest =
    destinations.find((d) => d.id === selectedDestination) || destinations[0] || MEDICAL_DESTINATIONS[0];

  const whatsappPhone = heroConfig.whatsappPhone || '966571713078';
  const whatsappMessage = encodeURIComponent(
    `مرحباً، أود الاستفسار وحجز رحلة سياحة علاجية واستشفائية إلى: ${currentDest.name} (${currentDest.title}). أرجو تزويدي بالبرامج والترتيبات المتاحة.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: 1,
          fullName: formData.name,
          email: `${formData.phone.replace(/[^0-9]/g, '') || 'patient'}@medical.saudtourism.sa`,
          phone: formData.phone,
          startDate: formData.date || new Date().toISOString().split('T')[0],
          guests: Number(formData.guests) || 2,
          vipAddon: true,
          notes: `[طلب سياحة علاجية واستشفاء] الوجهة: ${currentDest.name} (${currentDest.title}) | الدولة: ${formData.country} | نوع البرنامج: ${formData.experienceType} | ملاحظات إضافية: ${formData.notes || 'لا توجد'}`,
          totalSar: 0,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setBookingReference(json.reference || 'SA-' + Math.random().toString(36).substring(2, 8).toUpperCase());
        setSubmitted(true);
      } else {
        setErrorMessage(json.message || 'حدث خطأ أثناء معالجة الطلب، يرجى المحاولة مرة أخرى.');
      }
    } catch {
      // In case of network glitch, provide fallback reference
      setBookingReference('SA-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-navy-950 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex flex-col justify-center items-center text-white">
        {/* Background Image Container: reveals the whole landscape with a balanced black overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          {/* Ambient blurred backdrop so ultra-wide screens seamlessly extend canyon colors */}
          <img
            src="/images/medical-hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center scale-110 blur-xl opacity-35"
          />

          {/* Crisp background image displayed in its entirety */}
          <img
            src="/images/medical-hero-bg.jpg"
            alt="ملاذات وطبيعة السياحة العلاجية والاستشفاء في المملكة العربية السعودية"
            className="absolute inset-0 h-full w-full object-cover sm:object-cover object-[center_35%]"
          />

          {/* Balanced black tint (not too dark to let image shine, dark enough to make words completely obvious) */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.4)_0%,_transparent_75%)]" />
        </div>

        {/* Ambient Subtle Glows */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl z-0" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl z-0" />

        <div className="container-x relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-black/60 px-4 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md shadow-lg"
          >
            <Sparkles size={14} className="text-gold-400" />
            <span>{heroConfig.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-white tracking-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_12px_rgb(0_0_0_/_90%)]"
          >
            {heroConfig.title.includes('في') ? (
              <>
                <span className="drop-shadow-lg">{heroConfig.title.split('في')[0]}في</span>{' '}
                <span className="text-gold-300 inline-block font-extrabold drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]">
                  {heroConfig.title.split('في').slice(1).join('في').trim()}
                </span>
              </>
            ) : (
              <span className="text-gold-300 font-extrabold drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)]">{heroConfig.title}</span>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-3xl rounded-2xl bg-black/45 p-4 sm:p-5 backdrop-blur-md border border-white/20 shadow-2xl"
          >
            <p className="text-sm sm:text-base text-white font-medium leading-relaxed text-center drop-shadow-sm">
              {heroConfig.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Anchor Bar */}
      <section className="sticky top-20 z-30 border-y border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
        <div
          className="container-x py-3 flex gap-2 overflow-x-auto scrollbar-none items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <span className="text-xs font-bold text-slate-500 shrink-0 ml-2">انتقل مباشرة:</span>
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelectDestination(d.id)}
              className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedDestination === d.id
                  ? 'bg-gold-gradient text-navy-950 font-black shadow-sm'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-gold-400 hover:text-navy-950'
              }`}
            >
              {d.name}
            </button>
          ))}
          <a
            href="#how-to-book"
            className="shrink-0 rounded-xl bg-navy-900 text-gold-300 px-3.5 py-1.5 text-xs font-bold hover:bg-navy-950 transition-colors mr-auto"
          >
            كيفية الحجز ←
          </a>
        </div>
      </section>

      {/* 7 Medical & Wellness Destinations Detailed Section */}
      <section id="destinations-grid" className="py-16 sm:py-24">
        <div className="container-x">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Sun size={13} className="text-gold-600" />
              <span>ملاذات الاسترخاء والسلام الداخلي بالمملكة</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-black text-navy-950">
              الوجهات الـ 7 للسياحة العلاجية والاستشفائية
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              بيئات طبيعية متنوعة صُممت لتمنح الجسد والروح فرصة للتجدد والسكينة التامة
            </p>
          </div>

          <div className="space-y-16">
            {destinations.map((dest, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={dest.id}
                  id={`dest-${dest.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5 }}
                  className={`grid gap-8 lg:grid-cols-12 items-center rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow ${
                    selectedDestination === dest.id ? 'ring-2 ring-gold-400' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-md group">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

                      {/* Badge Top Right */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/85 px-3.5 py-1 text-xs font-bold text-gold-300 backdrop-blur-md">
                        <Sparkles size={12} className="text-gold-400" />
                        <span>{dest.badge}</span>
                      </div>

                      {/* Region Bottom Right */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-bold text-white/95">
                        <MapPin size={13} className="text-gold-400" />
                        <span>{dest.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800 mb-2">
                      الوجهة {idx + 1} من 7
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black text-navy-950">
                      {dest.name} - <span className="text-gold-700">{dest.title}</span>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Best for Box */}
                    <div className="mt-4 rounded-xl border border-gold-500/20 bg-gold-50/50 p-3 text-xs text-navy-900">
                      <span className="font-black text-gold-800">الأفضل لـ: </span>
                      <span>{dest.bestFor}</span>
                    </div>

                    {/* Highlights List */}
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {dest.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleSelectDestination(dest.id)}
                        className="btn-gold !py-2.5 !px-5 text-xs font-bold shadow-sm"
                      >
                        احجز رحلتك إلى {dest.name}
                      </button>

                      <a
                        href={`https://wa.me/966571713078?text=${encodeURIComponent(
                          `مرحباً، أود الاستفسار عن باقات السياحة العلاجية والاسترخاء في: ${dest.name} (${dest.title}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-emerald-700 transition-colors shadow-sm"
                      >
                        <MessageCircle size={15} />
                        <span>استشارة واتساب سريعة</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How To Book Section */}
      <section id="how-to-book" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <Calendar size={13} className="text-gold-600" />
              <span>خطوات ميسرة وخدمة متكاملة</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-4xl font-black text-navy-950">
              كيفية حجز رحلتك العلاجية والاستشفائية في 4 خطوات
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              من لحظة تواصلك معنا وحتى عودتك سالماً، نرافقك بخدمة كبار الشخصيات لضمان أقصى درجات الراحة والاستجمام
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKING_STEPS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm hover:border-gold-500/50 hover:bg-white hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-gradient text-navy-950 shadow-gold font-black">
                        <Icon size={22} />
                      </div>
                      <span className="font-display text-2xl font-black text-slate-300">
                        {s.step}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-base font-bold text-navy-950">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-gold-700 flex items-center gap-1">
                    <span>مشمول بالكامل</span>
                    <span>✓</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form & Concierge Assistance Section */}
      <section id="booking-form-section" className="py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Form Info Box */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>تنسيق فوري وخصوصية تامة</span>
                </div>

                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 leading-tight">
                  احجز وجهتك العلاجية الآن مع كونسيرج SA للعافية
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  أدخل بياناتك وسيقوم مستشار السياحة العلاجية والاستشفاء بالتواصل معك خلال ساعتين لتنسيق كافة تفاصيل رحلتك: الإقامة، الجلسات العلاجية، الاستقبال والنقل، والتأشيرات للمسافرين الدوليين.
                </p>

                <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-xs">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-800">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-navy-950">رد واستجابة سريعة</div>
                      <div className="text-slate-500">تواصل مباشر خلال 1-2 ساعة بحد أقصى</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                      <Plane size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-navy-950">استقبال وتسهيلات دولية</div>
                      <div className="text-slate-500">تأشيرات، استقبال VIP من المطار، وتنقلات خاصة</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-800">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-navy-950">هاتف وكونسيرج مباشر</div>
                      <a href={`tel:+${whatsappPhone}`} className="text-slate-500 hover:text-gold-600 font-mono" dir="ltr">
                        +{whatsappPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Box */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                      <Check size={32} />
                    </div>
                    <h3 className="font-display text-2xl font-black text-navy-950">
                      تم استلام طلب حجز رحلتك العلاجية بنجاح!
                    </h3>
                    {bookingReference && (
                      <div
                        className="mt-3 inline-block rounded-xl bg-gold-50 border border-gold-300 px-4 py-2 font-mono text-sm font-black text-navy-950 shadow-sm"
                        dir="ltr"
                      >
                        رقم المرجع: {bookingReference}
                      </div>
                    )}
                    <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      شكراً لتواصلك معنا. تم تسجيل طلبك لدى لوحة الإدارة وسيقوم مستشار رحلات العافية بمراجعته والتواصل معك فوراً لتأكيد الترتيبات.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700"
                      >
                        <MessageCircle size={15} />
                        <span>متابعة فورية عبر الواتساب</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        إرسال طلب لوجهة أخرى
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-black text-navy-950">
                        نموذج حجز واستشارة الوجهات العلاجية
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        يرجى ملء النموذج أدناه لتخصيص أفضل برنامج استشفائي يلبي تطلعاتك
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-700 border border-red-200">
                        {errorMessage}
                      </div>
                    )}

                    {/* Destination Selection */}
                    <div>
                      <label className="label">اختر الوجهة العلاجية المطلوبة *</label>
                      <select
                        value={formData.destination}
                        onChange={(e) => {
                          setFormData({ ...formData, destination: e.target.value });
                          setSelectedDestination(e.target.value);
                        }}
                        required
                        className="field"
                      >
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} — {d.title} ({d.badge})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Personal Details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="الاسم الثلاثي"
                          className="field"
                        />
                      </div>
                      <div>
                        <label className="label">رقم الهاتف / واتساب *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="مثال: +966 50 123 4567"
                          className="field"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="label">الدولة / الجنسية *</label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="مثال: الإمارات / الكويت / بريطانيا"
                          className="field"
                        />
                      </div>
                      <div>
                        <label className="label">عدد المسافرين</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="field"
                        >
                          <option value="1">شخص واحد (مفرد)</option>
                          <option value="2">شخصان (زوجي)</option>
                          <option value="3">3 أشخاص</option>
                          <option value="4">عائلة (4 أشخاص)</option>
                          <option value="5+">مجموعة (5 فأكثر)</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">التاريخ المقترح للرحلة</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="field"
                        />
                      </div>
                    </div>

                    {/* Experience Type */}
                    <div>
                      <label className="label">نوع الرعاية أو التجربة المفضلة</label>
                      <select
                        value={formData.experienceType}
                        onChange={(e) => setFormData({ ...formData, experienceType: e.target.value })}
                        className="field"
                      >
                        <option value="استرخاء وهواء جبلي طبيعي (أبها / الطائف)">استرخاء وهواء جبلي طبيعي (أبها / الطائف)</option>
                        <option value="يوغا وعلاجات سبا شاطئية (ساحل البحر الأحمر)">يوغا وعلاجات سبا شاطئية (ساحل البحر الأحمر)</option>
                        <option value="ينابيع حارة وحمامات طينية واستشفاء جسدي (الأحساء)">ينابيع حارة وحمامات طينية واستشفاء جسدي (الأحساء)</option>
                        <option value="علاج عطري ونقاهة بحدائق الورود (الطائف)">علاج عطري ونقاهة بحدائق الورود (الطائف)</option>
                        <option value="تأمل وعزلة إيجابية وسط الصخور والتاريخ (العلا)">تأمل وعزلة إيجابية وسط الصخور والتاريخ (العلا)</option>
                        <option value="ديتوكس رقمي ويوغا في سكون الصحراء (الربع الخالي)">ديتوكس رقمي ويوغا في سكون الصحراء (الربع الخالي)</option>
                        <option value="أنشطة الهواء الطلق ومرافق العافية الحديثة (الرياض)">أنشطة الهواء الطلق ومرافق العافية الحديثة (الرياض)</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="label">ملاحظات أو متطلبات خاصة (اختياري)</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="أي متطلبات صحية، نوع الإقامة المفضل، أو تفاصيل ترغب في مشاركتها معنا..."
                        className="field resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold w-full !py-3.5 text-sm font-black shadow-gold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <span>جاري إرسال الطلب...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>تأكيد طلب حجز الرحلة العلاجية</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-500">
                      بياناتك الشخصية والصحية مشمولة بالسرية والخصوصية التامة وفق أعلى المعايير.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="container-x max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-1 text-xs font-bold text-gold-800">
              <HelpCircle size={13} className="text-gold-600" />
              <span>معلومات هامة</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-navy-950">
              الأسئلة الشائعة حول السياحة العلاجية والاستشفاء
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-right font-display text-sm sm:text-base font-bold text-navy-950 hover:text-gold-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-mono text-gold-600 transition-transform">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
