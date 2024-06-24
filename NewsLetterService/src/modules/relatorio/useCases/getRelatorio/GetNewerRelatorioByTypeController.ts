import { Request, Response } from "express";
import { GetNewerRelatorioByTypeUseCase } from "./GetNewerRelatorioByTypeUseCase";
import { PeriodicidadeEnum } from "../../dtos/CreateRelatorioDTO";
import { AppError } from "../../../../errors/AppError";

export class GetNewerRelatorioByTypeController {
    async handle(req: Request, res: Response) {
        try {
            const { tipo } = req.query;

            if (!tipo || typeof tipo !== 'string' || !Object.values(PeriodicidadeEnum).includes(tipo as PeriodicidadeEnum)) {
                throw new Error("Periodicidade inválida!");
            }

            const tipoEnum = tipo as PeriodicidadeEnum;

            const getNewerRelatorioByTypeUseCase = new GetNewerRelatorioByTypeUseCase();
            const result = await getNewerRelatorioByTypeUseCase.execute(tipoEnum);

            return res.status(201).json(result);
        } catch (error) {
            return new AppError(`Erro ao obter relatorio mais recente: ${error}`);
        }
    }
}
