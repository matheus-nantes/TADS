import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreatePesquisadorDTO } from "../../dtos/CreatePesquisadorDTO";

export class CreatePesquisadorUseCase {
    async execute({nome, cpf, genero, instituicao, dataDeNascimento}: CreatePesquisadorDTO){
        const pesquisadorAlreadyExists = await prisma.pesquisador.findUnique({
            where: {
                cpf: cpf
            }
        });

        if( pesquisadorAlreadyExists){
            return new AppError("Pesquisador already exists!");
        }

        const pesquisador = await prisma.pesquisador.create({
            data:{
                cpf,
                nome,
                genero,
                instituicao,
                dataDeNascimento
            }
        });

        return pesquisador
    }
}