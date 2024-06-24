
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateRelatorioDTO, PeriodicidadeEnum } from "../../dtos/CreateRelatorioDTO";

export class CreateRelatorioUseCase {
    async execute({tipo, titulo, conteudo }: CreateRelatorioDTO){
        try{

            if (!Object.values(PeriodicidadeEnum).includes(tipo)) {
                throw new Error("Periodicidade inválida!");
            }

            const relatorio = await prisma.relatorio.create({
                data:{
                    tipo,
                    titulo,
                    conteudo
                }
            });

            return relatorio
        
        } catch (error){
            return new AppError(`Erro ao criar relatorio: ${error}`);
        }
    }
}