import { Router, Request, Response } from "express";
import { getAllInfrastructure, getInfrastructureByID } from "../controllers/infrastructure";

const InfrastructureRouter = Router();

InfrastructureRouter.get('/data', getAllInfrastructure)
InfrastructureRouter.get('/data/:id', getInfrastructureByID)

export default InfrastructureRouter;