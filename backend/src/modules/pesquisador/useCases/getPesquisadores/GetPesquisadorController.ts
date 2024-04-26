
import { Request, Response } from "express";
import { GetPesquisadoresUseCase } from "./GetPesquisadoresUseCase";


export class GetPesquisadoresController {
    async handle(req: Request, res: Response) {

        const getPesquisadoresUseCase = new GetPesquisadoresUseCase;
    
        const result = await getPesquisadoresUseCase.execute();
    
        return res.status(201).json(result);
    }
}