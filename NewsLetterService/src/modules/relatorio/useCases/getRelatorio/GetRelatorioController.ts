
import { Request, Response } from "express";
import { GetRelatorioUseCase } from "./GetRelatorioUseCase";


export class GetRelatorioController {
    async handle(req: Request, res: Response) {

        const gettRelatorioUseCase = new GetRelatorioUseCase;
    
        const result = await gettRelatorioUseCase.execute();
    
        return res.status(201).json(result);
    }
}