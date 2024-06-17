import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { CreateInscricaoUseCase } from "./CreateInscricaoUseCase";
import { AppError } from "../../../../errors/AppError";

export class CreateInscricaoController {
    async handle(req: Request, res: Response) {
        const { nome, email, senha, periodicidade } = req.body;
        
        const hashedPassword = await bcrypt.hash(senha, 10);

        const createInscricaoUseCase = new CreateInscricaoUseCase();

        const result = await createInscricaoUseCase.execute({ nome, email, senha: hashedPassword, periodicidade });

        if (result instanceof AppError) {
            return res.status(result.statusCode).json({
                status: "error",
                message: result.message
            });
        }

        return res.status(201).json(result);
    }
}
