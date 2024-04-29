import { Request,Response } from "express";
import { CreateLocalizacaoUseCase } from "./CreateLocalizacaoUseCase";


export class CreateLocalizacaoController {
    async handle(req: Request, res: Response) {
        const {latitude,
            longitude,
            nome} = req.body;

        const createLocalizacaoUseCase = new CreateLocalizacaoUseCase();

       await createLocalizacaoUseCase.execute({
            latitude,
            longitude,
            nome
        });

        
        return res.status(201).send();
    }
}