import {Router} from 'express';
import { sequelize } from "../../../infrastructure/database/connection.js";

const routes = Router();

routes.get("/", async (req, res, next) => {
    try {
        await sequelize.authenticate();

        res.status(200).json({

            success: true,
            application: "NodoExecute",
            status: "Operational",
            database: "Connected",
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        next(error);
    }
});

export default routes;