import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { PeriodicidadeEnum } from "../../dtos/CreateInscricaoDTO";
import { GetInscricaoByTypeUseCase } from "./GetInscricaoByTypeUseCase";

export class GetInscricaoByTypeController {
    async handle(req: Request, res: Response) {
        try {
            const { periodicidade } = req.query;

            if (!periodicidade || typeof periodicidade !== 'string' || !Object.values(PeriodicidadeEnum).includes(periodicidade as PeriodicidadeEnum)) {
                throw new Error("Periodicidade inválida!");
            }

            const periodicidadeEnum = periodicidade as PeriodicidadeEnum;

            const getInscricaoByTypeUseCase = new GetInscricaoByTypeUseCase();
            const result = await getInscricaoByTypeUseCase.execute(periodicidadeEnum);

            return res.status(201).json(result);
        } catch (error) {
            return new AppError(`Erro ao obter inscritos por periodicidade: ${error}`);
        }
    }
}
