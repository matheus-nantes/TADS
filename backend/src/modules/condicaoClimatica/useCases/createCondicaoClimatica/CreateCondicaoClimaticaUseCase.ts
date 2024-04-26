import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateCondicaoClimaticaDTO } from "../../dtos/CreateCondicaoClimaticaDTO";

export class CreateCondicaoClimaticaUseCase {
    async execute({latitude,
        longitude,
        tempo,
        descricaoTempo,
        temperatura,
        sensacaoTermica,
        temperaturaMaxima,
        temperaturaMinima,
        pressaoDoAr,
        umidade,
        visibilidade,
        ventoVelocidade,
        ventoDirecao,
        nuvens,
        nascerDoSol,
        porDoSol,
        dataDeColeta,
        cpfPesquisador
    } : CreateCondicaoClimaticaDTO) : Promise<void> {
        const pesquisadorExists = await prisma.pesquisador.findFirst({
            where:{
                cpf: cpfPesquisador
            }
        })

        if (!pesquisadorExists){
            throw new AppError("Pesquisador not exists!");
        }

        await prisma.condicaoClimatica.create({
            data:{
                latitude,
                longitude,
                tempo,
                descricaoTempo,
                temperatura,
                sensacaoTermica,
                temperaturaMaxima,
                temperaturaMinima,
                pressaoDoAr,
                umidade,
                visibilidade,
                ventoVelocidade,
                ventoDirecao,
                nuvens,
                nascerDoSol,
                porDoSol,
                dataDeColeta,
                cpfPesquisador,
            }
        });
    }  
}