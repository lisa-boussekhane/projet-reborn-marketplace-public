BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

----------------------------------------------
-- Cleaning
----------------------------------------------

DELETE FROM "User_Order_Product";
DELETE FROM "message";
DELETE FROM "detail_product";
DELETE FROM "product";
DELETE FROM "shop";
--DELETE FROM "media";
DELETE FROM "user";

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

INSERT INTO "shop" ("id", "name", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1,'Enchanted Reborn Store', 1),
(2,'Reborn Wonderful', 3);

----------------------------------------------
-- Déchargement des données de la table "media"
----------------------------------------------

INSERT INTO "product" ("id", "security_code", "title", "kit_name", "sculptor", "size", "type", "weight", "age_range", "authenticity_card", "price", "shipping_fees", "user_id", "shop_id") OVERRIDING SYSTEM VALUE VALUES
(1, 4f90d1, 'Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl', 'Alina', 'Linde Scherer', '20', 'Vinyl', '6', 'Baby', 'Yes', '500', '50', 3, 2),
(2, a9d8f8, 'Sebastian Realistic Reborn Baby Boy', 'Sebastian', 'Olga Auer', '20', 'Vinyl', '7', 'Baby', 'Yes', '650', '50', 1, 1),
(3, erlU3t, 'Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair', 'Lottie', 'Laura Lee Eagles', '24', 'Vinyl', '8', 'Toddler', 'Yes', '980', '60', 1, 1);
(4, iM3i2Y, 'Baby Full Silicone Girl Johnnie Closed Eyes', 'Johnnie', 'Ina Volprich', '19.5', 'Silicone', '7', 'Baby', 'Yes', '1200', '60', 3, 1);

ON CONFLICT (unique_id) DO UPDATE;

--------------------------------------------------------
-- Déchargement des données de la table "detail_product"
--------------------------------------------------------

INSERT INTO "detail_product" ("id", "localization", "belly_plate", "gender", "year", "eyes", "hair", "description", "status", "product_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Atlanta', 'No', 'Non gendered', '2023', 'Blue','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.' , 'Brown', 'Resell', 1),
(2, 'New York', 'Yes', 'Boy', '2024', 'Brown', 'Black','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.' , 'New', 2),
(3, 'New York', 'No', 'Girl', '2022', 'Blue', 'Brown', 'Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 3);
(4, 'New York', 'No', 'Girl', '2023', 'Closed Eyes', 'Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'Brown', 'New', 3);

------------------------------------------------
-- Déchargement des données de la table "message"
------------------------------------------------

INSERT INTO "message" ("id", "content", "sender_id", "receiver_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Hi I''m interested in your Sebastian doll, I live in San Diego.', 2, 1),
(2, 'Hi the delivery is $80. Ok for you?', 1, 2);


------------------------------------------------
-- Déchargement des données de la table "user_order_product"
------------------------------------------------

INSERT INTO "User_Order_Product"("id", "product_id", "date", "invoice", "status", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1, 1, '2024-02-10', NULL, 'Send', 2),
(2, 2, '2024-01-27', NULL, 'Delivered', 2),
(3, 3, '2024-02-13', NULL, 'Paid', 2);


--ALTER TABLE media
--    ADD CONSTRAINT fk_media_product FOREIGN KEY (product_id) REFERENCES product(id);

ALTER TABLE message DROP CONSTRAINT fk_user_receiver;
ALTER TABLE message DROP CONSTRAINT fk_user_sender;

ALTER TABLE message 
    ADD CONSTRAINT fk_user_sender FOREIGN KEY (sender_id) REFERENCES "user"(id);

ALTER TABLE message
    ADD CONSTRAINT fk_user_receiver FOREIGN KEY (receiver_id) REFERENCES "user"(id);
    
COMMIT;

-- BEGIN;

-- SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
-- SELECT setval('product_id_seq', (SELECT MAX(id) from "product"));
-- SELECT setval('detail_product_seq', (SELECT MAX(id) from "detail_product"));
-- SELECT setval('sender_id_seq', (SELECT MAX(id) from "user"));
-- SELECT setval('receiver_id_seq', (SELECT MAX(id) from "user"));
-- SELECT setval('shop_id_seq', (SELECT MAX(id) from "shop"));

-- COMMIT;