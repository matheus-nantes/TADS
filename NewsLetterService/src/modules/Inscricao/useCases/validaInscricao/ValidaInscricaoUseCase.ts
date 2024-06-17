import bcrypt from 'bcrypt';
import { ValidaInscricaoDTO } from '../../dtos/ValidaInscricaoDTO';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';

export class ValidaIncricaoUseCase {
    async execute({ email, senha }:ValidaInscricaoDTO): Promise<boolean> {
    try{
        const user = await prisma.inscrito.findUnique({ 
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("Inscrição não cadastrado!");
        }

        const passwordMatch = await bcrypt.compare(senha, user.senha); // Comparar a senha fornecida com o hash armazenado

        return passwordMatch;
    }
    catch (error){
        throw new AppError(`Erro ao validar login: ${error}`);
    }
    }
}
