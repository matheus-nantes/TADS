
import { Request, Response } from "express";
import { ValidaIncricaoUseCase } from "./ValidaInscricaoUseCase";
import { AppError } from "../../../../errors/AppError";


export class ValidaInscricaoController {
    async handle(req: Request, res: Response) {
        try{
            const { email, senha } = req.body;
            const validaIncricaoUseCase = new ValidaIncricaoUseCase;
        
            const result = await validaIncricaoUseCase.execute({email, senha});
        
            return res.status(201).json(result);
        } catch (error) {
            // Se ocorrer algum erro durante a busca ou comparação de senha, lançar um AppError
            throw new AppError(`Erro ao validar login: ${error.message}`);
        }
    }
}