-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Nov 09, 2026 at 05:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saud_tourism`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `reference` varchar(20) NOT NULL,
  `package_id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `start_date` date NOT NULL,
  `guests` int(11) NOT NULL DEFAULT 1,
  `vip_addon` tinyint(1) NOT NULL DEFAULT 0,
  `notes` text DEFAULT NULL,
  `total_sar` int(11) NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `reference`, `package_id`, `full_name`, `email`, `phone`, `start_date`, `guests`, `vip_addon`, `notes`, `total_sar`, `status`, `created_at`) VALUES
(1, 'ST-U75GXJ', 7, 'عبدالله السبيعي', 'a.subaie@example.com', '+966 50 123 4567', '2026-10-30', 4, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 24000, 'CONFIRMED', '2026-10-23 17:27:53.115'),
(2, 'ST-03M31V', 7, 'محمد القحطاني', 'm.qahtani@example.com', '+966 55 987 6543', '2026-10-15', 2, 0, NULL, 7000, 'COMPLETED', '2026-10-11 17:27:53.161'),
(3, 'ST-IFO1KG', 1, 'سارة آل سعود', 'sarah.al@example.com', '+966 53 456 7890', '2026-11-02', 2, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 34000, 'CONFIRMED', '2026-10-22 17:27:53.171'),
(4, 'ST-H5ZZJJ', 7, 'فهد التميمي', 'fahad.t@example.com', '+966 54 321 0987', '2026-11-06', 6, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 36000, 'PENDING', '2026-10-24 17:27:53.210'),
(5, 'ST-V486P2', 2, 'نورة المنصور', 'noura.m@example.com', '+966 56 654 3210', '2026-11-09', 4, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 98000, 'CONFIRMED', '2026-10-20 17:27:53.215'),
(6, 'ST-ZY4GBR', 3, 'خالد الراجحي', 'k.rajhi@example.com', '+966 50 789 0123', '2026-10-20', 3, 0, NULL, 26700, 'COMPLETED', '2026-10-17 17:27:53.227'),
(7, 'ST-5F5HV3', 7, 'د. يوسف الشمري', 'y.shammari@example.com', '+966 55 234 5678', '2026-11-01', 5, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 30000, 'CONFIRMED', '2026-10-21 17:27:53.234'),
(8, 'ST-ZHN06U', 4, 'ريم العتيبي', 'reem.o@example.com', '+966 53 876 5432', '2026-11-14', 4, 0, NULL, 30000, 'CONFIRMED', '2026-10-19 17:27:53.264'),
(9, 'ST-98WG4R', 1, 'سلطان الدوسري', 'sultan.d@example.com', '+966 54 112 2334', '2026-10-10', 2, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 34000, 'COMPLETED', '2026-10-05 17:27:53.293'),
(10, 'ST-Y358M6', 5, 'عبدالعزيز الحربي', 'abdulaziz.h@example.com', '+966 56 998 8776', '2026-11-04', 3, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 43200, 'CONFIRMED', '2026-10-18 17:27:53.306'),
(11, 'ST-82DZKS', 7, 'منى الجبير', 'mona.j@example.com', '+966 50 334 4556', '2026-11-12', 4, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 24000, 'PENDING', '2026-10-25 17:27:53.323'),
(12, 'ST-NZYTRF', 2, 'عمر الغامدي', 'omar.g@example.com', '+966 55 776 6554', '2026-09-30', 2, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 49000, 'COMPLETED', '2026-09-25 17:27:53.338'),
(13, 'ST-RYXOBZ', 3, 'هند الشريف', 'hind.s@example.com', '+966 53 556 6778', '2026-10-29', 2, 0, NULL, 17800, 'CANCELLED', '2026-10-16 17:27:53.351'),
(14, 'ST-B8VQ1Y', 7, 'تركي المطيري', 'turki.m@example.com', '+966 54 443 3221', '2026-11-08', 3, 0, NULL, 10500, 'CONFIRMED', '2026-10-14 17:27:53.365'),
(15, 'ST-8C7SRV', 1, 'لولوة الخالدي', 'lulwa.k@example.com', '+966 56 123 9876', '2026-11-19', 4, 1, 'طلب استقبال VIP خاص وتجهيزات كونسيرج مخصصة.', 68000, 'CONFIRMED', '2026-10-13 17:27:53.376'),
(16, 'ST-IRW65T', 4, 'بندر الشهري', 'bandar.sh@example.com', '+966 50 654 7890', '2026-09-20', 2, 0, NULL, 15000, 'COMPLETED', '2026-09-15 17:27:53.389');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `message`, `is_read`, `created_at`) VALUES
(1, 'سعد العليان', 'saad@example.com', '+966 50 999 8888', 'نود الاستفسار عن حجز خاص لوفد رجال أعمال في حافة العالم وجبل طويق نهاية الشهر.', 0, '2026-10-25 17:27:53.405'),
(2, 'ديمة الفايز', 'deema@example.com', '+966 55 444 3333', 'هل يمكن تخصيص تجربة طيران خاص مع باقة منتجعات البحر الأحمر؟', 0, '2026-10-25 17:27:53.405'),
(3, 'أحمد الصالح', 'ahmed@example.com', '+966 53 111 2222', 'تجربتنا في العلا كانت خيالية، شكراً لفريق الكونسيرج الراقي!', 1, '2026-10-25 17:27:53.405');

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `name` varchar(120) NOT NULL,
  `name_en` varchar(120) DEFAULT NULL,
  `tagline` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(400) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `slug`, `name`, `name_en`, `tagline`, `description`, `image`, `sort_order`, `is_active`) VALUES
(1, 'alula', 'العلا', 'AlUla', 'عجائب قديمة وفخامة الصحراء', 'واحة تاريخية تحتضن مدائن صالح وجبال الصخور الذهبية ومنتجعات صحراوية عالمية.', '/images/alula.jpg', 2, 1),
(2, 'red-sea', 'البحر الأحمر', 'The Red Sea', 'أرخبيل بكر وبنغلات فوق الماء', 'أكثر من 90 جزيرة بكر وشعاب مرجانية ومنتجعات فوق الماء.', '/images/red-sea.jpg', 3, 1),
(3, 'diriyah', 'الدرعية', 'Diriyah', 'مهد الثقافة والتاريخ', 'مهد الدولة السعودية الأولى، حي الطريف التاريخي المدرج في قائمة اليونسكو.', '/images/diriyah.jpg', 4, 1),
(4, 'asir', 'عسير', 'Asir', 'قمم السحاب وجبال الضباب', 'مرتفعات خضراء وضباب ساحر وقرى تراثية ومنتجعات جبلية.', '/images/asir.jpg', 5, 1),
(5, 'makkah', 'مكة والمدينة', 'Makkah & Madinah', 'رحلة إيمانية فاخرة', 'عمرة ملكية بخدمات كبار الشخصيات وإقامة قرب الحرمين.', '/images/diriyah.jpg', 6, 1),
(6, 'tuwaiq', 'حافة العالم', 'Edge of the World', 'شموخ جبال طويق وسحر المغامرة', 'الواجهة الاستكشافية الأولى لرحلاتنا وأعظم المنحدرات الصخرية في قلب نجد، إطلالة شاهقة فوق السحاب وأنشطة هايكنج وسفاري صحراوي فاخر وتخييم ملكي.', '/images/tuwaiq-safari.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `title_en` varchar(200) DEFAULT NULL,
  `subtitle` varchar(400) DEFAULT NULL,
  `image` varchar(400) NOT NULL,
  `cta_text` varchar(80) NOT NULL DEFAULT 'اكتشف الآن',
  `cta_link` varchar(200) NOT NULL DEFAULT '/packages',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `title`, `title_en`, `subtitle`, `image`, `cta_text`, `cta_link`, `sort_order`, `is_active`) VALUES
(1, 'اكتشف سحر المملكة بفخامة', 'Experience Saudi in Ultimate Luxury', 'إقامات استثنائية بين صخور العلا الذهبية ومنتجعات البحر الأحمر الساحرة', '/images/hero-1.jpg', 'استكشف الآن', '/packages', 2, 1),
(2, 'العلا.. حيث يلتقي التاريخ بالفخامة', 'Ancient Wonders & Desert Luxury', 'فلل خاصة وسط الصخور الأثرية وليالٍ تحت سماء مرصعة بالنجوم', '/images/hero-2.jpg', 'باقات العلا', '/packages?destination=alula', 3, 1),
(3, 'البحر الأحمر.. أرخبيل بكر لا يُنسى', 'Pristine Archipelago', 'بنغلات فوق الماء ويخوت خاصة وجزر لم تطأها قدم', '/images/hero-3.jpg', 'باقات البحر الأحمر', '/packages?destination=red-sea', 4, 1),
(4, 'الدرعية.. مهد الثقافة والأصالة', 'The Cradle of Culture', 'قصور تاريخية ومطاعم فاخرة في قلب التراث السعودي', '/images/hero-4.jpg', 'باقات الدرعية', '/packages?destination=diriyah', 5, 1),
(5, 'حافة العالم.. شموخ طويق وأنشطة المغامرة', 'Edge of the World - Tuwaiq Expeditions', 'الواجهة الاستكشافية الأولى لرحلاتنا.. هايكنج فوق أعظم المنحدرات وسفاري الدفع الرباعي وتجارب حصرية لا تُنسى', '/images/tuwaiq-edge.jpg', 'استكشف الرحلات', '/packages?destination=tuwaiq', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `itinerary_days`
--

CREATE TABLE `itinerary_days` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `day_number` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `itinerary_days`
--

INSERT INTO `itinerary_days` (`id`, `package_id`, `day_number`, `title`, `description`) VALUES
(1, 1, 1, 'جولة العلا', 'استقبال خاص في المطار ونقل بسيارة رينج روفر إلى الفيلا، ثم جولة في البلدة القديمة.'),
(2, 1, 2, 'طيران خاص', 'رحلة جوية خاصة فوق التكوينات الصخرية الشهيرة وغداء في الصحراء.'),
(3, 1, 3, 'روافد العلا', 'زيارة مدائن صالح مع مرشد تاريخي خاص وتجارب ثقافية حصرية.'),
(4, 1, 4, 'فيلا 5 نجوم', 'يوم استجمام كامل في جناح السبا وعشاء تحت النجوم.'),
(5, 1, 5, 'العلا', 'رحلة منطاد عند الشروق ثم وداع وتوصيل إلى المطار.'),
(6, 2, 1, 'الوصول بالطائرة المائية', 'برنامج اليوم 1: الوصول بالطائرة المائية. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(7, 2, 2, 'يوم الغوص والشعاب', 'برنامج اليوم 2: يوم الغوص والشعاب. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(8, 2, 3, 'رحلة اليخت الخاص', 'برنامج اليوم 3: رحلة اليخت الخاص. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(9, 2, 4, 'عشاء على شاطئ جزيرة', 'برنامج اليوم 4: عشاء على شاطئ جزيرة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(10, 2, 5, 'سبا فوق الماء', 'برنامج اليوم 5: سبا فوق الماء. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(11, 2, 6, 'المغادرة', 'برنامج اليوم 6: المغادرة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(12, 3, 1, 'الوصول وجولة الرياض', 'برنامج اليوم 1: الوصول وجولة الرياض. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(13, 3, 2, 'حي الطريف التاريخي', 'برنامج اليوم 2: حي الطريف التاريخي. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(14, 3, 3, 'تجربة الطهي السعودي الفاخر', 'برنامج اليوم 3: تجربة الطهي السعودي الفاخر. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(15, 3, 4, 'التسوق والمغادرة', 'برنامج اليوم 4: التسوق والمغادرة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(16, 4, 1, 'الوصول إلى أبها', 'برنامج اليوم 1: الوصول إلى أبها. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(17, 4, 2, 'قرية رجال ألمع', 'برنامج اليوم 2: قرية رجال ألمع. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(18, 4, 3, 'جولة التلفريك والسحاب', 'برنامج اليوم 3: جولة التلفريك والسحاب. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(19, 4, 4, 'المغادرة', 'برنامج اليوم 4: المغادرة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(20, 5, 1, 'الوصول والانتقال إلى مكة', 'برنامج اليوم 1: الوصول والانتقال إلى مكة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(21, 5, 2, 'أداء العمرة بمرافقة خاصة', 'برنامج اليوم 2: أداء العمرة بمرافقة خاصة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(22, 5, 3, 'زيارة المعالم', 'برنامج اليوم 3: زيارة المعالم. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(23, 5, 4, 'المدينة المنورة', 'برنامج اليوم 4: المدينة المنورة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(24, 5, 5, 'المغادرة', 'برنامج اليوم 5: المغادرة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(25, 6, 1, 'الوصول إلى المخيم', 'برنامج اليوم 1: الوصول إلى المخيم. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(26, 6, 2, 'سفاري وليلة النجوم', 'برنامج اليوم 2: سفاري وليلة النجوم. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(27, 6, 3, 'الشروق والمغادرة', 'برنامج اليوم 3: الشروق والمغادرة. يضبط فريق الكونسيرج التفاصيل والتوقيت وفق رغباتك.'),
(28, 7, 1, 'الانطلاق وسفاري الدفع الرباعي', 'التجمع والانطلاق بسيارات الدفع الرباعي الفاخرة عبر المسار الصحراوي الممتع وصولاً لقاعدة جبال طويق الشامخة.'),
(29, 7, 1, 'مسار الهايكنج واستكشاف حافة العالم', 'خوض مسار هايكنج آمن بصحبة المرشدين المعتمدين للوصول إلى قمة مطل حافة العالم، والاستمتاع بإطلالة خيالية فوق السحاب.'),
(30, 7, 1, 'غروب الشمس والتخييم الملكي والعشاء', 'جلسة استرخاء وتناول القهوة السعودية عند الغروب الذهبي، تليها ليلة تخييم وعشاء شواء نجدي فاخر تحت أضواء النجوم.');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `slug` varchar(160) NOT NULL,
  `title` varchar(200) NOT NULL,
  `title_en` varchar(200) DEFAULT NULL,
  `summary` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `destination_id` int(11) NOT NULL,
  `category` enum('LUXURY','VIP','UMRAH','DESERT') NOT NULL DEFAULT 'LUXURY',
  `price_sar` int(11) NOT NULL,
  `days` int(11) NOT NULL DEFAULT 5,
  `nights` int(11) NOT NULL DEFAULT 4,
  `rating` double NOT NULL DEFAULT 5,
  `max_guests` int(11) NOT NULL DEFAULT 6,
  `cover_image` varchar(400) NOT NULL,
  `badges` varchar(300) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `slug`, `title`, `title_en`, `summary`, `description`, `destination_id`, `category`, `price_sar`, `days`, `nights`, `rating`, `max_guests`, `cover_image`, `badges`, `is_featured`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'alula-stars-heritage', 'رحلة نجوم العلا التراثية الفاخرة', 'AlUla Stars Heritage Journey', 'إقامة فاخرة وسحر مدائن صالح مع عشاء تحت النجوم ورحلة منطاد.', 'إقامة فاخرة وسحر مدائن صالح مع عشاء تحت النجوم ورحلة منطاد. نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.', 1, 'LUXURY', 14500, 5, 4, 5, 6, '/images/pkg-1.jpg', 'فيلا 5 نجوم,طيران خاص مشمول', 1, 1, '2026-10-25 10:31:11.508', '2026-10-25 10:31:11.508'),
(2, 'red-sea-water-villas', 'ملاذ البحر الأحمر: فلل مائية ويخوت', 'Red Sea Water Villas & Yachts', 'بنغلات فوق الماء وتنقل بين الجزر على متن يخت خاص مع طاقم كامل.', 'بنغلات فوق الماء وتنقل بين الجزر على متن يخت خاص مع طاقم كامل. نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.', 2, 'VIP', 22000, 6, 5, 5, 6, '/images/pkg-2.jpg', 'فيلا فوق الماء,يخت خاص', 1, 1, '2026-10-25 10:31:11.566', '2026-10-25 10:31:11.566'),
(3, 'diriyah-kings-route', 'الدرعية والرياض: مسار الملوك', 'Diriyah & Riyadh: The Kings\' Route', 'جولة في حي الطريف التاريخي وتجارب طعام راقية وسط الرياض.', 'جولة في حي الطريف التاريخي وتجارب طعام راقية وسط الرياض. نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.', 3, 'LUXURY', 8900, 4, 3, 4.8, 6, '/images/pkg-3.jpg', 'قصر تاريخي,عشاء فاخر', 1, 1, '2026-10-25 10:31:11.610', '2026-10-25 10:31:11.610'),
(4, 'asir-clouds-peaks', 'عسير وأبها: قمم السحاب', 'Asir & Abha: Peaks of Clouds', 'ضباب الجبال والقرى التراثية وإقامة في منتجع على القمة.', 'ضباب الجبال والقرى التراثية وإقامة في منتجع على القمة. نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.', 4, 'LUXURY', 7500, 4, 3, 4.7, 6, '/images/pkg-4.jpg', 'منتجع جبلي,تلفريك خاص', 0, 1, '2026-10-25 10:31:11.628', '2026-10-25 10:31:11.628'),
(5, 'royal-umrah-vip', 'عمرة ملكية VIP', 'Royal VIP Umrah', 'عمرة بخدمات كبار الشخصيات مع إقامة فاخرة ومرشد ديني خاص.', 'عمرة بخدمات كبار الشخصيات مع إقامة فاخرة ومرشد ديني خاص. نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.', 5, 'UMRAH', 11900, 5, 4, 5, 6, '/images/pkg-5.jpg', 'إقامة قرب الحرم,مرافق خاص', 0, 1, '2026-10-25 10:31:11.639', '2026-10-25 10:31:11.639'),
(6, 'alula-desert-camp', 'مخيم العلا الصحراوي الفاخر', 'AlUla Luxury Desert Camp', 'خيام ملكية في قلب الصحراء مع عشاء بدوي وسفاري خاص.', 'خيام ملكية في قلب الصحراء مع عشاء بدوي وسفاري خاص. نصمم كل تفصيل في رحلتك بعناية فائقة، من لحظة الاستقبال حتى الوداع، لتعيش تجربة سعودية لا تُنسى بأعلى معايير الفخامة والخصوصية.', 1, 'DESERT', 9800, 3, 2, 4.9, 6, '/images/pkg-6.jpg', 'تخييم فاخر,سماء النجوم', 0, 1, '2026-10-25 10:31:11.647', '2026-10-25 10:31:11.647'),
(7, 'tuwaiq-edge-adventure', 'مغامرة حافة العالم وسفاري جبل طويق VIP', 'Edge of the World VIP Safari & Adventure', 'الواجهة الأبرز لرحلاتنا الحالية: سفاري بسيارات الدفع الرباعي الفاخرة، هايكنج احترافي لمطل حافة العالم، وتخييم ملكي مع عشاء نجدي فاخر.', 'عِش روح المغامرة في واجهة رحلاتنا الأبرز: حافة العالم (مطل نهاية العالم) في جبال طويق الشامخة. تشمل الرحلة الانتقال بسيارات دفع رباعي فاخرة ومجهزة، قيادة عبر المسارات الوعرة، مسار هايكنج آمن ومصمم للنخبة مع مرشدين معتمدين، وجلسة شاي وقهوة سعودية أصيلة عند حافة الجرف، تليها تجربة عشاء فاخرة تحت النجوم.', 6, 'DESERT', 3500, 1, 0, 5, 8, '/images/tuwaiq-edge.jpg', 'الوجهة الأولى,سفاري دفع رباعي,هايكنج VIP,عشاء تحت النجوم', 1, 1, '2026-10-25 14:11:42.667', '2026-10-25 14:11:42.667');

-- --------------------------------------------------------

--
-- Table structure for table `package_images`
--

CREATE TABLE `package_images` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `url` varchar(400) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_images`
--

INSERT INTO `package_images` (`id`, `package_id`, `url`, `sort_order`) VALUES
(1, 1, '/images/gallery-1.jpg', 0),
(2, 1, '/images/gallery-2.jpg', 1),
(3, 1, '/images/gallery-3.jpg', 2),
(4, 1, '/images/gallery-4.jpg', 3),
(5, 2, '/images/gallery-1.jpg', 0),
(6, 2, '/images/gallery-2.jpg', 1),
(7, 2, '/images/gallery-3.jpg', 2),
(8, 2, '/images/gallery-4.jpg', 3),
(9, 3, '/images/gallery-1.jpg', 0),
(10, 3, '/images/gallery-2.jpg', 1),
(11, 3, '/images/gallery-3.jpg', 2),
(12, 3, '/images/gallery-4.jpg', 3),
(13, 4, '/images/gallery-1.jpg', 0),
(14, 4, '/images/gallery-2.jpg', 1),
(15, 4, '/images/gallery-3.jpg', 2),
(16, 4, '/images/gallery-4.jpg', 3),
(17, 5, '/images/gallery-1.jpg', 0),
(18, 5, '/images/gallery-2.jpg', 1),
(19, 5, '/images/gallery-3.jpg', 2),
(20, 5, '/images/gallery-4.jpg', 3),
(21, 6, '/images/gallery-1.jpg', 0),
(22, 6, '/images/gallery-2.jpg', 1),
(23, 6, '/images/gallery-3.jpg', 2),
(24, 6, '/images/gallery-4.jpg', 3),
(25, 7, '/images/tuwaiq-edge.jpg', 1),
(26, 7, '/images/tuwaiq-safari.jpg', 2),
(27, 7, '/images/gallery-1.jpg', 3),
(28, 7, '/images/gallery-3.jpg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `package_inclusions`
--

CREATE TABLE `package_inclusions` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `package_inclusions`
--

INSERT INTO `package_inclusions` (`id`, `package_id`, `text`, `sort_order`) VALUES
(1, 1, 'طيران خاص أو درجة أولى', 0),
(2, 1, 'إقامة في فيلا 5 نجوم', 1),
(3, 1, 'سيارة رينج روفر خاصة بسائق', 2),
(4, 1, 'جناح سبا خاص', 3),
(5, 1, 'عشاء تحت النجوم', 4),
(6, 1, 'مرشد تاريخي خاص', 5),
(7, 1, 'كونسيرج VIP على مدار الساعة', 6),
(8, 2, 'طيران خاص أو درجة أولى', 0),
(9, 2, 'إقامة في فيلا 5 نجوم', 1),
(10, 2, 'سيارة رينج روفر خاصة بسائق', 2),
(11, 2, 'جناح سبا خاص', 3),
(12, 2, 'عشاء تحت النجوم', 4),
(13, 2, 'مرشد تاريخي خاص', 5),
(14, 2, 'كونسيرج VIP على مدار الساعة', 6),
(15, 3, 'طيران خاص أو درجة أولى', 0),
(16, 3, 'إقامة في فيلا 5 نجوم', 1),
(17, 3, 'سيارة رينج روفر خاصة بسائق', 2),
(18, 3, 'جناح سبا خاص', 3),
(19, 3, 'عشاء تحت النجوم', 4),
(20, 3, 'مرشد تاريخي خاص', 5),
(21, 3, 'كونسيرج VIP على مدار الساعة', 6),
(22, 4, 'طيران خاص أو درجة أولى', 0),
(23, 4, 'إقامة في فيلا 5 نجوم', 1),
(24, 4, 'سيارة رينج روفر خاصة بسائق', 2),
(25, 4, 'جناح سبا خاص', 3),
(26, 4, 'عشاء تحت النجوم', 4),
(27, 4, 'مرشد تاريخي خاص', 5),
(28, 4, 'كونسيرج VIP على مدار الساعة', 6),
(29, 5, 'طيران خاص أو درجة أولى', 0),
(30, 5, 'إقامة في فيلا 5 نجوم', 1),
(31, 5, 'سيارة رينج روفر خاصة بسائق', 2),
(32, 5, 'جناح سبا خاص', 3),
(33, 5, 'عشاء تحت النجوم', 4),
(34, 5, 'مرشد تاريخي خاص', 5),
(35, 5, 'كونسيرج VIP على مدار الساعة', 6),
(36, 6, 'طيران خاص أو درجة أولى', 0),
(37, 6, 'إقامة في فيلا 5 نجوم', 1),
(38, 6, 'سيارة رينج روفر خاصة بسائق', 2),
(39, 6, 'جناح سبا خاص', 3),
(40, 6, 'عشاء تحت النجوم', 4),
(41, 6, 'مرشد تاريخي خاص', 5),
(42, 6, 'كونسيرج VIP على مدار الساعة', 6),
(43, 7, 'سيارات دفع رباعي فاخرة ومجهزة مع سائقين محترفين', 1),
(44, 7, 'مرشد هايكنج ومغامرات جبلي معتمد ومرافق طوال الرحلة', 2),
(45, 7, 'جلسة استقبال وضيافة سعودية فاخرة (قهوة وتمر وشاي)', 3),
(46, 7, 'تخييم ملكي VIP مجهز عند الغروب', 4),
(47, 7, 'عشاء مشاوي نجدي فاخر محضر طازجاً تحت النجوم', 5),
(48, 7, 'تجهيزات الأمان والسلامة وحقائب الإسعاف المتقدمة', 6),
(49, 7, 'توثيق فوتوغرافي وجوي (درون) احترافي للرحلة', 7);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `location` varchar(120) DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `comment` text NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `name`, `location`, `rating`, `comment`, `is_approved`, `created_at`) VALUES
(1, 'عبدالله القحطاني', 'الرياض', 5, 'تجربة تفوق الخيال. الفيلا في العلا والعشاء تحت النجوم كانا من أجمل لحظات حياتي، وخدمة الكونسيرج كانت بلا أي تقصير.', 1, '2026-10-25 10:31:11.659'),
(2, 'Sarah Whitfield', 'London', 5, 'Impeccable service from the first call to the last farewell. The yacht days in the Red Sea were pure magic.', 1, '2026-10-25 10:31:11.659'),
(3, 'نورة العتيبي', 'جدة', 5, 'تنظيم راقٍ واهتمام بأدق التفاصيل. أنصح بها لكل من يبحث عن رحلة عائلية فاخرة وخاصة.', 1, '2026-10-25 10:31:11.659'),
(4, 'خالد الشمري', 'الدمام', 4, 'عمرة ملكية بكل معنى الكلمة؛ راحة وطمأنينة وخدمة محترفة من أول لحظة.', 1, '2026-10-25 10:31:11.659');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(190) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscribers`
--

INSERT INTO `subscribers` (`id`, `email`, `created_at`) VALUES
(1, 'vip.guest1@domain.com', '2026-10-25 17:27:53.423'),
(2, 'luxury.traveller@domain.com', '2026-10-25 17:27:53.423'),
(3, 'saudi.expeditions@domain.com', '2026-10-25 17:27:53.423'),
(4, 'tuwaiq.explorer@domain.com', '2026-10-25 17:27:53.423'),
(5, 'concierge.client@domain.com', '2026-10-25 17:27:53.423');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'ADMIN',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'مدير النظام', 'admin@saudtourism.sa', '$2a$10$MtvOrzzoRvWSbU5onJtfTOKrfCLzyoGBZPQDKfMNVEwZI/VDaag7y', 'ADMIN', '2026-10-25 10:31:11.359');

-- --------------------------------------------------------

--
-- Table structure for table `vip_services`
--

CREATE TABLE `vip_services` (
  `id` int(11) NOT NULL,
  `title` varchar(160) NOT NULL,
  `description` varchar(300) NOT NULL,
  `icon` varchar(40) NOT NULL DEFAULT 'concierge',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vip_services`
--

INSERT INTO `vip_services` (`id`, `title`, `description`, `icon`, `sort_order`, `is_active`) VALUES
(1, 'طيران خاص', 'طائرات خاصة بتجهيزات فاخرة وصالات VIP.', 'plane', 1, 1),
(2, 'يخوت فاخرة', 'رحلات بحرية خاصة بين جزر البحر الأحمر.', 'ship', 2, 1),
(3, 'كونسيرج VIP على مدار الساعة', 'فريق مخصص لك طوال الرحلة 24/7.', 'concierge', 3, 1),
(4, 'مرشدون تاريخيون خاصون', 'خبراء يروون حكايات المكان بطريقة حصرية.', 'guide', 4, 1),
(5, 'سيارات فاخرة بسائق', 'رينج روفر ومرسيدس بسائقين محترفين.', 'car', 5, 1),
(6, 'أجنحة سبا وعافية', 'جلسات علاجية وأجنحة استجمام خاصة.', 'spa', 6, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bookings_reference_key` (`reference`),
  ADD KEY `bookings_package_id_idx` (`package_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `destinations_slug_key` (`slug`);

--
-- Indexes for table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itinerary_days`
--
ALTER TABLE `itinerary_days`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itinerary_days_package_id_idx` (`package_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `packages_slug_key` (`slug`),
  ADD KEY `packages_destination_id_idx` (`destination_id`);

--
-- Indexes for table `package_images`
--
ALTER TABLE `package_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_images_package_id_idx` (`package_id`);

--
-- Indexes for table `package_inclusions`
--
ALTER TABLE `package_inclusions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_inclusions_package_id_idx` (`package_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscribers_email_key` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `vip_services`
--
ALTER TABLE `vip_services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `itinerary_days`
--
ALTER TABLE `itinerary_days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `package_images`
--
ALTER TABLE `package_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `package_inclusions`
--
ALTER TABLE `package_inclusions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vip_services`
--
ALTER TABLE `vip_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `itinerary_days`
--
ALTER TABLE `itinerary_days`
  ADD CONSTRAINT `itinerary_days_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_destination_id_fkey` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `package_images`
--
ALTER TABLE `package_images`
  ADD CONSTRAINT `package_images_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `package_inclusions`
--
ALTER TABLE `package_inclusions`
  ADD CONSTRAINT `package_inclusions_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- --------------------------------------------------------

--
-- Table structure and seed for `site_settings`
--

CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` varchar(80) NOT NULL PRIMARY KEY,
  `setting_value` text DEFAULT NULL,
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
  ('instagram_url', 'https://instagram.com'),
  ('twitter_url', 'https://x.com'),
  ('youtube_url', 'https://youtube.com'),
  ('tiktok_url', 'https://tiktok.com'),
  ('snapchat_url', 'https://snapchat.com'),
  ('linkedin_url', 'https://linkedin.com'),
  ('whatsapp_number', '966500000000'),
  ('whatsapp_message', 'مرحباً، أود الاستفسار عن باقات وتجارب SA للسياحة الفاخرة'),
  ('phone', '+966 11 000 0000'),
  ('email', 'info@saudtourism.sa'),
  ('address', 'الرياض، المملكة العربية السعودية'),
  ('working_hours', 'كونسيرج VIP متاح 24/7'),
  ('footer_description', 'نصنع رحلات سعودية فاخرة تجمع بين عراقة التاريخ وروعة الطبيعة وأرقى مستويات الضيافة.'),
  ('copyright_text', '© 2026 سعود للسياحة. جميع الحقوق محفوظة.')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
