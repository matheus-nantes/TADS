import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';

export class AtualizaUltimoRecebidoUseCase {
    async execute( id:number, ultimoRecebido:number ) {
    try{
        const inscrito = await prisma.inscrito.findUnique({ 
            where: {
                id
            }
        });

        if (!inscrito) {
            throw new Error("Inscrição não cadastrado!");
        }

        const relatorio = await prisma.relatorio.findUnique({ 
            where: {
                id:ultimoRecebido
            }
        });

        if (!relatorio) {
            throw new Error("Relatório inexistente!");
        }


        
        const updateInscrito = await prisma.inscrito.update({
            where:{
                id
            },
            data:{
                ultimoRecebido: ultimoRecebido
            }
        })

        return updateInscrito;
    } catch (error){
        return new AppError(`Erro ao atualizar ultimo recebido: ${error}`);
        }
    }
}
