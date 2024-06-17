/*
  Warnings:

  - Added the required column `updated_at` to the `Inscrito` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inscrito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "periodicidade" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Inscrito" ("ativo", "email", "id", "nome", "periodicidade", "senha") SELECT "ativo", "email", "id", "nome", "periodicidade", "senha" FROM "Inscrito";
DROP TABLE "Inscrito";
ALTER TABLE "new_Inscrito" RENAME TO "Inscrito";
CREATE UNIQUE INDEX "Inscrito_email_key" ON "Inscrito"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
