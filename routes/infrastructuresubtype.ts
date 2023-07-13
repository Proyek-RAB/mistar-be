import { Router, Request, Response } from "express";
import { getAllInfrastructureSubType, getInfrastructureSubTypeByID } from "../controllers/infrastructuresubtype";

const InfrastructureSubTypeRouter = Router();

InfrastructureSubTypeRouter.get('/type/sub', getAllInfrastructureSubType)
InfrastructureSubTypeRouter.get('/type/sub/:id', getInfrastructureSubTypeByID)

export default InfrastructureSubTypeRouter;