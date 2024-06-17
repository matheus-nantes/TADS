// getcondicaoclimatica.controller.ts
import { Request, Response } from "express";
import { GetCondicaoClimaticaUseCase } from "./GetCondicaoClimaticaUseCase";

export class GetCondicaoClimaticaController {
    async handle(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const parsedPage = parseInt(page as string);
            const parsedLimit = parseInt(limit as string);
            if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
                return res.status(400).json({ error: "Página e limite devem ser números inteiros positivos" });
            }

            const getCondicaoClimaticaUseCase = new GetCondicaoClimaticaUseCase();

            const {data, totalCount} = await getCondicaoClimaticaUseCase.execute(parsedPage, parsedLimit);

            const totalPages = Math.ceil(totalCount / parsedLimit);

            res.setHeader("X-Total-Count", totalCount);
            res.setHeader("X-Total-Pages", totalPages);
            res.setHeader("X-Current-Page", parsedPage);
            res.setHeader("X-Per-Page", parsedLimit);


            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
