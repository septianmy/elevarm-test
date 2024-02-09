-- -------------------------------------------------------------
-- TablePlus 5.6.8(524)
--
-- https://tableplus.com/
--
-- Database: elevarm_test
-- Generation Time: 2024-02-09 09:15:41.5970
-- -------------------------------------------------------------






















DROP TABLE IF EXISTS "public"."admins";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."admins" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text,
    "username" text,
    "password" text,
    "email" text,
    "role" int8,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "deleted_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."food";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."food" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "merchant_id" uuid,
    "name" text,
    "price" numeric,
    "image_url" text,
    "status" bool,
    "food_type" int8,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "deleted_at" timestamp,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."food_order_details";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."food_order_details" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "food_order_id" uuid,
    "food_id" uuid,
    "price" numeric,
    "quantity" int8,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."food_orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."food_orders" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" uuid,
    "rider_id" uuid,
    "merchant_id" uuid,
    "destination_address" text,
    "distance" text,
    "fare" numeric,
    "status" int8,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "ride_order_id" uuid,
    "origin_address" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."master_fare";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."master_fare" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "fare_per_km" numeric,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."merchants";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."merchants" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "merchant_name" text,
    "address" text,
    "rating" float8 DEFAULT 0,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "deleted_at" timestamp,
    "user_id" uuid,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."ride_orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."ride_orders" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "customer_id" uuid,
    "origin_address" text,
    "destination_address" text,
    "distance" text,
    "fare" numeric,
    "rider_id" uuid,
    "order_type" int8,
    "status" int8,
    "food_order_id" uuid,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."riders";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."riders" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "plate_number" text,
    "vehicle" text,
    "rating" float8 DEFAULT 0,
    "riding_status" bool DEFAULT false,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "deleted_at" timestamp,
    "user_id" uuid,
    "driving_license_number" numeric,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text,
    "username" text,
    "password" text,
    "email" text,
    "address" text,
    "phone_number" text,
    "birth_date" timestamp,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now(),
    "deleted_at" timestamp,
    "user_type" int8,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."admins" ("id", "name", "username", "password", "email", "role", "created_at", "updated_at", "deleted_at") VALUES
('cd068f97-ef5a-4941-9a09-7dd601cd6558', 'Administrator 1', 'admin1', '$2b$10$UlHZrWUNwgaNFBuEES6lIe702Hjs7h0PdkTjtBJUkOlxdR3DshaUC', 'haiadmin@admin.id', 1, '2024-02-06 12:06:44.705189', '2024-02-06 12:06:44.705189', NULL);

INSERT INTO "public"."food" ("id", "merchant_id", "name", "price", "image_url", "status", "food_type", "created_at", "updated_at", "deleted_at") VALUES
('035ea7dd-32a8-4ed5-b54d-70baa7d4d9f9', 'e3183106-eaf3-48a4-bde0-996866c2f7b7', 'Es Pisang Ijo', 15000, 'https://image-service/image1.png', 't', 1, '2024-02-06 18:24:14.020796', '2024-02-06 18:24:14.020796', NULL),
('0cd8a399-96ff-44e1-8adb-13fda3b42519', '075b37a2-c814-4889-bfbd-dfc41d7e8365', 'Bolen Pisang Karamel', 25000, 'https://image-service/image1.png', 't', 1, '2024-02-08 14:21:15.786163', '2024-02-08 14:21:15.786163', NULL),
('fc20ba7b-4983-4c44-adba-a2f2deb139a4', 'e3183106-eaf3-48a4-bde0-996866c2f7b7', 'Karedok Leunca', 8000, 'https://image-service/image1.png', 't', 1, '2024-02-05 22:15:53.884501', '2024-02-05 22:15:53.884501', NULL);

INSERT INTO "public"."food_order_details" ("id", "food_order_id", "food_id", "price", "quantity", "created_at", "updated_at") VALUES
('27d5e829-b0e2-4471-82a6-1a283b90cbba', '70bc5174-3eec-479e-8628-88cb0ed275d2', 'fc20ba7b-4983-4c44-adba-a2f2deb139a4', 8000, 2, '2024-02-08 20:19:19.675376', '2024-02-08 20:19:19.675376'),
('28a2a081-1f9c-4656-bedd-fc59d99129fd', '70bc5174-3eec-479e-8628-88cb0ed275d2', '035ea7dd-32a8-4ed5-b54d-70baa7d4d9f9', 15000, 2, '2024-02-08 20:19:19.675376', '2024-02-08 20:19:19.675376');

INSERT INTO "public"."food_orders" ("id", "user_id", "rider_id", "merchant_id", "destination_address", "distance", "fare", "status", "created_at", "updated_at", "ride_order_id", "origin_address") VALUES
('70bc5174-3eec-479e-8628-88cb0ed275d2', 'c3a7653a-061c-4eb5-8132-791f93da7a22', NULL, 'e3183106-eaf3-48a4-bde0-996866c2f7b7', 'Grand hotel lembang', '20.0 km', 100085, 2, NULL, NULL, '5a7b7abf-893b-4c89-9396-b312a695ec55', 'Jalan Terusan Jakarta, Antapani, Bandung');

INSERT INTO "public"."master_fare" ("id", "fare_per_km") VALUES
('b1f8b98d-e584-453a-9101-0bb814b6f2a3', 5000);

INSERT INTO "public"."merchants" ("id", "merchant_name", "address", "rating", "created_at", "updated_at", "deleted_at", "user_id") VALUES
('075b37a2-c814-4889-bfbd-dfc41d7e8365', 'Kedai Mang Tian', 'Jl. Dipati Ukur No. 10 Bandung', 0, '2024-02-08 13:21:23.044108', '2024-02-08 13:21:23.044108', NULL, 'ba3cfa46-2107-4e6c-b59b-73e3e36200bb'),
('e3183106-eaf3-48a4-bde0-996866c2f7b7', 'Rumah Makan Sederhana', 'Jalan Terusan Jakarta, Antapani, Bandung', 4.3, '2024-02-05 20:29:20.646686', '2024-02-05 20:29:20.646686', NULL, '78ca94b1-d001-4c2a-9e71-6ac2db43afe5');

INSERT INTO "public"."ride_orders" ("id", "customer_id", "origin_address", "destination_address", "distance", "fare", "rider_id", "order_type", "status", "food_order_id", "created_at", "updated_at") VALUES
('2360c46b-4c6c-4fae-bc60-d29b3543ec3c', 'c3a7653a-061c-4eb5-8132-791f93da7a22', 'Jl. Antapani Lama No.23, Antapani Kulon, Kec. Antapani, Kota Bandung, Jawa Barat 40291, Indonesia', 'Jl. Sharon Boulevard Raya, Cipamokolan, Kec. Rancasari, Kota Bandung, Jawa Barat 40292, Indonesia', '9.2 km', 46090, '7b292efa-7ca3-49d4-a80b-b21b4b26b875', 1, 2, NULL, '2024-02-09 05:44:40.151966', '2024-02-09 05:44:40.151966'),
('46a3ff0b-fae9-464c-b83e-b24bc419c5d9', '38985189-c1f2-4fa0-abd7-3293f3b8f381', 'Jl. Antapani Lama No.23, Antapani Kulon, Kec. Antapani, Kota Bandung, Jawa Barat 40291, Indonesia', 'Jl. Sharon Boulevard Raya, Cipamokolan, Kec. Rancasari, Kota Bandung, Jawa Barat 40292, Indonesia', '9.2 km', 46090, '7b292efa-7ca3-49d4-a80b-b21b4b26b875', 1, 2, NULL, '2024-02-08 08:26:33.81885', '2024-02-08 08:26:33.81885'),
('5a7b7abf-893b-4c89-9396-b312a695ec55', 'c3a7653a-061c-4eb5-8132-791f93da7a22', 'Jalan Terusan Jakarta, Antapani, Bandung', 'Grand hotel lembang', '20.0 km', 100085, '7b292efa-7ca3-49d4-a80b-b21b4b26b875', 2, 2, '70bc5174-3eec-479e-8628-88cb0ed275d2', '2024-02-08 22:21:19.513423', '2024-02-08 22:21:19.513423');

INSERT INTO "public"."riders" ("id", "plate_number", "vehicle", "rating", "riding_status", "created_at", "updated_at", "deleted_at", "user_id", "driving_license_number") VALUES
('7b292efa-7ca3-49d4-a80b-b21b4b26b875', 'D 4556 UAV', 'GSX S150', 0, 'f', '2024-02-08 09:29:31.68578', '2024-02-08 09:29:31.68578', NULL, 'd64d2680-9bb4-45de-bda2-1edde2f5de51', 9119191919),
('f3fb0954-398d-49d9-b404-4a57a8862030', 'D 1111 JBR', 'Honda Vario 150 Hitam', 0, 'f', '2024-02-09 05:13:59.081889', '2024-02-09 05:13:59.081889', NULL, 'dad849b4-ace2-41d8-b99b-34f99d9fc06e', 1234567890);

INSERT INTO "public"."users" ("id", "name", "username", "password", "email", "address", "phone_number", "birth_date", "created_at", "updated_at", "deleted_at", "user_type") VALUES
('78ca94b1-d001-4c2a-9e71-6ac2db43afe5', 'Nur Solihah Handayani', 'nur_solihah', '$2b$10$L3ETTASf6w1o5h.mj8jWfOVSHAU9TgeBB6TjjdhETb7cfJrVNx6Hq', 'nursolihahmuchtar@gmail.com', 'Bandung, West Java', '081223464676', '1991-10-01 00:00:00', '2024-02-08 20:29:25.887187', '2024-02-08 20:29:25.887187', NULL, 3),
('ba3cfa46-2107-4e6c-b59b-73e3e36200bb', 'Septian Maulana Yusuf', 'septian_merchant2', '$2b$10$xVhP4/RtPO9YL9wSgAiHOeq3byvzId8gqZIjGjI..CA406zAOKMyO', 'kedaimangtian@gmail.com', 'Bandung, Lembang, West Java', '081223464676', '1991-09-15 00:00:00', '2024-02-08 13:21:23.044108', '2024-02-08 13:21:23.044108', NULL, 3),
('c3a7653a-061c-4eb5-8132-791f93da7a22', 'Septian Maulana Yusuf 23', 'my_septian', '$2b$10$4v4yGKjCKNzYhlUUEuNVXu7pu61MnnZTqFyTUUB5MAgDKF7FY0K6i', 'haiseptian@gmail.com', 'Bandung, West Java', '081770611151', '1991-09-15 00:00:00', '2024-02-08 16:32:40.235806', '2024-02-08 16:32:40.235806', NULL, 1),
('d64d2680-9bb4-45de-bda2-1edde2f5de51', 'Septian Maulana Yusuf', 'septian_my_rider', '$2b$10$6WzywuBX81MC2Ed1DrL7D.n7GuYC5LOu/TtuIS6A6CE67eF8Km87y', 'thedustoff3@gmail.com', 'Bandung, Lembang, West Java', '081223464676', '1991-09-15 00:00:00', '2024-02-08 09:29:31.68578', '2024-02-08 09:29:31.68578', NULL, 2),
('dad849b4-ace2-41d8-b99b-34f99d9fc06e', 'Septian Maulana Yusuf', 'septian_my', '$2b$10$cHW5GAQsE8w7azOiO56Iv./XEt1Kk2bn9YRz9M4y77iZPVwkGod4C', 'haiseptian@gmail.com', 'Bandung, West Java', '081770611151', '1991-09-15 00:00:00', '2024-02-09 05:13:59.081889', '2024-02-09 05:13:59.081889', NULL, 2);

;
;
;
;
;
;
;
;
;
;
ALTER TABLE "public"."food" ADD FOREIGN KEY ("merchant_id") REFERENCES "public"."merchants"("id");
