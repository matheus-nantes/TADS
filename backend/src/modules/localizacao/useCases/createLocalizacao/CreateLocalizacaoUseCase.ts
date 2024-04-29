import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateLocalizacaoDTO } from "../../dtos/CreateLocalizacaoDTO";


export class CreateLocalizacaoUseCase {
    async execute({latitude,
        longitude,
       nome
    } : CreateLocalizacaoDTO) : Promise<void> {
        const localizacaoExists = await prisma.localizacao.findFirst({
            where:{
                latitude: latitude,
                longitude: longitude

            }
        })

        if (!localizacaoExists){
            await prisma.localizacao.create({
                data:{
                    latitude,
                    longitude,
                    nome
                }
            });
        }
    }  
}