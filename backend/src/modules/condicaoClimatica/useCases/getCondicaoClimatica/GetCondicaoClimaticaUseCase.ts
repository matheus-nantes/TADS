
import { CondicaoClimatica } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetCondicaoClimaticaUseCase {
    async execute(): Promise<CondicaoClimatica[]> {
        const condicoesClimaticas = await prisma.condicaoClimatica.findMany({
            orderBy: {
                dataDeColeta: "desc",
            }
        });

        return condicoesClimaticas;
    }
}
