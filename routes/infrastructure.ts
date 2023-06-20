import { Router, Request, Response } from "express";
import { getAllInfrastructure, getInfrastructureByID, createInfrastructure, getInfrastructureTypeList, getInfrastructureSubTypeList } from "../controllers/infrastructure";

const InfrastructureRouter = Router();

// MOCK IMPLEMENTATION
InfrastructureRouter.get('/', getAllInfrastructure)
InfrastructureRouter.get('/data/:id', getInfrastructureByID)
InfrastructureRouter.post('/', createInfrastructure)
InfrastructureRouter.get('/type', getInfrastructureTypeList)
InfrastructureRouter.get('/type/:id/sub', getInfrastructureSubTypeList)

export default InfrastructureRouter;