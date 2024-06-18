import { Request, Response } from "express";
import { CreatePesquisadorUseCase } from "./CreatePesquisadorUseCase";
import { AppError } from "../../../../errors/AppError";

export class CreatePesquisadorController {
    async handle(req: Request, res: Response) {
        const {cpf, nome, genero, instituicao, dataDeNascimento} = req.body;
        const createPesquisadorUseCase = new CreatePesquisadorUseCase;
    
        const result = await createPesquisadorUseCase.execute({cpf, nome, genero, instituicao, dataDeNascimento});
        
        if (result instanceof AppError) {
            return res.status(result.statusCode).json({
                status: "error",
                message: result.message
            });
        }

        return res.status(201).json(result);
    }
}