-- ========================================================================
-- جدول إعدادات البث المباشر وحفل التدشين (Live Stream & Launch Ceremony)
-- منصة SA للسياحة | فروع ومناطق المملكة العربية السعودية
-- ========================================================================

CREATE TABLE IF NOT EXISTS `live_stream_settings` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `is_live` TINYINT(1) DEFAULT 0,
  `status` VARCHAR(20) DEFAULT 'UPCOMING',
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(500) NULL,
  `scheduled_at` VARCHAR(50) NULL,
  `stream_url` TEXT NOT NULL,
  `stream_platform` VARCHAR(50) DEFAULT 'youtube',
  `recording_url` TEXT NULL,
  `banner_enabled` TINYINT(1) DEFAULT 1,
  `banner_text` VARCHAR(255) NULL,
  `allow_comments` TINYINT(1) DEFAULT 1,
  `viewer_count` INT DEFAULT 1420,
  `hero_badge` VARCHAR(100) NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `live_congratulations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sender_name` VARCHAR(100) NOT NULL,
  `branch_or_city` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `is_approved` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `live_agenda_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `time` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- بيانات التدشين الافتراضية لموعد الخميس 03:00 عصراً
INSERT INTO `live_stream_settings` (
  `id`, `is_live`, `status`, `title`, `subtitle`, `scheduled_at`, `stream_url`, `stream_platform`, `recording_url`, `banner_enabled`, `banner_text`, `allow_comments`, `viewer_count`, `hero_badge`
) VALUES (
  1,
  0,
  'UPCOMING',
  'حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)',
  'بث حي ومباشر يجمع قيادات السياحة وضيوف الشرف، وربط تفاعلي مباشر مع كافة فروع ومناطق المملكة العربية السعودية',
  '2026-11-19T15:00:00',
  'https://www.youtube.com/watch?v=R6D7jQI4BD0',
  'youtube',
  'https://www.youtube.com/watch?v=R6D7jQI4BD0',
  1,
  '🔴 موعدنا الخميس 03:00 م: انطلاق حفل التدشين الرسمي لمنصة SA للسياحة وفروع المملكة الـ 13',
  1,
  1420,
  'الحدث الرسمي للتدشين'
) ON DUPLICATE KEY UPDATE
  `status`=VALUES(`status`),
  `is_live`=VALUES(`is_live`),
  `scheduled_at`=VALUES(`scheduled_at`),
  `stream_url`=VALUES(`stream_url`);

-- تبريكات وتهاني الفروع الافتراضية
INSERT INTO `live_congratulations` (`id`, `sender_name`, `branch_or_city`, `message`, `is_approved`) VALUES
(1, 'فهد السبيعي', 'فرع الرياض (الرئيسي)', 'ألف مبروك التدشين الرسمي للمنصة! انطلاقة مباركة نحو آفاق سياحية سعودية بمعايير عالمية تليق بالمملكة.', 1),
(2, 'د. سلطان الشمري', 'فرع حايل', 'تهانينا القلبية من عروس الشمال حايل لكافة فريق العمل والشركاء بمناسبة التدشين المبارك، متفائلون بمستقبل سياحي باهر.', 1),
(3, 'م. خالد الشهري', 'فرع عسير', 'من قمم عسير وأبها البهية نبارك لكم هذا الإنجاز السياحي الرائد لخدمة ضيوف المملكة وتقديم تجارب لا تُنسى.', 1),
(4, 'عبدالرحمن العتيبي', 'فرع القصيم', 'مبارك التدشين، خطوة عملاقة ونوعية لتنشيط التجارب السياحية الفاخرة وربط مكاتب المملكة بشبكة واحدة متكاملة.', 1),
(5, 'سارة الدوسري', 'فرع الدمام والشرقية', 'فخورون بهذا التدشين المتميز وشبكة فروعنا الممتدة، كل التوفيق والنجاح لـ SA للسياحة في رحلتها القادمة.', 1),
(6, 'ياسر الأحمدي', 'فرع المدينة المنورة والعلا', 'نبارك لجميع منسوبي وضيوف المنصة، جاهزون لتقديم أبهى استقبال في طيبة الطيبة والعلا الساحرة.', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- فقرات فعاليات الحفل الرسمية
INSERT INTO `live_agenda_items` (`id`, `time`, `title`, `description`, `sort_order`) VALUES
(1, '03:00 م', 'الافتتاح والسلام الملكي السعودي', 'استقبال ضيوف الشرف وممثلي فروع المملكة الـ 13 وانطلاق مراسم الحفل بالسلام الملكي.', 1),
(2, '03:15 م', 'الكلمة الافتتاحية لرئاسة الجمعية', 'تسليط الضوء على الرؤية الطموحة لقطاع السياحة الفاخرة ومواءمة المنصة مع مستهدفات رؤية السعودية 2030.', 2),
(3, '03:35 م', 'العرض المرئي للتدشين الرسمي لمنصة SA للسياحة', 'استعراض واجهات المنصة الرقمية، نظام حجز الباقات VIP، وتجارب العلا والبحر الأحمر وطويق والدرعية.', 3),
(4, '04:00 م', 'إطلاق شبكة التمثيل الميداني بالمملكة (13 فرعاً)', 'ربط البث مع مديري وممثلي فروع الرياض، القصيم، حائل، العلا، تبوك، عسير، والشرقية للإعلان الميداني.', 4),
(5, '04:30 م', 'توقيع مذكرات التفاهم وتكريم الشركاء', 'إعلان الشراكات الاستراتيجية مع مشغلي الفنادق العالمية وخطوط الطيران، والتقاط الصور التذكارية.', 5)
ON DUPLICATE KEY UPDATE `id`=`id`;
