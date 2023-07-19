import express,{ Router, Request, Response } from "express";
import { createInfrastructures, getAllInfrastructure, getInfrastructureByID } from "../controllers/infrastructure";
import { getAllInfrastructureType } from "../controllers/infrastructuretype";

const InfrastructureRouter = Router();

InfrastructureRouter.get('/data', getAllInfrastructure)
InfrastructureRouter.get('/data/:id', getInfrastructureByID)
InfrastructureRouter.get('/type', getAllInfrastructureType)
InfrastructureRouter.post('/data', createInfrastructures)


export default InfrastructureRouter;