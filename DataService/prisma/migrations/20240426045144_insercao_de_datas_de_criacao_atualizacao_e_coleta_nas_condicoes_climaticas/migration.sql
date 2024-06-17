/*
  Warnings:

  - You are about to drop the `CondicaoClimatica` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CondicaoClimatica";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "condicoesClimatica" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "tempo" TEXT NOT NULL,
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
    CONSTRAINT "condicoesClimatica_cpfPesquisador_fkey" FOREIGN KEY ("cpfPesquisador") REFERENCES "users" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);
