import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { routes } from './routes';
import { AppError } from './errors/AppError';

const app = express();
app.use(cors({
    origin: 'http://localhost:3334', // Permite requisições da origem http://localhost:3333
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});


app.listen(3334, () => console.log("Server is running in port 3334"));