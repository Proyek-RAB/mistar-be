import { Router, Request, Response } from "express";
import { getInfrastructureSubTypeByID } from "../controllers/infrastructuresubtype";
import { getAllInfrastructureRequest, getAllInfrastructureRequestValue, getInfrastructureRequestByID } from "../controllers/infrastructure_request";

const InfrastructureRequest = Router();

InfrastructureRequest.get('/request/data', getAllInfrastructureRequest)
InfrastructureRequest.get('/request/:id/data', getInfrastructureRequestByID)

export default InfrastructureRequest;