
import { Request, Response } from "express";
import { GetCondicaoClimaticaUseCase } from "./GetCondicaoClimaticaUseCase";


export class GetCondicaoClimaticaController {
    async handle(req: Request, res: Response) {

        const getCondicaoClimaticaUseCase = new GetCondicaoClimaticaUseCase;
    
        const result = await getCondicaoClimaticaUseCase.execute();
    
        return res.status(201).json(result);
    }
}