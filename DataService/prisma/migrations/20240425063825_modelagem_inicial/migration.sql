-- CreateTable
CREATE TABLE "users" (
    "cpf" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "dataDeNascimento" DATETIME NOT NULL,
    "genero" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CondicaoClimatica" (
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
    "cpfPesquisador" TEXT NOT NULL,
    CONSTRAINT "CondicaoClimatica_cpfPesquisador_fkey" FOREIGN KEY ("cpfPesquisador") REFERENCES "users" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE
);
