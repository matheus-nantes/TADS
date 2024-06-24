import { Relatorio } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { PeriodicidadeEnum } from "../../dtos/CreateRelatorioDTO";

export class GetNewerRelatorioByTypeUseCase {
    async execute(tipo:PeriodicidadeEnum): Promise<Relatorio> {
        const relatorios = await prisma.relatorio.findFirst({
            where:{
                tipo
            },
            orderBy: {
                id: "desc",
            }
        });

        return relatorios;
    }
}
