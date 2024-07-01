import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();
app.use(cors());

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedGatewayHost = process.env.ALLOWED_GATEWAY_HOST || "api_gateway"; // Nome do serviço NGINX
    const requestHost = req.headers.host;

    // Verifica se o hostname da requisição corresponde ao api_gateway
    if (requestHost && requestHost.startsWith(allowedGatewayHost)) {
        next();
    } else {
        res.status(403).json({
            status: "error",
            message: "Forbidden"
        });
    }
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    console.error("Erro interno:", err); 

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});


app.listen(3333, () => console.log("Server is running on port 3333"));
