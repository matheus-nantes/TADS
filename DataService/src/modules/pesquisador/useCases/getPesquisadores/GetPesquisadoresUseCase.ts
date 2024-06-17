import { Pesquisador } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetPesquisadoresUseCase {
    async execute(): Promise<Pesquisador[]> {
        const pesquisadores = await prisma.pesquisador.findMany({
            orderBy: {
                nome: "desc",
            }
        });

        return pesquisadores;
    }
}
