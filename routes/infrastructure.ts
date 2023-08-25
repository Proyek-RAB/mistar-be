import express,{ Router, Request, Response } from "express";
import { DeleteInfrastructureByID, createInfrastructures, getAllInfrastructure, getInfrastructureBySubTypeID, updateInfrastructure } from "../controllers/infrastructure";
import { getAllInfrastructureType } from "../controllers/infrastructuretype";

const InfrastructureRouter = Router();

InfrastructureRouter.get('/data', getAllInfrastructure)
InfrastructureRouter.get('/data/:id', getInfrastructureBySubTypeID)
InfrastructureRouter.get('/type', getAllInfrastructureType)
InfrastructureRouter.post('/data', createInfrastructures)
InfrastructureRouter.patch('/data/:id/update', updateInfrastructure)
InfrastructureRouter.delete('/data/:id/delete', DeleteInfrastructureByID)

export default InfrastructureRouter;