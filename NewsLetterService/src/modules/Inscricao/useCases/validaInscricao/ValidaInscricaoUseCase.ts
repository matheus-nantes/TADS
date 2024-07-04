import bcrypt from 'bcrypt';
import { ValidaInscricaoDTO } from '../../dtos/ValidaInscricaoDTO';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';

export class ValidaIncricaoUseCase {
    async execute({ email, senha }: ValidaInscricaoDTO): Promise<boolean> {
        try {
            const user = await prisma.inscrito.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {
                throw new AppError('Usuário não encontrado');
            }

            const passwordMatch = await bcrypt.compare(senha, user.senha);

            return passwordMatch;
        } catch (error) {
            // Se ocorrer algum erro durante a busca ou comparação de senha, lançar um AppError
            throw new AppError(`Erro ao validar login: ${error.message}`);
        }
    }
}
