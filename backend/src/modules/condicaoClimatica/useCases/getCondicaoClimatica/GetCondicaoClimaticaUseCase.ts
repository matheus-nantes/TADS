
import { CondicaoClimatica } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

interface PaginatedData {
    data:  CondicaoClimatica[];
    totalCount: number;
}

export class GetCondicaoClimaticaUseCase {
    async execute(pagina: number, limite: number): Promise<PaginatedData> {
        const offset = (pagina - 1) * limite;

        const condicoesClimaticas = await prisma.condicaoClimatica.findMany({
            orderBy: {
                dataDeColeta: "desc",
            },
            skip: offset,
            take: limite
        });

        const totalCount = await prisma.condicaoClimatica.count();

        return {
            data: condicoesClimaticas,
            totalCount: totalCount};
    }
}
