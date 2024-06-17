
import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { DesativarInscricaoUseCase } from "./DesativarInscricaoUseCase";


export class DesativarInscricaoController {
    async handle(req: Request, res: Response) {
        const { email } = req.body;
        const desativarInscricaoUseCase = new DesativarInscricaoUseCase;
    
        const result = await desativarInscricaoUseCase.execute(email);
    
        if (result instanceof AppError) {
            return res.status(result.statusCode).json({
                status: "error",
                message: result.message
            });
        }
        return res.status(201).json(result);
    }
}