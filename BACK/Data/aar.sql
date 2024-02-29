--------------------------------
-- STRUCTURE de la base de la BDD
--------------------------------
BEGIN;

DROP TABLE IF EXISTS "user", "media", "detail_product", "product", "message", "shop", "user_order_product", "user_rate_shop" CASCADE;

CREATE TABLE "user" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" VARCHAR(128) NOT NULL,
  "last_name" VARCHAR(128) NOT NULL,
  "username" VARCHAR(128),
  "email" VARCHAR(128) NOT NULL,
  "password" VARCHAR(128) NOT NULL,
  "date_of_birth" TIMESTAMPTZ,
  "phone" VARCHAR(11),
  "address" VARCHAR(128),
  "zip_code" VARCHAR(9),
  "city" VARCHAR(128),
  "country" VARCHAR(128),
  "state" VARCHAR(128),
  "role" VARCHAR(128),
  "pro" VARCHAR(12),
  "duns" INTEGER,
  "password_token" VARCHAR(255),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "shop" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "rating" INTEGER,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "product" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "unique_id" VARCHAR(6) NOT NULL UNIQUE,
  "title" VARCHAR(100) NOT NULL,
  "kit_name" VARCHAR(20) NOT NULL,
  "sculptor" VARCHAR(50) NOT NULL,
  "size" INTEGER NOT NULL,
  "type" VARCHAR(100) NOT NULL,
  "weight" INTEGER NOT NULL,
  "age_range" VARCHAR(100) NOT NULL,
  "authenticity_card" VARCHAR(5) NOT NULL,
  "price" INTEGER NOT NULL,
  "shipping_fees" INTEGER,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "shop_id" INTEGER NOT NULL REFERENCES "shop"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sold" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "media" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "photo" VARCHAR NOT NULL,
  "video" VARCHAR,
  "product_id" INTEGER NOT NULL REFERENCES "product"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "detail_product" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "localization" VARCHAR(50) NOT NULL,
  "belly_plate" VARCHAR(5) NOT NULL,
  "gender" VARCHAR(20) NOT NULL,
  "year" INTEGER NOT NULL,
  "eyes" VARCHAR(100) NOT NULL,
  "hair" VARCHAR(100) NOT NULL,
  "description" VARCHAR(600) NOT NULL,
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
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--------------------------------
-- Tables de liaison
--------------------------------

CREATE TABLE "User_Order_Product"(
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "product_id" INTEGER NOT NULL REFERENCES "product"("id") ON DELETE CASCADE,
  "seller_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "buyer_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "date" TIMESTAMPTZ NOT NULL,
  "invoice" VARCHAR,
  "status" VARCHAR(100) NOT NULL,
  "order_number" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE "User_Rate_Shop"(
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "rating" INTEGER,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "shop_id" INTEGER NOT NULL REFERENCES "shop"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
  CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 5)
  );

  ------------------------------
-- RAJOUT FK DANS TABLES
--------------------------------

ALTER TABLE media
    ADD CONSTRAINT fk_media_product FOREIGN KEY (product_id) REFERENCES "product"(id) ON DELETE CASCADE;

ALTER TABLE message 
    ADD CONSTRAINT fk_user_sender FOREIGN KEY (sender_id) REFERENCES "user"(id);

ALTER TABLE message
    ADD CONSTRAINT fk_user_receiver FOREIGN KEY (receiver_id) REFERENCES "user"(id);

COMMIT;
