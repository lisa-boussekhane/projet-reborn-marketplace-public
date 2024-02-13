BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
----------------------------------------------
-- Déchargement des données de la table "user"
----------------------------------------------

INSERT INTO "user" ("id", "first_name", "last_name", "username", "email", "password", "date_of_birth", "phone", "address", "zip_code", "city", "state", "role", "duns" ) OVERRIDING SYSTEM VALUE VALUES
(1, 'Gabriela', 'Fernandez', 'GFernandez', 'gabriela.fernandez@gmail.com', 'reborn', '1986-12-21', '5555551234', '20 W 34th St.', ' 10001', 'New York', 'New York', 'Seller', '150483782'),
(2, 'Cynthia', 'Smith', 'cynthiasmith87', 'cynthia.smith@yahoo.com', 'reborn', '1987-12-05', '5555555678', '2760 Fifth Avenue', '92103', 'San Diego', 'California', 'Buyer', NULL),
(3, 'Mary', 'Doe', 'marydoe', 'mary.doe@outlook.com', 'reborn', '1976-02-10', '5556575678', '1112 Northside Dr NW', '30318', 'Atlanta', 'Georgia', 'Seller/Buyer', NULL);

----------------------------------------------
-- Déchargement des données de la table "media"
----------------------------------------------

-- INSERT INTO "media" ("id", "photo", "video", "product_id") VALUES
-- (1, '', '', 1),
-- (2, '', '', 2),
-- (3, '', '', 3);

----------------------------------------------
-- Déchargement des données de la table "media"
----------------------------------------------

INSERT INTO "shop" ("id", "name", "user_id")OVERRIDING SYSTEM VALUE VALUES
(1,'Enchanted Reborn Store', 1),
(2,'Reborn Wonderful', 3);

----------------------------------------------
-- Déchargement des données de la table "media"
----------------------------------------------

INSERT INTO "product" ("id", "security_code", "title", "kit_name", "sculptor", "size", "type", "weight", "age_range", "authenticity_card", "price", "shipping_fees", "detail_product_id", "user_id", "shop_id") OVERRIDING SYSTEM VALUE VALUES
(1, uuid_generate_v4(), 'Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl', 'Alina', 'Linde Scherer', '20', 'Vinyl', '6', 'Baby', 'Yes', '500', '50', 1, 3, 2),
(2, uuid_generate_v4(), 'Sebastian Realistic Reborn Baby Boy', 'Sebastian', 'Olga Auer', '20', 'Vinyl', '7', 'Baby', 'Yes', '650', '50', 2, 1, 1),
(3, uuid_generate_v4(), 'Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair', 'Lottie', 'Laura Lee Eagles', '24', 'Vinyl', '8', 'Toddler', 'Yes', '980', '60', 3, 1, 1);

--------------------------------------------------------
-- Déchargement des données de la table "detail_product"
--------------------------------------------------------

INSERT INTO "detail_product" ("id", "localization", "belly_plate", "gender", "year", "eyes", "hair", "status", "product_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Atlanta', 'No', 'Non gendered', '2023', 'Blue', 'Brown', 'Resell', 1),
(2, 'New York', 'Yes', 'Boy', '2024', 'Brown', 'Black', 'New', 2),
(3, 'New York', 'No', 'Girl', '2022', 'Blue', 'Brown', 'New', 3);

------------------------------------------------
-- Déchargement des données de la table "message"
------------------------------------------------

INSERT INTO "message" ("id", "content", "sender_id", "receiver_id", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1, "Hi I'm interested in your Sebastian doll, I live in San Diego, how much would be the delivery?", 2, 1),
(2, "Hi the delivery is $80. Ok for you?", 1, 2);

------------------------------------------------
-- Déchargement des données de la table "user_order_product"
------------------------------------------------

INSERT INTO "user_order_product" ("id", "product_id", "date", "invoice", "status") OVERRIDING SYSTEM VALUE VALUES
(1, 1, "2024-02-10", "12JDU87", "Send"),
(2, 2, "2024-01-27", "73NF9Z", "Delivered"),
(3, 3, "2024-02-13", "J3UID238", "Paid");

COMMIT;

BEGIN;

SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('product_id_seq', (SELECT MAX(id) from "product"));
SELECT setval('detail_product_seq', (SELECT MAX(id) from "detail_product"));
SELECT setval('sender_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('receiver_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('shop_id_seq', (SELECT MAX(id) from "shop"));

COMMIT;