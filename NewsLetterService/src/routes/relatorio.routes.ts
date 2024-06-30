import { Router } from "express";
import { CreateRelatorioController } from "../modules/relatorio/useCases/createRelatorio/CreateRelatorioController";
import { GetRelatorioController } from "../modules/relatorio/useCases/getRelatorio/GetRelatorioController";
import { GetNewerRelatorioByTypeController } from "../modules/relatorio/useCases/getRelatorio/GetNewerRelatorioByTypeController";
import { GetRelatorioByIdController } from "../modules/relatorio/useCases/getRelatorio/GetRelatorioByIdController";

const createRelatorio = new CreateRelatorioController();
const getRelatorio = new GetRelatorioController();
const getNewerRelatorioByType = new GetNewerRelatorioByTypeController();
const getRelatorioById = new GetRelatorioByIdController();

const relatorioRoutes = Router();

relatorioRoutes.post("/", createRelatorio.handle);
relatorioRoutes.get("/", getRelatorio.handle)
relatorioRoutes.get("/last", getNewerRelatorioByType.handle)
relatorioRoutes.get("/byID", getRelatorioById.handle)

export { relatorioRoutes };