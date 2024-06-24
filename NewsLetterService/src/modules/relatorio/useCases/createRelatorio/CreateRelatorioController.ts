import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { CreateRelatorioUseCase } from "./CreateRelatorioUseCase";

export class CreateRelatorioController {
    async handle(req: Request, res: Response) {
        const { tipo, titulo, conteudo } = req.body;
        
        const createRelatorioUseCase = new CreateRelatorioUseCase();

        const result = await createRelatorioUseCase.execute({ tipo, titulo, conteudo });

        if (result instanceof AppError) {
            return res.status(result.statusCode).json({
                status: "error",
                message: result.message
            });
        }

        return res.status(201).json(result);
    }
}
