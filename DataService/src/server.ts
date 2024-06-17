import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { routes } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();
app.use(cors());

app.use(express.json());app.use(cors({
    origin: 'http://localhost:3333', // Permite requisições da origem http://localhost:3333
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
