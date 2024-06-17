
import { Request, Response } from "express";
import { GetInscricaoUseCase } from "./GetInscricaoUseCase";


export class GetInscricaoController {
    async handle(req: Request, res: Response) {

        const getInscricaoUseCase = new GetInscricaoUseCase;
    
        const result = await getInscricaoUseCase.execute();
    
        return res.status(201).json(result);
    }
}