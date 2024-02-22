BEGIN;

----------------------------------------------
-- Cleaning
----------------------------------------------

DELETE FROM "User_Order_Product";
DELETE FROM "message";
DELETE FROM "media";
DELETE FROM "detail_product";
DELETE FROM "product";
DELETE FROM "shop";
DELETE FROM "user";

----------------------------------------------
-- Déchargement des données de la table "user"
----------------------------------------------

INSERT INTO "user" ("id", "first_name", "last_name", "username", "email", "password", "date_of_birth", "phone", "address", "zip_code", "city", "state", "role", "pro", "duns" ) OVERRIDING SYSTEM VALUE VALUES
(1, 'Gabriela', 'Fernandez', 'GFernandez', 'gabriela.fernandez@gmail.com', 'reborn', '1986-12-21', '5555551234', '20 W 34th St.', ' 10001', 'New York', 'New York', 'Seller', 'Yes', '150483782'),
(2, 'Cynthia', 'Smith', 'cynthiasmith87', 'cynthia.smith@yahoo.com', 'reborn', '1987-12-05', '5555555678', '2760 Fifth Avenue', '92103', 'San Diego', 'California', 'Buyer', 'No', NULL),
(3, 'Mary', 'Doe', 'marydoe', 'mary.doe@outlook.com', 'reborn', '1976-02-10', '5556575678', '1112 Northside Dr NW', '30318', 'Atlanta', 'Georgia', 'Seller/Buyer', 'No', NULL);

SELECT setval('"user_id_seq"', (SELECT MAX(id) + 1 FROM "user"));

----------------------------------------------
-- Déchargement des données de la table "shop"
----------------------------------------------

INSERT INTO "shop" ("id", "name", "rating", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1,'Enchanted Reborn Store',NULL, 1),
(2,'Reborn Wonderful', NULL, 3);
SELECT setval('"shop_id_seq"', (SELECT MAX(id) + 1 FROM "shop"));
----------------------------------------------
-- Déchargement des données de la table "product"
----------------------------------------------

INSERT INTO "product" ("id", "unique_id", "title", "kit_name", "sculptor", "size", "type", "weight", "age_range", "authenticity_card", "price", "shipping_fees", "user_id", "shop_id") OVERRIDING SYSTEM VALUE VALUES
(1, '4f90d1', 'Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl', 'Alina', 'Linde Scherer', '20', 'Vinyl', 6, 'Baby', 'Yes', '500', '50', 3, 2),
(2, 'a9d8f8', 'Sebastian Realistic Reborn Baby Boy', 'Sebastian', 'Olga Auer', '20', 'Vinyl', 7, 'Baby', 'Yes', '650', '50', 1, 1),
(3, 'erlU3t', 'Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair', 'Lottie', 'Laura Lee Eagles', '24', 'Vinyl', 8, 'Toddler', 'Yes', '980', '60', 1, 1),
(4, 'iM3i2Y', 'Baby Full Silicone Girl Johnnie Closed Eyes', 'Johnnie', 'Ina Volprich', '20', 'Silicone', 7, 'Baby', 'Yes', '1200', '60', 3, 1),
(5, '8uKUsu', 'Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl', 'Alina', 'Linde Scherer', '20', 'Vinyl', 6, 'Baby', 'Yes', '500', '50', 3, 2),
(6, 'YmD1nn', 'Sebastian Realistic Reborn Baby Boy', 'Sebastian', 'Olga Auer', '20', 'Vinyl', 7, 'Baby', 'Yes', '650', '50', 1, 1),
(7, 'NLU6Ph', 'Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair', 'Lottie', 'Laura Lee Eagles', '24', 'Vinyl', 8, 'Toddler', 'Yes', '980', '60', 1, 1),
(8, 'OomHcy', 'Baby Full Silicone Girl Johnnie Closed Eyes', 'Johnnie', 'Ina Volprich', '20', 'Silicone', 7, 'Baby', 'Yes', '1200', '60', 3, 1),
(9, 'NPQsEr', 'Super Realistic, Lifelike Alina Soft Weighted Body Reborn Baby Doll Girl', 'Alina', 'Linde Scherer', '20', 'Vinyl', 6, 'Baby', 'Yes', '500', '50', 3, 2),
(10, 'IFdQZE', 'Sebastian Realistic Reborn Baby Boy', 'Sebastian', 'Olga Auer', '20', 'Vinyl', 7, 'Baby', 'Yes', '650', '50', 1, 1),
(11, 'wD4TaR', 'Baby Toddler Girl Lottie Has Realistic Skin Blue Eyes and Brown Hair', 'Lottie', 'Laura Lee Eagles', '24', 'Vinyl', 8, 'Toddler', 'Yes', '980', '60', 1, 1),
(12, 'zdH5Iv', 'Baby Full Silicone Girl Johnnie Closed Eyes', 'Johnnie', 'Ina Volprich', '20', 'Silicone', 7, 'Baby', 'Yes', '1200', '60', 3, 1);
SELECT setval('"product_id_seq"', (SELECT MAX(id) + 1 FROM "product"));
--------------------------------------------------------
-- Déchargement des données de la table "detail_product"
--------------------------------------------------------

INSERT INTO "detail_product" ("id", "localization", "belly_plate", "gender", "year", "eyes", "hair", "description", "status", "product_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Atlanta', 'No', 'None', '2023', 'Blue','Brown','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'Resell', 1),
(2, 'New York', 'Yes', 'Boy', '2024', 'Brown', 'Black','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.' , 'New', 2),
(3, 'New York', 'No', 'Girl', '2022', 'Blue', 'Brown', 'Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 3),
(4, 'New York', 'No', 'Girl', '2023', 'Closed','Brown','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 4),
(5, 'Atlanta', 'No', 'None', '2023', 'Blue','Brown','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'Resell', 5),
(6, 'New York', 'Yes', 'Boy', '2024', 'Brown', 'Black','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.' , 'New', 6),
(7, 'New York', 'No', 'Girl', '2022', 'Blue', 'Brown', 'Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 7),
(8, 'New York', 'No', 'Girl', '2023', 'Closed','Brown','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 8),
(9, 'Atlanta', 'No', 'None', '2023', 'Blue','Brown','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'Resell', 9),
(10, 'New York', 'Yes', 'Boy', '2024', 'Brown', 'Black','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.' , 'New', 10),
(11, 'New York', 'No', 'Girl', '2022', 'Blue', 'Brown', 'Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 11),
(12, 'New York', 'No', 'Girl', '2023', 'Closed','Brown','Fully filled with high-quality platinum liquid silicone, there is no better way to give a realistic effect to your reborn baby. Soft to the touch, you will feel like Lucie is a real newborn. Lucie is a hand-painted reborn baby girl, however, this does not prevent her from being put in water at normal temperature. Fully articulated thanks to the silicone filled completely in its limbs, from head to feet.', 'New', 12);
SELECT setval('"detail_product_id_seq"', (SELECT MAX(id) + 1 FROM "detail_product"));
----------------------------------------------
-- Déchargement des données de la table "media"
----------------------------------------------

INSERT INTO "media" ("id", "photo", "video", "product_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'public/uploads/alina.jpg', NULL, 1), 
(2, 'public/uploads/johnnie.jpg', NULL, 2),
(3, 'public/uploads/lottie.jpg', NULL, 3),
(4, 'public/uploads/sebastian.jpg', NULL, 4),
(5, 'public/uploads/alina.jpg', NULL, 5),
(6, 'public/uploads/johnnie.jpg', NULL, 6),
(7, 'public/uploads/lottie.jpg', NULL, 7),
(8, 'public/uploads/sebastian.jpg', NULL, 8),
(9, 'public/uploads/alina.jpg', NULL, 9),
(10, 'public/uploads/johnnie.jpg', NULL, 10),
(11, 'public/uploads/lottie.jpg', NULL, 11),
(12, 'public/uploads/sebastian.jpg', NULL, 12);
SELECT setval('"media_id_seq"', (SELECT MAX(id) + 1 FROM "media"));
-- SELECT setval('"media_id_seq"', (SELECT MAX(id) + 1 FROM "media"));

------------------------------------------------
-- Déchargement des données de la table "message"
------------------------------------------------

INSERT INTO "message" ("id", "content", "sender_id", "receiver_id") OVERRIDING SYSTEM VALUE VALUES
(1, 'Hi I''m interested in your Sebastian doll, I live in San Diego.', 2, 1),
(2, 'Hi the delivery is $80. Ok for you?', 1, 2),
(3, 'Yes perfect for me.', 2, 1),
(4, 'Thanks for ordering on my shop. The reborn will be sent to you tomorrow.', 1, 2);
------------------------------------------------
-- Déchargement des données de la table "user_order_product"
------------------------------------------------

INSERT INTO "User_Order_Product"("id", "product_id", "date", "invoice", "status", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1, 1, '2024-02-10', NULL, 'Send', 2),
(2, 2, '2024-01-27', NULL, 'Delivered', 2),
(3, 3, '2024-02-13', NULL, 'Paid', 2),
(4, 1, '2024-02-10', NULL, 'Send', 2),
(6, 2, '2024-01-27', NULL, 'Delivered', 2),
(7, 3, '2024-02-13', NULL, 'Paid', 2),
(8, 1, '2024-02-10', NULL, 'Send', 2),
(10, 2, '2024-01-27', NULL, 'Delivered', 2),
(11, 3, '2024-02-13', NULL, 'Paid', 2),
(12, 1, '2024-02-10', NULL, 'Send', 2);

------------------------------------------------
-- Déchargement des données de la table "user_rate_shop"
------------------------------------------------

INSERT INTO "User_Rate_Shop"("id", "rating", "shop_id", "user_id") OVERRIDING SYSTEM VALUE VALUES
(1, 4, 2, 2),
(2, 3, 1, 2),
(3, 5, 2, 2),
(4, 3, 1, 2),
(6, 4, 1, 2),
(7, 5, 1, 2),
(8, 2, 2, 2),
(10, 4, 1, 2),
(11, 3, 1, 2),
(12, 4, 1, 2);

ALTER TABLE media DROP CONSTRAINT fk_media_product;

ALTER TABLE media
    ADD CONSTRAINT fk_media_product FOREIGN KEY (product_id) REFERENCES "product"(id);

ALTER TABLE message DROP CONSTRAINT fk_user_receiver;
ALTER TABLE message DROP CONSTRAINT fk_user_sender;

ALTER TABLE message 
    ADD CONSTRAINT fk_user_sender FOREIGN KEY (sender_id) REFERENCES "user"(id);

ALTER TABLE message
    ADD CONSTRAINT fk_user_receiver FOREIGN KEY (receiver_id) REFERENCES "user"(id);
    
COMMIT;