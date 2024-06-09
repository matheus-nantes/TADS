/*
  Warnings:

  - Added the required column `local` to the `CondicaoClimatica` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CondicaoClimatica" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "tempo" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "descricaoTempo" TEXT NOT NULL,
    "temperatura" REAL NOT NULL,
    "sensacaoTermica" REAL NOT NULL,
    "temperaturaMaxima" REAL NOT NULL,
    "temperaturaMinima" REAL NOT NULL,
    "pressaoDoAr" REAL NOT NULL,
    "umidade" REAL NOT NULL,
    "visibilidade" REAL NOT NULL,
    "ventoVelocidade" REAL NOT NULL,
    "ventoDirecao" REAL NOT NULL,
    "nuvens" REAL NOT NULL,
    "nascerDoSol" DATETIME NOT NULL,
    "porDoSol" DATETIME NOT NULL,
    "dataDeColeta" DATETIME NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "cpfPesquisador" TEXT NOT NULL,
    CONSTRAINT "CondicaoClimatica_cpfPesquisador_fkey" FOREIGN KEY ("cpfPesquisador") REFERENCES "Pesquisador" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CondicaoClimatica" ("cpfPesquisador", "created_At", "dataDeColeta", "descricaoTempo", "id", "latitude", "longitude", "nascerDoSol", "nuvens", "porDoSol", "pressaoDoAr", "sensacaoTermica", "temperatura", "temperaturaMaxima", "temperaturaMinima", "tempo", "umidade", "updated_at", "ventoDirecao", "ventoVelocidade", "visibilidade") SELECT "cpfPesquisador", "created_At", "dataDeColeta", "descricaoTempo", "id", "latitude", "longitude", "nascerDoSol", "nuvens", "porDoSol", "pressaoDoAr", "sensacaoTermica", "temperatura", "temperaturaMaxima", "temperaturaMinima", "tempo", "umidade", "updated_at", "ventoDirecao", "ventoVelocidade", "visibilidade" FROM "CondicaoClimatica";
DROP TABLE "CondicaoClimatica";
ALTER TABLE "new_CondicaoClimatica" RENAME TO "CondicaoClimatica";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;