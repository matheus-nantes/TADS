import { Request, Response } from "express";
import { GetCondicaoClimaticaByTimeUseCase } from "./GetCondicaoClimaticaByTimeUseCase";

export class GetCondicaoClimaticaByTimeController {
  async handle(req: Request, res: Response) {
    try {
      const { days } = req.query;
      const { page = 1, limit = 10 } = req.query;
      const parsedPage = parseInt(page as string);
      const parsedLimit = parseInt(limit as string);
      const parsedDays = parseInt(days as string);
      const getCondicaoClimaticaByTimeUseCase = new GetCondicaoClimaticaByTimeUseCase();

      const { data, totalCount } = await getCondicaoClimaticaByTimeUseCase.execute(parsedDays, parsedPage, parsedLimit);

      const totalPages = Math.ceil(totalCount / parsedLimit);

      res.setHeader("X-Total-Count", totalCount);
      res.setHeader("X-Total-Pages", totalPages);
      res.setHeader("X-Current-Page", parsedPage);
      res.setHeader("X-Per-Page", parsedLimit);

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
