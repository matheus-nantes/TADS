
import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { AtualizaUltimoRecebidoUseCase } from "./AtualizaUltimoRecebidoUseCase";


export class AtualizaUltimoRecebidoController {
    async handle(req: Request, res: Response) {
        const { id, ultimoRecebido } = req.body;
        const atualizaUltimoRecebidoUseCase = new AtualizaUltimoRecebidoUseCase;

        const numericId = parseInt(id as string, 10);
        const numericUltimoRecebido = parseInt(ultimoRecebido as string, 10);

        const result = await atualizaUltimoRecebidoUseCase.execute(numericId,numericUltimoRecebido);
    
        if (result instanceof AppError) {
            return res.status(result.statusCode).json({
                status: "error",
                message: result.message
            });
        }
        return res.status(201).json(result);
    }
}