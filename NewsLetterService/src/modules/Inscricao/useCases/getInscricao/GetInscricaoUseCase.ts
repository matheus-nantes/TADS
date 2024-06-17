import { Inscrito } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetInscricaoUseCase {
    async execute(): Promise<Inscrito[]> {
        const inscritos = await prisma.inscrito.findMany({
            orderBy: {
                nome: "desc",
            }
        });

        return inscritos;
    }
}
