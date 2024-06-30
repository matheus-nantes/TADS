import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { GetRelatorioByIdUseCase } from "./GetRelatorioByIdUseCase";

export class GetRelatorioByIdController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.query;

            if (!id) {
                throw new Error("ID não informado!");
            }

            const numericId = parseInt(id as string, 10);

            if (isNaN(numericId)) {
                throw new AppError("ID inválido!");
            }

            const getRelatorioByIdUseCase = new GetRelatorioByIdUseCase();
            const result = await getRelatorioByIdUseCase.execute(numericId);

            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: `Erro ao obter relatório pelo ID: ${error}`,
            });
        }
    }
}
