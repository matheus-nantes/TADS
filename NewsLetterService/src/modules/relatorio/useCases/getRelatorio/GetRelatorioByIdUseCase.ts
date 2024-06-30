import { Relatorio } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetRelatorioByIdUseCase {
    async execute(id:number): Promise<Relatorio> {
        console.log("Bora buscar")
        const relatorio = await prisma.relatorio.findUnique({
            where:{
                id
            }
        });
        console.log("Achou")

        return relatorio;
    }
}
