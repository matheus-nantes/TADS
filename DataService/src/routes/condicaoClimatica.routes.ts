import { Router } from "express";
import { CreateCondicaoClimaticaController } from "../modules/condicaoClimatica/useCases/createCondicaoClimatica/CreateCondicaoClimaticaController";
import { GetCondicaoClimaticaController } from "../modules/condicaoClimatica/useCases/getCondicaoClimatica/GetCondicaoClimaticaController";

const createCondicaoClimaticaController = new CreateCondicaoClimaticaController();

const getCondicaoClimaticaController = new GetCondicaoClimaticaController();

const condicaoRoutes = Router();

condicaoRoutes.post("/", createCondicaoClimaticaController.handle);

condicaoRoutes.get("/", getCondicaoClimaticaController.handle);

export { condicaoRoutes };