import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';

export class DesativarInscricaoUseCase {
    async execute( email:string ) {
    try{
        const inscrito = await prisma.inscrito.findUnique({ 
            where: {
                email: email
            }
        });

        if (!inscrito) {
            throw new Error("Inscrição não cadastrado!");
        }
        
        if(!inscrito.ativo)
            throw new Error("Inscrição já desativada!");

        const updateInscrito = await prisma.inscrito.update({
            where:{
                email:email
            },
            data:{
                ativo : false
            }
        })

        return updateInscrito;
    } catch (error){
        return new AppError(`Erro ao desativar inscrição: ${error}`);
        }
    }
}
