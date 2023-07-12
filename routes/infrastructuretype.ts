import { Router, Request, Response } from "express";
import { getAllInfrastructureType, getInfrastructureTypeByID } from "../controllers/infrastructuretype";

const InfrastructureTypeRouter = Router();

InfrastructureTypeRouter.get('/type', getAllInfrastructureType)
InfrastructureTypeRouter.get('/data/:id', getInfrastructureTypeByID)

export default InfrastructureTypeRouter;