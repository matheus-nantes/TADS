import { Request,Response } from "express";
import { CreateCondicaoClimaticaUseCase } from "./CreateCondicaoClimaticaUseCase";

export class CreateCondicaoClimaticaController {
    async handle(req: Request, res: Response) {
        const {latitude,
            longitude,
            tempo,
            descricaoTempo,
            temperatura,
            sensacaoTermica,
            temperaturaMaxima,
            temperaturaMinima,
            pressaoDoAr,
            umidade,
            visibilidade,
            ventoVelocidade,
            ventoDirecao,
            nuvens,
            nascerDoSol,
            porDoSol,
            dataDeColeta,
            cpfPesquisador} = req.body;

        const createCondicaoClimaticaUseCase = new CreateCondicaoClimaticaUseCase();

       await createCondicaoClimaticaUseCase.execute({
            latitude,
            longitude,
            tempo,
            descricaoTempo,
            temperatura,
            sensacaoTermica,
            temperaturaMaxima,
            temperaturaMinima,
            pressaoDoAr,
            umidade,
            visibilidade,
            ventoVelocidade,
            ventoDirecao,
            nuvens,
            nascerDoSol,
            porDoSol,
            dataDeColeta,
            cpfPesquisador
        });

        
        return res.status(201).send();
    }
}