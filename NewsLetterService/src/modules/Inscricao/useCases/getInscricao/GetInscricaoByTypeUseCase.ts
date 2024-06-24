import { Inscrito } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { PeriodicidadeEnum } from "../../dtos/CreateInscricaoDTO";

export class GetInscricaoByTypeUseCase {
    async execute(tipo:PeriodicidadeEnum): Promise<Inscrito[]> {
        const inscritos = await prisma.inscrito.findMany({
            where:{
                periodicidade: tipo
            },
            orderBy: {
                id: "desc",
            }
        });

        return inscritos;
    }
}
