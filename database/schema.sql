-- Hostinger / Production compatible schema (database already selected)
-- CREATE DATABASE IF NOT EXISTS saud_tourism CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE saud_tourism;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ADMIN','USER') NOT NULL DEFAULT 'ADMIN',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY users_email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hero_slides (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NULL,
  subtitle VARCHAR(400) NULL,
  image VARCHAR(400) NOT NULL,
  cta_text VARCHAR(80) NOT NULL DEFAULT 'اكتشف الآن',
  cta_link VARCHAR(200) NOT NULL DEFAULT '/packages',
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS destinations (
  id INT NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(120) NOT NULL,
  name_en VARCHAR(120) NULL,
  tagline VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(400) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  UNIQUE KEY destinations_slug_key (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS packages (
  id INT NOT NULL AUTO_INCREMENT,
  slug VARCHAR(160) NOT NULL,
  title VARCHAR(200) NOT NULL,
  title_en VARCHAR(200) NULL,
  summary VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  destination_id INT NOT NULL,
  category ENUM('LUXURY','VIP','UMRAH','DESERT') NOT NULL DEFAULT 'LUXURY',
  price_sar INT NOT NULL,
  days INT NOT NULL DEFAULT 5,
  nights INT NOT NULL DEFAULT 4,
  rating DOUBLE NOT NULL DEFAULT 5,
  max_guests INT NOT NULL DEFAULT 6,
  cover_image VARCHAR(400) NOT NULL,
  badges VARCHAR(300) NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY packages_slug_key (slug),
  KEY packages_destination_id_idx (destination_id),
  CONSTRAINT packages_destination_fk FOREIGN KEY (destination_id) REFERENCES destinations (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS package_images (
  id INT NOT NULL AUTO_INCREMENT,
  package_id INT NOT NULL,
  url VARCHAR(400) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY package_images_package_id_idx (package_id),
  CONSTRAINT package_images_fk FOREIGN KEY (package_id) REFERENCES packages (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS package_inclusions (
  id INT NOT NULL AUTO_INCREMENT,
  package_id INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY package_inclusions_package_id_idx (package_id),
  CONSTRAINT package_inclusions_fk FOREIGN KEY (package_id) REFERENCES packages (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS itinerary_days (
  id INT NOT NULL AUTO_INCREMENT,
  package_id INT NOT NULL,
  day_number INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (id),
  KEY itinerary_days_package_id_idx (package_id),
  CONSTRAINT itinerary_days_fk FOREIGN KEY (package_id) REFERENCES packages (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS vip_services (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(160) NOT NULL,
  description VARCHAR(300) NOT NULL,
  icon VARCHAR(40) NOT NULL DEFAULT 'concierge',
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reviews (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  location VARCHAR(120) NULL,
  rating INT NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  is_approved TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS bookings (
  id INT NOT NULL AUTO_INCREMENT,
  reference VARCHAR(20) NOT NULL,
  package_id INT NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  start_date DATE NOT NULL,
  guests INT NOT NULL DEFAULT 1,
  vip_addon TINYINT(1) NOT NULL DEFAULT 0,
  notes TEXT NULL,
  total_sar INT NOT NULL,
  status ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY bookings_reference_key (reference),
  KEY bookings_package_id_idx (package_id),
  CONSTRAINT bookings_package_fk FOREIGN KEY (package_id) REFERENCES packages (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30) NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscribers (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY subscribers_email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(80) NOT NULL PRIMARY KEY,
  setting_value TEXT NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO site_settings (setting_key, setting_value) VALUES
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
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
