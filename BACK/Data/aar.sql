--------------------------------
-- STRUCTURE de la base de la BDD
--------------------------------

DROP TABLE IF EXISTS "list", "card", "tag", "card_has_tag";

CREATE TABLE "list" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL,
  "position" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- OU DEFAULT NOW()
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "card" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "content" TEXT NOT NULL,
  "color" VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  "position" INTEGER NOT NULL DEFAULT 1,
  "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE, -- ON A UNE ASSOCIATION 11, ce champ est donc obligatoire, et on indique qu'il référence le champ id de al table list
  -- ON DELETE CASCADE permet de maintenir l'intégrité référentielle entre la table card et la table list. Si une liste est supprimée, toutes les cartes liées à elles seront automatiquement supprimée par le SGBD (Système de Gestion de Base de Donnée - postgres quoi !)
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tag" (
  "id" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL,
  "color" VARCHAR(20) NOT NULL DEFAULT '#FFFFFF',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--------------------------------
-- Tables de liaison
--------------------------------

CREATE TABLE "card_has_tag"(
  "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("card_id", "tag_id") -- ou : UNIQUE ("card_id", "tag_id") 
  -- On ajoute ici une contrainte d'unicité ou de clé primaire pour s'assurer qu'on ne puisse pas avoir une association en double entre un même tag et une même carte.
);