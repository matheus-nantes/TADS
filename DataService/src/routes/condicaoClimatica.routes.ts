import { Router } from "express";
import { CreateCondicaoClimaticaController } from "../modules/condicaoClimatica/useCases/createCondicaoClimatica/CreateCondicaoClimaticaController";
import { GetCondicaoClimaticaController } from "../modules/condicaoClimatica/useCases/getCondicaoClimatica/GetCondicaoClimaticaController";
import { GetCondicaoClimaticaByTimeController } from "../modules/condicaoClimatica/useCases/getCondicaoClimatica/GetCondicaoClimaticaByTimeController";

const createCondicaoClimaticaController = new CreateCondicaoClimaticaController();

const getCondicaoClimaticaController = new GetCondicaoClimaticaController();

const getCondicaoClimaticaByTimeController = new GetCondicaoClimaticaByTimeController();

const condicaoRoutes = Router();

condicaoRoutes.post("/", createCondicaoClimaticaController.handle);

condicaoRoutes.get("/", getCondicaoClimaticaController.handle);

condicaoRoutes.get("/byTime", getCondicaoClimaticaByTimeController.handle);

export { condicaoRoutes };