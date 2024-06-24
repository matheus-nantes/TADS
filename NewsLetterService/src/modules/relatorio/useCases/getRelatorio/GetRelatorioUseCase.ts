import { Relatorio } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetRelatorioUseCase {
    async execute(): Promise<Relatorio[]> {
        const relatorios = await prisma.relatorio.findMany({
            orderBy: {
                id: "desc",
            }
        });

        return relatorios;
    }
}
