--------------------------------
-- STRUCTURE de la base de la BDD
--------------------------------
BEGIN;

DROP TABLE IF EXISTS "user", "media", "detail_product", "product", "message", "shop", "user_order_product" CASCADE;

CREATE TABLE "user" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" VARCHAR(128) NOT NULL,
  "last_name" VARCHAR(128) NOT NULL,
  "username" VARCHAR(128) NOT NULL,
  "email" VARCHAR(128) NOT NULL,
  "password" VARCHAR(128) NOT NULL,
  "date_of_birth" TIMESTAMPTZ NOT NULL,
  "phone" VARCHAR(11) NOT NULL,
  "address" VARCHAR(128) NOT NULL,
  "zip_code" VARCHAR(9) NOT NULL,
  "city" VARCHAR(128) NOT NULL,
  "state" VARCHAR(128) NOT NULL,
  "role" VARCHAR(128) NOT NULL,
  "duns" INTEGER,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "media" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "photo" PATH NOT NULL,
  "video" PATH,
  "product_id" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "shop" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "product" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "security_code" UUID NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "kit_name" VARCHAR(20) NOT NULL,
  "sculptor" VARCHAR(50) NOT NULL,
  "size" INTEGER NOT NULL,
  "type" VARCHAR(100) NOT NULL,
  "weight" INTEGER NOT NULL,
  "age_range" VARCHAR(100) NOT NULL,
  "authenticity_card" BOOLEAN NOT NULL,
  "price" INTEGER NOT NULL,
  "shipping_fees" INTEGER,
  "detail_product_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "shop_id" INTEGER NOT NULL REFERENCES "shop"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "detail_product" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "localization" VARCHAR(50) NOT NULL,
  "belly_plate" BOOLEAN NOT NULL,
  "gender" VARCHAR(10) NOT NULL,
  "year" INTEGER NOT NULL,
  "eyes" VARCHAR(100) NOT NULL,
  "hair" VARCHAR(100) NOT NULL,
  "status" VARCHAR(50) NOT NULL,
  "product_id" INTEGER NOT NULL REFERENCES "product"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "message" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "content" VARCHAR(200) NOT NULL,
  "sender_id" INTEGER NOT NULL,
  "receiver_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--------------------------------
-- Tables de liaison
--------------------------------

CREATE TABLE "User_Order_Product"(
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "product_id" INTEGER NOT NULL REFERENCES "product"("id") ON DELETE CASCADE,
  "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "invoice" PATH,
  "status" VARCHAR(100) NOT NULL
  );

  --------------------------------
-- RAJOUT FK DANS TABLES
--------------------------------

ALTER TABLE product
    ADD CONSTRAINT fk_product_detail_product FOREIGN KEY (detail_product_id) REFERENCES detail_product(id);

ALTER TABLE media
    ADD CONSTRAINT fk_media_product FOREIGN KEY (product_id) REFERENCES product(id);

ALTER TABLE message 
    ADD CONSTRAINT fk_user_sender FOREIGN KEY (sender_id) REFERENCES "user"(id);

ALTER TABLE message
    ADD CONSTRAINT fk_user_receiver FOREIGN KEY (receiver_id) REFERENCES "user"(id);

COMMIT;