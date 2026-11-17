-- ========================================================================
-- جدول إعدادات البث المباشر وحفل التدشين (Live Stream & Launch Ceremony)
-- منصة SA للسياحة | فروع ومناطق المملكة العربية السعودية
-- ========================================================================

CREATE TABLE IF NOT EXISTS `live_stream_settings` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `is_live` TINYINT(1) DEFAULT 1,
  `status` VARCHAR(20) DEFAULT 'LIVE',
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

-- بيانات التدشين الافتراضية
INSERT INTO `live_stream_settings` (
  `id`, `is_live`, `status`, `title`, `subtitle`, `scheduled_at`, `stream_url`, `stream_platform`, `recording_url`, `banner_enabled`, `banner_text`, `allow_comments`, `viewer_count`, `hero_badge`
) VALUES (
  1,
  1,
  'LIVE',
  'حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)',
  'بث حي ومباشر يجمع قيادات السياحة وضيوف الشرف، وربط تفاعلي مباشر مع كافة فروع ومناطق المملكة العربية السعودية',
  '2026-11-20T19:30:00',
  'https://www.youtube.com/watch?v=3nQ6L8bQeYc',
  'youtube',
  'https://www.youtube.com/watch?v=3nQ6L8bQeYc',
  1,
  '🔴 بث مباشر الآن: انطلاق حفل التدشين الرسمي لمنصة SA للسياحة وفروع المملكة الـ 13',
  1,
  1420,
  'بث مباشر حي عبر المملكة'
) ON DUPLICATE KEY UPDATE `id`=`id`;

-- تبريكات وتهاني الفروع الافتراضية
INSERT INTO `live_congratulations` (`sender_name`, `branch_or_city`, `message`, `is_approved`) VALUES
('فهد السبيعي', 'فرع الرياض (الرئيسي)', 'ألف مبروك التدشين الرسمي للمنصة! انطلاقة مباركة نحو آفاق سياحية سعودية بمعايير عالمية تليق بالمملكة.', 1),
('د. سلطان الشمري', 'فرع حايل', 'تهانينا القلبية من عروس الشمال حايل لكافة فريق العمل والشركاء بمناسبة التدشين المبارك، متفائلون بمستقبل سياحي باهر.', 1),
('م. خالد الشهري', 'فرع عسير', 'من قمم عسير وأبها البهية نبارك لكم هذا الإنجاز السياحي الرائد لخدمة ضيوف المملكة وتقديم تجارب لا تُنسى.', 1),
('عبدالرحمن العتيبي', 'فرع القصيم', 'مبارك التدشين، خطوة عملاقة ونوعية لتنشيط التجارب السياحية الفاخرة وربط مكاتب المملكة بشبكة واحدة متكاملة.', 1),
('سارة الدوسري', 'فرع الدمام والشرقية', 'فخورون بهذا التدشين المتميز وشبكة فروعنا الممتدة، كل التوفيق والنجاح لـ SA للسياحة في رحلتها القادمة.', 1),
('ياسر الأحمدي', 'فرع المدينة المنورة والعلا', 'نبارك لجميع منسوبي وضيوف المنصة، جاهزون لتقديم أبهى استقبال في طيبة الطيبة والعلا الساحرة.', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;
