import { CondicaoClimatica, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PaginatedData {
  data: CondicaoClimatica[];
  totalCount: number;
}

export class GetCondicaoClimaticaByTimeUseCase {
  async execute(days: number, pagina: number, limite: number): Promise<PaginatedData> {
    if (days <= 0 || isNaN(days)) {
      throw new Error("Invalid days parameter. Please provide a positive integer.");
    }

    const today = new Date();
    const thresholdDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    const offset = (pagina - 1) * limite;
    const condicoesClimaticas = await prisma.condicaoClimatica.findMany({
      where: {
        dataDeColeta: {
          gte: thresholdDate, 
        },
      },
      orderBy: {
        dataDeColeta: "desc", 
      },
        skip: offset,
        take: limite
    });

    const totalCount = await prisma.condicaoClimatica.count({
      where: {
        dataDeColeta: {
          gte: thresholdDate,
        },
      },
    });

    return {
      data: condicoesClimaticas,
      totalCount: totalCount,
    };
  }
}
