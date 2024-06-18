import { Request,Response } from "express";
import { CreateCondicaoClimaticaUseCase } from "./CreateCondicaoClimaticaUseCase";
import { AppError } from "../../../../errors/AppError";

export class CreateCondicaoClimaticaController {
    async handle(req: Request, res: Response) {

        const { latitude,longitude } = req.body;// futuramente, com implementação de login, também poderá ser passado o cpf do pesquisador para que tenha um registro e seja possível a rastreabilidade no sistema 
            
        const createCondicaoClimaticaUseCase = new CreateCondicaoClimaticaUseCase();
        const result = await createCondicaoClimaticaUseCase.execute({latitude,longitude});
        if (result instanceof AppError) {
            return res.status(result.statusCode).json({
                status: "error",
                message: result.message
            });
        }
        return res.status(201).send(result);
    }
}