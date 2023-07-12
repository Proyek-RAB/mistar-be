import express,{ Router, Request, Response } from "express";
import { getAllInfrastructure, getInfrastructureByID } from "../controllers/infrastructure";
import { getAllInfrastructureType } from "../controllers/infrastructuretype";

const InfrastructureRouter = Router();

InfrastructureRouter.get('/data', getAllInfrastructure)
InfrastructureRouter.get('/data/:id', getInfrastructureByID)
InfrastructureRouter.get('/type', getAllInfrastructureType)


export default InfrastructureRouter;