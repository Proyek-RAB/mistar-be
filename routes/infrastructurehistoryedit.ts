import { Router, Request, Response } from "express";
import { getPaginatedAllHistoryInfrastructure, getAllInfrastructureHistory } from "../controllers/infrastructure_edit_history";

const infrastructure_edit_history = Router();

infrastructure_edit_history.get('/history', getPaginatedAllHistoryInfrastructure)
infrastructure_edit_history.get('/allhistory', getAllInfrastructureHistory)

export default infrastructure_edit_history;