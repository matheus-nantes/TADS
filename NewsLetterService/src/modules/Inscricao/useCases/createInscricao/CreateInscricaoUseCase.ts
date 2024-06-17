
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateInscricaoDTO, PeriodicidadeEnum } from "../../dtos/CreateInscricaoDTO";

export class CreateInscricaoUseCase {
    async execute({nome, email, senha, periodicidade }: CreateInscricaoDTO){
        try{
            const inscritoAlreadyExists = await prisma.inscrito.findUnique({
                where: {
                    email: email
                }
            });

            if( inscritoAlreadyExists){
                throw new Error("Inscrito already exists!");
            }

            if (!Object.values(PeriodicidadeEnum).includes(periodicidade)) {
                throw new Error("Periodicidade inválida!");
            }

            const inscrito = await prisma.inscrito.create({
                data:{
                    nome,
                    email,
                    senha,
                    periodicidade
                }
            });

            return inscrito
        
        } catch (error){
            return new AppError(`Erro ao criar inscrição: ${error}`);
        }
    }
}