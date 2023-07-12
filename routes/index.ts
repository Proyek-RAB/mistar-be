import { Router } from "express";
import InfrastructureRouter from "./infrastructure";
import InfrastructureTypeRouter from "./infrastructuretype";

const router = Router();

router.use('/infrastructure', InfrastructureRouter);

export default router;