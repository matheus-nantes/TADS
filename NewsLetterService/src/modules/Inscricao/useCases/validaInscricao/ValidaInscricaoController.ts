
import { Request, Response } from "express";
import { ValidaIncricaoUseCase } from "./ValidaInscricaoUseCase";
import { AppError } from "../../../../errors/AppError";


export class ValidaInscricaoController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body;
        const validaIncricaoUseCase = new ValidaIncricaoUseCase;
    
        const result = await validaIncricaoUseCase.execute({email, senha});
    
        if(result)
            return res.status(201).json(result);
        
        return new AppError("Credenciais inválidas!");
    }
}