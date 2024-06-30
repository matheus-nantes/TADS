-- CreateTable
CREATE TABLE "Pesquisador" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "dataDeNascimento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pesquisador_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "CondicaoClimatica" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "tempo" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "descricaoTempo" TEXT NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "sensacaoTermica" DOUBLE PRECISION NOT NULL,
    "temperaturaMaxima" DOUBLE PRECISION NOT NULL,
    "temperaturaMinima" DOUBLE PRECISION NOT NULL,
    "pressaoDoAr" DOUBLE PRECISION NOT NULL,
    "umidade" DOUBLE PRECISION NOT NULL,
    "visibilidade" DOUBLE PRECISION NOT NULL,
    "ventoVelocidade" DOUBLE PRECISION NOT NULL,
    "ventoDirecao" DOUBLE PRECISION NOT NULL,
    "nuvens" DOUBLE PRECISION NOT NULL,
    "nascerDoSol" TIMESTAMP(3) NOT NULL,
    "porDoSol" TIMESTAMP(3) NOT NULL,
    "dataDeColeta" TIMESTAMP(3) NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CondicaoClimatica_pkey" PRIMARY KEY ("id")
);
