import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { routes } from './routes';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

app.use(cors());

// app.use((req: Request, res: Response, next: NextFunction) => {
//     const allowedGatewayHost = "api_gateway"; 
//     const requestHost = req.headers.host;
//     const forwardedHost = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//     if (requestHost && requestHost.startsWith(allowedGatewayHost) || forwardedHost === 'api_gateway' || forwardedHost === '127.0.0.1') {
//          next();
//     } else {
//         res.status(403).json({
//             status: "error",
//             message: "Forbidden"
//         });
//     }
// });


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